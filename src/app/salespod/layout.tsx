import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SalesPod — Autonomous AI Sales Infrastructure | ScalePods",
  description:
    "Deploy autonomous sales infrastructure for high-velocity pipelines. Automate lead sourcing, hyper-personalized outreach, and omnichannel execution with zero manual overhead.",
  keywords: [
    "AI sales agent",
    "autonomous outbound",
    "lead scraping automation",
    "ScalePods salespod",
    "AI outbound infrastructure",
    "cold email automation",
  ],
  openGraph: {
    title: "SalesPod — Autonomous AI Sales Infrastructure | ScalePods",
    description: "Automate outbound prospecting and personalized outreach at scale.",
    url: "https://scalepods.co/salespod",
    siteName: "ScalePods",
    type: "website",
  },
};

export default function SalesPodLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
