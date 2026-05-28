import { OverviewData, TrendData } from "@/types/analytics";

/**
 * Placeholder provider for Google Analytics (GA4).
 * Kept disabled until GA4 credentials and export flows are configured.
 */
export const GA4Provider = {
  async getOverview(rangeDays: number): Promise<OverviewData> {
    throw new Error("GA4 provider is not configured.");
  },

  async getTrend(rangeDays: number): Promise<TrendData> {
    throw new Error("GA4 provider is not configured.");
  }
};
