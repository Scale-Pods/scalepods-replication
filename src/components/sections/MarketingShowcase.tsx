"use client";

import React, { useState, memo, useCallback } from "react";

import { motion } from "framer-motion";
import { 
  BarChart3, 
  PenTool, 
  Globe, 
  Megaphone, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Layers,
  Zap,
  Layout,
  Download,
  ChevronDown,
  ChevronUp
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
  bgCard: "var(--color-bg-card)",
  bgPage: "var(--color-bg-page)" };

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
    title: "AI Content Engine", 
    desc: "Autonomous generation of blogs, social posts, and ad copies.",
    icon: <Sparkles size={16} /> 
  },
  { 
    title: "Campaign Orchestration", 
    desc: "Multi-channel execution with automated scheduling and tracking.",
    icon: <Megaphone size={16} /> 
  },
  { 
    title: "Landing Page Factory", 
    desc: "Rapid deployment of high-converting, AI-optimized landing pages.",
    icon: <Layout size={16} /> 
  },
  { 
    title: "Analytics Intelligence", 
    desc: "Real-time performance tracking and automated campaign tuning.",
    icon: <BarChart3 size={16} /> 
  },
];

const marketingCarouselImages = [
  { 
    id: 1, 
    title: "Marketing Intelligence", 
    heading: "Content Strategy Hub",
    subtitle: "Deep audience intent and sentiment mapping.",
    description: "Analyze market trends and customer behavior in real-time with AI-driven intelligence.",
    imageUrl: "/images/showcase/marketing/marketing-1.png", 
    systemLabel: "MARKETING OS"
  },
  { 
    id: 2, 
    title: "Campaign Orchestration", 
    heading: "Growth Loop Automator",
    subtitle: "Multi-channel automated marketing execution.",
    description: "Orchestrate complex campaigns across all platforms with zero manual scheduling.",
    imageUrl: "/images/showcase/marketing/marketing-2.png",
    systemLabel: "CAMPAIGN ENGINE"
  },
  { 
    id: 3, 
    title: "Performance Analytics", 
    heading: "ROI Performance Dashboard",
    subtitle: "Real-time conversion and engagement tracking.",
    description: "Monitor campaign efficacy and optimize spend automatically for maximum growth.",
    imageUrl: "/images/showcase/marketing/marketing-3.png",
    systemLabel: "ANALYTICS HUB"
  },
  { 
    id: 4, 
    title: "Growth Funnel Control", 
    heading: "Lead Nurturing Pod",
    subtitle: "Autonomous high-volume funnel management.",
    description: "Scale your lead qualification and nurturing workflows with intelligent AI agents.",
    imageUrl: "/images/showcase/marketing/marketing-4.png",
    systemLabel: "GROWTH ARCHITECTURE"
  },
  { 
    id: 5, 
    title: "Asset Repository", 
    heading: "Creative Asset Manager",
    subtitle: "Centralized AI-driven creative orchestration.",
    description: "Manage and deploy brand assets across all channels with perfect consistency.",
    imageUrl: "/images/showcase/marketing/marketing-5.png",
    systemLabel: "CREATIVE POD"
  },
  { 
    id: 6, 
    title: "Engagement Monitoring", 
    heading: "User Interaction Tracking",
    subtitle: "Track touchpoints across the customer journey.",
    description: "Deep visibility into how users interact with your brand across the entire digital landscape.",
    imageUrl: "/images/showcase/marketing/marketing-6.png",
    systemLabel: "UX INTELLIGENCE"
  },
  { 
    id: 7, 
    title: "Workflow Automation", 
    heading: "End-to-End Pipeline Pod",
    subtitle: "Full-stack marketing process autonomy.",
    description: "Eliminate manual production lag with a fully automated marketing execution engine.",
    imageUrl: "/images/showcase/marketing/marketing-7.png",
    systemLabel: "EFFICIENCY ENGINE"
  },
];

const StatIconSize = 14;

export const MarketingShowcase = memo(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const isMobile = useMobile(1023);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <section 
      id="marketing-showcase"
      className="marketing-section"
      style={{ 
        position: "relative",
        overflow: "visible",
        background: "transparent",
        minHeight: "auto",
        touchAction: "pan-y",
        WebkitOverflowScrolling: "touch"
      }}
    >
      <div id="ai-outreach" style={{ position: "absolute", top: 0 }} />


      <style jsx>{`
        .marketing-section {
          padding: 64px 32px 72px;
        }
        @media (max-width: 1023px) {
          .marketing-section {
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
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
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
        gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr",
        gap: isMobile ? (isPreviewOpen ? "24px" : "40px") : "60px", 
        alignItems: "center",
        position: "relative",
        zIndex: 1,
        transition: "gap 0.6s cubic-bezier(0.23, 1, 0.32, 1)"
      }} className="marketing-showcase-grid">
        
        {/* Left Side: High-Fidelity Interface Stack (Order 1 on Desktop, 2 on Mobile) */}
        <div style={{ 
          position: "relative", 
          width: "100%", 
          minHeight: isMobile ? (isPreviewOpen ? "600px" : "540px") : "540px",
          paddingTop: isMobile ? "0" : "0",


          height: "auto",
          perspective: "1200px",
          order: isMobile ? 2 : 1,
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
                      <h3 style={{ color: C.txtBright, fontSize: "18px", fontWeight: 700, margin: 0 }}>Content Pipeline</h3>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "4px" }}>
                        <div style={{ width: "6px", height: "6px", background: C.green, borderRadius: "50%", boxShadow: `0 0 10px ${C.green}` }} />
                        <p style={{ color: C.txtBody, fontSize: "12px", margin: 0, opacity: 0.6 }}>Campaign Engine: Optimizing</p>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <div style={{ background: "rgba(var(--color-green-rgb), 0.1)", borderRadius: "8px", padding: "6px 12px", border: `1px solid rgba(var(--color-green-rgb), 0.2)` }}>
                        <span style={{ color: C.green, fontSize: "11px", fontWeight: 700 }}>+420% Growth</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
                    {[
                      { type: "Social Post", title: "ScalePods Ecosystem Reveal", status: "Published", reach: "12.4k" },
                      { type: "Blog Post", title: "The Future of AI Managed Pods", status: "Generating", reach: "Pending" },
                      { type: "Email Campaign", title: "Enterprise Automation Guide", status: "Queued", reach: "4.2k" },
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
                            background: item.status === "Published" ? "rgba(var(--color-green-rgb), 0.1)" : "var(--color-bg-card)", 
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "center",
                            border: `1px solid var(--color-border)`
                          }}>
                            <Layout size={14} color={item.status === "Published" ? C.green : C.txtBody} />
                          </div>
                          <div>
                            <div style={{ fontSize: "13px", fontWeight: 600, color: C.txtBright }}>{item.type}</div>
                            <div style={{ fontSize: "11px", color: C.txtBody, opacity: 0.6 }}>{item.title}</div>
                          </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontSize: "10px", fontWeight: 700, color: item.status === "Published" ? C.green : C.blue, textTransform: "uppercase" }}>{item.status}</div>
                          <div style={{ fontSize: "10px", color: C.txtBody, opacity: 0.4 }}>{item.reach} reach</div>
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
                      <span style={{ fontSize: "12px", fontWeight: 600, color: C.txtBright }}>Performance Velocity</span>
                      <BarChart3 size={14} color={C.blue} />
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "40px" }}>
                      {[30, 45, 35, 60, 80, 55, 90].map((h, i) => (
                        <motion.div 
                          key={i}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1, duration: 1 }}
                          style={{ flex: 1, background: i === 6 ? C.green : C.blue, borderRadius: "2px", opacity: i === 6 ? 1 : 0.4 }} 
                        />
                      ))}

                    </div>
                  </div>

                  <motion.div 
                    animate={{ rotate: [0, 5, 0], y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      position: "absolute",
                      top: isMobile ? "-20px" : "-30px",
                      right: isMobile ? "20px" : "30px",
                      background: "var(--color-glass-bg)",
                      padding: isMobile ? "12px 20px" : "16px 24px",
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
                        animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.8, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ position: "absolute", inset: -4, background: "var(--green-glow-40)", borderRadius: "50%", filter: "blur(8px)", zIndex: -1 }}
                      />
                    </div>
                    <span style={{ fontSize: isMobile ? "10px" : "12px", fontWeight: 700, color: C.txtBright }}>AI Creative Agent</span>
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
                <ThreeDCarousel items={marketingCarouselImages} autoRotate={true} />
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
            background: "var(--color-glass-bg)", backdropFilter: "blur(16px)",
            border: "1px solid var(--color-glass-border)",
            borderRadius: "100px",
            marginBottom: "20px"
          }}>
            <PenTool size={10} color={C.green} />
            <span style={{ 
              color: C.green, 
              fontSize: "10px", 
              fontWeight: 700, 
              textTransform: "uppercase", 
              letterSpacing: "0.1em" 
            }}>
              Marketing Intelligence
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
            Marketing <span style={{ fontFamily: F.accent, fontStyle: "italic", fontWeight: 400, color: C.green }}>Automation Pod</span>
          </h2>

          <div style={{ marginBottom: "24px" }}>
            <p style={{
              fontSize: "16px",
              color: C.txtBright,
              fontWeight: 600,
              marginBottom: "8px",
              opacity: 0.95
            }}>
              Turn your marketing into an autonomous growth engine.
            </p>
            <p style={{
              fontSize: "14px",
              color: C.txtBody,
              lineHeight: 1.6,
              opacity: 0.8
            }}>
              ScalePods automates the entire content and campaign lifecycle. From generating 
              SEO-driven blogs to executing multi-channel social campaigns, our AI engine 
              delivers <span style={{ color: C.green, fontWeight: 700 }}> constant engagement </span> 
              with zero manual production lag.
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
              Download Free Feature Guide <Download size={18} />
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
      </div>

      <style jsx>{`
        .marketing-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(var(--color-green-rgb), 0.3);
          background: #C1E9A7 !important;
        }
        @media (max-width: 1023px) {
          .marketing-showcase-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 60px !important;
            text-align: center;
          }
          .marketing-showcase-grid > div {
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
        zipFile="/downloads/marketing-guide.pdf"
        zipName="marketing-guide.pdf"
        title="Download Free Marketing Workflow Guide"
      />
    </section>
  );
});

MarketingShowcase.displayName = "MarketingShowcase";

