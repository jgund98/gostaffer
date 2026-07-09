import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compiler: {
    // strip console.* in production (keep errors/warnings)
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // serve optimized derivatives from cache for a year (repeat-visit speed)
    minimumCacheTTL: 31536000,
  },
  // tree-shake the big icon/animation libs so only what's used ships
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
