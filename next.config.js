/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 13에서는 App Router가 기본 활성화되므로 experimental.appDir 불필요
  images: {
    domains: ["images.unsplash.com", "via.placeholder.com"],
  },
  // 개발 환경 최적화
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Hot Reload 최적화
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }

    // Supabase WebSocket 모듈 호환성 수정
    config.resolve.fallback = {
      ...config.resolve.fallback,
      bufferutil: false,
      "utf-8-validate": false,
      fs: false,
      net: false,
      tls: false,
    };

    return config;
  },
  // Fast Refresh 활성화
  reactStrictMode: true,
  // 성능 최적화
  swcMinify: true,
};

module.exports = nextConfig;
