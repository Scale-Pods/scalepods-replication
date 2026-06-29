import type { Metadata } from "next";
import JsonLd from "@/components/SEO/JsonLd";

export const metadata: Metadata = {
  title: "HR Workflow Automation | ScalePods",
  description:
    "Deploy autonomous HR infrastructure to scale your talent acquisition and hiring velocity. Automate candidate screening, resume intelligence, and interview coordination.",
  keywords: [
    "AI HR agent",
    "autonomous recruitment",
    "candidate screening automation",
    "ScalePods hrpod",
    "AI recruitment infrastructure",
    "interview scheduling automation",
    "HR workflow automation",
  ],
  alternates: {
    canonical: "https://www.scalepods.co/solution/hr-workflow-automation",
  },
  openGraph: {
    title: "HR Workflow Automation | ScalePods",
    description: "Scale talent acquisition with autonomous candidate screening and interview coordination.",
    url: "https://www.scalepods.co/solution/hr-workflow-automation",
    siteName: "ScalePods",
    type: "website",
  },
};

const hrSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.scalepods.co/solution/hr-workflow-automation/#service",
  "name": "HR & Recruitment Workflow Automation Pod",
  "provider": {
    "@type": "Organization",
    "name": "ScalePods",
    "url": "https://www.scalepods.co",
    "logo": "https://www.scalepods.co/scalepods-logo.png"
  },
  "description": "Deploy autonomous HR infrastructure to scale your talent acquisition and hiring velocity. Automate candidate screening, resume intelligence, and interview coordination.",
  "areaServed": "Worldwide",
  "category": "HR and Recruitment Automation"
};

export default function HRWorkflowAutomationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <JsonLd data={hrSchema} />
      {children}
    </>
  );
}
