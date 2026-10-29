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
  Zap
} from "lucide-react";
import AnimatedMetric from "@/components/ui/AnimatedMetric";
import BlogFaqAccordion from "@/components/ui/BlogFaqAccordion";

interface LootahProps {
  faqs?: Array<{ q: string; a: string }>;
}

const defaultFaqs = [
  {
    q: "What is procurement workflow automation?",
    a: "Procurement workflow automation centralizes purchasing, purchase-order ingestion, supplier rate tracking, approvals, and reporting into a unified system, replacing manual spreadsheets with automated data validation and audit controls."
  },
  {
    q: "How does the 3-Step Smart Import Workflow work?",
    a: "Users paste raw purchase-order logs and material details directly into the platform. The system uses intelligent column matching to reconcile incoming data against historical records and automatically classifies entries as new, updated, or matching in under two minutes."
  },
  {
    q: "How does ScalePods flag supplier price increases?",
    a: "The platform cross-references incoming PO line items against historical supplier quotes, triggering automated alerts for high price variances and multi-change items so teams can prevent unapproved 2–5% cost hikes before payments compound."
  },
  {
    q: "Can the procurement platform integrate with existing ERP and inventory systems?",
    a: "Yes. The centralized architecture is designed to connect with existing ERPs, accounting platforms, inventory management tools, and communication channels like WhatsApp and email for quotation requests."
  },
  {
    q: "What role permissions are supported?",
    a: "The system features Role-Based Access Control (RBAC) with three distinct tiers: Admin (full data and system control), Editor (authorized procurement entry and updates), and Viewer (read-only visibility for executive review)."
  },
  {
    q: "How does the AI-powered audit modal maintain data accountability?",
    a: "Every creation, modification, or reconciliation action is recorded in an immutable audit history, allowing teams to track who modified data, when changes occurred, and why variations were approved."
  },
  {
    q: "How did ScalePods support Lootah Group of Companies?",
    a: "ScalePods engineered and deployed a custom procurement workflow automation platform tailored to Lootah's construction and purchasing requirements, delivering ~95% faster PO ingestion, real-time spend dashboards, and automated supplier rate tracking."
  }
];

export default function LootahCaseStudy({ faqs }: LootahProps) {
  const activeFaqs = faqs && faqs.length > 0 ? faqs : defaultFaqs;

  return (
    <>
      <style>{`
        .lootah-workflow-dark {
          display: none !important;
        }
        .lootah-workflow-light {
          display: block !important;
        }
        .dark .lootah-workflow-dark,
        [data-theme="dark"] .lootah-workflow-dark {
          display: block !important;
        }
        .dark .lootah-workflow-light,
        [data-theme="dark"] .lootah-workflow-light {
          display: none !important;
        }
        .taslim-overlay {
          background: rgba(255, 255, 255, 0.95);
          color: #0f172a;
          border: 1px solid rgba(15, 23, 42, 0.08);
        }
        .dark .taslim-overlay,
        [data-theme="dark"] .taslim-overlay {
          background: rgba(15, 23, 42, 0.95) !important;
          color: #ffffff !important;
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
        }
        .taslim-name {
          color: #0f172a;
        }
        .dark .taslim-name,
        [data-theme="dark"] .taslim-name {
          color: #ffffff !important;
        }
        .taslim-title {
          color: #475569;
        }
        .dark .taslim-title,
        [data-theme="dark"] .taslim-title {
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
          How Lootah Group Automated Procurement &amp; Slashed PO Processing by 95%
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
            Lootah Group of Companies is a diversified business group with procurement requirements that demand structured purchasing, supplier management, financial visibility, and operational accountability.
          </p>
          <p style={{ margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
            To address these needs, ScalePods developed a centralized workflow automation platform designed to replace disconnected spreadsheets and manual processes with a single source of truth for purchase orders, supplier pricing, reporting, and procurement controls.
          </p>
          <p style={{ margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
            The platform combines automated data processing, procurement analytics, executive dashboards, role-based access, and AI-powered audit controls in one environment. This approach to operations automation helps reduce repetitive data entry, identify supplier price changes, and make procurement information accessible for faster review and decision-making.
          </p>
          <p style={{ margin: 0, fontWeight: 500, color: "var(--color-text-bright)", textAlign: "justify", textJustify: "inter-word" }}>
            The outcome: transforming fragmented purchasing data into structured, searchable, and actionable business intelligence.
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
              ~<AnimatedMetric value={95} suffix="%" />
            </div>
            <div style={{ fontSize: "14.5px", color: "var(--color-text-muted)", lineHeight: 1.4, maxWidth: "180px" }}>
              PO data ingestion time reduced
            </div>
          </div>

          {/* Metric 2 */}
          <div className="w-[48%] md:w-auto flex flex-col items-end md:items-center text-right md:text-center">
            <div style={{ fontSize: "clamp(32px, 3.5vw, 42px)", fontWeight: 700, color: "var(--color-blue-mid)", marginBottom: "8px", letterSpacing: "-0.02em" }}>
              2–5%
            </div>
            <div style={{ fontSize: "14.5px", color: "var(--color-text-muted)", lineHeight: 1.4, maxWidth: "180px" }}>
              Unapproved supplier price hikes flagged
            </div>
          </div>

          {/* Metric 3 */}
          <div className="w-[48%] md:w-auto flex flex-col items-start md:items-center text-left md:text-center">
            <div style={{ fontSize: "clamp(32px, 3.5vw, 42px)", fontWeight: 700, color: "var(--color-blue-mid)", marginBottom: "8px", letterSpacing: "-0.02em" }}>
              &lt; 2 min
            </div>
            <div style={{ fontSize: "14.5px", color: "var(--color-text-muted)", lineHeight: 1.4, maxWidth: "160px" }}>
              PO batch processing time
            </div>
          </div>

          {/* Metric 4 */}
          <div className="w-[48%] md:w-auto flex flex-col items-end text-right">
            <div style={{ fontSize: "clamp(32px, 3.5vw, 42px)", fontWeight: 700, color: "var(--color-blue-mid)", marginBottom: "8px", letterSpacing: "-0.02em" }}>
              Real-Time
            </div>
            <div style={{ fontSize: "14.5px", color: "var(--color-text-muted)", lineHeight: 1.4, maxWidth: "160px" }}>
              Procurement spend visibility
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
              src="/reviews/TASLIM.webp"
              alt="Taslim Kausar Attar - Property Manager at Lootah Group of Companies"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
            />
            {/* Name/Title overlay */}
            <div className="taslim-overlay" style={{
              position: "absolute",
              bottom: "12px",
              left: "12px",
              right: "auto",
              maxWidth: "calc(100% - 24px)",
              borderRadius: "12px",
              padding: "12px 16px",
              backdropFilter: "blur(8px)"
            }}>
              <div className="taslim-name" style={{ fontWeight: 700, fontSize: "15px", lineHeight: 1.2, marginBottom: "2px" }}>Taslim Kausar Attar</div>
              <div className="taslim-title" style={{ fontSize: "12px", fontWeight: 500 }}>Property Manager at Lootah Group of Companies</div>
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
                background: "#ffffff",
                padding: "8px 16px",
                borderRadius: "10px",
                border: "1px solid rgba(0, 0, 0, 0.08)",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)"
              }}>
                <img
                  src="/brands/lootah-group.png"
                  alt="Lootah Group of Companies Logo"
                  style={{
                    height: "36px",
                    width: "auto",
                    objectFit: "contain"
                  }}
                />
              </div>
              <div style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-text-bright)" }}>
                Lootah Group of Companies
              </div>
            </div>

            <blockquote style={{
              fontSize: "clamp(15px, 1.7vw, 18.5px)",
              fontWeight: 400,
              lineHeight: 1.6,
              color: "var(--color-text-bright)",
              fontStyle: "normal",
              margin: 0,
              textAlign: "justify",
              textJustify: "inter-word"
            }}>
              “I have been trying to find a solution to create a procurement website that matches my vision and requirements, and is a step up from e-learning with current AI automation. Scalepods has fulfilled all the requirements...It was a great experience working with everyone at Scalepods. Would like to especially thank Mr. Adnan Shaikh and Mr. Raunak Kumar for listening to all my requirements and assuring me that they would be fulfilled, and Mr. Viraj Goswami and Mr. Mithul are the brains behind creating a fantastic website that not only fulfills the procurement need, dashboard, and comparison of price with new and previous data, but also provides WhatsApp as well as email connectivity to get new quotations. Thank you so much, everyone, at Scalepods.”
            </blockquote>
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
              About Lootah Group of Companies
            </h4>
            <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
              Lootah Group of Companies is a diversified business group with key operations in construction, procurement, real estate, and industrial trade across Dubai and the UAE, demanding high-volume purchasing oversight and financial rigor.
            </p>
          </div>

          {/* Metadata Fields (3 cols) */}
          <div className="md:col-span-3" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                  Industry
                </div>
                <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--color-text-bright)" }}>
                  Construction &amp; Procurement
                </div>
              </div>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                  Location
                </div>
                <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--color-text-bright)" }}>
                  Dubai, UAE
                </div>
              </div>
            </div>
            <div>
              <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                Solution
              </div>
              <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--color-text-bright)" }}>
                Centralized Procurement Platform
              </div>
            </div>
          </div>

          {/* Key Features (3 cols) */}
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
                href="/solution/ai-automation-for-manufacturing"
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
                Manufacturing AI
              </Link>
              {["Smart PO Import", "Price Variance Tracking", "Spend Dashboard", "RBAC", "AI Audit Trail"].map((tag) => (
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
              Construction procurement generates substantial volumes of purchase orders, supplier rates, material breakdowns, revisions, and quotation information. Before implementation, much of Lootah's process depended on Excel spreadsheets and manual data entry, introducing operational latency and cost blindspots.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Challenge Card 1 */}
              <div className="premium-card" style={{
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "16px"
              }}>
                <div style={{ width: "100%", height: "200px", borderRadius: "16px", overflow: "hidden" }}>
                  <img 
                    src="/images/case-studies/lootah/challenge-po-batch-time.png" 
                    alt="Manual procurement process with 30-45 minute PO batch processing latency" 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                  />
                </div>
                <div className="internal-panel" style={{ padding: "20px", flex: 1 }}>
                  <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    30–45 Minutes for One PO Batch
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Teams had to copy information, match columns, compare records, and reconcile data manually before it could be used for procurement decisions. This created unnecessary administrative work and limited the efficiency of manufacturing operations-style purchasing workflows where structured records are essential.
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
                <div className="internal-panel" style={{ padding: "20px", flex: 1 }}>
                  <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    Supplier Price Increases Were Easy to Miss
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Supplier pricing changes across thousands of line items. A small increase in steel, cement, equipment, or frequently purchased materials easily got lost inside a large spreadsheet. Without automated procurement analytics, teams discovered these increases only after costs had already accumulated.
                  </p>
                </div>
                <div style={{ width: "100%", height: "200px", borderRadius: "16px", overflow: "hidden" }}>
                  <img 
                    src="/images/case-studies/lootah/challenge-price-increases.png" 
                    alt="Construction materials procurement team identifying supplier price increases through manual spreadsheet comparisons" 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                  />
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
                    src="/images/case-studies/lootah/challenge-executive-waiting.png" 
                    alt="Construction procurement team reviewing spreadsheets and manual reports before procurement process automation" 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                  />
                </div>
                <div className="internal-panel" style={{ padding: "20px", flex: 1 }}>
                  <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    Executives Had to Wait for the Numbers
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Preparing consolidated reports from separate spreadsheets delayed access to vital purchasing information by two to three days. Leadership needed immediate visibility into total spend, active suppliers, and line-item data without waiting for manually compiled month-end spreadsheets.
                  </p>
                </div>
              </div>

              {/* Challenge Card 4 */}
              <div className="premium-card" style={{
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "16px"
              }}>
                <div className="internal-panel" style={{ padding: "20px", flex: 1 }}>
                  <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    Who Changed the Data? (Audit &amp; Accountability)
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Shared spreadsheets created another critical risk: zero accountability. When multiple stakeholders accessed and edited records, tracking who changed what became impossible. Lootah needed clear role permissions and an unalterable audit trail across all purchasing activity.
                  </p>
                </div>
                <div style={{ width: "100%", height: "200px", borderRadius: "16px", overflow: "hidden" }}>
                  <img 
                    src="/images/case-studies/lootah/challenge-audit-accountability.png" 
                    alt="Procurement audit trail and role-based access control for tracking changes to procurement data" 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                  />
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
              Our Solution: Centralized Procurement Workflow Automation Platform
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
              ScalePods built a procurement system around the way Lootah's teams already worked, applying{" "}
              <Link href="/solution/ops-workflow-automation" style={{ color: "var(--color-blue-mid)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                AI business process automation
              </Link>{" "}
              principles to connect operational purchasing with financial oversight without simply replacing one spreadsheet with another database.
            </p>

            {/* Solution Block 1 */}
            <div className="premium-card" style={{ padding: "32px", marginBottom: "32px" }}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-6">
                  <div style={{ color: "var(--color-blue-mid)", marginBottom: "12px" }}>
                    <Workflow style={{ width: "32px", height: "32px" }} />
                  </div>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "12px" }}>
                    A Procurement System Built Around the Way Teams Already Work
                  </h3>
                  <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.6, textAlign: "justify", textJustify: "inter-word" }}>
                    The platform brings together purchase-order data, supplier pricing, material information, procurement analytics, executive reporting, user permissions, audit records, and data reconciliation. This workflow automation platform applies{" "}
                    <Link href="/solution/ai-automation-for-manufacturing" style={{ color: "var(--color-blue-mid)", textDecoration: "underline" }}>
                      AI Automation for manufacturing
                    </Link>{" "}
                    principles: standardizing how information enters the system, how records are matched, and how pricing changes are reviewed.
                  </p>
                </div>
                <div className="md:col-span-6" style={{ borderRadius: "14px", overflow: "hidden" }}>
                  <img 
                    src="/images/case-studies/lootah/solution-built-for-teams.png" 
                    alt="Professional viewing ScalePods procurement intelligence dashboard" 
                    style={{ width: "100%", height: "auto", display: "block" }} 
                  />
                </div>
              </div>
            </div>

            {/* Solution Block 2: 3-Step Smart Import Workflow */}
            <div className="premium-card" style={{ padding: "32px", marginBottom: "32px" }}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-6 order-2 md:order-1" style={{ borderRadius: "14px", overflow: "hidden" }}>
                  <img 
                    src="/images/case-studies/lootah/solution-smart-import-workflow.png" 
                    alt="ScalePods purchase order import workflow for importing, matching, and classifying procurement data" 
                    style={{ width: "100%", height: "auto", display: "block" }} 
                  />
                </div>
                <div className="md:col-span-6 order-1 md:order-2">
                  <div style={{ color: "var(--color-blue-mid)", marginBottom: "12px" }}>
                    <FileCheck style={{ width: "32px", height: "32px" }} />
                  </div>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "12px" }}>
                    The 3-Step Smart Import Workflow
                  </h3>
                  <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.6, marginBottom: "16px" }}>
                    The most time-consuming part of the previous process was getting procurement data into a usable format. The 3-Step Smart Import Workflow turns a manual exercise into automated data processing:
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                    <li style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.5 }}>
                      <strong style={{ color: "var(--color-text-bright)" }}>01 — COPY &amp; PASTE:</strong> Paste raw PO logs, rate details, and material breakdowns directly into the platform with zero re-keying.
                    </li>
                    <li style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.5 }}>
                      <strong style={{ color: "var(--color-text-bright)" }}>02 — SMART MATCH:</strong> Column matching algorithms reconcile incoming information against historical records.
                    </li>
                    <li style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.5 }}>
                      <strong style={{ color: "var(--color-text-bright)" }}>03 — CLASSIFY:</strong> Automatically flags records as New, Updated, or Matching in under 2 minutes (~95% processing time reduction).
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Solution Block 3: Price Variance Analytics */}
            <div className="premium-card" style={{ padding: "32px", marginBottom: "32px" }}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-6">
                  <div style={{ color: "var(--color-blue-mid)", marginBottom: "12px" }}>
                    <AlertTriangle style={{ width: "32px", height: "32px" }} />
                  </div>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "12px" }}>
                    Price Variance Is Flagged Automatically
                  </h3>
                  <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.6, marginBottom: "14px", textAlign: "justify", textJustify: "inter-word" }}>
                    Price tracking becomes difficult when procurement data spans thousands of items. The PR Order Request and Review Data modules identify supplier price changes the moment they enter the system:
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div className="internal-panel" style={{ padding: "12px 16px", borderRadius: "10px" }}>
                      <div style={{ fontSize: "13.5px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "4px" }}>
                        Multi-Change Item Analytics
                      </div>
                      <div style={{ fontSize: "12.5px", color: "var(--color-text-muted)" }}>
                        Highlights materials and line items where supplier rates have shifted multiple times across procurement cycles.
                      </div>
                    </div>
                    <div className="internal-panel" style={{ padding: "12px 16px", borderRadius: "10px" }}>
                      <div style={{ fontSize: "13.5px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "4px" }}>
                        High Price Variance Analytics
                      </div>
                      <div style={{ fontSize: "12.5px", color: "var(--color-text-muted)" }}>
                        Pinpoints steep rate hikes to help procurement officers challenge an estimated 2–5% in unapproved price increases before payments compound.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-6" style={{ borderRadius: "14px", overflow: "hidden" }}>
                  <img 
                    src="/images/case-studies/lootah/solution-price-variance-flagging.png" 
                    alt="Procurement analytics dashboard highlighting supplier price changes and purchase order price variance" 
                    style={{ width: "100%", height: "auto", display: "block" }} 
                  />
                </div>
              </div>
            </div>

            {/* Solution Block 4: Live Spend Dashboard */}
            <div className="premium-card" style={{ padding: "32px", marginBottom: "32px" }}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-6 order-2 md:order-1" style={{ borderRadius: "14px", overflow: "hidden" }}>
                  <img 
                    src="/images/case-studies/lootah/solution-live-spend-dashboard.png" 
                    alt="Procurement analytics dashboard showing purchase quote data, material costs, and procurement spend" 
                    style={{ width: "100%", height: "auto", display: "block" }} 
                  />
                </div>
                <div className="md:col-span-6 order-1 md:order-2">
                  <div style={{ color: "var(--color-blue-mid)", marginBottom: "12px" }}>
                    <BarChart3 style={{ width: "32px", height: "32px" }} />
                  </div>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "12px" }}>
                    A Live View of Procurement Spend
                  </h3>
                  <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.6, textAlign: "justify", textJustify: "inter-word" }}>
                    The PR Quote Data Dashboard gives executives a centralized, live view of purchasing commitments. Instead of waiting two to three days for manually compiled reports, management accesses real-time KPI cards for Total Spend, Active Suppliers, and Total Line Items across daily, monthly, and yearly time horizons.
                  </p>
                </div>
              </div>
            </div>

            {/* Solution Block 5: RBAC & Audit Trail Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* RBAC Card */}
              <div className="premium-card" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ width: "100%", height: "180px", borderRadius: "12px", overflow: "hidden" }}>
                  <img 
                    src="/images/case-studies/lootah/solution-role-based-access.png" 
                    alt="ScalePods procurement system with role-based access control and user permission management" 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                  />
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", color: "var(--color-blue-mid)" }}>
                    <Lock style={{ width: "20px", height: "20px" }} />
                    <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", margin: 0 }}>
                      Access Is Controlled by Role
                    </h3>
                  </div>
                  <p style={{ fontSize: "13px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Three access levels are enforced: <strong>Admin</strong> (full control), <strong>Editor</strong> (procurement entry &amp; reconciliation), and <strong>Viewer</strong> (read-only visibility). This prevents procurement data from becoming an uncontrolled shared resource.
                  </p>
                </div>
              </div>

              {/* Audit Trail Card */}
              <div className="premium-card" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ width: "100%", height: "180px", borderRadius: "12px", overflow: "hidden" }}>
                  <img 
                    src="/images/case-studies/lootah/solution-ai-audit-history.png" 
                    alt="Procurement workflow dashboard illustrating purchase quote records and tracked data changes" 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                  />
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", color: "var(--color-blue-mid)" }}>
                    <History style={{ width: "20px", height: "20px" }} />
                    <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", margin: 0 }}>
                      Every Change Has an Unalterable Record
                    </h3>
                  </div>
                  <p style={{ fontSize: "13px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    The AI-powered Audit Modal preserves a complete history of data changes, modifications, and reconciliation actions, introducing corporate accountability across every purchase cycle.
                  </p>
                </div>
              </div>
            </div>

            {/* Solution Block 6: Source of Truth Banner */}
            <div className="premium-card" style={{ padding: "28px", marginTop: "32px" }}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-8">
                  <h3 style={{ fontSize: "17px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px" }}>
                    Procurement Data Becomes a Source of Truth
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.6, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    PO information, supplier pricing, inventory connectivity, dashboards, user permissions, and audit records all operate within the same platform. That makes it a practical model of{" "}
                    <Link href="/solution/ops-workflow-automation" style={{ color: "var(--color-blue-mid)", textDecoration: "underline" }}>
                      Operations automation
                    </Link>{" "}
                    applied to heavy industrial purchasing.
                  </p>
                </div>
                <div className="md:col-span-4" style={{ borderRadius: "10px", overflow: "hidden" }}>
                  <img 
                    src="/images/case-studies/lootah/solution-source-of-truth.png" 
                    alt="Centralized procurement data dashboard displaying purchase order records and supplier comparisons" 
                    style={{ width: "100%", height: "auto", display: "block" }} 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "var(--color-border)", marginBottom: "80px" }} />

          {/* ── The Workflow Section ── */}
          <div style={{ marginBottom: "80px" }}>
            <h2 style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(24px, 3vw, 32px)",
              fontWeight: 700,
              color: "var(--color-text-bright)",
              marginBottom: "16px",
              letterSpacing: "-0.02em"
            }}>
              How Procurement Automation Works
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
              The platform organizes procurement operations into a connected, nine-stage sequential workflow:
            </p>

            {/* 9 Workflow Step Badges */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { step: "01", title: "Import", desc: "Raw PO logs, rate details, and material breakdowns enter the platform." },
                { step: "02", title: "Match", desc: "Smart column matching reconciles incoming data with existing records." },
                { step: "03", title: "Classify", desc: "Records are automatically identified as new, updated, or matching." },
                { step: "04", title: "Analyze", desc: "Supplier rates and procurement information are analyzed for changes." },
                { step: "05", title: "Flag", desc: "High Price Variance and Multi-Change Item analytics highlight cost shifts." },
                { step: "06", title: "Report", desc: "Executive dashboards provide real-time visibility into spend and suppliers." },
                { step: "07", title: "Control", desc: "Role-Based Access Control determines who views or modifies data." },
                { step: "08", title: "Audit", desc: "The AI-powered audit system records all procurement activities." },
                { step: "09", title: "Decide", desc: "Teams investigate discrepancies and make faster purchasing decisions." }
              ].map((item) => (
                <div 
                  key={item.step} 
                  className="internal-panel" 
                  style={{ 
                    padding: "18px", 
                    borderRadius: "14px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-blue-mid)", letterSpacing: "0.05em" }}>
                      STAGE {item.step}
                    </span>
                    <CheckCircle2 style={{ width: "15px", height: "15px", color: "var(--color-blue-mid)" }} />
                  </div>
                  <div style={{ fontSize: "14.5px", fontWeight: 700, color: "var(--color-text-bright)" }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: "12.5px", color: "var(--color-text-muted)", lineHeight: 1.45 }}>
                    {item.desc}
                  </div>
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
                src="/images/case-studies/lootah/lootah-procurement-workflow.png" 
                alt="ScalePods procurement automation workflow diagram showing PO ingestion, price variance, and reporting (Light)" 
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "16px",
                  display: "block"
                }} 
                className="lootah-workflow-light"
              />
              <img 
                src="/images/case-studies/lootah/lootah-procurement-workflow-2.png" 
                alt="ScalePods procurement automation workflow diagram showing PO ingestion, price variance, and reporting (Dark)" 
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "16px",
                  display: "block"
                }} 
                className="lootah-workflow-dark"
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
              By centralizing purchasing operations into an automated single source of truth, Lootah achieved measurable improvements across speed, cost control, and organizational transparency:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Result 1 */}
              <div className="premium-card" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-blue-mid)", fontFamily: "var(--font-inter), sans-serif" }}>
                  ~<AnimatedMetric value={95} suffix="%" />
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    PO Ingestion Time Reduced
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Batch processing time dropped from approximately 30–45 minutes to under two minutes per batch, freeing procurement personnel from manual spreadsheet entry.
                  </p>
                </div>
              </div>

              {/* Result 2 */}
              <div className="premium-card" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-blue-mid)", fontFamily: "var(--font-inter), sans-serif" }}>
                  2–5%
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    Unapproved Price Hikes Flagged
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Automated variance detection highlights hidden supplier rate increases across thousands of line items before costs compound into payments.
                  </p>
                </div>
              </div>

              {/* Result 3 */}
              <div className="premium-card" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-blue-mid)", fontFamily: "var(--font-inter), sans-serif" }}>
                  Real-Time
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    Live Spend &amp; Supplier Visibility
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Executive reporting shifted from a 2–3 day manual compilation process to live dashboard access with daily, monthly, and yearly insights.
                  </p>
                </div>
              </div>

              {/* Result 4 */}
              <div className="premium-card" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-blue-mid)", fontFamily: "var(--font-inter), sans-serif" }}>
                  Zero-Error
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                    Automated Reconciliation &amp; Audit Control
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.55, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                    Backend matching eliminates duplicate orders, prevents double payments, and maintains an unalterable history of every procurement modification.
                  </p>
                </div>
              </div>
            </div>

            {/* Measurement Note */}
            <div style={{
              padding: "16px 20px",
              borderRadius: "12px",
              background: "rgba(96, 165, 250, 0.05)",
              border: "1px solid rgba(96, 165, 250, 0.2)",
              display: "flex",
              alignItems: "flex-start",
              gap: "12px"
            }}>
              <Info style={{ width: "18px", height: "18px", color: "var(--color-blue-mid)", flexShrink: 0, marginTop: "2px" }} />
              <div style={{ fontSize: "12.5px", color: "var(--color-text-muted)", lineHeight: 1.5 }}>
                <strong style={{ color: "var(--color-text-bright)" }}>Understanding the Reported Results:</strong> The purchase-order processing improvement is based on the stated comparison between previous manual processing times (30–45 mins per batch) and the new automated workflow (&lt; 2 mins). The supplier price-variance figure represents an estimated range of unapproved rate changes the system is designed to identify before payments compound.
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "var(--color-border)", marginBottom: "80px" }} />

          {/* ── Why ScalePods Section ── */}
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
            <p style={{
              fontSize: "16px",
              color: "var(--color-text-muted)",
              lineHeight: 1.65,
              marginBottom: "36px",
              maxWidth: "100%",
              textAlign: "justify",
              textJustify: "inter-word"
            }}>
              Excel wasn't the problem by itself. The problem was asking spreadsheets to perform the work of a connected procurement system.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pillar 1 */}
              <div className="premium-card" style={{
                borderWidth: "1px 1px 1px 4px",
                borderStyle: "solid",
                borderColor: "var(--color-glass-border) var(--color-glass-border) var(--color-glass-border) var(--color-blue-mid)",
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                gap: "10px"
              }}>
                <h3 style={{ fontSize: "17px", fontWeight: 700, color: "var(--color-text-bright)", margin: 0, lineHeight: 1.3 }}>
                  The Spreadsheet Wasn't the Real Problem
                </h3>
                <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.6, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                  As purchasing data grows across thousands of construction items, manual spreadsheets make manufacturing operations, supply chain tracking, and reporting increasingly difficult to manage. ScalePods built the missing operational layer between raw procurement data and executive decisions.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="premium-card" style={{
                borderWidth: "1px 1px 1px 4px",
                borderStyle: "solid",
                borderColor: "var(--color-glass-border) var(--color-glass-border) var(--color-glass-border) var(--color-blue-mid)",
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                gap: "10px"
              }}>
                <h3 style={{ fontSize: "17px", fontWeight: 700, color: "var(--color-text-bright)", margin: 0, lineHeight: 1.3 }}>
                  Automation That Works With the Existing Data
                </h3>
                <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.6, margin: 0, textAlign: "justify", textJustify: "inter-word" }}>
                  The biggest advantage isn't simply moving away from Excel. It's creating an intelligent system that imports procurement data, matches existing records, identifies price changes, flags variance, controls access, and preserves audit trails without disrupting how teams already operate.
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "var(--color-border)", marginBottom: "80px" }} />

          {/* ── Frequently Asked Questions Section ── */}
          <div style={{ marginBottom: "80px" }}>
            <h2 style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(24px, 3vw, 32px)",
              fontWeight: 700,
              color: "var(--color-text-bright)",
              marginBottom: "16px",
              letterSpacing: "-0.02em"
            }}>
              Frequently Asked Questions
            </h2>
            <p style={{
              fontSize: "16px",
              color: "var(--color-text-muted)",
              lineHeight: 1.6,
              marginBottom: "32px",
              maxWidth: "100%"
            }}>
              Common questions about procurement workflow automation, PO batch processing, and price variance detection.
            </p>

            <BlogFaqAccordion faqData={activeFaqs} />
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "var(--color-border)", marginBottom: "80px" }} />

          {/* ── Conversion CTA Section ── */}
          <div style={{ marginBottom: "0px" }}>
            <div className="premium-card" style={{
              borderWidth: "1px 1px 1px 4px",
              borderStyle: "solid",
              borderColor: "var(--color-glass-border) var(--color-glass-border) var(--color-glass-border) var(--color-blue-mid)",
              padding: "48px 32px",
              textAlign: "center"
            }}>
              <h3 style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "clamp(24px, 3.5vw, 36px)",
                fontWeight: 700,
                color: "var(--color-text-bright)",
                marginBottom: "16px",
                letterSpacing: "-0.02em"
              }}>
                Ready to Automate Your Procurement Operations?
              </h3>
              
              <p style={{
                fontSize: "16px",
                color: "var(--color-text-muted)",
                lineHeight: 1.65,
                marginBottom: "32px",
                maxWidth: "680px",
                marginLeft: "auto",
                marginRight: "auto"
              }}>
                Stop letting critical purchasing data disappear into spreadsheets. Build a centralized workflow automation platform that connects procurement data, supplier pricing, reporting, access control, and operational visibility in one place.
              </p>

              <div style={{ display: "inline-block" }}>
                <Link href="/contact" style={{ textDecoration: "none" }}>
                  <div className="group text-[#0f172a]" style={{
                    position: "relative",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "15px",
                    fontWeight: 700,
                    background: "#6DB6FF",
                    border: "1px solid #6DB6FF",
                    borderRadius: "10px",
                    padding: "12px 28px",
                    cursor: "pointer",
                    transition: "all 0.2s ease-in-out",
                    boxShadow: "0 4px 12px rgba(109, 182, 255, 0.25)"
                  }}>
                    <span>Book A Free Call</span>
                    <ArrowUpRight style={{ width: "16px", height: "16px" }} />
                  </div>
                </Link>
              </div>
              
              <p style={{
                fontSize: "13px",
                color: "var(--color-text-faint)",
                marginTop: "16px",
                marginBottom: "8px"
              }}>
                No commitment. Just insights.
              </p>

              <div style={{ fontSize: "13px", color: "var(--color-text-muted)" }}>
                Questions? Reach us directly at{" "}
                <a href="mailto:info@scalepods.co" style={{ color: "var(--color-blue-mid)", textDecoration: "underline" }}>
                  info@scalepods.co
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
