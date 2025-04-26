"use client";
import { useEffect } from "react";

function urlBase64ToUint8Array(base64String: string) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, "+")
        .replace(/_/g, "/");
    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
}

const useServiceWorker = () => {
    useEffect(() => {
        let subscription: PushSubscription;
        const registerServiceWorker = async () => {
            if (!("serviceWorker" in navigator)) {
                console.error("Service Worker not supported in this browser.");
                return;
            }
            try {
                const vapidKey =
                    "BDVz71iYIlhp9nVk3D8f-hS_Wa-I_dpqPJFQdxOYc61j1BfZ_M8CG2qywv-hNOBGMgYojTLMNoJr-x7NCZPCM-M";

                const registration = await navigator.serviceWorker.register(
                    "/sw.js",
                    {
                        scope: "/",
                    }
                );

                const isSubscribed =
                    await registration.pushManager.getSubscription();

                if (isSubscribed) {
                    console.log("Already subscribed:", isSubscribed);
                    subscription = isSubscribed;
                } else {
                    subscription = await registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array(vapidKey),
                    });
                }
                const response = await fetch("/api/notifications/subscribe", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ subscription }),
                });
                console.log("Subscription sent to server:", response);
            } catch (error) {
                console.error("Service Worker registration failed:", error);
            }
        };

        if (Notification.permission === "default") {
            Notification.requestPermission().then((perm) => {
                if (Notification.permission === "granted") {
                    registerServiceWorker().catch((err) => console.log(err));
                } else {
                    alert("Please allow notifications.");
                }
            });
        } else if (Notification.permission == "granted") {
            registerServiceWorker();
        }
    }, []);

    return null;
};

export default useServiceWorker;
