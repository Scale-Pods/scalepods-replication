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
import type { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8FAF7" },
    { media: "(prefers-color-scheme: dark)", color: "#04070D" },
  ],
};


export const metadata: Metadata = {
  metadataBase: new URL("https://scalepods.co"),
  title: "ScalePods — Growth, Automated.",
  description:
    "We build smart workflows that automate the repetitive, reduce overheads, and keep teams lean.",
  keywords: ["AI automation", "workflow automation", "AI agents", "ScalePods"],
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "ScalePods — Growth, Automated.",
    description: "Automate the Busywork. Unlock Growth.",
    url: "https://scalepods.co",
    siteName: "ScalePods",
    type: "website",
  },
  verification: {
    google: "8aOPEFl4dWIxTJhXRiL12CxEUluEWB2sWfejshT_d8k",
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
                  var effectiveTheme = 'dark';
                  if (theme === 'light' || (!theme && !window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    effectiveTheme = 'light';
                  }
                  document.documentElement.setAttribute('data-theme', effectiveTheme);
                  document.documentElement.style.colorScheme = effectiveTheme;
                  if (effectiveTheme === 'dark') {
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
        {/* Meta Pixel Code */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}
            (window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');

            fbq('init', '1413415307241242');
            fbq('track', 'PageView');
          `}
        </Script>

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1413415307241242&ev=PageView&noscript=1"
            alt="facebook-pixel"
          />
        </noscript>

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
              if (window.location.pathname !== '/') {
                return;
              }
              if (window.requestAnimationFrame) {
                window.requestAnimationFrame(function() {
                  document.querySelectorAll('section').forEach(applyToSection);
                });
              } else {
                document.querySelectorAll('section').forEach(applyToSection);
              }
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
              if (window.requestAnimationFrame) {
                window.requestAnimationFrame(function() {
                  setTimeout(init, 300);
                });
              } else {
                setTimeout(init, 300);
              }
            };
          })();
        `}</Script>
      </body>
    </html>
  );
}
