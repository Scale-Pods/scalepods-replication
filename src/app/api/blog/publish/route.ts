import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    // 1. Auth check: verify x-publish-secret header matches BLOG_PUBLISH_SECRET
    const secret = req.headers.get("x-publish-secret");
    const expectedSecret = process.env.BLOG_PUBLISH_SECRET;

    if (!expectedSecret || secret !== expectedSecret) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Invalid or missing x-publish-secret header" },
        { status: 401 }
      );
    }

    // 2. Parse payload
    const body = await req.json();
    const { title, slug, category, excerpt, bannerUrl, ctaLabel, ctaUrl, sections } = body;

    if (!slug || !title) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: slug and title are required" },
        { status: 400 }
      );
    }

    // 3. Prepare payload for Supabase website_content table
    const formattedBody = typeof sections === "string" 
      ? sections 
      : JSON.stringify(sections || []);

    const { error } = await supabase.from("website_content").upsert(
      {
        slug,
        title,
        excerpt: excerpt || "",
        category: category || "Article",
        hero_image: bannerUrl || null,
        body: formattedBody,
        cta_label: ctaLabel || null,
        cta_url: ctaUrl || null,
        status: "published",
        published_at: new Date().toISOString()
      },
      { onConflict: "slug" }
    );

    if (error) {
      console.error("[Blog Publish API Supabase Error]:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    // 4. Trigger Next.js cache revalidation for blog list and post page
    try {
      revalidatePath("/blog");
      revalidatePath(`/blog/${slug}`);
    } catch (revalErr) {
      console.warn("[Blog Publish Revalidate Warning]:", revalErr);
    }

    // 5. Return success response
    const postUrl = `https://www.scalepods.co/blog/${slug}`;
    return NextResponse.json({
      success: true,
      slug,
      url: postUrl
    });

  } catch (err: any) {
    console.error("[Blog Publish API Error]:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
