"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  TrendingUp, 
  Users, 
  Zap, 
  ShieldCheck, 
  ArrowUpRight,
  Activity,
  BarChart3,
  Clock
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
  accent: "'Instrument Serif', serif",
};

const G = {
  bg: "rgba(255, 255, 255, 0.015)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  blur: "blur(40px)",
};

// ── SUB-COMPONENT: ANIMATED COUNT UP ──
const CountUp = ({ end, prefix = "", suffix = "", decimals = 0 }: { end: number, prefix?: string, suffix?: string, decimals?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  return <span>{prefix}{count.toFixed(decimals)}{suffix}</span>;
};

const metrics = [
  {
    label: "Sales Growth",
    value: 3,
    suffix: "x",
    desc: "Increase in booked demos within 60 days.",
    icon: TrendingUp,
    color: C.blue
  },
  {
    label: "Recruitment Speed",
    value: 50,
    suffix: "%",
    desc: "Reduction in average time-to-hire velocity.",
    icon: Users,
    color: C.green
  },
  {
    label: "Operational Manual Effort",
    value: 70,
    suffix: "%",
    desc: "Reduction in repetitive departmental tasks.",
    icon: Zap,
    color: C.blue
  },
  {
    label: "System Availability",
    value: 24,
    suffix: "/7",
    desc: "Autonomous AI operations without human oversight.",
    icon: ShieldCheck,
    color: C.green
  }
];

export const ImpactShowcase = () => {
  return (
    <section 
      id="impact-metrics"
      style={{ 
        padding: "40px 32px",
        position: "relative",
        overflow: "hidden",
        background: "transparent",
        minHeight: "auto",
        display: "flex",
        alignItems: "center"
      }}
    >
      {/* ── CINEMATIC AMBIENT INFRASTRUCTURE ── */}
      <motion.div 
        animate={{ 
          opacity: [0.03, 0.05, 0.03],
          y: [-20, 20, -20]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "0%",
          right: "10%",
          width: "50%",
          height: "100%",
          background: `linear-gradient(180deg, transparent, ${C.green}08, transparent)`,
          filter: "blur(120px)",
          zIndex: 0,
          pointerEvents: "none"
        }} 
      />

      <div style={{
        maxWidth: "1280px",
        margin: "0 auto",
        position: "relative",
        zIndex: 1
      }}>
        
        {/* Header Section */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 12px",
              background: "rgba(172, 215, 145, 0.08)",
              border: `1px solid rgba(172, 215, 145, 0.15)`,
              borderRadius: "100px",
              marginBottom: "16px"
            }}
          >
            <BarChart3 size={10} color={C.green} />
            <span style={{ 
              color: C.green, 
              fontSize: "10px", 
              fontWeight: 700, 
              textTransform: "uppercase", 
              letterSpacing: "0.1em" 
            }}>
              Transformation Dashboard
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: F.inter,
              fontSize: "clamp(30px, 3.8vw, 44px)",
              fontWeight: 800,
              color: C.txtBright,
              lineHeight: 1,
              marginBottom: "16px",
              letterSpacing: "-0.05em"
            }}
          >
            Measurable <span style={{ fontFamily: F.accent, fontStyle: "italic", fontWeight: 400, color: C.green }}>Business Impact</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{
              fontSize: "16px",
              color: C.txtBody,
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.6,
              opacity: 0.8
            }}
          >
            ScalePods isn’t just about automation—it’s about outcomes. Our AI Operating System 
            delivers clear, quantifiable growth across every core business department.
          </motion.p>
        </div>

        {/* Metrics Grid */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(4, 1fr)", 
          gap: "24px" 
        }} className="impact-grid">
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
              whileHover={{ y: -5 }}
              style={{
                background: G.bg,
                border: G.border,
                borderRadius: "24px",
                padding: "24px",
                backdropFilter: G.blur,
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
              }}
            >
              {/* Subtle background glow based on metric color */}
              <div style={{
                position: "absolute",
                top: "-20%",
                right: "-20%",
                width: "60%",
                height: "60%",
                background: `radial-gradient(circle at center, ${m.color}08 0%, transparent 70%)`,
                filter: "blur(40px)",
                zIndex: 0
              }} />

              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ 
                  width: "36px", 
                  height: "36px", 
                  borderRadius: "10px", 
                  background: `${m.color}0D`, 
                  border: `1px solid ${m.color}1A`,
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  marginBottom: "16px"
                }}>
                  <m.icon size={18} color={m.color} />
                </div>

                <div style={{ display: "flex", alignItems: "baseline", gap: "2px", marginBottom: "4px" }}>
                  <h3 style={{ fontSize: "32px", fontWeight: 800, color: C.txtBright, margin: 0, letterSpacing: "-0.02em" }}>
                    <CountUp end={m.value} suffix={m.suffix} />
                  </h3>
                </div>

                <div style={{ fontSize: "12px", fontWeight: 700, color: m.color, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>
                  {m.label}
                </div>

                <p style={{ fontSize: "12px", color: C.txtBody, lineHeight: 1.4, margin: 0, opacity: 0.7 }}>
                  {m.desc}
                </p>

                {/* Trend indicator */}
                <div style={{ 
                  marginTop: "16px", 
                  paddingTop: "16px", 
                  borderTop: "1px solid rgba(255,255,255,0.04)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <ArrowUpRight size={12} color={C.green} />
                    <span style={{ fontSize: "10px", fontWeight: 700, color: C.green }}>Optimized</span>
                  </div>
                  <div style={{ fontSize: "9px", color: C.txtBody, opacity: 0.4 }}>Real-time Data</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Secondary Dashboard Row */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "1.4fr 1fr", 
          gap: "24px",
          marginTop: "24px" 
        }} className="impact-secondary-grid">
          
          {/* Live Performance Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            style={{
              background: G.bg,
              border: `1px solid ${C.blue}22`,
              borderRadius: "24px",
              padding: "20px 24px",
              backdropFilter: G.blur,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <Activity size={16} color={C.blue} />
                <span style={{ fontSize: "13px", fontWeight: 800, color: C.txtBright }}>Real-time Response Velocity</span>
              </div>
              <p style={{ fontSize: "12px", color: C.txtBody, opacity: 0.7, maxWidth: "340px", margin: 0 }}>
                Average AI response time across unified omnichannel support channels.
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "32px", fontWeight: 800, color: C.blue, lineHeight: 1 }}>0.4<span style={{ fontSize: "16px" }}>s</span></div>
              <div style={{ fontSize: "9px", fontWeight: 800, color: C.green, textTransform: "uppercase", marginTop: "2px" }}>Instant Resolution</div>
            </div>
          </motion.div>

          {/* Efficiency Score */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            style={{
              background: G.bg,
              border: G.border,
              borderRadius: "24px",
              padding: "20px 24px",
              backdropFilter: G.blur,
              display: "flex",
              alignItems: "center",
              gap: "20px"
            }}
          >
            <div style={{ 
              width: "48px", 
              height: "48px", 
              borderRadius: "50%", 
              border: `2px solid ${C.green}33`, 
              borderTopColor: C.green,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <span style={{ fontSize: "14px", fontWeight: 800, color: C.txtBright }}>98<span style={{ fontSize: "9px" }}>%</span></span>
            </div>
            <div>
              <div style={{ fontSize: "13px", fontWeight: 800, color: C.txtBright }}>Automation Accuracy</div>
              <div style={{ fontSize: "11px", color: C.txtBody, opacity: 0.7 }}>Validated cross-platform workflow success rate.</div>
            </div>
          </motion.div>
        </div>

      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .impact-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .impact-secondary-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .impact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
