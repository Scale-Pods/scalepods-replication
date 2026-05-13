"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  TrendingUp, 
  Zap, 
  Target, 
  MessageCircle, 
  Layout,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import { useMobile } from "@/lib/hooks";

const F = {
  inter: "Inter, sans-serif",
  accent: "'Instrument Serif', serif",
};

const G = {
  bg: "rgba(255, 255, 255, 0.015)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  blur: "blur(12px)", // Reduced from 40px for better mobile performance
};

const C = {
  green: "#ACD791",
  blue: "#6DB6FF",
  txtBright: "#E4E9F2",
  txtBody: "#B8C7D9",
  border: "rgba(255,255,255,0.06)",
  bgCard: "rgba(255, 255, 255, 0.012)",
};

const caseStudies = [
  {
    title: "AI Sales Engine",
    client: "B2B SaaS Provider",
    problem: "Manual lead follow-up & low demo booking rate.",
    impact: "3.2x Demos",
    outcome: "Autonomous lead outreach & booking sync.",
    icon: <Target size={18} color={C.blue} />,
    tags: ["Sales", "Automation"]
  },
  {
    title: "HR Ops Scaling",
    client: "Logistics Enterprise",
    problem: "High volume hiring bottlenecks & data silos.",
    impact: "55% Faster",
    outcome: "AI screening & interview orchestration.",
    icon: <Users size={18} color={C.green} />,
    tags: ["HR", "Efficiency"]
  },
  {
    title: "Support Autonomy",
    client: "Retail Group",
    problem: "Overloaded human support & slow response.",
    impact: "0.4s Velocity",
    outcome: "Omnichannel AI conversational support.",
    icon: <MessageCircle size={18} color={C.blue} />,
    tags: ["Support", "Scaling"]
  }
];

export const CaseStudiesShowcase = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isMobile = useMobile(1024);

  return (
    <section 
      id="case-studies"
      className="case-studies-section"
      style={{ 
        position: "relative",
        overflow: "hidden",
        background: "transparent",
        minHeight: "auto",
        display: "flex",
        alignItems: "center"
      }}
    >
      <style jsx>{`
        .case-studies-section {
          padding: 64px 32px 72px;
        }
        @media (max-width: 1024px) {
          .case-studies-section {
            padding: 40px 16px 56px;
          }
        }
      `}</style>
      {/* ── CINEMATIC AMBIENT BEAM ── */}
      <motion.div 
        animate={{ 
          opacity: [0.04, 0.1, 0.04],
          x: [20, -20, 20]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "0%",
          right: "30%",
          width: "50%",
          height: "100%",
          background: `linear-gradient(180deg, transparent, ${C.green}0A, transparent)`,
          filter: "blur(80px)", // Reduced from 150px
          zIndex: 0,
          pointerEvents: "none"
        }} 
      />

      <div style={{
        maxWidth: "1280px",
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
        width: "100%"
      }}>
        
        {/* Header Section */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              background: "rgba(109, 182, 255, 0.08)",
              border: `1px solid rgba(109, 182, 255, 0.15)`,
              borderRadius: "100px",
              marginBottom: "12px"
            }}
          >
            <ShieldCheck size={10} color={C.blue} />
            <span style={{ 
              color: C.blue, 
              fontSize: "10px", 
              fontWeight: 700, 
              textTransform: "uppercase", 
              letterSpacing: "0.15em" 
            }}>
              Operational Proof
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: F.inter,
              fontSize: "clamp(30px, 4vw, 44px)",
              fontWeight: 800,
              color: C.txtBright,
              lineHeight: 1,
              marginBottom: "10px",
              letterSpacing: "-0.05em"
            }}
          >
            Success <span style={{ fontFamily: F.accent, fontStyle: "italic", fontWeight: 400, color: C.green }}>Transformations</span>
          </motion.h2>
        </div>

        {/* Modular Grid */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(3, 1fr)", 
          gap: "16px" 
        }} className="case-grid">
          {caseStudies.map((cs, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1 }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                background: G.bg,
                border: G.border,
                borderRadius: "24px",
                padding: "24px",
                backdropFilter: "blur(12px)", // Standardized mobile blur
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                transition: "all 0.5s ease"
              }}
            >
              {/* Active Hover Glow */}
              <motion.div 
                animate={{ opacity: hoveredIndex === i ? 1 : 0 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `radial-gradient(circle at 100% 100%, ${i % 2 === 0 ? C.blue : C.green}08, transparent 70%)`,
                  zIndex: 0,
                  pointerEvents: "none"
                }}
              />

              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                   <div style={{ 
                     width: "36px", 
                     height: "36px", 
                     borderRadius: "10px", 
                     background: "rgba(255,255,255,0.03)", 
                     border: "1px solid rgba(255,255,255,0.06)",
                     display: "flex", 
                     alignItems: "center", 
                     justifyContent: "center" 
                   }}>
                     {cs.icon}
                   </div>
                   <div style={{ display: "flex", gap: "6px" }}>
                      {cs.tags.map((tag, ti) => (
                        <span key={ti} style={{ fontSize: "9px", fontWeight: 700, color: C.txtBody, opacity: 0.4, textTransform: "uppercase", letterSpacing: "0.05em" }}>{tag}</span>
                      ))}
                   </div>
                </div>

                <div style={{ fontSize: "11px", fontWeight: 700, color: C.blue, opacity: 0.7, marginBottom: "4px" }}>{cs.client}</div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: C.txtBright, marginBottom: "16px" }}>{cs.title}</h3>

                <div style={{ 
                  background: "rgba(0,0,0,0.2)", 
                  borderRadius: "16px", 
                  padding: "16px", 
                  border: "1px solid rgba(255,255,255,0.03)",
                  marginBottom: "20px"
                }}>
                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: "12px" }}>
                    <div style={{ width: "2px", height: "14px", background: "#FF5F5F", borderRadius: "2px", marginTop: "2px" }} />
                    <div>
                      <div style={{ fontSize: "10px", color: "#FF5F5F", fontWeight: 700, textTransform: "uppercase", marginBottom: "2px" }}>The Bottleneck</div>
                      <p style={{ fontSize: "12px", color: C.txtBody, lineHeight: 1.4, margin: 0, opacity: 0.7 }}>{cs.problem}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <div style={{ width: "2px", height: "14px", background: C.green, borderRadius: "2px", marginTop: "2px" }} />
                    <div>
                      <div style={{ fontSize: "10px", color: C.green, fontWeight: 700, textTransform: "uppercase", marginBottom: "2px" }}>AI Transformation</div>
                      <p style={{ fontSize: "12px", color: C.txtBody, lineHeight: 1.4, margin: 0, opacity: 0.7 }}>{cs.outcome}</p>
                    </div>
                  </div>
                </div>

                {/* Metric Footer */}
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "space-between",
                  paddingTop: "16px",
                  borderTop: "1px solid rgba(255,255,255,0.05)"
                }}>
                   <div>
                      <div style={{ fontSize: "9px", color: C.txtBody, opacity: 0.4, textTransform: "uppercase", marginBottom: "2px" }}>Workflow Impact</div>
                      <div style={{ fontSize: "20px", fontWeight: 800, color: C.txtBright }}>{cs.impact}</div>
                   </div>
                   <motion.div 
                     animate={{ x: hoveredIndex === i ? 4 : 0 }}
                     style={{ 
                       width: "32px", 
                       height: "32px", 
                       borderRadius: "50%", 
                       background: "rgba(255,255,255,0.03)", 
                       display: "flex", 
                       alignItems: "center", 
                       justifyContent: "center",
                       color: hoveredIndex === i ? C.green : C.txtBody
                     }}
                   >
                     <ArrowRight size={14} />
                   </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .case-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .case-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
