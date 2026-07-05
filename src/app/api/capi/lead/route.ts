import { NextRequest, NextResponse } from "next/server";
import { sendMetaCapiEvent, getClientInfo } from "@/lib/meta-capi";

export const dynamic = "force-dynamic";

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
