"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Search, Mail, ArrowRight, BookOpen } from "lucide-react";
import { LinkedinIcon } from "@/components/Icons";
import { useTheme } from "@/components/providers/ThemeProvider";
import { BeamsBackground } from "@/components/ui/beams-background";

export default function ResourcesPage() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [activeFormat, setActiveFormat] = useState("eBook");
  const [searchQuery, setSearchQuery] = useState("");

  const formats = [
    { name: "eBook", count: 2, active: true }
  ];

  const ebooks = [
    {
      id: "ai-employees-digital-workforce",
      slug: "ai-employees-digital-workforce",
      badge: "EBOOK",
      title: "AI Employees: Meet the Digital Workforce That Never Sleeps, Never Forgets, and Never Misses a Deadline",
      date: "AUGUST 2026",
      coverImage: "/images/resources/ai_employees_ebook_cover.png",
      href: "/resources/ebooks/ai-employees-digital-workforce",
      description: "Meet Alex, Maya, Harper, and Orion – your AI Sales, Marketing, HR, and Operations employees – and see how an AI-powered workforce can run alongside your team."
    },
    {
      id: "ai-in-hr-executive-playbook",
      slug: "ai-in-hr-executive-playbook",
      badge: "EBOOK",
      title: "AI in HR: The Executive Playbook for Building an AI-First HR Organization",
      date: "JULY 2026",
      coverImage: "/images/resources/ai_in_hr_ebook_cover.png",
      href: "/resources/ebooks/ai-in-hr-executive-playbook",
      description: "Rebuild your HR operating model around intelligence. Includes proprietary maturity model, 90-day blueprint, and tech stack architecture."
    }
  ];

  const filteredEbooks = ebooks.filter(b => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ background: "var(--color-bg-page)", minHeight: "100vh", color: "var(--color-text-body)" }}>
      <BeamsBackground hues={[200, 210, 225]} intensity="strong">

      {/* Top Section / Header */}
      <section style={{ paddingTop: "140px", paddingBottom: "40px", borderBottom: "1px solid var(--color-border-faint)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          
          {/* Top Micro-Header */}
          <div style={{
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
            textTransform: "uppercase"
          }}>
            <BookOpen size={14} />
            <span>Executive Knowledge Hub</span>
          </div>

          <h1 style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 800,
            color: "var(--color-text-bright)",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            marginBottom: "16px"
          }}>
            Executive Resources &amp; Automation Playbooks
          </h1>

          <p style={{
            fontSize: "18px",
            color: "var(--color-text-muted)",
            maxWidth: "720px",
            margin: "0 auto",
            lineHeight: 1.6
          }}>
            Practical frameworks, technical blueprints, and executive guides designed to help enterprise leaders eliminate manual friction, modernize core operations, and deploy autonomous AI ecosystems.
          </p>
        </div>
      </section>

      {/* Main Content Layout (Sidebar + Cards Grid) */}
      <section style={{ padding: "60px 0 120px 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: "48px" }} className="resources-layout">
            
            {/* Left Sidebar */}
            <aside style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
              {/* Formats Section */}
              <div>
                <h3 style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "var(--color-text-faint)",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                  fontFamily: "var(--font-inter), sans-serif"
                }}>
                  FORMATS
                </h3>

                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                  {formats.map((fmt) => {
                    const isActive = activeFormat === fmt.name;
                    return (
                      <li key={fmt.name}>
                        <button
                          onClick={() => setActiveFormat(fmt.name)}
                          style={{
                            width: "100%",
                            textAlign: "left",
                            padding: "10px 14px",
                            borderRadius: "8px",
                            fontSize: "14px",
                            fontWeight: isActive ? 600 : 400,
                            color: isActive ? "var(--color-text-bright)" : "var(--color-text-muted)",
                            background: isActive 
                              ? (isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(15, 23, 42, 0.06)")
                              : "transparent",
                            border: "none",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between"
                          }}
                        >
                          <span>{fmt.name}</span>
                          {fmt.count > 0 && (
                            <span style={{ 
                              fontSize: "11px", 
                              opacity: 0.6, 
                              background: "rgba(255, 255, 255, 0.1)", 
                              padding: "2px 6px", 
                              borderRadius: "10px" 
                            }}>
                              {fmt.count}
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </aside>

            {/* Right Cards Grid */}
            <main>
              {filteredEbooks.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 0", color: "var(--color-text-faint)" }}>
                  No resources found matching your search.
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "32px" }}>
                  {filteredEbooks.map((book) => (
                    <Link 
                      key={book.id} 
                      href={book.href}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="premium-card group" style={{
                        border: "1px solid var(--color-border)",
                        borderRadius: "16px",
                        background: isDark ? "var(--color-bg-card-alt)" : "#ffffff",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                        boxShadow: isDark ? "0 4px 20px rgba(0,0,0,0.2)" : "0 4px 20px rgba(15,23,42,0.03)"
                      }}>
                        {/* Card Content Padding */}
                        <div style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "12px" }}>
                          
                          {/* Badge */}
                          <div style={{ display: "inline-block" }}>
                            <span style={{
                              fontSize: "11px",
                              fontWeight: 700,
                              letterSpacing: "0.08em",
                              padding: "4px 10px",
                              borderRadius: "4px",
                              background: isDark ? "rgba(109, 182, 255, 0.12)" : "rgba(15, 23, 42, 0.06)",
                              color: isDark ? "#6DB6FF" : "#0f172a",
                              textTransform: "uppercase"
                            }}>
                              {book.badge}
                            </span>
                          </div>

                          {/* Title */}
                          <h2 style={{
                            fontFamily: "var(--font-inter), sans-serif",
                            fontSize: "20px",
                            fontWeight: 700,
                            color: "var(--color-text-bright)",
                            lineHeight: 1.35,
                            margin: 0,
                            letterSpacing: "-0.01em"
                          }}>
                            {book.title}
                          </h2>

                          {/* Date */}
                          <div style={{
                            fontSize: "12px",
                            fontWeight: 600,
                            letterSpacing: "0.05em",
                            color: "var(--color-text-faint)",
                            textTransform: "uppercase"
                          }}>
                            {book.date}
                          </div>
                        </div>

                        {/* Cover Image Container */}
                        <div style={{
                          position: "relative",
                          width: "100%",
                          height: "220px",
                          overflow: "hidden",
                          borderTop: "1px solid var(--color-border-faint)",
                          marginTop: "auto"
                        }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={book.coverImage.replace(/\.(png|jpg|jpeg)$/, '.webp')}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = book.coverImage;
                            }}
                            alt={book.title}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                              transition: "transform 0.5s ease"
                            }}
                            className="group-hover:scale-105"
                          />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </main>

          </div>
        </div>
      </section>

      {/* Informative Value Section: Inside ScalePods Playbooks */}
      <section style={{ padding: "80px 0", borderTop: "1px solid var(--color-border-faint)", background: isDark ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.4)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <h2 style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(24px, 3.5vw, 36px)",
              fontWeight: 800,
              color: "var(--color-text-bright)",
              letterSpacing: "-0.02em",
              marginBottom: "12px"
            }}>
              Engineering Autonomous Enterprise Operations
            </h2>
            <p style={{ fontSize: "16px", color: "var(--color-text-muted)", maxWidth: "640px", margin: "0 auto", lineHeight: 1.6 }}>
              ScalePods executive resources are authored directly from real deployments across US, UAE, and global industrial, real estate, and professional services firms.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "28px" }}>
            <div style={{
              background: isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.8)",
              border: "1px solid var(--color-border)",
              borderRadius: "16px",
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              gap: "12px"
            }}>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-text-bright)", margin: 0 }}>
                1. Architectural Blueprints
              </h3>
              <p style={{ fontSize: "14px", color: "var(--color-text-body)", lineHeight: 1.6, margin: 0 }}>
                Move past vague AI hype with exact system topology diagrams, trigger-action maps, and API integration architectures connecting CRMs, ERPs, and multimodal AI agents.
              </p>
            </div>

            <div style={{
              background: isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.8)",
              border: "1px solid var(--color-border)",
              borderRadius: "16px",
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              gap: "12px"
            }}>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-text-bright)", margin: 0 }}>
                2. Hard ROI &amp; Metric Benchmarks
              </h3>
              <p style={{ fontSize: "14px", color: "var(--color-text-body)", lineHeight: 1.6, margin: 0 }}>
                Analyze documented operational outcomes: 80% reduction in recruiter resume screening, sub-2-minute lead response rates, and 95% faster purchase order reconciliation.
              </p>
            </div>

            <div style={{
              background: isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.8)",
              border: "1px solid var(--color-border)",
              borderRadius: "16px",
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              gap: "12px"
            }}>
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
            <h2 style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(24px, 3.5vw, 36px)",
              fontWeight: 800,
              color: "var(--color-text-bright)",
              letterSpacing: "-0.02em",
              marginBottom: "12px"
            }}>
              Frequently Asked Questions
            </h2>
            <p style={{ fontSize: "15px", color: "var(--color-text-muted)", margin: 0 }}>
              Everything you need to know about accessing and applying ScalePods research.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ background: isDark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.7)", border: "1px solid var(--color-border)", borderRadius: "12px", padding: "24px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px" }}>
                Are these executive playbooks and frameworks completely free to download?
              </h3>
              <p style={{ fontSize: "14px", color: "var(--color-text-body)", lineHeight: 1.6, margin: 0 }}>
                Yes. All eBooks, architecture guides, and frameworks in the ScalePods Executive Knowledge Hub are 100% free for founders, operations leaders, and technology executives.
              </p>
            </div>

            <div style={{ background: isDark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.7)", border: "1px solid var(--color-border)", borderRadius: "12px", padding: "24px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px" }}>
                Who should read the AI Employees and HR Automation guides?
              </h3>
              <p style={{ fontSize: "14px", color: "var(--color-text-body)", lineHeight: 1.6, margin: 0 }}>
                These resources are tailored for CEOs, COOs, Chief People Officers, and VP/Director-level leaders evaluating how autonomous agentic workflows can remove headcount dependencies and eliminate repetitive administrative work.
              </p>
            </div>

            <div style={{ background: isDark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.7)", border: "1px solid var(--color-border)", borderRadius: "12px", padding: "24px" }}>
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
