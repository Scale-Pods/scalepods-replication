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
  Inbox,
  ArrowDown,
} from "lucide-react";
import { BeamsBackground } from "@/components/ui/beams-background";
import { getDetectedCountryCode } from "@/lib/country";
import "./webinar.css";

const webinarCountries = [
  { name: "India", code: "+91" },
  { name: "UAE", code: "+971" },
  { name: "US / CA", code: "+1" },
  { name: "UK", code: "+44" },
  { name: "Saudi Arabia", code: "+966" },
  { name: "Qatar", code: "+974" },
  { name: "Singapore", code: "+65" },
  { name: "Australia", code: "+61" },
  { name: "Germany", code: "+49" },
  { name: "France", code: "+33" },
  { name: "Japan", code: "+81" },
  { name: "Other", code: "Custom" },
];

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
    countryCode: "+91",
    customCode: "",
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

  // Detect user's country code on client mount
  useEffect(() => {
    try {
      const detected = getDetectedCountryCode();
      const matched = webinarCountries.find((c) => c.code === detected);
      if (matched) {
        setFormData((prev) => ({ ...prev, countryCode: detected }));
      } else if (detected) {
        setFormData((prev) => ({ ...prev, countryCode: "Custom", customCode: detected }));
      }
    } catch {
      // fallback to +91 default
    }
  }, []);

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
      // Format phone number with selected country code
      const rawPhone = formData.phone.trim();
      const dial =
        formData.countryCode === "Custom"
          ? formData.customCode.trim()
            ? formData.customCode.trim().startsWith("+")
              ? formData.customCode.trim()
              : `+${formData.customCode.trim()}`
            : "+91"
          : formData.countryCode;
      const fullPhone = rawPhone.startsWith("+") ? rawPhone : `${dial} ${rawPhone}`;

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
        body: JSON.stringify({
          ...formData,
          phone: fullPhone,
        }),
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
        description: "AI Business Automation Live Masterclass Pass",
        image: "https://scalepods.co/favicon.ico",
        order_id: orderData.orderId,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: fullPhone.replace(/[\s-]/g, ""),
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
                phone: fullPhone,
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
                          item_name: "AI Business Automation Live Masterclass Pass",
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
                      content_name: "AI Business Automation Live Masterclass Pass",
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
          <div className="wb-navbar-actions">
            <div className="wb-nav-live-badge">
              <span className="wb-nav-pulse-dot" />
              <span>LIVE MASTERCLASS</span>
            </div>
            <button
              onClick={handleOpenModal}
              className="wb-button-primary wb-button-nav wb-btn-pulse-glow"
            >
              <span>Reserve for ₹99</span>
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
              <span className="wb-hero-pill-line1">A LIVE, FOUNDER-LED AI AUTOMATION MASTERCLASS</span>
              <span className="wb-hero-pill-break" />
              <span className="wb-hero-pill-line2"> WITH ADNAN SHEIKH &amp; RAUNAK KUMAR — SCALEPODS</span></span>
          </div>

          <h1 className="wb-hero-title">
            <span>YOUR BUSINESS DOESN’T NEED MORE PEOPLE.</span>{" "}
            <br className="hidden md:inline" />
            <span className="wb-hero-title-gradient">
              IT NEEDS BETTER SYSTEMS.</span>
          </h1>

          <p className="wb-hero-subtitle">
            Discover how AI-powered automation can eliminate repetitive work across{" "}
            <strong style={{ color: "#FFFFFF" }}>Sales, Marketing, HR &amp; Operations</strong> — and help your business scale without adding unnecessary complexity.
          </p>

          {/* 3 Pillars Glassmorphic Card */}
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
              <span className="wb-spec-title">[TO BE CONFIRMED]</span>
            </div>
            <div className="wb-spec-card">
              <span className="wb-spec-tag"><Clock size={12} style={{ display: "inline", marginRight: "4px" }} /> Time</span>
              <span className="wb-spec-title">[TO BE CONFIRMED]</span>
            </div>
            <div className="wb-spec-card">
              <span className="wb-spec-tag"><Monitor size={12} style={{ display: "inline", marginRight: "4px" }} /> Format</span>
              <span className="wb-spec-title">Live Online</span>
            </div>
            <div className="wb-spec-card" style={{ background: "rgba(177, 217, 151, 0.06)", borderColor: "rgba(177, 217, 151, 0.3)" }}>
              <span className="wb-spec-tag" style={{ color: "#B1D997" }}><Ticket size={12} style={{ display: "inline", marginRight: "4px" }} /> Registration</span>
              <span className="wb-spec-title" style={{ color: "#B1D997" }}>ONLY ₹99/- <s style={{ fontSize: "12px", color: "var(--wb-text-faint)", marginLeft: "4px" }}>₹999</s></span>
            </div>
          </div>

          {/* Primary Action Button */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
            <button
              onClick={handleOpenModal}
              className="wb-button-primary wb-btn-pulse-glow wb-hero-cta"
              style={{ fontSize: "18px", padding: "18px 48px" }}
            >
              <span>RESERVE MY SEAT FOR ₹99</span>
              <ArrowRight size={20} />
            </button>
            <span style={{ fontSize: "14px", color: "var(--wb-text-muted)" }}>
              One small investment. One powerful look at how your business could work differently.</span>
          </div>

        </div>
      </section>

      {/* ── SECTION 1: BEFORE YOU HIRE ANOTHER PERSON (PROBLEM) ──────────── */}
      <section className="wb-section wb-section-bordered">
        <div className="wb-container wb-container-narrow">
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <div className="wb-pill-blue" style={{ marginBottom: "16px" }}>
              <span className="wb-dot-blue" />
              <span>THE EXPANSION TRAP</span>
            </div>
            <h2 style={{ fontSize: "clamp(22px, 4.5vw, 38px)", fontWeight: 800, color: "#FFFFFF", marginBottom: "14px", lineHeight: 1.25 }}>
              BEFORE YOU HIRE ANOTHER PERSON…<br />ASK YOURSELF THIS:
            </h2>
            <p style={{ fontSize: "18px", color: "var(--wb-text-mid)", maxWidth: "700px", margin: "0 auto", fontWeight: 600 }}>
              How much of your team&apos;s time is actually being spent on work that a well-designed AI workflow could handle?
            </p>
          </div>

          {/* The 8-Step Manual Chain Breakdown */}
          <div className="wb-glass-card" style={{ marginBottom: "32px", borderLeft: "4px solid #63A5E7" }}>
            <p style={{ fontSize: "16px", color: "#FFFFFF", fontWeight: 700, marginBottom: "18px" }}>
              Consider the chain reaction inside an ordinary business day:
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                "A lead comes in.",
                "Someone has to respond.",
                "Someone has to qualify it.",
                "Someone has to enter it into the CRM.",
                "Someone has to assign it.",
                "Someone has to follow up.",
                "Someone has to update the status.",
                "Someone has to report what happened.",
              ].map((step, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "12px", color: "var(--wb-text-mid)", fontSize: "15px" }}>
                  <span style={{ color: "#63A5E7", fontWeight: 800, minWidth: "26px" }}>0{idx + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "26px", paddingTop: "20px", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
              <p style={{ fontSize: "18px", color: "#FFFFFF", fontWeight: 700, marginBottom: "8px" }}>
                Now multiply that across dozens, hundreds, or thousands of interactions every month.
              </p>
              <p style={{ fontSize: "17px", color: "#B1D997", fontWeight: 700, marginBottom: "8px" }}>
                That&apos;s not a people problem. That&apos;s a systems problem.
              </p>
              <p style={{ fontSize: "15px", color: "var(--wb-text-muted)" }}>
                ScalePods&apos; own approach is built around removing repetitive work, reducing operational overhead, and helping lean teams scale without unnecessary complexity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2:THE HIDDEN COST OF MANUAL WORK ────────────────────── */}
      <section className="wb-section">
        <div className="wb-container">
          <div style={{ textAlign: "center", marginBottom: "44px" }}>
            <div className="wb-pill-eyebrow wb-pill-eyebrow-blue">
              <AlertTriangle size={14} />
              <span>OPERATIONAL FRICTION</span>
            </div>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.25, marginBottom: "14px" }}>
              THE HIDDEN COST OF MANUAL WORK
            </h2>
            <p style={{ fontSize: "17px", color: "var(--wb-text-muted)" }}>
              Your business may already be losing time and opportunities through:
            </p>
          </div>

          {/* 9 Red X Cards Grid */}
          <div className="wb-pain-grid-9" style={{ marginBottom: "36px" }}>
            {[
              "Slow lead responses",
              "Missed follow-ups",
              "Repetitive data entry",
              "Manual CRM updates",
              "Scattered information",
              "Tasks falling through the cracks",
              "Delayed reporting",
              "Too many disconnected tools",
              "Teams spending time on work that doesn't require human judgment",
            ].map((pain, idx) => (
              <div key={idx} className="wb-pain-card" style={{ background: "rgba(239, 68, 68, 0.05)", border: "1px solid rgba(239, 68, 68, 0.2)" }}>
                <XCircle size={18} color="#F87171" style={{ flexShrink: 0 }} />
                <span style={{ color: "#FEE2E2", fontWeight: 500 }}>{pain}</span>
              </div>
            ))}
          </div>

          {/* The Better Workflow Insight Box */}
          <div
            className="wb-glass-card"
            style={{
              maxWidth: "880px",
              margin: "0 auto",
              textAlign: "center",
              padding: "32px 28px",
              border: "1px solid rgba(177, 217, 151, 0.3)",
              background: "linear-gradient(180deg, rgba(8, 12, 18, 0.8) 0%, rgba(177, 217, 151, 0.06) 100%)",
            }}
          >
            <p style={{ fontSize: "16px", color: "var(--wb-text-muted)", marginBottom: "8px" }}>
              And the natural response is often:
            </p>
            <p style={{ fontSize: "18px", color: "#FFFFFF", fontWeight: 700, marginBottom: "16px" }}>
              “We need another employee.” <span style={{ color: "var(--wb-text-faint)", fontWeight: 400 }}>Or:</span> “We need another software.”
            </p>
            <div className="wb-insight-callout">
              BUT WHAT IF THE REAL ANSWER IS: A BETTER WORKFLOW?
            </div>
            <p style={{ fontSize: "14px", color: "var(--wb-text-muted)", margin: 0 }}>
              The webinar framework identifies slow responses, manual work, missed follow-ups and poor tracking as universal business problems across departments.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: WELCOME TO THE MASTERCLASS ────────────────────────── */}
      <section className="wb-section wb-section-bordered">
        <div className="wb-container wb-container-narrow" style={{ textAlign: "center" }}>
          <div className="wb-pill-eyebrow" style={{ marginBottom: "16px" }}>
            <Cpu size={14} />
            <span>AI AUTOMATION MASTERCLASS</span>
          </div>

          <h2 style={{ fontSize: "clamp(24px, 4.2vw, 42px)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.25, marginBottom: "18px" }}>
            WELCOME TO THE AI AUTOMATION MASTERCLASS
          </h2>

          <p style={{ fontSize: "20px", color: "#B1D997", fontWeight: 700, marginBottom: "18px" }}>
            How Businesses Are Automating 60–80% of Their Repetitive Workflows Using AI
          </p>

          <p style={{ fontSize: "16px", color: "var(--wb-text-mid)", lineHeight: 1.7, maxWidth: "720px", margin: "0 auto 32px" }}>
            This isn&apos;t another webinar where someone shows you 50 AI tools and tells you to “work smarter.”
            <br />
            <strong>We&apos;re going behind the scenes.</strong> You&apos;ll see how founders and business teams can think about:
          </p>

          {/* Visual Progression Pathway */}
          <div
            className="wb-glass-card wb-glass-card-green"
            style={{
              padding: "20px 28px",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              fontSize: "16px",
              fontWeight: 800,
              color: "#FFFFFF",
            }}
          >
            <span>Processes</span>
            <span style={{ color: "#B1D997" }}>→</span>
            <span>Workflows</span>
            <span style={{ color: "#63A5E7" }}>→</span>
            <span>Automation</span>
            <span style={{ color: "#B1D997" }}>→</span>
            <span>AI</span>
            <span style={{ color: "#63A5E7" }}>→</span>
            <span>Systems</span>
            <span style={{ color: "#B1D997" }}>→</span>
            <span style={{ color: "#B1D997", textDecoration: "underline" }}>Scale</span>
          </div>
        </div>
      </section>

      {/* ── SECTION 4:WHAT MAKES THIS WEBINAR DIFFERENT? ─────────────────── */}
      <section className="wb-section">
        <div className="wb-container wb-container-narrow">
          <div className="wb-glass-card wb-glass-card-blue" style={{ padding: "44px 38px", borderLeft: "4px solid #63A5E7" }}>
            <div className="wb-pill-eyebrow wb-pill-eyebrow-blue">
              <Layers size={14} />
              <span>THE CRUCIAL DIFFERENCE</span>
            </div>

            <h2 style={{ fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 800, color: "#FFFFFF", marginBottom: "16px", lineHeight: 1.25 }}>
              WHAT MAKES THIS WEBINAR DIFFERENT?
            </h2>

            <div
              style={{
                background: "rgba(99, 165, 231, 0.08)",
                border: "1px solid rgba(99, 165, 231, 0.3)",
                borderRadius: "14px",
                padding: "22px 26px",
                marginBottom: "24px",
              }}
            >
              <p style={{ fontSize: "19px", fontWeight: 800, color: "#FFFFFF", margin: "0 0 6px" }}>
                YOU&apos;RE NOT LEARNING FROM AI CONTENT CREATORS.
              </p>
              <p style={{ fontSize: "20px", fontWeight: 800, color: "#63A5E7", margin: 0 }}>
                YOU&apos;RE LEARNING FROM THE PEOPLE BUILDING THE SYSTEMS.
              </p>
            </div>

            <p style={{ fontSize: "16px", color: "var(--wb-text-mid)", lineHeight: 1.7, marginBottom: "14px" }}>
              This session brings together two ScalePods founders with complementary expertise.
            </p>
            <p style={{ fontSize: "15px", color: "var(--wb-text-mid)", lineHeight: 1.7, marginBottom: "8px" }}>
              • One brings the <strong style={{ color: "#B1D997" }}>business, sales and revenue perspective</strong>.
            </p>
            <p style={{ fontSize: "15px", color: "var(--wb-text-mid)", lineHeight: 1.7, marginBottom: "18px" }}>
              • The other brings the <strong style={{ color: "#63A5E7" }}>product, technology and AI systems perspective</strong>.
            </p>
            <p style={{ fontSize: "16px", color: "#FFFFFF", fontWeight: 600, lineHeight: 1.7 }}>
              Together, they&apos;ll show you how those two sides come together to create automation that actually works inside a business.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: MEET YOUR FOUNDERS & SPEAKERS (DUAL CARDS) ─────────── */}
      <section className="wb-section wb-section-bordered">
        <div className="wb-container">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div className="wb-pill-eyebrow">
              <Users size={14} />
              <span>YOUR INSTRUCTORS</span>
            </div>
            <h2 style={{ fontSize: "clamp(26px, 4.5vw, 42px)", fontWeight: 800, color: "#FFFFFF", marginBottom: "10px" }}>
              MEET YOUR FOUNDERS &amp; SPEAKERS
            </h2>
            <p style={{ fontSize: "17px", color: "var(--wb-text-muted)" }}>
              The Business Brain &amp; The Technology Brain Behind ScalePods
            </p>
          </div>

          <div className="wb-founders-grid">
            {/* Founder 1: Adnan Sheikh */}
            <div className="wb-glass-card wb-glass-card-green wb-founder-card">
              <div style={{ textAlign: "center", marginBottom: "22px" }}>
                <div
                  style={{
                    width: "190px",
                    height: "190px",
                    borderRadius: "50%",
                    margin: "0 auto 16px",
                    position: "relative",
                    border: "3px solid #B1D997",
                    padding: "5px",
                    boxShadow: "0 0 35px rgba(177, 217, 151, 0.25)",
                  }}
                >
                  <div style={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden", position: "relative" }}>
                    <Image
                      src="/images/team/adnan.jpeg"
                      alt="Adnan Sheikh — Co-Founder & CEO, ScalePods"
                      fill
                      sizes="190px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>

                <h3 style={{ fontSize: "24px", fontWeight: 800, color: "#FFFFFF", marginBottom: "4px" }}>
                  ADNAN SHEIKH
                </h3>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#B1D997", marginBottom: "12px" }}>
                  Co-Founder &amp; CEO — ScalePods
                </div>

                {/* Focus Tags */}
                <div
                  style={{
                    display: "inline-block",
                    background: "rgba(177, 217, 151, 0.08)",
                    border: "1px solid rgba(177, 217, 151, 0.25)",
                    borderRadius: "8px",
                    padding: "6px 12px",
                    fontSize: "12px",
                    color: "var(--wb-text-bright)",
                    fontWeight: 600,
                  }}
                >
                  Business Growth • Sales Systems • Revenue Operations • CRM Automation
                </div>
              </div>

              <div style={{ fontSize: "14px", color: "var(--wb-text-mid)", lineHeight: 1.7, display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
                <p>
                  <strong style={{ color: "#FFFFFF" }}>Adnan is the business and revenue brain behind ScalePods.</strong> With years of experience leading sales operations, revenue growth, and teams, Adnan has seen firsthand how much business productivity can be lost to repetitive prospecting, follow-ups, CRM updates and operational overhead.
                </p>
                <p>
                  At ScalePods, he focuses on client relationships, operational strategy, business development and scalable sales systems — helping businesses eliminate repetitive work and build more efficient paths to growth.
                </p>
              </div>

              {/* Key Question Callout */}
              <div
                style={{
                  marginTop: "20px",
                  background: "rgba(255, 255, 255, 0.04)",
                  borderLeft: "3px solid #B1D997",
                  padding: "14px 18px",
                  borderRadius: "0 10px 10px 0",
                }}
              >
                <span style={{ fontSize: "12px", textTransform: "uppercase", color: "var(--wb-text-muted)", letterSpacing: "0.06em", display: "block" }}>
                  Adnan&apos;s Core Question:</span>
                <p style={{ fontSize: "15px", fontWeight: 700, color: "#FFFFFF", margin: "4px 0 0" }}>
                  “Where is your business losing time, money and opportunities — and what can be automated?”
                </p>
              </div>
            </div>

            {/* Founder 2: Raunak Kumar */}
            <div className="wb-glass-card wb-glass-card-blue wb-founder-card">
              <div style={{ textAlign: "center", marginBottom: "22px" }}>
                <div
                  style={{
                    width: "190px",
                    height: "190px",
                    borderRadius: "50%",
                    margin: "0 auto 16px",
                    position: "relative",
                    border: "3px solid #63A5E7",
                    padding: "5px",
                    boxShadow: "0 0 35px rgba(99, 165, 231, 0.25)",
                  }}
                >
                  <div style={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden", position: "relative" }}>
                    <Image
                      src="/images/team/raunak.jpeg"
                      alt="Raunak Kumar — Co-Founder, CTO & CPO, ScalePods"
                      fill
                      sizes="190px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>

                <h3 style={{ fontSize: "24px", fontWeight: 800, color: "#FFFFFF", marginBottom: "4px" }}>
                  RAUNAK KUMAR
                </h3>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#63A5E7", marginBottom: "12px" }}>
                  Co-Founder, CTO &amp; CPO — ScalePods
                </div>

                {/* Focus Tags */}
                <div
                  style={{
                    display: "inline-block",
                    background: "rgba(99, 165, 231, 0.08)",
                    border: "1px solid rgba(99, 165, 231, 0.25)",
                    borderRadius: "8px",
                    padding: "6px 12px",
                    fontSize: "12px",
                    color: "var(--wb-text-bright)",
                    fontWeight: 600,
                  }}
                >
                  AI Systems • Product Strategy • Technology • Automation • Business Growth
                </div>
              </div>

              <div style={{ fontSize: "14px", color: "var(--wb-text-mid)", lineHeight: 1.7, display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
                <p>
                  <strong style={{ color: "#FFFFFF" }}>Raunak brings the product and technology brain behind ScalePods.</strong> With experience across fintech, enterprise technology, product management and business growth, Raunak has worked on the other side of the problem: understanding how businesses can replace inefficient processes with better-designed digital products and intelligent systems.
                </p>
                <p>
                  At ScalePods, he leads product and technology, building AI-powered systems designed to help businesses scale faster, operate smarter and solve complex business challenges.
                </p>
              </div>

              {/* Key Question Callout */}
              <div
                style={{
                  marginTop: "20px",
                  background: "rgba(255, 255, 255, 0.04)",
                  borderLeft: "3px solid #63A5E7",
                  padding: "14px 18px",
                  borderRadius: "0 10px 10px 0",
                }}
              >
                <span style={{ fontSize: "12px", textTransform: "uppercase", color: "var(--wb-text-muted)", letterSpacing: "0.06em", display: "block" }}>
                  Raunak&apos;s Core Question:</span>
                <p style={{ fontSize: "15px", fontWeight: 700, color: "#FFFFFF", margin: "4px 0 0" }}>
                  “How do we actually design the AI-powered system that makes this happen?”
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: TWO FOUNDERS. TWO PERSPECTIVES. ONE PROBLEM. ───────── */}
      <section className="wb-section">
        <div className="wb-container wb-container-narrow">
          <div className="wb-dialogue-box" style={{ textAlign: "center" }}>
            <div className="wb-pill-eyebrow" style={{ marginBottom: "20px" }}>
              <Sparkles size={14} />
              <span>THE FOUNDER DIALOGUE</span>
            </div>

            <h2 style={{ fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 800, color: "#FFFFFF", marginBottom: "28px" }}>
              TWO FOUNDERS. TWO PERSPECTIVES. ONE BUSINESS PROBLEM.
            </h2>

            <div className="wb-dialogue-grid">
              <div style={{ background: "rgba(177, 217, 151, 0.06)", border: "1px solid rgba(177, 217, 151, 0.2)", borderRadius: "12px", padding: "20px" }}>
                <div style={{ fontSize: "12px", fontWeight: 800, color: "#B1D997", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>
                  Adnan asks:
                </div>
                <div style={{ fontSize: "18px", fontWeight: 700, color: "#FFFFFF" }}>
                  “What should we automate?”
                </div>
              </div>

              <div style={{ background: "rgba(99, 165, 231, 0.06)", border: "1px solid rgba(99, 165, 231, 0.2)", borderRadius: "12px", padding: "20px" }}>
                <div style={{ fontSize: "12px", fontWeight: 800, color: "#63A5E7", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>
                  Raunak asks:
                </div>
                <div style={{ fontSize: "18px", fontWeight: 700, color: "#FFFFFF" }}>
                  “How should we build it?”
                </div>
              </div>
            </div>

            <div
              style={{
                background: "linear-gradient(135deg, rgba(177, 217, 151, 0.12) 0%, rgba(99, 165, 231, 0.12) 100%)",
                border: "1px solid rgba(177, 217, 151, 0.35)",
                borderRadius: "14px",
                padding: "22px 28px",
                marginBottom: "16px",
              }}
            >
              <span style={{ fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.06em", color: "#B1D997", fontWeight: 700, display: "block", marginBottom: "6px" }}>
                And together:</span>
              <p style={{ fontSize: "20px", fontWeight: 800, color: "#FFFFFF", margin: 0 }}>
                “How can we turn repetitive business processes into intelligent systems?”
              </p>
            </div>

            <p style={{ fontSize: "16px", color: "var(--wb-text-mid)", margin: 0, fontWeight: 500 }}>
              That&apos;s the conversation you get inside this masterclass.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: THIS IS NOT A "LEARN AI TOOLS" WEBINAR ────────────── */}
      <section className="wb-section wb-section-bordered">
        <div className="wb-container wb-container-narrow">
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <div className="wb-pill-eyebrow wb-pill-eyebrow-blue">
              <Zap size={14} />
              <span>NO HYPE. NO FLUFF.</span>
            </div>
            <h2 style={{ fontSize: "clamp(22px, 4vw, 38px)", fontWeight: 800, color: "#FFFFFF", marginBottom: "14px" }}>
              THIS IS NOT A “LEARN AI TOOLS” WEBINAR.
            </h2>
            <p style={{ fontSize: "16px", color: "var(--wb-text-muted)" }}>
              We aren&apos;t going to overwhelm you with ephemeral tools or technical jargon.
            </p>
          </div>

          <div className="wb-comparison-grid">
            {/* Left: What We Won't Do */}
            <div className="wb-glass-card" style={{ borderTop: "4px solid #EF4444" }}>
              <div style={{ fontSize: "15px", fontWeight: 700, color: "#FCA5A5", marginBottom: "16px" }}>
                We aren&apos;t going to overwhelm you with:
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {[
                  "100 AI tools",
                  "Technical jargon",
                  "Complicated coding",
                  "Generic productivity hacks",
                  "AI hype",
                ].map((item, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", color: "#FEE2E2" }}>
                    <XCircle size={17} color="#EF4444" style={{ flexShrink: 0 }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: What You Will Learn */}
            <div className="wb-glass-card wb-glass-card-green" style={{ borderTop: "4px solid #B1D997" }}>
              <div style={{ fontSize: "15px", fontWeight: 700, color: "#B1D997", marginBottom: "16px" }}>
                Instead, you&apos;ll learn how to identify:
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {[
                  "WHAT TO AUTOMATE",
                  "WHY TO AUTOMATE IT",
                  "HOW THE WORKFLOW SHOULD WORK",
                  "WHERE AI ACTUALLY ADDS VALUE",
                  "HOW DIFFERENT SYSTEMS CONNECT",
                ].map((item, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", color: "#FFFFFF", fontWeight: 700 }}>
                    <CheckCircle2 size={17} color="#B1D997" style={{ flexShrink: 0 }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p style={{ textAlign: "center", fontSize: "14px", color: "var(--wb-text-muted)", margin: 0 }}>
            The webinar framework itself recommends focusing on patterns rather than simply teaching tools, with positioning around workflows, systems, processes, response time and efficiency.
          </p>
        </div>
      </section>

      {/* ── SECTION 8:THE 4-LAYER AUTOMATION SYSTEM ─────────────────────── */}
      <section className="wb-section">
        <div className="wb-container">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div className="wb-pill-eyebrow">
              <Cpu size={14} />
              <span>THE PROPRIETARY FRAMEWORK</span>
            </div>
            <h2 style={{ fontSize: "clamp(24px, 4.5vw, 42px)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.25, marginBottom: "14px" }}>
              THE 4-LAYER AUTOMATION SYSTEM
            </h2>
            <p style={{ fontSize: "17px", color: "var(--wb-text-muted)", maxWidth: "760px", margin: "0 auto" }}>
              During the session, you&apos;ll be introduced to a practical framework for thinking about business automation:
            </p>
          </div>

          <div className="wb-layer-grid">
            {[
              {
                num: "01",
                name: "CAPTURE",
                desc: "Capture the lead, application, enquiry, request or task.",
                tag: "Universal Ingestion",
              },
              {
                num: "02",
                name: "RESPOND",
                desc: "Trigger the right response instantly.",
                tag: "Sub-Minute Response",
              },
              {
                num: "03",
                name: "QUALIFY",
                desc: "Use rules, data and AI to determine what should happen next.",
                tag: "Intelligent Triage",
              },
              {
                num: "04",
                name: "SYNC + FOLLOW-UP",
                desc: "Update systems, notify people and automatically trigger the next action.",
                tag: "Autonomous Orchestration",
              },
            ].map((layer, idx) => (
              <div key={idx} className="wb-layer-box">
                <span className="wb-layer-index">{layer.num}</span>
                <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#FFFFFF", marginBottom: "10px" }}>
                  {layer.name}
                </h3>
                <p style={{ fontSize: "15px", color: "var(--wb-text-mid)", lineHeight: 1.6, marginBottom: "18px" }}>
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
                  {layer.tag}</span>
              </div>
            ))}
          </div>

          {/* Signature Framework Bar */}
          <div
            className="wb-glass-card wb-glass-card-green"
            style={{
              padding: "20px 28px",
              textAlign: "center",
              maxWidth: "840px",
              margin: "0 auto",
            }}
          >
            <div style={{ fontSize: "18px", fontWeight: 800, color: "#FFFFFF", marginBottom: "6px" }}>
              <span style={{ color: "#B1D997" }}>CAPTURE</span> → <span style={{ color: "#63A5E7" }}>RESPOND</span> → <span style={{ color: "#B1D997" }}>QUALIFY</span> → <span style={{ color: "#63A5E7" }}>SYNC + FOLLOW-UP</span>
            </div>
            <span style={{ fontSize: "13px", color: "var(--wb-text-muted)" }}>
              This is the signature four-layer framework outlined in the webinar material.</span>
          </div>
        </div>
      </section>

      {/* ── SECTION 9: MULTI-DEPARTMENT AUTOMATION USE CASES ──────────────── */}
      <section className="wb-section wb-section-bordered">
        <div className="wb-container">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div className="wb-pill-eyebrow">
              <Briefcase size={14} />
              <span>DEPARTMENT ARCHITECTURES</span>
            </div>
            <h2 style={{ fontSize: "clamp(24px, 4.5vw, 42px)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.25, marginBottom: "14px" }}>
              SEE HOW THIS WORKS ACROSS YOUR BUSINESS
            </h2>
            <p style={{ fontSize: "17px", color: "var(--wb-text-muted)" }}>
              One underlying logic engine deployed across critical operational tracks:
            </p>
          </div>

          <div className="wb-dept-grid">
            {/* Sales Pod */}
            <div className="wb-glass-card wb-glass-card-green">
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", borderRadius: "10px", background: "rgba(177, 217, 151, 0.12)", border: "1px solid rgba(177, 217, 151, 0.25)" }}>
                  <TrendingUp size={18} color="#B1D997" />
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#FFFFFF" }}> SALES</h3>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 18px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px", color: "var(--wb-text-mid)" }}>
                {[
                  "Lead comes in",
                  "Instant WhatsApp / AI response",
                  "Qualification",
                  "Lead categorization",
                  "CRM update",
                  "Assignment",
                  "Automated follow-up",
                ].map((pt, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ color: "#B1D997", fontWeight: 700 }}>↓</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <div style={{ paddingTop: "14px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", fontSize: "13px", fontWeight: 700, color: "#B1D997" }}>
                Result? Your team spends less time chasing and more time selling.
              </div>
            </div>

            {/* Marketing Pod */}
            <div className="wb-glass-card wb-glass-card-blue">
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", borderRadius: "10px", background: "rgba(99, 165, 231, 0.12)", border: "1px solid rgba(99, 165, 231, 0.25)" }}>
                  <Zap size={18} color="#63A5E7" />
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#FFFFFF" }}> MARKETING</h3>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 18px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px", color: "var(--wb-text-mid)" }}>
                {[
                  "Lead captured",
                  "Nurture workflow",
                  "Campaign tracking",
                  "Data synchronization",
                  "Follow-up",
                ].map((pt, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ color: "#63A5E7", fontWeight: 700 }}>↓</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <div style={{ paddingTop: "14px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", fontSize: "13px", fontWeight: 700, color: "#63A5E7" }}>
                Result? Less manual campaign management. Better visibility.
              </div>
            </div>

            {/* HR Pod */}
            <div className="wb-glass-card wb-glass-card-green">
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", borderRadius: "10px", background: "rgba(177, 217, 151, 0.12)", border: "1px solid rgba(177, 217, 151, 0.25)" }}>
                  <Users size={18} color="#B1D997" />
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#FFFFFF" }}> HR</h3>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 18px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px", color: "var(--wb-text-mid)" }}>
                {[
                  "Candidate applies",
                  "AI-assisted screening",
                  "Candidate categorization",
                  "Interview scheduling",
                  "Follow-up",
                ].map((pt, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ color: "#B1D997", fontWeight: 700 }}>↓</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <div style={{ paddingTop: "14px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", fontSize: "13px", fontWeight: 700, color: "#B1D997" }}>
                Result? Less repetitive coordination. Faster movement through hiring.
              </div>
            </div>

            {/* Operations Pod */}
            <div className="wb-glass-card wb-glass-card-blue">
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", borderRadius: "10px", background: "rgba(99, 165, 231, 0.12)", border: "1px solid rgba(99, 165, 231, 0.25)" }}>
                  <Cpu size={18} color="#63A5E7" />
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#FFFFFF" }}> OPERATIONS</h3>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 18px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px", color: "var(--wb-text-mid)" }}>
                {[
                  "Task/request arrives",
                  "Task creation",
                  "Assignment",
                  "Tracking",
                  "Reporting",
                ].map((pt, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ color: "#63A5E7", fontWeight: 700 }}>↓</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <div style={{ paddingTop: "14px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", fontSize: "13px", fontWeight: 700, color: "#63A5E7" }}>
                Result? Better visibility. Fewer things falling through the cracks.
              </div>
            </div>
          </div>

          <p style={{ textAlign: "center", fontSize: "14px", color: "var(--wb-text-muted)", margin: 0 }}>
            These examples follow the multi-department automation use cases in the webinar framework.
          </p>
        </div>
      </section>

      {/* ── SECTION 10: THEN WE SHOW YOU THE SYSTEM (LIVE DEMO) ──────────── */}
      <section className="wb-section">
        <div className="wb-container">
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <div className="wb-pill-eyebrow">
              <Monitor size={14} />
              <span>LIVE EXECUTION ARCHITECTURE</span>
            </div>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 42px)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.25, marginBottom: "14px" }}>
              THEN WE SHOW YOU THE SYSTEM.
            </h2>
            <p style={{ fontSize: "19px", color: "#B1D997", fontWeight: 700 }}>
              Not just slides. Not just theory. A LIVE WORKFLOW DEMONSTRATION.
            </p>
          </div>

          <div className="wb-demo-pipeline-box">
            {/* Terminal Console Header */}
            <div className="wb-demo-console-header">
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div className="wb-demo-mac-dots">
                  <span className="wb-demo-dot" style={{ background: "#EF4444" }} />
                  <span className="wb-demo-dot" style={{ background: "#F59E0B" }} />
                  <span className="wb-demo-dot" style={{ background: "#10B981" }} />
                </div>
                <span style={{ fontFamily: "monospace", fontSize: "12px", color: "var(--wb-text-bright)", fontWeight: 600 }}>
                  ScalePods Autonomous Workflow Engine • Live Interactive Simulation</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span className="wb-nav-pulse-dot" style={{ width: "8px", height: "8px", background: "#B1D997", boxShadow: "0 0 10px #B1D997" }} />
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#B1D997", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Ready For Live Masterclass Demo</span>
              </div>
            </div>

            <div style={{ textAlign: "center", marginBottom: "26px" }}>
              <span style={{ fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--wb-text-muted)", display: "block" }}>
                You&apos;ll see what happens when real business data moves through a 7-stage autonomous pipeline:</span>
            </div>

            {/* Row 1: Stages 01 to 04 */}
            <div className="wb-demo-row">
              {/* Stage 01 */}
              <div className="wb-demo-node">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                  <span className="wb-demo-step-num">STAGE 01</span>
                  <div className="wb-demo-step-icon">
                    <Inbox size={18} color="#B1D997" />
                  </div>
                </div>
                <h4 className="wb-demo-step-title">A LEAD ENTERS</h4>
                <p className="wb-demo-step-sub">Multi-channel intake via Ads, Forms, WhatsApp &amp; Chat</p>
              </div>

              <div className="wb-demo-arrow-h">
                <ArrowRight size={18} />
              </div>

              {/* Stage 02 */}
              <div className="wb-demo-node">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                  <span className="wb-demo-step-num" style={{ color: "#63A5E7", borderColor: "rgba(99, 165, 231, 0.25)", background: "rgba(99, 165, 231, 0.12)" }}>STAGE 02</span>
                  <div className="wb-demo-step-icon">
                    <Zap size={18} color="#63A5E7" />
                  </div>
                </div>
                <h4 className="wb-demo-step-title">AI RESPONDS</h4>
                <p className="wb-demo-step-sub">Instant contextual reply sent sub-minute (&lt;60s)</p>
              </div>

              <div className="wb-demo-arrow-h">
                <ArrowRight size={18} />
              </div>

              {/* Stage 03 */}
              <div className="wb-demo-node">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                  <span className="wb-demo-step-num">STAGE 03</span>
                  <div className="wb-demo-step-icon">
                    <ShieldCheck size={18} color="#B1D997" />
                  </div>
                </div>
                <h4 className="wb-demo-step-title">QUALIFICATION</h4>
                <p className="wb-demo-step-sub">Structured logic checks budget, timeline &amp; intent</p>
              </div>

              <div className="wb-demo-arrow-h">
                <ArrowRight size={18} />
              </div>

              {/* Stage 04 */}
              <div className="wb-demo-node">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                  <span className="wb-demo-step-num" style={{ color: "#63A5E7", borderColor: "rgba(99, 165, 231, 0.25)", background: "rgba(99, 165, 231, 0.12)" }}>STAGE 04</span>
                  <div className="wb-demo-step-icon">
                    <Layers size={18} color="#63A5E7" />
                  </div>
                </div>
                <h4 className="wb-demo-step-title">CATEGORIZATION</h4>
                <p className="wb-demo-step-sub">Scored and tagged by deal priority &amp; department</p>
              </div>
            </div>

            {/* Continuous Bridge Between Rows */}
            <div className="wb-demo-row-bridge">
              <span className="wb-demo-row-bridge-line" />
              <span>CONTINUOUS AUTONOMOUS PIPELINE HAND-OFF <ArrowDown size={14} style={{ display: "inline", verticalAlign: "middle", marginLeft: "4px" }} /></span>
              <span className="wb-demo-row-bridge-line" />
            </div>

            {/* Row 2: Stages 05 to 07 */}
            <div className="wb-demo-row">
              {/* Stage 05 */}
              <div className="wb-demo-node">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                  <span className="wb-demo-step-num">STAGE 05</span>
                  <div className="wb-demo-step-icon">
                    <Users size={18} color="#B1D997" />
                  </div>
                </div>
                <h4 className="wb-demo-step-title">REP ASSIGNED</h4>
                <p className="wb-demo-step-sub">Direct alert &amp; calendar invite routed to account owner</p>
              </div>

              <div className="wb-demo-arrow-h">
                <ArrowRight size={18} />
              </div>

              {/* Stage 06 */}
              <div className="wb-demo-node">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                  <span className="wb-demo-step-num" style={{ color: "#63A5E7", borderColor: "rgba(99, 165, 231, 0.25)", background: "rgba(99, 165, 231, 0.12)" }}>STAGE 06</span>
                  <div className="wb-demo-step-icon">
                    <Cpu size={18} color="#63A5E7" />
                  </div>
                </div>
                <h4 className="wb-demo-step-title">CRM UPDATED</h4>
                <p className="wb-demo-step-sub">Contact, deal stage &amp; notes synced with zero data entry</p>
              </div>

              <div className="wb-demo-arrow-h">
                <ArrowRight size={18} />
              </div>

              {/* Stage 07 */}
              <div className="wb-demo-node wb-demo-node-active">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                  <span className="wb-demo-step-num" style={{ background: "rgba(177, 217, 151, 0.2)", borderColor: "#B1D997" }}>STAGE 07</span>
                  <div className="wb-demo-step-icon" style={{ background: "rgba(177, 217, 151, 0.15)", borderColor: "rgba(177, 217, 151, 0.4)" }}>
                    <CheckCircle2 size={18} color="#B1D997" />
                  </div>
                </div>
                <h4 className="wb-demo-step-title" style={{ color: "#B1D997" }}>FOLLOW-UP TRIGGERED</h4>
                <p className="wb-demo-step-sub">Automated multi-touch nurture sequence queued</p>
              </div>
            </div>

            {/* Bottom Callout & Action Bar */}
            <div className="wb-demo-bottom-action">
              <div className="wb-demo-bottom-desc">
                <Sparkles size={20} color="#B1D997" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: "14px", color: "var(--wb-text-mid)", lineHeight: 1.5 }}>
                  The masterclass specifically demonstrates this <strong>exact workflow live on screen</strong> — watching real business data move end-to-end without human friction.
                </span>
              </div>
              <button
                onClick={handleOpenModal}
                className="wb-button-primary wb-btn-pulse-glow"
                style={{ padding: "12px 24px", fontSize: "14px", whiteSpace: "nowrap" }}
              >
                <span>Watch Live Demo (₹99)</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 11:THE BIG IDEA ─────────────────────────────────────── */}
      <section className="wb-section wb-section-bordered">
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
            <h2 style={{ fontSize: "clamp(22px, 4vw, 38px)", fontWeight: 800, color: "#FFFFFF", marginBottom: "18px" }}>
              THE BIG IDEA
            </h2>

            <div className="wb-realization-grid">
              {[
                "A lead.",
                "A candidate.",
                "A customer enquiry.",
                "An internal request.",
                "A support ticket.",
                "A marketing response.",
                "A finance task.",
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "10px",
                    padding: "12px 16px",
                    fontSize: "14px",
                    color: "var(--wb-text-bright)",
                    fontWeight: 600,
                  }}
                >
                  {item}
                </div>
              ))}
            </div>

            <p style={{ fontSize: "18px", color: "var(--wb-text-mid)", lineHeight: 1.7, maxWidth: "720px", margin: "0 auto 24px" }}>
              They may look completely different.
              <br />
              <strong style={{ color: "#FFFFFF" }}>But underneath… THEY ARE ALL WORKFLOWS.</strong>
            </p>

            <div
              style={{
                fontSize: "16px",
                color: "#FFFFFF",
                background: "linear-gradient(135deg, rgba(177, 217, 151, 0.12) 0%, rgba(99, 165, 231, 0.12) 100%)",
                border: "1px solid rgba(177, 217, 151, 0.35)",
                borderRadius: "12px",
                padding: "20px 24px",
                display: "inline-block",
                lineHeight: 1.7,
              }}
            >
              <span>And workflows can be redesigned.</span><br />
              <span>Workflows can be connected.</span><br />
              <span>Workflows can be automated.</span><br />
              <strong style={{ color: "#B1D997" }}>And increasingly… WORKFLOWS CAN BE POWERED BY AI.</strong>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 12: WHAT YOU'LL LEARN (11 BLUEPRINTS) ────────────────── */}
      <section className="wb-section">
        <div className="wb-container">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div className="wb-pill-eyebrow">
              <CheckCircle2 size={14} />
              <span>CURRICULUM BLUEPRINTS</span>
            </div>
            <h2 style={{ fontSize: "clamp(24px, 4.5vw, 42px)", fontWeight: 800, color: "#FFFFFF", marginBottom: "12px" }}>
              WHAT YOU’LL LEARN
            </h2>
            <p style={{ fontSize: "17px", color: "var(--wb-text-muted)" }}>
              By the end of this live session, you&apos;ll understand:
            </p>
          </div>

          <div className="wb-takeaways-grid">
            {[
              "How to identify repetitive processes worth automating",
              "How to separate tasks that need humans from tasks that don't",
              "How AI can fit into existing business workflows",
              "How the 4-Layer Automation System works",
              "How Sales workflows can capture, qualify and follow up with leads",
              "How Marketing workflows can automate lead nurturing and tracking",
              "How HR workflows can automate screening and scheduling",
              "How Operations workflows can automate task assignment and reporting",
              "How AI, automation platforms, CRM systems and business tools can work together",
              "How to think about automation from both a business and technology perspective",
              "How to start identifying your own highest-impact automation opportunities",
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
                  {item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 13: BUSINESS BRAIN + TECHNOLOGY BRAIN ────────────────── */}
      <section className="wb-section wb-section-bordered">
        <div className="wb-container wb-container-narrow" style={{ textAlign: "center" }}>
          <div className="wb-pill-eyebrow" style={{ marginBottom: "16px" }}>
            <Sparkles size={14} />
            <span>THE DUAL ENGINE</span>
          </div>

          <h2 style={{ fontSize: "clamp(22px, 4vw, 38px)", fontWeight: 800, color: "#FFFFFF", marginBottom: "10px" }}>
            FROM THE BUSINESS BRAIN + THE TECHNOLOGY BRAIN
          </h2>
          <p style={{ fontSize: "18px", color: "#B1D997", fontWeight: 700, marginBottom: "32px" }}>
            YOU GET BOTH SIDES OF THE CONVERSATION.
          </p>

          <div className="wb-brain-grid">
            {/* Adnan's Brain */}
            <div className="wb-glass-card wb-glass-card-green" style={{ padding: "26px" }}>
              <div style={{ fontSize: "20px", fontWeight: 800, color: "#FFFFFF", marginBottom: "4px" }}>
                ADNAN
              </div>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#B1D997", marginBottom: "12px" }}>
                Business → Sales → Revenue → Operations → Growth
              </div>
              <p style={{ fontSize: "16px", fontStyle: "italic", color: "#FFFFFF", fontWeight: 600, margin: 0 }}>
                “What&apos;s costing the business time and opportunities?”
              </p>
            </div>

            {/* Raunak's Brain */}
            <div className="wb-glass-card wb-glass-card-blue" style={{ padding: "26px" }}>
              <div style={{ fontSize: "20px", fontWeight: 800, color: "#FFFFFF", marginBottom: "4px" }}>
                RAUNAK
              </div>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#63A5E7", marginBottom: "12px" }}>
                Product → Technology → AI → Automation → Systems
              </div>
              <p style={{ fontSize: "16px", fontStyle: "italic", color: "#FFFFFF", fontWeight: 600, margin: 0 }}>
                “How do we turn that problem into a scalable system?”
              </p>
            </div>
          </div>

          {/* Synthesis Equation */}
          <div className="wb-brain-equation">
            <span style={{ color: "#B1D997" }}>TOGETHER:</span> Business Problem → Workflow → AI → Automation → <span style={{ color: "#B1D997" }}>Business Outcome</span>
          </div>
        </div>
      </section>

      {/* ── SECTION 14:WHY SCALEPODS? ────────────────────────────────────── */}
      <section className="wb-section">
        <div className="wb-container">
          <div style={{ textAlign: "center", marginBottom: "44px" }}>
            <div className="wb-pill-eyebrow">
              <ShieldCheck size={14} />
              <span>ABOUT THE ARCHITECTS</span>
            </div>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 800, color: "#FFFFFF", marginBottom: "12px" }}>
              WHY SCALEPODS?
            </h2>
            <p style={{ fontSize: "16px", color: "var(--wb-text-mid)", maxWidth: "800px", margin: "0 auto", lineHeight: 1.7 }}>
              ScalePods&apos; mission is to design and deploy practical AI solutions that simplify operations, increase productivity and help businesses grow without adding complexity.
            </p>
          </div>

          {/* 5 Pillars Grid */}
          <div className="wb-pillars-grid" style={{ marginBottom: "36px" }}>
            {[
              {
                title: "Faster Operations",
                desc: "Move work through systems instead of leaving it sitting in inboxes.",
              },
              {
                title: "Lower Manual Effort",
                desc: "Remove repetitive, rule-based work from human hands where appropriate.",
              },
              {
                title: "Better Client Experiences",
                desc: "Improve response times and reduce dropped handoffs.",
              },
              {
                title: "Higher Team Productivity",
                desc: "Give people more time for work that actually moves the business forward.",
              },
              {
                title: "Sustainable Growth",
                desc: "Build systems that can continue working as the business scales.",
              },
            ].map((pillar, i) => (
              <div key={i} className="wb-glass-card" style={{ padding: "22px 18px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <CheckCircle2 size={16} color="#B1D997" />
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#FFFFFF" }}>{pillar.title}</h3>
                </div>
                <p style={{ fontSize: "13.5px", color: "var(--wb-text-muted)", margin: 0, lineHeight: 1.5 }}>
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Philosophy Banner */}
          <div
            className="wb-glass-card wb-glass-card-green"
            style={{
              padding: "24px 32px",
              textAlign: "center",
              maxWidth: "840px",
              margin: "0 auto",
            }}
          >
            <span style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--wb-text-muted)", display: "block", marginBottom: "8px" }}>
              Our Core Philosophy</span>
            <p style={{ fontSize: "21px", fontWeight: 800, color: "#FFFFFF", margin: 0 }}>
              “Growth should not require more manual work. It should require better systems.”
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 15: AUDIENCE QUALIFIER ───────────────────────────────── */}
      <section className="wb-section wb-section-bordered">
        <div className="wb-container">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div className="wb-pill-eyebrow">
              <TrendingUp size={14} />
              <span>IS THIS FOR YOU?</span>
            </div>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 800, color: "#FFFFFF" }}>
              WHO SHOULD ATTEND?
            </h2>
          </div>

          <div className="wb-qualifier-grid">
            {/* Who Should Attend */}
            <div className="wb-glass-card wb-glass-card-green" style={{ borderTop: "4px solid #B1D997" }}>
              <h3 style={{ fontSize: "19px", fontWeight: 800, color: "#B1D997", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
                <CheckCircle2 size={20} />
                <span>Who Should Attend:</span>
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {[
                  { title: "FOUNDERS & ENTREPRENEURS", desc: "If you're scaling a business and constantly adding people to manage growing workloads." },
                  { title: "SALES LEADERS", desc: "If leads are coming in but response, qualification or follow-up isn't consistent." },
                  { title: "MARKETING LEADERS", desc: "If your marketing generates leads but too much of the journey remains manual." },
                  { title: "HR LEADERS", desc: "If screening, scheduling and candidate communication consume your team's time." },
                  { title: "OPERATIONS LEADERS", desc: "If tasks, approvals, reporting and internal coordination are becoming difficult to manage." },
                  { title: "BUSINESS & TECHNOLOGY LEADERS", desc: "If you want to understand how AI can become part of the operating system of your business." },
                ].map((aud, i) => (
                  <div key={i} style={{ borderBottom: i < 5 ? "1px solid rgba(255, 255, 255, 0.06)" : undefined, paddingBottom: i < 5 ? "12px" : undefined }}>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "#FFFFFF" }}>{aud.title}</div>
                    <div style={{ fontSize: "13px", color: "var(--wb-text-muted)", marginTop: "2px" }}>{aud.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* This Is Not For Everyone */}
            <div className="wb-glass-card wb-glass-card-blue" style={{ borderTop: "4px solid #63A5E7" }}>
              <h3 style={{ fontSize: "19px", fontWeight: 800, color: "#63A5E7", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                <AlertTriangle size={20} color="#63A5E7" />
                <span>THIS IS NOT FOR EVERYONE.</span>
              </h3>
              <p style={{ fontSize: "13px", color: "var(--wb-text-mid)", marginBottom: "14px" }}>
                If you&apos;re looking for:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
                {[
                  "“10 ChatGPT prompts you need today”",
                  "A basic introduction to AI",
                  "A random list of AI tools",
                  "Coding tutorials",
                  "AI hype without business application",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--wb-text-bright)", fontSize: "13px", background: "rgba(99, 165, 231, 0.06)", border: "1px solid rgba(99, 165, 231, 0.2)", padding: "10px 14px", borderRadius: "8px" }}>
                    <XCircle size={15} color="#63A5E7" style={{ flexShrink: 0 }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: "13px", color: "var(--wb-text-muted)", fontStyle: "italic", marginBottom: "14px" }}>
                This isn&apos;t that webinar.
              </p>
              <div style={{ paddingTop: "14px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", fontSize: "13.5px", color: "var(--wb-text-bright)" }}>
                <span style={{ color: "#B1D997", fontWeight: 700, display: "block", marginBottom: "6px" }}>
                  But if you&apos;re asking:</span>
                <span style={{ fontSize: "12.5px", color: "var(--wb-text-muted)", lineHeight: 1.5, display: "block" }}>
                  “Where can AI actually save my team time?” • “What should I automate first?” • “Can I automate lead follow-up?” • “Can AI help my sales team?” • “Can I reduce repetitive HR work?” • “Can my systems talk to each other?” • “How do I build an AI-powered workflow?”</span>
                <div style={{ marginTop: "14px", color: "#B1D997", fontWeight: 800, fontSize: "15px" }}>
                  YOU&apos;RE IN THE RIGHT ROOM.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 16:WHY ONLY ₹99? & SAVE YOUR SEAT CARD ──────────────── */}
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
              WHY ONLY ₹99?
            </h2>
            <p style={{ fontSize: "16px", color: "var(--wb-text-mid)", lineHeight: 1.7, maxWidth: "700px", margin: "0 auto 24px" }}>
              Because this isn&apos;t about selling you an expensive course before you&apos;ve even seen what is possible.
              <br />
              <strong style={{ color: "#FFFFFF" }}>We&apos;re keeping the barrier low.</strong>
            </p>

            <div className="wb-price-big-badge">
              LIVE FOUNDER-LED MASTERCLASS — ONLY ₹99/-
            </div>

            <p style={{ fontSize: "14px", color: "var(--wb-text-muted)", maxWidth: "660px", margin: "0 auto 28px" }}>
              You&apos;ll get access to a practical session led by the people actually building AI-powered systems at ScalePods.
            </p>

            {/* Fire Banner */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
                padding: "16px 22px",
                maxWidth: "600px",
                margin: "0 auto 34px",
                fontSize: "15px",
                fontWeight: 700,
                color: "#FFFFFF",
              }}
            >
              TWO FOUNDERS. ONE LIVE SESSION. REAL BUSINESS PROBLEMS. REAL AUTOMATION SYSTEMS. ₹99.
            </div>

            {/* Save Your Seat Grid */}
            <div className="wb-specs-row" style={{ marginBottom: "28px" }}>
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
                <span className="wb-spec-title">Live Online</span>
              </div>
              <div className="wb-spec-card" style={{ background: "rgba(177, 217, 151, 0.08)", borderColor: "rgba(177, 217, 151, 0.35)" }}>
                <span className="wb-spec-tag" style={{ color: "#B1D997" }}>Registration</span>
                <span className="wb-spec-title" style={{ color: "#B1D997" }}>₹99/-</span>
              </div>
            </div>

            <button
              onClick={handleOpenModal}
              className="wb-button-primary wb-btn-pulse-glow"
              style={{ fontSize: "18px", padding: "18px 48px", width: "100%", maxWidth: "440px", margin: "0 auto 12px" }}
            >
              <span>YES — I WANT MY ₹99 SEAT</span>
              <ArrowRight size={20} />
            </button>
            <div style={{ fontSize: "13px", color: "var(--wb-text-faint)" }}>
              With Adnan Sheikh (Co-Founder &amp; CEO) &amp; Raunak Kumar (Co-Founder, CTO &amp; CPO)
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 17: FAQS ─────────────────────────────────────────────── */}
      <section className="wb-section wb-section-bordered">
        <div className="wb-container wb-container-narrow">
          <div style={{ textAlign: "center", marginBottom: "44px" }}>
            <div className="wb-pill-eyebrow">
              <MessageSquare size={14} />
              <span>CLEAR ANSWERS</span>
            </div>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 800, color: "#FFFFFF" }}>
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>

          <div className="wb-glass-card wb-faq-card">
            {[
              {
                q: "Is this only for technology companies?",
                a: "No. The framework is built around universal business workflows and can apply across Sales, Marketing, HR, Operations and other functions.",
              },
              {
                q: "Do I need technical knowledge?",
                a: "No. The focus is on understanding business workflows and how AI/automation can be applied to them.",
              },
              {
                q: "Will you demonstrate actual workflows?",
                a: "Yes. A live workflow demonstration is a core part of the session.",
              },
              {
                q: "Will both founders be speaking?",
                a: "Yes. The session is designed to bring together Adnan's business, sales and operational perspective with Raunak's product, technology and AI perspective.",
              },
              {
                q: "Is this just about AI tools?",
                a: "No. The emphasis is on systems, workflows and business outcomes, rather than simply learning a collection of tools.",
              },
              {
                q: "When is the webinar?",
                a: "Date & Time: [TO BE CONFIRMED]. Registered attendees will receive calendar invites, reminder emails, and direct access links once the date is finalized.",
              },
              {
                q: "How much does it cost?",
                a: "₹99/- only.",
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

      {/* ── SECTION 18: FINAL PROVOCATIVE CLOSING & DUAL FOUNDER CTA ─────── */}
      <section className="wb-section wb-section-final">
        <div className="wb-container wb-container-narrow" style={{ textAlign: "center" }}>
          <div className="wb-pill-eyebrow">
            <Sparkles size={14} />
            <span>FINAL TAKEAWAY</span>
          </div>

          <h2
            style={{
              fontSize: "clamp(26px, 4.5vw, 48px)",
              fontWeight: 800,
              lineHeight: 1.25,
              color: "#FFFFFF",
              marginBottom: "20px",
            }}
          >
            YOUR BUSINESS IS ALREADY RUNNING WORKFLOWS.
            <br />
            <span style={{ color: "#B1D997" }}>
              THE QUESTION IS: HOW MANY OF THEM ARE STILL MANUAL?</span>
          </h2>

          <div
            style={{
              fontSize: "16px",
              color: "var(--wb-text-mid)",
              lineHeight: 1.8,
              maxWidth: "760px",
              margin: "0 auto 36px",
            }}
          >
            <p style={{ marginBottom: "10px", color: "var(--wb-text-muted)" }}>
              Don&apos;t start with: <span style={{ color: "#FFFFFF" }}>“Which AI tool should I buy?”</span>
            </p>
            <p style={{ fontStyle: "italic", color: "#B1D997", fontWeight: 700, fontSize: "18px" }}>
              Start with: “Which repetitive business process should we stop doing manually?”
            </p>
          </div>

          {/* Join Adnan + Raunak Live Card */}
          <div className="wb-glass-card wb-glass-card-green wb-final-cta-card">
            <h3 style={{ fontSize: "24px", fontWeight: 800, color: "#FFFFFF", marginBottom: "8px" }}>
             JOIN ADNAN + RAUNAK LIVE
            </h3>
            <p style={{ fontSize: "16px", color: "#B1D997", fontWeight: 700, marginBottom: "18px" }}>
              DISCOVER HOW TO TURN MANUAL BUSINESS PROCESSES INTO AI-POWERED SYSTEMS.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "14px", fontSize: "14px", color: "var(--wb-text-bright)", marginBottom: "26px" }}>
              <span>Business strategy from the CEO</span> • <span>Technology &amp; product thinking from the CTO/CPO</span> • <span>Real workflows</span> • <span>Live demonstrations</span> • <span>Practical automation framework</span>
            </div>

            <div style={{ fontSize: "14px", color: "var(--wb-text-muted)", marginBottom: "20px" }}>
              Date: [TO BE CONFIRMED] &nbsp;|&nbsp; Time: [TO BE CONFIRMED]
            </div>

            <button
              onClick={handleOpenModal}
              className="wb-button-primary wb-btn-pulse-glow"
              style={{ fontSize: "18px", padding: "18px 48px", width: "100%", maxWidth: "440px", margin: "0 auto 16px" }}
            >
              <span>RESERVE MY SEAT FOR ₹99</span>
              <ArrowRight size={20} />
            </button>

            <span style={{ fontSize: "13px", color: "var(--wb-text-faint)", display: "block" }}>
              ScalePods — Growth, Automated.</span>
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
                AI Business Automation Masterclass
              </div>
              <div style={{ fontSize: "12px", color: "#B1D997" }}>
                With Adnan Sheikh &amp; Raunak Kumar • <strong>Only ₹99/-</strong> <s style={{ color: "var(--wb-text-faint)" }}>₹999</s>
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
                    Reserve Your Masterclass Seat
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--wb-text-muted)", marginTop: "4px" }}>
                    “How Businesses Are Automating 60–80% of Repetitive Workflows Using AI”
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
                  <span style={{ fontSize: "14px", color: "#FFFFFF", fontWeight: 600 }}>Masterclass Access Pass</span>
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
                    <label className="wb-form-label">WhatsApp Number (For session link &amp; reminders) *</label>
                    <div className="wb-phone-input-row">
                      <div className={`wb-country-select-wrapper ${formData.countryCode === "Custom" ? "wb-country-custom" : ""}`}>
                        <select
                          value={formData.countryCode}
                          onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                          className="wb-country-select"
                          disabled={isSubmitting || isVerifying}
                          aria-label="Country Code"
                        >
                          {webinarCountries.map((c) => (
                            <option key={c.name} value={c.code}>
                              {c.code === "Custom" ? "Other (+...)" : `${c.code} (${c.name})`}
                            </option>
                          ))}
                        </select>
                        <ChevronDown size={14} className="wb-country-arrow" />
                      </div>

                      {formData.countryCode === "Custom" && (
                        <input
                          type="text"
                          required
                          placeholder="+..."
                          value={formData.customCode}
                          onChange={(e) => setFormData({ ...formData, customCode: e.target.value })}
                          className="wb-custom-code-input"
                          disabled={isSubmitting || isVerifying}
                          aria-label="Custom dialing code"
                        />
                      )}

                      <input
                        type="tel"
                        required
                        placeholder="83790 62166"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="wb-phone-number-input"
                        disabled={isSubmitting || isVerifying}
                      />
                    </div>
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
                        <span>Opening Secure Payment...</span></span>
                    ) : isVerifying ? (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Verifying Payment...</span></span>
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
                  <span>PAYMENT VERIFIED &amp; CONFIRMED</span>
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
                        {paymentSuccessData.bookingId}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "12px" }}>
                      <span style={{ color: "var(--wb-text-muted)" }}>Order Reference</span>
                      <span style={{ color: "#63A5E7", fontFamily: "monospace", fontWeight: 600 }}>
                        {paymentSuccessData.orderId}</span>
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
                    href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("Live AI Business Automation Masterclass with Adnan Sheikh & Raunak Kumar")}&details=${encodeURIComponent("ScalePods Live Interactive Masterclass.\nHow Businesses Are Automating 60-80% of Repetitive Workflows.\n\nZoom Link sent to WhatsApp & Email.")}&dates=20261010T110000Z%2F20261010T123000Z`}
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
                alert("Cancellation & Refund Policy:\n\n1. Registrations for the ScalePods ₹99 Live AI Business Automation Masterclass are non-refundable once confirmation access is issued.\n2. In the event of session rescheduling, your registration remains 100% valid for the rescheduled date.\n3. For any queries, write to info@scalepods.co.");
              }}
              style={{ color: "var(--wb-text-mid)", textDecoration: "none" }}
            >
              Cancellation &amp; Refund Policy
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
