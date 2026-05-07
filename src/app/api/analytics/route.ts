import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ISR: cache this serverless function response at the Vercel edge for 10 minutes.
// stale-while-revalidate means users never wait — they get the cached version
// while Vercel silently refreshes it in the background.
export const revalidate = 600; // 10 minutes

// In-memory cache to avoid repeated Supabase hits within the same lambda instance
let memoryCache: { data: ProcessedPayload; ts: number } | null = null;
const MEMORY_TTL = 5 * 60 * 1000; // 5 minutes

interface ProcessedPayload {
  totalSessions: number;
  avgScrollDepth: number;
  avgEngagementSecs: number;
  browsers: { name: string; value: number; percentage: number }[];
  devices: { name: string; value: number }[];
  os: { name: string; value: number }[];
  countries: { name: string; value: number }[];
  pages: { path: string; views: number }[];
  channels: { name: string; value: number }[];
  sources: { name: string; value: number }[];
  lastSync: string;
}

function toSortedArray(
  obj: Record<string, number>,
  keyName = "name",
  valName = "value",
  limit = 8
) {
  return Object.entries(obj)
    .filter(([k]) => k && k.trim() !== "" && k !== "null" && k !== "undefined")
    .map(([k, v]) => ({ [keyName]: k, [valName]: v } as Record<string, string | number>))
    .sort((a, b) => (b[valName] as number) - (a[valName] as number))
    .slice(0, limit);
}

function processSnapshots(rows: any[]): ProcessedPayload {
  // Deduplicate: keep only the latest row per dimension
  const seen = new Set<string>();
  const latest: any[] = [];
  for (const row of rows) {
    if (!seen.has(row.dimension)) {
      seen.add(row.dimension);
      latest.push(row);
    }
  }

  let maxSessions = 0;
  let totalScrollSum = 0;
  let scrollCount = 0;
  let totalEngagementSecs = 0;
  let engagementCount = 0;

  const agg: Record<string, Record<string, number>> = {
    browser: {}, country: {}, device: {}, os: {}, source: {}, channel: {}, url: {},
  };

  for (const row of latest) {
    if (row.total_sessions > maxSessions) maxSessions = row.total_sessions;

    const rawData = Array.isArray(row.raw_data)
      ? row.raw_data
      : (typeof row.raw_data === "string" ? JSON.parse(row.raw_data) : []);

    for (const entry of rawData) {
      const sessions = parseInt(entry.sessionsCount ?? "0", 10);

      // Resolve TitleCase and lowercase keys from Clarity API
      const browser   = entry.Browser   ?? entry.browser;
      const country   = entry.Country   ?? entry.country;
      const device    = entry.Device    ?? entry.device;
      const os        = entry.OS        ?? entry.os;
      const source    = entry.Source    ?? entry.source;
      const channel   = entry.Channel   ?? entry.channel;
      const url       = entry.Url       ?? entry.url;

      if (sessions > 0) {
        if (browser) agg.browser[browser] = (agg.browser[browser] || 0) + sessions;
        if (country) agg.country[country] = (agg.country[country] || 0) + sessions;
        if (device)  agg.device[device]   = (agg.device[device]   || 0) + sessions;
        if (os)      agg.os[os]           = (agg.os[os]           || 0) + sessions;
        if (source)  agg.source[source]   = (agg.source[source]   || 0) + sessions;
        if (channel) agg.channel[channel] = (agg.channel[channel] || 0) + sessions;
        if (url) {
          try {
            const p = new URL(url).pathname;
            agg.url[p] = (agg.url[p] || 0) + sessions;
          } catch {
            agg.url[url] = (agg.url[url] || 0) + sessions;
          }
        }
      }

      // Scroll depth
      if (entry.metric === "ScrollDepth" && typeof entry.averageScrollDepth === "number") {
        totalScrollSum += entry.averageScrollDepth;
        scrollCount++;
      }

      // Engagement time (in seconds)
      if (entry.metric === "EngagementTime") {
        const secs = parseInt(entry.activeTime ?? entry.totalTime ?? "0", 10);
        if (secs > 0) { totalEngagementSecs += secs; engagementCount++; }
      }
    }
  }

  const topBrowsers = toSortedArray(agg.browser);
  const browserTotal = topBrowsers.reduce((s, b) => s + (b.value as number), 0);

  return {
    totalSessions: maxSessions,
    avgScrollDepth: scrollCount > 0 ? Math.round(totalScrollSum / scrollCount) : 0,
    avgEngagementSecs: engagementCount > 0 ? Math.round(totalEngagementSecs / engagementCount) : 0,
    browsers: topBrowsers.map((b) => ({
      name: b.name as string,
      value: b.value as number,
      percentage: browserTotal > 0 ? Math.round(((b.value as number) / browserTotal) * 100) : 0,
    })),
    devices:   toSortedArray(agg.device)  as any,
    os:        toSortedArray(agg.os)      as any,
    countries: toSortedArray(agg.country) as any,
    pages:     toSortedArray(agg.url, "path", "views") as any,
    channels:  toSortedArray(agg.channel) as any,
    sources:   toSortedArray(agg.source)  as any,
    lastSync: latest[0]?.fetch_timestamp ?? new Date().toISOString(),
  };
}

export async function GET() {
  try {
    // Serve from in-memory cache if fresh
    if (memoryCache && Date.now() - memoryCache.ts < MEMORY_TTL) {
      return NextResponse.json(memoryCache.data, {
        headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=120", "X-Cache": "HIT" },
      });
    }

    // Fetch only what's needed — no full raw_data in trend endpoint
    const { data, error } = await supabase
      .from("clarity_analytics_cache")
      .select("id, dimension, raw_data, total_sessions, fetch_timestamp")
      .order("fetch_timestamp", { ascending: false })
      .limit(20); // 10 dimensions × 2 safety buffer

    if (error) throw new Error(error.message);

    const payload = processSnapshots(data ?? []);
    memoryCache = { data: payload, ts: Date.now() };

    return NextResponse.json(payload, {
      headers: {
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=120",
        "X-Cache": "MISS",
      },
    });
  } catch (err: any) {
    console.error("[analytics] Error:", err?.message ?? err);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
