import type { Metadata } from "next";
import JsonLd from "@/components/SEO/JsonLd";

export const metadata: Metadata = {
  title: "AI Marketing Workflow Automation | ScalePods",
  description: "Deploy autonomous Marketing Pods to automate your entire marketing lifecycle: strategy, copywriting, approvals, publishing, and real-time performance analytics.",
  alternates: {
    canonical: "https://www.scalepods.co/solution/marketing-workflow-automation",
  },
  openGraph: {
    title: "AI Marketing Workflow Automation | ScalePods",
    description: "Deploy autonomous Marketing Pods to automate your entire marketing lifecycle: strategy, copywriting, approvals, publishing, and real-time performance analytics.",
    url: "https://www.scalepods.co/solution/marketing-workflow-automation",
    siteName: "ScalePods",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Marketing Workflow Automation | ScalePods",
    description: "Deploy autonomous Marketing Pods to automate your entire marketing lifecycle: strategy, copywriting, approvals, publishing, and real-time performance analytics.",
  },
};

const marketingSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.scalepods.co/solution/marketing-workflow-automation/#service",
  "name": "Marketing Workflow Automation Pod",
  "provider": {
    "@type": "Organization",
    "name": "ScalePods",
    "url": "https://www.scalepods.co",
    "logo": "https://www.scalepods.co/scalepods-logo.png"
  },
  "description": "Deploy autonomous Marketing Pods to automate your entire marketing lifecycle: strategy, copywriting, approvals, publishing, and real-time performance analytics.",
  "areaServed": "Worldwide",
  "category": "Marketing Automation"
};

export default function MarketingWorkflowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={marketingSchema} />
      {children}
    </>
  );
}
