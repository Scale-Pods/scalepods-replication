"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTheme } from "next-themes";

interface TurnstileProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
  preSolvedToken?: string | null;
}

/**
 * Turnstile — production-grade, layout-stable Cloudflare verification widget.
 *
 * Design goals:
 * - FIXED 65px height at all times → zero layout shift.
 * - `appearance="interaction-only"` → invisible until user interaction required.
 * - Polling loop (50ms) to mount once `window.turnstile` is available.
 * - Callback refs so parent re-renders never restart the widget.
 * - Smooth opacity transitions; no flickering.
 */
export default function Turnstile({
  onVerify,
  onExpire,
  onError,
  preSolvedToken,
}: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Stable callback refs — parent re-renders won't restart the widget
  const onVerifyRef = useRef(onVerify);
  const onExpireRef = useRef(onExpire);
  const onErrorRef = useRef(onError);

  // Visual states
  const [phase, setPhase] = useState<"loading" | "widget" | "solved">(
    preSolvedToken ? "solved" : "loading"
  );

  const { resolvedTheme } = useTheme();

  // Keep callback refs current without triggering re-renders
  useEffect(() => {
    onVerifyRef.current = onVerify;
    onExpireRef.current = onExpire;
    onErrorRef.current = onError;
  });

  // If parent passes a pre-solved token (e.g. after SSR hydration), honour it
  useEffect(() => {
    if (preSolvedToken) setPhase("solved");
  }, [preSolvedToken]);

  const renderWidget = useCallback(() => {
    if (
      typeof window === "undefined" ||
      !window.turnstile ||
      !containerRef.current ||
      widgetIdRef.current
    )
      return;

    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    if (!siteKey) {
      console.warn("[Turnstile] NEXT_PUBLIC_TURNSTILE_SITE_KEY is not defined.");
      return;
    }

    try {
      const id = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        // interaction-only = stays invisible unless a challenge is needed
        appearance: "interaction-only",
        theme: resolvedTheme === "dark" ? "dark" : "light",
        callback: (token: string) => {
          onVerifyRef.current(token);
          setPhase("solved");
        },
        "expired-callback": () => {
          onExpireRef.current?.();
          setPhase("widget");
        },
        "error-callback": () => {
          onErrorRef.current?.();
          setPhase("widget");
        },
      });
      widgetIdRef.current = id;
      // Move from "loading" spinner to widget state (widget is invisible by default)
      setPhase((prev) => (prev === "loading" ? "widget" : prev));
    } catch (err) {
      console.error("[Turnstile] render error:", err);
    }
  }, [resolvedTheme]);

  useEffect(() => {
    if (preSolvedToken) return; // already solved, skip mounting

    if (typeof window !== "undefined" && window.turnstile) {
      renderWidget();
    } else {
      // Poll every 50ms until the global script (loaded in layout.tsx) is ready
      pollRef.current = setInterval(() => {
        if (typeof window !== "undefined" && window.turnstile) {
          clearInterval(pollRef.current!);
          pollRef.current = null;
          renderWidget();
        }
      }, 50);
    }

    return () => {
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
      // Remove widget on unmount
      if (widgetIdRef.current && typeof window !== "undefined" && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {}
        widgetIdRef.current = null;
      }
    };
  }, [renderWidget, preSolvedToken]);

  // ─── Colours ──────────────────────────────────────────────────────────────
  const isDark = resolvedTheme === "dark";
  const wrapperBg = isDark ? "rgba(255,255,255,0.015)" : "rgba(0,0,0,0.01)";
  const wrapperBorder = isDark
    ? "1px solid rgba(255,255,255,0.04)"
    : "1px solid rgba(0,0,0,0.04)";

  return (
    <>
      {/* Inline keyframe — avoids needing a global CSS file entry */}
      <style>{`
        @keyframes ts-pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px var(--color-green); }
          50%       { opacity: 0.5; box-shadow: 0 0 12px var(--color-green); }
        }
        @keyframes ts-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/*
        CRITICAL: fixed min-height = no layout shift.
        The container is always 65px tall regardless of Turnstile state.
        The inner content cross-fades between loading / widget / solved states.
      */}
      <div
        style={{
          minHeight: "65px",
          height: "65px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
          width: "100%",
          margin: "4px 0 10px",
          borderRadius: "8px",
          background: wrapperBg,
          border: wrapperBorder,
          boxSizing: "border-box",
        }}
      >
        {/* ── Loading spinner (phase === "loading") ────────────────── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            fontSize: "11px",
            color: "var(--color-text-muted)",
            opacity: phase === "loading" ? 1 : 0,
            transition: "opacity 0.25s ease",
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              borderWidth: "2px",
              borderStyle: "solid",
              borderColor: "transparent",
              borderTopColor: "var(--color-blue-mid, #3b82f6)",
              display: "inline-block",
              animation: "ts-spin 0.75s linear infinite",
            }}
          />
          <span>Securing…</span>
        </div>

        {/* ── Solved badge (phase === "solved") ─────────────────────── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            fontSize: "11px",
            color: "var(--color-text-muted)",
            opacity: phase === "solved" ? 0.85 : 0,
            transition: "opacity 0.3s ease",
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: "var(--color-green)",
              display: "inline-block",
              animation: "ts-pulse 2s ease-in-out infinite",
            }}
          />
          <span>Secured</span>
        </div>

        {/* ── Turnstile iframe mount point ──────────────────────────── */}
        {/*
          Always present in the DOM so Turnstile can inject into it.
          Visibility toggled via opacity/pointer-events, NOT display:none,
          so Turnstile doesn't get confused about the container.
        */}
        <div
          ref={containerRef}
          style={{
            opacity: phase === "widget" ? 1 : 0,
            transform: phase === "widget" ? "scale(1)" : "scale(0.96)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
            pointerEvents: phase === "widget" ? "auto" : "none",
          }}
        />
      </div>
    </>
  );
}

// Global window type augmentation
declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: Record<string, unknown>) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId: string) => void;
      getResponse: (widgetId: string) => string | undefined;
    };
    onloadTurnstileCallback?: () => void;
  }
}
