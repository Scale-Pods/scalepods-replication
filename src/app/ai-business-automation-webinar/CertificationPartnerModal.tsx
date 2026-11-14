"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Award,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  ExternalLink,
  Cpu,
  Lock,
  Layers,
  Sparkles,
} from "lucide-react";

export type PartnerTab = "openai" | "claude";

interface CertificationPartnerModalProps {
  isOpen: boolean;
  initialPartner?: PartnerTab;
  onClose: () => void;
  onReserveSeat: () => void;
}

export function CertificationPartnerModal({
  isOpen,
  initialPartner = "openai",
  onClose,
  onReserveSeat,
}: CertificationPartnerModalProps) {
  const [activeTab, setActiveTab] = useState<PartnerTab>(initialPartner);

  // Sync tab with initial partner when modal opens
  useEffect(() => {
    if (isOpen && initialPartner) {
      setActiveTab(initialPartner);
    }
  }, [isOpen, initialPartner]);

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="wb-partner-modal-backdrop"
          className="wb-partner-modal-backdrop"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="wb-partner-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Centric Glassmorphic Card */}
          <motion.div
            key="wb-partner-glass-card"
            className="wb-partner-glass-card"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Ambient Background Decorative Glow Orbs */}
            <div className="wb-partner-modal-glow wb-partner-glow-left" aria-hidden="true" />
            <div className="wb-partner-modal-glow wb-partner-glow-right" aria-hidden="true" />

            {/* Top Bar with Badge and Close Button */}
            <div className="wb-partner-modal-topbar">
              <div className="wb-partner-modal-eyebrow">
                <Award size={13} className="text-emerald-600" />
                <span>OFFICIAL PARTNER CERTIFICATION</span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="wb-partner-modal-close"
                aria-label="Close certification details"
              >
                <X size={18} />
              </button>
            </div>

            {/* Main Heading & Intro */}
            <div className="wb-partner-modal-header">
              <h2 id="wb-partner-modal-title" className="wb-partner-modal-title">
                Enterprise AI Partner Frameworks
              </h2>
              <p className="wb-partner-modal-desc">
                ScalePods automations are architected and verified directly against production standards from{" "}
                <strong>OpenAI</strong> and <strong>Anthropic Claude</strong>. Masterclass attendees receive verifiable
                framework certification upon completion.
              </p>
            </div>

            {/* Interactive Partner Switcher Tabs */}
            <div className="wb-partner-tabs-wrap" role="tablist" aria-label="Partner frameworks">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "openai"}
                onClick={() => setActiveTab("openai")}
                className={`wb-partner-tab-btn wb-partner-tab-openai ${
                  activeTab === "openai" ? "wb-partner-tab-active" : ""
                }`}
              >
                <svg viewBox="0 0 24 24" className="wb-openai-tab-svg" fill="currentColor">
                  <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1683a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4947zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1683a.0757.0757 0 0 1-.071 0l-4.8303-2.7866A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1635a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
                </svg>
                <span>OpenAI Framework</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "claude"}
                onClick={() => setActiveTab("claude")}
                className={`wb-partner-tab-btn wb-partner-tab-claude ${
                  activeTab === "claude" ? "wb-partner-tab-active" : ""
                }`}
              >
                <svg viewBox="0 0 24 24" className="wb-claude-tab-svg" fill="currentColor">
                  <path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z" />
                </svg>
                <span>Claude Framework</span>
              </button>
            </div>

            {/* Tab Panel Content */}
            <div className="wb-partner-panel-content">
              {activeTab === "openai" ? (
                <motion.div
                  key="openai"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.22 }}
                  className="wb-partner-details-block"
                >
                  <div className="wb-partner-brand-strip wb-strip-openai">
                    <div className="wb-partner-badge-icon wb-icon-openai">
                      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1683a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4947zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1683a.0757.0757 0 0 1-.071 0l-4.8303-2.7866A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1635a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
                      </svg>
                    </div>
                    <div className="wb-partner-brand-meta">
                      <span className="wb-partner-brand-heading">OpenAI Partner Framework</span>
                      <span className="wb-partner-brand-sub">GPT-4o • Function Calling • Realtime API</span>
                    </div>
                    <span className="wb-partner-status-pill">
                      <ShieldCheck size={13} />
                      <span>Verified Curriculum</span>
                    </span>
                  </div>

                  <p className="wb-partner-overview-text">
                    Learn how ScalePods connects OpenAI&apos;s state-of-the-art models directly to business operations,
                    enabling self-operating workflows that execute tasks across sales, customer support, and administrative data.
                  </p>

                  <div className="wb-partner-features-grid">
                    <div className="wb-partner-feature-box">
                      <div className="wb-feature-box-title">
                        <Zap size={14} className="text-sky-600" />
                        <span>Autonomous Function Calling</span>
                      </div>
                      <p className="wb-feature-box-desc">
                        Trigger live CRM database lookups, instant WhatsApp lead updates, and structured invoice extractions.
                      </p>
                    </div>

                    <div className="wb-partner-feature-box">
                      <div className="wb-feature-box-title">
                        <Cpu size={14} className="text-sky-600" />
                        <span>Assistants API & Vector Stores</span>
                      </div>
                      <p className="wb-feature-box-desc">
                        Deploy verified RAG knowledge pipelines over private company SOPs with guaranteed zero data training on customer inputs.
                      </p>
                    </div>

                    <div className="wb-partner-feature-box">
                      <div className="wb-feature-box-title">
                        <Layers size={14} className="text-sky-600" />
                        <span>Multi-Agent Task Orchestration</span>
                      </div>
                      <p className="wb-feature-box-desc">
                        Connect specialized sub-agents that handle inbound qualification, automated follow-up sequences, and operations reports.
                      </p>
                    </div>

                    <div className="wb-partner-feature-box">
                      <div className="wb-feature-box-title">
                        <Lock size={14} className="text-sky-600" />
                        <span>Enterprise SOC2 / Privacy Guardrails</span>
                      </div>
                      <p className="wb-feature-box-desc">
                        Strict deterministic JSON outputs, hallucination boundaries, and resilient automated rate-limit fallbacks.
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="claude"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.22 }}
                  className="wb-partner-details-block"
                >
                  <div className="wb-partner-brand-strip wb-strip-claude">
                    <div className="wb-partner-badge-icon wb-icon-claude">
                      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                        <path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z" />
                      </svg>
                    </div>
                    <div className="wb-partner-brand-meta">
                      <span className="wb-partner-brand-heading">Claude (Anthropic) Framework</span>
                      <span className="wb-partner-brand-sub">Claude 3.5 Sonnet • Computer Use • 200K Context</span>
                    </div>
                    <span className="wb-partner-status-pill wb-pill-claude">
                      <ShieldCheck size={13} />
                      <span>Certified Architecture</span>
                    </span>
                  </div>

                  <p className="wb-partner-overview-text">
                    Discover how ScalePods applies Anthropic&apos;s Claude 3.5 Sonnet to solve deep reasoning tasks across massive context
                    windows, autonomous browser tools, and rigorous compliance checks.
                  </p>

                  <div className="wb-partner-features-grid">
                    <div className="wb-partner-feature-box">
                      <div className="wb-feature-box-title">
                        <Sparkles size={14} className="text-orange-600" />
                        <span>200K Context Window Processing</span>
                      </div>
                      <p className="wb-feature-box-desc">
                        Analyze lengthy vendor contracts, multi-page financial ledgers, and complex hiring resumes with pin-point accuracy.
                      </p>
                    </div>

                    <div className="wb-partner-feature-box">
                      <div className="wb-feature-box-title">
                        <Cpu size={14} className="text-orange-600" />
                        <span>Computer Use & Tool Execution</span>
                      </div>
                      <p className="wb-feature-box-desc">
                        Direct automated navigation through desktop interfaces, legacy software windows, and internal enterprise dashboards.
                      </p>
                    </div>

                    <div className="wb-partner-feature-box">
                      <div className="wb-feature-box-title">
                        <Zap size={14} className="text-orange-600" />
                        <span>Prompt Caching Cost Reductions</span>
                      </div>
                      <p className="wb-feature-box-desc">
                        Slash enterprise operational token costs by up to 90% and cut pipeline response latencies by over 80%.
                      </p>
                    </div>

                    <div className="wb-partner-feature-box">
                      <div className="wb-feature-box-title">
                        <ShieldCheck size={14} className="text-orange-600" />
                        <span>Constitutional AI & Safety</span>
                      </div>
                      <p className="wb-feature-box-desc">
                        Steerable decision trees designed with safety-first guardrails to prevent unauthorized data exposure.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Certification Deliverables Summary Strip */}
            <div className="wb-partner-perks-strip">
              <div className="wb-partner-perk-item">
                <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                <span>Verifiable Partner Certificate for LinkedIn &amp; Resume</span>
              </div>
              <div className="wb-partner-perk-item">
                <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                <span>Pre-Built n8n &amp; Make Workflow Blueprints (.json)</span>
              </div>
              <div className="wb-partner-perk-item">
                <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                <span>Live Q&amp;A Architecture Review with Founders</span>
              </div>
            </div>

            {/* Action Footer */}
            <div className="wb-partner-modal-footer">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onReserveSeat();
                }}
                className="wb-partner-modal-cta"
              >
                <span>RESERVE SEAT &amp; GET CERTIFIED FOR ₹99</span>
                <ArrowRight size={17} />
              </button>

              <div className="wb-partner-footer-note">
                <span>⚡ Limited Live Cohort • 12–13 Dec (2–3 PM IST) • ₹99 Only</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
