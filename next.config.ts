import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            { hostname: "encrypted-tbn0.gstatic.com", protocol: "https" },
            { hostname: "res.cloudinary.com", protocol: "https"  },
        ],
    },
};

export default nextConfig;
