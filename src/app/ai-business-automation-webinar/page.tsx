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
  Globe,
  Video,
  Check,
  Settings,
  BarChart3,
  Plus,
  Database,
  Target,
  Megaphone,
  User,
  Mail,
  Coins,
  UserCheck,
  Filter,
  Box,
  Sun,
  Moon,
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
  const [webinarTheme, setWebinarTheme] = useState<"dark" | "light">("dark");
  const isLight = webinarTheme === "light";

  const toggleTheme = () => {
    const nextTheme = webinarTheme === "dark" ? "light" : "dark";
    setWebinarTheme(nextTheme);
    try {
      if (setTheme) {
        setTheme(nextTheme);
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", nextTheme);
        document.documentElement.setAttribute("data-theme", nextTheme);
        if (nextTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        document.documentElement.style.colorScheme = nextTheme;
      }
    } catch {
      // ignore
    }
  };

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

  // Sync theme on initial load (respect saved theme if any, else default to dark)
  useEffect(() => {
    try {
      const savedTheme = typeof window !== "undefined" ? (localStorage.getItem("theme") as "dark" | "light" | null) : null;
      const initial = savedTheme || "dark";
      setWebinarTheme(initial);
      if (setTheme) {
        setTheme(initial);
      }
      if (typeof window !== "undefined") {
        document.documentElement.setAttribute("data-theme", initial);
        if (initial === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        document.documentElement.style.colorScheme = initial;
      }
    } catch {
      // ignore
    }
  }, [setTheme]);

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
      const curriculumEl = document.getElementById("what-you-will-learn");
      if (curriculumEl) {
        const rect = curriculumEl.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75 && rect.bottom > window.innerHeight * 0.25) {
          setShowSticky(false);
          return;
        }
      }
      const partnerEl = document.getElementById("partnership");
      if (partnerEl) {
        const rect = partnerEl.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75 && rect.bottom > window.innerHeight * 0.25) {
          setShowSticky(false);
          return;
        }
      }
      const whyEl = document.getElementById("why-scalepods");
      if (whyEl) {
        const rect = whyEl.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75 && rect.bottom > window.innerHeight * 0.25) {
          setShowSticky(false);
          return;
        }
      }
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
    <BeamsBackground className={`webinarpod-container ${isLight ? "wb-theme-light" : "wb-theme-dark"}`} data-webinar-theme={webinarTheme} hues={[96, 210]} intensity="strong">
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
                  filter: isLight ? "none" : "invert(1)",
                  transition: "filter 0.3s ease",
                }}
              />
            </div>
          </Link>

          {/* Right Action Cluster */}
          <div className="wb-navbar-actions">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className="wb-theme-toggle-btn"
              aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
              title={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
              {isLight ? (
                <>
                  <Moon size={15} className="wb-toggle-icon-moon" />
                  <span className="wb-toggle-label">Dark</span>
                </>
              ) : (
                <>
                  <Sun size={15} className="wb-toggle-icon-sun" />
                  <span className="wb-toggle-label">Light</span>
                </>
              )}
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

            {/* ── 1ST FOLD: THE AI AUTOMATION MASTERCLASS (HERO REDESIGN) ── */}
      <section className="wb-section-firstfold-hero" id="masterclass">
        {/* High-Res Background Canvas */}
        <Image
          src={isLight ? "/images/webinar-redesign/light/masterclass-hero-bg.png" : "/images/webinar-redesign/masterclass-hero-bg.png"}
          alt="The AI Automation Masterclass - ScalePods with Adnan Shaikh & Raunak Kumar"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="wb-firstfold-bg"
        />

        {/* Atmospheric Ambient Overlay */}
        <div className="wb-firstfold-overlay" />

        <div className="wb-firstfold-container">
          {/* Eyebrow / Badges Row */}
          <div className="wb-firstfold-topbar">
            <div className="wb-firstfold-pill">
              <span className="wb-pulse-dot-cyan" />
              <Sparkles size={14} className="text-cyan-400" />
              <span>LIVE FOUNDER-LED MASTERCLASS</span>
            </div>

            <div className="wb-firstfold-partners">
              <span className="wb-firstfold-partner-label">Certification Partner:</span>
              <div className="wb-firstfold-partner-tags">
                <span className="wb-partner-chip-openai" title="OpenAI">
                  <svg viewBox="0 0 24 24" className="wb-openai-spiral-svg wb-partner-topbar-icon" fill="currentColor">
                    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1683a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4947zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1683a.0757.0757 0 0 1-.071 0l-4.8303-2.7866A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1635a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
                  </svg>
                  <span className="wb-partner-brand-name-topbar">OpenAI</span>
                </span>
                <span className="wb-partner-chip-claude" title="Claude">
                  <svg viewBox="0 0 24 24" className="wb-claude-sunburst-svg wb-partner-topbar-icon" fill="currentColor">
                    <path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z" />
                  </svg>
                  <span className="wb-partner-brand-name-topbar wb-claude-name-gradient">Claude</span>
                </span>
              </div>
            </div>
          </div>

          {/* Headline & Subtitle */}
          <div className="wb-firstfold-header">
            <h1 className="wb-firstfold-title">
              <span className="wb-firstfold-title-top">BEFORE YOU HIRE ANOTHER PERSON...</span>
              <span className="wb-firstfold-title-grad">FIND OUT HOW MUCH YOUR BUSINESS CAN AUTOMATE</span>
            </h1>
            <p className="wb-firstfold-desc">
              Identify repetitive tasks, connect broken workflows, and deploy AI-powered automation across Sales, Marketing, HR &amp; Operations—without writing a single line of code.
            </p>
          </div>

          {/* 6 Top Data Metrics Cards */}
          {/* 6 Top Data Metrics Cards - Merging smoothly from Blue to Green */}
          <div className="wb-firstfold-stats-grid">
            <div className="wb-firstfold-stat-card" style={{ ["--stat-glow-color" as string]: "linear-gradient(90deg, #38BDF8, #33C6E1)", ["--stat-color" as string]: isLight ? "#090D14" : "#FFFFFF", ["--stat-shadow" as string]: isLight ? "rgba(14, 165, 233, 0.15)" : "rgba(56, 189, 248, 0.3)" }}>
              <span className="wb-firstfold-stat-val">10X</span>
              <span className="wb-firstfold-stat-lbl">Revenue Growth Improvement</span>
            </div>

            <div className="wb-firstfold-stat-card" style={{ ["--stat-glow-color" as string]: "linear-gradient(90deg, #33C6E1, #2DD4BF)", ["--stat-color" as string]: isLight ? "#090D14" : "#FFFFFF", ["--stat-shadow" as string]: isLight ? "rgba(20, 184, 166, 0.15)" : "rgba(51, 198, 225, 0.3)" }}>
              <span className="wb-firstfold-stat-val">80%</span>
              <span className="wb-firstfold-stat-lbl">Hiring Time Reduced</span>
            </div>

            <div className="wb-firstfold-stat-card" style={{ ["--stat-glow-color" as string]: "linear-gradient(90deg, #2DD4BF, #30D2B8)", ["--stat-color" as string]: isLight ? "#090D14" : "#FFFFFF", ["--stat-shadow" as string]: isLight ? "rgba(20, 184, 166, 0.15)" : "rgba(45, 212, 191, 0.3)" }}>
              <span className="wb-firstfold-stat-val">80%</span>
              <span className="wb-firstfold-stat-lbl">Faster Brand Scaling vs Agencies</span>
            </div>

            <div className="wb-firstfold-stat-card" style={{ ["--stat-glow-color" as string]: "linear-gradient(90deg, #30D2B8, #36D7A6)", ["--stat-color" as string]: isLight ? "#090D14" : "#FFFFFF", ["--stat-shadow" as string]: isLight ? "rgba(16, 185, 129, 0.15)" : "rgba(50, 213, 179, 0.3)" }}>
              <span className="wb-firstfold-stat-val">95%</span>
              <span className="wb-firstfold-stat-lbl">Manual Data Entry Eliminated</span>
            </div>

            <div className="wb-firstfold-stat-card" style={{ ["--stat-glow-color" as string]: "linear-gradient(90deg, #36D7A6, #3FD995)", ["--stat-color" as string]: isLight ? "#090D14" : "#FFFFFF", ["--stat-shadow" as string]: isLight ? "rgba(16, 185, 129, 0.15)" : "rgba(61, 217, 155, 0.3)" }}>
              <span className="wb-firstfold-stat-val">&lt; 60s</span>
              <span className="wb-firstfold-stat-lbl">Instant Lead Engagement</span>
            </div>

            <div className="wb-firstfold-stat-card" style={{ ["--stat-glow-color" as string]: "linear-gradient(90deg, #3FD995, #48DD83)", ["--stat-color" as string]: isLight ? "#090D14" : "#FFFFFF", ["--stat-shadow" as string]: isLight ? "rgba(5, 150, 105, 0.15)" : "rgba(72, 221, 131, 0.3)" }}>
              <span className="wb-firstfold-stat-val">400%</span>
              <span className="wb-firstfold-stat-lbl">Operational Efficiency ROI</span>
            </div>
          </div>

          {/* Main Stage Grid: Left Booking / Specs, Right Both Founders */}
          <div className="wb-firstfold-stage-grid">
            {/* Left: High-Conversion Booking Box */}
            <div className="wb-firstfold-booking-box">
              <div className="wb-firstfold-booking-top">
                <div className="wb-booking-live-pill">
                  <span className="wb-pulse-dot-cyan" style={{ backgroundColor: "#48DD83", boxShadow: "0 0 10px #48DD83" }} />
                  <span>LIVE ONLINE WEBINAR</span>
                </div>
                <span className="wb-booking-discount-chip">SAVE 95% TODAY</span>
              </div>

              <div className="wb-booking-price-row">
                <span className="wb-booking-price-curr">₹99</span>
                <span className="wb-booking-price-strike">₹1,999</span>
              </div>

              <div className="wb-booking-features-list">
                <div className="wb-booking-feature-item">
                  <CheckCircle2 size={16} className="wb-booking-feature-icon" />
                  <span><strong>3+ Hours</strong> of founder-led live systems walkthrough</span>
                </div>
                <div className="wb-booking-feature-item">
                  <CheckCircle2 size={16} className="wb-booking-feature-icon" />
                  <span>Deploy automations across <strong>Sales, Marketing, HR &amp; Ops</strong></span>
                </div>
                <div className="wb-booking-feature-item">
                  <CheckCircle2 size={16} className="wb-booking-feature-icon" />
                  <span>Live Q&amp;A with <strong>Adnan Shaikh</strong> &amp; <strong>Raunak Kumar</strong></span>
                </div>
                <div className="wb-booking-feature-item">
                  <CheckCircle2 size={16} className="wb-booking-feature-icon" />
                  <span>Certification with <strong>OpenAI &amp; Claude</strong> partner frameworks</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleOpenModal}
                className="wb-firstfold-cta-btn"
                aria-label="Reserve Seat for ₹99"
              >
                <span>RESERVE SEAT FOR ₹99</span>
                <ArrowRight size={17} />
              </button>

              <div className="wb-firstfold-seats-note">
                <Flame size={15} />
                <span>Limited seats available. Highly interactive live session.</span>
              </div>
            </div>

            {/* Right: Both Founder Image Cards (As added in 2nd fold) */}
            <div className="wb-firstfold-founders-wrap">
              {/* Founder 1: Adnan Shaikh */}
              <div className="wb-firstfold-founder-card wb-ff-card-adnan">
                <div className="wb-firstfold-founder-img-frame">
                  <Image
                    src={isLight ? "/images/webinar-redesign/light/adnan-shaikh.png" : "/images/webinar-redesign/adnan-shaikh.png"}
                    alt="Adnan Shaikh - Co-Founder & CEO, ScalePods"
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="wb-firstfold-founder-img"
                  />
                </div>
                <div className="wb-firstfold-founder-body">
                  <h3 className="wb-firstfold-founder-name">Adnan Shaikh</h3>
                  <div className="wb-firstfold-founder-role">
                    Co-Founder &amp; CEO, <span className="wb-highlight-scalepods">ScalePods</span>
                  </div>
                  <div className="wb-firstfold-founder-focus">
                    Sales Leadership &amp; Revenue Growth
                  </div>
                  <div className="wb-firstfold-founder-badge wb-ff-badge-green">
                    <span>⚡ Sales &amp; Revenue OS</span>
                  </div>
                </div>
              </div>

              {/* Founder 2: Raunak Kumar */}
              <div className="wb-firstfold-founder-card wb-ff-card-raunak">
                <div className="wb-firstfold-founder-img-frame">
                  <Image
                    src={isLight ? "/images/webinar-redesign/light/raunak-kumar.png" : "/images/webinar-redesign/raunak-kumar.png"}
                    alt="Raunak Kumar - Co-Founder, CTO & CPO, ScalePods"
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="wb-firstfold-founder-img"
                  />
                </div>
                <div className="wb-firstfold-founder-body">
                  <h3 className="wb-firstfold-founder-name">Raunak Kumar</h3>
                  <div className="wb-firstfold-founder-role">
                    Co-Founder, CTO &amp; CPO, <span className="wb-highlight-scalepods">ScalePods</span>
                  </div>
                  <div className="wb-firstfold-founder-focus">
                    Product Architecture &amp; Enterprise AI
                  </div>
                  <div className="wb-firstfold-founder-badge wb-ff-badge-blue">
                    <span>🧠 Enterprise AI &amp; Architecture</span>
                  </div>
                </div>
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
            src={isLight ? "/images/webinar-redesign/light/founders-partners-bg.png" : "/images/webinar-redesign/founders-partners-bg.webp"}
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
                <span className="wb-text-highlight-green">building</span> these systems.
              </h2>

              <p className="wb-founders-main-desc">
                Together, <span className="wb-highlight-founder">Adnan Shaikh</span> and <span className="wb-highlight-founder">Raunak Kumar</span> bring business and technology perspectives to the same conversation: <strong>what should be improved, what can be automated, and how can the solution fit into the way a business actually operates?</strong>
              </p>

              {/* 3 Experience Badges */}
              <div className="wb-founders-badges-row">
                <div className="wb-founder-exp-badge">
                  <div className="wb-exp-badge-icon-wrap">
                    <Zap size={14} className="wb-exp-icon-green" />
                  </div>
                  <span>Certified OpenAI &amp; Claude Partners</span>
                </div>

                <div className="wb-founder-exp-badge">
                  <div className="wb-exp-badge-icon-wrap">
                    <Users size={14} className="wb-exp-icon-cyan" />
                  </div>
                  <span>Hands-on business guidance</span>
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
                <span>Reserve Your Seat (₹99)</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Right Column: 2 AI Partner Cards */}
            <div className="wb-founders-cards-grid">
              {/* Claude Card */}
              <div className="wb-partner-brand-card wb-partner-card-claude">
                <div className="wb-partner-brand-header">
                  <div className="wb-partner-brand-logo-wrap">
                    <svg viewBox="0 0 24 24" className="wb-claude-sunburst-svg" fill="currentColor">
                      <path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z" />
                    </svg>
                    <div className="wb-partner-brand-titles">
                      <span className="wb-brand-name-bold wb-claude-name-gradient">Claude</span>
                      <span className="wb-brand-sub-anthropic wb-anthropic-accent">by ANTHROPIC</span>
                    </div>
                  </div>
                </div>

                <div className="wb-partner-status-pill wb-claude-status-pill">
                  <CheckCircle2 size={13} className="wb-status-check-icon" />
                  <span>Official AI Partner</span>
                </div>

                <div className="wb-partner-bullets-list">
                  <div className="wb-partner-bullet-row">
                    <CheckCircle2 size={15} className="wb-bullet-green-icon wb-bullet-claude-icon" />
                    <span>Advanced reasoning &amp; complex workflows</span>
                  </div>
                  <div className="wb-partner-bullet-row">
                    <CheckCircle2 size={15} className="wb-bullet-green-icon wb-bullet-claude-icon" />
                    <span>Enterprise-grade security &amp; safety</span>
                  </div>
                  <div className="wb-partner-bullet-row">
                    <CheckCircle2 size={15} className="wb-bullet-green-icon wb-bullet-claude-icon" />
                    <span>Built for production business execution</span>
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
                  <p className="wb-expect-node-sub"><span className="wb-highlight-founder">Adnan Shaikh</span> &amp; <span className="wb-highlight-founder">Raunak Kumar</span></p>
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
            src={isLight ? "/images/webinar-redesign/light/not-ai-tools-bg.png" : "/images/webinar-redesign/not-ai-tools-bg.webp"}
            alt="This is not a learn AI tools webinar - ScalePods"
            fill
            priority
            quality={92}
            sizes="(max-width: 900px) 0px, 100vw"
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
                src={isLight ? "/images/webinar-redesign/light/not-ai-tools-graphic.png" : "/images/webinar-redesign/not-ai-tools-graphic.webp"}
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


      {/* ── SECTION 8: THE PROPRIETARY FRAMEWORK (THE BIG IDEA) ─────────────── */}
      <section className="wb-section-fullscreen-framework" id="big-idea">
        {/* ── DESKTOP: FULLSCREEN 16:9 CANVAS STAGE (Matches Webinar Fold Architecture) ── */}
        <div className="wb-framework-fullscreen-stage">
          <Image
            src={isLight ? "/images/webinar-redesign/light/framework-bg.png" : "/images/webinar-redesign/framework-bg.webp"}
            alt="The Proprietary Framework - The Big Idea - ScalePods"
            fill
            priority
            quality={92}
            sizes="(max-width: 1024px) 0px, 100vw"
            className="wb-framework-canvas-img"
          />
          <div className="wb-framework-canvas-overlay" />

          {/* Top Header & 7 Entity Pills (y: 2.8% to 34%) */}
          <div className="wb-framework-stage-header">
            <div className="wb-pill-badge-green" style={{ marginBottom: "clamp(6px, 0.75vw, 12px)" }}>
              <Sparkles size={13} className="wb-pill-badge-icon" />
              <span>THE PROPRIETARY FRAMEWORK</span>
            </div>

            <h2 className="wb-framework-stage-title">
              THE BIG <span className="wb-framework-title-cyan">IDEA</span>
            </h2>

            {/* 7 Glowing Entity Pills matching Reference Image */}
            <div className="wb-framework-pills-wrap">
              {/* Row 1: 4 pills */}
              <div className="wb-framework-pills-row">
                <div className="wb-framework-pill">
                  <div className="wb-fpill-icon-wrap wb-fpill-ico-cyan">
                    <User size={15} />
                  </div>
                  <span>A lead.</span>
                </div>

                <div className="wb-framework-pill">
                  <div className="wb-fpill-icon-wrap wb-fpill-ico-cyan">
                    <Users size={15} />
                  </div>
                  <span>A candidate.</span>
                </div>

                <div className="wb-framework-pill">
                  <div className="wb-fpill-icon-wrap wb-fpill-ico-cyan">
                    <MessageSquare size={15} />
                  </div>
                  <span>A customer enquiry.</span>
                </div>

                <div className="wb-framework-pill">
                  <div className="wb-fpill-icon-wrap wb-fpill-ico-cyan">
                    <Mail size={15} />
                  </div>
                  <span>An internal request.</span>
                </div>
              </div>

              {/* Row 2: 3 pills */}
              <div className="wb-framework-pills-row">
                <div className="wb-framework-pill">
                  <div className="wb-fpill-icon-wrap wb-fpill-ico-mint">
                    <Ticket size={15} />
                  </div>
                  <span>A support ticket.</span>
                </div>

                <div className="wb-framework-pill">
                  <div className="wb-fpill-icon-wrap wb-fpill-ico-mint">
                    <Megaphone size={15} />
                  </div>
                  <span>A marketing response.</span>
                </div>

                <div className="wb-framework-pill">
                  <div className="wb-fpill-icon-wrap wb-fpill-ico-cyan">
                    <Coins size={15} />
                  </div>
                  <span>A finance task.</span>
                </div>
              </div>
            </div>

            {/* Subtext */}
            <div className="wb-framework-subtext-wrap">
              <p className="wb-framework-subtext-lead">
                They may look completely different.
              </p>
              <p className="wb-framework-subtext-highlight">
                But underneath… <strong>THEY ARE ALL WORKFLOWS.</strong>
              </p>
            </div>
          </div>

          {/* Middle Graphic (y: 47.5% - 79.5%):
              Shines through seamlessly from framework-bg.webp where the 3D Workflow Engine is rendered! */}

          {/* Bottom Framework Callout Bar matching Reference Image (y: 83% - 94%) */}
          <div className="wb-framework-bottom-card">
            <div className="wb-framework-sparkle-box">
              <Sparkles size={20} className="wb-sparkle-mint" />
            </div>
            <div className="wb-framework-bottom-text">
              <span className="wb-framework-bottom-label">
                THE 5-STEP CONNECTED WORKFLOW PATTERN
              </span>
              <div className="wb-framework-bottom-flow">
                Capture <span className="wb-flow-arrow">➔</span> Respond <span className="wb-flow-arrow">➔</span> Qualify <span className="wb-flow-arrow">➔</span> Sync <span className="wb-flow-arrow">➔</span> Follow Up
              </div>
            </div>

            <button
              onClick={handleOpenModal}
              className="wb-framework-bottom-btn"
            >
              <span>Reserve Seat (₹99)</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* ── MOBILE & TABLET RESPONSIVE WRAPPER (<= 1024px) ── */}
        <div className="wb-framework-mobile-wrapper">
          <div className="wb-container">
            <div className="wb-framework-mobile-header">
              <div className="wb-pill-badge-green" style={{ marginBottom: "14px" }}>
                <Sparkles size={13} className="wb-pill-badge-icon" />
                <span>THE PROPRIETARY FRAMEWORK</span>
              </div>

              <h2 className="wb-framework-mobile-title">
                THE BIG <span className="wb-framework-title-cyan">IDEA</span>
              </h2>

              {/* 7 Entity Pills */}
              <div className="wb-framework-pills-wrap">
                <div className="wb-framework-pills-row">
                  <div className="wb-framework-pill">
                    <div className="wb-fpill-icon-wrap wb-fpill-ico-cyan"><User size={14} /></div>
                    <span>A lead.</span>
                  </div>
                  <div className="wb-framework-pill">
                    <div className="wb-fpill-icon-wrap wb-fpill-ico-cyan"><Users size={14} /></div>
                    <span>A candidate.</span>
                  </div>
                  <div className="wb-framework-pill">
                    <div className="wb-fpill-icon-wrap wb-fpill-ico-cyan"><MessageSquare size={14} /></div>
                    <span>A customer enquiry.</span>
                  </div>
                  <div className="wb-framework-pill">
                    <div className="wb-fpill-icon-wrap wb-fpill-ico-cyan"><Mail size={14} /></div>
                    <span>An internal request.</span>
                  </div>
                </div>

                <div className="wb-framework-pills-row">
                  <div className="wb-framework-pill">
                    <div className="wb-fpill-icon-wrap wb-fpill-ico-mint"><Ticket size={14} /></div>
                    <span>A support ticket.</span>
                  </div>
                  <div className="wb-framework-pill">
                    <div className="wb-fpill-icon-wrap wb-fpill-ico-mint"><Megaphone size={14} /></div>
                    <span>A marketing response.</span>
                  </div>
                  <div className="wb-framework-pill">
                    <div className="wb-fpill-icon-wrap wb-fpill-ico-cyan"><Coins size={14} /></div>
                    <span>A finance task.</span>
                  </div>
                </div>
              </div>

              <div className="wb-framework-subtext-wrap">
                <p className="wb-framework-subtext-lead">
                  They may look completely different.
                </p>
                <p className="wb-framework-subtext-highlight">
                  But underneath… <strong>THEY ARE ALL WORKFLOWS.</strong>
                </p>
              </div>
            </div>

            {/* Mobile Diagram Image */}
            <div className="wb-framework-mobile-stage-box">
              <Image
                src={isLight ? "/images/webinar-redesign/light/framework-diagram-mobile.png" : "/images/webinar-redesign/framework-diagram-mobile.webp"}
                alt="Proprietary AI Workflow Engine Connecting Leads, Customers, Support, Marketing, and Finance"
                width={1200}
                height={321}
                quality={92}
                sizes="(max-width: 900px) 100vw, 850px"
                className="wb-framework-mobile-img"
              />
            </div>

            {/* Mobile Bottom Card */}
            <div className="wb-framework-mobile-bottom-card">
              <div className="wb-framework-mobile-card-top">
                <div className="wb-framework-sparkle-box">
                  <Sparkles size={20} className="wb-sparkle-mint" />
                </div>
                <div className="wb-framework-bottom-text">
                  <span className="wb-framework-bottom-label">
                    THE 5-STEP CONNECTED WORKFLOW PATTERN
                  </span>
                  <div className="wb-framework-bottom-flow">
                    Capture <span className="wb-flow-arrow">➔</span> Respond <span className="wb-flow-arrow">➔</span> Qualify <span className="wb-flow-arrow">➔</span> Sync <span className="wb-flow-arrow">➔</span> Follow Up
                  </div>
                </div>
              </div>

              <button
                onClick={handleOpenModal}
                className="wb-framework-bottom-btn"
                style={{ width: "100%", justifyContent: "center", marginTop: "14px" }}
              >
                <span>Reserve Seat (₹99)</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 9: WHAT YOU'LL LEARN (SLIDES 18 & 19) ──────────────────────── */}
      <section className="wb-section-fullscreen-curriculum" id="what-you-will-learn">
        {/* ── DESKTOP: FULLSCREEN 16:9 CANVAS STAGE (Slide 18) ── */}
        <div className="wb-curriculum-fullscreen-stage">
          <Image
            src={isLight ? "/images/webinar-redesign/light/curriculum-bg.png" : "/images/webinar-redesign/curriculum-bg.webp"}
            alt="What You'll Learn - AI Business Automation Masterclass Curriculum"
            fill
            priority
            quality={92}
            sizes="(max-width: 1024px) 0px, 100vw"
            className="wb-curriculum-canvas-img"
          />
          <div className="wb-curriculum-canvas-overlay" />

          {/* Top Header (y: 4.5% - 19%) */}
          <div className="wb-curriculum-stage-header">
            <div className="wb-pill-badge-green" style={{ marginBottom: "clamp(6px, 0.7vw, 10px)" }}>
              <CheckCircle2 size={13} className="wb-pill-badge-icon" />
              <span>WHAT YOU&apos;LL WALK AWAY WITH</span>
            </div>

            <h2 className="wb-curriculum-stage-title">
              WHAT YOU’LL <span className="wb-curriculum-title-green">WALK AWAY WITH</span>
            </h2>

            <p className="wb-curriculum-stage-desc">
              By the end of this founder-led session, you&apos;ll have clear clarity on:
            </p>
          </div>

          {/* Left 3 Cards Column (y: 24% - 88%) */}
          <div className="wb-curriculum-stage-col-left">
            <div className="wb-cstage-card wb-cstage-card-green">
              <div className="wb-cstage-icon-badge wb-cbadge-green">
                <Settings size={22} />
              </div>
              <div className="wb-cstage-content">
                <strong className="wb-cstage-item-title wb-ctitle-green">Where to start</strong>
                <p className="wb-cstage-card-text">
                  Recognize repetitive, rule-based tasks that are prime candidates for workflow automation.
                </p>
              </div>
            </div>

            <div className="wb-cstage-card wb-cstage-card-cyan">
              <div className="wb-cstage-icon-badge wb-cbadge-cyan">
                <Target size={22} />
              </div>
              <div className="wb-cstage-content">
                <strong className="wb-cstage-item-title wb-ctitle-cyan">What to prioritize</strong>
                <p className="wb-cstage-card-text">
                  Evaluate opportunities based on business impact, frequency, time spent, and implementation effort.
                </p>
              </div>
            </div>

            <div className="wb-cstage-card wb-cstage-card-green">
              <div className="wb-cstage-icon-badge wb-cbadge-green">
                <Layers size={22} />
              </div>
              <div className="wb-cstage-content">
                <strong className="wb-cstage-item-title wb-ctitle-green">How workflows connect</strong>
                <p className="wb-cstage-card-text">
                  Understand how inputs, decisions, systems, and follow-up actions fit together seamlessly.
                </p>
              </div>
            </div>
          </div>

          {/* Central Workspace Pedestal shines through from curriculum-bg.webp */}

          {/* Right 3 Cards Column (y: 24% - 88%) */}
          <div className="wb-curriculum-stage-col-right">
            <div className="wb-cstage-card wb-cstage-card-green">
              <div className="wb-cstage-icon-badge wb-cbadge-green">
                <BrainCircuit size={22} />
              </div>
              <div className="wb-cstage-content">
                <strong className="wb-cstage-item-title wb-ctitle-green">Where AI adds value</strong>
                <p className="wb-cstage-card-text">
                  Distinguish between rule-based automation, tasks suited for AI, and decisions requiring human oversight.
                </p>
              </div>
            </div>

            <div className="wb-cstage-card wb-cstage-card-cyan">
              <div className="wb-cstage-icon-badge wb-cbadge-cyan">
                <Box size={22} />
              </div>
              <div className="wb-cstage-content">
                <strong className="wb-cstage-item-title wb-ctitle-cyan">How to approach integration</strong>
                <p className="wb-cstage-card-text">
                  Connect automation into your existing business stack without breaking everyday operations.
                </p>
              </div>
            </div>

            <div className="wb-cstage-card wb-cstage-card-green">
              <div className="wb-cstage-icon-badge wb-cbadge-green">
                <TrendingUp size={22} />
              </div>
              <div className="wb-cstage-content">
                <strong className="wb-cstage-item-title wb-ctitle-green">What to do next</strong>
                <p className="wb-cstage-card-text">
                  Identify immediate automation opportunities across your Sales, Marketing, HR, or Operations workflows.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── MOBILE & TABLET RESPONSIVE WRAPPER (<= 1024px) ── */}
        <div className="wb-curriculum-mobile-wrapper">
          <div className="wb-container">
            <div className="wb-curriculum-mobile-header">
              <div className="wb-pill-badge-green" style={{ marginBottom: "14px" }}>
                <CheckCircle2 size={13} className="wb-pill-badge-icon" />
                <span>WHAT YOU&apos;LL WALK AWAY WITH</span>
              </div>

              <h2 className="wb-curriculum-mobile-title">
                WHAT YOU’LL <span className="wb-curriculum-title-green">WALK AWAY WITH</span>
              </h2>

              <p className="wb-curriculum-mobile-desc">
                By the end of this live session, you&apos;ll have clear clarity on:
              </p>
            </div>

            {/* 3D Central Workspace Visual Stage */}
            <div className="wb-curriculum-mobile-stage-box">
              <Image
                src={isLight ? "/images/webinar-redesign/light/curriculum-pedestal-mobile.png" : "/images/webinar-redesign/curriculum-pedestal-mobile.webp"}
                alt="Interactive AI automation workspace and laptop dashboard"
                width={1200}
                height={872}
                quality={92}
                sizes="(max-width: 900px) 100vw, 850px"
                className="wb-curriculum-mobile-img"
              />
            </div>

            {/* 6 Curriculum Cards Grid */}
            <div className="wb-curriculum-mobile-grid">
              {[
                {
                  label: "Where to start",
                  title: "Recognize repetitive, rule-based tasks suitable for automation",
                  icon: Settings,
                  color: "green",
                },
                {
                  label: "What to prioritize",
                  title: "Evaluate based on business impact, frequency, time spent, and effort",
                  icon: Target,
                  color: "cyan",
                },
                {
                  label: "How workflows connect",
                  title: "Understand how inputs, decisions, systems, and follow-ups fit together",
                  icon: Layers,
                  color: "green",
                },
                {
                  label: "Where AI adds value",
                  title: "Distinguish rules vs. AI-assisted interpretation vs. human oversight",
                  icon: BrainCircuit,
                  color: "cyan",
                },
                {
                  label: "How to integrate",
                  title: "Connect automation into your existing tools without operational disruption",
                  icon: Box,
                  color: "green",
                },
                {
                  label: "What to do next",
                  title: "Identify practical opportunities across Sales, Marketing, HR, or Operations",
                  icon: TrendingUp,
                  color: "cyan",
                },
              ].map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div key={idx} className={`wb-curriculum-card wb-ccard-${item.color}`}>
                    <div className={`wb-ccard-icon-badge wb-cbadge-${item.color}`}>
                      <IconComponent size={18} />
                    </div>
                    <div>
                      <span className={`wb-curriculum-card-badge wb-cbadge-text-${item.color}`}>
                        {item.label}
                      </span>
                      <p className="wb-curriculum-card-text" style={{ marginTop: "4px" }}>{item.title}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <p style={{ fontSize: "13px", color: "var(--wb-text-faint)", textAlign: "center", marginTop: "20px", lineHeight: 1.5 }}>
              *No coding or technical background required. This session focuses strictly on business processes and practical implementation.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 10: BUSINESS BRAIN + TECHNOLOGY BRAIN (SLIDES 20 & 21) ─────── */}
      <section className="wb-section-fullscreen-partnership" id="partnership">
        {/* ── DESKTOP: FULLSCREEN 16:9 CANVAS STAGE (Slide 20) ── */}
        <div className="wb-partnership-fullscreen-stage">
          <Image
            src={isLight ? "/images/webinar-redesign/light/partnership-bg.png" : "/images/webinar-redesign/partnership-bg.webp"}
            alt="Claude + OpenAI Partnership - Business Brain and Technology Brain"
            fill
            priority
            quality={92}
            sizes="(max-width: 1024px) 0px, 100vw"
            className="wb-partnership-canvas-img"
          />
          <div className="wb-partnership-canvas-overlay" />

          {/* Top Header (y: 3.5% - 22%) */}
          <div className="wb-partnership-stage-header">
            <div className="wb-pill-badge-green" style={{ marginBottom: "clamp(6px, 0.7vw, 10px)" }}>
              <Sparkles size={13} className="wb-pill-badge-icon" />
              <span><span className="wb-highlight-claude">CLAUDE</span> + <span className="wb-highlight-openai">OPENAI</span> PARTNERSHIP</span>
            </div>

            <h2 className="wb-partnership-stage-title">
              FROM THE BUSINESS BRAIN +{" "}
              <span className="wb-partnership-title-cyan">THE TECHNOLOGY BRAIN</span>
            </h2>

            <p className="wb-partnership-stage-desc">
              YOU GET BOTH SIDES OF THE CONVERSATION.
            </p>
          </div>

          {/* Center Speaker Cards & Connector (y: 24% - 82%) */}
          <div className="wb-partnership-stage-body">
            {/* Adnan Card */}
            <div className="wb-partner-card wb-partner-card-green">
              <div className="wb-partner-photo-wrap">
                <Image
                  src={isLight ? "/images/webinar-redesign/light/adnan-partner-clean.png" : "/images/webinar-redesign/adnan-partner-clean.webp"}
                  alt="Adnan Shaikh - Co-Founder &amp; CEO, ScalePods"
                  fill
                  quality={90}
                  sizes="(max-width: 1024px) 0px, (max-width: 1400px) 30vw, 440px"
                  className="wb-partner-photo"
                />
                <div className="wb-partner-photo-fade wb-pfade-green" />
              </div>

              <div className="wb-partner-content">
                <div className="wb-partner-header-row">
                  <span className="wb-partner-dash wb-pdash-green" />
                  <h3 className="wb-partner-name">ADNAN SHAIKH</h3>
                </div>

                <div className="wb-partner-role wb-prole-green">
                  Co-Founder &amp; CEO — <span className="wb-highlight-scalepods">ScalePods</span>
                </div>

                <div className="wb-partner-tags wb-ptags-green">
                  Business Growth • Sales Systems • Revenue Operations • CRM Automation
                </div>

                <p className="wb-partner-bio">
                  Brings a deep understanding of how businesses scale, what customers need, and how to turn strategy into real revenue.
                </p>
              </div>
            </div>

            {/* Plus Center Connector */}
            <div className="wb-partner-connector">
              <div className="wb-partner-line" />
              <div className="wb-partner-plus-circle">
                <Plus size={16} />
              </div>
            </div>

            {/* Raunak Card */}
            <div className="wb-partner-card wb-partner-card-blue">
              <div className="wb-partner-photo-wrap">
                <Image
                  src={isLight ? "/images/webinar-redesign/light/raunak-partner-v2.png" : "/images/webinar-redesign/raunak-partner-v2.webp"}
                  alt="Raunak Kumar - Co-Founder, CTO &amp; CPO, ScalePods"
                  fill
                  quality={90}
                  sizes="(max-width: 1024px) 0px, (max-width: 1400px) 30vw, 440px"
                  className="wb-partner-photo"
                />
                <div className="wb-partner-photo-fade wb-pfade-blue" />
              </div>

              <div className="wb-partner-content">
                <div className="wb-partner-header-row">
                  <span className="wb-partner-dash wb-pdash-blue" />
                  <h3 className="wb-partner-name">RAUNAK KUMAR</h3>
                </div>

                <div className="wb-partner-role wb-prole-blue">
                  Co-Founder, CTO &amp; CPO — <span className="wb-highlight-scalepods">ScalePods</span>
                </div>

                <div className="wb-partner-tags wb-ptags-blue">
                  AI Systems • Product Strategy • Technology • Automation • Business Growth
                </div>

                <p className="wb-partner-bio">
                  Builds the technology, automations and systems that make growth scalable, efficient and future-ready.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Pathway Bar (y: 86% - 94%) */}
          <div className="wb-partnership-stage-pathway">
            <div className="wb-pathway-node">
              <div className="wb-pathway-icon-wrap wb-pico-green">
                <Target size={15} />
              </div>
              <span className="wb-pathway-node-text">BUSINESS PROBLEM</span>
            </div>

            <span className="wb-pathway-flow-arrow">→</span>

            <div className="wb-pathway-node">
              <div className="wb-pathway-icon-wrap wb-pico-blue">
                <Layers size={15} />
              </div>
              <span className="wb-pathway-node-text">WORKFLOW</span>
            </div>

            <span className="wb-pathway-flow-arrow">→</span>

            <div className="wb-pathway-node">
              <div className="wb-pathway-icon-wrap wb-pico-green">
                <BrainCircuit size={15} />
              </div>
              <span className="wb-pathway-node-text">AI</span>
            </div>

            <span className="wb-pathway-flow-arrow">→</span>

            <div className="wb-pathway-node">
              <div className="wb-pathway-icon-wrap wb-pico-blue">
                <Zap size={15} />
              </div>
              <span className="wb-pathway-node-text">AUTOMATION</span>
            </div>

            <span className="wb-pathway-flow-arrow">→</span>

            <div className="wb-pathway-node">
              <div className="wb-pathway-icon-wrap wb-pico-green">
                <BarChart3 size={15} />
              </div>
              <span className="wb-pathway-node-text wb-ptext-green">BUSINESS OUTCOME</span>
            </div>
          </div>
        </div>

        {/* ── MOBILE & TABLET RESPONSIVE WRAPPER (<= 1024px) ── */}
        <div className="wb-partnership-mobile-wrapper">
          <div className="wb-container">
            <div className="wb-partnership-mobile-header">
              <div className="wb-pill-badge-green" style={{ marginBottom: "14px" }}>
                <Sparkles size={13} className="wb-pill-badge-icon" />
                <span><span className="wb-highlight-claude">CLAUDE</span> + <span className="wb-highlight-openai">OPENAI</span> PARTNERSHIP</span>
              </div>

              <h2 className="wb-partnership-mobile-title">
                FROM THE BUSINESS BRAIN +{" "}
                <span className="wb-partnership-title-cyan">THE TECHNOLOGY BRAIN</span>
              </h2>

              <p className="wb-partnership-mobile-desc">
                YOU GET BOTH SIDES OF THE CONVERSATION.
              </p>
            </div>

            {/* Mobile Stacked Cards */}
            <div className="wb-partnership-mobile-cards">
              {/* Adnan Card */}
              <div className="wb-partner-card wb-partner-card-green">
                <div className="wb-partner-photo-wrap">
                  <Image
                    src={isLight ? "/images/webinar-redesign/light/adnan-partner-clean.png" : "/images/webinar-redesign/adnan-partner-clean.webp"}
                    alt="Adnan Shaikh - Co-Founder &amp; CEO, ScalePods"
                    fill
                    quality={90}
                    sizes="(max-width: 1024px) 100vw, 0px"
                    className="wb-partner-photo"
                  />
                  <div className="wb-partner-photo-fade wb-pfade-green" />
                </div>
                <div className="wb-partner-content">
                  <div className="wb-partner-header-row">
                    <span className="wb-partner-dash wb-pdash-green" />
                    <h3 className="wb-partner-name">ADNAN SHAIKH</h3>
                  </div>
                  <div className="wb-partner-role wb-prole-green">
                    Co-Founder &amp; CEO — <span className="wb-highlight-scalepods">ScalePods</span>
                  </div>
                  <div className="wb-partner-tags wb-ptags-green">
                    Business Growth • Sales Systems • Revenue Operations • CRM Automation
                  </div>
                  <p className="wb-partner-bio">
                    Brings a deep understanding of how businesses scale, what customers need, and how to turn strategy into real revenue.
                  </p>
                </div>
              </div>

              {/* Mobile Connector */}
              <div className="wb-partner-connector-mobile">
                <div className="wb-partner-plus-circle">
                  <Plus size={16} />
                </div>
              </div>

              {/* Raunak Card */}
              <div className="wb-partner-card wb-partner-card-blue">
                <div className="wb-partner-photo-wrap">
                  <Image
                    src={isLight ? "/images/webinar-redesign/light/raunak-partner-v2.png" : "/images/webinar-redesign/raunak-partner-v2.webp"}
                    alt="Raunak Kumar - Co-Founder, CTO &amp; CPO, ScalePods"
                    fill
                    quality={90}
                    sizes="(max-width: 1024px) 100vw, 0px"
                    className="wb-partner-photo"
                  />
                  <div className="wb-partner-photo-fade wb-pfade-blue" />
                </div>
                <div className="wb-partner-content">
                  <div className="wb-partner-header-row">
                    <span className="wb-partner-dash wb-pdash-blue" />
                    <h3 className="wb-partner-name">RAUNAK KUMAR</h3>
                  </div>
                  <div className="wb-partner-role wb-prole-blue">
                    Co-Founder, CTO &amp; CPO — <span className="wb-highlight-scalepods">ScalePods</span>
                  </div>
                  <div className="wb-partner-tags wb-ptags-blue">
                    AI Systems • Product Strategy • Technology • Automation • Business Growth
                  </div>
                  <p className="wb-partner-bio">
                    Builds the technology, automations and systems that make growth scalable, efficient and future-ready.
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile Pathway Container */}
            <div className="wb-partnership-mobile-pathway">
              <div className="wb-pathway-mobile-grid">
                <div className="wb-pathway-node">
                  <div className="wb-pathway-icon-wrap wb-pico-green">
                    <Target size={14} />
                  </div>
                  <span className="wb-pathway-node-text">BUSINESS PROBLEM</span>
                </div>
                <span className="wb-pathway-flow-arrow">↓</span>

                <div className="wb-pathway-node">
                  <div className="wb-pathway-icon-wrap wb-pico-blue">
                    <Layers size={14} />
                  </div>
                  <span className="wb-pathway-node-text">WORKFLOW</span>
                </div>
                <span className="wb-pathway-flow-arrow">↓</span>

                <div className="wb-pathway-node">
                  <div className="wb-pathway-icon-wrap wb-pico-green">
                    <BrainCircuit size={14} />
                  </div>
                  <span className="wb-pathway-node-text">AI</span>
                </div>
                <span className="wb-pathway-flow-arrow">↓</span>

                <div className="wb-pathway-node">
                  <div className="wb-pathway-icon-wrap wb-pico-blue">
                    <Zap size={14} />
                  </div>
                  <span className="wb-pathway-node-text">AUTOMATION</span>
                </div>
                <span className="wb-pathway-flow-arrow">↓</span>

                <div className="wb-pathway-node">
                  <div className="wb-pathway-icon-wrap wb-pico-green">
                    <BarChart3 size={14} />
                  </div>
                  <span className="wb-pathway-node-text wb-ptext-green">BUSINESS OUTCOME</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 11: WHY SCALEPODS? (SLIDES 22 & 23) ─────────────────────────── */}
      <section className="wb-section-fullscreen-why" id="why-scalepods">
        {/* Ambient background glows */}
        <div className="wb-why-bg-ambient" aria-hidden="true" />

        {/* ── CONTENT CONTAINER ── */}
        <div className="wb-why-content">
          {/* Header */}
          <div className="wb-why-stage-header">
            <div className="wb-pill-badge-green" style={{ marginBottom: "clamp(8px, 1vw, 14px)" }}>
              <Sparkles size={13} className="wb-pill-badge-icon" />
              <span>WHY SCALEPODS?</span>
            </div>

            <h2 className="wb-why-stage-title">
              WHY <span className="wb-why-title-gradient">SCALEPODS?</span>
            </h2>

            <p className="wb-why-stage-desc">
              ScalePods&apos; mission is to design and deploy practical AI solutions that simplify operations, increase productivity and help businesses grow without adding complexity.
            </p>
          </div>

          {/* Split Stage Body: Cards Left + Diagram Right */}
          <div className="wb-why-stage-body">
            {/* Left 5 Value Proposition Cards */}
            <div className="wb-why-cards-grid">
              {/* Row 1: 3 Cards */}
              <div className="wb-why-row wb-why-row-3">
                {/* Card 1 */}
                <div className="wb-why-card wb-wcard-green">
                  <div className="wb-why-card-icon-wrap wb-wicon-green">
                    <Settings size={20} />
                  </div>
                  <div className="wb-why-card-text">
                    <h3 className="wb-why-card-title">Faster Operations</h3>
                    <p className="wb-why-card-desc">Move work through systems instead of leaving it sitting in inboxes.</p>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="wb-why-card wb-wcard-blue">
                  <div className="wb-why-card-icon-wrap wb-wicon-blue">
                    <User size={20} />
                  </div>
                  <div className="wb-why-card-text">
                    <h3 className="wb-why-card-title">Lower Manual Effort</h3>
                    <p className="wb-why-card-desc">Remove repetitive, rule-based work from human hands where appropriate.</p>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="wb-why-card wb-wcard-teal">
                  <div className="wb-why-card-icon-wrap wb-wicon-teal">
                    <Sparkles size={20} />
                  </div>
                  <div className="wb-why-card-text">
                    <h3 className="wb-why-card-title">Better Client Experiences</h3>
                    <p className="wb-why-card-desc">Improve response times and reduce dropped handoffs.</p>
                  </div>
                </div>
              </div>

              {/* Row 2: 2 Cards */}
              <div className="wb-why-row wb-why-row-2">
                {/* Card 4 */}
                <div className="wb-why-card wb-wcard-purple">
                  <div className="wb-why-card-icon-wrap wb-wicon-purple">
                    <Users size={20} />
                  </div>
                  <div className="wb-why-card-text">
                    <h3 className="wb-why-card-title">Higher Team Productivity</h3>
                    <p className="wb-why-card-desc">Give people more time for work that actually moves the business forward.</p>
                  </div>
                </div>

                {/* Card 5 */}
                <div className="wb-why-card wb-wcard-cyan">
                  <div className="wb-why-card-icon-wrap wb-wicon-cyan">
                    <TrendingUp size={20} />
                  </div>
                  <div className="wb-why-card-text">
                    <h3 className="wb-why-card-title">Sustainable Growth</h3>
                    <p className="wb-why-card-desc">Build systems that can continue working as the business scales.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 3D Visual Diagram Stage */}
            <div className="wb-why-diagram-stage">
              <Image
                src={isLight ? "/images/webinar-redesign/light/why-scalepods-diagram-clean.png" : "/images/webinar-redesign/why-scalepods-diagram-clean.webp"}
                alt="ScalePods autonomous AI transformation engine orchestrating Operations, HR, Marketing, Sales, and Finance into Automated Workflows"
                width={720}
                height={428}
                quality={90}
                loading="eager"
                sizes="(max-width: 1400px) 45vw, 680px"
                className="wb-why-diagram-img"
              />
            </div>
          </div>

          {/* ── SLIDE 22 BOTTOM CTA BAR ── */}
          <div className="wb-why-bottom-bar">
            <div className="wb-why-bar-left">
              <span className="wb-why-bar-badge">
                <span className="wb-why-bar-dot" /> LIVE
              </span>
              <div className="wb-why-bar-info">
                <h4 className="wb-why-bar-title">AI Business Automation Masterclass</h4>
                <p className="wb-why-bar-sub">
                  With <span className="wb-highlight-founder">Adnan Shaikh</span> &amp; <span className="wb-highlight-founder">Raunak Kumar</span> &bull; Only <span className="wb-why-bar-price">₹99/-</span> <span className="wb-why-bar-strike">₹999</span>
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleOpenModal}
              className="wb-why-bar-btn"
              aria-label="Reserve Seat for ₹99"
            >
              <span>Reserve Seat (₹99)</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* ── MOBILE & TABLET RESPONSIVE WRAPPER (<= 1024px) ── */}
        <div className="wb-why-mobile-wrapper">
          <div className="wb-container">
            <div className="wb-why-mobile-header">
              <div className="wb-pill-badge-green" style={{ marginBottom: "14px" }}>
                <Sparkles size={13} className="wb-pill-badge-icon" />
                <span>WHY SCALEPODS?</span>
              </div>

              <h2 className="wb-why-mobile-title">
                WHY <span className="wb-why-title-gradient">SCALEPODS?</span>
              </h2>

              <p className="wb-why-mobile-desc">
                ScalePods&apos; mission is to design and deploy practical AI solutions that simplify operations, increase productivity and help businesses grow without adding complexity.
              </p>
            </div>

            {/* 3D Diagram Showcase on Mobile (Vertical Mobile Edition) */}
            <div className="wb-why-mobile-diagram-wrap">
              <Image
                src={isLight ? "/images/webinar-redesign/light/why-scalepods-diagram-mobile.png" : "/images/webinar-redesign/why-scalepods-diagram-mobile.webp"}
                alt="ScalePods AI Autonomous Engine"
                width={480}
                height={910}
                quality={90}
                className="wb-why-mobile-diagram-img"
              />
            </div>

            {/* 5 Stacked Cards on Mobile */}
            <div className="wb-why-mobile-cards">
              <div className="wb-why-card wb-wcard-green">
                <div className="wb-why-card-icon-wrap wb-wicon-green">
                  <Settings size={18} />
                </div>
                <div className="wb-why-card-text">
                  <h3 className="wb-why-card-title">Faster Operations</h3>
                  <p className="wb-why-card-desc">Move work through systems instead of leaving it sitting in inboxes.</p>
                </div>
              </div>

              <div className="wb-why-card wb-wcard-blue">
                <div className="wb-why-card-icon-wrap wb-wicon-blue">
                  <User size={18} />
                </div>
                <div className="wb-why-card-text">
                  <h3 className="wb-why-card-title">Lower Manual Effort</h3>
                  <p className="wb-why-card-desc">Remove repetitive, rule-based work from human hands where appropriate.</p>
                </div>
              </div>

              <div className="wb-why-card wb-wcard-teal">
                <div className="wb-why-card-icon-wrap wb-wicon-teal">
                  <Sparkles size={18} />
                </div>
                <div className="wb-why-card-text">
                  <h3 className="wb-why-card-title">Better Client Experiences</h3>
                  <p className="wb-why-card-desc">Improve response times and reduce dropped handoffs.</p>
                </div>
              </div>

              <div className="wb-why-card wb-wcard-purple">
                <div className="wb-why-card-icon-wrap wb-wicon-purple">
                  <Users size={18} />
                </div>
                <div className="wb-why-card-text">
                  <h3 className="wb-why-card-title">Higher Team Productivity</h3>
                  <p className="wb-why-card-desc">Give people more time for work that actually moves the business forward.</p>
                </div>
              </div>

              <div className="wb-why-card wb-wcard-cyan">
                <div className="wb-why-card-icon-wrap wb-wicon-cyan">
                  <TrendingUp size={18} />
                </div>
                <div className="wb-why-card-text">
                  <h3 className="wb-why-card-title">Sustainable Growth</h3>
                  <p className="wb-why-card-desc">Build systems that can continue working as the business scales.</p>
                </div>
              </div>
            </div>

            {/* Mobile Bottom CTA Bar */}
            <div className="wb-why-mobile-bar">
              <div className="wb-why-bar-left">
                <span className="wb-why-bar-badge">
                  <span className="wb-why-bar-dot" /> LIVE
                </span>
                <div className="wb-why-bar-info">
                  <h4 className="wb-why-bar-title">AI Business Automation Masterclass</h4>
                  <p className="wb-why-bar-sub">With <span className="wb-highlight-founder">Adnan Shaikh</span> &amp; <span className="wb-highlight-founder">Raunak Kumar</span> &bull; Only <span className="wb-why-bar-price">₹99/-</span> <span className="wb-why-bar-strike">₹999</span></p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleOpenModal}
                className="wb-why-bar-btn wb-why-bar-btn-full"
                aria-label="Reserve Seat for ₹99"
              >
                <span>Reserve Seat (₹99)</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 12: WHO SHOULD ATTEND? / THIS IS NOT FOR EVERYONE (SLIDES 24 & 25) ── */}
      <section className="wb-section-fullscreen-attend" id="who-should-attend">
        {/* Ambient atmospheric glows */}
        <div className="wb-attend-bg-ambient" aria-hidden="true" />

        <div className="wb-attend-container">
          {/* Section Header */}
          <div className="wb-attend-header">
            <h2 className="wb-attend-title">
              WHO SHOULD <span className="wb-attend-title-gradient">ATTEND?</span>
            </h2>
            <p className="wb-attend-desc">
              Designed for people responsible for making a business or team work better. You don&apos;t need to code or be an AI expert.
            </p>
          </div>

          {/* 2-Column Split Cards */}
          <div className="wb-attend-grid">
            {/* Left Card: Who Should Attend / Leadership Tracks */}
            <div className="wb-attend-card-left">
              <div className="wb-attend-tracks-list">
                {[
                  {
                    icon: User,
                    title: "BUSINESS OWNERS & FOUNDERS",
                    desc: "If you want to scale your business sustainably without allowing manual busywork to grow unchecked.",
                  },
                  {
                    icon: TrendingUp,
                    title: "SALES LEADERS",
                    desc: "If you want more consistent lead handling, faster qualification, and timely follow-ups without manual CRM overhead.",
                  },
                  {
                    icon: Megaphone,
                    title: "MARKETING LEADERS",
                    desc: "If you want better-connected campaigns, automated lead workflows, AI content creation, and trackable reporting.",
                  },
                  {
                    icon: Users,
                    title: "HR & RECRUITMENT LEADERS",
                    desc: "If you're looking to streamline repetitive resume screening, interview scheduling, and candidate communication.",
                  },
                  {
                    icon: Settings,
                    title: "OPERATIONS MANAGERS",
                    desc: "If you need better coordination, structured task handovers, automated record syncing, and process visibility.",
                  },
                  {
                    icon: Monitor,
                    title: "ENTREPRENEURS & PROFESSIONALS",
                    desc: "If you're exploring practical, ROI-driven applications of AI without the coding lessons or tool hype.",
                  },
                ].map((track, i) => {
                  const Icon = track.icon;
                  return (
                    <div key={i} className="wb-attend-track-item">
                      <div className="wb-attend-track-icon-wrap">
                        <Icon size={18} />
                      </div>
                      <div className="wb-attend-track-info">
                        <h3 className="wb-attend-track-title">{track.title}</h3>
                        <p className="wb-attend-track-desc">{track.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Card: This Is Not For Everyone */}
            <div className="wb-attend-card-right">
              <div className="wb-attend-right-header">
                <div className="wb-attend-right-title-wrap">
                  <AlertTriangle size={19} className="wb-attend-warn-icon" />
                  <h3 className="wb-attend-right-title">THIS IS NOT FOR EVERYONE.</h3>
                </div>
                <p className="wb-attend-right-sub">If you&apos;re looking for:</p>
              </div>

              {/* 5 Disqualifier Pills */}
              <div className="wb-attend-pills-list">
                {[
                  "“10 ChatGPT prompts you need today”",
                  "A basic introduction to AI",
                  "A random list of AI tools",
                  "Coding tutorials",
                  "AI hype without business application",
                ].map((item, i) => (
                  <div key={i} className="wb-attend-pill-item">
                    <XCircle size={15} className="wb-attend-pill-icon" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Bottom Callout */}
              <div className="wb-attend-right-callout">
                <p className="wb-attend-callout-italic">This isn&apos;t that webinar.</p>
                <div className="wb-attend-callout-label">But if you&apos;re asking:</div>
                <p className="wb-attend-callout-quotes">
                  “Where can AI actually save my team time?” &bull; “What should I automate first?” &bull; “Can I automate lead follow-up?” &bull; “Can AI help my sales team?” &bull; “Can I reduce repetitive HR work?” &bull; “Can my systems talk to each other?” &bull; “How do I build an AI-powered workflow?”
                </p>
                <div className="wb-attend-callout-highlight">
                  YOU&apos;RE IN THE RIGHT ROOM.
                </div>
              </div>
            </div>
          </div>

          {/* 3D Visual Stage (6 Leaders on Cyber Stage) - Desktop */}
          <div className="wb-attend-stage-wrap wb-attend-desktop-stage">
            <Image
              src={isLight ? "/images/webinar-redesign/light/who-should-attend-personas.png" : "/images/webinar-redesign/who-should-attend-personas.webp"}
              alt="Business and technology leaders powered by the ScalePods AI engine"
              width={1260}
              height={354}
              quality={90}
              sizes="(max-width: 1400px) 100vw, 1260px"
              className="wb-attend-stage-img"
            />
          </div>

          {/* 3D Visual Stage (6 Leaders on Cyber Stage) - Mobile Vertical Edition */}
          <div className="wb-attend-mobile-stage">
            <Image
              src={isLight ? "/images/webinar-redesign/light/who-should-attend-personas-mobile.png" : "/images/webinar-redesign/who-should-attend-personas-mobile.webp"}
              alt="Business and technology leaders powered by the ScalePods AI engine"
              width={480}
              height={806}
              quality={90}
              className="wb-attend-mobile-stage-img"
            />
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
              FREQUENTLY ASKED <span className="wb-faq-title-gradient">QUESTIONS</span>
            </h2>
          </div>

          <div className="wb-glass-card wb-faq-card">
            {[
              {
                q: "Do I need technical knowledge or coding skills?",
                a: "No. The session focuses on business problems, workflow patterns, and implementation considerations rather than teaching attendees to code or build automations.",
              },
              {
                q: "Will I learn about Sales, Marketing, HR, and Operations?",
                a: "Yes. The masterclass will cover examples from all four functions and explain how common workflow patterns can be adapted to different business needs.",
              },
              {
                q: "Is this a product demonstration or sales pitch?",
                a: "The session is designed around understanding business challenges and the role of AI-powered workflow automation. Its purpose is to help you identify opportunities and understand the underlying approach, not to teach a specific product.",
              },
              {
                q: "Will I learn how to automate my entire business?",
                a: "Yes, the goal is to help you recognize and prioritize opportunities, understand how workflows can be connected, and identify practical next steps. The right solution depends on your business processes, existing bottlenecks, data, and requirements.",
              },
              {
                q: "When and where will the webinar take place?",
                a: "The webinar will be conducted live online. The date and time will be announced on this page.",
              },
              {
                q: "How much does registration cost?",
                a: "The registration fee is ₹99.",
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
                        color: isOpen ? "#48DD83" : "var(--wb-text-muted)",
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
                <span className="wb-bottom-bar-hosts">With <span className="wb-highlight-founder">Adnan Shaikh</span> &amp; <span className="wb-highlight-founder">Raunak Kumar</span> • </span>
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
                    <span style={{ fontSize: "20px", fontWeight: 800, color: "#48DD83" }}>₹99</span>
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
                  <ShieldCheck size={14} color="#48DD83" />
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
                    border: "2px solid #48DD83",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                    color: "#48DD83",
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
                      <span style={{ color: "#48DD83", fontFamily: "monospace", fontWeight: 600 }}>
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
      <footer className="wb-footer-section">
        <div className="wb-container">
          <div style={{ marginBottom: "18px", display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative", width: "160px", height: "28px" }}>
              <Image
                src="/scalepods-navbar-logo.png"
                alt="ScalePods"
                fill
                sizes="160px"
                style={{ objectFit: "contain", filter: isLight ? "none" : "invert(1)", opacity: 1, transition: "filter 0.3s ease" }}
              />
            </div>
          </div>

          <p style={{ maxWidth: "620px", margin: "0 auto 18px", color: "var(--wb-text-muted)", fontSize: "14px", lineHeight: 1.6 }}>
            ScalePods architects autonomous AI workflow automation ecosystems across enterprise sales, marketing, HR and operational systems.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "22px", marginBottom: "20px" }}>
            <Link href="/privacy" className="wb-footer-link">
              Privacy Policy
            </Link>
            <Link href="/terms" className="wb-footer-link">
              Terms of Service
            </Link>
            <a
              href="#refund-policy"
              className="wb-footer-link"
              onClick={(e) => {
                e.preventDefault();
                alert("Cancellation & Refund Policy:\n\n1. Registrations for the ScalePods ₹99 Live AI Business Automation Masterclass are non-refundable once confirmation access is issued.\n2. In the event of session rescheduling, your registration remains 100% valid for the rescheduled date.\n3. For any queries, write to info@scalepods.co.");
              }}
            >
              Cancellation &amp; Refund Policy
            </a>
            <a href="mailto:info@scalepods.co" className="wb-footer-link">
              Contact: info@scalepods.co
            </a>
          </div>

          <p style={{ fontSize: "12px", color: "var(--wb-text-faint)", margin: 0 }}>
            © {new Date().getFullYear()} ScalePods Inc. All rights reserved. Razorpay is a trademark of Razorpay Software Private Limited.
          </p>
        </div>
      </footer>
    </BeamsBackground>
  );
}
