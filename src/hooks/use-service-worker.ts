"use client";
import { useEffect } from "react";

// function urlBase64ToUint8Array(base64String: string) {
//     const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
//     const base64 = (base64String + padding)
//         .replace(/-/g, "+")
//         .replace(/_/g, "/");
//     const rawData = atob(base64);
//     const outputArray = new Uint8Array(rawData.length);

//     for (let i = 0; i < rawData.length; ++i) {
//         outputArray[i] = rawData.charCodeAt(i);
//     }

//     return outputArray;
// }

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
                    "BJtLQUsDQKtwOd68YpmvEbkLgktZttaLuV9PPKNzslKpcYMCRzLvbnm0KUHg3jf1avhjsX2kSgRyCy7LQz8Fma0";

                const registration = await navigator.serviceWorker.register(
                    "/sw.js",
                    {
                        scope: "/",
                    }
                );

                const isSubscribed =
                    await registration.pushManager.getSubscription();

                if (isSubscribed) {
                    isSubscribed.unsubscribe();
                    console.log("Already subscribed:", isSubscribed);
                    // subscription = isSubscribed;
                }
                subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: vapidKey,
                });
                const response = await fetch("/api/notifications/subscribe", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ subscription }),
                });
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
