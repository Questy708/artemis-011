import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: [
    "preview-chat-67687abf-a3d5-46c5-826d-836f0552d985.space-z.ai",
    ".space-z.ai",
    ".space.chatglm.site",
  ],
};

export default nextConfig;
