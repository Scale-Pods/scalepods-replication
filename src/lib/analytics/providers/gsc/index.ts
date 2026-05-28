import { OverviewData, TrendData } from "@/types/analytics";

/**
 * Placeholder provider for Google Search Console (GSC).
 * Kept disabled until Google Webmaster integrations are finalized.
 */
export const GSCProvider = {
  async getOverview(rangeDays: number): Promise<OverviewData> {
    throw new Error("GSC provider is not configured.");
  },

  async getTrend(rangeDays: number): Promise<TrendData> {
    throw new Error("GSC provider is not configured.");
  }
};
