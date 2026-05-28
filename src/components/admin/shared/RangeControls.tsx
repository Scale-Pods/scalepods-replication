"use client";

import { memo } from "react";
import DateRangePicker from "./DateRangePicker";

export interface RangeValue {
  preset?: "7d" | "30d" | "90d";
  custom?: { start: string; end: string };
}

interface RangeControlsProps {
  range: RangeValue;
  onChange: (r: RangeValue) => void;
}

const PRESETS = [
  { key: "7d",  label: "7D"  },
  { key: "30d", label: "30D" },
  { key: "90d", label: "90D" },
] as const;

export default memo(function RangeControls({ range, onChange }: RangeControlsProps) {
  const activePreset  = range.preset;
  const customActive  = !!range.custom;

  return (
    <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
      {PRESETS.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onChange({ preset: key })}
          style={{
            padding: "5px 14px",
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: activePreset === key && !customActive ? 600 : 500,
            border: activePreset === key && !customActive
              ? "1px solid var(--accent)44"
              : "1px solid var(--border)",
            background: activePreset === key && !customActive
              ? "var(--accent-dim)"
              : "transparent",
            color: activePreset === key && !customActive
              ? "var(--accent)"
              : "var(--text-secondary)",
            cursor: "pointer",
            transition: "background 0.15s, color 0.15s",
            letterSpacing: "0.01em",
            userSelect: "none",
          }}
        >
          {label}
        </button>
      ))}

      <DateRangePicker
        active={customActive}
        value={range.custom}
        onApply={(dr) => onChange({ custom: dr })}
      />
    </div>
  );
});
