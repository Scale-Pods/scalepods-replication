"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { useMobile } from "@/lib/hooks";

const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Use Cases", href: "/use-cases" },
  { label: "Global", href: "/gcc" },
];

const globalSections = [
  { label: "AI Workflow Operating System", id: "ai-workflow" },
  { label: "Sales Automation", id: "sales-automation" },
  { label: "HR Workflow Automation", id: "hr-workflow" },
  { label: "Operations Workflow", id: "operations-workflow" },
  { label: "Marketing Automation", id: "marketing-workflow" },
  { label: "Custom AI Workflow", id: "custom-ai" },
  { label: "Enterprise Differentiation", id: "enterprise" },
  { label: "Operational Lifecycle", id: "lifecycle" },
  { label: "Why Choose Us", id: "why-choose-us" },
  { label: "Services", id: "services" },
  { label: "Reviews", id: "reviews" },
  { label: "Features", id: "features" },
  { label: "Footer / Contact", id: "footer" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [globalExpanded, setGlobalExpanded] = useState(false);
  const isMobile = useMobile(1023);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
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
          height: "70px",
          display: "flex",
          alignItems: "center",
          background: scrolled ? "rgba(4,7,13,0.92)" : "rgba(4,7,13,0.6)",
          WebkitBackdropFilter: "blur(20px)",
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
          <Link href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0, height: "70px" }}>
            <Image
              src="/logo-light.png"
              alt="ScalePods"
              width={360}
              height={100}
              style={{ height: "100px", width: "auto", objectFit: "contain", display: "block", transition: "height 0.3s ease" }}
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
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#8899AB";
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

      {/* ── Sidebar Drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 90,
                background: "rgba(0,0,0,0.4)",
                WebkitBackdropFilter: "blur(4px)",
                backdropFilter: "blur(4px)",
              }}
            />

            {/* Right Sidebar Drawer */}
            <motion.div
              key="sidebar-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                width: "min(380px, 85%)",
                zIndex: 100,
                background: "rgba(4, 7, 13, 0.95)",
                WebkitBackdropFilter: "blur(20px)",
                backdropFilter: "blur(20px)",
                borderLeft: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                flexDirection: "column",
                boxShadow: "-10px 0 30px rgba(0,0,0,0.5)",
                overflow: "hidden",
              }}
            >
              {/* Header inside Sidebar */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 20px",
                height: "70px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                flexShrink: 0,
              }}>
                <span style={{ 
                  fontFamily: "Inter, sans-serif", 
                  fontSize: "12px", 
                  fontWeight: 600, 
                  letterSpacing: "0.1em", 
                  color: "#6B7A96",
                  textTransform: "uppercase" 
                }}>
                  Navigation
                </span>
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
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
                  aria-label="Close menu"
                >
                  <X style={{ width: "18px", height: "18px" }} />
                </button>
              </div>

              {/* Nav links — vertical list */}
              <div style={{ 
                flexGrow: 1, 
                padding: "10px 0",
                overflowY: "auto",
              }}>
                {navLinks.map((link, i) => {
                  if (link.label === "Global") {
                    return (
                      <div key={link.label} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Link
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            style={{
                              flexGrow: 1,
                              display: "flex",
                              alignItems: "center",
                              fontSize: "15px",
                              fontWeight: 500,
                              color: "rgba(255,255,255,0.8)",
                              textDecoration: "none",
                              padding: "16px 24px",
                              fontFamily: "Inter, sans-serif",
                              transition: "all 0.2s ease",
                            }}
                          >
                            {link.label}
                          </Link>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setGlobalExpanded(!globalExpanded);
                            }}
                            style={{
                              background: "rgba(255,255,255,0.03)",
                              border: "none",
                              borderLeft: "1px solid rgba(255,255,255,0.06)",
                              height: "52px",
                              width: "52px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              color: "rgba(255,255,255,0.6)",
                            }}
                          >
                            <ChevronDown 
                              style={{ 
                                width: "16px", 
                                height: "16px", 
                                transform: globalExpanded ? "rotate(180deg)" : "rotate(0deg)",
                                transition: "transform 0.3s ease"
                              }} 
                            />
                          </button>
                        </div>
                        
                        <AnimatePresence>
                          {globalExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              style={{ overflow: "hidden", background: "rgba(255,255,255,0.02)" }}
                            >
                              {globalSections.map((sec) => (
                                <button
                                  key={sec.id}
                                  onClick={() => {
                                    setMenuOpen(false);
                                    // Smooth scroll to section
                                    const el = document.getElementById(sec.id);
                                    if (el) {
                                      const offset = 80;
                                      const bodyRect = document.body.getBoundingClientRect().top;
                                      const elementRect = el.getBoundingClientRect().top;
                                      const elementPosition = elementRect - bodyRect;
                                      const offsetPosition = elementPosition - offset;
                                      window.scrollTo({
                                        top: offsetPosition,
                                        behavior: "smooth"
                                      });
                                    }
                                  }}
                                  style={{
                                    display: "block",
                                    width: "100%",
                                    textAlign: "left",
                                    padding: "12px 40px",
                                    fontSize: "13px",
                                    color: "rgba(255,255,255,0.6)",
                                    background: "transparent",
                                    border: "none",
                                    fontFamily: "Inter, sans-serif",
                                    cursor: "pointer",
                                  }}
                                >
                                  • {sec.label}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 + 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: "15px",
                          fontWeight: 500,
                          color: "rgba(255,255,255,0.8)",
                          textDecoration: "none",
                          padding: "16px 24px",
                          fontFamily: "Inter, sans-serif",
                          transition: "all 0.2s ease",
                          borderLeft: "2px solid transparent",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "#fff";
                          e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                          e.currentTarget.style.borderLeftColor = "#0080FF";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = "rgba(255,255,255,0.8)";
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.borderLeftColor = "transparent";
                        }}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom Support/Contact Card */}
              <div style={{
                padding: "24px",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.01)",
                flexShrink: 0,
              }}>
                <div style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "16px",
                  padding: "16px",
                }}>
                  <p style={{
                    fontSize: "12px",
                    color: "#6B7A96",
                    marginBottom: "8px",
                    lineHeight: 1.5,
                    fontFamily: "Inter, sans-serif",
                  }}>
                    Facing technical challenges? We&apos;re here to assist.
                  </p>
                  <a
                    href="mailto:Info@scalepods.co"
                    style={{
                      fontSize: "13px",
                      color: "#fff",
                      textDecoration: "none",
                      fontWeight: 500,
                      fontFamily: "Inter, sans-serif",
                      display: "block",
                    }}
                  >
                    Info@scalepods.co
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
