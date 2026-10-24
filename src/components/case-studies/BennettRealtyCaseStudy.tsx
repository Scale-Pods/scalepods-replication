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
  Users
} from "lucide-react";
import AnimatedMetric from "@/components/ui/AnimatedMetric";
import BlogFaqAccordion from "@/components/ui/BlogFaqAccordion";

interface BennettRealtyProps {
  faqs?: Array<{ q: string; a: string }>;
}

const defaultFaqs = [
  {
    q: "What is Bennett Realty Growth OS?",
    a: "Bennett Realty Growth OS is a custom brokerage automation platform engineered by ScalePods for Gregory Bennett. It connects lead capture, instant conversational qualification, calendar scheduling, contract transaction management, agent recruiting, and 24/7 procedural support into a single automated system."
  },
  {
    q: "How does the system handle leads arriving outside of business hours?",
    a: "The Growth OS captures inquiries instantly across web forms, Facebook, Instagram, and SMS. An automated conversational workflow engages prospects within two minutes, answers initial questions, qualifies buyer or seller readiness, and books an appointment directly into an agent's calendar."
  },
  {
    q: "Does Bennett Realty Growth OS replace real estate agents?",
    a: "No. The system is designed around a human-in-the-loop philosophy. It eliminates the 8–10 hours of repetitive administrative tasks—such as CRM logging, deadline tracking, and routine reminder messages—so agents can focus on showings, client negotiations, and building relationships."
  },
  {
    q: "How does automated transaction management prevent missed deadlines?",
    a: "Once a purchase contract is signed, the Growth OS initiates a structured milestone checklist. It automatically tracks inspection contingency dates, appraisal deadlines, and financing milestones, sending proactive notifications to buyers, sellers, agents, and lenders before delays compound."
  },
  {
    q: "What is the agent coaching assistant?",
    a: "The agent coaching assistant is an AI-powered knowledge system trained on brokerage guidelines, state real estate compliance rules, and standard operating procedures. It resolves up to 60% of routine procedural questions immediately, freeing up 5–7 hours of leadership time each week."
  },
  {
    q: "How does the system streamline agent recruiting?",
    a: "The Growth OS automates prospective agent outreach, candidate intake questionnaires, initial screening, and interview calendar bookings, compressing the typical agent onboarding timeline from three weeks to under 10 days."
  }
];

export default function BennettRealtyCaseStudy({ faqs }: BennettRealtyProps) {
  const activeFaqs = faqs && faqs.length > 0 ? faqs : defaultFaqs;

  return (
    <>
      <style>{`
        .bennett-workflow-dark {
          display: none !important;
        }
        .bennett-workflow-light {
          display: block !important;
        }
        .dark .bennett-workflow-dark,
        [data-theme="dark"] .bennett-workflow-dark {
          display: block !important;
        }
        .dark .bennett-workflow-light,
        [data-theme="dark"] .bennett-workflow-light {
          display: none !important;
        }
        .bennett-overlay {
          background: rgba(255, 255, 255, 0.95);
          color: #0f172a;
          border: 1px solid rgba(15, 23, 42, 0.08);
        }
        .dark .bennett-overlay,
        [data-theme="dark"] .bennett-overlay {
          background: rgba(15, 23, 42, 0.95) !important;
          color: #ffffff !important;
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
        }
        .bennett-name {
          color: #0f172a;
        }
        .dark .bennett-name,
        [data-theme="dark"] .bennett-name {
          color: #ffffff !important;
        }
        .bennett-title {
          color: #475569;
        }
        .dark .bennett-title,
        [data-theme="dark"] .bennett-title {
          color: #94a3b8 !important;
        }
      `}</style>

      {/* ── Top Section: Title, Stats, Testimonial (Full Width) ── */}
      <div style={{ marginTop: "40px" }} className="px-6 md:px-10">
        {/* Category */}
        <div style={{
          fontSize: "11px",
          fontWeight: 600,
          color: "var(--color-text-bright)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: "16px"
        }}>
          CASE STUDY
        </div>

        {/* H1 Headline */}
        <h1 style={{
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: "clamp(24px, 3.5vw, 42px)",
          fontWeight: 700,
          color: "var(--color-text-bright)",
          lineHeight: 1.25,
          marginBottom: "28px",
          letterSpacing: "-0.02em",
          textAlign: "left"
        }}>
          How a Real Estate Brokerage Can Scale Without Adding More Admin Work
        </h1>

        {/* Executive Summary Intro */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          marginBottom: "36px",
          color: "var(--color-text-muted)",
          fontSize: "16px",
          lineHeight: 1.65
        }}>
          <p style={{ margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
            Growing a real estate brokerage means managing vastly more than new inquiries. Every prospective buyer or seller needs immediate follow-up. Every signed contract initiates a complex sequence of inspection contingency dates, appraisal deadlines, and lender milestones. Simultaneously, scaling a brokerage requires recruiting, onboarding, and providing on-demand guidance to agents.
          </p>
          <p style={{ margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
            ScalePods engineered <strong>Bennett Realty Growth OS</strong> for Gregory Bennett—connecting multi-channel lead capture, sub-2-minute conversational replies, automated transaction coordination, and 24/7 agent coaching into a unified workflow engine. The system guides the entire brokerage journey without adding administrative payroll overhead.
          </p>
          <p style={{ margin: 0, fontWeight: 500, color: "var(--color-text-bright)", textAlign: "justify", textJustify: "inter-word" }}>
            The outcome: response times dropped from 4 hours to under 2 minutes, appointment booking rates increased by 35%, and the team saved 8–10 administrative hours on every real estate deal while virtually eliminating missed contract deadlines.
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
            <div style={{ fontSize: "clamp(32px, 3.5vw, 42px)", fontWeight: 700, color: "var(--color-blue-mid)", marginBottom: "8px", letterSpacing: "-0.02em" }}>
              &lt; <AnimatedMetric value={2} suffix=" Mins" />
            </div>
            <div style={{ fontSize: "14.5px", color: "var(--color-text-muted)", lineHeight: 1.4, maxWidth: "160px" }}>
              Target time to respond to leads
            </div>
          </div>

          {/* Metric 2 */}
          <div className="w-[48%] md:w-auto flex flex-col items-end md:items-center text-right md:text-center">
            <div style={{ fontSize: "clamp(32px, 3.5vw, 42px)", fontWeight: 700, color: "var(--color-blue-mid)", marginBottom: "8px", letterSpacing: "-0.02em" }}>
              +<AnimatedMetric value={35} suffix="%" />
            </div>
            <div style={{ fontSize: "14.5px", color: "var(--color-text-muted)", lineHeight: 1.4, maxWidth: "180px" }}>
              Increase in booked appointments
            </div>
          </div>

          {/* Metric 3 */}
          <div className="w-[48%] md:w-auto flex flex-col items-start md:items-center text-left md:text-center">
            <div style={{ fontSize: "clamp(32px, 3.5vw, 42px)", fontWeight: 700, color: "var(--color-blue-mid)", marginBottom: "8px", letterSpacing: "-0.02em" }}>
              <AnimatedMetric value={8} suffix="–10 Hrs" />
            </div>
            <div style={{ fontSize: "14.5px", color: "var(--color-text-muted)", lineHeight: 1.4, maxWidth: "160px" }}>
              Time saved on each transaction
            </div>
          </div>

          {/* Metric 4 */}
          <div className="w-[48%] md:w-auto flex flex-col items-end text-right">
            <div style={{ fontSize: "clamp(32px, 3.5vw, 42px)", fontWeight: 700, color: "var(--color-blue-mid)", marginBottom: "8px", letterSpacing: "-0.02em" }}>
              ~<AnimatedMetric value={90} suffix="%" />
            </div>
            <div style={{ fontSize: "14.5px", color: "var(--color-text-muted)", lineHeight: 1.4, maxWidth: "160px" }}>
              Potential decrease in missing deadlines
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "var(--color-border)", marginTop: "32px", marginBottom: "48px" }} />
      </div>

      {/* ── Testimonial & Company Overview Card ── */}
      <div className="px-6 md:px-10">
        <div className="premium-card" style={{
          padding: "40px",
          marginBottom: "64px",
          display: "flex",
          flexDirection: "column",
          gap: "32px"
        }}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Column: Image with overlay */}
            <div className="md:col-span-5" style={{ 
              position: "relative", 
              width: "100%", 
              aspectRatio: "1.15", 
              borderRadius: "16px", 
              overflow: "hidden",
              background: "#ffffff" 
            }}>
              <img
                src="/reviews/gregory-bennett.webp"
                alt="Gregory Bennett - Founder & Principal Broker, Bennett Realty Solutions"
                style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center" }}
              />
              {/* Name/Title overlay */}
              <div className="bennett-overlay" style={{
                position: "absolute",
                bottom: "12px",
                left: "12px",
                right: "auto",
                maxWidth: "calc(100% - 24px)",
                borderRadius: "12px",
                padding: "12px 16px",
                backdropFilter: "blur(8px)"
              }}>
                <div className="bennett-name" style={{ fontWeight: 700, fontSize: "15px", lineHeight: 1.2, marginBottom: "2px" }}>
                  Gregory Bennett
                </div>
                <div className="bennett-title" style={{ fontSize: "12px", fontWeight: 500 }}>
                  Founder &amp; Principal Broker, Bennett Realty Solutions
                </div>
              </div>
            </div>

            {/* Right Column: Statement & Logo */}
            <div className="md:col-span-7" style={{ paddingLeft: "8px", display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Logo & Company Name */}
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#ffffff",
                  padding: "8px 16px",
                  borderRadius: "10px",
                  border: "1px solid rgba(0, 0, 0, 0.08)",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)"
                }}>
                  <img
                    src="/brands/bennett-realty.png"
                    alt="Bennett Realty Solutions Logo"
                    style={{
                      height: "24px",
                      width: "auto",
                      objectFit: "contain"
                    }}
                  />
                </div>
                <div style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-text-bright)" }}>
                  Bennett Realty Solutions
                </div>
              </div>

              <blockquote style={{
                fontSize: "clamp(16px, 1.8vw, 20px)",
                fontWeight: 400,
                lineHeight: 1.6,
                color: "var(--color-text-bright)",
                fontStyle: "normal",
                margin: 0,
                textAlign: "justify",
                textJustify: "inter-word"
              }}>
                “Growing a brokerage usually means hiring more coordinators just to keep up with follow-ups and paperwork. ScalePods gave us an entire growth operating system that connects our leads, transaction deadlines, and agent support. Tasks that used to slip through the cracks now happen automatically in minutes.”
              </blockquote>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "var(--color-border)" }} />

          {/* Company Info Footer */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* About (6 cols) */}
            <div className="md:col-span-6">
              <h4 style={{
                fontSize: "11px",
                fontWeight: 600,
                color: "var(--color-text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "8px"
              }}>
                About Bennett Realty Solutions
              </h4>
              <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                Bennett Realty Solutions is a premier full-service real estate brokerage licensed in Maryland, Washington D.C., and Virginia. As its prospect volume and transaction pipeline grew, the team partnered with ScalePods to build a repeatable operational engine that handles lead triage, contract milestones, and agent onboarding without unnecessary manual work.
              </p>
            </div>

            {/* Metadata Fields (3 cols) */}
            <div className="md:col-span-3" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                    Industry
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--color-text-bright)" }}>
                    Real Estate
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                    Client
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--color-text-bright)" }}>
                    Gregory Bennett
                  </div>
                </div>
              </div>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                  Headquarters
                </div>
                <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--color-text-bright)" }}>
                  Greenbelt, MD, USA (DC Metro)
                </div>
              </div>
            </div>

            {/* Key Features (3 cols) */}
            <div className="md:col-span-3">
              <h4 style={{
                fontSize: "11px",
                fontWeight: 600,
                color: "var(--color-text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "12px"
              }}>
                Key Focus Areas
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                <Link
                  href="/solution/ai-automation-for-real-estate"
                  style={{
                    fontSize: "12px",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    background: "var(--color-bg-card-alt)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-blue-mid)",
                    textDecoration: "none",
                    fontWeight: 600,
                    transition: "all 0.2s ease"
                  }}
                  className="hover:border-blue-400"
                >
                  Real Estate Sales
                </Link>
                {["Growth OS", "Transaction Mgmt", "Agent Coaching"].map((tag) => (
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

          {/* ── Challenges Section ── */}
          <div style={{ marginBottom: "80px" }}>
            <h2 style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(24px, 3vw, 32px)",
              fontWeight: 700,
              color: "var(--color-text-bright)",
              marginBottom: "16px",
              letterSpacing: "-0.02em"
            }}>
              The Challenge: Manual Follow-Ups and Coordination Friction Limited Scale
            </h2>
            <p style={{
              fontSize: "16px",
              color: "var(--color-text-muted)",
              lineHeight: 1.65,
              marginBottom: "40px",
              maxWidth: "100%",
              textAlign: "justify",
              textJustify: "inter-word"
            }}>
              Lead generation was only one part of the equation. Gregory Bennett&apos;s brokerage faced an expanding pipeline of inquiries, contracts, and onboarding agents, but manual procedures created bottlenecks across every operational stage.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1: Image Top, Panel Bottom */}
              <div className="premium-card" style={{
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "16px"
              }}>
                <div style={{ width: "100%", height: "180px", borderRadius: "16px", overflow: "hidden" }}>
                  <img 
                    src="/images/case-studies/bennett-realty/challenge-leads-waiting-response.jpg" 
                    alt="Leads Were Waiting Long for a Response" 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                  />
                </div>
                <div className="internal-panel" style={{ padding: "20px", flex: 1 }}>
                  <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    1. Leads were waiting long for a response
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Prospective clients reach out in the evenings, on weekends, or when agents are busy conducting home showings. When responses were delayed, warm leads lost interest or moved on to competing brokerages. Relying on manual outreach made it impossible to give every inbound message immediate attention.
                  </p>
                </div>
              </div>

              {/* Card 2: Panel Top, Image Bottom */}
              <div className="premium-card" style={{
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "16px"
              }}>
                <div className="internal-panel" style={{ padding: "20px", flex: 1 }}>
                  <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    2. Agents spent peak hours on repetitive busywork
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Agents generate revenue through conversations, showings, and building client relationships. Instead, a large portion of their day was swallowed by copying contact details between forms, updating CRM tasks, sending reminder texts, and chasing cold leads, creating more administrative work than the team could handle.
                  </p>
                </div>
                <div style={{ width: "100%", height: "180px", borderRadius: "16px", overflow: "hidden" }}>
                  <img 
                    src="/images/case-studies/bennett-realty/challenge-agents-simple-tasks.jpg" 
                    alt="Agents Spent Time on Simple Tasks" 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                  />
                </div>
              </div>

              {/* Card 3: Image Top, Panel Bottom */}
              <div className="premium-card" style={{
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "16px"
              }}>
                <div style={{ width: "100%", height: "180px", borderRadius: "16px", overflow: "hidden" }}>
                  <img 
                    src="/images/case-studies/bennett-realty/challenge-transaction-mistakes.jpg" 
                    alt="Managing Transactions Had Many Mistakes" 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                  />
                </div>
                <div className="internal-panel" style={{ padding: "20px", flex: 1 }}>
                  <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    3. Managing transactions had moving parts & missed deadlines
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Signing a contract is just the beginning. Inspection contingency dates, appraisal windows, loan approvals, and title documents all need tight coordination. When managed manually, a single missed document or notification slowed down deals and triggered stressful last-minute delays.
                  </p>
                </div>
              </div>

              {/* Card 4: Panel Top, Image Bottom */}
              <div className="premium-card" style={{
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "16px"
              }}>
                <div className="internal-panel" style={{ padding: "20px", flex: 1 }}>
                  <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    4. Hiring and supporting agents bottlenecked leadership
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Recruiting new agents involved manual outreach, screening questionnaires, and interview scheduling that dragged onboarding over three weeks. Furthermore, agents frequently needed guidance on rules and contract clauses; sending every question to leadership blocked senior staff from strategic growth.
                  </p>
                </div>
                <div style={{ width: "100%", height: "180px", borderRadius: "16px", overflow: "hidden" }}>
                  <img 
                    src="/images/case-studies/bennett-realty/challenge-hiring-agents-hard.jpg" 
                    alt="Hiring and Supporting New Agents Was Hard to Grow" 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "var(--color-border)", marginBottom: "80px" }} />

          {/* ── The Solution Section ── */}
          <div style={{ marginBottom: "80px" }}>
            <h2 style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(24px, 3vw, 32px)",
              fontWeight: 700,
              color: "var(--color-text-bright)",
              marginBottom: "16px",
              letterSpacing: "-0.02em"
            }}>
              The Solution: Bennett Realty Growth OS
            </h2>
            
            <p style={{
              fontSize: "16px",
              color: "var(--color-text-muted)",
              lineHeight: 1.65,
              marginBottom: "40px",
              maxWidth: "100%",
              textAlign: "justify",
              textJustify: "inter-word"
            }}>
              ScalePods engineered Bennett Realty Growth OS—a custom brokerage platform that unites lead capture, instant conversational qualification, transaction milestone tracking, and 24/7 agent procedural support into a single automated engine. Rather than replacing agents, the system automates repetitive coordination so the team can focus on client relationships and closing deals.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Solution Card 1 */}
              <div className="premium-card" style={{
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "12px"
              }}>
                <div style={{ color: "var(--color-blue-mid)" }}>
                  <Workflow style={{ width: "28px", height: "28px" }} />
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    1. One connected growth system
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Bennett Realty Growth OS brings lead management, appointment scheduling, transaction tracking, agent recruitment, and daily support into one workflow. By treating each activity as a defined job, leads, documents, and tasks move through stages with complete visibility.
                  </p>
                </div>
              </div>

              {/* Solution Card 2 */}
              <div className="premium-card" style={{
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "12px"
              }}>
                <div style={{ color: "var(--color-blue-mid)" }}>
                  <Clock style={{ width: "28px", height: "28px" }} />
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    2. Sub-2-minute conversational replies
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    The system catches incoming inquiries across web forms, Facebook, Instagram, and SMS, immediately replying through chat or text outside regular business hours. It qualifies buyer or seller readiness and books calendar appointments while prospect intent is highest.
                  </p>
                </div>
              </div>

              {/* Solution Card 3 */}
              <div className="premium-card" style={{
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "12px"
              }}>
                <div style={{ color: "var(--color-blue-mid)" }}>
                  <ShieldCheck style={{ width: "28px", height: "28px" }} />
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    3. Automated transaction steps &amp; proactive deadline tracking
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Automated messages keep buyers, sellers, lenders, and title agents informed about inspection contingencies, appraisal reports, and document signatures. The system proactively checks for potential bottlenecks, helping the team resolve issues days before deadlines.
                  </p>
                </div>
              </div>

              {/* Solution Card 4 */}
              <div className="premium-card" style={{
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "12px"
              }}>
                <div style={{ color: "var(--color-blue-mid)" }}>
                  <Bot style={{ width: "28px", height: "28px" }} />
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    4. 24/7 AI agent procedural &amp; compliance assistant
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Agents receive instant, accurate answers about contract clauses, brokerage procedures, and state compliance rules without escalating every question to managers. This preserves 5–7 hours of weekly leadership time for high-level coaching and business growth.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "var(--color-border)", marginBottom: "80px" }} />

          {/* ── The Workflow Section ── */}
          <div style={{ marginBottom: "80px" }}>
            <h2 style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(24px, 3vw, 32px)",
              fontWeight: 700,
              color: "var(--color-text-bright)",
              marginBottom: "16px",
              letterSpacing: "-0.02em"
            }}>
              The 9-Stage Growth Workflow: From Lead Generation to Closed Transaction
            </h2>
            <p style={{
              fontSize: "16px",
              color: "var(--color-text-muted)",
              lineHeight: 1.65,
              marginBottom: "32px",
              maxWidth: "100%",
              textAlign: "justify",
              textJustify: "inter-word"
            }}>
              The Growth OS connects the brokerage&apos;s commercial parts through a planned 9-stage operational process:
            </p>

            {/* 9 Workflow Step Pills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {[
                { step: "01", title: "Capture", desc: "Ingests messages instantly from web portals, landing pages, Meta ads, and SMS." },
                { step: "02", title: "Respond", desc: "Sub-2-minute automated chat and SMS outreach to engage leads while interest is peak." },
                { step: "03", title: "Qualify", desc: "Interactive screening assesses buyer/seller timeframe, budget, and pre-approval." },
                { step: "04", title: "Book", desc: "Qualified prospects book calls or showings directly into agent calendars." },
                { step: "05", title: "Nurture", desc: "Automated, value-driven email and SMS cadences keep cold or future leads warm." },
                { step: "06", title: "Coordinate", desc: "Tracks inspection windows, appraisal contingencies, and closing documents across all parties." },
                { step: "07", title: "Support", desc: "24/7 AI coaching assistant resolves agent procedural, contract, and compliance questions." },
                { step: "08", title: "Recruit", desc: "Automates candidate screening, intake questionnaires, and interview calendar bookings." },
                { step: "09", title: "Improve Consistency", desc: "Repurposes media assets into multi-channel marketing while real-time dashboards track velocity." }
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
            <div className="premium-card" style={{
              width: "100%",
              padding: "24px",
              overflow: "hidden"
            }}>
              <img 
                src="/images/case-studies/bennett-realty/workflow-light.jpg" 
                alt="Bennett Realty Growth OS 9-Stage Architecture Diagram (Light Theme)" 
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "16px",
                  display: "block"
                }} 
                className="bennett-workflow-light"
              />
              <img 
                src="/images/case-studies/bennett-realty/workflow-dark.jpg" 
                alt="Bennett Realty Growth OS 9-Stage Architecture Diagram (Dark Theme)" 
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "16px",
                  display: "block"
                }} 
                className="bennett-workflow-dark"
              />
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "var(--color-border)", marginBottom: "80px" }} />

          {/* ── The Results Section ── */}
          <div style={{ marginBottom: "80px" }}>
            <h2 style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(24px, 3vw, 32px)",
              fontWeight: 700,
              color: "var(--color-text-bright)",
              marginBottom: "16px",
              letterSpacing: "-0.02em"
            }}>
              The Results: Performance Benchmarks and Brokerage Capacity
            </h2>
            
            <p style={{
              fontSize: "16px",
              color: "var(--color-text-muted)",
              lineHeight: 1.65,
              marginBottom: "40px",
              maxWidth: "100%",
              textAlign: "justify",
              textJustify: "inter-word"
            }}>
              Based on comparative brokerage rollouts, Bennett Realty Growth OS demonstrates how structured workflow automation eliminates administrative ceilings and accelerates revenue generation:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Result Card 1 */}
              <div className="premium-card" style={{
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "12px"
              }}>
                <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-blue-mid)", fontFamily: "var(--font-inter), sans-serif" }}>
                  &lt; <AnimatedMetric value={2} suffix=" Mins" />
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    Faster lead response
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Target lead reply times dropped from an average of four hours to under 2 minutes, engaging prospects while their purchasing intent is highest.
                  </p>
                </div>
              </div>

              {/* Result Card 2 */}
              <div className="premium-card" style={{
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "12px"
              }}>
                <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-blue-mid)", fontFamily: "var(--font-inter), sans-serif" }}>
                  +<AnimatedMetric value={35} suffix="%" />
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    More appointment booking opportunities
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Consistent follow-up cadences and instant calendar reservation converted 35% more incoming inquiries into scheduled consultations.
                  </p>
                </div>
              </div>

              {/* Result Card 3 */}
              <div className="premium-card" style={{
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "12px"
              }}>
                <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-blue-mid)", fontFamily: "var(--font-inter), sans-serif" }}>
                  <AnimatedMetric value={8} suffix="–10 Hrs" />
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    Less manual transaction administration
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Automated status broadcasts and proactive task reminders saved 8–10 administrative hours per transaction on document chasing and updates.
                  </p>
                </div>
              </div>

              {/* Result Card 4 */}
              <div className="premium-card" style={{
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "12px"
              }}>
                <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-blue-mid)", fontFamily: "var(--font-inter), sans-serif" }}>
                  ~<AnimatedMetric value={90} suffix="%" />
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    Fewer missed transaction deadlines
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Proactive background milestone alerts provided close to a 90% reduction in missed deadline incidents across buyer and seller files.
                  </p>
                </div>
              </div>

              {/* Qualitative Impact Banner */}
              <div className="md:col-span-2 premium-card" style={{
                borderWidth: "1px 1px 1px 4px",
                borderStyle: "solid",
                borderColor: "var(--color-glass-border) var(--color-glass-border) var(--color-glass-border) var(--color-blue-mid)",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "8px"
              }}>
                <h3 style={{ fontSize: "17px", fontWeight: 700, color: "var(--color-text-bright)", margin: 0, lineHeight: 1.3 }}>
                  Beyond the headline metrics: Leadership time and agent onboarding
                </h3>
                <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.6, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                  In addition to core sales and transaction gains, the AI coaching assistant resolved ~60% of routine procedural questions, freeing 5–7 hours of weekly leadership time. Furthermore, automated recruitment workflows compressed new agent screening and onboarding timelines from three weeks to under 10 days.
                </p>
              </div>
            </div>

            {/* Measurement Note */}
            <div style={{
              padding: "16px 20px",
              borderRadius: "12px",
              background: "rgba(96, 165, 250, 0.05)",
              border: "1px solid rgba(96, 165, 250, 0.2)",
              display: "flex",
              alignItems: "flex-start",
              gap: "12px"
            }}>
              <Info style={{ width: "18px", height: "18px", color: "var(--color-blue-mid)", flexShrink: 0, marginTop: "2px" }} />
              <div style={{ fontSize: "12.5px", color: "var(--color-text-muted)", lineHeight: 1.5 }}>
                <strong style={{ color: "var(--color-text-bright)" }}>Measurement note:</strong> Figures represent indicative benchmarks from comparable brokerage rollouts. Voice outreach benchmarks indicate potential for 15–20 additional booked calls per agent each month based on 20–25% qualified contacts.
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "var(--color-border)", marginBottom: "80px" }} />

          {/* ── Why ScalePods Section ── */}
          <div style={{ marginBottom: "80px" }}>
            <h2 style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(24px, 3vw, 32px)",
              fontWeight: 700,
              color: "var(--color-text-bright)",
              marginBottom: "16px",
              letterSpacing: "-0.02em"
            }}>
              Why ScalePods for Real Estate Workflow Automation?
            </h2>
            <p style={{
              fontSize: "16px",
              color: "var(--color-text-muted)",
              lineHeight: 1.65,
              marginBottom: "36px",
              maxWidth: "100%",
              textAlign: "justify",
              textJustify: "inter-word"
            }}>
              Growing a real estate company depends on more than collecting leads. Companies need cohesive transaction plans, instant agent support, and a repeatable way to hire. ScalePods addresses these requirements as a connected system, not isolated tasks:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pillar 1 */}
              <div className="why-scalepods-card">
                <div className="why-scalepods-icon-wrapper">
                  <Workflow style={{ width: "22px", height: "22px" }} />
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px" }}>
                    Automation designed around the brokerage lifecycle
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    ScalePods architected the Growth OS around the practical realities of real estate transactions—from multi-channel lead ingestion to deadline alerts and contract handoffs.
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
                    Human-in-the-loop empowerment
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Automation is most effective when it empowers agents rather than replacing them. Human agents remain central for negotiations, relationship-building, and critical deal decisions.
                  </p>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="why-scalepods-card">
                <div className="why-scalepods-icon-wrapper">
                  <ShieldCheck style={{ width: "22px", height: "22px" }} />
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px" }}>
                    Proactive milestone &amp; compliance tracking
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Background monitoring and automated check-ins make critical contingency dates visible to all parties, spotting bottlenecks days before they can jeopardize a closing.
                  </p>
                </div>
              </div>

              {/* Pillar 4 */}
              <div className="why-scalepods-card">
                <div className="why-scalepods-icon-wrapper">
                  <Layers style={{ width: "22px", height: "22px" }} />
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px" }}>
                    Connected system vs. fragmented software
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Instead of forcing staff to juggle separate spreadsheets, CRMs, and email tools, ScalePods delivers a unified operating system that synchronizes data across every department.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "var(--color-border)", marginBottom: "80px" }} />

          {/* ── FAQ Section ── */}
          <div style={{ marginBottom: "80px" }}>
            <h2 style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(24px, 3vw, 32px)",
              fontWeight: 700,
              color: "var(--color-text-bright)",
              marginBottom: "32px",
              letterSpacing: "-0.02em"
            }}>
              FAQs About Real Estate Workflow Automation
            </h2>
            <BlogFaqAccordion faqData={activeFaqs} />
          </div>

          {/* ── Call to Action Card ── */}
          <div className="premium-card" style={{
            padding: "48px 36px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            marginBottom: "32px"
          }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "12px",
              fontWeight: 700,
              color: "var(--color-blue-mid)",
              textTransform: "uppercase",
              letterSpacing: "0.08em"
            }}>
              <Sparkles style={{ width: "16px", height: "16px" }} />
              Ready to Create a Growing Real Estate Workflow?
            </div>
            <h3 style={{
              fontSize: "clamp(24px, 3vw, 36px)",
              fontWeight: 700,
              color: "var(--color-text-bright)",
              lineHeight: 1.25,
              maxWidth: "680px",
              margin: 0
            }}>
              Scale Your Brokerage Without Adding More Admin Work
            </h3>
            <p style={{
              fontSize: "15.5px",
              color: "var(--color-text-muted)",
              lineHeight: 1.6,
              maxWidth: "640px",
              margin: 0,
              textAlign: "justify",
              textJustify: "inter-word"
            }}>
              If your brokerage is acquiring clients but struggling with follow-ups, paperwork, or recruiting new agents, the solution isn&apos;t another disconnected tool. Learn how ScalePods can build a tailored, connected workflow engine for your team.
            </p>
            <div style={{ marginTop: "12px" }}>
              <Link
                href="/#contact"
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
                <span>Book a Discovery Call</span>
                <ArrowUpRight style={{ width: "16px", height: "16px" }} />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
