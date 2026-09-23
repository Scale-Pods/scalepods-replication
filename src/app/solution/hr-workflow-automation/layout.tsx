import type { Metadata } from "next";
import JsonLd from "@/components/SEO/JsonLd";

export const metadata: Metadata = {
  title: "Autonomous HR & Talent Workflow Automation | ScalePods",
  description:
    "Build your elite team with modern HR workflow automation. Automate candidate sourcing, AI resume screening, automated interview scheduling, and onboarding automation 24/7.",
  keywords: [
    "HR workflow automation",
    "recruitment automation",
    "HR onboarding automation",
    "talent acquisition",
    "AI HR",
    "automated resume screening",
    "AI and HR",
    "automated interview scheduling",
    "automated scheduling system",
    "HR automation tools",
    "automated hiring system",
    "recruitment process automation",
    "HR automation solutions",
    "autonomous HR workflows",
    "AI HR agent",
    "ScalePods hrpod",
  ],
  alternates: {
    canonical: "https://www.scalepods.co/solution/hr-workflow-automation",
  },
  openGraph: {
    title: "Autonomous HR & Talent Workflow Automation | ScalePods",
    description:
      "Scale talent acquisition with next-generation recruitment automation, AI resume screening, automated interview scheduling, and onboarding compliance.",
    url: "https://www.scalepods.co/solution/hr-workflow-automation",
    siteName: "ScalePods",
    type: "website",
  },
};

const hrSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.scalepods.co/solution/hr-workflow-automation/#service",
  "name": "HR & Talent Workflow Automation Pod",
  "provider": {
    "@type": "Organization",
    "name": "ScalePods",
    "url": "https://www.scalepods.co",
    "logo": "https://www.scalepods.co/scalepods-logo.png"
  },
  "description": "Build your elite team with modern HR workflow automation. Automate candidate sourcing, AI resume screening, automated interview scheduling, and onboarding automation 24/7.",
  "areaServed": "Worldwide",
  "category": "HR and Recruitment Automation Software"
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
