import type {NextConfig} from 'next';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL(API_URL + '/images/**')],
  },
  output: 'standalone',
};

export default nextConfig;
