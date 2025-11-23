import type {NextConfig} from 'next';

const API_URI = process.env.API_URI ?? 'http://localhost:3001';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL(API_URI + '/images/**')],
  },
  output: 'standalone',
};

export default nextConfig;
