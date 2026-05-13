"use client";

import React from "react";
import { motion } from "framer-motion";
import { ThreeDCarousel } from "@/components/lightswind/3d-carousel";
import { ChevronRight, ArrowRight, Zap, Users, Settings, PenTool, Layers } from "lucide-react";
import Link from "next/link";
import { useMobile } from "@/lib/hooks";

const C = {
  green: "#ACD791",
  greenBright: "#8DC763",
  blue: "#6DB6FF",
  txtBright: "#E4E9F2",
  txtBody: "#B8C7D9",
  border: "rgba(255,255,255,0.08)",
  bgCard: "rgba(8, 10, 14, 0.6)",
};

const F = {
  inter: "Inter, sans-serif",
  serif: "Instrument Serif, Georgia, serif",
  accent: "'Instrument Serif', serif",
};

const G = {
  bg: "rgba(255, 255, 255, 0.015)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  blur: "blur(12px)", 
};

const features = [
  { id: "sales-pod-showcase", title: "Sales Automation", desc: "Automated lead scraping & outreach.", outcome: "3x More Booked Demos", icon: <Zap size={14} /> },
  { id: "hr-section", title: "HR Automation", desc: "AI screening & instant shortlists.", outcome: "50% Faster Time-to-Hire", icon: <Users size={14} /> },
  { id: "ops-section", title: "Ops Automation", desc: "24/7 AI agents for order flows.", outcome: "70% Less Manual Follow-up", icon: <Settings size={14} /> },
  { id: "marketing-section", title: "Marketing Automation", desc: "AI content & auto-scheduling.", outcome: "Scalable Content Engine", icon: <PenTool size={14} /> },
  { id: "custom-workflows", title: "Custom Workflows", desc: "Tailored AI operational systems.", outcome: "Full Process Autonomy", icon: <Layers size={14} /> },
];

const ringImages = [
  { id: 1, title: "Audit Checker", description: "AI-powered document validation & procurement auditing.", imageUrl: "/images/carousel/audit-checker.png" },
  { id: 2, title: "Expense Tracker", description: "Interactive financial analytics & invoicing system.", imageUrl: "/images/carousel/expense-tracker.png" },
  { id: 3, title: "Marketing Automation", description: "Automated multi-channel outreach workflows.", imageUrl: "/images/carousel/marketing-tool.png" },
  { id: 4, title: "Procurement Command Center", description: "Centralized procurement lifecycle management.", imageUrl: "/images/carousel/procurement-tool.png" },
  { id: 5, title: "Property Management", description: "Operational workflow automation platform.", imageUrl: "/images/carousel/property-management.png" },
  { id: 6, title: "Sales Intelligence", description: "AI-driven lead conversion & outreach engine.", imageUrl: "/images/carousel/sales-tool.png" },
];

export const ImmersiveFeatures = () => {
  const isMobile = useMobile(1023);

  const handleCardClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section 
      id="immersive-features"
      className="immersive-features-section"
      style={{ 
        padding: isMobile ? "80px 16px 40px" : "32px 32px",
        position: "relative", 
        overflow: "hidden",
        background: "transparent"
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          height: "80%",
          background: "radial-gradient(circle at center, rgba(172, 215, 145, 0.05) 0%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
        }}
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
          width: "100%",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? "48px" : "40px",
          alignItems: "center"
        }}
      >
        {/* Left Column: Content */}
        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center",
          textAlign: isMobile ? "center" : "left",
          width: "100%"
        }}>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 15 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "4px 12px",
              background: "rgba(172, 215, 145, 0.08)",
              border: `1px solid rgba(172, 215, 145, 0.2)`,
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
              Scalable Infrastructure
            </span>
          </motion.div>

          <h1
            style={{
              fontFamily: F.inter,
              fontSize: "clamp(32px, 4.5vw, 48px)",
              fontWeight: 800,
              color: C.txtBright,
              lineHeight: 1.1,
              marginBottom: "10px",
              letterSpacing: "-0.04em",
            }}
          >
            The AI Workflow{" "}
            <span style={{ fontFamily: F.accent, fontStyle: "italic", color: C.green, fontWeight: 400 }}>
              Operating System
            </span>
          </h1>

          <p
            style={{
              fontFamily: F.inter,
              fontSize: "clamp(14px, 1.6vw, 16px)",
              color: C.txtBody,
              lineHeight: 1.6,
              marginBottom: "16px",
              letterSpacing: "-0.01em",
              opacity: 0.8,
              maxWidth: "520px"
            }}
          >
            ScalePods provides a modular ecosystem of automated systems that work together to accelerate growth and eliminate manual overhead.
          </p>

          {/* Feature Cards */}
          <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: "4px", 
            width: "100%",
            maxWidth: "480px",
            marginBottom: "16px"
          }}>
            {features.map((feat, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, x: -15 },
                  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } }
                }}
                onClick={() => handleCardClick(feat.id)}
                whileHover={{ x: 6, background: "rgba(172, 215, 145, 0.05)" }}
                style={{
                  padding: "8px 16px",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: G.border,
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
                }}
                className="feature-card"
              >
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={{ color: C.green, opacity: 0.8 }}>{feat.icon}</div>
                  <div>
                    <h4 style={{ color: C.txtBright, fontSize: "14px", fontWeight: 600, margin: 0 }}>{feat.title}</h4>
                    <p style={{ color: C.green, fontSize: "10px", fontWeight: 700, textTransform: "uppercase", marginTop: "1px" }}>{feat.outcome}</p>
                  </div>
                </div>
                <ChevronRight size={14} color={C.txtBright} style={{ opacity: 0.3 }} className="card-arrow" />
              </motion.div>
            ))}
          </div>

          <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "4px" }}>
            <Link href="/contact" style={{ textDecoration: "none" }}>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: `0 8px 25px rgba(172, 215, 145, 0.3)` }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: "10px 32px",
                  background: C.green,
                  color: "#000",
                  border: "none",
                  borderRadius: "100px",
                  fontSize: "14px",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer",
                }}
              >
                Start Your Pilot <ArrowRight size={16} />
              </motion.button>
            </Link>
          </div>
        </div>

        {/* Right Column: 3D Carousel (Order 2 on Desktop & Mobile) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ 
            position: "relative",
            width: "100%",
            height: isMobile ? "380px" : "400px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "visible"
          }}
        >
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <ThreeDCarousel 
              items={ringImages} 
              autoRotate={true}
              rotateInterval={5000}
            />
          </div>
        </motion.div>
      </motion.div>

      <style jsx>{`
        .feature-card:hover .card-arrow {
          transform: translateX(4px);
          opacity: 0.8 !important;
        }
      `}</style>
    </section>
  );
};
