"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Zap, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  Globe as GlobeIcon, 
  ChevronRight,
  Sparkles,
  Command
} from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { useMobile } from "@/lib/hooks";

const C = {
  green: "#ACD791",
  blue: "#6DB6FF",
  txtBright: "#E4E9F2",
  txtBody: "#B8C7D9",
  border: "rgba(255,255,255,0.08)",
  bgCard: "rgba(255, 255, 255, 0.015)",
};

const F = {
  inter: "Inter, sans-serif",
  accent: "'Instrument Serif', serif",
};

const G = {
  bg: "rgba(255, 255, 255, 0.015)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  blur: "blur(12px)", // Reduced from 40px for better mobile performance
};

export const FinalCTASection = () => {
  const isMobile = useMobile(1024);

  return (
    <section 
      id="final-cta"
      className="final-cta-section"
      style={{ 
        position: "relative",
        overflow: "hidden",
        background: "transparent",
        minHeight: "auto",
        display: "flex",
        alignItems: "center"
      }}
    >
      <style jsx>{`
        .final-cta-section {
          padding: 80px 32px;
        }
        .cta-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          align-items: center;
          gap: 80px;
        }
        @media (max-width: 1024px) {
          .final-cta-section {
            padding: 64px 20px 80px;
          }
          .cta-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
            gap: 40px !important;
          }
        }
      `}</style>
      {/* ── CINEMATIC ENVIRONMENTAL ATMOSPHERE ── */}
      <motion.div 
        animate={isMobile ? { opacity: 0.05 } : { 
          opacity: [0.05, 0.12, 0.05],
          scale: [1, 1.05, 1],
          y: [-20, 20, -20]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "0%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          height: "100%",
          background: `radial-gradient(circle at 50% 50%, ${C.green}15 0%, transparent 70%)`,
          filter: isMobile ? "blur(100px)" : "blur(180px)",
          zIndex: 0,
          pointerEvents: "none"
        }} 
      />

      {/* Vertical Beams */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
         {[...Array(isMobile ? 1 : 3)].map((_, i) => (
           <motion.div
             key={i}
             animate={isMobile ? { opacity: 0.03 } : { 
               opacity: [0.03, 0.08, 0.03],
               x: [i * 300, i * 300 + 40, i * 300]
             }}
             transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "easeInOut" }}
             style={{
               position: "absolute",
               top: 0,
               left: `${20 + i * 30}%`,
               width: "1px",
               height: "100%",
               background: `linear-gradient(180deg, transparent, ${C.green}, transparent)`,
               boxShadow: `0 0 30px ${C.green}`,
               filter: "blur(2px)",
               opacity: 0.1
             }}
           />
         ))}
      </div>

      <div style={{
        maxWidth: "1280px",
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
        width: "100%",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1.1fr",
        alignItems: "center",
        gap: isMobile ? "40px" : "80px"
      }} className="cta-grid">
        
        {/* Left Side: Content */}
        <div style={{ position: "relative" }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              background: "rgba(255, 255, 255, 0.03)",
              border: `1px solid rgba(255, 255, 255, 0.1)`,
              borderRadius: "100px",
              marginBottom: "24px"
            }}
          >
            <Sparkles size={12} color={C.green} />
            <span style={{ 
              color: C.green, 
              fontSize: "11px", 
              fontWeight: 800, 
              textTransform: "uppercase", 
              letterSpacing: "0.15em" 
            }}>
              Ready for Deployment
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: F.inter,
              fontSize: "clamp(40px, 5.5vw, 64px)",
              fontWeight: 800,
              color: C.txtBright,
              lineHeight: 1,
              marginBottom: "20px",
              letterSpacing: "-0.05em"
            }}
          >
            Build Your <br />
            <span style={{ fontFamily: F.accent, fontStyle: "italic", fontWeight: 400, color: C.green }}>AI Operating System</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{
              fontSize: "18px",
              color: C.txtBody,
              maxWidth: "520px",
              lineHeight: 1.5,
              marginBottom: "40px",
              opacity: 0.85
            }}
          >
            Transform your business into an AI-native powerhouse. Deploy intelligent 
            workflows that scale your operations autonomously.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            style={{ 
              display: "flex", 
              gap: "16px", 
              flexWrap: "wrap",
              justifyContent: isMobile ? "center" : "flex-start" 
            }}
          >
            <a 
              href="https://wa.me/917680974640?text=Hi%20ScalePods!%20I'm%20interested%20in%20deploying%20an%20AI%20Ecosystem%20for%20my%20business." 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <button
                style={{
                  padding: "16px 36px",
                  background: C.green,
                  border: "none",
                  borderRadius: "12px",
                  color: "#000000",
                  fontSize: "16px",
                  fontWeight: 800,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  transition: "all 0.3s ease",
                  boxShadow: `0 10px 30px ${C.green}44`
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 15px 40px ${C.green}66`; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 10px 30px ${C.green}44`; }}
              >
                Deploy Your AI Ecosystem <ArrowRight size={20} />
              </button>
            </a>
            
            <a 
              href="https://wa.me/919867271848?text=Hi%20ScalePods!%20I'm%20interested%20in%20discussing%20custom%20workflow%20automation%20solutions%20for%20my%20business." 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <button
                style={{
                  padding: "16px 36px",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  borderRadius: "12px",
                  color: C.txtBright,
                  fontSize: "16px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  transition: "all 0.3s ease",
                  backdropFilter: "blur(12px)"
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)"; e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255, 255, 255, 0.02)"; e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)"; }}
              >
                Talk to an Architect
              </button>
            </a>
          </motion.div>

          {/* Trust points */}
          <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.5 }}
             style={{ 
               display: "flex", 
               gap: isMobile ? "16px" : "24px", 
               marginTop: "48px",
               flexDirection: isMobile ? "column" : "row",
               alignItems: isMobile ? "center" : "flex-start"
             }}
          >
             <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <ShieldCheck size={14} color={C.green} />
                <span style={{ fontSize: "11px", fontWeight: 700, color: C.txtBody, opacity: 0.6, textTransform: "uppercase" }}>ISO-Grade Security</span>
             </div>
             <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <GlobeIcon size={14} color={C.blue} />
                <span style={{ fontSize: "11px", fontWeight: 700, color: C.txtBody, opacity: 0.6, textTransform: "uppercase" }}>Global AI Infrastructure</span>
             </div>
          </motion.div>
        </div>

        {/* Right Side: Cinematic AI Infrastructure Visualization */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ 
            position: "relative", 
            height: isMobile ? "400px" : "650px", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            width: isMobile ? "100%" : "auto"
          }}
          className="cta-visual-container"
        >
          {/* Enhanced Atmospheric Environment */}
          <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
             
             {/* Dynamic Ambient Background Glows */}
             <motion.div 
               animate={{ 
                 opacity: [0.15, 0.25, 0.15],
                 scale: [1, 1.1, 1]
               }}
               transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
               style={{
                 position: "absolute",
                 width: "550px",
                 height: "550px",
                 background: `radial-gradient(circle, ${C.green}20 0%, transparent 70%)`,
                 filter: "blur(100px)",
                 zIndex: 0,
                 pointerEvents: "none"
               }} 
             />
             
             {/* Secondary Blue Glow for contrast */}
             <div style={{
               position: "absolute",
               width: "400px",
               height: "400px",
               background: `radial-gradient(circle, ${C.blue}10 0%, transparent 70%)`,
               filter: "blur(120px)",
               zIndex: 0,
               pointerEvents: "none",
               transform: "translate(-50px, 50px)"
             }} />

             {/* ── THE STATIC CINEMATIC GLOBE ── */}
             <motion.div 
               animate={{ 
                 y: [0, -8, 0],
               }}
               transition={{ 
                 duration: 6, 
                 repeat: Infinity, 
                 ease: "easeInOut" 
               }}
               className="relative z-10 w-full h-full flex items-center justify-center"
               style={{
                 filter: `drop-shadow(0 0 30px ${C.green}33)`
               }}
             >
               {/* Radial Glow behind image specifically */}
               <motion.div 
                 animate={{ 
                   opacity: [0.6, 1, 0.6],
                   scale: [1, 1.05, 1]
                 }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 style={{
                   position: "absolute",
                   width: "100%",
                   height: "100%",
                   background: `radial-gradient(circle, rgba(163, 230, 53, 0.12) 0%, transparent 65%)`,
                   zIndex: -1,
                   pointerEvents: "none"
                 }}
               />

               <Image 
                 src="/images/Earth.png"
                 alt="Global AI Infrastructure"
                 width={700}
                 height={700}
                 className="object-contain"
                 style={{
                   width: isMobile ? "90%" : "100%",
                   height: "auto",
                   maxWidth: "700px",
                   filter: `drop-shadow(0 0 20px ${C.green}20)`
                 }}
                 priority
               />
             </motion.div>

             {/* Overlay Cinematic Elements: Interacting Beams */}
             <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 15, overflow: "hidden" }}>
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      y: [0, -40, 0],
                      opacity: [0.05, 0.15, 0.05],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 6 + i * 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                    style={{
                      position: "absolute",
                      top: `${15 + i * 12}%`,
                      left: `${5 + i * 18}%`,
                      width: "1.5px",
                      height: "120px",
                      background: `linear-gradient(to bottom, transparent, ${C.green}, transparent)`,
                      boxShadow: `0 0 25px ${C.green}`,
                      filter: "blur(1px)",
                    }}
                  />
                ))}
                
                {/* Horizontal "Data Stream" pulses */}
                <motion.div 
                  animate={{ x: ["-100%", "200%"], opacity: [0, 0.4, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  style={{
                    position: "absolute",
                    top: "45%",
                    left: 0,
                    width: "30%",
                    height: "1px",
                    background: `linear-gradient(90deg, transparent, ${C.green}, transparent)`,
                    zIndex: 20
                  }}
                />
             </div>
             
             {/* Neon Rim Light Ring - Subtle inner depth */}
             <div style={{
               position: "absolute",
               width: "380px",
               height: "380px",
               borderRadius: "50%",
               border: `1px solid ${C.green}15`,
               boxShadow: `inset 0 0 40px ${C.green}05`,
               zIndex: 5,
               pointerEvents: "none"
             }} />
          </div>
        </motion.div>

      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .cta-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .cta-grid > div {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
};
