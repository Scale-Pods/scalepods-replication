"use client";

import React, { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles, Target, Workflow, X } from "lucide-react";

function EyebrowGroupIcon() {
  return (
    <svg width="16" height="15" viewBox="0 0 22 18" fill="none" aria-hidden="true">
      <circle cx="5.2" cy="7" r="2.3" fill="#60A5FA" />
      <path d="M1.5 14.8c.5-2.8 6.9-2.8 7.4 0" fill="#60A5FA" />
      <circle cx="16.8" cy="7" r="2.3" fill="#60A5FA" />
      <path d="M13.1 14.8c.5-2.8 6.9-2.8 7.4 0" fill="#60A5FA" />
      <circle cx="11" cy="5.5" r="2.8" fill="#1D4ED8" />
      <path d="M6.2 15.5c.8-3.8 8.8-3.8 9.6 0" fill="#1D4ED8" />
    </svg>
  );
}

function AttendAccentSparks({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <motion.svg
      width="26"
      height="20"
      viewBox="0 0 26 20"
      fill="none"
      aria-hidden="true"
      animate={
        reduceMotion
          ? undefined
          : {
              opacity: [0.75, 1, 0.75],
              scale: [0.96, 1.04, 0.96],
            }
      }
      transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
    >
      <path d="M6 12L3.5 5.5" stroke="#60A5FA" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M12.5 11.5L13.5 4" stroke="#3B82F6" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M18 14L23.5 9.5" stroke="#60A5FA" strokeWidth="2.2" strokeLinecap="round" />
    </motion.svg>
  );
}

function IconFounderBlue() {
  return (
    <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="9.2" r="4.3" fill="#2563EB" />
      <path
        d="M6.5 22.8C7.1 17.5 10.2 15 14 15C17.8 15 20.9 17.5 21.5 22.8H6.5Z"
        fill="#2563EB"
      />
      <path d="M12.3 15L14 19.8L15.7 15" fill="#EFF6FF" />
      <path d="M13.5 16.2L14 21.2L14.5 16.2" fill="#93C5FD" />
    </svg>
  );
}

function IconAnalyticsPurple() {
  return (
    <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path
        d="M5.5 6.5V20.5C5.5 21.33 6.17 22 7 22H22.5"
        stroke="#7C3AED"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 17.2L12.6 12.6L16.2 15.2L21.5 9.2"
        stroke="#7C3AED"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMegaphoneGreen() {
  return (
    <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path
        d="M6.5 12.2L19.5 6.8V20.2L6.5 14.8V12.2Z"
        stroke="#10B981"
        strokeWidth="2.4"
        strokeLinejoin="round"
        fill="#D1FAE5"
      />
      <path
        d="M21 8.8C22.4 10.6 22.4 16.4 21 18.2"
        stroke="#10B981"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M9.5 16L11.3 21.8C11.5 22.4 12.1 22.8 12.7 22.8H14C14.5 22.8 14.9 22.3 14.7 21.8L13 17.5"
        stroke="#059669"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconGearsOrange() {
  return (
    <svg width="28" height="28" viewBox="0 0 30 30" fill="none" aria-hidden="true">
      {/* Upper-left gear */}
      <path
        d="M11 4.5L12 6.2L14 5.9L14.5 7.8L16.2 8.7L15.6 10.6L16.9 12.1L15.5 13.5L15.7 15.4L13.8 15.8L13 17.5L11 17L9.5 18.3L8.1 17L6.2 17.2L5.8 15.3L4.1 14.5L4.6 12.5L3.3 11L4.7 9.6L4.5 7.7L6.4 7.3L7.2 5.6L9.1 6.1L11 4.5Z"
        fill="#EA580C"
      />
      <circle cx="10.1" cy="11.4" r="2.5" fill="#FFEDD5" />

      {/* Lower-right smaller gear */}
      <path
        d="M20.5 13.2L21.3 14.6L22.9 14.4L23.3 15.9L24.7 16.6L24.2 18.2L25.2 19.4L24.1 20.5L24.3 22L22.7 22.4L22.1 23.7L20.5 23.3L19.3 24.4L18.1 23.3L16.6 23.5L16.3 21.9L14.9 21.3L15.3 19.7L14.2 18.5L15.4 17.4L15.2 15.8L16.8 15.5L17.4 14.1L19 14.5L20.5 13.2Z"
        fill="#F97316"
      />
      <circle cx="19.7" cy="18.8" r="2.1" fill="#FFEDD5" />
    </svg>
  );
}

function IconEntrepreneurTeal() {
  return (
    <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect
        x="4.5"
        y="9.2"
        width="19"
        height="13.5"
        rx="3.2"
        fill="#CCFBF1"
        stroke="#0D9488"
        strokeWidth="2.2"
      />
      <path
        d="M10.2 9.2V7.2C10.2 6.1 11.1 5.2 12.2 5.2H15.8C16.9 5.2 17.8 6.1 17.8 7.2V9.2"
        stroke="#0D9488"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M14.8 12.2L11.8 16.2H14.5L13.3 19.6L16.8 15.2H14.1L14.8 12.2Z"
        fill="#0F766E"
      />
    </svg>
  );
}

function RocketBannerIcon({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <motion.svg
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      animate={
        reduceMotion
          ? undefined
          : {
              y: [0, -2, 0],
              x: [0, 1.5, 0],
            }
      }
      transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Flame */}
      <path d="M7.5 21.5L4.5 27.5L10.5 24.5" fill="#F59E0B" />
      <path d="M8 22.2L6.2 25.8L9.8 24" fill="#FDE047" />
      {/* Fins */}
      <path d="M11 16L6 17.5L8.5 21L13.5 19.5" fill="#EF4444" />
      <path d="M16 21L14.5 26L11 23.5L12.5 18.5" fill="#DC2626" />
      {/* Rocket Body */}
      <path
        d="M25.5 6.5C21.2 6.7 16.4 9.5 13.2 14.2L10.5 18.2L13.8 21.5L17.8 18.8C22.5 15.6 25.3 10.8 25.5 6.5Z"
        fill="#F8FAFC"
        stroke="#CBD5E1"
        strokeWidth="1.2"
      />
      {/* Red Nose Cone */}
      <path d="M25.5 6.5C23.5 6.6 21.3 7.3 19.3 8.6L23.4 12.7C24.7 10.7 25.4 8.5 25.5 6.5Z" fill="#EF4444" />
      {/* Porthole */}
      <circle cx="18.2" cy="13.8" r="2.6" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.2" />
    </motion.svg>
  );
}

interface AudienceCardItem {
  id: string;
  title: string;
  description: string;
  cardClass: string;
  iconBoxClass: string;
  theme: "blue" | "purple" | "green" | "orange" | "teal";
  Icon: React.ComponentType;
  badge: string;
  detailSubtitle: string;
  summary: string;
  bottleneckSolved: string;
  workflows: readonly string[];
  outcomeMetric: string;
  outcomeNote: string;
  ctaLabel: string;
}

const AUDIENCE_CARDS: readonly AudienceCardItem[] = [
  {
    id: "owners-founders",
    title: "Business Owners & Founders",
    description:
      "Who want to scale revenue to ₹100Cr+ without letting manual admin overhead grow unchecked.",
    cardClass: "wb-aud-card-blue",
    iconBoxClass: "wb-aud-icon-blue",
    theme: "blue",
    Icon: IconFounderBlue,
    badge: "LEADERSHIP TRACK • ₹100CR+ SCALE",
    detailSubtitle: "Scale operations cleanly without linear headcount growth",
    summary:
      "See how founder-led teams audit hidden manual bottlenecks across departments and deploy interconnected AI workflows that keep running reliably as volume grows.",
    bottleneckSolved:
      "Eliminates scattered spreadsheets, approval delays, and founder-dependent day-to-day coordination.",
    workflows: [
      "Audit your top 3 operational drains using the Priority & Effort Matrix",
      "Replace manual cross-team updates with unified automated pipelines",
      "Embed clear human-in-the-loop checkpoints for sensitive approvals",
    ],
    outcomeMetric: "Tailored 60-Day AI Automation Roadmap",
    outcomeNote: "Walk away knowing exact ROI targets and implementation order for your company size.",
    ctaLabel: "Reserve Seat for Founders Track (₹99)",
  },
  {
    id: "sales-revenue-leaders",
    title: "Sales & Revenue Leaders",
    description:
      "Who need instant lead responses, warm rep handoffs, and consistent CRM follow-up tracking.",
    cardClass: "wb-aud-card-purple",
    iconBoxClass: "wb-aud-icon-purple",
    theme: "purple",
    Icon: IconAnalyticsPurple,
    badge: "REVENUE SYSTEMS • PIPELINE VELOCITY",
    detailSubtitle: "Sub-60s lead response & structured CRM qualification",
    summary:
      "Learn how high-velocity sales teams eliminate manual CRM data entry and dropped leads by automating instant qualification, routing, and follow-up cadences.",
    bottleneckSolved:
      "Fixes slow lead response windows, cold handoffs, and inconsistent rep follow-through.",
    workflows: [
      "Instant (< 60s) inbound lead capture, enrichment, and qualification routing",
      "Automated follow-up sequences triggered by CRM stage & prospect intent",
      "Real-time deal hygiene & daily pipeline digests without manual logging",
    ],
    outcomeMetric: "Zero Dropped Inbound Leads",
    outcomeNote: "Consistent pipeline conversion without expanding SDR or sales ops headcount.",
    ctaLabel: "Reserve Seat for Sales Track (₹99)",
  },
  {
    id: "marketing-heads",
    title: "Marketing Heads",
    description:
      "Who want better connected campaign data, AI content production, and automated reporting.",
    cardClass: "wb-aud-card-green",
    iconBoxClass: "wb-aud-icon-green",
    theme: "green",
    Icon: IconMegaphoneGreen,
    badge: "GROWTH ENGINE • CONNECTED ATTRIBUTION",
    detailSubtitle: "Connected campaigns, lead handoff & trackable attribution",
    summary:
      "Bridge the gap between campaign execution, AI-assisted content workflows, and sales handoff so leads never stall between ad click and booked conversation.",
    bottleneckSolved:
      "Ends disconnected marketing spreadsheets, manual reporting, and creative bottlenecks.",
    workflows: [
      "End-to-end campaign lead capture synced directly into qualification flows",
      "Structured AI content repurposing pipelines guided by brand guardrails",
      "Automated weekly campaign ROI digests merged across ad & CRM sources",
    ],
    outcomeMetric: "Connected Campaign-to-Revenue Execution",
    outcomeNote: "Move from siloed marketing tools to automated, measurable funnel output.",
    ctaLabel: "Reserve Seat for Marketing Track (₹99)",
  },
  {
    id: "ops-hr-directors",
    title: "Ops & HR Directors",
    description:
      "Who need faster resume screening, auto interview booking, and streamlined task execution.",
    cardClass: "wb-aud-card-orange",
    iconBoxClass: "wb-aud-icon-orange",
    theme: "orange",
    Icon: IconGearsOrange,
    badge: "PEOPLE & EXECUTION • ZERO BLIND SPOTS",
    detailSubtitle: "Cut hiring turnaround & turn messy handoffs into reliable systems",
    summary:
      "Automate repetitive resume triage, interview coordination, and multi-system task handovers while keeping final people and quality decisions in human hands.",
    bottleneckSolved:
      "Removes hours lost to PDF resume sorting, calendar back-and-forth, and manual data entry.",
    workflows: [
      "Structured AI candidate screening against role criteria & auto slot booking",
      "Document extraction pipelines that sync clean records across your stack",
      "Exception-based daily ops alerts & onboarding checklists without breakage",
    ],
    outcomeMetric: "Save 10+ Weekly Coordinator Hours",
    outcomeNote: "Plug directly into existing HR & Ops tools without disrupting live operations.",
    ctaLabel: "Reserve Seat for Ops & HR Track (₹99)",
  },
  {
    id: "entrepreneurs-professionals",
    title: "Entrepreneurs & Professionals",
    description:
      "Who want practical, ROI-first workflow systems across growth and daily execution—zero coding needed.",
    cardClass: "wb-aud-card-teal",
    iconBoxClass: "wb-aud-icon-teal",
    theme: "teal",
    Icon: IconEntrepreneurTeal,
    badge: "PRACTICAL AI • SYSTEMS THINKING",
    detailSubtitle: "Practical, ROI-first workflow systems—zero coding required",
    summary:
      "Skip random tool lists and prompt hype. Understand the exact architecture behind reliable business automations you can map and apply immediately to your business model.",
    bottleneckSolved:
      "Replaces scattered one-off AI prompts with repeatable, end-to-end workflow systems.",
    workflows: [
      "Map how inputs, rules, AI reasoning, and system actions connect cleanly",
      "Know when to use deterministic rules vs. LLM reasoning vs. human sign-off",
      "Adapt plug-and-play workflow templates directly to client or solo operations",
    ],
    outcomeMetric: "Plug-and-Play Workflow Architecture",
    outcomeNote: "Focused 100% on real operational ROI with plain-English systems thinking.",
    ctaLabel: "Reserve Your Seat (₹99)",
  },
];

interface TargetAudienceSectionProps {
  onReserveSeat?: () => void;
}

export function TargetAudienceSection({ onReserveSeat }: TargetAudienceSectionProps) {
  const reduceMotion = useReducedMotion();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedCard = AUDIENCE_CARDS.find((card) => card.id === selectedId) ?? null;

  const handleCardToggle = (id: string) => {
    const isOpening = selectedId !== id;
    setSelectedId((prev) => (prev === id ? null : id));
    if (isOpening && typeof window !== "undefined" && window.innerWidth <= 1024) {
      window.setTimeout(() => {
        document
          .getElementById("wb-aud-detail-panel")
          ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 90);
    }
  };

  return (
    <section
      className="wb-section-audience"
      id="target-audience"
      aria-labelledby="wb-audience-heading"
    >
      {/* Subtle background lighting & right-side decorative dotted field */}
      <div className="wb-aud-bg-ambient" aria-hidden="true" />
      <div className="wb-aud-dots-right" aria-hidden="true" />

      <div className="wb-aud-container">
        {/* Section Header */}
        <header className="wb-aud-header">
          <div className="wb-aud-eyebrow-pill">
            <EyebrowGroupIcon />
            <span>TARGET AUDIENCE</span>
          </div>

          <h2 id="wb-audience-heading" className="wb-aud-title">
            Who Should{" "}
            <span className="wb-aud-title-highlight">
              Attend
              <span className="wb-aud-title-sparks" aria-hidden="true">
                <AttendAccentSparks reduceMotion={reduceMotion} />
              </span>
              <svg
                viewBox="0 0 180 14"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
                className="wb-aud-title-underline"
              >
                <path
                  d="M3 9.5C48 3.5 128 3 177 8.5"
                  stroke="#60A5FA"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            This Masterclass?
          </h2>

          <p className="wb-aud-subtitle">
            Designed specifically for leaders responsible for scaling business operations and revenue:
          </p>
        </header>

        {/* Five Interactive Audience Cards */}
        <div className="wb-aud-grid">
          {AUDIENCE_CARDS.map((card, index) => {
            const { id, title, description, cardClass, iconBoxClass, Icon } = card;
            const isSelected = selectedId === id;

            return (
              <motion.button
                key={id}
                type="button"
                onClick={() => handleCardToggle(id)}
                className={`wb-aud-card ${cardClass} ${isSelected ? "is-selected" : ""}`}
                aria-pressed={isSelected}
                aria-expanded={isSelected}
                aria-controls="wb-aud-detail-panel"
                initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{
                  duration: 0.34,
                  delay: reduceMotion ? 0 : index * 0.04,
                  ease: "easeOut",
                }}
              >
                <motion.div
                  className={`wb-aud-card-icon-box ${iconBoxClass}`}
                  aria-hidden="true"
                  animate={reduceMotion ? undefined : { y: [0, -2.5, 0] }}
                  transition={{
                    duration: 4.5,
                    delay: index * 0.35,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Icon />
                </motion.div>

                <h3 className="wb-aud-card-title">{title}</h3>
                <p className="wb-aud-card-desc">{description}</p>

                <span className="wb-aud-card-cta">
                  <span>{isSelected ? "Viewing Details" : "Explore Details"}</span>
                  <ArrowRight size={13} aria-hidden="true" className="wb-aud-card-cta-arrow" />
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Interactive Glassmorphism Details Cards Panel */}
        <AnimatePresence mode="wait">
          {selectedCard && (
            <motion.div
              key={selectedCard.id}
              id="wb-aud-detail-panel"
              role="region"
              aria-label={`${selectedCard.title} masterclass breakdown`}
              className={`wb-aud-glass-stage wb-aud-theme-${selectedCard.theme}`}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.985 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Soft Ambient Blobs Behind Glassmorphism Cards for Real Frosted Refraction */}
              <div className="wb-aud-glass-orbs" aria-hidden="true">
                <span className="wb-aud-glass-orb wb-aud-glass-orb-1" />
                <span className="wb-aud-glass-orb wb-aud-glass-orb-2" />
                <span className="wb-aud-glass-orb wb-aud-glass-orb-3" />
              </div>

              <div className="wb-aud-glass-header">
                <div className="wb-aud-glass-title-group">
                  <span className="wb-aud-glass-badge">{selectedCard.badge}</span>
                  <h3 className="wb-aud-glass-heading">
                    {selectedCard.title} — <span>{selectedCard.detailSubtitle}</span>
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedId(null)}
                  className="wb-aud-glass-close"
                  aria-label={`Close ${selectedCard.title} details`}
                >
                  <X size={16} aria-hidden="true" />
                  <span>Close</span>
                </button>
              </div>

              {/* Three Frosted Glassmorphism Cards */}
              <div className="wb-aud-glass-grid">
                {/* Glass Card 1: Focus & Bottlenecks */}
                <motion.div
                  className="wb-aud-glass-card"
                  initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, delay: 0.04 }}
                >
                  <div className="wb-aud-glass-card-top">
                    <span className="wb-aud-glass-icon-pill">
                      <Target size={15} aria-hidden="true" />
                    </span>
                    <span className="wb-aud-glass-card-label">01 • Core Focus &amp; Bottleneck</span>
                  </div>
                  <p className="wb-aud-glass-summary">{selectedCard.summary}</p>
                  <div className="wb-aud-glass-callout">
                    <strong>Problem Eliminated:</strong> {selectedCard.bottleneckSolved}
                  </div>
                </motion.div>

                {/* Glass Card 2: Live Workflows Built */}
                <motion.div
                  className="wb-aud-glass-card"
                  initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, delay: 0.1 }}
                >
                  <div className="wb-aud-glass-card-top">
                    <span className="wb-aud-glass-icon-pill">
                      <Workflow size={15} aria-hidden="true" />
                    </span>
                    <span className="wb-aud-glass-card-label">02 • Live Workflows Covered</span>
                  </div>
                  <ul className="wb-aud-glass-list">
                    {selectedCard.workflows.map((flow, i) => (
                      <li key={i} className="wb-aud-glass-list-item">
                        <CheckCircle2 size={15} aria-hidden="true" className="wb-aud-glass-check" />
                        <span>{flow}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Glass Card 3: Outcome & Registration */}
                <motion.div
                  className="wb-aud-glass-card wb-aud-glass-card-outcome"
                  initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, delay: 0.16 }}
                >
                  <div>
                    <div className="wb-aud-glass-card-top">
                      <span className="wb-aud-glass-icon-pill">
                        <Sparkles size={15} aria-hidden="true" />
                      </span>
                      <span className="wb-aud-glass-card-label">03 • Key Takeaway</span>
                    </div>
                    <div className="wb-aud-glass-metric">{selectedCard.outcomeMetric}</div>
                    <p className="wb-aud-glass-outcome-note">{selectedCard.outcomeNote}</p>
                  </div>

                  {onReserveSeat && (
                    <button
                      type="button"
                      onClick={onReserveSeat}
                      className="wb-aud-glass-cta"
                    >
                      <span>{selectedCard.ctaLabel}</span>
                      <ArrowRight size={15} aria-hidden="true" />
                    </button>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Informational Banner */}
        <motion.div
          className="wb-aud-banner"
          initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="wb-aud-banner-icon">
            <RocketBannerIcon reduceMotion={reduceMotion} />
          </div>
          <span className="wb-aud-banner-divider" aria-hidden="true" />
          <p className="wb-aud-banner-text">
            <strong className="wb-aud-banner-strong">
              No coding or AI expertise required.
            </strong>{" "}
            <span className="wb-aud-banner-reg">
              Just bring an understanding of the tasks consuming your team&apos;s time.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

