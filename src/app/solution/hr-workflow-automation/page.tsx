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
  Play,
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
const CalendlyModal = dynamic(() => import("@/components/ui/CalendlyModal"), { ssr: false });
import TestimonialCarousel from "@/components/ui/TestimonialCarousel";
import { BrandsMarquee } from "@/components/sections/Sections";
import "./hrpod.css";

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

const hrGoals = [
  "Fully Autonomous Screening",
  "AI Resume Intelligence",
  "Interview Scheduling Pod",
  "Offer & Onboarding Automation",
];

const CALENDLY_URL = "https://calendly.com/raunak-scalepods/discovery-call-from-salespod-landing-page";

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

        {/* Central Node: HRPod Core */}
        <circle cx="300" cy="200" r="32" fill="var(--color-bg-card)" stroke="var(--sp-accent)" strokeWidth="2" />
        <text x="300" y="204" textAnchor="middle" fill="var(--sp-accent)" fontSize="10px" fontWeight="700" letterSpacing="0.05em">POD CORE</text>

        {/* Orbit Connection lines */}
        <line x1="300" y1="200" x2="160" y2="100" stroke="var(--color-border-faint)" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="300" y1="200" x2="440" y2="100" stroke="var(--color-border-faint)" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="300" y1="200" x2="160" y2="300" stroke="var(--color-border-faint)" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="300" y1="200" x2="440" y2="300" stroke="var(--color-border-faint)" strokeWidth="1.5" strokeDasharray="4 4" />

        {/* Node 1: ATS */}
        <circle cx="160" cy="100" r="28" fill="var(--color-bg-card)" stroke="var(--color-border)" strokeWidth="1.5" />
        <text x="160" y="104" textAnchor="middle" fill="var(--color-text-bright)" fontSize="9px" fontWeight="600">ENTERPRISE ATS</text>

        {/* Node 2: Communication */}
        <circle cx="440" cy="100" r="28" fill="var(--color-bg-card)" stroke="var(--color-border)" strokeWidth="1.5" />
        <text x="440" y="104" textAnchor="middle" fill="var(--color-text-bright)" fontSize="9px" fontWeight="600">ALERTS & CHAT</text>

        {/* Node 3: Job Boards */}
        <circle cx="160" cy="300" r="28" fill="var(--color-bg-card)" stroke="var(--color-border)" strokeWidth="1.5" />
        <text x="160" y="304" textAnchor="middle" fill="var(--color-text-bright)" fontSize="9px" fontWeight="600">JOB BOARDS</text>

        {/* Node 4: Talent Database */}
        <circle cx="440" cy="300" r="28" fill="var(--color-bg-card)" stroke="var(--color-border)" strokeWidth="1.5" />
        <text x="440" y="304" textAnchor="middle" fill="var(--color-text-bright)" fontSize="9px" fontWeight="600">TALENT DB</text>

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

        {/* Animated Data Packets */}
        <motion.path 
          d={p1} 
          fill="none" 
          stroke="var(--sp-accent)" 
          strokeWidth="1.5" 
          strokeDasharray="4 6"
          animate={{ strokeDashoffset: [20, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          strokeOpacity="0.6"
        />
        <motion.path 
          d={p2} 
          fill="none" 
          stroke="var(--sp-accent)" 
          strokeWidth="1.5" 
          strokeDasharray="4 6"
          animate={{ strokeDashoffset: [20, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
          strokeOpacity="0.6"
        />
        <motion.path 
          d={p3} 
          fill="none" 
          stroke="var(--sp-accent)" 
          strokeWidth="1.5" 
          strokeDasharray="4 6"
          animate={{ strokeDashoffset: [20, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.3 }}
          strokeOpacity="0.6"
        />
        <motion.path 
          d={p4} 
          fill="none" 
          stroke="var(--sp-accent)" 
          strokeWidth="1.5" 
          strokeDasharray="4 6"
          animate={{ strokeDashoffset: [20, 0] }}
          transition={{ duration: 1.7, repeat: Infinity, ease: "linear", delay: 0.8 }}
          strokeOpacity="0.6"
        />

        {/* INPUT NODE 1 */}
        <g transform="translate(20, 40)">
          <rect width="130" height="64" rx="8" ry="8" fill="var(--color-bg-card)" stroke="var(--color-border)" strokeWidth="1" />
          <text x="12" y="20" fill="var(--color-text-muted)" fontSize="9" fontWeight="700" letterSpacing="0.05em">RESUME FEED</text>
          <text x="12" y="38" fill="var(--color-text-bright)" fontSize="12" fontWeight="500">Applicant Stream</text>
          <circle cx="16" cy="50" r="2.5" fill="var(--color-green)" />
          <text x="24" y="53" fill="var(--color-text-faint)" fontSize="9">Active Scan</text>
        </g>

        {/* INPUT NODE 2 */}
        <g transform="translate(20, 276)">
          <rect width="130" height="64" rx="8" ry="8" fill="var(--color-bg-card)" stroke="var(--color-border)" strokeWidth="1" />
          <text x="12" y="20" fill="var(--color-text-muted)" fontSize="9" fontWeight="700" letterSpacing="0.05em">ATS PARSER</text>
          <text x="12" y="38" fill="var(--color-text-bright)" fontSize="12" fontWeight="500">Profile Intake</text>
          <circle cx="16" cy="50" r="2.5" fill="var(--color-green)" />
          <text x="24" y="53" fill="var(--color-text-faint)" fontSize="9">Synchronized</text>
        </g>

        {/* CENTRAL HUB NODE */}
        <g transform="translate(180, 150)">
          <rect width="160" height="80" rx="10" ry="10" fill="var(--color-bg-card-alt)" stroke="var(--sp-accent)" strokeWidth="1.5" style={{ filter: "drop-shadow(0 0 10px rgba(var(--sp-accent-rgb), 0.08))" }} />
          <text x="80" y="24" textAnchor="middle" fill="var(--sp-accent)" fontSize="9" fontWeight="700" letterSpacing="0.1em">CORE PIPELINE</text>
          <text x="80" y="44" textAnchor="middle" fill="var(--color-text-bright)" fontSize="13" fontWeight="600">HRPod Engine</text>
          
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
          <text x="12" y="20" fill="var(--color-text-muted)" fontSize="9" fontWeight="700" letterSpacing="0.05em">SCHEDULING ROUTER</text>
          <text x="12" y="38" fill="var(--color-text-bright)" fontSize="11" fontWeight="500">Calendar Loops</text>
          <circle cx="16" cy="50" r="2.5" fill="var(--sp-accent)" />
          <text x="24" y="53" fill="var(--color-text-faint)" fontSize="9">Self-booking Active</text>
        </g>

        {/* OUTPUT NODE 2 */}
        <g transform="translate(370, 276)">
          <rect width="130" height="64" rx="8" ry="8" fill="var(--color-bg-card)" stroke="var(--color-border)" strokeWidth="1" />
          <text x="12" y="20" fill="var(--color-text-muted)" fontSize="9" fontWeight="700" letterSpacing="0.05em">COMPLIANCE SYNC</text>
          <text x="12" y="38" fill="var(--color-text-bright)" fontSize="12" fontWeight="500">Onboarding Flow</text>
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
  }
];

const capabilitiesData = [
  {
    chapter: "Chapter 01",
    eyebrow: "Talent Acquisition & Intake",
    title: "Consolidated Candidate Sourcing & Pipeline Intake",
    desc: "HRPod captures, aggregates, and organizes candidate applications from every channel into a unified pipeline.",
    video: "/videos/hrpod/1.mp4",
    points: [
      {
        title: "Configure Hiring Campaigns",
        body: "Launch structured hiring sprints with automated stages, timelines, and screening parameters."
      },
      {
        title: "Consolidate Candidate Intake",
        body: "Aggregate applicants from job boards, internal databases, referrals, and external agencies."
      },
      {
        title: "Centralize & Deduplicate Profiles",
        body: "Clean candidate listings automatically by identifying, merging, and syncing overlapping entries."
      }
    ]
  },
  {
    chapter: "Chapter 02",
    eyebrow: "AI Resume Screening",
    title: "AI Screening & Resume Candidate Intelligence",
    desc: "Evaluate applications instantly against your hiring parameters using highly-precise semantic models.",
    video: "/videos/hrpod/2.mp4",
    points: [
      {
        title: "Analyze Resumes Instantly",
        body: "Evaluate core competencies, work history, education, and credentials against role descriptions."
      },
      {
        title: "Candidate Evaluation & Scoring",
        body: "Provide a logical role-fit grade and profile summary highlighting matches and areas of concern."
      },
      {
        title: "Generate Interview Frameworks",
        body: "Build customized, candidate-specific interview guides targeting highlighted skill sets and queries."
      }
    ]
  },
  {
    chapter: "Chapter 03",
    eyebrow: "Interview Scheduling",
    title: "Autonomous Interview Management & Coordination",
    desc: "Remove the manual friction from schedule coordination. HRPod secures candidate slots in seconds.",
    video: "/videos/hrpod/3.mp4",
    points: [
      {
        title: "Manage Custom Pipelines",
        body: "Track applicant progression through user-friendly stages synchronized with your ATS data."
      },
      {
        title: "Automate Schedule Slots",
        body: "Dispatch smart self-scheduling links that align dynamically with interviewer calendars."
      },
      {
        title: "Auto-Coordinate Reminders",
        body: "Send automatic calendar updates, details, and context guides for zero no-shows."
      }
    ]
  },
  {
    chapter: "Chapter 04",
    eyebrow: "Evaluation & Approvals",
    title: "Structured Evaluation & Shared Approvals",
    desc: "Maintain a standard and compliant hiring decision workflow backed by objective digital scorecards.",
    video: "/videos/hrpod/4.mp4",
    points: [
      {
        title: "Streamline Multi-Round Pipelines",
        body: "Establish sequential rounds with distinct interviewer focus areas and automated transitions."
      },
      {
        title: "Capture Digital Scorecards",
        body: "Synthesize team feedback in real time through structured, easy-to-use digital assessment forms."
      },
      {
        title: "Route Hierarchical Approvals",
        body: "Dispatch automated validation requests through custom leadership and budget hierarchies."
      }
    ]
  },
  {
    chapter: "Chapter 05",
    eyebrow: "Offers & Onboarding",
    title: "Accelerated Offers & Integrated Onboarding",
    desc: "Transition candidates from interview success to day-one readiness with zero manual oversight.",
    video: "/videos/hrpod/5.mp4",
    points: [
      {
        title: "Draft Verified Offer Letters",
        body: "Generate customized contracts instantly pulling parameters directly from approved scorecards."
      },
      {
        title: "Monitor Electronic Signatures",
        body: "Deliver offers and trigger automated candidate alerts for pending signature submissions."
      },
      {
        title: "Launch Automated Onboarding",
        body: "Trigger secure credentials generation, background checks, and setup tasks post-signature."
      }
    ]
  },
  {
    chapter: "Chapter 06",
    eyebrow: "HR Analytics",
    title: "HR Operations Dashboard & Strategic Intelligence",
    desc: "Identify pipeline bottlenecks, assess time-to-hire metrics, and measure overall source ROI.",
    video: "/videos/hrpod/6.mp4",
    points: [
      {
        title: "Track End-to-End Analytics",
        body: "View source performance, role velocity, drop-off rates, and recruiter workloads inside one hub."
      },
      {
        title: "Automate Executive Reports",
        body: "Export formatted recruitment activity summaries for team syncs and budget planning sessions."
      },
      {
        title: "Optimize Workforce Planning",
        body: "Leverage historic data trends to forecast team onboarding timelines and hiring velocity."
      }
    ]
  },
  {
    chapter: "Chapter 07",
    eyebrow: "AI Assistant",
    title: "Natural Language AI HR Assistant",
    desc: "Access hiring database details instantly. Filter lists and run intelligence queries on demand.",
    video: "/videos/hrpod/7.mp4",
    points: [
      {
        title: "Query Data Naturally",
        body: "Identify top candidate fits or check role status using everyday English prompts."
      },
      {
        title: "Audit Process Bottlenecks",
        body: "Let the AI assistant point out exactly where candidates are getting stuck in the pipeline."
      },
      {
        title: "Generate Smart Selection Notes",
        body: "Get draft summaries comparing shortlists to assist hiring managers in final decisions."
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
            video.currentTime = 0;
            updateProgressDOM();
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
            <div style={{ position: "relative", width: "120px", height: "30px", opacity: 0.85 }}>
              <Image
                src="/scalepods-navbar-logo.png"
                alt="ScalePods Logo"
                fill
                style={{ objectFit: "contain" }}
                sizes="120px"
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "rgba(255, 255, 255, 0.7)" }}>
              <Loader2 className="animate-spin" size={16} style={{ color: "var(--sp-accent)" }} />
              <span style={{ fontSize: "12px", fontWeight: 500, letterSpacing: "0.05em", fontFamily: "Inter, sans-serif" }}>
                PREPARING EXPERIENCE...
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isVideoReady && !isPlaying && (
        <div 
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0, 0, 0, 0.35)",
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(2px)",
            pointerEvents: "none",
            transition: "opacity 0.2s ease"
          }}
        >
          <div 
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.15)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)"
            }}
          >
            <Play size={20} style={{ color: "#ffffff", fill: "#ffffff", marginLeft: "2px" }} />
          </div>
        </div>
      )}

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

      {isVideoReady && (
        <div 
          className="sp-video-timeline-container"
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "absolute",
            bottom: "18px",
            left: "16px",
            right: "64px",
            display: "flex",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <input 
            ref={timelineRef}
            type="range"
            min={0}
            max={duration || 1}
            step={0.01}
            defaultValue={0}
            onChange={handleTimelineChange}
            className="sp-video-timeline"
          />
        </div>
      )}

      {isVideoReady && (
        <button
          onClick={toggleMute}
          style={{
            position: "absolute",
            bottom: "12px",
            right: "12px",
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
            video.currentTime = 0;
            updateProgressDOM();
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
      className="sp-demo-video-wrapper" 
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
        className="sp-demo-video"
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
            <div style={{ position: "relative", width: "120px", height: "30px", opacity: 0.85 }}>
              <Image
                src="/scalepods-navbar-logo.png"
                alt="ScalePods Logo"
                fill
                style={{ objectFit: "contain" }}
                sizes="120px"
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "rgba(255, 255, 255, 0.7)" }}>
              <Loader2 className="animate-spin" size={16} style={{ color: "var(--sp-accent)" }} />
              <span style={{ fontSize: "12px", fontWeight: 500, letterSpacing: "0.05em", fontFamily: "Inter, sans-serif" }}>
                PREPARING DEMO EXPERIENCE...
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isVideoReady && !isPlaying && (
        <div 
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0, 0, 0, 0.35)",
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(2px)",
            pointerEvents: "none",
            transition: "opacity 0.2s ease"
          }}
        >
          <div 
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.15)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)"
            }}
          >
            <Play size={24} style={{ color: "#ffffff", fill: "#ffffff", marginLeft: "3px" }} />
          </div>
        </div>
      )}

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

      {isVideoReady && (
        <div 
          className="sp-video-timeline-container"
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "absolute",
            bottom: "22px",
            left: "20px",
            right: "72px",
            display: "flex",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <input 
            ref={timelineRef}
            type="range"
            min={0}
            max={duration || 1}
            step={0.01}
            defaultValue={0}
            onChange={handleTimelineChange}
            className="sp-video-timeline"
          />
        </div>
      )}

      {isVideoReady && (
        <button
          onClick={toggleMute}
          style={{
            position: "absolute",
            bottom: "16px",
            right: "16px",
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

function HRPodTestimonialCarousel() {
  return <TestimonialCarousel reviews={salespodReviews} />;
}

export default function HRWorkflowAutomationPage() {
  const isMobile = useMobile();
  const { resolvedTheme } = useTheme();

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    goal: "Fully Autonomous Screening",
    phone: "",
    countryCode: "+1",
    customCode: "",
    website: "", // Honeypot
  });

  const [loading, setLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState("Initializing payload...");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const [showGoalPicker, setShowGoalPicker] = useState(false);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isCalendlyModalOpen, setIsCalendlyModalOpen] = useState(false);

  const [auditModalTitle, setAuditModalTitle] = useState("Pre-Configure Your HR Pod");
  const [auditModalSourceName, setAuditModalSourceName] = useState("HR Workflow Automation solution page");

  const countryPickerRef = useRef<HTMLDivElement>(null);
  const goalPickerRef = useRef<HTMLDivElement>(null);

  useCountryDetection(
    countries,
    useCallback((code: string) => setForm(prev => ({ ...prev, countryCode: code })), []),
    useCallback((code: string) => setForm(prev => ({ ...prev, customCode: code })), [])
  );

  // Click Outside hooks for dropdowns
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

  // Mock status loader for premium user feedback
  const runStatusUpdates = async () => {
    const messages = [
      "Configuring screening model...",
      "Setting resume score parameters...",
      "Mapping calendar triggers...",
      "Syncing with ATS webhook schema...",
      "Registering your HR Pod..."
    ];

    for (const msg of messages) {
      setLoadingStatus(msg);
      await new Promise(r => setTimeout(r, 600));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Cooldown check to prevent abuse
    const cooldown = localStorage.getItem("scalepods_cooldown_hrpod");
    if (cooldown && Date.now() - parseInt(cooldown) < 120000) {
      setError("Please wait 2 minutes before submitting another configuration.");
      setLoading(false);
      return;
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
      workflowType: "hr_workflow",
      sourcePage: "/solution/hr-workflow-automation",
      name: form.name,
      email: form.email,
      phone: form.phone ? `${dialCode} ${form.phone}` : undefined,
      company: form.company,
      message: `HR Automation Goal: ${form.goal}`,
      website: form.website,
      metadata: {
        goal: form.goal,
        platform: "HR Workflow Automation Solution Page",
        workflow: "hr_workflow"
      }
    });

    const [, apiResult] = await Promise.all([statusPromise, apiPromise]);

    setLoading(false);

    if (!apiResult.success) {
      setError(apiResult.error || "Submission failed. Please verify connection and try again.");
    } else {
      localStorage.setItem("scalepods_cooldown_hrpod", Date.now().toString());
      setSubmitted(true);
      const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({ event: "lead_form_success", form_type: "contact_sales", source_page: "/solution/hr-workflow-automation" });
    }
  };

  return (
    <BeamsBackground className="hrpod-container" hues={[135, 110]}>
      {/* Soft Ambient Cool Green Glow Overlay */}
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
                AI-Powered HR Engine
              </span>
            </div>

            {/* Content Heading */}
            <h1 className="sp-hero-title" style={{ textAlign: "center", width: "100%" }}>
              Automate Your Hiring{" "}
              <br className="sp-hero-desk-br" />
              Process &amp; Build Your{" "}
              <br className="sp-hero-br" />
              Dream Team Faster.
            </h1>

            {/* Subtext */}
            <div className="sp-hero-desc" style={{ textAlign: "center", marginBottom: isMobile ? "24px" : "32px", marginInline: "auto" }}>
              <p style={{ margin: 0 }}>
                Deploy autonomous HR Pods that configure, screen, evaluate, and schedule candidates automatically.
              </p>
              <p style={{ margin: "8px 0 0 0", opacity: 0.85 }}>
                Scale your hiring velocity without scaling your overhead.
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
                "Autonomous Candidate Screening",
                "AI-Powered Resume Scoring",
                "Zero-Chase Interview Scheduling",
                "Onboarding & Analytics Dashboard"
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
              <motion.a
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                href="#deployment-form"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("deployment-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
                className="sp-hero-cta-btn"
                style={{
                  width: "fit-content",
                  minWidth: "250px",
                }}
              >
                Book a Hiring Automation Audit →
              </motion.a>
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
                    Configuration Confirmed
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
                    Your HRPod configurations have been pre-registered. An integration specialist will reach out shortly to demo the customized hiring workflows.
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
                      Configure Your HR Pod
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
                      Primary Hiring Goal
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
                          {hrGoals.map((g, idx) => (
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

                  {/* Submitting status message */}
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
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#76B852] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#76B852]"></span>
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
                        {loading ? "Configuring pod..." : "Configure HR Pod"}
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
            The ultimate hiring engine <br />
            for <span style={{ fontFamily: "var(--font-serif), 'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: "var(--sp-accent)" }}>modern HR teams</span>.
          </h2>

          <p className="sp-hero-desc" style={{ marginLeft: "auto", marginRight: "auto", marginBottom: "0" }}>
            Turn your HR department into a predictable talent acquisition and onboarding engine.
            <br /><br />
            Step into the next generation of automated excellence.
          </p>
        </div>

        {/* Main Trust Metrics Grid */}
        <div className="sp-metrics-grid">
          
          <div className="sp-metric-block">
            <div className="sp-metric-number">10×</div>
            <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--color-text-bright)", marginBottom: "6px" }}>Faster Candidate Screening</div>
            <div style={{ fontSize: "12.5px", color: "var(--color-text-body)" }}>evaluate profiles in real time</div>
          </div>

          <div className="sp-metric-block">
            <div className="sp-metric-number">80%</div>
            <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--color-text-bright)", marginBottom: "6px" }}>Less Manual Coordination</div>
            <div style={{ fontSize: "12.5px", color: "var(--color-text-body)" }}>zero calendar chasing required</div>
          </div>

          <div className="sp-metric-block">
            <div className="sp-metric-number">5 hrs</div>
            <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--color-text-bright)", marginBottom: "6px" }}>Saved Per Recruiter / Wk</div>
            <div style={{ fontSize: "12.5px", color: "var(--color-text-body)" }}>more time for high-value hires</div>
          </div>

        </div>

      </div>


      {/* ── FOLD 3: PRODUCT DEMO ── */}
      <div className="sp-section-wrapper sp-demo-section" style={{ borderTop: "1px solid var(--color-border-faint)" }}>
        
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

      </div>

      {/* ── FOLDS 4+: WHAT HRPOD DOES ── */}
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
            Your AI-Powered HR Engine
          </h2>

          <p className="sp-hero-desc" style={{ marginLeft: "auto", marginRight: "auto" }}>
            From candidate intake and AI scoring to automated scheduling and onboarding — HRPod streamlines the entire recruitment workflow.
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
                  <span className="sp-capability-eyebrow">
                    {cap.chapter} // {cap.eyebrow}
                  </span>
                  <h3 className="sp-capability-title">
                    {cap.title}
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

        {/* BOTTOM STATS ROW */}
        <div className="sp-engine-metrics-bar" style={{ marginTop: "56px", marginBottom: "0px" }}>
          <div className="sp-engine-metric-item">
            <div className="sp-engine-metric-val">10×</div>
            <div className="sp-engine-metric-label">More candidates screened</div>
          </div>
          <div className="sp-engine-metric-item">
            <div className="sp-engine-metric-val">0</div>
            <div className="sp-engine-metric-label">Manual follow-ups</div>
          </div>
          <div className="sp-engine-metric-item">
            <div className="sp-engine-metric-val">&lt; 48h</div>
            <div className="sp-engine-metric-label">Brief to Interview scheduling</div>
          </div>
        </div>

      </div>

      {/* ── FOLD 7: STATS & BENEFITS ── */}
      <div className="sp-section-wrapper" style={{ borderTop: "1px solid var(--color-border-faint)", position: "relative", paddingBottom: "56px" }}>
        
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
            Built to Scale Your Recruitment Pipeline Across Every Role
          </h2>

          <p className="sp-hero-desc" style={{ marginLeft: "auto", marginRight: "auto" }}>
            HRPod combines candidate screening, AI scoring, and interview scheduling to help teams secure top talent without administrative overhead.
          </p>
        </div>

        {/* STATS SECTION */}
        <div className="sp-stats-grid">
          
          <motion.div 
            className="sp-stat-card"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="sp-stat-num">48h</div>
            <div className="sp-stat-desc">
              <strong style={{ color: "var(--color-text-bright)", display: "block", marginBottom: "4px" }}>Brief to Interview</strong>
              Setup hiring campaigns and get interview slots booked within two days.
            </div>
          </motion.div>

          <motion.div 
            className="sp-stat-card"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="sp-stat-num">10×</div>
            <div className="sp-stat-desc">
              <strong style={{ color: "var(--color-text-bright)", display: "block", marginBottom: "4px" }}>Volume Capacity</strong>
              Multiply candidate screening capability without expanding your HR staff.
            </div>
          </motion.div>

          <motion.div 
            className="sp-stat-card"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="sp-stat-num">80%</div>
            <div style={{ color: "var(--color-text-body)", fontSize: "13px", lineHeight: "1.5" }}>
              <strong style={{ color: "var(--color-text-bright)", display: "block", marginBottom: "4px" }}>Coordination Reduction</strong>
              Eliminate calendar coordination threads, double-booking, and candidate no-shows.
            </div>
          </motion.div>

          <motion.div 
            className="sp-stat-card"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="sp-stat-num">100%</div>
            <div className="sp-stat-desc">
              <strong style={{ color: "var(--color-text-bright)", display: "block", marginBottom: "4px" }}>Objective Shortlisting</strong>
              Consistent assessment rules apply to all resumes for complete equity.
            </div>
          </motion.div>

        </div>

        {/* WHY HR TEAMS USE HRPOD */}
        <div className="sp-why-use-wrapper">
          <h3 className="sp-why-use-title">Why Talent Teams Use HRPod</h3>
          
          <div className="sp-why-use-grid">
            <div className="sp-why-use-item">
              <h4 className="sp-why-use-item-title">Objective Screenings</h4>
              <p className="sp-why-use-item-desc">Every candidate is scored strictly on talent and skill parameters.</p>
            </div>
            <div className="sp-why-use-item">
              <h4 className="sp-why-use-item-title">Zero Tool-Switching</h4>
              <p className="sp-why-use-item-desc">Manage candidate intake, calendar sync, and evaluation within one portal.</p>
            </div>
            <div className="sp-why-use-item">
              <h4 className="sp-why-use-item-title">No-Chase Schedules</h4>
              <p className="sp-why-use-item-desc">HRPod routes verified applicants directly to the interviewer's calendar.</p>
            </div>
            <div className="sp-why-use-item">
              <h4 className="sp-why-use-item-title">Data-Backed Offers</h4>
              <p className="sp-why-use-item-desc">Generate offer contracts dynamically based on verified round performance.</p>
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
              <span>Download the HR Feature Guide</span>
              <span style={{ fontSize: "14px", fontWeight: 700 }}>→</span>
            </motion.button>
          </div>
        </div>

      </div>

      {/* ── FOLD 8: COMPARISON ── */}
      <div className="sp-section-wrapper" style={{ borderTop: "1px solid var(--color-border-faint)", paddingTop: "20px", paddingBottom: "20px" }}>
        
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
            Manual vs Automated Recruitment Workflow
          </h2>

          <p className="sp-hero-desc" style={{ fontSize: "13px", lineHeight: "1.4", margin: "0 auto", color: "var(--color-text-muted)", maxWidth: "600px" }}>
            Integrate HR Automation in your workflow to drive exponential results.
          </p>
        </div>

        {/* Two-Column Comparison */}
        <div className="sp-comparison-layout">
          
          {/* LEFT HEADER */}
          <div className="sp-comp-col-header automated-header">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#76B852] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#76B852]"></span>
            </span>
            <span>Automated HRPod Workflow</span>
          </div>

          {/* LEFT CARDS */}
          {[
            "AI automatically configures complete hiring campaigns ready for immediate launch.",
            "System automatically extracts metrics from intake files and screens profiles instantly.",
            "System automatically aggregates weighted scoring into a prioritized candidate shortlist.",
            "System automatically dispatches self-scheduling links the moment a candidate is approved.",
            "Campaign data automatically feeds a unified dashboard to optimize future hiring."
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
            <span>Traditional Manual Workflow</span>
          </div>

          {/* RIGHT CARDS */}
          {[
            "Teams manually build criteria and chase stakeholder approvals before screening begins.",
            "Teams manually review resumes and conduct unstructured, bias-prone phone screens.",
            "Teams manually track subjective feedback scattered across emails and spreadsheets.",
            "Teams manage endless back-and-forth emails to align recruiter and candidate calendars.",
            "Performance metrics require manual data synthesis from siloed ATS platforms."
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
          <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-text-bright)", margin: 0, textAlign: "left", lineHeight: "1.4" }}>
            Your team is great at hiring. <span style={{ color: "var(--color-text-muted)", fontWeight: 400 }}>HRPod makes sure they spend their time on people, not paperwork.</span>
          </p>
          <motion.button 
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="sp-comp-bottom-btn"
            onClick={() => {
              setAuditModalTitle("Pre-Configure Your HR Pod");
              setAuditModalSourceName("HR Workflow Automation - Strategic Comparison");
              setIsAuditModalOpen(true);
            }}
          >
            <span>See how it works</span>
            <span style={{ fontSize: "12px", fontWeight: 700 }}>→</span>
          </motion.button>
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
            Your team deserves a <br />
            <span style={{ fontFamily: "var(--font-serif), 'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: "var(--sp-accent)" }}>faster hiring loop</span>.
          </h2>

          <p className="sp-final-cta-desc">
            HRPod builds and runs the full screening and scheduling system for you, so your recruiters focus on interview outcomes, not administration.
          </p>

          <motion.button 
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="sp-final-cta-btn"
            onClick={() => {
              setAuditModalTitle("Book a Hiring Automation Audit");
              setAuditModalSourceName("HR Workflow Automation - Final CTA");
              setIsAuditModalOpen(true);
            }}
          >
            <span>Get Free Hiring Process Audit</span>
            <span style={{ fontSize: "14px", fontWeight: 700, marginLeft: "8px" }}>→</span>
          </motion.button>
        </div>
      </div>

      {/* ── FOLD 10: TESTIMONIALS ── */}
      <div className="sp-section-wrapper" style={{ borderTop: "1px solid var(--color-border-faint)" }}>
        
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
          <HRPodTestimonialCarousel />
        </div>

      </div>

      {/* ── FOLD 11: FAQ ── */}
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
              q: "What is HR hiring automation?",
              a: "HR hiring automation is the integration of AI-powered workflows to manage and streamline repetitive recruitment tasks. This includes automating candidate intake, scanning resume fit, scoring experience semantically, scheduling calls automatically based on interviewer calendars, and sending follow-up prompts."
            },
            {
              q: "What are the benefits of HR automation?",
              a: "HR automation significantly reduces recruiter administrative overhead, improves time-to-hire velocity, minimizes calendar scheduling conflicts, establishes consistent objective evaluation parameters, and ensures high-potential candidates do not fall through the cracks."
            },
            {
              q: "How do you measure the ROI of HR automation?",
              a: "ROI is measured by tracking key recruitment metrics: decrease in hours spent on manual email scheduling and follow-ups, speed increase from application received to booked interview, reduction in candidate drop-off rates, and saving recruiter/hiring manager hours."
            },
            {
              q: "How does AI automated screening work?",
              a: "Our AI systems evaluate candidate resumes against predefined role scorecards. HRPod does not make black-box hiring decisions; it acts as a smart copilot that filters profiles based on skills and criteria, scoring them to build a structured candidate intelligence summary."
            },
            {
              q: "How quickly can AI automation be set up for a new role?",
              a: "HRPod campaigns can be configured in a few minutes. Recruiter and manager availability defaults can be mapped instantly, allowing talent acquisitions teams to launch candidate campaigns, sync their ATS data, and begin screening profiles immediately."
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
            onClick={() => setIsCalendlyModalOpen(true)}
          >
            <span>Book a Call</span>
            <span style={{ fontSize: "12px", fontWeight: 700 }}>→</span>
          </motion.button>
        </div>
      </div>

      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        zipFile="/downloads/hr-guide.pdf"
        zipName="hr-guide.pdf"
        title="Download the Free HR Feature Guide"
        workflowType="hr_workflow"
        sourceType="landing_page"
        sourceName="HR Workflow Automation Solution Page"
      />

      <AuditModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        title={auditModalTitle}
        sourceName={auditModalSourceName}
        isSalesPod={false}
      />

      <CalendlyModal
        isOpen={isCalendlyModalOpen}
        onClose={() => setIsCalendlyModalOpen(false)}
        url={CALENDLY_URL}
      />

    </BeamsBackground>
  );
}
