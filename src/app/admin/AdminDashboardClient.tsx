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
  ChevronDown,
  Search,
  Home,
  Plus,
  RefreshCw,
  Calendar,
  Globe,
  BarChart3,
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

function KPICard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="flex flex-col">
      <p className="text-xs font-semibold text-white/80 mb-1 flex items-center gap-1">
        {label}
        {sub && <span className="w-1.5 h-1.5 rounded-full bg-[#0080FF]" />}
      </p>
      <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
    </div>
  );
}

function TableWidget({ title, subtitle, items, nameKey, valueKey, prefix }: {
  title: string; subtitle: string; items: Record<string, any>[];
  nameKey: string; valueKey: string; prefix?: boolean;
}) {
  if (!items?.length) return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <span className="text-xs text-white/50">{subtitle} ▾</span>
      </div>
      <div className="text-sm text-white/30 italic px-1">No data</div>
    </div>
  );

  const max = Math.max(...items.map(i => i[valueKey] ?? 0)) || 1;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className="text-sm font-bold text-white">{title}</h3>
        <span className="text-xs text-white/50 cursor-pointer hover:text-white transition-colors">{subtitle} ▾</span>
      </div>
      <div className="space-y-[3px]">
        {items.slice(0, 5).map((i) => {
          const w = Math.round(((i[valueKey] ?? 0) / max) * 100);
          return (
            <div key={i[nameKey]} className="relative h-8 rounded-md bg-[#1E1E1E] overflow-hidden flex items-center px-3 group">
              <div 
                className="absolute top-0 left-0 h-full bg-[#2A2A2A] transition-all duration-1000" 
                style={{ width: `${w}%` }} 
              />
              <div className="relative z-10 flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  {prefix && <div className="w-4 h-4 rounded bg-white/10 flex items-center justify-center text-[9px] font-mono text-white/50">/</div>}
                  <span className="text-xs font-medium text-white/90 truncate max-w-[150px]">{i[nameKey]}</span>
                </div>
                <span className="text-xs font-bold text-white">{i[valueKey]?.toLocaleString()}</span>
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
    // We use fixed inset-0 z-[100] to completely cover the global Navbar and Footer
    <div className="fixed inset-0 z-[100] bg-[#0A0A0A] flex font-sans overflow-hidden text-white">
      
      {/* ── Sidebar ──────────────────────────────────────────────────────── */}
      <div className="w-[240px] bg-[#111111] border-r border-white/[0.05] flex flex-col flex-shrink-0">
        <div className="p-4 flex items-center gap-3 border-b border-white/[0.05] h-[60px]">
          <button onClick={() => router.push('/')} className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <RefreshCw size={14} className="text-white/60" />
            Analytics
          </div>
        </div>
        
        <div className="p-4 flex-1">
          <div className="relative mb-6">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full bg-[#1A1A1A] border border-white/[0.05] rounded-md py-1.5 pl-9 pr-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/20 transition-colors"
            />
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-bold text-white mb-2 px-2">Analytics</h4>
              <button className="w-full flex items-center gap-2 bg-white/10 text-white rounded-md px-3 py-1.5 text-sm font-medium">
                <Home size={14} /> Overview
              </button>
            </div>
            
            <div>
              <div className="flex items-center justify-between px-2 mb-2">
                <h4 className="text-xs font-bold text-white">Funnels</h4>
                <Plus size={14} className="text-white/50 cursor-pointer hover:text-white" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between px-2 mb-2">
                <h4 className="text-xs font-bold text-white">A/B Tests</h4>
                <Plus size={14} className="text-white/50 cursor-pointer hover:text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-white/[0.05]">
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-white/50 hover:text-red-400 transition-colors px-2">
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>

      {/* ── Main Content Area ────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col bg-[#0A0A0A] overflow-y-auto">
        
        {/* Top Header */}
        <div className="h-[60px] flex justify-end items-center px-6 border-b border-white/[0.05]">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-[#1A1A1A] border border-white/10 flex items-center justify-center font-bold text-xs">AS</div>
            <button className="w-7 h-7 rounded-full bg-[#1A1A1A] border border-white/10 flex items-center justify-center hover:bg-[#2A2A2A]"><Globe size={12} /></button>
            <button className="w-7 h-7 rounded-full bg-[#1A1A1A] border border-white/10 flex items-center justify-center hover:bg-[#2A2A2A]"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 15a3 3 0 100-6 3 3 0 000 6z"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg></button>
            <button className="w-7 h-7 rounded-full bg-[#1A1A1A] border border-white/10 flex items-center justify-center hover:bg-[#2A2A2A]"><BarChart3 size={12} /></button>
            <button className="px-3 py-1.5 rounded-full bg-white/10 text-xs font-semibold hover:bg-white/20 transition-colors">Invite</button>
            <button className="px-3 py-1.5 rounded-full bg-[#0080FF] text-white text-xs font-semibold hover:bg-[#0070E0] transition-colors">Publish</button>
          </div>
        </div>

        {/* Inner Content */}
        <div className="flex-1 max-w-5xl mx-auto w-full p-10 pb-20">
          
          <div className="flex items-center justify-between mb-10">
            <h1 className="text-[28px] font-bold text-white tracking-tight">Analytics</h1>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1E1E1E] hover:bg-[#2A2A2A] text-sm font-semibold transition-colors">
                Last 30 days <ChevronDown size={14} className="text-white/50" />
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1E1E1E] hover:bg-[#2A2A2A] text-sm font-semibold transition-colors">
                <Calendar size={14} className="text-white/50" />
                {minDate} — {maxDate}
              </button>
            </div>
          </div>

          {/* KPIs Horizontal Line */}
          <div className="flex items-center justify-between pb-8 border-b border-white/[0.05] mb-8">
            <KPICard label="Total Sessions" value={sessions} sub="true" />
            <KPICard label="Average Session" value={engagement} />
            <KPICard label="Avg Scroll Depth" value={scroll} />
            <KPICard label="Total Pageviews" value={snapshot?.pages?.reduce((a,b)=>a+b.views,0).toLocaleString() ?? "0"} />
            <KPICard label="Last Update" value={lastSync} />
          </div>

          {/* Area Chart */}
          <div className="mb-10 relative">
            <div className="absolute top-0 left-0 text-xs font-mono text-white/50">{Math.max(...trendData.map(d=>d.sessions), 50)}</div>
            <div className="h-[280px] w-full mt-4">
              {trendData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData}>
                    <defs>
                      <linearGradient id="gradientPurple" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%"  stopColor="#A855F7" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#0080FF" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gradientBlue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%"  stopColor="#00CED1" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#0080FF" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="displayDate" hide />
                    <YAxis hide domain={[0, 'dataMax + 10']} />
                    <RechartsTooltip
                      contentStyle={{ backgroundColor: "#1E1E1E", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }}
                      itemStyle={{ color: "#fff", fontWeight: "bold" }}
                      cursor={{ stroke: "rgba(255,255,255,0.2)", strokeWidth: 1 }}
                    />
                    {/* Two layered areas for the double-line effect in the screenshot */}
                    <Area type="monotone" dataKey="sessions" stroke="#A855F7" strokeWidth={2}
                      fillOpacity={1} fill="url(#gradientPurple)" dot={false} activeDot={{ r: 4, fill: "#A855F7" }} />
                    <Area type="monotone" dataKey="sessions" stroke="#00CED1" strokeWidth={2}
                      fillOpacity={1} fill="url(#gradientBlue)" dot={false} 
                      // Modifying the data slightly just for the visual 2-line effect seen in Framer Analytics, if we only have 1 data line
                      data={trendData.map(d => ({ ...d, sessions: d.sessions * 0.7 }))}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/30 text-sm">
                  Waiting for data...
                </div>
              )}
            </div>
            <div className="flex justify-between items-center mt-2 text-[11px] font-semibold text-white/40">
              <span>{minDate}</span>
              <span>{maxDate}</span>
            </div>
          </div>

          <div className="w-full h-px bg-white/[0.05] mb-10" />

          {/* Tables Grid */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-12">
            <TableWidget title="Sources" subtitle="Referrer" items={snapshot?.sources ?? []} nameKey="name" valueKey="value" />
            <TableWidget title="Pages" subtitle="All" items={snapshot?.pages ?? []} nameKey="path" valueKey="views" prefix />
            <TableWidget title="Geography" subtitle="Countries" items={snapshot?.countries ?? []} nameKey="name" valueKey="value" />
            <TableWidget title="Devices" subtitle="Type" items={snapshot?.devices ?? []} nameKey="name" valueKey="value" />
            <TableWidget title="Browsers" subtitle="All" items={snapshot?.browsers ?? []} nameKey="name" valueKey="value" />
            <TableWidget title="Operating Systems" subtitle="OS" items={snapshot?.os ?? []} nameKey="name" valueKey="value" />
          </div>

        </div>
      </div>
    </div>
  );
}
