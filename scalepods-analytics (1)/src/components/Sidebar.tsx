"use client";

import React from 'react';
import { LayoutDashboard, Users, Filter, Beaker, ArrowLeft, Settings, LogOut } from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

function SidebarItem({ icon, label, active }: SidebarItemProps) {
  return (
    <div className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-colors ${active ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
      <span className="w-5 h-5">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
      {active && <div className="ml-auto w-1 h-4 bg-neon-blue rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]" />}
    </div>
  );
}

export default function Sidebar() {
  return (
    <aside className="w-64 bg-sidebar-bg border-r border-white/5 flex flex-col h-screen p-6">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-8 h-8 flex items-center justify-center rounded bg-neon-blue/20">
          <div className="w-4 h-4 bg-neon-blue rounded-sm rotate-45" />
        </div>
        <h1 className="text-xl font-bold tracking-tight">ScalePods</h1>
      </div>

      <div className="space-y-8 flex-1">
        <div>
          <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Dashboard</h2>
          <div className="space-y-1">
            <SidebarItem icon={<LayoutDashboard size={20} />} label="Analytics" active />
            <SidebarItem icon={<Users size={20} />} label="Visitors" />
          </div>
        </div>

        <div>
          <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Tools</h2>
          <div className="space-y-1">
            <SidebarItem icon={<Filter size={20} />} label="Funnels" />
            <SidebarItem icon={<Beaker size={20} />} label="A/B Tests" />
          </div>
        </div>
      </div>

      <div className="mt-auto space-y-4 pt-6 border-t border-white/5">
        <button className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors w-full text-left px-4">
          <ArrowLeft size={18} />
          <span className="text-sm">Back to Site</span>
        </button>
        <button className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors w-full text-left px-4">
          <Settings size={18} />
          <span className="text-sm">Settings</span>
        </button>
        <button className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors w-full text-left px-4">
          <LogOut size={18} />
          <span className="text-sm">Log Out</span>
        </button>
      </div>
    </aside>
  );
}
