import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { error: "Google Search Console integration is not configured" },
    { status: 501 }
  );
}
