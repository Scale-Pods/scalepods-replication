import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies | AI Automation in Action | ScalePods",
  description:
    "Explore real-world case studies of enterprise AI workflows, recruitment automation, logistics reconciliation, and real estate sales pipelines engineered by ScalePods.",
  alternates: {
    canonical: "https://www.scalepods.co/blog/case-studies",
  },
  openGraph: {
    title: "Case Studies | AI Automation in Action | ScalePods",
    description:
      "Explore real-world case studies of enterprise AI workflows, recruitment automation, logistics reconciliation, and real estate sales pipelines engineered by ScalePods.",
    url: "https://www.scalepods.co/blog/case-studies",
    siteName: "ScalePods",
    type: "website",
  },
};

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
