import prisma from "@/lib/prisma";
import webPush from "web-push";

webPush.setVapidDetails(
    "mailto:" + process.env.NEXT_PUBLIC_VAPID_EMAIL,
    process.env.NEXT_PUBLIC_VAPID_KEY,
    process.env.VAPID_PRIVATE_KEY
);

export const sendNotification = async ( {
        body,
        icon,
        title,
        receiverId,
    }) => {
    if (!body || !icon || !title || !receiverId) {
      console.log("All fiends are required")
        return {error:"Null"}
    }
    if (!process.env.NEXT_PUBLIC_VAPID_KEY || !process.env.VAPID_PRIVATE_KEY) {
        console.log("No vapid Key")
        return;
    }
    const subscriptions = await prisma.subscription.findMany({
        where: { userId: receiverId },
    });
    console.log("Subscriptions",subscriptions)
    if (!subscriptions) {
      console.log("No susbscriptions")
    return;
    }
    console.log("Sending Notification...")
    try {
        await Promise.allSettled(
            subscriptions.map(async (sub) => {
                const subscriptionData = JSON.parse(sub.value);
                console.log("Subscription data",subscriptionData)
                await webPush.sendNotification(
                    subscriptionData,
                    JSON.stringify({
                        title,
                        icon: "/i-ico.png",
                        body,
                    })
                );
            })
        );
    } catch (err) {
        console.log(err,"Error")
    }

    console.log("Success")
};
