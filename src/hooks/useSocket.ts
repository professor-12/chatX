"use client";
import { useUserContext } from "@/context/user-context";
import { useEffect, useState } from "react";
import { Socket } from "socket.io";
import { io } from "socket.io-client";

let __socket = io();

const useSocket = () => {
    const { userId } = useUserContext();
    const [_socket, setSocket] = useState<Socket | undefined>(undefined);

    useEffect(() => {
        setSocket(__socket as any);
        if (userId) {
            __socket.emit("joined", userId);
        }
    }, [userId]);

    return { socket: _socket };
};

export default useSocket;
