"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/providers/ThemeProvider";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

interface CoreValue {
  id: string;
  title: string;
  hashtag: string;
  description: string;
  color: string;
}

const coreValues: CoreValue[] = [
  {
    id: "customer-first",
    title: "Customer First",
    hashtag: "#CUSTOMERFIRST",
    description: "We align every decision and line of code around client success and measurable ROI.",
    color: "#B1D997"
  },
  {
    id: "build-purpose",
    title: "Build with Purpose",
    hashtag: "#BUILDWITHPURPOSE",
    description: "We create deliberate, future-proof automation instead of deploying technology for its own sake.",
    color: "#6DB6FF"
  },
  {
    id: "move-fast",
    title: "Move Fast, Think Long-Term",
    hashtag: "#MOVEFAST",
    description: "We deliver rapid, incremental value while building robust systems engineered to scale indefinitely.",
    color: "#B1D997"
  },
  {
    id: "own-outcome",
    title: "Own the Outcome",
    hashtag: "#OWNTHEOUTCOME",
    description: "We take full end-to-end accountability for project delivery, integration, and operational success.",
    color: "#6DB6FF"
  },
  {
    id: "no-fluff",
    title: "No Fluff, Just Results",
    hashtag: "#NOFLUFF",
    description: "We cut out buzzwords, bloated scopes, and shelfware to focus purely on business outcomes.",
    color: "#B1D997"
  },
  {
    id: "automate-boring",
    title: "Automate the Boring Stuff",
    hashtag: "#AUTOMATEIT",
    description: "We eliminate repetitive tasks so teams can redirect their energy toward high-value strategy and judgment.",
    color: "#6DB6FF"
  },
  {
    id: "simplicity-wins",
    title: "Simplicity Wins",
    hashtag: "#KEEPITSIMPLE",
    description: "We distill complex workflows into elegant, reliable, and user-friendly automation systems.",
    color: "#B1D997"
  },
  {
    id: "always-learning",
    title: "Learn Continuously",
    hashtag: "#ALWAYSLEARNING",
    description: "We embrace new technologies and methodologies to keep our clients at the absolute cutting edge.",
    color: "#6DB6FF"
  }
];

export function CoreValuesOrbit() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const [rotationAngle, setRotationAngle] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);

  const animRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Screen size listener
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Continuous smooth circular auto-rotation via requestAnimationFrame
  useEffect(() => {
    if (isPaused || hoveredCard !== null || !isDesktop) {
      lastTimeRef.current = null;
      return;
    }

    const update = (time: number) => {
      if (lastTimeRef.current !== null) {
        const delta = time - lastTimeRef.current;
        // Smooth rotation speed (radians per ms): 2PI radians per ~45 seconds
        setRotationAngle((prev) => (prev + delta * 0.00015) % (Math.PI * 2));
      }
      lastTimeRef.current = time;
      animRef.current = requestAnimationFrame(update);
    };

    animRef.current = requestAnimationFrame(update);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPaused, hoveredCard, isDesktop]);

  const handleNextStep = () => setRotationAngle((prev) => (prev + Math.PI / 4) % (Math.PI * 2));
  const handlePrevStep = () => setRotationAngle((prev) => (prev - Math.PI / 4 + Math.PI * 2) % (Math.PI * 2));

  const activeHoverValue = hoveredCard !== null ? coreValues[hoveredCard] : null;

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-6 my-4">
      {/* DESKTOP CIRCULAR ORBIT FORMAT */}
      {isDesktop ? (
        <div 
          className="relative w-full h-[580px] flex items-center justify-center overflow-visible"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsPaused(false);
            setHoveredCard(null);
          }}
        >
          {/* Subtle Ambient Orbital Path Ring */}
          <div 
            className="absolute rounded-full pointer-events-none transition-colors duration-300"
            style={{
              width: "840px",
              height: "380px",
              border: isDark ? "1.5px dashed rgba(255,255,255,0.06)" : "1.5px dashed rgba(0,0,0,0.08)",
              borderRadius: "50%",
              zIndex: 0
            }}
          />

          {/* CENTER FIXED RECTANGULAR CARD */}
          <div
            className="absolute z-20 w-[300px] h-[160px] rounded-2xl p-5 flex flex-col items-center justify-center text-center shadow-2xl transition-all duration-300 overflow-hidden"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              background: isDark
                ? "linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(8, 13, 28, 0.98) 100%)"
                : "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 247, 250, 0.98) 100%)",
              border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.08)",
              boxShadow: isDark
                ? "0 25px 60px -10px rgba(0,0,0,0.7), 0 0 30px rgba(177, 217, 151, 0.05)"
                : "0 20px 40px -10px rgba(0,0,0,0.08)",
              backdropFilter: "blur(16px)"
            }}
          >
            {/* Soft Glow overlay behind center card */}
            <div
              className="absolute inset-[-10px] pointer-events-none rounded-full transition-opacity duration-500 opacity-20"
              style={{
                background: `radial-gradient(circle, ${activeHoverValue?.color || "#B1D997"}30 0%, transparent 70%)`,
                filter: "blur(20px)"
              }}
            />

            <AnimatePresence mode="wait">
              {activeHoverValue ? (
                /* Dynamic Hover Detail View */
                <motion.div
                  key={activeHoverValue.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10 flex flex-col items-center text-center px-1"
                >
                  <span 
                    style={{ 
                      fontFamily: "var(--font-inter), sans-serif", 
                      fontSize: "9px", 
                      fontWeight: 700, 
                      letterSpacing: "0.2em", 
                      color: activeHoverValue.color, 
                      textTransform: "uppercase", 
                      marginBottom: "4px",
                      background: `${activeHoverValue.color}15`,
                      padding: "2px 8px",
                      borderRadius: "10px",
                      border: `1px solid ${activeHoverValue.color}30`
                    }}
                  >
                    {activeHoverValue.hashtag}
                  </span>
                  <h3 
                    style={{ 
                      fontFamily: "var(--font-inter), sans-serif", 
                      fontSize: "18px", 
                      fontWeight: 800, 
                      color: isDark ? "#ffffff" : "#0f172a",
                      lineHeight: "1.2",
                      marginBottom: "4px"
                    }}
                  >
                    {activeHoverValue.title}
                  </h3>
                  <p 
                    style={{ 
                      fontFamily: "var(--font-inter), sans-serif", 
                      fontSize: "11px", 
                      lineHeight: "1.35",
                      color: isDark ? "rgba(255,255,255,0.7)" : "rgba(15,23,42,0.7)",
                      maxWidth: "250px"
                    }}
                  >
                    {activeHoverValue.description}
                  </p>
                </motion.div>
              ) : (
                /* Default Center "Our Core Values" View */
                <motion.div
                  key="default-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10 flex flex-col items-center text-center"
                >
                  <span 
                    style={{ 
                      fontFamily: "var(--font-inter), sans-serif", 
                      fontSize: "9px", 
                      fontWeight: 700, 
                      letterSpacing: "0.2em", 
                      color: isDark ? "#6DB6FF" : "#2B6CB0", 
                      textTransform: "uppercase", 
                      marginBottom: "6px" 
                    }}
                  >
                    #WHO-WE-ARE
                  </span>
                  <h2 
                    style={{ 
                      fontFamily: "var(--font-inter), sans-serif", 
                      fontSize: "26px", 
                      fontWeight: 800, 
                      textAlign: "center",
                      lineHeight: "1.2",
                      letterSpacing: "-0.02em",
                      backgroundImage: "linear-gradient(135deg, #B1D997 0%, #6DB6FF 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      color: "transparent"
                    }}
                  >
                    Our Core Values
                  </h2>
                  <p
                    className="text-[11px] mt-1.5 font-medium"
                    style={{ color: isDark ? "rgba(255,255,255,0.4)" : "rgba(15,23,42,0.4)" }}
                  >
                    Hover any card to explore
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 8 CIRCULAR ORBITING CARDS */}
          {coreValues.map((val, idx) => {
            const angle = (2 * Math.PI * idx) / 8 + rotationAngle;
            
            // Radii for circular/elliptical orbit
            const Rx = 420;
            const Ry = 190;

            const x = Math.cos(angle) * Rx;
            const y = Math.sin(angle) * Ry;

            const depth = Math.sin(angle); // depth -1 (back) to +1 (front)
            const scale = 0.85 + (depth + 1) * 0.1;
            const opacity = 0.6 + (depth + 1) * 0.2;
            const zIndex = Math.round(15 + depth * 10);
            
            const isHovered = hoveredCard === idx;

            return (
              <div
                key={val.id}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: `translate3d(${x}px, ${y}px, 0) scale(${isHovered ? 1.08 : scale})`,
                  marginLeft: "-115px", // Half card width (230 / 2)
                  marginTop: "-60px",  // Half card height (120 / 2)
                  width: "230px",
                  height: "120px",
                  background: isHovered 
                    ? isDark 
                      ? "rgba(18, 28, 48, 0.95)" 
                      : "rgba(255, 255, 255, 1)"
                    : isDark 
                      ? "rgba(10, 16, 30, 0.85)" 
                      : "rgba(255, 255, 255, 0.9)",
                  padding: "20px 24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "8px",
                  cursor: "pointer",
                  zIndex: isHovered ? 50 : zIndex,
                  opacity: isHovered ? 1 : opacity,
                  borderRadius: "16px",
                  boxShadow: isHovered 
                    ? `0 15px 35px -5px ${val.color}45` 
                    : isDark
                      ? "0 8px 25px rgba(0,0,0,0.4)"
                      : "0 6px 20px rgba(0,0,0,0.04)",
                  border: isHovered 
                    ? `1.5px solid ${val.color}` 
                    : isDark 
                      ? "1px solid rgba(255,255,255,0.06)" 
                      : "1px solid rgba(0,0,0,0.06)",
                  backdropFilter: "blur(12px)",
                  transition: "transform 0.2s ease, background 0.2s ease, border 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease"
                }}
              >
                <span 
                  style={{ 
                    fontFamily: "var(--font-inter), sans-serif", 
                    fontSize: "10px", 
                    fontWeight: 700, 
                    letterSpacing: "0.15em", 
                    color: val.color 
                  }}
                >
                  {val.hashtag}
                </span>

                <h3 
                  style={{ 
                    fontFamily: "var(--font-inter), sans-serif", 
                    fontSize: "18px", 
                    fontWeight: 700, 
                    color: isHovered 
                      ? isDark ? "#ffffff" : "#000000"
                      : "var(--color-text-bright)", 
                    lineHeight: "1.3"
                  }}
                >
                  {val.title}
                </h3>
              </div>
            );
          })}
        </div>
      ) : (
        /* MOBILE CAROUSEL VIEW */
        <div className="w-full flex flex-col items-center px-2">
          <div 
            className="w-full max-w-md rounded-3xl p-6 text-center relative overflow-hidden mb-6"
            style={{
              background: isDark
                ? "linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(8, 13, 28, 0.98) 100%)"
                : "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 247, 250, 0.98) 100%)",
              border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.08)",
              boxShadow: isDark ? "0 20px 40px rgba(0, 0, 0, 0.5)" : "0 15px 30px rgba(0, 0, 0, 0.05)"
            }}
          >
            <span 
              className="text-[11px] font-bold tracking-[0.15em] uppercase mb-3 inline-block"
              style={{ color: coreValues[mobileIndex].color }}
            >
              {coreValues[mobileIndex].hashtag}
            </span>
            <h3 
              className="text-2xl font-bold tracking-tight mb-3"
              style={{ color: isDark ? "#ffffff" : "#0f172a" }}
            >
              {coreValues[mobileIndex].title}
            </h3>
            <p 
              className="text-sm leading-relaxed"
              style={{ color: isDark ? "rgba(255,255,255,0.7)" : "rgba(15,23,42,0.7)" }}
            >
              {coreValues[mobileIndex].description}
            </p>
          </div>

          <div className="flex items-center gap-6 justify-center w-full">
            <button
              onClick={() => setMobileIndex((prev) => (prev - 1 + 8) % 8)}
              className="p-3 rounded-full border cursor-pointer transition-colors"
              style={{
                borderColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)",
                color: isDark ? "#ffffff" : "#0f172a"
              }}
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex items-center gap-2">
              {coreValues.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setMobileIndex(idx)}
                  className="w-2.5 h-2.5 rounded-full transition-all cursor-pointer"
                  style={{
                    background: mobileIndex === idx 
                      ? coreValues[idx].color 
                      : isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
                    transform: mobileIndex === idx ? "scale(1.2)" : "scale(1)"
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => setMobileIndex((prev) => (prev + 1) % 8)}
              className="p-3 rounded-full border cursor-pointer transition-colors"
              style={{
                borderColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)",
                color: isDark ? "#ffffff" : "#0f172a"
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}

      {/* DESKTOP CONTROLS */}
      {isDesktop && (
        <div className="flex items-center gap-4 mt-1">
          <button
            onClick={handlePrevStep}
            className="p-2 rounded-lg border flex items-center justify-center cursor-pointer transition-all hover:scale-105"
            style={{
              borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
              background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
              color: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)"
            }}
            title="Rotate Previous"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={() => setIsPaused(!isPaused)}
            className="px-4 py-2 rounded-lg border text-xs font-semibold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
            style={{
              borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
              background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
              color: isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)"
            }}
          >
            {isPaused ? <Play size={14} /> : <Pause size={14} />}
            {isPaused ? "Resume Orbit" : "Pause Orbit"}
          </button>

          <button
            onClick={handleNextStep}
            className="p-2 rounded-lg border flex items-center justify-center cursor-pointer transition-all hover:scale-105"
            style={{
              borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
              background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
              color: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)"
            }}
            title="Rotate Next"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
