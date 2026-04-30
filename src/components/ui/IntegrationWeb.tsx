"use client";

import { motion } from "framer-motion";
import { useMobile } from "@/lib/hooks";

const C = {
  blueMid: "#6DB6FF",
  green: "#ACD791",
  border: "#222222",
  bgCard: "#0D0F17",
};

// Simplified SVGs for the nodes
const I_SVG = {
  slack: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"/><path d="M20.5 10H16V5.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v4.5z"/><path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5z"/><path d="M3.5 14H8v4.5c0 .83-.67 1.5-1.5 1.5S5 19.33 5 18.5V14z"/><path d="M14 9.5c0 .83.67 1.5 1.5 1.5h5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5h-5c-.83 0-1.5.67-1.5 1.5z"/><path d="M14 20.5v-4.5h4.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-4.5z"/><path d="M10 14.5c0-.83-.67-1.5-1.5-1.5h-5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5c.83 0 1.5-.67 1.5-1.5z"/><path d="M10 3.5v4.5H5.5C4.67 8 4 7.33 4 6.5S4.67 5 5.5 5h4.5z"/></svg>,
  notion: <svg width="24" height="24" viewBox="0 0 100 100"><path d="M10 10v80h80V10H10zm11 11h58v58H21V21zm9 8v29l32-15V14l-32 15z" fill="currentColor"/></svg>,
  zapier: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
  salesforce: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>,
  google: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"/></svg>,
  hubspot: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><circle cx="5" cy="5" r="2"/><circle cx="19" cy="5" r="2"/><path d="M6.5 6.5l4 4M17.5 6.5l-4 4M12 15v5"/></svg>,
};

/**
 * IntegrationWeb
 * ────────────────
 * Renders a central animated star with connecting paths to various tool icons.
 * Replaces the static marquee with a dynamic "web" graphic.
 */
export default function IntegrationWeb() {
  const isMobile = useMobile(768);
  const size = isMobile ? 320 : 600;
  const center = size / 2;
  const radius = isMobile ? 100 : 200;

  // Orbiting nodes around the center
  const nodes = [
    { id: "slack", icon: I_SVG.slack, angle: -Math.PI / 2 },
    { id: "notion", icon: I_SVG.notion, angle: -Math.PI / 6 },
    { id: "zapier", icon: I_SVG.zapier, angle: Math.PI / 6 },
    { id: "salesforce", icon: I_SVG.salesforce, angle: Math.PI / 2 },
    { id: "google", icon: I_SVG.google, angle: (5 * Math.PI) / 6 },
    { id: "hubspot", icon: I_SVG.hubspot, angle: (7 * Math.PI) / 6 },
  ];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: `${size}px`,
        height: `${size}px`,
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* SVG Connections (Wires) */}
      <svg
        width={size}
        height={size}
        style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "visible" }}
      >
        {nodes.map((node, i) => {
          const x2 = center + Math.cos(node.angle) * radius;
          const y2 = center + Math.sin(node.angle) * radius;

          // Add a little bezier curve for a "web" feel instead of straight lines
          const pathD = `M ${center} ${center} Q ${center + (x2 - center) * 0.2} ${
            center + (y2 - center) * 0.8
          } ${x2} ${y2}`;

          return (
            <g key={node.id}>
              {/* Static faint path */}
              <path
                d={pathD}
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="2"
              />
              {/* Animated pulse packet along the path */}
              <motion.path
                d={pathD}
                fill="none"
                stroke={C.blueMid}
                strokeWidth="2"
                strokeDasharray="0 100"
                initial={{ strokeDashoffset: 100, opacity: 0 }}
                animate={{
                  strokeDashoffset: [100, 0],
                  strokeDasharray: ["0 100", "20 80"],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2.5,
                  delay: i * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* Center Main Node */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 10,
        }}
      >
        <div
          style={{
            position: "relative",
            width: isMobile ? "64px" : "80px",
            height: isMobile ? "64px" : "80px",
            borderRadius: "50%",
            background: "#0A0D14",
            border: `1px solid rgba(109,182,255,0.3)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 40px rgba(109,182,255,0.2)",
          }}
        >
          {/* Inner glowing star */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], filter: ["blur(0px)", "blur(2px)", "blur(0px)"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{ color: C.green }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="2" />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Orbiting Tool Nodes */}
      {nodes.map((node, i) => {
        const x = Math.cos(node.angle) * radius;
        const y = Math.sin(node.angle) * radius;

        return (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            style={{
              position: "absolute",
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: "translate(-50%, -50%)",
              zIndex: 5,
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(255,255,255,0.8)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                WebkitBackdropFilter: "blur(4px)",
                backdropFilter: "blur(4px)",
              }}
            >
              {node.icon}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
