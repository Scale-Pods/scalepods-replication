import { NextRequest, NextResponse } from "next/server";
import { GA4Provider } from "@/lib/analytics/providers/ga4";

export const dynamic = "force-dynamic";
export const revalidate = 600;

export async function GET(req: NextRequest) {
  const range = req.nextUrl.searchParams.get("range") ?? "30d";
  const days  = range === "7d" ? 7 : range === "90d" ? 90 : 30;

  try {
    const data = await GA4Provider.getOverview(days);
    return NextResponse.json(data, {
      headers: { "Cache-Control": "s-maxage=600, stale-while-revalidate=60" },
    });
  } catch (err: any) {
    console.error("[GA4 overview]", err?.message ?? err);
    return NextResponse.json({ error: err?.message ?? "GA4 fetch failed" }, { status: 500 });
  }
}
