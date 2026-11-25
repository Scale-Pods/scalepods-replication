import { permanentRedirect, notFound } from "next/navigation";
import { blogPosts as staticPosts } from "@/lib/blogData";
import { BLOG_SLUG_CANONICAL_MAP, CASE_STUDY_LEGACY_ALIASES, EXCLUDED_BLOG_SLUGS } from "@/lib/slugConfig";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function LegacyBlogSlugPage({ params }: Props) {
  const { slug } = await params;

  if (EXCLUDED_BLOG_SLUGS.has(slug)) {
    notFound();
  }

  if (CASE_STUDY_LEGACY_ALIASES[slug]) {
    permanentRedirect(`/resources/case-studies/${CASE_STUDY_LEGACY_ALIASES[slug]}`);
  }

  const isCaseStudy = staticPosts.some((p) => p.slug === slug && p.category === "Case Study");
  if (isCaseStudy) {
    permanentRedirect(`/resources/case-studies/${slug}`);
  }

  const canonicalSlug = BLOG_SLUG_CANONICAL_MAP[slug] || slug;
  permanentRedirect(`/resources/blog/${canonicalSlug}`);
}
