"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Sparkles, Plus, Trash2, Download, FileText, Send,
  RotateCcw, MessageSquare, Clock, PanelLeftClose, PanelLeftOpen,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;   // ISO
}

interface Session {
  id: string;
  title: string;
  range_days: number;
  created_at: string;
  updated_at: string;
  messages?: ChatMessage[];
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60_000);
  if (m < 1)  return "Just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d === 1) return "Yesterday";
  if (d < 7)  return `${d} days ago`;
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function titleFromMessage(text: string): string {
  return text.length > 48 ? text.slice(0, 48) + "…" : text;
}

// ── Markdown-lite renderer ────────────────────────────────────────────────────

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**"))
      return <strong key={i} style={{ color: "var(--text-primary)", fontWeight: 600 }}>{p.slice(2, -2)}</strong>;
    if (p.startsWith("`") && p.endsWith("`"))
      return <code key={i} style={{ background: "var(--bg-card-hover)", borderRadius: "4px", padding: "1px 6px", fontSize: "12px", fontFamily: "monospace", color: "var(--accent)" }}>{p.slice(1, -1)}</code>;
    return p;
  });
}

function renderContent(text: string) {
  return text.split("\n").map((line, i) => {
    if (line.startsWith("## "))
      return <p key={i} style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "14px", margin: "12px 0 4px" }}>{line.slice(3)}</p>;
    if (line.startsWith("### "))
      return <p key={i} style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: "13px", margin: "10px 0 3px" }}>{line.slice(4)}</p>;
    if (line.startsWith("- ") || line.startsWith("* "))
      return (
        <div key={i} style={{ display: "flex", gap: "8px", margin: "3px 0" }}>
          <span style={{ color: "var(--accent)", flexShrink: 0 }}>•</span>
          <span style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: "1.6" }}>{renderInline(line.slice(2))}</span>
        </div>
      );
    if (/^\d+\.\s/.test(line)) {
      const m = line.match(/^(\d+)\.\s(.*)$/);
      if (m) return (
        <div key={i} style={{ display: "flex", gap: "8px", margin: "3px 0" }}>
          <span style={{ color: "var(--accent)", fontWeight: 700, fontSize: "13px", flexShrink: 0, minWidth: "18px" }}>{m[1]}.</span>
          <span style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: "1.6" }}>{renderInline(m[2])}</span>
        </div>
      );
    }
    if (line.startsWith("---"))
      return <hr key={i} style={{ border: "none", borderTop: "1px solid var(--border)", margin: "12px 0" }} />;
    if (!line.trim())
      return <div key={i} style={{ height: "8px" }} />;
    return <p key={i} style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: "1.65", margin: "2px 0" }}>{renderInline(line)}</p>;
  });
}

// ── Quick prompts ─────────────────────────────────────────────────────────────

const QUICK = [
  "Give me an executive summary of the last 30 days",
  "Which traffic sources drive the best engagement?",
  "Which keywords should we prioritize for SEO?",
  "Where are users dropping off in the funnel?",
  "Which pages perform best?",
  "What content should we create next?",
  "Which countries generate the most qualified traffic?",
  "Why might leads be down recently?",
];

// ── Export helpers ────────────────────────────────────────────────────────────

function exportTXT(session: Session) {
  const lines = [`ScalePods AI Analytics Assistant`, `Session: ${session.title}`, `Date: ${new Date(session.created_at).toLocaleString()}`, `Range: Last ${session.range_days} days`, ``, `${"─".repeat(60)}`, ``];
  (session.messages ?? []).forEach((m) => {
    lines.push(`[${m.role === "user" ? "YOU" : "AI ASSISTANT"}] ${new Date(m.timestamp).toLocaleTimeString()}`);
    lines.push(m.content);
    lines.push("");
  });
  const blob = new Blob([lines.join("\n")], { type: "text/plain" });
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
  a.download = `scalepods-ai-${session.id.slice(0, 8)}.txt`; a.click();
}

function exportPDF(session: Session) {
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${session.title}</title>
<style>
  body{font-family:system-ui,sans-serif;max-width:800px;margin:40px auto;color:#1a1a1a;line-height:1.6}
  h1{font-size:22px;border-bottom:2px solid #6366f1;padding-bottom:8px}
  .meta{color:#666;font-size:13px;margin-bottom:24px}
  .msg{margin:20px 0;padding:16px;border-radius:8px}
  .user{background:#f0f0ff;border-left:4px solid #6366f1}
  .assistant{background:#f8f8f8;border-left:4px solid #10b981}
  .label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px;color:#666}
  .time{font-size:11px;color:#999;margin-left:8px}
  pre{white-space:pre-wrap;margin:0;font-family:inherit;font-size:14px}
</style></head><body>
<h1>🤖 ${session.title}</h1>
<div class="meta">ScalePods AI Analytics · ${new Date(session.created_at).toLocaleString()} · Last ${session.range_days} days</div>
${(session.messages ?? []).map(m => `
<div class="msg ${m.role}">
  <div class="label">${m.role === "user" ? "You" : "AI Assistant"}<span class="time">${new Date(m.timestamp).toLocaleTimeString()}</span></div>
  <pre>${m.content.replace(/</g, "&lt;")}</pre>
</div>`).join("")}
</body></html>`;
  const w = window.open("", "_blank")!;
  w.document.write(html); w.document.close();
  setTimeout(() => { w.focus(); w.print(); }, 500);
}

// ── Main component ────────────────────────────────────────────────────────────

const AI_LIST_COLLAPSE_KEY = "ai-session-list-collapsed";

export default function AIDashboard() {
  const [sessions, setSessions]       = useState<Session[]>([]);
  const [activeId, setActiveId]       = useState<string | null>(null);
  const [active, setActive]           = useState<Session | null>(null);
  const [streamingMsg, setStreaming]  = useState<string | null>(null);
  const [input, setInput]             = useState("");
  const [loading, setLoading]         = useState(false);
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [rangeDays, setRangeDays]     = useState(30);
  const [listCollapsed, setListCollapsed] = useState(false);

  const bottomRef   = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortRef    = useRef<AbortController | null>(null);

  // Load session list
  const loadSessions = useCallback(async () => {
    const res = await fetch("/api/admin/ai/sessions");
    if (res.ok) setSessions(await res.json());
    setLoadingSessions(false);
  }, []);

  useEffect(() => { loadSessions(); }, [loadSessions]);

  // Restore AI list collapse state
  useEffect(() => {
    try {
      if (localStorage.getItem(AI_LIST_COLLAPSE_KEY) === "true") setListCollapsed(true);
    } catch {}
  }, []);

  function toggleListCollapse() {
    setListCollapsed((prev) => {
      const next = !prev;
      try { localStorage.setItem(AI_LIST_COLLAPSE_KEY, String(next)); } catch {}
      return next;
    });
  }

  // Auto-scroll
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [active?.messages, streamingMsg]);

  // Load a session
  const openSession = useCallback(async (id: string) => {
    setActiveId(id);
    const res = await fetch(`/api/admin/ai/sessions/${id}`);
    if (res.ok) setActive(await res.json());
  }, []);

  // Create new session
  const newSession = useCallback(async () => {
    const res = await fetch("/api/admin/ai/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "New Chat", range_days: rangeDays }),
    });
    if (res.ok) {
      const s: Session = await res.json();
      s.messages = [];
      setSessions((prev) => [s, ...prev]);
      setActive(s);
      setActiveId(s.id);
    }
  }, [rangeDays]);

  // Delete session
  const deleteSession = useCallback(async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await fetch(`/api/admin/ai/sessions/${id}`, { method: "DELETE" });
    setSessions((prev) => prev.filter((s) => s.id !== id));
    if (activeId === id) { setActive(null); setActiveId(null); }
  }, [activeId]);

  // Send message
  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading || !active) return;

    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    const userMsg: ChatMessage = { role: "user", content: trimmed, timestamp: new Date().toISOString() };
    const newMessages = [...(active.messages ?? []), userMsg];

    // Update title from first message
    const isFirst = (active.messages ?? []).length === 0;
    const newTitle = isFirst ? titleFromMessage(trimmed) : active.title;

    const updated = { ...active, messages: newMessages, title: newTitle };
    setActive(updated);
    setLoading(true);
    setStreaming("");

    // Persist user message
    await fetch(`/api/admin/ai/sessions/${active.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages, title: newTitle }),
    });
    if (isFirst) setSessions((prev) => prev.map((s) => s.id === active.id ? { ...s, title: newTitle } : s));

    // Stream AI response
    const controller = new AbortController();
    abortRef.current = controller;
    let accumulated = "";

    try {
      const res = await fetch("/api/admin/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          range: String(rangeDays),
        }),
        signal: controller.signal,
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setStreaming(accumulated);
      }
    } catch (err: any) {
      if (err?.name !== "AbortError") {
        accumulated = "Sorry, I couldn't fetch the analytics data right now. Please check that your API credentials are configured.";
        setStreaming(accumulated);
      }
    }

    // Save AI message
    const aiMsg: ChatMessage = { role: "assistant", content: accumulated, timestamp: new Date().toISOString() };
    const finalMessages = [...newMessages, aiMsg];
    const finalSession = { ...updated, messages: finalMessages, updated_at: new Date().toISOString() };
    setActive(finalSession);
    setStreaming(null);
    setLoading(false);

    await fetch(`/api/admin/ai/sessions/${active.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: finalMessages }),
    });
    setSessions((prev) => prev.map((s) => s.id === active.id ? { ...s, updated_at: finalSession.updated_at } : s));
  }, [active, loading, rangeDays]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
  };

  const autoResize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 140) + "px";
  };

  // ── Render ──

  return (
    <div style={{ display: "flex", height: "100%", overflow: "hidden", fontFamily: "Inter, system-ui, sans-serif" }}>
      <style>{`
        @keyframes adm-pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes adm-blink  { 0%,100%{opacity:1} 50%{opacity:0} }
        .ai-sess-item:hover   { background: var(--bg-card-hover) !important; }
        .ai-sess-item:hover .ai-sess-del { opacity:1 !important; }
        .ai-quick:hover       { background: var(--accent-dim) !important; border-color: var(--accent) !important; color: var(--accent) !important; }
        .ai-send:hover:not(:disabled) { opacity:.85; }
        .ai-range-btn:hover   { background: var(--bg-card-hover) !important; }
        @media(max-width:768px){ .ai-sidebar{ display:none !important; } }
      `}</style>

      {/* ══ Left sidebar — session list ══════════════════════════════════════ */}
      <div className="ai-sidebar" style={{
        width: listCollapsed ? "52px" : "260px",
        minWidth: listCollapsed ? "52px" : "260px",
        borderRight: "1px solid var(--border)",
        background: "var(--bg-sidebar)",
        display: "flex", flexDirection: "column", overflow: "hidden",
        transition: "width 0.22s cubic-bezier(.4,0,.2,1), min-width 0.22s cubic-bezier(.4,0,.2,1)",
      }}>
        {/* Header */}
        <div style={{
          padding: listCollapsed ? "0 10px" : "16px 14px 12px",
          borderBottom: "1px solid var(--border)", flexShrink: 0,
          height: listCollapsed ? "64px" : "auto",
          display: "flex", flexDirection: listCollapsed ? "column" : "column",
          justifyContent: listCollapsed ? "center" : "flex-start",
          alignItems: listCollapsed ? "center" : "stretch",
          gap: listCollapsed ? "8px" : "0",
          transition: "padding 0.22s",
        }}>
          {/* Collapsed header: icon + toggle */}
          {listCollapsed ? (
            <>
              <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "linear-gradient(135deg,var(--accent),var(--purple))", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Sparkles size={14} color="#fff" />
              </div>
              <button
                onClick={toggleListCollapse}
                title="Expand session list"
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: "4px", display: "flex", borderRadius: "6px" }}
              >
                <PanelLeftOpen size={15} />
              </button>
            </>
          ) : (
            <>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "linear-gradient(135deg,var(--accent),var(--purple))", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Sparkles size={14} color="#fff" />
                  </div>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-primary)", whiteSpace: "nowrap" }}>AI Assistant</span>
                </div>
                <div style={{ display: "flex", gap: "4px" }}>
                  {/* Collapse toggle */}
                  <button
                    onClick={toggleListCollapse}
                    title="Collapse session list"
                    style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: "4px", display: "flex", borderRadius: "6px" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)"; }}
                  >
                    <PanelLeftClose size={15} />
                  </button>
                  {/* New chat */}
                  <button
                    onClick={newSession}
                    title="New chat"
                    style={{ background: "var(--accent-dim)", border: "1px solid var(--accent)33", borderRadius: "7px", padding: "5px", cursor: "pointer", color: "var(--accent)", display: "flex" }}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Range selector */}
              <div style={{ display: "flex", gap: "4px" }}>
                {[7, 30, 90].map((d) => (
                  <button key={d} className="ai-range-btn" onClick={() => setRangeDays(d)} style={{
                    flex: 1, padding: "4px 0", borderRadius: "6px", fontSize: "11px", fontWeight: 600,
                    border: rangeDays === d ? "1px solid var(--accent)44" : "1px solid var(--border)",
                    background: rangeDays === d ? "var(--accent-dim)" : "transparent",
                    color: rangeDays === d ? "var(--accent)" : "var(--text-muted)",
                    cursor: "pointer", transition: "all .15s",
                  }}>{d}D</button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Session list — hidden when collapsed, show icon-only indicators */}
        {listCollapsed ? (
          /* Collapsed: show new-chat button + dot indicators for sessions */
          <div style={{ flex: 1, overflowY: "auto", padding: "10px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
            <button
              onClick={newSession}
              title="New chat"
              style={{ width: "32px", height: "32px", borderRadius: "8px", background: "var(--accent-dim)", border: "1px solid var(--accent)33", cursor: "pointer", color: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
            >
              <Plus size={14} />
            </button>
            <div style={{ width: "24px", height: "1px", background: "var(--border)", margin: "2px 0" }} />
            {sessions.slice(0, 12).map((s) => (
              <button
                key={s.id}
                onClick={() => { openSession(s.id); }}
                title={s.title}
                style={{
                  width: "32px", height: "32px", borderRadius: "8px", border: "none", cursor: "pointer",
                  background: activeId === s.id ? "var(--accent-dim)" : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  transition: "background .15s",
                }}
                onMouseEnter={(e) => { if (activeId !== s.id) (e.currentTarget as HTMLButtonElement).style.background = "var(--bg-card-hover)"; }}
                onMouseLeave={(e) => { if (activeId !== s.id) (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
              >
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: activeId === s.id ? "var(--accent)" : "var(--text-muted)", transition: "background .15s" }} />
              </button>
            ))}
          </div>
        ) : (
          <div style={{ flex: 1, overflowY: "auto", padding: "8px 8px" }}>
            {loadingSessions && (
              <div style={{ padding: "20px", textAlign: "center" }}>
                {[1,2,3].map(i => <div key={i} style={{ height: "52px", borderRadius: "8px", background: "var(--bg-card-hover)", marginBottom: "6px", animation: "adm-pulse 1.5s ease infinite" }} />)}
              </div>
            )}

            {!loadingSessions && sessions.length === 0 && (
              <div style={{ padding: "32px 12px", textAlign: "center" }}>
                <MessageSquare size={28} style={{ color: "var(--text-muted)", marginBottom: "8px" }} />
                <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: 0 }}>No chats yet.<br />Click + to start.</p>
              </div>
            )}

            {sessions.map((s) => (
              <div
                key={s.id}
                className="ai-sess-item"
                onClick={() => openSession(s.id)}
                style={{
                  padding: "10px 10px", borderRadius: "8px", cursor: "pointer", marginBottom: "2px",
                  background: activeId === s.id ? "var(--accent-dim)" : "transparent",
                  border: activeId === s.id ? "1px solid var(--accent)22" : "1px solid transparent",
                  position: "relative", transition: "background .15s",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "4px" }}>
                  <p style={{
                    fontSize: "12px", fontWeight: activeId === s.id ? 600 : 500,
                    color: activeId === s.id ? "var(--accent)" : "var(--text-secondary)",
                    margin: 0, lineHeight: 1.4, overflow: "hidden", textOverflow: "ellipsis",
                    display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                  }}>
                    {s.title}
                  </p>
                  <button
                    className="ai-sess-del"
                    onClick={(e) => deleteSession(s.id, e)}
                    style={{ opacity: 0, background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: "2px", flexShrink: 0, display: "flex", transition: "opacity .15s" }}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "4px" }}>
                  <Clock size={10} style={{ color: "var(--text-muted)" }} />
                  <span style={{ fontSize: "10px", color: "var(--text-muted)" }}>{timeAgo(s.updated_at)}</span>
                  <span style={{ fontSize: "10px", color: "var(--border)", margin: "0 2px" }}>·</span>
                  <span style={{ fontSize: "10px", color: "var(--text-muted)" }}>{s.range_days}d</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ══ Right panel — chat ════════════════════════════════════════════════ */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: "var(--bg-page)" }}>

        {/* Chat header */}
        {active && (
          <div style={{
            padding: "12px 20px", borderBottom: "1px solid var(--border)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: "var(--bg-card)", flexShrink: 0,
          }}>
            <div>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>{active.title}</p>
              <p style={{ fontSize: "11px", color: "var(--text-muted)", margin: "2px 0 0" }}>
                {timeAgo(active.created_at)} · Last {active.range_days} days data
              </p>
            </div>
            <div style={{ display: "flex", gap: "6px" }}>
              <button onClick={() => exportTXT(active)} title="Export TXT" style={{ display: "flex", alignItems: "center", gap: "5px", padding: "6px 11px", borderRadius: "7px", background: "var(--bg-card-hover)", border: "1px solid var(--border)", color: "var(--text-secondary)", fontSize: "12px", fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>
                <FileText size={13} /> TXT
              </button>
              <button onClick={() => exportPDF(active)} title="Export PDF" style={{ display: "flex", alignItems: "center", gap: "5px", padding: "6px 11px", borderRadius: "7px", background: "var(--bg-card-hover)", border: "1px solid var(--border)", color: "var(--text-secondary)", fontSize: "12px", fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>
                <Download size={13} /> PDF
              </button>
              <button onClick={() => { setActive({ ...active, messages: [] }); }} title="Clear messages" style={{ display: "flex", alignItems: "center", padding: "6px", borderRadius: "7px", background: "var(--bg-card-hover)", border: "1px solid var(--border)", color: "var(--text-muted)", cursor: "pointer" }}>
                <RotateCcw size={13} />
              </button>
            </div>
          </div>
        )}

        {/* Messages area */}
        <div style={{ flex: 1, overflowY: "auto", padding: active ? "20px 24px" : "0" }}>

          {/* Empty state — no session selected */}
          {!active && (
            <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px", padding: "40px" }}>
              <div style={{ width: "60px", height: "60px", borderRadius: "16px", background: "linear-gradient(135deg,var(--accent),var(--purple))", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Sparkles size={28} color="#fff" />
              </div>
              <div style={{ textAlign: "center" }}>
                <h2 style={{ fontSize: "20px", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 8px", letterSpacing: "-0.02em" }}>Analytics AI Assistant</h2>
                <p style={{ fontSize: "14px", color: "var(--text-muted)", margin: 0, lineHeight: 1.6 }}>
                  Ask anything about your traffic, SEO,<br />conversions, or user behaviour.
                </p>
              </div>
              <button onClick={newSession} style={{
                display: "flex", alignItems: "center", gap: "8px", padding: "11px 22px",
                borderRadius: "10px", background: "var(--accent)", border: "none",
                color: "#fff", fontWeight: 600, fontSize: "14px", cursor: "pointer", fontFamily: "inherit",
              }}>
                <Plus size={16} /> Start New Chat
              </button>

              {/* Quick prompts */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", maxWidth: "560px", justifyContent: "center", marginTop: "8px" }}>
                {QUICK.map((q) => (
                  <button key={q} className="ai-quick" onClick={async () => { await newSession(); }} style={{
                    padding: "7px 14px", borderRadius: "100px", background: "var(--bg-card)",
                    border: "1px solid var(--border)", color: "var(--text-secondary)", fontSize: "12px",
                    cursor: "pointer", transition: "all .15s", fontFamily: "inherit",
                  }}>
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Empty session — show quick prompts */}
          {active && (active.messages ?? []).length === 0 && !streamingMsg && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "40px", gap: "20px" }}>
              <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>What would you like to know?</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", maxWidth: "600px", justifyContent: "center" }}>
                {QUICK.map((q) => (
                  <button key={q} className="ai-quick" onClick={() => sendMessage(q)} style={{
                    padding: "7px 14px", borderRadius: "100px", background: "var(--bg-card)",
                    border: "1px solid var(--border)", color: "var(--text-secondary)", fontSize: "12px",
                    cursor: "pointer", transition: "all .15s", fontFamily: "inherit",
                  }}>
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          {active && (active.messages ?? []).map((msg, i) => (
            <div key={i} style={{
              display: "flex", flexDirection: msg.role === "user" ? "row-reverse" : "row",
              gap: "12px", marginBottom: "20px", alignItems: "flex-start",
            }}>
              {/* Avatar */}
              <div style={{
                width: "32px", height: "32px", borderRadius: "50%", flexShrink: 0,
                background: msg.role === "user" ? "var(--accent-dim)" : "linear-gradient(135deg,var(--accent),var(--purple))",
                border: msg.role === "user" ? "1px solid var(--accent)44" : "none",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "12px", fontWeight: 700,
                color: msg.role === "user" ? "var(--accent)" : "#fff",
              }}>
                {msg.role === "user" ? "Y" : <Sparkles size={14} />}
              </div>

              <div style={{ maxWidth: "75%", display: "flex", flexDirection: "column", gap: "4px", alignItems: msg.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  padding: msg.role === "user" ? "11px 15px" : "14px 18px",
                  borderRadius: msg.role === "user" ? "16px 4px 16px 16px" : "4px 16px 16px 16px",
                  background: msg.role === "user" ? "var(--accent)" : "var(--bg-card)",
                  border: msg.role === "user" ? "none" : "1px solid var(--border)",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
                }}>
                  {msg.role === "user"
                    ? <p style={{ color: "#fff", fontSize: "14px", margin: 0, lineHeight: 1.5 }}>{msg.content}</p>
                    : <div>{renderContent(msg.content)}</div>
                  }
                </div>
                <span style={{ fontSize: "10px", color: "var(--text-muted)", padding: "0 4px" }}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            </div>
          ))}

          {/* Streaming message */}
          {streamingMsg !== null && (
            <div style={{ display: "flex", gap: "12px", marginBottom: "20px", alignItems: "flex-start" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", flexShrink: 0, background: "linear-gradient(135deg,var(--accent),var(--purple))", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Sparkles size={14} color="#fff" />
              </div>
              <div style={{ maxWidth: "75%", padding: "14px 18px", borderRadius: "4px 16px 16px 16px", background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                {streamingMsg ? renderContent(streamingMsg) : (
                  <div style={{ display: "flex", gap: "4px", alignItems: "center", height: "20px" }}>
                    {[0,1,2].map(i => <span key={i} style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--accent)", animation: `adm-pulse 1.2s ease ${i * 0.2}s infinite`, display: "inline-block" }} />)}
                  </div>
                )}
                {streamingMsg && <span style={{ display: "inline-block", width: "8px", height: "15px", background: "var(--accent)", borderRadius: "2px", marginLeft: "2px", animation: "adm-blink .7s ease infinite", verticalAlign: "middle" }} />}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input bar */}
        {active && (
          <div style={{ padding: "16px 20px", borderTop: "1px solid var(--border)", background: "var(--bg-card)", flexShrink: 0 }}>
            <div style={{
              display: "flex", gap: "10px", alignItems: "flex-end",
              background: "var(--bg-page)", border: "1px solid var(--border)",
              borderRadius: "14px", padding: "10px 10px 10px 16px",
            }}>
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => { setInput(e.target.value); autoResize(); }}
                onKeyDown={handleKeyDown}
                placeholder={`Ask about your analytics — traffic, SEO, conversions, campaigns…`}
                rows={1}
                disabled={loading}
                style={{
                  flex: 1, background: "none", border: "none", outline: "none",
                  color: "var(--text-primary)", fontSize: "14px", lineHeight: "1.5",
                  resize: "none", fontFamily: "inherit", padding: 0,
                  maxHeight: "140px", overflowY: "auto",
                }}
              />
              <button
                className="ai-send"
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || loading}
                style={{
                  width: "36px", height: "36px", flexShrink: 0, borderRadius: "10px",
                  background: input.trim() && !loading ? "var(--accent)" : "var(--bg-card-hover)",
                  border: "none", cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all .15s",
                  color: input.trim() && !loading ? "#fff" : "var(--text-muted)",
                }}
              >
                {loading
                  ? <span style={{ width: "14px", height: "14px", borderRadius: "50%", border: "2px solid var(--accent)", borderTopColor: "transparent", animation: "adm-spin .7s linear infinite", display: "inline-block" }} />
                  : <Send size={15} />
                }
              </button>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px", padding: "0 4px" }}>
              <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>Shift+Enter for new line</span>
              <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>Powered by GPT-4o · GA4 + GSC + Clarity</span>
            </div>
          </div>
        )}

        {!active && (
          <div style={{ padding: "12px 20px", borderTop: "1px solid var(--border)", background: "var(--bg-card)", flexShrink: 0, textAlign: "center" }}>
            <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>Select a chat or <button onClick={newSession} style={{ background: "none", border: "none", color: "var(--accent)", cursor: "pointer", fontFamily: "inherit", fontSize: "11px", fontWeight: 600, padding: 0 }}>start a new one</button> to begin</span>
          </div>
        )}
      </div>

      <style>{`@keyframes adm-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
    </div>
  );
}
