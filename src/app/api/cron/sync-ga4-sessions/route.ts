import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";
export const maxDuration = 60; // allow up to 60s for BigQuery + upsert

// ── Config ───────────────────────────────────────────────────────────────────
// NOTE: The GA4 data lives in the "scalepods-analytics" project, dataset
// "analytics_512927379" — NOT the service-account project. Defaults reflect that.
const PROJECT_ID = process.env.BIGQUERY_PROJECT_ID || "scalepods-analytics";
const DATASET_ID = process.env.BIGQUERY_DATASET_ID || "analytics_512927379";

// ── Service Account JWT → Access Token ────────────────────────────────────────
async function getAccessToken(): Promise<string> {
  const raw = process.env.GA4_SERVICE_ACCOUNT_JSON;
  if (!raw) throw new Error("GA4_SERVICE_ACCOUNT_JSON not set");

  // Support both raw JSON and base64-encoded JSON
  let serviceAccount: { client_email: string; private_key: string };
  try {
    serviceAccount = JSON.parse(raw);
  } catch {
    serviceAccount = JSON.parse(Buffer.from(raw, "base64").toString("utf8"));
  }

  const header = { alg: "RS256", typ: "JWT" };
  const iat = Math.floor(Date.now() / 1000);
  const payload = {
    iss: serviceAccount.client_email,
    scope: "https://www.googleapis.com/auth/bigquery",
    aud: "https://oauth2.googleapis.com/token",
    exp: iat + 3600,
    iat,
  };

  const base64url = (buf: Buffer) =>
    buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  const msg = `${base64url(Buffer.from(JSON.stringify(header)))}.${base64url(
    Buffer.from(JSON.stringify(payload))
  )}`;

  const crypto = await import("crypto");
  const signature = base64url(
    crypto.createSign("sha256").update(msg).sign(serviceAccount.private_key)
  );
  const jwt = `${msg}.${signature}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!res.ok) throw new Error(`Token exchange failed: ${await res.text()}`);
  const json = await res.json();
  if (!json.access_token) throw new Error(`No access_token returned: ${JSON.stringify(json)}`);
  return json.access_token;
}

// ── SQL builders ──────────────────────────────────────────────────────────────

// One row per session (aggregated)
function buildSessionsSql(lookbackDays: number): string {
  return `
    SELECT
      user_pseudo_id,
      CAST((SELECT value.int_value FROM UNNEST(event_params) WHERE key = 'ga_session_id' LIMIT 1) AS STRING) AS session_id,
      FORMAT_TIMESTAMP('%Y-%m-%dT%H:%M:%SZ', TIMESTAMP_MICROS(MIN(event_timestamp)), 'UTC') AS session_start_time,
      FORMAT_TIMESTAMP('%Y-%m-%dT%H:%M:%SZ', TIMESTAMP_MICROS(MAX(event_timestamp)), 'UTC') AS session_end_time,
      COUNT(*) AS event_count,
      CAST(SUM(IFNULL((SELECT value.int_value FROM UNNEST(event_params) WHERE key = 'engagement_time_msec'), 0)) AS INT64) AS engagement_time_msec,
      ANY_VALUE(device.category) AS device_category,
      ANY_VALUE(device.web_info.browser) AS browser,
      ANY_VALUE(device.operating_system) AS os,
      ANY_VALUE(geo.country) AS country,
      ANY_VALUE(geo.city) AS city,
      ANY_VALUE(traffic_source.source) AS session_source,
      ANY_VALUE(traffic_source.medium) AS session_medium,
      ANY_VALUE((SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'page_location' LIMIT 1)) AS first_page_location,
      ANY_VALUE((SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'page_title' LIMIT 1)) AS first_page_title
    FROM \`${PROJECT_ID}.${DATASET_ID}.events_*\`
    WHERE _TABLE_SUFFIX >= FORMAT_DATE('%Y%m%d', DATE_SUB(CURRENT_DATE(), INTERVAL ${lookbackDays} DAY))
    GROUP BY user_pseudo_id, session_id
    HAVING session_id IS NOT NULL AND session_id != ''
    ORDER BY session_start_time DESC
    LIMIT 50000
  `;
}

// One row per individual event (the journey stream)
function buildEventsSql(lookbackDays: number): string {
  return `
    SELECT
      user_pseudo_id,
      CAST((SELECT value.int_value FROM UNNEST(event_params) WHERE key = 'ga_session_id' LIMIT 1) AS STRING) AS session_id,
      event_name,
      FORMAT_TIMESTAMP('%Y-%m-%dT%H:%M:%E3SZ', TIMESTAMP_MICROS(event_timestamp), 'UTC') AS event_timestamp,
      (SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'page_location' LIMIT 1) AS page_location,
      (SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'page_title' LIMIT 1) AS page_title
    FROM \`${PROJECT_ID}.${DATASET_ID}.events_*\`
    WHERE _TABLE_SUFFIX >= FORMAT_DATE('%Y%m%d', DATE_SUB(CURRENT_DATE(), INTERVAL ${lookbackDays} DAY))
      AND (SELECT value.int_value FROM UNNEST(event_params) WHERE key = 'ga_session_id' LIMIT 1) IS NOT NULL
    ORDER BY event_timestamp ASC
    LIMIT 200000
  `;
}

async function queryBigQuery(sql: string, token: string): Promise<any[]> {
  const res = await fetch(
    `https://www.googleapis.com/bigquery/v2/projects/${PROJECT_ID}/queries`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: sql,
        useLegacySql: false,
        timeoutMs: 45000,
        maxResults: 200000,
      }),
    }
  );

  if (!res.ok) throw new Error(`BigQuery query failed (${res.status}): ${await res.text()}`);

  const json = await res.json();
  if (!json.rows) return [];

  const fields: Array<{ name: string }> = json.schema?.fields ?? [];
  return json.rows.map((row: { f: Array<{ v: any }> }) => {
    const obj: Record<string, any> = {};
    row.f.forEach((cell, i) => {
      obj[fields[i]?.name ?? `f${i}`] = cell.v;
    });
    return obj;
  });
}

// ── Clarity enrichment helpers ────────────────────────────────────────────────

function mapDeviceToClarity(category: string): string {
  if (category === "mobile") return "Mobile";
  if (category === "tablet") return "Tablet";
  return "PC"; // desktop + unknown → PC
}

function mapChannelToClarity(source: string, medium: string): string {
  const m = (medium ?? "").toLowerCase();
  const s = (source ?? "").toLowerCase();
  if (m === "organic") return "OrganicSearch";
  if (m === "referral") return "Referral";
  if (m === "cpc" || m === "paid" || m === "ppc") return "Paid";
  if (s === "(direct)" || m === "(none)" || m === "none") return "Direct";
  return "Other";
}

function clarityKey(country: string, device: string, channel: string): string {
  return `${(country ?? "").toLowerCase()}__${device}__${channel}`;
}

interface ClarityMetric {
  scrollDepth: number | null;
  activeRatio: number | null; // activeTime / totalTime
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function buildClarityLookup(supabase: any): Promise<Map<string, ClarityMetric>> {
  const { data } = (await supabase
    .from("clarity_analytics_cache")
    .select("raw_data")
    .eq("dimension", "Country_Device_Channel")
    .order("fetch_timestamp", { ascending: false })
    .limit(1)) as { data: Array<{ raw_data: unknown }> | null };

  const lookup = new Map<string, ClarityMetric>();
  if (!data?.length) return lookup;

  // raw_data is stored as a JSONB string — parse it
  let items: any[];
  try {
    const raw = data[0].raw_data;
    items = typeof raw === "string" ? JSON.parse(raw) : raw;
    if (!Array.isArray(items)) return lookup;
  } catch {
    return lookup;
  }

  // First pass: collect scroll depth per cohort
  const scrollMap = new Map<string, number>();
  const engagementMap = new Map<string, number>(); // activeRatio

  for (const item of items) {
    const key = clarityKey(item.Country, item.Device, item.Channel);
    if (item.metric === "ScrollDepth" && item.averageScrollDepth != null) {
      scrollMap.set(key, Number(item.averageScrollDepth));
    }
    if (item.metric === "EngagementTime") {
      const total = Number(item.totalTime ?? 0);
      const active = Number(item.activeTime ?? 0);
      if (total > 0) engagementMap.set(key, Math.round((active / total) * 100));
    }
  }

  for (const [key, scrollDepth] of scrollMap) {
    lookup.set(key, {
      scrollDepth,
      activeRatio: engagementMap.get(key) ?? null,
    });
  }
  return lookup;
}

// ── Handler ───────────────────────────────────────────────────────────────────
export async function GET(request: NextRequest) {
  // Vercel Cron sends: Authorization: Bearer ${CRON_SECRET}
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const startedAt = Date.now();
  try {
    const days = Math.min(
      Math.max(parseInt(request.nextUrl.searchParams.get("days") || "3", 10), 1),
      90
    );
    // Allow skipping the (heavier) event stream sync with ?events=false
    const syncEvents = request.nextUrl.searchParams.get("events") !== "false";

    const token = await getAccessToken();
    const nowIso = new Date().toISOString();
    const windowStartIso = new Date(Date.now() - days * 86400_000).toISOString();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // ── 1. Sessions (aggregated, idempotent upsert on session_id) ──────────────
    const sessionRows = await queryBigQuery(buildSessionsSql(days), token);
    const sessions = sessionRows.map((r) => ({
      session_id: String(r.session_id),
      user_pseudo_id: r.user_pseudo_id || "",
      session_start_time: r.session_start_time || nowIso,
      session_end_time: r.session_end_time || nowIso,
      event_count: parseInt(r.event_count || "0", 10),
      engagement_time_msec: parseInt(r.engagement_time_msec || "0", 10),
      device_category: r.device_category || "unknown",
      browser: r.browser || "unknown",
      os: r.os || "unknown",
      country: r.country || "unknown",
      city: r.city || "unknown",
      session_source: r.session_source || "direct",
      session_medium: r.session_medium || "direct",
      first_page_location: r.first_page_location || "/",
      first_page_title: r.first_page_title || "Unknown",
      synced_at: nowIso,
    }));

    const validSessionIds = new Set(sessions.map((s) => s.session_id));

    const CHUNK = 500;
    let sessionsUpserted = 0;
    for (let i = 0; i < sessions.length; i += CHUNK) {
      const chunk = sessions.slice(i, i + CHUNK);
      const { error } = await supabase
        .from("ga4_sessions")
        .upsert(chunk, { onConflict: "session_id" });
      if (error) throw new Error(`Supabase sessions upsert failed: ${error.message}`);
      sessionsUpserted += chunk.length;
    }

    // ── 2. Events (per-event journey stream) ───────────────────────────────────
    let eventsInserted = 0;
    if (syncEvents && sessions.length > 0) {
      const eventRows = await queryBigQuery(buildEventsSql(days), token);

      // Only keep events whose session exists (satisfies FK + keeps data aligned)
      const events = eventRows
        .filter((r) => r.session_id && validSessionIds.has(String(r.session_id)))
        .map((r) => ({
          session_id: String(r.session_id),
          user_pseudo_id: r.user_pseudo_id || "",
          event_name: r.event_name || "unknown",
          event_timestamp: r.event_timestamp || nowIso,
          page_location: r.page_location || null,
          page_title: r.page_title || null,
        }));

      // Idempotent: clear this window's events, then re-insert fresh.
      const { error: delErr } = await supabase
        .from("ga4_events")
        .delete()
        .gte("event_timestamp", windowStartIso);
      if (delErr) throw new Error(`Supabase events delete failed: ${delErr.message}`);

      for (let i = 0; i < events.length; i += CHUNK) {
        const chunk = events.slice(i, i + CHUNK);
        const { error } = await supabase.from("ga4_events").insert(chunk);
        if (error) throw new Error(`Supabase events insert failed: ${error.message}`);
        eventsInserted += chunk.length;
      }
    }

    // ── 3. Clarity scroll depth enrichment ────────────────────────────────────
    let clarityEnriched = 0;
    const clarityLookup = await buildClarityLookup(supabase);
    if (clarityLookup.size > 0) {
      const clarityUpdates = sessions
        .map((s) => {
          const key = clarityKey(
            s.country,
            mapDeviceToClarity(s.device_category),
            mapChannelToClarity(s.session_source, s.session_medium)
          );
          const metric = clarityLookup.get(key);
          if (!metric) return null;
          return {
            session_id: s.session_id,
            clarity_scroll_depth: metric.scrollDepth,
            clarity_engagement_score: metric.activeRatio,
          };
        })
        .filter(Boolean) as Array<{
        session_id: string;
        clarity_scroll_depth: number | null;
        clarity_engagement_score: number | null;
      }>;

      for (let i = 0; i < clarityUpdates.length; i += CHUNK) {
        const chunk = clarityUpdates.slice(i, i + CHUNK);
        const { error } = await supabase
          .from("ga4_sessions")
          .upsert(chunk, { onConflict: "session_id" });
        if (error) throw new Error(`Supabase clarity enrichment failed: ${error.message}`);
        clarityEnriched += chunk.length;
      }
    }

    return NextResponse.json({
      ok: true,
      sessionsSynced: sessionsUpserted,
      eventsSynced: eventsInserted,
      clarityEnriched,
      lookbackDays: days,
      durationMs: Date.now() - startedAt,
    });
  } catch (error) {
    console.error("[cron/sync-ga4-sessions] Error:", error);
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unknown error",
        durationMs: Date.now() - startedAt,
      },
      { status: 500 }
    );
  }
}
