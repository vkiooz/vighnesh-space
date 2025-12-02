/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Add support for HEIC, DNG, and MOV files
  async rewrites() {
    return [
      {
        source: '/blog/:path*.(heic|dng|mov)',
        destination: '/api/files/:path*',
      },
    ]
  },
  // Configure headers for these file types
  async headers() {
    return [
      {
        source: '/blog/:path*.(heic|dng)',
        headers: [
          {
            key: 'Content-Type',
            value: 'image/jpeg',
          },
        ],
      },
      {
        source: '/blog/:path*.mov',
        headers: [
          {
            key: 'Content-Type',
            value: 'video/quicktime',
          },
        ],
      },
    ]
  },
}

export default nextConfig
