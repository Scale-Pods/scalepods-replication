"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, memo, useCallback } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Moon, Sun, Monitor } from "lucide-react";
import { useMobile } from "@/lib/hooks";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useRouter, usePathname } from "next/navigation";

const ThemeToggle = memo(() => {

  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div style={{ width: "100px", height: "36px" }} />;

  return (
    <div style={{ 
      display: "flex", 
      alignItems: "center", 
      gap: "4px", 
      background: "var(--color-bg-input)", 
      border: "1px solid var(--color-border)", 
      borderRadius: "24px", 
      padding: "4px",
      boxShadow: "inset 0 1px 4px rgba(0,0,0,0.1)"
    }}>
      <button
        onClick={() => setTheme("light")}
        style={{
          background: theme === "light" ? "var(--color-bg-page)" : "transparent",
          color: theme === "light" ? "var(--color-blue-bright)" : "var(--color-text-faint)",
          border: theme === "light" ? "1px solid var(--color-border)" : "none",
          borderRadius: "50%",
          width: "28px",
          height: "28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
          boxShadow: theme === "light" ? "0 2px 8px rgba(0,0,0,0.05)" : "none"
        }}
        aria-label="Light mode"
      >
        <Sun size={14} />
      </button>
      <button
        onClick={() => setTheme("dark")}
        style={{
          background: theme === "dark" ? "var(--color-bg-card)" : "transparent",
          color: theme === "dark" ? "var(--color-blue-bright)" : "var(--color-text-faint)",
          border: theme === "dark" ? "1px solid var(--color-border)" : "none",
          borderRadius: "50%",
          width: "28px",
          height: "28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
          boxShadow: theme === "dark" ? "0 2px 8px rgba(0,0,0,0.2)" : "none"
        }}
        aria-label="Dark mode"
      >
        <Moon size={14} />
      </button>
      <button
        onClick={() => setTheme("system")}
        style={{
          background: theme === "system" ? "var(--color-bg-card)" : "transparent",
          color: theme === "system" ? "var(--color-text-bright)" : "var(--color-text-faint)",
          border: theme === "system" ? "1px solid var(--color-border)" : "none",
          borderRadius: "50%",
          width: "28px",
          height: "28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
          boxShadow: theme === "system" ? "0 2px 8px rgba(0,0,0,0.1)" : "none"
        }}
        aria-label="System mode"
      >
        <Monitor size={14} />
      </button>
    </div>
  );
});

const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Use Cases", href: "/use-cases" },
  { label: "Global", href: "/gcc" },
];

const globalSections = [
  { label: "Hero Section: Plug and Play Pods", id: "hero-plug-play" },
  { label: "Key Features: Immersive View", id: "immersive-features" },
  { label: "Sales Pod: CRM Intelligence", id: "sales-pod" },
  { label: "HR: Operational Workflow", id: "hr-workflow" },
  { label: "Operations: Procurement & Compliance", id: "ops-showcase" },
  { label: "Marketing: AI Outreach", id: "marketing-showcase" },
  { label: "Custom Workflow: Deep AI Logic", id: "custom-ai" },
  { label: "Impact: Measurable Growth", id: "impact-showcase" },
  { label: "Why Choose: Brand Advantages", id: "why-choose" },
  { label: "Process: Orchestration Lifecycle", id: "process-showcase" },
  { label: "Case Studies: Transformation Proof", id: "case-studies" },
  { label: "Knowledge: AI Engine Q&A", id: "knowledge-showcase" },
  { label: "Final CTA: Deploy Intelligence", id: "final-cta" },
];

const Navbar = memo(() => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [globalExpanded, setGlobalExpanded] = useState(false);
  const isMobile = useMobile(1023);
  const { resolvedTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  // Throttled scroll listener
  useEffect(() => {
    let lastKnownScrollPosition = 0;
    let ticking = false;

    const onScroll = () => {
      lastKnownScrollPosition = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(lastKnownScrollPosition > 10);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleGlobal = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setGlobalExpanded(prev => !prev);
  }, []);

  const handleSectionNav = (id: string) => {
    // If we are already on the Global page (/gcc)
    if (pathname === "/gcc") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setMenuOpen(false);
      }
    } else {
      // If we are on another page, navigate to /gcc with hash
      router.push(`/gcc#${id}`);
      setMenuOpen(false);
    }
  };

  // Close menu on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [closeMenu]);

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
        transition={{ duration: isMobile ? 0.35 : 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          height: "70px",
          display: "flex",
          alignItems: "center",
          background: scrolled ? "var(--nav-bg-scrolled)" : "var(--nav-bg)",
          WebkitBackdropFilter: "blur(20px)",
          backdropFilter: "blur(20px)",
          borderBottom: scrolled ? "1px solid var(--nav-border)" : "none",
          transition: "all 0.3s ease",
          willChange: "transform, opacity, background",
          transform: "translate3d(0,0,0)"
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
          {/* Logo Area */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link href="/" prefetch={true} style={{ display: "flex", alignItems: "center", flexShrink: 0, height: "70px" }}>
              <div style={{ position: "relative", width: "160px", height: "28px", flexShrink: 0 }}>
                <Image
                  src="/scalepods-navbar-logo.png"
                  alt="ScalePods"
                  fill
                  sizes="160px"
                  priority
                  style={{
                    objectFit: "contain",
                    objectPosition: "left center",
                    transition: "filter 0.3s ease",
                    filter: resolvedTheme === "dark" ? "invert(1)" : "none",
                    willChange: "filter"
                  }}
                />
              </div>
            </Link>
          </div>

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
                prefetch={true}
                style={{
                  fontSize: "13.5px",
                  fontWeight: 500,
                  color: "var(--color-text-muted)",
                  textDecoration: "none",
                  padding: "5px 14px",
                  borderRadius: "24px",
                  transition: "color 0.2s, background 0.2s",
                  whiteSpace: "nowrap",
                  fontFamily: "Inter, sans-serif",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--color-text-bright)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--color-text-muted)";
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Area: Theme Toggle + Menu Trigger */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              onClick={() => setMenuOpen(true)}
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text-bright)",
                cursor: "pointer",
                padding: "10px",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                transform: "translate3d(0,0,0)",
                willChange: "transform"
              }}
              className="hover:scale-105 active:scale-95 group"
              aria-label="Open navigation menu"
            >
              <Menu style={{ width: "22px", height: "22px" }} className="group-hover:rotate-12 transition-transform" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Sidebar Drawer */}
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
              onClick={closeMenu}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 90,
                background: "rgba(0,0,0,0.4)",
                WebkitBackdropFilter: "blur(4px)",
                backdropFilter: "blur(4px)",
                touchAction: "none"
              }}
            />

            {/* Right Side Sidebar */}
            <motion.div
                key="sidebar-menu"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: isMobile ? 0.35 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "fixed",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  width: "min(380px, 85%)",
                  zIndex: 100,
                  background: "var(--color-bg-card)",
                  WebkitBackdropFilter: "blur(20px)",
                  backdropFilter: "blur(20px)",
                  borderLeft: "1px solid var(--color-border)",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: resolvedTheme === 'dark' ? "-10px 0 30px rgba(0,0,0,0.5)" : "-10px 0 30px rgba(0,0,0,0.05)",
                  overflow: "hidden",
                  transform: "translate3d(0,0,0)",
                  willChange: "transform"
                }}
              >
                {/* Header inside Sidebar */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 20px",
                  height: "70px",
                  borderBottom: "1px solid var(--color-border-faint)",
                  flexShrink: 0,
                }}>
                  <span style={{ 
                    fontFamily: "Inter, sans-serif", 
                    fontSize: "12px", 
                    fontWeight: 600, 
                    letterSpacing: "0.1em", 
                    color: "var(--color-text-faint)",
                    textTransform: "uppercase" 
                  }}>
                    Navigation
                  </span>
                  <button
                    onClick={closeMenu}
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "10px",
                      color: "var(--color-text-bright)",
                      cursor: "pointer",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                    }}
                    className="hover:rotate-90 hover:bg-white/10"
                    aria-label="Close menu"
                  >
                    <X style={{ width: "20px", height: "20px" }} />
                  </button>
                </div>

                {/* Nav links — vertical list */}
                <div style={{ 
                  flexGrow: 1, 
                  padding: "10px 0",
                  overflowY: "auto",
                  WebkitOverflowScrolling: "touch"
                }}>
                  {navLinks.map((link, i) => {
                    if (link.label === "Global") {
                      return (
                        <div key={link.label} style={{ borderBottom: "1px solid var(--color-border-faint)" }}>
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <Link
                              href={link.href}
                              prefetch={true}
                              onClick={closeMenu}
                              style={{
                                flexGrow: 1,
                                display: "flex",
                                alignItems: "center",
                                fontSize: "15px",
                                fontWeight: 500,
                                color: "var(--color-text-body)",
                                textDecoration: "none",
                                padding: "16px 24px",
                                fontFamily: "Inter, sans-serif",
                                transition: "all 0.2s ease",
                              }}
                            >
                              {link.label}
                            </Link>
                            <button
                              onClick={toggleGlobal}
                              style={{
                                background: "rgba(255,255,255,0.03)",
                                border: "none",
                                borderLeft: "1px solid var(--color-border-faint)",
                                height: "52px",
                                width: "52px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                color: "var(--color-text-faint)",
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
                                    onClick={() => handleSectionNav(sec.id)}
                                    style={{
                                      display: "block",
                                      width: "100%",
                                      textAlign: "left",
                                      padding: "12px 40px",
                                      fontSize: "13px",
                                      color: "var(--color-text-muted)",
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
                          prefetch={true}
                          onClick={closeMenu}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: "15px",
                            fontWeight: 500,
                            color: "var(--color-text-body)",
                            textDecoration: "none",
                            padding: "16px 24px",
                            fontFamily: "Inter, sans-serif",
                            transition: "all 0.2s ease",
                            borderLeft: "2px solid transparent",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = "var(--color-text-bright)";
                            e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                            e.currentTarget.style.borderLeftColor = "var(--color-blue-bright)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = "var(--color-text-body)";
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.borderLeftColor = "transparent";
                          }}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                  <div style={{ 
                    padding: "24px 24px 12px", 
                    borderTop: "1px solid var(--color-border-faint)",
                    marginTop: "8px"
                  }}>
                    <span style={{ 
                      display: "block",
                      fontFamily: "Inter, sans-serif", 
                      fontSize: "10px", 
                      fontWeight: 700, 
                      letterSpacing: "0.15em", 
                      color: "var(--color-text-faint)",
                      textTransform: "uppercase",
                      marginBottom: "12px"
                    }}>
                      Appearance
                    </span>
                    <ThemeToggle />
                  </div>
                </div>

                {/* Bottom Support/Contact Card */}
                <div style={{
                  padding: "24px",
                  borderTop: "1px solid var(--color-border-faint)",
                  background: "rgba(255,255,255,0.01)",
                  flexShrink: 0,
                }}>
                  <div style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "16px",
                    padding: "16px",
                  }}>
                    <p style={{
                      fontSize: "12px",
                      color: "var(--color-text-muted)",
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
                        color: "var(--color-text-bright)",
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
});

Navbar.displayName = "Navbar";

export default Navbar;

