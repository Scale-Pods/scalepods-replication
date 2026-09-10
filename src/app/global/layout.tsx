import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Global Enterprise AI Infrastructure | ScalePods",
  description: "Experience the future of AI-native business operations. Seamlessly integrate modular AI pods into your marketing, sales, HR, and ops workflows with ScalePods.",
  alternates: {
    canonical: "https://www.scalepods.co/global",
  },
  openGraph: {
    title: "Global Enterprise AI Infrastructure | ScalePods",
    description: "Modular AI infrastructure designed for the next generation of business scale.",
    url: "https://www.scalepods.co/global",
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

export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
