"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

function EyebrowWarningIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="wb-pain2-eyebrow-icon"
    >
      <path
        d="M7.134 2.4a1 1 0 0 1 1.732 0l5.366 9.3A1 1 0 0 1 13.366 13.2H2.634a1 1 0 0 1-.866-1.5l5.366-9.3Z"
        stroke="#DC2626"
        strokeWidth="1.55"
        strokeLinejoin="round"
      />
      <path d="M8 6.1v3.3" stroke="#DC2626" strokeWidth="1.55" strokeLinecap="round" />
      <circle cx="8" cy="11.2" r="0.85" fill="#DC2626" />
    </svg>
  );
}

function DelayedLeadIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3.5 11.5a8.5 8.5 0 1 1 2.2 6.2"
        stroke="#E11D48"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <path
        d="M3 7.5v4.3h4.3"
        stroke="#E11D48"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 7.5v4.8l3.1 1.8"
        stroke="#DC2626"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DisconnectedToolsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 15h8.5M15.5 15l-2.6-2.6M15.5 15l-2.6 2.6"
        stroke="#E11D48"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 9H8.5M8.5 9l2.6-2.6M8.5 9l2.6 2.6"
        stroke="#DC2626"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HiringAdminIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.5 3.5h7.8l3.7 3.7v12.3a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 5 19.5V5a1.5 1.5 0 0 1 1.5-1.5Z"
        fill="#DC2626"
      />
      <path d="M14 3.5v3.5a.8.8 0 0 0 .8.8H18" fill="#FCA5A5" />
      <text
        x="11.5"
        y="15.2"
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize="8.5"
        fontWeight="800"
        fontFamily="var(--font-inter), sans-serif"
      >
        $
      </text>
      <path d="M8.2 17.6h6.6" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function OpsBottlenecksIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4.5" y="5.5" width="3" height="3" rx="0.7" fill="#DC2626" />
      <rect x="4.5" y="10.5" width="3" height="3" rx="0.7" fill="#E11D48" />
      <rect x="4.5" y="15.5" width="3" height="3" rx="0.7" fill="#DC2626" />
      <path
        d="M10.5 7h9M10.5 12h9M10.5 17h9"
        stroke="#DC2626"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MotionSparks({
  reduceMotion,
  className = "",
  rotate = 0,
}: {
  reduceMotion: boolean | null;
  className?: string;
  rotate?: number;
}) {
  return (
    <motion.svg
      width="26"
      height="24"
      viewBox="0 0 26 24"
      fill="none"
      aria-hidden="true"
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
      animate={
        reduceMotion
          ? undefined
          : {
              opacity: [0.75, 1, 0.75],
              scale: [0.96, 1.05, 0.96],
            }
      }
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
    >
      <path d="M13 3L11.5 9.5" stroke="#DC2626" strokeWidth="2.3" strokeLinecap="round" />
      <path d="M21 7.5L15.2 12.2" stroke="#E11D48" strokeWidth="2.3" strokeLinecap="round" />
      <path d="M23.5 15.8L16.8 16.5" stroke="#DC2626" strokeWidth="2.3" strokeLinecap="round" />
    </motion.svg>
  );
}

function HourglassBadge({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <motion.div
      className="wb-pain2-hourglass-badge"
      animate={
        reduceMotion
          ? undefined
          : {
              y: [0, -4, 0],
              rotate: [-2, 2, -2],
            }
      }
      transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg width="32" height="34" viewBox="0 0 36 38" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="wbPain2GlassFill" x1="10" y1="6" x2="26" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFE4E6" />
            <stop offset="100%" stopColor="#FECDD3" />
          </linearGradient>
        </defs>
        {/* Top & Bottom Hourglass Frames */}
        <rect x="8" y="3.5" width="20" height="3.2" rx="1.6" fill="#DC2626" />
        <rect x="8" y="31.3" width="20" height="3.2" rx="1.6" fill="#DC2626" />
        {/* Glass Bulbs */}
        <path
          d="M11 6.7H25C25 12.8 20.5 16.3 18.8 19C20.5 21.7 25 25.2 25 31.3H11C11 25.2 15.5 21.7 17.2 19C15.5 16.3 11 12.8 11 6.7Z"
          fill="url(#wbPain2GlassFill)"
          stroke="#E11D48"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        {/* Upper Sand */}
        <motion.path
          d="M13 11.5H23C22.2 14.3 19.6 16.5 18 17.8C16.4 16.5 13.8 14.3 13 11.5Z"
          fill="#E11D48"
          animate={reduceMotion ? undefined : { opacity: [0.95, 0.72, 0.95] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Falling Sand Stream */}
        <motion.line
          x1="18"
          y1="18.2"
          x2="18"
          y2="25.5"
          stroke="#DC2626"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeDasharray="2 2"
          animate={reduceMotion ? undefined : { strokeDashoffset: [0, -8] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
        />
        {/* Bottom Sand Pile */}
        <path
          d="M12.5 31.3C12.9 28.1 15.2 25.7 18 25.7C20.8 25.7 23.1 28.1 23.5 31.3H12.5Z"
          fill="#DC2626"
        />
      </svg>
    </motion.div>
  );
}

function IllustrationDelayedLeads({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <div className="wb-pain2-illus wb-pain2-illus-leads" aria-hidden="true">
      {/* Upper-left decorative red sparks */}
      <div className="wb-pain2-sparks-leads">
        <MotionSparks reduceMotion={reduceMotion} rotate={-48} />
      </div>

      {/* Tilted CRM Laptop */}
      <motion.div
        className="wb-pain2-laptop-leads-wrap"
        animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 245 148" fill="none" className="wb-pain2-illus-svg">
          <defs>
            <linearGradient id="wbLeadBezel" x1="28" y1="14" x2="212" y2="122" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#656DB0" />
              <stop offset="100%" stopColor="#464D87" />
            </linearGradient>
            <linearGradient id="wbLeadBase" x1="8" y1="120" x2="225" y2="138" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#858DCE" />
              <stop offset="100%" stopColor="#5D64A3" />
            </linearGradient>
          </defs>

          {/* Soft floor shadow */}
          <ellipse cx="118" cy="136" rx="102" ry="9" fill="#94A3B8" fillOpacity="0.22" />

          {/* Tilted Laptop Lid Frame */}
          <g transform="rotate(-2.2 122 72)">
            <rect x="28" y="16" width="182" height="106" rx="10" fill="url(#wbLeadBezel)" />
            <circle cx="119" cy="22.5" r="1.8" fill="#A5B4FC" />

            {/* Laptop Screen */}
            <rect x="35" y="27" width="168" height="88" rx="5.5" fill="#F8FAFC" />

            {/* Top bar dots */}
            <circle cx="44" cy="34.5" r="2" fill="#CBD5E1" />
            <circle cx="51" cy="34.5" r="2" fill="#CBD5E1" />
            <circle cx="58" cy="34.5" r="2" fill="#CBD5E1" />

            {/* Lead Row 1 (idle blue avatar) */}
            <rect x="42" y="42" width="154" height="20" rx="5" fill="#EFF4FF" stroke="#E2E8F0" strokeWidth="0.9" />
            <circle cx="54" cy="52" r="6" fill="#64748B" />
            <circle cx="54" cy="50.5" r="2.2" fill="#E2E8F0" />
            <path d="M50.5 56.2C51.3 54.4 56.7 54.4 57.5 56.2" stroke="#E2E8F0" strokeWidth="1.6" strokeLinecap="round" />
            <rect x="65" y="48.5" width="44" height="3.2" rx="1.6" fill="#94A3B8" />
            <rect x="65" y="54" width="66" height="2.6" rx="1.3" fill="#CBD5E1" />
            <rect x="172" y="48.5" width="17" height="7" rx="3.5" fill="#CBD5E1" fillOpacity="0.7" />

            {/* Lead Row 2 (highlighted rose-red idle row) */}
            <motion.g
              animate={reduceMotion ? undefined : { opacity: [0.92, 1, 0.92] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <rect x="42" y="65" width="154" height="21" rx="5" fill="#FFE4E6" stroke="#FDA4AF" strokeWidth="1" />
              <circle cx="54" cy="75.5" r="6.2" fill="#E11D48" />
              <circle cx="54" cy="73.8" r="2.2" fill="#FFE4E6" />
              <path d="M50.5 79.6C51.3 77.8 56.7 77.8 57.5 79.6" stroke="#FFE4E6" strokeWidth="1.6" strokeLinecap="round" />
              <rect x="65" y="72" width="52" height="3.3" rx="1.65" fill="#FDA4AF" />
              <rect x="65" y="77.6" width="76" height="2.6" rx="1.3" fill="#FECDD3" />
              <rect x="170" y="71.5" width="19" height="8" rx="4" fill="#FB7185" fillOpacity="0.6" />
            </motion.g>

            {/* Lead Row 3 */}
            <rect x="42" y="89" width="154" height="20" rx="5" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="0.9" />
            <circle cx="54" cy="99" r="6" fill="#3B82F6" fillOpacity="0.7" />
            <circle cx="54" cy="97.5" r="2.2" fill="#FFFFFF" />
            <path d="M50.5 103.2C51.3 101.4 56.7 101.4 57.5 103.2" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
            <rect x="65" y="95.5" width="40" height="3.2" rx="1.6" fill="#94A3B8" />
            <rect x="65" y="101" width="60" height="2.6" rx="1.3" fill="#CBD5E1" />
            <rect x="172" y="95.5" width="17" height="7" rx="3.5" fill="#CBD5E1" fillOpacity="0.6" />
          </g>

          {/* Laptop Keyboard Base */}
          <path d="M12 121H220L215 130C214 132 211 133 208 133H24C21 133 18 132 17 130L12 121Z" fill="url(#wbLeadBase)" />
          <rect x="94" y="121" width="44" height="3.5" rx="1.75" fill="#434A83" />
        </svg>
      </motion.div>

      {/* Floating Hourglass Top-Right */}
      <div className="wb-pain2-hourglass-pos-leads">
        <HourglassBadge reduceMotion={reduceMotion} />
      </div>
    </div>
  );
}

function IllustrationDisconnectedTools({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <div className="wb-pain2-illus wb-pain2-illus-tools" aria-hidden="true">
      {/* Dashed Curved Connection Lines */}
      <svg viewBox="0 0 260 156" fill="none" className="wb-pain2-illus-svg">
        <defs>
          <linearGradient id="wbToolsBezel" x1="65" y1="88" x2="195" y2="142" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#656DB0" />
            <stop offset="100%" stopColor="#464D87" />
          </linearGradient>
        </defs>

        {/* Animated Dashed Paths connecting floating apps toward the broken laptop */}
        <motion.path
          d="M36 96 C62 96, 75 104, 92 108"
          stroke="#94A3B8"
          strokeWidth="1.5"
          strokeDasharray="3.5 3.5"
          animate={reduceMotion ? undefined : { strokeDashoffset: [0, -14] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M68 48 C82 68, 96 80, 112 96"
          stroke="#94A3B8"
          strokeWidth="1.5"
          strokeDasharray="3.5 3.5"
          animate={reduceMotion ? undefined : { strokeDashoffset: [0, -14] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M142 36 C138 60, 134 76, 131 94"
          stroke="#94A3B8"
          strokeWidth="1.5"
          strokeDasharray="3.5 3.5"
          animate={reduceMotion ? undefined : { strokeDashoffset: [0, -14] }}
          transition={{ duration: 2.0, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M196 58 C178 76, 166 86, 152 96"
          stroke="#94A3B8"
          strokeWidth="1.5"
          strokeDasharray="3.5 3.5"
          animate={reduceMotion ? undefined : { strokeDashoffset: [0, -14] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M214 106 C192 108, 182 110, 168 112"
          stroke="#94A3B8"
          strokeWidth="1.5"
          strokeDasharray="3.5 3.5"
          animate={reduceMotion ? undefined : { strokeDashoffset: [0, -14] }}
          transition={{ duration: 2.3, repeat: Infinity, ease: "linear" }}
        />

        {/* Floor Shadow under laptop */}
        <ellipse cx="130" cy="146" rx="76" ry="6" fill="#94A3B8" fillOpacity="0.22" />

        {/* Central Laptop */}
        <rect x="74" y="88" width="112" height="52" rx="6.5" fill="url(#wbToolsBezel)" />
        <rect x="79.5" y="93" width="101" height="42" rx="3.5" fill="#F8FAFC" />
        {/* Keyboard lip */}
        <rect x="58" y="139.5" width="144" height="6" rx="3" fill="#636BA9" />
        <rect x="115" y="139.5" width="30" height="2.4" rx="1.2" fill="#3F4578" />

        {/* Broken Red Chain-Link inside Laptop Screen */}
        <g transform="rotate(-24 130 114)">
          <path
            d="M123 114h-7a5.5 5.5 0 0 1 0-11h7"
            stroke="#E11D48"
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M137 103h7a5.5 5.5 0 0 1 0 11h-7"
            stroke="#DC2626"
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
          />
          {/* Tiny red snap sparks */}
          <path d="M128 97l-1.8-4.2" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M133 97l1.8-4.2" stroke="#E11D48" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M128 120l-1.8 4.2" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M133 120l1.8 4.2" stroke="#E11D48" strokeWidth="1.8" strokeLinecap="round" />
        </g>
      </svg>

      {/* Floating App Tile 1: Google Forms (Left Lower) */}
      <motion.div
        className="wb-pain2-app-tile wb-pain2-app-forms"
        animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
        transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="20" height="22" viewBox="0 0 22 24" fill="none">
          <path d="M3 2.5C3 1.67 3.67 1 4.5 1H14L19 6V21.5C19 22.33 18.33 23 17.5 23H4.5C3.67 23 3 22.33 3 21.5V2.5Z" fill="#7C3AED" />
          <path d="M14 1V6H19" fill="#C4B5FD" />
          <circle cx="7.5" cy="11.5" r="1" fill="#FFFFFF" />
          <path d="M10.5 11.5H15" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="7.5" cy="15" r="1" fill="#FFFFFF" />
          <path d="M10.5 15H15" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="7.5" cy="18.5" r="1" fill="#FFFFFF" />
          <path d="M10.5 18.5H15" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </motion.div>

      {/* Floating App Tile 2: Gmail (Top Left) */}
      <motion.div
        className="wb-pain2-app-tile wb-pain2-app-gmail"
        animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
        transition={{ duration: 4.8, delay: 0.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="24" height="19" viewBox="0 0 24 18" fill="none">
          <path d="M2 15.5V4.8L5.5 7.4V16H2.8C2.36 16 2 15.64 2 15.2Z" fill="#4285F4" />
          <path d="M22 15.5V4.8L18.5 7.4V16H21.2C21.64 16 22 15.64 22 15.2Z" fill="#34A853" />
          <path d="M18.5 7.4V2.8L22 5.4V4.8C22 2.9 19.9 1.8 18.4 3L12 7.8L5.6 3C4.1 1.8 2 2.9 2 4.8V5.4L5.5 2.8V7.4L12 12.2L18.5 7.4Z" fill="#EA4335" />
          <path d="M2 4.8L5.5 7.4V2.8L4 1.7C2.9 0.9 2 1.7 2 3.1V4.8Z" fill="#C5221F" />
          <path d="M22 4.8L18.5 7.4V2.8L20 1.7C21.1 0.9 22 1.7 22 3.1V4.8Z" fill="#FBBC04" />
        </svg>
      </motion.div>

      {/* Floating App Tile 3: WhatsApp (Top Center-Right) */}
      <motion.div
        className="wb-pain2-app-tile wb-pain2-app-whatsapp"
        animate={reduceMotion ? undefined : { y: [0, -4.5, 0] }}
        transition={{ duration: 4.2, delay: 0.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="#22C55E" />
          <path d="M6.5 18.8L8 15.2A7 7 0 1 1 10.6 17.6L6.5 18.8Z" fill="#22C55E" stroke="#FFFFFF" strokeWidth="1.5" strokeLinejoin="round" />
          <path
            d="M9.6 8.8c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.6c.1.2 0 .5-.1.6l-.4.5c.5.9 1.3 1.7 2.2 2.2l.5-.4c.2-.1.4-.2.6-.1l1.6.7c.3.1.4.3.4.5v.5c0 .3 0 .5-.4.7-.5.3-1.4.4-2.6-.1-1.4-.6-2.7-1.9-3.3-3.3-.5-1.2-.4-2.1-.1-2.6Z"
            fill="#FFFFFF"
          />
        </svg>
      </motion.div>

      {/* Floating App Tile 4: Google Sheets (Upper Right) */}
      <motion.div
        className="wb-pain2-app-tile wb-pain2-app-sheets"
        animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
        transition={{ duration: 4.6, delay: 0.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="20" height="22" viewBox="0 0 22 24" fill="none">
          <path d="M3 2.5C3 1.67 3.67 1 4.5 1H14L19 6V21.5C19 22.33 18.33 23 17.5 23H4.5C3.67 23 3 22.33 3 21.5V2.5Z" fill="#16A34A" />
          <path d="M14 1V6H19" fill="#86EFAC" />
          <rect x="6.5" y="10.5" width="9" height="7" rx="1" stroke="#FFFFFF" strokeWidth="1.3" />
          <path d="M6.5 14H15.5M11 10.5V17.5" stroke="#FFFFFF" strokeWidth="1.3" />
        </svg>
      </motion.div>

      {/* Floating App Tile 5: CRM Card (Bottom Right) */}
      <motion.div
        className="wb-pain2-app-crm"
        animate={reduceMotion ? undefined : { y: [0, -3.5, 0] }}
        transition={{ duration: 5.0, delay: 0.6, repeat: Infinity, ease: "easeInOut" }}
      >
        CRM
      </motion.div>
    </div>
  );
}

function IllustrationHiringAdmin({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <div className="wb-pain2-illus wb-pain2-illus-hiring" aria-hidden="true">
      <svg viewBox="0 0 250 154" fill="none" className="wb-pain2-illus-svg">
        <defs>
          <linearGradient id="wbLensGlass" x1="108" y1="62" x2="148" y2="104" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.18" />
          </linearGradient>
        </defs>

        {/* Soft bottom shadow */}
        <ellipse cx="122" cy="144" rx="88" ry="7" fill="#94A3B8" fillOpacity="0.18" />

        {/* Back-Left Tilted Resume */}
        <g transform="rotate(-11 58 95)">
          <rect x="26" y="42" width="66" height="88" rx="7" fill="#EAEBFB" stroke="#D7DAFA" strokeWidth="1" />
          <circle cx="59" cy="64" r="11.5" fill="#FFFFFF" />
          <circle cx="59" cy="61.5" r="4.2" fill="#7D88C4" />
          <path d="M51 72c1.4-3.6 14.6-3.6 16 0" fill="#7D88C4" />
          <rect x="38" y="84" width="42" height="4" rx="2" fill="#BFC7F2" />
          <rect x="38" y="92" width="34" height="3.5" rx="1.75" fill="#D5DBFA" />
          <rect x="38" y="100" width="38" height="3.5" rx="1.75" fill="#D5DBFA" />
        </g>

        {/* Back-Center-Left Slightly Tilted Resume */}
        <g transform="rotate(-4 86 78)">
          <rect x="54" y="26" width="68" height="92" rx="7" fill="#E8EEFE" stroke="#D1DCFD" strokeWidth="1" />
          <circle cx="88" cy="48" r="12" fill="#FFFFFF" />
          <circle cx="88" cy="45.5" r="4.4" fill="#475569" />
          <path d="M80 56c1.5-3.8 14.5-3.8 16 0" fill="#475569" />
          <rect x="66" y="68" width="44" height="4" rx="2" fill="#C7D2FE" />
          <rect x="66" y="76" width="36" height="3.5" rx="1.75" fill="#DCE4FE" />
        </g>

        {/* Back-Right Tilted Sheet */}
        <g transform="rotate(8 175 96)">
          <rect x="142" y="44" width="66" height="88" rx="7" fill="#F1EEF9" stroke="#E2DCF5" strokeWidth="1" />
          <rect x="152" y="66" width="44" height="4" rx="2" fill="#D8D2F0" />
          <rect x="152" y="75" width="38" height="3.5" rx="1.75" fill="#E5E0F5" />
          <rect x="152" y="84" width="42" height="3.5" rx="1.75" fill="#E5E0F5" />
        </g>

        {/* Central Elevated White Resume Card */}
        <g>
          <rect x="82" y="48" width="84" height="92" rx="9" fill="#FFFFFF" stroke="#FECDD3" strokeWidth="1.1" />
          {/* Avatar Circle */}
          <circle cx="124" cy="79" r="19" fill="#FECDD3" />
          {/* Candidate Head & Suit */}
          <path d="M114.5 76.5c0-6.2 4.3-9.5 9.5-9.5s9.5 3.3 9.5 9.5v2h-19v-2Z" fill="#1E293B" />
          <circle cx="124" cy="76" r="5.5" fill="#FDBA74" />
          <path d="M113 94.5c2.2-6 19.8-6 22 0" fill="#DC2626" />
          {/* Resume Lines */}
          <rect x="98" y="109" width="52" height="5" rx="2.5" fill="#CBD5E1" />
          <rect x="104" y="119" width="40" height="4" rx="2" fill="#E2E8F0" />
          <rect x="108" y="128" width="32" height="3.5" rx="1.75" fill="#E2E8F0" />
        </g>

        {/* Animated Scanning Magnifying Glass */}
        <motion.g
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [0, 5, -3, 0],
                  y: [0, -3, 2, 0],
                }
          }
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Handle */}
          <path d="M141 94L161 114" stroke="#475569" strokeWidth="7.5" strokeLinecap="round" />
          <path d="M141 94L161 114" stroke="#1E293B" strokeWidth="5.2" strokeLinecap="round" />
          {/* Bezel Ring */}
          <circle cx="124" cy="79" r="24" fill="url(#wbLensGlass)" stroke="#64748B" strokeWidth="4.2" />
          <circle cx="124" cy="79" r="21.5" stroke="#E2E8F0" strokeWidth="1.2" />
          {/* Specular Reflection Arc */}
          <path d="M110 68a16 16 0 0 1 12-5" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeOpacity="0.85" />
        </motion.g>
      </svg>

      {/* Floating Scheduling Calendar Widget Top-Right */}
      <motion.div
        className="wb-pain2-calendar-badge"
        animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="46" height="46" viewBox="0 0 50 50" fill="none">
          <rect x="4" y="8" width="42" height="38" rx="8" fill="#FFFFFF" stroke="#FECDD3" strokeWidth="1.3" />
          <path d="M4 16C4 11.58 7.58 8 12 8H38C42.42 8 46 11.58 46 16V18.5H4V16Z" fill="#EF4444" />
          <rect x="14" y="4" width="3.5" height="8" rx="1.75" fill="#94A3B8" />
          <rect x="32.5" y="4" width="3.5" height="8" rx="1.75" fill="#94A3B8" />
          {/* Grid Dates */}
          <rect x="10.5" y="23.5" width="7" height="6" rx="1.5" fill="#E2E8F0" />
          <rect x="21.5" y="23.5" width="7" height="6" rx="1.5" fill="#FCA5A5" />
          <rect x="32.5" y="23.5" width="7" height="6" rx="1.5" fill="#E2E8F0" />
          <rect x="10.5" y="33" width="7" height="6" rx="1.5" fill="#FECACA" />
          <rect x="21.5" y="33" width="7" height="6" rx="1.5" fill="#E2E8F0" />
          <rect x="32.5" y="33" width="7" height="6" rx="1.5" fill="#E2E8F0" />
        </svg>
      </motion.div>
    </div>
  );
}

function IllustrationOpsBottlenecks({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <div className="wb-pain2-illus wb-pain2-illus-ops" aria-hidden="true">
      {/* Upper-right decorative red sparks */}
      <div className="wb-pain2-sparks-ops">
        <MotionSparks reduceMotion={reduceMotion} rotate={-5} />
      </div>

      {/* Browser Task Management Dashboard */}
      <motion.div
        className="wb-pain2-browser-wrap"
        animate={reduceMotion ? undefined : { y: [0, -3.5, 0] }}
        transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 245 148" fill="none" className="wb-pain2-illus-svg">
          {/* Soft floor shadow */}
          <ellipse cx="112" cy="138" rx="88" ry="7" fill="#94A3B8" fillOpacity="0.2" />

          <g transform="rotate(-1.8 112 76)">
            {/* Browser Frame */}
            <rect x="18" y="22" width="184" height="110" rx="10" fill="#FFFFFF" stroke="#C7D2FE" strokeWidth="1.5" />
            {/* Browser Header */}
            <path d="M18 32C18 26.48 22.48 22 28 22H192C197.52 22 202 26.48 202 32V38H18V32Z" fill="#C7D2FE" fillOpacity="0.65" />
            <circle cx="30" cy="30" r="2.6" fill="#818CF8" />
            <circle cx="39" cy="30" r="2.6" fill="#A5B4FC" />
            <circle cx="48" cy="30" r="2.6" fill="#A5B4FC" />

            {/* Checklist Row 1 (Green checked) */}
            <rect x="31" y="47" width="158" height="22" rx="6" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
            <rect x="39" y="51.5" width="13" height="13" rx="3.2" fill="#10B981" />
            <motion.path
              d="M42.2 58.2L44.6 60.5L49 55.5"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={reduceMotion ? undefined : { pathLength: [0.3, 1, 1] }}
              transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 1.5 }}
            />
            <rect x="61" y="53.5" width="84" height="4.2" rx="2.1" fill="#94A3B8" fillOpacity="0.65" />
            <rect x="61" y="60.5" width="54" height="3.2" rx="1.6" fill="#CBD5E1" />

            {/* Checklist Row 2 (Green checked) */}
            <rect x="31" y="73.5" width="158" height="22" rx="6" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
            <rect x="39" y="78" width="13" height="13" rx="3.2" fill="#10B981" />
            <motion.path
              d="M42.2 84.7L44.6 87L49 82"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={reduceMotion ? undefined : { pathLength: [0.3, 1, 1] }}
              transition={{ duration: 2.8, delay: 0.5, repeat: Infinity, repeatDelay: 1.5 }}
            />
            <rect x="61" y="80" width="96" height="4.2" rx="2.1" fill="#94A3B8" fillOpacity="0.65" />
            <rect x="61" y="87" width="64" height="3.2" rx="1.6" fill="#CBD5E1" />

            {/* Checklist Row 3 (Unchecked / stalled) */}
            <rect x="31" y="100" width="158" height="22" rx="6" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
            <rect x="39" y="104.5" width="13" height="13" rx="3.2" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.6" />
            <rect x="61" y="106.5" width="76" height="4.2" rx="2.1" fill="#CBD5E1" />
            <rect x="61" y="113.5" width="44" height="3.2" rx="1.6" fill="#E2E8F0" />
          </g>

          {/* Animated Cursor Pointer */}
          <motion.g
            animate={
              reduceMotion
                ? undefined
                : {
                    x: [0, 3, 0],
                    y: [0, -3, 0],
                  }
            }
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <path
              d="M141 112L147.5 135.5L152.8 128.6L161 131.5L141 112Z"
              fill="#3F477A"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </motion.g>
        </svg>
      </motion.div>

      {/* Floating Hourglass Lower-Right */}
      <div className="wb-pain2-hourglass-pos-ops">
        <HourglassBadge reduceMotion={reduceMotion} />
      </div>
    </div>
  );
}

function IlluminatedLightbulb() {
  return (
    <svg width="34" height="34" viewBox="0 0 36 36" fill="none" aria-hidden="true" className="wb-pain2-bulb-svg">
      <defs>
        <radialGradient id="wbBulbGlow" cx="50%" cy="44%" r="50%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="65%" stopColor="#FACC15" />
          <stop offset="100%" stopColor="#F59E0B" />
        </radialGradient>
      </defs>
      {/* Radiating yellow light rays */}
      <path d="M18 3V6.5" stroke="#FBBF24" strokeWidth="2.1" strokeLinecap="round" />
      <path d="M7.5 7.5L10 10" stroke="#FBBF24" strokeWidth="2.1" strokeLinecap="round" />
      <path d="M28.5 7.5L26 10" stroke="#FBBF24" strokeWidth="2.1" strokeLinecap="round" />
      <path d="M3.5 16.5H7" stroke="#FBBF24" strokeWidth="2.1" strokeLinecap="round" />
      <path d="M29 16.5H32.5" stroke="#FBBF24" strokeWidth="2.1" strokeLinecap="round" />
      <path d="M7.2 24.5L9.8 22.3" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
      <path d="M28.8 24.5L26.2 22.3" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />

      {/* Glass Bulb */}
      <path
        d="M11 16.2C11 12.2 14.1 9 18 9C21.9 9 25 12.2 25 16.2C25 18.8 23.7 20.6 22.4 22.2C21.7 23.1 21.3 24 21.1 25H14.9C14.7 24 14.3 23.1 13.6 22.2C12.3 20.6 11 18.8 11 16.2Z"
        fill="url(#wbBulbGlow)"
        stroke="#D97706"
        strokeWidth="1.2"
      />
      {/* Highlight */}
      <path d="M14.2 14.5C14.7 12.8 16 11.8 17.5 11.6" stroke="#FEF9C3" strokeWidth="1.6" strokeLinecap="round" />
      {/* Filament */}
      <path d="M16 20.5L17 17.5L19 17.5L20 20.5" stroke="#B45309" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Metallic Screw Base */}
      <rect x="14.5" y="25" width="7" height="2.4" rx="1" fill="#94A3B8" />
      <rect x="15" y="27.8" width="6" height="2.2" rx="1" fill="#64748B" />
      <path d="M16.2 30.2H19.8L19 31.8C18.8 32.1 17.2 32.1 17 31.8L16.2 30.2Z" fill="#475569" />
    </svg>
  );
}

const PAIN_CARDS = [
  {
    id: "delayed-lead-response",
    title: "Delayed Lead Response",
    description:
      "New leads sit idle while staff handles other tasks. By the time someone calls back, interest has cooled.",
    Icon: DelayedLeadIcon,
    renderIllustration: (reduceMotion: boolean | null) => (
      <IllustrationDelayedLeads reduceMotion={reduceMotion} />
    ),
  },
  {
    id: "disconnected-tools",
    title: "Disconnected Tools",
    description:
      "Information is scattered across CRM, WhatsApp, forms, and sheets, forcing endless manual copy-pasting.",
    Icon: DisconnectedToolsIcon,
    renderIllustration: (reduceMotion: boolean | null) => (
      <IllustrationDisconnectedTools reduceMotion={reduceMotion} />
    ),
  },
  {
    id: "repetitive-hiring-admin",
    title: "Repetitive Hiring Admin",
    description:
      "Recruiters spend hours sorting resumes, scheduling calls, and sending updates instead of evaluating key talent.",
    Icon: HiringAdminIcon,
    renderIllustration: (reduceMotion: boolean | null) => (
      <IllustrationHiringAdmin reduceMotion={reduceMotion} />
    ),
  },
  {
    id: "manual-ops-bottlenecks",
    title: "Manual Ops Bottlenecks",
    description:
      "Internal requests, task handovers, and daily reporting stall across tools when teams rely on manual follow-ups.",
    Icon: OpsBottlenecksIcon,
    renderIllustration: (reduceMotion: boolean | null) => (
      <IllustrationOpsBottlenecks reduceMotion={reduceMotion} />
    ),
  },
] as const;

export function BusinessPainPointsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="wb-section-pain-points"
      id="pain-points"
      aria-labelledby="wb-pain-points-heading"
    >
      {/* Subtle ambient background glows & clean light texture */}
      <div className="wb-pain2-bg-ambient" aria-hidden="true" />
      <div className="wb-pain2-bg-texture" aria-hidden="true" />

      <div className="wb-pain2-container">
        {/* Section Header (Left-aligned matching reference) */}
        <header className="wb-pain2-header">
          <div className="wb-pain2-eyebrow-pill">
            <EyebrowWarningIcon />
            <span>IS YOUR BUSINESS SUFFERING FROM THIS?</span>
          </div>

          <h2 id="wb-pain-points-heading" className="wb-pain2-title">
            Where Business{" "}
            <span className="wb-pain2-title-highlight">
              Time &amp; Profits
              <svg
                viewBox="0 0 260 14"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
                className="wb-pain2-title-underline"
              >
                <defs>
                  <linearGradient id="wbPain2UnderlineGrad" x1="0" y1="0" x2="260" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FDA4AF" />
                    <stop offset="100%" stopColor="#FB7185" />
                  </linearGradient>
                </defs>
                <path
                  d="M3 9.5C68 3.5 186 2.5 257 8.5"
                  stroke="url(#wbPain2UnderlineGrad)"
                  strokeWidth="5.2"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            Get Lost Every Day
            <span className="wb-pain2-heading-sparks" aria-hidden="true">
              <MotionSparks reduceMotion={reduceMotion} rotate={-6} />
            </span>
          </h2>

          <p className="wb-pain2-subtitle">
            Your team is always busy, but routine daily patterns are slowing down your growth:
          </p>
        </header>

        {/* Four Equal Problem Cards */}
        <div className="wb-pain2-grid">
          {PAIN_CARDS.map(({ id, title, description, Icon, renderIllustration }) => (
            <article key={id} className="wb-pain2-card">
              <div className="wb-pain2-card-top">
                <div className="wb-pain2-card-icon-box" aria-hidden="true">
                  <Icon />
                </div>
                <h3 className="wb-pain2-card-title">{title}</h3>
                <p className="wb-pain2-card-desc">{description}</p>
              </div>

              <div className="wb-pain2-card-media">
                {renderIllustration(reduceMotion)}
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Conclusion Banner */}
        <div className="wb-pain2-banner">
          <div className="wb-pain2-banner-icon">
            <IlluminatedLightbulb />
          </div>
          <p className="wb-pain2-banner-text">
            <strong className="wb-pain2-banner-strong">
              That&apos;s not a people problem. That&apos;s a system problem.
            </strong>{" "}
            <span className="wb-pain2-banner-regular">
              This masterclass shows you how to fix it.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

