import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Script from "next/script";
import ChatbotLoader from "@/components/ui/ChatbotLoader";

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
        
        {/* Scalepods Chatbot Integration */}
        <ChatbotLoader />

        {/* Global scroll fade-up animation via IntersectionObserver */}
        <Script id="scroll-fade-up" strategy="afterInteractive">{`
          (function() {
            var observer = new IntersectionObserver(function(entries) {
              entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                  entry.target.style.opacity = '1';
                  entry.target.style.transform = 'translateY(0)';
                  entry.target.style.transition = 'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)';
                  observer.unobserve(entry.target);
                }
              });
            }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

            function applyToSection(section) {
              // Animate direct children of sections that are not already animated by framer
              Array.from(section.children).forEach(function(child, i) {
                if (!child.hasAttribute('data-scroll-observed')) {
                  child.setAttribute('data-scroll-observed', '1');
                  child.style.opacity = '0';
                  child.style.transform = 'translateY(28px)';
                  child.style.transitionDelay = (i * 0.07) + 's';
                  observer.observe(child);
                }
              });
            }

            function init() {
              document.querySelectorAll('section').forEach(applyToSection);
            }

            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', init);
            } else {
              init();
            }

            // Also re-run on route changes (Next.js SPA navigation)
            var pushState = history.pushState;
            history.pushState = function() {
              pushState.apply(history, arguments);
              setTimeout(init, 300);
            };
          })();
        `}</Script>
      </body>
    </html>
  );
}
