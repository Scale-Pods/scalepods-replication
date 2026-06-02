"use client";

import { useState } from "react";
import Image from "next/image";
import DownloadModal from "@/components/ui/DownloadModal";
import AuditModal from "@/components/ui/AuditModal";
import { useTheme } from "@/components/providers/ThemeProvider";

interface BlogSection {
  heading: string;
  body: string;
  image?: string;
  imageCaption?: string;
  cta?: {
    text: string;
    link: string;
    isDownload?: boolean;
  };
}

interface BlogBodyClientProps {
  sections: BlogSection[];
  slug: string;
  articleTitle: string;
}

function renderBodyContent(body: string, hasFooter: boolean) {
  const lines = body.split("\n").map(l => l.trim()).filter(Boolean);
  
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%", marginBottom: hasFooter ? "24px" : "0" }}>
      {lines.map((line, idx) => {
        const isBullet = line.startsWith("•") || line.startsWith("-") || line.startsWith("*");
        const isStep = line.startsWith("Step ") || /^\d+\.\s/.test(line) || line.startsWith("💡 Example:") || line.startsWith("✅ Result:");
        const isHighlight = line.startsWith("✅") || line.startsWith("💡");
        
        if (isBullet) {
          return (
            <div
              key={idx}
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "16px",
                color: "var(--color-text-body)",
                lineHeight: 1.8,
                textAlign: "left",
                paddingLeft: "16px",
                display: "flex",
                gap: "8px"
              }}
            >
              <span style={{ color: "var(--color-blue-mid)" }}>•</span>
              <span>{line.replace(/^[•\-\*]\s*/, "")}</span>
            </div>
          );
        }
        
        if (isHighlight) {
          return (
            <div
              key={idx}
              className="premium-blog-highlight"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                margin: "24px auto",
                maxWidth: "680px",
                width: "100%",
                background: "rgba(var(--color-blue-mid-rgb), 0.04)",
                border: "1px solid rgba(var(--color-blue-mid-rgb), 0.15)",
                borderLeft: "4px solid var(--color-blue-mid)",
                borderRadius: "12px",
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "15px",
                color: "var(--color-text-bright)",
                fontStyle: "italic",
                lineHeight: 1.7
              }}
            >
              <span>{line}</span>
            </div>
          );
        }
        
        if (isStep) {
          return (
            <h3
              key={idx}
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "18px",
                fontWeight: 600,
                color: "var(--color-text-bright)",
                lineHeight: 1.4,
                textAlign: "left",
                marginTop: "16px",
                marginBottom: "4px"
              }}
            >
              {line}
            </h3>
          );
        }
        
        return (
          <p
            key={idx}
            className="premium-blog-paragraph"
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "16px",
              color: "var(--color-text-body)",
              lineHeight: 1.8,
              margin: 0
            }}
          >
            {line}
          </p>
        );
      })}
    </div>
  );
}

function WorkflowAuditCTA({ resolvedTheme, onClick }: { resolvedTheme: string; onClick: (e: React.MouseEvent) => void }) {
  const isDark = resolvedTheme === "dark";
  return (
    <div style={{
      width: "100%",
      maxWidth: "800px",
      margin: "40px auto",
      borderRadius: "16px",
      overflow: "hidden",
      border: "1px solid var(--color-border)",
      boxShadow: isDark ? "0 10px 30px rgba(0,0,0,0.15)" : "0 10px 30px rgba(15, 23, 42, 0.06)",
      background: isDark ? "#090d16" : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
      position: "relative",
      padding: "48px 32px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      boxSizing: "border-box"
    }}>
      {/* Grid Pattern Background Decoration */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: isDark ? 0.15 : 0.45,
        backgroundImage: isDark
          ? `radial-gradient(var(--color-blue-mid) 1px, transparent 1px)`
          : `radial-gradient(rgba(0, 128, 255, 0.15) 1px, transparent 1px)`,
        backgroundSize: "20px 20px",
        pointerEvents: "none"
      }} />

      {/* Subtle Wavy CSS Curves in Background */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "60%",
        opacity: isDark ? 0.05 : 0.08,
        backgroundImage: isDark
          ? `
            radial-gradient(circle at 20% 120%, var(--color-green) 0%, transparent 60%),
            radial-gradient(circle at 80% 120%, var(--color-blue-mid) 0%, transparent 60%)
          `
          : `
            radial-gradient(circle at 20% 120%, rgba(177, 217, 151, 0.4) 0%, transparent 60%),
            radial-gradient(circle at 80% 120%, rgba(0, 128, 255, 0.15) 0%, transparent 60%)
          `,
        pointerEvents: "none"
      }} />

      {/* Dot Matrix Decoration (Left and Right) */}
      <div style={{
        position: "absolute",
        left: "24px",
        top: "24px",
        display: "grid",
        gridTemplateColumns: "repeat(5, 4px)",
        gap: "6px",
        opacity: isDark ? 0.25 : 0.15,
        pointerEvents: "none"
      }} className="hidden sm:grid">
        {[...Array(25)].map((_, idx) => (
          <div key={idx} style={{ width: "4px", height: "4px", borderRadius: "50%", background: isDark ? "#ffffff" : "#0f172a" }} />
        ))}
      </div>
      <div style={{
        position: "absolute",
        right: "24px",
        bottom: "24px",
        display: "grid",
        gridTemplateColumns: "repeat(5, 4px)",
        gap: "6px",
        opacity: isDark ? 0.25 : 0.15,
        pointerEvents: "none"
      }} className="hidden sm:grid">
        {[...Array(25)].map((_, idx) => (
          <div key={idx} style={{ width: "4px", height: "4px", borderRadius: "50%", background: isDark ? "#ffffff" : "#0f172a" }} />
        ))}
      </div>

      {/* ScalePods Logo */}
      <div style={{ position: "relative", width: "160px", height: "28px", flexShrink: 0, zIndex: 1, marginBottom: "20px" }}>
        <Image
          src="/scalepods-navbar-logo.png"
          alt="ScalePods"
          fill
          sizes="160px"
          priority
          style={{
            objectFit: "contain",
            objectPosition: "center center",
            filter: isDark ? "invert(1)" : "none"
          }}
        />
      </div>

      {/* Title */}
      <h3 style={{
        position: "relative",
        zIndex: 1,
        fontFamily: "var(--font-inter), sans-serif",
        fontSize: "clamp(22px, 4vw, 32px)",
        fontWeight: 800,
        color: isDark ? "#ffffff" : "#0f172a",
        lineHeight: 1.25,
        maxWidth: "600px",
        margin: "0 0 12px 0",
        letterSpacing: "-0.02em"
      }}>
        Build a sales system that works even when your team is offline
      </h3>

      {/* Subtitle */}
      <p style={{
        position: "relative",
        zIndex: 1,
        fontFamily: "var(--font-inter), sans-serif",
        fontSize: "clamp(14px, 2vw, 17px)",
        color: isDark ? "rgba(255, 255, 255, 0.65)" : "#475569",
        margin: "0 0 28px 0",
        fontWeight: 400
      }}>
        Smarter workflows. Better conversations.
      </p>

      {/* Get Workflow Audit Button */}
      <button
        onClick={onClick}
        style={{
          position: "relative",
          zIndex: 1,
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "14px 28px",
          borderRadius: "8px",
          background: isDark ? "rgba(255, 255, 255, 0.08)" : "#0f172a",
          border: isDark ? "1px solid rgba(255, 255, 255, 0.15)" : "1px solid #0f172a",
          color: "#ffffff",
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: "15px",
          fontWeight: 600,
          cursor: "pointer",
          transition: "all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1)",
          boxShadow: isDark ? "0 4px 20px rgba(0, 0, 0, 0.2)" : "0 4px 12px rgba(15, 23, 42, 0.12)"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = isDark ? "rgba(255, 255, 255, 0.14)" : "#1e293b";
          if (isDark) {
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.25)";
          } else {
            e.currentTarget.style.borderColor = "#1e293b";
          }
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = isDark ? "rgba(255, 255, 255, 0.08)" : "#0f172a";
          if (isDark) {
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
          } else {
            e.currentTarget.style.borderColor = "#0f172a";
          }
          e.currentTarget.style.transform = "none";
        }}
      >
        <span>Get Workflow Audit</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </button>
    </div>
  );
}

export default function BlogBodyClient({ sections, slug, articleTitle }: BlogBodyClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isSalesPodRequest, setIsSalesPodRequest] = useState(false);
  const { resolvedTheme } = useTheme();

  const isGatedArticle = slug === "how-to-automate-your-sdr-workflow-with-ai";

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>, cta: any) => {
    if (isGatedArticle && cta.text === "Download the Feature Guide") {
      e.preventDefault();
      setIsModalOpen(true);
    } else if (cta.text === "Build My Sales Pod") {
      e.preventDefault();
      setIsSalesPodRequest(true);
      setIsAuditModalOpen(true);
    }
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "56px" }}>
        {sections.map((section, i) => (
          <div key={i} className="fade-up" style={{ display: "flex", flexDirection: "column" }}>
            {section.heading && (
              <h2 style={{
                fontFamily: "var(--font-inter), sans-serif", fontSize: "24px", fontWeight: 700,
                color: "var(--color-text-bright)", marginBottom: "18px", lineHeight: 1.3,
                letterSpacing: "-0.01em"
              }}>
                {section.heading}
              </h2>
            )}
            {renderBodyContent(section.body, !!(section.image || section.cta))}

            {/* Section Inline Image */}
            {section.image && (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%", marginTop: "12px", marginBottom: "24px" }}>
                <div style={{
                  width: "100%", borderRadius: "12px", overflow: "hidden",
                  border: "1px solid var(--color-border)",
                  boxShadow: "var(--shadow-sm)"
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={section.image}
                    alt={section.imageCaption || section.heading}
                    style={{ width: "100%", height: "auto", objectFit: "cover", display: "block" }}
                  />
                </div>
                {section.imageCaption && (
                  <span style={{
                    fontFamily: "var(--font-inter), sans-serif", fontSize: "13px",
                    color: "var(--color-text-muted)", textAlign: "center", fontStyle: "italic"
                  }}>
                    {section.imageCaption}
                  </span>
                )}
              </div>
            )}

            {/* Section CTA Button (Horizontally Centered) or Custom Banner */}
            {section.cta && (
              section.cta.text === "Get Workflow Audit" ? (
                <WorkflowAuditCTA resolvedTheme={resolvedTheme} onClick={(e) => { e.preventDefault(); setIsSalesPodRequest(false); setIsAuditModalOpen(true); }} />
              ) : (
                <div style={{ marginTop: "24px", marginBottom: "24px", display: "flex", justifyContent: "center", width: "100%" }}>
                  <a
                    href={section.cta.link}
                    download={section.cta.isDownload}
                    onClick={(e) => handleCtaClick(e, section.cta)}
                    className="blog-section-cta-btn"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "12px 24px",
                      borderRadius: "8px",
                      background: "linear-gradient(135deg, var(--color-blue-mid) 0%, #1e40af 100%)",
                      color: "#ffffff",
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: "14px",
                      fontWeight: 600,
                      textDecoration: "none",
                      boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <span>{section.cta.text}</span>
                    {section.cta.isDownload ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    )}
                  </a>
                </div>
              )
            )}
          </div>
        ))}
      </div>

      {isGatedArticle && (
        <DownloadModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          zipFile="/downloads/AI-Powered-Outbound-Sales-Automation.pdf"
          zipName="AI-Powered-Outbound-Sales-Automation.pdf"
          title="Download the Feature Guide"
          workflowType={null}
          sourceType="blog"
          sourceName="How to Automate Your SDR Workflow with AI"
        />
      )}

      <AuditModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        title={isSalesPodRequest ? "Build My Sales Pod" : "Get a Free Workflow Audit"}
        sourceName={articleTitle}
        isSalesPod={isSalesPodRequest}
      />
    </>
  );
}
