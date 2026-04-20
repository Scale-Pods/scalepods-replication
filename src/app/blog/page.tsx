import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/blogData";

export const metadata: Metadata = {
  title: "Blog – ScalePods",
  description: "Latest news, articles, and resources from ScalePods on AI automation and workflows.",
};

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  Article: { bg: "rgba(255,255,255,0.06)", text: "#E5E7EB", border: "rgba(255,255,255,0.1)" },
  Resources: { bg: "rgba(109,182,255,0.1)", text: "#6DB6FF", border: "rgba(109,182,255,0.2)" },
};

const placeholderImages: Record<string, string> = {
  "future-of-workflows-ai-automation": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
  "5-ways-ai-assistants-transforming-operations": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
  "scaling-smarter-automation-startups": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
  "beyond-bots-real-business-impact-ai-integration": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80",
};

export default function BlogPage() {
  return (
    <main style={{ background: "#04070D", minHeight: "100vh", paddingTop: "96px", paddingBottom: "96px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "72px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "6px 16px", borderRadius: "20px",
            background: "rgba(0,128,255,0.08)", border: "1px solid rgba(0,128,255,0.2)",
            marginBottom: "24px",
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#0080FF" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#E5E7EB" }}>
              Blog Posts
            </span>
          </div>

          <h1 style={{
            fontFamily: "Inter, sans-serif", fontSize: "clamp(32px, 4vw, 52px)",
            fontWeight: 700, color: "#FFFFFF", lineHeight: 1.15, marginBottom: "16px",
          }}>
            Latest News{" "}
            <em style={{ fontFamily: "Instrument Serif, Georgia, serif", fontWeight: 400, fontStyle: "italic", color: "#9CA3AF" }}>
              Articles
            </em>
          </h1>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", color: "#6B7280" }}>
            Stay up to date with the latest improvements and new features
          </p>
        </div>

        {/* Grid */}
        <div className="blog-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(520px, 1fr))", gap: "24px" }}>
          {blogPosts.map((post) => {
            const cat = categoryColors[post.category] ?? categoryColors.Article;
            const img = placeholderImages[post.slug];
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                style={{ textDecoration: "none" }}
              >
                <div className="blog-card">
                  {/* Card Content */}
                  <div style={{ padding: "28px 28px 20px" }}>
                    {/* Category + Date */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                      <span style={{
                        fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 500,
                        padding: "4px 10px", borderRadius: "6px",
                        background: cat.bg, color: cat.text, border: `1px solid ${cat.border}`,
                      }}>
                        {post.category}
                      </span>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B7280" }}>
                        {post.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 style={{
                      fontFamily: "Inter, sans-serif", fontSize: "20px", fontWeight: 700,
                      color: "#FFFFFF", lineHeight: 1.3, marginBottom: "12px",
                    }}>
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p style={{
                      fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#6B7280",
                      lineHeight: 1.6, marginBottom: "20px",
                      display: "-webkit-box", WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical" as const, overflow: "hidden",
                    }}>
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Image */}
                  <div style={{ width: "100%", height: "220px", overflow: "hidden" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={post.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "brightness(0.75)" }}
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
