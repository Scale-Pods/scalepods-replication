"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/providers/ThemeProvider";

interface AnimatedGradientBackgroundProps {
    className?: string;
    children?: React.ReactNode;
    intensity?: "subtle" | "medium" | "strong";
    hues?: number[];
}

interface Beam {
    x: number;
    y: number;
    width: number;
    length: number;
    angle: number;
    speed: number;
    opacity: number;
    hue: number;
    pulse: number;
    pulseSpeed: number;
}

function createBeam(width: number, height: number, customHues?: number[]): Beam {
    const angle = -35 + Math.random() * 10;
    const brandHues = customHues || [96, 210];
    const hue = brandHues[Math.floor(Math.random() * brandHues.length)] + (Math.random() * 20 - 10);

    return {
        x: Math.random() * width * 1.5 - width * 0.25,
        y: Math.random() * height * 1.5 - height * 0.25,
        width: 30 + Math.random() * 60,
        length: height * 2.5,
        angle,
        speed: 1.2 + Math.random() * 1.8,
        opacity: 0.12 + Math.random() * 0.16,
        hue,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
    };
}

const OPACITY_MAP = {
    subtle: 0.7,
    medium: 0.85,
    strong: 1,
} as const;

export function BeamsBackground({
    className,
    children,
    intensity = "strong",
    hues,
}: AnimatedGradientBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const beamsRef = useRef<Beam[]>([]);
    const animationFrameRef = useRef<number>(0);
    const lastWidthRef = useRef<number>(0);
    const { resolvedTheme } = useTheme();
    const DESKTOP_BEAM_COUNT = 18;
    const MOBILE_BEAM_COUNT = 8;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const prefersReducedMotion =
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const isDark = resolvedTheme === "dark";
        const lightness = isDark ? 65 : 45;
        const saturation = isDark ? 85 : 70;
        const intensityAlpha = OPACITY_MAP[intensity];

        function resetBeam(beam: Beam, index: number) {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const column = index % 3;
            const spacing = width / 3;
            const brandHues = hues || [96, 210];

            beam.y = height + 100;
            beam.x =
                column * spacing +
                spacing / 2 +
                (Math.random() - 0.5) * spacing * 0.5;
            beam.width = 100 + Math.random() * 100;
            beam.speed = 1.0 + Math.random() * 1.2;
            beam.hue = brandHues[index % brandHues.length] + (Math.random() * 20 - 10);
            beam.opacity = 0.2 + Math.random() * 0.1;
            beam.length = height * 2.5;
            return beam;
        }

        function drawBeam(context: CanvasRenderingContext2D, beam: Beam) {
            context.save();
            context.translate(beam.x, beam.y);
            context.rotate((beam.angle * Math.PI) / 180);

            const pulsingOpacity =
                beam.opacity * (0.8 + Math.sin(beam.pulse) * 0.2) * intensityAlpha;
            const finalOpacity = isDark ? pulsingOpacity : pulsingOpacity * 0.4;

            const gradient = context.createLinearGradient(0, 0, 0, beam.length);
            gradient.addColorStop(0, `hsla(${beam.hue}, ${saturation}%, ${lightness}%, 0)`);
            gradient.addColorStop(0.1, `hsla(${beam.hue}, ${saturation}%, ${lightness}%, ${finalOpacity * 0.5})`);
            gradient.addColorStop(0.4, `hsla(${beam.hue}, ${saturation}%, ${lightness}%, ${finalOpacity})`);
            gradient.addColorStop(0.6, `hsla(${beam.hue}, ${saturation}%, ${lightness}%, ${finalOpacity})`);
            gradient.addColorStop(0.9, `hsla(${beam.hue}, ${saturation}%, ${lightness}%, ${finalOpacity * 0.5})`);
            gradient.addColorStop(1, `hsla(${beam.hue}, ${saturation}%, ${lightness}%, 0)`);

            context.fillStyle = gradient;
            context.fillRect(-beam.width / 2, 0, beam.width, beam.length);
            context.restore();
        }

        function drawFrame(advance: boolean) {
            if (!canvas || !ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < beamsRef.current.length; i++) {
                const beam = beamsRef.current[i];
                if (advance) {
                    beam.y -= beam.speed;
                    beam.pulse += beam.pulseSpeed;
                    if (beam.y + beam.length < -100) {
                        resetBeam(beam, i);
                    }
                }
                drawBeam(ctx, beam);
            }
        }

        const updateCanvasSize = (force = false) => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const isMobile = width < 768;

            // Ignore mobile URL bar vertical resize churn during scroll
            if (!force && isMobile && lastWidthRef.current === width) {
                return;
            }
            lastWidthRef.current = width;

            // Cap backing resolution to 1x CSS pixels: soft blurred beams do not need 2x/3x fill rate
            canvas.width = width;
            canvas.height = height;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            canvas.style.filter = isMobile ? "blur(32px)" : "blur(48px)";

            const totalBeams = isMobile ? MOBILE_BEAM_COUNT : DESKTOP_BEAM_COUNT;
            beamsRef.current = Array.from({ length: totalBeams }, () =>
                createBeam(width, height, hues)
            );
            drawFrame(false);
        };

        updateCanvasSize(true);

        const handleResize = () => updateCanvasSize(false);
        window.addEventListener("resize", handleResize, { passive: true });

        const shouldAnimate = window.innerWidth >= 768 && !prefersReducedMotion;
        let idleTimeoutId: number | undefined;
        let stopped = false;

        function animate() {
            if (stopped || document.hidden || window.innerWidth < 768) {
                animationFrameRef.current = 0;
                return;
            }
            drawFrame(true);
            animationFrameRef.current = requestAnimationFrame(animate);
        }

        const handleVisibilityChange = () => {
            if (document.hidden) {
                if (animationFrameRef.current) {
                    cancelAnimationFrame(animationFrameRef.current);
                    animationFrameRef.current = 0;
                }
            } else if (shouldAnimate && !stopped && !animationFrameRef.current) {
                animationFrameRef.current = requestAnimationFrame(animate);
            }
        };

        if (shouldAnimate) {
            document.addEventListener("visibilitychange", handleVisibilityChange);
            // Defer continuous animation past initial paint so hero LCP paints without contention
            idleTimeoutId = window.setTimeout(() => {
                if (!stopped && !document.hidden) {
                    animationFrameRef.current = requestAnimationFrame(animate);
                }
            }, 1200);
        }

        return () => {
            stopped = true;
            window.removeEventListener("resize", handleResize);
            if (shouldAnimate) {
                document.removeEventListener("visibilitychange", handleVisibilityChange);
            }
            if (idleTimeoutId) {
                clearTimeout(idleTimeoutId);
            }
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = 0;
            }
        };
    }, [intensity, resolvedTheme, hues]);

    const overlayTint =
        resolvedTheme === "dark"
            ? "rgba(4, 7, 13, 0.14)"
            : "rgba(255, 255, 255, 0.12)";

    return (
        <div
            className={cn(
                "relative min-h-screen w-full",
                className
            )}
            style={{ background: "var(--color-bg-page)" }}
        >
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0"
                    style={{ opacity: 0.85 }}
                />
                <div
                    className="absolute inset-0"
                    style={{ background: overlayTint }}
                />
            </div>

            <div className="relative z-10 w-full">
                {children}
            </div>
        </div>
    );
}
