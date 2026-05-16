"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight, MessageSquare, ArrowDown } from "lucide-react";
import { InstagramIcon, LinkedinIcon } from "@/components/Icons";
import ParticlesBackground from "@/components/ui/ParticlesBackground";
import Link from "next/link";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useMobile } from "@/lib/hooks";


const fadeUp = (delay = 0, isMobile = false): Variants => ({
  initial: { opacity: 0, y: isMobile ? 10 : 16, filter: isMobile ? "blur(2px)" : "blur(6px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
});

const scaleIn = (delay = 0, isMobile = false): Variants => ({
  initial: { opacity: 0, scale: 0.92, filter: isMobile ? "blur(2px)" : "blur(6px)" },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
});

export default function Hero() {
  const { resolvedTheme } = useTheme();
  const isMobile = useMobile(768);

  
  return (
    <section
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--color-bg-page)" }}
    >
      {/* ── VIDEO BACKGROUND ── */}
      <video
        autoPlay loop muted playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0 hero-video"
        style={{
          objectPosition: "center",
          transform: isMobile ? "scale(1.1) translate3d(0,0,0)" : "none", 
          filter: resolvedTheme === 'dark' 
            ? "hue-rotate(200deg) saturate(0.25) brightness(0.35)" 
            : "grayscale(1) contrast(1.1) brightness(1.2) opacity(0.6)",
          opacity: resolvedTheme === 'dark' ? 1 : 0.85,
          transition: "filter 0.5s ease, opacity 0.5s ease",
          willChange: "filter, opacity"
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
        style={{ paddingTop: isMobile ? "100px" : "160px", paddingBottom: isMobile ? "60px" : "80px" }}
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
              width: isMobile ? "160px" : "220px",
              height: isMobile ? "160px" : "220px",
              borderRadius: "50%",
              background: resolvedTheme === 'dark'
                ? "radial-gradient(circle at center, rgba(109, 182, 255, 0.4) 0%, transparent 70%)"
                : "transparent",
              filter: isMobile ? "blur(5px)" : "blur(10px)",
              pointerEvents: "none",
            }} />

            {/* Main icon box */}
            <div style={{
              position: "relative",
              width: isMobile ? "90px" : "120px",
              height: isMobile ? "90px" : "120px",
              borderRadius: isMobile ? "18px" : "24px",
              background: resolvedTheme === 'dark' ? "var(--color-bg-card)" : "rgba(255,255,255,0.95)",
              border: resolvedTheme === 'dark' ? "1px solid var(--color-border)" : "1px solid rgba(15,23,42,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: resolvedTheme === 'dark'
                ? `0 0 ${isMobile ? '20px' : '40px'} -5px rgba(109, 182, 255, 0.7)`
                : "0 12px 40px rgba(15,23,42,0.12)",
              zIndex: 1,
              padding: isMobile ? "12px" : "16px",
            }}>
              <Image
                src="/scalepods-logo.png"
                alt="ScalePods"
                width={108}
                height={108}
                style={{ 
                  width: isMobile ? "62px" : "84px", 
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
        <motion.div variants={fadeUp(0.16, isMobile)} initial="initial" animate="animate"
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
          variants={fadeUp(0.28, isMobile)} initial="initial" animate="animate"
          style={{
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: isMobile ? "38px" : "clamp(44px, 6.2vw, 72px)",
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
          variants={fadeUp(0.4, isMobile)} initial="initial" animate="animate"
          className="hero-subtext"
          style={{
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: isMobile ? "14px" : "15px",
            fontWeight: 400,
            lineHeight: 1.6,
            maxWidth: "720px",
            marginBottom: "28px",
            whiteSpace: "normal",
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
        <motion.div variants={fadeUp(0.5, isMobile)} initial="initial" animate="animate"
          style={{ position: "relative", marginBottom: "24px", display: "inline-block" }}>
          <HeroButton href="/contact">
            Book A Free Call 
            <ArrowUpRight style={{ width: "15px", height: "15px", marginLeft: "4px" }} />
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

function HeroButton({ href, children }: { href: string; children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <Link href={href} style={{ textDecoration: "none", display: "inline-block" }}>
      <div style={{ position: "relative" }}>
        {/* Ambient Glow behind button (using #B1D997) */}
        <motion.div
          animate={{
            opacity: isDark ? [0.2, 0.4, 0.2] : [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            inset: "-8px",
            background: "rgba(177, 217, 151, 0.25)",
            filter: "blur(14px)",
            borderRadius: "16px",
            zIndex: 0,
            pointerEvents: "none"
          }}
        />

        <div
          style={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: "15px",
            fontWeight: 700,
            letterSpacing: "-0.01em",
            
            // Theme Adaptive Colors (#B1D997 for dark mode text)
            color: isDark ? "#B1D997" : "#0f172a",
            
            // Background Logic (Gradient using #B1D997)
            background: isDark
              ? "linear-gradient(135deg, #050816 0%, #0b1020 100%)"
              : "linear-gradient(135deg, #B1D997 0%, #C5E4B2 50%, #D8EFCC 100%)",
            
            // Glass & Border (#B1D997 glow)
            backdropFilter: isDark ? "blur(12px)" : "none",
            WebkitBackdropFilter: isDark ? "blur(12px)" : "none",
            border: isDark 
              ? "1px solid rgba(177, 217, 151, 0.4)" 
              : "1px solid rgba(177, 217, 151, 0.3)",
            
            borderRadius: "12px",
            padding: "16px 36px",
            cursor: "pointer",
            
            // Depth & Shadows
            boxShadow: isDark 
              ? "0 8px 24px -4px rgba(0, 0, 0, 0.6), 0 0 15px rgba(177, 217, 151, 0.15)" 
              : "0 10px 20px -5px rgba(177, 217, 151, 0.25), inset 0 1px 0 rgba(255,255,255,0.4)",
            
            zIndex: 1,
            transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
          }}
        >
          <span 
            style={{ position: "relative", zIndex: 3, display: "flex", alignItems: "center", gap: "8px" }}
          >
            {children}
          </span>
        </div>
      </div>
    </Link>
  );
}


