/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        port: "",
        pathname: "/vi/**",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/watch",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
