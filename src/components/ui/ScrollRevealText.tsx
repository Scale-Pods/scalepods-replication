"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface WordToken {
  text: string;
  italic?: boolean;
  accentColor?: string;
}

interface ScrollRevealTextProps {
  words: WordToken[];
  fontFamily?: string;
  fontSize?: string;
  color?: string;
  italicFontFamily?: string;
  lineHeight?: number;
}

export default function ScrollRevealText({
  words,
  fontFamily = "var(--font-inter), Inter, sans-serif",
  fontSize = "clamp(20px, 3.2vw, 40px)",
  color = "#8E95A3",
  italicFontFamily = "var(--font-instrument), 'Instrument Serif', Georgia, serif",
  lineHeight = 1.45,
}: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Starts the moment the section enters the bottom of the viewport.
  // Fully complete (all words clear) by the time 40% of the section
  // has scrolled past — so the user sees clear text almost immediately.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 1.0", "center 0.6"],
  });

  const total = words.length;

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <h2
        style={{
          fontFamily,
          fontSize,
          fontWeight: 400,
          lineHeight,
          letterSpacing: "-0.01em",
          width: "100%",
          textAlign: "center",
          margin: 0,
        }}
      >
        {words.map((word, i) => (
          <RevealWord
            key={i}
            word={word}
            index={i}
            total={total}
            scrollYProgress={scrollYProgress}
            defaultColor={color}
            italicFontFamily={italicFontFamily}
          />
        ))}
      </h2>
    </div>
  );
}

function RevealWord({
  word,
  index,
  total,
  scrollYProgress,
  defaultColor,
  italicFontFamily,
}: {
  word: WordToken;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  defaultColor: string;
  italicFontFamily: string;
}) {
  // Each word spans a small window but with a 2× lookahead overlap
  // so neighbouring words are already beginning to reveal — giving
  // a silky continuous cascade rather than word-by-word pops.
  const slotSize = 1 / total;
  const wordStart = index * slotSize * 0.85;           // start slightly earlier
  const wordEnd   = Math.min(1, wordStart + slotSize * 2.2); // wide lookahead

  // Very light blur (2px max) and quick opacity — transition feels
  // instantaneous but still has the "dissolve" quality.
  const opacity = useTransform(scrollYProgress, [wordStart, wordEnd], [0.05, 1]);
  const blurPx  = useTransform(scrollYProgress, [wordStart, wordEnd], [2.5, 0]);
  const filter  = useTransform(blurPx, (v: number) => `blur(${v.toFixed(2)}px)`);

  const resolvedColor = word.accentColor ?? defaultColor;

  return (
    <>
      <motion.span
        style={{
          opacity,
          filter,
          color: resolvedColor,
          fontFamily: word.italic ? italicFontFamily : undefined,
          fontStyle: word.italic ? "italic" : undefined,
          display: "inline-block",
          willChange: "opacity, filter",
          backfaceVisibility: "hidden",
        }}
      >
        {word.text}
      </motion.span>
      {" "}
    </>
  );
}
