import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

function getDb() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key);
}

export async function GET() {
  try {
    const supabase = getDb();

    const { data, error } = await supabase
      .from("webinar_registrations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[Webinar Registrations API Error]:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const registrations = data || [];
    const totalCount = registrations.length;
    const totalRevenue = registrations.reduce(
      (sum, item) => sum + (Number(item.amount) || 99),
      0
    );

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayCount = registrations.filter((item) => {
      const itemDate = new Date(item.created_at);
      return itemDate >= todayStart;
    }).length;

    const lastRegisteredAt =
      registrations.length > 0 ? registrations[0].created_at : null;

    // Outbound email & AI automation metrics
    let totalEmailsSent = 0;
    let totalRepliesReceived = 0;
    let totalInstantlySynced = 0;
    let totalUnsubscribed = 0;
    let totalBounced = 0;

    registrations.forEach((item: Record<string, unknown>) => {
      if (item.instantly_synced) totalInstantlySynced++;
      if (item.is_unsubscribed) totalUnsubscribed++;
      if (item.is_bounced) totalBounced++;

      const hasReplies =
        Boolean(item.customer_reply) ||
        (Array.isArray(item.replies_history) && item.replies_history.length > 0);
      if (hasReplies) totalRepliesReceived++;

      for (let i = 1; i <= 5; i++) {
        const st = item[`email_status_${i}`] as { status?: string } | null;
        if (st && (st.status === "sent" || st.status === "delivered")) {
          totalEmailsSent++;
        }
      }
    });

    return NextResponse.json({
      registrations,
      stats: {
        totalCount,
        totalRevenue,
        todayCount,
        lastRegisteredAt,
        totalEmailsSent,
        totalRepliesReceived,
        totalInstantlySynced,
        totalUnsubscribed,
        totalBounced,
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

