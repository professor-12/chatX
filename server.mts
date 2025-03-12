import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const connectedUsers = new Map();
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(handler) as any;
    const io = new Server(httpServer);

    io.on("connection", (socket) => {
        socket.on("joined", (id) => {
            if (connectedUsers.has(id)) return;
            connectedUsers.set(id, socket.id);
        });
        socket.on("send-message", (id, message) => {
            const socketId = connectedUsers.get(id);
            if (!socketId) return;
            socket.to(socketId).emit("receieve-message", message);
        });
    });

    httpServer
        .once("error", (err: any) => {
            console.error(err);
            process.exit(1);
        })
        .listen(port, () => {
            console.log(`> Ready on http://${hostname}:${port}`);
        });
});
