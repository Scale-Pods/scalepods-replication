import { NextResponse } from "next/server";
import { LeadPayload, submitLead } from "@/lib/leadService";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, firstName, lastName, ebookTitle, pdfUrl } = body;

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
    }

    const title = ebookTitle || "AI Employees: Meet the Digital Workforce That Never Sleeps, Never Forgets, and Never Misses a Deadline";
    const downloadPdfUrl = pdfUrl || "https://244814113.fs1.hubspotusercontent-na2.net/hubfs/244814113/AI%20Employees%20E-Book.pdf";
    const guideName = body.guideName || "AI-Employees-E-Book.pdf";
    const sourcePage = body.sourcePage || "/resources/ebooks/ai-employees-digital-workforce";
    const emailSubject = body.emailSubject || `Your ScalePods Executive eBook: ${title.split(':')[0]} — Download Inside`;
    const summaryText = body.summaryText || "Inside this eBook, you'll find how Alex, Maya, Harper, and Orion work as one connected digital workforce for Sales, Marketing, HR, and Operations.";

    const payload: LeadPayload = {
      formType: "guide_download",
      sourcePage,
      name: `${firstName || ''} ${lastName || ''}`.trim() || email,
      email,
      phone: body.phone || "N/A",
      workflowType: body.workflowType || "operations_workflow",
      ebookTitle: title,
      pdfUrl: downloadPdfUrl,
      emailSubject,
      summaryText,
      metadata: {
        ebookTitle: title,
        guideName,
        guideUrl: downloadPdfUrl,
        pdfUrl: downloadPdfUrl,
        emailSubject,
        summaryText
      },
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
