import type { Metadata } from "next";
import JsonLd from "@/components/SEO/JsonLd";

export const metadata: Metadata = {
  title: "Enterprise Marketing Workflow Automation | ScalePods",
  description:
    "Scale growth engines with enterprise marketing workflow automation. Deploy AI workflow automation to unify multichannel messaging, accelerate demand capture, and automate lifecycle email and CRM operations.",
  keywords: [
    "enterprise marketing workflow automation",
    "marketing workflow automation",
    "AI workflow automation",
    "lead generation automation",
    "email marketing automation software",
    "AI marketing automation",
    "workflow automation tools",
    "social media marketing automation",
    "social media automation platforms",
    "email marketing automation",
    "email automation workflow",
    "CRM automation",
    "enterprise marketing automation platform",
    "marketing automation software",
    "ScalePods marketing pod",
  ],
  alternates: {
    canonical: "https://www.scalepods.co/solution/marketing-workflow-automation",
  },
  openGraph: {
    title: "Enterprise Marketing Workflow Automation | ScalePods",
    description:
      "Scale growth engines with enterprise marketing workflow automation. Deploy AI workflow automation to unify multichannel messaging, accelerate demand capture, and automate lifecycle email and CRM operations.",
    url: "https://www.scalepods.co/solution/marketing-workflow-automation",
    siteName: "ScalePods",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise Marketing Workflow Automation | ScalePods",
    description:
      "Scale growth engines with enterprise marketing workflow automation. Deploy AI workflow automation to unify multichannel messaging, accelerate demand capture, and automate lifecycle email and CRM operations.",
  },
};

const marketingSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.scalepods.co/solution/marketing-workflow-automation/#service",
  "name": "Enterprise Marketing Workflow Automation Pod",
  "provider": {
    "@type": "Organization",
    "name": "ScalePods",
    "url": "https://www.scalepods.co",
    "logo": "https://www.scalepods.co/scalepods-logo.png"
  },
  "description": "Scale growth engines with enterprise marketing workflow automation. Deploy AI workflow automation to unify multichannel messaging, accelerate demand capture, and automate lifecycle email and CRM operations.",
  "areaServed": "Worldwide",
  "category": "Marketing Automation Software"
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
