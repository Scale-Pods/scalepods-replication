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
  BrainCircuit,
  Flame,
  Sun,
  Moon,
  Globe,
  Video,
  Check,
  Settings,
  BarChart3,
  Plus,
  Database,
  Target,
  Megaphone,
} from "lucide-react";
import { BeamsBackground } from "@/components/ui/beams-background";
import { getDetectedCountryCode } from "@/lib/country";
import { useTheme } from "@/components/providers/ThemeProvider";
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
  const { resolvedTheme, setTheme } = useTheme();

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
                className="wb-navbar-logo-img"
                fill
                sizes="160px"
                priority
                loading="eager"
                style={{
                  objectFit: "contain",
                  objectPosition: "left center",
                  filter: resolvedTheme === "dark" ? "invert(1)" : "none",
                }}
              />
            </div>
          </Link>

          {/* Right Action Cluster */}
          <div className="wb-navbar-actions">
            <button
              type="button"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="wb-theme-toggle"
              aria-label="Toggle light or dark mode"
              title={resolvedTheme === "dark" ? "Switch to White Mode" : "Switch to Dark Mode"}
            >
              {resolvedTheme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <div className="wb-nav-live-badge">
              <span className="wb-nav-pulse-dot" />
              <span>LIVE MASTERCLASS</span>
            </div>
            <button
              onClick={handleOpenModal}
              className="wb-button-primary wb-button-nav wb-btn-pulse-glow"
            >
              <span className="wb-btn-nav-desktop">Reserve for ₹99</span>
              <span className="wb-btn-nav-mobile">Reserve ₹99</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* ── HERO SECTION (FULL SCREEN HERO WITH GEMINI BACKGROUND) ───── */}
      <section className="wb-section-fullscreen-hero">
        <div className="wb-hero-fullscreen-stage" style={{ position: "relative" }}>
          {/* High-Res WebP Background Canvas */}
          <Image
            src="/images/webinar-redesign/hero-bg.webp"
            alt="ScalePods Autonomous AI Business Systems"
            fill
            priority
            quality={90}
            sizes="100vw"
            className="wb-hero-canvas-img"
          />

          {/* Vignette edge lighting for seamless blending */}
          <div className="wb-hero-canvas-overlay" />

          {/* Top Pill Badge */}
          <div className="wb-hero-pill-fs">
            <span className="wb-hero-pill-asterisk">✳</span>
            <span className="wb-hero-pill-text-fs">
              A LIVE, FOUNDER-LED AI AUTOMATION MASTERCLASS WITH ADNAN SHEIKH &amp; RAUNAK KUMAR — SCALEPODS
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="wb-hero-title-fs">
            <span className="wb-hero-title-white-fs">
              YOUR BUSINESS DOESN’T NEED<br />MORE PEOPLE.
            </span>
            <span className="wb-hero-title-gradient-fs">
              IT NEEDS BETTER SYSTEMS.
            </span>
          </h1>

          {/* 4 Holographic Department Screen Labels */}
          <div className="wb-fs-dept-label wb-fs-label-sales">
            <span className="wb-fs-dept-dot wb-dot-green" />
            <span>SALES</span>
          </div>
          <div className="wb-fs-dept-label wb-fs-label-marketing">
            <span className="wb-fs-dept-dot wb-dot-blue" />
            <span>MARKETING</span>
          </div>
          <div className="wb-fs-dept-label wb-fs-label-hr">
            <span className="wb-fs-dept-dot wb-dot-green" />
            <span>HR</span>
          </div>
          <div className="wb-fs-dept-label wb-fs-label-operations">
            <span className="wb-fs-dept-dot wb-dot-blue" />
            <span>OPERATIONS</span>
          </div>

          {/* Interactive Glowing Button */}
          <button
            type="button"
            onClick={handleOpenModal}
            className="wb-fs-cta-button"
            aria-label="Register Now for ₹99"
          >
            <span className="wb-fs-btn-text">REGISTER NOW — ₹99</span>
            <span className="wb-fs-btn-arrow-circle">
              <ArrowRight size={17} />
            </span>
          </button>

          {/* Perfectly Synced Metadata Bar */}
          <div className="wb-fs-meta-bar">
            <div className="wb-fs-meta-item">
              <Calendar size={15} className="wb-icon-green" />
              <span>Live Masterclass</span>
            </div>
            <span className="wb-fs-meta-sep" />
            <div className="wb-fs-meta-item">
              <Clock size={15} className="wb-icon-green" />
              <span>3+ Hours</span>
            </div>
            <span className="wb-fs-meta-sep" />
            <div className="wb-fs-meta-item">
              <Monitor size={15} className="wb-icon-blue" />
              <span>Interactive + Live Q&amp;A</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 1: THE EXPANSION TRAP (FULLSCREEN CANVAS WITH 3D BACKGROUND) ── */}
      <section className="wb-section-fullscreen-expansion">
        <div className="wb-expansion-fullscreen-stage" style={{ position: "relative" }}>
          {/* High-Res WebP Fullscreen Background Canvas */}
          <Image
            src="/images/webinar-redesign/expansion-trap-bg.webp"
            alt="The Expansion Trap - Ask Yourself This"
            fill
            priority
            quality={90}
            sizes="100vw"
            className="wb-expansion-canvas-img"
          />

          {/* Vignette edge lighting for seamless blending */}
          <div className="wb-expansion-canvas-overlay" />

          {/* Top Pill Badge */}
          <div className="wb-expansion-pill-fs">
            <span className="wb-expansion-pill-dot" />
            <span>THE EXPANSION TRAP</span>
          </div>

          {/* Main Headline */}
          <h2 className="wb-expansion-title-fs">
            <span className="wb-expansion-title-white-fs">BEFORE YOU HIRE ANOTHER PERSON…</span>
            <span className="wb-expansion-title-gradient-fs">ASK YOURSELF THIS:</span>
          </h2>

          {/* Subtitle */}
          <p className="wb-expansion-subtitle-fs">
            How much of your team&apos;s time is actually being spent on work that a well-designed AI workflow could handle?
          </p>

          {/* The 8 Interactive Node Labels Overlaid Precisely on 3D Glowing Capsules */}
          <div className="wb-expansion-node-fs wb-node-1" style={{ left: "19.6%", top: "49.8%" }}>
            <span>Lead arrives</span>
          </div>
          <div className="wb-expansion-node-fs wb-node-2" style={{ left: "35.5%", top: "45.2%" }}>
            <span>Respond</span>
          </div>
          <div className="wb-expansion-node-fs wb-node-3" style={{ left: "53.8%", top: "47.2%" }}>
            <span>Qualify</span>
          </div>
          <div className="wb-expansion-node-fs wb-node-4" style={{ left: "69.0%", top: "50.8%" }}>
            <span>Update CRM</span>
          </div>
          <div className="wb-expansion-node-fs wb-node-5" style={{ left: "67.4%", top: "69.0%" }}>
            <span>Assign owner</span>
          </div>
          <div className="wb-expansion-node-fs wb-node-6" style={{ left: "52.0%", top: "73.0%" }}>
            <span>Follow up</span>
          </div>
          <div className="wb-expansion-node-fs wb-node-7" style={{ left: "35.5%", top: "73.0%" }}>
            <span>Update status</span>
          </div>
          <div className="wb-expansion-node-fs wb-node-8" style={{ left: "19.8%", top: "68.5%" }}>
            <span>Report results</span>
          </div>

          {/* Bottom Callout Banner aligned beside the green line in the canvas */}
          <div className="wb-expansion-callout-fs">
            <h3 className="wb-expansion-callout-title-fs">
              <span className="wb-callout-text-green">That&apos;s not a people problem.</span>{" "}
              <span className="wb-callout-text-cyan">That&apos;s a systems problem.</span>
            </h3>
            <p className="wb-expansion-callout-desc-fs">
              ScalePods removes repetitive work so lean teams can scale without unnecessary complexity.
            </p>
          </div>
        </div>

        {/* Mobile Sequential Breakdown (shown on small screens for crystal clear legibility) */}
        <div className="wb-expansion-mobile-wrapper">
          <div className="wb-container">
            <div className="wb-expansion-mobile-grid">
              {[
                { num: "01", label: "Lead arrives", desc: "Enquiry or application received", dot: "green" },
                { num: "02", label: "Respond", desc: "First response dispatch", dot: "blue" },
                { num: "03", label: "Qualify", desc: "Lead triage & intent check", dot: "green" },
                { num: "04", label: "Update CRM", desc: "Data entry & pipeline logging", dot: "blue" },
                { num: "05", label: "Assign owner", desc: "Routing to the right team member", dot: "green" },
                { num: "06", label: "Follow up", desc: "Multi-channel cadence follow up", dot: "blue" },
                { num: "07", label: "Update status", desc: "Activity & stage tracking", dot: "green" },
                { num: "08", label: "Report results", desc: "Manual reporting & summaries", dot: "blue" },
              ].map((step, idx) => (
                <div key={idx} className="wb-mobile-chain-card">
                  <span className={`wb-mobile-chain-num wb-mobile-chain-${step.dot}`}>
                    {step.num}
                  </span>
                  <div>
                    <h4 className="wb-mobile-chain-title">{step.label}</h4>
                    <p className="wb-mobile-chain-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: THE HIDDEN COST OF MANUAL WORK (FULLSCREEN 16:9 CANVAS STAGE) ── */}
      <section className="wb-section-fullscreen-cost">
        <div className="wb-cost-fullscreen-stage">
          {/* High-Res Fullscreen Background Canvas */}
          <Image
            src="/images/webinar-redesign/hidden-cost-bg.webp"
            alt="The Hidden Cost of Manual Work - Chaotic manual work transformed into automated workflows"
            fill
            priority
            quality={92}
            sizes="100vw"
            className="wb-cost-canvas-img"
          />

          {/* Vignette overlay for edge lighting and contrast */}
          <div className="wb-cost-canvas-overlay" />

          {/* Top Pill Badge */}
          <div className="wb-cost-pill-fs">
            <AlertTriangle size={13} className="wb-cost-pill-icon" />
            <span>THE HIDDEN COST</span>
          </div>

          {/* Main Headline */}
          <h2 className="wb-cost-title-fs">
            <span className="wb-cost-title-white-fs">THE HIDDEN COST OF</span>
            <span className="wb-cost-title-gradient-fs">MANUAL WORK</span>
          </h2>

          {/* Subtitle */}
          <p className="wb-cost-subtitle-fs">
            Your business may already be losing time and opportunities through:
          </p>

          {/* 3 Glassmorphic Cards Row */}
          <div className="wb-cost-cards-fs-grid">
            {/* Card 1: Lead Management */}
            <div className="wb-cost-card-fs wb-cost-card-lead">
              <div className="wb-cost-card-fs-header">
                <div className="wb-cost-card-fs-icon wb-icon-solid-green">
                  <Users size={18} />
                </div>
                <h3 className="wb-cost-card-fs-title wb-title-green">LEAD MANAGEMENT</h3>
              </div>
              <div className="wb-cost-card-fs-list">
                <div className="wb-cost-card-fs-item">
                  <XCircle size={16} className="wb-cost-x-icon" />
                  <span>Slow lead responses</span>
                </div>
                <div className="wb-cost-card-fs-item">
                  <XCircle size={16} className="wb-cost-x-icon" />
                  <span>Missed follow-ups</span>
                </div>
                <div className="wb-cost-card-fs-item">
                  <XCircle size={16} className="wb-cost-x-icon" />
                  <span>Leads falling through the cracks</span>
                </div>
              </div>
            </div>

            {/* Card 2: Operations */}
            <div className="wb-cost-card-fs wb-cost-card-ops">
              <div className="wb-cost-card-fs-header">
                <div className="wb-cost-card-fs-icon wb-icon-solid-blue">
                  <Settings size={18} />
                </div>
                <h3 className="wb-cost-card-fs-title wb-title-blue">OPERATIONS</h3>
              </div>
              <div className="wb-cost-card-fs-list">
                <div className="wb-cost-card-fs-item">
                  <XCircle size={16} className="wb-cost-x-icon" />
                  <span>Repetitive data entry</span>
                </div>
                <div className="wb-cost-card-fs-item">
                  <XCircle size={16} className="wb-cost-x-icon" />
                  <span>Manual CRM updates</span>
                </div>
                <div className="wb-cost-card-fs-item">
                  <XCircle size={16} className="wb-cost-x-icon" />
                  <span>Too many disconnected tools</span>
                </div>
              </div>
            </div>

            {/* Card 3: Visibility */}
            <div className="wb-cost-card-fs wb-cost-card-vis">
              <div className="wb-cost-card-fs-header">
                <div className="wb-cost-card-fs-icon wb-icon-solid-purple">
                  <BarChart3 size={18} />
                </div>
                <h3 className="wb-cost-card-fs-title wb-title-purple">VISIBILITY</h3>
              </div>
              <div className="wb-cost-card-fs-list">
                <div className="wb-cost-card-fs-item">
                  <XCircle size={16} className="wb-cost-x-icon" />
                  <span>Scattered information</span>
                </div>
                <div className="wb-cost-card-fs-item">
                  <XCircle size={16} className="wb-cost-x-icon" />
                  <span>Delayed reporting</span>
                </div>
                <div className="wb-cost-card-fs-item">
                  <XCircle size={16} className="wb-cost-x-icon" />
                  <span>Teams working without human judgment</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Callout Banner matching Slide 5 */}
          <div className="wb-cost-callout-fs">
            <div className="wb-cost-callout-icon-wrap">
              <BrainCircuit size={32} className="wb-cost-brain-icon" />
              <div className="wb-cost-callout-sep" />
            </div>
            <div className="wb-cost-callout-text-wrap">
              <div className="wb-cost-callout-line1-fs">THAT&apos;S NOT A PEOPLE PROBLEM.</div>
              <div className="wb-cost-callout-line2-fs">THAT&apos;S A SYSTEMS PROBLEM.</div>
            </div>
          </div>
        </div>

        {/* Mobile Sequential Breakdown */}
        <div className="wb-cost-mobile-wrapper">
          <div className="wb-container">
            <div className="wb-cost-mobile-header">
              <div className="wb-pill-eyebrow wb-pill-eyebrow-blue" style={{ marginBottom: "12px" }}>
                <AlertTriangle size={13} className="text-amber-400" />
                <span>THE HIDDEN COST</span>
              </div>
              <h2 className="wb-cost-title" style={{ fontSize: "28px" }}>
                THE HIDDEN COST OF{" "}
                <span className="wb-gradient-text-green-cyan">MANUAL WORK</span>
              </h2>
              <p className="wb-cost-subtitle" style={{ fontSize: "14px" }}>
                Your business may already be losing time and opportunities through:
              </p>
            </div>

            <div className="wb-cost-mobile-cards">
              {/* Card 1 */}
              <div className="wb-cost-card-fs wb-cost-card-lead" style={{ marginBottom: "14px" }}>
                <div className="wb-cost-card-fs-header">
                  <div className="wb-cost-card-fs-icon wb-icon-wrap-green">
                    <Users size={16} />
                  </div>
                  <h3 className="wb-cost-card-fs-title wb-title-green">LEAD MANAGEMENT</h3>
                </div>
                <div className="wb-cost-card-fs-list">
                  <div className="wb-cost-card-fs-item">
                    <XCircle size={15} color="#EF4444" className="wb-cost-x-icon" />
                    <span>Slow lead responses</span>
                  </div>
                  <div className="wb-cost-card-fs-item">
                    <XCircle size={15} color="#EF4444" className="wb-cost-x-icon" />
                    <span>Missed follow-ups</span>
                  </div>
                  <div className="wb-cost-card-fs-item">
                    <XCircle size={15} color="#EF4444" className="wb-cost-x-icon" />
                    <span>Leads falling through the cracks</span>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="wb-cost-card-fs wb-cost-card-ops" style={{ marginBottom: "14px" }}>
                <div className="wb-cost-card-fs-header">
                  <div className="wb-cost-card-fs-icon wb-icon-wrap-blue">
                    <Settings size={16} />
                  </div>
                  <h3 className="wb-cost-card-fs-title wb-title-blue">OPERATIONS</h3>
                </div>
                <div className="wb-cost-card-fs-list">
                  <div className="wb-cost-card-fs-item">
                    <XCircle size={15} color="#EF4444" className="wb-cost-x-icon" />
                    <span>Repetitive data entry</span>
                  </div>
                  <div className="wb-cost-card-fs-item">
                    <XCircle size={15} color="#EF4444" className="wb-cost-x-icon" />
                    <span>Manual CRM updates</span>
                  </div>
                  <div className="wb-cost-card-fs-item">
                    <XCircle size={15} color="#EF4444" className="wb-cost-x-icon" />
                    <span>Too many disconnected tools</span>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="wb-cost-card-fs wb-cost-card-vis" style={{ marginBottom: "14px" }}>
                <div className="wb-cost-card-fs-header">
                  <div className="wb-cost-card-fs-icon wb-icon-wrap-purple">
                    <BarChart3 size={16} />
                  </div>
                  <h3 className="wb-cost-card-fs-title wb-title-purple">VISIBILITY</h3>
                </div>
                <div className="wb-cost-card-fs-list">
                  <div className="wb-cost-card-fs-item">
                    <XCircle size={15} color="#EF4444" className="wb-cost-x-icon" />
                    <span>Scattered information</span>
                  </div>
                  <div className="wb-cost-card-fs-item">
                    <XCircle size={15} color="#EF4444" className="wb-cost-x-icon" />
                    <span>Delayed reporting</span>
                  </div>
                  <div className="wb-cost-card-fs-item">
                    <XCircle size={15} color="#EF4444" className="wb-cost-x-icon" />
                    <span>Teams working without human judgment</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="wb-cost-mobile-preview" style={{ position: "relative", width: "100%", aspectRatio: "16/9", borderRadius: "12px", overflow: "hidden", margin: "16px 0" }}>
              <Image
                src="/images/webinar-redesign/hidden-cost-bg.webp"
                alt="3D Automation Visual"
                fill
                quality={90}
                sizes="100vw"
                style={{ objectFit: "cover" }}
              />
            </div>

            <div className="wb-cost-callout-fs" style={{ position: "relative", bottom: "auto", left: "auto", transform: "none", width: "100%", margin: "16px 0 0" }}>
              <div className="wb-cost-callout-icon-wrap">
                <BrainCircuit size={28} color="#38BDF8" />
                <div className="wb-cost-callout-sep" />
              </div>
              <div className="wb-cost-callout-text-wrap">
                <div className="wb-cost-callout-line1-fs" style={{ fontSize: "12px" }}>THAT&apos;S NOT A PEOPLE PROBLEM.</div>
                <div className="wb-cost-callout-line2-fs" style={{ fontSize: "14px" }}>THAT&apos;S A SYSTEMS PROBLEM.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: THE AI AUTOMATION MASTERCLASS (FULLSCREEN 16:9 CANVAS STAGE) ── */}
      <section className="wb-section-fullscreen-masterclass" id="masterclass">
        <div className="wb-masterclass-fullscreen-stage">
          {/* High-Res Fullscreen Background Canvas */}
          <Image
            src="/images/webinar-redesign/masterclass-bg.webp"
            alt="The AI Automation Masterclass - ScalePods with Adnan Sheikh & Raunak Kumar"
            fill
            priority
            quality={92}
            sizes="100vw"
            className="wb-masterclass-canvas-img"
          />

          {/* Vignette edge lighting for seamless blending */}
          <div className="wb-masterclass-canvas-overlay" />

          {/* Left Content Area (Over the dark atmospheric left side) */}
          <div className="wb-masterclass-left-content">
            {/* Top Pill Eyebrow */}
            <div className="wb-masterclass-pill-fs">
              <Globe size={13} className="wb-masterclass-pill-icon" />
              <span>AI AUTOMATION MASTERCLASS</span>
            </div>

            {/* Headline */}
            <h2 className="wb-masterclass-title-fs">
              <span className="wb-masterclass-title-white-fs">THE AI AUTOMATION</span>
              <span className="wb-masterclass-title-gradient-fs">MASTERCLASS</span>
            </h2>

            {/* Subtitle */}
            <p className="wb-masterclass-subtitle-fs">
              Learn how to build AI-powered workflows, automate repetitive work and scale your business — with real use cases, not theory.
            </p>

            {/* Event Specs Bar (3 Cards) */}
            <div className="wb-masterclass-specs-fs">
              <div className="wb-masterclass-spec-card-fs">
                <Calendar size={20} className="wb-spec-icon-cyan" />
                <div className="wb-spec-text-fs">
                  <span className="wb-spec-title-fs">Starts 17th Apr</span>
                  <span className="wb-spec-sub-fs">3 Hours</span>
                </div>
              </div>

              <div className="wb-masterclass-spec-card-fs">
                <Clock size={20} className="wb-spec-icon-green" />
                <div className="wb-spec-text-fs">
                  <span className="wb-spec-title-fs">7 PM – 10 PM</span>
                  <span className="wb-spec-sub-fs">Live Workshop</span>
                </div>
              </div>

              <div className="wb-masterclass-spec-card-fs">
                <Monitor size={20} className="wb-spec-icon-blue" />
                <div className="wb-spec-text-fs">
                  <span className="wb-spec-title-fs">Online</span>
                  <span className="wb-spec-sub-fs">Live on Zoom</span>
                </div>
              </div>
            </div>

            {/* CTA Row */}
            <div className="wb-masterclass-cta-row-fs">
              <button
                onClick={handleOpenModal}
                className="wb-masterclass-btn-fs"
              >
                <span>Reserve Your Seat (₹99)</span>
                <ArrowRight size={17} />
              </button>
              <div className="wb-masterclass-seats-note-fs">
                <Flame size={16} className="wb-flame-icon-fs" />
                <span>Limited seats. High value.</span>
              </div>
            </div>
          </div>

          {/* Cursive Handwriting Badge: "Build Automate Scale" */}
          <div className="wb-masterclass-script-badge-fs">
            <span>Build</span>
            <span>Automate</span>
            <span>Scale</span>
          </div>

          {/* Floating HUD Node Tags behind/beside the founders */}
          <div className="wb-masterclass-hud-tag wb-hud-chatbots" style={{ left: "53.5%", top: "12%" }}>
            <div className="wb-hud-inner">
              <div className="wb-hud-icon"><Cpu size={14} /></div>
              <span>Chatbots</span>
            </div>
          </div>
          <div className="wb-masterclass-hud-tag wb-hud-automation" style={{ left: "70.5%", top: "12%" }}>
            <div className="wb-hud-inner">
              <div className="wb-hud-icon"><BrainCircuit size={14} /></div>
              <span>Automation</span>
            </div>
          </div>
          <div className="wb-masterclass-hud-tag wb-hud-databases" style={{ left: "87%", top: "24%" }}>
            <div className="wb-hud-inner">
              <div className="wb-hud-icon"><Database size={14} /></div>
              <span>Databases</span>
            </div>
          </div>

          {/* Founders Credit Pill Bar Under Adnan & Raunak */}
          <div className="wb-masterclass-founders-pill-fs">
            <div className="wb-masterclass-founders-left">
              <Users size={16} className="wb-founders-icon-green" />
              <span className="wb-founders-name-fs">Live with Adnan Sheikh &amp; Raunak Kumar</span>
            </div>
            <span className="wb-masterclass-founders-role">Founders, ScalePods</span>
          </div>

          {/* Full-width Process Evolution Pathway Card (Slide 7 bottom) */}
          <div className="wb-masterclass-pathway-fs">
            <div className="wb-pathway-steps-fs">
              <div className="wb-pathway-step-fs">
                <div className="wb-pathway-icon-fs"><Settings size={18} /></div>
                <span>Processes</span>
              </div>
              <span className="wb-pathway-arrow-fs">→</span>

              <div className="wb-pathway-step-fs">
                <div className="wb-pathway-icon-fs"><Layers size={18} /></div>
                <span>Workflows</span>
              </div>
              <span className="wb-pathway-arrow-fs">→</span>

              <div className="wb-pathway-step-fs">
                <div className="wb-pathway-icon-fs"><Zap size={18} /></div>
                <span>Automation</span>
              </div>
              <span className="wb-pathway-arrow-fs">→</span>

              <div className="wb-pathway-step-fs">
                <div className="wb-pathway-icon-fs"><BrainCircuit size={18} /></div>
                <span>AI</span>
              </div>
              <span className="wb-pathway-arrow-fs">→</span>

              <div className="wb-pathway-step-fs">
                <div className="wb-pathway-icon-fs"><Database size={18} /></div>
                <span>Systems</span>
              </div>
              <span className="wb-pathway-arrow-fs">→</span>

              <div className="wb-pathway-step-fs wb-pathway-step-highlight">
                <div className="wb-pathway-icon-fs wb-pathway-icon-green"><TrendingUp size={18} /></div>
                <span>Scale</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sequential Breakdown (shown on <=768px for crystal clear legibility) */}
        <div className="wb-masterclass-mobile-wrapper">
          <div className="wb-container">
            <div className="wb-masterclass-pill-fs" style={{ marginBottom: "12px" }}>
              <Globe size={13} className="wb-masterclass-pill-icon" />
              <span>AI AUTOMATION MASTERCLASS</span>
            </div>

            <h2 className="wb-masterclass-title-fs" style={{ fontSize: "28px", textAlign: "left" }}>
              <span className="wb-masterclass-title-white-fs">THE AI AUTOMATION</span>
              <span className="wb-masterclass-title-gradient-fs">MASTERCLASS</span>
            </h2>

            <p className="wb-masterclass-subtitle-fs" style={{ fontSize: "14px", textAlign: "left", marginBottom: "20px" }}>
              Learn how to build AI-powered workflows, automate repetitive work and scale your business — with real use cases, not theory.
            </p>

            <div className="wb-masterclass-specs-fs" style={{ flexDirection: "column", alignItems: "stretch", gap: "10px", marginBottom: "20px" }}>
              <div className="wb-masterclass-spec-card-fs">
                <Calendar size={18} className="wb-spec-icon-cyan" />
                <div className="wb-spec-text-fs">
                  <span className="wb-spec-title-fs">Starts 17th Apr</span>
                  <span className="wb-spec-sub-fs">3 Hours</span>
                </div>
              </div>
              <div className="wb-masterclass-spec-card-fs">
                <Clock size={18} className="wb-spec-icon-green" />
                <div className="wb-spec-text-fs">
                  <span className="wb-spec-title-fs">7 PM – 10 PM</span>
                  <span className="wb-spec-sub-fs">Live Workshop</span>
                </div>
              </div>
              <div className="wb-masterclass-spec-card-fs">
                <Monitor size={18} className="wb-spec-icon-blue" />
                <div className="wb-spec-text-fs">
                  <span className="wb-spec-title-fs">Online</span>
                  <span className="wb-spec-sub-fs">Live on Zoom</span>
                </div>
              </div>
            </div>

            <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", borderRadius: "12px", overflow: "hidden", margin: "16px 0" }}>
              <Image
                src="/images/webinar-redesign/masterclass-bg.webp"
                alt="Adnan Sheikh & Raunak Kumar - Founders, ScalePods"
                fill
                quality={90}
                sizes="100vw"
                style={{ objectFit: "cover" }}
              />
            </div>

            <div className="wb-masterclass-founders-pill-fs" style={{ position: "relative", right: "auto", top: "auto", width: "100%", margin: "12px 0 20px" }}>
              <div className="wb-masterclass-founders-left">
                <Users size={16} className="wb-founders-icon-green" />
                <span className="wb-founders-name-fs">Live with Adnan Sheikh &amp; Raunak Kumar</span>
              </div>
              <span className="wb-masterclass-founders-role">Founders, ScalePods</span>
            </div>

            <button
              onClick={handleOpenModal}
              className="wb-masterclass-btn-fs"
              style={{ width: "100%", justifyContent: "center", marginBottom: "12px" }}
            >
              <span>Reserve Your Seat (₹99)</span>
              <ArrowRight size={17} />
            </button>
            <div className="wb-masterclass-seats-note-fs" style={{ justifyContent: "center", marginBottom: "24px" }}>
              <Flame size={16} className="wb-flame-icon-fs" />
              <span>Limited seats. High value.</span>
            </div>

            <div className="wb-masterclass-pathway-fs" style={{ position: "relative", bottom: "auto", left: "auto", width: "100%", padding: "16px" }}>
              <div className="wb-pathway-steps-fs" style={{ flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
                {[
                  { label: "Processes", icon: <Settings size={16} /> },
                  { label: "Workflows", icon: <Layers size={16} /> },
                  { label: "Automation", icon: <Zap size={16} /> },
                  { label: "AI", icon: <BrainCircuit size={16} /> },
                  { label: "Systems", icon: <Database size={16} /> },
                  { label: "Scale", icon: <TrendingUp size={16} />, highlight: true },
                ].map((st, i) => (
                  <React.Fragment key={i}>
                    <div className={`wb-pathway-step-fs ${st.highlight ? "wb-pathway-step-highlight" : ""}`} style={{ fontSize: "12px" }}>
                      <div className={`wb-pathway-icon-fs ${st.highlight ? "wb-pathway-icon-green" : ""}`} style={{ width: "28px", height: "28px" }}>
                        {st.icon}
                      </div>
                      <span>{st.label}</span>
                    </div>
                    {i < 5 && <span className="wb-pathway-arrow-fs" style={{ fontSize: "12px" }}>→</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: MEET YOUR FOUNDERS & OUR AI PARTNERS (SLIDES 9, 10, 11) ─── */}
      <section className="wb-section-founders-partners" id="founders">
        {/* Background Image Container */}
        <div className="wb-founders-bg-wrap">
          <Image
            src="/images/webinar-redesign/founders-partners-bg.webp"
            alt="ScalePods Founders and AI Partners"
            fill
            quality={90}
            sizes="100vw"
            className="wb-founders-bg-img"
          />
          <div className="wb-founders-bg-overlay" />
        </div>

        <div className="wb-container wb-founders-content-container">
          {/* ── PART 1: MEET YOUR FOUNDERS (SPLIT 2-COLUMN LAYOUT) ── */}
          <div className="wb-founders-top-grid">
            {/* Left Column: Heading, Subtitle, Badges, CTA */}
            <div className="wb-founders-intro-col">
              <div className="wb-pill-badge-green">
                <Sparkles size={13} className="wb-pill-badge-icon" />
                <span>MEET YOUR FOUNDERS</span>
              </div>

              <h2 className="wb-founders-main-title">
                Learn from the people{" "}
                <span className="wb-text-highlight-green">building</span> with AI.
              </h2>

              <p className="wb-founders-main-desc">
                Adnan Sheikh and Raunak Kumar are the founders of ScalePods, helping businesses automate operations, streamline workflows and scale with AI.
              </p>

              {/* 3 Experience Badges */}
              <div className="wb-founders-badges-row">
                <div className="wb-founder-exp-badge">
                  <div className="wb-exp-badge-icon-wrap">
                    <Zap size={14} className="wb-exp-icon-green" />
                  </div>
                  <span>Real-world experience</span>
                </div>

                <div className="wb-founder-exp-badge">
                  <div className="wb-exp-badge-icon-wrap">
                    <Users size={14} className="wb-exp-icon-cyan" />
                  </div>
                  <span>Hands-on guidance</span>
                </div>

                <div className="wb-founder-exp-badge">
                  <div className="wb-exp-badge-icon-wrap">
                    <ShieldCheck size={14} className="wb-exp-icon-blue" />
                  </div>
                  <span>Practical, not theoretical</span>
                </div>
              </div>

              <button
                onClick={handleOpenModal}
                className="wb-founders-about-btn"
              >
                <span>About the Founders</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Right Column: 2 Founder Cards Side-by-Side */}
            <div className="wb-founders-cards-grid">
              {/* Card 1: Adnan Sheikh */}
              <div className="wb-founder-profile-card wb-founder-card-adnan">
                <div className="wb-founder-img-frame">
                  <Image
                    src="/images/webinar-redesign/adnan-portrait.webp"
                    alt="Adnan Sheikh - Co-Founder, ScalePods"
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    className="wb-founder-portrait-img"
                  />
                </div>
                <div className="wb-founder-card-body">
                  <h3 className="wb-founder-card-name">Adnan Sheikh</h3>
                  <div className="wb-founder-card-role">Co-Founder, ScalePods</div>
                  <p className="wb-founder-card-bio">
                    Builds and scales AI automation solutions for modern businesses.
                  </p>
                  <a
                    href="https://www.linkedin.com/in/adnan-sheikh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="wb-founder-linkedin-link"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64c-.9 0-1.63.73-1.63 1.63 0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.63-1.63-1.63Z" />
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

              {/* Card 2: Raunak Kumar */}
              <div className="wb-founder-profile-card wb-founder-card-raunak">
                <div className="wb-founder-img-frame">
                  <Image
                    src="/images/webinar-redesign/raunak-portrait.webp"
                    alt="Raunak Kumar - Co-Founder, ScalePods"
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    className="wb-founder-portrait-img"
                  />
                </div>
                <div className="wb-founder-card-body">
                  <h3 className="wb-founder-card-name">Raunak Kumar</h3>
                  <div className="wb-founder-card-role">Co-Founder, ScalePods</div>
                  <p className="wb-founder-card-bio">
                    Specializes in workflow automation, AI systems and product strategy.
                  </p>
                  <a
                    href="https://www.linkedin.com/in/raunak-kumar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="wb-founder-linkedin-link"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64c-.9 0-1.63.73-1.63 1.63 0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.63-1.63-1.63Z" />
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ── PART 2: OUR AI PARTNERS MASTER BOX ── */}
          <div className="wb-partners-master-box">
            <div className="wb-partners-box-grid">
              {/* Left Column: Intro */}
              <div className="wb-partners-intro-col">
                <div className="wb-pill-badge-green" style={{ marginBottom: "16px" }}>
                  <Cpu size={13} className="wb-pill-badge-icon" />
                  <span>OUR AI PARTNERS</span>
                </div>

                <h3 className="wb-partners-box-title">
                  Built with the best <br />
                  <span className="wb-text-highlight-green">in AI.</span>
                </h3>

                <p className="wb-partners-box-desc">
                  ScalePods is powered by industry-leading AI models, including Claude and OpenAI, giving you access to the most advanced tools for real-world business automation.
                </p>

                <button
                  onClick={handleOpenModal}
                  className="wb-partners-cta-btn"
                >
                  <span>Explore Our AI Ecosystem</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* Right Column: 2 Brand Cards */}
              <div className="wb-partners-cards-grid">
                {/* Claude Card */}
                <div className="wb-partner-brand-card wb-partner-card-claude">
                  <div className="wb-partner-brand-header">
                    <div className="wb-partner-brand-logo-wrap">
                      <svg viewBox="0 0 24 24" className="wb-claude-sunburst-svg" fill="currentColor">
                        <path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z" />
                      </svg>
                      <div className="wb-partner-brand-titles">
                        <span className="wb-brand-name-bold">Claude</span>
                        <span className="wb-brand-sub-anthropic">by ANTHROPIC</span>
                      </div>
                    </div>
                  </div>

                  <div className="wb-partner-status-pill">
                    <CheckCircle2 size={13} className="wb-status-check-icon" />
                    <span>Official Partner</span>
                  </div>

                  <div className="wb-partner-bullets-list">
                    <div className="wb-partner-bullet-row">
                      <CheckCircle2 size={15} className="wb-bullet-green-icon" />
                      <span>Advanced reasoning</span>
                    </div>
                    <div className="wb-partner-bullet-row">
                      <CheckCircle2 size={15} className="wb-bullet-green-icon" />
                      <span>Enterprise-grade security</span>
                    </div>
                    <div className="wb-partner-bullet-row">
                      <CheckCircle2 size={15} className="wb-bullet-green-icon" />
                      <span>Built for real business use</span>
                    </div>
                  </div>
                </div>

                {/* OpenAI Card */}
                <div className="wb-partner-brand-card wb-partner-card-openai">
                  <div className="wb-partner-brand-header">
                    <div className="wb-partner-brand-logo-wrap">
                      <svg viewBox="0 0 24 24" className="wb-openai-spiral-svg" fill="currentColor">
                        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1683a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4947zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1683a.0757.0757 0 0 1-.071 0l-4.8303-2.7866A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1635a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
                      </svg>
                      <span className="wb-brand-name-bold">OpenAI</span>
                    </div>
                  </div>

                  <div className="wb-partner-status-pill">
                    <CheckCircle2 size={13} className="wb-status-check-icon" />
                    <span>Official Partner</span>
                  </div>

                  <div className="wb-partner-bullets-list">
                    <div className="wb-partner-bullet-row">
                      <CheckCircle2 size={15} className="wb-bullet-green-icon" />
                      <span>GPT-4o &amp; latest models</span>
                    </div>
                    <div className="wb-partner-bullet-row">
                      <CheckCircle2 size={15} className="wb-bullet-green-icon" />
                      <span>Multimodal capabilities</span>
                    </div>
                    <div className="wb-partner-bullet-row">
                      <CheckCircle2 size={15} className="wb-bullet-green-icon" />
                      <span>Seamless integration</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── PART 3: WHAT TO EXPECT ── */}
          <div className="wb-expect-master-wrap">
            <div className="wb-expect-header">
              <div className="wb-pill-badge-green" style={{ marginBottom: "12px" }}>
                <Monitor size={13} className="wb-pill-badge-icon" />
                <span>WHAT TO EXPECT</span>
              </div>

              <h3 className="wb-expect-main-title">
                Practical. Focused. Actionable.
              </h3>

              <p className="wb-expect-main-desc">
                Live masterclass, real workflows, expert guidance — everything you need to start automating with AI, from day one.
              </p>
            </div>

            <div className="wb-expect-nodes-grid">
              <div className="wb-expect-node-item">
                <div className="wb-expect-node-icon-circle">
                  <Users size={20} />
                </div>
                <div className="wb-expect-node-text">
                  <h4 className="wb-expect-node-title">Live with Founders</h4>
                  <p className="wb-expect-node-sub">Adnan Sheikh &amp; Raunak Kumar</p>
                </div>
              </div>

              <div className="wb-expect-node-item">
                <div className="wb-expect-node-icon-circle">
                  <Monitor size={20} />
                </div>
                <div className="wb-expect-node-text">
                  <h4 className="wb-expect-node-title">Real Business Use Cases</h4>
                  <p className="wb-expect-node-sub">Not just theory</p>
                </div>
              </div>

              <div className="wb-expect-node-item">
                <div className="wb-expect-node-icon-circle">
                  <Target size={20} />
                </div>
                <div className="wb-expect-node-text">
                  <h4 className="wb-expect-node-title">Hands-on Demos</h4>
                  <p className="wb-expect-node-sub">Build your own workflows</p>
                </div>
              </div>

              <div className="wb-expect-node-item">
                <div className="wb-expect-node-icon-circle">
                  <MessageSquare size={20} />
                </div>
                <div className="wb-expect-node-text">
                  <h4 className="wb-expect-node-title">Live Q&amp;A</h4>
                  <p className="wb-expect-node-sub">Get your questions answered</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: THIS IS NOT A "LEARN AI TOOLS" WEBINAR (SLIDES 12 & 13) ──── */}
      <section className="wb-section-fullscreen-not-tools" id="not-tools">
        {/* ── DESKTOP: FULLSCREEN 16:9 CANVAS STAGE (Matches Masterclass Fold Architecture) ── */}
        <div className="wb-not-tools-fullscreen-stage">
          <Image
            src="/images/webinar-redesign/not-ai-tools-bg.webp"
            alt="This is not a learn AI tools webinar - ScalePods"
            fill
            priority
            quality={92}
            sizes="100vw"
            className="wb-not-tools-canvas-img"
          />
          <div className="wb-not-tools-canvas-overlay" />

          {/* Top Header (y: 3.5% - 19%) */}
          <div className="wb-not-tools-stage-header">
            <div className="wb-pill-badge-green" style={{ marginBottom: "10px" }}>
              <Globe size={13} className="wb-pill-badge-icon" />
              <span>AI AUTOMATION MASTERCLASS</span>
            </div>

            <h2 className="wb-not-tools-main-title">
              THIS IS <span className="wb-not-tools-title-green">NOT</span> A “LEARN AI TOOLS” WEBINAR.
            </h2>

            <p className="wb-not-tools-main-desc">
              We aren&apos;t going to overwhelm you with ephemeral tools or technical jargon.
            </p>
          </div>

          {/* Middle Visual (y: 23.4% - 47.3%):
              Shines through seamlessly from the 16:9 background image where chaotic tools, green >>>, and 5 pipeline steps sit! */}

          {/* Bottom 2 Comparison Cards (y: 49.5% - 85%) */}
          <div className="wb-not-tools-stage-comparison">
            {/* Left: Negative Box (Red) */}
            <div className="wb-not-tools-box-negative">
              <div className="wb-not-tools-box-header">
                <div className="wb-not-tools-x-badge">
                  <X size={15} strokeWidth={3} />
                </div>
                <h3 className="wb-not-tools-box-title-red">
                  We aren&apos;t going to overwhelm you with:
                </h3>
              </div>

              <div className="wb-not-tools-list">
                {[
                  "100 AI tools",
                  "Technical jargon",
                  "Complicated coding",
                  "Generic productivity hacks",
                  "AI hype",
                ].map((item, idx) => (
                  <div key={idx} className="wb-not-tools-item-row">
                    <div className="wb-not-tools-item-x-icon">
                      <X size={12} strokeWidth={2.5} />
                    </div>
                    <span className="wb-not-tools-item-text-red">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Positive Box (Cyan/Green) */}
            <div className="wb-not-tools-box-positive">
              <div className="wb-not-tools-box-header">
                <div className="wb-not-tools-check-badge">
                  <Check size={16} strokeWidth={3} />
                </div>
                <h3 className="wb-not-tools-box-title-green">
                  Instead, you&apos;ll learn how to identify:
                </h3>
              </div>

              <div className="wb-not-tools-list">
                {[
                  "WHAT TO AUTOMATE",
                  "WHY TO AUTOMATE IT",
                  "HOW THE WORKFLOW SHOULD WORK",
                  "WHERE AI ACTUALLY ADDS VALUE",
                  "HOW DIFFERENT SYSTEMS CONNECT",
                ].map((item, idx) => (
                  <div key={idx} className="wb-not-tools-item-row">
                    <div className="wb-not-tools-item-check-icon">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span className="wb-not-tools-item-text-green">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Micro Footer Note */}
          <p className="wb-not-tools-stage-footer-note">
            Focus on patterns, workflows, systems, processes, response time and efficiency.
          </p>
        </div>

        {/* ── MOBILE / SMALL SCREEN RESPONSIVE BREAKDOWN (<= 900px) ── */}
        <div className="wb-not-tools-mobile-wrapper">
          <div className="wb-container">
            <div className="wb-not-tools-mobile-header">
              <div className="wb-pill-badge-green" style={{ marginBottom: "12px" }}>
                <Globe size={13} className="wb-pill-badge-icon" />
                <span>AI AUTOMATION MASTERCLASS</span>
              </div>

              <h2 className="wb-not-tools-mobile-title">
                THIS IS <span className="wb-not-tools-title-green">NOT</span> A “LEARN AI TOOLS” WEBINAR.
              </h2>

              <p className="wb-not-tools-mobile-desc">
                We aren&apos;t going to overwhelm you with ephemeral tools or technical jargon.
              </p>
            </div>

            {/* Mobile Crisp Graphic */}
            <div className="wb-not-tools-mobile-graphic-card">
              <Image
                src="/images/webinar-redesign/not-ai-tools-graphic.webp"
                alt="Chaotic tools overwhelm converted to streamlined automated pipeline"
                width={1200}
                height={215}
                quality={92}
                sizes="(max-width: 900px) 100vw, 800px"
                className="wb-not-tools-mobile-img"
              />
            </div>

            {/* Mobile Comparison Cards */}
            <div className="wb-not-tools-mobile-comparison-grid">
              {/* Negative Box (Red) */}
              <div className="wb-not-tools-box-negative">
                <div className="wb-not-tools-box-header">
                  <div className="wb-not-tools-x-badge">
                    <X size={15} strokeWidth={3} />
                  </div>
                  <h3 className="wb-not-tools-box-title-red">
                    We aren&apos;t going to overwhelm you with:
                  </h3>
                </div>

                <div className="wb-not-tools-list">
                  {[
                    "100 AI tools",
                    "Technical jargon",
                    "Complicated coding",
                    "Generic productivity hacks",
                    "AI hype",
                  ].map((item, idx) => (
                    <div key={idx} className="wb-not-tools-item-row">
                      <div className="wb-not-tools-item-x-icon">
                        <X size={12} strokeWidth={2.5} />
                      </div>
                      <span className="wb-not-tools-item-text-red">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Positive Box (Cyan/Green) */}
              <div className="wb-not-tools-box-positive">
                <div className="wb-not-tools-box-header">
                  <div className="wb-not-tools-check-badge">
                    <Check size={16} strokeWidth={3} />
                  </div>
                  <h3 className="wb-not-tools-box-title-green">
                    Instead, you&apos;ll learn how to identify:
                  </h3>
                </div>

                <div className="wb-not-tools-list">
                  {[
                    "WHAT TO AUTOMATE",
                    "WHY TO AUTOMATE IT",
                    "HOW THE WORKFLOW SHOULD WORK",
                    "WHERE AI ACTUALLY ADDS VALUE",
                    "HOW DIFFERENT SYSTEMS CONNECT",
                  ].map((item, idx) => (
                    <div key={idx} className="wb-not-tools-item-row">
                      <div className="wb-not-tools-item-check-icon">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span className="wb-not-tools-item-text-green">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Footer Note */}
            <p className="wb-not-tools-mobile-footer-note">
              Focus on patterns, workflows, systems, processes, response time and efficiency.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: THE 4-LAYER AUTOMATION SYSTEM (SLIDE 14) ─────────────────── */}
      <section className="wb-section">
        <div className="wb-container">
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <div className="wb-pill-green" style={{ marginBottom: "14px" }}>
              <Cpu size={14} />
              <span>THE PROPRIETARY FRAMEWORK</span>
            </div>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 42px)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.2, marginBottom: "14px" }}>
              THE 4-LAYER AUTOMATION SYSTEM
            </h2>
            <p style={{ fontSize: "16px", color: "#94A3B8", maxWidth: "680px", margin: "0 auto" }}>
              A practical framework for thinking about business automation.
            </p>
          </div>

          {/* 4 Cards Grid matching Slide 14 */}
          <div className="wb-4layers-grid">
            <div className="wb-4layer-card">
              <span className="wb-4layer-num">01</span>
              <h3 className="wb-4layer-title">CAPTURE</h3>
              <p className="wb-4layer-desc">
                Capture the lead, application, enquiry, request or task.
              </p>
              <span className="wb-4layer-tag">Universal Ingestion</span>
            </div>

            <div className="wb-4layer-card">
              <span className="wb-4layer-num">02</span>
              <h3 className="wb-4layer-title">RESPOND</h3>
              <p className="wb-4layer-desc">
                Trigger the right response instantly without human delays.
              </p>
              <span className="wb-4layer-tag">Sub-Minute Response</span>
            </div>

            <div className="wb-4layer-card">
              <span className="wb-4layer-num">03</span>
              <h3 className="wb-4layer-title">QUALIFY</h3>
              <p className="wb-4layer-desc">
                Use rules, data and AI to determine what should happen next.
              </p>
              <span className="wb-4layer-tag">Intelligent Triage</span>
            </div>

            <div className="wb-4layer-card">
              <span className="wb-4layer-num">04</span>
              <h3 className="wb-4layer-title">SYNC + FOLLOW-UP</h3>
              <p className="wb-4layer-desc">
                Update systems, notify people and automatically trigger the next action.
              </p>
              <span className="wb-4layer-tag">Autonomous Orchestration</span>
            </div>
          </div>

          {/* Signature Framework Bar */}
          <div className="wb-pathway-card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "16px", fontWeight: 800, color: "#FFFFFF", marginBottom: "6px" }}>
              <span style={{ color: "#4ADE80" }}>CAPTURE</span> →{" "}
              <span style={{ color: "#38BDF8" }}>RESPOND</span> →{" "}
              <span style={{ color: "#4ADE80" }}>QUALIFY</span> →{" "}
              <span style={{ color: "#38BDF8" }}>SYNC + FOLLOW-UP</span>
            </div>
            <span style={{ fontSize: "12px", color: "#94A3B8" }}>
              This is the signature four-layer framework outlined in the ScalePods masterclass.
            </span>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: SEE HOW THIS WORKS ACROSS YOUR BUSINESS (SLIDE 15) ───────── */}
      <section className="wb-section-fullscreen-business" id="business-tracks">
        {/* ── DESKTOP: FULLSCREEN 16:9 CANVAS STAGE (Matches Fold 4 & 6 Architecture) ── */}
        <div className="wb-business-fullscreen-stage">
          <Image
            src="/images/webinar-redesign/15.webp"
            alt="See How This Works Across Your Business - ScalePods"
            fill
            priority
            quality={92}
            sizes="100vw"
            className="wb-business-canvas-img"
          />
          <div className="wb-business-canvas-overlay" />

          {/* Interactive Card Hover Hotspots (Aligned precisely over the 4 columns in 15.webp) */}
          <div className="wb-business-stage-hotspots">
            <div className="wb-bstage-hotspot wb-bstage-hotspot-sales" title="Sales Automation Track">
              <span className="sr-only">
                Sales Automation Track: Lead comes in, Instant WhatsApp / AI response, Qualification, Lead categorization, CRM update, Assignment, Automated follow-up. Result: Your team spends less time chasing and more time closing.
              </span>
            </div>
            <div className="wb-bstage-hotspot wb-bstage-hotspot-marketing" title="Marketing Automation Track">
              <span className="sr-only">
                Marketing Automation Track: Lead captured, Nurture workflow, Campaign tracking, Data synchronization, Follow-up. Result: More qualified leads, better engagement, higher conversions.
              </span>
            </div>
            <div className="wb-bstage-hotspot wb-bstage-hotspot-hr" title="HR Automation Track">
              <span className="sr-only">
                HR Automation Track: Candidate applies, AI-assisted screening, Candidate categorization, Interview scheduling, Follow-up. Result: Faster hiring, better matches, stronger teams.
              </span>
            </div>
            <div className="wb-bstage-hotspot wb-bstage-hotspot-ops" title="Operations Automation Track">
              <span className="sr-only">
                Operations Automation Track: Task/request arrives, Task creation, Assignment, Tracking, Reporting. Result: Better visibility, fewer bottlenecks, smoother execution.
              </span>
            </div>
          </div>
        </div>

        {/* ── MOBILE & TABLET RESPONSIVE WRAPPER (<= 1024px) ── */}
        <div className="wb-business-mobile-wrapper">
          <div className="wb-container">
            <div className="wb-business-mobile-header">
              <div className="wb-pill-badge-green" style={{ marginBottom: "14px" }}>
                <Cpu size={13} className="wb-pill-badge-icon" />
                <span>OPERATIONAL TRACKS</span>
              </div>
              <h2 className="wb-business-mobile-title">
                SEE HOW THIS WORKS ACROSS <span className="wb-business-title-gradient">YOUR BUSINESS</span>
              </h2>
              <p className="wb-business-mobile-desc">
                One underlying logic engine deployed across critical operational tracks:
              </p>
            </div>

            <div className="wb-business-mobile-grid">
              {/* Card 1: SALES */}
              <div className="wb-business-card wb-bcard-sales">
                <div className="wb-business-diagram-box">
                  <Image
                    src="/images/webinar-redesign/sales-diagram.webp"
                    alt="Sales Lead to CRM Automation Diagram"
                    width={410}
                    height={185}
                    quality={95}
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="wb-business-diagram-img"
                  />
                </div>

                <div className="wb-business-card-header">
                  <div className="wb-bcard-icon-badge wb-badge-green">
                    <TrendingUp size={16} />
                  </div>
                  <h3 className="wb-bcard-title">SALES</h3>
                </div>

                <div className="wb-business-steps-list">
                  {[
                    "Lead comes in",
                    "Instant WhatsApp / AI response",
                    "Qualification",
                    "Lead categorization",
                    "CRM update",
                    "Assignment",
                    "Automated follow-up",
                  ].map((step, idx) => (
                    <div key={idx} className="wb-business-step-row">
                      <span className="wb-bstep-arrow wb-arrow-green">→</span>
                      <span className="wb-bstep-text">{step}</span>
                    </div>
                  ))}
                </div>

                <div className="wb-business-result-box">
                  <div className="wb-bresult-icon-badge wb-bresult-green">
                    <Target size={16} />
                  </div>
                  <div className="wb-bresult-content">
                    <span className="wb-bresult-label wb-label-green">Result?</span>
                    <p className="wb-bresult-desc">
                      Your team spends less time chasing and more time closing.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2: MARKETING */}
              <div className="wb-business-card wb-bcard-marketing">
                <div className="wb-business-diagram-box">
                  <Image
                    src="/images/webinar-redesign/marketing-diagram.webp"
                    alt="Marketing Nurture and Campaign Automation Diagram"
                    width={410}
                    height={185}
                    quality={95}
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="wb-business-diagram-img"
                  />
                </div>

                <div className="wb-business-card-header">
                  <div className="wb-bcard-icon-badge wb-badge-cyan">
                    <Megaphone size={16} />
                  </div>
                  <h3 className="wb-bcard-title">MARKETING</h3>
                </div>

                <div className="wb-business-steps-list">
                  {[
                    "Lead captured",
                    "Nurture workflow",
                    "Campaign tracking",
                    "Data synchronization",
                    "Follow-up",
                  ].map((step, idx) => (
                    <div key={idx} className="wb-business-step-row">
                      <span className="wb-bstep-arrow wb-arrow-cyan">→</span>
                      <span className="wb-bstep-text">{step}</span>
                    </div>
                  ))}
                </div>

                <div className="wb-business-result-box">
                  <div className="wb-bresult-icon-badge wb-bresult-cyan">
                    <TrendingUp size={16} />
                  </div>
                  <div className="wb-bresult-content">
                    <span className="wb-bresult-label wb-label-cyan">Result?</span>
                    <p className="wb-bresult-desc">
                      More qualified leads, better engagement, higher conversions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3: HR */}
              <div className="wb-business-card wb-bcard-hr">
                <div className="wb-business-diagram-box">
                  <Image
                    src="/images/webinar-redesign/hr-diagram.webp"
                    alt="HR Candidate Screening AI Automation Diagram"
                    width={410}
                    height={185}
                    quality={95}
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="wb-business-diagram-img"
                  />
                </div>

                <div className="wb-business-card-header">
                  <div className="wb-bcard-icon-badge wb-badge-mint">
                    <Users size={16} />
                  </div>
                  <h3 className="wb-bcard-title">HR</h3>
                </div>

                <div className="wb-business-steps-list">
                  {[
                    "Candidate applies",
                    "AI-assisted screening",
                    "Candidate categorization",
                    "Interview scheduling",
                    "Follow-up",
                  ].map((step, idx) => (
                    <div key={idx} className="wb-business-step-row">
                      <span className="wb-bstep-arrow wb-arrow-mint">→</span>
                      <span className="wb-bstep-text">{step}</span>
                    </div>
                  ))}
                </div>

                <div className="wb-business-result-box">
                  <div className="wb-bresult-icon-badge wb-bresult-mint">
                    <Users size={16} />
                  </div>
                  <div className="wb-bresult-content">
                    <span className="wb-bresult-label wb-label-mint">Result?</span>
                    <p className="wb-bresult-desc">
                      Faster hiring, better matches, stronger teams.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 4: OPERATIONS */}
              <div className="wb-business-card wb-bcard-ops">
                <div className="wb-business-diagram-box">
                  <Image
                    src="/images/webinar-redesign/ops-diagram.webp"
                    alt="Operations Task & Bottleneck Automation Diagram"
                    width={410}
                    height={185}
                    quality={95}
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="wb-business-diagram-img"
                  />
                </div>

                <div className="wb-business-card-header">
                  <div className="wb-bcard-icon-badge wb-badge-blue">
                    <Settings size={16} />
                  </div>
                  <h3 className="wb-bcard-title">OPERATIONS</h3>
                </div>

                <div className="wb-business-steps-list">
                  {[
                    "Task/request arrives",
                    "Task creation",
                    "Assignment",
                    "Tracking",
                    "Reporting",
                  ].map((step, idx) => (
                    <div key={idx} className="wb-business-step-row">
                      <span className="wb-bstep-arrow wb-arrow-blue">→</span>
                      <span className="wb-bstep-text">{step}</span>
                    </div>
                  ))}
                </div>

                <div className="wb-business-result-box">
                  <div className="wb-bresult-icon-badge wb-bresult-blue">
                    <BarChart3 size={16} />
                  </div>
                  <div className="wb-bresult-content">
                    <span className="wb-bresult-label wb-label-blue">Result?</span>
                    <p className="wb-bresult-desc">
                      Better visibility, fewer bottlenecks, smoother execution.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 8: THE BIG IDEA (SLIDES 16 & 17) ───────────────────────────── */}
      <section className="wb-section-fullscreen-bigidea" id="big-idea">
        {/* ── DESKTOP: FULLSCREEN 16:9 CANVAS STAGE (Matches Masterclass & Business Tracks Architecture) ── */}
        <div className="wb-bigidea-fullscreen-stage">
          <Image
            src="/images/webinar-redesign/16.webp"
            alt="The Big Idea - They are all workflows - ScalePods"
            fill
            priority
            quality={92}
            sizes="100vw"
            className="wb-bigidea-canvas-img"
          />
          <div className="wb-bigidea-canvas-overlay" />

          {/* Interactive Clickable CTA Hotspot over Bottom Banner in 16.webp */}
          <div
            onClick={handleOpenModal}
            className="wb-bigidea-stage-cta-hotspot"
            title="Reserve Seat (₹99)"
            role="button"
            tabIndex={0}
          >
            <span className="sr-only">Reserve Your Seat for ₹99</span>
          </div>
        </div>

        {/* ── MOBILE & TABLET RESPONSIVE WRAPPER (<= 1024px) ── */}
        <div className="wb-bigidea-mobile-wrapper">
          <div className="wb-container">
            <div className="wb-bigidea-mobile-header">
              <div className="wb-pill-badge-green" style={{ marginBottom: "14px" }}>
                <Sparkles size={13} className="wb-pill-badge-icon" />
                <span>THE PROPRIETARY FRAMEWORK</span>
              </div>

              <h2 className="wb-bigidea-mobile-title">
                THE BIG <span className="wb-bigidea-title-cyan">IDEA</span>
              </h2>

              {/* 7 Glowing Entity Pills */}
              <div className="wb-bigidea-mobile-pills">
                {[
                  { text: "A lead.", icon: <Users size={13} className="wb-pill-ico-cyan" /> },
                  { text: "A candidate.", icon: <Users size={13} className="wb-pill-ico-cyan" /> },
                  { text: "A customer enquiry.", icon: <MessageSquare size={13} className="wb-pill-ico-cyan" /> },
                  { text: "An internal request.", icon: <Inbox size={13} className="wb-pill-ico-cyan" /> },
                  { text: "A support ticket.", icon: <ShieldCheck size={13} className="wb-pill-ico-mint" /> },
                  { text: "A marketing response.", icon: <Megaphone size={13} className="wb-pill-ico-mint" /> },
                  { text: "A finance task.", icon: <Database size={13} className="wb-pill-ico-cyan" /> },
                ].map((item, idx) => (
                  <div key={idx} className="wb-bigidea-mobile-pill-item">
                    <div className="wb-bigidea-pill-icon-wrap">{item.icon}</div>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>

              <p className="wb-bigidea-mobile-desc">
                They may look completely different. <br className="wb-hide-mobile" />
                <strong className="wb-bigidea-highlight-white">But underneath… THEY ARE ALL WORKFLOWS.</strong>
              </p>
            </div>

            {/* 3D Workflow Engine Visual Card (Slide 17) */}
            <div className="wb-bigidea-mobile-stage-box">
              <Image
                src="/images/webinar-redesign/17.webp"
                alt="One central AI workflow engine connecting departments to automated outcomes"
                width={1200}
                height={675}
                quality={92}
                sizes="(max-width: 900px) 100vw, 850px"
                className="wb-bigidea-mobile-img"
              />
            </div>

            {/* Bottom Framework Callout Bar (Slide 16) */}
            <div className="wb-bigidea-mobile-callout-card">
              <div className="wb-bigidea-callout-left">
                <div className="wb-bigidea-callout-sparkle-badge">
                  <Sparkles size={16} className="wb-sparkle-mint" />
                </div>
                <div className="wb-bigidea-callout-text">
                  <span className="wb-bigidea-callout-label">ONE CONNECTED WORKFLOW ENGINE</span>
                  <div className="wb-bigidea-callout-flow">
                    Redesign → Connect → Automate → AI
                  </div>
                </div>
              </div>

              <button
                onClick={handleOpenModal}
                className="wb-bigidea-callout-btn"
              >
                <span>Reserve Seat (₹99)</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 9: WHAT YOU'LL LEARN (SLIDES 18 & 19) ──────────────────────── */}
      <section className="wb-section">
        <div className="wb-container">
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <div className="wb-pill-green" style={{ marginBottom: "14px" }}>
              <CheckCircle2 size={14} />
              <span>CURRICULUM BLUEPRINTS</span>
            </div>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 42px)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.2, marginBottom: "14px" }}>
              WHAT YOU’LL <span className="wb-gradient-text-green-cyan">LEARN</span>
            </h2>
            <p style={{ fontSize: "16px", color: "#94A3B8", maxWidth: "680px", margin: "0 auto" }}>
              By the end of this live session, you&apos;ll understand:
            </p>
          </div>

          {/* 3-Column Surround Grid matching Slide 18 & 19 */}
          <div className="wb-curriculum-wrap">
            {/* Left 4 Cards */}
            <div className="wb-curriculum-col">
              {[
                { title: "How to identify repetitive processes worth automating", icon: Settings },
                { title: "How AI can fit into existing business workflows", icon: BrainCircuit },
                { title: "How Sales workflows can capture, qualify and follow up with leads", icon: TrendingUp },
                { title: "How HR workflows can automate screening and scheduling", icon: Users },
              ].map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div key={idx} className="wb-curriculum-card">
                    <div className="wb-cost-pillar-icon wb-cost-pillar-icon-green" style={{ width: "32px", height: "32px" }}>
                      <IconComponent size={16} />
                    </div>
                    <p className="wb-curriculum-text">{item.title}</p>
                  </div>
                );
              })}
            </div>

            {/* Center 3D Stage (Slide 19) */}
            <div className="wb-curriculum-center-stage">
              <Image
                src="/images/webinar-redesign/19.webp"
                alt="Interactive AI automation workspace and laptop dashboard"
                fill
                quality={90}
                sizes="(max-width: 1024px) 100vw, 550px"
                className="wb-cost-img"
              />
            </div>

            {/* Right 4 Cards */}
            <div className="wb-curriculum-col">
              {[
                { title: "How to separate tasks that need humans from tasks that don't", icon: ShieldCheck },
                { title: "How the 4-Layer Automation System works", icon: Cpu },
                { title: "How Marketing workflows can automate lead nurturing and tracking", icon: Zap },
                { title: "How Operations workflows can automate task assignment and reporting", icon: BarChart3 },
              ].map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div key={idx} className="wb-curriculum-card">
                    <div className="wb-cost-pillar-icon wb-cost-pillar-icon-blue" style={{ width: "32px", height: "32px" }}>
                      <IconComponent size={16} />
                    </div>
                    <p className="wb-curriculum-text">{item.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 10: BUSINESS BRAIN + TECHNOLOGY BRAIN (SLIDES 20 & 21) ─────── */}
      <section className="wb-section wb-section-bordered">
        <div className="wb-container">
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <div className="wb-pill-eyebrow wb-pill-eyebrow-blue" style={{ marginBottom: "14px" }}>
              <Sparkles size={14} />
              <span>CLAUDE + OPENAI PARTNERSHIP</span>
            </div>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 42px)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.2, marginBottom: "12px" }}>
              FROM THE BUSINESS BRAIN +{" "}
              <span className="wb-gradient-text-cyan-blue">THE TECHNOLOGY BRAIN</span>
            </h2>
            <p style={{ fontSize: "17px", color: "#4ADE80", fontWeight: 700 }}>
              YOU GET BOTH SIDES OF THE CONVERSATION.
            </p>
          </div>

          {/* Dual Brain Grid matching Slide 20 */}
          <div className="wb-dual-brain-grid">
            {/* Adnan Card */}
            <div className="wb-dual-brain-card">
              <div className="wb-dual-brain-avatar">
                <Image
                  src="/images/team/adnan.jpeg"
                  alt="Adnan Sheikh - Business Brain"
                  fill
                  sizes="110px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <h3 style={{ fontSize: "22px", fontWeight: 800, color: "#FFFFFF", margin: "0 0 6px" }}>
                ADNAN
              </h3>
              <div style={{ fontSize: "12.5px", fontWeight: 700, color: "#4ADE80", marginBottom: "12px" }}>
                Business • Sales • Revenue • Operations • Growth
              </div>
              <p style={{ fontSize: "14px", color: "#94A3B8", lineHeight: 1.6, margin: 0 }}>
                Brings a deep understanding of how businesses scale, what customers need, and how to turn strategy into real revenue.
              </p>
            </div>

            {/* Plus Connector */}
            <div className="wb-dual-brain-plus">
              <Plus size={20} />
            </div>

            {/* Raunak Card */}
            <div className="wb-dual-brain-card">
              <div className="wb-dual-brain-avatar">
                <Image
                  src="/images/team/raunak.jpeg"
                  alt="Raunak Kumar - Technology Brain"
                  fill
                  sizes="110px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <h3 style={{ fontSize: "22px", fontWeight: 800, color: "#FFFFFF", margin: "0 0 6px" }}>
                RAUNAK
              </h3>
              <div style={{ fontSize: "12.5px", fontWeight: 700, color: "#38BDF8", marginBottom: "12px" }}>
                Product • Technology • AI • Automation • Systems
              </div>
              <p style={{ fontSize: "14px", color: "#94A3B8", lineHeight: 1.6, margin: 0 }}>
                Builds the technology, automations and systems that make growth scalable, efficient and future-ready.
              </p>
            </div>
          </div>

          {/* Bottom Pathway Bar matching Slide 20 Bottom */}
          <div className="wb-pathway-card" style={{ textAlign: "center" }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "12px", fontSize: "14px", fontWeight: 700, color: "#FFFFFF" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Briefcase size={16} color="#4ADE80" />
                <span>BUSINESS PROBLEM</span>
              </div>
              <span className="wb-pathway-arrow">→</span>

              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Layers size={16} color="#38BDF8" />
                <span>WORKFLOW</span>
              </div>
              <span className="wb-pathway-arrow">→</span>

              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <BrainCircuit size={16} color="#4ADE80" />
                <span>AI</span>
              </div>
              <span className="wb-pathway-arrow">→</span>

              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Zap size={16} color="#38BDF8" />
                <span>AUTOMATION</span>
              </div>
              <span className="wb-pathway-arrow">→</span>

              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#4ADE80" }}>
                <TrendingUp size={16} color="#4ADE80" />
                <span>BUSINESS OUTCOME</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 11: WHY SCALEPODS? (SLIDES 22 & 23) ─────────────────────────── */}
      <section className="wb-section">
        <div className="wb-container">
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <div className="wb-pill-green" style={{ marginBottom: "14px" }}>
              <ShieldCheck size={14} />
              <span>WHY SCALEPODS?</span>
            </div>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 42px)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.2, marginBottom: "14px" }}>
              WHY <span className="wb-gradient-text-green-cyan">SCALEPODS?</span>
            </h2>
            <p style={{ fontSize: "16px", color: "#94A3B8", maxWidth: "760px", margin: "0 auto" }}>
              ScalePods&apos; mission is to design and deploy practical AI solutions that simplify operations, increase productivity and help businesses grow without adding complexity.
            </p>
          </div>

          {/* Split Layout: Left 5 Benefit Cards, Right 3D Visual Stage (Slide 23) */}
          <div className="wb-why-layout-grid">
            {/* Left 5 Cards */}
            <div className="wb-why-cards-stack">
              {[
                { title: "Faster Operations", desc: "Move work through systems instead of leaving it sitting in inboxes.", icon: Zap },
                { title: "Lower Manual Effort", desc: "Remove repetitive, rule-based work from human hands where appropriate.", icon: Cpu },
                { title: "Better Client Experiences", desc: "Improve response times and reduce dropped handoffs.", icon: Sparkles },
                { title: "Higher Team Productivity", desc: "Give people more time for work that actually moves the business forward.", icon: Users },
                { title: "Sustainable Growth", desc: "Build systems that can continue working as the business scales.", icon: TrendingUp },
              ].map((benefit, idx) => {
                const IconComponent = benefit.icon;
                return (
                  <div key={idx} className="wb-why-benefit-card">
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                      <CheckCircle2 size={16} color="#4ADE80" style={{ flexShrink: 0 }} />
                      <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#FFFFFF", margin: 0 }}>
                        {benefit.title}
                      </h3>
                    </div>
                    <p style={{ fontSize: "13px", color: "#94A3B8", margin: "0 0 0 26px", lineHeight: 1.5 }}>
                      {benefit.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Right Visual 3D Stage (Slide 23) */}
            <div className="wb-why-visual-stage">
              <Image
                src="/images/webinar-redesign/23.webp"
                alt="ScalePods autonomous AI cube orchestrating Operations, HR, Marketing, Sales, Finance"
                fill
                quality={90}
                sizes="(max-width: 1024px) 100vw, 600px"
                className="wb-cost-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 12: WHO SHOULD ATTEND? / THIS IS NOT FOR EVERYONE (SLIDES 24 & 25) ── */}
      <section className="wb-section wb-section-bordered">
        <div className="wb-container">
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <div className="wb-pill-eyebrow wb-pill-eyebrow-blue" style={{ marginBottom: "14px" }}>
              <Users size={14} />
              <span>ATTENDEE QUALIFIER</span>
            </div>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 42px)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.2, marginBottom: "14px" }}>
              WHO SHOULD <span className="wb-gradient-text-green-cyan">ATTEND?</span>
            </h2>
            <p style={{ fontSize: "16px", color: "#94A3B8" }}>
              If you&apos;re involved in running or scaling a business, this webinar is for you.
            </p>
          </div>

          {/* 2-Column Split: Who Should Attend vs Not For Everyone (Slide 24) */}
          <div className="wb-audience-split-grid">
            {/* Left Column: Who Should Attend */}
            <div className="wb-audience-personas-card">
              <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#4ADE80", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
                <CheckCircle2 size={20} />
                <span>Target Leadership Tracks</span>
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {[
                  { title: "FOUNDERS & ENTREPRENEURS", desc: "If you're scaling a business and constantly adding people to manage growing workloads." },
                  { title: "SALES LEADERS", desc: "If leads are coming in but response, qualification or follow-up isn't consistent." },
                  { title: "MARKETING LEADERS", desc: "If your marketing generates leads but too much of the journey remains manual." },
                  { title: "HR LEADERS", desc: "If screening, scheduling and candidate communication consume your team's time." },
                  { title: "OPERATIONS LEADERS", desc: "If tasks, approvals, reporting and internal coordination are becoming difficult to manage." },
                  { title: "BUSINESS & TECHNOLOGY LEADERS", desc: "If you want to understand how AI can become part of the operating system of your business." },
                ].map((aud, i) => (
                  <div key={i} style={{ borderBottom: i < 5 ? "1px solid rgba(255, 255, 255, 0.08)" : undefined, paddingBottom: i < 5 ? "12px" : undefined }}>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "#FFFFFF" }}>{aud.title}</div>
                    <div style={{ fontSize: "13px", color: "#94A3B8", marginTop: "3px" }}>{aud.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: This Is Not For Everyone */}
            <div className="wb-audience-filter-card">
              <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#38BDF8", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
                <AlertTriangle size={18} color="#38BDF8" />
                <span>THIS IS NOT FOR EVERYONE.</span>
              </h3>
              <p style={{ fontSize: "13px", color: "#94A3B8", marginBottom: "14px" }}>
                If you&apos;re looking for:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
                {[
                  "“10 ChatGPT prompts you need today”",
                  "A basic introduction to AI",
                  "A random list of AI tools",
                  "Coding tutorials",
                  "AI hype without business application",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", color: "#FFFFFF", fontSize: "13px", background: "rgba(56, 189, 248, 0.08)", border: "1px solid rgba(56, 189, 248, 0.2)", padding: "8px 12px", borderRadius: "8px" }}>
                    <XCircle size={14} color="#38BDF8" style={{ flexShrink: 0 }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: "13px", color: "#94A3B8", fontStyle: "italic", marginBottom: "12px" }}>
                This isn&apos;t that webinar.
              </p>
              <div style={{ paddingTop: "14px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", fontSize: "13.5px", color: "#FFFFFF" }}>
                <span style={{ color: "#4ADE80", fontWeight: 700, display: "block", marginBottom: "6px" }}>
                  But if you&apos;re asking:
                </span>
                <span style={{ fontSize: "12.5px", color: "#94A3B8", lineHeight: 1.5, display: "block" }}>
                  “Where can AI actually save my team time?” • “What should I automate first?” • “Can I automate lead follow-up?” • “Can AI help my sales team?” • “Can I reduce repetitive HR work?” • “Can my systems talk to each other?” • “How do I build an AI-powered workflow?”
                </span>
                <div style={{ marginTop: "14px", color: "#4ADE80", fontWeight: 800, fontSize: "15px" }}>
                  YOU&apos;RE IN THE RIGHT ROOM.
                </div>
              </div>
            </div>
          </div>

          {/* 3D Visual Stage matching Slide 25 (6 Leaders on Cyber Stage) */}
          <div className="wb-audience-stage-wrap">
            <div className="wb-audience-stage">
              <Image
                src="/images/webinar-redesign/25.webp"
                alt="Business and technology leaders powered by the ScalePods AI engine"
                fill
                quality={90}
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="wb-cost-img"
              />
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
            <h2 style={{ fontSize: "clamp(22px, 4.5vw, 40px)", fontWeight: 800, color: "var(--wb-text-bright)", marginBottom: "16px" }}>
              WHY ONLY ₹99?
            </h2>
            <p style={{ fontSize: "16px", color: "var(--wb-text-mid)", lineHeight: 1.7, maxWidth: "700px", margin: "0 auto 24px" }}>
              Because this isn&apos;t about selling you an expensive course before you&apos;ve even seen what is possible.
              <br />
              <strong style={{ color: "var(--wb-text-bright)" }}>We&apos;re keeping the barrier low.</strong>
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
                background: "var(--wb-subcard-bg)",
                border: "1px solid var(--wb-subcard-border)",
                borderRadius: "12px",
                padding: "16px 22px",
                maxWidth: "600px",
                margin: "0 auto 34px",
                fontSize: "15px",
                fontWeight: 700,
                color: "var(--wb-text-bright)",
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
            <h2 style={{ fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 800, color: "var(--wb-text-bright)" }}>
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
              color: "var(--wb-text-bright)",
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
              Don&apos;t start with: <span style={{ color: "var(--wb-text-bright)" }}>“Which AI tool should I buy?”</span>
            </p>
            <p style={{ fontStyle: "italic", color: "#B1D997", fontWeight: 700, fontSize: "18px" }}>
              Start with: “Which repetitive business process should we stop doing manually?”
            </p>
          </div>

          {/* Join Adnan + Raunak Live Card */}
          <div className="wb-glass-card wb-glass-card-green wb-final-cta-card">
            <h3 style={{ fontSize: "24px", fontWeight: 800, color: "var(--wb-text-bright)", marginBottom: "8px" }}>
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
          <div className="wb-bottom-bar-info">
            <div className="wb-pill-green wb-bottom-bar-pill">
              <span className="wb-dot-green" />
              <span>LIVE</span>
            </div>
            <div className="wb-bottom-bar-text-wrap">
              <div className="wb-bottom-bar-title">
                AI Business Automation Masterclass
              </div>
              <div className="wb-bottom-bar-subtitle">
                <span className="wb-bottom-bar-hosts">With Adnan Sheikh &amp; Raunak Kumar • </span>
                <strong>Only ₹99/-</strong> <s style={{ color: "var(--wb-text-faint)" }}>₹999</s>
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
                  <h3 style={{ fontSize: "22px", fontWeight: 800, color: "var(--wb-text-bright)" }}>
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
                  <span style={{ fontSize: "14px", color: "var(--wb-text-bright)", fontWeight: 600 }}>Masterclass Access Pass</span>
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

                <h3 style={{ fontSize: "22px", fontWeight: 800, color: "var(--wb-text-bright)", marginBottom: "8px" }}>
                  Your Seat Is Confirmed!
                </h3>
                <p style={{ fontSize: "14px", color: "var(--wb-text-mid)", marginBottom: "20px", lineHeight: 1.5 }}>
                  Thank you, <strong style={{ color: "var(--wb-text-bright)" }}>{formData.name || "Attendee"}</strong>. We’ve received your registration for ₹99 and sent the confirmation receipt to <strong style={{ color: "var(--wb-text-bright)" }}>{formData.email}</strong>.
                </p>

                {/* Receipt Card */}
                {paymentSuccessData && (
                  <div
                    style={{
                      background: "var(--wb-subcard-bg)",
                      border: "1px solid var(--wb-subcard-border)",
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
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "12px" }}>
                      <span style={{ color: "var(--wb-text-muted)" }}>Session Date</span>
                      <span style={{ color: "#FCD34D", fontWeight: 600 }}>To Be Announced (Saved &amp; Reserved)</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
                      <span style={{ color: "var(--wb-text-muted)" }}>Pass Fee</span>
                      <span style={{ color: "var(--wb-text-bright)", fontWeight: 700 }}>₹99.00 INR (Paid)</span>
                    </div>
                  </div>
                )}

                {/* Next Steps Buttons */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
                  <a
                    href="https://chat.whatsapp.com/DXUZY64yIV9E0VdLprFIx2?s=sh&p=a&mlu=4&ilr=4"
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

                  <div
                    style={{
                      background: "var(--wb-subcard-bg)",
                      border: "1px solid var(--wb-subcard-border)",
                      borderRadius: "10px",
                      padding: "12px 14px",
                      fontSize: "13px",
                      color: "var(--wb-text-mid)",
                      textAlign: "center",
                      lineHeight: 1.5,
                    }}
                  >
                    Official session date, preparation resources, and live Zoom access link will be announced in the VIP WhatsApp group and emailed to you.
                  </div>
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
          borderTop: "1px solid var(--wb-divider)",
          background: "var(--wb-footer-bg)",
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
                style={{ objectFit: "contain", filter: resolvedTheme === "dark" ? "invert(1)" : "none", opacity: 0.85 }}
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
