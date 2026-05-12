"use client";

import React from "react";
import { motion } from "framer-motion";
import { ThreeDCarousel } from "@/components/lightswind/3d-carousel";
import { ChevronRight, ArrowRight, Zap, Users, Settings, PenTool, Layers } from "lucide-react";

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
  blur: "blur(40px)",
};

const features = [
  {
    id: "sales-pod-showcase",
    title: "Sales Automation",
    desc: "Automated lead scraping & outreach.",
    outcome: "3x More Booked Demos",
    icon: <Zap size={14} />,
  },
  {
    id: "hr-section",
    title: "HR Automation",
    desc: "AI screening & instant shortlists.",
    outcome: "50% Faster Time-to-Hire",
    icon: <Users size={14} />,
  },
  {
    id: "ops-section",
    title: "Ops Automation",
    desc: "24/7 AI agents for order flows.",
    outcome: "70% Less Manual Follow-up",
    icon: <Settings size={14} />,
  },
  {
    id: "marketing-section",
    title: "Marketing Automation",
    desc: "AI content & auto-scheduling.",
    outcome: "Scalable Content Engine",
    icon: <PenTool size={14} />,
  },
  {
    id: "custom-workflows",
    title: "Custom Workflows",
    desc: "Tailored AI operational systems.",
    outcome: "Full Process Autonomy",
    icon: <Layers size={14} />,
  },
];

const ringImages = [
  { 
    id: 1, 
    title: "Audit Checker", 
    description: "AI-powered document validation & procurement auditing.",
    imageUrl: "/images/carousel/audit-checker.png" 
  },
  { 
    id: 2, 
    title: "Expense Tracker", 
    description: "Interactive financial analytics & invoicing system.",
    imageUrl: "/images/carousel/expense-tracker.png" 
  },
  { 
    id: 3, 
    title: "Marketing Automation", 
    description: "Automated multi-channel outreach workflows.",
    imageUrl: "/images/carousel/marketing-tool.png" 
  },
  { 
    id: 4, 
    title: "Procurement Command Center", 
    description: "Centralized procurement lifecycle management.",
    imageUrl: "/images/carousel/procurement-tool.png" 
  },
  { 
    id: 5, 
    title: "Property Management", 
    description: "Operational workflow automation platform.",
    imageUrl: "/images/carousel/property-management.png" 
  },
  { 
    id: 6, 
    title: "Sales Intelligence", 
    description: "AI-driven lead conversion & outreach engine.",
    imageUrl: "/images/carousel/sales-tool.png" 
  },
];

export const ImmersiveFeatures = () => {
  const handleCardClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section 
      id="immersive-features"
      style={{ 
        padding: "32px 32px 40px",
        position: "relative", 
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "auto",
      }}
    >
      {/* Background Refinement: Subtle ambient lighting only */}
      <div 
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle at 85% 50%, rgba(172, 215, 145, 0.02) 0%, transparent 40%), radial-gradient(circle at 15% 85%, rgba(109, 182, 255, 0.01) 0%, transparent 30%)",
          zIndex: 0,
        }}
      />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.1 }
          }
        }}
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "0.8fr 1.2fr",
          gap: "80px",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
          width: "100%",
        }}
        className="immersive-grid"
      >
        {/* Left Side Content */}
        <div style={{ maxWidth: "520px" }}>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 15 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
            }}
          >
            <h2
              style={{
                fontFamily: F.inter,
                fontSize: "clamp(24px, 2.6vw, 36px)",
                fontWeight: 700,
                color: C.txtBright,
                lineHeight: 1,
                marginBottom: "12px",
                letterSpacing: "-0.04em",
              }}
            >
              The AI Workflow{" "}
              <em style={{ fontFamily: F.accent, fontStyle: "italic", color: C.green, fontWeight: 400 }}>
                Operating System
              </em>
            </h2>

            <p
              style={{
                fontFamily: F.inter,
                fontSize: "14.5px",
                color: C.txtBody,
                lineHeight: 1.5,
                marginBottom: "20px",
                letterSpacing: "-0.01em",
                opacity: 0.8,
              }}
            >
              ScalePods provides a modular ecosystem of automated systems that work together to accelerate growth and eliminate manual overhead.
            </p>
          </motion.div>

          {/* Compact Feature Cards with Staggered Reveal */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {features.map((feat, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, x: -15 },
                  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } }
                }}
                onClick={() => handleCardClick(feat.id)}
                whileHover={{ x: 8, background: "rgba(172, 215, 145, 0.04)" }}
                style={{
                  padding: "10px 18px",
                  background: "rgba(255, 255, 255, 0.035)",
                  border: G.border,
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
                  position: "relative",
                  overflow: "hidden",
                }}
                className="feature-card-refined"
              >
                <div style={{ display: "flex", alignItems: "center", gap: "14px", position: "relative", zIndex: 1 }}>
                  <div style={{ color: C.green, opacity: 0.8, display: "flex" }}>
                    {feat.icon}
                  </div>
                  <div>
                    <h4 style={{ color: C.txtBright, fontSize: "13.5px", fontWeight: 600, margin: 0, letterSpacing: "-0.01em" }}>
                      {feat.title}
                    </h4>
                    <p style={{ color: C.green, fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "1px", opacity: 0.9 }}>
                      {feat.outcome}
                    </p>
                  </div>
                </div>
                
                <div className="card-arrow" style={{ opacity: 0.2, transition: "transform 0.3s ease" }}>
                  <ChevronRight size={14} color={C.txtBright} />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              show: { opacity: 1, scale: 1, transition: { delay: 0.4 } }
            }}
            style={{
              marginTop: "20px",
              padding: "10px 24px",
              background: C.green,
              color: "#000",
              border: "none",
              borderRadius: "100px",
              fontSize: "13px",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            whileHover={{ scale: 1.02, boxShadow: `0 8px 20px rgba(172, 215, 145, 0.2)` }}
            whileTap={{ scale: 0.98 }}
          >
            Start Your Pilot <ArrowRight size={14} />
          </motion.button>
        </div>

        {/* Right Side: 3D Cinematic Slider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ 
            position: "relative",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ 
            width: "100%",
            height: "100%",
          }} className="slider-responsive-container">
            <ThreeDCarousel 
              items={ringImages} 
              autoRotate={true}
              rotateInterval={5000}
            />
          </div>
        </motion.div>
      </motion.div>

      <style jsx>{`
        .feature-card-refined:hover {
          border-color: rgba(172, 215, 145, 0.4) !important;
          background: rgba(172, 215, 145, 0.03) !important;
        }
        .feature-card-refined:hover .card-arrow {
          transform: translateX(4px);
          opacity: 0.8 !important;
        }
        @media (max-width: 1024px) {
          .slider-responsive-container {
            --slider-width: 18rem !important;
            --slider-perspective: 40em !important;
          }
          .immersive-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            text-align: center;
          }
          .immersive-grid > div {
            margin: 0 auto;
            align-items: center !important;
          }
        }
        @media (max-width: 768px) {
          .slider-responsive-container {
            --slider-width: 14rem !important;
            --slider-perspective: 30em !important;
          }
          #immersive-features {
            padding: 40px 20px !important;
          }
          .immersive-grid {
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
};
