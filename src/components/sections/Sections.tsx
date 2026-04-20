"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ArrowUpRight, Users, Clock, Zap, GitBranch, Sliders, Settings, Bot, Sparkles, Maximize, PieChart, TrendingUp, BarChart3, Plug, Database, Heart, MessageCircle, HelpCircle, ChevronDown, ChevronUp, Layers, GitCompare } from "lucide-react";
import ParticlesBackground from "@/components/ui/ParticlesBackground";
import { useMobile } from "@/lib/hooks";

// ── Design tokens — exact CSS Peeper values ───────────────────────────────────
const C = {
  bgPage:    "#04070D",
  bgCard:    "#0D0F17",
  bgInput:   "#10131C",
  border:    "#222222",
  txtBright: "#E4E9F2",
  txtMid:    "#D5DBE6",
  txtBody:   "#B8C7D9",
  txtMuted:  "#636996",
  txtFaint:  "#545B7D",
  blueMid:   "#6DB6FF",
  blueOn:    "#0080FF",
  green:     "#ACD791",
};

const F = {
  inter: "var(--font-inter), Inter, sans-serif",
  serif: "var(--font-instrument), 'Instrument Serif', Georgia, serif",
};

// card base style – matches live site card appearance
const card = {
  background: C.bgCard,
  border: `1px solid ${C.border}`,
  borderRadius: "14px",
} as const;

// Scroll-triggered fade-up
const fup = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
});

// ── Shared components ─────────────────────────────────────────────────────────
function Label({ icon, text }: { icon: string; text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "16px" }}>
      <span style={{ fontSize: "13px" }}>{icon}</span>
      <span style={{ fontFamily: F.inter, fontSize: "11px", fontWeight: 600, letterSpacing: "0.17em", textTransform: "uppercase" as const, color: C.txtMuted }}>
        {text}
      </span>
    </div>
  );
}

function H2({ plain, italic }: { plain: string; italic?: string }) {
  return (
    <h2 style={{
      fontFamily: F.inter, fontSize: "clamp(32px,4.2vw,52px)",
      fontWeight: 500, color: C.txtBright,
      lineHeight: 1.1, letterSpacing: "-0.022em",
      textAlign: "center", marginBottom: "12px",
    }}>
      {plain}
      {italic && (
        <em style={{ fontFamily: F.serif, fontStyle: "italic", fontWeight: 400, color: C.txtBody }}>
          {" "}{italic}
        </em>
      )}
    </h2>
  );
}

function Sub({ children }: { children: string }) {
  return (
    <p style={{
      fontFamily: F.inter, fontSize: "15px", fontWeight: 400, color: C.txtFaint,
      lineHeight: 1.65, textAlign: "center", maxWidth: "520px", margin: "0 auto 44px",
    }}>{children}</p>
  );
}

// Global Glowing CTA Button (Flashy Lamp Lighting)
export function GlowingButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.a href={href}
      initial="rest" whileHover="hover"
      style={{ textDecoration: "none", position: "relative", display: "inline-block" }}
    >
      {/* Ambient background lamp reflection positioned BEHIND the button */}
      <div style={{
         position: "absolute",
         top: "50%", left: "50%", transform: "translate(-50%, -10px)",
         width: "350px", height: "180px",
         background: "radial-gradient(ellipse at center, rgba(255,255,255,0.12) 0%, transparent 60%)",
         zIndex: -1, pointerEvents: "none"
      }} />

      <div style={{
        position: "relative",
        display: "flex", alignItems: "center", gap: "8px",
        fontFamily: F.inter, fontSize: "15px", fontWeight: 600, color: C.green,
        background: C.bgCard, border: `1px solid rgba(255,255,255,0.08)`,
        borderRadius: "12px", padding: "14px 32px",
        overflow: "hidden",
      }}>
        {/* Soft inset glow mimicking the lamp lighting reflecting inside */}
        <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0px -15px 30px -15px rgba(255,255,255,0.4)", pointerEvents: "none" }} />
        
        <span style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", gap: "6px" }}>
          {children}
        </span>
        
        {/* Intense bottom spotlight glow */}
        <motion.div
          variants={{ rest: { opacity: 0.8, width: "50%" }, hover: { opacity: 1, width: "80%" } }}
          transition={{ duration: 0.3 }}
          style={{
             position: "absolute", bottom: "-4px", left: "50%", transform: "translateX(-50%)", x: "-50%",
             height: "8px", background: "#fff", filter: "blur(6px)", borderRadius: "50%"
          }} 
        />
        {/* Sharp bottom edge light */}
        <motion.div
          variants={{ rest: { opacity: 1, width: "30%" }, hover: { opacity: 1, width: "60%" } }}
          transition={{ duration: 0.3 }}
          style={{
             position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", x: "-50%",
             height: "1px", background: "rgba(255,255,255,1)"
          }} 
        />
      </div>
    </motion.a>
  );
}

// Section wrapper — 96px top/bottom padding
function Section({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <section id={id} style={{ position: "relative", background: C.bgPage, padding: "96px 24px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {children}
      </div>

      {/* Ambient Floor Lighting Line at exactly the bottom border */}
      <div style={{
         position: "absolute", bottom: 0, left: 0, right: 0, height: "1px",
         background: "linear-gradient(90deg, transparent 15%, rgba(255,255,255,0.4) 50%, transparent 85%)",
         boxShadow: "0 -8px 30px 4px rgba(255,255,255,0.1)",
         zIndex: 0, pointerEvents: "none"
      }} />
      <div style={{
         position: "absolute", bottom: 0, left: "20%", right: "20%", height: "80px",
         background: "radial-gradient(ellipse at bottom, rgba(255,255,255,0.12) 0%, transparent 70%)",
         zIndex: 0, pointerEvents: "none"
      }} />
    </section>
  );
}
// SERVICES
// ═══════════════════════════════════════════════════════════════════════════════
export function Services() {
  return (
    <Section id="services">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "16px" }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#0080FF" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 16V8C20.9996 7.64927 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.64927 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z" fill="#0080FF"/>
          <path d="M12 22C11.8 22 11.6 21.95 11.43 21.85L4.43 17.85C4.12 17.67 3.93 17.34 3.93 16.98V8.98C3.93 8.62 4.12 8.29 4.43 8.11L11.43 4.11C11.78 3.91 12.23 3.91 12.58 4.11L19.58 8.11C19.89 8.29 20.08 8.62 20.08 8.98V16.98C20.08 17.34 19.89 17.67 19.58 17.85L12.58 21.85C12.4 21.95 12.2 22 12 22ZM12 5.06L6.05 8.44V15.52L12 18.9L17.95 15.52V8.44L12 5.06Z" fill="#0D0F17"/>
        </svg>
        <span style={{ fontFamily: F.inter, fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: C.txtMuted }}>
          SERVICES
        </span>
      </div>
      <H2 plain="Smarter Services," italic="Built with AI" />
      <Sub>Everything you need to automate operations, boost productivity</Sub>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>

        {/* 1 – Automate Repetitive Tasks (1col) */}
        <motion.div {...fup(0)} initial="rest" whileHover="hover" style={{ ...card, padding: "24px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "relative", height: "180px", marginBottom: "20px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ position: "absolute", inset: 0, zIndex: 5, background: "linear-gradient(to bottom, #0A0D14 5%, transparent 30%, transparent 70%, #0A0D14 95%)", pointerEvents: "none" }} />
            
            <motion.div 
               variants={{ rest: { y: ["0%", "-50%"] }, hover: {} }}
               transition={{ duration: 15, ease: "linear", repeat: Infinity }}
               style={{ display: "flex", flexDirection: "column", gap: "12px", position: "absolute", top: 0, width: "100%" }}
            >
              {[0, 1].map((set) => (
                <div key={set} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {[
                    { text: "Social media post", c1: "#ACD791", t: "done", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4l16 16M4 20L20 4"/></svg> },
                    { text: "Employee Tracking", c1: "#6DB6FF", t: "spin", icon: <Users style={{width:"14px"}}/> },
                    { text: "Payment reminder", c1: "#8E95A3", t: "done", icon: <Clock style={{width:"14px"}}/> },
                    { text: "Cost Management", c1: "#8E95A3", t: "loading", icon: <span style={{fontFamily:"serif",fontWeight:600}}>$</span> },
                  ].map((it, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderRadius: "8px", background: C.bgInput, border: `1px solid ${C.border}` }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", fontFamily: F.inter, fontSize: "13px", color: C.txtBody }}>
                        <span style={{ color: C.txtFaint }}>{it.icon}</span> {it.text}
                      </div>
                      {it.t === "done" && <Check style={{ width: "14px", height: "14px", color: it.c1 }} />}
                      {it.t === "spin" && <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} style={{ width: "14px", height: "14px", borderRadius: "50%", border: `2px solid ${it.c1}`, borderTopColor: "transparent" }} />}
                      {it.t === "loading" && <div style={{width:"14px", height:"14px", border:`2px solid #333`, borderRadius:"50%"}} />}
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
          <h3 style={{ fontFamily: F.inter, fontSize: "17px", fontWeight: 600, color: C.blueMid, marginBottom: "8px" }}>Automate repetitive tasks</h3>
          <p style={{ fontFamily: F.inter, fontSize: "14px", color: C.txtMuted, lineHeight: 1.6 }}>We help you streamline internal operations by automating manual workflows</p>
        </motion.div>

        {/* 2 – Automated Workflows (2cols Wide) */}
        <motion.div {...fup(0.1)} initial="rest" whileHover="hover" style={{ ...card, padding: "24px", gridColumn: "span 2", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(109,182,255,0.08) 0%, transparent 70%)", zIndex: 0 }} />

          <div style={{ position: "relative", height: "180px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px", zIndex: 2 }}>
            <div style={{ position: "relative", width: "360px", height: "180px" }}>
              
              {/* Central Glowing Star */}
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "80px", height: "80px", borderRadius: "50%", border: "1px solid rgba(109,182,255,0.2)", background: "#0A0D14", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 50px rgba(109,182,255,0.2)", zIndex: 20 }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill="#ACD791" stroke="#ACD791" strokeWidth="2" />
                </svg>
              </div>

              {/* Data Flow Packets - small glowing dots moving to center */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 0, y: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    x: [Math.cos(i * 60 * Math.PI / 180) * 120, 0],
                    y: [Math.sin(i * 60 * Math.PI / 180) * 80, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.4, ease: "linear" }}
                  style={{ position: "absolute", top: "50%", left: "50%", width: "4px", height: "4px", background: "#fff", borderRadius: "50%", boxShadow: "0 0 8px #fff", zIndex: 15 }}
                />
              ))}

              {/* Verified Brand Logos */}
              {[
                { x: 30, y: 30, color: "#fff", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.034l4.71 6.225 5.5-6.225zm-4.66 17.513h1.833L7.084 4.126H5.117l8.467 15.637z"/></svg> }, // X
                { x: 100, y: 15, color: "#fff", icon: <svg width="22" height="22" viewBox="0 0 38 38"><path d="M11.4 0a5.7 5.7 0 000 11.4 5.7 5.7 0 000-11.4zM0 11.4a5.7 5.7 0 005.7 5.7c3.1 0 5.7-2.6 5.7-5.7H0zm5.7 5.7a5.7 5.7 0 000 11.4 5.7 5.7 0 000-11.4zM11.4 22.8a5.7 5.7 0 00-5.7 5.7c0 3.1 2.6 5.7 5.7 5.7s5.7-2.6 5.7-5.7h-5.7zm5.7-11.4a5.7 5.7 0 005.7 5.7H22.8c3.1 0 5.7-2.6 5.7-5.7s-2.6-5.7-5.7-5.7z" fill="currentColor"/></svg> }, // Figma
                { x: 200, y: 10, color: "#fff", icon: <svg width="18" height="18" viewBox="0 0 100 100"><path d="M10 10v80h80V10H10zm11 11h58v58H21V21zm9 8v29l32-15V14l-32 15z" fill="currentColor"/></svg> }, // Notion type
                { x: 300, y: 50, color: "#fff", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.06 13.5H8.94V8.5h6.12v1.85h-3.9v1.44h3.69v1.61h-3.69v1.4h3.9v1.7z"/></svg> },
                { x: 260, y: 140, color: "#fff", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z"/></svg> },
                { x: 150, y: 160, color: "#fff", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> },
                { x: 40, y: 130, color: "#fff", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01"/><path d="M15 9h.01"/></svg> },
              ].map((pos, i) => (
                <motion.div key={i} animate={{ y: [0, -6, 0] }} transition={{ duration: 3.5 + i * 0.2, repeat: Infinity, ease: "easeInOut" }} style={{ position: "absolute", top: pos.y, left: pos.x, width: "38px", height: "38px", borderRadius: "11px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", WebkitBackdropFilter: "blur(2px)", backdropFilter: "blur(2px)", color: pos.color }}>
                  {pos.icon}
                </motion.div>
              ))}
            </div>
          </div>
          <h3 style={{ fontFamily: F.inter, fontSize: "17px", fontWeight: 600, color: C.blueMid, marginBottom: "8px" }}>Automated Workflows</h3>
          <p style={{ fontFamily: F.inter, fontSize: "14px", color: C.txtMuted, lineHeight: 1.6 }}>Boost efficiency across teams with smart automation. Build intelligent workflows that automate multi-step processes across tools and platforms</p>
        </motion.div>

        {/* 3 – Real-Time Intelligence (1col) */}
        <motion.div {...fup(0.2)} initial="rest" whileHover="hover" style={{ ...card, padding: "24px" }}>
          <div style={{ position: "relative", height: "180px", marginBottom: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <motion.div variants={{ rest: { borderColor: C.border, boxShadow: "0px 0px 0px transparent" }, hover: { borderColor: "#6DB6FF66", boxShadow: "0px 4px 20px rgba(109,182,255,0.2)" } }} transition={{ duration: 0.3 }} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 14px", borderRadius: "10px", background: C.bgInput, border: `1px solid ${C.border}` }}>
              <span style={{ fontSize: "12px", color: "#8E95A3" }}>Research anything...</span>
              <div style={{ background: "rgba(172,215,145,0.18)", border: "1px solid rgba(172,215,145,0.4)", borderRadius: "12px", padding: "4px 12px", fontSize: "10px", color: "#ACD791", fontWeight: 700 }}>Research</div>
            </motion.div>

            <div style={{ position: "relative", flex: 1, overflow: "hidden", display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ position: "absolute", inset: 0, zIndex: 5, background: "linear-gradient(to bottom, transparent 40%, #0A0D14 90%)", pointerEvents: "none" }} />
              <motion.div variants={{ rest: { y: [0, -100] }, hover: {} }} transition={{ duration: 8, ease: "linear", repeat: Infinity }} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {[
                  "Software & App Industry",
                  "UX & UI Design Industry",
                  "High Converting Customer",
                  "Sales & Marketing Funnel",
                  "AI Scaling Strategies",
                  "Enterprise Data Audit",
                  "Software & App Industry",
                  "UX & UI Design Industry"
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 14px", borderRadius: "8px", border: `1px solid rgba(255,255,255,0.05)`, background: "rgba(255,255,255,0.02)" }}>
                    <Users style={{ width: "13px", height: "13px", color: C.txtFaint }} />
                    <span style={{ fontFamily: F.inter, fontSize: "12px", color: C.txtBright }}>{item}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
          <h3 style={{ fontFamily: F.inter, fontSize: "17px", fontWeight: 600, color: C.blueMid, marginBottom: "8px" }}>Real-Time Intelligence</h3>
          <p style={{ fontFamily: F.inter, fontSize: "14px", color: C.txtMuted, lineHeight: 1.6 }}>Make smarter decisions with live data insights. Tap into real-time data</p>
        </motion.div>

        {/* 4 – Custom AI Agent (1col) */}
        <motion.div {...fup(0.3)} initial="rest" whileHover="hover" style={{ ...card, padding: "24px" }}>
          <div style={{ position: "relative", height: "180px", marginBottom: "20px", display: "flex", flexDirection: "column", borderRadius: "12px", overflow: "hidden", border: `1px solid ${C.border}`, background: "#05070A", boxShadow: "inset 0 0 20px rgba(0,0,0,0.5)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 14px", background: "rgba(255,255,255,0.03)", borderBottom: `1px solid rgba(255,255,255,0.05)` }}>
              <div style={{ display: "flex", gap: "6px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#FF5F56", border: "1px solid rgba(0,0,0,0.1)" }} />
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#FFBD2E", border: "1px solid rgba(0,0,0,0.1)" }} />
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#27C93F", border: "1px solid rgba(0,0,0,0.1)" }} />
              </div>
              <div style={{ fontSize: "10px", color: "#545B7D", fontFamily: "monospace", letterSpacing: "0.05em" }}>CODE.PY</div>
            </div>

            <div style={{ position: "relative", flex: 1, overflow: "hidden", padding: "14px" }}>
              <div style={{ position: "absolute", inset: 0, zIndex: 5, background: "linear-gradient(to bottom, transparent 60%, #05070A 95%)", pointerEvents: "none" }} />
              <motion.div variants={{ rest: { y: [0, -80] }, hover: {} }} transition={{ duration: 10, ease: "linear", repeat: Infinity }} style={{ display: "flex", flexDirection: "column", gap: "6px", fontFamily: "monospace", fontSize: "11px", fontWeight: 400, whiteSpace: "pre" }}>
                <div><span style={{color:"#abb2bf"}}>1</span> <span style={{color:"#c678dd"}}>class</span> <span style={{color:"#e5c07b"}}>AIAgent</span>:</div>
                <div><span style={{color:"#abb2bf"}}>2</span>     <span style={{color:"#c678dd"}}>def</span> <span style={{color:"#61afef"}}>__init__</span>(self):</div>
                <div><span style={{color:"#abb2bf"}}>3</span>         self.active = <span style={{color:"#d19a66"}}>True</span></div>
                <div><span style={{color:"#abb2bf"}}>4</span>         self.mode = <span style={{color:"#98c379"}}>"optimized"</span></div>
                <div><span style={{color:"#abb2bf"}}>5</span></div>
                <div><span style={{color:"#abb2bf"}}>6</span>     <span style={{color:"#c678dd"}}>def</span> <span style={{color:"#61afef"}}>process</span>(self, data):</div>
                <div><span style={{color:"#abb2bf"}}>7</span>         <span style={{color:"#c678dd"}}>if</span> data.valid:</div>
                <div><span style={{color:"#abb2bf"}}>8</span>             <span style={{color:"#c678dd"}}>return</span> self.solve(data)</div>
                <div><span style={{color:"#abb2bf"}}>9</span>         <span style={{color:"#c678dd"}}>return</span> <span style={{color:"#d19a66"}}>None</span></div>
                <div><span style={{color:"#abb2bf"}}>10</span></div>
              </motion.div>
            </div>
          </div>
          <h3 style={{ fontFamily: F.inter, fontSize: "17px", fontWeight: 600, color: C.blueMid, marginBottom: "8px" }}>Custom AI Agent development</h3>
          <p style={{ fontFamily: F.inter, fontSize: "14px", color: C.txtMuted, lineHeight: 1.6 }}>We develop custom AI agents that integrate seamlessly with your tools</p>
        </motion.div>

        {/* 5 – AI Strategy Consulting (1col) */}
        <motion.div {...fup(0.4)} initial="rest" whileHover="hover" style={{ ...card, padding: "24px" }}>
          <div style={{ position: "relative", height: "180px", marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="220" height="150" viewBox="0 0 220 150">
              <motion.path 
                d="M110 75 L40 30 M110 75 L60 120 M110 75 L170 40 M110 75 L190 100" 
                stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeDasharray="5 5"
                variants={{ rest: { strokeDashoffset: [0, -20] } }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <circle cx="40" cy="30" r="16" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.1)"/>
              <rect x="34" y="24" width="3" height="12" fill="#545B7D" rx="1"/>
              <rect x="40" y="20" width="3" height="16" fill="#8E95A3" rx="1"/>
              <rect x="46" y="28" width="3" height="8" fill="#545B7D" rx="1"/>

              <circle cx="60" cy="120" r="10" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)"/>
              <circle cx="170" cy="40" r="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)"/>

              <motion.circle 
                cx="190" cy="100" r="18" fill="rgba(172,215,145,0.08)" stroke="rgba(172,215,145,0.3)" 
                variants={{ rest: { scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] } }} transition={{ duration: 3, repeat: Infinity }}
              />
              <path d="M190 92L193.37 98.83L200.9 99.92L195.45 105.23L196.74 112.72L190 109.18L183.26 112.72L184.55 105.23L179.1 99.92L186.63 98.83L190 92Z" fill="#ACD791"/>

              <motion.circle cx="110" cy="75" r="5" fill="#6DB6FF" variants={{ rest: { scale: [1, 1.4, 1], filter: ["blur(0px)", "blur(2px)", "blur(0px)"] } }} transition={{ duration: 2.5, repeat: Infinity }} />
            </svg>
          </div>
          <h3 style={{ fontFamily: F.inter, fontSize: "17px", fontWeight: 600, color: C.blueMid, marginBottom: "8px" }}>AI Strategy Consulting</h3>
          <p style={{ fontFamily: F.inter, fontSize: "14px", color: C.txtMuted, lineHeight: 1.6 }}>Get expert guidance to implement AI solutions that drive business growth</p>
        </motion.div>

      </div>
    </Section>
  );
}


// ═══════════════════════════════════════════════════════════════════════════════
// DATA ANALYSIS — tall section with big centered text
// ═══════════════════════════════════════════════════════════════════════════════
export function DataAnalysis() {
  return (
    <section style={{ position: "relative", background: C.bgPage, padding: "160px 24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
      
      {/* Badge matching live site */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: "8px",
        padding: "6px 16px", borderRadius: "20px",
        background: "rgba(0,128,255,0.08)", border: `1px solid rgba(0,128,255,0.15)`,
        marginBottom: "32px",
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="#0080FF" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
        <span style={{ fontFamily: F.inter, fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: C.txtBright }}>
          WE ANALYZE YOUR DATA
        </span>
      </div>

      <h2 style={{
        fontFamily: F.inter, fontSize: "clamp(20px,3.2vw,40px)",
        fontWeight: 400, color: "#8E95A3",
        lineHeight: 1.45, letterSpacing: "-0.01em",
        width: "100%",
      }}>
        <span style={{ display: "block" }}>
          We find what to{" "}
          <em style={{ fontFamily: F.serif, fontStyle: "italic", color: C.green }}>automate</em>
          {", who your users are & how"}
        </span>
        <span style={{ display: "block" }}>
          {"AI can optimize your "}
          <em style={{ fontFamily: F.serif, fontStyle: "italic", color: C.green }}>workflow</em>
          {". Best part is we also"}
        </span>
        <span style={{ display: "block" }}>
          {"build and launch "}
          <em style={{ fontFamily: F.serif, fontStyle: "italic", color: C.green }}>custom solutions</em>
          {".\""}
        </span>
      </h2>

      {/* Ambient Floor Lighting Line at exactly the bottom border */}
      <div style={{
         position: "absolute", bottom: 0, left: 0, right: 0, height: "1px",
         background: "linear-gradient(90deg, transparent 15%, rgba(255,255,255,0.4) 50%, transparent 85%)",
         boxShadow: "0 -8px 30px 4px rgba(255,255,255,0.1)",
         zIndex: 0, pointerEvents: "none"
      }} />
      <div style={{
         position: "absolute", bottom: 0, left: "20%", right: "20%", height: "80px",
         background: "radial-gradient(ellipse at bottom, rgba(255,255,255,0.12) 0%, transparent 70%)",
         zIndex: 0, pointerEvents: "none"
      }} />
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// BENEFITS
// ═══════════════════════════════════════════════════════════════════════════════

export function Benefits() {
  const cards = [
    {
      title: "Real-Time Intelligence",
      desc: "Access accurate, real-time data to drive smarter decisions",
      Icon: function Speedometer() {
        return (
          <svg width="100%" height="160" viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="grad1" cx="50%" cy="100%" r="60%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.06)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </radialGradient>
            </defs>
            <motion.circle cx="100" cy="140" r="60" fill="url(#grad1)" 
              variants={{ rest: { opacity: 0.4 }, hover: { opacity: 1 } }} transition={{ duration: 0.3 }} />
            <path d="M 40 140 A 60 60 0 0 1 160 140" stroke="rgba(255,255,255,0.06)" strokeWidth="3" fill="none" />
            <path d="M 40 140 A 60 60 0 0 1 80 83" stroke="rgba(255,255,255,0.12)" strokeWidth="3" fill="none" strokeLinecap="round" />
            <motion.g 
              variants={{ rest: { rotate: 0 }, hover: { rotate: 45 } }} 
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
              style={{ transformOrigin: "100px 140px", transform: "rotate(20deg)" }}
            >
              <line x1="100" y1="140" x2="145" y2="105" stroke="rgba(255,255,255,0.2)" strokeWidth="4" strokeLinecap="round" />
              <circle cx="100" cy="140" r="4" fill="#6DB6FF" />
              <circle cx="100" cy="140" r="2.5" fill="#fff" />
            </motion.g>
          </svg>
        );
      }
    },
    {
      title: "Measurable Impact",
      desc: "Track performance, uncover insights, and achieve data-backed growth",
      Icon: function Bars() {
        return (
          <svg width="100%" height="160" viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="gradBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
              </linearGradient>
            </defs>
            <motion.rect variants={{ rest: { height: 35, y: 95 }, hover: { height: 45, y: 85 } }}
              x="50" width="18" rx="4" fill="url(#gradBar)" transition={{ duration: 0.3, delay: 0.0 }} />
            <motion.rect variants={{ rest: { height: 50, y: 80 }, hover: { height: 60, y: 70 } }}
              x="80" width="18" rx="4" fill="url(#gradBar)" transition={{ duration: 0.3, delay: 0.05 }} />
            <motion.rect variants={{ rest: { height: 65, y: 65 }, hover: { height: 85, y: 45 } }}
              x="110" width="18" rx="4" fill="url(#gradBar)" transition={{ duration: 0.3, delay: 0.1 }} />
            <motion.rect variants={{ rest: { height: 45, y: 85 }, hover: { height: 55, y: 75 } }}
              x="140" width="18" rx="4" fill="url(#gradBar)" transition={{ duration: 0.3, delay: 0.15 }} />
          </svg>
        );
      }
    },
    {
      title: "Seamless Integration",
      desc: "Connect tools, teams, and workflows with intelligent automation",
      Icon: function Nodes() {
        return (
          <svg width="100%" height="160" viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
            <motion.g variants={{ rest: { scale: 1 }, hover: { scale: 1.05 } }} transition={{ duration: 0.4 }} style={{ transformOrigin: "100px 80px" }}>
              <line x1="100" y1="80" x2="60" y2="40" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
              <line x1="100" y1="80" x2="140" y2="35" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
              <line x1="100" y1="80" x2="45" y2="90" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
              <line x1="100" y1="80" x2="155" y2="100" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
              <line x1="100" y1="80" x2="110" y2="135" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
              <circle cx="60" cy="40" r="4.5" fill="rgba(255,255,255,0.12)" />
              <circle cx="140" cy="35" r="4.5" fill="rgba(255,255,255,0.12)" />
              <circle cx="45" cy="90" r="4.5" fill="rgba(255,255,255,0.12)" />
              <circle cx="155" cy="100" r="4.5" fill="rgba(255,255,255,0.12)" />
              <circle cx="110" cy="135" r="4.5" fill="rgba(255,255,255,0.12)" />
              
              <circle cx="100" cy="80" r="14" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <circle cx="100" cy="80" r="8" fill="rgba(0,128,255,0.2)" />
              <circle cx="100" cy="80" r="2" fill="#6DB6FF" />
            </motion.g>
          </svg>
        );
      }
    }
  ];

  return (
    <Section id="benefits">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "16px" }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="#0080FF" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
        <span style={{ fontFamily: F.inter, fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: C.txtMuted }}>
          BENEFITS
        </span>
      </div>
      
      <H2 plain="Why Choose " italic="Us?" />
      <Sub>Everything you need to automate, optimize, and scale</Sub>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "48px" }}>
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            {...fup(i * 0.1)}
            initial="rest"
            whileHover="hover"
            animate="rest"
            style={{
              position: "relative", background: C.bgCard, borderRadius: "16px",
              padding: "0px 0px 32px 0px", overflow: "hidden",
              border: `1px solid ${C.border}`, textAlign: "center",
              display: "flex", flexDirection: "column", alignItems: "center",
              boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
            }}
          >
            {/* Top Edge Light - visible on hover */}
            <motion.div
              variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
              transition={{ duration: 0.4 }}
              style={{
                position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", x: "-50%",
                width: "60%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
              }}
            />
            {/* Bottom Edge Light - always faintly visible, brighter on hover */}
            <motion.div
              variants={{ rest: { opacity: 0.4, width: "30%" }, hover: { opacity: 1, width: "80%" } }}
              transition={{ duration: 0.4 }}
              style={{
                position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", x: "-50%",
                height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
              }}
            />

            <div style={{ width: "100%", height: "160px", marginBottom: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <card.Icon />
            </div>
            <h3 style={{ fontFamily: F.inter, fontSize: "17px", fontWeight: 600, color: C.blueMid, marginBottom: "8px", padding: "0 24px" }}>
              {card.title}
            </h3>
            <p style={{ fontFamily: F.inter, fontSize: "14px", color: C.txtFaint, lineHeight: 1.6, padding: "0 24px" }}>
              {card.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Button with Edge Light */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <GlowingButton href="/contact">
          Evaluate Your Funnel <ArrowUpRight style={{ width: "16px", height: "16px" }} />
        </GlowingButton>
      </div>
    </Section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FEATURES
// ═══════════════════════════════════════════════════════════════════════════════
export function Features() {
  const items = [
    { 
      title: "Workflow Automation", 
      desc: "Automate complex business processes to boost speed, clarity, and efficiency.",
      i1: <GitBranch style={{ width: "20px", height: "20px" }} />,
      i2: <Zap style={{ width: "20px", height: "20px" }} />
    },
    { 
      title: "Custom AI Solutions", 
      desc: "Build tailored AI systems that align with your business goals and challenges.",
      i1: <Sliders style={{ width: "20px", height: "20px" }} />,
      i2: <Settings style={{ width: "20px", height: "20px" }} />
    },
    { 
      title: "AI Assistant", 
      desc: "Deploy intelligent virtual agents to streamline tasks.",
      i1: <Bot style={{ width: "20px", height: "20px" }} />,
      i2: <Sparkles style={{ width: "20px", height: "20px" }} />
    },
    { 
      title: "Sales & Marketing", 
      desc: "Leverage AI to optimize campaigns, track leads, and personalize outreach.",
      i1: <Maximize style={{ width: "20px", height: "18px" }} />,
      i2: <PieChart style={{ width: "20px", height: "20px" }} />
    },
    { 
      title: "Performance Tracking", 
      desc: "Track automation results in real time to improve and scale your workflows.",
      i1: <TrendingUp style={{ width: "20px", height: "20px" }} />,
      i2: <BarChart3 style={{ width: "20px", height: "20px" }} />
    },
    { 
      title: "Seamless Integrations", 
      desc: "Connect your tools and apps for smooth, unified AI-powered workflows.",
      i1: <Plug style={{ width: "20px", height: "20px" }} />,
      i2: <Database style={{ width: "20px", height: "20px" }} />
    },
  ];

  return (
    <Section id="features">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "32px" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: "8px",
          padding: "6px 14px", borderRadius: "100px",
          background: "rgba(0,128,255,0.06)", border: "1px solid rgba(0,128,255,0.2)",
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#0080FF" stroke="none">
             <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          <span style={{ fontFamily: F.inter, fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: C.txtBright }}>FEATURES</span>
        </div>
      </div>
      
      <H2 plain="All features in " italic="one place" />
      <Sub>Everything you need to automate operations, boost productivity</Sub>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            {...fup(i * 0.05)}
            initial="rest"
            whileHover="hover"
            style={{
              ...card,
              padding: "40px 32px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
              overflow: "hidden"
            }}
          >
            {/* Hover Glow Background */}
            <motion.div 
               variants={{ rest: { opacity: 0 }, hover: { opacity: 0.25 } }}
               style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: "120%", height: "80%", background: "radial-gradient(circle, #6DB6FF 0%, transparent 60%)", zIndex: 0, filter: "blur(40px)" }}
            />

            {/* Icon Box */}
            <div style={{ position: "relative", zIndex: 1, marginBottom: "32px" }}>
               <div style={{
                  width: "140px", height: "80px", borderRadius: "16px",
                  background: "rgba(255,255,255,0.03)", border: `1px solid ${C.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                  boxShadow: "inset 0 0 20px rgba(0,0,0,0.5)"
               }}>
                  <div style={{ color: C.green }}>{item.i1}</div>
                  <div style={{ width: "1px", height: "24px", background: "rgba(255,255,255,0.1)" }} />
                  <div style={{ color: C.green }}>{item.i2}</div>
               </div>
            </div>

            <h3 style={{ position: "relative", zIndex: 1, fontFamily: F.inter, fontSize: "18px", fontWeight: 600, color: C.blueMid, marginBottom: "12px" }}>
              {item.title}
            </h3>
            <p style={{ position: "relative", zIndex: 1, fontFamily: F.inter, fontSize: "14px", color: C.txtMuted, lineHeight: 1.6 }}>
              {item.desc}
            </p>

            {/* Hover Border Highlight */}
            <motion.div 
              variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
              style={{ position: "absolute", inset: 0, border: `1px solid #6DB6FF55`, borderRadius: "inherit", pointerEvents: "none" }}
            />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// COMPARISON — ScalePods vs Others
// ═══════════════════════════════════════════════════════════════════════════════
const pros = ["Fast setup with ready AI workflows","Built to grow and adapt with you","Real-time, AI-powered analytics","Automates tasks, reducing overhead","Expert support + AI guidance"];
const cons = ["Slower execution and manual setup","Requires manual updates as you scale","Limited or delayed reporting","Higher labor costs, less automation","Generic support or none at all"];

export function Comparison() {
  return (
    <Section id="comparison">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "16px" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: "8px",
          padding: "6px 14px", borderRadius: "100px",
          background: "rgba(0,128,255,0.06)", border: "1px solid rgba(0,128,255,0.2)",
        }}>
          <GitCompare style={{ width: "12px", height: "12px", color: "#0080FF" }} />
          <span style={{ fontFamily: F.inter, fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: C.txtBright }}>
            COMPARISON
          </span>
        </div>
      </div>
      <H2 plain="Why Choose Us " italic="Over Others" />
      <Sub>See how we compare against others in performance, growth</Sub>

      <div style={{ maxWidth: "1100px", margin: "60px auto 20px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "32px" }}>
        {/* ScalePods column */}
        <motion.div variants={fup(0)} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "48px", marginBottom: "24px" }}>
            <img src="/logo-light.png" alt="ScalePods" style={{ width: "160px", height: "auto", objectFit: "contain" }} />
          </div>
          <div style={{ ...card, padding: "12px 24px" }}>
            {pros.map((item, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "16px",
                padding: "24px 0",
                borderBottom: i < pros.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
              }}>
                <Check style={{ width: "16px", height: "16px", flexShrink: 0, color: C.green }} />
                <span style={{ fontFamily: F.inter, fontSize: "15px", color: C.txtBright }}>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Others column */}
        <motion.div variants={fup(0.1)} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", height: "48px", marginBottom: "24px" }}>
            <Layers style={{ width: "24px", height: "24px", color: C.txtBody }} />
            <p style={{ fontFamily: F.serif, fontSize: "28px", fontStyle: "italic", color: C.txtBody, margin: 0 }}>
              Others
            </p>
          </div>
          <div style={{ ...card, padding: "12px 24px" }}>
            {cons.map((item, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "16px",
                padding: "24px 0",
                borderBottom: i < cons.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
              }}>
                <X style={{ width: "16px", height: "16px", flexShrink: 0, color: C.blueMid }} />
                <span style={{ fontFamily: F.inter, fontSize: "15px", color: C.txtFaint }}>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Evaluate CTA */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "32px" }}>
         <GlowingButton href="/contact">
            <span style={{ color: C.green }}>Evaluate Your Funnel</span> <ArrowUpRight style={{ width: "15px", height: "15px", marginLeft: "6px", color: C.green }} />
         </GlowingButton>
      </div>
    </Section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PROCESS
// ═══════════════════════════════════════════════════════════════════════════════

const processSteps = [
  {
    label: "STEP 1",
    num: "01",
    title: "Discover & Analyze",
    desc: "We audit your existing workflows, tools, and customer data to uncover inefficiencies and automation opportunities. Every system is mapped for clarity.",
  },
  {
    label: "STEP 2",
    num: "02",
    title: "Design & Implement",
    desc: "We create tailored AI workflows that align with your goals. Our team builds, tests, and deploys smart systems that integrate into your operations seamlessly.",
  },
  {
    label: "STEP 3",
    num: "03",
    title: "Optimize & Scale",
    desc: "We track key metrics and continuously refine performance using real-time insights. As your business evolves, your automation grows with it.",
  }
];

export function Process() {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % processSteps.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Section id="process">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "16px" }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#0080FF" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 16V8C20.9996 7.64927 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.64927 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z" fill="#0080FF"/>
          <path d="M12 22C11.8 22 11.6 21.95 11.43 21.85L4.43 17.85C4.12 17.67 3.93 17.34 3.93 16.98V8.98C3.93 8.62 4.12 8.29 4.43 8.11L11.43 4.11C11.78 3.91 12.23 3.91 12.58 4.11L19.58 8.11C19.89 8.29 20.08 8.62 20.08 8.98V16.98C20.08 17.34 19.89 17.67 19.58 17.85L12.58 21.85C12.4 21.95 12.2 22 12 22ZM12 5.06L6.05 8.44V15.52L12 18.9L17.95 15.52V8.44L12 5.06Z" fill="#0D0F17"/>
        </svg>
        <span style={{ fontFamily: F.inter, fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: C.txtMuted }}>
          PROCESS
        </span>
      </div>
      <H2 plain="Our Simple & " italic="Smart Process" />
      <Sub>Everything you need to collaborate, create, and scale, all in one place.</Sub>

      <div style={{ borderRadius: "16px", border: `1px solid ${C.border}`, background: C.bgCard, overflow: "hidden", marginTop: "32px" }}>
        {/* Navigation Tabs */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", padding: "16px", gap: "16px" }}>
          {processSteps.map((step, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                style={{
                  padding: "16px",
                  borderRadius: "8px",
                  background: isActive ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.01)",
                  border: `1px solid ${isActive ? "rgba(172,215,145,0.2)" : C.border}`,
                  color: isActive ? C.green : C.txtMuted,
                  fontFamily: F.inter,
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  textAlign: "center"
                }}
              >
                {step.label}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "450px" }}>
          
          {/* Left Column - Visual Mockups */}
          <div style={{ position: "relative", padding: "32px", overflow: "hidden" }}>
             {/* Gradient glow behind visuals */}
             <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(109,182,255,0.08) 0%, transparent 70%)", zIndex: 0 }} />
             
             <AnimatePresence mode="wait">
               {activeTab === 0 && (
                 <motion.div
                   key="step1"
                   initial={{ opacity: 0, y: 30 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
                   transition={{ duration: 0.5, ease: "easeOut" }}
                   style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "16px" }}
                 >
                    <div style={{ display: "flex", gap: "12px" }}>
                       <div style={{ flex: 1, background: C.bgInput, border: `1px solid ${C.border}`, borderRadius: "12px", padding: "16px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                             <span style={{ fontSize: "11px", color: C.txtMuted }}>Customers</span>
                             <span style={{ fontSize: "10px", color: C.txtFaint, border: `1px solid ${C.border}`, borderRadius: "4px", padding: "2px 6px" }}>+ Chart</span>
                          </div>
                          <div style={{ fontSize: "24px", fontWeight: 700, color: C.txtBright, marginBottom: "8px" }}>-32%</div>
                          <svg width="100%" height="40" viewBox="0 0 100 40" preserveAspectRatio="none">
                             <path d="M0 30 Q 15 40 25 30 T 50 30 T 75 35 T 100 25" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                       </div>
                       <div style={{ flex: 1, background: C.bgInput, border: `1px solid ${C.border}`, borderRadius: "12px", padding: "16px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                             <span style={{ fontSize: "11px", color: C.txtMuted }}>Cost Management</span>
                             <span style={{ fontSize: "10px", color: C.txtFaint, border: `1px solid ${C.border}`, borderRadius: "4px", padding: "2px 6px" }}>+ Chart</span>
                          </div>
                          <div style={{ fontSize: "24px", fontWeight: 700, color: C.txtBright, marginBottom: "8px" }}>-54%</div>
                          <svg width="100%" height="40" viewBox="0 0 100 40" preserveAspectRatio="none">
                             <path d="M0 35 Q 15 20 25 25 T 50 35 T 75 25 T 100 30" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                       </div>
                    </div>
                    {/* Floating Weakest Systems card animated slightly upwards */}
                    <motion.div 
                      initial={{ y: 20 }} animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      style={{ background: "#0A0D14", border: `1px solid rgba(255,255,255,0.1)`, borderRadius: "12px", padding: "16px", boxShadow: "0 10px 40px rgba(0,0,0,0.5)", zIndex: 10, marginTop: "8px" }}
                    >
                       <div style={{ fontSize: "11px", color: C.txtMuted, marginBottom: "16px" }}>Weakest Systems</div>
                       <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                          <div style={{ width: "32px", height: "32px", background: "rgba(255,255,255,0.05)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                             <BarChart3 style={{ width: "16px", height: "16px", color: C.txtFaint }} />
                          </div>
                          <div style={{ flex: 1 }}>
                             <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                                <span style={{ fontSize: "13px", color: C.txtBright, fontWeight: 500 }}>Marketing & ads</span>
                                <span style={{ fontSize: "12px", color: C.txtMuted }}>32% <span style={{color: C.txtFaint}}>Score</span></span>
                             </div>
                             <div style={{ width: "100%", height: "4px", background: "rgba(255,255,255,0.05)", borderRadius: "2px", overflow: "hidden" }}>
                                <div style={{ width: "32%", height: "100%", background: C.txtFaint, borderRadius: "2px" }} />
                             </div>
                          </div>
                       </div>
                    </motion.div>
                 </motion.div>
               )}

               {activeTab === 1 && (
                 <motion.div
                   key="step2"
                   initial={{ opacity: 0, y: 30 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
                   transition={{ duration: 0.5, ease: "easeOut" }}
                   style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
                 >
                    {/* Abstract Bar Chart Backing */}
                    <div style={{ position: "absolute", inset: "20px 40px", display: "flex", alignItems: "flex-end", gap: "8%", opacity: 0.3 }}>
                       {[40, 70, 45, 90, 60, 80, 50].map((h, i) => (
                          <div key={i} style={{ flex: 1, height: `${h}%`, background: "linear-gradient(to top, rgba(255,255,255,0.1), rgba(255,255,255,0.02))", borderRadius: "4px 4px 0 0" }} />
                       ))}
                    </div>

                    {/* Floating Code Editor Overlay */}
                    <motion.div 
                      initial={{ y: 20 }} animate={{ y: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                      style={{ background: "#05070A", border: `1px solid rgba(255,255,255,0.08)`, borderRadius: "12px", width: "90%", padding: "16px", boxShadow: "0 20px 50px rgba(0,0,0,0.6)", zIndex: 10 }}
                    >
                       <div style={{ fontFamily: "monospace", fontSize: "12px", color: C.txtMuted, display: "flex", flexDirection: "column", gap: "8px", whiteSpace: "pre-wrap" }}>
                          <div><span style={{color:"#545B7D"}}>// Build & Implement -{">"}</span></div>
                          <div><span style={{color:"#c678dd"}}>async function</span> <span style={{color:"#61afef"}}>generateResponse</span>(prompt) {'{'}</div>
                          <div style={{paddingLeft: "16px"}}><span style={{color:"#c678dd"}}>const</span> response = <span style={{color:"#c678dd"}}>await</span> <span style={{color:"#56b6c2"}}>fetch</span>(<span style={{color:"#98c379"}}>'https://api.openai.com/...'</span>, {'{'}</div>
                          <div style={{paddingLeft: "32px"}}>method: <span style={{color:"#98c379"}}>'POST'</span>,</div>
                          <div style={{paddingLeft: "32px"}}>headers: {'{'}</div>
                          <div style={{paddingLeft: "48px"}}><span style={{color:"#98c379"}}>'Content-Type'</span>: <span style={{color:"#98c379"}}>'application/json'</span>,</div>
                          <div style={{paddingLeft: "32px"}}>{'}'}</div>
                          <div style={{paddingLeft: "16px"}}>{'})'}</div>
                       </div>
                    </motion.div>
                 </motion.div>
               )}

               {activeTab === 2 && (
                 <motion.div
                   key="step3"
                   initial={{ opacity: 0, y: 30 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
                   transition={{ duration: 0.5, ease: "easeOut" }}
                   style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}
                 >
                    {/* Glowing Line Chart Area */}
                    <div style={{ position: "relative", height: "160px", marginBottom: "20px", display: "flex", alignItems: "flex-end" }}>
                       <svg width="100%" height="100%" viewBox="0 0 200 100" preserveAspectRatio="none" style={{ position: "absolute", bottom: 0 }}>
                          <defs>
                             <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="rgba(109,182,255,0.2)" />
                                <stop offset="100%" stopColor="rgba(109,182,255,0)" />
                             </linearGradient>
                          </defs>
                          <motion.path 
                             initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.5, ease: "easeOut" }}
                             d="M 0 80 C 20 80 30 20 50 30 C 70 40 80 90 100 70 C 120 50 130 10 150 40 C 170 70 180 80 200 60" 
                             fill="none" stroke="#6DB6FF" strokeWidth="2" strokeLinecap="round" 
                          />
                          <motion.path 
                             initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
                             d="M 0 80 C 20 80 30 20 50 30 C 70 40 80 90 100 70 C 120 50 130 10 150 40 C 170 70 180 80 200 60 L 200 100 L 0 100 Z" 
                             fill="url(#chartGrad)" 
                          />
                       </svg>
                    </div>

                    {/* Floating Growth Tracker Card */}
                    <motion.div 
                      initial={{ y: 20 }} animate={{ y: [0, -8, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                      style={{ background: "#0A0D14", border: `1px solid rgba(255,255,255,0.1)`, borderRadius: "12px", padding: "16px", boxShadow: "0 10px 40px rgba(0,0,0,0.5)", zIndex: 10 }}
                    >
                       <div style={{ fontSize: "11px", color: C.txtMuted, marginBottom: "16px" }}>Growth & Efficiency Driven by AI</div>
                       <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                          <div style={{ width: "32px", height: "32px", background: "rgba(255,255,255,0.05)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                             <TrendingUp style={{ width: "16px", height: "16px", color: C.blueMid }} />
                          </div>
                          <div style={{ flex: 1 }}>
                             <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                                <span style={{ fontSize: "13px", color: C.txtBright, fontWeight: 500 }}>Marketing & ads</span>
                                <span style={{ fontSize: "12px", color: C.txtBright }}>84% <span style={{color: C.txtFaint}}>Score</span></span>
                             </div>
                             <div style={{ width: "100%", height: "4px", background: "rgba(255,255,255,0.05)", borderRadius: "2px", overflow: "hidden" }}>
                                <motion.div 
                                   initial={{ width: "0%" }} animate={{ width: "84%" }} transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                                   style={{ height: "100%", background: C.blueMid, borderRadius: "2px", boxShadow: "0 0 10px #6DB6FF" }} 
                                />
                             </div>
                          </div>
                       </div>
                    </motion.div>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>

          {/* Right Column - Descriptive Text */}
          <div style={{ padding: "48px 48px 48px 24px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
             <AnimatePresence mode="wait">
               <motion.div
                 key={activeTab} // triggers re-animation on tab change
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -20 }}
                 transition={{ duration: 0.4, ease: "easeOut" }}
                 style={{ display: "flex", flexDirection: "column", gap: "20px" }}
               >
                  <span style={{ fontFamily: F.inter, fontSize: "16px", fontWeight: 600, color: C.txtFaint }}>
                    {processSteps[activeTab].num}
                  </span>
                  <h3 style={{ fontFamily: F.inter, fontSize: "28px", fontWeight: 600, color: C.blueMid }}>
                    {processSteps[activeTab].title}
                  </h3>
                  <p style={{ fontFamily: F.inter, fontSize: "16px", color: C.txtMuted, lineHeight: 1.7 }}>
                    {processSteps[activeTab].desc}
                  </p>
               </motion.div>
             </AnimatePresence>
          </div>

        </div>
      </div>
    </Section>
  );
}


// ═══════════════════════════════════════════════════════════════════════════════
// CASE STUDIES (OUR CLIENTS)
// ═══════════════════════════════════════════════════════════════════════════════
const caseStudiesData = [
  {
    id: 1,
    title: "Expo Success",
    paragraphs: [
      "A company attending a major industry expo needed to capture and follow up with hundreds of leads quickly. Using our Exhibition Automation Pod, they transformed their process completely.",
      "Previously, it took their team 2-3 days to manually enter lead data and send follow-ups. With ScalePods, leads were captured via Telegram, automatically synced to their CRM, and personalized emails and WhatsApp messages were sent within 30 seconds.",
      "The result? They connected with prospects while the conversation was still fresh, leading to significantly higher engagement rates and faster deal cycles."
    ],
    stats: [
      { value: "40 %", label: "gain in retention" },
      { value: "65 %", label: "surge in ROI" }
    ],
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "SaaS Startup Scales Lead Qualification",
    paragraphs: [
      "A rapidly growing SaaS startup was drowning in inbound leads but lacked the resources to qualify them effectively. Their small sales team couldn't keep up with the volume, and valuable opportunities were slipping through the cracks.",
      "We deployed our B2B Lead generator and WhatsApp Reachout System to automatically qualify, score, and engage leads based on predefined criteria. The AI analyzed company size, industry, and engagement signals to prioritize the hottest prospects.",
      "Within three months, they processed 35,000 leads with zero additional headcount, allowing their sales team to focus exclusively on high-value conversations."
    ],
    stats: [
      { value: "30 %", label: "growth in sales" },
      { value: "55 %", label: "rise in engagement" }
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Tech Firm Accelerates Hiring with AI",
    paragraphs: [
      "A fast-growing tech company faced hiring delays — too many applicants, too little HR bandwidth.",
      "We implemented our HR Pipeline Automation Pod to handle resume parsing, candidate scoring, and interview scheduling. The AI screened 3,500+ resumes, ranked applicants by fit, and used WhatsApp and Calendly automations for instant scheduling and updates.",
      "In just two months, the hiring cycle dropped from 14 days to 5, enabling recruiters to focus only on culture fit while ScalePods ran the entire funnel."
    ],
    stats: [
      { value: "70 %", label: "Faster Recruitement" },
      { value: "35 %", label: "Lower CAC" }
    ],
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1600&auto=format&fit=crop"
  }
];

export function CaseStudies() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % caseStudiesData.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const getCardStyle = (index: number) => {
    const total = caseStudiesData.length;
    // Calculate the 'distance' from the active index, always positive
    // offset 0 = active front, offset 1 = behind 1, offset 2 = behind 2
    const offset = (index - activeIndex + total) % total;

    if (offset === 0) {
      return {
        zIndex: 10,
        y: 0,
        scale: 1,
        opacity: 1,
        pointerEvents: "auto" as const,
        cursor: "default"
      };
    } else if (offset === 1) {
      return {
        zIndex: 9,
        y: -40,
        scale: 0.96,
        opacity: 0.6,
        pointerEvents: "auto" as const,
        cursor: "pointer"
      };
    } else if (offset === 2) {
      return {
        zIndex: 8,
        y: -80,
        scale: 0.92,
        opacity: 0.3,
        pointerEvents: "auto" as const,
        cursor: "pointer"
      };
    }
    // Fallback if more items are added
    return { zIndex: 0, y: -100, scale: 0.8, opacity: 0, pointerEvents: "none" as const, cursor: "default" };
  };

  return (
    <Section id="clients">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "16px" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: "8px",
          padding: "6px 14px", borderRadius: "100px",
          background: "rgba(0,128,255,0.06)", border: "1px solid rgba(0,128,255,0.2)",
        }}>
          <Users style={{ width: "12px", height: "12px", color: "#0080FF" }} />
          <span style={{ fontFamily: F.inter, fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: C.txtBright }}>
            OUR CLIENTS
          </span>
        </div>
      </div>
      <H2 plain="Success Stories to " italic="Inspire" />
      <Sub>Discover how businesses and creators achieve results</Sub>

      <div style={{ position: "relative", width: "100%", maxWidth: "1024px", margin: "80px auto", height: "650px", perspective: 1000 }}>
        {caseStudiesData.map((study, index) => {
          const style = getCardStyle(index);
          const total = caseStudiesData.length;
          const offset = (index - activeIndex + total) % total;

          return (
            <motion.div
              key={study.id}
              onClick={() => {
                if (offset !== 0) setActiveIndex(index);
              }}
              initial={false}
              animate={{
                y: style.y,
                scale: style.scale,
                opacity: style.opacity,
                zIndex: style.zIndex,
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "#0A0D14",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "16px",
                overflow: "hidden",
                pointerEvents: style.pointerEvents,
                cursor: style.cursor,
                boxShadow: offset === 0 ? "0 20px 60px rgba(0,0,0,0.5)" : "none",
              }}
            >
              {/* Browser Window Header */}
              <div style={{
                height: "44px",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 20px",
                background: "rgba(255,255,255,0.02)"
              }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                   <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Check style={{ width: "12px", height: "12px", color: C.txtFaint }} />
                   </div>
                </div>
                <div style={{ display: "flex", gap: "6px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
                </div>
              </div>

              {/* Card Body Split Layout */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", height: "calc(100% - 44px)" }}>
                
                {/* Left Text/Stats */}
                <div style={{ padding: "48px 40px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <h3 style={{ fontFamily: F.inter, fontSize: "28px", fontWeight: 600, color: C.blueMid, marginBottom: "24px", lineHeight: 1.3 }}>
                      {study.title}
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      {study.paragraphs.map((p, i) => (
                        <p key={i} style={{ fontFamily: F.inter, fontSize: "14px", color: C.txtMuted, lineHeight: 1.6 }}>
                          {p}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Stats Block */}
                  <div style={{ display: "flex", gap: "16px", marginTop: "32px" }}>
                    {study.stats.map((stat, i) => (
                      <div key={i} style={{ flex: 1, border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "16px 0", textAlign: "center", background: "rgba(255,255,255,0.02)" }}>
                        <div style={{ fontFamily: F.inter, fontSize: "24px", fontWeight: 600, color: C.green, marginBottom: "8px" }}>
                           {stat.value}
                        </div>
                        <div style={{ fontFamily: F.inter, fontSize: "12px", color: C.txtBright }}>
                           {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Image Container */}
                <div style={{ padding: "40px 40px 40px 0" }}>
                  <div style={{ width: "100%", height: "100%", borderRadius: "12px", overflow: "hidden", position: "relative" }}>
                    <img 
                      src={study.image} 
                      alt={study.title} 
                      style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                    />
                    {/* Shadow overlay to blend edges */}
                    <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 40px rgba(10, 13, 20, 0.4)" }} />
                  </div>
                </div>

              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// INTEGRATIONS
// ═══════════════════════════════════════════════════════════════════════════════

const I_SVG = {
  n8n: <svg width="22" height="22" viewBox="0 0 40 40" fill="currentColor"><text x="6" y="26" fontFamily="sans-serif" fontWeight="800" fontSize="18" fill="currentColor">n8n</text></svg>,
  zapier: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
  make: <svg width="22" height="22" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="4"/><circle cx="16" cy="12" r="5" fill="currentColor"/></svg>,
  openai: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2A10 10 0 0 0 2 12A10 10 0 0 0 12 22A10 10 0 0 0 22 12A10 10 0 0 0 12 2Z" /><path d="M12 2v20M2 12h20M5 5l14 14M5 19L19 5" /></svg>,
  slack: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"/><path d="M20.5 10H16V5.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v4.5z"/><path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5z"/><path d="M3.5 14H8v4.5c0 .83-.67 1.5-1.5 1.5S5 19.33 5 18.5V14z"/><path d="M14 9.5c0 .83.67 1.5 1.5 1.5h5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5h-5c-.83 0-1.5.67-1.5 1.5z"/><path d="M14 20.5v-4.5h4.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-4.5z"/><path d="M10 14.5c0-.83-.67-1.5-1.5-1.5h-5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5c.83 0 1.5-.67 1.5-1.5z"/><path d="M10 3.5v4.5H5.5C4.67 8 4 7.33 4 6.5S4.67 5 5.5 5h4.5z"/></svg>,
  airtable: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l10 6-10 6L2 8l10-6zm0 14l10-6v4l-10 6-10-6v-4l10 6z"/></svg>,
  hubspot: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><circle cx="5" cy="5" r="2"/><circle cx="19" cy="5" r="2"/><path d="M6.5 6.5l4 4M17.5 6.5l-4 4M12 15v5"/></svg>,
  salesforce: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>,
  stripe: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/><path d="M6 14h.01"/></svg>,
  twilio: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/><circle cx="8" cy="12" r="2.5" fill="#080A10"/><circle cx="16" cy="12" r="2.5" fill="#080A10"/></svg>,
  notion: <svg width="22" height="22" viewBox="0 0 100 100"><path d="M10 10v80h80V10H10zm11 11h58v58H21V21zm9 8v29l32-15V14l-32 15z" fill="currentColor"/></svg>,
  google: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"/></svg>,
};

// Generate repeatable sets of icons for continuous marquees (minimum 12 items to prevent blank loop gaps)
const row1 = [ "n8n", "make", "zapier", "openai", "n8n", "make", "zapier", "openai", "n8n", "make", "zapier", "openai", "n8n", "make", "zapier", "openai" ];
const row2 = [ "slack", "stripe", "airtable", "salesforce", "slack", "stripe", "airtable", "salesforce", "slack", "stripe", "airtable", "salesforce", "slack", "stripe" ];
const row3 = [ "hubspot", "twilio", "google", "notion", "hubspot", "twilio", "google", "notion", "hubspot", "twilio", "google", "notion", "hubspot", "twilio", "google" ];

function MarqueeRow({ items, direction = 1, speed = 30 }: { items: string[], direction?: number, speed?: number }) {
  return (
    <div style={{ display: "flex", gap: "16px", width: "fit-content", padding: "4px 0", willChange: "transform" }}>
      <motion.div
        animate={{ x: direction === 1 ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
        style={{
          display: "flex",
          gap: "16px",
          willChange: "transform",
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
        }}
      >
        {/* We map the array twice inline to ensure it repeats seamlessly */}
        {[...items, ...items].map((iconKey, i) => (
          <div key={i} style={{
            width: "60px", height: "60px", borderRadius: "14px",
            background: "rgba(255,255,255,0.10)",
            border: "1px solid rgba(255,255,255,0.18)",
            boxShadow: "0px 2px 12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "rgba(255,255,255,0.92)",
            flexShrink: 0,
          }}>
             {I_SVG[iconKey as keyof typeof I_SVG] || <Database />}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function Integrations() {
  const isMobile = useMobile(768);
  return (
    <Section id="integrations">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "16px" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: "8px",
          padding: "6px 14px", borderRadius: "100px",
          background: "rgba(0,128,255,0.06)", border: "1px solid rgba(0,128,255,0.2)",
        }}>
          <Database style={{ width: "12px", height: "12px", color: "#0080FF" }} />
          <span style={{ fontFamily: F.inter, fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: C.txtBright }}>
            INTEGRATIONS
          </span>
        </div>
      </div>
      <H2 plain="Seamless " italic="Integrations" />
      <Sub>Interact with all your favorite software without unnecessary fuss</Sub>

      {/* Marquee Container */}
      <div style={{ display: "flex", justifyContent: "center", margin: isMobile ? "40px 0" : "60px 0 40px" }}>
         <div style={{
           position: "relative",
           width: "100%", maxWidth: isMobile ? "100%" : "800px",
           background: "#080A10",
           border: "1px solid rgba(255,255,255,0.08)",
           borderRadius: "24px",
           padding: "24px 0",
           overflow: "hidden",
           boxShadow: "0 20px 60px rgba(0,0,0,0.6)"
         }}>
           {/* Fade overlay masks strictly inside the container */}
           <div className="integration-fade" style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: isMobile ? "40px" : "120px", background: "linear-gradient(to right, #080A10 10%, transparent 100%)", zIndex: 10, pointerEvents: "none" }} />
           <div className="integration-fade" style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: isMobile ? "40px" : "120px", background: "linear-gradient(to left, #080A10 10%, transparent 100%)", zIndex: 10, pointerEvents: "none" }} />
           
           <div style={{ display: "flex", flexDirection: "column", gap: "8px", overflow: "hidden" }}>
              <MarqueeRow items={row1} direction={1}  speed={isMobile ? 20 : 32} />
              <MarqueeRow items={row2} direction={-1} speed={isMobile ? 22 : 38} />
              <MarqueeRow items={row3} direction={1}  speed={isMobile ? 21 : 28} />
           </div>
         </div>
      </div>

      <p style={{
         fontFamily: F.inter, fontSize: "16px", color: C.txtMuted,
         textAlign: "center", marginBottom: "40px"
      }}>
         "Our AI automation plugs into your stack to create a unified, intelligent workflow"
      </p>

      {/* Flashing Book a Call CTA */}
      <div style={{ display: "flex", justifyContent: "center" }}>
         <GlowingButton href="/contact">
           Book a Call <ArrowUpRight style={{ width: "16px", height: "16px" }} />
         </GlowingButton>
      </div>
    </Section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// REVIEWS
// ═══════════════════════════════════════════════════════════════════════════════

const reviewsData = [
  {
    name: "Anuj Ruia",
    title: "Co-Founder at BECO",
    quote: "“Truly impressive. The AI assistant is fast, accurate, and blends into our daily ops without friction.”",
    image: "/reviews/Anuj Ruia.jpeg"
  },
  {
    name: "Tejesh Lohiya",
    title: "Analytics Manager at Orchestra",
    quote: "“Huge time-saver. Data is better organized. The insights we get now are actionable and fast.”",
    image: "/reviews/Tejesh Lohiya.jpeg"
  },
  {
    name: "Sharan Lekhi",
    title: "Founder at Krafty Animations",
    quote: "“Game-changer. Automation flows run flawlessly. Our team now focuses only on what really matters.”",
    image: "/reviews/Sharan Lekhi.jpeg"
  },
  {
    name: "Shreyansh Jaiswal",
    title: "Founder at HobbyFi",
    quote: "“Smooth setup. Their system replaced three tools. We saw improvements in just the first week.”",
    image: "/reviews/Shreyansh Jaiswal.jpeg"
  },
  {
    name: "Dhairya Shah",
    title: "Partner & CEO at Break The Code",
    quote: "“Very intuitive. No fluff, just performance. Our internal processes finally feel under control.”",
    image: "/reviews/Dhairya Shah.avif"
  },
  {
    name: "Abinash Patra",
    title: "Senior VP at Square Yards",
    quote: "“Surprisingly simple. The AI adapts quickly. Our campaigns are now running 2x more efficiently.”",
    image: "/reviews/Abinash Patra.jpeg"
  }
];

export function Reviews() {
  return (
    <Section id="reviews">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "16px" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: "8px",
          padding: "6px 14px", borderRadius: "100px",
          background: "rgba(0,128,255,0.06)", border: "1px solid rgba(0,128,255,0.2)",
        }}>
          <Heart style={{ width: "12px", height: "12px", color: "#0080FF", fill: "#0080FF" }} />
          <span style={{ fontFamily: F.inter, fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: C.txtBright }}>
            REVIEWS
          </span>
        </div>
      </div>
      <H2 plain="Trusted by " italic="Visionaries" />
      <Sub>Hear from real users who achieved success with our automation</Sub>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", marginTop: "60px", paddingBottom: "20px" }}>
        {reviewsData.map((review, i) => (
          <motion.div
             key={i}
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-50px" }}
             transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
             style={{
               background: "#0D0F17",
               borderRadius: "16px",
               border: "1px solid rgba(255,255,255,0.05)",
               padding: "24px",
               display: "flex",
               flexDirection: "column",
               gap: "20px"
             }}
          >
             <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
               <img src={review.image} alt={review.name} style={{ width: "46px", height: "46px", borderRadius: "12px", objectFit: "cover" }} />
               <div style={{ display: "flex", flexDirection: "column" }}>
                 <span style={{ fontFamily: F.inter, fontSize: "16px", fontWeight: 600, color: "#ACD791", marginBottom: "2px" }}>{review.name}</span>
                 <span style={{ fontFamily: F.inter, fontSize: "13px", color: "#4A5568" }}>{review.title}</span>
               </div>
             </div>
             
             <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,0.05)" }} />
             
             <p style={{
               fontFamily: F.inter, fontSize: "15px", color: C.txtMuted, lineHeight: 1.6, margin: 0
             }}>
               {review.quote}
             </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FAQ
// ═══════════════════════════════════════════════════════════════════════════════

const faqData = [
  {
    q: "What types of processes can you automate?",
    a: "We specialize in automating repetitive workflows across operations, marketing, sales, and customer support using AI and custom logic."
  },
  {
    q: "Do I need technical knowledge to use your service?",
    a: "Not at all. Our team handles the setup, integration, and optimization. You just focus on your goals — we'll automate the rest."
  },
  {
    q: "Can you integrate with our existing tools?",
    a: "Yes! We support integrations with CRMs, project management tools, communication apps, and more — tailored to your stack."
  },
  {
    q: "How long does implementation take?",
    a: "Most clients see their first automation live within 1—2 weeks, depending on complexity and the number of workflows."
  },
  {
    q: "Is your AI secure and compliant?",
    a: "Absolutely. We use enterprise-grade security practices and ensure compliance with major data privacy standards like GDPR."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(1); // Default second one open like mock

  return (
    <Section id="faq">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "16px" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: "8px",
          padding: "6px 14px", borderRadius: "100px",
          background: "rgba(0,128,255,0.06)", border: "1px solid rgba(0,128,255,0.2)",
        }}>
          <MessageCircle style={{ width: "12px", height: "12px", color: "#0080FF" }} />
          <span style={{ fontFamily: F.inter, fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: C.txtBright }}>
            FAQ'S
          </span>
        </div>
      </div>
      <H2 plain="Frequently Asked " italic="Questions" />
      <Sub>Find quick answers to the most common support questions</Sub>

      <div style={{
         display: "flex", flexWrap: "wrap", gap: "32px", marginTop: "60px",
         alignItems: "flex-start", justifyContent: "center", paddingBottom: "20px"
      }}>
        
        {/* Left Side: Still Have Questions Card */}
        <motion.div variants={fup(0.1)} initial="initial" whileInView="whileInView" viewport={{ once: true }} style={{
           flex: "1 1 300px", maxWidth: "340px", background: "#080A10",
           borderRadius: "24px", border: "1px solid rgba(255,255,255,0.05)",
           padding: "40px 30px", display: "flex", flexDirection: "column",
           alignItems: "center", textAlign: "center", boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
        }}>
           <div style={{
              width: "48px", height: "48px", borderRadius: "12px",
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
              display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px", color: C.txtBright
           }}>
              <HelpCircle style={{ width: "24px", height: "24px" }} />
           </div>
           
           <h3 style={{ fontFamily: F.inter, fontSize: "20px", fontWeight: 600, color: C.txtBright, margin: "0 0 16px 0" }}>
             Still Have Questions?
           </h3>
           <p style={{ fontFamily: F.inter, fontSize: "15px", color: C.txtMuted, lineHeight: 1.6, margin: "0 0 32px 0" }}>
             Still have questions? Feel free to get in touch with us today!
           </p>

           <GlowingButton href="/contact">
              <ArrowUpRight style={{ width: "15px", height: "15px", marginRight: "6px" }} /> Ask A Question
           </GlowingButton>
        </motion.div>

        {/* Right Side: Accordion */}
        <motion.div variants={fup(0.2)} initial="initial" whileInView="whileInView" viewport={{ once: true }} style={{
           flex: "1 1 480px", maxWidth: "680px", display: "flex", flexDirection: "column", gap: "10px"
        }}>
          {faqData.map((item, i) => {
             const isOpen = openIndex === i;
             return (
               <div key={i} style={{
                  background: isOpen ? "rgba(13,15,23, 0.4)" : "#080A10", 
                  border: isOpen ? "1px solid rgba(109,182,255,0.12)" : "1px solid rgba(255,255,255,0.05)",
                  borderRadius: "12px", overflow: "hidden", transition: "all 0.3s ease"
               }}>
                 <button 
                   onClick={() => setOpenIndex(isOpen ? null : i)}
                   style={{
                      width: "100%", background: "transparent", border: "none",
                      padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between",
                      cursor: "pointer", color: C.blueMid,
                      fontFamily: F.inter, fontSize: "16px", fontWeight: isOpen ? 500 : 400, textAlign: "left",
                   }}
                 >
                   <span>{item.q}</span>
                   {isOpen ? <ChevronUp style={{ width: "20px", height: "20px", opacity: 0.8 }} /> : <ChevronDown style={{ width: "20px", height: "20px", opacity: 0.5, color: C.txtMuted }} />}
                 </button>
                 <AnimatePresence>
                   {isOpen && (
                     <motion.div
                       initial={{ height: 0, opacity: 0 }}
                       animate={{ height: "auto", opacity: 1 }}
                       exit={{ height: 0, opacity: 0 }}
                       transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                     >
                       <div style={{
                          padding: "0 24px 24px", color: C.txtMuted, fontFamily: F.inter,
                          fontSize: "15px", lineHeight: 1.6
                       }}>
                         {item.a}
                       </div>
                     </motion.div>
                   )}
                 </AnimatePresence>
               </div>
             );
          })}
        </motion.div>

      </div>
    </Section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FINAL CTA
// ═══════════════════════════════════════════════════════════════════════════════
export function FinalCTA() {
  return (
    <section id="contact" style={{ position: "relative", background: C.bgPage, padding: "160px 24px", textAlign: "center", overflow: "hidden" }}>
      
      {/* Ambient Button Radial Glow (Under Particles) */}
      <div style={{
         position: "absolute",
         top: "50%", left: "50%", transform: "translate(-50%, -10px)",
         width: "600px", height: "400px",
         background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 60%)",
         zIndex: 0, pointerEvents: "none"
      }} />

      {/* Footer Line Light Source (Under Particles) */}
      <div style={{
         position: "absolute", bottom: 0, left: 0, right: 0, height: "1px",
         background: "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.4) 50%, transparent 90%)",
         boxShadow: "0 -10px 40px 10px rgba(255,255,255,0.1)",
         zIndex: 0, pointerEvents: "none"
      }} />
      <div style={{
         position: "absolute", bottom: 0, left: "20%", right: "20%", height: "100px",
         background: "radial-gradient(ellipse at bottom, rgba(255,255,255,0.1) 0%, transparent 70%)",
         zIndex: 0, pointerEvents: "none"
      }} />

      {/* Particles Background Layer */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, opacity: 0.85, pointerEvents: "none" }}>
        <ParticlesBackground />
      </div>

      <div style={{ position: "relative", zIndex: 2, maxWidth: "680px", margin: "0 auto" }}>
        {/* Reach out anytime with faint lines */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginBottom: "32px" }}>
          <div style={{ height: "1px", width: "60px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2))" }} />
          <span style={{ fontFamily: F.inter, fontSize: "14px", fontStyle: "italic", color: C.txtMuted }}>
            Reach out anytime
          </span>
          <div style={{ height: "1px", width: "60px", background: "linear-gradient(270deg, transparent, rgba(255,255,255,0.2))" }} />
        </div>

        {/* Header */}
        <h2 style={{ fontFamily: F.inter, fontSize: "42px", fontWeight: 700, color: C.txtBright, marginBottom: "8px", lineHeight: 1.2 }}>
          Ready to Automate Smarter?<br/>
          Let's <span style={{ fontFamily: F.serif, fontStyle: "italic", fontWeight: 400, color: C.txtBody }}>Build Together</span>
        </h2>
        
        {/* Sub Header */}
        <p style={{ fontFamily: F.inter, fontSize: "16px", color: C.txtBody, marginTop: "24px", marginBottom: "48px" }}>
          Schedule a Call and Begin Automating
        </p>
        
        {/* Glowing Button */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "48px" }}>
          <GlowingButton href="/contact">
            <span style={{ color: C.green }}>Book A Free Call</span> <ArrowUpRight style={{ width: "16px", height: "16px", marginLeft: "6px", color: C.green }} />
          </GlowingButton>
        </div>

        {/* Social Line */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "32px", marginBottom: "32px", color: "#0080FF" }}>
          <a href="https://www.linkedin.com/company/scalepods-co" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", color: "inherit", opacity: 0.8, transition: "opacity 0.2s" }} onMouseEnter={e => e.currentTarget.style.opacity = "1"} onMouseLeave={e => e.currentTarget.style.opacity = "0.8"}>
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <span style={{ opacity: 0.15, fontSize: "20px", color: "#FFF", whiteSpace: "pre" }}>|       |</span>
          <a href="https://www.instagram.com/scalepods.co/" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", color: "inherit", opacity: 0.8, transition: "opacity 0.2s" }} onMouseEnter={e => e.currentTarget.style.opacity = "1"} onMouseLeave={e => e.currentTarget.style.opacity = "0.8"}>
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
        </div>

        {/* Email Address */}
        <a href="mailto:Info@scalepods.co" style={{ fontFamily: F.inter, fontSize: "16px", color: C.txtBright, textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = C.blueOn} onMouseLeave={e => e.currentTarget.style.color = C.txtBright}>
          Info@scalepods.co
        </a>
      </div>
    </section>
  );
}

// ── SVG icons ─────────────────────────────────────────────────────────────────
function LinkedInIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>;
}
function InstagramIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>;
}
