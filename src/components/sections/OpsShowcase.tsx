"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Settings, 
  MessageSquare, 
  Share2, 
  Bell, 
  CheckCircle2, 
  ArrowRight, 
  Network,
  Cpu,
  Zap,
  Globe,
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
    title: "Workflow Automation", 
    desc: "Monitor and automate operational workflows.",
    icon: <Globe size={16} /> 
  },
  { 
    title: "Approval Tracking", 
    desc: "Track approvals and process execution centrally.",
    icon: <Share2 size={16} /> 
  },
  { 
    title: "Intelligent Operations", 
    desc: "Manage intelligent business operations at scale.",
    icon: <Network size={16} /> 
  },
  { 
    title: "Process Control", 
    desc: "Eliminate operational bottlenecks with an AI-driven command center.",
    icon: <Bell size={16} /> 
  },
];

const opsCarouselImages = [
  { 
    id: 1, 
    title: "Procurement Command Center", 
    description: "Automated purchase flows and vendor management.",
    imageUrl: "/images/showcase/ops/ops-1.png", 
    category: "OPERATIONS COMMAND CENTER"
  },
  { 
    id: 2, 
    title: "Supply Chain Intelligence", 
    description: "Real-time tracking of logistics and procurement cycles.",
    imageUrl: "/images/showcase/ops/ops-2.png",
    category: "PROCESS AUTOMATION"
  },
  { 
    id: 3, 
    title: "Property Management Hub", 
    description: "Intelligent asset and facility orchestration.",
    imageUrl: "/images/showcase/ops/ops-3.png",
    category: "FACILITY INTELLIGENCE"
  },
  { 
    id: 4, 
    title: "Asset Lifecycle Control", 
    description: "Comprehensive tracking of high-value infrastructure.",
    imageUrl: "/images/showcase/ops/ops-4.png",
    category: "OPERATIONAL AUDIT"
  },
  { 
    id: 5, 
    title: "Expense Intelligence Layer", 
    description: "Automated financial process and claim verification.",
    imageUrl: "/images/showcase/ops/ops-5.png",
    category: "FINANCIAL AUTOMATION"
  },
  { 
    id: 6, 
    title: "Budgetary Control Panel", 
    description: "Real-time expenditure monitoring and forecasting.",
    imageUrl: "/images/showcase/ops/ops-6.png",
    category: "COST EFFICIENCY"
  },
];

export const OpsShowcase = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const isMobile = useMobile(1024);
  return (
    <section 
      id="ops-section"
      className="ops-section"
      style={{ 
        position: "relative",
        overflow: "hidden",
        background: "transparent",
        minHeight: "auto"
      }}
    >
      <style jsx>{`
        .ops-section {
          padding: 64px 32px 72px;
        }
        @media (max-width: 1024px) {
          .ops-section {
            padding: 40px 16px 56px;
          }
        }
      `}</style>
      {/* ── CINEMATIC AMBIENT INFRASTRUCTURE (Animated Beams) ── */}
      
      {/* Primary Flow Beam */}
      <motion.div 
        animate={isMobile ? { opacity: 0.03 } : { 
          x: [-30, 30, -30],
          opacity: [0.03, 0.06, 0.03]
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "-20%",
          left: "5%",
          width: "90%",
          height: "150%",
          background: `linear-gradient(115deg, transparent 20%, ${C.green}18 50%, transparent 80%)`,
          filter: isMobile ? "blur(80px)" : "blur(140px)",
          zIndex: 0,
          pointerEvents: "none",
          transform: "rotate(-8deg)"
        }} 
      />

      {/* Blue Ambient Detail */}
      <div style={{
        position: "absolute",
        top: "20%",
        right: "-5%",
        width: "40%",
        height: "60%",
        background: "radial-gradient(circle at center, rgba(109, 182, 255, 0.04) 0%, transparent 70%)",
        filter: "blur(120px)",
        zIndex: 0,
        pointerEvents: "none"
      }} />

      <div style={{
        maxWidth: "1240px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1.2fr",
        gap: isMobile ? (isPreviewOpen ? "24px" : "40px") : "60px", // Tighten gap when previewing
        alignItems: "center",
        position: "relative",
        zIndex: 1,
        transition: "gap 0.6s cubic-bezier(0.23, 1, 0.32, 1)"
      }} className="ops-showcase-grid">
        
        {/* Left Side: Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ 
            position: "relative",
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
            <Settings size={10} color={C.green} />
            <span style={{ 
              color: C.green, 
              fontSize: "10px", 
              fontWeight: 700, 
              textTransform: "uppercase", 
              letterSpacing: "0.1em" 
            }}>
              Operations Intelligence
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
            Operations Workflow <span style={{ fontFamily: F.accent, fontStyle: "italic", fontWeight: 400, color: C.green }}>Automation Pod</span>
          </h2>

          <div style={{ marginBottom: "24px" }}>
            <p style={{
              fontSize: "16px",
              color: C.txtBright,
              fontWeight: 600,
              marginBottom: "8px",
              opacity: 0.95
            }}>
              Unify your support and scale your operations.
            </p>
            <p style={{
              fontSize: "14px",
              color: C.txtBody,
              lineHeight: 1.6,
              opacity: 0.8
            }}>
              Eliminate operational bottlenecks with an AI-driven command center. ScalePods automates 
              customer support and internal task routing, delivering <span style={{ color: C.blue, fontWeight: 700 }}> instant resolution </span> 
              while centralizing your entire operational visibility.
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
              className="ops-cta"
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

        {/* Right Side: High-Fidelity Interface Stack (Fixed Height for Morphing) */}
        <div style={{ 
          position: "relative", 
          width: "100%", 
          height: isMobile ? (isPreviewOpen ? "480px" : "400px") : "480px", 
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
                  boxShadow: isMobile ? "0 20px 40px rgba(0,0,0,0.3)" : `0 40px 100px rgba(0,0,0,0.5), inset 0 0 40px rgba(109, 182, 255, 0.03)`,
                  backdropFilter: isMobile ? "blur(12px)" : G.blur,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column"
                }}>
                  {/* Top Reflection Rim Light */}
                  <div style={{
                    position: "absolute",
                    top: 0, left: "10%", right: "10%",
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
                      <h3 style={{ color: C.txtBright, fontSize: "18px", fontWeight: 700, margin: 0 }}>Omnichannel Hub</h3>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "4px" }}>
                        <div style={{ width: "6px", height: "6px", background: C.green, borderRadius: "50%", boxShadow: `0 0 10px ${C.green}` }} />
                        <p style={{ color: C.txtBody, fontSize: "12px", margin: 0, opacity: 0.6 }}>AI Workflow: Continuous</p>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <div style={{ background: "rgba(109, 182, 255, 0.08)", borderRadius: "8px", padding: "6px 12px", border: `1px solid ${C.blue}22` }}>
                        <span style={{ color: C.blue, fontSize: "11px", fontWeight: 700 }}>98.4% Resolution</span>
                      </div>
                    </div>
                  </div>

                  {/* Operational Metrics Cards */}
                  <div style={{ 
                    display: "grid", 
                    gridTemplateColumns: "1fr 1fr", 
                    gap: isMobile ? "8px" : "16px", 
                    marginBottom: isMobile ? "20px" : "32px" 
                  }}>
                    <div style={{ 
                      padding: "16px", 
                      background: "rgba(255,255,255,0.02)", 
                      borderRadius: "16px", 
                      border: "1px solid rgba(255,255,255,0.04)",
                      backdropFilter: "blur(8px)"
                    }}>
                      <div style={{ fontSize: "10px", color: C.txtBody, opacity: 0.6, textTransform: "uppercase", marginBottom: "4px" }}>Active Tickets</div>
                      <div style={{ fontSize: "22px", fontWeight: 800, color: C.txtBright }}>1,242</div>
                    </div>
                    <div style={{ 
                      padding: "16px", 
                      background: "rgba(255,255,255,0.02)", 
                      borderRadius: "16px", 
                      border: "1px solid rgba(255,255,255,0.04)",
                      backdropFilter: "blur(8px)"
                    }}>
                      <div style={{ fontSize: "10px", color: C.txtBody, opacity: 0.6, textTransform: "uppercase", marginBottom: "4px" }}>Response Time</div>
                      <div style={{ fontSize: "22px", fontWeight: 800, color: C.green }}>0.4s</div>
                    </div>
                  </div>

                  {/* Omnichannel Activity Feed */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {[
                      { type: "WhatsApp", action: "Order Tracking Auto-Reply", status: "Resolved", time: "Just now" },
                      { type: "Email", action: "Subscription Refund Request", status: "AI Routing", time: "2m ago" },
                      { type: "Web Chat", action: "Technical FAQ Inquiry", status: "Resolved", time: "5m ago" },
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
                            background: i === 1 ? "rgba(109, 182, 255, 0.1)" : "rgba(172, 215, 145, 0.1)", 
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "center" 
                          }}>
                            <MessageSquare size={14} color={i === 1 ? C.blue : C.green} />
                          </div>
                          <div>
                            <div style={{ fontSize: "13px", fontWeight: 600, color: C.txtBright }}>{item.type}</div>
                            <div style={{ fontSize: "11px", color: C.txtBody, opacity: 0.6 }}>{item.action}</div>
                          </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontSize: "10px", fontWeight: 700, color: item.status === "Resolved" ? C.green : C.blue, textTransform: "uppercase" }}>{item.status}</div>
                          <div style={{ fontSize: "10px", color: C.txtBody, opacity: 0.4 }}>{item.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Floating Element: AI Routing Node */}
                  <motion.div 
                    animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      position: "absolute",
                      bottom: "-30px",
                      right: "40px",
                      background: "rgba(10, 12, 16, 0.5)",
                      padding: "16px 24px",
                      borderRadius: "20px",
                      border: `1px solid rgba(172, 215, 145, 0.3)`,
                      boxShadow: `0 20px 50px rgba(0,0,0,0.5), inset 0 0 15px rgba(172, 215, 145, 0.05)`,
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      zIndex: 3,
                      backdropFilter: "blur(24px)"
                    }}
                  >
                    <div style={{ position: "relative" }}>
                      <Cpu size={18} color={C.green} />
                      <motion.div 
                        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                        style={{ position: "absolute", inset: -4, background: C.green, borderRadius: "50%", zIndex: -1, filter: "blur(8px)" }}
                      />
                    </div>
                    <span style={{ fontSize: "12px", fontWeight: 700, color: C.txtBright }}>Routing Active</span>
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
                  <ThreeDCarousel items={opsCarouselImages} autoRotate={true} tightLayout={true} cardScale={1.1} />
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
        .ops-cta:hover {
          transform: translateY(-2px);
          border-color: ${C.blue} !important;
          background: rgba(109, 182, 255, 0.05) !important;
          box-shadow: 0 12px 30px rgba(109, 182, 255, 0.15);
        }
        @media (max-width: 1024px) {
          .ops-showcase-grid {
            grid-template-columns: 1fr !important;
            gap: 60px !important;
            text-align: center;
          }
          .ops-showcase-grid > div {
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
        zipFile="/downloads/ops-guide.pdf"
        zipName="ops-guide.pdf"
        title="Download Operations Workflow Guide"
      />
    </section>
  );
};
