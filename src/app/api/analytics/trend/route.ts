import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Edge-cached for 10 minutes
export const revalidate = 600;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const days = Math.min(parseInt(searchParams.get("days") ?? "3", 10), 30);

    const since = new Date();
    since.setDate(since.getDate() - days);

    // Only fetch lightweight columns — skip raw_data entirely
    const { data, error } = await supabase
      .from("clarity_analytics_cache")
      .select("dimension, total_sessions, fetch_timestamp")
      .gte("fetch_timestamp", since.toISOString())
      .order("fetch_timestamp", { ascending: true })
      .limit(200);

    if (error) throw new Error(error.message);

    // Aggregate by hour, picking max sessions across dimensions
    const byHour: Record<string, number> = {};
    for (const row of data ?? []) {
      const hour = row.fetch_timestamp.slice(0, 13) + ":00:00Z";
      byHour[hour] = Math.max(byHour[hour] ?? 0, row.total_sessions ?? 0);
    }

    const trend = Object.entries(byHour)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([time, sessions]) => ({ time, sessions }));

    return NextResponse.json(
      { data: trend, count: trend.length },
      {
        headers: {
          "Cache-Control": "public, s-maxage=600, stale-while-revalidate=120",
        },
      }
    );
  } catch (err: any) {
    console.error("[analytics/trend]", err?.message ?? err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
