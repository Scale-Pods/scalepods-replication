"use client";

import { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title?: string;
  description?: string;
}

export default function EmptyState({
  icon,
  title = "No data available",
  description = "Data will appear here once synced.",
}: EmptyStateProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
        gap: "10px",
        textAlign: "center",
      }}
    >
      {icon && (
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            background: "var(--bg-card-hover)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--text-muted)",
            marginBottom: "4px",
          }}
        >
          {icon}
        </div>
      )}
      <p
        style={{
          fontSize: "13px",
          fontWeight: 600,
          color: "var(--text-secondary)",
          margin: 0,
        }}
      >
        {title}
      </p>
      <p
        style={{
          fontSize: "12px",
          color: "var(--text-muted)",
          margin: 0,
          maxWidth: "240px",
        }}
      >
        {description}
      </p>
    </div>
  );
}
