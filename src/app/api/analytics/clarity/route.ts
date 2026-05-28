import { NextResponse } from "next/server";
import { ClarityProvider } from "@/lib/analytics/providers/clarity";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get("range") ?? "30d";
    
    let days = 30;
    if (range === "7d") days = 7;
    else if (range === "90d") days = 90;
    else if (range === "custom") {
      // Parse custom start and end dates if provided
      const start = searchParams.get("start");
      const end = searchParams.get("end");
      if (start && end) {
        const diffTime = Math.abs(new Date(end).getTime() - new Date(start).getTime());
        days = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
      }
    }

    const data = await ClarityProvider.getOverview(days);
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=120",
      },
    });
  } catch (err: any) {
    console.error("[api/analytics/clarity]", err?.message ?? err);
    return NextResponse.json({ error: "Failed to fetch Clarity data" }, { status: 500 });
  }
}
