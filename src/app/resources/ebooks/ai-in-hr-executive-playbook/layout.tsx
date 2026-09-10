import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI in HR: The Executive Playbook | ScalePods",
  description:
    "Download the executive playbook for building an AI-first HR organization. Includes maturity models, a 90-day implementation blueprint, and architecture diagrams.",
  alternates: {
    canonical: "https://www.scalepods.co/resources/ebooks/ai-in-hr-executive-playbook",
  },
  openGraph: {
    title: "AI in HR: The Executive Playbook | ScalePods",
    description:
      "Download the executive playbook for building an AI-first HR organization. Includes maturity models, a 90-day implementation blueprint, and architecture diagrams.",
    url: "https://www.scalepods.co/resources/ebooks/ai-in-hr-executive-playbook",
    siteName: "ScalePods",
    type: "article",
  },
};

export default function AIInHREbookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
