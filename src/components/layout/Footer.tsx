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
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "80px 32px 40px",
        fontFamily: "Inter, sans-serif",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Cinematic Ambient Light */}
      <div style={{
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "60%",
        height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(172, 215, 145, 0.3), transparent)",
        boxShadow: "0 0 30px 1px rgba(172, 215, 145, 0.2)",
        zIndex: 1
      }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 2 }}>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
          gap: "60px",
          marginBottom: "60px" 
        }}>
          {/* Brand Column */}
          <div style={{ flex: 1 }}>
            <Link href="/" style={{ display: "inline-block", marginBottom: "24px" }}>
              <Image
                src="/logo-light.png"
                alt="ScalePods"
                width={200}
                height={55}
                style={{ height: "55px", width: "auto", objectFit: "contain", display: "block" }}
              />
            </Link>
            <p style={{ 
              fontSize: "14px", 
              color: "#8899AB", 
              lineHeight: 1.6, 
              maxWidth: "280px",
              marginBottom: "24px"
            }}>
              Architecting the future of enterprise operations through autonomous Agentic AI ecosystems.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {/* Social links with glass styling */}
              {[
                { 
                  href: "https://www.instagram.com/scalepods.co/", 
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  )
                },
                { 
                  href: "https://www.linkedin.com/company/scalepods-co", 
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
                    </svg>
                  )
                }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: "40px", height: "40px", borderRadius: "12px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#E4E9F2", background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    textDecoration: "none", transition: "all 0.3s ease",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.borderColor = "rgba(172, 215, 145, 0.4)";
                    e.currentTarget.style.color = "#ACD791";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.color = "#E4E9F2";
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
            <div>
              <h4 style={{ color: "#E4E9F2", fontSize: "14px", fontWeight: 700, marginBottom: "24px", textTransform: "uppercase", letterSpacing: "0.1em" }}>Platform</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {footerLinks.slice(0, 3).map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    style={{ fontSize: "14px", color: "#8899AB", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#ACD791")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#8899AB")}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ color: "#E4E9F2", fontSize: "14px", fontWeight: 700, marginBottom: "24px", textTransform: "uppercase", letterSpacing: "0.1em" }}>Legal</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {footerLinks.slice(3).map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    style={{ fontSize: "14px", color: "#8899AB", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#ACD791")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#8899AB")}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Column */}
          <div>
            <h4 style={{ color: "#E4E9F2", fontSize: "14px", fontWeight: 700, marginBottom: "24px", textTransform: "uppercase", letterSpacing: "0.1em" }}>Connect</h4>
            <a
              href="mailto:Info@scalepods.co"
              style={{ 
                display: "block", 
                fontSize: "15px", 
                color: "#E4E9F2", 
                fontWeight: 600, 
                textDecoration: "none",
                marginBottom: "8px"
              }}
            >
              Info@scalepods.co
            </a>
            <p style={{ fontSize: "13px", color: "#8899AB" }}>Dubai, United Arab Emirates</p>
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          <span style={{ fontSize: "13px", color: "#6B7280" }}>
            © 2025 ScalePods AI Infrastructure. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: "24px" }}>
             <span style={{ fontSize: "11px", color: "#374151", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>Built for the future</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
