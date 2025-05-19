import { useEffect, useRef, useState } from "react";

const useDarkMode = () => {
    const [isDark, setIsDark] = useState(false);

    function toggle() {
        document.body.classList.toggle("dark")
        localStorage.setItem("theme",!isDark ? "dark" : "light");
          setIsDark((prev)=> {
            return !prev
        })
    }
    useEffect(() => {
        const isDark = localStorage.getItem("theme") == "dark";
        console.log(isDark)
        const media = window.matchMedia("(prefers-color-scheme:dark)");
        console.log(media.matches);
        setIsDark(isDark || media.matches);
        document.body.classList.toggle("dark",isDark || media.matches)
    }, []);

    return { toggle, dark: isDark };
};

export default useDarkMode;
