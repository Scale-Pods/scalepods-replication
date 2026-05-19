import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ScalePods — Growth, Automated.",
  description: "Explore how ScalePods automates complex business processes. From Exhibition Automation to AI Voice Agents, see our technology in action across multiple industries.",
  openGraph: {
    title: "ScalePods — Growth, Automated.",
    description: "Real-world AI automation examples for modern businesses.",
    url: "https://scalepods.co/use-cases",
    siteName: "ScalePods",
    images: [
      {
        url: "/og-use-cases.png",
        width: 1200,
        height: 630,
        alt: "ScalePods AI Use Cases",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function UseCasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
