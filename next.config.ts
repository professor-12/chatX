import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            { hostname: "encrypted-tbn0.gstatic.com", protocol: "https" },
        ],
    },
    // output: "standalone",
    /* config options here */
};

export default nextConfig;
