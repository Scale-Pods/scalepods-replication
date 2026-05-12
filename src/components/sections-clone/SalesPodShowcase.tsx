"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Zap, 
  Target, 
  TrendingUp, 
  MessageSquare, 
  CheckCircle2, 
  ArrowRight, 
  PieChart, 
  Activity
} from "lucide-react";

const C = {
  green: "#ACD791",
  greenBright: "#8DC763",
  blue: "#6DB6FF",
  txtBright: "#E4E9F2",
  txtBody: "#B8C7D9",
  border: "rgba(255,255,255,0.08)",
  bgCard: "rgba(8, 10, 14, 0.75)",
  bgInput: "rgba(255, 255, 255, 0.03)",
};

const F = {
  inter: "Inter, sans-serif",
  serif: "Instrument Serif, Georgia, serif",
  accent: "'Instrument Serif', serif",
};

const G = {
  bg: "rgba(255, 255, 255, 0.015)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  blur: "blur(40px)",
};

const features = [
  { 
    title: "AI Lead Sourcing", 
    desc: "Real-time extraction & verification of ICP-aligned leads.",
    icon: <Target size={16} /> 
  },
  { 
    title: "Multi-Channel Outreach", 
    desc: "Personalized Email, WhatsApp & Voice at scale.",
    icon: <MessageSquare size={16} /> 
  },
  { 
    title: "Intelligent CRM Sync", 
    desc: "Zero manual data entry. Auto-updates based on intent.",
    icon: <Activity size={16} /> 
  },
  { 
    title: "Meeting Booking Engine", 
    desc: "Automated follow-ups that lead to booked calendar events.",
    icon: <TrendingUp size={16} /> 
  },
];

export const SalesPodShowcase = () => {
  return (
    <section 
      id="sales-pod-showcase"
      style={{ 
        padding: "64px 32px 72px",
        position: "relative",
        overflow: "hidden",
        background: "transparent",
        minHeight: "auto"
      }}
    >
      {/* ── CINEMATIC AMBIENT INFRASTRUCTURE (Animated Beams) ── */}
      
      {/* Primary Diagonal Flow Beam - Highly visible through glass */}
      <motion.div 
        animate={{ 
          x: [-30, 30, -30],
          opacity: [0.04, 0.08, 0.04]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "-30%",
          left: "5%",
          width: "90%",
          height: "160%",
          background: `linear-gradient(115deg, transparent 15%, ${C.green}25 50%, transparent 85%)`,
          filter: "blur(140px)",
          zIndex: 0,
          pointerEvents: "none",
          transform: "rotate(-12deg)"
        }} 
      />

      {/* Atmospheric Glow behind Left Side */}
      <div style={{
        position: "absolute",
        top: "10%",
        left: "-10%",
        width: "50%",
        height: "80%",
        background: `radial-gradient(circle at center, ${C.green}06 0%, transparent 70%)`,
        filter: "blur(120px)",
        zIndex: 0,
        pointerEvents: "none"
      }} />

      {/* Atmospheric Glow behind Right Side */}
      <motion.div 
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.06, 0.1, 0.06]
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          bottom: "-20%",
          right: "-10%",
          width: "60%",
          height: "90%",
          background: `radial-gradient(circle at center, ${C.green}0A 0%, transparent 70%)`,
          filter: "blur(130px)",
          zIndex: 0,
          pointerEvents: "none"
        }} 
      />

      {/* Subtle Blue Contrast Beam (Bottom Left) */}
      <div style={{
        position: "absolute",
        bottom: "-10%",
        left: "5%",
        width: "300px",
        height: "300px",
        background: "radial-gradient(circle, rgba(109, 182, 255, 0.02) 0%, transparent 70%)",
        filter: "blur(100px)",
        zIndex: 0,
        pointerEvents: "none"
      }} />

      <div style={{
        maxWidth: "1240px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 1.2fr",
        gap: "60px",
        alignItems: "center",
        position: "relative",
        zIndex: 1
      }} className="salespod-grid">
        
        {/* Left Side: Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ position: "relative" }}
        >
          {/* Subtle glow specifically behind heading area */}
          <div style={{
            position: "absolute",
            top: "-40px",
            left: "-40px",
            width: "300px",
            height: "200px",
            background: `radial-gradient(circle at center, ${C.green}03 0%, transparent 70%)`,
            filter: "blur(60px)",
            zIndex: -1,
            pointerEvents: "none"
          }} />
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 12px",
            background: "rgba(172, 215, 145, 0.08)",
            border: `1px solid rgba(172, 215, 145, 0.15)`,
            borderRadius: "100px",
            marginBottom: "20px"
          }}>
            <Zap size={10} color={C.green} />
            <span style={{ 
              color: C.green, 
              fontSize: "10px", 
              fontWeight: 700, 
              textTransform: "uppercase", 
              letterSpacing: "0.1em" 
            }}>
              Sales Intelligence
            </span>
          </div>

          <h2 style={{
            fontFamily: F.inter,
            fontSize: "clamp(30px, 3.2vw, 44px)",
            fontWeight: 800,
            color: C.txtBright,
            lineHeight: 1,
            marginBottom: "12px",
            letterSpacing: "-0.05em"
          }}>
            SalesPod / <span style={{ fontFamily: F.accent, fontStyle: "italic", fontWeight: 400, color: C.green }}>AI Sales Engine</span>
          </h2>

          <div style={{ marginBottom: "24px" }}>
            <p style={{
              fontSize: "16px",
              color: C.txtBright,
              fontWeight: 600,
              marginBottom: "8px",
              opacity: 0.95
            }}>
              Stop the manual grind. Start scaling revenue.
            </p>
            <p style={{
              fontSize: "14px",
              color: C.txtBody,
              lineHeight: 1.6,
              opacity: 0.8
            }}>
              SalesPod automates the entire top-of-funnel—from sourcing to meeting booking—delivering 
              <span style={{ color: C.green, fontWeight: 700 }}> 3x more pipeline </span> with zero sales overhead.
            </p>
          </div>

          {/* Capabilities List */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "1fr 1fr", 
            gap: "20px",
            marginBottom: "32px" 
          }}>
            {features.map((feat, i) => (
              <div key={i}>
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "10px", 
                  color: C.green,
                  marginBottom: "8px"
                }}>
                  {feat.icon}
                  <h4 style={{ 
                    fontSize: "14px", 
                    fontWeight: 700, 
                    color: C.txtBright,
                    margin: 0 
                  }}>
                    {feat.title}
                  </h4>
                </div>
                <p style={{ 
                  fontSize: "12px", 
                  color: C.txtBody, 
                  lineHeight: 1.5, 
                  margin: 0,
                  opacity: 0.7 
                }}>
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>

          <button style={{
            padding: "14px 32px",
            background: C.green,
            color: "#000",
            border: "none",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
            transition: "all 0.3s ease"
          }}
          className="salespod-cta"
          >
            Deploy Your SalesPod <ArrowRight size={18} />
          </button>
        </motion.div>

        {/* Right Side: High-Fidelity Glass Dashboard */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ position: "relative" }}
        >
          {/* Main Glassmorphism Dashboard Container */}
          <div style={{
            background: G.bg,
            border: G.border,
            borderRadius: "28px",
            padding: "32px",
            boxShadow: `0 40px 100px rgba(0,0,0,0.5), inset 0 0 40px rgba(172, 215, 145, 0.03)`,
            backdropFilter: G.blur,
            position: "relative",
            zIndex: 2,
            minHeight: "440px"
          }}>
            {/* Top Reflection Rim Light */}
            <div style={{
              position: "absolute",
              top: 0, left: "10%", right: "10%",
              height: "1px",
              background: `linear-gradient(90deg, transparent, rgba(172, 215, 145, 0.3), transparent)`,
              pointerEvents: "none"
            }} />

            {/* Mock Header */}
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center",
              marginBottom: "32px"
            }}>
              <div>
                <h3 style={{ color: C.txtBright, fontSize: "18px", fontWeight: 700, margin: 0, letterSpacing: "-0.01em" }}>Active Pipeline</h3>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "4px" }}>
                  <div style={{ width: "6px", height: "6px", background: C.green, borderRadius: "50%", boxShadow: `0 0 10px ${C.green}` }} />
                  <p style={{ color: C.txtBody, fontSize: "12px", margin: 0, opacity: 0.6 }}>AI Engine: Monitoring...</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                <div style={{ 
                  padding: "8px 18px", 
                  background: "rgba(109, 182, 255, 0.08)", 
                  borderRadius: "10px", 
                  border: "1px solid rgba(109, 182, 255, 0.15)",
                  backdropFilter: "blur(10px)"
                }}>
                  <span style={{ color: C.blue, fontSize: "12px", fontWeight: 700 }}>24 New Leads</span>
                </div>
              </div>
            </div>

            {/* Mock Stats Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "32px" }}>
              {[
                { label: "Booked", value: "84", icon: <CheckCircle2 size={14} color={C.green} /> },
                { label: "Outreach", value: "2.4k", icon: <Activity size={14} color={C.blue} /> },
                { label: "Conv.", value: "18.4%", icon: <PieChart size={14} color={C.green} /> },
              ].map((stat, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -2, background: "rgba(255,255,255,0.04)" }}
                  style={{ 
                    background: "rgba(255,255,255,0.02)", 
                    padding: "18px", 
                    borderRadius: "16px",
                    border: "1px solid rgba(255,255,255,0.06)",
                    backdropFilter: "blur(8px)",
                    transition: "all 0.3s ease"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px", opacity: 0.6 }}>
                    {stat.icon}
                    <span style={{ fontSize: "10px", fontWeight: 600, color: C.txtBright, textTransform: "uppercase", letterSpacing: "0.05em" }}>{stat.label}</span>
                  </div>
                  <div style={{ fontSize: "24px", fontWeight: 800, color: C.txtBright }}>{stat.value}</div>
                </motion.div>
              ))}
            </div>

            {/* Mock Lead Activity */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { name: "John D.", action: "WhatsApp AI Reply", time: "2m ago", status: "Hot Lead" },
                { name: "Sarah K.", action: "Invite Accepted", time: "15m ago", status: "Booked" },
                { name: "Mike R.", action: "AI Intent Captured", time: "1h ago", status: "Qualified" },
              ].map((activity, i) => (
                <div key={i} style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "space-between",
                  padding: "14px 20px",
                  background: "rgba(255,255,255,0.015)",
                  borderRadius: "14px",
                  border: "1px solid rgba(255,255,255,0.04)",
                  backdropFilter: "blur(4px)",
                  position: "relative"
                }}>
                  <div style={{ 
                    position: "absolute", 
                    left: 0, top: "25%", bottom: "25%", 
                    width: "2px", 
                    background: activity.status === "Booked" ? C.green : C.blue,
                    borderRadius: "0 4px 4px 0",
                    boxShadow: `0 0 15px ${activity.status === "Booked" ? C.green : C.blue}66`
                  }} />
                  <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: `1px solid ${C.border}` }} />
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: 600, color: C.txtBright }}>{activity.name}</div>
                      <div style={{ fontSize: "12px", color: C.txtBody, opacity: 0.6 }}>{activity.action}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "11px", fontWeight: 700, color: activity.status === "Booked" ? C.green : C.blue, textTransform: "uppercase", letterSpacing: "0.02em" }}>{activity.status}</div>
                    <div style={{ fontSize: "11px", color: C.txtBody, opacity: 0.4 }}>{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Floating Element: AI Pulse */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                top: "-30px",
                right: "-12px",
                background: "rgba(10, 12, 16, 0.4)",
                padding: "16px 24px",
                borderRadius: "20px",
                border: `1px solid rgba(172, 215, 145, 0.3)`,
                boxShadow: `0 20px 50px rgba(0,0,0,0.5), inset 0 0 15px rgba(172, 215, 145, 0.05)`,
                display: "flex",
                alignItems: "center",
                gap: "14px",
                zIndex: 3,
                backdropFilter: "blur(24px)"
              }}
            >
              <motion.div 
                animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ 
                  width: "10px", 
                  height: "10px", 
                  background: C.green, 
                  borderRadius: "50%",
                  boxShadow: `0 0 12px ${C.green}`
                }} />
              <span style={{ fontSize: "12px", fontWeight: 700, color: C.txtBright, letterSpacing: "0.02em" }}>AI Agent Scaling...</span>
            </motion.div>
          </div>
        </motion.div>

      </div>

      <style jsx>{`
        .salespod-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(172, 215, 145, 0.3);
          background: #C1E9A7 !important;
        }
        @media (max-width: 1024px) {
          .salespod-grid {
            grid-template-columns: 1fr !important;
            gap: 60px !important;
            text-align: center;
          }
          .salespod-grid > div {
            margin: 0 auto;
            align-items: center !important;
            display: flex;
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  );
};
