import { permanentRedirect } from "next/navigation";
import { CASE_STUDY_LEGACY_ALIASES } from "@/lib/slugConfig";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function LegacyCaseStudySlugPage({ params }: Props) {
  const { slug } = await params;
  const canonicalSlug = CASE_STUDY_LEGACY_ALIASES[slug] || slug;
  permanentRedirect(`/resources/case-studies/${canonicalSlug}`);
}
