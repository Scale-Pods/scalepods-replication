import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

function db() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// GET /api/admin/ai/sessions — list all sessions newest first
export async function GET() {
  const { data, error } = await db()
    .from("ai_chat_sessions")
    .select("id, title, range_days, created_at, updated_at")
    .order("updated_at", { ascending: false })
    .limit(100);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

// POST /api/admin/ai/sessions — create new session
export async function POST(req: NextRequest) {
  const { title = "New Chat", range_days = 30 } = await req.json().catch(() => ({}));

  const { data, error } = await db()
    .from("ai_chat_sessions")
    .insert({ title, range_days, messages: [] })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
