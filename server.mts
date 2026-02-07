import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = dev ? "localhost" : "0.0.0.0";
const port = process.env.PORT || 8000;

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

        socket.on("video:chat", (callerId, userId, peerId) => {
            console.log("This is running", callerId, userId);
            const socketId = connectedUsers.get(callerId);
            // console.log(id, data, peerId);
            socket.to(socketId).emit("call:user", userId, peerId);
            console.log("this is coming from video:chat event");
        });
        // socket.on("call:user", (id, peerId) => {
        //     console.log(id, peerId);
        // });
    });

    httpServer
        .once("error", (err: any) => {
            console.log(err);
            process.exit(1);
        })
        .listen(port, hostname, () => {
            console.log(`> Ready on http://${hostname}:${port}`);
        });
});
