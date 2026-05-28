"use client";

import { Clock } from "lucide-react";

interface ComingSoonProps {
  provider: "ga4" | "gsc";
}

const META = {
  ga4: {
    name: "Google Analytics 4",
    description:
      "GA4 integration will pull session data, acquisition reports, and conversion events via the Google Analytics Data API once credentials are configured.",
    color: "#f59e0b",
    colorDim: "rgba(245,158,11,0.1)",
  },
  gsc: {
    name: "Google Search Console",
    description:
      "Search Console integration will surface impressions, clicks, average position, and top queries via the Google Search Console API once configured.",
    color: "#3b82f6",
    colorDim: "rgba(59,130,246,0.1)",
  },
};

export default function ComingSoon({ provider }: ComingSoonProps) {
  const meta = META[provider];
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        padding: "48px 24px",
        textAlign: "center",
        gap: "20px",
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "14px",
          background: meta.colorDim,
          border: `1px solid ${meta.color}22`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: meta.color,
        }}
      >
        <Clock size={24} />
      </div>

      {/* Text */}
      <div style={{ maxWidth: "360px" }}>
        <div
          style={{
            display: "inline-block",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: meta.color,
            background: meta.colorDim,
            padding: "3px 10px",
            borderRadius: "100px",
            marginBottom: "14px",
          }}
        >
          Coming Soon
        </div>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: 700,
            color: "var(--text-primary)",
            margin: "0 0 10px",
            letterSpacing: "-0.02em",
          }}
        >
          {meta.name}
        </h2>
        <p
          style={{
            fontSize: "13px",
            color: "var(--text-secondary)",
            lineHeight: 1.65,
            margin: 0,
          }}
        >
          {meta.description}
        </p>
      </div>

      {/* Status row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "10px 18px",
          borderRadius: "8px",
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          marginTop: "8px",
        }}
      >
        <div
          style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: "var(--text-muted)",
          }}
        />
        <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 500 }}>
          Integration not yet configured
        </span>
      </div>
    </div>
  );
}
