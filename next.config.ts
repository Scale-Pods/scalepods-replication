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
        destination: '/solutions/sales-workflow-automation',
        permanent: true,
      },
      {
        source: '/use-cases',
        destination: '/',
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
        source: '/blog',
        destination: '/resources/blog',
        permanent: true,
      },
      {
        source: '/blog/case-studies',
        destination: '/resources/case-studies',
        permanent: true,
      },
      {
        source: '/case-study',
        destination: '/resources/case-studies',
        permanent: true,
      },

      // ── Solution Pages (/solution/* -> /solutions/*) ───────────────────────────
      {
        source: '/ai-automation-for-manufacturing',
        destination: '/solutions/manufacturing-workflow-automation',
        permanent: true,
      },
      {
        source: '/ai-automation-for-real-estate',
        destination: '/solutions/real-estate-workflow-automation',
        permanent: true,
      },
      {
        source: '/solution/operations-automation',
        destination: '/solutions/operations-workflow-automation',
        permanent: true,
      },
      {
        source: '/solution/ai-automation-for-manufacturing',
        destination: '/solutions/manufacturing-workflow-automation',
        permanent: true,
      },
      {
        source: '/solution/ai-automation-for-real-estate',
        destination: '/solutions/real-estate-workflow-automation',
        permanent: true,
      },
      {
        source: '/solution/hr-workflow-automation',
        destination: '/solutions/hr-workflow-automation',
        permanent: true,
      },
      {
        source: '/solution/marketing-workflow-automation',
        destination: '/solutions/marketing-workflow-automation',
        permanent: true,
      },
      {
        source: '/solution/ops-workflow-automation',
        destination: '/solutions/operations-workflow-automation',
        permanent: true,
      },
      {
        source: '/solution/sales-workflow-automation',
        destination: '/solutions/sales-workflow-automation',
        permanent: true,
      },

      // ── Case Studies (/blog/* & /case-study/* -> /resources/case-studies/*) ───
      {
        source: '/blog/lotus-manor-case-study',
        destination: '/resources/case-studies/lotus-manor-real-estate-sales-automation-dubai',
        permanent: true,
      },
      {
        source: '/case-study/lotus-manor-case-study',
        destination: '/resources/case-studies/lotus-manor-real-estate-sales-automation-dubai',
        permanent: true,
      },
      {
        source: '/blog/lotus-manor-real-estate-sales-automation-dubai',
        destination: '/resources/case-studies/lotus-manor-real-estate-sales-automation-dubai',
        permanent: true,
      },
      {
        source: '/blog/zv-steels-recruitment-automation-tool',
        destination: '/resources/case-studies/zv-steels-recruitment-automation-tool',
        permanent: true,
      },
      {
        source: '/blog/asquared-real-estate-sales-automation-dubai',
        destination: '/resources/case-studies/asquared-real-estate-sales-automation-dubai',
        permanent: true,
      },
      {
        source: '/blog/lootah-group-procurement-workflow-automation',
        destination: '/resources/case-studies/lootah-group-procurement-workflow-automation',
        permanent: true,
      },
      {
        source: '/blog/macro-media-finance-workflow-automation',
        destination: '/resources/case-studies/macro-media-finance-workflow-automation',
        permanent: true,
      },
      {
        source: '/blog/bennett-realty-growth-os',
        destination: '/resources/case-studies/bennett-realty-real-estate-workflow-automation',
        permanent: true,
      },
      {
        source: '/case-study/bennett-realty-growth-os',
        destination: '/resources/case-studies/bennett-realty-real-estate-workflow-automation',
        permanent: true,
      },
      {
        source: '/resources/case-studies/bennett-realty-growth-os',
        destination: '/resources/case-studies/bennett-realty-real-estate-workflow-automation',
        permanent: true,
      },
      {
        source: '/blog/bennett-realty-real-estate-workflow-automation',
        destination: '/resources/case-studies/bennett-realty-real-estate-workflow-automation',
        permanent: true,
      },
      {
        source: '/blog/victory-energy-business-automation',
        destination: '/resources/case-studies/victory-energy-business-automation',
        permanent: true,
      },
      {
        source: '/blog/ryan-schwartz-fub-crm-automation',
        destination: '/resources/case-studies/ryan-schwartz-fub-crm-automation',
        permanent: true,
      },
      {
        source: '/blog/miguel-clinic-lead-generation-automation',
        destination: '/resources/case-studies/miguel-clinic-lead-generation-automation',
        permanent: true,
      },
      {
        source: '/blog/wwr-real-estate-sales-automation-qatar',
        destination: '/resources/case-studies/wwr-real-estate-sales-automation-qatar',
        permanent: true,
      },
      {
        source: '/case-study/:slug',
        destination: '/resources/case-studies/:slug',
        permanent: true,
      },

      // ── Renamed Blog Slugs -> /resources/blog/* ────────────────────────────────
      {
        source: '/blog/operations-automation-guide',
        destination: '/resources/blog/operations-automation-guide-2026',
        permanent: true,
      },
      {
        source: '/resources/blog/operations-automation-guide',
        destination: '/resources/blog/operations-automation-guide-2026',
        permanent: true,
      },
      {
        source: '/blog/the-ai-marketing-edge-how-ai-is-reshaping-marketing-in-2026',
        destination: '/resources/blog/how-ai-is-reshaping-marketing-in-2026',
        permanent: true,
      },
      {
        source: '/resources/blog/the-ai-marketing-edge-how-ai-is-reshaping-marketing-in-2026',
        destination: '/resources/blog/how-ai-is-reshaping-marketing-in-2026',
        permanent: true,
      },
      {
        source: '/blog/beyond-bots-real-business-impact-ai-integration',
        destination: '/resources/blog/beyond-bots-real-business-impact-from-ai-integration',
        permanent: true,
      },
      {
        source: '/resources/blog/beyond-bots-real-business-impact-ai-integration',
        destination: '/resources/blog/beyond-bots-real-business-impact-from-ai-integration',
        permanent: true,
      },

      // ── Remaining Live Blogs (/blog/:slug -> /resources/blog/:slug) ────────────
      // Excluded empty/removed slugs (-mo8mk8hu, -mo8qym7y) fall through to 404.
      {
        source: '/blog/:slug((?!the-roi-of-ai-measuring-the-impact-of-automation-mo8mk8hu$|top-10-automation-tools-every-agency-needs-in-2025-mo8qym7y$|the-roi-of-ai-measuring-the-impact-of-automation$|top-10-automation-tools-every-agency-needs-in-2025$).+)',
        destination: '/resources/blog/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
