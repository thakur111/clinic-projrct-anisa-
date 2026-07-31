import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/practo",
        destination: "https://www.practo.com/bangalore/clinic/dr-anisa-clinic-thubarahalli/overview",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
