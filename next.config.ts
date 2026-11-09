import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  compress: true,
  productionBrowserSourceMaps: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 85, 90, 92, 95],
    minimumCacheTTL: 604800, // 7 days
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  async redirects() {
    return [
      // ── Core & Landing Page Redirects ──────────────────────────────────────────
      {
        source: '/salespod',
        destination: '/solution/sales-workflow-automation',
        permanent: true,
      },
      {
        source: '/use-cases',
        destination: '/',
        permanent: true,
      },
      {
        source: '/solution/operations-automation',
        destination: '/solution/ops-workflow-automation',
        permanent: true,
      },
      {
        source: '/blog/operations-automation-guide',
        destination: '/solution/ops-workflow-automation',
        permanent: true,
      },
      {
        source: '/gcc',
        destination: '/global',
        permanent: true,
      },
      {
        source: '/uae',
        destination: '/global',
        permanent: true,
      },
      {
        source: '/resources/ebooks',
        destination: '/resources',
        permanent: true,
      },
      {
        source: '/ai-automation-for-manufacturing',
        destination: '/solution/ai-automation-for-manufacturing',
        permanent: true,
      },
      {
        source: '/ai-automation-for-real-estate',
        destination: '/solution/ai-automation-for-real-estate',
        permanent: true,
      },

      // ── Case Studies (Consolidate /blog/[slug] to /case-study/[slug]) ──────────
      {
        source: '/blog/lotus-manor-case-study',
        destination: '/case-study/lotus-manor-real-estate-sales-automation-dubai',
        permanent: true,
      },
      {
        source: '/blog/lotus-manor-real-estate-sales-automation-dubai',
        destination: '/case-study/lotus-manor-real-estate-sales-automation-dubai',
        permanent: true,
      },
      {
        source: '/blog/zv-steels-recruitment-automation-tool',
        destination: '/case-study/zv-steels-recruitment-automation-tool',
        permanent: true,
      },
      {
        source: '/blog/asquared-real-estate-sales-automation-dubai',
        destination: '/case-study/asquared-real-estate-sales-automation-dubai',
        permanent: true,
      },
      {
        source: '/blog/lootah-group-procurement-workflow-automation',
        destination: '/case-study/lootah-group-procurement-workflow-automation',
        permanent: true,
      },
      {
        source: '/blog/macro-media-finance-workflow-automation',
        destination: '/case-study/macro-media-finance-workflow-automation',
        permanent: true,
      },
      {
        source: '/blog/bennett-realty-growth-os',
        destination: '/case-study/bennett-realty-growth-os',
        permanent: true,
      },
      {
        source: '/blog/victory-energy-business-automation',
        destination: '/case-study/victory-energy-business-automation',
        permanent: true,
      },
      {
        source: '/blog/ryan-schwartz-fub-crm-automation',
        destination: '/case-study/ryan-schwartz-fub-crm-automation',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
