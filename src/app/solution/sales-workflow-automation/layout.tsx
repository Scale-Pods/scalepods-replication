import type { Metadata } from "next";
import JsonLd from "@/components/SEO/JsonLd";

export const metadata: Metadata = {
  title: "Sales Workflow Automation Software & AI Sales Engine | ScalePods",
  description:
    "Transform manual sales drag into high-velocity revenue with intelligent sales automation software. Automate B2B prospecting, sales pipeline automation, and bidirectional CRM sync.",
  keywords: [
    "sales workflow automation",
    "sales automation software",
    "AI for sales prospecting",
    "best AI sales tools",
    "sales pipeline automation",
    "crm and sales automation",
    "best AI for sales",
    "AI sales tools",
    "best sales automation software",
    "AI sales engine",
    "autonomous outbound",
    "ScalePods",
  ],
  alternates: {
    canonical: "https://www.scalepods.co/solution/sales-workflow-automation",
  },
  openGraph: {
    title: "Sales Workflow Automation Software & AI Sales Engine | ScalePods",
    description: "Transform manual sales drag into high-velocity revenue with intelligent sales automation software.",
    url: "https://www.scalepods.co/solution/sales-workflow-automation",
    siteName: "ScalePods",
    type: "website",
  },
};

const salesSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.scalepods.co/solution/sales-workflow-automation/#service",
  "name": "Sales Workflow Automation Software",
  "provider": {
    "@type": "Organization",
    "name": "ScalePods",
    "url": "https://www.scalepods.co",
    "logo": "https://www.scalepods.co/scalepods-logo.png"
  },
  "description": "Transform manual sales drag into high-velocity revenue with intelligent sales automation software. Automate B2B prospecting, sales pipeline automation, and bidirectional CRM sync.",
  "areaServed": "Worldwide",
  "category": "B2B Sales Automation Software"
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
