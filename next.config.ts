import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp", "image/avif"],
  },
  // Keep Turbopack rooted in this app (not Desktop) so scrapes outside src stay out of the graph
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
