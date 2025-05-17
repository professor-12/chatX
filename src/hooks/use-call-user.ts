import { useEffect, useRef, useState } from "react";
import useSocket from "./useSocket";
import usePeer from "./use-peer";
import useLocalStream from "./use-localStream";
import { useChatContext } from "@/context/ChatContext";
import { checkAuth } from "@/lib/_server/auth";

const useCallUser = (localStream) => {
    const { socket } = useSocket();
    // const localStream = useLocalStream();
    const {
        selectedChat: { id },
    } = useChatContext();
    const { peer, peerId } = usePeer();
    const [remoteStreams, setRemoteStream] = useState([]);

    const call = (stream, peerId, onAnswer) => {
        const _call = peer?.call(peerId, stream);
        _call.on("stream", (stream) => {
            onAnswer(stream);
        });
    };
    useEffect(() => {
        peer?.on("call", (call) => {
            call.answer(localStream);
            call.on("stream", (stream) => {
                console.log(stream, "This is a remote stream");
            });
        });
        return () => {
            peer?.off("call", (call) => {
                call.answer();
                call.on("stream", (stream) => {
                    console.log(stream, "This is a remote stream");
                });
            });
        };
    }, [peer, localStream]);

    useEffect(() => {
        (async () => {
            const { data } = await checkAuth();
            if (socket && data && id && peerId) {
                console.log(id, data, peerId);
                socket?.emit("video:chat", id, data, peerId);
            }
        })();
    }, [id, peerId]);

    return { remoteStreams, localStream };
};

export default useCallUser;
