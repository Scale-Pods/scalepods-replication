"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Ticket,
  Coins,
  Search,
  Download,
  ExternalLink,
  RefreshCw,
  Copy,
  Check,
  Clock,
  Mail,
  MessageSquare,
  Bot,
  AlertTriangle,
  Send,
  X,
  ShieldAlert,
  Inbox,
  CheckCheck,
  UserX,
  Radio,
  ArrowLeft,
  Star,
  Archive,
  CornerUpLeft,
  Printer,
  ChevronDown,
  Calendar,
  ArrowDown,
  ArrowUp,
} from "lucide-react";
import "./webinar-admin.css";

interface EmailStatus {
  status?: string;
  sent_at?: string;
  subject?: string;
  recipient?: string;
  thread_id?: string;
  message_id?: string;
  reason?: string;
  held_at?: string;
}

interface ReplyHistoryItem {
  type: "inbound" | "draft_held" | "ai_sent" | string;
  status: string;
  subject?: string;
  timestamp: string;
  message_id?: string;
  classification?: string;
  customer_reply?: string;
  ai_reply?: string;
  safety_reason?: string;
  content?: string;
  body?: string;
  message?: string;
  text?: string;
  reply?: string;
  response?: string;
  draft?: string;
  [key: string]: unknown;
}

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

  // Supabase Outbound Email & AI Features
  instantly_synced?: boolean;
  instantly_synced_at?: string | null;
  is_bounced?: boolean;
  bounced_at?: string | null;
  is_unsubscribed?: boolean;
  unsubscribed_at?: string | null;

  email_1?: string | null;
  email_2?: string | null;
  email_3?: string | null;
  email_4?: string | null;
  email_5?: string | null;

  email_status_1?: EmailStatus | null;
  email_status_2?: EmailStatus | null;
  email_status_3?: EmailStatus | null;
  email_status_4?: EmailStatus | null;
  email_status_5?: EmailStatus | null;

  emails_sent?: Record<string, { status: string; sent_at: string; message_id?: string }> | null;

  customer_reply?: string | null;
  customer_reply_at?: string | null;
  customer_reply_subject?: string | null;
  customer_reply_message_id?: string | null;

  ai_reply?: string | null;
  ai_reply_at?: string | null;
  ai_reply_status?: string | null;

  replies_history?: ReplyHistoryItem[] | null;
}

interface StatsData {
  totalCount: number;
  totalRevenue: number;
  todayCount: number;
  lastRegisteredAt: string | null;
  totalEmailsSent?: number;
  totalRepliesReceived?: number;
  totalInstantlySynced?: number;
  totalUnsubscribed?: number;
  totalBounced?: number;
}

const GOOGLE_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1S3GAVpN60UQB9g9TPkuBqt_yQ5ZiwTUglk17_OcN59o/edit?gid=0#gid=0";

const CADENCE_DETAILS: Record<number, { title: string; timing: string; defaultSubject: string }> = {
  1: {
    title: "Email 1: Welcome & Quick-Start Guide",
    timing: "Immediately upon registration",
    defaultSubject: "You're in! Access link inside + Your Quick Start Guide | ScalePods",
  },
  2: {
    title: "Email 2: Working Harder vs Systems",
    timing: "Drip Day 1 (10:00 AM)",
    defaultSubject: "Why working harder is actually breaking your business",
  },
  3: {
    title: "Email 3: Bennett Realty Case Study",
    timing: "Drip Day 2 (10:00 AM)",
    defaultSubject: "Case Study: How Bennett Realty scaled appointments by 35%",
  },
  4: {
    title: "Email 4: Day 1 Live Today Alert",
    timing: "Session Day (8:00 AM)",
    defaultSubject: "WE GO LIVE TODAY! (Grab your coffee early)",
  },
  5: {
    title: "Email 5: Broadcasting Live Now",
    timing: "10 mins before start (1:50 PM)",
    defaultSubject: "WE ARE LIVE! Join us right now...",
  },
};

export default function WebinarAdminPage() {
  const [registrations, setRegistrations] = useState<WebinarRegistration[]>([]);
  const [stats, setStats] = useState<StatsData>({
    totalCount: 0,
    totalRevenue: 0,
    todayCount: 0,
    lastRegisteredAt: null,
    totalEmailsSent: 0,
    totalRepliesReceived: 0,
    totalInstantlySynced: 0,
    totalUnsubscribed: 0,
    totalBounced: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterTab, setFilterTab] = useState<"all" | "replies" | "synced" | "held" | "unsubscribed">("all");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedEmailText, setCopiedEmailText] = useState<boolean>(false);

  // Google Mail modal drawer state
  const [selectedAttendeeId, setSelectedAttendeeId] = useState<string | null>(null);
  const [selectedEmailNum, setSelectedEmailNum] = useState<number>(1);
  const [showToDetails, setShowToDetails] = useState<boolean>(false);

  // Reliable derived selected attendee
  const selectedAttendee = useMemo(() => {
    if (!selectedAttendeeId) return null;
    return registrations.find((r) => r.id === selectedAttendeeId) || null;
  }, [registrations, selectedAttendeeId]);

  const fetchData = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) setRefreshing(true);
    try {
      const res = await fetch("/api/admin/webinar/registrations", {
        cache: "no-store",
      });
      if (res.ok) {
        const json = await res.json();
        const regs: WebinarRegistration[] = json.registrations || [];
        setRegistrations(regs);

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
    const interval = setInterval(() => {
      fetchData();
    }, 20000);
    return () => clearInterval(interval);
  }, [fetchData]);

  // Escape key listener for drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedAttendeeId(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCopy = (text: string, id: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {}
  };

  const handleCopyEmail = (text: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedEmailText(true);
      setTimeout(() => setCopiedEmailText(false), 2000);
    } catch {}
  };

  const getEmailStatus = (
    r: WebinarRegistration,
    num: number
  ): { status: string; sent_at?: string; subject?: string; reason?: string; message_id?: string; thread_id?: string } => {
    const key = `email_status_${num}` as keyof WebinarRegistration;
    const st = r[key] as EmailStatus | null | undefined;
    if (st && st.status) {
      return {
        status: st.status,
        sent_at: st.sent_at,
        subject: st.subject,
        reason: st.reason,
        message_id: st.message_id,
        thread_id: st.thread_id,
      };
    }
    if (r.emails_sent && r.emails_sent[`email_${num}`]) {
      return {
        status: r.emails_sent[`email_${num}`].status || "sent",
        sent_at: r.emails_sent[`email_${num}`].sent_at,
        message_id: r.emails_sent[`email_${num}`].message_id,
      };
    }
    return { status: "pending" };
  };

  const getEmailContent = (r: WebinarRegistration, num: number): string => {
    const key = `email_${num}` as keyof WebinarRegistration;
    return (r[key] as string) || "";
  };

  const hasInboundReply = (r: WebinarRegistration) => {
    return Boolean(r.customer_reply) || (Array.isArray(r.replies_history) && r.replies_history.length > 0);
  };

  const hasHeldEmail = (r: WebinarRegistration) => {
    for (let i = 1; i <= 5; i++) {
      const st = getEmailStatus(r, i);
      if (st.status === "held_test_mode" || st.status === "safety_guard_held") return true;
    }
    return false;
  };

  const formatRegDate = (dateStr?: string | null) => {
    if (!dateStr) return { date: "—", time: "" };
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return { date: "—", time: "" };

      const date = d.toLocaleDateString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "numeric",
        month: "short",
        year: "numeric",
      });

      const time = d.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      return { date, time };
    } catch {
      return { date: "—", time: "" };
    }
  };

  const filteredRegistrations = useMemo(() => {
    let list = registrations;

    if (filterTab === "replies") {
      list = list.filter((r) => hasInboundReply(r));
    } else if (filterTab === "synced") {
      list = list.filter((r) => r.instantly_synced);
    } else if (filterTab === "held") {
      list = list.filter((r) => hasHeldEmail(r));
    } else if (filterTab === "unsubscribed") {
      list = list.filter((r) => r.is_unsubscribed || r.is_bounced);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((r) => {
        const regFormatted = r.created_at
          ? new Date(r.created_at)
              .toLocaleDateString("en-IN", {
                timeZone: "Asia/Kolkata",
                day: "numeric",
                month: "short",
                year: "numeric",
              })
              .toLowerCase()
          : "";
        return (
          r.name?.toLowerCase().includes(q) ||
          r.email?.toLowerCase().includes(q) ||
          r.phone?.toLowerCase().includes(q) ||
          r.payment_id?.toLowerCase().includes(q) ||
          r.order_id?.toLowerCase().includes(q) ||
          r.role?.toLowerCase().includes(q) ||
          r.customer_reply?.toLowerCase().includes(q) ||
          r.ai_reply?.toLowerCase().includes(q) ||
          regFormatted.includes(q)
        );
      });
    }

    return [...list].sort((a, b) => {
      const timeA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const timeB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return sortOrder === "asc" ? timeA - timeB : timeB - timeA;
    });
  }, [registrations, filterTab, searchQuery, sortOrder]);

  const replyCount = useMemo(() => registrations.filter(hasInboundReply).length, [registrations]);
  const syncedCount = useMemo(() => registrations.filter((r) => r.instantly_synced).length, [registrations]);
  const heldCount = useMemo(() => registrations.filter(hasHeldEmail).length, [registrations]);
  const unsubscribedCount = useMemo(
    () => registrations.filter((r) => r.is_unsubscribed || r.is_bounced).length,
    [registrations]
  );

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
      "Instantly Synced",
      "Emails Sent Count",
      "Has Inbound Reply",
      "Customer Reply Subject",
      "Customer Reply Text",
      "AI Reply Status",
      "Unsubscribed",
      "Bounced",
    ];

    const rows = filteredRegistrations.map((r) => {
      let sentCount = 0;
      for (let i = 1; i <= 5; i++) {
        const st = getEmailStatus(r, i);
        if (st.status === "sent" || st.status === "delivered") sentCount++;
      }

      return [
        new Date(r.created_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        `"${(r.name || "").replace(/"/g, '""')}"`,
        r.email || "",
        `"${r.phone || ""}"`,
        `"${(r.role || "").replace(/"/g, '""')}"`,
        r.amount || 99,
        r.payment_id || "",
        r.order_id || "",
        r.payment_status || "confirmed",
        r.instantly_synced ? "Yes" : "No",
        `${sentCount}/5`,
        hasInboundReply(r) ? "Yes" : "No",
        `"${(r.customer_reply_subject || "").replace(/"/g, '""')}"`,
        `"${(r.customer_reply || "").replace(/"/g, '""')}"`,
        r.ai_reply_status || "",
        r.is_unsubscribed ? "Yes" : "No",
        r.is_bounced ? "Yes" : "No",
      ];
    });

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `scalepods_webinar_outbound_registrations_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="sp-admin-page-wrapper">
      <div className="sp-admin-container">
        {/* ── Section 3: Main Dashboard Header ── */}
        <div className="sp-header-row">
          <div className="sp-header-left">
            <div className="sp-title-line">
              <h1 className="sp-page-title">AI Business Automation Webinar</h1>
              <div className="sp-live-indicator">
                <span className="sp-live-dot" />
                <span>Live</span>
              </div>
            </div>
            <p className="sp-page-desc">
              Overview of attendee registrations, email delivery, and automated responses.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="sp-header-actions">
            <button
              type="button"
              onClick={() => fetchData(true)}
              disabled={refreshing}
              className="sp-btn-outlined"
            >
              <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
              <span>Refresh</span>
            </button>

            <a
              href={GOOGLE_SHEET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="sp-btn-outlined blue"
            >
              <ExternalLink size={14} />
              <span>Google Sheet</span>
            </a>

            <button
              type="button"
              onClick={exportToCSV}
              disabled={filteredRegistrations.length === 0}
              className="sp-btn-primary"
            >
              <Download size={14} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* ── Section 4: KPI Cards ── */}
        <div className="sp-kpi-grid">
          <div className="sp-kpi-card">
            <div className="sp-kpi-header">
              <span className="sp-kpi-label">Registrations</span>
              <Ticket size={16} className="sp-kpi-icon" />
            </div>
            <div className="sp-kpi-value">{stats.totalCount}</div>
            <div className="sp-kpi-sub">Verified ₹99 passes</div>
          </div>

          <div className="sp-kpi-card">
            <div className="sp-kpi-header">
              <span className="sp-kpi-label">Revenue</span>
              <Coins size={16} className="sp-kpi-icon" />
            </div>
            <div className="sp-kpi-value">₹{stats.totalRevenue.toLocaleString()}</div>
            <div className="sp-kpi-sub">Pass fees collected</div>
          </div>

          <div className="sp-kpi-card">
            <div className="sp-kpi-header">
              <span className="sp-kpi-label">Emails Delivered</span>
              <Send size={16} className="sp-kpi-icon" />
            </div>
            <div className="sp-kpi-value">
              {stats.totalEmailsSent ?? 0}
              <span className="sp-kpi-secondary-stat">
                / {stats.totalCount * 5}
              </span>
            </div>
            <div className="sp-kpi-sub">5-stage cadence</div>
          </div>

          <div className="sp-kpi-card">
            <div className="sp-kpi-header">
              <span className="sp-kpi-label">Inbound Replies</span>
              <MessageSquare size={16} className="sp-kpi-icon" />
            </div>
            <div className="sp-kpi-value">{stats.totalRepliesReceived ?? replyCount}</div>
            <div className="sp-kpi-sub">Engaged attendees</div>
          </div>

          <div className="sp-kpi-card">
            <div className="sp-kpi-header">
              <span className="sp-kpi-label">Instantly Synced</span>
              <Radio size={16} className="sp-kpi-icon" />
            </div>
            <div className="sp-kpi-value">
              {stats.totalInstantlySynced ?? syncedCount}
              <span className="sp-kpi-secondary-stat">
                / {stats.totalCount}
              </span>
            </div>
            <div className="sp-kpi-sub">Outbound engine</div>
          </div>

          <div className="sp-kpi-card">
            <div className="sp-kpi-header">
              <span className="sp-kpi-label">Opt-Out / Bounced</span>
              <UserX size={16} className="sp-kpi-icon" />
            </div>
            <div className="sp-kpi-value">
              {stats.totalUnsubscribed ?? unsubscribedCount}
              <span className="sp-kpi-secondary-stat">
                unsub / {stats.totalBounced ?? 0} bnc
              </span>
            </div>
            <div className="sp-kpi-sub">Deliverability health</div>
          </div>
        </div>

      {/* ── Section 5 & 6: Attendee Data Table & Toolbar ── */}
      <div className="sp-card-wrapper">
        {/* Toolbar: Filters and Search */}
        <div className="sp-filter-toolbar">
          <div className="sp-filter-tabs">
            <button
              type="button"
              onClick={() => setFilterTab("all")}
              className={`sp-tab-item ${filterTab === "all" ? "active" : ""}`}
            >
              <span>All</span>
              <span className="sp-tab-badge">{registrations.length}</span>
            </button>
            <button
              type="button"
              onClick={() => setFilterTab("replies")}
              className={`sp-tab-item ${filterTab === "replies" ? "active" : ""}`}
            >
              <span>With Replies</span>
              <span className="sp-tab-badge">{replyCount}</span>
            </button>
            <button
              type="button"
              onClick={() => setFilterTab("synced")}
              className={`sp-tab-item ${filterTab === "synced" ? "active" : ""}`}
            >
              <span>Instantly Synced</span>
              <span className="sp-tab-badge">{syncedCount}</span>
            </button>
            <button
              type="button"
              onClick={() => setFilterTab("held")}
              className={`sp-tab-item ${filterTab === "held" ? "active" : ""}`}
            >
              <span>Safety Held</span>
              <span className="sp-tab-badge">{heldCount}</span>
            </button>
            <button
              type="button"
              onClick={() => setFilterTab("unsubscribed")}
              className={`sp-tab-item ${filterTab === "unsubscribed" ? "active" : ""}`}
            >
              <span>Opt-Out</span>
              <span className="sp-tab-badge">{unsubscribedCount}</span>
            </button>
          </div>

          <div className="sp-search-box">
            <Search size={15} className="sp-search-icon" />
            <input
              type="text"
              placeholder="Search attendee, email, phone, or reply..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="sp-search-input"
            />
          </div>
        </div>

        {/* Table Body */}
        {loading ? (
          <div className="sp-loading-container">
            <RefreshCw size={22} className="animate-spin" style={{ margin: "0 auto 10px", color: "var(--sp-accent)" }} />
            <p style={{ fontSize: "13.5px", margin: 0 }}>Loading registration data...</p>
          </div>
        ) : filteredRegistrations.length === 0 ? (
          <div className="sp-empty-container">
            <Inbox size={32} style={{ margin: "0 auto 10px", opacity: 0.5 }} />
            <p className="sp-empty-title">
              No registrations found
            </p>
            <p className="sp-empty-desc">
              Try adjusting your filter or search query.
            </p>
          </div>
        ) : (
          <div className="sp-table-scroll">
            <table className="sp-table">
              <thead>
                <tr>
                  <th>Attendee</th>
                  <th>Contact Information</th>
                  <th>
                    <button
                      type="button"
                      onClick={() => setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"))}
                      className="sp-th-sort-btn"
                      title={`Sorted by ${sortOrder === "desc" ? "Newest first" : "Oldest first"}. Click to toggle.`}
                    >
                      <span>Registration Date</span>
                      {sortOrder === "desc" ? (
                        <ArrowDown size={12} className="sp-sort-icon" />
                      ) : (
                        <ArrowUp size={12} className="sp-sort-icon" />
                      )}
                    </button>
                  </th>
                  <th>Outbound Cadence (1–5)</th>
                  <th>Inbound & AI Response</th>
                  <th style={{ textAlign: "right" }}>Amount</th>
                  <th style={{ textAlign: "right" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRegistrations.map((item, idx) => {
                  const hasReply = hasInboundReply(item);
                  const replyHistoryCount = Array.isArray(item.replies_history) ? item.replies_history.length : 0;
                  const deliveredCount = [1, 2, 3, 4, 5].filter(
                    (n) => getEmailStatus(item, n).status === "sent"
                  ).length;
                  const regDate = formatRegDate(item.created_at);

                  return (
                    <tr key={item.id || idx}>
                      {/* Attendee */}
                      <td>
                        <div className="sp-user-col">
                          <div className="sp-user-avatar">
                            {(item.name || "A").charAt(0).toUpperCase()}
                          </div>
                          <div className="sp-user-info">
                            <span className="sp-user-name">{item.name}</span>
                            {item.role && <span className="sp-user-role">{item.role}</span>}
                            <div style={{ display: "flex", gap: "4px" }}>
                              {item.is_unsubscribed && (
                                <span className="sp-status-chip unsubscribed">
                                  Unsubscribed
                                </span>
                              )}
                              {item.is_bounced && (
                                <span className="sp-status-chip bounced">
                                  Bounced
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Contact Information */}
                      <td>
                        <a href={`mailto:${item.email}`} className="sp-contact-email">
                          {item.email}
                        </a>
                        <span className="sp-contact-phone">{item.phone}</span>
                        <div>
                          {item.instantly_synced ? (
                            <span className="sp-sync-indicator">
                              <CheckCheck size={12} />
                              <span>Instantly Synced</span>
                            </span>
                          ) : (
                            <span className="sp-sync-indicator pending">
                              <Clock size={11} />
                              <span>Sync Pending</span>
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Registration Date */}
                      <td>
                        <div className="sp-date-col">
                          <span className="sp-date-main">{regDate.date}</span>
                          <span className="sp-date-sub">{regDate.time}</span>
                        </div>
                      </td>

                      {/* Outbound Cadence (1–5) */}
                      <td>
                        <div className="sp-cadence-row">
                          {[1, 2, 3, 4, 5].map((num) => {
                            const st = getEmailStatus(item, num);
                            let stepClass = "pending";
                            let icon = <span>{num}</span>;

                            if (st.status === "sent" || st.status === "delivered") {
                              stepClass = "sent";
                              icon = <Check size={12} strokeWidth={2.5} />;
                            } else if (st.status === "held_test_mode" || st.status === "safety_guard_held") {
                              stepClass = "held";
                              icon = <ShieldAlert size={12} />;
                            }

                            return (
                              <button
                                key={num}
                                type="button"
                                onClick={() => {
                                  setSelectedAttendeeId(item.id);
                                  setSelectedEmailNum(num);
                                }}
                                className={`sp-cadence-step ${stepClass}`}
                                title={`Email ${num}: ${st.status}`}
                              >
                                {icon}
                              </button>
                            );
                          })}
                        </div>
                        <div className="sp-cadence-label">{deliveredCount} of 5 delivered</div>
                      </td>

                      {/* Inbound & AI Response */}
                      <td>
                        {hasReply ? (
                          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedAttendeeId(item.id);
                                setSelectedEmailNum(1);
                              }}
                              className="sp-reply-tag"
                            >
                              <MessageSquare size={12} />
                              <span>
                                {replyHistoryCount > 0 ? `${replyHistoryCount} Messages` : "Replied"}
                              </span>
                            </button>

                            {item.ai_reply && (
                              <div
                                className={`sp-ai-tag ${
                                  item.ai_reply_status === "sent" ? "sent" : "held"
                                }`}
                              >
                                <Bot size={11} />
                                <span>{item.ai_reply_status === "sent" ? "AI Replied" : "AI Draft Held"}</span>
                              </div>
                            )}
                          </div>
                        ) : (
                          <span style={{ fontSize: "12.5px", color: "var(--sp-text-muted)" }}>
                            No reply yet
                          </span>
                        )}
                      </td>

                      {/* Amount */}
                      <td style={{ textAlign: "right" }}>
                        <span className="sp-amount-text">
                          ₹{item.amount || 99}
                        </span>
                      </td>

                      {/* Action */}
                      <td style={{ textAlign: "right" }}>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedAttendeeId(item.id);
                            setSelectedEmailNum(1);
                          }}
                          className="sp-btn-view-conv"
                        >
                          <Mail size={13} />
                          <span>View conversation</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ======================================================================
          Section 7: GMAIL CONVERSATION DRAWER (Authentic Gmail UI)
          ====================================================================== */}
      {selectedAttendee && (
        <div
          className="sp-gmail-backdrop"
          onClick={() => setSelectedAttendeeId(null)}
        >
          <div
            className="sp-gmail-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Toolbar ── */}
            <div className="sp-gmail-toolbar">
              <div className="sp-gmail-toolbar-left">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedAttendeeId(null);
                  }}
                  className="sp-gmail-tool-btn"
                  title="Back to attendee list"
                >
                  <ArrowLeft size={18} />
                </button>
                <button type="button" className="sp-gmail-tool-btn" title="Archive">
                  <Archive size={17} />
                </button>
                <button type="button" className="sp-gmail-tool-btn" title="Report spam">
                  <AlertTriangle size={17} />
                </button>
                <button type="button" className="sp-gmail-tool-btn" title="Mark as unread">
                  <Mail size={17} />
                </button>
              </div>

              <div className="sp-gmail-toolbar-right">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="sp-gmail-tool-btn"
                  title="Print"
                >
                  <Printer size={17} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedAttendeeId(null);
                  }}
                  className="sp-gmail-tool-btn"
                  title="Close"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* ── Email Subject & Category Labels ── */}
            <div className="sp-gmail-header-area">
              <h2 className="sp-gmail-subject">
                {CADENCE_DETAILS[selectedEmailNum]?.defaultSubject || "ScalePods Masterclass"}
              </h2>

              <div className="sp-gmail-chips">
                <span className="sp-gmail-chip inbox">Inbox</span>
                <span className="sp-gmail-chip drip">
                  {CADENCE_DETAILS[selectedEmailNum]?.title.split(":")[0]}
                </span>
                {selectedAttendee.instantly_synced && (
                  <span className="sp-gmail-chip synced">
                    Instantly Synced
                  </span>
                )}
                {hasInboundReply(selectedAttendee) && (
                  <span className="sp-gmail-chip replied">
                    Inbound Reply
                  </span>
                )}
                {selectedAttendee.created_at && (
                  <span
                    className="sp-gmail-chip reg-date"
                    title={`Registered at ${new Date(selectedAttendee.created_at).toLocaleString("en-IN", {
                      timeZone: "Asia/Kolkata",
                    })}`}
                  >
                    <Calendar size={11} />
                    <span>
                      Registered:{" "}
                      {new Date(selectedAttendee.created_at).toLocaleDateString("en-IN", {
                        timeZone: "Asia/Kolkata",
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </span>
                )}
              </div>
            </div>

            {/* ── Email Sequence Tabs (Email 1 to 5) ── */}
            <div className="sp-gmail-seq-tabs">
              {[1, 2, 3, 4, 5].map((num) => {
                const st = getEmailStatus(selectedAttendee, num);
                const isActive = selectedEmailNum === num;
                let dotClass = "pending";
                if (st.status === "sent" || st.status === "delivered") dotClass = "sent";
                else if (st.status === "held_test_mode" || st.status === "safety_guard_held") dotClass = "held";

                return (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setSelectedEmailNum(num)}
                    className={`sp-gmail-seq-tab ${isActive ? "active" : ""}`}
                  >
                    <span className={`sp-gmail-seq-dot ${dotClass}`} />
                    <span>Email {num}</span>
                  </button>
                );
              })}
            </div>

            {/* ── Scrollable Email Messages Area ── */}
            <div className="sp-gmail-content">
              {/* Outbound Email Card */}
              {(() => {
                const st = getEmailStatus(selectedAttendee, selectedEmailNum);
                const content = getEmailContent(selectedAttendee, selectedEmailNum);
                const sentDateStr = st.sent_at
                  ? new Date(st.sent_at).toLocaleString("en-IN", {
                      timeZone: "Asia/Kolkata",
                      dateStyle: "medium",
                      timeStyle: "short",
                    })
                  : "Scheduled / Pending";

                return (
                  <div className="sp-email-card">
                    {/* Header */}
                    <div className="sp-email-header">
                      <div className="sp-email-sender-block">
                        <div className="sp-email-avatar" style={{ background: "#C5221F" }}>
                          S
                        </div>
                        <div className="sp-email-meta">
                          <div className="sp-email-from">
                            ScalePods Masterclass{" "}
                            <span className="sp-email-from-addr">&lt;team@scalepods.co&gt;</span>
                          </div>
                          <div className="sp-email-to-line">
                            <span>to: {selectedAttendee.email}</span>
                            <button
                              type="button"
                              onClick={() => setShowToDetails((prev) => !prev)}
                              className="sp-email-to-toggle-btn"
                            >
                              <ChevronDown size={13} />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="sp-email-date-right">
                        <span>{sentDateStr}</span>
                        <button type="button" className="sp-gmail-tool-btn" style={{ width: "30px", height: "30px" }} title="Star">
                          <Star size={15} />
                        </button>
                        <button type="button" className="sp-gmail-tool-btn" style={{ width: "30px", height: "30px" }} title="Reply">
                          <CornerUpLeft size={15} />
                        </button>
                      </div>
                    </div>

                    {/* Expandable "to" dropdown */}
                    {showToDetails && (
                      <div className="sp-email-to-dropdown">
                        <span className="sp-dropdown-label">from:</span>
                        <span>ScalePods &lt;team@scalepods.co&gt;</span>

                        <span className="sp-dropdown-label">to:</span>
                        <span>
                          {selectedAttendee.name} &lt;{selectedAttendee.email}&gt;
                        </span>

                        <span className="sp-dropdown-label">registered:</span>
                        <span>
                          {selectedAttendee.created_at
                            ? new Date(selectedAttendee.created_at).toLocaleString("en-IN", {
                                timeZone: "Asia/Kolkata",
                                dateStyle: "medium",
                                timeStyle: "short",
                              })
                            : "—"}
                        </span>

                        <span className="sp-dropdown-label">email date:</span>
                        <span>{sentDateStr}</span>

                        <span className="sp-dropdown-label">subject:</span>
                        <span>{st.subject || CADENCE_DETAILS[selectedEmailNum]?.defaultSubject}</span>

                        <span className="sp-dropdown-label">security:</span>
                        <span>Standard encryption (TLS)</span>

                        {st.message_id && (
                          <>
                            <span className="sp-dropdown-label">message-id:</span>
                            <span style={{ fontFamily: "monospace", fontSize: "11px" }}>{st.message_id}</span>
                          </>
                        )}
                      </div>
                    )}

                    {/* Safety notice if held in test mode */}
                    {st.reason && (
                      <div className="sp-safety-notice-box">
                        <strong>Safety Notice:</strong> {st.reason}
                      </div>
                    )}

                    {/* Email Body */}
                    <div className="sp-email-body">
                      {content ? (
                        content
                      ) : (
                        <div style={{ color: "var(--sp-text-muted)", fontStyle: "italic" }}>
                          This email ({CADENCE_DETAILS[selectedEmailNum]?.title}) has not been generated or triggered yet.
                        </div>
                      )}
                    </div>

                    {/* Footer Actions */}
                    {content && (
                      <div className="sp-email-actions">
                        <button
                          type="button"
                          onClick={() => handleCopyEmail(content)}
                          className="sp-btn-outlined"
                        >
                          {copiedEmailText ? <Check size={13} /> : <Copy size={13} />}
                          <span>{copiedEmailText ? "Copied Body" : "Copy Email Body"}</span>
                        </button>
                        <span style={{ fontSize: "12px", color: "var(--sp-text-muted)" }}>
                          Trigger Timing: {CADENCE_DETAILS[selectedEmailNum]?.timing}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Inbound Customer Reply Messages */}
              {selectedAttendee.replies_history && selectedAttendee.replies_history.length > 0 ? (
                selectedAttendee.replies_history.map((msg, idx) => {
                  const isInbound = msg.type === "inbound";
                  const msgDateStr = new Date(msg.timestamp).toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                    dateStyle: "medium",
                    timeStyle: "short",
                  });

                  if (isInbound) {
                    const replyBody =
                      msg.customer_reply ||
                      msg.content ||
                      msg.body ||
                      msg.message ||
                      msg.text ||
                      msg.reply ||
                      selectedAttendee.customer_reply;

                    return (
                      <div key={idx} className="sp-reply-card">
                        <div className="sp-email-header">
                          <div className="sp-email-sender-block">
                            <div className="sp-email-avatar" style={{ background: "#1A73E8" }}>
                              {(selectedAttendee.name || "A").charAt(0).toUpperCase()}
                            </div>
                            <div className="sp-email-meta">
                              <div className="sp-email-from">
                                {selectedAttendee.name}{" "}
                                <span className="sp-email-from-addr">&lt;{selectedAttendee.email}&gt;</span>
                              </div>
                              <div className="sp-email-to-line">
                                <span>to: team@scalepods.co</span>
                                {msg.classification && (
                                  <span className="sp-msg-classification">
                                    {msg.classification}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="sp-email-date-right">
                            <span>{msgDateStr}</span>
                          </div>
                        </div>

                        {msg.subject && (
                          <div className="sp-reply-subject-line">
                            Re: {msg.subject}
                          </div>
                        )}

                        <div className="sp-email-body">
                          {replyBody ? (
                            String(replyBody)
                          ) : (
                            <span style={{ color: "var(--sp-text-muted)", fontStyle: "italic" }}>
                              (No message body provided)
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  }

                  // AI Response Card
                  const isHeld = msg.status === "safety_guard_held" || Boolean(msg.safety_reason);
                  const aiBody =
                    msg.ai_reply ||
                    msg.content ||
                    msg.response ||
                    msg.draft ||
                    selectedAttendee.ai_reply;

                  return (
                    <div key={idx} className="sp-ai-card">
                      <div className="sp-ai-header-bar">
                        <div className="sp-ai-header-left">
                          <Bot size={15} style={{ color: "var(--sp-accent)" }} />
                          <span>ScalePods AI Assistant</span>
                          <span className="sp-ai-badge-draft">
                            {isHeld ? "AI Draft" : "Dispatched Response"}
                          </span>
                        </div>
                        <span style={{ fontSize: "12px", color: "var(--sp-text-secondary)" }}>{msgDateStr}</span>
                      </div>

                      {/* Safety Alert (only shown when held) */}
                      {isHeld && (
                        <div className="sp-ai-safety-alert">
                          <ShieldAlert size={14} style={{ flexShrink: 0 }} />
                          <span>
                            <strong>Safety Held:</strong> {msg.safety_reason || "Simulated execution without real dispatch to recipient."}
                          </span>
                        </div>
                      )}

                      <div className="sp-ai-content">
                        {aiBody ? (
                          String(aiBody)
                        ) : (
                          <span style={{ color: "var(--sp-text-muted)", fontStyle: "italic" }}>
                            (No AI draft content)
                          </span>
                        )}
                      </div>

                      <div className="sp-ai-footer">
                        <button
                          type="button"
                          onClick={() => handleCopy(String(aiBody || ""), `ai-${idx}`)}
                          className="sp-btn-outlined"
                        >
                          {copiedId === `ai-${idx}` ? <Check size={13} /> : <Copy size={13} />}
                          <span>{copiedId === `ai-${idx}` ? "Copied" : "Copy AI Draft"}</span>
                        </button>
                        <span>Model: gpt-4o / claude-3-5</span>
                      </div>
                    </div>
                  );
                })
              ) : selectedAttendee.customer_reply ? (
                <>
                  <div className="sp-reply-card">
                    <div className="sp-email-header">
                      <div className="sp-email-sender-block">
                        <div className="sp-email-avatar" style={{ background: "#1A73E8" }}>
                          {(selectedAttendee.name || "A").charAt(0).toUpperCase()}
                        </div>
                        <div className="sp-email-meta">
                          <div className="sp-email-from">
                            {selectedAttendee.name}{" "}
                            <span className="sp-email-from-addr">&lt;{selectedAttendee.email}&gt;</span>
                          </div>
                          <div className="sp-email-to-line">
                            <span>to: team@scalepods.co</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="sp-email-body">
                      {selectedAttendee.customer_reply || (
                        <span style={{ color: "var(--sp-text-muted)", fontStyle: "italic" }}>
                          (No message body provided)
                        </span>
                      )}
                    </div>
                  </div>

                  {selectedAttendee.ai_reply && (
                    <div className="sp-ai-card">
                      <div className="sp-ai-header-bar">
                        <div className="sp-ai-header-left">
                          <Bot size={15} style={{ color: "var(--sp-accent)" }} />
                          <span>ScalePods AI Assistant</span>
                          <span className="sp-ai-badge-draft">
                            {selectedAttendee.ai_reply_status === "sent" ? "Dispatched Response" : "AI Draft"}
                          </span>
                        </div>
                      </div>

                      {selectedAttendee.ai_reply_status !== "sent" && (
                        <div className="sp-ai-safety-alert">
                          <ShieldAlert size={14} style={{ flexShrink: 0 }} />
                          <span>
                            <strong>Safety Held:</strong> Simulated draft held by safety guard.
                          </span>
                        </div>
                      )}

                      <div className="sp-ai-content">
                        {selectedAttendee.ai_reply}
                      </div>

                      <div className="sp-ai-footer">
                        <button
                          type="button"
                          onClick={() => handleCopy(selectedAttendee.ai_reply || "", "ai-single")}
                          className="sp-btn-outlined"
                        >
                          {copiedId === "ai-single" ? <Check size={13} /> : <Copy size={13} />}
                          <span>{copiedId === "ai-single" ? "Copied" : "Copy AI Draft"}</span>
                        </button>
                        <span>Model: gpt-4o / claude-3-5</span>
                      </div>
                    </div>
                  )}
                </>
              ) : null}
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
