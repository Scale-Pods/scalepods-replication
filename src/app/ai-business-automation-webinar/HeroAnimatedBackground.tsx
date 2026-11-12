"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const HERO_NETWORK_LINKS = [
  // Left outer AI network curves
  { id: "hl1", d: "M 18 110 Q 92 145 148 215", delay: 0 },
  { id: "hl2", d: "M 34 290 Q 96 258 148 215", delay: 1.2 },
  { id: "hl3", d: "M 16 470 Q 88 375 148 215", delay: 2.3 },
  { id: "hl4", d: "M 34 290 Q 74 445 124 615", delay: 0.7 },
  { id: "hl5", d: "M 16 470 Q 70 555 124 615", delay: 1.8 },
  { id: "hl6", d: "M 124 615 Q 76 705 26 785", delay: 2.9 },
  // Right outer AI network curves
  { id: "hr1", d: "M 1422 115 Q 1345 152 1288 225", delay: 0.4 },
  { id: "hr2", d: "M 1404 300 Q 1342 268 1288 225", delay: 1.6 },
  { id: "hr3", d: "M 1424 475 Q 1352 385 1288 225", delay: 2.5 },
  { id: "hr4", d: "M 1404 300 Q 1362 455 1312 620", delay: 1.0 },
  { id: "hr5", d: "M 1424 475 Q 1368 560 1312 620", delay: 2.1 },
  { id: "hr6", d: "M 1312 620 Q 1360 708 1412 790", delay: 3.1 },
];

const HERO_NETWORK_NODES = [
  // Left flank
  { cx: 18, cy: 110, r: 4, tone: "cyan", delay: 0, pulseRing: false },
  { cx: 148, cy: 215, r: 5, tone: "emerald", delay: 0.9, pulseRing: true },
  { cx: 34, cy: 290, r: 4.5, tone: "mint", delay: 0.3, pulseRing: false },
  { cx: 16, cy: 470, r: 4, tone: "cyan", delay: 1.6, pulseRing: false },
  { cx: 124, cy: 615, r: 4.5, tone: "emerald", delay: 1.1, pulseRing: true },
  { cx: 26, cy: 785, r: 3.5, tone: "mint", delay: 2.2, pulseRing: false },
  // Right flank
  { cx: 1422, cy: 115, r: 4, tone: "mint", delay: 0.5, pulseRing: false },
  { cx: 1288, cy: 225, r: 5, tone: "cyan", delay: 0.2, pulseRing: true },
  { cx: 1404, cy: 300, r: 4.5, tone: "emerald", delay: 1.4, pulseRing: false },
  { cx: 1424, cy: 475, r: 4, tone: "cyan", delay: 0.8, pulseRing: false },
  { cx: 1312, cy: 620, r: 4.5, tone: "mint", delay: 1.9, pulseRing: true },
  { cx: 1412, cy: 790, r: 3.5, tone: "emerald", delay: 2.7, pulseRing: false },
];

const HERO_PARTICLES = [
  { d: "M 18 110 Q 92 145 148 215", dur: "6.4s", begin: "0s", tone: "#0EA5E9", extra: false },
  { d: "M 34 290 Q 74 445 124 615", dur: "8.2s", begin: "1.6s", tone: "#10B981", extra: true },
  { d: "M 1422 115 Q 1345 152 1288 225", dur: "6.8s", begin: "0.7s", tone: "#10B981", extra: false },
  { d: "M 1404 300 Q 1362 455 1312 620", dur: "8.5s", begin: "2.2s", tone: "#06B6D4", extra: true },
];

/**
 * Ambient animated AI environment for the first fold:
 * liquid mesh gradients, outer perimeter frosted glass shapes,
 * and sparse outer-flank SVG neural connections & data-flow particles.
 */
export function HeroAnimatedBackground() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(wrapperRef, { amount: 0.05 });
  const reduceMotion = useReducedMotion() ?? false;
  const shouldAnimate = isInView && !reduceMotion;

  return (
    <div
      ref={wrapperRef}
      className={`wb-hero-anim-bg ${shouldAnimate ? "is-active" : "is-paused"}`}
      aria-hidden="true"
    >
      {/* A. Animated Mint-to-Cyan Mesh Gradients & Ambient Light */}
      <div className="wb-hero-mesh">
        <span className="wb-hero-orb wb-hero-orb-mint" />
        <span className="wb-hero-orb wb-hero-orb-cyan" />
        <span className="wb-hero-orb wb-hero-orb-emerald" />
        <span className="wb-hero-orb wb-hero-orb-blue" />
      </div>

      {/* B. Floating Translucent Perimeter Glassmorphism Elements */}
      <div className="wb-hero-glass-layer">
        <motion.div
          className="wb-hero-glass wb-hero-glass-tl"
          animate={
            shouldAnimate
              ? {
                  y: [0, -14, 5, 0],
                  rotate: [-14, -10, -16, -14],
                  scale: [1, 1.03, 0.985, 1],
                }
              : { y: 0, rotate: -14, scale: 1 }
          }
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="wb-hero-glass wb-hero-glass-tr"
          animate={
            shouldAnimate
              ? {
                  y: [0, 14, -7, 0],
                  rotate: [15, 19, 12, 15],
                  scale: [1, 0.98, 1.035, 1],
                }
              : { y: 0, rotate: 15, scale: 1 }
          }
          transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="wb-hero-glass wb-hero-glass-ml wb-hero-glass-extra"
          animate={
            shouldAnimate
              ? {
                  y: [0, 10, -8, 0],
                  rotate: [10, 15, 7, 10],
                  scale: [1, 1.04, 0.98, 1],
                }
              : { y: 0, rotate: 10, scale: 1 }
          }
          transition={{ duration: 13.5, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="wb-hero-glass wb-hero-glass-br wb-hero-glass-extra"
          animate={
            shouldAnimate
              ? {
                  y: [0, -12, 8, 0],
                  rotate: [-12, -8, -15, -12],
                  scale: [1, 1.03, 0.99, 1],
                }
              : { y: 0, rotate: -12, scale: 1 }
          }
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* C. Sparse Outer-Flank AI Network Graph & Data-Flow Particles */}
      <svg
        className="wb-hero-network-svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="wbHeroNodeCyan" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="wbHeroNodeEmerald" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
          </radialGradient>
        </defs>

        {HERO_NETWORK_LINKS.map((link) => (
          <path
            key={link.id}
            d={link.d}
            className="wb-hero-network-link"
            style={{ animationDelay: `${link.delay}s` }}
          />
        ))}

        {HERO_NETWORK_NODES.map((node, idx) => (
          <g key={`hnode-${idx}`}>
            {node.pulseRing && (
              <circle
                cx={node.cx}
                cy={node.cy}
                r={node.r * 2.4}
                className={`wb-hero-node-ring wb-hero-node-ring-${node.tone}`}
                style={{ animationDelay: `${node.delay}s` }}
              />
            )}
            <circle
              cx={node.cx}
              cy={node.cy}
              r={node.r * 3.4}
              fill={
                node.tone === "cyan"
                  ? "url(#wbHeroNodeCyan)"
                  : "url(#wbHeroNodeEmerald)"
              }
              className="wb-hero-node-halo"
              style={{ animationDelay: `${node.delay}s` }}
            />
            <circle
              cx={node.cx}
              cy={node.cy}
              r={node.r}
              className={`wb-hero-node-core wb-hero-node-core-${node.tone}`}
            />
          </g>
        ))}

        {shouldAnimate &&
          HERO_PARTICLES.map((particle, idx) => (
            <circle
              key={`hparticle-${idx}`}
              r="3"
              fill={particle.tone}
              opacity="0.58"
              className={particle.extra ? "wb-hero-particle-extra" : undefined}
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

      {/* Center Readability Shield preserving crisp typography contrast */}
      <div className="wb-hero-readability-shield" />
    </div>
  );
}

