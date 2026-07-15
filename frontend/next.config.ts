import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow remote images from Cloudinary (Step 9) and Supabase Storage.
    // `domains` is deprecated in Next 16 — use remotePatterns.
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
};

export default nextConfig;
