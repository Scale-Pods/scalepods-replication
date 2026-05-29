"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import { AdminThemeProvider } from "./ThemeProvider";

interface AdminShellProps {
  children: React.ReactNode;
}

const COLLAPSE_KEY = "admin-sidebar-collapsed";

export default function AdminShell({ children }: AdminShellProps) {
  const [sidebarOpen, setSidebarOpen]       = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  // Restore collapsed state from localStorage (client-only)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(COLLAPSE_KEY);
      if (stored === "true") setSidebarCollapsed(true);
    } catch {}
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  function toggleCollapse() {
    setSidebarCollapsed((prev) => {
      const next = !prev;
      try { localStorage.setItem(COLLAPSE_KEY, String(next)); } catch {}
      return next;
    });
  }

  return (
    <AdminThemeProvider>
    <div
      data-layout="admin"
      style={{
        display: "flex",
        height: "100dvh",
        width: "100vw",
        overflow: "hidden",
        background: "var(--bg-page)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* ── Desktop sidebar ── */}
      <div
        style={{ display: "none", height: "100%" }}
        className="admin-sidebar-desktop"
      >
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={toggleCollapse}
        />
      </div>

      {/* ── Mobile sidebar overlay ── */}
      {sidebarOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setSidebarOpen(false)}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(0,0,0,0.6)", zIndex: 40,
            }}
          />
          {/* Drawer — always fully expanded on mobile */}
          <div
            style={{
              position: "fixed", top: 0, left: 0,
              height: "100%", zIndex: 50, display: "flex",
            }}
          >
            <Sidebar onClose={() => setSidebarOpen(false)} collapsed={false} />
          </div>
        </>
      )}

      {/* ── Main content column ── */}
      <div
        style={{
          flex: 1, display: "flex", flexDirection: "column",
          minWidth: 0, overflow: "hidden",
        }}
      >
        {/* Mobile topbar strip */}
        <div
          className="admin-mobile-topbar"
          style={{
            display: "none", alignItems: "center", gap: "12px",
            padding: "12px 16px", background: "var(--bg-sidebar)",
            borderBottom: "1px solid var(--border)", flexShrink: 0,
          }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: "var(--text-secondary)", display: "flex",
              alignItems: "center", justifyContent: "center",
              padding: "6px", borderRadius: "6px",
            }}
          >
            <Menu size={18} />
          </button>
          <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
            ScalePods Vault
          </span>
        </div>

        {/* Scrollable page content */}
        <main style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
          {children}
        </main>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (min-width: 768px) {
          .admin-sidebar-desktop { display: flex !important; }
          .admin-mobile-topbar   { display: none !important; }
        }
        @media (max-width: 767px) {
          .admin-sidebar-desktop { display: none !important; }
          .admin-mobile-topbar   { display: flex !important; }
        }
      `}</style>
    </div>
    </AdminThemeProvider>
  );
}
