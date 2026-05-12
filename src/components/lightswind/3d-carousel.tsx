"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMobile } from "@/lib/hooks";

interface CarouselItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

interface ThreeDCarouselProps {
  items?: CarouselItem[];
  autoRotate?: boolean;
  rotateInterval?: number;
  tightLayout?: boolean;
  cardScale?: number;
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

export const ThreeDCarousel = ({
  items = DEFAULT_ITEMS,
  autoRotate = true,
  rotateInterval = 4000,
  tightLayout = false,
  cardScale = 1,
}: ThreeDCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const isMobile = useMobile(1024);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (autoRotate && !isHovering) {
      timerRef.current = setInterval(nextSlide, rotateInterval);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoRotate, isHovering, nextSlide, rotateInterval]);

  const handleDragEnd = (event: any, info: any) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      nextSlide();
    } else if (info.offset.x > threshold) {
      prevSlide();
    }
  };

  return (
    <div 
      className="relative w-full h-[480px] md:h-[640px] flex items-center justify-center perspective-[1500px]"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{ background: "transparent", overflow: "visible" }}
    >
      {/* Cinematic Edge Fade Mask - REPLACED WITH TRANSPARENT FADE */}
      <div className="absolute inset-y-0 left-0 w-32 z-40 pointer-events-none" style={{ background: "transparent" }} />
      <div className="absolute inset-y-0 right-0 w-32 z-40 pointer-events-none" style={{ background: "transparent" }} />

      {/* Navigation Buttons - Desktop */}
      {!isMobile && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-[-18px] z-[50] w-12 h-12 rounded-full flex items-center justify-center bg-white/5 border border-white/10 backdrop-blur-xl text-[#ACD791] transition-all hover:scale-110 hover:bg-[#ACD791]/10 hover:border-[#ACD791]/30 group shadow-[0_0_20px_rgba(172,215,145,0.1)] hover:shadow-[0_0_30px_rgba(172,215,145,0.3)]"
          >
            <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-[-18px] z-[50] w-12 h-12 rounded-full flex items-center justify-center bg-white/5 border border-white/10 backdrop-blur-xl text-[#ACD791] transition-all hover:scale-110 hover:bg-[#ACD791]/10 hover:border-[#ACD791]/30 group shadow-[0_0_20px_rgba(172,215,145,0.1)] hover:shadow-[0_0_30px_rgba(172,215,145,0.3)]"
          >
            <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </>
      )}

      <div className="relative w-full h-full flex items-center justify-center preserve-3d">
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => {
            let relativeIndex = index - currentIndex;
            if (relativeIndex > Math.floor(items.length / 2)) relativeIndex -= items.length;
            if (relativeIndex < -Math.floor(items.length / 2)) relativeIndex += items.length;

            const isCenter = relativeIndex === 0;
            const isVisible = Math.abs(relativeIndex) <= 2;

            if (!isVisible) return null;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.8, x: relativeIndex * 200 }}
                animate={{
                  opacity: isCenter ? 1 : 0.25, // Lower opacity for side cards
                  scale: (isCenter ? 1 : 0.75) * cardScale, // Apply cardScale
                  rotateY: relativeIndex * (tightLayout ? -20 : -35), // Tighter rotation
                  x: relativeIndex * (isMobile ? 120 : (tightLayout ? 140 : 180)), // Tighter x spread
                  z: -Math.abs(relativeIndex) * (tightLayout ? 150 : 200),
                  zIndex: 10 - Math.abs(relativeIndex),
                  filter: isCenter ? "blur(0px) brightness(1.1)" : "blur(4px) brightness(0.6)", // Focus hierarchy
                }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
                drag={isMobile ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                className="absolute"
                style={{
                  width: isMobile ? "300px" : "640px",
                  aspectRatio: "16/9",
                  background: "transparent",
                }}
              >
                {/* Premium Card - REMOVED FRAMES FOR FLOATING EFFECT */}
                <div 
                  className={`relative w-full h-full transition-all duration-500 ${
                    isCenter 
                      ? "scale-100" 
                      : "opacity-25 grayscale-[0.5]"
                  }`}
                  style={{ background: "transparent" }}
                >
                  
                  {/* Top Image Container - Floating Dashboard */}
                  <div className="relative w-full h-[72%] overflow-visible flex items-center justify-center" style={{ background: "transparent" }}>
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 300px, 640px"
                      priority={isCenter}
                    />
                  </div>
 
                  {/* Dedicated Text Box Below - Purely Floating */}
                  <div className="p-6 h-[28%] flex flex-col justify-center items-center text-center" style={{ background: "transparent" }}>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#ACD791] font-extrabold mb-2 block">
                      ScalePods System
                    </span>
                    <h3 className="text-white text-xl font-bold tracking-tight mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-[#B8C7D9] text-xs leading-relaxed opacity-80 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Soft Ground Glow */}
                {isCenter && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[90%] h-6 bg-[#ACD791]/10 blur-3xl rounded-full" 
                  />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Mobile Swipe Indicator - Optional, keep it clean */}
    </div>
  );
};

export default ThreeDCarousel;
