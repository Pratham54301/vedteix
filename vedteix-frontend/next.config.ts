import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: false, // Fix TypeScript errors instead of ignoring them
  },
  eslint: {
    ignoreDuringBuilds: false, // Fix ESLint errors instead of ignoring them
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
  serverExternalPackages: ['sanity'],
  // Allow cross-origin requests from local network during development
  // This fixes the warning about requests from 172.20.10.3 (local network IP)
  allowedDevOrigins: process.env.NODE_ENV === 'development' 
    ? ['172.20.10.3', 'localhost', '127.0.0.1']
    : undefined,
};

export default nextConfig;
