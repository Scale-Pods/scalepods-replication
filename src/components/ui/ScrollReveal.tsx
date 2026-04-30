"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  /** Delay within the animation window (0–1 fraction of word slots) */
  delay?: number;
  /** Extra inline style on the wrapper div */
  style?: React.CSSProperties;
  className?: string;
}

/**
 * ScrollReveal
 * ─────────────
 * A lightweight wrapper that animates any child element from
 * dim+blurred → bright+clear as it scrolls into the viewport.
 *
 * Usage:
 *   <ScrollReveal><H2 ... /></ScrollReveal>
 *   <ScrollReveal delay={0.1}><p>...</p></ScrollReveal>
 */
export default function ScrollReveal({
  children,
  delay = 0,
  style,
  className,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    // Start the moment the element enters the bottom of the viewport,
    // finish well before it reaches centre — very early reveal.
    offset: ["start 1.0", "center 0.7"],
  });

  // Add delay by offsetting the input range
  const start = delay;
  const end = Math.min(1, delay + 0.9);

  const opacity = useTransform(scrollYProgress, [start, end], [0.05, 1]);
  const blurPx  = useTransform(scrollYProgress, [start, end], [6, 0]);
  const filter  = useTransform(blurPx, (v: number) => `blur(${v.toFixed(2)}px)`);
  const y       = useTransform(scrollYProgress, [start, end], [16, 0]);

  return (
    <motion.div
      ref={ref}
      style={{
        opacity,
        filter,
        y,
        willChange: "opacity, filter, transform",
        backfaceVisibility: "hidden",
        ...style,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
