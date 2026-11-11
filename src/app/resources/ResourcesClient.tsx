"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Search, X } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { BeamsBackground } from "@/components/ui/beams-background";
import type { ResourceFormat, ResourceItem } from "@/lib/resources";

interface ResourcesClientProps {
  items: ResourceItem[];
  activeFormat: ResourceFormat;
}

const formatMeta: Record<
  ResourceFormat,
  { badge: string; heading: string; subtitle: string; label: string; href: string }
> = {
  all: {
    badge: "Executive Knowledge Hub",
    heading: "Executive Resources & Automation Playbooks",
    subtitle:
      "Practical frameworks, enterprise case studies, executive eBooks, and actionable automation guides engineered for modern leadership teams.",
    label: "All Resources",
    href: "/resources",
  },
  ebook: {
    badge: "Executive eBooks",
    heading: "ScalePods eBooks & Playbooks",
    subtitle:
      "In-depth executive playbooks, AI maturity models, and 90-day implementation blueprints for scaling a digital workforce.",
    label: "Executive eBooks",
    href: "/resources/ebooks",
  },
  "case-study": {
    badge: "Case Studies",
    heading: "Real-World AI Automation in Action",
    subtitle:
      "Explore how enterprises deploy ScalePods autonomous AI workflows to eliminate operational bottlenecks, slash response times, and scale revenue.",
    label: "Case Studies",
    href: "/resources/case-studies",
  },
  blog: {
    badge: "Blog & Articles",
    heading: "Latest News & Automation Articles",
    subtitle:
      "Practical architecture guides, ROI benchmarks, and operating strategies for enterprise AI and workflow automation.",
    label: "Blog & Articles",
    href: "/resources/blog",
  },
};

function getCtaLabel(format: ResourceItem["format"]): string {
  if (format === "ebook") return "Download eBook";
  if (format === "case-study") return "View Case Study";
  return "Read Article";
}

/** Shared interactive knowledge hub rendered by /resources and /resources/{ebooks,case-studies,blog}. */
export default function ResourcesClient({ items, activeFormat }: ResourcesClientProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [searchQuery, setSearchQuery] = useState("");

  const counts = useMemo(() => {
    let ebook = 0;
    let caseStudy = 0;
    let blog = 0;
    for (const item of items) {
      if (item.format === "ebook") ebook++;
      else if (item.format === "case-study") caseStudy++;
      else blog++;
    }
    return {
      all: items.length,
      ebook,
      "case-study": caseStudy,
      blog,
    };
  }, [items]);

  const navFormats: { id: ResourceFormat; label: string; href: string; count: number }[] = [
    { id: "all", label: "All Resources", href: "/resources", count: counts.all },
    { id: "ebook", label: "Executive eBooks", href: "/resources/ebooks", count: counts.ebook },
    { id: "case-study", label: "Case Studies", href: "/resources/case-studies", count: counts["case-study"] },
    { id: "blog", label: "Blog & Articles", href: "/resources/blog", count: counts.blog },
  ];

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return items.filter((item) => {
      if (activeFormat !== "all" && item.format !== activeFormat) return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.badge.toLowerCase().includes(q) ||
        (item.category ? item.category.toLowerCase().includes(q) : false)
      );
    });
  }, [items, activeFormat, searchQuery]);

  const getBadgeStyle = (format: ResourceItem["format"]): React.CSSProperties => {
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
        color: isDark ? "#6DB6FF" : "#1D4ED8",
        border: isDark ? "1px solid rgba(109, 182, 255, 0.25)" : "1px solid rgba(37, 99, 235, 0.2)",
      };
    }
    return {
      background: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(15, 23, 42, 0.06)",
      color: "var(--color-text-bright)",
      border: "1px solid var(--color-border)",
    };
  };

  const currentHero = formatMeta[activeFormat];

  return (
    <div style={{ background: "var(--color-bg-page)", minHeight: "100vh", color: "var(--color-text-body)" }}>
      <BeamsBackground hues={[200, 210, 225]} intensity="strong">
        {/* Top Section / Header */}
        <section style={{ paddingTop: "140px", paddingBottom: "48px", borderBottom: "1px solid var(--color-border-faint)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
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
              <span>{currentHero.badge}</span>
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
              {currentHero.heading}
            </h1>

            <p
              style={{
                fontSize: "18px",
                color: "var(--color-text-muted)",
                maxWidth: "740px",
                margin: "0 auto 32px auto",
                lineHeight: 1.6,
              }}
            >
              {currentHero.subtitle}
            </p>

            {/* Search Input */}
            <div style={{ maxWidth: "480px", margin: "0 auto", position: "relative" }}>
              <Search
                size={18}
                style={{
                  position: "absolute",
                  left: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--color-text-muted)",
                  pointerEvents: "none",
                }}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${currentHero.label.toLowerCase()}...`}
                aria-label="Search resources"
                style={{
                  width: "100%",
                  padding: "13px 44px 13px 44px",
                  borderRadius: "12px",
                  fontSize: "14.5px",
                  fontFamily: "var(--font-inter), sans-serif",
                  color: "var(--color-text-bright)",
                  background: isDark ? "rgba(255, 255, 255, 0.04)" : "#ffffff",
                  border: "1px solid var(--color-border)",
                  outline: "none",
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                    color: "var(--color-text-muted)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    padding: "4px",
                  }}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Main Content Layout (Sidebar + Cards Grid) */}
        <section style={{ padding: "56px 0 110px 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
            {/* Mobile Format Navigation */}
            <div className="flex lg:hidden flex-wrap gap-2 mb-8">
              {navFormats.map((fmt) => {
                const isActive = activeFormat === fmt.id;
                return (
                  <Link
                    key={fmt.id}
                    href={fmt.href}
                    style={{
                      padding: "8px 14px",
                      borderRadius: "9999px",
                      fontSize: "13px",
                      fontWeight: isActive ? 600 : 500,
                      textDecoration: "none",
                      color: isActive ? "var(--color-text-bright)" : "var(--color-text-muted)",
                      background: isActive
                        ? isDark
                          ? "rgba(255, 255, 255, 0.1)"
                          : "rgba(15, 23, 42, 0.08)"
                        : isDark
                          ? "rgba(255, 255, 255, 0.03)"
                          : "rgba(15, 23, 42, 0.03)",
                      border: "1px solid var(--color-border)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span>{fmt.label}</span>
                    <span style={{ fontSize: "11px", opacity: 0.65 }}>{fmt.count}</span>
                  </Link>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12 items-start">
              {/* Left Sticky Desktop Sidebar */}
              <aside className="hidden lg:flex flex-col gap-9 sticky top-28">
                <div>
                  <h2
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      color: "var(--color-text-faint)",
                      textTransform: "uppercase",
                      marginBottom: "16px",
                      fontFamily: "var(--font-inter), sans-serif",
                    }}
                  >
                    FORMATS
                  </h2>

                  <nav aria-label="Resource categories">
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                      {navFormats.map((fmt) => {
                        const isActive = activeFormat === fmt.id;
                        return (
                          <li key={fmt.id}>
                            <Link
                              href={fmt.href}
                              style={{
                                width: "100%",
                                textAlign: "left",
                                padding: "10px 14px",
                                borderRadius: "8px",
                                fontSize: "14px",
                                fontWeight: isActive ? 600 : 400,
                                color: isActive ? "var(--color-text-bright)" : "var(--color-text-muted)",
                                background: isActive
                                  ? isDark
                                    ? "rgba(255, 255, 255, 0.08)"
                                    : "rgba(15, 23, 42, 0.06)"
                                  : "transparent",
                                border: "none",
                                textDecoration: "none",
                                transition: "all 0.2s ease",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <span>{fmt.label}</span>
                              {fmt.count > 0 && (
                                <span
                                  style={{
                                    fontSize: "11px",
                                    opacity: 0.7,
                                    background: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(15, 23, 42, 0.08)",
                                    padding: "2px 7px",
                                    borderRadius: "10px",
                                  }}
                                >
                                  {fmt.count}
                                </span>
                              )}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                </div>
              </aside>

              {/* Right Cards Grid */}
              <main>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "24px",
                    fontSize: "13px",
                    color: "var(--color-text-muted)",
                  }}
                >
                  <span>
                    Showing <strong style={{ color: "var(--color-text-bright)" }}>{filteredItems.length}</strong>{" "}
                    {filteredItems.length === 1 ? "resource" : "resources"}
                  </span>
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "var(--color-blue-mid)",
                        cursor: "pointer",
                        fontSize: "13px",
                        fontWeight: 500,
                      }}
                    >
                      Clear search
                    </button>
                  )}
                </div>

                {filteredItems.length === 0 ? (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "72px 24px",
                      color: "var(--color-text-faint)",
                      border: "1px dashed var(--color-border)",
                      borderRadius: "16px",
                    }}
                  >
                    No resources found matching your search.
                  </div>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "28px" }}>
                    {filteredItems.map((item) => {
                      const isSvgCover = item.coverImage.toLowerCase().endsWith(".svg");
                      return (
                        <Link key={item.id} href={item.href} style={{ textDecoration: "none", height: "100%" }}>
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
                              boxShadow: isDark ? "0 4px 20px rgba(0,0,0,0.2)" : "0 4px 20px rgba(15,23,42,0.03)",
                            }}
                          >
                            {/* Card Body */}
                            <div style={{ padding: "26px", display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
                              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
                                <span
                                  style={{
                                    fontSize: "11px",
                                    fontWeight: 700,
                                    letterSpacing: "0.06em",
                                    padding: "4px 10px",
                                    borderRadius: "6px",
                                    textTransform: "uppercase",
                                    ...getBadgeStyle(item.format),
                                  }}
                                >
                                  {item.badge}
                                </span>
                                <span
                                  style={{
                                    fontSize: "12px",
                                    fontWeight: 500,
                                    color: "var(--color-text-faint)",
                                  }}
                                >
                                  {item.date}
                                </span>
                              </div>

                              <h2
                                style={{
                                  fontFamily: "var(--font-inter), sans-serif",
                                  fontSize: "19px",
                                  fontWeight: 700,
                                  color: "var(--color-text-bright)",
                                  lineHeight: 1.35,
                                  margin: 0,
                                  letterSpacing: "-0.01em",
                                }}
                              >
                                {item.title}
                              </h2>

                              {item.description && (
                                <p
                                  style={{
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

                              <div
                                style={{
                                  marginTop: "auto",
                                  paddingTop: "8px",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "4px",
                                  fontSize: "13px",
                                  fontWeight: 600,
                                  color: "var(--color-text-bright)",
                                }}
                              >
                                <span>{getCtaLabel(item.format)}</span>
                                <ArrowUpRight size={15} />
                              </div>
                            </div>

                            {/* Cover Image Container */}
                            <div
                              style={{
                                position: "relative",
                                width: "100%",
                                height: "210px",
                                overflow: "hidden",
                                borderTop: "1px solid var(--color-border-faint)",
                                background: isSvgCover
                                  ? isDark
                                    ? "rgba(255, 255, 255, 0.03)"
                                    : "rgba(15, 23, 42, 0.03)"
                                  : undefined,
                                padding: isSvgCover ? "28px" : undefined,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={item.coverImage}
                                alt={item.title}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: isSvgCover ? "contain" : "cover",
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

