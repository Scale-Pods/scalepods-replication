import type { MetadataRoute } from "next";
import { blogPosts as staticPosts } from "@/lib/blogData";
import { supabase } from "@/lib/supabase";

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
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/use-cases`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/solution/sales-workflow-automation`,
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

  // 2. Map static blogs
  const staticBlogRoutes: MetadataRoute.Sitemap = staticPosts.map((post) => {
    // Parse the static date safely (e.g. "May 20, 2026")
    let parsedDate = new Date();
    if (post.date) {
      const d = Date.parse(post.date);
      if (!isNaN(d)) {
        parsedDate = new Date(d);
      }
    }
    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: parsedDate,
      changeFrequency: "weekly",
      priority: 0.7,
    };
  });

  // 3. Fetch dynamic blogs from Supabase
  let dynamicBlogRoutes: MetadataRoute.Sitemap = [];
  try {
    const { data: dbPosts, error } = await supabase
      .from("website_content")
      .select("slug, published_at")
      .eq("status", "published");

    if (error) {
      console.error("[Sitemap] Supabase query error:", error);
    } else if (dbPosts) {
      dynamicBlogRoutes = dbPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.published_at ? new Date(post.published_at) : new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      }));
    }
  } catch (err) {
    console.error("[Sitemap] Failed to generate dynamic blog routes:", err);
  }

  // Combine and deduplicate by URL
  const allRoutes = [...staticRoutes, ...staticBlogRoutes, ...dynamicBlogRoutes];
  const uniqueRoutesMap = new Map<string, typeof allRoutes[0]>();

  for (const route of allRoutes) {
    uniqueRoutesMap.set(route.url, route);
  }

  return Array.from(uniqueRoutesMap.values());
}
