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
      id="hero"
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--color-bg-page)" }}
    >
      {/* ── VIDEO BACKGROUND — desktop only; mobile gets a static poster ── */}
      {isMobile ? (
        <div
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage: "url('/background-poster.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: resolvedTheme === 'dark'
              ? "saturate(0.8) brightness(0.55) contrast(1.05) hue-rotate(-8deg)"
              : "saturate(0.35) brightness(1.08) contrast(0.88) hue-rotate(-12deg)",
          }}
        />
      ) : (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/background-poster.webp"
          className="absolute inset-0 w-full h-full object-cover z-0 hero-video"
          style={{
            objectPosition: "center",
            filter: resolvedTheme === 'dark'
              ? "hue-rotate(200deg) saturate(0.25) brightness(0.35)"
              : "grayscale(1) contrast(1.1) brightness(1.2) opacity(0.6)",
            opacity: resolvedTheme === 'dark' ? 0.35 : 0.22,
            transition: "filter 0.5s ease, opacity 0.5s ease",
            willChange: "filter, opacity",
            pointerEvents: "none",
            backfaceVisibility: "hidden",
          }}
        >
          <source src="/background.mp4" type="video/mp4" />
        </video>
      )}

      {/* ── MOBILE VIDEO OVERLAY ── */}
      {isMobile && (
        <div 
          className="mobile-video-overlay"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            pointerEvents: "none",
            background: resolvedTheme === 'dark'
              ? "linear-gradient(180deg, rgba(4, 8, 18, 0.8) 0%, rgba(4, 8, 18, 0.72) 35%, rgba(4, 8, 18, 0.76) 70%, rgba(4, 8, 18, 0.85) 100%)"
              : "linear-gradient(180deg, rgba(245, 247, 250, 0.62) 0%, rgba(236, 239, 243, 0.52) 100%)",
            backdropFilter: resolvedTheme === 'dark' ? "blur(3px)" : "blur(2px)",
            WebkitBackdropFilter: resolvedTheme === 'dark' ? "blur(3px)" : "blur(2px)",
          }}
        />
      )}

      {/* ── MOBILE COLOR NEUTRALIZATION LAYER ── */}
      {isMobile && (
        <div 
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background: resolvedTheme === 'dark'
              ? "rgba(10, 20, 36, 0.15)"
              : "rgba(220, 225, 235, 0.12)",
            mixBlendMode: "color",
            pointerEvents: "none"
          }}
        />
      )}

      {/* ── PARTICLES ── */}
      <div style={{ opacity: resolvedTheme === 'dark' ? 1 : 0.3, transition: 'opacity 1s ease', position: "relative", zIndex: 1 }}>
        <ParticlesBackground />
      </div>

      {/* Gradient overlay — DESKTOP ONLY */}
      {!isMobile && (
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background: resolvedTheme === 'dark'
              ? "linear-gradient(to bottom, rgba(4,7,13,0.82) 0%, transparent 20%, transparent 68%, rgba(4,7,13,0.96) 100%)"
              : "linear-gradient(to bottom, rgba(255,255,255,0.72) 0%, rgba(250,250,250,0.45) 30%, rgba(250,250,250,0.45) 70%, rgba(255,255,255,0.72) 100%)",
          }}
        />
      )}

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
            <div style={{
              position: "absolute",
              width: isMobile ? "160px" : "190px",
              height: isMobile ? "160px" : "190px",
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
              width: isMobile ? "90px" : "100px",
              height: isMobile ? "90px" : "100px",
              borderRadius: isMobile ? "18px" : "22px",
              background: resolvedTheme === 'dark' ? "var(--color-bg-card)" : "rgba(255,255,255,0.95)",
              border: resolvedTheme === 'dark' ? "1px solid var(--color-border)" : "1px solid rgba(15,23,42,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: resolvedTheme === 'dark'
                ? `0 0 ${isMobile ? '20px' : '36px'} -5px rgba(109, 182, 255, 0.7)`
                : "0 12px 40px rgba(15,23,42,0.12)",
              zIndex: 1,
              padding: isMobile ? "12px" : "14px",
            }}>
              <Image
                src="/scalepods-logo.png"
                alt="ScalePods"
                width={108}
                height={108}
                style={{
                  width: isMobile ? "62px" : "70px",
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

        {/* Badge — Claude Partner Network */}
        <motion.div 
          variants={fadeUp(0.16, isMobile)} 
          initial="initial" 
          animate="animate"
          style={{ marginBottom: "14px" }}
        >
          <style>{`
            .claude-hero-badge {
              display: inline-flex;
              align-items: center;
              gap: 8px;
              padding: 6px 14px;
              border-radius: 99px;
              font-family: var(--font-inter), Inter, sans-serif;
              font-size: 12px;
              font-weight: 600;
              letter-spacing: 0.18em;
              text-transform: uppercase;
              text-decoration: none;
              color: var(--color-text-muted);
              background: rgba(255, 255, 255, 0.03);
              border: 1px solid rgba(255, 255, 255, 0.08);
              backdrop-filter: blur(8px);
              -webkit-backdrop-filter: blur(8px);
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(217, 119, 87, 0.05);
              transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
              cursor: pointer;
            }

            [data-theme="light"] .claude-hero-badge {
              background: rgba(15, 23, 42, 0.03);
              border: 1px solid rgba(15, 23, 42, 0.06);
              box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03), 0 0 0 1px rgba(217, 119, 87, 0.03);
            }

            .claude-hero-badge:hover {
              transform: scale(1.05);
              background: rgba(255, 255, 255, 0.06);
              border-color: rgba(217, 119, 87, 0.3);
              box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15), 0 0 12px rgba(217, 119, 87, 0.25), inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
            }

            [data-theme="light"] .claude-hero-badge:hover {
              background: rgba(15, 23, 42, 0.05);
              border-color: rgba(217, 119, 87, 0.3);
              box-shadow: 0 8px 20px rgba(15, 23, 42, 0.06), 0 0 12px rgba(217, 119, 87, 0.2);
            }

            .claude-badge-bloom-icon-container {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: 18px;
              height: 18px;
            }

            .claude-badge-bloom-svg {
              width: 100%;
              height: 100%;
              overflow: visible;
              transform-origin: center;
              animation: claude-symbol-bloom 3.5s ease-in-out infinite;
              fill: #D97757;
            }

            @keyframes claude-symbol-bloom {
              0% {
                transform: scale(0.8);
                opacity: 0.8;
                filter: drop-shadow(0 0 2px rgba(217, 119, 87, 0.3));
              }
              35% {
                transform: scale(1.1);
                opacity: 1;
                filter: drop-shadow(0 0 8px rgba(217, 119, 87, 0.55));
              }
              45% {
                transform: scale(1.0);
                opacity: 1;
                filter: drop-shadow(0 0 4px rgba(217, 119, 87, 0.4));
              }
              75% {
                transform: scale(1.0);
                opacity: 1;
                filter: drop-shadow(0 0 4px rgba(217, 119, 87, 0.4));
              }
              100% {
                transform: scale(0.8);
                opacity: 0.8;
                filter: drop-shadow(0 0 2px rgba(217, 119, 87, 0.3));
              }
            }

            .claude-badge-separator {
              margin: 0 4px;
              color: rgba(217, 119, 87, 0.6);
            }
          `}</style>
          
          <Link href="#claude-partnership" scroll={true} className="claude-hero-badge">
            <span className="claude-badge-bloom-icon-container">
              <svg 
                viewBox="0 0 24 24" 
                className="claude-badge-bloom-svg" 
              >
                <path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z" />
              </svg>
            </span>
            <span>
              Claude Partner Network <span className="claude-badge-separator">•</span> Official Services Partner
            </span>
          </Link>
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
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
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
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
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
          display: isMobile ? "none" : "block",
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


