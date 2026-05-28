export default function GA4Page() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 gap-4">
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "rgba(59,130,246,0.1)" }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      </div>
      <h1 className="text-xl font-bold" style={{ color: "#f9fafb" }}>
        Google Analytics (GA4)
      </h1>
      <p className="text-sm max-w-md" style={{ color: "#6b7280" }}>
        GA4 integration is not yet configured. This section will be available once the Data API credentials are set up.
      </p>
    </div>
  );
}
