"use client";

import { useEffect } from "react";
import { ArrowRight, CheckCircle2, Sparkles, X } from "lucide-react";
import type { WebinarPreviewItem } from "./webinarPreviewData";

interface WebinarPreviewDrawerProps {
  item: WebinarPreviewItem | null;
  onClose: () => void;
  onReserveSeat: (rolePrefill?: string) => void;
}

export function WebinarPreviewDrawer({
  item,
  onClose,
  onReserveSeat,
}: WebinarPreviewDrawerProps) {
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      className="wb-drawer-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="wb-drawer-title"
    >
      <aside
        className={`wb-drawer-panel wb-drawer-accent-${item.accent}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="wb-drawer-header">
          <span className={`wb-drawer-badge wb-drawer-badge-${item.accent}`}>
            <Sparkles size={12} />
            <span>{item.badge}</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="wb-drawer-close-btn"
            aria-label="Close preview drawer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="wb-drawer-body">
          <h3 id="wb-drawer-title" className="wb-drawer-title">
            {item.title}
          </h3>
          <p className="wb-drawer-subtitle">{item.subtitle}</p>
          <p className="wb-drawer-summary">{item.summary}</p>

          <div className="wb-drawer-list-card">
            <div className="wb-drawer-list-heading">{item.highlightsTitle}</div>
            <ul className="wb-drawer-list">
              {item.highlights.map((point, index) => (
                <li key={index} className="wb-drawer-list-item">
                  <CheckCircle2
                    size={16}
                    className={`wb-drawer-check wb-drawer-check-${item.accent}`}
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="wb-drawer-outcome">
            <strong>Takeaway:</strong> {item.outcomeNote}
          </div>
        </div>

        <div className="wb-drawer-footer">
          <button
            type="button"
            onClick={() => onReserveSeat(item.rolePrefill)}
            className="wb-drawer-cta-btn"
          >
            <span>{item.ctaLabel}</span>
            <ArrowRight size={17} />
          </button>
          <p className="wb-drawer-meta">
            Live Masterclass • 12–13 Dec (2–3 PM IST) • ₹99 Pass
          </p>
        </div>
      </aside>
    </div>
  );
}

