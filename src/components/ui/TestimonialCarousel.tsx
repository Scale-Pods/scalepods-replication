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
  green: "var(--sp-accent, #63A5E7)",
};

const F = {
  inter: "var(--font-inter), Inter, sans-serif",
  serif: "var(--font-instrument), 'Instrument Serif', Georgia, serif",
};

export interface ReviewItem {
  name: string;
  title: string;
  location: string;
  countryCode: string; // "ae", "in", "us"
  quote: string;
  image: string;
  expanded?: boolean; // Reusable property for long reviews
}

export const reviewsData: ReviewItem[] = [
  {
    name: "Zameer Lokhandwala",
    title: "Managing Director at Z.V Steels Pvt. Ltd",
    location: "India",
    countryCode: "in",
    quote: "“We were a large, four-generation manufacturing business and ScalePods was a young startup when we first hired them — a bit of a leap of faith on our part. It paid off. We started with HR recruitment automation, and Adnan and Raunak built it around our actual process instead of handing us something off the shelf, weaving in Claude to handle resume screening and candidate shortlisting intelligently rather than with rigid keyword rules. Screening effort dropped 70-80%, and interview scheduling went from 1-2 days to under 30 minutes. That got us comfortable enough to bring them into three more parts of the business — purchase and sales audits, material quality checks, and sales outreach for our group company. Every time, same experience: responsive, custom-built, and never once did we have to chase them for a fix or an update. Four projects in, this feels less like a vendor we hired and more like a team we grew alongside. Recommended without hesitation.”",
    image: "/reviews/Zameer Lokhandwala.webp",
    expanded: true
  },
  {
    name: "Akarsh Arora",
    title: "Founder & CEO at A SQUARED REAL ESTATE",
    location: "UAE",
    countryCode: "ae",
    quote: "“Scalepods helped me automate my business processes using Claude, making everything much faster and more efficient. Highly recommended!”",
    image: "/reviews/Akarsh Arora.webp"
  },
  {
    name: "Vinay Kumar",
    title: "Managing Director at Lotus Manor",
    location: "Dubai, UAE",
    countryCode: "ae",
    quote: "“We needed an AI agent that wouldn't embarrass us in front of investors. Scalepods delivered it — and made the process easy. They were quick to respond, quick to iterate, and treated our launch deadline like their own. The kind of partner you want when the work has to be right and the timeline is tight.”",
    image: "/reviews/Vinay Kumar.webp"
  },
  {
    name: "Joaquin Cornejo",
    title: "Controller at MACRO",
    location: "Los Angeles, USA",
    countryCode: "us",
    quote: "“Very fast and competent team. I got too busy with other work to be able to keep up with their pace. I will rehire them once I free up.”",
    image: "/reviews/joaquin-cornejo-v2.webp"
  },
  {
    name: "Anuj Ruia",
    title: "Co-Founder at BECO",
    location: "Mumbai, India",
    countryCode: "in",
    quote: "“Truly impressive. The AI assistant is fast, accurate, and blends into our daily ops without friction. What stood out most was how quickly the team understood our workflow and customized the automation around it. The implementation felt seamless from day one, and the support throughout the process was proactive and reliable. Scalepods helped us simplify operations without slowing the team down.”",
    image: "/reviews/Anuj Ruia.jpeg"
  },
  {
    name: "Sharan Lekhi",
    title: "Founder at Krafty Animations",
    location: "Mumbai, India",
    countryCode: "in",
    quote: "“Game-changer. Automation flows run flawlessly. Our team now focuses only on what really matters. Scalepods helped us streamline communication, reduce manual coordination, and improve overall execution speed. The workflows are reliable, easy to manage, and built with real operational understanding. It’s one of the few systems we adopted that immediately started saving us valuable time.”",
    image: "/reviews/Sharan Lekhi.jpeg"
  },
  {
    name: "Shreyansh Jaiswal",
    title: "Founder at HobbyFi",
    location: "Bangalore, India",
    countryCode: "in",
    quote: "“Smooth setup. Their system replaced three tools. We saw improvements in just the first week. The onboarding process was quick, the automation logic was easy to understand, and everything integrated well with our existing workflow. Scalepods made the transition feel effortless while improving response times and reducing operational overhead across multiple tasks.”",
    image: "/reviews/Shreyansh Jaiswal.avif"
  },
  {
    name: "Dhairya Shah",
    title: "Partner & CEO at Break The Code",
    location: "Ahmedabad, India",
    countryCode: "in",
    quote: "“Very intuitive. No fluff, just performance. Our internal processes finally feel under control. The automation setup was thoughtfully structured and aligned well with our team’s daily operations. What impressed us most was the balance between flexibility and reliability. Scalepods delivered a system that feels efficient, scalable, and genuinely useful in day-to-day execution.”",
    image: "/reviews/Dhairya Shah.avif"
  },
  {
    name: "Luis Guilherme",
    title: "Founder at Guileo AI",
    location: "New York, USA",
    countryCode: "us",
    quote: "“Working with Scalepods on our Restaurant Management System was an outstanding experience from start to finish. They delivered a project with the kind of professionalism and dedication you rarely find — clear communication throughout, zero surprises, and results that exceeded expectations.\n\nWhat truly set Scalepods apart was there commitment to quality. Every detail was handled with care, and he approached every challenge with a solution-oriented mindset rather than making excuses.\n\nThey kept us informed at every stage, was fully accountable for outcomes, and always showed up ready to deliver.\n\nThe system they built is rock-solid, well-structured, and exactly what we envisioned. It's clear this is someone who takes pride in their craft.\n\nHighly recommended — without reservation. We're already planning our next collaboration, and I look forward to a long-term partnership. If you're looking for a developer who combines technical excellence with genuine reliability, Scalepods is your choice.\n\n10/10 — Wil work again and again with ScalePods.”",
    image: "/reviews/Luis Guilherme.gif",
    expanded: true // Explicitly marked as using the expandable review UI
  },
  {
    name: "Taslim Kausar Attar",
    title: "Property Manager at Lootah Group of Companies",
    location: "UAE",
    countryCode: "ae",
    quote: "“I have been trying to find a solution to create a Procurement Website as per my vision and requirement which is a step up to E-Learning and with current AI automation.\n\nScalepods has fulfilled all the requirements...It was great experience to work with everyone related to Scalepods.\n\nWould like to especially thank Mr. Adnan Shaikh, Mr. Raunak Kumar for listening to all my requirements and assuring to fulfill it and Mr. Viraj Goswami and Mr. Mithul are the brains behind creating a fantastic website which not just fulfills the procurement need, dashboard, comparison of price with new and previous data also provides whatsapp as well as email connectivity to get new quotations.\nThank you so much everyone at Scalepods.”",
    image: "/reviews/TASLIM.webp",
    expanded: true
  }
];

// Reusable Testimonial Text component with Expandable review UI enhancement
interface TestimonialTextProps {
  quote: string;
  isMobile: boolean;
  resolvedTheme: string;
  isExpanded: boolean;
  setIsExpanded: (val: boolean) => void;
  canExpand: boolean;
}

const TestimonialText: React.FC<TestimonialTextProps> = ({ 
  quote, 
  isMobile, 
  resolvedTheme, 
  isExpanded, 
  setIsExpanded,
  canExpand
}) => {
  if (!canExpand) {
    return (
      <p style={{
        fontFamily: F.inter, 
        fontSize: isMobile ? "13px" : "14px", 
        color: C.txtBody, 
        lineHeight: 1.65, 
        margin: 0,
        fontWeight: 400,
        opacity: 0.9,
        textAlign: "left",
        wordBreak: "break-word"
      }}>
        {quote}
      </p>
    );
  }

  // Increased collapsedHeight by 40-60px to show 2-3 additional lines of text naturally
  const collapsedHeight = isMobile ? 120 : 160;

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <motion.div
        animate={{ height: isExpanded ? "auto" : collapsedHeight }}
        transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
        style={{
          position: "relative",
          overflow: "hidden",
          width: "100%"
        }}
      >
        <p style={{
          fontFamily: F.inter, 
          fontSize: isMobile ? "13px" : "14px", 
          color: C.txtBody, 
          lineHeight: 1.65, 
          margin: 0,
          fontWeight: 400,
          opacity: 0.9,
          textAlign: "left",
          wordBreak: "break-word",
          whiteSpace: "pre-line"
        }}>
          {quote}
        </p>
        
        <AnimatePresence>
          {!isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "36px",
                background: resolvedTheme === 'dark'
                  ? "linear-gradient(to top, rgba(10, 15, 30, 0.95) 0%, rgba(10, 15, 30, 0) 100%)"
                  : "linear-gradient(to top, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0) 100%)",
                pointerEvents: "none"
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsExpanded(!isExpanded);
        }}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          marginTop: "12px",
          fontFamily: F.inter,
          fontSize: "12px",
          fontWeight: 600,
          color: "var(--sp-accent, #63A5E7)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          alignSelf: "flex-start",
          outline: "none"
        }}
      >
        <motion.span
          style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
          whileHover={{ x: isExpanded ? 0 : 2 }}
        >
          {isExpanded ? "Collapse Review" : "Read More →"}
        </motion.span>
      </button>
    </div>
  );
};

export default function TestimonialCarousel({ reviews }: { reviews?: ReviewItem[] } = {}) {
  const data = reviews || reviewsData;
  const [active, setActive] = useState(0);
  const [isCenterExpanded, setIsCenterExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const rawIsMobile = useMobile(768);
  const isMobile = mounted ? rawIsMobile : false;
  const isDesktop = !isMobile;
  const { resolvedTheme } = useTheme();
  const carouselRef = useRef(null);
  const isInView = useInView(carouselRef, { once: false, amount: 0.2 });

  useEffect(() => {
    setMounted(true);
  }, []);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % data.length);
    setIsCenterExpanded(false);
  }, [data.length]);

  const prev = useCallback(() => {
    setActive((prev) => (prev - 1 + data.length) % data.length);
    setIsCenterExpanded(false);
  }, [data.length]);

  // Autoplay — ONLY starts when section is in view and not expanded
  useEffect(() => {
    if (!isInView || isCenterExpanded) return;
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next, isInView, isCenterExpanded]);

  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    if (offset.x > 50) {
      prev();
    } else if (offset.x < -50) {
      next();
    }
  };

  const getCardStyles = (index: number) => {
    const total = data.length;
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

  const currentMobileReview = data[active];
  const canMobileExpand = currentMobileReview ? (currentMobileReview.expanded !== false && (currentMobileReview.expanded === true || currentMobileReview.quote.length > 420)) : false;
  const mobileCardStyles = getCardStyles(active);

  if (!mounted) {
    return (
      <div 
        className="relative w-full max-w-full"
        style={{
          minHeight: "440px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    );
  }

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
          // Adjusted wrapper minHeight to fit the taller base cards nicely
          minHeight: isMobile ? "auto" : (isCenterExpanded ? "640px" : "440px"), 
          height: isMobile ? "auto" : undefined,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          overflow: isMobile ? "hidden" : "visible",
          transition: "min-height 0.4s cubic-bezier(0.32, 0.72, 0, 1)"
        }}
      >
        {isMobile ? (
          <AnimatePresence initial={false} mode="wait">
            {currentMobileReview && (
              <motion.div
                key={currentMobileReview.name}
                initial={{ opacity: 0, x: 50 }}
                animate={{
                  x: 0,
                  y: 0,
                  scale: 1,
                  opacity: 1,
                  zIndex: mobileCardStyles.zIndex,
                  filter: "none",
                }}
                exit={{ opacity: 0, x: -50 }}
                transition={{
                  duration: 0.4,
                  ease: [0.32, 0.72, 0, 1],
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                style={{
                  position: "relative",
                  pointerEvents: "auto",
                  cursor: "grab",
                  width: "92%",
                  maxWidth: "360px",
                  marginInline: "auto",
                  // Increased mobile card min-height by 60px to allow breathing room and prevent overflow
                  minHeight: "360px",
                  height: "auto",
                  background: resolvedTheme === 'dark' ? "rgba(10, 15, 30, 0.6)" : "rgba(255, 255, 255, 0.7)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: `1px solid rgba(var(--sp-accent-rgb, 99, 165, 231), ${resolvedTheme === 'dark' ? '0.5' : '0.4'})`,
                  borderRadius: "28px",
                  overflow: "hidden",
                  // Increased mobile card padding for vertical breathing room
                  padding: "36px 24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  gap: "16px",
                  boxShadow: resolvedTheme === 'dark'
                    ? "0 30px 60px -12px rgba(0, 0, 0, 0.7), 0 0 30px rgba(var(--sp-accent-rgb, 99, 165, 231), 0.15), inset 0 1px 1px rgba(255,255,255,0.05)"
                    : "0 25px 50px -12px rgba(var(--sp-accent-rgb, 99, 165, 231), 0.15), 0 0 20px rgba(var(--sp-accent-rgb, 99, 165, 231), 0.1), inset 0 1px 0 rgba(255,255,255,0.6)",
                }}
                className="transform-gpu"
              >
                <div style={{
                  position: "absolute",
                  top: "0",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "80%",
                  height: "40%",
                  background: resolvedTheme === 'dark'
                    ? "radial-gradient(circle, rgba(var(--sp-accent-rgb, 99, 165, 231), 0.08) 0%, transparent 80%)"
                    : "radial-gradient(circle, rgba(var(--sp-accent-rgb, 99, 165, 231), 0.05) 0%, transparent 80%)",
                  zIndex: -1,
                  pointerEvents: "none"
                }} />

                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ 
                    position: "relative", 
                    width: "44px", 
                    height: "44px", 
                    borderRadius: "12px", 
                    overflow: "hidden", 
                    border: `1px solid ${resolvedTheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`, 
                    flexShrink: 0 
                  }}>
                    <Image 
                      src={currentMobileReview.image} 
                      alt={currentMobileReview.name} 
                      fill 
                      className="object-cover" 
                      sizes="64px"
                      unoptimized={currentMobileReview.image.endsWith(".gif")}
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontFamily: F.inter, fontSize: "15px", fontWeight: 700, color: C.txtBright }}>{currentMobileReview.name}</span>
                    <span style={{ 
                      fontFamily: F.inter, 
                      fontSize: "10px", 
                      color: resolvedTheme === 'dark' ? "rgba(var(--sp-accent-rgb, 99, 165, 231), 0.8)" : "rgba(0, 0, 0, 0.6)", 
                      marginTop: "1px", 
                      fontWeight: 500,
                      textTransform: "uppercase",
                      letterSpacing: "0.02em"
                    }}>{currentMobileReview.title}</span>
                    {/* Location and Flag (Mobile) */}
                    <div style={{ 
                      fontFamily: F.inter, 
                      fontSize: "12px", 
                      color: resolvedTheme === 'dark' ? "rgba(255, 255, 255, 0.65)" : "rgba(0, 0, 0, 0.65)", 
                      marginTop: "4px", 
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontWeight: 500
                    }}>
                      <img 
                        src={`https://flagcdn.com/${currentMobileReview.countryCode}.svg`} 
                        style={{ width: "16px", height: "12px", borderRadius: "1.5px", objectFit: "cover", display: "inline-block" }} 
                        alt={currentMobileReview.location} 
                      />
                      <span>{currentMobileReview.location}</span>
                    </div>
                  </div>
                </div>

                <div style={{ width: "100%", height: "1px", background: resolvedTheme === 'dark' ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }} />

                <div style={{ display: "flex", alignItems: "flex-start", width: "100%" }}>
                  <TestimonialText
                    quote={currentMobileReview.quote}
                    isMobile={true}
                    resolvedTheme={resolvedTheme || "dark"}
                    isExpanded={isCenterExpanded}
                    setIsExpanded={setIsCenterExpanded}
                    canExpand={canMobileExpand}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        ) : (
          <AnimatePresence initial={false}>
            {data.map((review, i) => {
              const { x, scale, opacity, zIndex, filter, pointerEvents, isCenter } = getCardStyles(i);
              // Adjusted character threshold from 240 to 420 since the collapsed container now holds 2-3 extra lines
              const canExpand = review.expanded !== false && (review.expanded === true || review.quote.length > 420);

              return (
                <motion.div
                  key={review.name}
                  initial={false}
                  animate={{
                    x,
                    scale,
                    opacity,
                    zIndex,
                    filter,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                  }}
                >
                  <motion.div
                    drag={isCenter && !isDesktop ? "x" : false}
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
                      left: "50%",
                      top: "50%",
                      x: "-50%",
                      y: "-50%",
                      pointerEvents: pointerEvents as any,
                      cursor: (isCenter && !isDesktop) ? "grab" : (isCenter ? "default" : "pointer"),
                      width: "90%",
                      maxWidth: "520px",
                      // Increased desktop base card height by 160px (approx 100px base + padding differences) for a more spacious layout
                      minHeight: "380px",
                      height: "auto",
                      background: resolvedTheme === 'dark' ? "rgba(10, 15, 30, 0.6)" : "rgba(255, 255, 255, 0.7)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      border: isCenter 
                        ? `1px solid rgba(var(--sp-accent-rgb, 99, 165, 231), ${resolvedTheme === 'dark' ? '0.5' : '0.4'})`
                        : `1px solid rgba(var(--sp-accent-rgb, 99, 165, 231), ${resolvedTheme === 'dark' ? '0.1' : '0.05'})`,
                      borderRadius: "28px",
                      overflow: "hidden",
                      // Increased padding for desktop from 32px 24px to 40px 32px
                      padding: "40px 32px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      gap: "18px",
                      boxShadow: isCenter 
                        ? resolvedTheme === 'dark'
                          ? "0 30px 60px -12px rgba(0, 0, 0, 0.7), 0 0 30px rgba(var(--sp-accent-rgb, 99, 165, 231), 0.15), inset 0 1px 1px rgba(255,255,255,0.05)"
                          : "0 25px 50px -12px rgba(var(--sp-accent-rgb, 99, 165, 231), 0.15), 0 0 20px rgba(var(--sp-accent-rgb, 99, 165, 231), 0.1), inset 0 1px 0 rgba(255,255,255,0.6)"
                        : "0 10px 30px rgba(0,0,0,0.05)",
                    }}
                    className="transform-gpu"
                  >
                    {isCenter && (
                      <div style={{
                        position: "absolute",
                        top: "0",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "80%",
                        height: "40%",
                        background: resolvedTheme === 'dark'
                          ? "radial-gradient(circle, rgba(var(--sp-accent-rgb, 99, 165, 231), 0.08) 0%, transparent 80%)"
                          : "radial-gradient(circle, rgba(var(--sp-accent-rgb, 99, 165, 231), 0.05) 0%, transparent 80%)",
                        zIndex: -1,
                        pointerEvents: "none"
                      }} />
                    )}

                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <div style={{ 
                        position: "relative", 
                        width: "48px", 
                        height: "48px", 
                        borderRadius: "12px", 
                        overflow: "hidden", 
                        border: `1px solid ${resolvedTheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`, 
                        flexShrink: 0 
                      }}>
                        <Image 
                          src={review.image} 
                          alt={review.name} 
                          fill 
                          className="object-cover" 
                          sizes="64px"
                          unoptimized={review.image.endsWith(".gif")}
                        />
                      </div>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontFamily: F.inter, fontSize: "16px", fontWeight: 700, color: C.txtBright }}>{review.name}</span>
                        <span style={{ 
                          fontFamily: F.inter, 
                          fontSize: "11px", 
                          color: resolvedTheme === 'dark' ? "rgba(var(--sp-accent-rgb, 99, 165, 231), 0.8)" : "rgba(0, 0, 0, 0.6)", 
                          marginTop: "1px", 
                          fontWeight: 500,
                          textTransform: "uppercase",
                          letterSpacing: "0.02em"
                        }}>{review.title}</span>
                        {/* Location and Flag (Desktop) */}
                        <div style={{ 
                          fontFamily: F.inter, 
                          fontSize: "12px", 
                          color: resolvedTheme === 'dark' ? "rgba(255, 255, 255, 0.65)" : "rgba(0, 0, 0, 0.65)", 
                          marginTop: "4px", 
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          fontWeight: 500
                        }}>
                          <img 
                            src={`https://flagcdn.com/${review.countryCode}.svg`} 
                            style={{ width: "16px", height: "12px", borderRadius: "1.5px", objectFit: "cover", display: "inline-block" }} 
                            alt={review.location} 
                          />
                          <span>{review.location}</span>
                        </div>
                      </div>
                    </div>

                    <div style={{ width: "100%", height: "1px", background: resolvedTheme === 'dark' ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }} />

                    <div style={{ display: "flex", alignItems: "flex-start", width: "100%" }}>
                      <TestimonialText
                        quote={review.quote}
                        isMobile={false}
                        resolvedTheme={resolvedTheme || "dark"}
                        isExpanded={isCenter ? isCenterExpanded : false}
                        setIsExpanded={setIsCenterExpanded}
                        canExpand={canExpand}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
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
        {data.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setActive(i);
              setIsCenterExpanded(false);
            }}
            className="transition-all duration-300 rounded-full"
            style={{
              width: active === i ? "24px" : "8px",
              height: "8px",
              background: active === i ? "var(--sp-accent, #63A5E7)" : resolvedTheme === 'dark' ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
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
