"use client";

import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

interface LastSyncBadgeProps {
  timestamp: string;
  isValidating?: boolean;
}

function timeAgo(iso: string): string {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function LastSyncBadge({ timestamp, isValidating }: LastSyncBadgeProps) {
  const [label, setLabel] = useState("");

  useEffect(() => {
    setLabel(timeAgo(timestamp));
    const id = setInterval(() => setLabel(timeAgo(timestamp)), 30_000);
    return () => clearInterval(id);
  }, [timestamp]);

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "5px 10px",
        borderRadius: "6px",
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        fontSize: "11px",
        color: "var(--text-muted)",
        fontWeight: 500,
        letterSpacing: "0.01em",
        userSelect: "none",
      }}
    >
      <RefreshCw
        size={11}
        style={{
          animation: isValidating ? "spin 1s linear infinite" : "none",
          flexShrink: 0,
        }}
      />
      <span>Synced {label}</span>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
