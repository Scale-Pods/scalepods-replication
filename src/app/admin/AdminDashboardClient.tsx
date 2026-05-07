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

// ── Animation ────────────────────────────────────────────────────────────────

const container = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const card = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
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
          <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
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

function StatCard({ icon, label, value, iconBg, iconColor, sub }: {
  icon: React.ReactNode; label: string; value: string | number;
  iconBg: string; iconColor: string; sub?: string;
}) {
  return (
    <motion.div variants={card}
      className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent p-6 flex flex-col gap-4 hover:border-white/10 transition-colors">
      <div className="flex items-start justify-between">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconBg}`}
          style={{ color: iconColor }}>
          {icon}
        </div>
        <span className="text-xs text-[#636996] mt-1">{sub}</span>
      </div>
      <div>
        <p className="text-[#636996] text-xs font-medium uppercase tracking-wider mb-1">{label}</p>
        <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
      </div>
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
      className={`rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent p-6 hover:border-white/10 transition-colors ${span ?? ""}`}>
      <h3 className="text-sm font-semibold text-white mb-5 flex items-center gap-2">
        <span style={{ color: iconColor ?? "#6DB6FF" }}>{icon}</span>
        {title}
      </h3>
      {children}
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#04070D] text-[#B8C7D9]">
      {/* ── Dashboard Header Bar ─────────────────────────────────────── */}
      <div className="sticky top-0 z-40 border-b border-white/[0.05] bg-[#04070D]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Left: title */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0080FF]/15 flex items-center justify-center">
              <BarChart3 size={16} className="text-[#0080FF]" />
            </div>
            <div>
              <span className="text-white font-semibold text-sm">Analytics Dashboard</span>
              <span className="text-[#636996] text-xs ml-2">· {user.email}</span>
            </div>
          </div>

          {/* Right: sync badge + logout */}
          <div className="flex items-center gap-3">
            {/* Sync info */}
            <div className="group relative flex items-center gap-2 bg-[#0D1018] px-3 py-1.5 rounded-full border border-white/[0.06] text-xs cursor-help">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00CED1] animate-pulse" />
              <span className="text-[#636996]">Syncs every 2.4h</span>
              <Info size={12} className="text-[#636996]/60 group-hover:text-white transition-colors" />
              {/* Tooltip */}
              <div className="absolute top-full mt-2 right-0 w-72 bg-[#0D0F17] border border-white/10 p-4 rounded-xl text-xs text-[#B8C7D9] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 shadow-2xl pointer-events-none">
                <p className="font-semibold text-white mb-1">Auto-sync Architecture</p>
                <p className="text-[#636996] leading-relaxed">
                  10 n8n workflows run on a staggered 2.4-hour schedule to maximize the Microsoft Clarity API quota (10 req/day).
                  Data is pre-processed server-side and cached at the Vercel edge for <strong className="text-white">10 minutes</strong>.
                </p>
                {snapshot?.lastSync && (
                  <p className="mt-2 text-[#636996]">
                    Last sync: <span className="text-white">{new Date(snapshot.lastSync).toLocaleString()}</span>
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs hover:bg-red-500/20 transition-all"
            >
              <LogOut size={13} /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* ── Page Content ────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Page title */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
            ScalePods Visitor Analytics
          </h1>
          <p className="text-[#636996] text-sm">
            Microsoft Clarity data — last {trend?.data?.length ?? 0} data points over 3 days
          </p>
        </motion.div>

        {/* ── KPI Stat Cards ──────────────────────────────────────────── */}
        <motion.div
          variants={container} initial="hidden" animate="visible"
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6"
        >
          <StatCard
            icon={<Users size={20} />}
            label="Total Sessions"
            value={sessions}
            iconBg="bg-[#6DB6FF]/10"
            iconColor="#6DB6FF"
            sub="All time"
          />
          <StatCard
            icon={<Clock size={20} />}
            label="Avg Engagement"
            value={engagement || "1m 45s"}
            iconBg="bg-[#00CED1]/10"
            iconColor="#00CED1"
            sub="Per session"
          />
          <StatCard
            icon={<MousePointer2 size={20} />}
            label="Avg Scroll Depth"
            value={scroll || "64%"}
            iconBg="bg-orange-400/10"
            iconColor="#fb923c"
            sub="Page depth"
          />
        </motion.div>

        {/* ── Traffic Trend + Browsers + Devices ─────────────────────── */}
        <motion.div
          variants={container} initial="hidden" animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4"
        >
          {/* Area chart */}
          <motion.div variants={card}
            className="lg:col-span-2 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent p-6 hover:border-white/10 transition-colors">
            <h3 className="text-sm font-semibold text-white mb-1 flex items-center gap-2">
              <span className="text-[#0080FF]"><BarChart3 size={16} /></span>
              Traffic Trend
            </h3>
            <p className="text-xs text-[#636996] mb-5">Sessions over last 3 days</p>
            <div className="h-[240px]">
              {trendData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gSessions" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="#0080FF" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#0080FF" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.04)" vertical={false} />
                    <XAxis dataKey="time" stroke="#42526E" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="#42526E" fontSize={10} tickLine={false} axisLine={false} allowDecimals={false} />
                    <RechartsTooltip
                      contentStyle={{ backgroundColor: "#0B0D14", borderColor: "rgba(255,255,255,0.08)", borderRadius: 10, fontSize: 12 }}
                      itemStyle={{ color: "#fff" }}
                      cursor={{ stroke: "rgba(255,255,255,0.1)" }}
                    />
                    <Area type="monotone" dataKey="sessions" stroke="#0080FF" strokeWidth={2.5}
                      fillOpacity={1} fill="url(#gSessions)" dot={false} activeDot={{ r: 4, fill: "#0080FF" }} />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#636996] text-sm">
                  Waiting for historical data…
                </div>
              )}
            </div>
          </motion.div>

          {/* Browsers + Devices stacked */}
          <div className="flex flex-col gap-4">
            <Widget title="Top Browsers" icon={<Globe size={15} />} iconColor="#6DB6FF">
              <BarList items={snapshot?.browsers ?? []} nameKey="name" valueKey="value" color="#0080FF" />
            </Widget>
            <Widget title="Devices" icon={<Monitor size={15} />} iconColor="#00CED1">
              <BarList items={snapshot?.devices ?? []} nameKey="name" valueKey="value" color="#00CED1" />
            </Widget>
          </div>
        </motion.div>

        {/* ── Bottom Row ──────────────────────────────────────────────── */}
        <motion.div
          variants={container} initial="hidden" animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <Widget title="Popular Pages" icon={<Link size={15} />} iconColor="#ACD791" span="lg:col-span-2">
            <div className="space-y-3">
              {(snapshot?.pages ?? []).length > 0 ? snapshot!.pages.map((p) => (
                <div key={p.path} className="flex items-center justify-between">
                  <code className="text-xs text-[#C8D6E5] bg-white/[0.04] px-2 py-0.5 rounded font-mono truncate max-w-[200px]">
                    {p.path}
                  </code>
                  <span className="text-xs font-semibold text-[#ACD791] ml-3 flex-shrink-0">
                    {p.views.toLocaleString()} views
                  </span>
                </div>
              )) : <p className="text-sm text-[#636996] italic">No data yet</p>}
            </div>
          </Widget>

          <Widget title="Top Countries" icon={<MapPin size={15} />} iconColor="#fb923c">
            <BarList items={snapshot?.countries ?? []} nameKey="name" valueKey="value" color="#f97316" />
          </Widget>

          <Widget title="Operating Systems" icon={<Cpu size={15} />} iconColor="#a855f7">
            <BarList items={snapshot?.os ?? []} nameKey="name" valueKey="value" color="#a855f7" />
          </Widget>

          <Widget title="Channels / Sources" icon={<Megaphone size={15} />} iconColor="#ec4899" span="lg:col-span-4">
            <BarList
              items={(snapshot?.channels ?? []).length > 0 ? snapshot!.channels : snapshot?.sources ?? []}
              nameKey="name" valueKey="value" color="#ec4899"
            />
          </Widget>
        </motion.div>

      </div>
    </div>
  );
}
