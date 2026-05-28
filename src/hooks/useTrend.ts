"use client";

import useSWR from "swr";
import type { TrendData } from "@/types/analytics";

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error("Failed to fetch trend");
    return r.json() as Promise<TrendData>;
  });

export function useTrend(range: string = "30d", fallbackData?: TrendData) {
  return useSWR<TrendData>(
    `/api/analytics/clarity/trend?range=${range}`,
    fetcher,
    {
      fallbackData,
      refreshInterval: 300_000,
      revalidateOnFocus: false,
      dedupingInterval: 60_000,
      keepPreviousData: true,
    }
  );
}
