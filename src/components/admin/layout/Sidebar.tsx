"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Activity, BarChart2, Search, Sparkles, Users, LogOut, Sun, Moon, PanelLeftClose, PanelLeftOpen, Ticket } from "lucide-react";
import { useAdminTheme } from "./ThemeProvider";

interface SidebarProps {
  onClose?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const NAV = [
  { label: "Webinar Feed",      href: "/admin/webinar",  icon: Ticket },
  { label: "Microsoft Clarity", href: "/admin/clarity",  icon: Activity },
  { label: "Google Analytics",  href: "/admin/ga4",      icon: BarChart2 },
  { label: "User Sessions",     href: "/admin/sessions", icon: Users },
  { label: "Search Console",    href: "/admin/gsc",      icon: Search },
];

const AI_NAV = { label: "AI Assistant", href: "/admin/ai", icon: Sparkles };

export default function Sidebar({ onClose, collapsed = false, onToggleCollapse }: SidebarProps) {
  const pathname  = usePathname();
  const router    = useRouter();
  const supabase  = createClient();
  const { theme, toggle } = useAdminTheme();
  const isDark = theme === "dark";

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  const W = collapsed ? "52px" : "220px";

  // Google Workspace theme colors
  const bgSidebar    = isDark ? "#1E1F20" : "#FFFFFF";
  const borderCol    = isDark ? "#2D2F31" : "#DADCE0";
  const textPrimary  = isDark ? "#E3E3E3" : "#202124";
  const textSecondary= isDark ? "#9AA0A6" : "#5F6368";
  const textMuted    = isDark ? "#80868B" : "#80868B";
  const activeBg     = isDark ? "rgba(138, 180, 248, 0.16)" : "#E8F0FE";
  const activeColor  = isDark ? "#8AB4F8" : "#1A73E8";
  const hoverBg      = isDark ? "#282A2C" : "#F1F3F4";

  return (
    <aside
      style={{
        width: W,
        minWidth: W,
        height: "100%",
        background: bgSidebar,
        borderRight: `1px solid ${borderCol}`,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        zIndex: 10,
        transition: "width 0.22s cubic-bezier(.4,0,.2,1), min-width 0.22s cubic-bezier(.4,0,.2,1), background 0.2s, border-color 0.2s",
        overflow: "hidden",
      }}
    >
      {/* ── Header: logo + collapse toggle ── */}
      <div
        style={{
          height: "64px",
          minHeight: "64px",
          padding: collapsed ? "0 10px" : "0 14px 0 16px",
          borderBottom: `1px solid ${borderCol}`,
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          flexShrink: 0,
          transition: "padding 0.22s, border-color 0.2s",
        }}
      >
        {/* Logo — hidden when collapsed */}
        {!collapsed && (
          <Link href="/admin/webinar" style={{ textDecoration: "none", display: "flex", alignItems: "center", flexShrink: 0 }}>
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
                filter: isDark ? "invert(1)" : "none",
                transition: "filter 0.2s",
              }}
              priority
            />
          </Link>
        )}

        {/* Collapsed: logo-link replaced by icon-only brand dot */}
        {collapsed && (
          <Link href="/admin/webinar" title="ScalePods" style={{ textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "6px", background: activeBg, flexShrink: 0 }}>
            <span style={{ fontSize: "14px", fontWeight: 700, color: activeColor }}>S</span>
          </Link>
        )}

        {/* Desktop collapse toggle — hidden on mobile (onClose present = mobile drawer) */}
        {!onClose && onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: textSecondary, padding: "5px",
              display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: "6px", flexShrink: 0,
              transition: "color 0.15s, background-color 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = hoverBg;
              (e.currentTarget as HTMLButtonElement).style.color = textPrimary;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "none";
              (e.currentTarget as HTMLButtonElement).style.color = textSecondary;
            }}
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
            style={{ background: "none", border: "none", cursor: "pointer", color: textSecondary, padding: "4px", display: "flex", borderRadius: "6px" }}
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
          gap: "3px",
          overflowY: "auto",
          overflowX: "hidden",
          transition: "padding 0.22s",
        }}
      >
        {/* Section label */}
        {!collapsed && (
          <div style={{ fontSize: "11px", fontWeight: 600, color: textMuted, textTransform: "uppercase", letterSpacing: "0.06em", padding: "8px 10px 4px", whiteSpace: "nowrap" }}>
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
                padding: collapsed ? "9px 0" : "8px 12px",
                justifyContent: collapsed ? "center" : "flex-start",
                borderRadius: "6px", textDecoration: "none",
                background: isActive ? activeBg : "transparent",
                color: isActive ? activeColor : textSecondary,
                fontWeight: isActive ? 600 : 500,
                transition: "background 0.15s, color 0.15s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLAnchorElement).style.background = hoverBg;
                  (e.currentTarget as HTMLAnchorElement).style.color = textPrimary;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                  (e.currentTarget as HTMLAnchorElement).style.color = textSecondary;
                }
              }}
            >
              <Icon size={16} style={{ flexShrink: 0, color: isActive ? activeColor : textSecondary }} />
              {!collapsed && (
                <span style={{ fontSize: "13.5px", flex: 1, overflow: "hidden", textOverflow: "ellipsis" }}>
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}

        {/* ── AI Assistant ── */}
        {!collapsed && (
          <div style={{ fontSize: "11px", fontWeight: 600, color: textMuted, textTransform: "uppercase", letterSpacing: "0.06em", padding: "12px 10px 4px", whiteSpace: "nowrap" }}>
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
                padding: collapsed ? "9px 0" : "8px 12px",
                justifyContent: collapsed ? "center" : "flex-start",
                borderRadius: "6px", textDecoration: "none",
                background: isActive ? activeBg : "transparent",
                color: isActive ? activeColor : textSecondary,
                fontWeight: isActive ? 600 : 500,
                transition: "background 0.15s, color 0.15s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLAnchorElement).style.background = hoverBg;
                  (e.currentTarget as HTMLAnchorElement).style.color = textPrimary;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                  (e.currentTarget as HTMLAnchorElement).style.color = textSecondary;
                }
              }}
            >
              <Icon size={16} style={{ flexShrink: 0, color: isActive ? activeColor : textSecondary }} />
              {!collapsed && (
                <span style={{ fontSize: "13.5px", flex: 1 }}>
                  {AI_NAV.label}
                </span>
              )}
            </Link>
          );
        })()}
      </nav>

      {/* ── Footer: theme toggle + logout ── */}
      <div style={{
        padding: collapsed ? "12px 8px" : "12px 10px",
        borderTop: `1px solid ${borderCol}`,
        display: "flex", flexDirection: "column", gap: "4px",
        transition: "padding 0.22s, border-color 0.2s",
      }}>
        {/* Theme toggle */}
        <button
          onClick={toggle}
          title={collapsed ? (isDark ? "Light mode" : "Dark mode") : undefined}
          style={{
            display: "flex", alignItems: "center",
            gap: collapsed ? "0" : "10px",
            justifyContent: collapsed ? "center" : "flex-start",
            width: "100%", padding: collapsed ? "9px 0" : "8px 10px",
            borderRadius: "6px", background: "transparent",
            border: "1px solid transparent", cursor: "pointer",
            color: textSecondary, textAlign: "left",
            transition: "background 0.15s, color 0.15s, padding 0.22s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = hoverBg;
            (e.currentTarget as HTMLButtonElement).style.color = textPrimary;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            (e.currentTarget as HTMLButtonElement).style.color = textSecondary;
          }}
        >
          {isDark
            ? <Sun  size={15} style={{ flexShrink: 0 }} />
            : <Moon size={15} style={{ flexShrink: 0 }} />}
          {!collapsed && (
            <span style={{ fontSize: "13px", fontWeight: 500 }}>
              {isDark ? "Light mode" : "Dark mode"}
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
            borderRadius: "6px", background: "transparent",
            border: "1px solid transparent", cursor: "pointer",
            color: textSecondary, textAlign: "left",
            transition: "background 0.15s, color 0.15s, padding 0.22s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = isDark ? "rgba(242, 139, 130, 0.12)" : "rgba(217, 48, 37, 0.08)";
            (e.currentTarget as HTMLButtonElement).style.color = isDark ? "#F28B82" : "#D93025";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            (e.currentTarget as HTMLButtonElement).style.color = textSecondary;
          }}
        >
          <LogOut size={15} style={{ flexShrink: 0 }} />
          {!collapsed && <span style={{ fontSize: "13px", fontWeight: 500 }}>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
