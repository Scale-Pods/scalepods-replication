import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  productionBrowserSourceMaps: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 85, 90, 92],
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
    ];
  },
};

export default nextConfig;
