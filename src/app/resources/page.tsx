"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Search, Mail, ArrowRight, BookOpen } from "lucide-react";
import { LinkedinIcon } from "@/components/Icons";
import { useTheme } from "@/components/providers/ThemeProvider";

export default function ResourcesPage() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [activeFormat, setActiveFormat] = useState("eBook");
  const [searchQuery, setSearchQuery] = useState("");

  const formats = [
    { name: "eBook", count: 1, active: true }
  ];

  const ebooks = [
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
      <Navbar />

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
            <span>ScalePods E - Books</span>
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
            ScalePods E - Books
          </h1>

          <p style={{
            fontSize: "18px",
            color: "var(--color-text-muted)",
            maxWidth: "680px",
            margin: "0 auto",
            lineHeight: 1.6
          }}>
            Executive E - Books and guides on AI, automation, and the future of work.
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
                            src="/images/resources/ai_in_hr_ebook_cover.webp"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/images/resources/ai_in_hr_ebook_cover.png";
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

      <Footer />
    </div>
  );
}
