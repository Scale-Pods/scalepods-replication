"use client";

import { ReactNode } from "react";

interface SectionCardProps {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

export default function SectionCard({
  title,
  subtitle,
  action,
  children,
  className = "",
  noPadding = false,
}: SectionCardProps) {
  return (
    <div
      className={className}
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        overflow: "hidden",
        // minWidth: 0 is essential when SectionCard is a direct grid/flex child
        // containing recharts — without it, the grid item can exceed its column
        // width and recharts measures a negative container dimension
        minWidth: 0,
      }}
    >
      {(title || action) && (
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            padding: "20px 24px 0",
            gap: "12px",
          }}
        >
          <div>
            {title && (
              <h3
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  margin: 0,
                  letterSpacing: "-0.01em",
                }}
              >
                {title}
              </h3>
            )}
            {subtitle && (
              <p
                style={{
                  fontSize: "12px",
                  color: "var(--text-muted)",
                  margin: "3px 0 0",
                }}
              >
                {subtitle}
              </p>
            )}
          </div>
          {action && <div style={{ flexShrink: 0 }}>{action}</div>}
        </div>
      )}
      <div style={noPadding ? {} : { padding: title ? "16px 24px 24px" : "24px" }}>
        {children}
      </div>
    </div>
  );
}
