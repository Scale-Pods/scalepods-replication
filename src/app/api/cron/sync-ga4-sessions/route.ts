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

// ── BigQuery: user-level session aggregation (correct GA4 schema) ─────────────
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
        maxResults: 50000,
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
    // Allow ?days=N override (default 3) for manual backfills
    const days = Math.min(
      Math.max(parseInt(request.nextUrl.searchParams.get("days") || "3", 10), 1),
      90
    );

    const token = await getAccessToken();
    const rows = await queryBigQuery(buildSessionsSql(days), token);

    const nowIso = new Date().toISOString();
    const sessions = rows.map((r) => ({
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

    if (sessions.length === 0) {
      return NextResponse.json({
        ok: true,
        synced: 0,
        message: "No sessions found in BigQuery for the lookback window",
        durationMs: Date.now() - startedAt,
      });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Upsert in chunks to stay within payload limits
    const CHUNK = 500;
    let upserted = 0;
    for (let i = 0; i < sessions.length; i += CHUNK) {
      const chunk = sessions.slice(i, i + CHUNK);
      const { error } = await supabase
        .from("ga4_sessions")
        .upsert(chunk, { onConflict: "session_id" });
      if (error) throw new Error(`Supabase upsert failed: ${error.message}`);
      upserted += chunk.length;
    }

    return NextResponse.json({
      ok: true,
      synced: upserted,
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
