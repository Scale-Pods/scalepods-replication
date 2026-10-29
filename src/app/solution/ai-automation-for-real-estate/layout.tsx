import React from "react";
import { Metadata } from "next";
import JsonLd from "@/components/SEO/JsonLd";

export const metadata: Metadata = {
  title: "AI Automation for Real Estate & Sales Pipelines | ScalePods",
  description:
    "Deploy practical AI for real estate solutions. Automate client discovery, accelerate site viewing schedules, and build a unified buyer engagement pipeline in under 30 days.",
  keywords: [
    "AI for real estate",
    "real estate AI tools",
    "AI for real estate marketing",
    "real estate workflow automation",
    "automation in real estate",
    "AI in real estate industry",
    "real estate sales crm",
    "real estate lead generation",
    "CRM tools for real estate",
    "real estate lead gen",
    "AI for real estate leads",
    "real estate lead nurturing",
    "real estate lead crm",
    "AI for real estate agents",
    "real estate marketing systems",
    "best AI for real estate",
    "marketing automation for real estate",
    "real estate crm lead management",
    "real estate lead follow-up",
    "IT in real estate",
    "real estate workflow automation software",
    "real estate sales pipeline",
    "real estate CRM workflow",
    "real estate agent automation",
    "AI use cases in real estate",
    "AI chatbot real estate",
    "crm for real estate",
    "real estate drip campaigns",
    "AI tools for real estate",
    "real estate marketing CRM",
    "real estate and AI"
  ],
  alternates: {
    canonical: "https://www.scalepods.co/solution/ai-automation-for-real-estate",
  },
  openGraph: {
    title: "AI Automation for Real Estate | ScalePods",
    description:
      "Deploy practical AI for real estate solutions. Automate client discovery, accelerate site viewing schedules, and build a unified buyer engagement pipeline in under 30 days.",
    url: "https://www.scalepods.co/solution/ai-automation-for-real-estate",
    siteName: "ScalePods",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Automation for Real Estate | ScalePods",
    description:
      "Deploy practical AI for real estate solutions. Automate client discovery, accelerate site viewing schedules, and build a unified buyer engagement pipeline in under 30 days.",
  },
};

export default function RealEstateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.scalepods.co/solution/ai-automation-for-real-estate/#webpage",
        "url": "https://www.scalepods.co/solution/ai-automation-for-real-estate",
        "name": "AI Automation for Real Estate | ScalePods",
        "description": "Deploy practical AI for real estate solutions. Automate client discovery, accelerate site viewing schedules, and build a unified buyer engagement pipeline in under 30 days.",
        "publisher": {
          "@type": "Organization",
          "name": "ScalePods",
          "url": "https://www.scalepods.co",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.scalepods.co/logo.png"
          }
        }
      },
      {
        "@type": "Service",
        "@id": "https://www.scalepods.co/solution/ai-automation-for-real-estate/#service",
        "name": "Real Estate AI Workflow Automation Pods",
        "provider": {
          "@type": "Organization",
          "name": "ScalePods"
        },
        "description": "Enterprise AI workflow automation for real estate developers, brokerages, and agencies — including sales outreach, marketing content generation, and exhibition lead capture.",
        "serviceType": "AI Workflow Automation"
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.scalepods.co/solution/ai-automation-for-real-estate/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What are the main AI use cases in real estate?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The top AI use cases in real estate include automated lead capture, 24/7 buyer qualification via WhatsApp, tailored property recommendation engines, site-visit bookings, ad campaign optimization, and booth lead processing during trade shows."
            }
          },
          {
            "@type": "Question",
            "name": "How does AI for real estate leads improve overall conversion rates?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "By delivering responses in under 60 seconds, pre-qualifying buyer timelines and budgets, and routing serious prospects directly to brokers, real estate CRM and lead generation platforms prevent cold lead drop-off and increase viewing conversions."
            }
          },
          {
            "@type": "Question",
            "name": "Can an AI chatbot real estate engine integrate with our current setup?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. An AI real estate chatbot or conversational agent connects directly to your existing crm for real estate teams (such as Salesforce, HubSpot, Zoho, or Property Finder) using secure APIs and Model Context Protocol (MCP)."
            }
          },
          {
            "@type": "Question",
            "name": "How does real estate agent automation support sales brokers?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Automation handles repetitive administrative work—such as entering contact data, scheduling viewings, delivering brochures, and running follow-up real estate drip campaigns—allowing brokers to focus on closing deals."
            }
          },
          {
            "@type": "Question",
            "name": "What role do AI tools for real estate play in real estate marketing?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "They automate property copy generation, social content scheduling, ad budget optimization, and audience retargeting to maintain a consistent real estate marketing CRM acquisition pipeline."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <JsonLd data={schema} />
      {children}
    </>
  );
}
