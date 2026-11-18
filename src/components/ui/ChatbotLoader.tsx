"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * ChatbotLoader
 * ─────────────
 * Dynamically injects React (UMD), ReactDOM (UMD), and the ScalePods chatbot
 * embed script in strict sequential order. Each script waits for the previous
 * one to fully load before injecting the next, avoiding the race condition
 * that caused the chatbot to silently fail when using Next.js <Script>.
 */
interface ChatbotWindow extends Window {
  __SCALEPODS_LOADER_INIT__?: boolean;
  React?: unknown;
  ReactDOM?: unknown;
}

export default function ChatbotLoader() {
  const pathname = usePathname();
  const shouldHide =
    pathname?.startsWith("/ai-business-automation-webinar") ||
    pathname?.startsWith("/admin");

  useEffect(() => {
    if (shouldHide) return;
    const win = window as ChatbotWindow;
    // Guard: only run once
    if (win.__SCALEPODS_LOADER_INIT__) return;
    win.__SCALEPODS_LOADER_INIT__ = true;

    const loadScript = (src: string): Promise<boolean> => {
      return new Promise((resolve) => {
        // Prevent duplicate injection
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve(true);
          return;
        }

        const s = document.createElement("script");
        s.src = src;
        s.async = true;
        s.onload = () => resolve(true);
        s.onerror = () => {
          s.remove();
          resolve(false);
        };
        document.body.appendChild(s);
      });
    };

    const loadWithFallbacks = async (sources: string[]): Promise<boolean> => {
      for (const src of sources) {
        const ok = await loadScript(src);
        if (ok) return true;
      }
      return false;
    };

    (async () => {
      try {
        // Only load React 18 UMD if not already present on window for embed.js
        if (!win.React) {
          const okReact = await loadWithFallbacks([
            "https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js",
            "https://unpkg.com/react@18.3.1/umd/react.production.min.js",
            "https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js",
          ]);
          if (!okReact) {
            console.warn("[ChatbotLoader] Could not load React UMD bundle from CDN (blocked or offline).");
            return;
          }
        }

        // Only load ReactDOM 18 UMD if not already present on window for embed.js
        if (!win.ReactDOM) {
          const okDom = await loadWithFallbacks([
            "https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js",
            "https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js",
            "https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.production.min.js",
          ]);
          if (!okDom) {
            console.warn("[ChatbotLoader] Could not load ReactDOM UMD bundle from CDN (blocked or offline).");
            return;
          }
        }

        const okEmbed = await loadScript("https://updated-chatbot-beta.vercel.app/embed.js");
        if (!okEmbed) {
          console.warn("[ChatbotLoader] Could not load Chatbot embed script (blocked or offline).");
        }
      } catch (err) {
        console.warn("[ChatbotLoader] Note: External chatbot assets could not be loaded:", err);
      }
    })();
  }, [shouldHide]);

  if (shouldHide) {
    return null;
  }

  return <div id="scalepods-chat-root" />;
}
