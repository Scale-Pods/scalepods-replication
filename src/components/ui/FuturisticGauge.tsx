"use client";

import React, { useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";

interface FuturisticGaugeProps {
  /** Initial angle in degrees (0 = left, 90 = top, 180 = right) */
  initialAngle?: number;
  /** Maximum oscillation angle in degrees */
  targetAngle?: number;
  className?: string;
  isHovered?: boolean;
}

/**
 * A premium, futuristic dark-mode gauge component.
 * Built with SVG and Framer Motion for high-fidelity dashboard UI.
 * 
 * Features:
 * - Spring-physics driven needle
 * - Continuous hover oscillation (25° - 75°)
 * - Modernist dark navy/black aesthetic
 * - Soft inner glow and rounded needle
 */
export default function FuturisticGauge({
  initialAngle = 25,
  targetAngle = 75,
  className = "",
  isHovered = false,
}: FuturisticGaugeProps) {
  const controls = useAnimationControls();

  // Mapping 0-180 (left-to-right) to SVG rotation degrees (-90 to 90)
  // Our pivot is at 100, 110. SVG rotation 0 is "vertical up".
  const angleToRotation = (angle: number) => -90 + angle;

  const startRotation = angleToRotation(initialAngle);
  const endRotation = angleToRotation(targetAngle);

  // Handle entry animation
  useEffect(() => {
    controls.set({ rotate: startRotation });
  }, [controls, startRotation]);

  useEffect(() => {
    if (isHovered) {
      handleMouseEnter();
    } else {
      handleMouseLeave();
    }
  }, [isHovered]);

  const handleMouseEnter = () => {
    controls.start({
      rotate: [startRotation, endRotation, startRotation],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    });
  };

  const handleMouseLeave = () => {
    controls.start({
      rotate: startRotation,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12,
        mass: 1,
      },
    });
  };

  return (
    <div 
      className={`relative flex items-center justify-center select-none ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <svg
        viewBox="0 0 200 125"
        className="w-full h-auto max-w-[380px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle glow for the arc track */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Inner ambient glow */}
          <radialGradient id="arcGlow" cx="50%" cy="100%" r="100%">
            <stop offset="0%" stopColor="rgba(var(--color-blue-mid-rgb), 0.08)" />
            <stop offset="80%" stopColor="transparent" />
          </radialGradient>

          {/* Needle Gradient: Dark Metallic */}
          <linearGradient id="needleBodyGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-bg-card-alt)" />
            <stop offset="50%" stopColor="var(--color-border)" />
            <stop offset="100%" stopColor="var(--color-bg-card-alt)" />
          </linearGradient>

          {/* Glowing Tip Gradient */}
          <radialGradient id="tipGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-blue-mid)" />
            <stop offset="100%" stopColor="rgba(var(--color-blue-mid-rgb), 0)" />
          </radialGradient>
        </defs>

        {/* Soft Background Arc Glow */}
        <path
          d="M 20 110 A 80 80 0 0 1 180 110"
          fill="url(#arcGlow)"
          className="opacity-40"
        />

        {/* Minimalist Arc Track */}
        <path
          d="M 20 110 A 80 80 0 0 1 180 110"
          fill="none"
          stroke="rgba(255, 255, 255, 0.04)"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* Subtle Tick Marks (Optional, for that precision feel) */}
        {[25, 50, 75, 100, 125, 155].map((angle) => {
          const rad = (angle - 180) * (Math.PI / 180);
          const r1 = 76;
          const r2 = 82;
          const x1 = (100 + r1 * Math.cos(rad)).toFixed(3);
          const y1 = (110 + r1 * Math.sin(rad)).toFixed(3);
          const x2 = (100 + r2 * Math.cos(rad)).toFixed(3);
          const y2 = (110 + r2 * Math.sin(rad)).toFixed(3);
          return (
            <line 
              key={angle}
              x1={x1} y1={y1} x2={x2} y2={y2} 
              stroke="rgba(255,255,255,0.08)" 
              strokeWidth="0.5" 
            />
          );
        })}

        {/* Needle Group */}
        <motion.g
          animate={controls}
          style={{ transformOrigin: "100px 110px" }}
        >
          {/* Needle Shadow */}
          <rect
            x="98"
            y="35"
            width="4"
            height="75"
            rx="2"
            fill="rgba(0,0,0,0.4)"
            filter="blur(2px)"
            transform="translate(2, 2)"
          />

          {/* Needle Body */}
          <rect
            x="98"
            y="35"
            width="4"
            height="75"
            rx="2"
            fill="url(#needleBodyGrad)"
          />

          {/* Needle Tip Accent (The "Premium" Dot) */}
          <circle cx="100" cy="38" r="1.5" fill="var(--color-blue-mid)" filter="url(#glow)" />
          
          {/* Subtle Connector line */}
          <line x1="100" y1="38" x2="100" y2="45" stroke="var(--color-blue-mid)" strokeWidth="0.5" opacity="0.3" />
        </motion.g>

        {/* Center Pivot Assembly */}
        {/* Outer Ring */}
        <circle 
          cx="100" cy="110" r="7" 
          fill="var(--color-bg-page)" 
          stroke="rgba(255,255,255,0.05)" 
          strokeWidth="0.5" 
        />
        {/* Inner Hub */}
        <circle 
          cx="100" cy="110" r="3.5" 
          fill="var(--color-bg-card-alt)" 
          stroke="rgba(255,255,255,0.1)" 
          strokeWidth="0.5" 
        />
        {/* Glowing Center Core */}
        <circle cx="100" cy="110" r="1" fill="var(--color-blue-mid)" filter="url(#glow)" />
      </svg>
    </div>
  );
}
