import type { NextConfig } from "next"
import path from "path"

const nextConfig: NextConfig = {
  images: {
    // Serve original files at full quality (no resize / AVIF / WebP conversion)
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "catalinvintila.design",
      },
    ],
  },
  turbopack: {
    root: path.join(__dirname),
  },
}

export default nextConfig
