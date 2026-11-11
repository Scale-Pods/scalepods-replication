"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, BookOpen, X, ArrowUpRight } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { BeamsBackground } from "@/components/ui/beams-background";

export type ResourceFormat = "all" | "ebook" | "case-study" | "blog";

export interface ResourceItem {
  id: string;
  format: "ebook" | "case-study" | "blog";
  badge: string;
  title: string;
  date: string;
  coverImage: string;
  href: string;
  description: string;
  category?: string;
}

interface ResourcesClientProps {
  items: ResourceItem[];
}

export default function ResourcesClient({ items }: ResourcesClientProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const searchParams = useSearchParams();

  const initialFormatParam = searchParams.get("format");
  const isValidFormat = (val: string | null): val is ResourceFormat =>
    val === "all" || val === "ebook" || val === "case-study" || val === "blog";

  const [activeFormat, setActiveFormat] = useState<ResourceFormat>(
    isValidFormat(initialFormatParam) ? initialFormatParam : "all"
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const param = searchParams.get("format");
    if (isValidFormat(param)) {
      setActiveFormat(param);
    } else if (param === null) {
      setActiveFormat("all");
    }
  }, [searchParams]);

  const counts = useMemo(() => {
    let ebook = 0;
    let caseStudy = 0;
    let blog = 0;
    for (const item of items) {
      if (item.format === "ebook") ebook++;
      else if (item.format === "case-study") caseStudy++;
      else if (item.format === "blog") blog++;
    }
    return {
      all: items.length,
      ebook,
      "case-study": caseStudy,
      blog,
    };
  }, [items]);

  const formats: { id: ResourceFormat; label: string; count: number }[] = [
    { id: "all", label: "All Resources", count: counts.all },
    { id: "ebook", label: "Executive eBooks", count: counts.ebook },
    { id: "case-study", label: "Case Studies", count: counts["case-study"] },
    { id: "blog", label: "Blog & Articles", count: counts.blog },
  ];

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return items.filter((item) => {
      const matchesFormat = activeFormat === "all" || item.format === activeFormat;
      if (!matchesFormat) return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.badge.toLowerCase().includes(q) ||
        (item.category && item.category.toLowerCase().includes(q))
      );
    });
  }, [items, activeFormat, searchQuery]);

  const getBadgeStyle = (format: ResourceItem["format"]) => {
    if (format === "ebook") {
      return {
        background: isDark ? "rgba(177, 217, 151, 0.14)" : "rgba(22, 101, 52, 0.08)",
        color: isDark ? "#B1D997" : "#166534",
        border: isDark ? "1px solid rgba(177, 217, 151, 0.25)" : "1px solid rgba(22, 101, 52, 0.2)",
      };
    }
    if (format === "case-study") {
      return {
        background: isDark ? "rgba(109, 182, 255, 0.14)" : "rgba(37, 99, 235, 0.08)",
        color: isDark ? "#6DB6FF" : "#1d4ed8",
        border: isDark ? "1px solid rgba(109, 182, 255, 0.25)" : "1px solid rgba(37, 99, 235, 0.2)",
      };
    }
    return {
      background: isDark ? "rgba(255, 255, 255, 0.07)" : "rgba(15, 23, 42, 0.06)",
      color: isDark ? "#E2E8F0" : "#0f172a",
      border: isDark ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid rgba(15, 23, 42, 0.12)",
    };
  };

  return (
    <div style={{ background: "var(--color-bg-page)", minHeight: "100vh", color: "var(--color-text-body)" }}>
      <style>{`
        .resources-layout {
          display: grid;
          grid-template-columns: 250px 1fr;
          gap: 48px;
          align-items: start;
        }
        .resources-sidebar {
          position: sticky;
          top: 110px;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        .resources-mobile-tabs {
          display: none;
        }
        @media (max-width: 900px) {
          .resources-layout {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
          .resources-sidebar {
            position: static !important;
          }
          .resources-format-list-desktop {
            display: none !important;
          }
          .resources-mobile-tabs {
            display: flex !important;
            flex-wrap: wrap;
            gap: 8px;
          }
        }
      `}</style>
      <BeamsBackground hues={[200, 210, 225]} intensity="strong">
        {/* Top Section / Header */}
        <section style={{ paddingTop: "140px", paddingBottom: "40px", borderBottom: "1px solid var(--color-border-faint)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
            {/* Top Micro-Header */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(15, 23, 42, 0.04)",
                border: "1px solid var(--color-border)",
                borderRadius: "24px",
                padding: "6px 16px",
                marginBottom: "20px",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: "var(--color-green-text)",
                textTransform: "uppercase",
              }}
            >
              <BookOpen size={14} />
              <span>Executive Knowledge Hub</span>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "clamp(32px, 5vw, 48px)",
                fontWeight: 800,
                color: "var(--color-text-bright)",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                marginBottom: "16px",
              }}
            >
              Executive Resources, Case Studies &amp; Playbooks
            </h1>

            <p
              style={{
                fontSize: "18px",
                color: "var(--color-text-muted)",
                maxWidth: "740px",
                margin: "0 auto",
                lineHeight: 1.6,
              }}
            >
              Explore our complete library of executive eBooks, documented client case studies, and actionable automation guides built for enterprise leaders.
            </p>
          </div>
        </section>

        {/* Main Content Layout (Sidebar + Cards Grid) */}
        <section style={{ padding: "56px 0 110px 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
            <div className="resources-layout">
              {/* Left Sidebar */}
              <aside className="resources-sidebar">
                {/* Search Box */}
                <div>
                  <h3
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      color: "var(--color-text-faint)",
                      textTransform: "uppercase",
                      marginBottom: "12px",
                      fontFamily: "var(--font-inter), sans-serif",
                    }}
                  >
                    SEARCH LIBRARY
                  </h3>
                  <div style={{ position: "relative" }}>
                    <Search
                      size={15}
                      style={{
                        position: "absolute",
                        left: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "var(--color-text-faint)",
                        pointerEvents: "none",
                      }}
                    />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search resources..."
                      aria-label="Search resources"
                      style={{
                        width: "100%",
                        padding: "10px 32px 10px 36px",
                        borderRadius: "10px",
                        fontSize: "13.5px",
                        background: isDark ? "rgba(255, 255, 255, 0.04)" : "#ffffff",
                        border: "1px solid var(--color-border)",
                        color: "var(--color-text-bright)",
                        outline: "none",
                        fontFamily: "var(--font-inter), sans-serif",
                      }}
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        aria-label="Clear search"
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          background: "transparent",
                          border: "none",
                          color: "var(--color-text-faint)",
                          cursor: "pointer",
                          padding: "2px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Desktop Formats List */}
                <div className="resources-format-list-desktop">
                  <h3
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      color: "var(--color-text-faint)",
                      textTransform: "uppercase",
                      marginBottom: "14px",
                      fontFamily: "var(--font-inter), sans-serif",
                    }}
                  >
                    FORMATS
                  </h3>

                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
                    {formats.map((fmt) => {
                      const isActive = activeFormat === fmt.id;
                      return (
                        <li key={fmt.id}>
                          <button
                            type="button"
                            onClick={() => setActiveFormat(fmt.id)}
                            style={{
                              width: "100%",
                              textAlign: "left",
                              padding: "10px 14px",
                              borderRadius: "10px",
                              fontSize: "14px",
                              fontWeight: isActive ? 600 : 400,
                              color: isActive ? "var(--color-text-bright)" : "var(--color-text-muted)",
                              background: isActive
                                ? isDark
                                  ? "rgba(255, 255, 255, 0.08)"
                                  : "rgba(15, 23, 42, 0.06)"
                                : "transparent",
                              border: isActive
                                ? "1px solid var(--color-border)"
                                : "1px solid transparent",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <span>{fmt.label}</span>
                            <span
                              style={{
                                fontSize: "11px",
                                opacity: isActive ? 0.95 : 0.65,
                                background: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(15, 23, 42, 0.08)",
                                padding: "2px 8px",
                                borderRadius: "10px",
                                fontWeight: 600,
                              }}
                            >
                              {fmt.count}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Mobile Horizontal Format Pills */}
                <div className="resources-mobile-tabs">
                  {formats.map((fmt) => {
                    const isActive = activeFormat === fmt.id;
                    return (
                      <button
                        key={fmt.id}
                        type="button"
                        onClick={() => setActiveFormat(fmt.id)}
                        style={{
                          padding: "8px 14px",
                          borderRadius: "20px",
                          fontSize: "13px",
                          fontWeight: isActive ? 600 : 500,
                          color: isActive ? "var(--color-text-bright)" : "var(--color-text-muted)",
                          background: isActive
                            ? isDark
                              ? "rgba(255, 255, 255, 0.1)"
                              : "rgba(15, 23, 42, 0.08)"
                            : isDark
                            ? "rgba(255, 255, 255, 0.03)"
                            : "rgba(15, 23, 42, 0.03)",
                          border: "1px solid var(--color-border)",
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <span>{fmt.label}</span>
                        <span style={{ fontSize: "11px", opacity: 0.75 }}>({fmt.count})</span>
                      </button>
                    );
                  })}
                </div>
              </aside>

              {/* Right Cards Grid */}
              <main>
                {/* Active filter summary bar */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "12px",
                    marginBottom: "24px",
                    paddingBottom: "14px",
                    borderBottom: "1px solid var(--color-border-faint)",
                  }}
                >
                  <div style={{ fontSize: "14px", color: "var(--color-text-muted)" }}>
                    Showing <strong style={{ color: "var(--color-text-bright)" }}>{filteredItems.length}</strong>{" "}
                    {activeFormat === "all"
                      ? "total resources"
                      : activeFormat === "ebook"
                      ? "executive eBooks"
                      : activeFormat === "case-study"
                      ? "case studies"
                      : "blog articles"}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "13px" }}>
                    {activeFormat === "case-study" && (
                      <Link
                        href="/blog/case-studies"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          color: "var(--color-blue-mid)",
                          textDecoration: "none",
                          fontWeight: 600,
                        }}
                      >
                        <span>Full Case Studies Showcase</span>
                        <ArrowUpRight size={14} />
                      </Link>
                    )}
                    {activeFormat === "blog" && (
                      <Link
                        href="/blog"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          color: "var(--color-blue-mid)",
                          textDecoration: "none",
                          fontWeight: 600,
                        }}
                      >
                        <span>Dedicated Blog Feed</span>
                        <ArrowUpRight size={14} />
                      </Link>
                    )}
                  </div>
                </div>

                {filteredItems.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "60px 0", color: "var(--color-text-faint)" }}>
                    No resources found matching your search.
                  </div>
                ) : (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))",
                      gap: "28px",
                    }}
                  >
                    {filteredItems.map((item) => {
                      const badgeStyle = getBadgeStyle(item.format);
                      const isSvg = item.coverImage.toLowerCase().endsWith(".svg");
                      return (
                        <Link
                          key={item.id}
                          href={item.href}
                          style={{ textDecoration: "none", display: "flex", flexDirection: "column", height: "100%" }}
                        >
                          <div
                            className="premium-card group"
                            style={{
                              border: "1px solid var(--color-border)",
                              borderRadius: "16px",
                              background: isDark ? "var(--color-bg-card-alt)" : "#ffffff",
                              overflow: "hidden",
                              display: "flex",
                              flexDirection: "column",
                              height: "100%",
                              transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                              boxShadow: isDark
                                ? "0 4px 20px rgba(0,0,0,0.2)"
                                : "0 4px 20px rgba(15,23,42,0.03)",
                            }}
                          >
                            {/* Card Content Padding */}
                            <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
                              {/* Badge + Date row */}
                              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
                                <span
                                  style={{
                                    fontSize: "10.5px",
                                    fontWeight: 700,
                                    letterSpacing: "0.08em",
                                    padding: "4px 10px",
                                    borderRadius: "6px",
                                    textTransform: "uppercase",
                                    ...badgeStyle,
                                  }}
                                >
                                  {item.badge}
                                </span>

                                <span
                                  style={{
                                    fontSize: "11.5px",
                                    fontWeight: 500,
                                    color: "var(--color-text-faint)",
                                  }}
                                >
                                  {item.date}
                                </span>
                              </div>

                              {/* Title */}
                              <h2
                                style={{
                                  fontFamily: "var(--font-inter), sans-serif",
                                  fontSize: "18.5px",
                                  fontWeight: 700,
                                  color: "var(--color-text-bright)",
                                  lineHeight: 1.35,
                                  margin: 0,
                                  letterSpacing: "-0.01em",
                                }}
                              >
                                {item.title}
                              </h2>

                              {/* Excerpt / Description */}
                              {item.description && (
                                <p
                                  style={{
                                    fontFamily: "var(--font-inter), sans-serif",
                                    fontSize: "13.5px",
                                    color: "var(--color-text-muted)",
                                    lineHeight: 1.55,
                                    margin: 0,
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                  }}
                                >
                                  {item.description}
                                </p>
                              )}
                            </div>

                            {/* Cover Image Container */}
                            <div
                              style={{
                                position: "relative",
                                width: "100%",
                                height: "210px",
                                overflow: "hidden",
                                borderTop: "1px solid var(--color-border-faint)",
                                marginTop: "auto",
                                background: isSvg
                                  ? isDark
                                    ? "rgba(255, 255, 255, 0.03)"
                                    : "rgba(15, 23, 42, 0.03)"
                                  : undefined,
                              }}
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={
                                  item.format === "ebook"
                                    ? item.coverImage.replace(/\.(png|jpg|jpeg)$/, ".webp")
                                    : item.coverImage
                                }
                                onError={(e) => {
                                  const imgEl = e.target as HTMLImageElement;
                                  if (imgEl.src !== item.coverImage && !imgEl.dataset.fallback) {
                                    imgEl.dataset.fallback = "1";
                                    imgEl.src = item.coverImage;
                                  } else {
                                    imgEl.src = "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80";
                                  }
                                }}
                                alt={item.title}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  display: "block",
                                  transition: "transform 0.5s ease",
                                }}
                                className="group-hover:scale-105"
                              />
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </main>
            </div>
          </div>
        </section>

        {/* Informative Value Section: Inside ScalePods Playbooks */}
        <section
          style={{
            padding: "80px 0",
            borderTop: "1px solid var(--color-border-faint)",
            background: isDark ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.4)",
          }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
            <div style={{ textAlign: "center", marginBottom: "50px" }}>
              <h2
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "clamp(24px, 3.5vw, 36px)",
                  fontWeight: 800,
                  color: "var(--color-text-bright)",
                  letterSpacing: "-0.02em",
                  marginBottom: "12px",
                }}
              >
                Engineering Autonomous Enterprise Operations
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  color: "var(--color-text-muted)",
                  maxWidth: "640px",
                  margin: "0 auto",
                  lineHeight: 1.6,
                }}
              >
                ScalePods executive resources are authored directly from real deployments across US, UAE, and global industrial, real estate, and professional services firms.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "28px" }}>
              <div
                style={{
                  background: isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.8)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "16px",
                  padding: "32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-text-bright)", margin: 0 }}>
                  1. Architectural Blueprints
                </h3>
                <p style={{ fontSize: "14px", color: "var(--color-text-body)", lineHeight: 1.6, margin: 0 }}>
                  Move past vague AI hype with exact system topology diagrams, trigger-action maps, and API integration architectures connecting CRMs, ERPs, and multimodal AI agents.
                </p>
              </div>

              <div
                style={{
                  background: isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.8)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "16px",
                  padding: "32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-text-bright)", margin: 0 }}>
                  2. Hard ROI &amp; Metric Benchmarks
                </h3>
                <p style={{ fontSize: "14px", color: "var(--color-text-body)", lineHeight: 1.6, margin: 0 }}>
                  Analyze documented operational outcomes: 80% reduction in recruiter resume screening, sub-2-minute lead response rates, and 95% faster purchase order reconciliation.
                </p>
              </div>

              <div
                style={{
                  background: isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.8)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "16px",
                  padding: "32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-text-bright)", margin: 0 }}>
                  3. 90-Day Implementation Roadmaps
                </h3>
                <p style={{ fontSize: "14px", color: "var(--color-text-body)", lineHeight: 1.6, margin: 0 }}>
                  Step-by-step phased execution frameworks to audit internal operational friction, prioritize pilot workflows, and deploy production automation with human-in-the-loop governance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section style={{ padding: "80px 0 120px 0", borderTop: "1px solid var(--color-border-faint)" }}>
          <div style={{ maxWidth: "880px", margin: "0 auto", padding: "0 24px" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <h2
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "clamp(24px, 3.5vw, 36px)",
                  fontWeight: 800,
                  color: "var(--color-text-bright)",
                  letterSpacing: "-0.02em",
                  marginBottom: "12px",
                }}
              >
                Frequently Asked Questions
              </h2>
              <p style={{ fontSize: "15px", color: "var(--color-text-muted)", margin: 0 }}>
                Everything you need to know about accessing and applying ScalePods research.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  background: isDark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.7)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "12px",
                  padding: "24px",
                }}
              >
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px" }}>
                  Are these executive playbooks and frameworks completely free to download?
                </h3>
                <p style={{ fontSize: "14px", color: "var(--color-text-body)", lineHeight: 1.6, margin: 0 }}>
                  Yes. All eBooks, architecture guides, and frameworks in the ScalePods Executive Knowledge Hub are 100% free for founders, operations leaders, and technology executives.
                </p>
              </div>

              <div
                style={{
                  background: isDark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.7)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "12px",
                  padding: "24px",
                }}
              >
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px" }}>
                  Who should read the AI Employees and HR Automation guides?
                </h3>
                <p style={{ fontSize: "14px", color: "var(--color-text-body)", lineHeight: 1.6, margin: 0 }}>
                  These resources are tailored for CEOs, COOs, Chief People Officers, and VP/Director-level leaders evaluating how autonomous agentic workflows can remove headcount dependencies and eliminate repetitive administrative work.
                </p>
              </div>

              <div
                style={{
                  background: isDark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.7)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "12px",
                  padding: "24px",
                }}
              >
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px" }}>
                  Can ScalePods help customize these blueprints for our specific tech stack?
                </h3>
                <p style={{ fontSize: "14px", color: "var(--color-text-body)", lineHeight: 1.6, margin: 0 }}>
                  Yes. While these guides provide generalizable enterprise patterns, ScalePods engineers custom turn-key solutions tailored to your exact CRM, ERP, ATS, database, and internal business logic. You can schedule a complimentary workflow audit via our Contact page.
                </p>
              </div>
            </div>
          </div>
        </section>
      </BeamsBackground>
    </div>
  );
}

