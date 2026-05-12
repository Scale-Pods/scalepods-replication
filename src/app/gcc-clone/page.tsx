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
import { ImmersiveFeatures } from "@/components/sections-clone/ImmersiveFeatures";
import { SalesPodShowcase } from "@/components/sections-clone/SalesPodShowcase";
import { HRShowcase } from "@/components/sections-clone/HRShowcase";
import { OpsShowcase } from "@/components/sections-clone/OpsShowcase";
import { MarketingShowcase } from "@/components/sections-clone/MarketingShowcase";
import { CustomWorkflowShowcase } from "@/components/sections-clone/CustomWorkflowShowcase";
import { ImpactShowcase } from "@/components/sections-clone/ImpactShowcase";
import { WhyChooseShowcase } from "@/components/sections-clone/WhyChooseShowcase";
import { ProcessShowcase } from "@/components/sections-clone/ProcessShowcase";
import { CaseStudiesShowcase } from "@/components/sections-clone/CaseStudiesShowcase";
import { KnowledgeShowcase } from "@/components/sections-clone/KnowledgeShowcase";
import { FinalCTASection } from "@/components/sections-clone/FinalCTASection";
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

// ── Input style ───────────────────────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "#08090C",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: "8px",
  padding: "14px 16px",
  fontFamily: F.inter,
  fontSize: "14px",
  color: C.txtBright,
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  fontFamily: F.inter,
  fontSize: "14px",
  fontWeight: 600,
  color: "#B8C7D9",
  marginBottom: "8px",
  display: "block",
};


// ── Main UAE Page ─────────────────────────────────────────────────────────────
export default function UAEPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const isMobile = useMobile(900);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
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

    const { error: dbError } = await supabase
      .from("contact_submissions")
      .insert([{ full_name: form.name, email: form.email, phone: form.phone, source: "UAE Page" }]);

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
      <section style={{ padding: isMobile ? "70px 16px" : "90px 32px", position: "relative" }}>
        <div
          className="plug-play-grid"
          style={{
            maxWidth: "1200px",
            marginLeft: "auto",
            marginRight: "auto",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "40px" : "60px",
            alignItems: "flex-start",
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
                fontSize: isMobile ? "clamp(44px, 11vw, 64px)" : "clamp(40px, 5.2vw, 68px)",
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
                fontSize: isMobile ? "clamp(24px, 5.5vw, 32px)" : "clamp(22px, 2.7vw, 30px)",
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
                fontSize: isMobile ? "18px" : "17px",
                fontWeight: 600,
                color: C.txtBody,
                marginBottom: "36px",
                lineHeight: 1.7,
                maxWidth: "600px",
              }}
            >
              Automated Workflows That Accelerate Sales, Hiring &amp; Operations
            </p>

            {/* Bullet list */}
            <div style={{ 
              display: "flex", 
              flexDirection: "column", 
              gap: isMobile ? "20px" : "16px",
              alignItems: "flex-start",
              maxWidth: "450px",
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
                    style={{ width: isMobile ? "18px" : "16px", height: isMobile ? "18px" : "16px", color: C.green, flexShrink: 0, marginTop: "3px" }}
                  />
                  <p
                    style={{
                      fontFamily: F.inter,
                      fontSize: isMobile ? "17px" : "16px",
                      color: C.txtBody,
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>

            {/* Download button moved here */}
            <div style={{ marginTop: "48px", display: "flex", justifyContent: "center" }}>
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
                    gap: "10px",
                    fontFamily: F.inter,
                    fontSize: isMobile ? "14px" : "15px",
                    fontWeight: 600,
                    color: "#FFFFFF",
                    background: G.bg,
                    border: G.border,
                    borderRadius: "14px",
                    padding: isMobile ? "12px 28px" : "16px 42px",
                    cursor: "pointer",
                    backdropFilter: G.blur,
                    WebkitBackdropFilter: G.blur,
                    overflow: "hidden",
                    minWidth: isMobile ? "220px" : "280px",
                    justifyContent: "center",
                    whiteSpace: "nowrap",
                    transition: "all 0.3s ease"
                  }}
                >
                  <Download style={{ width: "16px", height: "16px", position: "relative", zIndex: 2, color: C.green }} />
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
              marginTop: isMobile ? "8px" : "24px",
              marginLeft: isMobile ? "0" : "-40px",
              marginRight: isMobile ? "0" : "40px",
            }}
          >
            {/* Stat headline */}
            <div style={{ marginBottom: "20px", textAlign: "center" }}>
              <p
                style={{
                  fontFamily: F.inter,
                  fontSize: "clamp(15px, 1.8vw, 18px)",
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
                  fontSize: "clamp(17px, 2.2vw, 22px)",
                  fontWeight: 800,
                  color: C.txtBright,
                  lineHeight: 1.3,
                }}
              >
                <span style={{ fontFamily: F.serif, fontStyle: "italic", color: C.green }}>30%</span>{" "}
                and Eliminate Bottlenecks
              </p>
              <p style={{ fontFamily: F.inter, fontSize: "13px", color: C.txtMuted, marginTop: "6px" }}>
                By completing the form
              </p>
            </div>

            {/* Form card */}
            <div
              style={{
                background: G.bg,
                border: G.border,
                borderRadius: "24px",
                padding: "36px",
                width: "100%",
                maxWidth: "480px",
                marginLeft: "auto",
                marginRight: "auto",
                boxSizing: "border-box",
                backdropFilter: G.blur,
                WebkitBackdropFilter: G.blur,
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
                  {/* Full Name */}
                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: C.txtBright, marginBottom: "6px", fontFamily: F.inter }}>
                      Full Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="Alex Sollork"
                      value={form.name}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        background: C.bgInput,
                        border: `1px solid ${C.border}`,
                        borderRadius: "12px",
                        padding: "14px 16px",
                        color: "#FFFFFF",
                        fontFamily: F.inter,
                        fontSize: "15px",
                        outline: "none",
                      }}
                    />
                  </div>

                  {/* Email */}
                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: C.txtBright, marginBottom: "6px", fontFamily: F.inter }}>
                      Email Address
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="Alex@gmail.com"
                      value={form.email}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        background: C.bgInput,
                        border: `1px solid ${C.border}`,
                        borderRadius: "12px",
                        padding: "14px 16px",
                        color: "#FFFFFF",
                        fontFamily: F.inter,
                        fontSize: "15px",
                        outline: "none",
                      }}
                    />
                  </div>

                  {/* Phone */}
                  <div style={{ marginBottom: "24px" }}>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: C.txtBright, marginBottom: "6px", fontFamily: F.inter }}>
                      Phone Number
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      required
                      placeholder="Enter with Country Code"
                      value={form.phone}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        background: C.bgInput,
                        border: `1px solid ${C.border}`,
                        borderRadius: "12px",
                        padding: "14px 16px",
                        color: "#FFFFFF",
                        fontFamily: F.inter,
                        fontSize: "15px",
                        outline: "none",
                      }}
                    />
                  </div>

                  {error && (
                    <p
                      style={{
                        fontFamily: F.inter,
                        fontSize: "12px",
                        color: "#F87171",
                        marginBottom: "12px",
                        padding: "10px 14px",
                        background: "rgba(248,113,113,0.06)",
                        border: "1px solid rgba(248,113,113,0.15)",
                        borderRadius: "10px",
                      }}
                    >
                      {error}
                    </p>
                  )}

                  {/* Submit button */}
                  <div style={{ position: "relative", width: "100%" }}>
                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        position: "relative",
                        width: "100%",
                        padding: "16px 24px",
                        background: C.green,
                        border: "none",
                        borderRadius: "12px",
                        color: "#000",
                        fontFamily: F.inter,
                        fontSize: "15px",
                        fontWeight: 700,
                        cursor: loading ? "not-allowed" : "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        transition: "all 0.3s ease",
                        boxShadow: `0 8px 25px rgba(172, 215, 145, 0.2)`
                      }}
                    >
                      {loading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <Loader2
                            style={{ width: "16px", height: "16px", position: "relative", zIndex: 2 }}
                          />
                        </motion.div>
                      ) : null}
                      <span style={{ position: "relative", zIndex: 2 }}>
                        {loading ? "Submitting..." : "Book A Full Funnel Analysis"}
                      </span>
                    </button>
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

