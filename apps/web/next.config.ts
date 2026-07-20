import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  transpilePackages: ["@workspace/ui"],

  async redirects() {
    return [
      {
        source: "/",
        destination: "/conversations",
        permanent: false,
      },
    ];
  },
}

export default nextConfig
