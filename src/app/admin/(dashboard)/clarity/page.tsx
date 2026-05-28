export default function ClarityPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 gap-4">
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "rgba(99,102,241,0.1)" }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
      </div>
      <h1 className="text-xl font-bold" style={{ color: "#f9fafb" }}>
        Microsoft Clarity
      </h1>
      <p className="text-sm max-w-md" style={{ color: "#6b7280" }}>
        Clarity analytics dashboard is being rebuilt. Data collection continues in the background via Supabase.
      </p>
    </div>
  );
}
