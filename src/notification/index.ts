"use server";
import webPush from "web-push";

const mail = "test@test.com",
    publicKey =
        "BJtLQUsDQKtwOd68YpmvEbkLgktZttaLuV9PPKNzslKpcYMCRzLvbnm0KUHg3jf1avhjsX2kSgRyCy7LQz8Fma0",
    privateKey = "0lDZT8bFgvicFsfvDMaggaDDB8QdC98Yd0bWw-ZbjDQ";

webPush.setVapidDetails("mailto:" + mail, publicKey, privateKey);

export const sendNotification = async (
    subscription: webPush.PushSubscription,
    payload: string
) => {
    console.log("Sending notification with payload:", {
        payload,
        subscription,
    });
    try {
        await webPush.sendNotification(subscription, payload);
        console.log("Notification sent successfully");
    } catch (error) {
        console.error("Error sending notification:", error);
    }
};

// Public Key:
// BJtLQUsDQKtwOd68YpmvEbkLgktZttaLuV9PPKNzslKpcYMCRzLvbnm0KUHg3jf1avhjsX2kSgRyCy7LQz8Fma0

// Private Key:
// 0lDZT8bFgvicFsfvDMaggaDDB8QdC98Yd0bWw-ZbjDQ
