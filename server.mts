import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = dev ? "localhost" : "0.0.0.0";
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port: port as number });
const handler = app.getRequestHandler();

const connectedUsers = new Map();
app.prepare().then(() => {
    const httpServer = createServer(handler) as any;
    const io = new Server(httpServer);

    io.on("connection", (socket) => {
        socket.on("joined", (id) => {
            if (connectedUsers.has(id)) return;
            console.log("A user joined");
            connectedUsers.set(id, socket.id);
        });
        socket.on("send-message", ({ senderId, receiverId, message }) => {
            const socketId = connectedUsers.get(receiverId);
            if (!socketId) return;
            io.to(socketId).emit("get-message", { senderId, message });
        });

        socket.on("disconnect", () => {
            for (let [userId, socketID] of connectedUsers.entries()) {
                if (socket.id == socketID) {
                    connectedUsers.delete(userId);
                    console.log(userId, "This user disconnected");
                    break;
                }
            }
        });
    });

    httpServer
        .once("error", (err: any) => {
            console.log(err);
            process.exit(1);
        })
        .listen(port, "0.0.0.0", () => {
            console.log(`> Ready on http://0.0.0.0:${port}`);
        });
});
