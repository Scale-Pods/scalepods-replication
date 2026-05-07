import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Uses service role key to bypass RLS for server-side reads
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Fetch the most recent row for each dimension
    const { data, error } = await supabase
      .from("clarity_analytics_cache")
      .select("id, dimension, raw_data, total_sessions, fetch_timestamp")
      .order("fetch_timestamp", { ascending: false })
      .limit(50);

    if (error) {
      console.error("[analytics/route] Supabase error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Deduplicate: keep only the latest row per dimension
    const seen = new Set<string>();
    const latest: typeof data = [];
    for (const row of data ?? []) {
      if (!seen.has(row.dimension)) {
        seen.add(row.dimension);
        latest.push({
          ...row,
          // Parse raw_data string back to object if it's a string
          raw_data:
            typeof row.raw_data === "string"
              ? JSON.parse(row.raw_data)
              : row.raw_data,
        });
      }
    }

    return NextResponse.json(
      { data: latest, count: latest.length, fetched_at: new Date().toISOString() },
      {
        status: 200,
        headers: {
          // Cache for 5 minutes on CDN edge, revalidate in background
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
        },
      }
    );
  } catch (err) {
    console.error("[analytics/route] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
