"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/components/providers/ThemeProvider";
import { BeamsBackground } from "@/components/ui/beams-background";

export default function CaseStudiesPage() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const logoBoxStyle: React.CSSProperties = {
    width: "100%",
    aspectRatio: "1.15",
    borderRadius: "28px",
    background: isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(15, 23, 42, 0.03)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(15, 23, 42, 0.08)",
    boxShadow: isDark 
      ? "0 20px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)" 
      : "0 15px 30px rgba(0,0,0,0.02), inset 0 1px 0 rgba(255,255,255,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    position: "relative"
  };

  const learnMoreBtnStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "14px 28px",
    borderRadius: "24px",
    fontSize: "14.5px",
    fontWeight: 600,
    background: "var(--color-text-bright)",
    color: "var(--color-bg-page)",
    textDecoration: "none",
    boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
    transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)"
  };

  return (
    <main style={{ 
      minHeight: "100vh", 
      color: "var(--color-text-body)",
      fontFamily: "var(--font-inter), sans-serif" 
    }}>
      <BeamsBackground hues={[200, 210, 225]} intensity="strong">
        <div style={{ paddingTop: "140px", paddingBottom: "140px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
            
            {/* Case Studies Container */}
            <div style={{ display: "flex", flexDirection: "column", gap: "110px" }}>

              {/* ── Case Study 1: Lotus Manor (Image Left, Text Right) ── */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-5xl mx-auto w-full">
                
                {/* Left Column: Image Container */}
                <div className="lg:col-span-5 w-full flex justify-center">
                  <div style={logoBoxStyle}>
                    <Image
                      src="/brands/lotus-manor-new.webp"
                      alt="Lotus Manor Logo Box"
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      priority
                      style={{
                        objectFit: "cover",
                        transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                      }}
                      className="hover:scale-[1.03]"
                    />
                  </div>
                </div>

                {/* Right Column: Case Study Text */}
                <div className="lg:col-span-7 flex flex-col gap-5 text-center lg:text-left items-center lg:items-start">
                  <span style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--color-blue-mid)"
                  }}>
                    CASE STUDY
                  </span>
                  
                  <h2 style={{
                    fontSize: "clamp(32px, 3.5vw, 48px)",
                    fontWeight: 750,
                    color: "var(--color-text-bright)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em"
                  }}>
                    Lotus Manor
                  </h2>

                  <p style={{
                    fontSize: "17px",
                    color: "var(--color-text-body)",
                    lineHeight: 1.6,
                    margin: 0
                  }}>
                    Lotus Manor achieved a 21% response rate across 1,000+ prospects by using ScalePods to automatically follow up, sequence outreach, and route replies back to sales, eliminating manual chasing and giving their team the bandwidth to focus entirely on closing deals.
                  </p>

                  <div style={{ marginTop: "12px" }}>
                    <Link 
                      href="/case-study/lotus-manor-real-estate-sales-automation-dubai"
                      style={learnMoreBtnStyle}
                      className="hover:scale-[1.03] active:scale-[0.98] hover:shadow-lg"
                    >
                      Learn more →
                    </Link>
                  </div>
                </div>

              </div>

              {/* ── Case Study 2: ZV Steels (Text Left, Image Right - Alternate Manner) ── */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-5xl mx-auto w-full">
                
                {/* Left Column on Desktop / Bottom on Mobile: Case Study Text */}
                <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col gap-5 text-center lg:text-left items-center lg:items-start">
                  <span style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--color-blue-mid)"
                  }}>
                    CASE STUDY
                  </span>
                  
                  <h2 style={{
                    fontSize: "clamp(32px, 3.5vw, 48px)",
                    fontWeight: 750,
                    color: "var(--color-text-bright)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em"
                  }}>
                    ZV Steels
                  </h2>

                  <p style={{
                    fontSize: "17px",
                    color: "var(--color-text-body)",
                    lineHeight: 1.6,
                    margin: 0
                  }}>
                    ZV Steels automated 4 core operations across HR recruitment, 3-way freight reconciliation, and wholesale outreach with ScalePods, slashing candidate screening effort by 80% and booking interviews in under 30 minutes.
                  </p>

                  <div style={{ marginTop: "12px" }}>
                    <Link 
                      href="/case-study/zv-steels-recruitment-automation-tool"
                      style={learnMoreBtnStyle}
                      className="hover:scale-[1.03] active:scale-[0.98] hover:shadow-lg"
                    >
                      Learn more →
                    </Link>
                  </div>
                </div>

                {/* Right Column on Desktop / Top on Mobile: Image Container */}
                <div className="order-1 lg:order-2 lg:col-span-5 w-full flex justify-center">
                  <div style={logoBoxStyle}>
                    <Image
                      src="/brands/zv-steels-new.webp"
                      alt="ZV Steels Logo Box"
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      style={{
                        objectFit: "cover",
                        transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                      }}
                      className="hover:scale-[1.03]"
                    />
                  </div>
                </div>

              </div>

              {/* ── Case Study 3: A Squared Real Estate (Image Left, Text Right) ── */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-5xl mx-auto w-full">
                
                {/* Left Column: Image Container */}
                <div className="lg:col-span-5 w-full flex justify-center">
                  <div style={logoBoxStyle}>
                    <Image
                      src="/brands/asquared-brand-1x1.webp"
                      alt="A Squared Real Estate Logo Box"
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      style={{
                        objectFit: "cover",
                        transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                      }}
                      className="hover:scale-[1.03]"
                    />
                  </div>
                </div>

                {/* Right Column: Case Study Text */}
                <div className="lg:col-span-7 flex flex-col gap-5 text-center lg:text-left items-center lg:items-start">
                  <span style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--color-blue-mid)"
                  }}>
                    CASE STUDY
                  </span>
                  
                  <h2 style={{
                    fontSize: "clamp(32px, 3.5vw, 48px)",
                    fontWeight: 750,
                    color: "var(--color-text-bright)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em"
                  }}>
                    A Squared Real Estate
                  </h2>

                  <p style={{
                    fontSize: "17px",
                    color: "var(--color-text-body)",
                    lineHeight: 1.6,
                    margin: 0
                  }}>
                    A Squared had thousands of prospects moving through its CRM, but lead volume wasn&apos;t the real problem. Follow-ups were inconsistent, high-intent opportunities could go cold, and older leads were being forgotten. ScalePods built an AI-powered automated sales system that qualified leads, triggered WhatsApp and voice outreach, analyzed responses, and used sales lead automation to bring inactive prospects back into the sales pipeline software .
                  </p>

                  <div style={{ marginTop: "12px" }}>
                    <Link 
                      href="/case-study/asquared-real-estate-sales-automation-dubai"
                      style={learnMoreBtnStyle}
                      className="hover:scale-[1.03] active:scale-[0.98] hover:shadow-lg"
                    >
                      Learn more →
                    </Link>
                  </div>
                </div>

              </div>

              {/* ── Case Study 4: Lootah Group of Companies (Text Left, Image Right - Alternate Manner) ── */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-5xl mx-auto w-full">
                
                {/* Left Column on Desktop / Bottom on Mobile: Case Study Text */}
                <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col gap-5 text-center lg:text-left items-center lg:items-start">
                  <span style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--color-blue-mid)"
                  }}>
                    CASE STUDY
                  </span>
                  
                  <h2 style={{
                    fontSize: "clamp(32px, 3.5vw, 48px)",
                    fontWeight: 750,
                    color: "var(--color-text-bright)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em"
                  }}>
                    Lootah Group of Companies
                  </h2>

                  <p style={{
                    fontSize: "17px",
                    color: "var(--color-text-body)",
                    lineHeight: 1.6,
                    margin: 0
                  }}>
                    Lootah Group of Companies needed a structured way to manage procurement without relying on disconnected spreadsheets. ScalePods developed a centralized procurement workflow automation platform that combines smart PO import, supplier price variance tracking, spend dashboards, and AI audit controls—slashing PO batch ingestion times by ~95% from 30–45 minutes to under two minutes.
                  </p>

                  <div style={{ marginTop: "12px" }}>
                    <Link 
                      href="/case-study/lootah-group-procurement-workflow-automation"
                      style={learnMoreBtnStyle}
                      className="hover:scale-[1.03] active:scale-[0.98] hover:shadow-lg"
                    >
                      Learn more →
                    </Link>
                  </div>
                </div>

                {/* Right Column on Desktop / Top on Mobile: Image Container */}
                <div className="order-1 lg:order-2 lg:col-span-5 w-full flex justify-center">
                  <div style={logoBoxStyle}>
                    <Image
                      src="/brands/lootah-group-new.svg"
                      alt="Lootah Group of Companies Logo Box"
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      style={{
                        objectFit: "cover",
                        transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                      }}
                      className="hover:scale-[1.03]"
                    />
                  </div>
                </div>

              </div>

              {/* ── Case Study 5: MACRO Media (Image Left, Text Right - Alternate Manner) ── */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-5xl mx-auto w-full">
                
                {/* Left Column: Image Container */}
                <div className="lg:col-span-5 w-full flex justify-center">
                  <div style={logoBoxStyle}>
                    <Image
                      src="/brands/macro-media-box.svg"
                      alt="MACRO Media Logo Box"
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      style={{
                        objectFit: "cover",
                        transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                      }}
                      className="hover:scale-[1.03]"
                    />
                  </div>
                </div>

                {/* Right Column: Case Study Text */}
                <div className="lg:col-span-7 flex flex-col gap-5 text-center lg:text-left items-center lg:items-start">
                  <span style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--color-blue-mid)"
                  }}>
                    CASE STUDY
                  </span>
                  
                  <h2 style={{
                    fontSize: "clamp(32px, 3.5vw, 48px)",
                    fontWeight: 750,
                    color: "var(--color-text-bright)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em"
                  }}>
                    MACRO Media
                  </h2>

                  <p style={{
                    fontSize: "17px",
                    color: "var(--color-text-body)",
                    lineHeight: 1.6,
                    margin: 0
                  }}>
                    Macro Media&apos;s finance team managed its monthly close in a single HTML file with browser storage, creating version silos and security concerns. ScalePods engineered Macro Studio, a multi-user web application with centralized cloud data, Clerk role-based access, and sub-2-second sync across Los Angeles and the Philippines—achieving 100% task ownership and cutting coordination time by 30%.
                  </p>

                  <div style={{ marginTop: "12px" }}>
                    <Link 
                      href="/case-study/macro-media-finance-workflow-automation"
                      style={learnMoreBtnStyle}
                      className="hover:scale-[1.03] active:scale-[0.98] hover:shadow-lg"
                    >
                      Learn more →
                    </Link>
                  </div>
                </div>

              </div>

              {/* ── Case Study 6: Bennett Realty Solutions (Text Left, Image Right - Alternate Manner) ── */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-5xl mx-auto w-full">
                
                {/* Left Column on Desktop / Bottom on Mobile: Case Study Text */}
                <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col gap-5 text-center lg:text-left items-center lg:items-start">
                  <span style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--color-blue-mid)"
                  }}>
                    CASE STUDY
                  </span>
                  
                  <h2 style={{
                    fontSize: "clamp(32px, 3.5vw, 48px)",
                    fontWeight: 750,
                    color: "var(--color-text-bright)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em"
                  }}>
                    Bennett Realty Solutions
                  </h2>

                  <p style={{
                    fontSize: "17px",
                    color: "var(--color-text-body)",
                    lineHeight: 1.6,
                    margin: 0
                  }}>
                    Bennett Realty needed a way to manage expanding lead flow, transaction milestones, and agent onboarding without drowning in administrative busywork. ScalePods engineered Bennett Realty Growth OS—an interconnected brokerage platform featuring sub-2-minute automated lead engagement, milestone tracking, and 24/7 AI agent procedural support that saved 8–10 hours per deal and cut missed deadlines by ~90%.
                  </p>

                  <div style={{ marginTop: "12px" }}>
                    <Link 
                      href="/case-study/bennett-realty-growth-os"
                      style={learnMoreBtnStyle}
                      className="hover:scale-[1.03] active:scale-[0.98] hover:shadow-lg"
                    >
                      Learn more →
                    </Link>
                  </div>
                </div>

                {/* Right Column on Desktop / Top on Mobile: Image Container */}
                <div className="order-1 lg:order-2 lg:col-span-5 w-full flex justify-center">
                  <div style={logoBoxStyle}>
                    <Image
                      src="/brands/bennett-realty-box.svg"
                      alt="Bennett Realty Solutions Logo Box"
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      style={{
                        objectFit: "cover",
                        transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                      }}
                      className="hover:scale-[1.03]"
                    />
                  </div>
                </div>

              </div>

              {/* ── Case Study 7: Victory Energy (Image Left, Text Right - Alternate Manner) ── */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-5xl mx-auto w-full">
                
                {/* Left Column: Image Container */}
                <div className="lg:col-span-5 w-full flex justify-center">
                  <div style={logoBoxStyle}>
                    <Image
                      src="/brands/victory-energy-box.svg"
                      alt="Victory Energy Logo Box"
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      style={{
                        objectFit: "cover",
                        transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                      }}
                      className="hover:scale-[1.03]"
                    />
                  </div>
                </div>

                {/* Right Column: Case Study Text */}
                <div className="lg:col-span-7 flex flex-col gap-5 text-center lg:text-left items-center lg:items-start">
                  <span style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--color-blue-mid)"
                  }}>
                    CASE STUDY
                  </span>
                  
                  <h2 style={{
                    fontSize: "clamp(32px, 3.5vw, 48px)",
                    fontWeight: 750,
                    color: "var(--color-text-bright)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em"
                  }}>
                    Victory Energy
                  </h2>

                  <p style={{
                    fontSize: "17px",
                    color: "var(--color-text-body)",
                    lineHeight: 1.6,
                    margin: 0
                  }}>
                    Victory Energy needed to streamline recruiting, sales response, content production, and accounting across 17 distinct operating entities. ScalePods engineered four interconnected AI operating systems—Talent OS, Growth OS for Sales, Growth OS for Marketing, and Financial OS—slashing resume screening time by 74%, driving 38% more appointment bookings, and compressing month-end financial close from 9 days down to 5 days.
                  </p>

                  <div style={{ marginTop: "12px" }}>
                    <Link 
                      href="/case-study/victory-energy-business-automation"
                      style={learnMoreBtnStyle}
                      className="hover:scale-[1.03] active:scale-[0.98] hover:shadow-lg"
                    >
                      Learn more →
                    </Link>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </BeamsBackground>
    </main>
  );
}
