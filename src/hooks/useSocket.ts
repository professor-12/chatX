"use client";
import { useChatContext } from "@/context/ChatContext";
import React, { useEffect, useState } from "react";
import { Socket } from "socket.io";
import { io } from "socket.io-client";

const useSocket = () => {
    const { userId } = useChatContext();
    const [_socket, setSocket] = useState<Socket | undefined>(undefined);

    useEffect(() => {
        const socket = io();
        setSocket(socket as any);
    }, []);

    useEffect(() => {
        if (!userId && !_socket) return;

        _socket?.emit("joined", userId);
    }, [userId]);

    return { socket: _socket };
};

export default useSocket;
