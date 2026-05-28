"use client";

import { memo, useMemo } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import type { GA4TrendItem } from "@/lib/analytics/providers/ga4";
import EmptyState from "@/components/admin/shared/EmptyState";
import { BarChart2 } from "lucide-react";
import { useIsClient } from "@/hooks/useIsClient";

interface GA4TrendChartProps {
  data: GA4TrendItem[];
  range: string;
}

function ChartPlaceholder() {
  return (
    <div style={{ height: "220px", borderRadius: "8px", background: "var(--bg-card-hover)", opacity: 0.5 }} />
  );
}

const CustomTooltip = memo(({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "10px 14px", fontSize: "12px" }}>
      <div style={{ color: "var(--text-muted)", marginBottom: "6px", fontWeight: 500 }}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: p.color, flexShrink: 0 }} />
          <span style={{ color: "var(--text-secondary)", textTransform: "capitalize" }}>{p.dataKey}:</span>
          <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{p.value?.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
});
CustomTooltip.displayName = "GA4TrendTooltip";

function formatXLabel(date: string, range: string): string {
  // date is "YYYY-MM-DD"
  const d = new Date(date + "T00:00:00");
  if (range === "7d") return d.toLocaleDateString("en-US", { weekday: "short" });
  if (range === "90d") return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function GA4TrendChartInner({ data, range }: GA4TrendChartProps) {
  const chartData = useMemo(
    () => data.map((d) => ({ ...d, label: formatXLabel(d.date, range) })),
    [data, range]
  );

  if (chartData.length === 0) {
    return (
      <EmptyState icon={<BarChart2 size={18} />} title="No trend data" description="Daily data will appear once GA4 syncs." />
    );
  }

  // Tick density based on range
  const tickInterval = range === "7d" ? 0 : range === "30d" ? 4 : 13;

  return (
    <div style={{ width: "100%", minWidth: 0 }}>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="ga4-sessions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="var(--amber)"  stopOpacity={0.25} />
              <stop offset="95%" stopColor="var(--amber)"  stopOpacity={0} />
            </linearGradient>
            <linearGradient id="ga4-pageviews" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="var(--accent)" stopOpacity={0.2} />
              <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11, fill: "var(--text-muted)" }}
            axisLine={false}
            tickLine={false}
            interval={tickInterval}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "var(--text-muted)" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(1)}k` : String(v)}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="sessions"
            stroke="var(--amber)"
            strokeWidth={2}
            fill="url(#ga4-sessions)"
            dot={false}
            activeDot={{ r: 4, fill: "var(--amber)" }}
          />
          <Area
            type="monotone"
            dataKey="pageviews"
            stroke="var(--accent)"
            strokeWidth={1.5}
            strokeDasharray="4 2"
            fill="url(#ga4-pageviews)"
            dot={false}
            activeDot={{ r: 3, fill: "var(--accent)" }}
          />
        </AreaChart>
      </ResponsiveContainer>
      <div style={{ display: "flex", gap: "16px", justifyContent: "center", marginTop: "10px" }}>
        {[
          { color: "var(--amber)",  label: "Sessions" },
          { color: "var(--accent)", label: "Pageviews", dashed: true },
        ].map(({ color, label, dashed }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "20px", height: "2px", background: color, borderRadius: "1px", borderTop: dashed ? "2px dashed" : undefined, opacity: dashed ? 0.7 : 1 }} />
            <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function GA4TrendChart(props: GA4TrendChartProps) {
  const isClient = useIsClient();
  if (!isClient) return <ChartPlaceholder />;
  return <GA4TrendChartInner {...props} />;
}

export default memo(GA4TrendChart);
