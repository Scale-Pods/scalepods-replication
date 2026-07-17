"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";

// Pure canvas-based particle system — no external library dependency
// Matches scalepods.co: faint white dots drifting slowly upward
// Runs entirely in a <canvas> element, rendered via requestAnimationFrame
// Automatically pauses when scrolled off-screen to save CPU/GPU.

interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speedY: number;
  speedX: number;
  opacityDelta: number;
}

function createParticle(canvasWidth: number, canvasHeight: number): Particle {
  return {
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight,       // start anywhere in canvas
    size: 0.5 + Math.random() * 1.4,       // 0.5 – 1.9px (tiny dots)
    opacity: 0.08 + Math.random() * 0.22,  // 0.08 – 0.3 (faint)
    speedY: -(0.2 + Math.random() * 0.45), // drift upward (negative = up)
    speedX: (Math.random() - 0.5) * 0.2,  // slight horizontal drift
    opacityDelta: (Math.random() * 0.004) * (Math.random() < 0.5 ? 1 : -1),
  };
}

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const isVisibleRef = useRef<boolean>(true);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Size canvas to fill parent section
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;

      // Re-seed particles on resize
      const count = Math.floor((canvas.width * canvas.height) / 14000); // ~70 on 1280×900
      particlesRef.current = Array.from({ length: Math.min(count, 90) }, () =>
        createParticle(canvas.width, canvas.height)
      );
    };

    resize();
    window.addEventListener("resize", resize);

    // Pause animation when canvas is off-screen — saves CPU/GPU
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && rafRef.current === 0) {
          rafRef.current = requestAnimationFrame(animate);
        }
      },
      { threshold: 0 }
    );
    visibilityObserver.observe(canvas);

    const animate = () => {
      if (!canvas || !ctx) return;
      // If off-screen, cancel and wait for IntersectionObserver to resume
      if (!isVisibleRef.current) {
        rafRef.current = 0;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const color = resolvedTheme === "dark" ? "255, 255, 255" : "0, 128, 255";

      particlesRef.current.forEach((p) => {
        // Move
        p.y += p.speedY;
        p.x += p.speedX;
        // Pulse opacity
        p.opacity += p.opacityDelta;
        if (p.opacity >= 0.32 || p.opacity <= 0.05) p.opacityDelta *= -1;

        // Wrap: if dot exits top, re-spawn at bottom
        if (p.y < -4) {
          p.y = canvas.height + 2;
          p.x = Math.random() * canvas.width;
        }
        // Wrap horizontal
        if (p.x < -4) p.x = canvas.width + 2;
        if (p.x > canvas.width + 4) p.x = -2;

        // Draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${p.opacity.toFixed(3)})`;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      window.removeEventListener("resize", resize);
      visibilityObserver.disconnect();
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none",
        display: "block",
        transition: "opacity 1s ease"
      }}
      aria-hidden="true"
    />
  );
}
