"use client";

import React, { useState, useRef, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart3, 
  Target, 
  Globe, 
  MousePointer2, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Zap,
  Layout,
  Download,
  ChevronDown,
  ChevronUp,
  Layers
} from "lucide-react";
import DownloadModal from "@/components/ui/DownloadModal";
import { FloatingPreviewCarouselWrapper } from "@/components/ui/FloatingPreviewCarouselWrapper";
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
    title: "AI Lead Sourcing", 
    desc: "Autonomous identification of high-intent prospects across global databases.",
    icon: <Target size={16} /> 
  },
  { 
    title: "Hyper-Personalization", 
    desc: "AI-generated outreach tailored to each prospect's specific pain points.",
    icon: <Sparkles size={16} /> 
  },
  { 
    title: "Omnichannel Hub", 
    desc: "Unified execution across LinkedIn, Email, and direct voice automation.",
    icon: <Globe size={16} /> 
  },
  { 
    title: "Revenue Analytics", 
    desc: "Real-time visibility into pipeline health and conversion velocity.",
    icon: <BarChart3 size={16} /> 
  },
];

const salesCarouselImages = [
  { 
    id: 1, 
    title: "Sales Intelligence Hub", 
    heading: "Pipeline Performance Center",
    subtitle: "Real-time deal flow and conversion tracking.",
    description: "Deep-dive ROI metrics and automated funnel monitoring for scalable growth.",
    imageUrl: "/images/showcase/sales/Sales tool 1.png", 
    systemLabel: "REVENUE OS"
  },
  { 
    id: 2, 
    title: "Outreach Orchestrator", 
    heading: "Multi-Channel Outreach Pod",
    subtitle: "Autonomous engagement across LinkedIn and Email.",
    description: "Manage high-volume, hyper-personalized sales sequences without manual input.",
    imageUrl: "/images/showcase/sales/Sales tool 2.png",
    systemLabel: "OUTREACH ENGINE"
  },
  { 
    id: 3, 
    title: "Conversion Analytics", 
    heading: "Growth Analytics Engine",
    subtitle: "Funnel velocity and performance monitoring.",
    description: "Track every lead interaction and optimize for maximum conversion rates automatically.",
    imageUrl: "/images/showcase/sales/Sales tool 3.png",
    systemLabel: "ANALYTICS HUB"
  },
  { 
    id: 4, 
    title: "Lead Scoring Center", 
    heading: "Intelligent Lead Prioritization",
    subtitle: "AI-driven scoring and routing architecture.",
    description: "Automatically identify and route high-intent prospects to your sales team.",
    imageUrl: "/images/showcase/sales/Sales tool 4.png",
    systemLabel: "GROWTH INTELLIGENCE"
  },
  { 
    id: 5, 
    title: "Agent Performance", 
    heading: "Sales Force Command Center",
    subtitle: "Monitor AI agent efficacy and demo volume.",
    description: "Real-time visibility into meeting volumes and agent performance metrics.",
    imageUrl: "/images/showcase/sales/Sales tool 5.png",
    systemLabel: "SALES OPS"
  },
];

const StatIconSize = 14;

// Removed local SalesCarouselWrapper since it's now in FloatingPreviewCarouselWrapper


export const SalesPodShowcase = memo(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const isMobile = useMobile(1023);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <section 
      id="sales-pod"
      className="salespod-section"
      style={{ 
        position: "relative",
        overflow: "visible",
        background: "transparent",
        minHeight: "auto",
        touchAction: "pan-y",
        WebkitOverflowScrolling: "touch"
      }}
    >
      <div id="crm-intelligence" style={{ position: "absolute", top: 0 }} />

      <style jsx>{`
        .salespod-section {
          padding: 64px 32px 72px;
        }
        @media (max-width: 1023px) {
          .salespod-section {
            padding: 40px 16px 80px !important;
          }
        }
      `}</style>
      {/* ── CINEMATIC AMBIENT INFRASTRUCTURE — dark mode only ── */}
      <motion.div 
        className="glow-ambient"
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
          background: `linear-gradient(135deg, transparent 20%, rgba(var(--color-green-rgb), 0.15) 50%, transparent 80%)`,
          filter: isMobile ? "blur(60px)" : "blur(140px)",
          zIndex: 0,
          pointerEvents: "none",
          transform: "rotate(-10deg) translate3d(0,0,0)",
          willChange: "transform, opacity"
        }} 
      />


      <div style={{
        maxWidth: "1280px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1.3fr 1fr",
        gap: isMobile ? (isPreviewOpen ? "24px" : "40px") : "60px", 
        alignItems: "center",
        position: "relative",
        zIndex: 1,
        transition: "gap 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
        transform: "translate3d(0,0,0)",
        willChange: "transform"
      }} className="salespod-grid">
        
        {/* Left Side: Content (Order 1 on Desktop & Mobile) */}
        <motion.div
          initial={{ opacity: 0, x: isMobile ? 0 : -30, y: isMobile ? 20 : 0 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: isMobile ? 0.6 : 0.8, ease: "easeOut" }}
          style={{ 
            position: "relative", 
            order: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            transform: "translate3d(0,0,0)",
            willChange: "transform, opacity"
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
            <Target size={10} color={C.green} />
            <span style={{ 
              color: C.green, 
              fontSize: "10px", 
              fontWeight: 700, 
              textTransform: "uppercase", 
              letterSpacing: "0.1em" 
            }}>
              Revenue Intelligence
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
            Sales & Outreach <span style={{ fontFamily: F.accent, fontStyle: "italic", fontWeight: 400, color: C.green }}>Workflow Pod</span>
          </h2>

          <div style={{ marginBottom: "24px" }}>
            <p style={{
              fontSize: "16px",
              color: C.txtBright,
              fontWeight: 600,
              marginBottom: "8px",
              opacity: 0.95
            }}>
              Fill your calendar with high-intent prospects, automatically.
            </p>
            <p style={{
              fontSize: "14px",
              color: C.txtBody,
              lineHeight: 1.6,
              opacity: 0.8
            }}>
              ScalePods automates your entire top-of-funnel. From scraping deep prospect 
              data to executing hyper-personalized multi-channel sequences, our AI pods 
              ensure <span style={{ color: C.green, fontWeight: 700 }}> maximum pipeline velocity </span> 
              without expanding your headcount.
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
                padding: "16px 36px",
                // Background Logic
                background: isDark
                  ? "linear-gradient(135deg, #050816 0%, #0b1020 100%)"
                  : "linear-gradient(135deg, #B1D997 0%, #C5E4B2 50%, #D8EFCC 100%)",
                
                // Theme Adaptive Colors
                color: isDark ? "#B1D997" : "#0f172a",
                
                // Glass & Border
                backdropFilter: isDark ? "blur(12px)" : "none",
                WebkitBackdropFilter: isDark ? "blur(12px)" : "none",
                border: isDark 
                  ? "1px solid rgba(177, 217, 151, 0.4)" 
                  : "1px solid rgba(177, 217, 151, 0.3)",
                
                borderRadius: "12px",
                fontSize: "15px",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
                
                // Depth & Shadows
                boxShadow: isDark 
                  ? "0 8px 24px -4px rgba(0, 0, 0, 0.6), 0 0 15px rgba(177, 217, 151, 0.15)" 
                  : "0 10px 20px -5px rgba(177, 217, 151, 0.25), inset 0 1px 0 rgba(255,255,255,0.4)",
                
                transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
                width: "fit-content"
              }}
            >
              Download Free feature Guide <Download size={18} />
            </button>

            <button
              onClick={() => setIsPreviewOpen(!isPreviewOpen)}
              style={{
                padding: "12px 24px",
                background: "rgba(177, 217, 151, 0.05)", 
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(177, 217, 151, 0.2)",
                borderRadius: "12px",
                color: isDark ? "#B1D997" : "#0f172a",
                fontSize: "13px",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                width: "fit-content"
              }}
            >
              {isPreviewOpen ? (
                <><ChevronUp size={14} /> Back to Live Dashboard</>
              ) : (
                <><ChevronDown size={14} /> Explore Real Product Interface</>
              )}
            </button>

          </div>
        </motion.div>

        {/* Right Side: High-Fidelity Interface Stack (Order 2 on Desktop & Mobile) */}
        <div style={{ 
          position: "relative", 
          width: "100%", 
          minHeight: isMobile ? (isPreviewOpen ? "600px" : "540px") : "540px",
          paddingTop: isMobile ? "0" : "0",


          height: "auto",
          order: 2,
          transition: "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
          overflow: "visible",
          transform: "translate3d(0,0,0)",
          willChange: "transform"
        }}>
          <AnimatePresence mode="wait">
            {!isPreviewOpen ? (
              <motion.div
                key="dashboard-layer"
                initial={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.98, 
                  filter: "blur(12px)",
                  transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] }
                }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                style={{ width: "100%", height: "100%", transform: "translate3d(0,0,0)", willChange: "transform, opacity" }}
              >
                <div style={{
                  background: "var(--color-glass-bg)",
                  border: "1px solid var(--color-glass-border)",
                  borderRadius: "28px",
                  padding: isMobile ? "20px" : "32px",
                  boxShadow: "var(--card-shadow), var(--card-shadow-inset)",
                  backdropFilter: isMobile ? "blur(8px)" : "blur(18px)",
                  WebkitBackdropFilter: isMobile ? "blur(8px)" : "blur(18px)",
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
                      <h3 style={{ color: C.txtBright, fontSize: "18px", fontWeight: 700, margin: 0 }}>Sales Hub</h3>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "4px" }}>
                        <div style={{ width: "6px", height: "6px", background: C.green, borderRadius: "50%", boxShadow: `0 0 10px ${C.green}` }} />
                        <p style={{ color: C.txtBody, fontSize: "12px", margin: 0, opacity: 0.6 }}>Pod Status: Live Syncing</p>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <div style={{ background: "rgba(var(--color-green-rgb), 0.1)", borderRadius: "8px", padding: "6px 12px", border: `1px solid var(--color-border)` }}>
                        <span style={{ color: C.green, fontSize: "11px", fontWeight: 700 }}>98.2% Accuracy</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
                    {[
                      { type: "LinkedIn Outreach", prospect: "Sarah Jenkins", status: "Personalized", action: "LinkedIn" },
                      { type: "Email Campaign", prospect: "Mark Thompson", status: "Sent", action: "Email" },
                      { type: "Lead Scraper", prospect: "Target List A", status: "Scraping", action: "Database" },
                    ].map((item, i) => (
                      <div key={i} style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "space-between",
                        padding: "14px 20px",
                        background: "rgba(var(--color-text-bright-rgb), 0.03)",
                        backdropFilter: isMobile ? "blur(4px)" : "blur(8px)",
                        WebkitBackdropFilter: isMobile ? "blur(4px)" : "blur(8px)",
                        borderRadius: "16px",
                        border: "1px solid var(--color-border-faint)",
                        boxShadow: "var(--internal-shadow-inset)",
                        transform: "translate3d(0,0,0)" }}>
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
                            {item.action === "LinkedIn" ? <Sparkles size={14} color={C.blue} /> : <Zap size={14} color={C.blue} />}
                          </div>
                          <div>
                            <div style={{ fontSize: "13px", fontWeight: 600, color: C.txtBright }}>{item.type}</div>
                            <div style={{ fontSize: "11px", color: C.txtBody, opacity: 0.6 }}>{item.prospect}</div>
                          </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontSize: "10px", fontWeight: 700, color: C.green, textTransform: "uppercase" }}>{item.status}</div>
                          <div style={{ fontSize: "10px", color: C.txtBody, opacity: 0.4 }}>Real-time</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ 
                    padding: "20px", 
                    background: "rgba(var(--color-text-bright-rgb), 0.02)",
                    backdropFilter: isMobile ? "blur(4px)" : "blur(8px)",
                    WebkitBackdropFilter: isMobile ? "blur(4px)" : "blur(8px)",
                    borderRadius: "20px", 
                    border: "1px solid var(--color-border-faint)",
                    boxShadow: "var(--internal-shadow-inset)",
                    position: "relative",
                    overflow: "hidden",
                    transform: "translate3d(0,0,0)"
                  }}>
                    <div style={{ display: "flex", justifyItems: "space-between", alignItems: "center", marginBottom: "12px" }}>
                      <span style={{ fontSize: "12px", fontWeight: 600, color: C.txtBright }}>Pipeline Flux</span>
                      <BarChart3 size={14} color={C.blue} />
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "40px" }}>
                      {[30, 45, 60, 40, 70, 85, 95].map((h, i) => (
                        <motion.div 
                          key={i}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: isMobile ? i * 0.05 : i * 0.1, duration: isMobile ? 0.6 : 1 }}
                          style={{ flex: 1, background: C.blue, borderRadius: "2px", opacity: i === 6 ? 1 : 0.4 }} 
                        />
                      ))}

                    </div>
                  </div>

                  <motion.div 
                    animate={isMobile ? { y: [0, -5, 0] } : { rotate: [0, 5, 0], y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
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
                      backdropFilter: isMobile ? "blur(12px)" : "blur(24px)",
                      WebkitBackdropFilter: isMobile ? "blur(12px)" : "blur(24px)",
                      scale: isMobile ? 0.9 : 1,
                      willChange: "transform, opacity",
                      transform: "translate3d(0,0,0)"
                    }}
                  >
                    <div style={{ position: "relative" }}>
                      <Sparkles size={isMobile ? 14 : 18} color={C.green} />
                      <motion.div 
                        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                        style={{ position: "absolute", inset: -4, background: "var(--green-glow-40)", borderRadius: "50%", zIndex: -1, filter: "blur(8px)" }}
                      />
                    </div>
                    <span style={{ fontSize: isMobile ? "10px" : "12px", fontWeight: 700, color: C.txtBright }}>AI Outreach Active</span>
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
                  display: "flex", flexDirection: "column", alignItems: "center",
                  transform: "translate3d(0,0,0)",
                  willChange: "transform, opacity"
                }}
              >
                <FloatingPreviewCarouselWrapper 
                  items={salesCarouselImages}
                  autoRotate={true}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style jsx>{`
        .salespod-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(var(--color-green-rgb), 0.3);
          background: #C1E9A7 !important;
        }
        @media (max-width: 1023px) {
          .salespod-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 60px !important;
            text-align: center;
          }
          .salespod-grid > div {
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
        zipFile="/downloads/AI-Powered-Outbound-Sales-Automation.pdf"
        zipName="AI-Powered-Outbound-Sales-Automation.pdf"
        title="Download Free feature Guide"
        workflowType="sales_workflow"
      />
    </section>
  );
});

SalesPodShowcase.displayName = "SalesPodShowcase";

