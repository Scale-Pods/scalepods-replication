"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Ticket,
  Coins,
  Calendar,
  Search,
  Download,
  ExternalLink,
  RefreshCw,
  Copy,
  Check,
  CheckCircle2,
  Clock,
} from "lucide-react";
import KpiCard from "@/components/admin/shared/KpiCard";
import SectionCard from "@/components/admin/shared/SectionCard";
import EmptyState from "@/components/admin/shared/EmptyState";

interface WebinarRegistration {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  role: string | null;
  amount: number;
  currency: string;
  order_id: string;
  payment_id: string;
  payment_status: string;
  session_dates: string;
  utm_source: string | null;
  utm_campaign: string | null;
  whatsapp_joined: boolean;
}

interface StatsData {
  totalCount: number;
  totalRevenue: number;
  todayCount: number;
  lastRegisteredAt: string | null;
}

const GOOGLE_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1S3GAVpN60UQB9g9TPkuBqt_yQ5ZiwTUglk17_OcN59o/edit?gid=0#gid=0";

export default function WebinarAdminPage() {
  const [registrations, setRegistrations] = useState<WebinarRegistration[]>([]);
  const [stats, setStats] = useState<StatsData>({
    totalCount: 0,
    totalRevenue: 0,
    todayCount: 0,
    lastRegisteredAt: null,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchData = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) setRefreshing(true);
    try {
      const res = await fetch("/api/admin/webinar/registrations", {
        cache: "no-store",
      });
      if (res.ok) {
        const json = await res.json();
        setRegistrations(json.registrations || []);
        if (json.stats) {
          setStats(json.stats);
        }
      }
    } catch (err) {
      console.error("[Webinar Feed Fetch Error]:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    // Poll every 20 seconds for live attendee registrations
    const interval = setInterval(() => {
      fetchData();
    }, 20000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const handleCopy = (text: string, id: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {}
  };

  const filteredRegistrations = useMemo(() => {
    if (!searchQuery.trim()) return registrations;
    const q = searchQuery.toLowerCase().trim();
    return registrations.filter((r) => {
      return (
        r.name?.toLowerCase().includes(q) ||
        r.email?.toLowerCase().includes(q) ||
        r.phone?.toLowerCase().includes(q) ||
        r.payment_id?.toLowerCase().includes(q) ||
        r.order_id?.toLowerCase().includes(q) ||
        r.role?.toLowerCase().includes(q)
      );
    });
  }, [registrations, searchQuery]);

  const exportToCSV = () => {
    if (filteredRegistrations.length === 0) return;

    const headers = [
      "Timestamp (IST)",
      "Full Name",
      "Email Address",
      "Phone Number",
      "Designation / Role",
      "Amount (INR)",
      "Payment ID",
      "Order ID",
      "Status",
      "Session Date",
      "UTM Campaign",
    ];

    const rows = filteredRegistrations.map((r) => [
      new Date(r.created_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      `"${(r.name || "").replace(/"/g, '""')}"`,
      r.email || "",
      `"${r.phone || ""}"`,
      `"${(r.role || "").replace(/"/g, '""')}"`,
      r.amount || 99,
      r.payment_id || "",
      r.order_id || "",
      r.payment_status || "confirmed",
      `"${r.session_dates || "12-13 December 2026"}"`,
      `"${r.utm_campaign || "Meta Ads"}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `scalepods_webinar_registrations_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ padding: "28px 32px 64px", maxWidth: "1400px", margin: "0 auto" }}>
      {/* ── Page Header ── */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: "28px",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 10px",
              borderRadius: "9999px",
              background: "rgba(72, 221, 131, 0.12)",
              border: "1px solid rgba(72, 221, 131, 0.3)",
              color: "#48DD83",
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: "8px",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#48DD83",
                boxShadow: "0 0 8px #48DD83",
              }}
            />
            <span>Live Feed</span>
          </div>
          <h1
            style={{
              fontSize: "24px",
              fontWeight: 700,
              color: "var(--text-primary)",
              margin: "0 0 4px",
              letterSpacing: "-0.02em",
            }}
          >
            AI Business Automation Webinar
          </h1>
          <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: 0 }}>
            Real-time feed of confirmed ₹99 registrations, Razorpay transactions, and Google Sheet sync.
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={() => fetchData(true)}
            disabled={refreshing}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 14px",
              borderRadius: "8px",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              color: "var(--text-secondary)",
              fontSize: "13px",
              fontWeight: 500,
              cursor: refreshing ? "not-allowed" : "pointer",
              transition: "all 0.15s ease",
            }}
          >
            <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
            <span>Refresh</span>
          </button>

          <a
            href={GOOGLE_SHEET_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 14px",
              borderRadius: "8px",
              background: "rgba(2, 132, 199, 0.12)",
              border: "1px solid rgba(2, 132, 199, 0.3)",
              color: "#38BDF8",
              fontSize: "13px",
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.15s ease",
            }}
          >
            <ExternalLink size={14} />
            <span>Google Sheet</span>
          </a>

          <button
            onClick={exportToCSV}
            disabled={filteredRegistrations.length === 0}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              borderRadius: "8px",
              background: "#10B981",
              border: "none",
              color: "#FFFFFF",
              fontSize: "13px",
              fontWeight: 600,
              cursor: filteredRegistrations.length === 0 ? "not-allowed" : "pointer",
              opacity: filteredRegistrations.length === 0 ? 0.6 : 1,
              boxShadow: "0 4px 12px rgba(16, 185, 129, 0.25)",
              transition: "all 0.15s ease",
            }}
          >
            <Download size={14} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* ── KPI Stat Cards ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "28px",
        }}
      >
        <KpiCard
          label="Total Registrations"
          value={stats.totalCount}
          sub="All verified attendees"
          icon={<Ticket size={18} />}
          accentColor="#38BDF8"
          loading={loading}
        />
        <KpiCard
          label="Total Revenue"
          value={`₹${stats.totalRevenue.toLocaleString()}`}
          sub="₹99 / attendee pass fee"
          icon={<Coins size={18} />}
          accentColor="#48DD83"
          loading={loading}
        />
        <KpiCard
          label="Today's Registrations"
          value={stats.todayCount}
          sub="Since 12:00 AM IST"
          icon={<Clock size={18} />}
          accentColor="#F59E0B"
          loading={loading}
        />
        <KpiCard
          label="Session Schedule"
          value="12–13 Dec"
          sub="2:00 PM – 3:00 PM IST"
          icon={<Calendar size={18} />}
          accentColor="#A855F7"
          loading={loading}
        />
      </div>

      {/* ── Registrations Table Section ── */}
      <SectionCard
        title={`Attendee Registrations (${filteredRegistrations.length})`}
        subtitle="Live entries stored in Supabase and synchronized to Google Sheet"
        action={
          <div style={{ position: "relative", width: "260px" }}>
            <Search
              size={14}
              style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-muted)",
              }}
            />
            <input
              type="text"
              placeholder="Search name, email, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px 8px 32px",
                borderRadius: "8px",
                background: "var(--bg-page)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
                fontSize: "12.5px",
                outline: "none",
              }}
            />
          </div>
        }
      >
        {loading ? (
          <div style={{ padding: "40px 0", textAlign: "center", color: "var(--text-muted)" }}>
            <RefreshCw size={24} className="animate-spin" style={{ margin: "0 auto 12px" }} />
            <p style={{ fontSize: "13px", margin: 0 }}>Loading registration data...</p>
          </div>
        ) : filteredRegistrations.length === 0 ? (
          <EmptyState
            icon={<Ticket size={24} />}
            title="No registrations yet"
            description="When users register and pay ₹99, their details will stream here in real time."
          />
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <thead>
                <tr>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "0 14px 12px 0",
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    Attendee
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "0 14px 12px",
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    Contact Info
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "0 14px 12px",
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    Payment / Order Ref
                  </th>
                  <th
                    style={{
                      textAlign: "center",
                      padding: "0 14px 12px",
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    Amount
                  </th>
                  <th
                    style={{
                      textAlign: "center",
                      padding: "0 14px 12px",
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    Status
                  </th>
                  <th
                    style={{
                      textAlign: "right",
                      padding: "0 0 12px",
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    Registered At
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredRegistrations.map((item, idx) => {
                  const dateStr = new Date(item.created_at).toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  });

                  return (
                    <tr
                      key={item.id || idx}
                      style={{
                        borderBottom:
                          idx < filteredRegistrations.length - 1
                            ? "1px solid var(--border-subtle)"
                            : "none",
                      }}
                    >
                      {/* Attendee */}
                      <td style={{ padding: "14px 14px 14px 0", verticalAlign: "middle" }}>
                        <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>
                          {item.name}
                        </div>
                        {item.role && (
                          <div style={{ fontSize: "11.5px", color: "var(--text-muted)", marginTop: "2px" }}>
                            {item.role}
                          </div>
                        )}
                      </td>

                      {/* Contact Info */}
                      <td style={{ padding: "14px 14px", verticalAlign: "middle" }}>
                        <div style={{ fontSize: "12.5px" }}>
                          <a
                            href={`mailto:${item.email}`}
                            style={{ color: "#38BDF8", textDecoration: "none" }}
                          >
                            {item.email}
                          </a>
                        </div>
                        <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
                          <a
                            href={`tel:${item.phone}`}
                            style={{ color: "var(--text-muted)", textDecoration: "none" }}
                          >
                            {item.phone}
                          </a>
                        </div>
                      </td>

                      {/* Payment ID / Order ID */}
                      <td style={{ padding: "14px 14px", verticalAlign: "middle" }}>
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            fontFamily: "monospace",
                            fontSize: "11.5px",
                            color: "#48DD83",
                            background: "rgba(72, 221, 131, 0.08)",
                            padding: "3px 7px",
                            borderRadius: "5px",
                          }}
                        >
                          <span>{item.payment_id}</span>
                          <button
                            onClick={() => handleCopy(item.payment_id, item.payment_id)}
                            title="Copy Payment ID"
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              color: "inherit",
                              padding: "0 2px",
                              display: "inline-flex",
                            }}
                          >
                            {copiedId === item.payment_id ? <Check size={11} /> : <Copy size={11} />}
                          </button>
                        </div>
                        <div
                          style={{
                            fontSize: "11px",
                            color: "var(--text-muted)",
                            marginTop: "3px",
                            fontFamily: "monospace",
                          }}
                        >
                          {item.order_id}
                        </div>
                      </td>

                      {/* Amount */}
                      <td style={{ padding: "14px 14px", textAlign: "center", verticalAlign: "middle" }}>
                        <span
                          style={{
                            fontWeight: 700,
                            color: "var(--text-primary)",
                            fontSize: "13.5px",
                          }}
                        >
                          ₹{item.amount || 99}
                        </span>
                      </td>

                      {/* Status */}
                      <td style={{ padding: "14px 14px", textAlign: "center", verticalAlign: "middle" }}>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                            fontSize: "11px",
                            fontWeight: 700,
                            color: "#48DD83",
                            background: "rgba(72, 221, 131, 0.12)",
                            padding: "3px 8px",
                            borderRadius: "9999px",
                            textTransform: "uppercase",
                          }}
                        >
                          <CheckCircle2 size={12} />
                          <span>Confirmed</span>
                        </span>
                      </td>

                      {/* Registered Date */}
                      <td
                        style={{
                          padding: "14px 0",
                          textAlign: "right",
                          verticalAlign: "middle",
                          color: "var(--text-muted)",
                          fontSize: "12px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {dateStr}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </SectionCard>
    </div>
  );
}

