import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

import { NextResponse } from "next/server";
export const POST = async (req: Request) => {
    const token = (await cookies()).get("token");
    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { verifyToken } = await import("@/lib/_server/utils");
    const { sessionId } = (await verifyToken(token.value)) as {
        sessionId: string;
    };
    if (!sessionId) {
        console.log("No sessionId");
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { userId } = await prisma.session.findFirst({
        where: {
            id: sessionId,
        },
    });
    if (!userId) {
        console.log("No userId");
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { subscription: _sub } = await req.json();

    if (!_sub || !userId) {
        return NextResponse.json(
            { message: "Invalid subscription" },
            { status: 400 }
        );
    }
    try {
        const subscription = await prisma.subscription.findFirst({
            where: {
                AND: {
                    userId,
                    value: JSON.stringify(_sub),
                },
            },
        });

        if (subscription) {
            return NextResponse.json(
                { message: "Already subscribed" },
                { status: 400 }
            );
        }

        console.log("Please...");

        await prisma.subscription.create({
            data: {
                value: JSON.stringify(_sub),
                userId,
            },
        });
        return NextResponse.json({ message: "Subscribed" });
    } catch (error) {
        console.log("Error in subscription", error);
        return NextResponse.json({ message: "Error in subscription" });
    }
};
