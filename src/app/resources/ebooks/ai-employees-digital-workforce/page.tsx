"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  CheckCircle2, 
  Download, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Bot, 
  Megaphone, 
  Users, 
  Cpu, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  TrendingUp 
} from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { BeamsBackground } from "@/components/ui/beams-background";

export default function AIEmployeesEbookPage() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const pdfUrl = "https://244814113.fs1.hubspotusercontent-na2.net/hubfs/244814113/AI%20Employees%20E-Book.pdf";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return;

    setIsSubmitting(true);

    try {
      // Register Lead in leadService (Meta CAPI + n8n + CRM)
      const { submitLead } = await import("@/lib/leadService");
      const title = "AI Employees: Meet the Digital Workforce Powered by Workflow Automation";
      const summary = "Inside this eBook, you'll discover how AI employees and intelligent workflow automation help sales, marketing, HR, and operations connect systems and eliminate repetitive manual busywork.";
      const subject = "Your ScalePods eBook: AI Employees & Workflow Automation — Download Inside";

      await submitLead({
        formType: "guide_download",
        sourcePage: "/resources/ebooks/ai-employees-digital-workforce",
        name: `${formData.firstName} ${formData.lastName}`.trim() || formData.email,
        email: formData.email,
        phone: formData.phone,
        workflowType: "operations_workflow",
        ebookTitle: title,
        pdfUrl: pdfUrl,
        emailSubject: subject,
        summaryText: summary,
        metadata: {
          ebookTitle: title,
          guideName: "AI-Employees-E-Book.pdf",
          guideUrl: pdfUrl,
          pdfUrl: pdfUrl,
          emailSubject: subject,
          summaryText: summary
        }
      });
    } catch (err) {
      console.error("[eBook Download Form Error]:", err);
    } finally {
      setIsSubmitting(false);
      setDownloadSuccess(true);
      // Trigger automatic PDF opening / download
      window.open(pdfUrl, "_blank", "noopener,noreferrer");
    }
  };

  const aiEmployees = [
    {
      id: "alex",
      name: "Alex",
      title: "AI Sales Employee",
      domain: "Sales Automation & Pipeline Velocity",
      icon: TrendingUp,
      accent: "#38bdf8",
      description: "Explore how sales automation can support prospect research, lead generation, personalized outreach, lead qualification, CRM updates, follow-up reminders, and pipeline reporting. By connecting these steps through sales workflow automation, teams can reduce manual administration and spend more time building relationships with qualified prospects."
    },
    {
      id: "maya",
      name: "Maya",
      title: "AI Marketing Employee",
      domain: "Marketing Automation & Content Cycles",
      icon: Megaphone,
      accent: "#a78bfa",
      description: "See how marketing automation can bring research, content planning, creative development, publishing, campaign monitoring, and reporting into a connected workflow. Intelligent workflow automation helps teams coordinate repeatable campaign tasks and maintain visibility into what is running and what needs attention."
    },
    {
      id: "harper",
      name: "Harper",
      title: "AI HR Employee",
      domain: "HR Workflow Automation & Recruitment",
      icon: Users,
      accent: "#34d399",
      description: "Discover how AI-supported HR workflows can assist with resume screening, candidate shortlisting, interview scheduling, candidate communication, and onboarding coordination. With the right review steps, recruitment workflows can become more consistent while HR professionals stay responsible for hiring decisions and candidate experience."
    },
    {
      id: "orion",
      name: "Orion",
      title: "AI Operations Employee",
      domain: "Operations Automation & IT Systems",
      icon: Cpu,
      accent: "#f59e0b",
      description: "Learn how operations automation can support document processing, invoice and purchase-order checks, discrepancy flagging, approval routing, compliance workflows, and operational reporting. For larger organizations, these use cases can contribute to enterprise process automation and IT operations automation by reducing disconnected handoffs between tools and teams."
    }
  ];

  const faqs = [
    {
      question: "What is workflow automation?",
      answer: "Workflow automation uses connected software, rules, and actions to move work through a defined process with less manual effort. A workflow automation platform can coordinate triggers, data, approvals, integrations, and tasks across business systems."
    },
    {
      question: "What is AI workflow automation?",
      answer: "AI workflow automation combines automated workflows with AI capabilities such as summarization, classification, information extraction, content drafting, and prioritization. It can support more flexible processes while routing uncertain or high-impact cases to a human reviewer."
    },
    {
      question: "How is AI business process automation different from basic automation?",
      answer: "Basic automation often follows predefined rules. AI business process automation can add AI-based interpretation and decision support within a process, while integrations connect the steps across tools. The appropriate design depends on the process, its risks, and the level of human oversight required."
    },
    {
      question: "Can workflow automation support enterprise operations?",
      answer: "Yes. Enterprise workflow automation can connect workflows across departments and systems, improve visibility, and standardize handoffs. IT operations automation can also support repeatable IT service tasks, alert routing, ticket classification, and operational reporting where suitable integrations and controls are in place."
    },
    {
      question: "Which business functions can benefit from automation?",
      answer: "Common use cases include sales automation, marketing automation, HR and recruitment workflows, finance processes, customer support, and IT or business operations. Start with a well-defined process, agree on success measures, and expand after validating the workflow."
    },
    {
      question: "What does ScalePods' AI automation services approach include?",
      answer: "ScalePods helps businesses identify automation opportunities, design workflows, connect systems, implement AI agents and integrations, and optimize workflows against operational goals. The scope depends on the business process, existing technology, and implementation requirements."
    }
  ];

  // FAQ Schema JSON-LD
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div style={{ background: "var(--color-bg-page)", minHeight: "100vh", color: "var(--color-text-body)" }}>
      {/* Structured Data Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <BeamsBackground hues={[200, 210, 225]} intensity="strong">
        <Navbar />

        {/* Main Landing Page Section */}
        <section style={{ paddingTop: "140px", paddingBottom: "120px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
            
            {/* Top Header Information */}
            <div style={{ marginBottom: "40px" }}>
              {/* Eyebrow Badge */}
              <div style={{ display: "inline-block", marginBottom: "16px" }}>
                <span style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  padding: "6px 14px",
                  borderRadius: "6px",
                  background: isDark ? "rgba(109, 182, 255, 0.15)" : "rgba(15, 23, 42, 0.06)",
                  color: isDark ? "#6DB6FF" : "#0f172a",
                  textTransform: "uppercase",
                  border: isDark ? "1px solid rgba(109, 182, 255, 0.25)" : "1px solid rgba(15, 23, 42, 0.1)"
                }}>
                  FREE EBOOK · AI WORKFLOW AUTOMATION
                </span>
              </div>

              {/* H1 Title */}
              <h1 style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "clamp(30px, 4.2vw, 46px)",
                fontWeight: 800,
                color: "var(--color-text-bright)",
                lineHeight: 1.22,
                letterSpacing: "-0.025em",
                maxWidth: "980px",
                marginBottom: "20px"
              }}>
                AI Employees: Meet the Digital Workforce Powered by Workflow Automation
              </h1>

              {/* Lead Paragraph */}
              <p style={{
                fontSize: "18px",
                lineHeight: 1.7,
                color: "var(--color-text-muted)",
                maxWidth: "920px",
                margin: "0 0 24px 0"
              }}>
                Discover how AI employees and intelligent workflow automation can help your business reduce repetitive work, connect everyday tools, and keep critical processes moving across sales, marketing, HR, and operations. Download the free eBook from ScalePods to explore what an AI-powered digital workforce could look like for your team.
              </p>

              {/* Published Date */}
              <div style={{
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.06em",
                color: "var(--color-text-faint)",
                textTransform: "uppercase"
              }}>
                UPDATED FOR 2026 · <span style={{ color: "var(--color-text-muted)" }}>EXECUTIVE PLAYBOOK & WORKFLOW BLUEPRINT</span>
              </div>

              <div style={{ height: "1px", background: "var(--color-border-faint)", marginTop: "28px" }} />
            </div>

            {/* 2-Column Grid (Main Content Left, Form Right) */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 440px", gap: "60px", alignItems: "start" }} className="ebook-detail-grid">
              
              {/* Left Content Column */}
              <div>
                {/* Section 1: Growth vs Repetitive Work */}
                <div style={{ marginBottom: "48px" }}>
                  <h2 style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "var(--color-text-bright)",
                    lineHeight: 1.35,
                    marginBottom: "18px",
                    letterSpacing: "-0.015em"
                  }}>
                    Your Team Should Focus on Growth—not Repetitive Work
                  </h2>

                  <div style={{ display: "flex", flexDirection: "column", gap: "16px", fontSize: "16px", lineHeight: 1.8, color: "var(--color-text-body)" }}>
                    <p style={{ margin: 0 }}>
                      As a business grows, so does the operational workload. Sales teams research prospects and update CRMs. Marketing teams plan campaigns, create content, and report results. HR teams review applications and coordinate interviews. Operations teams process documents, manage approvals, and keep systems aligned.
                    </p>
                    <p style={{ margin: 0 }}>
                      <strong>Business workflow automation</strong> connects these activities into consistent, repeatable processes. With <strong>AI workflow automation</strong>, businesses can go beyond simple triggers and rule-based tasks: AI agents can help interpret information, draft content, classify requests, prioritize work, and pass tasks between connected systems. Human review remains important for sensitive decisions, exceptions, and approvals.
                    </p>
                    <p style={{ margin: 0 }}>
                      This free eBook introduces four AI employees—<strong>Alex for sales</strong>, <strong>Maya for marketing</strong>, <strong>Harper for HR</strong>, and <strong>Orion for operations</strong>—and shows how an AI-powered digital workforce can support everyday business processes.
                    </p>
                  </div>
                </div>

                {/* Section 2: What You'll Discover Inside (4 AI Employees Cards) */}
                <div style={{ marginBottom: "52px" }}>
                  <h2 style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "var(--color-text-bright)",
                    lineHeight: 1.35,
                    marginBottom: "8px",
                    letterSpacing: "-0.015em"
                  }}>
                    What You’ll Discover Inside
                  </h2>
                  <p style={{ fontSize: "15px", color: "var(--color-text-muted)", marginBottom: "24px" }}>
                    Meet the four autonomous digital workers designed to operate 24/7 across your core business functions.
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    {aiEmployees.map((agent) => {
                      const IconComponent = agent.icon;
                      return (
                        <div
                          key={agent.id}
                          style={{
                            background: isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(15, 23, 42, 0.02)",
                            border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(15, 23, 42, 0.08)"}`,
                            borderRadius: "14px",
                            padding: "24px",
                            transition: "all 0.2s ease"
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "14px" }}>
                            <div style={{
                              width: "42px",
                              height: "42px",
                              borderRadius: "10px",
                              background: isDark ? `${agent.accent}1a` : `${agent.accent}15`,
                              border: `1px solid ${agent.accent}40`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: agent.accent,
                              flexShrink: 0
                            }}>
                              <IconComponent size={20} />
                            </div>
                            <div>
                              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <h3 style={{
                                  fontSize: "18px",
                                  fontWeight: 700,
                                  color: "var(--color-text-bright)",
                                  margin: 0
                                }}>
                                  {agent.title}
                                </h3>
                                <span style={{
                                  fontSize: "11px",
                                  fontWeight: 700,
                                  textTransform: "uppercase",
                                  padding: "2px 8px",
                                  borderRadius: "4px",
                                  background: `${agent.accent}20`,
                                  color: agent.accent
                                }}>
                                  {agent.name}
                                </span>
                              </div>
                              <div style={{ fontSize: "13px", color: "var(--color-text-muted)", marginTop: "2px" }}>
                                {agent.domain}
                              </div>
                            </div>
                          </div>

                          <p style={{
                            fontSize: "15px",
                            lineHeight: 1.7,
                            color: "var(--color-text-body)",
                            margin: 0
                          }}>
                            {agent.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Section 3: Connected Business Processes */}
                <div style={{ marginBottom: "48px" }}>
                  <h2 style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "var(--color-text-bright)",
                    lineHeight: 1.35,
                    marginBottom: "18px",
                    letterSpacing: "-0.015em"
                  }}>
                    From Individual Tasks to Connected Business Processes
                  </h2>

                  <div style={{ display: "flex", flexDirection: "column", gap: "16px", fontSize: "16px", lineHeight: 1.8, color: "var(--color-text-body)" }}>
                    <p style={{ margin: 0 }}>
                      The real opportunity is not adding another disconnected tool. It is connecting the systems and steps that keep the business moving. A lead qualified by a sales workflow may inform a marketing campaign; a new hire recorded by HR may feed workforce and operations reporting. When data and tasks move reliably between systems, teams gain better visibility and spend less time chasing updates.
                    </p>
                    <p style={{ margin: 0 }}>
                      A <strong>workflow automation platform</strong> can help coordinate triggers, AI agents, integrations, approvals, and actions across the tools a business already uses. ScalePods designs and implements <strong>AI automation services</strong> around real operational needs—from workflow discovery and design to integration, deployment, and ongoing optimization.
                    </p>
                  </div>

                  {/* Connected Workflow Highlight Box */}
                  <div style={{
                    marginTop: "24px",
                    padding: "22px 26px",
                    background: isDark ? "rgba(109, 182, 255, 0.05)" : "rgba(30, 58, 138, 0.03)",
                    borderLeft: "4px solid #38bdf8",
                    borderRadius: "0 12px 12px 0",
                    borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.06)"}`,
                    borderRight: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.06)"}`,
                    borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.06)"}`
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                      <Layers size={18} style={{ color: "#38bdf8" }} />
                      <strong style={{ fontSize: "15px", color: "var(--color-text-bright)" }}>
                        The Connected Digital Workforce Advantage
                      </strong>
                    </div>
                    <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.6, color: "var(--color-text-muted)" }}>
                      When Alex (Sales), Maya (Marketing), Harper (HR), and Orion (Operations) share context and data triggers, handoffs happen in seconds with zero drop-off, complete auditability, and immediate human escalation where required.
                    </p>
                  </div>
                </div>

                {/* Section 4: Where AI Business Process Automation Can Help */}
                <div style={{ marginBottom: "48px" }}>
                  <h2 style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "var(--color-text-bright)",
                    lineHeight: 1.35,
                    marginBottom: "16px",
                    letterSpacing: "-0.015em"
                  }}>
                    Where AI Business Process Automation Can Help
                  </h2>

                  <p style={{ fontSize: "16px", lineHeight: 1.8, color: "var(--color-text-body)", marginBottom: "20px" }}>
                    AI business process automation can be useful wherever work involves repeatable steps, structured information, and clear handoffs. Common starting points include sales follow-ups, marketing campaign operations, recruitment coordination, customer support routing, document processing, and internal reporting.
                  </p>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                    {[
                      "Visible operational bottlenecks",
                      "Structured data inputs & APIs",
                      "Clear, measurable success metrics",
                      "Safe human review escalation rules",
                      "Repetitive multi-system copy-pasting",
                      "Need for 24/7 responsiveness"
                    ].map((criteria, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "var(--color-text-muted)" }}>
                        <CheckCircle2 size={16} style={{ color: "var(--color-green-text)", flexShrink: 0 }} />
                        <span>{criteria}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 5: Download eBook Prompt */}
                <div style={{
                  padding: "28px",
                  background: isDark ? "rgba(255, 255, 255, 0.02)" : "rgba(15, 23, 42, 0.02)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "14px",
                  marginBottom: "52px"
                }}>
                  <h3 style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "var(--color-text-bright)",
                    marginBottom: "12px"
                  }}>
                    Download the Free AI Employees eBook
                  </h3>
                  <p style={{ fontSize: "15px", lineHeight: 1.7, color: "var(--color-text-body)", margin: "0 0 20px 0" }}>
                    Meet Alex, Maya, Harper, and Orion, and explore how workflow automation and AI workflow automation can help connect sales, marketing, HR, and operations. Get the free eBook to understand the possibilities, identify promising automation opportunities, and start planning a more connected digital workforce.
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
                    <a
                      href="#download-form"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "10px 20px",
                        background: "#6DB6FF",
                        color: "#0f172a",
                        borderRadius: "8px",
                        fontSize: "14px",
                        fontWeight: 700,
                        textDecoration: "none"
                      }}
                    >
                      <span>Download the Free eBook</span>
                      <Download size={15} />
                    </a>
                    <span style={{ fontSize: "13px", color: "var(--color-text-muted)" }}>
                      Instant PDF access · Zero commitment
                    </span>
                  </div>
                </div>

                {/* Section 6: Interactive FAQ Accordion */}
                <div>
                  <h2 style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "var(--color-text-bright)",
                    lineHeight: 1.35,
                    marginBottom: "10px",
                    letterSpacing: "-0.015em"
                  }}>
                    Frequently Asked Questions
                  </h2>
                  <p style={{ fontSize: "15px", color: "var(--color-text-muted)", marginBottom: "24px" }}>
                    Everything you need to know about AI employees, workflow automation, and enterprise deployment.
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {faqs.map((faq, idx) => {
                      const isOpen = openFaqIndex === idx;
                      return (
                        <div
                          key={idx}
                          style={{
                            background: isDark ? "rgba(255, 255, 255, 0.02)" : "rgba(15, 23, 42, 0.02)",
                            border: `1px solid ${isOpen ? (isDark ? "rgba(109, 182, 255, 0.4)" : "rgba(15, 23, 42, 0.2)") : "var(--color-border)"}`,
                            borderRadius: "12px",
                            overflow: "hidden",
                            transition: "all 0.2s ease"
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                            aria-expanded={isOpen}
                            style={{
                              width: "100%",
                              padding: "18px 22px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              gap: "16px",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              textAlign: "left"
                            }}
                          >
                            <span style={{
                              fontFamily: "var(--font-inter), sans-serif",
                              fontSize: "16px",
                              fontWeight: 600,
                              color: isOpen ? "var(--color-text-bright)" : "var(--color-text-body)"
                            }}>
                              {faq.question}
                            </span>
                            <span style={{
                              color: isOpen ? "#6DB6FF" : "var(--color-text-muted)",
                              flexShrink: 0
                            }}>
                              {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </span>
                          </button>

                          {isOpen && (
                            <div style={{
                              padding: "0 22px 20px 22px",
                              fontSize: "15px",
                              lineHeight: 1.7,
                              color: "var(--color-text-muted)",
                              borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(15,23,42,0.05)"}`,
                              paddingTop: "14px"
                            }}>
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Right Sidebar Form Column */}
              <aside id="download-form" style={{ position: "sticky", top: "120px" }}>
                <div style={{
                  background: isDark ? "var(--color-bg-card-alt)" : "#ffffff",
                  border: "1px solid var(--color-border)",
                  borderRadius: "16px",
                  padding: "36px 32px",
                  boxShadow: isDark ? "0 10px 40px rgba(0,0,0,0.3)" : "0 10px 40px rgba(15,23,42,0.06)"
                }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "12px" }}>
                    <Bot size={18} style={{ color: "#38bdf8" }} />
                    <span style={{ fontSize: "12px", fontWeight: 700, color: "#38bdf8", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Instant Access
                    </span>
                  </div>

                  <h3 style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "var(--color-text-bright)",
                    marginBottom: "12px",
                    lineHeight: 1.3
                  }}>
                    Download the Free eBook
                  </h3>

                  <p style={{
                    fontSize: "14px",
                    color: "var(--color-text-muted)",
                    lineHeight: 1.6,
                    marginBottom: "24px"
                  }}>
                    Meet Alex, Maya, Harper, and Orion – your AI Sales, Marketing, HR, and Operations employees – and see how an AI-powered workforce can run alongside your team.
                  </p>

                  {downloadSuccess ? (
                    <div style={{
                      padding: "24px",
                      background: "rgba(34, 197, 94, 0.1)",
                      border: "1px solid rgba(34, 197, 94, 0.3)",
                      borderRadius: "12px",
                      textAlign: "center"
                    }}>
                      <Sparkles size={32} style={{ color: "var(--color-green-text)", marginBottom: "12px" }} />
                      <h4 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", margin: "0 0 8px 0" }}>
                        Thank You!
                      </h4>
                      <p style={{ fontSize: "14px", color: "var(--color-text-muted)", margin: "0 0 16px 0", lineHeight: 1.5 }}>
                        We have registered your download and sent a copy to <strong>{formData.email}</strong>. If your browser didn't open the PDF automatically, click below:
                      </p>
                      <a
                        href={pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "10px 20px",
                          background: "#6DB6FF",
                          color: "#0f172a",
                          borderRadius: "8px",
                          fontSize: "14px",
                          fontWeight: 700,
                          textDecoration: "none"
                        }}
                      >
                        <span>Open eBook PDF</span>
                        <Download size={14} />
                      </a>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--color-text-muted)", marginBottom: "6px" }}>
                          Work Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="you@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          style={{
                            width: "100%",
                            padding: "12px 14px",
                            fontSize: "14px",
                            background: isDark ? "rgba(255,255,255,0.04)" : "#ffffff",
                            border: "1px solid var(--color-border)",
                            borderRadius: "8px",
                            color: "var(--color-text-bright)",
                            outline: "none"
                          }}
                        />
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                        <div>
                          <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--color-text-muted)", marginBottom: "6px" }}>
                            First Name
                          </label>
                          <input
                            type="text"
                            placeholder="Alex"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            style={{
                              width: "100%",
                              padding: "12px 14px",
                              fontSize: "14px",
                              background: isDark ? "rgba(255,255,255,0.04)" : "#ffffff",
                              border: "1px solid var(--color-border)",
                              borderRadius: "8px",
                              color: "var(--color-text-bright)",
                              outline: "none"
                            }}
                          />
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--color-text-muted)", marginBottom: "6px" }}>
                            Last Name
                          </label>
                          <input
                            type="text"
                            placeholder="Taylor"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            style={{
                              width: "100%",
                              padding: "12px 14px",
                              fontSize: "14px",
                              background: isDark ? "rgba(255,255,255,0.04)" : "#ffffff",
                              border: "1px solid var(--color-border)",
                              borderRadius: "8px",
                              color: "var(--color-text-bright)",
                              outline: "none"
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--color-text-muted)", marginBottom: "6px" }}>
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+1 (555) 000-0000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          style={{
                            width: "100%",
                            padding: "12px 14px",
                            fontSize: "14px",
                            background: isDark ? "rgba(255,255,255,0.04)" : "#ffffff",
                            border: "1px solid var(--color-border)",
                            borderRadius: "8px",
                            color: "var(--color-text-bright)",
                            outline: "none"
                          }}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                          marginTop: "8px",
                          width: "100%",
                          padding: "14px",
                          background: "#6DB6FF",
                          color: "#0f172a",
                          border: "none",
                          borderRadius: "10px",
                          fontSize: "15px",
                          fontWeight: 700,
                          cursor: isSubmitting ? "not-allowed" : "pointer",
                          opacity: isSubmitting ? 0.7 : 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                          transition: "all 0.2s ease",
                          boxShadow: "0 4px 14px rgba(109, 182, 255, 0.3)"
                        }}
                      >
                        <span>{isSubmitting ? "Preparing Download..." : "Download the Free eBook"}</span>
                        <Download size={16} />
                      </button>

                      <p style={{ fontSize: "11px", color: "var(--color-text-faint)", textAlign: "center", margin: "4px 0 0 0", lineHeight: 1.5 }}>
                        Get the free eBook delivered to your inbox. By submitting this form, you agree to receive the requested resource and communications from ScalePods.
                      </p>
                    </form>
                  )}
                </div>
              </aside>
            </div>
          </div>
        </section>

        <Footer />
      </BeamsBackground>
    </div>
  );
}
