import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center" style={{ background: "var(--bg-page, #030712)" }}>
      <main className="flex-1 flex flex-col items-center justify-center h-full">
        {children}
      </main>
    </div>
  );
}
