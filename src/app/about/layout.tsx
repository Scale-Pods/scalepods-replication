import type { Metadata } from "next";
import JsonLd from "@/components/SEO/JsonLd";

export const metadata: Metadata = {
  title: "About Us | ScalePods",
  description:
    "We help businesses grow without adding the weight that usually comes with growth. Meet the co-founders, explore our timeline of milestones, and learn the values that drive our AI workflow automation pods.",
  alternates: {
    canonical: "https://www.scalepods.co/about",
  },
  openGraph: {
    title: "About Us | ScalePods",
    description:
      "We help businesses grow without adding the weight that usually comes with growth. Meet the co-founders, explore our timeline of milestones, and learn the values that drive our AI workflow automation pods.",
    url: "https://www.scalepods.co/about",
    siteName: "ScalePods",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | ScalePods",
    description:
      "We help businesses grow without adding the weight that usually comes with growth. Meet the co-founders, explore our timeline of milestones, and learn the values that drive our AI workflow automation pods.",
  },
};

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": "https://www.scalepods.co/about/#webpage",
      "url": "https://www.scalepods.co/about",
      "name": "About Us | ScalePods",
      "isPartOf": {
        "@id": "https://www.scalepods.co/#website"
      },
      "description": "We help businesses grow without adding the weight that usually comes with growth. Meet the co-founders, explore our timeline of milestones, and learn the values that drive our AI workflow automation pods."
    }
  ]
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={aboutPageSchema} />
      {children}
    </>
  );
}
