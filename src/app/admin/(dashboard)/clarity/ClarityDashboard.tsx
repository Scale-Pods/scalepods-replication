"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Users, MousePointer2, Timer, Globe, Monitor, Wifi } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useTrend } from "@/hooks/useTrend";
import type { OverviewData, TrendData } from "@/types/analytics";
import KpiCard from "@/components/admin/shared/KpiCard";
import SectionCard from "@/components/admin/shared/SectionCard";
import LastSyncBadge from "@/components/admin/shared/LastSyncBadge";
import EmptyState from "@/components/admin/shared/EmptyState";
import TrendChart from "@/components/admin/charts/TrendChart";
import HBarChart from "@/components/admin/charts/HBarChart";
import DonutChart from "@/components/admin/charts/DonutChart";

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatDuration(secs: number): string {
  if (secs <= 0) return "N/A";
  if (secs < 60) return `${secs}s`;
  return `${Math.floor(secs / 60)}m ${secs % 60}s`;
}

function formatScrollDepth(depth: number): string {
  if (depth <= 0) return "N/A";
  return `${depth}%`;
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

// ── Date range pill button ────────────────────────────────────────────────────

function RangeButton({
  label,
  value,
  active,
  onClick,
}: {
  label: string;
  value: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "5px 12px",
        borderRadius: "6px",
        fontSize: "12px",
        fontWeight: active ? 600 : 500,
        border: active ? "1px solid var(--accent)44" : "1px solid var(--border)",
        background: active ? "var(--accent-dim)" : "transparent",
        color: active ? "var(--accent)" : "var(--text-secondary)",
        cursor: "pointer",
        transition: "all 0.15s",
        letterSpacing: "0.01em",
      }}
    >
      {label}
    </button>
  );
}

// ── Top Pages table ───────────────────────────────────────────────────────────

function PagesTable({ pages }: { pages: { path: string; views: number }[] }) {
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
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "13px",
        }}
      >
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
                borderBottom: i < filtered.length - 1 ? "1px solid var(--border-subtle)" : "none",
              }}
            >
              <td style={{ padding: "11px 12px 11px 0", verticalAlign: "middle" }}>
                {/* Progress bar behind path */}
                <div style={{ position: "relative" }}>
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
}

// ── Main dashboard component ──────────────────────────────────────────────────

interface Props {
  initialOverview: OverviewData | null;
  initialTrend: TrendData | null;
  initialRange: string;
}

export default function ClarityDashboard({ initialOverview, initialTrend, initialRange }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Range lives in URL — client picks it up live
  const range = searchParams.get("range") ?? initialRange ?? "30d";

  function setRange(r: string) {
    const p = new URLSearchParams(searchParams.toString());
    p.set("range", r);
    router.push(`${pathname}?${p.toString()}`);
  }

  // SWR — fallback to server-prefetched data, then refresh every 5 min
  const { data: overview, isLoading: loadingOverview, isValidating } = useAnalytics(
    range,
    initialOverview ?? undefined
  );
  const { data: trend, isLoading: loadingTrend } = useTrend(range, initialTrend ?? undefined);

  const loading = loadingOverview && !overview;

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
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
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
          <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: "4px 0 0" }}>
            Session behaviour, traffic sources, and audience breakdown.
          </p>
        </div>

        {/* Controls row */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          {/* Range pills */}
          <div style={{ display: "flex", gap: "4px" }}>
            {(["7d", "30d", "90d"] as const).map((r) => (
              <RangeButton
                key={r}
                label={r === "7d" ? "7D" : r === "30d" ? "30D" : "90D"}
                value={r}
                active={range === r}
                onClick={() => setRange(r)}
              />
            ))}
          </div>
          {/* Sync badge */}
          {overview?.lastSync && (
            <LastSyncBadge timestamp={overview.lastSync} isValidating={isValidating} />
          )}
        </div>
      </div>

      {/* ── KPI row ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "12px",
        }}
        className="kpi-grid"
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
        subtitle={`Daily session activity · ${range.toUpperCase()} window`}
      >
        {loadingTrend && !trend ? (
          <div
            style={{
              height: "220px",
              background: "var(--bg-card-hover)",
              borderRadius: "8px",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
        ) : (
          <TrendChart data={trend?.data ?? []} range={range} />
        )}
        <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
      </SectionCard>

      {/* ── Audience breakdown ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.4fr 1fr",
          gap: "12px",
        }}
        className="audience-grid"
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
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
        }}
        className="traffic-grid"
      >
        <SectionCard title="Channels" subtitle="How visitors arrive">
          <HBarChart data={overview?.channels ?? []} color="var(--emerald)" />
        </SectionCard>

        <SectionCard title="Traffic Sources" subtitle="Referring sources">
          <HBarChart data={overview?.sources ?? []} color="var(--amber)" />
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

      {/* ── Responsive overrides ── */}
      <style>{`
        @media (max-width: 900px) {
          .audience-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .kpi-grid,
          .audience-grid,
          .traffic-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
