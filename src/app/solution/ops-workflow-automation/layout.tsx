import type { Metadata } from "next";
import JsonLd from "@/components/SEO/JsonLd";

export const metadata: Metadata = {
  title: "Enterprise Operations & Process Workflow Automation | ScalePods",
  description:
    "Scale enterprise operations with modern workflow automation. Deploy intelligent process automation to eliminate manual data entry, streamline cross-departmental workflows, and automate IT infrastructure.",
  keywords: [
    "enterprise workflow automation",
    "intelligent process automation",
    "document workflow automation",
    "automated data processing",
    "business process automation tools",
    "AI business process automation",
    "Ops automation",
    "automation tools for business",
    "intelligent automation tools",
    "business AI solutions",
    "automation in IT operations",
    "enterprise operations automation",
    "operations automation",
    "automated business operations",
    "operations and automation",
    "ScalePods opspod",
  ],
  alternates: {
    canonical: "https://www.scalepods.co/solution/ops-workflow-automation",
  },
  openGraph: {
    title: "Enterprise Operations & Process Workflow Automation | ScalePods",
    description:
      "Scale enterprise operations with modern workflow automation. Deploy intelligent process automation to eliminate manual data entry, streamline cross-departmental workflows, and automate IT infrastructure.",
    url: "https://www.scalepods.co/solution/ops-workflow-automation",
    siteName: "ScalePods",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise Operations & Process Workflow Automation | ScalePods",
    description:
      "Scale enterprise operations with modern workflow automation. Deploy intelligent process automation to eliminate manual data entry, streamline cross-departmental workflows, and automate IT infrastructure.",
  },
};

const opsSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.scalepods.co/solution/ops-workflow-automation/#service",
  "name": "Enterprise Operations & Process Workflow Automation Pod",
  "provider": {
    "@type": "Organization",
    "name": "ScalePods",
    "url": "https://www.scalepods.co",
    "logo": "https://www.scalepods.co/scalepods-logo.png"
  },
  "description": "Scale enterprise operations with modern workflow automation. Deploy intelligent process automation to eliminate manual data entry, streamline cross-departmental workflows, and automate IT infrastructure.",
  "areaServed": "Worldwide",
  "category": "Operations and Enterprise Process Automation Software"
};

export default function OperationsWorkflowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={opsSchema} />
      {children}
    </>
  );
}
