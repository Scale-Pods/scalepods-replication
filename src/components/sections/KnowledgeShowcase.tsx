"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HelpCircle, 
  Cpu, 
  ShieldCheck, 
  Activity, 
  Workflow, 
  ArrowRight,
  Database,
  Users,
  ChevronRight,
  Info
} from "lucide-react";
import { useMobile } from "@/lib/hooks";

const C = {
  green: "var(--color-green)",
  blue: "var(--color-blue-mid)",
  txtBright: "var(--color-text-bright)",
  txtBody: "var(--color-text-body)",
  border: "var(--color-border)",
  bgCard: "var(--color-bg-card)",
};

const F = {
  inter: "var(--font-inter), Inter, sans-serif",
  accent: "var(--font-instrument), serif",
};

const G = {
  bg: "var(--color-glass-bg)",
  border: "1px solid var(--color-glass-border)",
  blur: "blur(16px)", 
};

const knowledgeItems = [
  {
    id: "deployment",
    question: "How long does a standard deployment take?",
    answer: "Our rapid architecture framework typically deploys custom AI ecosystems within 7-14 days, depending on workflow complexity and integration depth.",
    tags: ["Lifecycle", "Speed"],
    icon: <Activity size={18} />
  },
  {
    id: "integrations",
    question: "Can workflows integrate with our CRM / ERP?",
    answer: "ScalePods is architecture-agnostic. We integrate seamlessly with HubSpot, Salesforce, SAP, and custom internal databases via secure API orchestration.",
    tags: ["Connectivity", "Infrastructure"],
    icon: <Database size={18} />
  },
  {
    id: "oversight",
    question: "Is human-in-the-loop oversight maintained?",
    answer: "Absolutely. Our systems are built for collaboration, not replacement. Every workflow includes human override points and real-time operational monitoring.",
    tags: ["Reliability", "Trust"],
    icon: <Users size={18} />
  },
  {
    id: "customization",
    question: "How customizable are the AI workflows?",
    answer: "Zero templates. Every system is architected from the ground up to mirror your specific departmental logic, data points, and operational DNA.",
    tags: ["Design", "Modular"],
    icon: <Workflow size={18} />
  }
];

export const KnowledgeShowcase = () => {
  const [activeId, setActiveId] = useState(knowledgeItems[0].id);
  const isMobile = useMobile(1024);

  return (
    <section 
      id="knowledge-showcase"
      className="knowledge-section"
      style={{ 
        position: "relative",
        overflow: "hidden",
        background: "transparent",
        minHeight: "auto",
        display: "flex",
        alignItems: "center"
      }}
    >
      <style jsx>{`
        .knowledge-section {
          padding: 64px 32px 72px;
        }
        @media (max-width: 1024px) {
          .knowledge-section {
            padding: 40px 16px 56px;
          }
        }
      `}</style>
      {/* ── CINEMATIC AMBIENT BEAM ── */}
      <motion.div 
        animate={{ 
          opacity: [0.03, 0.07, 0.03],
          x: [-40, 40, -40]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "0%",
          left: "20%",
          width: "60%",
          height: "100%",
          background: `linear-gradient(180deg, transparent, ${C.green}08, transparent)`,
          filter: "blur(80px)", // Reduced from 160px
          zIndex: 0,
          pointerEvents: "none"
        }} 
      />

      <div style={{
        maxWidth: "1280px",
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
        width: "100%"
      }}>
        
        {/* Header Section */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              background: "rgba(172, 215, 145, 0.08)",
              border: `1px solid rgba(172, 215, 145, 0.15)`,
              borderRadius: "100px",
              marginBottom: "12px"
            }}
          >
            <Info size={10} color={C.green} />
            <span style={{ 
              color: C.green, 
              fontSize: "10px", 
              fontWeight: 700, 
              textTransform: "uppercase", 
              letterSpacing: "0.15em" 
            }}>
              Operational Intelligence
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: F.inter,
              fontSize: "clamp(30px, 4vw, 44px)",
              fontWeight: 800,
              color: C.txtBright,
              lineHeight: 1,
              marginBottom: "10px",
              letterSpacing: "-0.05em"
            }}
          >
            AI Knowledge <span style={{ fontFamily: F.accent, fontStyle: "italic", fontWeight: 400, color: C.green }}>Engine</span>
          </motion.h2>
        </div>

        {/* Dashboard Layout */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1.4fr", 
          gap: "20px",
          background: "var(--color-glass-bg)",
          border: "1px solid var(--color-glass-border)",
          borderRadius: "32px",
          padding: "20px",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          boxShadow: "var(--card-shadow), var(--card-shadow-inset)"
        }} className="knowledge-dashboard">
          
          {/* Question List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {knowledgeItems.map((item) => (
              <motion.div
                key={item.id}
                onClick={() => setActiveId(item.id)}
                whileHover={{ x: 4 }}
                style={{
                  padding: "16px 20px",
                  borderRadius: "20px",
                  background: activeId === item.id ? "rgba(255,255,255,0.03)" : "transparent",
                  border: `1px solid ${activeId === item.id ? "rgba(255,255,255,0.08)" : "transparent"}`,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  transition: "all 0.3s ease"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={{ 
                    color: activeId === item.id ? C.green : C.txtBody,
                    opacity: activeId === item.id ? 1 : 0.4,
                    transition: "all 0.3s ease"
                  }}>
                    {item.icon}
                  </div>
                  <span style={{ 
                    fontSize: "14px", 
                    fontWeight: activeId === item.id ? 700 : 500,
                    color: activeId === item.id ? C.txtBright : C.txtBody,
                    opacity: activeId === item.id ? 1 : 0.6,
                    transition: "all 0.3s ease"
                  }}>
                    {item.question}
                  </span>
                </div>
                <ChevronRight 
                  size={16} 
                  color={activeId === item.id ? C.green : "transparent"} 
                  style={{ transition: "all 0.3s ease", transform: activeId === item.id ? "translateX(0)" : "translateX(-10px)" }}
                />
              </motion.div>
            ))}
          </div>

          {/* Response Engine */}
          <div style={{ 
            background: "rgba(var(--color-text-bright-rgb), 0.03)", 
            borderRadius: "24px", 
            padding: "32px", 
            border: "1px solid var(--color-border-faint)",
            boxShadow: "var(--internal-shadow-inset)",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}>
             <AnimatePresence mode="wait">
               {knowledgeItems.filter(i => i.id === activeId).map((item) => (
                 <motion.div
                   key={item.id}
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   transition={{ duration: 0.3 }}
                 >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                       <div style={{ 
                         width: "8px", 
                         height: "8px", 
                         borderRadius: "50%", 
                         background: C.green,
                         boxShadow: `0 0 10px ${C.green}`
                       }} />
                       <span style={{ fontSize: "10px", fontWeight: 800, color: C.green, textTransform: "uppercase", letterSpacing: "0.1em" }}>Verified Capability</span>
                    </div>

                    <h3 style={{ 
                      fontSize: "22px", 
                      fontWeight: 800, 
                      color: C.txtBright, 
                      marginBottom: "16px",
                      lineHeight: 1.2
                    }}>
                      {item.question}
                    </h3>

                    <p style={{ 
                      fontSize: "15px", 
                      color: C.txtBody, 
                      lineHeight: 1.6, 
                      marginBottom: "24px",
                      opacity: 0.8
                    }}>
                      {item.answer}
                    </p>

                    <div style={{ display: "flex", gap: "8px" }}>
                       {item.tags.map((tag, idx) => (
                         <span 
                           key={idx}
                           style={{
                             fontSize: "10px",
                             fontWeight: 700,
                             padding: "4px 10px",
                             background: "rgba(172, 215, 145, 0.05)",
                             border: "1px solid rgba(172, 215, 145, 0.1)",
                             borderRadius: "100px",
                             color: C.green
                           }}
                         >
                           {tag}
                         </span>
                       ))}
                    </div>
                 </motion.div>
               ))}
             </AnimatePresence>

             {/* Atmospheric Corner Glow */}
             <div style={{
               position: "absolute",
               bottom: "-50px",
               right: "-50px",
               width: "200px",
               height: "200px",
               background: `radial-gradient(circle, ${C.blue}05 0%, transparent 70%)`,
               filter: "blur(40px)",
               pointerEvents: "none"
             }} />
          </div>
        </div>

      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .knowledge-dashboard {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
