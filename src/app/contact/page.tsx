"use client";

import { useState } from "react";
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
import { supabase } from "@/lib/supabase";
import { useMobile } from "@/lib/hooks";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// ── Design tokens (matching site) ──────────────────────────────────────────
const C = {
  bgPage:  "#04070D",
  bgCard:  "#080A10",
  bgInput: "#0D0F17",
  border:  "rgba(255,255,255,0.07)",
  borderHover: "rgba(255,255,255,0.12)",
  blueMid: "#6DB6FF",
  blueBright: "#0080FF",
  green:   "#ACD791",
  txtBright: "#E4E9F2",
  txtBody:   "#B8C7D9",
  txtMuted:  "#636996",
};
const F = {
  inter: "Inter, sans-serif",
  serif: "Instrument Serif, Georgia, serif",
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
  padding: "12px 16px",
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
  marginBottom: "8px",
  display: "block",
};

// ── Field component ─────────────────────────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", marginBottom: "20px" }}>
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
              background: isOpen ? "rgba(13,15,23,0.5)" : C.bgCard,
              border: isOpen
                ? "1px solid rgba(109,182,255,0.15)"
                : `1px solid ${C.border}`,
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
  const [form, setForm] = useState({
    name: "", email: "", phone: "", source: "", message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: dbError } = await supabase
      .from("contact_submissions")
      .insert([
        {
          full_name: form.name,
          email:     form.email,
          phone:     form.phone,
          source:    form.source,
          message:   form.message,
        },
      ]);

    setLoading(false);

    if (dbError) {
      setError("Something went wrong. Please try again or email us directly.");
    } else {
      setSubmitted(true);
    }
  }

  return (
    <main style={{ background: C.bgPage, minHeight: "100vh" }}>

      <Navbar />

      {/* ── CONTACT SECTION ─────────────────────────────────────────────── */}
      <section style={{ padding: isMobile ? "80px 16px 64px" : "120px 24px 96px", position: "relative" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

            <div className="contact-header" style={{ textAlign: "center", marginBottom: "64px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "6px 16px", borderRadius: "100px",
              background: "rgba(0,128,255,0.07)", border: "1px solid rgba(0,128,255,0.2)",
              marginBottom: "24px",
            }}>
              <MessageCircle style={{ width: "12px", height: "12px", color: C.blueBright }} />
              <span style={{ fontFamily: F.inter, fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", color: C.txtBright }}>
                CONTACT
              </span>
            </div>

            <h1 style={{
              fontFamily: F.inter, fontSize: "clamp(34px, 4.5vw, 56px)",
              fontWeight: 600, color: C.txtBright, lineHeight: 1.15, marginBottom: "16px",
            }}>
              Reach Us{" "}
              <em style={{ fontFamily: F.serif, fontStyle: "italic", fontWeight: 400, color: C.txtMuted }}>
                Anytime
              </em>
            </h1>
            <p style={{ fontFamily: F.inter, fontSize: "16px", color: C.txtMuted }}>
              Have questions or need help? We&apos;re here for you
            </p>
          </div>

          {/* Two-column layout */}
          <div className="contact-grid" style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1.5fr",
            gap: isMobile ? "40px" : "24px",
            alignItems: "start",
          }}>

            {/* ── Left column: Contact cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

              {/* Email Us card */}
              <div style={{
                background: C.bgCard,
                border: `1px solid ${C.border}`,
                borderRadius: "16px",
                padding: "28px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
                  <div style={{
                    width: "44px", height: "44px", borderRadius: "10px",
                    background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`,
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <Mail style={{ width: "20px", height: "20px", color: C.txtBright }} />
                  </div>
                  <h3 style={{ fontFamily: F.inter, fontSize: "18px", fontWeight: 600, color: C.txtBright, margin: 0 }}>
                    Email Us
                  </h3>
                </div>
                <p style={{ fontFamily: F.inter, fontSize: "14px", color: C.txtMuted, lineHeight: 1.6, marginBottom: "16px" }}>
                  Facing technical challenges or product concerns? We&apos;re here to assist
                </p>
                <a
                  href="mailto:Info@scalepods.co"
                  style={{
                    fontFamily: F.inter, fontSize: "14px", color: C.txtBody,
                    textDecoration: "underline", textUnderlineOffset: "3px",
                  }}
                >
                  Info@scalepods.co
                </a>
              </div>

              {/* Contact Sales card */}
              <div style={{
                background: C.bgCard,
                border: `1px solid ${C.border}`,
                borderRadius: "16px",
                padding: "28px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
                  <div style={{
                    width: "44px", height: "44px", borderRadius: "10px",
                    background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`,
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <Users style={{ width: "20px", height: "20px", color: C.txtBright }} />
                  </div>
                  <h3 style={{ fontFamily: F.inter, fontSize: "18px", fontWeight: 600, color: C.txtBright, margin: 0 }}>
                    Contact Sales
                  </h3>
                </div>
                <p style={{ fontFamily: F.inter, fontSize: "14px", color: C.txtMuted, lineHeight: 1.6, marginBottom: "16px" }}>
                  Let&apos;s collaborate on custom solutions or discuss product insights
                </p>
                <a
                  href="https://calendly.com/scalepods"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: F.inter, fontSize: "14px", color: C.txtBody,
                    textDecoration: "underline", textUnderlineOffset: "3px",
                  }}
                >
                  Book a call
                </a>
              </div>
            </div>

            {/* ── Right column: Contact form card */}
            <div style={{
              background: C.bgCard,
              border: `1px solid ${C.border}`,
              borderRadius: "16px",
              padding: "36px",
            }}>
              {/* Form header */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "32px" }}>
                <div style={{
                  width: "48px", height: "48px", borderRadius: "12px",
                  background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px",
                }}>
                  <Headphones style={{ width: "22px", height: "22px", color: C.txtBright }} />
                </div>
                <h2 style={{ fontFamily: F.inter, fontSize: "18px", fontWeight: 600, color: C.txtBright, margin: 0 }}>
                  We&apos;d love to help! Let us know how
                </h2>
              </div>

              {submitted ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
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
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Enter your contact number"
                      style={inputStyle}
                    />
                  </Field>

                  <Field label="Where did you hear about us?">
                    <input
                      name="source"
                      value={form.source}
                      onChange={handleChange}
                      placeholder="Google, LinkedIn, Instagram, LLM etc"
                      style={inputStyle}
                    />
                  </Field>

                  <Field label="How may we assist you?">
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Give us more info.."
                      rows={4}
                      style={{ ...inputStyle, resize: "vertical", minHeight: "100px" }}
                    />
                  </Field>

                  {/* Error message */}
                  {error && (
                    <p style={{
                      fontFamily: F.inter, fontSize: "13px",
                      color: "#F87171", marginBottom: "12px",
                      padding: "10px 14px",
                      background: "rgba(248,113,113,0.08)",
                      border: "1px solid rgba(248,113,113,0.2)",
                      borderRadius: "8px",
                    }}>
                      {error}
                    </p>
                  )}

                  {/* Submit Button with lamp glow */}
                  <div style={{ position: "relative", marginTop: "8px" }}>
                    {/* Ambient lamp glow behind button */}
                    <div style={{
                      position: "absolute", top: "50%", left: "50%",
                      transform: "translate(-50%, -10px)",
                      width: "100%", height: "120px",
                      background: "radial-gradient(ellipse at center, rgba(255,255,255,0.1) 0%, transparent 65%)",
                      pointerEvents: "none", zIndex: 0,
                    }} />
                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        position: "relative", zIndex: 1,
                        width: "100%", padding: "14px 24px",
                        fontFamily: F.inter, fontSize: "15px", fontWeight: 600,
                        color: C.txtBright, background: C.bgInput,
                        border: `1px solid rgba(255,255,255,0.12)`,
                        borderRadius: "10px", cursor: loading ? "not-allowed" : "pointer",
                        overflow: "hidden", opacity: loading ? 0.7 : 1,
                        transition: "border-color 0.2s, opacity 0.2s",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                      }}
                      onMouseEnter={e => !loading && (e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)")}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
                    >
                      {/* Inset soft glow */}
                      <div style={{
                        position: "absolute", inset: 0,
                        boxShadow: "inset 0px -14px 28px -14px rgba(255,255,255,0.3)",
                        pointerEvents: "none",
                      }} />
                      {/* Bottom edge light line */}
                      <div style={{
                        position: "absolute", bottom: 0, left: "10%", right: "10%",
                        height: "1px", background: "rgba(255,255,255,0.8)",
                        pointerEvents: "none",
                      }} />
                      {loading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                          >
                            <Loader2 style={{ width: "16px", height: "16px", position: "relative", zIndex: 2 }} />
                          </motion.div>
                          <span style={{ position: "relative", zIndex: 2 }}>Submitting...</span>
                        </>
                      ) : (
                        <span style={{ position: "relative", zIndex: 2 }}>Book A Full Funnel Analysis</span>
                      )}
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
                <div style={{
                  position: "absolute", top: "50%", left: "50%",
                  transform: "translate(-50%, -10px)",
                  width: "240px", height: "120px",
                  background: "radial-gradient(ellipse at center, rgba(255,255,255,0.09) 0%, transparent 65%)",
                  zIndex: 0, pointerEvents: "none",
                }} />
                <a
                  href="mailto:Info@scalepods.co"
                  style={{
                    position: "relative", zIndex: 1,
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    fontFamily: F.inter, fontSize: "14px", fontWeight: 600, color: C.green,
                    background: C.bgInput, border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "10px", padding: "11px 24px",
                    textDecoration: "none", overflow: "hidden",
                  }}
                >
                  <div style={{
                    position: "absolute", inset: 0,
                    boxShadow: "inset 0px -12px 24px -12px rgba(255,255,255,0.3)",
                    pointerEvents: "none",
                  }} />
                  <div style={{
                    position: "absolute", bottom: 0, left: "10%", right: "10%",
                    height: "1px", background: "rgba(255,255,255,0.75)",
                  }} />
                  <ArrowUpRight style={{ width: "14px", height: "14px", position: "relative", zIndex: 2 }} />
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

    </main>
  );
}
