import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // Autoriser les images locales et externes
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fonts.googleapis.com',
      },
    ],
    // Formats modernes
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
