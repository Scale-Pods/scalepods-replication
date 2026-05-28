"use client";

import { memo } from "react";
import type { MetricItem } from "@/types/analytics";
import EmptyState from "@/components/admin/shared/EmptyState";
import { BarChart2 } from "lucide-react";

interface HBarChartProps {
  data: MetricItem[];
  color?: string;
  limit?: number;
}

function HBarChart({ data, color = "var(--accent)", limit = 6 }: HBarChartProps) {
  const rows = data.slice(0, limit);
  const max = rows.reduce((m, r) => Math.max(m, r.value), 1);

  if (rows.length === 0) {
    return (
      <EmptyState icon={<BarChart2 size={18} />} title="No data" description="No breakdown available." />
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {rows.map((item, i) => {
        const pct = Math.round((item.value / max) * 100);
        return (
          <div key={`${item.name}-${i}`}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "5px",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  color: "var(--text-secondary)",
                  fontWeight: 500,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "65%",
                }}
              >
                {item.name}
              </span>
              <span
                style={{
                  fontSize: "12px",
                  color: "var(--text-primary)",
                  fontWeight: 600,
                  fontVariantNumeric: "tabular-nums",
                  marginLeft: "8px",
                  flexShrink: 0,
                }}
              >
                {item.value.toLocaleString()}
              </span>
            </div>
            <div
              style={{
                height: "5px",
                borderRadius: "999px",
                background: "var(--border)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${pct}%`,
                  borderRadius: "999px",
                  background: color,
                  opacity: i === 0 ? 1 : Math.max(0.3, 0.9 - i * 0.1),
                  transition: "width 0.6s cubic-bezier(0.16,1,0.3,1)",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default memo(HBarChart);
