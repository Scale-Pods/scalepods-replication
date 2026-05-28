export interface MetricItem {
  name: string;
  value: number;
  percentage?: number;
}

export interface PageMetricItem {
  path: string;
  views: number;
}

export interface TrendItem {
  time: string;
  sessions: number;
  pageviews?: number;
}

export interface OverviewData {
  totalSessions: number;
  avgScrollDepth: number;
  avgEngagementSecs: number;
  browsers: MetricItem[];
  devices: MetricItem[];
  os: MetricItem[];
  countries: MetricItem[];
  pages: PageMetricItem[];
  channels: MetricItem[];
  sources: MetricItem[];
  lastSync: string;
}

export interface TrendData {
  data: TrendItem[];
  count: number;
}

export interface AnalyticsProvider {
  getOverview(rangeDays: number): Promise<OverviewData>;
  getTrend(rangeDays: number): Promise<TrendData>;
}
