"use client";

import React from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  ArrowUpRight, 
  Workflow, 
  MessageSquare, 
  PhoneCall, 
  CheckCircle2,
  Clock,
  Sparkles,
  Bot,
  BarChart3,
  RefreshCw,
  Layers,
  ShieldCheck,
  TrendingUp,
  Cpu
} from "lucide-react";
import AnimatedMetric from "@/components/ui/AnimatedMetric";

interface ASquaredProps {
  faqs?: Array<{ q: string; a: string }>;
}

export default function ASquaredCaseStudy({ faqs }: ASquaredProps) {
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
          fontSize: "clamp(24px, 3.2vw, 40px)",
          fontWeight: 700,
          color: "var(--color-text-bright)",
          lineHeight: 1.3,
          marginBottom: "32px",
          letterSpacing: "-0.02em",
          textAlign: "center"
        }}>
          22,000 Leads. 30 Hot. How A Squared Changed the Game
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
              <AnimatedMetric value={94} suffix="%" />
            </div>
            <div style={{ fontSize: "14.5px", color: "var(--color-text-muted)", lineHeight: 1.4, maxWidth: "160px" }}>
              Fresh leads contacted in &lt; 5 mins
            </div>
          </div>

          {/* Metric 2 */}
          <div className="w-[48%] md:w-auto flex flex-col items-end md:items-center text-right md:text-center">
            <div style={{ fontSize: "clamp(32px, 3.5vw, 42px)", fontWeight: 700, color: "var(--color-blue-mid)", marginBottom: "8px", letterSpacing: "-0.02em" }}>
              <AnimatedMetric value={2.6} suffix="×" decimals={1} />
            </div>
            <div style={{ fontSize: "14.5px", color: "var(--color-text-muted)", lineHeight: 1.4, maxWidth: "170px" }}>
              Higher WhatsApp &amp; voice replies
            </div>
          </div>

          {/* Metric 3 */}
          <div className="w-[48%] md:w-auto flex flex-col items-start md:items-center text-left md:text-center">
            <div style={{ fontSize: "clamp(32px, 3.5vw, 42px)", fontWeight: 700, color: "var(--color-blue-mid)", marginBottom: "8px", letterSpacing: "-0.02em" }}>
              <AnimatedMetric value={18} suffix="%" />
            </div>
            <div style={{ fontSize: "14.5px", color: "var(--color-text-muted)", lineHeight: 1.4, maxWidth: "160px" }}>
              Dead leads reactivated
            </div>
          </div>

          {/* Metric 4 */}
          <div className="w-[48%] md:w-auto flex flex-col items-end text-right">
            <div style={{ fontSize: "clamp(32px, 3.5vw, 42px)", fontWeight: 700, color: "var(--color-blue-mid)", marginBottom: "8px", letterSpacing: "-0.02em" }}>
              <AnimatedMetric value={2400} suffix="" />
            </div>
            <div style={{ fontSize: "14.5px", color: "var(--color-text-muted)", lineHeight: 1.4, maxWidth: "160px" }}>
              Outbound calls handled daily
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "var(--color-border)", marginTop: "32px", marginBottom: "48px" }} />
      </div>

      {/* ── Testimonial Card ── */}
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
            <div className="md:col-span-5" style={{ position: "relative", width: "100%", aspectRatio: "1.15", borderRadius: "16px", overflow: "hidden" }}>
              <img
                src="/reviews/Akarsh Arora.webp"
                alt="Akarsh Arora"
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
                  Akarsh Arora
                </div>
                <div className="vinay-title" style={{ fontSize: "12px", fontWeight: 500 }}>
                  Founder &amp; CEO, A Squared Real Estate
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
                  background: "#001638",
                  padding: "6px 12px",
                  borderRadius: "10px",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
                }}>
                  <img
                    src="/brands/asquared-logo.webp"
                    alt="A Squared Real Estate Logo"
                    style={{
                      height: "28px",
                      width: "auto",
                      objectFit: "contain",
                      borderRadius: "4px"
                    }}
                  />
                </div>
                <div style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-text-bright)" }}>
                  A Squared Real Estate
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
                “Scalepods helped me automate my business processes using Claude, making everything much faster and more efficient. Highly recommended!”
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
                A Squared Real Estate is a Dubai-based property investment consultancy that has been operating since 2001. We specialise in off-plan properties, property investment, buying, selling, renting, and property management across the UAE.
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
                    2001 (25+ Yrs)
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
                Key features
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {["Off-Plan Properties", "Property Investment", "UAE Real Estate", "Property Management", "Buying & Selling"].map((tag) => (
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
                <div style={{ width: "100%", height: "200px", borderRadius: "16px", overflow: "hidden" }}>
                  <img 
                    src="/images/case-studies/asquared/challenge-22k-leads-30-hot.webp" 
                    alt="22,000 Leads. Only 30 Were Hot." 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                  />
                </div>
                <div className="internal-panel" style={{
                  padding: "20px",
                  flex: 1
                }}>
                  <h3 style={{ fontSize: "14.5px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    22,000 Leads. Only 30 Were Hot.
                  </h3>
                  <p style={{ fontSize: "12.5px", color: "var(--color-text-muted)", lineHeight: 1.5, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    A Squared was managing around 22,000 fresh leads, but only 30 were classified as hot, and 10 were ready to buy. The problem wasn&apos;t the number of leads. It was what happened once they entered the CRM. Every lead still needed to be scored, assigned, contacted, qualified, nurtured, and followed up with — and much of that depended on manual rep effort. What A Squared needed was a structured sales automation system that could keep leads moving without someone having to push each one forward manually.
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
                    A Hot Lead Could Go Cold in Minutes
                  </h3>
                  <p style={{ fontSize: "12.5px", color: "var(--color-text-muted)", lineHeight: 1.5, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    In real estate, timing can change the outcome of a lead very quickly. A prospect enquiring through WhatsApp could lose interest before a salesperson even got back to them. Without a consistent speed-to-contact process, high-intent leads could sit untouched while the sales team was busy handling everything else. A Squared needed sales process automation that could trigger the next action immediately, rather than waiting for a salesperson to notice the lead and respond.
                  </p>
                </div>
                <div style={{ width: "100%", height: "200px", borderRadius: "16px", overflow: "hidden" }}>
                  <img 
                    src="/images/case-studies/asquared/challenge-hot-lead-could-go-cold.webp" 
                    alt="A Hot Lead Could Go Cold in Minutes" 
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
                <div style={{ width: "100%", height: "200px", borderRadius: "16px", overflow: "hidden" }}>
                  <img 
                    src="/images/case-studies/asquared/challenge-followup-left-to-memory.webp" 
                    alt="Follow-Up Was Left to Memory" 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                  />
                </div>
                <div className="internal-panel" style={{
                  padding: "20px",
                  flex: 1
                }}>
                  <h3 style={{ fontSize: "14.5px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    Follow-Up Was Left to Memory
                  </h3>
                  <p style={{ fontSize: "12.5px", color: "var(--color-text-muted)", lineHeight: 1.5, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Once a lead entered Bitrix24, the next follow-up largely depended on the salesperson remembering when to act and what to do next. There was no consistently enforced sequence for Intro → Follow-Up → Nurture → Not Interested. That became harder to maintain as lead volumes increased, creating obvious gaps in the sales workflow. Some prospects got followed up with repeatedly, while others were simply missed.
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
                    Different Leads Needed Different Workflows
                  </h3>
                  <p style={{ fontSize: "12.5px", color: "var(--color-text-muted)", lineHeight: 1.5, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    A Squared handles multiple types of real estate enquiries, including off-plan, secondary-market, owner-side, buying, renting, and selling leads. The follow-up couldn&apos;t be the same for each one. But the existing setup wasn&apos;t consistently applying qualification and follow-up logic based on where the lead came from or what they were looking for. They needed sales pipeline automation that could decide what should happen next without leaving that decision to the rep every time.
                  </p>
                </div>
                <div style={{ width: "100%", height: "200px", borderRadius: "16px", overflow: "hidden" }}>
                  <img 
                    src="/images/case-studies/asquared/challenge-different-leads-workflows.webp" 
                    alt="Different Leads Needed Different Workflows" 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "var(--color-border)", marginBottom: "80px" }} />

          {/* ── Our Solution Section ── */}
          <div style={{ marginBottom: "80px" }}>
            <h2 style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(24px, 3vw, 32px)",
              fontWeight: 700,
              color: "var(--color-text-bright)",
              marginBottom: "16px",
              letterSpacing: "-0.02em"
            }}>
              Our Solution
            </h2>

            <h3 style={{
              fontSize: "clamp(18px, 2.2vw, 22px)",
              fontWeight: 600,
              color: "var(--color-blue-mid)",
              marginBottom: "20px"
            }}>
              A Sales Automation Layer Built Around Bitrix24
            </h3>
            
            <p style={{
              fontSize: "16px",
              color: "var(--color-text-muted)",
              lineHeight: 1.7,
              marginBottom: "48px",
              maxWidth: "100%",
              textAlign: "justify",
              textJustify: "inter-word"
            }}>
              Instead of replacing Bitrix24, ScalePods built an automation layer around it. It brings lead management, qualification, outreach, follow-up, CRM updates, and reporting together in one unified sales automation system. Instead of depending on manual actions from the sales team, each lead now moves through a defined, autonomous process.
            </p>

            {/* Feature 1: Every New Lead Gets a Head Start */}
            <div style={{ marginBottom: "64px" }}>
              <div className="premium-card" style={{
                padding: "32px",
                marginBottom: "24px"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <div style={{ color: "var(--color-blue-mid)" }}>
                    <Sparkles style={{ width: "22px", height: "22px" }} />
                  </div>
                  <span style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "var(--color-blue-mid)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em"
                  }}>
                    Engine 01
                  </span>
                </div>

                <h3 style={{
                  fontSize: "clamp(18px, 2.2vw, 22px)",
                  fontWeight: 700,
                  color: "var(--color-text-bright)",
                  marginBottom: "16px",
                  lineHeight: 1.3
                }}>
                  Every New Lead Gets a Head Start
                </h3>

                <p style={{
                  fontSize: "15px",
                  color: "var(--color-text-muted)",
                  lineHeight: 1.6,
                  marginBottom: "20px",
                  textAlign: "justify",
                  textJustify: "inter-word"
                }}>
                  As soon as a new lead enters the system, it is automatically processed through a multi-step instant qualification sequence:
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
                  {["Tagged", "Scored", "Assigned", "Classified", "Added to Workflow"].map((step, i) => (
                    <div 
                      key={step}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "8px 14px",
                        borderRadius: "8px",
                        background: "var(--color-bg-card-alt)",
                        border: "1px solid var(--color-border)",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "var(--color-text-bright)"
                      }}
                    >
                      <span style={{ color: "var(--color-blue-mid)" }}>0{i+1}.</span>
                      {step}
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <div style={{ color: "var(--color-blue-mid)", marginTop: "3px", flexShrink: 0 }}>
                      <CheckCircle2 style={{ width: "18px", height: "18px" }} />
                    </div>
                    <p style={{ fontSize: "14.5px", color: "var(--color-text-body)", lineHeight: 1.6, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                      <strong style={{ color: "var(--color-text-bright)", fontWeight: 600 }}>Under 5-Minute Contact Target:</strong> The system automatically triggers first contact within five minutes across WhatsApp and voice channels.
                    </p>
                  </div>

                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <div style={{ color: "var(--color-blue-mid)", marginTop: "3px", flexShrink: 0 }}>
                      <CheckCircle2 style={{ width: "18px", height: "18px" }} />
                    </div>
                    <p style={{ fontSize: "14.5px", color: "var(--color-text-body)", lineHeight: 1.6, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                      <strong style={{ color: "var(--color-text-bright)", fontWeight: 600 }}>15-Minute Escalation Trigger:</strong> If a lead remains untouched for 15 minutes, the system automatically triggers an escalation alert, guaranteeing no high-intent prospect slips away.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2: Follow-Up Runs Even When Reps Don't */}
            <div style={{ marginBottom: "64px" }}>
              <div className="premium-card" style={{
                padding: "32px",
                marginBottom: "24px"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <div style={{ color: "var(--color-blue-mid)" }}>
                    <Clock style={{ width: "22px", height: "22px" }} />
                  </div>
                  <span style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "var(--color-blue-mid)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em"
                  }}>
                    Engine 02
                  </span>
                </div>

                <h3 style={{
                  fontSize: "clamp(18px, 2.2vw, 22px)",
                  fontWeight: 700,
                  color: "var(--color-text-bright)",
                  marginBottom: "12px",
                  lineHeight: 1.3
                }}>
                  Follow-Up Runs Even When Reps Don&apos;t
                </h3>

                <p style={{
                  fontSize: "15px",
                  color: "var(--color-text-muted)",
                  lineHeight: 1.6,
                  marginBottom: "20px",
                  textAlign: "justify",
                  textJustify: "inter-word"
                }}>
                  Once a lead enters the system, the follow-up sequence starts automatically. Depending on the source and lead type, WhatsApp and voice sequences run over the next 7–30 days, systematically advancing prospects through:
                </p>

                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "8px",
                  padding: "12px 18px",
                  borderRadius: "10px",
                  background: "var(--color-bg-card-alt)",
                  border: "1px solid var(--color-border)",
                  fontSize: "13.5px",
                  fontWeight: 600,
                  color: "var(--color-text-bright)",
                  marginBottom: "20px"
                }}>
                  <span>Intro</span>
                  <span style={{ color: "var(--color-blue-mid)" }}>→</span>
                  <span>Follow-Up</span>
                  <span style={{ color: "var(--color-blue-mid)" }}>→</span>
                  <span>Nurture</span>
                  <span style={{ color: "var(--color-blue-mid)" }}>→</span>
                  <span style={{ color: "var(--color-text-muted)" }}>Not Interested</span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <div style={{ color: "var(--color-blue-mid)", marginTop: "3px", flexShrink: 0 }}>
                      <CheckCircle2 style={{ width: "18px", height: "18px" }} />
                    </div>
                    <p style={{ fontSize: "14.5px", color: "var(--color-text-body)", lineHeight: 1.6, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                      Sales reps no longer have to manually schedule every next touchpoint. The sales workflow automation keeps the conversation moving across channels.
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <div style={{ color: "var(--color-blue-mid)", marginTop: "3px", flexShrink: 0 }}>
                      <CheckCircle2 style={{ width: "18px", height: "18px" }} />
                    </div>
                    <p style={{ fontSize: "14.5px", color: "var(--color-text-body)", lineHeight: 1.6, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                      WhatsApp activity sits within the same flow, so outreach, responses, reach-outs, and inbound replies coming through the channel are all tracked together in unified CRM timelines.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 2 Image */}
              <div className="premium-card" style={{ width: "100%", padding: "20px", overflow: "hidden" }}>
                <img 
                  src="/images/case-studies/asquared/solution-followup-runs-automatically.webp" 
                  alt="Automated Follow-Up Sequences Across WhatsApp and Voice" 
                  style={{ width: "100%", height: "auto", borderRadius: "12px", display: "block" }} 
                />
                <div style={{ marginTop: "14px", fontSize: "12.5px", color: "var(--color-text-muted)", textAlign: "center", fontWeight: 500 }}>
                  Automated Multi-Channel Follow-Up Cadence &amp; SLA Tracking
                </div>
              </div>
            </div>

            {/* Feature 3: The First Call Doesn't Have to Be Human */}
            <div style={{ marginBottom: "64px" }}>
              <div className="premium-card" style={{
                padding: "32px",
                marginBottom: "24px"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <div style={{ color: "var(--color-blue-mid)" }}>
                    <PhoneCall style={{ width: "22px", height: "22px" }} />
                  </div>
                  <span style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "var(--color-blue-mid)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em"
                  }}>
                    Engine 03
                  </span>
                </div>

                <h3 style={{
                  fontSize: "clamp(18px, 2.2vw, 22px)",
                  fontWeight: 700,
                  color: "var(--color-text-bright)",
                  marginBottom: "12px",
                  lineHeight: 1.3
                }}>
                  The First Call Doesn&apos;t Have to Be Human
                </h3>

                <p style={{
                  fontSize: "15px",
                  color: "var(--color-text-muted)",
                  lineHeight: 1.6,
                  marginBottom: "20px",
                  textAlign: "justify",
                  textJustify: "inter-word"
                }}>
                  The AI Sales Rep handles the first layer of qualification on the phone. During that conversation, it listens contextually and identifies key intent signals:
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
                  {["Buy Intent", "Rent Intent", "Sell Intent", "Property Preferences & Budget"].map((intent) => (
                    <div 
                      key={intent}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "6px",
                        background: "var(--color-bg-card-alt)",
                        border: "1px solid var(--color-border)",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "var(--color-text-bright)"
                      }}
                    >
                      {intent}
                    </div>
                  ))}
                </div>

                <p style={{ fontSize: "14.5px", color: "var(--color-text-body)", lineHeight: 1.6, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                  By the time a salesperson steps in, they already have full context around what the prospect is looking for. Reps don&apos;t have to spend every first call figuring out the basics — they can step in when the conversation actually needs human empathy and deal closing.
                </p>
              </div>

              {/* Feature 3 Image */}
              <div className="premium-card" style={{ width: "100%", padding: "20px", overflow: "hidden" }}>
                <img 
                  src="/images/case-studies/asquared/solution-first-call-ai-sales-rep.webp" 
                  alt="AI Sales Rep Autonomous Qualification Interface" 
                  style={{ width: "100%", height: "auto", borderRadius: "12px", display: "block" }} 
                />
                <div style={{ marginTop: "14px", fontSize: "12.5px", color: "var(--color-text-muted)", textAlign: "center", fontWeight: 500 }}>
                  Autonomous AI Voice Qualification &amp; Context Dossier
                </div>
              </div>
            </div>

            {/* Feature 4: Every Reply Changes the Workflow */}
            <div style={{ marginBottom: "64px" }}>
              <div className="premium-card" style={{
                padding: "32px",
                marginBottom: "24px"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <div style={{ color: "var(--color-blue-mid)" }}>
                    <MessageSquare style={{ width: "22px", height: "22px" }} />
                  </div>
                  <span style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "var(--color-blue-mid)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em"
                  }}>
                    Engine 04
                  </span>
                </div>

                <h3 style={{
                  fontSize: "clamp(18px, 2.2vw, 22px)",
                  fontWeight: 700,
                  color: "var(--color-text-bright)",
                  marginBottom: "12px",
                  lineHeight: 1.3
                }}>
                  Every Reply Changes the Workflow
                </h3>

                <p style={{
                  fontSize: "15px",
                  color: "var(--color-text-muted)",
                  lineHeight: 1.6,
                  marginBottom: "20px",
                  textAlign: "justify",
                  textJustify: "inter-word"
                }}>
                  A lead shouldn&apos;t remain in the same stage just because nobody has manually updated its status. Every response is dynamically evaluated through sentiment analysis:
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <div style={{ color: "var(--color-blue-mid)", marginTop: "3px", flexShrink: 0 }}>
                      <CheckCircle2 style={{ width: "18px", height: "18px" }} />
                    </div>
                    <p style={{ fontSize: "14.5px", color: "var(--color-text-body)", lineHeight: 1.6, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                      <strong style={{ color: "var(--color-text-bright)", fontWeight: 600 }}>Positive Response:</strong> Instantly triggers salesperson handoff, calendar booking, and CRM notification.
                    </p>
                  </div>

                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <div style={{ color: "var(--color-blue-mid)", marginTop: "3px", flexShrink: 0 }}>
                      <CheckCircle2 style={{ width: "18px", height: "18px" }} />
                    </div>
                    <p style={{ fontSize: "14.5px", color: "var(--color-text-body)", lineHeight: 1.6, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                      <strong style={{ color: "var(--color-text-bright)", fontWeight: 600 }}>Needs Time:</strong> Automatically moves the prospect into a gentle, non-intrusive nurture sequence with off-plan market updates.
                    </p>
                  </div>

                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <div style={{ color: "var(--color-blue-mid)", marginTop: "3px", flexShrink: 0 }}>
                      <CheckCircle2 style={{ width: "18px", height: "18px" }} />
                    </div>
                    <p style={{ fontSize: "14.5px", color: "var(--color-text-body)", lineHeight: 1.6, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                      <strong style={{ color: "var(--color-text-bright)", fontWeight: 600 }}>Negative Response:</strong> Immediately moves the lead into the appropriate re-engagement or opt-out workflow.
                    </p>
                  </div>
                </div>

                <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.6, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                  Voice performance is broken down the same way, tracking call volume, pickup rates, completed conversations, and positive responses across distinct lead groups.
                </p>
              </div>

              {/* Feature 4 Image */}
              <div className="premium-card" style={{ width: "100%", padding: "20px", overflow: "hidden" }}>
                <img 
                  src="/images/case-studies/asquared/solution-sentiment-response-workflow.webp" 
                  alt="Sentiment Analysis and Dynamic Workflow Triggers" 
                  style={{ width: "100%", height: "auto", borderRadius: "12px", display: "block" }} 
                />
                <div style={{ marginTop: "14px", fontSize: "12.5px", color: "var(--color-text-muted)", textAlign: "center", fontWeight: 500 }}>
                  Real-Time Sentiment Analysis &amp; Autonomous Pipeline Transition
                </div>
              </div>
            </div>

            {/* Feature 5: “Dead” Leads Don't Stay Dead */}
            <div style={{ marginBottom: "64px" }}>
              <div className="premium-card" style={{
                padding: "32px",
                borderWidth: "1px 1px 1px 4px",
                borderStyle: "solid",
                borderColor: "var(--color-glass-border) var(--color-glass-border) var(--color-glass-border) var(--color-blue-mid)"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <div style={{ color: "var(--color-blue-mid)" }}>
                    <RefreshCw style={{ width: "22px", height: "22px" }} />
                  </div>
                  <span style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "var(--color-blue-mid)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em"
                  }}>
                    Engine 05
                  </span>
                </div>

                <h3 style={{
                  fontSize: "clamp(18px, 2.2vw, 22px)",
                  fontWeight: 700,
                  color: "var(--color-text-bright)",
                  marginBottom: "12px",
                  lineHeight: 1.3
                }}>
                  “Dead” Leads Don&apos;t Stay Dead
                </h3>

                <p style={{
                  fontSize: "15px",
                  color: "var(--color-text-body)",
                  lineHeight: 1.6,
                  marginBottom: "14px",
                  textAlign: "justify",
                  textJustify: "inter-word"
                }}>
                  Not every prospect is ready to buy immediately. Rather than letting cold leads disappear from the pipeline, they are automatically recycled after 30–60 days. Previously inactive leads return to the active pipeline and enter a fresh round of contextual engagement with updated project releases and payment plans.
                </p>

                <p style={{ fontSize: "14.5px", color: "var(--color-text-muted)", lineHeight: 1.6, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                  Lead recycling becomes an ongoing, automated revenue loop instead of an abandoned, manual database-cleaning chore.
                </p>
              </div>
            </div>

            {/* Feature 6: One Dashboard. The Entire Sales Pipeline. */}
            <div>
              <div className="premium-card" style={{
                padding: "32px",
                marginBottom: "24px"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <div style={{ color: "var(--color-blue-mid)" }}>
                    <BarChart3 style={{ width: "22px", height: "22px" }} />
                  </div>
                  <span style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "var(--color-blue-mid)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em"
                  }}>
                    Engine 06
                  </span>
                </div>

                <h3 style={{
                  fontSize: "clamp(18px, 2.2vw, 22px)",
                  fontWeight: 700,
                  color: "var(--color-text-bright)",
                  marginBottom: "12px",
                  lineHeight: 1.3
                }}>
                  One Dashboard. The Entire Sales Pipeline.
                </h3>

                <p style={{
                  fontSize: "15px",
                  color: "var(--color-text-muted)",
                  lineHeight: 1.6,
                  marginBottom: "20px",
                  textAlign: "justify",
                  textJustify: "inter-word"
                }}>
                  All activity is synced to Supabase and surfaced in a custom real-time executive dashboard. Management can oversee the full sales pipeline environment in one single view:
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
                  {[
                    "Lead Sources & Channels",
                    "Real-Time Lead Stages",
                    "Response Activity & Velocity",
                    "AI Qualification Status",
                    "Reactivated Lead Loops",
                    "Pipeline Movement & Funnel Health",
                    "Sales Rep Performance"
                  ].map((metric) => (
                    <div 
                      key={metric}
                      style={{
                        padding: "10px 14px",
                        borderRadius: "8px",
                        background: "var(--color-bg-card-alt)",
                        border: "1px solid var(--color-border)",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "var(--color-text-bright)"
                      }}
                    >
                      {metric}
                    </div>
                  ))}
                </div>
              </div>

              {/* Feature 6 Image */}
              <div className="premium-card" style={{ width: "100%", padding: "20px", overflow: "hidden" }}>
                <img 
                  src="/images/case-studies/asquared/solution-dashboard-sales-pipeline.webp" 
                  alt="A Squared Real Estate Pipeline Dashboard" 
                  style={{ width: "100%", height: "auto", borderRadius: "12px", display: "block" }} 
                />
                <div style={{ marginTop: "14px", fontSize: "12.5px", color: "var(--color-text-muted)", textAlign: "center", fontWeight: 500 }}>
                  Real-Time Sales Pipeline &amp; Channel Performance Intelligence
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
              marginBottom: "32px",
              letterSpacing: "-0.02em"
            }}>
              The Workflow
            </h2>
            
            {/* Light / Dark Mode Workflow Preview */}
            <div className="premium-card" style={{
              width: "100%",
              padding: "24px",
              overflow: "hidden",
              marginBottom: "40px"
            }}>
              <img 
                src="/images/case-studies/asquared/workflow-light.webp" 
                alt="A Squared Real Estate Sales Automation Workflow" 
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "16px",
                  display: "block"
                }} 
                className="workflow-preview-light"
              />
              <img 
                src="/images/case-studies/asquared/workflow-dark.webp" 
                alt="A Squared Real Estate Sales Automation Workflow" 
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "16px",
                  display: "block"
                }} 
                className="workflow-preview-dark"
              />
            </div>

            {/* 9-Step Sequential Pipeline Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { step: "01", title: "CAPTURE", desc: "New leads enter Bitrix24 seamlessly from digital ads, portal inquiries, and WhatsApp." },
                { step: "02", title: "SCORE", desc: "The system automatically tags, scores, assigns, and classifies every incoming lead." },
                { step: "03", title: "ROUTE", desc: "The appropriate sales workflow is determined by lead source, property type, and intent." },
                { step: "04", title: "ENGAGE", desc: "WhatsApp messages, voice calls, and automated follow-ups begin in under 5 minutes." },
                { step: "05", title: "QUALIFY", desc: "The AI Sales Rep identifies intent to buy, rent, sell, or invest with property specs." },
                { step: "06", title: "ANALYZE", desc: "Sentiment analysis evaluates every response and automatically updates the lead stage." },
                { step: "07", title: "NURTURE", desc: "Leads that aren't ready continue through structured 7–30 day multichannel sequences." },
                { step: "08", title: "RECYCLE", desc: "Cold and inactive leads return to active campaigns automatically after 30–60 days." },
                { step: "09", title: "REPORT", desc: "All activity is synced to the dashboard, giving leadership visibility across the pipeline." },
              ].map((item) => (
                <div 
                  key={item.step}
                  className="premium-card" 
                  style={{
                    padding: "22px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px"
                  }}
                >
                  <div style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "var(--color-blue-mid)",
                    letterSpacing: "0.05em"
                  }}>
                    {item.step} - {item.title}
                  </div>
                  <p style={{
                    fontSize: "13.5px",
                    color: "var(--color-text-muted)",
                    lineHeight: 1.5,
                    margin: 0,
                    textAlign: "justify",
                    textJustify: "inter-word"
                  }}>
                    {item.desc}
                  </p>
                </div>
              ))}
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
              marginBottom: "24px",
              letterSpacing: "-0.02em"
            }}>
              The Results
            </h2>
            
            <p style={{
              fontSize: "16px",
              color: "var(--color-text-muted)",
              lineHeight: 1.6,
              marginBottom: "40px",
              maxWidth: "100%",
              textAlign: "justify",
              textJustify: "inter-word"
            }}>
              By connecting Bitrix24 to an autonomous AI sales orchestration layer, A Squared unlocked rapid speed-to-lead and revitalized its massive prospect database without expanding headcount:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Result 1 */}
              <div className="premium-card" style={{
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "12px"
              }}>
                <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-blue-mid)", fontFamily: "var(--font-inter), sans-serif" }}>
                  <AnimatedMetric value={94} suffix="%" />
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    First contact in under five minutes
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.5, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    94% of fresh inbound leads received immediate, personalized first touchpoints via WhatsApp or AI voice, slashing lead drop-off.
                  </p>
                </div>
              </div>

              {/* Result 2 */}
              <div className="premium-card" style={{
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "12px"
              }}>
                <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-blue-mid)", fontFamily: "var(--font-inter), sans-serif" }}>
                  <AnimatedMetric value={2.6} suffix="×" decimals={1} />
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    Higher reply rate than manual follow-up
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.5, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Intelligent multichannel cadences drove 2.6× higher WhatsApp and voice response rates compared to standard manual agent follow-ups.
                  </p>
                </div>
              </div>

              {/* Result 3 */}
              <div className="premium-card" style={{
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "12px"
              }}>
                <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-blue-mid)", fontFamily: "var(--font-inter), sans-serif" }}>
                  <AnimatedMetric value={18} suffix="%" />
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    Previously dead leads reactivated
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.5, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Automated 30–60 day recycling cadences successfully revived dormant contacts back into active buying conversations.
                  </p>
                </div>
              </div>

              {/* Result 4 */}
              <div className="premium-card" style={{
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "12px"
              }}>
                <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-blue-mid)", fontFamily: "var(--font-inter), sans-serif" }}>
                  <AnimatedMetric value={7} suffix="%" />
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    Moved to Hot or Qualified within 45 days
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.5, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    7% of those reactivated cold leads converted into verified Hot or Qualified buyer opportunities ready for senior broker appointments.
                  </p>
                </div>
              </div>

              {/* Result 5 */}
              <div className="premium-card" style={{
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "12px"
              }}>
                <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-blue-mid)", fontFamily: "var(--font-inter), sans-serif" }}>
                  <AnimatedMetric value={52} suffix="%" />
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    Forecast conversion increased to 52%
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.5, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Forecasted deal conversions for Hot/Qualified leads climbed from 33% to 52% due to richer context and faster engagement.
                  </p>
                </div>
              </div>

              {/* Result 6 */}
              <div className="premium-card" style={{
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "12px"
              }}>
                <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-blue-mid)", fontFamily: "var(--font-inter), sans-serif" }}>
                  <AnimatedMetric value={2400} />
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    Outbound calls handled daily
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.5, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    2,400 daily outbound touchpoints were maintained across owner-data loops without adding a single administrative headcount.
                  </p>
                </div>
              </div>

              {/* Result 7: Full Width Callout */}
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
                  Near-Zero forgotten leads and full channel attribution
                </h3>
                <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.6, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                  With automated follow-ups and escalation rules, lead leakage was virtually eliminated. Furthermore, A Squared gained crystal-clear visibility into lead-source ROI, making it effortless to reallocate marketing spend away from underperforming portals within the very first quarter.
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "var(--color-border)", marginBottom: "80px" }} />

          {/* ── Why ScalePods Section ── */}
          <div style={{ marginBottom: "80px", display: "flex", flexDirection: "column", gap: "24px" }}>
            <h2 style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(24px, 3vw, 32px)",
              fontWeight: 700,
              color: "var(--color-text-bright)",
              margin: 0,
              letterSpacing: "-0.02em"
            }}>
              Why ScalePods
            </h2>

            {/* Block 1 */}
            <div className="premium-card" style={{
              borderWidth: "1px 1px 1px 4px",
              borderStyle: "solid",
              borderColor: "var(--color-glass-border) var(--color-glass-border) var(--color-glass-border) var(--color-blue-mid)",
              padding: "28px",
              display: "flex",
              flexDirection: "column",
              gap: "10px"
            }}>
              <h3 style={{ fontSize: "17px", fontWeight: 700, color: "var(--color-text-bright)", margin: 0, lineHeight: 1.3 }}>
                The CRM Wasn&apos;t the Problem. The Process Was.
              </h3>
              <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.6, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                Bitrix24 already contained the data. What was missing was an intelligent CRM and sales automation layer that could actually act on that data. ScalePods connected the CRM to automated outreach, AI qualification, sentiment analysis, lead recycling, and live executive reporting. The result was a real estate sales automation system built around the way A Squared&apos;s sales team actually works.
              </p>
            </div>

            {/* Block 2 */}
            <div className="premium-card" style={{
              borderWidth: "1px 1px 1px 4px",
              borderStyle: "solid",
              borderColor: "var(--color-glass-border) var(--color-glass-border) var(--color-glass-border) var(--color-blue-mid)",
              padding: "28px",
              display: "flex",
              flexDirection: "column",
              gap: "10px"
            }}>
              <h3 style={{ fontSize: "17px", fontWeight: 700, color: "var(--color-text-bright)", margin: 0, lineHeight: 1.3 }}>
                Built to Keep Working the Database
              </h3>
              <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.6, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                A sales team shouldn&apos;t have to remember every lead, every follow-up, and every next action. The system knows who needs to be contacted, when they need to be contacted, what they should receive, what their response means, and where they should go next. And if a lead isn&apos;t ready today, it knows exactly when to bring that lead back. That&apos;s the system ScalePods built for A Squared.
              </p>
            </div>
          </div>

          {/* ── CTA Card (Lotus Manor / ZV Steels exact style) ── */}
          <div style={{ marginBottom: "0px" }}>
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
                Ready to Scale Your Sales Outreach?
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
                Stop letting good leads go cold. Build a sales automation platform that keeps working your pipeline even when your sales team is busy.
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
                No commitment. Just insights.
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
