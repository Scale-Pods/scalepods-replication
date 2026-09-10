import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | ScalePods",
  description:
    "Read the ScalePods Terms of Service governing the use of our website, AI workflow automation pods, and professional consulting services.",
  alternates: {
    canonical: "https://www.scalepods.co/terms",
  },
  openGraph: {
    title: "Terms of Service | ScalePods",
    description:
      "Read the ScalePods Terms of Service governing the use of our website, AI workflow automation pods, and professional consulting services.",
    url: "https://www.scalepods.co/terms",
    siteName: "ScalePods",
    type: "website",
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
