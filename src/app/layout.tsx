import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Script from "next/script";
import ChatbotLoader from "@/components/ui/ChatbotLoader";
import ClarityProvider from "@/components/ui/ClarityProvider";
import MetaPageViewTracker from "@/components/analytics/MetaPageViewTracker";

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
import JsonLd from "@/components/SEO/JsonLd";

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

const globalSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.scalepods.co/#organization",
      "name": "ScalePods",
      "url": "https://www.scalepods.co",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://www.scalepods.co/#logo",
        "url": "https://www.scalepods.co/scalepods-logo.png",
        "caption": "ScalePods Logo"
      },
      "image": {
        "@id": "https://www.scalepods.co/#logo"
      },
      "sameAs": [
        "https://www.linkedin.com/company/scalepods-co/",
        "https://www.instagram.com/scalepods.co/"
      ],
      "email": "info@scalepods.co",
      "description": "Architecting the future of enterprise operations through autonomous Agentic AI ecosystems."
    },
    {
      "@type": "WebSite",
      "@id": "https://www.scalepods.co/#website",
      "url": "https://www.scalepods.co",
      "name": "ScalePods",
      "publisher": {
        "@id": "https://www.scalepods.co/#organization"
      },
      "description": "Architecting the future of enterprise operations through autonomous Agentic AI ecosystems."
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <JsonLd data={globalSchema} />

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

        {/* Google Tag Manager */}
        <Script
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5FFD5XBQ');`,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${instrumentSerif.variable} antialiased`}
        style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5FFD5XBQ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        {/* Meta Pixel is now managed in Google Tag Manager (GTM-5FFD5XBQ) —
            do NOT re-add it here or it will double-fire (duplicate Pixel ID). */}

        {/* Google Analytics 4 */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-MKXW098PHJ"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MKXW098PHJ');
          `}
        </Script>

        <ThemeProvider>
          <ClarityProvider />
          <MetaPageViewTracker />
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
