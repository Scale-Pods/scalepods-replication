import type { Metadata } from "next";

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

export default function OperationsWorkflowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
