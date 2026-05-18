"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import createGlobe from "cobe";
import { useTheme } from "@/components/providers/ThemeProvider";

interface CobeGlobeProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

// ─── Tuning constants ────────────────────────────────────────────────────────
const AUTO_SPEED        = 0.003;   // radians/frame — cinematic slow drift
const AUTO_SPEED_MOBILE = 0.0025;  // slightly slower on mobile
const DRAG_SENSITIVITY  = 0.005;   // radians/pixel of horizontal drag
const INERTIA_DECAY     = 0.92;    // velocity multiplier each frame after release
const INERTIA_CUTOFF    = 0.0001;  // stop inertia below this velocity
const RESUME_DELAY_MS   = 1200;    // ms after release before auto-rotation resumes

export function CobeGlobe({ size = 600, className, style }: CobeGlobeProps) {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const globeRef   = useRef<ReturnType<typeof createGlobe> | null>(null);
  const rafRef     = useRef<number | null>(null);

  // ── Rotation state (all refs — zero re-renders in the RAF loop) ───────────
  const phiRef           = useRef(0);
  const velocityRef      = useRef(0);       // current angular velocity (rad/frame)
  const isDraggingRef    = useRef(false);
  const isInteractingRef = useRef(false);   // true while dragging OR inertia active
  const lastXRef         = useRef(0);
  const resumeTimerRef   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isVisibleRef     = useRef(true);

  // ── Cursor visual — useState OK: only fires on pointerdown/up ────────────
  const [grabbing, setGrabbing] = useState(false);

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Detect mobile once at mount
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // ── Pause rendering when offscreen ────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.01 }
    );

    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  // ── Globe initialisation ──────────────────────────────────────────────────
  const initGlobe = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Tear down previous instance
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (globeRef.current) {
      globeRef.current.destroy();
      globeRef.current = null;
    }

    // Mobile resolution optimization
    const dpr = isMobile
      ? 1.0
      : Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 1.8);

    const canvasSize = size * dpr;

    // Theme-adaptive palette
    const baseColor:   [number, number, number] = isDark ? [0.12, 0.16, 0.18] : [0.82, 0.88, 0.84];
    const markerColor: [number, number, number] = isDark ? [0.42, 1.00, 0.55] : [0.30, 0.72, 0.45];
    const glowColor:   [number, number, number] = isDark ? [0.20, 0.85, 0.45] : [0.55, 0.82, 0.60];

    globeRef.current = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width:            canvasSize,
      height:           canvasSize,
      phi:              phiRef.current,
      theta:            0.25,
      dark:             isDark ? 1 : 0,
      diffuse:          isDark ? 1.4 : 2.0,
      scale:            1,
      mapSamples:       isMobile ? 5000 : 13000,
      mapBrightness:    isDark ? 5 : 8,
      baseColor,
      markerColor,
      glowColor,
      markers: [
        // Middle East — core ScalePods market
        { location: [25.2048,   55.2708],  size: 0.06 }, // Dubai
        { location: [24.4539,   54.3773],  size: 0.05 }, // Abu Dhabi
        { location: [24.6877,   46.7219],  size: 0.04 }, // Riyadh
        // South Asia
        { location: [19.0760,   72.8777],  size: 0.05 }, // Mumbai
        { location: [28.6139,   77.2090],  size: 0.04 }, // New Delhi
        // Europe & Americas
        { location: [51.5074,   -0.1278],  size: 0.04 }, // London
        { location: [40.7128,  -74.0060],  size: 0.05 }, // New York
        { location: [37.7749, -122.4194],  size: 0.04 }, // San Francisco
        // East Asia
        { location: [35.6762,  139.6503],  size: 0.04 }, // Tokyo
        { location: [ 1.3521,  103.8198],  size: 0.04 }, // Singapore
      ],
    });

    const globe     = globeRef.current;
    const autoSpeed = isMobile ? AUTO_SPEED_MOBILE : AUTO_SPEED;

    // ── Animation loop ───────────────────────────────────────────────────────
    function frame() {
      // Pause updates completely when globe is out of view
      if (!isVisibleRef.current) {
        rafRef.current = requestAnimationFrame(frame);
        return;
      }

      if (isInteractingRef.current) {
        // Drag active: velocity is set live by onPointerMove
        phiRef.current += velocityRef.current;
      } else if (Math.abs(velocityRef.current) > INERTIA_CUTOFF) {
        // Inertia coasting after release
        velocityRef.current *= INERTIA_DECAY;
        phiRef.current      += velocityRef.current;
      } else {
        // Full auto-rotation
        velocityRef.current = 0;
        phiRef.current     += autoSpeed;
      }

      globe.update({ phi: phiRef.current });
      rafRef.current = requestAnimationFrame(frame);
    }

    rafRef.current = requestAnimationFrame(frame);
  }, [isDark, size, isMobile]);

  useEffect(() => {
    const t = setTimeout(() => initGlobe(), 100);
    return () => {
      clearTimeout(t);
      if (resumeTimerRef.current)  clearTimeout(resumeTimerRef.current);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (globeRef.current)        globeRef.current.destroy();
    };
  }, [initGlobe]);

  // ── Pointer event handlers ────────────────────────────────────────────────
  // Using the Pointer Events API unifies mouse + touch in one code path.
  // setPointerCapture ensures move/up fire even if pointer leaves the canvas.
  // touchAction: "pan-y" on the canvas lets vertical scroll through on mobile.

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    isDraggingRef.current    = true;
    isInteractingRef.current = true;
    lastXRef.current         = e.clientX;
    velocityRef.current      = 0;
    setGrabbing(true);

    // Clear pending auto-resume timer
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }

    // Capture pointer so move/up fire even outside element bounds
    (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return;
    const deltaX         = e.clientX - lastXRef.current;
    lastXRef.current     = e.clientX;
    velocityRef.current  = deltaX * DRAG_SENSITIVITY;
  }, []);

  const onPointerUp = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setGrabbing(false);

    // Let inertia coast, then schedule auto-rotation resume
    resumeTimerRef.current = setTimeout(() => {
      isInteractingRef.current = false;
      // velocityRef keeps its value so the inertia branch handles the decay
    }, RESUME_DELAY_MS);
  }, []);

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div
      className={className}
      style={{
        position: "relative",
        display:  "flex",
        alignItems:     "center",
        justifyContent: "center",
        width:  size,
        height: size,
        ...style,
      }}
    >
      {/* Atmospheric ambient glow — stays behind globe */}
      <div
        aria-hidden="true"
        style={{
          position:     "absolute",
          inset:        "-20%",
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, rgba(80,210,120,0.10) 0%, rgba(60,180,100,0.04) 50%, transparent 72%)"
            : "radial-gradient(circle, rgba(80,180,110,0.06) 0%, rgba(60,160, 90,0.02) 50%, transparent 72%)",
          filter:        isDark ? "blur(28px)" : "blur(22px)",
          pointerEvents: "none",
          zIndex:        0,
        }}
      />

      {/* Globe canvas
          mix-blend-mode:screen  — WebGL black background → transparent
          touchAction:pan-y      — vertical scroll still works on mobile
          cursor                 — grab / grabbing feedback                */}
      <canvas
        ref={canvasRef}
        width={size * 2}
        height={size * 2}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}    // treat leaving canvas as release
        onPointerCancel={onPointerUp}   // handle system interrupts (calls, etc.)
        style={{
          width:  size,
          height: size,
          mixBlendMode:  "screen" as React.CSSProperties["mixBlendMode"],
          background:    "transparent",
          position:      "relative",
          zIndex:        1,
          cursor:        grabbing ? "grabbing" : "grab",
          touchAction:   "pan-y",   // allow vertical scroll; horizontal captured by pointer
          willChange:    "transform",
          transform:     "translate3d(0,0,0)",
          userSelect:    "none",
        }}
      />
    </div>
  );
}
