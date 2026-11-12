"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

function EyebrowLayersIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 2.5L17.5 6.3L10 10.1L2.5 6.3L10 2.5Z" fill="#059669" />
      <path
        d="M3.2 10L10 13.5L16.8 10"
        stroke="#059669"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.2 13.7L10 17.2L16.8 13.7"
        stroke="#10B981"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeadingAccentSparks({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <motion.svg
      width="24"
      height="22"
      viewBox="0 0 24 22"
      fill="none"
      aria-hidden="true"
      animate={
        reduceMotion
          ? undefined
          : {
              opacity: [0.75, 1, 0.75],
              scale: [0.95, 1.05, 0.95],
            }
      }
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
    >
      <path d="M5 8.5L3 3.5" stroke="#10B981" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M11 10L14.5 3.5" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M13 14.5L20 12.5" stroke="#34D399" strokeWidth="2.2" strokeLinecap="round" />
    </motion.svg>
  );
}

function IconTargetBlue() {
  return (
    <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="10" fill="#2563EB" fillOpacity="0.16" stroke="#2563EB" strokeWidth="2.4" />
      <circle cx="14" cy="14" r="5.6" stroke="#2563EB" strokeWidth="2.2" />
      <circle cx="14" cy="14" r="2.2" fill="#2563EB" />
    </svg>
  );
}

function IconLayersPurple() {
  return (
    <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M14 4L23.5 9L14 14L4.5 9L14 4Z" fill="#7C3AED" />
      <path d="M5.5 14L14 18.5L22.5 14" stroke="#7C3AED" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.5 18.5L14 23L22.5 18.5" stroke="#8B5CF6" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconNodesGreen() {
  return (
    <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M8.5 9.5H19.5M14 9.5V17.5" stroke="#059669" strokeWidth="2.3" strokeLinecap="round" />
      <rect x="4" y="6" width="6.5" height="6.5" rx="2" fill="#059669" />
      <rect x="17.5" y="6" width="6.5" height="6.5" rx="2" fill="#10B981" />
      <rect x="10.75" y="16.5" width="6.5" height="6.5" rx="2" fill="#059669" />
    </svg>
  );
}

function IconChipOrange() {
  return (
    <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path
        d="M11 3.5V6M14 3.5V6M17 3.5V6M11 22V24.5M14 22V24.5M17 22V24.5M3.5 11H6M3.5 14H6M3.5 17H6M22 11H24.5M22 14H24.5M22 17H24.5"
        stroke="#EA580C"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <rect x="6.5" y="6.5" width="15" height="15" rx="3.2" fill="#EA580C" />
      <rect x="10.5" y="10.5" width="7" height="7" rx="1.4" fill="#FFF7ED" />
    </svg>
  );
}

function IconPlugCyan() {
  return (
    <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M11 4.5V9.5M17 4.5V9.5" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
      <path
        d="M7.5 10H20.5V13.8C20.5 17.39 17.59 20.3 14 20.3C10.41 20.3 7.5 17.39 7.5 13.8V10Z"
        fill="#0EA5E9"
      />
      <path d="M14 20.3V24.5" stroke="#0284C7" strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  );
}

function IconRocketRose() {
  return (
    <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path
        d="M18.8 5.2C15.5 5.4 11.7 7.6 9.5 11.2L6.2 12.1C5.4 12.3 5 13.2 5.4 13.9L7.6 17.2L10.8 20.4L14.1 22.6C14.8 23 15.7 22.6 15.9 21.8L16.8 18.5C20.4 16.3 22.6 12.5 22.8 9.2C22.9 7.2 20.8 5.1 18.8 5.2Z"
        fill="#E11D48"
      />
      <circle cx="15.8" cy="12.2" r="2.1" fill="#FFE4E6" />
      <path d="M7.2 19.6L5.2 22.8L8.4 20.8" stroke="#FB7185" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const DELIVERABLE_CARDS = [
  {
    id: "where-to-start",
    title: "Where to Start",
    description:
      "Pinpoint repetitive, rule-based bottlenecks inside your current sales & operational teams.",
    iconBgClass: "wb-deliv-icon-blue",
    Icon: IconTargetBlue,
  },
  {
    id: "what-to-prioritize",
    title: "What to Prioritize",
    description:
      "Evaluate opportunities based on business ROI, volume, time saved, and implementation ease.",
    iconBgClass: "wb-deliv-icon-purple",
    Icon: IconLayersPurple,
  },
  {
    id: "how-tools-connect",
    title: "How Tools Connect",
    description:
      "Understand how inputs, decisions, CRMs, and auto-reminders link together smoothly.",
    iconBgClass: "wb-deliv-icon-green",
    Icon: IconNodesGreen,
  },
  {
    id: "where-ai-adds-value",
    title: "Where AI Adds Value",
    description:
      "Distinguish tasks suitable for basic automation vs AI reasoning vs human oversight.",
    iconBgClass: "wb-deliv-icon-orange",
    Icon: IconChipOrange,
  },
  {
    id: "system-integration",
    title: "System Integration",
    description:
      "Learn to integrate automation with your existing tech stack without breaking workflows.",
    iconBgClass: "wb-deliv-icon-cyan",
    Icon: IconPlugCyan,
  },
  {
    id: "actionable-next-steps",
    title: "Actionable Next Steps",
    description:
      "Identify 3 immediate automation quick-wins in your Sales, Marketing, HR, or Ops.",
    iconBgClass: "wb-deliv-icon-rose",
    Icon: IconRocketRose,
  },
] as const;

interface TileConfig {
  id: string;
  label: string;
  cx: number;
  cy: number;
  w: number;
  h: number;
  rotate: number;
  gradId: string;
  stroke: string;
  floatOffset: number;
  duration: number;
  linePath: string;
  dotX: number;
  dotY: number;
}

const DESKTOP_TILES: TileConfig[] = [
  {
    id: "sales",
    label: "Sales",
    cx: 128,
    cy: 142,
    w: 118,
    h: 100,
    rotate: -7,
    gradId: "wbTileGradBlue",
    stroke: "#BAE6FD",
    floatOffset: -5,
    duration: 4.8,
    linePath: "M486 218 C360 232, 245 224, 178 184",
    dotX: 178,
    dotY: 184,
  },
  {
    id: "marketing",
    label: "Marketing",
    cx: 316,
    cy: 96,
    w: 124,
    h: 104,
    rotate: -3.5,
    gradId: "wbTileGradMint",
    stroke: "#A7F3D0",
    floatOffset: -6,
    duration: 5.2,
    linePath: "M492 204 C422 200, 368 178, 344 148",
    dotX: 344,
    dotY: 148,
  },
  {
    id: "hr",
    label: "HR",
    cx: 530,
    cy: 68,
    w: 118,
    h: 100,
    rotate: 0,
    gradId: "wbTileGradPurple",
    stroke: "#DDD6FE",
    floatOffset: -5,
    duration: 4.5,
    linePath: "M530 164 L530 118",
    dotX: 530,
    dotY: 118,
  },
  {
    id: "operations",
    label: "Operations",
    cx: 744,
    cy: 96,
    w: 124,
    h: 104,
    rotate: 3.5,
    gradId: "wbTileGradOrange",
    stroke: "#FED7AA",
    floatOffset: -6,
    duration: 5.0,
    linePath: "M568 204 C638 200, 692 178, 716 148",
    dotX: 716,
    dotY: 148,
  },
  {
    id: "automation",
    label: "Automation",
    cx: 932,
    cy: 142,
    w: 118,
    h: 100,
    rotate: 7,
    gradId: "wbTileGradCyan",
    stroke: "#BAE6FD",
    floatOffset: -5,
    duration: 4.9,
    linePath: "M574 218 C700 232, 815 224, 882 184",
    dotX: 882,
    dotY: 184,
  },
];

function renderTileIcon(id: string) {
  switch (id) {
    case "sales":
      return (
        <g transform="translate(-20, -28)">
          <rect x="4" y="18" width="8" height="14" rx="2" fill="#38BDF8" />
          <rect x="16" y="11" width="8" height="21" rx="2" fill="#0EA5E9" />
          <rect x="28" y="4" width="8" height="28" rx="2" fill="#0284C7" />
        </g>
      );
    case "marketing":
      return (
        <g transform="translate(-20, -28)">
          <path d="M6 16L25 8V28L6 20V16Z" fill="#10B981" />
          <rect x="25" y="7" width="4.5" height="22" rx="2.2" fill="#059669" />
          <path d="M32 13L37 11M32 18H38M32 23L37 25" stroke="#34D399" strokeWidth="2.3" strokeLinecap="round" />
          <path d="M11 21L13.5 30H18L15.5 22.5" fill="#059669" />
        </g>
      );
    case "hr":
      return (
        <g transform="translate(-22, -28)">
          {/* Side users */}
          <circle cx="10" cy="14" r="4.5" fill="#A78BFA" />
          <path d="M3 28C3.8 22.5 16.2 22.5 17 28" fill="#A78BFA" />
          <circle cx="34" cy="14" r="4.5" fill="#A78BFA" />
          <path d="M27 28C27.8 22.5 40.2 22.5 41 28" fill="#A78BFA" />
          {/* Center user */}
          <circle cx="22" cy="11.5" r="5.5" fill="#7C3AED" />
          <path d="M13.5 29C14.8 22 29.2 22 30.5 29" fill="#7C3AED" />
        </g>
      );
    case "operations":
      return (
        <g transform="translate(-20, -28)">
          <path
            d="M20 6L22.5 9.2L26.5 8.5L27.5 12.4L31.2 13.8L30.2 17.8L32.8 20.8L30 23.8L30.4 27.6L26.5 28.5L25 32L21 31.2L18 33.8L15 31.2L11 32L9.5 28.5L5.6 27.6L6 23.8L3.2 20.8L5.8 17.8L4.8 13.8L8.5 12.4L9.5 8.5L13.5 9.2L16 6H20Z"
            fill="#F97316"
          />
          <circle cx="18" cy="19.5" r="6" fill="#FFEDD5" />
        </g>
      );
    case "automation":
    default:
      return (
        <g transform="translate(-20, -28)">
          <path d="M20 4L35 11.5L20 19L5 11.5L20 4Z" fill="#0284C7" />
          <path d="M6.5 17.5L20 24.5L33.5 17.5" stroke="#0EA5E9" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6.5 24.5L20 31.5L33.5 24.5" stroke="#38BDF8" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      );
  }
}

function AiEcosystemIllustration({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <motion.div
      className="wb-deliv-eco-wrap"
      initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
    >
      <svg
        viewBox="0 0 1060 328"
        fill="none"
        className="wb-deliv-eco-svg"
        role="img"
        aria-label="Central glowing AI engine connected to Sales, Marketing, HR, Operations, and Automation"
      >
        <defs>
          {/* Ambient ground light & glow */}
          <radialGradient id="wbEcoGroundGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.42" />
            <stop offset="45%" stopColor="#38BDF8" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="wbEcoHorizon" cx="50%" cy="100%" r="70%">
            <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.7" />
            <stop offset="65%" stopColor="#CCFBF1" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#F8FAF9" stopOpacity="0" />
          </radialGradient>

          {/* 3D AI Cube Faces */}
          <linearGradient id="wbCubeTop" x1="480" y1="162" x2="580" y2="206" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#A5F3FC" />
            <stop offset="100%" stopColor="#5EEAD4" />
          </linearGradient>
          <linearGradient id="wbCubeLeft" x1="482" y1="186" x2="530" y2="262" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
          <linearGradient id="wbCubeRight" x1="530" y1="186" x2="578" y2="262" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2DD4BF" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>

          {/* Tile Glass Fills */}
          <linearGradient id="wbTileGradBlue" x1="0" y1="-50" x2="0" y2="50">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#EFF8FF" />
          </linearGradient>
          <linearGradient id="wbTileGradMint" x1="0" y1="-50" x2="0" y2="50">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#ECFDF5" />
          </linearGradient>
          <linearGradient id="wbTileGradPurple" x1="0" y1="-50" x2="0" y2="50">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F5F3FF" />
          </linearGradient>
          <linearGradient id="wbTileGradOrange" x1="0" y1="-50" x2="0" y2="50">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FFF7ED" />
          </linearGradient>
          <linearGradient id="wbTileGradCyan" x1="0" y1="-50" x2="0" y2="50">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#ECFEFF" />
          </linearGradient>

          <linearGradient id="wbCableGrad" x1="120" y1="150" x2="940" y2="230" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#14B8A6" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>

          <filter id="wbTileShadow" x="-25%" y="-25%" width="150%" height="165%">
            <feDropShadow dx="0" dy="14" stdDeviation="12" floodColor="#0F172A" floodOpacity="0.1" />
          </filter>

          <filter id="wbCubeGlowFilter" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="8" stdDeviation="14" floodColor="#14B8A6" floodOpacity="0.45" />
          </filter>
        </defs>

        {/* Soft 3D Horizon Mound */}
        <ellipse cx="530" cy="316" rx="480" ry="68" fill="url(#wbEcoHorizon)" />

        {/* Central Glowing Floor Aura */}
        <ellipse cx="530" cy="258" rx="195" ry="52" fill="url(#wbEcoGroundGlow)" />

        {/* 3 Concentric Pulsing Perspective Rings */}
        <motion.ellipse
          cx="530"
          cy="256"
          rx="188"
          ry="44"
          stroke="#5EEAD4"
          strokeOpacity="0.55"
          strokeWidth="1.6"
          animate={reduceMotion ? undefined : { opacity: [0.45, 0.85, 0.45], scale: [0.99, 1.02, 0.99] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "530px 256px" }}
        />
        <motion.ellipse
          cx="530"
          cy="256"
          rx="142"
          ry="33"
          stroke="#2DD4BF"
          strokeOpacity="0.7"
          strokeWidth="2"
          animate={reduceMotion ? undefined : { opacity: [0.55, 0.95, 0.55], scale: [1, 1.025, 1] }}
          transition={{ duration: 4.0, delay: 0.4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "530px 256px" }}
        />
        <motion.ellipse
          cx="530"
          cy="256"
          rx="96"
          ry="22"
          stroke="#38BDF8"
          strokeOpacity="0.85"
          strokeWidth="2.4"
          animate={reduceMotion ? undefined : { opacity: [0.65, 1, 0.65], scale: [0.985, 1.02, 0.985] }}
          transition={{ duration: 3.6, delay: 0.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "530px 256px" }}
        />

        {/* 5 Curved Glowing Connection Lines + Animated Pulse Packets */}
        {DESKTOP_TILES.map((tile, idx) => (
          <g key={`cable-${tile.id}`}>
            {/* Soft under-glow */}
            <path
              d={tile.linePath}
              stroke="#2DD4BF"
              strokeOpacity="0.28"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Crisp cable */}
            <path
              d={tile.linePath}
              stroke="url(#wbCableGrad)"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            {/* Animated light stream flowing along connection */}
            <motion.path
              d={tile.linePath}
              stroke="#FFFFFF"
              strokeOpacity="0.85"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeDasharray="10 26"
              animate={reduceMotion ? undefined : { strokeDashoffset: [36, 0] }}
              transition={{
                duration: 2.2 + idx * 0.15,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            {/* Glowing endpoint dot */}
            <circle cx={tile.dotX} cy={tile.dotY} r="5.5" fill="#2DD4BF" fillOpacity="0.3" />
            <circle cx={tile.dotX} cy={tile.dotY} r="3.4" fill="#14B8A6" stroke="#FFFFFF" strokeWidth="1.2" />
          </g>
        ))}

        {/* Central Glowing 3D Isometric AI Cube */}
        <motion.g
          filter="url(#wbCubeGlowFilter)"
          animate={reduceMotion ? undefined : { y: [0, -3.5, 0] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Base Glow Pedestal Reflection */}
          <ellipse cx="530" cy="256" rx="54" ry="15" fill="#2DD4BF" fillOpacity="0.45" />

          {/* Cube Top Face */}
          <path
            d="M530 164L578 187L530 210L482 187L530 164Z"
            fill="url(#wbCubeTop)"
            stroke="#ECFEFF"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          {/* Cube Left Face */}
          <path
            d="M482 187L530 210V262L482 239V187Z"
            fill="url(#wbCubeLeft)"
            stroke="#A5F3FC"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* Cube Right Face */}
          <path
            d="M578 187L530 210V262L578 239V187Z"
            fill="url(#wbCubeRight)"
            stroke="#99F6E4"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* Top Edge Specular Highlight */}
          <path d="M484 188L530 210L576 188" stroke="#FFFFFF" strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round" />
          {/* Bold White "AI" Text on Left Front Isometric Face */}
          <g transform="translate(506, 224) skewY(25)">
            <text
              x="0"
              y="8"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="24"
              fontWeight="800"
              fontFamily="var(--font-inter), sans-serif"
              letterSpacing="0.5"
            >
              AI
            </text>
          </g>
        </motion.g>

        {/* 5 Floating Rounded Department Tiles */}
        {DESKTOP_TILES.map((tile, idx) => (
          <motion.g
            key={tile.id}
            animate={
              reduceMotion
                ? undefined
                : {
                    y: [0, tile.floatOffset, 0],
                  }
            }
            transition={{
              duration: tile.duration,
              delay: idx * 0.25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <g transform={`translate(${tile.cx}, ${tile.cy}) rotate(${tile.rotate})`}>
              {/* Soft outer highlight lip */}
              <rect
                x={-tile.w / 2}
                y={-tile.h / 2}
                width={tile.w}
                height={tile.h}
                rx="18"
                fill={`url(#${tile.gradId})`}
                stroke={tile.stroke}
                strokeWidth="1.6"
                filter="url(#wbTileShadow)"
              />
              {/* Bottom 3D bevel edge */}
              <rect
                x={-tile.w / 2 + 2}
                y={tile.h / 2 - 6}
                width={tile.w - 4}
                height="4"
                rx="2"
                fill={tile.stroke}
                fillOpacity="0.4"
              />
              {/* Crisp Department Icon */}
              {renderTileIcon(tile.id)}
              {/* Label */}
              <text
                x="0"
                y="26"
                textAnchor="middle"
                fill="#0F172A"
                fontSize="16.5"
                fontWeight="700"
                fontFamily="var(--font-inter), sans-serif"
                letterSpacing="-0.01em"
              >
                {tile.label}
              </text>
            </g>
          </motion.g>
        ))}
      </svg>
    </motion.div>
  );
}

export function MasterclassDeliverablesSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="wb-section-deliverables"
      id="masterclass-deliverables"
      aria-labelledby="wb-deliverables-heading"
    >
      {/* Background atmospheric glows & texture */}
      <div className="wb-deliv-bg-ambient" aria-hidden="true" />
      <div className="wb-deliv-bg-texture" aria-hidden="true" />

      <div className="wb-deliv-container">
        {/* Section Header */}
        <header className="wb-deliv-header">
          <div className="wb-deliv-eyebrow-pill">
            <EyebrowLayersIcon />
            <span>MASTERCLASS DELIVERABLES</span>
          </div>

          <h2 id="wb-deliverables-heading" className="wb-deliv-title">
            What You&apos;ll Walk Away With After This{" "}
            <span className="wb-deliv-title-highlight">
              60-Min Session
              {/* Green hand-drawn zigzag underline */}
              <svg
                viewBox="0 0 280 18"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
                className="wb-deliv-title-underline"
              >
                <path
                  d="M3 10.5C58 7.5 170 4 275 8.5L135 12.5L260 15"
                  stroke="#6EE7B7"
                  strokeWidth="3.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="wb-deliv-heading-sparks" aria-hidden="true">
              <HeadingAccentSparks reduceMotion={reduceMotion} />
            </span>
          </h2>

          <p className="wb-deliv-subtitle">
            No coding, no technical degree needed. Pure practical frameworks for business owners:
          </p>
        </header>

        {/* 3x2 Deliverable Cards Grid */}
        <div className="wb-deliv-grid">
          {DELIVERABLE_CARDS.map(({ id, title, description, iconBgClass, Icon }, index) => (
            <motion.article
              key={id}
              className="wb-deliv-card"
              initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.45,
                delay: reduceMotion ? 0 : index * 0.06,
                ease: "easeOut",
              }}
            >
              <div className={`wb-deliv-card-icon-box ${iconBgClass}`} aria-hidden="true">
                <Icon />
              </div>
              <h3 className="wb-deliv-card-title">{title}</h3>
              <p className="wb-deliv-card-desc">{description}</p>
            </motion.article>
          ))}
        </div>

        {/* Bottom AI Ecosystem Illustration */}
        <AiEcosystemIllustration reduceMotion={reduceMotion} />
      </div>
    </section>
  );
}
