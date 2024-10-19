/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/**", // This allows all paths under the hostname
      },
    ],
  },
};

export default nextConfig;
