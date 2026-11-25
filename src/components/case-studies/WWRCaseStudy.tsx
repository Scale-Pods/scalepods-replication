"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowUpRight, 
  Workflow, 
  MessageSquare, 
  UserCheck, 
  CheckCircle2, 
  Layers, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  Bot, 
  CalendarCheck, 
  TrendingUp, 
  MapPin, 
  Calendar, 
  Users,
  Search,
  Zap,
  Lock,
  Globe,
  Sliders,
  Check,
  Building,
  PhoneCall,
  Flame,
  ArrowRight
} from "lucide-react";
import AnimatedMetric from "@/components/ui/AnimatedMetric";
import BlogFaqAccordion from "@/components/ui/BlogFaqAccordion";

interface WWRCaseStudyProps {
  faqs?: Array<{ q: string; a: string }>;
}

const defaultFaqs = [
  {
    q: "What is an AI real estate sales engine and how does it connect to Zoho CRM?",
    a: "An AI real estate sales engine is an automated system that captures buyer and tenant inquiries across property portals, social ads, website forms, and WhatsApp, creating enriched lead profiles in Zoho CRM within seconds. It automates initial qualification, multi-touch follow-ups, and calendar bookings, escalating only qualified conversations to human sales executives."
  },
  {
    q: "How does the system capture leads from property portals like Property Finder and Qatar Living?",
    a: "The engine integrates with portal webhooks, email parsers, and direct messaging APIs. When an inquiry is submitted on Property Finder or Qatar Living, lead data is parsed, deduplicated, and synchronized to Zoho CRM in real time, preventing leads from getting trapped in personal WhatsApp inboxes."
  },
  {
    q: "How does the unified AI persona handle multiple communication channels?",
    a: "ScalePods configured a single conversational AI persona with unified memory across WhatsApp, voice calls, and email. The AI remembers prospect preferences, budget, property types, and past messages, conversing naturally in WWR's brand voice without losing context across channels."
  },
  {
    q: "How does the system prioritize high-margin internal inventory like Business Centre spaces?",
    a: "The system applies an intelligent commercial routing layer. Every incoming commercial lead is automatically evaluated against WWR's internal Business Centre inventory first before external broking options are considered, ensuring the company maximizes its highest-margin assets."
  },
  {
    q: "How does the 11-touch follow-up cadence work without annoying prospects?",
    a: "Outreach is spaced strategically over 30 days using gentle, value-first messaging across WhatsApp, email, and voice. The moment a prospect replies or signals intent, the automated sequence halts immediately, and the lead is escalated to a named sales agent with complete conversation history."
  },
  {
    q: "What results did WWR Qatar achieve from dormant database reactivation?",
    a: "In the first reactivation cycle of 3,200 previously unworked leads, the AI engine re-engaged 18% of contacts and qualified 6% for active site visits—unlocking significant revenue from historical data with zero additional advertising spend."
  }
];

export default function WWRCaseStudy({ faqs }: WWRCaseStudyProps) {
  const activeFaqs = faqs && faqs.length > 0 ? faqs : defaultFaqs;

  const services = [
    { title: "Broking", desc: "Assisting with buying, selling, and tenant leasing across Qatar." },
    { title: "Sales & Leasing", desc: "Connecting clients to premium residential & commercial properties." },
    { title: "Property Management", desc: "End-to-end residential and commercial portfolio asset management." },
    { title: "Co-operative Management", desc: "Turnkey enterprise asset management solutions." },
    { title: "Maintenance", desc: "Comprehensive scheduled and rapid emergency property maintenance." },
    { title: "Valuation", desc: "Certified market valuations for residential and commercial assets." },
    { title: "Business Centre", desc: "Premium serviced office spaces and corporate business properties in Doha." }
  ];

  const challenges = [
    {
      num: "01",
      title: "Multiple Lead Sources Causing Delays & Errors with Zoho",
      desc: "WWR receives inquiries from Property Finder, Qatar Living, Meta Ads, Forms, Email, Calls, and WhatsApp. Leads were downloaded manually and re-entered into Zoho CRM, creating communication lag and transcription errors.",
      image: "/images/case-studies/wwr/challenge-multiple-lead-sources-zoho-delays.webp",
      alt: "Diagram showing multiple lead sources causing delays and entry errors in Zoho CRM."
    },
    {
      num: "02",
      title: "Portal Enquiries Leaking to Third-Party Chats",
      desc: "Inquiries from property portals frequently bypassed central management and went directly to external third-party WhatsApp chats, stripping WWR of visibility, data ownership, and consistent follow-up capability.",
      image: "/images/case-studies/wwr/challenge-portal-enquiries-third-party-chats.webp",
      alt: "Illustration of property portal inquiries leaking directly into third-party WhatsApp chats."
    },
    {
      num: "03",
      title: "Missed Follow-Ups & 3,500 Idle Leads",
      desc: "Sales agents were capped at 5–10 manual calls per day and struggled to keep up with incoming volume. Meanwhile, a database of 3,000–3,500 past leads remained untouched, leaving substantial pipeline revenue on the table.",
      image: "/images/case-studies/wwr/challenge-missed-follow-ups.webp",
      alt: "Graphic illustrating sales representatives overwhelmed by follow-up volume and dormant leads."
    },
    {
      num: "04",
      title: "Missed Inbound Calls = Lost Revenue",
      desc: "Calls arriving after hours or during peak periods went unanswered. Without an automated recovery loop, high-intent buyers simply contacted competing real estate agencies in Doha.",
      image: "/images/case-studies/wwr/challenge-missed-calls-opportunities.webp",
      alt: "Visual of unanswered after-hours inbound property calls and lost opportunities."
    },
    {
      num: "05",
      title: "Inability to Prioritise High-Margin WWR Inventory",
      desc: "WWR provides Business Centre, Broking, and Bizsoug services. Lacking automated commercial routing, high-margin Business Centre leads often leaked to lower-margin third-party broker deals.",
      image: "/images/case-studies/wwr/challenge-prioritise-wwr-inventory.webp",
      alt: "Comparison diagram showing high-margin Business Centre inventory overlooked without priority routing."
    }
  ];

  const solutionPillars = [
    {
      num: "01",
      title: "All Lead Sources Into One Unified System",
      desc: "The engine captures inquiries across Property Finder, Qatar Living, Meta ads, website forms, direct emails, calls, and WhatsApp. Each lead is instantly organized, enriched, and synchronized to Zoho CRM in seconds—guaranteeing consistent real-time lead capture.",
      image: "/images/case-studies/wwr/solution-all-lead-sources-one-system.webp",
      alt: "Unified ingestion capturing leads from property portals, Meta ads, and WhatsApp into Zoho CRM."
    },
    {
      num: "02",
      title: "Single AI Sales Persona With Persistent Memory",
      desc: "One dedicated AI sales representative is configured to speak to prospects across WhatsApp, voice calls, and email. Operating with WWR's verified scripts and tone, the AI retains a single persistent memory per prospect, maintaining context across multi-channel touchpoints.",
      image: "/images/case-studies/wwr/solution-one-ai-persona.webp",
      alt: "Single AI sales representative persona engaging across WhatsApp, voice, and email with persistent memory."
    },
    {
      num: "03",
      title: "Business Centre Inventory Priority Routing",
      desc: "Every incoming commercial requirement is automatically evaluated against WWR's internal Business Centre inventory first before external broking options are considered. This rules-based routing ensures WWR always prioritizes its own highest-margin corporate spaces.",
      image: "/images/case-studies/wwr/solution-business-centre-priority.webp",
      alt: "Intelligent commercial routing logic prioritizing internal Business Centre inventory over external broking."
    },
    {
      num: "04",
      title: "11-Touch Automated Cadence Over 30 Days",
      desc: "Prospects receive strategically timed, value-first follow-ups across channels for 30 days. The moment a valuable response or hot buying signal is detected, the automated cadence pauses instantly and escalates the opportunity with complete conversation context to a sales executive.",
      image: "/images/case-studies/wwr/solution-11-touch-follow-up-30-days.webp",
      alt: "Timeline diagram of an 11-touch, 30-day automated outreach cadence with instant human escalation."
    },
    {
      num: "05",
      title: "Systematic Dormant Database Reactivation",
      desc: "WWR's historical database was segmented and systematically activated through personalized revival sequences. In the initial rollout, 3,200 dormant leads were processed, achieving an 18% direct re-engagement rate and converting 6% into active qualified site visits.",
      image: "/images/case-studies/wwr/solution-thousands-leads-re-engaged.webp",
      alt: "Database reactivation workflow showing 3,200 dormant leads segmented and re-engaged."
    },
    {
      num: "06",
      title: "Zoho as Single Source of Truth & Live Dashboard",
      desc: "All activities, conversations, follow-up milestones, and pipeline updates sync bi-directionally with Zoho CRM in real time. Leadership monitors an executive analytics dashboard displaying lead pipeline velocity, conversation volume, follow-up health, and deal progression.",
      image: "/images/case-studies/wwr/solution-zoho-one-source-truth.webp",
      alt: "Centralized Zoho CRM dashboard displaying real-time lead progression and sales conversions."
    }
  ];

  const processSteps = [
    { step: "01", name: "Capture", desc: "Property portals, Meta Ads, forms, email, calls, and WhatsApp." },
    { step: "02", name: "Create", desc: "Zoho contact and deal record generated in seconds with zero manual data entry." },
    { step: "03", name: "Prioritise", desc: "All incoming leads evaluated against internal WWR Business Centre inventory first." },
    { step: "04", name: "Engage", desc: "Shared AI persona qualifies prospect intent via WhatsApp, voice call, and email." },
    { step: "05", name: "Follow Up", desc: "11-touch structured multi-channel follow-up cadence running over 30 days." },
    { step: "06", name: "Detect Intent", desc: "Real-time intent analysis immediately halts sequences on hot buying signals." },
    { step: "07", name: "Hand Over", desc: "Named sales executive receives warm lead with full conversation context and history." },
    { step: "08", name: "Re-activate", desc: "Dormant past leads revived systematically through structured segmentation campaigns." },
    { step: "09", name: "Report", desc: "Live synchronization to Zoho CRM pipeline and executive analytics performance dashboards." }
  ];

  return (
    <>
      <style>{`
        .wwr-workflow-dark {
          display: none !important;
        }
        .wwr-workflow-light {
          display: block !important;
        }
        .dark .wwr-workflow-dark,
        [data-theme="dark"] .wwr-workflow-dark {
          display: block !important;
        }
        .dark .wwr-workflow-light,
        [data-theme="dark"] .wwr-workflow-light {
          display: none !important;
        }
        .wwr-overlay {
          background: rgba(255, 255, 255, 0.95);
          color: #0f172a;
          border: 1px solid rgba(15, 23, 42, 0.08);
        }
        .dark .wwr-overlay,
        [data-theme="dark"] .wwr-overlay {
          background: rgba(15, 23, 42, 0.95) !important;
          color: #ffffff !important;
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
        }
        .wwr-name {
          color: #0f172a;
        }
        .dark .wwr-name,
        [data-theme="dark"] .wwr-name {
          color: #ffffff !important;
        }
        .wwr-title {
          color: #475569;
        }
        .dark .wwr-title,
        [data-theme="dark"] .wwr-title {
          color: #94a3b8 !important;
        }
      `}</style>

      {/* ── Top Section: Title, Stats, Overview (Full Width) ── */}
      <div style={{ marginTop: "40px" }} className="px-6 md:px-10">
        {/* Category */}
        <div
          style={{
            fontSize: "11px",
            fontWeight: 600,
            color: "var(--color-text-bright)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginBottom: "16px"
          }}
        >
          CASE STUDY
        </div>

        {/* H1 Headline */}
        <h1
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "clamp(24px, 3.5vw, 42px)",
            fontWeight: 700,
            color: "var(--color-text-bright)",
            lineHeight: 1.25,
            marginBottom: "28px",
            letterSpacing: "-0.02em",
            textAlign: "left"
          }}
        >
          How WWR Qatar Automated Sales With an Always-On AI Engine Integrated with Zoho CRM
        </h1>

        {/* Executive Summary Intro */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginBottom: "36px",
            color: "var(--color-text-muted)",
            fontSize: "16px",
            lineHeight: 1.65
          }}
        >
          <p style={{ margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
            World Wide Real Estate (WWR Qatar) is a premier property service and real estate provider based in Doha, managing high-value residential and commercial properties across Qatar. With multiple lead sources—including Property Finder, Qatar Living, Meta Ads, and direct WhatsApp inquiries—manual data entry and delayed follow-ups began creating severe bottlenecks across their sales operations.
          </p>
          <p style={{ margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
            Inquiries leaked into personal third-party WhatsApp chats, inbound calls went unanswered after business hours, and an untouched archive of 3,200 dormant leads remained unworked. Furthermore, without automated routing rules, high-margin internal Business Centre inquiries were frequently misrouted to external brokers instead of being prioritized internally.
          </p>
          <p style={{ margin: 0, fontWeight: 500, color: "var(--color-text-bright)", textAlign: "justify", textJustify: "inter-word" }}>
            ScalePods engineered a centralized, <strong>Always-On AI Sales Engine</strong> integrated directly with Zoho CRM. The system links all lead sources into a single intake pipeline, deploys a unified conversational AI persona across WhatsApp, voice, and email, enforces an 11-touch follow-up cadence over 30 days, and prioritizes internal Business Centre inventory—boosting daily outreach to 140–160 contacts, reducing response times to under 45 seconds, and lifting qualified site visits by 34%.
          </p>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "var(--color-border)", marginBottom: "32px" }} />

        {/* Running Metrics Flex Container */}
        <div
          style={{
            padding: "8px 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            width: "100%"
          }}
          className="flex-wrap md:flex-nowrap gap-y-6 md:gap-y-0"
        >
          {/* Metric 1 */}
          <div className="w-[48%] md:w-auto flex flex-col items-start text-left">
            <div
              style={{
                fontSize: "clamp(32px, 3.5vw, 42px)",
                fontWeight: 700,
                color: "var(--color-blue-mid)",
                marginBottom: "8px",
                letterSpacing: "-0.02em"
              }}
            >
              <AnimatedMetric value={140} suffix="–160" />
            </div>
            <div style={{ fontSize: "14.5px", color: "var(--color-text-muted)", lineHeight: 1.4, maxWidth: "160px" }}>
              AI contacts handled daily
            </div>
          </div>

          {/* Metric 2 */}
          <div className="w-[48%] md:w-auto flex flex-col items-end md:items-center text-right md:text-center">
            <div
              style={{
                fontSize: "clamp(32px, 3.5vw, 42px)",
                fontWeight: 700,
                color: "var(--color-blue-mid)",
                marginBottom: "8px",
                letterSpacing: "-0.02em"
              }}
            >
              &lt; 45 sec
            </div>
            <div style={{ fontSize: "14.5px", color: "var(--color-text-muted)", lineHeight: 1.4, maxWidth: "180px" }}>
              Average response time for inbound leads
            </div>
          </div>

          {/* Metric 3 */}
          <div className="w-[48%] md:w-auto flex flex-col items-start md:items-center text-left md:text-center">
            <div
              style={{
                fontSize: "clamp(32px, 3.5vw, 42px)",
                fontWeight: 700,
                color: "var(--color-blue-mid)",
                marginBottom: "8px",
                letterSpacing: "-0.02em"
              }}
            >
              <AnimatedMetric value={18} suffix="%" />
            </div>
            <div style={{ fontSize: "14.5px", color: "var(--color-text-muted)", lineHeight: 1.4, maxWidth: "160px" }}>
              3,200 dormant leads re-engaged
            </div>
          </div>

          {/* Metric 4 */}
          <div className="w-[48%] md:w-auto flex flex-col items-end text-right">
            <div
              style={{
                fontSize: "clamp(32px, 3.5vw, 42px)",
                fontWeight: 700,
                color: "var(--color-blue-mid)",
                marginBottom: "8px",
                letterSpacing: "-0.02em"
              }}
            >
              +<AnimatedMetric value={34} suffix="%" />
            </div>
            <div style={{ fontSize: "14.5px", color: "var(--color-text-muted)", lineHeight: 1.4, maxWidth: "160px" }}>
              Qualified site visits booked monthly
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "var(--color-border)", marginTop: "32px", marginBottom: "48px" }} />
      </div>

      {/* ── Company Overview Card ── */}
      <div className="px-6 md:px-10">
        <div
          className="premium-card"
          style={{
            padding: "40px",
            marginBottom: "64px",
            display: "flex",
            flexDirection: "column",
            gap: "32px"
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Column: Brand Box with overlay */}
            <div
              className="md:col-span-5"
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "1.25",
                borderRadius: "16px",
                overflow: "hidden",
                background: "#0c1424",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px",
                border: "1px solid rgba(255, 255, 255, 0.08)"
              }}
            >
              <img
                src="/brands/wwr-real-estate-box.svg"
                alt="World Wide Real Estate (WWR Qatar)"
                style={{ width: "90%", height: "auto", objectFit: "contain" }}
              />
              {/* Overlay Badge */}
              <div
                className="wwr-overlay"
                style={{
                  position: "absolute",
                  bottom: "12px",
                  left: "12px",
                  borderRadius: "12px",
                  padding: "10px 14px",
                  backdropFilter: "blur(8px)"
                }}
              >
                <div className="wwr-name" style={{ fontWeight: 700, fontSize: "14px", lineHeight: 1.2, marginBottom: "2px" }}>
                  Rizwan
                </div>
                <div className="wwr-title" style={{ fontSize: "11.5px", fontWeight: 500 }}>
                  Client · World Wide Real Estate
                </div>
              </div>
            </div>

            {/* Right Column: Statement & Details */}
            <div className="md:col-span-7" style={{ paddingLeft: "8px", display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--color-blue-mid)"
                  }}
                >
                  REAL ESTATE AI SALES AUTOMATION
                </span>
              </div>

              <blockquote
                style={{
                  fontSize: "clamp(16px, 1.8vw, 20px)",
                  fontWeight: 400,
                  lineHeight: 1.6,
                  color: "var(--color-text-bright)",
                  fontStyle: "normal",
                  margin: 0,
                  textAlign: "justify",
                  textJustify: "inter-word"
                }}
              >
                “As WWR offers many services and multiple sources of leads across Qatar, having an automated sales system ensures our inquiries from Property Finder, Qatar Living, and WhatsApp are captured in real time, high-margin Business Centre inventory is prioritised, and qualified prospects are handed over directly to our sales executives.”
              </blockquote>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "var(--color-border)" }} />

          {/* Company Info Footer */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* About (6 cols) */}
            <div className="md:col-span-6">
              <h4
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "var(--color-text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "8px"
                }}
              >
                About World Wide Real Estate
              </h4>
              <p
                style={{
                  fontSize: "13.5px",
                  color: "var(--color-text-muted)",
                  lineHeight: 1.55,
                  margin: 0,
                  textAlign: "justify",
                  textJustify: "inter-word"
                }}
              >
                <a href="https://wwrqatar.com/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-blue-mid)", textDecoration: "underline" }}>
                  WWR Qatar
                </a>{" "}
                is a real estate and property service provider based in Doha. Established in 2016, the firm provides end-to-end residential and commercial real estate solutions across Qatar, including Broking, Sales &amp; Leasing, Property Management, Corporate Maintenance, Valuation, and Serviced Business Centres.
              </p>
            </div>

            {/* Metadata Fields (3 cols) */}
            <div className="md:col-span-3" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "var(--color-text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      marginBottom: "4px"
                    }}
                  >
                    Industry
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--color-text-bright)" }}>
                    Real Estate
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "var(--color-text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      marginBottom: "4px"
                    }}
                  >
                    Client
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--color-text-bright)" }}>
                    Rizwan (WWR)
                  </div>
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "var(--color-text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: "4px"
                  }}
                >
                  Solution Partner
                </div>
                <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--color-text-bright)" }}>
                  <Link href="/" style={{ color: "var(--color-blue-mid)", textDecoration: "underline" }}>
                    ScalePods Automation
                  </Link>
                </div>
              </div>
            </div>

            {/* Scope / Location (3 cols) */}
            <div className="md:col-span-3" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "var(--color-text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: "4px"
                  }}
                >
                  Headquarters
                </div>
                <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--color-text-bright)" }}>
                  Doha, Qatar
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "var(--color-text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: "4px"
                  }}
                >
                  Core Stack
                </div>
                <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--color-text-bright)" }}>
                  Zoho CRM, WhatsApp, AI Voice
                </div>
              </div>
            </div>
          </div>

          {/* Key Services Tags */}
          <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "20px" }}>
            <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px" }}>
              WWR Real Estate Business Verticals
            </div>
            <div className="flex flex-wrap gap-2">
              {services.map((s, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: "12.5px",
                    fontWeight: 500,
                    color: "var(--color-text-bright)",
                    padding: "6px 14px",
                    borderRadius: "20px",
                    background: "rgba(var(--color-blue-mid-rgb), 0.06)",
                    border: "1px solid rgba(var(--color-blue-mid-rgb), 0.15)"
                  }}
                >
                  {s.title}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "var(--color-border)", marginBottom: "80px" }} />

        {/* ── The Challenges Section ── */}
        <div style={{ marginBottom: "80px" }}>
          <h2
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(24px, 3vw, 32px)",
              fontWeight: 700,
              color: "var(--color-text-bright)",
              marginBottom: "16px",
              letterSpacing: "-0.02em"
            }}
          >
            The Challenges: Operational Friction Across Ingestion, Follow-Up &amp; Prioritization
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "var(--color-text-muted)",
              lineHeight: 1.65,
              marginBottom: "40px",
              maxWidth: "100%",
              textAlign: "justify",
              textJustify: "inter-word"
            }}
          >
            WWR receives substantial inquiry volume across Property Finder, Qatar Living, Meta Ads, and WhatsApp. Without centralized orchestration and real-time CRM integration, operational ceilings began hindering sales velocity across five major areas:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {challenges.map((c) => (
              <div
                key={c.num}
                className="premium-card"
                style={{
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px"
                }}
              >
                <div style={{ width: "100%", height: "220px", borderRadius: "16px", overflow: "hidden", position: "relative" }}>
                  <img
                    src={c.image}
                    alt={c.alt}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div className="internal-panel" style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--color-blue-mid)", marginBottom: "6px" }}>
                    CHALLENGE {c.num}
                  </div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    {c.title}
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    {c.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "var(--color-border)", marginBottom: "80px" }} />

        {/* ── The Solution Section ── */}
        <div style={{ marginBottom: "80px" }}>
          <h2
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(24px, 3vw, 32px)",
              fontWeight: 700,
              color: "var(--color-text-bright)",
              marginBottom: "16px",
              letterSpacing: "-0.02em"
            }}
          >
            The Solution: Always-On AI Sales Engine Linked with Zoho CRM
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "var(--color-text-muted)",
              lineHeight: 1.65,
              marginBottom: "40px",
              maxWidth: "100%",
              textAlign: "justify",
              textJustify: "inter-word"
            }}
          >
            ScalePods engineered a centralized <Link href="/solutions/sales-workflow-automation" style={{ color: "var(--color-blue-mid)", fontWeight: 600, textDecoration: "underline" }}>AI sales software</Link> and <Link href="/solutions/real-estate-workflow-automation" style={{ color: "var(--color-blue-mid)", fontWeight: 600, textDecoration: "underline" }}>real estate automation engine</Link> to capture, qualify, engage, and follow up with leads across WWR&apos;s business lines. The system links all lead sources, a unified AI persona, Zoho CRM, and automated outreach sequences together with an executive analytics dashboard—passing valuable, qualified opportunities directly to sales executives:
          </p>

          {/* Overview Banner */}
          <div
            className="premium-card"
            style={{
              width: "100%",
              padding: "24px",
              marginBottom: "48px",
              overflow: "hidden"
            }}
          >
            <img
              src="/images/case-studies/wwr/ai-sales-engine-integrated-zoho.webp"
              alt="Conceptual workflow showing WWR AI sales engine integrated with Zoho CRM, coordinating leads across WhatsApp, voice calls, and email"
              style={{ width: "100%", height: "auto", borderRadius: "14px", display: "block" }}
            />
          </div>

          {/* 6 Solution Pillars Alternating */}
          {solutionPillars.map((p, idx) => {
            const isImageLeft = idx % 2 === 1;
            return (
              <div key={p.num} className="premium-card" style={{ padding: "32px", marginBottom: "32px" }}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  {isImageLeft ? (
                    <>
                      <div className="md:col-span-6 order-2 md:order-1" style={{ borderRadius: "14px", overflow: "hidden" }}>
                        <img
                          src={p.image}
                          alt={p.alt}
                          style={{ width: "100%", height: "auto", display: "block" }}
                        />
                      </div>
                      <div className="md:col-span-6 order-1 md:order-2">
                        <div style={{ color: "var(--color-blue-mid)", marginBottom: "12px" }}>
                          {idx === 1 ? <Bot style={{ width: "32px", height: "32px" }} /> : idx === 3 ? <Clock style={{ width: "32px", height: "32px" }} /> : <Workflow style={{ width: "32px", height: "32px" }} />}
                        </div>
                        <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--color-blue-mid)", marginBottom: "4px" }}>
                          PILLAR {p.num}
                        </div>
                        <h3 style={{ fontSize: "20px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "12px" }}>
                          {p.title}
                        </h3>
                        <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.6, textAlign: "justify", textJustify: "inter-word" }}>
                          {p.desc}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="md:col-span-6">
                        <div style={{ color: "var(--color-blue-mid)", marginBottom: "12px" }}>
                          {idx === 0 ? <Layers style={{ width: "32px", height: "32px" }} /> : idx === 2 ? <Building style={{ width: "32px", height: "32px" }} /> : <Sparkles style={{ width: "32px", height: "32px" }} />}
                        </div>
                        <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--color-blue-mid)", marginBottom: "4px" }}>
                          PILLAR {p.num}
                        </div>
                        <h3 style={{ fontSize: "20px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "12px" }}>
                          {p.title}
                        </h3>
                        <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.6, textAlign: "justify", textJustify: "inter-word" }}>
                          {p.desc}
                        </p>
                      </div>
                      <div className="md:col-span-6" style={{ borderRadius: "14px", overflow: "hidden" }}>
                        <img
                          src={p.image}
                          alt={p.alt}
                          style={{ width: "100%", height: "auto", display: "block" }}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "var(--color-border)", marginBottom: "80px" }} />

        {/* ── The Workflow Section (Light / Dark Mode Diagram) ── */}
        <div style={{ marginBottom: "80px" }}>
          <h2
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(24px, 3vw, 32px)",
              fontWeight: 700,
              color: "var(--color-text-bright)",
              marginBottom: "16px",
              letterSpacing: "-0.02em"
            }}
          >
            The Workflow: 9-Step Sequential Sales Engine
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "var(--color-text-muted)",
              lineHeight: 1.65,
              marginBottom: "40px",
              maxWidth: "100%",
              textAlign: "justify",
              textJustify: "inter-word"
            }}
          >
            The end-to-end sales progression coordinates lead capture across digital channels, instant Zoho contact creation, Business Centre priority matching, unified AI persona qualification, an 11-touch follow-up cadence, and warm sales executive handoff:
          </p>

          {/* Light / Dark Mode Workflow Preview */}
          <div
            className="premium-card"
            style={{
              width: "100%",
              padding: "24px",
              overflow: "hidden",
              marginBottom: "40px"
            }}
          >
            <img
              src="/images/case-studies/wwr/process-flow-wwr-sales-engine.webp"
              alt="WWR Qatar AI sales engine end-to-end process workflow diagram on a light background"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "16px",
                display: "block"
              }}
              className="wwr-workflow-light"
            />
            <img
              src="/images/case-studies/wwr/process-detailed-workflow-zoho.webp"
              alt="WWR Qatar AI sales engine end-to-end process workflow diagram on a dark background"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "16px",
                display: "block"
              }}
              className="wwr-workflow-dark"
            />
          </div>

          {/* 9-Step Sequential Pipeline Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {processSteps.map((item) => (
              <div
                key={item.step}
                className="internal-panel"
                style={{
                  padding: "20px",
                  borderRadius: "14px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--color-blue-mid)", letterSpacing: "0.05em" }}>
                    STEP {item.step}
                  </span>
                  <CheckCircle2 style={{ width: "16px", height: "16px", color: "var(--color-blue-mid)" }} />
                </div>
                <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-text-bright)" }}>
                  {item.name}
                </div>
                <div style={{ fontSize: "13px", color: "var(--color-text-muted)", lineHeight: 1.5, textAlign: "justify", textJustify: "inter-word" }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "var(--color-border)", marginBottom: "80px" }} />

        {/* ── The Results Section ── */}
        <div style={{ marginBottom: "80px" }}>
          <h2
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(24px, 3vw, 32px)",
              fontWeight: 700,
              color: "var(--color-text-bright)",
              marginBottom: "16px",
              letterSpacing: "-0.02em"
            }}
          >
            The Results: Measurable Commercial Impact in Qatar Real Estate
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "var(--color-text-muted)",
              lineHeight: 1.65,
              marginBottom: "40px",
              maxWidth: "100%",
              textAlign: "justify",
              textJustify: "inter-word"
            }}
          >
            By replacing manual lead logging and fragmented WhatsApp chats with an always-on sales engine, WWR achieved transformative improvements across daily outreach capacity, lead response velocity, and pipeline recovery:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Result 1 */}
            <div className="premium-card" style={{ padding: "28px" }}>
              <div style={{ fontSize: "clamp(32px, 3vw, 40px)", fontWeight: 700, color: "var(--color-blue-mid)", marginBottom: "8px" }}>
                140–160
              </div>
              <h3 style={{ fontSize: "17px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "10px" }}>
                Increased Daily Outreach Capacity
              </h3>
              <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.6, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                Contacts surged from fewer than 30 human touches per day to a reliable 140–160 automated touches across WhatsApp, email, and voice. WWR now scales outreach without capping human sales bandwidth.
              </p>
            </div>

            {/* Result 2 */}
            <div className="premium-card" style={{ padding: "28px" }}>
              <div style={{ fontSize: "clamp(32px, 3vw, 40px)", fontWeight: 700, color: "var(--color-blue-mid)", marginBottom: "8px" }}>
                &lt; 45 sec
              </div>
              <h3 style={{ fontSize: "17px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "10px" }}>
                Rapid Inbound Response Times
              </h3>
              <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.6, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                Every new inquiry on Property Finder, Qatar Living, WhatsApp, and web forms receives personalized conversational qualification within 45 seconds—securing buyer engagement while competitor leads sit unanswered.
              </p>
            </div>

            {/* Result 3 */}
            <div className="premium-card" style={{ padding: "28px" }}>
              <div style={{ fontSize: "clamp(32px, 3vw, 40px)", fontWeight: 700, color: "var(--color-blue-mid)", marginBottom: "8px" }}>
                18%
              </div>
              <h3 style={{ fontSize: "17px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "10px" }}>
                Re-Activated 3,200 Dormant Leads
              </h3>
              <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.6, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                In the first reactivation cycle of 3,200 previously unworked historical leads, 18% were successfully re-engaged into active conversations—generating new pipeline from existing assets with zero advertising cost.
              </p>
            </div>

            {/* Result 4 */}
            <div className="premium-card" style={{ padding: "28px" }}>
              <div style={{ fontSize: "clamp(32px, 3vw, 40px)", fontWeight: 700, color: "var(--color-blue-mid)", marginBottom: "8px" }}>
                +34%
              </div>
              <h3 style={{ fontSize: "17px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "10px" }}>
                More Qualified Site Visits Booked
              </h3>
              <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.6, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                With 6% of dormant contacts progressing directly to site appointments and fresh inbound leads qualified immediately, monthly in-person site visits for high-margin properties expanded by 34%.
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "var(--color-border)", marginBottom: "80px" }} />

        {/* ── Why WWR Chose ScalePods ── */}
        <div style={{ marginBottom: "80px" }}>
          <h2
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(24px, 3vw, 32px)",
              fontWeight: 700,
              color: "var(--color-text-bright)",
              marginBottom: "16px",
              letterSpacing: "-0.02em"
            }}
          >
            Why World Wide Real Estate Chose ScalePods
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "var(--color-text-muted)",
              lineHeight: 1.65,
              marginBottom: "40px",
              maxWidth: "100%",
              textAlign: "justify",
              textJustify: "inter-word"
            }}
          >
            WWR evaluated standard chatbots and generic CRM integrations before choosing ScalePods to build an end-to-end sales operating engine:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="premium-card" style={{ padding: "28px" }}>
              <div style={{ color: "var(--color-blue-mid)", marginBottom: "16px" }}>
                <ShieldCheck style={{ width: "32px", height: "32px" }} />
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px" }}>
                Native Zoho CRM Sync
              </h3>
              <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.6, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                Rather than creating an isolated data silo, ScalePods built two-way real-time webhooks directly with WWR&apos;s existing Zoho CRM architecture.
              </p>
            </div>

            <div className="premium-card" style={{ padding: "28px" }}>
              <div style={{ color: "var(--color-blue-mid)", marginBottom: "16px" }}>
                <Building style={{ width: "32px", height: "32px" }} />
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px" }}>
                High-Margin Priority Routing
              </h3>
              <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.6, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                Intelligent commercial logic guarantees WWR&apos;s own Business Centre spaces are checked first, protecting gross margins before external broking.
              </p>
            </div>

            <div className="premium-card" style={{ padding: "28px" }}>
              <div style={{ color: "var(--color-blue-mid)", marginBottom: "16px" }}>
                <UserCheck style={{ width: "32px", height: "32px" }} />
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px" }}>
                Human-in-the-Loop Handoff
              </h3>
              <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.6, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                The AI handles repetitive top-of-funnel intake and reactivation, escalating warm, qualified conversations directly to designated human agents.
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "var(--color-border)", marginBottom: "80px" }} />

        {/* ── FAQ Section ── */}
        <div style={{ marginBottom: "80px" }}>
          <h2
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(24px, 3vw, 32px)",
              fontWeight: 700,
              color: "var(--color-text-bright)",
              marginBottom: "32px",
              letterSpacing: "-0.02em"
            }}
          >
            Frequently Asked Questions
          </h2>
          <BlogFaqAccordion faqData={activeFaqs} />
        </div>

        {/* ── Bottom CTA ── */}
        <div
          className="premium-card"
          style={{
            padding: "48px 32px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            position: "relative",
            overflow: "hidden"
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(22px, 2.5vw, 28px)",
              fontWeight: 700,
              color: "var(--color-text-bright)",
              margin: 0
            }}
          >
            Ready to Build an Always-On AI Sales Engine for Your Agency?
          </h2>
          <p
            style={{
              fontSize: "15px",
              color: "var(--color-text-muted)",
              maxWidth: "600px",
              lineHeight: 1.6,
              margin: 0
            }}
          >
            Discover how ScalePods can integrate your lead sources, automate qualification, and sync directly with Zoho or your existing CRM.
          </p>
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "var(--color-blue-mid)",
              color: "#ffffff",
              padding: "14px 28px",
              borderRadius: "12px",
              fontSize: "14.5px",
              fontWeight: 600,
              textDecoration: "none",
              transition: "opacity 0.2s"
            }}
            className="hover:opacity-90"
          >
            Schedule an Automation Audit
            <ArrowUpRight style={{ width: "16px", height: "16px" }} />
          </Link>
        </div>
      </div>
    </>
  );
}
