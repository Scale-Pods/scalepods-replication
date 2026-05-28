"use client";

import useSWR from "swr";
import type { OverviewData } from "@/types/analytics";

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error("Failed to fetch analytics");
    return r.json() as Promise<OverviewData>;
  });

export function useAnalytics(range: string = "30d", fallbackData?: OverviewData) {
  return useSWR<OverviewData>(
    `/api/analytics/clarity?range=${range}`,
    fetcher,
    {
      fallbackData,
      refreshInterval: 300_000,   // 5 min — matches API cache TTL and n8n cadence
      revalidateOnFocus: false,   // don't surprise users on tab switch
      dedupingInterval: 60_000,   // dedupe within 1 minute
      keepPreviousData: true,     // show stale data while revalidating
    }
  );
}
