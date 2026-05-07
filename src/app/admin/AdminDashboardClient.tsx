"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { motion } from "framer-motion";
import {
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  ResponsiveContainer, AreaChart, Area,
} from "recharts";
import {
  Users, Clock, MousePointer2, Globe, ArrowUpRight, LogOut,
  Info, MapPin, Monitor, Cpu, Link, Megaphone,
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
  } catch {
    return iso;
  }
}

// ── Animation variants ───────────────────────────────────────────────────────

const container = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.4, ease: "easeOut" as const } },
};

// ── Sub-components ───────────────────────────────────────────────────────────

function StatCard({
  icon, label, value, accent, badge,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  accent: string;
  badge?: string;
}) {
  return (
    <motion.div variants={item} className="use-case-card !text-left !p-6 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${accent}`}>{icon}</div>
        {badge && (
          <span className="flex items-center gap-1 text-[#ACD791] text-sm font-medium">
            {badge} <ArrowUpRight size={14} />
          </span>
        )}
      </div>
      <div>
        <p className="text-[#636996] text-sm font-medium mb-1">{label}</p>
        <h3 className="text-3xl font-bold text-white">{value}</h3>
      </div>
    </motion.div>
  );
}

function BarList({
  items, valueKey, nameKey, color,
}: {
  items: Record<string, any>[];
  valueKey: string;
  nameKey: string;
  color: string;
}) {
  if (!items?.length) return <p className="text-sm text-[#636996]">No data yet</p>;
  const max = Math.max(...items.map((i) => i[valueKey] ?? 0)) || 1;
  return (
    <div className="space-y-3">
      {items.map((i) => (
        <div key={i[nameKey]} className="flex items-center justify-between gap-3">
          <span className="text-sm text-[#E4E9F2] truncate flex-1">{i[nameKey]}</span>
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-20 h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${Math.round(((i[valueKey] ?? 0) / max) * 100)}%`, backgroundColor: color }}
              />
            </div>
            <span className="text-xs font-medium text-white w-8 text-right">
              {i.percentage !== undefined ? `${i.percentage}%` : i[valueKey]?.toLocaleString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Main Client Component ─────────────────────────────────────────────────────

export default function AdminDashboardClient({ user, snapshot, trend }: Props) {
  const router = useRouter();
  const supabase = createClient();

  const trendData = useMemo(
    () => (trend?.data ?? []).map((p) => ({ ...p, time: fmtTime(p.time) })),
    [trend]
  );

  const engagementLabel = fmtSecs(snapshot?.avgEngagementSecs ?? 0);
  const scrollLabel     = snapshot?.avgScrollDepth ? `${snapshot.avgScrollDepth}%` : "—";

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#04070D] text-[#B8C7D9] pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 font-satoshi">
              ScalePods Analytics
            </h1>
            <p className="text-[#636996]">
              Welcome back, <span className="text-white font-medium">{user.email}</span>
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Info badge */}
            <div className="group relative flex items-center gap-3 bg-[#10131C] px-4 py-2 rounded-full border border-white/5 text-sm cursor-help">
              <div className="w-2 h-2 rounded-full bg-[#00CED1] animate-pulse" />
              <span>Live Synced via n8n</span>
              <Info size={14} className="text-[#636996] group-hover:text-white transition-colors" />
              <div className="absolute top-full mt-2 right-0 w-72 bg-[#0D0F17] border border-white/10 p-3 rounded-xl text-xs text-[#B8C7D9] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 shadow-2xl">
                Dashboard data is pre-aggregated server-side and cached at the edge for{" "}
                <strong>10 minutes</strong>. Microsoft Clarity data syncs automatically every{" "}
                <strong>2.4 hours</strong> via 10 scheduled n8n workflows.
                {snapshot?.lastSync && (
                  <span className="block mt-1 text-[#636996]">
                    Last sync: {new Date(snapshot.lastSync).toLocaleString()}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm hover:bg-red-500/20 transition-all"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </motion.div>

        {/* ── Stat Cards ─────────────────────────────────────────────────── */}
        <motion.div
          variants={container} initial="hidden" animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <StatCard
            icon={<Users size={20} />}
            label="Total Sessions"
            value={(snapshot?.totalSessions ?? 0).toLocaleString()}
            accent="bg-[rgba(109,182,255,0.1)] text-[#6DB6FF]"
            badge="Live Data"
          />
          <StatCard
            icon={<Clock size={20} />}
            label="Avg Engagement Time"
            value={engagementLabel || "1m 45s"}
            accent="bg-[rgba(0,206,209,0.1)] text-[#00CED1]"
          />
          <StatCard
            icon={<MousePointer2 size={20} />}
            label="Avg Scroll Depth"
            value={scrollLabel || "64%"}
            accent="bg-[rgba(255,165,0,0.1)] text-orange-400"
          />
        </motion.div>

        {/* ── Traffic Trend + Browsers + Devices ─────────────────────────── */}
        <motion.div
          variants={container} initial="hidden" animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
        >
          {/* Area Chart */}
          <motion.div variants={item} className="use-case-card lg:col-span-2 !text-left !p-6 flex flex-col">
            <h3 className="text-lg font-bold text-white mb-6 font-satoshi">Traffic Trend (Last 3 Days)</h3>
            <div className="h-[280px] w-full">
              {trendData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gradSessions" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="#0080FF" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#0080FF" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                    <XAxis dataKey="time" stroke="#636996" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#636996" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
                    <RechartsTooltip
                      contentStyle={{ backgroundColor: "#0D0F17", borderColor: "rgba(255,255,255,0.08)", borderRadius: 8 }}
                      itemStyle={{ color: "#fff" }}
                    />
                    <Area type="monotone" dataKey="sessions" stroke="#0080FF" strokeWidth={2.5}
                      fillOpacity={1} fill="url(#gradSessions)" />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#636996] text-sm">
                  Waiting for historical data…
                </div>
              )}
            </div>
          </motion.div>

          {/* Browsers + Devices */}
          <motion.div variants={item} className="flex flex-col gap-6">
            <div className="use-case-card !text-left !p-6 flex-1">
              <h3 className="text-lg font-bold text-white mb-4 font-satoshi flex items-center gap-2">
                <Globe size={17} className="text-[#6DB6FF]" /> Top Browsers
              </h3>
              <BarList items={snapshot?.browsers ?? []} nameKey="name" valueKey="value" color="#0080FF" />
            </div>
            <div className="use-case-card !text-left !p-6 flex-1">
              <h3 className="text-lg font-bold text-white mb-4 font-satoshi flex items-center gap-2">
                <Monitor size={17} className="text-[#00CED1]" /> Devices
              </h3>
              <BarList items={snapshot?.devices ?? []} nameKey="name" valueKey="value" color="#00CED1" />
            </div>
          </motion.div>
        </motion.div>

        {/* ── Bottom Grid ─────────────────────────────────────────────────── */}
        <motion.div
          variants={container} initial="hidden" animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* Popular Pages */}
          <motion.div variants={item} className="use-case-card !text-left !p-6 lg:col-span-2">
            <h3 className="text-lg font-bold text-white mb-4 font-satoshi flex items-center gap-2">
              <Link size={17} className="text-[#ACD791]" /> Popular Pages
            </h3>
            <div className="space-y-3">
              {(snapshot?.pages ?? []).length > 0 ? (
                snapshot!.pages.map((p) => (
                  <div key={p.path} className="flex items-center justify-between">
                    <span className="text-sm text-[#E4E9F2] truncate max-w-[200px]">{p.path}</span>
                    <span className="text-sm font-medium text-[#ACD791]">{p.views.toLocaleString()} views</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-[#636996]">No data yet</p>
              )}
            </div>
          </motion.div>

          {/* Countries */}
          <motion.div variants={item} className="use-case-card !text-left !p-6">
            <h3 className="text-lg font-bold text-white mb-4 font-satoshi flex items-center gap-2">
              <MapPin size={17} className="text-orange-400" /> Top Countries
            </h3>
            <BarList items={snapshot?.countries ?? []} nameKey="name" valueKey="value" color="#f97316" />
          </motion.div>

          {/* OS */}
          <motion.div variants={item} className="use-case-card !text-left !p-6">
            <h3 className="text-lg font-bold text-white mb-4 font-satoshi flex items-center gap-2">
              <Cpu size={17} className="text-purple-400" /> Operating Systems
            </h3>
            <BarList items={snapshot?.os ?? []} nameKey="name" valueKey="value" color="#a855f7" />
          </motion.div>

          {/* Channels */}
          <motion.div variants={item} className="use-case-card !text-left !p-6 lg:col-span-2">
            <h3 className="text-lg font-bold text-white mb-4 font-satoshi flex items-center gap-2">
              <Megaphone size={17} className="text-pink-400" /> Channels / Sources
            </h3>
            <BarList
              items={
                (snapshot?.channels ?? []).length > 0
                  ? snapshot!.channels
                  : snapshot?.sources ?? []
              }
              nameKey="name"
              valueKey="value"
              color="#ec4899"
            />
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}
