"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, UserPlus, CheckCircle2, TrendingUp, BarChart3, Mail, MessageSquare, Phone, MousePointer2 } from "lucide-react";

const F = {
  inter: "Inter, sans-serif",
};

// ── HR Dashboard Mockup ────────────────────────────────────────────────────────
export const HRDashboardMockup = () => {
  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: "#040508",
      color: "#fff",
      fontFamily: F.inter,
      display: "flex",
      flexDirection: "column",
      position: "relative",
      fontSize: "12px",
    }}>
      {/* Sidebar (faint) */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "60px", borderRight: "1px solid rgba(255,255,255,0.05)", background: "#06080C" }} />
      
      {/* Main Content */}
      <div style={{ marginLeft: "60px", padding: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div>
            <h4 style={{ margin: 0, fontSize: "18px", fontWeight: 700 }}>Hi, Satarou</h4>
            <p style={{ margin: "4px 0 0", color: "rgba(255,255,255,0.5)", fontSize: "11px" }}>This is your HR analytics dashboard</p>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <div style={{ padding: "4px 10px", borderRadius: "10px", background: "rgba(172,215,145,0.1)", color: "#ACD791", fontSize: "10px" }}>Live Data</div>
            <div style={{ padding: "4px 10px", borderRadius: "10px", background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", fontSize: "10px" }}>Active Campaigns</div>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          {[
            { label: "Total Candidates", value: "147", trend: "+12.5%", color: "#6DB6FF", icon: <Users size={14} /> },
            { label: "Average Score", value: "65.76", trend: "Top 5%", color: "#ACD791", icon: <BarChart3 size={14} /> },
            { label: "Final Hired", value: "77", trend: "80.00%", color: "#FBBF24", icon: <UserPlus size={14} /> },
            { label: "Decision Quality", value: "65.00", trend: "High", color: "#EC4899", icon: <CheckCircle2 size={14} /> }
          ].map((stat, i) => (
            <div key={i} style={{ 
              background: "rgba(255,255,255,0.03)", 
              border: "1px solid rgba(255,255,255,0.06)", 
              borderRadius: "12px", 
              padding: "12px" 
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "10px" }}>{stat.label}</span>
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
  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: "#FFFFFF",
      color: "#000",
      fontFamily: F.inter,
      display: "flex",
      flexDirection: "column",
      fontSize: "12px",
    }}>
      {/* Header */}
      <div style={{ padding: "16px 20px", borderBottom: "1px solid #F0F0F0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontWeight: 700, fontSize: "14px" }}>Master Overview</div>
        <div style={{ display: "flex", gap: "12px" }}>
          <div style={{ background: "#F5F7FB", padding: "4px 10px", borderRadius: "6px", fontSize: "10px" }}>VAPI USED: $39.41</div>
          <div style={{ background: "#F5F7FB", padding: "4px 10px", borderRadius: "6px", fontSize: "10px" }}>TWILIO: $25.09</div>
        </div>
      </div>

      <div style={{ padding: "20px" }}>
        <h4 style={{ margin: "0 0 16px", fontSize: "16px", fontWeight: 700 }}>Holistic view of all your marketing channels performance.</h4>
        
        {/* Tiles Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
          {[
            { label: "Total Leads", value: "8,481", icon: <Users size={12} color="#3B82F6" />, bg: "#EFF6FF" },
            { label: "Total Emails Sent", value: "59", icon: <Mail size={12} color="#10B981" />, bg: "#ECFDF5" },
            { label: "Total WhatsApp Chats", value: "1,373", icon: <MessageSquare size={12} color="#8B5CF6" />, bg: "#F5F3FF" },
            { label: "Total Voice Calls", value: "476", icon: <Phone size={12} color="#F59E0B" />, bg: "#FFFBEB" }
          ].map((tile, i) => (
            <div key={i} style={{ 
              background: tile.bg, 
              borderRadius: "12px", 
              padding: "12px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "10px", color: "rgba(0,0,0,0.5)", fontWeight: 500 }}>{tile.label}</span>
                <div style={{ background: "#fff", width: "24px", height: "24px", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {tile.icon}
                </div>
              </div>
              <div style={{ fontSize: "18px", fontWeight: 700, marginTop: "8px" }}>{tile.value}</div>
            </div>
          ))}
        </div>

        {/* Large Graph Area */}
        <div style={{ background: "#F9FAFB", borderRadius: "12px", padding: "16px", height: "100px", border: "1px solid #F3F4F6" }}>
          <div style={{ fontSize: "11px", fontWeight: 600, marginBottom: "12px" }}>Lead Acquisition</div>
          <div style={{ height: "50px", width: "100%", position: "relative" }}>
            <svg width="100%" height="100%" preserveAspectRatio="none">
              <path d="M0,50 Q25,10 50,40 T100,20 V50 H0 Z" fill="rgba(59,130,246,0.1)" stroke="#3B82F6" strokeWidth="2" />
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
      background: "#080A10",
      color: "#fff",
      fontFamily: F.inter,
      padding: "20px",
      fontSize: "12px",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h4 style={{ margin: 0, fontWeight: 700 }}>Voice AI Agent</h4>
        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10B981", boxShadow: "0 0 10px #10B981" }} />
      </div>

      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px", textAlign: "center" }}>
        <div style={{ width: "80px", height: "80px", borderRadius: "50%", border: "4px solid rgba(109,182,255,0.1)", borderTopColor: "#6DB6FF", margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Phone size={24} color="#6DB6FF" />
        </div>
        <div style={{ fontSize: "16px", fontWeight: 700, marginBottom: "4px" }}>Agent Active</div>
        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>Handling 12 concurrent calls</div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "10px", color: "rgba(255,255,255,0.5)" }}>
          <span>Current Sentiment</span>
          <span>94% Positive</span>
        </div>
        <div style={{ width: "100%", height: "6px", background: "rgba(255,255,255,0.05)", borderRadius: "3px", overflow: "hidden" }}>
          <div style={{ width: "94%", height: "100%", background: "#6DB6FF" }} />
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
      background: "#05070A",
      color: "#fff",
      fontFamily: F.inter,
      padding: "20px",
      fontSize: "12px",
    }}>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <div style={{ flex: 1, background: "rgba(255,255,255,0.03)", borderRadius: "10px", padding: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.5)", marginBottom: "4px" }}>Active Ads</div>
          <div style={{ fontSize: "16px", fontWeight: 700 }}>24</div>
        </div>
        <div style={{ flex: 1, background: "rgba(255,255,255,0.03)", borderRadius: "10px", padding: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.5)", marginBottom: "4px" }}>CTR</div>
          <div style={{ fontSize: "16px", fontWeight: 700, color: "#ACD791" }}>4.8%</div>
        </div>
      </div>

      {/* Social Icons Feed Mockup */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {[
          { label: "Instagram Reels", progress: 80, color: "#E1306C" },
          { label: "LinkedIn Posts", progress: 65, color: "#0A66C2" },
          { label: "YouTube Shorts", progress: 45, color: "#FF0000" }
        ].map((item, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.02)", padding: "10px", borderRadius: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "10px" }}>
              <span>{item.label}</span>
              <span>{item.progress}% growth</span>
            </div>
            <div style={{ height: "4px", background: "rgba(255,255,255,0.05)", borderRadius: "2px" }}>
              <div style={{ width: `${item.progress}%`, height: "100%", background: item.color, borderRadius: "2px" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
