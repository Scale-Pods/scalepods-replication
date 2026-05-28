"use client";

import { useMemo, memo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MousePointer, Eye, TrendingUp, Hash, Globe } from "lucide-react";
import { useGSC } from "@/hooks/useGSC";
import { useGSCTrend } from "@/hooks/useGSCTrend";
import type { GSCOverviewData, GSCTrendData, GSCQueryItem, GSCPageItem } from "@/types/analytics";
import KpiCard from "@/components/admin/shared/KpiCard";
import SectionCard from "@/components/admin/shared/SectionCard";
import LastSyncBadge from "@/components/admin/shared/LastSyncBadge";
import EmptyState from "@/components/admin/shared/EmptyState";
import HBarChart from "@/components/admin/charts/HBarChart";
import DonutChart from "@/components/admin/charts/DonutChart";
import GSCTrendChart from "@/components/admin/charts/GSCTrendChart";

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatPosition(pos: number): string {
  if (pos <= 0) return "N/A";
  return pos.toFixed(1);
}

function formatCtr(ctr: number): string {
  if (ctr <= 0) return "0%";
  return `${ctr.toFixed(1)}%`;
}

// ── Sub-components ────────────────────────────────────────────────────────────

const RangeButton = memo(function RangeButton({
  label, active, onClick,
}: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "5px 14px", borderRadius: "6px", fontSize: "12px",
        fontWeight: active ? 600 : 500,
        border: active ? "1px solid var(--accent)44" : "1px solid var(--border)",
        background: active ? "var(--accent-dim)" : "transparent",
        color: active ? "var(--accent)" : "var(--text-secondary)",
        cursor: "pointer", transition: "background 0.15s, color 0.15s",
        letterSpacing: "0.01em", userSelect: "none",
      }}
    >
      {label}
    </button>
  );
});

// Queries table — shows keyword, clicks, impressions, CTR, position
const QueriesTable = memo(function QueriesTable({ queries }: { queries: GSCQueryItem[] }) {
  if (queries.length === 0) {
    return <EmptyState icon={<Hash size={18} />} title="No query data" description="Search query data will appear once GSC syncs." />;
  }
  const maxClicks = queries[0]?.clicks ?? 1;

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
        <thead>
          <tr>
            {["Query", "Clicks", "Impressions", "CTR", "Position"].map((h, i) => (
              <th key={h} style={{ textAlign: i === 0 ? "left" : "right", padding: "0 8px 10px", fontSize: "11px", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: "1px solid var(--border)", whiteSpace: "nowrap" }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {queries.map((q, i) => (
            <tr key={`${q.query}-${i}`} style={{ borderBottom: i < queries.length - 1 ? "1px solid var(--border-subtle)" : "none" }}>
              <td style={{ padding: "10px 8px 10px 0", verticalAlign: "middle" }}>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", height: "22px", width: `${Math.round((q.clicks / maxClicks) * 100)}%`, background: "var(--blue)", opacity: 0.06, borderRadius: "4px", pointerEvents: "none" }} />
                  <span style={{ position: "relative", color: "var(--text-secondary)", fontSize: "12px", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "min(320px, 40vw)" }}>
                    {q.query}
                  </span>
                </div>
              </td>
              <td style={{ padding: "10px 8px", textAlign: "right", fontWeight: 700, color: "var(--emerald)", fontVariantNumeric: "tabular-nums" }}>{q.clicks.toLocaleString()}</td>
              <td style={{ padding: "10px 8px", textAlign: "right", color: "var(--text-secondary)", fontVariantNumeric: "tabular-nums" }}>{q.impressions.toLocaleString()}</td>
              <td style={{ padding: "10px 8px", textAlign: "right", color: "var(--text-secondary)", fontVariantNumeric: "tabular-nums" }}>{formatCtr(q.ctr)}</td>
              <td style={{ padding: "10px 0 10px 8px", textAlign: "right", color: q.position <= 3 ? "var(--emerald)" : q.position <= 10 ? "var(--amber)" : "var(--text-muted)", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
                {formatPosition(q.position)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

// Pages table — same columns as queries but for pages
const PagesTable = memo(function PagesTable({ pages }: { pages: GSCPageItem[] }) {
  if (pages.length === 0) {
    return <EmptyState icon={<Globe size={18} />} title="No page data" description="Page performance will appear once GSC syncs." />;
  }
  const maxClicks = pages[0]?.clicks ?? 1;

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
        <thead>
          <tr>
            {["Page", "Clicks", "Impressions", "CTR", "Position"].map((h, i) => (
              <th key={h} style={{ textAlign: i === 0 ? "left" : "right", padding: "0 8px 10px", fontSize: "11px", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: "1px solid var(--border)", whiteSpace: "nowrap" }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pages.map((p, i) => (
            <tr key={`${p.page}-${i}`} style={{ borderBottom: i < pages.length - 1 ? "1px solid var(--border-subtle)" : "none" }}>
              <td style={{ padding: "10px 8px 10px 0", verticalAlign: "middle" }}>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", height: "22px", width: `${Math.round((p.clicks / maxClicks) * 100)}%`, background: "var(--blue)", opacity: 0.06, borderRadius: "4px", pointerEvents: "none" }} />
                  <span style={{ position: "relative", color: "var(--text-secondary)", fontFamily: "'Courier New', monospace", fontSize: "12px", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "min(320px, 40vw)" }}>
                    {p.page}
                  </span>
                </div>
              </td>
              <td style={{ padding: "10px 8px", textAlign: "right", fontWeight: 700, color: "var(--emerald)", fontVariantNumeric: "tabular-nums" }}>{p.clicks.toLocaleString()}</td>
              <td style={{ padding: "10px 8px", textAlign: "right", color: "var(--text-secondary)", fontVariantNumeric: "tabular-nums" }}>{p.impressions.toLocaleString()}</td>
              <td style={{ padding: "10px 8px", textAlign: "right", color: "var(--text-secondary)", fontVariantNumeric: "tabular-nums" }}>{formatCtr(p.ctr)}</td>
              <td style={{ padding: "10px 0 10px 8px", textAlign: "right", color: p.position <= 3 ? "var(--emerald)" : p.position <= 10 ? "var(--amber)" : "var(--text-muted)", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
                {formatPosition(p.position)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

function TrendSkeleton() {
  return <div style={{ height: "220px", borderRadius: "8px", background: "var(--bg-card-hover)", animation: "adm-pulse 1.5s ease-in-out infinite" }} />;
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <div style={{ padding: "12px 16px", borderRadius: "8px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "var(--red)", fontSize: "13px", fontWeight: 500 }}>
      {message}
    </div>
  );
}

// ── Main dashboard ────────────────────────────────────────────────────────────

interface Props {
  initialOverview: GSCOverviewData | null;
  initialTrend: GSCTrendData | null;
  initialRange: string;
}

export default function GSCDashboard({ initialOverview, initialTrend, initialRange }: Props) {
  const searchParams = useSearchParams();

  const [range, setRangeState] = useState<string>(
    () => searchParams.get("range") ?? initialRange ?? "30d"
  );

  function setRange(r: string) {
    setRangeState(r);
    const p = new URLSearchParams(window.location.search);
    p.set("range", r);
    window.history.pushState(null, "", `${window.location.pathname}?${p.toString()}`);
  }

  const { data: overview, isLoading: loadingOverview, isValidating, error: overviewError } = useGSC(range, initialOverview ?? undefined);
  const { data: trend,    isLoading: loadingTrend,    error: trendError }                  = useGSCTrend(range, initialTrend ?? undefined);

  const loading = loadingOverview && !overview;

  // Convert devices to MetricItem with percentage for DonutChart
  const deviceData = useMemo(() => {
    const items = overview?.devices ?? [];
    const total = items.reduce((s, d) => s + d.value, 0);
    return items.map((d) => ({ ...d, percentage: total > 0 ? Math.round((d.value / total) * 100) : 0 }));
  }, [overview?.devices]);

  return (
    <div style={{ padding: "28px 28px 48px", maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }}>
      <style>{`
        @keyframes adm-pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @media (max-width: 900px) { .gsc-split { grid-template-columns: 1fr !important; } }
        @media (max-width: 640px) { .gsc-kpi-grid, .gsc-split { grid-template-columns: 1fr !important; } }
      `}</style>

      {/* ── Header ── */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: "16px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.07em" }}>Analytics</span>
            <span style={{ color: "var(--border)", fontSize: "14px" }}>/</span>
            <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--blue)", textTransform: "uppercase", letterSpacing: "0.07em" }}>Search Console</span>
          </div>
          <h1 style={{ fontSize: "22px", fontWeight: 700, color: "var(--text-primary)", margin: 0, letterSpacing: "-0.02em" }}>
            Search Console
          </h1>
          <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: "4px 0 0" }}>
            Organic search performance — clicks, impressions, rankings, and top queries.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: "4px" }}>
            {(["7d", "30d", "90d"] as const).map((r) => (
              <RangeButton key={r} label={r === "7d" ? "7D" : r === "30d" ? "30D" : "90D"} active={range === r} onClick={() => setRange(r)} />
            ))}
          </div>
          {overview?.lastFetch && (
            <LastSyncBadge timestamp={overview.lastFetch} isValidating={isValidating} />
          )}
        </div>
      </div>

      {/* Error banners */}
      {overviewError && <ErrorBanner message="Could not refresh Search Console data. Showing last cached values." />}
      {trendError    && <ErrorBanner message="Could not refresh trend data. Showing last cached values." />}

      {/* ── KPI row ── */}
      <div className="gsc-kpi-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "12px" }}>
        <KpiCard label="Total Clicks"       value={overview?.clicks      ?? 0}                     sub="From Google Search"      icon={<MousePointer size={16} />} accentColor="var(--emerald)" loading={loading} />
        <KpiCard label="Impressions"        value={overview?.impressions ?? 0}                     sub="Times shown in results"  icon={<Eye size={16} />}          accentColor="var(--blue)"    loading={loading} />
        <KpiCard label="Avg CTR"            value={overview ? formatCtr(overview.ctr) : "N/A"}     sub="Click-through rate"      icon={<TrendingUp size={16} />}   accentColor="var(--amber)"   loading={loading} />
        <KpiCard label="Avg Position"       value={overview ? formatPosition(overview.avgPosition) : "N/A"} sub="Google ranking position" icon={<Hash size={16} />} accentColor="var(--purple)"  loading={loading} />
      </div>

      {/* ── Click trend ── */}
      <SectionCard title="Clicks & Impressions Over Time" subtitle={`Daily organic search performance · ${range.toUpperCase()} window`}>
        {loadingTrend && !trend ? <TrendSkeleton /> : <GSCTrendChart data={trend?.data ?? []} range={range} />}
      </SectionCard>

      {/* ── Devices + Countries ── */}
      <div className="gsc-split" style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "12px" }}>
        <SectionCard title="Devices" subtitle="Clicks by device type">
          <DonutChart data={deviceData} label="clicks" />
        </SectionCard>
        <SectionCard title="Countries" subtitle="Top countries by clicks">
          {(overview?.countries?.length ?? 0) === 0 ? (
            <EmptyState icon={<Globe size={18} />} title="No geo data" description="Country data will appear once GSC syncs." />
          ) : (
            <HBarChart data={overview?.countries ?? []} color="var(--blue)" limit={8} />
          )}
        </SectionCard>
      </div>

      {/* ── Top Queries ── */}
      <SectionCard title="Top Queries" subtitle="Keywords driving organic traffic · position coloured green ≤3, amber ≤10">
        <QueriesTable queries={overview?.topQueries ?? []} />
      </SectionCard>

      {/* ── Top Pages ── */}
      <SectionCard title="Top Pages" subtitle="Pages ranked in Google Search">
        <PagesTable pages={overview?.topPages ?? []} />
      </SectionCard>
    </div>
  );
}
