"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Shield, 
  Layers, 
  Cpu, 
  Workflow, 
  Globe, 
  Zap, 
  Users, 
  BarChart,
  CheckCircle2,
  Activity
} from "lucide-react";
import { useMobile } from "@/lib/hooks";
import { useTheme } from "@/components/providers/ThemeProvider";

import { BrandsMarquee } from "./Sections";

const C = {
  green: "var(--color-green)",
  greenBright: "var(--color-green)",
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

const differentiators = [
  {
    title: "AI-Native OS",
    desc: "Built as modular infrastructure, not just a set of disconnected automation scripts.",
    icon: <Cpu size={18} />,
    color: "var(--color-blue-mid)"
  },
  {
    title: "End-to-End Ownership",
    desc: "We engineer, deploy, and manage the entire workflow lifecycle with human oversight.",
    icon: <Shield size={18} />,
    color: "var(--color-green)"
  },
  {
    title: "Custom Architecture",
    desc: "Workflows engineered around your specific operational DNA and legacy tech stack.",
    icon: <Workflow size={18} />,
    color: "var(--color-blue-mid)"
  },
  {
    title: "Omnichannel Sync",
    desc: "Seamless synchronization across WhatsApp, Email, CRM, and internal databases.",
    icon: <Globe size={18} />,
    color: "var(--color-green)"
  },
  {
    title: "Modular Scaling",
    desc: "Infrastructure designed to expand with your volume without linear cost increases.",
    icon: <Layers size={18} />,
    color: "var(--color-blue-mid)"
  },
  {
    title: "Human-in-the-Loop",
    desc: "Advanced AI orchestration paired with expert supervision for 100% reliability.",
    icon: <Users size={18} />,
    color: "var(--color-green)"
  }
];

export const WhyChooseShowcase = () => {
  const isMobile = useMobile(768);
  const { resolvedTheme } = useTheme();

  return (
    <section 
      id="why-choose"
      className="why-choose-section"
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
        .why-choose-section {
          padding: 64px 32px 72px;
        }
        @media (max-width: 768px) {
          .why-choose-section {
            padding: 40px 16px 56px;
          }
        }
      `}</style>
      {/* ── CINEMATIC AMBIENT INFRASTRUCTURE — dark mode only ── */}
      <motion.div 
        className="glow-ambient"
        animate={{ 
          opacity: [0.03, 0.06, 0.03],
          x: [-10, 10, -10]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "0%",
          left: "20%",
          width: "40%",
          height: "100%",
          background: `linear-gradient(90deg, transparent, rgba(var(--color-green-rgb), 0.04), transparent)`,
          filter: "blur(80px)",
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
        
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 12px",
              background: "var(--color-glass-bg)", backdropFilter: "blur(16px)",
              border: `1px solid var(--color-border)`,
              borderRadius: "100px",
              marginBottom: "12px"
            }}
          >
            <Zap size={10} color={C.green} />
            <span style={{ 
              color: C.green, 
              fontSize: "10px", 
              fontWeight: 700, 
              textTransform: "uppercase", 
              letterSpacing: "0.1em" 
            }}>
              Enterprise Differentiation
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: F.inter,
              fontSize: "clamp(30px, 3.8vw, 44px)",
              fontWeight: 800,
              color: C.txtBright,
              lineHeight: 1,
              marginBottom: "10px",
              letterSpacing: "-0.05em"
            }}
          >
            Why Businesses <span style={{ fontFamily: F.accent, fontStyle: "italic", fontWeight: 400, color: C.green }}>Choose ScalePods</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{
              fontSize: "14px",
              color: C.txtBody,
              maxWidth: "580px",
              margin: "0 auto",
              lineHeight: 1.5,
              opacity: 0.8
            }}
          >
            More than an automation agency—we build the operational infrastructure 
            that powers the next generation of scalable, AI-native businesses.
          </motion.p>
        </div>

        {/* Modular Grid */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(3, 1fr)", 
          gap: "16px" 
        }} className="why-grid">
          {differentiators.map((d, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.05 }}
              whileHover={{ y: -4, background: "var(--color-glass-bg)", backdropFilter: "blur(16px)" }}
              style={{
                background: "var(--color-glass-bg)",
                border: "1px solid var(--color-glass-border)",
                borderRadius: "20px",
                padding: "20px",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                position: "relative",
                overflow: "hidden",
                boxShadow: "var(--card-shadow), var(--card-shadow-inset)",
                transition: "all 0.3s ease"
              }}
            >
              <div style={{ 
                width: "32px", 
                height: "32px", 
                borderRadius: "8px", 
                background: resolvedTheme === 'dark' ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)", 
                border: `1px solid var(--color-border)`,
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                marginBottom: "12px",
                color: d.color
              }}>
                {d.icon}
              </div>

              <h3 style={{ fontSize: "15px", fontWeight: 700, color: C.txtBright, marginBottom: "8px" }}>
                {d.title}
              </h3>

              <p style={{ fontSize: "12px", color: C.txtBody, lineHeight: 1.4, margin: 0, opacity: 0.6 }}>
                {d.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* NEW: Trust Line & Animated Logo Marquee */}
        <div style={{ marginTop: "40px", width: "100%", overflow: "hidden" }}>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.9 }}
            viewport={{ once: true }}
            style={{
              fontFamily: F.inter,
              fontSize: "16px",
              color: C.txtBright,
              textAlign: "center",
              marginBottom: "32px",
              fontWeight: 700,
              letterSpacing: "-0.01em"
            }}
          >
            Trusted by thousands of companies and investors all over the world
          </motion.p>

          <BrandsMarquee />
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .why-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .why-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
