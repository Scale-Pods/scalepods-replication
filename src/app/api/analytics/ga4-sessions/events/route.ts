import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export interface SessionEvent {
  event_name: string;
  event_timestamp: string;
  page_location: string | null;
  page_title: string | null;
}

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.nextUrl.searchParams.get("session_id");
    if (!sessionId) {
      return NextResponse.json({ error: "session_id is required" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("ga4_events")
      .select("event_name, event_timestamp, page_location, page_title")
      .eq("session_id", sessionId)
      .order("event_timestamp", { ascending: true })
      .limit(500);

    if (error) throw new Error(error.message);

    return NextResponse.json(
      { events: (data ?? []) as SessionEvent[], count: data?.length ?? 0 },
      { headers: { "Cache-Control": "public, s-maxage=120, stale-while-revalidate=300" } }
    );
  } catch (error) {
    console.error("[/api/analytics/ga4-sessions/events] Error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch session events",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
