import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/blogData";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.title} – ScalePods Blog`,
    description: post.excerpt,
  };
}

const placeholderImages: Record<string, string> = {
  "future-of-workflows-ai-automation": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=85",
  "5-ways-ai-assistants-transforming-operations": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=85",
  "scaling-smarter-automation-startups": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=85",
  "beyond-bots-real-business-impact-ai-integration": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=1200&q=85",
};

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const img = placeholderImages[post.slug];

  return (
    <main style={{ background: "#04070D", minHeight: "100vh", paddingTop: "96px", paddingBottom: "120px" }}>
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 24px" }}>

        {/* Back Button */}
        <Link
          href="/blog"
          className="blog-back-btn"
        >
          <ArrowLeft style={{ width: "14px", height: "14px" }} />
          Back To All Blogs
        </Link>

        {/* Meta */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#6B7280" }}>
            {post.date}
          </span>
          <span style={{
            fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 500,
            color: "#E5E7EB", padding: "3px 10px", borderRadius: "6px",
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
          }}>
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: "Inter, sans-serif", fontSize: "clamp(28px, 3.5vw, 42px)",
          fontWeight: 700, color: "#FFFFFF", lineHeight: 1.2, marginBottom: "20px",
        }}>
          {post.title}
        </h1>

        {/* Excerpt */}
        <p style={{
          fontFamily: "Inter, sans-serif", fontSize: "16px", color: "#6B7280",
          lineHeight: 1.7, marginBottom: "40px",
          paddingBottom: "40px", borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}>
          {post.excerpt}
        </p>

        {/* Hero Image */}
        <div style={{
          width: "100%", borderRadius: "12px", overflow: "hidden",
          marginBottom: "52px", border: "1px solid rgba(255,255,255,0.08)",
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img}
            alt={post.title}
            style={{ width: "100%", height: "380px", objectFit: "cover", display: "block", filter: "brightness(0.8)" }}
          />
        </div>

        {/* Article Body */}
        <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
          {post.sections.map((section, i) => (
            <div key={i}>
              <h2 style={{
                fontFamily: "Inter, sans-serif", fontSize: "22px", fontWeight: 700,
                color: "#FFFFFF", marginBottom: "14px", lineHeight: 1.3,
              }}>
                {section.heading}
              </h2>
              <p style={{
                fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#9CA3AF",
                lineHeight: 1.8,
              }}>
                {section.body}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Back Button */}
        <div style={{ marginTop: "72px", paddingTop: "40px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <Link
            href="/blog"
            className="blog-back-btn"
            style={{ marginBottom: 0 }}
          >
            <ArrowLeft style={{ width: "14px", height: "14px" }} />
            Back To All Blogs
          </Link>
        </div>

      </div>
    </main>
  );
}
