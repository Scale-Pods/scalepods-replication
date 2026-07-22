import type { Metadata } from "next";
import JsonLd from "@/components/SEO/JsonLd";

export const metadata: Metadata = {
  title: "AI Automation for Manufacturing | ScalePods",
  description: "ScalePods automates manufacturing sales pipelines, operations audits, HR recruitment, and exhibition lead capture with AI. Book a free workflow audit.",
  alternates: {
    canonical: "https://www.scalepods.co/ai-automation-for-manufacturing",
  },
  openGraph: {
    title: "AI Automation for Manufacturing | ScalePods",
    description: "ScalePods automates manufacturing sales pipelines, operations audits, HR recruitment, and exhibition lead capture with AI. Book a free workflow audit.",
    url: "https://www.scalepods.co/ai-automation-for-manufacturing",
    siteName: "ScalePods",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Automation for Manufacturing | ScalePods",
    description: "ScalePods automates manufacturing sales pipelines, operations audits, HR recruitment, and exhibition lead capture with AI. Book a free workflow audit.",
  },
};

const manufacturingSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.scalepods.co/ai-automation-for-manufacturing/#service",
  "name": "Manufacturing Workflow Automation Pods",
  "provider": {
    "@type": "Organization",
    "name": "ScalePods",
    "url": "https://www.scalepods.co",
    "logo": "https://www.scalepods.co/scalepods-logo.png"
  },
  "description": "ScalePods automates manufacturing sales pipelines, operations audits, HR recruitment, and exhibition lead capture with AI. Book a free workflow audit.",
  "areaServed": "Worldwide",
  "category": "Manufacturing Workflow Automation"
};

export default function ManufacturingWorkflowLayout({
  children,
  }: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={manufacturingSchema} />
      {children}
    </>
  );
}
