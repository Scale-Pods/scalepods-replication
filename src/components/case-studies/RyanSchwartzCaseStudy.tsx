"use client";

import React from "react";
import Link from "next/link";
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
  PhoneCall, 
  Calendar, 
  Users,
  Compass,
  Zap,
  Lock,
  Flame,
  Check
} from "lucide-react";
import AnimatedMetric from "@/components/ui/AnimatedMetric";
import BlogFaqAccordion from "@/components/ui/BlogFaqAccordion";

interface RyanSchwartzProps {
  faqs?: Array<{ q: string; a: string }>;
}

const defaultFaqs = [
  {
    q: "What is FUB CRM automation for luxury real estate?",
    a: "FUB CRM automation connects Follow Up Boss with multi-channel lead sources (Google Ads, Facebook, website forms, Fello, CallRail), messaging channels (WhatsApp, SMS, email), conversational voice agents, and calendar booking systems to automate lead intake, instant qualification, and CRM record keeping."
  },
  {
    q: "How does the system achieve an under-45-second speed to lead?",
    a: "The moment an inquiry registers across any advertising campaign, website form, or valuation tool, an automated real estate lead agent initiates a personalized WhatsApp or SMS message within 60 seconds, engaging luxury buyers and sellers while their interest is at its peak."
  },
  {
    q: "How does automated appointment scheduling check calendar availability?",
    a: "When a qualified buyer or seller requests a private showing or consultation in Naples or Aspen, the workflow queries Ryan's live calendar in real time to offer confirmed available time slots, books the calendar event, and triggers automated reminder cadences to keep no-show rates under 15%."
  },
  {
    q: "What safeguard prevents sending duplicate or unwanted outreach?",
    a: "The workflow applies automated opt-out preference checks and duplicate suppression algorithms before dispatching messages. Call attempts are strictly capped at three within a rolling 30-day window, maintaining high engagement and healthy carrier/WhatsApp quality ratings."
  },
  {
    q: "How are high-priority luxury prospects escalated to Ryan and his team?",
    a: "When a lead indicates an immediate buying or selling timeline (0–3 months) or requests direct agent involvement, the AI system flags the record, updates the FUB pipeline stage, and sends an urgent notification to Ryan and designated team members for personal high-touch closing."
  },
  {
    q: "Does AI CRM automation replace real estate agents?",
    a: "No. ScalePods operates on a human-in-the-loop architecture. The automation removes routine friction—such as manual data entry, transcript writing, initial outreach, and follow-up tracking—so luxury real estate agents can focus entirely on client relationships, property showings, and closing transactions."
  }
];

export default function RyanSchwartzCaseStudy({ faqs }: RyanSchwartzProps) {
  const activeFaqs = faqs && faqs.length > 0 ? faqs : defaultFaqs;

  return (
    <>
      <style>{`
        .ryan-overlay {
          background: rgba(255, 255, 255, 0.95);
          color: #0f172a;
          border: 1px solid rgba(15, 23, 42, 0.08);
        }
        .dark .ryan-overlay,
        [data-theme="dark"] .ryan-overlay {
          background: rgba(15, 23, 42, 0.95) !important;
          color: #ffffff !important;
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
        }
        .ryan-name {
          color: #0f172a;
        }
        .dark .ryan-name,
        [data-theme="dark"] .ryan-name {
          color: #ffffff !important;
        }
        .ryan-title {
          color: #475569;
        }
        .dark .ryan-title,
        [data-theme="dark"] .ryan-title {
          color: #94a3b8 !important;
        }
      `}</style>

      {/* ── Top Section: Title, Stats, Overview ── */}
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
          How Ryan Automated Real Estate Lead Follow-Up with FUB CRM Automation
        </h1>

        {/* Hero Paragraph */}
        <p
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "17px",
            color: "var(--color-text-muted)",
            lineHeight: 1.7,
            maxWidth: "100%",
            marginBottom: "40px",
            textAlign: "justify",
            textJustify: "inter-word"
          }}
        >
          In a luxury real estate company, time is precious. If you do not respond to a buyer or seller promptly, you lose them. To keep inquiries coming in Naples and Aspen, the team maintained conversations from various sources and managed their follow-ups. Using <strong>FUB CRM automation</strong> allowed the team to streamline the process of responding to leads, communicating with them, booking appointments, and keeping Follow Up Boss updated, without relying on manual work at every step.
        </p>

        {/* ── Animated Key Metrics Grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "16px",
            marginBottom: "60px"
          }}
        >
          {/* Stat 1 */}
          <div
            className="premium-card"
            style={{
              padding: "20px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: "2px", marginBottom: "8px" }}>
              <span style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-blue-mid)" }}>&lt;</span>
              <span style={{ fontSize: "36px", fontWeight: 700, color: "var(--color-blue-mid)" }}>
                <AnimatedMetric value={45} suffix="s" duration={1800} />
              </span>
            </div>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-text-bright)", marginBottom: "4px" }}>
              Speed-to-Lead
            </div>
            <div style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>
              vs. 60s target across all channels
            </div>
          </div>

          {/* Stat 2 */}
          <div
            className="premium-card"
            style={{
              padding: "20px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <div style={{ fontSize: "36px", fontWeight: 700, color: "var(--color-green)", marginBottom: "8px" }}>
              <AnimatedMetric value={38} suffix="%" duration={2000} />
            </div>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-text-bright)", marginBottom: "4px" }}>
              First-Touch WhatsApp Reply
            </div>
            <div style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>
              vs. ~12% manual outreach baseline
            </div>
          </div>

          {/* Stat 3 */}
          <div
            className="premium-card"
            style={{
              padding: "20px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <div style={{ fontSize: "36px", fontWeight: 700, color: "var(--color-blue-mid)", marginBottom: "8px" }}>
              <AnimatedMetric value={22} suffix="%" duration={2000} />
            </div>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-text-bright)", marginBottom: "4px" }}>
              Appointment Booking
            </div>
            <div style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>
              Conversion among qualified leads
            </div>
          </div>

          {/* Stat 4 */}
          <div
            className="premium-card"
            style={{
              padding: "20px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: "2px", marginBottom: "8px" }}>
              <span style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-green)" }}>&lt;</span>
              <span style={{ fontSize: "36px", fontWeight: 700, color: "var(--color-green)" }}>
                <AnimatedMetric value={15} suffix="%" duration={1800} />
              </span>
            </div>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-text-bright)", marginBottom: "4px" }}>
              Appointment No-Shows
            </div>
            <div style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>
              With automated reminder cadences
            </div>
          </div>

          {/* Stat 5 */}
          <div
            className="premium-card"
            style={{
              padding: "20px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <div style={{ fontSize: "36px", fontWeight: 700, color: "var(--color-blue-mid)", marginBottom: "8px" }}>
              <AnimatedMetric value={100} suffix="%" duration={2000} />
            </div>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-text-bright)", marginBottom: "4px" }}>
              Call CRM Documentation
            </div>
            <div style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>
              Automated transcripts & summaries
            </div>
          </div>
        </div>

        {/* ── Project Overview Card ── */}
        <div className="premium-card" style={{ padding: "32px", marginBottom: "60px" }}>
          <div
            style={{
              fontSize: "12px",
              fontWeight: 700,
              color: "var(--color-blue-mid)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "16px"
            }}
          >
            PROJECT OVERVIEW
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Overview Narrative (6 cols) */}
            <div className="md:col-span-6">
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "var(--color-text-bright)",
                  marginBottom: "12px"
                }}
              >
                About the Client &amp; Engagement
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--color-text-muted)",
                  lineHeight: 1.6,
                  margin: 0,
                  textAlign: "justify",
                  textJustify: "inter-word"
                }}
              >
                Ryan Schwartz leads a premier luxury real estate advisory serving high-net-worth buyers and sellers across Naples, Florida and Aspen, Colorado. Managing multi-million dollar property transactions requires immediate, personalized attention across every channel. Partnering with ScalePods, Ryan deployed an end-to-end <Link href="/solution/ai-automation-for-real-estate" style={{ color: "var(--color-blue-mid)", fontWeight: 600, textDecoration: "underline" }}>Real Estate AI ecosystem</Link> integrated directly into Follow Up Boss (FUB), automating lead intake, speed-to-lead qualification, appointment booking, and CRM logging.
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
                    Luxury Real Estate
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
                    Ryan Schwartz
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
                  ScalePods Automation
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
                  Locations
                </div>
                <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--color-text-bright)" }}>
                  Naples, FL · Aspen, CO
                </div>
              </div>
            </div>

            {/* Key Features (3 cols) */}
            <div className="md:col-span-3">
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
                Key Focus Areas
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {[
                  "FUB CRM Automation",
                  "WhatsApp API Outreach",
                  "Sub-60s Speed to Lead",
                  "Voice AI Agents",
                  "Calendar Conflict Checks",
                  "Callrail & Ads Ingestion",
                  "Fello Valuation Tracking",
                  "Real-Time Lead Routing"
                ].map((tag, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: "11px",
                      fontWeight: 500,
                      padding: "4px 8px",
                      borderRadius: "6px",
                      background: "rgba(var(--color-blue-mid-rgb), 0.08)",
                      border: "1px solid rgba(var(--color-blue-mid-rgb), 0.15)",
                      color: "var(--color-text-muted)"
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content Container ── */}
      <div style={{ marginTop: "40px" }}>
        <div style={{ maxWidth: "100%", margin: "0 auto" }} className="px-6 md:px-10">

          {/* ── The Challenge Section ── */}
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
              The Challenge: Too Many Leads, Not Enough Time
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "var(--color-text-muted)",
                lineHeight: 1.65,
                marginBottom: "32px",
                maxWidth: "100%",
                textAlign: "justify",
                textJustify: "inter-word"
              }}
            >
              Ryan’s luxury team was actively capturing prospective buyers and sellers from Facebook ads, Google Ads, custom website forms, Fello property valuations, CallRail inbound numbers, and open house registrations. However, managing volume across six disconnected platforms created severe operational bottlenecks:
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Visual Presentation Card */}
              <div className="lg:col-span-5 w-full">
                <div
                  className="premium-card"
                  style={{
                    padding: "16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    borderRadius: "20px"
                  }}
                >
                  <div style={{ width: "100%", borderRadius: "14px", overflow: "hidden", background: "#060A12" }}>
                    <img
                      src="/images/case-studies/ryan-schwartz/challenge-too-many-leads.png"
                      alt="A real estate professional is overwhelmed by incoming leads, with a large AI-powered CRM dashboard displaying customer inquiries, calls, messages, and lead analytics in the background."
                      style={{ width: "100%", height: "auto", objectFit: "contain", display: "block" }}
                    />
                  </div>
                  <div style={{ padding: "8px 12px" }}>
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-blue-mid)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>
                      CHALLENGE CONTEXT
                    </div>
                    <div style={{ fontSize: "13px", color: "var(--color-text-bright)", fontWeight: 600 }}>
                      Fragmented Inquiries Across Luxury Markets
                    </div>
                  </div>
                </div>
              </div>

              {/* Problem Breakdown Cards */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div
                  className="internal-panel"
                  style={{
                    padding: "20px",
                    borderRadius: "16px",
                    border: "1px solid var(--color-border)"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                    <Clock style={{ width: "18px", height: "18px", color: "#f87171" }} />
                    <h3 style={{ fontSize: "15.5px", fontWeight: 700, color: "var(--color-text-bright)", margin: 0 }}>
                      Slow &amp; Erratic Response Times
                    </h3>
                  </div>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    In luxury real estate, responding within the first five minutes makes a profound difference in closing rates. Without an automated triage system, warm prospects waited hours, follow-ups became erratic, and some leads were called multiple times while others slipped away.
                  </p>
                </div>

                <div
                  className="internal-panel"
                  style={{
                    padding: "20px",
                    borderRadius: "16px",
                    border: "1px solid var(--color-border)"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                    <Layers style={{ width: "18px", height: "18px", color: "#fbbf24" }} />
                    <h3 style={{ fontSize: "15.5px", fontWeight: 700, color: "var(--color-text-bright)", margin: 0 }}>
                      Manual Data Entry &amp; Duplicate Records
                    </h3>
                  </div>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Agents spent hours manually entering contact details into boards, updating pipeline stages, recording call notes, and tracking calendar dates. This manual burden created duplicate profiles, missing interaction histories, and fragmented prospect contexts.
                  </p>
                </div>

                <div
                  className="internal-panel"
                  style={{
                    padding: "20px",
                    borderRadius: "16px",
                    border: "1px solid var(--color-border)"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                    <TrendingUp style={{ width: "18px", height: "18px", color: "var(--color-blue-mid)" }} />
                    <h3 style={{ fontSize: "15.5px", fontWeight: 700, color: "var(--color-text-bright)", margin: 0 }}>
                      Blind Spots in Pipeline &amp; Conversion Analytics
                    </h3>
                  </div>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Leadership lacked unified visibility into critical growth indicators such as speed-to-lead by channel, appointment booking conversion rates, and ROI across ad channels. Ryan needed a reliable engine to respond faster and surface real-time pipeline clarity.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "var(--color-border)", marginBottom: "80px" }} />

          {/* ── The Solution: High-Level Architecture ── */}
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
              The Solution: A Connected Real Estate AI Ecosystem
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "var(--color-text-muted)",
                lineHeight: 1.65,
                marginBottom: "32px",
                maxWidth: "100%",
                textAlign: "justify",
                textJustify: "inter-word"
              }}
            >
              ScalePods built a unified Real Estate AI ecosystem integrated seamlessly around Follow Up Boss (FUB). Rather than treating communication tools, calendars, and CRMs as separate silos, this architecture unifies lead intake, WhatsApp outreach, voice agents, calendar availability checks, and CRM record updates into one self-orchestrating loop. The system never sends blind cookie-cutter templates—it leverages known lead intelligence and engagement history to guide each subsequent touchpoint.
            </p>

            {/* Architecture Banner Card */}
            <div
              className="premium-card"
              style={{
                padding: "20px",
                marginBottom: "48px",
                borderRadius: "24px"
              }}
            >
              <div style={{ width: "100%", borderRadius: "16px", overflow: "hidden", background: "#060A12" }}>
                <img
                  src="/images/case-studies/ryan-schwartz/solution-overview-architecture.png"
                  alt="Real estate AI automation dashboard connecting Facebook and Google leads, websites, WhatsApp, calls, appointment scheduling, voice agents, and CRM records into a centralized lead management system."
                  style={{ width: "100%", height: "auto", objectFit: "contain", display: "block" }}
                />
              </div>
              <div style={{ padding: "16px 12px 8px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
                  <div>
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-green)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>
                      SYSTEM BLUEPRINT
                    </div>
                    <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-text-bright)" }}>
                      ScalePods Real Estate AI Engine &times; Follow Up Boss
                    </div>
                  </div>
                  <Link
                    href="/solution/ai-automation-for-real-estate"
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "var(--color-blue-mid)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      textDecoration: "none"
                    }}
                  >
                    <span>Explore Real Estate Solutions</span>
                    <ArrowUpRight style={{ width: "14px", height: "14px" }} />
                  </Link>
                </div>
              </div>
            </div>

            {/* ── 5 Feature Deep-Dive Cards ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>

              {/* Pillar 1 */}
              <div
                className="premium-card"
                style={{
                  padding: "24px",
                  borderRadius: "24px"
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-5 order-2 lg:order-1">
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-blue-mid)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>
                      PILLAR 01
                    </div>
                    <h3 style={{ fontSize: "20px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "12px", lineHeight: 1.3 }}>
                      1. Faster Responses Across Lead Sources
                    </h3>
                    <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.6, marginBottom: "16px", textAlign: "justify", textJustify: "inter-word" }}>
                      The system ingests incoming buyer and seller leads from Facebook Ads, Google Ads, website forms, Fello home valuations, CallRail phone inquiries, and open house registrations directly into Follow Up Boss.
                    </p>
                    <div className="internal-panel" style={{ padding: "14px 16px", borderRadius: "12px", border: "1px solid var(--color-border)", marginBottom: "14px" }}>
                      <div style={{ fontSize: "12.5px", fontWeight: 600, color: "var(--color-text-bright)", marginBottom: "4px" }}>
                        ⚡ Sub-60-Second WhatsApp First-Touch
                      </div>
                      <div style={{ fontSize: "12px", color: "var(--color-text-muted)", lineHeight: 1.5 }}>
                        The conversational AI agent dispatches a personalized WhatsApp message within 60 seconds of inquiry. It asks no more than one qualifying question at a time, keeping interactions natural, professional, and focused.
                      </div>
                    </div>
                    <ul style={{ paddingLeft: "18px", margin: 0, fontSize: "13px", color: "var(--color-text-body)", lineHeight: 1.6 }}>
                      <li>Connects advertising leads directly to automated conversational flows</li>
                      <li>Captures high buyer intent while prospects are actively browsing</li>
                      <li>Eliminates hours of latency common with manual sales rep callbacks</li>
                    </ul>
                  </div>

                  <div className="lg:col-span-7 order-1 lg:order-2">
                    <div style={{ width: "100%", borderRadius: "16px", overflow: "hidden", background: "#060A12", border: "1px solid var(--color-border)" }}>
                      <img
                        src="/images/case-studies/ryan-schwartz/feature-faster-responses.png"
                        alt="A real estate professional uses a laptop and smartphone to manage incoming property leads from Facebook, Google, websites, and other platforms through a centralized messaging dashboard."
                        style={{ width: "100%", height: "auto", objectFit: "contain", display: "block" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Pillar 2 */}
              <div
                className="premium-card"
                style={{
                  padding: "24px",
                  borderRadius: "24px"
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7">
                    <div style={{ width: "100%", borderRadius: "16px", overflow: "hidden", background: "#060A12", border: "1px solid var(--color-border)" }}>
                      <img
                        src="/images/case-studies/ryan-schwartz/feature-custom-follow-up.png"
                        alt="A real estate professional manages automated, personalized follow-ups across WhatsApp, phone calls, SMS, email, and calendar reminders using a centralized lead management platform."
                        style={{ width: "100%", height: "auto", objectFit: "contain", display: "block" }}
                      />
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-green)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>
                      PILLAR 02
                    </div>
                    <h3 style={{ fontSize: "20px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "12px", lineHeight: 1.3 }}>
                      2. Custom Follow-Up &amp; Cadence Governance
                    </h3>
                    <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.6, marginBottom: "16px", textAlign: "justify", textJustify: "inter-word" }}>
                      Luxury buyers and sellers move on varying decision timelines. The automated scheduling engine determines the next contact moment dynamically based on lead timeline and engagement levels, orchestrating touchpoints across phone calls, SMS, WhatsApp, and email.
                    </p>
                    <div className="internal-panel" style={{ padding: "14px 16px", borderRadius: "12px", border: "1px solid var(--color-border)", marginBottom: "14px" }}>
                      <div style={{ fontSize: "12.5px", fontWeight: 600, color: "var(--color-text-bright)", marginBottom: "4px" }}>
                        🛡️ Duplicate Suppression &amp; Opt-Out Safeguards
                      </div>
                      <div style={{ fontSize: "12px", color: "var(--color-text-muted)", lineHeight: 1.5 }}>
                        Phone calls are strictly capped at 3 attempts in a rolling 30-day period. Message deduplication algorithms and real-time opt-out checks protect sender reputation and carrier quality ratings.
                      </div>
                    </div>
                    <ul style={{ paddingLeft: "18px", margin: 0, fontSize: "13px", color: "var(--color-text-body)", lineHeight: 1.6 }}>
                      <li>Adaptive intervals prevent prospects from feeling overwhelmed</li>
                      <li>Maintains a healthy WhatsApp quality score throughout rollout</li>
                      <li>Ensures consistent long-term nurture without manual tracking</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Pillar 3 */}
              <div
                className="premium-card"
                style={{
                  padding: "24px",
                  borderRadius: "24px"
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-5 order-2 lg:order-1">
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-blue-mid)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>
                      PILLAR 03
                    </div>
                    <h3 style={{ fontSize: "20px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "12px", lineHeight: 1.3 }}>
                      3. Conversations That Stay Connected
                    </h3>
                    <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.6, marginBottom: "16px", textAlign: "justify", textJustify: "inter-word" }}>
                      High-net-worth clients frequently switch between WhatsApp messages, emails, texts, and voice calls. The ecosystem preserves conversation context across every channel so agents and AI reps reference verified information instead of re-asking the same questions.
                    </p>
                    <div className="internal-panel" style={{ padding: "14px 16px", borderRadius: "12px", border: "1px solid var(--color-border)", marginBottom: "14px" }}>
                      <div style={{ fontSize: "12.5px", fontWeight: 600, color: "var(--color-text-bright)", marginBottom: "4px" }}>
                        🔥 0–3 Month High-Intent Escalation
                      </div>
                      <div style={{ fontSize: "12px", color: "var(--color-text-muted)", lineHeight: 1.5 }}>
                        When a lead indicates an urgent timeline (buying or selling within 3 months), the engine instantly routes the record and notifies Ryan or designated agents for high-touch personal closing.
                      </div>
                    </div>
                    <ul style={{ paddingLeft: "18px", margin: 0, fontSize: "13px", color: "var(--color-text-body)", lineHeight: 1.6 }}>
                      <li>Omnichannel context memory across WhatsApp, email, SMS, and phone</li>
                      <li>Automated buyer and seller qualification scoring</li>
                      <li>Immediate warm handoff when high conversion intent is detected</li>
                    </ul>
                  </div>

                  <div className="lg:col-span-7 order-1 lg:order-2">
                    <div style={{ width: "100%", borderRadius: "16px", overflow: "hidden", background: "#060A12", border: "1px solid var(--color-border)" }}>
                      <img
                        src="/images/case-studies/ryan-schwartz/feature-connected-conversations.png"
                        alt="A real estate professional manages connected conversations across email, WhatsApp, and phone calls, with customer messages, property details, and lead activity displayed in a unified dashboard."
                        style={{ width: "100%", height: "auto", objectFit: "contain", display: "block" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Pillar 4 */}
              <div
                className="premium-card"
                style={{
                  padding: "24px",
                  borderRadius: "24px"
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7">
                    <div style={{ width: "100%", borderRadius: "16px", overflow: "hidden", background: "#060A12", border: "1px solid var(--color-border)" }}>
                      <img
                        src="/images/case-studies/ryan-schwartz/feature-calendar-booking.png"
                        alt="Real estate lead management automation dashboard showing calendar availability, appointment scheduling, property booking confirmations, and automated notifications across WhatsApp, email, SMS, and phone."
                        style={{ width: "100%", height: "auto", objectFit: "contain", display: "block" }}
                      />
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-green)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>
                      PILLAR 04
                    </div>
                    <h3 style={{ fontSize: "20px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "12px", lineHeight: 1.3 }}>
                      4. Calendar Checks for Booking Appointments
                    </h3>
                    <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.6, marginBottom: "16px", textAlign: "justify", textJustify: "inter-word" }}>
                      When a qualified prospect is ready to schedule a private home showing or valuation call, the scheduling workflow queries live calendar availability in real time before proposing or confirming slots, eliminating booking conflicts.
                    </p>
                    <div className="internal-panel" style={{ padding: "14px 16px", borderRadius: "12px", border: "1px solid var(--color-border)", marginBottom: "14px" }}>
                      <div style={{ fontSize: "12.5px", fontWeight: 600, color: "var(--color-text-bright)", marginBottom: "4px" }}>
                        📅 Automated Multi-Channel Reminders
                      </div>
                      <div style={{ fontSize: "12px", color: "var(--color-text-muted)", lineHeight: 1.5 }}>
                        Once scheduled, synchronized notifications via WhatsApp, SMS, and email remind the client, cutting appointment no-show rates to under 15%.
                      </div>
                    </div>
                    <ul style={{ paddingLeft: "18px", margin: 0, fontSize: "13px", color: "var(--color-text-body)", lineHeight: 1.6 }}>
                      <li>Live calendar synchronization prevents accidental double bookings</li>
                      <li>Seamless appointment confirmation without email back-and-forth</li>
                      <li>Automated calendar invites with meeting details sent to both parties</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Pillar 5 */}
              <div
                className="premium-card"
                style={{
                  padding: "24px",
                  borderRadius: "24px"
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-5 order-2 lg:order-1">
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-blue-mid)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>
                      PILLAR 05
                    </div>
                    <h3 style={{ fontSize: "20px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "12px", lineHeight: 1.3 }}>
                      5. Calls &amp; CRM Records Handled Automatically
                    </h3>
                    <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.6, marginBottom: "16px", textAlign: "justify", textJustify: "inter-word" }}>
                      Voice agents manage inbound inquiries and execute outbound screening calls. Every completed conversation is automatically transcribed, summarized, and posted directly to Follow Up Boss with structured tags, sentiment analysis, and pipeline updates.
                    </p>
                    <div className="internal-panel" style={{ padding: "14px 16px", borderRadius: "12px", border: "1px solid var(--color-border)", marginBottom: "14px" }}>
                      <div style={{ fontSize: "12.5px", fontWeight: 600, color: "var(--color-text-bright)", marginBottom: "4px" }}>
                        📝 100% Automated CRM Accuracy
                      </div>
                      <div style={{ fontSize: "12px", color: "var(--color-text-muted)", lineHeight: 1.5 }}>
                        Eliminates manual CRM logging, ensures zero missing notes, and keeps client interaction records completely clean and actionable across the entire team.
                      </div>
                    </div>
                    <ul style={{ paddingLeft: "18px", margin: 0, fontSize: "13px", color: "var(--color-text-body)", lineHeight: 1.6 }}>
                      <li>Inbound call handling and automated call disposition logging</li>
                      <li>Real-time CRM tags and stage transitions inside Follow Up Boss</li>
                      <li>Comprehensive audit trail for every luxury prospect interaction</li>
                    </ul>
                  </div>

                  <div className="lg:col-span-7 order-1 lg:order-2">
                    <div style={{ width: "100%", borderRadius: "16px", overflow: "hidden", background: "#060A12", border: "1px solid var(--color-border)" }}>
                      <img
                        src="/images/case-studies/ryan-schwartz/feature-automated-calls-crm.png"
                        alt="AI-powered real estate calling and CRM automation system displaying call analytics, customer interactions, voice recordings, and automated lead record management."
                        style={{ width: "100%", height: "auto", objectFit: "contain", display: "block" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "var(--color-border)", marginBottom: "80px" }} />

          {/* ── Results & Impact ── */}
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
              The Results: Faster Replies and More Consistent Follow-Up
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "var(--color-text-muted)",
                lineHeight: 1.65,
                marginBottom: "32px",
                maxWidth: "100%",
                textAlign: "justify",
                textJustify: "inter-word"
              }}
            >
              Following deployment across Ryan's Naples and Aspen operations, the team achieved unprecedented speed-to-lead and conversion metrics:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="internal-panel" style={{ padding: "24px", borderRadius: "16px", border: "1px solid var(--color-border)" }}>
                <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-blue-mid)", marginBottom: "6px" }}>
                  &lt; 45 Seconds
                </div>
                <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--color-text-bright)", marginBottom: "6px" }}>
                  Average Speed-to-Lead
                </div>
                <div style={{ fontSize: "13px", color: "var(--color-text-muted)", lineHeight: 1.5 }}>
                  Consistently outperforming the system's 60-second response target across advertising, web, and valuation channels.
                </div>
              </div>

              <div className="internal-panel" style={{ padding: "24px", borderRadius: "16px", border: "1px solid var(--color-border)" }}>
                <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-green)", marginBottom: "6px" }}>
                  38% Engagement
                </div>
                <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--color-text-bright)", marginBottom: "6px" }}>
                  First-Touch WhatsApp Reply Rate
                </div>
                <div style={{ fontSize: "13px", color: "var(--color-text-muted)", lineHeight: 1.5 }}>
                  More than triple the estimated 12% reply rate historically achieved through traditional manual sales outreach.
                </div>
              </div>

              <div className="internal-panel" style={{ padding: "24px", borderRadius: "16px", border: "1px solid var(--color-border)" }}>
                <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-blue-mid)", marginBottom: "6px" }}>
                  22% Conversion
                </div>
                <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--color-text-bright)", marginBottom: "6px" }}>
                  Appointment Booking Rate
                </div>
                <div style={{ fontSize: "13px", color: "var(--color-text-muted)", lineHeight: 1.5 }}>
                  Roughly 22% of qualified inquiries converted directly into confirmed private showings or valuation sessions.
                </div>
              </div>

              <div className="internal-panel" style={{ padding: "24px", borderRadius: "16px", border: "1px solid var(--color-border)" }}>
                <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-green)", marginBottom: "6px" }}>
                  &lt; 15% No-Shows
                </div>
                <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--color-text-bright)", marginBottom: "6px" }}>
                  Appointment Reliability
                </div>
                <div style={{ fontSize: "13px", color: "var(--color-text-muted)", lineHeight: 1.5 }}>
                  Reported after introducing synchronized multi-channel reminder cadences prior to booked appointments.
                </div>
              </div>
            </div>

            <p
              style={{
                fontSize: "15px",
                color: "var(--color-text-body)",
                lineHeight: 1.65,
                margin: 0,
                textAlign: "justify",
                textJustify: "inter-word"
              }}
            >
              Hot leads with an immediate zero-to-three-month timeline are routed to Ryan in real time, letting the advisory prioritize prospects who are actively making purchasing decisions. These results show how real estate CRM workflow automation enables teams to spend less time chasing information and more time focusing on meaningful conversations with luxury buyers and sellers, mirroring outcomes seen at <Link href="/case-study/bennett-realty-growth-os" style={{ color: "var(--color-blue-mid)", fontWeight: 600, textDecoration: "underline" }}>Bennett Realty</Link> and <Link href="/case-study/lotus-manor-real-estate-sales-automation-dubai" style={{ color: "var(--color-blue-mid)", fontWeight: 600, textDecoration: "underline" }}>Lotus Manor Dubai</Link>.
            </p>
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
              FAQs About Real Estate CRM &amp; Lead Automation
            </h2>
            <BlogFaqAccordion faqData={activeFaqs} />
          </div>

          {/* ── Call to Action Card ── */}
          <div
            className="premium-card"
            style={{
              padding: "48px 36px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              marginBottom: "32px"
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "12px",
                fontWeight: 700,
                color: "var(--color-blue-mid)",
                textTransform: "uppercase",
                letterSpacing: "0.08em"
              }}
            >
              <Sparkles style={{ width: "16px", height: "16px" }} />
              Ready to Streamline Your Lead Management?
            </div>
            <h3
              style={{
                fontSize: "clamp(24px, 3vw, 36px)",
                fontWeight: 700,
                color: "var(--color-text-bright)",
                lineHeight: 1.25,
                maxWidth: "680px",
                margin: 0
              }}
            >
              Scale Your Real Estate Operations Without Adding More Admin Work
            </h3>
            <p
              style={{
                fontSize: "15.5px",
                color: "var(--color-text-muted)",
                lineHeight: 1.6,
                maxWidth: "640px",
                margin: 0,
                textAlign: "justify",
                textJustify: "inter-word"
              }}
            >
              If your team is juggling inquiries across multiple ad channels, manual CRM updates and inconsistent follow-ups can make it harder to spot the right opportunities. ScalePods builds custom <Link href="/solution/ai-automation-for-real-estate" style={{ color: "var(--color-blue-mid)", fontWeight: 600, textDecoration: "underline" }}>real estate workflow automations</Link> and <Link href="/solution/sales-workflow-automation" style={{ color: "var(--color-blue-mid)", fontWeight: 600, textDecoration: "underline" }}>sales CRM engines</Link> that connect your tools and workflows, helping your team respond faster and manage leads with greater consistency.
            </p>
            <div style={{ marginTop: "12px", display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
              <Link
                href="/contact"
                className="blog-back-btn"
                style={{
                  background: "var(--color-blue-mid)",
                  color: "#ffffff",
                  borderColor: "transparent",
                  padding: "12px 28px",
                  fontSize: "14px",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                <span>Book a Free Call</span>
                <ArrowUpRight style={{ width: "16px", height: "16px" }} />
              </Link>
              <Link
                href="/resources/case-studies"
                className="blog-back-btn"
                style={{
                  background: "transparent",
                  color: "var(--color-text-bright)",
                  padding: "12px 24px",
                  fontSize: "14px",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                <span>View All Case Studies</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
