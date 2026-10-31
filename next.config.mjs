/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Free stock photos load from these hosts until `npm run fetch-stock` saves them locally
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  // Old separate pages now live as sections on the single home page
  async redirects() {
    return [
      { source: "/services", destination: "/#services", permanent: true },
      { source: "/gallery", destination: "/#gallery", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
      { source: "/about", destination: "/#about", permanent: true },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
