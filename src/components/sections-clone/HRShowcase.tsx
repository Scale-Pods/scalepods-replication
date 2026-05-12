"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Search, 
  Calendar, 
  MessageSquare, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Layers,
  Zap,
  Filter
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
    title: "Autonomous Sourcing", 
    desc: "AI identifies top 1% talent across global platforms 24/7.",
    icon: <Search size={16} /> 
  },
  { 
    title: "AI Resume Scoring", 
    desc: "Instant candidate ranking based on technical ICP match.",
    icon: <Filter size={16} /> 
  },
  { 
    title: "Smart Scheduling", 
    desc: "Zero-friction interview booking with auto-calendar sync.",
    icon: <Calendar size={16} /> 
  },
  { 
    title: "WhatsApp Engagement", 
    desc: "Automated candidate nurturing and screening via chat.",
    icon: <MessageSquare size={16} /> 
  },
];

export const HRShowcase = () => {
  return (
    <section 
      id="hr-section"
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
          x: [30, -30, 30],
          opacity: [0.04, 0.08, 0.04]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "-30%",
          right: "5%",
          width: "90%",
          height: "160%",
          background: `linear-gradient(245deg, transparent 15%, ${C.green}20 50%, transparent 85%)`,
          filter: "blur(140px)",
          zIndex: 0,
          pointerEvents: "none",
          transform: "rotate(12deg)"
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
      }} className="hr-showcase-grid">
        
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
            background: "rgba(109, 182, 255, 0.08)",
            border: `1px solid rgba(109, 182, 255, 0.15)`,
            borderRadius: "100px",
            marginBottom: "20px"
          }}>
            <Users size={10} color={C.blue} />
            <span style={{ 
              color: C.blue, 
              fontSize: "10px", 
              fontWeight: 700, 
              textTransform: "uppercase", 
              letterSpacing: "0.1em" 
            }}>
              Recruitment Intelligence
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
            HR Automation / <span style={{ fontFamily: F.accent, fontStyle: "italic", fontWeight: 400, color: C.green }}>Hiring OS</span>
          </h2>

          <div style={{ marginBottom: "24px" }}>
            <p style={{
              fontSize: "16px",
              color: C.txtBright,
              fontWeight: 600,
              marginBottom: "8px",
              opacity: 0.95
            }}>
              Scale your team without the recruiter burnout.
            </p>
            <p style={{
              fontSize: "14px",
              color: C.txtBody,
              lineHeight: 1.6,
              opacity: 0.8
            }}>
              ScalePods transforms recruitment from a manual grind into an autonomous pipeline. 
              Identify, screen, and schedule top talent <span style={{ color: C.green, fontWeight: 700 }}> 5x faster </span> 
              while maintaining a premium candidate experience.
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
          className="hr-cta"
          >
            Deploy Hiring OS <ArrowRight size={18} />
          </button>
        </motion.div>

        {/* Right Side: High-Fidelity HR Dashboard */}
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
              top: 0, left: "15%", right: "15%",
              height: "1px",
              background: `linear-gradient(90deg, transparent, rgba(109, 182, 255, 0.3), transparent)`,
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
                <h3 style={{ color: C.txtBright, fontSize: "18px", fontWeight: 700, margin: 0 }}>Hiring Pipeline</h3>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "4px" }}>
                  <div style={{ width: "6px", height: "6px", background: C.blue, borderRadius: "50%", boxShadow: `0 0 10px ${C.blue}` }} />
                  <p style={{ color: C.txtBody, fontSize: "12px", margin: 0, opacity: 0.6 }}>AI Screening: Autonomous</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "8px", padding: "6px 12px", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <span style={{ color: C.txtBright, fontSize: "11px", fontWeight: 600 }}>12 Active Roles</span>
                </div>
              </div>
            </div>

            {/* Visual Pipeline Stages */}
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(4, 1fr)", 
              gap: "8px", 
              marginBottom: "32px",
              padding: "4px",
              background: "rgba(255,255,255,0.03)",
              borderRadius: "12px"
            }}>
              {["Sourcing", "Screening", "Interview", "Offer"].map((stage, i) => (
                <div key={i} style={{ 
                  textAlign: "center", 
                  padding: "10px 4px",
                  borderRadius: "8px",
                  background: i <= 1 ? "rgba(109, 182, 255, 0.15)" : "transparent",
                  border: i <= 1 ? `1px solid rgba(109, 182, 255, 0.2)` : "none"
                }}>
                  <div style={{ fontSize: "10px", fontWeight: 700, color: i <= 1 ? C.blue : C.txtBody, textTransform: "uppercase", opacity: i <= 1 ? 1 : 0.4 }}>{stage}</div>
                  <div style={{ fontSize: "14px", fontWeight: 800, color: C.txtBright, marginTop: "2px" }}>{i === 0 ? "248" : i === 1 ? "42" : i === 2 ? "12" : "3"}</div>
                </div>
              ))}
            </div>

            {/* Candidate Intelligence Feed */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { name: "Alex Rivet", role: "Senior Engineer", score: "98%", status: "AI Screened" },
                { name: "Elena K.", role: "Product Lead", score: "94%", status: "Interviewing" },
                { name: "Marcus T.", role: "Growth Lead", score: "89%", status: "AI Sourced" },
              ].map((cand, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ x: 4, background: "rgba(255,255,255,0.03)" }}
                  style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "space-between",
                    padding: "14px 20px",
                    background: "rgba(255,255,255,0.015)",
                    borderRadius: "16px",
                    border: "1px solid rgba(255,255,255,0.04)",
                    backdropFilter: "blur(4px)",
                    transition: "all 0.3s ease"
                  }}
                >
                  <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Users size={16} color={C.blue} style={{ margin: "auto" }} />
                    </div>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: 600, color: C.txtBright }}>{cand.name}</div>
                      <div style={{ fontSize: "11px", color: C.txtBody, opacity: 0.6 }}>{cand.role}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", justifyContent: "flex-end" }}>
                      <ShieldCheck size={12} color={C.green} />
                      <span style={{ fontSize: "12px", fontWeight: 800, color: C.green }}>{cand.score} Match</span>
                    </div>
                    <div style={{ fontSize: "10px", color: C.txtBody, opacity: 0.4, marginTop: "2px" }}>{cand.status}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Floating Element: Automation Engine */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                top: "-35px",
                left: "-15px",
                background: "rgba(10, 12, 16, 0.4)",
                padding: "16px 24px",
                borderRadius: "20px",
                border: `1px solid rgba(109, 182, 255, 0.3)`,
                boxShadow: `0 20px 50px rgba(0,0,0,0.5), inset 0 0 15px rgba(109, 182, 255, 0.05)`,
                display: "flex",
                alignItems: "center",
                gap: "14px",
                zIndex: 3,
                backdropFilter: "blur(24px)"
              }}
            >
              <div style={{ position: "relative" }}>
                <Layers size={18} color={C.blue} />
                <motion.div 
                  animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ position: "absolute", inset: -4, background: C.blue, borderRadius: "50%", zIndex: -1, filter: "blur(8px)" }}
                />
              </div>
              <span style={{ fontSize: "12px", fontWeight: 700, color: C.txtBright }}>Workflow Active</span>
            </motion.div>
          </div>
        </motion.div>

      </div>

      <style jsx>{`
        .hr-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(172, 215, 145, 0.3);
          background: #C1E9A7 !important;
        }
        @media (max-width: 1024px) {
          .hr-showcase-grid {
            grid-template-columns: 1fr !important;
            gap: 60px !important;
            text-align: center;
          }
          .hr-showcase-grid > div {
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
