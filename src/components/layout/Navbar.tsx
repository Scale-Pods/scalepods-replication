"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Use Cases", href: "/use-cases" },
  { label: "UAE", href: "/uae" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* ── Desktop/Mobile Navbar Bar ── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          height: "64px",
          display: "flex",
          alignItems: "center",
          background: scrolled ? "rgba(4,7,13,0.92)" : "rgba(4,7,13,0.6)",
          backdropFilter: "blur(20px)",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <div style={{
          maxWidth: "1280px",
          margin: "0 auto",
          width: "100%",
          paddingLeft: "20px",
          paddingRight: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
        }}>
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            <Image
              src="/logo-light.png"
              alt="ScalePods"
              width={140}
              height={38}
              style={{ width: "auto", height: "32px", objectFit: "contain", display: "block" }}
              priority
            />
          </Link>

          {/* Center Nav — pill, hidden on mobile */}
          <nav
            className="hidden md:flex"
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              alignItems: "center",
              gap: "4px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: "40px",
              padding: "6px 12px",
              backdropFilter: "blur(8px)",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  fontSize: "13.5px",
                  fontWeight: 500,
                  color: "#8899AB",
                  textDecoration: "none",
                  padding: "5px 14px",
                  borderRadius: "24px",
                  transition: "color 0.2s, background 0.2s",
                  whiteSpace: "nowrap",
                  fontFamily: "Inter, sans-serif",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#E4E9F2";
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#8899AB";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(true)}
            style={{
              background: "none",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              padding: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="Open menu"
          >
            <Menu style={{ width: "22px", height: "22px" }} />
          </button>
        </div>
      </motion.header>

      {/* ── Mobile Full-Screen Menu ── matches scalepods.co reference */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100,
              background: "#04070D",
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
            }}
          >
            {/* Top bar: logo left, X right */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 20px",
              height: "64px",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              flexShrink: 0,
            }}>
              <Link href="/" onClick={() => setMenuOpen(false)}>
                <Image
                  src="/logo-light.png"
                  alt="ScalePods"
                  width={120}
                  height={30}
                  style={{ width: "auto", height: "28px", objectFit: "contain" }}
                />
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "8px",
                  color: "#fff",
                  cursor: "pointer",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                aria-label="Close menu"
              >
                <X style={{ width: "18px", height: "18px" }} />
              </button>
            </div>

            {/* Nav links — left aligned, staggered fade-in */}
            <div style={{ flexGrow: 1 }}>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.08, duration: 0.22 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: "block",
                      fontSize: "18px",
                      fontWeight: 400,
                      color: "rgba(255,255,255,0.75)",
                      textDecoration: "none",
                      padding: "18px 24px",
                      fontFamily: "Inter, sans-serif",
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom contact info card (matches reference screenshot) */}
            <div style={{
              padding: "20px",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              flexShrink: 0,
            }}>
              <div style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "16px",
                padding: "20px",
              }}>
                <p style={{
                  fontSize: "13px",
                  color: "#6B7A96",
                  marginBottom: "10px",
                  lineHeight: 1.5,
                  fontFamily: "Inter, sans-serif",
                }}>
                  Facing technical challenges or product concerns? We&apos;re here to assist
                </p>
                <a
                  href="mailto:Info@scalepods.co"
                  style={{
                    fontSize: "14px",
                    color: "#fff",
                    textDecoration: "underline",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Info@scalepods.co
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
