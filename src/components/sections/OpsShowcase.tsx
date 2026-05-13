"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  Workflow, 
  Settings, 
  CheckCircle2, 
  ArrowRight, 
  Zap,
  Layers,
  Cpu,
  MessageSquare,
  Mail,
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
    title: "Omnichannel Hub", 
    desc: "Unified control of WhatsApp, Email, and CRM communications.",
    icon: <MessageSquare size={16} /> 
  },
  { 
    title: "AI Triage System", 
    desc: "Automated intent recognition and priority-based routing.",
    icon: <Cpu size={16} /> 
  },
  { 
    title: "Order Flow Control", 
    desc: "Autonomous management of fulfillment and logistics pipelines.",
    icon: <Workflow size={16} /> 
  },
  { 
    title: "Real-time Monitoring", 
    desc: "Live visibility into operational velocity and bottleneck detection.",
    icon: <BarChart3 size={16} /> 
  },
];

const opsCarouselImages = [
  { 
    id: 1, 
    title: "Omnichannel Command", 
    description: "Sync WhatsApp, Email, and CRM in real-time.",
    imageUrl: "/images/showcase/ops/ops-1.png", 
    category: "UNIFIED COMMS"
  },
  { 
    id: 2, 
    title: "Supply Chain Sync", 
    description: "Automated logistics and fulfillment tracking.",
    imageUrl: "/images/showcase/ops/ops-2.png",
    category: "LOGISTICS ENGINE"
  },
  { 
    id: 3, 
    title: "Support Triage", 
    description: "AI intent routing for customer queries.",
    imageUrl: "/images/showcase/ops/ops-3.png",
    category: "ROUTING INTELLIGENCE"
  },
  { 
    id: 4, 
    title: "Warehouse Control", 
    description: "Autonomous inventory and stock management.",
    imageUrl: "/images/showcase/ops/ops-4.png",
    category: "INVENTORY OPS"
  },
  { 
    id: 5, 
    title: "Pipeline Dashboard", 
    description: "End-to-end operational visibility.",
    imageUrl: "/images/showcase/ops/ops-5.png",
    category: "STRATEGIC OPS"
  },
  { 
    id: 6, 
    title: "Order Automation", 
    description: "Manage 10,000+ orders with zero manual touch.",
    imageUrl: "/images/showcase/ops/ops-6.png",
    category: "FULFILLMENT POD"
  },
  { 
    id: 7, 
    title: "Integrations Layer", 
    description: "Connect 2000+ apps into one operational DNA.",
    imageUrl: "/images/showcase/ops/ops-7.png",
    category: "INFRASTRUCTURE"
  },
];

const StatIconSize = 14;

export const OpsShowcase = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const isMobile = useMobile(1023);
  return (
    <section 
      id="ops-section"
      className="ops-section"
      style={{ 
        position: "relative",
        overflow: "visible",
        background: "transparent",
        minHeight: "auto"
      }}
    >
      <style jsx>{`
        .ops-section {
          padding: 64px 32px 72px;
        }
        @media (max-width: 1023px) {
          .ops-section {
            padding: 40px 16px 56px;
          }
        }
      `}</style>
      {/* ── CINEMATIC AMBIENT INFRASTRUCTURE (Animated Beams) ── */}
      
      {/* Primary Flow Beam */}
      <motion.div 
        animate={isMobile ? { opacity: 0.04 } : { 
          x: [-40, 40, -40],
          opacity: [0.04, 0.08, 0.04]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "-30%",
          left: "-10%",
          width: "100%",
          height: "160%",
          background: `linear-gradient(135deg, transparent 20%, ${C.blue}20 50%, transparent 80%)`,
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
        gridTemplateColumns: isMobile ? "1fr" : "1.3fr 1fr",
        gap: isMobile ? (isPreviewOpen ? "24px" : "40px") : "60px", 
        alignItems: "center",
        position: "relative",
        zIndex: 1,
        transition: "gap 0.6s cubic-bezier(0.23, 1, 0.32, 1)"
      }} className="ops-showcase-grid">
        
        {/* Left Side: Content */}
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
            background: "rgba(109, 182, 255, 0.08)",
            border: `1px solid rgba(109, 182, 255, 0.15)`,
            borderRadius: "100px",
            marginBottom: "20px"
          }}>
            <Settings size={10} color={C.blue} />
            <span style={{ 
              color: C.blue, 
              fontSize: "10px", 
              fontWeight: 700, 
              textTransform: "uppercase", 
              letterSpacing: "0.1em" 
            }}>
              Operations Efficiency
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
            Operations <span style={{ fontFamily: F.accent, fontStyle: "italic", fontWeight: 400, color: C.green }}>Workflow Pod</span>
          </h2>

          <div style={{ marginBottom: "24px" }}>
            <p style={{
              fontSize: "16px",
              color: C.txtBright,
              fontWeight: 600,
              marginBottom: "8px",
              opacity: 0.95
            }}>
              24/7 autonomous management for your entire logistics and order engine.
            </p>
            <p style={{
              fontSize: "14px",
              color: C.txtBody,
              lineHeight: 1.6,
              opacity: 0.8
            }}>
              ScalePods transforms complex operations into streamlined AI-driven pipelines. 
              Our pods manage everything from omnichannel customer triage to multi-step 
              fulfillment, ensuring <span style={{ color: C.blue, fontWeight: 700 }}> total process reliability </span> 
              without human bottlenecking.
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
              Download Workflow Guide <Download size={18} />
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

        {/* Right Side: High-Fidelity Interface Stack */}
        <div style={{ 
          position: "relative", 
          width: "100%", 
          height: isMobile ? (isPreviewOpen ? "600px" : "540px") : "480px", 
          perspective: "1200px",
          order: isMobile ? 2 : 2,
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
                    top: 0, left: "20%", right: "20%",
                    height: "1px",
                    background: `linear-gradient(90deg, transparent, rgba(109, 182, 255, 0.3), transparent)`,
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
                      <h3 style={{ color: C.txtBright, fontSize: "18px", fontWeight: 700, margin: 0 }}>Ops Intelligence</h3>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "4px" }}>
                        <div style={{ width: "6px", height: "6px", background: C.blue, borderRadius: "50%", boxShadow: `0 0 10px ${C.blue}` }} />
                        <p style={{ color: C.txtBody, fontSize: "12px", margin: 0, opacity: 0.6 }}>Pod Status: 100% Autonomous</p>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <div style={{ background: "rgba(109, 182, 255, 0.1)", borderRadius: "8px", padding: "6px 12px", border: `1px solid ${C.blue}22` }}>
                        <span style={{ color: C.blue, fontSize: "11px", fontWeight: 700 }}>v3.4 Activated</span>
                      </div>
                    </div>
                  </div>

                  {/* Order Pipeline Visual */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
                    {[
                      { channel: "WhatsApp", action: "Order Triage", status: "Processed", time: "2s ago" },
                      { channel: "Email", action: "Refund Intent", status: "Routing", time: "Just now" },
                      { channel: "System", action: "Stock Balancing", status: "Syncing", time: "5s ago" },
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
                            background: item.channel === "WhatsApp" ? "rgba(37, 211, 102, 0.1)" : "rgba(109, 182, 255, 0.1)", 
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "center" 
                          }}>
                            {item.channel === "WhatsApp" ? <MessageSquare size={14} color="#25D366" /> : <Mail size={14} color={C.blue} />}
                          </div>
                          <div>
                            <div style={{ fontSize: "13px", fontWeight: 600, color: C.txtBright }}>{item.action}</div>
                            <div style={{ fontSize: "11px", color: C.txtBody, opacity: 0.6 }}>Source: {item.channel}</div>
                          </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontSize: "10px", fontWeight: 700, color: C.green, textTransform: "uppercase" }}>{item.status}</div>
                          <div style={{ fontSize: "10px", color: C.txtBody, opacity: 0.4 }}>{item.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Performance Velocity Placeholder */}
                  <div style={{ 
                    padding: "20px", 
                    background: "rgba(172, 215, 145, 0.03)", 
                    borderRadius: "20px", 
                    border: "1px solid rgba(172, 215, 145, 0.1)",
                    position: "relative",
                    overflow: "hidden"
                  }}>
                    <div style={{ display: "flex", justifyItems: "space-between", alignItems: "center", marginBottom: "12px" }}>
                      <span style={{ fontSize: "12px", fontWeight: 600, color: C.txtBright }}>Operational Velocity</span>
                      <Zap size={14} color={C.green} />
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "40px" }}>
                      {[40, 60, 45, 80, 70, 95, 100].map((h, i) => (
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

                  {/* Floating Element: AI Routing Badge */}
                  <motion.div 
                    animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      position: "absolute",
                      bottom: isMobile ? "10px" : "-30px",
                      right: isMobile ? "10px" : "40px",
                      background: "rgba(10, 12, 16, 0.7)",
                      padding: isMobile ? "10px 16px" : "16px 24px",
                      borderRadius: "16px",
                      border: `1px solid rgba(172, 215, 145, 0.35)`,
                      boxShadow: `0 20px 50px rgba(0,0,0,0.5), inset 0 0 15px rgba(172, 215, 145, 0.05)`,
                      display: "flex",
                      alignItems: "center",
                      gap: isMobile ? "8px" : "14px",
                      zIndex: 10,
                      backdropFilter: "blur(24px)",
                      scale: isMobile ? 0.85 : 1,
                      transformOrigin: "bottom right",
                      willChange: "transform, opacity"
                    }}
                  >
                    <div style={{ position: "relative" }}>
                      <Cpu size={isMobile ? 14 : 18} color={C.green} />
                      <motion.div 
                        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                        style={{ position: "absolute", inset: -4, background: C.green, borderRadius: "50%", zIndex: -1, filter: "blur(8px)" }}
                      />
                    </div>
                    <span style={{ fontSize: isMobile ? "10px" : "12px", fontWeight: 700, color: C.txtBright }}>Routing Active</span>
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
          box-shadow: 0 12px 30px rgba(109, 182, 255, 0.3);
          background: #C1E9A7 !important;
        }
        @media (max-width: 1023px) {
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
