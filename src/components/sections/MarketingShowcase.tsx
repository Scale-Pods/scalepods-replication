"use client";

import React, { useState } from "react";
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
    description: "Deep content analysis and audience intent mapping.",
    imageUrl: "/images/showcase/marketing/marketing-1.png", 
    category: "MARKETING AUTOMATION"
  },
  { 
    id: 2, 
    title: "Campaign Orchestration", 
    description: "Multi-channel automated growth loops.",
    imageUrl: "/images/showcase/marketing/marketing-2.png",
    category: "CAMPAIGN INTELLIGENCE"
  },
  { 
    id: 3, 
    title: "Performance Analytics", 
    description: "Real-time conversion tracking and ROI monitoring.",
    imageUrl: "/images/showcase/marketing/marketing-3.png",
    category: "CONTENT PERFORMANCE"
  },
  { 
    id: 4, 
    title: "Growth Funnel Control", 
    description: "Manage high-volume lead nurturing automatically.",
    imageUrl: "/images/showcase/marketing/marketing-4.png",
    category: "GROWTH ARCHITECTURE"
  },
  { 
    id: 5, 
    title: "Asset Repository", 
    description: "Centralized AI-driven creative management.",
    imageUrl: "/images/showcase/marketing/marketing-5.png",
    category: "CREATIVE AUTOMATION"
  },
  { 
    id: 6, 
    title: "Engagement Monitoring", 
    description: "Track user interactions across all touchpoints.",
    imageUrl: "/images/showcase/marketing/marketing-6.png",
    category: "USER EXPERIENCE"
  },
  { 
    id: 7, 
    title: "Workflow Automation", 
    description: "End-to-end marketing pipeline execution.",
    imageUrl: "/images/showcase/marketing/marketing-7.png",
    category: "PIPELINE EFFICIENCY"
  },
];

const StatIconSize = 14;

export const MarketingShowcase = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const isMobile = useMobile(1024);
  return (
    <section 
      id="marketing-section"
      className="marketing-section"
      style={{ 
        position: "relative",
        overflow: "hidden",
        background: "transparent",
        minHeight: "auto"
      }}
    >
      <style jsx>{`
        .marketing-section {
          padding: 64px 32px 72px;
        }
        @media (max-width: 1024px) {
          .marketing-section {
            padding: 40px 16px 56px;
          }
        }
      `}</style>
      {/* ── CINEMATIC AMBIENT INFRASTRUCTURE (Animated Beams) ── */}
      
      {/* Primary Flow Beam */}
      <motion.div 
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
          background: `linear-gradient(135deg, transparent 20%, ${C.green}20 50%, transparent 80%)`,
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
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1.3fr",
        gap: isMobile ? (isPreviewOpen ? "24px" : "40px") : "60px", // Tighten gap when previewing
        alignItems: "center",
        position: "relative",
        zIndex: 1,
        transition: "gap 0.6s cubic-bezier(0.23, 1, 0.32, 1)"
      }} className="marketing-showcase-grid">
        
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
            background: "rgba(172, 215, 145, 0.08)",
            border: `1px solid rgba(172, 215, 145, 0.15)`,
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
              className="marketing-cta"
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
          width: "100%", 
          height: isMobile ? (isPreviewOpen ? "560px" : "420px") : "480px", 
          perspective: "1200px",
          order: isMobile ? 2 : 1,
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
                    top: 0, left: "20%", right: "20%",
                    height: "1px",
                    background: `linear-gradient(90deg, transparent, rgba(172, 215, 145, 0.3), transparent)`,
                    pointerEvents: "none"
                  }} />

                  {/* Dashboard Header */}
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
                      <div style={{ background: "rgba(172, 215, 145, 0.1)", borderRadius: "8px", padding: "6px 12px", border: `1px solid ${C.green}22` }}>
                        <span style={{ color: C.green, fontSize: "11px", fontWeight: 700 }}>+420% Growth</span>
                      </div>
                    </div>
                  </div>

                  {/* Content Queue Visual */}
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
                        background: "rgba(255,255,255,0.015)",
                        borderRadius: "16px",
                        border: "1px solid rgba(255,255,255,0.04)",
                        backdropFilter: "blur(4px)"
                      }}>
                        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                          <div style={{ 
                            width: "32px", 
                            height: "32px", 
                            borderRadius: "8px", 
                            background: item.status === "Published" ? "rgba(172, 215, 145, 0.1)" : "rgba(255,255,255,0.05)", 
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "center" 
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

                  {/* Mini Analytics Chart Placeholder */}
                  <div style={{ 
                    padding: "20px", 
                    background: "rgba(109, 182, 255, 0.03)", 
                    borderRadius: "20px", 
                    border: "1px solid rgba(109, 182, 255, 0.1)",
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
                          transition={{ delay: i * 0.1, duration: 1 }}
                          style={{ flex: 1, background: i === 6 ? C.green : C.blue, borderRadius: "2px", opacity: i === 6 ? 1 : 0.4 }} 
                        />
                      ))}
                    </div>
                  </div>

                  {/* Floating Element: AI Content Sparkle */}
                  <motion.div 
                    animate={{ rotate: [0, 5, 0], y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      position: "absolute",
                      top: "-30px",
                      right: "30px",
                      background: "rgba(10, 12, 16, 0.6)",
                      padding: "16px 24px",
                      borderRadius: "20px",
                      border: `1px solid rgba(172, 215, 145, 0.35)`,
                      boxShadow: `0 20px 50px rgba(0,0,0,0.5), inset 0 0 15px rgba(172, 215, 145, 0.05)`,
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      zIndex: 3,
                      backdropFilter: "blur(24px)"
                    }}
                  >
                    <div style={{ position: "relative" }}>
                      <Zap size={18} color={C.green} />
                      <motion.div 
                        animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.8, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ position: "absolute", inset: -4, background: C.green, borderRadius: "50%", filter: "blur(8px)", zIndex: -1 }}
                      />
                    </div>
                    <span style={{ fontSize: "12px", fontWeight: 700, color: C.txtBright }}>AI Creative Agent</span>
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
                  <ThreeDCarousel items={marketingCarouselImages} autoRotate={true} tightLayout={true} cardScale={1.1} />
                </div>
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  style={{
                    position: "absolute", inset: "-60px", background: `radial-gradient(circle at center, ${C.green}15 0%, transparent 70%)`,
                    zIndex: -1, pointerEvents: "none"
                  }} 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style jsx>{`
        .marketing-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(172, 215, 145, 0.3);
          background: #C1E9A7 !important;
        }
        @media (max-width: 1024px) {
          .marketing-showcase-grid {
            grid-template-columns: 1fr !important;
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
        title="Download Marketing Workflow Guide"
      />
    </section>
  );
};
