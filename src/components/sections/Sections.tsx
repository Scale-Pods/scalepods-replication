"use client";

import { useState, useEffect, memo, useMemo, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, animate } from "framer-motion";
import { Check, X, ArrowUpRight, Users, Clock, Zap, GitBranch, Sliders, Settings, Bot, Sparkles, Maximize, PieChart, TrendingUp, BarChart3, Plug, Database, Heart, MessageCircle, HelpCircle, ChevronDown, ChevronUp, Layers, GitCompare, Search, Brain, MoveDiagonal, PlugZap, ChevronLeft, ChevronRight } from "lucide-react";
import ParticlesBackground from "@/components/ui/ParticlesBackground";
import ScrollRevealText from "@/components/ui/ScrollRevealText";
import ActivityBarChart from "@/components/ui/ActivityBarChart";
import ScrollReveal from "@/components/ui/ScrollReveal";
import FuturisticGauge from "@/components/ui/FuturisticGauge";
import dynamic from "next/dynamic";

const TestimonialCarousel = dynamic(
  () => import("@/components/ui/TestimonialCarousel"),
  { ssr: false }
);
import { useMobile } from "@/lib/hooks";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/free-mode';

// ── Design tokens — exact CSS Peeper values ───────────────────────────────────
const C = {
  bgPage: "var(--color-bg-page)",
  bgCard: "var(--color-bg-card)",
  bgInput: "var(--color-bg-input)",
  border: "var(--color-border)",
  txtBright: "var(--color-text-bright)",
  txtMid: "var(--color-text-mid)",
  txtBody: "var(--color-text-body)",
  txtMuted: "var(--color-text-muted)",
  txtFaint: "var(--color-text-faint)",
  blueMid: "var(--color-blue-mid)",
  blueOn: "var(--color-blue-bright)",
  green: "var(--color-green)",
};

const F = {
  inter: "var(--font-inter), Inter, sans-serif",
  serif: "var(--font-instrument), 'Instrument Serif', Georgia, serif",
};

// card base style – matches live site card appearance
const card = {
  background: "var(--color-glass-bg)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  border: `1px solid var(--color-glass-border)`,
  boxShadow: "var(--card-shadow), var(--card-shadow-inset)",
  borderRadius: "28px",
} as const;

// Scroll-triggered blur-reveal + fade-up — applied to all cards, badges, and blocks
const fup = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

// ── Shared components ─────────────────────────────────────────────────────────
const Label = memo(function Label({ icon, text }: { icon: string; text: string }) {
  const isMobile = useMobile(767);
  return (
    <ScrollReveal>
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        gap: "8px", 
        marginBottom: isMobile ? "20px" : "16px" 
      }}>
        <span style={{ fontSize: "13px" }}>{icon}</span>
        <span style={{ fontFamily: F.inter, fontSize: "11px", fontWeight: 600, letterSpacing: "0.17em", textTransform: "uppercase" as const, color: C.txtMuted }}>
          {text}
        </span>
      </div>
    </ScrollReveal>
  );
});

const H2 = memo(function H2({ plain, italic, style = {} }: { plain: string; italic?: string; style?: React.CSSProperties }) {
  return (
    <ScrollReveal delay={0.05}>
      <h2 style={{
        fontFamily: F.inter, fontSize: "clamp(32px,4.2vw,52px)",
        fontWeight: 500, color: C.txtBright,
        lineHeight: 1.1, letterSpacing: "-0.022em",
        textAlign: "center", marginBottom: "8px",
        ...style
      }}>
        {plain}
        {italic && (
          <em style={{ fontFamily: F.serif, fontStyle: "italic", fontWeight: 400, color: C.txtBody }}>
            {" "}{italic}
          </em>
        )}
      </h2>
    </ScrollReveal>
  );
});

const Sub = memo(function Sub({ children, style = {} }: { children: string; style?: React.CSSProperties }) {
  const isMobile = useMobile(767);
  return (
    <ScrollReveal delay={0.1}>
      <p style={{
        fontFamily: F.inter, fontSize: "15px", fontWeight: 400, color: C.txtBody,
        lineHeight: 1.65, textAlign: "center", maxWidth: "520px", 
        marginTop: "0px",
        marginRight: "auto",
        marginBottom: isMobile ? "32px" : "12px",
        marginLeft: "auto",
        ...style
      }}>{children}</p>
    </ScrollReveal>
  );
});

import { useTheme } from "@/components/providers/ThemeProvider";

// Global Glowing CTA Button (Flashy Lamp Lighting)
export const GlowingButton = memo(function GlowingButton({ href, children }: { href: string; children: React.ReactNode }) {
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
        background: "radial-gradient(ellipse at center, var(--color-green) 0%, transparent 60%)",
        opacity: 0.1,
        zIndex: -1, pointerEvents: "none"
      }} />

      <div style={{
        position: "relative",
        display: "flex", alignItems: "center", gap: "8px",
        fontFamily: F.inter, fontSize: "15px", fontWeight: 600, color: "#000",
        background: "var(--color-green)",
        border: `1px solid var(--color-green)`,
        borderRadius: "12px", padding: "14px 32px",
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(var(--color-green-rgb), 0.3)",
      }}>

        {/* Soft lamp wash that spreads towards edges on hover */}
        <motion.div
          variants={{
            rest: { opacity: 0.16, width: "140px", height: "50px" },
            hover: { opacity: 0.36, width: "260px", height: "80px" },
          }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute",
            left: "50%",
            bottom: "-30px",
            transform: "translateX(-50%)",
            background: "radial-gradient(ellipse at center, var(--color-green) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />


        <span style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", gap: "6px" }}>
          {children}
        </span>


      </div>
    </motion.a>
  );
});

// ═══════════════════════════════════════════════════════════════════════════════
// GLOBAL SECTION GLOW COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export const SectionGlow = memo(function SectionGlow() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  // Soft, cinematic neutral atmospheric glow (User requested #25282D)
  const glowColor = isDark ? "#25282D" : "#E5E7EB"; 

  return (
    <>
      {/* Diffuse, atmospheric floor ambient glow */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "200px",
        background: `radial-gradient(ellipse at bottom, ${glowColor} 0%, transparent 75%)`,
        zIndex: 0, pointerEvents: "none",
        opacity: isDark ? 0.4 : 0.25
      }} />
      {/* Subtle crisp bounding line with glow */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "1px",
        background: `linear-gradient(90deg, transparent 15%, ${glowColor} 50%, transparent 85%)`,
        boxShadow: `0 -10px 40px 5px ${glowColor}`,
        zIndex: 0, pointerEvents: "none",
        opacity: isDark ? 0.8 : 0.6
      }} />
    </>
  );
});

// Section wrapper — 96px top/bottom padding
function Section({ id, children, style = {} }: { id?: string; children: React.ReactNode; style?: React.CSSProperties }) {
  const { resolvedTheme } = useTheme();
  const isMobile = useMobile(768);
  return (
    <section 
      id={id} 
      className="mobile-section-spacing"
      style={{ 
        position: "relative", 
        background: C.bgPage, 
        padding: "140px 24px",
        marginTop: isMobile ? "75px" : "0px",
        ...style
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {children}
      </div>

      <SectionGlow />
    </section>
  );
}
// SERVICES
// ═══════════════════════════════════════════════════════════════════════════════
export function Services() {
  const { resolvedTheme } = useTheme();
  const isMobile = useMobile(1023);
  return (
    <section 
      id="services" 
      className="mobile-section-spacing"
      style={{ 
        position: "relative", 
        background: C.bgPage, 
        padding: "140px 24px",
        minHeight: isMobile ? "auto" : "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: isMobile ? "75px" : "0px"
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "4px" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: "8px",
          padding: "6px 14px", borderRadius: "100px",
          background: "var(--color-glass-bg)", backdropFilter: "blur(16px)", border: "1px solid var(--color-border)",
        }}>
          <Bot style={{ width: "12px", height: "12px", color: "var(--color-blue-mid)" }} />
          <span style={{ fontFamily: F.inter, fontSize: "10px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: C.txtMuted }}>
            SERVICES
          </span>
        </div>
      </div>
      <div style={{ transform: "scale(0.9)", transformOrigin: "top center", marginBottom: "8px" }}>
        <H2 plain="Smarter Services," italic="Built with AI" />
        <Sub>Everything you need to automate operations, boost productivity</Sub>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-3 w-full">

        {/* 1 – Automate Repetitive Tasks (1col) */}
        <motion.div {...fup(0)} initial="rest" whileHover="hover" style={{ ...card, padding: "12px", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {/* Vertical Infinite Scroller Visual */}
          <div style={{ position: "relative", height: "140px", marginBottom: "16px", display: "flex", flexDirection: "column", justifyContent: "center", borderRadius: "16px", overflow: "hidden", background: resolvedTheme === 'dark' ? "rgba(255, 255, 255, 0.01)" : "rgba(15, 23, 42, 0.02)", border: resolvedTheme === 'dark' ? "1px solid rgba(255, 255, 255, 0.04)" : "1px solid rgba(15, 23, 42, 0.06)", backdropFilter: "blur(16px)" }}>
            {/* Top/Bottom Fade & Blur Mask */}
            <div style={{
              position: "absolute", inset: 0, zIndex: 5,
              background: `linear-gradient(to bottom, var(--color-bg-card) 0%, transparent 25%, transparent 75%, var(--color-bg-card) 100%)`,
              pointerEvents: "none"
            }} />
            <div style={{
              position: "absolute", inset: 0, zIndex: 4,
              backdropFilter: "blur(2px)",
              maskImage: "linear-gradient(to bottom, black 0%, transparent 25%, transparent 75%, black 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 25%, transparent 75%, black 100%)",
              pointerEvents: "none"
            }} />

            <motion.div
              animate={{ y: [0, "-50%"] }}
              transition={{ duration: 28, ease: "linear", repeat: Infinity }}
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {[0, 1].map((set) => (
                <div key={set} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {[
                    { text: "Social media auto-post", cat: "Marketing", color: "#B1D997", status: "done" },
                    { text: "CRM Lead enrichment", cat: "Sales", color: "#6DB6FF", status: "spin" },
                    { text: "Auto-Invoice parsing", cat: "Finance", color: "#FF8F6D", status: "done" },
                    { text: "Support Ticket routing", cat: "Operations", color: "#B39DFF", status: "spin" },
                    { text: "Customer sentiment check", cat: "Success", color: "#6DB6FF", status: "pending" },
                    { text: "Data sync to warehouse", cat: "DataHub", color: "#B1D997", status: "done" },
                  ].map((it, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "8px 12px", borderRadius: "10px",
                      background: resolvedTheme === 'dark' ? "rgba(255, 255, 255, 0.03)" : "#FFFFFF",
                      border: resolvedTheme === 'dark' ? "1px solid rgba(255, 255, 255, 0.06)" : "1px solid rgba(15, 23, 42, 0.08)",
                      boxShadow: resolvedTheme === 'dark' ? "0 4px 12px rgba(0,0,0,0.15)" : "0 4px 10px rgba(15,23,42,0.04)",
                      margin: "0 12px"
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: it.color, display: "inline-block" }} />
                        <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
                          <span style={{ fontFamily: F.inter, fontSize: "10.5px", fontWeight: 550, color: C.txtBright }}>{it.text}</span>
                          <span style={{ fontFamily: F.inter, fontSize: "8px", color: C.txtMuted }}>{it.cat}</span>
                        </div>
                      </div>
                      
                      <div style={{ display: "flex", alignItems: "center" }}>
                        {it.status === "done" && (
                          <div style={{ background: resolvedTheme === 'dark' ? "rgba(177, 217, 151, 0.1)" : "rgba(143, 188, 106, 0.1)", padding: "2px 6px", borderRadius: "6px", display: "flex", alignItems: "center", gap: "3px" }}>
                            <Check style={{ width: "9px", height: "9px", color: resolvedTheme === 'dark' ? "#B1D997" : "#8FBC6A" }} />
                            <span style={{ fontFamily: F.inter, fontSize: "8px", fontWeight: 600, color: resolvedTheme === 'dark' ? "#B1D997" : "#8FBC6A" }}>Active</span>
                          </div>
                        )}
                        {it.status === "spin" && (
                          <div style={{ background: resolvedTheme === 'dark' ? "rgba(109, 182, 255, 0.1)" : "rgba(0, 106, 220, 0.07)", padding: "2px 6px", borderRadius: "6px", display: "flex", alignItems: "center", gap: "4px" }}>
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} style={{ width: "8px", height: "8px", borderRadius: "50%", border: "1.5px solid var(--color-blue-mid)", borderTopColor: "transparent" }} />
                            <span style={{ fontFamily: F.inter, fontSize: "8px", fontWeight: 600, color: C.blueMid }}>Running</span>
                          </div>
                        )}
                        {it.status === "pending" && (
                          <div style={{ background: resolvedTheme === 'dark' ? "rgba(255, 255, 255, 0.05)" : "rgba(15, 23, 42, 0.04)", padding: "2px 6px", borderRadius: "6px", display: "flex", alignItems: "center" }}>
                            <span style={{ fontFamily: F.inter, fontSize: "8px", fontWeight: 600, color: C.txtMuted }}>Idle</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Text Content */}
          <div style={{ textAlign: "center" }}>
            <h3 style={{ fontFamily: F.inter, fontSize: "17px", fontWeight: 700, color: C.blueMid, marginBottom: "4px" }}>
              Automate repetitive tasks
            </h3>
            <p style={{ fontFamily: F.inter, fontSize: "14px", color: C.txtMuted, lineHeight: 1.6 }}>
              We help you streamline internal operations by automating manual workflows
            </p>
          </div>
        </motion.div>

        {/* 2 – Automated Workflows (2cols Wide) - SIDE BY SIDE LAYOUT */}
        <motion.div {...fup(0.1)} initial="rest" whileHover="hover" className="md:col-span-2 flex flex-col md:flex-row items-center gap-4 relative overflow-hidden" style={{ ...card, padding: "12px" }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(var(--color-blue-mid-rgb), 0.08) 0%, transparent 70%)", zIndex: 0 }} />

          <div style={{ position: "relative", flex: 1.2, height: "140px", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
            <div style={{ position: "relative", width: "240px", height: "120px", transform: "scale(0.85)" }}>
 
              {/* Connection Pipelines Grid Lines */}
              <svg width="240" height="120" style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}>
                <path d="M 24 24 L 120 60" stroke={resolvedTheme === 'dark' ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.08)"} strokeWidth="1" strokeDasharray="3 3" />
                <path d="M 84 14 L 120 60" stroke={resolvedTheme === 'dark' ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.08)"} strokeWidth="1" strokeDasharray="3 3" />
                <path d="M 174 19 L 120 60" stroke={resolvedTheme === 'dark' ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.08)"} strokeWidth="1" strokeDasharray="3 3" />
                <path d="M 224 54 L 120 60" stroke={resolvedTheme === 'dark' ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.08)"} strokeWidth="1" strokeDasharray="3 3" />
                <path d="M 194 104 L 120 60" stroke={resolvedTheme === 'dark' ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.08)"} strokeWidth="1" strokeDasharray="3 3" />
                <path d="M 114 114 L 120 60" stroke={resolvedTheme === 'dark' ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.08)"} strokeWidth="1" strokeDasharray="3 3" />
                <path d="M 34 94 L 120 60" stroke={resolvedTheme === 'dark' ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.08)"} strokeWidth="1" strokeDasharray="3 3" />
              </svg>

              {/* Central Glowing AI Star Node */}
              <div style={{
                position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                width: "48px", height: "48px", borderRadius: "50%",
                border: resolvedTheme === 'dark' ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(15,23,42,0.15)",
                background: resolvedTheme === 'dark' ? "rgba(255,255,255,0.05)" : "#FFFFFF",
                backdropFilter: "blur(16px)", display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: resolvedTheme === 'dark' ? "0 0 30px rgba(109,182,255,0.25)" : "0 8px 24px rgba(0, 106, 220, 0.12), 0 0 15px rgba(0, 106, 220, 0.05)",
                zIndex: 20
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill="#ACD791" stroke="#ACD791" strokeWidth="2" />
                </svg>
              </div>
 
              {/* Animated Data Packets */}
              {[...Array(7)].map((_, i) => {
                const positions = [
                  { x: 10, y: 10 }, { x: 70, y: 0 }, { x: 160, y: 5 },
                  { x: 210, y: 40 }, { x: 180, y: 90 }, { x: 100, y: 100 }, { x: 20, y: 80 }
                ];
                const pos = positions[i] || { x: 0, y: 0 };
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 0, y: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      x: [pos.x - 120, 0],
                      y: [pos.y - 60, 0],
                    }}
                    transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.35, ease: "linear" }}
                    style={{
                      position: "absolute", top: "50%", left: "50%",
                      width: "4px", height: "4px",
                      background: resolvedTheme === 'dark' ? "#ACD791" : "#8FBC6A",
                      borderRadius: "50%",
                      boxShadow: resolvedTheme === 'dark' ? "0 0 6px #ACD791" : "0 0 4px #8FBC6A",
                      zIndex: 15
                    }}
                  />
                );
              })}
 
              {/* Elegant Interactive Floating Platform Nodes */}
              {[
                { x: 10, y: 10, icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.034l4.71 6.225 5.5-6.225zm-4.66 17.513h1.833L7.084 4.126H5.117l8.467 15.637z" /></svg> },
                { x: 70, y: 0, icon: <svg width="13" height="13" viewBox="0 0 38 38"><path d="M11.4 0a5.7 5.7 0 000 11.4 5.7 5.7 0 000-11.4zM0 11.4a5.7 5.7 0 005.7 5.7c3.1 0 5.7-2.6 5.7-5.7H0zm5.7 5.7a5.7 5.7 0 000 11.4 5.7 5.7 0 000-11.4zM11.4 22.8a5.7 5.7 0 00-5.7 5.7c0 3.1 2.6 5.7 5.7 5.7s5.7-2.6 5.7-5.7h-5.7zm5.7-11.4a5.7 5.7 0 005.7 5.7H22.8c3.1 0 5.7-2.6 5.7-5.7s-2.6-5.7-5.7-5.7z" fill="currentColor" /></svg> },
                { x: 160, y: 5, icon: <svg width="12" height="12" viewBox="0 0 100 100"><path d="M10 10v80h80V10H10zm11 11h58v58H21V21zm9 8v29l32-15V14l-32 15z" fill="currentColor" /></svg> },
                { x: 210, y: 40, icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.06 13.5H8.94V8.5h6.12v1.85h-3.9v1.44h3.69v1.61h-3.69v1.4h3.9v1.7z" /></svg> },
                { x: 180, y: 90, icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" /></svg> },
                { x: 100, y: 100, icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> },
                { x: 20, y: 80, icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><path d="M9 9h.01" /><path d="M15 9h.01" /></svg> },
              ].map((pos, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 4 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    position: "absolute", top: pos.y, left: pos.x,
                    width: "32px", height: "32px", borderRadius: "10px",
                    background: resolvedTheme === 'dark' ? "rgba(255, 255, 255, 0.03)" : "#FFFFFF",
                    border: resolvedTheme === 'dark' ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(15, 23, 42, 0.12)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    backdropFilter: "blur(4px)",
                    boxShadow: resolvedTheme === 'dark' ? "0 4px 10px rgba(0,0,0,0.3)" : "0 4px 12px rgba(15, 23, 42, 0.08)",
                    color: resolvedTheme === 'dark' ? "#D5DBE6" : "#0F172A",
                    zIndex: 10
                  }}
                >
                  {pos.icon}
                </motion.div>
              ))}

            </div>
          </div>
 
          <div style={{ flex: 1, textAlign: "center" }}>
            <h3 style={{ fontFamily: F.inter, fontSize: "17px", fontWeight: 700, color: C.blueMid, marginBottom: "4px" }}>Automated Workflows</h3>
            <p style={{ fontFamily: F.inter, fontSize: "14px", color: C.txtMuted, lineHeight: 1.5 }}>Build intelligent workflows that automate multi-step processes across platforms.</p>
          </div>
        </motion.div>

        {/* 3 – Real-Time Intelligence (1col) */}
        <motion.div {...fup(0.2)} initial="rest" whileHover="hover" style={{ ...card, padding: "12px" }}>
          <div style={{ position: "relative", width: "100%", height: "140px", marginBottom: "16px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            {/* Background Stacks */}
            <div style={{ position: "absolute", top: "10px", width: "88%", height: "120px", background: "var(--color-glass-bg)", backdropFilter: "blur(16px)", borderRadius: "16px", border: "1px solid var(--color-border)", transform: "translateY(-10px) scale(0.94)", zIndex: 0, opacity: 0.4 }} />
            <div style={{ position: "absolute", top: "20px", width: "88%", height: "120px", background: "var(--color-glass-bg)", backdropFilter: "blur(16px)", borderRadius: "16px", border: "1px solid var(--color-border)", transform: "translateY(-5px) scale(0.97)", zIndex: 1, opacity: 0.7 }} />

            {/* Main Visual Container */}
            <motion.div
              style={{
                position: "relative", width: "88%", height: "120px",
                background: resolvedTheme === 'dark' ? C.bgCard : "#FFFFFF",
                borderRadius: "16px",
                border: resolvedTheme === 'dark' ? `1px solid ${C.border}` : "1px solid rgba(15, 23, 42, 0.1)",
                boxShadow: resolvedTheme === 'dark' ? "0 20px 40px rgba(0,0,0,0.4)" : "0 10px 24px rgba(15, 23, 42, 0.05), 0 2px 6px rgba(15, 23, 42, 0.03)",
                zIndex: 2, padding: "10px", overflow: "hidden"
              }}
            >
              {/* Premium Command Search Bar */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                background: resolvedTheme === 'dark' ? "var(--color-bg-input)" : "#F8FAFC",
                border: resolvedTheme === 'dark' ? "1px solid var(--color-border)" : "1px solid rgba(15, 23, 42, 0.08)",
                borderRadius: "8px", padding: "4px 6px", marginBottom: "8px"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Search style={{ width: "9px", height: "9px", color: resolvedTheme === 'dark' ? "#8E95A3" : "#64748B" }} />
                  <span style={{ fontFamily: F.inter, fontSize: "9px", color: resolvedTheme === 'dark' ? "#8E95A3" : "#64748B", fontWeight: 450 }}>Research market channels...</span>
                </div>
                <span style={{ fontFamily: F.inter, fontSize: "8px", color: C.txtMuted, background: resolvedTheme === 'dark' ? "rgba(255,255,255,0.06)" : "rgba(15, 23, 42, 0.05)", padding: "1px 4px", borderRadius: "3px" }}>⌘K</span>
              </div>

              {/* High-Contrast Interactive Insight Rows */}
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {[
                  { text: "Software & SaaS Industry", val: "+14.6%", cat: "High Match", color: "#6DB6FF" },
                  { text: "Enterprise Workflow Audit", val: "Verified", cat: "Ops", color: "#ACD791" },
                  { text: "AI Automation Readiness", val: "Ready", cat: "Strategy", color: "#B39DFF" },
                ].map((it, i) => (
                  <motion.div
                    key={i}
                    variants={{ rest: { x: 0 }, hover: { x: 6 } }}
                    transition={{ delay: i * 0.05, duration: 0.35 }}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      background: resolvedTheme === 'dark' ? "rgba(255, 255, 255, 0.02)" : "#F8FAFC",
                      border: resolvedTheme === 'dark' ? "1px solid rgba(255, 255, 255, 0.04)" : "1px solid rgba(15, 23, 42, 0.06)",
                      borderRadius: "6px", padding: "4px 8px"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: it.color }} />
                      <span style={{ fontFamily: F.inter, fontSize: "8.5px", fontWeight: 550, color: C.txtBright }}>{it.text}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <span style={{ fontFamily: F.inter, fontSize: "7.5px", color: C.txtMuted }}>{it.cat}</span>
                      <span style={{ fontFamily: F.inter, fontSize: "8px", fontWeight: 600, color: it.color }}>{it.val}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          <div style={{ textAlign: "center" }}>
            <h3 style={{ fontFamily: F.inter, fontSize: "17px", fontWeight: 700, color: C.blueMid, marginBottom: "4px" }}>Real-Time Intelligence</h3>
            <p style={{ fontFamily: F.inter, fontSize: "14px", color: C.txtMuted, lineHeight: 1.6 }}>Make smarter decisions with live data insights. Tap into real-time data</p>
          </div>
        </motion.div>

        {/* 4 – Custom AI Agent (1col) */}
        <motion.div {...fup(0.3)} initial="rest" whileHover="hover" style={{ ...card, padding: "12px" }}>
          <div style={{ position: "relative", height: "140px", marginBottom: "16px", display: "flex", flexDirection: "column", borderRadius: "16px", overflow: "hidden", border: resolvedTheme === 'dark' ? `1px solid ${C.border}` : "1px solid rgba(15, 23, 42, 0.1)", background: resolvedTheme === 'dark' ? C.bgCard : "#FFFFFF", boxShadow: resolvedTheme === 'dark' ? "0 20px 40px rgba(0,0,0,0.4)" : "0 10px 24px rgba(15, 23, 42, 0.05)" }}>
            {/* VS Code/Arc Mac-style Window Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", background: resolvedTheme === 'dark' ? "rgba(255, 255, 255, 0.01)" : "#F8FAFC", borderBottom: resolvedTheme === 'dark' ? "1px solid rgba(255, 255, 255, 0.06)" : "1px solid rgba(15, 23, 42, 0.08)" }}>
              <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#FF5F56" }} />
                <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#FFBD2E" }} />
                <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#27C93F" }} />
              </div>

              {/* Clean Active Editor Tabs */}
              <div style={{ display: "flex", gap: "4px", margin: "0 10px", flex: 1 }}>
                <div style={{
                  background: resolvedTheme === 'dark' ? "rgba(255, 255, 255, 0.04)" : "#FFFFFF",
                  borderTop: resolvedTheme === 'dark' ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(15,23,42,0.08)",
                  borderLeft: resolvedTheme === 'dark' ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(15,23,42,0.08)",
                  borderRight: resolvedTheme === 'dark' ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(15,23,42,0.08)",
                  borderBottom: "none",
                  borderRadius: "5px 5px 0 0",
                  padding: "2px 8px",
                  fontFamily: F.inter,
                  fontSize: "8px",
                  fontWeight: 600,
                  color: C.txtBright,
                  display: "flex",
                  alignItems: "center",
                  gap: "4px"
                }}>
                  <Bot style={{ width: "8px", height: "8px", color: "var(--color-blue-mid)" }} />
                  agent.py
                </div>
                <div style={{ fontFamily: F.inter, fontSize: "8px", color: C.txtMuted, padding: "2px 4px", opacity: 0.6 }}>config.yml</div>
              </div>

              <div style={{ background: resolvedTheme === 'dark' ? "rgba(255, 255, 255, 0.04)" : "rgba(15, 23, 42, 0.05)", border: resolvedTheme === 'dark' ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(15, 23, 42, 0.08)", borderRadius: "4px", padding: "2px 6px", fontSize: "8px", color: C.txtMuted, fontFamily: F.inter, fontWeight: 500 }}>
                Python
              </div>
            </div>

            {/* Code Content Editor */}
            <div style={{ position: "relative", flex: 1, overflow: "hidden", padding: "8px 0", background: resolvedTheme === 'dark' ? "#0A0D14" : "#FAFBFD" }}>
              <div style={{ position: "absolute", inset: 0, zIndex: 5, background: `linear-gradient(to bottom, transparent 40%, ${resolvedTheme === 'dark' ? '#0A0D14' : '#FAFBFD'} 100%)`, pointerEvents: "none" }} />

              <motion.div
                animate={{ y: [0, -180] }}
                transition={{ duration: 16, ease: "linear", repeat: Infinity }}
                style={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                {[0, 1].map((set) => (
                  <div key={set} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {[
                      { l: 1, c: "# Auto-initialize scheduler agent", t: "comment" },
                      { l: 2, c: "self.activation_limit =", v: "24", t: "normal" },
                      { l: 3, c: "self.current_mode = ", v: '"active_routing"', t: "normal" },
                      { l: 4, c: "def evaluate_incoming_leads(self, count):", t: "def" },
                      { l: 5, c: "if count > self.activation_limit:", t: "keyword", indent: true },
                      { l: 6, c: "self.dispatch_agent(mode='scale')", t: "normal", indent: true },
                      { l: 7, c: "return self.current_mode", t: "keyword", indent: true },
                    ].map((line, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "0 12px" }}>
                        <div style={{ minWidth: "12px", fontFamily: "monospace", fontSize: "8px", color: resolvedTheme === 'dark' ? "#3E4451" : "#94A3B8", textAlign: "right" }}>
                          {line.l}
                        </div>
                        <div style={{ fontFamily: "monospace", fontSize: "9px", lineHeight: "1.4", color: resolvedTheme === 'dark' ? "#ABB2BF" : "#383A42", whiteSpace: "pre" }}>
                          {line.indent && "  "}
                          {line.t === "comment" && <span style={{ color: "#5C6370", fontStyle: "italic" }}>{line.c}</span>}
                          {line.t === "def" && (
                            <>
                              <span style={{ color: resolvedTheme === 'dark' ? "#C678DD" : "#A626A2", fontWeight: 600 }}>def </span>
                              <span style={{ color: resolvedTheme === 'dark' ? "#61AFEF" : "#4078F2" }}>{line.c.substring(4)}</span>
                            </>
                          )}
                          {line.t === "keyword" && (
                            <>
                              <span style={{ color: resolvedTheme === 'dark' ? "#C678DD" : "#A626A2", fontWeight: 600 }}>{line.c.split(" ")[0]} </span>
                              <span>{line.c.substring(line.c.split(" ")[0].length + 1)}</span>
                            </>
                          )}
                          {line.t === "normal" && <span>{line.c}</span>}
                          {line.v && <span style={{ color: resolvedTheme === 'dark' ? "#98C379" : "#50A14F" }}>{line.v}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <h3 style={{ fontFamily: F.inter, fontSize: "17px", fontWeight: 700, color: C.blueMid, marginBottom: "4px" }}>Custom AI Agent development</h3>
            <p style={{ fontFamily: F.inter, fontSize: "14px", color: C.txtMuted, lineHeight: 1.6 }}>We develop custom AI agents that integrate seamlessly with your tools</p>
          </div>
        </motion.div>

        {/* 5 – AI Strategy Consulting (1col) */}
        <motion.div {...fup(0.4)} initial="rest" whileHover="hover" style={{ ...card, padding: "12px" }}>
          <div style={{ position: "relative", height: "140px", marginBottom: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ transform: "scale(0.95)", transformOrigin: "center" }}>
              <svg width="220" height="130" viewBox="0 0 220 130">
              <motion.path
                d="M110 65 L40 25 M110 65 L60 110 M110 65 L170 30 M110 65 L190 90"
                stroke={resolvedTheme === 'dark' ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.1)"} strokeWidth="1.5" strokeDasharray="4 4"
                variants={{ rest: { strokeDashoffset: [0, -20] } }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              />

              {/* Dynamic Connecting Lines Backdrops */}
              <circle cx="40" cy="25" r="16" fill={resolvedTheme === 'dark' ? C.bgCard : "#FFFFFF"} stroke={resolvedTheme === 'dark' ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.12)"} strokeWidth="1.5" style={{ filter: resolvedTheme === 'dark' ? "none" : "drop-shadow(0 2px 6px rgba(0,0,0,0.04))" }} />
              <rect x="34" y="19" width="3" height="12" fill="#545B7D" rx="1" />
              <rect x="40" y="15" width="3" height="16" fill="var(--color-text-muted)" rx="1" />
              <rect x="46" y="23" width="3" height="8" fill="#545B7D" rx="1" />

              <circle cx="60" cy="110" r="12" fill={resolvedTheme === 'dark' ? C.bgCard : "#FFFFFF"} stroke={resolvedTheme === 'dark' ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.12)"} strokeWidth="1.5" style={{ filter: resolvedTheme === 'dark' ? "none" : "drop-shadow(0 2px 6px rgba(0,0,0,0.04))" }} />
              <circle cx="60" cy="110" r="4" fill="#6DB6FF" />

              <circle cx="170" cy="30" r="10" fill={resolvedTheme === 'dark' ? C.bgCard : "#FFFFFF"} stroke={resolvedTheme === 'dark' ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.12)"} strokeWidth="1.5" />
              <circle cx="170" cy="30" r="3" fill="#B1D997" />

              <motion.circle
                cx="190" cy="90" r="18" fill="rgba(172,215,145,0.08)" stroke="rgba(172,215,145,0.3)"
                variants={{ rest: { scale: [1, 1.12, 1], opacity: [0.8, 1, 0.8] } }} transition={{ duration: 3, repeat: Infinity }}
              />
              <path d="M190 82L193.37 88.83L200.9 89.92L195.45 95.23L196.74 102.72L190 99.18L183.26 102.72L184.55 95.23L179.1 89.92L186.63 88.83L190 82Z" fill="#ACD791" />

              {/* Pulsing Central Hub Node */}
              <motion.circle cx="110" cy="65" r="7" fill="#6DB6FF" variants={{ rest: { scale: [1, 1.3, 1], filter: ["blur(0px)", "blur(1.5px)", "blur(0px)"] } }} transition={{ duration: 2.5, repeat: Infinity }} />
              <circle cx="110" cy="65" r="4" fill="#FFFFFF" />
            </svg>
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <h3 style={{ fontFamily: F.inter, fontSize: "17px", fontWeight: 700, color: C.blueMid, marginBottom: "4px" }}>AI Strategy Consulting</h3>
            <p style={{ fontFamily: F.inter, fontSize: "14px", color: C.txtMuted, lineHeight: 1.6 }}>Get expert guidance to implement AI solutions that drive business growth</p>
          </div>
        </motion.div>

      </div>
      </div>

      <SectionGlow />
    </section>
  );
}


// ═══════════════════════════════════════════════════════════════════════════════
// DATA ANALYSIS — tall section with big centered text
// ═══════════════════════════════════════════════════════════════════════════════
const brands = [
  { src: "/brands/BECO.avif", alt: "BECO", type: "transparent", scale: 0.9 },
  { src: "/brands/gammacode.webp", alt: "Gammacode", type: "transparent", scale: 0.9 },
  { src: "/brands/krafty-logo-white.png", alt: "Krafty", type: "transparent-white", scale: 0.9 },
  { src: "/brands/hobbyfi_logo.jpg", alt: "HobbyFi", type: "white-bg", scale: 1.35 },
  { src: "/brands/Break-the-code.avif", alt: "Break The Code", type: "white-bg", scale: 1.35 },
  { src: "/brands/passsionfruit.avif", alt: "Passionfruit", type: "transparent", scale: 1.0 },
  { src: "/brands/propertygeld.png", alt: "PropertyGeld", type: "transparent", scale: 0.95 },
  { src: "/brands/zv_steels_logo.webp", alt: "ZV Steels", type: "transparent", scale: 0.8 },
  { src: "/brands/lotus-manor.webp", alt: "Lotus Manor", type: "transparent", scale: 1.25 },
  { src: "/brands/suphalmedia.avif", alt: "Suphal Media", type: "transparent", scale: 1.0 },
  { src: "/new logos/VE-Logo-Color.svg", alt: "Victory Energy", type: "victory-energy", scale: 1.25 },
  { src: "/brands/eequals_logo.webp", alt: "eEquals", type: "transparent", scale: 1.4 },
  { src: "/brands/aspen-real-estate.jpg", alt: "Aspen Real Estate", type: "white-bg", scale: 2.2 },
  { src: "/brands/naples-homes.jpg", alt: "Naples Homes", type: "dark-bg", scale: 1.6 },
  { src: "/brands/bennett-realty-solutions.jpg", alt: "Bennett Realty Solutions", type: "white-bg", scale: 2.0 },
  { src: "/brands/guileo-ai.png", alt: "Guileo AI", type: "transparent", scale: 1.35 },
];

const getLogoFilter = (brand: any, resolvedTheme: string, isHovered: boolean) => {
  const isDark = resolvedTheme === "dark";
  
  if (brand.type === "victory-energy") {
    if (isDark) {
      if (isHovered) {
        return "invert(1) hue-rotate(180deg) drop-shadow(0 0 12px rgba(177, 217, 151, 0.45))";
      }
      return "invert(1) hue-rotate(180deg) grayscale(1) opacity(0.65)";
    } else {
      if (isHovered) {
        return "drop-shadow(0 0 12px rgba(0, 0, 0, 0.15))";
      }
      return "grayscale(1) opacity(0.65)";
    }
  }

  if (isHovered) {
    const baseFilter = brand.type === "white-bg" 
      ? "url(#remove-white-bg) " 
      : brand.type === "dark-bg" 
        ? "invert(1) url(#remove-white-bg) invert(1) " 
        : "";
    
    // For transparent white logo in light mode, force solid black on hover so it doesn't render white-on-white.
    if (brand.type === "transparent-white" && !isDark) {
      return "brightness(0) drop-shadow(0 0 12px rgba(0, 0, 0, 0.15))";
    }

    return baseFilter + (isDark 
      ? "drop-shadow(0 0 12px rgba(177, 217, 151, 0.45))" 
      : "drop-shadow(0 0 12px rgba(0, 0, 0, 0.15))");
  }

  // Default monochrome states
  if (brand.type === "white-bg") {
    return isDark 
      ? "url(#remove-white-bg) grayscale(1) brightness(0) invert(1)" 
      : "url(#remove-white-bg) grayscale(1) brightness(0)";
  }
  
  if (brand.type === "dark-bg") {
    return isDark 
      ? "invert(1) url(#remove-white-bg) grayscale(1) brightness(1)" 
      : "invert(1) url(#remove-white-bg) grayscale(1) brightness(0)";
  }
  
  if (brand.type === "transparent-white") {
    return isDark ? "none" : "brightness(0)";
  }
  
  return isDark ? "brightness(0) invert(1)" : "brightness(0)";
};

export function BrandsMarquee() {
  const isMobile = useMobile(1023);
  const { resolvedTheme } = useTheme();
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Auto-resume after some time if tapped on mobile
  useEffect(() => {
    if (isPaused && isMobile) {
      const timer = setTimeout(() => {
        setIsPaused(false);
        setHoveredIndex(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isPaused, isMobile]);

  return (
    <>
      <svg width="0" height="0" style={{ position: "absolute", pointerEvents: "none" }}>
        <defs>
          <filter id="remove-white-bg" colorInterpolationFilters="sRGB">
            <feColorMatrix in="SourceGraphic" type="matrix" values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              -2.5 -2.5 -2.5 0 7.2
            " result="chroma" />
            <feComposite in="chroma" in2="SourceGraphic" operator="in" />
          </filter>
        </defs>
      </svg>
      <div 
        data-scroll-observed="1"
        style={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
          marginTop: isMobile ? "20px" : "40px",
          padding: isMobile ? "20px 0" : "40px 0",
          zIndex: 10,
          maskImage: isMobile ? "none" : "linear-gradient(to right, transparent, var(--color-bg-page) 15%, var(--color-bg-page) 85%, transparent)",
          WebkitMaskImage: isMobile ? "none" : "linear-gradient(to right, transparent, var(--color-bg-page) 15%, var(--color-bg-page) 85%, transparent)",
          opacity: 1,
          transform: "none"
        }}
      >
        <style>{`
          .marquee-wrapper-v4 {
            width: 100%;
            overflow: hidden;
            position: relative;
          }
          .marquee-track-v4 {
            display: flex;
            align-items: center;
            width: max-content;
            gap: 56px;
            animation: marquee-v4 30s linear infinite;
            will-change: transform;
            backface-visibility: hidden;
            contain: content;
          }
          .paused-v3 {
            animation-play-state: paused !important;
          }
          /* Swiper Custom Styles for Continuous Motion */
          .mobile-swiper .swiper-wrapper {
            transition-timing-function: linear !important;
          }
          @keyframes marquee-v4 {
            from { transform: translate3d(0,0,0); }
            to { transform: translate3d(-33.333%,0,0); }
          }
        `}</style>

        {isMobile ? (
          <div className="marquee-wrapper-v4 mobile-swiper" style={{ marginTop: "20px" }}>
            <Swiper
              modules={[Autoplay, FreeMode]}
              slidesPerView="auto"
              loop={true}
              freeMode={{
                enabled: true,
                momentum: false,
                momentumBounce: false,
                sticky: false
              }}
              allowTouchMove={false}
              speed={2200}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
                waitForTransition: true
              }}
              style={{ 
                width: "100%", 
                height: "44px", 
                willChange: "transform",
                transform: "translate3d(0,0,0)",
                backfaceVisibility: "hidden"
              }}
            >
              {[...brands, ...brands, ...brands].map((brand: any, i) => (
                <SwiperSlide 
                  key={`mobile-${brand.alt}-${i}`} 
                  style={{ width: "auto", display: "flex", alignItems: "center", padding: "0 20px" }}
                >
                  <div style={{
                    height: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <img
                      src={brand.src}
                      alt={brand.alt}
                      style={{
                        height: `${32 * (brand.scale || 1)}px`,
                        width: "auto",
                        objectFit: "contain",
                        background: "transparent",
                        pointerEvents: "none",
                        userSelect: "none",
                        filter: getLogoFilter(brand, resolvedTheme || "dark", false),
                      }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <div className="marquee-wrapper-v4">
            <div className={`marquee-track-v4 ${isPaused ? 'paused-v3' : ''}`}>
              {[...brands, ...brands, ...brands].map((brand: any, i) => {
                const isHovered = hoveredIndex === i;
                const isAnyHovered = hoveredIndex !== null;
                
                // Adaptive CSS Filters for Brand Logos
                const logoFilter = getLogoFilter(brand, resolvedTheme || "dark", isHovered);
                const logoTransform = isHovered ? "scale(1.08)" : "scale(1)";

                return (
                  <div
                    key={`${brand.alt}-${i}`}
                    onMouseEnter={() => {
                      setHoveredIndex(i);
                      setIsPaused(true);
                    }}
                    onMouseLeave={() => {
                      setHoveredIndex(null);
                      setIsPaused(false);
                    }}
                    style={{
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: "140px",
                      height: "54px",
                      transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                      transform: logoTransform,
                      opacity: isHovered ? 1 : (isAnyHovered ? 0.35 : 0.65),
                      cursor: "pointer",
                      willChange: "transform, opacity"
                    }}
                  >
                    <img
                      src={brand.src}
                      alt={brand.alt}
                      style={{
                        height: `${54 * (brand.scale || 1)}px`,
                        width: "auto",
                        objectFit: "contain",
                        pointerEvents: "none",
                        userSelect: "none",
                        background: "transparent",
                        transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                        filter: logoFilter,
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export function DataAnalysis() {
  const isMobile = useMobile(1023);
  return (
    <Section id="data-analysis">
      <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "center",
        textAlign: "center",
        minHeight: isMobile ? "auto" : "600px",
        padding: isMobile ? "24px 12px 16px" : "100px 32px",
        width: "100%",
        maxWidth: "100vw",
        overflow: "hidden"
      }}>


      {/* Badge matching live site */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: "8px",
        padding: "6px 16px", borderRadius: "20px",
        background: "var(--color-glass-bg)", backdropFilter: "blur(16px)", border: `1px solid var(--color-border)`,
        marginBottom: "32px",
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--color-blue-mid)" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
        <span style={{ fontFamily: F.inter, fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: C.txtBright }}>
          WE ANALYZE YOUR DATA
        </span>
      </div>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: isMobile ? "0 10px" : "0" }}>
        <ScrollRevealText
          className="justify-center text-center"
          words={[
            { text: "We" },
            { text: "find" },
            { text: "what" },
            { text: "to" },
            { text: "automate", italic: true, accentColor: "#ACD791" },
            { text: "who" },
            { text: "your" },
            { text: "users" },
            { text: "are" },
            { text: "&" },
            { text: "how" },
            { text: "AI", newLine: !isMobile },
            { text: "can" },
            { text: "optimize" },
            { text: "your" },
            { text: "workflow.", italic: true, accentColor: "#ACD791", newLine: isMobile },
            { text: "Best" },
            { text: "part" },
            { text: "is" },
            { text: "we" },
            { text: "also" },
            { text: "build", newLine: !isMobile },
            { text: "and" },
            { text: "launch" },
            { text: "custom", italic: true, accentColor: "#ACD791" },
            { text: "solutions.", italic: true, accentColor: "#ACD791" },
          ]}
          fontFamily={F.inter}
          fontSize={isMobile ? "22px" : "clamp(18px, 2.5vw, 30px)"}
          color="var(--color-text-muted)"
          italicFontFamily={F.serif}
          lineHeight={isMobile ? 1.3 : 1.4}
        />
      </div>

      {/* Trusted Brands Marquee */}
      <div style={{ 
        marginTop: isMobile ? "40px" : "120px", 
        width: "100%", 
        maxWidth: "1200px", 
        zIndex: 1,
        paddingBottom: isMobile ? "10px" : "0"
      }}>
        <p style={{
          fontFamily: "var(--font-inter), Inter, sans-serif",
          fontSize: isMobile ? "14px" : "18px",
          color: "var(--color-text-muted)",
          marginBottom: isMobile ? "32px" : "48px",
          fontWeight: 400,
          letterSpacing: "0.01em"
        }}>
          Trusted by thousands of companies and investors all over the world
        </p>
        <BrandsMarquee />
      </div>
    </div>
    </Section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// BENEFITS
// ═══════════════════════════════════════════════════════════════════════════════

const BenefitCard = memo(function BenefitCard({ card, i }: { card: any, i: number }) {
  const [hovered, setHovered] = useState(false);
  const { resolvedTheme } = useTheme();
  const isMobile = useMobile(768);

  return (
    <motion.div
      {...fup(i * 0.1)}
      initial="rest"
      whileHover="hover"
      animate="rest"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: C.bgCard,
        borderRadius: "28px",
        padding: "32px 0",
        overflow: "hidden",
        border: `1.5px solid ${C.border}`,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "340px",
        boxShadow: resolvedTheme === 'dark' ? "0 15px 45px -10px rgba(0,0,0,0.6)" : "0 10px 30px -10px rgba(0,0,0,0.05)",
        cursor: "default",
        transform: "translate3d(0,0,0)",
        willChange: "transform"
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, var(--color-border), transparent)", zIndex: 2 }} />
      <div style={{ position: "absolute", bottom: 0, left: "20%", right: "20%", height: "1.5px", background: "linear-gradient(90deg, transparent, var(--color-border), transparent)", pointerEvents: "none", zIndex: 2 }} />
      <div style={{ 
        width: "100%", 
        height: isMobile ? "140px" : "160px", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        position: "relative", 
        zIndex: 1,
        marginBottom: "20px"
      }}>
        <div style={{ transform: isMobile ? "scale(0.8)" : "scale(0.9)" }}>
          <card.Icon hovered={hovered} />
        </div>
      </div>
      <div style={{ padding: "0 28px", position: "relative", zIndex: 1 }}>
        <motion.h3
          variants={{ rest: { color: C.blueMid }, hover: { color: "#94D1FF" } }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: F.inter, fontSize: "17px", fontWeight: 700, marginBottom: "8px", lineHeight: 1.3 }}
        >
          {card.title}
        </motion.h3>
        <p style={{ fontFamily: F.inter, fontSize: "14px", color: C.txtMuted, lineHeight: 1.6, marginBottom: 0 }}>
          {card.desc}
        </p>
      </div>
    </motion.div>
  );
});

const AIStrategyGrowthGraph = memo(function AIStrategyGrowthGraph({ hovered, resolvedTheme }: { hovered: boolean; resolvedTheme?: string }) {
  const [phase, setPhase] = useState(0);
  const requestRef = useRef<number | null>(null);
  
  useEffect(() => {
    let lastTime = performance.now();
    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;
      
      // Auto-play infinite wave propagation, slightly accelerated on hover for kinetic feedback
      setPhase((prev) => prev + (hovered ? 2.0 : 1.0) * delta);
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [hovered]);

  const startX = 10;
  const endX = 230;
  const step = 4;
  const points: [number, number][] = [];
  
  for (let x = startX; x <= endX; x += step) {
    const progress = (x - startX) / (endX - startX);
    // Math wave mapping: climbs from y=120 down to y=40 organically with stable endpoints
    const baseY = 120 - progress * 80;
    const wave = Math.sin(progress * Math.PI * 2.5 - phase) * 8 * Math.sin(progress * Math.PI);
    points.push([x, baseY + wave]);
  }
  
  const linePath = `M ${points.map(([x, y]) => `${x},${y}`).join(" L ")}`;
  const areaPath = `${linePath} L ${endX},150 L ${startX},150 Z`;

  // Track dynamic nodes moving directly along the wave curvature
  const getNodePos = (progress: number): [number, number] => {
    const x = startX + progress * (endX - startX);
    const baseY = 120 - progress * 80;
    const wave = Math.sin(progress * Math.PI * 2.5 - phase) * 8 * Math.sin(progress * Math.PI);
    return [x, baseY + wave];
  };

  const node1 = getNodePos(0.25);
  const node2 = getNodePos(0.65);
  const node3 = getNodePos(1.0); // Perfect peak node (remains mathematically anchored at x=230, y=40)

  const isDark = resolvedTheme === "dark";
  const lineColor = isDark ? "#38BDF8" : "#2563EB"; // Neon cyan/blue vs deep vibrant cobalt
  const accentColor = isDark ? "#ACD791" : "#8FBC6A"; // Premium brand green (adaptive)
  const gridColor = isDark ? "rgba(228, 233, 242, 0.06)" : "rgba(15, 23, 42, 0.05)";

  return (
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 240 160" 
      preserveAspectRatio="xMidYMid meet"
      style={{ 
        overflow: "visible",
        width: "240px",
        height: "160px"
      }}
    >
      <defs>
        {/* Futuristic glowing dropshadow */}
        <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        
        {/* Soft background wave fill gradient */}
        <linearGradient id="chartAreaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={lineColor} stopOpacity={isDark ? 0.28 : 0.18} />
          <stop offset="100%" stopColor={lineColor} stopOpacity={0} />
        </linearGradient>

        {/* Multi-stop glowing line path gradient */}
        <linearGradient id="chartLineGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={lineColor} />
          <stop offset="50%" stopColor="#818CF8" />
          <stop offset="100%" stopColor={accentColor} />
        </linearGradient>
      </defs>

      {/* Cyber Grid Coordinates */}
      <g stroke={gridColor} strokeWidth="1" strokeDasharray="3 3">
        <line x1="10" y1="40" x2="230" y2="40" />
        <line x1="10" y1="80" x2="230" y2="80" />
        <line x1="10" y1="120" x2="230" y2="120" />
        <line x1="65" y1="20" x2="65" y2="150" />
        <line x1="120" y1="20" x2="120" y2="150" />
        <line x1="175" y1="20" x2="175" y2="150" />
      </g>

      {/* Base X-Axis line */}
      <line x1="10" y1="150" x2="230" y2="150" stroke={gridColor} strokeWidth="1.5" />

      {/* Shaded dynamic gradient area under curve */}
      <path d={areaPath} fill="url(#chartAreaGrad)" />

      {/* Hardware-accelerated dynamic main line */}
      <path 
        d={linePath} 
        fill="none" 
        stroke="url(#chartLineGrad)" 
        strokeWidth="3.5" 
        strokeLinecap="round"
        style={{
          filter: hovered ? "url(#neonGlow)" : "none",
          transition: "filter 0.3s ease"
        }}
      />

      {/* Multi-frequency pulsing data tracking nodes */}
      {/* Node 1 (Low freq pulse) */}
      <g transform={`translate(${node1[0]}, ${node1[1]})`}>
        <circle r="7" fill={lineColor} opacity="0.3">
          <animate attributeName="r" values="5;10;5" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle r="4" fill="url(#chartLineGrad)" stroke={isDark ? "#04070D" : "#FFF"} strokeWidth="1.5" />
      </g>

      {/* Node 2 (Medium freq pulse) */}
      <g transform={`translate(${node2[0]}, ${node2[1]})`}>
        <circle r="7" fill="#818CF8" opacity="0.3">
          <animate attributeName="r" values="5;10;5" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle r="4" fill="url(#chartLineGrad)" stroke={isDark ? "#04070D" : "#FFF"} strokeWidth="1.5" />
      </g>

      {/* Node 3 (High freq pulse at stable peak endpoint) */}
      <g transform={`translate(${node3[0]}, ${node3[1]})`}>
        <circle r="9" fill={accentColor} opacity="0.25">
          <animate attributeName="r" values="5;13;5" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle r="4" fill={accentColor} stroke={isDark ? "#04070D" : "#FFF"} strokeWidth="2" />
      </g>
    </svg>
  );
});

const benefitCards = [
  {
    title: "Real-Time Intelligence",
    desc: "Access accurate, real-time data to drive smarter decisions",
    Icon: function RadarSweep({ hovered }: { hovered: boolean }) {
      return (
        <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
          <style>{`
            .radar-panel {
              position: relative;
              width: 160px;
              height: 160px;
              border-radius: 50%;
              border: 1px solid var(--color-border);
              box-shadow: 
                inset 0 0 0 26px transparent,
                inset 0 0 0 27px var(--color-border),
                inset 0 0 0 53px transparent,
                inset 0 0 0 54px var(--color-border);
              overflow: hidden;
              animation: breathing 8s infinite ease-in-out;
              will-change: transform, opacity;
            }
            
            @keyframes breathing {
              0%, 100% { transform: scale(0.96); opacity: 0.7; }
              50% { transform: scale(1.02); opacity: 1; }
            }
            
            .radar-panel:before {
              content: '';
              display: block;
              position: absolute;
              top: 0;
              left: 50%;
              width: 1px;
              height: 100%;
              background: var(--color-border);
            }
            
            .radar-panel:after {
              content: '';
              display: block;
              position: absolute;
              top: 50%;
              left: 0;
              width: 100%;
              height: 1px;
              background: var(--color-border);
            }
            
            .radar-scanner {
              position: absolute;
              top: 0;
              left: 0;
              width: 160px;
              height: 160px;
              background: conic-gradient(from 0deg, transparent 70%, rgba(var(--color-blue-mid-rgb), 0.2) 99%, var(--color-blue-mid) 100%);
              border-radius: 50%;
              transform-origin: center;
              animation: scanning 4s infinite linear;
              will-change: transform;
            }
            
            .radar-targets {
              list-style: none;
              margin: 0;
              padding: 0;
            }
            
            .radar-target {
              display: block;
              position: absolute;
              width: 6px;
              height: 6px;
              border-radius: 50%;
              background: #6DB6FF;
              box-shadow: 0 0 10px #6DB6FF;
              opacity: 0;
              animation: target-pulse 4s infinite linear;
              will-change: opacity, transform;
            }

            @keyframes scanning {
              100% { transform: rotate(360deg); }
            }
            
            @keyframes target-pulse {
              1% { opacity: 0.5; transform: scale(2.5); }
              3% { opacity: 1; transform: scale(1.5); }
              60% { opacity: 0; transform: scale(0.6); }
            }
          `}</style>

          <div className="radar-panel">
            <div 
              className="radar-scanner" 
              style={{ 
                animationPlayState: 'running',
                opacity: hovered ? 1 : 0.35,
                transition: 'opacity 0.6s ease'
              }} 
            />
            <ul className="radar-targets">
              <li className="radar-target" style={{ animationDelay: "2250ms", top: "30%", left: "30%", opacity: hovered ? 1 : 0.15, transition: 'opacity 0.8s ease' }} />
              <li className="radar-target" style={{ animationDelay: "3200ms", top: "15%", left: "60%", opacity: hovered ? 1 : 0.15, transition: 'opacity 0.8s ease' }} />
              <li className="radar-target" style={{ animationDelay: "5050ms", top: "70%", left: "80%", opacity: hovered ? 1 : 0.15, transition: 'opacity 0.8s ease' }} />
              <li className="radar-target" style={{ animationDelay: "1100ms", top: "60%", left: "20%", opacity: hovered ? 1 : 0.15, transition: 'opacity 0.8s ease' }} />
              <li className="radar-target" style={{ animationDelay: "3000ms", top: "30%", left: "50%", opacity: hovered ? 1 : 0.15, transition: 'opacity 0.8s ease' }} />
            </ul>
          </div>
        </div>
      );
    }
  },
  {
    title: "AI Strategy & Growth",
    desc: "Get expert guidance to implement AI solutions that drive business growth",
    Icon: function Bars({ hovered }: { hovered: boolean }) {
      const { resolvedTheme } = useTheme();
      return <AIStrategyGrowthGraph hovered={hovered} resolvedTheme={resolvedTheme} />;
    }
  },
  {
    title: "Custom AI Solutions",
    desc: "We develop custom AI agents that integrate seamlessly with your tools",
    Icon: function Nodes({ hovered }: { hovered: boolean }) {
      return (
        <svg width="200" height="160" viewBox="0 0 210 200">
          <motion.g
            animate={{
              rotate: 360,
              scale: hovered ? 1.08 : 1
            }}
            transition={{
              rotate: { duration: hovered ? 15 : 45, repeat: Infinity, ease: "linear" },
              scale: { duration: 0.5, ease: "easeOut" }
            }}
            style={{ transformOrigin: "105px 100px", willChange: "transform" }}
          >
            <line x1="105" y1="100" x2="50" y2="50" stroke="var(--color-border)" strokeWidth="2" />
            <line x1="105" y1="100" x2="160" y2="45" stroke="var(--color-border)" strokeWidth="2" />
            <line x1="105" y1="100" x2="35" y2="115" stroke="var(--color-border)" strokeWidth="2" />
            <line x1="105" y1="100" x2="175" y2="125" stroke="var(--color-border)" strokeWidth="2" />
            <line x1="105" y1="100" x2="115" y2="165" stroke="var(--color-border)" strokeWidth="2" />
            <circle cx="50" cy="50" r="4.5" fill="var(--color-bg-card-alt)" stroke="var(--color-border)" strokeWidth="1" />
            <circle cx="160" cy="45" r="4.5" fill="var(--color-bg-card-alt)" stroke="var(--color-border)" strokeWidth="1" />
            <circle cx="35" cy="115" r="4.5" fill="var(--color-bg-card-alt)" stroke="var(--color-border)" strokeWidth="1" />
            <circle cx="175" cy="125" r="4.5" fill="var(--color-bg-card-alt)" stroke="var(--color-border)" strokeWidth="1" />
            <circle cx="115" cy="165" r="4.5" fill="var(--color-bg-card-alt)" stroke="var(--color-border)" strokeWidth="1" />
            <circle cx="105" cy="100" r="14" fill="var(--color-bg-card-alt)" stroke="var(--color-border)" strokeWidth="1" />
            <circle cx="105" cy="100" r="9" fill="rgba(var(--color-blue-mid-rgb), 0.1)" stroke="rgba(var(--color-blue-mid-rgb), 0.3)" strokeWidth="0.5" />
            <circle cx="105" cy="100" r="2" fill="#6DB6FF" />
            {[0, 60, 120, 180, 240, 300].map(angle => {
              const r = 5.5;
              const x = 105 + r * Math.cos(angle * Math.PI / 180);
              const y = 100 + r * Math.sin(angle * Math.PI / 180);
              return <circle key={angle} cx={x} cy={y} r="1" fill="#6DB6FF" opacity="0.8" />;
            })}
            <circle cx="105" cy="100" r="10" fill="none" stroke="#6DB6FF" strokeWidth="0.5" strokeDasharray="1 3" opacity="0.4" />
          </motion.g>
        </svg>
      );
    }
  },
];

export function Benefits() {
  const isMobile = useMobile(768);
  return (
    <Section 
      id="benefits" 
      style={{
        marginTop: isMobile ? "75px" : "0px"
      }}
    >
      <Label icon="✦" text="BENEFITS" />
      <H2 plain="Why Choose " italic="Us?" />
      <Sub>Automate growth with intelligence and speed</Sub>

      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
        gap: isMobile ? "32px" : "24px",
        marginTop: "48px"
      }}>
        {benefitCards.map((card, i) => (
          <BenefitCard key={i} card={card} i={i} />
        ))}
      </div>
    </Section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FEATURES
// ═══════════════════════════════════════════════════════════════════════════════
export function Features() {
  const isMobile = useMobile(768);
  const items = [
    {
      title: "Workflow Automation",
      desc: "Automate complex business processes to boost speed, clarity, and efficiency.",
      Visual: ({ hovered }: { hovered: boolean }) => (
        <FeatureVisual hovered={hovered} i1={<GitBranch style={{ width: "30px", height: "30px" }} />} i2={<Brain style={{ width: "30px", height: "30px" }} />} />
      )
    },
    {
      title: "Custom AI Solutions",
      desc: "Build tailored AI systems that align with your business goals and challenges.",
      Visual: ({ hovered }: { hovered: boolean }) => (
        <FeatureVisual 
          hovered={hovered} 
          i1={
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" /><circle cx="4" cy="12" r="2" />
              <line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" /><circle cx="12" cy="10" r="2" />
              <line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" /><circle cx="20" cy="14" r="2" />
            </svg>
          } 
          i2={<Settings style={{ width: "30px", height: "30px" }} />} 
        />
      )
    },
    {
      title: "AI Assistant",
      desc: "Deploy intelligent virtual agents to streamline tasks.",
      Visual: ({ hovered }: { hovered: boolean }) => (
        <FeatureVisual hovered={hovered} i1={<Bot style={{ width: "32px", height: "32px" }} />} i2={<Sparkles style={{ width: "30px", height: "30px" }} />} />
      )
    },
    {
      title: "Sales & Marketing",
      desc: "Leverage AI to optimize campaigns, track leads, and personalize outreach.",
      Visual: ({ hovered }: { hovered: boolean }) => (
        <FeatureVisual hovered={hovered} i1={<MoveDiagonal style={{ width: "28px", height: "28px" }} />} i2={<PieChart style={{ width: "28px", height: "28px" }} />} />
      )
    },
    {
      title: "Performance Tracking",
      desc: "Track automation results in real time to improve and scale your workflows.",
      Visual: ({ hovered }: { hovered: boolean }) => (
        <FeatureVisual hovered={hovered} i1={<TrendingUp style={{ width: "30px", height: "30px" }} />} i2={<BarChart3 style={{ width: "30px", height: "30px" }} />} />
      )
    },
    {
      title: "Seamless Integrations",
      desc: "Connect your tools and apps for smooth, unified AI-powered workflows.",
      Visual: ({ hovered }: { hovered: boolean }) => (
        <FeatureVisual hovered={hovered} i1={<PlugZap style={{ width: "30px", height: "30px" }} />} i2={<Database style={{ width: "30px", height: "30px" }} />} />
      )
    },
  ];

  return (
    <Section id="features">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "4px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 14px", borderRadius: "100px", background: "var(--color-glass-bg)", backdropFilter: "blur(16px)", border: "1px solid var(--color-border)" }}>
          <Layers style={{ width: "12px", height: "12px", color: "var(--color-blue-mid)" }} />
          <span style={{ fontFamily: F.inter, fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", color: C.txtBright }}>FEATURES</span>
        </div>
      </div>
      <div style={{ transform: "scale(0.85)", transformOrigin: "top center", marginBottom: "8px" }}>
        <H2 plain="All features in " italic="one place" />
        <Sub>Everything you need to automate operations, boost productivity</Sub>
      </div>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", 
        gap: isMobile ? "32px" : "10px", 
        maxWidth: "1050px", 
        margin: "0 auto",
        width: "100%"
      }}>
        {items.map((it, i) => (
          <FeatureCard key={i} it={it} i={i} />
        ))}
      </div>
    </Section>
  );
}

function FeatureCard({ it, i }: { it: any; i: number }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div 
      {...fup(i * 0.05)} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ ...card, border: `1px solid var(--color-border)`, borderRadius: "12px", padding: "16px", textAlign: "center", display: "flex", flexDirection: "column", gap: "8px", minHeight: "220px", justifyContent: "flex-start" }}
    >
      <it.Visual hovered={isHovered} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <h3 style={{ fontFamily: F.inter, fontSize: "14px", fontWeight: 700, color: C.blueMid, marginBottom: "2px" }}>{it.title}</h3>
        <p style={{ fontFamily: F.inter, fontSize: "11.5px", color: C.txtMuted, lineHeight: 1.35 }}>{it.desc}</p>
      </div>
    </motion.div>
  );
}

// Sub-component to standardize the box-in-box visual pattern
function FeatureVisual({ hovered, i1, i2 }: { hovered: boolean; i1: React.ReactNode; i2: React.ReactNode }) {
  return (
    <div style={{ 
      position: "relative", width: "100%", height: "110px", 
      background: "var(--color-glass-bg)", backdropFilter: "blur(16px)", 
      borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", 
      overflow: "hidden", border: "1px solid var(--color-border)",
      boxShadow: "inset 0 2px 10px rgba(0,0,0,0.2)"
    }}>
      <motion.div 
        animate={{ 
          background: hovered ? "var(--color-bg-input)" : "var(--color-bg-card)",
          boxShadow: hovered ? "0 0 20px var(--green-glow-40), 0 5px 20px rgba(0,0,0,0.3)" : "none",
          color: hovered ? "var(--color-green)" : "var(--color-text-faint)"
        }}
        style={{
          border: "1px solid var(--color-border)",
          borderRadius: "10px", padding: "8px 16px", display: "flex", alignItems: "center", gap: "12px"
        }}
        transition={{ duration: 0.3 }}
      >
        <div style={{ filter: hovered ? "drop-shadow(0 0 6px var(--color-green))" : "none", display: "flex", alignItems: "center" }}>{i1}</div>
        <div style={{ height: "24px", width: "1.2px", background: "var(--color-border)" }} />
        <div style={{ filter: hovered ? "drop-shadow(0 0 6px var(--color-green))" : "none", display: "flex", alignItems: "center" }}>{i2}</div>
      </motion.div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// COMPARISON — ScalePods vs Others
// ═══════════════════════════════════════════════════════════════════════════════
const pros = ["Fast setup with ready AI workflows", "Built to grow and adapt with you", "Real-time, AI-powered analytics", "Automates tasks, reducing overhead", "Expert support + AI guidance"];
const cons = ["Slower execution and manual setup", "Requires manual updates as you scale", "Limited or delayed reporting", "Higher labor costs, less automation", "Generic support or none at all"];

export function Comparison() {
  const { resolvedTheme } = useTheme();
  return (
    <Section id="comparison">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "16px" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: "8px",
          padding: "6px 14px", borderRadius: "100px",
          background: "var(--color-glass-bg)", backdropFilter: "blur(16px)", border: "1px solid var(--color-border)",
        }}>
          <GitCompare style={{ width: "12px", height: "12px", color: "var(--color-blue-mid)" }} />
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
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "24px" }}>
            {/* Cropped logo: 2193×377 ≈ 5.8:1 ratio → 200px wide × 34px tall */}
            <div style={{ position: "relative", width: "200px", height: "34px" }}>
              <Image
                src="/scalepods-navbar-logo.png"
                alt="ScalePods"
                fill
                sizes="200px"
                style={{
                  objectFit: "contain",
                  objectPosition: "center center",
                  filter: resolvedTheme === "dark" ? "invert(1)" : "none",
                  transition: "filter 0.3s ease",
                }}
              />
            </div>
          </div>
          <div style={{ ...card, padding: "12px 24px" }}>
            {pros.map((item, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "16px",
                padding: "24px 0",
                borderBottom: i < pros.length - 1 ? `1px solid var(--color-border)` : "none",
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
                borderBottom: i < cons.length - 1 ? `1px solid var(--color-border)` : "none",
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
          <span>Evaluate Your Funnel</span> <ArrowUpRight style={{ width: "15px", height: "15px", marginLeft: "6px" }} />
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

const Step3WaveChart = memo(function Step3WaveChart() {
  const [phase, setPhase] = useState(0);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    let lastTime = performance.now();
    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;
      
      // Infinite propagation of wave phase shift
      setPhase((prev) => prev + 1.2 * delta);
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const startX = 0;
  const endX = 200;
  const step = 4;
  const points: [number, number][] = [];

  for (let x = startX; x <= endX; x += step) {
    const progress = x / endX;
    
    // Baseline climbs smoothly from y=75 to y=40
    const baseY = 75 - progress * 35;
    
    // Smooth undulations that organically dampen to exactly 0 at margins
    // to prevent clipping or spilling outside the card container bounds
    const wave = Math.sin(progress * Math.PI * 3 - phase) * 12 * Math.sin(progress * Math.PI);
    points.push([x, baseY + wave]);
  }

  const linePath = `M ${points.map(([x, y]) => `${x},${y}`).join(" L ")}`;
  const areaPath = `${linePath} L ${endX},100 L ${startX},100 Z`;

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      borderRadius: "inherit",
      display: "flex",
      alignItems: "flex-end"
    }}>
      {/* Subtle data dashboard grids */}
      <div style={{
        position: "absolute",
        inset: 0,
        opacity: 0.12,
        backgroundImage: "linear-gradient(rgba(109, 182, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(109, 182, 255, 0.1) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
        pointerEvents: "none"
      }} />

      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 200 100" 
        preserveAspectRatio="xMidYMid slice" 
        style={{ 
          position: "absolute", 
          bottom: 0,
          left: 0,
          right: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          willChange: "transform"
        }}
      >
        <defs>
          <linearGradient id="chartGradStep3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(109, 182, 255, 0.25)" />
            <stop offset="100%" stopColor="rgba(109, 182, 255, 0)" />
          </linearGradient>
          <filter id="neonGlowStep3" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Dynamic shaded curve fill */}
        <path d={areaPath} fill="url(#chartGradStep3)" />

        {/* Dynamic primary glowing wave */}
        <path 
          d={linePath} 
          fill="none" 
          stroke="#6DB6FF" 
          strokeWidth="2.5" 
          strokeLinecap="round"
          style={{ filter: "url(#neonGlowStep3)" }}
        />
      </svg>
    </div>
  );
});

export function Process() {
  const [activeTab, setActiveTab] = useState(0);
  const { resolvedTheme } = useTheme();
  const isMobile = useMobile(1023);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % processSteps.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      id="process" 
      className="mobile-section-spacing"
      style={{ 
        position: "relative", 
        background: C.bgPage, 
        padding: "140px 24px",
        minHeight: isMobile ? "auto" : "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: isMobile ? "75px" : "0px"
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "8px" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: "8px",
          padding: "6px 14px", borderRadius: "100px",
          background: "var(--color-glass-bg)", backdropFilter: "blur(16px)", border: "1px solid var(--color-border)",
        }}>
          <Zap style={{ width: "12px", height: "12px", color: "var(--color-blue-mid)" }} />
          <span style={{ fontFamily: F.inter, fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: C.txtMuted }}>
            PROCESS
          </span>
        </div>
      </div>
      <H2 plain="Our Simple & " italic="Smart Process" />
      <Sub>Everything you need to collaborate, create, and scale, all in one place.</Sub>

      <div style={{ borderRadius: "16px", border: `1px solid ${C.border}`, background: C.bgCard, overflow: "hidden", marginTop: "16px" }}>
        {/* Navigation Tabs */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", padding: "8px", gap: "6px" }}>
          {processSteps.map((step, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                style={{
                  padding: "8px",
                  borderRadius: "8px",
                  background: isActive ? "var(--color-bg-card-alt)" : "transparent",
                  border: `1px solid ${isActive ? "rgba(var(--color-green-rgb), 0.3)" : "var(--color-border)"}`,
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
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ minHeight: "300px" }}>

          {/* Left Column - Visual Mockups */}
          <div style={{ position: "relative", padding: "24px", overflow: "hidden" }}>
            {/* Gradient glow behind visuals */}
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(var(--color-blue-mid-rgb), 0.08) 0%, transparent 70%)", zIndex: 0 }} />

            <AnimatePresence mode="wait">
              {activeTab === 0 ? (
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
                        <path d="M0 30 Q 15 40 25 30 T 50 30 T 75 35 T 100 25" fill="none" stroke="var(--color-border)" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div style={{ flex: 1, background: C.bgInput, border: `1px solid ${C.border}`, borderRadius: "12px", padding: "16px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                        <span style={{ fontSize: "11px", color: C.txtMuted }}>Cost Management</span>
                        <span style={{ fontSize: "10px", color: C.txtFaint, border: `1px solid ${C.border}`, borderRadius: "4px", padding: "2px 6px" }}>+ Chart</span>
                      </div>
                      <div style={{ fontSize: "24px", fontWeight: 700, color: C.txtBright, marginBottom: "8px" }}>-54%</div>
                      <svg width="100%" height="40" viewBox="0 0 100 40" preserveAspectRatio="none">
                        <path d="M0 35 Q 15 20 25 25 T 50 35 T 75 25 T 100 30" fill="none" stroke="var(--color-border)" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                  {/* Floating Weakest Systems card animated slightly upwards */}
                  <motion.div
                    initial={{ y: 20 }} animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(16px)", border: `1px solid var(--color-border)`, borderRadius: "12px", padding: "16px", boxShadow: resolvedTheme === 'dark' ? "0 10px 40px rgba(0,0,0,0.5)" : "0 10px 30px rgba(0,0,0,0.05)", zIndex: 10, marginTop: "8px" }}
                  >
                    <div style={{ fontSize: "11px", color: C.txtMuted, marginBottom: "16px" }}>Weakest Systems</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <div style={{ width: "32px", height: "32px", background: "var(--color-glass-bg)", backdropFilter: "blur(16px)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <BarChart3 style={{ width: "16px", height: "16px", color: C.txtFaint }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                          <span style={{ fontSize: "13px", color: C.txtBright, fontWeight: 500 }}>Marketing & ads</span>
                          <span style={{ fontSize: "12px", color: C.txtMuted }}>32% <span style={{ color: C.txtFaint }}>Score</span></span>
                        </div>
                        <div style={{ width: "100%", height: "4px", background: "var(--color-glass-bg)", backdropFilter: "blur(16px)", borderRadius: "2px", overflow: "hidden" }}>
                          <div style={{ width: "32%", height: "100%", background: C.txtFaint, borderRadius: "2px" }} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ) : activeTab === 1 ? (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  {/* Activity Bar Chart */}
                  <div style={{ position: "absolute", inset: "10px 20px", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.35 }}>
                    <ActivityBarChart />
                  </div>

                  {/* Floating Code Editor Overlay */}
                  <motion.div
                    initial={{ y: 20 }} animate={{ y: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    style={{ background: "var(--color-bg-input)", border: `1px solid var(--color-border)`, borderRadius: "12px", width: "90%", padding: "16px", boxShadow: resolvedTheme === 'dark' ? "0 20px 50px rgba(0,0,0,0.6)" : "0 10px 30px rgba(0,0,0,0.05)", zIndex: 10 }}
                  >
                    <div style={{ fontFamily: "monospace", fontSize: "12px", color: C.txtMuted, display: "flex", flexDirection: "column", gap: "8px", whiteSpace: "pre-wrap" }}>
                      <div><span style={{ color: "#545B7D" }}>// Build & Implement -{">"}</span></div>
                      <div><span style={{ color: "#c678dd" }}>async function</span> <span style={{ color: "#61afef" }}>generateResponse</span>(prompt) {'{'}</div>
                      <div style={{ paddingLeft: "16px" }}><span style={{ color: "#c678dd" }}>const</span> response = <span style={{ color: "#c678dd" }}>await</span> <span style={{ color: "#56b6c2" }}>fetch</span>(<span style={{ color: "#98c379" }}>'https://api.openai.com/...'</span>, {'{'}</div>
                      <div style={{ paddingLeft: "32px" }}>method: <span style={{ color: "#98c379" }}>'POST'</span>,</div>
                      <div style={{ paddingLeft: "32px" }}>headers: {'{'}</div>
                      <div style={{ paddingLeft: "48px" }}><span style={{ color: "#98c379" }}>'Content-Type'</span>: <span style={{ color: "#98c379" }}>'application/json'</span>,</div>
                      <div style={{ paddingLeft: "32px" }}>{'}'}</div>
                      <div style={{ paddingLeft: "16px" }}>{'})'}</div>
                    </div>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden", borderRadius: "12px" }}
                >
                  {/* Dedicated Wrapper Container for Wave Chart */}
                  <div style={{ 
                    position: "relative", 
                    width: "100%", 
                    height: "160px", 
                    marginBottom: "20px", 
                    overflow: "hidden", 
                    borderRadius: "12px", 
                    border: "1px solid var(--color-border-faint)",
                    background: resolvedTheme === 'dark' ? "rgba(255, 255, 255, 0.01)" : "rgba(15, 23, 42, 0.01)"
                  }}>
                    <Step3WaveChart />
                  </div>

                  {/* Floating Growth Tracker Card */}
                  <motion.div
                    initial={{ y: 20 }} animate={{ y: [0, -8, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                    style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(16px)", border: `1px solid var(--color-border)`, borderRadius: "12px", padding: "16px", boxShadow: resolvedTheme === 'dark' ? "0 10px 40px rgba(0,0,0,0.5)" : "0 10px 30px rgba(0,0,0,0.05)", zIndex: 10 }}
                  >
                    <div style={{ fontSize: "11px", color: C.txtMuted, marginBottom: "16px" }}>Growth & Efficiency Driven by AI</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <div style={{ width: "32px", height: "32px", background: "rgba(255,255,255,0.05)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <TrendingUp style={{ width: "16px", height: "16px", color: C.blueMid }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                          <span style={{ fontSize: "13px", color: C.txtBright, fontWeight: 500 }}>Marketing & ads</span>
                          <span style={{ fontSize: "12px", color: C.txtBright }}>84% <span style={{ color: C.txtFaint }}>Score</span></span>
                        </div>
                        <div style={{ width: "100%", height: "4px", background: "var(--color-glass-bg)", backdropFilter: "blur(16px)", borderRadius: "2px", overflow: "hidden" }}>
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
          <div style={{ padding: "32px 32px 32px 24px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab} // triggers re-animation on tab change
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{ display: "flex", flexDirection: "column", gap: "12px" }}
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
      </div>

      <SectionGlow />
    </section>
  );
}


// ═══════════════════════════════════════════════════════════════════════════════
// CASE STUDIES (OUR CLIENTS) - CINEMATIC REDESIGN
// ═══════════════════════════════════════════════════════════════════════════════

const caseStudiesData = [
  {
    id: 1,
    category: "EXHIBITION AUTOMATION",
    title: "Expo Success Story",
    description: "A company attending a major industry expo needed to capture and follow up with hundreds of leads quickly. Previously, it took their team 2-3 days to manually enter data. With ScalePods, personalized follow-ups were sent within 30 seconds of capture.",
    metrics: [
      { value: "40%", label: "Lead Retention" },
      { value: "65%", label: "ROI Surge" }
    ],
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1600&auto=format&fit=crop",
    accent: "var(--color-blue-mid)"
  },
  {
    id: 2,
    category: "B2B GROWTH ENGINE",
    title: "SaaS Scaling Autonomy",
    description: "A rapidly growing SaaS startup was drowning in inbound leads but lacked the resources to qualify them. We deployed an AI qualification system that processed 35,000 leads with zero additional headcount, allowing the sales team to focus on high-value closings.",
    metrics: [
      { value: "30%", label: "Sales Growth" },
      { value: "55%", label: "Engagement" }
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop",
    accent: "var(--color-green)"
  },
  {
    id: 3,
    category: "AI RECRUITMENT",
    title: "Tech Hiring Acceleration",
    description: "A fast-growing tech firm faced hiring delays with thousands of manual applications. Our HR Pipeline Pod screened 3,500+ resumes and ranked applicants by fit, dropping the hiring cycle from 14 days to just 5 days.",
    metrics: [
      { value: "70%", label: "Faster Hiring" },
      { value: "35%", label: "Lower CAC" }
    ],
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1600&auto=format&fit=crop",
    accent: "var(--color-blue-mid)"
  }
];

export function CaseStudies() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const { resolvedTheme } = useTheme();
  const isMobile = useMobile(1024);
  const SLIDE_DURATION = 12000; // 12 seconds

  useEffect(() => {
    if (isPaused) return;
    
    let startTime = Date.now();
    let animationFrame: number;

    const step = () => {
      const elapsed = Date.now() - startTime;
      const currentProgress = (elapsed / SLIDE_DURATION) * 100;
      
      if (currentProgress >= 100) {
        setActiveIndex((prev) => (prev + 1) % caseStudiesData.length);
        setProgress(0);
        startTime = Date.now();
      } else {
        setProgress(currentProgress);
      }
      animationFrame = requestAnimationFrame(step);
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [activeIndex, isPaused]);

  const activeStudy = caseStudiesData[activeIndex];

  return (
    <section 
      id="clients" 
      className="mobile-section-spacing"
      style={{ 
        position: "relative", 
        background: C.bgPage, 
        padding: "140px 24px",
        minHeight: isMobile ? "auto" : "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        marginTop: isMobile ? "75px" : "0px"
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
        
        {/* Header Section */}
        <div style={{ textAlign: "center", marginBottom: isMobile ? "24px" : "32px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "8px" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "4px 12px", borderRadius: "100px",
              background: "var(--color-glass-bg)", backdropFilter: "blur(16px)", border: "1px solid var(--color-border)",
            }}>
              <Users style={{ width: "12px", height: "12px", color: "var(--color-blue-mid)" }} />
              <span style={{ fontFamily: F.inter, fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em", color: C.txtBright }}>
                OUR CLIENTS
              </span>
            </div>
          </div>
          <H2 
            plain="Success Stories to " 
            italic="Inspire" 
            style={{ fontSize: isMobile ? "32px" : "clamp(40px, 4vw, 56px)", marginBottom: "4px" }} 
          />
          <Sub style={{ fontSize: "14px", marginBottom: "0" }}>Discover how businesses and creators achieve results</Sub>
        </div>

        {/* Cinematic Carousel Container */}
        <div 
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "1100px",
            height: isMobile ? "auto" : "min(540px, 60vh)",
            margin: "0 auto",
            background: "rgba(255,255,255,0.01)",
            backdropFilter: "blur(4px)",
            borderRadius: "32px",
            border: "1px solid var(--color-border-faint)",
            overflow: "hidden",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            boxShadow: resolvedTheme === 'dark' ? "0 40px 100px -20px rgba(0,0,0,0.8)" : "0 20px 50px -10px rgba(0,0,0,0.05)"
          }}
        >
          {/* Left Panel: Content */}
          <div style={{
            flex: isMobile ? "none" : "0 0 42%",
            padding: isMobile ? "32px 24px" : "clamp(32px, 4vw, 48px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
            zIndex: 2,
            background: resolvedTheme === 'dark' ? "rgba(4, 7, 13, 0.4)" : "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(20px)"
          }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStudy.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div style={{ 
                  fontSize: "10px", 
                  fontWeight: 800, 
                  color: activeStudy.accent, 
                  letterSpacing: "0.15em", 
                  marginBottom: "12px" 
                }}>
                  {activeStudy.category}
                </div>
                
                <h3 style={{ 
                  fontFamily: F.inter, 
                  fontSize: "clamp(24px, 2.5vw, 32px)", 
                  fontWeight: 800, 
                  color: C.txtBright, 
                  lineHeight: 1.1, 
                  marginBottom: "16px",
                  letterSpacing: "-0.02em"
                }}>
                  {activeStudy.title}
                </h3>
                
                <p style={{ 
                  fontFamily: F.inter, 
                  fontSize: "14px", 
                  color: C.txtBody, 
                  lineHeight: 1.6, 
                  marginBottom: "20px",
                  opacity: 0.85,
                  maxWidth: "400px"
                }}>
                  {activeStudy.description}
                </p>

                {/* KPI Metrics */}
                <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
                  {activeStudy.metrics.map((m, idx) => (
                    <div key={idx} style={{ 
                      flex: 1,
                      padding: "12px 16px",
                      borderRadius: "16px",
                      background: "rgba(var(--color-text-bright-rgb), 0.03)",
                      border: "1px solid var(--color-border-faint)",
                      backdropFilter: "blur(8px)"
                    }}>
                      <div style={{ fontSize: "18px", fontWeight: 800, color: C.txtBright, marginBottom: "2px" }}>{m.value}</div>
                      <div style={{ fontSize: "9px", fontWeight: 700, color: C.txtMuted, textTransform: "uppercase", letterSpacing: "0.05em" }}>{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Progress Indicator */}
                <div style={{ 
                  width: "100%", 
                  height: "2px", 
                  background: "rgba(var(--color-text-bright-rgb), 0.1)",
                  borderRadius: "2px",
                  overflow: "hidden"
                }}>
                  <motion.div 
                    style={{ 
                      height: "100%", 
                      background: activeStudy.accent,
                      width: `${progress}%`
                    }} 
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Panel: Visuals */}
          <div style={{
            flex: isMobile ? "none" : "1",
            height: isMobile ? "280px" : "auto",
            position: "relative",
            overflow: "hidden",
            background: "#000"
          }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStudy.id}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ width: "100%", height: "100%" }}
              >
                <img 
                  src={activeStudy.image} 
                  alt={activeStudy.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.7 }}
                />
                <div style={{ 
                  position: "absolute", 
                  inset: 0, 
                  background: `linear-gradient(to right, ${resolvedTheme === 'dark' ? '#04070D' : '#F8FAF7'} 0%, transparent 40%)`,
                  display: isMobile ? 'none' : 'block'
                }} />
                <div style={{ 
                  position: "absolute", 
                  inset: 0, 
                  background: `linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)`,
                  display: isMobile ? 'block' : 'none'
                }} />

                {/* Floating KPI Cards */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  style={{
                    position: "absolute",
                    bottom: "24px",
                    right: "24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    zIndex: 10
                  }}
                >
                  <div style={{
                    padding: "12px 20px",
                    background: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "16px",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px"
                  }}>
                    <TrendingUp size={18} color={activeStudy.accent} />
                    <div>
                      <div style={{ fontSize: "16px", fontWeight: 800, color: "#fff" }}>{activeStudy.metrics[0].value}</div>
                      <div style={{ fontSize: "9px", fontWeight: 600, color: "rgba(255,255,255,0.7)", textTransform: "uppercase" }}>Impact Delivered</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            {!isMobile && (
              <div style={{ 
                position: "absolute", 
                top: "50%",
                left: "24px", 
                right: "24px",
                transform: "translateY(-50%)",
                display: "flex", 
                justifyContent: "space-between",
                zIndex: 10,
                pointerEvents: "none"
              }}>
                <button 
                  onClick={() => setActiveIndex((prev) => (prev - 1 + caseStudiesData.length) % caseStudiesData.length)}
                  style={{
                    width: "40px", height: "40px", borderRadius: "50%",
                    background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.2)", color: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", transition: "all 0.3s ease", pointerEvents: "auto"
                  }}
                >
                  <ChevronLeft size={18} />
                </button>
                <button 
                  onClick={() => setActiveIndex((prev) => (prev + 1) % caseStudiesData.length)}
                  style={{
                    width: "40px", height: "40px", borderRadius: "50%",
                    background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.2)", color: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", transition: "all 0.3s ease", pointerEvents: "auto"
                  }}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Thumbnail Navigation */}
        <div style={{ 
          display: "flex", 
          justifyContent: "center", 
          gap: "10px", 
          marginTop: isMobile ? "24px" : "20px" 
        }}>
          {caseStudiesData.map((study, idx) => (
            <motion.button
              key={study.id}
              onClick={() => setActiveIndex(idx)}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.95 }}
              style={{
                width: isMobile ? "70px" : "100px",
                height: isMobile ? "40px" : "56px",
                borderRadius: "10px",
                overflow: "hidden",
                position: "relative",
                border: activeIndex === idx ? `2px solid ${study.accent}` : "1px solid var(--color-border-faint)",
                background: "var(--color-bg-card)",
                cursor: "pointer",
                transition: "border-color 0.3s ease"
              }}
            >
              <img 
                src={study.image} 
                alt="" 
                style={{ width: "100%", height: "100%", objectFit: "cover", opacity: activeIndex === idx ? 1 : 0.4 }}
              />
              {activeIndex === idx && (
                <motion.div 
                  layoutId="active-thumb"
                  style={{ 
                    position: "absolute", 
                    inset: 0, 
                    background: `linear-gradient(to top, ${study.accent}44, transparent)`,
                    zIndex: 1
                  }} 
                />
              )}
            </motion.button>
          ))}
        </div>

      </div>

      <SectionGlow />
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════

const I_SVG = {
  n8n: <svg width="22" height="22" viewBox="0 0 40 40" fill="currentColor"><text x="6" y="26" fontFamily="sans-serif" fontWeight="800" fontSize="18" fill="currentColor">n8n</text></svg>,
  zapier: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
  make: <svg width="22" height="22" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="4" /><circle cx="16" cy="12" r="5" fill="currentColor" /></svg>,
  openai: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2A10 10 0 0 0 2 12A10 10 0 0 0 12 22A10 10 0 0 0 22 12A10 10 0 0 0 12 2Z" /><path d="M12 2v20M2 12h20M5 5l14 14M5 19L19 5" /></svg>,
  slack: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z" /><path d="M20.5 10H16V5.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v4.5z" /><path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5z" /><path d="M3.5 14H8v4.5c0 .83-.67 1.5-1.5 1.5S5 19.33 5 18.5V14z" /><path d="M14 9.5c0 .83.67 1.5 1.5 1.5h5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5h-5c-.83 0-1.5.67-1.5 1.5z" /><path d="M14 20.5v-4.5h4.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-4.5z" /><path d="M10 14.5c0-.83-.67-1.5-1.5-1.5h-5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5c.83 0 1.5-.67 1.5-1.5z" /><path d="M10 3.5v4.5H5.5C4.67 8 4 7.33 4 6.5S4.67 5 5.5 5h4.5z" /></svg>,
  airtable: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l10 6-10 6L2 8l10-6zm0 14l10-6v4l-10 6-10-6v-4l10 6z" /></svg>,
  hubspot: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><circle cx="5" cy="5" r="2" /><circle cx="19" cy="5" r="2" /><path d="M6.5 6.5l4 4M17.5 6.5l-4 4M12 15v5" /></svg>,
  salesforce: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" /></svg>,
  stripe: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /><path d="M6 14h.01" /></svg>,
  twilio: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /><circle cx="8" cy="12" r="2.5" fill="var(--color-bg-card-alt)" /><circle cx="16" cy="12" r="2.5" fill="var(--color-bg-card-alt)" /></svg>,
  notion: <svg width="22" height="22" viewBox="0 0 100 100"><path d="M10 10v80h80V10H10zm11 11h58v58H21V21zm9 8v29l32-15V14l-32 15z" fill="currentColor" /></svg>,
  google: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" /></svg>,
};

// Generate repeatable sets of icons for continuous marquees (minimum 12 items to prevent blank loop gaps)
const row1 = ["n8n", "make", "zapier", "openai", "n8n", "make", "zapier", "openai", "n8n", "make", "zapier", "openai", "n8n", "make", "zapier", "openai"];
const row2 = ["slack", "stripe", "airtable", "salesforce", "slack", "stripe", "airtable", "salesforce", "slack", "stripe", "airtable", "salesforce", "slack", "stripe"];
const row3 = ["hubspot", "twilio", "google", "notion", "hubspot", "twilio", "google", "notion", "hubspot", "twilio", "google", "notion", "hubspot", "twilio", "google"];

const MarqueeRow = memo(function MarqueeRow({ items, direction = 1, speed = 30 }: { items: string[], direction?: number, speed?: number }) {
  const { resolvedTheme } = useTheme();
  return (
    <div 
      data-scroll-observed="1"
      style={{ 
        position: "relative",
        display: "flex", 
        gap: "16px", 
        width: "fit-content", 
        padding: "4px 0", 
        willChange: "transform", 
        zIndex: 10, 
        opacity: 1 
      }}
    >
      <div style={{
        display: "flex",
        width: "max-content",
        animationName: "marquee-int",
        animationDuration: `${speed}s`,
        animationTimingFunction: "linear",
        animationIterationCount: "infinite",
        animationDirection: direction === 1 ? 'normal' : 'reverse',
        transform: "translate3d(0,0,0)",
        willChange: "transform"
      }}>
        {[...items, ...items].map((iconKey, i) => (
          <div key={i} style={{
            width: "60px", height: "60px", borderRadius: "14px",
            background: "var(--color-glass-bg)", backdropFilter: "blur(16px)",
            border: "1px solid var(--color-border)",
            boxShadow: resolvedTheme === 'dark' ? "0px 2px 12px rgba(0,0,0,0.5)" : "0px 2px 6px rgba(0,0,0,0.05)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--color-text-bright)",
            flexShrink: 0,
            margin: "0 8px"
          }}>
            {I_SVG[iconKey as keyof typeof I_SVG] || <Database />}
          </div>
        ))}
      </div>
    </div>
  );
});

export function Integrations() {
  const isMobile = useMobile(768);
  const { resolvedTheme } = useTheme();
  return (
    <Section id="integrations">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "16px" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: "8px",
          padding: "6px 14px", borderRadius: "100px",
          background: "var(--color-glass-bg)", backdropFilter: "blur(16px)", border: "1px solid var(--color-border)",
        }}>
          <Database style={{ width: "12px", height: "12px", color: "var(--color-blue-mid)" }} />
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
          background: "rgba(255,255,255,0.03)", backdropFilter: "blur(16px)",
          border: "1px solid var(--color-border)",
          borderRadius: "24px",
          padding: "24px 0",
          overflow: "hidden",
          boxShadow: resolvedTheme === 'dark' ? "0 20px 60px rgba(0,0,0,0.6)" : "0 10px 30px rgba(0,0,0,0.05)",
          contain: isMobile ? "paint" : "none"
        }}>
          {/* Fade overlay masks strictly inside the container */}
          <div className="integration-fade" style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: isMobile ? "40px" : "120px", background: `linear-gradient(to right, var(--color-bg-card) 10%, transparent 100%)`, zIndex: 10, pointerEvents: "none" }} />
          <div className="integration-fade" style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: isMobile ? "40px" : "120px", background: `linear-gradient(to left, var(--color-bg-card) 10%, transparent 100%)`, zIndex: 10, pointerEvents: "none" }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "8px", overflow: "hidden" }}>
            <MarqueeRow items={row1} direction={1} speed={isMobile ? 20 : 32} />
            <MarqueeRow items={row2} direction={-1} speed={isMobile ? 22 : 38} />
            <MarqueeRow items={row3} direction={1} speed={isMobile ? 21 : 28} />
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

export function Reviews() {
  const isMobile = useMobile(768);
  const { resolvedTheme } = useTheme();
  return (
    <section 
      id="reviews" 
      className="mobile-section-spacing"
      style={{ 
        position: "relative", 
        background: C.bgPage, 
        padding: isMobile ? "72px 24px 140px 24px" : "140px 24px",
        minHeight: isMobile ? "auto" : "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: isMobile ? "75px" : "0px"
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "4px" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: "8px",
          padding: "6px 14px", borderRadius: "100px",
          background: "var(--color-glass-bg)", backdropFilter: "blur(16px)", border: "1px solid var(--color-border)",
        }}>
          <Heart style={{ width: "12px", height: "12px", color: "var(--color-blue-mid)", fill: "var(--color-blue-mid)" }} />
          <span style={{ fontFamily: F.inter, fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", color: C.txtBright }}>
            REVIEWS
          </span>
        </div>
      </div>
      <div style={{ transform: "scale(0.9)", transformOrigin: "top center", marginBottom: "12px" }}>
        <H2 plain="Trusted by " italic="Visionaries" />
        <Sub>Hear from real users who achieved success with our automation</Sub>
      </div>

      <div style={{ marginTop: "24px" }}>
        <TestimonialCarousel />
      </div>
      </div>

      <SectionGlow />
    </section>
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
  const isMobile = useMobile(1023);
  const { resolvedTheme } = useTheme();
  const [openIndex, setOpenIndex] = useState<number | null>(1); // Default second one open like mock

  return (
    <Section id="faq" style={{ marginTop: isMobile ? "150px" : "0px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "16px" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: "8px",
          padding: "6px 14px", borderRadius: "100px",
          background: "var(--color-glass-bg)", backdropFilter: "blur(16px)", border: "1px solid var(--color-border)",
        }}>
          <MessageCircle style={{ width: "12px", height: "12px", color: "var(--color-blue-mid)" }} />
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
          flex: "1 1 300px", maxWidth: "340px", background: "rgba(255,255,255,0.03)", backdropFilter: "blur(16px)",
          borderRadius: "24px", border: "1px solid var(--color-border)",
          padding: "40px 30px", display: "flex", flexDirection: "column",
          alignItems: "center", textAlign: "center", boxShadow: resolvedTheme === 'dark' ? "0 20px 40px rgba(0,0,0,0.4)" : "0 10px 30px rgba(0,0,0,0.05)"
        }}>
          <div style={{
            width: "48px", height: "48px", borderRadius: "12px",
            background: "var(--color-glass-bg)", backdropFilter: "blur(16px)", border: "1px solid var(--color-border)",
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
                background: isOpen ? "var(--color-bg-card-alt)" : "var(--color-bg-card)",
                border: isOpen ? "1px solid var(--color-blue-mid)" : "1px solid var(--color-border)",
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
  const { resolvedTheme } = useTheme();
  const isMobile = useMobile(768);
  return (
    <section 
      id="contact" 
      className="mobile-section-spacing"
      style={{ 
        position: "relative", 
        background: C.bgPage, 
        padding: "160px 24px", 
        textAlign: "center", 
        overflow: "hidden",
        marginTop: isMobile ? "110px" : "0px"
      }}
    >

      {/* Ambient Button Radial Glow (Under Particles) */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%", transform: "translate(-50%, -10px)",
        width: "600px", height: "400px",
        background: resolvedTheme === 'dark' 
          ? "radial-gradient(circle, rgba(var(--color-text-bright-rgb), 0.08) 0%, transparent 60%)"
          : "radial-gradient(circle, rgba(var(--color-text-bright-rgb), 0.05) 0%, transparent 60%)",
        zIndex: 0, pointerEvents: "none"
      }} />

      {/* Footer Line Light Source (Under Particles) */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "1px",
        background: resolvedTheme === 'dark'
          ? "linear-gradient(90deg, transparent 10%, rgba(var(--color-text-bright-rgb), 0.4) 50%, transparent 90%)"
          : "linear-gradient(90deg, transparent 10%, rgba(var(--color-text-bright-rgb), 0.15) 50%, transparent 90%)",
        boxShadow: resolvedTheme === 'dark' 
          ? "0 -10px 40px 10px rgba(var(--color-text-bright-rgb), 0.1)"
          : "0 -10px 40px 10px rgba(var(--color-text-bright-rgb), 0.03)",
        zIndex: 0, pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", bottom: 0, left: "20%", right: "20%", height: "100px",
        background: resolvedTheme === 'dark'
          ? "radial-gradient(ellipse at bottom, rgba(var(--color-text-bright-rgb), 0.1) 0%, transparent 70%)"
          : "radial-gradient(ellipse at bottom, rgba(var(--color-text-bright-rgb), 0.05) 0%, transparent 70%)",
        zIndex: 0, pointerEvents: "none"
      }} />

      {/* Particles Background Layer */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, opacity: 0.85, pointerEvents: "none" }}>
        <ParticlesBackground />
      </div>

      <div style={{ position: "relative", zIndex: 2, maxWidth: "680px", margin: "0 auto" }}>
        {/* Reach out anytime with faint lines */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginBottom: "32px" }}>
          <div style={{ height: "1px", width: "60px", background: resolvedTheme === 'dark' ? "linear-gradient(90deg, transparent, rgba(var(--color-text-bright-rgb), 0.2))" : "linear-gradient(90deg, transparent, rgba(var(--color-text-bright-rgb), 0.1))" }} />
          <span style={{ fontFamily: F.inter, fontSize: "14px", fontStyle: "italic", color: C.txtMuted }}>
            Reach out anytime
          </span>
          <div style={{ height: "1px", width: "60px", background: resolvedTheme === 'dark' ? "linear-gradient(270deg, transparent, rgba(var(--color-text-bright-rgb), 0.2))" : "linear-gradient(270deg, transparent, rgba(var(--color-text-bright-rgb), 0.1))" }} />
        </div>

        {/* Header */}
        <h2 style={{ 
          fontFamily: F.inter, 
          fontSize: isMobile ? "28px" : "42px", 
          fontWeight: 700, 
          color: C.txtBright, 
          marginBottom: "8px", 
          lineHeight: 1.2 
        }}>
          Ready to Automate Smarter?<br />
          Let's <span style={{ fontFamily: F.serif, fontStyle: "italic", fontWeight: 400, color: C.txtBody }}>Build Together</span>
        </h2>

        {/* Sub Header */}
        <p style={{ fontFamily: F.inter, fontSize: "16px", color: C.txtBody, marginTop: "24px", marginBottom: "48px" }}>
          Schedule a Call and Begin Automating
        </p>

        {/* Glowing Button */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "48px" }}>
          <GlowingButton href="/contact">
            <span>Book A Free Call</span> <ArrowUpRight style={{ width: "16px", height: "16px", marginLeft: "6px" }} />
          </GlowingButton>
        </div>



        {/* Social Line */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "24px", marginBottom: "32px", color: "var(--color-blue-bright)" }}>
          <a href="https://www.linkedin.com/company/scalepods-co" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", color: "inherit", opacity: 0.8, transition: "opacity 0.2s" }} onMouseEnter={e => e.currentTarget.style.opacity = "1"} onMouseLeave={e => e.currentTarget.style.opacity = "0.8"}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
          </a>
          <span style={{ opacity: 0.15, fontSize: "16px", color: "var(--color-text-body)", userSelect: "none" }}>|</span>
          <a href="https://wa.me/919867271848?text=Hi%20ScalePods!%20I'm%20interested%20in%20discussing%20custom%20workflow%20automation%20solutions%20for%20my%20business." target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", color: "inherit", opacity: 0.8, transition: "opacity 0.2s" }} onMouseEnter={e => e.currentTarget.style.opacity = "1"} onMouseLeave={e => e.currentTarget.style.opacity = "0.8"}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.5A8.5 8.5 0 0 1 13.5 20c-1.3 0-2.6-.3-3.8-.9L4 21l2-5.5A8.5 8.5 0 1 1 22 11.5z" />
              <path d="M9 8.5c.2-.4.6-.7 1.1-.5l1.5.6c.3.1.4.5.3.8l-.5.9c.7.8 1.4 1.5 2.2 2.2l.9-.5c.3-.1.7 0 .8.3l.6 1.5c.2.5-.1.9-.5 1.1-.9.4-2.1.2-3.3-.6S9 11.2 9 8.5z" />
            </svg>
          </a>
          <span style={{ opacity: 0.15, fontSize: "16px", color: "var(--color-text-body)", userSelect: "none" }}>|</span>
          <a href="https://www.instagram.com/scalepods.co/" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", color: "inherit", opacity: 0.8, transition: "opacity 0.2s" }} onMouseEnter={e => e.currentTarget.style.opacity = "1"} onMouseLeave={e => e.currentTarget.style.opacity = "0.8"}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
          </a>
        </div>

        {/* Email Address */}
        <a 
          href="mailto:info@scalepods.co" 
          style={{ 
            fontFamily: F.inter, 
            fontSize: "16px", 
            color: C.txtBright, 
            textDecoration: "none", 
            transition: "color 0.2s",
            display: "inline-block",
            marginBottom: isMobile ? "150px" : "40px"
          }} 
          onMouseEnter={e => e.currentTarget.style.color = C.blueOn} 
          onMouseLeave={e => e.currentTarget.style.color = C.txtBright}
        >
          info@scalepods.co
        </a>
      </div>
    </section>
  );
}

// ── SVG icons ─────────────────────────────────────────────────────────────────
function LinkedInIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>;
}
function InstagramIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>;
}
