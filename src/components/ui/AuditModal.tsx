"use client";

import { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Loader2, ClipboardCheck, ChevronDown } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { submitLead } from "@/lib/leadService";
import { useCountryDetection } from "@/lib/country";

const countries = [
  { name: "UAE", code: "+971", flag: "🇦🇪" },
  { name: "USA", code: "+1", flag: "🇺🇸" },
  { name: "UK", code: "+44", flag: "🇬🇧" },
  { name: "India", code: "+91", flag: "🇮🇳" },
  { name: "Saudi Arabia", code: "+966", flag: "🇸🇦" },
  { name: "Qatar", code: "+974", flag: "🇶🇦" },
  { name: "Canada", code: "+1", flag: "🇨🇦" },
  { name: "Australia", code: "+61", flag: "🇦🇺" },
  { name: "Germany", code: "+49", flag: "🇩🇪" },
  { name: "France", code: "+33", flag: "🇫🇷" },
  { name: "Japan", code: "+81", flag: "🇯🇵" },
  { name: "Other", code: "Custom", flag: "🌐" },
];

// ── Design tokens ─────────────────────────────────────────────────────────────
const C = {
  bgOverlay: "rgba(0, 0, 0, 0.4)",
  bgModal: "var(--color-bg-card)",
  bgInput: "var(--color-bg-card-alt)",
  border: "var(--color-border)",
  green: "var(--color-green)",
  greenBright: "var(--color-green)",
  blue: "var(--color-blue-mid)",
  txtBright: "var(--color-text-bright)",
  txtBody: "var(--color-text-body)",
  txtMuted: "var(--color-text-muted)",
};

const labelStyle = {
  display: "block",
  fontSize: "14px",
  fontWeight: 600,
  color: "var(--color-text-body)",
  marginBottom: "8px",
};

const inputStyle = {
  width: "100%",
  background: "var(--color-bg-card-alt)",
  border: "1px solid var(--color-border)",
  borderRadius: "8px",
  padding: "10px 14px",
  fontSize: "14px",
  color: "var(--color-text-bright)",
  outline: "none",
  boxSizing: "border-box" as const,
};

export default function AuditModal({
  isOpen,
  onClose,
  title = "Get a Free Workflow Audit",
  sourceName,
  isSalesPod = false,
}: {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  sourceName?: string;
  isSalesPod?: boolean;
}) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const [form, setForm] = useState({ name: "", phone: "", email: "", company: "", message: "", countryCode: "+91", customCode: "", website: "" });
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useCountryDetection(
    countries,
    useCallback((code: string) => setForm(prev => ({ ...prev, countryCode: code })), []),
    useCallback((code: string) => setForm(prev => ({ ...prev, customCode: code })), [])
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Cooldown verification (15 seconds for contact_sales / audits)
    const lastSubmit = localStorage.getItem("scalepods_cooldown_audit_request");
    if (lastSubmit) {
      const timeDiff = Date.now() - parseInt(lastSubmit, 10);
      if (timeDiff < 15000) {
        setError("Please wait before submitting again.");
        setLoading(false);
        return;
      }
    }

    // Strict Email Verification
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    const dialCode = form.countryCode === "Custom" ? form.customCode : form.countryCode;

    const result = await submitLead({
      formType: "contact_sales",
      sourcePage: window.location.pathname,
      name: form.name,
      email: form.email,
      phone: `${dialCode} ${form.phone}`,
      company: form.company,
      message: isSalesPod
        ? `Requested to Build a Sales Pod from blog post: ${sourceName || "How to Automate Your SDR Workflow with AI"}.\n\nDetails/Pain Points: ${form.message || "None specified."}`
        : `Requested a Sales Workflow Audit from blog post: ${sourceName || "Sales Workflow Complete Guide"}.\n\nDetails/Pain Points: ${form.message || "None specified."}`,
      metadata: { 
        source_type: "blog",
        source_name: sourceName || "Sales Workflow Complete Guide",
        audit_request: !isSalesPod,
        sales_pod_request: isSalesPod
      },
      website: form.website,
    });

    setLoading(false);

    if (!result.success) {
      console.error(result.error);
      setError(result.error || "Something went wrong. Please try again.");
    } else {
      localStorage.setItem("scalepods_cooldown_audit_request", Date.now().toString());
      setSubmitted(true);
      const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
      w.dataLayer = w.dataLayer || [];
      const gtmEvent = { event: "lead_form_success", form_type: "contact_sales", source_page: "audit_modal" };
      console.log("[GTM] lead_form_success →", gtmEvent);
      w.dataLayer.push(gtmEvent);

      // Auto close after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setForm({ name: "", phone: "", email: "", company: "", message: "", countryCode: "+91", customCode: "", website: "" });
        onClose();
      }, 3000);
    }
  }

  if (!mounted) return null;

  return createPortal(
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
              background: C.bgOverlay,
              WebkitBackdropFilter: "blur(8px)",
              backdropFilter: "blur(8px)"
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
              maxWidth: "460px",
              background: "var(--color-bg-card)",
              border: `1px solid var(--color-border)`,
              borderRadius: "16px",
              padding: "24px 32px",
              boxShadow: "0 24px 48px rgba(0,0,0,0.2)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
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
              <div id="lead-form-success" style={{ textAlign: "center", padding: "20px 0" }}>
                <CheckCircle size={48} color="#63A5E7" style={{ margin: "0 auto 16px" }} />
                <h3 style={{ fontSize: "20px", fontWeight: 600, color: C.txtBright, marginBottom: "8px" }}>
                  Request Received!
                </h3>
                <p style={{ color: C.txtBody, fontSize: "14px", lineHeight: 1.5 }}>
                  {isSalesPod
                    ? "We have received your request to build a Sales Pod. Our team will contact you shortly."
                    : "We are analyzing your request. A custom workflow audit will be prepared and sent to your email shortly."}
                </p>
              </div>
            ) : (
              <>
                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                  <div style={{
                    width: "40px", height: "40px", background: "rgba(99, 165, 231, 0.1)",
                    borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 12px"
                  }}>
                    <ClipboardCheck size={20} color="#63A5E7" />
                  </div>
                  <h3 style={{ fontSize: "20px", fontWeight: 600, color: C.txtBright, marginBottom: "4px" }}>
                    {title}
                  </h3>
                  <p style={{ color: C.txtBody, fontSize: "13px" }}>
                    {isSalesPod
                      ? "Submit your details and our team will get in touch to build your custom Sales Pod."
                      : "Submit your details and our team will perform a customized audit on your sales workflow."}
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" }}>
                    <div>
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
                    <div>
                      <label style={labelStyle}>Work Email</label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="alex@company.com"
                        style={inputStyle}
                        required
                      />
                    </div>
                  </div>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" }}>
                    <div>
                      <label style={labelStyle}>Phone Number</label>
                      <div style={{ display: "flex", gap: "8px", position: "relative" }}>
                        <div style={{ position: "relative" }}>
                          <button
                            type="button"
                            onClick={() => setShowCountryPicker(!showCountryPicker)}
                            style={{
                              ...inputStyle,
                              width: "auto",
                              minWidth: "75px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              gap: "4px",
                              cursor: "pointer",
                              padding: "10px 8px",
                            }}
                          >
                            <span style={{ fontSize: "14px" }}>
                              {countries.find(c => c.code === form.countryCode)?.flag || "🌐"}
                            </span>
                            <span style={{ fontSize: "11px", color: C.txtBright }}>
                              {form.countryCode === "Custom" ? "..." : form.countryCode}
                            </span>
                            <ChevronDown size={12} style={{ opacity: 0.5 }} />
                          </button>

                          <AnimatePresence>
                            {showCountryPicker && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                style={{
                                  position: "absolute",
                                  top: "100%",
                                  left: 0,
                                  marginTop: "4px",
                                  background: "var(--color-bg-card)",
                                  border: `1px solid var(--color-border)`,
                                  borderRadius: "10px",
                                  width: "160px",
                                  maxHeight: "150px",
                                  overflowY: "auto",
                                  zIndex: 100,
                                  padding: "4px",
                                  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.5)",
                                  WebkitBackdropFilter: "blur(12px)",
                                  backdropFilter: "blur(12px)",
                                }}
                              >
                                {countries.map((c, idx) => (
                                  <div
                                    key={idx}
                                    onClick={() => {
                                      setForm(prev => ({ ...prev, countryCode: c.code }));
                                      setShowCountryPicker(false);
                                    }}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "8px",
                                      padding: "6px 10px",
                                      borderRadius: "6px",
                                      cursor: "pointer",
                                      background: form.countryCode === c.code ? "rgba(255,255,255,0.05)" : "transparent",
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                                    onMouseLeave={(e) => e.currentTarget.style.background = form.countryCode === c.code ? "rgba(255,255,255,0.05)" : "transparent"}
                                  >
                                    <span style={{ fontSize: "14px" }}>{c.flag}</span>
                                    <span style={{ fontSize: "12px", color: C.txtBright }}>{c.name}</span>
                                  </div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {form.countryCode === "Custom" ? (
                          <input
                            name="customCode"
                            value={form.customCode}
                            onChange={handleChange}
                            placeholder="+91"
                            style={{ ...inputStyle, width: "55px", padding: "10px 6px" }}
                            required
                          />
                        ) : null}

                        <input
                          name="phone"
                          type="tel"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="Contact number"
                          style={{ ...inputStyle, flex: 1, minWidth: 0 }}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label style={labelStyle}>Company Name</label>
                      <input
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Acme Corp"
                        style={inputStyle}
                        required
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: "18px" }}>
                    <label style={labelStyle}>Pain Points / Sales Stack (Optional)</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="e.g. outreach consistency, CRM synchronization..."
                      rows={2}
                      style={{ ...inputStyle, resize: "none", fontFamily: "inherit" }}
                    />
                  </div>

                  {/* Honeypot field (hidden from humans) */}
                  <div style={{ display: "none", position: "absolute", left: "-9999px", top: "-9999px" }} aria-hidden="true">
                    <input
                      type="text"
                      name="website"
                      value={form.website || ""}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Error message — min-height reserved to prevent CTA shift */}
                  <div style={{ minHeight: "36px", marginBottom: "8px" }}>
                    {error && (
                      <p style={{ color: "var(--color-error, #ff6b6b)", fontSize: "13px", margin: 0, textAlign: "center" }}>
                        {error}
                      </p>
                    )}
                  </div>

                  <div style={{ position: "relative", width: "100%" }}>
                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        position: "relative",
                        zIndex: 1,
                        width: "100%",
                        height: "52px",
                        padding: "0 36px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "10px",
                        fontFamily: "var(--font-inter), Inter, sans-serif",
                        fontSize: "15px",
                        fontWeight: 700,
                        letterSpacing: "-0.01em",
                        color: isDark ? "#63A5E7" : "#0f172a",
                        background: isDark
                          ? "linear-gradient(135deg, #050816 0%, #0b1020 100%)"
                          : "linear-gradient(135deg, #63A5E7 0%, #8EC3F7 50%, #B9DBFA 100%)",
                        backdropFilter: isDark ? "blur(12px)" : "none",
                        WebkitBackdropFilter: isDark ? "blur(12px)" : "none",
                        border: isDark 
                          ? "1px solid rgba(99, 165, 231, 0.4)" 
                          : "1px solid rgba(99, 165, 231, 0.3)",
                        borderRadius: "12px",
                        cursor: loading ? "not-allowed" : "pointer",
                        opacity: loading ? 0.75 : 1,
                        boxShadow: isDark 
                          ? "0 8px 24px -4px rgba(0, 0, 0, 0.6), 0 0 15px rgba(99, 165, 231, 0.15)" 
                          : "0 10px 20px -5px rgba(99, 165, 231, 0.25), inset 0 1px 0 rgba(255,255,255,0.4)",
                        justifyContent: "center",
                        whiteSpace: "nowrap",
                        transition: "opacity 0.2s ease, box-shadow 0.3s ease",
                      }}
                    >
                      {loading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          style={{ display: "flex", alignItems: "center", flexShrink: 0 }}
                        >
                          <Loader2 size={16} />
                        </motion.div>
                      ) : null}
                      <span style={{ position: "relative", zIndex: 2 }}>
                        {loading ? "Submitting…" : (isSalesPod ? "Build My Sales Pod" : "Request Free Audit")}
                      </span>
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
      </AnimatePresence>,
      document.body
  );
}
