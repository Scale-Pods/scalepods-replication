import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Marketing Workflow Automation | ScalePods",
  description: "Deploy autonomous Marketing Pods to automate your entire marketing lifecycle: strategy, copywriting, approvals, publishing, and real-time performance analytics.",
  alternates: {
    canonical: "https://www.scalepods.co/solution/marketing-workflow-automation",
  },
  openGraph: {
    title: "AI Marketing Workflow Automation | ScalePods",
    description: "Deploy autonomous Marketing Pods to automate your entire marketing lifecycle: strategy, copywriting, approvals, publishing, and real-time performance analytics.",
    url: "https://www.scalepods.co/solution/marketing-workflow-automation",
    siteName: "ScalePods",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Marketing Workflow Automation | ScalePods",
    description: "Deploy autonomous Marketing Pods to automate your entire marketing lifecycle: strategy, copywriting, approvals, publishing, and real-time performance analytics.",
  },
};

export default function MarketingWorkflowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
