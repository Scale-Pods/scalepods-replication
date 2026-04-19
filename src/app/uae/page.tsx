"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronRight, Download, Loader2, HelpCircle, ChevronDown, MessageCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import DownloadModal from "@/components/ui/DownloadModal";

// ── Design tokens ─────────────────────────────────────────────────────────────
const C = {
  bgPage:    "#04070D",
  bgCard:    "#080A10",
  bgPanel:   "#0A0E14",
  bgInput:   "#0D1017",
  border:    "rgba(255,255,255,0.07)",
  borderMid: "rgba(255,255,255,0.12)",
  green:     "#ACD791",
  greenBright: "#8DC763",
  blue:      "#6DB6FF",
  txtBright: "#E4E9F2",
  txtBody:   "#B8C7D9",
  txtMuted:  "#636996",
};
const F = {
  inter: "Inter, sans-serif",
  serif: "Instrument Serif, Georgia, serif",
};

// ── Input style ───────────────────────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  width: "100%",
  background: C.bgInput,
  border: `1px solid ${C.border}`,
  borderRadius: "10px",
  padding: "12px 16px",
  fontFamily: F.inter,
  fontSize: "14px",
  color: C.txtBody,
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  fontFamily: F.inter,
  fontSize: "13px",
  fontWeight: 500,
  color: C.txtBright,
  marginBottom: "8px",
  display: "block",
};

// ── Pod data ──────────────────────────────────────────────────────────────────
const pods = [
  {
    title: "HR Workflow Automation Pod",
    image: "/uae/HR Workflow Automation Pod.avif",
    imageLeft: false,
    features: [
      {
        bold: "Automated Screening & Shortlisting:",
        rest: " AI screens applications, filters top candidates, and builds a qualified shortlist instantly.",
      },
      {
        bold: "Instant Scheduling & Follow-Ups:",
        rest: " Automated WhatsApp/Voice agents schedule interviews, send reminders, and handle coordination.",
      },
      {
        bold: "Streamlined Onboarding Workflow:",
        rest: " Digital documents, task checklists, and approvals handled through fully automated workflows.",
      },
    ],
  },
  {
    title: "Sales Workflow Automation Pod",
    image: "/uae/Sales Workflow Automation Pod.avif",
    imageLeft: true,
    features: [
      {
        bold: "Automated Lead Sourcing & Scraping:",
        rest: " Find verified prospects across industries with AI-powered lead scraping.",
      },
      {
        bold: "Cold Outreach Across Email & LinkedIn:",
        rest: " Launch multi-channel campaigns with automated cold emails, LinkedIn workflows, and smart follow-ups.",
      },
      {
        bold: "Remote SDR & Post-Sales Management:",
        rest: " A dedicated SDR account manager handles qualification, demos, and after-sales coordination.",
      },
    ],
  },
  {
    title: "Ops & Support Automation Pod",
    image: "/uae/Ops & Support Automation Pod.avif",
    imageLeft: false,
    features: [
      {
        bold: "24/7 Customer Support Automation:",
        rest: " AI agents handle FAQs, tickets, order updates, and escalations across WhatsApp, Chat & Voice.",
      },
      {
        bold: "Automated Order & Service Workflows:",
        rest: " Trigger confirmations, reminders, status updates, and feedback requests without manual effort.",
      },
      {
        bold: "Integrated CRM & Operations Hub:",
        rest: " Connect support workflows to your CRM/ERP so teams get real-time updates and zero lead leakage.",
      },
    ],
  },
  {
    title: "Marketing Automation Pod",
    image: "/uae/Marketing Automation Pod.avif",
    imageLeft: true,
    features: [
      {
        bold: "AI Content & Video Creation:",
        rest: " Generate social posts, blogs, video scripts, and full video assets using AI-driven pipelines.",
      },
      {
        bold: "Automated Scheduling & Publishing:",
        rest: " Set it once — AI handles posting across Instagram, LinkedIn, YouTube & more.",
      },
      {
        bold: "Centralized Workflow & Calendar Automation:",
        rest: " Plan, manage, and automate your entire content workflow with smart calendars and approvals.",
      },
    ],
  },
  {
    title: "Custom AI Workflow Pod",
    image: "/uae/Custom AI Workflow Pod.avif",
    imageLeft: false,
    features: [
      {
        bold: "Tailored Workflows Built Around Your Business:",
        rest: " We understand your processes deeply and design automation flows that match your exact operational needs.",
      },
      {
        bold: "End-to-End AI Integration:",
        rest: " Connect CRM, WhatsApp, Voice, HR, Ops & Marketing into one seamless automated system.",
      },
      {
        bold: "Adaptive, Scalable & Fully Customizable:",
        rest: " Workflows evolve with your growth — add new triggers, channels, or automations anytime.",
      },
    ],
  },
];

// ── Pod card component ──────────────────────────────────────────────────────
function PodCard({ pod, index, onDownload }: { pod: typeof pods[0]; index: number; onDownload: () => void }) {
  const textFirst = !pod.imageLeft;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: 0.05 }}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "0",
        background: C.bgCard,
        border: `1px solid ${C.border}`,
        borderRadius: "20px",
        overflow: "hidden",
        marginBottom: "2px",
      }}
    >
      {/* Text side */}
      <div
        style={{
          order: textFirst ? 0 : 1,
          padding: "56px 52px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h3
          style={{
            fontFamily: F.inter,
            fontSize: "28px",
            fontWeight: 700,
            color: C.txtBright,
            marginBottom: "32px",
            lineHeight: 1.2,
          }}
        >
          {pod.title}
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "40px" }}>
          {pod.features.map((f, i) => (
            <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <ChevronRight
                style={{
                  width: "16px",
                  height: "16px",
                  color: C.green,
                  flexShrink: 0,
                  marginTop: "3px",
                }}
              />
              <p
                style={{
                  fontFamily: F.inter,
                  fontSize: "14px",
                  lineHeight: 1.7,
                  color: C.txtBody,
                  margin: 0,
                }}
              >
                <strong style={{ color: C.txtBright, fontWeight: 600 }}>{f.bold}</strong>
                {f.rest}
              </p>
            </div>
          ))}
        </div>

        {/* Download button */}
        <div style={{ position: "relative", display: "inline-block", alignSelf: "flex-start" }}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -10px)",
              width: "280px",
              height: "100px",
              background: "radial-gradient(ellipse at center, rgba(255,255,255,0.09) 0%, transparent 65%)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
          <button
            onClick={(e) => { e.preventDefault(); onDownload(); }}
            style={{
              position: "relative",
              zIndex: 1,
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: F.inter,
              fontSize: "14px",
              fontWeight: 600,
              color: C.txtBright,
              background: C.bgPanel,
              border: `1px solid ${C.borderMid}`,
              borderRadius: "10px",
              padding: "13px 28px",
              textDecoration: "none",
              overflow: "hidden",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                boxShadow: "inset 0px -14px 28px -14px rgba(255,255,255,0.25)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: "10%",
                right: "10%",
                height: "1px",
                background: "rgba(255,255,255,0.75)",
              }}
            />
            <Download style={{ width: "14px", height: "14px", position: "relative", zIndex: 2 }} />
            <span style={{ position: "relative", zIndex: 2 }}>Download the Feature Guide</span>
          </button>
        </div>
      </div>

      {/* Image side */}
      <div
        style={{
          order: textFirst ? 1 : 0,
          position: "relative",
          minHeight: "420px",
          background: C.bgPanel,
          overflow: "hidden",
        }}
      >
        <Image
          src={pod.image}
          alt={pod.title}
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          sizes="600px"
        />
        {/* Edge fade overlay matching the card bg */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: textFirst
              ? "linear-gradient(to left, transparent 60%, rgba(8,10,16,0.5) 100%)"
              : "linear-gradient(to right, transparent 60%, rgba(8,10,16,0.5) 100%)",
            pointerEvents: "none",
          }}
        />
      </div>
    </motion.div>
  );
}

// ── Industries Data & Component ───────────────────────────────────────────────────

const INDUSTRIES = [
  {
    id: "hospitality",
    name: "Hospitality",
    points: [
      "Automate guest booking, confirmations, and pre-arrival check-ins.",
      "Deploy AI concierge bots for 24/7 guest requests and dietary preferences.",
      "Streamline housekeeping instructions based on automated checkout triggers.",
      "Nurture past guests with automated review requests and loyalty offers.",
      "Centralize multi-channel guest inquiries (WhatsApp, Email, Booking platforms).",
    ],
  },
  {
    id: "salons",
    name: "Salons & Spa",
    points: [
      "Automate appointment scheduling, confirmations & rescheduling.",
      "Send personalized service reminders & reactivation campaigns.",
      "Capture walk-in leads & nurture them with WhatsApp sequences.",
      "Auto-generate content (reels, posts, offers) for Instagram & WhatsApp.",
      "Automate membership, package and loyalty follow-ups.",
    ],
  },
  {
    id: "retail",
    name: "Retail Stores",
    points: [
      "Automate inventory alerts and supplier re-ordering workflows.",
      "Launch abandoned cart recovery sequences via WhatsApp and Email.",
      "Manage customer loyalty points and automated reward distributions.",
      "Deploy AI agents to handle return requests and order tracking instantly.",
      "Collect conversational feedback and auto-generate customer reviews.",
    ],
  },
  {
    id: "hospitals",
    name: "Hospitals & Clinics",
    points: [
      "Automate patient appointment booking, reminders & follow-ups.",
      "Use AI triage workflows to collect basic symptoms before handover.",
      "Streamline billing reminders, insurance follow-ups & approvals.",
      "Automate post-consultation care instructions & repeat visit triggers.",
      "Centralise patient communication in Arabic & English.",
    ],
  },
  {
    id: "realestate",
    name: "Real Estate",
    points: [
      "Scrape property leads & launch automated follow-up sequences.",
      "Automate viewing scheduling, confirmations & rescheduling.",
      "Manage document workflows: deposits, contracts, move-in checklists.",
      "Automate tenant communications: rent reminders, maintenance, renewals.",
      "Centralize property enquiries via WhatsApp + CRM integration.",
    ],
  },
];

function IndustriesSection() {
  const [activeTab, setActiveTab] = useState(INDUSTRIES[0].id);
  const activeData = INDUSTRIES.find((ind) => ind.id === activeTab)!;

  return (
    <section style={{ padding: "80px 32px 100px", maxWidth: "1000px", margin: "0 auto" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: "center", marginBottom: "48px" }}
      >
        <h2
          style={{
            fontFamily: F.inter,
            fontSize: "clamp(28px, 3.5vw, 40px)",
            fontWeight: 700,
            color: C.txtBright,
            lineHeight: 1.2,
            marginBottom: "16px",
          }}
        >
          Workflow Automation Solutions Built for{" "}
          <em style={{ fontFamily: F.serif, fontStyle: "italic", color: C.greenBright }}>
            Fast Growing Industries
          </em>
        </h2>
        <p
          style={{
            fontFamily: F.inter,
            fontSize: "15px",
            color: C.txtBright,
            fontWeight: 500,
            lineHeight: 1.6,
          }}
        >
          Businesses across the UAE trust Scalepods to automate sales, HR, operations, and support workflows
          using Conversational AI and custom automation pipelines. Whether you’re in hospitality, retail,
          healthcare, real estate, or beauty &amp; wellness, our workflow automation solutions streamline processes,
          reduce manual effort, and improve efficiency across every department.
        </p>
      </motion.div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "12px",
          marginBottom: "48px",
        }}
      >
        {INDUSTRIES.map((ind) => {
          const isActive = activeTab === ind.id;
          return (
            <button
              key={ind.id}
              onClick={() => setActiveTab(ind.id)}
              style={{
                fontFamily: F.inter,
                fontSize: "15px",
                fontWeight: 600,
                color: isActive ? "#000" : C.txtBright,
                background: isActive ? C.greenBright : "transparent",
                border: `1px solid ${isActive ? C.greenBright : "rgba(255,255,255,0.15)"}`,
                borderRadius: "30px",
                padding: "12px 28px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              {ind.name}
            </button>
          );
        })}
      </div>

      {/* Animated Content Card */}
      <div
        style={{
          background: C.bgCard,
          border: `1px solid rgba(172, 215, 145, 0.15)`,
          borderRadius: "16px",
          padding: "48px",
          minHeight: "320px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
        }}
      >
        <motion.div
          key={activeTab} // triggers re-animation on tab change
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{ display: "flex", flexDirection: "column", gap: "24px" }}
        >
          {activeData.points.map((point, idx) => (
            <motion.div
              key={`${activeTab}-${idx}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}
            >
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: "rgba(172, 215, 145, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: "2px",
                }}
              >
                <ChevronRight style={{ width: "14px", height: "14px", color: C.greenBright }} />
              </div>
              <p
                style={{
                  fontFamily: F.inter,
                  fontSize: "16px",
                  color: C.txtBright,
                  fontWeight: 500,
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                {point}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── Why Choose Us ─────────────────────────────────────────────────────────────

const CHOICES = [
  {
    title: "End-to-End Workflow Automation",
    description: "Automate sales, hiring, support, and marketing workflows through one unified automation platform."
  },
  {
    title: "Custom Solutions for Every Business",
    description: "Tailored AI workflows designed around your industry, team size, and operational processes."
  },
  {
    title: "Faster Go-Live & Rapid ROI",
    description: "Deploy fully functional workflows within 7 days and start seeing results during the 30-day pilot."
  },
  {
    title: "Human + AI for Maximum Efficiency",
    description: "Our remote SDRs and operations pods work alongside AI agents to ensure accuracy, quality, and personalisation."
  },
  {
    title: "Built for the UAE Market",
    description: "Arabic-friendly workflows, WhatsApp-first automation, and seamless integration with your existing systems."
  }
];

function WhyChooseUsSection() {
  return (
    <section style={{ padding: "60px 32px 120px", maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: "56px" }}
      >
        <h2
          style={{
            fontFamily: F.inter,
            fontSize: "clamp(28px, 3.5vw, 36px)",
            fontWeight: 700,
            color: C.txtBright,
            lineHeight: 1.3,
            marginBottom: "8px",
          }}
        >
          Why Businesses Choose Scalepods as Their
          <br />
          <em style={{ fontFamily: F.serif, fontStyle: "italic", fontWeight: 400, color: C.greenBright }}>
            Workflow Automation Partner
          </em>
        </h2>
        <p
          style={{
            fontFamily: F.inter,
            fontSize: "15px",
            color: C.txtBright,
            fontWeight: 600,
            lineHeight: 1.6,
            marginTop: "24px",
            padding: "0 20px"
          }}
        >
          Scalepods combines Conversational Agentic AI with managed human pods to automate sales, HR, marketing, and operations end-to-end. 
          Our custom workflow automation solutions reduce manual work, accelerate growth, and help UAE businesses scale faster with lower 
          operational costs. Designed for local needs and bilingual (EN/AR) support, Scalepods delivers measurable results from day one.
        </p>
      </motion.div>

      <div style={{ textAlign: "left" }}>
        {CHOICES.map((choice, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            style={{
              padding: "24px 0",
              borderTop: i === 0 ? "none" : `1.5px solid rgba(255, 255, 255, 0.9)`,
            }}
          >
            <h3
              style={{
                fontFamily: F.inter,
                fontSize: "22px",
                fontWeight: 600,
                color: C.blue,
                marginBottom: "8px",
                letterSpacing: "-0.01em"
              }}
            >
              {choice.title}
            </h3>
            <p
              style={{
                fontFamily: F.inter,
                fontSize: "16px",
                color: "rgba(255, 255, 255, 0.65)",
                margin: 0,
                lineHeight: 1.6,
                fontWeight: 500,
              }}
            >
              {choice.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ── Autonomous Workflows ────────────────────────────────────────────────────────

const AUTONOMOUS_FEATURES = [
  {
    title: "1. Self-Optimizing & Continuously Learning",
    description: "AI agents adapt in real time based on performance, learning from interactions, outcomes, and user behaviour to improve accuracy and reduce manual oversight."
  },
  {
    title: "2. Autonomous Sales & Operations Execution",
    description: "From scraping leads to follow-ups, scheduling, ticketing and order workflows — autonomous pods run end-to-end tasks without manual intervention."
  },
  {
    title: "3. Touchless Content & HR Automation",
    description: "AI generates content, screens candidates, schedules interviews, and updates workflows automatically — eliminating repetitive admin work entirely."
  },
  {
    title: "4. Trusted by High-Growth Teams Across the UAE",
    description: "Startups and SMEs use Scalepods to automate sales, HR, marketing, and support — reducing costs, improving speed, and scaling workflows in under 7 days."
  }
];

function AutonomousWorkflowsSection({ onDownload }: { onDownload: () => void }) {
  return (
    <section style={{ padding: "80px 32px 140px", maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: "56px" }}
      >
        <h2
          style={{
            fontFamily: F.inter,
            fontSize: "clamp(26px, 3vw, 36px)",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.3,
            marginBottom: "24px",
          }}
        >
          <em style={{ fontFamily: F.serif, fontStyle: "italic", fontWeight: 400, color: C.greenBright }}>
            From Manual Tasks to Autonomous Workflows:
          </em>{" "}
          Agentic AI Built for Modern
          <br />
          Growing Businesses
        </h2>
        <p
          style={{
            fontFamily: F.inter,
            fontSize: "16px",
            color: "#fff",
            fontWeight: 500,
            lineHeight: 1.6,
            maxWidth: "850px",
            margin: "0 auto"
          }}
        >
          Traditional automation only reduces steps — Scalepods' Agentic AI executes entire workflows on autopilot.
          Our AI agents don't just automate tasks; they understand context, take actions, and continuously improve
          your business processes.
        </p>
      </motion.div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "24px",
          marginBottom: "80px"
        }}
      >
        {AUTONOMOUS_FEATURES.map((feat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            style={{
              background: "#05070A",
              border: "1px solid rgba(109, 182, 255, 0.15)",
              borderRadius: "6px",
              padding: "32px 28px",
              textAlign: "left",
              boxShadow: "0 12px 32px rgba(0,0,0,0.4), inset 0 0 20px rgba(109, 182, 255, 0.03)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.5), inset 0 0 40px rgba(109, 182, 255, 0.08)";
              e.currentTarget.style.border = "1px solid rgba(109, 182, 255, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.4), inset 0 0 20px rgba(109, 182, 255, 0.03)";
              e.currentTarget.style.border = "1px solid rgba(109, 182, 255, 0.15)";
            }}
          >
            <h3
              style={{
                fontFamily: F.inter,
                fontSize: "18px",
                fontWeight: 700,
                color: "#fff",
                marginBottom: "12px",
                letterSpacing: "-0.01em"
              }}
            >
              {feat.title}
            </h3>
            <p
              style={{
                fontFamily: F.inter,
                fontSize: "15px",
                color: "rgba(255,255,255,0.85)",
                fontWeight: 500,
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              {feat.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Button with glow */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{ position: "relative", display: "inline-block" }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -10px)",
            width: "320px",
            height: "110px",
            background: "radial-gradient(ellipse at center, rgba(255,255,255,0.15) 0%, transparent 65%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <button
          onClick={(e) => { e.preventDefault(); onDownload(); }}
          style={{
            position: "relative",
            zIndex: 1,
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: F.inter,
            fontSize: "15px",
            fontWeight: 600,
            color: "#FFFFFF",
            background: "rgba(12,14,20,0.8)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "12px",
            padding: "16px 40px",
            cursor: "pointer",
            backdropFilter: "blur(8px)",
            overflow: "hidden",
            minWidth: "280px",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              boxShadow: "inset 0px -18px 32px -16px rgba(255,255,255,0.35)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: "8%",
              right: "8%",
              height: "1px",
              background: "rgba(255,255,255,0.9)",
            }}
          />
          <span style={{ position: "relative", zIndex: 2 }}>Download the Feature Guide</span>
        </button>
      </motion.div>
    </section>
  );
}
// ── FAQ Section ───────────────────────────────────────────────────────────────

const FAQS = [
  {
    question: "Q1: What is a workflow automation company and how can it benefit my business?",
    answer: "A workflow automation company like Scalepods builds AI-driven + human-in-loop systems that automate repetitive tasks - from lead outreach to HR onboarding to customer support. This reduces errors, cuts operational costs, and boosts efficiency so businesses can scale faster."
  },
  {
    question: "Can small and medium-sized businesses (SMBs) use workflow automation or is it only for large enterprises?",
    answer: "Workflow automation is incredibly beneficial for SMBs. Our solutions are designed to help growing teams do more with less, automating repetitive administrative tasks so your team can focus on closing deals and growth, without needing to hire large operational teams."
  },
  {
    question: "How fast can we implement automation workflows with ScalePods?",
    answer: "We pride ourselves on speed to value. Typical pilot programs and core workflows can be fully deployed within 7 to 14 days, allowing you to start seeing measurable ROI in your first month of partnership."
  },
  {
    question: "Will workflow automation really reduce errors and improve reliability of business processes?",
    answer: "Yes. By replacing manual data entry and repetitive tasks with AI agents and rule-based logic, errors are virtually eliminated. Our human-in-the-loop managed pods ensure that any edge cases are handled with perfect accuracy."
  },
  {
    question: "What types of business functions can Scalepods automate (sales, HR, support, marketing, operations)?",
    answer: "We automate end-to-end workflows across your entire business. This includes lead scraping and multichannel outreach for sales, candidate screening and interview scheduling for HR, and 24/7 AI-driven conversational support."
  },
  {
    question: "Is it difficult to integrate Scalepods automation with existing tools and systems (CRM, ERP, WhatsApp)?",
    answer: "Not at all. Scalepods is built to seamlessly integrate with your existing tech stack, including popular CRMs like Salesforce or HubSpot, ERP systems, and communication channels like WhatsApp, ensuring a smooth transition with zero disruption."
  }
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section style={{ padding: "80px 32px 140px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: "center", marginBottom: "56px" }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "20px",
            padding: "6px 16px",
            marginBottom: "24px"
          }}
        >
          <MessageCircle style={{ width: "14px", height: "14px", color: C.blue }} />
          <span style={{ fontFamily: F.inter, fontSize: "13px", fontWeight: 600, color: C.txtBright, letterSpacing: "0.05em" }}>
            FAQ'S
          </span>
        </div>
        <h2
          style={{
            fontFamily: F.inter,
            fontSize: "clamp(32px, 4vw, 48px)",
            fontWeight: 700,
            color: C.txtBright,
            lineHeight: 1.2,
            marginBottom: "16px",
          }}
        >
          Frequently Asked{" "}
          <em style={{ fontFamily: F.serif, fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.7)" }}>
            Questions
          </em>
        </h2>
        <p
          style={{
            fontFamily: F.inter,
            fontSize: "16px",
            color: "rgba(255,255,255,0.6)",
            fontWeight: 500,
          }}
        >
          Find quick answers to the most common support questions
        </p>
      </motion.div>

      {/* Grid Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "40px",
          alignItems: "flex-start"
        }}
      >
        {/* Left Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            background: "#080A0E",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "16px",
            padding: "48px 32px",
            textAlign: "center",
            boxShadow: "0 12px 32px rgba(0,0,0,0.3)"
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px"
            }}
          >
            <HelpCircle style={{ width: "24px", height: "24px", color: C.txtBright }} />
          </div>
          <h3
            style={{
              fontFamily: F.inter,
              fontSize: "20px",
              fontWeight: 700,
              color: C.txtBright,
              marginBottom: "16px"
            }}
          >
            Still Have Questions?
          </h3>
          <p
            style={{
              fontFamily: F.inter,
              fontSize: "15px",
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.6,
              marginBottom: "32px",
              fontWeight: 500
            }}
          >
            Still have questions? Feel free to get in touch with us today!
          </p>
          <a
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: F.inter,
              fontSize: "14px",
              fontWeight: 600,
              color: C.greenBright,
              background: "#12161E",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: "8px",
              padding: "14px 28px",
              textDecoration: "none",
              transition: "background 0.2s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#1A1F2A"}
            onMouseLeave={(e) => e.currentTarget.style.background = "#12161E"}
          >
            <span style={{ fontSize: "16px" }}>↗</span> Ask A Question
          </a>
        </motion.div>

        {/* Right Accordion */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                style={{
                  background: "#080A0E",
                  border: "1px solid rgba(109, 182, 255, 0.15)",
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "24px 32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "24px",
                    cursor: "pointer",
                  }}
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                >
                  <h4
                    style={{
                      fontFamily: F.inter,
                      fontSize: "16px",
                      fontWeight: 500,
                      color: C.blue,
                      margin: 0,
                      lineHeight: 1.5
                    }}
                  >
                    {faq.question}
                  </h4>
                  <ChevronDown
                    style={{
                      width: "20px",
                      height: "20px",
                      color: "rgba(255,255,255,0.5)",
                      flexShrink: 0,
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease"
                    }}
                  />
                </div>
                
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ padding: "0 32px 32px", color: "rgba(255,255,255,0.6)" }}
                  >
                    <div style={{ height: "1px", background: "rgba(255,255,255,0.1)", marginBottom: "20px" }} />
                    <p style={{ fontFamily: F.inter, fontSize: "15px", lineHeight: 1.6, margin: 0 }}>
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Main UAE Page ─────────────────────────────────────────────────────────────
export default function UAEPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: dbError } = await supabase
      .from("contact_submissions")
      .insert([{ full_name: form.name, email: form.email, phone: form.phone, source: "UAE Page" }]);

    setLoading(false);
    if (dbError) {
      setError("Something went wrong. Please try again.");
    } else {
      setSubmitted(true);
    }
  }

  return (
    <main style={{ background: C.bgPage, minHeight: "100vh", fontFamily: F.inter }}>

      {/* ── HERO / COVER SECTION ─────────────────────────────────────────── */}
      {/* Starts at 56px = navbar height (fixed). Full-width edge-to-edge. */}
      <section
        style={{
          position: "relative",
          marginTop: "56px",
          width: "100vw",
          marginLeft: "calc(-50vw + 50%)",
          height: "340px",
          overflow: "hidden",
          background: "#000",
        }}
      >
        {/* Image fills full width — cover fit, centered */}
        <Image
          src="/uae/head uae page.avif"
          alt="ScalePods UAE — Your End-to-End Workflow Automation Partner"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center 30%" }}
          sizes="100vw"
        />

        {/* Bottom fade to page bg */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "100px",
            background: "linear-gradient(to bottom, transparent, #04070D)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* Floor glow line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "1px",
            background: "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.35) 50%, transparent 90%)",
            boxShadow: "0 -12px 40px 8px rgba(255,255,255,0.1)",
            zIndex: 2,
          }}
        />

        {/* Download button — overlaid inside image, bottom-center */}
        <div
          style={{
            position: "absolute",
            bottom: "48px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 3,
          }}
        >
          <div style={{ position: "relative", display: "inline-block" }}>
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -10px)",
                width: "340px",
                height: "120px",
                background: "radial-gradient(ellipse at center, rgba(255,255,255,0.14) 0%, transparent 65%)",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />
            <button
              onClick={(e) => { e.preventDefault(); setIsDownloadModalOpen(true); }}
              style={{
                position: "relative",
                zIndex: 1,
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: F.inter,
                fontSize: "15px",
                fontWeight: 600,
                color: "#FFFFFF",
                background: "rgba(8,10,16,0.85)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "12px",
                padding: "14px 40px",
                cursor: "pointer",
                backdropFilter: "blur(12px)",
                overflow: "hidden",
                minWidth: "280px",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  boxShadow: "inset 0px -16px 30px -14px rgba(255,255,255,0.32)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: "8%",
                  right: "8%",
                  height: "1px",
                  background: "rgba(255,255,255,0.85)",
                }}
              />
              <Download style={{ width: "16px", height: "16px", position: "relative", zIndex: 2 }} />
              <span style={{ position: "relative", zIndex: 2 }}>Download the Feature Guide</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── PLUG AND PLAY SECTION ─────────────────────────────────────────── */}
      <section style={{ padding: "100px 32px", position: "relative" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "64px",
            alignItems: "center",
          }}
        >
          {/* Left: headline + bullets */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <h2
              style={{
                fontFamily: F.serif,
                fontStyle: "italic",
                fontSize: "clamp(36px, 4vw, 54px)",
                fontWeight: 400,
                color: C.green,
                lineHeight: 1.15,
                marginBottom: "8px",
              }}
            >
              Plug - and - Play Pods
            </h2>
            <h3
              style={{
                fontFamily: F.inter,
                fontSize: "clamp(20px, 2.5vw, 28px)",
                fontWeight: 700,
                color: C.txtBright,
                marginBottom: "20px",
              }}
            >
              for Growing Businesses.
            </h3>
            <p
              style={{
                fontFamily: F.inter,
                fontSize: "15px",
                fontWeight: 600,
                color: C.txtBody,
                marginBottom: "32px",
                lineHeight: 1.6,
              }}
            >
              Automated Workflows That Accelerate Sales, Hiring &amp; Operations
            </p>

            {/* Bullet list */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                "Source, screen & schedule top talent on autopilot.",
                "Deliver 24/7 customer care without scaling headcount.",
                "Convert leads into booked customers with AI-powered outreach.",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <ChevronRight
                    style={{ width: "16px", height: "16px", color: C.green, flexShrink: 0, marginTop: "3px" }}
                  />
                  <p
                    style={{
                      fontFamily: F.inter,
                      fontSize: "14px",
                      color: C.txtBody,
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: stat + form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            {/* Stat headline */}
            <div style={{ marginBottom: "28px", textAlign: "center" }}>
              <p
                style={{
                  fontFamily: F.inter,
                  fontSize: "clamp(16px, 2vw, 20px)",
                  fontWeight: 700,
                  color: C.txtBright,
                  lineHeight: 1.4,
                  marginBottom: "4px",
                }}
              >
                Improve Workflow{" "}
                <em style={{ fontFamily: F.serif, fontStyle: "italic", color: C.green }}>Efficiency by</em>
              </p>
              <p
                style={{
                  fontFamily: F.inter,
                  fontSize: "clamp(18px, 2.5vw, 24px)",
                  fontWeight: 800,
                  color: C.txtBright,
                  lineHeight: 1.3,
                }}
              >
                <span style={{ fontFamily: F.serif, fontStyle: "italic", color: C.green }}>30%</span>{" "}
                and Eliminate Bottlenecks
              </p>
              <p style={{ fontFamily: F.inter, fontSize: "14px", color: C.txtMuted, marginTop: "8px" }}>
                By completing the form
              </p>
            </div>

            {/* Form card */}
            <div
              style={{
                background: C.bgCard,
                border: `1px solid ${C.border}`,
                borderRadius: "16px",
                padding: "32px",
              }}
            >
              {submitted ? (
                <div style={{ textAlign: "center", padding: "32px 0" }}>
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "50%",
                      background: "rgba(172,215,145,0.1)",
                      border: "1px solid rgba(172,215,145,0.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <h3 style={{ fontFamily: F.inter, fontSize: "18px", color: C.txtBright, marginBottom: "8px" }}>
                    Request Received!
                  </h3>
                  <p style={{ fontFamily: F.inter, fontSize: "14px", color: C.txtMuted }}>
                    We'll reach out within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Full Name */}
                  <div style={{ marginBottom: "18px" }}>
                    <label style={labelStyle}>Full Name</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Alex Sollork"
                      style={inputStyle}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div style={{ marginBottom: "18px" }}>
                    <label style={labelStyle}>Email Address</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Alex@gmail.com"
                      style={inputStyle}
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div style={{ marginBottom: "24px" }}>
                    <label style={labelStyle}>Phone Number</label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Enter with Country Code"
                      style={inputStyle}
                    />
                  </div>

                  {error && (
                    <p
                      style={{
                        fontFamily: F.inter,
                        fontSize: "13px",
                        color: "#F87171",
                        marginBottom: "12px",
                        padding: "10px 14px",
                        background: "rgba(248,113,113,0.08)",
                        border: "1px solid rgba(248,113,113,0.2)",
                        borderRadius: "8px",
                      }}
                    >
                      {error}
                    </p>
                  )}

                  {/* Submit button */}
                  <div style={{ position: "relative" }}>
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -10px)",
                        width: "100%",
                        height: "110px",
                        background:
                          "radial-gradient(ellipse at center, rgba(255,255,255,0.1) 0%, transparent 65%)",
                        pointerEvents: "none",
                        zIndex: 0,
                      }}
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        position: "relative",
                        zIndex: 1,
                        width: "100%",
                        padding: "14px 24px",
                        fontFamily: F.inter,
                        fontSize: "15px",
                        fontWeight: 600,
                        color: C.txtBright,
                        background: C.bgPanel,
                        border: `1px solid ${C.borderMid}`,
                        borderRadius: "10px",
                        cursor: loading ? "not-allowed" : "pointer",
                        overflow: "hidden",
                        opacity: loading ? 0.7 : 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          boxShadow: "inset 0px -14px 28px -14px rgba(255,255,255,0.28)",
                          pointerEvents: "none",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: "10%",
                          right: "10%",
                          height: "1px",
                          background: "rgba(255,255,255,0.8)",
                        }}
                      />
                      {loading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <Loader2
                            style={{ width: "16px", height: "16px", position: "relative", zIndex: 2 }}
                          />
                        </motion.div>
                      ) : null}
                      <span style={{ position: "relative", zIndex: 2 }}>
                        {loading ? "Submitting..." : "Book A Full Funnel Analysis"}
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* Section floor light */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "1px",
            background: "linear-gradient(90deg, transparent 15%, rgba(255,255,255,0.3) 50%, transparent 85%)",
            boxShadow: "0 -10px 36px 4px rgba(255,255,255,0.07)",
          }}
        />
      </section>

      {/* ── KEY FEATURES HEADER ───────────────────────────────────────────── */}
      <section style={{ padding: "80px 32px 20px", textAlign: "center" }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: F.inter,
            fontSize: "clamp(28px, 3.5vw, 48px)",
            fontWeight: 700,
            color: C.txtBright,
            lineHeight: 1.2,
          }}
        >
          Key Features of{" "}
          <em
            style={{
              fontFamily: F.serif,
              fontStyle: "italic",
              fontWeight: 400,
              color: C.green,
            }}
          >
            Scalepods Workflow Automation
          </em>
        </motion.h2>
      </section>

      {/* ── POD CARDS ─────────────────────────────────────────────────────── */}
      <section style={{ padding: "40px 32px 60px", maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {pods.map((pod, i) => (
            <PodCard key={pod.title} pod={pod} index={i} onDownload={() => setIsDownloadModalOpen(true)} />
          ))}
        </div>
      </section>

      {/* ── WHAT UAE BUSINESSES ACHIEVE ────────────────────────────────────────── */}
      <section style={{ padding: "60px 32px", position: "relative" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            background: C.bgCard,
            border: `1px solid ${C.border}`,
            borderRadius: "16px",
            padding: "56px 48px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: F.inter,
              fontSize: "clamp(28px, 3.5vw, 40px)",
              fontWeight: 700,
              color: C.txtBright,
              lineHeight: 1.2,
              marginBottom: "16px",
            }}
          >
            What{" "}
            <em style={{ fontFamily: F.serif, fontStyle: "italic", color: C.greenBright }}>
              UAE Businesses
            </em>{" "}
            Achieve with Scalepods
          </h2>
          <p
            style={{
              fontFamily: F.inter,
              fontSize: "16px",
              color: C.txtBright,
              fontWeight: 600,
              maxWidth: "800px",
              margin: "0 auto 20px",
              lineHeight: 1.6,
            }}
          >
            By combining Conversational Agentic AI with managed human pods, Scalepods delivers
            fast, measurable improvements across sales, hiring and operations.
          </p>
          <p
            style={{
              fontFamily: F.inter,
              fontSize: "16px",
              color: C.blue,
              fontWeight: 600,
              marginBottom: "48px",
            }}
          >
            Typical pilot outcomes we deliver for UAE SMEs:
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "stretch",
              gap: "24px",
              position: "relative",
            }}
          >
            {/* Column 1 */}
            <div style={{ flex: 1, textAlign: "center", padding: "0 10px" }}>
              <div style={{ color: C.greenBright, fontSize: "28px", fontWeight: 800, marginBottom: "8px" }}>
                3x
              </div>
              <div style={{ color: C.greenBright, fontSize: "20px", fontWeight: 700, marginBottom: "12px", lineHeight: 1.2 }}>
                More Booked Demos
              </div>
              <p style={{ color: C.txtBody, fontSize: "14px", lineHeight: 1.5, margin: 0 }}>
                Typical pilot uplift in booked meetings thanks to automated lead scraping,
                multi-channel outreach and instant scheduling.
              </p>
            </div>

            {/* Separator 1 */}
            <div style={{ width: "2px", background: "#fff", position: "relative", alignSelf: "stretch", opacity: 0.8, marginTop: "12px", marginBottom: "12px" }}>
              <div style={{ width: "8px", height: "8px", background: "#fff", borderRadius: "50%", position: "absolute", top: "-4px", left: "-3px" }} />
              <div style={{ width: "8px", height: "8px", background: "#fff", borderRadius: "50%", position: "absolute", bottom: "-4px", left: "-3px" }} />
            </div>

            {/* Column 2 */}
            <div style={{ flex: 1, textAlign: "center", padding: "0 10px" }}>
              <div style={{ color: C.greenBright, fontSize: "28px", fontWeight: 800, marginBottom: "8px" }}>
                50%
              </div>
              <div style={{ color: C.greenBright, fontSize: "20px", fontWeight: 700, marginBottom: "12px", lineHeight: 1.2 }}>
                Faster Time-to-Hire
              </div>
              <p style={{ color: C.txtBody, fontSize: "14px", lineHeight: 1.5, margin: 0 }}>
                Reduce hiring cycles by up to half with AI screening, instant shortlists
                and automated interview scheduling.
              </p>
            </div>

            {/* Separator 2 */}
            <div style={{ width: "2px", background: "#fff", position: "relative", alignSelf: "stretch", opacity: 0.8, marginTop: "12px", marginBottom: "12px" }}>
              <div style={{ width: "8px", height: "8px", background: "#fff", borderRadius: "50%", position: "absolute", top: "-4px", left: "-3px" }} />
              <div style={{ width: "8px", height: "8px", background: "#fff", borderRadius: "50%", position: "absolute", bottom: "-4px", left: "-3px" }} />
            </div>

            {/* Column 3 */}
            <div style={{ flex: 1, textAlign: "center", padding: "0 10px" }}>
              <div style={{ color: C.greenBright, fontSize: "28px", fontWeight: 800, marginBottom: "8px" }}>
                70%
              </div>
              <div style={{ color: C.greenBright, fontSize: "20px", fontWeight: 700, marginBottom: "12px", lineHeight: 1.2 }}>
                Less Manual Follow-Up
              </div>
              <p style={{ color: C.txtBody, fontSize: "14px", lineHeight: 1.5, margin: 0 }}>
                Cut manual outreach and follow-ups through WhatsApp/Voice/Chat
                automation and human-in-the-loop handovers.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── TOP BENEFITS SECTION ────────────────────────────────────────────── */}
      <section style={{ padding: "60px 32px 100px", maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2
            style={{
              fontFamily: F.inter,
              fontSize: "clamp(28px, 3.5vw, 40px)",
              fontWeight: 700,
              color: C.txtBright,
              lineHeight: 1.2,
              marginBottom: "16px",
            }}
          >
            Top Benefits of{" "}
            <em style={{ fontFamily: F.serif, fontStyle: "italic", color: C.greenBright }}>
              Scalepods Workflow Automation
            </em>
          </h2>
          <p
            style={{
              fontFamily: F.inter,
              fontSize: "15px",
              color: C.txtBright,
              fontWeight: 500,
              maxWidth: "850px",
              margin: "0 auto 56px",
              lineHeight: 1.6,
            }}
          >
            Discover how Scalepods' AI-powered workflow automation enhances sales, hiring, and operations.
            From reducing manual work to improving speed and accuracy, our custom workflows help UAE
            businesses scale faster with fewer resources.
          </p>
        </motion.div>

        {/* 4 Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "24px",
            marginBottom: "48px",
          }}
        >
          {[
            {
              title: "Accelerated Sales Efficiency",
              desc: "Automated lead scraping, multi-channel outreach, and AI-driven follow-ups remove manual bottlenecks. Your sales team spends less time chasing and more time closing.",
            },
            {
              title: "Faster, Smarter Hiring",
              desc: "Our HR workflow automation pod screens, filters, and schedules candidates instantly. Reduce hiring delays, maintain quality, and streamline onboarding across all departments.",
            },
            {
              title: "24/7 Customer Support Automation",
              desc: "AI support agents handle inquiries, updates, and issue resolution round-the-clock, enabling faster response times and improved customer satisfaction without adding headcount.",
            },
            {
              title: "End-To-End Workflow Integration",
              desc: "Connect sales, HR, marketing, and operations into one automated system. Scalepods unifies your business processes to eliminate silos and improve decision-making with real-time visibility.",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              style={{
                background: C.bgCard,
                border: "1px solid rgba(109, 182, 255, 0.2)",
                borderRadius: "12px",
                padding: "36px 24px 24px",
                position: "relative",
                textAlign: "center",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(109, 182, 255, 0.15)";
                e.currentTarget.style.border = "1px solid rgba(109, 182, 255, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.4)";
                e.currentTarget.style.border = "1px solid rgba(109, 182, 255, 0.2)";
              }}
            >
              {/* Number Circle */}
              <div
                style={{
                  position: "absolute",
                  top: "-16px",
                  left: "-16px",
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "#051323",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: C.blue,
                  fontFamily: F.inter,
                  fontSize: "18px",
                  fontWeight: 800,
                  boxShadow: "0 0 16px rgba(109, 182, 255, 0.3)",
                }}
              >
                {idx + 1}
              </div>
              <h3
                style={{
                  fontFamily: F.inter,
                  fontSize: "16px",
                  fontWeight: 700,
                  color: C.txtBright,
                  marginBottom: "16px",
                  lineHeight: 1.3,
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontFamily: F.inter,
                  fontSize: "13px",
                  color: C.txtBody,
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: F.inter,
              fontSize: "14px",
              fontWeight: 600,
              color: C.greenBright,
              background: "#11171A",
              border: "1px solid rgba(141, 199, 99, 0.2)",
              borderRadius: "8px",
              padding: "12px 24px",
              textDecoration: "none",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#162024")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#11171A")}
          >
            <span style={{ fontSize: "16px" }}>↗</span> Discover the Impact for Your Business
          </a>
        </motion.div>
      </section>

      {/* ── INDUSTRIES SECTION ────────────────────────────────────────────── */}
      <IndustriesSection />

      {/* ── WHY CHOOSE US SECTION ─────────────────────────────────────────── */}
      <WhyChooseUsSection />

      {/* ── AUTONOMOUS WORKFLOWS SECTION ──────────────────────────────────── */}
      <AutonomousWorkflowsSection onDownload={() => setIsDownloadModalOpen(true)} />

      {/* ── FAQ SECTION ───────────────────────────────────────────────────── */}
      <FAQSection />

      <DownloadModal isOpen={isDownloadModalOpen} onClose={() => setIsDownloadModalOpen(false)} />
    </main>
  );
}
