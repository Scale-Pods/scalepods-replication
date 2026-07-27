import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogPosts } from "@/lib/blogData";

interface Props {
  params: Promise<{ slug: string }>;
}

// Only allow slugs that are case studies
const caseStudySlugs = blogPosts
  .filter((p) => p.category === "Case Study")
  .map((p) => p.slug);

export async function generateStaticParams() {
  return caseStudySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug && p.category === "Case Study");
  if (!post) return { title: "Not Found" };

  const title = post.metaTitle || `${post.title} | ScalePods Case Study`;
  const description = post.metaDescription || post.excerpt;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.scalepods.co/case-study/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.scalepods.co/case-study/${slug}`,
      type: "article",
      images: [
        {
          url: post.image.startsWith("http")
            ? post.image
            : `https://www.scalepods.co${post.image}`,
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

// This page renders the full case study via the shared blog/[slug] template.
// We redirect server-side so the blog/[slug] page.tsx handles all rendering logic
// while the canonical URL stays at /case-study/[slug].
export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;

  // Guard: only serve known case-study slugs
  const post = blogPosts.find((p) => p.slug === slug && p.category === "Case Study");
  if (!post) notFound();

  // Render via the blog/[slug] ArticlePage — import it directly to avoid
  // a network round-trip and keep a single source of truth for the template.
  const { default: ArticlePage } = await import("@/app/blog/[slug]/page");
  return <ArticlePage params={params} />;
}
