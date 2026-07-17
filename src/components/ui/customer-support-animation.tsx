"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/providers/ThemeProvider";

interface CustomerSupportAnimationProps {
  hoveredIndex?: number | null;
}

export function CustomerSupportAnimation({ hoveredIndex = null }: CustomerSupportAnimationProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [playerLoaded, setPlayerLoaded] = useState(false);

  useEffect(() => {
    // Check if lottie-player custom element is already registered
    if (typeof window !== "undefined" && customElements.get("lottie-player")) {
      setPlayerLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";
    script.async = true;
    script.onload = () => setPlayerLoaded(true);
    document.body.appendChild(script);
  }, []);

  const animations: Record<string | number, { type: "svg" | "lottie"; src: string; scale?: number }> = {
    default: { type: "lottie", src: "https://lottie.host/c34edb8c-83c6-4d64-8e47-2d541dc969af/DZ8azFqR30.json" },
    0: { type: "svg", src: "/images/fast-delivery.svg", scale: 1.5 },
    1: { type: "svg", src: "/images/man-robot-workplace.svg", scale: 1.25 },
    2: { type: "svg", src: "/images/banner-marketing.svg", scale: 1.25 },
    3: { type: "lottie", src: "https://lottie.host/57d945a6-6705-4ada-af6b-a6ee386b9147/3Zju6P95C3.json" },
    4: { type: "lottie", src: "https://lottie.host/a5c45100-adae-407e-8828-c3e1611e851a/b5AREs1rw6.json" },
  };

  const currentAnim = hoveredIndex !== null && animations[hoveredIndex] 
    ? animations[hoveredIndex] 
    : animations.default;

  const getGlowColor = () => {
    if (hoveredIndex === null) {
      return isDark
        ? "radial-gradient(circle at 50% 50%, rgba(109, 182, 255, 0.22) 0%, rgba(177, 217, 151, 0.16) 50%, transparent 80%)"
        : "radial-gradient(circle at 50% 50%, rgba(177, 217, 151, 0.3) 0%, rgba(109, 182, 255, 0.2) 50%, transparent 80%)";
    }
    const color = [0, 2, 4].includes(hoveredIndex) ? "#B1D997" : "#6DB6FF";
    return isDark
      ? `radial-gradient(circle at 50% 50%, ${color}30 0%, ${color}10 50%, transparent 80%)`
      : `radial-gradient(circle at 50% 50%, ${color}45 0%, ${color}15 50%, transparent 80%)`;
  };

  return (
    <div className="relative w-full max-w-lg mx-auto aspect-[4/3] flex items-center justify-center p-2 my-2 overflow-visible">
      {/* Ambient Radial Brand Glows */}
      <motion.div
        key={`glow-${hoveredIndex}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 rounded-3xl pointer-events-none z-0"
        style={{
          background: getGlowColor(),
          filter: "blur(45px)"
        }}
      />

      {/* Theme-Adaptive Glass Card Container */}
      <div
        className="relative z-10 w-full h-full rounded-2xl flex items-center justify-center p-4 transition-all duration-300 overflow-hidden"
        style={{
          background: isDark
            ? "linear-gradient(135deg, rgba(13, 20, 36, 0.75) 0%, rgba(8, 13, 28, 0.85) 100%)"
            : "linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(245, 247, 250, 0.9) 100%)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: isDark
            ? `1px solid ${hoveredIndex !== null ? ([0, 2, 4].includes(hoveredIndex) ? "rgba(177, 217, 151, 0.35)" : "rgba(109, 182, 255, 0.35)") : "rgba(109, 182, 255, 0.2)"}`
            : `1px solid ${hoveredIndex !== null ? ([0, 2, 4].includes(hoveredIndex) ? "rgba(177, 217, 151, 0.45)" : "rgba(109, 182, 255, 0.45)") : "rgba(0, 0, 0, 0.08)"}`,
          boxShadow: isDark
            ? "0 20px 40px -15px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)"
            : "0 20px 40px -15px rgba(0, 0, 0, 0.06)"
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentAnim.src}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="w-full h-full flex items-center justify-center"
          >
            {currentAnim.type === "svg" ? (
              <img 
                src={currentAnim.src} 
                alt="Focus Illustration" 
                className="w-full h-full object-contain p-2 transition-transform duration-300" 
                style={{
                  filter: isDark ? "contrast(1.05) brightness(1.05)" : "none",
                  transform: currentAnim.scale ? `scale(${currentAnim.scale})` : "none",
                  transformOrigin: "center"
                }}
              />
            ) : playerLoaded ? (
              /* Standard Web Component for Native Transparent SVG Rendering */
              React.createElement("lottie-player", {
                src: currentAnim.src,
                background: "transparent",
                speed: "1",
                style: {
                  width: "100%",
                  height: "100%",
                  filter: isDark ? "contrast(1.08) brightness(1.05)" : "none"
                },
                loop: true,
                autoplay: true
              })
            ) : (
              /* Seamless Blend Iframe Fallback during initial script load */
              <iframe
                src={currentAnim.src.replace("https://lottie.host/", "https://lottie.host/embed/")}
                className="w-full h-full border-0 pointer-events-none rounded-xl"
                style={{
                  background: "transparent",
                  mixBlendMode: isDark ? "screen" : "multiply",
                  filter: isDark ? "brightness(1.1) contrast(1.1)" : "none"
                }}
                title="Focus Animation Lottie"
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
