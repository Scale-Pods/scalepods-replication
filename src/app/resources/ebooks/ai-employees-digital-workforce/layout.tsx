import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Employees Ebook: Meet the Digital Workforce | ScalePods",
  description:
    "Download the free executive guide to AI employees: how AI agents operate 24/7 across Sales, Marketing, HR, and Operations to eliminate repetitive busywork.",
  alternates: {
    canonical: "https://www.scalepods.co/resources/ebooks/ai-employees-digital-workforce",
  },
  openGraph: {
    title: "AI Employees Ebook: Meet the Digital Workforce | ScalePods",
    description:
      "Download the free executive guide to AI employees: how AI agents operate 24/7 across Sales, Marketing, HR, and Operations to eliminate repetitive busywork.",
    url: "https://www.scalepods.co/resources/ebooks/ai-employees-digital-workforce",
    siteName: "ScalePods",
    type: "article",
  },
};

export default function AIEmployeesEbookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
