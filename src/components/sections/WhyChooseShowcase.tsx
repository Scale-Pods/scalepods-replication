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
  CheckCircle2
} from "lucide-react";

// Curated set of brand logos from the main landing page
const marqueeLogos = [
  { name: "Passionfruit", url: "/brands/passsionfruit.avif", isBlack: true },
  { name: "PropertyGeld", url: "/brands/propertygeld.png", isBlack: true },
  { name: "ZV Steels", url: "/brands/zv_steels_logo.webp", isBlack: true },
  { name: "Lotus Manor", url: "/brands/lotus-manor.webp", isBlack: true },
  { name: "BECO", url: "/brands/BECO.avif" },
  { name: "Gammacode", url: "/brands/gammacode.webp", isBlack: true },
  { name: "Krafty", url: "/brands/krafty-logo-white.png" },
  { name: "HobbyFi", url: "/brands/hobbyfi_logo.jpg", whiteBg: true },
  { name: "Break The Code", url: "/brands/Break-the-code.avif", whiteBg: true },
];

const LogoMarquee = () => {
  const [isPaused, setIsPaused] = React.useState(false);

  return (
    <div 
      style={{ 
        display: "flex", 
        width: "max-content",
        gap: "80px",
        padding: "10px 0"
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        animate={{ x: isPaused ? 0 : ["0%", "-50%"] }}
        transition={{ 
          x: {
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }
        }}
        style={{ 
          display: "flex", 
          gap: "80px",
          width: "max-content",
          alignItems: "center"
        }}
      >
        {[...marqueeLogos, ...marqueeLogos].map((logo, idx) => (
          <motion.div
            key={idx}
            style={{
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              filter: logo.whiteBg ? "grayscale(100%) invert(1) brightness(200%)" : "brightness(0) invert(1)",
              opacity: 0.5,
              transition: "all 0.4s ease",
              mixBlendMode: logo.whiteBg ? "screen" : "normal",
            }}
            whileHover={{ 
              filter: logo.isBlack ? "invert(1) brightness(200%)" : "none",
              opacity: 1,
              scale: 1.08,
              y: -4
            }}
          >
            <img 
              src={logo.url} 
              alt={logo.name} 
              style={{ 
                height: "100%", 
                width: "auto", 
                maxWidth: "180px",
                objectFit: "contain"
              }} 
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

const C = {
  green: "#ACD791",
  greenBright: "#8DC763",
  blue: "#6DB6FF",
  txtBright: "#E4E9F2",
  txtBody: "#B8C7D9",
  border: "rgba(255,255,255,0.06)",
  bgCard: "rgba(255, 255, 255, 0.015)",
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

const differentiators = [
  {
    title: "AI-Native OS",
    desc: "Built as modular infrastructure, not just a set of disconnected automation scripts.",
    icon: <Cpu size={18} />,
    color: "#6DB6FF"
  },
  {
    title: "End-to-End Ownership",
    desc: "We engineer, deploy, and manage the entire workflow lifecycle with human oversight.",
    icon: <Shield size={18} />,
    color: "#ACD791"
  },
  {
    title: "Custom Architecture",
    desc: "Workflows engineered around your specific operational DNA and legacy tech stack.",
    icon: <Workflow size={18} />,
    color: "#6DB6FF"
  },
  {
    title: "Omnichannel Sync",
    desc: "Seamless synchronization across WhatsApp, Email, CRM, and internal databases.",
    icon: <Globe size={18} />,
    color: "#ACD791"
  },
  {
    title: "Modular Scaling",
    desc: "Infrastructure designed to expand with your volume without linear cost increases.",
    icon: <Layers size={18} />,
    color: "#6DB6FF"
  },
  {
    title: "Human-in-the-Loop",
    desc: "Advanced AI orchestration paired with expert supervision for 100% reliability.",
    icon: <Users size={18} />,
    color: "#ACD791"
  }
];

export const WhyChooseShowcase = () => {
  return (
    <section 
      id="why-scalepods"
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
          background: `linear-gradient(90deg, transparent, ${C.green}0A, transparent)`,
          filter: "blur(100px)",
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
              background: "rgba(255, 255, 255, 0.03)",
              border: `1px solid rgba(255, 255, 255, 0.08)`,
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
              whileHover={{ y: -4, background: "rgba(255, 255, 255, 0.025)" }}
              style={{
                background: G.bg,
                border: G.border,
                borderRadius: "20px",
                padding: "20px",
                backdropFilter: G.blur,
                transition: "all 0.3s ease"
              }}
            >
              <div style={{ 
                width: "32px", 
                height: "32px", 
                borderRadius: "8px", 
                background: `${d.color}0D`, 
                border: `1px solid ${d.color}1A`,
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

          <div 
            style={{ 
              position: "relative",
              width: "100%",
              height: "80px",
              display: "flex",
              alignItems: "center"
            }}
          >
            <LogoMarquee />
          </div>
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
          .trust-footer {
            justifyContent: center !important;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
};
