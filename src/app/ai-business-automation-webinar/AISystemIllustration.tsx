"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface DepartmentNode {
  id: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  gradId: string;
  stroke: string;
  iconBg: string;
  accent: string;
  linePath: string;
  nodeX: number;
  nodeY: number;
  floatY: number;
  duration: number;
  delay: number;
}

const DEPARTMENTS: readonly DepartmentNode[] = [
  {
    id: "operations",
    label: "Operations",
    x: 16,
    y: 44,
    w: 152,
    h: 54,
    gradId: "wsCardGradMint",
    stroke: "#A7F3D0",
    iconBg: "#D1FAE5",
    accent: "#059669",
    linePath: "M168 71 C224 71, 248 168, 286 202",
    nodeX: 168,
    nodeY: 71,
    floatY: -4,
    duration: 4.4,
    delay: 0.1,
  },
  {
    id: "hr",
    label: "HR",
    x: 24,
    y: 120,
    w: 144,
    h: 54,
    gradId: "wsCardGradPurple",
    stroke: "#DDD6FE",
    iconBg: "#EDE9FE",
    accent: "#7C3AED",
    linePath: "M168 147 C216 147, 242 184, 282 212",
    nodeX: 168,
    nodeY: 147,
    floatY: -3.5,
    duration: 4.9,
    delay: 0.35,
  },
  {
    id: "marketing",
    label: "Marketing",
    x: 12,
    y: 196,
    w: 156,
    h: 54,
    gradId: "wsCardGradTeal",
    stroke: "#99F6E4",
    iconBg: "#CCFBF1",
    accent: "#0D9488",
    linePath: "M168 223 C215 223, 240 223, 278 224",
    nodeX: 168,
    nodeY: 223,
    floatY: -4.5,
    duration: 5.1,
    delay: 0.2,
  },
  {
    id: "sales",
    label: "Sales",
    x: 24,
    y: 272,
    w: 144,
    h: 54,
    gradId: "wsCardGradBlue",
    stroke: "#BAE6FD",
    iconBg: "#DBEAFE",
    accent: "#2563EB",
    linePath: "M168 299 C218 299, 244 260, 282 238",
    nodeX: 168,
    nodeY: 299,
    floatY: -3.5,
    duration: 4.6,
    delay: 0.5,
  },
  {
    id: "finance",
    label: "Finance",
    x: 16,
    y: 348,
    w: 152,
    h: 54,
    gradId: "wsCardGradAmber",
    stroke: "#FED7AA",
    iconBg: "#FFEDD5",
    accent: "#EA580C",
    linePath: "M168 375 C224 375, 250 282, 286 248",
    nodeX: 168,
    nodeY: 375,
    floatY: -4,
    duration: 4.8,
    delay: 0.3,
  },
];

const OUTPUT_PATH = "M366 224 C394 224, 404 224, 424 224";

function DepartmentSvgIcon({ id, accent }: { id: string; accent: string }) {
  switch (id) {
    case "operations":
      return (
        <g transform="translate(8, 8)">
          <rect
            x="2.5"
            y="4.5"
            width="17"
            height="13"
            rx="2.5"
            fill="none"
            stroke={accent}
            strokeWidth="1.9"
          />
          <path
            d="M3.5 6L11 11.5L18.5 6"
            fill="none"
            stroke={accent}
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      );
    case "hr":
      return (
        <g transform="translate(8, 8)">
          <circle cx="8.5" cy="7.2" r="2.7" fill={accent} />
          <path d="M3.5 16.5C4 12.8 13 12.8 13.5 16.5" fill={accent} />
          <circle cx="15" cy="8.2" r="2.1" fill={accent} fillOpacity="0.65" />
          <path
            d="M14.2 12.8C16.8 13 18.4 14.3 18.8 16.5"
            stroke={accent}
            strokeOpacity="0.7"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </g>
      );
    case "marketing":
      return (
        <g transform="translate(8, 8)">
          <path
            d="M4.5 9.8L15.5 5.4V15.8L4.5 11.6V9.8Z"
            fill={accent}
            fillOpacity="0.18"
            stroke={accent}
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M17.2 7.4C18.3 9 18.3 12.6 17.2 14.2"
            stroke={accent}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M7 12.6L8.3 17.2H10.4L9.2 13.4"
            stroke={accent}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      );
    case "sales":
      return (
        <g transform="translate(8, 8)">
          <rect x="3.5" y="11.5" width="3.5" height="6" rx="1" fill={accent} fillOpacity="0.45" />
          <rect x="9.2" y="8" width="3.5" height="9.5" rx="1" fill={accent} fillOpacity="0.72" />
          <rect x="14.9" y="4.5" width="3.5" height="13" rx="1" fill={accent} />
        </g>
      );
    case "finance":
    default:
      return (
        <g transform="translate(8, 8)">
          <path
            d="M5.5 3.5H13.2L16.8 7.1V17.5C16.8 18.2 16.2 18.8 15.5 18.8H5.5C4.8 18.8 4.2 18.2 4.2 17.5V4.8C4.2 4.1 4.8 3.5 5.5 3.5Z"
            fill={accent}
            fillOpacity="0.14"
            stroke={accent}
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M7.5 10.5H13.5M7.5 14H11.5" stroke={accent} strokeWidth="1.8" strokeLinecap="round" />
        </g>
      );
  }
}

export function AISystemIllustration() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="wb-why-eco-shell" aria-label="AI automation ecosystem connecting Operations, HR, Marketing, Sales, and Finance into Automated Workflows">
      <div className="wb-why-eco-glow" aria-hidden="true" />

      <svg
        viewBox="0 0 600 440"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="wb-why-eco-svg"
        role="img"
        aria-label="Central AI core cube connected to Operations, HR, Marketing, Sales, and Finance generating Automated Workflows"
      >
        <defs>
          {/* Ambient ground glow under AI cube */}
          <radialGradient id="wsFloorGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.48" />
            <stop offset="52%" stopColor="#38BDF8" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
          </radialGradient>

          {/* 3D AI Cube face gradients */}
          <linearGradient id="wsCubeTop" x1="278" y1="166" x2="366" y2="210" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#A5F3FC" />
            <stop offset="100%" stopColor="#2DD4BF" />
          </linearGradient>
          <linearGradient id="wsCubeLeft" x1="278" y1="190" x2="322" y2="274" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#0D9488" />
          </linearGradient>
          <linearGradient id="wsCubeRight" x1="366" y1="190" x2="322" y2="274" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>

          {/* Glowing cable gradients */}
          <linearGradient id="wsCableLeftGrad" x1="168" y1="71" x2="290" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="55%" stopColor="#14B8A6" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
          <linearGradient id="wsCableOutGrad" x1="366" y1="224" x2="424" y2="224" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2DD4BF" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>

          {/* Card gradients */}
          <linearGradient id="wsCardGradMint" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#ECFDF5" />
          </linearGradient>
          <linearGradient id="wsCardGradPurple" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F5F3FF" />
          </linearGradient>
          <linearGradient id="wsCardGradTeal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F0FDFA" />
          </linearGradient>
          <linearGradient id="wsCardGradBlue" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#EFF6FF" />
          </linearGradient>
          <linearGradient id="wsCardGradAmber" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FFF7ED" />
          </linearGradient>
          <linearGradient id="wsSuccessGrad" x1="424" y1="168" x2="584" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="55%" stopColor="#F0FDF4" />
            <stop offset="100%" stopColor="#DCFCE7" />
          </linearGradient>

          <filter id="wsCardShadow" x="-18%" y="-25%" width="140%" height="165%">
            <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#0F172A" floodOpacity="0.08" />
          </filter>
          <filter id="wsCubeShadow" x="-45%" y="-45%" width="190%" height="190%">
            <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#14B8A6" floodOpacity="0.45" />
          </filter>
          <filter id="wsSuccessShadow" x="-25%" y="-30%" width="150%" height="170%">
            <feDropShadow dx="0" dy="12" stdDeviation="12" floodColor="#10B981" floodOpacity="0.22" />
          </filter>
        </defs>

        {/* Ambient Floor Aura & 3 Concentric Pulsing Perspective Rings */}
        <ellipse cx="322" cy="272" rx="108" ry="34" fill="url(#wsFloorGlow)" />

        <motion.ellipse
          cx="322"
          cy="272"
          rx="102"
          ry="28"
          stroke="#5EEAD4"
          strokeOpacity="0.52"
          strokeWidth="1.5"
          animate={reduceMotion ? undefined : { opacity: [0.42, 0.85, 0.42], scale: [0.985, 1.025, 0.985] }}
          transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "322px 272px" }}
        />
        <motion.ellipse
          cx="322"
          cy="272"
          rx="76"
          ry="21"
          stroke="#2DD4BF"
          strokeOpacity="0.7"
          strokeWidth="1.8"
          animate={reduceMotion ? undefined : { opacity: [0.55, 0.96, 0.55], scale: [1, 1.03, 1] }}
          transition={{ duration: 3.9, delay: 0.35, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "322px 272px" }}
        />
        <motion.ellipse
          cx="322"
          cy="272"
          rx="52"
          ry="14"
          stroke="#38BDF8"
          strokeOpacity="0.86"
          strokeWidth="2.1"
          animate={reduceMotion ? undefined : { opacity: [0.62, 1, 0.62], scale: [0.98, 1.025, 0.98] }}
          transition={{ duration: 3.4, delay: 0.7, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "322px 272px" }}
        />

        {/* Curved Glowing Connections from 5 Departments to Central AI Cube */}
        {DEPARTMENTS.map((dept, idx) => (
          <g key={`ws-cable-${dept.id}`}>
            {/* Soft cyan/mint underglow */}
            <path
              d={dept.linePath}
              stroke="#2DD4BF"
              strokeOpacity="0.22"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Animated drawing connection line */}
            <motion.path
              d={dept.linePath}
              stroke="url(#wsCableLeftGrad)"
              strokeWidth="2.2"
              strokeLinecap="round"
              initial={reduceMotion ? undefined : { pathLength: 0, opacity: 0.4 }}
              whileInView={reduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, delay: idx * 0.08, ease: "easeOut" }}
            />
            {/* Traveling data particle pulse along cable */}
            <motion.path
              d={dept.linePath}
              stroke="#FFFFFF"
              strokeOpacity="0.92"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeDasharray="6 28"
              animate={reduceMotion ? undefined : { strokeDashoffset: [34, 0] }}
              transition={{
                duration: 2.1 + idx * 0.14,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            {/* Glowing endpoint node */}
            <circle cx={dept.nodeX} cy={dept.nodeY} r="5.5" fill="#2DD4BF" fillOpacity="0.28" />
            <circle cx={dept.nodeX} cy={dept.nodeY} r="3.1" fill="#14B8A6" stroke="#FFFFFF" strokeWidth="1.2" />
          </g>
        ))}

        {/* Output Connection Line from AI Cube -> Automated Workflows */}
        <g>
          <path
            d={OUTPUT_PATH}
            stroke="#10B981"
            strokeOpacity="0.25"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <motion.path
            d={OUTPUT_PATH}
            stroke="url(#wsCableOutGrad)"
            strokeWidth="2.6"
            strokeLinecap="round"
            initial={reduceMotion ? undefined : { pathLength: 0 }}
            whileInView={reduceMotion ? undefined : { pathLength: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.35, ease: "easeOut" }}
          />
          <motion.path
            d={OUTPUT_PATH}
            stroke="#FFFFFF"
            strokeOpacity="0.95"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeDasharray="7 18"
            animate={reduceMotion ? undefined : { strokeDashoffset: [25, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          <circle cx="424" cy="224" r="6" fill="#10B981" fillOpacity="0.28" />
          <circle cx="424" cy="224" r="3.4" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.3" />
        </g>

        {/* Central Glowing 3D Isometric AI Cube */}
        <motion.g
          filter="url(#wsCubeShadow)"
          animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
          transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Base reflection under cube */}
          <ellipse cx="322" cy="272" rx="44" ry="12" fill="#2DD4BF" fillOpacity="0.45" />

          {/* Cube Top Face */}
          <path
            d="M322 168L366 190L322 212L278 190L322 168Z"
            fill="url(#wsCubeTop)"
            stroke="#ECFEFF"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          {/* Cube Left Face */}
          <path
            d="M278 190L322 212V264L278 242V190Z"
            fill="url(#wsCubeLeft)"
            stroke="#A5F3FC"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* Cube Right Face */}
          <path
            d="M366 190L322 212V264L366 242V190Z"
            fill="url(#wsCubeRight)"
            stroke="#6EE7B7"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />

          {/* Subtle top face glass shine & edge specular highlight */}
          <path
            d="M322 174L352 189L322 204L292 189L322 174Z"
            fill="#FFFFFF"
            fillOpacity="0.26"
          />
          <path
            d="M280 191L322 212L364 191"
            stroke="#FFFFFF"
            strokeOpacity="0.82"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Bold White "AI" Typography on Left Isometric Face */}
          <g transform="translate(300, 227) skewY(26)">
            <text
              x="0"
              y="8"
              fill="#FFFFFF"
              fontSize="22"
              fontWeight="800"
              fontFamily="var(--font-inter), sans-serif"
              letterSpacing="0.4"
              textAnchor="middle"
            >
              AI
            </text>
          </g>
          {/* Subtle Right-Face Circuit Node Decoration */}
          <g transform="translate(344, 227) skewY(-26)" opacity="0.65">
            <circle cx="-6" cy="-5" r="2.2" fill="#ECFEFF" />
            <circle cx="6" cy="5" r="2.2" fill="#ECFEFF" />
            <path d="M-4 -5H2L6 3" stroke="#ECFEFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </motion.g>

        {/* Five Floating Department Cards */}
        {DEPARTMENTS.map((dept, idx) => (
          <motion.g
            key={dept.id}
            filter="url(#wsCardShadow)"
            initial={reduceMotion ? undefined : { opacity: 0, x: -10 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            animate={reduceMotion ? undefined : { y: [0, dept.floatY, 0] }}
            transition={{
              y: { duration: dept.duration, delay: dept.delay, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 0.36, delay: idx * 0.06 },
              x: { duration: 0.36, delay: idx * 0.06 },
            }}
          >
            <g transform={`translate(${dept.x}, ${dept.y})`}>
              <rect
                x="0"
                y="0"
                width={dept.w}
                height={dept.h}
                rx="15"
                fill={`url(#${dept.gradId})`}
                stroke={dept.stroke}
                strokeWidth="1.2"
              />
              <rect x="10" y="9" width="36" height="36" rx="10" fill={dept.iconBg} />
              <g transform="translate(9, 8)">
                <DepartmentSvgIcon id={dept.id} accent={dept.accent} />
              </g>
              <text
                x="56"
                y="32"
                fill="#0F172A"
                fontSize="13.5"
                fontWeight="700"
                fontFamily="Inter, system-ui, sans-serif"
              >
                {dept.label}
              </text>
            </g>
          </motion.g>
        ))}

        {/* Right Output Success Card: Automated Workflows */}
        <motion.g
          filter="url(#wsSuccessShadow)"
          initial={reduceMotion ? undefined : { opacity: 0, scale: 0.94 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [0, -4, 0],
                }
          }
          transition={{
            y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 0.45, delay: 0.25 },
            scale: { duration: 0.45, delay: 0.25 },
          }}
        >
          {/* Occasional subtle green halo pulse around Automated Workflows card */}
          <motion.rect
            x="420"
            y="162"
            width="168"
            height="124"
            rx="22"
            stroke="#10B981"
            strokeWidth="2"
            fill="none"
            animate={
              reduceMotion
                ? undefined
                : { opacity: [0.1, 0.55, 0.1], scale: [0.985, 1.025, 0.985] }
            }
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "504px 224px" }}
          />

          <rect
            x="424"
            y="166"
            width="160"
            height="116"
            rx="20"
            fill="url(#wsSuccessGrad)"
            stroke="#6EE7B7"
            strokeWidth="1.5"
          />

          {/* Check Circle Icon Badge */}
          <circle cx="504" cy="202" r="19" fill="#DCFCE7" stroke="#86EFAC" strokeWidth="1.2" />
          <circle cx="504" cy="202" r="12.5" fill="#10B981" />
          <path
            d="M498.5 202.2L502.2 205.8L510 198.2"
            stroke="#FFFFFF"
            strokeWidth="2.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <text
            x="504"
            y="241"
            fill="#090D14"
            fontSize="14.5"
            fontWeight="800"
            fontFamily="Inter, system-ui, sans-serif"
            textAnchor="middle"
          >
            Automated
          </text>
          <text
            x="504"
            y="259"
            fill="#047857"
            fontSize="14.5"
            fontWeight="800"
            fontFamily="Inter, system-ui, sans-serif"
            textAnchor="middle"
          >
            Workflows
          </text>
        </motion.g>
      </svg>
    </div>
  );
}
