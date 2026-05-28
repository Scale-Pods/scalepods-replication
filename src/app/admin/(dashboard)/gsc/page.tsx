import { Suspense } from "react";
import { GSCProvider } from "@/lib/analytics/providers/gsc";
import type { GSCOverviewData, GSCTrendData } from "@/types/analytics";
import GSCDashboard from "./GSCDashboard";

export const dynamic = "force-dynamic";

function LoadingSkeleton() {
  return (
    <div style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "16px" }}>
      {[120, 80, 220, 160, 300].map((h, i) => (
        <div key={i} style={{ height: `${h}px`, borderRadius: "12px", background: "var(--bg-card)", border: "1px solid var(--border)", animation: "adm-pulse 1.5s ease-in-out infinite" }} />
      ))}
      <style>{`@keyframes adm-pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
}

async function GSCPageInner({ range }: { range: string }) {
  const days = range === "7d" ? 7 : range === "90d" ? 90 : 30;

  const [overview, trend] = await Promise.all([
    GSCProvider.getOverview(days).catch((): GSCOverviewData | null => null),
    GSCProvider.getTrend(days).catch(():    GSCTrendData    | null => null),
  ]);

  return <GSCDashboard initialOverview={overview} initialTrend={trend} initialRange={range} />;
}

export default async function GSCPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>;
}) {
  const { range = "30d" } = await searchParams;

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <GSCPageInner range={range} />
    </Suspense>
  );
}
