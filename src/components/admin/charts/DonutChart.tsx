"use client";

import { memo } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import type { MetricItem } from "@/types/analytics";
import EmptyState from "@/components/admin/shared/EmptyState";
import { PieChart as PieIcon } from "lucide-react";
import { useIsClient } from "@/hooks/useIsClient";

const CHART_SIZE = 160;
const INNER_RADIUS = 52;
const OUTER_RADIUS = 72;

const SLICE_COLORS = [
  "#6366f1",
  "#10b981",
  "#f59e0b",
  "#3b82f6",
  "#8b5cf6",
  "#06b6d4",
  "#f97316",
];

interface DonutChartProps {
  data: MetricItem[];
  label?: string;
}

const CustomTooltip = memo(({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "8px",
        padding: "8px 12px",
        fontSize: "12px",
      }}
    >
      <span style={{ color: "var(--text-secondary)" }}>{payload[0].name}: </span>
      <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>
        {payload[0].value.toLocaleString()}
      </span>
    </div>
  );
});
CustomTooltip.displayName = "DonutTooltip";

function DonutChartInner({ data, label, total }: DonutChartProps & { total: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
      {/* Fixed-size chart — no ResponsiveContainer needed, explicit pixels prevent
          the recharts width(-1)/height(-1) measurement error entirely */}
      <div
        style={{
          position: "relative",
          width: `${CHART_SIZE}px`,
          height: `${CHART_SIZE}px`,
          flexShrink: 0,
        }}
      >
        <PieChart width={CHART_SIZE} height={CHART_SIZE}>
          <Pie
            data={data}
            cx={CHART_SIZE / 2}
            cy={CHART_SIZE / 2}
            innerRadius={INNER_RADIUS}
            outerRadius={OUTER_RADIUS}
            paddingAngle={3}
            dataKey="value"
            nameKey="name"
            strokeWidth={0}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={SLICE_COLORS[i % SLICE_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>

        {/* Center label — sits over the donut hole */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            {total.toLocaleString()}
          </div>
          {label && (
            <div style={{ fontSize: "10px", color: "var(--text-muted)", marginTop: "3px" }}>
              {label}
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%" }}>
        {data.map((item, i) => (
          <div
            key={item.name}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "8px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: 0 }}>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: SLICE_COLORS[i % SLICE_COLORS.length],
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: "12px",
                  color: "var(--text-secondary)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {item.name}
              </span>
            </div>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--text-primary)",
                fontVariantNumeric: "tabular-nums",
                flexShrink: 0,
              }}
            >
              {total > 0 ? Math.round((item.value / total) * 100) : 0}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DonutChart({ data, label }: DonutChartProps) {
  const isClient = useIsClient();
  const total = data.reduce((s, d) => s + d.value, 0);

  if (!data.length) {
    return (
      <EmptyState
        icon={<PieIcon size={18} />}
        title="No data"
        description="No breakdown available."
      />
    );
  }

  // Render stable placeholder during SSR and hydration
  if (!isClient) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "16px 0",
        }}
      >
        <div
          style={{
            width: `${CHART_SIZE}px`,
            height: `${CHART_SIZE}px`,
            borderRadius: "50%",
            background: "var(--border)",
            opacity: 0.4,
          }}
        />
      </div>
    );
  }

  return <DonutChartInner data={data} label={label} total={total} />;
}

export default memo(DonutChart);
