"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Activity, BarChart2, Search, Sparkles, LogOut, Sun, Moon, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useAdminTheme } from "./ThemeProvider";

interface SidebarProps {
  onClose?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const NAV = [
  { label: "Microsoft Clarity", href: "/admin/clarity", icon: Activity },
  { label: "Google Analytics",  href: "/admin/ga4",     icon: BarChart2 },
  { label: "Search Console",    href: "/admin/gsc",     icon: Search },
];

const AI_NAV = { label: "AI Assistant", href: "/admin/ai", icon: Sparkles };

export default function Sidebar({ onClose, collapsed = false, onToggleCollapse }: SidebarProps) {
  const pathname  = usePathname();
  const router    = useRouter();
  const supabase  = createClient();
  const { theme, toggle } = useAdminTheme();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  const W = collapsed ? "52px" : "220px";

  return (
    <aside
      style={{
        width: W,
        minWidth: W,
        height: "100%",
        background: "var(--bg-sidebar)",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        zIndex: 10,
        transition: "width 0.22s cubic-bezier(.4,0,.2,1), min-width 0.22s cubic-bezier(.4,0,.2,1)",
        overflow: "hidden",
      }}
    >
      {/* ── Header: logo + collapse toggle ── */}
      <div
        style={{
          height: "64px",
          minHeight: "64px",
          padding: collapsed ? "0 10px" : "0 14px 0 16px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          flexShrink: 0,
          transition: "padding 0.22s",
        }}
      >
        {/* Logo — hidden when collapsed */}
        {!collapsed && (
          <Link href="/admin/clarity" style={{ textDecoration: "none", display: "flex", alignItems: "center", flexShrink: 0 }}>
            <Image
              src="/scalepods-navbar-logo.png"
              alt="ScalePods"
              width={0}
              height={0}
              sizes="110px"
              style={{
                width: "110px",
                height: "auto",
                display: "block",
                filter: theme === "dark" ? "invert(1)" : "none",
                transition: "filter 0.2s",
              }}
              priority
            />
          </Link>
        )}

        {/* Collapsed: logo-link replaced by icon-only brand dot */}
        {collapsed && (
          <Link href="/admin/clarity" title="ScalePods" style={{ textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "8px", background: "var(--accent-dim)", flexShrink: 0 }}>
            <span style={{ fontSize: "13px", fontWeight: 800, color: "var(--accent)" }}>S</span>
          </Link>
        )}

        {/* Desktop collapse toggle — hidden on mobile (onClose present = mobile drawer) */}
        {!onClose && onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: "var(--text-muted)", padding: "5px",
              display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: "6px", flexShrink: 0,
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)"; }}
          >
            {collapsed
              ? <PanelLeftOpen  size={16} />
              : <PanelLeftClose size={16} />}
          </button>
        )}

        {/* Mobile close button */}
        {onClose && (
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: "4px", display: "flex", borderRadius: "6px" }}
          >
            ✕
          </button>
        )}
      </div>

      {/* ── Navigation ── */}
      <nav
        style={{
          flex: 1,
          padding: collapsed ? "12px 8px" : "12px 10px",
          display: "flex",
          flexDirection: "column",
          gap: "2px",
          overflowY: "auto",
          overflowX: "hidden",
          transition: "padding 0.22s",
        }}
      >
        {/* Section label */}
        {!collapsed && (
          <div style={{ fontSize: "10px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", padding: "8px 10px 6px", whiteSpace: "nowrap" }}>
            Analytics
          </div>
        )}
        {collapsed && <div style={{ height: "8px" }} />}

        {NAV.map((item) => {
          const Icon     = item.icon;
          const isActive = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              style={{
                display: "flex", alignItems: "center",
                gap: collapsed ? "0" : "10px",
                padding: collapsed ? "9px 0" : "8px 10px",
                justifyContent: collapsed ? "center" : "flex-start",
                borderRadius: "8px", textDecoration: "none",
                background: isActive ? "var(--accent-dim)" : "transparent",
                border: isActive ? "1px solid var(--accent)22" : "1px solid transparent",
                color: isActive ? "var(--accent)" : "var(--text-secondary)",
                transition: "background 0.15s, padding 0.22s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLAnchorElement).style.background = "var(--bg-card-hover)"; }}
              onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
            >
              <Icon size={15} style={{ flexShrink: 0 }} />
              {!collapsed && (
                <span style={{ fontSize: "13px", fontWeight: isActive ? 600 : 500, flex: 1, overflow: "hidden", textOverflow: "ellipsis" }}>
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}

        {/* ── AI Assistant ── */}
        {!collapsed && (
          <div style={{ fontSize: "10px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", padding: "10px 10px 6px", marginTop: "4px", whiteSpace: "nowrap" }}>
            Intelligence
          </div>
        )}
        {collapsed && <div style={{ height: "4px" }} />}

        {(() => {
          const Icon = AI_NAV.icon;
          const isActive = pathname?.startsWith(AI_NAV.href);
          return (
            <Link
              href={AI_NAV.href}
              title={collapsed ? AI_NAV.label : undefined}
              style={{
                display: "flex", alignItems: "center",
                gap: collapsed ? "0" : "10px",
                padding: collapsed ? "9px 0" : "8px 10px",
                justifyContent: collapsed ? "center" : "flex-start",
                borderRadius: "8px", textDecoration: "none",
                background: isActive ? "linear-gradient(135deg, var(--accent-dim), rgba(139,92,246,0.12))" : "transparent",
                border: isActive ? "1px solid var(--accent)33" : "1px solid transparent",
                color: isActive ? "var(--accent)" : "var(--text-secondary)",
                transition: "background 0.15s, padding 0.22s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLAnchorElement).style.background = "var(--bg-card-hover)"; }}
              onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
            >
              <Icon size={15} style={{ flexShrink: 0 }} />
              {!collapsed && (
                <>
                  <span style={{ fontSize: "13px", fontWeight: isActive ? 600 : 500, flex: 1 }}>
                    {AI_NAV.label}
                  </span>
                  {!isActive && (
                    <span style={{ fontSize: "9px", fontWeight: 700, padding: "2px 6px", borderRadius: "100px", background: "linear-gradient(135deg,var(--accent),var(--purple))", color: "#fff", letterSpacing: "0.05em" }}>NEW</span>
                  )}
                </>
              )}
            </Link>
          );
        })()}
      </nav>

      {/* ── Footer: theme toggle + logout ── */}
      <div style={{
        padding: collapsed ? "12px 8px" : "12px 10px",
        borderTop: "1px solid var(--border)",
        display: "flex", flexDirection: "column", gap: "4px",
        transition: "padding 0.22s",
      }}>
        {/* Theme toggle */}
        <button
          onClick={toggle}
          title={collapsed ? (theme === "dark" ? "Light mode" : "Dark mode") : undefined}
          style={{
            display: "flex", alignItems: "center",
            gap: collapsed ? "0" : "10px",
            justifyContent: collapsed ? "center" : "flex-start",
            width: "100%", padding: collapsed ? "9px 0" : "8px 10px",
            borderRadius: "8px", background: "transparent",
            border: "1px solid transparent", cursor: "pointer",
            color: "var(--text-muted)", textAlign: "left",
            transition: "background 0.15s, color 0.15s, padding 0.22s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "var(--bg-card-hover)";
            (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)";
          }}
        >
          {theme === "dark"
            ? <Sun  size={14} style={{ flexShrink: 0 }} />
            : <Moon size={14} style={{ flexShrink: 0 }} />}
          {!collapsed && (
            <span style={{ fontSize: "13px", fontWeight: 500 }}>
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </span>
          )}
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          title={collapsed ? "Sign Out" : undefined}
          style={{
            display: "flex", alignItems: "center",
            gap: collapsed ? "0" : "10px",
            justifyContent: collapsed ? "center" : "flex-start",
            width: "100%", padding: collapsed ? "9px 0" : "8px 10px",
            borderRadius: "8px", background: "transparent",
            border: "1px solid transparent", cursor: "pointer",
            color: "var(--text-muted)", textAlign: "left",
            transition: "background 0.15s, color 0.15s, padding 0.22s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.08)";
            (e.currentTarget as HTMLButtonElement).style.color = "var(--red)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)";
          }}
        >
          <LogOut size={14} style={{ flexShrink: 0 }} />
          {!collapsed && <span style={{ fontSize: "13px", fontWeight: 500 }}>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
