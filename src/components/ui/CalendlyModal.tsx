"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

export default function CalendlyModal({ isOpen, onClose, url }: CalendlyModalProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [isMobileSize, setIsMobileSize] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [shouldLoadIframe, setShouldLoadIframe] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const checkMobile = () => {
      setIsMobileSize(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // BACKGROUND INITIALIZATION: Warm up the Calendly iframe 1.5 seconds after page hydration
    const timer = setTimeout(() => {
      setShouldLoadIframe(true);
    }, 1500);

    return () => {
      window.removeEventListener("resize", checkMobile);
      clearTimeout(timer);
    };
  }, []);

  // Prevent double scrolling: Disable body scroll when the modal is open
  useEffect(() => {
    if (mounted && isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, mounted]);

  // Load immediately if the user opens the modal before the background warm-up delay expires
  useEffect(() => {
    if (isOpen) {
      setShouldLoadIframe(true);
    }
  }, [isOpen]);

  if (!mounted) return null;

  // Build optimized Calendly URL parameters:
  // - hide_event_type_details=1: Hides name, description, duration to save a massive amount of vertical space
  // - hide_landing_page_details=1: Hides host profile image/header details
  // - hide_gdpr_banner=1: Removes cookie footer to prevent internal scroll double-bars
  const backgroundHex = isDark ? "04070d" : "ffffff";
  const textHex = isDark ? "f8fafc" : "0b1020";
  const primaryHex = "63a5e7"; // ScalePods brand blue

  const separator = url.includes("?") ? "&" : "?";
  const calendlySrc = `${url}${separator}background_color=${backgroundHex}&text_color=${textHex}&primary_color=${primaryHex}&hide_gdpr_banner=1&hide_event_type_details=1&hide_landing_page_details=1`;

  return createPortal(
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobileSize ? "0px" : "16px",
        boxSizing: "border-box",
        opacity: isOpen ? 1 : 0,
        visibility: isOpen ? "visible" : "hidden",
        pointerEvents: isOpen ? "auto" : "none",
        transition: "opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Premium Backdrop Blur */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 0, 0.55)",
          WebkitBackdropFilter: "blur(12px)",
          backdropFilter: "blur(12px)",
          cursor: "pointer",
        }}
      />

      {/* Responsive Modal Frame optimized for viewport real estate (92vw width, 88vh height) */}
      <div
        style={{
          position: "relative",
          width: isMobileSize ? "100vw" : "92vw",
          maxWidth: "1080px",
          height: isMobileSize ? "100vh" : "88vh",
          maxHeight: isMobileSize ? "100%" : "900px",
          background: isDark ? "#04070d" : "#ffffff",
          border: isMobileSize ? "none" : isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.08)",
          borderRadius: isMobileSize ? "0px" : "16px",
          boxShadow: "0 24px 60px -12px rgba(0, 0, 0, 0.6)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          zIndex: 1,
          transform: isOpen ? "scale(1) translateY(0)" : "scale(0.96) translateY(12px)",
          transition: "transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Dedicated Header Bar to house the Close Button (prevents Calendly overlap, satisfies 44px standard) */}
        <div
          style={{
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: "0 16px",
            borderBottom: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.08)",
            background: isDark ? "#080a0e" : "#f8fafc",
            flexShrink: 0,
          }}
        >
          <button
            onClick={onClose}
            aria-label="Close booking modal"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)",
              width: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
              outline: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--sp-accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)";
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Area */}
        <div style={{ flex: 1, position: "relative", width: "100%", height: "100%" }}>
          
          {/* Branded Dark/Light Loader: matches main page design tokens */}
          {!iframeLoaded && (
            <div style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: isDark ? "#04070d" : "#ffffff",
              gap: "20px",
              zIndex: 5,
              padding: "24px",
              boxSizing: "border-box",
            }}>
              <div style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <motion.div
                  animate={{ scale: [0.95, 1.15, 0.95], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    position: "absolute",
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background: "rgba(99, 165, 231, 0.15)",
                    filter: "blur(8px)",
                  }}
                />
                <Loader2 className="animate-spin" size={42} style={{ color: "var(--sp-accent)", position: "relative" }} />
              </div>

              <div style={{ textAlign: "center", maxWidth: "280px" }}>
                <p style={{
                  fontFamily: "var(--font-sans), sans-serif",
                  fontSize: "15px",
                  fontWeight: 700,
                  color: isDark ? "#ffffff" : "#0f172a",
                  margin: "0 0 6px 0",
                }}>
                  Preparing your booking experience...
                </p>
                <p style={{
                  fontFamily: "var(--font-sans), sans-serif",
                  fontSize: "12px",
                  color: "var(--color-text-muted)",
                  margin: 0,
                  lineHeight: 1.4,
                }}>
                  Connecting with ScalePods discovery engine.
                </p>
              </div>
            </div>
          )}

          {/* Iframe stays mounted for background pre-warm caching */}
          {shouldLoadIframe && (
            <iframe
              src={calendlySrc}
              width="100%"
              height="100%"
              frameBorder="0"
              onLoad={() => setIframeLoaded(true)}
              style={{
                border: "none",
                width: "100%",
                height: "100%",
                background: isDark ? "#04070d" : "#ffffff",
              }}
            />
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
