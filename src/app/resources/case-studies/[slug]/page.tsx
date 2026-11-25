import type { Metadata } from "next";
import { blogPosts as staticPosts } from "@/lib/blogData";
import ArticlePageRenderer, { generateArticleMetadata } from "@/components/blog/ArticlePageRenderer";

export const revalidate = 0;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return staticPosts
    .filter((p) => p.category === "Case Study")
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return generateArticleMetadata(slug, "case-study");
}

export default async function ResourcesCaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  return <ArticlePageRenderer slug={slug} expectedType="case-study" />;
}
