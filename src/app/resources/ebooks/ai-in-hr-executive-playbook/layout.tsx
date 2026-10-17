import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HR Automation: AI in HR Executive Playbook | ScalePods",
  description:
    "Download the free ScalePods AI in HR Executive Playbook. Explore HR automation, recruitment workflows, AI maturity, and a practical 90-day implementation blueprint.",
  alternates: {
    canonical: "https://www.scalepods.co/resources/ebooks/ai-in-hr-executive-playbook",
  },
  openGraph: {
    title: "HR Automation: AI in HR Executive Playbook | ScalePods",
    description:
      "Download the free ScalePods AI in HR Executive Playbook. Explore HR automation, recruitment workflows, AI maturity, and a practical 90-day implementation blueprint.",
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
