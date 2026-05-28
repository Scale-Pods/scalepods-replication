export default function AdminPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 gap-4">
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "rgba(99,102,241,0.1)" }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      </div>
      <h1 className="text-xl font-bold" style={{ color: "#f9fafb" }}>
        Analytics Dashboard
      </h1>
      <p className="text-sm max-w-md" style={{ color: "#6b7280" }}>
        The analytics dashboard is being rebuilt. Backend data collection via Microsoft Clarity, Supabase, and API endpoints remains fully operational.
      </p>
    </div>
  );
}
