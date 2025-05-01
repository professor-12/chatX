"use client";
import { checkAuth } from "@/lib/_server/auth";
import { useEffect } from "react";

function urlBase64ToUint8Array(base64String: string) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, "+")
        .replace(/_/g, "/");
    const rawData = atob(base64);
    return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

const useServiceWorker = () => {
    useEffect(() => {
        const registerServiceWorker = async () => {
            if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
                console.error("Push notifications not supported.");
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

                const existingSub =
                    await registration.pushManager.getSubscription();
                const subscription =
                    existingSub ||
                    (await registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array(vapidKey),
                    }));

                const body = JSON.stringify({
                    subscription: subscription.toJSON(),
                });

                const response = await fetch("/api/notifications/subscribe", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body,
                });

                if (!response.ok)
                    throw new Error("Failed to save subscription on server.");
                console.log("Subscription successful:", subscription);
            } catch (error) {
                console.error("Push registration failed:", error);
            }
        };

        const requestPermissionAndRegister = () => {
            if (Notification.permission === "default") {
                Notification.requestPermission().then((perm) => {
                    if (perm === "granted") {
                        registerServiceWorker();
                    } else {
                        alert(
                            "Notification permission is required for push messages."
                        );
                    }
                });
            } else if (Notification.permission === "granted") {
                registerServiceWorker();
            }
        };

        requestPermissionAndRegister();
    }, []);
};

export default useServiceWorker;
