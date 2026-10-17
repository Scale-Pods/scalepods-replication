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
  Users, 
  Calendar, 
  FileText, 
  ShieldCheck, 
  Layers, 
  Milestone, 
  BarChart3, 
  Target, 
  Compass, 
  BrainCircuit, 
  CheckSquare, 
  Clock 
} from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { BeamsBackground } from "@/components/ui/beams-background";

export default function AIinHREbookPage() {
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

  const pdfUrl = "https://244814113.fs1.hubspotusercontent-na2.net/hubfs/244814113/AI%20IN%20HR%20-%20E%20book.pdf";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return;

    setIsSubmitting(true);

    try {
      // Register Lead in leadService (Meta CAPI + n8n + CRM)
      const { submitLead } = await import("@/lib/leadService");
      const title = "AI in HR: The Executive Playbook for Building an AI-First HR Organization";
      const summary = "Inside this playbook, you'll discover how HR automation, recruitment workflows, AI maturity models, and a 90-day blueprint help build an AI-first HR operating model.";
      const subject = "Your ScalePods Executive Playbook: AI in HR — Download Inside";

      await submitLead({
        formType: "guide_download",
        sourcePage: "/resources/ebooks/ai-in-hr-executive-playbook",
        name: `${formData.firstName} ${formData.lastName}`.trim() || formData.email,
        email: formData.email,
        phone: formData.phone,
        workflowType: "hr_workflow",
        ebookTitle: title,
        pdfUrl: pdfUrl,
        emailSubject: subject,
        summaryText: summary,
        metadata: {
          ebookTitle: title,
          guideName: "AI-IN-HR-E-book.pdf",
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

  const corePillars = [
    {
      title: "Assess your HR AI maturity",
      icon: BarChart3,
      accent: "#38bdf8",
      description: "Use the six-level AI maturity model to assess your starting point, identify capability gaps, and define realistic next steps. Distinguish digitizing paperwork from automating individual tasks and building connected HR processes supported by AI."
    },
    {
      title: "Identify high-value HR workflow automation opportunities",
      icon: Target,
      accent: "#a78bfa",
      description: "Map the employee lifecycle—from talent acquisition and hiring to onboarding, employee support, performance processes, and compliance. Identify where HR process automation can reduce repetitive handoffs, where AI may assist with information-heavy tasks, and where human approval must remain."
    },
    {
      title: "Build a practical 90-day AI-in-HR roadmap",
      icon: Milestone,
      accent: "#34d399",
      description: "Establish a baseline, select a focused use case, confirm data access and governance requirements, pilot the workflow, and evaluate results before scaling. Define owners, milestones, success measures, and escalation paths so the initiative remains accountable."
    },
    {
      title: "Plan an AI-first HR technology stack",
      icon: Layers,
      accent: "#f59e0b",
      description: "Evaluate the layers needed to support an AI-first HR organization, including core HR platforms, integrations, workflow orchestration, data, AI capabilities, security, and reporting. The right stack should fit your systems and operating model—not add another disconnected tool."
    },
    {
      title: "Prepare for the next stage of HR",
      icon: BrainCircuit,
      accent: "#ec4899",
      description: "Explore emerging directions such as agentic HR workflows, personalized employee experiences, predictive workforce planning, and skills-based organizations. Treat these as capabilities to assess and govern, not outcomes to assume without evidence."
    }
  ];

  const practicalDomains = [
    {
      title: "Recruitment and talent acquisition automation",
      icon: Users,
      description: "Recruitment automation can coordinate repeatable steps across the hiring journey. Recruitment workflow automation may route applications, send status updates, organize interview availability, and keep candidate records synchronized. Talent acquisition automation can support candidate sourcing and recruiter administration, while recruiters retain responsibility for evaluation, fairness, and final hiring decisions."
    },
    {
      title: "Automated resume screening and candidate review",
      icon: FileText,
      description: "Automated resume screening can organize applications against clearly defined, job-related criteria, extract relevant information, and support recruiter review. Automated candidate screening should not become an opaque decision-maker. Validate criteria, monitor outcomes for bias, protect candidate data, and keep a human decision-maker involved."
    },
    {
      title: "Automated interview scheduling",
      icon: Calendar,
      description: "Automated interview scheduling and automated calendar scheduling can coordinate availability, send invitations, manage reminders, and help reschedule when plans change. Define rules for time zones, interviewer changes, cancellations, and exceptions before launch."
    },
    {
      title: "HR onboarding automation",
      icon: ShieldCheck,
      description: "HR onboarding automation can coordinate document collection, equipment or account requests, policy acknowledgements, training reminders, and handoffs between HR, IT, managers, and new employees. Automated onboarding workflows work best when each task has an owner, due date, completion signal, and escalation route."
    },
    {
      title: "HR operations automation and HR automation tools",
      icon: Layers,
      description: "HR operations automation can route employee requests, manage approvals, update records across approved systems, and provide visibility into pending tasks. When evaluating HR automation tools, HR automation solutions, or HR automation companies, assess integration fit, security, auditability, data handling, configuration effort, support, and exception handling. Choose tools based on a defined process need rather than adopting AI for its own sake."
    }
  ];

  const roadmapPhases = [
    {
      phase: "Days 1–30",
      title: "Assess and Prioritize",
      tag: "Discovery & Alignment",
      accent: "#38bdf8",
      items: [
        "Document current processes, stakeholders, systems, data inputs, delays, and common exceptions.",
        "Select one high-impact use case with a clear business owner and measurable baseline.",
        "Confirm data privacy, security, accessibility, and employment-related compliance requirements."
      ]
    },
    {
      phase: "Days 31–60",
      title: "Design and Pilot",
      tag: "Execution & Testing",
      accent: "#a78bfa",
      items: [
        "Map the target workflow, configure integrations, notifications, and review triggers.",
        "Define mandatory human-in-the-loop review checkpoints and test representative edge scenarios.",
        "Document system exception handling for incomplete data, API timeouts, and manual overrides."
      ]
    },
    {
      phase: "Days 61–90",
      title: "Measure and Improve",
      tag: "Optimization & Scale",
      accent: "#34d399",
      items: [
        "Compare results against the day 1 baseline (processing time, completion rates, error margins).",
        "Collect qualitative feedback from candidates, hiring managers, and HR team members.",
        "Establish ongoing audit governance and define criteria before expanding to adjacent HR workflows."
      ]
    }
  ];

  const faqs = [
    {
      question: "What is HR automation?",
      answer: "HR automation uses software, rules, integrations, and sometimes AI to coordinate repeatable human resources tasks. Examples include request routing, record updates, reminders, onboarding coordination, and recruitment administration."
    },
    {
      question: "What is HR workflow automation?",
      answer: "HR workflow automation connects steps in a defined process, such as routing an approval, notifying the next owner, updating a system, and tracking completion."
    },
    {
      question: "How is AI used in HR?",
      answer: "AI in HR can support summarization, document extraction, request classification, application review support, and workforce trend analysis. Hiring, performance, and employee-data use cases require careful governance, validation, transparency, and human oversight."
    },
    {
      question: "Can recruitment automation replace recruiters?",
      answer: "Recruitment automation can reduce administration in sourcing coordination, candidate communication, screening support, and interview scheduling. Recruiters remain essential for contextual evaluation, candidate relationships, fairness checks, and final decisions."
    },
    {
      question: "What is automated resume screening?",
      answer: "Automated resume screening organizes or compares application information against defined criteria. Employers should ensure criteria are job-related, test for unintended bias, explain how the system is used, and retain appropriate human review."
    },
    {
      question: "How can we automate interview scheduling?",
      answer: "Connect candidate availability, interviewer calendars, invitations, and reminders. Include rules for time zones, rescheduling, cancellations, conflicts, and manual intervention."
    },
    {
      question: "How should a company start with HR process automation?",
      answer: "Choose a frequent process with clear inputs, an accountable owner, and measurable pain points. Map the current workflow, review privacy and security needs, run a controlled pilot, and compare results with a baseline before expanding."
    },
    {
      question: "What should we look for in HR automation tools?",
      answer: "Evaluate integrations, security controls, permissions, audit logs, data retention, usability, exception handling, vendor support, and measurable fit. Test AI features for reliability and govern them according to use-case risk."
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
                  FREE EXECUTIVE EBOOK · AI IN HR · HR AUTOMATION
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
                AI in HR: The Executive Playbook for Building an AI-First HR Organization
              </h1>

              {/* Lead Paragraph */}
              <p style={{
                fontSize: "18px",
                lineHeight: 1.7,
                color: "var(--color-text-muted)",
                maxWidth: "920px",
                margin: "0 0 24px 0"
              }}>
                Move beyond disconnected HR tools and manual processes. Download the free ScalePods executive playbook to explore how HR automation, AI-supported decision-making, and connected workflows can help improve recruiting, onboarding, employee operations, and workforce planning.
              </p>

              {/* Published Date */}
              <div style={{
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.06em",
                color: "var(--color-text-faint)",
                textTransform: "uppercase"
              }}>
                UPDATED FOR 2026 · <span style={{ color: "var(--color-text-muted)" }}>EXECUTIVE MATURITY MODEL & 90-DAY BLUEPRINT</span>
              </div>

              <div style={{ height: "1px", background: "var(--color-border-faint)", marginTop: "28px" }} />
            </div>

            {/* 2-Column Grid (Main Content Left, Form Right) */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 440px", gap: "60px", alignItems: "start" }} className="ebook-detail-grid">
              
              {/* Left Content Column */}
              <div>
                {/* Section 1: Operating Model Around Intelligence */}
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
                    Rebuild Your HR Operating Model Around Intelligence
                  </h2>

                  <div style={{ display: "flex", flexDirection: "column", gap: "16px", fontSize: "16px", lineHeight: 1.8, color: "var(--color-text-body)" }}>
                    <p style={{ margin: 0 }}>
                      HR teams manage a complex mix of people, processes, systems, and sensitive information. Recruiters coordinate interviews, hiring teams review applications, HR operations maintain records, and people leaders manage onboarding, compliance, and employee support. When these activities rely on manual updates or disconnected tools, work can stall and visibility can suffer.
                    </p>
                    <p style={{ margin: 0 }}>
                      <strong>HR workflow automation</strong> connects repeatable tasks into clearer processes. It can route requests, update systems, trigger reminders, and coordinate approvals. AI can add support for summarizing information, extracting document details, classifying requests, and prioritizing work—when configured for the task and reviewed appropriately.
                    </p>
                    <p style={{ margin: 0 }}>
                      The objective is not to automate every human decision. It is to reduce avoidable administration and give HR professionals more time for judgment, employee relationships, and strategic workforce planning.
                    </p>
                  </div>
                </div>

                {/* Section 2: What You'll Learn in the Playbook */}
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
                    What You’ll Learn in the Playbook
                  </h2>
                  <p style={{ fontSize: "15px", color: "var(--color-text-muted)", marginBottom: "24px" }}>
                    Five strategic pillars to guide your transition from fragmented HR administration to an AI-first talent engine.
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                    {corePillars.map((pillar, idx) => {
                      const IconComp = pillar.icon;
                      return (
                        <div
                          key={idx}
                          style={{
                            background: isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(15, 23, 42, 0.02)",
                            border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(15, 23, 42, 0.08)"}`,
                            borderRadius: "14px",
                            padding: "24px",
                            transition: "all 0.2s ease"
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                            <div style={{
                              width: "36px",
                              height: "36px",
                              borderRadius: "8px",
                              background: isDark ? `${pillar.accent}1a` : `${pillar.accent}15`,
                              border: `1px solid ${pillar.accent}40`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: pillar.accent,
                              flexShrink: 0
                            }}>
                              <IconComp size={18} />
                            </div>
                            <h3 style={{
                              fontSize: "17px",
                              fontWeight: 700,
                              color: "var(--color-text-bright)",
                              margin: 0
                            }}>
                              {pillar.title}
                            </h3>
                          </div>
                          <p style={{
                            fontSize: "15px",
                            lineHeight: 1.7,
                            color: "var(--color-text-body)",
                            margin: 0
                          }}>
                            {pillar.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Section 3: Where HR Automation Makes a Difference */}
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
                    Where HR Automation Can Make a Practical Difference
                  </h2>
                  <p style={{ fontSize: "15px", color: "var(--color-text-muted)", marginBottom: "24px" }}>
                    High-impact operational areas where connected workflows eliminate bottlenecks while safeguarding compliance.
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                    {practicalDomains.map((domain, idx) => {
                      const IconComp = domain.icon;
                      return (
                        <div
                          key={idx}
                          style={{
                            padding: "20px 22px",
                            background: isDark ? "rgba(255, 255, 255, 0.02)" : "rgba(15, 23, 42, 0.02)",
                            borderLeft: "3px solid #38bdf8",
                            borderRadius: "0 10px 10px 0",
                            borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.06)"}`,
                            borderRight: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.06)"}`,
                            borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.06)"}`
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                            <IconComp size={18} style={{ color: "#38bdf8" }} />
                            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", margin: 0 }}>
                              {domain.title}
                            </h3>
                          </div>
                          <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.7, color: "var(--color-text-muted)" }}>
                            {domain.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Section 4: 90-Day Roadmap */}
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
                    Your 90-Day Roadmap: From Pilot to Repeatable Practice
                  </h2>
                  <p style={{ fontSize: "15px", color: "var(--color-text-muted)", marginBottom: "24px" }}>
                    A proven three-phase rollout framework to pilot responsibly and scale with confidence.
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                    {roadmapPhases.map((phase, idx) => (
                      <div
                        key={idx}
                        style={{
                          background: isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(15, 23, 42, 0.02)",
                          border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(15, 23, 42, 0.08)"}`,
                          borderRadius: "14px",
                          padding: "24px"
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px", flexWrap: "wrap", gap: "8px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <span style={{
                              fontSize: "12px",
                              fontWeight: 800,
                              textTransform: "uppercase",
                              padding: "4px 10px",
                              borderRadius: "6px",
                              background: `${phase.accent}20`,
                              color: phase.accent
                            }}>
                              {phase.phase}
                            </span>
                            <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-text-bright)", margin: 0 }}>
                              {phase.title}
                            </h3>
                          </div>
                          <span style={{ fontSize: "12px", color: "var(--color-text-faint)", fontWeight: 600 }}>
                            {phase.tag}
                          </span>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                          {phase.items.map((item, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                              <CheckCircle2 size={16} style={{ color: phase.accent, flexShrink: 0, marginTop: "3px" }} />
                              <span style={{ fontSize: "14px", lineHeight: 1.6, color: "var(--color-text-body)" }}>
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 5: Evaluation Framework */}
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
                    How to Choose the Right HR Automation Approach
                  </h2>

                  <p style={{ fontSize: "15px", lineHeight: 1.7, color: "var(--color-text-muted)", marginBottom: "20px" }}>
                    Before automating, evaluate prospective workflows against this 5-point readiness rubric:
                  </p>

                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    background: isDark ? "rgba(255, 255, 255, 0.02)" : "rgba(15, 23, 42, 0.02)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "12px",
                    padding: "20px 24px"
                  }}>
                    {[
                      "Is the process frequent, repeatable, and clearly defined?",
                      "Are the data sources accurate, authorized, and accessible via APIs?",
                      "Can success be measured against a credible baseline?",
                      "Which decisions require human judgment, approval, or an appeal path?",
                      "Can the workflow be monitored, audited, maintained, and safely changed?"
                    ].map((question, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "14px", color: "var(--color-text-body)" }}>
                        <CheckSquare size={16} style={{ color: "#38bdf8", flexShrink: 0, marginTop: "2px" }} />
                        <span>{question}</span>
                      </div>
                    ))}
                  </div>

                  <p style={{ fontSize: "14px", lineHeight: 1.6, color: "var(--color-text-muted)", marginTop: "14px" }}>
                    These questions help distinguish a good automation candidate from a process that first needs clearer ownership, better data quality, or updated workplace policies.
                  </p>
                </div>

                {/* Section 6: Closing Build Plan Summary */}
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
                    Build an AI-First HR Organization With a Clear Plan
                  </h3>
                  <p style={{ fontSize: "15px", lineHeight: 1.7, color: "var(--color-text-body)", margin: "0 0 20px 0" }}>
                    An effective AI-first HR strategy begins with business priorities, not a list of tools. The ScalePods AI in HR Executive Playbook brings together an HR AI maturity model, a 90-day rollout blueprint, and a framework for planning an AI-first HR stack. Use it to assess your starting point, prioritize practical opportunities, and plan the governance needed to scale responsibly.
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
                      <span>Download the Executive Playbook</span>
                      <Download size={15} />
                    </a>
                    <span style={{ fontSize: "13px", color: "var(--color-text-muted)" }}>
                      Instant PDF access · Zero commitment
                    </span>
                  </div>
                </div>

                {/* Section 7: Interactive FAQ Accordion */}
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
                    Expert answers on HR automation, AI compliance, recruiter enablement, and tool selection.
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
                    <Users size={18} style={{ color: "#38bdf8" }} />
                    <span style={{ fontSize: "12px", fontWeight: 700, color: "#38bdf8", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Executive Blueprint
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
                    Get the executive playbook for building an AI-first HR organization — the maturity model, 90-day blueprint, and tech stack, in one guide.
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
                            placeholder="Sarah"
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
                            placeholder="Jenkins"
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
                        Get the free playbook delivered to your inbox. By submitting this form, you agree to receive the requested resource and communications from ScalePods.
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
