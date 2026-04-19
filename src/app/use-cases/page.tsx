"use client";

import { motion } from "framer-motion";
import {
  Calendar, Mail, Phone, Bot, Hotel, Users, Headphones,
  Video, BarChart2, User, ClipboardList, Package,
  MapPin, Share2, ArrowUpRight,
} from "lucide-react";
import ParticlesBackground from "@/components/ui/ParticlesBackground";

// ── Design tokens ───────────────────────────────────────────────────────────
const C = {
  bgPage:  "#04070D",
  bgCard:  "#080A10",
  bgIcon:  "#0D0F17",
  border:  "rgba(255,255,255,0.07)",
  blue:    "#6DB6FF",
  blueBright: "#0080FF",
  green:   "#ACD791",
  txtBright: "#E4E9F2",
  txtBody:   "#B8C7D9",
  txtMuted:  "#6B7280",
};
const F = {
  inter: "Inter, sans-serif",
  serif: "Instrument Serif, Georgia, serif",
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

// ── Card component (matching scalepods.co exactly) ───────────────────────────
function UseCaseCard({ title, desc, icons, index }: {
  title: string; desc: string;
  icons: React.ElementType[]; index: number;
}) {
  const [Icon1, Icon2] = icons;
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
      className="use-case-card"
    >
      {/* Inner dark panel — the "screen" / stage area */}
      <div style={{
        background: "#0A0E14",
        borderRadius: "16px",
        padding: "36px 24px",
        marginBottom: "28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "14px",
        minHeight: "110px",
      }}>
        {/* Icon box 1 */}
        <div style={{
          width: "60px", height: "60px",
          background: "#111827",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "12px",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <Icon1 style={{ width: "26px", height: "26px", color: "#ACD791", strokeWidth: 1.5 }} />
        </div>

        {/* Icon box 2 */}
        <div style={{
          width: "60px", height: "60px",
          background: "#111827",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "12px",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <Icon2 style={{ width: "26px", height: "26px", color: "#ACD791", strokeWidth: 1.5 }} />
        </div>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "Inter, sans-serif",
        fontSize: "20px",
        fontWeight: 600,
        color: "#6DB6FF",
        marginBottom: "10px",
        lineHeight: 1.3,
        textAlign: "center",
      }}>
        {title}
      </h3>

      {/* Description */}
      <p style={{
        fontFamily: "Inter, sans-serif",
        fontSize: "15px",
        color: "#9CA3AF",
        lineHeight: 1.65,
        textAlign: "center",
      }}>
        {desc}
      </p>
    </motion.div>
  );
}


// ── Main Use Cases Page ──────────────────────────────────────────────────────
export default function UseCasesPage() {
  return (
    <main style={{ background: C.bgPage, minHeight: "100vh" }}>

      {/* ── HEADER + GRID ─────────────────────────────────────────────── */}
      <section style={{ padding: "120px 32px 96px" }}>
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

          {/* 3-column grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
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
                background: "radial-gradient(ellipse at center, rgba(255,255,255,0.12) 0%, transparent 60%)",
                zIndex: 0, pointerEvents: "none",
              }} />
              <a
                href="/contact"
                style={{
                  position: "relative", zIndex: 1,
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  fontFamily: F.inter, fontSize: "15px", fontWeight: 600, color: C.green,
                  background: C.bgCard, border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px", padding: "14px 36px",
                  textDecoration: "none", overflow: "hidden",
                }}
              >
                {/* Inset glow */}
                <div style={{
                  position: "absolute", inset: 0,
                  boxShadow: "inset 0px -15px 30px -15px rgba(255,255,255,0.4)",
                  pointerEvents: "none",
                }} />
                {/* Bottom edge line */}
                <div style={{
                  position: "absolute", bottom: 0, left: "10%", right: "10%",
                  height: "1px", background: "rgba(255,255,255,0.85)",
                }} />
                <span style={{ position: "relative", zIndex: 2 }}>Book A Free Call</span>
                <ArrowUpRight style={{ width: "16px", height: "16px", position: "relative", zIndex: 2 }} />
              </a>
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
