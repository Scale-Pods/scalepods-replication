"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Network, 
  Cpu, 
  Database, 
  GitBranch, 
  ArrowRight, 
  Layers,
  Webhook,
  Zap,
  Activity,
  Terminal,
  RefreshCw,
  BarChart3
} from "lucide-react";

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
  blur: "blur(40px)",
};

const capabilities = [
  { 
    title: "Enterprise Orchestration", 
    desc: "Multi-platform sync across CRM, ERP, and internal systems.",
    icon: <Network size={16} /> 
  },
  { 
    title: "AI Agent Pipelines", 
    desc: "Autonomous workflow steps with human-in-the-loop triggers.",
    icon: <GitBranch size={16} /> 
  },
  { 
    title: "Custom API Integration", 
    desc: "Deep connectivity with your technical stack.",
    icon: <Webhook size={16} /> 
  },
];

export const CustomWorkflowShowcase = () => {
  return (
    <section 
      id="custom-workflows"
      style={{ 
        padding: "60px 32px 80px",
        position: "relative",
        overflow: "hidden",
        background: "transparent",
        minHeight: "auto"
      }}
    >
      {/* ── CINEMATIC AMBIENT INFRASTRUCTURE ── */}
      <motion.div 
        animate={{ 
          opacity: [0.03, 0.05, 0.03],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "-10%",
          left: "20%",
          width: "60%",
          height: "120%",
          background: `linear-gradient(180deg, transparent 0%, ${C.green}12 50%, transparent 100%)`,
          filter: "blur(140px)",
          zIndex: 0,
          pointerEvents: "none"
        }} 
      />

      <div style={{
        maxWidth: "1280px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 1.3fr",
        gap: "60px",
        alignItems: "center",
        position: "relative",
        zIndex: 1
      }} className="custom-workflow-grid">
        
        {/* Left Side: Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ position: "relative" }}
        >
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 12px",
            background: "rgba(109, 182, 255, 0.08)",
            border: `1px solid rgba(109, 182, 255, 0.2)`,
            borderRadius: "100px",
            marginBottom: "20px"
          }}>
            <Layers size={10} color={C.blue} />
            <span style={{ 
              color: C.blue, 
              fontSize: "10px", 
              fontWeight: 700, 
              textTransform: "uppercase", 
              letterSpacing: "0.1em" 
            }}>
              Workflow Architecture
            </span>
          </div>

          <h2 style={{
            fontFamily: F.inter,
            fontSize: "clamp(30px, 3.5vw, 44px)",
            fontWeight: 800,
            color: C.txtBright,
            lineHeight: 1,
            marginBottom: "12px",
            letterSpacing: "-0.05em"
          }}>
            Custom <span style={{ fontFamily: F.accent, fontStyle: "italic", fontWeight: 400, color: C.green }}>Workflow Solutions</span>
          </h2>

          <div style={{ marginBottom: "28px" }}>
            <p style={{
              fontSize: "16px",
              color: C.txtBright,
              fontWeight: 600,
              marginBottom: "8px",
              opacity: 0.95
            }}>
              Precision-engineered automation ecosystems.
            </p>
            <p style={{
              fontSize: "14px",
              color: C.txtBody,
              lineHeight: 1.6,
              opacity: 0.8,
              maxWidth: "500px"
            }}>
              Standard tools have limits. ScalePods architects bespoke AI orchestration 
              layers that integrate deeply with your technical stack, syncing platforms 
              with <span style={{ color: C.blue, fontWeight: 700 }}>enterprise-grade reliability</span>.
            </p>
          </div>

          {/* Capabilities List */}
          <div style={{ 
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginBottom: "32px" 
          }}>
            {capabilities.map((feat, i) => (
              <div key={i} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <div style={{ 
                  width: "36px", 
                  height: "36px", 
                  borderRadius: "10px", 
                  background: "rgba(109, 182, 255, 0.08)", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  color: C.blue,
                  flexShrink: 0,
                  border: "1px solid rgba(109, 182, 255, 0.12)"
                }}>
                  {feat.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: "14px", fontWeight: 700, color: C.txtBright, margin: "0 0 4px 0" }}>{feat.title}</h4>
                  <p style={{ fontSize: "13px", color: C.txtBody, lineHeight: 1.5, margin: 0, opacity: 0.7 }}>{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <button style={{
            padding: "16px 36px",
            background: "rgba(10, 12, 16, 0.4)",
            color: C.txtBright,
            border: `1px solid ${C.blue}44`,
            borderRadius: "14px",
            fontSize: "15px",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: "12px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            backdropFilter: "blur(10px)"
          }} className="custom-cta">
            Architect Your Workflow <ArrowRight size={20} />
          </button>
        </motion.div>

        {/* Right Side: Live AI Workflow Control Surface */}
        <div style={{ 
          position: "relative", 
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gridTemplateRows: "repeat(10, 1fr)",
          gap: "16px",
          height: "460px",
          width: "100%",
          padding: "10px"
        }} className="ops-surface-container">
          
          {/* Main Orchestration Hub (Top Left) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{
              gridColumn: "1 / 8",
              gridRow: "1 / 6",
              background: G.bg,
              border: G.border,
              borderRadius: "24px",
              padding: "24px",
              backdropFilter: G.blur,
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 20px 50px rgba(0,0,0,0.3)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Cpu size={18} color={C.blue} />
                <span style={{ fontSize: "13px", fontWeight: 700, color: C.txtBright }}>AI Core Engine</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "6px", height: "6px", background: C.green, borderRadius: "50%", boxShadow: `0 0 10px ${C.green}` }} />
                <span style={{ fontSize: "10px", color: C.txtBody, fontWeight: 700 }}>ACTIVE</span>
              </div>
            </div>
            
            {/* Visual Graph Placeholder */}
            <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", height: "100px", marginTop: "20px" }}>
              {[60, 45, 75, 40, 90, 65, 80, 55, 70, 85, 45, 60].map((h, i) => (
                <motion.div 
                  key={i}
                  animate={{ height: [`${h}%`, `${Math.min(100, h + 10)}%`, `${h}%`] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                  style={{ 
                    flex: 1, 
                    background: `linear-gradient(to top, ${C.blue}33, ${C.blue}aa)`, 
                    borderRadius: "4px 4px 0 0" 
                  }} 
                />
              ))}
            </div>
            
            <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: "10px", color: C.txtBody, opacity: 0.6 }}>Orchestration Speed</div>
              <div style={{ fontSize: "14px", fontWeight: 800, color: C.blue }}>0.12ms / node</div>
            </div>
          </motion.div>

          {/* System Sync Modules (Top Right) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{
              gridColumn: "8 / 13",
              gridRow: "1 / 7",
              background: "rgba(255, 255, 255, 0.02)",
              border: `1px solid rgba(255, 255, 255, 0.08)`,
              borderRadius: "24px",
              padding: "20px",
              backdropFilter: "blur(24px)",
              display: "flex",
              flexDirection: "column",
              gap: "12px"
            }}
          >
            <div style={{ fontSize: "11px", fontWeight: 800, color: C.txtBright, marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>System Sync</div>
            {[
              { label: "Salesforce CRM", status: "Synced", icon: <Database size={12} /> },
              { label: "SAP Enterprise", status: "Active", icon: <Network size={12} /> },
              { label: "Custom REST API", status: "Live", icon: <Webhook size={12} /> },
              { label: "Slack / Teams", status: "Ready", icon: <Activity size={12} /> },
            ].map((sys, i) => (
              <div key={i} style={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "space-between",
                padding: "10px 12px",
                background: "rgba(255,255,255,0.02)",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.04)"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ color: C.blue }}>{sys.icon}</div>
                  <span style={{ fontSize: "10px", color: C.txtBody, fontWeight: 600 }}>{sys.label}</span>
                </div>
                <span style={{ fontSize: "9px", fontWeight: 800, color: C.green }}>{sys.status}</span>
              </div>
            ))}
          </motion.div>

          {/* Live Execution Logs (Bottom Left) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            style={{
              gridColumn: "1 / 7",
              gridRow: "6 / 11",
              background: "rgba(10, 12, 16, 0.4)",
              border: `1px solid rgba(172, 215, 145, 0.2)`,
              borderRadius: "24px",
              padding: "20px",
              backdropFilter: "blur(24px)",
              position: "relative",
              overflow: "hidden"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <Terminal size={14} color={C.green} />
              <span style={{ fontSize: "11px", fontWeight: 700, color: C.txtBright }}>Execution Logs</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                "Routing lead to CRM priority queue...",
                "Executing API handshake: SAP v4.1",
                "Triggering autonomous follow-up...",
                "Syncing cross-platform state..."
              ].map((log, i) => (
                <div key={i} style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <div style={{ fontSize: "9px", color: C.green, opacity: 0.5 }}>[{i}:24:0{i}]</div>
                  <div style={{ fontSize: "10px", color: C.txtBody, opacity: 0.8, fontFamily: "monospace" }}>{log}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Automation Velocity (Bottom Right) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            style={{
              gridColumn: "7 / 13",
              gridRow: "7 / 11",
              background: "rgba(109, 182, 255, 0.05)",
              border: `1px solid rgba(109, 182, 255, 0.25)`,
              borderRadius: "24px",
              padding: "20px",
              backdropFilter: "blur(24px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 800, color: C.txtBright, marginBottom: "2px" }}>Automation Velocity</div>
                <div style={{ fontSize: "9px", color: C.blue, fontWeight: 700 }}>Peak Efficiency</div>
              </div>
              <BarChart3 size={16} color={C.blue} />
            </div>
            
            <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
              <span style={{ fontSize: "32px", fontWeight: 800, color: C.txtBright }}>99.2</span>
              <span style={{ fontSize: "14px", fontWeight: 700, color: C.blue }}>%</span>
            </div>
            
            <div style={{ height: "4px", background: "rgba(255,255,255,0.05)", borderRadius: "2px", overflow: "hidden" }}>
              <motion.div 
                animate={{ width: ["70%", "95%", "85%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ height: "100%", background: C.blue }} 
              />
            </div>
          </motion.div>

        </div>

      </div>

      <style jsx>{`
        .custom-cta:hover {
          transform: translateY(-2px);
          border-color: ${C.blue} !important;
          background: rgba(109, 182, 255, 0.08) !important;
          box-shadow: 0 15px 40px rgba(109, 182, 255, 0.25);
        }
        @media (max-width: 1024px) {
          .custom-workflow-grid {
            grid-template-columns: 1fr !important;
            gap: 60px !important;
            text-align: center;
          }
          .custom-workflow-grid > div {
            margin: 0 auto;
            align-items: center !important;
            display: flex;
            flex-direction: column;
          }
          .ops-surface-container {
            height: auto !important;
            display: flex !important;
            flex-direction: column !important;
          }
        }
      `}</style>
    </section>
  );
};
