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
  txtMuted: "#D5DBE6",
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
  padding: "10px 14px",
  fontSize: "14px",
  color: C.txtBright,
  outline: "none",
  boxSizing: "border-box" as const,
};

export default function DownloadModal({
  isOpen,
  onClose,
  zipFile = "/downloads/sales-guide.pdf",
  zipName = "sales-guide.pdf",
  title = "Get the Feature Guide",
}: {
  isOpen: boolean;
  onClose: () => void;
  zipFile?: string;
  zipName?: string;
  title?: string;
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

    // Strict Email Verification
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

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
      link.href = zipFile;
      link.download = zipName;
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
              WebkitBackdropFilter: "blur(5px)",
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
              background: "rgba(8, 10, 14, 0.65)",
              border: `1px solid rgba(141, 199, 99, 0.4)`,
              borderRadius: "16px",
              padding: "24px 32px",
              boxShadow: "0 24px 48px rgba(0,0,0,0.4)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
          >
            <button
              onClick={onClose}
              style={{
                position: "absolute", top: "12px", right: "12px",
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
                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                  <div style={{
                    width: "40px", height: "40px", background: "rgba(141, 199, 99, 0.1)",
                    borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 12px"
                  }}>
                    <Download size={20} color={C.greenBright} />
                  </div>
                  <h3 style={{ fontSize: "20px", fontWeight: 600, color: C.txtBright, marginBottom: "4px" }}>
                    {title}
                  </h3>
                  <p style={{ color: C.txtBody, fontSize: "13px" }}>
                    Enter your details below to receive our exclusive feature guides via direct download.
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: "14px" }}>
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
                  
                  <div style={{ marginBottom: "14px" }}>
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

                  <div style={{ marginBottom: "18px" }}>
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
                    {/* Internal lamp glow for the button */}
                    <div style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -6px)",
                      width: "80%",
                      height: "40px",
                      background: "radial-gradient(ellipse at center, rgba(141, 199, 99, 0.15) 0%, transparent 70%)",
                      pointerEvents: "none",
                      zIndex: 0
                    }} />
                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        position: "relative",
                        zIndex: 1,
                        width: "100%",
                        padding: "12px 24px",
                        background: "rgba(8,10,16,0.85)",
                        border: "1px solid rgba(141, 199, 99, 0.5)",
                        borderRadius: "12px",
                        color: "#FFFFFF",
                        fontSize: "15px",
                        fontWeight: 600,
                        cursor: loading ? "not-allowed" : "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        WebkitBackdropFilter: "blur(12px)",
                        backdropFilter: "blur(12px)",
                        overflow: "hidden",
                        transition: "all 0.3s ease"
                      }}
                    >
                      {/* Inner inset top light shadow */}
                      <div style={{
                        position: "absolute",
                        inset: 0,
                        boxShadow: "inset 0px -16px 30px -14px rgba(255,255,255,0.3)",
                        pointerEvents: "none"
                      }} />
                      {/* Bottom lamp line */}
                      <div style={{
                        position: "absolute",
                        bottom: 0,
                        left: "10%",
                        right: "10%",
                        height: "1px",
                        background: "rgba(141, 199, 99, 0.8)",
                      }} />
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin" size={18} />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <Download size={18} />
                          <span>Download Now</span>
                        </>
                      )}
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

