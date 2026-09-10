import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact ScalePods | Book an AI Workflow Audit",
  description:
    "Get in touch with ScalePods. Book a 1-on-1 workflow audit with our engineering team to design, deploy, and scale custom AI agent pods for your business.",
  alternates: {
    canonical: "https://www.scalepods.co/contact",
  },
  openGraph: {
    title: "Contact ScalePods | Book an AI Workflow Audit",
    description:
      "Get in touch with ScalePods. Book a 1-on-1 workflow audit with our engineering team to design, deploy, and scale custom AI agent pods for your business.",
    url: "https://www.scalepods.co/contact",
    siteName: "ScalePods",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
