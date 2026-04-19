"use client";

import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { label: "Services", href: "/#services" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "#04070D",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        padding: "48px 32px 32px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* Top row — Logo + Social Icons */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
          <Link href="/">
            <Image
              src="/logo-light.png"
              alt="ScalePods"
              width={180}
              height={50}
              style={{ height: "48px", width: "auto", objectFit: "contain", display: "block" }}
            />
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/scalepods.co/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: "36px", height: "36px", borderRadius: "9px",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#3B82F6", border: "1px solid rgba(59,130,246,0.2)",
                textDecoration: "none", transition: "color 0.2s, border-color 0.2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = "#93C5FD";
                e.currentTarget.style.borderColor = "rgba(147,197,253,0.4)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = "#3B82F6";
                e.currentTarget.style.borderColor = "rgba(59,130,246,0.2)";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/scalepods-co"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: "36px", height: "36px", borderRadius: "9px",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#3B82F6", border: "1px solid rgba(59,130,246,0.2)",
                textDecoration: "none", transition: "color 0.2s, border-color 0.2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = "#93C5FD";
                e.currentTarget.style.borderColor = "rgba(147,197,253,0.4)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = "#3B82F6";
                e.currentTarget.style.borderColor = "rgba(59,130,246,0.2)";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>

        {/* Nav links row */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "32px", marginBottom: "40px" }}>
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              style={{
                fontSize: "14px",
                color: "#6B7280",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#E5E7EB")}
              onMouseLeave={e => (e.currentTarget.style.color = "#6B7280")}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Bottom divider + copyright row */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <span style={{ fontSize: "13px", color: "#374151" }}>
            © 2025 ScalePods. All rights reserved.
          </span>
          <a
            href="mailto:Info@scalepods.co"
            style={{ fontSize: "13px", color: "#374151", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#9CA3AF")}
            onMouseLeave={e => (e.currentTarget.style.color = "#374151")}
          >
            Info@scalepods.co
          </a>
        </div>

      </div>
    </footer>
  );
}
