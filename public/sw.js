
self.addEventListener("push", function (event) {
    const data = event.data?.json() || {};
    const { title, body, icon } = data;

    const options = {
        body: body || "You have a new notification.",
        icon: icon || "/i-ico.png",
    };

    self.registration.showNotification(title || "Notification", options);
});

self.addEventListener("notificationclick", function (event) {
    event.notification.close();
    // You can customize this to open a specific URL
    event.waitUntil(clients.openWindow("/"));
});
