"use client";
import { useEffect, useState } from "react";

interface Props {
  value: number;
  suffix?: string;
  duration?: number;
  decimals?: number;
}

export default function AnimatedMetric({ value, suffix = "", duration = 1500, decimals }: Props) {
  const isFloat = decimals !== undefined ? decimals > 0 : value % 1 !== 0;
  const decCount = decimals !== undefined ? decimals : (isFloat ? 1 : 0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const current = progress * value;
      setCount(isFloat ? Number(current.toFixed(decCount)) : Math.floor(current));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };
    window.requestAnimationFrame(step);
  }, [value, duration, isFloat, decCount]);

  // Format with commas or decimals
  const formatted = isFloat ? count.toFixed(decCount) : count.toLocaleString("en-US");

  return <span>{formatted}{suffix}</span>;
}

