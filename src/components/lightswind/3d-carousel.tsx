"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMobile } from "@/lib/hooks";
import { useTheme } from "@/components/providers/ThemeProvider";

interface CarouselItem {
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
    if (autoRotate && !isInteracting && isTabActive) {
      timerRef.current = setInterval(nextSlide, rotateInterval);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoRotate, isInteracting, isTabActive, nextSlide, rotateInterval]);


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
      className="relative w-full flex flex-col items-center"
      onPointerDown={() => setIsInteracting(true)}
      onPointerUp={() => setIsInteracting(false)}
      onPointerLeave={() => { if (isInteracting) setIsInteracting(false); }}
      style={{ background: "transparent", overflow: "visible", touchAction: "pan-y" }}
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
                  scale: isActive ? 1 : 0.98,
                  x: isActive ? 0 : (index < currentIndex ? -20 : 20),
                  pointerEvents: isActive ? "auto" : "none",
                  visibility: isActive ? "visible" : "hidden"
                }}
                transition={{ 
                  duration: isMobile ? 0.35 : 0.5, 
                  ease: [0.23, 1, 0.32, 1] 
                }}
                onDragStart={() => setIsInteracting(true)}
                onDragEnd={handleDragEnd}
                drag={isMobile && isActive ? "x" : false}

                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                className="absolute inset-0 w-full flex flex-col items-center"
                style={{ 
                  willChange: "transform, opacity",
                  zIndex: isActive ? 20 : 10,
                  position: isActive ? "relative" : "absolute",
                  top: 0,
                  left: 0
                }}



              >
                {/* Hero Dashboard Viewport - Clean & Contained */}
                <div 
                  className="carousel-viewport relative w-full flex items-center justify-center"
                  style={{
                    borderRadius: "28px",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transform: "translate3d(0,0,0)",
                    willChange: "transform",
                    background: "transparent",
                    border: "none",
                    boxShadow: "none",
                    overflow: "visible"
                  }}

                >
                  <div className="relative w-full h-full flex items-center justify-center p-3 md:p-6 min-h-[220px] md:min-h-[320px] lg:min-h-[420px]">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-contain"
                      style={{ 
                        objectPosition: "center",
                      }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 900px"
                      priority={isActive}
                      loading={isActive ? "eager" : "lazy"}
                    />
                  </div>
                </div>

                {/* Navigation & Caption Block - Clean Spacing & Alignment */}
                <div 
                  className="relative w-full flex items-center justify-center px-4 mt-2 md:mt-4"
                >














                  
                  {/* Left Button - Beside Caption */}
                  {!isMobile && isActive && (
                    <button
                      onClick={prevSlide}
                      className="absolute left-0 w-[50px] h-[50px] rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 group z-50"
                      style={{
                        background: "rgba(255,255,255,0.92)",
                        border: "1px solid rgba(15,23,42,0.08)",
                        backdropFilter: "blur(14px)",
                        WebkitBackdropFilter: "blur(14px)",
                        color: "#0F172A",
                        boxShadow: "0 4px 12px rgba(15,23,42,0.08)",
                        transform: !isMobile ? `translateY(-${captionOffset * 0.6}px)` : "none"
                      }}
                    >
                      <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
                    </button>


                  )}

                  {/* Restored Text Content Layout */}
                  <div 
                    className="flex flex-col items-center text-center max-w-[540px] px-14 md:px-0"
                    style={{ transform: !isMobile ? `translateY(-${captionOffset}px)` : "none" }}
                  >

                    <span 
                      className="uppercase block mb-4 mx-auto"
                      style={{ 
                        color: isDark ? "var(--color-green)" : "#84CC16",
                        fontSize: isDark ? "11px" : "12px",
                        fontWeight: 900,
                        letterSpacing: "0.45em",
                        textShadow: isDark ? "none" : "0 0 12px rgba(132,204,22,0.15)",
                        background: "transparent",
                        width: "fit-content",
                        lineHeight: "1"
                      }}
                    >

                      {item.systemLabel || "ScalePods System"}
                    </span>
                    <h3 
                      className="text-xl md:text-3xl font-extrabold tracking-tight mb-3"
                      style={{ color: isDark ? "#FFFFFF" : "#0F172A" }}
                    >
                      {item.heading || item.title}
                    </h3>
                    {item.subtitle && (
                      <p 
                        className="text-[12px] md:text-sm font-bold mb-4 opacity-90"
                        style={{ color: isDark ? "var(--color-green)" : "#475467" }}
                      >{item.subtitle}</p>
                    )}
                    <p 
                      className="text-[12px] md:text-[15px] leading-relaxed opacity-80"
                      style={{ color: isDark ? "#B8C7D9" : "#667085", maxWidth: "600px" }}
                    >
                      {item.description}
                    </p>
                  </div>


                  {/* Right Button - Beside Caption */}
                  {!isMobile && isActive && (
                    <button
                      onClick={nextSlide}
                      className="absolute right-0 w-[50px] h-[50px] rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 group z-50"
                      style={{
                        background: "rgba(255,255,255,0.92)",
                        border: "1px solid rgba(15,23,42,0.08)",
                        backdropFilter: "blur(14px)",
                        WebkitBackdropFilter: "blur(14px)",
                        color: "#0F172A",
                        boxShadow: "0 4px 12px rgba(15,23,42,0.08)",
                        transform: !isMobile ? `translateY(-${captionOffset * 0.6}px)` : "none"
                      }}
                    >
                      <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>


                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .carousel-viewport {
          height: 520px;
          min-height: 480px;
          max-height: 560px;
        }




        @media (max-width: 1440px) {
          .carousel-viewport {
            height: 480px;
          }
        }
        @media (max-width: 1024px) {
          .carousel-viewport {
            height: 420px;
          }
        }
        @media (max-width: 768px) {
          .carousel-viewport {
            height: 320px;
          }
        }



      `}</style>


      {/* Mobile Indicator Row */}
      {isMobile && (
        <div className="flex gap-6 items-center mt-6" style={{ touchAction: "none" }}>
          <button
            onClick={prevSlide}
            className="w-9 h-9 rounded-full flex items-center justify-center active:scale-90 transition-transform"
            style={{
              background: "rgba(255,255,255,0.92)",
              border: "1px solid rgba(15,23,42,0.08)",
              backdropFilter: "blur(14px)",
              color: "#0F172A",
              boxShadow: "0 4px 12px rgba(15,23,42,0.08)",
              transform: "translate3d(0,0,0)",
              willChange: "transform"
            }}
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {items.map((_, i) => (
              <div 
                key={i} 
                className={`h-1 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-5' : 'w-1'}`} 
                style={{ 
                  background: i === currentIndex ? "var(--color-green)" : (isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"),
                  transform: "translate3d(0,0,0)"
                }} 
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            className="w-9 h-9 rounded-full flex items-center justify-center active:scale-90 transition-transform"
            style={{
              background: "rgba(255,255,255,0.92)",
              border: "1px solid rgba(15,23,42,0.08)",
              backdropFilter: "blur(14px)",
              color: "#0F172A",
              boxShadow: "0 4px 12px rgba(15,23,42,0.08)",
              transform: "translate3d(0,0,0)",
              willChange: "transform"
            }}
          >
            <ChevronRight size={18} />
          </button>

        </div>
      )}

    </div>
  );
});


export default ThreeDCarousel;
