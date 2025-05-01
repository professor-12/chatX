import { checkAuth } from "@/lib/_server/auth";
import prisma from "@/lib/prisma";

import { NextResponse } from "next/server";
export const POST = async (req: Request) => {
    const { subscription: _sub, userId } = await req.json();
    console.log(_sub, userId);
    if (!_sub || !userId) {
        return NextResponse.json({ message: "Invalid subscription" });
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
            return NextResponse.json({ message: "Already subscribed" });
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
