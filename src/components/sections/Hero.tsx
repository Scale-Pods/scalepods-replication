"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight, MessageSquare, ArrowDown } from "lucide-react";
import { InstagramIcon, LinkedinIcon } from "@/components/Icons";
import ParticlesBackground from "@/components/ui/ParticlesBackground";
import Link from "next/link";
import { useTheme } from "@/components/providers/ThemeProvider";

const fadeUp = (delay = 0): Variants => ({
  initial: { opacity: 0, y: 16, filter: "blur(6px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
});

const scaleIn = (delay = 0): Variants => ({
  initial: { opacity: 0, scale: 0.92, filter: "blur(6px)" },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
});

export default function Hero() {
  const { resolvedTheme } = useTheme();
  
  return (
    <section
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--color-bg-page)" }}
    >
      {/* ── VIDEO BACKGROUND ── */}
      <video
        autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{
          // STRICT THEME ISOLATION
          filter: resolvedTheme === 'dark' 
            ? "hue-rotate(200deg) saturate(0.25) brightness(0.35)" // Restored Dark Mode cinematic navy
            : "grayscale(1) contrast(1.1) brightness(1.2) opacity(0.6)", // Light Mode neutral/cool grayscale (removes raw red/pink tint)
          opacity: resolvedTheme === 'dark' ? 1 : 0.85,
          transition: "filter 0.5s ease, opacity 0.5s ease"
        }}
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>

      {/* ── PARTICLES ── */}
      <div style={{ opacity: resolvedTheme === 'dark' ? 1 : 0.3, transition: 'opacity 1s ease', position: "relative", zIndex: 1 }}>
        <ParticlesBackground />
      </div>

      {/* Gradient overlay — STRICT THEME ISOLATION */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: resolvedTheme === 'dark'
            ? "linear-gradient(to bottom, rgba(4,7,13,0.82) 0%, transparent 20%, transparent 68%, rgba(4,7,13,0.96) 100%)"
            : "linear-gradient(to bottom, rgba(255,255,255,0.9) 0%, rgba(250,250,250,0.65) 30%, rgba(250,250,250,0.65) 70%, rgba(255,255,255,0.95) 100%)",
        }}
      />

      {/* ── CONTENT ── */}
      <div
        className="relative z-[3] flex flex-col items-center text-center px-6 max-w-5xl mx-auto w-full"
        style={{ paddingTop: "160px", paddingBottom: "80px" }}
      >
        {/* App Icon Box — slightly larger, glow rings removed per user request */}
        <motion.div variants={scaleIn(0.05)} initial="initial" animate="animate"
          style={{ marginBottom: "24px" }}>
          
          <div style={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            {/* Sky-blue radial glow halo — dark only */}
            <div style={{
              position: "absolute",
              width: "220px",
              height: "220px",
              borderRadius: "50%",
              background: resolvedTheme === 'dark'
                ? "radial-gradient(circle at center, rgba(109, 182, 255, 0.55) 0%, transparent 70%)"
                : "transparent",
              filter: "blur(10px)",
              pointerEvents: "none",
            }} />

            {/* Main icon box */}
            <div style={{
              position: "relative",
              width: "132px",
              height: "132px",
              borderRadius: "28px",
              background: resolvedTheme === 'dark' ? "var(--color-bg-card)" : "rgba(255,255,255,0.95)",
              border: resolvedTheme === 'dark' ? "1px solid var(--color-border)" : "1px solid rgba(15,23,42,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: resolvedTheme === 'dark'
                ? "0 0 40px -5px rgba(109, 182, 255, 0.7), 0 0 80px 0px rgba(109, 182, 255, 0.25)"
                : "0 12px 40px rgba(15,23,42,0.12), 0 4px 12px rgba(15,23,42,0.06)",
              zIndex: 1,
              padding: "16px",
            }}>
              <Image
                src="/scalepods-logo.png"
                alt="ScalePods"
                width={108}
                height={108}
                style={{ 
                  width: "92px", 
                  height: "auto", 
                  objectFit: "contain",
                  filter: resolvedTheme === 'dark' ? "invert(1)" : "none",
                  transition: "filter 0.3s ease",
                }}
                priority
              />
            </div>
          </div>
        </motion.div>

        {/* Badge — blinking blue dot */}
        <motion.div variants={fadeUp(0.16)} initial="initial" animate="animate"
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
            color: "var(--color-text-muted)",
          }}>
            {/* Blinking blue dot with exact pulse scale animation from live site */}
            <span style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              {/* Solid core dot that scales and fades */}
              <motion.span
                animate={{ scale: [1, 1.6, 1], opacity: [1, 0.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#3B82F6",
                  boxShadow: "0 0 10px rgba(59,130,246,0.6)",
                  flexShrink: 0,
                  position: "relative",
                  zIndex: 1,
                }}
              />
            </span>
            NEW GEN AI AUTOMATION PARTNER
          </span>
        </motion.div>

        {/* H1 — with exact blended black/silver fade effect at sides */}
        <motion.h1
          variants={fadeUp(0.28)} initial="initial" animate="animate"
          style={{
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: "clamp(44px, 6.2vw, 72px)",
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: "-0.028em",
            marginBottom: "18px",
            maxWidth: "980px",
            backgroundImage: resolvedTheme === 'dark'
              ? "linear-gradient(90deg, #7f90a6 0%, #FFFFFF 50%, #7f90a6 100%)"
              : "linear-gradient(90deg, #0f172a 0%, #1e293b 40%, #0f172a 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Automate the Busywork.
          <br />
          Unlock Growth.
        </motion.h1>

        {/* Subtext — same blended gradient as H1, wraps on mobile */}
        <motion.p
          variants={fadeUp(0.4)} initial="initial" animate="animate"
          className="hero-subtext"
          style={{
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: "15px",
            fontWeight: 400,
            lineHeight: 1.6,
            maxWidth: "720px",
            marginBottom: "28px",
            whiteSpace: "nowrap",
            color: resolvedTheme === 'dark' ? undefined : "#475569",
            backgroundImage: resolvedTheme === 'dark'
              ? "linear-gradient(90deg, #7f90a6 0%, #FFFFFF 50%, #7f90a6 100%)"
              : undefined,
            WebkitBackgroundClip: resolvedTheme === 'dark' ? "text" : undefined,
            WebkitTextFillColor: resolvedTheme === 'dark' ? "transparent" : undefined,
            backgroundClip: resolvedTheme === 'dark' ? "text" : undefined,
          }}
        >
          We build smart workflows that automate the repetitive, reduce overheads and keep teams lean.
        </motion.p>

        {/* CTA Button — lamp glow on hover (matches reference) */}
        <motion.div variants={fadeUp(0.5)} initial="initial" animate="animate"
          style={{ position: "relative", marginBottom: "24px", display: "inline-block" }}>
          <HeroButton href="/contact">
            Book A Free Call <ArrowUpRight style={{ width: "15px", height: "15px", marginLeft: "4px" }} />
          </HeroButton>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.78, duration: 0.8 } }}
        >
         <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "32px", marginBottom: "30px", color: "var(--color-blue-bright)" }}>
          <a
            href="https://www.linkedin.com/company/scalepods-co"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", color: "inherit", opacity: 0.8, transition: "opacity 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "0.8")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <span style={{ opacity: 0.15, fontSize: "20px", color: "var(--color-text-body)", whiteSpace: "pre" }}>|       |</span>
          <a
            href="https://www.instagram.com/scalepods.co/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", color: "inherit", opacity: 0.8, transition: "opacity 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "0.8")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
        </div>
        </motion.div>

        {/* Subtle scroll cue */}
        <motion.div
          initial={{ opacity: 0, y: -2 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 1, duration: 0.8 } }}
        >
          <Link href="#data-analysis" aria-label="Scroll to data analysis section" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--color-text-muted)" }}>
            <ArrowDown style={{ width: "18px", height: "18px" }} />
          </Link>
        </motion.div>

      </div>

      {/* Breathing floor glow — dark mode only, hidden in light */}
      <motion.div
        className="glow-ambient"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "80vw",
          height: "260px",
          background: "radial-gradient(ellipse at bottom, rgba(109,182,255,0.18) 0%, rgba(109,182,255,0.08) 35%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {/* Thin light seam at bottom — dark mode only */}
      {resolvedTheme === 'dark' && (
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "1.5px",
          background: "linear-gradient(90deg, transparent 5%, var(--color-green) 50%, transparent 95%)",
          boxShadow: "0 -20px 60px 0px rgba(109,182,255,0.12), 0 -4px 20px 0px rgba(255,255,255,0.08)",
          zIndex: 1, pointerEvents: "none",
          opacity: 0.4
        }} />
      )}

    </section>
  );
}

// ── Hero CTA Button with lamp-glow hover effect ────────────────────────────────
function HeroButton({ href, children }: { href: string; children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  
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
          color: resolvedTheme === 'dark' ? "var(--color-green)" : "#111111",
          background: resolvedTheme === 'dark' ? "var(--color-bg-card)" : "#ffffff",
          WebkitBackdropFilter: "blur(10px)",
          backdropFilter: "blur(10px)",
          border: resolvedTheme === 'dark' ? "1px solid var(--color-border)" : "1px solid rgba(0,0,0,0.08)",
          borderRadius: "12px",
          padding: "12px 24px",
          overflow: "hidden",
          cursor: "pointer",
          boxShadow: resolvedTheme === 'dark' ? undefined : "0 4px 20px rgba(0,0,0,0.06)",
          transition: "box-shadow 0.3s ease, transform 0.3s ease",
        }}
      >
        {/* Soft lamp wash — spreads on hover */}
        <motion.div
          variants={{
            rest: { opacity: 0.16, width: "140px", height: "52px" },
            hover: { opacity: 0.36, width: "280px", height: "84px" },
          }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute",
            left: "50%",
            bottom: "-28px",
            transform: "translateX(-50%)",
            background: "radial-gradient(ellipse at center, var(--color-green) 0%, transparent 70%)",
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
            background: "radial-gradient(50% 50% at 50% 50%, var(--color-text-bright) 0%, rgba(255,255,255,0) 100%)",
            boxShadow: "0px 0px 12px 2px var(--color-green)",
            pointerEvents: "none",
            opacity: resolvedTheme === 'light' ? 0.6 : 1
          }}
        />
        <span style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", gap: "5px" }}>
          {children}
        </span>
      </motion.div>
    </Link>
  );
}
