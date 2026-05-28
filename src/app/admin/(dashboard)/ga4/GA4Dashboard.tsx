"use client";

import { useMemo, memo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Users, Globe, Timer, TrendingDown, BarChart2 } from "lucide-react";
import { useGA4 } from "@/hooks/useGA4";
import { useGA4Trend } from "@/hooks/useGA4Trend";
import type { GA4OverviewData, GA4TrendData } from "@/lib/analytics/providers/ga4";
import KpiCard from "@/components/admin/shared/KpiCard";
import SectionCard from "@/components/admin/shared/SectionCard";
import LastSyncBadge from "@/components/admin/shared/LastSyncBadge";
import EmptyState from "@/components/admin/shared/EmptyState";
import HBarChart from "@/components/admin/charts/HBarChart";
import DonutChart from "@/components/admin/charts/DonutChart";
import GA4TrendChart from "@/components/admin/charts/GA4TrendChart";

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDuration(secs: number): string {
  if (secs <= 0) return "N/A";
  if (secs < 60) return `${secs}s`;
  return `${Math.floor(secs / 60)}m ${secs % 60}s`;
}

const DEV_SOURCES = new Set(["(direct)", "localhost", "127.0.0.1"]);

function filterSources(items: { name: string; value: number; percentage?: number }[]) {
  return items.filter((s) => !DEV_SOURCES.has(s.name.toLowerCase()));
}

// ── Sub-components ────────────────────────────────────────────────────────────

const RangeButton = memo(function RangeButton({
  label, active, onClick,
}: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "5px 14px",
        borderRadius: "6px",
        fontSize: "12px",
        fontWeight: active ? 600 : 500,
        border: active ? "1px solid var(--accent)44" : "1px solid var(--border)",
        background: active ? "var(--accent-dim)" : "transparent",
        color: active ? "var(--accent)" : "var(--text-secondary)",
        cursor: "pointer",
        transition: "background 0.15s, color 0.15s, border-color 0.15s",
        letterSpacing: "0.01em",
        userSelect: "none",
      }}
    >
      {label}
    </button>
  );
});

const PagesTable = memo(function PagesTable({
  pages,
}: { pages: { path: string; views: number }[] }) {
  if (pages.length === 0) {
    return (
      <EmptyState
        icon={<Globe size={18} />}
        title="No page data"
        description="Page visit data will appear once GA4 syncs."
      />
    );
  }

  const max = pages[0].views;

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", padding: "0 12px 10px 0", fontSize: "11px", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: "1px solid var(--border)" }}>
              Page
            </th>
            <th style={{ textAlign: "right", padding: "0 0 10px", fontSize: "11px", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: "1px solid var(--border)", width: "90px" }}>
              Views
            </th>
          </tr>
        </thead>
        <tbody>
          {pages.map((page, i) => (
            <tr key={`${page.path}-${i}`} style={{ borderBottom: i < pages.length - 1 ? "1px solid var(--border-subtle)" : "none" }}>
              <td style={{ padding: "11px 12px 11px 0", verticalAlign: "middle" }}>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", height: "24px", width: `${Math.round((page.views / max) * 100)}%`, background: "var(--accent)", opacity: 0.06, borderRadius: "4px", pointerEvents: "none" }} />
                  <span style={{ position: "relative", color: "var(--text-secondary)", fontFamily: "'Courier New', monospace", fontSize: "12px", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "min(400px, 55vw)" }}>
                    {page.path}
                  </span>
                </div>
              </td>
              <td style={{ padding: "11px 0", textAlign: "right", fontWeight: 600, color: "var(--text-primary)", fontVariantNumeric: "tabular-nums", verticalAlign: "middle" }}>
                {page.views.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

function TrendSkeleton() {
  return (
    <div style={{ height: "220px", borderRadius: "8px", background: "var(--bg-card-hover)", animation: "adm-pulse 1.5s ease-in-out infinite" }} />
  );
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
  initialOverview: GA4OverviewData | null;
  initialTrend: GA4TrendData | null;
  initialRange: string;
}

export default function GA4Dashboard({ initialOverview, initialTrend, initialRange }: Props) {
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

  const {
    data: overview,
    isLoading: loadingOverview,
    isValidating,
    error: overviewError,
  } = useGA4(range, initialOverview ?? undefined);

  const {
    data: trend,
    isLoading: loadingTrend,
    error: trendError,
  } = useGA4Trend(range, initialTrend ?? undefined);

  const loading = loadingOverview && !overview;

  const filteredSources = useMemo(
    () => filterSources(overview?.sources ?? []),
    [overview?.sources]
  );

  return (
    <div style={{ padding: "28px 28px 48px", maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }}>
      <style>{`
        @keyframes adm-pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @media (max-width: 900px) { .ga4-aud-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 640px) {
          .ga4-kpi-grid, .ga4-aud-grid, .ga4-trf-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── Header ── */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: "16px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.07em" }}>
              Analytics
            </span>
            <span style={{ color: "var(--border)", fontSize: "14px" }}>/</span>
            <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--amber)", textTransform: "uppercase", letterSpacing: "0.07em" }}>
              Google Analytics 4
            </span>
          </div>
          <h1 style={{ fontSize: "22px", fontWeight: 700, color: "var(--text-primary)", margin: 0, letterSpacing: "-0.02em" }}>
            GA4 Analytics
          </h1>
          <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: "4px 0 0" }}>
            Traffic, engagement, and audience data from Google Analytics 4.
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
      {overviewError && <ErrorBanner message="Could not refresh GA4 data. Showing last cached values." />}
      {trendError && <ErrorBanner message="Could not refresh trend data. Showing last cached values." />}

      {/* ── KPI row ── */}
      <div className="ga4-kpi-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "12px" }}>
        <KpiCard label="Sessions" value={overview?.sessions ?? 0} sub="Total sessions" icon={<BarChart2 size={16} />} accentColor="var(--amber)" loading={loading} />
        <KpiCard label="Active Users" value={overview?.activeUsers ?? 0} sub="Users with engagement" icon={<Users size={16} />} accentColor="var(--accent)" loading={loading} />
        <KpiCard label="New Users" value={overview?.newUsers ?? 0} sub="First-time visitors" icon={<Users size={16} />} accentColor="var(--emerald)" loading={loading} />
        <KpiCard label="Avg Duration" value={formatDuration(overview?.avgSessionDuration ?? 0)} sub="Avg session length" icon={<Timer size={16} />} accentColor="var(--cyan)" loading={loading} />
        <KpiCard label="Bounce Rate" value={overview?.bounceRate ? `${overview.bounceRate}%` : "N/A"} sub="Single-page sessions" icon={<TrendingDown size={16} />} accentColor="var(--purple)" loading={loading} />
      </div>

      {/* ── Sessions trend ── */}
      <SectionCard title="Sessions Over Time" subtitle={`Daily traffic · ${range.toUpperCase()} window`}>
        {loadingTrend && !trend ? (
          <TrendSkeleton />
        ) : (
          <GA4TrendChart data={trend?.data ?? []} range={range} />
        )}
      </SectionCard>

      {/* ── Audience breakdown ── */}
      <div className="ga4-aud-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr 1fr", gap: "12px" }}>
        <SectionCard title="Devices" subtitle="Device category split">
          <DonutChart data={overview?.devices ?? []} label="sessions" />
        </SectionCard>
        <SectionCard title="Browsers" subtitle="Top browsers by sessions">
          <HBarChart data={overview?.browsers ?? []} color="var(--amber)" />
        </SectionCard>
        <SectionCard title="Operating Systems" subtitle="OS distribution">
          <HBarChart data={overview?.os ?? []} color="var(--cyan)" />
        </SectionCard>
      </div>

      {/* ── Traffic sources ── */}
      <div className="ga4-trf-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        <SectionCard title="Channels" subtitle="How visitors arrive">
          <HBarChart data={overview?.channels ?? []} color="var(--emerald)" />
        </SectionCard>
        <SectionCard title="Traffic Sources" subtitle="Referring sources">
          <HBarChart data={filteredSources} color="var(--amber)" />
        </SectionCard>
      </div>

      {/* ── Geography ── */}
      <SectionCard title="Countries" subtitle="Sessions by country">
        {(overview?.countries?.length ?? 0) === 0 ? (
          <EmptyState icon={<Globe size={18} />} title="No geo data" description="Country data will appear once GA4 syncs." />
        ) : (
          <HBarChart data={overview?.countries ?? []} color="var(--blue)" limit={8} />
        )}
      </SectionCard>

      {/* ── Top pages ── */}
      <SectionCard title="Top Pages" subtitle="Most viewed pages">
        <PagesTable pages={overview?.pages ?? []} />
      </SectionCard>
    </div>
  );
}
