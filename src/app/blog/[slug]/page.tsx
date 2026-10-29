import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts as staticPosts } from "@/lib/blogData";
import { ArrowLeft, Database, Workflow, Inbox, ArrowUpRight, Zap, Cpu, MessageSquare, UserCheck, Eye } from "lucide-react";
import { supabase } from "@/lib/supabase";
import BlogFaqAccordion from "@/components/ui/BlogFaqAccordion";
import BlogBodyClient, { BlogHeroImage } from "@/components/ui/BlogBodyClient";
import AnimatedMetric from "@/components/ui/AnimatedMetric";
import JsonLd from "@/components/SEO/JsonLd";
import CaseStudyVideoPlayer from "@/components/ui/CaseStudyVideoPlayer";
import { BeamsBackground } from "@/components/ui/beams-background";
import ZVSteelsCaseStudy from "@/components/case-studies/ZVSteelsCaseStudy";
import ASquaredCaseStudy from "@/components/case-studies/ASquaredCaseStudy";
import LotusManorCaseStudy from "@/components/case-studies/LotusManorCaseStudy";
import LootahCaseStudy from "@/components/case-studies/LootahCaseStudy";
import MacroMediaCaseStudy from "@/components/case-studies/MacroMediaCaseStudy";
import BennettRealtyCaseStudy from "@/components/case-studies/BennettRealtyCaseStudy";
import VictoryEnergyCaseStudy from "@/components/case-studies/VictoryEnergyCaseStudy";

// Without this, a dynamic (DB-backed) post's page gets ISR-cached on first visit and then keeps
// serving that stale snapshot indefinitely -- publish's revalidatePath(`/blog/${slug}`) call is
// not enough on its own to force a fresh render on every request for a route with no explicit
// revalidate export. blog/page.tsx (the listing) already has this; this file never did, which is
// why a real published post kept showing its pre-publish state (title/meta especially) well past
// any reasonable cache window. Matches the listing page's fix exactly.
export const revalidate = 0; // Force dynamic fetching for real-time updates

interface Props {
  params: Promise<{ slug: string }>;
}

function parseMarkdownInline(text: string) {
  if (!text) return text;
  const regex = /(\[.*?\]\(.*?\)|\*\*.*?\*\*|`.*?`|\*.*?\*)/g;
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (!part) return null;
    if (part.startsWith("[") && part.includes("](") && part.endsWith(")")) {
      const match = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (match) {
        const [, linkText, url] = match;
        return (
          <Link
            key={index}
            href={url}
            style={{
              color: "var(--color-blue-mid)",
              textDecoration: "underline",
              fontWeight: 600
            }}
          >
            {linkText}
          </Link>
        );
      }
    }
    if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
      return (
        <strong key={index} style={{ fontWeight: 700, color: "var(--color-text-bright)" }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
      return (
        <code
          key={index}
          style={{
            fontFamily: "monospace",
            fontSize: "0.88em",
            padding: "3px 8px",
            borderRadius: "6px",
            background: "rgba(var(--color-blue-mid-rgb), 0.08)",
            color: "var(--color-blue-mid)",
            border: "1px solid rgba(var(--color-blue-mid-rgb), 0.2)",
            wordBreak: "break-word"
          }}
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith("*") && part.endsWith("*") && !part.startsWith("**") && part.length >= 2) {
      return (
        <em key={index} style={{ fontStyle: "italic", color: "var(--color-text-body)" }}>
          {part.slice(1, -1)}
        </em>
      );
    }
    // Clean any stray ** from remaining plain text parts
    return part.replace(/\*\*/g, "");
  });
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
          const bulletText = line.replace(/^[•\-\*]\s*/, "");

          // Case 1: **Heading:** Description OR **Heading**: Description
          const boldHeadingMatch = bulletText.match(/^\*\*(.*?)\*\*:?\s*([\s\S]*)/) || bulletText.match(/^\*\*(.*?):\*\*\s*([\s\S]*)/);

          if (boldHeadingMatch) {
            let [, heading, desc] = boldHeadingMatch;
            heading = heading.replace(/:\s*$/, "").replace(/\*\*/g, "").trim();
            desc = desc.replace(/^\*\*/, "").replace(/\*\*/g, "").trim();

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
                <span style={{ color: "var(--color-blue-mid)", flexShrink: 0 }}>•</span>
                <span>
                  <strong style={{ color: "var(--color-text-bright)", fontWeight: 700 }}>{heading}:</strong> {parseMarkdownInline(desc)}
                </span>
              </div>
            );
          }

          // Case 2: Heading: Description (Plain text heading with colon)
          const colonIdx = bulletText.indexOf(":");
          if (colonIdx !== -1 && colonIdx < 80) {
            let headingPart = bulletText.substring(0, colonIdx).trim();
            let descPart = bulletText.substring(colonIdx + 1).trim();
            headingPart = headingPart.replace(/^\*\*/, "").replace(/\*\*$/, "").replace(/\*\*/g, "").trim();
            descPart = descPart.replace(/^\*\*/, "").replace(/\*\*/g, "").trim();

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
                <span style={{ color: "var(--color-blue-mid)", flexShrink: 0 }}>•</span>
                <span>
                  <strong style={{ color: "var(--color-text-bright)", fontWeight: 700 }}>{headingPart}:</strong> {parseMarkdownInline(descPart)}
                </span>
              </div>
            );
          }

          // Case 3: Regular bullet without colon
          const cleanBulletText = bulletText.replace(/^\*\*/, "").replace(/\*\*$/, "").trim();
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
              <span style={{ color: "var(--color-blue-mid)", flexShrink: 0 }}>•</span>
              <span>{parseMarkdownInline(cleanBulletText)}</span>
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
                borderWidth: "1px 1px 1px 4px",
                borderStyle: "solid",
                borderColor: "rgba(var(--color-blue-mid-rgb), 0.15) rgba(var(--color-blue-mid-rgb), 0.15) rgba(var(--color-blue-mid-rgb), 0.15) var(--color-blue-mid)",
                borderRadius: "12px",
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "15px",
                color: "var(--color-text-bright)",
                fontStyle: "italic",
                lineHeight: 1.7
              }}
            >
              <span>{parseMarkdownInline(line)}</span>
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
              {parseMarkdownInline(line)}
            </h3>
          );
        }
        
        const isCentered = line.startsWith("👉") || line.includes("You're not buying software") || line.includes("You're building a workforce");
        
        return (
          <p
            key={idx}
            className="premium-blog-paragraph"
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "16px",
              color: "var(--color-text-body)",
              lineHeight: 1.8,
              margin: 0,
              textAlign: isCentered ? "center" : "left",
              textAlignLast: isCentered ? "center" : "left"
            }}
          >
            {parseMarkdownInline(line)}
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
  const sPost = staticPosts.find((p) => p.slug === slug);
  const isCaseStudy = sPost?.category === "Case Study";
  const canonicalUrl = isCaseStudy
    ? `https://www.scalepods.co/case-study/${slug}`
    : `https://www.scalepods.co/blog/${slug}`;

  const { data: post } = await supabase.from("website_content").select("title, excerpt, body").eq("slug", slug).single();
  if (post) {
    let bodyMeta: any = {};
    try {
      const parsed = JSON.parse(post.body);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) bodyMeta = parsed;
    } catch {
      // legacy body shapes
    }
    const title = bodyMeta.metaTitle || `${post.title} – ScalePods Blog`;
    const description = bodyMeta.metaDescription || post.excerpt;
    return {
      title,
      description,
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title,
        description,
        url: canonicalUrl,
        type: "article",
      },
    };
  }
  if (!sPost) return { title: "Not Found" };
  const title = sPost.metaTitle || `${sPost.title} – ScalePods Blog`;
  const description = sPost.metaDescription || sPost.excerpt;
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const { data: post } = await supabase.from("website_content").select("*").eq("slug", slug).single();

  let displayData: any = null;
  if (post) {
    let sections = [];
    let bodyMeta: any = {};
    try {
      const parsed = JSON.parse(post.body);
      if (Array.isArray(parsed)) {
        sections = parsed;
      } else if (parsed && typeof parsed === "object") {
        sections = parsed.sections || [];
        bodyMeta = parsed;
      }
    } catch {
      sections = [{ heading: "", body: post.body }];
    }

    const heroImageDark = post.hero_image_dark || bodyMeta.bannerUrlDark || bodyMeta.banner_url_dark || post.hero_image;
    const heroImageLight = post.hero_image_light || bodyMeta.bannerUrlLight || bodyMeta.banner_url_light || post.hero_image;
    const ctaTitle = post.cta_title || bodyMeta.ctaTitle || bodyMeta.cta_title;
    const ctaSubtitle = post.cta_subtitle || bodyMeta.ctaSubtitle || bodyMeta.cta_subtitle;
    const ctaLabel = post.cta_label || bodyMeta.ctaLabel || bodyMeta.cta_label;
    const ctaUrl = post.cta_url || bodyMeta.ctaUrl || bodyMeta.cta_url;

    displayData = {
      title: post.title,
      excerpt: post.excerpt,
      date: new Date(post.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      category: post.category || "Article",
      image: post.hero_image,
      imageDark: heroImageDark,
      imageLight: heroImageLight,
      ctaTitle: ctaTitle,
      ctaSubtitle: ctaSubtitle,
      ctaLabel: ctaLabel,
      ctaUrl: ctaUrl,
      sections: sections,
      // { q, a }[] for BlogFaqAccordion (added 2026-09-04) — written by the Growth OS composer's
      // publish route into body's JSON wrapper alongside sections/ctaTitle/etc.
      faqs: bodyMeta.faqs || [],
      // Static posts get their FAQ heading from the keyword ternary below (tied to specific
      // legacy titles) — a dynamic post has no such hand-authored heading, so it always gets this
      // generic one instead of falling through that ternary's final (wrong-for-us) case.
      faqHeading: "Frequently Asked Questions"
    };
  } else {
    const sPost = staticPosts.find((p) => p.slug === slug);
    if (!sPost) notFound();
    displayData = { ...sPost, image: sPost.image };
  }

  const isCaseStudyPost = displayData.category === "Case Study";
  const pageCanonicalUrl = isCaseStudyPost
    ? `https://www.scalepods.co/case-study/${slug}`
    : `https://www.scalepods.co/blog/${slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": pageCanonicalUrl
    },
    "headline": displayData.title,
    "description": displayData.excerpt,
    "image": displayData.image.startsWith("http") ? displayData.image : `https://www.scalepods.co${displayData.image}`,
    "datePublished": displayData.date ? new Date(displayData.date).toISOString() : new Date().toISOString(),
    "author": {
      "@type": "Organization",
      "name": "ScalePods",
      "url": "https://www.scalepods.co"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ScalePods",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.scalepods.co/scalepods-logo.png"
      }
    }
  };

  const faqSchema = displayData.faqs && displayData.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": displayData.faqs.map((f: any) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  } : null;

  const isLotusManorCaseStudy = slug === "lotus-manor-real-estate-sales-automation-dubai";
  const isZVSteelsCaseStudy = slug === "zv-steels-recruitment-automation-tool";
  const isASquaredCaseStudy = slug === "asquared-real-estate-sales-automation-dubai";
  const isLootahCaseStudy = slug === "lootah-group-procurement-workflow-automation";
  const isMacroMediaCaseStudy = slug === "macro-media-finance-workflow-automation";
  const isBennettRealtyCaseStudy = slug === "bennett-realty-growth-os";
  const isVictoryEnergyCaseStudy = slug === "victory-energy-business-automation";
  const isCustomCaseStudy = isLotusManorCaseStudy || isZVSteelsCaseStudy || isASquaredCaseStudy || isLootahCaseStudy || isMacroMediaCaseStudy || isBennettRealtyCaseStudy || isVictoryEnergyCaseStudy;

  const candidatePosts = staticPosts.filter(p => p.slug !== slug && p.category !== "Case Study");
  const currentIndex = Math.max(0, staticPosts.findIndex(p => p.slug === slug));
  const startIndex = candidatePosts.length > 3 ? (currentIndex % (candidatePosts.length - 2)) : 0;
  const relatedPosts = candidatePosts.slice(startIndex, startIndex + 3);

  return (
    <main style={{ minHeight: "100vh", color: "var(--color-text-body)" }}>
      <JsonLd data={articleSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}
      <style>{`
        .workflow-preview-dark {
          display: none !important;
        }
        .workflow-preview-light {
          display: block !important;
        }
        .dark .workflow-preview-dark,
        [data-theme="dark"] .workflow-preview-dark {
          display: block !important;
        }
        .dark .workflow-preview-light,
        [data-theme="dark"] .workflow-preview-light {
          display: none !important;
        }
        .premium-blog-paragraph {
          text-align: justify;
          text-align-last: left;
          text-justify: inter-word;
        }
        .premium-blog-highlight {
          padding: 20px 28px;
        }
        .vinay-overlay {
          background: rgba(255, 255, 255, 0.95);
          color: #0f172a;
          border: 1px solid rgba(15, 23, 42, 0.08);
        }
        .dark .vinay-overlay,
        [data-theme="dark"] .vinay-overlay {
          background: rgba(15, 23, 42, 0.95) !important;
          color: #ffffff !important;
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
        }
        .vinay-name {
          color: #0f172a;
        }
        .dark .vinay-name,
        [data-theme="dark"] .vinay-name {
          color: #ffffff !important;
        }
        .vinay-title {
          color: #475569;
        }
        .dark .vinay-title,
        [data-theme="dark"] .vinay-title {
          color: #94a3b8 !important;
        }
        @media (max-width: 768px) {
          .premium-blog-paragraph {
            text-align: left !important;
          }
          .premium-blog-highlight {
            padding: 14px 18px !important;
          }
        }
        .why-scalepods-card {
          border-radius: 28px;
          padding: 36px 32px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
          background: rgba(15, 23, 42, 0.02);
          border: 1px solid rgba(15, 23, 42, 0.06);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.01), inset 0 1px 0 rgba(255, 255, 255, 0.6);
        }
        .dark .why-scalepods-card,
        [data-theme="dark"] .why-scalepods-card {
          background: rgba(255, 255, 255, 0.02) !important;
          border: 1px solid rgba(255, 255, 255, 0.06) !important;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.03) !important;
        }
        .why-scalepods-card:hover {
          transform: translateY(-4px);
          border-color: var(--color-blue-mid) !important;
          box-shadow: 0 20px 35px rgba(0, 0, 0, 0.04) !important;
        }
        .dark .why-scalepods-card:hover,
        [data-theme="dark"] .why-scalepods-card:hover {
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05) !important;
        }
        .why-scalepods-icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(15, 23, 42, 0.03);
          border: 1px solid rgba(15, 23, 42, 0.08);
          color: var(--color-blue-mid);
        }
        .dark .why-scalepods-icon-wrapper,
        [data-theme="dark"] .why-scalepods-icon-wrapper {
          background: rgba(255, 255, 255, 0.04) !important;
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
          color: #60a5fa !important;
        }
      `}</style>
      <BeamsBackground hues={[200, 210, 225]} intensity="strong">
        <div style={{ paddingTop: "64px", paddingBottom: isCustomCaseStudy ? "64px" : "120px" }}>
          <div style={{ maxWidth: isCustomCaseStudy ? "1200px" : "800px", margin: "0 auto", padding: "0 24px" }}>

        {/* Back Button */}
        <div className={isCustomCaseStudy ? "px-6 md:px-10" : ""}>
          <Link href={isCustomCaseStudy ? "/blog/case-studies" : "/blog"} className="blog-back-btn">
            <ArrowLeft style={{ width: "14px", height: "14px" }} />
            {isCustomCaseStudy ? "Back To Case Studies" : "Back To All Blogs"}
          </Link>
        </div>

        {isZVSteelsCaseStudy ? (
          <ZVSteelsCaseStudy faqs={displayData.faqs} />
        ) : isASquaredCaseStudy ? (
          <ASquaredCaseStudy faqs={displayData.faqs} />
        ) : isLotusManorCaseStudy ? (
          <LotusManorCaseStudy faqs={displayData.faqs} />
        ) : isLootahCaseStudy ? (
          <LootahCaseStudy faqs={displayData.faqs} />
        ) : isMacroMediaCaseStudy ? (
          <MacroMediaCaseStudy faqs={displayData.faqs} />
        ) : isBennettRealtyCaseStudy ? (
          <BennettRealtyCaseStudy faqs={displayData.faqs} />
        ) : isVictoryEnergyCaseStudy ? (
          <VictoryEnergyCaseStudy faqs={displayData.faqs} />
        ) : (
          <>
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
            <BlogHeroImage
              image={displayData.image}
              imageDark={displayData.imageDark}
              imageLight={displayData.imageLight}
              title={displayData.title}
            />
          </>
        )}

        {/* Article Body */}
        {!isCustomCaseStudy && (
          <BlogBodyClient
            sections={displayData.sections}
            slug={slug}
            articleTitle={displayData.title}
            ctaTitle={displayData.ctaTitle}
            ctaSubtitle={displayData.ctaSubtitle}
            ctaLabel={displayData.ctaLabel}
            ctaUrl={displayData.ctaUrl}
          />
        )}

        {/* FAQ Accordion Section */}
        {!isCustomCaseStudy && displayData.faqs && displayData.faqs.length > 0 && (
          <div style={{ marginTop: "80px" }}>
            <h2 style={{
              fontFamily: "var(--font-inter), sans-serif", fontSize: "28px", fontWeight: 700,
              color: "var(--color-text-bright)", marginBottom: "32px", lineHeight: 1.3,
              letterSpacing: "-0.02em"
            }}>
              {displayData.faqHeading ?? (
                displayData.title.includes("ROI") || slug.includes("roi")
                  ? "FAQs"
                  : displayData.title === "HR Automation: The Complete Guide for 2026"
                  ? "FAQs About HR Automation"
                  : displayData.title.includes("Sales Automation")
                  ? "FAQs About Sales Automation"
                  : displayData.title.includes("Sales Workflow")
                  ? "FAQs About Sales Workflow Automation"
                  : displayData.title.includes("Marketing")
                  ? "FAQs About Marketing Automation"
                  : "FAQs About AI SDR Automation"
              )}
            </h2>
            <BlogFaqAccordion faqData={displayData.faqs} />
          </div>
        )}

        {/* Related Articles Section for Internal Link Architecture */}
        {!isCustomCaseStudy && relatedPosts.length > 0 && (
          <div style={{ marginTop: "70px", marginBottom: "30px" }}>
            <h3 style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "22px",
              fontWeight: 700,
              color: "var(--color-text-bright)",
              marginBottom: "20px",
              letterSpacing: "-0.02em"
            }}>
              Related Insights &amp; Guides
            </h3>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "20px"
            }}>
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "20px",
                    borderRadius: "14px",
                    background: "var(--color-bg-card)",
                    border: "1px solid var(--color-border)",
                    textDecoration: "none",
                    transition: "all 0.25s ease",
                  }}
                  className="hover:border-[var(--color-green)]"
                >
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-green-text)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>
                    {rp.category}
                  </span>
                  <h4 style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "var(--color-text-bright)",
                    lineHeight: 1.4,
                    margin: 0
                  }}>
                    {rp.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        <div style={{
          height: "1px",
          background: "var(--color-border)",
          marginTop: isCustomCaseStudy ? "32px" : "40px",
          marginBottom: isCustomCaseStudy ? "24px" : "40px"
        }} />

        {/* Bottom Back Button */}
        <div className={isCustomCaseStudy ? "px-6 md:px-10" : ""}>
          <Link href={isCustomCaseStudy ? "/blog/case-studies" : "/blog"} className="blog-back-btn">
            <ArrowLeft style={{ width: "14px", height: "14px" }} />
            {isCustomCaseStudy ? "Back To Case Studies" : "Back To All Blogs"}
          </Link>
        </div>

          </div>
        </div>
      </BeamsBackground>
    </main>
  );
}
