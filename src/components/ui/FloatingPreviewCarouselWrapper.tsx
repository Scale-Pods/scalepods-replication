"use client";

import React, { useState, useRef, useEffect, memo, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { ThreeDCarousel, type CarouselItem } from "@/components/lightswind/3d-carousel";
import { useMobile } from "@/lib/hooks";
import { useTheme } from "@/components/providers/ThemeProvider";

interface FloatingPreviewCarouselWrapperProps {
  items: CarouselItem[];
  autoRotate?: boolean;
  rotateInterval?: number;
  tightLayout?: boolean;
}

export const FloatingPreviewCarouselWrapper = memo(({
  items,
  autoRotate = true,
  rotateInterval = 3500,
  tightLayout,
}: FloatingPreviewCarouselWrapperProps) => {
  const isMobile = useMobile(1023);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const [hoverPaused, setHoverPaused] = useState(false);
  const [expandedItem, setExpandedItem] = useState<CarouselItem | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const touchTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [touchHoldPaused, setTouchHoldPaused] = useState(false);

  const isExpanded = expandedItem !== null;
  const isExternallyPaused = hoverPaused || touchHoldPaused || isExpanded;

  useEffect(() => { setIsMounted(true); }, []);

  // ESC to close
  useEffect(() => {
    if (!isExpanded) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setExpandedItem(null); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isExpanded]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isExpanded ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isExpanded]);

  const handleImageClick = useCallback((item: CarouselItem) => {
    setExpandedItem(item);
  }, []);

  const handleClose = useCallback(() => setExpandedItem(null), []);

  // Desktop hover pause
  const handleMouseEnter = useCallback(() => { if (!isMobile) setHoverPaused(true); }, [isMobile]);
  const handleMouseLeave = useCallback(() => { if (!isMobile) setHoverPaused(false); }, [isMobile]);

  // Mobile touch-hold pause
  const handleTouchStart = useCallback(() => {
    if (!isMobile) return;
    touchTimerRef.current = setTimeout(() => setTouchHoldPaused(true), 220);
  }, [isMobile]);
  const handleTouchEnd = useCallback(() => {
    if (!isMobile) return;
    if (touchTimerRef.current) { clearTimeout(touchTimerRef.current); touchTimerRef.current = null; }
    setTouchHoldPaused(false);
  }, [isMobile]);

  useEffect(() => () => { if (touchTimerRef.current) clearTimeout(touchTimerRef.current); }, []);

  // Floating preview portal
  const portal = isMounted && isExpanded ? createPortal(
    <AnimatePresence>
      {isExpanded && expandedItem && (
        // Backdrop — click to close
        <motion.div
          key="sales-preview-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={handleClose}
          style={{
            position: "fixed", inset: 0, zIndex: 9000,
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: isMobile ? "16px" : "40px",
            background: "rgba(0,0,0,0.52)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          {/* Floating image panel */}
          <motion.div
            key={`sales-panel-${expandedItem.id}`}
            initial={{ opacity: 0, scale: 0.86, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: isMobile ? "88vw" : "min(62vw, 920px)",
              background: isDark
                ? "linear-gradient(145deg, rgba(10,15,30,0.94) 0%, rgba(5,8,22,0.97) 100%)"
                : "linear-gradient(145deg, rgba(255,255,255,0.96) 0%, rgba(240,250,230,0.92) 100%)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              border: `1.5px solid rgba(177,217,151,0.32)`,
              borderRadius: "28px",
              padding: isMobile ? "14px" : "22px",
              boxShadow: isDark
                ? "0 0 0 1px rgba(177,217,151,0.1), 0 50px 100px rgba(0,0,0,0.75), 0 0 80px rgba(177,217,151,0.06)"
                : "0 0 0 1px rgba(177,217,151,0.15), 0 40px 80px rgba(0,0,0,0.12)",
              willChange: "transform, opacity",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            {/* Top bar: system label + close */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--color-green)", boxShadow: "0 0 8px var(--color-green)" }} />
                <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--color-green)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                  {expandedItem.systemLabel ?? "Live Preview"}
                </span>
              </div>
              <button
                onClick={handleClose}
                aria-label="Close preview"
                style={{
                  width: "30px", height: "30px", borderRadius: "50%",
                  border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`,
                  background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                  color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", transition: "all 0.2s ease",
                }}
              >
                <X size={14} />
              </button>
            </div>

            {/* Image — GPU-only, sharp, clipped */}
            <div style={{
              position: "relative", width: "100%",
              aspectRatio: "16/9.5",
              borderRadius: "16px",
              overflow: "hidden",
              background: isDark ? "rgba(0,0,0,0.28)" : "rgba(255,255,255,0.5)",
              border: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)"}`,
              flexShrink: 0,
            }}>
              <Image
                src={expandedItem.imageUrl}
                alt={expandedItem.title}
                fill
                className="object-contain"
                style={{
                  objectPosition: "center",
                  filter: isDark
                    ? "drop-shadow(0 8px 24px rgba(0,0,0,0.45)) brightness(1.04) contrast(1.02)"
                    : "drop-shadow(0 8px 20px rgba(0,0,0,0.06))",
                }}
                sizes="(max-width: 768px) 88vw, 62vw"
                priority
              />
            </div>

            {/* Caption */}
            <div style={{ textAlign: "center" }}>
              <h4 style={{
                margin: "0 0 4px",
                fontSize: isMobile ? "15px" : "18px",
                fontWeight: 700,
                color: isDark ? "#fff" : "#0f172a",
                letterSpacing: "-0.02em",
              }}>
                {expandedItem.heading ?? expandedItem.title}
              </h4>
              <p style={{
                margin: 0, fontSize: isMobile ? "12px" : "13.5px",
                color: isDark ? "rgba(255,255,255,0.58)" : "#475467",
                lineHeight: 1.55,
              }}>
                {expandedItem.description}
              </p>
            </div>

            {!isMobile && (
              <p style={{ margin: 0, textAlign: "center", fontSize: "10px", letterSpacing: "0.08em", color: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)" }}>
                Click outside or press ESC to close
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  ) : null;

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      style={{ width: "100%", position: "relative" }}
    >
      {/* Hover pause badge */}
      {!isMobile && hoverPaused && (
        <motion.div
          initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
          style={{
            position: "absolute", top: "14px", right: "18px", zIndex: 20,
            pointerEvents: "none", display: "flex", alignItems: "center", gap: "6px",
            padding: "5px 10px", borderRadius: "20px",
            background: isDark ? "rgba(10,15,30,0.82)" : "rgba(255,255,255,0.88)",
            backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(177,217,151,0.28)",
          }}
        >
          <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--color-green)", boxShadow: "0 0 6px var(--color-green)" }} />
          <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--color-green)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Paused</span>
        </motion.div>
      )}

      <ThreeDCarousel
        items={items}
        autoRotate={autoRotate}
        rotateInterval={rotateInterval}
        tightLayout={tightLayout}
        externalPaused={isExternallyPaused}
        onImageClick={handleImageClick}
      />

      {portal}
    </div>
  );
});

FloatingPreviewCarouselWrapper.displayName = "FloatingPreviewCarouselWrapper";
