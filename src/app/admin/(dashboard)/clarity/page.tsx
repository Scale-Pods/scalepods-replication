import { Suspense } from "react";
import { ClarityProvider } from "@/lib/analytics/providers/clarity";
import ClarityDashboard from "./ClarityDashboard";
import type { OverviewData, TrendData } from "@/types/analytics";

interface Props {
  searchParams: Promise<{ range?: string }>;
}

// Skeleton shown during the initial server fetch
function DashboardSkeleton() {
  return (
    <div
      style={{
        padding: "28px 28px 48px",
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      {/* Header skeleton */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div
          style={{
            height: "11px",
            width: "160px",
            borderRadius: "6px",
            background: "var(--border)",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
        <div
          style={{
            height: "22px",
            width: "220px",
            borderRadius: "6px",
            background: "var(--border)",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
      </div>
      {/* KPI skeleton row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              height: "120px",
              borderRadius: "12px",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
        ))}
      </div>
      {/* Chart skeleton */}
      <div
        style={{
          height: "300px",
          borderRadius: "12px",
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          animation: "pulse 1.5s ease-in-out infinite",
        }}
      />
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
}

async function ClarityPageInner({ range }: { range: string }) {
  const days = range === "7d" ? 7 : range === "90d" ? 90 : 30;

  // Server-side prefetch — feeds SWR fallbackData for zero-flash initial render
  const [overview, trend] = await Promise.all([
    ClarityProvider.getOverview(days).catch((): OverviewData | null => null),
    ClarityProvider.getTrend(days).catch((): TrendData | null => null),
  ]);

  return (
    <ClarityDashboard
      initialOverview={overview}
      initialTrend={trend}
      initialRange={range}
    />
  );
}

export default async function ClarityPage({ searchParams }: Props) {
  const { range = "30d" } = await searchParams;

  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <ClarityPageInner range={range} />
    </Suspense>
  );
}
