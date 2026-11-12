"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Calendar, Flame, Gift, Tag } from "lucide-react";

interface FinalRegistrationCtaSectionProps {
  onReserveSeat: () => void;
}

const NETWORK_LINKS = [
  // Left outer flank network curves
  { id: "l1", d: "M 28 70 Q 115 110 175 180", delay: 0 },
  { id: "l2", d: "M 45 215 Q 118 205 175 180", delay: 1.4 },
  { id: "l3", d: "M 24 345 Q 112 285 175 180", delay: 2.2 },
  { id: "l4", d: "M 45 215 Q 90 315 135 420", delay: 0.8 },
  { id: "l5", d: "M 24 345 Q 82 390 135 420", delay: 1.9 },
  { id: "l6", d: "M 88 122 L 45 215", delay: 2.8 },
  // Right outer flank network curves
  { id: "r1", d: "M 1372 78 Q 1280 120 1222 186", delay: 0.6 },
  { id: "r2", d: "M 1355 224 Q 1280 212 1222 186", delay: 1.7 },
  { id: "r3", d: "M 1374 358 Q 1292 292 1222 186", delay: 2.5 },
  { id: "r4", d: "M 1355 224 Q 1306 322 1258 430", delay: 1.1 },
  { id: "r5", d: "M 1374 358 Q 1320 402 1258 430", delay: 2.9 },
  { id: "r6", d: "M 1310 126 L 1355 224", delay: 0.3 },
];

const NETWORK_NODES = [
  // Left flank nodes
  { cx: 28, cy: 70, r: 4, tone: "mint", delay: 0 },
  { cx: 88, cy: 122, r: 3.5, tone: "cyan", delay: 0.7 },
  { cx: 175, cy: 180, r: 5, tone: "emerald", delay: 1.3 },
  { cx: 45, cy: 215, r: 4.5, tone: "cyan", delay: 0.4 },
  { cx: 24, cy: 345, r: 4, tone: "mint", delay: 1.8 },
  { cx: 135, cy: 420, r: 4.5, tone: "emerald", delay: 1.1 },
  // Right flank nodes
  { cx: 1372, cy: 78, r: 4, tone: "cyan", delay: 0.5 },
  { cx: 1310, cy: 126, r: 3.5, tone: "mint", delay: 1.2 },
  { cx: 1222, cy: 186, r: 5, tone: "emerald", delay: 0.2 },
  { cx: 1355, cy: 224, r: 4.5, tone: "mint", delay: 1.6 },
  { cx: 1374, cy: 358, r: 4, tone: "cyan", delay: 0.9 },
  { cx: 1258, cy: 430, r: 4.5, tone: "emerald", delay: 2.1 },
];

const NETWORK_PARTICLES = [
  { d: "M 28 70 Q 115 110 175 180", dur: "6.5s", begin: "0s", tone: "#10B981", extra: false },
  { d: "M 24 345 Q 82 390 135 420", dur: "7.5s", begin: "1.8s", tone: "#06B6D4", extra: true },
  { d: "M 1372 78 Q 1280 120 1222 186", dur: "7s", begin: "0.9s", tone: "#06B6D4", extra: false },
  { d: "M 1374 358 Q 1320 402 1258 430", dur: "8s", begin: "2.4s", tone: "#10B981", extra: true },
];

/**
 * Fold 5: Final Registration CTA section with layered liquid mesh gradients,
 * outer-perimeter floating glassmorphism shapes, sparse AI network links,
 * and gentle bottom waves preserving full foreground legibility.
 */
export function FinalRegistrationCtaSection({
  onReserveSeat,
}: FinalRegistrationCtaSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.15 });
  const reduceMotion = useReducedMotion() ?? false;
  const shouldAnimate = isInView && !reduceMotion;

  return (
    <section
      ref={sectionRef}
      className="wb-section-final-cta"
      id="final-registration-cta"
      aria-labelledby="wb-final-cta-heading"
    >
      {/* Layer 1: Animated liquid mesh gradients */}
      <div className="wb-cta5-mesh" aria-hidden="true">
        <span className="wb-cta5-orb wb-cta5-orb-mint" />
        <span className="wb-cta5-orb wb-cta5-orb-cyan" />
        <span className="wb-cta5-orb wb-cta5-orb-sky" />
        <span className="wb-cta5-orb wb-cta5-orb-emerald" />
      </div>

      {/* Layer 2: Translucent outer-perimeter glassmorphism elements */}
      <div className="wb-cta5-glass-layer" aria-hidden="true">
        <motion.div
          className="wb-cta5-glass wb-cta5-glass-tl"
          animate={
            shouldAnimate
              ? {
                  y: [0, -14, 4, 0],
                  rotate: [-12, -8, -14, -12],
                  scale: [1, 1.03, 0.985, 1],
                }
              : { y: 0, rotate: -12, scale: 1 }
          }
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="wb-cta5-glass wb-cta5-glass-tr"
          animate={
            shouldAnimate
              ? {
                  y: [0, 12, -8, 0],
                  rotate: [14, 18, 11, 14],
                  scale: [1, 0.98, 1.04, 1],
                }
              : { y: 0, rotate: 14, scale: 1 }
          }
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="wb-cta5-glass wb-cta5-glass-bl wb-cta5-glass-extra"
          animate={
            shouldAnimate
              ? {
                  y: [0, -10, 6, 0],
                  rotate: [8, 12, 6, 8],
                  scale: [1, 1.025, 0.99, 1],
                }
              : { y: 0, rotate: 8, scale: 1 }
          }
          transition={{ duration: 12.5, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="wb-cta5-glass wb-cta5-glass-br wb-cta5-glass-extra"
          animate={
            shouldAnimate
              ? {
                  y: [0, 10, -10, 0],
                  rotate: [-10, -6, -13, -10],
                  scale: [1, 1.035, 0.98, 1],
                }
              : { y: 0, rotate: -10, scale: 1 }
          }
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Layer 3: Subtle AI network graph around outer flanks */}
      <svg
        className="wb-cta5-network-svg"
        viewBox="0 0 1400 520"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="wbCta5NodeMint" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.48" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="wbCta5NodeCyan" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0" />
          </radialGradient>
        </defs>

        {NETWORK_LINKS.map((link) => (
          <path
            key={link.id}
            d={link.d}
            className="wb-cta5-network-link"
            style={{ animationDelay: `${link.delay}s` }}
          />
        ))}

        {NETWORK_NODES.map((node, index) => (
          <g key={`node-${index}`} className="wb-cta5-network-node-group">
            <circle
              cx={node.cx}
              cy={node.cy}
              r={node.r * 3.4}
              fill={
                node.tone === "cyan"
                  ? "url(#wbCta5NodeCyan)"
                  : "url(#wbCta5NodeMint)"
              }
              className="wb-cta5-node-halo"
              style={{ animationDelay: `${node.delay}s` }}
            />
            <circle
              cx={node.cx}
              cy={node.cy}
              r={node.r}
              className={`wb-cta5-node-core wb-cta5-node-core-${node.tone}`}
              style={{ animationDelay: `${node.delay}s` }}
            />
          </g>
        ))}

        {shouldAnimate &&
          NETWORK_PARTICLES.map((particle, idx) => (
            <circle
              key={`particle-${idx}`}
              r="3"
              fill={particle.tone}
              opacity="0.52"
              className={
                particle.extra ? "wb-cta5-particle-extra" : undefined
              }
            >
              <animateMotion
                dur={particle.dur}
                begin={particle.begin}
                repeatCount="indefinite"
                path={particle.d}
              />
            </circle>
          ))}
      </svg>

      {/* Layer 4: Slow horizontal bottom translucent waves */}
      <div className="wb-cta5-waves" aria-hidden="true">
        <svg
          className="wb-cta5-wave wb-cta5-wave-back"
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
        >
          <path
            d="M0 164 C 240 120, 480 198, 760 156 C 1020 116, 1240 82, 1440 124 L 1440 220 L 0 220 Z"
            fill="rgba(167, 243, 208, 0.28)"
          />
        </svg>
        <svg
          className="wb-cta5-wave wb-cta5-wave-front"
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
        >
          <path
            d="M0 182 C 300 212, 620 124, 920 162 C 1160 192, 1310 132, 1440 148 L 1440 220 L 0 220 Z"
            fill="rgba(186, 230, 253, 0.34)"
          />
        </svg>
      </div>

      {/* Foreground center contrast shield */}
      <div className="wb-cta5-readability-shield" aria-hidden="true" />

      {/* Approved foreground CTA content */}
      <div className="wb-cta5-inner">
        <div className="wb-cta5-badge">
          <span className="wb-cta5-badge-icon" aria-hidden="true">
            <Flame size={15} strokeWidth={2.2} />
          </span>
          <span>LIMITED SEATS AVAILABLE | LIVE MASTERCLASS</span>
        </div>

        <h2 className="wb-cta5-heading" id="wb-final-cta-heading">
          Ready to Scale Your Business Over{" "}
          <span className="wb-cta5-highlight-wrap">
            <span className="wb-cta5-highlight">₹100 Cr</span>
            <svg
              className="wb-cta5-underline"
              viewBox="0 0 200 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 9.5C58 2.8 142 2.2 196 8.5"
                stroke="#10B981"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
            </svg>
            <svg
              className="wb-cta5-heading-sparks"
              viewBox="0 0 36 32"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M7 18L4 5"
                stroke="#059669"
                strokeWidth="2.6"
                strokeLinecap="round"
              />
              <path
                d="M17 16L22 4"
                stroke="#059669"
                strokeWidth="2.6"
                strokeLinecap="round"
              />
              <path
                d="M23 23L33 15"
                stroke="#059669"
                strokeWidth="2.6"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <br />
          with AI Automation?
        </h2>

        <p className="wb-cta5-sub">
          Stop letting manual tasks limit your company&rsquo;s growth. Join
          Adnan Shaikh and Raunak Kumar live to build your automation strategy.
        </p>

        <div className="wb-cta5-info-card">
          <div className="wb-cta5-info-col">
            <div className="wb-cta5-info-icon wb-cta5-info-icon-mint">
              <Tag size={20} strokeWidth={2.1} aria-hidden="true" />
            </div>
            <div className="wb-cta5-info-text">
              <span className="wb-cta5-info-label">REGISTRATION FEE</span>
              <div className="wb-cta5-price-row">
                <span className="wb-cta5-price-now">₹99</span>
                <span className="wb-cta5-price-old">₹1,999</span>
              </div>
            </div>
          </div>

          <div className="wb-cta5-info-divider" aria-hidden="true" />

          <div className="wb-cta5-info-col">
            <div className="wb-cta5-info-icon wb-cta5-info-icon-sky">
              <Calendar size={20} strokeWidth={2.1} aria-hidden="true" />
            </div>
            <div className="wb-cta5-info-text">
              <span className="wb-cta5-info-label">FORMAT</span>
              <span className="wb-cta5-info-value">
                Live Interactive Session + Q&amp;A
              </span>
            </div>
          </div>

          <div className="wb-cta5-info-divider" aria-hidden="true" />

          <div className="wb-cta5-info-col">
            <div className="wb-cta5-info-icon wb-cta5-info-icon-purple">
              <Gift size={20} strokeWidth={2.1} aria-hidden="true" />
            </div>
            <div className="wb-cta5-info-text">
              <span className="wb-cta5-info-label">BONUS</span>
              <span className="wb-cta5-info-value wb-cta5-info-value-green">
                Practical Workflow Templates
              </span>
            </div>
          </div>
        </div>

        <div className="wb-cta5-action-wrap">
          <svg
            className="wb-cta5-btn-sparks wb-cta5-btn-sparks-left"
            viewBox="0 0 28 36"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M23 11L12 5"
              stroke="#059669"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <path
              d="M21 18L7 18"
              stroke="#059669"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <path
              d="M23 25L12 31"
              stroke="#059669"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </svg>

          <button
            type="button"
            className="wb-cta5-btn"
            onClick={onReserveSeat}
          >
            <span>RESERVE YOUR SEAT NOW FOR ₹99</span>
            <ArrowRight size={19} strokeWidth={2.4} aria-hidden="true" />
          </button>

          <svg
            className="wb-cta5-btn-sparks wb-cta5-btn-sparks-right"
            viewBox="0 0 28 36"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5 11L16 5"
              stroke="#059669"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <path
              d="M7 18L21 18"
              stroke="#059669"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <path
              d="M5 25L16 31"
              stroke="#059669"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

