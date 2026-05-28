"use client";

import useSWR from "swr";
import type { GA4OverviewData } from "@/types/analytics";

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error("GA4 fetch failed");
    return r.json();
  });

export function useGA4(range: string = "30d", fallbackData?: GA4OverviewData) {
  return useSWR<GA4OverviewData>(
    `/api/analytics/ga4?range=${range}`,
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
