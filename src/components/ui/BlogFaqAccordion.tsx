"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface BlogFaqAccordionProps {
  faqData: FAQItem[];
}

const C = {
  blueMid: "var(--color-blue-mid)",
  txtMuted: "var(--color-text-muted)",
};

const F = {
  inter: "var(--font-inter), Inter, sans-serif",
};

export default function BlogFaqAccordion({ faqData }: BlogFaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
      {faqData.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            style={{
              background: isOpen ? "var(--color-bg-card-alt)" : "var(--color-bg-card)",
              border: isOpen
                ? "1px solid var(--color-blue-mid)"
                : `1px solid var(--color-border)`,
              borderRadius: "12px",
              overflow: "hidden",
              transition: "all 0.3s ease",
            }}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                color: C.blueMid,
                fontFamily: F.inter,
                fontSize: "15px",
                fontWeight: isOpen ? 500 : 400,
                textAlign: "left",
              }}
            >
              <span style={{ color: "var(--color-text-bright)", fontWeight: isOpen ? 600 : 500 }}>
                {item.q}
              </span>
              {isOpen ? (
                <ChevronUp style={{ width: "20px", height: "20px", opacity: 0.8, flexShrink: 0, color: "var(--color-blue-mid)" }} />
              ) : (
                <ChevronDown style={{ width: "20px", height: "20px", opacity: 0.5, color: C.txtMuted, flexShrink: 0 }} />
              )}
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div
                    style={{
                      padding: "0 24px 24px",
                      color: C.txtMuted,
                      fontFamily: F.inter,
                      fontSize: "14px",
                      lineHeight: 1.7,
                    }}
                  >
                    {item.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
