"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

export default function ClarityProvider() {
  useEffect(() => {
    const initClarity = () => {
      try {
        Clarity.init("wlfzu32jnz");
      } catch (err) {
        console.warn("Clarity initialization deferred or blocked:", err);
      }
    };

    if (typeof window !== "undefined") {
      // Defer Clarity execution until browser is idle to optimize mobile interactivity
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(() => {
          setTimeout(initClarity, 3000);
        });
      } else {
        setTimeout(initClarity, 4000);
      }
    }
  }, []);

  return null;
}
