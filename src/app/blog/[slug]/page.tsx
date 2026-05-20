import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts as staticPosts } from "@/lib/blogData";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";
import BlogFaqAccordion from "@/components/ui/BlogFaqAccordion";

interface Props {
  params: Promise<{ slug: string }>;
}

function renderBodyContent(body: string, hasFooter: boolean) {
  const lines = body.split("\n").map(l => l.trim()).filter(Boolean);
  
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%", marginBottom: hasFooter ? "24px" : "0" }}>
      {lines.map((line, idx) => {
        const isBullet = line.startsWith("•") || line.startsWith("-") || line.startsWith("*");
        const isStep = line.startsWith("Step ") || /^\d+\.\s/.test(line) || line.startsWith("💡 Example:") || line.startsWith("✅ Result:");
        const isHighlight = line.startsWith("✅") || line.startsWith("💡");
        
        if (isBullet) {
          return (
            <div
              key={idx}
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "16px",
                color: "var(--color-text-body)",
                lineHeight: 1.8,
                textAlign: "left",
                paddingLeft: "16px",
                display: "flex",
                gap: "8px"
              }}
            >
              <span style={{ color: "var(--color-blue-mid)" }}>•</span>
              <span>{line.replace(/^[•\-\*]\s*/, "")}</span>
            </div>
          );
        }
        
        if (isHighlight) {
          return (
            <div
              key={idx}
              className="premium-blog-highlight"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                margin: "24px auto",
                maxWidth: "680px",
                width: "100%",
                background: "rgba(var(--color-blue-mid-rgb), 0.04)",
                border: "1px solid rgba(var(--color-blue-mid-rgb), 0.15)",
                borderLeft: "4px solid var(--color-blue-mid)",
                borderRadius: "12px",
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "15px",
                color: "var(--color-text-bright)",
                fontStyle: "italic",
                lineHeight: 1.7
              }}
            >
              <span>{line}</span>
            </div>
          );
        }
        
        if (isStep) {
          return (
            <h3
              key={idx}
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "18px",
                fontWeight: 600,
                color: "var(--color-text-bright)",
                lineHeight: 1.4,
                textAlign: "left",
                marginTop: "16px",
                marginBottom: "4px"
              }}
            >
              {line}
            </h3>
          );
        }
        
        return (
          <p
            key={idx}
            className="premium-blog-paragraph"
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "16px",
              color: "var(--color-text-body)",
              lineHeight: 1.8,
              margin: 0
            }}
          >
            {line}
          </p>
        );
      })}
    </div>
  );
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
    <main style={{ background: "var(--color-bg-page)", minHeight: "100vh", paddingTop: "64px", paddingBottom: "120px", color: "var(--color-text-body)" }}>
      <style>{`
        .premium-blog-paragraph {
          text-align: justify;
          text-justify: inter-word;
        }
        .premium-blog-highlight {
          padding: 20px 28px;
        }
        @media (max-width: 768px) {
          .premium-blog-paragraph {
            text-align: left !important;
          }
          .premium-blog-highlight {
            padding: 14px 18px !important;
          }
        }
      `}</style>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px" }}>

        {/* Back Button */}
        <Link href="/blog" className="blog-back-btn">
          <ArrowLeft style={{ width: "14px", height: "14px" }} />
          Back To All Blogs
        </Link>

        {/* Meta */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
          <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "13px", color: "var(--color-text-muted)" }}>
            {displayData.date}
          </span>
          <span style={{
            fontFamily: "var(--font-inter), sans-serif", fontSize: "11px", fontWeight: 600,
            color: "var(--color-text-bright)", padding: "4px 12px", borderRadius: "6px",
            background: "var(--color-bg-card-alt)", border: "1px solid var(--color-border)",
            textTransform: "uppercase", letterSpacing: "0.05em"
          }}>
            {displayData.category}
          </span>
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: "var(--font-inter), sans-serif", fontSize: "clamp(32px, 4vw, 56px)",
          fontWeight: 700, color: "var(--color-text-bright)", lineHeight: 1.1, marginBottom: "24px",
          letterSpacing: "-0.02em"
        }}>
          {displayData.title}
        </h1>

        {/* Excerpt */}
        <p style={{
          fontFamily: "var(--font-inter), sans-serif", fontSize: "18px", color: "var(--color-text-muted)",
          lineHeight: 1.6, marginBottom: "40px",
        }}>
          {displayData.excerpt}
        </p>

        {/* Divider */}
        <div style={{ height: "1px", background: "var(--color-border)", marginBottom: "40px" }} />

        {/* Hero Image */}
        <div style={{
          width: "100%", maxWidth: "100%", boxSizing: "border-box",
          borderRadius: "16px", overflow: "hidden",
          marginBottom: "64px", border: "1px solid var(--color-border)",
          boxShadow: "var(--shadow-md)"
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={displayData.image}
            alt={displayData.title}
            style={{ width: "100%", maxWidth: "100%", height: "auto", display: "block" }}
          />
        </div>

        {/* Article Body */}
        <div style={{ display: "flex", flexDirection: "column", gap: "56px" }}>
          {displayData.sections.map((section: any, i: number) => (
            <div key={i} className="fade-up" style={{ display: "flex", flexDirection: "column" }}>
              {section.heading && (
                <h2 style={{
                  fontFamily: "var(--font-inter), sans-serif", fontSize: "24px", fontWeight: 700,
                  color: "var(--color-text-bright)", marginBottom: "18px", lineHeight: 1.3,
                  letterSpacing: "-0.01em"
                }}>
                  {section.heading}
                </h2>
              )}
              {renderBodyContent(section.body, !!(section.image || section.cta))}

              {/* Section Inline Image */}
              {section.image && (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%", marginTop: "12px", marginBottom: "24px" }}>
                  <div style={{
                    width: "100%", borderRadius: "12px", overflow: "hidden",
                    border: "1px solid var(--color-border)",
                    boxShadow: "var(--shadow-sm)"
                  }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={section.image}
                      alt={section.imageCaption || section.heading}
                      style={{ width: "100%", height: "auto", objectFit: "cover", display: "block" }}
                    />
                  </div>
                  {section.imageCaption && (
                    <span style={{
                      fontFamily: "var(--font-inter), sans-serif", fontSize: "13px",
                      color: "var(--color-text-muted)", textAlign: "center", fontStyle: "italic"
                    }}>
                      {section.imageCaption}
                    </span>
                  )}
                </div>
              )}

              {/* Section CTA Button (Horizontally Centered) */}
              {section.cta && (
                <div style={{ marginTop: "24px", marginBottom: "24px", display: "flex", justifyContent: "center", width: "100%" }}>
                  <a
                    href={section.cta.link}
                    download={section.cta.isDownload}
                    className="blog-section-cta-btn"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "12px 24px",
                      borderRadius: "8px",
                      background: "linear-gradient(135deg, var(--color-blue-mid) 0%, #1e40af 100%)",
                      color: "#ffffff",
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: "14px",
                      fontWeight: 600,
                      textDecoration: "none",
                      boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <span>{section.cta.text}</span>
                    {section.cta.isDownload ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    )}
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* FAQ Accordion Section */}
        {displayData.faqs && displayData.faqs.length > 0 && (
          <div style={{ marginTop: "80px" }}>
            <h2 style={{
              fontFamily: "var(--font-inter), sans-serif", fontSize: "28px", fontWeight: 700,
              color: "var(--color-text-bright)", marginBottom: "32px", lineHeight: 1.3,
              letterSpacing: "-0.02em"
            }}>
              FAQs About AI SDR Automation
            </h2>
            <BlogFaqAccordion faqData={displayData.faqs} />
          </div>
        )}

        {/* Divider */}
        <div style={{ height: "1px", background: "var(--color-border)", marginTop: "80px", marginBottom: "40px" }} />

        {/* Bottom Back Button */}
        <Link href="/blog" className="blog-back-btn">
          <ArrowLeft style={{ width: "14px", height: "14px" }} />
          Back To All Blogs
        </Link>

      </div>
    </main>
  );
}
