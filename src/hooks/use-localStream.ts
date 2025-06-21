import { useEffect, useState } from "react";

const useLocalStream = () => {
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);

    useEffect(() => {
        let stream: MediaStream;

        const getStream = async () => {
            stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true,
            });
            setLocalStream(stream);
        };

        getStream();

        return () => {
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    return localStream;
};

export default useLocalStream;
