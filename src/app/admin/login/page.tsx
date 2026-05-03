"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Loader2, Lock, Mail, ChevronRight, ShieldCheck, Eye, EyeOff } from "lucide-react";

// ── Design Tokens (Matching Homepage) ──────────────────────────────────────
const C = {
  bgPage:  "#04070D",
  bgCard:  "rgba(13, 15, 23, 0.8)",
  bgInput: "#0D0F17",
  border:  "rgba(255, 255, 255, 0.08)",
  green:   "#ACD791",
  blue:    "#0080FF",
  txtBright: "#E4E9F2",
  txtBody:   "#B8C7D9",
  txtMuted:  "#636996",
};

const F = {
  inter: "Inter, sans-serif",
  serif: "Instrument Serif, Georgia, serif",
};

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

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
      background: C.bgPage, 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      padding: "24px",
      position: "relative",
      overflow: "hidden",
      fontFamily: F.inter
    }}>
      {/* ── Background Glows ── */}
      <div style={{
        position: "absolute", top: "20%", left: "-10%",
        width: "500px", height: "500px",
        background: "radial-gradient(circle, rgba(0,128,255,0.08) 0%, transparent 70%)",
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", bottom: "10%", right: "-10%",
        width: "600px", height: "600px",
        background: "radial-gradient(circle, rgba(172,215,145,0.06) 0%, transparent 70%)",
        pointerEvents: "none"
      }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: "100%", maxWidth: "420px", position: "relative", zIndex: 10 }}
      >
        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "6px 16px", borderRadius: "100px",
            background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`,
            marginBottom: "24px",
          }}>
            <ShieldCheck style={{ width: "14px", height: "14px", color: C.green }} />
            <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", color: C.txtBright, textTransform: "uppercase" }}>
              Secure Admin Access
            </span>
          </div>

          <h1 style={{ fontSize: "36px", fontWeight: 700, color: "white", marginBottom: "8px", letterSpacing: "-0.02em" }}>
            ScalePods <em style={{ fontFamily: F.serif, fontStyle: "italic", fontWeight: 400, color: C.txtMuted }}>Vault</em>
          </h1>
          <p style={{ color: C.txtMuted, fontSize: "14px" }}>Enter credentials to view analytics</p>
        </div>

        {/* ── Login Card ── */}
        <div style={{
          background: C.bgCard,
          border: `1px solid ${C.border}`,
          backdropFilter: "blur(20px)",
          borderRadius: "24px",
          padding: "40px",
          boxShadow: "0 24px 64px -12px rgba(0,0,0,0.5)"
        }}>
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            
            {/* Email Field */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontSize: "12px", fontWeight: 600, color: C.txtMuted, textTransform: "uppercase", letterSpacing: "0.05em", marginLeft: "4px" }}>
                Email Address
              </label>
              <div style={{ position: "relative" }}>
                <Mail style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", width: "16px", height: "16px", color: "rgba(255,255,255,0.2)" }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@scalepods.co"
                  required
                  style={{
                    width: "100%", background: C.bgInput, border: `1px solid ${C.border}`,
                    borderRadius: "12px", padding: "14px 16px 14px 44px", color: "white",
                    fontSize: "14px", outline: "none", transition: "border-color 0.2s"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "rgba(109,182,255,0.4)"}
                  onBlur={(e) => e.target.style.borderColor = C.border}
                />
              </div>
            </div>

            {/* Password Field */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontSize: "12px", fontWeight: 600, color: C.txtMuted, textTransform: "uppercase", letterSpacing: "0.05em", marginLeft: "4px" }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <Lock style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", width: "16px", height: "16px", color: "rgba(255,255,255,0.2)" }} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{
                    width: "100%", background: C.bgInput, border: `1px solid ${C.border}`,
                    borderRadius: "12px", padding: "14px 44px 14px 44px", color: "white",
                    fontSize: "14px", outline: "none", transition: "border-color 0.2s"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "rgba(109,182,255,0.4)"}
                  onBlur={(e) => e.target.style.borderColor = C.border}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", color: "rgba(255,255,255,0.2)",
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div style={{
                padding: "12px", borderRadius: "8px", background: "rgba(248,113,113,0.08)",
                border: "1px solid rgba(248,113,113,0.2)", color: "#F87171", fontSize: "12px", textAlign: "center"
              }}>
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%", padding: "16px", borderRadius: "12px",
                background: "white", color: "black", border: "none",
                fontWeight: 700, fontSize: "15px", cursor: loading ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                transition: "all 0.2s ease", position: "relative", overflow: "hidden"
              }}
              onMouseEnter={(e) => {
                if(!loading) {
                  e.currentTarget.style.background = C.green;
                  e.currentTarget.style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                if(!loading) {
                  e.currentTarget.style.background = "white";
                  e.currentTarget.style.transform = "translateY(0)";
                }
              }}
            >
              {loading ? (
                <Loader2 style={{ width: "20px", height: "20px", animation: "spin 1s linear infinite" }} />
              ) : (
                <>
                  Enter Dashboard
                  <ChevronRight style={{ width: "18px", height: "18px" }} />
                </>
              )}
            </button>
          </form>
        </div>

        <p style={{ textAlign: "center", marginTop: "32px", fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.15)", textTransform: "uppercase", letterSpacing: "0.15em" }}>
          &copy; 2024 ScalePods Analytics Engine
        </p>
      </motion.div>

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}
