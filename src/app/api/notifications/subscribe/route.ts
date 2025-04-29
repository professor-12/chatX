import { checkAuth } from "@/lib/_server/auth";
import prisma from "@/lib/prisma";

import { NextResponse } from "next/server";
export const POST = async (req: Request) => {
    const { subscription: _sub } = await req.json();
    const { data } = await checkAuth();
    try {
        const subscription = await prisma.subscription.findFirst({
            where: {
                AND: {
                    userId: data,
                    value: JSON.stringify(_sub),
                },
            },
        });

        console.log("Subscription", subscription);

        if (subscription) {
            console.log("Already Subsctibed");
            return NextResponse.json({ message: "Already subscribed" });
        }

        console.log("Please...");

        await prisma.subscription.create({
            data: {
                value: JSON.stringify(_sub),
                userId: data,
            },
        });
        return NextResponse.json({ message: "Subscribed" });
    } catch (error) {
        console.log("Error in subscription", error);
        return NextResponse.json({ message: "Error in subscription" });
    }
};
