import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  images: {
    // Pre-approved for real photography sourced from Wikimedia Commons
    // (freely licensed, hotlink-safe). See data/destinations.ts for the
    // `photo` field where a Commons file URL can be dropped in per
    // destination — the illustrated art is used as the fallback whenever
    // `photo` is omitted.
    remotePatterns: [
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "commons.wikimedia.org" },
    ],
  },
};

export default nextConfig;
