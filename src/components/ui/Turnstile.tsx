"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { Loader2 } from "lucide-react";

interface TurnstileProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
}

export default function Turnstile({ onVerify, onExpire, onError }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [widgetLoaded, setWidgetLoaded] = useState(false);

  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    if (!siteKey) {
      console.warn("NEXT_PUBLIC_TURNSTILE_SITE_KEY is not defined.");
      return;
    }

    const renderWidget = () => {
      if (typeof window !== "undefined" && window.turnstile && containerRef.current && !widgetIdRef.current) {
        try {
          const widgetId = window.turnstile.render(containerRef.current, {
            sitekey: siteKey,
            callback: (token: string) => {
              onVerify(token);
              setWidgetLoaded(true);
            },
            "expired-callback": () => {
              if (onExpire) onExpire();
              setWidgetLoaded(false);
            },
            "error-callback": () => {
              if (onError) onError();
              setWidgetLoaded(false);
            },
          });
          widgetIdRef.current = widgetId;
          setWidgetLoaded(true);
        } catch (err) {
          console.error("Turnstile render error:", err);
        }
      }
    };

    if (typeof window !== "undefined" && window.turnstile) {
      renderWidget();
    } else {
      window.onloadTurnstileCallback = () => {
        renderWidget();
      };
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        } catch (err) {
          console.error("Turnstile cleanup error:", err);
        }
      }
    };
  }, [onVerify, onExpire, onError]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "14px 0" }}>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback"
        strategy="afterInteractive"
      />
      {!widgetLoaded && (
        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "var(--color-text-muted)" }}>
          <Loader2 className="animate-spin" size={16} />
          <span>Loading security verification...</span>
        </div>
      )}
      <div ref={containerRef} />
    </div>
  );
}

// Global window declaration
declare global {
  interface Window {
    turnstile?: any;
    onloadTurnstileCallback?: () => void;
  }
}
