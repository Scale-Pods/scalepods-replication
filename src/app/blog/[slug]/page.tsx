import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts as staticPosts } from "@/lib/blogData";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return staticPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data: post } = await supabase.from("website_content").select("title, excerpt").eq("slug", slug).single();
  if (post) return { title: `${post.title} – ScalePods Blog`, description: post.excerpt };
  const sPost = staticPosts.find((p) => p.slug === slug);
  if (!sPost) return { title: "Not Found" };
  return { title: `${sPost.title} – ScalePods Blog`, description: sPost.excerpt };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const { data: post } = await supabase.from("website_content").select("*").eq("slug", slug).single();

  let displayData: any = null;
  if (post) {
    let sections = [];
    try {
      sections = JSON.parse(post.body);
    } catch {
      sections = [{ heading: "", body: post.body }];
    }
    displayData = {
      title: post.title,
      excerpt: post.excerpt,
      date: new Date(post.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      category: post.category || "Article",
      image: post.hero_image,
      sections: sections
    };
  } else {
    const sPost = staticPosts.find((p) => p.slug === slug);
    if (!sPost) notFound();
    displayData = { ...sPost, image: sPost.image };
  }

  return (
    <main style={{ background: "#04070D", minHeight: "100vh", paddingTop: "64px", paddingBottom: "120px", color: "#B8C7D9" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px" }}>

        {/* Back Button */}
        <Link href="/blog" className="blog-back-btn">
          <ArrowLeft style={{ width: "14px", height: "14px" }} />
          Back To All Blogs
        </Link>

        {/* Meta */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B7280" }}>
            {displayData.date}
          </span>
          <span style={{
            fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600,
            color: "#E5E7EB", padding: "4px 12px", borderRadius: "6px",
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
            textTransform: "uppercase", letterSpacing: "0.05em"
          }}>
            {displayData.category}
          </span>
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: "Inter, sans-serif", fontSize: "clamp(32px, 4vw, 56px)",
          fontWeight: 700, color: "#FFFFFF", lineHeight: 1.1, marginBottom: "24px",
          letterSpacing: "-0.02em"
        }}>
          {displayData.title}
        </h1>

        {/* Excerpt */}
        <p style={{
          fontFamily: "Inter, sans-serif", fontSize: "18px", color: "#6B7280",
          lineHeight: 1.6, marginBottom: "40px",
        }}>
          {displayData.excerpt}
        </p>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(255,255,255,0.1)", marginBottom: "40px" }} />

        {/* Hero Image */}
        <div style={{
          width: "100%", borderRadius: "16px", overflow: "hidden",
          marginBottom: "64px", border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 24px 48px rgba(0,0,0,0.4)"
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={displayData.image}
            alt={displayData.title}
            style={{ width: "100%", height: "auto", maxHeight: "500px", objectFit: "cover", display: "block" }}
          />
        </div>

        {/* Article Body */}
        <div style={{ display: "flex", flexDirection: "column", gap: "56px" }}>
          {displayData.sections.map((section: any, i: number) => (
            <div key={i} className="fade-up">
              {section.heading && (
                <h2 style={{
                  fontFamily: "Inter, sans-serif", fontSize: "24px", fontWeight: 700,
                  color: "#FFFFFF", marginBottom: "18px", lineHeight: 1.3,
                  letterSpacing: "-0.01em"
                }}>
                  {section.heading}
                </h2>
              )}
              <div style={{
                fontFamily: "Inter, sans-serif", fontSize: "16px", color: "#9CA3AF",
                lineHeight: 1.8, whiteSpace: "pre-wrap"
              }}>
                {section.body}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(255,255,255,0.1)", marginTop: "80px", marginBottom: "40px" }} />

        {/* Bottom Back Button */}
        <Link href="/blog" className="blog-back-btn">
          <ArrowLeft style={{ width: "14px", height: "14px" }} />
          Back To All Blogs
        </Link>

      </div>
    </main>
  );
}
