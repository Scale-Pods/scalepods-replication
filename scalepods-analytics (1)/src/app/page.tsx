"use client";

import { ChevronDown } from 'lucide-react';
import Sidebar from '@/src/components/Sidebar';
import MetricCard from '@/src/components/MetricCard';
import AnalyticsChart from '@/src/components/AnalyticsChart';
import DetailCard from '@/src/components/DetailCard';

export default function Home() {
  return (
    <div className="flex h-screen bg-dashboard-bg">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto p-10">
        <header className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-bold text-white tracking-tight">Analytics Overview</h2>
          <button className="flex items-center gap-2 bg-card-bg border border-white/5 px-4 py-1.5 rounded-lg text-xs font-bold text-gray-400 hover:text-white transition-colors border-glow">
            Variant 2 <ChevronDown size={14} />
          </button>
        </header>

        {/* Main Chart Section */}
        <section className="bg-card-bg rounded-3xl p-10 border border-white/5 border-glow mb-10 relative overflow-hidden">
          <div className="grid grid-cols-5 gap-8 mb-4">
            <MetricCard label="Total Sessions" value="1,339" />
            <MetricCard label="Average Session" value="05.60m" />
            <MetricCard label="Avg Scroll Depth" value="33.90%" />
            <MetricCard label="Total Pageviews" value="2,076" />
            <MetricCard label="Last Update" value="31 day ago" />
          </div>
          
          <AnalyticsChart />
          
          {/* Subtle glow background for the section */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-neon-blue/5 blur-[120px] pointer-events-none -z-10" />
        </section>

        {/* Bottom Details Grid */}
        <section className="grid grid-cols-4 gap-6">
          <DetailCard title="Sources" emptyState />
          <DetailCard 
            title="Pages" 
            items={[
              { label: "/", value: 180, percentage: 80, sublabel: "Inter, OpenType features" },
              { label: "/contact", value: 54, percentage: 30, sublabel: "Inter, OpenType features" },
              { label: "/gcc", value: 36, percentage: 20, sublabel: "Inter, OpenType features" }
            ]} 
          />
          <DetailCard 
            title="Geography" 
            items={[
              { label: "India", value: 240, percentage: 90 }
            ]} 
          />
          <DetailCard 
            title="Devices" 
            items={[
              { label: "PC", value: 26, percentage: 65 },
              { label: "Mobile", value: 18, percentage: 45 }
            ]} 
          />
        </section>
      </main>
    </div>
  );
}
