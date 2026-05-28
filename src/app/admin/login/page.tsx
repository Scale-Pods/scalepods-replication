"use client";

import React, { useState } from "react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Loader2, Lock, Mail, Eye, EyeOff, ShieldCheck } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail]             = useState("");
  const [password, setPassword]       = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState<string | null>(null);
  const router  = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
    if (loginError) {
      setError(loginError.message);
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <main style={{
      minHeight: "100vh",
      background: "var(--bg-page)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      position: "relative",
      overflow: "hidden",
      fontFamily: "Inter, system-ui, sans-serif",
    }}>
      <style>{`
        @keyframes adm-login-pulse { 0%,100%{opacity:0.6} 50%{opacity:1} }

        .adm-input {
          width: 100%;
          background: var(--bg-page);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 12px 14px 12px 42px;
          color: var(--text-primary);
          font-size: 14px;
          font-family: inherit;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
          box-sizing: border-box;
        }
        .adm-input:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px var(--accent-glow);
        }
        .adm-input::placeholder { color: var(--text-muted); }

        .adm-btn-submit {
          width: 100%;
          padding: 13px;
          border-radius: 10px;
          background: var(--accent);
          color: #fff;
          border: none;
          font-weight: 600;
          font-size: 14px;
          font-family: inherit;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: opacity 0.15s, transform 0.15s;
          letter-spacing: 0.01em;
        }
        .adm-btn-submit:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); }
        .adm-btn-submit:active:not(:disabled) { transform: translateY(0); }
        .adm-btn-submit:disabled { opacity: 0.5; cursor: not-allowed; }

        @keyframes adm-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .adm-spin { animation: adm-spin 0.8s linear infinite; }
      `}</style>

      {/* Subtle background accent blobs */}
      <div style={{
        position: "absolute", top: "15%", left: "50%", transform: "translateX(-50%)",
        width: "600px", height: "400px",
        background: "radial-gradient(ellipse, var(--accent-glow) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Card */}
      <div style={{
        width: "100%",
        maxWidth: "400px",
        position: "relative",
        zIndex: 10,
        animation: "adm-login-pulse 0.001s", // trigger reflow — remove if not needed
      }}>

        {/* ── Logo + Badge ── */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <Image
              src="/scalepods-navbar-logo.png"
              alt="ScalePods"
              width={0}
              height={0}
              sizes="140px"
              style={{ width: "140px", height: "auto", display: "block", filter: "invert(1)" }}
              priority
            />
          </div>

          <div style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            padding: "5px 14px", borderRadius: "100px",
            background: "var(--accent-dim)", border: "1px solid var(--accent)33",
            marginBottom: "16px",
          }}>
            <ShieldCheck size={12} style={{ color: "var(--accent)" }} />
            <span style={{
              fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em",
              color: "var(--accent)", textTransform: "uppercase",
            }}>
              Secure Admin Access
            </span>
          </div>

          <h1 style={{
            fontSize: "22px", fontWeight: 700, color: "var(--text-primary)",
            margin: "0 0 6px", letterSpacing: "-0.02em",
          }}>
            Analytics Dashboard
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "13px", margin: 0 }}>
            Sign in to view your analytics
          </p>
        </div>

        {/* ── Form card ── */}
        <div style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          padding: "32px 28px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.24)",
        }}>
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

            {/* Email */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{
                fontSize: "11px", fontWeight: 600, color: "var(--text-muted)",
                textTransform: "uppercase", letterSpacing: "0.06em",
              }}>
                Email
              </label>
              <div style={{ position: "relative" }}>
                <Mail size={15} style={{
                  position: "absolute", left: "14px", top: "50%",
                  transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none",
                }} />
                <input
                  className="adm-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@scalepods.co"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{
                fontSize: "11px", fontWeight: 600, color: "var(--text-muted)",
                textTransform: "uppercase", letterSpacing: "0.06em",
              }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <Lock size={15} style={{
                  position: "absolute", left: "14px", top: "50%",
                  transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none",
                }} />
                <input
                  className="adm-input"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  style={{ paddingRight: "42px" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  style={{
                    position: "absolute", right: "12px", top: "50%",
                    transform: "translateY(-50%)",
                    background: "none", border: "none", padding: "4px",
                    cursor: "pointer", color: "var(--text-muted)",
                    display: "flex", alignItems: "center",
                  }}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                padding: "10px 14px", borderRadius: "8px",
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.2)",
                color: "var(--red)", fontSize: "12px", lineHeight: "1.5",
              }}>
                {error}
              </div>
            )}

            {/* Submit */}
            <button type="submit" disabled={loading} className="adm-btn-submit">
              {loading
                ? <Loader2 size={16} className="adm-spin" />
                : "Sign in to Dashboard"}
            </button>
          </form>
        </div>

        {/* Footer note */}
        <p style={{
          textAlign: "center", marginTop: "24px",
          fontSize: "11px", color: "var(--text-muted)",
          letterSpacing: "0.04em",
        }}>
          ScalePods Analytics Engine · {new Date().getFullYear()}
        </p>
      </div>
    </main>
  );
}
