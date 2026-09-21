"use client";

import React from "react";
import { Shield, Users, Layers, BarChart3, Lock } from "lucide-react";

export default function ClaudePartnership() {
  const handleCTAClick = () => {
    window.open("https://calendar.app.google/DhM4emV5aoPSqpDt8", "_blank");
  };

  return (
    <section id="claude-partnership" className="claude-partnership-section">
      <style>{`
        .claude-partnership-section {
          width: 100%;
          max-width: 1200px;
          margin: 32px auto 60px auto;
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
          color: var(--sp-accent, #3B82F6);
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
          min-width: 240px;

          /* Dynamic Theme Adaptive Styling (Default Dark Mode) */
          background: linear-gradient(135deg, #050816 0%, #0b1020 100%);
          color: var(--sp-accent, #3B82F6);
          border: 1px solid rgba(var(--sp-accent-rgb, 59, 130, 246), 0.4);
          box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.6), 0 0 15px rgba(var(--sp-accent-rgb, 59, 130, 246), 0.15);
        }

        .claude-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px -4px rgba(0, 0, 0, 0.6), 0 0 20px rgba(var(--sp-accent-rgb, 59, 130, 246), 0.3);
          border-color: rgba(var(--sp-accent-rgb, 59, 130, 246), 0.6);
        }

        .claude-cta-btn:active {
          transform: translateY(0);
        }

        /* Light Theme Adaptive Styling */
        [data-theme="light"] .claude-cta-btn {
          background: linear-gradient(135deg, var(--sp-accent, #3B82F6) 0%, rgba(var(--sp-accent-rgb, 59, 130, 246), 0.8) 100%);
          color: #ffffff;
          border: 1px solid rgba(var(--sp-accent-rgb, 59, 130, 246), 0.3);
          box-shadow: 0 10px 20px -5px rgba(var(--sp-accent-rgb, 59, 130, 246), 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        [data-theme="light"] .claude-cta-btn:hover {
          background: linear-gradient(135deg, rgba(var(--sp-accent-rgb, 59, 130, 246), 0.9) 0%, rgba(var(--sp-accent-rgb, 59, 130, 246), 0.7) 100%);
          box-shadow: 0 12px 25px -4px rgba(var(--sp-accent-rgb, 59, 130, 246), 0.35);
        }


        /* Right Badge Card styling */
        .claude-badge-container {
          flex-shrink: 0;
          z-index: 1;
        }

        .claude-badge-card {
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          border-radius: 24px;
          padding: 38px 46px;
          display: flex;
          align-items: center;
          gap: 40px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3), 0 0 30px rgba(204, 107, 73, 0.04);
          max-width: 540px;
          min-height: 180px;
        }

        .claude-badge-left {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .anthropic-symbol {
          color: #CC6B49;
          width: 50px;
          height: 50px;
        }

        .claude-wordmark {
          font-family: var(--font-serif), Georgia, serif;
          font-size: 34px;
          font-weight: 500;
          color: var(--color-text-bright);
          line-height: 1;
        }

        .claude-by-anthropic-logo {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 4px;
        }

        .claude-by-anthropic-logo .by-text {
          font-family: var(--font-sans), sans-serif;
          font-size: 10px;
          font-weight: 500;
          color: var(--color-text-faint);
          text-transform: lowercase;
        }

        .anthropic-wordmark-svg {
          width: 82px;
          height: auto;
          color: var(--color-text-bright);
        }

        .claude-badge-divider {
          width: 1px;
          height: 100px;
          background: var(--color-border-faint);
        }

        .claude-badge-right {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .badge-select-partner {
          color: var(--sp-accent, #CC6B49);
          font-weight: 700;
          font-size: 22px;
          letter-spacing: 0.02em;
        }

        .badge-network-track {
          color: var(--color-text-body);
          font-size: 15px;
          line-height: 1.45;
          font-weight: 500;
          max-width: 220px;
        }

        /* Pillars styling */
        .claude-pillars-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-top: 36px;
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
          background: rgba(var(--sp-accent-rgb, 109, 182, 255), 0.05);
          border: 1px solid rgba(var(--sp-accent-rgb, 109, 182, 255), 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--sp-accent, var(--color-blue-mid));
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
          display: block;
          font-size: 13px;
          color: var(--color-text-muted);
          margin-top: 16px;
          text-align: center;
          padding: 0 16px;
          line-height: 1.5;
        }

        .disclaimer-lock-icon {
          display: inline-block;
          vertical-align: -2px;
          margin-right: 6px;
          color: var(--color-text-muted);
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
            max-width: 540px;
          }

          .claude-badge-card {
            max-width: 100%;
          }

          .claude-pillars-grid {
            grid-template-columns: repeat(2, 1fr);
            padding: 24px;
            margin-top: 28px;
          }
        }

        @media (max-width: 568px) {
          .claude-partnership-section {
            margin: 20px auto 36px auto;
          }

          .claude-main-card {
            padding: 24px;
            gap: 24px;
          }

          .claude-badge-card {
            padding: 24px 28px;
            gap: 28px;
            min-height: auto;
          }

          .claude-wordmark {
            font-size: 28px;
          }

          .anthropic-symbol {
            width: 42px;
            height: 42px;
          }

          .claude-badge-divider {
            height: 80px;
          }

          .badge-select-partner {
            font-size: 18px;
          }

          .badge-network-track {
            font-size: 13.5px;
          }

          .claude-pillars-grid {
            grid-template-columns: 1fr;
            padding: 20px;
            gap: 20px;
            margin-top: 20px;
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

          .claude-disclaimer {
            font-size: 12px;
            margin-top: 12px;
          }
        }
      `}</style>

      {/* Main Partnership Card */}
      <div className="claude-main-card">
        <div className="claude-content-left">
          <h2 className="claude-heading">
            ScalePods is now a <br />
            <span className="highlight-blue">Partner</span> in the <br />
            <span className="highlight-orange">Claude Partner Network Services Track.</span>
          </h2>
          <p className="claude-subheading">
            We work with Claude to help organizations design, deploy, and scale intelligent workflows, combining AI workflow automation with secure implementation to automate operations and accelerate growth.
          </p>
          <button className="claude-cta-btn sp-hero-cta-btn" onClick={handleCTAClick}>
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
              
              {/* Stylized by ANTHROP\C original SVG logo */}
              <div className="claude-by-anthropic-logo">
                <span className="by-text">by</span>
                <svg viewBox="0 0 512 58" className="anthropic-wordmark-svg">
                  <g fill="currentColor">
                    <path d="M499.297437,37.877875 C497.233216,43.277652 493.104821,46.37456 487.468012,46.37456 C478.099769,46.37456 472.383537,39.7042645 472.383537,28.825271 C472.383537,17.787503 478.099769,11.1172076 487.468012,11.1172076 C493.104821,11.1172076 497.233216,14.2141138 499.297437,19.6138908 C499.297437,19.6138908 511.92053,19.6138908 511.92053,19.6138908 C508.824424,7.7026469 499.53555,0 487.468012,0 C471.430824,0 460.077832,11.9112944 460.077832,28.825271 C460.077832,45.5804731 471.430824,57.4917658 487.468012,57.4917658 C499.614973,57.4917658 508.903795,49.7097317 512,37.877875 C512,37.877875 499.297437,37.877875 499.297437,37.877875 Z" />
                    <path d="M423.39093,0.970173587 C423.39093,0.970173587 445.552961,56.5576044 445.552961,56.5576044 C445.552961,56.5576044 457.706342,56.5576044 457.706342,56.5576044 C457.706342,56.5576044 435.544309,0.970173587 435.544309,0.970173587 C435.544309,0.970173587 423.39093,0.970173587 423.39093,0.970173587 Z" />
                    <path d="M397.756239,25.6668543 C397.756239,25.6668543 383.060659,25.6668543 383.060659,25.6668543 C383.060659,25.6668543 383.060659,11.6906059 383.060659,11.6906059 C383.060659,11.6906059 397.756239,11.6906059 397.756239,11.6906059 C403.634461,11.6906059 406.732476,14.0729247 406.732476,18.6787305 C406.732476,23.2845354 403.634461,25.6668543 397.756239,25.6668543 Z M398.312299,0.970173587 C398.312299,0.970173587 371.145284,0.970173587 371.145284,0.970173587 C371.145284,0.970173587 371.145284,56.5576044 371.145284,56.5576044 C371.145284,56.5576044 383.060659,56.5576044 383.060659,56.5576044 C383.060659,56.5576044 383.060659,36.387236 383.060659,36.387236 C383.060659,36.387236 398.312299,36.387236 398.312299,36.387236 C410.942565,36.387236 418.647853,29.7167761 418.647853,18.6787305 C418.647853,7.6406352 410.942565,0.970173587 398.312299,0.970173587 Z" />
                    <path d="M332.77702,46.37456 C323.409538,46.37456 317.693822,39.7042645 317.693822,28.825271 C317.693822,17.787503 323.409538,11.1172076 332.77702,11.1172076 C342.065136,11.1172076 347.701488,17.787503 347.701488,28.825271 C347.701488,39.7042645 342.065136,46.37456 332.77702,46.37456 Z M332.77702,0 C316.741185,0 305.389066,11.9112944 305.389066,28.825271 C305.389066,45.5804731 316.741185,57.4917658 332.77702,57.4917658 C348.733489,57.4917658 360.006346,45.5804731 360.006346,28.825271 C360.006346,11.9112944 348.733489,0 332.77702,0 Z" />
                    <path d="M260.707795,11.6906059 C260.707795,11.6906059 275.399441,11.6906059 275.399441,11.6906059 C281.276089,11.6906059 284.373278,13.8346533 284.373278,17.8846248 C284.373278,21.9345449 281.276089,24.0786429 275.399441,24.0786429 C275.399441,24.0786429 260.707795,24.0786429 260.707795,24.0786429 Z M296.285465,17.8846248 C296.285465,7.40241343 288.582239,0.970173587 275.955354,0.970173587 C275.955354,0.970173587 248.795609,0.970173587 248.795609,0.970173587 C248.795609,0.970173587 248.795609,56.5576044 248.795609,56.5576044 C248.795609,56.5576044 260.707795,56.5576044 260.707795,56.5576044 C260.707795,56.5576044 260.707795,34.7990246 260.707795,34.7990246 C260.707795,34.7990246 273.969189,34.7990246 273.969189,34.7990246 C273.969189,34.7990246 285.882176,56.5576044 285.882176,56.5576044 C285.882176,56.5576044 299.065176,56.5576044 299.065176,56.5576044 C299.065176,56.5576044 285.874226,33.1417705 285.874226,33.1417705 C292.495025,30.5966215 296.285465,25.2372051 296.285465,17.8846248 Z" />
                    <path d="M222.190276,23.1257043 C222.190276,23.1257043 195.990471,23.1257043 195.990471,23.1257043 C195.990471,23.1257043 195.990471,0.970173587 195.990471,0.970173587 C195.990471,0.970173587 184.081446,0.970173587 184.081446,0.970173587 C184.081446,0.970173587 184.081446,56.5576044 184.081446,56.5576044 C184.081446,56.5576044 195.990471,56.5576044 195.990471,56.5576044 C195.990471,56.5576044 195.990471,33.8461375 195.990471,33.8461375 C195.990471,33.8461375 222.190276,33.8461375 222.190276,33.8461375 C222.190276,33.8461375 222.190276,56.5576044 222.190276,56.5576044 C222.190276,56.5576044 234.099252,56.5576044 234.099252,56.5576044 C234.099252,56.5576044 234.099252,0.970173587 234.099252,0.970173587 C234.099252,0.970173587 222.190276,0.970173587 222.190276,0.970173587 C222.190276,0.970173587 222.190276,23.1257043 222.190276,23.1257043 Z" />
                    <path d="M125.296113,11.6906059 C125.296113,11.6906059 143.954835,11.6906059 143.954835,11.6906059 C143.954835,11.6906059 143.954835,56.5576044 143.954835,56.5576044 C143.954835,56.5576044 155.864688,56.5576044 155.864688,56.5576044 C155.864688,56.5576044 155.864688,11.6906059 155.864688,11.6906059 C155.864688,11.6906059 174.523461,11.6906059 174.523461,11.6906059 C174.523461,11.6906059 174.523461,0.970173587 174.523461,0.970173587 C174.523461,0.970173587 125.296113,0.970173587 125.296113,0.970173587 Z" />
                    <path d="M104.262002,39.8813245 C104.262002,39.8813245 79.2530991,0.970173587 79.2530991,0.970173587 C79.2530991,0.970173587 65.7562044,0.970173587 65.7562044,0.970173587 C65.7562044,0.970173587 65.7562044,56.5576044 65.7562044,56.5576044 C65.7562044,56.5576044 77.2682623,56.5576044 77.2682623,56.5576044 C77.2682623,56.5576044 77.2682623,17.6464022 77.2682623,17.6464022 C77.2682623,17.6464022 102.277165,56.5576044 102.277165,56.5576044 C102.277165,56.5576044 115.77401,56.5576044 115.77401,56.5576044 C115.77401,56.5576044 115.77401,0.970173587 115.77401,0.970173587 C115.77401,0.970173587 104.262002,0.970173587 104.262002,0.970173587 Z" />
                    <path d="M20.9291783,34.560802 C20.9291783,34.560802 28.5123327,15.0258118 28.5123327,15.0258118 C28.5123327,15.0258118 36.0954888,34.560802 36.0954888,34.560802 C36.0954888,34.560802 20.9291783,34.560802 20.9291783,34.560802 Z M22.1586029,0.970173587 C22.1586029,0.970173587 0,56.5576044 0,56.5576044 C0,56.5576044 12.3897529,56.5576044 12.3897529,56.5576044 C12.3897529,56.5576044 16.9215463,44.8841814 16.9215463,44.8841814 C16.9215463,44.8841814 40.1038712,44.8841814 40.1038712,44.8841814 C40.1038712,44.8841814 44.6349124,56.5576044 44.6349124,56.5576044 C44.6349124,56.5576044 57.0246654,56.5576044 57.0246654,56.5576044 C57.0246654,56.5576044 34.8660642,0.970173587 34.8660642,0.970173587 C34.8660642,0.970173587 22.1586029,0.970173587 22.1586029,0.970173587 Z" />
                  </g>
                </svg>
              </div>
            </div>
            
            <div className="claude-badge-divider"></div>
            
            <div className="claude-badge-right">
              <div className="badge-select-partner">Partner</div>
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
            From strategy and workflow design to deployment and optimization, our team manages the implementation end to end.
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
            We focus on outcomes that matter: efficiency, productivity, and business growth through scalable automation.
          </p>
        </div>
      </div>

      {/* Legal disclaimer */}
      <div className="claude-disclaimer">
        <span>
          <Lock size={13} className="disclaimer-lock-icon" />
          Claude Partner Network participation recognizes our capabilities in delivering Claude-powered solutions. It does not constitute endorsement of individual customer implementations.
        </span>
      </div>
    </section>
  );
}
