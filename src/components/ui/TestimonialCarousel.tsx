import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useMobile } from "@/lib/hooks";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    quote: "“Truly impressive. The AI assistant is fast, accurate, and blends into our daily ops without friction. What stood out most was how quickly the team understood our workflow and customized the automation around it. The implementation felt seamless from day one, and the support throughout the process was proactive and reliable. Scalepods helped us simplify operations without slowing the team down.”",
    image: "/reviews/Anuj Ruia.jpeg"
  },
  {
    name: "Sharan Lekhi",
    title: "Founder at Krafty Animations",
    quote: "“Game-changer. Automation flows run flawlessly. Our team now focuses only on what really matters. Scalepods helped us streamline communication, reduce manual coordination, and improve overall execution speed. The workflows are reliable, easy to manage, and built with real operational understanding. It’s one of the few systems we adopted that immediately started saving us valuable time.”",
    image: "/reviews/Sharan Lekhi.jpeg"
  },
  {
    name: "Shreyansh Jaiswal",
    title: "Founder at HobbyFi",
    quote: "“Smooth setup. Their system replaced three tools. We saw improvements in just the first week. The onboarding process was quick, the automation logic was easy to understand, and everything integrated well with our existing workflow. Scalepods made the transition feel effortless while improving response times and reducing operational overhead across multiple tasks.”",
    image: "/reviews/Shreyansh Jaiswal.avif"
  },
  {
    name: "Dhairya Shah",
    title: "Partner & CEO at Break The Code",
    quote: "“Very intuitive. No fluff, just performance. Our internal processes finally feel under control. The automation setup was thoughtfully structured and aligned well with our team’s daily operations. What impressed us most was the balance between flexibility and reliability. Scalepods delivered a system that feels efficient, scalable, and genuinely useful in day-to-day execution.”",
    image: "/reviews/Dhairya Shah.avif"
  }
];

export default function TestimonialCarousel() {
  const [active, setActive] = useState(0);
  const isMobile = useMobile(768);
  const { resolvedTheme } = useTheme();
  const carouselRef = useRef(null);
  const isInView = useInView(carouselRef, { once: false, amount: 0.2 });

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % reviewsData.length);
  }, []);

  const prev = useCallback(() => {
    setActive((prev) => (prev - 1 + reviewsData.length) % reviewsData.length);
  }, []);

  // Autoplay — ONLY starts when section is in view
  useEffect(() => {
    if (!isInView) return;
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next, isInView]);

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

    const xOffset = isMobile ? 25 : 360; 

    if (isCenter) {
      x = 0;
      scale = 1;
      opacity = 1;
      filter = "grayscale(0) brightness(1) blur(0px)";
      pointerEvents = "auto";
    } else if (isLeft) {
      x = -xOffset;
      scale = isMobile ? 0.8 : 0.85;
      opacity = isMobile ? 0 : 0.6;
      filter = resolvedTheme === 'dark' ? "grayscale(0.5) brightness(0.7) blur(2px)" : "grayscale(0.3) brightness(0.95) blur(2px)";
    } else if (isRight) {
      x = xOffset;
      scale = isMobile ? 0.8 : 0.85;
      opacity = isMobile ? 0 : 0.6;
      filter = resolvedTheme === 'dark' ? "grayscale(0.5) brightness(0.7) blur(2px)" : "grayscale(0.3) brightness(0.95) blur(2px)";
    } else {
      x = diff < 0 ? -xOffset * 1.6 : xOffset * 1.6;
      scale = 0.7;
      opacity = 0;
      filter = "grayscale(1) blur(8px)";
    }

    return { x, scale, opacity, zIndex, filter, pointerEvents, isCenter };
  };

  return (
    <div 
      ref={carouselRef} 
      className="relative w-full max-w-full"
      style={{
        overflow: isMobile ? "hidden" : "visible",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: isMobile ? "0px" : "32px",
        paddingBottom: isMobile ? "0px" : "32px",
      }}
    >
      
      {/* ── Desktop Navigation Arrows ── */}
      {!isMobile && (
        <>
          <div style={{ position: "absolute", left: "40px", top: "50%", transform: "translateY(-50%)", zIndex: 100 }}>
            <ArrowBtn dir="left" onClick={prev} />
          </div>
          <div style={{ position: "absolute", right: "40px", top: "50%", transform: "translateY(-50%)", zIndex: 100 }}>
            <ArrowBtn dir="right" onClick={next} />
          </div>
        </>
      )}

      <div 
        className="relative w-full" 
        style={{ 
          perspective: 1200, 
          minHeight: isMobile ? "auto" : "340px", 
          height: isMobile ? "auto" : undefined,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          overflow: isMobile ? "hidden" : "visible"
        }}
      >
        <AnimatePresence initial={false} mode={isMobile ? "wait" : undefined}>
          {reviewsData.map((review, i) => {
            if (isMobile && i !== active) return null;
            const { x, scale, opacity, zIndex, filter, pointerEvents, isCenter } = getCardStyles(i);

            return (
              <motion.div
                key={review.name}
                initial={isMobile ? { opacity: 0, x: 50 } : false}
                animate={{
                  x: isMobile ? 0 : `calc(-50% + ${x}px)`,
                  y: isMobile ? 0 : "-50%",
                  scale: isMobile ? 1 : scale,
                  opacity: isMobile ? 1 : opacity,
                  zIndex,
                  filter: isMobile ? "none" : filter,
                }}
                exit={isMobile ? { opacity: 0, x: -50 } : undefined}
                transition={{
                  duration: 0.4,
                  ease: [0.32, 0.72, 0, 1],
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
                  position: isMobile ? "relative" : "absolute",
                  pointerEvents: pointerEvents as any,
                  cursor: isCenter ? "grab" : "pointer",
                  width: isMobile ? "92%" : "90%",
                  maxWidth: isMobile ? "360px" : "520px",
                  marginInline: isMobile ? "auto" : undefined,
                  top: isMobile ? "auto" : "50%",
                  left: isMobile ? "auto" : "50%",
                  // Adaptive Height Strategy
                  minHeight: isMobile ? "auto" : "200px",
                  background: resolvedTheme === 'dark' ? "rgba(10, 15, 30, 0.6)" : "rgba(255, 255, 255, 0.7)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: isCenter 
                    ? `1px solid rgba(177, 217, 151, ${resolvedTheme === 'dark' ? '0.5' : '0.4'})`
                    : `1px solid rgba(177, 217, 151, ${resolvedTheme === 'dark' ? '0.1' : '0.05'})`,
                  borderRadius: "28px",
                  padding: isMobile ? "24px" : "32px 24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "16px",
                  // Premium 3D Depth
                  boxShadow: isCenter 
                    ? resolvedTheme === 'dark'
                      ? "0 30px 60px -12px rgba(0, 0, 0, 0.7), 0 0 30px rgba(177, 217, 151, 0.15), inset 0 1px 1px rgba(255,255,255,0.05)"
                      : "0 25px 50px -12px rgba(177, 217, 151, 0.15), 0 0 20px rgba(177, 217, 151, 0.1), inset 0 1px 0 rgba(255,255,255,0.6)"
                    : "0 10px 30px rgba(0,0,0,0.05)",
                }}
                className="transform-gpu"
              >
                {/* Subtle Background Glow for Center Card */}
                {isCenter && (
                  <div style={{
                    position: "absolute",
                    top: "0",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "80%",
                    height: "40%",
                    background: resolvedTheme === 'dark'
                      ? "radial-gradient(circle, rgba(177, 217, 151, 0.08) 0%, transparent 80%)"
                      : "radial-gradient(circle, rgba(177, 217, 151, 0.05) 0%, transparent 80%)",
                    zIndex: -1,
                    pointerEvents: "none"
                  }} />
                )}

                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ 
                    position: "relative", 
                    width: isMobile ? "44px" : "48px", 
                    height: isMobile ? "44px" : "48px", 
                    borderRadius: "12px", 
                    overflow: "hidden", 
                    border: `1px solid ${resolvedTheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`, 
                    flexShrink: 0 
                  }}>
                    <Image src={review.image} alt={review.name} fill className="object-cover" sizes="64px" />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontFamily: F.inter, fontSize: isMobile ? "15px" : "16px", fontWeight: 700, color: C.txtBright }}>{review.name}</span>
                    <span style={{ 
                      fontFamily: F.inter, 
                      fontSize: isMobile ? "10px" : "11px", 
                      color: resolvedTheme === 'dark' ? "rgba(177, 217, 151, 0.8)" : "rgba(0, 0, 0, 0.6)", 
                      marginTop: "1px", 
                      fontWeight: 500,
                      textTransform: "uppercase",
                      letterSpacing: "0.02em"
                    }}>{review.title}</span>
                  </div>
                </div>

                <div style={{ width: "100%", height: "1px", background: resolvedTheme === 'dark' ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }} />

                <div style={{ display: "flex", alignItems: "flex-start", overflow: "hidden" }}>
                  <p style={{
                    fontFamily: F.inter, 
                    fontSize: isMobile ? "13px" : "14px", 
                    color: C.txtBody, 
                    lineHeight: 1.5, 
                    margin: 0,
                    fontWeight: 400,
                    opacity: 0.9,
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
      <div 
        className="flex gap-2.5 justify-center" 
        style={{ 
          marginTop: isMobile ? "20px" : "32px",
          width: "100%",
          alignItems: "center"
        }}
      >
        {reviewsData.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="transition-all duration-300 rounded-full"
            style={{
              width: active === i ? "24px" : "8px",
              height: "8px",
              background: active === i ? "rgba(177, 217, 151, 0.8)" : resolvedTheme === 'dark' ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function ArrowBtn({ dir, onClick }: { dir: 'left' | 'right', onClick: () => void }) {
  const isMobile = useMobile(768);
  const { resolvedTheme } = useTheme();
  return (
    <motion.button
      whileHover={{ scale: 1.1, background: resolvedTheme === 'dark' ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)" }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      style={{
        width: isMobile ? "44px" : "56px",
        height: isMobile ? "44px" : "56px",
        borderRadius: "50%",
        background: resolvedTheme === 'dark' ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
        backdropFilter: "blur(12px)",
        border: `1px solid ${resolvedTheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--color-text-bright)",
        cursor: "pointer",
        boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
        zIndex: 50,
      }}
    >
      {dir === 'left' ? <ChevronLeft size={isMobile ? 20 : 28} /> : <ChevronRight size={isMobile ? 20 : 28} />}
    </motion.button>
  );
}

