import type { NextConfig } from "next";

const securityHeaderLines = [
  "Content-Security-Policy: default-src 'self'",
  "Strict-Transport-Security: max-age=63072000; includeSubDomains",
  "X-Frame-Options: DENY",
  "X-Content-Type-Options: nosniff",
];

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-icons",
      "recharts",
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaderLines.map((line) => {
          const splitAt = line.indexOf(": ");
          return { key: line.slice(0, splitAt), value: line.slice(splitAt + 2) };
        }),
      },
    ];
  },
};

export default nextConfig;
