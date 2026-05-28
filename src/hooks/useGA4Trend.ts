"use client";

import useSWR from "swr";
import type { GA4TrendData } from "@/lib/analytics/providers/ga4";

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error("GA4 trend fetch failed");
    return r.json();
  });

export function useGA4Trend(range: string = "30d", fallbackData?: GA4TrendData) {
  return useSWR<GA4TrendData>(
    `/api/analytics/ga4/trend?range=${range}`,
    fetcher,
    {
      fallbackData,
      refreshInterval:   300_000,
      revalidateOnFocus: false,
      dedupingInterval:  60_000,
      keepPreviousData:  true,
    }
  );
}
