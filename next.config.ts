import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/thoughts/the-lawyer-learning-to-code",
        destination: "/thoughts/on-being-a-beginner-again",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;