import React from "react";
import { Metadata } from "next";
import JsonLd from "@/components/SEO/JsonLd";

export const metadata: Metadata = {
  title: "AI Automation for Real Estate | ScalePods — Lead Gen, Marketing & Event ROI",
  description: "ScalePods automates real estate lead generation, marketing, and event follow-up with AI. Book a free workflow audit and get a custom automation roadmap.",
  alternates: {
    canonical: "https://scalepods.co/solution/ai-automation-for-real-estate",
  },
  openGraph: {
    title: "AI Automation for Real Estate | ScalePods",
    description: "ScalePods automates real estate lead generation, marketing, and event follow-up with AI. Book a free workflow audit and get a custom automation roadmap.",
    url: "https://scalepods.co/solution/ai-automation-for-real-estate",
    type: "website",
  },
};

export default function RealEstateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "AI Automation for Real Estate | ScalePods",
    "description": "ScalePods automates real estate lead generation, marketing, and event follow-up with AI. Book a free workflow audit and get a custom automation roadmap.",
    "url": "https://scalepods.co/solution/ai-automation-for-real-estate",
    "publisher": {
      "@type": "Organization",
      "name": "ScalePods",
      "logo": {
        "@type": "ImageObject",
        "url": "https://scalepods.co/logo.png"
      }
    }
  };

  return (
    <>
      <JsonLd data={schema} />
      {children}
    </>
  );
}
