import { NextRequest, NextResponse } from "next/server";
import { sendMetaCapiEvent, getClientInfo } from "@/lib/meta-capi";

export const dynamic = "force-dynamic";

// TEMPORARY diagnostic endpoint — confirms env vars are loaded and shows Meta's
// actual response for a live test call. Never exposes secret values, only
// presence booleans. Remove once CAPI delivery is confirmed working.
export async function GET(request: NextRequest) {
  const envStatus = {
    META_CAPI_ACCESS_TOKEN: process.env.META_CAPI_ACCESS_TOKEN ? "✅ SET" : "❌ NOT SET",
    META_PIXEL_ID: process.env.META_PIXEL_ID ? `✅ SET (${process.env.META_PIXEL_ID})` : "❌ NOT SET",
    META_CAPI_TEST_EVENT_CODE: process.env.META_CAPI_TEST_EVENT_CODE
      ? `✅ SET (${process.env.META_CAPI_TEST_EVENT_CODE})`
      : "❌ NOT SET",
  };

  const { ip, userAgent } = getClientInfo(request.headers);
  const outcome = await sendMetaCapiEvent({
    eventName: "Lead",
    eventId: `diagnostic-${Date.now()}`,
    eventSourceUrl: request.nextUrl.origin + "/contact",
    email: "diagnostic-test@scalepods.co",
    clientIp: ip,
    clientUserAgent: userAgent,
  });

  return NextResponse.json({ envStatus, outcome });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventId, email, phone, sourcePage, formType, fbp, fbc } = body as {
      eventId: string;
      email?: string;
      phone?: string;
      sourcePage?: string;
      formType?: string;
      fbp?: string;
      fbc?: string;
    };

    if (!eventId) {
      return NextResponse.json({ error: "eventId is required" }, { status: 400 });
    }

    const { ip, userAgent } = getClientInfo(request.headers);
    const origin = request.nextUrl.origin;
    const path = sourcePage && sourcePage.startsWith("/") ? sourcePage : "/";
    const eventSourceUrl = `${origin}${path}`;

    await sendMetaCapiEvent({
      eventName: "Lead",
      eventId,
      eventSourceUrl,
      email,
      phone,
      fbp,
      fbc,
      clientIp: ip,
      clientUserAgent: userAgent,
      customData: formType ? { content_name: formType } : undefined,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[/api/capi/lead] Error:", error);
    // Never surface as a hard failure to the caller — this must not block lead submission.
    return NextResponse.json({ success: false });
  }
}
