import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
    ];
  },
};

export default nextConfig;
