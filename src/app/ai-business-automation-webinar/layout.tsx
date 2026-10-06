import type { Metadata, Viewport } from "next";
import JsonLd from "@/components/SEO/JsonLd";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#04070D",
};

export const metadata: Metadata = {
  title: "Live AI Business Automation Masterclass (₹99) | ScalePods with Adnan Sheikh & Raunak Kumar",
  description:
    "Join ScalePods founders Adnan Sheikh (CEO) & Raunak Kumar (CTO/CPO) in a live, founder-led AI masterclass. Discover how AI automates 60–80% of repetitive workflows across Sales, Marketing, HR & Operations. Reserve your seat for just ₹99.",
  alternates: {
    canonical: "https://www.scalepods.co/ai-business-automation-webinar",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Live AI Business Automation Masterclass (₹99) | ScalePods",
    description:
      "Your business doesn't need more people. It needs better systems. Discover how AI-powered automation can eliminate repetitive work across Sales, Marketing, HR & Operations. Live with Adnan Sheikh & Raunak Kumar.",
    url: "https://www.scalepods.co/ai-business-automation-webinar",
    siteName: "ScalePods",
    type: "website",
    images: [
      {
        url: "/images/team/adnan.jpeg",
        width: 800,
        height: 800,
        alt: "Adnan Sheikh & Raunak Kumar - Hosts of ScalePods AI Business Automation Masterclass",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Live AI Business Automation Masterclass (₹99) | ScalePods",
    description:
      "Automate 60–80% of repetitive business workflows across Sales, Marketing, HR & Operations. Live practical demonstration with ScalePods founders Adnan Sheikh & Raunak Kumar.",
    images: ["/images/team/adnan.jpeg"],
  },
};

const webinarSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationEvent",
      "@id": "https://www.scalepods.co/ai-business-automation-webinar#event",
      "name": "AI Business Automation Masterclass: How Businesses Automate 60–80% of Repetitive Workflows Using AI",
      "description": "A live, founder-led business automation masterclass with Adnan Sheikh (Co-Founder & CEO) and Raunak Kumar (Co-Founder, CTO & CPO) exploring practical business workflows, automation patterns, and the 4-Layer Automation System across Sales, Marketing, HR and Operations.",
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
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
          "name": "Adnan Sheikh",
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
          "name": "Is this only for technology companies?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. The framework is built around universal business workflows and can apply across Sales, Marketing, HR, Operations and other functions."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need technical knowledge?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. The focus is on understanding business workflows and how AI/automation can be applied to them."
          }
        },
        {
          "@type": "Question",
          "name": "Will you demonstrate actual workflows?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. A live workflow demonstration is a core part of the session."
          }
        },
        {
          "@type": "Question",
          "name": "Will both founders be speaking?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. The session is designed to bring together Adnan's business, sales and operational perspective with Raunak's product, technology and AI perspective."
          }
        },
        {
          "@type": "Question",
          "name": "Is this just about AI tools?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. The emphasis is on systems, workflows and business outcomes, rather than simply learning a collection of tools."
          }
        },
        {
          "@type": "Question",
          "name": "When is the webinar?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Date & Time: [TO BE CONFIRMED]. Registered attendees will receive calendar invites, reminder emails, and direct access links once the date is finalized."
          }
        },
        {
          "@type": "Question",
          "name": "How much does it cost?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "₹99/- only. This is a one-time registration for access to the live interactive masterclass."
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
