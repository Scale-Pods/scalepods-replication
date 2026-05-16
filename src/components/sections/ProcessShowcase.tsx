"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Workflow, 
  Rocket, 
  TrendingUp,
  Cpu,
  Zap,
  Activity, 
  ArrowRight
} from "lucide-react";
import { useMobile } from "@/lib/hooks";

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

const lifecycleStages = [
  {
    id: "01",
    title: "Business Discovery",
    desc: "We dive deep into your operations to identify critical bottlenecks and hidden inefficiencies.",
    details: ["Operational Audit", "Bottleneck ID", "Data Mapping"],
    icon: Search,
    color: "#6DB6FF"
  },
  {
    id: "02",
    title: "AI Workflow Design",
    desc: "Engineering custom AI orchestration layers and deep-stack integrations.",
    details: ["System Architecture", "Logic Engineering", "API Strategy"],
    icon: Workflow,
    color: "#ACD791"
  },
  {
    id: "03",
    title: "Development & Deployment",
    desc: "Rapid implementation and production activation of autonomous agentic ecosystems.",
    details: ["Agent Training", "Stack Integration", "Live Activation"],
    icon: Rocket,
    color: "#6DB6FF"
  },
  {
    id: "04",
    title: "Optimisation & Scaling",
    desc: "Continuous performance tuning and infrastructure scaling for long-term leverage.",
    details: ["Impact Analytics", "Dynamic Scaling", "Logic Refinement"],
    icon: TrendingUp,
    color: "#ACD791"
  }
];

export const ProcessShowcase = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isMobile = useMobile(1024);

  return (
    <section 
      id="process-showcase"
      className="process-section"
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
        .process-section {
          padding: 64px 32px 72px;
        }
        @media (max-width: 1024px) {
          .process-section {
            padding: 40px 16px 56px;
          }
        }
      `}</style>
      {/* ── CINEMATIC ATMOSPHERIC BEAM ── */}
      <motion.div 
        animate={{ 
          opacity: [0.03, 0.08, 0.03],
          x: [-30, 30, -30]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "0%",
          left: "40%",
          width: "50%",
          height: "100%",
          background: `linear-gradient(180deg, transparent, ${C.green}0C, transparent)`,
          filter: "blur(80px)", // Reduced from 140px
          zIndex: 0,
          pointerEvents: "none",
          willChange: "transform, opacity"
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
              background: "rgba(172, 215, 145, 0.08)",
              border: `1px solid rgba(172, 215, 145, 0.15)`,
              borderRadius: "100px",
              marginBottom: "12px"
            }}
          >
            <Activity size={10} color={C.green} />
            <span style={{ 
              color: C.green, 
              fontSize: "10px", 
              fontWeight: 700, 
              textTransform: "uppercase", 
              letterSpacing: "0.15em" 
            }}>
              Operational Lifecycle
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
              marginBottom: "12px",
              letterSpacing: "-0.05em"
            }}
          >
            How We <span style={{ fontFamily: F.accent, fontStyle: "italic", fontWeight: 400, color: C.green }}>Deploy Intelligence</span>
          </motion.h2>
        </div>

        {/* 2x2 Orchestration Grid */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "1fr 1fr", 
          gap: "16px",
          position: "relative"
        }} className="lifecycle-grid">
          
          {/* Central AI Hub Visual */}
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60px",
            height: "60px",
            zIndex: 2,
            pointerEvents: "none"
          }} className="hidden lg:block">
             <motion.div
               animate={{ scale: [1, 1.1, 1], rotate: 360 }}
               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
               style={{
                 width: "100%",
                 height: "100%",
                 borderRadius: "50%",
                 background: "rgba(109, 182, 255, 0.03)",
                 border: "1px dashed rgba(109, 182, 255, 0.2)",
                 display: "flex",
                 alignItems: "center",
                 justifyContent: "center"
               }}
             >
               <Cpu size={20} color={C.blue} opacity={0.4} />
             </motion.div>
             <div style={{
               position: "absolute",
               inset: "-15px",
               background: "radial-gradient(circle, rgba(109,182,255,0.08) 0%, transparent 70%)",
               filter: "blur(15px)"
             }} />
          </div>

          {lifecycleStages.map((stage, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1 }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                background: "var(--color-glass-bg)",
                border: "1px solid var(--color-glass-border)",
                borderRadius: "24px",
                padding: "24px 32px",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                boxShadow: "var(--card-shadow), var(--card-shadow-inset)",
                transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)"
              }}
            >
              {/* Dynamic Glow Overlay */}
              <motion.div
                animate={{ 
                  opacity: hoveredIndex === i ? 1 : 0,
                  background: `radial-gradient(circle at 0% 0%, ${stage.color}15 0%, transparent 70%)`
                }}
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 0,
                  pointerEvents: "none"
                }}
              />

              <div style={{ position: "relative", zIndex: 1, display: "flex", gap: "24px", alignItems: "flex-start" }}>
                {/* Stage Indicator */}
                <div style={{ flexShrink: 0 }}>
                   <div style={{
                     width: "44px",
                     height: "44px",
                     borderRadius: "12px",
                     background: "rgba(255,255,255,0.02)",
                     border: "1px solid rgba(255,255,255,0.06)",
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "center",
                     color: hoveredIndex === i ? stage.color : C.txtBright,
                     transition: "all 0.4s ease"
                   }}>
                      <stage.icon size={18} />
                   </div>
                   <div style={{
                     marginTop: "10px",
                     fontSize: "11px",
                     fontWeight: 800,
                     fontFamily: "monospace",
                     color: stage.color,
                     opacity: 0.3,
                     textAlign: "center"
                   }}>
                     {stage.id}
                   </div>
                </div>

                <div style={{ flex: 1 }}>
                  <h3 style={{ 
                    fontSize: "18px", 
                    fontWeight: 700, 
                    color: C.txtBright, 
                    marginBottom: "8px",
                    letterSpacing: "-0.01em"
                  }}>
                    {stage.title}
                  </h3>
                  <p style={{ 
                    fontSize: "13px", 
                    color: C.txtBody, 
                    lineHeight: 1.5, 
                    marginBottom: "16px",
                    opacity: 0.7 
                  }}>
                    {stage.desc}
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {stage.details.map((detail, di) => (
                      <span 
                        key={di}
                        style={{
                          fontSize: "9px",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          padding: "3px 8px",
                          background: "rgba(255,255,255,0.02)",
                          border: "1px solid rgba(255,255,255,0.05)",
                          borderRadius: "100px",
                          color: hoveredIndex === i ? stage.color : C.txtBody,
                          transition: "all 0.3s ease"
                        }}
                      >
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ alignSelf: "center", opacity: hoveredIndex === i ? 1 : 0, transform: hoveredIndex === i ? "translateX(0)" : "translateX(-10px)", transition: "all 0.4s ease" }}>
                   <ArrowRight size={20} color={stage.color} />
                </div>
              </div>

              {/* Status Pulse */}
              {hoveredIndex === i && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    height: "2px",
                    background: `linear-gradient(90deg, transparent, ${stage.color}, transparent)`
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>

      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .lifecycle-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
