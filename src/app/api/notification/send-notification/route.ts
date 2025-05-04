import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import webPush from "web-push";
import jwt from "jsonwebtoken";

webPush.setVapidDetails(
    "mailto:" + process.env.NEXT_PUBLIC_VAPID_EMAIL,
    process.env.NEXT_PUBLIC_VAPID_KEY,
    process.env.VAPID_PRIVATE_KEY
);

export const POST = async (req: Request) => {
    const {
        body,
        icon,
        data: { senderName },
    } = await req.json();
    if (!body) {
        return NextResponse.json({ error: "Body not found" }, { status: 400 });
    }
    if (!process.env.NEXT_PUBLIC_VAPID_KEY || !process.env.VAPID_PRIVATE_KEY) {
        return NextResponse.json(
            { error: "VAPID keys not found" },
            { status: 400 }
        );
    }
    const cookie = (await cookies()).get("token");
    if (!cookie) {
        return NextResponse.json({ error: "No token found" }, { status: 401 });
    }
    const token = jwt.decode(cookie.value);
    if (!token) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    const { userId } = await prisma.session.findUnique({
        where: { id: (token as { sessionId: string })?.sessionId },
    });
    if (!userId) {
        return NextResponse.json(
            { error: "Session not found" },
            { status: 401 }
        );
    }
    const subscriptions = await prisma.subscription.findMany({
        where: { userId: userId },
    });
    if (!subscriptions) {
        return NextResponse.json(
            { error: "No subscriptions found" },
            { status: 400 }
        );
    }

    await Promise.all(
        subscriptions.map(async (sub) => {
            const subscriptionData = JSON.parse(sub.value);
            await webPush.sendNotification(
                subscriptionData,
                JSON.stringify({
                    title: "New message from " + senderName,
                    icon: "/i-ico.png",
                })
            );
        })
    );
    return NextResponse.json({
        message: "Notification(s) sent successfully",
    });
};
