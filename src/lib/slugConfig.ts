/**
 * Canonical URL slug mappings and excluded legacy slugs.
 * Keeps route handlers, sitemaps, and resource aggregators aligned with SEO structure.
 */

/** Old slug -> canonical slug overrides for blog posts (static or Supabase-backed). */
export const BLOG_SLUG_CANONICAL_MAP: Record<string, string> = {
  "operations-automation-guide": "operations-automation-guide-2026",
  "the-ai-marketing-edge-how-ai-is-reshaping-marketing-in-2026": "how-ai-is-reshaping-marketing-in-2026",
  "beyond-bots-real-business-impact-ai-integration": "beyond-bots-real-business-impact-from-ai-integration",
};

/** Canonical slug -> legacy DB lookup slugs when Supabase still holds an older slug. */
export const BLOG_SLUG_DB_ALIASES: Record<string, string[]> = {
  "operations-automation-guide-2026": ["operations-automation-guide-2026", "operations-automation-guide"],
};

/** Deprecated/empty blog slugs excluded from live pages, listings, and sitemap. */
export const EXCLUDED_BLOG_SLUGS = new Set([
  "top-10-automation-tools-every-agency-needs-in-2025-mo8qym7y",
  "top-10-automation-tools-every-agency-needs-in-2025",
  "the-roi-of-ai-measuring-the-impact-of-automation-mo8mk8hu",
  "the-roi-of-ai-measuring-the-impact-of-automation",
  "5-ways-ai-assistants-are-transforming-operations-mo8ksajr",
  "beyond-bots-real-business-impact-from-ai-integration-mo8k791y",
  "scaling-smarter-how-automation-helps-startups-mo8jpr8g",
  "the-future-of-workflows-why-ai-automation-is-the-standard-mo8jg6s8",
  "how-to-build-an-autonomous-agency-the-uae-blueprint-mo8lksce",
]);

/** Case study slug -> legacy aliases that permanently redirect to /resources/case-studies/[slug]. */
export const CASE_STUDY_LEGACY_ALIASES: Record<string, string> = {
  "lotus-manor-case-study": "lotus-manor-real-estate-sales-automation-dubai",
  "bennett-realty-growth-os": "bennett-realty-real-estate-workflow-automation",
};

/** Old /solution/* path -> new /solutions/* path mapping. */
export const SOLUTION_PATH_MIGRATION: Record<string, string> = {
  "/solution/ai-automation-for-manufacturing": "/solutions/manufacturing-workflow-automation",
  "/solution/ai-automation-for-real-estate": "/solutions/real-estate-workflow-automation",
  "/solution/hr-workflow-automation": "/solutions/hr-workflow-automation",
  "/solution/marketing-workflow-automation": "/solutions/marketing-workflow-automation",
  "/solution/ops-workflow-automation": "/solutions/operations-workflow-automation",
  "/solution/sales-workflow-automation": "/solutions/sales-workflow-automation",
};

/** Normalizes any DB or legacy blog slug to its canonical slug. */
export function normalizeBlogSlug(slug: string): string {
  return BLOG_SLUG_CANONICAL_MAP[slug] || slug;
}
