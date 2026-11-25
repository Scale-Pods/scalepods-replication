import type { MetadataRoute } from "next";
import { blogPosts as staticPosts } from "@/lib/blogData";
import { supabase } from "@/lib/supabase";
import { EXCLUDED_BLOG_SLUGS, normalizeBlogSlug } from "@/lib/slugConfig";

export const revalidate = 3600; // Cache sitemap for 1 hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.scalepods.co";

  // 1. Define static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources/case-studies`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ai-business-automation-webinar`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources/ebooks`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/resources/ebooks/ai-employees-digital-workforce`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/resources/ebooks/ai-in-hr-executive-playbook`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/solutions/sales-workflow-automation`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/solutions/hr-workflow-automation`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/solutions/marketing-workflow-automation`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/solutions/operations-workflow-automation`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/solutions/manufacturing-workflow-automation`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/solutions/real-estate-workflow-automation`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/global`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Set of legacy slugs that redirect and must never appear directly in sitemap.xml
  const redirectedSlugs = new Set([
    "lotus-manor-case-study",
    "lotus-manor-real-estate-sales-automation-dubai",
    "zv-steels-recruitment-automation-tool",
    "asquared-real-estate-sales-automation-dubai",
    "lootah-group-procurement-workflow-automation",
    "macro-media-finance-workflow-automation",
    "bennett-realty-growth-os",
    "bennett-realty-real-estate-workflow-automation",
    "victory-energy-business-automation",
    "ryan-schwartz-fub-crm-automation",
    "miguel-clinic-lead-generation-automation",
    "wwr-real-estate-sales-automation-qatar",
  ]);

  // 2. Map static blogs under /resources/blog/
  const staticBlogRoutes: MetadataRoute.Sitemap = staticPosts
    .filter(
      (post) =>
        post.category !== "Case Study" &&
        !redirectedSlugs.has(post.slug) &&
        !EXCLUDED_BLOG_SLUGS.has(post.slug)
    )
    .map((post) => {
      let parsedDate = new Date();
      if (post.date) {
        const d = Date.parse(post.date);
        if (!isNaN(d)) {
          parsedDate = new Date(d);
        }
      }
      const canonicalSlug = normalizeBlogSlug(post.slug);
      return {
        url: `${baseUrl}/resources/blog/${canonicalSlug}`,
        lastModified: parsedDate,
        changeFrequency: "weekly",
        priority: 0.7,
      };
    });

  // 2b. Case study routes under /resources/case-studies/
  const staticCaseStudyRoutes: MetadataRoute.Sitemap = staticPosts
    .filter((post) => post.category === "Case Study")
    .map((post) => {
      let parsedDate = new Date();
      if (post.date) {
        const d = Date.parse(post.date);
        if (!isNaN(d)) parsedDate = new Date(d);
      }
      return {
        url: `${baseUrl}/resources/case-studies/${post.slug}`,
        lastModified: parsedDate,
        changeFrequency: "monthly" as const,
        priority: 0.9,
      };
    });

  // 3. Fetch dynamic blogs from Supabase (normalize slugs, filter out excluded/legacy slugs)
  let dynamicBlogRoutes: MetadataRoute.Sitemap = [];
  try {
    const { data: dbPosts, error } = await supabase
      .from("website_content")
      .select("slug, published_at")
      .eq("status", "published");

    if (error) {
      console.error("[Sitemap] Supabase query error:", error);
    } else if (dbPosts) {
      dynamicBlogRoutes = dbPosts
        .filter((post) => post.slug && !redirectedSlugs.has(post.slug) && !EXCLUDED_BLOG_SLUGS.has(post.slug))
        .map((post) => ({
          url: `${baseUrl}/resources/blog/${normalizeBlogSlug(post.slug)}`,
          lastModified: post.published_at ? new Date(post.published_at) : new Date(),
          changeFrequency: "weekly",
          priority: 0.7,
        }));
    }
  } catch (err) {
    console.error("[Sitemap] Failed to generate dynamic blog routes:", err);
  }

  // Combine and deduplicate by URL
  const allRoutes = [...staticRoutes, ...staticBlogRoutes, ...staticCaseStudyRoutes, ...dynamicBlogRoutes];
  const uniqueRoutesMap = new Map<string, (typeof allRoutes)[0]>();

  for (const route of allRoutes) {
    uniqueRoutesMap.set(route.url, route);
  }

  return Array.from(uniqueRoutesMap.values());
}
