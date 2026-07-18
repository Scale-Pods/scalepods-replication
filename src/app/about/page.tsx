"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/providers/ThemeProvider";
import Link from "next/link";
import { ArrowRight, MessageSquare, TrendingUp, Rocket, Plus, Zap, Bot, Sparkles, ShieldCheck } from "lucide-react";
import { BeamsBackground } from "@/components/ui/beams-background";
import { CoreValuesOrbit } from "@/components/ui/core-values-orbit";
import { CustomerSupportAnimation } from "@/components/ui/customer-support-animation";
import ApplyModal from "@/components/ui/ApplyModal";
import { useMobile } from "@/lib/hooks";

const storyTabs = [
  {
    id: "how-it-started",
    label: "How it started",
    icon: MessageSquare,
    title: "What started as a conversation between friends...",
    image: "/images/story/how_it_started.webp",
    paragraphs: [
      "ScalePods began with a conversation between two friends who had spent years solving different sides of the same business problem.",
      "Adnan came from years of leading high-performing sales teams, where he saw firsthand how much time was lost to repetitive tasks. Teams were spending countless hours on prospecting, follow-ups, manual CRM updates, and operational overhead instead of focusing on what they did best: building relationships and closing business.",
      "Raunak, with years of experience in product management, technology, and business growth, had been thinking about the same challenge from a different perspective. As businesses scaled, he saw teams adding more people before fixing inefficient business processes."
    ],
    ctaText: "See ScalePods Solutions",
    ctaLink: "/global"
  },
  {
    id: "built-to-grow",
    label: "Built to grow",
    icon: TrendingUp,
    title: "Redesigning the way businesses operate.",
    image: "/images/story/built_to_grow.webp",
    paragraphs: [
      "As they started experimenting with AI and automation initially to solve sales challenges, they quickly realized the same inefficiencies existed across marketing, operations, hiring, client support, and other business functions.",
      "Around the same time, Palashy brought another important dimension to the vision. Coming from a holistic marketing background, she understood that sustainable growth isn't driven by technology alone. It comes from aligning brand, marketing, and the right client journey into one cohesive strategy.",
      "Her perspective helped shape ScalePods into a company that builds solutions around business problems, not just automation. The real opportunity was to redesign the way businesses operated by combining the right processes with the right and latest technology."
    ],
    ctaText: "Book an Automation Audit",
    ctaLink: "/contact"
  },
  {
    id: "infinity",
    label: "To infinity and beyond",
    icon: Rocket,
    title: "Scaling without unnecessary complexity.",
    image: "/images/story/infinity.webp",
    paragraphs: [
      "Together, they built ScalePods with one mission: to help businesses scale through intelligent systems that eliminate repetitive work, streamline operations, and allow teams to focus on innovation, client relationships, and growth.",
      "Today, ScalePods partners with ambitious businesses to build AI-powered workflows that make organisations leaner, faster, and ready to scale.",
      "What started as a conversation between friends has grown into a team united by one belief: Every business should be able to scale without unnecessary complexity."
    ],
    ctaText: "Get in Touch",
    ctaLink: "/contact"
  }
];

const founders = [
  {
    id: "adnan",
    name: "Adnan Shaikh",
    title: "Co-Founder & CEO",
    image: "/images/team/adnan.jpeg",
    bio: "Adnan Shaikh is the Co-founder and CEO of ScalePods with years of experience leading sales operations, revenue growth, and team building. With a focus on business development and operational efficiency, he specializes in building high-performing sales strategies and automating complex CRM workflows. At ScalePods, he drives client relations and operational strategy, helping growing businesses eliminate repetitive work and achieve scalable growth."
  },
  {
    id: "raunak",
    name: "Raunak Kumar",
    title: "Co-Founder, CPO & CTO",
    image: "/images/team/raunak.jpeg",
    bio: "Raunak Kumar is the Co-founder, CPO & CTO of ScalePods with years of experience across fintech, enterprise technology, and product management. Holding an MBA in Entrepreneurship and Product Management, he has built digital products and driven business growth for both B2B and B2C organizations. At ScalePods, he leads product and technology, building AI-powered systems that help businesses scale faster, operate smarter, and solve complex business challenges."
  },
  {
    id: "palashy",
    name: "Palashy Mathur",
    title: "Co-Founder & CMO",
    image: "/images/team/palashy.jpeg",
    bio: "Palashy Mathur is the Co-founder and CMO of ScalePods and a B2B SaaS marketer with expertise in AI, workflow automation, SEO, and GTM strategy. She has spent her career helping technology companies drive growth through strategic marketing and now works with businesses to design AI-powered systems that deliver measurable business outcomes."
  }
];

export default function AboutPage() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const isMobile = useMobile(768);
  const [activeStoryTab, setActiveStoryTab] = useState("how-it-started");
  const [expandedFounders, setExpandedFounders] = useState<string[]>([]);
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [activeFocusCard, setActiveFocusCard] = useState<number>(0);
  const [isHoveringAnyCard, setIsHoveringAnyCard] = useState(false);

  useEffect(() => {
    if (isHoveringAnyCard) return;

    const interval = setInterval(() => {
      setActiveFocusCard((prev) => (prev + 1) % 5);
    }, 4000);

    return () => clearInterval(interval);
  }, [isHoveringAnyCard]);

  return (
    <main 
      style={{ 
        background: "var(--color-bg-page)", 
        color: "var(--color-text-bright)",
        minHeight: "100vh",
        overflow: "hidden"
      }}
    >
      <BeamsBackground>
        {/* SECTION 1: Our Mission */}
      <section 
        style={{ 
          position: "relative",
          padding: "160px 24px 48px 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid var(--color-border-faint)",
          overflow: "hidden"
        }}
      >
        {/* Background Video (Desktop only) */}
        {!isMobile && (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 0,
              opacity: isDark ? 0.55 : 0.45,
              filter: isDark 
                ? "hue-rotate(190deg) brightness(0.6) contrast(1.25) saturate(1.3)" 
                : "brightness(1.4) contrast(0.8) saturate(0.5) grayscale(0.1)",
              pointerEvents: "none",
              willChange: "opacity",
              backfaceVisibility: "hidden"
            }}
          >
            <source src="/videos/our-mission.mp4" type="video/mp4" />
          </video>
        )}

        {/* Video Gradient Overlay */}
        <div 
          style={{
            position: "absolute",
            inset: 0,
            background: isDark
              ? "radial-gradient(circle at 50% 50%, transparent 20%, var(--color-bg-page) 90%)"
              : "radial-gradient(circle at 50% 50%, transparent 30%, var(--color-bg-page) 95%)",
            zIndex: 1,
            pointerEvents: "none"
          }}
        />

        {/* Repeating Grid Background with Fade Mask */}
        <div 
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: isDark 
              ? "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)"
              : "linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            backgroundPosition: "center",
            maskImage: "radial-gradient(circle, black 50%, transparent 95%)",
            WebkitMaskImage: "radial-gradient(circle, black 50%, transparent 95%)",
            pointerEvents: "none",
            zIndex: 2
          }}
        />

        {/* Ambient Glows */}
        <div 
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "500px",
            height: "500px",
            borderRadius: "full",
            background: isDark ? "rgba(177, 217, 151, 0.04)" : "rgba(177, 217, 151, 0.08)",
            filter: "blur(100px)",
            pointerEvents: "none",
            zIndex: 1
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            {/* Left Column: Tag and Badges */}
            <div className="lg:col-span-6 flex flex-col items-center">
              {/* Subtitle / Tag */}
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: "#050816",
                  marginBottom: "28px",
                  background: "#B1D997",
                  padding: "6px 16px",
                  borderRadius: "20px",
                  border: "1px solid transparent"
                }}
              >
                Our Mission
              </motion.div>

              {/* Bold Statement Badges Container */}
              <div 
                style={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  alignItems: "center", 
                  gap: "24px",
                  width: "100%"
                }}
              >
                {/* Row 1: To design and deploy practical AI solutions */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
                  animate={{ opacity: 1, scale: 1, rotate: -1.8 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  whileHover={{ scale: 1.03, rotate: -0.5, transition: { duration: 0.2 } }}
                  style={{
                    background: isDark ? "rgba(177, 217, 151, 0.12)" : "rgba(177, 217, 151, 0.22)",
                    color: isDark ? "#B1D997" : "#1a3d0a",
                    border: isDark ? "1px solid rgba(177, 217, 151, 0.25)" : "1px solid rgba(177, 217, 151, 0.55)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    fontFamily: "var(--font-instrument), Georgia, serif",
                    fontSize: "clamp(18px, 2.5vw, 32px)",
                    fontWeight: 400,
                    letterSpacing: "-0.01em",
                    padding: "10px 24px",
                    borderRadius: "8px",
                    boxShadow: isDark
                      ? "0 8px 32px rgba(177, 217, 151, 0.05)"
                      : "0 8px 32px rgba(143, 188, 106, 0.18), inset 0 1px 0 rgba(255,255,255,0.6)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "default",
                    textAlign: "center"
                  }}
                >
                  To design and deploy practical AI solutions
                </motion.div>

                {/* Row 2: that simplify operations, increase productivity, */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
                  animate={{ opacity: 1, scale: 1, rotate: 1.5 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  whileHover={{ scale: 1.03, rotate: 0, transition: { duration: 0.2 } }}
                  style={{
                    background: isDark ? "rgba(109, 182, 255, 0.12)" : "rgba(109, 182, 255, 0.2)",
                    color: isDark ? "#6DB6FF" : "#003d7a",
                    border: isDark ? "1px solid rgba(109, 182, 255, 0.25)" : "1px solid rgba(109, 182, 255, 0.5)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "clamp(15px, 2.2vw, 26px)",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "-0.02em",
                    padding: "8px 24px",
                    borderRadius: "8px",
                    boxShadow: isDark
                      ? "0 8px 32px rgba(109, 182, 255, 0.05)"
                      : "0 8px 32px rgba(0, 106, 220, 0.18), inset 0 1px 0 rgba(255,255,255,0.6)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "default",
                    textAlign: "center"
                  }}
                >
                  that simplify operations, increase productivity,
                </motion.div>

                {/* Row 3: and help businesses grow without adding complexity. */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                  animate={{ opacity: 1, scale: 1, rotate: -0.8 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  whileHover={{ scale: 1.03, rotate: 0, transition: { duration: 0.2 } }}
                  style={{
                    background: isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(255, 255, 255, 0.55)",
                    color: isDark ? "var(--color-text-bright)" : "#1e293b",
                    border: isDark ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid rgba(148, 163, 184, 0.4)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    fontFamily: "var(--font-instrument), Georgia, serif",
                    fontSize: "clamp(18px, 2.5vw, 32px)",
                    fontWeight: 400,
                    letterSpacing: "-0.01em",
                    padding: "10px 24px",
                    borderRadius: "8px",
                    boxShadow: isDark
                      ? "0 8px 32px rgba(255, 255, 255, 0.02)"
                      : "0 8px 32px rgba(15, 23, 42, 0.1), inset 0 1px 0 rgba(255,255,255,0.8)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "default",
                    textAlign: "center"
                  }}
                >
                  and help businesses grow without adding complexity.
                </motion.div>
              </div>
            </div>

            {/* Right Column: Paragraphs */}
            <div className="lg:col-span-6 flex flex-col gap-6 lg:gap-8">

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "clamp(16px, 1.4vw, 19px)",
                  lineHeight: "1.75",
                  color: "var(--color-text-mid)",
                  textAlign: "justify",
                  fontWeight: 400,
                  margin: 0
                }}
              >
                Most businesses do not fail because they run out of ambition. They struggle because growth introduces complexity faster than teams can manage it. Repetitive tasks pile up, systems stop talking to each other, and reporting turns into a full time job of its own.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "clamp(16px, 1.4vw, 19px)",
                  lineHeight: "1.75",
                  color: "var(--color-text-mid)",
                  textAlign: "justify",
                  fontWeight: 400,
                  margin: 0
                }}
              >
                Our mission is to remove that weight. We build practical AI and automation that takes the repetitive work off your team's plate, so your people can spend their time on what actually needs a human mind: strategy, relationships, and judgment calls.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: 0.3 }}
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "clamp(16px, 1.4vw, 19px)",
                  lineHeight: "1.75",
                  color: "var(--color-text-mid)",
                  textAlign: "justify",
                  fontWeight: 400,
                  margin: 0
                }}
              >
                We are not here to sell you more software. We are here to help you run leaner, move faster, and grow without your operations buckling under the pressure.
              </motion.p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: Our Vision */}
      <section 
        style={{ 
          position: "relative",
          padding: "48px 24px 48px 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid var(--color-border-faint)"
        }}
      >
        {/* Repeating Grid Background with Fade Mask */}
        <div 
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: isDark 
              ? "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)"
              : "linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            backgroundPosition: "center",
            maskImage: "radial-gradient(circle, black 50%, transparent 95%)",
            WebkitMaskImage: "radial-gradient(circle, black 50%, transparent 95%)",
            pointerEvents: "none",
            zIndex: 1
          }}
        />

        {/* Ambient Glows */}
        <div 
          style={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "500px",
            height: "500px",
            borderRadius: "full",
            background: isDark ? "rgba(109, 182, 255, 0.04)" : "rgba(109, 182, 255, 0.08)",
            filter: "blur(100px)",
            pointerEvents: "none",
            zIndex: 0
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* Left Column: Context Paragraphs */}
            <div className="lg:col-span-6 flex flex-col gap-6 lg:gap-8 text-left pt-12 lg:pt-[140px]" style={{ marginTop: "2cm" }}>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: 0.05 }}
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "clamp(16px, 1.4vw, 19px)",
                  lineHeight: "1.75",
                  color: "var(--color-text-mid)",
                  textAlign: "justify",
                  fontWeight: 400,
                  margin: 0
                }}
              >
                To create a future where every business can scale effortlessly through AI, automation, and intelligent systems.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6 }}
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "clamp(16px, 1.4vw, 19px)",
                  lineHeight: "1.75",
                  color: "var(--color-text-mid)",
                  textAlign: "justify",
                  fontWeight: 400,
                  margin: 0
                }}
              >
                Large enterprises have had access to intelligent systems and automation for years. Growing businesses have not had the same advantage, mostly because that level of technology has been priced and built for companies that already have large teams and bigger budgets.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "clamp(16px, 1.4vw, 19px)",
                  lineHeight: "1.75",
                  color: "var(--color-text-mid)",
                  textAlign: "justify",
                  fontWeight: 400,
                  margin: 0
                }}
              >
                We want to close that gap. Our vision is a world where any growing business, not just the ones with enterprise budgets, can access automation that is genuinely useful, easy to adopt, and built around outcomes rather than features.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "clamp(16px, 1.4vw, 19px)",
                  lineHeight: "1.75",
                  color: "var(--color-text-mid)",
                  textAlign: "justify",
                  fontWeight: 400,
                  margin: 0
                }}
              >
                We measure our progress not by how much technology we deploy, but by how much simpler, faster, and more profitable our clients' operations become because of it.
              </motion.p>
            </div>
            
            {/* Right Column: Tag, Headline, Image and CTA */}
            <div className="lg:col-span-6 flex flex-col items-center text-center">
              {/* Subtitle / Tag */}
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: "#050816",
                  marginBottom: "24px",
                  background: "#6DB6FF",
                  padding: "6px 16px",
                  borderRadius: "20px",
                  border: "1px solid transparent"
                }}
              >
                Our Vision
              </motion.div>

              {/* Editorial Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "clamp(24px, 2.8vw, 36px)",
                  fontWeight: 800,
                  lineHeight: "1.2",
                  textAlign: "center",
                  color: "var(--color-text-bright)",
                  maxWidth: "100%",
                  marginBottom: "28px",
                  letterSpacing: "-0.02em"
                }}
              >
                To become the most trusted <span style={{ color: "#B1D997", whiteSpace: "nowrap" }}>AI Automation Partner</span> for growing businesses, everywhere.
              </motion.h2>

              {/* Dynamic Theme-Based Vision Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                whileHover={{ scale: 1.01 }}
                style={{
                  position: "relative",
                  width: "100%",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: isDark
                    ? "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(109, 182, 255, 0.03)"
                    : "0 25px 50px -12px rgba(5, 8, 22, 0.08)",
                  border: isDark 
                    ? "1px solid rgba(255, 255, 255, 0.08)" 
                    : "1px solid rgba(5, 8, 22, 0.06)",
                  aspectRatio: "1400/781",
                  marginBottom: "32px"
                }}
              >
                <motion.img
                  key={isDark ? "dark" : "light"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  src={isDark ? "/images/story/our_vision_dark.webp" : "/images/story/our_vision_light.webp"}
                  alt="ScalePods Vision and Mission illustration"
                  width={2800}
                  height={1562}
                  fetchPriority="high"
                  decoding="async"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    imageRendering: "-webkit-optimize-contrast",
                  }}
                  draggable="false"
                />
              </motion.div>

              {/* CTA Button Treatment */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                style={{ width: "100%", display: "flex", justifyContent: "center" }}
              >
                <Link href="/global#immersive-features" style={{ textDecoration: "none" }}>
                  <div style={{ position: "relative", display: "inline-block" }}>
                    {/* Ambient Glow behind button */}
                    <motion.div
                      animate={{
                        opacity: isDark ? [0.15, 0.3, 0.15] : [0.08, 0.15, 0.08],
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      style={{
                        position: "absolute",
                        inset: "-6px",
                        background: "rgba(177, 217, 151, 0.2)",
                        filter: "blur(12px)",
                        borderRadius: "14px",
                        zIndex: 0,
                        pointerEvents: "none"
                      }}
                    />

                    <div
                      style={{
                        position: "relative",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "10px",
                        fontFamily: "var(--font-inter), sans-serif",
                        fontSize: "16px",
                        fontWeight: 700,
                        letterSpacing: "-0.01em",
                        
                        // Theme Adaptive Colors
                        color: isDark ? "#B1D997" : "#0f172a",
                        
                        // Background
                        background: isDark
                          ? "linear-gradient(135deg, #050816 0%, #0b1020 100%)"
                          : "linear-gradient(135deg, #B1D997 0%, #C5E4B2 50%, #D8EFCC 100%)",
                        
                        backdropFilter: isDark ? "blur(12px)" : "none",
                        WebkitBackdropFilter: isDark ? "blur(12px)" : "none",
                        border: isDark 
                          ? "1px solid rgba(177, 217, 151, 0.4)" 
                          : "1px solid rgba(177, 217, 151, 0.3)",
                        
                        borderRadius: "10px",
                        padding: "16px 36px",
                        cursor: "pointer",
                        
                        boxShadow: isDark 
                          ? "0 8px 24px -4px rgba(0, 0, 0, 0.6), 0 0 15px rgba(177, 217, 151, 0.12)" 
                          : "0 10px 20px -5px rgba(177, 217, 151, 0.2), inset 0 1px 0 rgba(255,255,255,0.4)",
                        
                        zIndex: 1,
                        transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = isDark
                          ? "0 12px 30px -4px rgba(0, 0, 0, 0.7), 0 0 20px rgba(177, 217, 151, 0.22)"
                          : "0 14px 24px -5px rgba(177, 217, 151, 0.35), inset 0 1px 0 rgba(255,255,255,0.5)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = isDark 
                          ? "0 8px 24px -4px rgba(0, 0, 0, 0.6), 0 0 15px rgba(177, 217, 151, 0.12)" 
                          : "0 10px 20px -5px rgba(177, 217, 151, 0.2), inset 0 1px 0 rgba(255,255,255,0.4)";
                      }}
                    >
                      <span>See ScalePods Solutions</span>
                      <ArrowRight style={{ width: "18px", height: "18px" }} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Who We Are */}
      <section 
        style={{ 
          position: "relative",
          padding: "48px 24px 48px 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid var(--color-border-faint)",
          background: isDark ? "rgba(4, 7, 13, 0.3)" : "rgba(248, 250, 247, 0.3)"
        }}
      >
        {/* Repeating Grid Background */}
        <div 
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: isDark 
              ? "linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)"
              : "linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            backgroundPosition: "center",
            maskImage: "radial-gradient(circle, black 60%, transparent 95%)",
            WebkitMaskImage: "radial-gradient(circle, black 60%, transparent 95%)",
            pointerEvents: "none",
            zIndex: 1
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col items-center">
          
          {/* Subtitle / Tag */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "13px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "#050816",
              marginBottom: "32px",
              background: "#B1D997",
              padding: "8px 22px",
              borderRadius: "9999px",
              border: "none"
            }}
          >
            WHO WE ARE
          </motion.div>

          {/* Intro Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(16px, 1.8vw, 20px)",
              lineHeight: "1.6",
              color: "var(--color-text-mid)",
              textAlign: "center",
              maxWidth: "800px",
              marginBottom: "72px",
              fontWeight: 400
            }}
          >
            At ScalePods, we believe great products are built by curious minds and strong ownership. These principles guide everything we do, from how we scope a project to how we show up in a client call.
          </motion.p>

          <CoreValuesOrbit />

        </div>
      </section>

      {/* SECTION 4: Our Approach */}
      <section 
        style={{ 
          position: "relative",
          padding: "48px 24px 48px 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: isDark ? "1px solid var(--color-border-faint)" : "1px solid rgba(0,0,0,0.05)",
          background: isDark ? "rgba(4, 7, 13, 0.3)" : "rgba(248, 250, 247, 0.3)"
        }}
      >
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          
          {/* Responsive Grid: Left Column for Title & Intro, Right Column for Numbered Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Column (col-span-4) - Title & Intro */}
            <div className="lg:col-span-5 flex flex-col items-start">
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "13px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: "#050816",
                  marginBottom: "28px",
                  background: "#B1D997",
                  padding: "8px 22px",
                  borderRadius: "9999px",
                  border: "none"
                }}
              >
                OUR APPROACH
              </motion.div>
 
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "clamp(30px, 3.5vw, 44px)",
                  fontWeight: 800,
                  lineHeight: "1.2",
                  color: "var(--color-text-bright)",
                  marginBottom: "16px",
                  letterSpacing: "-0.02em"
                }}
              >
                Our Approach
              </motion.h2>
 
              {/* Animated Client Support Graphic (Placed below heading) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full mb-6"
              >
                <CustomerSupportAnimation hoveredIndex={activeFocusCard} />
              </motion.div>

              {/* Quote & Description Text Block (Placed below animation) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "16px",
                  lineHeight: "1.7",
                  color: "var(--color-text-body)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "18px"
                }}
              >
                <p style={{ fontWeight: 600, fontSize: "18px", color: "var(--color-text-bright)", borderLeft: "2px solid #B1D997", paddingLeft: "16px" }}>
                  "Will this make our client's business run better?"
                </p>
                <p>
                  Everything we build starts with this single question. We spend time understanding how a business actually operates before we recommend anything.
                </p>
                <p>
                  Every automation should deliver measurable value, not just technical sophistication.
                </p>
              </motion.div>
            </div>

            {/* Right Column (col-span-7) - 5 Focus Cards Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Card 1: Faster Operations */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -4 }}
                onMouseEnter={() => {
                  setActiveFocusCard(0);
                  setIsHoveringAnyCard(true);
                }}
                onMouseLeave={() => setIsHoveringAnyCard(false)}
                style={{
                  background: isDark ? "rgba(15, 23, 42, 0.6)" : "rgba(255, 255, 255, 0.8)",
                  padding: "26px 28px",
                  borderRadius: "20px",
                  border: activeFocusCard === 0
                    ? "1.5px solid #B1D997"
                    : isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.06)",
                  boxShadow: activeFocusCard === 0
                    ? "0 15px 35px -5px rgba(177, 217, 151, 0.35)"
                    : isDark ? "0 12px 35px rgba(0,0,0,0.3)" : "0 10px 30px rgba(0,0,0,0.03)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  cursor: "pointer",
                  transition: "transform 0.2s ease, border 0.2s ease, box-shadow 0.2s ease"
                }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(177, 217, 151, 0.15)", border: "1px solid rgba(177, 217, 151, 0.3)" }}>
                  <Zap size={20} color="#B1D997" />
                </div>
                <h3 style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "20px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "10px", lineHeight: "1.3" }}>
                  Faster Operations
                </h3>
                <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "14px", lineHeight: "1.6", color: "var(--color-text-body)" }}>
                  We shorten the distance between a task starting and a task getting done. Work moves through your systems instead of sitting in someone's inbox.
                </p>
              </motion.div>

              {/* Card 2: Lower Manual Effort */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -4 }}
                onMouseEnter={() => {
                  setActiveFocusCard(1);
                  setIsHoveringAnyCard(true);
                }}
                onMouseLeave={() => setIsHoveringAnyCard(false)}
                style={{
                  background: isDark ? "rgba(15, 23, 42, 0.6)" : "rgba(255, 255, 255, 0.8)",
                  padding: "26px 28px",
                  borderRadius: "20px",
                  border: activeFocusCard === 1
                    ? "1.5px solid #6DB6FF"
                    : isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.06)",
                  boxShadow: activeFocusCard === 1
                    ? "0 15px 35px -5px rgba(109, 182, 255, 0.35)"
                    : isDark ? "0 12px 35px rgba(0,0,0,0.3)" : "0 10px 30px rgba(0,0,0,0.03)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  cursor: "pointer",
                  transition: "transform 0.2s ease, border 0.2s ease, box-shadow 0.2s ease"
                }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(109, 182, 255, 0.15)", border: "1px solid rgba(109, 182, 255, 0.3)" }}>
                  <Bot size={20} color="#6DB6FF" />
                </div>
                <h3 style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "20px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "10px", lineHeight: "1.3" }}>
                  Lower Manual Effort
                </h3>
                <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "14px", lineHeight: "1.6", color: "var(--color-text-body)" }}>
                  If a machine can do it accurately, your team should not have to. We take the repetitive, rule based work off human hands entirely.
                </p>
              </motion.div>

              {/* Card 3: Better Client Experiences */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -4 }}
                onMouseEnter={() => {
                  setActiveFocusCard(2);
                  setIsHoveringAnyCard(true);
                }}
                onMouseLeave={() => setIsHoveringAnyCard(false)}
                style={{
                  background: isDark ? "rgba(15, 23, 42, 0.6)" : "rgba(255, 255, 255, 0.8)",
                  padding: "26px 28px",
                  borderRadius: "20px",
                  border: activeFocusCard === 2
                    ? "1.5px solid #B1D997"
                    : isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.06)",
                  boxShadow: activeFocusCard === 2
                    ? "0 15px 35px -5px rgba(177, 217, 151, 0.35)"
                    : isDark ? "0 12px 35px rgba(0,0,0,0.3)" : "0 10px 30px rgba(0,0,0,0.03)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  cursor: "pointer",
                  transition: "transform 0.2s ease, border 0.2s ease, box-shadow 0.2s ease"
                }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(177, 217, 151, 0.15)", border: "1px solid rgba(177, 217, 151, 0.3)" }}>
                  <Sparkles size={20} color="#B1D997" />
                </div>
                <h3 style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "20px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "10px", lineHeight: "1.3" }}>
                  Better Client Experiences
                </h3>
                <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "14px", lineHeight: "1.6", color: "var(--color-text-body)" }}>
                  Faster response times and fewer dropped balls, every single time. Clients feel the difference before they can even name what changed.
                </p>
              </motion.div>

              {/* Card 4: Higher Team Productivity */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ y: -4 }}
                onMouseEnter={() => {
                  setActiveFocusCard(3);
                  setIsHoveringAnyCard(true);
                }}
                onMouseLeave={() => setIsHoveringAnyCard(false)}
                style={{
                  background: isDark ? "rgba(15, 23, 42, 0.6)" : "rgba(255, 255, 255, 0.8)",
                  padding: "26px 28px",
                  borderRadius: "20px",
                  border: activeFocusCard === 3
                    ? "1.5px solid #6DB6FF"
                    : isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.06)",
                  boxShadow: activeFocusCard === 3
                    ? "0 15px 35px -5px rgba(109, 182, 255, 0.35)"
                    : isDark ? "0 12px 35px rgba(0,0,0,0.3)" : "0 10px 30px rgba(0,0,0,0.03)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  cursor: "pointer",
                  transition: "transform 0.2s ease, border 0.2s ease, box-shadow 0.2s ease"
                }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(109, 182, 255, 0.15)", border: "1px solid rgba(109, 182, 255, 0.3)" }}>
                  <Rocket size={20} color="#6DB6FF" />
                </div>
                <h3 style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "20px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "10px", lineHeight: "1.3" }}>
                  Higher Team Productivity
                </h3>
                <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "14px", lineHeight: "1.6", color: "var(--color-text-body)" }}>
                  Less time spent on busywork means more time spent on the work that actually moves the business forward.
                </p>
              </motion.div>

              {/* Card 5: Sustainable Business Growth (Full-width featured card) */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{ y: -4 }}
                onMouseEnter={() => {
                  setActiveFocusCard(4);
                  setIsHoveringAnyCard(true);
                }}
                onMouseLeave={() => setIsHoveringAnyCard(false)}
                className="md:col-span-2"
                style={{
                  background: isDark
                    ? "linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(8, 13, 28, 0.8) 100%)"
                    : "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 247, 250, 0.95) 100%)",
                  padding: "26px 28px",
                  borderRadius: "20px",
                  border: activeFocusCard === 4
                    ? "1.5px solid #B1D997"
                    : isDark ? "1px solid rgba(177, 217, 151, 0.2)" : "1px solid rgba(177, 217, 151, 0.3)",
                  boxShadow: activeFocusCard === 4
                    ? "0 15px 35px -5px rgba(177, 217, 151, 0.35)"
                    : isDark ? "0 12px 35px rgba(0,0,0,0.3)" : "0 10px 30px rgba(0,0,0,0.03)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  position: "relative",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "transform 0.2s ease, border 0.2s ease, box-shadow 0.2s ease"
                }}
              >
                <div 
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: "linear-gradient(90deg, #B1D997 0%, #6DB6FF 100%)"
                  }}
                />
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(177, 217, 151, 0.15)", border: "1px solid rgba(177, 217, 151, 0.3)" }}>
                    <ShieldCheck size={20} color="#B1D997" />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "20px", fontWeight: 700, color: "var(--color-text-bright)", lineHeight: "1.3" }}>
                    Sustainable Business Growth
                  </h3>
                </div>
                <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "14px", lineHeight: "1.6", color: "var(--color-text-body)" }}>
                  Systems built to hold up as you scale, not ones your team outgrows and has to rebuild a year later.
                </p>
              </motion.div>

            </div>

          </div>

        </div>
      </section>

      {/* SECTION 5: Our Story */}
      <section 
        style={{ 
          position: "relative",
          padding: "48px 24px 48px 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid var(--color-border-faint)",
          overflow: "hidden"
        }}
      >
        {/* Background Grid */}
        <div 
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: isDark 
              ? "linear-gradient(to right, rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.015) 1px, transparent 1px)"
              : "linear-gradient(to right, rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.02) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            backgroundPosition: "center",
            maskImage: "radial-gradient(circle, black 70%, transparent 95%)",
            WebkitMaskImage: "radial-gradient(circle, black 70%, transparent 95%)",
            pointerEvents: "none",
            zIndex: 0
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center">
          
          {/* Section Tag */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "13px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "#050816",
              marginBottom: "36px",
              background: "#B1D997",
              padding: "8px 22px",
              borderRadius: "9999px",
              border: "none"
            }}
          >
            OUR STORY
          </motion.div>

            {/* Gong Style Pill Tab Controls */}
            <div 
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "16px",
                marginBottom: "36px"
              }}
            >
              {storyTabs.map((tab) => {
                const isActive = activeStoryTab === tab.id;
                const IconComponent = tab.icon;
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveStoryTab(tab.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "8px 20px",
                      borderRadius: "30px",
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: "13px",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                      outline: "none",
                      
                      // Active vs Inactive Styles
                      background: isActive 
                        ? (isDark ? "rgba(109, 182, 255, 0.08)" : "#FFFFFF")
                        : (isDark ? "rgba(255, 255, 255, 0.02)" : "#F1F5F9"),
                      color: isActive
                        ? (isDark ? "var(--color-blue-mid)" : "#0F172A")
                        : (isDark ? "var(--color-text-muted)" : "#475569"),
                      border: isActive
                        ? (isDark ? "1.5px solid var(--color-blue-mid)" : "1.5px solid #000000")
                        : (isDark ? "1px solid var(--color-border-faint)" : "1px solid transparent"),
                      boxShadow: isActive
                        ? (isDark ? "0 0 15px rgba(109, 182, 255, 0.15)" : "0 4px 12px rgba(0, 0, 0, 0.05)")
                        : "none"
                    }}
                  >
                    <IconComponent 
                      style={{ 
                        width: "14px", 
                        height: "14px",
                        color: isActive
                          ? (isDark ? "var(--color-blue-mid)" : "#0F172A")
                          : (isDark ? "var(--color-text-muted)" : "#475569")
                      }} 
                    />
                    <span>{tab.label}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Tab Contents Panel (Responsive Grid) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Narrative Copy */}
              <div className="lg:col-span-6 flex flex-col items-start text-left">
                <motion.div
                  key={activeStoryTab}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Large Statement Title */}
                  <h3 
                    style={{
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: "clamp(22px, 3vw, 32px)",
                      fontWeight: 800,
                      lineHeight: "1.3",
                      color: "var(--color-text-bright)",
                      marginBottom: "24px",
                      letterSpacing: "-0.02em"
                    }}
                  >
                    {storyTabs.find(t => t.id === activeStoryTab)?.title}
                  </h3>

                  {/* Body Paragraphs */}
                  <div 
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                      marginBottom: "24px"
                    }}
                  >
                    {storyTabs.find(t => t.id === activeStoryTab)?.paragraphs.map((p, idx) => (
                      <p 
                        key={idx}
                        style={{
                          fontFamily: "var(--font-inter), sans-serif",
                          fontSize: "14px",
                          lineHeight: "1.6",
                          color: "var(--color-text-mid)",
                          fontWeight: 400
                        }}
                      >
                        {p}
                      </p>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link 
                    href={storyTabs.find(t => t.id === activeStoryTab)?.ctaLink || "#"}
                    style={{ textDecoration: "none" }}
                  >
                    <div style={{ position: "relative", display: "inline-block" }}>
                      {/* Ambient Glow behind button */}
                      <motion.div
                        animate={{
                          opacity: isDark ? [0.15, 0.3, 0.15] : [0.08, 0.15, 0.08],
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        style={{
                          position: "absolute",
                          inset: "-6px",
                          background: "rgba(177, 217, 151, 0.2)",
                          filter: "blur(12px)",
                          borderRadius: "14px",
                          zIndex: 0,
                          pointerEvents: "none"
                        }}
                      />

                      <div
                        style={{
                          position: "relative",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "10px",
                          fontFamily: "var(--font-inter), sans-serif",
                          fontSize: "16px",
                          fontWeight: 700,
                          letterSpacing: "-0.01em",
                          
                          // Theme Adaptive Colors
                          color: isDark ? "#B1D997" : "#0f172a",
                          
                          // Background
                          background: isDark
                            ? "linear-gradient(135deg, #050816 0%, #0b1020 100%)"
                            : "linear-gradient(135deg, #B1D997 0%, #C5E4B2 50%, #D8EFCC 100%)",
                          
                          backdropFilter: isDark ? "blur(12px)" : "none",
                          WebkitBackdropFilter: isDark ? "blur(12px)" : "none",
                          border: isDark 
                            ? "1px solid rgba(177, 217, 151, 0.4)" 
                            : "1px solid rgba(177, 217, 151, 0.3)",
                          
                          borderRadius: "10px",
                          padding: "16px 36px",
                          cursor: "pointer",
                          
                          boxShadow: isDark 
                            ? "0 8px 24px -4px rgba(0, 0, 0, 0.6), 0 0 15px rgba(177, 217, 151, 0.12)" 
                            : "0 10px 20px -5px rgba(177, 217, 151, 0.2), inset 0 1px 0 rgba(255,255,255,0.4)",
                          
                          zIndex: 1,
                          transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-2px)";
                          e.currentTarget.style.boxShadow = isDark
                            ? "0 12px 30px -4px rgba(0, 0, 0, 0.7), 0 0 20px rgba(177, 217, 151, 0.22)"
                            : "0 14px 24px -5px rgba(177, 217, 151, 0.35), inset 0 1px 0 rgba(255,255,255,0.5)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = isDark 
                            ? "0 8px 24px -4px rgba(0, 0, 0, 0.6), 0 0 15px rgba(177, 217, 151, 0.12)" 
                            : "0 10px 20px -5px rgba(177, 217, 151, 0.2), inset 0 1px 0 rgba(255,255,255,0.4)";
                        }}
                      >
                        <span>{storyTabs.find(t => t.id === activeStoryTab)?.ctaText}</span>
                        <ArrowRight style={{ width: "18px", height: "18px" }} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </div>

              {/* Right Column: High Fidelity Graphic/Photo Card */}
              <div className="lg:col-span-6 flex justify-center items-center">
                <motion.div
                  key={activeStoryTab}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    position: "relative",
                    width: "100%",
                    maxWidth: "560px",
                    aspectRatio: "1.5/1",
                    borderRadius: "24px",
                    padding: "2px",
                    background: "linear-gradient(135deg, rgba(109,182,255,0.4), rgba(177,217,151,0.4), rgba(255,140,130,0.4))",
                    boxShadow: isDark
                      ? "0 20px 40px rgba(0,0,0,0.6)"
                      : "0 20px 40px rgba(0,0,0,0.1)"
                  }}
                >
                  <div 
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "#080A10",
                      borderRadius: "22px",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <img 
                      src={storyTabs.find(t => t.id === activeStoryTab)?.image} 
                      alt={storyTabs.find(t => t.id === activeStoryTab)?.label}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                      }}
                      draggable="false"
                    />
                  </div>
                </motion.div>
              </div>

            </div>
          </div>
        </section>

      {/* SECTION 6: Leading with a Shared Vision */}
      <section 
        style={{ 
          position: "relative",
          padding: "48px 24px 48px 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid var(--color-border-faint)",
          background: isDark ? "rgba(4, 7, 13, 0.2)" : "rgba(248, 250, 247, 0.2)"
        }}
      >
        {/* Background Grid & Lights */}
        <div 
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: isDark 
              ? "linear-gradient(to right, rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.015) 1px, transparent 1px)"
              : "linear-gradient(to right, rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.02) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            backgroundPosition: "center",
            maskImage: "radial-gradient(circle, black 60%, transparent 95%)",
            WebkitMaskImage: "radial-gradient(circle, black 60%, transparent 95%)",
            pointerEvents: "none",
            zIndex: 0
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center">
          {/* Section Tag */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "13px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: isDark ? "#6DB6FF" : "#050816",
              marginBottom: "32px",
              background: isDark ? "rgba(109, 182, 255, 0.12)" : "#6DB6FF",
              padding: "8px 22px",
              borderRadius: "9999px",
              border: isDark ? "1px solid rgba(109, 182, 255, 0.3)" : "none"
            }}
          >
            LEADERSHIP
          </motion.div>

          {/* Section Header */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(30px, 3.5vw, 44px)",
              fontWeight: 800,
              lineHeight: "1.2",
              textAlign: "center",
              color: "var(--color-text-bright)",
              marginBottom: "24px",
              letterSpacing: "-0.02em"
            }}
          >
            Leading with a Shared Vision
          </motion.h2>

          {/* Shared Goal Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(16px, 1.8vw, 19px)",
              lineHeight: "1.6",
              color: "var(--color-text-mid)",
              textAlign: "center",
              maxWidth: "800px",
              marginBottom: "72px",
              fontWeight: 400
            }}
          >
            Three founders, one goal: helping growing businesses operate like they already have an enterprise team behind them.
          </motion.p>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 w-full max-w-5xl">
            {founders.map((founder, idx) => {
              const isExpanded = expandedFounders.includes(founder.id);
              return (
                <motion.div
                  key={founder.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center"
                  }}
                >
                  {/* Photo Container with Elegant Border Glow on Hover */}
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "1/1",
                      borderRadius: "24px",
                      padding: "2px",
                      background: "linear-gradient(135deg, rgba(109,182,255,0.2), rgba(177,217,151,0.2), rgba(255,140,130,0.2))",
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                      boxShadow: isDark 
                        ? "0 10px 30px rgba(0,0,0,0.5)" 
                        : "0 10px 25px rgba(0,0,0,0.06)"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "linear-gradient(135deg, rgba(109,182,255,0.6), rgba(177,217,151,0.6), rgba(255,140,130,0.6))";
                      e.currentTarget.style.boxShadow = isDark 
                        ? "0 15px 40px rgba(109,182,255,0.15)" 
                        : "0 15px 35px rgba(0,0,0,0.1)";
                      const img = e.currentTarget.querySelector("img");
                      if (img) img.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "linear-gradient(135deg, rgba(109,182,255,0.2), rgba(177,217,151,0.2), rgba(255,140,130,0.2))";
                      e.currentTarget.style.boxShadow = isDark 
                        ? "0 10px 30px rgba(0,0,0,0.5)" 
                        : "0 10px 25px rgba(0,0,0,0.06)";
                      const img = e.currentTarget.querySelector("img");
                      if (img) img.style.transform = "scale(1)";
                    }}
                    onClick={() => {
                      setExpandedFounders(prev => 
                        prev.includes(founder.id) ? prev.filter(x => x !== founder.id) : [...prev, founder.id]
                      );
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        background: "#080A10",
                        borderRadius: "22px",
                        overflow: "hidden"
                      }}
                    >
                      <img
                        src={founder.image}
                        alt={founder.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)"
                        }}
                        draggable="false"
                      />
                    </div>
                  </div>

                  {/* Name and Title */}
                  <h3
                    style={{
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: "22px",
                      fontWeight: 700,
                      color: "var(--color-text-bright)",
                      marginTop: "24px",
                      marginBottom: "4px"
                    }}
                  >
                    {founder.name}
                  </h3>

                  <span
                    style={{
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#B1D997",
                      letterSpacing: "0.02em",
                      marginBottom: "16px"
                    }}
                  >
                    {founder.title}
                  </span>

                  {/* Plus Icon Trigger Button */}
                  <motion.button
                    onClick={() => {
                      setExpandedFounders(prev => 
                        prev.includes(founder.id) ? prev.filter(x => x !== founder.id) : [...prev, founder.id]
                      );
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: isExpanded
                        ? (isDark ? "rgba(255, 140, 130, 0.15)" : "#FEE2E2")
                        : (isDark ? "rgba(255,255,255,0.05)" : "#F1F5F9"),
                      border: isExpanded
                        ? (isDark ? "1px solid rgba(255, 140, 130, 0.4)" : "1px solid #FECACA")
                        : (isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #E2E8F0"),
                      color: isExpanded
                        ? (isDark ? "#FF8C82" : "#DC2626")
                        : "var(--color-text-bright)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "background 0.2s, border 0.2s, color 0.2s",
                      outline: "none",
                      marginBottom: "16px"
                    }}
                  >
                    <motion.div
                      animate={{ rotate: isExpanded ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                      <Plus style={{ width: "18px", height: "18px" }} />
                    </motion.div>
                  </motion.button>

                  {/* Expandable Bio Accordion */}
                  <div
                    style={{
                      width: "100%",
                      overflow: "hidden",
                      transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
                      maxHeight: isExpanded ? "500px" : "0px",
                      opacity: isExpanded ? 1 : 0
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-inter), sans-serif",
                        fontSize: "14px",
                        lineHeight: "1.5",
                        color: "var(--color-text-mid)",
                        background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
                        border: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(0,0,0,0.05)",
                        padding: "12px 16px",
                        borderRadius: "12px",
                        textAlign: "center"
                      }}
                    >
                      {founder.bio}
                    </p>
                  </div>

                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 7: The ScalePods Promise */}
      <section
        style={{
          width: "100%",
          padding: "48px 24px",
          background: "var(--color-bg-page)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Decorative background grid/ambient light */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "600px",
            background: isDark
              ? "radial-gradient(circle, rgba(101, 147, 69, 0.08) 0%, rgba(0,0,0,0) 70%)"
              : "radial-gradient(circle, rgba(101, 147, 69, 0.04) 0%, rgba(0,0,0,0) 70%)",
            pointerEvents: "none",
            zIndex: 1
          }}
        />

        <div
          style={{
            width: "100%",
            maxWidth: "1100px",
            position: "relative",
            zIndex: 2
          }}
        >
          {/* Outer Widget Card Container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ y: -4 }}
            style={{
              width: "100%",
              background: isDark 
                ? "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)" 
                : "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(248,250,252,0.9) 100%)",
              border: isDark 
                ? "1px solid rgba(255,255,255,0.06)" 
                : "1px solid rgba(101, 147, 69, 0.15)",
              borderRadius: "28px",
              padding: "48px",
              boxShadow: isDark
                ? "0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)"
                : "0 20px 40px rgba(101, 147, 69, 0.04), inset 0 1px 0 rgba(255,255,255,0.8)",
              backdropFilter: "blur(20px)",
              position: "relative",
              overflow: "hidden"
            }}
          >
            {/* Widget Header bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "32px",
                borderBottom: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)",
                paddingBottom: "16px"
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
              color: "#050816",
              background: "#B1D997",
              padding: "8px 22px",
              borderRadius: "9999px",
              border: "none",
              textTransform: "uppercase"
            }}
          >
            <div style={{ position: "relative", width: "8px", height: "8px" }}>
              <span
                style={{
                  display: "block",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#050816"
                }}
              />
              <span
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#050816",
                  animation: "promise-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite"
                }}
              />
                </div>
                <span>THE SCALEPODS PROMISE</span>
              </div>
            </div>

            {/* Grid Layout inside Widget */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left Side: All Text (Headline + Narrative + Slogan Box) */}
              <div className="lg:col-span-6 flex flex-col gap-6">
                <h2
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "clamp(26px, 3vw, 38px)",
                    lineHeight: "1.25",
                    color: "var(--color-text-bright)",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    margin: 0
                  }}
                >
                  Every business deserves{" "}
                  <span style={{ color: "#B1D997" }}>
                    enterprise-level
                  </span>{" "}
                  efficiency, without enterprise-level complexity.
                </h2>

                <p
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "15px",
                    lineHeight: "1.65",
                    color: "var(--color-text-mid)",
                    margin: 0
                  }}
                >
                  Whether you are streamlining internal operations, accelerating sales, improving client support, or building AI-powered experiences, we are committed to creating solutions that are practical, scalable, and built for long-term success.
                </p>

                {/* Highlight Slogan Box */}
                <div
                  style={{
                    background: isDark ? "rgba(177, 217, 151, 0.06)" : "rgba(177, 217, 151, 0.04)",
                    borderLeft: "3px solid #B1D997",
                    padding: "16px 20px",
                    borderRadius: "0 12px 12px 0"
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: "14px",
                      fontWeight: 600,
                      lineHeight: "1.5",
                      color: isDark ? "var(--color-text-bright)" : "#2C4A1A",
                      margin: 0
                    }}
                  >
                    Because growth should not require more manual work. It should require better systems.
                  </p>
                </div>
              </div>

              {/* Right Side: Theme-Adaptive Compressed Image */}
              <div className="lg:col-span-6 flex justify-center items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  style={{
                    position: "relative",
                    width: "100%",
                    borderRadius: "20px",
                    overflow: "hidden",
                    border: isDark 
                      ? "1px solid rgba(177, 217, 151, 0.2)" 
                      : "1px solid rgba(101, 147, 69, 0.15)",
                    boxShadow: isDark
                      ? "0 15px 35px rgba(0, 0, 0, 0.5)"
                      : "0 15px 35px rgba(101, 147, 69, 0.08)"
                  }}
                >
                  <motion.img
                    key={isDark ? "promise-dark" : "promise-light"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    src={isDark ? "/images/about/promise_dark.webp" : "/images/about/promise_light.webp"}
                    alt="The ScalePods Promise illustration"
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      objectFit: "cover"
                    }}
                    draggable="false"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 9: Careers at ScalePods */}
      <section
        style={{
          width: "100%",
          padding: "48px 24px",
          background: isDark ? "rgba(101, 147, 69, 0.02)" : "rgba(101, 147, 69, 0.01)",
          borderTop: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(0,0,0,0.05)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div
          className="careers-container"
          style={{
            position: "relative",
            zIndex: 2
          }}
        >
          {/* Left Column: Copy */}
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                display: "inline-block",
                alignSelf: "flex-start",
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "13px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "#050816",
                marginBottom: "28px",
                background: "#B1D997",
                padding: "8px 22px",
                borderRadius: "9999px",
                border: "none"
              }}
            >
              CAREERS AT SCALEPODS
            </motion.div>

            <h2
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "clamp(36px, 4.5vw, 52px)",
                fontWeight: 900,
                lineHeight: "1.1",
                letterSpacing: "-0.02em",
                color: "var(--color-text-bright)",
                textTransform: "uppercase",
                margin: 0
              }}
            >
              Join the team building the future of business automation
            </h2>

            <p
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "18px",
                lineHeight: "1.6",
                color: "var(--color-text-mid)",
                margin: 0
              }}
            >
              We're always looking for curious, ownership-driven people who want to build things that actually matter.
            </p>

            <div style={{ marginTop: "12px" }}>
              <div onClick={() => setIsApplyOpen(true)} style={{ textDecoration: "none", cursor: "pointer" }}>
                <div style={{ position: "relative", display: "inline-block" }}>
                  {/* Ambient Glow behind button */}
                  <motion.div
                    animate={{
                      opacity: isDark ? [0.15, 0.3, 0.15] : [0.08, 0.15, 0.08],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      position: "absolute",
                      inset: "-6px",
                      background: "rgba(177, 217, 151, 0.2)",
                      filter: "blur(12px)",
                      borderRadius: "14px",
                      zIndex: 0,
                      pointerEvents: "none"
                    }}
                  />

                  <div
                    style={{
                      position: "relative",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: "16px",
                      fontWeight: 700,
                      letterSpacing: "-0.01em",
                      
                      // Theme Adaptive Colors
                      color: isDark ? "#B1D997" : "#0f172a",
                      
                      // Background
                      background: isDark
                        ? "linear-gradient(135deg, #050816 0%, #0b1020 100%)"
                        : "linear-gradient(135deg, #B1D997 0%, #C5E4B2 50%, #D8EFCC 100%)",
                      
                      backdropFilter: isDark ? "blur(12px)" : "none",
                      WebkitBackdropFilter: isDark ? "blur(12px)" : "none",
                      border: isDark 
                        ? "1px solid rgba(177, 217, 151, 0.4)" 
                        : "1px solid rgba(177, 217, 151, 0.3)",
                      
                      borderRadius: "10px",
                      padding: "16px 36px",
                      cursor: "pointer",
                      
                      boxShadow: isDark 
                        ? "0 8px 24px -4px rgba(0, 0, 0, 0.6), 0 0 15px rgba(177, 217, 151, 0.12)" 
                        : "0 10px 20px -5px rgba(177, 217, 151, 0.2), inset 0 1px 0 rgba(255,255,255,0.4)",
                      
                      zIndex: 1,
                      transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = isDark
                        ? "0 12px 30px -4px rgba(0, 0, 0, 0.7), 0 0 20px rgba(177, 217, 151, 0.22)"
                        : "0 14px 24px -5px rgba(177, 217, 151, 0.35), inset 0 1px 0 rgba(255,255,255,0.5)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = isDark 
                        ? "0 8px 24px -4px rgba(0, 0, 0, 0.6), 0 0 15px rgba(177, 217, 151, 0.12)" 
                        : "0 10px 20px -5px rgba(177, 217, 151, 0.2), inset 0 1px 0 rgba(255,255,255,0.4)";
                    }}
                  >
                    <span>Explore Open Roles</span>
                    <ArrowRight style={{ width: "18px", height: "18px" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Collage */}
          <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <div className="careers-collage">
              <div className="collage-item collage-img-1">
                <img
                  src="/images/careers/architects_thumbs_up.webp"
                  alt="Architects making thumbs up gesture"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "16px",
                    border: isDark ? "2px solid rgba(255,255,255,0.08)" : "2px solid rgba(0,0,0,0.05)"
                  }}
                />
              </div>
              <div className="collage-item collage-img-2">
                <img
                  src="/images/careers/businesswoman_folder.webp"
                  alt="Happy businesswoman holding folder"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "16px",
                    border: isDark ? "2px solid rgba(255,255,255,0.08)" : "2px solid rgba(0,0,0,0.05)"
                  }}
                />
              </div>
              <div className="collage-item collage-img-3">
                <img
                  src="/images/careers/collab3.webp"
                  alt="Team Portrait"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "16px",
                    border: isDark ? "2px solid rgba(255,255,255,0.08)" : "2px solid rgba(0,0,0,0.05)"
                  }}
                />
              </div>
              <div className="collage-item collage-img-4">
                <img
                  src="/images/careers/collab4.webp"
                  alt="Team Collaboration"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "16px",
                    border: isDark ? "2px solid rgba(255,255,255,0.08)" : "2px solid rgba(0,0,0,0.05)"
                  }}
                />
              </div>
              <div className="collage-item collage-img-5">
                <img
                  src="/images/careers/colleagues_discussing.webp"
                  alt="Colleagues working project discussing details"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "16px",
                    border: isDark ? "2px solid rgba(255,255,255,0.08)" : "2px solid rgba(0,0,0,0.05)"
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* CSS rules for collage layout and responsiveness */}
        <style>{`
          .careers-container {
            display: grid;
            grid-template-columns: 1fr;
            gap: 40px;
            align-items: center;
            width: 100%;
            max-width: 1100px;
          }
          .careers-collage {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            gap: 12px;
            max-width: 440px;
            width: 100%;
          }
          .collage-item {
            position: relative;
            overflow: hidden;
            transition: transform 0.3s ease;
          }
          .collage-item:hover {
            transform: scale(1.02);
            z-index: 10;
          }
          .collage-img-1 {
            grid-column: span 7;
            aspect-ratio: 7/5;
          }
          .collage-img-2 {
            grid-column: span 5;
            aspect-ratio: 1/1;
          }
          .collage-img-3 {
            grid-column: span 5;
            aspect-ratio: 1/1;
          }
          .collage-img-4 {
            grid-column: span 7;
            aspect-ratio: 7/5;
            transform: rotate(2deg);
          }
          .collage-img-4:hover {
            transform: scale(1.02) rotate(0deg);
          }
          .collage-img-5 {
            grid-column: span 12;
            aspect-ratio: 2.8/1;
          }
          @media (min-width: 900px) {
            .careers-container {
              grid-template-columns: 1.1fr 1.12fr;
              gap: 64px;
            }
            .careers-collage {
              max-width: 560px;
            }
          }
          @media (max-width: 900px) {
            .careers-collage {
              max-width: 400px;
            }
          }
        `}</style>

        {/* Apply Modal */}
        <ApplyModal isOpen={isApplyOpen} onClose={() => setIsApplyOpen(false)} />
      </section>
      </BeamsBackground>
    </main>
  );
}
