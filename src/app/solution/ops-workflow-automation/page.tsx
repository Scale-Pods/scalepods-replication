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
  Pause,
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
const TestimonialCarousel = dynamic(() => import("@/components/ui/TestimonialCarousel"), { ssr: false });
import { BrandsMarquee } from "@/components/sections/Sections";
import ClaudePartnership from "@/components/sections/ClaudePartnership";
import OpenAIPartnership from "@/components/sections/OpenAIPartnership";
import "./opspod.css";

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

const opsGoals = [
  "Document & Invoice Ingestion Engine",
  "Cross-Departmental Process Routing",
  "Vendor & Partner Onboarding Automation",
  "IT Infrastructure & Security Automation",
  "ERP & WMS Data Synchronization",
  "Operational Audit & Compliance Tracking",
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


const salespodReviews = [
  {
    name: "Zameer Lokhandwala",
    title: "Managing Director at Z.V Steels Pvt. Ltd",
    location: "India",
    countryCode: "in",
    quote: "“We were a large, four-generation manufacturing business and ScalePods was a young startup when we first hired them — a bit of a leap of faith on our part. It paid off. We started with HR recruitment automation, and Adnan and Raunak built it around our actual process instead of handing us something off the shelf, weaving in Claude to handle resume screening and candidate shortlisting intelligently rather than with rigid keyword rules. Screening effort dropped 70-80%, and interview scheduling went from 1-2 days to under 30 minutes. That got us comfortable enough to bring them into three more parts of the business — purchase and sales audits, material quality checks, and sales outreach for our group company. Every time, same experience: responsive, custom-built, and never once did we have to chase them for a fix or an update. Four projects in, this feels less like a vendor we hired and more like a team we grew alongside. Recommended without hesitation.”",
    image: "/reviews/Zameer Lokhandwala.webp",
    expanded: true
  },
  {
    name: "Akarsh Arora",
    title: "Founder & CEO at A SQUARED REAL ESTATE",
    location: "UAE",
    countryCode: "ae",
    quote: "“Scalepods helped me automate my business processes using Claude, making everything much faster and more efficient. Highly recommended!”",
    image: "/reviews/Akarsh Arora.webp"
  },
  {
    name: "Vinay Kumar",
    title: "Managing Director at LOTUS MANOR REAL ESTATE L.L.C, DUBAI.",
    location: "Dubai, UAE",
    countryCode: "ae",
    quote: "“We needed an AI agent that wouldn't embarrass us in front of investors. Scalepods delivered it — and made the process easy. They were quick to respond, quick to iterate, and treated our launch deadline like their own. The kind of partner you want when the work has to be right and the timeline is tight.”",
    image: "/reviews/Vinay Kumar.webp"
  },
  {
    name: "Joaquin Cornejo",
    title: "Controller at MACRO",
    location: "Los Angeles, USA",
    countryCode: "us",
    quote: "“Very fast and competent team. I got too busy with other work to be able to keep up with their pace. I will rehire them once I free up.”",
    image: "/reviews/joaquin-cornejo-v2.webp"
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
    image: "/reviews/TASLIM.webp",
    expanded: true
  }
];

const capabilitiesData = [
  {
    chapter: "Chapter 01",
    eyebrow: "Document Ingestion",
    title: "Document & Unstructured Data Ingestion Engine",
    desc: "Processing heavy volumes of physical or digital records creates severe operational drag. Deploying document workflow automation allows organizations to extract, classify, and parse inbound contracts, vendor invoices, and compliance forms automatically. Coupling vision parsing with automated data processing ensures structured data flows seamlessly into enterprise databases without demanding tedious manual copy-pasting from operational staff.",
    video: "/videos/opspod/1.mp4",
    points: [
      {
        title: "Optical Document Parsing",
        body: "Extract text, key fields, and table line-items from incoming PDF invoices, POs, and legal contracts automatically."
      },
      {
        title: "Validation & Exception Routing",
        body: "Cross-verify extracted fields against existing database records, routing edge-case discrepancies directly to human reviewers."
      },
      {
        title: "System-Wide Database Synchronization",
        body: "Update core systems of record instantly upon document confirmation without administrative delays."
      },
      {
        title: "Audit-Compliant Archiving",
        body: "Tag and index digital documents automatically to satisfy regulatory record-keeping standards."
      }
    ]
  },
  {
    chapter: "Chapter 02",
    eyebrow: "Process Optimization",
    title: "End-to-End Business Process Optimization",
    desc: "Scale operations smoothly without inflating headcounts or administrative costs. Utilizing targeted business process automation tools helps operations managers link separate departments together into unified workflows. With tailored AI business process automation solutions, teams eliminate internal bottlenecks, speed up approval cycles, and establish crystal-clear operational accountability.",
    video: "/videos/opspod/2.mp4",
    points: [
      {
        title: "Cross-Departmental Task Routing",
        body: "Hand off tasks between finance, legal, and fulfillment teams automatically based on predefined logic rules."
      },
      {
        title: "Real-Time Process Monitoring",
        body: "Identify internal execution delays and bottlenecks before they disrupt customer deliverables."
      },
      {
        title: "Custom Logic Decision Trees",
        body: "Implement rule-based routing paths tailored specifically to your organization's operating governance."
      },
      {
        title: "SLA Enforcement Triggers",
        body: "Notify department managers and reassign urgent approval requests when SLA thresholds are breached."
      }
    ]
  },
  {
    chapter: "Chapter 03",
    eyebrow: "Resource Execution",
    title: "Enterprise Operations & Resource Execution",
    desc: "Achieving high operating margins requires systematic coordination across all business units. Implementing a customized Ops automation framework transforms daily administrative burden into streamlined digital tasks. Modern automation tools for business empower leaders to enforce standardized quality control across every operational touchpoint.",
    video: "/videos/opspod/3.mp4",
    points: [
      {
        title: "Vendor & Partner Onboarding",
        body: "Collect tax forms, banking details, and compliance certifications automatically through interactive portals."
      },
      {
        title: "Resource Allocation Tracking",
        body: "Assign personnel and physical assets dynamically based on real-time project demand."
      },
      {
        title: "Internal SLA Escalations",
        body: "Trigger automated alerts when internal request tickets exceed expected turnaround times."
      },
      {
        title: "Quality Control Audit Logging",
        body: "Capture complete historical logs for every operational step to maintain strict compliance oversight."
      }
    ]
  },
  {
    chapter: "Chapter 04",
    eyebrow: "Intelligent Automation",
    title: "Intelligent Resource Deployment & AI Systems",
    desc: "Integrate adaptive decision-making into core operational workflows. Modern leaders leverage specialized intelligent automation tools alongside practical business AI solutions to handle complex data evaluation tasks, optimize inventory levels, and forecast operational needs accurately.",
    video: "/videos/opspod/4.mp4",
    points: [
      {
        title: "Predictive Demand Forecasting",
        body: "Analyze historical consumption patterns to predict future supply requirements automatically."
      },
      {
        title: "Automated Exception Flagging",
        body: "Detect data anomalies and system discrepancies instantly, alerting risk officers before errors escalate."
      },
      {
        title: "Context-Aware Task Routing",
        body: "Direct inbound operational requests to team members based on workload capacity and specialized skills."
      },
      {
        title: "Real-Time Operational Insights",
        body: "Synthesize operational telemetry into clear, actionable summaries for executive decision-makers."
      }
    ]
  },
  {
    chapter: "Chapter 05",
    eyebrow: "IT & Infrastructure",
    title: "IT & Technical Infrastructure Automation",
    desc: "Ensure high system availability while protecting sensitive operational data. Implementing robust automation in IT operations keeps software infrastructure synchronized, secure, and resilient. Deploying enterprise operations automation tools allows IT engineers to focus on strategic growth projects rather than routine system maintenance.",
    video: "/videos/opspod/5.mp4",
    points: [
      {
        title: "User Provisioning & Offboarding",
        body: "Grant software access and revoke security credentials automatically based on employment status."
      },
      {
        title: "System Log Monitoring",
        body: "Aggregate cross-platform system metrics to catch security anomalies early."
      },
      {
        title: "Database Sync & Maintenance",
        body: "Schedule routine database updates and cloud backups automatically without manual intervention."
      },
      {
        title: "Incident Remediation Rules",
        body: "Trigger automated server recovery protocols instantly when infrastructure alerts activate."
      }
    ]
  },
  {
    chapter: "Chapter 06",
    eyebrow: "Operational Excellence",
    title: "Operational Excellence & ROI Measurement",
    desc: "Track cycle time reductions, labor cost savings, and operational throughput using centralized dashboards. Modern organizations rely on comprehensive operations automation architectures to measure performance metrics accurately. Building out tailored operations and automation systems gives leadership clear visibility into operational return on investment.",
    video: "/videos/opspod/6.mp4",
    points: [
      {
        title: "Executive KPI Dashboards",
        body: "Monitor cost reductions, processing times, and team throughput metrics across departments."
      },
      {
        title: "Process Velocity Tracking",
        body: "Measure exact lead times from initial intake request to final fulfillment execution."
      },
      {
        title: "Cost Center Attribution",
        body: "Analyze operational expenditures per business unit to pinpoint areas for efficiency improvement."
      },
      {
        title: "Continuous Optimization Feedback",
        body: "Utilize real-time operational data to adjust workflow rules and improve system throughput."
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

function OpsPodTestimonialCarousel() {
  return <TestimonialCarousel reviews={salespodReviews} />;
}

export default function OperationsWorkflowAutomationPage() {
  const isMobile = useMobile();
  const { resolvedTheme } = useTheme();

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    goal: "Document & Invoice Ingestion Engine",
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


  const [auditModalTitle, setAuditModalTitle] = useState("Pre-Configure Your Operations Pod");
  const [auditModalSourceName, setAuditModalSourceName] = useState("Operations Workflow Automation solution page");

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
      "Analyzing enterprise process schema...",
      "Configuring document parsing triggers...",
      "Mapping cross-departmental logic...",
      "Syncing with ERP/CRM webhook pipelines...",
      "Registering your Operations Pod..."
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
    const cooldown = localStorage.getItem("scalepods_cooldown_opspod");
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
      workflowType: "operations_workflow",
      sourcePage: "/solution/ops-workflow-automation",
      name: form.name,
      email: form.email,
      phone: form.phone ? `${dialCode} ${form.phone}` : undefined,
      company: form.company,
      message: `Operations Automation Goal: ${form.goal}`,
      website: form.website,
      metadata: {
        goal: form.goal,
        platform: "Operations Workflow Automation Solution Page",
        workflow: "operations_workflow"
      }
    });

    const [, apiResult] = await Promise.all([statusPromise, apiPromise]);

    setLoading(false);

    if (!apiResult.success) {
      setError(apiResult.error || "Submission failed. Please verify connection and try again.");
    } else {
      localStorage.setItem("scalepods_cooldown_opspod", Date.now().toString());
      setSubmitted(true);
      const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
      w.dataLayer = w.dataLayer || [];
      const gtmEvent = { event: "lead_form_success", event_id: apiResult.eventId, form_type: "contact_sales", source_page: "/solution/ops-workflow-automation" };
      console.log("[GTM] lead_form_success →", gtmEvent);
      w.dataLayer.push(gtmEvent);
    }
  };

  return (
    <BeamsBackground className="opspod-container" hues={[140, 160]}>
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
                Certified Enterprise Intelligent Process Automation
              </span>
            </div>

            {/* Content Heading */}
            <h1 className="sp-hero-title" style={{ textAlign: "center", width: "100%" }}>
              <span style={{ color: "#B1D997" }}>Enterprise Operations</span>{" "}
              <br className="sp-hero-desk-br" />
              &amp; Process Workflow Automation
            </h1>

            {/* Subtext */}
            <div className="sp-hero-desc" style={{ textAlign: "center", marginBottom: isMobile ? "24px" : "32px", marginInline: "auto" }}>
              <p style={{ margin: 0 }}>
                Manually handling routine internal processes creates systemic friction, inflates overhead, and slows execution across mid-market and enterprise organizations. ScalePods builds tailored architectures for modern enterprise workflow automation, replacing disconnected spreadsheets and slow email approvals with dependable execution tracks. By integrating enterprise-grade intelligent process automation directly into core operational systems, teams systematically remove human error while keeping total control over critical data pipelines.
              </p>
            </div>

            {/* Supporting Bullet Indicators */}
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
              gap: isMobile ? "12px" : "14px 60px",
              marginBottom: "32px",
              width: "fit-content",
              maxWidth: "100%",
              marginInline: "auto",
              paddingInline: "20px"
            }}>
              {[
                "Document & Unstructured Data Ingestion Engine",
                "End-to-End Business Process Optimization",
                "Enterprise Operations & Resource Execution",
                "Intelligent Resource Deployment & AI Systems"
              ].map((bullet, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "10px", justifyContent: "flex-start" }}>
                  <CheckCircle2 size={16} style={{ color: "var(--sp-accent)", flexShrink: 0, marginTop: "2px" }} />
                  <span style={{ fontSize: "14px", fontWeight: 500, color: "var(--color-text-bright)", letterSpacing: "-0.01em", textAlign: "left" }}>
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
                  setAuditModalTitle("Schedule an Operations Architectural Assessment");
                  setAuditModalSourceName("Operations Workflow Automation - Hero CTA");
                  setIsAuditModalOpen(true);
                }}
                className="sp-hero-cta-btn"
                style={{
                  width: "fit-content",
                  minWidth: "250px",
                }}
              >
                Schedule an Operations Assessment →
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
                    Your Operations Pod configurations have been pre-registered. An integration specialist will reach out shortly to demo the customized campaigns and workflows.
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
                      Configure Your Operations Pod
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
                      Primary Operations Goal
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
                          {opsGoals.map((g, idx) => (
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
                        {loading ? "Configuring pod..." : "Configure Operations Pod"}
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

      {/* Claude & OpenAI Partner Network sections */}
      <ClaudePartnership />
      <OpenAIPartnership />

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
              OPERATIONAL TELEMETRY &amp; MEASURABLE OUTCOMES
            </span>
          </div>

          <h2 className="sp-hero-title" style={{ fontSize: "clamp(32px, 3.8vw, 48px)" }}>
            The ultimate accuracy shortcut <br />
            for <span style={{ color: "var(--sp-accent)" }}>operations teams</span>.
          </h2>

          <p className="sp-hero-desc" style={{ marginLeft: "auto", marginRight: "auto", marginBottom: "0" }}>
            Closing document mismatches and operational bottlenecks is now as simple as deploying unified execution pipelines. Step into the next generation of AI-driven operational excellence.
          </p>
        </div>

        {/* Main Trust Metrics Grid */}
        <div className="sp-metrics-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
          
          <div className="sp-metric-block">
            <div className="sp-metric-number">100%</div>
            <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--color-text-bright)" }}>Audit &amp; Compliance Coverage</div>
          </div>

          <div className="sp-metric-block">
            <div className="sp-metric-number">90%</div>
            <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--color-text-bright)" }}>Faster Verification Velocity</div>
          </div>

          <div className="sp-metric-block">
            <div className="sp-metric-number">Zero</div>
            <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--color-text-bright)" }}>Compliance Slippages</div>
          </div>

          <div className="sp-metric-block">
            <div className="sp-metric-number">65%+</div>
            <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--color-text-bright)" }}>Manual Overhead Eliminated</div>
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
              See the Operations Pod in Action
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
              <ProductDemoVideoPlayer src="/videos/opspod/operations-demo.mp4" />
            </div>

          </div>
        </div>

      </motion.div>

      {/* ── FOLDS 4+: WHAT HRPOD DOES ── */}
      <motion.div
        className="sp-section-wrapper"
        style={{ borderTop: "1px solid var(--color-border-faint)", paddingBottom: "48px" }}
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        
        {/* Intro Header */}
        <div style={{ textAlign: "center", maxWidth: "1100px", marginLeft: "auto", marginRight: "auto", marginBottom: "48px" }}>
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

          <h2 className="sp-hero-title" style={{ fontSize: "clamp(30px, 3.8vw, 48px)" }}>
            Key Features of Our Enterprise Operations Automation Architecture
          </h2>

          <p className="sp-hero-desc" style={{ marginLeft: "auto", marginRight: "auto" }}>
            From document ingestion and business process optimization to intelligent resource allocation and IT operations automation — our operations automation tools eliminate friction across every touchpoint.
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

        {/* Feature Guide CTA */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
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



      </motion.div>

      {/* ── FOLD 5: MEASURABLE PERFORMANCE FRAMEWORK ── */}
      <motion.div
        className="sp-section-wrapper"
        style={{ borderTop: "1px solid var(--color-border-faint)", paddingTop: "56px", paddingBottom: "56px" }}
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
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
              Operational Performance Framework
            </span>
          </div>

          <h2 className="sp-hero-title" style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}>
            Direct Operational Impact Across Enterprise Functions
          </h2>

          <p className="sp-hero-desc" style={{ marginLeft: "auto", marginRight: "auto", marginBottom: "0" }}>
            See how ScalePods transforms fragmented manual handoffs into predictable, automated business operations across your core workflows.
          </p>
        </div>

        {/* Impact Table */}
        <div className="sp-table-wrapper">
          <table className="sp-impact-table">
            <thead>
              <tr>
                <th>Operational Function</th>
                <th>Traditional Manual Friction</th>
                <th>ScalePods Automated Pipeline</th>
                <th>Measurable Outcome</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="sp-table-metric">Document Ingestion</td>
                <td>30–45 mins per invoice/PO, tedious manual copy-pasting, high error rate</td>
                <td>Optical vision parsing extracts line-items and cross-verifies ERP records in &lt;60 sec</td>
                <td className="sp-table-result">90% cycle time reduction &amp; 0 data entry errors</td>
              </tr>
              <tr>
                <td className="sp-table-metric">Process Handoffs</td>
                <td>Fragmented emails, forgotten WhatsApps, and multi-day approval delays</td>
                <td>Context-aware decision trees, automatic task routing, and SLA escalation alerts</td>
                <td className="sp-table-result">Zero approval bottlenecks &amp; 100% SLA compliance</td>
              </tr>
              <tr>
                <td className="sp-table-metric">Partner &amp; Vendor Onboarding</td>
                <td>Weeks spent collecting tax IDs, bank proofs, and compliance certifications</td>
                <td>Self-service interactive digital portals with real-time verification checks</td>
                <td className="sp-table-result">4.2× faster partner onboarding velocity</td>
              </tr>
              <tr>
                <td className="sp-table-metric">IT &amp; User Provisioning</td>
                <td>Manual ticket queues, delayed software access, and missed de-provisioning</td>
                <td>Automated role-based access triggers and instant termination offboarding protocols</td>
                <td className="sp-table-result">100% audit-compliant security governance</td>
              </tr>
              <tr>
                <td className="sp-table-metric">Executive Visibility</td>
                <td>Disconnected monthly spreadsheets, delayed cost reports, and operational blind spots</td>
                <td>Unified real-time operational telemetry, cost center attribution, and throughput OS</td>
                <td className="sp-table-result">Immediate ROI transparency &amp; root cause clarity</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
          <motion.button 
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="sp-stats-cta-btn"
            onClick={() => {
              setAuditModalTitle("Request Operational Architecture Review");
              setAuditModalSourceName("Operations Workflow Automation - Performance Table CTA");
              setIsAuditModalOpen(true);
            }}
          >
            <span>Request Operational Architecture Review</span>
            <span style={{ fontSize: "14px", fontWeight: 700 }}>→</span>
          </motion.button>
        </div>
      </motion.div>

      {/* ── FOLD 6: STATS & BENEFITS ── */}
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

          <h2 className="sp-hero-title" style={{ fontSize: "clamp(22px, 2.8vw, 36px)" }}>
            Secure Your Operation's Compliance Across Every Transaction
          </h2>

          <p className="sp-hero-desc" style={{ marginLeft: "auto", marginRight: "auto" }}>
            Operations Pod automates the entire audit workflow, from multi-document verification and intelligent cross-checking to mismatch detection and trend analytics, helping operations teams scale transaction volume without scaling manual oversight.
          </p>
        </div>

        {/* STATS SECTION */}
        <div className="sp-stats-grid">
          
          <motion.div 
            className="sp-stat-card"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="sp-stat-num">&lt;60 Sec</div>
            <div className="sp-stat-desc">
              <strong style={{ color: "var(--color-text-bright)", display: "block", marginBottom: "4px" }}>Upload to Verification</strong>
              What used to take a team member 45 minutes per shipment now takes under a minute.
            </div>
          </motion.div>

          <motion.div 
            className="sp-stat-card"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="sp-stat-num">100%</div>
            <div className="sp-stat-desc">
              <strong style={{ color: "var(--color-text-bright)", display: "block", marginBottom: "4px" }}>GSTIN &amp; Tax Compliance</strong>
              Ensure strict tax verification to catch critical compliance failures before goods are accepted.
            </div>
          </motion.div>

          <motion.div 
            className="sp-stat-card"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="sp-stat-num">14+</div>
            <div className="sp-stat-desc">
              <strong style={{ color: "var(--color-text-bright)", display: "block", marginBottom: "4px" }}>Fields Verified Per Audit</strong>
              Cross-check invoice numbers, GSTIN, weights, HSN codes, batch numbers, mechanical properties, and chemical compositions in one single pass.
            </div>
          </motion.div>

          <motion.div 
            className="sp-stat-card"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="sp-stat-num">0 Hours</div>
            <div className="sp-stat-desc">
              <strong style={{ color: "var(--color-text-bright)", display: "block", marginBottom: "4px" }}>Wasted on Manual Checks</strong>
              Eliminate the need for tedious, line-by-line physical document comparisons and risky spot-checking.
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
              setAuditModalTitle("Evaluate Your Operations Funnel");
              setAuditModalSourceName("Operations Workflow Automation - Funnel CTA");
              setIsAuditModalOpen(true);
            }}
          >
            <span>Evaluate your funnel</span>
            <span style={{ fontSize: "14px", fontWeight: 700 }}>→</span>
          </motion.button>
        </div>

        {/* WHY OPERATIONS TEAMS USE OPERATIONS POD */}
        <div className="sp-why-use-wrapper">
          <h3 className="sp-why-use-title">Why Operations Teams Use Operations Pod</h3>
          
          <div className="sp-why-use-grid">
            <div className="sp-why-use-item">
              <h4 className="sp-why-use-item-title">100% Audit Coverage</h4>
              <p className="sp-why-use-item-desc">Every single field is thoroughly verified across all documents, eliminating the risk of blind spot-checks.</p>
            </div>
            <div className="sp-why-use-item">
              <h4 className="sp-why-use-item-title">Timestamped Accountability</h4>
              <p className="sp-why-use-item-desc">Approve or reject transactions with a single click, instantly logging the decision for a clean audit trail.</p>
            </div>
            <div className="sp-why-use-item">
              <h4 className="sp-why-use-item-title">Smart Data Normalization</h4>
              <p className="sp-why-use-item-desc">Date formats, supplier name variations, and abbreviations are handled intelligently to eliminate false flags.</p>
            </div>
            <div className="sp-why-use-item">
              <h4 className="sp-why-use-item-title">Unified Audit Intelligence</h4>
              <p className="sp-why-use-item-desc">Access live dashboards, complete historical records, and error analytics without ever digging through folders.</p>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginTop: "8px" }}>
            <motion.button 
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="sp-stats-cta-btn"
              onClick={() => {
                setAuditModalTitle("Book an Operations Process Audit");
                setAuditModalSourceName("Operations Workflow Automation - Stats CTA");
                setIsAuditModalOpen(true);
              }}
            >
              <span>See it in action</span>
              <span style={{ fontSize: "14px", fontWeight: 700 }}>→</span>
            </motion.button>
          </div>
        </div>

      </motion.div>

      {/* ── FOLD 8: COMPARISON ── */}
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
              Why ScalePods
            </span>
          </div>

          <h2 className="sp-hero-title" style={{ fontSize: "clamp(20px, 2.5vw, 28px)", lineHeight: "1.15", marginBottom: "6px" }}>
            What changes when you stop doing this manually
          </h2>

          <p className="sp-hero-desc" style={{ fontSize: "13px", lineHeight: "1.4", margin: "0 auto", color: "var(--color-text-muted)", maxWidth: "600px" }}>
            Not a feature list. The actual difference between a system and a spreadsheet.
          </p>
        </div>

        {/* Two-Column Comparison */}
        <div className="sp-comparison-layout">
          
          {/* LEFT HEADER */}
          <div className="sp-comp-col-header automated-header">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B1D997] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B1D997]"></span>
            </span>
            <span>Automated Operations Pod Workflow</span>
          </div>

          {/* LEFT CARDS */}
          {[
            "All vendor contracts, invoices, and purchase records are cross-checked field by field automatically using intelligent process automation.",
            "GSTIN, tax IDs, and line-item pricing mismatches are flagged in real time before goods or payments are accepted.",
            "Disparate date formats, supplier naming variations, and item codes are normalized automatically across your ERP and WMS.",
            "Approve or reject with a single click. Every decision is logged with an immutable timestamp in a complete audit history.",
            "Operational analytics surface which suppliers or internal departments generate discrepancies, so root causes get fixed permanently."
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
            <span>Existing Manual Verification Workflow</span>
          </div>

          {/* RIGHT CARDS */}
          {[
            "Staff manually compare Invoices, POs, and shipping documents line by line, a process taking 30–45 minutes per record.",
            "GSTIN and calculation errors are discovered weeks later during monthly accounting reconciliations, creating audit panic.",
            "Operations teams waste hours re-typing data and fixing formatting differences rather than managing strategic priorities.",
            "Approvals happen over fragmented emails and chats with no immutable record, no timestamp, and zero compliance oversight.",
            "Discrepancies are handled one by one in fire-fighting mode, allowing the same operational errors to repeat month after month."
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
            Your operations team is good at catching problems. <span style={{ color: "var(--color-text-muted)", fontWeight: 400 }}>Operations Pod makes sure nothing slips through before they even have to look.</span>
          </p>
          <motion.button 
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="sp-comp-bottom-btn"
            onClick={() => {
              setAuditModalTitle("Pre-Configure Your Operations Pod");
              setAuditModalSourceName("Operations Workflow Automation - Strategic Comparison");
              setIsAuditModalOpen(true);
            }}
          >
            <span>See how it works</span>
            <span style={{ fontSize: "12px", fontWeight: 700 }}>→</span>
          </motion.button>
        </div>

      </motion.div>

      {/* ── FOLD 8: TESTIMONIALS ── */}
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
            Teams that experienced ScalePods' <span style={{ color: "var(--sp-accent)" }}>Workflow Automation Tools</span>
          </h2>
        </div>

        {/* Testimonial Carousel */}
        <div style={{ marginTop: "12px" }}>
          <OpsPodTestimonialCarousel />
        </div>

      </motion.div>

      {/* ── FOLD 9: FAQ ── */}
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
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ Accordion List */}
        <div className="sp-faq-list">
          
          {[
            {
              q: "What is enterprise operations and process workflow automation?",
              a: "Enterprise operations and process workflow automation replaces manual data entry, disconnected spreadsheets, and sluggish email approvals with intelligent, automated execution pipelines. ScalePods builds tailored architectures that ingest unstructured documents (invoices, POs, contracts), route tasks cross-departmentally via logic decision trees, and synchronize directly with core ERPs, WMS, and CRMs without human latency or data entry errors."
            },
            {
              q: "How does intelligent process automation (IPA) differ from traditional RPA or manual work?",
              a: "Traditional RPA relies on brittle screen-scraping and static rules that break whenever document formats or software UIs change. Intelligent Process Automation (IPA) integrates advanced AI vision parsing and contextual decision engines that comprehend variable layouts, extract unstructured information with precision, normalize disparate data formats, and self-heal across unexpected edge cases. Normal records process automatically in seconds, while rare discrepancies route to human reviewers."
            },
            {
              q: "How secure is enterprise operational data when using ScalePods automation tools?",
              a: "ScalePods protects enterprise operational data using end-to-end encryption in transit and at rest, zero-retention private tenancies, and strict role-based access controls. Proprietary financial records, supplier contracts, and internal databases are never used to train public AI models. All automated steps, approvals, and exception overrides generate immutable, timestamped audit logs to maintain regulatory compliance."
            },
            {
              q: "Can Operations Pod integrate with our existing ERP, WMS, CRM, and accounting systems?",
              a: "Yes. Operations Pod is built to sit natively atop your existing technology stack without requiring you to rip and replace legacy software. It connects seamlessly via standard REST APIs, webhooks, and secure database connectors with major ERPs (SAP, Oracle, NetSuite, Microsoft Dynamics), logistics systems, WMS platforms, accounting systems (Tally, QuickBooks, Zoho Books), and CRMs."
            },
            {
              q: "How does exception routing and the approval audit trail work?",
              a: "When the automated ingestion engine detects data anomalies—such as tax ID mismatches, line-item price variances exceeding predefined tolerances, or missing compliance certificates—the system automatically flags the record as an exception. It presents managers with a unified, dual-view comparison highlighting the discrepancy and enables one-click approval or rejection. Every decision is logged with an immutable timestamp and user identifier for complete accountability."
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

      {/* ── FOLD 10: FINAL CALL TO ACTION ── */}
      <div className="sp-final-cta-wrapper" style={{ marginTop: "40px", marginBottom: "40px" }}>
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
            Ready to Eliminate <br />
            <span style={{ color: "var(--sp-accent)" }}>Operational Friction?</span>
          </h2>

          <p className="sp-final-cta-desc">
            Schedule an operations architectural assessment today and see how custom automated business operations frameworks drive sustainable operational efficiency.
          </p>

          <motion.button 
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="sp-final-cta-btn"
            onClick={() => {
              setAuditModalTitle("Schedule Architectural Assessment");
              setAuditModalSourceName("Operations Workflow Automation - Final CTA");
              setIsAuditModalOpen(true);
            }}
          >
            <span>Schedule Architectural Assessment</span>
            <span style={{ fontSize: "14px", fontWeight: 700, marginLeft: "8px" }}>→</span>
          </motion.button>

          <p style={{ marginTop: "16px", fontSize: "12px", color: "var(--color-text-muted)" }}>
            Prefer direct email? Contact our enterprise architecture team at{" "}
            <a href="mailto:info@scalepods.co" style={{ color: "var(--sp-accent)", textDecoration: "underline" }}>
              info@scalepods.co
            </a>
          </p>
        </div>
      </div>

      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        zipFile="/downloads/ops-guide.pdf"
        zipName="ops-guide.pdf"
        title="Download the Free Operations Feature Guide"
        workflowType="operations_workflow"
        sourceType="landing_page"
        sourceName="Operations Workflow Automation Solution Page"
      />

      <AuditModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        title={auditModalTitle}
        sourceName={auditModalSourceName}
        isSalesPod={false}
      />


    </BeamsBackground>
  );
}
