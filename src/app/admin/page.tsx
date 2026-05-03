"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from "recharts";
import { Users, Clock, MousePointer2, Globe, Laptop, ArrowUpRight, LogOut, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

// Dummy data mimicking the future n8n Clarity cache response
const MOCK_TRAFFIC_DATA = [
  { time: "00:00", sessions: 120 },
  { time: "04:00", sessions: 200 },
  { time: "08:00", sessions: 450 },
  { time: "12:00", sessions: 800 },
  { time: "16:00", sessions: 650 },
  { time: "20:00", sessions: 350 },
  { time: "24:00", sessions: 150 },
];

const MOCK_BROWSER_DATA = [
  { name: "Chrome", value: 65 },
  { name: "Safari", value: 20 },
  { name: "Edge", value: 10 },
  { name: "Firefox", value: 5 },
];

const MOCK_PAGES_DATA = [
  { path: "/home", views: 2400 },
  { path: "/use-cases", views: 1398 },
  { path: "/pricing", views: 9800 },
  { path: "/blog", views: 3908 },
  { path: "/contact", views: 4800 },
];

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function checkUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/admin/login");
      } else {
        setUser(user);
        setLoading(false);
      }
    }
    checkUser();
  }, [router, supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#04070D] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#ACD791] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#04070D] text-[#B8C7D9] pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 font-satoshi">ScalePods Analytics</h1>
            <p className="text-[#636996]">Welcome back, <span className="text-white font-medium">{user?.email}</span></p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center gap-3 bg-[#10131C] px-4 py-2 rounded-full border border-[rgba(255,255,255,0.06)] text-sm">
              <div className="w-2 h-2 rounded-full bg-[#00CED1] animate-pulse" />
              <span>Cache Status: Live (Syncing via n8n)</span>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm hover:bg-red-500/20 transition-all"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </motion.div>

        {/* Top Metric Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <motion.div variants={itemVariants} className="use-case-card !text-left !p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[rgba(109,182,255,0.1)] flex items-center justify-center text-[#6DB6FF]">
                <Users size={20} />
              </div>
              <span className="flex items-center gap-1 text-[#ACD791] text-sm font-medium">
                +12.5% <ArrowUpRight size={14} />
              </span>
            </div>
            <div>
              <p className="text-[#636996] text-sm font-medium mb-1">Total Sessions</p>
              <h3 className="text-3xl font-bold text-white">8,421</h3>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="use-case-card !text-left !p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[rgba(0,206,209,0.1)] flex items-center justify-center text-[#00CED1]">
                <Clock size={20} />
              </div>
              <span className="flex items-center gap-1 text-[#ACD791] text-sm font-medium">
                +4.2% <ArrowUpRight size={14} />
              </span>
            </div>
            <div>
              <p className="text-[#636996] text-sm font-medium mb-1">Avg Engagement Time</p>
              <h3 className="text-3xl font-bold text-white">1m 45s</h3>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="use-case-card !text-left !p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[rgba(255,165,0,0.1)] flex items-center justify-center text-orange-400">
                <MousePointer2 size={20} />
              </div>
              <span className="flex items-center gap-1 text-[#636996] text-sm font-medium">
                Stable
              </span>
            </div>
            <div>
              <p className="text-[#636996] text-sm font-medium mb-1">Avg Scroll Depth</p>
              <h3 className="text-3xl font-bold text-white">64.2%</h3>
            </div>
          </motion.div>
        </motion.div>

        {/* Main Charts & Breakdowns Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Main Traffic Area Chart */}
          <motion.div variants={itemVariants} className="use-case-card lg:col-span-2 !text-left !p-6">
            <h3 className="text-lg font-bold text-white mb-6 font-satoshi">Traffic Overview (24h)</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_TRAFFIC_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0080FF" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0080FF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="time" stroke="#636996" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#636996" fontSize={12} tickLine={false} axisLine={false} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#0D0F17', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="sessions" stroke="#0080FF" strokeWidth={3} fillOpacity={1} fill="url(#colorSessions)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Breakdown Widgets */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            
            {/* Top Browsers List */}
            <div className="use-case-card !text-left !p-6 flex-1">
              <h3 className="text-lg font-bold text-white mb-4 font-satoshi">Top Browsers</h3>
              <div className="space-y-4">
                {MOCK_BROWSER_DATA.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Globe size={16} className="text-[#6DB6FF]" />
                      <span className="text-sm text-[#E4E9F2]">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#0080FF] rounded-full" 
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-white w-8 text-right">{item.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Pages List */}
            <div className="use-case-card !text-left !p-6 flex-1">
              <h3 className="text-lg font-bold text-white mb-4 font-satoshi">Popular Pages</h3>
              <div className="space-y-4">
                {MOCK_PAGES_DATA.slice(0,4).map((item) => (
                  <div key={item.path} className="flex items-center justify-between">
                    <span className="text-sm text-[#E4E9F2] truncate max-w-[150px]">{item.path}</span>
                    <span className="text-sm font-medium text-[#6DB6FF]">{item.views.toLocaleString()} views</span>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
