import type { Metadata } from "next";
import { blogPosts as staticPosts } from "@/lib/blogData";
import { BLOG_SLUG_CANONICAL_MAP, EXCLUDED_BLOG_SLUGS } from "@/lib/slugConfig";
import ArticlePageRenderer, { generateArticleMetadata } from "@/components/blog/ArticlePageRenderer";

export const revalidate = 0; // Force dynamic fetching for real-time updates

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return staticPosts
    .filter((p) => p.category !== "Case Study" && !EXCLUDED_BLOG_SLUGS.has(p.slug))
    .map((p) => ({ slug: BLOG_SLUG_CANONICAL_MAP[p.slug] || p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return generateArticleMetadata(slug, "blog");
}

export default async function ResourcesBlogArticlePage({ params }: Props) {
  const { slug } = await params;
  return <ArticlePageRenderer slug={slug} expectedType="blog" />;
}
