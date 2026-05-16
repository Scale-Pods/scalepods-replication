import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts as staticPosts, BlogPost } from "@/lib/blogData";
import { supabase } from "@/lib/supabase";

export const revalidate = 0; // Force dynamic fetching for real-time updates

export const metadata: Metadata = {
  title: "Blog – ScalePods",
  description: "Latest news, articles, and resources from ScalePods on AI automation and workflows.",
};

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  Article: { bg: "var(--color-bg-card-alt)", text: "var(--color-text-bright)", border: "var(--color-border)" },
  Resources: { bg: "rgba(var(--color-blue-mid-rgb), 0.1)", text: "var(--color-blue-mid)", border: "rgba(var(--color-blue-mid-rgb), 0.2)" },
};

// Use dynamically if possible, but keep placeholders for variety
const placeholderImages: Record<string, string> = {
  "future-of-workflows-ai-automation": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
  "5-ways-ai-assistants-transforming-operations": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
  "scaling-smarter-automation-startups": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
  "beyond-bots-real-business-impact-ai-integration": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80",
};

export default async function BlogPage() {
  // 1. Fetch from Supabase
  const { data: dbPosts, error } = await supabase
    .from("website_content")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) console.error("[BlogPage] Supabase error:", error);

  // 2. Map DB posts to BlogPost format
  const dynamicPosts: BlogPost[] = (dbPosts || []).map((db) => ({
    slug: db.slug,
    title: db.title,
    excerpt: db.excerpt,
    category: db.category || "Article",
    date: db.published_at ? new Date(db.published_at).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }) : "Recently",
    image: db.hero_image,
    sections: [] // We'll handle body content in the slug page
  }));

  // 3. Merge with static posts (filter out duplicates by slug)
  const allPosts = [...dynamicPosts, ...staticPosts.filter(sp => !dynamicPosts.find(dp => dp.slug === sp.slug))];

  return (
    <main style={{ background: "var(--color-bg-page)", minHeight: "100vh", paddingTop: "96px", paddingBottom: "96px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "72px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "6px 16px", borderRadius: "20px",
            background: "rgba(var(--color-blue-mid-rgb), 0.08)", border: "1px solid rgba(var(--color-blue-mid-rgb), 0.2)",
            marginBottom: "24px",
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--color-blue-mid)" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
            <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "var(--color-text-bright)" }}>
              Blog Posts
            </span>
          </div>

          <h1 style={{
            fontFamily: "var(--font-inter), sans-serif", fontSize: "clamp(32px, 4vw, 52px)",
            fontWeight: 700, color: "var(--color-text-bright)", lineHeight: 1.15, marginBottom: "16px",
          }}>
            Latest News{" "}
            <em style={{ fontFamily: "var(--font-instrument), serif", fontWeight: 400, fontStyle: "italic", color: "var(--color-text-muted)" }}>
              Articles
            </em>
          </h1>
          <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "16px", color: "var(--color-text-body)" }}>
            Stay up to date with the latest improvements and new features
          </p>
        </div>

        {/* Grid */}
        <div className="blog-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px" }}>
          {allPosts.map((post) => {
            const cat = categoryColors[post.category] ?? categoryColors.Article;
            const img = post.image || placeholderImages[post.slug] || "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80";
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                style={{ textDecoration: "none" }}
              >
                <div className="blog-card" style={{ 
                  background: "var(--color-bg-card)", 
                  border: "1px solid var(--color-border)",
                  borderRadius: "16px",
                  overflow: "hidden",
                  transition: "transform 0.2s ease, border-color 0.2s ease",
                }}>
                  {/* Card Content */}
                  <div style={{ padding: "28px 28px 20px" }}>
                    {/* Category + Date */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                      <span style={{
                        fontFamily: "var(--font-inter), sans-serif", fontSize: "12px", fontWeight: 500,
                        padding: "4px 10px", borderRadius: "6px",
                        background: cat.bg, color: cat.text, border: `1px solid ${cat.border}`,
                      }}>
                        {post.category}
                      </span>
                      <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "13px", color: "var(--color-text-muted)" }}>
                        {post.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 style={{
                      fontFamily: "var(--font-inter), sans-serif", fontSize: "20px", fontWeight: 700,
                      color: "var(--color-text-bright)", lineHeight: 1.3, marginBottom: "12px",
                    }}>
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p style={{
                      fontFamily: "var(--font-inter), sans-serif", fontSize: "14px", color: "var(--color-text-body)",
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
