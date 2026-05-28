import { Suspense } from "react";
import { GA4Provider } from "@/lib/analytics/providers/ga4";
import type { GA4OverviewData, GA4TrendData } from "@/types/analytics";
import GA4Dashboard from "./GA4Dashboard";

export const dynamic = "force-dynamic";

function LoadingSkeleton() {
  return (
    <div style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "16px" }}>
      {[120, 80, 220, 160].map((h, i) => (
        <div
          key={i}
          style={{
            height: `${h}px`,
            borderRadius: "12px",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            animation: "adm-pulse 1.5s ease-in-out infinite",
          }}
        />
      ))}
      <style>{`@keyframes adm-pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
}

async function GA4PageInner({ range }: { range: string }) {
  const days = range === "7d" ? 7 : range === "90d" ? 90 : 30;

  const [overview, trend] = await Promise.all([
    GA4Provider.getOverview(days).catch((): GA4OverviewData | null => null),
    GA4Provider.getTrend(days).catch((): GA4TrendData | null => null),
  ]);

  return (
    <GA4Dashboard
      initialOverview={overview}
      initialTrend={trend}
      initialRange={range}
    />
  );
}

export default async function GA4Page({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>;
}) {
  const { range = "30d" } = await searchParams;

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <GA4PageInner range={range} />
    </Suspense>
  );
}
