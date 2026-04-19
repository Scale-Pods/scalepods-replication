"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight, MessageSquare, ArrowDown } from "lucide-react";
import { InstagramIcon, LinkedinIcon } from "@/components/Icons";
import ParticlesBackground from "@/components/ui/ParticlesBackground";
import Link from "next/link";

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
      <video
        autoPlay loop muted playsInline
        className="video-dark absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>

      {/* ── PARTICLES ── */}
      <ParticlesBackground />

      {/* Gradient overlay — darkens edges, lets center breathe */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(4,7,13,0.72) 0%, transparent 15%, transparent 72%, rgba(4,7,13,0.9) 100%)",
        }}
      />

      {/* ── CONTENT ── */}
      <div
        className="relative z-[3] flex flex-col items-center text-center px-6 max-w-4xl mx-auto w-full"
        style={{ paddingTop: "100px", paddingBottom: "80px" }}
      >

        {/* App Icon Box — slightly larger with subtle circular glow ring */}
        <motion.div variants={scaleIn(0.05)} initial="initial" animate="animate"
          style={{ marginBottom: "24px" }}>
          {/* Outer faint glow ring */}
          <div style={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            {/* Subtle circular glow halo behind icon box */}
            <div style={{
              position: "absolute",
              width: "160px",
              height: "160px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(0,100,255,0.18) 0%, transparent 70%)",
              filter: "blur(16px)",
              pointerEvents: "none",
            }} />
            {/* Faint circle border ring */}
            <div style={{
              position: "absolute",
              width: "148px",
              height: "148px",
              borderRadius: "50%",
              border: "1px solid rgba(109,182,255,0.12)",
              pointerEvents: "none",
            }} />

            {/* Main icon box */}
            <div style={{
              position: "relative",
              width: "116px",
              height: "116px",
              borderRadius: "24px",
              background: "#0D0F17",
              border: "1px solid #222222",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 0 1px rgba(109,182,255,0.06), 0 0 36px 10px rgba(0,120,255,0.22), 0 0 72px 20px rgba(0,80,200,0.12)",
              zIndex: 1,
            }}>
              <Image
                src="/scalepods-logo.avif"
                alt="ScalePods"
                width={80}
                height={80}
                style={{ width: "78px", height: "78px", objectFit: "contain" }}
                priority
              />
            </div>
          </div>
        </motion.div>

        {/* Badge — blinking blue dot */}
        <motion.div variants={fadeUp(0.18)} initial="initial" animate="animate"
          style={{ marginBottom: "14px" }}>
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: "11.5px",
            fontWeight: 600,
            letterSpacing: "0.17em",
            textTransform: "uppercase",
            color: "#B8C7D9",
          }}>
            {/* Blinking blue dot with animated pulse ring */}
            <span style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              {/* Pulse ring */}
              <motion.span
                animate={{ scale: [1, 2.2, 2.2], opacity: [0.6, 0, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "rgba(0,128,255,0.5)",
                }}
              />
              {/* Solid core dot */}
              <span style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#0080FF",
                boxShadow: "0 0 8px 3px rgba(0,128,255,0.75)",
                flexShrink: 0,
                position: "relative",
                zIndex: 1,
              }} />
            </span>
            NEW GEN AI AUTOMATION PARTNER
          </span>
        </motion.div>

        {/* H1 — with dark edge blend effect (not fully white at sides) */}
        <motion.h1
          variants={fadeUp(0.3)} initial="initial" animate="animate"
          style={{
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: "clamp(48px, 6.8vw, 80px)",
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: "-0.028em",
            marginBottom: "18px",
            // Text gradient: bright white at center, fades to muted silver at edges
            background: "radial-gradient(ellipse 80% 100% at 50% 50%, #FFFFFF 0%, #FFFFFF 35%, #C8D2E0 62%, #8899AB 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Automate the Busywork.
          <br />
          Unlock Growth.
        </motion.h1>

        {/* Subtext — single line */}
        <motion.p
          variants={fadeUp(0.42)} initial="initial" animate="animate"
          style={{
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: "15.5px",
            fontWeight: 400,
            color: "#545B7D",
            lineHeight: 1.6,
            maxWidth: "600px",
            marginBottom: "28px",
            whiteSpace: "nowrap",
          }}
        >
          We build smart workflows that automate the repetitive, reduce overheads and keep teams lean.
        </motion.p>

        {/* CTA Button — lamp glow on hover (matches reference) */}
        <motion.div variants={fadeUp(0.52)} initial="initial" animate="animate"
          style={{ marginBottom: "24px" }}>
          <HeroButton href="/contact">
            Book A Free Call <ArrowUpRight style={{ width: "15px", height: "15px", marginLeft: "4px" }} />
          </HeroButton>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.85, duration: 0.7 } }}
          style={{ display: "flex", alignItems: "center", gap: "0", marginBottom: "36px" }}
        >
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
          <span style={{
            display: "inline-block",
            width: "1px",
            height: "16px",
            background: "#2a2a3a",
            margin: "0 16px",
            flexShrink: 0,
          }} />
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

        {/* Scroll-down arrow */}
        <motion.a
          href="#services"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 1.2, duration: 0.6 } }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", textDecoration: "none", color: "#3A4260" }}
        >
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(4px)",
            }}
          >
            <ArrowDown style={{ width: "15px", height: "15px", color: "#6B7A96" }} />
          </motion.div>
        </motion.a>

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

      {/* Ambient Floor Lighting Line */}
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

// ── Hero CTA Button with lamp-glow hover effect ────────────────────────────────
function HeroButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} style={{ textDecoration: "none", display: "inline-block" }}>
      <motion.div
        whileHover="hover"
        initial="rest"
        animate="rest"
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          fontFamily: "var(--font-inter), Inter, sans-serif",
          fontSize: "14px",
          fontWeight: 600,
          color: "#E4E9F2",
          background: "#0A0D14",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "10px",
          padding: "13px 28px",
          overflow: "hidden",
          cursor: "pointer",
        }}
      >
        {/* Bottom-center lamp glow — tight dot at rest, spreads on hover */}
        <motion.div
          variants={{
            rest: {
              opacity: 0.5,
              width: "50px",
              height: "18px",
              bottom: "-4px",
            },
            hover: {
              opacity: 1,
              width: "100%",
              height: "32px",
              bottom: "-8px",
            },
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            background: "radial-gradient(ellipse at center bottom, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.12) 50%, transparent 75%)",
            pointerEvents: "none",
            borderRadius: "50%",
            filter: "blur(2px)",
          }}
        />
        {/* Bottom border line — always-on white line at very bottom */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "55%",
          height: "1px",
          background: "rgba(255,255,255,0.7)",
          pointerEvents: "none",
        }} />
        <span style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", gap: "5px" }}>
          {children}
        </span>
      </motion.div>
    </Link>
  );
}
