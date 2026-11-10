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
  Check
} from "lucide-react";
import AnimatedMetric from "@/components/ui/AnimatedMetric";
import BlogFaqAccordion from "@/components/ui/BlogFaqAccordion";

interface MiguelCaseStudyProps {
  faqs?: Array<{ q: string; a: string }>;
}

const defaultFaqs = [
  {
    q: "What is an AI-powered clinic lead generation system?",
    a: "It is an automated outbound sales workflow that combines geographic data scraping, multi-channel social enrichment (Instagram, Facebook, LinkedIn), AI-generated personalized hooks, automated outreach cadences, and an AI Concierge that qualifies leads on BANT criteria before syncing bookings to CRM."
  },
  {
    q: "How does the system ensure LinkedIn outreach accounts don't get suspended?",
    a: "The system connects via Unipile with strict daily outreach throttling (capped at 15–20 actions per account per day) and randomized, human-like pacing intervals. During the pilot, zero accounts were flagged or restricted."
  },
  {
    q: "How does the AI personalize outreach hooks for each clinic?",
    a: "An AI model crawls each clinic's verified website, Instagram, Facebook, and LinkedIn pages to extract specific services, practitioner credentials, and positioning. It crafts a unique opening hook based on real business facts rather than generic cold templates."
  },
  {
    q: "What is the role of human review in this automated workflow?",
    a: "ScalePods operates on a human-in-the-loop framework. Every AI-generated outreach hook is presented in a daily batch reviewer dashboard, allowing a human manager to approve, tweak, or reject hooks before messages are dispatched."
  },
  {
    q: "How does the AI Concierge qualify leads using BANT?",
    a: "When a clinic replies with interest, the AI Concierge responds in under 60 seconds to evaluate Budget, Authority, Need, and Timeline through natural conversational prompts, offering live Calendly booking slots to qualified prospects."
  },
  {
    q: "Which CRMs and tools does this outbound system integrate with?",
    a: "The system was built with Pipedrive CRM for deal and contact management, Unipile for LinkedIn automation, Calendly for schedule booking, and Google Sheets for vertical/geographic control targeting."
  }
];

export default function MiguelCaseStudy({ faqs }: MiguelCaseStudyProps) {
  const activeFaqs = faqs && faqs.length > 0 ? faqs : defaultFaqs;

  return (
    <>
      <style>{`
        .miguel-overlay {
          background: rgba(255, 255, 255, 0.95);
          color: #0f172a;
          border: 1px solid rgba(15, 23, 42, 0.08);
        }
        .dark .miguel-overlay,
        [data-theme="dark"] .miguel-overlay {
          background: rgba(15, 23, 42, 0.95) !important;
          color: #ffffff !important;
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
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
          CASE STUDY · OUTBOUND AI &amp; SALES AUTOMATION
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
          47 Clinics Found. 34% LinkedIn Connection Rate. How Miguel Created An AI-Powered Lead Generation System
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
          Prospecting aesthetic clinics across diverse cities is simple to test, but extraordinarily demanding to scale manually. Researching practitioner profiles, cross-referencing treatments, and crafting tailored messages consumes dozens of sales hours weekly. ScalePods engineered an end-to-end <strong>AI sales automation and lead conversion system</strong> for Miguel—integrating dynamic geographic data scraping, multi-channel enrichment, AI personalized outreach hooks, automated LinkedIn cadences via Unipile, 3-stage follow-up nurturing, and sub-60-second AI Concierge BANT qualification synced into Pipedrive CRM.
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
            <div style={{ fontSize: "36px", fontWeight: 700, color: "var(--color-blue-mid)", marginBottom: "8px" }}>
              <AnimatedMetric value={47} duration={1800} />
            </div>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-text-bright)", marginBottom: "4px" }}>
              Clinics Found &amp; Processed
            </div>
            <div style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>
              47 of 50 target clinics fully automated
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
              <AnimatedMetric value={34} suffix="%" duration={2000} />
            </div>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-text-bright)", marginBottom: "4px" }}>
              LinkedIn Connection Rate
            </div>
            <div style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>
              9 clinics actively engaged with hook &amp; VSL
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
              <AnimatedMetric value={100} suffix="%" duration={2000} />
            </div>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-text-bright)", marginBottom: "4px" }}>
              Verified Information Hooks
            </div>
            <div style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>
              All hooks used real clinic &amp; doctor facts
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
            <div style={{ fontSize: "36px", fontWeight: 700, color: "var(--color-green)", marginBottom: "8px" }}>
              <AnimatedMetric value={0} duration={1200} />
            </div>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-text-bright)", marginBottom: "4px" }}>
              Suspended Accounts
            </div>
            <div style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>
              Zero flags via 15–20 daily action pacing
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
            <div style={{ display: "flex", alignItems: "baseline", gap: "2px", marginBottom: "8px" }}>
              <span style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-blue-mid)" }}>&lt;</span>
              <span style={{ fontSize: "36px", fontWeight: 700, color: "var(--color-blue-mid)" }}>
                <AnimatedMetric value={60} suffix="s" duration={1800} />
              </span>
            </div>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-text-bright)", marginBottom: "4px" }}>
              AI Concierge Response
            </div>
            <div style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>
              Instant BANT mapping to Pipedrive CRM
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
                About the Client &amp; Outbound Goal
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
                Miguel was looking to scale B2B customer acquisition for aesthetic clinics and medical wellness practices across targeted geographic regions. Traditional outbound was fragmented: sales reps spent too many hours manually scouring directories, crafting generic messages that were ignored, and failing to execute structured multi-touch follow-ups. ScalePods architected an autonomous, human-in-the-loop <Link href="/solution/sales-workflow-automation" style={{ color: "var(--color-blue-mid)", fontWeight: 600, textDecoration: "underline" }}>AI Sales Automation System</Link> that seamlessly orchestrates geographic scraping, AI personalization, safe LinkedIn outreach via Unipile, automated follow-ups, and AI Concierge qualification directly integrated with Pipedrive CRM.
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
                    Aesthetic Clinics
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
                    Miguel
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
                  Scope
                </div>
                <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--color-text-bright)" }}>
                  Multi-Region Geographic Scaling
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
                Core Tech &amp; Workflows
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {[
                  "Geographic Data Scraper",
                  "Licensed Social Enrichment",
                  "AI Personalized Hooks",
                  "Human Reviewer Gate",
                  "Unipile LinkedIn API",
                  "15–20 Action Limits",
                  "Day 3/5/7 Follow-Ups",
                  "Auto-Responder Filter",
                  "AI Concierge BANT",
                  "Pipedrive CRM Sync",
                  "Calendly Booking"
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
              The Challenges: Why Manual Prospecting Couldn&apos;t Scale
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "var(--color-text-muted)",
                lineHeight: 1.7,
                marginBottom: "36px"
              }}
            >
              Outbound clinic sales requires precise positioning and high credibility. Miguel struggled with four fundamental operational bottlenecks that made expanding into new geographic markets cost-prohibitive:
            </p>

            {/* Challenges Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Challenge 1 */}
              <div className="premium-card" style={{ padding: "28px" }}>
                <div style={{ position: "relative", width: "100%", height: "220px", borderRadius: "12px", overflow: "hidden", marginBottom: "20px" }}>
                  <Image
                    src="/images/case-studies/miguel/challenge-manual-geographic-prospecting.webp"
                    alt="A woman pointing at a large desktop monitor that displays a map interface scattered with several blue location drop pins."
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <div style={{ padding: "8px", borderRadius: "8px", background: "rgba(var(--color-blue-mid-rgb), 0.1)", color: "var(--color-blue-mid)" }}>
                    <MapPin style={{ width: "20px", height: "20px" }} />
                  </div>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-text-bright)", margin: 0 }}>
                    1. Manual Prospecting Across Geographic Areas
                  </h3>
                </div>
                <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.6, margin: 0 }}>
                  Identifying aesthetic clinics across varying cities and regional clusters required grueling manual research. As each new territory was introduced, the sales team had to start from scratch: searching directories, compiling lead lists, and locating individual contact details. This lack of automated prospecting created massive friction whenever expanding to new markets.
                </p>
              </div>

              {/* Challenge 2 */}
              <div className="premium-card" style={{ padding: "28px" }}>
                <div style={{ position: "relative", width: "100%", height: "220px", borderRadius: "12px", overflow: "hidden", marginBottom: "20px" }}>
                  <Image
                    src="/images/case-studies/miguel/challenge-generic-outreach.webp"
                    alt="A stressed-looking woman staring at her laptop, surrounded by floating graphics of generic message windows marked with a red 'X' to indicate failure or rejection."
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <div style={{ padding: "8px", borderRadius: "8px", background: "rgba(var(--color-green-rgb), 0.1)", color: "var(--color-green)" }}>
                    <MessageSquare style={{ width: "20px", height: "20px" }} />
                  </div>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-text-bright)", margin: 0 }}>
                    2. Generic, Template-Driven Outreach
                  </h3>
                </div>
                <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.6, margin: 0 }}>
                  Relying on standard cold templates meant messages completely ignored what treatments the clinic specialized in, how they positioned their doctors, or their unique branding. Clinic owners immediately recognized mass-blasted copy and deleted the messages, resulting in dismally low connection and conversion rates.
                </p>
              </div>

              {/* Challenge 3 */}
              <div className="premium-card" style={{ padding: "28px" }}>
                <div style={{ position: "relative", width: "100%", height: "220px", borderRadius: "12px", overflow: "hidden", marginBottom: "20px" }}>
                  <Image
                    src="/images/case-studies/miguel/challenge-keeping-up-with-followups.webp"
                    alt="A workflow diagram illustrating a process moving from an initial audience and a rejected message to a series of automated, successful calendar and checklist actions."
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <div style={{ padding: "8px", borderRadius: "8px", background: "rgba(var(--color-blue-mid-rgb), 0.1)", color: "var(--color-blue-mid)" }}>
                    <Clock style={{ width: "20px", height: "20px" }} />
                  </div>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-text-bright)", margin: 0 }}>
                    3. Difficult Keeping Up With Multi-Touch Follow-Ups
                  </h3>
                </div>
                <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.6, margin: 0 }}>
                  The fortune in outbound sales lies in persistent, polite follow-ups. However, manually tracking who required a nudge on Day 3, Day 5, and Day 7 across dozens of concurrent conversations caused overwhelming cognitive load. When sales reps forgot or delayed follow-ups, warm opportunities went cold.
                </p>
              </div>

              {/* Challenge 4 */}
              <div className="premium-card" style={{ padding: "28px" }}>
                <div style={{ position: "relative", width: "100%", height: "220px", borderRadius: "12px", overflow: "hidden", marginBottom: "20px" }}>
                  <Image
                    src="/images/case-studies/miguel/challenge-identify-real-interests.webp"
                    alt="A woman looking thoughtfully at her laptop, with a graphical overlay showing multiple user profile cards being routed into an AI processing system."
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <div style={{ padding: "8px", borderRadius: "8px", background: "rgba(var(--color-green-rgb), 0.1)", color: "var(--color-green)" }}>
                    <UserCheck style={{ width: "20px", height: "20px" }} />
                  </div>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-text-bright)", margin: 0 }}>
                    4. Identifying Real Intent &amp; Qualification Bottlenecks
                  </h3>
                </div>
                <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.6, margin: 0 }}>
                  Even when clinics replied, someone still needed to qualify them, weed out auto-responders, evaluate fit, schedule calls, and record updates in the CRM. Lacking real-time qualification meant high-intent prospects waited hours for a reply, drastically reducing meeting conversion.
                </p>
              </div>
            </div>
          </div>

          {/* ── The Solution: System Architecture ── */}
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
              The Solution: AI-Powered Lead Generation &amp; Conversion System
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "var(--color-text-muted)",
                lineHeight: 1.7,
                marginBottom: "32px",
                textAlign: "justify",
                textJustify: "inter-word"
              }}
            >
              ScalePods engineered an integrated sales automation pipeline combining human governance with autonomous execution. Configured through a centralized control sheet, Miguel can dynamically adjust geographic locations and clinic sub-verticals with a single click. The platform connects data extraction, AI personalization, reviewer approval, safe LinkedIn outreach, automated follow-up cadences, and an AI Concierge that completes BANT qualification and CRM synchronization.
            </p>

            {/* Architecture Graphic */}
            <div className="premium-card" style={{ padding: "24px", marginBottom: "40px" }}>
              <div style={{ position: "relative", width: "100%", height: "400px", borderRadius: "16px", overflow: "hidden" }}>
                <Image
                  src="/images/case-studies/miguel/solution-lead-gen-conversion-system.webp"
                  alt="A woman working at a laptop, overlaid with a digital flowchart connecting a LinkedIn profile, messaging icons, an AI robot avatar, and a calendar schedule."
                  fill
                  priority
                  sizes="(max-width: 1200px) 100vw, 1100px"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>

            {/* ── 5 Engines Deep Dive ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
              
              {/* Engine 01 */}
              <div className="premium-card" style={{ padding: "32px" }}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7">
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-blue-mid)", padding: "4px 8px", borderRadius: "6px", background: "rgba(var(--color-blue-mid-rgb), 0.1)" }}>
                        ENGINE 01
                      </span>
                      <h3 style={{ fontSize: "22px", fontWeight: 700, color: "var(--color-text-bright)", margin: 0 }}>
                        Find &amp; Enrich Leads
                      </h3>
                    </div>
                    <p style={{ fontSize: "15px", color: "var(--color-text-muted)", lineHeight: 1.7, marginBottom: "16px" }}>
                      Outbound success begins with verified targeting. Using a master control sheet, Miguel sets the target cities and aesthetic verticals. An automated web scraper pulls clinic business data directly from public and commercial directories. Next, a licensed data provider enriches each clinic profile with social links across <strong>Instagram, Facebook, and LinkedIn</strong>, alongside verified practitioner emails and phone numbers.
                    </p>
                    <ul style={{ margin: 0, paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px", color: "var(--color-text-muted)" }}>
                      <li><strong style={{ color: "var(--color-text-bright)" }}>Control Sheet Driven:</strong> Instantly pivot targeting across cities without changing technical code.</li>
                      <li><strong style={{ color: "var(--color-text-bright)" }}>Multi-Channel Enrichment:</strong> Collects Instagram, Facebook, and LinkedIn footprints for full context.</li>
                      <li><strong style={{ color: "var(--color-text-bright)" }}>Automated Validation:</strong> Formats raw data into structured lead objects ready for custom AI hooks.</li>
                    </ul>
                  </div>
                  <div className="lg:col-span-5">
                    <div style={{ position: "relative", width: "100%", height: "240px", borderRadius: "12px", overflow: "hidden" }}>
                      <Image
                        src="/images/case-studies/miguel/engine-01-find-enrich-leads.webp"
                        alt="A technical graphic showing a web crawler spider icon connecting to a central database cylinder, representing lead finding and data enrichment."
                        fill
                        sizes="(max-width: 768px) 100vw, 450px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Engine 02 */}
              <div className="premium-card" style={{ padding: "32px" }}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-5 order-2 lg:order-1">
                    <div style={{ position: "relative", width: "100%", height: "240px", borderRadius: "12px", overflow: "hidden" }}>
                      <Image
                        src="/images/case-studies/miguel/engine-02-personalise-outreach.webp"
                        alt="A graphical workflow showing an AI icon automatically generating a personalised email or text document."
                        fill
                        sizes="(max-width: 768px) 100vw, 450px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>
                  <div className="lg:col-span-7 order-1 lg:order-2">
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-green)", padding: "4px 8px", borderRadius: "6px", background: "rgba(var(--color-green-rgb), 0.1)" }}>
                        ENGINE 02
                      </span>
                      <h3 style={{ fontSize: "22px", fontWeight: 700, color: "var(--color-text-bright)", margin: 0 }}>
                        Personalise Outreach with Human Review
                      </h3>
                    </div>
                    <p style={{ fontSize: "15px", color: "var(--color-text-muted)", lineHeight: 1.7, marginBottom: "16px" }}>
                      Instead of relying on boilerplate copy, an advanced AI model crawls the clinic&apos;s website and recent social media posts to identify specific treatments offered, patient positioning, and doctor credentials. The model generates hyper-specific outreach hooks referencing genuine clinic information. To guarantee 100% brand safety, every hook is presented in a daily batch approval dashboard where a human reviewer confirms or adjusts it with a single click.
                    </p>
                    <ul style={{ margin: 0, paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px", color: "var(--color-text-muted)" }}>
                      <li><strong style={{ color: "var(--color-text-bright)" }}>Contextual Fact Extraction:</strong> AI references actual treatments and clinic achievements.</li>
                      <li><strong style={{ color: "var(--color-text-bright)" }}>Human-in-the-Loop Gateway:</strong> Reviewers verify message accuracy before anything is sent.</li>
                      <li><strong style={{ color: "var(--color-text-bright)" }}>High Authenticity:</strong> Prospects feel individually researched rather than mass marketed.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Engine 03 */}
              <div className="premium-card" style={{ padding: "32px" }}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7">
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-blue-mid)", padding: "4px 8px", borderRadius: "6px", background: "rgba(var(--color-blue-mid-rgb), 0.1)" }}>
                        ENGINE 03
                      </span>
                      <h3 style={{ fontSize: "22px", fontWeight: 700, color: "var(--color-text-bright)", margin: 0 }}>
                        Automated LinkedIn Outreach via Unipile
                      </h3>
                    </div>
                    <p style={{ fontSize: "15px", color: "var(--color-text-muted)", lineHeight: 1.7, marginBottom: "16px" }}>
                      Approved hooks are automatically dispatched through Unipile, connecting securely to LinkedIn accounts. To prevent account restrictions and mirror natural human behavior, the system enforces strict daily limits of <strong>15–20 connection requests and messages per account</strong> with randomized pacing delays. This algorithmic safety resulted in zero flagged or suspended accounts throughout the deployment.
                    </p>
                    <ul style={{ margin: 0, paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px", color: "var(--color-text-muted)" }}>
                      <li><strong style={{ color: "var(--color-text-bright)" }}>Unipile API Integration:</strong> Seamlessly dispatches connection requests with custom notes.</li>
                      <li><strong style={{ color: "var(--color-text-bright)" }}>Randomized Human Pacing:</strong> Varies dispatch intervals to protect LinkedIn sender reputation.</li>
                      <li><strong style={{ color: "var(--color-text-bright)" }}>100% Account Safety:</strong> Capped action volumes prevent carrier spam triggers.</li>
                    </ul>
                  </div>
                  <div className="lg:col-span-5">
                    <div style={{ position: "relative", width: "100%", height: "240px", borderRadius: "12px", overflow: "hidden" }}>
                      <Image
                        src="/images/case-studies/miguel/engine-03-automated-linkedin-outreach.webp"
                        alt="A woman at a computer with a visual overlay depicting a workflow for automated LinkedIn connections and direct messaging."
                        fill
                        sizes="(max-width: 768px) 100vw, 450px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Engine 04 */}
              <div className="premium-card" style={{ padding: "32px" }}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-5 order-2 lg:order-1">
                    <div style={{ position: "relative", width: "100%", height: "240px", borderRadius: "12px", overflow: "hidden" }}>
                      <Image
                        src="/images/case-studies/miguel/engine-04-automated-follow-up.webp"
                        alt="A workflow diagram illustrating a process moving from an initial audience and a rejected message to a series of automated, successful calendar and checklist actions."
                        fill
                        sizes="(max-width: 768px) 100vw, 450px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>
                  <div className="lg:col-span-7 order-1 lg:order-2">
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-green)", padding: "4px 8px", borderRadius: "6px", background: "rgba(var(--color-green-rgb), 0.1)" }}>
                        ENGINE 04
                      </span>
                      <h3 style={{ fontSize: "22px", fontWeight: 700, color: "var(--color-text-bright)", margin: 0 }}>
                        Automated Follow-Up &amp; Reply Categorisation
                      </h3>
                    </div>
                    <p style={{ fontSize: "15px", color: "var(--color-text-muted)", lineHeight: 1.7, marginBottom: "16px" }}>
                      Unresponsive clinics are immediately enrolled into an automated multi-step nurturing cadence: Day 3 (First follow-up with value add), Day 5 (Second follow-up with case study video/VSL), and Day 7 (Polite breakup message). When replies register, an AI classification model categorizes the intent. Auto-responders and out-of-office notifications are automatically diverted to email to maintain a clean LinkedIn conversation queue.
                    </p>
                    <ul style={{ margin: 0, paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px", color: "var(--color-text-muted)" }}>
                      <li><strong style={{ color: "var(--color-text-bright)" }}>Consistent Cadence:</strong> Day 3, 5, and 7 touches without requiring manual sales memory.</li>
                      <li><strong style={{ color: "var(--color-text-bright)" }}>Auto-Responder Filtering:</strong> 4 auto-responses diverted to email, preventing bot confusion.</li>
                      <li><strong style={{ color: "var(--color-text-bright)" }}>Reply Intent Classification:</strong> Instantly detects genuine positive interest vs. opt-outs.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Engine 05 */}
              <div className="premium-card" style={{ padding: "32px" }}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7">
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-blue-mid)", padding: "4px 8px", borderRadius: "6px", background: "rgba(var(--color-blue-mid-rgb), 0.1)" }}>
                        ENGINE 05
                      </span>
                      <h3 style={{ fontSize: "22px", fontWeight: 700, color: "var(--color-text-bright)", margin: 0 }}>
                        AI Concierge Qualification &amp; Pipedrive CRM Sync
                      </h3>
                    </div>
                    <p style={{ fontSize: "15px", color: "var(--color-text-muted)", lineHeight: 1.7, marginBottom: "16px" }}>
                      When a prospect demonstrates real buying intent, the conversational AI Concierge activates in under 60 seconds. The AI qualifies the clinic lead based on <strong>BANT criteria (Budget, Authority, Need, Timeline)</strong> in a fluid, consultative dialogue. Once qualified, the AI Concierge coordinates appointment slots via Calendly and automatically logs the complete qualification profile, meeting details, and structured conversation notes into Pipedrive CRM.
                    </p>
                    <ul style={{ margin: 0, paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px", color: "var(--color-text-muted)" }}>
                      <li><strong style={{ color: "var(--color-text-bright)" }}>Sub-60s Response Speed:</strong> Engages interested clinic owners when their attention is highest.</li>
                      <li><strong style={{ color: "var(--color-text-bright)" }}>BANT Qualification:</strong> Checks authority, budget, needs, and buying timeframe.</li>
                      <li><strong style={{ color: "var(--color-text-bright)" }}>Full Pipedrive Sync:</strong> Zero manual CRM data entry for appointments or lead status.</li>
                    </ul>
                  </div>
                  <div className="lg:col-span-5">
                    <div style={{ position: "relative", width: "100%", height: "240px", borderRadius: "12px", overflow: "hidden" }}>
                      <Image
                        src="/images/case-studies/miguel/engine-05-ai-concierge-qualification.webp"
                        alt="A stylized diagram featuring a glowing 3D AI robot face in the center, managing a workflow that routes chat messages into scheduled calendar events."
                        fill
                        sizes="(max-width: 768px) 100vw, 450px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ── Pilot Results Section ── */}
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
              The Results: Proven Pilot Performance
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "var(--color-text-muted)",
                lineHeight: 1.7,
                marginBottom: "36px"
              }}
            >
              During the initial 50-clinic pilot run and test evaluations, the automated sales pipeline demonstrated substantial gains across discovery, engagement, and operational compliance:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Result 1 */}
              <div className="premium-card" style={{ padding: "24px" }}>
                <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-blue-mid)", marginBottom: "8px" }}>
                  47 / 50
                </div>
                <h4 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px" }}>
                  Clinics Fully Found &amp; Enriched
                </h4>
                <p style={{ fontSize: "13px", color: "var(--color-text-muted)", lineHeight: 1.6, margin: 0 }}>
                  47 of the 50 pilot clinics were completely identified, enriched with social data, and processed automatically, with only 3 flagged for human review.
                </p>
              </div>

              {/* Result 2 */}
              <div className="premium-card" style={{ padding: "24px" }}>
                <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-green)", marginBottom: "8px" }}>
                  100%
                </div>
                <h4 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px" }}>
                  Verified Personalization
                </h4>
                <p style={{ fontSize: "13px", color: "var(--color-text-muted)", lineHeight: 1.6, margin: 0 }}>
                  Every generated hook contained verified business facts extracted directly from clinic websites and social footprints, verified by human review.
                </p>
              </div>

              {/* Result 3 */}
              <div className="premium-card" style={{ padding: "24px" }}>
                <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-blue-mid)", marginBottom: "8px" }}>
                  ~34%
                </div>
                <h4 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px" }}>
                  LinkedIn Connection Rate
                </h4>
                <p style={{ fontSize: "13px", color: "var(--color-text-muted)", lineHeight: 1.6, margin: 0 }}>
                  High-intent personalized hooks drove a ~34% connection rate, with 9 clinics actively engaging with the opening message and video sales letter.
                </p>
              </div>

              {/* Result 4 */}
              <div className="premium-card" style={{ padding: "24px" }}>
                <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-green)", marginBottom: "8px" }}>
                  0
                </div>
                <h4 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px" }}>
                  Accounts Flagged / Suspended
                </h4>
                <p style={{ fontSize: "13px", color: "var(--color-text-muted)", lineHeight: 1.6, margin: 0 }}>
                  By strictly adhering to 15–20 daily limits and randomized human pacing via Unipile, outreach accounts remained in pristine standing.
                </p>
              </div>

              {/* Result 5 */}
              <div className="premium-card" style={{ padding: "24px" }}>
                <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-blue-mid)", marginBottom: "8px" }}>
                  4
                </div>
                <h4 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px" }}>
                  Auto-Responders Diverted
                </h4>
                <p style={{ fontSize: "13px", color: "var(--color-text-muted)", lineHeight: 1.6, margin: 0 }}>
                  Out-of-office replies were automatically identified and filtered to email, keeping the LinkedIn pipeline clean and preventing bot confusion.
                </p>
              </div>

              {/* Result 6 */}
              <div className="premium-card" style={{ padding: "24px" }}>
                <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-green)", marginBottom: "8px" }}>
                  &lt; 60s
                </div>
                <h4 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px" }}>
                  AI Concierge Response Time
                </h4>
                <p style={{ fontSize: "13px", color: "var(--color-text-muted)", lineHeight: 1.6, margin: 0 }}>
                  Warm replies received responses in under 60 seconds, evaluating BANT parameters and mapping appointment bookings into Pipedrive CRM.
                </p>
              </div>
            </div>
          </div>

          {/* ── Why ScalePods ── */}
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
              Why ScalePods: Engineered for Scalable Outbound
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="premium-card" style={{ padding: "32px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <div style={{ padding: "10px", borderRadius: "10px", background: "rgba(var(--color-blue-mid-rgb), 0.1)", color: "var(--color-blue-mid)" }}>
                    <ShieldCheck style={{ width: "24px", height: "24px" }} />
                  </div>
                  <h3 style={{ fontSize: "20px", fontWeight: 700, color: "var(--color-text-bright)", margin: 0 }}>
                    Integrated Sales System with Human Governance
                  </h3>
                </div>
                <p style={{ fontSize: "15px", color: "var(--color-text-muted)", lineHeight: 1.7, margin: 0 }}>
                  Miguel didn&apos;t just need a list of clinics—he needed an interconnected sales engine. ScalePods combined autonomous data harvesting, AI personalization, and automated follow-ups with a daily human approval dashboard, maintaining complete message quality without burdening the internal team.
                </p>
              </div>

              <div className="premium-card" style={{ padding: "32px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <div style={{ padding: "10px", borderRadius: "10px", background: "rgba(var(--color-green-rgb), 0.1)", color: "var(--color-green)" }}>
                    <Sliders style={{ width: "24px", height: "24px" }} />
                  </div>
                  <h3 style={{ fontSize: "20px", fontWeight: 700, color: "var(--color-text-bright)", margin: 0 }}>
                    Rapid Geographic &amp; Vertical Expansion
                  </h3>
                </div>
                <p style={{ fontSize: "15px", color: "var(--color-text-muted)", lineHeight: 1.7, margin: 0 }}>
                  Thanks to the centralized control sheet architecture, Miguel can expand outreach to a new city, state, or medical sub-niche simply by adding a row to a spreadsheet. The system dynamically runs scraping, social enrichment, and cadences without technical overhead.
                </p>
              </div>
            </div>
          </div>

          {/* ── Conversion CTA Banner ── */}
          <div
            className="premium-card"
            style={{
              padding: "48px 36px",
              textAlign: "center",
              marginBottom: "80px",
              background: "linear-gradient(135deg, rgba(var(--color-blue-mid-rgb), 0.08) 0%, rgba(var(--color-green-rgb), 0.05) 100%)",
              border: "1px solid rgba(var(--color-blue-mid-rgb), 0.2)"
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "clamp(24px, 3.2vw, 34px)",
                fontWeight: 700,
                color: "var(--color-text-bright)",
                marginBottom: "16px"
              }}
            >
              Want to Create a Smarter Lead Generation System?
            </h3>
            <p
              style={{
                fontSize: "16px",
                color: "var(--color-text-muted)",
                lineHeight: 1.7,
                maxWidth: "700px",
                margin: "0 auto 28px"
              }}
            >
              Manual prospecting, generic copy, and inconsistent follow-ups can throttle your outbound growth. ScalePods engineers autonomous AI ecosystems that find verified prospects, craft personalized hooks, qualify buyer intent, and keep your CRM updated 24/7.
            </p>
            <Link
              href="/#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 28px",
                borderRadius: "10px",
                background: "var(--color-blue-mid)",
                color: "#ffffff",
                fontSize: "15px",
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 0.3s ease"
              }}
              className="hover:opacity-90"
            >
              Book A Discovery Call <ArrowUpRight style={{ width: "18px", height: "18px" }} />
            </Link>
          </div>

          {/* ── FAQ Section ── */}
          <div style={{ marginBottom: "60px" }}>
            <h2
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "clamp(24px, 3vw, 32px)",
                fontWeight: 700,
                color: "var(--color-text-bright)",
                marginBottom: "24px",
                letterSpacing: "-0.02em"
              }}
            >
              Frequently Asked Questions
            </h2>
            <BlogFaqAccordion faqData={activeFaqs} />
          </div>

        </div>
      </div>
    </>
  );
}

