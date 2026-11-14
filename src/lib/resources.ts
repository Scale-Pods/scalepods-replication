import { blogPosts as staticPosts, type BlogPost } from "@/lib/blogData";
import { supabase } from "@/lib/supabase";

/** Supported category slugs under /resources. */
export type ResourceFormat = "all" | "ebook" | "case-study" | "blog";

/** Unified resource card model shared across /resources hub and sub-routes. */
export interface ResourceItem {
  id: string;
  format: Exclude<ResourceFormat, "all">;
  badge: string;
  title: string;
  date: string;
  coverImage: string;
  href: string;
  description: string;
  category?: string;
}

const placeholderImages: Record<string, string> = {
  "future-of-workflows-ai-automation": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
  "5-ways-ai-assistants-transforming-operations": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
  "scaling-smarter-automation-startups": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
  "beyond-bots-real-business-impact-ai-integration": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80",
};

const caseStudyCoverImages: Record<string, string> = {
  "lotus-manor-real-estate-sales-automation-dubai": "/brands/lotus-manor-new.webp",
  "zv-steels-recruitment-automation-tool": "/brands/zv-steels-new.webp",
  "asquared-real-estate-sales-automation-dubai": "/brands/asquared-brand-1x1.webp",
  "lootah-group-procurement-workflow-automation": "/brands/lootah-group-new.svg",
  "macro-media-finance-workflow-automation": "/brands/macro-media-box.svg",
  "bennett-realty-growth-os": "/brands/bennett-realty-box.svg",
  "victory-energy-business-automation": "/brands/victory-energy-box.svg",
  "ryan-schwartz-fub-crm-automation": "/brands/ryan-schwartz-box.svg",
  "miguel-clinic-lead-generation-automation": "/brands/miguel-case-study-box.svg",
};

const excludedSlugs = new Set([
  "top-10-automation-tools-every-agency-needs-in-2025-mo8qym7y",
  "the-roi-of-ai-measuring-the-impact-of-automation-mo8mk8hu",
  "5-ways-ai-assistants-are-transforming-operations-mo8ksajr",
  "beyond-bots-real-business-impact-from-ai-integration-mo8k791y",
  "scaling-smarter-how-automation-helps-startups-mo8jpr8g",
  "the-future-of-workflows-why-ai-automation-is-the-standard-mo8jg6s8",
  "how-to-build-an-autonomous-agency-the-uae-blueprint-mo8lksce",
]);

const staticArticleWhitelist = new Set([
  "business-process-automation-ai-replace-manual-workflows",
  "advertising-automation-ai-campaigns-budget-performance",
  "best-sales-automation-software-2026",
  "ai-employees-digital-workforce-guide",
  "5-ways-ai-assistants-transforming-operations",
  "ai-automation-roi-real-business-impact",
  "how-to-implement-sales-workflow-automation",
  "how-to-automate-your-sdr-workflow-with-ai",
  "sales-workflow-automation-complete-guide-2026",
  "hr-automation-complete-guide-2026",
  "marketing-automation-complete-guide-2026",
  "the-ai-marketing-edge-how-ai-is-reshaping-marketing-in-2026",
]);

function sortByNewestDate<T extends { date: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const timeA = isNaN(Date.parse(a.date)) ? 0 : Date.parse(a.date);
    const timeB = isNaN(Date.parse(b.date)) ? 0 : Date.parse(b.date);
    return timeB - timeA;
  });
}

/** Aggregate published eBooks, Enterprise Case Studies, and Blog Articles for /resources routes. */
export async function getAllResources(): Promise<ResourceItem[]> {
  const ebookItems: ResourceItem[] = [
    {
      id: "ebook-ai-employees-digital-workforce",
      format: "ebook",
      badge: "EBOOK",
      title: "AI Employees: Meet the Digital Workforce That Never Sleeps, Never Forgets, and Never Misses a Deadline",
      date: "August 2026",
      coverImage: "/images/resources/ai_employees_ebook_cover.webp",
      href: "/resources/ebooks/ai-employees-digital-workforce",
      description:
        "Meet Alex, Maya, Harper, and Orion – your AI Sales, Marketing, HR, and Operations employees – and see how an AI-powered workforce can run alongside your team.",
      category: "eBook",
    },
    {
      id: "ebook-ai-in-hr-executive-playbook",
      format: "ebook",
      badge: "EBOOK",
      title: "AI in HR: The Executive Playbook for Building an AI-First HR Organization",
      date: "July 2026",
      coverImage: "/images/resources/ai_in_hr_ebook_cover.webp",
      href: "/resources/ebooks/ai-in-hr-executive-playbook",
      description:
        "Rebuild your HR operating model around intelligence. Includes proprietary maturity model, 90-day blueprint, and tech stack architecture.",
      category: "eBook",
    },
  ];

  const { data: dbPosts, error } = await supabase
    .from("website_content")
    .select("slug, title, excerpt, category, published_at, hero_image")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("[Resources] Supabase fetch error:", error);
  }

  const dynamicPosts: BlogPost[] = (dbPosts || []).map((db) => ({
    slug: db.slug,
    title: db.title,
    excerpt: db.excerpt || "",
    category: db.category || "Article",
    date: db.published_at
      ? new Date(db.published_at).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : "Recently",
    image: db.hero_image || "",
    sections: [],
  }));

  const dynamicSlugSet = new Set(dynamicPosts.map((dp) => dp.slug));

  const filteredStaticArticles = staticPosts
    .filter((sp) => !dynamicSlugSet.has(sp.slug))
    .filter(
      (post) =>
        post.category !== "Case Study" &&
        (!post.date.includes("2026") || staticArticleWhitelist.has(post.slug))
    );

  const filteredDynamicArticles = dynamicPosts.filter(
    (post) => post.category !== "Case Study" && !excludedSlugs.has(post.slug)
  );

  const blogItems: ResourceItem[] = sortByNewestDate([
    ...filteredDynamicArticles,
    ...filteredStaticArticles,
  ]).map((post) => ({
    id: `blog-${post.slug}`,
    format: "blog",
    badge: post.category || "Article",
    title: post.title,
    date: post.date,
    coverImage:
      post.image ||
      placeholderImages[post.slug] ||
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    href: `/blog/${post.slug}`,
    description: post.excerpt,
    category: post.category,
  }));

  const caseStudyItems: ResourceItem[] = sortByNewestDate(
    staticPosts.filter((post) => post.category === "Case Study")
  ).map((cs) => ({
    id: `cs-${cs.slug}`,
    format: "case-study",
    badge: "CASE STUDY",
    title: cs.title,
    date: cs.date,
    coverImage:
      caseStudyCoverImages[cs.slug] ||
      cs.image ||
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    href: `/case-study/${cs.slug}`,
    description: cs.excerpt,
    category: "Case Study",
  }));

  return [...ebookItems, ...sortByNewestDate([...caseStudyItems, ...blogItems])];
}

