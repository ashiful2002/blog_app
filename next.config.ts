import "./src/env";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["media.istockphoto.com"],
  },
};

export default nextConfig;
