import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { error: "GA4 integration is not configured" },
    { status: 501 }
  );
}
