"use client";

import React from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  ArrowUpRight, 
  Workflow, 
  MessageSquare, 
  ShieldCheck, 
  PhoneCall, 
  Layers, 
  Cpu, 
  Bot, 
  CheckCircle2 
} from "lucide-react";
import AnimatedMetric from "@/components/ui/AnimatedMetric";

interface ZVSteelsProps {
  faqs?: Array<{ q: string; a: string }>;
}

export default function ZVSteelsCaseStudy({ faqs }: ZVSteelsProps) {
  return (
    <>
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

        {/* Custom Headline */}
        <h1 style={{
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: "clamp(20px, 2.5vw, 32.5px)",
          fontWeight: 700,
          color: "var(--color-text-bright)",
          lineHeight: 1.3,
          marginBottom: "32px",
          letterSpacing: "-0.02em"
        }}>
          <span 
            className="block text-center md:text-justify md:[text-align-last:justify]" 
            style={{ textJustify: "inter-word" }}
          >
            How a 4-Generation Steel Giant Used a Recruitment Automation Tool to
          </span>
          <span className="block text-center" style={{ marginTop: "8px" }}>
            Automate 4 Core Operations and Slash HR Screening Effort by 80%
          </span>
        </h1>

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
              <AnimatedMetric value={80} suffix="%" />
            </div>
            <div style={{ fontSize: "14.5px", color: "var(--color-text-muted)", lineHeight: 1.4, maxWidth: "160px" }}>
              Screening effort cut
            </div>
          </div>

          {/* Metric 2 */}
          <div className="w-[48%] md:w-auto flex flex-col items-end md:items-center text-right md:text-center">
            <div style={{ fontSize: "clamp(32px, 3.5vw, 42px)", fontWeight: 700, color: "var(--color-blue-mid)", marginBottom: "8px", letterSpacing: "-0.02em" }}>
              <AnimatedMetric value={30} suffix=" min" />
            </div>
            <div style={{ fontSize: "14.5px", color: "var(--color-text-muted)", lineHeight: 1.4, maxWidth: "160px" }}>
              Interview turnaround
            </div>
          </div>

          {/* Metric 3 */}
          <div className="w-[48%] md:w-auto flex flex-col items-start md:items-center text-left md:text-center">
            <div style={{ fontSize: "clamp(32px, 3.5vw, 42px)", fontWeight: 700, color: "var(--color-blue-mid)", marginBottom: "8px", letterSpacing: "-0.02em" }}>
              <AnimatedMetric value={0} suffix="-Touch" />
            </div>
            <div style={{ fontSize: "14.5px", color: "var(--color-text-muted)", lineHeight: 1.4, maxWidth: "160px" }}>
              3-Way audit validation
            </div>
          </div>

          {/* Metric 4 */}
          <div className="w-[48%] md:w-auto flex flex-col items-end text-right">
            <div style={{ fontSize: "clamp(32px, 3.5vw, 42px)", fontWeight: 700, color: "var(--color-blue-mid)", marginBottom: "8px", letterSpacing: "-0.02em" }}>
              <AnimatedMetric value={6} suffix="-Day" />
            </div>
            <div style={{ fontSize: "14.5px", color: "var(--color-text-muted)", lineHeight: 1.4, maxWidth: "160px" }}>
              Multichannel sales cadence
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "var(--color-border)", marginTop: "32px", marginBottom: "48px" }} />
      </div>

      {/* ── Testimonial Card ── */}
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
                src="/images/case-studies/zv-steels/zameer-lokhandwala-framed.webp"
                alt="Zameer Lokhandwala"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
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
                <div className="vinay-name" style={{ fontWeight: 700, fontSize: "15px", lineHeight: 1.2, marginBottom: "2px" }}>
                  Zameer Lokhandwala
                </div>
                <div className="vinay-title" style={{ fontSize: "12px", fontWeight: 500 }}>
                  Managing Director, ZV Steels & Alco Steel Processors
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
                    src="/brands/zv-steels.webp"
                    alt="ZV Steels Logo"
                    style={{
                      height: "22px",
                      width: "auto",
                      objectFit: "contain"
                    }}
                  />
                </div>
                <div style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-text-bright)" }}>
                  ZV Steels & Alco Steel Processors
                </div>
              </div>

              <blockquote style={{
                fontSize: "clamp(15px, 1.6vw, 18px)",
                fontWeight: 400,
                lineHeight: 1.6,
                color: "var(--color-text-bright)",
                fontStyle: "normal",
                margin: 0,
                textAlign: "justify",
                textJustify: "inter-word"
              }}>
                “We were a large, four-generation manufacturing business and ScalePods was a young startup when we first hired them — a bit of a leap of faith on our part. It paid off. We started with HR recruitment automation, and Adnan and Raunak built it around our actual process instead of handing us something off the shelf, weaving in Claude to handle resume screening and candidate shortlisting intelligently rather than with rigid keyword rules. Screening effort dropped 70–80%, and interview scheduling went from 1–2 days to under 30 minutes. That got us comfortable enough to bring them into three more parts of the business — purchase and sales audits, material quality checks, and sales outreach for our group company. Every time, same experience: responsive, custom-built, and never once did we have to chase them for a fix or an update. Four projects in, this feels less like a vendor we hired and more like a team we grew alongside. Recommended without hesitation.”
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
                About
              </h4>
              <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.5, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                ZV Steels & Alco Steel Processors is a prominent, four-generation manufacturing leader in flat steel products (HR Coils, CRCA, HRPO, GP, GPSP) and coated steel profiles (PPGL) based in Mumbai, India.
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
                    Steel & Metals
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                    Founded
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--color-text-bright)" }}>
                    1996 (50+ Yrs)
                  </div>
                </div>
              </div>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                  Headquarters
                </div>
                <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--color-text-bright)" }}>
                  Mumbai, India
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
                Key features
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {["Hot Rolled", "Cold Rolled", "Galvanized", "PPGL Coils", "Steel Processing"].map((tag) => (
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

      {/* ── Content Container (No Sidebar) ── */}
      <div style={{ marginTop: "40px" }}>
        <div style={{ maxWidth: "100%", margin: "0 auto" }} className="px-6 md:px-10">

          {/* ── Challenges Section (Lotus Manor exact 4-card alternating style) ── */}
          <div style={{ marginBottom: "80px" }}>
            <h2 style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(24px, 3vw, 32px)",
              fontWeight: 700,
              color: "var(--color-text-bright)",
              marginBottom: "40px",
              letterSpacing: "-0.02em"
            }}>
              The Challenges
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1: Image top, Text bottom */}
              <div className="premium-card" style={{
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "16px"
              }}>
                <div style={{ width: "100%", height: "180px", borderRadius: "16px", overflow: "hidden" }}>
                  <img 
                    src="/images/case-studies/zv-steels/challenge-hiring-latency.webp" 
                    alt="Hiring Latency & Candidate Drop-Off" 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                  />
                </div>
                <div className="internal-panel" style={{
                  padding: "20px",
                  flex: 1
                }}>
                  <h3 style={{ fontSize: "14.5px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    Hiring Latency & Candidate Drop-Off
                  </h3>
                  <p style={{ fontSize: "12.5px", color: "var(--color-text-muted)", lineHeight: 1.5, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Screening hundreds of technical candidate profiles using manual keyword searches led to hiring delays of up to five days. Top-tier engineering and plant talent frequently dropped out during multi-day scheduling coordination.
                  </p>
                </div>
              </div>

              {/* Card 2: Text top, Image bottom */}
              <div className="premium-card" style={{
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "16px"
              }}>
                <div className="internal-panel" style={{
                  padding: "20px",
                  flex: 1
                }}>
                  <h3 style={{ fontSize: "14.5px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    Logistics & Reconciliation Discrepancies
                  </h3>
                  <p style={{ fontSize: "12.5px", color: "var(--color-text-muted)", lineHeight: 1.5, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Line-item verification across Supplier Invoices, E-Way Bills (EWB), and Lorry Receipts (LR) was fully manual, risking freight weight inaccuracies (±300 kg) and billing errors across enterprise entities.
                  </p>
                </div>
                <div style={{ width: "100%", height: "180px", borderRadius: "16px", overflow: "hidden" }}>
                  <img 
                    src="/images/case-studies/zv-steels/challenge-freight-audit.webp" 
                    alt="Logistics & Reconciliation Discrepancies" 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                  />
                </div>
              </div>

              {/* Card 3: Image top, Text bottom */}
              <div className="premium-card" style={{
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "16px"
              }}>
                <div style={{ width: "100%", height: "180px", borderRadius: "16px", overflow: "hidden" }}>
                  <img 
                    src="/images/case-studies/zv-steels/challenge-pipeline-stagnation.webp" 
                    alt="Wholesale Pipeline Stagnation" 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                  />
                </div>
                <div className="internal-panel" style={{
                  padding: "20px",
                  flex: 1
                }}>
                  <h3 style={{ fontSize: "14.5px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    Wholesale Pipeline Stagnation
                  </h3>
                  <p style={{ fontSize: "12.5px", color: "var(--color-text-muted)", lineHeight: 1.5, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Inbound wholesale inquiries from TradeIndia, Google Maps, and LinkedIn went cold because there was no immediate, structured multichannel follow-up cadence to qualify buyer quantity specs and price timelines.
                  </p>
                </div>
              </div>

              {/* Card 4: Text top, Image bottom */}
              <div className="premium-card" style={{
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "16px"
              }}>
                <div className="internal-panel" style={{
                  padding: "20px",
                  flex: 1
                }}>
                  <h3 style={{ fontSize: "14.5px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    Manual ERP Audits & Billing Errors
                  </h3>
                  <p style={{ fontSize: "12.5px", color: "var(--color-text-muted)", lineHeight: 1.5, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Cross-referencing Sales Orders against invoices, 18% GST (9% CGST + 9% SGST), base rates, and standard 0.47% brokerages created massive operational drag and financial reconciliation friction.
                  </p>
                </div>
                <div style={{ width: "100%", height: "180px", borderRadius: "16px", overflow: "hidden" }}>
                  <img 
                    src="/images/case-studies/zv-steels/challenge-reconciliation-errors.webp" 
                    alt="Manual ERP Audits & Billing Errors" 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "var(--color-border)", marginBottom: "80px" }} />

          {/* ── The ScalePods Moment Section ── */}
          <div style={{ marginBottom: "80px" }}>
            <h2 style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(24px, 3vw, 32px)",
              fontWeight: 700,
              color: "var(--color-text-bright)",
              marginBottom: "24px",
              letterSpacing: "-0.02em"
            }}>
              The ScalePods Moment
            </h2>
            
            <p style={{
              fontSize: "16px",
              color: "var(--color-text-muted)",
              lineHeight: 1.7,
              marginBottom: "20px",
              maxWidth: "100%",
              textAlign: "justify",
              textJustify: "inter-word"
            }}>
              When ZV Steels initially brought in ScalePods, it began with a single pilot: solving the recruiter bottleneck for talent acquisition. The breakthrough came when ScalePods abandoned off-the-shelf applicant trackers with rigid keyword filters and engineered a custom Claude-powered evaluation engine matched directly to their hiring criteria.
            </p>

            <p style={{
              fontSize: "16px",
              color: "var(--color-text-muted)",
              lineHeight: 1.7,
              marginBottom: "48px",
              maxWidth: "100%",
              textAlign: "justify",
              textJustify: "inter-word"
            }}>
              Screening effort plummeted by 80%, and candidate interview bookings dropped from two days of back-and-forth messaging to under 30 minutes via WhatsApp self-scheduling. That immediate win proved that custom AI engines could handle the nuances of heavy industrial operations, paving the way to expand ScalePods automation across logistics verification, financial reconciliation, and wholesale pipeline retention.
            </p>

            {/* ── System 1 ── */}
            <div style={{ marginBottom: "64px" }}>
              <div className="premium-card" style={{
                padding: "32px",
                marginBottom: "24px"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <div style={{ color: "var(--color-blue-mid)" }}>
                    <Bot style={{ width: "22px", height: "22px" }} />
                  </div>
                  <span style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "var(--color-blue-mid)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em"
                  }}>
                    System 01
                  </span>
                </div>

                <h3 style={{
                  fontSize: "clamp(18px, 2.2vw, 22px)",
                  fontWeight: 700,
                  color: "var(--color-text-bright)",
                  marginBottom: "12px",
                  lineHeight: 1.3
                }}>
                  System 1: AI Talent Acquisition &amp; AI Recruitment Platform with HR Automation Tool
                </h3>

                <p style={{
                  fontSize: "15px",
                  color: "var(--color-text-muted)",
                  lineHeight: 1.6,
                  marginBottom: "20px"
                }}>
                  Built as a dedicated HR platform that automates candidate shortlisting and booking without recruiter overhead:
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <div style={{ color: "var(--color-blue-mid)", marginTop: "3px", flexShrink: 0 }}>
                      <CheckCircle2 style={{ width: "18px", height: "18px" }} />
                    </div>
                    <p style={{ fontSize: "14.5px", color: "var(--color-text-body)", lineHeight: 1.6, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                      <strong style={{ color: "var(--color-text-bright)", fontWeight: 600 }}>Contextual Resume Parsing:</strong> Recruiters define custom percentage weights for Skills Match, Experience Relevance, Education Relevance, and JD Alignment. Claude screens batches of resumes against real criteria rather than basic keywords.
                    </p>
                  </div>

                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <div style={{ color: "var(--color-blue-mid)", marginTop: "3px", flexShrink: 0 }}>
                      <CheckCircle2 style={{ width: "18px", height: "18px" }} />
                    </div>
                    <p style={{ fontSize: "14.5px", color: "var(--color-text-body)", lineHeight: 1.6, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                      <strong style={{ color: "var(--color-text-bright)", fontWeight: 600 }}>Instant WhatsApp Self-Scheduling:</strong> Shortlisted candidates automatically receive WhatsApp notifications (<code style={{ fontSize: "13px", color: "var(--color-blue-mid)", background: "rgba(59, 130, 246, 0.1)", padding: "2px 6px", borderRadius: "4px" }}>hr_meeting_not_booked</code>, <code style={{ fontSize: "13px", color: "var(--color-blue-mid)", background: "rgba(59, 130, 246, 0.1)", padding: "2px 6px", borderRadius: "4px" }}>tech_meeting_not_booked</code>, <code style={{ fontSize: "13px", color: "var(--color-blue-mid)", background: "rgba(59, 130, 246, 0.1)", padding: "2px 6px", borderRadius: "4px" }}>manager_round_not_booked</code>) with embedded calendar links to self-book interview slots.
                    </p>
                  </div>

                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <div style={{ color: "var(--color-blue-mid)", marginTop: "3px", flexShrink: 0 }}>
                      <CheckCircle2 style={{ width: "18px", height: "18px" }} />
                    </div>
                    <p style={{ fontSize: "14.5px", color: "var(--color-text-body)", lineHeight: 1.6, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                      <strong style={{ color: "var(--color-text-bright)", fontWeight: 600 }}>Unified Candidate Dossier:</strong> Provides interviewers with summarized resumes, fit analysis, call logs, and structured round-by-round decision controls in one dashboard.
                    </p>
                  </div>
                </div>
              </div>

              {/* System 1 Images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="premium-card" style={{ padding: "16px", overflow: "hidden" }}>
                  <img 
                    src="/images/case-studies/zv-steels/system-1-hr-eval.webp" 
                    alt="Claude AI Resume Screening and Dossier" 
                    style={{ width: "100%", height: "auto", borderRadius: "12px", display: "block" }} 
                  />
                  <div style={{ marginTop: "12px", fontSize: "12.5px", color: "var(--color-text-muted)", textAlign: "center", fontWeight: 500 }}>
                    Claude AI Resume Screening and Dossier
                  </div>
                </div>
                <div className="premium-card" style={{ padding: "16px", overflow: "hidden" }}>
                  <img 
                    src="/images/case-studies/zv-steels/system-1-whatsapp-booking.webp" 
                    alt="WhatsApp Interview Self-Scheduling Template" 
                    style={{ width: "100%", height: "auto", borderRadius: "12px", display: "block" }} 
                  />
                  <div style={{ marginTop: "12px", fontSize: "12.5px", color: "var(--color-text-muted)", textAlign: "center", fontWeight: 500 }}>
                    WhatsApp Interview Self-Scheduling Template
                  </div>
                </div>
              </div>
            </div>

            {/* ── System 2 ── */}
            <div style={{ marginBottom: "64px" }}>
              <div className="premium-card" style={{
                padding: "32px",
                marginBottom: "24px"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <div style={{ color: "var(--color-blue-mid)" }}>
                    <ShieldCheck style={{ width: "22px", height: "22px" }} />
                  </div>
                  <span style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "var(--color-blue-mid)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em"
                  }}>
                    System 02
                  </span>
                </div>

                <h3 style={{
                  fontSize: "clamp(18px, 2.2vw, 22px)",
                  fontWeight: 700,
                  color: "var(--color-text-bright)",
                  marginBottom: "12px",
                  lineHeight: 1.3
                }}>
                  System 2: ERP Automation &amp; SAP Build Process Automation for Logistics Audits
                </h3>

                <p style={{
                  fontSize: "15px",
                  color: "var(--color-text-muted)",
                  lineHeight: 1.6,
                  marginBottom: "20px"
                }}>
                  An automated compliance system designed to catch billing errors, transit inconsistencies, and tax discrepancies:
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <div style={{ color: "var(--color-blue-mid)", marginTop: "3px", flexShrink: 0 }}>
                      <CheckCircle2 style={{ width: "18px", height: "18px" }} />
                    </div>
                    <p style={{ fontSize: "14.5px", color: "var(--color-text-body)", lineHeight: 1.6, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                      <strong style={{ color: "var(--color-text-bright)", fontWeight: 600 }}>Inbound (Purchase) 3-Way Verification:</strong> Automatically reconciles Supplier Invoices against E-Way Bills (EWB) and Logistics Receipts (LR). It applies fuzzy matching for factory address variations (ZV Metal Processor vs. Russian Fabricators) while enforcing exact verification on vehicle numbers, GSTIN, and batch coil codes.
                    </p>
                  </div>

                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <div style={{ color: "var(--color-blue-mid)", marginTop: "3px", flexShrink: 0 }}>
                      <CheckCircle2 style={{ width: "18px", height: "18px" }} />
                    </div>
                    <p style={{ fontSize: "14.5px", color: "var(--color-text-body)", lineHeight: 1.6, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                      <strong style={{ color: "var(--color-text-bright)", fontWeight: 600 }}>Outbound (Sales) Compliance:</strong> Cross-references Sales Order Excel sheets with generated Sales Invoices, validating 18% GST (9% CGST + 9% SGST), base rates, standard 0.47% brokerages, and loading charges within weight tolerances (&plusmn;300 kg).
                    </p>
                  </div>

                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <div style={{ color: "var(--color-blue-mid)", marginTop: "3px", flexShrink: 0 }}>
                      <CheckCircle2 style={{ width: "18px", height: "18px" }} />
                    </div>
                    <p style={{ fontSize: "14.5px", color: "var(--color-text-body)", lineHeight: 1.6, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                      <strong style={{ color: "var(--color-text-bright)", fontWeight: 600 }}>Real-Time Discrepancy Reporting:</strong> Labels run as Match (&check;), Partial Match (&Delta;), or Mismatch (&times;) with field-by-field error logs.
                    </p>
                  </div>
                </div>
              </div>

              {/* System 2 Image */}
              <div className="premium-card" style={{ width: "100%", padding: "20px", overflow: "hidden" }}>
                <img 
                  src="/images/case-studies/zv-steels/system-2-erp-reconciliation.webp" 
                  alt="Automated Logistics and Invoice Reconciliation Dashboard" 
                  style={{ width: "100%", height: "auto", borderRadius: "12px", display: "block" }} 
                />
                <div style={{ marginTop: "14px", fontSize: "12.5px", color: "var(--color-text-muted)", textAlign: "center", fontWeight: 500 }}>
                  Automated Logistics and Invoice Reconciliation Dashboard
                </div>
              </div>
            </div>

            {/* ── System 3 ── */}
            <div>
              <div className="premium-card" style={{
                padding: "32px",
                marginBottom: "24px"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <div style={{ color: "var(--color-blue-mid)" }}>
                    <Workflow style={{ width: "22px", height: "22px" }} />
                  </div>
                  <span style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "var(--color-blue-mid)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em"
                  }}>
                    System 03
                  </span>
                </div>

                <h3 style={{
                  fontSize: "clamp(18px, 2.2vw, 22px)",
                  fontWeight: 700,
                  color: "var(--color-text-bright)",
                  marginBottom: "12px",
                  lineHeight: 1.3
                }}>
                  System 3: Operations Automation Software &amp; Sales Process Automation with a Sales Automation Platform
                </h3>

                <p style={{
                  fontSize: "15px",
                  color: "var(--color-text-muted)",
                  lineHeight: 1.6,
                  marginBottom: "20px"
                }}>
                  An automated revenue machine built to capture inbound wholesale inquiries and re-engage dormant buyer accounts:
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <div style={{ color: "var(--color-blue-mid)", marginTop: "3px", flexShrink: 0 }}>
                      <CheckCircle2 style={{ width: "18px", height: "18px" }} />
                    </div>
                    <p style={{ fontSize: "14.5px", color: "var(--color-text-body)", lineHeight: 1.6, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                      <strong style={{ color: "var(--color-text-bright)", fontWeight: 600 }}>Automated Ingestion:</strong> Scrapes and pushes inbound leads from TradeIndia, Google Maps, and LinkedIn into Supabase in real time.
                    </p>
                  </div>

                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <div style={{ color: "var(--color-blue-mid)", marginTop: "3px", flexShrink: 0 }}>
                      <CheckCircle2 style={{ width: "18px", height: "18px" }} />
                    </div>
                    <div style={{ fontSize: "14.5px", color: "var(--color-text-body)", lineHeight: 1.6, margin: 0 }}>
                      <strong style={{ color: "var(--color-text-bright)", fontWeight: 600 }}>6-Day Multichannel Cadence:</strong>
                      <ul style={{ listStyleType: "none", paddingLeft: "12px", marginTop: "8px", display: "flex", flexDirection: "column", gap: "6px" }}>
                        <li style={{ display: "flex", gap: "8px" }}>
                          <span style={{ color: "var(--color-blue-mid)" }}>•</span>
                          <span><strong style={{ color: "var(--color-text-bright)" }}>Day 0:</strong> Instant personalized email with product catalogs and quotes.</span>
                        </li>
                        <li style={{ display: "flex", gap: "8px" }}>
                          <span style={{ color: "var(--color-blue-mid)" }}>•</span>
                          <span><strong style={{ color: "var(--color-text-bright)" }}>Day 1 &amp; Day 3:</strong> Dynamic WhatsApp messaging confirming stock, thickness, and quantity specs.</span>
                        </li>
                        <li style={{ display: "flex", gap: "8px" }}>
                          <span style={{ color: "var(--color-blue-mid)" }}>•</span>
                          <span><strong style={{ color: "var(--color-text-bright)" }}>Day 2 &amp; Day 4:</strong> Autonomous AI Voice agent calls (Vapi + Vobiz) qualifying buyer timeline and interest.</span>
                        </li>
                        <li style={{ display: "flex", gap: "8px" }}>
                          <span style={{ color: "var(--color-blue-mid)" }}>•</span>
                          <span><strong style={{ color: "var(--color-text-bright)" }}>Day 5:</strong> Final closing email touchpoint before entering long-term nurture.</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <div style={{ color: "var(--color-blue-mid)", marginTop: "3px", flexShrink: 0 }}>
                      <CheckCircle2 style={{ width: "18px", height: "18px" }} />
                    </div>
                    <p style={{ fontSize: "14.5px", color: "var(--color-text-body)", lineHeight: 1.6, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                      <strong style={{ color: "var(--color-text-bright)", fontWeight: 600 }}>Smart Follow-Up Loop:</strong> Automatically shifts postponed inquiries into an automated 0-day re-engagement sequence with updated price sheets.
                    </p>
                  </div>
                </div>
              </div>

              {/* System 3 Images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="premium-card" style={{ padding: "16px", overflow: "hidden" }}>
                  <img 
                    src="/images/case-studies/zv-steels/system-3-cadence.webp" 
                    alt="6-Day Multichannel Outreach Cadence" 
                    style={{ width: "100%", height: "auto", borderRadius: "12px", display: "block" }} 
                  />
                  <div style={{ marginTop: "12px", fontSize: "12.5px", color: "var(--color-text-muted)", textAlign: "center", fontWeight: 500 }}>
                    6-Day Multichannel Outreach Cadence
                  </div>
                </div>
                <div className="premium-card" style={{ padding: "16px", overflow: "hidden" }}>
                  <img 
                    src="/images/case-studies/zv-steels/system-3-flow.webp" 
                    alt="Omnichannel Lead Conversion Flowchart" 
                    style={{ width: "100%", height: "auto", borderRadius: "12px", display: "block" }} 
                  />
                  <div style={{ marginTop: "12px", fontSize: "12.5px", color: "var(--color-text-muted)", textAlign: "center", fontWeight: 500 }}>
                    Omnichannel Lead Conversion Flowchart
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "var(--color-border)", marginTop: "80px", marginBottom: "80px" }} />



          {/* ── CTA Card (Lotus Manor exact style) ── */}
          <div style={{ marginBottom: "80px" }}>
            <div className="premium-card" style={{
              padding: "48px 32px",
              textAlign: "center",
              position: "relative",
              overflow: "hidden"
            }}>
              <h3 style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "clamp(24px, 3vw, 36px)",
                fontWeight: 700,
                color: "var(--color-text-bright)",
                marginBottom: "16px",
                letterSpacing: "-0.02em"
              }}>
                Ready to Automate Your Core Operations?
              </h3>
              
              <p style={{
                fontSize: "16px",
                color: "var(--color-text-muted)",
                lineHeight: 1.6,
                marginBottom: "32px",
                maxWidth: "600px",
                marginLeft: "auto",
                marginRight: "auto"
              }}>
                Book a free consultation and discover how ScalePods can engineer custom AI workflows for your hiring, audit, and sales pipelines.
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
                marginBottom: 0
              }}>
                No commitment. Built around your actual process.
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
