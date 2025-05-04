import { NextResponse } from "next/server";
import webPush from "web-push";

webPush.setVapidDetails(
    "mailto:" + process.env.NEXT_PUBLIC_VAPID_EMAIL,
    process.env.NEXT_PUBLIC_VAPID_KEY,
    process.env.VAPID_PRIVATE_KEY
);

export const GET = async (req: Request) => {
    //     const { body, icon, subscription } = await req.json();
    //     await webPush.sendNotification(subscription, JSON.stringify(body));
    return NextResponse.json({
        message: "VAPID keys set successfully",
    });
};
