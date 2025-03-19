"use client";

import { useEffect, useState } from "react";

const useMobile = () => {
    const [isMobile, setIsMobile] = useState(undefined);
    useEffect(() => {
        console.log(window.matchMedia(""));
        // window.matchMedia("()");
    }, []);
    return !!isMobile;
};

export default useMobile;
