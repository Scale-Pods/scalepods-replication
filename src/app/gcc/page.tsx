"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronRight, Download, Loader2, HelpCircle, ChevronDown, MessageCircle, ArrowUpRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import DownloadModal from "@/components/ui/DownloadModal";
import { useMobile } from "@/lib/hooks";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BeamsBackground } from "@/components/ui/beams-background";
import { ImmersiveFeatures } from "@/components/sections/ImmersiveFeatures";
import { SalesPodShowcase } from "@/components/sections/SalesPodShowcase";
import { HRShowcase } from "@/components/sections/HRShowcase";
import { OpsShowcase } from "@/components/sections/OpsShowcase";
import { MarketingShowcase } from "@/components/sections/MarketingShowcase";
import { CustomWorkflowShowcase } from "@/components/sections/CustomWorkflowShowcase";
import { ImpactShowcase } from "@/components/sections/ImpactShowcase";
import { WhyChooseShowcase } from "@/components/sections/WhyChooseShowcase";
import { ProcessShowcase } from "@/components/sections/ProcessShowcase";
import { CaseStudiesShowcase } from "@/components/sections/CaseStudiesShowcase";
import { KnowledgeShowcase } from "@/components/sections/KnowledgeShowcase";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
// import { StickyFeatureReveal } from "@/components/sections/StickyFeatureReveal"; // Retired for card-based layout

// ── Design tokens ─────────────────────────────────────────────────────────────
const C = {
  bgPage:    "#04070D",
  bgCard:    "#080A10",
  bgPanel:   "#0A0E14",
  bgInput:   "#0D1017",
  border:    "rgba(255,255,255,0.07)",
  borderMid: "rgba(255,255,255,0.12)",
  green:     "#ACD791",
  greenBright: "#8DC763",
  blue:      "#6DB6FF",
  txtBright: "#E4E9F2",
  txtBody:   "#B8C7D9",
  txtMuted:  "#D5DBE6",
};
const F = {
  inter: "Inter, sans-serif",
  serif: "Instrument Serif, Georgia, serif",
  accent: "Instrument Serif, serif",
};

// ── Glassmorphism tokens ──────────────────────────────────────────────────────
const G = {
  bg: "rgba(255, 255, 255, 0.015)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  blur: "blur(40px)",
};

// ── Shared input style (matching contact page) ────────────────────────────────
const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "#0D0F17",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: "10px",
  padding: "10px 14px",
  fontFamily: F.inter,
  fontSize: "14px",
  color: C.txtBody,
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
    <main style={{ minHeight: "100vh", fontFamily: F.inter }}>
      <BeamsBackground>


      {/* ── PLUG AND PLAY SECTION ─────────────────────────────────────────── */}
      <section style={{ padding: isMobile ? "80px 16px" : "80px 32px 60px", position: "relative" }}>
        <div
          className="plug-play-grid"
          style={{
            maxWidth: "1200px",
            marginLeft: "auto",
            marginRight: "auto",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "32px" : "48px",
            alignItems: "center",
          }}
        >
          {/* Left: headline + bullets */}
          <motion.div
            className="plug-play-left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            style={{
              flex: isMobile ? "none" : "1.2",
              width: isMobile ? "100%" : "auto",
              order: 1,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: isMobile ? "20px" : "40px",
            }}
          >
            <h2
              style={{
                fontFamily: F.accent,
                fontStyle: "italic",
                fontSize: isMobile ? "clamp(44px, 11vw, 64px)" : "clamp(42px, 5.8vw, 82px)",
                fontWeight: 400,
                color: C.green,
                lineHeight: 1,
                marginBottom: "16px",
                letterSpacing: "-0.02em"
              }}
            >
              Plug - and - Play Pods
            </h2>
            <h3
              style={{
                fontFamily: F.inter,
                fontSize: isMobile ? "clamp(26px, 6vw, 36px)" : "clamp(24px, 3.2vw, 38px)",
                fontWeight: 700,
                color: C.txtBright,
                marginBottom: "24px",
              }}
            >
              for Growing Businesses.
            </h3>
            <p
              style={{
                fontFamily: F.inter,
                fontSize: isMobile ? "18px" : "18px",
                fontWeight: 600,
                color: C.txtBody,
                marginBottom: "32px",
                lineHeight: 1.6,
                maxWidth: "600px",
              }}
            >
              Automated Workflows That Accelerate Sales, Hiring &amp; Operations
            </p>

            {/* Bullet list */}
            <div style={{ 
              display: "flex", 
              flexDirection: "column", 
              gap: isMobile ? "18px" : "14px",
              alignItems: "flex-start",
              maxWidth: "480px",
              marginLeft: "auto",
              marginRight: "auto",
            }}>
              {[
                "Source, screen & schedule top talent on autopilot.",
                "Deliver 24/7 customer care without scaling headcount.",
                "Convert leads into booked customers with AI-powered outreach.",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "14px", alignItems: "flex-start", textAlign: "left" }}>
                  <ChevronRight
                    style={{ width: isMobile ? "18px" : "18px", height: isMobile ? "18px" : "18px", color: C.green, flexShrink: 0, marginTop: "4px" }}
                  />
                  <p
                    style={{
                      fontFamily: F.inter,
                      fontSize: isMobile ? "17px" : "17px",
                      color: C.txtBody,
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
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
                    background: "radial-gradient(ellipse at center, rgba(172, 215, 145, 0.1) 0%, transparent 65%)",
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
                    fontSize: isMobile ? "13px" : "14px",
                    fontWeight: 600,
                    color: "#FFFFFF",
                    background: G.bg,
                    border: G.border,
                    borderRadius: "12px",
                    padding: isMobile ? "10px 24px" : "14px 36px",
                    cursor: "pointer",
                    backdropFilter: G.blur,
                    WebkitBackdropFilter: G.blur,
                    overflow: "hidden",
                    minWidth: isMobile ? "200px" : "240px",
                    justifyContent: "center",
                    whiteSpace: "nowrap",
                    transition: "all 0.3s ease"
                  }}
                >
                  <Download style={{ width: "14px", height: "14px", position: "relative", zIndex: 2, color: C.green }} />
                  <span style={{ position: "relative", zIndex: 2 }}>Download the Feature Guide</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right: stat + form — always below left text on mobile */}
          <motion.div
            className="plug-play-right"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            style={{
              flex: isMobile ? "none" : "1",
              width: isMobile ? "100%" : "auto",
              order: 2,
              marginTop: isMobile ? "8px" : "0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
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
            <div
              style={{
                background: "rgba(8, 10, 14, 0.65)",
                border: "1px solid rgba(172, 215, 145, 0.4)",
                borderRadius: "20px",
                padding: "32px",
                width: "100%",
                maxWidth: "520px",
                boxSizing: "border-box",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                position: "relative",
                zIndex: 1,
                boxShadow: "0 20px 60px rgba(0,0,0,0.4)"
              }}
            >
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
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
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

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "12px" }}>
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
                                background: "#0D0F17",
                                border: `1px solid ${C.border}`,
                                borderRadius: "10px",
                                width: "180px",
                                maxHeight: "150px",
                                overflowY: "auto",
                                zIndex: 100,
                                padding: "4px",
                                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.5)",
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
                    <div style={{ marginTop: "18px" }}>
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
                      background: "radial-gradient(ellipse at center, rgba(141, 199, 99, 0.15) 0%, transparent 70%)",
                      pointerEvents: "none",
                      zIndex: 0
                    }} />
                    <motion.button
                      type="submit"
                      disabled={loading}
                      initial="rest"
                      whileHover="hover"
                      animate="rest"
                      style={{
                        position: "relative",
                        zIndex: 1,
                        width: "100%",
                        padding: "12px 24px",
                        background: "rgba(8,10,16,0.85)",
                        border: "1px solid rgba(141, 199, 99, 0.5)",
                        borderRadius: "12px",
                        color: "#FFFFFF",
                        fontSize: "14px",
                        fontWeight: 600,
                        cursor: loading ? "not-allowed" : "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        backdropFilter: "blur(12px)",
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
            background: "linear-gradient(90deg, transparent 15%, rgba(255,255,255,0.3) 50%, transparent 85%)",
            boxShadow: "0 -10px 36px 4px rgba(255,255,255,0.07)",
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

