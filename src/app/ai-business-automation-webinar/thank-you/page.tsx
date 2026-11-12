"use client";

import React, { useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  MessageSquare,
  ExternalLink,
  ShieldCheck,
  ArrowRight,
  Mail,
  Zap,
  Calendar,
  Clock,
} from "lucide-react";
import { BeamsBackground } from "@/components/ui/beams-background";
import "../webinar.css";

declare global {
  interface Window {
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
  }
}

const WHATSAPP_GROUP_LINK =
  "https://chat.whatsapp.com/FxKlQwxOkF17VlUeLgIgl8?s=cl&p=i&mlu=4&ilr=4&iam=2";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id") || searchParams.get("bookingId") || "";
  const orderId = searchParams.get("order_id") || searchParams.get("orderId") || "";
  const name = searchParams.get("name") || "";
  const email = searchParams.get("email") || "";

  // Fire Meta Pixel & GTM Conversion Tracking on mount
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "webinar_registration_thankyou_pageview",
          event_category: "Webinar",
          event_action: "Registration Confirmed",
          transaction_id: paymentId || undefined,
          value: 99.0,
          currency: "INR",
        });

        // Meta Pixel Purchase Event (Deduplicated with eventId if paymentId available)
        window.fbq?.(
          "track",
          "Purchase",
          {
            value: 99.0,
            currency: "INR",
            content_name: "AI Business Automation Live Masterclass Pass",
          },
          paymentId ? { eventID: paymentId } : undefined
        );

        // Meta Pixel Custom Conversion helper
        window.fbq?.("trackCustom", "WebinarRegistered", {
          value: 99.0,
          currency: "INR",
          content_name: "AI Business Automation Live Masterclass",
        });
      }
    } catch (trackingErr) {
      console.warn("[Meta/GTM Thank-You Tracking Notice]:", trackingErr);
    }
  }, [paymentId]);

  return (
    <BeamsBackground
      className="webinarpod-container wb-theme-light"
      forcedTheme="light"
      hues={[96, 210]}
      intensity="strong"
    >
      {/* Ambient Lighting Atmosphere */}
      <div className="wb-ambient-glow wb-ambient-hero" />
      <div className="wb-ambient-glow wb-ambient-mid" />

      {/* Header / Navbar */}
      <header className="wb-navbar">
        <div className="wb-container wb-navbar-inner">
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <div
              className="wb-navbar-logo-wrap"
              style={{ position: "relative", width: "160px", height: "28px", flexShrink: 0 }}
            >
              <Image
                src="/scalepods-navbar-logo.webp"
                alt="ScalePods"
                className="wb-navbar-logo-img"
                fill
                sizes="160px"
                loading="eager"
                style={{
                  objectFit: "contain",
                  objectPosition: "left center",
                  filter: "none",
                }}
              />
            </div>
          </Link>

          <div className="wb-navbar-actions">
            <Link
              href="/ai-business-automation-webinar"
              className="wb-button-primary wb-button-nav"
              style={{ textDecoration: "none" }}
            >
              <span>Webinar Details</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Thank You Card Section */}
      <main
        style={{
          minHeight: "calc(100vh - 120px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(24px, 4vw, 56px) 16px 80px",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div
          style={{
            maxWidth: "680px",
            width: "100%",
            background: "#FFFFFF",
            border: "1.5px solid rgba(5, 150, 105, 0.3)",
            borderRadius: "24px",
            padding: "clamp(24px, 3.5vw, 44px)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow:
              "0 20px 50px -10px rgba(15, 23, 42, 0.12), 0 0 30px rgba(5, 150, 105, 0.08)",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Animated Success Icon */}
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              background: "rgba(5, 150, 105, 0.12)",
              border: "2px solid #059669",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#059669",
              marginBottom: "18px",
              boxShadow: "0 0 24px rgba(5, 150, 105, 0.25)",
            }}
          >
            <CheckCircle2 size={40} />
          </div>

          {/* Status Badge */}
          <div
            className="wb-pill-green"
            style={{
              marginBottom: "14px",
              fontSize: "11px",
              padding: "4px 14px",
              letterSpacing: "0.08em",
            }}
          >
            <span className="wb-dot-green" />
            <span>PAYMENT VERIFIED &amp; SEAT CONFIRMED</span>
          </div>

          {/* Heading */}
          <h1
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(24px, 3vw, 36px)",
              fontWeight: 900,
              lineHeight: 1.15,
              color: "#090D14",
              letterSpacing: "-0.02em",
              margin: "0 0 12px 0",
            }}
          >
            You&apos;re In! Your Seat Is Reserved.
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(13.5px, 1vw, 15.5px)",
              color: "#334155",
              lineHeight: 1.55,
              maxWidth: "520px",
              margin: "0 0 24px 0",
            }}
          >
            Thank you{name ? `, ${name}` : ""}. Your registration for the{" "}
            <strong style={{ color: "#090D14" }}>
              AI Business Automation Live Masterclass
            </strong>{" "}
            has been confirmed. A confirmation receipt was dispatched to{" "}
            <strong style={{ color: "#090D14" }}>
              {email || "your registered email"}
            </strong>
            .
          </p>

          {/* Receipt Details Box */}
          <div
            style={{
              width: "100%",
              background: "#F8FAFC",
              border: "1px solid #E2E8F0",
              borderRadius: "14px",
              padding: "16px 20px",
              marginBottom: "24px",
              textAlign: "left",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: "8px",
                borderBottom: "1px solid #E2E8F0",
                marginBottom: "10px",
                fontSize: "12.5px",
              }}
            >
              <span style={{ color: "#64748B", fontWeight: 600 }}>
                Program
              </span>
              <span
                style={{
                  color: "#090D14",
                  fontWeight: 700,
                  textAlign: "right",
                }}
              >
                AI Business Automation Masterclass
              </span>
            </div>

            {paymentId && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                  fontSize: "12px",
                }}
              >
                <span style={{ color: "#64748B" }}>Payment ID</span>
                <span
                  style={{
                    color: "#059669",
                    fontFamily: "monospace",
                    fontWeight: 600,
                  }}
                >
                  {paymentId}
                </span>
              </div>
            )}

            {orderId && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                  fontSize: "12px",
                }}
              >
                <span style={{ color: "#64748B" }}>Order Reference</span>
                <span
                  style={{
                    color: "#0284C7",
                    fontFamily: "monospace",
                    fontWeight: 600,
                  }}
                >
                  {orderId}
                </span>
              </div>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
                fontSize: "12px",
              }}
            >
              <span style={{ color: "#64748B" }}>Date &amp; Time</span>
              <span
                style={{
                  color: "#0284C7",
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <Calendar size={13} /> 12–13 Dec <Clock size={13} style={{ marginLeft: "4px" }} /> 2:00 PM – 3:00 PM IST
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
                fontSize: "12px",
              }}
            >
              <span style={{ color: "#64748B" }}>Pass Fee</span>
              <span
                style={{
                  color: "#090D14",
                  fontWeight: 800,
                }}
              >
                ₹99.00 INR (Paid)
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "12px",
              }}
            >
              <span style={{ color: "#64748B" }}>Status</span>
              <span
                style={{
                  color: "#059669",
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <ShieldCheck size={13} /> Active &amp; Confirmed
              </span>
            </div>
          </div>

          {/* Action Callout: VIP WhatsApp Group Button */}
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              marginBottom: "28px",
            }}
          >
            <a
              href={WHATSAPP_GROUP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                background: "#25D366",
                color: "#FFFFFF",
                fontWeight: 800,
                fontSize: "16px",
                padding: "16px 24px",
                borderRadius: "14px",
                textDecoration: "none",
                boxShadow: "0 8px 24px rgba(37, 211, 102, 0.35)",
                transition: "all 0.2s ease",
              }}
            >
              <MessageSquare size={20} />
              <span>Join Attendee VIP WhatsApp Group</span>
              <ExternalLink size={15} style={{ opacity: 0.85 }} />
            </a>

            <div
              style={{
                background: "rgba(5, 150, 105, 0.08)",
                border: "1px solid rgba(5, 150, 105, 0.2)",
                borderRadius: "12px",
                padding: "12px 16px",
                fontSize: "12.5px",
                color: "#065F46",
                lineHeight: 1.5,
              }}
            >
              📌 <strong>Important:</strong> Live Zoom access link for <strong>12–13 December (2:00 PM – 3:00 PM IST)</strong>, calendar invite, and
              pre-session automation templates are shared directly inside the VIP WhatsApp group.
            </div>
          </div>

          {/* 3 Steps: What Happens Next */}
          <div
            style={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
              gap: "12px",
              marginBottom: "28px",
              textAlign: "left",
            }}
          >
            <div
              style={{
                background: "#F8FAFC",
                border: "1px solid #E2E8F0",
                borderRadius: "12px",
                padding: "14px 16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#0284C7",
                  fontWeight: 700,
                  fontSize: "13px",
                  marginBottom: "4px",
                }}
              >
                <Mail size={15} />
                <span>1. Check Inbox</span>
              </div>
              <p
                style={{
                  fontSize: "11.5px",
                  color: "#64748B",
                  lineHeight: 1.45,
                  margin: 0,
                }}
              >
                Confirmation receipt has been sent to your email.
              </p>
            </div>

            <div
              style={{
                background: "#F8FAFC",
                border: "1px solid #E2E8F0",
                borderRadius: "12px",
                padding: "14px 16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#059669",
                  fontWeight: 700,
                  fontSize: "13px",
                  marginBottom: "4px",
                }}
              >
                <MessageSquare size={15} />
                <span>2. WhatsApp VIP</span>
              </div>
              <p
                style={{
                  fontSize: "11.5px",
                  color: "#64748B",
                  lineHeight: 1.45,
                  margin: 0,
                }}
              >
                Join the group to get your Zoom join link &amp; handouts.
              </p>
            </div>

            <div
              style={{
                background: "#F8FAFC",
                border: "1px solid #E2E8F0",
                borderRadius: "12px",
                padding: "14px 16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#D97706",
                  fontWeight: 700,
                  fontSize: "13px",
                  marginBottom: "4px",
                }}
              >
                <Zap size={15} />
                <span>3. Live Systems</span>
              </div>
              <p
                style={{
                  fontSize: "11.5px",
                  color: "#64748B",
                  lineHeight: 1.45,
                  margin: 0,
                }}
              >
                12–13 December (2–3 PM) live systems walkthrough.
              </p>
            </div>
          </div>

          {/* Footer Back Link */}
          <Link
            href="/ai-business-automation-webinar"
            style={{
              fontSize: "13px",
              color: "#64748B",
              textDecoration: "underline",
              textUnderlineOffset: "4px",
            }}
          >
            &larr; Return to Webinar Information Page
          </Link>
        </div>
      </main>
    </BeamsBackground>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#F8FAF7",
            color: "#090D14",
            fontFamily: "var(--font-inter), sans-serif",
          }}
        >
          Loading your confirmation details...
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}

