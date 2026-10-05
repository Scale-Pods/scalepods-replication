"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  ChevronDown, 
  ChevronUp,
  Loader2, 
  CheckCircle2, 
  Check,
  TrendingUp,
  Building,
  Target,
  Zap,
  Download,
  ArrowRight,
  Phone,
  FileText,
  AlertTriangle,
  Play,
  RotateCcw
} from "lucide-react";
import { submitLead } from "@/lib/leadService";
import { useCountryDetection } from "@/lib/country";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useMobile } from "@/lib/hooks";
import { BeamsBackground } from "@/components/ui/beams-background";
import dynamic from "next/dynamic";

const DownloadModal = dynamic(() => import("@/components/ui/DownloadModal"), { ssr: false });
const AuditModal = dynamic(() => import("@/components/ui/AuditModal"), { ssr: false });
const TestimonialCarousel = dynamic(() => import("@/components/ui/TestimonialCarousel"), { ssr: false });
import { BrandsMarquee } from "@/components/sections/Sections";
import ClaudePartnership from "@/components/sections/ClaudePartnership";
import { FloatingPreviewCarouselWrapper } from "@/components/ui/FloatingPreviewCarouselWrapper";
import "./realestatepod.css";

// Country codes list
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

const realEstateGoals = [
  "Sales Pod (Outreach & CRM)",
  "Marketing Pod (Strategy & Content)",
  "Exhibition Pod (Event Lead Capture)",
  "All Pods (Full Platform Deployment)"
];



const salesCarouselImages = [
  { id: 1, title: "Sales Intelligence Hub", heading: "Pipeline Performance Center", description: "Real-time deal flow and conversion tracking.", imageUrl: "/images/showcase/sales/Sales tool 1.png", systemLabel: "REVENUE OS" },
  { id: 2, title: "Outreach Orchestrator", heading: "Multi-Channel Outreach Pod", description: "Autonomous engagement across WhatsApp, LinkedIn and Email.", imageUrl: "/images/showcase/sales/Sales tool 2.png", systemLabel: "OUTREACH ENGINE" },
  { id: 3, title: "Conversion Analytics", heading: "Growth Analytics Engine", description: "Funnel velocity and performance monitoring.", imageUrl: "/images/showcase/sales/Sales tool 3.png", systemLabel: "ANALYTICS HUB" },
  { id: 4, title: "Lead Scoring Center", heading: "Intelligent Lead Prioritization", description: "AI-driven scoring and routing architecture.", imageUrl: "/images/showcase/sales/Sales tool 4.png", systemLabel: "GROWTH INTELLIGENCE" },
  { id: 5, title: "Agent Performance", heading: "Sales Force Command Center", description: "Monitor AI agent efficacy and viewing volume.", imageUrl: "/images/showcase/sales/Sales tool 5.png", systemLabel: "SALES OPS" },
];

const marketingCarouselImages = [
  { id: 1, title: "Campaign Intelligence", heading: "Marketing Command Center", description: "Monitor ad spend, conversion metrics, and content performance across all channels.", imageUrl: "/images/showcase/marketing/marketing-1.png", systemLabel: "MARKETING OS" },
  { id: 2, title: "Content Engine", heading: "AI Content Generation Pod", description: "Draft ad copy, social posts, and property listing descriptions automatically.", imageUrl: "/images/showcase/marketing/marketing-2.png", systemLabel: "CONTENT ENGINE" },
  { id: 3, title: "Ad Performance", heading: "Paid Ads Optimization", description: "Optimize ad creative and budget allocations automatically based on conversion data.", imageUrl: "/images/showcase/marketing/marketing-3.png", systemLabel: "ADS ANALYTICS" },
  { id: 4, title: "Lead Nurturing", heading: "Drip Campaign Engine", description: "Deliver relevant datasheets, case studies, and follow-ups to keep leads engaged.", imageUrl: "/images/showcase/marketing/marketing-4.png", systemLabel: "NURTURE LOOP" },
  { id: 5, title: "Approval Portal", heading: "Maker-Checker Workflow", description: "Review and approve AI-generated content before it goes live across channels.", imageUrl: "/images/showcase/marketing/marketing-5.png", systemLabel: "APPROVAL PORTAL" },
];

const exhibitionCarouselImages = [
  { id: 1, title: "Event Lead Capture", heading: "Exhibition Intelligence Hub", description: "OCR badge scanning and instant lead qualification at trade shows.", imageUrl: "/images/showcase/hr/shills-growth-1.png", systemLabel: "EXPO INTEL" },
  { id: 2, title: "Attendee Qualification", heading: "Smart Routing Engine", description: "Score attendee intent in real-time and alert booth teams.", imageUrl: "/images/showcase/hr/shills-growth-2.png", systemLabel: "QUALIFICATION POD" },
  { id: 3, title: "Instant Follow-Up", heading: "Automated WhatsApp & Email Dispatch", description: "Send personalized project datasheets within minutes of contact.", imageUrl: "/images/showcase/hr/shills-growth-3.png", systemLabel: "ENGAGEMENT ENGINE" },
  { id: 4, title: "Exhibition Analytics", heading: "Live Performance Dashboard", description: "Track and measure real-time visitor interactions and engagement rates at the booth.", imageUrl: "/images/showcase/hr/shills-growth-4.png", systemLabel: "BOOTH ANALYTICS" },
  { id: 5, title: "Follow-Up Orchestration", heading: "Omnichannel Engagement Hub", description: "Automatically nurture leads via WhatsApp and email based on qualifying metrics.", imageUrl: "/images/showcase/hr/shills-growth-5.png", systemLabel: "NURTURING POD" },
];

// Framer motion variants
const fadeUp = (delay = 0, isMobile = false) => ({
  initial: { opacity: 0, y: isMobile ? 12 : 20, filter: isMobile ? "blur(1px)" : "blur(4px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
});

// Interactive Real Estate Sales Workflow Simulator
function RealEstateSalesFlowViz() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 5);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="sp-form-card w-full p-6 relative overflow-hidden" style={{ minHeight: "380px" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.02, backgroundImage: "radial-gradient(var(--sp-accent) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
      
      <div className="flex justify-between items-center mb-4 border-b border-[var(--color-border-faint)] pb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[var(--sp-accent)] animate-ping" />
          <span className="text-xs font-bold tracking-wider text-[var(--color-text-bright)] uppercase text-[var(--sp-accent)]">Sales Pod Simulation</span>
        </div>
        <button onClick={() => setStep(0)} className="text-xs text-[var(--sp-accent)] flex items-center gap-1 hover:underline">
          <RotateCcw size={10} /> Reset
        </button>
      </div>

      <div className="space-y-4">
        {/* Step 1: Portal Lead */}
        <div className={`p-3 rounded-lg border transition-all duration-300 ${step === 0 ? "border-[var(--sp-accent)] bg-[rgba(var(--sp-accent-rgb),0.06)]" : "border-[var(--color-border-faint)] opacity-60"}`}>
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-[var(--color-text-bright)]">1. Portal Lead Ingested</span>
            {step > 0 && <CheckCircle2 size={14} className="text-[var(--sp-accent)]" />}
          </div>
          <p className="text-xs text-[var(--color-text-body)] mt-1">
            New Lead: "Alex Sollork interested in Palm Jumeirah 3BR Penthouse." (Source: Property Finder)
          </p>
        </div>

        {/* Step 2: Instant WhatsApp Init */}
        <div className={`p-3 rounded-lg border transition-all duration-300 ${step === 1 ? "border-[var(--sp-accent)] bg-[rgba(var(--sp-accent-rgb),0.06)]" : "border-[var(--color-border-faint)] opacity-60"}`}>
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-[var(--color-text-bright)]">2. WhatsApp AI Conversation</span>
            {step > 1 ? <CheckCircle2 size={14} className="text-[var(--sp-accent)]" /> : step === 1 && <Loader2 size={12} className="animate-spin text-[var(--sp-accent)]" />}
          </div>
          <p className="text-xs text-[var(--color-text-body)] mt-1">
            {step < 1 ? "Awaiting lead..." : "AI: 'Hi Alex! Saw you wanted details on the Palm penthouse. Are you looking for investment or self-use?'"}
          </p>
        </div>

        {/* Step 3: Sentiment & Intent Scored */}
        <div className={`p-3 rounded-lg border transition-all duration-300 ${step === 2 ? "border-[var(--sp-accent)] bg-[rgba(var(--sp-accent-rgb),0.06)]" : "border-[var(--color-border-faint)] opacity-60"}`}>
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-[var(--color-text-bright)]">3. AI Intent Scoring</span>
            {step > 2 ? <CheckCircle2 size={14} className="text-[var(--sp-accent)]" /> : step === 2 && <Loader2 size={12} className="animate-spin text-[var(--sp-accent)]" />}
          </div>
          <p className="text-xs text-[var(--color-text-body)] mt-1">
            {step < 2 ? "Awaiting response..." : "Alex: 'Self-use. Moving next quarter.' -> Intent Score: 96% HOT (Self-Use, Fast Timeline)"}
          </p>
        </div>

        {/* Step 4: Brochure & Calendly Links Dispatch */}
        <div className={`p-3 rounded-lg border transition-all duration-300 ${step === 3 ? "border-[var(--sp-accent)] bg-[rgba(var(--sp-accent-rgb),0.06)]" : "border-[var(--color-border-faint)] opacity-60"}`}>
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-[var(--color-text-bright)]">4. Automated Viewing Booking</span>
            {step > 3 ? <CheckCircle2 size={14} className="text-[var(--sp-accent)]" /> : step === 3 && <Loader2 size={12} className="animate-spin text-[var(--sp-accent)]" />}
          </div>
          <p className="text-xs text-[var(--color-text-body)] mt-1">
            {step < 3 ? "Awaiting scoring..." : "AI delivers Penthouse PDF Brochure & schedules viewing slots on Saturday."}
          </p>
        </div>

        {/* Step 5: Finished Loop */}
        <div className={`p-3 rounded-lg border transition-all duration-300 ${step === 4 ? "border-[var(--sp-accent)] bg-[rgba(var(--sp-accent-rgb),0.06)]" : "border-[var(--color-border-faint)] opacity-60"}`}>
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-[var(--color-text-bright)]">5. Human Agent Handoff</span>
            {step === 4 && <CheckCircle2 size={14} className="text-[var(--sp-accent)] animate-bounce" />}
          </div>
          <p className="text-xs text-[var(--color-text-body)] mt-1">
            {step < 4 ? "Awaiting booking..." : "Viewing booked for Saturday 2:00 PM. Lead synced to CRM & assigned to Senior Broker."}
          </p>
        </div>
      </div>
    </div>
  );
}

// Interactive Real Estate Marketing Campaign Optimizer Simulator
function RealEstateMarketingCampaignViz() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="sp-form-card w-full p-6 relative overflow-hidden" style={{ minHeight: "380px" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.02, backgroundImage: "radial-gradient(var(--sp-accent) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
      
      <div className="flex justify-between items-center mb-4 border-b border-[var(--color-border-faint)] pb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[var(--sp-accent)] animate-ping" />
          <span className="text-xs font-bold tracking-wider text-[var(--color-text-bright)] uppercase text-[var(--sp-accent)]">Marketing Pod Simulation</span>
        </div>
        <button onClick={() => setStep(0)} className="text-xs text-[var(--sp-accent)] flex items-center gap-1 hover:underline">
          <RotateCcw size={10} /> Reset
        </button>
      </div>

      <div className="space-y-4">
        {/* Step 1: Insight */}
        <div className={`p-3 rounded-lg border transition-all duration-300 ${step === 0 ? "border-[var(--sp-accent)] bg-[rgba(var(--sp-accent-rgb),0.06)]" : "border-[var(--color-border-faint)] opacity-60"}`}>
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-[var(--color-text-bright)]">1. Intelligence Audit</span>
            {step > 0 && <CheckCircle2 size={14} className="text-[var(--sp-accent)]" />}
          </div>
          <p className="text-xs text-[var(--color-text-body)] mt-1">
            Performance Analyst: "Meta ad group 'Premium Villas' CPC spiked to $1.20. ROI declining."
          </p>
        </div>

        {/* Step 2: Content Generation */}
        <div className={`p-3 rounded-lg border transition-all duration-300 ${step === 1 ? "border-[var(--sp-accent)] bg-[rgba(var(--sp-accent-rgb),0.06)]" : "border-[var(--color-border-faint)] opacity-60"}`}>
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-[var(--color-text-bright)]">2. AI Creative Generator</span>
            {step > 1 ? <CheckCircle2 size={14} className="text-[var(--sp-accent)]" /> : step === 1 && <Loader2 size={12} className="animate-spin text-[var(--sp-accent)]" />}
          </div>
          <div className="text-[11px] text-[var(--color-text-muted)] mt-1 space-y-1">
            {step < 1 ? "Creating creatives..." : (
              <>
                <p className="text-xs text-[var(--color-text-body)]">AI drafted new copy & visual option:</p>
                <div className="p-1 rounded bg-black/30 text-[10px] italic">
                  "Luxury 3BR Villa in Palm Jumeirah. 5-year post-handover payment plan. Direct beach access."
                </div>
              </>
            )}
          </div>
        </div>

        {/* Step 3: Maker Checker Approval */}
        <div className={`p-3 rounded-lg border transition-all duration-300 ${step === 2 ? "border-[var(--sp-accent)] bg-[rgba(var(--sp-accent-rgb),0.06)]" : "border-[var(--color-border-faint)] opacity-60"}`}>
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-[var(--color-text-bright)]">3. Maker-Checker Workflow</span>
            {step > 2 ? <CheckCircle2 size={14} className="text-[var(--sp-accent)]" /> : step === 2 && <Loader2 size={12} className="animate-spin text-[var(--sp-accent)]" />}
          </div>
          <p className="text-xs text-[var(--color-text-body)] mt-1">
            {step < 2 ? "Awaiting review..." : "Approval alert sent to Manager. Status: APPROVED (Single-click activation)"}
          </p>
        </div>

        {/* Step 4: Auto posting */}
        <div className={`p-3 rounded-lg border transition-all duration-300 ${step === 3 ? "border-[var(--sp-accent)] bg-[rgba(var(--sp-accent-rgb),0.06)]" : "border-[var(--color-border-faint)] opacity-60"}`}>
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-[var(--color-text-bright)]">4. Automated Multichannel Dispatch</span>
            {step === 3 && <CheckCircle2 size={14} className="text-[var(--sp-accent)] animate-bounce" />}
          </div>
          <p className="text-xs text-[var(--color-text-body)] mt-1">
            {step < 3 ? "Awaiting publish..." : "Campaign activated on Meta Ads and auto-posted across Instagram, Facebook & LinkedIn."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function RealEstateWorkflowAutomationPage() {
  const isMobile = useMobile();
  const { resolvedTheme } = useTheme();

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    goal: "All Pods (Full Platform Deployment)",
    phone: "",
    countryCode: "+91",
    customCode: "",
    website: "", // Honeypot
  });

  const [loading, setLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState("Initializing...");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const [showGoalPicker, setShowGoalPicker] = useState(false);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  const countryPickerRef = useRef<HTMLDivElement>(null);
  const goalPickerRef = useRef<HTMLDivElement>(null);

  useCountryDetection(
    countries,
    useCallback((code: string) => setForm(prev => ({ ...prev, countryCode: code })), []),
    useCallback((code: string) => setForm(prev => ({ ...prev, customCode: code })), [])
  );

  // Click Outside hook for dropdown selectors
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (countryPickerRef.current && !countryPickerRef.current.contains(e.target as Node)) {
        setShowCountryPicker(false);
      }
      if (goalPickerRef.current && !goalPickerRef.current.contains(e.target as Node)) {
        setShowGoalPicker(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const selectGoal = (g: string) => {
    setForm(prev => ({ ...prev, goal: g }));
    setShowGoalPicker(false);
  };

  const selectCountry = (code: string) => {
    setForm(prev => ({ ...prev, countryCode: code }));
    setShowCountryPicker(false);
  };

  const runStatusUpdates = async () => {
    const statuses = [
      "Configuring Real Estate Pod settings...",
      "Analyzing CRM & lead routing channels...",
      "Syncing with n8n workflow engine...",
      "Finalizing webhook submission..."
    ];
    for (const status of statuses) {
      setLoadingStatus(status);
      await new Promise(resolve => setTimeout(resolve, 800));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!form.name || !form.email || !form.company) {
      setError("Please fill in all required fields (Name, Email, and Company).");
      setLoading(false);
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(form.email)) {
      setError("Please provide a valid work email address.");
      setLoading(false);
      return;
    }

    const dialCode = form.countryCode === "Custom" ? form.customCode : form.countryCode;
    const statusPromise = runStatusUpdates();

    const apiPromise = submitLead({
      formType: "contact_sales",
      workflowType: "operations_workflow", // maps to operations/sales pipeline
      sourcePage: "/solution/ai-automation-for-real-estate",
      name: form.name,
      email: form.email,
      phone: form.phone ? `${dialCode} ${form.phone}` : undefined,
      company: form.company,
      message: `Real Estate Goal: ${form.goal}`,
      website: form.website,
      metadata: {
        goal: form.goal,
        platform: "Real Estate Workflow Automation Page",
        workflow: "operations_workflow"
      }
    });

    const [, apiResult] = await Promise.all([statusPromise, apiPromise]);
    setLoading(false);

    if (!apiResult.success) {
      setError(apiResult.error || "Submission failed. Please verify connection and try again.");
    } else {
      localStorage.setItem("scalepods_cooldown_realestate", Date.now().toString());
      setSubmitted(true);
      const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
      w.dataLayer = w.dataLayer || [];
      const gtmEvent = { event: "lead_form_success", event_id: apiResult.eventId, form_type: "contact_sales", source_page: "/solution/ai-automation-for-real-estate" };
      console.log("[GTM] lead_form_success →", gtmEvent);
      w.dataLayer.push(gtmEvent);
    }
  };

  const handleDownloadClick = () => {
    setIsDownloadModalOpen(true);
  };

  const handleAuditClick = () => {
    setIsAuditModalOpen(true);
  };

  const selectedCountryObj = countries.find(c => c.code === form.countryCode) || countries[0];

  return (
    <BeamsBackground className="realestatepod-container" hues={[210, 185]}>
      {/* Ambient background glow */}
      <div className="sp-ambient-bg-glow" />

      {/* Fold 1: Hero Section + Lead Gen Form */}
      <section className="sp-hero-wrapper">
        <div className="sp-hero-grid">
          {/* Hero Left Content */}
          <motion.div 
            className="sp-hero-left"
            {...fadeUp(0.1, isMobile)}
          >
            <div className="sp-hero-eyebrow" style={{ display: "flex", justifyContent: "center", width: "100%", transform: "translateY(-0.5px)" }}>
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "var(--font-sans), sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--sp-accent)",
              }}>
                <span style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                  <motion.span
                    animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      background: "var(--sp-accent)",
                      boxShadow: "0 0 8px var(--sp-accent)",
                      flexShrink: 0,
                    }}
                  />
                </span>
                AI-Powered Real Estate Engine
              </span>
            </div>

            <h1 className="sp-hero-title" style={{ textAlign: "center", width: "100%", transform: "translateY(-0.5px)" }}>
              <span style={{ color: "var(--sp-accent)" }}>AI Automation for Real Estate:</span>{" "}
              <br className="sp-hero-desk-br" />
              Convert Buyers Faster, Streamline Viewing Bookings, <br className="sp-hero-br" />
              and Eliminate Pipeline Leakage.
            </h1>

            <div className="sp-hero-desc" style={{ textAlign: "center", marginBottom: isMobile ? "20px" : "24px", marginInline: "auto" }}>
              <p style={{ margin: 0 }}>
                Modern property developers, brokerages, and agency leaders face an evolving sales environment. Traditional sales methods often result in slow inquiry response times, fragmented client data, and lost deals. Deploying practical <strong>AI for real estate</strong> solutions allows property teams to automate client discovery, accelerate site viewing schedules, and build a unified buyer engagement pipeline.
              </p>
              <p style={{ margin: "12px 0 0 0", opacity: 0.9 }}>
                ScalePods provides specialized <strong>real estate AI tools</strong> and modular workflow pods that deploy in under 30 days. As a certified partner in the Claude Partner Network Services Track, ScalePods builds enterprise-grade <strong>AI for real estate marketing</strong>, automated sales engines, and real-time event lead capture systems that transform how real estate businesses handle buyer inquiries and scale transactions.
              </p>
            </div>
            
            {/* Supporting feature bullets */}
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
              gap: isMobile ? "10px" : "12px 24px",
              marginBottom: "28px",
              width: "100%",
              maxWidth: "540px",
              marginInline: "auto"
            }}>
              {[
                "Autonomous Buyer Lead Sourcing",
                "Instant WhatsApp AI Qualification",
                "Multi-Channel Viewing Bookings",
                "Real-Time CRM Auto-Sync"
              ].map((bullet, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
                  <CheckCircle2 size={15} style={{ color: "var(--sp-accent)", flexShrink: 0 }} />
                  <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--color-text-bright)" }}>{bullet}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mt-2 justify-center">
              <motion.button 
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAuditClick} 
                className="sp-hero-cta-btn"
                style={{ cursor: "pointer" }}
              >
                Book a Free Workflow Audit <ArrowRight size={16} />
              </motion.button>
            </div>
          </motion.div>

          {/* Hero Right Lead Gen Form */}
          <motion.div 
            className="flex justify-center"
            {...fadeUp(0.3, isMobile)}
          >
            <div className="sp-form-card">
              <h3 className="text-lg font-bold text-[var(--color-text-bright)] mb-4">Book a Free Workflow Audit</h3>
              
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle2 size={48} className="text-[var(--sp-accent)] mx-auto mb-3" />
                  <h4 className="font-bold text-[var(--color-text-bright)] text-base mb-1">Audit Booked Successfully!</h4>
                  <p className="text-xs text-[var(--color-text-muted)]">Our solution engineering team will reach out within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="sp-form-row">
                  {/* Honeypot field */}
                  <input
                    type="text"
                    name="website"
                    value={form.website}
                    onChange={handleInputChange}
                    style={{ display: "none" }}
                    autoComplete="off"
                  />

                  <div className="flex flex-col gap-1.5">
                    <label className="sp-form-label">Full Name *</label>
                    <input 
                      type="text" 
                      name="name" 
                      required 
                      placeholder="e.g. Alex Sollork" 
                      value={form.name} 
                      onChange={handleInputChange} 
                      className="sp-input-field" 
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="sp-form-label">Company Name *</label>
                    <input 
                      type="text" 
                      name="company" 
                      required 
                      placeholder="e.g. Sollork Developments" 
                      value={form.company} 
                      onChange={handleInputChange} 
                      className="sp-input-field" 
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="sp-form-label">Work Email *</label>
                    <input 
                      type="email" 
                      name="email" 
                      required 
                      placeholder="e.g. alex@sollork.com" 
                      value={form.email} 
                      onChange={handleInputChange} 
                      className="sp-input-field" 
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 relative" ref={goalPickerRef}>
                    <label className="sp-form-label">Target Workflow Pod *</label>
                    <button 
                      type="button" 
                      onClick={() => setShowGoalPicker(!showGoalPicker)} 
                      className="sp-dropdown-btn"
                    >
                      <span>{form.goal}</span>
                      <ChevronDown size={14} />
                    </button>
                    {showGoalPicker && (
                      <div className="sp-phone-dropdown w-full">
                        {realEstateGoals.map((goal, idx) => (
                          <button 
                            key={idx} 
                            type="button" 
                            onClick={() => selectGoal(goal)} 
                            className="sp-phone-option"
                          >
                            {goal}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="sp-form-label">Work Phone / WhatsApp (Optional)</label>
                    <div className="flex gap-2 relative">
                      <div ref={countryPickerRef} className="w-[84px] shrink-0">
                        <button 
                          type="button" 
                          onClick={() => setShowCountryPicker(!showCountryPicker)} 
                          className="sp-dropdown-btn"
                        >
                          <span className="flex items-center gap-1.5">
                            <span>{selectedCountryObj.flag}</span>
                            <span>{selectedCountryObj.code}</span>
                          </span>
                          <ChevronDown size={12} />
                        </button>
                        {showCountryPicker && (
                          <div className="sp-phone-dropdown">
                            {countries.map((c, idx) => (
                              <button 
                                key={idx} 
                                type="button" 
                                onClick={() => selectCountry(c.code)} 
                                className="sp-phone-option"
                              >
                                <span className="mr-2">{c.flag}</span>
                                <span>{c.name} ({c.code})</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <input 
                        type="tel" 
                        name="phone" 
                        placeholder="Phone number" 
                        value={form.phone} 
                        onChange={handleInputChange} 
                        className="sp-input-field flex-1" 
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-red-400 text-xs mt-1 p-2 rounded bg-red-950/20 border border-red-900/30">
                      <AlertTriangle size={12} />
                      <span>{error}</span>
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={loading} 
                    className="sp-submit-btn mt-2"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="animate-spin" size={14} />
                        <span>{loadingStatus}</span>
                      </span>
                    ) : (
                      <span>Book Free Audit</span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Brands Marquee */}
      <BrandsMarquee />

      {/* Claude Partnership */}
      <ClaudePartnership />

      {/* Fold 2: Benchmark Metrics Section */}
      <section className="sp-section-wrapper">
        <div className="sp-section-title-wrap">
          <div className="sp-section-eyebrow">Industry Benchmark Metrics</div>
          <h2 className="sp-section-heading">Strategic Impact Across Every <span style={{ color: "var(--sp-accent)" }}>Real Estate Function</span></h2>
          <p className="sp-section-subheading">
            Integrating AI and real estate technology turns manual agency operations into an automated, highly responsive revenue system. Combining <strong>real estate workflow automation</strong> with hands-on operational support enables agencies to eliminate response delays, qualify serious property buyers around the clock, and reduce administrative burdens on sales agents.
          </p>
        </div>

        <div className="sp-telemetry-grid">
          {/* Card 1 */}
          <div className="sp-telemetry-card">
            <div className="sp-telemetry-icon-box">
              <TrendingUp size={20} />
            </div>
            <div className="sp-telemetry-stat">$4.5B</div>
            <div className="sp-telemetry-label">Market Growth</div>
            <p className="sp-telemetry-desc">Projected annual investment in <strong>AI in real estate industry</strong> deployments globally.</p>
          </div>

          {/* Card 2 */}
          <div className="sp-telemetry-card">
            <div className="sp-telemetry-icon-box">
              <Building size={20} />
            </div>
            <div className="sp-telemetry-stat">76%</div>
            <div className="sp-telemetry-label">Industry Adoption</div>
            <p className="sp-telemetry-desc">Leading firms using <strong>automation in real estate</strong> to manage client acquisition, buyer profiling, and sales systems.</p>
          </div>

          {/* Card 3 */}
          <div className="sp-telemetry-card">
            <div className="sp-telemetry-icon-box">
              <Target size={20} />
            </div>
            <div className="sp-telemetry-stat">4.8×</div>
            <div className="sp-telemetry-label">Lead Conversion</div>
            <p className="sp-telemetry-desc">Higher conversion rates achieved using structured, multi-channel lead nurturing workflows.</p>
          </div>

          {/* Card 4 */}
          <div className="sp-telemetry-card">
            <div className="sp-telemetry-icon-box">
              <Zap size={20} />
            </div>
            <div className="sp-telemetry-stat">65%</div>
            <div className="sp-telemetry-label">Sales Velocity</div>
            <p className="sp-telemetry-desc">Faster deal turnaround using multi-channel automated outreach across WhatsApp, Email, and Phone.</p>
          </div>
        </div>
      </section>

      {/* Fold 3: Pilot Outcomes Table */}
      <section className="sp-section-wrapper border-t border-[var(--color-border-faint)]">
        <div className="sp-section-title-wrap">
          <div className="sp-section-eyebrow">Measurable Performance Framework</div>
          <h2 className="sp-section-heading">Auditable Clarity Across <span style={{ color: "var(--sp-accent)" }}>Broker Pipelines & Property Expos</span></h2>
          <p className="sp-section-subheading">
            Deploying <strong>AI in real estate</strong> workflows provides operational clarity and auditable performance metrics across marketing campaigns, broker pipelines, and property exhibitions:
          </p>
        </div>

        <div className="sp-table-wrapper">
          <table className="sp-impact-table">
            <thead>
              <tr>
                <th>Performance Metric</th>
                <th>Typical Result</th>
                <th>Primary Growth Driver</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="sp-table-metric">Sales Velocity</td>
                <td className="sp-table-result">3× More Meetings</td>
                <td>Automated multi-channel outreach and direct calendar scheduling using a tailored <strong>real estate sales crm</strong>.</td>
              </tr>
              <tr>
                <td className="sp-table-metric">Lead Quality</td>
                <td className="sp-table-result">3× Higher Intent Leads</td>
                <td>ICP prospect matching and sentiment-scored <strong>real estate lead generation</strong>.</td>
              </tr>
              <tr>
                <td className="sp-table-metric">Event Pipeline</td>
                <td className="sp-table-result">50% Higher Conversion</td>
                <td>Real-time on-site lead scoring and same-day property brochure delivery.</td>
              </tr>
              <tr>
                <td className="sp-table-metric">Marketing Output</td>
                <td className="sp-table-result">80% Less Manual Work</td>
                <td>AI-assisted property content creation, campaign scheduling, and multi-platform repurposing.</td>
              </tr>
              <tr>
                <td className="sp-table-metric">Data Integrity</td>
                <td className="sp-table-result">Near-100% CRM Accuracy</td>
                <td>Real-time data synchronization across property portals, messaging platforms, and <strong>CRM tools for real estate</strong>.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="text-center">
          <a href="#audit-form-section" className="sp-stats-cta-btn">
            Discover the Impact for Your Real Estate Business <ArrowRight size={14} />
          </a>
        </div>
      </section>

      {/* Fold 4: Pods Overview Section */}
      <section className="sp-section-wrapper border-t border-[var(--color-border-faint)]">
        <div className="sp-section-title-wrap">
          <div className="sp-section-eyebrow">Specialized Real Estate AI Pods</div>
          <h2 className="sp-section-heading">Three Engines Built for <span style={{ color: "var(--sp-accent)" }}>Zero-Friction Growth</span></h2>
          <p className="sp-section-subheading">
            ScalePods delivers modular, plug-and-play workflow engines tailored to the real estate sales cycle. Each pod operates as an autonomous <strong>real estate lead generation platform</strong> while connecting directly into your active CRM tech stack.
          </p>
        </div>

        <div className="sp-pods-overview-grid">
          {/* Card 1 */}
          <div className="sp-pod-overview-card">
            <div className="relative w-full h-44 mb-5 rounded-xl overflow-hidden border border-[var(--color-border-faint)] bg-white/50 dark:bg-black/20">
              <Image src="/images/Sales.svg" alt="Real Estate Sales Pod Interface" fill className="object-contain p-4" />
              <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full border border-[var(--sp-accent)]/40 text-[10px] font-bold text-[var(--sp-accent)] uppercase tracking-wider">
                Sales Pod
              </div>
            </div>
            <h3 className="sp-pod-card-title">Real Estate Sales Pod</h3>
            <div className="sp-pod-card-subtitle">Autonomous Lead Sourcing & Engagement</div>
            <div className="sp-pod-card-list">
              <div className="sp-pod-card-item">
                <Check size={16} className="sp-pod-card-icon" />
                <span><strong>Precision Lead Discovery:</strong> Target buyer profile matching and property buyer list extraction.</span>
              </div>
              <div className="sp-pod-card-item">
                <Check size={16} className="sp-pod-card-icon" />
                <span><strong>Omnichannel Outreach:</strong> Automated touchpoints across LinkedIn, Email, and WhatsApp.</span>
              </div>
              <div className="sp-pod-card-item">
                <Check size={16} className="sp-pod-card-icon" />
                <span><strong>Intent-Driven Nurturing:</strong> Trigger automated viewing schedules and project datasheet delivery.</span>
              </div>
              <div className="sp-pod-card-item">
                <Check size={16} className="sp-pod-card-icon" />
                <span><strong>Sentiment-Based Scoring:</strong> Log buyer intent and timeline rankings directly into CRM.</span>
              </div>
            </div>
            <button onClick={handleDownloadClick} className="sp-feature-dl-btn">
              <Download size={14} /> Download Feature Guide
            </button>
          </div>

          {/* Card 2 */}
          <div className="sp-pod-overview-card">
            <div className="relative w-full h-44 mb-5 rounded-xl overflow-hidden border border-[var(--color-border-faint)] bg-white/50 dark:bg-black/20">
              <Image src="/images/Marketing.svg" alt="Real Estate Marketing Automation Pod Interface" fill className="object-contain p-4" />
              <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full border border-[var(--sp-accent)]/40 text-[10px] font-bold text-[var(--sp-accent)] uppercase tracking-wider">
                Marketing Pod
              </div>
            </div>
            <h3 className="sp-pod-card-title">Marketing Automation Pod</h3>
            <div className="sp-pod-card-subtitle">Scale Your Digital Footprint on Autopilot</div>
            <div className="sp-pod-card-list">
              <div className="sp-pod-card-item">
                <Check size={16} className="sp-pod-card-icon" />
                <span><strong>Full-Funnel Intelligence:</strong> Competitor analysis and local market keyword research.</span>
              </div>
              <div className="sp-pod-card-item">
                <Check size={16} className="sp-pod-card-icon" />
                <span><strong>AI Content & Visuals:</strong> High-converting property listing copy, blogs, and ad creatives.</span>
              </div>
              <div className="sp-pod-card-item">
                <Check size={16} className="sp-pod-card-icon" />
                <span><strong>Maker-Checker Workflow:</strong> Review and approve drafted creatives with a single click.</span>
              </div>
              <div className="sp-pod-card-item">
                <Check size={16} className="sp-pod-card-icon" />
                <span><strong>Performance Analytics:</strong> Connect Meta Ads, Google Ads, GA4, and Clarity for real-time ROI.</span>
              </div>
            </div>
            <button onClick={handleDownloadClick} className="sp-feature-dl-btn">
              <Download size={14} /> Download Feature Guide
            </button>
          </div>

          {/* Card 3 */}
          <div className="sp-pod-overview-card">
            <div className="relative w-full h-44 mb-5 rounded-xl overflow-hidden border border-[var(--color-border-faint)] bg-white/50 dark:bg-black/20">
              <Image src="/images/Exhibition.svg" alt="Exhibition & Event Intelligence Pod Interface" fill className="object-contain p-4" />
              <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full border border-[var(--sp-accent)]/40 text-[10px] font-bold text-[var(--sp-accent)] uppercase tracking-wider">
                Exhibition Pod
              </div>
            </div>
            <h3 className="sp-pod-card-title">Exhibition & Event Pod</h3>
            <div className="sp-pod-card-subtitle">Turn Expos into Pipeline Growth</div>
            <div className="sp-pod-card-list">
              <div className="sp-pod-card-item">
                <Check size={16} className="sp-pod-card-icon" />
                <span><strong>Attendee Intelligence:</strong> Pre-qualify visitors against investor and buyer directories.</span>
              </div>
              <div className="sp-pod-card-item">
                <Check size={16} className="sp-pod-card-icon" />
                <span><strong>Smart Lead Capture:</strong> Digitize badges and business cards instantly with OCR scanning.</span>
              </div>
              <div className="sp-pod-card-item">
                <Check size={16} className="sp-pod-card-icon" />
                <span><strong>Automated Follow-Up Loops:</strong> Send thank-you WhatsApps and floor plans within hours.</span>
              </div>
              <div className="sp-pod-card-item">
                <Check size={16} className="sp-pod-card-icon" />
                <span><strong>Interactive Event Dashboard:</strong> Monitor qualified leads and booked viewings from one interface.</span>
              </div>
            </div>
            <button onClick={handleDownloadClick} className="sp-feature-dl-btn">
              <Download size={14} /> Download Feature Guide
            </button>
          </div>
        </div>
      </section>

      {/* Fold 5: Sales Pod (Deep-Dive) */}
      <section className="sp-section-wrapper border-t border-[var(--color-border-faint)]">
        <div className="sp-deep-dive-row">
          <div className="flex justify-center w-full">
            <FloatingPreviewCarouselWrapper items={salesCarouselImages} autoRotate={true} />
          </div>

          <div className="flex flex-col">
            <div className="sp-section-eyebrow">Real Estate Sales Pod</div>
            <h2 className="sp-section-heading">Autonomous Lead Sourcing & <span style={{ color: "var(--sp-accent)" }}>Engagement</span></h2>
            <div style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px" }}>
              Automate Prospect Sourcing. Your Team Focuses on Closing Deals.
            </div>
            <p className="sp-section-subheading">
              Allow your brokers to focus entirely on property viewings and contract negotiations. The Sales Pod automates <strong>lead generation and real estate</strong> activities, identifies prospective buyers, and manages early-stage conversations.
            </p>

            <div className="sp-capability-block">
              <div className="sp-cap-item">
                <div className="sp-cap-num-box">01</div>
                <div className="sp-cap-text">
                  <span className="sp-cap-title">Precision Lead Discovery</span>
                  <span className="sp-cap-desc">Define your target buyer profile and automatically extract property buyer lists across target geographic regions using <strong>real estate lead gen</strong> criteria.</span>
                </div>
              </div>

              <div className="sp-cap-item">
                <div className="sp-cap-num-box">02</div>
                <div className="sp-cap-text">
                  <span className="sp-cap-title">Omnichannel AI Outreach</span>
                  <span className="sp-cap-desc">Engage active property buyers across LinkedIn, Email, and WhatsApp using <strong>AI for real estate leads</strong> aligned with your brand voice.</span>
                </div>
              </div>

              <div className="sp-cap-item">
                <div className="sp-cap-num-box">03</div>
                <div className="sp-cap-text">
                  <span className="sp-cap-title">Intent-Driven Nurturing</span>
                  <span className="sp-cap-desc">Answer buyer questions, deliver project datasheets, and schedule property viewings using automated <strong>real estate lead nurturing</strong> sequences.</span>
                </div>
              </div>

              <div className="sp-cap-item">
                <div className="sp-cap-num-box">04</div>
                <div className="sp-cap-text">
                  <span className="sp-cap-title">Sentiment-Based Lead Scoring</span>
                  <span className="sp-cap-desc">Evaluate buyer sentiment, purchasing timelines, and budgets, syncing ranked contacts directly to your <strong>real estate lead crm</strong>.</span>
                </div>
              </div>
            </div>

            <div style={{
              marginTop: "20px",
              padding: "14px 18px",
              background: "rgba(var(--sp-accent-rgb), 0.06)",
              border: "1px solid rgba(var(--sp-accent-rgb), 0.2)",
              borderRadius: "10px",
              fontSize: "13px",
              color: "var(--color-text-bright)",
              lineHeight: 1.5
            }}>
              <strong>Empowered Broker Teams:</strong> Equip your team with <strong>AI for real estate agents</strong> to handle routine inquiries and escalate high-intent buyers to senior brokers.
            </div>

            <div className="mt-8">
              <a href="#audit-form-section" className="sp-stats-cta-btn">
                Automate Your Real Estate Sales Pipeline — Book a Free Audit
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Fold 6: Marketing Automation Pod (Deep-Dive) */}
      <section className="sp-section-wrapper border-t border-[var(--color-border-faint)]">
        <div className="sp-deep-dive-row reversed">
          <div className="flex flex-col">
            <div className="sp-section-eyebrow">Real Estate Marketing Automation Pod</div>
            <h2 className="sp-section-heading">Scale Your Digital Footprint <span style={{ color: "var(--sp-accent)" }}>on Autopilot</span></h2>
            <div style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px" }}>
              Publish Campaigns on Autopilot from Strategy to Final Post
            </div>
            <p className="sp-section-subheading">
              Scale your digital reach across organic search, social platforms, and paid ad channels without creation delays or high agency overhead using <strong>AI for real estate marketing</strong>.
            </p>

            <div className="sp-capability-block">
              <div className="sp-cap-item">
                <div className="sp-cap-num-box">01</div>
                <div className="sp-cap-text">
                  <span className="sp-cap-title">Full-Funnel Market Intelligence</span>
                  <span className="sp-cap-desc">Deploy automated competitive analysis and local market keyword research strategies using specialized <strong>real estate marketing systems</strong>.</span>
                </div>
              </div>

              <div className="sp-cap-item">
                <div className="sp-cap-num-box">02</div>
                <div className="sp-cap-text">
                  <span className="sp-cap-title">AI Content & Visual Generation</span>
                  <span className="sp-cap-desc">Create high-quality property listing descriptions, blog posts, and visual ad creatives using the <strong>best AI for real estate</strong> frameworks.</span>
                </div>
              </div>

              <div className="sp-cap-item">
                <div className="sp-cap-num-box">03</div>
                <div className="sp-cap-text">
                  <span className="sp-cap-title">Maker-Checker Approval Workflow</span>
                  <span className="sp-cap-desc">Maintain complete quality control through a simple review portal where campaign managers approve drafted assets with one click.</span>
                </div>
              </div>

              <div className="sp-cap-item">
                <div className="sp-cap-num-box">04</div>
                <div className="sp-cap-text">
                  <span className="sp-cap-title">AI Performance Analytics</span>
                  <span className="sp-cap-desc">Connect Meta Ads, Google Ads, GA4, and Clarity to monitor ad spend and conversion data using full-funnel <strong>marketing automation for real estate</strong>.</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <a href="#audit-form-section" className="sp-stats-cta-btn">
                See the Marketing Pod in Action — Book a Free Audit
              </a>
            </div>
          </div>

          <div className="flex justify-center w-full">
            <FloatingPreviewCarouselWrapper items={marketingCarouselImages} autoRotate={true} />
          </div>
        </div>
      </section>

      {/* Fold 7: Exhibition & Event Revenue Intelligence Suite (Deep-Dive) */}
      <section className="sp-section-wrapper border-t border-[var(--color-border-faint)]">
        <div className="sp-deep-dive-row">
          <div className="flex justify-center w-full">
            <FloatingPreviewCarouselWrapper items={exhibitionCarouselImages} autoRotate={true} />
          </div>

          <div className="flex flex-col">
            <div className="sp-section-eyebrow">Exhibition & Event Intelligence Pod</div>
            <h2 className="sp-section-heading">Turn Expos into <span style={{ color: "var(--sp-accent)" }}>Pipeline Growth</span></h2>
            <div style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px" }}>
              Capture Every High-Intent Visitor Before They Leave Your Booth
            </div>
            <p className="sp-section-subheading">
              Ensure every visitor at property expos, international launch events, and roadshows becomes a tracked sales opportunity.
            </p>

            <div className="sp-capability-block">
              <div className="sp-cap-item">
                <div className="sp-cap-num-box">01</div>
                <div className="sp-cap-text">
                  <span className="sp-cap-title">Attendee Intelligence & Targeting</span>
                  <span className="sp-cap-desc">Cross-reference registered event lists against developer and investor directories to pre-qualify prospective buyers before the event starts.</span>
                </div>
              </div>

              <div className="sp-cap-item">
                <div className="sp-cap-num-box">02</div>
                <div className="sp-cap-text">
                  <span className="sp-cap-title">Smart Expo Lead Capture</span>
                  <span className="sp-cap-desc">Digitize physical business cards and event badges instantly using OCR scanning connected directly to <strong>real estate crm lead management</strong> databases.</span>
                </div>
              </div>

              <div className="sp-cap-item">
                <div className="sp-cap-num-box">03</div>
                <div className="sp-cap-text">
                  <span className="sp-cap-title">Automated Follow-Up Loops</span>
                  <span className="sp-cap-desc">Send personalized thank-you messages, digital floor plans, and property datasheets via WhatsApp or Email within hours of contact using <strong>real estate lead follow-up</strong>.</span>
                </div>
              </div>

              <div className="sp-cap-item">
                <div className="sp-cap-num-box">04</div>
                <div className="sp-cap-text">
                  <span className="sp-cap-title">Interactive Event Dashboard</span>
                  <span className="sp-cap-desc">Track total lead volume, qualified buyers, and booked viewings from a single interface.</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <a href="#audit-form-section" className="sp-stats-cta-btn">
                Turn Your Next Event into Pipeline — Book a Free Audit
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Fold 8: Sales Intelligence & Marketing OS Architecture */}
      <section className="sp-section-wrapper border-t border-[var(--color-border-faint)]">
        <div className="sp-section-title-wrap">
          <div className="sp-section-eyebrow">Enterprise Architecture</div>
          <h2 className="sp-section-heading">Sales Intelligence & <span style={{ color: "var(--sp-accent)" }}>Marketing OS Architecture</span></h2>
          <p className="sp-section-subheading">
            Managing <strong>IT in real estate</strong> operations requires reliable connections between front-end marketing channels, sales reps, and backend property databases. ScalePods unifies these components into a secure <strong>real estate workflow automation software</strong> system.
          </p>
        </div>

        <div className="sp-advantage-grid">
          <div className="sp-advantage-card">
            <h4 className="sp-advantage-title">
              <CheckCircle2 size={16} className="text-[var(--sp-accent)]" />
              Pipeline Performance Center
            </h4>
            <p className="sp-advantage-desc">
              Monitor deal movement, buyer intent, and conversion velocity across all active developments in real time using your <strong>real estate sales pipeline</strong>.
            </p>
          </div>

          <div className="sp-advantage-card">
            <h4 className="sp-advantage-title">
              <CheckCircle2 size={16} className="text-[var(--sp-accent)]" />
              Dynamic CRM Synchronization
            </h4>
            <p className="sp-advantage-desc">
              Connects seamlessly with platforms like Salesforce, HubSpot, Zoho, Property Finder, and custom MLS architectures through secure <strong>real estate CRM workflow</strong> integrations.
            </p>
          </div>

          <div className="sp-advantage-card">
            <h4 className="sp-advantage-title">
              <CheckCircle2 size={16} className="text-[var(--sp-accent)]" />
              Automated Drip Campaigns
            </h4>
            <p className="sp-advantage-desc">
              Keep long-term prospects engaged by serving relevant market reports, updated site images, and price adjustments via structured <strong>real estate workflow</strong> loops.
            </p>
          </div>

          <div className="sp-advantage-card">
            <h4 className="sp-advantage-title">
              <CheckCircle2 size={16} className="text-[var(--sp-accent)]" />
              Agentic Automation Systems
            </h4>
            <p className="sp-advantage-desc">
              Use <strong>real estate agent automation</strong> to handle multi-step tasks—from initial lead intake to viewing coordination—without manual data entry.
            </p>
          </div>
        </div>
      </section>

      {/* Fold 9: The ScalePods Advantage */}
      <section className="sp-section-wrapper border-t border-[var(--color-border-faint)]">
        <div className="sp-section-title-wrap">
          <div className="sp-section-eyebrow">The ScalePods Advantage</div>
          <h2 className="sp-section-heading">Built for High-Growth <span style={{ color: "var(--sp-accent)" }}>Property Teams</span></h2>
        </div>

        <div className="sp-advantage-grid">
          <div className="sp-advantage-card">
            <h4 className="sp-advantage-title">
              <CheckCircle2 size={16} className="text-[var(--sp-accent)]" />
              End-to-End Platform
            </h4>
            <p className="sp-advantage-desc">
              Unify sales outreach, property listings, and event lead capture into a single system—eliminating fragmented software tools.
            </p>
          </div>

          <div className="sp-advantage-card">
            <h4 className="sp-advantage-title">
              <CheckCircle2 size={16} className="text-[var(--sp-accent)]" />
              Custom-Mapped Operations
            </h4>
            <p className="sp-advantage-desc">
              Workflows match your exact agency processes, from initial site-visit bookings to buyer document verification.
            </p>
          </div>

          <div className="sp-advantage-card">
            <h4 className="sp-advantage-title">
              <CheckCircle2 size={16} className="text-[var(--sp-accent)]" />
              30-Day Go-Live
            </h4>
            <p className="sp-advantage-desc">
              Systems deploy within weeks without interrupting ongoing broker operations.
            </p>
          </div>

          <div className="sp-advantage-card">
            <h4 className="sp-advantage-title">
              <CheckCircle2 size={16} className="text-[var(--sp-accent)]" />
              Human + AI Precision
            </h4>
            <p className="sp-advantage-desc">
              Operations teams work alongside automated agents to verify buyer qualifications and coordinate viewing schedules.
            </p>
          </div>

          <div className="sp-advantage-card">
            <h4 className="sp-advantage-title">
              <CheckCircle2 size={16} className="text-[var(--sp-accent)]" />
              Flexible Modular Pods
            </h4>
            <p className="sp-advantage-desc">
              Scale individual pods as your project portfolio and sales teams expand.
            </p>
          </div>
        </div>
      </section>

      {/* Fold 10: Client Success Story */}
      <section className="sp-section-wrapper border-t border-[var(--color-border-faint)]">
        <div className="sp-section-title-wrap">
          <div className="sp-section-eyebrow">Client Success Story</div>
          <h2 className="sp-section-heading">Luxury Agency Expansion: <span style={{ color: "var(--sp-accent)" }}>Lotus Manor Real Estate</span></h2>
          <p className="sp-section-subheading">
            Dubai, United Arab Emirates
          </p>
        </div>

        <div style={{
          maxWidth: "840px",
          margin: "0 auto 40px",
          padding: "36px 32px",
          background: "var(--sp-card-bg)",
          border: "var(--sp-card-border)",
          borderRadius: "16px",
          boxShadow: "var(--sp-card-shadow)",
          textAlign: "center"
        }}>
          <p style={{
            fontSize: "17px",
            lineHeight: 1.7,
            fontStyle: "italic",
            color: "var(--color-text-bright)",
            marginBottom: "20px"
          }}>
            “We needed an AI agent that wouldn't embarrass us in front of investors. Scalepods delivered it — and made the process easy. They were quick to respond, quick to iterate, and treated our launch deadline like their own. The kind of partner you want when the work has to be right, and the timeline is tight.”
          </p>
          <div style={{
            fontSize: "14px",
            fontWeight: 700,
            color: "var(--sp-accent)",
            textTransform: "uppercase",
            letterSpacing: "0.08em"
          }}>
            — Executive Leadership, Lotus Manor Real Estate (Dubai, UAE)
          </div>
        </div>

        <TestimonialCarousel />
      </section>

      {/* Fold 11: Frequently Asked Questions Accordion */}
      <section className="sp-section-wrapper border-t border-[var(--color-border-faint)]">
        <div className="sp-section-title-wrap">
          <div className="sp-section-eyebrow">FAQ</div>
          <h2 className="sp-section-heading">Frequently Asked Questions</h2>
        </div>

        <div className="sp-faq-list">
          {[
            {
              q: "What are the main AI use cases in real estate?",
              a: "The top AI use cases in real estate include automated lead capture, 24/7 buyer qualification via WhatsApp, tailored property recommendation engines, site-visit bookings, ad campaign optimization, and booth lead processing during trade shows."
            },
            {
              q: "How does AI for real estate leads improve overall conversion rates?",
              a: "By delivering responses in under 60 seconds, pre-qualifying buyer timelines and budgets, and routing serious prospects directly to brokers, real estate CRM and lead generation platforms prevent cold lead drop-off and increase viewing conversions."
            },
            {
              q: "Can an AI chatbot real estate engine integrate with our current setup?",
              a: "Yes. An AI real estate chatbot or conversational agent connects directly to your existing crm for real estate teams (such as Salesforce, HubSpot, Zoho, or Property Finder) using secure APIs and Model Context Protocol (MCP)."
            },
            {
              q: "How does real estate agent automation support sales brokers?",
              a: "Automation handles repetitive administrative work—such as entering contact data, scheduling viewings, delivering brochures, and running follow-up real estate drip campaigns—allowing brokers to focus on closing deals."
            },
            {
              q: "What role do AI tools for real estate play in real estate marketing?",
              a: "They automate property copy generation, social content scheduling, ad budget optimization, and audience retargeting to maintain a consistent real estate marketing CRM acquisition pipeline."
            }
          ].map((faq, idx) => {
            const isExpanded = expandedFaq === idx;
            return (
              <div key={idx} className="sp-faq-item">
                <button
                  className="sp-faq-question-btn"
                  onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                >
                  <span className="sp-faq-question-text">{faq.q}</span>
                  <svg
                    className="sp-faq-icon"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <div
                  className="sp-faq-answer-wrapper"
                  style={{
                    maxHeight: isExpanded ? "500px" : "0px",
                  }}
                >
                  <div className="sp-faq-answer-content">
                    <p style={{ margin: 0 }}>{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Fold 12: Final CTA - Bottom of Page */}
      <section id="audit-form-section" className="sp-section-wrapper border-t border-[var(--color-border-faint)]">
        <div className="sp-final-card">
          <h2 className="sp-section-heading">Schedule Your Free <span style={{ color: "var(--sp-accent)" }}>Real Estate Workflow Audit</span></h2>
          <p className="sp-section-subheading max-w-[760px] mx-auto text-center" style={{ textAlign: "center" }}>
            Transform your agency's pipeline into a scalable, high-velocity growth engine. Book a 30-minute interactive workflow audit to receive a custom <strong>real estate and AI</strong> automation roadmap and projected operational returns.
          </p>

          <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "24px",
            marginTop: "24px",
            fontSize: "13px",
            color: "var(--color-text-muted)"
          }}>
            <span>Email Inquiries: <strong style={{ color: "var(--color-text-bright)" }}>info@scalepods.co</strong></span>
            <span>•</span>
            <span>Global Implementation: Enterprise-ready solutions for developers, brokerages & property management firms worldwide.</span>
          </div>

          <div className="flex justify-center mt-8">
            <a href="#audit-form-section" onClick={handleAuditClick} className="sp-final-cta-btn">
              Book My Free Workflow Audit <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* Dynamic Modals */}
      <DownloadModal 
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        sourceType="Real Estate Feature Guide"
        sourceName="Real Estate Landing Page"
      />

      <AuditModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        title="Schedule Your Real Estate Audit"
        sourceName="Real Estate Landing Page"
      />
    </BeamsBackground>
  );
}
