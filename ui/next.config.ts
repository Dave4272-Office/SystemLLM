import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { hostname: "financialmodelingprep.com", protocol: "https" },
      { hostname: "mui.com", protocol: "https" },
    ],
  },
};

export default nextConfig;
