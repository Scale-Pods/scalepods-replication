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
export default function ChatbotLoader() {
  const pathname = usePathname();
  if (pathname?.startsWith("/ai-business-automation-webinar") || pathname?.startsWith("/admin")) {
    return null;
  }
  useEffect(() => {
    // Guard: only run once
    if ((window as any).__SCALEPODS_LOADER_INIT__) return;
    (window as any).__SCALEPODS_LOADER_INIT__ = true;

    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const s = document.createElement("script");
        s.src = src;
        s.crossOrigin = "anonymous";
        s.onload = () => resolve();
        s.onerror = () => reject(new Error(`Failed to load: ${src}`));
        document.body.appendChild(s);
      });
    };

    (async () => {
      try {
        // Only load React/ReactDOM if not already present (Next.js uses its own internal copy)
        if (!(window as any).React) {
          await loadScript("https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js");
        }
        if (!(window as any).ReactDOM) {
          await loadScript("https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.production.min.js");
        }
        await loadScript("/chatbot/embed.min.js");
      } catch (err) {
        console.error("[ChatbotLoader]", err);
      }
    })();
  }, []);

  return <div id="scalepods-chat-root" />;
}
