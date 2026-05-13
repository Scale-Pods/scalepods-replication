"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Zap, 
  Target, 
  TrendingUp, 
  MessageSquare, 
  CheckCircle2, 
  ArrowRight, 
  PieChart, 
  Activity,
  Download,
  Eye,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { ThreeDCarousel } from "@/components/lightswind/3d-carousel";
import { useMobile } from "@/lib/hooks";
import DownloadModal from "@/components/ui/DownloadModal";

const C = {
  green: "#ACD791",
  greenBright: "#8DC763",
  blue: "#6DB6FF",
  txtBright: "#E4E9F2",
  txtBody: "#B8C7D9",
  border: "rgba(255,255,255,0.08)",
  bgCard: "rgba(8, 10, 14, 0.75)",
  bgInput: "rgba(255, 255, 255, 0.03)",
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
    title: "AI Lead Sourcing", 
    desc: "Real-time extraction & verification of ICP-aligned leads.",
    icon: <Target size={16} /> 
  },
  { 
    title: "Multi-Channel Outreach", 
    desc: "Personalized Email, WhatsApp & Voice at scale.",
    icon: <MessageSquare size={16} /> 
  },
  { 
    title: "Intelligent CRM Sync", 
    desc: "Zero manual data entry. Auto-updates based on intent.",
    icon: <Activity size={16} /> 
  },
  { 
    title: "Meeting Booking Engine", 
    desc: "Automated follow-ups that lead to booked calendar events.",
    icon: <TrendingUp size={16} /> 
  },
];

const StatIconSize = 14;

const salesCarouselImages = [
  { 
    id: 1, 
    title: "Lead Pipeline Dashboard", 
    description: "Real-time AI lead qualification workflow.",
    imageUrl: "/images/showcase/sales/Sales tool 1.png" 
  },
  { 
    id: 2, 
    title: "Outreach Automation", 
    description: "Automated multi-channel outreach & intent tracking.",
    imageUrl: "/images/showcase/sales/Sales tool 2.png" 
  },
  { 
    id: 3, 
    title: "AI Intent Recognition", 
    description: "High-precision lead scoring based on interaction signals.",
    imageUrl: "/images/showcase/sales/Sales tool 3.png" 
  },
  { 
    id: 4, 
    title: "Campaign Orchestrator", 
    description: "Centralized control for global sales automation.",
    imageUrl: "/images/showcase/sales/Sales tool 4.png" 
  },
  { 
    id: 5, 
    title: "Revenue Intelligence", 
    description: "Performance metrics and ROI projection engine.",
    imageUrl: "/images/showcase/sales/Sales tool 5.png" 
  },
];

export const SalesPodShowcase = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const isMobile = useMobile(1024);
  return (
    <section 
      id="sales-pod-showcase"
      className="sales-pod-section"
      style={{ 
        position: "relative",
        overflow: "hidden",
        background: "transparent",
        minHeight: "auto"
      }}
    >
      <style jsx>{`
        .sales-pod-section {
          padding: 64px 32px 72px;
        }
        @media (max-width: 1024px) {
          .sales-pod-section {
            padding: 40px 16px 56px;
          }
        }
      `}</style>
      {/* ── CINEMATIC AMBIENT INFRASTRUCTURE (Animated Beams) ── */}
      
      {/* Primary Diagonal Flow Beam - Highly visible through glass */}
      <motion.div 
        animate={isMobile ? { opacity: 0.04 } : { 
          x: [-30, 30, -30],
          opacity: [0.04, 0.08, 0.04]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "-30%",
          left: "5%",
          width: "90%",
          height: "160%",
          background: `linear-gradient(115deg, transparent 15%, ${C.green}25 50%, transparent 85%)`,
          filter: isMobile ? "blur(80px)" : "blur(140px)",
          zIndex: 0,
          pointerEvents: "none",
          transform: "rotate(-12deg)"
        }} 
      />

      {/* Atmospheric Glow behind Left Side */}
      <div style={{
        position: "absolute",
        top: "10%",
        left: "-10%",
        width: "50%",
        height: "80%",
        background: `radial-gradient(circle at center, ${C.green}06 0%, transparent 70%)`,
        filter: "blur(120px)",
        zIndex: 0,
        pointerEvents: "none"
      }} />

      {/* Atmospheric Glow behind Right Side */}
      <motion.div 
        animate={isMobile ? { opacity: 0.06 } : { 
          scale: [1, 1.15, 1],
          opacity: [0.06, 0.1, 0.06]
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          bottom: "-20%",
          right: "-10%",
          width: "60%",
          height: "90%",
          background: `radial-gradient(circle at center, ${C.green}0A 0%, transparent 70%)`,
          filter: isMobile ? "blur(80px)" : "blur(130px)",
          zIndex: 0,
          pointerEvents: "none"
        }} 
      />

      {/* Subtle Blue Contrast Beam (Bottom Left) */}
      <div style={{
        position: "absolute",
        bottom: "-10%",
        left: "5%",
        width: "300px",
        height: "300px",
        background: "radial-gradient(circle, rgba(109, 182, 255, 0.02) 0%, transparent 70%)",
        filter: "blur(100px)",
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
      }} className="salespod-grid">
        
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
          {/* Subtle glow specifically behind heading area */}
          <div style={{
            position: "absolute",
            top: "-40px",
            left: "-40px",
            width: "300px",
            height: "200px",
            background: `radial-gradient(circle at center, ${C.green}03 0%, transparent 70%)`,
            filter: "blur(60px)",
            zIndex: -1,
            pointerEvents: "none"
          }} />
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
            <Zap size={10} color={C.green} />
            <span style={{ 
              color: C.green, 
              fontSize: "10px", 
              fontWeight: 700, 
              textTransform: "uppercase", 
              letterSpacing: "0.1em" 
            }}>
              Sales Intelligence
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
            Sales Workflow <span style={{ fontFamily: F.accent, fontStyle: "italic", fontWeight: 400, color: C.green }}>Automation Pod</span>
          </h2>

          <div style={{ marginBottom: "24px" }}>
            <p style={{
              fontSize: "16px",
              color: C.txtBright,
              fontWeight: 600,
              marginBottom: "8px",
              opacity: 0.95
            }}>
              Stop the manual grind. Start scaling revenue.
            </p>
            <p style={{
              fontSize: "14px",
              color: C.txtBody,
              lineHeight: 1.6,
              opacity: 0.8
            }}>
              SalesPod automates the entire top-of-funnel—from sourcing to meeting booking—delivering 
              <span style={{ color: C.green, fontWeight: 700 }}> 3x more pipeline </span> with zero sales overhead.
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
              className="salespod-cta"
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

        <div style={{ 
          position: "relative", 
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
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  filter: "blur(0px)",
                  zIndex: 2
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.98, 
                  filter: "blur(12px)",
                  transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] }
                }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                style={{ 
                  position: "absolute", 
                  inset: 0, 
                  width: "100%", 
                  height: "100%" 
                }}
              >
                {/* Main Glassmorphism Dashboard Container */}
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
                    top: 0, left: "10%", right: "10%",
                    height: "1px",
                    background: `linear-gradient(90deg, transparent, rgba(172, 215, 145, 0.3), transparent)`,
                    pointerEvents: "none"
                  }} />

                  {/* Mock Header */}
                  <div style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center",
                    marginBottom: "32px"
                  }}>
                    <div>
                      <h3 style={{ color: C.txtBright, fontSize: "18px", fontWeight: 700, margin: 0, letterSpacing: "-0.01em" }}>Active Pipeline</h3>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "4px" }}>
                        <div style={{ width: "6px", height: "6px", background: C.green, borderRadius: "50%", boxShadow: `0 0 10px ${C.green}` }} />
                        <p style={{ color: C.txtBody, fontSize: "12px", margin: 0, opacity: 0.6 }}>AI Engine: Monitoring...</p>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "12px" }}>
                      <div style={{ 
                        padding: "8px 18px", 
                        background: "rgba(109, 182, 255, 0.08)", 
                        borderRadius: "10px", 
                        border: "1px solid rgba(109, 182, 255, 0.15)",
                        backdropFilter: "blur(10px)"
                      }}>
                        <span style={{ color: C.blue, fontSize: "12px", fontWeight: 700 }}>24 New Leads</span>
                      </div>
                    </div>
                  </div>

                  {/* Mock Stats Grid */}
                  <div style={{ 
                    display: "grid", 
                    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", 
                    gap: isMobile ? "12px" : "16px", 
                    marginBottom: isMobile ? "24px" : "32px" 
                  }}>
                    {[
                      { label: "Booked", value: "84", icon: <CheckCircle2 size={StatIconSize} color={C.green} /> },
                      { label: "Outreach", value: "2.4k", icon: <Activity size={StatIconSize} color={C.blue} /> },
                      { label: "Conv.", value: "18.4%", icon: <PieChart size={StatIconSize} color={C.green} /> },
                    ].map((stat, i) => (
                      <motion.div 
                        key={i} 
                        whileHover={{ y: -2, background: "rgba(255,255,255,0.04)" }}
                        style={{ 
                          background: "rgba(255,255,255,0.02)", 
                          padding: isMobile ? "12px" : "18px", 
                          borderRadius: "16px",
                          border: "1px solid rgba(255,255,255,0.06)",
                          backdropFilter: "blur(8px)",
                          transition: "all 0.3s ease"
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px", opacity: 0.6 }}>
                          {stat.icon}
                          <span style={{ fontSize: "10px", fontWeight: 600, color: C.txtBright, textTransform: "uppercase", letterSpacing: "0.05em" }}>{stat.label}</span>
                        </div>
                        <div style={{ fontSize: "24px", fontWeight: 800, color: C.txtBright }}>{stat.value}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Mock Lead Activity */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {[
                      { name: "John D.", action: "WhatsApp AI Reply", time: "2m ago", status: "Hot Lead" },
                      { name: "Sarah K.", action: "Invite Accepted", time: "15m ago", status: "Booked" },
                      { name: "Mike R.", action: "AI Intent Captured", time: "1h ago", status: "Qualified" },
                    ].map((activity, i) => (
                      <div key={i} style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "space-between",
                        padding: "14px 20px",
                        background: "rgba(255,255,255,0.015)",
                        borderRadius: "14px",
                        border: "1px solid rgba(255,255,255,0.04)",
                        backdropFilter: "blur(4px)",
                        position: "relative"
                      }}>
                        <div style={{ 
                          position: "absolute", 
                          left: 0, top: "25%", bottom: "25%", 
                          width: "2px", 
                          background: activity.status === "Booked" ? C.green : C.blue,
                          borderRadius: "0 4px 4px 0",
                          boxShadow: `0 0 15px ${activity.status === "Booked" ? C.green : C.blue}66`
                        }} />
                        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                          <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: `1px solid ${C.border}` }} />
                          <div>
                            <div style={{ fontSize: "14px", fontWeight: 600, color: C.txtBright }}>{activity.name}</div>
                            <div style={{ fontSize: "12px", color: C.txtBody, opacity: 0.6 }}>{activity.action}</div>
                          </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontSize: "11px", fontWeight: 700, color: activity.status === "Booked" ? C.green : C.blue, textTransform: "uppercase", letterSpacing: "0.02em" }}>{activity.status}</div>
                          <div style={{ fontSize: "11px", color: C.txtBody, opacity: 0.4 }}>{activity.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Floating Element: AI Pulse */}
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      position: "absolute",
                      top: "-30px",
                      right: "-12px",
                      background: "rgba(10, 12, 16, 0.4)",
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
                    <motion.div 
                      animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{ 
                        width: "10px", 
                        height: "10px", 
                        background: C.green, 
                        borderRadius: "50%",
                        boxShadow: `0 0 12px ${C.green}`
                      }} />
                    <span style={{ fontSize: "12px", fontWeight: 700, color: C.txtBright, letterSpacing: "0.02em" }}>AI Agent Scaling...</span>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="preview-layer"
                initial={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.96, 
                  filter: "blur(8px)",
                  transition: { duration: 0.4 }
                }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                style={{ 
                  position: "absolute", 
                  inset: 0, 
                  width: "100%", 
                  height: "100%",
                  zIndex: 5,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <div style={{ 
                  width: "100%", 
                  height: "100%", 
                  position: "relative",
                  overflow: "visible", 
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <ThreeDCarousel 
                    items={salesCarouselImages} 
                    autoRotate={true} 
                    tightLayout={true}
                    cardScale={1.1} // Increase size by ~10%
                  />
                </div>

                {/* Ambient Glow intensify for Preview Mode */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    position: "absolute",
                    inset: "-60px",
                    background: `radial-gradient(circle at center, ${C.green}15 0%, transparent 70%)`,
                    zIndex: -1,
                    pointerEvents: "none"
                  }} 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      <style jsx>{`
        .salespod-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(172, 215, 145, 0.3);
          background: #C1E9A7 !important;
        }
        .explore-trigger:hover {
          background: rgba(172, 215, 145, 0.15) !important;
          box-shadow: 0 0 20px rgba(172, 215, 145, 0.1);
        }
        @media (max-width: 1024px) {
          .salespod-grid {
            grid-template-columns: 1fr !important;
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
      zipFile="/downloads/sales-guide.pdf"
      zipName="sales-guide.pdf"
      title="Download SalesPod Feature Guide"
    />
    </section>
  );
};
