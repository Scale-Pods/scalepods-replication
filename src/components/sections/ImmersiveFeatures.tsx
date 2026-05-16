"use client";

import React, { memo, useCallback } from "react";

import { motion } from "framer-motion";
import { ThreeDCarousel } from "@/components/lightswind/3d-carousel";
import { ChevronRight, ArrowRight, Zap, Users, Settings, PenTool, Layers } from "lucide-react";
import Link from "next/link";
import { useMobile } from "@/lib/hooks";
import { useTheme } from "@/components/providers/ThemeProvider";


const C = {
  green: "var(--color-green)",
  greenBright: "var(--color-green)",
  blue: "var(--color-blue-mid)",
  txtBright: "var(--color-text-bright)",
  txtBody: "var(--color-text-body)",
  border: "var(--color-border)",
  bgCard: "var(--color-bg-card)",
  bgPage: "var(--color-bg-page)",
};

const F = {
  inter: "var(--font-inter), Inter, sans-serif",
  serif: "var(--font-instrument), 'Instrument Serif', Georgia, serif",
  accent: "var(--font-instrument), serif",
};

const G = {
  bg: "var(--color-glass-bg)",
  border: "1px solid var(--color-glass-border)",
  blur: "blur(10px)", // Reduced from 16px
};

const features = [
  { id: "sales-automation", title: "Sales Automation", desc: "Automated lead scraping & outreach.", outcome: "3x More Booked Demos", icon: <Zap size={14} /> },
  { id: "hr-workflow", title: "HR Automation", desc: "AI screening & instant shortlists.", outcome: "50% Faster Time-to-Hire", icon: <Users size={14} /> },
  { id: "operations-workflow", title: "Ops Automation", desc: "24/7 AI agents for order flows.", outcome: "70% Less Manual Follow-up", icon: <Settings size={14} /> },
  { id: "marketing-workflow", title: "Marketing Automation", desc: "AI content & auto-scheduling.", outcome: "Scalable Content Engine", icon: <PenTool size={14} /> },
  { id: "custom-ai", title: "Custom Workflows", desc: "Tailored AI financial & operational systems.", outcome: "Full Process Autonomy", icon: <Layers size={14} /> },
];


const workflowSlides = [
  // --- EXPENSE TRACKER (START) ---
  { 
    id: 1, 
    title: "Expense Tracker", 
    subtitle: "Financial Architecture",
    heading: "Expense Tracker Dashboard",
    description: "Real-time visibility into your entire financial operation with AI-powered insights.", 
    imageUrl: "/images/carousel/expense-tracker/dashboard-overview.png",
    systemLabel: "FINANCIAL OS"
  },
  { 
    id: 2, 
    title: "Revenue Tracking", 
    subtitle: "Growth Monitoring",
    heading: "Automated Revenue Tracking",
    description: "Automated revenue monitoring and performance forecasting for scalable growth.", 
    imageUrl: "/images/carousel/expense-tracker/revenue-tracking.png",
    systemLabel: "REVENUE AGENT"
  },
  { 
    id: 3, 
    title: "Portfolio Management", 
    subtitle: "Asset Intelligence",
    heading: "Investment Portfolio",
    description: "Manage and track all investments with institutional-grade precision and real-time data.", 
    imageUrl: "/images/carousel/expense-tracker/investment-portfolio.png",
    systemLabel: "ASSET INTELLIGENCE"
  },
  { 
    id: 4, 
    title: "Reporting Engine", 
    subtitle: "Business Intelligence",
    heading: "Financial Reports",
    description: "Instant, accurate financial reporting for smarter decision making and audit readiness.", 
    imageUrl: "/images/carousel/expense-tracker/financial-reports.png",
    systemLabel: "REPORTING HUB"
  },
  { 
    id: 5, 
    title: "AI Analysis", 
    subtitle: "Predictive Analytics",
    heading: "Category Analysis",
    description: "AI-driven expense categorization and trend identification to optimize spending.", 
    imageUrl: "/images/carousel/expense-tracker/category-analysis.png",
    systemLabel: "ANALYTICS ENGINE"
  },
  { 
    id: 6, 
    title: "Payment Flows", 
    subtitle: "Cashflow Automation",
    heading: "Monthly Payments",
    description: "Automated payment schedules and recurring expense management for seamless operations.", 
    imageUrl: "/images/carousel/expense-tracker/monthly-payments.png",
    systemLabel: "CASHFLOW AGENT"
  },
  { 
    id: 7, 
    title: "Action Center", 
    subtitle: "Task Orchestration",
    heading: "Action Center & Tasks",
    description: "Centralized hub for financial actions and automated task queues to boost productivity.", 
    imageUrl: "/images/carousel/expense-tracker/action-center.png",
    systemLabel: "COMMAND CENTER"
  },
  { 
    id: 8, 
    title: "Billing Systems", 
    subtitle: "Invoice Intelligence",
    heading: "Invoice System",
    description: "Fully automated invoicing and reconciliation workflows for error-free billing.", 
    imageUrl: "/images/carousel/expense-tracker/invoice-system.png",
    systemLabel: "INVOICE AGENT"
  },

  // --- MARKETING TOOL ---
  {
    id: 9,
    title: "Marketing Hub",
    subtitle: "Content Strategy",
    heading: "Campaign Overview",
    description: "Monitor multi-channel campaigns and audience engagement in real-time.",
    imageUrl: "/images/carousel/marketing/marketing-1.png",
    systemLabel: "MARKETING OS"
  },
  {
    id: 10,
    title: "Audience Insights",
    subtitle: "Segmentation",
    heading: "User Behavior Analysis",
    description: "Deep dive into customer segments and conversion funnels with AI-driven data.",
    imageUrl: "/images/carousel/marketing/marketing-2.png",
    systemLabel: "GROWTH AGENT"
  },
  {
    id: 11,
    title: "Content Engine",
    subtitle: "Creative Automation",
    heading: "Automated Content Planner",
    description: "Schedule and optimize social content across all platforms with smart AI queuing.",
    imageUrl: "/images/carousel/marketing/marketing-3.png",
    systemLabel: "CONTENT POD"
  },
  {
    id: 12,
    title: "Ad Optimization",
    subtitle: "Performance Marketing",
    heading: "ROI Tracking Dashboard",
    description: "Real-time ad spend monitoring and automatic bid adjustment for maximum ROI.",
    imageUrl: "/images/carousel/marketing/marketing-4.png",
    systemLabel: "AD INTELLIGENCE"
  },
  {
    id: 13,
    title: "Email Automation",
    subtitle: "Retention Lifecycle",
    heading: "Dynamic Sequence Builder",
    description: "Build high-converting email sequences triggered by real user actions.",
    imageUrl: "/images/carousel/marketing/marketing-5.png",
    systemLabel: "CRM AUTOMATOR"
  },
  {
    id: 14,
    title: "SEO Analytics",
    subtitle: "Search Intelligence",
    heading: "Keyword Performance",
    description: "Track search rankings and discover new opportunities with automated SEO audits.",
    imageUrl: "/images/carousel/marketing/marketing-6.png",
    systemLabel: "SEO AGENT"
  },
  {
    id: 15,
    title: "Social Listening",
    subtitle: "Brand Monitoring",
    heading: "Sentiment Analysis",
    description: "Monitor brand mentions and analyze customer sentiment across the web automatically.",
    imageUrl: "/images/carousel/marketing/marketing-7.png",
    systemLabel: "SOCIAL MONITOR"
  },

  // --- PROCUREMENT TOOL ---
  {
    id: 16,
    title: "Procurement Hub",
    subtitle: "Supply Chain",
    heading: "Vendor Management",
    description: "Centralized control for all vendor relationships and contract lifecycles.",
    imageUrl: "/images/carousel/procurement/procurement-1.png",
    systemLabel: "PROCURE OS"
  },
  {
    id: 17,
    title: "Order Tracking",
    subtitle: "Logistics",
    heading: "Real-time Order Status",
    description: "End-to-end visibility into every purchase order and delivery milestone.",
    imageUrl: "/images/carousel/procurement/procurement-2.png",
    systemLabel: "LOGISTICS AGENT"
  },
  {
    id: 18,
    title: "Spend Analysis",
    subtitle: "Cost Control",
    heading: "Procurement Analytics",
    description: "Identify saving opportunities and optimize procurement spend with AI insights.",
    imageUrl: "/images/carousel/procurement/procurement-3.png",
    systemLabel: "SPEND INTELLIGENCE"
  },
  {
    id: 19,
    title: "Audit Trail",
    subtitle: "Compliance",
    heading: "Automated Compliance Check",
    description: "Ensure every transaction meets regulatory standards with automated audit logs.",
    imageUrl: "/images/carousel/procurement/procurement-4.png",
    systemLabel: "AUDIT AGENT"
  },

  // --- SALES TOOL ---
  {
    id: 20,
    title: "Sales intelligence",
    subtitle: "Lead Conversion",
    heading: "Pipeline Overview",
    description: "Full visibility into your sales funnel with AI-powered deal scoring.",
    imageUrl: "/images/carousel/sales/sales-1.png",
    systemLabel: "SALES OS"
  },
  {
    id: 21,
    title: "Lead Generation",
    subtitle: "Prospecting",
    heading: "Automated Lead Scraper",
    description: "Discover and qualify high-intent leads automatically across professional networks.",
    imageUrl: "/images/carousel/sales/sales-2.png",
    systemLabel: "PROSPECTING POD"
  },
  {
    id: 22,
    title: "Outreach Engine",
    subtitle: "Engagement",
    heading: "AI Email Outreach",
    description: "Send personalized, high-converting cold emails at scale with smart follow-ups.",
    imageUrl: "/images/carousel/sales/sales-3.png",
    systemLabel: "OUTREACH AGENT"
  },
  {
    id: 23,
    title: "Deal Management",
    subtitle: "Negotiation",
    heading: "Smart CRM Sync",
    description: "Keep your CRM updated automatically with deal status and communication logs.",
    imageUrl: "/images/carousel/sales/sales-4.png",
    systemLabel: "CRM AGENT"
  },
  {
    id: 24,
    title: "Sales Coaching",
    subtitle: "Enablement",
    heading: "Call Analysis",
    description: "AI-powered analysis of sales calls to identify winning patterns and coaching moments.",
    imageUrl: "/images/carousel/sales/sales-5.png",
    systemLabel: "COACHING ENGINE"
  },
];

export const ImmersiveFeatures = memo(() => {
  const isMobile = useMobile(1023);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const handleCardClick = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);


  return (
    <section 
      id="immersive-features"
      className="immersive-features-section"
      style={{ 
        padding: isMobile ? "40px 16px" : "12px 32px 60px",
        position: "relative", 
        overflow: "hidden",
        background: "transparent",
        minHeight: isMobile ? "auto" : "90vh",
        display: "flex",
        alignItems: "center",
        touchAction: "pan-y",
        WebkitOverflowScrolling: "touch"
      }}
    >
      <div id="revenue-tracking" style={{ position: "absolute", top: 0 }} />
      <div id="financial-reports" style={{ position: "absolute", top: 0 }} />
      <div id="category-analysis" style={{ position: "absolute", top: 0 }} />




      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: isMobile ? 0.05 : 0.08, delayChildren: 0.1 } }
        }}
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
          width: "100%",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "0.85fr 1.15fr",
          gap: isMobile ? "24px" : "40px",
          alignItems: "center",
          transform: "translate3d(0,0,0)",
          willChange: "opacity"
        }}

      >
        {/* Left Column: Content */}
        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          alignItems: isMobile ? "center" : "flex-start",
          textAlign: isMobile ? "center" : "left",
          width: "100%"
        }}>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 15 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "4px 12px",
              background: "var(--color-glass-bg)", backdropFilter: "blur(16px)",
              border: "1px solid var(--color-glass-border)",
              borderRadius: "100px",
              marginBottom: "8px"
            }}
          >
            <Zap size={10} color={C.green} />
            <span style={{ 
              color: C.green, 
              fontSize: "10px", 
              fontWeight: 700, 
              textTransform: "uppercase", 
              letterSpacing: "0.1em" 
            }}>
              Scalable Infrastructure
            </span>
          </motion.div>

          <h1
            style={{
              fontFamily: F.inter,
              fontSize: "clamp(26px, 3.2vw, 38px)",
              fontWeight: 800,
              color: C.txtBright,
              lineHeight: 1.15,
              marginBottom: "8px",
              letterSpacing: "-0.03em",
              maxWidth: "600px",
              margin: isMobile ? "0 auto 8px" : "0 0 8px"
            }}
          >
            Key Features of{" "}
            <span style={{ fontFamily: F.accent, fontStyle: "italic", color: C.green, fontWeight: 400 }}>
              Scalepods Workflow Automation
            </span>
          </h1>

          <p
            style={{
              fontFamily: F.inter,
              fontSize: "clamp(12px, 1.4vw, 14px)",
              color: C.txtBody,
              lineHeight: 1.6,
              marginBottom: "12px",
              letterSpacing: "-0.01em",
              opacity: 0.75,
              maxWidth: "480px",
              textAlign: isMobile ? "center" : "left"
            }}
          >
            ScalePods provides a modular ecosystem of automated systems that work together to accelerate growth.
          </p>

          {/* Feature Cards */}
          <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: "4px", 
            width: "100%",
            maxWidth: "480px",
            marginBottom: "12px"
          }}>
            {features.map((feat, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, x: -15 },
                  show: { opacity: 1, x: 0, transition: { duration: isMobile ? 0.3 : 0.4, ease: "easeOut" } }
                }}
                onClick={() => handleCardClick(feat.id)}
                whileHover={isMobile ? undefined : { x: 6, background: "var(--color-glass-bg)", backdropFilter: "blur(18px)" }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: "6px 14px",
                  background: "var(--color-glass-bg)",
                  backdropFilter: isMobile ? "blur(8px)" : "blur(18px)",
                  WebkitBackdropFilter: isMobile ? "blur(8px)" : "blur(18px)",
                  border: "1px solid var(--color-glass-border)",
                  boxShadow: "var(--card-shadow), var(--card-shadow-inset)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
                  transform: "translate3d(0,0,0)",
                  willChange: "transform, background"
                }}
                className="feature-card"
              >

                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ color: C.green, opacity: 0.8 }}>{feat.icon}</div>
                  <div>
                    <h4 style={{ color: C.txtBright, fontSize: "13px", fontWeight: 600, margin: 0 }}>{feat.title}</h4>
                    <p style={{ color: C.green, fontSize: "9px", fontWeight: 700, textTransform: "uppercase", marginTop: "1px" }}>{feat.outcome}</p>
                  </div>
                </div>
                <ChevronRight size={12} color={C.txtBright} style={{ opacity: 0.3 }} className="card-arrow" />
              </motion.div>
            ))}
          </div>

          <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "4px" }}>
            <Link href="/contact" style={{ textDecoration: "none" }}>
              <button
                style={{
                  padding: "16px 36px",
                  // Background Logic
                  background: isDark
                    ? "linear-gradient(135deg, #050816 0%, #0b1020 100%)"
                    : "linear-gradient(135deg, #B1D997 0%, #C5E4B2 50%, #D8EFCC 100%)",
                  
                  // Theme Adaptive Colors
                  color: isDark ? "#B1D997" : "#0f172a",
                  
                  // Glass & Border
                  backdropFilter: isDark ? "blur(12px)" : "none",
                  WebkitBackdropFilter: isDark ? "blur(12px)" : "none",
                  border: isDark 
                    ? "1px solid rgba(177, 217, 151, 0.4)" 
                    : "1px solid rgba(177, 217, 151, 0.3)",
                  
                  borderRadius: "12px",
                  fontSize: "13px",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer",
                  
                  // Depth & Shadows
                  boxShadow: isDark 
                    ? "0 8px 24px -4px rgba(0, 0, 0, 0.6), 0 0 15px rgba(177, 217, 151, 0.15)" 
                    : "0 10px 20px -5px rgba(177, 217, 151, 0.25), inset 0 1px 0 rgba(255,255,255,0.4)",
                  
                  transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)"
                }}
              >
                Start Your Pilot <ArrowRight size={14} />
              </button>
            </Link>
          </div>

        </div>

        {/* Right Column: 3D Carousel (Order 2 on Desktop & Mobile) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ 
            position: "relative",
            width: "100%",
            height: "auto",
            minHeight: isMobile ? "400px" : "540px",



            paddingTop: isMobile ? "0" : "0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "visible",
            top: isMobile ? "0" : "-10px",
            willChange: "transform, opacity"


          }}
        >

          <div style={{ 
            width: "100%", 
            height: "100%", 
            position: "relative",
            paddingRight: isMobile ? "0" : "20px", // Safe space for chatbot
            paddingBottom: isMobile ? "40px" : "0"
          }}>
            <ThreeDCarousel 
              items={workflowSlides} 
              autoRotate={true}
              rotateInterval={3000}
            />
          </div>
        </motion.div>
      </motion.div>

      <style jsx>{`
        .feature-card:hover .card-arrow {
          transform: translateX(4px);
          opacity: 0.8 !important;
        }
      `}</style>
    </section>
  );
});

ImmersiveFeatures.displayName = "ImmersiveFeatures";

