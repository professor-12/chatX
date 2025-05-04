import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const POST = async (req: NextRequest) => {
    const { subscription: value } = await req.json();
    if (!value) {
        return NextResponse.json(
            { error: "Subscription not found" },
            { status: 400 }
        );
    }
    try {
        const cookie = (await cookies()).get("token");
        if (!cookie) {
            return NextResponse.json(
                { error: "No token found" },
                { status: 401 }
            );
        }
        const token = jwt.decode(cookie.value);
        if (!token) {
            return NextResponse.json(
                { error: "Invalid token" },
                { status: 401 }
            );
        }
        const { userId } = await prisma.session.findUnique({
            where: { id: (token as { sessionId: string })?.sessionId },
        });
        console.log(userId);
        if (!userId) {
            return NextResponse.json(
                { error: "Session not found" },
                { status: 401 }
            );
        }

        const existing = await prisma.subscription.findUnique({
            where: { value: JSON.stringify(value) },
        });
        if (existing) {
            return NextResponse.json(
                { error: "Subscription already exists" },
                { status: 400 }
            );
        }
        await prisma.subscription.create({
            data: {
                value: JSON.stringify(value),
                userId,
            },
        });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: "No token found" }, { status: 401 });
    }
    return NextResponse.json({
        message: "Hello from notification",
    });
};
