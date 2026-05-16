"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useMobile } from "@/lib/hooks";

const C = {
  bgCard: "var(--color-bg-card)",
  border: "var(--color-border)",
  txtBright: "var(--color-text-bright)",
  txtBody: "var(--color-text-body)",
  blueMid: "var(--color-blue-mid)",
  green: "var(--color-green)",
};

const F = {
  inter: "var(--font-inter), Inter, sans-serif",
  serif: "var(--font-instrument), 'Instrument Serif', Georgia, serif",
};

export const reviewsData = [
  {
    name: "Vinay Kumar",
    title: "Managing Director at LOTUS MANOR REAL ESTATE L.L.C, DUBAI.",
    quote: "“We needed an AI agent that wouldn't embarrass us in front of investors. Scalepods delivered it — and made the process easy. They were quick to respond, quick to iterate, and treated our launch deadline like their own. The kind of partner you want when the work has to be right and the timeline is tight.”",
    image: "/reviews/Vinay Kumar.webp"
  },
  {
    name: "Anuj Ruia",
    title: "Co-Founder at BECO",
    quote: "“Truly impressive. The AI assistant is fast, accurate, and blends into our daily ops without friction.”",
    image: "/reviews/Anuj Ruia.jpeg"
  },
  {
    name: "Tejesh Lohiya",
    title: "Analytics Manager at Orchestra",
    quote: "“Huge time-saver. Data is better organized. The insights we get now are actionable and fast.”",
    image: "/reviews/Tejesh Lohiya.jpeg"
  },
  {
    name: "Sharan Lekhi",
    title: "Founder at Krafty Animations",
    quote: "“Game-changer. Automation flows run flawlessly. Our team now focuses only on what really matters.”",
    image: "/reviews/Sharan Lekhi.jpeg"
  },
  {
    name: "Shreyansh Jaiswal",
    title: "Founder at HobbyFi",
    quote: "“Smooth setup. Their system replaced three tools. We saw improvements in just the first week.”",
    image: "/reviews/Shreyansh Jaiswal.avif"
  },
  {
    name: "Dhairya Shah",
    title: "Partner & CEO at Break The Code",
    quote: "“Very intuitive. No fluff, just performance. Our internal processes finally feel under control.”",
    image: "/reviews/Dhairya Shah.avif"
  }
];

export default function TestimonialCarousel() {
  const [active, setActive] = useState(0);
  const isMobile = useMobile(768);
  const { resolvedTheme } = useTheme();

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % reviewsData.length);
  }, []);

  const prev = useCallback(() => {
    setActive((prev) => (prev - 1 + reviewsData.length) % reviewsData.length);
  }, []);

  // Autoplay
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    if (offset.x > 50) {
      prev();
    } else if (offset.x < -50) {
      next();
    }
  };

  const getCardStyles = (index: number) => {
    const total = reviewsData.length;
    let diff = (index - active) % total;
    if (diff < -Math.floor(total / 2)) diff += total;
    if (diff > Math.floor(total / 2)) diff -= total;

    const isCenter = diff === 0;
    const isLeft = diff === -1;
    const isRight = diff === 1;

    let x = 0;
    let scale = 1;
    let opacity = 1;
    let zIndex = total - Math.abs(diff);
    let filter = "none";
    let pointerEvents: "auto" | "none" = "none";

    const xOffset = isMobile ? 60 : 320; // responsive spacing

    if (isCenter) {
      x = 0;
      scale = 1;
      opacity = 1;
      filter = "grayscale(0) brightness(1) blur(0px)";
      pointerEvents = "auto";
    } else if (isLeft) {
      x = -xOffset;
      scale = 0.85;
      opacity = 0.6;
      filter = "grayscale(1) brightness(0.8) blur(3px)";
    } else if (isRight) {
      x = xOffset;
      scale = 0.85;
      opacity = 0.6;
      filter = "grayscale(1) brightness(0.8) blur(3px)";
    } else {
      // Hidden behind
      x = diff < 0 ? -xOffset * 1.5 : xOffset * 1.5;
      scale = 0.7;
      opacity = 0;
      filter = "grayscale(1) blur(6px)";
    }

    return { x, scale, opacity, zIndex, filter, pointerEvents, isCenter };
  };

  return (
    <div className="relative w-full max-w-full overflow-hidden flex flex-col items-center justify-center py-4">
      <div className="relative flex justify-center items-center w-full min-h-[380px]" style={{ perspective: 1000 }}>
        <AnimatePresence initial={false}>
          {reviewsData.map((review, i) => {
            const { x, scale, opacity, zIndex, filter, pointerEvents, isCenter } = getCardStyles(i);

            return (
              <motion.div
                key={i}
                initial={false}
                animate={{
                  x,
                  scale,
                  opacity,
                  zIndex,
                  filter,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.32, 0.72, 0, 1], // cinematic smooth ease
                }}
                drag={isCenter ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                onClick={() => {
                  if (!isCenter) {
                    if (x < 0) prev();
                    else next();
                  }
                }}
                style={{
                  position: "absolute",
                  pointerEvents: pointerEvents as any,
                  cursor: isCenter ? "grab" : "pointer",
                  width: "100%",
                  maxWidth: "500px",
                  // Card base style
                  background: C.bgCard,
                  border: `1.5px solid ${C.border}`,
                  borderRadius: "28px",
                  padding: "32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                  minHeight: "340px",
                  // Highlight logic
                  boxShadow: isCenter && resolvedTheme === 'dark'
                    ? "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(132, 204, 22, 0.12)"
                    : isCenter && resolvedTheme === 'light'
                    ? "0 20px 40px rgba(0,0,0,0.08)"
                    : "0 10px 30px rgba(0,0,0,0.05)",
                  borderColor: isCenter 
                    ? `rgba(132, 204, 22, ${resolvedTheme === 'dark' ? '0.3' : '0.15'})` 
                    : C.border,
                }}
                className="transform-gpu"
              >
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ position: "relative", width: "56px", height: "56px", borderRadius: "14px", overflow: "hidden", border: `1px solid ${C.border}`, flexShrink: 0 }}>
                    <Image src={review.image} alt={review.name} fill className="object-cover" sizes="56px" />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontFamily: F.inter, fontSize: "17px", fontWeight: 700, color: C.blueMid }}>{review.name}</span>
                    <span style={{ fontFamily: F.inter, fontSize: "13px", color: C.green, marginTop: "2px", fontWeight: 500 }}>{review.title}</span>
                  </div>
                </div>

                <div style={{ width: "100%", height: "1px", background: "var(--color-border)" }} />

                <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
                  <p style={{
                    fontFamily: F.inter, fontSize: "15px", color: C.txtBody, lineHeight: 1.7, margin: 0,
                    fontWeight: 450,
                    // Equal height strategy: Line clamp for extreme cases, but generally min-height and flex-1 handles it
                    display: "-webkit-box",
                    WebkitLineClamp: 7,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }}>
                    {review.quote}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Pagination dots */}
      <div className="flex gap-3 mt-8">
        {reviewsData.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="transition-all duration-300 rounded-full"
            style={{
              width: active === i ? "24px" : "8px",
              height: "8px",
              background: active === i ? C.blueMid : "var(--color-border)",
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
