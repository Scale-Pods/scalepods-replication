import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Employees & Workflow Automation eBook | ScalePods",
  description:
    "Download the free ScalePods eBook to explore AI employees, AI workflow automation, and business workflow automation for sales, marketing, HR, and operations.",
  alternates: {
    canonical: "https://www.scalepods.co/resources/ebooks/ai-employees-digital-workforce",
  },
  openGraph: {
    title: "AI Employees & Workflow Automation eBook | ScalePods",
    description:
      "Download the free ScalePods eBook to explore AI employees, AI workflow automation, and business workflow automation for sales, marketing, HR, and operations.",
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
