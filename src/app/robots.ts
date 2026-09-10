import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/", "/inspect-images"],
    },
    sitemap: "https://www.scalepods.co/sitemap.xml",
  };
}
