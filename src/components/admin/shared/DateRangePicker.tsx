"use client";

import { useState, useRef, useEffect, memo } from "react";
import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";

interface DateRange {
  start: string; // "YYYY-MM-DD"
  end:   string;
}

interface DateRangePickerProps {
  value?: DateRange;
  onApply: (range: DateRange) => void;
  active?: boolean;
}

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS   = ["Su","Mo","Tu","We","Th","Fr","Sa"];

function isoToDate(iso: string): Date {
  return new Date(iso + "T00:00:00");
}

function dateToIso(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

export default memo(function DateRangePicker({ value, onApply, active = false }: DateRangePickerProps) {
  const today = dateToIso(new Date());
  const [open, setOpen]         = useState(false);
  const [selecting, setSelecting] = useState<"start" | "end">("start");
  const [hovered, setHovered]   = useState<string | null>(null);
  const [draft, setDraft]       = useState<Partial<DateRange>>(value ?? {});

  const now   = new Date();
  const [viewYear,  setViewYear]  = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());

  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  }

  function handleDayClick(iso: string) {
    if (iso > today) return; // no future dates
    if (selecting === "start") {
      setDraft({ start: iso });
      setSelecting("end");
    } else {
      if (draft.start && iso < draft.start) {
        // Clicked before start — reset
        setDraft({ start: iso });
        setSelecting("end");
      } else {
        setDraft(d => ({ ...d, end: iso }));
        setSelecting("start");
      }
    }
  }

  function apply() {
    if (draft.start && draft.end) {
      onApply({ start: draft.start, end: draft.end });
      setOpen(false);
    }
  }

  function reset() {
    setDraft({});
    setSelecting("start");
  }

  // Build calendar grid
  const daysInMonth  = getDaysInMonth(viewYear, viewMonth);
  const firstDay     = getFirstDayOfMonth(viewYear, viewMonth);
  const cells: (string | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) {
    const iso = `${viewYear}-${String(viewMonth + 1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
    cells.push(iso);
  }

  function inRange(iso: string): boolean {
    const s = draft.start;
    const e = draft.end ?? hovered;
    if (!s || !e) return false;
    const [lo, hi] = s <= e ? [s, e] : [e, s];
    return iso > lo && iso < hi;
  }

  function isStart(iso: string)  { return iso === draft.start; }
  function isEnd(iso: string)    { return iso === draft.end; }
  function isFuture(iso: string) { return iso > today; }

  const displayLabel = value?.start && value?.end
    ? `${value.start} → ${value.end}`
    : "Custom";

  return (
    <div ref={ref} style={{ position: "relative" }}>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "5px 14px",
          borderRadius: "6px",
          fontSize: "12px",
          fontWeight: active ? 600 : 500,
          border: active ? "1px solid var(--accent)44" : "1px solid var(--border)",
          background: active ? "var(--accent-dim)" : "transparent",
          color: active ? "var(--accent)" : "var(--text-secondary)",
          cursor: "pointer",
          transition: "background 0.15s, color 0.15s",
          letterSpacing: "0.01em",
          userSelect: "none",
          whiteSpace: "nowrap",
        }}
      >
        <Calendar size={11} />
        {displayLabel}
      </button>

      {/* Popup */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            zIndex: 200,
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            boxShadow: "var(--shadow-lg)",
            padding: "16px",
            width: "280px",
          }}
        >
          {/* Month nav */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <button onClick={prevMonth} style={navBtnStyle}>
              <ChevronLeft size={14} />
            </button>
            <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <button onClick={nextMonth} style={navBtnStyle}>
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Day headers */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", marginBottom: "4px" }}>
            {DAYS.map(d => (
              <div key={d} style={{ textAlign: "center", fontSize: "10px", fontWeight: 600, color: "var(--text-muted)", padding: "4px 0" }}>
                {d}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "1px" }}>
            {cells.map((iso, i) => {
              if (!iso) return <div key={`e-${i}`} />;
              const start  = isStart(iso);
              const end    = isEnd(iso);
              const range  = inRange(iso);
              const future = isFuture(iso);
              return (
                <button
                  key={iso}
                  disabled={future}
                  onClick={() => handleDayClick(iso)}
                  onMouseEnter={() => setHovered(iso)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    padding: "5px 2px",
                    borderRadius: start || end ? "6px" : range ? "0" : "6px",
                    border: "none",
                    fontSize: "12px",
                    fontWeight: start || end ? 700 : 400,
                    cursor: future ? "default" : "pointer",
                    opacity: future ? 0.3 : 1,
                    background: start || end
                      ? "var(--accent)"
                      : range
                      ? "var(--accent-dim)"
                      : "transparent",
                    color: start || end
                      ? "#fff"
                      : range
                      ? "var(--accent)"
                      : "var(--text-secondary)",
                    transition: "background 0.1s",
                  }}
                >
                  {parseInt(iso.slice(8), 10)}
                </button>
              );
            })}
          </div>

          {/* Hint */}
          <div style={{ fontSize: "11px", color: "var(--text-muted)", textAlign: "center", margin: "10px 0 6px" }}>
            {selecting === "start" ? "Select start date" : "Select end date"}
          </div>

          {/* Footer */}
          <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
            <button onClick={reset} style={secondaryBtnStyle}>
              <X size={11} /> Clear
            </button>
            <button
              onClick={apply}
              disabled={!draft.start || !draft.end}
              style={{
                ...primaryBtnStyle,
                opacity: (!draft.start || !draft.end) ? 0.4 : 1,
                cursor: (!draft.start || !draft.end) ? "default" : "pointer",
              }}
            >
              Apply Range
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

const navBtnStyle: React.CSSProperties = {
  background: "none",
  border: "1px solid var(--border)",
  borderRadius: "6px",
  cursor: "pointer",
  color: "var(--text-secondary)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "4px",
};

const primaryBtnStyle: React.CSSProperties = {
  flex: 1,
  padding: "7px 12px",
  borderRadius: "6px",
  fontSize: "12px",
  fontWeight: 600,
  border: "none",
  background: "var(--accent)",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "4px",
};

const secondaryBtnStyle: React.CSSProperties = {
  padding: "7px 10px",
  borderRadius: "6px",
  fontSize: "12px",
  fontWeight: 500,
  border: "1px solid var(--border)",
  background: "transparent",
  color: "var(--text-secondary)",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "4px",
};
