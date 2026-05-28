"use client";

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

interface TrendChartProps {
  data: TrendItem[];
  range: string;
}

// Aggregate hourly buckets into daily points for cleaner visualisation
function aggregateByDay(data: TrendItem[]): { label: string; sessions: number }[] {
  const byDay: Record<string, number> = {};
  for (const item of data) {
    const day = item.time.slice(0, 10); // "2026-05-28"
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

const CustomTooltip = ({ active, payload, label }: any) => {
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
        <span style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-muted)", marginLeft: "4px" }}>
          sessions
        </span>
      </div>
    </div>
  );
};

export default function TrendChart({ data, range }: TrendChartProps) {
  const chartData = aggregateByDay(data);

  if (chartData.length === 0) {
    return (
      <div
        style={{
          height: "200px",
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
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: "var(--border)", strokeWidth: 1 }} />
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
  );
}
