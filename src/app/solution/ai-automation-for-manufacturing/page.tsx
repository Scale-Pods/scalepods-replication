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
import TestimonialCarousel from "@/components/ui/TestimonialCarousel";
import { BrandsMarquee } from "@/components/sections/Sections";
import ClaudePartnership from "@/components/sections/ClaudePartnership";
import { FloatingPreviewCarouselWrapper } from "@/components/ui/FloatingPreviewCarouselWrapper";
import "./manufacturingpod.css";

// Country codes list
const countries = [
  { name: "USA", code: "+1", flag: "🇺🇸" },
  { name: "UK", code: "+44", flag: "🇬🇧" },
  { name: "UAE", code: "+971", flag: "🇦🇪" },
  { name: "India", code: "+91", flag: "🇮🇳" },
  { name: "Canada", code: "+1", flag: "🇨🇦" },
  { name: "Australia", code: "+61", flag: "🇦🇺" },
  { name: "Germany", code: "+49", flag: "🇩🇪" },
  { name: "France", code: "+33", flag: "🇫🇷" },
  { name: "Singapore", code: "+65", flag: "🇸🇬" },
  { name: "Other", code: "Custom", flag: "🌐" },
];

const manufacturingGoals = [
  "Warehousing Pod (Pricing & Alerts)",
  "Sales Pod (Prospecting & CRM)",
  "Exhibition Pod (Lead Capture & Follow-up)",
  "All Pods (Full Implementation)"
];



const opsCarouselImages = [
  { id: 1, title: "Vendor Command Center", heading: "Operational Command Center", description: "Monitor and manage all automated operational pipelines from a centralized interface.", imageUrl: "/images/showcase/ops/vendor-tool-1.png", systemLabel: "OPERATIONS OS" },
  { id: 2, title: "Risk Assessment", heading: "Cross-Stack Logic Builder", description: "Orchestrate data flows and task triggers across your entire technical infrastructure.", imageUrl: "/images/showcase/ops/vendor-tool-2.png", systemLabel: "SYSTEM ARCHITECTURE" },
  { id: 3, title: "Compliance Verification", heading: "AI Resource Optimization", description: "Leverage AI to predict resource needs and optimize allocation for maximum efficiency.", imageUrl: "/images/showcase/ops/vendor-tool-3.png", systemLabel: "SUPPLY CHAIN HUB" },
  { id: 4, title: "Sourcing Intelligence", heading: "Self-Healing Operations", description: "Identify and resolve operational friction points in real-time.", imageUrl: "/images/showcase/ops/vendor-tool-4.png", systemLabel: "REVENUE OPS" },
  { id: 5, title: "Contract Compliance", heading: "Infrastructure Sync Engine", description: "Ensure 100% data accuracy across ERP, CRM, and fulfillment systems.", imageUrl: "/images/showcase/ops/crr-1.png", systemLabel: "DATA INFRA" },
  { id: 6, title: "Risk Analysis", heading: "Dynamic Risk Audit", description: "Analyze, audit, and verify compliance constraints across all manufacturing and warehousing vendors.", imageUrl: "/images/showcase/ops/crr-2.png", systemLabel: "COMPLIANCE OS" },
];

const salesCarouselImages = [
  { id: 1, title: "Sales Intelligence Hub", heading: "Pipeline Performance Center", description: "Real-time deal flow and conversion tracking.", imageUrl: "/images/showcase/sales/Sales tool 1.png", systemLabel: "REVENUE OS" },
  { id: 2, title: "Outreach Orchestrator", heading: "Multi-Channel Outreach Pod", description: "Autonomous engagement across WhatsApp, LinkedIn and Email.", imageUrl: "/images/showcase/sales/Sales tool 2.png", systemLabel: "OUTREACH ENGINE" },
  { id: 3, title: "Conversion Analytics", heading: "Growth Analytics Engine", description: "Funnel velocity and performance monitoring.", imageUrl: "/images/showcase/sales/Sales tool 3.png", systemLabel: "ANALYTICS HUB" },
  { id: 4, title: "Lead Scoring Center", heading: "Intelligent Lead Prioritization", description: "AI-driven scoring and routing architecture.", imageUrl: "/images/showcase/sales/Sales tool 4.png", systemLabel: "GROWTH INTELLIGENCE" },
  { id: 5, title: "Agent Performance", heading: "Sales Force Command Center", description: "Monitor AI agent efficacy and demo volume.", imageUrl: "/images/showcase/sales/Sales tool 5.png", systemLabel: "SALES OPS" },
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

// Interactive Manufacturing Order Loop Visualizer
function ManufacturingWorkflowViz() {
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
          <span className="text-xs font-bold tracking-wider text-[var(--color-text-bright)] uppercase">Warehousing Pod Live simulation</span>
        </div>
        <button onClick={() => setStep(0)} className="text-xs text-[var(--sp-accent)] flex items-center gap-1 hover:underline">
          <RotateCcw size={10} /> Reset
        </button>
      </div>

      <div className="space-y-4">
        {/* Step 1: Order Input */}
        <div className={`p-3 rounded-lg border transition-all duration-300 ${step === 0 ? "border-[var(--sp-accent)] bg-[rgba(var(--sp-accent-rgb),0.06)]" : "border-[var(--color-border-faint)] opacity-60"}`}>
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-[var(--color-text-bright)]">1. Stock Request Input</span>
            {step > 0 && <CheckCircle2 size={14} className="text-[var(--sp-accent)]" />}
          </div>
          <p className="text-xs text-[var(--color-text-body)] mt-1">
            Incoming RFQ via WhatsApp: "Need 250 sheets Grade 304 Stainless Steel (2mm x 1250mm x 2500mm)"
          </p>
        </div>

        {/* Step 2: WMS Inventory Verification */}
        <div className={`p-3 rounded-lg border transition-all duration-300 ${step === 1 ? "border-[var(--sp-accent)] bg-[rgba(var(--sp-accent-rgb),0.06)]" : "border-[var(--color-border-faint)] opacity-60"}`}>
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-[var(--color-text-bright)]">2. AI Inventory Lookup</span>
            {step > 1 ? <CheckCircle2 size={14} className="text-[var(--sp-accent)]" /> : step === 1 && <Loader2 size={12} className="animate-spin text-[var(--sp-accent)]" />}
          </div>
          <p className="text-xs text-[var(--color-text-body)] mt-1">
            {step < 1 ? "Awaiting lookup..." : "WMS query: 120 sheets available in Zone B. 130 sheets shortage detected."}
          </p>
        </div>

        {/* Step 3: Supplier RFQ Trigger */}
        <div className={`p-3 rounded-lg border transition-all duration-300 ${step === 2 ? "border-[var(--sp-accent)] bg-[rgba(var(--sp-accent-rgb),0.06)]" : "border-[var(--color-border-faint)] opacity-60"}`}>
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-[var(--color-text-bright)]">3. Autonomous Sourcing</span>
            {step > 2 ? <CheckCircle2 size={14} className="text-[var(--sp-accent)]" /> : step === 2 && <Loader2 size={12} className="animate-spin text-[var(--sp-accent)]" />}
          </div>
          <p className="text-xs text-[var(--color-text-body)] mt-1">
            {step < 2 ? "Awaiting inventory check..." : "Triggering RFQ for remaining 130 sheets to 4 verified suppliers."}
          </p>
        </div>

        {/* Step 4: RFQ Quote Generation */}
        <div className={`p-3 rounded-lg border transition-all duration-300 ${step === 3 ? "border-[var(--sp-accent)] bg-[rgba(var(--sp-accent-rgb),0.06)]" : "border-[var(--color-border-faint)] opacity-60"}`}>
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-[var(--color-text-bright)]">4. Supplier Quotes Compared</span>
            {step > 3 ? <CheckCircle2 size={14} className="text-[var(--sp-accent)]" /> : step === 3 && <Loader2 size={12} className="animate-spin text-[var(--sp-accent)]" />}
          </div>
          <div className="text-xs text-[var(--color-text-body)] mt-1 space-y-1">
            {step < 3 ? "Awaiting supplier responses..." : (
              <>
                <div className="flex justify-between text-[11px] text-[var(--color-text-muted)]">
                  <span>Supplier A: $14.50/sheet (2 days)</span>
                  <span className="text-[var(--sp-accent)] font-bold">Winner: Supplier B ($14.20/sheet)</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Step 5: Finished Loop */}
        <div className={`p-3 rounded-lg border transition-all duration-300 ${step === 4 ? "border-[var(--sp-accent)] bg-[rgba(var(--sp-accent-rgb),0.06)]" : "border-[var(--color-border-faint)] opacity-60"}`}>
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-[var(--color-text-bright)]">5. Auto Dispatch & Notification</span>
            {step === 4 && <CheckCircle2 size={14} className="text-[var(--sp-accent)] animate-bounce" />}
          </div>
          <p className="text-xs text-[var(--color-text-body)] mt-1">
            {step < 4 ? "Awaiting pricing..." : "Complete RFQ pricing pack prepared & broadcasted to Procurement Dashboard."}
          </p>
        </div>
      </div>
    </div>
  );
}

// Interactive Exhibition Lead Capturing Visualizer
function ExhibitionLeadFlowViz() {
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
          <span className="text-xs font-bold tracking-wider text-[var(--color-text-bright)] uppercase">Exhibition Lead Flow simulation</span>
        </div>
        <button onClick={() => setStep(0)} className="text-xs text-[var(--sp-accent)] flex items-center gap-1 hover:underline">
          <RotateCcw size={10} /> Reset
        </button>
      </div>

      <div className="space-y-4">
        {/* Step 1: Scan */}
        <div className={`p-3 rounded-lg border transition-all duration-300 ${step === 0 ? "border-[var(--sp-accent)] bg-[rgba(var(--sp-accent-rgb),0.06)]" : "border-[var(--color-border-faint)] opacity-60"}`}>
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-[var(--color-text-bright)]">1. Badge Scan / QR Trigger</span>
            {step > 0 && <CheckCircle2 size={14} className="text-[var(--sp-accent)]" />}
          </div>
          <p className="text-xs text-[var(--color-text-body)] mt-1">
            OCR scan of business card: "Raunak Kumar, Co-founder at ScalePods, raunak@scalepods.co"
          </p>
        </div>

        {/* Step 2: OCR & Extraction */}
        <div className={`p-3 rounded-lg border transition-all duration-300 ${step === 1 ? "border-[var(--sp-accent)] bg-[rgba(var(--sp-accent-rgb),0.06)]" : "border-[var(--color-border-faint)] opacity-60"}`}>
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-[var(--color-text-bright)]">2. AI Info Extraction</span>
            {step > 1 ? <CheckCircle2 size={14} className="text-[var(--sp-accent)]" /> : step === 1 && <Loader2 size={12} className="animate-spin text-[var(--sp-accent)]" />}
          </div>
          <div className="text-[11px] text-[var(--color-text-muted)] mt-1 grid grid-cols-2 gap-1">
            {step < 1 ? <span>Fills data points...</span> : (
              <>
                <span>Name: Raunak Kumar</span>
                <span>Title: CPO & CTO</span>
                <span>Company: ScalePods</span>
                <span>Email: raunak@scalepods.co</span>
              </>
            )}
          </div>
        </div>

        {/* Step 3: Intent Scoring */}
        <div className={`p-3 rounded-lg border transition-all duration-300 ${step === 2 ? "border-[var(--sp-accent)] bg-[rgba(var(--sp-accent-rgb),0.06)]" : "border-[var(--color-border-faint)] opacity-60"}`}>
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-[var(--color-text-bright)]">3. AI Intent Scoring</span>
            {step > 2 ? <CheckCircle2 size={14} className="text-[var(--sp-accent)]" /> : step === 2 && <Loader2 size={12} className="animate-spin text-[var(--sp-accent)]" />}
          </div>
          <p className="text-xs text-[var(--color-text-body)] mt-1">
            {step < 2 ? "Awaiting OCR sync..." : "Notes: 'Looking to automate supply chain pipeline by next quarter.' Score: 94% HOT LEAD"}
          </p>
        </div>

        {/* Step 4: WhatsApp Follow-up & CRM Sync */}
        <div className={`p-3 rounded-lg border transition-all duration-300 ${step === 3 ? "border-[var(--sp-accent)] bg-[rgba(var(--sp-accent-rgb),0.06)]" : "border-[var(--color-border-faint)] opacity-60"}`}>
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-[var(--color-text-bright)]">4. Same-Day Engagement</span>
            {step === 3 && <CheckCircle2 size={14} className="text-[var(--sp-accent)] animate-bounce" />}
          </div>
          <p className="text-xs text-[var(--color-text-body)] mt-1">
            {step < 3 ? "Waiting for scoring..." : "Sent WhatsApp catalog, synced contact info, and added to HubSpot exhibition pipelines."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ManufacturingWorkflowAutomationPage() {
  const isMobile = useMobile();
  const { resolvedTheme } = useTheme();

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    goal: "All Pods (Full Implementation)",
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
      "Configuring Manufacturing Pod settings...",
      "Analyzing warehouse/sales mapping...",
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
      workflowType: "operations_workflow",
      sourcePage: "/solution/ai-automation-for-manufacturing",
      name: form.name,
      email: form.email,
      phone: form.phone ? `${dialCode} ${form.phone}` : undefined,
      company: form.company,
      message: `Manufacturing Goal: ${form.goal}`,
      website: form.website,
      metadata: {
        goal: form.goal,
        platform: "Manufacturing Workflow Automation Page",
        workflow: "operations_workflow"
      }
    });

    const [, apiResult] = await Promise.all([statusPromise, apiPromise]);
    setLoading(false);

    if (!apiResult.success) {
      setError(apiResult.error || "Submission failed. Please verify connection and try again.");
    } else {
      localStorage.setItem("scalepods_cooldown_manufacturing", Date.now().toString());
      setSubmitted(true);
      const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
      w.dataLayer = w.dataLayer || [];
      const gtmEvent = { event: "lead_form_success", event_id: apiResult.eventId, form_type: "contact_sales", source_page: "/solution/ai-automation-for-manufacturing" };
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
    <BeamsBackground className="manufacturingpod-container" hues={[135, 155]}>
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
                AI-Powered Manufacturing Engine
              </span>
            </div>

            <h1 className="sp-hero-title" style={{ width: "100%", transform: "translateY(-0.5px)" }}>
              <span style={{ color: "var(--sp-accent)" }}>Manufacturing AI Automation</span>{" "}
              <br className="sp-hero-desk-br" />
              for Industrial Leaders & <br className="sp-hero-br" />
              Growing Teams.
            </h1>

            <div className="sp-hero-desc" style={{ marginBottom: isMobile ? "20px" : "24px", textAlign: "center", marginInline: "auto" }}>
              <p style={{ margin: 0 }}>
                Deploy plug-and-play ScalePods workflow pods for sales, inventory operations, HR, and events.
              </p>
              <p style={{ margin: "8px 0 0 0", opacity: 0.85 }}>
                Automate sales outreach, RFQ pricing, candidate screening, and exhibition lead capture from a single platform.
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
                "Autonomous RFQ & Stock Pricing",
                "Multichannel Dealer Outreach",
                "AI Candidate & Operations Screening",
                "Live WMS & CRM Integration"
              ].map((bullet, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <CheckCircle2 size={15} style={{ color: "var(--sp-accent)", flexShrink: 0 }} />
                  <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--color-text-bright)" }}>{bullet}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mt-2 justify-center w-full">
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
            id="deployment-form"
          >
            <div className="sp-form-card">
              {/* Dynamic Inset Shadow for Depth */}
              <div 
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "inherit",
                  boxShadow: "var(--card-shadow-inset)",
                  pointerEvents: "none"
                }} 
              />

              {submitted ? (
                // Rich Success State — matches sales page
                <div id="lead-form-success" style={{ textAlign: "center", padding: "20px 0" }}>
                  <div 
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "50%",
                      background: "rgba(var(--sp-accent-rgb), 0.05)",
                      border: "1px solid var(--sp-accent)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                    }}
                  >
                    <CheckCircle2 style={{ width: "24px", height: "24px", color: "var(--sp-accent)" }} />
                  </div>
                  <h3 
                    style={{ 
                      fontFamily: "var(--font-sans), sans-serif", 
                      fontSize: "18px", 
                      fontWeight: 700, 
                      color: "var(--color-text-bright)", 
                      marginBottom: "12px"
                    }}
                  >
                    Audit Booked Successfully
                  </h3>
                  <p 
                    style={{ 
                      fontFamily: "var(--font-sans), sans-serif", 
                      fontSize: "14px", 
                      color: "var(--color-text-body)", 
                      lineHeight: 1.6,
                      marginBottom: "24px"
                    }}
                  >
                    Your Manufacturing Pod configuration has been pre-registered. An automation engineer will contact you within 24 hours.
                  </p>
                  
                  <div 
                    style={{ 
                      background: "var(--color-bg-card-alt)", 
                      border: "1px solid var(--color-border)", 
                      borderRadius: "10px",
                      padding: "16px",
                      textAlign: "left",
                      boxShadow: "var(--internal-shadow-inset)"
                    }}
                  >
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--sp-accent)", marginBottom: "6px" }}>SELECTED WORKFLOW POD</div>
                    <div style={{ fontSize: "12.5px", color: "var(--color-text-muted)" }}>
                      <strong>Target:</strong> {form.goal}
                    </div>
                  </div>
                </div>
              ) : (
                // Premium Form — matches sales page design
                <form onSubmit={handleSubmit} className="sp-form-row">
                  
                  {/* Card Title Header — matches sales page style */}
                  <div style={{ borderBottom: "1px solid var(--color-border)", paddingBottom: "8px", marginBottom: "0px" }}>
                    <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-text-bright)", margin: 0 }}>
                      Book a Free Workflow Audit
                    </h2>
                    <p style={{ fontSize: "12px", color: "var(--color-text-muted)", marginTop: "4px" }}>
                      Choose your pod below and we&apos;ll map your automation blueprint.
                    </p>
                  </div>

                  {/* Honeypot field */}
                  <div style={{ display: "none", position: "absolute", left: "-9999px", top: "-9999px" }} aria-hidden="true">
                    <input
                      type="text"
                      name="website"
                      value={form.website}
                      onChange={handleInputChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Full Name */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label className="sp-form-label">Full Name *</label>
                    <input 
                      type="text" 
                      name="name" 
                      required 
                      placeholder="e.g. Raunak Kumar" 
                      value={form.name} 
                      onChange={handleInputChange} 
                      className="sp-input-field" 
                    />
                  </div>

                  {/* Company Name */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label className="sp-form-label">Company Name *</label>
                    <input 
                      type="text" 
                      name="company" 
                      required 
                      placeholder="e.g. ScalePods Manufacturing" 
                      value={form.company} 
                      onChange={handleInputChange} 
                      className="sp-input-field" 
                    />
                  </div>

                  {/* Work Email */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label className="sp-form-label">Work Email *</label>
                    <input 
                      type="email" 
                      name="email" 
                      required 
                      placeholder="e.g. raunak@scalepods.co" 
                      value={form.email} 
                      onChange={handleInputChange} 
                      className="sp-input-field" 
                    />
                  </div>

                  {/* Target Workflow Pod Dropdown */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px", position: "relative" }} ref={goalPickerRef}>
                    <label className="sp-form-label">Target Workflow Pod *</label>
                    <button 
                      type="button" 
                      onClick={() => setShowGoalPicker(!showGoalPicker)} 
                      className="sp-dropdown-btn"
                    >
                      <span>{form.goal}</span>
                      <ChevronDown size={14} style={{ opacity: 0.6 }} />
                    </button>

                    <AnimatePresence>
                      {showGoalPicker && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.15, ease: "easeOut" }}
                          style={{
                            position: "absolute",
                            top: "100%",
                            left: 0,
                            right: 0,
                            marginTop: "6px",
                            background: "var(--color-bg-card)",
                            border: "1px solid var(--color-border)",
                            borderRadius: "10px",
                            zIndex: 100,
                            padding: "6px",
                            boxShadow: "var(--shadow-md)",
                            boxSizing: "border-box",
                            backdropFilter: "blur(16px)",
                            WebkitBackdropFilter: "blur(16px)"
                          }}
                        >
                          {manufacturingGoals.map((goal, idx) => (
                            <div
                              key={idx}
                              onClick={() => selectGoal(goal)}
                              style={{
                                padding: "10px 12px",
                                borderRadius: "6px",
                                cursor: "pointer",
                                fontSize: "13px",
                                color: form.goal === goal ? "var(--sp-accent)" : "var(--color-text-body)",
                                background: form.goal === goal ? "rgba(var(--sp-accent-rgb), 0.05)" : "transparent",
                                transition: "background 0.2s"
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(var(--sp-accent-rgb), 0.04)")}
                              onMouseLeave={(e) => (e.currentTarget.style.background = form.goal === goal ? "rgba(var(--sp-accent-rgb), 0.05)" : "transparent")}
                            >
                              {goal}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Phone Number with Country Picker */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label className="sp-form-label">Work Phone / WhatsApp (Optional)</label>
                    <div style={{ display: "flex", gap: "8px", position: "relative" }}>
                      
                      {/* Country Flag Picker */}
                      <div ref={countryPickerRef} style={{ position: "relative" }}>
                        <button
                          type="button"
                          onClick={() => setShowCountryPicker(!showCountryPicker)}
                          className="sp-dropdown-btn"
                          style={{ width: "auto", minWidth: "90px", gap: "6px" }}
                        >
                          <span style={{ fontSize: "15px" }}>
                            {selectedCountryObj.flag}
                          </span>
                          <span style={{ fontSize: "13px" }}>
                            {form.countryCode === "Custom" ? "..." : form.countryCode}
                          </span>
                          <ChevronDown size={12} style={{ opacity: 0.6 }} />
                        </button>

                        <AnimatePresence>
                          {showCountryPicker && (
                            <motion.div
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 6 }}
                              transition={{ duration: 0.15, ease: "easeOut" }}
                              style={{
                                position: "absolute",
                                top: "100%",
                                left: 0,
                                marginTop: "6px",
                                background: "var(--color-bg-card)",
                                border: "1px solid var(--color-border)",
                                borderRadius: "10px",
                                width: "180px",
                                maxHeight: "180px",
                                overflowY: "auto",
                                zIndex: 100,
                                padding: "6px",
                                boxShadow: "var(--shadow-md)",
                                backdropFilter: "blur(16px)",
                                WebkitBackdropFilter: "blur(16px)"
                              }}
                            >
                              {countries.map((c, idx) => (
                                <div
                                  key={idx}
                                  onClick={() => selectCountry(c.code)}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    padding: "8px 10px",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    background: form.countryCode === c.code ? "rgba(var(--sp-accent-rgb), 0.05)" : "transparent"
                                  }}
                                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(var(--sp-accent-rgb), 0.04)")}
                                  onMouseLeave={(e) => (e.currentTarget.style.background = form.countryCode === c.code ? "rgba(var(--sp-accent-rgb), 0.05)" : "transparent")}
                                >
                                  <span style={{ fontSize: "16px" }}>{c.flag}</span>
                                  <span style={{ fontSize: "12px", color: "var(--color-text-bright)" }}>{c.name}</span>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {form.countryCode === "Custom" && (
                        <input
                          name="customCode"
                          value={form.customCode}
                          onChange={handleInputChange}
                          placeholder="+1"
                          style={{ width: "70px" }}
                          className="sp-input-field"
                          required
                        />
                      )}

                      <input 
                        type="tel" 
                        name="phone" 
                        placeholder="Phone number" 
                        value={form.phone} 
                        onChange={handleInputChange} 
                        className="sp-input-field"
                        style={{ flex: 1 }}
                      />
                    </div>
                  </div>

                  {/* Error Message — branded style */}
                  {error && (
                    <div 
                      style={{
                        fontFamily: "var(--font-sans), sans-serif",
                        fontSize: "12px",
                        color: "var(--color-error)",
                        padding: "8px 12px",
                        background: "rgba(var(--color-error-rgb), 0.05)",
                        border: "1px solid rgba(var(--color-error-rgb), 0.2)",
                        borderRadius: "8px",
                        marginTop: "4px"
                      }}
                    >
                      {error}
                    </div>
                  )}

                  {/* Loading Telemetry Status */}
                  {loading && (
                    <div 
                      style={{ 
                        fontSize: "11.5px", 
                        color: "var(--color-text-muted)", 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "6px",
                        marginTop: "2px" 
                      }}
                    >
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--sp-accent)] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--sp-accent)]"></span>
                      </span>
                      <span>{loadingStatus}</span>
                    </div>
                  )}

                  {/* Premium Submit Button — motion.button like sales page */}
                  <div style={{ position: "relative", marginTop: "4px" }}>
                    <motion.button
                      whileHover={{ y: -2, scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      type="submit"
                      disabled={loading}
                      className="sp-submit-btn"
                      style={{
                        cursor: loading ? "not-allowed" : "pointer",
                        opacity: loading ? 0.75 : 1,
                      }}
                    >
                      {loading ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : null}
                      <span>
                        {loading ? "Configuring pod..." : "Book Free Audit"}
                      </span>
                    </motion.button>
                    <p style={{ fontSize: "11px", color: "var(--color-text-muted)", textAlign: "center", marginTop: "8px", marginBottom: 0 }}>
                      Your data is secure. No spam. Ever.
                    </p>
                  </div>

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

      {/* Fold 2: Trust Signals Section */}
      <section className="sp-section-wrapper">
        <div className="sp-section-title-wrap">
          <div className="sp-section-eyebrow">The New Architecture of Manufacturing Operations</div>
          <h2 className="sp-section-heading">Built for High-Growth <span style={{ color: "var(--sp-accent)" }}>Manufacturing Teams</span></h2>
          <p className="sp-section-subheading">
            As supply chains go digital, manufacturing leaders are building competitive advantage through 
            AI automation today — from sales pipelines and operations audits to HR workflows and exhibition pipeline generation.
          </p>
        </div>

        <div className="sp-telemetry-grid">
          {/* Card 1 */}
          <div className="sp-telemetry-card">
            <div className="sp-telemetry-icon-box">
              <TrendingUp size={20} />
            </div>
            <div className="sp-telemetry-stat">$3.2B</div>
            <div className="sp-telemetry-label">Market Growth</div>
            <p className="sp-telemetry-desc">AI-driven manufacturing technology deployment growth projected annually.</p>
          </div>

          {/* Card 2 */}
          <div className="sp-telemetry-card">
            <div className="sp-telemetry-icon-box">
              <Building size={20} />
            </div>
            <div className="sp-telemetry-stat">82%</div>
            <div className="sp-telemetry-label">Industry Adoption</div>
            <p className="sp-telemetry-desc">Of leading firms automations across core procurement, supply and sales lines.</p>
          </div>

          {/* Card 3 */}
          <div className="sp-telemetry-card">
            <div className="sp-telemetry-icon-box">
              <Target size={20} />
            </div>
            <div className="sp-telemetry-stat">5.1×</div>
            <div className="sp-telemetry-label">Lead Conversion</div>
            <p className="sp-telemetry-desc">Increase in booked customer qualification through instant event processing.</p>
          </div>

          {/* Card 4 */}
          <div className="sp-telemetry-card">
            <div className="sp-telemetry-icon-box">
              <Zap size={20} />
            </div>
            <div className="sp-telemetry-stat">60%</div>
            <div className="sp-telemetry-label">Sales Velocity</div>
            <p className="sp-telemetry-desc">Increase in transaction closure speeds with omnichannel follow-up systems.</p>
          </div>
        </div>
      </section>

      {/* Fold 3: Pilot Outcomes Table */}
      <section className="sp-section-wrapper border-t border-[var(--color-border-faint)]">
        <div className="sp-section-title-wrap">
          <div className="sp-section-eyebrow">Measurable Pilot Outcomes</div>
          <h2 className="sp-section-heading">Impact Across Every <span style={{ color: "var(--sp-accent)" }}>Manufacturing Function</span></h2>
          <p className="sp-section-subheading">
            ScalePods combines Agentic AI with managed execution to drive fast, auditable results 
            for manufacturing leaders worldwide. Within 30 days, we move operations from bottlenecks to high-velocity.
          </p>
        </div>

        <div className="sp-table-wrapper">
          <table className="sp-impact-table">
            <thead>
              <tr>
                <th>Metric</th>
                <th>Typical Result</th>
                <th>Growth Driver</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="sp-table-metric">Sales Velocity</td>
                <td className="sp-table-result">3× More Pre-Booked Meetings</td>
                <td>Automated multi-channel outreach & instant scheduling.</td>
              </tr>
              <tr>
                <td className="sp-table-metric">Supply Chain Speed</td>
                <td className="sp-table-result">45s RFQ Response Time</td>
                <td>Instant inventory matching & automated RFQ pricing.</td>
              </tr>
              <tr>
                <td className="sp-table-metric">Event Conversion</td>
                <td className="sp-table-result">40+ Warm Leads</td>
                <td>Real-time on-site qualification & same-day follow-up.</td>
              </tr>
              <tr>
                <td className="sp-table-metric">Ops Efficiency</td>
                <td className="sp-table-result">80% Less Manual Coordination</td>
                <td>AI-driven coordination of orders and dealer updates.</td>
              </tr>
              <tr>
                <td className="sp-table-metric">Data Integrity</td>
                <td className="sp-table-result">Near-100% Accuracy</td>
                <td>Seamless real-time auto-sync across CRM and WhatsApp.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="text-center">
          <a href="#audit-form-section" className="sp-stats-cta-btn">
            Discover the Impact for Your Manufacturing Business <ArrowRight size={14} />
          </a>
        </div>
      </section>

      {/* Fold 4: Pods Overview Section */}
      <section className="sp-section-wrapper border-t border-[var(--color-border-faint)]">
        <div className="sp-section-title-wrap">
          <div className="sp-section-eyebrow">Pods Overview</div>
          <h2 className="sp-section-heading">Three Pods. Zero Friction. <span style={{ color: "var(--sp-accent)" }}>Total Growth.</span></h2>
          <p className="sp-section-subheading">
            AI automation built for manufacturing sales, operations, HR, and events — each pod deploys in under 30 days.
          </p>
        </div>

        <div className="sp-pods-overview-grid">
          {/* Card 1 */}
          <div className="sp-pod-overview-card">
            <div className="relative w-full h-44 mb-5 rounded-xl overflow-hidden border border-[var(--color-border-faint)] bg-white/50 dark:bg-black/20">
              <Image src="/images/warehouse.svg" alt="Warehousing Pod Interface" fill className="object-contain p-4" />
              <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full border border-[var(--sp-accent)]/40 text-[10px] font-bold text-[var(--sp-accent)] uppercase tracking-wider">
                Warehousing Pod
              </div>
            </div>
            <h3 className="sp-pod-card-title">Warehousing Pod</h3>
            <div className="sp-pod-card-subtitle">Quote Instantly. Response time under 60s.</div>
            <div className="sp-pod-card-list">
              <div className="sp-pod-card-item">
                <Check size={16} className="sp-pod-card-icon" />
                <span><strong>Live Inventory Lookup:</strong> Centralized real-time visibility across grades & dimensions.</span>
              </div>
              <div className="sp-pod-card-item">
                <Check size={16} className="sp-pod-card-icon" />
                <span><strong>Automated RFQ Pricing:</strong> Instant pricing quotes and sourcing triggers.</span>
              </div>
              <div className="sp-pod-card-item">
                <Check size={16} className="sp-pod-card-icon" />
                <span><strong>Dealer Network Alerts:</strong> Automatic broadcast alerts on low stock levels.</span>
              </div>
            </div>
            <button onClick={handleDownloadClick} className="sp-feature-dl-btn">
              <Download size={14} /> Download Feature Guide
            </button>
          </div>

          {/* Card 2 */}
          <div className="sp-pod-overview-card">
            <div className="relative w-full h-44 mb-5 rounded-xl overflow-hidden border border-[var(--color-border-faint)] bg-white/50 dark:bg-black/20">
              <Image src="/images/Sales.svg" alt="Sales Pod Interface" fill className="object-contain p-4" />
              <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full border border-[var(--sp-accent)]/40 text-[10px] font-bold text-[var(--sp-accent)] uppercase tracking-wider">
                Sales Pod
              </div>
            </div>
            <h3 className="sp-pod-card-title">Sales Pod</h3>
            <div className="sp-pod-card-subtitle">Hunt Automatically. Only close warm leads.</div>
            <div className="sp-pod-card-list">
              <div className="sp-pod-card-item">
                <Check size={16} className="sp-pod-card-icon" />
                <span><strong>Multi-Channel Prospecting:</strong> Unified Email, LinkedIn and WhatsApp pipelines.</span>
              </div>
              <div className="sp-pod-card-item">
                <Check size={16} className="sp-pod-card-icon" />
                <span><strong>Smart Lead Scoring:</strong> Categorize intent based on keywords and interest.</span>
              </div>
              <div className="sp-pod-card-item">
                <Check size={16} className="sp-pod-card-icon" />
                <span><strong>Precision Follow-Ups:</strong> Auto-triggers structured campaigns based on stage.</span>
              </div>
            </div>
            <button onClick={handleDownloadClick} className="sp-feature-dl-btn">
              <Download size={14} /> Download Feature Guide
            </button>
          </div>

          {/* Card 3 */}
          <div className="sp-pod-overview-card">
            <div className="relative w-full h-44 mb-5 rounded-xl overflow-hidden border border-[var(--color-border-faint)] bg-white/50 dark:bg-black/20">
              <Image src="/images/Exhibition.svg" alt="Exhibition Pod Interface" fill className="object-contain p-4" />
              <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full border border-[var(--sp-accent)]/40 text-[10px] font-bold text-[var(--sp-accent)] uppercase tracking-wider">
                Exhibition Pod
              </div>
            </div>
            <h3 className="sp-pod-card-title">Exhibition Pod</h3>
            <div className="sp-pod-card-subtitle">Capture Every Lead. Instantly qualified.</div>
            <div className="sp-pod-card-list">
              <div className="sp-pod-card-item">
                <Check size={16} className="sp-pod-card-icon" />
                <span><strong>Instant WhatsApp Capture:</strong> Centralize card scanning and QR qualifiers.</span>
              </div>
              <div className="sp-pod-card-item">
                <Check size={16} className="sp-pod-card-icon" />
                <span><strong>Real-Time AI Qualification:</strong> Instant sentiment and intent routing.</span>
              </div>
              <div className="sp-pod-card-item">
                <Check size={16} className="sp-pod-card-icon" />
                <span><strong>Instant CRM Sync:</strong> Connect event pipelines to HubSpot before leaving venue.</span>
              </div>
            </div>
            <button onClick={handleDownloadClick} className="sp-feature-dl-btn">
              <Download size={14} /> Download Feature Guide
            </button>
          </div>
        </div>
      </section>

      {/* Fold 5: Warehousing Pod (Deep-Dive) */}
      <section className="sp-section-wrapper border-t border-[var(--color-border-faint)]">
        <div className="sp-deep-dive-row">
          <div className="flex justify-center w-full">
            <FloatingPreviewCarouselWrapper items={opsCarouselImages} autoRotate={true} />
          </div>

          <div className="flex flex-col">
            <div className="sp-section-eyebrow">Warehousing Pod</div>
            <h2 className="sp-section-heading">Automate Inventory Management, RFQ Responses, and <span style={{ color: "var(--sp-accent)" }}>Stock Alerts</span></h2>
            <p className="sp-section-subheading">
              Establish a central dashboard connecting inventory updates, automated procurement requests, 
              and dealer notifications. Keep production lines running continuously.
            </p>

            <div className="sp-capability-block">
              <div className="sp-cap-item">
                <div className="sp-cap-num-box">01</div>
                <div className="sp-cap-text">
                  <span className="sp-cap-title">Real-Time Stock Response</span>
                  <span className="sp-cap-desc">Centralize and manage inventory with total visibility on grades and stock levels.</span>
                </div>
              </div>

              <div className="sp-cap-item">
                <div className="sp-cap-num-box">02</div>
                <div className="sp-cap-text">
                  <span className="sp-cap-title">Automated Pricing RFQs</span>
                  <span className="sp-cap-desc">Automatically generate and dispatch RFQ requests to suppliers when stock hits limits.</span>
                </div>
              </div>

              <div className="sp-cap-item">
                <div className="sp-cap-num-box">03</div>
                <div className="sp-cap-text">
                  <span className="sp-cap-title">Smart Low Stock Escalation</span>
                  <span className="sp-cap-desc">Receive real-time alerts the moment inventory reaches critical thresholds.</span>
                </div>
              </div>

              <div className="sp-cap-item">
                <div className="sp-cap-num-box">04</div>
                <div className="sp-cap-text">
                  <span className="sp-cap-title">Dealer Network Broadcasts</span>
                  <span className="sp-cap-desc">Broadcast inventory status updates automatically to your distributor networks.</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <a href="#audit-form-section" className="sp-stats-cta-btn">
                See the Warehousing Pod in Action — Book a Free Audit
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Fold 6: Sales Automation (Deep-Dive) */}
      <section className="sp-section-wrapper border-t border-[var(--color-border-faint)]">
        <div className="sp-deep-dive-row reversed">
          <div className="flex flex-col">
            <div className="sp-section-eyebrow">Sales Outreach Pod</div>
            <h2 className="sp-section-heading">Accelerate Your Pipeline with <span style={{ color: "var(--sp-accent)" }}>AI Prospecting</span></h2>
            <p className="sp-section-subheading">
              Our autonomous Sales Pod scrapes databases, scores accounts, runs outreach loops across multi-channel campaigns, 
              and coordinates human handover on interest.
            </p>

            <div className="sp-capability-block">
              <div className="sp-cap-item">
                <div className="sp-cap-num-box">01</div>
                <div className="sp-cap-text">
                  <span className="sp-cap-title">Precision Lead Discovery</span>
                  <span className="sp-cap-desc">Define your Ideal Customer Profile (ICP) and let the pod scrape verified accounts.</span>
                </div>
              </div>

              <div className="sp-cap-item">
                <div className="sp-cap-num-box">02</div>
                <div className="sp-cap-text">
                  <span className="sp-cap-title">Omnichannel AI Outreach</span>
                  <span className="sp-cap-desc">Engage accounts across Email, LinkedIn, WhatsApp and Voice matching your brand tone.</span>
                </div>
              </div>

              <div className="sp-cap-item">
                <div className="sp-cap-num-box">03</div>
                <div className="sp-cap-text">
                  <span className="sp-cap-title">Intent-Driven Nurturing</span>
                  <span className="sp-cap-desc">Trigger strategic follow-ups based on real conversation progress with instant human handoff.</span>
                </div>
              </div>

              <div className="sp-cap-item">
                <div className="sp-cap-num-box">04</div>
                <div className="sp-cap-text">
                  <span className="sp-cap-title">Sentiment Lead Scoring</span>
                  <span className="sp-cap-desc">Analyze messages and scoring data points to rank buyer interest inside your CRM.</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <a href="#audit-form-section" className="sp-stats-cta-btn">
                Automate Your Sales Pipeline — Book a Free Audit
              </a>
            </div>
          </div>

          <div className="flex justify-center w-full">
            <FloatingPreviewCarouselWrapper items={salesCarouselImages} autoRotate={true} />
          </div>
        </div>
      </section>

      {/* Fold 7: Exhibition Automation (Deep-Dive) */}
      <section className="sp-section-wrapper border-t border-[var(--color-border-faint)]">
        <div className="sp-deep-dive-row">
          <div className="flex justify-center w-full">
            <FloatingPreviewCarouselWrapper items={exhibitionCarouselImages} autoRotate={true} />
          </div>

          <div className="flex flex-col">
            <div className="sp-section-eyebrow">Exhibition & Event Pod</div>
            <h2 className="sp-section-heading">Turn Every Handshake into an <span style={{ color: "var(--sp-accent)" }}>Active Opportunity</span></h2>
            <p className="sp-section-subheading">
              Automate high-intent collection at exhibitions. Extract data instantly from business cards 
              or QR badges and route leads to follow-up campaigns before leaving your booth.
            </p>

            <div className="sp-capability-block">
              <div className="sp-cap-item">
                <div className="sp-cap-num-box">01</div>
                <div className="sp-cap-text">
                  <span className="sp-cap-title">Instant Lead Capture</span>
                  <span className="sp-cap-desc">Capture info through business card OCR or QR badge scan into a centralized flow.</span>
                </div>
              </div>

              <div className="sp-cap-item">
                <div className="sp-cap-num-box">02</div>
                <div className="sp-cap-text">
                  <span className="sp-cap-title">On-Site AI Qualification</span>
                  <span className="sp-cap-desc">AI analyzes buyer signals, scores intent levels and alerts active sales teams.</span>
                </div>
              </div>

              <div className="sp-cap-item">
                <div className="sp-cap-num-box">03</div>
                <div className="sp-cap-text">
                  <span className="sp-cap-title">Same-Day Personalized Follow-Up</span>
                  <span className="sp-cap-desc">Trigger WhatsApp/Email follow-up containing relevant datasheets within hours of meeting.</span>
                </div>
              </div>

              <div className="sp-cap-item">
                <div className="sp-cap-num-box">04</div>
                <div className="sp-cap-text">
                  <span className="sp-cap-title">Real-Time CRM Synchronization</span>
                  <span className="sp-cap-desc">Ensure complete sync to CRM systems instantly without manual data entry.</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <a href="#audit-form-section" className="sp-stats-cta-btn">
                Turn Your Next Exhibition into Pipeline — Book a Free Audit
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="sp-section-wrapper border-t border-[var(--color-border-faint)]">
        <div className="sp-section-title-wrap">
          <div className="sp-section-eyebrow">Client Success</div>
          <h2 className="sp-section-heading">Trusted by Operations Leaders</h2>
        </div>
        <TestimonialCarousel />
      </section>



      {/* Fold 8: Why Choose ScalePods (Advantage) */}
      <section className="sp-section-wrapper border-t border-[var(--color-border-faint)]">
        <div className="sp-section-title-wrap">
          <div className="sp-section-eyebrow">The ScalePods Advantage</div>
          <h2 className="sp-section-heading">Enterprise Efficiency. Startup Speed. <span style={{ color: "var(--sp-accent)" }}>Built for Manufacturing.</span></h2>
        </div>

        <div className="sp-advantage-grid">
          <div className="sp-advantage-card">
            <h4 className="sp-advantage-title">
              <CheckCircle2 size={16} className="text-[var(--sp-accent)]" />
              End-to-End Automation
            </h4>
            <p className="sp-advantage-desc">
              Sales, hiring, support, and warehousing workflows unified in one platform. Eliminate fragmented tool stacks.
            </p>
          </div>

          <div className="sp-advantage-card">
            <h4 className="sp-advantage-title">
              <CheckCircle2 size={16} className="text-[var(--sp-accent)]" />
              Custom-Built Operations
            </h4>
            <p className="sp-advantage-desc">
              We map your actual processes — sourcing, RFQs, dispatch, and plant hiring — building workflows around your operation.
            </p>
          </div>

          <div className="sp-advantage-card">
            <h4 className="sp-advantage-title">
              <CheckCircle2 size={16} className="text-[var(--sp-accent)]" />
              30-Day Go-Live Guarantee
            </h4>
            <p className="sp-advantage-desc">
              Pilot workflows are designed, wired, and deployed live in under 30 days. High velocity execution.
            </p>
          </div>

          <div className="sp-advantage-card">
            <h4 className="sp-advantage-title">
              <CheckCircle2 size={16} className="text-[var(--sp-accent)]" />
              Human + AI Precision
            </h4>
            <p className="sp-advantage-desc">
              ScalePods SDRs and operators work alongside AI agents, ensuring 100% accuracy and customized personalization.
            </p>
          </div>

          <div className="sp-advantage-card">
            <h4 className="sp-advantage-title">
              <CheckCircle2 size={16} className="text-[var(--sp-accent)]" />
              No Lock-In Flexibility
            </h4>
            <p className="sp-advantage-desc">
              Start with modular pods and expand as you scale. No forced long-term lock-in contracts.
            </p>
          </div>
        </div>
      </section>

      {/* Fold 9: Frequently Asked Questions Accordion */}
      <section className="sp-section-wrapper border-t border-[var(--color-border-faint)]">
        <div className="sp-section-title-wrap">
          <div className="sp-section-eyebrow">FAQ</div>
          <h2 className="sp-section-heading">Frequently Asked Questions</h2>
        </div>

        <div className="sp-faq-list">
          {/* FAQ 1 */}
          <div className="sp-faq-item">
            <button 
              onClick={() => setExpandedFaq(expandedFaq === 0 ? null : 0)} 
              className="sp-faq-trigger"
            >
              <span className="sp-faq-question">What are the top AI use cases in manufacturing?</span>
              {expandedFaq === 0 ? <ChevronUp size={16} className="sp-faq-icon" /> : <ChevronDown size={16} className="sp-faq-icon" />}
            </button>
            <AnimatePresence>
              {expandedFaq === 0 && (
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  className="sp-faq-content"
                >
                  <p className="sp-faq-answer">
                    The top use cases include sales pipeline automation, automated document verification (checking purchase orders/invoices), 
                    HR recruitment for manufacturing plant staff, real-time stock monitoring, and exhibition lead capture pipeline creation.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* FAQ 2 */}
          <div className="sp-faq-item">
            <button 
              onClick={() => setExpandedFaq(expandedFaq === 1 ? null : 1)} 
              className="sp-faq-trigger"
            >
              <span className="sp-faq-question">How does AI improve manufacturing quality control?</span>
              {expandedFaq === 1 ? <ChevronUp size={16} className="sp-faq-icon" /> : <ChevronDown size={16} className="sp-faq-icon" />}
            </button>
            <AnimatePresence>
              {expandedFaq === 1 && (
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  className="sp-faq-content"
                >
                  <p className="sp-faq-answer">
                    AI automates quality verification by scanning specification parameters, material grades, dimensions, batch references, 
                    and certificates against original customer requirements, flagging variances instantly.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* FAQ 3 */}
          <div className="sp-faq-item">
            <button 
              onClick={() => setExpandedFaq(expandedFaq === 2 ? null : 2)} 
              className="sp-faq-trigger"
            >
              <span className="sp-faq-question">What is agentic AI in manufacturing?</span>
              {expandedFaq === 2 ? <ChevronUp size={16} className="sp-faq-icon" /> : <ChevronDown size={16} className="sp-faq-icon" />}
            </button>
            <AnimatePresence>
              {expandedFaq === 2 && (
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  className="sp-faq-content"
                >
                  <p className="sp-faq-answer">
                    Agentic AI shifts from static reactive scripts to goal-oriented agents. In manufacturing, an agentic system doesn't 
                    just log stock values; it actively detects low inventories, checks prices, gathers supplier quotes, and prepares recommendations.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* FAQ 4 */}
          <div className="sp-faq-item">
            <button 
              onClick={() => setExpandedFaq(expandedFaq === 3 ? null : 3)} 
              className="sp-faq-trigger"
            >
              <span className="sp-faq-question">How do I integrate AI with legacy manufacturing systems?</span>
              {expandedFaq === 3 ? <ChevronUp size={16} className="sp-faq-icon" /> : <ChevronDown size={16} className="sp-faq-icon" />}
            </button>
            <AnimatePresence>
              {expandedFaq === 3 && (
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  className="sp-faq-content"
                >
                  <p className="sp-faq-answer">
                    ScalePods layers on top of your existing ERPs and WMS systems using standard secure APIs or real-time sync systems. 
                    There is no need to rip-and-replace legacy databases.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* FAQ 5 */}
          <div className="sp-faq-item">
            <button 
              onClick={() => setExpandedFaq(expandedFaq === 4 ? null : 4)} 
              className="sp-faq-trigger"
            >
              <span className="sp-faq-question">What is the role of AI in manufacturing automation?</span>
              {expandedFaq === 4 ? <ChevronUp size={16} className="sp-faq-icon" /> : <ChevronDown size={16} className="sp-faq-icon" />}
            </button>
            <AnimatePresence>
              {expandedFaq === 4 && (
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  className="sp-faq-content"
                >
                  <p className="sp-faq-answer">
                    AI operates as a continuous orchestrator across sales pipelines, operations auditing, recruitment pipelines, 
                    and inventory systems, driving growth without adding manual operational complexity.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Fold 10: Final CTA - Bottom of Page & Datasheet */}
      <section id="audit-form-section" className="sp-section-wrapper border-t border-[var(--color-border-faint)]">
        <div className="sp-final-card">
          <h2 className="sp-section-heading">Ready to Scale Your Manufacturing Business <span style={{ color: "var(--sp-accent)" }}>with AI?</span></h2>
          <p className="sp-section-subheading max-w-[700px] mx-auto text-center" style={{ textAlign: "center" }}>
            Book a free 30-minute workflow audit and see exactly which processes ScalePods can automate for your manufacturing 
            business with a custom impact projection.
          </p>

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
        sourceType="Manufacturing Feature Guide"
        sourceName="Manufacturing Landing Page"
      />

      <AuditModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        title="Schedule Your Manufacturing Audit"
        sourceName="Manufacturing Landing Page"
      />
    </BeamsBackground>
  );
}
