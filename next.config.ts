import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Force Next.js to transpile react-icons as ESM so tree-shaking works
  transpilePackages: ['react-icons'],

  images: {
    // Tell Next.js about the 220px thumbnail size used in marquee rows
    imageSizes: [16, 32, 48, 64, 96, 128, 220, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.icons8.com',
      },
    ],
  },
};

export default nextConfig;
