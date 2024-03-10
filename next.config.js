/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },

  async rewrites() {
    const host = process.env.NEXT_PUBLIC_COIN_API || 'http://localhost:6969';

    return [
      {
        source: '/api/:path*',
        destination: `${host}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
