"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import DownloadModal from "@/components/ui/DownloadModal";
import AuditModal from "@/components/ui/AuditModal";
import { useTheme } from "@/components/providers/ThemeProvider";
import BlogFaqAccordion from "@/components/ui/BlogFaqAccordion";
import { Check, X, Search, Target, Grid, Users, BarChart3, FileText, RefreshCw, Shield, ArrowUpRight, Lock, UserPlus, UserCheck, Calendar, Bot, LayoutGrid, Mail, Award, Megaphone, Zap, TrendingUp, Globe, Activity, Filter, Send, PieChart, MapPin, Cpu, Play, Pause, Volume2, VolumeX, Loader2 } from "lucide-react";

interface AccordionItem {
  title: string;
  content: string;
}

interface BlogSection {
  heading: string;
  body: string;
  image?: string;
  imageLight?: string;
  imageDark?: string;
  imageCaption?: string;
  accordionItems?: AccordionItem[];
  visual?: "ai-transform" | "barriers" | "implementation" | "checklist" | "readiness-datasheets" | "features-grid" | "ma-evolution" | "ma-processes-grid" | "ma-use-cases" | "ma-ai-transform" | "ma-challenges" | "ma-trends" | "ma-features-grid" | "hr-processes-grid" | "hr-benefits-stats" | "ma-benefits-stats" | "hr-cta-cards" | "ma-cta-cards" | "hr-cta-landing" | "hr-cta-datasheet" | "ma-cta-landing" | "ma-cta-datasheet" | "sa-before-after" | "sa-benefits-stats" | "sa-processes-grid" | "sa-flow-diagram" | "sa-ai-transform" | "sa-implementation" | "sa-features-grid" | "sa-cta-landing" | "sa-cta-datasheet";
  cta?: {
    text: string;
    link: string;
    isDownload?: boolean;
  };
  video?: string;
  imagePosition?: "top" | "middle" | "bottom";
  isContinuation?: boolean;
}

interface BlogVideoPlayerProps {
  src: string;
}

const BlogVideoPlayer = ({ src }: BlogVideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const loadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          loadObserver.disconnect();
        }
      },
      { rootMargin: "300px" }
    );

    loadObserver.observe(container);
    return () => loadObserver.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (isPlaying) {
            video.currentTime = 0;
            video.muted = true;
            setIsMuted(true);
            video.play().catch(() => {});
          }
        } else {
          video.pause();
          video.muted = true;
          setIsMuted(true);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(video);
    return () => observer.unobserve(video);
  }, [isPlaying, shouldLoad]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid var(--color-border)",
        background: "#080a0e",
        aspectRatio: "16/9",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
        cursor: "pointer",
        marginTop: "24px",
        marginBottom: "24px"
      }}
      onClick={togglePlay}
    >
      {shouldLoad && (
        <video
          ref={videoRef}
          src={src}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          preload="metadata"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: isVideoReady ? 1 : 0,
            transition: "opacity 0.5s ease-in-out"
          }}
          onCanPlay={() => setIsVideoReady(true)}
          onLoadedData={() => setIsVideoReady(true)}
          onPlay={() => setIsVideoReady(true)}
        />
      )}

      {/* Loading Overlay */}
      {!isVideoReady && (
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(8, 10, 14, 0.95)",
          gap: "12px",
          color: "rgba(255, 255, 255, 0.7)"
        }}>
          <Loader2 className="animate-spin" size={24} style={{ color: "var(--color-blue-mid)" }} />
          <span style={{ fontSize: "12px", fontWeight: 500, letterSpacing: "0.05em" }}>PREPARING EXPERIENCE...</span>
        </div>
      )}

      {/* Play/Pause Center Indicator */}
      {isVideoReady && !isPlaying && (
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(0, 0, 0, 0.3)",
          transition: "background 0.2s"
        }}>
          <div style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(255, 255, 255, 0.3)"
          }}>
            <Play size={28} style={{ color: "#ffffff", fill: "#ffffff", marginLeft: "4px" }} />
          </div>
        </div>
      )}

      {/* Bottom Controls Overlay */}
      {isVideoReady && (
        <div style={{
          position: "absolute",
          bottom: "16px",
          left: "16px",
          right: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 10,
          pointerEvents: "none"
        }}>
          <button
            onClick={(e) => { e.stopPropagation(); togglePlay(); }}
            style={{
              pointerEvents: "auto",
              background: "rgba(10, 15, 30, 0.75)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              cursor: "pointer"
            }}
          >
            {isPlaying ? <Pause size={16} style={{ fill: "#ffffff" }} /> : <Play size={16} style={{ fill: "#ffffff", marginLeft: "2px" }} />}
          </button>

          <button
            onClick={toggleMute}
            style={{
              pointerEvents: "auto",
              background: "rgba(10, 15, 30, 0.75)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              cursor: "pointer"
            }}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>
      )}
    </div>
  );
};

interface BlogBodyClientProps {
  sections: BlogSection[];
  slug: string;
  articleTitle: string;
}

function parseMarkdownInline(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index} style={{ fontWeight: 700, color: "var(--color-text-bright)" }}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

function renderBodyContent(body: string, hasFooter: boolean) {
  const lines = body.split("\n").map(l => l.trim()).filter(Boolean);
  if (lines.length === 0) return null;
  
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%", marginBottom: hasFooter ? "24px" : "0" }}>
      {lines.map((line, idx) => {
        const isBullet = line.startsWith("•") || line.startsWith("-") || line.startsWith("*");
        const isStep = line.startsWith("Step ") || /^\d+\.\s/.test(line) || line.startsWith("💡 Example:") || line.startsWith("✅ Result:");
        const isHighlight = line.startsWith("✅") || line.startsWith("💡");
        
        if (isBullet) {
          const bulletText = line.replace(/^[•\-\*]\s*/, "");
          const colonIdx = bulletText.indexOf(":");
          if (colonIdx !== -1) {
            const headingPart = bulletText.substring(0, colonIdx);
            const descPart = bulletText.substring(colonIdx + 1);
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
                <span>
                  <strong style={{ color: "var(--color-text-bright)", fontWeight: 700 }}>{headingPart}:</strong>{parseMarkdownInline(descPart)}
                </span>
              </div>
            );
          }
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
              <span>{parseMarkdownInline(bulletText)}</span>
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
                borderWidth: "1px 1px 1px 4px",
                borderStyle: "solid",
                borderColor: "rgba(var(--color-blue-mid-rgb), 0.15) rgba(var(--color-blue-mid-rgb), 0.15) rgba(var(--color-blue-mid-rgb), 0.15) var(--color-blue-mid)",
                borderRadius: "12px",
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "15px",
                color: "var(--color-text-bright)",
                fontStyle: "italic",
                lineHeight: 1.7
              }}
            >
              <span>{parseMarkdownInline(line)}</span>
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
              {parseMarkdownInline(line)}
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
            {parseMarkdownInline(line)}
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

  const renderAITransform = () => {
    const isDark = resolvedTheme === "dark";
    const traditionalItems = [
      "Manual resume review — HR reads every CV line-by-line, slowing down shortlisting",
      "Ad hoc candidate matching — subjective comparisons with no structured scoring",
      "Repetitive employee queries — HR teams answer the same policy questions over and over",
      "Reactive workforce planning — hiring demand and attrition risk spotted only after the fact",
      "Manual request routing — approvals, follow-ups, and responses handled by hand"
    ];
    const aiItems = [
      "AI-powered resume screening — resumes reviewed instantly, top matches surfaced automatically",
      "Intelligent candidate matching — experience, skills, and fit scored to improve shortlist quality",
      "Automated employee support — AI assistants handle routine HR queries and reduce ticket volume",
      "Predictive workforce analytics — hiring demand, retention risk, and capacity gaps flagged early",
      "AI agents for HR ops — requests routed, responses drafted, and routine actions completed automatically"
    ];

    return (
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "24px",
        marginTop: "32px",
        marginBottom: "32px"
      }}>
        {/* Traditional HR */}
        <div style={{
          background: isDark ? "var(--color-bg-card-alt)" : "#ffffff",
          border: isDark ? "1px solid var(--color-border)" : "1px solid rgba(15, 23, 42, 0.04)",
          borderRadius: "16px",
          padding: "28px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          boxShadow: isDark ? "0 10px 30px rgba(0, 0, 0, 0.4)" : "0 10px 30px rgba(15, 23, 42, 0.05)"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{
              fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em",
              padding: "4px 10px", borderRadius: "6px", background: "rgba(255, 255, 255, 0.05)", color: "var(--color-text-faint)"
            }}>Traditional HR</span>
            <span style={{ fontSize: "14px", color: "var(--color-text-muted)", fontWeight: 500 }}>Without AI</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {traditionalItems.map((item, idx) => {
              const parts = item.split(" — ");
              const title = parts[0];
              const desc = parts.slice(1).join(" — ");
              return (
                <div key={idx} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <div style={{
                    width: "20px", height: "20px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.05)",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px"
                  }}>
                    <X style={{ width: "12px", height: "12px", color: "var(--color-text-muted)" }} />
                  </div>
                  <div style={{ fontSize: "14px", lineHeight: "1.5", color: "var(--color-text-body)" }}>
                    <strong style={{ color: "var(--color-text-bright)" }}>{title}</strong> — {desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI-Powered HR */}
        <div style={{
          background: isDark ? "var(--color-bg-card-alt)" : "#ffffff",
          border: isDark ? "1px solid var(--color-blue-mid)" : "1px solid rgba(var(--color-blue-mid-rgb), 0.15)",
          borderRadius: "16px",
          padding: "28px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          boxShadow: isDark ? "0 10px 30px rgba(0, 0, 0, 0.4)" : "0 10px 30px rgba(var(--color-blue-mid-rgb), 0.06)"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{
              fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em",
              padding: "4px 10px", borderRadius: "6px", background: "rgba(var(--color-green-rgb), 0.15)", color: "var(--color-green)"
            }}>AI-Powered HR</span>
            <span style={{ fontSize: "14px", color: "var(--color-blue-mid)", fontWeight: 600 }}>With AI in an HRIS</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {aiItems.map((item, idx) => {
              const parts = item.split(" — ");
              const title = parts[0];
              const desc = parts.slice(1).join(" — ");
              return (
                <div key={idx} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <div style={{
                    width: "20px", height: "20px", borderRadius: "50%", background: "rgba(var(--color-green-rgb), 0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px"
                  }}>
                    <Check style={{ width: "12px", height: "12px", color: "var(--color-green)" }} />
                  </div>
                  <div style={{ fontSize: "14px", lineHeight: "1.5", color: "var(--color-text-body)" }}>
                    <strong style={{ color: "var(--color-text-bright)" }}>{title}</strong> — {desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderBarriers = () => {
    const isDark = resolvedTheme === "dark";
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginTop: "32px", marginBottom: "32px", width: "100%" }}>
        {/* 4 Card Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
          width: "100%"
        }}>
          {/* Card 1: People Challenge */}
          <div style={{
            background: isDark ? "var(--color-bg-card-alt)" : "#ffffff",
            borderWidth: "4px 1px 1px 1px",
            borderStyle: "solid",
            borderColor: `var(--color-green) ${isDark ? "var(--color-border)" : "rgba(15, 23, 42, 0.04)"} ${isDark ? "var(--color-border)" : "rgba(15, 23, 42, 0.04)"} ${isDark ? "var(--color-border)" : "rgba(15, 23, 42, 0.04)"}`,
            borderRadius: "12px",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            boxShadow: isDark ? "0 10px 30px rgba(0, 0, 0, 0.4)" : "0 10px 30px rgba(15, 23, 42, 0.05)"
          }}>
            <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--color-green)", letterSpacing: "0.05em", textTransform: "uppercase" }}>People Challenge</span>
            <h4 style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-text-bright)", margin: 0 }}>Resistance to change is the biggest barrier.</h4>
            <p style={{ fontSize: "13px", color: "var(--color-text-muted)", margin: 0, lineHeight: 1.6 }}>
              70% of HR transformation projects fail due to poor change management, not technology. Clear communication and structured training cut resistance.
            </p>
            <div style={{ display: "flex", gap: "24px", marginTop: "auto", paddingTop: "12px" }}>
              <div>
                <span style={{ fontSize: "22px", fontWeight: 800, color: "var(--color-text-bright)" }}>70%</span>
                <span style={{ display: "block", fontSize: "10px", color: "var(--color-text-muted)" }}>project failure rate</span>
              </div>
              <div>
                <span style={{ fontSize: "22px", fontWeight: 800, color: "var(--color-text-bright)" }}>54%</span>
                <span style={{ display: "block", fontSize: "10px", color: "var(--color-text-muted)" }}>want training first</span>
              </div>
            </div>
          </div>

          {/* Card 2: Data Challenge */}
          <div style={{
            background: isDark ? "var(--color-bg-card-alt)" : "#ffffff",
            borderWidth: "4px 1px 1px 1px",
            borderStyle: "solid",
            borderColor: `var(--color-blue-mid) ${isDark ? "var(--color-border)" : "rgba(15, 23, 42, 0.04)"} ${isDark ? "var(--color-border)" : "rgba(15, 23, 42, 0.04)"} ${isDark ? "var(--color-border)" : "rgba(15, 23, 42, 0.04)"}`,
            borderRadius: "12px",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            boxShadow: isDark ? "0 10px 30px rgba(0, 0, 0, 0.4)" : "0 10px 30px rgba(15, 23, 42, 0.05)"
          }}>
            <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--color-blue-mid)", letterSpacing: "0.05em", textTransform: "uppercase" }}>Data Challenge</span>
            <h4 style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-text-bright)", margin: 0 }}>Dirty data derails migrations and automation.</h4>
            <p style={{ fontSize: "13px", color: "var(--color-text-muted)", margin: 0, lineHeight: 1.6 }}>
              Organisations with poor data hygiene spend 3x longer on system migrations. Cleaning and standardising records cuts go-live delays significantly.
            </p>
            <div style={{ display: "flex", gap: "24px", marginTop: "auto", paddingTop: "12px" }}>
              <div>
                <span style={{ fontSize: "22px", fontWeight: 800, color: "var(--color-text-bright)" }}>3x</span>
                <span style={{ display: "block", fontSize: "10px", color: "var(--color-text-muted)" }}>longer migrations</span>
              </div>
              <div>
                <span style={{ fontSize: "22px", fontWeight: 800, color: "var(--color-text-bright)" }}>62%</span>
                <span style={{ display: "block", fontSize: "10px", color: "var(--color-text-muted)" }}>cite data as top risk</span>
              </div>
            </div>
          </div>

          {/* Card 3: Compliance & Integration */}
          <div style={{
            background: isDark ? "var(--color-bg-card-alt)" : "#ffffff",
            borderWidth: "4px 1px 1px 1px",
            borderStyle: "solid",
            borderColor: `var(--color-green) ${isDark ? "var(--color-border)" : "rgba(15, 23, 42, 0.04)"} ${isDark ? "var(--color-border)" : "rgba(15, 23, 42, 0.04)"} ${isDark ? "var(--color-border)" : "rgba(15, 23, 42, 0.04)"}`,
            borderRadius: "12px",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            boxShadow: isDark ? "0 10px 30px rgba(0, 0, 0, 0.4)" : "0 10px 30px rgba(15, 23, 42, 0.05)"
          }}>
            <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--color-green)", letterSpacing: "0.05em", textTransform: "uppercase" }}>Compliance & Integration</span>
            <h4 style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-text-bright)", margin: 0 }}>Disconnected systems put operations at risk.</h4>
            <p style={{ fontSize: "13px", color: "var(--color-text-muted)", margin: 0, lineHeight: 1.6 }}>
              Only 19% of HR teams have full audit trails across all people systems. Secure software with native payroll integrations reduces exposure.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "auto", paddingTop: "12px" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "4px" }}>
                  <span style={{ color: "var(--color-text-muted)" }}>Full Audit Trails</span>
                  <span style={{ color: "var(--color-text-bright)", fontWeight: 600 }}>19%</span>
                </div>
                <div style={{ height: "4px", background: "var(--color-border)", borderRadius: "2px", overflow: "hidden" }}>
                  <div style={{ width: "19%", height: "100%", background: "var(--color-green)" }} />
                </div>
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "4px" }}>
                  <span style={{ color: "var(--color-text-muted)" }}>Payroll Integration</span>
                  <span style={{ color: "var(--color-text-bright)", fontWeight: 600 }}>58%</span>
                </div>
                <div style={{ height: "4px", background: "var(--color-border)", borderRadius: "2px", overflow: "hidden" }}>
                  <div style={{ width: "58%", height: "100%", background: "var(--color-green)" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Automation Scope */}
          <div style={{
            background: isDark ? "var(--color-bg-card-alt)" : "#ffffff",
            borderWidth: "4px 1px 1px 1px",
            borderStyle: "solid",
            borderColor: `var(--color-blue-mid) ${isDark ? "var(--color-border)" : "rgba(15, 23, 42, 0.04)"} ${isDark ? "var(--color-border)" : "rgba(15, 23, 42, 0.04)"} ${isDark ? "var(--color-border)" : "rgba(15, 23, 42, 0.04)"}`,
            borderRadius: "12px",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            boxShadow: isDark ? "0 10px 30px rgba(0, 0, 0, 0.4)" : "0 10px 30px rgba(15, 23, 42, 0.05)"
          }}>
            <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--color-blue-mid)", letterSpacing: "0.05em", textTransform: "uppercase" }}>Automation Scope</span>
            <h4 style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-text-bright)", margin: 0 }}>Up to 56% of HR tasks can be automated today.</h4>
            <p style={{ fontSize: "13px", color: "var(--color-text-muted)", margin: 0, lineHeight: 1.6 }}>
              McKinsey research shows most headroom sits in repetitive admin — data entry, approvals, and reporting — not sensitive people decisions.
            </p>
            <div style={{ display: "flex", gap: "16px", marginTop: "auto", paddingTop: "12px" }}>
              <div>
                <span style={{ fontSize: "20px", fontWeight: 800, color: "var(--color-text-bright)" }}>56%</span>
                <span style={{ display: "block", fontSize: "10px", color: "var(--color-text-muted)" }}>tasks automated</span>
              </div>
              <div>
                <span style={{ fontSize: "20px", fontWeight: 800, color: "var(--color-text-bright)" }}>35%</span>
                <span style={{ display: "block", fontSize: "10px", color: "var(--color-text-muted)" }}>cost-per-hire drop</span>
              </div>
              <div>
                <span style={{ fontSize: "20px", fontWeight: 800, color: "var(--color-text-bright)" }}>2.3x</span>
                <span style={{ display: "block", fontSize: "10px", color: "var(--color-text-muted)" }}>turnover diff</span>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width Human Touch Footer Card */}
        <div style={{
          background: isDark ? "rgba(var(--color-green-rgb), 0.02)" : "rgba(var(--color-green-rgb), 0.01)",
          borderWidth: "1px 1px 1px 4px",
          borderStyle: "solid",
          borderColor: `${isDark ? "rgba(var(--color-green-rgb), 0.15)" : "rgba(var(--color-green-rgb), 0.2)"} ${isDark ? "rgba(var(--color-green-rgb), 0.15)" : "rgba(var(--color-green-rgb), 0.2)"} ${isDark ? "rgba(var(--color-green-rgb), 0.15)" : "rgba(var(--color-green-rgb), 0.2)"} var(--color-green)`,
          borderRadius: "12px",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "8px"
        }}>
          <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--color-green)", letterSpacing: "0.05em", textTransform: "uppercase" }}>Human Touch</span>
          <h4 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", margin: 0 }}>Automate the routine. Protect the human moments.</h4>
          <p style={{ fontSize: "14px", color: "var(--color-text-body)", margin: 0, lineHeight: 1.7 }}>
            78% of employees say they still want a human involved in sensitive HR conversations, even when AI handles the admin around them. Automation works best when it clears space for empathy, not replaces it.
          </p>
        </div>
      </div>
    );
  };

  const renderImplementation = () => {
    const isDark = resolvedTheme === "dark";
    const steps = [
      {
        letter: "A",
        title: "Identify process bottlenecks",
        desc: "Find the tasks that are slow, repetitive, or error-prone — these are your highest-value automation targets.",
        icon: Search
      },
      {
        letter: "B",
        title: "Define automation goals",
        desc: "Set measurable targets — reducing time-to-hire, improving compliance, or cutting admin hours by a specific amount.",
        icon: Target
      },
      {
        letter: "C",
        title: "Choose the right HR automation platform",
        desc: "Select software that fits your workflow, team size, and integration needs — particularly payroll, identity, and comms tools.",
        icon: Grid
      },
      {
        letter: "D",
        title: "Train employees and HR teams",
        desc: "Bring users in early so they understand the new workflows before go-live — adoption rates are significantly higher when training precedes rollout.",
        icon: Users
      },
      {
        letter: "E",
        title: "Measure success using KPIs",
        desc: "Track cycle time, task completion rates, error reduction, and time saved — review monthly in the first quarter after launch.",
        icon: BarChart3
      }
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "32px", marginBottom: "32px" }}>
        {steps.map((step, idx) => {
          const StepIcon = step.icon;
          return (
            <div key={idx} style={{
              display: "flex",
              gap: "20px",
              background: isDark ? "var(--color-bg-card-alt)" : "#ffffff",
              border: isDark ? "1px solid var(--color-border)" : "1px solid rgba(15, 23, 42, 0.04)",
              borderRadius: "12px",
              padding: "20px",
              alignItems: "flex-start",
              position: "relative",
              boxShadow: isDark ? "0 10px 30px rgba(0, 0, 0, 0.4)" : "0 10px 30px rgba(15, 23, 42, 0.05)"
            }}>
              <div style={{
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                background: "rgba(var(--color-blue-mid-rgb), 0.1)",
                border: "1px solid rgba(var(--color-blue-mid-rgb), 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--color-blue-mid)",
                fontWeight: 700,
                fontSize: "18px",
                flexShrink: 0
              }}>
                {step.letter}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px", flexGrow: 1 }}>
                <h4 style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-text-bright)", margin: 0 }}>
                  {step.title}
                </h4>
                <p style={{ fontSize: "14px", color: "var(--color-text-muted)", margin: 0, lineHeight: 1.6 }}>
                  {step.desc}
                </p>
              </div>
              <div style={{ color: "var(--color-text-muted)", opacity: 0.3, flexShrink: 0, marginTop: "4px" }}>
                <StepIcon style={{ width: "20px", height: "20px" }} />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderChecklist = () => {
    const isDark = resolvedTheme === "dark";
    const checklistItems = [
      "Workflow automation for approvals, onboarding, and offboarding",
      "Centralised employee records and document management",
      "Candidate tracking and recruitment pipeline tools",
      "Reliable integrations with payroll, accounting, and IT systems",
      "Reporting and analytics for headcount, compliance, and performance",
      "Scalable architecture that supports more workflows as your team grows"
    ];

    return (
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        background: isDark ? "var(--color-bg-card-alt)" : "#ffffff",
        border: isDark ? "1px solid var(--color-border)" : "1px solid rgba(15, 23, 42, 0.04)",
        borderRadius: "16px",
        overflow: "hidden",
        marginTop: "8px",
        marginBottom: "32px",
        boxShadow: isDark ? "0 10px 30px rgba(0, 0, 0, 0.4)" : "0 10px 30px rgba(15, 23, 42, 0.05)"
      }}>
        {/* Left Column Description */}
        <div style={{
          padding: "36px",
          background: isDark ? "rgba(255, 255, 255, 0.02)" : "rgba(15, 23, 42, 0.02)",
          borderRight: "1px solid var(--color-border)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "16px"
        }}>
          <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--color-blue-mid)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
            HR Automation Software Guide
          </span>
          <h4 style={{ fontSize: "20px", fontWeight: 800, color: "var(--color-text-bright)", margin: 0, lineHeight: 1.3 }}>
            What to look for before you commit to an HR platform
          </h4>
          <p style={{ fontSize: "14px", color: "var(--color-text-muted)", margin: 0, lineHeight: 1.6 }}>
            Not all HR automation tools are built the same. The right platform should be easy to use, secure, and scalable — and it needs to handle your core HR workflows without requiring heavy customisation. Before signing up, check how it integrates with your stack.
          </p>
        </div>

        {/* Right Column Checklist */}
        <div style={{ padding: "36px", display: "flex", flexDirection: "column", gap: "20px" }}>
          {checklistItems.map((item, idx) => (
            <div key={idx} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <div style={{
                width: "20px", height: "20px", borderRadius: "50%", background: "rgba(var(--color-blue-mid-rgb), 0.1)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px"
              }}>
                <Check style={{ width: "12px", height: "12px", color: "var(--color-blue-mid)" }} />
              </div>
              <span style={{ fontSize: "14px", color: "var(--color-text-body)", lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderReadiness = () => {
    const isDark = resolvedTheme === "dark";
    const readinessItems = [
      {
        icon: FileText,
        text: "Clean, secure, GDPR-compliant HR data as a single source of truth."
      },
      {
        icon: RefreshCw,
        text: "Connected HR, payroll, and time data (no silos, strong integrations)."
      },
      {
        icon: Shield,
        text: "Trained HR managers and employees who understand how to use AI tools."
      }
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginTop: "40px", marginBottom: "24px", width: "100%" }}>
        <style dangerouslySetInnerHTML={{__html: `
          .hr-readiness-grid {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            gap: 20px;
          }
          @media (min-width: 550px) {
            .hr-readiness-grid {
              grid-template-columns: repeat(3, 1fr);
            }
          }
          .hr-links-grid {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            gap: 20px;
            margin-top: 16px;
            width: 100%;
          }
          @media (min-width: 600px) {
            .hr-links-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          .hr-link-card {
            background: ${isDark ? "rgba(109, 182, 255, 0.02)" : "rgba(0, 128, 255, 0.03)"};
            border: ${isDark ? "1px solid rgba(109, 182, 255, 0.12)" : "1px solid rgba(0, 128, 255, 0.06)"};
            border-radius: 12px;
            padding: 24px;
            text-decoration: none;
            display: flex;
            flex-direction: column;
            gap: 8px;
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            text-align: left;
          }
          .hr-link-card:hover {
            transform: translateY(-3px);
            background: ${isDark ? "rgba(109, 182, 255, 0.06)" : "rgba(0, 128, 255, 0.06)"};
            border-color: var(--color-blue-mid);
            box-shadow: ${isDark ? "0 10px 30px rgba(0, 0, 0, 0.3)" : "0 10px 30px rgba(0, 128, 255, 0.04)"};
          }
          .hr-card-tag {
            font-size: 11px;
            font-weight: 700;
            color: var(--color-blue-mid);
            letter-spacing: 0.05em;
            display: flex;
            align-items: center;
            gap: 6px;
            text-transform: uppercase;
          }
          .hr-card-title {
            font-size: 15px;
            font-weight: 700;
            color: var(--color-text-bright);
            margin: 0;
            line-height: 1.4;
          }
        `}} />
        <h3 style={{
          fontSize: "20px",
          fontWeight: 700,
          color: "var(--color-text-bright)",
          margin: 0,
          textAlign: "center",
          marginBottom: "16px"
        }}>
          How to assess whether your HR systems are ready for AI
        </h3>
        <div className="hr-readiness-grid">
          {readinessItems.map((item, idx) => {
            const ItemIcon = item.icon;
            return (
              <div key={idx} style={{
                background: isDark ? "var(--color-bg-card-alt)" : "#ffffff",
                border: isDark ? "1px solid var(--color-border)" : "1px solid rgba(15, 23, 42, 0.04)",
                borderRadius: "12px",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "16px",
                boxShadow: isDark ? "0 10px 30px rgba(0, 0, 0, 0.4)" : "0 10px 30px rgba(15, 23, 42, 0.05)"
              }}>
                <div style={{
                  width: "44px", height: "44px", borderRadius: "8px",
                  background: "rgba(var(--color-blue-mid-rgb), 0.1)",
                  border: "1px solid rgba(var(--color-blue-mid-rgb), 0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-blue-mid)"
                }}>
                  <ItemIcon style={{ width: "20px", height: "20px" }} />
                </div>
                <span style={{ fontSize: "14px", lineHeight: "1.6", color: "var(--color-text-body)" }}>
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderReadinessDatasheets = () => {
    const isDark = resolvedTheme === "dark";
    const datasheets = [
      {
        tag: "CORE HR AUTOMATION",
        title: "Overview of ScalePods' Core HR workflows",
        desc: "Interactive recruitment pipelines, candidate screening, and compliance checklists."
      },
      {
        tag: "HR WORKFLOW PLAYBOOK",
        title: "Deep dive into automated HR lifecycle management",
        desc: "Step-by-step automation guides for modern HR teams and onboarding flows."
      },
      {
        tag: "THE POWER OF HR AI 2026",
        title: "Efficiency and cost benchmarks for modern HR teams",
        desc: "Return on investment modeling and analytics based on market studies."
      },
      {
        tag: "HR COMPLIANCE BEST PRACTICES",
        title: "Compliance and audit checklist for HR operations",
        desc: "GDPR, regional labor standards, and secure document retention guidelines."
      }
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "48px", marginTop: "32px", marginBottom: "32px" }}>
        {renderReadiness()}

        {/* Resources Grid */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-text-bright)", margin: 0 }}>
            ScalePods HR Datasheets & Resources
          </h3>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px"
          }}>
            {datasheets.map((sheet, idx) => (
              <a
                key={idx}
                href="/global"
                onClick={(e) => { e.preventDefault(); setIsSalesPodRequest(true); setIsAuditModalOpen(true); }}
                style={{
                  background: isDark ? "var(--color-bg-card-alt)" : "#ffffff",
                  border: isDark ? "1px solid var(--color-border)" : "1px solid rgba(15, 23, 42, 0.04)",
                  borderRadius: "12px",
                  padding: "24px",
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  transition: "all 0.25s ease",
                  cursor: "pointer",
                  boxShadow: isDark ? "0 10px 30px rgba(0, 0, 0, 0.4)" : "0 10px 30px rgba(15, 23, 42, 0.05)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = "var(--color-blue-mid)";
                  e.currentTarget.style.boxShadow = isDark ? "0 8px 30px rgba(var(--color-blue-mid-rgb), 0.15)" : "0 15px 35px rgba(15, 23, 42, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.borderColor = isDark ? "var(--color-border)" : "rgba(15, 23, 42, 0.04)";
                  e.currentTarget.style.boxShadow = isDark ? "0 10px 30px rgba(0, 0, 0, 0.4)" : "0 10px 30px rgba(15, 23, 42, 0.05)";
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "10px", fontWeight: 600, color: "var(--color-blue-mid)", letterSpacing: "0.05em" }}>
                    {sheet.tag}
                  </span>
                  <ArrowUpRight style={{ width: "14px", height: "14px", color: "var(--color-text-muted)" }} />
                </div>
                <h4 style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-text-bright)", margin: 0, lineHeight: 1.3 }}>
                  {sheet.title}
                </h4>
                <p style={{ fontSize: "13px", color: "var(--color-text-muted)", margin: 0, lineHeight: 1.5 }}>
                  {sheet.desc}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderFeaturesGrid = () => {
    const items = [
      {
        icon: UserPlus,
        title: "End-to-end recruitment automation",
        desc: "Job postings to offer letters, without manual follow-ups at every stage."
      },
      {
        icon: UserCheck,
        title: "Employee onboarding and lifecycle management",
        desc: "Structured onboarding, role changes, and exits, without paperwork chasing."
      },
      {
        icon: Calendar,
        title: "Attendance, leave and workforce tracking",
        desc: "Real-time attendance and leave data, synced across teams and locations."
      },
      {
        icon: Shield,
        title: "Compliance and documentation management",
        desc: "Policies, records, and audits kept current without last-minute scrambles."
      },
      {
        icon: Bot,
        title: "AI-powered HR workflows",
        desc: "Repetitive HR tasks automated, so your team can focus on people."
      },
      {
        icon: LayoutGrid,
        title: "Unified HR operations dashboard",
        desc: "One view for recruitment, attendance, compliance, and performance data."
      }
    ];

    return (
      <>
        <style dangerouslySetInnerHTML={{__html: `
          .hr-features-grid {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            gap: 40px;
            margin-top: 32px;
            margin-bottom: 40px;
            width: 100%;
          }
          @media (min-width: 640px) {
            .hr-features-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (min-width: 1024px) {
            .hr-features-grid {
              grid-template-columns: repeat(3, 1fr);
            }
          }
        `}} />
        <div className="hr-features-grid">
          {items.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div key={idx} style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "16px"
              }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "rgba(var(--color-blue-mid-rgb), 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--color-blue-mid)",
                  flexShrink: 0
                }}>
                  <IconComponent style={{ width: "22px", height: "22px" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <h4 style={{
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "var(--color-text-bright)",
                    margin: 0,
                    lineHeight: 1.4
                  }}>
                    {item.title}
                  </h4>
                  <p style={{
                    fontSize: "14px",
                    color: "var(--color-text-body)",
                    margin: 0,
                    lineHeight: 1.6
                  }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  const renderMAUseCases = () => {
    const isDark = resolvedTheme === "dark";
    const cases = [
      { icon: Users, title: "B2B Marketing Automation", desc: "B2B buying cycles are long and involve multiple stakeholders. Automation keeps every lead nurtured consistently across a sales cycle that can stretch for months, without anyone falling through the cracks.", color: "var(--color-blue-mid)", colorRgb: "var(--color-blue-mid-rgb)" },
      { icon: Cpu, title: "SaaS Marketing Automation", desc: "SaaS teams use automation to run product-qualified-lead workflows, trigger in-app onboarding sequences, and flag expansion or churn-risk signals the moment usage data indicates them.", color: "var(--color-green-text)", colorRgb: "var(--color-green-rgb)" },
      { icon: Globe, title: "E-Commerce Automation", desc: "From abandoned-cart recovery to post-purchase upsell sequences, automation lets e-commerce brands respond to shopping behavior in real time, at a volume no manual team could match.", color: "var(--color-blue-mid)", colorRgb: "var(--color-blue-mid-rgb)" },
      { icon: LayoutGrid, title: "Enterprise Marketing Ops", desc: "At enterprise scale, automation is less about single campaigns and more about coordinating dozens of teams, regions, and brands on a shared operational system without losing consistency.", color: "var(--color-green-text)", colorRgb: "var(--color-green-rgb)" },
      { icon: Megaphone, title: "Multi-Channel Campaigns", desc: "Automation platforms let a single campaign brief translate into coordinated, channel-appropriate execution across email, social, paid, and SMS without manually rebuilding it five times.", color: "var(--color-blue-mid)", colorRgb: "var(--color-blue-mid-rgb)" },
    ];
    return (
      <div style={{ marginTop: "32px", marginBottom: "32px", display: "flex", flexDirection: "column", gap: "14px", width: "100%" }}>
        {cases.map((c, idx) => {
          const IconComponent = c.icon;
          return (
            <div key={idx} style={{
              background: isDark ? "var(--color-bg-card-alt)" : "#ffffff",
              borderStyle: "solid",
              borderWidth: "1px 1px 1px 4px",
              borderColor: isDark 
                ? `var(--color-border) var(--color-border) var(--color-border) ${c.color}`
                : `rgba(15,23,42,0.06) rgba(15,23,42,0.06) rgba(15,23,42,0.06) ${c.color}`,
              borderRadius: "12px",
              padding: "22px 22px 22px 20px",
              display: "flex",
              gap: "18px",
              alignItems: "flex-start",
              boxShadow: isDark ? "0 4px 20px rgba(0,0,0,0.25)" : "0 4px 20px rgba(15,23,42,0.04)"
            }}>
              <div style={{
                width: "44px",
                height: "44px",
                borderRadius: "10px",
                background: c.colorRgb ? `rgba(var(${c.colorRgb}), 0.12)` : `${c.color}18`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                color: c.color
              }}>
                <IconComponent style={{ width: "22px", height: "22px" }} />
              </div>
              <div>
                <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "5px" }}>{c.title}</div>
                <div style={{ fontSize: "13px", color: "var(--color-text-muted)", lineHeight: 1.6 }}>{c.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderMAAITransform = () => {
    const isDark = resolvedTheme === "dark";
    const aiFeatures = [
      { icon: FileText, title: "AI Content Creation", desc: "AI generates first-draft copy, subject lines, and creative variations at a volume that lets teams test more and iterate faster.", color: "var(--color-blue-mid)", colorRgb: "var(--color-blue-mid-rgb)" },
      { icon: Target, title: "Predictive Lead Scoring", desc: "Instead of static point-based rules, AI models learn from historical conversion data to predict which leads are actually likely to close.", color: "var(--color-green-text)", colorRgb: "var(--color-green-rgb)" },
      { icon: Zap, title: "AI Campaign Optimization", desc: "AI systems adjust send times, channel mix, and creative selection mid-campaign based on real-time performance data.", color: "var(--color-blue-mid)", colorRgb: "var(--color-blue-mid-rgb)" },
      { icon: Activity, title: "Behavior Prediction", desc: "By analyzing patterns across the full customer journey, AI can flag purchase intent, churn risk, or expansion opportunity before they'd be obvious.", color: "var(--color-green-text)", colorRgb: "var(--color-green-rgb)" },
      { icon: Bot, title: "Autonomous Marketing Agents", desc: "The newest generation of tools can plan and execute entire campaign workflows with minimal setup — defining audience, drafting creative, and scheduling.", color: "var(--color-blue-mid)", colorRgb: "var(--color-blue-mid-rgb)" },
      { icon: Award, title: "AI-Driven Personalization", desc: "AI enables true 1:1 personalization at scale — dynamically adjusting messaging, offers, and content for each individual based on behavior.", color: "var(--color-green-text)", colorRgb: "var(--color-green-rgb)" },
    ];
    return (
      <div style={{ marginTop: "32px", marginBottom: "32px", width: "100%" }}>
        <style dangerouslySetInnerHTML={{ __html: `
          .ma-ai-grid {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            gap: 20px;
            width: 100%;
          }
          @media (min-width: 640px) {
            .ma-ai-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (min-width: 1024px) {
            .ma-ai-grid {
              grid-template-columns: repeat(3, 1fr);
            }
          }
        ` }} />
        <div className="ma-ai-grid">
          {aiFeatures.map((f, idx) => {
            const IconComponent = f.icon;
            return (
              <div key={idx} style={{
                background: isDark ? "var(--color-bg-card-alt)" : "#ffffff",
                borderWidth: "3px 1px 1px 1px",
                borderStyle: "solid",
                borderColor: `${f.color} ${isDark ? "var(--color-border)" : "rgba(15,23,42,0.06)"} ${isDark ? "var(--color-border)" : "rgba(15,23,42,0.06)"} ${isDark ? "var(--color-border)" : "rgba(15,23,42,0.06)"}`,
                borderRadius: "12px",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                boxShadow: isDark ? "0 4px 20px rgba(0,0,0,0.25)" : "0 4px 20px rgba(15,23,42,0.04)"
              }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: f.colorRgb ? `rgba(var(${f.colorRgb}), 0.12)` : `${f.color}18`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: f.color
                }}>
                  <IconComponent style={{ width: "20px", height: "20px" }} />
                </div>
                <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-text-bright)" }}>{f.title}</div>
                <div style={{ fontSize: "13px", color: "var(--color-text-muted)", lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderMAChallenges = () => {
    const isDark = resolvedTheme === "dark";
    const challenges = [
      { label: "Tool Fragmentation", stat: "78%", detail: "report siloed marketing tech", pct: 78, color: "var(--color-blue-mid)" },
      { label: "Attribution Accuracy Gap", stat: "68%", detail: "don't achieve accurate ROI measurement, despite feeling confident", pct: 68, color: "var(--color-green-text)" },
      { label: "AI Trust Erosion", stat: "62%", detail: "trust content less once they know it's AI-generated", pct: 62, color: "var(--color-blue-mid)" },
      { label: "Poor Data Quality", stat: "45%", detail: "of marketing data is incomplete or outdated", pct: 45, color: "var(--color-green-text)" },
      { label: "Lack of Strategy", stat: "20%", detail: "cite data-driven strategy as a top challenge", pct: 20, color: "var(--color-blue-mid)" },
    ];
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "32px", marginBottom: "32px", width: "100%" }}>
        {challenges.map((c, idx) => (
          <div key={idx} style={{
            background: isDark ? "var(--color-bg-card-alt)" : "#ffffff",
            border: isDark ? "1px solid var(--color-border)" : "1px solid rgba(15,23,42,0.06)",
            borderRadius: "12px",
            padding: "18px 20px",
            boxShadow: isDark ? "0 4px 16px rgba(0,0,0,0.2)" : "0 4px 16px rgba(15,23,42,0.04)"
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
              <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-text-bright)" }}>{c.label}</span>
              <span style={{ fontSize: "18px", fontWeight: 800, color: c.color }}>{c.stat}</span>
            </div>
            <div style={{ width: "100%", height: "6px", background: isDark ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.06)", borderRadius: "99px", overflow: "hidden" }}>
              <div style={{ width: `${c.pct}%`, height: "100%", background: c.color, borderRadius: "99px" }} />
            </div>
            <div style={{ fontSize: "12px", color: "var(--color-text-muted)", marginTop: "6px" }}>{c.stat} {c.detail}</div>
          </div>
        ))}
      </div>
    );
  };

  const renderMATrends = () => {
    const isDark = resolvedTheme === "dark";
    const trends = [
      { icon: Bot, title: "Agentic Marketing", desc: "Marketing platforms are moving from executing predefined workflows to running semi-autonomous agents that plan campaigns, generate creative, and adjust strategy with limited human input.", color: "var(--color-blue-mid)", colorRgb: "var(--color-blue-mid-rgb)" },
      { icon: Award, title: "Hyper-Personalization", desc: "Personalization is moving past 'first name and company' tokens into fully individualized messaging, offers, and content sequencing generated dynamically for each contact.", color: "var(--color-green-text)", colorRgb: "var(--color-green-rgb)" },
      { icon: TrendingUp, title: "Predictive Customer Journeys", desc: "Rather than reacting to what a customer just did, platforms increasingly anticipate what they're likely to do next — surfacing the right message before the customer has even signaled clear intent.", color: "var(--color-blue-mid)", colorRgb: "var(--color-blue-mid-rgb)" },
      { icon: Cpu, title: "AI Campaign Management", desc: "End-to-end campaign management is consolidating into AI-managed workflows that require setup and oversight rather than manual execution at every stage.", color: "var(--color-green-text)", colorRgb: "var(--color-green-rgb)" },
      { icon: Zap, title: "Autonomous Growth Systems", desc: "Fully autonomous systems that manage acquisition, nurture, and retention as one connected growth engine, with marketers setting strategic guardrails rather than building campaigns by hand.", color: "var(--color-blue-mid)", colorRgb: "var(--color-blue-mid-rgb)" },
    ];
    return (
      <div style={{ marginTop: "32px", marginBottom: "32px", width: "100%" }}>
        <style dangerouslySetInnerHTML={{ __html: `
          .ma-trends-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            width: 100%;
            justify-content: center;
          }
          .ma-trends-card {
            width: 100%;
            display: flex;
            flex-direction: column;
          }
          @media (min-width: 640px) {
            .ma-trends-card {
              width: calc(50% - 10px);
            }
          }
          @media (min-width: 1024px) {
            .ma-trends-card {
              width: calc(33.333% - 13.334px);
            }
          }
        ` }} />
        <div className="ma-trends-grid">
          {trends.map((t, idx) => {
            const IconComponent = t.icon;
            return (
              <div key={idx} className="ma-trends-card" style={{
                background: isDark ? "var(--color-bg-card-alt)" : "#ffffff",
                border: isDark ? "1px solid var(--color-border)" : "1px solid rgba(15,23,42,0.06)",
                borderRadius: "14px",
                padding: "26px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                boxShadow: isDark ? "0 8px 24px rgba(0,0,0,0.25)" : "0 8px 24px rgba(15,23,42,0.05)"
              }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: t.colorRgb ? `rgba(var(${t.colorRgb}), 0.12)` : `${t.color}18`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: t.color
                }}>
                  <IconComponent style={{ width: "24px", height: "24px" }} />
                </div>
                <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-text-bright)" }}>{t.title}</div>
                <div style={{ fontSize: "13px", color: "var(--color-text-muted)", lineHeight: 1.6 }}>{t.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderMAFeaturesGrid = () => {
    const isDark = resolvedTheme === "dark";
    const features = [
      { icon: LayoutGrid, title: "Campaign Management", desc: "Plan, schedule, and launch every campaign from one workspace." },
      { icon: FileText, title: "Content Automation", desc: "First-draft copy and channel formatting, generated automatically." },
      { icon: Filter, title: "Lead Generation Workflows", desc: "Leads captured, scored, and routed in real time." },
      { icon: Globe, title: "Multi-Channel Execution", desc: "One campaign brief, deployed everywhere at once." },
      { icon: Bot, title: "AI-Powered Operations", desc: "Send times and targeting optimized automatically." },
      { icon: BarChart3, title: "Analytics & Insights", desc: "Every channel reporting into one live dashboard." },
    ];
    return (
      <div style={{ marginTop: "32px", marginBottom: "32px", width: "100%" }}>
        <style dangerouslySetInnerHTML={{ __html: `
          .ma-features-grid {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            gap: 16px;
            width: 100%;
          }
          @media (min-width: 640px) {
            .ma-features-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (min-width: 1024px) {
            .ma-features-grid {
              grid-template-columns: repeat(3, 1fr);
            }
          }
        ` }} />
        <div className="ma-features-grid">
          {features.map((f, idx) => {
            const IconComponent = f.icon;
            return (
              <div key={idx} style={{
                background: isDark ? "var(--color-bg-card-alt)" : "#ffffff",
                border: isDark ? "1px solid var(--color-border)" : "1px solid rgba(15,23,42,0.06)",
                borderRadius: "12px",
                padding: "18px",
                display: "flex",
                gap: "14px",
                alignItems: "flex-start",
                boxShadow: isDark ? "0 4px 16px rgba(0,0,0,0.2)" : "0 4px 16px rgba(15,23,42,0.04)"
              }}>
                <div style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  background: "rgba(var(--color-blue-mid-rgb), 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  color: "var(--color-blue-mid)"
                }}>
                  <IconComponent style={{ width: "20px", height: "20px" }} />
                </div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "4px" }}>{f.title}</div>
                  <div style={{ fontSize: "12px", color: "var(--color-text-muted)", lineHeight: 1.5 }}>{f.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderHRProcessesGrid = () => {
    const isDark = resolvedTheme === "dark";
    const processes = [
      { number: "01", icon: Search, title: "Recruitment & Screening", desc: "Filter applications and shortlist candidates based on preset criteria automatically.", color: "var(--color-blue-mid)", colorRgb: "var(--color-blue-mid-rgb)" },
      { number: "02", icon: Calendar, title: "Interview Scheduling", desc: "Remove back-and-forth communication and speed up scheduling.", color: "var(--color-green-text)", colorRgb: "var(--color-green-rgb)" },
      { number: "03", icon: UserPlus, title: "Employee Onboarding", desc: "Assign tasks, collect documents, and send welcome messages.", color: "var(--color-blue-mid)", colorRgb: "var(--color-blue-mid-rgb)" },
      { number: "04", icon: Activity, title: "Attendance Tracking", desc: "Record presence and work hours with minimal manual overhead.", color: "var(--color-green-text)", colorRgb: "var(--color-green-rgb)" },
      { number: "05", icon: FileText, title: "Leave Management", desc: "Handle requests, approvals, and team visibility in one workflow.", color: "var(--color-blue-mid)", colorRgb: "var(--color-blue-mid-rgb)" },
      { number: "06", icon: BarChart3, title: "Payroll Processing", desc: "Sync employee, attendance, and leave data to reduce errors.", color: "var(--color-green-text)", colorRgb: "var(--color-green-rgb)" },
      { number: "07", icon: TrendingUp, title: "Performance Reviews", desc: "Schedule reviews, send reminders, and collect feedback on time.", color: "var(--color-blue-mid)", colorRgb: "var(--color-blue-mid-rgb)" },
      { number: "08", icon: Lock, title: "Document Management", desc: "Store contracts, forms, and policies in one secure central place.", color: "var(--color-green-text)", colorRgb: "var(--color-green-rgb)" },
      { number: "09", icon: Shield, title: "Compliance Tracking", desc: "Track deadlines, policy acknowledgments, and required records.", color: "var(--color-blue-mid)", colorRgb: "var(--color-blue-mid-rgb)" },
      { number: "10", icon: X, title: "Employee Offboarding", desc: "Manage final checklists, access removal, and exit paperwork.", color: "var(--color-green-text)", colorRgb: "var(--color-green-rgb)" }
    ];

    return (
      <div style={{ marginTop: "32px", marginBottom: "32px", width: "100%" }}>
        <style dangerouslySetInnerHTML={{ __html: `
          .hr-proc-grid {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            gap: 16px;
            width: 100%;
          }
          @media (min-width: 640px) {
            .hr-proc-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (min-width: 1024px) {
            .hr-proc-grid {
              grid-template-columns: repeat(5, 1fr);
            }
          }
          .hr-proc-card {
            background: ${isDark ? "var(--color-bg-card-alt)" : "#ffffff"};
            border: ${isDark ? "1px solid var(--color-border)" : "1px solid rgba(15,23,42,0.06)"};
            border-radius: 16px;
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            position: relative;
            overflow: hidden;
            box-shadow: ${isDark ? "0 4px 20px rgba(0,0,0,0.2)" : "0 4px 20px rgba(15,23,42,0.02)"};
          }
          .hr-proc-card:hover {
            transform: translateY(-4px);
            border-color: var(--hover-color);
            box-shadow: 0 12px 30px rgba(var(--hover-color-rgb), 0.12);
          }
          .hr-proc-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, var(--hover-color), transparent);
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          .hr-proc-card:hover::before {
            opacity: 1;
          }
          .hr-proc-card-num {
            position: absolute;
            top: 14px;
            right: 18px;
            font-size: 11px;
            font-weight: 800;
            letter-spacing: 0.05em;
            opacity: 0.15;
            color: var(--color-text-muted);
          }
          .hr-proc-icon-wrap {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
          }
        ` }} />
        <div className="hr-proc-grid">
          {processes.map((p, idx) => {
            const IconComponent = p.icon;
            return (
              <div
                key={idx}
                className="hr-proc-card"
                style={{
                  "--hover-color": p.color,
                  "--hover-color-rgb": p.colorRgb ? `var(${p.colorRgb})` : "13, 148, 136"
                } as React.CSSProperties}
              >
                <div className="hr-proc-card-num">{p.number}</div>
                <div
                  className="hr-proc-icon-wrap"
                  style={{
                    background: p.colorRgb ? `rgba(var(${p.colorRgb}), 0.1)` : `${p.color}15`,
                    color: p.color
                  }}
                >
                  <IconComponent size={20} />
                </div>
                <h4 style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "var(--color-text-bright)",
                  margin: 0,
                  lineHeight: 1.3
                }}>
                  {p.title}
                </h4>
                <p style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "12px",
                  color: "var(--color-text-muted)",
                  margin: 0,
                  lineHeight: 1.5
                }}>
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderHRBenefitsStats = () => {
    const isDark = resolvedTheme === "dark";
    const stats = [
      { value: "10×", label: "Faster Candidate Screening", color: "var(--color-blue-mid)", colorRgb: "var(--color-blue-mid-rgb)" },
      { value: "80%", label: "Less Manual Coordination", color: "var(--color-green-text)", colorRgb: "var(--color-green-rgb)" },
      { value: "5 hrs", label: "Saved Per Recruiter / Week", color: "var(--color-blue-mid)", colorRgb: "var(--color-blue-mid-rgb)" }
    ];

    return (
      <div style={{ marginTop: "24px", marginBottom: "32px", width: "100%" }}>
        <style dangerouslySetInnerHTML={{ __html: `
          .hr-stats-grid {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            gap: 20px;
            width: 100%;
          }
          @media (min-width: 768px) {
            .hr-stats-grid {
              grid-template-columns: repeat(3, 1fr);
            }
          }
          .hr-stat-card {
            background: ${isDark ? "rgba(255, 255, 255, 0.02)" : "rgba(15, 23, 42, 0.01)"};
            border: ${isDark ? "1px solid var(--color-border)" : "1px solid rgba(15,23,42,0.08)"};
            border-radius: 16px;
            padding: 28px 24px;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 8px;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: ${isDark ? "0 4px 30px rgba(0,0,0,0.2)" : "0 4px 30px rgba(15,23,42,0.02)"};
          }
          .hr-stat-card:hover {
            transform: translateY(-4px);
            border-color: var(--hover-color);
            box-shadow: 0 12px 30px rgba(var(--hover-color-rgb), 0.12);
            background: ${isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(15, 23, 42, 0.02)"};
          }
          .hr-stat-val {
            font-family: var(--font-inter), sans-serif;
            font-size: clamp(36px, 3.5vw, 44px);
            font-weight: 800;
            line-height: 1.1;
            letter-spacing: -0.02em;
          }
          .hr-stat-label {
            font-family: var(--font-inter), sans-serif;
            font-size: 14px;
            font-weight: 600;
            color: var(--color-text-muted);
            line-height: 1.4;
          }
        ` }} />
        <div className="hr-stats-grid">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="hr-stat-card"
              style={{
                "--hover-color": s.color,
                "--hover-color-rgb": s.colorRgb ? `var(${s.colorRgb})` : "13, 148, 136"
              } as React.CSSProperties}
            >
              <div className="hr-stat-val" style={{ color: s.color }}>
                {s.value}
              </div>
              <div className="hr-stat-label">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderMABenefitsStats = () => {
    const isDark = resolvedTheme === "dark";
    const stats = [
      { value: "10×", label: "Faster Content Production", color: "var(--color-blue-mid)", colorRgb: "var(--color-blue-mid-rgb)" },
      { value: "80%", label: "Less Manual Coordination", color: "var(--color-green-text)", colorRgb: "var(--color-green-rgb)" },
      { value: "40%", label: "Team Efficiency Improved", color: "var(--color-blue-mid)", colorRgb: "var(--color-blue-mid-rgb)" }
    ];

    return (
      <div style={{ marginTop: "24px", marginBottom: "32px", width: "100%" }}>
        <style dangerouslySetInnerHTML={{ __html: `
          .ma-stats-grid {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            gap: 20px;
            width: 100%;
          }
          @media (min-width: 768px) {
            .ma-stats-grid {
              grid-template-columns: repeat(3, 1fr);
            }
          }
          .ma-stat-card {
            background: ${isDark ? "rgba(255, 255, 255, 0.02)" : "rgba(15, 23, 42, 0.01)"};
            border: ${isDark ? "1px solid var(--color-border)" : "1px solid rgba(15,23,42,0.08)"};
            border-radius: 16px;
            padding: 28px 24px;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 8px;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: ${isDark ? "0 4px 30px rgba(0,0,0,0.2)" : "0 4px 30px rgba(15,23,42,0.02)"};
          }
          .ma-stat-card:hover {
            transform: translateY(-4px);
            border-color: var(--hover-color);
            box-shadow: 0 12px 30px rgba(var(--hover-color-rgb), 0.12);
            background: ${isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(15, 23, 42, 0.02)"};
          }
          .ma-stat-val {
            font-family: var(--font-inter), sans-serif;
            font-size: clamp(36px, 3.5vw, 44px);
            font-weight: 800;
            line-height: 1.1;
            letter-spacing: -0.02em;
          }
          .ma-stat-label {
            font-family: var(--font-inter), sans-serif;
            font-size: 14px;
            font-weight: 600;
            color: var(--color-text-muted);
            line-height: 1.4;
          }
        ` }} />
        <div className="ma-stats-grid">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="ma-stat-card"
              style={{
                "--hover-color": s.color,
                "--hover-color-rgb": s.colorRgb ? `var(${s.colorRgb})` : "13, 148, 136"
              } as React.CSSProperties}
            >
              <div className="ma-stat-val" style={{ color: s.color }}>
                {s.value}
              </div>
              <div className="ma-stat-label">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderMaProcessesGrid = () => {
    const isDark = resolvedTheme === "dark";
    const processes = [
      { number: "01", icon: Target, title: "Lead Capture", desc: "Automatically pull form submissions, chat interactions, and landing page conversions directly into your CRM.", color: "var(--color-blue-mid)", colorRgb: "var(--color-blue-mid-rgb)" },
      { number: "02", icon: Filter, title: "Lead Qualification", desc: "Score leads automatically based on firmographic fit and behavioral signals to prioritize high-value prospects.", color: "var(--color-green-text)", colorRgb: "var(--color-green-rgb)" },
      { number: "03", icon: Mail, title: "Email Marketing", desc: "Build automated welcome series, re-engagement, and announcements with behavioral send-time optimization.", color: "var(--color-blue-mid)", colorRgb: "var(--color-blue-mid-rgb)" },
      { number: "04", icon: Users, title: "Lead Nurturing", desc: "Move prospects through the funnel automatically with relevant content adjusted to their active engagement.", color: "var(--color-green-text)", colorRgb: "var(--color-green-rgb)" },
      { number: "05", icon: LayoutGrid, title: "Customer Segmentation", desc: "Group contacts dynamically based on real-time behavior and attributes instead of static lists.", color: "var(--color-blue-mid)", colorRgb: "var(--color-blue-mid-rgb)" },
      { number: "06", icon: Megaphone, title: "Social Media Publishing", desc: "Schedule and publish across every social channel from one centralized, automated workflow.", color: "var(--color-green-text)", colorRgb: "var(--color-green-rgb)" },
      { number: "07", icon: Globe, title: "Content Distribution", desc: "Automatically syndicate and deliver new content to the right segments based on topic and interest profile.", color: "var(--color-blue-mid)", colorRgb: "var(--color-blue-mid-rgb)" },
      { number: "08", icon: TrendingUp, title: "Ad Campaign Management", desc: "Automate bid adjustments, budget pacing, and audience targeting to optimize ROI in real time.", color: "var(--color-green-text)", colorRgb: "var(--color-green-rgb)" },
      { number: "09", icon: BarChart3, title: "Campaign Reporting", desc: "Generate multi-channel performance reports automatically, eliminating manual weekly collation.", color: "var(--color-blue-mid)", colorRgb: "var(--color-blue-mid-rgb)" },
      { number: "10", icon: MapPin, title: "Customer Journey Tracking", desc: "Map every single touchpoint across web, email, and sales interactions to trace paths to conversion.", color: "var(--color-green-text)", colorRgb: "var(--color-green-rgb)" },
      { number: "11", icon: Shield, title: "Marketing Attribution", desc: "Attribute revenue back to specific campaigns across multi-touch buyer paths with absolute accuracy.", color: "var(--color-blue-mid)", colorRgb: "var(--color-blue-mid-rgb)" },
      { number: "12", icon: PieChart, title: "Performance Analytics", desc: "Continuously surface active channel trends and ROI insights to make data-driven marketing investments.", color: "var(--color-green-text)", colorRgb: "var(--color-green-rgb)" }
    ];

    return (
      <div style={{ marginTop: "32px", marginBottom: "32px", width: "100%" }}>
        <style dangerouslySetInnerHTML={{ __html: `
          .ma-proc-grid {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            gap: 16px;
            width: 100%;
          }
          @media (min-width: 640px) {
            .ma-proc-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (min-width: 1024px) {
            .ma-proc-grid {
              grid-template-columns: repeat(4, 1fr);
            }
          }
          .ma-proc-card {
            background: ${isDark ? "var(--color-bg-card-alt)" : "#ffffff"};
            border: ${isDark ? "1px solid var(--color-border)" : "1px solid rgba(15,23,42,0.06)"};
            border-radius: 16px;
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            position: relative;
            overflow: hidden;
            box-shadow: ${isDark ? "0 4px 20px rgba(0,0,0,0.2)" : "0 4px 20px rgba(15,23,42,0.02)"};
          }
          .ma-proc-card:hover {
            transform: translateY(-4px);
            border-color: var(--hover-color);
            box-shadow: 0 12px 30px rgba(var(--hover-color-rgb), 0.12);
          }
          .ma-proc-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, var(--hover-color), transparent);
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          .ma-proc-card:hover::before {
            opacity: 1;
          }
          .ma-proc-card-num {
            position: absolute;
            top: 14px;
            right: 18px;
            font-size: 11px;
            font-weight: 800;
            letter-spacing: 0.05em;
            opacity: 0.15;
            color: var(--color-text-muted);
          }
          .ma-proc-icon-wrap {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
          }
        ` }} />
        <div className="ma-proc-grid">
          {processes.map((p, idx) => {
            const IconComponent = p.icon;
            return (
              <div
                key={idx}
                className="ma-proc-card"
                style={{
                  "--hover-color": p.color,
                  "--hover-color-rgb": p.colorRgb ? `var(${p.colorRgb})` : "13, 148, 136"
                } as React.CSSProperties}
              >
                <div className="ma-proc-card-num">{p.number}</div>
                <div
                  className="ma-proc-icon-wrap"
                  style={{
                    background: p.colorRgb ? `rgba(var(${p.colorRgb}), 0.1)` : `${p.color}15`,
                    color: p.color
                  }}
                >
                  <IconComponent size={20} />
                </div>
                <h4 style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "var(--color-text-bright)",
                  margin: 0,
                  lineHeight: 1.3
                }}>
                  {p.title}
                </h4>
                <p style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "12px",
                  color: "var(--color-text-muted)",
                  margin: 0,
                  lineHeight: 1.5
                }}>
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderHrBenefitsStats = () => {
    const isDark = resolvedTheme === "dark";
    const stats = [
      { value: "10x", label: "Faster Candidate Screening" },
      { value: "80%", label: "Less Manual Coordination" },
      { value: "5 hrs", label: "Saved Per Recruiter / Week" }
    ];

    return (
      <div style={{ marginTop: "24px", marginBottom: "32px", width: "100%" }}>
        <style dangerouslySetInnerHTML={{ __html: `
          .hr-stats-container {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            border-radius: 12px;
            overflow: hidden;
            background: ${isDark ? "var(--color-bg-card-alt)" : "rgba(37, 99, 235, 0.04)"};
            border: 1px solid ${isDark ? "var(--color-border)" : "rgba(37, 99, 235, 0.15)"};
          }
          @media (min-width: 640px) {
            .hr-stats-container {
              grid-template-columns: repeat(3, 1fr);
            }
          }
          .hr-stat-item {
            padding: 24px 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            gap: 8px;
            border-bottom: 1px solid ${isDark ? "var(--color-border)" : "rgba(37, 99, 235, 0.15)"};
          }
          .hr-stat-item:last-child {
            border-bottom: none;
          }
          @media (min-width: 640px) {
            .hr-stat-item {
              border-bottom: none;
              border-right: 1px solid ${isDark ? "var(--color-border)" : "rgba(37, 99, 235, 0.15)"};
            }
            .hr-stat-item:last-child {
              border-right: none;
            }
          }
          .hr-stat-val {
            font-family: var(--font-inter), sans-serif;
            font-size: 38px;
            font-weight: 800;
            color: ${isDark ? "var(--color-blue-bright)" : "var(--color-blue-mid)"};
            line-height: 1;
            letter-spacing: -0.02em;
          }
          .hr-stat-lbl {
            font-family: var(--font-inter), sans-serif;
            font-size: 13px;
            font-weight: 600;
            color: var(--color-text-muted);
            line-height: 1.4;
          }
        ` }} />
        <div className="hr-stats-container">
          {stats.map((s, idx) => (
            <div key={idx} className="hr-stat-item">
              <div className="hr-stat-val">{s.value}</div>
              <div className="hr-stat-lbl">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };


  const renderHrCtaLanding = () => {
    const isDark = resolvedTheme === "dark";
    return (
      <div style={{ marginTop: "24px", marginBottom: "32px", width: "100%" }}>
        <style dangerouslySetInnerHTML={{ __html: `
          .creative-cta-card {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: ${isDark ? "var(--color-bg-card-alt)" : "#ffffff"};
            border: ${isDark ? "1px solid var(--color-border)" : "1px solid rgba(15, 23, 42, 0.06)"};
            border-left: 4px solid var(--color-blue-mid);
            border-radius: 12px;
            padding: 24px 28px;
            text-decoration: none;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            cursor: pointer;
            position: relative;
            overflow: hidden;
            box-shadow: ${isDark ? "0 4px 20px rgba(0, 0, 0, 0.15)" : "0 4px 20px rgba(15, 23, 42, 0.02)"};
          }
          .creative-cta-card:hover {
            transform: translateY(-4px);
            border-left-color: var(--color-blue-bright);
            box-shadow: ${isDark ? "0 12px 30px rgba(0, 0, 0, 0.3)" : "0 12px 30px rgba(15, 23, 42, 0.06)"};
          }
          .creative-cta-content {
            display: flex;
            flex-direction: column;
            gap: 6px;
            flex: 1;
            padding-right: 20px;
          }
          .creative-cta-tag {
            font-family: var(--font-inter), sans-serif;
            font-size: 11px;
            font-weight: 700;
            color: var(--color-blue-mid);
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }
          .creative-cta-title {
            font-family: var(--font-inter), sans-serif;
            font-size: 18px;
            font-weight: 800;
            color: var(--color-text-bright);
            margin: 0;
            line-height: 1.3;
          }
          .creative-cta-desc {
            font-family: var(--font-inter), sans-serif;
            font-size: 13px;
            color: var(--color-text-muted);
            margin: 2px 0 0 0;
            line-height: 1.5;
          }
          .creative-cta-action {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: ${isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(15, 23, 42, 0.03)"};
            border: 1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(15, 23, 42, 0.06)"};
            color: var(--color-text-bright);
            transition: all 0.3s ease;
            flex-shrink: 0;
          }
          .creative-cta-card:hover .creative-cta-action {
            background: var(--color-blue-mid);
            border-color: var(--color-blue-mid);
            color: #ffffff;
            transform: scale(1.05);
          }
          @media (max-width: 500px) {
            .creative-cta-card {
              flex-direction: column;
              align-items: flex-start;
              gap: 16px;
              padding: 20px;
            }
            .creative-cta-action {
              align-self: flex-end;
            }
          }
        ` }} />
        <a href="/solution/hr-workflow-automation" className="creative-cta-card">
          <div className="creative-cta-content">
            <div className="creative-cta-tag">HR WORKFLOW SOLUTION →</div>
            <h4 className="creative-cta-title">Explore AI powered HR solutions</h4>
            <p className="creative-cta-desc">Explore how ScalePods integrates candidate screening, employee onboarding, leave management, and payroll into a seamless system.</p>
          </div>
          <div className="creative-cta-action">
            <ArrowUpRight size={20} />
          </div>
        </a>
      </div>
    );
  };

  const renderHrCtaDatasheet = () => {
    const isDark = resolvedTheme === "dark";
    return (
      <div style={{ marginTop: "24px", marginBottom: "32px", width: "100%" }}>
        <style dangerouslySetInnerHTML={{ __html: `
          .creative-cta-card {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: ${isDark ? "var(--color-bg-card-alt)" : "#ffffff"};
            border: ${isDark ? "1px solid var(--color-border)" : "1px solid rgba(15, 23, 42, 0.06)"};
            border-left: 4px solid var(--color-blue-mid);
            border-radius: 12px;
            padding: 24px 28px;
            text-decoration: none;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            cursor: pointer;
            position: relative;
            overflow: hidden;
            box-shadow: ${isDark ? "0 4px 20px rgba(0, 0, 0, 0.15)" : "0 4px 20px rgba(15, 23, 42, 0.02)"};
          }
          .creative-cta-card:hover {
            transform: translateY(-4px);
            border-left-color: var(--color-blue-bright);
            box-shadow: ${isDark ? "0 12px 30px rgba(0, 0, 0, 0.3)" : "0 12px 30px rgba(15, 23, 42, 0.06)"};
          }
          .creative-cta-content {
            display: flex;
            flex-direction: column;
            gap: 6px;
            flex: 1;
            padding-right: 20px;
          }
          .creative-cta-tag {
            font-family: var(--font-inter), sans-serif;
            font-size: 11px;
            font-weight: 700;
            color: var(--color-blue-mid);
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }
          .creative-cta-title {
            font-family: var(--font-inter), sans-serif;
            font-size: 18px;
            font-weight: 800;
            color: var(--color-text-bright);
            margin: 0;
            line-height: 1.3;
          }
          .creative-cta-desc {
            font-family: var(--font-inter), sans-serif;
            font-size: 13px;
            color: var(--color-text-muted);
            margin: 2px 0 0 0;
            line-height: 1.5;
          }
          .creative-cta-action {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: ${isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(15, 23, 42, 0.03)"};
            border: 1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(15, 23, 42, 0.06)"};
            color: var(--color-text-bright);
            transition: all 0.3s ease;
            flex-shrink: 0;
          }
          .creative-cta-card:hover .creative-cta-action {
            background: var(--color-blue-mid);
            border-color: var(--color-blue-mid);
            color: #ffffff;
            transform: scale(1.05);
          }
          @media (max-width: 500px) {
            .creative-cta-card {
              flex-direction: column;
              align-items: flex-start;
              gap: 16px;
              padding: 20px;
            }
            .creative-cta-action {
              align-self: flex-end;
            }
          }
        ` }} />
        <div 
          onClick={(e) => {
            e.preventDefault();
            setIsSalesPodRequest(true);
            setIsAuditModalOpen(true);
          }} 
          className="creative-cta-card"
        >
          <div className="creative-cta-content">
            <div className="creative-cta-tag">HR RESOURCES & DATASHEETS →</div>
            <h4 className="creative-cta-title">List ScalePods HR Datasheets</h4>
            <p className="creative-cta-desc">Get instant access to our comprehensive HR workflow blueprints, automation readiness checklists, and resource calculators.</p>
          </div>
          <div className="creative-cta-action">
            <ArrowUpRight size={20} />
          </div>
        </div>
      </div>
    );
  };

  const renderMaCtaLanding = () => {
    const isDark = resolvedTheme === "dark";
    return (
      <div style={{ marginTop: "24px", marginBottom: "32px", width: "100%" }}>
        <style dangerouslySetInnerHTML={{ __html: `
          .creative-cta-card {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: ${isDark ? "var(--color-bg-card-alt)" : "#ffffff"};
            border: ${isDark ? "1px solid var(--color-border)" : "1px solid rgba(15, 23, 42, 0.06)"};
            border-left: 4px solid var(--color-blue-mid);
            border-radius: 12px;
            padding: 24px 28px;
            text-decoration: none;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            cursor: pointer;
            position: relative;
            overflow: hidden;
            box-shadow: ${isDark ? "0 4px 20px rgba(0, 0, 0, 0.15)" : "0 4px 20px rgba(15, 23, 42, 0.02)"};
          }
          .creative-cta-card:hover {
            transform: translateY(-4px);
            border-left-color: var(--color-blue-bright);
            box-shadow: ${isDark ? "0 12px 30px rgba(0, 0, 0, 0.3)" : "0 12px 30px rgba(15, 23, 42, 0.06)"};
          }
          .creative-cta-content {
            display: flex;
            flex-direction: column;
            gap: 6px;
            flex: 1;
            padding-right: 20px;
          }
          .creative-cta-tag {
            font-family: var(--font-inter), sans-serif;
            font-size: 11px;
            font-weight: 700;
            color: var(--color-blue-mid);
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }
          .creative-cta-title {
            font-family: var(--font-inter), sans-serif;
            font-size: 18px;
            font-weight: 800;
            color: var(--color-text-bright);
            margin: 0;
            line-height: 1.3;
          }
          .creative-cta-desc {
            font-family: var(--font-inter), sans-serif;
            font-size: 13px;
            color: var(--color-text-muted);
            margin: 2px 0 0 0;
            line-height: 1.5;
          }
          .creative-cta-action {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: ${isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(15, 23, 42, 0.03)"};
            border: 1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(15, 23, 42, 0.06)"};
            color: var(--color-text-bright);
            transition: all 0.3s ease;
            flex-shrink: 0;
          }
          .creative-cta-card:hover .creative-cta-action {
            background: var(--color-blue-mid);
            border-color: var(--color-blue-mid);
            color: #ffffff;
            transform: scale(1.05);
          }
          @media (max-width: 500px) {
            .creative-cta-card {
              flex-direction: column;
              align-items: flex-start;
              gap: 16px;
              padding: 20px;
            }
            .creative-cta-action {
              align-self: flex-end;
            }
          }
        ` }} />
        <a href="/solution/marketing-workflow-automation" className="creative-cta-card">
          <div className="creative-cta-content">
            <div className="creative-cta-tag">MARKETING WORKFLOW SOLUTION →</div>
            <h4 className="creative-cta-title">Explore AI powered Marketing solutions</h4>
            <p className="creative-cta-desc">Learn how ScalePods automates lead capture, qualification, email campaigns, and behavior-triggered customer journeys.</p>
          </div>
          <div className="creative-cta-action">
            <ArrowUpRight size={20} />
          </div>
        </a>
      </div>
    );
  };

  const renderMaCtaDatasheet = () => {
    const isDark = resolvedTheme === "dark";
    return (
      <div style={{ marginTop: "24px", marginBottom: "32px", width: "100%" }}>
        <style dangerouslySetInnerHTML={{ __html: `
          .creative-cta-card {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: ${isDark ? "var(--color-bg-card-alt)" : "#ffffff"};
            border: ${isDark ? "1px solid var(--color-border)" : "1px solid rgba(15, 23, 42, 0.06)"};
            border-left: 4px solid var(--color-blue-mid);
            border-radius: 12px;
            padding: 24px 28px;
            text-decoration: none;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            cursor: pointer;
            position: relative;
            overflow: hidden;
            box-shadow: ${isDark ? "0 4px 20px rgba(0, 0, 0, 0.15)" : "0 4px 20px rgba(15, 23, 42, 0.02)"};
          }
          .creative-cta-card:hover {
            transform: translateY(-4px);
            border-left-color: var(--color-blue-bright);
            box-shadow: ${isDark ? "0 12px 30px rgba(0, 0, 0, 0.3)" : "0 12px 30px rgba(15, 23, 42, 0.06)"};
          }
          .creative-cta-content {
            display: flex;
            flex-direction: column;
            gap: 6px;
            flex: 1;
            padding-right: 20px;
          }
          .creative-cta-tag {
            font-family: var(--font-inter), sans-serif;
            font-size: 11px;
            font-weight: 700;
            color: var(--color-blue-mid);
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }
          .creative-cta-title {
            font-family: var(--font-inter), sans-serif;
            font-size: 18px;
            font-weight: 800;
            color: var(--color-text-bright);
            margin: 0;
            line-height: 1.3;
          }
          .creative-cta-desc {
            font-family: var(--font-inter), sans-serif;
            font-size: 13px;
            color: var(--color-text-muted);
            margin: 2px 0 0 0;
            line-height: 1.5;
          }
          .creative-cta-action {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: ${isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(15, 23, 42, 0.03)"};
            border: 1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(15, 23, 42, 0.06)"};
            color: var(--color-text-bright);
            transition: all 0.3s ease;
            flex-shrink: 0;
          }
          .creative-cta-card:hover .creative-cta-action {
            background: var(--color-blue-mid);
            border-color: var(--color-blue-mid);
            color: #ffffff;
            transform: scale(1.05);
          }
          @media (max-width: 500px) {
            .creative-cta-card {
              flex-direction: column;
              align-items: flex-start;
              gap: 16px;
              padding: 20px;
            }
            .creative-cta-action {
              align-self: flex-end;
            }
          }
        ` }} />
        <div 
          onClick={(e) => {
            e.preventDefault();
            setIsSalesPodRequest(true);
            setIsAuditModalOpen(true);
          }} 
          className="creative-cta-card"
        >
          <div className="creative-cta-content">
            <div className="creative-cta-tag">MARKETING RESOURCES & DATASHEETS →</div>
            <h4 className="creative-cta-title">List ScalePods Marketing Datasheets</h4>
            <p className="creative-cta-desc">Download marketing integration playbooks, campaign setup templates, and advanced marketing attribution flowcharts.</p>
          </div>
          <div className="creative-cta-action">
            <ArrowUpRight size={20} />
          </div>
        </div>
      </div>
    );
  };

  const renderSABeforeAfter = () => {
    const isDark = resolvedTheme === "dark";
    const traditionalItems = [
      "15–20 Admin Hours/Week — Reps lose over half their week logging activity, drafting emails, and updating spreadsheets",
      "Manual Data Entry — CRM records, call notes, and contact changes logged inconsistently or forgotten",
      "Delayed Lead Response — Inbound leads wait hours or days for first contact, causing high lead drop-off",
      "Static Blast Messaging — One-size-fits-all email templates with low open and reply rates",
      "Gut-Feel Lead Prioritization — Reps guess which prospects to contact without objective intent scoring"
    ];
    const aiItems = [
      "<4 Admin Hours/Week — Reps focus almost entirely on high-value conversations and closing deals",
      "Automated Real-Time CRM Sync — Call transcripts, email activities, and pipeline updates logged instantly",
      "<60 Second Lead Response — AI agents qualify and engage inbound leads immediately upon submission",
      "Contextual 1:1 Personalization — Outreach tailored dynamically using ICP triggers, tech stack, and role signals",
      "Predictive Intent Scoring — AI ranks leads by conversion probability so reps call top buyers first"
    ];

    return (
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "24px",
        marginTop: "32px",
        marginBottom: "32px"
      }}>
        {/* Traditional Sales */}
        <div style={{
          background: isDark ? "var(--color-bg-card-alt)" : "#ffffff",
          border: isDark ? "1px solid var(--color-border)" : "1px solid rgba(15, 23, 42, 0.04)",
          borderRadius: "16px",
          padding: "28px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          boxShadow: isDark ? "0 10px 30px rgba(0, 0, 0, 0.4)" : "0 10px 30px rgba(15, 23, 42, 0.05)"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{
              fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em",
              padding: "4px 10px", borderRadius: "6px", background: "rgba(239, 68, 68, 0.1)", color: "#ef4444"
            }}>Traditional Sales Ops</span>
            <span style={{ fontSize: "14px", color: "var(--color-text-muted)", fontWeight: 500 }}>Manual Execution</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {traditionalItems.map((item, idx) => {
              const parts = item.split(" — ");
              const title = parts[0];
              const desc = parts.slice(1).join(" — ");
              return (
                <div key={idx} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <div style={{
                    width: "20px", height: "20px", borderRadius: "50%", background: "rgba(239, 68, 68, 0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px"
                  }}>
                    <X style={{ width: "12px", height: "12px", color: "#ef4444" }} />
                  </div>
                  <div style={{ fontSize: "14px", lineHeight: "1.5", color: "var(--color-text-body)" }}>
                    <strong style={{ color: "var(--color-text-bright)" }}>{title}</strong> — {desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI-Powered Sales */}
        <div style={{
          background: isDark ? "var(--color-bg-card-alt)" : "#ffffff",
          border: isDark ? "1px solid var(--color-blue-mid)" : "1px solid rgba(var(--color-blue-mid-rgb), 0.2)",
          borderRadius: "16px",
          padding: "28px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          boxShadow: isDark ? "0 10px 30px rgba(0, 0, 0, 0.4)" : "0 10px 30px rgba(var(--color-blue-mid-rgb), 0.08)"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{
              fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em",
              padding: "4px 10px", borderRadius: "6px", background: "rgba(var(--color-green-rgb), 0.15)", color: "var(--color-green)"
            }}>AI-Powered Sales Ops</span>
            <span style={{ fontSize: "14px", color: "var(--color-blue-mid)", fontWeight: 600 }}>Automated Workflows</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {aiItems.map((item, idx) => {
              const parts = item.split(" — ");
              const title = parts[0];
              const desc = parts.slice(1).join(" — ");
              return (
                <div key={idx} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <div style={{
                    width: "20px", height: "20px", borderRadius: "50%", background: "rgba(var(--color-green-rgb), 0.12)",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px"
                  }}>
                    <Check style={{ width: "12px", height: "12px", color: "var(--color-green)" }} />
                  </div>
                  <div style={{ fontSize: "14px", lineHeight: "1.5", color: "var(--color-text-body)" }}>
                    <strong style={{ color: "var(--color-text-bright)" }}>{title}</strong> — {desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderSABenefitsStats = () => {
    const isDark = resolvedTheme === "dark";
    const stats = [
      { stat: "70%", label: "Lead Response Reduction", detail: "Inbound lead response times drop from hours down to <60 seconds", color: "var(--color-green-text)", colorRgb: "var(--color-green-rgb)" },
      { stat: "30%", label: "Lead-to-Opp Conversion", detail: "Higher conversion rate from faster response & multi-channel follow-up", color: "var(--color-blue-mid)", colorRgb: "var(--color-blue-mid-rgb)" },
      { stat: "15 Hrs", label: "Capacity Reclaimed / Week", detail: "Hours saved per sales rep per week from automated admin & CRM logging", color: "var(--color-green-text)", colorRgb: "var(--color-green-rgb)" },
    ];

    return (
      <div style={{ marginTop: "32px", marginBottom: "32px", width: "100%" }}>
        <style dangerouslySetInnerHTML={{ __html: `
          .sa-stats-grid {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            gap: 20px;
            width: 100%;
          }
          @media (min-width: 640px) {
            .sa-stats-grid {
              grid-template-columns: repeat(3, 1fr);
            }
          }
        ` }} />
        <div className="sa-stats-grid">
          {stats.map((s, idx) => (
            <div key={idx} style={{
              background: isDark ? "var(--color-bg-card-alt)" : "#ffffff",
              borderWidth: "4px 1px 1px 1px",
              borderStyle: "solid",
              borderColor: `${s.color} ${isDark ? "var(--color-border)" : "rgba(15,23,42,0.06)"} ${isDark ? "var(--color-border)" : "rgba(15,23,42,0.06)"} ${isDark ? "var(--color-border)" : "rgba(15,23,42,0.06)"}`,
              borderRadius: "14px",
              padding: "26px 20px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              alignItems: "center",
              textAlign: "center",
              boxShadow: isDark ? "0 8px 24px rgba(0,0,0,0.25)" : "0 8px 24px rgba(15,23,42,0.05)"
            }}>
              <span style={{ fontSize: "36px", fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.stat}</span>
              <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--color-text-bright)" }}>{s.label}</span>
              <span style={{ fontSize: "12px", color: "var(--color-text-muted)", lineHeight: 1.5 }}>{s.detail}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSAProcessesGrid = () => {
    const isDark = resolvedTheme === "dark";
    const processes = [
      { icon: Target, title: "1. Lead Capture & Enrichment", desc: "Automate prospect research by matching ICP criteria across LinkedIn, Apollo, and company databases to produce verified contact profiles.", color: "var(--color-blue-mid)" },
      { icon: Zap, title: "2. Lead Qualification & Scoring", desc: "AI evaluates engagement signals, tech stack, funding, and firmographic data to score and route warm leads instantly.", color: "var(--color-green-text)" },
      { icon: RefreshCw, title: "3. CRM Data Entry & Activity Sync", desc: "Automatically log call notes, emails, meeting transcripts, and contact updates directly into Salesforce, HubSpot, or Pipedrive.", color: "var(--color-blue-mid)" },
      { icon: Send, title: "4. Multi-Channel Follow-Ups", desc: "Trigger multi-touch sequences across email, LinkedIn, and messaging platforms based on prospect behavior and response delays.", color: "var(--color-green-text)" },
      { icon: Calendar, title: "5. Meeting Scheduling", desc: "Eliminate booking back-and-forth by letting prospects instantly pick time slots with automated reminders and calendar sync.", color: "var(--color-blue-mid)" },
      { icon: FileText, title: "6. Proposal & Quote Generation", desc: "Generate custom quotes, contracts, and proposals dynamically based on discovery notes and CRM deal parameters.", color: "var(--color-green-text)" },
      { icon: LayoutGrid, title: "7. Pipeline Management", desc: "Automatically update deal stages, flag stalled opportunities, and trigger rep alerts when buyer activity changes.", color: "var(--color-blue-mid)" },
      { icon: TrendingUp, title: "8. Sales Forecasting", desc: "Predict revenue outcomes using historical deal velocity, conversion rates, and real-time deal engagement indicators.", color: "var(--color-green-text)" },
      { icon: BarChart3, title: "9. Reporting & Analytics", desc: "Track rep productivity, pipeline velocity, channel ROI, and conversion bottlenecks on one live executive dashboard.", color: "var(--color-blue-mid)" },
      { icon: UserCheck, title: "10. Customer Success Handoff", desc: "Pass closed-won deal context, client goals, and onboarding tasks automatically from sales reps to CS account managers.", color: "var(--color-green-text)" },
    ];

    return (
      <div style={{ marginTop: "32px", marginBottom: "32px", width: "100%" }}>
        <style dangerouslySetInnerHTML={{ __html: `
          .sa-proc-grid {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            gap: 20px;
            width: 100%;
          }
          @media (min-width: 640px) {
            .sa-proc-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (min-width: 1024px) {
            .sa-proc-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
        ` }} />
        <div className="sa-proc-grid">
          {processes.map((p, idx) => {
            const IconComponent = p.icon;
            return (
              <div key={idx} style={{
                background: isDark ? "var(--color-bg-card-alt)" : "#ffffff",
                borderTop: isDark ? "1px solid var(--color-border)" : "1px solid rgba(15,23,42,0.06)",
                borderRight: isDark ? "1px solid var(--color-border)" : "1px solid rgba(15,23,42,0.06)",
                borderBottom: isDark ? "1px solid var(--color-border)" : "1px solid rgba(15,23,42,0.06)",
                borderLeft: `4px solid ${p.color}`,
                borderRadius: "14px",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                boxShadow: isDark ? "0 4px 20px rgba(0,0,0,0.25)" : "0 4px 20px rgba(15,23,42,0.04)"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{
                    width: "38px", height: "38px", borderRadius: "10px",
                    background: `${p.color}15`, display: "flex", alignItems: "center", justifyContent: "center",
                    color: p.color, flexShrink: 0
                  }}>
                    <IconComponent style={{ width: "20px", height: "20px" }} />
                  </div>
                  <div style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)" }}>{p.title}</div>
                </div>
                <div style={{ fontSize: "13px", color: "var(--color-text-body)", lineHeight: 1.6 }}>{p.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderSAFlowDiagram = () => {
    const isDark = resolvedTheme === "dark";
    const flowSteps = [
      { step: "01", title: "Lead Capture", desc: "Inbound form / Outbound ICP signal", tag: "Trigger" },
      { step: "02", title: "AI Qualification", desc: "Enrichment & Intent Scoring", tag: "Enrichment" },
      { step: "03", title: "CRM Sync", desc: "Real-Time record creation", tag: "Data" },
      { step: "04", title: "Smart Outreach", desc: "Personalized multi-channel sequence", tag: "Engagement" },
      { step: "05", title: "Instant Booking", desc: "Automated Calendar Handoff", tag: "Meeting" },
      { step: "06", title: "Proposal & Close", desc: "AI contract gen & deal tracking", tag: "Revenue" },
      { step: "07", title: "CS Handoff", desc: "Seamless client onboarding sync", tag: "Retention" },
    ];

    return (
      <div style={{ marginTop: "32px", marginBottom: "32px", width: "100%" }}>
        <div style={{
          background: isDark ? "var(--color-bg-card-alt)" : "#ffffff",
          border: isDark ? "1px solid var(--color-border)" : "1px solid rgba(15, 23, 42, 0.06)",
          borderRadius: "16px",
          padding: "32px 24px",
          boxShadow: isDark ? "0 10px 30px rgba(0,0,0,0.3)" : "0 10px 30px rgba(15,23,42,0.05)"
        }}>
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <span style={{
              fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em",
              padding: "4px 12px", borderRadius: "20px", background: "rgba(var(--color-blue-mid-rgb), 0.12)", color: "var(--color-blue-mid)"
            }}>
              END-TO-END WORKFLOW PIPELINE
            </span>
            <h4 style={{ fontSize: "20px", fontWeight: 800, color: "var(--color-text-bright)", marginTop: "10px", marginBottom: "4px" }}>
              The Automated Lead Journey in 2026
            </h4>
            <p style={{ fontSize: "14px", color: "var(--color-text-muted)" }}>
              From initial prospect discovery to customer success handoff without friction
            </p>
          </div>

          <style dangerouslySetInnerHTML={{ __html: `
            .sa-flow-grid {
              display: grid;
              grid-template-columns: repeat(1, 1fr);
              gap: 14px;
            }
            @media (min-width: 640px) {
              .sa-flow-grid {
                grid-template-columns: repeat(2, 1fr);
              }
            }
            @media (min-width: 1024px) {
              .sa-flow-grid {
                grid-template-columns: repeat(4, 1fr);
              }
            }
          ` }} />
          <div className="sa-flow-grid">
            {flowSteps.map((s, idx) => (
              <div key={idx} style={{
                background: isDark ? "rgba(255,255,255,0.03)" : "#f8fafc",
                border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e2e8f0",
                borderRadius: "12px",
                padding: "18px 16px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                position: "relative"
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "18px", fontWeight: 800, color: "var(--color-blue-mid)" }}>{s.step}</span>
                  <span style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", padding: "2px 8px", borderRadius: "4px", background: "rgba(var(--color-green-rgb), 0.15)", color: "var(--color-green-text)" }}>{s.tag}</span>
                </div>
                <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-text-bright)" }}>{s.title}</div>
                <div style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderSAAITransform = () => {
    const isDark = resolvedTheme === "dark";
    const aiCaps = [
      { icon: Search, title: "1. ICP Scraping & Enrichment", desc: "AI scans web signals, job changes, funding, and tech stacks to build verified lead lists dynamically.", color: "var(--color-blue-mid)" },
      { icon: Zap, title: "2. AI Lead Qualification", desc: "Conversational AI scores incoming inquiries and determines real intent before routing to reps.", color: "var(--color-green-text)" },
      { icon: Mail, title: "3. Multi-Channel AI Outreach", desc: "Generative messaging creates authentic 1:1 emails, LinkedIn touchpoints, and WhatsApp messages tailored to each lead.", color: "var(--color-blue-mid)" },
      { icon: Activity, title: "4. Automated Sentiment Analysis", desc: "AI reads reply tone to categorize responses into interested, objection, referral, or unsubscribe automatically.", color: "var(--color-green-text)" },
      { icon: Award, title: "5. Predictive Opportunity Scoring", desc: "Machine learning models analyze deal parameters to highlight closing probability and win rates.", color: "var(--color-blue-mid)" },
      { icon: Bot, title: "6. Autonomous Sales Workflows", desc: "Task-specific AI agents handle research, draft follow-ups, and update CRM records automatically.", color: "var(--color-green-text)" },
      { icon: TrendingUp, title: "7. Predictive Revenue Forecasting", desc: "Live analytics evaluate current pipeline momentum to deliver accurate quarterly sales forecasts.", color: "var(--color-blue-mid)" },
      { icon: RefreshCw, title: "8. Unified Intelligence & CRM Sync", desc: "Bi-directional syncing ensures all customer interactions update across sales, marketing, and CS tools.", color: "var(--color-green-text)" },
    ];

    return (
      <div style={{ marginTop: "32px", marginBottom: "32px", width: "100%" }}>
        <style dangerouslySetInnerHTML={{ __html: `
          .sa-ai-grid {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            gap: 20px;
            width: 100%;
          }
          @media (min-width: 640px) {
            .sa-ai-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (min-width: 1024px) {
            .sa-ai-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
        ` }} />
        <div className="sa-ai-grid">
          {aiCaps.map((c, idx) => {
            const IconComponent = c.icon;
            return (
              <div key={idx} style={{
                background: isDark ? "var(--color-bg-card-alt)" : "#ffffff",
                borderWidth: "3px 1px 1px 1px",
                borderStyle: "solid",
                borderColor: `${c.color} ${isDark ? "var(--color-border)" : "rgba(15,23,42,0.06)"} ${isDark ? "var(--color-border)" : "rgba(15,23,42,0.06)"} ${isDark ? "var(--color-border)" : "rgba(15,23,42,0.06)"}`,
                borderRadius: "12px",
                padding: "22px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                boxShadow: isDark ? "0 4px 20px rgba(0,0,0,0.25)" : "0 4px 20px rgba(15,23,42,0.04)"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{
                    width: "36px", height: "36px", borderRadius: "8px",
                    background: `${c.color}15`, display: "flex", alignItems: "center", justifyContent: "center",
                    color: c.color, flexShrink: 0
                  }}>
                    <IconComponent style={{ width: "18px", height: "18px" }} />
                  </div>
                  <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-text-bright)" }}>{c.title}</div>
                </div>
                <div style={{ fontSize: "13px", color: "var(--color-text-body)", lineHeight: 1.6 }}>{c.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderSAImplementation = () => {
    const isDark = resolvedTheme === "dark";
    const phases = [
      { phase: "Phase 1", time: "Weeks 1–2", title: "Audit & Process Mapping", desc: "Map your sales pipeline end-to-end. Identify manual bottlenecks, lead drop-off points, and CRM data hygiene gaps." },
      { phase: "Phase 2", time: "Weeks 3–4", title: "Workflow Design & Standardization", desc: "Select high-ROI use cases (e.g. Lead Qualification, Follow-Up Sequences). Establish ICP rules and outreach guardrails." },
      { phase: "Phase 3", time: "Weeks 5–8", title: "Integration & Team Training", desc: "Deploy AI workflows into your CRM (HubSpot/Salesforce). Train reps on co-piloted AI outreach and meeting management." },
      { phase: "Phase 4", time: "Weeks 9+", title: "Measurement & Optimization", desc: "Track lead response speed, conversion rates, and rep capacity. Continuously optimize messaging prompts and intent scoring." },
    ];

    return (
      <div style={{ marginTop: "32px", marginBottom: "32px", width: "100%" }}>
        <style dangerouslySetInnerHTML={{ __html: `
          .sa-impl-grid {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            gap: 20px;
            width: 100%;
          }
          @media (min-width: 640px) {
            .sa-impl-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
        ` }} />
        <div className="sa-impl-grid">
          {phases.map((p, idx) => (
            <div key={idx} style={{
              background: isDark ? "var(--color-bg-card-alt)" : "#ffffff",
              border: isDark ? "1px solid var(--color-border)" : "1px solid rgba(15,23,42,0.06)",
              borderRadius: "14px",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              boxShadow: isDark ? "0 4px 20px rgba(0,0,0,0.25)" : "0 4px 20px rgba(15,23,42,0.04)"
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", padding: "4px 10px", borderRadius: "6px", background: "rgba(var(--color-blue-mid-rgb), 0.12)", color: "var(--color-blue-mid)" }}>{p.phase}</span>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-green-text)" }}>{p.time}</span>
              </div>
              <h4 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", margin: 0 }}>{p.title}</h4>
              <p style={{ fontSize: "13px", color: "var(--color-text-body)", margin: 0, lineHeight: 1.6 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSAFeaturesGrid = () => {
    const isDark = resolvedTheme === "dark";
    const features = [
      { icon: Bot, title: "AI Presales Pods", desc: "Ready-to-deploy automated SDR systems combining research, outreach, and appointment setting." },
      { icon: RefreshCw, title: "Plug-and-Play Setup", desc: "Seamless bi-directional integrations for HubSpot, Salesforce, Pipedrive, and Apollo." },
      { icon: Users, title: "Human + AI Synergy", desc: "AI handles repetitive tasks while trained remote SDRs manage high-touch discovery calls." },
      { icon: Award, title: "SLA-Backed Performance", desc: "We measure success by qualified meetings booked and pipeline generated, not vanity emails." },
      { icon: Shield, title: "Claude Partner Network", desc: "Built on enterprise-grade Anthropic AI architecture for safe, contextual communication." },
      { icon: Lock, title: "GDPR & CAN-SPAM Safe", desc: "Safe sending domain management, verified prospect data, and full regulatory compliance." },
    ];

    return (
      <div style={{ marginTop: "32px", marginBottom: "32px", width: "100%" }}>
        <style dangerouslySetInnerHTML={{ __html: `
          .sa-feat-grid {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            gap: 16px;
            width: 100%;
          }
          @media (min-width: 640px) {
            .sa-feat-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (min-width: 1024px) {
            .sa-feat-grid {
              grid-template-columns: repeat(3, 1fr);
            }
          }
        ` }} />
        <div className="sa-feat-grid">
          {features.map((f, idx) => {
            const IconComponent = f.icon;
            return (
              <div key={idx} style={{
                background: isDark ? "var(--color-bg-card-alt)" : "#ffffff",
                border: isDark ? "1px solid var(--color-border)" : "1px solid rgba(15,23,42,0.06)",
                borderRadius: "12px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                boxShadow: isDark ? "0 4px 16px rgba(0,0,0,0.2)" : "0 4px 16px rgba(15,23,42,0.03)"
              }}>
                <div style={{
                  width: "36px", height: "36px", borderRadius: "8px",
                  background: "rgba(var(--color-blue-mid-rgb), 0.12)", display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--color-blue-mid)"
                }}>
                  <IconComponent style={{ width: "18px", height: "18px" }} />
                </div>
                <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-text-bright)" }}>{f.title}</div>
                <div style={{ fontSize: "13px", color: "var(--color-text-body)", lineHeight: 1.5 }}>{f.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderSaCtaLanding = () => {
    const isDark = resolvedTheme === "dark";
    return (
      <div style={{ marginTop: "36px", marginBottom: "36px", width: "100%" }}>
        <style dangerouslySetInnerHTML={{ __html: `
          .creative-cta-card {
            background: ${isDark ? "var(--color-bg-card-alt)" : "#ffffff"};
            border: ${isDark ? "1px solid var(--color-border)" : "1px solid rgba(15, 23, 42, 0.08)"};
            border-left: 4px solid var(--color-blue-mid);
            border-radius: 16px;
            padding: 28px 32px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 24px;
            cursor: pointer;
            box-shadow: ${isDark ? "0 10px 30px rgba(0, 0, 0, 0.3)" : "0 10px 30px rgba(15, 23, 42, 0.05)"};
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .creative-cta-card:hover {
            transform: translateY(-3px);
            border-color: ${isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(37, 99, 235, 0.3)"};
            box-shadow: ${isDark ? "0 14px 36px rgba(0, 0, 0, 0.4)" : "0 14px 36px rgba(37, 99, 235, 0.1)"};
          }
        ` }} />
        <div 
          onClick={(e) => {
            e.preventDefault();
            setIsSalesPodRequest(false);
            setIsAuditModalOpen(true);
          }} 
          className="creative-cta-card"
        >
          <div className="creative-cta-content">
            <div className="creative-cta-tag">SALES WORKFLOW AUDIT →</div>
            <h4 className="creative-cta-title">Audit Your Sales Operations for 2026</h4>
            <p className="creative-cta-desc">Discover where your reps lose admin hours, pinpoint lead leakages, and get a customized AI sales automation blueprint.</p>
          </div>
          <div className="creative-cta-action">
            <ArrowUpRight size={20} />
          </div>
        </div>
      </div>
    );
  };

  const renderSaCtaDatasheet = () => {
    const isDark = resolvedTheme === "dark";
    return (
      <div style={{ marginTop: "36px", marginBottom: "36px", width: "100%" }}>
        <div 
          onClick={(e) => {
            e.preventDefault();
            setIsSalesPodRequest(true);
            setIsAuditModalOpen(true);
          }} 
          className="creative-cta-card"
        >
          <div className="creative-cta-content">
            <div className="creative-cta-tag">SALES RESOURCES & DATASHEETS →</div>
            <h4 className="creative-cta-title">Download ScalePods Sales Automation Playbook</h4>
            <p className="creative-cta-desc">Access outreach sequence templates, CRM integration diagrams, and automated lead scoring frameworks.</p>
          </div>
          <div className="creative-cta-action">
            <ArrowUpRight size={20} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .premium-widget-card {
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .premium-widget-card:hover {
          transform: translateY(-3px);
          box-shadow: ${resolvedTheme === "dark" ? "0 12px 30px rgba(0,0,0,0.3)" : "0 12px 30px rgba(15,23,42,0.06)"} !important;
        }
      ` }} />
      <div style={{ display: "flex", flexDirection: "column", gap: "56px" }}>
        {sections.map((section, i) => (
          <div
            key={i}
            className="fade-up"
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: section.isContinuation ? "-32px" : "0px"
            }}
          >
            {section.heading && (
              <h2 style={{
                fontFamily: "var(--font-inter), sans-serif", fontSize: "24px", fontWeight: 700,
                color: "var(--color-text-bright)", marginBottom: "18px", lineHeight: 1.3,
                letterSpacing: "-0.01em",
                textAlign: (section.heading === "The HR Automation Software Checklist" || section.heading === "How ScalePods Helps Businesses Automate HR Operations") ? "center" : "left"
              }}>
                {section.heading}
              </h2>
            )}

            {/* Top Positioned Section Image */}
            {section.imagePosition === "top" && (section.image || (section.imageLight && section.imageDark)) && (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%", marginTop: "12px", marginBottom: "24px" }}>
                <div style={{
                  width: "100%", borderRadius: "12px", overflow: "hidden",
                  border: "1px solid var(--color-border)",
                  boxShadow: "var(--shadow-sm)"
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={section.image ? section.image : (resolvedTheme === "dark" ? section.imageDark : section.imageLight)}
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

            {renderBodyContent(section.body, !!(section.image || section.cta || section.accordionItems || section.visual))}

            {section.accordionItems && section.accordionItems.length > 0 && (
              <div style={{
                marginTop: "24px",
                marginBottom: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                width: "100%"
              }}>
                {section.accordionItems.map((item, idx) => {
                  let tagPrefix = "CONCEPT";
                  const sectionHeadingLower = section.heading.toLowerCase();
                  if (sectionHeadingLower.includes("building blocks")) {
                    tagPrefix = "FOUNDATION";
                  } else if (sectionHeadingLower.includes("evolution")) {
                    tagPrefix = "EVOLUTION";
                  } else if (sectionHeadingLower.includes("implement") || sectionHeadingLower.includes("step") || sectionHeadingLower.includes("framework")) {
                    tagPrefix = "STEP";
                  } else if (sectionHeadingLower.includes("modern sales workflow") || sectionHeadingLower.includes("stage")) {
                    tagPrefix = "STAGE";
                  } else if (sectionHeadingLower.includes("process")) {
                    tagPrefix = "PROCESS";
                  } else if (sectionHeadingLower.includes("mistake")) {
                    tagPrefix = "MISTAKE";
                  } else if (sectionHeadingLower.includes("scalepods")) {
                    tagPrefix = "CAPABILITY";
                  } else if (sectionHeadingLower.includes("use case")) {
                    tagPrefix = "USE CASE";
                  }

                  const highlightColor = idx % 2 === 0 ? "var(--color-green-text)" : "var(--color-blue-mid)";
                  const isDark = resolvedTheme === "dark";

                  return (
                    <div
                      key={idx}
                      className="premium-widget-card"
                      style={{
                        background: isDark ? "var(--color-bg-card-alt)" : "#ffffff",
                        borderStyle: "solid",
                        borderWidth: "1px 1px 1px 4px",
                        borderColor: isDark 
                          ? `var(--color-border) var(--color-border) var(--color-border) ${highlightColor}`
                          : `rgba(15,23,42,0.06) rgba(15,23,42,0.06) rgba(15,23,42,0.06) ${highlightColor}`,
                        borderRadius: "12px",
                        padding: "24px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        boxShadow: isDark ? "0 4px 20px rgba(0,0,0,0.15)" : "0 4px 20px rgba(15,23,42,0.02)",
                        width: "100%"
                      }}
                    >
                      <div style={{
                        fontFamily: "var(--font-inter), sans-serif",
                        fontSize: "12px",
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                        color: highlightColor,
                        textTransform: "uppercase"
                      }}>
                        {tagPrefix} {String(idx + 1).padStart(2, '0')}
                      </div>
                      <h3 style={{
                        fontFamily: "var(--font-inter), sans-serif",
                        fontSize: "18px",
                        fontWeight: 700,
                        color: "var(--color-text-bright)",
                        margin: 0,
                        lineHeight: 1.4
                      }}>
                        {item.title}
                      </h3>
                      <p style={{
                        fontFamily: "var(--font-inter), sans-serif",
                        fontSize: "15px",
                        color: "var(--color-text-body)",
                        margin: 0,
                        lineHeight: 1.6,
                        whiteSpace: "pre-wrap"
                      }}>
                        {parseMarkdownInline(item.content)}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            {section.video && (
              <BlogVideoPlayer src={section.video} />
            )}

            {/* Section Inline Image */}
            {section.imagePosition !== "top" && (section.image || (section.imageLight && section.imageDark)) && (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%", marginTop: "12px", marginBottom: "24px" }}>
                <div style={{
                  width: "100%", borderRadius: "12px", overflow: "hidden",
                  border: "1px solid var(--color-border)",
                  boxShadow: "var(--shadow-sm)"
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={section.image ? section.image : (resolvedTheme === "dark" ? section.imageDark : section.imageLight)}
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

            {section.visual && (
              <div style={{ width: "100%" }}>
                {section.visual === "ai-transform" && renderAITransform()}
                {section.visual === "barriers" && renderBarriers()}
                {section.visual === "implementation" && renderImplementation()}
                {section.visual === "checklist" && renderChecklist()}
                {section.visual === "readiness-datasheets" && renderReadinessDatasheets()}
                {section.visual === "features-grid" && (
                  <>
                    {renderFeaturesGrid()}
                    {renderReadiness()}
                  </>
                )}
                {section.visual === "ma-use-cases" && renderMAUseCases()}
                {section.visual === "ma-ai-transform" && renderMAAITransform()}
                {section.visual === "ma-challenges" && renderMAChallenges()}
                {section.visual === "ma-trends" && renderMATrends()}
                {section.visual === "ma-features-grid" && renderMAFeaturesGrid()}
                {section.visual === "hr-processes-grid" && renderHRProcessesGrid()}
                {section.visual === "hr-benefits-stats" && renderHRBenefitsStats()}
                {section.visual === "ma-processes-grid" && renderMaProcessesGrid()}
                {section.visual === "ma-benefits-stats" && renderMABenefitsStats()}
                {section.visual === "hr-cta-landing" && renderHrCtaLanding()}
                {section.visual === "hr-cta-datasheet" && renderHrCtaDatasheet()}
                {section.visual === "ma-cta-landing" && renderMaCtaLanding()}
                {section.visual === "ma-cta-datasheet" && renderMaCtaDatasheet()}
                {section.visual === "sa-before-after" && renderSABeforeAfter()}
                {section.visual === "sa-benefits-stats" && renderSABenefitsStats()}
                {section.visual === "sa-processes-grid" && renderSAProcessesGrid()}
                {section.visual === "sa-flow-diagram" && renderSAFlowDiagram()}
                {section.visual === "sa-ai-transform" && renderSAAITransform()}
                {section.visual === "sa-implementation" && renderSAImplementation()}
                {section.visual === "sa-features-grid" && renderSAFeaturesGrid()}
                {section.visual === "sa-cta-landing" && renderSaCtaLanding()}
                {section.visual === "sa-cta-datasheet" && renderSaCtaDatasheet()}
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
