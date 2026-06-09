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

// ── Google Analytics 4 ────────────────────────────────────────────────────────

export interface GA4OverviewData {
  sessions: number;
  activeUsers: number;
  newUsers: number;
  avgSessionDuration: number; // seconds
  bounceRate: number;         // 0–100
  browsers: MetricItem[];
  devices: MetricItem[];
  os: MetricItem[];
  countries: MetricItem[];
  pages: PageMetricItem[];
  channels: MetricItem[];
  sources: MetricItem[];
  lastFetch: string;
}

export interface GA4TrendItem {
  date: string;      // "YYYY-MM-DD"
  sessions: number;
  pageviews: number;
}

export interface GA4TrendData {
  data: GA4TrendItem[];
  count: number;
}

// ── Google Search Console ─────────────────────────────────────────────────────

export interface GSCOverviewData {
  clicks: number;
  impressions: number;
  ctr: number;           // 0–100
  avgPosition: number;   // 1 = top
  topQueries: GSCQueryItem[];
  topPages: GSCPageItem[];
  countries: MetricItem[];
  devices: MetricItem[];
  lastFetch: string;
}

export interface GSCQueryItem {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;         // 0–100
  position: number;
}

export interface GSCPageItem {
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface GSCTrendItem {
  date: string;        // "YYYY-MM-DD"
  clicks: number;
  impressions: number;
}

export interface GSCTrendData {
  data: GSCTrendItem[];
  count: number;
}

// ── BigQuery GA4 Sessions (User-Level Data) ───────────────────────────────────

export interface GA4Session {
  user_pseudo_id: string;      // Anonymous user ID (consistent per device)
  session_id: string;          // Unique session identifier
  session_start_time: string;  // ISO timestamp
  session_end_time: string;    // ISO timestamp
  event_count: number;         // Total events in session
  engagement_time_msec: number; // Time spent on site (milliseconds)
  device_category: string;     // desktop | mobile | tablet
  browser: string;             // Browser name
  os: string;                  // Operating system
  country: string;             // 2-letter country code
  city: string;                // City name
  session_source: string;      // google | direct | facebook | etc.
  session_medium: string;      // organic | paid | social | referral | direct
  page_location: string;       // First page URL
  page_title: string;          // First page title
}

export interface SessionQueryParams {
  startDate?: string;          // YYYY-MM-DD
  endDate?: string;            // YYYY-MM-DD
  limit?: number;              // Default: 1000
  offset?: number;             // Default: 0
  minSessionDuration?: number;  // Seconds (optional filter)
  minEngagementScore?: number;  // 0-100 (optional filter)
}

export interface GA4SessionsResponse {
  sessions: GA4Session[];
  total: number;
  lastSync: string;
}
