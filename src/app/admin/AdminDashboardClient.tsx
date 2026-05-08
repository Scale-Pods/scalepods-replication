"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { motion } from "framer-motion";
import {
  XAxis, YAxis, Tooltip as RechartsTooltip,
  ResponsiveContainer, AreaChart, Area,
} from "recharts";
import {
  LogOut,
  Calendar,
  Globe,
  LineChart,
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

function fmtDateVerbose(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch { return iso; }
}

function fmtDayStr(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch { return iso; }
}

// ── Sub-components ───────────────────────────────────────────────────────────

function KPICard({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p className="text-xs text-gray-500 font-medium mb-1">{label}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}

function TableWidget({ title, subtitle, items, nameKey, valueKey, prefix }: {
  title: string; subtitle: string; items: Record<string, any>[];
  nameKey: string; valueKey: string; prefix?: boolean;
}) {
  if (!items?.length) return (
    <div className="bg-[#0a0b10] shadow-[0_0_15px_rgba(59,130,246,0.15)] border border-[rgba(59,130,246,0.2)] rounded-xl p-5 h-64 flex flex-col">
      <h4 className="text-sm font-semibold text-white mb-0.5">{title}</h4>
      <p className="text-[10px] text-gray-500 mb-6">{subtitle}</p>
      <div className="flex-1 flex flex-col items-center justify-center space-y-3 opacity-40">
        <span className="text-xs text-gray-400">No data</span>
      </div>
    </div>
  );

  const max = Math.max(...items.map(i => i[valueKey] ?? 0)) || 1;

  return (
    <div className="bg-[#0a0b10] shadow-[0_0_15px_rgba(59,130,246,0.15)] border border-[rgba(59,130,246,0.2)] rounded-xl p-5 h-64 flex flex-col">
      <h4 className="text-sm font-semibold text-white mb-0.5">{title}</h4>
      <p className="text-[10px] text-gray-500 mb-6">{subtitle}</p>
      <div className="space-y-4 flex-1 overflow-y-auto pr-2">
        {items.slice(0, 5).map((i, idx) => {
          const w = Math.round(((i[valueKey] ?? 0) / max) * 100);
          const barColor = idx === 0 ? "bg-gradient-to-r from-blue-600 to-purple-600" : (idx % 2 === 1 ? "bg-[#8b5cf6]" : "bg-[#3b82f6]");
          
          return (
            <div key={i[nameKey]}>
              <div className="flex justify-between text-[11px] mb-1.5">
                <span className="text-gray-300 truncate max-w-[150px]">
                  {prefix ? `/${i[nameKey]}` : i[nameKey]}
                </span>
                <span className="text-white font-bold">{i[valueKey]?.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                <div className={`${barColor} h-1.5 rounded-full`} style={{ width: `${w}%` }}></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Main Layout ──────────────────────────────────────────────────────────────

export default function AdminDashboardClient({ user, snapshot, trend }: Props) {
  const router  = useRouter();
  const supabase = createClient();

  const trendData = useMemo(() => {
    return (trend?.data ?? []).map((p) => ({ ...p, displayDate: fmtDayStr(p.time) }));
  }, [trend]);

  const engagement = fmtSecs(snapshot?.avgEngagementSecs ?? 0);
  const scroll     = snapshot?.avgScrollDepth ? `${snapshot.avgScrollDepth}%` : "—";
  const sessions   = (snapshot?.totalSessions ?? 0).toLocaleString();
  const lastSync   = snapshot?.lastSync ? fmtDateVerbose(snapshot.lastSync) : "Today";
  
  const minDate = trendData.length > 0 ? trendData[0].displayDate : "Apr 7";
  const maxDate = trendData.length > 0 ? trendData[trendData.length - 1].displayDate : "May 7";

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#020306] flex font-sans overflow-hidden text-[#e2e8f0]">
      
      {/* ── Sidebar ──────────────────────────────────────────────────────── */}
      <aside className="w-64 bg-[#050608] flex flex-col border-r border-gray-800/50 shrink-0">
        {/* Logo Section */}
        <div className="p-6 flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-md flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
          </div>
          <span className="text-xl font-bold tracking-tight">ScalePods</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-8 mt-4 overflow-y-auto">
          <div>
            <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Dashboard</h3>
            <div className="space-y-1">
              <div className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-gray-800/50 text-[#3b82f6]">
                <LineChart size={20} />
                <span className="text-sm font-medium">Analytics</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-800/50">
          <div className="space-y-1">
            <button onClick={() => router.push('/')} className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white transition-colors">
              <Globe size={16} />
              <span className="text-xs">Back to Site</span>
            </button>
            <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white transition-colors">
              <LogOut size={16} />
              <span className="text-xs">Log Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main Content Area ────────────────────────────────────────────── */}
      <main className="flex-1 p-8 overflow-y-auto bg-[#020306] custom-scrollbar">
        {/* Top Header */}
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-white">Analytics Overview</h1>
          <div className="text-sm text-gray-400 flex items-center gap-2">
            <Calendar size={16} />
            {minDate} — {maxDate}
          </div>
        </header>

        {/* Main Chart Section */}
        <section className="bg-[#0a0b10] shadow-[0_0_15px_rgba(59,130,246,0.15)] border border-[rgba(59,130,246,0.2)] rounded-2xl p-6 mb-8">
          {/* Metric Bar */}
          <div className="grid grid-cols-5 gap-4 mb-8">
            <KPICard label="Total Sessions" value={sessions} />
            <KPICard label="Average Session" value={engagement} />
            <KPICard label="Avg Scroll Depth" value={scroll} />
            <KPICard label="Total Pageviews" value={snapshot?.pages?.reduce((a,b)=>a+b.views,0).toLocaleString() ?? "0"} />
            <KPICard label="Last Update" value={lastSync} />
          </div>

          {/* Chart Visual */}
          <div className="relative h-[300px] w-full">
              {trendData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData}>
                    <defs>
                      <linearGradient id="gradPurple" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%"  stopColor="#8b5cf6" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="displayDate" hide />
                    <YAxis hide domain={[0, 'dataMax + 10']} />
                    <RechartsTooltip
                      contentStyle={{ backgroundColor: "#1a1c24", border: "1px solid #374151", borderRadius: 8, fontSize: 12 }}
                      itemStyle={{ color: "#fff", fontWeight: "bold" }}
                      cursor={{ stroke: "rgba(255,255,255,0.2)", strokeWidth: 1 }}
                    />
                    <Area type="monotone" dataKey="sessions" stroke="#8b5cf6" strokeWidth={2}
                      fillOpacity={1} fill="url(#gradPurple)" dot={false} activeDot={{ r: 4, fill: "#3b82f6" }} />
                    <Area type="monotone" dataKey="sessions" stroke="#3b82f6" strokeWidth={2}
                      fillOpacity={0} fill="none" dot={false} 
                      data={trendData.map(d => ({ ...d, sessions: d.sessions * 0.8 }))}
                    />
                    <Area type="monotone" dataKey="sessions" stroke="#6366f1" strokeWidth={2}
                      fillOpacity={0} fill="none" dot={false} 
                      data={trendData.map(d => ({ ...d, sessions: d.sessions * 0.6 }))}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/30 text-sm">
                  Waiting for data...
                </div>
              )}
          </div>
        </section>

        {/* Bottom Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <TableWidget title="Sources" subtitle="Referrer" items={snapshot?.sources ?? []} nameKey="name" valueKey="value" />
          <TableWidget title="Pages" subtitle="All" items={snapshot?.pages ?? []} nameKey="path" valueKey="views" prefix />
          <TableWidget title="Geography" subtitle="Countries" items={snapshot?.countries ?? []} nameKey="name" valueKey="value" />
          <TableWidget title="Devices" subtitle="Type" items={snapshot?.devices ?? []} nameKey="name" valueKey="value" />
          <TableWidget title="Browsers" subtitle="All" items={snapshot?.browsers ?? []} nameKey="name" valueKey="value" />
          <TableWidget title="Operating Systems" subtitle="OS" items={snapshot?.os ?? []} nameKey="name" valueKey="value" />
        </section>

      </main>
    </div>
  );
}
