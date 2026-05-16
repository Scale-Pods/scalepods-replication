"use client";

import { motion } from "framer-motion";
import {
  Calendar, Mail, Phone, Bot, Hotel, Users, Headphones,
  Video, BarChart2, User, ClipboardList, Package,
  MapPin, Share2, ArrowUpRight, ChevronRight, Zap
} from "lucide-react";
import Link from "next/link";
import ParticlesBackground from "@/components/ui/ParticlesBackground";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useMobile } from "@/lib/hooks";

// ── Design tokens ───────────────────────────────────────────────────────────
const C = {
  bgPage:  "var(--color-bg-page)",
  bgCard:  "var(--color-bg-card)",
  bgIcon:  "var(--color-bg-card-alt)",
  border:  "var(--color-border)",
  blue:    "var(--color-blue-mid)",
  blueBright: "var(--color-blue-mid)",
  green:   "var(--color-green)",
  txtBright: "var(--color-text-bright)",
  txtBody:   "var(--color-text-body)",
  txtMuted:  "var(--color-text-muted)",
};
const F = {
  inter: "var(--font-inter), sans-serif",
  serif: "var(--font-instrument), serif",
};

// ── Use-case card data ───────────────────────────────────────────────────────
const useCases = [
  {
    title: "Exhibition Automation",
    desc: "WhatsApp + email + calendar outreach.",
    icons: [Calendar, Mail],
  },
  {
    title: "Hyper-personalised Emailer",
    desc: "Generate + email 35K leads monthly with smart follow-ups.",
    icons: [Mail, BarChart2],
  },
  {
    title: "Voice Sales Agent",
    desc: "AI caller qualifies leads and books meetings automatically.",
    icons: [Phone, Bot],
  },
  {
    title: "Voice Receptionist",
    desc: "Handles calls and bookings for salons, groceries, hotels and clinics.",
    icons: [Phone, User],
  },
  {
    title: "Hotel Bot",
    desc: "Automates check-ins and outs with owner insights.",
    icons: [Hotel, Bot],
  },
  {
    title: "HR Pipeline",
    desc: "Sorts CVs and schedules interviews on autopilot.",
    icons: [Users, ClipboardList],
  },
  {
    title: "Customer Support",
    desc: "Omnichannel support across WhatsApp, Instagram, email, and web.",
    icons: [Headphones, Share2],
  },
  {
    title: "LinkedIn Agent",
    desc: "Sends personalised messages and follows up at scale.",
    icons: [Share2, Bot],
  },
  {
    title: "AI Video Gen",
    desc: "Creates realistic marketing AI videos from simple text prompts.",
    icons: [Video, Bot],
  },
  {
    title: "Sales CRM Agent",
    desc: "Logs calls and updates CRM without manual work.",
    icons: [Phone, BarChart2],
  },
  {
    title: "Founder Agent",
    desc: "Your AI secretary managing calls and meetings.",
    icons: [User, Calendar],
  },
  {
    title: "HR Onboarding",
    desc: "Automates employee joining and document verification.",
    icons: [Users, ClipboardList],
  },
  {
    title: "Shipment Tracker",
    desc: "Tracks deliveries and updates clients in real time.",
    icons: [Package, MapPin],
  },
  {
    title: "Field CRM",
    desc: "Tracks field teams and deals live on dashboard.",
    icons: [MapPin, BarChart2],
  },
  {
    title: "Marketing Suite",
    desc: "Automates social posting, approvals, and hashtag generation.",
    icons: [Share2, Video],
  },
];

// ── Card component (Premium Glassmorphic Version) ───────────────────────────
function UseCaseCard({ title, desc, icons, index }: {
  title: string; desc: string;
  icons: React.ElementType[]; index: number;
}) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const isMobile = useMobile(768);
  const [Icon1, Icon2] = icons;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={isMobile ? undefined : { 
        y: -10, 
        transition: { duration: 0.3, ease: "easeOut" } 
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      style={{
        position: "relative",
        background: isDark 
          ? "rgba(10, 15, 30, 0.4)" 
          : "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.7) 100%)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: isDark 
          ? "1px solid rgba(255, 255, 255, 0.08)" 
          : "1px solid rgba(15, 23, 42, 0.08)",
        borderRadius: "24px",
        padding: "32px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        cursor: "pointer",
        overflow: "hidden",
        boxShadow: isDark
          ? "0 20px 40px -12px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.05)"
          : "0 20px 30px -10px rgba(15, 23, 42, 0.08), 0 4px 12px -2px rgba(15, 23, 42, 0.04)",
        transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
        contain: isMobile ? "paint" : "none",
      }}
      className="use-case-card group"
    >
      {/* Dynamic Hover Glow (Dark Mode only) */}
      {isDark && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: "radial-gradient(circle at center, rgba(177, 217, 151, 0.05) 0%, transparent 70%)",
          }}
        />
      )}

      {/* Top stage area for icons */}
      <div style={{
        position: "relative",
        width: "100%",
        height: "120px",
        background: isDark 
          ? "rgba(0, 0, 0, 0.2)" 
          : "rgba(15, 23, 42, 0.02)",
        borderRadius: "16px",
        marginBottom: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        border: isDark 
          ? "1px solid rgba(255, 255, 255, 0.03)" 
          : "1px solid rgba(15, 23, 42, 0.03)",
        overflow: "hidden",
      }}>
        {/* Subtle grid background for the stage */}
        <div className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: "radial-gradient(var(--color-green) 0.5px, transparent 0.5px)",
            backgroundSize: "12px 12px"
          }} 
        />

        {[Icon1, Icon2].map((Icon, idx) => (
          <motion.div
            key={idx}
            className="icon-box"
            whileHover={{ scale: 1.1, rotate: idx % 2 === 0 ? -5 : 5 }}
            style={{
              position: "relative",
              width: "64px",
              height: "64px",
              background: isDark 
                ? "rgba(15, 23, 42, 0.6)" 
                : "rgba(255, 255, 255, 0.95)",
              border: isDark 
                ? "1px solid rgba(177, 217, 151, 0.2)" 
                : "1px solid rgba(15, 23, 42, 0.1)",
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
              boxShadow: isDark
                ? "0 10px 20px -5px rgba(0, 0, 0, 0.5)"
                : "0 8px 16px -4px rgba(15, 23, 42, 0.06)",
              transition: "all 0.3s ease",
            }}
          >
            {/* Interaction Glow behind icon */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: isDark 
                  ? "radial-gradient(circle, rgba(177, 217, 151, 0.2) 0%, transparent 70%)"
                  : "radial-gradient(circle, rgba(177, 217, 151, 0.1) 0%, transparent 70%)",
                borderRadius: "inherit",
              }}
            />
            <Icon style={{ 
              width: "28px", 
              height: "28px", 
              color: isDark ? "#B1D997" : "#0f172a", 
              strokeWidth: 1.5,
              position: "relative",
              zIndex: 3
            }} />
          </motion.div>
        ))}
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: F.inter,
        fontSize: "20px",
        fontWeight: 700,
        color: isDark ? "#FFFFFF" : "#0f172a",
        marginBottom: "12px",
        lineHeight: 1.3,
        transition: "color 0.3s ease",
      }}>
        {title}
      </h3>

      {/* Description */}
      <p style={{
        fontFamily: F.inter,
        fontSize: "15px",
        color: isDark ? "rgba(255, 255, 255, 0.6)" : "rgba(15, 23, 42, 0.7)",
        lineHeight: 1.6,
        margin: 0,
      }}>
        {desc}
      </p>

      {/* Subtle hover indicator dot */}
      <div className="mt-6 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--color-green)" }} />
      </div>
    </motion.div>
  );
}


// ── Main Use Cases Page ──────────────────────────────────────────────────────
export default function UseCasesPage() {
  const isMobile = useMobile(768);
  
  return (
    <main style={{ background: C.bgPage, minHeight: "100vh" }}>

      {/* ── HEADER + GRID ─────────────────────────────────────────────── */}
      <section style={{ padding: isMobile ? "80px 20px 60px" : "120px 32px 96px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          {/* Page header */}
          <div style={{ textAlign: "center", marginBottom: "72px" }}>
            <h1 style={{
              fontFamily: F.inter, fontSize: "clamp(32px, 4.5vw, 52px)",
              fontWeight: 700, color: C.txtBright, lineHeight: 1.15, marginBottom: "16px",
            }}>
              All Use Cases in{" "}
              <em style={{ fontFamily: F.serif, fontStyle: "italic", fontWeight: 400, color: C.txtMuted }}>
                one place
              </em>
            </h1>
            <p style={{ fontFamily: F.inter, fontSize: "16px", color: C.txtMuted }}>
              Everything your business needs to automate growth, operations, and communication.
            </p>
          </div>

          {/* Responsive grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(360px, 1fr))",
            gap: "24px",
          }}>
            {useCases.map((uc, i) => (
              <UseCaseCard key={uc.title} {...uc} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── REACH OUT ANYTIME CTA ─────────────────────────────────────── */}
      <section style={{
        position: "relative",
        background: C.bgPage,
        padding: "140px 24px",
        textAlign: "center",
        overflow: "hidden",
      }}>

        {/* Ambient radial glow */}
        <div style={{
          position: "absolute",
          top: "50%", left: "50%", transform: "translate(-50%, -20px)",
          width: "600px", height: "400px",
          background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 60%)",
          zIndex: 0, pointerEvents: "none",
        }} />

        {/* Footer floor line + bloom */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "1px",
          background: "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.4) 50%, transparent 90%)",
          boxShadow: "0 -10px 40px 10px rgba(255,255,255,0.1)",
          zIndex: 0, pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: 0, left: "20%", right: "20%", height: "100px",
          background: "radial-gradient(ellipse at bottom, rgba(255,255,255,0.1) 0%, transparent 70%)",
          zIndex: 0, pointerEvents: "none",
        }} />

        {/* Particles */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, opacity: 0.85, pointerEvents: "none" }}>
          <ParticlesBackground />
        </div>

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2, maxWidth: "680px", margin: "0 auto" }}>

          {/* "Reach out anytime" label */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginBottom: "32px" }}>
            <div style={{ height: "1px", width: "60px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2))" }} />
            <span style={{ fontFamily: F.inter, fontSize: "14px", fontStyle: "italic", color: C.txtMuted }}>
              Reach out anytime
            </span>
            <div style={{ height: "1px", width: "60px", background: "linear-gradient(270deg, transparent, rgba(255,255,255,0.2))" }} />
          </div>

          {/* Headline */}
          <h2 style={{
            fontFamily: F.inter, fontSize: "clamp(28px, 4vw, 46px)",
            fontWeight: 700, color: C.txtBright, lineHeight: 1.2, marginBottom: "8px",
          }}>
            Ready to Automate Smarter?<br />
            Let&apos;s{" "}
            <span style={{ fontFamily: F.serif, fontStyle: "italic", fontWeight: 400, color: C.txtBody }}>
              Build Together
            </span>
          </h2>

          <p style={{ fontFamily: F.inter, fontSize: "16px", color: C.txtBody, marginTop: "20px", marginBottom: "48px" }}>
            Schedule a Call and Begin Automating
          </p>

          {/* Glowing CTA Button */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "48px" }}>
            <div style={{ position: "relative", display: "inline-block" }}>
              {/* Ambient lamp behind button */}
              <div style={{
                position: "absolute",
                top: "50%", left: "50%", transform: "translate(-50%, -10px)",
                width: "380px", height: "200px",
                background: "radial-gradient(ellipse at center, rgba(255,255,255,0.1) 0%, transparent 60%)",
                zIndex: 0, pointerEvents: "none",
              }} />
              <motion.a
                href="/contact"
                initial="rest"
                whileHover="hover"
                animate="rest"
                style={{
                  position: "relative", zIndex: 1,
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  fontFamily: F.inter, fontSize: "15px", fontWeight: 600, color: C.green,
                  background: C.bgCard, border: "1px solid rgba(172, 215, 145, 0.35)",
                  borderRadius: "12px", padding: "14px 36px",
                  textDecoration: "none", overflow: "hidden",
                }}
              >
                {/* Soft lamp wash — spreads on hover */}
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
                    background: "radial-gradient(ellipse at center, rgba(255,255,255,0.35) 0%, transparent 70%)",
                    pointerEvents: "none",
                  }}
                />
                {/* Bottom lamp line — breathing pulse animation always on */}
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5], width: ["40%", "70%", "40%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    height: "1.5px",
                    background: "radial-gradient(50% 50% at 50% 50%, #FFFFFF 0%, rgba(255,255,255,0) 100%)",
                    boxShadow: "0px 0px 12px 2px rgba(255,255,255,0.6)",
                    pointerEvents: "none",
                  }}
                />
                <span style={{ position: "relative", zIndex: 2 }}>Book A Free Call</span>
                <ArrowUpRight style={{ width: "16px", height: "16px", position: "relative", zIndex: 2 }} />
              </motion.a>
            </div>
          </div>

          {/* Social icons row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "32px", marginBottom: "32px", color: "#0080FF" }}>
            <a
              href="https://www.linkedin.com/company/scalepods-co/"
              target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", color: "inherit", opacity: 0.8 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <span style={{ opacity: 0.15, fontSize: "20px", color: "#FFF", whiteSpace: "pre" }}>|       |</span>
            <a
              href="https://www.instagram.com/scalepods.co/"
              target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", color: "inherit", opacity: 0.8 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
          </div>

          {/* Email */}
          <a
            href="mailto:Info@scalepods.co"
            style={{ fontFamily: F.inter, fontSize: "16px", color: C.txtBright, textDecoration: "none" }}
          >
            Info@scalepods.co
          </a>
        </div>
      </section>
    </main>
  );
}

