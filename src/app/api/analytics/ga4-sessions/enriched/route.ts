import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

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
  intent_signals: Record<string, unknown>;
}

function computeEngagementScore(engagementMsec: number, eventCount: number): number {
  const score =
    (engagementMsec / 60000) * 20 + // 20 pts per minute engaged
    (eventCount / 50) * 20 + // 20 pts per 50 events
    10; // base
  return Math.min(100, Math.round(score));
}

function buildSummary(s: {
  engagement_time_msec: number;
  event_count: number;
  first_page_location: string;
}): string {
  const totalSec = Math.round(s.engagement_time_msec / 1000);
  const mins = Math.floor(totalSec / 60);
  const secs = totalSec % 60;
  const timeStr = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  let path = s.first_page_location;
  try {
    path = new URL(s.first_page_location).pathname || "/";
  } catch {
    /* keep as-is */
  }
  return `Spent ${timeStr} on site across ${s.event_count} events, landing on ${path}`;
}

export async function GET(request: NextRequest) {
  try {
    const sp = request.nextUrl.searchParams;
    const days = Math.min(Math.max(parseInt(sp.get("days") || "7", 10), 1), 90);
    const limit = Math.min(parseInt(sp.get("limit") || "100", 10), 1000);
    const offset = Math.max(parseInt(sp.get("offset") || "0", 10), 0);

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    const startISO = startDate.toISOString();

    const { data, error, count } = await supabase
      .from("ga4_sessions")
      .select("*", { count: "exact" })
      .gte("session_start_time", startISO)
      .order("session_start_time", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw new Error(error.message);

    const rows = data ?? [];

    const sessions: EnrichedSession[] = rows.map((s) => {
      const engagementScore = computeEngagementScore(
        s.engagement_time_msec ?? 0,
        s.event_count ?? 0
      );

      const intentSignals: Record<string, unknown> = {
        high_engagement: (s.engagement_time_msec ?? 0) > 120000, // > 2 min
        multiple_page_views: (s.event_count ?? 0) > 5,
        mobile: s.device_category === "mobile",
        organic: s.session_medium === "organic",
        traffic_source: s.session_source,
        geographic_region: s.country,
      };

      return {
        session_id: s.session_id,
        user_pseudo_id: s.user_pseudo_id,
        session_start_time: s.session_start_time,
        session_end_time: s.session_end_time,
        session_duration_seconds:
          s.session_duration_seconds ??
          Math.round(
            (new Date(s.session_end_time).getTime() -
              new Date(s.session_start_time).getTime()) /
              1000
          ),
        event_count: s.event_count ?? 0,
        engagement_time_msec: s.engagement_time_msec ?? 0,
        device_category: s.device_category ?? "unknown",
        browser: s.browser ?? "unknown",
        os: s.os ?? "unknown",
        country: s.country ?? "unknown",
        city: s.city ?? "unknown",
        session_source: s.session_source ?? "direct",
        session_medium: s.session_medium ?? "direct",
        first_page_location: s.first_page_location ?? "/",
        first_page_title: s.first_page_title ?? "Unknown",
        clarity_scroll_depth: s.clarity_scroll_depth ?? undefined,
        clarity_engagement_score: s.clarity_engagement_score ?? undefined,
        engagement_score: engagementScore,
        behavior_summary: buildSummary(s),
        intent_signals: intentSignals,
      };
    });

    // most recent sync timestamp across returned rows
    const lastSync =
      rows.reduce<string | null>(
        (max, r) => (!max || (r.synced_at && r.synced_at > max) ? r.synced_at : max),
        null
      ) ?? new Date().toISOString();

    return NextResponse.json(
      {
        sessions,
        total: count ?? sessions.length,
        lastSync,
        dateRange: {
          start: startISO.split("T")[0],
          end: endDate.toISOString().split("T")[0],
        },
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=120, stale-while-revalidate=300",
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
