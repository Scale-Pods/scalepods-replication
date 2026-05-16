"use client";

import React, { useState, memo, useCallback } from "react";

import { motion } from "framer-motion";
import { 
  Puzzle, 
  Workflow, 
  Settings, 
  Sparkles,
  Layers,
  Zap,
  BarChart3,
  Download,
  ChevronDown,
  ChevronUp,
  Boxes
} from "lucide-react";
import DownloadModal from "@/components/ui/DownloadModal";
import { ThreeDCarousel } from "@/components/lightswind/3d-carousel";
import { AnimatePresence } from "framer-motion";
import { useMobile } from "@/lib/hooks";
import { useTheme } from "@/components/providers/ThemeProvider";

const C = {
  green: "var(--color-green)",
  greenBright: "var(--color-green)",
  blue: "var(--color-blue-mid)",
  txtBright: "var(--color-text-bright)",
  txtBody: "var(--color-text-body)",
  border: "var(--color-border)",
  bgCard: "var(--color-bg-card)" };

const F = {
  inter: "var(--font-inter), Inter, sans-serif",
  serif: "var(--font-instrument), 'Instrument Serif', Georgia, serif",
  accent: "var(--font-instrument), serif" };

const G = {
  bg: "var(--color-glass-bg)",
  border: "1px solid var(--color-glass-border)",
  blur: "blur(16px)" };

const features = [
  { 
    title: "Modular Logic Engine", 
    desc: "Build complex conditional branches designed around your legacy stack.",
    icon: <Boxes size={16} /> 
  },
  { 
    title: "Proprietary Connectors", 
    desc: "Custom API bridges for ERPs, CRMs, and niche vertical software.",
    icon: <Workflow size={16} /> 
  },
  { 
    title: "Human-Logic Mirroring", 
    desc: "AI workflows that replicate your team's specific decision-making DNA.",
    icon: <Settings size={16} /> 
  },
  { 
    title: "Elastic Scaling", 
    desc: "Infrastructure that handles 10x spikes without manual intervention.",
    icon: <Layers size={16} /> 
  },
];

const customCarouselImages = [
  { 
    id: 1, 
    title: "Custom Logic Builder", 
    heading: "Proprietary Logic Engine",
    subtitle: "Map your unique business DNA into AI pods.",
    description: "Design and deploy custom conditional branches that mirror your team's specific decision-making process.",
    imageUrl: "/images/showcase/custom/custom-1.png", 
    systemLabel: "LOGIC ARCHITECTURE"
  },
  { 
    id: 2, 
    title: "API Orchestration", 
    heading: "Multi-Stack Connector Hub",
    subtitle: "Unified connectivity for complex legacy systems.",
    description: "Bridge the gap between modern AI and legacy ERP/CRM infrastructure with custom-built API layers.",
    imageUrl: "/images/showcase/custom/custom-2.png",
    systemLabel: "INTEGRATION LAYER"
  },
  { 
    id: 3, 
    title: "Dynamic Flow Control", 
    heading: "Self-Healing Workflow Pod",
    subtitle: "Autonomous adaptation to operational edge cases.",
    description: "Intelligent workflows that identify and resolve exceptions automatically, ensuring 100% process uptime.",
    imageUrl: "/images/showcase/custom/custom-3.png",
    systemLabel: "AUTONOMOUS OPS"
  },
];

export const CustomWorkflowShowcase = memo(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const isMobile = useMobile(1023);
  const { resolvedTheme } = useTheme();

  return (
    <section 
      id="custom-ai"
      className="custom-section"
      style={{ 
        position: "relative",
        overflow: "visible",
        background: "transparent",
        minHeight: "auto",
        touchAction: "pan-y",
        WebkitOverflowScrolling: "touch"
      }}
    >

      <style jsx>{`
        .custom-section {
          padding: 64px 32px 72px;
        }
        @media (max-width: 1023px) {
          .custom-section {
            padding: 80px 16px 80px !important;
          }
        }
      `}</style>
      {/* ── CINEMATIC AMBIENT INFRASTRUCTURE — dark mode only ── */}
      <motion.div 
        className="glow-ambient"
        animate={isMobile ? { opacity: 0.04 } : { 
          x: [40, -40, 40],
          opacity: [0.04, 0.08, 0.04]
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "-30%",
          left: "-10%",
          width: "100%",
          height: "160%",
          background: `linear-gradient(135deg, transparent 20%, rgba(var(--color-green-rgb), 0.15) 50%, transparent 80%)`,
          filter: isMobile ? "blur(80px)" : "blur(140px)",
          zIndex: 0,
          pointerEvents: "none",
          transform: "rotate(-10deg)",
          willChange: "transform, opacity"
        }} 
      />


      <div style={{
        maxWidth: "1280px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1.3fr",
        gap: isMobile ? (isPreviewOpen ? "24px" : "40px") : "60px", 
        alignItems: "center",
        position: "relative",
        zIndex: 1,
        transition: "gap 0.6s cubic-bezier(0.23, 1, 0.32, 1)"
      }} className="custom-showcase-grid">
        
        {/* Left Side: Content (Order 1 on Desktop & Mobile) */}
        <motion.div
          initial={{ opacity: 0, x: isMobile ? -30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ 
            position: "relative", 
            order: 1,
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
            background: "var(--color-glass-bg)", backdropFilter: "blur(16px)",
            border: "1px solid var(--color-glass-border)",
            borderRadius: "100px",
            marginBottom: "20px"
          }}>
            <Puzzle size={10} color={C.green} />
            <span style={{ 
              color: C.green, 
              fontSize: "10px", 
              fontWeight: 700, 
              textTransform: "uppercase", 
              letterSpacing: "0.1em" 
            }}>
              Custom Architecture
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
            Custom <span style={{ fontFamily: F.accent, fontStyle: "italic", fontWeight: 400, color: C.green }}>Workflow Pod</span>
          </h2>

          <div style={{ marginBottom: "24px" }}>
            <p style={{
              fontSize: "16px",
              color: C.txtBright,
              fontWeight: 600,
              marginBottom: "8px",
              opacity: 0.95
            }}>
              Infrastructure engineered for your proprietary business DNA.
            </p>
            <p style={{
              fontSize: "14px",
              color: C.txtBody,
              lineHeight: 1.6,
              opacity: 0.8
            }}>
              ScalePods builds custom AI pods for the workflows that define your 
              competitive advantage. From proprietary R&D pipelines to niche supply 
              chain logic, we engineer <span style={{ color: C.green, fontWeight: 700 }}> custom-native automation </span> 
              that other agencies can't touch.
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
              className="custom-cta"
            >
              Download Solution Guide <Download size={18} />
            </button>

            <motion.button
              onClick={() => setIsPreviewOpen(!isPreviewOpen)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: "12px 24px",
                background: "var(--color-glass-bg)", 
                backdropFilter: "blur(16px)",
                border: "1px solid var(--color-glass-border)",
                borderRadius: "12px",
                color: C.green,
                fontSize: "13px",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
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

        {/* Right Side: High-Fidelity Interface Stack (Order 2 on Desktop & Mobile) */}
        <div style={{ 
          position: "relative", 
          width: "100%", 
          minHeight: isMobile ? (isPreviewOpen ? "600px" : "540px") : "540px",
          paddingTop: isMobile ? "0" : "0",


          height: "auto",
          perspective: "1200px",
          order: 2,
          transition: "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
          overflow: "visible"
        }}>
          <AnimatePresence mode="wait">
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
                style={{ width: "100%", height: "100%", willChange: "transform, opacity, filter" }}
              >

                <div style={{
                  background: "var(--color-glass-bg)",
                  border: "1px solid var(--color-glass-border)",
                  borderRadius: "28px",
                  padding: isMobile ? "20px" : "32px",
                  boxShadow: "var(--card-shadow), var(--card-shadow-inset)",
                  backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column"
                }}>
                  <div style={{
                    position: "absolute",
                    top: 0, left: "20%", right: "20%",
                    height: "1px",
                    background: `linear-gradient(90deg, transparent, rgba(var(--color-green-rgb), 0.3), transparent)`,
                    pointerEvents: "none"
                  }} />

                  <div style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center",
                    marginBottom: "32px"
                  }}>
                    <div>
                      <h3 style={{ color: C.txtBright, fontSize: "18px", fontWeight: 700, margin: 0 }}>Custom Engine</h3>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "4px" }}>
                        <div style={{ width: "6px", height: "6px", background: C.green, borderRadius: "50%", boxShadow: `0 0 10px ${C.green}` }} />
                        <p style={{ color: C.txtBody, fontSize: "12px", margin: 0, opacity: 0.6 }}>Logic Stack: Active</p>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <div style={{ background: "rgba(var(--color-green-rgb), 0.1)", borderRadius: "8px", padding: "6px 12px", border: `1px solid var(--color-border)` }}>
                        <span style={{ color: C.green, fontSize: "11px", fontWeight: 700 }}>Custom V4.2</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
                    {[
                      { type: "Custom ERP Bridge", target: "SAP / Oracle", status: "Connected", health: "100%" },
                      { type: "Legacy Database Sync", target: "On-Premise SQL", status: "Syncing", health: "98%" },
                      { type: "Proprietary Logic", target: "Decision Engine", status: "Active", health: "100%" },
                    ].map((item, i) => (
                      <div key={i} style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "space-between",
                        padding: "14px 20px",
                        background: "rgba(var(--color-text-bright-rgb), 0.03)",
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                        borderRadius: "16px",
                        border: "1px solid var(--color-border-faint)",
                        boxShadow: "var(--internal-shadow-inset)" }}>
                        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                          <div style={{ 
                            width: "32px", 
                            height: "32px", 
                            borderRadius: "8px", 
                            background: "rgba(var(--color-blue-mid-rgb), 0.1)", 
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "center",
                            border: `1px solid var(--color-border)`
                          }}>
                            <Workflow size={14} color={C.blue} />
                          </div>
                          <div>
                            <div style={{ fontSize: "13px", fontWeight: 600, color: C.txtBright }}>{item.type}</div>
                            <div style={{ fontSize: "11px", color: C.txtBody, opacity: 0.6 }}>{item.target}</div>
                          </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontSize: "10px", fontWeight: 700, color: C.green, textTransform: "uppercase" }}>{item.status}</div>
                          <div style={{ fontSize: "10px", color: C.txtBody, opacity: 0.4 }}>Health: {item.health}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ 
                    padding: "20px", 
                    background: "rgba(var(--color-text-bright-rgb), 0.02)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    borderRadius: "20px", 
                    border: "1px solid var(--color-border-faint)",
                    boxShadow: "var(--internal-shadow-inset)",
                    position: "relative",
                    overflow: "hidden"
                  }}>
                    <div style={{ display: "flex", justifyItems: "space-between", alignItems: "center", marginBottom: "12px" }}>
                      <span style={{ fontSize: "12px", fontWeight: 600, color: C.txtBright }}>Throughput Velocity</span>
                      <BarChart3 size={14} color={C.green} />
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "40px" }}>
                      {[50, 70, 60, 90, 85, 100, 95].map((h, i) => (
                        <motion.div 
                          key={i}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1, duration: 1 }}
                          style={{ flex: 1, background: C.green, borderRadius: "2px", opacity: i === 5 ? 1 : 0.4 }} 
                        />
                      ))}

                    </div>
                  </div>

                  <motion.div 
                    animate={{ rotate: [0, -5, 0], y: [0, -10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      position: "absolute",
                      bottom: isMobile ? "0px" : "-30px",
                      right: isMobile ? "20px" : "40px",
                      background: "var(--color-glass-bg)",
                      padding: isMobile ? "12px 18px" : "16px 24px",
                      borderRadius: "16px",
                      border: "1px solid var(--color-glass-border)",
                      boxShadow: "var(--card-shadow), var(--card-shadow-inset)",
                      display: "flex",
                      alignItems: "center",
                      gap: isMobile ? "10px" : "14px",
                      zIndex: 10,
                      backdropFilter: "blur(24px)",
                      WebkitBackdropFilter: "blur(24px)",
                      scale: isMobile ? 0.9 : 1,
                      willChange: "transform, opacity"
                    }}
                  >
                    <div style={{ position: "relative" }}>
                      <Zap size={isMobile ? 14 : 18} color={C.green} />
                      <motion.div 
                        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        style={{ position: "absolute", inset: -4, background: "var(--green-glow-40)", borderRadius: "50%", zIndex: -1, filter: "blur(8px)" }}
                      />
                    </div>
                    <span style={{ fontSize: isMobile ? "10px" : "12px", fontWeight: 700, color: C.txtBright }}>Logic Sync Active</span>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="preview-layer"
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(8px)", transition: { duration: 0.4 } }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                style={{ 
                  width: "100%", zIndex: 5,
                  display: "flex", flexDirection: "column", alignItems: "center"
                }}
              >
                <ThreeDCarousel items={customCarouselImages} autoRotate={true} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style jsx>{`
        .custom-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(var(--color-green-rgb), 0.3);
          background: #C1E9A7 !important;
        }
        @media (max-width: 1023px) {
          .custom-showcase-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 60px !important;
            text-align: center;
          }
          .custom-showcase-grid > div {
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
        zipFile="/downloads/custom-guide.pdf"
        zipName="custom-guide.pdf"
        title="Download Custom Solution Guide"
      />
    </section>
  );
});

CustomWorkflowShowcase.displayName = "CustomWorkflowShowcase";

