import { NextRequest, NextResponse } from "next/server";
import { sendMetaCapiEvent, getClientInfo } from "@/lib/meta-capi";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventId, url, fbp, fbc } = body as {
      eventId: string;
      url?: string;
      fbp?: string;
      fbc?: string;
    };

    if (!eventId) {
      return NextResponse.json({ error: "eventId is required" }, { status: 400 });
    }

    const { ip, userAgent } = getClientInfo(request.headers);
    const eventSourceUrl = url || request.nextUrl.origin;

    await sendMetaCapiEvent({
      eventName: "PageView",
      eventId,
      eventSourceUrl,
      fbp,
      fbc,
      clientIp: ip,
      clientUserAgent: userAgent,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[/api/capi/pageview] Error:", error);
    return NextResponse.json({ success: false });
  }
}
