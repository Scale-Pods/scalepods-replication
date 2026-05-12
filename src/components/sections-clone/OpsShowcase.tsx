"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Settings, 
  MessageSquare, 
  Share2, 
  Bell, 
  CheckCircle2, 
  ArrowRight, 
  Network,
  Cpu,
  Zap,
  Globe
} from "lucide-react";

const C = {
  green: "#ACD791",
  greenBright: "#8DC763",
  blue: "#6DB6FF",
  txtBright: "#E4E9F2",
  txtBody: "#B8C7D9",
  border: "rgba(255,255,255,0.08)",
  bgCard: "rgba(255, 255, 255, 0.02)",
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
    title: "Omnichannel Support", 
    desc: "Centralized AI handling across WhatsApp, Email, and Web Chat.",
    icon: <Globe size={16} /> 
  },
  { 
    title: "Intelligent Ticketing", 
    desc: "AI-driven priority routing and automatic issue categorization.",
    icon: <Share2 size={16} /> 
  },
  { 
    title: "Workflow Orchestration", 
    desc: "Autonomous internal task management and operational follow-ups.",
    icon: <Network size={16} /> 
  },
  { 
    title: "Real-time Escalation", 
    desc: "Seamless handovers to human agents for complex queries.",
    icon: <Bell size={16} /> 
  },
];

export const OpsShowcase = () => {
  return (
    <section 
      id="ops-section"
      style={{ 
        padding: "64px 32px 72px",
        position: "relative",
        overflow: "hidden",
        background: "transparent",
        minHeight: "auto"
      }}
    >
      {/* ── CINEMATIC AMBIENT INFRASTRUCTURE (Animated Beams) ── */}
      
      {/* Primary Flow Beam */}
      <motion.div 
        animate={{ 
          x: [-30, 30, -30],
          opacity: [0.03, 0.06, 0.03]
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "-20%",
          left: "5%",
          width: "90%",
          height: "150%",
          background: `linear-gradient(115deg, transparent 20%, ${C.green}18 50%, transparent 80%)`,
          filter: "blur(140px)",
          zIndex: 0,
          pointerEvents: "none",
          transform: "rotate(-8deg)"
        }} 
      />

      {/* Blue Ambient Detail */}
      <div style={{
        position: "absolute",
        top: "20%",
        right: "-5%",
        width: "40%",
        height: "60%",
        background: "radial-gradient(circle at center, rgba(109, 182, 255, 0.04) 0%, transparent 70%)",
        filter: "blur(120px)",
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
      }} className="ops-showcase-grid">
        
        {/* Left Side: Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ position: "relative" }}
        >
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
            <Settings size={10} color={C.green} />
            <span style={{ 
              color: C.green, 
              fontSize: "10px", 
              fontWeight: 700, 
              textTransform: "uppercase", 
              letterSpacing: "0.1em" 
            }}>
              Operations Intelligence
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
            Operations & <span style={{ fontFamily: F.accent, fontStyle: "italic", fontWeight: 400, color: C.green }}>Command Center</span>
          </h2>

          <div style={{ marginBottom: "24px" }}>
            <p style={{
              fontSize: "16px",
              color: C.txtBright,
              fontWeight: 600,
              marginBottom: "8px",
              opacity: 0.95
            }}>
              Unify your support and scale your operations.
            </p>
            <p style={{
              fontSize: "14px",
              color: C.txtBody,
              lineHeight: 1.6,
              opacity: 0.8
            }}>
              Eliminate operational bottlenecks with an AI-driven command center. ScalePods automates 
              customer support and internal task routing, delivering <span style={{ color: C.blue, fontWeight: 700 }}> instant resolution </span> 
              while centralizing your entire operational visibility.
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
                  color: C.blue,
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
            background: "transparent",
            color: C.txtBright,
            border: `1px solid ${C.blue}44`,
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            backdropFilter: "blur(10px)"
          }}
          className="ops-cta"
          >
            Activate Command Center <ArrowRight size={18} />
          </button>
        </motion.div>

        {/* Right Side: High-Fidelity Ops Dashboard */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ position: "relative" }}
        >
          {/* Main Glassmorphism Container */}
          <div style={{
            background: G.bg,
            border: G.border,
            borderRadius: "28px",
            padding: "32px",
            boxShadow: `0 40px 100px rgba(0,0,0,0.5), inset 0 0 40px rgba(109, 182, 255, 0.03)`,
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

            {/* Dashboard Header */}
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center",
              marginBottom: "32px"
            }}>
              <div>
                <h3 style={{ color: C.txtBright, fontSize: "18px", fontWeight: 700, margin: 0 }}>Omnichannel Hub</h3>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "4px" }}>
                  <div style={{ width: "6px", height: "6px", background: C.green, borderRadius: "50%", boxShadow: `0 0 10px ${C.green}` }} />
                  <p style={{ color: C.txtBody, fontSize: "12px", margin: 0, opacity: 0.6 }}>AI Workflow: Continuous</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <div style={{ background: "rgba(109, 182, 255, 0.08)", borderRadius: "8px", padding: "6px 12px", border: `1px solid ${C.blue}22` }}>
                  <span style={{ color: C.blue, fontSize: "11px", fontWeight: 700 }}>98.4% Resolution</span>
                </div>
              </div>
            </div>

            {/* Operational Metrics Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "32px" }}>
              <div style={{ 
                padding: "16px", 
                background: "rgba(255,255,255,0.02)", 
                borderRadius: "16px", 
                border: "1px solid rgba(255,255,255,0.04)",
                backdropFilter: "blur(8px)"
              }}>
                <div style={{ fontSize: "10px", color: C.txtBody, opacity: 0.6, textTransform: "uppercase", marginBottom: "4px" }}>Active Tickets</div>
                <div style={{ fontSize: "22px", fontWeight: 800, color: C.txtBright }}>1,242</div>
              </div>
              <div style={{ 
                padding: "16px", 
                background: "rgba(255,255,255,0.02)", 
                borderRadius: "16px", 
                border: "1px solid rgba(255,255,255,0.04)",
                backdropFilter: "blur(8px)"
              }}>
                <div style={{ fontSize: "10px", color: C.txtBody, opacity: 0.6, textTransform: "uppercase", marginBottom: "4px" }}>Response Time</div>
                <div style={{ fontSize: "22px", fontWeight: 800, color: C.green }}>0.4s</div>
              </div>
            </div>

            {/* Omnichannel Activity Feed */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { type: "WhatsApp", action: "Order Tracking Auto-Reply", status: "Resolved", time: "Just now" },
                { type: "Email", action: "Subscription Refund Request", status: "AI Routing", time: "2m ago" },
                { type: "Web Chat", action: "Technical FAQ Inquiry", status: "Resolved", time: "5m ago" },
              ].map((item, i) => (
                <div key={i} style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "space-between",
                  padding: "14px 20px",
                  background: "rgba(255,255,255,0.015)",
                  borderRadius: "16px",
                  border: "1px solid rgba(255,255,255,0.04)",
                  backdropFilter: "blur(4px)"
                }}>
                  <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                    <div style={{ 
                      width: "32px", 
                      height: "32px", 
                      borderRadius: "8px", 
                      background: i === 1 ? "rgba(109, 182, 255, 0.1)" : "rgba(172, 215, 145, 0.1)", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center" 
                    }}>
                      <MessageSquare size={14} color={i === 1 ? C.blue : C.green} />
                    </div>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 600, color: C.txtBright }}>{item.type}</div>
                      <div style={{ fontSize: "11px", color: C.txtBody, opacity: 0.6 }}>{item.action}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "10px", fontWeight: 700, color: item.status === "Resolved" ? C.green : C.blue, textTransform: "uppercase" }}>{item.status}</div>
                    <div style={{ fontSize: "10px", color: C.txtBody, opacity: 0.4 }}>{item.time}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Floating Element: AI Routing Node */}
            <motion.div 
              animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                bottom: "-30px",
                right: "40px",
                background: "rgba(10, 12, 16, 0.5)",
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
              <div style={{ position: "relative" }}>
                <Cpu size={18} color={C.green} />
                <motion.div 
                  animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  style={{ position: "absolute", inset: -4, background: C.green, borderRadius: "50%", zIndex: -1, filter: "blur(8px)" }}
                />
              </div>
              <span style={{ fontSize: "12px", fontWeight: 700, color: C.txtBright }}>Routing Active</span>
            </motion.div>
          </div>
        </motion.div>

      </div>

      <style jsx>{`
        .ops-cta:hover {
          transform: translateY(-2px);
          border-color: ${C.blue} !important;
          background: rgba(109, 182, 255, 0.05) !important;
          box-shadow: 0 12px 30px rgba(109, 182, 255, 0.15);
        }
        @media (max-width: 1024px) {
          .ops-showcase-grid {
            grid-template-columns: 1fr !important;
            gap: 60px !important;
            text-align: center;
          }
          .ops-showcase-grid > div {
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
