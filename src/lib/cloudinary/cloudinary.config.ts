import { v2 as cloudinaryV2 } from "cloudinary";

let d = cloudinaryV2;
const config = {
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    secure: true,
};

const cloudinary_config = () => {
    d.config({
        cloud_name: config.cloud_name,
        api_key: config.api_key,
        api_secret: config.api_secret,
    });
};

export { d, cloudinary_config };
