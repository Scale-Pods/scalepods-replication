export default function GSCPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 gap-4">
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "rgba(16,185,129,0.1)" }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>
      <h1 className="text-xl font-bold" style={{ color: "#f9fafb" }}>
        Google Search Console
      </h1>
      <p className="text-sm max-w-md" style={{ color: "#6b7280" }}>
        GSC integration is not yet configured. This section will be available once site ownership is verified and API access is set up.
      </p>
    </div>
  );
}
