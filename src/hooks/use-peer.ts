"use client";
import Peer from "peerjs";
import { useEffect, useRef, useState } from "react";

const peer = new Peer();

const usePeer = () => {
    const [_peer, setPeer] = useState<undefined | Peer>(undefined);
    const [peerId, setPeerId] = useState("");

    const handleCallUserPeer = (stream, peerId, onAnswer, onClose) => {
        if (!_peer) return;
        const call = _peer?.call(peerId, stream);
        call.on("stream", (stream) => {
            onAnswer(stream);
        });
        call.on("close", () => {
            onClose();
        });
    };
    const toggleMic = (localStream: MediaStream) => {
        localStream.getAudioTracks().forEach((e) => {
            e.enabled = !e.enabled;
        });
    };
    const toggleVid = (localStream: MediaStream) => {
        localStream.getVideoTracks().forEach((e) => {
            e.enabled = !e.enabled;
        });
    };

    useEffect(() => {
        setPeer(peer);
        peer.on("open", (id) => {
            setPeerId(id);
        });
        return () => {
            peer.off("open", (id) => {
                setPeerId(id);
            });
        };
    }, []);

    return { peerId, peer: _peer };
};

export default usePeer;
