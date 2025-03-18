import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            { hostname: "encrypted-tbn0.gstatic.com", protocol: "https" },
        ],
    },
    /* config options here */
};

export default nextConfig;
