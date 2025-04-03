"use client";
import { useEffect, useState } from "react";

const useMobile = () => {
    const BREAK_POINt = 720;
    const [isMobile, setIsMobile] = useState(null);
    useEffect(() => {
        const mediaQuery = window.matchMedia(`(max-width: ${BREAK_POINt}px)`);
        setIsMobile(window.matchMedia(`(max-width: ${BREAK_POINt}px)`).matches);
        mediaQuery.addEventListener("change", (e) => setIsMobile(e.matches));
        return () =>
            mediaQuery.removeEventListener("change", (e) =>
                setIsMobile(e.matches)
            );
    }, []);
    return isMobile;
};

export default useMobile;
