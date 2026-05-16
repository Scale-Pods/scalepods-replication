"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, UserPlus, CheckCircle2, BarChart3, Mail, MessageSquare, Phone } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

const F = {
  inter: "var(--font-inter), sans-serif",
};

// ── HR Dashboard Mockup ────────────────────────────────────────────────────────
export const HRDashboardMockup = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: "var(--color-bg-page)",
      color: "var(--color-text-bright)",
      fontFamily: F.inter,
      display: "flex",
      flexDirection: "column",
      position: "relative",
      fontSize: "12px",
      border: "1px solid var(--color-border-faint)",
      borderRadius: "12px",
      overflow: "hidden"
    }}>
      {/* Sidebar (faint) */}
      <div style={{ 
        position: "absolute", left: 0, top: 0, bottom: 0, width: "60px", 
        borderRight: "1px solid var(--color-border-faint)", 
        background: "var(--color-glass-bg)", backdropFilter: "blur(16px)",
        opacity: 0.5
      }} />
      
      {/* Main Content */}
      <div style={{ marginLeft: "60px", padding: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div>
            <h4 style={{ margin: 0, fontSize: "18px", fontWeight: 700 }}>Hi, Team</h4>
            <p style={{ margin: "4px 0 0", color: "var(--color-text-muted)", fontSize: "11px" }}>This is your HR analytics dashboard</p>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <div style={{ padding: "4px 10px", borderRadius: "10px", background: "rgba(var(--color-green-rgb), 0.1)", color: "var(--color-green)", fontSize: "10px", fontWeight: 700 }}>Live Data</div>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          {[
            { label: "Candidates", value: "147", trend: "+12%", color: "var(--color-blue-mid)", icon: <Users size={14} /> },
            { label: "Score", value: "65.7", trend: "Top 5%", color: "var(--color-green)", icon: <BarChart3 size={14} /> },
            { label: "Hired", value: "77", trend: "80%", color: "var(--color-blue-bright)", icon: <UserPlus size={14} /> },
            { label: "Quality", value: "65.0", trend: "High", color: "var(--color-green)", icon: <CheckCircle2 size={14} /> }
          ].map((stat, i) => (
            <div key={i} style={{ 
              background: "var(--color-glass-bg)", backdropFilter: "blur(16px)", 
              border: "1px solid var(--color-border-faint)", 
              borderRadius: "12px", 
              padding: "12px" 
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ color: "var(--color-text-muted)", fontSize: "10px" }}>{stat.label}</span>
                <span style={{ color: stat.color }}>{stat.icon}</span>
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                <span style={{ fontSize: "18px", fontWeight: 700 }}>{stat.value}</span>
                <span style={{ fontSize: "9px", color: stat.color }}>{stat.trend}</span>
              </div>
              {/* Mini Chart */}
              <div style={{ height: "20px", marginTop: "10px", display: "flex", alignItems: "flex-end", gap: "2px" }}>
                {[4, 7, 5, 8, 6, 9, 7].map((h, j) => (
                  <div key={j} style={{ flex: 1, height: `${h * 10}%`, background: stat.color, opacity: 0.3, borderRadius: "1px" }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Sales Dashboard Mockup ──────────────────────────────────────────────────────
export const SalesDashboardMockup = () => {
  const { resolvedTheme } = useTheme();
  
  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: "rgba(255,255,255,0.03)", backdropFilter: "blur(16px)",
      color: "var(--color-text-bright)",
      fontFamily: F.inter,
      display: "flex",
      flexDirection: "column",
      fontSize: "12px",
      border: "1px solid var(--color-border-faint)",
      borderRadius: "16px",
      overflow: "hidden"
    }}>
      {/* Header */}
      <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-border-faint)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--color-glass-bg)", backdropFilter: "blur(16px)" }}>
        <div style={{ fontWeight: 700, fontSize: "14px" }}>Master Overview</div>
        <div style={{ display: "flex", gap: "8px" }}>
           <div style={{ background: "rgba(var(--color-blue-mid-rgb), 0.1)", color: "var(--color-blue-mid)", padding: "4px 10px", borderRadius: "6px", fontSize: "10px", fontWeight: 700 }}>Active Hub</div>
        </div>
      </div>

      <div style={{ padding: "20px" }}>
        <h4 style={{ margin: "0 0 16px", fontSize: "15px", fontWeight: 700, lineHeight: 1.3 }}>Holistic view of all your marketing channels performance.</h4>
        
        {/* Tiles Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
          {[
            { label: "Total Leads", value: "8,481", icon: <Users size={12} color="var(--color-blue-mid)" />, bg: "rgba(var(--color-blue-mid-rgb), 0.05)" },
            { label: "Emails Sent", value: "5,912", icon: <Mail size={12} color="var(--color-green)" />, bg: "rgba(var(--color-green-rgb), 0.05)" },
            { label: "WhatsApp", value: "1,373", icon: <MessageSquare size={12} color="var(--color-blue-mid)" />, bg: "rgba(var(--color-blue-mid-rgb), 0.05)" },
            { label: "Voice Calls", value: "476", icon: <Phone size={12} color="var(--color-green)" />, bg: "rgba(var(--color-green-rgb), 0.05)" }
          ].map((tile, i) => (
            <div key={i} style={{ 
              background: tile.bg, 
              borderRadius: "12px", 
              padding: "12px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: "1px solid var(--color-border-faint)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "10px", color: "var(--color-text-muted)", fontWeight: 500 }}>{tile.label}</span>
                <div style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(16px)", width: "24px", height: "24px", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--color-border-faint)" }}>
                  {tile.icon}
                </div>
              </div>
              <div style={{ fontSize: "18px", fontWeight: 700, marginTop: "8px" }}>{tile.value}</div>
            </div>
          ))}
        </div>

        {/* Large Graph Area */}
        <div style={{ background: "var(--color-glass-bg)", backdropFilter: "blur(16px)", borderRadius: "12px", padding: "16px", height: "100px", border: "1px solid var(--color-border-faint)" }}>
          <div style={{ fontSize: "11px", fontWeight: 600, marginBottom: "12px" }}>Lead Acquisition</div>
          <div style={{ height: "50px", width: "100%", position: "relative" }}>
            <svg width="100%" height="100%" preserveAspectRatio="none">
              <path d="M0,50 Q25,10 50,40 T100,20 V50 H0 Z" fill="rgba(var(--color-blue-mid-rgb),0.1)" stroke="var(--color-blue-mid)" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Voice Agent / Ops Dashboard Mockup ──────────────────────────────────────────
export const OpsDashboardMockup = () => {
  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: "var(--color-bg-page)",
      color: "var(--color-text-bright)",
      fontFamily: F.inter,
      padding: "20px",
      fontSize: "12px",
      border: "1px solid var(--color-border-faint)",
      borderRadius: "16px",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h4 style={{ margin: 0, fontWeight: 700 }}>Voice AI Agent</h4>
        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--color-green)", boxShadow: "0 0 10px var(--color-green)" }} />
      </div>

      <div style={{ background: "var(--color-glass-bg)", backdropFilter: "blur(16px)", border: "1px solid var(--color-border-faint)", borderRadius: "16px", padding: "20px", textAlign: "center" }}>
        <div style={{ width: "80px", height: "80px", borderRadius: "50%", border: "4px solid rgba(var(--color-blue-mid-rgb),0.1)", borderTopColor: "var(--color-blue-mid)", margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Phone size={24} color="var(--color-blue-mid)" />
        </div>
        <div style={{ fontSize: "16px", fontWeight: 700, marginBottom: "4px" }}>Agent Active</div>
        <div style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>Handling concurrent calls</div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "10px", color: "var(--color-text-muted)" }}>
          <span>Current Sentiment</span>
          <span style={{ color: "var(--color-green)", fontWeight: 700 }}>94% Positive</span>
        </div>
        <div style={{ width: "100%", height: "6px", background: "var(--color-border-faint)", borderRadius: "3px", overflow: "hidden" }}>
          <div style={{ width: "94%", height: "100%", background: "var(--color-blue-mid)" }} />
        </div>
      </div>
    </div>
  );
};

// ── Marketing Dashboard Mockup ──────────────────────────────────────────────────
export const MarketingDashboardMockup = () => {
  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: "rgba(255,255,255,0.03)", backdropFilter: "blur(16px)",
      color: "var(--color-text-bright)",
      fontFamily: F.inter,
      padding: "20px",
      fontSize: "12px",
      border: "1px solid var(--color-border-faint)",
      borderRadius: "16px",
    }}>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <div style={{ flex: 1, background: "var(--color-glass-bg)", backdropFilter: "blur(16px)", borderRadius: "10px", padding: "12px", border: "1px solid var(--color-border-faint)" }}>
          <div style={{ fontSize: "10px", color: "var(--color-text-muted)", marginBottom: "4px" }}>Active Ads</div>
          <div style={{ fontSize: "16px", fontWeight: 700 }}>24</div>
        </div>
        <div style={{ flex: 1, background: "var(--color-glass-bg)", backdropFilter: "blur(16px)", borderRadius: "10px", padding: "12px", border: "1px solid var(--color-border-faint)" }}>
          <div style={{ fontSize: "10px", color: "var(--color-text-muted)", marginBottom: "4px" }}>CTR</div>
          <div style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-green)" }}>4.8%</div>
        </div>
      </div>

      {/* Social Icons Feed Mockup */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {[
          { label: "Instagram Reels", progress: 80, color: "#E1306C" },
          { label: "LinkedIn Posts", progress: 65, color: "#0A66C2" },
          { label: "YouTube Shorts", progress: 45, color: "#FF0000" }
        ].map((item, i) => (
          <div key={i} style={{ background: "rgba(var(--color-text-bright-rgb), 0.02)", padding: "10px", borderRadius: "8px", border: "1px solid var(--color-border-faint)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "10px" }}>
              <span>{item.label}</span>
              <span style={{ fontWeight: 700 }}>{item.progress}% growth</span>
            </div>
            <div style={{ height: "4px", background: "var(--color-border-faint)", borderRadius: "2px" }}>
              <div style={{ width: `${item.progress}%`, height: "100%", background: item.color, borderRadius: "2px" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
