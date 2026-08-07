import { NextResponse } from "next/server";
import { LeadPayload, submitLead } from "@/lib/leadService";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, firstName, lastName, ebookTitle, pdfUrl } = body;

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
    }

    const payload: LeadPayload = {
      formType: "guide_download",
      sourcePage: "/resources/ebooks/ai-in-hr-executive-playbook",
      name: `${firstName || ''} ${lastName || ''}`.trim() || email,
      email,
      phone: body.phone || "N/A",
      workflowType: "hr_workflow",
      metadata: {
        guideName: "AI-in-HR-Executive-Playbook.pdf",
        guideUrl: pdfUrl || "https://244814113.fs1.hubspotusercontent-na2.net/hubfs/244814113/AI%20IN%20HR%20-%20E%20book.pdf"
      },
      ebookTitle: ebookTitle || "AI in HR: The Executive Playbook for Building an AI-First HR Organization",
      pdfUrl: pdfUrl || "https://244814113.fs1.hubspotusercontent-na2.net/hubfs/244814113/AI%20IN%20HR%20-%20E%20book.pdf",
      timestamp: new Date().toISOString()
    };

    // Use leadService submitLead for unified submission
    await submitLead(payload);

    return NextResponse.json({
      success: true,
      message: "Lead processed, email queued for user and admin notified.",
      pdfUrl: payload.pdfUrl
    });

  } catch (error: any) {
    console.error("[eBook Download API Error]:", error);
    return NextResponse.json({ success: false, message: error.message || "Internal server error" }, { status: 500 });
  }
}
