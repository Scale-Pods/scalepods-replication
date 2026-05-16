import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Script from "next/script";
import ChatbotLoader from "@/components/ui/ChatbotLoader";
import ClarityProvider from "@/components/ui/ClarityProvider";

const inter = localFont({
  src: [
    { path: "../fonts/inter/Inter-Regular.woff2",  weight: "400", style: "normal" },
    { path: "../fonts/inter/Inter-Italic.woff2",   weight: "400", style: "italic" },
    { path: "../fonts/inter/Inter-Medium.woff2",   weight: "500", style: "normal" },
    { path: "../fonts/inter/Inter-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/inter/Inter-Bold.woff2",     weight: "700", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = localFont({
  src: [
    { path: "../fonts/instrument-serif/InstrumentSerif-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/instrument-serif/InstrumentSerif-Italic.woff2",  weight: "400", style: "italic" },
  ],
  variable: "--font-instrument",
  display: "swap",
});

import { ThemeProvider } from "@/components/providers/ThemeProvider";

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
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var theme = localStorage.getItem('theme');
                  if (
                    theme === 'dark' ||
                    (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
                  ) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${instrumentSerif.variable} antialiased`}
        style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
      >
        <ThemeProvider>
          <ClarityProvider />
          <Navbar />
          {children}
          <Footer />
          
          {/* Scalepods Chatbot Integration */}
          <ChatbotLoader />
        </ThemeProvider>

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
