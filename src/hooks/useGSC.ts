"use client";

import useSWR from "swr";
import type { GSCOverviewData } from "@/types/analytics";

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error("GSC fetch failed");
    return r.json();
  });

export function useGSC(range: string = "30d", fallbackData?: GSCOverviewData) {
  return useSWR<GSCOverviewData>(
    `/api/analytics/gsc?range=${range}`,
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
