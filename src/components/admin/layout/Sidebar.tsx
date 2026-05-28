"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import {
  Activity,
  BarChart2,
  Search,
  LogOut,
  X,
} from "lucide-react";

interface SidebarProps {
  onClose?: () => void;
}

const NAV = [
  {
    label: "Microsoft Clarity",
    href: "/admin/clarity",
    icon: Activity,
    active: true,
    soon: false,
  },
  {
    label: "Google Analytics",
    href: "/admin/ga4",
    icon: BarChart2,
    active: false,
    soon: true,
  },
  {
    label: "Search Console",
    href: "/admin/gsc",
    icon: Search,
    active: false,
    soon: true,
  },
];

export default function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

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
      {/* Header */}
      <div
        style={{
          padding: "20px 20px 16px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          href="/admin/clarity"
          style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: "1px" }}
        >
          <span
            style={{
              fontSize: "15px",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            ScalePods
          </span>
          <span
            style={{
              fontSize: "11px",
              color: "var(--text-muted)",
              fontWeight: 500,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Vault
          </span>
        </Link>

        {/* Mobile close button */}
        {onClose && (
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-muted)",
              padding: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "6px",
            }}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Navigation */}
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
        {/* Section label */}
        <div
          style={{
            fontSize: "10px",
            fontWeight: 700,
            color: "var(--text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            padding: "8px 10px 6px",
          }}
        >
          Analytics
        </div>

        {NAV.map((item) => {
          const Icon = item.icon;
          const isActive = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 10px",
                borderRadius: "8px",
                textDecoration: "none",
                background: isActive ? "var(--accent-dim)" : "transparent",
                border: isActive ? "1px solid var(--accent)22" : "1px solid transparent",
                transition: "background 0.15s, border-color 0.15s",
                color: isActive ? "var(--accent)" : "var(--text-secondary)",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "var(--bg-card-hover)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                }
              }}
            >
              <Icon size={15} style={{ flexShrink: 0 }} />
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: isActive ? 600 : 500,
                  flex: 1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {item.label}
              </span>
              {item.soon && (
                <span
                  style={{
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    background: "var(--bg-card-hover)",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    flexShrink: 0,
                  }}
                >
                  Soon
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div
        style={{
          padding: "12px 10px",
          borderTop: "1px solid var(--border)",
        }}
      >
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
