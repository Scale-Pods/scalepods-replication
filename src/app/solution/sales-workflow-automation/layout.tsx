import type { Metadata } from "next";
import JsonLd from "@/components/SEO/JsonLd";

export const metadata: Metadata = {
  title: "Sales Workflow Automation | ScalePods",
  description:
    "Deploy autonomous sales infrastructure for high-velocity pipelines. Automate lead sourcing, hyper-personalized outreach, and omnichannel execution with zero manual overhead.",
  keywords: [
    "AI sales agent",
    "autonomous outbound",
    "lead scraping automation",
    "ScalePods salespod",
    "AI outbound infrastructure",
    "cold email automation",
    "sales workflow automation",
  ],
  alternates: {
    canonical: "https://www.scalepods.co/solution/sales-workflow-automation",
  },
  openGraph: {
    title: "Sales Workflow Automation | ScalePods",
    description: "Automate outbound prospecting and personalized outreach at scale.",
    url: "https://www.scalepods.co/solution/sales-workflow-automation",
    siteName: "ScalePods",
    type: "website",
  },
};

const salesSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.scalepods.co/solution/sales-workflow-automation/#service",
  "name": "Sales Workflow Automation Pod",
  "provider": {
    "@type": "Organization",
    "name": "ScalePods",
    "url": "https://www.scalepods.co",
    "logo": "https://www.scalepods.co/scalepods-logo.png"
  },
  "description": "Deploy autonomous sales infrastructure for high-velocity pipelines. Automate lead sourcing, hyper-personalized outreach, and omnichannel execution with zero manual overhead.",
  "areaServed": "Worldwide",
  "category": "B2B Sales Automation"
};

export default function SalesWorkflowAutomationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <JsonLd data={salesSchema} />
      {children}
    </>
  );
}
