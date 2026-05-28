import { redirect } from "next/navigation";

export default function AdminPage() {
  // Redirect to Clarity — the active analytics provider
  redirect("/admin/clarity");
}
