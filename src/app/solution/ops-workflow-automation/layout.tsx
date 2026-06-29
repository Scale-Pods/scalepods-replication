import type { Metadata } from "next";
import JsonLd from "@/components/SEO/JsonLd";

export const metadata: Metadata = {
  title: "AI Operations & Audit Automation | ScalePods",
  description: "Deploy autonomous Operations Pods to verify purchase invoices, cross-check documents, validate quality certificates, and catch mismatch risks instantly.",
  alternates: {
    canonical: "https://www.scalepods.co/solution/ops-workflow-automation",
  },
  openGraph: {
    title: "AI Operations & Audit Automation | ScalePods",
    description: "Deploy autonomous Operations Pods to verify purchase invoices, cross-check documents, validate quality certificates, and catch mismatch risks instantly.",
    url: "https://www.scalepods.co/solution/ops-workflow-automation",
    siteName: "ScalePods",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Operations & Audit Automation | ScalePods",
    description: "Deploy autonomous Operations Pods to verify purchase invoices, cross-check documents, validate quality certificates, and catch mismatch risks instantly.",
  },
};

const opsSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.scalepods.co/solution/ops-workflow-automation/#service",
  "name": "Operations & Audit Workflow Automation Pod",
  "provider": {
    "@type": "Organization",
    "name": "ScalePods",
    "url": "https://www.scalepods.co",
    "logo": "https://www.scalepods.co/scalepods-logo.png"
  },
  "description": "Deploy autonomous Operations Pods to verify purchase invoices, cross-check documents, validate quality certificates, and catch mismatch risks instantly.",
  "areaServed": "Worldwide",
  "category": "Operations and Audit Automation"
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
