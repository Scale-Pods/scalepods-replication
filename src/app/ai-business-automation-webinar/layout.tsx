import type { Metadata, Viewport } from "next";
import JsonLd from "@/components/SEO/JsonLd";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#04070D",
};

export const metadata: Metadata = {
  title: "AI Business Automation Masterclass (₹99) | ScalePods",
  description:
    "Before you hire another person, discover how to identify repetitive tasks, connect disconnected workflows, and use AI automation across Sales, Marketing, HR, and Operations. Live founder-led masterclass for ₹99.",
  alternates: {
    canonical: "https://www.scalepods.co/ai-business-automation-webinar",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "AI Business Automation Masterclass (₹99) | ScalePods",
    description:
      "Before you hire another person, find out how much of your work your business could automate. Live online masterclass across Sales, Marketing, HR, and Operations.",
    url: "https://www.scalepods.co/ai-business-automation-webinar",
    siteName: "ScalePods",
    type: "website",
    images: [
      {
        url: "/images/team/adnan.jpeg",
        width: 800,
        height: 800,
        alt: "Adnan Shaikh & Raunak Kumar - Hosts of ScalePods AI Business Automation Masterclass",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Automation Masterclass (₹99) | ScalePods",
    description:
      "Discover how to identify repetitive business tasks and use AI automation across Sales, Marketing, HR, and Operations. Live with ScalePods founders.",
    images: ["/images/team/adnan.jpeg"],
  },
};

const webinarSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationEvent",
      "@id": "https://www.scalepods.co/ai-business-automation-webinar#event",
      "name": "AI Automation Masterclass: From Manual Work to Smarter Business Workflows",
      "description": "A live, founder-led session with Adnan Shaikh (Co-Founder & CEO) and Raunak Kumar (Co-Founder, CTO & CPO) on how businesses can identify and integrate AI-powered workflow automation across Sales, Marketing, HR, and Operations.",
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
      "startDate": "2026-11-20T18:30:00+05:30",
      "endDate": "2026-11-20T20:30:00+05:30",
      "location": {
        "@type": "VirtualLocation",
        "url": "https://www.scalepods.co/ai-business-automation-webinar"
      },
      "organizer": {
        "@type": "Organization",
        "name": "ScalePods",
        "url": "https://www.scalepods.co"
      },
      "performer": [
        {
          "@type": "Person",
          "name": "Adnan Shaikh",
          "jobTitle": "Co-Founder & CEO",
          "worksFor": {
            "@type": "Organization",
            "name": "ScalePods"
          }
        },
        {
          "@type": "Person",
          "name": "Raunak Kumar",
          "jobTitle": "Co-Founder, CTO & CPO",
          "worksFor": {
            "@type": "Organization",
            "name": "ScalePods"
          }
        }
      ],
      "offers": {
        "@type": "Offer",
        "name": "Live Masterclass Pass",
        "price": "99",
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock",
        "url": "https://www.scalepods.co/ai-business-automation-webinar",
        "validFrom": "2025-01-01"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.scalepods.co/ai-business-automation-webinar#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Do I need technical knowledge or coding skills?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. The session focuses on business problems, workflow patterns, and implementation considerations rather than teaching attendees to code or build automations."
          }
        },
        {
          "@type": "Question",
          "name": "Will I learn about Sales, Marketing, HR, and Operations?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. The masterclass will cover examples from all four functions and explain how common workflow patterns can be adapted to different business needs."
          }
        },
        {
          "@type": "Question",
          "name": "Is this a product demonstration or sales pitch?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The session is designed around understanding business challenges and the role of AI-powered workflow automation. Its purpose is to help you identify opportunities and understand the underlying approach, not to teach a specific product."
          }
        },
        {
          "@type": "Question",
          "name": "Will I learn how to automate my entire business?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, the goal is to help you recognize and prioritize opportunities, understand how workflows can be connected, and identify practical next steps. The right solution depends on your business processes, existing bottlenecks, data, and requirements."
          }
        },
        {
          "@type": "Question",
          "name": "When and where will the webinar take place?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The webinar will be conducted live online. The date and time will be announced on this page."
          }
        },
        {
          "@type": "Question",
          "name": "How much does registration cost?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The registration fee is ₹99."
          }
        }
      ]
    }
  ]
};

export default function WebinarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={webinarSchema} />
      {children}
    </>
  );
}
