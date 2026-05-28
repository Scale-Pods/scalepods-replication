"use client";

import useSWR from "swr";
import type { GSCTrendData } from "@/types/analytics";

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error("GSC trend fetch failed");
    return r.json();
  });

export function useGSCTrend(range: string = "30d", fallbackData?: GSCTrendData) {
  return useSWR<GSCTrendData>(
    `/api/analytics/gsc/trend?range=${range}`,
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
