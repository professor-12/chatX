import { checkAuth } from "@/lib/_server/auth";
import prisma from "@/lib/prisma";

import { NextResponse } from "next/server";
export const POST = async (req: Request) => {
    const { subscription: _sub } = await req.json();
    const { data } = await checkAuth();

    const subscription = await prisma.subscription.findFirst({
        where: { value: JSON.stringify(_sub), userId: data as string },
    });

    if (subscription) {
        console.log("Already Subsctibed");
        return NextResponse.json({ message: "Already subscribed" });
    }

    await prisma.subscription.create({
        data: { value: JSON.stringify(_sub), userId: data as string },
    });

    return NextResponse.json({ message: "Subscription received" });
};
