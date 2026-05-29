"use client";

import { useState, useRef, useEffect, useCallback, memo } from "react";
import { Sparkles, X, Send, RotateCcw, ChevronDown } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Message {
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
}

// ── Quick prompt chips ────────────────────────────────────────────────────────

const QUICK_PROMPTS = [
  "What happened this week?",
  "Which pages perform best?",
  "Which keywords should we optimize?",
  "Where are users dropping off?",
  "Which traffic source drives best engagement?",
  "What content should we create next?",
  "Which countries generate the most traffic?",
  "Give me an executive summary",
];

// ── Markdown-lite renderer (bold, bullets, code) ──────────────────────────────

function renderContent(text: string) {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Heading ##
    if (line.startsWith("## ")) {
      elements.push(
        <p key={i} style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "13px", margin: "10px 0 4px" }}>
          {line.slice(3)}
        </p>
      );
    }
    // Heading ###
    else if (line.startsWith("### ")) {
      elements.push(
        <p key={i} style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: "12px", margin: "8px 0 2px" }}>
          {line.slice(4)}
        </p>
      );
    }
    // Bullet
    else if (line.startsWith("- ") || line.startsWith("* ")) {
      elements.push(
        <div key={i} style={{ display: "flex", gap: "6px", margin: "2px 0" }}>
          <span style={{ color: "var(--accent)", flexShrink: 0, marginTop: "1px" }}>•</span>
          <span style={{ color: "var(--text-secondary)", fontSize: "13px", lineHeight: "1.55" }}>
            {renderInline(line.slice(2))}
          </span>
        </div>
      );
    }
    // Numbered list
    else if (/^\d+\.\s/.test(line)) {
      const match = line.match(/^(\d+)\.\s(.*)$/);
      if (match) {
        elements.push(
          <div key={i} style={{ display: "flex", gap: "8px", margin: "2px 0" }}>
            <span style={{ color: "var(--accent)", fontWeight: 700, fontSize: "12px", flexShrink: 0, minWidth: "16px" }}>{match[1]}.</span>
            <span style={{ color: "var(--text-secondary)", fontSize: "13px", lineHeight: "1.55" }}>
              {renderInline(match[2])}
            </span>
          </div>
        );
      }
    }
    // Horizontal rule
    else if (line.startsWith("---")) {
      elements.push(<hr key={i} style={{ border: "none", borderTop: "1px solid var(--border)", margin: "10px 0" }} />);
    }
    // Empty line → small spacer
    else if (line.trim() === "") {
      elements.push(<div key={i} style={{ height: "6px" }} />);
    }
    // Normal paragraph
    else {
      elements.push(
        <p key={i} style={{ color: "var(--text-secondary)", fontSize: "13px", lineHeight: "1.6", margin: "2px 0" }}>
          {renderInline(line)}
        </p>
      );
    }

    i++;
  }

  return <>{elements}</>;
}

function renderInline(text: string): React.ReactNode {
  // Bold **text**
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} style={{ color: "var(--text-primary)", fontWeight: 600 }}>{part.slice(2, -2)}</strong>;
    }
    // Inline code `text`
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={i} style={{ background: "var(--bg-card-hover)", borderRadius: "4px", padding: "1px 5px", fontSize: "11px", fontFamily: "monospace", color: "var(--accent)" }}>{part.slice(1, -1)}</code>;
    }
    return part;
  });
}

// ── Message bubble ────────────────────────────────────────────────────────────

const MessageBubble = memo(function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";

  return (
    <div style={{
      display: "flex",
      flexDirection: isUser ? "row-reverse" : "row",
      gap: "8px",
      alignItems: "flex-start",
      marginBottom: "12px",
    }}>
      {/* Avatar */}
      <div style={{
        width: "26px", height: "26px", borderRadius: "50%", flexShrink: 0,
        background: isUser ? "var(--accent-dim)" : "linear-gradient(135deg, var(--accent), var(--purple))",
        border: `1px solid ${isUser ? "var(--accent)44" : "transparent"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "11px", fontWeight: 700,
        color: isUser ? "var(--accent)" : "#fff",
      }}>
        {isUser ? "Y" : <Sparkles size={12} />}
      </div>

      {/* Bubble */}
      <div style={{
        maxWidth: "85%",
        padding: isUser ? "9px 13px" : "10px 14px",
        borderRadius: isUser ? "14px 4px 14px 14px" : "4px 14px 14px 14px",
        background: isUser ? "var(--accent)" : "var(--bg-card-hover)",
        border: isUser ? "none" : "1px solid var(--border)",
      }}>
        {isUser ? (
          <p style={{ color: "#fff", fontSize: "13px", margin: 0, lineHeight: "1.5" }}>{msg.content}</p>
        ) : (
          <div>
            {renderContent(msg.content)}
            {msg.streaming && (
              <span style={{
                display: "inline-block", width: "8px", height: "14px",
                background: "var(--accent)", borderRadius: "2px", marginLeft: "2px",
                animation: "adm-chat-blink 0.7s ease infinite",
                verticalAlign: "middle",
              }} />
            )}
          </div>
        )}
      </div>
    </div>
  );
});

// ── Main widget ───────────────────────────────────────────────────────────────

export default function ChatWidget() {
  const [open, setOpen]           = useState(false);
  const [input, setInput]         = useState("");
  const [messages, setMessages]   = useState<Message[]>([]);
  const [loading, setLoading]     = useState(false);
  const [showQuick, setShowQuick] = useState(true);
  const [range]                   = useState("30");

  const bottomRef    = useRef<HTMLDivElement>(null);
  const textareaRef  = useRef<HTMLTextAreaElement>(null);
  const abortRef     = useRef<AbortController | null>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-resize textarea
  const autoResize = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setInput("");
    setShowQuick(false);
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    const userMsg: Message = { role: "user", content: trimmed };
    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setLoading(true);

    // Placeholder streaming message
    const assistantMsg: Message = { role: "assistant", content: "", streaming: true };
    setMessages([...newHistory, assistantMsg]);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/admin/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newHistory.map((m) => ({ role: m.role, content: m.content })),
          range,
        }),
        signal: controller.signal,
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: accumulated, streaming: true };
          return updated;
        });
      }

      // Mark streaming done
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: "assistant", content: accumulated, streaming: false };
        return updated;
      });

    } catch (err: any) {
      if (err?.name !== "AbortError") {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: "Sorry, I couldn't fetch the analytics data right now. Please check that the API credentials are configured correctly.",
            streaming: false,
          };
          return updated;
        });
      }
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  }, [messages, loading, range]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const clearChat = () => {
    abortRef.current?.abort();
    setMessages([]);
    setShowQuick(true);
    setInput("");
  };

  return (
    <>
      <style>{`
        @keyframes adm-chat-blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes adm-chat-in {
          from { opacity:0; transform: translateY(12px) scale(0.97); }
          to   { opacity:1; transform: translateY(0)   scale(1); }
        }
        .adm-chat-panel { animation: adm-chat-in 0.2s ease; }
        .adm-chat-fab:hover { transform: scale(1.08); }
        .adm-chat-send:hover:not(:disabled) { background: var(--accent) !important; color: #fff !important; }
        .adm-quick-chip:hover { background: var(--accent-dim) !important; border-color: var(--accent) !important; color: var(--accent) !important; }
      `}</style>

      {/* ── FAB button ── */}
      <button
        className="adm-chat-fab"
        onClick={() => setOpen((v) => !v)}
        title="AI Analytics Assistant"
        style={{
          position: "fixed", bottom: "24px", right: "24px", zIndex: 9999,
          width: "48px", height: "48px", borderRadius: "50%",
          background: "linear-gradient(135deg, var(--accent), var(--purple))",
          border: "none", cursor: "pointer", boxShadow: "0 4px 20px var(--accent-glow)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "transform 0.2s",
          color: "#fff",
        }}
      >
        {open ? <X size={20} /> : <Sparkles size={20} />}
      </button>

      {/* ── Chat panel ── */}
      {open && (
        <div
          className="adm-chat-panel"
          style={{
            position: "fixed", bottom: "84px", right: "24px", zIndex: 9998,
            width: "min(420px, calc(100vw - 48px))",
            height: "min(600px, calc(100vh - 120px))",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
            display: "flex", flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div style={{
            padding: "14px 16px",
            borderBottom: "1px solid var(--border)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: "var(--bg-card)",
            flexShrink: 0,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{
                width: "32px", height: "32px", borderRadius: "8px",
                background: "linear-gradient(135deg, var(--accent), var(--purple))",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Sparkles size={16} color="#fff" />
              </div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1 }}>
                  Analytics AI
                </div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>
                  GA4 · GSC · Clarity — Last {range}d
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "4px" }}>
              {messages.length > 0 && (
                <button
                  onClick={clearChat}
                  title="Clear chat"
                  style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: "6px", borderRadius: "6px", display: "flex" }}
                >
                  <RotateCcw size={14} />
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: "6px", borderRadius: "6px", display: "flex" }}
              >
                <ChevronDown size={16} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column" }}>

            {/* Welcome */}
            {messages.length === 0 && (
              <div style={{ textAlign: "center", padding: "20px 0 16px" }}>
                <div style={{
                  width: "48px", height: "48px", borderRadius: "12px",
                  background: "linear-gradient(135deg, var(--accent), var(--purple))",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 12px",
                }}>
                  <Sparkles size={22} color="#fff" />
                </div>
                <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)", margin: "0 0 6px" }}>
                  Analytics Assistant
                </p>
                <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: 0, lineHeight: 1.5 }}>
                  Ask me anything about your traffic,<br />SEO, conversions, or user behaviour.
                </p>
              </div>
            )}

            {/* Quick prompts */}
            {showQuick && messages.length === 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "8px" }}>
                {QUICK_PROMPTS.map((q) => (
                  <button
                    key={q}
                    className="adm-quick-chip"
                    onClick={() => sendMessage(q)}
                    style={{
                      padding: "5px 11px", borderRadius: "100px",
                      background: "var(--bg-page)", border: "1px solid var(--border)",
                      color: "var(--text-secondary)", fontSize: "11px", cursor: "pointer",
                      transition: "all 0.15s", fontFamily: "inherit",
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Message list */}
            {messages.map((msg, i) => (
              <MessageBubble key={i} msg={msg} />
            ))}

            <div ref={bottomRef} />
          </div>

          {/* Input area */}
          <div style={{
            padding: "12px 14px",
            borderTop: "1px solid var(--border)",
            background: "var(--bg-card)",
            flexShrink: 0,
          }}>
            <div style={{
              display: "flex", gap: "8px", alignItems: "flex-end",
              background: "var(--bg-page)", border: "1px solid var(--border)",
              borderRadius: "12px", padding: "8px 8px 8px 14px",
              transition: "border-color 0.15s",
            }}
              onFocus={() => {}}
            >
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => { setInput(e.target.value); autoResize(); }}
                onKeyDown={handleKeyDown}
                placeholder="Ask about traffic, SEO, conversions…"
                rows={1}
                disabled={loading}
                style={{
                  flex: 1, background: "none", border: "none", outline: "none",
                  color: "var(--text-primary)", fontSize: "13px", lineHeight: "1.5",
                  resize: "none", fontFamily: "inherit", padding: 0,
                  maxHeight: "120px", overflowY: "auto",
                }}
              />
              <button
                className="adm-chat-send"
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || loading}
                style={{
                  width: "32px", height: "32px", flexShrink: 0, borderRadius: "8px",
                  background: input.trim() && !loading ? "var(--accent)" : "var(--bg-card-hover)",
                  border: "none", cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.15s",
                  color: input.trim() && !loading ? "#fff" : "var(--text-muted)",
                }}
              >
                <Send size={14} />
              </button>
            </div>
            <p style={{ fontSize: "10px", color: "var(--text-muted)", margin: "6px 0 0", textAlign: "center" }}>
              Shift+Enter for new line · Powered by Claude AI
            </p>
          </div>
        </div>
      )}
    </>
  );
}
