"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  Loader2, 
  CheckCircle2, 
  ArrowUpRight,
  Play,
  Cpu,
  Layers,
  Globe,
  RefreshCw,
  Sliders,
  Database,
  Inbox
} from "lucide-react";
import { submitLead } from "@/lib/leadService";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useMobile } from "@/lib/hooks";
import { BeamsBackground } from "@/components/ui/beams-background";
import "./salespod.css";

// ── Country codes list (Alphabetical) ──────────────────────────────────────
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

const outboundGoals = [
  "Fully Autonomous Pipeline",
  "LinkedIn Automation Pod",
  "Outbound Cold Email Engine",
  "Hyper-Intent Data Scraping",
];

// Motion Variants (Framer Motion)
const fadeUp = (delay = 0, isMobile = false) => ({
  initial: { opacity: 0, y: isMobile ? 12 : 20, filter: isMobile ? "blur(1px)" : "blur(4px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
});

// ── Connected Enterprise Infrastructure Ecosystem Visualizer ─────────────────
function EcosystemViz() {
  return (
    <div 
      className="sp-form-card"
      style={{
        width: "100%",
        maxWidth: "680px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px",
        overflow: "hidden",
        position: "relative"
      }}
    >
      <div 
        style={{ 
          position: "absolute", 
          inset: 0, 
          opacity: 0.015, 
          backgroundImage: "radial-gradient(var(--sp-accent) 1px, transparent 1px)", 
          backgroundSize: "20px 20px" 
        }} 
      />
      <svg 
        viewBox="0 0 600 400" 
        className="w-full h-auto"
        style={{ display: "block" }}
      >
        <defs>
          <radialGradient id="hub-glow-eco" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--sp-accent)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="var(--sp-accent)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer orbital boundary lines */}
        <circle cx="300" cy="200" r="160" fill="none" stroke="var(--color-border-faint)" strokeWidth="1" strokeDasharray="6 8" />
        <circle cx="300" cy="200" r="110" fill="none" stroke="var(--color-border-faint)" strokeWidth="1" strokeDasharray="4 6" />

        {/* Central Hub glowing halo */}
        <circle cx="300" cy="200" r="70" fill="url(#hub-glow-eco)" />
        <motion.circle 
          cx="300" 
          cy="200" 
          r="48" 
          fill="none" 
          stroke="rgba(var(--sp-accent-rgb), 0.15)" 
          strokeWidth="1.5"
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Central Node: SalesPod Core */}
        <circle cx="300" cy="200" r="32" fill="var(--color-bg-card)" stroke="var(--sp-accent)" strokeWidth="2" />
        <text x="300" y="204" textAnchor="middle" fill="var(--sp-accent)" fontSize="10px" fontWeight="700" letterSpacing="0.05em">POD CORE</text>

        {/* Orbit Connection lines */}
        <line x1="300" y1="200" x2="160" y2="100" stroke="var(--color-border-faint)" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="300" y1="200" x2="440" y2="100" stroke="var(--color-border-faint)" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="300" y1="200" x2="160" y2="300" stroke="var(--color-border-faint)" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="300" y1="200" x2="440" y2="300" stroke="var(--color-border-faint)" strokeWidth="1.5" strokeDasharray="4 4" />

        {/* Node 1: CRM */}
        <circle cx="160" cy="100" r="28" fill="var(--color-bg-card)" stroke="var(--color-border)" strokeWidth="1.5" />
        <text x="160" y="104" textAnchor="middle" fill="var(--color-text-bright)" fontSize="9px" fontWeight="600">ENTERPRISE CRM</text>

        {/* Node 2: Communication */}
        <circle cx="440" cy="100" r="28" fill="var(--color-bg-card)" stroke="var(--color-border)" strokeWidth="1.5" />
        <text x="440" y="104" textAnchor="middle" fill="var(--color-text-bright)" fontSize="9px" fontWeight="600">ALERTS & CHAT</text>

        {/* Node 3: Outreach Channels */}
        <circle cx="160" cy="300" r="28" fill="var(--color-bg-card)" stroke="var(--color-border)" strokeWidth="1.5" />
        <text x="160" y="304" textAnchor="middle" fill="var(--color-text-bright)" fontSize="9px" fontWeight="600">MAIL & LINKEDIN</text>

        {/* Node 4: Warehouses */}
        <circle cx="440" cy="300" r="28" fill="var(--color-bg-card)" stroke="var(--color-border)" strokeWidth="1.5" />
        <text x="440" y="304" textAnchor="middle" fill="var(--color-text-bright)" fontSize="9px" fontWeight="600">DATA WHSE</text>

        {/* Interactive connection pulses */}
        <motion.circle 
          cx="300" 
          cy="200" 
          r="4" 
          fill="var(--sp-accent)"
          animate={{ cx: [300, 160], cy: [200, 100], opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 0.5 }}
        />
        <motion.circle 
          cx="300" 
          cy="200" 
          r="4" 
          fill="var(--sp-accent)"
          animate={{ cx: [300, 440], cy: [200, 100], opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1.2 }}
        />
        <motion.circle 
          cx="300" 
          cy="200" 
          r="4" 
          fill="var(--sp-accent)"
          animate={{ cx: [300, 160], cy: [200, 300], opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1.8 }}
        />
        <motion.circle 
          cx="300" 
          cy="200" 
          r="4" 
          fill="var(--sp-accent)"
          animate={{ cx: [300, 440], cy: [200, 300], opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 2.4 }}
        />
      </svg>
    </div>
  );
}

// ── Live Pipeline Infrastructure Visualizer ─────────────────────────────────
function PipelineViz() {
  // Bezier curve coordinates for node connection lines
  const p1 = "M 150 72 C 175 72, 165 190, 180 190";
  const p2 = "M 150 308 C 175 308, 165 190, 180 190";
  const p3 = "M 340 190 C 355 190, 345 72, 370 72";
  const p4 = "M 340 190 C 355 190, 345 308, 370 308";

  return (
    <div 
      className="sp-form-card"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        overflow: "hidden"
      }}
    >
      <div 
        style={{ 
          position: "absolute", 
          inset: 0, 
          opacity: 0.02, 
          backgroundImage: "radial-gradient(var(--sp-accent) 1px, transparent 1px)", 
          backgroundSize: "24px 24px" 
        }} 
      />
      <svg 
        viewBox="0 0 520 380" 
        className="w-full h-auto"
        style={{ display: "block" }}
      >
        <defs>
          <radialGradient id="hub-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--sp-accent)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--sp-accent)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Glow behind Central Hub */}
        <circle cx="260" cy="190" r="100" fill="url(#hub-glow)" />

        {/* Connection Curves */}
        <path d={p1} fill="none" stroke="var(--color-border)" strokeWidth="1.5" strokeOpacity="0.25" />
        <path d={p2} fill="none" stroke="var(--color-border)" strokeWidth="1.5" strokeOpacity="0.25" />
        <path d={p3} fill="none" stroke="var(--color-border)" strokeWidth="1.5" strokeOpacity="0.25" />
        <path d={p4} fill="none" stroke="var(--color-border)" strokeWidth="1.5" strokeOpacity="0.25" />

        {/* Animated Data Packets (Dashed Energy Flows) */}
        <motion.path 
          d={p1} 
          fill="none" 
          stroke="var(--sp-accent)" 
          strokeWidth="1.5" 
          strokeDasharray="4 6"
          animate={{ strokeDashoffset: [20, 0] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "linear"
          }}
          strokeOpacity="0.6"
        />
        <motion.path 
          d={p2} 
          fill="none" 
          stroke="var(--sp-accent)" 
          strokeWidth="1.5" 
          strokeDasharray="4 6"
          animate={{ strokeDashoffset: [20, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
            delay: 0.5
          }}
          strokeOpacity="0.6"
        />
        <motion.path 
          d={p3} 
          fill="none" 
          stroke="var(--sp-accent)" 
          strokeWidth="1.5" 
          strokeDasharray="4 6"
          animate={{ strokeDashoffset: [20, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
            delay: 0.3
          }}
          strokeOpacity="0.6"
        />
        <motion.path 
          d={p4} 
          fill="none" 
          stroke="var(--sp-accent)" 
          strokeWidth="1.5" 
          strokeDasharray="4 6"
          animate={{ strokeDashoffset: [20, 0] }}
          transition={{
            duration: 1.7,
            repeat: Infinity,
            ease: "linear",
            delay: 0.8
          }}
          strokeOpacity="0.6"
        />

        {/* INPUT NODE 1 */}
        <g transform="translate(20, 40)">
          <rect width="130" height="64" rx="8" ry="8" fill="var(--color-bg-card)" stroke="var(--color-border)" strokeWidth="1" />
          <text x="12" y="20" fill="var(--color-text-muted)" fontSize="9" fontWeight="700" letterSpacing="0.05em">DATA SIGNAL</text>
          <text x="12" y="38" fill="var(--color-text-bright)" fontSize="12" fontWeight="500">Account Intent</text>
          <circle cx="16" cy="50" r="2.5" fill="var(--color-green)" />
          <text x="24" y="53" fill="var(--color-text-faint)" fontSize="9">Active Scan</text>
        </g>

        {/* INPUT NODE 2 */}
        <g transform="translate(20, 276)">
          <rect width="130" height="64" rx="8" ry="8" fill="var(--color-bg-card)" stroke="var(--color-border)" strokeWidth="1" />
          <text x="12" y="20" fill="var(--color-text-muted)" fontSize="9" fontWeight="700" letterSpacing="0.05em">SCRAPER BOT</text>
          <text x="12" y="38" fill="var(--color-text-bright)" fontSize="12" fontWeight="500">Profile Scraper</text>
          <circle cx="16" cy="50" r="2.5" fill="var(--color-green)" />
          <text x="24" y="53" fill="var(--color-text-faint)" fontSize="9">Synchronized</text>
        </g>

        {/* CENTRAL HUB NODE */}
        <g transform="translate(180, 150)">
          <rect width="160" height="80" rx="10" ry="10" fill="var(--color-bg-card-alt)" stroke="var(--sp-accent)" strokeWidth="1.5" style={{ filter: "drop-shadow(0 0 10px rgba(var(--sp-accent-rgb), 0.08))" }} />
          <text x="80" y="24" textAnchor="middle" fill="var(--sp-accent)" fontSize="9" fontWeight="700" letterSpacing="0.1em">CORE PIPELINE</text>
          <text x="80" y="44" textAnchor="middle" fill="var(--color-text-bright)" fontSize="13" fontWeight="600">SalesPod Engine</text>
          
          {/* Status Indicator inside Hub */}
          <circle cx="50" cy="62" r="3" fill="var(--sp-accent)" />
          <motion.circle cx="50" cy="62" r="6" fill="none" stroke="var(--sp-accent)" strokeWidth="1"
            animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          />
          <text x="60" y="65" fill="var(--color-text-bright)" fontSize="10" fontWeight="500">Live Orchestrator</text>
        </g>

        {/* OUTPUT NODE 1 */}
        <g transform="translate(370, 40)">
          <rect width="130" height="64" rx="8" ry="8" fill="var(--color-bg-card)" stroke="var(--color-border)" strokeWidth="1" />
          <text x="12" y="20" fill="var(--color-text-muted)" fontSize="9" fontWeight="700" letterSpacing="0.05em">SEQUENCE ROUTER</text>
          <text x="12" y="38" fill="var(--color-text-bright)" fontSize="11" fontWeight="500">Email & LinkedIn</text>
          <circle cx="16" cy="50" r="2.5" fill="var(--sp-accent)" />
          <text x="24" y="53" fill="var(--color-text-faint)" fontSize="9">Active Loops</text>
        </g>

        {/* OUTPUT NODE 2 */}
        <g transform="translate(370, 276)">
          <rect width="130" height="64" rx="8" ry="8" fill="var(--color-bg-card)" stroke="var(--color-border)" strokeWidth="1" />
          <text x="12" y="20" fill="var(--color-text-muted)" fontSize="9" fontWeight="700" letterSpacing="0.05em">CRM INTEGRATION</text>
          <text x="12" y="38" fill="var(--color-text-bright)" fontSize="12" fontWeight="500">Database Sync</text>
          <circle cx="16" cy="50" r="2.5" fill="var(--color-green)" />
          <text x="24" y="53" fill="var(--color-text-faint)" fontSize="9">Fully Mapped</text>
        </g>
      </svg>
    </div>
  );
}

export default function SalesPodPage() {
  const isMobile = useMobile(1023);
  const { resolvedTheme } = useTheme();

  // Form State
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    countryCode: "+971",
    customCode: "",
    goal: "Fully Autonomous Pipeline",
    website: "", // Honeypot
  });

  // UI Interactive States
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [showGoalPicker, setShowGoalPicker] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeDemoTab, setActiveDemoTab] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Status updates during loading
  const [loadingStatus, setLoadingStatus] = useState("Initializing connection...");

  // Refs for closing pickers on outside click
  const countryPickerRef = useRef<HTMLDivElement>(null);
  const goalPickerRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (countryPickerRef.current && !countryPickerRef.current.contains(event.target as Node)) {
        setShowCountryPicker(false);
      }
      if (goalPickerRef.current && !goalPickerRef.current.contains(event.target as Node)) {
        setShowGoalPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Form Change Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const selectCountry = (code: string) => {
    setForm(prev => ({ ...prev, countryCode: code }));
    setShowCountryPicker(false);
  };

  const selectGoal = (goal: string) => {
    setForm(prev => ({ ...prev, goal }));
    setShowGoalPicker(false);
  };

  // Simulate soft telemetry status
  const runStatusUpdates = async () => {
    const statuses = [
      "Configuring routing proxy arrays...",
      "Pre-registering schema variables...",
      "Syncing outbound target channels...",
      "Completing handshake..."
    ];
    for (let i = 0; i < statuses.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 600));
      setLoadingStatus(statuses[i]);
    }
  };

  // Form Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setLoadingStatus("Connecting to ScalePods network...");

    // Cooldown Validation
    const lastSubmit = localStorage.getItem("scalepods_cooldown_salespod");
    if (lastSubmit) {
      const timeDiff = Date.now() - parseInt(lastSubmit, 10);
      if (timeDiff < 30000) {
        setError("Please wait a moment before resubmitting.");
        setLoading(false);
        return;
      }
    }

    // Strict Email Verification
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(form.email)) {
      setError("Please provide a valid work email address.");
      setLoading(false);
      return;
    }

    // Dial code formatting
    const dialCode = form.countryCode === "Custom" ? form.customCode : form.countryCode;

    // Run status updates in parallel
    const statusPromise = runStatusUpdates();

    const apiPromise = submitLead({
      formType: "contact_sales",
      workflowType: "sales_workflow",
      sourcePage: "/salespod",
      name: form.name,
      email: form.email,
      phone: form.phone ? `${dialCode} ${form.phone}` : undefined,
      company: form.company,
      message: `Outbound Goal: ${form.goal}`,
      website: form.website,
      metadata: {
        goal: form.goal,
        platform: "SalesPod Landing Page",
        workflow: "sales_workflow"
      }
    });

    const [, apiResult] = await Promise.all([statusPromise, apiPromise]);

    setLoading(false);

    if (!apiResult.success) {
      setError(apiResult.error || "Submission failed. Please verify connection and try again.");
    } else {
      localStorage.setItem("scalepods_cooldown_salespod", Date.now().toString());
      setSubmitted(true);
    }
  };

  return (
    <BeamsBackground className="salespod-container" hues={[210, 185]}>
      {/* Soft Ambient Cool Blue Glow Overlay */}
      <div className="sp-ambient-bg-glow" />

      {/* Main Layout Area */}
      <div className="sp-hero-wrapper">
        <div className="sp-hero-grid">
          
          {/* ── LEFT SIDE: BRAND COHESIVE HEADER & TEXT ── */}
          <motion.div
            variants={fadeUp(0.1, isMobile)}
            initial="initial"
            animate="animate"
            className="sp-hero-left"
          >
            {/* Soft Blinking Brand-Native Eyebrow */}
            <div className="sp-hero-eyebrow">
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
                AI-Powered Sales Engine
              </span>
            </div>

            {/* Content Heading */}
            <h1 className="sp-hero-title" style={{ textAlign: isMobile ? "center" : "left" }}>
              The <span style={{ color: "var(--sp-accent)", fontFamily: "var(--font-serif), 'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400 }}>AI-powered</span> Engine <br />
              for High-Performance <br />
              Sales Teams.
            </h1>

            {/* Subtext */}
            <p className="sp-hero-desc" style={{ textAlign: isMobile ? "center" : "left", marginBottom: "20px" }}>
              Deploy autonomous Sales Pods that source, screen, and engage your ideal customers.
              <br /><br />
              Scale your revenue without scaling your headcount.
            </p>

            {/* Supporting Bullet Indicators */}
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: "12px",
              marginBottom: "28px",
              width: "100%",
              maxWidth: "520px"
            }}>
              {[
                "Autonomous Lead Sourcing",
                "AI-Powered Qualification",
                "Multi-Channel Outreach",
                "CRM Synchronization"
              ].map((bullet, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: isMobile ? "center" : "flex-start" }}>
                  <CheckCircle2 size={14} style={{ color: "var(--sp-accent)", flexShrink: 0 }} />
                  <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--color-text-bright)" }}>
                    {bullet}
                  </span>
                </div>
              ))}
            </div>

            {/* Clean CTA Link */}
            <a
              href="#deployment-form"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("deployment-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
              style={{
                fontFamily: "var(--font-sans), sans-serif",
                fontSize: "13.5px",
                fontWeight: 600,
                color: "var(--sp-accent)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                borderBottom: "1px solid var(--sp-accent)",
                paddingBottom: "2px",
                transition: "opacity 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
            >
              Book a Free Outbound Audit →
            </a>
          </motion.div>

          {/* ── RIGHT SIDE: SOFT PREMIUM LEAD CAPTURE CARD ── */}
          <motion.div
            variants={fadeUp(0.2, isMobile)}
            initial="initial"
            animate="animate"
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
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
                // Success Presentation
                <div style={{ textAlign: "center", padding: "20px 0" }}>
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
                    Deployment Confirmed
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
                    Your SalesPod configurations have been pre-registered. An outreach engineer will contact you shortly to complete the system integration.
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
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--sp-accent)", marginBottom: "6px" }}>SELECTED SCHEMAS</div>
                    <div style={{ fontSize: "12.5px", color: "var(--color-text-muted)" }}>
                      <strong>Goal:</strong> {form.goal}
                    </div>
                  </div>
                </div>
              ) : (
                // Premium Soft Form
                <form onSubmit={handleSubmit} className="sp-form-row">
                  
                  {/* Card Title Header */}
                  <div style={{ borderBottom: "1px solid var(--color-border)", paddingBottom: "12px", marginBottom: "4px" }}>
                    <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-text-bright)", margin: 0 }}>
                      Configure Your Outbound Pod
                    </h2>
                    <p style={{ fontSize: "12px", color: "var(--color-text-muted)", marginTop: "4px" }}>
                      Provide details below to build your strategy.
                    </p>
                  </div>

                  {/* Input: Name */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label className="sp-form-label">
                      Full Name *
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleInputChange}
                      placeholder="Enter Name"
                      className="sp-input-field"
                      required
                    />
                  </div>

                  {/* Input: Email */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label className="sp-form-label">
                      Work Email *
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleInputChange}
                      placeholder="name@company.com"
                      className="sp-input-field"
                      required
                    />
                  </div>

                  {/* Input: Company */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label className="sp-form-label">
                      Company Domain *
                    </label>
                    <input
                      name="company"
                      value={form.company}
                      onChange={handleInputChange}
                      placeholder="company.com"
                      className="sp-input-field"
                      required
                    />
                  </div>

                  {/* Dropdown Selection: Outbound Goal */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px", position: "relative" }} ref={goalPickerRef}>
                    <label className="sp-form-label">
                      Primary Outbound Goal
                    </label>
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
                          {outboundGoals.map((g, idx) => (
                            <div
                              key={idx}
                              onClick={() => selectGoal(g)}
                              style={{
                                padding: "10px 12px",
                                borderRadius: "6px",
                                cursor: "pointer",
                                fontSize: "13px",
                                color: form.goal === g ? "var(--sp-accent)" : "var(--color-text-body)",
                                background: form.goal === g ? "rgba(var(--sp-accent-rgb), 0.05)" : "transparent",
                                transition: "background 0.2s"
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.background = "rgba(15, 23, 42, 0.03)"}
                              onMouseLeave={(e) => e.currentTarget.style.background = form.goal === g ? "rgba(var(--sp-accent-rgb), 0.05)" : "transparent"}
                            >
                              {g}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Input: Phone Number */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label className="sp-form-label">
                      Phone Number
                    </label>
                    <div style={{ display: "flex", gap: "8px", position: "relative" }}>
                      
                      {/* Flag Picker */}
                      <div ref={countryPickerRef} style={{ position: "relative" }}>
                        <button
                          type="button"
                          onClick={() => setShowCountryPicker(!showCountryPicker)}
                          className="sp-dropdown-btn"
                          style={{ width: "auto", minWidth: "90px", padding: "10px 14px", gap: "6px" }}
                        >
                          <span style={{ fontSize: "15px" }}>
                            {countries.find(c => c.code === form.countryCode)?.flag || "🌐"}
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
                                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(15, 23, 42, 0.03)"}
                                  onMouseLeave={(e) => e.currentTarget.style.background = form.countryCode === c.code ? "rgba(var(--sp-accent-rgb), 0.05)" : "transparent"}
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
                        name="phone"
                        value={form.phone}
                        onChange={handleInputChange}
                        placeholder="Phone Number"
                        className="sp-input-field"
                        style={{ flex: 1 }}
                      />
                    </div>
                  </div>

                  {/* Honeypot field (hidden from humans) */}
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

                  {/* Error Messaging Row */}
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

                  {/* Submitting Telemetry status message */}
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
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#63A5E7] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#63A5E7]"></span>
                      </span>
                      <span>{loadingStatus}</span>
                    </div>
                  )}

                  {/* Soft Premium Submit Button */}
                  <div style={{ position: "relative", marginTop: "4px" }}>
                    <button
                      type="submit"
                      disabled={loading}
                      className="sp-submit-btn"
                      style={{
                        background: resolvedTheme === 'dark'
                          ? "linear-gradient(135deg, #05081c 0%, #0e1526 100%)"
                          : "linear-gradient(135deg, #E0EEFD 0%, #63A5E7 100%)", // Brand blue gradient
                        color: resolvedTheme === 'dark' ? "var(--sp-accent)" : "#0b1020", // Muted charcoal for contrast
                        border: resolvedTheme === 'dark' 
                          ? "1px solid rgba(99, 165, 231, 0.35)" 
                          : "1px solid rgba(99, 165, 231, 0.2)",
                        cursor: loading ? "not-allowed" : "pointer",
                        opacity: loading ? 0.75 : 1,
                        boxShadow: resolvedTheme === 'dark'
                          ? "0 8px 24px -4px rgba(0, 0, 0, 0.5), 0 0 15px rgba(99, 165, 231, 0.12)"
                          : "0 8px 20px -4px rgba(99, 165, 231, 0.15)",
                      }}
                    >
                      {loading ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : null}
                      <span>
                        {loading ? "Configuring pod..." : "Configure Outbound Pod"}
                      </span>
                    </button>
                    <p style={{ fontSize: "11px", color: "var(--color-text-muted)", textAlign: "center", marginTop: "12px", marginBottom: 0 }}>
                      Your data is secure. No spam. Ever.
                    </p>
                  </div>

                </form>
              )}
            </div>
          </motion.div>

          {/* ── METRICS STRIP: FOOTER INTEL FOR HERO ── */}
          <motion.div
            variants={fadeUp(0.3, isMobile)}
            initial="initial"
            animate="animate"
            className="sp-metrics-strip"
            style={{ 
              justifyContent: isMobile ? "center" : "flex-start", 
              alignItems: "center", 
              gap: isMobile ? "16px" : "56px" 
            }}
          >
            {[
              { label: "DATA SCHEMA", value: "Verified Target Accounts" },
              { label: "OUTBOUND CHANNELS", value: "Email & LinkedIn Dual-Loop" },
              { label: "INTEGRATION", value: "CRM Lead Automation" }
            ].map((spec, idx) => (
              <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "2px", textAlign: isMobile ? "center" : "left" }}>
                <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--sp-accent)", letterSpacing: "0.08em" }}>
                  {spec.label}
                </span>
                <span style={{ fontSize: "13px", color: "var(--color-text-bright)", fontWeight: 500 }}>
                  {spec.value}
                </span>
              </div>
            ))}
          </motion.div>

        </div>

      </div>

      {/* ── FOLD 2: TRUST SIGNAL ── */}
      <div className="sp-section-wrapper" style={{ borderTop: "1px solid var(--color-border-faint)" }}>
        
        {/* Section Label / Intro */}
        <div style={{ textAlign: "center", maxWidth: "800px", marginLeft: "auto", marginRight: "auto" }}>
          <div className="sp-hero-eyebrow">
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
              LIVE INFRASTRUCTURE
            </span>
          </div>

          <h2 className="sp-hero-title" style={{ fontSize: "clamp(32px, 3.8vw, 48px)" }}>
            The ultimate growth shortcut <br />
            for <span style={{ fontFamily: "var(--font-serif), 'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: "var(--sp-accent)" }}>modern sales teams</span>.
          </h2>

          <p className="sp-hero-desc" style={{ marginLeft: "auto", marginRight: "auto", marginBottom: "0" }}>
            Scaling your revenue is now as simple as turning on a Pod.
            <br /><br />
            Step into the next generation of automated excellence.
          </p>
        </div>

        {/* Main Trust Metrics Grid */}
        <div className="sp-metrics-grid">
          
          <div className="sp-metric-block">
            <div className="sp-metric-number">500+</div>
            <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--color-text-bright)", marginBottom: "6px" }}>Leads Automated</div>
            <div style={{ fontSize: "12.5px", color: "var(--color-text-body)" }}>across active client accounts</div>
          </div>

          <div className="sp-metric-block">
            <div className="sp-metric-number">70%</div>
            <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--color-text-bright)", marginBottom: "6px" }}>Faster lead response time</div>
            <div style={{ fontSize: "12.5px", color: "var(--color-text-body)" }}>with SalesPod running live</div>
          </div>

          <div className="sp-metric-block">
            <div className="sp-metric-number">8 hrs</div>
            <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--color-text-bright)", marginBottom: "6px" }}>Saved Per Rep / Week</div>
            <div style={{ fontSize: "12.5px", color: "var(--color-text-body)" }}>zero manual follow-up required</div>
          </div>

        </div>

      </div>


      {/* ── FOLD 3: PRODUCT DEMO ── */}
      <div className="sp-section-wrapper" style={{ borderTop: "1px solid var(--color-border-faint)" }}>
        
        {/* Top Header */}
        <div style={{ textAlign: "center", maxWidth: "800px", marginLeft: "auto", marginRight: "auto", marginBottom: "40px" }}>
          <div className="sp-hero-eyebrow">
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
              Product Demo
            </span>
          </div>

          <h2 className="sp-hero-title" style={{ fontSize: "clamp(32px, 3.8vw, 48px)" }}>
            Explore the Product
          </h2>
        </div>

        {/* Main Immersive Demo Container */}
        <div className="sp-demo-wrapper">
          <div className="sp-demo-window">
            
            {/* Header / Titlebar */}
            <div className="sp-demo-titlebar">
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ display: "flex", gap: "6px" }}>
                  <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ef4444", opacity: 0.8 }} />
                  <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#fbbf24", opacity: 0.8 }} />
                  <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#10b981", opacity: 0.8 }} />
                </div>
                <span style={{ fontSize: "11px", color: "var(--color-text-muted)", marginLeft: "12px", fontFamily: "var(--font-sans)", letterSpacing: "0.05em" }}>
                  salespod-control-panel-v1.4
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#63A5E7] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#63A5E7]"></span>
                </span>
                <span style={{ fontSize: "11px", color: "var(--sp-accent)", fontWeight: 600 }}>SYSTEM ACTIVE</span>
              </div>
            </div>

            {/* Interactive Demo Selector Tabs */}
            <div className="sp-demo-tabs">
              {[
                { label: "Autonomous Outreach", icon: <Globe size={14} /> },
                { label: "AI Lead Qualification", icon: <Cpu size={14} /> },
                { label: "CRM Synchronization", icon: <Database size={14} /> },
                { label: "Omnichannel Execution", icon: <Layers size={14} /> }
              ].map((tab, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveDemoTab(idx)}
                  className={`sp-demo-tab-btn ${activeDemoTab === idx ? "active" : ""}`}
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Content Panel Area */}
            <div className="sp-demo-content-panel">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDemoTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  style={{ width: "100%", height: "100%" }}
                >
                  {activeDemoTab === 0 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "12px", color: "var(--sp-accent)", fontWeight: 700 }}>LIVE INGESTION TUNNEL</span>
                        <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>Targeting active decision makers</span>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "20px" }}>
                        <div style={{ background: "rgba(var(--color-text-bright-rgb), 0.015)", padding: "16px", borderRadius: "10px", border: "1px solid var(--color-border-faint)" }}>
                          <div style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>Active Intent Trigger</div>
                          <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-text-bright)", marginTop: "4px" }}>"Searching for cloud infrastructure migration scaling solutions"</div>
                          <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                            <span style={{ fontSize: "10px", background: "rgba(var(--sp-accent-rgb), 0.08)", color: "var(--sp-accent)", padding: "2px 6px", borderRadius: "4px" }}>G2 Crowd</span>
                            <span style={{ fontSize: "10px", background: "rgba(var(--sp-accent-rgb), 0.08)", color: "var(--sp-accent)", padding: "2px 6px", borderRadius: "4px" }}>GitHub Tech Stack Scan</span>
                          </div>
                        </div>
                        <div style={{ background: "rgba(var(--color-text-bright-rgb), 0.015)", padding: "16px", borderRadius: "10px", border: "1px solid var(--color-border-faint)" }}>
                          <div style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>Enriched Outbound Contact</div>
                          <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-text-bright)", marginTop: "4px" }}>Sarah Jenkins, VP of Ops at Vercel</div>
                          <div style={{ fontSize: "12px", color: "var(--color-text-muted)", marginTop: "4px" }}>sarah.jenkins@vercel.com (Verified 100%)</div>
                          <div style={{ fontSize: "12px", color: "#10b981", fontWeight: 500, marginTop: "8px", display: "flex", alignItems: "center", gap: "4px" }}>
                            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981" }} />
                            Ready for automated dispatch
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeDemoTab === 1 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "12px", color: "var(--sp-accent)", fontWeight: 700 }}>AI LEAD INTELLIGENCE METRIC</span>
                        <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>Continuous profile evaluation scoring</span>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.2fr 0.8fr", gap: "24px" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: "13px", color: "var(--color-text-bright)", fontWeight: 500 }}>ICP Match Percentage</span>
                            <span style={{ fontSize: "13px", color: "var(--sp-accent)", fontWeight: 700 }}>98.2%</span>
                          </div>
                          <div style={{ width: "100%", height: "6px", background: "var(--color-border-faint)", borderRadius: "3px", overflow: "hidden" }}>
                            <div style={{ width: "98.2%", height: "100%", background: "var(--sp-accent)" }} />
                          </div>
                          <p style={{ fontSize: "12.5px", color: "var(--color-text-body)", lineHeight: "1.5", marginTop: "8px" }}>
                            SalesPod evaluated hiring velocity, technologies detected, and recent funding events to score Vercel as a high-fit enterprise prospect.
                          </p>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px", background: "rgba(var(--color-text-bright-rgb), 0.015)", padding: "16px", borderRadius: "10px", border: "1px solid var(--color-border-faint)" }}>
                          <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>SCORING ENGINE ATTRIBUTES</span>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", borderBottom: "1px solid var(--color-border-faint)", paddingBottom: "6px", marginTop: "4px" }}>
                            <span style={{ color: "var(--color-text-body)" }}>Enterprise Segment</span>
                            <span style={{ color: "var(--color-text-bright)", fontWeight: 600 }}>MATCHED</span>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", borderBottom: "1px solid var(--color-border-faint)", paddingBottom: "6px" }}>
                            <span style={{ color: "var(--color-text-body)" }}>Outbound Goal Alignment</span>
                            <span style={{ color: "var(--color-text-bright)", fontWeight: 600 }}>OPTIMAL</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeDemoTab === 2 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "12px", color: "var(--sp-accent)", fontWeight: 700 }}>CRM CONTEXT HANDSHAKE</span>
                        <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>Bidirectional pipeline telemetry synchronization</span>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "20px" }}>
                        <div style={{ background: "rgba(8, 10, 14, 0.3)", padding: "16px", borderRadius: "10px", border: "1px solid var(--color-border-faint)" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--color-border-faint)", paddingBottom: "8px" }}>
                            <span style={{ fontSize: "12.5px", fontWeight: 600, color: "var(--color-text-bright)" }}>HubSpot Sync Node</span>
                            <span style={{ fontSize: "10px", background: "rgba(16, 185, 129, 0.1)", color: "#10b981", padding: "2px 6px", borderRadius: "4px", fontWeight: 700 }}>ONLINE</span>
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "12px", fontSize: "11.5px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                              <span style={{ color: "var(--color-text-muted)" }}>Last Sync:</span>
                              <span style={{ color: "var(--color-text-bright)" }}>Just now</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                              <span style={{ color: "var(--color-text-muted)" }}>Fields Synced:</span>
                              <span style={{ color: "var(--color-text-bright)" }}>Lead Score, Contact Owner, Email Logs</span>
                            </div>
                          </div>
                        </div>
                        <div style={{ background: "rgba(8, 10, 14, 0.3)", padding: "16px", borderRadius: "10px", border: "1px solid var(--color-border-faint)" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--color-border-faint)", paddingBottom: "8px" }}>
                            <span style={{ fontSize: "12.5px", fontWeight: 600, color: "var(--color-text-bright)" }}>Salesforce Sync Node</span>
                            <span style={{ fontSize: "10px", background: "rgba(16, 185, 129, 0.1)", color: "#10b981", padding: "2px 6px", borderRadius: "4px", fontWeight: 700 }}>ONLINE</span>
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "12px", fontSize: "11.5px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                              <span style={{ color: "var(--color-text-muted)" }}>Database ID:</span>
                              <span style={{ color: "var(--color-text-bright)" }}>SF-892-Vercel</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                              <span style={{ color: "var(--color-text-muted)" }}>Outbound Handshake:</span>
                              <span style={{ color: "var(--color-text-bright)" }}>Successful Log Creation</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeDemoTab === 3 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "12px", color: "var(--sp-accent)", fontWeight: 700 }}>EMAIL & LINKEDIN PERSONALIZATION OUTBOX</span>
                        <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>Multi-channel execution sequence</span>
                      </div>
                      <div style={{ background: "rgba(var(--color-text-bright-rgb), 0.015)", padding: "20px", borderRadius: "12px", border: "1px solid var(--color-border-faint)" }}>
                        <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
                          <span style={{ fontSize: "11px", background: "rgba(var(--sp-accent-rgb), 0.08)", color: "var(--sp-accent)", padding: "2px 8px", borderRadius: "4px", fontWeight: 600 }}>EMAIL STAGE 1</span>
                          <span style={{ fontSize: "11px", background: "rgba(var(--sp-accent-rgb), 0.08)", color: "var(--sp-accent)", padding: "2px 8px", borderRadius: "4px", fontWeight: 600 }}>LINKEDIN INTRO</span>
                        </div>
                        <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-text-bright)", borderBottom: "1px solid var(--color-border-faint)", paddingBottom: "10px" }}>
                          Subject: Optimizing Outbound Orchestration Loops at Vercel
                        </div>
                        <div style={{ fontSize: "12.5px", color: "var(--color-text-body)", lineHeight: "1.6", marginTop: "12px" }}>
                          "Hi Sarah, noticed Vercel is scaling operations for enterprise accounts. Standardized prospecting teams often struggle with the bandwidth required for real-time intent checks. We built SalesPod to run enrichment crawlers that identify key divisions and draft custom pain hooks directly inside AWS. Would you be open to auditing your team's current outbound execution latency?"
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* Bottom Feature Indicators Footer */}
        <div className="sp-demo-indicators-footer">
          {[
            { name: "Autonomous Outreach", desc: "Outbound sequences triggered dynamically by intent crawlers." },
            { name: "AI Lead Qualification", desc: "ICP match screening and score generation per lead profile." },
            { name: "CRM Synchronization", desc: "Bidirectional logging mapping leads into Salesforce/HubSpot." },
            { name: "Omnichannel Execution", desc: "Coordinating touchpoints seamlessly across Email & LinkedIn." }
          ].map((feat, idx) => (
            <div key={idx} className="sp-demo-indicator-card">
              <h4 style={{ fontSize: "13.5px", fontWeight: 600, color: "var(--color-text-bright)", margin: "0 0 6px 0" }}>
                {feat.name}
              </h4>
              <p style={{ fontSize: "11.5px", color: "var(--color-text-body)", margin: 0, lineHeight: "1.4" }}>
                {feat.desc}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* ── FOLDS 4, 5 & 6: WHAT SALESPOD DOES (Your AI-Powered Sales Engine) ── */}
      <div className="sp-section-wrapper" style={{ borderTop: "1px solid var(--color-border-faint)" }}>
        
        {/* Intro Header */}
        <div style={{ textAlign: "center", maxWidth: "800px", marginLeft: "auto", marginRight: "auto", marginBottom: "48px" }}>
          <div className="sp-hero-eyebrow">
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
              Core Capabilities
            </span>
          </div>

          <h2 className="sp-hero-title" style={{ fontSize: "clamp(32px, 3.8vw, 48px)" }}>
            Your AI-Powered Sales Engine
          </h2>

          <p className="sp-hero-desc" style={{ marginLeft: "auto", marginRight: "auto" }}>
            From finding the right prospects to nurturing intent and updating your CRM — SalesPod automates the entire outbound sales workflow.
          </p>
        </div>

        {/* Core Metrics Banner */}
        <div className="sp-engine-metrics-bar">
          <div className="sp-engine-metric-item">
            <div className="sp-engine-metric-val">3×</div>
            <div className="sp-engine-metric-label">More touchpoints</div>
          </div>
          <div className="sp-engine-metric-item">
            <div className="sp-engine-metric-val">0</div>
            <div className="sp-engine-metric-label">Manual follow-ups</div>
          </div>
          <div className="sp-engine-metric-item">
            <div className="sp-engine-metric-val">&lt; 5min</div>
            <div className="sp-engine-metric-label">First response time</div>
          </div>
        </div>

        {/* FOLD 4: Lead Generation + Prospect Intelligence */}
        <div className="sp-engine-stage-grid">
          <div className="sp-engine-stage-header">
            <span className="sp-engine-stage-label">Chapter 01 // Lead Sourcing</span>
            <h3 className="sp-engine-stage-title">Lead Generation With AI</h3>
            <p className="sp-engine-stage-desc">
              SalesPod identifies, filters, and delivers high-quality leads tailored to your ICP.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div className="sp-engine-chapter-card">
              <span className="sp-engine-chapter-num">01 / PROFILE SPECIFICATION</span>
              <h4 className="sp-engine-chapter-title">Understand Your ICP</h4>
              <p className="sp-engine-chapter-body">
                Define your ideal customer based on industry, company size, geography, buying signals, and decision-makers.
              </p>
            </div>
            <div className="sp-engine-chapter-card">
              <span className="sp-engine-chapter-num">02 / INTERNET-WIDE SCOUTING</span>
              <h4 className="sp-engine-chapter-title">Scrape Relevant Leads Across the Internet</h4>
              <p className="sp-engine-chapter-body">
                Continuously scans LinkedIn, business databases, and public sources to identify matching prospects.
              </p>
            </div>
            <div className="sp-engine-chapter-card">
              <span className="sp-engine-chapter-num">03 / PIPELINE HYDRATION</span>
              <h4 className="sp-engine-chapter-title">Generate Sales-Ready Leads</h4>
              <p className="sp-engine-chapter-body">
                Filters, enriches, and organizes lead data for immediate outreach.
              </p>
            </div>
          </div>
        </div>

        {/* FOLD 5: Multi-Channel Outreach + Lead Nurturing */}
        <div className="sp-engine-stage-grid">
          <div className="sp-engine-stage-header">
            <span className="sp-engine-stage-label">Chapter 02 // Engagement Hub</span>
            <h3 className="sp-engine-stage-title">Multi-Channel Outreach &amp; Lead Nurturing</h3>
            <p className="sp-engine-stage-desc">
              Reach prospects across multiple channels with personalized, style-matching messaging that maps directly to customer intent and responses.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            
            {/* Outreach Sub-grid */}
            <div>
              <h4 style={{ fontSize: "14px", fontWeight: 700, color: "var(--sp-accent)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "16px" }}>
                Multi-Channel Outreach That Scales Personalization
              </h4>
              <div className="sp-engine-flex-columns">
                <div className="sp-engine-chapter-card">
                  <span className="sp-engine-chapter-num">04 / DISPATCH CHANNELS</span>
                  <h4 className="sp-engine-chapter-title">Launch Outreach Across Multiple Channels</h4>
                  <p className="sp-engine-chapter-body">
                    Connect through Email, AI Voice Calls, LinkedIn, WhatsApp, and more.
                  </p>
                </div>
                <div className="sp-engine-chapter-card">
                  <span className="sp-engine-chapter-num">05 / AUDIENCE SEGMENTS</span>
                  <h4 className="sp-engine-chapter-title">Customize Messaging for Every Audience</h4>
                  <p className="sp-engine-chapter-body">
                    Set your tone, messaging flow, and campaign strategy based on your ICP.
                  </p>
                </div>
              </div>
              <div className="sp-engine-chapter-card" style={{ marginTop: "16px" }}>
                <span className="sp-engine-chapter-num">06 / STYLE REPLICATION</span>
                <h4 className="sp-engine-chapter-title">Train AI Agents to Match Your Style</h4>
                <p className="sp-engine-chapter-body">
                  AI agents adapt to your communication style, language, and conversation patterns.
                </p>
              </div>
            </div>

            {/* Nurturing Sub-grid */}
            <div>
              <h4 style={{ fontSize: "14px", fontWeight: 700, color: "var(--sp-accent)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "16px" }}>
                Intelligent Lead Nurturing That Tracks Intent
              </h4>
              <div className="sp-engine-flex-columns">
                <div className="sp-engine-chapter-card">
                  <span className="sp-engine-chapter-num">07 / TELEMETRY AUDIT</span>
                  <h4 className="sp-engine-chapter-title">Monitor Conversations Across Channels</h4>
                  <p className="sp-engine-chapter-body">
                    Tracks emails, calls, LinkedIn messages, WhatsApp chats, and more in real time.
                  </p>
                </div>
                <div className="sp-engine-chapter-card">
                  <span className="sp-engine-chapter-num">08 / CONTEXTUAL RESPONSES</span>
                  <h4 className="sp-engine-chapter-title">Follow Up Based on Buyer Behavior</h4>
                  <p className="sp-engine-chapter-body">
                    Sends contextual follow-ups based on engagement stage and customer responses.
                  </p>
                </div>
              </div>
              <div className="sp-engine-chapter-card" style={{ marginTop: "16px" }}>
                <span className="sp-engine-chapter-num">09 / HUMAN IN THE LOOP</span>
                <h4 className="sp-engine-chapter-title">Handoff High-Intent Leads Instantly</h4>
                <p className="sp-engine-chapter-body">
                  Routes qualified opportunities to your sales team with full conversation context.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* FOLD 6: CRM Automation + Analytics */}
        <div className="sp-engine-stage-grid" style={{ borderBottom: "none" }}>
          <div className="sp-engine-stage-header">
            <span className="sp-engine-stage-label">Chapter 03 // Pipeline Intelligence</span>
            <h3 className="sp-engine-stage-title">CRM Automation &amp; Intelligent Dashboards</h3>
            <p className="sp-engine-stage-desc">
              Reduce manual data entry and get precise outbound performance telemetry synced bidirectional with your operational stack.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            
            {/* CRM Updates Sub-grid */}
            <div>
              <h4 style={{ fontSize: "14px", fontWeight: 700, color: "var(--sp-accent)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "16px" }}>
                Automated CRM Updates and Smarter Lead Scoring
              </h4>
              <div className="sp-engine-flex-columns">
                <div className="sp-engine-chapter-card">
                  <span className="sp-engine-chapter-num">10 / TELEMETRY WRITER</span>
                  <h4 className="sp-engine-chapter-title">Auto-Update CRM Entries</h4>
                  <p className="sp-engine-chapter-body">
                    Syncs interactions, responses, and lead activity automatically into your CRM.
                  </p>
                </div>
                <div className="sp-engine-chapter-card">
                  <span className="sp-engine-chapter-num">11 / NLP SCANNING</span>
                  <h4 className="sp-engine-chapter-title">Analyze Buyer Sentiment</h4>
                  <p className="sp-engine-chapter-body">
                    Understands tone, hesitation, engagement, and intent across conversations.
                  </p>
                </div>
              </div>
              <div className="sp-engine-chapter-card" style={{ marginTop: "16px" }}>
                <span className="sp-engine-chapter-num">12 / INTENT RANKING</span>
                <h4 className="sp-engine-chapter-title">Score Leads Based on Intent</h4>
                <p className="sp-engine-chapter-body">
                  Ranks leads dynamically using engagement quality and buying signals.
                </p>
              </div>
            </div>

            {/* Dashboards Sub-grid */}
            <div>
              <h4 style={{ fontSize: "14px", fontWeight: 700, color: "var(--sp-accent)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "16px" }}>
                Intelligent Dashboards for Better Sales Decisions
              </h4>
              <div className="sp-engine-flex-columns">
                <div className="sp-engine-chapter-card">
                  <span className="sp-engine-chapter-num">13 / DATA ARCHIVE</span>
                  <h4 className="sp-engine-chapter-title">Capture Data Across the Sales Journey</h4>
                  <p className="sp-engine-chapter-body">
                    Tracks outreach, engagement, conversions, and pipeline activity in one place.
                  </p>
                </div>
                <div className="sp-engine-chapter-card">
                  <span className="sp-engine-chapter-num">14 / AUTO AUDITING</span>
                  <h4 className="sp-engine-chapter-title">Analyze Campaign Performance Automatically</h4>
                  <p className="sp-engine-chapter-body">
                    Measures what’s working across channels, messaging, and outreach flows.
                  </p>
                </div>
              </div>
              <div className="sp-engine-chapter-card" style={{ marginTop: "16px" }}>
                <span className="sp-engine-chapter-num">15 / PERFORMANCE TARGETS</span>
                <h4 className="sp-engine-chapter-title">Break Down Insights by KPIs</h4>
                <p className="sp-engine-chapter-body">
                  Monitor metrics like response rates, meetings booked, conversions, and ROI.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* ── FOLD 7: STATS & BENEFITS ── */}
      <div className="sp-section-wrapper" style={{ borderTop: "1px solid var(--color-border-faint)", position: "relative" }}>
        
        {/* Intro Section Label */}
        <div style={{ textAlign: "center", maxWidth: "800px", marginLeft: "auto", marginRight: "auto", marginBottom: "48px" }}>
          <div className="sp-hero-eyebrow">
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
              Operational proof &amp; outcomes
            </span>
          </div>

          <h2 className="sp-hero-title" style={{ fontSize: "clamp(32px, 3.8vw, 48px)" }}>
            Smarter, faster, and more scalable outbound.
          </h2>

          <p className="sp-hero-desc" style={{ marginLeft: "auto", marginRight: "auto" }}>
            Outbound performance at the speed of autonomous agent fleets.
          </p>
        </div>

        {/* STATS SECTION */}
        <div className="sp-stats-grid">
          
          <motion.div 
            className="sp-stat-card"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="sp-stat-num">3s</div>
            <div className="sp-stat-desc">
              <strong style={{ color: "var(--color-text-bright)", display: "block", marginBottom: "4px" }}>First Contact</strong>
              Lead enters. Outreach fires. Nobody had to touch anything.
            </div>
          </motion.div>

          <motion.div 
            className="sp-stat-card"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="sp-stat-num">3×</div>
            <div className="sp-stat-desc">
              <strong style={{ color: "var(--color-text-bright)", display: "block", marginBottom: "4px" }}>More Replies</strong>
              Three channels running together beat one every time.
            </div>
          </motion.div>

          <motion.div 
            className="sp-stat-card"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="sp-stat-num">60%</div>
            <div className="sp-stat-desc">
              <strong style={{ color: "var(--color-text-bright)", display: "block", marginBottom: "4px" }}>Less Manual Work</strong>
              Reps only pick up threads that are already warm.
            </div>
          </motion.div>

          <motion.div 
            className="sp-stat-card"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="sp-stat-num">40%</div>
            <div className="sp-stat-desc">
              <strong style={{ color: "var(--color-text-bright)", display: "block", marginBottom: "4px" }}>More Meetings Booked</strong>
              from the same leads your team already had.
            </div>
          </motion.div>

        </div>

        {/* BENEFITS SECTION */}
        <div className="sp-benefits-strips-wrapper">
          
          <div className="sp-benefit-strip">
            <div className="sp-benefit-dot" />
            <div className="sp-benefit-text">
              Leads that already fit your ICP <span className="sp-benefit-sub">· 100% qualified</span>
            </div>
          </div>

          <div className="sp-benefit-strip">
            <div className="sp-benefit-dot" />
            <div className="sp-benefit-text">
              All three channels. One sequence. <span className="sp-benefit-sub">· Max reply rates</span>
            </div>
          </div>

          <div className="sp-benefit-strip">
            <div className="sp-benefit-dot" />
            <div className="sp-benefit-text">
              Rep steps in at the right moment <span className="sp-benefit-sub">· Zero cold handoffs</span>
            </div>
          </div>

          <div className="sp-benefit-strip">
            <div className="sp-benefit-dot" />
            <div className="sp-benefit-text">
              Know who's ready before you call <span className="sp-benefit-sub">· Automated data</span>
            </div>
          </div>

        </div>

        {/* BOTTOM LINE STATEMENT & CTA */}
        <div className="sp-stats-bottom-bar">
          <p className="sp-bottom-line-text">
            The leads were always there. <span className="sp-bottom-line-italic">SalesPod is why they finally convert.</span>
          </p>
          <button 
            className="sp-stats-cta-btn"
            onClick={() => {
              const el = document.getElementById("salespod-lead-form");
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <span>See it in action</span>
            <span style={{ fontSize: "14px", fontWeight: 700 }}>→</span>
          </button>
        </div>

      </div>

      {/* ── FOLD 8: WHY SCALEPODS ── */}
      <div className="sp-section-wrapper" style={{ borderTop: "1px solid var(--color-border-faint)" }}>
        
        {/* Section Heading & Subtext */}
        <div style={{ textAlign: "center", maxWidth: "800px", marginLeft: "auto", marginRight: "auto", marginBottom: "48px" }}>
          <div className="sp-hero-eyebrow">
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
              Strategic Comparison
            </span>
          </div>

          <h2 className="sp-hero-title" style={{ fontSize: "clamp(32px, 3.8vw, 48px)" }}>
            What changes when you stop doing this manually
          </h2>

          <p className="sp-hero-desc" style={{ marginLeft: "auto", marginRight: "auto" }}>
            Not a feature list. The actual difference between a system and a spreadsheet.
          </p>
        </div>

        {/* Two-Column Comparison */}
        <div className="sp-comparison-layout">
          
          {/* LEFT: Automated SalesPod Workflow */}
          <div className="sp-comparison-col">
            <div className="sp-comp-col-header">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#63A5E7] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#63A5E7]"></span>
              </span>
              <span>Automated SalesPod Workflow</span>
            </div>

            {[
              "High-intent ICP lead lists populate automatically via continuous web scraping.",
              "Tailored campaigns launch simultaneously across email, LinkedIn, WhatsApp, and AI voice.",
              "Reps step in exclusively when a lead shows clear, cross-channel buying intent.",
              "The CRM updates itself in real time using precise lead scores based on human sentiment and hesitation.",
              "Clear success metrics and exact ROI unlock inside one centralized dashboard."
            ].map((text, idx) => (
              <motion.div 
                key={idx}
                className="sp-comp-card sp-comp-card-active"
                whileHover={{ x: 2 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <span className="sp-comp-num">0{idx + 1}</span>
                <p className="sp-comp-body">{text}</p>
              </motion.div>
            ))}
          </div>

          {/* RIGHT: Existing Manual System Workflow */}
          <div className="sp-comparison-col">
            <div className="sp-comp-col-header manual">
              <span>Existing Manual System Workflow</span>
            </div>

            {[
              "Reps waste hours manually hunting for data from scratch.",
              "Outreach stalls on basic emails that get easily ignored in crowded inboxes.",
              "Hot opportunities freeze while reps manually hunt through scattered replies.",
              "Pipeline data breaks down due to total reliance on what reps remember to log.",
              "Growth opportunities vanish because nobody knows which channel is actually working."
            ].map((text, idx) => (
              <div 
                key={idx}
                className="sp-comp-card sp-comp-card-manual"
              >
                <span className="sp-comp-num">0{idx + 1}</span>
                <p className="sp-comp-body">{text}</p>
              </div>
            ))}
          </div>

        </div>

        {/* BOTTOM STATEMENT & CTA */}
        <div className="sp-comp-bottom-bar">
          <p style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-text-bright)", margin: "0 0 8px 0" }}>
            Your team is good at selling.
          </p>
          <p style={{ fontSize: "14px", color: "var(--color-text-muted)", margin: "0 0 24px 0" }}>
            SalesPod makes sure they only talk to people who are ready.
          </p>
          <button 
            className="sp-comp-bottom-btn"
            onClick={() => {
              const el = document.getElementById("salespod-lead-form");
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <span>See how it works</span>
            <span style={{ fontSize: "14px", fontWeight: 700 }}>→</span>
          </button>
        </div>

      </div>

      {/* ── FOLD 9: FINAL CALL TO ACTION ── */}
      <div className="sp-final-cta-wrapper">
        <div className="sp-final-cta-glow" />
        
        <div className="sp-final-cta-content">
          <div className="sp-hero-eyebrow" style={{ marginBottom: "16px" }}>
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
              Operational Upgrade
            </span>
          </div>

          <h2 className="sp-final-cta-title">
            Your leads deserve a <br />
            <span style={{ fontFamily: "var(--font-serif), 'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: "var(--sp-accent)" }}>faster response</span>.
          </h2>

          <p className="sp-final-cta-desc">
            SalesPod builds and runs the full outreach system for you, so your team wakes up to conversations, not cold queues.
          </p>

          <button 
            className="sp-final-cta-btn"
            onClick={() => {
              const el = document.getElementById("salespod-lead-form");
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <span>Get Full Funnel Analysis</span>
            <span style={{ fontSize: "14px", fontWeight: 700, marginLeft: "8px" }}>→</span>
          </button>
        </div>
      </div>

      {/* ── FOLD 10: VOICES — CLIENT TESTIMONIALS ── */}
      <div className="sp-section-wrapper" style={{ borderTop: "1px solid var(--color-border-faint)" }}>
        
        {/* Section Heading */}
        <div style={{ textAlign: "center", maxWidth: "800px", marginLeft: "auto", marginRight: "auto", marginBottom: "48px" }}>
          <div className="sp-hero-eyebrow">
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
              Voices — Client Testimonials
            </span>
          </div>

          <h2 className="sp-hero-title" style={{ fontSize: "clamp(32px, 3.8vw, 48px)" }}>
            Teams that made the switch.
          </h2>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="sp-voices-grid">
          
          {/* Card 1 */}
          <div className="sp-voice-card">
            <p className="sp-voice-feedback">
              "Fast, accurate, and blends into daily operations without friction. Felt like a senior team member rather than a tool."
            </p>
            <div className="sp-voice-meta">
              <div className="sp-voice-avatar">AR</div>
              <div className="sp-voice-author">
                <span className="sp-voice-name">Anuj Ruia</span>
                <span className="sp-voice-title">Co-Founder, BECO</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="sp-voice-card">
            <p className="sp-voice-feedback">
              "Game-changer. Flows run flawlessly. Our team focuses only on what moves revenue — everything else just happens."
            </p>
            <div className="sp-voice-meta">
              <div className="sp-voice-avatar">SL</div>
              <div className="sp-voice-author">
                <span className="sp-voice-name">Sharan Lekhi</span>
                <span className="sp-voice-title">Founder, Krafty Animations</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="sp-voice-card">
            <p className="sp-voice-feedback">
              "Smooth setup. Replaced three tools in one go. Improvements showed in the very first week."
            </p>
            <div className="sp-voice-meta">
              <div className="sp-voice-avatar">SJ</div>
              <div className="sp-voice-author">
                <span className="sp-voice-name">Shreyansh Jaiswal</span>
                <span className="sp-voice-title">Founder, HobbyFi</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ── FOLD 11: QUESTIONS · BEFORE YOU DECIDE (FAQ) ── */}
      <div className="sp-section-wrapper" style={{ borderTop: "1px solid var(--color-border-faint)" }}>
        
        {/* Section Heading */}
        <div style={{ textAlign: "center", maxWidth: "800px", marginLeft: "auto", marginRight: "auto", marginBottom: "48px" }}>
          <div className="sp-hero-eyebrow">
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
              Questions · Before You Decide
            </span>
          </div>

          <h2 className="sp-hero-title" style={{ fontSize: "clamp(32px, 3.8vw, 48px)" }}>
            FAQs
          </h2>
        </div>

        {/* FAQ Accordion List */}
        <div className="sp-faq-list">
          
          {[
            {
              q: "What is sales automation?",
              a: "Traditionally, sales automation meant setting up static email sequences and auto-filling contact fields. ScalePods transforms this definition entirely. With SalesPod, sales automation becomes an end-to-end, autonomous sales pipeline engine. Instead of your team managing software, the SalesPod actively executes the work: it scrapes live internet data to find your exact ICP, launches coordinated campaigns across Email, LinkedIn, WhatsApp, and Voice, and uses AI in sales to handle lead nurturing until a meeting is ready to be booked."
            },
            {
              q: "What is the difference between sales automation and CRM?",
              a: "A CRM (Customer Relationship Management) system like HubSpot or Salesforce is a database—it stores your contact history and logs deal stages. SalesPod is the active execution engine that brings that data to life. While traditional B2B sales automation requires you to manually log activities, SalesPod works in the background: it dynamically pulls new leads from the web, executes multi-channel outreach, reads prospect replies using sentiment analysis, and automatically updates your CRM records and lead scores in real time without human intervention."
            },
            {
              q: "What is the difference between sales automation and marketing automation?",
              a: "Marketing automation software focuses on the top of the funnel, using a \"one-to-many\" approach like generic newsletters or automated social posts to capture broad interest. SalesPod is a specialized outreach automation tool built for hyper-personalized, \"one-to-one\" B2B sales development. It engages specific decision-makers directly across their preferred communication apps (Email, LinkedIn, WhatsApp, and Voice) using custom-trained bots that mimic your exact brand style to move leads into deep sales conversations."
            },
            {
              q: "Will AI replace sales professionals?",
              a: "No. AI sales tools are built to eliminate administrative friction, not human relationship builders. B2B buyers still require human trust, nuance, and strategic negotiation to finalize a partnership. SalesPod is designed to automate the grueling 80% of the sales cycle—the manual prospecting, cold outreach, follow-ups, and CRM logging. By taking over the tedious groundwork, SalesPod empowers your reps to spend 100% of their time doing what they do best: holding high-intent conversations and closing deals."
            },
            {
              q: "Is SalesPod GDPR and data compliance ready?",
              a: "Yes. ScalePods is engineered with enterprise-grade data security and strict adherence to global privacy laws, including GDPR and CCPA. The SalesPod relies on compliant, opt-in targeted web scraping standards and operates within the strict terms of service for platforms like WhatsApp and LinkedIn. Because every outreach flow includes seamless opt-out mechanisms, you get high-velocity pipeline growth while maintaining complete data compliance, with all configurations fully managed by our team during your setup."
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

        {/* Bottom Decompression Conversion */}
        <div className="sp-faq-bottom-cta">
          <h4 className="sp-faq-bottom-title">Still unsure if this fits your team?</h4>
          <p className="sp-faq-bottom-sub">One call is enough to know.</p>
          <button
            className="sp-faq-bottom-btn"
            onClick={() => {
              const el = document.getElementById("salespod-lead-form");
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <span>Book a Call</span>
            <span style={{ fontSize: "12px", fontWeight: 700 }}>→</span>
          </button>
        </div>
      </div>

    </BeamsBackground>
  );
}
