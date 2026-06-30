"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Users, Layers, BarChart3, Lock } from "lucide-react";

export default function ClaudePartnership() {
  const handleCTAClick = () => {
    window.open("https://calendar.app.google/DhM4emV5aoPSqpDt8", "_blank");
  };

  return (
    <section className="claude-partnership-section">
      <style>{`
        .claude-partnership-section {
          width: 100%;
          max-width: 1200px;
          margin: 40px auto 80px auto;
          padding: 0 24px;
          font-family: var(--font-sans), sans-serif;
          position: relative;
          z-index: 1;
        }

        .claude-main-card {
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

        /* Ambient subtle glow behind the card */
        .claude-main-card::before {
          content: "";
          position: absolute;
          top: -20%;
          right: -10%;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(204, 107, 73, 0.08) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .claude-content-left {
          flex: 1;
          z-index: 1;
        }

        .claude-heading {
          font-size: clamp(28px, 3.2vw, 42px);
          font-weight: 700;
          line-height: 1.2;
          color: var(--color-text-bright);
          margin-bottom: 20px;
          letter-spacing: -0.02em;
        }

        .claude-heading .highlight-blue {
          color: #3B82F6;
        }

        .claude-heading .highlight-orange {
          color: #CC6B49;
        }

        .claude-subheading {
          font-size: 16px;
          line-height: 1.6;
          color: var(--color-text-body);
          margin-bottom: 32px;
          max-width: 600px;
        }

        .claude-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #006ADC;
          color: #FFFFFF;
          font-weight: 600;
          font-size: 15px;
          padding: 14px 28px;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          box-shadow: 0 10px 20px rgba(0, 106, 220, 0.2);
          transition: all 0.25s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .claude-cta-btn:hover {
          background: #0080FF;
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(0, 128, 255, 0.3);
        }

        /* Right Badge Card styling */
        .claude-badge-container {
          flex-shrink: 0;
          z-index: 1;
        }

        .claude-badge-card {
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          border-radius: 20px;
          padding: 28px 36px;
          display: flex;
          align-items: center;
          gap: 28px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
          max-width: 440px;
        }

        .claude-badge-left {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }

        .anthropic-symbol {
          color: #CC6B49;
          width: 38px;
          height: 38px;
        }

        .claude-wordmark {
          font-family: var(--font-serif), Georgia, serif;
          font-size: 26px;
          font-weight: 500;
          color: var(--color-text-bright);
          line-height: 1;
        }

        .claude-by-anthropic {
          font-size: 8.5px;
          font-weight: 700;
          color: var(--color-text-faint);
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .claude-badge-divider {
          width: 1px;
          height: 70px;
          background: var(--color-border-faint);
        }

        .claude-badge-right {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .badge-select-partner {
          color: #CC6B49;
          font-weight: 700;
          font-size: 18px;
          letter-spacing: 0.02em;
        }

        .badge-network-track {
          color: var(--color-text-body);
          font-size: 13.5px;
          line-height: 1.4;
          font-weight: 500;
          max-width: 180px;
        }

        /* Pillars styling */
        .claude-pillars-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-top: 48px;
          background: rgba(var(--color-text-bright-rgb), 0.01);
          border: 1px solid var(--color-border-faint);
          border-radius: 24px;
          padding: 32px;
        }

        .claude-pillar-item {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .pillar-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .pillar-icon-wrapper {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(109, 182, 255, 0.05);
          border: 1px solid rgba(109, 182, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-blue-mid);
        }

        .pillar-title {
          font-size: 15px;
          font-weight: 600;
          color: var(--color-text-bright);
        }

        .pillar-desc {
          font-size: 13px;
          line-height: 1.5;
          color: var(--color-text-body);
          opacity: 0.85;
        }

        /* Legal disclaimer */
        .claude-disclaimer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 11px;
          color: var(--color-text-faint);
          margin-top: 24px;
          text-align: center;
          padding: 0 16px;
        }

        /* Responsive Breakpoints */
        @media (max-width: 968px) {
          .claude-main-card {
            flex-direction: column;
            align-items: stretch;
            padding: 36px;
            gap: 36px;
          }
          
          .claude-badge-container {
            align-self: center;
            width: 100%;
            max-width: 440px;
          }

          .claude-badge-card {
            max-width: 100%;
          }

          .claude-pillars-grid {
            grid-template-columns: repeat(2, 1fr);
            padding: 24px;
          }
        }

        @media (max-width: 568px) {
          .claude-partnership-section {
            margin: 24px auto 48px auto;
          }

          .claude-main-card {
            padding: 24px;
            gap: 28px;
          }

          .claude-badge-card {
            padding: 20px 24px;
            gap: 20px;
          }

          .claude-wordmark {
            font-size: 22px;
          }

          .badge-select-partner {
            font-size: 16px;
          }

          .badge-network-track {
            font-size: 12.5px;
          }

          .claude-pillars-grid {
            grid-template-columns: 1fr;
            padding: 20px;
            gap: 20px;
          }

          .claude-heading {
            font-size: 24px;
          }

          .claude-subheading {
            font-size: 14.5px;
            margin-bottom: 24px;
          }

          .claude-cta-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      {/* Main Partnership Card */}
      <div className="claude-main-card">
        <div className="claude-content-left">
          <h2 className="claude-heading">
            ScalePods is now a <br />
            <span className="highlight-blue">Select Partner</span> in the <br />
            <span className="highlight-orange">Claude Partner Network Services Track.</span>
          </h2>
          <p className="claude-subheading">
            We work with Claude to help organizations design, deploy, and scale intelligent workflows that automate operations and accelerate growth.
          </p>
          <button className="claude-cta-btn" onClick={handleCTAClick}>
            <span>Book a Claude Strategy Session</span>
            <span style={{ fontSize: "12px", fontWeight: 700 }}>→</span>
          </button>
        </div>

        {/* Right Partner Badge */}
        <div className="claude-badge-container">
          <div className="claude-badge-card">
            <div className="claude-badge-left">
              {/* Anthropic Sunburst Logo Symbol */}
              <svg 
                viewBox="0 0 24 24" 
                className="anthropic-symbol" 
                fill="currentColor"
              >
                <path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z" />
              </svg>
              <div className="claude-wordmark">Claude</div>
              <div className="claude-by-anthropic">By Anthropic</div>
            </div>
            
            <div className="claude-badge-divider"></div>
            
            <div className="claude-badge-right">
              <div className="badge-select-partner">Select Partner</div>
              <div className="badge-network-track">Claude Partner Network Services Track</div>
            </div>
          </div>
        </div>
      </div>

      {/* Pillars Grid */}
      <div className="claude-pillars-grid">
        {/* Pillar 1 */}
        <div className="claude-pillar-item">
          <div className="pillar-header">
            <div className="pillar-icon-wrapper">
              <Shield size={18} />
            </div>
            <h4 className="pillar-title">Built for Enterprise</h4>
          </div>
          <p className="pillar-desc">
            Secure, scalable, and compliant AI solutions built for complex business environments.
          </p>
        </div>

        {/* Pillar 2 */}
        <div className="claude-pillar-item">
          <div className="pillar-header">
            <div className="pillar-icon-wrapper">
              <Users size={18} />
            </div>
            <h4 className="pillar-title">Certified Claude Expertise</h4>
          </div>
          <p className="pillar-desc">
            Our team is certified to deliver Claude solutions with proven methodologies and best practices.
          </p>
        </div>

        {/* Pillar 3 */}
        <div className="claude-pillar-item">
          <div className="pillar-header">
            <div className="pillar-icon-wrapper">
              <Layers size={18} />
            </div>
            <h4 className="pillar-title">End-to-End Implementation</h4>
          </div>
          <p className="pillar-desc">
            From strategy and workflow design to deployment and optimization, we're with you at every step.
          </p>
        </div>

        {/* Pillar 4 */}
        <div className="claude-pillar-item">
          <div className="pillar-header">
            <div className="pillar-icon-wrapper">
              <BarChart3 size={18} />
            </div>
            <h4 className="pillar-title">Measurable Impact</h4>
          </div>
          <p className="pillar-desc">
            We focus on outcomes that matter: efficiency, productivity, and business growth.
          </p>
        </div>
      </div>

      {/* Legal disclaimer */}
      <div className="claude-disclaimer">
        <Lock size={12} />
        <span>
          Claude Partner Network participation recognizes our capabilities in delivering Claude-powered solutions. It does not constitute endorsement of individual customer implementations.
        </span>
      </div>
    </section>
  );
}
