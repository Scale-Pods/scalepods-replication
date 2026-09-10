import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources & Executive Guides | ScalePods",
  description:
    "Free executive playbooks, eBooks, and frameworks for implementing AI employees and workflow automation across sales, HR, marketing, and operations.",
  alternates: {
    canonical: "https://www.scalepods.co/resources",
  },
  openGraph: {
    title: "Resources & Executive Guides | ScalePods",
    description:
      "Free executive playbooks, eBooks, and frameworks for implementing AI employees and workflow automation across sales, HR, marketing, and operations.",
    url: "https://www.scalepods.co/resources",
    siteName: "ScalePods",
    type: "website",
  },
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
