"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  ChevronDown, 
  ChevronLeft,
  ChevronRight,
  Loader2, 
  CheckCircle2, 
  ArrowUpRight,
  Play,
  Pause,
  Cpu,
  Layers,
  Globe,
  RefreshCw,
  Sliders,
  Database,
  Inbox,
  Volume2,
  VolumeX
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

const salespodReviews = [
  {
    name: "Vinay Kumar",
    title: "Managing Director at LOTUS MANOR REAL ESTATE L.L.C, DUBAI.",
    location: "Dubai, UAE",
    countryCode: "ae",
    quote: "“We needed an AI agent that wouldn't embarrass us in front of investors. Scalepods delivered it — and made the process easy. They were quick to respond, quick to iterate, and treated our launch deadline like their own. The kind of partner you want when the work has to be right and the timeline is tight.”",
    image: "/reviews/Vinay Kumar.webp"
  },
  {
    name: "Anuj Ruia",
    title: "Co-Founder at BECO",
    location: "Mumbai, India",
    countryCode: "in",
    quote: "“Truly impressive. The AI assistant is fast, accurate, and blends into our daily ops without friction. What stood out most was how quickly the team understood our workflow and customized the automation around it. The implementation felt seamless from day one, and the support throughout the process was proactive and reliable. Scalepods helped us simplify operations without slowing the team down.”",
    image: "/reviews/Anuj Ruia.jpeg"
  },
  {
    name: "Sharan Lekhi",
    title: "Founder at Krafty Animations",
    location: "Mumbai, India",
    countryCode: "in",
    quote: "“Game-changer. Automation flows run flawlessly. Our team focuses only on what really matters. Scalepods helped us streamline communication, reduce manual coordination, and improve overall execution speed. The workflows are reliable, easy to manage, and built with real operational understanding. It’s one of the few systems we adopted that immediately started saving us valuable time.”",
    image: "/reviews/Sharan Lekhi.jpeg"
  },
  {
    name: "Shreyansh Jaiswal",
    title: "Founder at HobbyFi",
    location: "Bangalore, India",
    countryCode: "in",
    quote: "“Smooth setup. Replaced three tools. We saw improvements in just the first week. The onboarding process was quick, the automation logic was easy to understand, and everything integrated well with our existing workflow. Scalepods made the transition feel effortless while improving response times and reducing operational overhead across multiple tasks.”",
    image: "/reviews/Shreyansh Jaiswal.avif"
  },
  {
    name: "Dhairya Shah",
    title: "Partner & CEO at Break The Code",
    location: "Ahmedabad, India",
    countryCode: "in",
    quote: "“Very intuitive. No fluff, just performance. Our internal processes finally feel under control. The automation setup was thoughtfully structured and aligned well with our team’s daily operations. What impressed us most was the balance between flexibility and reliability. Scalepods delivered a system that feels efficient, scalable, and genuinely useful in day-to-day execution.”",
    image: "/reviews/Dhairya Shah.avif"
  },
  {
    name: "Luis Guilherme",
    title: "Founder at Guileo AI",
    location: "New York, USA",
    countryCode: "us",
    quote: "“Working with Scalepods on our Restaurant Management System was an outstanding experience from start to finish. They delivered a project with the kind of professionalism and dedication you rarely find — clear communication throughout, zero surprises, and results that exceeded expectations.\n\nWhat truly set Scalepods apart was their commitment to quality. Every detail was handled with care, and they approached every challenge with a solution-oriented mindset rather than making excuses.\n\nThey kept us informed at every stage, were fully accountable for outcomes, and always showed up ready to deliver.\n\nThe system they built is rock-solid, well-structured, and exactly what we envisioned. It's clear this is a team that takes pride in its craft.\n\nHighly recommended — without reservation. We're already planning our next collaboration, and I look forward to a long-term partnership.\n\nIf you're looking for a team that combines technical excellence with genuine reliability, Scalepods is your answer.\n\n10/10 — Would work with them again and again.”",
    image: "/reviews/Luis Guilherme.gif",
    expanded: true
  },
  {
    name: "Taslim Kausar Attar",
    title: "Property Manager at Lootah Group of Companies",
    location: "UAE",
    countryCode: "ae",
    quote: "“I have been trying to find a solution to create a Procurement Website as per my vision and requirement which is a step up to E-Learning and with current AI automation.\n\nScalepods has fulfilled all the requirements...It was great experience to work with everyone related to Scalepods.\n\nWould like to especially thank Mr. Adnan Shaikh, Mr. Raunak Kumar for listening to all my requirements and assuring to fulfill it and Mr. Viraj Goswami and Mr. Mithul are the brains behind creating a fantastic website which not just fulfills the procurement need, dashboard, comparison of price with new and previous data also provides whatsapp as well as email connectivity to get new quotations.\nThank you so much everyone at Scalepods.”",
    image: "/reviews/TASLIM.png",
    expanded: true
  }
];

const capabilitiesData = [
  {
    chapter: "Chapter 01",
    eyebrow: "Lead Sourcing",
    title: "Lead Generation With AI",
    desc: "SalesPod identifies, filters, and delivers high-quality leads tailored to your ICP.",
    video: "/videos/salespod/1.mp4",
    points: [
      {
        title: "Understand Your ICP",
        body: "Define your ideal customer based on industry, company size, geography, buying signals, and decision-makers."
      },
      {
        title: "Scrape Relevant Leads Across the Internet",
        body: "Continuously scans LinkedIn, business databases, and public sources to identify matching prospects."
      },
      {
        title: "Generate Sales-Ready Leads",
        body: "Filters, enriches, and organizes lead data for immediate outreach."
      }
    ]
  },
  {
    chapter: "Chapter 02",
    eyebrow: "Outreach & Delivery",
    title: "Multi-Channel Outreach That Scales Personalization",
    desc: "Reach prospects across channels with messaging tailored to your audience.",
    video: "/videos/salespod/2.mp4",
    points: [
      {
        title: "Launch Outreach Across Multiple Channels",
        body: "Connect through Email, AI Voice Calls, LinkedIn, WhatsApp, and more."
      },
      {
        title: "Customize Messaging for Every Audience",
        body: "Set your tone, messaging flow, and campaign strategy based on your ICP."
      },
      {
        title: "Train AI Agents to Match Your Style",
        body: "AI agents adapt to your communication style, language, and conversation patterns."
      }
    ]
  },
  {
    chapter: "Chapter 03",
    eyebrow: "Intent Tracking",
    title: "Intelligent Lead Nurturing That Tracks Intent",
    desc: "SalesPod follows every conversation and identifies the right time to involve your sales team.",
    video: "/videos/salespod/3.mp4",
    points: [
      {
        title: "Monitor Conversations Across Channels",
        body: "Tracks emails, calls, LinkedIn messages, WhatsApp chats, and more in real time."
      },
      {
        title: "Follow Up Based on Buyer Behavior",
        body: "Sends contextual follow-ups based on engagement stage and customer responses."
      },
      {
        title: "Handoff High-Intent Leads Instantly",
        body: "Routes qualified opportunities to your sales team with full conversation context."
      }
    ]
  },
  {
    chapter: "Chapter 04",
    eyebrow: "CRM Sync & Analytics",
    title: "Automated CRM Updates and Smarter Lead Scoring",
    desc: "Reduce manual work while prioritizing the leads most likely to convert.",
    video: "/videos/salespod/4.mp4",
    points: [
      {
        title: "Auto-Update CRM Entries",
        body: "Syncs interactions, responses, and lead activity automatically into your CRM."
      },
      {
        title: "Analyze Buyer Sentiment",
        body: "Understands tone, hesitation, engagement, and intent across conversations."
      },
      {
        title: "Score Leads Based on Intent",
        body: "Ranks leads dynamically using engagement quality and buying signals."
      }
    ]
  },
  {
    chapter: "Chapter 05",
    eyebrow: "Performance Insights",
    title: "Intelligent Dashboards for Better Sales Decisions",
    desc: "Turn sales activity into actionable insights and measurable outcomes.",
    video: "/videos/salespod/5.mp4",
    points: [
      {
        title: "Capture Data Across the Sales Journey",
        body: "Tracks outreach, engagement, conversions, and pipeline activity in one place."
      },
      {
        title: "Analyze Campaign Performance Automatically",
        body: "Measures what’s working across channels, messaging, and outreach flows."
      },
      {
        title: "Break Down Insights by KPIs",
        body: "Monitor metrics like response rates, meetings booked, conversions, and ROI."
      }
    ]
  }
];

interface CapabilityVideoPlayerProps {
  src: string;
}

function CapabilityVideoPlayer({ src }: CapabilityVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLInputElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [duration, setDuration] = useState(0);
  const [seekType, setSeekType] = useState<"rewind" | "forward" | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const loadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          loadObserver.disconnect();
        }
      },
      {
        rootMargin: "300px",
      }
    );

    loadObserver.observe(container);
    return () => {
      loadObserver.disconnect();
    };
  }, []);

  const lastClickTimeRef = useRef(0);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const seekTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  const handleVideoClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const now = Date.now();
    const delta = now - lastClickTimeRef.current;

    if (delta < 300) {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
        clickTimeoutRef.current = null;
      }

      if (videoRef.current && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const isLeftSide = clickX < rect.width / 2;

        if (isLeftSide) {
          videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 5);
          triggerSeekIndicator("rewind");
        } else {
          videoRef.current.currentTime = Math.min(videoRef.current.duration || 0, videoRef.current.currentTime + 5);
          triggerSeekIndicator("forward");
        }
        updateProgressDOM();
      }
      lastClickTimeRef.current = 0;
    } else {
      lastClickTimeRef.current = now;
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = setTimeout(() => {
        togglePlay();
        clickTimeoutRef.current = null;
      }, 250);
    }
  };

  const triggerSeekIndicator = (type: "rewind" | "forward") => {
    setSeekType(type);
    if (seekTimeoutRef.current) clearTimeout(seekTimeoutRef.current);
    seekTimeoutRef.current = setTimeout(() => {
      setSeekType(null);
      seekTimeoutRef.current = null;
    }, 600);
  };

  const updateProgressDOM = useCallback(() => {
    const video = videoRef.current;
    const timeline = timelineRef.current;
    if (!video || !timeline) return;

    const cur = video.currentTime;
    const dur = video.duration || 1;
    const percentage = (cur / dur) * 100;

    timeline.value = cur.toString();
    timeline.style.background = `linear-gradient(to right, var(--sp-accent) 0%, var(--sp-accent) ${percentage}%, rgba(255, 255, 255, 0.25) ${percentage}%, rgba(255, 255, 255, 0.25) 100%)`;
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (isPlaying) {
            // Always reset to beginning (0:00) when section becomes active
            video.currentTime = 0;
            updateProgressDOM();

            // Autoplay with audio muted by default
            video.muted = true;
            setIsMuted(true);
            video.play().catch(() => {});
          }
        } else {
          video.pause();
          video.muted = true;
          setIsMuted(true);
        }
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(video);
    return () => {
      observer.unobserve(video);
    };
  }, [isPlaying, updateProgressDOM, shouldLoad]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    let animationFrameId: number;

    const loop = () => {
      updateProgressDOM();
      if (!video.paused) {
        animationFrameId = requestAnimationFrame(loop);
      }
    };

    const handlePlay = () => {
      animationFrameId = requestAnimationFrame(loop);
    };

    const handlePause = () => {
      cancelAnimationFrame(animationFrameId);
    };

    const handleTimeUpdate = () => {
      updateProgressDOM();
      if (video.currentTime > 0) {
        setIsVideoReady(true);
      }
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("timeupdate", handleTimeUpdate);

    if (!video.paused) {
      handlePlay();
    } else {
      updateProgressDOM();
    }

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      cancelAnimationFrame(animationFrameId);
    };
  }, [updateProgressDOM, shouldLoad]);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      updateProgressDOM();
      setIsVideoReady(true);
    }
  };

  const handleTimelineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const val = parseFloat(e.target.value);
      videoRef.current.currentTime = val;
      updateProgressDOM();
    }
  };

  return (
    <div 
      ref={containerRef}
      className="sp-capability-video-wrapper" 
      onClick={handleVideoClick} 
      style={{ cursor: "pointer", position: "relative", overflow: "hidden" }}
    >
      <video
        ref={videoRef}
        src={shouldLoad ? src : undefined}
        autoPlay
        muted={isMuted}
        loop
        playsInline
        preload="metadata"
        className="sp-capability-video"
        style={{
          opacity: isVideoReady ? 1 : 0,
          transition: "opacity 0.35s ease-in-out",
        }}
        onLoadedMetadata={handleLoadedMetadata}
        onDurationChange={handleLoadedMetadata}
        onCanPlay={() => setIsVideoReady(true)}
        onLoadedData={() => setIsVideoReady(true)}
        onPlay={() => setIsVideoReady(true)}
      />

      <AnimatePresence>
        {!isVideoReady && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "radial-gradient(circle at center, rgba(15, 22, 38, 0.95), rgba(7, 11, 19, 0.98))",
              borderRadius: "inherit",
              zIndex: 5,
              gap: "16px",
              pointerEvents: "none",
            }}
          >
            {/* ScalePods Premium Branded Logo */}
            <div style={{ position: "relative", width: "120px", height: "30px", opacity: 0.85 }}>
              <Image
                src="/scalepods-navbar-logo.png"
                alt="ScalePods Logo"
                fill
                style={{ objectFit: "contain" }}
                sizes="120px"
              />
            </div>

            {/* Spinner and Status Indicator */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "rgba(255, 255, 255, 0.7)" }}>
              <Loader2 className="animate-spin" size={16} style={{ color: "var(--sp-accent)" }} />
              <span style={{ fontSize: "12px", fontWeight: 500, letterSpacing: "0.05em", fontFamily: "Inter, sans-serif" }}>
                PREPARING EXPERIENCE...
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Play Overlay indicator */}
      {isVideoReady && !isPlaying && (
        <div 
          style={{
            position: "absolute",
            bottom: "29px",
            left: "37px",
            zIndex: 11,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "18px",
            height: "18px",
            pointerEvents: "none",
            transition: "opacity 0.2s ease"
          }}
        >
          <Play size={18} style={{ color: "#ffffff", fill: "#ffffff" }} />
        </div>
      )}

      {/* Double Tap Seek Indicator Overlay */}
      {isVideoReady && seekType && (
        <div 
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            zIndex: 11
          }}
        >
          <div 
            style={{
              padding: "12px 20px",
              borderRadius: "20px",
              background: "rgba(0, 0, 0, 0.65)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
              color: "#ffffff",
              fontSize: "12px",
              fontWeight: 700,
              animation: "sp-fade-in-out 0.6s forwards",
              border: "1px solid rgba(255, 255, 255, 0.1)"
            }}
          >
            {seekType === "rewind" ? (
              <>
                <div style={{ display: "flex", gap: "2px" }}>
                  <ChevronLeft size={16} />
                  <ChevronLeft size={16} />
                </div>
                <span>-5s</span>
              </>
            ) : (
              <>
                <div style={{ display: "flex", gap: "2px" }}>
                  <ChevronRight size={16} />
                  <ChevronRight size={16} />
                </div>
                <span>+5s</span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Hover-based Timeline Progress Bar */}
      {isVideoReady && (
        <div 
          className="sp-video-timeline-container"
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "absolute",
            bottom: "16px",
            left: "20px",
            right: "76px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            zIndex: 10,
            background: "rgba(10, 15, 30, 0.65)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            padding: "8px 16px",
            borderRadius: "24px",
            height: "44px"
          }}
        >
          <button
            onClick={togglePlay}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
              outline: "none"
            }}
          >
            {isPlaying ? (
              <Pause size={18} style={{ fill: "#ffffff" }} />
            ) : (
              <Play size={18} style={{ fill: "#ffffff" }} />
            )}
          </button>
          <input 
            ref={timelineRef}
            type="range"
            min={0}
            max={duration || 1}
            step={0.01}
            defaultValue={0}
            onChange={handleTimelineChange}
            className="sp-video-timeline"
            style={{ flex: 1 }}
          />
        </div>
      )}

      {/* Mute/Unmute Overlay Button */}
      {isVideoReady && (
        <button
          onClick={toggleMute}
          style={{
            position: "absolute",
            bottom: "16px",
            right: "20px",
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            background: "rgba(10, 15, 30, 0.65)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            cursor: "pointer",
            transition: "background 0.2s, transform 0.2s",
            zIndex: 10,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(10, 15, 30, 0.85)";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(10, 15, 30, 0.65)";
            e.currentTarget.style.transform = "scale(1)";
          }}
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX size={20} style={{ opacity: 0.85 }} />
          ) : (
            <Volume2 size={20} style={{ opacity: 0.85 }} />
          )}
        </button>
      )}
    </div>
  );
}

function ProductDemoVideoPlayer({ src }: CapabilityVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLInputElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [duration, setDuration] = useState(0);
  const [seekType, setSeekType] = useState<"rewind" | "forward" | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const loadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          loadObserver.disconnect();
        }
      },
      {
        rootMargin: "300px",
      }
    );

    loadObserver.observe(container);
    return () => {
      loadObserver.disconnect();
    };
  }, []);

  const lastClickTimeRef = useRef(0);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const seekTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  const handleVideoClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const now = Date.now();
    const delta = now - lastClickTimeRef.current;

    if (delta < 300) {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
        clickTimeoutRef.current = null;
      }

      if (videoRef.current && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const isLeftSide = clickX < rect.width / 2;

        if (isLeftSide) {
          videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 5);
          triggerSeekIndicator("rewind");
        } else {
          videoRef.current.currentTime = Math.min(videoRef.current.duration || 0, videoRef.current.currentTime + 5);
          triggerSeekIndicator("forward");
        }
        updateProgressDOM();
      }
      lastClickTimeRef.current = 0;
    } else {
      lastClickTimeRef.current = now;
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = setTimeout(() => {
        togglePlay();
        clickTimeoutRef.current = null;
      }, 250);
    }
  };

  const triggerSeekIndicator = (type: "rewind" | "forward") => {
    setSeekType(type);
    if (seekTimeoutRef.current) clearTimeout(seekTimeoutRef.current);
    seekTimeoutRef.current = setTimeout(() => {
      setSeekType(null);
      seekTimeoutRef.current = null;
    }, 600);
  };

  const updateProgressDOM = useCallback(() => {
    const video = videoRef.current;
    const timeline = timelineRef.current;
    if (!video || !timeline) return;

    const cur = video.currentTime;
    const dur = video.duration || 1;
    const percentage = (cur / dur) * 100;

    timeline.value = cur.toString();
    timeline.style.background = `linear-gradient(to right, var(--sp-accent) 0%, var(--sp-accent) ${percentage}%, rgba(255, 255, 255, 0.25) ${percentage}%, rgba(255, 255, 255, 0.25) 100%)`;
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (isPlaying) {
            // Always reset to beginning (0:00) when section becomes active
            video.currentTime = 0;
            updateProgressDOM();

            // Autoplay with audio muted by default
            video.muted = true;
            setIsMuted(true);
            video.play().catch(() => {});
          }
        } else {
          video.pause();
          video.muted = true;
          setIsMuted(true);
        }
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(video);
    return () => {
      observer.unobserve(video);
    };
  }, [isPlaying, updateProgressDOM, shouldLoad]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    let animationFrameId: number;

    const loop = () => {
      updateProgressDOM();
      if (!video.paused) {
        animationFrameId = requestAnimationFrame(loop);
      }
    };

    const handlePlay = () => {
      animationFrameId = requestAnimationFrame(loop);
    };

    const handlePause = () => {
      cancelAnimationFrame(animationFrameId);
    };

    const handleTimeUpdate = () => {
      updateProgressDOM();
      if (video.currentTime > 0) {
        setIsVideoReady(true);
      }
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("timeupdate", handleTimeUpdate);

    if (!video.paused) {
      handlePlay();
    } else {
      updateProgressDOM();
    }

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      cancelAnimationFrame(animationFrameId);
    };
  }, [updateProgressDOM, shouldLoad]);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      updateProgressDOM();
      setIsVideoReady(true);
    }
  };

  const handleTimelineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const val = parseFloat(e.target.value);
      videoRef.current.currentTime = val;
      updateProgressDOM();
    }
  };

  return (
    <div 
      ref={containerRef}
      className="sp-capability-video-wrapper" 
      onClick={handleVideoClick} 
      style={{ 
        cursor: "pointer", 
        position: "relative",
        border: "none",
        borderRadius: "0px",
        boxShadow: "none",
        background: "transparent",
        width: "100%",
        height: "100%",
        display: "block",
        aspectRatio: "16/9",
        overflow: "hidden"
      }}
    >
      <video
        ref={videoRef}
        src={shouldLoad ? src : undefined}
        autoPlay
        muted={isMuted}
        loop
        playsInline
        preload="metadata"
        className="sp-capability-video"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          opacity: isVideoReady ? 1 : 0,
          transition: "opacity 0.35s ease-in-out",
        }}
        onLoadedMetadata={handleLoadedMetadata}
        onDurationChange={handleLoadedMetadata}
        onCanPlay={() => setIsVideoReady(true)}
        onLoadedData={() => setIsVideoReady(true)}
        onPlay={() => setIsVideoReady(true)}
      />

      <AnimatePresence>
        {!isVideoReady && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "radial-gradient(circle at center, rgba(15, 22, 38, 0.95), rgba(7, 11, 19, 0.98))",
              borderRadius: "inherit",
              zIndex: 5,
              gap: "16px",
              pointerEvents: "none",
            }}
          >
            {/* ScalePods Premium Branded Logo */}
            <div style={{ position: "relative", width: "120px", height: "30px", opacity: 0.85 }}>
              <Image
                src="/scalepods-navbar-logo.png"
                alt="ScalePods Logo"
                fill
                style={{ objectFit: "contain" }}
                sizes="120px"
              />
            </div>

            {/* Spinner and Status Indicator */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "rgba(255, 255, 255, 0.7)" }}>
              <Loader2 className="animate-spin" size={16} style={{ color: "var(--sp-accent)" }} />
              <span style={{ fontSize: "12px", fontWeight: 500, letterSpacing: "0.05em", fontFamily: "Inter, sans-serif" }}>
                PREPARING EXPERIENCE...
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Play Overlay indicator */}
      {isVideoReady && !isPlaying && (
        <div 
          style={{
            position: "absolute",
            bottom: "29px",
            left: "37px",
            zIndex: 11,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "18px",
            height: "18px",
            pointerEvents: "none",
            transition: "opacity 0.2s ease"
          }}
        >
          <Play size={18} style={{ color: "#ffffff", fill: "#ffffff" }} />
        </div>
      )}

      {/* Double Tap Seek Indicator Overlay */}
      {isVideoReady && seekType && (
        <div 
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            zIndex: 11
          }}
        >
          <div 
            style={{
              padding: "12px 20px",
              borderRadius: "20px",
              background: "rgba(0, 0, 0, 0.65)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
              color: "#ffffff",
              fontSize: "12px",
              fontWeight: 700,
              animation: "sp-fade-in-out 0.6s forwards",
              border: "1px solid rgba(255, 255, 255, 0.1)"
            }}
          >
            {seekType === "rewind" ? (
              <>
                <div style={{ display: "flex", gap: "2px" }}>
                  <ChevronLeft size={16} />
                  <ChevronLeft size={16} />
                </div>
                <span>-5s</span>
              </>
            ) : (
              <>
                <div style={{ display: "flex", gap: "2px" }}>
                  <ChevronRight size={16} />
                  <ChevronRight size={16} />
                </div>
                <span>+5s</span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Hover-based Timeline Progress Bar */}
      {isVideoReady && (
        <div 
          className="sp-video-timeline-container"
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "absolute",
            bottom: "16px",
            left: "20px",
            right: "76px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            zIndex: 10,
            background: "rgba(10, 15, 30, 0.65)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            padding: "8px 16px",
            borderRadius: "24px",
            height: "44px"
          }}
        >
          <button
            onClick={togglePlay}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
              outline: "none"
            }}
          >
            {isPlaying ? (
              <Pause size={18} style={{ fill: "#ffffff" }} />
            ) : (
              <Play size={18} style={{ fill: "#ffffff" }} />
            )}
          </button>
          <input 
            ref={timelineRef}
            type="range"
            min={0}
            max={duration || 1}
            step={0.01}
            defaultValue={0}
            onChange={handleTimelineChange}
            className="sp-video-timeline"
            style={{ flex: 1 }}
          />
        </div>
      )}

      {/* Mute/Unmute Overlay Button */}
      {isVideoReady && (
        <button
          onClick={toggleMute}
          style={{
            position: "absolute",
            bottom: "16px",
            right: "20px",
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            background: "rgba(10, 15, 30, 0.65)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            cursor: "pointer",
            transition: "background 0.2s, transform 0.2s",
            zIndex: 10,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(10, 15, 30, 0.85)";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(10, 15, 30, 0.65)";
            e.currentTarget.style.transform = "scale(1)";
          }}
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX size={20} style={{ opacity: 0.85 }} />
          ) : (
            <Volume2 size={20} style={{ opacity: 0.85 }} />
          )}
        </button>
      )}
    </div>
  );
}

function SalespodTestimonialCarousel() {
  return <TestimonialCarousel reviews={salespodReviews} />;
}

function DummySalespodTestimonialCarousel() {
  const [active, setActive] = useState(0);
  const isMobile = useMobile(768);
  const { resolvedTheme } = useTheme();
  const next = () => {};
  const prev = () => {};
  const handleDragEnd = () => {};
  const getCardStyles = (index: number) => ({ x: 0, scale: 1, opacity: 1, zIndex: 1, filter: "none", pointerEvents: "none" as const, isCenter: true });
  const carouselRef = useRef<HTMLDivElement>(null);
  const isInView = false;

  return (
    <div 
      ref={carouselRef} 
      className="relative w-full max-w-full"
      style={{
        overflow: isMobile ? "hidden" : "visible",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: isMobile ? "0px" : "32px",
        paddingBottom: isMobile ? "0px" : "32px",
      }}
    >
      
      {/* Navigation Arrows */}
      {!isMobile && (
        <>
          <div style={{ position: "absolute", left: "40px", top: "50%", transform: "translateY(-50%)", zIndex: 100 }}>
            <ArrowBtn dir="left" onClick={prev} />
          </div>
          <div style={{ position: "absolute", right: "40px", top: "50%", transform: "translateY(-50%)", zIndex: 100 }}>
            <ArrowBtn dir="right" onClick={next} />
          </div>
        </>
      )}

      <div 
        className="relative w-full" 
        style={{ 
          perspective: 1200, 
          minHeight: isMobile ? "auto" : "340px", 
          height: isMobile ? "auto" : undefined,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          overflow: isMobile ? "hidden" : "visible"
        }}
      >
        {isMobile ? (
          <AnimatePresence initial={false} mode="wait">
            {(() => {
              const review = salespodReviews[active];
              const { zIndex } = getCardStyles(active);
              return (
                <motion.div
                  key={review.name}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{
                    x: 0,
                    y: 0,
                    scale: 1,
                    opacity: 1,
                    zIndex,
                    filter: "none",
                  }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                  style={{
                    position: "relative",
                    pointerEvents: "auto",
                    cursor: "grab",
                    width: "92%",
                    maxWidth: "360px",
                    marginInline: "auto",
                    height: "auto",
                    minHeight: "300px",
                    background: resolvedTheme === 'dark' ? "rgba(10, 15, 30, 0.6)" : "rgba(255, 255, 255, 0.7)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(var(--sp-accent-rgb), 0.5)",
                    borderRadius: "28px",
                    overflow: "hidden",
                    padding: "28px 24px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    gap: "16px",
                    boxShadow: resolvedTheme === 'dark'
                      ? "0 30px 60px -12px rgba(0, 0, 0, 0.7), 0 0 30px rgba(var(--sp-accent-rgb), 0.15), inset 0 1px 1px rgba(255,255,255,0.05)"
                      : "0 25px 50px -12px rgba(var(--sp-accent-rgb), 0.15), 0 0 20px rgba(var(--sp-accent-rgb), 0.1), inset 0 1px 0 rgba(255,255,255,0.6)",
                  }}
                  className="transform-gpu"
                >
                  <div style={{
                    position: "absolute",
                    top: "0",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "80%",
                    height: "40%",
                    background: resolvedTheme === 'dark'
                      ? "radial-gradient(circle, rgba(var(--sp-accent-rgb), 0.08) 0%, transparent 80%)"
                      : "radial-gradient(circle, rgba(var(--sp-accent-rgb), 0.05) 0%, transparent 80%)",
                    zIndex: -1,
                    pointerEvents: "none"
                  }} />

                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <div style={{ 
                      position: "relative", 
                      width: "44px", 
                      height: "44px", 
                      borderRadius: "12px", 
                      overflow: "hidden", 
                      border: `1px solid ${resolvedTheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`, 
                      flexShrink: 0 
                    }}>
                      <Image src={review.image} alt={review.name} fill className="object-cover" sizes="64px" />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span style={{ fontFamily: "var(--font-sans), sans-serif", fontSize: "15px", fontWeight: 700, color: "var(--color-text-bright)" }}>{review.name}</span>
                      <span style={{ 
                        fontFamily: "var(--font-sans), sans-serif", 
                        fontSize: "10px", 
                        color: resolvedTheme === 'dark' ? "rgba(var(--sp-accent-rgb), 0.8)" : "rgba(0, 0, 0, 0.6)", 
                        marginTop: "1px", 
                        fontWeight: 500,
                        textTransform: "uppercase",
                        letterSpacing: "0.02em"
                      }}>{review.title}</span>
                    </div>
                  </div>

                  <div style={{ width: "100%", height: "1px", background: resolvedTheme === 'dark' ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }} />

                  <div style={{ display: "flex", alignItems: "flex-start", width: "100%", overflow: "hidden" }}>
                    <p style={{
                      fontFamily: "var(--font-sans), sans-serif", 
                      fontSize: "13px", 
                      color: "var(--color-text-body)", 
                      lineHeight: 1.65, 
                      margin: 0,
                      fontWeight: 400,
                      opacity: 0.9,
                      textAlign: "left",
                      wordBreak: "break-word",
                      overflow: "hidden"
                    }}>
                      {review.quote}
                    </p>
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>
        ) : (
          <AnimatePresence initial={false}>
            {salespodReviews.map((review, i) => {
              const { x, scale, opacity, zIndex, filter, pointerEvents, isCenter } = getCardStyles(i);

              return (
                <motion.div
                  key={review.name}
                  initial={false}
                  animate={{
                    x: `calc(-50% + ${x}px)`,
                    y: "-50%",
                    scale,
                    opacity,
                    zIndex,
                    filter,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                  drag={isCenter ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                  onClick={() => {
                    if (!isCenter) {
                      if (x < 0) prev();
                      else next();
                    }
                  }}
                  style={{
                    position: "absolute",
                    pointerEvents: pointerEvents as any,
                    cursor: isCenter ? "grab" : "pointer",
                    width: "90%",
                    maxWidth: "520px",
                    top: "50%",
                    left: "50%",
                    minHeight: "200px",
                    height: "auto",
                    background: resolvedTheme === 'dark' ? "rgba(10, 15, 30, 0.6)" : "rgba(255, 255, 255, 0.7)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: isCenter 
                      ? "1px solid rgba(var(--sp-accent-rgb), 0.5)"
                      : "1px solid rgba(var(--sp-accent-rgb), 0.1)",
                    borderRadius: "28px",
                    overflow: "hidden",
                    padding: "32px 24px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: "16px",
                    boxShadow: isCenter 
                      ? resolvedTheme === 'dark'
                        ? "0 30px 60px -12px rgba(0, 0, 0, 0.7), 0 0 30px rgba(var(--sp-accent-rgb), 0.15), inset 0 1px 1px rgba(255,255,255,0.05)"
                        : "0 25px 50px -12px rgba(var(--sp-accent-rgb), 0.15), 0 0 20px rgba(var(--sp-accent-rgb), 0.1), inset 0 1px 0 rgba(255,255,255,0.6)"
                      : "0 10px 30px rgba(0,0,0,0.05)",
                  }}
                  className="transform-gpu"
                >
                  {isCenter && (
                    <div style={{
                      position: "absolute",
                      top: "0",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "80%",
                      height: "40%",
                      background: resolvedTheme === 'dark'
                        ? "radial-gradient(circle, rgba(var(--sp-accent-rgb), 0.08) 0%, transparent 80%)"
                        : "radial-gradient(circle, rgba(var(--sp-accent-rgb), 0.05) 0%, transparent 80%)",
                      zIndex: -1,
                      pointerEvents: "none"
                    }} />
                  )}

                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <div style={{ 
                      position: "relative", 
                      width: "48px", 
                      height: "48px", 
                      borderRadius: "12px", 
                      overflow: "hidden", 
                      border: `1px solid ${resolvedTheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`, 
                      flexShrink: 0 
                    }}>
                      <Image src={review.image} alt={review.name} fill className="object-cover" sizes="64px" />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span style={{ fontFamily: "var(--font-sans), sans-serif", fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)" }}>{review.name}</span>
                      <span style={{ 
                        fontFamily: "var(--font-sans), sans-serif", 
                        fontSize: "11px", 
                        color: resolvedTheme === 'dark' ? "rgba(var(--sp-accent-rgb), 0.8)" : "rgba(0, 0, 0, 0.6)", 
                        marginTop: "1px", 
                        fontWeight: 500,
                        textTransform: "uppercase",
                        letterSpacing: "0.02em"
                      }}>{review.title}</span>
                    </div>
                  </div>

                  <div style={{ width: "100%", height: "1px", background: resolvedTheme === 'dark' ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }} />

                  <div style={{ display: "flex", alignItems: "flex-start", width: "100%", overflow: "hidden" }}>
                    <p style={{
                      fontFamily: "var(--font-sans), sans-serif", 
                      fontSize: "14px", 
                      color: "var(--color-text-body)", 
                      lineHeight: 1.65, 
                      margin: 0,
                      fontWeight: 400,
                      opacity: 0.9,
                      textAlign: "left",
                      wordBreak: "break-word",
                      overflow: "hidden"
                    }}>
                      {review.quote}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>

      {/* Pagination dots */}
      <div 
        className="flex justify-center" 
        style={{ 
          marginTop: isMobile ? "20px" : "32px",
          width: "100%",
          alignItems: "center",
          gap: "4px"
        }}
      >
        {salespodReviews.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="transition-all duration-300 flex items-center justify-center"
            style={{
              width: active === i ? "32px" : "24px",
              height: "44px", // Proper touch target height
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0
            }}
            aria-label={`Go to slide ${i + 1}`}
          >
            <span
              style={{
                width: active === i ? "24px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background: active === i ? "rgba(var(--sp-accent-rgb), 0.8)" : resolvedTheme === 'dark' ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
                display: "block",
                transition: "all 0.3s ease"
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function ArrowBtn({ dir, onClick }: { dir: 'left' | 'right', onClick: () => void }) {
  const isMobile = useMobile(768);
  const { resolvedTheme } = useTheme();
  return (
    <motion.button
      whileHover={{ scale: 1.1, background: resolvedTheme === 'dark' ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)" }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      style={{
        width: isMobile ? "44px" : "56px",
        height: isMobile ? "44px" : "56px",
        borderRadius: "50%",
        background: resolvedTheme === 'dark' ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
        backdropFilter: "blur(12px)",
        border: `1px solid ${resolvedTheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--color-text-bright)",
        cursor: "pointer",
        boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
        zIndex: 50,
      }}
    >
      {dir === 'left' ? <ChevronLeft size={isMobile ? 20 : 28} /> : <ChevronRight size={isMobile ? 20 : 28} />}
    </motion.button>
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
    countryCode: "+91",
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
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [auditModalTitle, setAuditModalTitle] = useState("Get a Free Workflow Audit");
  const [auditModalSourceName, setAuditModalSourceName] = useState("Sales Workflow Automation Solution Page");

  useCountryDetection(
    countries,
    useCallback((code: string) => setForm(prev => ({ ...prev, countryCode: code })), []),
    useCallback((code: string) => setForm(prev => ({ ...prev, customCode: code })), [])
  );

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
      sourcePage: "/solution/sales-workflow-automation",
      name: form.name,
      email: form.email,
      phone: form.phone ? `${dialCode} ${form.phone}` : undefined,
      company: form.company,
      message: `Outbound Goal: ${form.goal}`,
      website: form.website,
      metadata: {
        goal: form.goal,
        platform: "Sales Workflow Automation Solution Page",
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
      const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
      w.dataLayer = w.dataLayer || [];
      const gtmEvent = { event: "lead_form_success", event_id: apiResult.eventId, form_type: "contact_sales", source_page: "/solution/sales-workflow-automation" };
      console.log("[GTM] lead_form_success →", gtmEvent);
      w.dataLayer.push(gtmEvent);
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
            <div className="sp-hero-eyebrow" style={{ display: "flex", justifyContent: "center", width: "100%" }}>
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
            <h1 className="sp-hero-title" style={{ textAlign: "center", width: "100%" }}>
              <span style={{ color: "var(--sp-accent)" }}>The AI-powered Engine</span>{" "}
              <br className="sp-hero-desk-br" />
              for High-Performance{" "}
              <br className="sp-hero-br" />
              Sales Teams.
            </h1>

            {/* Subtext */}
            <div className="sp-hero-desc" style={{ textAlign: "center", marginBottom: isMobile ? "24px" : "32px", marginInline: "auto" }}>
              <p style={{ margin: 0 }}>
                Deploy autonomous Sales Pods that source, screen, and engage your ideal customers.
              </p>
              <p style={{ margin: "8px 0 0 0", opacity: 0.85 }}>
                Scale your revenue without scaling your headcount.
              </p>
            </div>

            {/* Supporting Bullet Indicators */}
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
              gap: isMobile ? "12px" : "14px 40px",
              marginBottom: "32px",
              width: "100%",
              maxWidth: "540px",
              marginInline: "auto"
            }}>
              {[
                "Autonomous Lead Sourcing",
                "AI-Powered Qualification",
                "Multi-Channel Outreach",
                "CRM Synchronization"
              ].map((bullet, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center" }}>
                  <CheckCircle2 size={16} style={{ color: "var(--sp-accent)", flexShrink: 0 }} />
                  <span style={{ fontSize: "14px", fontWeight: 500, color: "var(--color-text-bright)", letterSpacing: "-0.01em" }}>
                    {bullet}
                  </span>
                </div>
              ))}
            </div>

            {/* Clean CTA Button */}
            <div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "12px" }}>
              <motion.button
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                onClick={() => {
                  setAuditModalTitle("Book a Free Outbound Audit");
                  setAuditModalSourceName("Sales Workflow Automation - Hero CTA");
                  setIsAuditModalOpen(true);
                }}
                className="sp-hero-cta-btn"
                style={{
                  width: "fit-content",
                  minWidth: "250px",
                }}
              >
                Book a Free Outbound Audit →
              </motion.button>
            </div>
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
                  <div style={{ borderBottom: "1px solid var(--color-border)", paddingBottom: "8px", marginBottom: "0px" }}>
                    <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-text-bright)", margin: 0 }}>
                      Configure Your Outbound Pod
                    </h2>
                    <p style={{ fontSize: "12px", color: "var(--color-text-muted)", marginTop: "4px" }}>
                      Provide details below to build your strategy.
                    </p>
                  </div>

                  {/* Input: Name */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
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
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
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
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
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
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px", position: "relative" }} ref={goalPickerRef}>
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
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
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
                          style={{ width: "auto", minWidth: "90px", gap: "6px" }}
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
                        {loading ? "Configuring pod..." : "Configure Outbound Pod"}
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

      </div>

      {/* Brands Marquee */}
      <div 
        style={{
          width: "100%",
          maxWidth: "1200px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: isMobile ? "16px" : "32px",
          paddingRight: isMobile ? "16px" : "32px",
          marginTop: isMobile ? "24px" : "40px",
          marginBottom: isMobile ? "48px" : "72px",
          textAlign: "center",
          zIndex: 1,
          position: "relative"
        }}
      >
        <p style={{
          fontFamily: "var(--font-inter), Inter, sans-serif",
          fontSize: isMobile ? "13px" : "15px",
          color: "var(--color-text-muted)",
          marginBottom: isMobile ? "24px" : "36px",
          fontWeight: 400,
          letterSpacing: "0.01em"
        }}>
          Trusted by thousands of companies and investors all over the world
        </p>
        <BrandsMarquee />
      </div>

      {/* Claude Select Partner Network section */}
      <ClaudePartnership />

      {/* ── FOLD 2: TRUST SIGNAL ── */}
      <motion.div
        className="sp-section-wrapper"
        style={{ borderTop: "1px solid var(--color-border-faint)" }}
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        
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
            for <span style={{ color: "var(--sp-accent)" }}>modern sales teams</span>.
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
            <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--color-text-bright)" }}>CRM Automated</div>
          </div>

          <div className="sp-metric-block">
            <div className="sp-metric-number">70%</div>
            <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--color-text-bright)" }}>Faster lead response time</div>
          </div>

          <div className="sp-metric-block">
            <div className="sp-metric-number">8 hrs</div>
            <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--color-text-bright)" }}>Saved Per Rep / Week</div>
          </div>

        </div>

      </motion.div>


      {/* ── FOLD 3: PRODUCT DEMO ── */}
      <motion.div
        className="sp-section-wrapper sp-demo-section"
        style={{ borderTop: "1px solid var(--color-border-faint)" }}
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        
        {/* Top Header */}
        <div className="sp-demo-header" style={{ textAlign: "center", maxWidth: "800px", marginLeft: "auto", marginRight: "auto" }}>
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
            


            {/* Full-bleed Product Demo Video Player */}
            <div style={{ width: "100%", overflow: "hidden" }}>
              <ProductDemoVideoPlayer src="/videos/Product_demo_fold 3.mp4" />
            </div>

          </div>
        </div>



      </motion.div>

      {/* ── FOLDS 4, 5 & 6: WHAT SALESPOD DOES (Your AI-Powered Sales Engine) ── */}
      <motion.div
        className="sp-section-wrapper"
        style={{ borderTop: "1px solid var(--color-border-faint)", paddingBottom: "48px" }}
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        
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

        {/* Alternating Feature Chapters */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {capabilitiesData.map((cap, idx) => {
            const isAlt = idx % 2 === 1;
            return (
              <div 
                key={idx} 
                className={`sp-capability-section ${isAlt ? "alt" : ""}`}
              >
                {/* Content Block */}
                <div className="sp-capability-content">
                  <h3 className="sp-capability-title" style={{ color: "var(--sp-accent)" }}>
                    {idx + 1}. {cap.title}
                  </h3>
                  <p className="sp-capability-desc">
                    {cap.desc}
                  </p>
                  
                  <div className="sp-capability-points">
                    {cap.points.map((pt, pIdx) => (
                      <div key={pIdx} className="sp-capability-point-item">
                        <div className="sp-capability-point-dot" />
                        <div>
                          <h4 className="sp-capability-point-title">{pt.title}</h4>
                          <p className="sp-capability-point-body">{pt.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Media/Video Block */}
                <div className="sp-capability-media">
                  <CapabilityVideoPlayer src={cap.video} />
                </div>
              </div>
            );
          })}
        </div>

      </motion.div>

      {/* ── FOLD 7: STATS & BENEFITS ── */}
      <motion.div
        className="sp-section-wrapper"
        style={{ borderTop: "1px solid var(--color-border-faint)", position: "relative", paddingTop: "56px", paddingBottom: "56px" }}
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        
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
            Built to Move Leads Faster Through Your Pipeline
          </h2>

          <p className="sp-hero-desc" style={{ marginLeft: "auto", marginRight: "auto" }}>
            SalesPod combines AI-powered lead generation, multi-channel outreach, and intelligent nurturing to help sales teams scale conversations without scaling manual effort.
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
              Lead enters. Outreach begins automatically across channels.
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
              Multi-channel outreach consistently outperforms single-channel campaigns.
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
              Sales reps focus only on leads that show real engagement and intent.
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
              Convert more opportunities from the leads your team already has.
            </div>
          </motion.div>

        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "24px" }}>
          <motion.button 
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="sp-stats-cta-btn"
            onClick={() => {
              setAuditModalTitle("Evaluate Your Sales Funnel");
              setAuditModalSourceName("Sales Workflow Automation - Funnel CTA");
              setIsAuditModalOpen(true);
            }}
          >
            <span>Evaluate your funnel</span>
            <span style={{ fontSize: "14px", fontWeight: 700 }}>→</span>
          </motion.button>
        </div>

        {/* WHY SALES TEAMS USE SALESPOS GRID CONTAINER */}
        <div className="sp-why-use-wrapper">
          <h3 className="sp-why-use-title">Why Sales Teams Use SalesPod</h3>
          
          <div className="sp-why-use-grid">
            <div className="sp-why-use-item">
              <h4 className="sp-why-use-item-title">ICP-Matched Leads</h4>
              <p className="sp-why-use-item-desc">Qualified leads tailored to your target audience and buying intent.</p>
            </div>
            <div className="sp-why-use-item">
              <h4 className="sp-why-use-item-title">Multi-Channel Outreach</h4>
              <p className="sp-why-use-item-desc">Email, LinkedIn, AI Voice Calls, WhatsApp, and more — in one sequence.</p>
            </div>
            <div className="sp-why-use-item">
              <h4 className="sp-why-use-item-title">Smarter Sales Handoffs</h4>
              <p className="sp-why-use-item-desc">Sales teams step in only when leads are warm and conversation-ready.</p>
            </div>
            <div className="sp-why-use-item">
              <h4 className="sp-why-use-item-title">Intent-Driven Prioritization</h4>
              <p className="sp-why-use-item-desc">Identify high-intent prospects before your team makes the call.</p>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginTop: "8px" }}>
            <motion.button 
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="sp-stats-cta-btn"
              onClick={() => {
                setIsDownloadModalOpen(true);
              }}
            >
              <span>Download the Feature Guide</span>
              <span style={{ fontSize: "14px", fontWeight: 700 }}>→</span>
            </motion.button>
          </div>
        </div>

      </motion.div>

      {/* ── FOLD 8: WHY SCALEPODS ── */}
      <motion.div
        className="sp-section-wrapper"
        style={{ borderTop: "1px solid var(--color-border-faint)", paddingTop: "20px", paddingBottom: "20px" }}
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        
        {/* Section Heading & Subtext */}
        <div style={{ textAlign: "center", maxWidth: "800px", marginLeft: "auto", marginRight: "auto", marginBottom: "16px" }}>
          <div className="sp-hero-eyebrow">
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "var(--font-sans), sans-serif",
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--sp-accent)",
            }}>
              Strategic Comparison
            </span>
          </div>

          <h2 className="sp-hero-title" style={{ fontSize: "clamp(20px, 2.5vw, 28px)", lineHeight: "1.15", marginBottom: "6px" }}>
            Manual vs Automated Sales Workflow
          </h2>

          <p className="sp-hero-desc" style={{ fontSize: "13px", lineHeight: "1.4", margin: "0 auto", color: "var(--color-text-muted)", maxWidth: "600px" }}>
            Integrate Sales Automation in your workflow to drive exponential results.
          </p>
        </div>

        {/* Two-Column Comparison */}
        <div className="sp-comparison-layout">
          
          {/* LEFT HEADER */}
          <div className="sp-comp-col-header automated-header">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#63A5E7] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#63A5E7]"></span>
            </span>
            <span>Automated SalesPod Workflow</span>
          </div>

          {/* LEFT CARDS */}
          {[
            "High-intent ICP lead lists populate automatically via continuous web scraping.",
            "Tailored campaigns launch simultaneously across email, LinkedIn, WhatsApp, and AI voice.",
            "Reps step in exclusively when a lead shows clear, cross-channel buying intent.",
            "The CRM updates itself in real time using precise lead scores based on human sentiment and hesitation.",
            "Clear success metrics and exact ROI unlock inside one centralized dashboard."
          ].map((text, idx) => (
            <motion.div 
              key={`left-${idx}`}
              className={`sp-comp-card sp-comp-card-active left-card-${idx}`}
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <span className="sp-comp-num">0{idx + 1}</span>
              <p className="sp-comp-body">{text}</p>
            </motion.div>
          ))}

          {/* RIGHT HEADER */}
          <div className="sp-comp-col-header manual manual-header">
            <span>Existing Manual System Workflow</span>
          </div>

          {/* RIGHT CARDS */}
          {[
            "Reps waste hours manually hunting for data from scratch.",
            "Outreach stalls on basic emails that get easily ignored in crowded inboxes.",
            "Hot opportunities freeze while reps manually hunt through scattered replies.",
            "Pipeline data breaks down due to total reliance on what reps remember to log.",
            "Growth opportunities vanish because nobody knows which channel is actually working."
          ].map((text, idx) => (
            <div 
              key={`right-${idx}`}
              className={`sp-comp-card sp-comp-card-manual right-card-${idx}`}
            >
              <span className="sp-comp-num">0{idx + 1}</span>
              <p className="sp-comp-body">{text}</p>
            </div>
          ))}

        </div>

        {/* BOTTOM STATEMENT & CTA */}
        <div className="sp-comp-bottom-bar">
          <p style={{ fontSize: "15px", fontWeight: 600, color: "var(--color-text-bright)", margin: 0, textAlign: "left", lineHeight: "1.4" }}>
            Your team is good at selling. <span style={{ color: "var(--color-text-muted)", fontWeight: 400 }}>SalesPod makes sure they only talk to people who are ready.</span>
          </p>
          <motion.button 
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="sp-comp-bottom-btn"
            onClick={() => {
              setAuditModalTitle("See How SalesPod Works");
              setAuditModalSourceName("Sales Workflow Automation - Strategic Comparison");
              setIsAuditModalOpen(true);
            }}
          >
            <span>See how it works</span>
            <span style={{ fontSize: "12px", fontWeight: 700 }}>→</span>
          </motion.button>
        </div>

      </motion.div>

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
            <span style={{ color: "var(--sp-accent)" }}>faster response</span>.
          </h2>

          <p className="sp-final-cta-desc">
            SalesPod builds and runs the full outreach system for you, so your team wakes up to conversations, not cold queues.
          </p>

          <motion.button 
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="sp-final-cta-btn"
            onClick={() => {
              setAuditModalTitle("Get a Free Funnel Analysis");
              setAuditModalSourceName("Sales Workflow Automation - Final CTA");
              setIsAuditModalOpen(true);
            }}
          >
            <span>Get Full Funnel Analysis</span>
            <span style={{ fontSize: "14px", fontWeight: 700, marginLeft: "8px" }}>→</span>
          </motion.button>
        </div>
      </div>

      {/* ── FOLD 10: VOICES — CLIENT TESTIMONIALS ── */}
      <motion.div
        className="sp-section-wrapper"
        style={{ borderTop: "1px solid var(--color-border-faint)" }}
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        
        {/* Section Heading */}
        <div style={{ textAlign: "center", maxWidth: "800px", marginLeft: "auto", marginRight: "auto", marginBottom: "28px" }}>
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

        {/* Testimonial Carousel */}
        <div style={{ marginTop: "12px" }}>
          <SalespodTestimonialCarousel />
        </div>

      </motion.div>

      {/* ── FOLD 11: QUESTIONS · BEFORE YOU DECIDE (FAQ) ── */}
      <motion.div
        className="sp-section-wrapper"
        style={{ borderTop: "1px solid var(--color-border-faint)" }}
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        
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
          <motion.button
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="sp-faq-bottom-btn"
            onClick={() => window.open("https://calendar.app.google/DhM4emV5aoPSqpDt8", "_blank")}
          >
            <span>Book a Call</span>
            <span style={{ fontSize: "12px", fontWeight: 700 }}>→</span>
          </motion.button>
        </div>
      </motion.div>

      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        zipFile="/downloads/AI-Powered-Outbound-Sales-Automation.pdf"
        zipName="AI-Powered-Outbound-Sales-Automation.pdf"
        title="Download the Free Feature Guide"
        workflowType="sales_workflow"
        sourceType="landing_page"
        sourceName="Sales Workflow Automation Solution Page"
      />

      <AuditModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        title={auditModalTitle}
        sourceName={auditModalSourceName}
        isSalesPod={true}
      />


    </BeamsBackground>
  );
}
