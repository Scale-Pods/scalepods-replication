"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
  Phone,
  Clock,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Headphones,
  MessageCircle,
  Loader2,
  Users,
  HelpCircle,
  ArrowUpRight
} from "lucide-react";
import { submitLead } from "@/lib/leadService";
import { useCountryDetection } from "@/lib/country";

import { useMobile } from "@/lib/hooks";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BeamsBackground } from "@/components/ui/beams-background";
import { useTheme } from "@/components/providers/ThemeProvider";


// ── Design tokens (matching site) ──────────────────────────────────────────
const C = {
  bgPage: "var(--color-bg-page)",
  bgCard: "var(--color-bg-card)",
  bgInput: "var(--color-bg-input)",
  border: "var(--color-border)",
  borderHover: "var(--color-border)",
  blueMid: "var(--color-blue-mid)",
  blueBright: "var(--color-blue-mid)",
  green: "var(--color-green)",
  txtBright: "var(--color-text-bright)",
  txtBody: "var(--color-text-body)",
  txtMuted: "var(--color-text-muted)",
};
const F = {
  inter: "var(--font-inter), Inter, sans-serif",
  serif: "var(--font-instrument), 'Instrument Serif', Georgia, serif",
};

const faqData = [
  {
    q: "What types of processes can you automate?",
    a: "We specialize in automating repetitive workflows across operations, marketing, sales, and customer support using AI and custom logic.",
  },
  {
    q: "Do I need technical knowledge to use your service?",
    a: "Not at all. Our team handles the setup, integration, and optimization. You just focus on your goals — we'll automate the rest.",
  },
  {
    q: "Can you integrate with our existing tools?",
    a: "Yes! We support integrations with CRMs, project management tools, communication apps, and more — tailored to your stack.",
  },
  {
    q: "How long does implementation take?",
    a: "Most clients see their first automation live within 1–2 weeks, depending on complexity and the number of workflows.",
  },
  {
    q: "Is your AI secure and compliant?",
    a: "Absolutely. We use enterprise-grade security practices and ensure compliance with major data privacy standards like GDPR.",
  },
];

// ── Shared input style ──────────────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  width: "100%",
  background: C.bgInput,
  border: `1px solid ${C.border}`,
  borderRadius: "10px",
  padding: "6px 12px",
  fontFamily: F.inter,
  fontSize: "13px",
  color: C.txtBody,
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
};

const labelStyle: React.CSSProperties = {
  fontFamily: F.inter,
  fontSize: "12px",
  fontWeight: 500,
  color: C.txtBright,
  marginBottom: "4px",
  display: "block",
};

// ── Country codes list ─────────────────────────────────────────────────────
// ── Country codes list (Alphabetical) ──────────────────────────────────────
const countries = [
  { name: "Afghanistan", code: "+93", flag: "🇦🇫" },
  { name: "Albania", code: "+355", flag: "🇦🇱" },
  { name: "Algeria", code: "+213", flag: "🇩🇿" },
  { name: "Andorra", code: "+376", flag: "🇦🇩" },
  { name: "Angola", code: "+244", flag: "🇦🇴" },
  { name: "Argentina", code: "+54", flag: "🇦🇷" },
  { name: "Australia", code: "+61", flag: "🇦🇺" },
  { name: "Austria", code: "+43", flag: "🇦🇹" },
  { name: "Bahrain", code: "+973", flag: "🇧🇭" },
  { name: "Bangladesh", code: "+880", flag: "🇧🇩" },
  { name: "Belgium", code: "+32", flag: "🇧🇪" },
  { name: "Brazil", code: "+55", flag: "🇧🇷" },
  { name: "Canada", code: "+1", flag: "🇨🇦" },
  { name: "China", code: "+86", flag: "🇨🇳" },
  { name: "Denmark", code: "+45", flag: "🇩🇰" },
  { name: "Egypt", code: "+20", flag: "🇪🇬" },
  { name: "France", code: "+33", flag: "🇫🇷" },
  { name: "Germany", code: "+49", flag: "🇩🇪" },
  { name: "Hong Kong", code: "+852", flag: "🇭🇰" },
  { name: "India", code: "+91", flag: "🇮🇳" },
  { name: "Indonesia", code: "+62", flag: "🇮🇩" },
  { name: "Ireland", code: "+353", flag: "🇮🇪" },
  { name: "Israel", code: "+972", flag: "🇮🇱" },
  { name: "Italy", code: "+39", flag: "🇮🇹" },
  { name: "Japan", code: "+81", flag: "🇯🇵" },
  { name: "Jordan", code: "+962", flag: "🇯🇴" },
  { name: "Kuwait", code: "+965", flag: "🇰🇼" },
  { name: "Lebanon", code: "+961", flag: "🇱🇧" },
  { name: "Malaysia", code: "+60", flag: "🇲🇾" },
  { name: "Mexico", code: "+52", flag: "🇲🇽" },
  { name: "Netherlands", code: "+31", flag: "🇳🇱" },
  { name: "New Zealand", code: "+64", flag: "🇳🇿" },
  { name: "Norway", code: "+47", flag: "🇳🇴" },
  { name: "Oman", code: "+968", flag: "🇴🇲" },
  { name: "Pakistan", code: "+92", flag: "🇵🇰" },
  { name: "Philippines", code: "+63", flag: "🇵🇭" },
  { name: "Portugal", code: "+351", flag: "🇵🇹" },
  { name: "Qatar", code: "+974", flag: "🇶🇦" },
  { name: "Russia", code: "+7", flag: "🇷🇺" },
  { name: "Saudi Arabia", code: "+966", flag: "🇸🇦" },
  { name: "Singapore", code: "+65", flag: "🇸🇬" },
  { name: "South Africa", code: "+27", flag: "🇿🇦" },
  { name: "South Korea", code: "+82", flag: "🇰🇷" },
  { name: "Spain", code: "+34", flag: "🇪🇸" },
  { name: "Sweden", code: "+46", flag: "🇸🇪" },
  { name: "Switzerland", code: "+41", flag: "🇨🇭" },
  { name: "Thailand", code: "+66", flag: "🇹🇭" },
  { name: "Turkey", code: "+90", flag: "🇹🇷" },
  { name: "UAE", code: "+971", flag: "🇦🇪" },
  { name: "UK", code: "+44", flag: "🇬🇧" },
  { name: "USA", code: "+1", flag: "🇺🇸" },
  { name: "Vietnam", code: "+84", flag: "🇻🇳" },
  { name: "Other / Custom", code: "Custom", flag: "🌐" },
];

// ── Lead sources list ──────────────────────────────────────────────────────
const sources = [
  "LLM (ChatGPT, Claude, etc)",
  "Google Search",
  "Instagram",
  "Facebook",
  "WhatsApp",
  "LinkedIn",
  "Friend / Family Member",
  "Workshop / Webinar",
  "Other"
];

// ── Field component ─────────────────────────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", marginBottom: "8px" }}>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}

// ── FAQ Accordion ───────────────────────────────────────────────────────────
function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {faqData.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            style={{
              background: isOpen ? "var(--color-bg-card-alt)" : "var(--color-bg-card)",
              border: isOpen
                ? "1px solid var(--color-blue-mid)"
                : `1px solid var(--color-border)`,
              borderRadius: "12px",
              overflow: "hidden",
              transition: "all 0.3s ease",
            }}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                color: C.blueMid,
                fontFamily: F.inter,
                fontSize: "15px",
                fontWeight: isOpen ? 500 : 400,
                textAlign: "left",
              }}
            >
              <span>{item.q}</span>
              {isOpen ? (
                <ChevronUp style={{ width: "20px", height: "20px", opacity: 0.8, flexShrink: 0 }} />
              ) : (
                <ChevronDown style={{ width: "20px", height: "20px", opacity: 0.5, color: C.txtMuted, flexShrink: 0 }} />
              )}
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div
                    style={{
                      padding: "0 24px 24px",
                      color: C.txtMuted,
                      fontFamily: F.inter,
                      fontSize: "14px",
                      lineHeight: 1.7,
                    }}
                  >
                    {item.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

// ── Main Contact Page ───────────────────────────────────────────────────────
export default function ContactPage() {
  const isMobile = useMobile(768);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const [form, setForm] = useState({
    name: "", email: "", phone: "", source: "", message: "", countryCode: "+91", customCode: "", customSource: "", website: ""
  });
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [showSourcePicker, setShowSourcePicker] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useCountryDetection(
    countries,
    useCallback((code: string) => setForm(prev => ({ ...prev, countryCode: code })), []),
    useCallback((code: string) => setForm(prev => ({ ...prev, customCode: code })), [])
  );


  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Cooldown verification (30 seconds for contact_sales)
    const lastSubmit = localStorage.getItem("scalepods_cooldown_contact_sales");
    if (lastSubmit) {
      const timeDiff = Date.now() - parseInt(lastSubmit, 10);
      if (timeDiff < 30000) {
        setError("Please wait before submitting again.");
        setLoading(false);
        return;
      }
    }

    // Strict Email Verification
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    // Phone Verification
    const phoneDigits = form.phone.replace(/\D/g, "");
    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      setError("Please enter a valid phone number.");
      setLoading(false);
      return;
    }



    const dialCode = form.countryCode === "Custom" ? form.customCode : form.countryCode;
    const finalSource = form.source === "Other" ? form.customSource : form.source;

    const result = await submitLead({
      formType: "contact_sales",
      sourcePage: "/contact",
      name: form.name,
      email: form.email,
      phone: `${dialCode} ${form.phone}`,
      message: form.message,
      metadata: { leadSource: finalSource },
      website: form.website,
    });

    setLoading(false);

    if (!result.success) {
      setError(result.error || "Something went wrong. Please try again or email us directly.");
    } else {
      localStorage.setItem("scalepods_cooldown_contact_sales", Date.now().toString());
      setSubmitted(true);
      const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
      w.dataLayer = w.dataLayer || [];
      const gtmEvent = { event: "lead_form_success", event_id: result.eventId, form_type: "contact_sales", source_page: "/contact" };
      console.log("[GTM] lead_form_success →", gtmEvent);
      w.dataLayer.push(gtmEvent);
    }
  }

  return (
    <main style={{ background: C.bgPage, minHeight: "100vh" }}>
      <BeamsBackground>

        {/* ── CONTACT SECTION ─────────────────────────────────────────────── */}
        <section style={{ padding: isMobile ? "64px 16px" : "100px 24px 48px", position: "relative" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", paddingLeft: isMobile ? "0" : "60px" }}>

            {/* Two-column layout */}
            <div className="contact-grid" style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1.3fr",
              gap: isMobile ? "40px" : "32px",
              alignItems: "start",
            }}>

              {/* ── Left column: Header + Contact cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div className="contact-header" style={{ textAlign: "left" }}>
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    padding: "6px 16px", borderRadius: "100px",
                    background: "rgba(0,128,255,0.07)", border: "1px solid rgba(0,128,255,0.2)",
                    marginBottom: "16px",
                  }}>
                    <MessageCircle style={{ width: "12px", height: "12px", color: C.blueBright }} />
                    <span style={{ fontFamily: F.inter, fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", color: C.txtBright }}>
                      CONTACT
                    </span>
                  </div>

                  <h1 style={{
                    fontFamily: F.inter, fontSize: "clamp(24px, 3vw, 36px)",
                    fontWeight: 600, color: C.txtBright, lineHeight: 1.15, marginBottom: "12px",
                  }}>
                    Reach Us{" "}
                    <em style={{ fontFamily: F.serif, fontStyle: "italic", fontWeight: 400, color: C.txtMuted }}>
                      Anytime
                    </em>
                  </h1>
                  <p style={{ fontFamily: F.inter, fontSize: "14px", color: C.txtMuted, lineHeight: 1.5 }}>
                    Have questions or need help? We&apos;re here for you
                  </p>
                </div>

                {/* Email Us card */}
                <div style={{
                  background: "var(--color-bg-card)",
                  border: "1px solid var(--color-green)",
                  borderRadius: "16px",
                  padding: "22px",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "12px" }}>
                    <div style={{
                      width: "36px", height: "36px", borderRadius: "10px",
                      background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`,
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      <Mail style={{ width: "18px", height: "18px", color: C.txtBright }} />
                    </div>
                    <h3 style={{ fontFamily: F.inter, fontSize: "16px", fontWeight: 600, color: C.txtBright, margin: 0 }}>
                      Email Us
                    </h3>
                  </div>
                  <p style={{ fontFamily: F.inter, fontSize: "13px", color: C.txtMuted, lineHeight: 1.5, marginBottom: "12px" }}>
                    Facing technical challenges or product concerns? We&apos;re here to assist
                  </p>
                  <a
                    href="mailto:info@scalepods.co"
                    style={{
                      fontFamily: F.inter, fontSize: "13px", color: C.txtBody,
                      textDecoration: "underline", textUnderlineOffset: "3px",
                    }}
                  >
                    info@scalepods.co
                  </a>
                </div>

                {/* Contact Sales card */}
                <div style={{
                  background: "var(--color-bg-card)",
                  border: "1px solid var(--color-green)",
                  borderRadius: "16px",
                  padding: "22px",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "12px" }}>
                    <div style={{
                      width: "36px", height: "36px", borderRadius: "10px",
                      background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`,
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      <Users style={{ width: "18px", height: "18px", color: C.txtBright }} />
                    </div>
                    <h3 style={{ fontFamily: F.inter, fontSize: "16px", fontWeight: 600, color: C.txtBright, margin: 0 }}>
                      Contact Sales
                    </h3>
                  </div>
                  <p style={{ fontFamily: F.inter, fontSize: "13px", color: C.txtMuted, lineHeight: 1.5, marginBottom: "12px" }}>
                    Let&apos;s collaborate on custom solutions or discuss product insights
                  </p>
                  <a
                    href="https://wa.me/919867271848?text=Hi%20ScalePods!%20I'm%20interested%20in%20discussing%20custom%20workflow%20automation%20solutions%20for%20my%20business."
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: F.inter, fontSize: "13px", color: C.txtBody,
                      textDecoration: "underline", textUnderlineOffset: "3px",
                    }}
                  >
                    Talk to our Sales team
                  </a>
                </div>
              </div>

              {/* ── Right column: Contact form card */}
              <div style={{
                background: "var(--color-bg-card)",
                border: "1px solid var(--color-green)",
                borderRadius: "16px",
                padding: "16px",
                maxWidth: "540px",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}>
                {/* Form header */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "12px" }}>
                  <div style={{
                    width: "40px", height: "40px", borderRadius: "12px",
                    background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`,
                    display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px",
                  }}>
                    <Headphones style={{ width: "16px", height: "18px", color: C.txtBright }} />
                  </div>
                  <h2 style={{ fontFamily: F.inter, fontSize: "14px", fontWeight: 600, color: C.txtBright, margin: 0 }}>
                    We&apos;d love to help! Let us know how
                  </h2>
                </div>

                {submitted ? (
                  <div id="lead-form-success" style={{ textAlign: "center", padding: "40px 0" }}>
                    <div style={{
                      width: "56px", height: "56px", borderRadius: "50%",
                      background: "rgba(172,215,145,0.1)", border: "1px solid rgba(172,215,145,0.2)",
                      display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px",
                    }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <h3 style={{ fontFamily: F.inter, fontSize: "18px", color: C.txtBright, marginBottom: "8px" }}>
                      Message Sent!
                    </h3>
                    <p style={{ fontFamily: F.inter, fontSize: "14px", color: C.txtMuted }}>
                      We&apos;ll get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <Field label="Full Name">
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter your Name"
                        style={inputStyle}
                        required
                      />
                    </Field>

                    <Field label="Email Address">
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="info@scalepods.co"
                        style={inputStyle}
                        required
                      />
                    </Field>

                    <Field label="Phone Number">
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <div style={{ display: "flex", gap: "8px", position: "relative" }}>
                          {/* Country Code Picker */}
                          <div style={{ position: "relative" }}>
                            <button
                              type="button"
                              onClick={() => setShowCountryPicker(!showCountryPicker)}
                              style={{
                                ...inputStyle,
                                width: "auto",
                                minWidth: "95px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: "6px",
                                cursor: "pointer",
                                padding: "6px 12px",
                              }}
                            >
                              <span style={{ fontSize: "16px" }}>
                                {countries.find(c => c.code === form.countryCode)?.flag || "🌐"}
                              </span>
                              <span style={{ fontSize: "13px", color: C.txtBright }}>
                                {form.countryCode === "Custom" ? "Custom" : form.countryCode}
                              </span>
                              <ChevronDown size={14} style={{ opacity: 0.5 }} />
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
                                    background: C.bgInput,
                                    border: `1px solid ${C.border}`,
                                    borderRadius: "10px",
                                    width: "220px",
                                    maxHeight: "180px",
                                    overflowY: "auto",
                                    zIndex: 100,
                                    padding: "6px",
                                    boxShadow: "0 10px 25px -5px rgba(0,0,0,0.5)",
                                    WebkitBackdropFilter: "blur(12px)",
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
                                        gap: "10px",
                                        padding: "8px 12px",
                                        borderRadius: "6px",
                                        cursor: "pointer",
                                        transition: "background 0.2s",
                                        background: form.countryCode === c.code ? "rgba(255,255,255,0.05)" : "transparent",
                                      }}
                                      onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                                      onMouseLeave={(e) => e.currentTarget.style.background = form.countryCode === c.code ? "rgba(255,255,255,0.05)" : "transparent"}
                                    >
                                      <span style={{ fontSize: "18px" }}>{c.flag}</span>
                                      <div style={{ display: "flex", flexDirection: "column" }}>
                                        <span style={{ fontSize: "13px", color: C.txtBright }}>{c.name}</span>
                                        {c.code !== "Custom" && <span style={{ fontSize: "11px", color: C.txtMuted }}>{c.code}</span>}
                                      </div>
                                    </div>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                          {form.countryCode === "Custom" ? (
                            <input
                              name="customCode"
                              value={form.customCode}
                              onChange={handleChange}
                              placeholder="+123"
                              style={{ ...inputStyle, width: "80px" }}
                              required
                            />
                          ) : null}

                          <input
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="Enter contact number"
                            style={{ ...inputStyle, flex: 1, minWidth: 0 }}
                            required
                          />
                        </div>
                      </div>
                    </Field>

                    <Field label="Where did you hear about us?">
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <div style={{ position: "relative" }}>
                          <button
                            type="button"
                            onClick={() => setShowSourcePicker(!showSourcePicker)}
                            style={{
                              ...inputStyle,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              cursor: "pointer",
                            }}
                          >
                            <span style={{ color: form.source ? C.txtBright : C.txtMuted }}>
                              {form.source || "Select an option"}
                            </span>
                            <ChevronDown size={14} style={{ opacity: 0.5 }} />
                          </button>

                          <AnimatePresence>
                            {showSourcePicker && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                style={{
                                  position: "absolute",
                                  top: "100%",
                                  left: 0,
                                  right: 0,
                                  marginTop: "4px",
                                  background: C.bgInput,
                                  border: `1px solid ${C.border}`,
                                  borderRadius: "10px",
                                  maxHeight: "180px",
                                  overflowY: "auto",
                                  zIndex: 100,
                                  padding: "6px",
                                  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.5)",
                                  WebkitBackdropFilter: "blur(12px)",
                                  backdropFilter: "blur(12px)",
                                }}
                              >
                                {sources.map((s, idx) => (
                                  <div
                                    key={idx}
                                    onClick={() => {
                                      setForm(prev => ({ ...prev, source: s }));
                                      setShowSourcePicker(false);
                                    }}
                                    style={{
                                      padding: "10px 14px",
                                      borderRadius: "6px",
                                      cursor: "pointer",
                                      fontSize: "13px",
                                      color: form.source === s ? C.txtBright : C.txtBody,
                                      background: form.source === s ? "rgba(255,255,255,0.05)" : "transparent",
                                      transition: "background 0.2s",
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                                    onMouseLeave={(e) => e.currentTarget.style.background = form.source === s ? "rgba(255,255,255,0.05)" : "transparent"}
                                  >
                                    {s}
                                  </div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {form.source === "Other" && (
                          <input
                            name="customSource"
                            value={form.customSource}
                            onChange={handleChange}
                            placeholder="Please specify..."
                            style={inputStyle}
                            required
                          />
                        )}
                      </div>
                    </Field>

                    <Field label="How may we assist you?">
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Give us more info.."
                        rows={3}
                        style={{ ...inputStyle, resize: "vertical", minHeight: "60px" }}
                      />
                    </Field>

                    {/* Honeypot field (hidden from humans) */}
                    <div style={{ display: "none", position: "absolute", left: "-9999px", top: "-9999px" }} aria-hidden="true">
                      <input
                        type="text"
                        name="website"
                        value={form.website || ""}
                        onChange={handleChange}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>



                    {/* Error message — min-height reserved to prevent CTA shift */}
                    <div style={{ minHeight: "44px", marginBottom: "4px" }}>
                      {error && (
                        <p style={{
                          fontFamily: F.inter, fontSize: "13px",
                          color: "#F87171", margin: 0,
                          padding: "10px 14px",
                          background: "rgba(248,113,113,0.08)",
                          border: "1px solid rgba(248,113,113,0.2)",
                          borderRadius: "8px",
                        }}>
                          {error}
                        </p>
                      )}
                    </div>

                    {/* Submit Button — fixed height, opacity communicates state */}
                    <div style={{ position: "relative", marginTop: "8px" }}>
                      <button
                        type="submit"
                        disabled={loading}
                        style={{
                          position: "relative",
                          zIndex: 1,
                          width: "100%",
                          // Fixed height so button never shifts during loading
                          height: "52px",
                          padding: "0 36px",
                          background: isDark
                            ? "linear-gradient(135deg, #050816 0%, #0b1020 100%)"
                            : "linear-gradient(135deg, #B1D997 0%, #C5E4B2 50%, #D8EFCC 100%)",
                          color: isDark ? "#B1D997" : "#0f172a",
                          backdropFilter: isDark ? "blur(12px)" : "none",
                          WebkitBackdropFilter: isDark ? "blur(12px)" : "none",
                          border: isDark
                            ? "1px solid rgba(177, 217, 151, 0.4)"
                            : "1px solid rgba(177, 217, 151, 0.3)",
                          borderRadius: "12px",
                          fontSize: "15px",
                          fontWeight: 700,
                          cursor: loading ? "not-allowed" : "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                          opacity: loading ? 0.75 : 1,
                          boxShadow: isDark
                            ? "0 8px 24px -4px rgba(0, 0, 0, 0.6), 0 0 15px rgba(177, 217, 151, 0.15)"
                            : "0 10px 20px -5px rgba(177, 217, 151, 0.25), inset 0 1px 0 rgba(255,255,255,0.4)",
                          transition: "opacity 0.2s ease, box-shadow 0.3s ease",
                        }}
                      >
                        {/* Spinner — always rendered, visible only during loading */}
                        <span style={{
                          display: "inline-flex",
                          width: "16px",
                          height: "16px",
                          flexShrink: 0,
                          opacity: loading ? 1 : 0,
                          transition: "opacity 0.2s ease",
                          position: "absolute",
                          left: "calc(50% - 54px)",
                        }}>
                          <Loader2 size={16} style={{ animation: loading ? "spin 0.75s linear infinite" : "none" }} />
                        </span>
                        <span style={{ transition: "opacity 0.2s ease", opacity: loading ? 0.7 : 1 }}>
                          {loading ? "Sending…" : "Send Message"}
                        </span>
                        <Send style={{
                          width: "16px", height: "16px", flexShrink: 0,
                          opacity: loading ? 0 : 1,
                          transition: "opacity 0.2s ease",
                        }} />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Contact section floor light */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "1px",
            background: "linear-gradient(90deg, transparent 15%, rgba(255,255,255,0.35) 50%, transparent 85%)",
            boxShadow: "0 -8px 30px 4px rgba(255,255,255,0.08)",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", bottom: 0, left: "20%", right: "20%", height: "80px",
            background: "radial-gradient(ellipse at bottom, rgba(255,255,255,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
        </section>

        {/* ── FAQ SECTION ─────────────────────────────────────────────────── */}
        <section style={{ padding: "96px 24px", position: "relative" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

            {/* FAQ Header */}
            <div style={{ textAlign: "center", marginBottom: "60px" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "6px 14px", borderRadius: "100px",
                background: "rgba(0,128,255,0.06)", border: "1px solid rgba(0,128,255,0.2)",
                marginBottom: "20px",
              }}>
                <MessageCircle style={{ width: "12px", height: "12px", color: C.blueBright }} />
                <span style={{ fontFamily: F.inter, fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: C.txtBright }}>
                  FAQ&apos;S
                </span>
              </div>

              <h2 style={{
                fontFamily: F.inter, fontSize: "clamp(28px, 3.5vw, 46px)",
                fontWeight: 600, color: C.txtBright, lineHeight: 1.2, marginBottom: "14px",
              }}>
                Frequently Asked{" "}
                <em style={{ fontFamily: F.serif, fontStyle: "italic", fontWeight: 400, color: C.txtMuted }}>
                  Questions
                </em>
              </h2>
              <p style={{ fontFamily: F.inter, fontSize: "15px", color: C.txtMuted }}>
                Find quick answers to the most common support questions
              </p>
            </div>

            {/* FAQ two-col layout */}
            <div style={{
              display: "flex", flexWrap: "wrap", gap: "32px",
              alignItems: "flex-start", justifyContent: "center",
            }}>

              {/* Left: Still Have Questions card */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                style={{
                  flex: "1 1 280px", maxWidth: "320px",
                  background: C.bgCard,
                  borderRadius: "20px", border: `1px solid ${C.border}`,
                  padding: "40px 28px",
                  display: "flex", flexDirection: "column",
                  alignItems: "center", textAlign: "center",
                }}
              >
                <div style={{
                  width: "48px", height: "48px", borderRadius: "12px",
                  background: "rgba(255,255,255,0.03)", border: `1px solid ${C.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px",
                }}>
                  <HelpCircle style={{ width: "22px", height: "22px", color: C.txtBright }} />
                </div>
                <h3 style={{ fontFamily: F.inter, fontSize: "19px", fontWeight: 600, color: C.txtBright, marginBottom: "12px" }}>
                  Still Have Questions?
                </h3>
                <p style={{ fontFamily: F.inter, fontSize: "14px", color: C.txtMuted, lineHeight: 1.65, marginBottom: "28px" }}>
                  Still have questions? Feel free to get in touch with us today!
                </p>

                {/* GlowingButton-style link */}
                <div style={{ position: "relative", display: "inline-block" }}>
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
                  <a
                    href="https://wa.me/917680974640?text=Hi%20ScalePods!%20I%20have%20a%20question%20about%20your%20workflow%20automation%20services."
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      position: "relative",
                      zIndex: 1,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                      fontFamily: F.inter,
                      fontSize: "14px",
                      fontWeight: 700,
                      letterSpacing: "-0.01em",
                      textDecoration: "none",
                      
                      // Theme Adaptive Colors
                      color: isDark ? "#B1D997" : "#0f172a",
                      
                      // Background Logic
                      background: isDark
                        ? "linear-gradient(135deg, #050816 0%, #0b1020 100%)"
                        : "linear-gradient(135deg, #B1D997 0%, #C5E4B2 50%, #D8EFCC 100%)",
                      
                      // Glass & Border
                      backdropFilter: isDark ? "blur(12px)" : "none",
                      WebkitBackdropFilter: isDark ? "blur(12px)" : "none",
                      border: isDark 
                        ? "1px solid rgba(177, 217, 151, 0.4)" 
                        : "1px solid rgba(177, 217, 151, 0.3)",
                      
                      borderRadius: "10px",
                      padding: "12px 28px",
                      cursor: "pointer",
                      
                      // Depth & Shadows
                      boxShadow: isDark 
                        ? "0 8px 24px -4px rgba(0, 0, 0, 0.6), 0 0 15px rgba(177, 217, 151, 0.15)" 
                        : "0 10px 20px -5px rgba(177, 217, 151, 0.25), inset 0 1px 0 rgba(255,255,255,0.4)",
                      
                      transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
                    }}
                  >
                    <ArrowUpRight style={{ width: "16px", height: "16px", position: "relative", zIndex: 2 }} />
                    <span style={{ position: "relative", zIndex: 2 }}>Ask A Question</span>
                  </a>
                </div>
              </motion.div>

              {/* Right: Accordion */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{ flex: "1 1 480px", maxWidth: "700px" }}
              >
                <FaqAccordion />
              </motion.div>
            </div>
          </div>

          {/* FAQ section floor light */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "1px",
            background: "linear-gradient(90deg, transparent 15%, rgba(255,255,255,0.35) 50%, transparent 85%)",
            boxShadow: "0 -8px 30px 4px rgba(255,255,255,0.08)",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", bottom: 0, left: "20%", right: "20%", height: "80px",
            background: "radial-gradient(ellipse at bottom, rgba(255,255,255,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
        </section>
      </BeamsBackground>
    </main>
  );
}
