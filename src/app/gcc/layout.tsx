import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plug & Play AI Workflow Pods | ScalePods Global",
  description: "Experience the future of AI-native business operations. Seamlessly integrate modular AI pods into your marketing, sales, HR, and ops workflows with ScalePods.",
  openGraph: {
    title: "Plug & Play AI Workflow Pods | ScalePods Global",
    description: "Modular AI infrastructure designed for the next generation of business scale.",
    url: "https://scalepods.co/gcc",
    siteName: "ScalePods",
    images: [
      {
        url: "/og-gcc.png",
        width: 1200,
        height: 630,
        alt: "ScalePods Global AI Infrastructure",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function GCCLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
