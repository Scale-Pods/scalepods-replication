import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { sendMetaCapiEvent, getClientInfo } from "@/lib/meta-capi";

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
          name,
          email,
          phone,
          role: role || "",
          amount: 99.0,
          currency: "INR",
          order_id: razorpay_order_id,
          payment_id: razorpay_payment_id,
          payment_status: "confirmed",
          session_dates: "12-13 December 2026 (2-3 PM IST)",
          utm_source: body.utm_source || "",
          utm_campaign: body.utm_campaign || "",
          whatsapp_joined: false,
        });
      }
    } catch (dbErr) {
      console.warn("[Supabase Webinar Registration Notice]:", dbErr);
    }

    // 2. Forward registration details to dedicated n8n webinar engine (Google Sheet + Email Alerts)
    try {
      const webinarWebhookUrl =
        process.env.WEBINAR_N8N_WEBHOOK_URL ||
        "https://n8n.srv1010832.hstgr.cloud/webhook/scalepods-webinar-registration";
      fetch(webinarWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "webinar_registration",
          event: "webinar_payment_confirmed",
          amount: 99,
          currency: "INR",
          order_id: razorpay_order_id,
          payment_id: razorpay_payment_id,
          name,
          email,
          phone,
          role: role || "",
          utm_source: body.utm_source || "",
          utm_campaign: body.utm_campaign || "",
          whatsapp_group_link:
            "https://chat.whatsapp.com/DXUZY64yIV9E0VdLprFIx2?s=sh&p=a&mlu=4&ilr=4",
          timestamp: new Date().toISOString(),
        }),
      }).catch((err) =>
        console.warn("[n8n Webinar Webhook Notice]:", err?.message)
      );

      // Also notify primary webhook if configured and different
      const primaryWebhook = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
      if (primaryWebhook && primaryWebhook !== webinarWebhookUrl) {
        fetch(primaryWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            formType: "webinar_registration",
            event: "webinar_payment_confirmed",
            amount: 99,
            currency: "INR",
            order_id: razorpay_order_id,
            payment_id: razorpay_payment_id,
            name,
            email,
            phone,
            role: role || "",
            timestamp: new Date().toISOString(),
          }),
        }).catch(() => {});
      }
    } catch (e) {
      console.warn("[Webhook Notification Notice]:", e);
    }

    // 3. Fire Server-Side Meta Conversions API (CAPI) Purchase Event for Ad Attribution
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
