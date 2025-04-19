"use client";

import React, { useState } from "react";

const useToggle = (initialValue: boolean = false) => {
    const [isOpened, setIsOpened] = useState(initialValue);

    const onClick = () => {
        setIsOpened((prev) => !prev);
    };
    return [isOpened, onClick] as const;
};

export default useToggle;
