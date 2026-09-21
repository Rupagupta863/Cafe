import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/**": [
      "./dev.db",
      "./prisma/dev.db",
      "./node_modules/.prisma/client/**/*",
      "./node_modules/@prisma/client/**/*",
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
