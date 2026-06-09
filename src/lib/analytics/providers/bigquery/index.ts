import type { GA4Session, SessionQueryParams, GA4SessionsResponse } from "@/types/analytics";

// ── In-memory data cache (5-min TTL) ─────────────────────────────────────────
interface CacheEntry<T> { value: T; expiresAt: number }
const _dataCache = new Map<string, CacheEntry<unknown>>();
const DATA_TTL = 5 * 60_000; // 5 minutes

function getCached<T>(key: string): T | null {
  const e = _dataCache.get(key);
  return e && Date.now() < e.expiresAt ? (e.value as T) : null;
}

function setCached<T>(key: string, value: T): void {
  _dataCache.set(key, { value, expiresAt: Date.now() + DATA_TTL });
}

// ── Auth (Service Account JWT) ────────────────────────────────────────────────

let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt - 60_000) {
    return cachedToken.value;
  }

  // Decode service account JSON from base64
  const serviceAccountJson = JSON.parse(
    Buffer.from(process.env.GA4_SERVICE_ACCOUNT_JSON!, "base64").toString("utf8")
  );

  // Create JWT for service account
  const header = { alg: "RS256", typ: "JWT" };
  const iat = Math.floor(Date.now() / 1000);
  const payload = {
    iss: serviceAccountJson.client_email,
    scope: [
      "https://www.googleapis.com/auth/bigquery",
      "https://www.googleapis.com/auth/bigquery.readonly",
    ].join(" "),
    aud: "https://oauth2.googleapis.com/token",
    exp: iat + 3600,
    iat,
  };

  // Encode and sign JWT
  const base64url = (buf: Buffer) =>
    buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  const headerB64 = base64url(Buffer.from(JSON.stringify(header)));
  const payloadB64 = base64url(Buffer.from(JSON.stringify(payload)));
  const msg = `${headerB64}.${payloadB64}`;

  // Sign with private key
  const crypto = await import("crypto");
  const privateKey = serviceAccountJson.private_key;
  const signatureBytes = crypto.createSign("sha256").update(msg).sign(privateKey);
  const signature = base64url(signatureBytes);
  const jwt = `${msg}.${signature}`;

  // Exchange JWT for access token
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`BigQuery token refresh failed: ${err}`);
  }

  const json = await res.json();
  if (!json.access_token) {
    throw new Error(`BigQuery token exchange returned no access_token: ${JSON.stringify(json)}`);
  }

  cachedToken = {
    value: json.access_token,
    expiresAt: Date.now() + (json.expires_in ?? 3600) * 1000,
  };
  return cachedToken.value;
}

// ── BigQuery Query Helper ────────────────────────────────────────────────────

interface BigQueryResponse {
  rows?: Array<{ f: Array<{ v: any }> }>;
  schema?: { fields: Array<{ name: string; type: string }> };
}

async function queryBigQuery(sql: string, projectId: string): Promise<any[]> {
  const token = await getAccessToken();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000); // 30s timeout

  try {
    const res = await fetch(
      `https://www.googleapis.com/bigquery/v2/projects/${projectId}/queries`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: sql,
          useLegacySql: false,
          timeoutMs: 30000,
          maxResults: 100000,
        }),
        signal: controller.signal,
      }
    );

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`BigQuery query failed (${res.status}): ${err}`);
    }

    const json: BigQueryResponse = await res.json();

    // Convert BigQuery response format to plain objects
    if (!json.rows) return [];

    const schema = json.schema?.fields ?? [];
    return json.rows.map((row) => {
      const obj: any = {};
      row.f.forEach((field, index) => {
        const fieldName = schema[index]?.name ?? `field_${index}`;
        obj[fieldName] = field.v;
      });
      return obj;
    });
  } finally {
    clearTimeout(timeout);
  }
}

// ── BigQuery Provider ────────────────────────────────────────────────────────

const PROJECT_ID = process.env.BIGQUERY_PROJECT_ID || process.env.GA4_SERVICE_ACCOUNT_JSON
  ? JSON.parse(Buffer.from(process.env.GA4_SERVICE_ACCOUNT_JSON, "base64").toString()).project_id
  : "";

const DATASET_ID = process.env.BIGQUERY_DATASET_ID || "analytics_scalepods";
const PROPERTY_ID = process.env.GA4_PROPERTY_ID || "512927379";

export const BigQueryProvider = {
  async getSessions(params: SessionQueryParams): Promise<GA4SessionsResponse> {
    const cacheKey = `bigquery:sessions:${JSON.stringify(params)}`;
    const cached = getCached<GA4SessionsResponse>(cacheKey);
    if (cached) return cached;

    const startDate = params.startDate || new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
    const endDate = params.endDate || new Date().toISOString().split("T")[0];

    // User-level session query from BigQuery
    const sql = `
      WITH session_events AS (
        SELECT
          user_pseudo_id,
          CAST((SELECT value.string_value FROM UNNEST(event_params)
               WHERE key = 'session_id') AS INT64) as session_id,
          TIMESTAMP_MILLIS(MIN(event_timestamp)) as session_start_time,
          TIMESTAMP_MILLIS(MAX(event_timestamp)) as session_end_time,
          TIMESTAMP_MILLIS(event_timestamp) as event_time,
          event_name,
          device.category,
          device.web_browser,
          device.operating_system,
          geo.country,
          geo.city,
          traffic_source.source,
          traffic_source.medium,
          (SELECT value.string_value FROM UNNEST(event_params)
           WHERE key = 'page_location') as page_location,
          (SELECT value.string_value FROM UNNEST(event_params)
           WHERE key = 'page_title') as page_title,
          SUM(engagement_time_msec) as total_engagement_msec,
          COUNT(*) as event_count,
          CURRENT_TIMESTAMP() as fetched_at
        FROM \`${PROJECT_ID}.analytics_${PROPERTY_ID}.events_*\`
        WHERE PARSE_DATE('%Y%m%d', _TABLE_SUFFIX) >= PARSE_DATE('%Y-%m-%d', '${startDate}')
          AND PARSE_DATE('%Y%m%d', _TABLE_SUFFIX) <= PARSE_DATE('%Y-%m-%d', '${endDate}')
          AND event_timestamp IS NOT NULL
        GROUP BY
          user_pseudo_id, session_id, event_time,
          event_name, device, geo, traffic_source,
          page_location, page_title
      )
      SELECT
        user_pseudo_id,
        session_id,
        session_start_time,
        session_end_time,
        event_count,
        total_engagement_msec,
        category as device_category,
        web_browser as browser,
        operating_system as os,
        country,
        city,
        source as session_source,
        medium as session_medium,
        page_location,
        page_title,
        fetched_at
      FROM session_events
      WHERE session_id IS NOT NULL
      ORDER BY session_start_time DESC
      LIMIT ${params.limit || 1000}
      OFFSET ${params.offset || 0}
    `;

    try {
      const rows = await queryBigQuery(sql, PROJECT_ID);

      const sessions: GA4Session[] = rows.map((row) => ({
        user_pseudo_id: row.user_pseudo_id || "",
        session_id: String(row.session_id || ""),
        session_start_time: row.session_start_time || new Date().toISOString(),
        session_end_time: row.session_end_time || new Date().toISOString(),
        event_count: parseInt(row.event_count || "0", 10),
        engagement_time_msec: parseInt(row.total_engagement_msec || "0", 10),
        device_category: row.device_category || "unknown",
        browser: row.browser || "unknown",
        os: row.os || "unknown",
        country: row.country || "unknown",
        city: row.city || "unknown",
        session_source: row.session_source || "direct",
        session_medium: row.session_medium || "direct",
        page_location: row.page_location || "/",
        page_title: row.page_title || "Unknown",
      }));

      const result: GA4SessionsResponse = {
        sessions,
        total: sessions.length,
        lastSync: new Date().toISOString(),
      };

      setCached(cacheKey, result);
      return result;
    } catch (error) {
      console.error("[BigQueryProvider] Error fetching sessions:", error);
      throw error;
    }
  },

  async getSessionDetails(sessionId: string): Promise<GA4Session | null> {
    const cacheKey = `bigquery:session:${sessionId}`;
    const cached = getCached<GA4Session | null>(cacheKey);
    if (cached !== undefined) return cached;

    const sql = `
      SELECT
        user_pseudo_id,
        CAST((SELECT value.string_value FROM UNNEST(event_params)
             WHERE key = 'session_id') AS INT64) as session_id,
        TIMESTAMP_MILLIS(event_timestamp) as event_time,
        event_name,
        device.category as device_category,
        device.web_browser as browser,
        device.operating_system as os,
        geo.country,
        geo.city,
        traffic_source.source,
        traffic_source.medium,
        (SELECT value.string_value FROM UNNEST(event_params)
         WHERE key = 'page_location') as page_location,
        (SELECT value.string_value FROM UNNEST(event_params)
         WHERE key = 'page_title') as page_title,
        engagement_time_msec
      FROM \`${PROJECT_ID}.analytics_${PROPERTY_ID}.events_*\`
      WHERE (SELECT value.string_value FROM UNNEST(event_params)
             WHERE key = 'session_id') = '${sessionId}'
      ORDER BY event_timestamp DESC
      LIMIT 1
    `;

    try {
      const rows = await queryBigQuery(sql, PROJECT_ID);
      if (rows.length === 0) return null;

      const row = rows[0];
      const session: GA4Session = {
        user_pseudo_id: row.user_pseudo_id || "",
        session_id: String(row.session_id || sessionId),
        session_start_time: row.event_time || new Date().toISOString(),
        session_end_time: row.event_time || new Date().toISOString(),
        event_count: 1,
        engagement_time_msec: parseInt(row.engagement_time_msec || "0", 10),
        device_category: row.device_category || "unknown",
        browser: row.browser || "unknown",
        os: row.os || "unknown",
        country: row.country || "unknown",
        city: row.city || "unknown",
        session_source: row.source || "direct",
        session_medium: row.medium || "direct",
        page_location: row.page_location || "/",
        page_title: row.page_title || "Unknown",
      };

      setCached(cacheKey, session);
      return session;
    } catch (error) {
      console.error("[BigQueryProvider] Error fetching session details:", error);
      return null;
    }
  },
};
