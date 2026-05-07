import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import AdminDashboardClient from "./AdminDashboardClient";
import { Suspense } from "react";

export const dynamic = "force-dynamic"; // auth must be checked fresh each visit

export default async function AdminPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  // Fetch both endpoints in parallel on the server — no waterfall, no cold-start spinner
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://scalepods-replication.vercel.app";

  const [snapshotRes, trendRes] = await Promise.all([
    fetch(`${base}/api/analytics`, {
      next: { revalidate: 600 }, // use Vercel data cache
    }),
    fetch(`${base}/api/analytics/trend?days=3`, {
      next: { revalidate: 600 },
    }),
  ]);

  const [snapshot, trend] = await Promise.all([
    snapshotRes.ok ? snapshotRes.json() : null,
    trendRes.ok ? trendRes.json() : null,
  ]);

  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <AdminDashboardClient
        user={{ email: user.email ?? "" }}
        snapshot={snapshot}
        trend={trend}
      />
    </Suspense>
  );
}

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-[#04070D] pt-24 pb-12 px-6 animate-pulse">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="h-10 w-72 bg-white/5 rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-36 bg-white/5 rounded-2xl border border-white/5" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-80 bg-white/5 rounded-2xl border border-white/5" />
          <div className="flex flex-col gap-6">
            <div className="h-36 bg-white/5 rounded-2xl border border-white/5" />
            <div className="h-36 bg-white/5 rounded-2xl border border-white/5" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-52 bg-white/5 rounded-2xl border border-white/5" />
          ))}
        </div>
      </div>
    </div>
  );
}
