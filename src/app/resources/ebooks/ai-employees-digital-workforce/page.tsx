"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CheckCircle2, Download, Sparkles } from "lucide-react";
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

  const pdfUrl = "https://244814113.fs1.hubspotusercontent-na2.net/hubfs/244814113/AI%20Employees%20E-Book.pdf";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return;

    setIsSubmitting(true);

    try {
      // Register Lead in leadService (Meta CAPI + n8n + CRM)
      const { submitLead } = await import("@/lib/leadService");
      const title = "AI Employees: Meet the Digital Workforce That Never Sleeps, Never Forgets, and Never Misses a Deadline";
      const summary = "Inside this eBook, you'll find how Alex, Maya, Harper, and Orion work as one connected digital workforce for Sales, Marketing, HR, and Operations to handle repetitive work 24/7.";
      const subject = "Your ScalePods Executive eBook: AI Employees — Download Inside";

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

  const bullets = [
    "What an AI Employee actually is, and how it's different from software or automation",
    "Meet Alex, your AI Sales Employee – prospecting, outreach, CRM updates, and lead scoring, done before your team logs in",
    "Meet Maya, your AI Marketing Employee – a research-to-reporting content loop that runs every day, whether your team is online or not",
    "Meet Harper, your AI HR Employee – resume screening to onboarding, wrapped up before HR's first coffee",
    "Meet Orion, your AI Operations Employee – invoices, compliance, and risk checks, handled quietly in the background",
    "How to build your AI dream team – how Alex, Maya, Harper, and Orion share data and work as one connected workforce"
  ];

  return (
    <div style={{ background: "var(--color-bg-page)", minHeight: "100vh", color: "var(--color-text-body)" }}>
      <BeamsBackground hues={[200, 210, 225]} intensity="strong">
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
              AI Employees: Meet the Digital Workforce That Never Sleeps, Never Forgets, and Never Misses a Deadline
            </h1>

            {/* Published Date */}
            <div style={{
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.05em",
              color: "var(--color-text-faint)",
              textTransform: "uppercase"
            }}>
              PUBLISHED ON <span style={{ color: "var(--color-text-muted)" }}>August 2026</span>
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
                Your Next Hire Won't Need a Desk
              </h2>

              {/* Body Paragraphs */}
              <div style={{ display: "flex", flexDirection: "column", gap: "18px", fontSize: "16px", lineHeight: 1.8, color: "var(--color-text-body)", textAlign: "justify", textJustify: "inter-word" }}>
                <p style={{ margin: 0 }}>
                  Every business grows the same way – the work piles up, so you hire. A rep to chase leads. A coordinator to keep the CRM current. It works, until headcount grows faster than output, and your best people spend their days on tasks that don't need a human brain.
                </p>
                <p style={{ margin: 0 }}>
                  Software made work faster. Automation removed some manual steps. AI Employees go further where they don't just support a task, they own a full role, start to finish, and get better the longer they work with you.
                </p>
                <p style={{ margin: 0 }}>
                  That's why we built Alex, Maya, Harper, and Orion; AI Employees for Sales, Marketing, HR, and Operations. Each one logs in before your team does, works independently, and only hands off decisions when a human judgment call is actually needed.
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
                Download the eBook to meet your future workforce – and see how AI Employees can take repetitive work off your team's plate for good.
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
                  Meet Alex, Maya, Harper, and Orion – your AI Sales, Marketing, HR, and Operations employees – and see how an AI-powered workforce can run alongside your team, starting today.
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
                      <span>{isSubmitting ? "Preparing Download..." : "Download"}</span>
                      <Download size={16} />
                    </button>

                    <p style={{ fontSize: "11px", color: "var(--color-text-faint)", textAlign: "center", margin: "4px 0 0 0" }}>
                      By submitting this form, you agree to receive communications from ScalePods.
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
