import webPush from "web-push";

const mail = "test@test.com",
    publicKey =
        "BDVz71iYIlhp9nVk3D8f-hS_Wa-I_dpqPJFQdxOYc61j1BfZ_M8CG2qywv-hNOBGMgYojTLMNoJr-x7NCZPCM-M",
    privateKey = "dqbS2fO1ZMuNzEWH2RCaFJZZnbiFTW1zfRc1ANsbVkQ";

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

export default webPush;

// Public Key:
// BDVz71iYIlhp9nVk3D8f-hS_Wa-I_dpqPJFQdxOYc61j1BfZ_M8CG2qywv-hNOBGMgYojTLMNoJr-x7NCZPCM-M

// Private Key:
// dqbS2fO1ZMuNzEWH2RCaFJZZnbiFTW1zfRc1ANsbVkQ
