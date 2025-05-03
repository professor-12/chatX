import { checkAuth } from "@/lib/_server/auth";
import prisma from "@/lib/prisma";

import { NextResponse } from "next/server";
export const POST = async (req: Request) => {
    const { subscription: _sub } = await req.json();
    if (!_sub) {
        return NextResponse.json({ message: "No subscription" });
    }
    const { data } = await checkAuth();
    try {
        const subscription = await prisma.subscription.findFirst({
            where: {
                AND: { value: JSON.stringify(_sub), userId: data as string },
            },
        });

        if (subscription) {
            console.log("Already Subsctibed");
            return NextResponse.json({ message: "Already subscribed" });
        }

        await prisma.subscription.create({
            data: { value: JSON.stringify(_sub), userId: data as string },
        });
    } catch (error) {
        console.log("Error in subscription", error);
        return NextResponse.json({ message: "Error in subscription" });
    }
    console.log("Subscription created");
    return NextResponse.json({ message: "Subscription received" });
};
