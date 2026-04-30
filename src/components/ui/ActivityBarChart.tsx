"use client";

import { motion } from "framer-motion";

const C = {
  bgCard: "#0D0F17",
  border: "#222222",
  txtBright: "#E4E9F2",
  txtMuted: "#636996",
  txtFaint: "#545B7D",
  blueMid: "#6DB6FF",
};

const F = {
  inter: "var(--font-inter), Inter, sans-serif",
};

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
const values = [30, 55, 40, 80, 60, 90, 70]; // percentage heights

/**
 * ActivityBarChart
 * ────────────────
 * Stylised bar chart that matches the original scalepods.co "Step 2" visual.
 * Rounded-top bars with a blue-to-teal gradient, month labels, and Y-axis
 * percentage labels. Bars animate upward when scrolled into view.
 */
export default function ActivityBarChart() {
  const chartH = 160;
  const barW = 24;
  const gap = 16;
  const totalW = months.length * (barW + gap) - gap;
  const padL = 44; // space for Y-axis labels
  const padB = 28; // space for X-axis labels

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "360px",
        margin: "0 auto",
        fontFamily: F.inter,
      }}
    >
      {/* Title */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <span
          style={{
            fontSize: "13px",
            fontWeight: 600,
            color: C.txtBright,
            letterSpacing: "0.02em",
          }}
        >
          Activity
        </span>
        <span
          style={{
            fontSize: "10px",
            color: C.txtFaint,
            border: `1px solid ${C.border}`,
            borderRadius: "4px",
            padding: "2px 8px",
          }}
        >
          Monthly
        </span>
      </div>

      {/* Chart Area */}
      <div style={{ position: "relative", paddingLeft: `${padL}px`, paddingBottom: `${padB}px` }}>
        {/* Y-axis labels */}
        {[100, 80, 60, 40, 20, 0].map((v) => (
          <div
            key={v}
            style={{
              position: "absolute",
              left: 0,
              top: `${((100 - v) / 100) * chartH}px`,
              fontSize: "9px",
              color: C.txtFaint,
              transform: "translateY(-50%)",
              width: `${padL - 8}px`,
              textAlign: "right",
            }}
          >
            {v}%
          </div>
        ))}

        {/* Grid lines */}
        {[0, 20, 40, 60, 80, 100].map((v) => (
          <div
            key={`g${v}`}
            style={{
              position: "absolute",
              left: `${padL}px`,
              right: 0,
              top: `${((100 - v) / 100) * chartH}px`,
              height: "1px",
              background: "rgba(255,255,255,0.04)",
            }}
          />
        ))}

        {/* Bars */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: `${gap}px`,
            height: `${chartH}px`,
          }}
        >
          {months.map((m, i) => {
            const h = (values[i] / 100) * chartH;
            return (
              <div
                key={m}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: `${barW}px`,
                }}
              >
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: h }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    width: "100%",
                    borderRadius: "6px 6px 2px 2px",
                    background: `linear-gradient(to top, rgba(109,182,255,0.2), rgba(109,182,255,0.6))`,
                    boxShadow: "0 0 12px rgba(109,182,255,0.15)",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  {/* Highlight cap */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "3px",
                      background: C.blueMid,
                      borderRadius: "6px 6px 0 0",
                    }}
                  />
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* X-axis labels */}
        <div
          style={{
            display: "flex",
            gap: `${gap}px`,
            marginTop: "8px",
          }}
        >
          {months.map((m) => (
            <div
              key={`l${m}`}
              style={{
                width: `${barW}px`,
                textAlign: "center",
                fontSize: "9px",
                color: C.txtFaint,
              }}
            >
              {m}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
