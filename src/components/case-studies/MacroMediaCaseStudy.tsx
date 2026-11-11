"use client";

import React from "react";
import Link from "next/link";
import { 
  ArrowUpRight, 
  Workflow, 
  Layers, 
  ShieldCheck, 
  BarChart3, 
  Cpu, 
  Info,
  CheckCircle2, 
  Clock, 
  TrendingDown, 
  Database, 
  FileCheck, 
  AlertTriangle, 
  Lock, 
  History, 
  Zap,
  Users,
  CalendarCheck
} from "lucide-react";
import AnimatedMetric from "@/components/ui/AnimatedMetric";
import BlogFaqAccordion from "@/components/ui/BlogFaqAccordion";

interface MacroMediaProps {
  faqs?: Array<{ q: string; a: string }>;
}

const defaultFaqs = [
  {
    q: "What was the core problem with Macro Media's original monthly close tracker?",
    a: "The original tracker was a single HTML file that saved data exclusively in browser localStorage. Because there was no shared database, when one team member updated a task, other members in Los Angeles or the Philippines could not see the updates, forcing them to exchange files manually."
  },
  {
    q: "What is Macro Studio?",
    a: "Macro Studio is a custom multi-user web application engineered by ScalePods for Macro Media's finance and accounting team. It centralizes operational reference guides, charts, workflows, and a live monthly close tracker with real-time updates and role-based security."
  },
  {
    q: "How does Macro Studio handle data synchronization across global teams?",
    a: "Macro Studio connects to a centralized cloud database. Whenever a team member in Los Angeles or the Philippines updates task statuses, ownership, or deadlines, changes sync across all active users in under two seconds."
  },
  {
    q: "How does the application protect sensitive financial information?",
    a: "The platform integrates Clerk authentication, restricting access strictly to verified corporate emails. It enforces Role-Based Access Control (RBAC) with granular Edit and View permissions."
  },
  {
    q: "How did task ownership improve after implementing Macro Studio?",
    a: "In the original setup, task ownership and due dates were only partially tracked. With Macro Studio, 100% of approximately 90 monthly close tasks have explicit owners, deadlines, and status indicators."
  },
  {
    q: "What was the phased approach to automation used by ScalePods?",
    a: "ScalePods prioritized getting the core application right first: centralized database storage, authentication, user roles, and task tracking. Once the daily workflow was stable, automated reminder and approval sequences were scheduled for subsequent rollout."
  }
];

export default function MacroMediaCaseStudy({ faqs }: MacroMediaProps) {
  const activeFaqs = faqs && faqs.length > 0 ? faqs : defaultFaqs;

  return (
    <>
      <style>{`
        .macro-workflow-dark {
          display: none !important;
        }
        .macro-workflow-light {
          display: block !important;
        }
        .dark .macro-workflow-dark,
        [data-theme="dark"] .macro-workflow-dark {
          display: block !important;
        }
        .dark .macro-workflow-light,
        [data-theme="dark"] .macro-workflow-light {
          display: none !important;
        }
        .joaquin-overlay {
          background: rgba(255, 255, 255, 0.95);
          color: #0f172a;
          border: 1px solid rgba(15, 23, 42, 0.08);
        }
        .dark .joaquin-overlay,
        [data-theme="dark"] .joaquin-overlay {
          background: rgba(15, 23, 42, 0.95) !important;
          color: #ffffff !important;
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
        }
        .joaquin-name {
          color: #0f172a;
        }
        .dark .joaquin-name,
        [data-theme="dark"] .joaquin-name {
          color: #ffffff !important;
        }
        .joaquin-title {
          color: #475569;
        }
        .dark .joaquin-title,
        [data-theme="dark"] .joaquin-title {
          color: #94a3b8 !important;
        }
      `}</style>

      {/* ── Top section: Title, Stats, Testimonial (Full Width) ── */}
      <div style={{ marginTop: "40px" }} className="px-6 md:px-10">
        {/* Category */}
        <div style={{
          fontSize: "11px",
          fontWeight: 600,
          color: "var(--color-text-bright)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: "16px"
        }}>
          CASE STUDY
        </div>

        {/* H1 Headline */}
        <h1 style={{
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: "clamp(24px, 3.5vw, 42px)",
          fontWeight: 700,
          color: "var(--color-text-bright)",
          lineHeight: 1.25,
          marginBottom: "28px",
          letterSpacing: "-0.02em",
          textAlign: "left"
        }}>
          How MACRO Rebuilt Its Finance Workflow &amp; Slashed Close Coordination by 30%
        </h1>

        {/* Executive Summary Intro */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          marginBottom: "36px",
          color: "var(--color-text-muted)",
          fontSize: "16px",
          lineHeight: 1.65
        }}>
          <p style={{ margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
            Macro Media&apos;s accounting and finance team needed a better way to manage its monthly close process. The tracker and operational reference guide lived in a single HTML file, making it hard for people to work with the same information across locations.
          </p>
          <p style={{ margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
            To address these challenges, ScalePods transformed the original prototype into <strong>Macro Studio</strong>, a hosted, multi-user web application where authorized team members can access operational reference guides, update tasks, and track close deadlines in one shared location.
          </p>
          <p style={{ margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
            By replacing client-side browser storage with a centralized cloud database, introducing Clerk authentication with role-based access, and establishing complete task ownership for ~90 monthly close items, Macro Media eliminated manual file sharing between Los Angeles and the Philippines, achieving sub-2-second sync times and cutting coordination time by 30%.
          </p>
          <p style={{ margin: 0, fontWeight: 500, color: "var(--color-text-bright)", textAlign: "justify", textJustify: "inter-word" }}>
            The outcome: turning an isolated desktop prototype into an enterprise-grade financial close management engine built for collaborative scale.
          </p>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "var(--color-border)", marginBottom: "32px" }} />

        {/* Running Metrics Flex Container */}
        <div 
          style={{ 
            padding: "8px 0", 
            display: "flex", 
            justifyContent: "space-between",
            alignItems: "flex-start",
            width: "100%"
          }}
          className="flex-wrap md:flex-nowrap gap-y-6 md:gap-y-0"
        >
          {/* Metric 1 */}
          <div className="w-[48%] md:w-auto flex flex-col items-start text-left">
            <div style={{ fontSize: "clamp(32px, 3.5vw, 42px)", fontWeight: 700, color: "var(--color-blue-mid)", marginBottom: "8px", letterSpacing: "-0.02em" }}>
              <AnimatedMetric value={6} suffix="" /> Users
            </div>
            <div style={{ fontSize: "14.5px", color: "var(--color-text-muted)", lineHeight: 1.4, maxWidth: "180px" }}>
              Working concurrently on one shared close tracker
            </div>
          </div>

          {/* Metric 2 */}
          <div className="w-[48%] md:w-auto flex flex-col items-end md:items-center text-right md:text-center">
            <div style={{ fontSize: "clamp(32px, 3.5vw, 42px)", fontWeight: 700, color: "var(--color-blue-mid)", marginBottom: "8px", letterSpacing: "-0.02em" }}>
              &lt; 2 sec
            </div>
            <div style={{ fontSize: "14.5px", color: "var(--color-text-muted)", lineHeight: 1.4, maxWidth: "180px" }}>
              For task updates to sync across all users
            </div>
          </div>

          {/* Metric 3 */}
          <div className="w-[48%] md:w-auto flex flex-col items-start md:items-center text-left md:text-center">
            <div style={{ fontSize: "clamp(32px, 3.5vw, 42px)", fontWeight: 700, color: "var(--color-blue-mid)", marginBottom: "8px", letterSpacing: "-0.02em" }}>
              <AnimatedMetric value={100} suffix="%" />
            </div>
            <div style={{ fontSize: "14.5px", color: "var(--color-text-muted)", lineHeight: 1.4, maxWidth: "180px" }}>
              Of ~90 close tasks with assigned owners &amp; due dates
            </div>
          </div>

          {/* Metric 4 */}
          <div className="w-[48%] md:w-auto flex flex-col items-end text-right">
            <div style={{ fontSize: "clamp(32px, 3.5vw, 42px)", fontWeight: 700, color: "var(--color-blue-mid)", marginBottom: "8px", letterSpacing: "-0.02em" }}>
              ~<AnimatedMetric value={30} suffix="%" />
            </div>
            <div style={{ fontSize: "14.5px", color: "var(--color-text-muted)", lineHeight: 1.4, maxWidth: "180px" }}>
              Estimated reduction in close coordination time
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "var(--color-border)", marginTop: "32px", marginBottom: "48px" }} />
      </div>

      {/* ── Testimonial & Company Overview Card ── */}
      <div className="premium-card" style={{
        padding: "40px",
        marginBottom: "64px",
        display: "flex",
        flexDirection: "column",
        gap: "32px"
      }}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Column: Image with overlay */}
          <div className="md:col-span-5" style={{ position: "relative", width: "100%", aspectRatio: "1.15", borderRadius: "16px", overflow: "hidden" }}>
            <img
              src="/reviews/joaquin-cornejo-v2.webp"
              alt="Joaquin Cornejo - Controller at MACRO"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
            />
            {/* Name/Title overlay */}
            <div className="joaquin-overlay" style={{
              position: "absolute",
              bottom: "12px",
              left: "12px",
              right: "auto",
              maxWidth: "calc(100% - 24px)",
              borderRadius: "12px",
              padding: "12px 16px",
              backdropFilter: "blur(8px)"
            }}>
              <div className="joaquin-name" style={{ fontWeight: 700, fontSize: "15px", lineHeight: 1.2, marginBottom: "2px" }}>Joaquin Cornejo</div>
              <div className="joaquin-title" style={{ fontSize: "12px", fontWeight: 500 }}>Controller at MACRO</div>
            </div>
          </div>

          {/* Right Column: Statement & Logo */}
          <div className="md:col-span-7" style={{ paddingLeft: "8px", display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Logo & Company Name */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#0F172A",
                padding: "6px 14px",
                borderRadius: "10px",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)"
              }}>
                <img
                  src="/brands/macro-logo.svg"
                  alt="MACRO Logo"
                  style={{
                    height: "36px",
                    width: "auto",
                    objectFit: "contain"
                  }}
                />
              </div>
              <div style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-text-bright)" }}>
                MACRO (Los Angeles, USA)
              </div>
            </div>

            <blockquote style={{
              fontSize: "clamp(16px, 1.8vw, 20px)",
              fontWeight: 500,
              lineHeight: 1.6,
              color: "var(--color-text-bright)",
              fontStyle: "italic",
              margin: 0,
              textAlign: "left"
            }}>
              “Very fast and competent team. I got too busy with other work to keep up with their pace. I will rehire them once I free up.”
            </blockquote>

            <p style={{ fontSize: "13px", color: "var(--color-text-muted)", margin: 0 }}>
              &mdash; <strong>Joaquin Cornejo</strong>, Controller at MACRO
            </p>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "var(--color-border)" }} />

        {/* Company Info Footer */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* About (6 cols) */}
          <div className="md:col-span-6">
            <h4 style={{
              fontSize: "11px",
              fontWeight: 600,
              color: "var(--color-text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "8px"
            }}>
              About MACRO &amp; Macro Studio
            </h4>
            <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
              MACRO is a multi-platform media and entertainment company based in Los Angeles, representing voices of color across theatrical film, television, and digital media. ScalePods partnered with MACRO&apos;s finance leadership to engineer Macro Studio, centralizing its accounting operations, operational reference guides, and monthly financial close cycles into a single unified web platform.
            </p>
          </div>

          {/* Metadata Fields (3 cols) */}
          <div className="md:col-span-3" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <div style={{ fontSize: "10.5px", fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                  Client
                </div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-text-bright)" }}>
                  Joaquin Cornejo
                </div>
                <div style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>
                  Controller
                </div>
              </div>

              <div>
                <div style={{ fontSize: "10.5px", fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                  Location
                </div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-text-bright)" }}>
                  Los Angeles, USA
                </div>
                <div style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>
                  California
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <div style={{ fontSize: "10.5px", fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                  Product
                </div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-blue-mid)" }}>
                  Macro Studio
                </div>
              </div>

              <div>
                <div style={{ fontSize: "10.5px", fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                  Industry
                </div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-text-bright)" }}>
                  Media &amp; Entertainment
                </div>
              </div>
            </div>
          </div>

          {/* Core Capabilities (3 cols) */}
          <div className="md:col-span-3">
            <h4 style={{
              fontSize: "11px",
              fontWeight: 600,
              color: "var(--color-text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "12px"
            }}>
              Core Capabilities
            </h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              <Link
                href="/solution/ops-workflow-automation"
                style={{
                  fontSize: "12px",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  background: "var(--color-bg-card-alt)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-blue-mid)",
                  textDecoration: "none",
                  fontWeight: 600,
                  transition: "all 0.2s ease"
                }}
                className="hover:border-blue-400"
              >
                Operations Automation
              </Link>
              <Link
                href="/solution/sales-workflow-automation"
                style={{
                  fontSize: "12px",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  background: "var(--color-bg-card-alt)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-blue-mid)",
                  textDecoration: "none",
                  fontWeight: 600,
                  transition: "all 0.2s ease"
                }}
                className="hover:border-blue-400"
              >
                Workflow Management
              </Link>
              {["Monthly Close Tracker", "Clerk Authentication", "Role-Based Access", "Shared Database", "Maker-Checker Setup"].map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: "12px",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    background: "var(--color-bg-card-alt)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-text-muted)"
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content Container ── */}
      <div style={{ marginTop: "40px" }}>
        <div style={{ maxWidth: "100%", margin: "0 auto" }} className="px-6 md:px-10">

          {/* ── Challenges Section ── */}
          <div style={{ marginBottom: "80px" }}>
            <h2 style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(24px, 3vw, 32px)",
              fontWeight: 700,
              color: "var(--color-text-bright)",
              marginBottom: "16px",
              letterSpacing: "-0.02em"
            }}>
              The Challenges
            </h2>
            <p style={{
              fontSize: "16px",
              color: "var(--color-text-muted)",
              lineHeight: 1.65,
              marginBottom: "40px",
              maxWidth: "100%",
              textAlign: "justify",
              textJustify: "inter-word"
            }}>
              Managing an accurate, audit-compliant monthly financial close requires strict coordination across accounts receivable, accounts payable, payroll, journal entries, and reconciliation schedules. Before ScalePods, Macro Media depended on a single-user HTML prototype with browser localStorage, creating critical data silos, security vulnerabilities, and cross-border coordination delays.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Challenge Card 1 */}
              <div className="premium-card" style={{
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "16px"
              }}>
                <div style={{ width: "100%", height: "200px", borderRadius: "16px", overflow: "hidden" }}>
                  <img 
                    src="/images/case-studies/macro-media/challenge-single-html-tracker.png" 
                    alt="Monthly close tracker dashboard showing isolated single-user data in local storage" 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                  />
                </div>
                <div className="internal-panel" style={{ padding: "20px", flex: 1 }}>
                  <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    The Tracker Worked for One Person. The Team Needed More.
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Macro Media&apos;s monthly close tracker started as a single HTML file. It worked as an early prototype, but it was not built as a centralized system. Data was saved exclusively in browser localStorage, meaning there was no shared database. If someone marked a task complete, others could not see it, forcing the team to exchange files manually.
                  </p>
                </div>
              </div>

              {/* Challenge Card 2 */}
              <div className="premium-card" style={{
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "16px"
              }}>
                <div style={{ width: "100%", height: "200px", borderRadius: "16px", overflow: "hidden" }}>
                  <img 
                    src="/images/case-studies/macro-media/challenge-sensitive-information-ownership.png" 
                    alt="Monthly close calendar showing missing task owners and unauthenticated access risks" 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                  />
                </div>
                <div className="internal-panel" style={{ padding: "20px", flex: 1 }}>
                  <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    Sensitive Information Required More Protection &amp; Ownership
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Financial close data is strictly confidential, yet the original file lacked a login system. Furthermore, monthly close involves dozens of moving parts requiring designated owners, deadlines, and a maker-checker verification framework. The prototype only partially tracked ownership, making it hard to see who was responsible for what.
                  </p>
                </div>
              </div>

              {/* Challenge Card 3 */}
              <div className="premium-card" style={{
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "16px"
              }}>
                <div style={{ width: "100%", height: "200px", borderRadius: "16px", overflow: "hidden" }}>
                  <img 
                    src="/images/case-studies/macro-media/challenge-onshore-offshore-coordination.png" 
                    alt="Real-time task synchronization friction between onshore Los Angeles and offshore Philippines finance teams" 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                  />
                </div>
                <div className="internal-panel" style={{ padding: "20px", flex: 1 }}>
                  <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    Updates Needed for Teams in Different Locations
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Macro Media&apos;s finance operations span onshore staff in Los Angeles and offshore teams in the Philippines. Passing files back and forth across different time zones delayed an already time-sensitive financial close cycle. The team needed operations automation to make live task statuses instantly accessible to everyone with authorized access.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "var(--color-border)", marginBottom: "80px" }} />

          {/* ── The Solution Section ── */}
          <div style={{ marginBottom: "80px" }}>
            <h2 style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(24px, 3vw, 32px)",
              fontWeight: 700,
              color: "var(--color-text-bright)",
              marginBottom: "16px",
              letterSpacing: "-0.02em"
            }}>
              Our Solution: Turning the Prototype Into Macro Studio
            </h2>
            
            <p style={{
              fontSize: "16px",
              color: "var(--color-text-muted)",
              lineHeight: 1.65,
              marginBottom: "40px",
              maxWidth: "100%",
              textAlign: "justify",
              textJustify: "inter-word"
            }}>
              ScalePods rebuilt the fragile client-side HTML prototype into <strong>Macro Studio</strong>, a hosted multi-user web application applying{" "}
              <Link href="/solution/ops-workflow-automation" style={{ color: "var(--color-blue-mid)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                operations workflow automation
              </Link>{" "}
              and modern web architecture to give Macro Media a reliable, synchronized financial operating environment.
            </p>

            {/* Solution Block 1 */}
            <div className="premium-card" style={{ padding: "32px", marginBottom: "32px" }}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-6">
                  <div style={{ color: "var(--color-blue-mid)", marginBottom: "12px" }}>
                    <Workflow style={{ width: "32px", height: "32px" }} />
                  </div>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "12px" }}>
                    Turning the Prototype Into Macro Studio
                  </h3>
                  <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.6, textAlign: "justify", textJustify: "inter-word" }}>
                    ScalePods rebuilt the original HTML file as Macro Studio, a hosted multi-user web application engineered specifically for Macro Media&apos;s accounting and finance team. The platform integrates two essential components into one interface: an operational reference guide containing organizational charts, accounting policies, and workflows, alongside an interactive monthly close tracker for tasks, statuses, and deadlines.
                  </p>
                </div>
                <div className="md:col-span-6" style={{ borderRadius: "14px", overflow: "hidden" }}>
                  <img 
                    src="/images/case-studies/macro-media/solution-prototype-to-macro-studio.png" 
                    alt="Accounting and finance department org chart and operational guide in Macro Studio" 
                    style={{ width: "100%", height: "auto", display: "block" }} 
                  />
                </div>
              </div>
            </div>

            {/* Solution Block 2 */}
            <div className="premium-card" style={{ padding: "32px", marginBottom: "32px" }}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-6 order-2 md:order-1" style={{ borderRadius: "14px", overflow: "hidden" }}>
                  <img 
                    src="/images/case-studies/macro-media/solution-centralized-database.png" 
                    alt="Shared cloud database replacing file swapping for team collaboration in Macro Studio" 
                    style={{ width: "100%", height: "auto", display: "block" }} 
                  />
                </div>
                <div className="md:col-span-6 order-1 md:order-2">
                  <div style={{ color: "var(--color-blue-mid)", marginBottom: "12px" }}>
                    <Database style={{ width: "32px", height: "32px" }} />
                  </div>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "12px" }}>
                    A Shared Database Replaced Exchanging Files
                  </h3>
                  <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.6, textAlign: "justify", textJustify: "inter-word" }}>
                    The decisive technical upgrade was migrating from browser-based localStorage to a centralized, cloud-hosted relational database. Now, every authorized team member logs into a single source of truth. Task updates, status changes, and completion timestamps synchronize across all active users in under two seconds, completely eliminating manual file exchanges between Los Angeles and Manila.
                  </p>
                </div>
              </div>
            </div>

            {/* Solution Block 3 */}
            <div className="premium-card" style={{ padding: "32px", marginBottom: "32px" }}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-6">
                  <div style={{ color: "var(--color-blue-mid)", marginBottom: "12px" }}>
                    <Lock style={{ width: "32px", height: "32px" }} />
                  </div>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "12px" }}>
                    Login and User Roles Were Built Into the Application
                  </h3>
                  <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.6, textAlign: "justify", textJustify: "inter-word" }}>
                    Addressing the lack of security in the prototype, ScalePods implemented Clerk for corporate authentication and Role-Based Access Control (RBAC). Access is restricted strictly to verified company emails, with clear separation between Edit roles (for accounting staff making updates) and View roles (for management and oversight), ensuring confidential financial workflows remain protected.
                  </p>
                </div>
                <div className="md:col-span-6" style={{ borderRadius: "14px", overflow: "hidden" }}>
                  <img 
                    src="/images/case-studies/macro-media/solution-clerk-authentication-roles.png" 
                    alt="Secure login and role-based access control interface in Macro Studio with Edit and View permissions" 
                    style={{ width: "100%", height: "auto", display: "block" }} 
                  />
                </div>
              </div>
            </div>

            {/* Solution Block 4 */}
            <div className="premium-card" style={{ padding: "32px", marginBottom: "32px" }}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-6 order-2 md:order-1" style={{ borderRadius: "14px", overflow: "hidden" }}>
                  <img 
                    src="/images/case-studies/macro-media/solution-monthly-close-tasks.png" 
                    alt="Monthly close task manager showing 100% assigned task owners, due dates, and completion progress" 
                    style={{ width: "100%", height: "auto", display: "block" }} 
                  />
                </div>
                <div className="md:col-span-6 order-1 md:order-2">
                  <div style={{ color: "var(--color-blue-mid)", marginBottom: "12px" }}>
                    <CalendarCheck style={{ width: "32px", height: "32px" }} />
                  </div>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "12px" }}>
                    A Clearer View of Monthly Close Tasks
                  </h3>
                  <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.6, textAlign: "justify", textJustify: "inter-word" }}>
                    Task ownership and accountability improved dramatically. Out of approximately 90 monthly close tasks tracked, 100% now have designated owners, due dates, and status badges. The platform enables a transparent maker-checker verification system, allowing controllers and managers to review real-time progress instead of spending hours chasing updates.
                  </p>
                </div>
              </div>
            </div>

            {/* Solution Block 5 */}
            <div className="premium-card" style={{ padding: "32px", marginBottom: "32px" }}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-6">
                  <div style={{ color: "var(--color-blue-mid)", marginBottom: "12px" }}>
                    <Layers style={{ width: "32px", height: "32px" }} />
                  </div>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "12px" }}>
                    Automation Was Scheduled in Steps
                  </h3>
                  <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.6, textAlign: "justify", textJustify: "inter-word" }}>
                    ScalePods adopted a phased automation roadmap rather than over-engineering the application upfront. Phase 1 focused on stabilizing core data models, authentication, role controls, and live task synchronization. This solid foundation provides the exact operational framework needed for subsequent approval workflow automation and automated reminder sequences.
                  </p>
                </div>
                <div className="md:col-span-6" style={{ borderRadius: "14px", overflow: "hidden" }}>
                  <img 
                    src="/images/case-studies/macro-media/solution-phased-automation-steps.png" 
                    alt="Phased workflow automation roadmap showing core data, authentication, and approval workflows" 
                    style={{ width: "100%", height: "auto", display: "block" }} 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "var(--color-border)", marginBottom: "80px" }} />

          {/* ── The 7-Step Workflow Architecture ── */}
          <div style={{ marginBottom: "80px" }}>
            <h2 style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(24px, 3vw, 32px)",
              fontWeight: 700,
              color: "var(--color-text-bright)",
              marginBottom: "16px",
              letterSpacing: "-0.02em"
            }}>
              The 7-Step Workflow Architecture
            </h2>
            <p style={{
              fontSize: "16px",
              color: "var(--color-text-muted)",
              lineHeight: 1.65,
              marginBottom: "32px",
              maxWidth: "100%",
              textAlign: "justify",
              textJustify: "inter-word"
            }}>
              Macro Studio coordinates each stage of the monthly financial close through a disciplined 7-step operational architecture:
            </p>

            {/* 7 Steps Horizontal/Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-7 gap-3 mb-8">
              {[
                { num: "01", name: "ACCESS", desc: "Team members sign in via verified corporate email." },
                { num: "02", name: "FIND", desc: "Open shared operations guide & live close tracker." },
                { num: "03", name: "ASSIGN", desc: "Every task has explicit owners and due dates." },
                { num: "04", name: "UPDATE", desc: "Staff update milestones directly in the app." },
                { num: "05", name: "SYNC", desc: "Changes broadcast to all users in under two seconds." },
                { num: "06", name: "COORDINATE", desc: "LA & Philippines teams work off identical records." },
                { num: "07", name: "EXPAND", desc: "Phased rollout of approval & reminder workflows." },
              ].map((step, idx) => (
                <div key={idx} className="premium-card" style={{ padding: "16px 12px", textAlign: "center" }}>
                  <span style={{ fontSize: "11px", fontWeight: 800, color: "var(--color-blue-mid)", display: "block", marginBottom: "4px" }}>
                    {step.num}
                  </span>
                  <strong style={{ fontSize: "12px", color: "var(--color-text-bright)", display: "block", marginBottom: "6px", letterSpacing: "0.03em" }}>
                    {step.name}
                  </strong>
                  <p style={{ fontSize: "11.5px", color: "var(--color-text-muted)", lineHeight: 1.4, margin: 0 }}>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Workflow Diagram (Light & Dark) */}
            <div className="premium-card" style={{
              width: "100%",
              padding: "24px",
              overflow: "hidden"
            }}>
              <img 
                src="/images/case-studies/macro-media/macro-studio-workflow-light.png" 
                alt="ScalePods Macro Studio workflow automation diagram showing verified login to real-time sync (Light)" 
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "16px",
                  display: "block"
                }} 
                className="macro-workflow-light"
              />
              <img 
                src="/images/case-studies/macro-media/macro-studio-workflow-dark.png" 
                alt="ScalePods Macro Studio workflow automation diagram showing verified login to real-time sync (Dark)" 
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "16px",
                  display: "block"
                }} 
                className="macro-workflow-dark"
              />
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "var(--color-border)", marginBottom: "80px" }} />

          {/* ── The Results Section ── */}
          <div style={{ marginBottom: "80px" }}>
            <h2 style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(24px, 3vw, 32px)",
              fontWeight: 700,
              color: "var(--color-text-bright)",
              marginBottom: "16px",
              letterSpacing: "-0.02em"
            }}>
              The Results
            </h2>
            <p style={{
              fontSize: "16px",
              color: "var(--color-text-muted)",
              lineHeight: 1.65,
              marginBottom: "40px",
              maxWidth: "100%",
              textAlign: "justify",
              textJustify: "inter-word"
            }}>
              Macro Studio went live as a shared web application, replacing the isolated browser prototype. Within the first month of live deployment, the team reported clear qualitative and quantitative improvements:
            </p>

            {/* 6 Results Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Result 1 */}
              <div className="premium-card" style={{ padding: "28px" }}>
                <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-blue-mid)", marginBottom: "8px" }}>
                  6 Concurrent Users
                </div>
                <h4 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px" }}>
                  Global Collaboration
                </h4>
                <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0 }}>
                  The tracker seamlessly supported six concurrent users across onshore (Los Angeles) and offshore (Philippines) teams during the very first month of live operations.
                </p>
              </div>

              {/* Result 2 */}
              <div className="premium-card" style={{ padding: "28px" }}>
                <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-blue-mid)", marginBottom: "8px" }}>
                  &lt; 2 Seconds
                </div>
                <h4 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px" }}>
                  Sub-2s Synchronization
                </h4>
                <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0 }}>
                  Task status updates and completion milestones synchronized across all logged-in team members in under two seconds, keeping everyone on identical information.
                </p>
              </div>

              {/* Result 3 */}
              <div className="premium-card" style={{ padding: "28px" }}>
                <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-blue-mid)", marginBottom: "8px" }}>
                  0 Incidents
                </div>
                <h4 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px" }}>
                  Zero Data Loss
                </h4>
                <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0 }}>
                  Zero data loss incidents recorded during the first month after transitioning from volatile browser localStorage to an enterprise-grade cloud database.
                </p>
              </div>

              {/* Result 4 */}
              <div className="premium-card" style={{ padding: "28px" }}>
                <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-blue-mid)", marginBottom: "8px" }}>
                  100% Coverage
                </div>
                <h4 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px" }}>
                  Complete Task Ownership
                </h4>
                <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0 }}>
                  All ~90 monthly close tasks tracked in the application had assigned owners and explicit deadlines, up from partial and ambiguous coverage in the prototype.
                </p>
              </div>

              {/* Result 5 */}
              <div className="premium-card" style={{ padding: "28px" }}>
                <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-blue-mid)", marginBottom: "8px" }}>
                  ~30% Less Time
                </div>
                <h4 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px" }}>
                  Coordination Efficiency
                </h4>
                <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0 }}>
                  Teams reported an estimated 30% reduction in coordination overhead, eliminating repetitive email threads and file sharing just to confirm task progress.
                </p>
              </div>

              {/* Result 6 */}
              <div className="premium-card" style={{ padding: "28px" }}>
                <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-blue-mid)", marginBottom: "8px" }}>
                  Strict RBAC
                </div>
                <h4 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px" }}>
                  Verified Authentication
                </h4>
                <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0 }}>
                  Access was locked down to verified corporate emails, establishing clean audit boundaries and protecting confidential financial information.
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "var(--color-border)", marginBottom: "80px" }} />

          {/* ── Why ScalePods? ── */}
          <div style={{ marginBottom: "80px" }}>
            <h2 style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(24px, 3vw, 32px)",
              fontWeight: 700,
              color: "var(--color-text-bright)",
              marginBottom: "16px",
              letterSpacing: "-0.02em"
            }}>
              Why ScalePods?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="premium-card" style={{ padding: "32px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "12px" }}>
                  The Team Didn&apos;t Need Another File. It Needed a Shared System.
                </h3>
                <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.6, textAlign: "justify", textJustify: "inter-word" }}>
                  Macro Media already had a prototype for its close tracker and reference guide, but the team faced real security and coordination risks. ScalePods focused strictly on the essential needs: shared live data, secure access, sub-2s updates, and total task ownership. Reworking the application eliminated reliance on files and manual file transfers. That is the core value of{" "}
                  <Link href="/solution/ops-workflow-automation" style={{ color: "var(--color-blue-mid)", textDecoration: "underline" }}>
                    business operations automation
                  </Link>: improving the exact processes people use every day without introducing unnecessary tool complexity.
                </p>
              </div>

              <div className="premium-card" style={{ padding: "32px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "12px" }}>
                  Get the Core Right Before Adding More Automation
                </h3>
                <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.6, textAlign: "justify", textJustify: "inter-word" }}>
                  The project was delivered in deliberate phases, prioritizing a stable shared web app before layering in complex automation. Centralized cloud storage, authentication, user roles, and full task tracking established a bulletproof foundation. Automated approval sequences and reminder workflows could then follow naturally as the system matured. Start with the problem you need to solve first and build momentum on solid ground.
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "var(--color-border)", marginBottom: "80px" }} />

          {/* ── Ready to Improve Call to Action ── */}
          <div className="premium-card" style={{
            padding: "48px 36px",
            textAlign: "center",
            marginBottom: "80px",
            background: "radial-gradient(ellipse at top, rgba(56, 189, 248, 0.08) 0%, rgba(15, 23, 42, 0.5) 100%)",
            border: "1px solid rgba(56, 189, 248, 0.2)"
          }}>
            <h3 style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(22px, 2.5vw, 32px)",
              fontWeight: 800,
              color: "var(--color-text-bright)",
              marginBottom: "16px"
            }}>
              Ready to Improve Your Business Operations?
            </h3>
            <p style={{
              fontSize: "15px",
              color: "var(--color-text-muted)",
              lineHeight: 1.6,
              maxWidth: "680px",
              margin: "0 auto 28px"
            }}>
              A prototype can be a good starting point. But when a growing team needs to share live information, manage responsibilities, and control access, the underlying system must be built for that purpose. ScalePods turns disconnected files and early-stage prototypes into purpose-built applications tailored to your operational workflows.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
              <Link
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 28px",
                  borderRadius: "24px",
                  fontSize: "14.5px",
                  fontWeight: 600,
                  background: "var(--color-blue-mid)",
                  color: "#FFFFFF",
                  textDecoration: "none",
                  boxShadow: "0 4px 14px rgba(56, 189, 248, 0.25)",
                  transition: "all 0.2s ease"
                }}
                className="hover:scale-[1.03] active:scale-[0.98]"
              >
                <span>Book a Free Call</span>
                <ArrowUpRight size={16} />
              </Link>
              <Link
                href="/resources/case-studies"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 28px",
                  borderRadius: "24px",
                  fontSize: "14.5px",
                  fontWeight: 600,
                  background: "var(--color-bg-card-alt)",
                  color: "var(--color-text-bright)",
                  border: "1px solid var(--color-border)",
                  textDecoration: "none",
                  transition: "all 0.2s ease"
                }}
                className="hover:scale-[1.03] active:scale-[0.98]"
              >
                <span>Explore All Case Studies</span>
              </Link>
            </div>
          </div>

          {/* ── FAQ Section ── */}
          <div style={{ marginBottom: "60px" }}>
            <h2 style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(22px, 2.5vw, 30px)",
              fontWeight: 700,
              color: "var(--color-text-bright)",
              marginBottom: "24px",
              letterSpacing: "-0.02em"
            }}>
              Frequently Asked Questions
            </h2>
            <BlogFaqAccordion faqData={activeFaqs} />
          </div>

        </div>
      </div>
    </>
  );
}
