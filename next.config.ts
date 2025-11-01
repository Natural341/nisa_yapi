import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Production optimizasyonları
  output: 'standalone', // VDS için optimal
  compress: true,
  poweredByHeader: false,

  // www'dan ana domaine yönlendirme
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.nisayapimarket.com' }],
        destination: 'https://nisayapimarket.com/:path*',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
