import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    // Optional filters
    const dimension = searchParams.get("dimension"); // e.g. "Browser_OS_Device"
    const days = parseInt(searchParams.get("days") ?? "3", 10);

    const since = new Date();
    since.setDate(since.getDate() - days);

    let query = supabase
      .from("clarity_analytics_cache")
      .select("id, dimension, total_sessions, fetch_timestamp")
      .gte("fetch_timestamp", since.toISOString())
      .order("fetch_timestamp", { ascending: true })
      .limit(200);

    if (dimension) {
      query = query.eq("dimension", dimension);
    }

    const { data, error } = await query;

    if (error) {
      console.error("[analytics/trend] Supabase error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Group rows by fetch_timestamp (rounded to hour) for chart-friendly output
    const grouped: Record<string, { time: string; sessions: number; dimension: string }> = {};

    for (const row of data ?? []) {
      const hour = new Date(row.fetch_timestamp).toISOString().slice(0, 13) + ":00:00Z";
      const key = `${row.dimension}_${hour}`;
      if (!grouped[key]) {
        grouped[key] = {
          time: hour,
          sessions: row.total_sessions,
          dimension: row.dimension,
        };
      } else {
        grouped[key].sessions = Math.max(grouped[key].sessions, row.total_sessions);
      }
    }

    const trend = Object.values(grouped).sort(
      (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
    );

    return NextResponse.json(
      {
        data: trend,
        count: trend.length,
        days_requested: days,
        dimension_filter: dimension ?? "all",
        fetched_at: new Date().toISOString(),
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
        },
      }
    );
  } catch (err) {
    console.error("[analytics/trend] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
