import { createClient } from "@supabase/supabase-js";
import { OverviewData, TrendData } from "@/types/analytics";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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

function processSnapshots(rows: any[]): OverviewData {
  // Keep only the latest row per unique dimension
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

      if (entry.metric === "ScrollDepth" && typeof entry.averageScrollDepth === "number") {
        totalScrollSum += entry.averageScrollDepth;
        scrollCount++;
      }

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

export const ClarityProvider = {
  async getOverview(rangeDays: number): Promise<OverviewData> {
    const since = new Date();
    since.setDate(since.getDate() - rangeDays);

    const { data, error } = await supabase
      .from("clarity_analytics_cache")
      .select("id, dimension, raw_data, total_sessions, fetch_timestamp")
      .gte("fetch_timestamp", since.toISOString())
      .order("fetch_timestamp", { ascending: false });

    if (error) {
      throw new Error(`Clarity fetch failed: ${error.message}`);
    }

    if (!data || data.length === 0) {
      // Fallback: if no rows match the range window, get the latest rows as default
      const { data: fallbackData } = await supabase
        .from("clarity_analytics_cache")
        .select("id, dimension, raw_data, total_sessions, fetch_timestamp")
        .order("fetch_timestamp", { ascending: false })
        .limit(20);

      return processSnapshots(fallbackData ?? []);
    }

    return processSnapshots(data);
  },

  async getTrend(rangeDays: number): Promise<TrendData> {
    const since = new Date();
    since.setDate(since.getDate() - rangeDays);

    const { data, error } = await supabase
      .from("clarity_analytics_cache")
      .select("dimension, total_sessions, fetch_timestamp")
      .gte("fetch_timestamp", since.toISOString())
      .order("fetch_timestamp", { ascending: true });

    if (error) {
      throw new Error(`Clarity trend fetch failed: ${error.message}`);
    }

    // Aggregate by hour or day depending on duration
    const byHour: Record<string, number> = {};
    for (const row of data ?? []) {
      const timeKey = row.fetch_timestamp.slice(0, 13) + ":00:00Z";
      byHour[timeKey] = Math.max(byHour[timeKey] ?? 0, row.total_sessions ?? 0);
    }

    const trend = Object.entries(byHour)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([time, sessions]) => ({ time, sessions }));

    return {
      data: trend,
      count: trend.length
    };
  }
};
