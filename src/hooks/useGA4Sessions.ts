import useSWR from "swr";

export interface EnrichedSession {
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

export interface GA4SessionsData {
  sessions: EnrichedSession[];
  total: number;
  lastSync: string;
  dateRange: { start: string; end: string };
}

interface FetchOptions {
  days?: number;
  limit?: number;
  offset?: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

/**
 * Hook to fetch user-level GA4 sessions enriched with Clarity data
 *
 * Usage:
 * ```tsx
 * const { data, error, isLoading } = useGA4Sessions({ days: 7, limit: 50 });
 *
 * if (isLoading) return <div>Loading...</div>;
 * if (error) return <div>Error: {error.message}</div>;
 *
 * return (
 *   <div>
 *     {data?.sessions.map(session => (
 *       <div key={session.session_id}>
 *         {session.user_pseudo_id} - {session.engagement_score}
 *       </div>
 *     ))}
 *   </div>
 * );
 * ```
 */
export function useGA4Sessions(options: FetchOptions = {}) {
  const { days = 7, limit = 100, offset = 0 } = options;

  const params = new URLSearchParams({
    days: String(days),
    limit: String(limit),
    offset: String(offset),
  });

  const { data, error, isLoading, mutate } = useSWR<GA4SessionsData>(
    `/api/analytics/ga4-sessions/enriched?${params.toString()}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 300000, // 5 minutes
    }
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
}
