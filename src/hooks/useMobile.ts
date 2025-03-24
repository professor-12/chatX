"use client";
import { useEffect, useState } from "react";

const useMobile = () => {
    const BREAK_POINt = 720;
    const [isMobile, setIsMobile] = useState(()=>window.matchMedia(`(max-width: ${BREAK_POINt}px)`).matches);
    useEffect(() => {
        const mediaQuery = window.matchMedia(`(max-width: ${BREAK_POINt}px)`);
        mediaQuery.addEventListener("change", (e) => setIsMobile(e.matches));
        return () =>
            mediaQuery.removeEventListener("change", (e) =>
                setIsMobile(e.matches)
            );
    }, []);
    return isMobile;
};

export default useMobile;
