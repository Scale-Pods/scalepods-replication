import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts as staticPosts } from "@/lib/blogData";
import { ArrowLeft, Database, Workflow, Inbox, ArrowUpRight, Zap, Cpu } from "lucide-react";
import { supabase } from "@/lib/supabase";
import BlogFaqAccordion from "@/components/ui/BlogFaqAccordion";
import BlogBodyClient from "@/components/ui/BlogBodyClient";
import AnimatedMetric from "@/components/ui/AnimatedMetric";
import JsonLd from "@/components/SEO/JsonLd";
import CaseStudyVideoPlayer from "@/components/ui/CaseStudyVideoPlayer";
import { BeamsBackground } from "@/components/ui/beams-background";

interface Props {
  params: Promise<{ slug: string }>;
}

function parseMarkdownInline(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index} style={{ fontWeight: 700, color: "var(--color-text-bright)" }}>{part.slice(2, -2)}</strong>;
    }
    return part;
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
          const colonIdx = bulletText.indexOf(":");
          if (colonIdx !== -1) {
            const headingPart = bulletText.substring(0, colonIdx);
            const descPart = bulletText.substring(colonIdx + 1);
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
                <span>
                  <strong style={{ color: "var(--color-text-bright)", fontWeight: 700 }}>{headingPart}:</strong>{parseMarkdownInline(descPart)}
                </span>
              </div>
            );
          }
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
              <span>{parseMarkdownInline(bulletText)}</span>
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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.scalepods.co/blog/${slug}`
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

  const isLotusManorCaseStudy = slug === "lotus-manor-case-study";

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
      <BeamsBackground hues={[210, 185]} intensity="strong">
        <div style={{ paddingTop: "64px", paddingBottom: "120px" }}>
          <div style={{ maxWidth: isLotusManorCaseStudy ? "1150px" : "800px", margin: "0 auto", padding: "0 24px" }}>

        {/* Back Button */}
        <Link href={isLotusManorCaseStudy ? "/blog/case-studies" : "/blog"} className="blog-back-btn">
          <ArrowLeft style={{ width: "14px", height: "14px" }} />
          {isLotusManorCaseStudy ? "Back To Case Studies" : "Back To All Blogs"}
        </Link>

        {isLotusManorCaseStudy ? (
          <>
            {/* Top section: Title, Stats, Testimonial (Full Width) */}
          <div style={{ marginTop: "40px" }}>
            {/* Category */}
            <div style={{
              fontSize: "11px",
              fontWeight: 600,
              color: "var(--color-text-bright)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "16px"
            }}>
              CASE STUDY
            </div>

            {/* Custom Headline */}
            <h1 style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(24px, 3.5vw, 42px)",
              fontWeight: 700,
              color: "var(--color-text-bright)",
              lineHeight: 1.2,
              marginBottom: "32px",
              letterSpacing: "-0.03em"
            }}>
              How Lotus Manor Automated 7,000+ Follow-Ups and Turned Follow-Up Chaos Into a Robust Sales System
            </h1>

            {/* Divider */}
            <div style={{ height: "1px", background: "var(--color-border)", marginBottom: "32px" }} />

            {/* Running Metrics Grid */}
            <div 
              style={{ padding: "8px 0", textAlign: "center" }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
            >
              <div>
                <div style={{ fontSize: "clamp(32px, 3.5vw, 42px)", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", letterSpacing: "-0.02em" }}>
                  <AnimatedMetric value={1000} suffix="+" />
                </div>
                <div style={{ fontSize: "14.5px", color: "var(--color-text-muted)", lineHeight: 1.4, maxWidth: "160px", margin: "0 auto" }}>
                  Prospects reached
                </div>
              </div>
              <div>
                <div style={{ fontSize: "clamp(32px, 3.5vw, 42px)", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", letterSpacing: "-0.02em" }}>
                  <AnimatedMetric value={7000} suffix="+" />
                </div>
                <div style={{ fontSize: "14.5px", color: "var(--color-text-muted)", lineHeight: 1.4, maxWidth: "160px", margin: "0 auto" }}>
                  Follow-ups sent automatically
                </div>
              </div>
              <div>
                <div style={{ fontSize: "clamp(32px, 3.5vw, 42px)", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", letterSpacing: "-0.02em" }}>
                  <AnimatedMetric value={229} />
                </div>
                <div style={{ fontSize: "14.5px", color: "var(--color-text-muted)", lineHeight: 1.4, maxWidth: "160px", margin: "0 auto" }}>
                  Direct responses
                </div>
              </div>
              <div>
                <div style={{ fontSize: "clamp(32px, 3.5vw, 42px)", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", letterSpacing: "-0.02em" }}>
                  <AnimatedMetric value={21} suffix="%" />
                </div>
                <div style={{ fontSize: "14.5px", color: "var(--color-text-muted)", lineHeight: 1.4, maxWidth: "160px", margin: "0 auto" }}>
                  Response rate
                </div>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: "1px", background: "var(--color-border)", marginTop: "32px", marginBottom: "48px" }} />

            {/* Testimonial Card */}
            <div style={{
              borderRadius: "24px",
              border: "1px solid var(--color-border)",
              background: "var(--color-bg-card)",
              padding: "32px",
              marginBottom: "64px",
              boxShadow: "var(--shadow-sm)"
            }}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Left Column: Image with overlay */}
                <div className="md:col-span-5" style={{ position: "relative", width: "100%", aspectRatio: "1", borderRadius: "16px", overflow: "hidden" }}>
                  <img
                    src="/images/blog/vinay-kumar.webp"
                    alt="Vinay Kumar"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                  />
                  {/* Name/Title overlay */}
                  <div className="vinay-overlay" style={{
                    position: "absolute",
                    bottom: "12px",
                    left: "12px",
                    right: "auto",
                    maxWidth: "calc(100% - 24px)",
                    borderRadius: "12px",
                    padding: "12px 16px",
                    backdropFilter: "blur(8px)"
                  }}>
                    <div className="vinay-name" style={{ fontWeight: 700, fontSize: "15px", lineHeight: 1.2, marginBottom: "2px" }}>Vinay Kumar</div>
                    <div className="vinay-title" style={{ fontSize: "12px", fontWeight: 500 }}>Managing Director, Lotus Manor</div>
                  </div>
                </div>

                {/* Right Column: Statement */}
                <div className="md:col-span-7" style={{ paddingLeft: "8px" }}>
                  <blockquote style={{
                    fontSize: "clamp(16px, 2.2vw, 21px)",
                    fontWeight: 400,
                    lineHeight: 1.6,
                    color: "var(--color-text-bright)",
                    fontStyle: "normal",
                    margin: 0
                  }}>
                    “We needed an AI agent that wouldn't embarrass us in front of investors. Scalepods delivered it — and made the process easy. They were quick to respond, quick to iterate, and treated our launch deadline like their own. The kind of partner you want when the work has to be right and the timeline is tight.”
                  </blockquote>
                </div>
              </div>
            </div>
          </div>

          {/* Grid Layout: Challenges and below (Main Content Left, Sidebar Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16" style={{ marginTop: "40px" }}>
            
            {/* Left Column: Challenges & Solutions */}
            <div className="lg:col-span-9">
              {/* Challenges Section */}
              <div style={{ marginBottom: "80px" }}>
                <h2 style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "clamp(24px, 3vw, 32px)",
                  fontWeight: 700,
                  color: "var(--color-text-bright)",
                  marginBottom: "40px",
                  letterSpacing: "-0.02em"
                }}>
                  The Challenges
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Card 1: Image top, Text bottom */}
                  <div style={{
                    background: "var(--color-bg-card-alt)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "24px",
                    padding: "16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px"
                  }}>
                    <div style={{ width: "100%", height: "180px", borderRadius: "16px", overflow: "hidden" }}>
                      <img 
                        src="/images/case-studies/challenge-leakage.png" 
                        alt="Scalability Bottlenecks in Lead Follow-Up" 
                        style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                      />
                    </div>
                    <div style={{
                      background: "var(--color-bg-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "16px",
                      padding: "20px",
                      flex: 1
                    }}>
                      <h3 style={{ fontSize: "14.5px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                        Scalability Bottlenecks in Lead Follow-Up
                      </h3>
                      <p style={{ fontSize: "12.5px", color: "var(--color-text-muted)", lineHeight: 1.5, margin: 0 }}>
                        Despite building a robust database of over 10,000 qualified prospects, the lean sales team struggled to keep pace with growing inbound demand. Relying heavily on manual outreach created operational bottlenecks, making it increasingly difficult to consistently nurture every new lead at scale.
                      </p>
                    </div>
                  </div>

                  {/* Card 2: Text top, Image bottom */}
                  <div style={{
                    background: "var(--color-bg-card-alt)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "24px",
                    padding: "16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px"
                  }}>
                    <div style={{
                      background: "var(--color-bg-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "16px",
                      padding: "20px",
                      flex: 1
                    }}>
                      <h3 style={{ fontSize: "14.5px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                        Untouched High-Intent Opportunities
                      </h3>
                      <p style={{ fontSize: "12.5px", color: "var(--color-text-muted)", lineHeight: 1.5, margin: 0 }}>
                        With an overwhelming volume of contacts and limited hours in the day, timely outreach fell through the cracks. High-intent leads sat untouched in the system, causing lucrative conversion opportunities to slip away and directly impacting the company's bottom-line revenue.
                      </p>
                    </div>
                    <div style={{ width: "100%", height: "180px", borderRadius: "16px", overflow: "hidden" }}>
                      <img 
                        src="/images/case-studies/challenge-followup.png" 
                        alt="Untouched High-Intent Opportunities" 
                        style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                      />
                    </div>
                  </div>

                  {/* Card 3: Image top, Text bottom */}
                  <div style={{
                    background: "var(--color-bg-card-alt)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "24px",
                    padding: "16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px"
                  }}>
                    <div style={{ width: "100%", height: "180px", borderRadius: "16px", overflow: "hidden" }}>
                      <img 
                        src="/images/case-studies/challenge-crm.png" 
                        alt="Inefficiencies in Qualification" 
                        style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                      />
                    </div>
                    <div style={{
                      background: "var(--color-bg-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "16px",
                      padding: "20px",
                      flex: 1
                    }}>
                      <h3 style={{ fontSize: "14.5px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                        Inefficiencies in Qualification
                      </h3>
                      <p style={{ fontSize: "12.5px", color: "var(--color-text-muted)", lineHeight: 1.5, margin: 0 }}>
                        The small sales team spent excessive time on manual processes instead of focusing on hot opportunities. Without a structured, automated system to efficiently qualify prospects and improve response rates, the team was bogged down by routine administrative follow-ups.
                      </p>
                    </div>
                  </div>

                  {/* Card 4: Text top, Image bottom */}
                  <div style={{
                    background: "var(--color-bg-card-alt)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "24px",
                    padding: "16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px"
                  }}>
                    <div style={{
                      background: "var(--color-bg-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "16px",
                      padding: "20px",
                      flex: 1
                    }}>
                      <h3 style={{ fontSize: "14.5px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                        Rising Customer Acquisition Costs
                      </h3>
                      <p style={{ fontSize: "12.5px", color: "var(--color-text-muted)", lineHeight: 1.5, margin: 0 }}>
                        While marketing successfully generated consistent demand, the lack of a repeatable sales system meant that investments weren't being fully capitalized on. This gap between lead generation and sales execution led to rising customer acquisition costs (CAC) and wasted marketing spend.
                      </p>
                    </div>
                    <div style={{ width: "100%", height: "180px", borderRadius: "16px", overflow: "hidden" }}>
                      <img 
                        src="/images/case-studies/challenge-coverage.png" 
                        alt="Rising Customer Acquisition Costs" 
                        style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: "1px", background: "var(--color-border)", marginBottom: "80px" }} />

              {/* The Solution Section */}
              <div style={{ marginBottom: "80px" }}>
                <h2 style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "clamp(24px, 3vw, 32px)",
                  fontWeight: 700,
                  color: "var(--color-text-bright)",
                  marginBottom: "24px",
                  letterSpacing: "-0.02em"
                }}>
                  Our Solution
                </h2>
                
                <p style={{
                  fontSize: "16px",
                  color: "var(--color-text-muted)",
                  lineHeight: 1.6,
                  marginBottom: "40px",
                  maxWidth: "800px"
                }}>
                  Lotus Manor needed a way to keep follow-up moving without relying on manual reminders or extra headcount. ScalePods built a structured outreach system that kept leads warm, maintained continuity, and reduced the burden on the sales team.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Solution Card 1 */}
                  <div style={{
                    background: "var(--color-bg-card-alt)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "20px",
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px"
                  }}>
                    <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-blue-mid)", fontFamily: "var(--font-inter), sans-serif" }}>
                      01
                    </div>
                    <div>
                      <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                        Structured follow-up instead of scattered chasing
                      </h3>
                      <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.5, margin: 0 }}>
                        The team no longer depended on reps remembering when to reach out. Once a lead entered the workflow, reachouts & follow-up happened automatically across the right channels at the right time.
                      </p>
                    </div>
                  </div>

                  {/* Solution Card 2 */}
                  <div style={{
                    background: "var(--color-bg-card-alt)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "20px",
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px"
                  }}>
                    <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-blue-mid)", fontFamily: "var(--font-inter), sans-serif" }}>
                      02
                    </div>
                    <div>
                      <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                        Multi-channel outreach that stayed consistent
                      </h3>
                      <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.5, margin: 0 }}>
                        The workflow used WhatsApp, email, and AI voice calls to keep prospects engaged without overwhelming the sales team with repetitive manual effort. This gave Lotus Manor a more reliable reachout & follow-up rhythm across the full database.
                      </p>
                    </div>
                  </div>

                  {/* Solution Card 3 */}
                  <div style={{
                    background: "var(--color-bg-card-alt)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "20px",
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px"
                  }}>
                    <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-blue-mid)", fontFamily: "var(--font-inter), sans-serif" }}>
                      03
                    </div>
                    <div>
                      <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                        Lead ownership stayed clean and organized
                      </h3>
                      <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.5, margin: 0 }}>
                        If a prospect replied, the lead was reassigned back to the original sales rep so the human conversation could continue immediately. That meant automation supported the sales team instead of replacing it.
                      </p>
                    </div>
                  </div>

                  {/* Solution Card 4 */}
                  <div style={{
                    background: "var(--color-bg-card-alt)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "20px",
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px"
                  }}>
                    <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-blue-mid)", fontFamily: "var(--font-inter), sans-serif" }}>
                      04
                    </div>
                    <div>
                      <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                        Visibility was built into the process
                      </h3>
                      <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.5, margin: 0 }}>
                        Every important step and responses from the lead was logged in the CRM, giving the admin and sales team a clear view of where each lead stood. That made the process easier to manage and removed guesswork from follow-up.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: "1px", background: "var(--color-border)", marginTop: "80px", marginBottom: "80px" }} />

              {/* The Workflow Section */}
              <div style={{ marginBottom: "80px" }}>
                <h2 style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "clamp(24px, 3vw, 32px)",
                  fontWeight: 700,
                  color: "var(--color-text-bright)",
                  marginBottom: "32px",
                  letterSpacing: "-0.02em"
                }}>
                  The Workflow
                </h2>
                
                <div style={{
                  width: "100%",
                  borderRadius: "24px",
                  border: "1px solid var(--color-border)",
                  background: "var(--color-bg-card-alt)",
                  padding: "24px",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-sm)"
                }}>
                  <img 
                    src="/brands/workflow-preview-light.png" 
                    alt="ScalePods Automation Workflow Diagram" 
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "16px",
                      display: "block"
                    }} 
                    className="workflow-preview-light"
                  />
                  <img 
                    src="/brands/workflow-preview-dark.png" 
                    alt="ScalePods Automation Workflow Diagram" 
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "16px",
                      display: "block"
                    }} 
                    className="workflow-preview-dark"
                  />
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: "1px", background: "var(--color-border)", marginTop: "80px", marginBottom: "80px" }} />

              {/* The Results Section */}
              <div style={{ marginBottom: "80px" }}>
                <h2 style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "clamp(24px, 3vw, 32px)",
                  fontWeight: 700,
                  color: "var(--color-text-bright)",
                  marginBottom: "24px",
                  letterSpacing: "-0.02em"
                }}>
                  The Results
                </h2>
                
                <p style={{
                  fontSize: "16px",
                  color: "var(--color-text-muted)",
                  lineHeight: 1.6,
                  marginBottom: "40px",
                  maxWidth: "800px"
                }}>
                  Within four months, the impact was visible across both engagement and sales productivity. Lotus Manor’s automated follow-up system helped the team reach more leads, generate more responses, and stop spending time on repetitive outreach work.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Result Card 1 */}
                  <div style={{
                    background: "var(--color-bg-card-alt)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "20px",
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px"
                  }}>
                    <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-blue-mid)", fontFamily: "var(--font-inter), sans-serif" }}>
                      <AnimatedMetric value={1000} suffix="+" />
                    </div>
                    <div>
                      <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                        Prospects were reached
                      </h3>
                      <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.5, margin: 0 }}>
                        The automation created a consistent outreach layer that kept prospects moving instead of letting them sit idle in the database.
                      </p>
                    </div>
                  </div>

                  {/* Result Card 2 */}
                  <div style={{
                    background: "var(--color-bg-card-alt)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "20px",
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px"
                  }}>
                    <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-blue-mid)", fontFamily: "var(--font-inter), sans-serif" }}>
                      <AnimatedMetric value={7000} suffix="+" />
                    </div>
                    <div>
                      <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                        Follow-ups were sent automatically
                      </h3>
                      <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.5, margin: 0 }}>
                        What used to require constant manual effort was now handled by a repeatable system, giving the team far more leverage from the same lead.
                      </p>
                    </div>
                  </div>

                  {/* Result Card 3 */}
                  <div style={{
                    background: "var(--color-bg-card-alt)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "20px",
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px"
                  }}>
                    <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-blue-mid)", fontFamily: "var(--font-inter), sans-serif" }}>
                      <AnimatedMetric value={229} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                        Direct responses came in
                      </h3>
                      <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.5, margin: 0 }}>
                        The automated follow-up cadence helped uncover high-intent prospects and generate meaningful sales conversations that would likely have been missed through manual follow-ups.
                      </p>
                    </div>
                  </div>

                  {/* Result Card 4 */}
                  <div style={{
                    background: "var(--color-bg-card-alt)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "20px",
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px"
                  }}>
                    <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-blue-mid)", fontFamily: "var(--font-inter), sans-serif" }}>
                      <AnimatedMetric value={21} suffix="%" />
                    </div>
                    <div>
                      <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "8px", lineHeight: 1.3 }}>
                        Response rate showed strong engagement
                      </h3>
                      <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.5, margin: 0 }}>
                        The system did more than save time — it created measurable interaction from prospects who were previously under-nurtured.
                      </p>
                    </div>
                  </div>

                  {/* Result Card 5: Full Width */}
                  <div className="md:col-span-2" style={{
                    background: "var(--color-bg-card)",
                    border: "1px solid var(--color-border)",
                    borderLeft: "4px solid var(--color-blue-mid)",
                    borderRadius: "20px",
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px"
                  }}>
                    <h3 style={{ fontSize: "17px", fontWeight: 700, color: "var(--color-text-bright)", margin: 0, lineHeight: 1.3 }}>
                      The sales team could focus on closing instead of chasing
                    </h3>
                    <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.6, margin: 0 }}>
                      By removing repetitive reminder work, ScalePods gave Lotus Manor a more efficient sales motion and a better way to use its existing team capacity.
                    </p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: "1px", background: "var(--color-border)", marginTop: "80px", marginBottom: "80px" }} />

              {/* Why ScalePods Section */}
              <div style={{ marginBottom: "80px", display: "flex", flexDirection: "column", gap: "20px" }}>
                {/* Block 1: Why ScalePods */}
                <div style={{
                  background: "var(--color-bg-card)",
                  border: "1px solid var(--color-border)",
                  borderLeft: "4px solid var(--color-blue-mid)",
                  borderRadius: "20px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px"
                }}>
                  <h3 style={{ fontSize: "17px", fontWeight: 700, color: "var(--color-text-bright)", margin: 0, lineHeight: 1.3 }}>
                    Why ScalePods
                  </h3>
                  <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.6, margin: 0 }}>
                    Lotus Manor did not need another tool that added more work for the sales team. They needed a system that could turn a large lead database into real conversations without increasing operational complexity.
                  </p>
                </div>

                {/* Block 2: An Automated Follow-Up Engine Built for Closing */}
                <div style={{
                  background: "var(--color-bg-card)",
                  border: "1px solid var(--color-border)",
                  borderLeft: "4px solid var(--color-blue-mid)",
                  borderRadius: "20px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px"
                }}>
                  <h3 style={{ fontSize: "17px", fontWeight: 700, color: "var(--color-text-bright)", margin: 0, lineHeight: 1.3 }}>
                    An Automated Follow-Up Engine Built for Closing
                  </h3>
                  <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.6, margin: 0 }}>
                    ScalePods helped make that possible by building an automated follow-up engine that kept outreach consistent, protected lead ownership, and reduced the burden of manual sales coordination. The result was a leaner, more scalable process that let the team focus on closing instead of chasing.
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: "1px", background: "var(--color-border)", marginTop: "80px", marginBottom: "80px" }} />

              {/* Product Demo Section */}
              <div style={{ marginBottom: "80px" }}>
                <h2 style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "clamp(24px, 3vw, 32px)",
                  fontWeight: 700,
                  color: "var(--color-text-bright)",
                  marginBottom: "24px",
                  letterSpacing: "-0.02em"
                }}>
                  Product Demo
                </h2>
                
                <p style={{
                  fontSize: "16px",
                  color: "var(--color-text-muted)",
                  lineHeight: 1.6,
                  marginBottom: "32px",
                  maxWidth: "800px"
                }}>
                  See the core outbound engine in action — managing multi-channel sequences, coordinating WhatsApp outreach, and automating CRM updates.
                </p>

                <CaseStudyVideoPlayer src="/videos/Sales_pod_demo.mp4" />
              </div>

              {/* Divider */}
              <div style={{ height: "1px", background: "var(--color-border)", marginTop: "80px", marginBottom: "80px" }} />

              {/* Final CTA Section */}
              <div style={{ marginBottom: "40px" }}>
                <div style={{
                  background: "linear-gradient(135deg, var(--color-bg-card-alt) 0%, var(--color-bg-card) 100%)",
                  border: "1px solid var(--color-border)",
                  borderLeft: "4px solid #6DB6FF",
                  borderRadius: "24px",
                  padding: "48px 32px",
                  textAlign: "center",
                  boxShadow: "var(--shadow-sm)"
                }}>
                  <h3 style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "clamp(24px, 3.5vw, 36px)",
                    fontWeight: 700,
                    color: "var(--color-text-bright)",
                    marginBottom: "16px",
                    letterSpacing: "-0.02em"
                  }}>
                    Ready to Scale Your Sales Outreach?
                  </h3>
                  
                  <p style={{
                    fontSize: "16px",
                    color: "var(--color-text-muted)",
                    lineHeight: 1.6,
                    marginBottom: "32px",
                    maxWidth: "600px",
                    marginLeft: "auto",
                    marginRight: "auto"
                  }}>
                    Book a free consultation and discover how ScalePods can build an autonomous follow-up system for your database.
                  </p>

                  <div style={{ display: "inline-block" }}>
                    <Link href="/contact" style={{ textDecoration: "none" }}>
                      <div className="group text-[#0f172a]" style={{
                        position: "relative",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        fontFamily: "var(--font-inter), sans-serif",
                        fontSize: "15px",
                        fontWeight: 700,
                        background: "#6DB6FF",
                        border: "1px solid #6DB6FF",
                        borderRadius: "10px",
                        padding: "12px 28px",
                        cursor: "pointer",
                        transition: "all 0.2s ease-in-out",
                        boxShadow: "0 4px 12px rgba(109, 182, 255, 0.25)"
                      }}>
                        <span>Book A Free Call</span>
                        <ArrowUpRight style={{ width: "16px", height: "16px" }} />
                      </div>
                    </Link>
                  </div>
                  
                  <p style={{
                    fontSize: "13px",
                    color: "var(--color-text-faint)",
                    marginTop: "16px",
                    marginBottom: 0
                  }}>
                    No commitment. Just insights.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column: Sidebar (on the right) */}
            <div className="lg:col-span-3 lg:sticky lg:top-[120px] self-start" style={{ display: "flex", flexDirection: "column" }}>
              {/* Lotus Manor Logo */}
              <div style={{ marginBottom: "20px" }}>
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#ffffff",
                  padding: "10px 18px",
                  borderRadius: "12px",
                  border: "1px solid rgba(0, 0, 0, 0.08)",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)"
                }}>
                  <img
                    src="/brands/lotus-manor.webp"
                    alt="Lotus Manor Logo"
                    style={{
                      height: "24px",
                      width: "auto",
                      objectFit: "contain"
                    }}
                    className="case-study-header-logo"
                  />
                </div>
              </div>

              {/* Company Title */}
              <div style={{ fontSize: "17px", fontWeight: 700, color: "var(--color-text-bright)", marginBottom: "24px" }}>
                Lotus Manor Real Estate
              </div>

              {/* Divider */}
              <div style={{ height: "1px", background: "var(--color-border)", marginBottom: "24px" }} />

              {/* About Section */}
              <div style={{ marginBottom: "24px" }}>
                <h4 style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "var(--color-text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "8px"
                }}>
                  About
                </h4>
                <p style={{ fontSize: "13.5px", color: "var(--color-text-muted)", lineHeight: 1.5, margin: 0 }}>
                  Lotus Manor Real Estate is a premium UAE-based real estate agency that simplifies the process of finding, evaluating, and securing properties across Dubai.
                </p>
              </div>

              {/* Metadata Fields */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                    Industry
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--color-text-bright)" }}>
                    Real Estate
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                    Company size
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--color-text-bright)" }}>
                    2-10
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                    Headquarters
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--color-text-bright)" }}>
                    Dubai, UAE
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                    Founded
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--color-text-bright)" }}>
                    2024
                  </div>
                </div>
              </div>

              {/* Key Features Section */}
              <div>
                <h4 style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "var(--color-text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "12px"
                }}>
                  Key features
                </h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {["Real Estate", "Sales", "Luxury homes", "Villas"].map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: "12px",
                        padding: "4px 10px",
                        borderRadius: "6px",
                        background: "var(--color-bg-card-alt)",
                        border: "1px solid var(--color-border)",
                        color: "var(--color-text-muted)"
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
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
          </>
        )}

        {/* Article Body */}
        {!isLotusManorCaseStudy && (
          <BlogBodyClient sections={displayData.sections} slug={slug} articleTitle={displayData.title} />
        )}

        {/* FAQ Accordion Section */}
        {!isLotusManorCaseStudy && displayData.faqs && displayData.faqs.length > 0 && (
          <div style={{ marginTop: "80px" }}>
            <h2 style={{
              fontFamily: "var(--font-inter), sans-serif", fontSize: "28px", fontWeight: 700,
              color: "var(--color-text-bright)", marginBottom: "32px", lineHeight: 1.3,
              letterSpacing: "-0.02em"
            }}>
              {displayData.title.includes("HR")
                ? "FAQs About HR Automation"
                : displayData.title.includes("Sales Workflow")
                ? "FAQs About Sales Workflow Automation"
                : displayData.title.includes("Marketing")
                ? "FAQs About Marketing Automation"
                : "FAQs About AI SDR Automation"}
            </h2>
            <BlogFaqAccordion faqData={displayData.faqs} />
          </div>
        )}

        {/* Divider */}
        <div style={{ height: "1px", background: "var(--color-border)", marginTop: "80px", marginBottom: "40px" }} />

        {/* Bottom Back Button */}
        <Link href={isLotusManorCaseStudy ? "/blog/case-studies" : "/blog"} className="blog-back-btn">
          <ArrowLeft style={{ width: "14px", height: "14px" }} />
          {isLotusManorCaseStudy ? "Back To Case Studies" : "Back To All Blogs"}
        </Link>

          </div>
        </div>
      </BeamsBackground>
    </main>
  );
}
