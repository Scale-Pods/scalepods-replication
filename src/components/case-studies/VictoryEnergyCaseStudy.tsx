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
  Info,
  Clock,
  Sparkles,
  Bot,
  CalendarCheck,
  TrendingUp,
  FileCheck2,
  Users,
  BarChart3,
  Database,
  Building2,
  PieChart,
  Megaphone,
  Briefcase,
  Flame,
  ArrowRight
} from "lucide-react";
import AnimatedMetric from "@/components/ui/AnimatedMetric";
import BlogFaqAccordion from "@/components/ui/BlogFaqAccordion";

interface VictoryEnergyProps {
  faqs?: Array<{ q: string; a: string }>;
}

const defaultFaqs = [
  {
    q: "What is Victory Energy and why did they partner with ScalePods?",
    a: "Victory Energy is an industrial energy solutions leader specializing in the design, engineering, and manufacturing of boilers, burners, and heat-recovery equipment. They partnered with ScalePods to eliminate manual bottlenecks across recruiting, sales, marketing, and 17-entity financial operations through custom AI operating systems."
  },
  {
    q: "What were the four AI operating systems deployed?",
    a: "ScalePods engineered Talent OS (candidate screening, interview self-scheduling, and Gusto onboarding), Growth OS for Sales (sub-2-minute multi-channel lead response and qualification), Growth OS for Marketing (contextual content generation, maker-checker approvals, and automated publishing), and Financial OS (multi-entity reconciliation, bill extraction, and cash forecasting across 17 companies)."
  },
  {
    q: "How did Financial OS consolidate accounting across 17 distinct entities?",
    a: "Financial OS integrated Xero, bank feeds, and payroll into a single unified financial dashboard. It automatically reconciles over 90% of bank transactions, routes bill approval exceptions directly to responsible approvers, and monitors overdue invoice reminders, shortening month-end close from 9 days to 5 days."
  },
  {
    q: "How does Talent OS accelerate candidate hiring without removing human discretion?",
    a: "Talent OS parses CVs, compares them against weighted job specifications, and scores candidates at scale. Shortlisted applicants self-book interview slots with automated reminder sequences. Recruiters and hiring managers retain 100% control over the final hiring decision before automated Gusto onboarding triggers."
  },
  {
    q: "What multi-channel follow-up cadences were established in Growth OS for Sales?",
    a: "Growth OS initiates sub-2-minute automated outreach across the prospect's channel of choice (WhatsApp, SMS, email, or AI voice). It runs a 21-day structured nurture sequence, provides automated pre-call briefs to sales reps, and dynamically reallocates budget away from underperforming ad campaigns."
  },
  {
    q: "How does Growth OS for Marketing enforce brand governance?",
    a: "The system ingests Victory Energy brand assets, style guides, and competitor insights to generate campaign assets. It implements a strict 'maker-checker' review workflow where human marketers approve copy and visuals before automated publishing to Instagram, LinkedIn, and the website."
  },
  {
    q: "Does ScalePods AI automation replace employees?",
    a: "No. ScalePods operates on a human-in-the-loop philosophy. The operating systems eliminate routine administrative friction—such as manual data entry, resume parsing, and reconciliation—freeing teams to focus on strategic execution, candidate relationships, and deal closing."
  },
  {
    q: "What were the primary ROI metrics achieved by Victory Energy?",
    a: "Results included a 74% reduction in resume screening time, a 38% increase in booked sales appointments, a 65% reduction in manual marketing production hours, 70% less routine finance processing time, and shortening month-end close from 9 days to 5 days across 17 entities."
  }
];

export default function VictoryEnergyCaseStudy({ faqs }: VictoryEnergyProps) {
  const activeFaqs = faqs && faqs.length > 0 ? faqs : defaultFaqs;

  return (
    <>
      <style>{`
        .ve-workflow-dark {
          display: none !important;
        }
        .ve-workflow-light {
          display: block !important;
        }
        .dark .ve-workflow-dark,
        [data-theme="dark"] .ve-workflow-dark {
          display: block !important;
        }
        .dark .ve-workflow-light,
        [data-theme="dark"] .ve-workflow-light {
          display: none !important;
        }
        .ve-overlay {
          background: rgba(255, 255, 255, 0.95);
          color: #0f172a;
          border: 1px solid rgba(15, 23, 42, 0.08);
        }
        .dark .ve-overlay,
        [data-theme="dark"] .ve-overlay {
          background: rgba(15, 23, 42, 0.95) !important;
          color: #ffffff !important;
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
        }
        .ve-name {
          color: #0f172a;
        }
        .dark .ve-name,
        [data-theme="dark"] .ve-name {
          color: #ffffff !important;
        }
        .ve-title {
          color: #475569;
        }
        .dark .ve-title,
        [data-theme="dark"] .ve-title {
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
          How Victory Energy Automated Four Core Business Functions with AI Operating Systems
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
            Victory Energy is a premier industrial energy solutions enterprise specializing in the custom design, engineering, and precision manufacturing of industrial boilers, burners, and heat-recovery systems. With operations expanding across 17 distinct business entities, administrative friction began accumulating across every major functional department.
          </p>
          <p style={{ margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
            Recruiting was overwhelmed by manual resume review and scheduling lag. Sales opportunities were decaying during 6-hour average response delays. Marketing content production was slowed by tedious handoffs and unmonitored ad spend. In accounting, managing books across 17 entities meant manual bank reconciliation, delayed invoice approvals, and a grueling 9-day month-end close.
          </p>
          <p style={{ margin: 0, fontWeight: 500, color: "var(--color-text-bright)", textAlign: "justify", textJustify: "inter-word" }}>
            ScalePods engineered four bespoke AI Operating Systems—<strong>Talent OS</strong>, <strong>Growth OS for Sales</strong>, <strong>Growth OS for Marketing</strong>, and <strong>Financial OS</strong>—unifying these operations into a connected, human-in-the-loop workflow engine that slashed resume screening by 74%, increased appointment bookings by 38%, and compressed month-end financial close to just 5 days.
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
              -<AnimatedMetric value={74} suffix="%" />
            </div>
            <div style={{ fontSize: "14.5px", color: "var(--color-text-muted)", lineHeight: 1.4, maxWidth: "160px" }}>
              Fewer hours reviewing job applications
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
              +<AnimatedMetric value={38} suffix="%" />
            </div>
            <div style={{ fontSize: "14.5px", color: "var(--color-text-muted)", lineHeight: 1.4, maxWidth: "180px" }}>
              More booked sales appointments
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
              -<AnimatedMetric value={65} suffix="%" />
            </div>
            <div style={{ fontSize: "14.5px", color: "var(--color-text-muted)", lineHeight: 1.4, maxWidth: "160px" }}>
              Reduced manual marketing production hours
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
              -<AnimatedMetric value={70} suffix="%" />
            </div>
            <div style={{ fontSize: "14.5px", color: "var(--color-text-muted)", lineHeight: 1.4, maxWidth: "160px" }}>
              Less routine finance processing across 17 units
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
            {/* Left Column: Image with overlay */}
            <div
              className="md:col-span-5"
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "1.25",
                borderRadius: "16px",
                overflow: "hidden",
                background: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px",
                border: "1px solid rgba(0, 0, 0, 0.08)"
              }}
            >
              <img
                src="/new logos/VE-Logo-Color.svg"
                alt="Victory Energy Logo"
                style={{ width: "90%", height: "auto", objectFit: "contain" }}
              />
              {/* Overlay Badge */}
              <div
                className="ve-overlay"
                style={{
                  position: "absolute",
                  bottom: "12px",
                  left: "12px",
                  borderRadius: "12px",
                  padding: "10px 14px",
                  backdropFilter: "blur(8px)"
                }}
              >
                <div className="ve-name" style={{ fontWeight: 700, fontSize: "14px", lineHeight: 1.2, marginBottom: "2px" }}>
                  Victory Energy Operations
                </div>
                <div className="ve-title" style={{ fontSize: "11.5px", fontWeight: 500 }}>
                  17 Business Entities Consolidated
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
                  ENTERPRISE AI TRANSFORMATION
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
                “When you operate across 17 distinct companies, manual reconciliation and disconnected communication grind growth to a halt. ScalePods didn&apos;t just install tools; they engineered four interconnected operating systems built around our real daily work, giving our leadership complete visibility while saving our teams thousands of manual hours.”
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
                About Victory Energy
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
                Victory Energy is an industrial energy solutions company specializing in the design, engineering, and manufacturing of boilers, burners, and heat-recovery equipment. Their mission is to provide solutions-based approaches to industrial sectors to meet specialized steam, thermal energy, and process requirements.
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
                    Industrial Energy
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
                    Victory Energy
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
                  marginBottom: "12px"
                }}
              >
                Key Focus Systems
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                <Link
                  href="/solution/hr-workflow-automation"
                  style={{
                    fontSize: "12px",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    background: "var(--color-bg-card-alt)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-blue-mid)",
                    textDecoration: "none",
                    fontWeight: 600
                  }}
                  className="hover:border-blue-400"
                >
                  Talent OS
                </Link>
                <Link
                  href="/solution/sales-workflow-automation"
                  style={{
                    fontSize: "12px",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    background: "var(--color-bg-card-alt)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-blue-mid)",
                    textDecoration: "none",
                    fontWeight: 600
                  }}
                  className="hover:border-blue-400"
                >
                  Growth OS (Sales)
                </Link>
                {["Growth OS (Marketing)", "Financial OS", "17 Entities"].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: "12px",
                      padding: "4px 10px",
                      borderRadius: "6px",
                      background: "var(--color-bg-card-alt)",
                      border: "1px solid var(--color-border)",
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
              The Challenges: Operational Friction Multiplied Across 17 Entities
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
              As Victory Energy scaled industrial manufacturing operations across 17 distinct companies, disconnected processes and manual coordination created administrative ceilings in four core operational departments:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Challenge Card 1 */}
              <div
                className="premium-card"
                style={{
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px"
                }}
              >
                <div style={{ width: "100%", height: "200px", borderRadius: "16px", overflow: "hidden" }}>
                  <img
                    src="/images/case-studies/victory-energy/challenge-hiring-eating-recruiting.webp"
                    alt="The Hiring Was Eating Into Recruiting"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div className="internal-panel" style={{ padding: "20px", flex: 1 }}>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--color-blue-mid)", marginBottom: "6px" }}>
                    CHALLENGE 01
                  </div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    The Hiring Was Eating Into Recruiting
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    The recruitment team was buried under high-volume manual resume screening across fragmented inboxes, averaging 12 minutes per CV. Scheduling interviews required endless email back-and-forth, post-interview feedback lagged, and hiring data entry introduced costly errors before candidates could be onboarded.
                  </p>
                </div>
              </div>

              {/* Challenge Card 2 */}
              <div
                className="premium-card"
                style={{
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px"
                }}
              >
                <div style={{ width: "100%", height: "200px", borderRadius: "16px", overflow: "hidden" }}>
                  <img
                    src="/images/case-studies/victory-energy/challenge-sales-followup-slow.webp"
                    alt="Sales Follow-Up Slower Than The Leads Wanted"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div className="internal-panel" style={{ padding: "20px", flex: 1 }}>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--color-blue-mid)", marginBottom: "6px" }}>
                    CHALLENGE 02
                  </div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    Sales Follow-Up Slower Than The Leads Wanted
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Inbound leads took an average of 6 hours to receive a response, causing high-intent prospects to go cold. Lead scoring was absent, meaning sales reps wasted time pursuing unqualified contacts while warm opportunities slipped through the cracks. No-show rates climbed without automated reminder cadences.
                  </p>
                </div>
              </div>

              {/* Challenge Card 3 */}
              <div
                className="premium-card"
                style={{
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px"
                }}
              >
                <div style={{ width: "100%", height: "200px", borderRadius: "16px", overflow: "hidden" }}>
                  <img
                    src="/images/case-studies/victory-energy/challenge-promotion-lagging.webp"
                    alt="Promotion Production was Lagging"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div className="internal-panel" style={{ padding: "20px", flex: 1 }}>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--color-blue-mid)", marginBottom: "6px" }}>
                    CHALLENGE 03
                  </div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    Promotion Production was Lagging
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Creating brand-aligned marketing collateral required up to 5 days per content plan. Manual review handoffs between copywriters, designers, and department heads caused delays in social publishing. Simultaneously, paid ad spend on Meta and Google went unmonitored, burning budget on underperforming campaigns.
                  </p>
                </div>
              </div>

              {/* Challenge Card 4 */}
              <div
                className="premium-card"
                style={{
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px"
                }}
              >
                <div style={{ width: "100%", height: "200px", borderRadius: "16px", overflow: "hidden" }}>
                  <img
                    src="/images/case-studies/victory-energy/challenge-17-entities-finance-workload.webp"
                    alt="17 Entities' Finance Leads To Excessive Administrative Workload"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div className="internal-panel" style={{ padding: "20px", flex: 1 }}>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--color-blue-mid)", marginBottom: "6px" }}>
                    CHALLENGE 04
                  </div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    17 Entities' Finance Leads To Excessive Workload
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Managing accounting for 17 separate corporations meant manual bank reconciliation, tedious invoice data extraction averaging 15 minutes per bill, and delayed approvals. Overdue receivables lacked systematic follow-up, and month-end close stretched to 9 business days per entity without a unified cash view.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "var(--color-border)", marginBottom: "80px" }} />

          {/* ── Our Solution Section: 4 Operating Systems ── */}
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
              Our Solution: Four Purpose-Built AI Operating Systems
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "var(--color-text-muted)",
                lineHeight: 1.65,
                marginBottom: "36px",
                maxWidth: "100%",
                textAlign: "justify",
                textJustify: "inter-word"
              }}
            >
              ScalePods architected an enterprise automation infrastructure tailored to Victory Energy&apos;s real-world business workflows. Rather than deploying a generic chatbot, four specialized operating systems were engineered around the procedural workflows of each team:
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
                src="/images/case-studies/victory-energy/solution-overview-banner.webp"
                alt="ScalePods Enterprise AI Operating Systems for Victory Energy"
                style={{ width: "100%", height: "auto", borderRadius: "14px", display: "block" }}
              />
            </div>

            {/* System 1: Talent OS (Image Right) */}
            <div className="premium-card" style={{ padding: "32px", marginBottom: "32px" }}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-6">
                  <div style={{ color: "var(--color-blue-mid)", marginBottom: "12px" }}>
                    <Users style={{ width: "32px", height: "32px" }} />
                  </div>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--color-blue-mid)", marginBottom: "4px" }}>
                    SYSTEM 01
                  </div>
                  <h3 style={{ fontSize: "20px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "12px" }}>
                    Talent OS: From Candidate Intake to Onboarding
                  </h3>
                  <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.6, textAlign: "justify", textJustify: "inter-word" }}>
                    Talent OS brings the entire applicant journey—from resume ingestion and contextual scoring to self-scheduling and HR compliance—into a single system. Inbound CVs are automatically parsed, deduplicated, and scored against specific job specifications, reducing screening time from 12 minutes to under 3 minutes. Candidates self-schedule interview slots with automated reminder sequences (24h, 2h, 30m), cutting no-shows by 41%. Upon offer acceptance, Gusto integration initiates employee records and payroll compliance in under 1 hour—all while keeping recruiters in complete command of hiring decisions.
                  </p>
                </div>
                <div className="md:col-span-6" style={{ borderRadius: "14px", overflow: "hidden" }}>
                  <img
                    src="/images/case-studies/victory-energy/solution-talent-os.webp"
                    alt="Talent OS: From Candidate Intake to Onboarding"
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                </div>
              </div>
            </div>

            {/* System 2: Growth OS for Sales (Image Left) */}
            <div className="premium-card" style={{ padding: "32px", marginBottom: "32px" }}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-6 order-2 md:order-1" style={{ borderRadius: "14px", overflow: "hidden" }}>
                  <img
                    src="/images/case-studies/victory-energy/solution-growth-os-sales.webp"
                    alt="Growth OS for Sales: Respond. Qualify. Book. Faster."
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                </div>
                <div className="md:col-span-6 order-1 md:order-2">
                  <div style={{ color: "var(--color-blue-mid)", marginBottom: "12px" }}>
                    <TrendingUp style={{ width: "32px", height: "32px" }} />
                  </div>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--color-blue-mid)", marginBottom: "4px" }}>
                    SYSTEM 02
                  </div>
                  <h3 style={{ fontSize: "20px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "12px" }}>
                    Growth OS for Sales: Respond. Qualify. Book. Faster.
                  </h3>
                  <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.6, textAlign: "justify", textJustify: "inter-word" }}>
                    Growth OS unites lead enrichment, multi-channel cadences, calendar booking, and CRM pipeline synchronization into an autonomous engine. Incoming inquiries receive immediate conversational follow-up in under 2 minutes (down from 6 hours) via WhatsApp, SMS, email, or voice. Leads are validated, scored (1–100), and entered into tailored 21-day nurture workflows. Automated pre-call briefs arm sales reps with full prospect context, boosting appointment bookings by 38% and exposing 3.2x more pipeline value to leadership.
                  </p>
                </div>
              </div>
            </div>

            {/* System 3: Growth OS for Marketing (Image Right) */}
            <div className="premium-card" style={{ padding: "32px", marginBottom: "32px" }}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-6">
                  <div style={{ color: "var(--color-blue-mid)", marginBottom: "12px" }}>
                    <Megaphone style={{ width: "32px", height: "32px" }} />
                  </div>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--color-blue-mid)", marginBottom: "4px" }}>
                    SYSTEM 03
                  </div>
                  <h3 style={{ fontSize: "20px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "12px" }}>
                    Growth OS for Marketing: Publish Your Strategy as Content
                  </h3>
                  <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.6, textAlign: "justify", textJustify: "inter-word" }}>
                    Marketing workflows ingest company documentation, brand guidelines, and competitor positioning to generate contextual campaign assets. An automated maker-checker workflow routes copy and Canva/Figma visual assets for human approval, cutting content plan creation from 5 days to under 6 hours and accelerating approvals by 58%. Approved posts are scheduled automatically across LinkedIn, Instagram, and the website, driving 3x greater posting cadence and 22% higher engagement while flagging underperforming ad campaigns within 48 hours.
                  </p>
                </div>
                <div className="md:col-span-6" style={{ borderRadius: "14px", overflow: "hidden" }}>
                  <img
                    src="/images/case-studies/victory-energy/solution-growth-os-marketing.webp"
                    alt="Growth OS for Marketing: Publish your Strategy as Content"
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                </div>
              </div>
            </div>

            {/* System 4: Financial OS (Image Left) */}
            <div className="premium-card" style={{ padding: "32px", marginBottom: "32px" }}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-6 order-2 md:order-1" style={{ borderRadius: "14px", overflow: "hidden" }}>
                  <img
                    src="/images/case-studies/victory-energy/solution-financial-os.webp"
                    alt="Financial OS: Consolidate 17 Companies into a Single Financial View"
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                </div>
                <div className="md:col-span-6 order-1 md:order-2">
                  <div style={{ color: "var(--color-blue-mid)", marginBottom: "12px" }}>
                    <Building2 style={{ width: "32px", height: "32px" }} />
                  </div>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--color-blue-mid)", marginBottom: "4px" }}>
                    SYSTEM 04
                  </div>
                  <h3 style={{ fontSize: "20px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "12px" }}>
                    Financial OS: Consolidate 17 Companies into One View
                  </h3>
                  <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.6, textAlign: "justify", textJustify: "inter-word" }}>
                    Financial OS integrates Xero, live bank feeds, and multi-entity payroll to automate daily, monthly, and quarterly accounting across all 17 corporations. Bank transactions are automatically reconciled at over 90%, routing exceptions directly to designated approvers. Automated data extraction slashes bill handling from 15 minutes to under 3 minutes per invoice. Overdue reminders reduced Days Sales Outstanding (DSO) by 18%, while live closing digests compressed month-end close from 9 days down to 5 days.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "var(--color-border)", marginBottom: "80px" }} />

          {/* ── The 7-Stage Workflow Section ── */}
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
              The 7-Stage Workflow Architecture
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
              The four systems operate across a unified 7-stage operational workflow connecting raw inputs to automated execution and executive analytics:
            </p>

            {/* 7 Workflow Step Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { step: "01", title: "Capture", desc: "Ingests candidates, inbound sales leads, brand style guides, and multi-entity bank transactions." },
                { step: "02", title: "Organize", desc: "Combines candidate profiles, scrubs and segments leads, organizes assets, and stages accounting records." },
                { step: "03", title: "Analyze", desc: "Contextual resume parsing, dynamic lead scoring (1–100), and content research alignment." },
                { step: "04", title: "Route", desc: "Directs items to the next stage: multi-channel nurture, candidate interview booking, or approval queues." },
                { step: "05", title: "Engage & Execute", desc: "Dispatches automated follow-ups, interview reminders, scheduled social posts, and invoice workflows." },
                { step: "06", title: "Review", desc: "Human-in-the-loop review: recruiters hire, sales reps close deals, and finance signs off exceptions." },
                { step: "07", title: "Measure", desc: "Unified dashboards integrate hiring throughput, pipeline velocity, content metrics, and multi-entity cash." }
              ].map((item) => (
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
                    {item.title}
                  </div>
                  <div style={{ fontSize: "13px", color: "var(--color-text-muted)", lineHeight: 1.5 }}>
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>

            {/* Workflow Diagram */}
            <div
              className="premium-card"
              style={{
                width: "100%",
                padding: "24px",
                overflow: "hidden"
              }}
            >
              <img
                src="/images/case-studies/victory-energy/workflow-light.webp"
                alt="Victory Energy 7-Stage Workflow Architecture Diagram (Light Theme)"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "16px",
                  display: "block"
                }}
                className="ve-workflow-light"
              />
              <img
                src="/images/case-studies/victory-energy/workflow-dark.webp"
                alt="Victory Energy 7-Stage Workflow Architecture Diagram (Dark Theme)"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "16px",
                  display: "block"
                }}
                className="ve-workflow-dark"
              />
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
              The Results: Verifiable Gains Across Four Operations
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
              By replacing fragmented manual processes with four purpose-built automated engines, Victory Energy achieved measurable productivity and velocity improvements across departments:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Result Card 1: Talent OS */}
              <div
                className="premium-card"
                style={{
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-blue-mid)", fontFamily: "var(--font-inter), sans-serif" }}>
                    -<AnimatedMetric value={74} suffix="%" />
                  </div>
                  <span style={{ fontSize: "11px", fontWeight: 700, padding: "3px 8px", borderRadius: "6px", background: "rgba(96, 165, 250, 0.1)", color: "var(--color-blue-mid)" }}>
                    TALENT OS
                  </span>
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    Resume Screening &amp; Onboarding Velocity
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Screening time compressed from 12 min to 3 min per CV. Automated self-scheduling reminders cut interview no-shows by 41%, time-to-offer dropped from 21 days to 14 days, and Gusto onboarding processed in under 1 hour—enabling a 3x candidate capacity without hiring more recruiters.
                  </p>
                </div>
              </div>

              {/* Result Card 2: Sales OS */}
              <div
                className="premium-card"
                style={{
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-blue-mid)", fontFamily: "var(--font-inter), sans-serif" }}>
                    &lt; <AnimatedMetric value={2} suffix=" Mins" />
                  </div>
                  <span style={{ fontSize: "11px", fontWeight: 700, padding: "3px 8px", borderRadius: "6px", background: "rgba(96, 165, 250, 0.1)", color: "var(--color-blue-mid)" }}>
                    GROWTH OS (SALES)
                  </span>
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    Speed-to-Lead &amp; Pipeline Growth
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Average lead reply time plummeted from 6 hours to under 2 minutes. Multi-channel follow-ups drove a 38% increase in booked appointments, cut call no-shows by 44%, and reduced cost per lead by 27% while exposing 3.2x more pipeline value to leadership.
                  </p>
                </div>
              </div>

              {/* Result Card 3: Marketing OS */}
              <div
                className="premium-card"
                style={{
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-blue-mid)", fontFamily: "var(--font-inter), sans-serif" }}>
                    &lt; <AnimatedMetric value={6} suffix=" Hours" />
                  </div>
                  <span style={{ fontSize: "11px", fontWeight: 700, padding: "3px 8px", borderRadius: "6px", background: "rgba(96, 165, 250, 0.1)", color: "var(--color-blue-mid)" }}>
                    GROWTH OS (MARKETING)
                  </span>
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    Content Production &amp; Ad Efficiency
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Time required to construct a full content plan fell from 5 days to under 6 hours. Maker-checker reviews accelerated approvals by 58%, yielding 3x greater posting consistency across LinkedIn and Instagram, 22% higher engagement, and 19% cheaper paid leads.
                  </p>
                </div>
              </div>

              {/* Result Card 4: Financial OS */}
              <div
                className="premium-card"
                style={{
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-blue-mid)", fontFamily: "var(--font-inter), sans-serif" }}>
                    -<AnimatedMetric value={70} suffix="%" />
                  </div>
                  <span style={{ fontSize: "11px", fontWeight: 700, padding: "3px 8px", borderRadius: "6px", background: "rgba(96, 165, 250, 0.1)", color: "var(--color-blue-mid)" }}>
                    FINANCIAL OS
                  </span>
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    Multi-Entity Reconciliation &amp; 5-Day Close
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Saved 70% in daily finance processing across all 17 entities with over 90% of bank transactions auto-reconciled. Invoice handling dropped from 15 min to under 3 min, DSO dropped by 18%, and month-end close compressed from 9 days to 5 days.
                  </p>
                </div>
              </div>

              {/* Qualitative Impact Banner */}
              <div
                className="md:col-span-2 premium-card"
                style={{
                  borderWidth: "1px 1px 1px 4px",
                  borderStyle: "solid",
                  borderColor: "var(--color-glass-border) var(--color-glass-border) var(--color-glass-border) var(--color-blue-mid)",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px"
                }}
              >
                <h3 style={{ fontSize: "17px", fontWeight: 700, color: "var(--color-text-bright)", margin: 0, lineHeight: 1.3 }}>
                  Beyond the headline metrics: Operational transparency and scalable capacity
                </h3>
                <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.6, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                  In addition to department-specific gains, unifying operations into four AI Operating Systems gave executive leadership same-day visibility into company-wide hiring pipelines, real-time sales opportunities, published media engagement, and consolidated cash positions across all 17 entities without adding administrative headcount.
                </p>
              </div>
            </div>

            {/* Measurement Note */}
            <div
              style={{
                padding: "16px 20px",
                borderRadius: "12px",
                background: "rgba(96, 165, 250, 0.05)",
                border: "1px solid rgba(96, 165, 250, 0.2)",
                display: "flex",
                alignItems: "flex-start",
                gap: "12px"
              }}
            >
              <Info style={{ width: "18px", height: "18px", color: "var(--color-blue-mid)", flexShrink: 0, marginTop: "2px" }} />
              <div style={{ fontSize: "12.5px", color: "var(--color-text-muted)", lineHeight: 1.5 }}>
                <strong style={{ color: "var(--color-text-bright)" }}>Performance note:</strong> Figures reflect production outcomes recorded across live campaigns and multi-entity operational rollouts for Victory Energy, benchmarked against pre-automation baseline performance.
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "var(--color-border)", marginBottom: "80px" }} />

          {/* ── Why ScalePods Section ── */}
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
              Why ScalePods for Industrial Enterprise Automation?
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "var(--color-text-muted)",
                lineHeight: 1.65,
                marginBottom: "36px",
                maxWidth: "100%",
                textAlign: "justify",
                textJustify: "inter-word"
              }}
            >
              Enterprise operations require more than disconnected tools. Companies need unified operational operating systems that reflect their real procedures:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Pillar 1 */}
              <div className="why-scalepods-card">
                <div className="why-scalepods-icon-wrapper">
                  <Workflow style={{ width: "22px", height: "22px" }} />
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px" }}>
                    Four systems built around real business work
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Rather than forcing a generic chatbot into complex processes, ScalePods architected four distinct domains catered specifically to recruiting, sales, marketing, and multi-entity accounting.
                  </p>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="why-scalepods-card">
                <div className="why-scalepods-icon-wrapper">
                  <UserCheck style={{ width: "22px", height: "22px" }} />
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px" }}>
                    Automation with human decisions in the loop
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Routine coordination and data extraction are fully automated, while critical evaluations—such as hiring, sales meetings, content publication, and financial approvals—remain strictly with responsible actors.
                  </p>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="why-scalepods-card">
                <div className="why-scalepods-icon-wrapper">
                  <BarChart3 style={{ width: "22px", height: "22px" }} />
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px" }}>
                    From activity to real-time visibility
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Integrated dashboards transform black-box operations into clear executive oversight, enabling leadership to immediately pinpoint bottlenecks and deploy resources with data-backed certainty.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "var(--color-border)", marginBottom: "80px" }} />

          {/* ── CTA Banner ── */}
          <div
            className="premium-card"
            style={{
              padding: "48px 36px",
              marginBottom: "80px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              background: "linear-gradient(135deg, rgba(96, 165, 250, 0.08) 0%, rgba(15, 23, 42, 0.02) 100%)",
              border: "1px solid rgba(96, 165, 250, 0.3)"
            }}
          >
            <span
              style={{
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-blue-mid)"
              }}
            >
              READY TO CONNECT YOUR BUSINESS WORKFLOWS?
            </span>
            <h3
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "clamp(22px, 3vw, 32px)",
                fontWeight: 750,
                color: "var(--color-text-bright)",
                margin: 0,
                lineHeight: 1.25,
                maxWidth: "700px"
              }}
            >
              Scale Your Operations Without Multiplying Administrative Payroll
            </h3>
            <p
              style={{
                fontSize: "15.5px",
                color: "var(--color-text-muted)",
                lineHeight: 1.6,
                maxWidth: "640px",
                margin: 0
              }}
            >
              Whether you are managing multi-channel lead follow-ups, high-volume candidate screening, or multi-entity financial consolidation, ScalePods builds custom AI Operating Systems that drive speed and transparency.
            </p>
            <div style={{ marginTop: "12px" }}>
              <Link
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 32px",
                  borderRadius: "24px",
                  fontSize: "15px",
                  fontWeight: 600,
                  background: "var(--color-text-bright)",
                  color: "var(--color-bg-page)",
                  textDecoration: "none",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                  transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)"
                }}
                className="hover:scale-[1.03] active:scale-[0.98]"
              >
                Schedule an Automation Discovery Call
                <ArrowRight style={{ width: "16px", height: "16px" }} />
              </Link>
            </div>
          </div>

          {/* ── FAQs Section ── */}
          <div style={{ marginBottom: "64px" }}>
            <h2
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "clamp(22px, 2.5vw, 28px)",
                fontWeight: 700,
                color: "var(--color-text-bright)",
                marginBottom: "24px",
                letterSpacing: "-0.02em"
              }}
            >
              Frequently Asked Questions: Victory Energy Automation
            </h2>
            <BlogFaqAccordion faqData={activeFaqs} />
          </div>

        </div>
      </div>
    </>
  );
}
