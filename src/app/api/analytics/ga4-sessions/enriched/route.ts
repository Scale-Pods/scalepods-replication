import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { BigQueryProvider } from "@/lib/analytics/providers/bigquery";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface EnrichedSession {
  session_id: string;
  user_pseudo_id: string;
  session_start_time: string;
  session_end_time: string;
  session_duration_seconds: number;
  event_count: number;
  engagement_time_msec: number;
  device_category: string;
  browser: string;
  os: string;
  country: string;
  city: string;
  session_source: string;
  session_medium: string;
  first_page_location: string;
  first_page_title: string;
  clarity_scroll_depth?: number;
  clarity_engagement_score?: number;
  engagement_score: number;
  behavior_summary: string;
  intent_signals: Record<string, any>;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const days = parseInt(searchParams.get("days") || "7", 10);
    const limit = Math.min(parseInt(searchParams.get("limit") || "100", 10), 1000);
    const offset = parseInt(searchParams.get("offset") || "0", 10);

    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const startDateStr = startDate.toISOString().split("T")[0];
    const endDateStr = endDate.toISOString().split("T")[0];

    // Fetch from BigQuery
    const { sessions } = await BigQueryProvider.getSessions({
      startDate: startDateStr,
      endDate: endDateStr,
      limit,
      offset,
    });

    // Fetch Clarity data from Supabase for enrichment
    const { data: claritySessions } = await supabase
      .from("clarity_analytics_cache")
      .select("*")
      .gte("fetch_timestamp", startDate.toISOString())
      .lte("fetch_timestamp", endDate.toISOString());

    // Build Clarity lookup map by approximate time
    const clarityMap = new Map<string, any>();
    (claritySessions || []).forEach((session) => {
      const key = `${session.dimension}_${new Date(session.fetch_timestamp).toDateString()}`;
      clarityMap.set(key, session);
    });

    // Enrich sessions with Clarity data and calculate engagement score
    const enrichedSessions: EnrichedSession[] = sessions.map((session) => {
      const clarityKey = `session_${new Date(session.session_start_time).toDateString()}`;
      const clarityData = clarityMap.get(clarityKey);

      // Calculate engagement score (0-100)
      const engagementScore = Math.min(
        100,
        (session.engagement_time_msec / 60000) * 20 + // 20 points per minute
          (session.event_count / 50) * 20 + // 20 points per 50 events
          (clarityData?.raw_data?.[0]?.activeTime ? 30 : 0) + // 30 points if Clarity data exists
          10 // Base score
      );

      // Generate behavior summary
      let behaviorSummary = `User spent ${Math.round(
        session.engagement_time_msec / 1000 / 60
      )}m on site`;
      if (session.event_count > 0) {
        behaviorSummary += `, ${session.event_count} events`;
      }
      if (session.page_location) {
        behaviorSummary += `, first page: ${session.page_location}`;
      }

      // Extract intent signals
      const intentSignals: Record<string, any> = {
        high_engagement: session.engagement_time_msec > 300000, // > 5 min
        multiple_page_views: session.event_count > 5,
        mobile: session.device_category === "mobile",
        traffic_source: session.session_source,
        geographic_region: session.country,
      };

      return {
        session_id: session.session_id,
        user_pseudo_id: session.user_pseudo_id,
        session_start_time: session.session_start_time,
        session_end_time: session.session_end_time,
        session_duration_seconds: Math.round(
          (new Date(session.session_end_time).getTime() -
            new Date(session.session_start_time).getTime()) /
            1000
        ),
        event_count: session.event_count,
        engagement_time_msec: session.engagement_time_msec,
        device_category: session.device_category,
        browser: session.browser,
        os: session.os,
        country: session.country,
        city: session.city,
        session_source: session.session_source,
        session_medium: session.session_medium,
        first_page_location: session.page_location,
        first_page_title: session.page_title,
        clarity_scroll_depth: clarityData?.raw_data?.[0]?.scrollDepth,
        clarity_engagement_score: clarityData?.raw_data?.[0]?.engagementScore,
        engagement_score: Math.round(engagementScore),
        behavior_summary: behaviorSummary,
        intent_signals: intentSignals,
      };
    });

    return NextResponse.json(
      {
        sessions: enrichedSessions,
        total: enrichedSessions.length,
        lastSync: new Date().toISOString(),
        dateRange: { start: startDateStr, end: endDateStr },
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  } catch (error) {
    console.error("[/api/analytics/ga4-sessions/enriched] Error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch enriched sessions",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
