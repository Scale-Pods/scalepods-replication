"use client";

import { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Loader2, Briefcase, ChevronDown, Link as LinkIcon } from "lucide-react";
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

const roles = [
  "AI Engineer",
  "Growth Lead",
  "Product Designer",
  "Automation Specialist",
  "Other / General Application"
];

// Design tokens matching other modals
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
  fontSize: "13px",
  fontWeight: 600,
  color: "var(--color-text-body)",
  marginBottom: "4px",
};

const inputStyle = {
  width: "100%",
  background: "var(--color-bg-card-alt)",
  border: "1px solid var(--color-border)",
  borderRadius: "8px",
  padding: "8px 12px",
  fontSize: "13px",
  color: "var(--color-text-bright)",
  outline: "none",
  boxSizing: "border-box" as const,
  transition: "all 0.2s",
};

export default function ApplyModal({
  isOpen,
  onClose,
  title = "Apply to ScalePods",
}: {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    role: "",
    resumeLink: "",
    message: "",
    countryCode: "+91",
    customCode: "",
    website: "", // Honeypot
  });

  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [showRolePicker, setShowRolePicker] = useState(false);
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

    // Cooldown verification (15 seconds)
    const lastSubmit = localStorage.getItem("scalepods_cooldown_job_application");
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

    // Role selection verification
    if (!form.role) {
      setError("Please select a role of interest.");
      setLoading(false);
      return;
    }

    // Resume URL verification
    if (form.resumeLink) {
      try {
        new URL(form.resumeLink);
      } catch (_) {
        setError("Please enter a valid URL for your resume/portfolio.");
        setLoading(false);
        return;
      }
    }

    const dialCode = form.countryCode === "Custom" ? form.customCode : form.countryCode;

    const result = await submitLead({
      formType: "job_application",
      sourcePage: window.location.pathname,
      name: form.name,
      email: form.email,
      phone: `${dialCode} ${form.phone}`,
      message: `Role Applied: ${form.role}\nResume Link: ${form.resumeLink || "Not specified."}\n\nIntroduction/Cover Letter: ${form.message || "None specified."}`,
      metadata: {
        appliedRole: form.role,
        resumeLink: form.resumeLink,
        source: "careers_modal"
      },
      website: form.website,
    });

    setLoading(false);

    if (!result.success) {
      console.error(result.error);
      setError(result.error || "Something went wrong. Please try again.");
    } else {
      localStorage.setItem("scalepods_cooldown_job_application", Date.now().toString());
      setSubmitted(true);
      
      const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
      w.dataLayer = w.dataLayer || [];
      const gtmEvent = { event: "lead_form_success", event_id: result.eventId, form_type: "job_application", source_page: "careers_modal" };
      console.log("[GTM] lead_form_success →", gtmEvent);
      w.dataLayer.push(gtmEvent);

      // Auto close after 3.5 seconds
      setTimeout(() => {
        setSubmitted(false);
        setForm({
          name: "",
          phone: "",
          email: "",
          role: "",
          resumeLink: "",
          message: "",
          countryCode: "+91",
          customCode: "",
          website: "",
        });
        onClose();
      }, 3500);
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
              maxWidth: "600px",
              background: "var(--color-bg-card)",
              border: `1px solid var(--color-border)`,
              borderRadius: "16px",
              padding: "16px 28px",
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
                <CheckCircle size={48} color="#ACD791" style={{ margin: "0 auto 16px" }} />
                <h3 style={{ fontSize: "20px", fontWeight: 600, color: C.txtBright, marginBottom: "8px" }}>
                  Application Received!
                </h3>
                <p style={{ color: C.txtBody, fontSize: "14px", lineHeight: 1.5 }}>
                  Thank you for applying to ScalePods. We have received your application. Our team will review your profile and contact you shortly.
                </p>
              </div>
            ) : (
              <>
                <div style={{ textAlign: "center", marginBottom: "12px" }}>
                  <div style={{
                    width: "36px", height: "36px", background: "rgba(172, 215, 145, 0.1)",
                    borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 8px"
                  }}>
                    <Briefcase size={18} color="#ACD791" />
                  </div>
                  <h3 style={{ fontSize: "18px", fontWeight: 600, color: C.txtBright, marginBottom: "2px" }}>
                    {title}
                  </h3>
                  <p style={{ color: C.txtBody, fontSize: "12px" }}>
                    Join our fast-growing team. Submit your details below to apply.
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Full Name & Email */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "8px" }}>
                    <div>
                      <label style={labelStyle}>Full Name</label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Alex Chen"
                        style={inputStyle}
                        required
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Email Address</label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="alex@example.com"
                        style={inputStyle}
                        required
                      />
                    </div>
                  </div>

                  {/* Phone Number & Role */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "8px" }}>
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
                              padding: "8px",
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
                          placeholder="Contact"
                          style={{ ...inputStyle, flex: 1, minWidth: 0 }}
                          required
                        />
                      </div>
                    </div>

                    {/* Role Picker */}
                    <div>
                      <label style={labelStyle}>Role of Interest</label>
                      <div style={{ position: "relative" }}>
                        <button
                          type="button"
                          onClick={() => setShowRolePicker(!showRolePicker)}
                          style={{
                            ...inputStyle,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            cursor: "pointer",
                            background: "var(--color-bg-card-alt)",
                            borderColor: "var(--color-border)",
                            color: form.role ? "var(--color-text-bright)" : "var(--color-text-muted)"
                          }}
                        >
                          <span style={{ fontSize: "13px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {form.role || "Select a role"}
                          </span>
                          <ChevronDown size={14} style={{ opacity: 0.5 }} />
                        </button>

                        <AnimatePresence>
                          {showRolePicker && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              style={{
                                position: "absolute",
                                top: "100%",
                                left: 0,
                                right: 0,
                                marginTop: "4px",
                                background: "var(--color-bg-card)",
                                border: `1px solid var(--color-border)`,
                                borderRadius: "10px",
                                maxHeight: "180px",
                                overflowY: "auto",
                                zIndex: 100,
                                padding: "4px",
                                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.5)",
                                WebkitBackdropFilter: "blur(12px)",
                                backdropFilter: "blur(12px)",
                              }}
                            >
                              {roles.map((role, idx) => (
                                <div
                                  key={idx}
                                  onClick={() => {
                                    setForm(prev => ({ ...prev, role }));
                                    setShowRolePicker(false);
                                  }}
                                  style={{
                                    padding: "8px 12px",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    fontSize: "12px",
                                    color: form.role === role ? C.txtBright : C.txtBody,
                                    background: form.role === role ? "rgba(255,255,255,0.05)" : "transparent",
                                    transition: "background 0.2s",
                                  }}
                                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                                  onMouseLeave={(e) => e.currentTarget.style.background = form.role === role ? "rgba(255,255,255,0.05)" : "transparent"}
                                >
                                  {role}
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>

                  {/* Resume / Portfolio Link */}
                  <div style={{ marginBottom: "8px" }}>
                    <label style={labelStyle}>Resume / Portfolio Link</label>
                    <div style={{ position: "relative" }}>
                      <input
                        name="resumeLink"
                        type="url"
                        value={form.resumeLink}
                        onChange={handleChange}
                        placeholder="https://drive.google.com/... or https://portfolio.com"
                        style={{ ...inputStyle, paddingLeft: "36px" }}
                        required
                      />
                      <LinkIcon size={14} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: C.txtMuted }} />
                    </div>
                  </div>

                  {/* Introduction / Message */}
                  <div style={{ marginBottom: "10px" }}>
                    <label style={labelStyle}>Introduce Yourself (Optional)</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your experience and why you want to join ScalePods..."
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

                  {/* Error message */}
                  {error && (
                    <div style={{ marginBottom: "10px", textAlign: "center" }}>
                      <p style={{ color: "var(--color-error, #ff6b6b)", fontSize: "13px", margin: 0 }}>
                        {error}
                      </p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div style={{ position: "relative", width: "100%" }}>
                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        position: "relative",
                        zIndex: 1,
                        width: "100%",
                        height: "44px",
                        padding: "0 36px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "10px",
                        fontFamily: "var(--font-inter), Inter, sans-serif",
                        fontSize: "15px",
                        fontWeight: 700,
                        letterSpacing: "-0.01em",
                        color: isDark ? "#ACD791" : "#0f172a",
                        background: isDark
                          ? "linear-gradient(135deg, #050816 0%, #0b1020 100%)"
                          : "linear-gradient(135deg, #B1D997 0%, #C5E4B2 50%, #D8EFCC 100%)",
                        backdropFilter: isDark ? "blur(12px)" : "none",
                        WebkitBackdropFilter: isDark ? "blur(12px)" : "none",
                        border: isDark 
                          ? "1px solid rgba(172, 215, 145, 0.4)" 
                          : "1px solid rgba(172, 215, 145, 0.3)",
                        borderRadius: "12px",
                        cursor: loading ? "not-allowed" : "pointer",
                        opacity: loading ? 0.75 : 1,
                        boxShadow: isDark 
                          ? "0 8px 24px -4px rgba(0, 0, 0, 0.6), 0 0 15px rgba(172, 215, 145, 0.15)" 
                          : "0 10px 20px -5px rgba(172, 215, 145, 0.25), inset 0 1px 0 rgba(255,255,255,0.4)",
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
                        {loading ? "Submitting Application…" : "Submit Application"}
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
