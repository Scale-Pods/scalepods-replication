"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Search, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Layers,
  Zap,
  BarChart3,
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
  blur: "blur(12px)", 
};

const features = [
  { 
    title: "AI Talent Sourcing", 
    desc: "Autonomous identification of top-tier talent across global platforms.",
    icon: <Search size={16} /> 
  },
  { 
    title: "Resume Intelligence", 
    desc: "Automated screening and scoring based on specific role DNA.",
    icon: <FileText size={16} /> 
  },
  { 
    title: "Interview Orchestration", 
    desc: "Seamless scheduling and candidate coordination 24/7.",
    icon: <Calendar size={16} /> 
  },
  { 
    title: "Employee Onboarding", 
    desc: "Automated document collection and workflow orientation.",
    icon: <Users size={16} /> 
  },
];

const hrCarouselImages = [
  { 
    id: 1, 
    title: "Talent Acquisition Hub", 
    description: "Manage global recruitment pipelines automatically.",
    imageUrl: "/images/showcase/hr/hr-1.png", 
    category: "RECRUITMENT OPS"
  },
  { 
    id: 2, 
    title: "Candidate Intelligence", 
    description: "AI-driven skill mapping and cultural fit analysis.",
    imageUrl: "/images/showcase/hr/hr-2.png",
    category: "TALENT SCORING"
  },
  { 
    id: 3, 
    title: "Onboarding Workflow", 
    description: "Autonomous new-hire integration and documentation.",
    imageUrl: "/images/showcase/hr/hr-3.png",
    category: "EMPLOYEE SUCCESS"
  },
];

const StatIconSize = 14;

export const HRShowcase = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const isMobile = useMobile(1023);
  return (
    <section 
      id="hr-workflow"
      className="hr-section"
      style={{ 
        position: "relative",
        overflow: "visible",
        background: "transparent",
        minHeight: "auto"
      }}
    >
      <style jsx>{`
        .hr-section {
          padding: 64px 32px 72px;
        }
        @media (max-width: 1023px) {
          .hr-section {
            padding: 80px 16px 80px !important;
            margin-top: 40px !important;
          }
        }
      `}</style>
      {/* ── CINEMATIC AMBIENT INFRASTRUCTURE ── */}
      <motion.div 
        animate={isMobile ? { opacity: 0.04 } : { 
          x: [-40, 40, -40],
          opacity: [0.04, 0.08, 0.04]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "-30%",
          left: "-10%",
          width: "100%",
          height: "160%",
          background: `linear-gradient(135deg, transparent 20%, ${C.blue}15 50%, transparent 80%)`,
          filter: isMobile ? "blur(80px)" : "blur(140px)",
          zIndex: 0,
          pointerEvents: "none",
          transform: "rotate(-10deg)"
        }} 
      />

      <div style={{
        maxWidth: "1280px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr",
        gap: isMobile ? (isPreviewOpen ? "24px" : "40px") : "60px", 
        alignItems: "center",
        position: "relative",
        zIndex: 1,
        transition: "gap 0.6s cubic-bezier(0.23, 1, 0.32, 1)"
      }} className="hr-showcase-grid">
        
        {/* Left Side: High-Fidelity Interface Stack (Order 1 on Desktop, 2 on Mobile) */}
        <div style={{ 
          position: "relative", 
          width: "100%", 
          height: isMobile ? (isPreviewOpen ? "600px" : "540px") : "480px", 
          perspective: "1200px",
          order: isMobile ? 2 : 1,
          transition: "height 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
          overflow: "visible"
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
                <div style={{
                  background: G.bg,
                  border: G.border,
                  borderRadius: "28px",
                  padding: isMobile ? "20px" : "32px",
                  boxShadow: isMobile ? "0 20px 40px rgba(0,0,0,0.3)" : `0 40px 100px rgba(0,0,0,0.5), inset 0 0 40px rgba(109, 182, 255, 0.03)`,
                  backdropFilter: isMobile ? "blur(12px)" : G.blur,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column"
                }}>
                  <div style={{
                    position: "absolute",
                    top: 0, left: "20%", right: "20%",
                    height: "1px",
                    background: `linear-gradient(90deg, transparent, rgba(109, 182, 255, 0.3), transparent)`,
                    pointerEvents: "none"
                  }} />

                  <div style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center",
                    marginBottom: "32px"
                  }}>
                    <div>
                      <h3 style={{ color: C.txtBright, fontSize: "18px", fontWeight: 700, margin: 0 }}>Workforce Hub</h3>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "4px" }}>
                        <div style={{ width: "6px", height: "6px", background: C.blue, borderRadius: "50%", boxShadow: `0 0 10px ${C.blue}` }} />
                        <p style={{ color: C.txtBody, fontSize: "12px", margin: 0, opacity: 0.6 }}>Pod Status: Live Triage</p>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <div style={{ background: "rgba(109, 182, 255, 0.1)", borderRadius: "8px", padding: "6px 12px", border: `1px solid ${C.blue}22` }}>
                        <span style={{ color: C.blue, fontSize: "11px", fontWeight: 700 }}>12 Qualified Leads</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
                    {[
                      { name: "Alex Chen", role: "Sr. AI Engineer", status: "Interviewing", score: "98/100" },
                      { name: "Mia Wong", role: "Growth Lead", status: "Screened", score: "94/100" },
                      { name: "John Smith", role: "Product Designer", status: "Onboarding", score: "91/100" },
                    ].map((item, i) => (
                      <div key={i} style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "space-between",
                        padding: "14px 20px",
                        background: "rgba(255,255,255,0.015)",
                        borderRadius: "16px",
                        border: "1px solid rgba(255,255,255,0.04)",
                        backdropFilter: "blur(4px)"
                      }}>
                        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                          <div style={{ 
                            width: "32px", 
                            height: "32px", 
                            borderRadius: "50%", 
                            background: "rgba(255,255,255,0.05)", 
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "center",
                            border: `1px solid ${C.border}`
                          }}>
                            <Users size={14} color={C.txtBody} />
                          </div>
                          <div>
                            <div style={{ fontSize: "13px", fontWeight: 600, color: C.txtBright }}>{item.name}</div>
                            <div style={{ fontSize: "11px", color: C.txtBody, opacity: 0.6 }}>{item.role}</div>
                          </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontSize: "10px", fontWeight: 700, color: item.status === "Onboarding" ? C.green : C.blue, textTransform: "uppercase" }}>{item.status}</div>
                          <div style={{ fontSize: "10px", color: C.txtBody, opacity: 0.4 }}>Score: {item.score}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ 
                    padding: "20px", 
                    background: "rgba(109, 182, 255, 0.03)", 
                    borderRadius: "20px", 
                    border: "1px solid rgba(109, 182, 255, 0.1)",
                    position: "relative",
                    overflow: "hidden"
                  }}>
                    <div style={{ display: "flex", justifyItems: "space-between", alignItems: "center", marginBottom: "12px" }}>
                      <span style={{ fontSize: "12px", fontWeight: 600, color: C.txtBright }}>Recruitment Velocity</span>
                      <Zap size={14} color={C.blue} />
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "40px" }}>
                      {[20, 50, 40, 70, 60, 85, 95].map((h, i) => (
                        <motion.div 
                          key={i}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h}%` }}
                          transition={{ delay: i * 0.1, duration: 1 }}
                          style={{ flex: 1, background: C.blue, borderRadius: "2px", opacity: i === 6 ? 1 : 0.4 }} 
                        />
                      ))}
                    </div>
                  </div>

                  <motion.div 
                    animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      position: "absolute",
                      bottom: isMobile ? "0px" : "-30px",
                      left: isMobile ? "20px" : "40px",
                      background: "rgba(10, 12, 16, 0.7)",
                      padding: isMobile ? "12px 18px" : "16px 24px",
                      borderRadius: "16px",
                      border: `1px solid rgba(109, 182, 255, 0.35)`,
                      boxShadow: `0 20px 50px rgba(0,0,0,0.5), inset 0 0 15px rgba(109, 182, 255, 0.05)`,
                      display: "flex",
                      alignItems: "center",
                      gap: isMobile ? "10px" : "14px",
                      zIndex: 10,
                      backdropFilter: "blur(24px)",
                      scale: isMobile ? 0.9 : 1,
                      willChange: "transform, opacity"
                    }}
                  >
                    <div style={{ position: "relative" }}>
                      <Search size={isMobile ? 14 : 18} color={C.blue} />
                      <motion.div 
                        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                        style={{ position: "absolute", inset: -4, background: C.blue, borderRadius: "50%", zIndex: -1, filter: "blur(8px)" }}
                      />
                    </div>
                    <span style={{ fontSize: isMobile ? "10px" : "12px", fontWeight: 700, color: C.txtBright }}>AI Recruiter Active</span>
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

        {/* Right Side: Content (Order 2 on Desktop, 1 on Mobile) */}
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
              Workforce Intelligence
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
            HR & Talent <span style={{ fontFamily: F.accent, fontStyle: "italic", fontWeight: 400, color: C.green }}>Workflow Pod</span>
          </h2>

          <div style={{ marginBottom: "24px" }}>
            <p style={{
              fontSize: "16px",
              color: C.txtBright,
              fontWeight: 600,
              marginBottom: "8px",
              opacity: 0.95
            }}>
              Build your elite team with autonomous talent pipelines.
            </p>
            <p style={{
              fontSize: "14px",
              color: C.txtBody,
              lineHeight: 1.6,
              opacity: 0.8
            }}>
              ScalePods automates the entire talent lifecycle. Our HR pods handle sourcing, 
              screening, and scheduling 24/7, ensuring <span style={{ color: C.blue, fontWeight: 700 }}> top 1% recruitment velocity </span> 
              without any manual HR bottlenecking.
            </p>
          </div>

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
                  color: C.blue,
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
              Download HR Guide <Download size={18} />
            </button>

            <motion.button
              onClick={() => setIsPreviewOpen(!isPreviewOpen)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: "12px 24px",
                background: "rgba(109, 182, 255, 0.05)",
                border: "1px solid rgba(109, 182, 255, 0.15)",
                borderRadius: "12px",
                color: C.blue,
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
      </div>

      <style jsx>{`
        .hr-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(109, 182, 255, 0.3);
          background: #C1E9A7 !important;
        }
        @media (max-width: 1023px) {
          .hr-showcase-grid {
            display: flex !important;
            flex-direction: column !important;
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
