/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
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

  // reactStrictMode: false,
};

module.exports = nextConfig;
