"use client";

import { useMemo, useState, useCallback, Fragment } from "react";
import {
  Users,
  MousePointerClick,
  Timer,
  Smartphone,
  Monitor,
  Tablet,
  ChevronRight,
  ChevronDown,
  Eye,
  MousePointer,
  ArrowDownWideNarrow,
  Flag,
  LogIn,
  Circle,
} from "lucide-react";
import { useGA4Sessions, type EnrichedSession } from "@/hooks/useGA4Sessions";
import KpiCard from "@/components/admin/shared/KpiCard";
import SectionCard from "@/components/admin/shared/SectionCard";
import LastSyncBadge from "@/components/admin/shared/LastSyncBadge";
import EmptyState from "@/components/admin/shared/EmptyState";

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmtDuration(secs: number): string {
  if (!secs || secs <= 0) return "0s";
  if (secs < 60) return `${secs}s`;
  return `${Math.floor(secs / 60)}m ${secs % 60}s`;
}

function fmtTime(iso: string): string {
  try {
    return new Date(iso).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function fmtEventTime(iso: string): string {
  try {
    return new Date(iso).toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  } catch {
    return iso;
  }
}

function pathOf(url: string | null): string {
  if (!url) return "/";
  try {
    return new URL(url).pathname || "/";
  } catch {
    return url || "/";
  }
}

function DeviceIcon({ category }: { category: string }) {
  const size = 14;
  if (category === "mobile") return <Smartphone size={size} />;
  if (category === "tablet") return <Tablet size={size} />;
  return <Monitor size={size} />;
}

function scoreColor(score: number): string {
  if (score >= 70) return "var(--green, #22c55e)";
  if (score >= 40) return "var(--accent)";
  return "var(--text-muted)";
}

interface SessionEvent {
  event_name: string;
  event_timestamp: string;
  page_location: string | null;
  page_title: string | null;
}

function eventIcon(name: string) {
  const size = 13;
  if (name === "page_view") return <Eye size={size} />;
  if (name === "scroll") return <ArrowDownWideNarrow size={size} />;
  if (name.includes("click")) return <MousePointer size={size} />;
  if (name === "session_start" || name === "first_visit") return <LogIn size={size} />;
  if (name === "user_engagement") return <Timer size={size} />;
  if (name === "form_submit" || name.includes("conversion")) return <Flag size={size} />;
  return <Circle size={size} />;
}

function prettyEventName(name: string): string {
  return name.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

const RANGES = [
  { label: "7D", days: 7 },
  { label: "14D", days: 14 },
  { label: "30D", days: 30 },
];

// ── UI bits ───────────────────────────────────────────────────────────────────

function Badge({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        padding: "2px 8px",
        borderRadius: "100px",
        fontSize: "11px",
        fontWeight: 600,
        background: "var(--bg-card-hover)",
        color: color ?? "var(--text-secondary)",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

// Per-session expanded journey timeline
function JourneyTimeline({ state }: { state: EventState | undefined }) {
  if (!state || state.loading) {
    return (
      <div style={{ padding: "16px 8px", color: "var(--text-muted)", fontSize: "12px" }}>
        Loading journey…
      </div>
    );
  }
  if (state.error) {
    return (
      <div style={{ padding: "16px 8px", color: "var(--red)", fontSize: "12px" }}>
        {state.error}
      </div>
    );
  }
  if (state.events.length === 0) {
    return (
      <div style={{ padding: "16px 8px", color: "var(--text-muted)", fontSize: "12px" }}>
        No individual events stored for this session yet. They populate on the next sync.
      </div>
    );
  }

  return (
    <div style={{ padding: "8px 8px 14px 36px", display: "flex", flexDirection: "column", gap: "2px" }}>
      {state.events.map((e, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "6px 0",
            borderLeft: "2px solid var(--border)",
            paddingLeft: "14px",
            marginLeft: "6px",
            position: "relative",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: "-8px",
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--accent)",
            }}
          >
            {eventIcon(e.event_name)}
          </span>
          <span
            style={{
              fontVariantNumeric: "tabular-nums",
              color: "var(--text-muted)",
              fontSize: "11px",
              minWidth: "70px",
            }}
          >
            {fmtEventTime(e.event_timestamp)}
          </span>
          <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-primary)", minWidth: "120px" }}>
            {prettyEventName(e.event_name)}
          </span>
          <span
            title={e.page_location ?? ""}
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "11px",
              color: "var(--text-secondary)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {pathOf(e.page_location)}
          </span>
        </div>
      ))}
    </div>
  );
}

interface EventState {
  loading: boolean;
  events: SessionEvent[];
  error?: string;
}

function SessionsTable({ sessions }: { sessions: EnrichedSession[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [eventMap, setEventMap] = useState<Record<string, EventState>>({});

  const toggle = useCallback(
    async (sessionId: string) => {
      if (expanded === sessionId) {
        setExpanded(null);
        return;
      }
      setExpanded(sessionId);

      if (!eventMap[sessionId]) {
        setEventMap((m) => ({ ...m, [sessionId]: { loading: true, events: [] } }));
        try {
          const res = await fetch(
            `/api/analytics/ga4-sessions/events?session_id=${encodeURIComponent(sessionId)}`
          );
          const json = await res.json();
          if (!res.ok) throw new Error(json.error || "Failed to load");
          setEventMap((m) => ({
            ...m,
            [sessionId]: { loading: false, events: json.events ?? [] },
          }));
        } catch (err) {
          setEventMap((m) => ({
            ...m,
            [sessionId]: {
              loading: false,
              events: [],
              error: err instanceof Error ? err.message : "Failed to load",
            },
          }));
        }
      }
    },
    [expanded, eventMap]
  );

  if (sessions.length === 0) {
    return (
      <EmptyState
        icon={<Users size={18} />}
        title="No sessions yet"
        description="User-level sessions appear here after the sync from BigQuery runs."
      />
    );
  }

  const th: React.CSSProperties = {
    textAlign: "left",
    padding: "0 12px 10px 0",
    fontSize: "11px",
    fontWeight: 600,
    color: "var(--text-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    borderBottom: "1px solid var(--border)",
    whiteSpace: "nowrap",
  };
  const td: React.CSSProperties = {
    padding: "12px 12px 12px 0",
    verticalAlign: "middle",
    fontSize: "13px",
    color: "var(--text-secondary)",
  };

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "920px" }}>
        <thead>
          <tr>
            <th style={{ ...th, width: "28px" }}></th>
            <th style={th}>Time</th>
            <th style={th}>Device</th>
            <th style={th}>Location</th>
            <th style={th}>Source / Medium</th>
            <th style={{ ...th, textAlign: "right" }}>Events</th>
            <th style={{ ...th, textAlign: "right" }}>Engaged</th>
            <th style={{ ...th, textAlign: "right" }}>Score</th>
            <th style={{ ...th, textAlign: "right" }}>Scroll</th>
            <th style={th}>Landing page</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((s, i) => {
            const isOpen = expanded === s.session_id;
            return (
              <Fragment key={s.session_id || i}>
                <tr
                  onClick={() => toggle(s.session_id)}
                  style={{
                    borderBottom:
                      isOpen || i < sessions.length - 1
                        ? "1px solid var(--border-subtle)"
                        : "none",
                    cursor: "pointer",
                    background: isOpen ? "var(--bg-card-hover)" : "transparent",
                  }}
                >
                  <td style={{ ...td, color: "var(--text-muted)", paddingRight: 0 }}>
                    {isOpen ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
                  </td>
                  <td style={{ ...td, whiteSpace: "nowrap", color: "var(--text-primary)" }}>
                    {fmtTime(s.session_start_time)}
                  </td>
                  <td style={td}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "7px" }}>
                      <span style={{ color: "var(--text-muted)" }}>
                        <DeviceIcon category={s.device_category} />
                      </span>
                      <span>
                        {s.browser}
                        <span style={{ color: "var(--text-muted)" }}> · {s.os}</span>
                      </span>
                    </span>
                  </td>
                  <td style={td}>
                    {s.city && s.city !== "unknown" ? `${s.city}, ` : ""}
                    {s.country}
                  </td>
                  <td style={td}>
                    <Badge
                      color={s.session_medium === "organic" ? "var(--green,#22c55e)" : undefined}
                    >
                      {s.session_source} / {s.session_medium}
                    </Badge>
                  </td>
                  <td style={{ ...td, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
                    {s.event_count}
                  </td>
                  <td
                    style={{
                      ...td,
                      textAlign: "right",
                      fontVariantNumeric: "tabular-nums",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {fmtDuration(Math.round(s.engagement_time_msec / 1000))}
                  </td>
                  <td style={{ ...td, textAlign: "right" }}>
                    <span
                      style={{
                        display: "inline-block",
                        minWidth: "34px",
                        padding: "2px 8px",
                        borderRadius: "6px",
                        fontWeight: 700,
                        fontSize: "12px",
                        color: scoreColor(s.engagement_score),
                        background: "var(--bg-card-hover)",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {s.engagement_score}
                    </span>
                  </td>
                  <td style={{ ...td, textAlign: "right" }}>
                    {s.clarity_scroll_depth != null ? (
                      <span
                        title={`Clarity avg scroll depth for this cohort: ${s.clarity_scroll_depth}%`}
                        style={{ display: "inline-flex", flexDirection: "column", alignItems: "flex-end", gap: "2px" }}
                      >
                        <span style={{ fontSize: "12px", fontWeight: 600, fontVariantNumeric: "tabular-nums", color: "var(--text-primary)" }}>
                          {Math.round(s.clarity_scroll_depth)}%
                        </span>
                        <span style={{ width: "48px", height: "3px", borderRadius: "2px", background: "var(--border)", display: "block", overflow: "hidden" }}>
                          <span style={{ display: "block", height: "100%", width: `${Math.min(100, s.clarity_scroll_depth)}%`, background: "var(--accent)", borderRadius: "2px" }} />
                        </span>
                      </span>
                    ) : (
                      <span style={{ color: "var(--text-muted)", fontSize: "12px" }}>—</span>
                    )}
                  </td>
                  <td style={td}>
                    <span
                      title={s.first_page_location}
                      style={{
                        fontFamily: "'Courier New', monospace",
                        fontSize: "12px",
                        color: "var(--text-secondary)",
                        display: "block",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: "240px",
                      }}
                    >
                      {pathOf(s.first_page_location)}
                    </span>
                  </td>
                </tr>
                {isOpen && (
                  <tr>
                    <td
                      colSpan={10}
                      style={{
                        padding: 0,
                        background: "var(--bg-card-hover)",
                        borderBottom:
                          i < sessions.length - 1 ? "1px solid var(--border-subtle)" : "none",
                      }}
                    >
                      <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", padding: "12px 8px 0 36px" }}>
                        Session Journey · user {s.user_pseudo_id}
                      </div>
                      <JourneyTimeline state={eventMap[s.session_id]} />
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function SessionsDashboard() {
  const [days, setDays] = useState(7);
  const { data, error, isLoading, mutate } = useGA4Sessions({ days, limit: 500 });

  const sessions = data?.sessions ?? [];

  const kpis = useMemo(() => {
    const totalSessions = data?.total ?? sessions.length;
    const uniqueUsers = new Set(sessions.map((s) => s.user_pseudo_id)).size;
    const avgEngagement =
      sessions.length > 0
        ? Math.round(
            sessions.reduce((sum, s) => sum + s.engagement_time_msec / 1000, 0) / sessions.length
          )
        : 0;
    const mobilePct =
      sessions.length > 0
        ? Math.round(
            (sessions.filter((s) => s.device_category === "mobile").length / sessions.length) * 100
          )
        : 0;
    return { totalSessions, uniqueUsers, avgEngagement, mobilePct };
  }, [sessions, data]);

  return (
    <div style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>
            User Sessions
          </h1>
          <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: "4px 0 0" }}>
            Individual session-level data from GA4 (via BigQuery) — click a row to see its full
            event journey.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {data?.lastSync && <LastSyncBadge timestamp={data.lastSync} isValidating={isLoading} />}
          <div
            style={{
              display: "flex",
              gap: "2px",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              padding: "2px",
            }}
          >
            {RANGES.map((r) => (
              <button
                key={r.days}
                onClick={() => setDays(r.days)}
                style={{
                  padding: "5px 12px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: 600,
                  background: days === r.days ? "var(--accent-dim)" : "transparent",
                  color: days === r.days ? "var(--accent)" : "var(--text-muted)",
                }}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && (
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
          Failed to load sessions. {error.message}
        </div>
      )}

      {/* KPIs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "14px",
        }}
      >
        <KpiCard
          label="Sessions"
          value={kpis.totalSessions.toLocaleString()}
          icon={<MousePointerClick size={16} />}
          loading={isLoading}
        />
        <KpiCard
          label="Unique Users"
          value={kpis.uniqueUsers.toLocaleString()}
          icon={<Users size={16} />}
          loading={isLoading}
        />
        <KpiCard
          label="Avg Engagement"
          value={fmtDuration(kpis.avgEngagement)}
          icon={<Timer size={16} />}
          loading={isLoading}
        />
        <KpiCard
          label="Mobile Share"
          value={`${kpis.mobilePct}%`}
          icon={<Smartphone size={16} />}
          loading={isLoading}
        />
      </div>

      {/* Table */}
      <SectionCard
        title="Recent Sessions"
        subtitle={`Showing ${sessions.length} sessions · last ${days} days`}
        action={
          <button
            onClick={() => mutate()}
            style={{
              padding: "6px 12px",
              borderRadius: "6px",
              border: "1px solid var(--border)",
              background: "var(--bg-card)",
              color: "var(--text-secondary)",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Refresh
          </button>
        }
      >
        <div style={{ padding: "16px 20px 20px" }}>
          {isLoading && sessions.length === 0 ? (
            <div
              style={{
                height: "200px",
                borderRadius: "8px",
                background: "var(--bg-card-hover)",
                animation: "adm-pulse 1.5s ease-in-out infinite",
              }}
            />
          ) : (
            <SessionsTable sessions={sessions} />
          )}
        </div>
      </SectionCard>

      <style>{`@keyframes adm-pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
}
