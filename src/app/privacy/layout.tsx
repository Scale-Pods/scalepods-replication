import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | ScalePods",
  description:
    "Read the ScalePods Privacy Policy. Learn how we collect, protect, and handle data across our website and automated AI workflow platforms.",
  alternates: {
    canonical: "https://www.scalepods.co/privacy",
  },
  openGraph: {
    title: "Privacy Policy | ScalePods",
    description:
      "Read the ScalePods Privacy Policy. Learn how we collect, protect, and handle data across our website and automated AI workflow platforms.",
    url: "https://www.scalepods.co/privacy",
    siteName: "ScalePods",
    type: "website",
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
