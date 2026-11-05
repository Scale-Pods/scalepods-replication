import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { sendMetaCapiEvent, getClientInfo } from "@/lib/meta-capi";
import {
  validateEmail,
  validatePhone,
  validateFullName,
} from "@/lib/webinarValidation";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      name,
      email,
      phone,
      role,
    } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, error: "Missing required payment verification details." },
        { status: 400 }
      );
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      console.error("[Razorpay Verify Error] Missing RAZORPAY_KEY_SECRET in environment.");
      return NextResponse.json(
        { success: false, error: "Server configuration error during verification." },
        { status: 500 }
      );
    }

    // Cryptographic HMAC SHA256 Verification
    // Razorpay standard: hmac_sha256(order_id + "|" + payment_id, secret)
    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const isSignatureValid = expectedSignature === razorpay_signature;

    if (!isSignatureValid) {
      console.error("[Security Warning] Razorpay signature mismatch detected!", {
        order_id: razorpay_order_id,
        payment_id: razorpay_payment_id,
      });
      return NextResponse.json(
        { success: false, error: "Payment verification failed. Tampering detected." },
        { status: 400 }
      );
    }

    const isTest =
      body.internal_test === true &&
      body.test_secret === "scalepods_live_test_2026";
    const amountVal = isTest ? 1.0 : 99.0;

    const cleanName = validateFullName(name).formatted || String(name || "").trim();
    const cleanEmail = validateEmail(email).formatted || String(email || "").trim().toLowerCase();
    const cleanPhone = validatePhone(phone, body.countryCode, body.customCode).formatted || String(phone || "").trim();

    // 1. Insert into Supabase webinar_registrations table for live dashboard
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey =
        process.env.SUPABASE_SERVICE_ROLE_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (supabaseUrl && supabaseKey) {
        const { createClient } = await import("@supabase/supabase-js");
        const supabase = createClient(supabaseUrl, supabaseKey);
        await supabase.from("webinar_registrations").insert({
          name: isTest ? `[TEST] ${cleanName}` : cleanName,
          email: cleanEmail,
          phone: cleanPhone,
          role: role || "",
          amount: amountVal,
          currency: "INR",
          order_id: razorpay_order_id,
          payment_id: razorpay_payment_id,
          payment_status: isTest ? "test_confirmed" : "confirmed",
          session_dates: "12-13 December 2026 (2-3 PM IST)",
          utm_source: body.utm_source || "",
          utm_campaign: isTest ? "Internal Team Test (₹1)" : (body.utm_campaign || ""),
          whatsapp_joined: false,
        });
      }
    } catch (dbErr) {
      console.warn("[Supabase Webinar Registration Notice]:", dbErr);
    }

    // 2. Forward registration details to dedicated n8n webinar engine (Google Sheet + Email Alerts)
    // IMPORTANT: In serverless runtimes (Vercel), we MUST await the webhook request so the Lambda doesn't freeze before sending
    try {
      const webinarWebhookUrl =
        process.env.WEBINAR_N8N_WEBHOOK_URL ||
        "https://n8n.srv1010832.hstgr.cloud/webhook/scalepods-webinar-registration";

      const webhookPayload = {
        formType: "webinar_registration",
        event: "webinar_payment_confirmed",
        amount: amountVal,
        currency: "INR",
        order_id: razorpay_order_id,
        payment_id: razorpay_payment_id,
        name: isTest ? `[TEST] ${cleanName}` : cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        role: role || "",
        utm_source: body.utm_source || "",
        utm_campaign: isTest ? "Internal Team Test (₹1)" : (body.utm_campaign || ""),
        whatsapp_group_link:
          "https://chat.whatsapp.com/FxKlQwxOkF17VlUeLgIgl8?s=cl&p=i&mlu=4&ilr=4&iam=2",
        timestamp: new Date().toISOString(),
      };

      const webhookRes = await fetch(webinarWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(webhookPayload),
        signal: AbortSignal.timeout(8000),
      });

      if (!webhookRes.ok) {
        console.warn("[n8n Webinar Webhook Non-200 Status]:", webhookRes.status, await webhookRes.text().catch(() => ""));
      } else {
        console.log("[n8n Webinar Webhook Success]: registration forwarded to Google Sheet & Email Engine");
      }

      // Also notify primary webhook if configured and different
      const primaryWebhook = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
      if (primaryWebhook && primaryWebhook !== webinarWebhookUrl) {
        await fetch(primaryWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(webhookPayload),
          signal: AbortSignal.timeout(5000),
        }).catch(() => {});
      }
    } catch (e: any) {
      console.warn("[Webhook Notification Notice]:", e?.message || e);
    }

    // 3. Fire Server-Side Meta Conversions API (CAPI) Purchase Event for Ad Attribution
    // ONLY fired for real customers, NEVER for internal test mode to protect ad metrics
    if (!isTest) {
      try {
        const { ip, userAgent } = getClientInfo(req.headers);
        const origin = req.nextUrl.origin || "https://www.scalepods.co";
        sendMetaCapiEvent({
          eventName: "Purchase",
          eventId: razorpay_payment_id,
          eventSourceUrl: `${origin}/ai-business-automation-webinar`,
          email,
          phone,
          clientIp: ip,
          clientUserAgent: userAgent,
          customData: {
            currency: "INR",
            value: 99.0,
            content_name: "AI Business Automation Live Webinar Pass",
            content_type: "product",
            order_id: razorpay_order_id,
          },
        }).catch((err) => console.warn("[Meta CAPI Purchase Notice]:", err?.message));
      } catch (e) {
        console.warn("[Meta CAPI Error Notice]:", e);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Payment successfully verified and registered.",
      bookingId: razorpay_payment_id,
      orderId: razorpay_order_id,
      attendee: { name, email, phone, role },
    });
  } catch (error: any) {
    console.error("[Razorpay Verification Exception]:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal verification error." },
      { status: 500 }
    );
  }
}
