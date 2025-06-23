/** @type {import('next').NextConfig} */
const nextConfig = {
  // 환경 변수 설정
  env: {
    NEXT_PUBLIC_SUPABASE_URL:
      process.env.NEXT_PUBLIC_SUPABASE_URL ||
      "https://ixlhwjayjlanckjuqnqb.supabase.co",
    NEXT_PUBLIC_SUPABASE_ANON_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4bGh3amF5amxhbmNranVxbnFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2NTY3MjQsImV4cCI6MjA2NjIzMjcyNH0.g9f9Qpo6W2AD7PL2EV1aCDtpNX7u3vE26_jYVlofRRw",
  },
  // Next.js 13에서는 App Router가 기본 활성화되므로 experimental.appDir 불필요
  images: {
    domains: ["images.unsplash.com", "via.placeholder.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
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

    // GSAP 최적화
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }

    return config;
  },
  // Fast Refresh 활성화
  reactStrictMode: true,
  // 성능 최적화
  swcMinify: true,
};

module.exports = nextConfig;
