"use client";

import React, { useState } from "react";
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
  Filter,
  Download,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import DownloadModal from "@/components/ui/DownloadModal";
import { ThreeDCarousel } from "@/components/lightswind/3d-carousel";
import { AnimatePresence } from "framer-motion";
import { useMobile } from "@/lib/hooks";

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
  blur: "blur(12px)", // Reduced from 40px for mobile performance
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
const hrCarouselImages = [
  { 
    id: 1, 
    title: "HR Analytics Dashboard", 
    description: "Real-time recruitment performance and hiring analytics.",
    imageUrl: "/images/showcase/hr/hr-1.png",
    category: "SCALEPODS HR SYSTEM"
  },
  { 
    id: 2, 
    title: "Campaign Management Panel", 
    description: "Create and manage hiring campaigns across multiple roles.",
    imageUrl: "/images/showcase/hr/hr-2.png",
    category: "HIRING CAMPAIGN SYSTEM"
  },
  { 
    id: 3, 
    title: "Candidate Pipeline Workflow", 
    description: "Track sourcing, screening, and interview operations visually.",
    imageUrl: "/images/showcase/hr/hr-3.png",
    category: "AUTOMATED HIRING PIPELINE"
  },
];

export const HRShowcase = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const isMobile = useMobile(1024);
  return (
    <section 
      id="hr-section"
      className="hr-section"
      style={{ 
        position: "relative",
        overflow: "hidden",
        background: "transparent",
        minHeight: "auto"
      }}
    >
      <style jsx>{`
        .hr-section {
          padding: 64px 32px 72px;
        }
        @media (max-width: 1024px) {
          .hr-section {
            padding: 40px 16px 56px;
          }
        }
      `}</style>
      {/* ── CINEMATIC AMBIENT INFRASTRUCTURE (Animated Beams) ── */}
      
      {/* Primary Flow Beam */}
      <motion.div 
        animate={isMobile ? { opacity: 0.04 } : { 
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
          filter: isMobile ? "blur(80px)" : "blur(140px)",
          zIndex: 0,
          pointerEvents: "none",
          transform: "rotate(12deg)"
        }} 
      />

      <div style={{
        maxWidth: "1240px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr",
        gap: isMobile ? (isPreviewOpen ? "24px" : "40px") : "60px", // Tighten gap when previewing
        alignItems: "center",
        position: "relative",
        zIndex: 1,
        transition: "gap 0.6s cubic-bezier(0.23, 1, 0.32, 1)"
      }} className="hr-showcase-grid">
        
        {/* Right Side: Content (Order 2 on Desktop) */}
        <motion.div
          initial={{ opacity: 0, x: isMobile ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ 
            position: "relative", 
            order: isMobile ? 1 : 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center"
          }}
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
            HR Workflow <span style={{ fontFamily: F.accent, fontStyle: "italic", fontWeight: 400, color: C.green }}>Automation Pod</span>
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
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", 
            gap: "20px",
            marginBottom: "32px",
            width: "100%",
            textAlign: isMobile ? "center" : "left"
          }}>
            {features.map((feat, i) => (
              <div key={i} style={{ 
                display: "flex", 
                flexDirection: "column",
                alignItems: isMobile ? "center" : "flex-start"
              }}>
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
                  opacity: 0.7,
                  textAlign: isMobile ? "center" : "left"
                }}>
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: "12px", 
            alignItems: "center",
            marginTop: "12px",
            width: "100%"
          }}>
            <button 
              onClick={() => setIsModalOpen(true)}
              style={{
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
                transition: "all 0.3s ease",
                width: "fit-content"
              }}
              className="hr-cta"
            >
              Download Feature Guide <Download size={18} />
            </button>

            <motion.button
              onClick={() => setIsPreviewOpen(!isPreviewOpen)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: "12px 24px",
                background: "rgba(172, 215, 145, 0.05)",
                border: "1px solid rgba(172, 215, 145, 0.15)",
                borderRadius: "12px",
                color: C.green,
                fontSize: "13px",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                backdropFilter: "blur(10px)",
                transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
                width: "fit-content"
              }}
              className="explore-trigger"
            >
              {isPreviewOpen ? (
                <><ChevronUp size={14} /> Back to Live Dashboard</>
              ) : (
                <><ChevronDown size={14} /> Explore Real Product Interface</>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Left Side: High-Fidelity Interface Stack (Fixed Height for Morphing) */}
        <div style={{ 
          position: "relative", 
          order: isMobile ? 2 : 1,
          width: "100%", 
          height: isMobile ? (isPreviewOpen ? "560px" : "420px") : "480px", 
          perspective: "1200px",
          transition: "height 0.6s cubic-bezier(0.23, 1, 0.32, 1)"
        }}>
          <AnimatePresence mode="popLayout">
            {!isPreviewOpen ? (
              <motion.div
                key="dashboard-layer"
                initial={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)", zIndex: 2 }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.98, 
                  filter: "blur(12px)",
                  transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] }
                }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
              >
                {/* Main Glassmorphism Container */}
                <div style={{
                  background: G.bg,
                  border: G.border,
                  borderRadius: "28px",
                  padding: isMobile ? "20px" : "32px",
                  boxShadow: isMobile ? "0 20px 40px rgba(0,0,0,0.3)" : `0 40px 100px rgba(0,0,0,0.5), inset 0 0 40px rgba(172, 215, 145, 0.03)`,
                  backdropFilter: isMobile ? "blur(12px)" : G.blur,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column"
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
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
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
                    gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", 
                    gap: "8px", 
                    marginBottom: isMobile ? "24px" : "32px", 
                    padding: "4px",
                    background: "rgba(255,255,255,0.03)", borderRadius: "12px"
                  }}>
                    {["Sourcing", "Screening", "Interview", "Offer"].map((stage, i) => (
                      <div key={i} style={{ 
                        textAlign: "center", padding: "10px 4px", borderRadius: "8px",
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
                      <div key={i} style={{ 
                        display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px",
                        background: "rgba(255,255,255,0.015)", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.04)",
                        backdropFilter: "blur(4px)", transition: "all 0.3s ease"
                      }}>
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
                      </div>
                    ))}
                  </div>

                  {/* Floating Element: Automation Engine */}
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      position: "absolute", top: "-35px", left: "-15px", background: "rgba(10, 12, 16, 0.4)",
                      padding: "16px 24px", borderRadius: "20px", border: `1px solid rgba(109, 182, 255, 0.3)`,
                      boxShadow: `0 20px 50px rgba(0,0,0,0.5), inset 0 0 15px rgba(109, 182, 255, 0.05)`,
                      display: "flex", alignItems: "center", gap: "14px", zIndex: 3, backdropFilter: "blur(24px)"
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
            ) : (
              <motion.div
                key="preview-layer"
                initial={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.96, filter: "blur(8px)", transition: { duration: 0.4 } }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                style={{ 
                  position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 5,
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"
                }}
              >
                <div style={{ 
                  width: "100%", height: "100%", position: "relative", overflow: "visible",
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  <ThreeDCarousel items={hrCarouselImages} autoRotate={true} tightLayout={true} cardScale={1.1} />
                </div>
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  style={{
                    position: "absolute", inset: "-60px", background: `radial-gradient(circle at center, ${C.blue}15 0%, transparent 70%)`,
                    zIndex: -1, pointerEvents: "none"
                  }} 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

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
    <DownloadModal 
      isOpen={isModalOpen} 
      onClose={() => setIsModalOpen(false)}
      zipFile="/downloads/hr-guide.pdf"
      zipName="hr-guide.pdf"
      title="Download HR Workflow Guide"
    />
    </section>
  );
};
