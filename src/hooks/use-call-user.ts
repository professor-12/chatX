import { useEffect, useRef, useState } from "react";
import useSocket from "./useSocket";
import usePeer from "./use-peer";
import { useUserContext } from ".././context/user-context";
// import useLocalStream from "./use-localStream";
import { useChatContext } from "@/context/ChatContext";
import { checkAuth } from "@/lib/_server/auth";

const useCallUser = () => {
    const { socket } = useSocket();
    const { userId } = useUserContext();
    // const localStream = useLocalStream();
    const {
        selectedChat: { id: callerId },
    } = useChatContext();
    const { peer, peerId } = usePeer();
    const [remoteStreams, setRemoteStream] = useState([]);

    const call = (stream, peerId, onAnswer) => {
        const _call = peer?.call(peerId, stream);
        _call.on("stream", (stream) => {
            onAnswer(stream);
        });
    };

    // useEffect(() => {
    //     if (!peer || !localStream) return;
    //     peer?.on("call", (call) => {
    //         call.answer(localStream);
    //         call.on("stream", (stream) => {
    //             console.log(stream, "This is a remote stream");
    //         });
    //     });
    //     return () => {
    //         peer?.off("call", (call) => {
    //             call.answer();
    //             call.on("stream", (stream) => {
    //                 console.log(stream, "This is a remote stream");
    //             });
    //         });
    //     };
    // }, [peer, localStream]);

    useEffect(() => {
        (async () => {
            console.log("Calling user", callerId, peerId);
            if (socket && userId && callerId && peerId) {
                socket?.emit("video:chat", callerId, userId, peerId);
            }
        })();
    }, [callerId, peerId, socket,userId]);

    return { remoteStreams };
};

export default useCallUser;
