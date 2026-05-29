"use client";

import { memo, useMemo } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import type { GSCTrendItem } from "@/types/analytics";
import EmptyState from "@/components/admin/shared/EmptyState";
import { BarChart2 } from "lucide-react";
import { useIsClient } from "@/hooks/useIsClient";

interface GSCTrendChartProps {
  data: GSCTrendItem[];
  range: string;
}

function formatDay(iso: string, range: string): string {
  const d = new Date(iso + "T00:00:00Z");
  if (range === "7d") return d.toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" });
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
}

const CustomTooltip = memo(({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "10px 14px", fontSize: "12px", minWidth: "150px" }}>
      <div style={{ color: "var(--text-muted)", marginBottom: "8px", fontWeight: 500 }}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", marginBottom: "4px" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-secondary)" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: p.color, flexShrink: 0 }} />
            {p.dataKey === "clicks" ? "Clicks" : "Impressions"}
          </span>
          <span style={{ fontWeight: 700, color: "var(--text-primary)", fontVariantNumeric: "tabular-nums" }}>
            {p.value?.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
});
CustomTooltip.displayName = "GSCTrendTooltip";

function ChartPlaceholder() {
  return <div style={{ height: "220px", width: "100%" }} />;
}

function GSCTrendChartInner({ data, range }: GSCTrendChartProps) {
  const chartData = useMemo(
    () => [...data].sort((a, b) => a.date.localeCompare(b.date))
                   .map((d) => ({ ...d, label: formatDay(d.date, range) })),
    [data, range]
  );

  if (chartData.length === 0) {
    return <EmptyState icon={<BarChart2 size={18} />} title="No trend data" description="Daily data will appear once GSC syncs." />;
  }

  const tickInterval = range === "7d" ? 0 : Math.max(1, Math.floor(chartData.length / 7));

  return (
    <div style={{ width: "100%", minWidth: 0 }}>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="gsc-impressions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="var(--blue)"   stopOpacity={0.2} />
              <stop offset="95%" stopColor="var(--blue)"   stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gsc-clicks" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="var(--emerald)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--emerald)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis dataKey="label" tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} interval={tickInterval} />
          <YAxis tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(1)}k` : String(v)} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="impressions" stroke="var(--blue)" strokeWidth={1.5} strokeDasharray="4 2" fill="url(#gsc-impressions)" dot={false} activeDot={{ r: 3, fill: "var(--blue)" }} />
          <Area type="monotone" dataKey="clicks" stroke="var(--emerald)" strokeWidth={2} fill="url(#gsc-clicks)" dot={false} activeDot={{ r: 4, fill: "var(--emerald)" }} />
        </AreaChart>
      </ResponsiveContainer>
      <div style={{ display: "flex", gap: "16px", justifyContent: "center", marginTop: "10px" }}>
        {[
          { color: "var(--emerald)", label: "Clicks" },
          { color: "var(--blue)",    label: "Impressions", dashed: true },
        ].map(({ color, label, dashed }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "20px", height: "2px", background: color, borderTop: dashed ? `2px dashed ${color}` : undefined, opacity: dashed ? 0.7 : 1 }} />
            <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function GSCTrendChart(props: GSCTrendChartProps) {
  const isClient = useIsClient();
  if (!isClient) return <ChartPlaceholder />;
  return <GSCTrendChartInner {...props} />;
}

export default memo(GSCTrendChart);
