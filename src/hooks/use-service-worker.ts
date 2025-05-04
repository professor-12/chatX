"use client";
import { useEffect } from "react";

const useServiceWorker = () => {
    useEffect(() => {
        try {
            (async () => {
                if (Notification.permission === "default") {
                    const permission = await Notification.requestPermission();
                    if (permission !== "granted") {
                        console.log("Permission not granted");
                        return;
                    }
                } else if (Notification.permission === "denied") {
                    console.log("Permission denied");
                    return;
                }
                let subscription: PushSubscription;

                if ("serviceWorker" in navigator) {
                    const handleServiceWorker = async () => {
                        const register = await navigator.serviceWorker.register(
                            "/sw.js"
                        );
                        const existi =
                            await register.pushManager.getSubscription();
                        if (existi) {
                            subscription = existi;
                        } else {
                            subscription = await register.pushManager.subscribe(
                                {
                                    userVisibleOnly: true,
                                    applicationServerKey:
                                        process.env.NEXT_PUBLIC_VAPID_KEY,
                                }
                            );
                        }
                        const res = await fetch("/api/notification/subscribe", {
                            method: "POST",
                            body: JSON.stringify({ subscription }),
                            headers: {
                                "content-type": "application/json",
                            },
                        });

                        const data = await res.json();
                        console.log(data);
                    };
                    handleServiceWorker();
                }
            })();
        } catch (err) {
            console.log(err);
        }
    }, []);
};

export default useServiceWorker;
