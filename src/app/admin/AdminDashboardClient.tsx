"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { motion } from "framer-motion";
import {
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  ResponsiveContainer, AreaChart, Area,
} from "recharts";
import {
  Users, Clock, MousePointer2, Globe, LogOut,
  Info, MapPin, Monitor, Cpu, Link, Megaphone, BarChart3,
  Calendar, RefreshCw, ChevronDown
} from "lucide-react";
import { useMemo } from "react";

// ── Types ────────────────────────────────────────────────────────────────────

interface SnapshotPayload {
  totalSessions: number;
  avgScrollDepth: number;
  avgEngagementSecs: number;
  browsers:  { name: string; value: number; percentage: number }[];
  devices:   { name: string; value: number }[];
  os:        { name: string; value: number }[];
  countries: { name: string; value: number }[];
  pages:     { path: string; views: number }[];
  channels:  { name: string; value: number }[];
  sources:   { name: string; value: number }[];
  lastSync:  string;
}

interface TrendPayload {
  data: { time: string; sessions: number }[];
}

interface Props {
  user: { email: string };
  snapshot: SnapshotPayload | null;
  trend:    TrendPayload    | null;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function fmtSecs(secs: number): string {
  if (!secs) return "—";
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

function fmtTime(iso: string) {
  try {
    return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch { return iso; }
}

function fmtDateVerbose(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' at ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch { return iso; }
}

// ── Animation ────────────────────────────────────────────────────────────────

const container = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const card = {
  hidden:  { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

// ── BarList ───────────────────────────────────────────────────────────────────

function BarList({ items, valueKey, nameKey, color }: {
  items: Record<string, any>[];
  valueKey: string; nameKey: string; color: string;
}) {
  if (!items?.length) return <p className="text-sm text-[#636996] italic">No data yet</p>;
  const max = Math.max(...items.map((i) => i[valueKey] ?? 0)) || 1;
  return (
    <div className="space-y-3">
      {items.map((i) => (
        <div key={i[nameKey]} className="flex items-center gap-3">
          <span className="text-sm text-[#C8D6E5] truncate w-24 flex-shrink-0">{i[nameKey]}</span>
          <div className="flex-1 h-1.5 bg-[#1A1D24] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.round(((i[valueKey] ?? 0) / max) * 100)}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{ backgroundColor: color }}
            />
          </div>
          <span className="text-xs font-semibold text-white w-10 text-right flex-shrink-0">
            {i.percentage !== undefined ? `${i.percentage}%` : i[valueKey]?.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── StatCard ──────────────────────────────────────────────────────────────────

function StatCard({ icon, label, value, color }: {
  icon: React.ReactNode; label: string; value: string | number; color: string;
}) {
  return (
    <motion.div variants={card}
      className="rounded-2xl border border-white/[0.04] bg-[#0A0D14] p-5 flex flex-col gap-3 hover:bg-[#0D1018] transition-colors relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: color }} />
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}15`, color: color }}>
          {icon}
        </div>
        <p className="text-[#636996] text-sm font-medium">{label}</p>
      </div>
      <h3 className="text-3xl font-bold text-white tracking-tight pl-1">{value}</h3>
    </motion.div>
  );
}

// ── Widget wrapper ────────────────────────────────────────────────────────────

function Widget({ title, icon, children, span, iconColor }: {
  title: string; icon: React.ReactNode; children: React.ReactNode;
  span?: string; iconColor?: string;
}) {
  return (
    <motion.div variants={card}
      className={`rounded-2xl border border-white/[0.04] bg-[#0A0D14] p-6 hover:bg-[#0D1018] transition-colors flex flex-col ${span ?? ""}`}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <span style={{ color: iconColor ?? "#6DB6FF" }}>{icon}</span>
          {title}
        </h3>
      </div>
      <div className="flex-1">
        {children}
      </div>
    </motion.div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function AdminDashboardClient({ user, snapshot, trend }: Props) {
  const router  = useRouter();
  const supabase = createClient();

  const trendData = useMemo(
    () => (trend?.data ?? []).map((p) => ({ ...p, time: fmtTime(p.time) })),
    [trend]
  );

  const engagement = fmtSecs(snapshot?.avgEngagementSecs ?? 0);
  const scroll     = snapshot?.avgScrollDepth ? `${snapshot.avgScrollDepth}%` : "—";
  const sessions   = (snapshot?.totalSessions ?? 0).toLocaleString();
  const lastSync   = snapshot?.lastSync ? fmtDateVerbose(snapshot.lastSync) : "Just now";

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#020408] text-[#B8C7D9] selection:bg-[#0080FF]/30">
      
      {/* ── Top Navigation ─────────────────────────────────────── */}
      <div className="sticky top-0 z-40 border-b border-white/[0.04] bg-[#020408]/90 backdrop-blur-xl">
        <div className="max-w-screen-2xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0080FF] to-[#0055FF] flex items-center justify-center shadow-[0_0_15px_rgba(0,128,255,0.3)]">
              <BarChart3 size={16} className="text-white" />
            </div>
            <span className="text-white font-semibold text-sm tracking-wide">ScalePods Analytics</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#636996] text-xs hidden sm:inline-block">{user.email}</span>
            <div className="h-4 w-px bg-white/10 hidden sm:block" />
            <button
              onClick={handleLogout}
              className="text-[#636996] hover:text-white transition-colors p-1.5 rounded-md hover:bg-white/5"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 py-8">

        {/* ── Controls & Date Header ──────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Overview</h1>
            <div className="flex items-center gap-2 text-xs text-[#636996]">
              <RefreshCw size={12} className="animate-[spin_4s_linear_infinite]" />
              <span>Last updated: {lastSync}</span>
            </div>
          </div>

          {/* Calendar / Date Picker UI (Mocked for current 3-day data) */}
          <div className="flex items-center gap-3 bg-[#0A0D14] border border-white/[0.04] p-1 rounded-xl">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.04] text-white text-sm font-medium transition-colors">
              <Calendar size={14} className="text-[#6DB6FF]" />
              Last 3 Days
              <ChevronDown size={14} className="text-[#636996] ml-1" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* ── LEFT COLUMN (Graph & Main Stats) ─────────────────────────── */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* KPI Stat Cards */}
            <motion.div
              variants={container} initial="hidden" animate="visible"
              className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            >
              <StatCard icon={<Users size={18} />} label="Total Sessions" value={sessions} color="#0080FF" />
              <StatCard icon={<Clock size={18} />} label="Avg Engagement" value={engagement} color="#00CED1" />
              <StatCard icon={<MousePointer2 size={18} />} label="Avg Scroll Depth" value={scroll} color="#fb923c" />
            </motion.div>

            {/* Area chart */}
            <motion.div variants={card} initial="hidden" animate="visible"
              className="rounded-2xl border border-white/[0.04] bg-[#0A0D14] p-6 flex-1 min-h-[400px] flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-semibold text-white flex items-center gap-2">
                    Traffic Trend
                  </h3>
                  <p className="text-xs text-[#636996] mt-1">Hourly sessions breakdown</p>
                </div>
              </div>
              
              <div className="flex-1 w-full min-h-[300px]">
                {trendData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trendData} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                      <defs>
                        <linearGradient id="gSessions" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%"  stopColor="#0080FF" stopOpacity={0.4} />
                          <stop offset="100%" stopColor="#0080FF" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                      <XAxis dataKey="time" stroke="#42526E" fontSize={11} tickLine={false} axisLine={false} tickMargin={10} />
                      <YAxis stroke="#42526E" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} tickMargin={10} />
                      <RechartsTooltip
                        contentStyle={{ backgroundColor: "#0A0D14", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}
                        itemStyle={{ color: "#fff", fontWeight: 600 }}
                        cursor={{ stroke: "rgba(255,255,255,0.1)", strokeWidth: 1, strokeDasharray: "4 4" }}
                      />
                      <Area type="monotone" dataKey="sessions" stroke="#0080FF" strokeWidth={3}
                        fillOpacity={1} fill="url(#gSessions)" dot={false} activeDot={{ r: 5, fill: "#fff", stroke: "#0080FF", strokeWidth: 2 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#636996] text-sm">
                    Waiting for historical data…
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN (Breakdowns) ────────────────────────────────── */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Widget title="Top Browsers" icon={<Globe size={16} />} iconColor="#0080FF">
              <BarList items={snapshot?.browsers ?? []} nameKey="name" valueKey="value" color="#0080FF" />
            </Widget>
            <Widget title="Devices" icon={<Monitor size={16} />} iconColor="#00CED1">
              <BarList items={snapshot?.devices ?? []} nameKey="name" valueKey="value" color="#00CED1" />
            </Widget>
            <Widget title="Top Countries" icon={<MapPin size={16} />} iconColor="#fb923c">
              <BarList items={snapshot?.countries ?? []} nameKey="name" valueKey="value" color="#f97316" />
            </Widget>
          </div>

        </div>

        {/* ── BOTTOM ROW ─────────────────────────────────────────────────── */}
        <motion.div
          variants={container} initial="hidden" animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6"
        >
          <Widget title="Popular Pages" icon={<Link size={16} />} iconColor="#ACD791">
            <div className="space-y-3">
              {(snapshot?.pages ?? []).length > 0 ? snapshot!.pages.map((p) => (
                <div key={p.path} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-6 h-6 rounded bg-[#1A1D24] flex items-center justify-center flex-shrink-0">
                      <span className="text-[10px] text-[#636996] font-mono">/</span>
                    </div>
                    <span className="text-sm text-[#C8D6E5] truncate max-w-[250px] group-hover:text-white transition-colors">
                      {p.path === "/" ? "/ (Home)" : p.path}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-[#ACD791] flex-shrink-0 bg-[#ACD791]/10 px-2.5 py-1 rounded-md">
                    {p.views.toLocaleString()}
                  </span>
                </div>
              )) : <p className="text-sm text-[#636996] italic">No data yet</p>}
            </div>
          </Widget>

          <div className="flex flex-col gap-6">
            <Widget title="Operating Systems" icon={<Cpu size={16} />} iconColor="#a855f7">
              <BarList items={snapshot?.os ?? []} nameKey="name" valueKey="value" color="#a855f7" />
            </Widget>

            <Widget title="Channels / Sources" icon={<Megaphone size={16} />} iconColor="#ec4899">
              <BarList
                items={(snapshot?.channels ?? []).length > 0 ? snapshot!.channels : snapshot?.sources ?? []}
                nameKey="name" valueKey="value" color="#ec4899"
              />
            </Widget>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
