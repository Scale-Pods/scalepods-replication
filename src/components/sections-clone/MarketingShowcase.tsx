"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  PenTool, 
  Globe, 
  Megaphone, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Layers,
  Zap,
  Layout
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
    title: "AI Content Engine", 
    desc: "Autonomous generation of blogs, social posts, and ad copies.",
    icon: <Sparkles size={16} /> 
  },
  { 
    title: "Campaign Orchestration", 
    desc: "Multi-channel execution with automated scheduling and tracking.",
    icon: <Megaphone size={16} /> 
  },
  { 
    title: "Landing Page Factory", 
    desc: "Rapid deployment of high-converting, AI-optimized landing pages.",
    icon: <Layout size={16} /> 
  },
  { 
    title: "Analytics Intelligence", 
    desc: "Real-time performance tracking and automated campaign tuning.",
    icon: <BarChart3 size={16} /> 
  },
];

export const MarketingShowcase = () => {
  return (
    <section 
      id="marketing-section"
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
          x: [40, -40, 40],
          opacity: [0.04, 0.08, 0.04]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "-30%",
          left: "-10%",
          width: "100%",
          height: "160%",
          background: `linear-gradient(135deg, transparent 20%, ${C.green}20 50%, transparent 80%)`,
          filter: "blur(140px)",
          zIndex: 0,
          pointerEvents: "none",
          transform: "rotate(-10deg)"
        }} 
      />

      <div style={{
        maxWidth: "1240px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 1.2fr",
        gap: "60px",
        alignItems: "center",
        position: "relative",
        zIndex: 1
      }} className="marketing-showcase-grid">
        
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
            <PenTool size={10} color={C.green} />
            <span style={{ 
              color: C.green, 
              fontSize: "10px", 
              fontWeight: 700, 
              textTransform: "uppercase", 
              letterSpacing: "0.1em" 
            }}>
              Marketing Intelligence
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
            Marketing / <span style={{ fontFamily: F.accent, fontStyle: "italic", fontWeight: 400, color: C.green }}>Execution Engine</span>
          </h2>

          <div style={{ marginBottom: "24px" }}>
            <p style={{
              fontSize: "16px",
              color: C.txtBright,
              fontWeight: 600,
              marginBottom: "8px",
              opacity: 0.95
            }}>
              Turn your marketing into an autonomous growth engine.
            </p>
            <p style={{
              fontSize: "14px",
              color: C.txtBody,
              lineHeight: 1.6,
              opacity: 0.8
            }}>
              ScalePods automates the entire content and campaign lifecycle. From generating 
              SEO-driven blogs to executing multi-channel social campaigns, our AI engine 
              delivers <span style={{ color: C.green, fontWeight: 700 }}> constant engagement </span> 
              with zero manual production lag.
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
          className="marketing-cta"
          >
            Deploy Marketing Engine <ArrowRight size={18} />
          </button>
        </motion.div>

        {/* Right Side: High-Fidelity Marketing Dashboard */}
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
            boxShadow: `0 40px 100px rgba(0,0,0,0.5), inset 0 0 40px rgba(172, 215, 145, 0.03)`,
            backdropFilter: G.blur,
            position: "relative",
            zIndex: 2,
            minHeight: "440px"
          }}>
            {/* Top Reflection Rim Light */}
            <div style={{
              position: "absolute",
              top: 0, left: "20%", right: "20%",
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
                <h3 style={{ color: C.txtBright, fontSize: "18px", fontWeight: 700, margin: 0 }}>Content Pipeline</h3>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "4px" }}>
                  <div style={{ width: "6px", height: "6px", background: C.green, borderRadius: "50%", boxShadow: `0 0 10px ${C.green}` }} />
                  <p style={{ color: C.txtBody, fontSize: "12px", margin: 0, opacity: 0.6 }}>Campaign Engine: Optimizing</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <div style={{ background: "rgba(172, 215, 145, 0.1)", borderRadius: "8px", padding: "6px 12px", border: `1px solid ${C.green}22` }}>
                  <span style={{ color: C.green, fontSize: "11px", fontWeight: 700 }}>+420% Growth</span>
                </div>
              </div>
            </div>

            {/* Content Queue Visual */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
              {[
                { type: "Social Post", title: "ScalePods Ecosystem Reveal", status: "Published", reach: "12.4k" },
                { type: "Blog Post", title: "The Future of AI Managed Pods", status: "Generating", reach: "Pending" },
                { type: "Email Campaign", title: "Enterprise Automation Guide", status: "Queued", reach: "4.2k" },
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
                      background: item.status === "Published" ? "rgba(172, 215, 145, 0.1)" : "rgba(255,255,255,0.05)", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center" 
                    }}>
                      <Layout size={14} color={item.status === "Published" ? C.green : C.txtBody} />
                    </div>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 600, color: C.txtBright }}>{item.type}</div>
                      <div style={{ fontSize: "11px", color: C.txtBody, opacity: 0.6 }}>{item.title}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "10px", fontWeight: 700, color: item.status === "Published" ? C.green : C.blue, textTransform: "uppercase" }}>{item.status}</div>
                    <div style={{ fontSize: "10px", color: C.txtBody, opacity: 0.4 }}>{item.reach} reach</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mini Analytics Chart Placeholder */}
            <div style={{ 
              padding: "20px", 
              background: "rgba(109, 182, 255, 0.03)", 
              borderRadius: "20px", 
              border: "1px solid rgba(109, 182, 255, 0.1)",
              position: "relative",
              overflow: "hidden"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <span style={{ fontSize: "12px", fontWeight: 600, color: C.txtBright }}>Performance Velocity</span>
                <BarChart3 size={14} color={C.blue} />
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "40px" }}>
                {[30, 45, 35, 60, 80, 55, 90].map((h, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    transition={{ delay: i * 0.1, duration: 1 }}
                    style={{ flex: 1, background: i === 6 ? C.green : C.blue, borderRadius: "2px", opacity: i === 6 ? 1 : 0.4 }} 
                  />
                ))}
              </div>
            </div>

            {/* Floating Element: AI Content Sparkle */}
            <motion.div 
              animate={{ rotate: [0, 5, 0], y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                top: "-30px",
                right: "30px",
                background: "rgba(10, 12, 16, 0.6)",
                padding: "16px 24px",
                borderRadius: "20px",
                border: `1px solid rgba(172, 215, 145, 0.35)`,
                boxShadow: `0 20px 50px rgba(0,0,0,0.5), inset 0 0 15px rgba(172, 215, 145, 0.05)`,
                display: "flex",
                alignItems: "center",
                gap: "14px",
                zIndex: 3,
                backdropFilter: "blur(24px)"
              }}
            >
              <div style={{ position: "relative" }}>
                <Zap size={18} color={C.green} />
                <motion.div 
                  animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ position: "absolute", inset: -4, background: C.green, borderRadius: "50%", zIndex: -1, filter: "blur(8px)" }}
                />
              </div>
              <span style={{ fontSize: "12px", fontWeight: 700, color: C.txtBright }}>Engine: Active</span>
            </motion.div>
          </div>
        </motion.div>

      </div>

      <style jsx>{`
        .marketing-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(172, 215, 145, 0.3);
          background: #C1E9A7 !important;
        }
        @media (max-width: 1024px) {
          .marketing-showcase-grid {
            grid-template-columns: 1fr !important;
            gap: 60px !important;
            text-align: center;
          }
          .marketing-showcase-grid > div {
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
