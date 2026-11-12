"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";

interface HeroMetricCardProps {
  index: number;
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
  glowGradient: string;
  shadowRgba: string;
}

/**
 * Animated first-fold metric card with one-shot viewport count-up,
 * staggered entrance, animated top accent bar, and hover glow.
 */
export function HeroMetricCard({
  index,
  target,
  prefix = "",
  suffix = "",
  label,
  glowGradient,
  shadowRgba,
}: HeroMetricCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.25 });
  const reduceMotion = useReducedMotion() ?? false;
  const [displayValue, setDisplayValue] = useState(target);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimatedRef.current || reduceMotion || target === 0) return;
    hasAnimatedRef.current = true;

    const controls = animate(0, target, {
      duration: 0.8,
      delay: 0.1 + index * 0.04,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
      onComplete: () => setDisplayValue(target),
    });

    return () => controls.stop();
  }, [isInView, reduceMotion, target, index]);

  return (
    <motion.div
      ref={cardRef}
      className="wb-firstfold-stat-card"
      style={{
        ["--stat-glow-color" as string]: glowGradient,
        ["--stat-color" as string]: "#090D14",
        ["--stat-shadow" as string]: shadowRgba,
      }}
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay: reduceMotion ? 0 : 0.14 + index * 0.055,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={reduceMotion ? undefined : { y: -3 }}
    >
      <motion.span
        className="wb-firstfold-stat-topbar"
        aria-hidden="true"
        initial={reduceMotion ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          duration: 0.55,
          delay: reduceMotion ? 0 : 0.22 + index * 0.06,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
      <span className="wb-firstfold-stat-val">
        {prefix}
        {displayValue}
        {suffix}
      </span>
      <span className="wb-firstfold-stat-lbl">{label}</span>
    </motion.div>
  );
}
