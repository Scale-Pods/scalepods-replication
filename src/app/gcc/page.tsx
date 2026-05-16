"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronRight, Download, Loader2, HelpCircle, ChevronDown, MessageCircle, ArrowUpRight } from "lucide-react";
import dynamic from "next/dynamic";
import { supabase } from "@/lib/supabase";
import DownloadModal from "@/components/ui/DownloadModal";
import { useMobile } from "@/lib/hooks";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useTheme } from "@/components/providers/ThemeProvider";
import { BeamsBackground } from "@/components/ui/beams-background";

// ── Dynamic Imports for Below-the-Fold Sections ─────────────────────────────
const ImmersiveFeatures = dynamic(() => import("@/components/sections/ImmersiveFeatures").then(mod => mod.ImmersiveFeatures), { ssr: true });
const SalesPodShowcase = dynamic(() => import("@/components/sections/SalesPodShowcase").then(mod => mod.SalesPodShowcase), { ssr: true });
const HRShowcase = dynamic(() => import("@/components/sections/HRShowcase").then(mod => mod.HRShowcase), { ssr: true });
const OpsShowcase = dynamic(() => import("@/components/sections/OpsShowcase").then(mod => mod.OpsShowcase), { ssr: true });
const MarketingShowcase = dynamic(() => import("@/components/sections/MarketingShowcase").then(mod => mod.MarketingShowcase), { ssr: true });
const CustomWorkflowShowcase = dynamic(() => import("@/components/sections/CustomWorkflowShowcase").then(mod => mod.CustomWorkflowShowcase), { ssr: true });
const ImpactShowcase = dynamic(() => import("@/components/sections/ImpactShowcase").then(mod => mod.ImpactShowcase), { ssr: true });
const WhyChooseShowcase = dynamic(() => import("@/components/sections/WhyChooseShowcase").then(mod => mod.WhyChooseShowcase), { ssr: true });
const ProcessShowcase = dynamic(() => import("@/components/sections/ProcessShowcase").then(mod => mod.ProcessShowcase), { ssr: true });
const CaseStudiesShowcase = dynamic(() => import("@/components/sections/CaseStudiesShowcase").then(mod => mod.CaseStudiesShowcase), { ssr: true });
const KnowledgeShowcase = dynamic(() => import("@/components/sections/KnowledgeShowcase").then(mod => mod.KnowledgeShowcase), { ssr: true });
const FinalCTASection = dynamic(() => import("@/components/sections/FinalCTASection").then(mod => mod.FinalCTASection), { ssr: true });

// import { StickyFeatureReveal } from "@/components/sections/StickyFeatureReveal"; // Retired for card-based layout

// ── Design tokens ─────────────────────────────────────────────────────────────
const C = {
  bgPage:    "var(--color-bg-page)",
  bgCard:    "var(--color-bg-card)",
  bgPanel:   "var(--color-bg-card-alt)",
  bgInput:   "var(--color-bg-input)",
  border:    "var(--color-border)",
  borderMid: "var(--color-border)",
  green:     "var(--color-green)",
  greenBright: "var(--color-green)",
  blue:      "var(--color-blue-mid)",
  txtBright: "var(--color-text-bright)",
  txtBody:   "var(--color-text-body)",
  txtMuted:  "var(--color-text-muted)",
};
const F = {
  inter: "var(--font-inter), Inter, sans-serif",
  serif: "var(--font-instrument), 'Instrument Serif', Georgia, serif",
  accent: "var(--font-instrument), serif",
};

// ── Glassmorphism tokens ──────────────────────────────────────────────────────
const G = {
  bg: "rgba(var(--color-text-bright-rgb), 0.015)",
  border: "1px solid var(--color-border-faint)",
  blur: "blur(12px)",
};

// ── Shared input style (matching contact page) ────────────────────────────────
const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--color-bg-input)",
  border: "1px solid var(--color-border)",
  borderRadius: "10px",
  padding: "10px 14px",
  fontFamily: F.inter,
  fontSize: "14px",
  color: "var(--color-text-body)",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
};

const labelStyle: React.CSSProperties = {
  fontFamily: F.inter,
  fontSize: "13px",
  fontWeight: 500,
  color: C.txtBright,
  marginBottom: "6px",
  display: "block",
};

// ── Country codes list ─────────────────────────────────────────────────────
const countries = [
  { name: "UAE", code: "+971", flag: "🇦🇪" },
  { name: "USA", code: "+1", flag: "🇺🇸" },
  { name: "UK", code: "+44", flag: "🇬🇧" },
  { name: "India", code: "+91", flag: "🇮🇳" },
  { name: "Saudi Arabia", code: "+966", flag: "🇸🇦" },
  { name: "Qatar", code: "+974", flag: "🇶🇦" },
  { name: "Canada", code: "+1", flag: "🇨🇦" },
  { name: "Australia", code: "+61", flag: "🇦🇺" },
  { name: "Germany", code: "+49", flag: "🇩🇪" },
  { name: "France", code: "+33", flag: "🇫🇷" },
  { name: "Japan", code: "+81", flag: "🇯🇵" },
  { name: "Other", code: "Custom", flag: "🌐" },
];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", marginBottom: "8px" }}>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}


// ── Main UAE Page ─────────────────────────────────────────────────────────────
export default function UAEPage() {
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    company: "", 
    requirement: "",
    countryCode: "+971",
    customCode: ""
  });
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const isMobile = useMobile(900);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    // Prefetch global page assets
    if (typeof window !== "undefined") {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.href = "/gcc";
      document.head.appendChild(link);
    }
  }, []);


  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Strict Email Verification
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    const dialCode = form.countryCode === "Custom" ? form.customCode : form.countryCode;

    const { error: dbError } = await supabase
      .from("contact_submissions")
      .insert([{ 
        full_name: form.name, 
        email: form.email, 
        phone: `${dialCode} ${form.phone}`, 
        company_name: form.company,
        business_requirement: form.requirement,
        source_page: "gcc" 
      }]);

    setLoading(false);
    if (dbError) {
      setError("Something went wrong. Please try again.");
    } else {
      setSubmitted(true);
    }
  }

  return (
    <main style={{ minHeight: "100vh", fontFamily: F.inter, overflowX: "hidden", position: "relative" }}>
      <BeamsBackground>


      {/* ── PLUG AND PLAY SECTION ─────────────────────────────────────────── */}
      <section id="hero-plug-play" className="hero-section">
        <style jsx>{`
          .hero-section {
            padding: 80px 32px 60px;
            position: relative;
          }
          .plug-play-grid {
            max-width: 1200px;
            margin-left: auto;
            margin-right: auto;
            display: flex;
            flex-direction: row;
            gap: 48px;
            align-items: center;
          }
          .plug-play-left {
            flex: 1.2;
            width: auto;
            order: 1;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 40px;
          }
          .hero-title-accent {
            font-family: ${F.accent};
            font-style: italic;
            font-size: clamp(42px, 5.8vw, 82px);
            font-weight: 400;
            color: ${C.green};
            line-height: 1.1;
            margin-bottom: 12px;
            letter-spacing: -0.02em;
          }
          .hero-subtitle {
            font-family: ${F.inter};
            font-size: clamp(24px, 3.2vw, 38px);
            font-weight: 700;
            color: ${C.txtBright};
            margin-bottom: 20px;
          }
          .hero-desc {
            font-family: ${F.inter};
            font-size: 18px;
            font-weight: 500;
            color: ${C.txtBody};
            margin-bottom: 24px;
            line-height: 1.6;
            max-width: 600px;
          }
          .bullet-list {
            display: flex; 
            flex-direction: column; 
            gap: 14px;
            align-items: flex-start;
            max-width: 480px;
            margin-left: auto;
            margin-right: auto;
          }
          .bullet-text {
            font-family: ${F.inter};
            font-size: 17px;
            color: ${C.txtBody};
            line-height: 1.5;
            margin: 0;
          }
          .plug-play-right {
            flex: 1;
            width: auto;
            order: 2;
            margin-top: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .form-card {
            background: var(--color-bg-card);
            border: 1px solid var(--color-green);
            border-radius: 20px;
            padding: 32px;
            width: 100%;
            max-width: 520px;
            box-sizing: border-box;
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            position: relative;
            z-index: 1;
            box-shadow: var(--shadow-md);
          }
          .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }
          .phone-row {
            display: grid;
            grid-template-columns: 1fr 1.5fr;
            gap: 12px;
          }
          .phone-input-col {
            margin-top: 18px;
          }
          @media (max-width: 900px) {
            .hero-section {
              padding: 120px 16px 40px !important;
            }
            .plug-play-grid {
              flex-direction: column !important;
              gap: 24px !important;
            }
            .plug-play-left {
              flex: none !important;
              width: 100% !important;
              padding-top: 20px !important;
            }
            .hero-title-accent {
              font-size: clamp(34px, 10vw, 48px) !important;
              line-height: 1.1 !important;
            }
            .hero-subtitle {
              font-size: clamp(22px, 6vw, 28px) !important;
              line-height: 1.2 !important;
            }
            .hero-desc {
              font-size: 16px !important;
              line-height: 1.5 !important;
              max-width: 100% !important;
            }
            .bullet-list {
              margin-left: 0 !important;
              margin-right: 0 !important;
              width: 100% !important;
            }
            .bullet-text {
              font-size: 14px !important;
            }
            .plug-play-right {
              flex: none !important;
              width: 100% !important;
              margin-top: 24px !important;
            }
            .form-card {
              padding: 24px !important;
              backdrop-filter: blur(12px) !important;
              -webkit-backdrop-filter: blur(12px) !important;
              box-shadow: 0 10px 30px rgba(0,0,0,0.3) !important;
            }
            .form-row, .phone-row {
              grid-template-columns: 1fr !important;
            }
            .phone-input-col {
              margin-top: 0 !important;
            }
          }
          .submit-btn {
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
          }
          @media (max-width: 900px) {
            .submit-btn {
              backdrop-filter: none !important;
              -webkit-backdrop-filter: none !important;
            }
          }
        `}</style>
        <div className="plug-play-grid">
          {/* Left: headline + bullets */}
          <motion.div
            className="plug-play-left"
            initial={{ opacity: 0, x: isMobile ? 0 : -30, y: isMobile ? 20 : 0 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: isMobile ? 0.45 : 0.55 }}
            style={{ transform: "translate3d(0,0,0)", willChange: "transform, opacity" }}
          >

            {/* ... Content remains as refactored ... */}
            <h2 className="hero-title-accent">
              Plug - and - Play Pods
            </h2>
            <h3 className="hero-subtitle">
              for Growing Businesses.
            </h3>
            <p className="hero-desc">
              Automated Workflows That Accelerate Sales, Hiring &amp; Operations
            </p>

            {/* Bullet list */}
            <div className="bullet-list">
              {[
                "Source, screen & schedule top talent on autopilot.",
                "Deliver 24/7 customer care without scaling headcount.",
                "Convert leads into booked customers with AI-powered outreach.",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "14px", alignItems: "flex-start", textAlign: "left" }}>
                  <ChevronRight
                    style={{ width: "18px", height: "18px", color: C.green, flexShrink: 0, marginTop: "4px" }}
                  />
                  <p className="bullet-text">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            {/* Download button */}
            <div style={{ marginTop: "40px", display: "flex", justifyContent: "center" }}>
              <div style={{ position: "relative", display: "inline-block" }}>
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -10px)",
                    width: "340px",
                    height: "120px",
                    background: resolvedTheme === 'dark' 
                      ? "radial-gradient(ellipse at center, rgba(var(--color-green-rgb), 0.1) 0%, transparent 65%)"
                      : "radial-gradient(ellipse at center, rgba(var(--color-green-rgb), 0.05) 0%, transparent 65%)",
                    pointerEvents: "none",
                    zIndex: 0,
                  }}
                />
                <button
                  onClick={(e) => { e.preventDefault(); setIsDownloadModalOpen(true); }}
                  style={{
                    position: "relative",
                    zIndex: 1,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    fontFamily: F.inter,
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#000",
                    background: C.green,
                    border: "none",
                    borderRadius: "12px",
                    padding: "14px 36px",
                    cursor: "pointer",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    overflow: "hidden",
                    minWidth: "240px",
                    justifyContent: "center",
                    whiteSpace: "nowrap",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 20px rgba(var(--color-green-rgb), 0.3)"

                  }}

                >
                  <Download style={{ width: "14px", height: "14px", position: "relative", zIndex: 2, color: "#000" }} />

                  <span style={{ position: "relative", zIndex: 2 }}>Download the Feature Guide</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right: stat + form — always below left text on mobile */}
          <motion.div
            className="plug-play-right"
            initial={{ opacity: 0, x: isMobile ? 0 : 30, y: isMobile ? 20 : 0 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: isMobile ? 0.45 : 0.55, delay: isMobile ? 0 : 0.1 }}
            style={{ transform: "translate3d(0,0,0)", willChange: "transform, opacity" }}
          >

            {/* Stat headline */}
            <div style={{ marginBottom: "20px", textAlign: "center" }}>
              <p
                style={{
                  fontFamily: F.inter,
                  fontSize: "15px",
                  fontWeight: 700,
                  color: C.txtBright,
                  lineHeight: 1.4,
                  marginBottom: "4px",
                }}
              >
                Improve Workflow{" "}
                <em style={{ fontFamily: F.accent, fontStyle: "italic", color: C.green }}>Efficiency by</em>
              </p>
              <p
                style={{
                  fontFamily: F.inter,
                  fontSize: "22px",
                  fontWeight: 800,
                  color: C.txtBright,
                  lineHeight: 1.3,
                }}
              >
                <span style={{ fontFamily: F.serif, fontStyle: "italic", color: C.green }}>30%</span>{" "}
                and Eliminate Bottlenecks
              </p>
            </div>

            {/* Form card */}
            <div className="form-card">
              {submitted ? (
                <div style={{ textAlign: "center", padding: "32px 0" }}>
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "50%",
                      background: "rgba(172,215,145,0.1)",
                      border: "1px solid rgba(172,215,145,0.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: "auto",
                      marginRight: "auto",
                      marginBottom: "20px",
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <h3 style={{ fontFamily: F.inter, fontSize: "18px", color: C.txtBright, marginBottom: "8px" }}>
                    Request Received!
                  </h3>
                  <p style={{ fontFamily: F.inter, fontSize: "14px", color: C.txtMuted }}>
                    We'll reach out within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <Field label="Full Name">
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter Name"
                        style={inputStyle}
                        required
                      />
                    </Field>
                    <Field label="Work Email">
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Work Email"
                        style={inputStyle}
                        required
                      />
                    </Field>
                  </div>

                  <div className="phone-row">
                    <Field label="Phone Number">
                      <div style={{ position: "relative" }}>
                        <button
                          type="button"
                          onClick={() => setShowCountryPicker(!showCountryPicker)}
                          style={{
                            ...inputStyle,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "4px",
                            cursor: "pointer",
                          }}
                        >
                          <span style={{ fontSize: "14px" }}>
                            {countries.find(c => c.code === form.countryCode)?.flag || "🌐"}
                          </span>
                          <span style={{ fontSize: "12px", color: C.txtBright }}>
                            {form.countryCode === "Custom" ? "..." : form.countryCode}
                          </span>
                          <ChevronDown size={12} style={{ opacity: 0.5 }} />
                        </button>

                        <AnimatePresence>
                          {showCountryPicker && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              style={{
                                position: "absolute",
                                top: "100%",
                                left: 0,
                                marginTop: "4px",
                                background: "var(--color-bg-card)",
                                border: `1px solid ${C.border}`,
                                borderRadius: "10px",
                                width: "180px",
                                maxHeight: "150px",
                                overflowY: "auto",
                                zIndex: 100,
                                padding: "4px",
                                boxShadow: "var(--shadow-md)",
                                backdropFilter: "blur(12px)",
                              }}
                            >
                              {countries.map((c, idx) => (
                                <div
                                  key={idx}
                                  onClick={() => {
                                    setForm(prev => ({ ...prev, countryCode: c.code }));
                                    setShowCountryPicker(false);
                                  }}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    padding: "6px 10px",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    background: form.countryCode === c.code ? "rgba(255,255,255,0.05)" : "transparent",
                                  }}
                                >
                                  <span style={{ fontSize: "14px" }}>{c.flag}</span>
                                  <span style={{ fontSize: "12px", color: C.txtBright }}>{c.name}</span>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </Field>
                    <div className="phone-input-col">
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        style={inputStyle}
                        required
                      />
                    </div>
                  </div>

                  <Field label="Company Name">
                    <input
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Company Name"
                      style={inputStyle}
                      required
                    />
                  </Field>

                  <Field label="Business Requirement">
                    <textarea
                      name="requirement"
                      value={form.requirement}
                      onChange={handleChange}
                      placeholder="Tell us about your automation needs..."
                      rows={2}
                      style={{ ...inputStyle, resize: "none", minHeight: "50px" }}
                    />
                  </Field>

                  {error && (
                    <p style={{
                      fontFamily: F.inter, fontSize: "12px",
                      color: "#F87171", marginBottom: "8px",
                      padding: "8px 12px",
                      background: "rgba(248,113,113,0.08)",
                      border: "1px solid rgba(248,113,113,0.2)",
                      borderRadius: "8px",
                    }}>
                      {error}
                    </p>
                  )}

                  {/* Submit Button with lamp glow (matching contact page) */}
                  <div style={{ position: "relative", marginTop: "12px" }}>
                    <div style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -6px)",
                      width: "80%",
                      height: "40px",
                      background: resolvedTheme === 'dark' 
                        ? "radial-gradient(ellipse at center, rgba(var(--color-green-rgb), 0.15) 0%, transparent 70%)"
                        : "radial-gradient(ellipse at center, rgba(var(--color-green-rgb), 0.05) 0%, transparent 70%)",
                      pointerEvents: "none",
                      zIndex: 0
                    }} />
                    <motion.button
                      type="submit"
                      disabled={loading}
                      initial="rest"
                      whileHover="hover"
                      animate="rest"
                      className="submit-btn"
                      style={{
                        position: "relative",
                        zIndex: 1,
                        width: "100%",
                        padding: "12px 24px",
                        background: "var(--color-green)",
                        border: "1px solid var(--color-green)",
                        borderRadius: "12px",
                        color: "#000",

                        fontSize: "14px",
                        fontWeight: 600,
                        cursor: loading ? "not-allowed" : "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        overflow: "hidden",
                        transition: "all 0.3s ease"
                      }}
                    >
                      <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0px -16px 30px -14px rgba(255,255,255,0.32)", pointerEvents: "none" }} />
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
                      {loading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <Loader2 size={16} />
                        </motion.div>
                      ) : null}
                      <span style={{ position: "relative", zIndex: 2 }}>
                        {loading ? "Booking..." : "Book AI Strategy Call"}
                      </span>
                    </motion.button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* Section floor light */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "1px",
            background: resolvedTheme === 'dark'
              ? "linear-gradient(90deg, transparent 15%, rgba(var(--color-text-bright-rgb), 0.3) 50%, transparent 85%)"
              : "linear-gradient(90deg, transparent 15%, rgba(var(--color-text-bright-rgb), 0.1) 50%, transparent 85%)",
            boxShadow: resolvedTheme === 'dark' 
              ? "0 -10px 36px 4px rgba(var(--color-text-bright-rgb), 0.07)"
              : "0 -10px 36px 4px rgba(var(--color-text-bright-rgb), 0.02)",
          }}
        />
      </section>


      {/* ── IMMERSIVE PRODUCT SHOWCASE SECTION ───────────────────────────── */}
      <ImmersiveFeatures />

      {/* ── SALES POD FLAGSHIP SHOWCASE ──────────────────────────────────── */}
      <SalesPodShowcase />

      {/* ── HR AUTOMATION / HIRING OS SHOWCASE ────────────────────────────── */}
      <HRShowcase />

      {/* ── OPERATIONS & SUPPORT COMMAND CENTER SHOWCASE ──────────────────── */}
      <OpsShowcase />

      {/* ── MARKETING AUTOMATION SHOWCASE ────────────────────────────────── */}
      <MarketingShowcase />

      {/* ── CUSTOM AI WORKFLOW SOLUTIONS SHOWCASE ────────────────────────── */}
      <CustomWorkflowShowcase />

      {/* ── BUSINESS OUTCOMES / IMPACT METRICS SHOWCASE ─────────────────── */}
      <ImpactShowcase />
      <WhyChooseShowcase />
      <ProcessShowcase />
      <CaseStudiesShowcase />
      <KnowledgeShowcase />
      <FinalCTASection />

      </BeamsBackground>
      <DownloadModal isOpen={isDownloadModalOpen} onClose={() => setIsDownloadModalOpen(false)} />
    </main>
  );
}

