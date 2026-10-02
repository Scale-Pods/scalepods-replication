import type { Metadata, Viewport } from "next";
import JsonLd from "@/components/SEO/JsonLd";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#04070D",
};

export const metadata: Metadata = {
  title: "Live AI Business Automation Webinar (₹99) | ScalePods with Adnan Shaikh",
  description:
    "Join Adnan Shaikh in a live, practical business automation webinar. Discover how AI automates 60–80% of repetitive workflows across Sales, Marketing, HR & Operations without coding. Reserve your seat for just ₹99.",
  alternates: {
    canonical: "https://www.scalepods.co/ai-business-automation-webinar",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Live AI Business Automation Webinar (₹99) | ScalePods",
    description:
      "Your business doesn't need more people. It needs better systems. Discover how AI can automate 60-80% of repetitive work across Sales, Marketing, HR & Operations. Live with Adnan Shaikh.",
    url: "https://www.scalepods.co/ai-business-automation-webinar",
    siteName: "ScalePods",
    type: "website",
    images: [
      {
        url: "/images/team/adnan.jpeg",
        width: 800,
        height: 800,
        alt: "Adnan Shaikh - Host of ScalePods AI Business Automation Webinar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Live AI Business Automation Webinar (₹99) | ScalePods",
    description:
      "Automate 60–80% of repetitive business workflows across Sales, Marketing, HR & Operations. Live practical demonstration with Adnan Shaikh.",
    images: ["/images/team/adnan.jpeg"],
  },
};

const webinarSchema = {
  "@context": "https://schema.org",
  "@type": "EducationEvent",
  "name": "How Businesses Are Automating 60–80% of Their Repetitive Workflows Using AI",
  "description": "A live, practical business automation webinar with Adnan Shaikh exploring real business workflows, automation patterns, and the 4-Layer Automation System across Sales, Marketing, HR and Operations.",
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
  "performer": {
    "@type": "Person",
    "name": "Adnan Shaikh",
    "jobTitle": "Co-Founder / Business & Automation Strategist",
    "worksFor": {
      "@type": "Organization",
      "name": "ScalePods"
    }
  },
  "offers": {
    "@type": "Offer",
    "name": "Live Webinar Access Ticket",
    "price": "99",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock",
    "url": "https://www.scalepods.co/ai-business-automation-webinar",
    "validFrom": "2025-01-01"
  }
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
