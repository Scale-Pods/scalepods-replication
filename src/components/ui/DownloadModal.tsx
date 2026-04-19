"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, CheckCircle, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

// ── Design tokens ─────────────────────────────────────────────────────────────
const C = {
  bgOverlay: "rgba(4, 7, 13, 0.8)",
  bgModal: "#0A0E14",
  bgInput: "#0D1017",
  border: "rgba(255,255,255,0.07)",
  green: "#ACD791",
  greenBright: "#8DC763",
  blue: "#6DB6FF",
  txtBright: "#E4E9F2",
  txtBody: "#B8C7D9",
  txtMuted: "#636996",
};

const labelStyle = {
  display: "block",
  fontSize: "14px",
  fontWeight: 600,
  color: "#B8C7D9",
  marginBottom: "8px",
};

const inputStyle = {
  width: "100%",
  background: "#08090C",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: "8px",
  padding: "14px 16px",
  fontSize: "14px",
  color: C.txtBright,
  outline: "none",
  boxSizing: "border-box" as const,
};

export default function DownloadModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Save to download_leads table
    const { error: dbError } = await supabase
      .from("download_leads")
      .insert([{ 
        full_name: form.name, 
        contact_number: form.phone, 
        email: form.email 
      }]);

    setLoading(false);

    if (dbError) {
      console.error(dbError);
      setError("Something went wrong. Please try again.");
    } else {
      setSubmitted(true);
      // Trigger download
      const link = document.createElement("a");
      link.href = "/Scalepods-Feature Guides.zip";
      link.download = "Scalepods-Feature Guides.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Auto close after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setForm({ name: "", phone: "", email: "" });
        onClose();
      }, 3000);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center",
          padding: "20px"
        }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: "absolute", inset: 0,
              background: "rgba(4, 7, 13, 0.6)",
              backdropFilter: "blur(5px)"
            }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "440px",
              background: C.bgModal,
              border: `1px solid ${C.border}`,
              borderRadius: "16px",
              padding: "32px",
              boxShadow: "0 24px 48px rgba(0,0,0,0.4)"
            }}
          >
            <button
              onClick={onClose}
              style={{
                position: "absolute", top: "16px", right: "16px",
                background: "transparent", border: "none", cursor: "pointer",
                color: C.txtMuted, display: "flex", alignItems: "center", justifyContent: "center",
                padding: "8px", borderRadius: "50%", transition: "all 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = C.txtBright}
              onMouseLeave={(e) => e.currentTarget.style.color = C.txtMuted}
            >
              <X size={20} />
            </button>

            {submitted ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <CheckCircle size={48} color={C.green} style={{ margin: "0 auto 16px" }} />
                <h3 style={{ fontSize: "20px", fontWeight: 600, color: C.txtBright, marginBottom: "8px" }}>
                  Download Started!
                </h3>
                <p style={{ color: C.txtBody, fontSize: "14px" }}>
                  Your feature guides are downloading. Feel free to close this window.
                </p>
              </div>
            ) : (
              <>
                <div style={{ textAlign: "center", marginBottom: "24px" }}>
                  <div style={{
                    width: "48px", height: "48px", background: "rgba(109, 182, 255, 0.1)",
                    borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 16px"
                  }}>
                    <Download size={24} color={C.blue} />
                  </div>
                  <h3 style={{ fontSize: "22px", fontWeight: 600, color: C.txtBright, marginBottom: "8px" }}>
                    Get the Feature Guides
                  </h3>
                  <p style={{ color: C.txtBody, fontSize: "14px" }}>
                    Enter your details below to receive our exclusive feature guides via direct download.
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: "20px" }}>
                    <label style={labelStyle}>Full Name</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Alex Sollork"
                      style={inputStyle}
                      required
                    />
                  </div>
                  
                  <div style={{ marginBottom: "20px" }}>
                    <label style={labelStyle}>Email Address</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Alex@gmail.com"
                      style={inputStyle}
                      required
                    />
                  </div>

                  <div style={{ marginBottom: "24px" }}>
                    <label style={labelStyle}>Phone Number</label>
                    <input
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Enter with Country Code"
                      style={inputStyle}
                      required
                    />
                  </div>

                  {error && (
                    <p style={{ color: "#ff6b6b", fontSize: "13px", marginBottom: "16px", textAlign: "center" }}>
                      {error}
                    </p>
                  )}

                  <div style={{ position: "relative", width: "100%" }}>
                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        position: "relative",
                        width: "100%",
                        padding: "16px 24px",
                        background: "#040508",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "8px",
                        color: "#FFFFFF",
                        fontSize: "15px",
                        fontWeight: 600,
                        cursor: loading ? "not-allowed" : "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "60%",
                          height: "1px",
                          background: "rgba(255,255,255,0.8)",
                          boxShadow: "0px -4px 16px 4px rgba(255,255,255,0.25)",
                        }}
                      />
                      <span style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", gap: "8px" }}>
                        {loading ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            Processing...
                          </>
                        ) : (
                          "Download Now"
                        )}
                      </span>
                    </button>
                  </div>
                  <p style={{
                    fontSize: "12px", color: C.txtMuted, textAlign: "center",
                    marginTop: "16px"
                  }}>
                    We respect your privacy. No spam.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
