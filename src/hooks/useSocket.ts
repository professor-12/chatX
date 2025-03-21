"use client";
import { useUserContext } from "@/context/user-context";
import { useEffect, useState } from "react";
import { Socket } from "socket.io";
import { io } from "socket.io-client";

const useSocket = () => {
    const { userId } = useUserContext();
    const [_socket, setSocket] = useState<Socket | undefined>(undefined);

    useEffect(() => {
        const socket = io();
        setSocket(socket as any);
        if (userId) {
            socket.emit("joined", userId);
        }
    }, [userId]);

    return { socket: _socket };
};

export default useSocket;
