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
  LineChart,
  Users,
  LayoutDashboard,
  Settings,
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
      <div className="w-[260px] bg-[#0A0A0A] border-r border-white/[0.05] flex flex-col flex-shrink-0">
        {/* ScalePods Brand Header */}
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-[#0080FF] to-[#00CED1] flex items-center justify-center shadow-lg shadow-[#0080FF]/20">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <span className="font-bold text-lg tracking-tight">ScalePods</span>
        </div>

        {/* Navigation */}
        <div className="px-4 py-6 flex-1 space-y-8">
          <div>
            <div className="text-xs font-semibold text-white/40 mb-3 px-3 uppercase tracking-wider">Dashboard</div>
            <div className="space-y-1">
              <button className="w-full flex items-center gap-3 bg-[#1E1E1E] text-white rounded-lg px-3 py-2 text-sm font-medium transition-colors">
                <LineChart size={16} className="text-[#0080FF]" /> Analytics
              </button>
              <button className="w-full flex items-center gap-3 hover:bg-white/5 text-white/60 hover:text-white rounded-lg px-3 py-2 text-sm font-medium transition-colors">
                <Users size={16} /> Visitors
              </button>
            </div>
          </div>
          
          <div>
            <div className="text-xs font-semibold text-white/40 mb-3 px-3 uppercase tracking-wider">Tools</div>
            <div className="space-y-1">
              <button className="w-full flex items-center gap-3 hover:bg-white/5 text-white/60 hover:text-white rounded-lg px-3 py-2 text-sm font-medium transition-colors">
                <LayoutDashboard size={16} /> Funnels
              </button>
              <button className="w-full flex items-center gap-3 hover:bg-white/5 text-white/60 hover:text-white rounded-lg px-3 py-2 text-sm font-medium transition-colors">
                <BarChart3 size={16} /> A/B Tests
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-white/[0.05]">
          <button onClick={() => router.push('/')} className="w-full flex items-center gap-3 hover:bg-white/5 text-white/60 hover:text-white rounded-lg px-3 py-2 text-sm font-medium transition-colors mb-2">
            <Globe size={16} /> Back to Site
          </button>
          <button className="w-full flex items-center gap-3 hover:bg-white/5 text-white/60 hover:text-white rounded-lg px-3 py-2 text-sm font-medium transition-colors mb-2">
            <Settings size={16} /> Settings
          </button>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 hover:bg-red-500/10 text-white/60 hover:text-red-400 rounded-lg px-3 py-2 text-sm font-medium transition-colors">
            <LogOut size={16} /> Log Out
          </button>
        </div>
      </div>

      {/* ── Main Content Area ────────────────────────────────────────────── */}
      <div className="flex-1 w-full overflow-y-auto bg-[#0A0A0A]">
        {/* Full width fluid layout */}
        <div className="w-full px-12 py-10 pb-20">
          
          <div className="flex items-center justify-between mb-10">
            <h1 className="text-[32px] font-bold text-white tracking-tight">Analytics Overview</h1>
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
