import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { blogPosts as staticPosts } from "@/lib/blogData";
import { supabase } from "@/lib/supabase";
import { BLOG_SLUG_DB_ALIASES, EXCLUDED_BLOG_SLUGS } from "@/lib/slugConfig";
import BlogFaqAccordion from "@/components/ui/BlogFaqAccordion";
import BlogBodyClient, { BlogHeroImage } from "@/components/ui/BlogBodyClient";
import JsonLd from "@/components/SEO/JsonLd";
import { BeamsBackground } from "@/components/ui/beams-background";
import ZVSteelsCaseStudy from "@/components/case-studies/ZVSteelsCaseStudy";
import ASquaredCaseStudy from "@/components/case-studies/ASquaredCaseStudy";
import LotusManorCaseStudy from "@/components/case-studies/LotusManorCaseStudy";
import LootahCaseStudy from "@/components/case-studies/LootahCaseStudy";
import MacroMediaCaseStudy from "@/components/case-studies/MacroMediaCaseStudy";
import BennettRealtyCaseStudy from "@/components/case-studies/BennettRealtyCaseStudy";
import VictoryEnergyCaseStudy from "@/components/case-studies/VictoryEnergyCaseStudy";
import RyanSchwartzCaseStudy from "@/components/case-studies/RyanSchwartzCaseStudy";
import MiguelCaseStudy from "@/components/case-studies/MiguelCaseStudy";
import WWRCaseStudy from "@/components/case-studies/WWRCaseStudy";

export type ExpectedContentType = "blog" | "case-study";

async function fetchDbPostBySlug(slug: string) {
  const candidateSlugs = BLOG_SLUG_DB_ALIASES[slug] || [slug];
  const { data } = await supabase
    .from("website_content")
    .select("*")
    .in("slug", candidateSlugs)
    .eq("status", "published")
    .limit(1);
  return data && data.length > 0 ? data[0] : null;
}

/** Generates metadata for canonical /resources/blog/[slug] and /resources/case-studies/[slug] routes. */
export async function generateArticleMetadata(
  slug: string,
  expectedType: ExpectedContentType
): Promise<Metadata> {
  if (EXCLUDED_BLOG_SLUGS.has(slug)) {
    return {
      title: "Not Found",
      robots: { index: false, follow: false },
    };
  }

  const sPost = staticPosts.find((p) => p.slug === slug);
  const isStaticCaseStudy = sPost?.category === "Case Study";

  if (expectedType === "case-study") {
    if (!sPost || !isStaticCaseStudy) return { title: "Not Found" };
    const title = sPost.metaTitle || `${sPost.title} | ScalePods Case Study`;
    const description = sPost.metaDescription || sPost.excerpt;
    const canonicalUrl = `https://www.scalepods.co/resources/case-studies/${slug}`;

    return {
      title,
      description,
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title,
        description,
        url: canonicalUrl,
        type: "article",
        images: [
          {
            url: sPost.image.startsWith("http")
              ? sPost.image
              : `https://www.scalepods.co${sPost.image}`,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    };
  }

  // Blog article route
  const canonicalUrl = `https://www.scalepods.co/resources/blog/${slug}`;
  const dbPost = await fetchDbPostBySlug(slug);
  if (dbPost) {
    let bodyMeta: any = {};
    try {
      const parsed = JSON.parse(dbPost.body);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) bodyMeta = parsed;
    } catch {
      // legacy body shapes
    }
    const title = bodyMeta.metaTitle || `${dbPost.title} – ScalePods Blog`;
    const description = bodyMeta.metaDescription || dbPost.excerpt;
    return {
      title,
      description,
      alternates: { canonical: canonicalUrl },
      openGraph: { title, description, url: canonicalUrl, type: "article" },
    };
  }

  if (!sPost || isStaticCaseStudy) return { title: "Not Found" };
  const title = sPost.metaTitle || `${sPost.title} – ScalePods Blog`;
  const description = sPost.metaDescription || sPost.excerpt;
  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: { title, description, url: canonicalUrl, type: "article" },
  };
}

/** Shared page renderer for canonical /resources/blog/[slug] and /resources/case-studies/[slug] routes. */
export default async function ArticlePageRenderer({
  slug,
  expectedType,
}: {
  slug: string;
  expectedType: ExpectedContentType;
}) {
  if (EXCLUDED_BLOG_SLUGS.has(slug)) notFound();

  let displayData: any = null;

  if (expectedType === "blog") {
    const post = await fetchDbPostBySlug(slug);
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

      if (sections.length === 0 && (!post.body || post.body.trim() === "[]" || post.body.trim() === "")) {
        notFound();
      }

      displayData = {
        title: post.title,
        excerpt: post.excerpt,
        date: new Date(post.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
        category: post.category || "Article",
        image: post.hero_image,
        imageDark: post.hero_image_dark || bodyMeta.bannerUrlDark || bodyMeta.banner_url_dark || post.hero_image,
        imageLight: post.hero_image_light || bodyMeta.bannerUrlLight || bodyMeta.banner_url_light || post.hero_image,
        ctaTitle: post.cta_title || bodyMeta.ctaTitle || bodyMeta.cta_title,
        ctaSubtitle: post.cta_subtitle || bodyMeta.ctaSubtitle || bodyMeta.cta_subtitle,
        ctaLabel: post.cta_label || bodyMeta.ctaLabel || bodyMeta.cta_label,
        ctaUrl: post.cta_url || bodyMeta.ctaUrl || bodyMeta.cta_url,
        sections,
        faqs: bodyMeta.faqs || [],
        faqHeading: "Frequently Asked Questions",
      };
    } else {
      const sPost = staticPosts.find((p) => p.slug === slug && p.category !== "Case Study");
      if (!sPost) notFound();
      displayData = { ...sPost, image: sPost.image };
    }
  } else {
    const sPost = staticPosts.find((p) => p.slug === slug && p.category === "Case Study");
    if (!sPost) notFound();
    displayData = { ...sPost, image: sPost.image };
  }

  const isCaseStudyPost = displayData.category === "Case Study";
  const pageCanonicalUrl = isCaseStudyPost
    ? `https://www.scalepods.co/resources/case-studies/${slug}`
    : `https://www.scalepods.co/resources/blog/${slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageCanonicalUrl,
    },
    headline: displayData.title,
    description: displayData.excerpt,
    image: (displayData.image || "").startsWith("http")
      ? displayData.image
      : `https://www.scalepods.co${displayData.image || "/scalepods-logo.png"}`,
    datePublished: displayData.date ? new Date(displayData.date).toISOString() : new Date().toISOString(),
    author: {
      "@type": "Organization",
      name: "ScalePods",
      url: "https://www.scalepods.co",
    },
    publisher: {
      "@type": "Organization",
      name: "ScalePods",
      logo: {
        "@type": "ImageObject",
        url: "https://www.scalepods.co/scalepods-logo.png",
      },
    },
  };

  const faqSchema =
    displayData.faqs && displayData.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: displayData.faqs.map((f: any) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.a,
            },
          })),
        }
      : null;

  const isLotusManorCaseStudy = slug === "lotus-manor-real-estate-sales-automation-dubai";
  const isZVSteelsCaseStudy = slug === "zv-steels-recruitment-automation-tool";
  const isASquaredCaseStudy = slug === "asquared-real-estate-sales-automation-dubai";
  const isLootahCaseStudy = slug === "lootah-group-procurement-workflow-automation";
  const isMacroMediaCaseStudy = slug === "macro-media-finance-workflow-automation";
  const isBennettRealtyCaseStudy = slug === "bennett-realty-real-estate-workflow-automation";
  const isVictoryEnergyCaseStudy = slug === "victory-energy-business-automation";
  const isRyanCaseStudy = slug === "ryan-schwartz-fub-crm-automation";
  const isMiguelCaseStudy = slug === "miguel-clinic-lead-generation-automation";
  const isWWRCaseStudy = slug === "wwr-real-estate-sales-automation-qatar";
  const isCustomCaseStudy =
    isLotusManorCaseStudy ||
    isZVSteelsCaseStudy ||
    isASquaredCaseStudy ||
    isLootahCaseStudy ||
    isMacroMediaCaseStudy ||
    isBennettRealtyCaseStudy ||
    isVictoryEnergyCaseStudy ||
    isRyanCaseStudy ||
    isMiguelCaseStudy ||
    isWWRCaseStudy;

  const candidatePosts = staticPosts.filter((p) => p.slug !== slug && p.category !== "Case Study");
  const currentIndex = Math.max(0, staticPosts.findIndex((p) => p.slug === slug));
  const startIndex = candidatePosts.length > 3 ? currentIndex % (candidatePosts.length - 2) : 0;
  const relatedPosts = candidatePosts.slice(startIndex, startIndex + 3);

  return (
    <main style={{ minHeight: "100vh", color: "var(--color-text-body)" }}>
      <JsonLd data={articleSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}
      <style>{`
        .workflow-preview-dark { display: none !important; }
        .workflow-preview-light { display: block !important; }
        .dark .workflow-preview-dark,
        [data-theme="dark"] .workflow-preview-dark { display: block !important; }
        .dark .workflow-preview-light,
        [data-theme="dark"] .workflow-preview-light { display: none !important; }
        .premium-blog-paragraph { text-align: justify; text-align-last: left; text-justify: inter-word; }
        .premium-blog-highlight { padding: 20px 28px; }
        .vinay-overlay { background: rgba(255, 255, 255, 0.95); color: #0f172a; border: 1px solid rgba(15, 23, 42, 0.08); }
        .dark .vinay-overlay,
        [data-theme="dark"] .vinay-overlay { background: rgba(15, 23, 42, 0.95) !important; color: #ffffff !important; border: 1px solid rgba(255, 255, 255, 0.08) !important; }
        .vinay-name { color: #0f172a; }
        .dark .vinay-name,
        [data-theme="dark"] .vinay-name { color: #ffffff !important; }
        .vinay-title { color: #475569; }
        .dark .vinay-title,
        [data-theme="dark"] .vinay-title { color: #94a3b8 !important; }
        @media (max-width: 768px) {
          .premium-blog-paragraph { text-align: left !important; }
          .premium-blog-highlight { padding: 14px 18px !important; }
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
            <div className={isCustomCaseStudy ? "px-6 md:px-10" : ""}>
              <Link href={isCustomCaseStudy ? "/resources/case-studies" : "/resources/blog"} className="blog-back-btn">
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
            ) : isRyanCaseStudy ? (
              <RyanSchwartzCaseStudy faqs={displayData.faqs} />
            ) : isMiguelCaseStudy ? (
              <MiguelCaseStudy faqs={displayData.faqs} />
            ) : isWWRCaseStudy ? (
              <WWRCaseStudy faqs={displayData.faqs} />
            ) : (
              <>
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

                <h1 style={{
                  fontFamily: "var(--font-inter), sans-serif", fontSize: "clamp(32px, 4vw, 56px)",
                  fontWeight: 700, color: "var(--color-text-bright)", lineHeight: 1.1, marginBottom: "24px",
                  letterSpacing: "-0.02em"
                }}>
                  {displayData.title}
                </h1>

                <p style={{
                  fontFamily: "var(--font-inter), sans-serif", fontSize: "18px", color: "var(--color-text-muted)",
                  lineHeight: 1.6, marginBottom: "40px",
                }}>
                  {displayData.excerpt}
                </p>

                <div style={{ height: "1px", background: "var(--color-border)", marginBottom: "40px" }} />

                <BlogHeroImage
                  image={displayData.image}
                  imageDark={displayData.imageDark}
                  imageLight={displayData.imageLight}
                  title={displayData.title}
                />
              </>
            )}

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
                      href={`/resources/blog/${rp.slug}`}
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

            <div style={{
              height: "1px",
              background: "var(--color-border)",
              marginTop: isCustomCaseStudy ? "32px" : "40px",
              marginBottom: isCustomCaseStudy ? "24px" : "40px"
            }} />

            <div className={isCustomCaseStudy ? "px-6 md:px-10" : ""}>
              <Link href={isCustomCaseStudy ? "/resources/case-studies" : "/resources/blog"} className="blog-back-btn">
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
