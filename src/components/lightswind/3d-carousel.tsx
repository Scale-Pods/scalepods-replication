"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMobile } from "@/lib/hooks";
import { useTheme } from "@/components/providers/ThemeProvider";

export interface CarouselItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  subtitle?: string;
  heading?: string;
  systemLabel?: string;
}

interface ThreeDCarouselProps {
  items: CarouselItem[];
  autoRotate?: boolean;
  rotateInterval?: number;
  tightLayout?: boolean;
  cardScale?: number;
  captionOffset?: number;
  /** Externally controlled pause — parent can set true on hover/focus without touching internal drag state */
  externalPaused?: boolean;
  /** Called with the active item when the image zone is clicked — used by SalesCarouselWrapper for floating preview */
  onImageClick?: (item: CarouselItem) => void;
}


const DEFAULT_ITEMS: CarouselItem[] = [
  { 
    id: 1, 
    title: "Audit Checker", 
    description: "AI-powered document validation & procurement auditing.",
    imageUrl: "/images/carousel/audit-checker.png" 
  },
  { 
    id: 2, 
    title: "Expense Tracker", 
    description: "Interactive financial analytics & invoicing system.",
    imageUrl: "/images/carousel/expense-tracker.png" 
  },
  { 
    id: 3, 
    title: "Marketing Automation", 
    description: "Automated multi-channel outreach workflows.",
    imageUrl: "/images/carousel/marketing-tool.png" 
  },
  { 
    id: 4, 
    title: "Procurement Command Center", 
    description: "Centralized procurement lifecycle management.",
    imageUrl: "/images/carousel/procurement-tool.png" 
  },
  { 
    id: 5, 
    title: "Property Management", 
    description: "Operational workflow automation platform.",
    imageUrl: "/images/carousel/property-management.png" 
  },
  { 
    id: 6, 
    title: "Sales Intelligence", 
    description: "AI-driven lead conversion & outreach engine.",
    imageUrl: "/images/carousel/sales-tool.png" 
  },
];

export const ThreeDCarousel = React.memo(({
  items,
  autoRotate = true,
  rotateInterval = 2000,
  tightLayout = false,
  cardScale = 1,
  captionOffset = 0,
  externalPaused = false,
  onImageClick,
}: ThreeDCarouselProps) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);

  const [isTabActive, setIsTabActive] = useState(true);
  const isMobile = useMobile(1024);
  const { resolvedTheme } = useTheme();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const isDark = resolvedTheme === "dark";

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  // Preload ALL images on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      items.forEach(item => {
        const img = new window.Image();
        img.src = item.imageUrl;
      });
    }
  }, [items]);


  // Pause on tab inactive
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabActive(document.visibilityState === "visible");
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    if (autoRotate && !isInteracting && !externalPaused && isTabActive) {
      timerRef.current = setInterval(nextSlide, rotateInterval);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoRotate, isInteracting, externalPaused, isTabActive, nextSlide, rotateInterval]);


  const handleDragEnd = useCallback((event: any, info: any) => {
    setIsInteracting(false);
    const threshold = isMobile ? 30 : 50; 
    if (info.offset.x < -threshold) {
      nextSlide();
    } else if (info.offset.x > threshold) {
      prevSlide();
    }
  }, [isMobile, nextSlide, prevSlide]);


  return (
    <div 
      className="relative w-full flex flex-col items-center select-none"
      onPointerDown={() => setIsInteracting(true)}
      onPointerUp={() => setIsInteracting(false)}
      onPointerLeave={() => { if (isInteracting) setIsInteracting(false); }}
      style={{ background: "transparent", overflow: "visible", touchAction: "pan-y", zIndex: 1 }}
    >

      <div className="relative w-full flex flex-col items-center max-w-[900px] mx-auto">
        {/* We render all slides but only show the active one to prevent re-fetching/flickering */}
        <div className="relative w-full" style={{ height: isMobile ? "auto" : "600px", minHeight: isMobile ? "240px" : "540px" }}>






          {items.map((item, index) => {
            const isActive = index === currentIndex;
            
            return (
              <motion.div
                key={item.id}
                initial={false}
                animate={{ 
                  opacity: isActive ? 1 : 0,
                  scale: isActive ? 1 : 0.95,
                  x: isActive ? 0 : (index < currentIndex ? -30 : 30),
                  pointerEvents: isActive ? "auto" : "none",
                  visibility: isActive ? "visible" : "hidden",
                  filter: isActive ? "blur(0px)" : (isMobile ? "blur(4px)" : "blur(10px)")
                }}
                transition={{ 
                  duration: isMobile ? 0.4 : 0.6, 
                  ease: [0.23, 1, 0.32, 1] 
                }}
                className="absolute inset-0 w-full flex items-center justify-center"
                style={{ 
                  willChange: "transform, opacity, filter",
                  zIndex: isActive ? 20 : 10,
                }}
              >
                {/* ── Unified Premium Showcase Panel ── */}
                <div 
                  className="relative flex flex-col overflow-hidden"
                  style={{
                    width: "100%",
                    maxWidth: "840px",
                    height: "auto",
                    background: isDark 
                      ? "linear-gradient(135deg, rgba(10, 15, 30, 0.7) 0%, rgba(5, 8, 22, 0.85) 100%)" 
                      : "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(240, 250, 230, 0.6) 100%)",
                    backdropFilter: isMobile ? "blur(12px)" : "blur(24px)",
                    WebkitBackdropFilter: isMobile ? "blur(12px)" : "blur(24px)",
                    border: `1px solid ${isDark ? "rgba(177, 217, 151, 0.12)" : "rgba(177, 217, 151, 0.25)"}`,
                    borderRadius: "32px",
                    padding: isMobile ? "12px" : "20px",
                    boxShadow: isDark 
                      ? "0 40px 80px -20px rgba(0, 0, 0, 0.6), inset 0 0 40px rgba(177, 217, 151, 0.03)"
                      : "0 30px 60px -15px rgba(177, 217, 151, 0.1), inset 0 0 20px rgba(255, 255, 255, 0.4)",
                    transform: "translate3d(0,0,0)",
                    contain: isMobile ? "content" : "none"
                  }}
                >
                  {/* Subtle Top Shine */}
                  <div style={{
                    position: "absolute", top: 0, left: "15%", right: "15%", height: "1px",
                    background: isDark 
                      ? "linear-gradient(90deg, transparent, rgba(177, 217, 151, 0.3), transparent)"
                      : "linear-gradient(90deg, transparent, rgba(177, 217, 151, 0.5), transparent)",
                    zIndex: 10
                  }} />

                  {/* Image Showcase Zone */}
                  <div 
                    className="relative w-full overflow-hidden"
                    onClick={onImageClick && isActive ? (e) => { e.stopPropagation(); onImageClick(item); } : undefined}
                    style={{
                      borderRadius: "20px",
                      background: isDark ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.3)",
                      aspectRatio: isMobile ? "16/10" : "16/9.5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      border: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)"}`,
                      cursor: onImageClick && isActive ? "zoom-in" : "default",
                    }}
                  >
                    <div style={{ position: "relative", width: "95%", height: "95%" }}>
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-contain"
                        style={{ 
                          objectPosition: "center",
                          filter: isDark ? "drop-shadow(0 20px 40px rgba(0,0,0,0.5))" : "drop-shadow(0 15px 30px rgba(0,0,0,0.05))"
                        }}
                        sizes="(max-width: 768px) 100vw, 900px"
                        priority={isActive}
                      />
                    </div>

                    {/* Left/Right Arrows - Embedded in Image Zone */}
                    {!isMobile && (
                      <>
                        <button
                          onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                          className="absolute left-4 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md z-50 group"
                        >
                          <ChevronLeft size={20} color={isDark ? "#fff" : "#000"} className="group-hover:-translate-x-0.5 transition-transform" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                          className="absolute right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md z-50 group"
                        >
                          <ChevronRight size={20} color={isDark ? "#fff" : "#000"} className="group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Caption Zone */}
                  <div 
                    className="flex flex-col items-center text-center w-full mt-4 pb-2"
                    style={{ padding: isMobile ? "0 8px" : "0 40px" }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div style={{ height: "1px", width: "20px", background: isDark ? "rgba(177, 217, 151, 0.4)" : "rgba(177, 217, 151, 0.6)" }} />
                      <span style={{ 
                        color: isDark ? "var(--color-green)" : "#74B34B",
                        fontSize: "10px",
                        fontWeight: 800,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase"
                      }}>
                        {item.systemLabel || "System Module"}
                      </span>
                      <div style={{ height: "1px", width: "20px", background: isDark ? "rgba(177, 217, 151, 0.4)" : "rgba(177, 217, 151, 0.6)" }} />
                    </div>

                    <h3 
                      style={{ 
                        fontSize: isMobile ? "20px" : "24px", 
                        fontWeight: 800, 
                        color: isDark ? "#fff" : "#0f172a",
                        marginBottom: "6px",
                        letterSpacing: "-0.02em"
                      }}
                    >
                      {item.heading || item.title}
                    </h3>
                    
                    <p 
                      style={{ 
                        fontSize: isMobile ? "13px" : "14.5px", 
                        lineHeight: 1.5, 
                        color: isDark ? "rgba(255,255,255,0.7)" : "#475467",
                        maxWidth: "600px",
                        margin: 0
                      }}
                    >
                      {item.description}
                    </p>

                    {/* Indicator Dots - Inside Card */}
                    <div className="flex gap-2 mt-4">
                      {items.map((_, i) => (
                        <div 
                          key={i} 
                          style={{ 
                            width: i === currentIndex ? "20px" : "6px",
                            height: "6px",
                            borderRadius: "10px",
                            background: i === currentIndex ? "var(--color-green)" : (isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)"),
                            transition: "all 0.3s ease"
                          }} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .carousel-viewport {
          height: auto;
          min-height: 480px;
        }

        @media (max-width: 1024px) {
          .carousel-viewport {
            min-height: 400px;
          }
        }
        @media (max-width: 768px) {
          .carousel-viewport {
            min-height: 300px;
          }
        }
      `}</style>


      {/* Mobile Control Row (if needed outside card) */}
      {isMobile && (
        <div className="flex gap-4 items-center mt-4">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full flex items-center justify-center active:scale-90 transition-transform bg-white/10 border border-white/10 backdrop-blur-md"
            style={{ color: isDark ? "#fff" : "#000" }}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full flex items-center justify-center active:scale-90 transition-transform bg-white/10 border border-white/10 backdrop-blur-md"
            style={{ color: isDark ? "#fff" : "#000" }}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

    </div>
  );
});


export default ThreeDCarousel;
