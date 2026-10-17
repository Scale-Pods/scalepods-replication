"use client";

import React from "react";
import Link from "next/link";
import { 
  ArrowUpRight, 
  Workflow, 
  MessageSquare, 
  UserCheck, 
  Eye, 
  CheckCircle2, 
  Layers, 
  ShieldCheck, 
  BarChart3, 
  Cpu, 
  Info,
  Clock,
  Sparkles
} from "lucide-react";
import AnimatedMetric from "@/components/ui/AnimatedMetric";
import CaseStudyVideoPlayer from "@/components/ui/CaseStudyVideoPlayer";
import BlogFaqAccordion from "@/components/ui/BlogFaqAccordion";

interface LotusManorProps {
  faqs?: Array<{ q: string; a: string }>;
}

const defaultFaqs = [
  {
    q: "What is sales workflow automation?",
    a: "Sales workflow automation uses configured rules and software to coordinate repeatable sales tasks, such as follow-up reminders, outreach sequences, lead routing, and CRM updates. It helps teams apply a consistent process while keeping people involved in decisions and conversations that require judgment."
  },
  {
    q: "How can sales automation software improve follow-up?",
    a: "Sales automation software can trigger follow-ups at defined stages, coordinate outreach across supported channels, log activity, and route replies to the right representative. The impact depends on workflow design, data quality, message relevance, and how the team handles responses."
  },
  {
    q: "What is the difference between sales automation and sales process automation?",
    a: "Sales automation generally refers to automating individual sales tasks. Sales process automation focuses on coordinating connected steps across the sales journey, such as lead intake, outreach, response handling, CRM updates, and handoff."
  },
  {
    q: "Can sales workflow automation work with an existing CRM?",
    a: "In many cases, automation can be designed to work alongside an existing CRM, subject to the platform’s integrations, permissions, and data model. The appropriate setup should be confirmed during discovery rather than assumed."
  },
  {
    q: "How did ScalePods support Lotus Manor Real Estate?",
    a: "ScalePods implemented a follow-up workflow coordinating WhatsApp, email, and AI voice outreach, logging key activity in the CRM, and routing responding prospects back to the relevant sales representative."
  },
  {
    q: "What results did Lotus Manor report?",
    a: "The client testimonial published by ScalePods reports 1,000+ prospects reached, 7,000+ automated follow-ups, 229 direct responses, and a 21% response rate over four months. These figures should be presented with the reporting period and definitions where available."
  },
  {
    q: "Is AI sales automation intended to replace sales representatives?",
    a: "In this case, automation supported repeatable follow-up and activity tracking. Human representatives continued conversations when prospects replied and remained responsible for relationship-building and deal progression."
  }
];

export default function LotusManorCaseStudy({ faqs }: LotusManorProps) {
  const activeFaqs = faqs && faqs.length > 0 ? faqs : defaultFaqs;

  return (
    <>
      <style>{`
        .workflow-preview-dark {
          display: none !important;
        }
        .workflow-preview-light {
          display: block !important;
        }
        .dark .workflow-preview-dark,
        [data-theme="dark"] .workflow-preview-dark {
          display: block !important;
        }
        .dark .workflow-preview-light,
        [data-theme="dark"] .workflow-preview-light {
          display: none !important;
        }
        .vinay-overlay {
          background: rgba(255, 255, 255, 0.95);
          color: #0f172a;
          border: 1px solid rgba(15, 23, 42, 0.08);
        }
        .dark .vinay-overlay,
        [data-theme="dark"] .vinay-overlay {
          background: rgba(15, 23, 42, 0.95) !important;
          color: #ffffff !important;
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
        }
        .vinay-name {
          color: #0f172a;
        }
        .dark .vinay-name,
        [data-theme="dark"] .vinay-name {
          color: #ffffff !important;
        }
        .vinay-title {
          color: #475569;
        }
        .dark .vinay-title,
        [data-theme="dark"] .vinay-title {
          color: #94a3b8 !important;
        }
      `}</style>

      {/* ── Top section: Title, Stats, Testimonial (Full Width) ── */}
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
          How Lotus Manor Automated 7,000+ Follow-Ups With Sales Workflow Automation
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
            Lotus Manor Real Estate had a growing database of qualified property prospects—but manual outreach made it difficult to follow up consistently, respond at the right time, and keep every opportunity moving.
          </p>
          <p style={{ margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
            ScalePods implemented an AI-enabled sales workflow automation system that coordinated follow-ups across WhatsApp, email, and AI voice calls, while keeping lead activity visible in the CRM. Over four months, the system helped Lotus Manor reach 1,000+ prospects, send 7,000+ automated follow-ups, and generate 229 direct responses.
          </p>
          <p style={{ margin: 0, fontWeight: 500, color: "var(--color-text-bright)", textAlign: "justify", textJustify: "inter-word" }}>
            The outcome: a more consistent sales process, clearer lead ownership, and more time for the sales team to focus on qualified conversations and closing.
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
              <AnimatedMetric value={1000} suffix="+" />
            </div>
            <div style={{ fontSize: "14.5px", color: "var(--color-text-muted)", lineHeight: 1.4, maxWidth: "160px" }}>
              Prospects reached
            </div>
          </div>

          {/* Metric 2 */}
          <div className="w-[48%] md:w-auto flex flex-col items-end md:items-center text-right md:text-center">
            <div style={{ fontSize: "clamp(32px, 3.5vw, 42px)", fontWeight: 700, color: "var(--color-blue-mid)", marginBottom: "8px", letterSpacing: "-0.02em" }}>
              <AnimatedMetric value={7000} suffix="+" />
            </div>
            <div style={{ fontSize: "14.5px", color: "var(--color-text-muted)", lineHeight: 1.4, maxWidth: "180px" }}>
              Follow-ups sent automatically
            </div>
          </div>

          {/* Metric 3 */}
          <div className="w-[48%] md:w-auto flex flex-col items-start md:items-center text-left md:text-center">
            <div style={{ fontSize: "clamp(32px, 3.5vw, 42px)", fontWeight: 700, color: "var(--color-blue-mid)", marginBottom: "8px", letterSpacing: "-0.02em" }}>
              <AnimatedMetric value={229} />
            </div>
            <div style={{ fontSize: "14.5px", color: "var(--color-text-muted)", lineHeight: 1.4, maxWidth: "160px" }}>
              Direct responses
            </div>
          </div>

          {/* Metric 4 */}
          <div className="w-[48%] md:w-auto flex flex-col items-end text-right">
            <div style={{ fontSize: "clamp(32px, 3.5vw, 42px)", fontWeight: 700, color: "var(--color-blue-mid)", marginBottom: "8px", letterSpacing: "-0.02em" }}>
              <AnimatedMetric value={21} suffix="%" />
            </div>
            <div style={{ fontSize: "14.5px", color: "var(--color-text-muted)", lineHeight: 1.4, maxWidth: "160px" }}>
              Response rate
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "var(--color-border)", marginTop: "32px", marginBottom: "48px" }} />
      </div>

      {/* ── Testimonial & Company Overview Card ── */}
      <div className="premium-card" style={{
        padding: "40px",
        marginBottom: "64px",
        display: "flex",
        flexDirection: "column",
        gap: "32px"
      }}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Column: Image with overlay */}
          <div className="md:col-span-5" style={{ position: "relative", width: "100%", aspectRatio: "1.15", borderRadius: "16px", overflow: "hidden" }}>
            <img
              src="/images/blog/vinay-kumar.webp"
              alt="Vinay Kumar - Managing Director, Lotus Manor Real Estate"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
            />
            {/* Name/Title overlay */}
            <div className="vinay-overlay" style={{
              position: "absolute",
              bottom: "12px",
              left: "12px",
              right: "auto",
              maxWidth: "calc(100% - 24px)",
              borderRadius: "12px",
              padding: "12px 16px",
              backdropFilter: "blur(8px)"
            }}>
              <div className="vinay-name" style={{ fontWeight: 700, fontSize: "15px", lineHeight: 1.2, marginBottom: "2px" }}>Vinay Kumar</div>
              <div className="vinay-title" style={{ fontSize: "12px", fontWeight: 500 }}>Managing Director, Lotus Manor Real Estate</div>
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
                  src="/brands/lotus-manor.webp"
                  alt="Lotus Manor Real Estate Logo"
                  style={{
                    height: "20px",
                    width: "auto",
                    objectFit: "contain"
                  }}
                />
              </div>
              <div style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-text-bright)" }}>
                Lotus Manor Real Estate
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
              “We needed an AI agent that wouldn't embarrass us in front of investors. ScalePods delivered it — and made the process easy. They were quick to respond, quick to iterate, and treated our launch deadline like their own. The kind of partner you want when the work has to be right, and the timeline is tight.”
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
              About Lotus Manor Real Estate
            </h4>
            <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
              Lotus Manor Real Estate is a UAE-based property agency focused on helping clients discover, evaluate, and secure real estate opportunities in Dubai. As its prospect database and inbound demand grew, the team needed a repeatable way to manage sales follow-ups without adding unnecessary manual work.
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
                  Founded
                </div>
                <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--color-text-bright)" }}>
                  2024
                </div>
              </div>
            </div>
            <div>
              <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                Headquarters
              </div>
              <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--color-text-bright)" }}>
                Dubai, UAE
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
              {["Luxury homes", "Villas"].map((tag) => (
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
              The Challenge: Manual Follow-Ups Limited Sales Capacity
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
              Lead generation was not the only challenge. Lotus Manor had built a database of more than 10,000 prospects, but a lean sales team could not consistently manage every follow-up, qualification step, and next action manually. The result was a gap between capturing interest and converting that interest into a sales conversation.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="premium-card" style={{
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "16px"
              }}>
                <div style={{ width: "100%", height: "180px", borderRadius: "16px", overflow: "hidden" }}>
                  <img 
                    src="/images/case-studies/challenge-leakage.webp" 
                    alt="Manual Reminders Creating Bottlenecks in Follow-Up" 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                  />
                </div>
                <div className="internal-panel" style={{ padding: "20px", flex: 1 }}>
                  <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    1. Follow-up depended on manual reminders
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Sales representatives had to remember when to contact each prospect and what to do next. As lead volume increased, follow-up timing became harder to manage consistently. Relying on{" "}
                    <Link href="/solution/sales-workflow-automation" style={{ color: "var(--color-blue-mid)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                      manual outreach
                    </Link>{" "}
                    meant some prospects could receive delayed outreach, while others risked being missed entirely.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="premium-card" style={{
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "16px"
              }}>
                <div className="internal-panel" style={{ padding: "20px", flex: 1 }}>
                  <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    2. High-intent leads could go untouched
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    When a team is balancing new enquiries, ongoing conversations, and administrative tasks, promising prospects can remain inactive for too long. Lotus Manor needed a structured sales process automation workflow to help ensure leads received timely, appropriate follow-up.
                  </p>
                </div>
                <div style={{ width: "100%", height: "180px", borderRadius: "16px", overflow: "hidden" }}>
                  <img 
                    src="/images/case-studies/challenge-followup.webp" 
                    alt="High-Intent Leads Untouched in Pipeline" 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                  />
                </div>
              </div>

              {/* Card 3 */}
              <div className="premium-card" style={{
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "16px"
              }}>
                <div style={{ width: "100%", height: "180px", borderRadius: "16px", overflow: "hidden" }}>
                  <img 
                    src="/images/case-studies/challenge-crm.webp" 
                    alt="Repetitive Administrative Work Reducing Selling Time" 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                  />
                </div>
                <div className="internal-panel" style={{ padding: "20px", flex: 1 }}>
                  <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    3. Repetitive work reduced selling time
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Manual outreach and routine coordination took time away from qualification and relationship-building. The team needed sales automation tools that could handle repeatable tasks while keeping people involved when a prospect responded or needed personal attention.
                  </p>
                </div>
              </div>

              {/* Card 4 */}
              <div className="premium-card" style={{
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "16px"
              }}>
                <div className="internal-panel" style={{ padding: "20px", flex: 1 }}>
                  <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    4. Lead status and activity needed clearer visibility
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Without a consistent record of outreach and replies, it can be difficult for sales leaders to understand where a prospect stands and which action should happen next. Lotus Manor needed better CRM visibility and clear ownership when a lead re-engaged.
                  </p>
                </div>
                <div style={{ width: "100%", height: "180px", borderRadius: "16px", overflow: "hidden" }}>
                  <img 
                    src="/images/case-studies/challenge-coverage.webp" 
                    alt="Fragmented CRM Activity Records" 
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
              The Solution: An AI-Enabled Sales Automation System
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
              ScalePods designed a sales workflow automation layer to make follow-up more consistent across the lead database. The system coordinated outreach through WhatsApp, email, and AI voice calls, recorded key activity in the CRM, and returned responding prospects to the relevant sales representative for human follow-up. Rather than replacing the sales team or requiring a complete process overhaul, the approach used automation to support existing sales activity and reduce repetitive coordination.
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
                    1. Structured, automated follow-up
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Once a prospect entered the workflow, the system could trigger the next outreach step according to the configured sequence. This reduced reliance on individual reminders and gave the team a more repeatable sales follow-up process.
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
                  <MessageSquare style={{ width: "28px", height: "28px" }} />
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    2. Multichannel outreach
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    The workflow coordinated{" "}
                    <Link href="/blog/how-to-implement-sales-workflow-automation" style={{ color: "var(--color-blue-mid)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                      Multi-channel outreach
                    </Link>{" "}
                    across WhatsApp, email, and AI voice calls. Using multiple channels helped the team maintain contact with prospects through a more consistent cadence. Messaging frequency and channel choice should remain appropriate to the prospect’s preferences, consent, and applicable communication rules.
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
                  <UserCheck style={{ width: "28px", height: "28px" }} />
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    3. Human handoff when a prospect replied
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    When a prospect responded, the workflow reassigned the lead to the original sales representative so the conversation could continue with a person. This human-in-the-loop approach kept automation focused on repeatable outreach while leaving relationship-building and deal discussions to the sales team.
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
                  <Eye style={{ width: "28px", height: "28px" }} />
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    4. CRM activity tracking
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Important outreach steps and lead responses were logged in the CRM, giving the team a clearer view of activity and lead status. Reliable CRM records help sales managers monitor follow-up, understand engagement, and decide where human attention is needed.
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
              The Sales Workflow: From Lead Database to Sales Conversation
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
              The sales workflow connects lead records with multichannel touchpoints, CRM synchronization, and fast human handoffs.
            </p>

            {/* 6 Workflow Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {[
                { step: "01", title: "Lead Intake", desc: "Lead enters the defined outreach workflow from the database." },
                { step: "02", title: "Sequence Trigger", desc: "The system initiates the configured follow-up sequence." },
                { step: "03", title: "Multichannel Cadence", desc: "Outreach is coordinated across WhatsApp, email, and AI voice calls." },
                { step: "04", title: "CRM Logging", desc: "Lead responses and relevant activity are recorded in the CRM." },
                { step: "05", title: "Rep Routing", desc: "Responding prospects are routed back to the appropriate sales representative." },
                { step: "06", title: "Deal Closing", desc: "The sales team continues the conversation and focuses on qualification and closing." }
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
                src="/brands/workflow-preview-light.webp" 
                alt="Lotus Manor Real Estate Sales Workflow Automation Architecture Diagram" 
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "16px",
                  display: "block"
                }} 
                className="workflow-preview-light"
              />
              <img 
                src="/brands/workflow-preview-dark.webp" 
                alt="Lotus Manor Real Estate Sales Workflow Automation Architecture Diagram" 
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "16px",
                  display: "block"
                }} 
                className="workflow-preview-dark"
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
              The Results: Measurable Engagement and More Consistent Execution
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
              Within four months, Lotus Manor’s{" "}
              <Link href="/blog/sales-workflow-automation-complete-guide-2026" style={{ color: "var(--color-blue-mid)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                automated follow-up system
              </Link>{" "}
              helped the team maintain outreach at scale and create more opportunities for direct engagement. The following figures were reported in the client testimonial published by ScalePods.
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
                  <AnimatedMetric value={1000} suffix="+" />
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    1,000+ prospects reached
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    The workflow helped Lotus Manor engage prospects from its existing database through a more consistent outreach process.
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
                  <AnimatedMetric value={7000} suffix="+" />
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    7,000+ follow-ups sent automatically
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Repeatable follow-up steps were handled by the system, reducing the need for sales representatives to manage every reminder manually.
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
                  <AnimatedMetric value={229} />
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    229 direct responses
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Automated outreach generated direct responses that gave the team opportunities to restart or continue sales conversations.
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
                  <AnimatedMetric value={21} suffix="%" />
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    21% response rate
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    The client-reported response rate indicates meaningful engagement from the outreach activity across the target database.
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
                  Beyond the headline metrics
                </h3>
                <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.6, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                  Beyond the headline metrics, the workflow gave the team a more reliable follow-up rhythm and helped sales representatives spend less time chasing reminders and more time progressing conversations.
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
                <strong style={{ color: "var(--color-text-bright)" }}>Measurement note:</strong> Figures reported over a 4-month operational period. Direct responses reflect high-intent replies routed back to sales reps. Response rate represents direct client responses relative to contacted prospects.
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
              Why ScalePods for Sales Workflow Automation?
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
              Lotus Manor did not simply need another sales tool. It needed a process that could consistently act on existing lead data, coordinate follow-up, record responses, and return engaged prospects to the right person.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pillar 1 */}
              <div className="why-scalepods-card">
                <div className="why-scalepods-icon-wrapper">
                  <Workflow style={{ width: "22px", height: "22px" }} />
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px" }}>
                    Automation designed around the sales process
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    ScalePods configured the workflow around the practical stages of prospect outreach and handoff, rather than asking the team to manage another disconnected task list.
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
                    Human oversight where it matters
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Automation handled repeatable outreach, while sales representatives remained responsible for meaningful conversations and next steps after a prospect replied.
                  </p>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="why-scalepods-card">
                <div className="why-scalepods-icon-wrapper">
                  <Eye style={{ width: "22px", height: "22px" }} />
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px" }}>
                    Visibility through CRM activity
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Recording key interactions in the CRM supported clearer lead ownership and a more understandable record of what happened during follow-up.
                  </p>
                </div>
              </div>

              {/* Pillar 4 */}
              <div className="why-scalepods-card">
                <div className="why-scalepods-icon-wrapper">
                  <ShieldCheck style={{ width: "22px", height: "22px" }} />
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px" }}>
                    Built around the client’s operating context
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    The solution addressed Lotus Manor’s stated challenge: managing a large prospect database with a lean team. For businesses evaluating sales automation software, the right workflow should fit existing processes, channels, and CRM practices—not add complexity for its own sake.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "var(--color-border)", marginBottom: "80px" }} />

          {/* ── Product Demo Section ── */}
          <div style={{ marginBottom: "80px" }}>
            <h2 style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(24px, 3vw, 32px)",
              fontWeight: 700,
              color: "var(--color-text-bright)",
              marginBottom: "16px",
              letterSpacing: "-0.02em"
            }}>
              Product Demo
            </h2>
            
            <p style={{
              fontSize: "16px",
              color: "var(--color-text-muted)",
              lineHeight: 1.6,
              marginBottom: "32px",
              maxWidth: "100%",
              textAlign: "justify",
              textJustify: "inter-word"
            }}>
              See the core outbound workflow in action, including multichannel sequences, WhatsApp outreach coordination, and CRM updates.
            </p>

            <CaseStudyVideoPlayer src="/videos/Sales_pod_demo.mp4" />
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "var(--color-border)", marginBottom: "80px" }} />

          {/* ── Frequently Asked Questions Section ── */}
          <div style={{ marginBottom: "80px" }}>
            <h2 style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(24px, 3vw, 32px)",
              fontWeight: 700,
              color: "var(--color-text-bright)",
              marginBottom: "16px",
              letterSpacing: "-0.02em"
            }}>
              Frequently Asked Questions
            </h2>
            <p style={{
              fontSize: "16px",
              color: "var(--color-text-muted)",
              lineHeight: 1.6,
              marginBottom: "32px",
              maxWidth: "100%"
            }}>
              Common questions about sales workflow automation, CRM integration, and multichannel execution.
            </p>

            <BlogFaqAccordion faqData={activeFaqs} />
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "var(--color-border)", marginBottom: "80px" }} />

          {/* ── Conversion CTA Section ── */}
          <div style={{ marginBottom: "0px" }}>
            <div className="premium-card" style={{
              borderWidth: "1px 1px 1px 4px",
              borderStyle: "solid",
              borderColor: "var(--color-glass-border) var(--color-glass-border) var(--color-glass-border) var(--color-blue-mid)",
              padding: "48px 32px",
              textAlign: "center"
            }}>
              <h3 style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "clamp(24px, 3.5vw, 36px)",
                fontWeight: 700,
                color: "var(--color-text-bright)",
                marginBottom: "16px",
                letterSpacing: "-0.02em"
              }}>
                Ready to improve your sales follow-up process?
              </h3>
              
              <p style={{
                fontSize: "16px",
                color: "var(--color-text-muted)",
                lineHeight: 1.65,
                marginBottom: "32px",
                maxWidth: "680px",
                marginLeft: "auto",
                marginRight: "auto"
              }}>
                If your sales team is spending too much time managing reminders, coordinating outreach, or updating lead records, ScalePods can help map a practical sales workflow automation approach around your current process. Book a free consultation to discuss your sales pipeline, follow-up bottlenecks, CRM setup, and automation opportunities.
              </p>

              <div style={{ display: "inline-block" }}>
                <Link href="/contact" style={{ textDecoration: "none" }}>
                  <div className="group text-[#0f172a]" style={{
                    position: "relative",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "15px",
                    fontWeight: 700,
                    background: "#6DB6FF",
                    border: "1px solid #6DB6FF",
                    borderRadius: "10px",
                    padding: "12px 28px",
                    cursor: "pointer",
                    transition: "all 0.2s ease-in-out",
                    boxShadow: "0 4px 12px rgba(109, 182, 255, 0.25)"
                  }}>
                    <span>Book A Free Call</span>
                    <ArrowUpRight style={{ width: "16px", height: "16px" }} />
                  </div>
                </Link>
              </div>
              
              <p style={{
                fontSize: "13px",
                color: "var(--color-text-faint)",
                marginTop: "16px",
                marginBottom: "8px"
              }}>
                No commitment. Just insights.
              </p>

              <div style={{ fontSize: "13px", color: "var(--color-text-muted)" }}>
                Questions? Reach us at{" "}
                <a href="mailto:info@scalepods.co" style={{ color: "var(--color-blue-mid)", textDecoration: "underline" }}>
                  info@scalepods.co
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
