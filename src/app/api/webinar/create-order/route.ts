import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, role, internal_test, test_secret } = body;

    // Validate inputs
    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: "Name, email, and phone number are required." },
        { status: 400 }
      );
    }

    // Secure internal testing check (allows ₹1 checkout only with exact matching secret)
    const isTest =
      internal_test === true && test_secret === "scalepods_live_test_2026";
    const chargeAmountPaise = isTest ? 1 * 100 : 99 * 100; // 100 paise = ₹1, 9900 paise = ₹99

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      console.error("[Razorpay Error] Missing API credentials in environment.");
      return NextResponse.json(
        {
          success: false,
          error: "Payment service is currently initializing. Please contact support or try again.",
        },
        { status: 500 }
      );
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    // Create an Order (₹1 for secret internal test, ₹99 for public visitors)
    const options = {
      amount: chargeAmountPaise,
      currency: "INR",
      receipt: `rcpt_wb_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      notes: {
        attendee_name: String(name).trim().slice(0, 50),
        attendee_email: String(email).trim().slice(0, 50),
        attendee_phone: String(phone).trim().slice(0, 20),
        attendee_role: String(role || "Leader").trim().slice(0, 50),
        webinar_title: "AI Business Automation Masterclass with Adnan Shaikh & Raunak Kumar",
        is_internal_test: isTest ? "true" : "false",
      },
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
      isTest,
    });
  } catch (error: any) {
    console.error("[Razorpay Create Order Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to create payment order. Please try again.",
      },
      { status: 500 }
    );
  }
}
