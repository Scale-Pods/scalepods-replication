import type {
  MetricItem,
  PageMetricItem,
  GA4OverviewData,
  GA4TrendData,
  GA4TrendItem,
} from "@/types/analytics";

// ── In-memory data cache (5-min TTL, keyed by "overview:{days}" / "trend:{days}") ──

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

// ── Auth (Service Account) ────────────────────────────────────────────────────

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
    iss:   serviceAccountJson.client_email,
    scope: [
      "https://www.googleapis.com/auth/analytics.readonly",
      "https://www.googleapis.com/auth/webmasters.readonly"
    ].join(" "),
    aud:   "https://oauth2.googleapis.com/token",
    exp:   iat + 3600,
    iat,
  };

  // Encode and sign JWT
  const base64url = (buf: Buffer) => buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  const headerB64 = base64url(Buffer.from(JSON.stringify(header)));
  const payloadB64 = base64url(Buffer.from(JSON.stringify(payload)));
  const msg = `${headerB64}.${payloadB64}`;

  // Sign with private key from service account JSON
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
      assertion:  jwt,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GA4 token refresh failed: ${err}`);
  }

  const json = await res.json();
  cachedToken = {
    value:     json.access_token,
    expiresAt: Date.now() + (json.expires_in ?? 3600) * 1000,
  };
  return cachedToken.value;
}

// ── GA4 Data API helper ───────────────────────────────────────────────────────

const PROPERTY_ID = process.env.GA4_PROPERTY_ID!;
const BASE = `https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY_ID}`;

interface ReportRequest {
  dateRanges: { startDate: string; endDate: string }[];
  dimensions?: { name: string }[];
  metrics: { name: string }[];
  limit?: number;
  orderBys?: { metric: { metricName: string }; desc: boolean }[];
}

async function runReport(body: ReportRequest) {
  const token = await getAccessToken();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);
  try {
    const res = await fetch(`${BASE}:runReport`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`GA4 runReport failed (${res.status}): ${err}`);
    }

    return res.json();
  } finally {
    clearTimeout(timeout);
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function dateRange(rangeDays: number) {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - rangeDays);
  return {
    startDate: start.toISOString().slice(0, 10),
    endDate:   end.toISOString().slice(0, 10),
  };
}

/** Extract dimension→metric rows from a GA4 report response */
function extractRows(
  report: any,
  dimIdx = 0,
  metIdx = 0
): { name: string; value: number }[] {
  if (!report?.rows?.length) return [];
  return report.rows.map((row: any) => ({
    name:  row.dimensionValues?.[dimIdx]?.value ?? "(not set)",
    value: Math.round(parseFloat(row.metricValues?.[metIdx]?.value ?? "0")),
  }));
}

function toMetricItems(
  rows: { name: string; value: number }[],
  limit = 8
): MetricItem[] {
  const filtered = rows
    .filter((r) => r.name && r.name !== "(not set)" && r.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, limit);

  const total = filtered.reduce((s, r) => s + r.value, 0);
  return filtered.map((r) => ({
    name:       r.name,
    value:      r.value,
    percentage: total > 0 ? Math.round((r.value / total) * 100) : 0,
  }));
}

// ── Provider ──────────────────────────────────────────────────────────────────

export const GA4Provider = {
  async getOverview(rangeDays: number): Promise<GA4OverviewData> {
    const cacheKey = `overview:${rangeDays}`;
    const cached = getCached<GA4OverviewData>(cacheKey);
    if (cached) return cached;

    const dr = dateRange(rangeDays);

    // Run all dimension reports in parallel
    const [totals, browsers, devices, os, countries, pages, channels, sources] =
      await Promise.all([
        // KPI totals — no dimension
        runReport({
          dateRanges: [dr],
          metrics: [
            { name: "sessions" },
            { name: "activeUsers" },
            { name: "newUsers" },
            { name: "averageSessionDuration" },
            { name: "bounceRate" },
          ],
        }),

        // By browser
        runReport({
          dateRanges: [dr],
          dimensions: [{ name: "browser" }],
          metrics: [{ name: "sessions" }],
          limit: 10,
          orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
        }),

        // By device category
        runReport({
          dateRanges: [dr],
          dimensions: [{ name: "deviceCategory" }],
          metrics: [{ name: "sessions" }],
          limit: 10,
          orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
        }),

        // By operating system
        runReport({
          dateRanges: [dr],
          dimensions: [{ name: "operatingSystem" }],
          metrics: [{ name: "sessions" }],
          limit: 10,
          orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
        }),

        // By country
        runReport({
          dateRanges: [dr],
          dimensions: [{ name: "country" }],
          metrics: [{ name: "sessions" }],
          limit: 10,
          orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
        }),

        // By page path
        runReport({
          dateRanges: [dr],
          dimensions: [{ name: "pagePath" }],
          metrics: [{ name: "screenPageViews" }],
          limit: 20,
          orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
        }),

        // By channel group
        runReport({
          dateRanges: [dr],
          dimensions: [{ name: "sessionDefaultChannelGroup" }],
          metrics: [{ name: "sessions" }],
          limit: 10,
          orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
        }),

        // By source
        runReport({
          dateRanges: [dr],
          dimensions: [{ name: "sessionSource" }],
          metrics: [{ name: "sessions" }],
          limit: 10,
          orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
        }),
      ]);

    // Parse KPI totals
    const kpiRow = totals?.rows?.[0];
    const sessions         = Math.round(parseFloat(kpiRow?.metricValues?.[0]?.value ?? "0"));
    const activeUsers      = Math.round(parseFloat(kpiRow?.metricValues?.[1]?.value ?? "0"));
    const newUsers         = Math.round(parseFloat(kpiRow?.metricValues?.[2]?.value ?? "0"));
    const avgSessionDur    = Math.round(parseFloat(kpiRow?.metricValues?.[3]?.value ?? "0"));
    const bounceRateRaw    = parseFloat(kpiRow?.metricValues?.[4]?.value ?? "0");
    // GA4 returns bounceRate as a ratio (0–1) in some versions, percentage in others
    const bounceRate       = bounceRateRaw > 1 ? Math.round(bounceRateRaw) : Math.round(bounceRateRaw * 100);

    // Parse pages
    const pageRows: PageMetricItem[] = (pages?.rows ?? [])
      .map((row: any) => ({
        path:  row.dimensionValues?.[0]?.value ?? "/",
        views: Math.round(parseFloat(row.metricValues?.[0]?.value ?? "0")),
      }))
      .filter((p: PageMetricItem) =>
        p.views > 0 &&
        !p.path.startsWith("/admin") &&
        !p.path.includes("(not set)")
      )
      .slice(0, 15);

    const result: GA4OverviewData = {
      sessions,
      activeUsers,
      newUsers,
      avgSessionDuration: avgSessionDur,
      bounceRate,
      browsers:  toMetricItems(extractRows(browsers)),
      devices:   toMetricItems(extractRows(devices)),
      os:        toMetricItems(extractRows(os)),
      countries: toMetricItems(extractRows(countries)),
      pages:     pageRows,
      channels:  toMetricItems(extractRows(channels)),
      sources:   toMetricItems(extractRows(sources)),
      lastFetch: new Date().toISOString(),
    };
    setCached(cacheKey, result);
    return result;
  },

  async getTrend(rangeDays: number): Promise<GA4TrendData> {
    const cacheKey = `trend:${rangeDays}`;
    const cached = getCached<GA4TrendData>(cacheKey);
    if (cached) return cached;

    const dr = dateRange(rangeDays);

    const report = await runReport({
      dateRanges: [dr],
      dimensions: [{ name: "date" }],
      metrics:    [{ name: "sessions" }, { name: "screenPageViews" }],
      orderBys:   [{ metric: { metricName: "sessions" }, desc: false }],
      limit: 100,
    });

    const data: GA4TrendItem[] = (report?.rows ?? []).map((row: any) => {
      const raw = row.dimensionValues?.[0]?.value ?? "";
      // GA4 date format: "20240101" → "2024-01-01"
      const date = `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}`;
      return {
        date,
        sessions:  Math.round(parseFloat(row.metricValues?.[0]?.value ?? "0")),
        pageviews: Math.round(parseFloat(row.metricValues?.[1]?.value ?? "0")),
      };
    });

    const result: GA4TrendData = { data, count: data.length };
    setCached(cacheKey, result);
    return result;
  },
};
