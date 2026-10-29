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
    const {
      title,
      slug,
      category,
      excerpt,
      metaTitle,
      metaDescription,
      bannerUrl,
      bannerUrlDark,
      bannerUrlLight,
      ctaTitle,
      ctaSubtitle,
      ctaLabel,
      ctaUrl,
      sections,
      faqs
    } = body;

    if (!slug || !title) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: slug and title are required" },
        { status: 400 }
      );
    }

    // 3. Prepare hero image and JSON body (embedding theme banner URLs and CTA overrides into body metadata)
    const heroImage = bannerUrl || bannerUrlDark || bannerUrlLight || null;
    const parsedSections = Array.isArray(sections)
      ? sections
      : typeof sections === "string"
      ? JSON.parse(sections)
      : [];

    const formattedBody = JSON.stringify({
      sections: parsedSections,
      // Read by generateMetadata() in [slug]/page.tsx for the real <title>/<meta name="description">
      // tags -- falls back to the auto-derived title/excerpt when either is unset.
      metaTitle: metaTitle || null,
      metaDescription: metaDescription || null,
      bannerUrlDark: bannerUrlDark || null,
      bannerUrlLight: bannerUrlLight || null,
      ctaTitle: ctaTitle || null,
      ctaSubtitle: ctaSubtitle || null,
      ctaLabel: ctaLabel || null,
      ctaUrl: ctaUrl || null,
      // { q, a }[] for BlogFaqAccordion — see [slug]/page.tsx's dynamic-post branch, which reads
      // this back out of bodyMeta.faqs. Optional; omitted/empty just means no FAQ block renders.
      faqs: Array.isArray(faqs) ? faqs : null
    });

    const { error } = await supabase.from("website_content").upsert(
      {
        slug,
        title,
        excerpt: excerpt || "",
        category: category || "Article",
        hero_image: heroImage,
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

    // 4. Trigger Next.js cache revalidation for blog list, post page, and sitemap
    try {
      revalidatePath("/blog");
      revalidatePath(`/blog/${slug}`);
      revalidatePath("/sitemap.xml");
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

export async function DELETE(req: Request) {
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
    const { slug } = body;

    if (!slug) {
      return NextResponse.json(
        { success: false, error: "Missing required field: slug" },
        { status: 400 }
      );
    }

    // 3. Delete row from Supabase website_content table
    const { error } = await supabase.from("website_content").delete().eq("slug", slug);

    if (error) {
      console.error("[Blog Unpublish API Supabase Error]:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    // 4. Trigger Next.js cache revalidation for blog list, post page, and sitemap
    try {
      revalidatePath("/blog");
      revalidatePath(`/blog/${slug}`);
      revalidatePath("/sitemap.xml");
    } catch (revalErr) {
      console.warn("[Blog Unpublish Revalidate Warning]:", revalErr);
    }

    // 5. Return success response
    return NextResponse.json({
      success: true,
      slug
    });

  } catch (err: any) {
    console.error("[Blog Unpublish API Error]:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
