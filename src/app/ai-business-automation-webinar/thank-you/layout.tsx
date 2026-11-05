import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registration Confirmed | AI Business Automation Masterclass | ScalePods",
  description:
    "Your registration for the ScalePods AI Business Automation Live Masterclass is confirmed. Join the attendee VIP WhatsApp group for live access links and resources.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

