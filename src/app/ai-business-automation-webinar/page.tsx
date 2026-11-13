"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  Calendar,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  X,
  Lock,
  MessageSquare,
  Loader2,
  ExternalLink,
  Flame,
} from "lucide-react";
import { BeamsBackground } from "@/components/ui/beams-background";
import { getDetectedCountryCode } from "@/lib/country";
import {
  validateEmail,
  validatePhone,
  validateFullName,
} from "@/lib/webinarValidation";
import { WebinarPreviewDrawer } from "./WebinarPreviewDrawer";
import { WEBINAR_PREVIEW_ITEMS } from "./webinarPreviewData";
import { HeroAnimatedBackground } from "./HeroAnimatedBackground";
import { HeroMetricCard } from "./HeroAnimatedMetric";
import { BusinessPainPointsSection } from "./BusinessPainPointsSection";
import { MasterclassDeliverablesSection } from "./MasterclassDeliverablesSection";
import { TargetAudienceSection } from "./TargetAudienceSection";
import { FinalRegistrationCtaSection } from "./FinalRegistrationCtaSection";
import { WhyScalePods } from "./WhyScalePods";
import "./webinar.css";

const HERO_TOP_WORDS =
  "Dreaming of Scaling Your Business Over ₹100 Cr or ₹500 Cr?".split(" ");

const HERO_METRICS = [
  {
    target: 10,
    suffix: "x",
    label: "Revenue Growth Improvement",
    glowGradient: "linear-gradient(90deg, #38BDF8, #33C6E1)",
    shadowRgba: "rgba(14, 165, 233, 0.15)",
  },
  {
    target: 80,
    suffix: "%",
    label: "Hiring Time Reduced",
    glowGradient: "linear-gradient(90deg, #33C6E1, #2DD4BF)",
    shadowRgba: "rgba(20, 184, 166, 0.15)",
  },
  {
    target: 80,
    suffix: "%",
    label: "Faster Brand Scaling vs Agencies",
    glowGradient: "linear-gradient(90deg, #2DD4BF, #30D2B8)",
    shadowRgba: "rgba(20, 184, 166, 0.15)",
  },
  {
    target: 95,
    suffix: "%",
    label: "Manual Data Entry Eliminated",
    glowGradient: "linear-gradient(90deg, #30D2B8, #36D7A6)",
    shadowRgba: "rgba(16, 185, 129, 0.15)",
  },
  {
    target: 60,
    prefix: "<",
    suffix: "s",
    label: "Instant Lead Engagement",
    glowGradient: "linear-gradient(90deg, #36D7A6, #3FD995)",
    shadowRgba: "rgba(16, 185, 129, 0.15)",
  },
  {
    target: 400,
    suffix: "%",
    label: "Operational Efficiency ROI",
    glowGradient: "linear-gradient(90deg, #3FD995, #48DD83)",
    shadowRgba: "rgba(5, 150, 105, 0.15)",
  },
];

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
  const reduceHeroMotion = useReducedMotion() ?? false;

  // Modal & Preview Drawer state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePreviewId, setActivePreviewId] = useState<string | null>(null);
  const [modalStep, setModalStep] = useState<"form" | "confirmed">("form");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    customCode: "",
    phone: "",
    role: "",
  });
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
  }>({});
  const [touched, setTouched] = useState<{
    name?: boolean;
    email?: boolean;
    phone?: boolean;
  }>({});
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
      const faqEl = document.getElementById("faq-section");
      if (!faqEl) {
        setShowSticky(false);
        return;
      }
      const faqRect = faqEl.getBoundingClientRect();
      // Show the sticky bottom bar only after scrolling past the bottom of the FAQ section
      setShowSticky(faqRect.bottom <= window.innerHeight - 60);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleOpenModal = () => {
    setPaymentError(null);
    setFieldErrors({});
    setTouched({});
    setModalStep("form");
    setIsModalOpen(true);
  };

  const handleScrollToExplore = () => {
    document.getElementById("pain-points")?.scrollIntoView({
      behavior: reduceHeroMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  const handleReserveFromDrawer = (rolePrefill?: string) => {
    setActivePreviewId(null);
    if (rolePrefill) {
      setFormData((prev) => ({
        ...prev,
        role: prev.role.trim() ? prev.role : rolePrefill,
      }));
    }
    handleOpenModal();
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentError(null);

    // Strict client-side verification
    const nameCheck = validateFullName(formData.name);
    const emailCheck = validateEmail(formData.email);
    const phoneCheck = validatePhone(formData.phone, formData.countryCode, formData.customCode);

    setTouched({ name: true, email: true, phone: true });
    setFieldErrors({
      name: nameCheck.error,
      email: emailCheck.error,
      phone: phoneCheck.error,
    });

    if (!nameCheck.valid || !emailCheck.valid || !phoneCheck.valid) {
      setPaymentError(
        nameCheck.error ||
          emailCheck.error ||
          phoneCheck.error ||
          "Please verify your inputs and correct the highlighted errors."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const fullPhone = phoneCheck.formatted!;
      const cleanName = nameCheck.formatted!;
      const cleanEmail = emailCheck.formatted!;

      // 1. Ensure Razorpay checkout script is loaded
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded || !(window as any).Razorpay) {
        throw new Error(
          "Unable to load Razorpay payment gateway. Please check your network or ad-blocker and try again."
        );
      }

      // 2. Create order on the server (Standard ₹99 checkout)
      const res = await fetch("/api/webinar/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          phone: fullPhone,
          role: formData.role,
          countryCode: formData.countryCode,
          customCode: formData.customCode,
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
        image: "https://www.scalepods.co/icon.png",
        order_id: orderData.orderId,
        prefill: {
          name: cleanName,
          email: cleanEmail,
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
                name: cleanName,
                email: cleanEmail,
                phone: fullPhone,
                role: formData.role,
                countryCode: formData.countryCode,
                customCode: formData.customCode,
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

              // Redirect to dedicated Thank You page for Meta Custom Conversion tracking
              try {
                const thankYouUrl = `/ai-business-automation-webinar/thank-you?payment_id=${encodeURIComponent(
                  response.razorpay_payment_id
                )}&order_id=${encodeURIComponent(
                  response.razorpay_order_id
                )}&name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(
                  formData.email
                )}`;
                window.location.href = thankYouUrl;
              } catch (navErr) {
                console.warn("[Navigation Notice]:", navErr);
              }
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
    <BeamsBackground className="webinarpod-container wb-theme-light" forcedTheme="light" hues={[96, 210]} intensity="strong">
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
                src="/scalepods-navbar-logo.webp"
                alt="ScalePods"
                className="wb-navbar-logo-img"
                fill
                sizes="160px"
                loading="eager"
                style={{
                  objectFit: "contain",
                  objectPosition: "left center",
                  filter: "none",
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
          src="/images/webinar-redesign/light/masterclass-hero-bg.webp"
          alt="The AI Automation Masterclass - ScalePods with Adnan Shaikh & Raunak Kumar"
          fill
          preload
          quality={75}
          sizes="100vw"
          className="wb-firstfold-bg"
        />

        {/* Atmospheric Ambient Overlay */}
        <div className="wb-firstfold-overlay" />

        {/* Layer 2: Premium Animated AI Mesh, Glassmorphism & Perimeter Network */}
        <HeroAnimatedBackground />

        <div className="wb-firstfold-container">
          {/* Eyebrow / Badges Row */}
          <motion.div
            className="wb-firstfold-topbar"
            initial={reduceHeroMotion ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
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
          </motion.div>

          {/* Headline & Subtitle */}
          <div className="wb-firstfold-header">
            <h1 className="wb-firstfold-title">
              <span className="wb-firstfold-title-top">
                {HERO_TOP_WORDS.map((word, idx) => (
                  <motion.span
                    key={`${word}-${idx}`}
                    className="wb-firstfold-word"
                    initial={reduceHeroMotion ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: reduceHeroMotion ? 0 : 0.04 + idx * 0.032,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {word}
                    {idx < HERO_TOP_WORDS.length - 1 ? "\u00A0" : ""}
                  </motion.span>
                ))}
              </span>
              <motion.span
                className="wb-firstfold-title-grad-wrap"
                initial={reduceHeroMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: reduceHeroMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="wb-firstfold-title-grad wb-firstfold-title-grad-animated">
                  Let&apos;s Sort This Out for You.
                </span>
                <svg
                  className="wb-firstfold-title-underline"
                  viewBox="0 0 360 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="wbHeroUnderlineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0284C7" />
                      <stop offset="55%" stopColor="#0D9488" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d="M4 8.5C96 2.5 264 2.2 356 8.2"
                    stroke="url(#wbHeroUnderlineGrad)"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    initial={reduceHeroMotion ? false : { pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.75, delay: reduceHeroMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                  />
                </svg>
                <motion.svg
                  className="wb-firstfold-title-sparks"
                  viewBox="0 0 30 28"
                  fill="none"
                  aria-hidden="true"
                  initial={reduceHeroMotion ? false : { opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: reduceHeroMotion ? 0 : 0.65 }}
                >
                  <path d="M7 16L4 5" stroke="#059669" strokeWidth="2.4" strokeLinecap="round" />
                  <path d="M16 14L20 4" stroke="#0284C7" strokeWidth="2.4" strokeLinecap="round" />
                  <path d="M21 21L29 14" stroke="#0D9488" strokeWidth="2.4" strokeLinecap="round" />
                </motion.svg>
              </motion.span>
            </h1>
            <motion.p
              className="wb-firstfold-desc"
              initial={reduceHeroMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.48, delay: reduceHeroMotion ? 0 : 0.34, ease: [0.22, 1, 0.36, 1] }}
            >
              Scaling to 100 or 500 Cr is no longer a dream now—we can help you get it fulfilled. Discover how to connect your Sales, Marketing, HR, and Ops into self-operating AI workflows without adding headcount or writing code.
            </motion.p>
          </div>

          {/* 6 Top Data Metrics Cards - Merging smoothly from Blue to Green */}
          <div className="wb-firstfold-stats-grid">
            {HERO_METRICS.map((metric, idx) => (
              <HeroMetricCard
                key={metric.label}
                index={idx}
                target={metric.target}
                prefix={metric.prefix}
                suffix={metric.suffix}
                label={metric.label}
                glowGradient={metric.glowGradient}
                shadowRgba={metric.shadowRgba}
              />
            ))}
          </div>

          {/* Main Stage Grid: Left Booking / Specs, Right Both Founders */}
          <div className="wb-firstfold-stage-grid">
            {/* Left: High-Conversion Booking Box */}
            <motion.div
              className="wb-firstfold-booking-box"
              initial={reduceHeroMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.52, delay: reduceHeroMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
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

              {/* Webinar Schedule: 12-13 December 2-3 PM */}
              <div className="wb-booking-schedule-banner">
                <div className="wb-booking-schedule-item">
                  <Calendar size={14} className="wb-booking-schedule-icon" />
                  <span>12–13 December</span>
                </div>
                <span className="wb-booking-schedule-dot">•</span>
                <div className="wb-booking-schedule-item">
                  <Clock size={14} className="wb-booking-schedule-icon" />
                  <span>2:00 PM – 3:00 PM</span>
                </div>
              </div>

              <div className="wb-booking-features-list">
                <div className="wb-booking-feature-item">
                  <CheckCircle2 size={16} className="wb-booking-feature-icon" />
                  <span><strong>1 Hour</strong> of founder-led live systems walkthrough</span>
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
                <ArrowRight size={17} className="wb-firstfold-cta-arrow" />
              </button>

              <div className="wb-firstfold-seats-note">
                <Flame size={15} />
                <span>Limited seats available. Highly interactive live session.</span>
              </div>
            </motion.div>

            {/* Right: Both Founder Image Cards (As added in 2nd fold) */}
            <div className="wb-firstfold-founders-wrap">
              {/* Founder 1: Adnan Shaikh */}
              <motion.button
                type="button"
                onClick={() => setActivePreviewId("founder-adnan")}
                className="wb-firstfold-founder-card wb-ff-card-adnan"
                aria-label="Preview Adnan Shaikh's session focus"
                initial={reduceHeroMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.52, delay: reduceHeroMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="wb-ff-decor-orb wb-ff-decor-orb-green" aria-hidden="true" />
                <div className="wb-firstfold-founder-img-frame">
                  <Image
                    src="/images/webinar-redesign/light/adnan-shaikh.webp"
                    alt="Adnan Shaikh - Co-Founder & CEO, ScalePods"
                    fill
                    loading="eager"
                    fetchPriority="high"
                    quality={75}
                    sizes="(max-width: 350px) 92vw, (max-width: 1024px) 46vw, 300px"
                    className="wb-firstfold-founder-img"
                  />
                </div>
                <div className="wb-firstfold-founder-body">
                  <span className="wb-firstfold-founder-name">Adnan Shaikh</span>
                  <div className="wb-firstfold-founder-role">
                    Co-Founder &amp; CEO, <span className="wb-highlight-scalepods">ScalePods</span>
                  </div>
                  <div className="wb-firstfold-founder-focus">
                    Sales Leadership &amp; Revenue Growth
                  </div>
                  <div className="wb-firstfold-founder-footer">
                    <span className="wb-firstfold-founder-badge wb-ff-badge-green">
                      ⚡ Sales &amp; Revenue OS
                    </span>
                    <span className="wb-card-preview-cue">
                      Focus <ChevronRight size={13} className="wb-ff-focus-arrow" />
                    </span>
                  </div>
                </div>
              </motion.button>

              {/* Founder 2: Raunak Kumar */}
              <motion.button
                type="button"
                onClick={() => setActivePreviewId("founder-raunak")}
                className="wb-firstfold-founder-card wb-ff-card-raunak"
                aria-label="Preview Raunak Kumar's session focus"
                initial={reduceHeroMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.52, delay: reduceHeroMotion ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="wb-ff-decor-orb wb-ff-decor-orb-blue" aria-hidden="true" />
                <div className="wb-firstfold-founder-img-frame">
                  <Image
                    src="/images/webinar-redesign/light/raunak-kumar.webp"
                    alt="Raunak Kumar - Co-Founder, CTO & CPO, ScalePods"
                    fill
                    loading="eager"
                    fetchPriority="high"
                    quality={75}
                    sizes="(max-width: 350px) 92vw, (max-width: 1024px) 46vw, 300px"
                    className="wb-firstfold-founder-img"
                  />
                </div>
                <div className="wb-firstfold-founder-body">
                  <span className="wb-firstfold-founder-name">Raunak Kumar</span>
                  <div className="wb-firstfold-founder-role">
                    Co-Founder, CTO &amp; CPO, <span className="wb-highlight-scalepods">ScalePods</span>
                  </div>
                  <div className="wb-firstfold-founder-focus">
                    Product Architecture &amp; Enterprise AI
                  </div>
                  <div className="wb-firstfold-founder-footer">
                    <span className="wb-firstfold-founder-badge wb-ff-badge-blue">
                      🧠 Enterprise AI &amp; Architecture
                    </span>
                    <span className="wb-card-preview-cue">
                      Focus <ChevronRight size={13} className="wb-ff-focus-arrow" />
                    </span>
                  </div>
                </div>
              </motion.button>
            </div>
          </div>

          {/* Interactive Scroll Invitation */}
          <motion.button
            type="button"
            onClick={handleScrollToExplore}
            className="wb-firstfold-scroll-cue"
            aria-label="Scroll to explore next section"
            initial={reduceHeroMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: reduceHeroMotion ? 0 : 0.52 }}
          >
            <span className="wb-scroll-cue-line" aria-hidden="true" />
            <span className="wb-scroll-cue-label">SCROLL TO EXPLORE</span>
            <ChevronDown size={14} className="wb-scroll-cue-chevron" aria-hidden="true" />
          </motion.button>
        </div>
      </section>

      {/* ── 2ND FOLD: BUSINESS PAIN POINTS (WHERE TIME & PROFITS GET LOST) ── */}
      <BusinessPainPointsSection />

      {/* ── 3RD FOLD: MASTERCLASS DELIVERABLES ── */}
      <MasterclassDeliverablesSection />

      {/* ── 4TH FOLD: TARGET AUDIENCE (WHO SHOULD ATTEND THIS MASTERCLASS?) ── */}
      <TargetAudienceSection onReserveSeat={handleOpenModal} />

      {/* 5TH FOLD: FINAL REGISTRATION CTA */}
      <FinalRegistrationCtaSection onReserveSeat={handleOpenModal} />

      {/* ── WHY SCALEPODS? SECTION (ABOVE FAQ) ── */}
      <WhyScalePods onReserveSeat={handleOpenModal} />

      {/* ── SECTION 17: FAQS ─────────────────────────────────────────────── */}
      <section className="wb-section wb-section-bordered" id="faq-section">
        <div className="wb-container wb-container-narrow">
          <div className="wb-faq-header" style={{ textAlign: "center", marginBottom: "44px" }}>
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
                a: "The webinar will be conducted live online on 12–13 December from 2:00 PM to 3:00 PM IST. Meeting access links and session resources will be emailed to registered attendees and shared in the VIP WhatsApp community.",
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
                <span style={{ color: "#38BDF8", fontWeight: 700 }}>12–13 Dec (2–3 PM) • </span>
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
                  <div>
                    <span style={{ fontSize: "14px", color: "var(--wb-text-bright)", fontWeight: 700, display: "block" }}>
                      Masterclass Access Pass
                    </span>
                    <span style={{ fontSize: "12px", color: "#38BDF8", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "4px", marginTop: "2px" }}>
                      <Calendar size={12} /> 12–13 Dec (2–3 PM IST)
                    </span>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: "20px", fontWeight: 800, color: "#48DD83" }}>
                      ₹99
                    </span>
                    <span style={{ fontSize: "13px", color: "var(--wb-text-faint)", marginLeft: "6px", textDecoration: "line-through" }}>
                      ₹999
                    </span>
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
                      onBlur={() => {
                        setTouched((t) => ({ ...t, name: true }));
                        const check = validateFullName(formData.name);
                        setFieldErrors((fe) => ({ ...fe, name: check.error }));
                      }}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFormData({ ...formData, name: val });
                        if (touched.name) {
                          setFieldErrors((fe) => ({
                            ...fe,
                            name: validateFullName(val).error,
                          }));
                        }
                      }}
                      className="wb-form-input"
                      style={{
                        borderColor:
                          touched.name && fieldErrors.name ? "#EF4444" : undefined,
                      }}
                      disabled={isSubmitting || isVerifying}
                    />
                    {touched.name && fieldErrors.name && (
                      <span
                        style={{
                          color: "#F87171",
                          fontSize: "11.5px",
                          marginTop: "4px",
                          display: "block",
                        }}
                      >
                        {fieldErrors.name}
                      </span>
                    )}
                  </div>

                  <div className="wb-form-group">
                    <label className="wb-form-label">Work Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="rahul@company.com"
                      value={formData.email}
                      onBlur={() => {
                        setTouched((t) => ({ ...t, email: true }));
                        const check = validateEmail(formData.email);
                        setFieldErrors((fe) => ({ ...fe, email: check.error }));
                      }}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFormData({ ...formData, email: val });
                        if (touched.email) {
                          setFieldErrors((fe) => ({
                            ...fe,
                            email: validateEmail(val).error,
                          }));
                        }
                      }}
                      className="wb-form-input"
                      style={{
                        borderColor:
                          touched.email && fieldErrors.email ? "#EF4444" : undefined,
                      }}
                      disabled={isSubmitting || isVerifying}
                    />
                    {touched.email && fieldErrors.email && (
                      <span
                        style={{
                          color: "#F87171",
                          fontSize: "11.5px",
                          marginTop: "4px",
                          display: "block",
                        }}
                      >
                        {fieldErrors.email}
                      </span>
                    )}
                  </div>

                  <div className="wb-form-group">
                    <label className="wb-form-label">WhatsApp Number (For session link &amp; reminders) *</label>
                    <div className="wb-phone-input-row">
                      <div className={`wb-country-select-wrapper ${formData.countryCode === "Custom" ? "wb-country-custom" : ""}`}>
                        <select
                          value={formData.countryCode}
                          onChange={(e) => {
                            const newCountry = e.target.value;
                            setFormData({ ...formData, countryCode: newCountry });
                            if (touched.phone) {
                              setFieldErrors((fe) => ({
                                ...fe,
                                phone: validatePhone(formData.phone, newCountry, formData.customCode).error,
                              }));
                            }
                          }}
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
                          onChange={(e) => {
                            const newCustom = e.target.value;
                            setFormData({ ...formData, customCode: newCustom });
                            if (touched.phone) {
                              setFieldErrors((fe) => ({
                                ...fe,
                                phone: validatePhone(formData.phone, "Custom", newCustom).error,
                              }));
                            }
                          }}
                          className="wb-custom-code-input"
                          disabled={isSubmitting || isVerifying}
                          aria-label="Custom dialing code"
                        />
                      )}

                      <input
                        type="tel"
                        required
                        placeholder={
                          formData.countryCode === "+91"
                            ? "Enter 10-digit mobile number"
                            : "Enter WhatsApp number"
                        }
                        value={formData.phone}
                        onBlur={() => {
                          setTouched((t) => ({ ...t, phone: true }));
                          const check = validatePhone(
                            formData.phone,
                            formData.countryCode,
                            formData.customCode
                          );
                          setFieldErrors((fe) => ({ ...fe, phone: check.error }));
                        }}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData({ ...formData, phone: val });
                          if (touched.phone) {
                            setFieldErrors((fe) => ({
                              ...fe,
                              phone: validatePhone(
                                val,
                                formData.countryCode,
                                formData.customCode
                              ).error,
                            }));
                          }
                        }}
                        className="wb-phone-number-input"
                        style={{
                          borderColor:
                            touched.phone && fieldErrors.phone ? "#EF4444" : undefined,
                        }}
                        disabled={isSubmitting || isVerifying}
                      />
                    </div>
                    {touched.phone && fieldErrors.phone ? (
                      <span
                        style={{
                          color: "#F87171",
                          fontSize: "11.5px",
                          marginTop: "4px",
                          display: "block",
                        }}
                      >
                        {fieldErrors.phone}
                      </span>
                    ) : (
                      <span
                        style={{
                          color: "var(--wb-text-faint)",
                          fontSize: "11px",
                          marginTop: "4px",
                          display: "block",
                        }}
                      >
                        {formData.countryCode === "+91"
                          ? "Enter genuine 10-digit Indian WhatsApp mobile number (starts with 6, 7, 8, or 9)"
                          : "Enter mobile number with country code"}
                      </span>
                    )}
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
                      <span style={{ color: "#48DD83", fontWeight: 700 }}>12–13 December (2:00 PM – 3:00 PM IST)</span>
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
                    href="https://chat.whatsapp.com/FxKlQwxOkF17VlUeLgIgl8?s=cl&p=i&mlu=4&ilr=4&iam=2"
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
                    Session access link (12–13 December 2–3 PM IST), live Zoom room, and preparation resources will be emailed to you and shared in the VIP WhatsApp group.
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
                src="/scalepods-navbar-logo.webp"
                alt="ScalePods"
                fill
                sizes="160px"
                style={{ objectFit: "contain", filter: "none", opacity: 1 }}
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

      <WebinarPreviewDrawer
        item={activePreviewId ? WEBINAR_PREVIEW_ITEMS[activePreviewId] ?? null : null}
        onClose={() => setActivePreviewId(null)}
        onReserveSeat={handleReserveFromDrawer}
      />
    </BeamsBackground>
  );
}
