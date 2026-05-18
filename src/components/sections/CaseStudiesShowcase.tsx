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
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import { useMobile } from "@/lib/hooks";
import { useTheme } from "@/components/providers/ThemeProvider";

const C = {
  green: "var(--color-green)",
  blue: "var(--color-blue-mid)",
  txtBright: "var(--color-text-bright)",
  txtBody: "var(--color-text-body)",
  border: "var(--color-border)",
  bgCard: "var(--color-bg-card)",
};

const F = {
  inter: "var(--font-inter), Inter, sans-serif",
  accent: "var(--font-instrument), serif",
};

const G = {
  bg: "var(--color-glass-bg)",
  border: "1px solid var(--color-glass-border)",
  blur: "blur(16px)", 
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
  const { resolvedTheme } = useTheme();

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
          padding: 48px 32px 56px;
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
          opacity: resolvedTheme === 'dark' ? [0.03, 0.08, 0.03] : [0.02, 0.05, 0.02],
          x: [20, -20, 20]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "0%",
          right: "20%",
          width: "60%",
          height: "100%",
          background: resolvedTheme === 'dark' 
            ? `radial-gradient(ellipse at center, rgba(var(--color-green-rgb), 0.06) 0%, transparent 70%)`
            : `radial-gradient(ellipse at center, rgba(var(--color-green-rgb), 0.03) 0%, transparent 70%)`,
          filter: "blur(60px)",
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
              transition={{ delay: 0.1 + i * 0.1 }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                background: "var(--color-glass-bg)",
                border: "1px solid var(--color-glass-border)",
                borderRadius: "20px",
                padding: "20px",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                boxShadow: "var(--card-shadow), var(--card-shadow-inset)",
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
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                   <div style={{ 
                     width: "32px", 
                     height: "32px", 
                     borderRadius: "8px", 
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
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: C.txtBright, marginBottom: "14px", lineHeight: 1.2 }}>{cs.title}</h3>

                <div style={{ 
                  background: "rgba(var(--color-text-bright-rgb), 0.03)", 
                  borderRadius: "14px", 
                  padding: "14px", 
                  border: "1px solid var(--color-border-faint)",
                  boxShadow: "var(--internal-shadow-inset)",
                  marginBottom: "16px"
                }}>
                  <div style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginBottom: "10px" }}>
                    <div style={{ width: "2px", height: "14px", background: "#FF5F5F", borderRadius: "2px", marginTop: "2px" }} />
                    <div>
                      <div style={{ fontSize: "10px", color: "#FF5F5F", fontWeight: 700, textTransform: "uppercase", marginBottom: "2px" }}>The Bottleneck</div>
                      <p style={{ fontSize: "12px", color: C.txtBody, lineHeight: 1.4, margin: 0, opacity: 0.7 }}>{cs.problem}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
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
                  paddingTop: "14px",
                  borderTop: "1px solid rgba(255,255,255,0.05)"
                }}>
                   <div>
                      <div style={{ fontSize: "9px", color: C.txtBody, opacity: 0.4, textTransform: "uppercase", marginBottom: "2px" }}>Workflow Impact</div>
                      <div style={{ fontSize: "20px", fontWeight: 800, color: C.txtBright, lineHeight: 1.1 }}>{cs.impact}</div>
                   </div>

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
