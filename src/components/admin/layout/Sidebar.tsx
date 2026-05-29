"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Activity, BarChart2, Search, Sparkles, LogOut, Sun, Moon } from "lucide-react";
import { useAdminTheme } from "./ThemeProvider";

interface SidebarProps {
  onClose?: () => void;
}

const NAV = [
  { label: "Microsoft Clarity", href: "/admin/clarity", icon: Activity },
  { label: "Google Analytics",  href: "/admin/ga4",     icon: BarChart2 },
  { label: "Search Console",    href: "/admin/gsc",     icon: Search },
];

const AI_NAV = { label: "AI Assistant", href: "/admin/ai", icon: Sparkles };

export default function Sidebar({ onClose }: SidebarProps) {
  const pathname  = usePathname();
  const router    = useRouter();
  const supabase  = createClient();
  const { theme, toggle } = useAdminTheme();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside
      style={{
        width: "220px",
        minWidth: "220px",
        height: "100%",
        background: "var(--bg-sidebar)",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        zIndex: 10,
      }}
    >
      {/* ── Header: logo + close ── */}
      <div
        style={{
          height: "64px",
          minHeight: "64px",
          padding: "0 20px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <Link href="/admin/clarity" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          {/* Single logo source — invert in dark mode so black logo becomes white */}
          <Image
            src="/scalepods-navbar-logo.png"
            alt="ScalePods"
            width={0}
            height={0}
            sizes="120px"
            style={{
              width: "120px",
              height: "auto",
              display: "block",
              filter: theme === "dark" ? "invert(1)" : "none",
              transition: "filter 0.2s",
            }}
            priority
          />
        </Link>

        {/* Mobile close */}
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
          padding: "12px 10px",
          display: "flex",
          flexDirection: "column",
          gap: "2px",
          overflowY: "auto",
        }}
      >
        <div style={{ fontSize: "10px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", padding: "8px 10px 6px" }}>
          Analytics
        </div>

        {NAV.map((item) => {
          const Icon     = item.icon;
          const isActive = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex", alignItems: "center", gap: "10px", padding: "8px 10px",
                borderRadius: "8px", textDecoration: "none",
                background: isActive ? "var(--accent-dim)" : "transparent",
                border: isActive ? "1px solid var(--accent)22" : "1px solid transparent",
                color: isActive ? "var(--accent)" : "var(--text-secondary)",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLAnchorElement).style.background = "var(--bg-card-hover)"; }}
              onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
            >
              <Icon size={15} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: "13px", fontWeight: isActive ? 600 : 500, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* ── AI Assistant ── */}
        <div style={{ fontSize: "10px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", padding: "10px 10px 6px", marginTop: "4px" }}>
          Intelligence
        </div>
        {(() => {
          const Icon = AI_NAV.icon;
          const isActive = pathname?.startsWith(AI_NAV.href);
          return (
            <Link
              href={AI_NAV.href}
              style={{
                display: "flex", alignItems: "center", gap: "10px", padding: "8px 10px",
                borderRadius: "8px", textDecoration: "none",
                background: isActive ? "linear-gradient(135deg, var(--accent-dim), rgba(139,92,246,0.12))" : "transparent",
                border: isActive ? "1px solid var(--accent)33" : "1px solid transparent",
                color: isActive ? "var(--accent)" : "var(--text-secondary)",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLAnchorElement).style.background = "var(--bg-card-hover)"; }}
              onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
            >
              <Icon size={15} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: "13px", fontWeight: isActive ? 600 : 500, flex: 1 }}>
                {AI_NAV.label}
              </span>
              {!isActive && (
                <span style={{ fontSize: "9px", fontWeight: 700, padding: "2px 6px", borderRadius: "100px", background: "linear-gradient(135deg,var(--accent),var(--purple))", color: "#fff", letterSpacing: "0.05em" }}>NEW</span>
              )}
            </Link>
          );
        })()}
      </nav>

      {/* ── Footer: theme toggle + logout ── */}
      <div style={{ padding: "12px 10px", borderTop: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "4px" }}>
        {/* Theme toggle */}
        <button
          onClick={toggle}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            width: "100%",
            padding: "8px 10px",
            borderRadius: "8px",
            background: "transparent",
            border: "1px solid transparent",
            cursor: "pointer",
            color: "var(--text-muted)",
            textAlign: "left",
            transition: "background 0.15s, color 0.15s",
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
          <span style={{ fontSize: "13px", fontWeight: 500 }}>
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </span>
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            width: "100%",
            padding: "8px 10px",
            borderRadius: "8px",
            background: "transparent",
            border: "1px solid transparent",
            cursor: "pointer",
            color: "var(--text-muted)",
            textAlign: "left",
            transition: "background 0.15s, color 0.15s",
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
          <span style={{ fontSize: "13px", fontWeight: 500 }}>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
