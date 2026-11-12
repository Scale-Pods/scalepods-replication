"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { AISystemIllustration } from "./AISystemIllustration";

function EyebrowLayeredIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M10 3.2L17 6.8L10 10.4L3 6.8L10 3.2Z"
        fill="#10B981"
        stroke="#047857"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M4.2 10.2L10 13.2L15.8 10.2"
        stroke="#059669"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.2 13.4L10 16.4L15.8 13.4"
        stroke="#10B981"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AccentSparksGreen({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <motion.svg
      width="26"
      height="20"
      viewBox="0 0 26 20"
      fill="none"
      aria-hidden="true"
      animate={reduceMotion ? undefined : { opacity: [0.75, 1, 0.75], scale: [0.96, 1.04, 0.96] }}
      transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
    >
      <path d="M5 12L2.8 5.2" stroke="#10B981" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M12.5 11.2L13.8 3.6" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M18.5 14L24 9.2" stroke="#34D399" strokeWidth="2.2" strokeLinecap="round" />
    </motion.svg>
  );
}

function IconGearGreen() {
  return (
    <svg width="24" height="24" viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <path
        d="M13 4.2L14.5 6.4L17 6L17.8 8.4L20.1 9.5L19.4 12L21 13.9L19.3 15.7L19.6 18.2L17.1 18.8L16 21L13.5 20.3L11.6 21.8L9.8 20.1L7.3 20.4L6.7 17.9L4.5 16.8L5.2 14.3L3.7 12.4L5.4 10.6L5.1 8.1L7.6 7.5L8.7 5.3L11.2 6L13 4.2Z"
        fill="#10B981"
        stroke="#047857"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <circle cx="12.4" cy="13" r="3.4" fill="#ECFDF5" stroke="#047857" strokeWidth="1.3" />
    </svg>
  );
}

function IconUserBlue() {
  return (
    <svg width="24" height="24" viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <circle cx="13" cy="8.5" r="4.1" fill="#2563EB" />
      <path
        d="M5.5 21.2C6.1 16.2 9.2 13.9 13 13.9C16.8 13.9 19.9 16.2 20.5 21.2H5.5Z"
        fill="#3B82F6"
      />
      <path
        d="M17.5 6.2L19.2 7.8L22.2 4.8"
        stroke="#0284C7"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconSparklesMint() {
  return (
    <svg width="24" height="24" viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <path
        d="M11.5 3.8L13.3 8.8L18.3 10.6L13.3 12.4L11.5 17.4L9.7 12.4L4.7 10.6L9.7 8.8L11.5 3.8Z"
        fill="#14B8A6"
        stroke="#0F766E"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M19.5 14.5L20.6 17.1L23.2 18.2L20.6 19.3L19.5 21.9L18.4 19.3L15.8 18.2L18.4 17.1L19.5 14.5Z"
        fill="#10B981"
      />
    </svg>
  );
}

function IconUsersPurple() {
  return (
    <svg width="24" height="24" viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <circle cx="10.2" cy="8.8" r="3.4" fill="#7C3AED" />
      <path
        d="M4.2 20.4C4.7 16.2 7.2 14.2 10.2 14.2C13.2 14.2 15.7 16.2 16.2 20.4H4.2Z"
        fill="#7C3AED"
      />
      <circle cx="17.8" cy="9.6" r="2.6" fill="#A78BFA" />
      <path
        d="M15.8 14.8C18.4 15.1 20.6 16.8 21.2 20.4H17"
        stroke="#8B5CF6"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconGrowthBlue() {
  return (
    <svg width="24" height="24" viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <path
        d="M4.5 18.2L10.2 12.6L14 15.6L21.5 7.4"
        stroke="#0284C7"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 7.2H21.7V12.4"
        stroke="#0284C7"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.5 21.5H21.8"
        stroke="#38BDF8"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

interface BenefitCardItem {
  id: string;
  title: string;
  description: string;
  cardClass: string;
  iconBoxClass: string;
  gridSpanClass: string;
  Icon: React.ComponentType;
}

const WHY_BENEFIT_CARDS: readonly BenefitCardItem[] = [
  {
    id: "faster-operations",
    title: "Faster Operations",
    description: "Move work through systems instead of leaving it sitting in inboxes.",
    cardClass: "wb-why-card-green",
    iconBoxClass: "wb-why-icon-green",
    gridSpanClass: "wb-why-span-2",
    Icon: IconGearGreen,
  },
  {
    id: "lower-manual-effort",
    title: "Lower Manual Effort",
    description: "Remove repetitive, rule-based work from human hands where appropriate.",
    cardClass: "wb-why-card-blue",
    iconBoxClass: "wb-why-icon-blue",
    gridSpanClass: "wb-why-span-2",
    Icon: IconUserBlue,
  },
  {
    id: "better-client-experiences",
    title: "Better Client Experiences",
    description: "Improve response times and reduce dropped handoffs.",
    cardClass: "wb-why-card-mint",
    iconBoxClass: "wb-why-icon-mint",
    gridSpanClass: "wb-why-span-2",
    Icon: IconSparklesMint,
  },
  {
    id: "higher-team-productivity",
    title: "Higher Team Productivity",
    description: "Give people more time for work that actually moves the business forward.",
    cardClass: "wb-why-card-purple",
    iconBoxClass: "wb-why-icon-purple",
    gridSpanClass: "wb-why-span-3",
    Icon: IconUsersPurple,
  },
  {
    id: "sustainable-growth",
    title: "Sustainable Growth",
    description: "Build systems that can continue working as the business scales.",
    cardClass: "wb-why-card-cyan",
    iconBoxClass: "wb-why-icon-cyan",
    gridSpanClass: "wb-why-span-3",
    Icon: IconGrowthBlue,
  },
];

interface WhyScalePodsProps {
  onReserveSeat: () => void;
}

export function WhyScalePods({ onReserveSeat }: WhyScalePodsProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="wb-section-why"
      id="why-scalepods"
      aria-labelledby="wb-why-heading"
    >
      {/* Ambient Mint / Cyan Radial Glow + Decorative Waves */}
      <div className="wb-why-bg-ambient" aria-hidden="true" />
      <svg
        className="wb-why-bg-waves"
        viewBox="0 0 1440 420"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M-60 95C220 35 460 150 760 85C1060 20 1260 125 1500 65"
          stroke="#5EEAD4"
          strokeOpacity="0.24"
          strokeWidth="1.5"
        />
        <path
          d="M-40 315C260 365 530 250 840 315C1140 378 1310 278 1500 330"
          stroke="#93C5FD"
          strokeOpacity="0.22"
          strokeWidth="1.5"
        />
      </svg>

      <div className="wb-why-container">
        {/* Centered Header Section */}
        <motion.header
          className="wb-why-header"
          initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="wb-why-eyebrow-pill">
            <EyebrowLayeredIcon />
            <span>WHY SCALEPODS?</span>
          </div>

          <h2 id="wb-why-heading" className="wb-why-title">
            WHY{" "}
            <span className="wb-why-title-highlight">
              <span className="wb-why-title-grad">SCALEPODS?</span>
              <svg
                className="wb-why-title-underline"
                viewBox="0 0 250 14"
                fill="none"
                aria-hidden="true"
              >
                <motion.path
                  d="M4 9.5C68 3 182 3 246 9.5"
                  stroke="#10B981"
                  strokeWidth="3.4"
                  strokeLinecap="round"
                  initial={reduceMotion ? undefined : { pathLength: 0, opacity: 0 }}
                  whileInView={reduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.65, delay: 0.16, ease: "easeOut" }}
                />
              </svg>
              <span className="wb-why-title-sparks">
                <AccentSparksGreen reduceMotion={reduceMotion} />
              </span>
            </span>
          </h2>

          <p className="wb-why-mission">
            ScalePods&apos; mission is to design and deploy practical AI solutions that simplify
            operations, increase productivity and help businesses grow without adding complexity.
          </p>
        </motion.header>

        {/* Main 60/40 Split: Five Benefit Cards Left + AI Ecosystem Right */}
        <div className="wb-why-stage">
          <div className="wb-why-cards-grid">
            {WHY_BENEFIT_CARDS.map((card, idx) => {
              const { id, title, description, cardClass, iconBoxClass, gridSpanClass, Icon } = card;
              return (
                <motion.article
                  key={id}
                  className={`wb-why-card ${cardClass} ${gridSpanClass}`}
                  initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{
                    duration: 0.4,
                    delay: reduceMotion ? 0 : idx * 0.06,
                    ease: "easeOut",
                  }}
                >
                  <motion.div
                    className={`wb-why-card-icon-box ${iconBoxClass}`}
                    aria-hidden="true"
                    animate={reduceMotion ? undefined : { y: [0, -2.5, 0] }}
                    transition={{
                      duration: 4.4,
                      delay: idx * 0.35,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Icon />
                  </motion.div>

                  <h3 className="wb-why-card-title">{title}</h3>
                  <p className="wb-why-card-desc">{description}</p>
                </motion.article>
              );
            })}
          </div>

          <div className="wb-why-eco-column">
            <AISystemIllustration />
          </div>
        </div>

        {/* Bottom Masterclass Registration Banner */}
        <motion.div
          className="wb-why-reg-banner"
          initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="wb-why-reg-left">
            <div className="wb-why-reg-live-pill">
              <span className="wb-why-reg-live-dot" aria-hidden="true" />
              <span>LIVE</span>
            </div>

            <div className="wb-why-reg-copy">
              <div className="wb-why-reg-event">AI Business Automation Masterclass</div>
              <div className="wb-why-reg-meta">
                <span>
                  With <strong className="wb-why-reg-host">Adnan Shaikh</strong> &amp;{" "}
                  <strong className="wb-why-reg-host">Raunak Kumar</strong>
                </span>
                <span className="wb-why-reg-sep" aria-hidden="true">
                  •
                </span>
                <span className="wb-why-reg-schedule">12–13 Dec (2–3 PM)</span>
                <span className="wb-why-reg-sep" aria-hidden="true">
                  •
                </span>
                <span className="wb-why-reg-price-wrap">
                  <strong className="wb-why-reg-price">Only ₹99/-</strong>{" "}
                  <s className="wb-why-reg-strike">₹999</s>
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onReserveSeat}
            className="wb-why-reg-cta"
            aria-label="Reserve Seat (₹99)"
          >
            <span>Reserve Seat (₹99)</span>
            <ArrowRight size={17} aria-hidden="true" className="wb-why-reg-cta-arrow" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

