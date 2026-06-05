"use client";

import { useMemo, memo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Users, MousePointer2, Timer, Globe } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useTrend } from "@/hooks/useTrend";
import type { OverviewData, TrendData, MetricItem } from "@/types/analytics";
import KpiCard from "@/components/admin/shared/KpiCard";
import SectionCard from "@/components/admin/shared/SectionCard";
import LastSyncBadge from "@/components/admin/shared/LastSyncBadge";
import EmptyState from "@/components/admin/shared/EmptyState";
import RangeControls, { type RangeValue } from "@/components/admin/shared/RangeControls";
import TrendChart from "@/components/admin/charts/TrendChart";
import HBarChart from "@/components/admin/charts/HBarChart";
import DonutChart from "@/components/admin/charts/DonutChart";

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDuration(secs: number): string {
  if (secs <= 0) return "N/A";
  if (secs < 60) return `${secs}s`;
  return `${Math.floor(secs / 60)}m ${secs % 60}s`;
}

function formatScrollDepth(depth: number): string {
  if (depth <= 0) return "N/A";
  return `${depth}%`;
}

/** Dev traffic source names that should be hidden in the UI */
const DEV_SOURCES = new Set(["localhost", "127.0.0.1"]);

function filterDevSources(items: MetricItem[]): MetricItem[] {
  return items.filter((s) => !DEV_SOURCES.has(s.name.toLowerCase()));
}

/** Strip dev/admin paths from the pages breakdown */
function filterPages(
  pages: { path: string; views: number }[]
): { path: string; views: number }[] {
  return pages.filter(
    (p) =>
      !p.path.startsWith("/admin") &&
      !p.path.includes("localhost") &&
      !p.path.includes("127.0.0.1")
  );
}

// ── Sub-components (memoised) ─────────────────────────────────────────────────

const PagesTable = memo(function PagesTable({
  pages,
}: {
  pages: { path: string; views: number }[];
}) {
  const filtered = filterPages(pages);

  if (filtered.length === 0) {
    return (
      <EmptyState
        icon={<Globe size={18} />}
        title="No page data"
        description="Page visit data will appear once Clarity syncs."
      />
    );
  }

  const max = filtered[0].views;

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
        <thead>
          <tr>
            <th
              style={{
                textAlign: "left",
                padding: "0 12px 10px 0",
                fontSize: "11px",
                fontWeight: 600,
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                borderBottom: "1px solid var(--border)",
              }}
            >
              Page
            </th>
            <th
              style={{
                textAlign: "right",
                padding: "0 0 10px",
                fontSize: "11px",
                fontWeight: 600,
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                borderBottom: "1px solid var(--border)",
                width: "90px",
              }}
            >
              Sessions
            </th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((page, i) => (
            <tr
              key={`${page.path}-${i}`}
              style={{
                borderBottom:
                  i < filtered.length - 1 ? "1px solid var(--border-subtle)" : "none",
              }}
            >
              <td style={{ padding: "11px 12px 11px 0", verticalAlign: "middle" }}>
                <div style={{ position: "relative" }}>
                  {/* Subtle background progress bar */}
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      height: "24px",
                      width: `${Math.round((page.views / max) * 100)}%`,
                      background: "var(--accent)",
                      opacity: 0.06,
                      borderRadius: "4px",
                      pointerEvents: "none",
                    }}
                  />
                  <span
                    style={{
                      position: "relative",
                      color: "var(--text-secondary)",
                      fontFamily: "'Courier New', monospace",
                      fontSize: "12px",
                      display: "block",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: "min(400px, 55vw)",
                    }}
                  >
                    {page.path}
                  </span>
                </div>
              </td>
              <td
                style={{
                  padding: "11px 0",
                  textAlign: "right",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  fontVariantNumeric: "tabular-nums",
                  verticalAlign: "middle",
                }}
              >
                {page.views.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

// ── Trend loading skeleton ────────────────────────────────────────────────────

function TrendSkeleton() {
  return (
    <div
      style={{
        height: "220px",
        borderRadius: "8px",
        background: "var(--bg-card-hover)",
        animation: "adm-pulse 1.5s ease-in-out infinite",
      }}
    />
  );
}

// ── Error banner ──────────────────────────────────────────────────────────────

function ErrorBanner({ message }: { message: string }) {
  return (
    <div
      style={{
        padding: "12px 16px",
        borderRadius: "8px",
        background: "rgba(239,68,68,0.08)",
        border: "1px solid rgba(239,68,68,0.2)",
        color: "var(--red)",
        fontSize: "13px",
        fontWeight: 500,
      }}
    >
      {message}
    </div>
  );
}

// ── Main dashboard ────────────────────────────────────────────────────────────

interface Props {
  initialOverview: OverviewData | null;
  initialTrend: TrendData | null;
  initialRange: string;
}

export default function ClarityDashboard({ initialOverview, initialTrend, initialRange }: Props) {
  const searchParams = useSearchParams();

  // Initialise from URL so direct links / back-button work, then own the state
  // locally so range changes are instant (no server re-render).
  const [rangeVal, setRangeVal] = useState<RangeValue>(
    () => ({ preset: (searchParams.get("range") as RangeValue["preset"]) ?? (initialRange as RangeValue["preset"]) ?? "30d" })
  );

  // Derive SWR key from range value
  const apiRange = rangeVal.custom
    ? `custom&start=${rangeVal.custom.start}&end=${rangeVal.custom.end}`
    : (rangeVal.preset ?? "30d");

  // Label for subtitle
  const rangeLabel = rangeVal.custom
    ? `${rangeVal.custom.start} → ${rangeVal.custom.end}`
    : (rangeVal.preset ?? "30d").toUpperCase();

  function handleRangeChange(r: RangeValue) {
    setRangeVal(r);
    const p = new URLSearchParams(window.location.search);
    if (r.custom) {
      p.set("range", "custom");
      p.set("start", r.custom.start);
      p.set("end", r.custom.end);
    } else {
      p.set("range", r.preset ?? "30d");
      p.delete("start"); p.delete("end");
    }
    window.history.pushState(null, "", `${window.location.pathname}?${p.toString()}`);
  }

  const {
    data: overview,
    isLoading: loadingOverview,
    isValidating,
    error: overviewError,
  } = useAnalytics(apiRange, initialOverview ?? undefined);

  const {
    data: trend,
    isLoading: loadingTrend,
    error: trendError,
  } = useTrend(apiRange, initialTrend ?? undefined);

  const loading = loadingOverview && !overview;

  // ── Memoised derived data (prevents re-computation on every render) ──────────
  const filteredSources = useMemo(
    () => filterDevSources(overview?.sources ?? []),
    [overview?.sources]
  );

  const filteredPages = useMemo(
    () => filterPages(overview?.pages ?? []),
    [overview?.pages]
  );

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
      {/* Pulse keyframe — defined once here, not duplicated in children */}
      <style>{`
        @keyframes adm-pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @media (max-width: 900px) { .aud-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 640px) {
          .kpi-grid, .aud-grid, .trf-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── Page header ── */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "4px",
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
              Analytics
            </span>
            <span style={{ color: "var(--border)", fontSize: "14px" }}>/</span>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: "var(--accent)",
                textTransform: "uppercase",
                letterSpacing: "0.07em",
              }}
            >
              Microsoft Clarity
            </span>
          </div>
          <h1
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "var(--text-primary)",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Clarity Analytics
          </h1>
          <p
            style={{
              fontSize: "13px",
              color: "var(--text-muted)",
              margin: "4px 0 0",
            }}
          >
            Session behaviour, traffic sources, and audience breakdown.
          </p>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          <RangeControls range={rangeVal} onChange={handleRangeChange} />
          {overview?.lastSync && (
            <LastSyncBadge timestamp={overview.lastSync} isValidating={isValidating} />
          )}
        </div>
      </div>

      {/* Error banners (non-blocking — stale data still shown) */}
      {overviewError && (
        <ErrorBanner message="Could not refresh analytics data. Showing last cached values." />
      )}
      {trendError && (
        <ErrorBanner message="Could not refresh trend data. Showing last cached values." />
      )}

      {/* Clarity data availability banner */}
      <div
        style={{
          padding: "12px 14px",
          background: "rgba(249, 115, 22, 0.08)",
          border: "1px solid rgba(249, 115, 22, 0.3)",
          borderRadius: "8px",
          fontSize: "13px",
          color: "var(--text-secondary)",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span style={{ fontSize: "16px" }}>⚠️</span>
        <span>
          Clarity data available from <strong>May 5, 2026</strong> (31 days collected)
          {rangeVal.preset === "90d" && <span style={{ marginLeft: "8px", fontWeight: 600 }}>— Only 31 days available</span>}
        </span>
      </div>

      {/* ── KPI row ── */}
      <div
        className="kpi-grid"
        style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "12px" }}
      >
        <KpiCard
          label="Total Sessions"
          value={overview?.totalSessions ?? 0}
          sub="Unique visits tracked"
          icon={<Users size={16} />}
          accentColor="var(--purple)"
          loading={loading}
        />
        <KpiCard
          label="Avg Scroll Depth"
          value={formatScrollDepth(overview?.avgScrollDepth ?? 0)}
          sub="Average page scroll"
          icon={<MousePointer2 size={16} />}
          accentColor="var(--cyan)"
          loading={loading}
        />
        <KpiCard
          label="Avg Engagement"
          value={formatDuration(overview?.avgEngagementSecs ?? 0)}
          sub="Time on site per session"
          icon={<Timer size={16} />}
          accentColor="var(--emerald)"
          loading={loading}
        />
      </div>

      {/* ── Session trend ── */}
      <SectionCard
        title="Sessions Over Time"
        subtitle={`Daily session activity · ${rangeLabel} window`}
      >
        {loadingTrend && !trend ? (
          <TrendSkeleton />
        ) : (
          <TrendChart data={trend?.data ?? []} range={rangeVal.preset ?? "custom"} />
        )}
      </SectionCard>

      {/* ── Audience breakdown ── */}
      <div
        className="aud-grid"
        style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr 1fr", gap: "12px" }}
      >
        <SectionCard title="Devices" subtitle="PC vs Mobile split">
          <DonutChart data={overview?.devices ?? []} label="sessions" />
        </SectionCard>

        <SectionCard title="Browsers" subtitle="Top browsers by sessions">
          <HBarChart data={overview?.browsers ?? []} color="var(--accent)" />
        </SectionCard>

        <SectionCard title="Operating Systems" subtitle="OS distribution">
          <HBarChart data={overview?.os ?? []} color="var(--cyan)" />
        </SectionCard>
      </div>

      {/* ── Traffic sources ── */}
      <div
        className="trf-grid"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}
      >
        <SectionCard title="Channels" subtitle="How visitors arrive">
          <HBarChart data={overview?.channels ?? []} color="var(--emerald)" />
        </SectionCard>

        <SectionCard
          title="Traffic Sources"
          subtitle="Referring sources · dev traffic excluded"
        >
          <HBarChart data={filteredSources} color="var(--amber)" />
        </SectionCard>
      </div>

      {/* ── Geography ── */}
      <SectionCard title="Countries" subtitle="Sessions by country">
        {(overview?.countries?.length ?? 0) === 0 ? (
          <EmptyState
            icon={<Globe size={18} />}
            title="No geo data"
            description="Country data will appear once Clarity syncs."
          />
        ) : (
          <HBarChart data={overview?.countries ?? []} color="var(--blue)" limit={8} />
        )}
      </SectionCard>

      {/* ── Top pages ── */}
      <SectionCard
        title="Top Pages"
        subtitle="Most visited pages · dev traffic excluded"
      >
        <PagesTable pages={overview?.pages ?? []} />
      </SectionCard>
    </div>
  );
}
