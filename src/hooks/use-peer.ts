"use client";
import Peer from "peerjs";
import { useEffect, useRef, useState } from "react";

var peer = new Peer();

const usePeer = () => {
    const [peerId, setPeerId] = useState("");
    console.log(peerId, "PeerId");

    // const handleCallUserPeer = (stream, peerId, onAnswer, onClose) => {
    //     if (!_peer) return;
    //     const call = _peer?.call(peerId, stream);
    //     call.on("stream", (stream) => {
    //         onAnswer(stream);
    //     });
    //     call.on("close", () => {
    //         onClose();
    //     });
    // };
    // const toggleMic = (localStream: MediaStream) => {
    //     localStream.getAudioTracks().forEach((e) => {
    //         e.enabled = !e.enabled;
    //     });
    // };
    // const toggleVid = (localStream: MediaStream) => {
    //     localStream.getVideoTracks().forEach((e) => {
    //         e.enabled = !e.enabled;
    //     });
    // };

    useEffect(() => {
        // setPeer(peer);
        peer.on("open", (id) => {
            console.log("PeerID: ",[id])
            setPeerId(id);
        });
        return () => {
            peer.off("open", (id) => {
                setPeerId(id);
            });
        };
    }, []);

    return { peerId, peer };
};

export default usePeer;
