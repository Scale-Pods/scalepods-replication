import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import {
  validateEmail,
  validatePhone,
  validateFullName,
  validateCompanyName,
} from "@/lib/webinarValidation";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, role, countryCode, customCode } = body;

    // 1. Strict validation of Name, Email, WhatsApp Phone, and Company
    const nameCheck = validateFullName(name);
    if (!nameCheck.valid) {
      return NextResponse.json(
        { success: false, error: nameCheck.error || "Please enter your valid full name." },
        { status: 400 }
      );
    }

    const emailCheck = validateEmail(email);
    if (!emailCheck.valid) {
      return NextResponse.json(
        { success: false, error: emailCheck.error || "Please enter a valid work or personal email." },
        { status: 400 }
      );
    }

    const phoneCheck = validatePhone(phone, countryCode, customCode);
    if (!phoneCheck.valid) {
      return NextResponse.json(
        { success: false, error: phoneCheck.error || "Please enter a valid WhatsApp phone number." },
        { status: 400 }
      );
    }

    const companyCheck = validateCompanyName(company);
    if (!companyCheck.valid) {
      return NextResponse.json(
        { success: false, error: companyCheck.error || "Company name is required." },
        { status: 400 }
      );
    }

    const cleanName = nameCheck.formatted!;
    const cleanEmail = emailCheck.formatted!;
    const cleanPhone = phoneCheck.formatted!;
    const cleanCompany = companyCheck.formatted!;

    // Strictly charge ₹99 (9900 paise) for all registrations
    const chargeAmountPaise = 99 * 100;

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

    // Create an Order (₹99 for all visitors)
    const options = {
      amount: chargeAmountPaise,
      currency: "INR",
      receipt: `rcpt_wb_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      notes: {
        attendee_name: cleanName.slice(0, 50),
        attendee_email: cleanEmail.slice(0, 50),
        attendee_phone: cleanPhone.slice(0, 30),
        attendee_company: cleanCompany.slice(0, 50),
        attendee_role: String(role || "Leader").trim().slice(0, 50),
        webinar_title: "AI Business Automation Masterclass with Adnan Shaikh & Raunak Kumar",
      },
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
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
