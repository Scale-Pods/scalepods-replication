import type {
  GSCOverviewData,
  GSCTrendData,
  GSCTrendItem,
  GSCQueryItem,
  GSCPageItem,
  MetricItem,
} from "@/types/analytics";

// ── In-memory data cache (5-min TTL) ─────────────────────────────────────────

interface CacheEntry<T> { value: T; expiresAt: number }
const _dataCache = new Map<string, CacheEntry<unknown>>();
const DATA_TTL = 5 * 60_000;

function getCached<T>(key: string): T | null {
  const e = _dataCache.get(key);
  return e && Date.now() < e.expiresAt ? (e.value as T) : null;
}
function setCached<T>(key: string, value: T): void {
  _dataCache.set(key, { value, expiresAt: Date.now() + DATA_TTL });
}

// GSC reuses the same OAuth2 credentials as GA4
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const GSC_BASE  = "https://www.googleapis.com/webmasters/v3";

// ── Auth (Service Account JWT) ──────────────────────────────────────────────────

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

  // Sign with private key
  const crypto = await import("crypto");
  const privateKey = serviceAccountJson.private_key;
  const signatureBytes = crypto.createSign("sha256").update(msg).sign(privateKey);
  const signature = base64url(signatureBytes);
  const jwt = `${msg}.${signature}`;

  // Exchange JWT for access token
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion:  jwt,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GSC token refresh failed: ${err}`);
  }

  const json = await res.json();
  if (!json.access_token) {
    throw new Error(`GSC token exchange returned no access_token: ${JSON.stringify(json)}`);
  }

  cachedToken = {
    value:     json.access_token,
    expiresAt: Date.now() + (json.expires_in ?? 3600) * 1000,
  };
  return cachedToken.value;
}

// ── GSC Search Analytics API ──────────────────────────────────────────────────

interface SearchAnalyticsRow {
  keys: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

async function searchAnalytics(
  token: string,
  siteUrl: string,
  body: Record<string, unknown>
): Promise<{ rows?: SearchAnalyticsRow[] }> {
  const encoded = encodeURIComponent(siteUrl);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);
  try {
    const res = await fetch(
      `${GSC_BASE}/sites/${encoded}/searchAnalytics/query`,
      {
        method: "POST",
        headers: {
          Authorization:  `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      }
    );

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`GSC API ${res.status}: ${err}`);
    }

    return res.json();
  } finally {
    clearTimeout(timeout);
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function dateRange(rangeDays: number): { startDate: string; endDate: string } {
  const end   = new Date();
  const start = new Date();
  // GSC data typically lags by ~2 days
  end.setDate(end.getDate() - 2);
  start.setDate(start.getDate() - rangeDays - 2);
  return {
    startDate: start.toISOString().slice(0, 10),
    endDate:   end.toISOString().slice(0, 10),
  };
}

// ── Provider ──────────────────────────────────────────────────────────────────

export const GSCProvider = {
  async getOverview(rangeDays: number): Promise<GSCOverviewData> {
    const cacheKey = `overview:${rangeDays}`;
    const cached = getCached<GSCOverviewData>(cacheKey);
    if (cached) return cached;

    const siteUrl = process.env.GSC_SITE_URL ?? "https://scalepods.co";
    const token   = await getAccessToken();
    const dr      = dateRange(rangeDays);

    const base = { startDate: dr.startDate, endDate: dr.endDate, rowLimit: 25 };

    // All five dimension queries in parallel
    const [totals, queries, pages, countries, devices] = await Promise.all([
      // Totals — no dimension
      searchAnalytics(token, siteUrl, {
        ...base,
        dimensions: [],
      }),
      // By query
      searchAnalytics(token, siteUrl, {
        ...base,
        dimensions: ["query"],
        orderBy: [{ fieldName: "clicks", sortOrder: "DESCENDING" }],
      }),
      // By page
      searchAnalytics(token, siteUrl, {
        ...base,
        dimensions: ["page"],
        orderBy: [{ fieldName: "clicks", sortOrder: "DESCENDING" }],
      }),
      // By country
      searchAnalytics(token, siteUrl, {
        ...base,
        dimensions: ["country"],
        orderBy: [{ fieldName: "clicks", sortOrder: "DESCENDING" }],
        rowLimit: 10,
      }),
      // By device
      searchAnalytics(token, siteUrl, {
        ...base,
        dimensions: ["device"],
        orderBy: [{ fieldName: "clicks", sortOrder: "DESCENDING" }],
      }),
    ]);

    // Parse totals
    const t = totals.rows?.[0];
    const totalClicks      = Math.round(t?.clicks      ?? 0);
    const totalImpressions = Math.round(t?.impressions ?? 0);
    const avgCtr           = Math.round((t?.ctr ?? 0) * 100 * 10) / 10; // e.g. 3.2
    const avgPosition      = Math.round((t?.position ?? 0) * 10) / 10;  // e.g. 4.7

    // Top queries
    const topQueries: GSCQueryItem[] = (queries.rows ?? []).slice(0, 20).map((r) => ({
      query:       r.keys[0] ?? "",
      clicks:      Math.round(r.clicks),
      impressions: Math.round(r.impressions),
      ctr:         Math.round(r.ctr * 100 * 10) / 10,
      position:    Math.round(r.position * 10) / 10,
    }));

    // Top pages — strip domain, keep path only
    const topPages: GSCPageItem[] = (pages.rows ?? []).slice(0, 15).map((r) => {
      let page = r.keys[0] ?? "/";
      try { page = new URL(page).pathname; } catch { /* keep raw */ }
      return {
        page,
        clicks:      Math.round(r.clicks),
        impressions: Math.round(r.impressions),
        ctr:         Math.round(r.ctr * 100 * 10) / 10,
        position:    Math.round(r.position * 10) / 10,
      };
    });

    // Countries
    const topCountries: MetricItem[] = (countries.rows ?? []).slice(0, 10).map((r) => ({
      name:  r.keys[0] ?? "Unknown",
      value: Math.round(r.clicks),
    }));

    // Devices
    const topDevices: MetricItem[] = (devices.rows ?? []).map((r) => ({
      name:  r.keys[0]
               ? r.keys[0].charAt(0).toUpperCase() + r.keys[0].slice(1).toLowerCase()
               : "Unknown",
      value: Math.round(r.clicks),
    }));

    const result: GSCOverviewData = {
      clicks:      totalClicks,
      impressions: totalImpressions,
      ctr:         avgCtr,
      avgPosition,
      topQueries,
      topPages,
      countries:   topCountries,
      devices:     topDevices,
      lastFetch:   new Date().toISOString(),
    };
    setCached(cacheKey, result);
    return result;
  },

  async getTrend(rangeDays: number): Promise<GSCTrendData> {
    const cacheKey = `trend:${rangeDays}`;
    const cached = getCached<GSCTrendData>(cacheKey);
    if (cached) return cached;

    const siteUrl = process.env.GSC_SITE_URL ?? "https://scalepods.co";
    const token   = await getAccessToken();
    const dr      = dateRange(rangeDays);

    const report = await searchAnalytics(token, siteUrl, {
      startDate:  dr.startDate,
      endDate:    dr.endDate,
      dimensions: ["date"],
      orderBy:    [{ fieldName: "date", sortOrder: "ASCENDING" }],
      rowLimit:   100,
    });

    const data: GSCTrendItem[] = (report.rows ?? []).map((r) => ({
      date:        r.keys[0] ?? "",
      clicks:      Math.round(r.clicks),
      impressions: Math.round(r.impressions),
    }));

    const result: GSCTrendData = { data, count: data.length };
    setCached(cacheKey, result);
    return result;
  },
};
