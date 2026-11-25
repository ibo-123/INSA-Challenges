import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Local + arbitrary remote URLs from portfolio settings
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
