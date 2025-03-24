"use client";
import { useEffect, useState } from "react";

const BREAK_POINt = 768;

const useMobile = () => {
    const [isMobile, setIsMobile] = useState(undefined);
    useEffect(() => {
        const mediaQuery = window.matchMedia(`(max-media: ${768}px )`);
        mediaQuery.addEventListener("change", (e) => setIsMobile(e.matches));

        return () =>
            mediaQuery.removeEventListener("change", (e) =>
                setIsMobile(e.matches)
            );
    }, []);
    return !!isMobile;
};

export default useMobile;
