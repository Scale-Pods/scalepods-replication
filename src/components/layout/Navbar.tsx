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
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Solutions", dropdown: true, href: "/solution" },
  { label: "Global", href: "/global" },
];

const solutions = [
  { label: "Sales Workflow Automation", href: "/solution/sales-workflow-automation" },
  { label: "HR Workflow Automation", href: "/solution/hr-workflow-automation" },
  { label: "Marketing Workflow Automation", href: "/solution/marketing-workflow-automation" },
  { label: "Operations Workflow Automation", href: "/solution/ops-workflow-automation" },
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
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [solutionsExpanded, setSolutionsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const isMobile = useMobile(1023);
  const { resolvedTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  const isProd = process.env.NODE_ENV === "production";

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const isLinkActive = useCallback((href: string) => {
    if (pathname !== "/") {
      return pathname === href || pathname?.startsWith(href);
    }
    // On homepage, track scroll sections
    if (href === "/") return activeSection === "hero";
    if (href === "/#services") return activeSection === "services";
    if (href === "/#process") return activeSection === "process";
    return false;
  }, [pathname, activeSection]);

  const handleLinkClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    closeMenu();
    if (href === "/" && pathname === "/") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else if (href.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      const id = href.replace("/#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [pathname, closeMenu]);

  const toggleGlobal = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setGlobalExpanded(prev => !prev);
  }, []);

  const handleSectionNav = useCallback((id: string) => {
    // If we are already on the Global page (/global)
    if (pathname === "/global") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setMenuOpen(false);
      }
    } else {
      // If we are on another page, navigate to /global with hash
      router.push(`/global#${id}`);
      setMenuOpen(false);
    }
  }, [pathname, router]);

  const handleMobileLink = useCallback((href: string) => {
    setMenuOpen(false);
    router.push(href);
  }, [router]);

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

  // Dynamic active section scroll tracking using IntersectionObserver
  useEffect(() => {
    if (pathname !== "/") {
      if (pathname === "/blog" || pathname?.startsWith("/blog")) {
        setActiveSection("blog");
      } else if (pathname === "/contact" || pathname?.startsWith("/contact")) {
        setActiveSection("contact");
      } else if (pathname?.startsWith("/solution")) {
        setActiveSection("solution");
      } else if (pathname === "/global" || pathname?.startsWith("/global")) {
        setActiveSection("global");
      } else {
        setActiveSection("");
      }
      return;
    }

    const sectionIds = ["hero", "services", "process"];
    const elements = sectionIds.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    if (elements.length === 0) {
      setActiveSection("hero");
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px", // Strict center focus to avoid overlapping triggers
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    elements.forEach(el => observer.observe(el));

    // Instant fallback when scrolling to the very top (safeguard)
    const handleScrollFallback = () => {
      if (window.scrollY < 80) {
        setActiveSection("hero");
      }
    };
    window.addEventListener("scroll", handleScrollFallback, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScrollFallback);
    };
  }, [pathname]);

  // Auto-expand Solutions accordion on mobile when visiting solutions page
  useEffect(() => {
    if (pathname?.startsWith("/solution")) {
      setSolutionsExpanded(true);
    }
  }, [pathname]);

  // Aggressively prefetch major routes after homepage hydration (production only)
  useEffect(() => {
    if (isProd) {
      router.prefetch("/global");
      router.prefetch("/solution/sales-workflow-automation");
      router.prefetch("/solution/hr-workflow-automation");
      router.prefetch("/solution/marketing-workflow-automation");
      router.prefetch("/solution/ops-workflow-automation");
      router.prefetch("/blog");
      router.prefetch("/contact");
    }
  }, [router, isProd]);

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
          paddingLeft: "4px",
          paddingRight: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
        }}>
          {/* Logo Area */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link href="/" prefetch={isProd} style={{ 
              display: "flex", 
              alignItems: "center", 
              flexShrink: 0, 
              height: "70px",
              marginLeft: isMobile ? "18px" : "0",
              transform: isMobile ? "translateX(4px)" : "none"
            }}>
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
            {navLinks.map((link) => {
              if (link.dropdown) {
                const active = pathname?.startsWith("/solution");
                return (
                  <div
                    key={link.label}
                    onMouseEnter={() => setSolutionsOpen(true)}
                    onMouseLeave={() => setSolutionsOpen(false)}
                    style={{ position: "relative" }}
                  >
                    <button
                      onClick={() => setSolutionsOpen(prev => !prev)}
                      style={{
                        position: "relative",
                        fontSize: "13.5px",
                        fontWeight: 500,
                        color: active || solutionsOpen ? "var(--color-text-bright)" : "var(--color-text-muted)",
                        background: "transparent",
                        border: "none",
                        padding: "5px 14px",
                        borderRadius: "24px",
                        cursor: "pointer",
                        transition: "color 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
                        whiteSpace: "nowrap",
                        fontFamily: "Inter, sans-serif",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        zIndex: 1,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "var(--color-text-bright)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = (active || solutionsOpen) ? "var(--color-text-bright)" : "var(--color-text-muted)";
                      }}
                    >
                      {active && (
                        <motion.div
                          layoutId="desktop-active-nav-pill"
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: "rgba(255, 255, 255, 0.05)",
                            borderRadius: "24px",
                            zIndex: -1,
                            boxShadow: "0 2px 8px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.05)",
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30
                          }}
                        />
                      )}
                      Solutions
                      <ChevronDown 
                        size={12} 
                        style={{ 
                          transform: solutionsOpen ? "rotate(180deg)" : "rotate(0deg)", 
                          transition: "transform 0.2s ease",
                          opacity: 0.8
                        }} 
                      />
                    </button>

                    <AnimatePresence>
                      {solutionsOpen && (
                        <div
                          style={{
                            position: "absolute",
                            top: "100%",
                            left: "50%",
                            transform: "translateX(-50%)",
                            marginTop: "8px",
                            zIndex: 100,
                          }}
                        >
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.95 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                            style={{
                              background: "var(--color-bg-card)",
                              border: "1px solid var(--color-border)",
                              borderRadius: "16px",
                              padding: "8px",
                              minWidth: "240px",
                              boxShadow: resolvedTheme === 'dark' 
                                ? "0 20px 40px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.05)" 
                                : "0 15px 30px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)",
                              backdropFilter: "blur(24px)",
                              WebkitBackdropFilter: "blur(24px)",
                            }}
                          >
                            {solutions.map((sol) => {
                              const isSolActive = pathname === sol.href;
                              return (
                                <Link
                                  key={sol.label}
                                  href={sol.href}
                                  prefetch={isProd}
                                  onClick={() => setSolutionsOpen(false)}
                                  style={{
                                    display: "block",
                                    padding: "10px 14px",
                                    borderRadius: "10px",
                                    fontSize: "13px",
                                    fontWeight: 500,
                                    color: isSolActive ? "var(--color-text-bright)" : "var(--color-text-body)",
                                    background: isSolActive ? "rgba(255, 255, 255, 0.05)" : "transparent",
                                    textDecoration: "none",
                                    transition: "all 0.2s ease",
                                    fontFamily: "Inter, sans-serif",
                                    textAlign: "left"
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                                    e.currentTarget.style.color = "var(--color-text-bright)";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.background = isSolActive ? "rgba(255, 255, 255, 0.05)" : "transparent";
                                    e.currentTarget.style.color = isSolActive ? "var(--color-text-bright)" : "var(--color-text-body)";
                                  }}
                                >
                                  {sol.label}
                                </Link>
                              );
                            })}
                          </motion.div>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              const active = isLinkActive(link.href!);
              return (
                <Link
                  key={link.label}
                  href={link.href!}
                  prefetch={isProd}
                  onClick={(e) => handleLinkClick(e, link.href!)}
                  style={{
                    position: "relative",
                    fontSize: "13.5px",
                    fontWeight: 500,
                    color: active ? "var(--color-text-bright)" : "var(--color-text-muted)",
                    textDecoration: "none",
                    padding: "5px 14px",
                    borderRadius: "24px",
                    transition: "color 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
                    whiteSpace: "nowrap",
                    fontFamily: "Inter, sans-serif",
                    zIndex: 1,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--color-text-bright)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = active ? "var(--color-text-bright)" : "var(--color-text-muted)";
                  }}
                >
                  {active && (
                    <motion.div
                      layoutId="desktop-active-nav-pill"
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(255, 255, 255, 0.05)",
                        borderRadius: "24px",
                        zIndex: -1,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.05)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30
                      }}
                    />
                  )}
                  {link.label}
                </Link>
              );
            })}
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
              transition={{ duration: isMobile ? 0.1 : 0.3 }}
              onClick={closeMenu}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 90,
                background: "rgba(0,0,0,0.4)",
                WebkitBackdropFilter: isMobile ? "none" : "blur(4px)",
                backdropFilter: isMobile ? "none" : "blur(4px)",
                touchAction: "none"
              }}
            />

            {/* Right Side Sidebar */}
            <motion.div
                key="sidebar-menu"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: isMobile ? 0.15 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "fixed",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  width: "min(380px, 85%)",
                  zIndex: 100,
                  background: "var(--color-bg-card)",
                  WebkitBackdropFilter: isMobile ? "none" : "blur(20px)",
                  backdropFilter: isMobile ? "none" : "blur(20px)",
                  borderLeft: "1px solid var(--color-border)",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: isMobile ? "none" : (resolvedTheme === 'dark' ? "-10px 0 30px rgba(0,0,0,0.5)" : "-10px 0 30px rgba(0,0,0,0.05)"),
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
                    if (link.dropdown) {
                      const active = pathname?.startsWith("/solution");
                      return (
                        <div key={link.label} style={{ borderBottom: "1px solid var(--color-border-faint)" }}>
                          <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
                            {active && (
                              <motion.div
                                layoutId="mobile-active-nav-bg"
                                style={{
                                  position: "absolute",
                                  inset: 0,
                                  background: "rgba(255, 255, 255, 0.03)",
                                  borderLeft: "2px solid var(--color-blue-bright)",
                                  zIndex: 0,
                                }}
                                transition={{
                                  type: "spring",
                                  stiffness: 380,
                                  damping: 30
                                }}
                              />
                            )}
                            <button
                              onClick={() => setSolutionsExpanded(prev => !prev)}
                              style={{
                                flexGrow: 1,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                fontSize: "15px",
                                fontWeight: 500,
                                color: active || solutionsExpanded ? "var(--color-text-bright)" : "var(--color-text-body)",
                                background: "transparent",
                                border: "none",
                                padding: "16px 24px",
                                fontFamily: "Inter, sans-serif",
                                cursor: "pointer",
                                position: "relative",
                                zIndex: 1,
                                width: "100%",
                                textAlign: "left"
                              }}
                            >
                              <span>{link.label}</span>
                              <ChevronDown 
                                style={{ 
                                  width: "16px", 
                                  height: "16px", 
                                  transform: solutionsExpanded ? "rotate(180deg)" : "rotate(0deg)",
                                  transition: "transform 0.3s ease",
                                  opacity: 0.6
                                }} 
                              />
                            </button>
                          </div>
                          
                          <AnimatePresence>
                            {solutionsExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                style={{ overflow: "hidden", background: "rgba(255,255,255,0.02)" }}
                              >
                                {solutions.map((sol) => {
                                  const isSolActive = pathname === sol.href;
                                  return (
                                    <Link
                                      key={sol.label}
                                      href={sol.href}
                                      prefetch={isProd}
                                      onClick={closeMenu}
                                      style={{
                                        display: "block",
                                        padding: "12px 40px",
                                        fontSize: "13px",
                                        fontWeight: 500,
                                        color: isSolActive ? "var(--color-text-bright)" : "var(--color-text-muted)",
                                        background: isSolActive ? "rgba(255, 255, 255, 0.03)" : "transparent",
                                        border: "none",
                                        fontFamily: "Inter, sans-serif",
                                        textDecoration: "none",
                                        textAlign: "left"
                                      }}
                                    >
                                      • {sol.label}
                                    </Link>
                                  );
                                })}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    }

                    if (link.label === "Global") {
                      const active = isLinkActive(link.href!);
                      return (
                        <div key={link.label} style={{ borderBottom: "1px solid var(--color-border-faint)" }}>
                          <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
                            {active && (
                              <motion.div
                                layoutId="mobile-active-nav-bg"
                                style={{
                                  position: "absolute",
                                  inset: 0,
                                  background: "rgba(255, 255, 255, 0.03)",
                                  borderLeft: "2px solid var(--color-blue-bright)",
                                  zIndex: 0,
                                }}
                                transition={{
                                  type: "spring",
                                  stiffness: 380,
                                  damping: 30
                                }}
                              />
                            )}
                            <Link
                              href={link.href!}
                              prefetch={isProd}
                              onClick={closeMenu}
                              style={{
                                flexGrow: 1,
                                display: "flex",
                                alignItems: "center",
                                fontSize: "15px",
                                fontWeight: 500,
                                color: active ? "var(--color-text-bright)" : "var(--color-text-body)",
                                textDecoration: "none",
                                padding: "16px 24px",
                                fontFamily: "Inter, sans-serif",
                                transition: "color 0.25s ease",
                                position: "relative",
                                zIndex: 1,
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color = "var(--color-text-bright)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.color = active ? "var(--color-text-bright)" : "var(--color-text-body)";
                              }}
                            >
                              {link.label}
                            </Link>
                            <button
                              onClick={toggleGlobal}
                              style={{
                                background: "transparent",
                                border: "none",
                                borderLeft: "1px solid var(--color-border-faint)",
                                height: "52px",
                                width: "52px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                color: "var(--color-text-faint)",
                                position: "relative",
                                zIndex: 1,
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
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      handleSectionNav(sec.id);
                                    }}
                                    onPointerDown={(e) => {
                                      e.stopPropagation();
                                      handleSectionNav(sec.id);
                                    }}
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

                    const active = isLinkActive(link.href!);
                    return (
                      <motion.div
                        key={link.label}
                        initial={isMobile ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: isMobile ? 0 : i * 0.04 + 0.1 }}
                      >
                        <Link
                          href={link.href!}
                          prefetch={isProd}
                          onClick={(e) => handleLinkClick(e, link.href!)}
                          style={{
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                            fontSize: "15px",
                            fontWeight: 500,
                            color: active ? "var(--color-text-bright)" : "var(--color-text-body)",
                            textDecoration: "none",
                            padding: "16px 24px",
                            fontFamily: "Inter, sans-serif",
                            transition: "color 0.25s ease",
                            zIndex: 1,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = "var(--color-text-bright)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = active ? "var(--color-text-bright)" : "var(--color-text-body)";
                          }}
                        >
                          {active && (
                            <motion.div
                              layoutId="mobile-active-nav-bg"
                              style={{
                                position: "absolute",
                                inset: 0,
                                background: "rgba(255, 255, 255, 0.03)",
                                borderLeft: "2px solid var(--color-blue-bright)",
                                zIndex: -1,
                              }}
                              transition={{
                                type: "spring",
                                stiffness: 380,
                                damping: 30
                              }}
                            />
                          )}
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
                      href="mailto:info@scalepods.co"
                      style={{
                        fontSize: "13px",
                        color: "var(--color-text-bright)",
                        textDecoration: "none",
                        fontWeight: 500,
                        fontFamily: "Inter, sans-serif",
                        display: "block",
                      }}
                    >
                      info@scalepods.co
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

