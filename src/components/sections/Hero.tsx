"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight, MessageSquare } from "lucide-react";
import { InstagramIcon, LinkedinIcon } from "@/components/Icons";
import ParticlesBackground from "@/components/ui/ParticlesBackground";
import { GlowingButton } from "./Sections";

const fadeUp = (delay = 0): Variants => ({
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
});

const scaleIn = (delay = 0): Variants => ({
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
});

export default function Hero() {
  return (
    <section
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#04070D" }}
    >
      {/* ── VIDEO BACKGROUND ── */}
      {/* hue-rotate(200deg) converts red tones → dark navy-blue */}
      <video
        autoPlay loop muted playsInline
        className="video-dark absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>

      {/* ── PARTICLES — floating dots rising upward (matches live site) ── */}
      {/* z-1: above video (z-0), below gradient (z-2) */}
      <ParticlesBackground />

      {/* Gradient darkening overlay — edges only */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(4,7,13,0.72) 0%, transparent 15%, transparent 72%, rgba(4,7,13,0.9) 100%)",
        }}
      />

      {/* ── CONTENT ── */}
      {/*
        Layout matches live site:
        - Logo box (110px) → badge (20px gap) → h1 (10px gap)
        - h1 → subtext (16px gap) → CTA button (24px gap) → social icons (20px gap)
        - Everything centered, max-w-4xl
      */}
      <div className="relative z-[3] flex flex-col items-center text-center px-6 max-w-4xl mx-auto w-full"
        style={{ paddingTop: "80px", paddingBottom: "64px" }}>

        {/* App Icon Box — 110×110px matching live site */}
        <motion.div variants={scaleIn(0.05)} initial="initial" animate="animate"
          style={{ marginBottom: "20px" }}>
          <div style={{
            width: "110px", height: "110px",
            borderRadius: "22px",
            background: "#0D0F17",
            border: "1px solid #222222",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 0 1px rgba(109,182,255,0.06), 0 0 36px 10px rgba(0,120,255,0.22), 0 0 72px 20px rgba(0,80,200,0.12)",
          }}>
            <Image
              src="/scalepods-logo.avif"
              alt="ScalePods"
              width={74}
              height={74}
              style={{ width: "72px", height: "72px", objectFit: "contain" }}
              priority
            />
          </div>
        </motion.div>

        {/* Badge — no background pill, just dot + text */}
        <motion.div variants={fadeUp(0.18)} initial="initial" animate="animate"
          style={{ marginBottom: "12px" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: "12px", fontWeight: 600,
            letterSpacing: "0.16em", textTransform: "uppercase",
            color: "#B8C7D9",
          }}>
            <span style={{
              width: "7px", height: "7px", borderRadius: "50%", flexShrink: 0,
              background: "#0080FF", boxShadow: "0 0 8px 3px rgba(0,128,255,0.75)",
            }} />
            NEW GEN AI AUTOMATION PARTNER
          </span>
        </motion.div>

        {/* H1 — Inter 500, silver-grey, forced 2 lines */}
        {/* clamp capped at 76px so both lines never wrap on desktop */}
        <motion.h1
          variants={fadeUp(0.3)} initial="initial" animate="animate"
          style={{
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: "clamp(46px, 6.5vw, 76px)",
            fontWeight: 500,
            color: "#D5DBE6",
            lineHeight: 1.06,
            letterSpacing: "-0.025em",
            marginBottom: "16px",
          }}
        >
          Automate the Busywork.
          <br />
          Unlock Growth.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={fadeUp(0.42)} initial="initial" animate="animate"
          style={{
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: "16px",
            fontWeight: 400,
            color: "#545B7D",
            lineHeight: 1.65,
            maxWidth: "540px",
            marginBottom: "24px",
          }}
        >
          We build smart workflows that automate the repetitive, reduce overheads, and keep teams lean
        </motion.p>

        {/* CTA Button — dark bg + green text + bottom-center glow (matches live site) */}
        <motion.div variants={fadeUp(0.52)} initial="initial" animate="animate"
          style={{ marginBottom: "20px", position: "relative", display: "inline-block" }}>
          <GlowingButton href="/contact">
            Book A Free Call <ArrowUpRight style={{ width: "15px", height: "15px" }} />
          </GlowingButton>
        </motion.div>

        {/* Social Icons — one horizontal line with vertical divider between them */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.9, duration: 0.7 } }}
          style={{ display: "flex", alignItems: "center", gap: "0" }}
        >
          {/* Instagram */}
          <a
            href="https://www.instagram.com/scalepods.co/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#545B7D", transition: "color 0.2s", display: "flex", alignItems: "center" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#B8C7D9")}
            onMouseLeave={e => (e.currentTarget.style.color = "#545B7D")}
          >
            <InstagramIcon className="w-5 h-5" />
          </a>

          {/* Vertical divider between icons */}
          <span style={{
            display: "inline-block",
            width: "1px",
            height: "16px",
            background: "#2a2a3a",
            margin: "0 16px",
            flexShrink: 0,
          }} />

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/company/scalepods-co"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#545B7D", transition: "color 0.2s", display: "flex", alignItems: "center" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#B8C7D9")}
            onMouseLeave={e => (e.currentTarget.style.color = "#545B7D")}
          >
            <LinkedinIcon className="w-5 h-5" />
          </a>
        </motion.div>
      </div>

      {/* Chat FAB */}
      <motion.a
        href="/contact"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1, transition: { delay: 1.4, duration: 0.4 } }}
        whileHover={{ scale: 1.1 }}
        style={{
          position: "fixed", bottom: "28px", right: "28px", zIndex: 50,
          width: "48px", height: "48px", borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "#0D0F17",
          border: "1.5px solid #00CED1",
          boxShadow: "0 0 12px rgba(0,206,209,0.16)",
        }}
      >
        <MessageSquare style={{ width: "18px", height: "18px", color: "#fff" }} />
      </motion.a>

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
