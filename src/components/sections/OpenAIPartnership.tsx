"use client";

import React from "react";
import { Shield, Award, Layers, BarChart3, Lock } from "lucide-react";

export default function OpenAIPartnership() {
  const handleCTAClick = () => {
    window.open("https://calendar.app.google/DhM4emV5aoPSqpDt8", "_blank");
  };

  return (
    <section id="openai-partnership" className="openai-partnership-section">
      <style>{`
        .openai-partnership-section {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto 60px auto;
          padding: 0 24px;
          font-family: var(--font-sans), sans-serif;
          position: relative;
          z-index: 1;
        }

        .openai-main-card {
          background: var(--color-glass-bg);
          border: 1px solid var(--color-glass-border);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-radius: 28px;
          padding: 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 48px;
          box-shadow: var(--card-shadow), var(--card-shadow-inset);
          position: relative;
          overflow: hidden;
        }

        /* Ambient subtle emerald glow behind the card */
        .openai-main-card::before {
          content: "";
          position: absolute;
          top: -20%;
          right: -10%;
          width: 320px;
          height: 320px;
          background: radial-gradient(circle, rgba(16, 163, 127, 0.09) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .openai-content-left {
          flex: 1;
          z-index: 1;
        }

        .openai-heading {
          font-size: clamp(28px, 3.2vw, 42px);
          font-weight: 700;
          line-height: 1.2;
          color: var(--color-text-bright);
          margin-bottom: 20px;
          letter-spacing: -0.02em;
        }

        .openai-heading .highlight-blue {
          color: var(--color-blue-mid, #6DB6FF);
        }

        .openai-heading .highlight-green {
          color: #10A37F;
        }

        .openai-subheading {
          font-size: 16px;
          line-height: 1.6;
          color: var(--color-text-body);
          margin-bottom: 32px;
          max-width: 600px;
        }

        .openai-cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          height: 44px;
          padding: 0 28px;
          border-radius: 10px;
          font-family: var(--font-sans), sans-serif;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          cursor: pointer;
          box-sizing: border-box;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          width: fit-content;
          min-width: 250px;

          /* Default Dark Mode: Deep obsidian with vibrant emerald border & glow */
          background: linear-gradient(135deg, #050d0a 0%, #0b1814 100%);
          color: #10A37F;
          border: 1px solid rgba(16, 163, 127, 0.45);
          box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.6), 0 0 16px rgba(16, 163, 127, 0.18);
        }

        .openai-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px -4px rgba(0, 0, 0, 0.6), 0 0 22px rgba(16, 163, 127, 0.35);
          border-color: rgba(16, 163, 127, 0.7);
          color: #2edba6;
        }

        .openai-cta-btn:active {
          transform: translateY(0);
        }

        /* Light Theme Adaptive Styling */
        [data-theme="light"] .openai-cta-btn {
          background: linear-gradient(135deg, #10A37F 0%, #0d8a6b 100%);
          color: #ffffff;
          border: 1px solid rgba(16, 163, 127, 0.3);
          box-shadow: 0 10px 20px -5px rgba(16, 163, 127, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        [data-theme="light"] .openai-cta-btn:hover {
          background: linear-gradient(135deg, #13b38c 0%, #0fa07c 100%);
          box-shadow: 0 12px 25px -4px rgba(16, 163, 127, 0.4);
          color: #ffffff;
        }

        /* Right Badge Card styling */
        .openai-badge-container {
          flex-shrink: 0;
          z-index: 1;
        }

        .openai-badge-card {
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          border-radius: 24px;
          padding: 38px 46px;
          display: flex;
          align-items: center;
          gap: 40px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3), 0 0 30px rgba(16, 163, 127, 0.05);
          max-width: 540px;
          min-height: 180px;
        }

        .openai-badge-left {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .openai-symbol {
          color: #10A37F;
          width: 52px;
          height: 52px;
          filter: drop-shadow(0 2px 8px rgba(16, 163, 127, 0.2));
        }

        .openai-wordmark {
          font-family: var(--font-sans), system-ui, -apple-system, sans-serif;
          font-size: 24px;
          font-weight: 700;
          color: var(--color-text-bright);
          line-height: 1;
          letter-spacing: -0.02em;
        }

        .openai-badge-divider {
          width: 1px;
          height: 100px;
          background: var(--color-border-faint);
        }

        .openai-badge-right {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .openai-badge-partner {
          color: #10A37F;
          font-weight: 700;
          font-size: 22px;
          letter-spacing: 0.02em;
        }

        .openai-badge-track {
          color: var(--color-text-body);
          font-size: 15px;
          line-height: 1.45;
          font-weight: 500;
          max-width: 220px;
        }

        /* Pillars styling */
        .openai-pillars-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-top: 36px;
          background: rgba(var(--color-text-bright-rgb, 228, 233, 242), 0.01);
          border: 1px solid var(--color-border-faint);
          border-radius: 24px;
          padding: 32px;
        }

        .openai-pillar-item {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .openai-pillar-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .openai-pillar-icon-wrapper {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(16, 163, 127, 0.08);
          border: 1px solid rgba(16, 163, 127, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #10A37F;
          flex-shrink: 0;
        }

        .openai-pillar-title {
          font-size: 15px;
          font-weight: 600;
          color: var(--color-text-bright);
        }

        .openai-pillar-desc {
          font-size: 13px;
          line-height: 1.5;
          color: var(--color-text-body);
          opacity: 0.85;
        }

        /* Legal disclaimer */
        .openai-disclaimer {
          display: block;
          font-size: 13px;
          color: var(--color-text-muted);
          margin-top: 16px;
          text-align: center;
          padding: 0 16px;
          line-height: 1.5;
        }

        .openai-disclaimer-lock-icon {
          display: inline-block;
          vertical-align: -2px;
          margin-right: 6px;
          color: var(--color-text-muted);
        }

        /* Responsive Breakpoints */
        @media (max-width: 968px) {
          .openai-main-card {
            flex-direction: column;
            align-items: stretch;
            padding: 36px;
            gap: 36px;
          }
          
          .openai-badge-container {
            align-self: center;
            width: 100%;
            max-width: 540px;
          }

          .openai-badge-card {
            max-width: 100%;
          }

          .openai-pillars-grid {
            grid-template-columns: repeat(2, 1fr);
            padding: 24px;
            margin-top: 28px;
          }
        }

        @media (max-width: 568px) {
          .openai-partnership-section {
            margin: 0 auto 36px auto;
          }

          .openai-main-card {
            padding: 24px;
            gap: 24px;
          }

          .openai-badge-card {
            padding: 24px 28px;
            gap: 28px;
            min-height: auto;
          }

          .openai-wordmark {
            font-size: 20px;
          }

          .openai-symbol {
            width: 44px;
            height: 44px;
          }

          .openai-badge-divider {
            height: 80px;
          }

          .openai-badge-partner {
            font-size: 18px;
          }

          .openai-badge-track {
            font-size: 13.5px;
          }

          .openai-pillars-grid {
            grid-template-columns: 1fr;
            padding: 20px;
            gap: 20px;
            margin-top: 20px;
          }

          .openai-heading {
            font-size: 24px;
          }

          .openai-subheading {
            font-size: 14.5px;
            margin-bottom: 24px;
          }

          .openai-cta-btn {
            width: 100%;
            justify-content: center;
          }

          .openai-disclaimer {
            font-size: 12px;
            margin-top: 12px;
          }
        }
      `}</style>

      {/* Main Partnership Card */}
      <div className="openai-main-card">
        <div className="openai-content-left">
          <h2 className="openai-heading">
            ScalePods is now a <br />
            <span className="highlight-blue">Partner</span> in the <br />
            <span className="highlight-green">OpenAI Partner Network Services Track.</span>
          </h2>
          <p className="openai-subheading">
            We work with OpenAI to help organizations design, deploy, and scale intelligent workflows, combining AI workflow automation with secure implementation to automate operations and accelerate growth.
          </p>
          <button className="openai-cta-btn" onClick={handleCTAClick}>
            <span>Book an OpenAI Strategy Session</span>
            <span style={{ fontSize: "12px", fontWeight: 700 }}>→</span>
          </button>
        </div>

        {/* Right Partner Badge */}
        <div className="openai-badge-container">
          <div className="openai-badge-card">
            <div className="openai-badge-left">
              {/* Official OpenAI Spiral Logo Symbol */}
              <svg 
                viewBox="0 0 24 24" 
                className="openai-symbol" 
                fill="currentColor"
              >
                <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1683a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4947zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1683a.0757.0757 0 0 1-.071 0l-4.8303-2.7866A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1635a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
              </svg>
              <div className="openai-wordmark">OpenAI</div>
            </div>
            
            <div className="openai-badge-divider"></div>
            
            <div className="openai-badge-right">
              <div className="openai-badge-partner">Partner</div>
              <div className="openai-badge-track">OpenAI Partner Network Services Track</div>
            </div>
          </div>
        </div>
      </div>

      {/* Pillars Grid */}
      <div className="openai-pillars-grid">
        {/* Pillar 1 */}
        <div className="openai-pillar-item">
          <div className="openai-pillar-header">
            <div className="openai-pillar-icon-wrapper">
              <Shield size={18} />
            </div>
            <h4 className="openai-pillar-title">Built for Enterprise</h4>
          </div>
          <p className="openai-pillar-desc">
            Secure, scalable, and compliant AI solutions built for complex business environments.
          </p>
        </div>

        {/* Pillar 2 */}
        <div className="openai-pillar-item">
          <div className="openai-pillar-header">
            <div className="openai-pillar-icon-wrapper">
              <Award size={18} />
            </div>
            <h4 className="openai-pillar-title">Certified OpenAI Expertise</h4>
          </div>
          <p className="openai-pillar-desc">
            Our team is certified to deliver OpenAI solutions with proven methodologies and best practices.
          </p>
        </div>

        {/* Pillar 3 */}
        <div className="openai-pillar-item">
          <div className="openai-pillar-header">
            <div className="openai-pillar-icon-wrapper">
              <Layers size={18} />
            </div>
            <h4 className="openai-pillar-title">End-to-End Implementation</h4>
          </div>
          <p className="openai-pillar-desc">
            From strategy and workflow design to deployment and optimization, our team manages the implementation end to end.
          </p>
        </div>

        {/* Pillar 4 */}
        <div className="openai-pillar-item">
          <div className="openai-pillar-header">
            <div className="openai-pillar-icon-wrapper">
              <BarChart3 size={18} />
            </div>
            <h4 className="openai-pillar-title">Measurable Impact</h4>
          </div>
          <p className="openai-pillar-desc">
            We focus on outcomes that matter: efficiency, productivity, and business growth through scalable automation.
          </p>
        </div>
      </div>

      {/* Legal disclaimer */}
      <div className="openai-disclaimer">
        <span>
          <Lock size={13} className="openai-disclaimer-lock-icon" />
          OpenAI Partner Network participation recognizes our capabilities in delivering OpenAI-powered solutions. It does not constitute endorsement of individual customer implementations.
        </span>
      </div>
    </section>
  );
}
