import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ScalePods – New Gen AI Automation Partner",
  description:
    "We build smart workflows that automate the repetitive, reduce overheads, and keep teams lean.",
  keywords: ["AI automation", "workflow automation", "AI agents", "ScalePods"],
  openGraph: {
    title: "ScalePods – New Gen AI Automation Partner",
    description: "Automate the Busywork. Unlock Growth.",
    url: "https://scalepods.co",
    siteName: "ScalePods",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${instrumentSerif.variable} antialiased`}
        style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
