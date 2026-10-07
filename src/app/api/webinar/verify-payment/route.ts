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

    // 1. Forward registration details to n8n webhook
    try {
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
      if (webhookUrl) {
        fetch(webhookUrl, {
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
            whatsapp_group_link: "https://chat.whatsapp.com/DXUZY64yIV9E0VdLprFIx2?s=sh&p=a&mlu=4&ilr=4",
            attendee: { name, email, phone, role },
            timestamp: new Date().toISOString(),
          }),
        }).catch((err) => console.warn("[n8n Webhook Notice]:", err?.message));
      }
    } catch (e) {
      console.warn("[Webhook Notification Notice]:", e);
    }

    // 2. Fire Server-Side Meta Conversions API (CAPI) Purchase Event for Ad Attribution
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
