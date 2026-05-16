import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "@/components/providers/ThemeProvider";
import { ArrowUpRight } from "lucide-react";

export default function FinalCTA() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <section id="book" className="relative py-40 px-6 overflow-hidden" style={{ background: "var(--color-bg-page)" }}>
      
      {/* Background Decor */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ 
          background: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          opacity: isDark ? 1 : 0.3
        }} 
      />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none" 
        style={{
          background: isDark ? "rgba(109, 182, 255, 0.05)" : "rgba(177, 217, 151, 0.08)",
          filter: "blur(120px)"
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: "clamp(36px, 5vw, 60px)",
            fontWeight: 500,
            color: "var(--color-text-bright)",
            lineHeight: 1.2,
            marginBottom: "24px"
          }}
        >
          Ready to Automate Your Growth?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontSize: "20px",
            color: "var(--color-text-muted)",
            marginBottom: "48px"
          }}
        >
          Book a free consultation and discover how AI can transform your workflow
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full sm:w-auto"
        >
          <Link href="/contact" style={{ textDecoration: "none", display: "inline-block" }}>
            <div style={{ position: "relative" }}>
              {/* Ambient Glow behind button (using #B1D997) */}
              <motion.div
                animate={{
                  opacity: isDark ? [0.2, 0.4, 0.2] : [0.1, 0.2, 0.1],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  inset: "-8px",
                  background: "rgba(177, 217, 151, 0.25)",
                  filter: "blur(14px)",
                  borderRadius: "16px",
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
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  fontSize: "17px",
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                  
                  // Theme Adaptive Colors (#B1D997 for dark mode text)
                  color: isDark ? "#B1D997" : "#0f172a",
                  
                  // Background Logic (Gradient using #B1D997)
                  background: isDark
                    ? "linear-gradient(135deg, #050816 0%, #0b1020 100%)"
                    : "linear-gradient(135deg, #B1D997 0%, #C5E4B2 50%, #D8EFCC 100%)",
                  
                  // Glass & Border (#B1D997 glow)
                  backdropFilter: isDark ? "blur(12px)" : "none",
                  WebkitBackdropFilter: isDark ? "blur(12px)" : "none",
                  border: isDark 
                    ? "1px solid rgba(177, 217, 151, 0.4)" 
                    : "1px solid rgba(177, 217, 151, 0.3)",
                  
                  borderRadius: "12px",
                  padding: "18px 48px",
                  cursor: "pointer",
                  
                  // Depth & Shadows
                  boxShadow: isDark 
                    ? "0 8px 24px -4px rgba(0, 0, 0, 0.6), 0 0 15px rgba(177, 217, 151, 0.15)" 
                    : "0 10px 20px -5px rgba(177, 217, 151, 0.25), inset 0 1px 0 rgba(255,255,255,0.4)",
                  
                  zIndex: 1,
                  transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
                }}
              >
                <span 
                  style={{ position: "relative", zIndex: 3, display: "flex", alignItems: "center", gap: "8px" }}
                >
                  Book A Free Call 
                  <ArrowUpRight style={{ width: "18px", height: "18px" }} />
                </span>
              </div>
            </div>
          </Link>
          <p style={{ fontSize: "14px", color: "var(--color-text-faint)", marginTop: "16px" }}>No commitment. Just insights.</p>
        </motion.div>
      </div>
    </section>
  );
}
