"use client";

import { memo, ReactNode } from "react";

interface KpiCardProps {
  label: string;
  value: string | number;
  sub?: string;
  icon?: ReactNode;
  accentColor?: string;
  loading?: boolean;
}

function KpiCard({
  label,
  value,
  sub,
  icon,
  accentColor = "var(--accent)",
  loading = false,
}: KpiCardProps) {
  if (loading) {
    return (
      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <div
          style={{
            height: "11px",
            width: "80px",
            borderRadius: "6px",
            background: "var(--border)",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
        <div
          style={{
            height: "32px",
            width: "60px",
            borderRadius: "6px",
            background: "var(--border)",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
        <div
          style={{
            height: "10px",
            width: "120px",
            borderRadius: "6px",
            background: "var(--border)",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
        <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        transition: "border-color 0.15s",
        cursor: "default",
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLDivElement).style.borderColor = accentColor + "55")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)")
      }
    >
      {/* Label row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontSize: "11px",
            fontWeight: 600,
            color: "var(--text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.07em",
          }}
        >
          {label}
        </span>
        {icon && (
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: accentColor + "18",
              color: accentColor,
              flexShrink: 0,
            }}
          >
            {icon}
          </div>
        )}
      </div>

      {/* Value */}
      <div
        style={{
          fontSize: "32px",
          fontWeight: 700,
          color: "var(--text-primary)",
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          marginTop: "6px",
        }}
      >
        {value}
      </div>

      {/* Sub-label */}
      {sub && (
        <div
          style={{
            fontSize: "12px",
            color: "var(--text-muted)",
            marginTop: "2px",
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}

export default memo(KpiCard);
