"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Calendar,
  Monitor,
  Ticket,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Users,
  TrendingUp,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
  Briefcase,
  AlertTriangle,
  X,
  Lock,
  MessageSquare,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { BeamsBackground } from "@/components/ui/beams-background";
import "./webinar.css";

// Helper to reliably load Razorpay Checkout script dynamically
const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if ((window as any).Razorpay) return resolve(true);

    const existingScript = document.getElementById("razorpay-checkout-js");
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(true));
      existingScript.addEventListener("error", () => resolve(false));
      return;
    }

    const script = document.createElement("script");
    script.id = "razorpay-checkout-js";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function WebinarPage() {
  // Modal & Flow state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState<"form" | "confirmed">("form");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentSuccessData, setPaymentSuccessData] = useState<{
    bookingId: string;
    orderId: string;
  } | null>(null);

  // Accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Sticky bottom bar visibility
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowSticky(true);
      } else {
        setShowSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenModal = () => {
    setPaymentError(null);
    setModalStep("form");
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentError(null);
    setIsSubmitting(true);

    try {
      // 1. Ensure Razorpay checkout script is loaded
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded || !(window as any).Razorpay) {
        throw new Error(
          "Unable to load Razorpay payment gateway. Please check your network or ad-blocker and try again."
        );
      }

      // 2. Create order on the server
      const res = await fetch("/api/webinar/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const orderData = await res.json();
      if (!res.ok || !orderData.success) {
        throw new Error(orderData.error || "Failed to initialize payment order.");
      }

      // 3. Configure Razorpay checkout options
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "ScalePods",
        description: "AI Business Automation Live Webinar Pass",
        image: "https://scalepods.co/favicon.ico",
        order_id: orderData.orderId,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#0F1A12",
        },
        modal: {
          ondismiss: function () {
            setIsSubmitting(false);
          },
        },
        handler: async function (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) {
          setIsVerifying(true);
          try {
            const verifyRes = await fetch("/api/webinar/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...response,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                role: formData.role,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyRes.ok && verifyData.success) {
              setPaymentSuccessData({
                bookingId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
              });

              // Fire Client-Side Meta Pixel & GTM Purchase Conversion Event
              try {
                if (typeof window !== "undefined") {
                  (window as any).dataLayer = (window as any).dataLayer || [];
                  (window as any).dataLayer.push({
                    event: "purchase",
                    ecommerce: {
                      transaction_id: response.razorpay_payment_id,
                      value: 99.0,
                      currency: "INR",
                      items: [
                        {
                          item_name: "AI Business Automation Live Webinar Pass",
                          price: 99.0,
                          quantity: 1,
                        },
                      ],
                    },
                  });
                  (window as any).fbq?.(
                    "track",
                    "Purchase",
                    {
                      value: 99.0,
                      currency: "INR",
                      content_name: "AI Business Automation Live Webinar Pass",
                    },
                    { eventID: response.razorpay_payment_id }
                  );
                }
              } catch (trackingErr) {
                console.warn("[Tracking Notice]:", trackingErr);
              }

              setModalStep("confirmed");
            } else {
              setPaymentError(
                verifyData.error ||
                  "Payment signature verification failed. Please contact support."
              );
            }
          } catch (err: any) {
            setPaymentError(
              err?.message || "An error occurred while confirming payment."
            );
          } finally {
            setIsVerifying(false);
            setIsSubmitting(false);
          }
        },
      };

      const razorpayInstance = new (window as any).Razorpay(options);

      razorpayInstance.on("payment.failed", function (failResponse: any) {
        console.warn("Razorpay Payment Notice:", failResponse?.error);
        setPaymentError(
          failResponse?.error?.description ||
            "Payment failed or was cancelled. Please try again."
        );
        setIsSubmitting(false);
      });

      razorpayInstance.open();
    } catch (err: any) {
      console.error("Webinar registration error:", err);
      setPaymentError(
        err?.message || "Failed to initiate payment. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <BeamsBackground className="webinarpod-container" hues={[96, 210]} intensity="strong">
      {/* ScalePods Ambient Lighting Atmosphere */}
      <div className="wb-ambient-glow wb-ambient-hero" />
      <div className="wb-ambient-glow wb-ambient-mid" />
      <div className="wb-ambient-glow wb-ambient-bot" />

      {/* ── SCALEPODS CONVERSION HEADER ────────────────────────────────────── */}
      <header className="wb-navbar">
        <div className="wb-container wb-navbar-inner">
          {/* Official ScalePods Navbar Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <div className="wb-navbar-logo-wrap" style={{ position: "relative", width: "160px", height: "28px", flexShrink: 0 }}>
              <Image
                src="/scalepods-navbar-logo.png"
                alt="ScalePods"
                fill
                sizes="160px"
                priority
                loading="eager"
                style={{
                  objectFit: "contain",
                  objectPosition: "left center",
                  filter: "invert(1)",
                }}
              />
            </div>
          </Link>

          {/* Right Action Cluster */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div className="wb-nav-live-badge">
              <span className="wb-nav-pulse-dot" />
              <span>LIVE WORKSHOP</span>
            </div>
            <button
              onClick={handleOpenModal}
              className="wb-button-primary wb-button-nav wb-btn-pulse-glow"
            >
              <span>Join for ₹99</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* ── HERO SECTION ─────────────────────────────────────────────────── */}
      <section className="wb-section wb-section-hero">
        <div className="wb-container" style={{ textAlign: "center" }}>
          
          <div className="wb-hero-pill">
            <Sparkles size={13} className="wb-hero-pill-icon" />
            <span className="wb-hero-pill-text">
              <span className="wb-hero-pill-line1">A LIVE, PRACTICAL BUSINESS AUTOMATION WEBINAR</span>
              <span className="wb-hero-pill-break" />
              <span className="wb-hero-pill-line2"> WITH ADNAN SHAIKH — THE BRAIN BEHIND SCALEPODS</span>
            </span>
          </div>

          <h1 className="wb-hero-title">
            <span>YOUR BUSINESS DOESN’T NEED MORE PEOPLE.</span>{" "}
            <br className="hidden md:inline" />
            <span className="wb-hero-title-gradient">
              IT NEEDS BETTER SYSTEMS.
            </span>
          </h1>

          <p className="wb-hero-subtitle">
            Discover how AI can automate the repetitive work slowing your business down — across{" "}
            <strong style={{ color: "#FFFFFF" }}>Sales, Marketing, HR & Operations.</strong>
          </p>

          {/* 4 Pillars Glassmorphic Card */}
          <div className="wb-glass-card wb-glass-card-green wb-hero-checklist-card">
            <div className="wb-hero-checklist">
              <div className="wb-hero-check-item">
                <CheckCircle2 size={17} color="#B1D997" style={{ flexShrink: 0 }} />
                <span>No complicated tech talk</span>
              </div>
              <div className="wb-hero-check-item">
                <CheckCircle2 size={17} color="#B1D997" style={{ flexShrink: 0 }} />
                <span>No endless list of AI tools</span>
              </div>
              <div className="wb-hero-check-item">
                <CheckCircle2 size={17} color="#B1D997" style={{ flexShrink: 0 }} />
                <span>No coding required</span>
              </div>
            </div>
            <div
              style={{
                marginTop: "16px",
                paddingTop: "16px",
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                fontSize: "14px",
                color: "var(--wb-text-muted)",
              }}
            >
              Just real business workflows, real automation examples, and a practical framework you can start applying to your business.
            </div>
          </div>

          {/* Event Specs Quick Pill Grid */}
          <div className="wb-specs-row" style={{ maxWidth: "880px", margin: "0 auto 36px" }}>
            <div className="wb-spec-card">
              <span className="wb-spec-tag"><Calendar size={12} style={{ display: "inline", marginRight: "4px" }} /> Date</span>
              <span className="wb-spec-title">[DATE TO BE CONFIRMED]</span>
            </div>
            <div className="wb-spec-card">
              <span className="wb-spec-tag"><Clock size={12} style={{ display: "inline", marginRight: "4px" }} /> Time</span>
              <span className="wb-spec-title">[TIME TO BE CONFIRMED]</span>
            </div>
            <div className="wb-spec-card">
              <span className="wb-spec-tag"><Monitor size={12} style={{ display: "inline", marginRight: "4px" }} /> Format</span>
              <span className="wb-spec-title">Live Online Webinar</span>
            </div>
            <div className="wb-spec-card" style={{ background: "rgba(177, 217, 151, 0.06)", borderColor: "rgba(177, 217, 151, 0.3)" }}>
              <span className="wb-spec-tag" style={{ color: "#B1D997" }}><Ticket size={12} style={{ display: "inline", marginRight: "4px" }} /> Entry</span>
              <span className="wb-spec-title" style={{ color: "#B1D997" }}>JUST ₹99/- <s style={{ fontSize: "12px", color: "var(--wb-text-faint)", marginLeft: "4px" }}>₹999</s></span>
            </div>
          </div>

          {/* Primary Action Button */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
            <button
              onClick={handleOpenModal}
              className="wb-button-primary wb-btn-pulse-glow wb-hero-cta"
              style={{ fontSize: "18px", padding: "18px 48px" }}
            >
              <span>YES — I WANT TO JOIN FOR ₹99</span>
              <ArrowRight size={20} />
            </button>
            <span style={{ fontSize: "14px", color: "var(--wb-text-muted)" }}>
              One small investment. One powerful look at how your business could work differently.
            </span>
          </div>

        </div>
      </section>

      {/* ── SECTION 1: THE MANUAL TASK BLEED (PROBLEM) ───────────────────── */}
      <section className="wb-section wb-section-bordered">
        <div className="wb-container wb-container-narrow">
          <div style={{ textAlign: "center", marginBottom: "44px" }}>
            <div className="wb-pill-blue" style={{ marginBottom: "16px" }}>
              <span className="wb-dot-blue" />
              <span>THE HIDDEN BOTTLENECK</span>
            </div>
            <h2 style={{ fontSize: "clamp(22px, 4.5vw, 40px)", fontWeight: 800, color: "#FFFFFF", marginBottom: "16px", lineHeight: 1.25 }}>
              HOW MUCH BUSINESS ARE YOU LOSING TO “SMALL” MANUAL TASKS?
            </h2>
          </div>

          {/* The Manual Chain Breakdown */}
          <div className="wb-glass-card" style={{ marginBottom: "32px", borderLeft: "4px solid #63A5E7" }}>
            <p style={{ fontSize: "16px", color: "#FFFFFF", fontWeight: 700, marginBottom: "18px" }}>
              Think about how a simple interaction unfolds today inside most companies:
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                "A lead comes in.",
                "Someone has to notice it.",
                "Someone has to respond.",
                "Someone has to qualify it.",
                "Someone has to update the CRM.",
                "Someone has to remember the follow-up.",
                "Someone has to report what happened.",
              ].map((step, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: "12px", color: "var(--wb-text-mid)", fontSize: "15px" }}>
                  <span style={{ color: "#63A5E7", fontWeight: 800, minWidth: "24px" }}>0{idx + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "26px", paddingTop: "20px", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
              <p style={{ fontSize: "18px", color: "#FFFFFF", fontWeight: 700, marginBottom: "8px" }}>
                Now multiply that by 50, 100, 500, or 1,000 interactions every month.
              </p>
              <p style={{ fontSize: "15px", color: "var(--wb-text-muted)" }}>
                That&apos;s where the real problem begins. Your team isn&apos;t necessarily too small. Your workflows may simply be too manual.
              </p>
            </div>
          </div>

          <p style={{ fontSize: "16px", fontWeight: 700, color: "var(--wb-text-bright)", marginBottom: "18px", textAlign: "center" }}>
            And every manual handoff creates an opportunity for:
          </p>

          {/* 8 Red X Consequences Grid */}
          <div className="wb-pain-layout" style={{ marginBottom: "28px" }}>
            {[
              "Delayed responses",
              "Missed follow-ups",
              "Repetitive work",
              "Human errors",
              "Scattered information",
              "Poor visibility",
              "Lost opportunities",
              "More operational overhead",
            ].map((item, idx) => (
              <div key={idx} className="wb-pain-card">
                <XCircle size={18} color="#63A5E7" style={{ flexShrink: 0 }} />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div
            style={{
              textAlign: "center",
              padding: "16px 24px",
              borderRadius: "12px",
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              maxWidth: "800px",
              margin: "24px auto 0",
            }}
          >
            <p style={{ fontSize: "15px", color: "var(--wb-text-mid)", lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
              These universal problems—<span style={{ color: "#FFFFFF", fontWeight: 700 }}>slow responses, manual work, missed follow-ups, and poor tracking</span>—cut across departments and industries.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: THE AUTONOMOUS TRANSFORMATION (SOLUTION) ───────────── */}
      <section className="wb-section">
        <div className="wb-container wb-container-narrow">
          <div style={{ textAlign: "center", marginBottom: "44px" }}>
            <div className="wb-pill-eyebrow">
              <Zap size={14} />
              <span>THE INTELLIGENT ALTERNATIVE</span>
            </div>
            <h2 style={{ fontSize: "clamp(26px, 3.8vw, 42px)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.25 }}>
              WHAT IF YOUR BUSINESS COULD RUN MORE OF THIS AUTOMATICALLY?
            </h2>
            <p style={{ fontSize: "17px", color: "var(--wb-text-muted)", marginTop: "12px" }}>
              Imagine replacing manual drag with instant, reliable machine execution:
            </p>
          </div>

          {/* Flowchart Chain */}
          <div className="wb-glass-card wb-glass-card-green" style={{ padding: "40px 24px", marginBottom: "36px", textAlign: "center" }}>
            {[
              { label: "A lead comes in…", sub: "Form fill, email inquiry, ad click, or chat webhook" },
              { label: "AI responds instantly", sub: "Sub-minute contextual response personalized to intent" },
              { label: "The lead is qualified", sub: "Structured logic checks budget, timeline & requirements" },
              { label: "The right information is captured", sub: "Zero manual data entry or copy-paste friction" },
              { label: "Your CRM gets updated", sub: "Instant bidirectional synchronization across your stack" },
              { label: "The right person gets notified", sub: "Slack / Teams / WhatsApp alert routed to account owner" },
              { label: "Follow-ups happen automatically", sub: "Behavior-driven sequences triggered with precision" },
              { label: "Your team steps in when human judgment actually matters.", sub: "High-value conversations, strategic negotiation, and closing", isFinal: true },
            ].map((step, idx) => (
              <React.Fragment key={idx}>
                <div
                  className="wb-flow-node"
                  style={{
                    border: step.isFinal ? "1px solid rgba(177, 217, 151, 0.45)" : undefined,
                    background: step.isFinal ? "rgba(177, 217, 151, 0.08)" : undefined,
                    boxShadow: step.isFinal ? "0 0 35px rgba(177, 217, 151, 0.12)" : undefined,
                  }}
                >
                  <div
                    className="wb-flow-badge"
                    style={{
                      borderColor: step.isFinal ? "#B1D997" : undefined,
                    }}
                  >
                    {step.isFinal ? <ShieldCheck size={20} color="#B1D997" /> : <span>0{idx + 1}</span>}
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: "17px",
                        fontWeight: 700,
                        color: step.isFinal ? "#B1D997" : "#FFFFFF",
                        textAlign: "center",
                        lineHeight: 1.4,
                      }}
                    >
                      {step.label}
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        color: "var(--wb-text-muted)",
                        marginTop: "4px",
                        textAlign: "center",
                        lineHeight: 1.5,
                      }}
                    >
                      {step.sub}
                    </div>
                  </div>
                </div>
                {idx < 7 && (
                  <div className="wb-flow-connector">
                    <ChevronDown size={20} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Department Scope Pills */}
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "16px", color: "var(--wb-text-mid)", marginBottom: "14px" }}>
              And this isn&apos;t just for Sales. The same underlying system can power workflows across:
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px" }}>
              {["Sales", "Marketing", "HR", "Operations", "Customer Support"].map((dept, i) => (
                <span
                  key={i}
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.14)",
                    borderRadius: "9999px",
                    padding: "8px 20px",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#FFFFFF",
                  }}
                >
                  {dept}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: WEBINAR OFFER & PRICING CARD ──────────────────────── */}
      <section className="wb-section">
        <div className="wb-container wb-container-narrow">
          <div
            className="wb-glass-card wb-glass-card-green"
            style={{
              textAlign: "center",
              padding: "48px 36px",
              borderWidth: "2px",
            }}
          >
            <div className="wb-pill-green" style={{ marginBottom: "18px" }}>
              <span className="wb-dot-green" />
              <span>CONFIRMED LIVE SESSION</span>
            </div>

            <h2 style={{ fontSize: "clamp(20px, 4vw, 36px)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.3, marginBottom: "14px" }}>
              “How Businesses Are Automating 60–80% of Their Repetitive Workflows Using AI”
            </h2>

            <p style={{ fontSize: "17px", color: "var(--wb-text-mid)", marginBottom: "26px" }}>
              LIVE WITH <strong style={{ color: "#B1D997" }}>Adnan Shaikh</strong> — Co-Founder / Business & Automation Strategist, ScalePods
            </p>

            <div className="wb-specs-row" style={{ marginBottom: "34px" }}>
              <div className="wb-spec-card">
                <span className="wb-spec-tag">Date</span>
                <span className="wb-spec-title">[DATE TO BE CONFIRMED]</span>
              </div>
              <div className="wb-spec-card">
                <span className="wb-spec-tag">Time</span>
                <span className="wb-spec-title">[TIME TO BE CONFIRMED]</span>
              </div>
              <div className="wb-spec-card">
                <span className="wb-spec-tag">Format</span>
                <span className="wb-spec-title">Live Online Webinar</span>
              </div>
              <div className="wb-spec-card" style={{ background: "rgba(177, 217, 151, 0.08)", borderColor: "rgba(177, 217, 151, 0.35)" }}>
                <span className="wb-spec-tag" style={{ color: "#B1D997" }}>Entry</span>
                <span className="wb-spec-title" style={{ color: "#B1D997", fontSize: "17px" }}>JUST ₹99/-</span>
              </div>
            </div>

            <button
              onClick={handleOpenModal}
              className="wb-button-primary wb-btn-pulse-glow"
              style={{ fontSize: "18px", padding: "18px 48px", width: "100%", maxWidth: "440px", margin: "0 auto 16px" }}
            >
              <span>YES — I WANT TO JOIN FOR ₹99</span>
              <ArrowRight size={20} />
            </button>

            <p style={{ fontSize: "14px", color: "var(--wb-text-muted)" }}>
              One small investment. One powerful look at how your business could work differently.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: THE DIFFERENTIATOR ─────────────────────────────────── */}
      <section className="wb-section">
        <div className="wb-container wb-container-narrow">
          <div className="wb-glass-card wb-glass-card-blue" style={{ padding: "44px 38px", borderLeft: "4px solid #63A5E7" }}>
            <div className="wb-pill-eyebrow wb-pill-eyebrow-blue">
              <Layers size={14} />
              <span>THE CRUCIAL DIFFERENCE</span>
            </div>

            <h2 style={{ fontSize: "clamp(20px, 4vw, 36px)", fontWeight: 800, color: "#FFFFFF", marginBottom: "18px", lineHeight: 1.25 }}>
              THIS IS NOT ANOTHER “AI TOOLS” WEBINAR.
            </h2>

            <p style={{ fontSize: "17px", color: "var(--wb-text-mid)", lineHeight: 1.7, marginBottom: "22px" }}>
              You don&apos;t need another presentation showing you 50 AI tools you&apos;ll forget about tomorrow.
            </p>

            <div
              style={{
                background: "rgba(99, 165, 231, 0.08)",
                border: "1px solid rgba(99, 165, 231, 0.28)",
                borderRadius: "14px",
                padding: "22px 26px",
                marginBottom: "22px",
              }}
            >
              <span style={{ fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#63A5E7", fontWeight: 700, display: "block", marginBottom: "6px" }}>
                What You Actually Need:
              </span>
              <p style={{ fontSize: "22px", fontWeight: 800, color: "#FFFFFF", margin: 0 }}>
                WHERE AI + AUTOMATION CAN ACTUALLY FIT INTO YOUR BUSINESS.
              </p>
            </div>

            <p style={{ fontSize: "16px", color: "var(--wb-text-mid)", lineHeight: 1.7 }}>
              That&apos;s the difference. Instead of teaching tools one by one, we&apos;ll show you the <strong>patterns and systems</strong> behind business automation.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: THE 4-LAYER AUTOMATION SYSTEM ─────────────────────── */}
      <section className="wb-section wb-section-bordered">
        <div className="wb-container">
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <div className="wb-pill-eyebrow">
              <Cpu size={14} />
              <span>THE PROPRIETARY FRAMEWORK</span>
            </div>
            <h2 style={{ fontSize: "clamp(22px, 4.5vw, 42px)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.25, marginBottom: "14px" }}>
              YOU’LL DISCOVER THE 4-LAYER AUTOMATION SYSTEM
            </h2>
            <p style={{ fontSize: "17px", color: "var(--wb-text-muted)", maxWidth: "720px", margin: "0 auto" }}>
              A practical architectural framework for identifying and automating repetitive workflows.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "22px",
              marginBottom: "36px",
            }}
          >
            {[
              {
                num: "01",
                name: "CAPTURE",
                desc: "Capture the lead, request, application, enquiry, or task the moment it enters your business.",
                tag: "Zero Delay Ingestion",
              },
              {
                num: "02",
                name: "RESPOND",
                desc: "Trigger the right response without waiting for someone on your team to remember.",
                tag: "Instant Contextual Reply",
              },
              {
                num: "03",
                name: "QUALIFY",
                desc: "Use rules, data and AI to determine what happens next and filter noise from priority.",
                tag: "Intelligent Triage",
              },
              {
                num: "04",
                name: "SYNC + FOLLOW-UP",
                desc: "Update the right systems, notify the right people and trigger the next action automatically.",
                tag: "End-to-End Orchestration",
              },
            ].map((layer, idx) => (
              <div key={idx} className="wb-layer-box">
                <span className="wb-layer-index">{layer.num}</span>
                <h3 style={{ fontSize: "19px", fontWeight: 800, color: "#FFFFFF", marginBottom: "10px" }}>
                  {layer.name}
                </h3>
                <p style={{ fontSize: "14px", color: "var(--wb-text-mid)", lineHeight: 1.6, marginBottom: "18px" }}>
                  {layer.desc}
                </p>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#B1D997",
                    background: "rgba(177, 217, 151, 0.08)",
                    border: "1px solid rgba(177, 217, 151, 0.25)",
                    borderRadius: "6px",
                    padding: "4px 10px",
                    display: "inline-block",
                  }}
                >
                  {layer.tag}
                </span>
              </div>
            ))}
          </div>

          {/* System Equation Bar */}
          <div
            className="wb-glass-card wb-glass-card-green"
            style={{
              padding: "18px 28px",
              textAlign: "center",
              fontSize: "17px",
              fontWeight: 800,
              color: "#FFFFFF",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            <span style={{ color: "#B1D997" }}>Capture</span> → <span style={{ color: "#63A5E7" }}>Respond</span> → <span style={{ color: "#B1D997" }}>Qualify</span> → <span style={{ color: "#63A5E7" }}>Sync + Follow-up</span>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: CROSS-DEPARTMENT SHOWCASE ─────────────────────────── */}
      <section className="wb-section">
        <div className="wb-container">
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <div className="wb-pill-eyebrow">
              <Briefcase size={14} />
              <span>PRACTICAL ENTERPRISE USE CASES</span>
            </div>
            <h2 style={{ fontSize: "clamp(22px, 4.5vw, 42px)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.25, marginBottom: "14px" }}>
              SEE HOW THE SAME SYSTEM WORKS ACROSS YOUR BUSINESS
            </h2>
            <p style={{ fontSize: "17px", color: "var(--wb-text-muted)" }}>
              One underlying logic engine deployed across critical operational tracks:
            </p>
          </div>

          <div
            className="wb-dept-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "24px",
            }}
          >
            {/* Sales Pod */}
            <div className="wb-glass-card wb-glass-card-green">
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", borderRadius: "10px", background: "rgba(177, 217, 151, 0.12)", border: "1px solid rgba(177, 217, 151, 0.25)" }}>
                  <TrendingUp size={18} color="#B1D997" />
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#FFFFFF" }}>SALES</h3>
              </div>
              <p style={{ fontSize: "14px", color: "var(--wb-text-muted)", marginBottom: "16px" }}>
                What if every new lead could automatically:
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px", fontSize: "14px", color: "var(--wb-text-mid)" }}>
                {["Receive an instant response", "Be asked qualification questions", "Be categorized", "Be assigned to the right person", "Be updated in your CRM", "Enter an automated follow-up sequence"].map((pt, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                    <span style={{ color: "#B1D997", fontWeight: 700 }}>→</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: "22px", paddingTop: "16px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", fontSize: "13px", fontWeight: 700, color: "#B1D997" }}>
                Less chasing. Fewer missed leads. Faster response.
              </div>
            </div>

            {/* Marketing Pod */}
            <div className="wb-glass-card wb-glass-card-blue">
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", borderRadius: "10px", background: "rgba(99, 165, 231, 0.12)", border: "1px solid rgba(99, 165, 231, 0.25)" }}>
                  <Zap size={18} color="#63A5E7" />
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#FFFFFF" }}>MARKETING</h3>
              </div>
              <p style={{ fontSize: "14px", color: "var(--wb-text-muted)", marginBottom: "16px" }}>
                Imagine if campaigns ran autonomously:
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px", fontSize: "14px", color: "var(--wb-text-mid)" }}>
                {["Leads captured automatically", "Nurture sequences triggered", "Campaign activity tracked", "Data moved between systems", "Follow-ups initiated automatically"].map((pt, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                    <span style={{ color: "#63A5E7", fontWeight: 700 }}>→</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: "22px", paddingTop: "16px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", fontSize: "13px", fontWeight: 700, color: "#63A5E7" }}>
                Your marketing shouldn&apos;t stop at generating the lead.
              </div>
            </div>

            {/* HR Pod */}
            <div className="wb-glass-card wb-glass-card-green">
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", borderRadius: "10px", background: "rgba(177, 217, 151, 0.12)", border: "1px solid rgba(177, 217, 151, 0.25)" }}>
                  <Users size={18} color="#B1D997" />
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#FFFFFF" }}>HR & TALENT</h3>
              </div>
              <p style={{ fontSize: "14px", color: "var(--wb-text-muted)", marginBottom: "16px" }}>
                Imagine a candidate lifecycle:
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px", fontSize: "14px", color: "var(--wb-text-mid)" }}>
                {["Candidate applies", "Gets screened intelligently", "Is categorized by fit", "Receives the next communication", "Gets interview scheduling options", "Moves through workflow automatically"].map((pt, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                    <span style={{ color: "#B1D997", fontWeight: 700 }}>→</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: "22px", paddingTop: "16px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", fontSize: "13px", fontWeight: 700, color: "#B1D997" }}>
                Your HR team spends less time moving information around.
              </div>
            </div>

            {/* Operations Pod */}
            <div className="wb-glass-card wb-glass-card-blue">
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", borderRadius: "10px", background: "rgba(99, 165, 231, 0.12)", border: "1px solid rgba(99, 165, 231, 0.25)" }}>
                  <Cpu size={18} color="#63A5E7" />
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#FFFFFF" }}>OPERATIONS</h3>
              </div>
              <p style={{ fontSize: "14px", color: "var(--wb-text-muted)", marginBottom: "16px" }}>
                Imagine internal task execution:
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px", fontSize: "14px", color: "var(--wb-text-mid)" }}>
                {["A task gets created", "The right person is assigned", "Deadlines are tracked", "Updates are triggered", "Reports are generated"].map((pt, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                    <span style={{ color: "#63A5E7", fontWeight: 700 }}>→</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: "22px", paddingTop: "16px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", fontSize: "13px", fontWeight: 700, color: "#63A5E7" }}>
                Fewer things falling through the cracks.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: LIVE WORKFLOW DEMO ────────────────────────────────── */}
      <section className="wb-section wb-section-bordered">
        <div className="wb-container wb-container-narrow">
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <div className="wb-pill-eyebrow">
              <Monitor size={14} />
              <span>NO SLIDE DECKS ONLY</span>
            </div>
            <h2 style={{ fontSize: "clamp(26px, 3.8vw, 42px)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.25, marginBottom: "14px" }}>
              AND YES — THERE WILL BE A LIVE DEMO.
            </h2>
            <p style={{ fontSize: "18px", color: "var(--wb-text-mid)", maxWidth: "680px", margin: "0 auto" }}>
              Because understanding automation is one thing.{" "}
              <strong style={{ color: "#B1D997" }}>SEEING IT ACTUALLY HAPPEN IS ANOTHER.</strong>
            </p>
          </div>

          <div
            className="wb-glass-card wb-glass-card-green"
            style={{
              padding: "40px",
              textAlign: "center",
            }}
          >
            <span style={{ fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--wb-text-muted)", display: "block", marginBottom: "24px" }}>
              Live Practical Execution Architecture
            </span>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                maxWidth: "780px",
                margin: "0 auto",
              }}
            >
              {[
                "LEAD ENTERS",
                "AI / AUTO RESPONDS",
                "QUALIFICATION",
                "CATEGORIZATION",
                "ASSIGNMENT",
                "CRM UPDATE",
                "FOLLOW-UP",
              ].map((step, i) => (
                <React.Fragment key={i}>
                  <div
                    style={{
                      background: "rgba(177, 217, 151, 0.08)",
                      border: "1px solid rgba(177, 217, 151, 0.35)",
                      borderRadius: "10px",
                      padding: "10px 18px",
                      fontSize: "13px",
                      fontWeight: 800,
                      color: "#FFFFFF",
                      letterSpacing: "0.03em",
                      boxShadow: "0 4px 15px rgba(177, 217, 151, 0.12)",
                    }}
                  >
                    {step}
                  </div>
                  {i < 6 && (
                    <span style={{ color: "#B1D997", fontWeight: 800, fontSize: "16px" }}>
                      ↓
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>

            <p style={{ fontSize: "14px", color: "var(--wb-text-muted)", marginTop: "26px" }}>
              Watch live as real business records move through an intelligent automation pipeline with zero human intervention.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 8: THE BIG REALIZATION ───────────────────────────────── */}
      <section className="wb-section">
        <div className="wb-container wb-container-narrow">
          <div className="wb-glass-card" style={{ padding: "44px 36px", textAlign: "center" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                background: "rgba(177, 217, 151, 0.1)",
                border: "1px solid rgba(177, 217, 151, 0.25)",
                marginBottom: "20px",
              }}
            >
              <Sparkles size={28} color="#B1D997" />
            </div>
            <h2 style={{ fontSize: "clamp(20px, 4vw, 36px)", fontWeight: 800, color: "#FFFFFF", marginBottom: "18px" }}>
              THE BIG REALIZATION
            </h2>
            <p style={{ fontSize: "18px", color: "var(--wb-text-mid)", lineHeight: 1.7, maxWidth: "720px", margin: "0 auto 30px" }}>
              Most businesses don&apos;t have a completely different problem in every department.
              <br />
              <strong style={{ color: "#FFFFFF" }}>They have the same underlying problem wearing different clothes.</strong>
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "12px",
                textAlign: "left",
                marginBottom: "30px",
              }}
            >
              {[
                { who: "A lead", action: "needs a response." },
                { who: "A candidate", action: "needs a follow-up." },
                { who: "A task", action: "needs an owner." },
                { who: "A customer", action: "needs an update." },
                { who: "A campaign", action: "needs tracking." },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "10px",
                    padding: "14px 18px",
                    fontSize: "14px",
                  }}
                >
                  <strong style={{ color: "#B1D997" }}>{item.who}</strong> {item.action}
                </div>
              ))}
            </div>

            <div
              style={{
                fontSize: "18px",
                fontWeight: 800,
                color: "#FFFFFF",
                background: "linear-gradient(135deg, rgba(177, 217, 151, 0.12) 0%, rgba(99, 165, 231, 0.12) 100%)",
                border: "1px solid rgba(177, 217, 151, 0.35)",
                borderRadius: "12px",
                padding: "16px 24px",
                display: "inline-block",
              }}
            >
              Different use cases. Same underlying automation logic.
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 9: MEET YOUR HOST ─────────────────────────────────────── */}
      <section className="wb-section wb-section-bordered">
        <div className="wb-container wb-container-narrow">
          <div style={{ textAlign: "center", marginBottom: "44px" }}>
            <div className="wb-pill-eyebrow">
              <Users size={14} />
              <span>YOUR INSTRUCTOR</span>
            </div>
            <h2 style={{ fontSize: "clamp(26px, 3.8vw, 42px)", fontWeight: 800, color: "#FFFFFF" }}>
              MEET YOUR HOST — ADNAN SHAIKH
            </h2>
            <p style={{ fontSize: "16px", color: "#B1D997", fontWeight: 700, marginTop: "6px" }}>
              The Brain Behind ScalePods
            </p>
          </div>

          <div
            className="wb-glass-card wb-glass-card-green"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "40px",
              alignItems: "center",
            }}
          >
            {/* Host Image */}
            <div style={{ position: "relative", textAlign: "center" }}>
              <div
                style={{
                  width: "230px",
                  height: "230px",
                  borderRadius: "50%",
                  margin: "0 auto",
                  position: "relative",
                  border: "3px solid #B1D997",
                  padding: "6px",
                  boxShadow: "0 0 40px rgba(177, 217, 151, 0.3)",
                }}
              >
                <div style={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden", position: "relative" }}>
                  <Image
                    src="/images/team/adnan.jpeg"
                    alt="Adnan Shaikh — Co-Founder of ScalePods"
                    fill
                    sizes="230px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>

              <div
                style={{
                  marginTop: "18px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "rgba(177, 217, 151, 0.1)",
                  border: "1px solid rgba(177, 217, 151, 0.3)",
                  borderRadius: "9999px",
                  padding: "5px 14px",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#B1D997",
                }}
              >
                <span>ScalePods Co-Founder & Strategist</span>
              </div>
            </div>

            {/* Host Bio */}
            <div>
              <p style={{ fontSize: "15px", color: "var(--wb-text-mid)", lineHeight: 1.7, marginBottom: "14px" }}>
                Adnan Shaikh has spent the last decade building and scaling revenue systems across B2C and B2B. Today, through ScalePods, he works on AI-powered systems designed to eliminate repetitive work and connect business workflows across functions.
              </p>
              <p style={{ fontSize: "15px", color: "var(--wb-text-mid)", lineHeight: 1.7, marginBottom: "18px" }}>
                His current work spans AI-powered automation for areas including sales, marketing, HR, customer support and broader business operations.
              </p>

              <div
                style={{
                  background: "rgba(255, 255, 255, 0.04)",
                  borderLeft: "3px solid #B1D997",
                  padding: "16px 20px",
                  borderRadius: "0 10px 10px 0",
                  marginBottom: "18px",
                }}
              >
                <span style={{ fontSize: "12px", textTransform: "uppercase", color: "var(--wb-text-muted)", letterSpacing: "0.06em", display: "block" }}>
                  Core Philosophy
                </span>
                <p style={{ fontSize: "16px", fontWeight: 700, color: "#FFFFFF", margin: "4px 0 0" }}>
                  “Don&apos;t just add another tool. Build a system that actually gets the work done.”
                </p>
              </div>

              <p style={{ fontSize: "14px", color: "var(--wb-text-muted)" }}>
                At ScalePods, the focus is on connected workflows that reduce manual work and help teams operate faster and more efficiently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 10: WHAT YOU'LL WALK AWAY WITH ───────────────────────── */}
      <section className="wb-section">
        <div className="wb-container">
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <div className="wb-pill-eyebrow">
              <CheckCircle2 size={14} />
              <span>SESSION DELIVERABLES</span>
            </div>
            <h2 style={{ fontSize: "clamp(22px, 4.5vw, 42px)", fontWeight: 800, color: "#FFFFFF", marginBottom: "12px" }}>
              WHAT YOU’LL WALK AWAY WITH
            </h2>
            <p style={{ fontSize: "17px", color: "var(--wb-text-muted)" }}>
              By the end of the session, you&apos;ll have clear blueprints to deploy immediately:
            </p>
          </div>

          <div
            className="wb-takeaways-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "16px",
              maxWidth: "1040px",
              margin: "0 auto",
            }}
          >
            {[
              "How to identify repetitive workflows worth automating",
              "Where AI can fit inside your existing business processes",
              "How the 4-Layer Automation System works",
              "How Sales workflows can respond, qualify and follow up automatically",
              "How Marketing workflows can capture, nurture and track leads",
              "How HR workflows can screen, schedule and follow up",
              "How Operations workflows can create, assign, track and report tasks",
              "How different tools can work together instead of creating more disconnected work",
              "What an AI-powered workflow can look like in a real business",
              "How to start thinking in systems instead of individual tools",
            ].map((item, idx) => (
              <div
                key={idx}
                className="wb-glass-card"
                style={{
                  padding: "18px 22px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "14px",
                }}
              >
                <CheckCircle2 size={22} color="#B1D997" style={{ flexShrink: 0, marginTop: "2px" }} />
                <span style={{ fontSize: "15px", color: "var(--wb-text-bright)", lineHeight: 1.5, fontWeight: 500 }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 11: AUDIENCE QUALIFIER ───────────────────────────────── */}
      <section className="wb-section wb-section-bordered">
        <div className="wb-container">
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <div className="wb-pill-eyebrow">
              <TrendingUp size={14} />
              <span>IS THIS FOR YOU?</span>
            </div>
            <h2 style={{ fontSize: "clamp(22px, 4.5vw, 42px)", fontWeight: 800, color: "#FFFFFF" }}>
              WHO SHOULD ATTEND?
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "24px",
              maxWidth: "1040px",
              margin: "0 auto 40px",
            }}
          >
            {/* Who It Is For */}
            <div className="wb-glass-card wb-glass-card-green" style={{ borderTop: "4px solid #B1D997" }}>
              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#B1D997", marginBottom: "22px", display: "flex", alignItems: "center", gap: "8px" }}>
                <CheckCircle2 size={22} />
                <span>This Webinar Is For You If You Are:</span>
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {[
                  { title: "A Founder", desc: "Who wants the business to scale without every new customer requiring another hire." },
                  { title: "An Entrepreneur", desc: "Who is tired of personally chasing leads, follow-ups and operational tasks." },
                  { title: "A Sales Leader", desc: "Who wants faster responses and fewer missed opportunities." },
                  { title: "A Marketing Leader", desc: "Who wants leads to move automatically from acquisition to nurture." },
                  { title: "An HR Leader", desc: "Who wants to reduce repetitive screening and coordination work." },
                  { title: "An Operations Leader", desc: "Who wants better visibility and fewer manual handoffs." },
                  { title: "A Business Professional", desc: "Who wants to understand how AI can become part of the actual business workflow—not just another chatbot." },
                ].map((aud, i) => (
                  <div key={i} style={{ borderBottom: i < 6 ? "1px solid rgba(255, 255, 255, 0.06)" : undefined, paddingBottom: i < 6 ? "12px" : undefined }}>
                    <div style={{ fontSize: "15px", fontWeight: 700, color: "#FFFFFF" }}>{aud.title}</div>
                    <div style={{ fontSize: "13px", color: "var(--wb-text-muted)", marginTop: "2px" }}>{aud.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Who It Is NOT For */}
            <div className="wb-glass-card wb-glass-card-blue" style={{ borderTop: "4px solid #63A5E7" }}>
              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#63A5E7", marginBottom: "22px", display: "flex", alignItems: "center", gap: "8px" }}>
                <XCircle size={22} color="#63A5E7" />
                <span>THIS WEBINAR IS NOT FOR EVERYONE</span>
              </h3>
              <p style={{ fontSize: "14px", color: "var(--wb-text-mid)", marginBottom: "18px" }}>
                If you&apos;re looking for:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "24px" }}>
                {[
                  "A basic “What is ChatGPT?” introduction",
                  "A list of random AI tools",
                  "Technical coding lessons",
                  "AI hype without practical business application",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--wb-text-bright)", fontSize: "14px", background: "rgba(99, 165, 231, 0.06)", border: "1px solid rgba(99, 165, 231, 0.2)", padding: "12px 16px", borderRadius: "10px" }}>
                    <XCircle size={16} color="#63A5E7" style={{ flexShrink: 0 }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: "14px", color: "var(--wb-text-muted)", fontStyle: "italic", lineHeight: 1.6 }}>
                …this probably isn&apos;t the session you&apos;re looking for.
              </p>
              <div style={{ marginTop: "20px", paddingTop: "18px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", fontSize: "14px", color: "var(--wb-text-bright)", fontWeight: 600 }}>
                But if your business is already dealing with leads, customers, employees, candidates, tasks, data or repetitive processes… you should be in the room.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 12: WHY ₹99? ─────────────────────────────────────────── */}
      <section className="wb-section">
        <div className="wb-container wb-container-narrow">
          <div
            className="wb-glass-card wb-glass-card-green"
            style={{
              textAlign: "center",
              padding: "48px 36px",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                background: "rgba(177, 217, 151, 0.12)",
                border: "1px solid rgba(177, 217, 151, 0.3)",
                marginBottom: "20px",
              }}
            >
              <Ticket size={28} color="#B1D997" />
            </div>
            <h2 style={{ fontSize: "clamp(22px, 4.5vw, 40px)", fontWeight: 800, color: "#FFFFFF", marginBottom: "16px" }}>
              WHY ₹99?
            </h2>
            <p style={{ fontSize: "17px", color: "var(--wb-text-mid)", lineHeight: 1.7, maxWidth: "700px", margin: "0 auto 26px" }}>
              Because you shouldn&apos;t need to spend thousands of rupees just to discover whether AI automation is relevant to your business.
            </p>

            <div
              style={{
                fontSize: "24px",
                fontWeight: 800,
                color: "#B1D997",
                background: "rgba(177, 217, 151, 0.1)",
                border: "1px solid rgba(177, 217, 151, 0.35)",
                borderRadius: "14px",
                padding: "16px 28px",
                display: "inline-block",
                marginBottom: "26px",
                boxShadow: "0 0 30px rgba(177, 217, 151, 0.15)",
              }}
            >
              LIVE WEBINAR ACCESS — ₹99/-
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", color: "var(--wb-text-muted)", fontSize: "14px", marginBottom: "28px" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}><CheckCircle2 size={15} color="#B1D997" /> No complicated package</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}><CheckCircle2 size={15} color="#B1D997" /> No annual subscription</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}><CheckCircle2 size={15} color="#B1D997" /> No upsell required to attend</span>
            </div>

            <p style={{ fontSize: "15px", color: "var(--wb-text-mid)", maxWidth: "660px", margin: "0 auto" }}>
              Just ₹99 to spend focused time understanding how AI-powered workflows could transform repetitive work inside your business.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 13: ACTION CARD (YOUR SEAT) ─────────────────────────── */}
      <section className="wb-section">
        <div className="wb-container wb-container-narrow">
          <div
            className="wb-glass-card wb-glass-card-green"
            style={{
              textAlign: "center",
              padding: "44px 34px",
              borderWidth: "2px",
            }}
          >
            <div className="wb-pill-eyebrow" style={{ marginBottom: "16px" }}>
              <Clock size={14} />
              <span>LIMITED SEATS AVAILABLE</span>
            </div>

            <h2 style={{ fontSize: "clamp(20px, 4vw, 36px)", fontWeight: 800, color: "#FFFFFF", marginBottom: "8px" }}>
              YOUR SEAT AWAITS
            </h2>

            <p style={{ fontSize: "16px", color: "var(--wb-text-mid)", marginBottom: "26px" }}>
              LIVE AI BUSINESS AUTOMATION WEBINAR with Adnan Shaikh | ScalePods
            </p>

            <div className="wb-specs-row" style={{ marginBottom: "32px" }}>
              <div className="wb-spec-card">
                <span className="wb-spec-tag">Date</span>
                <span className="wb-spec-title">[TO BE CONFIRMED]</span>
              </div>
              <div className="wb-spec-card">
                <span className="wb-spec-tag">Time</span>
                <span className="wb-spec-title">[TO BE CONFIRMED]</span>
              </div>
              <div className="wb-spec-card">
                <span className="wb-spec-tag">Format</span>
                <span className="wb-spec-title">Online / LIVE</span>
              </div>
              <div className="wb-spec-card" style={{ background: "rgba(177, 217, 151, 0.08)", borderColor: "rgba(177, 217, 151, 0.35)" }}>
                <span className="wb-spec-tag" style={{ color: "#B1D997" }}>Fee</span>
                <span className="wb-spec-title" style={{ color: "#B1D997" }}>₹99/-</span>
              </div>
            </div>

            <button
              onClick={handleOpenModal}
              className="wb-button-primary wb-btn-pulse-glow"
              style={{ fontSize: "18px", padding: "18px 48px", width: "100%", maxWidth: "420px", margin: "0 auto 14px" }}
            >
              <span>RESERVE MY SEAT FOR ₹99</span>
              <ArrowRight size={20} />
            </button>

            <span style={{ fontSize: "13px", color: "var(--wb-text-muted)", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
              <Clock size={14} color="#63A5E7" />
              <span>Limited live-session capacity. Reservations closed once room limit reached.</span>
            </span>
          </div>
        </div>
      </section>

      {/* ── SECTION 14: FAQS ─────────────────────────────────────────────── */}
      <section className="wb-section wb-section-bordered">
        <div className="wb-container wb-container-narrow">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div className="wb-pill-eyebrow">
              <MessageSquare size={14} />
              <span>GOT QUESTIONS?</span>
            </div>
            <h2 style={{ fontSize: "clamp(26px, 3.8vw, 42px)", fontWeight: 800, color: "#FFFFFF" }}>
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>

          <div className="wb-glass-card" style={{ padding: "18px 32px" }}>
            {[
              {
                q: "Do I need technical knowledge?",
                a: "No. The session is designed around business workflows and practical examples—not programming. You do not need any coding or software engineering background.",
              },
              {
                q: "Is this only for tech companies?",
                a: "No. The framework is designed around universal business problems and can be applied across departments and industries (Manufacturing, Real Estate, Professional Services, Agencies, Healthcare, and B2B).",
              },
              {
                q: "Will you teach specific AI tools?",
                a: "Tools may be demonstrated where relevant, but the focus is on how to design the workflow, not memorizing a list of tools that become outdated next month.",
              },
              {
                q: "Is this only for large companies?",
                a: "No. If your business has repetitive work, leads, enquiries, candidates, tasks or operational processes, there are workflows worth automating—regardless of team size.",
              },
              {
                q: "Will there be a live demonstration?",
                a: "Yes. A central part of the session is a practical workflow demonstration showing how an incoming request can move through response, qualification, categorization, CRM update and follow-up.",
              },
              {
                q: "When is the webinar?",
                a: "Date & Time: [TO BE CONFIRMED]. Registered attendees will receive calendar invites, reminder emails, and direct access links once the date is finalized.",
              },
              {
                q: "How much does it cost?",
                a: "₹99/- only. This is a one-time registration for access to the live interactive webinar.",
              },
            ].map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="wb-faq-row">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="wb-faq-btn"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={20}
                      style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.25s ease",
                        color: isOpen ? "#B1D997" : "var(--wb-text-muted)",
                        flexShrink: 0,
                      }}
                    />
                  </button>
                  {isOpen && (
                    <div className="wb-faq-answer">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 15: FINAL PROVOCATIVE CLOSING & MICRO-CTA ────────────── */}
      <section className="wb-section wb-section-final">
        <div className="wb-container wb-container-narrow" style={{ textAlign: "center" }}>
          <div className="wb-pill-eyebrow">
            <Sparkles size={14} />
            <span>FINAL TAKEAWAY</span>
          </div>

          <h2
            style={{
              fontSize: "clamp(28px, 4.5vw, 52px)",
              fontWeight: 800,
              lineHeight: 1.2,
              color: "#FFFFFF",
              marginBottom: "24px",
            }}
          >
            YOUR BUSINESS IS ALREADY RUNNING WORKFLOWS.
            <br />
            <span
              style={{
                color: "#B1D997",
              }}
            >
              THE QUESTION IS: ARE HUMANS STILL DOING ALL OF THEM?
            </span>
          </h2>

          <div
            style={{
              fontSize: "17px",
              color: "var(--wb-text-mid)",
              lineHeight: 1.8,
              maxWidth: "760px",
              margin: "0 auto 36px",
            }}
          >
            <p style={{ marginBottom: "16px" }}>
              Every repetitive task your team performs manually is a potential workflow. Every workflow is a potential system. And every system you automate can give your team more time to focus on work that actually requires people.
            </p>
            <p style={{ fontStyle: "italic", color: "#FFFFFF", fontWeight: 700 }}>
              Stop asking: “Which AI tool should I use?”
              <br />
              Start asking: “Which part of my business should never have been manual in the first place?”
            </p>
          </div>

          <div
            className="wb-glass-card wb-glass-card-green"
            style={{
              maxWidth: "780px",
              margin: "0 auto 40px",
              padding: "40px 32px",
            }}
          >
            <h3 style={{ fontSize: "24px", fontWeight: 800, color: "#FFFFFF", marginBottom: "8px" }}>
              SEE WHAT’S POSSIBLE.
            </h3>
            <p style={{ fontSize: "16px", color: "var(--wb-text-muted)", marginBottom: "22px" }}>
              JOIN THE ₹99 LIVE AI BUSINESS AUTOMATION WEBINAR
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "14px", fontSize: "14px", color: "#B1D997", fontWeight: 700, marginBottom: "26px" }}>
              <span>Learn the system</span> • <span>See the workflows</span> • <span>Watch the automation happen</span> • <span>Identify your ROI</span>
            </div>

            <button
              onClick={handleOpenModal}
              className="wb-button-primary wb-btn-pulse-glow"
              style={{ fontSize: "18px", padding: "18px 48px", width: "100%", maxWidth: "440px", margin: "0 auto 16px" }}
            >
              <span>YES — RESERVE MY SEAT</span>
              <ArrowRight size={20} />
            </button>

            <span style={{ fontSize: "13px", color: "var(--wb-text-faint)", display: "block" }}>
              Hosted by Adnan Shaikh • ScalePods — Growth, Automated.
            </span>
          </div>

          {/* Final Micro-CTA */}
          <div
            style={{
              padding: "22px",
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px dashed rgba(255, 255, 255, 0.15)",
              borderRadius: "14px",
              maxWidth: "620px",
              margin: "0 auto",
            }}
          >
            <p style={{ fontSize: "15px", color: "var(--wb-text-mid)", marginBottom: "14px" }}>
              Your competitors aren&apos;t necessarily working harder. They may simply have better systems. ₹99 today could change the way you look at your business tomorrow.
            </p>
            <button
              onClick={handleOpenModal}
              style={{
                background: "none",
                border: "none",
                color: "#B1D997",
                fontWeight: 800,
                fontSize: "16px",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              [ GET MY ₹99 LIVE ACCESS ]
            </button>
          </div>
        </div>
      </section>

      {/* ── STICKY BOTTOM ACTION BAR (MOBILE & DESKTOP) ──────────────────── */}
      <div className={`wb-bottom-bar ${showSticky ? "visible" : ""}`}>
        <div className="wb-bottom-bar-inner">
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div className="wb-pill-green" style={{ padding: "4px 10px", fontSize: "11px" }}>
              <span className="wb-dot-green" />
              <span>LIVE</span>
            </div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#FFFFFF" }}>
                AI Business Automation Webinar
              </div>
              <div style={{ fontSize: "12px", color: "#B1D997" }}>
                Hosted by Adnan Shaikh • <strong>Just ₹99/-</strong> <s style={{ color: "var(--wb-text-faint)" }}>₹999</s>
              </div>
            </div>
          </div>

          <button
            onClick={handleOpenModal}
            className="wb-button-primary wb-btn-pulse-glow"
            style={{ padding: "12px 30px", fontSize: "15px" }}
          >
            <span>Reserve Seat (₹99)</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* ── REGISTRATION / CHECKOUT MODAL ─────────────────────────────────── */}
      {isModalOpen && (
        <div className="wb-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="wb-modal-body" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "none",
                border: "none",
                color: "var(--wb-text-muted)",
                cursor: "pointer",
              }}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {modalStep === "form" ? (
              <div>
                <div style={{ textAlign: "center", marginBottom: "22px" }}>
                  <div className="wb-pill-green" style={{ marginBottom: "10px" }}>
                    <span className="wb-dot-green" />
                    <span>SECURE REGISTRATION</span>
                  </div>
                  <h3 style={{ fontSize: "22px", fontWeight: 800, color: "#FFFFFF" }}>
                    Reserve Your Webinar Seat
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--wb-text-muted)", marginTop: "4px" }}>
                    “How Businesses Are Automating 60–80% of Repetitive Workflows”
                  </p>
                </div>

                {/* Price summary badge */}
                <div
                  style={{
                    background: "rgba(177, 217, 151, 0.08)",
                    border: "1px solid rgba(177, 217, 151, 0.28)",
                    borderRadius: "12px",
                    padding: "14px 18px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "18px",
                  }}
                >
                  <span style={{ fontSize: "14px", color: "#FFFFFF", fontWeight: 600 }}>Webinar Access Pass</span>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: "20px", fontWeight: 800, color: "#B1D997" }}>₹99</span>
                    <span style={{ fontSize: "13px", color: "var(--wb-text-faint)", marginLeft: "6px", textDecoration: "line-through" }}>₹999</span>
                  </div>
                </div>

                {paymentError && (
                  <div
                    style={{
                      background: "rgba(239, 68, 68, 0.12)",
                      border: "1px solid rgba(239, 68, 68, 0.35)",
                      borderRadius: "10px",
                      padding: "12px 14px",
                      marginBottom: "16px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      color: "#FCA5A5",
                      fontSize: "13px",
                      lineHeight: 1.4,
                    }}
                  >
                    <AlertTriangle size={18} style={{ flexShrink: 0 }} />
                    <span>{paymentError}</span>
                  </div>
                )}

                <form onSubmit={handleFormSubmit}>
                  <div className="wb-form-group">
                    <label className="wb-form-label">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="wb-form-input"
                      disabled={isSubmitting || isVerifying}
                    />
                  </div>

                  <div className="wb-form-group">
                    <label className="wb-form-label">Work Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="rahul@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="wb-form-input"
                      disabled={isSubmitting || isVerifying}
                    />
                  </div>

                  <div className="wb-form-group">
                    <label className="wb-form-label">WhatsApp Number (For session link & reminders) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="wb-form-input"
                      disabled={isSubmitting || isVerifying}
                    />
                  </div>

                  <div className="wb-form-group">
                    <label className="wb-form-label">Company / Role (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Founder, Ops Lead"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="wb-form-input"
                      disabled={isSubmitting || isVerifying}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || isVerifying}
                    className="wb-button-primary"
                    style={{ width: "100%", marginTop: "10px" }}
                  >
                    {isSubmitting ? (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Opening Secure Payment...</span>
                      </span>
                    ) : isVerifying ? (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Verifying Payment...</span>
                      </span>
                    ) : (
                      <>
                        <Lock size={16} />
                        <span>Proceed to Pay ₹99</span>
                      </>
                    )}
                  </button>
                </form>

                <div style={{ marginTop: "18px", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", color: "var(--wb-text-faint)", fontSize: "12px" }}>
                  <ShieldCheck size={14} color="#B1D997" />
                  <span>256-Bit SSL Encrypted • Powered by Razorpay</span>
                </div>
              </div>
            ) : (
              /* Verified Confirmation Screen */
              <div style={{ textAlign: "center", padding: "16px 0" }}>
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    background: "rgba(177, 217, 151, 0.12)",
                    border: "2px solid #B1D997",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                    color: "#B1D997",
                  }}
                >
                  <CheckCircle2 size={36} />
                </div>

                <div className="wb-pill-green" style={{ marginBottom: "10px" }}>
                  <span className="wb-dot-green" />
                  <span>PAYMENT VERIFIED & CONFIRMED</span>
                </div>

                <h3 style={{ fontSize: "22px", fontWeight: 800, color: "#FFFFFF", marginBottom: "8px" }}>
                  Your Seat Is Confirmed!
                </h3>
                <p style={{ fontSize: "14px", color: "var(--wb-text-mid)", marginBottom: "20px", lineHeight: 1.5 }}>
                  Thank you, <strong style={{ color: "#FFFFFF" }}>{formData.name || "Attendee"}</strong>. We’ve received your registration for ₹99 and sent the confirmation receipt to <strong style={{ color: "#FFFFFF" }}>{formData.email}</strong>.
                </p>

                {/* Receipt Card */}
                {paymentSuccessData && (
                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "12px",
                      padding: "14px 18px",
                      textAlign: "left",
                      marginBottom: "22px",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "12px" }}>
                      <span style={{ color: "var(--wb-text-muted)" }}>Payment Reference</span>
                      <span style={{ color: "#B1D997", fontFamily: "monospace", fontWeight: 600 }}>
                        {paymentSuccessData.bookingId}
                      </span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "12px" }}>
                      <span style={{ color: "var(--wb-text-muted)" }}>Order Reference</span>
                      <span style={{ color: "#63A5E7", fontFamily: "monospace", fontWeight: 600 }}>
                        {paymentSuccessData.orderId}
                      </span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
                      <span style={{ color: "var(--wb-text-muted)" }}>Pass Fee</span>
                      <span style={{ color: "#FFFFFF", fontWeight: 700 }}>₹99.00 INR (Paid)</span>
                    </div>
                  </div>
                )}

                {/* Next Steps Buttons */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
                  <a
                    href="https://chat.whatsapp.com/G5VbNKn2V2hKz7r0xL"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      background: "#25D366",
                      color: "#FFFFFF",
                      fontWeight: 700,
                      fontSize: "15px",
                      padding: "14px 20px",
                      borderRadius: "10px",
                      textDecoration: "none",
                      boxShadow: "0 4px 16px rgba(37, 211, 102, 0.3)",
                    }}
                  >
                    <MessageSquare size={18} />
                    <span>Join Attendee VIP WhatsApp Group</span>
                    <ExternalLink size={14} style={{ opacity: 0.8 }} />
                  </a>

                  <a
                    href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("Live AI Business Automation Webinar with Adnan Shaikh")}&details=${encodeURIComponent("ScalePods Live Interactive Workshop.\nHow Businesses Are Automating 60-80% of Repetitive Workflows.\n\nZoom Link sent to WhatsApp & Email.")}&dates=20261010T110000Z%2F20261010T123000Z`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      background: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      color: "#FFFFFF",
                      fontWeight: 600,
                      fontSize: "14px",
                      padding: "12px 20px",
                      borderRadius: "10px",
                      textDecoration: "none",
                    }}
                  >
                    <Calendar size={16} />
                    <span>Add to Google Calendar</span>
                    <ExternalLink size={14} style={{ opacity: 0.8 }} />
                  </a>
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--wb-text-muted)",
                    fontSize: "13px",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── DEDICATED COMPLIANCE FOOTER ───────────────────────────────────── */}
      <footer
        style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          background: "rgba(2, 4, 8, 0.9)",
          backdropFilter: "blur(20px)",
          padding: "48px 24px",
          textAlign: "center",
          fontSize: "13px",
          color: "var(--wb-text-faint)",
          position: "relative",
          zIndex: 3,
        }}
      >
        <div className="wb-container">
          <div style={{ marginBottom: "18px", display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative", width: "140px", height: "26px" }}>
              <Image
                src="/scalepods-navbar-logo.png"
                alt="ScalePods"
                fill
                sizes="140px"
                style={{ objectFit: "contain", filter: "invert(1)", opacity: 0.85 }}
              />
            </div>
          </div>

          <p style={{ maxWidth: "620px", margin: "0 auto 18px", color: "var(--wb-text-muted)", fontSize: "14px" }}>
            ScalePods architects autonomous AI workflow automation ecosystems across enterprise sales, marketing, HR and operational systems.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "22px", marginBottom: "20px" }}>
            <Link href="/privacy" style={{ color: "var(--wb-text-mid)", textDecoration: "none" }}>
              Privacy Policy
            </Link>
            <Link href="/terms" style={{ color: "var(--wb-text-mid)", textDecoration: "none" }}>
              Terms of Service
            </Link>
            <a
              href="#refund-policy"
              onClick={(e) => {
                e.preventDefault();
                alert("Cancellation & Refund Policy:\n\n1. Registrations for the ScalePods ₹99 Live AI Business Automation Webinar are non-refundable once confirmation access is issued.\n2. In the event of session rescheduling, your registration remains 100% valid for the rescheduled date.\n3. For any queries, write to info@scalepods.co.");
              }}
              style={{ color: "var(--wb-text-mid)", textDecoration: "none" }}
            >
              Cancellation & Refund Policy
            </a>
            <a href="mailto:info@scalepods.co" style={{ color: "var(--wb-text-mid)", textDecoration: "none" }}>
              Contact: info@scalepods.co
            </a>
          </div>

          <p style={{ fontSize: "12px", color: "var(--wb-text-faint)" }}>
            © {new Date().getFullYear()} ScalePods Inc. All rights reserved. Razorpay is a trademark of Razorpay Software Private Limited.
          </p>
        </div>
      </footer>
    </BeamsBackground>
  );
}
