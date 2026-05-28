"use client";

import { memo, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { TrendItem } from "@/types/analytics";
import { useIsClient } from "@/hooks/useIsClient";

interface TrendChartProps {
  data: TrendItem[];
  range: string;
}

function aggregateByDay(data: TrendItem[]): { label: string; sessions: number }[] {
  const byDay: Record<string, number> = {};
  for (const item of data) {
    const day = item.time.slice(0, 10);
    byDay[day] = Math.max(byDay[day] ?? 0, item.sessions);
  }
  return Object.entries(byDay)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([day, sessions]) => ({
      label: formatDay(day),
      sessions,
    }));
}

function formatDay(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
}

const CustomTooltip = memo(({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "8px",
        padding: "10px 14px",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <div style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "4px" }}>
        {label}
      </div>
      <div
        style={{
          fontSize: "18px",
          fontWeight: 700,
          color: "var(--text-primary)",
          letterSpacing: "-0.02em",
        }}
      >
        {payload[0].value}
        <span
          style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-muted)", marginLeft: "4px" }}
        >
          sessions
        </span>
      </div>
    </div>
  );
});
CustomTooltip.displayName = "CustomTooltip";

// Stable placeholder rendered server-side and during hydration.
// Matches the chart's rendered height so there is zero layout shift.
function ChartPlaceholder() {
  return (
    <div
      style={{
        height: "220px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--text-muted)",
        fontSize: "12px",
        letterSpacing: "0.03em",
      }}
    />
  );
}

function TrendChartInner({ data, range }: TrendChartProps) {
  // Memoize O(n) aggregation — only recomputes when data array reference changes
  const chartData = useMemo(() => aggregateByDay(data), [data]);

  if (chartData.length === 0) {
    return (
      <div
        style={{
          height: "220px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--text-muted)",
          fontSize: "13px",
        }}
      >
        No trend data for this period
      </div>
    );
  }

  return (
    // minWidth: 0 prevents the ResponsiveContainer from measuring a negative
    // width when this chart lives inside a flex/grid column
    <div style={{ width: "100%", minWidth: 0 }}>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="sessionGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#6366f1" stopOpacity={0.01} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--border)"
            vertical={false}
            strokeOpacity={0.6}
          />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11, fill: "var(--text-muted)", fontFamily: "Inter, sans-serif" }}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
            tickMargin={8}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "var(--text-muted)", fontFamily: "Inter, sans-serif" }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
            width={36}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: "var(--border)", strokeWidth: 1 }}
          />
          <Area
            type="monotone"
            dataKey="sessions"
            stroke="#6366f1"
            strokeWidth={2}
            fill="url(#sessionGradient)"
            dot={false}
            activeDot={{ r: 4, fill: "#6366f1", stroke: "var(--bg-card)", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// Guard: render placeholder during SSR + hydration, real chart only once the
// client DOM has settled. This eliminates the recharts width/height(-1) error.
function TrendChart(props: TrendChartProps) {
  const isClient = useIsClient();
  if (!isClient) return <ChartPlaceholder />;
  return <TrendChartInner {...props} />;
}

export default memo(TrendChart);
