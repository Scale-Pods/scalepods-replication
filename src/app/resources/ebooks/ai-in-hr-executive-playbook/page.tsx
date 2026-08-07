"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CheckCircle2, Download, Sparkles, ArrowRight } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

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

  const pdfUrl = "https://244814113.fs1.hubspotusercontent-na2.net/hubfs/244814113/AI%20IN%20HR%20-%20E%20book.pdf";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return;

    setIsSubmitting(true);

    try {
      // Register Lead in leadService (Meta CAPI + n8n + CRM)
      const { submitLead } = await import("@/lib/leadService");
      await submitLead({
        formType: "guide_download",
        sourcePage: "/resources/ebooks/ai-in-hr-executive-playbook",
        name: `${formData.firstName} ${formData.lastName}`.trim() || formData.email,
        email: formData.email,
        phone: formData.phone,
        workflowType: "hr_workflow",
        metadata: {
          ebookTitle: "AI in HR: The Executive Playbook for Building an AI-First HR Organization",
          guideName: "AI-in-HR-Executive-Playbook.pdf",
          pdfUrl
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

  const bullets = [
    "Why HR needs an AI-first operating model – the cost of inaction and the shift from digital to AI-native HR",
    "A proprietary six-level AI Maturity Model for HR, plus a self-assessment to score where your organization stands today",
    "Where AI creates the biggest impact across the full employee lifecycle – recruiting, onboarding, performance, and compliance",
    "Your 90-day AI HR blueprint – phase-by-phase milestones, metrics, and the pitfalls to avoid",
    "How to architect an AI-first HR tech stack across all eight layers, from core platform to unified intelligence",
    "What's next: agentic HR, hyper-personalization, predictive workforce planning, and skills-based organizations"
  ];

  return (
    <div style={{ background: "var(--color-bg-page)", minHeight: "100vh", color: "var(--color-text-body)" }}>
      <Navbar />

      {/* Main Landing Page Section */}
      <section style={{ paddingTop: "140px", paddingBottom: "120px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          
          {/* Top Header Information */}
          <div style={{ marginBottom: "40px" }}>
            {/* EBOOK Badge */}
            <div style={{ display: "inline-block", marginBottom: "16px" }}>
              <span style={{
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                padding: "6px 12px",
                borderRadius: "4px",
                background: isDark ? "rgba(109, 182, 255, 0.15)" : "rgba(15, 23, 42, 0.06)",
                color: isDark ? "#6DB6FF" : "#0f172a",
                textTransform: "uppercase"
              }}>
                EBOOK
              </span>
            </div>

            {/* H1 Title */}
            <h1 style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(32px, 4.5vw, 44px)",
              fontWeight: 800,
              color: "var(--color-text-bright)",
              lineHeight: 1.25,
              letterSpacing: "-0.02em",
              maxWidth: "960px",
              marginBottom: "16px"
            }}>
              AI in HR: The Executive Playbook for Building an AI-First HR Organization
            </h1>

            {/* Published Date */}
            <div style={{
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.05em",
              color: "var(--color-text-faint)",
              textTransform: "uppercase"
            }}>
              PUBLISHED ON <span style={{ color: "var(--color-text-muted)" }}>July 2026</span>
            </div>

            <div style={{ height: "1px", background: "var(--color-border-faint)", marginTop: "28px" }} />
          </div>

          {/* 2-Column Grid (Main Content Left, Form Right) */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 440px", gap: "60px", alignItems: "start" }} className="ebook-detail-grid">
            
            {/* Left Content Column */}
            <div>
              {/* Section Heading */}
              <h2 style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "24px",
                fontWeight: 700,
                color: "var(--color-text-bright)",
                lineHeight: 1.35,
                marginBottom: "20px",
                letterSpacing: "-0.01em"
              }}>
                Rebuild Your HR Operating Model Around Intelligence
              </h2>

              {/* Body Paragraphs */}
              <div style={{ display: "flex", flexDirection: "column", gap: "18px", fontSize: "16px", lineHeight: 1.8, color: "var(--color-text-body)", textAlign: "justify", textJustify: "inter-word" }}>
                <p style={{ margin: 0 }}>
                  Talk to any HR leader and you'll hear the same story: teams spend up to 70% of their time on repetitive admin work like scheduling, compliance, and record updates. Digitizing outdated processes – moving from paper to PDFs or spreadsheets to an HRIS – reduces friction, but it doesn’t transform the function.
                </p>
                <p style={{ margin: 0 }}>
                  AI-native HR is different. Instead of just storing data, it predicts patterns, ranks candidates, and flags burnout before it leads to resignations.
                </p>
                <p style={{ margin: 0 }}>
                  AI in HR: The Executive Playbook was built to help you make this shift. Inside, you’ll find a proprietary six-stage maturity model, a 90-day rollout blueprint, and a clear guide to building an AI-first HR stack – so you can transition from manual operations to intelligent automation with confidence.
                </p>
              </div>

              {/* Bullet List Section */}
              <div style={{ marginTop: "36px", marginBottom: "36px" }}>
                <h3 style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "var(--color-text-bright)",
                  marginBottom: "20px"
                }}>
                  Inside this eBook, you'll find:
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {bullets.map((bullet, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                      <CheckCircle2 
                        size={18} 
                        style={{ 
                          color: "var(--color-green-text)", 
                          flexShrink: 0, 
                          marginTop: "3px" 
                        }} 
                      />
                      <span style={{ fontSize: "15px", lineHeight: 1.6, color: "var(--color-text-body)" }}>
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Closing Line */}
              <div style={{
                padding: "20px 24px",
                background: isDark ? "rgba(255,255,255,0.03)" : "rgba(15,23,42,0.03)",
                borderLeft: "3px solid var(--color-green-text)",
                borderRadius: "0 8px 8px 0",
                fontSize: "15px",
                lineHeight: 1.6,
                fontWeight: 500,
                color: "var(--color-text-bright)",
                marginBottom: "40px"
              }}>
                Download the eBook to get the complete framework, blueprint, and tech stack you need to lead your organization's shift to AI-first HR.
              </div>



            </div>

            {/* Right Sidebar Form Column */}
            <aside style={{ position: "sticky", top: "120px" }}>
              <div style={{
                background: isDark ? "var(--color-bg-card-alt)" : "#ffffff",
                border: "1px solid var(--color-border)",
                borderRadius: "16px",
                padding: "36px 32px",
                boxShadow: isDark ? "0 10px 40px rgba(0,0,0,0.3)" : "0 10px 40px rgba(15,23,42,0.06)"
              }}>
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
                  marginBottom: "28px"
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
                      We have emailed the eBook PDF to <strong>{formData.email}</strong>. Your download has also started automatically below:
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
                        Email Address *
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
                          placeholder="John"
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
                          placeholder="Doe"
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
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        transition: "all 0.2s ease",
                        boxShadow: "0 4px 14px rgba(109, 182, 255, 0.3)"
                      }}
                    >
                      <span>{isSubmitting ? "Preparing Download..." : "Download"}</span>
                      <Download size={16} />
                    </button>
                  </form>
                )}
              </div>
            </aside>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
