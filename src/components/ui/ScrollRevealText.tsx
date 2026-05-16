"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface Word {
  text: string;
  italic?: boolean;
  accentColor?: string;
  newLine?: boolean;
}

interface ScrollRevealTextProps {
  words?: Word[];
  text?: string;
  className?: string;
  fontFamily?: string;
  fontSize?: string;
  color?: string;
  italicFontFamily?: string;
  lineHeight?: number | string;
}

export const ScrollRevealParagraph = ({ 
  text, 
  words,
  className, 
  fontFamily, 
  fontSize, 
  color, 
  italicFontFamily, 
  lineHeight 
}: ScrollRevealTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.6"],
  });

  const items: Word[] = words || (text ? text.split(" ").map(w => ({ text: w })) : []);

  return (
    <div 
      ref={containerRef}
      data-framer-scroll-target
      className={cn("relative flex flex-wrap gap-x-1.5", className)}
      style={{
        position: "relative",
        fontFamily,
        fontSize,
        color,
        lineHeight
      }}
    >
      {items.map((word, i) => {
        const start = i / items.length;
        const end = start + 1 / items.length;
        const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
        const blur = useTransform(scrollYProgress, [start, end], ["blur(12px)", "blur(0px)"]);

        return (
          <React.Fragment key={i}>
            {word.newLine && <div className="w-full h-0" />}
            <motion.span
              style={{ 
                opacity,
                filter: blur,
                fontFamily: word.italic ? italicFontFamily : undefined,
                fontStyle: word.italic ? "italic" : undefined,
                color: word.accentColor || undefined,
              }}
              className="inline-block"
            >
              {word.text}
            </motion.span>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ScrollRevealParagraph;
