"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
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

  return (
    <>
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
        {/* Left padding with gap from edge */}
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            width: "100%",
            paddingLeft: "28px",
            paddingRight: "28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          {/* Logo — explicitly sized & positioned per live site */}
          <Link href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0, marginLeft: "40px" }}>
            <Image
              src="/logo-light.png"
              alt="ScalePods"
              width={160}
              height={44}
              style={{ width: "154px", height: "auto", objectFit: "contain", display: "block" }}
              priority
            />
          </Link>

          {/* Center Nav — pill border, hidden on mobile, flex on md+ */}
          <nav
            className="hidden md:flex"
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
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
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ marginLeft: "auto" }}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6"
            style={{ background: "rgba(4,7,13,0.97)", backdropFilter: "blur(16px)" }}
          >
            <button
              className="absolute top-4 right-6 text-white"
              onClick={() => setMenuOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontSize: "22px",
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.75)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                  fontFamily: "Inter, sans-serif",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
