import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@{{orgName}}/ui'],
};

export default nextConfig;
