"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { motion } from "framer-motion";
import {
  XAxis, YAxis, Tooltip as RechartsTooltip,
  ResponsiveContainer, AreaChart, Area, CartesianGrid
} from "recharts";
import {
  LogOut,
  Calendar,
  Globe,
  LayoutDashboard,
  Users,
  Filter,
  Beaker,
  Settings,
  ArrowLeft,
  ChevronDown,
  BarChart,
  Clipboard
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

const mapToPercentage = (items: any[], nameKey: string, valueKey: string, prefix = false) => {
  if (!items) return [];
  const max = Math.max(...items.map(i => i[valueKey] ?? 0)) || 1;
  return items.map(i => ({
    label: prefix ? `/${i[nameKey]}` : i[nameKey],
    value: i[valueKey],
    percentage: Math.round(((i[valueKey] ?? 0) / max) * 100),
    sublabel: "Inter, OpenType features" // To replicate the design perfectly
  }));
};

// ── Sub-components ───────────────────────────────────────────────────────────

function MetricCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">{label}</p>
      <p className="text-[36px] font-bold text-white tracking-tight leading-none">{value}</p>
    </div>
  );
}

interface DetailItem {
  label: string;
  value: string | number;
  percentage?: number;
  sublabel?: string;
}

function DetailCard({ title, items, emptyState }: { title: string; items?: DetailItem[]; emptyState?: boolean }) {
  return (
    <div className="bg-[#0A0A0A] rounded-2xl p-6 border border-[rgba(255,255,255,0.1)] shadow-[inset_0_0_10px_rgba(59,130,246,0.1)] flex flex-col min-h-[220px]">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
        <p className="text-[10px] text-gray-500 font-medium">Inter in GT Walsheim</p>
      </div>

      {emptyState || !items?.length ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
          <div className="w-24 h-16 bg-white/5 rounded-lg mb-4 border border-white/10 flex flex-col p-2 gap-1 overflow-hidden relative">
            <div className="w-full h-1 bg-white/20 rounded-full" />
            <div className="w-2/3 h-1 bg-white/20 rounded-full" />
            <div className="w-1/2 h-1 bg-white/20 rounded-full" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">No data</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {items.slice(0, 5).map((item, index) => (
            <div key={index} className="space-y-1.5">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs font-bold text-white tracking-wide truncate max-w-[150px]">{item.label}</p>
                  {item.sublabel && <p className="text-[9px] text-gray-500">{item.sublabel}</p>}
                </div>
                <span className="text-xs font-bold text-white">{item.value}</span>
              </div>
              {item.percentage !== undefined && (
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 }}
                    className={`h-full rounded-full ${index % 2 === 0 ? 'bg-[#3B82F6]' : 'bg-[#8B5CF6]'} shadow-[0_0_8px_rgba(59,130,246,0.4)]`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#151515] border border-white/10 p-3 rounded-lg shadow-2xl backdrop-blur-md">
        <p className="text-[10px] text-gray-400 mb-2">{payload[0]?.payload?.displayDate ?? 'Date'}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-4 mb-1 last:mb-0">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-xs text-gray-200">
                {entry.name === 'sessions' ? '/sessions' : entry.name === 'trend2' ? '/unique' : '/bounce'}
              </span>
            </div>
            <span className="text-xs font-bold text-white">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

function SidebarItem({ icon, label, active }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <div className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${active ? 'bg-[#1a1c24] text-[#3B82F6] shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
      <span className="w-5 h-5 flex items-center justify-center">{icon}</span>
      <span className="text-[15px] font-semibold">{label}</span>
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
    <div className="fixed inset-0 z-[100] bg-[#050505] flex font-sans overflow-hidden text-white antialiased">
      
      {/* ── Sidebar ──────────────────────────────────────────────────────── */}
      <aside className="w-64 bg-[#000000] border-r border-white/5 border-l-[3px] border-l-[#6366f1] flex flex-col h-screen p-6 shrink-0">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 flex items-center justify-center rounded bg-[#3B82F6]/20">
            <div className="w-4 h-4 bg-[#3B82F6] rounded-sm rotate-45" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">ScalePods</h1>
        </div>

        <div className="space-y-12 flex-1 mt-4">
          <div>
            <h2 className="text-[11px] font-bold text-gray-600 uppercase tracking-[0.2em] mb-6 px-4">Dashboard</h2>
            <div className="space-y-2">
              <SidebarItem icon={<BarChart size={20} />} label="Analytics" active />
              <SidebarItem icon={<Users size={20} />} label="Visitors" />
            </div>
          </div>

          <div>
            <h2 className="text-[11px] font-bold text-gray-600 uppercase tracking-[0.2em] mb-6 px-4">Tools</h2>
            <div className="space-y-2">
              <SidebarItem icon={<Filter size={20} />} label="Funnels" />
              <SidebarItem icon={<Clipboard size={20} />} label="A/B Tests" />
            </div>
          </div>
        </div>

        <div className="mt-auto space-y-4 pt-6 border-t border-white/5">
          <button onClick={() => router.push('/')} className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors w-full text-left px-4">
            <ArrowLeft size={18} />
            <span className="text-sm">Back to Site</span>
          </button>
          <button className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors w-full text-left px-4">
            <Settings size={18} />
            <span className="text-sm">Settings</span>
          </button>
          <button onClick={handleLogout} className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors w-full text-left px-4">
            <LogOut size={18} />
            <span className="text-sm">Log Out</span>
          </button>
        </div>
      </aside>

      {/* ── Main Content Area ────────────────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto p-12 bg-[#050505] custom-scrollbar z-0 relative">
        <header className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-white tracking-tight">Analytics Overview</h2>
          <button className="flex items-center gap-3 bg-[#0A0A0A] border border-white/10 shadow-xl px-5 py-2.5 rounded-xl text-[13px] font-bold text-gray-300 hover:text-white transition-all">
            <Calendar size={16} />
            <span>{minDate} — {maxDate}</span>
            <ChevronDown size={16} />
          </button>
        </header>

        {/* Main Chart Section */}
        <section className="bg-[#0A0A0A] rounded-[32px] p-12 border border-white/10 shadow-2xl mb-12 relative overflow-hidden z-0">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 mb-12">
            <MetricCard label="Total Sessions" value={sessions} />
            <MetricCard label="Average Session" value={engagement} />
            <MetricCard label="Avg Scroll Depth" value={scroll} />
            <MetricCard label="Total Pageviews" value={snapshot?.pages?.reduce((a,b)=>a+b.views,0).toLocaleString() ?? "0"} />
            <MetricCard label="Last Update" value={lastSync} />
          </div>
          
          <div className="w-full h-[350px] mt-6">
            {trendData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis 
                    dataKey="displayDate" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#374151', fontSize: 11, fontWeight: 500 }} 
                    dy={15}
                    minTickGap={40}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#374151', fontSize: 11, fontWeight: 500 }}
                    dx={-10}
                    width={40}
                  />
                  <RechartsTooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }} />
                  <Area 
                    type="monotone" 
                    dataKey={(d) => d.sessions}
                    name="sessions"
                    stroke="#8B5CF6" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorPv)" 
                    dot={{ r: 0 }}
                    activeDot={{ r: 6, fill: '#8B5CF6', stroke: 'white', strokeWidth: 2 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey={(d) => d.sessions * 0.75}
                    name="trend2"
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorUv)" 
                    dot={{ r: 0 }}
                    activeDot={{ r: 6, fill: '#3B82F6', stroke: 'white', strokeWidth: 2 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey={(d) => d.sessions * 0.5}
                    name="trend3"
                    stroke="#6366F1" 
                    strokeWidth={2}
                    fillOpacity={0} 
                    dot={{ r: 0 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/30 text-sm">
                Waiting for data...
              </div>
            )}
          </div>
          
          {/* Subtle glow background for the section */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-[#3B82F6]/5 via-transparent to-[#8B5CF6]/5 blur-[100px] pointer-events-none -z-10" />
        </section>

        {/* Bottom Details Grid */}
        <section className="grid grid-cols-4 gap-6">
          <DetailCard title="Sources" items={mapToPercentage(snapshot?.sources ?? [], 'name', 'value')} emptyState={!snapshot?.sources?.length} />
          <DetailCard title="Pages" items={mapToPercentage(snapshot?.pages ?? [], 'path', 'views', true)} />
          <DetailCard title="Geography" items={mapToPercentage(snapshot?.countries ?? [], 'name', 'value')} />
          <DetailCard title="Devices" items={mapToPercentage(snapshot?.devices ?? [], 'name', 'value')} />
          <DetailCard title="Browsers" items={mapToPercentage(snapshot?.browsers ?? [], 'name', 'value')} />
          <DetailCard title="Operating Systems" items={mapToPercentage(snapshot?.os ?? [], 'name', 'value')} />
        </section>

      </main>
    </div>
  );
}
