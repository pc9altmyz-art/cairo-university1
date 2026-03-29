import { MouseEvent, useCallback, useState } from "react";

export function use3DTilt(intensity = 15) {
    const [style, setStyle] = useState({
        transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        transition: "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)"
    });

    const handleMouseMove = useCallback((e: MouseEvent<HTMLElement>) => {
        // Disable on touch devices to prevent lag
        if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;
        
        if (!e.currentTarget) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        const rotateX = -yPct * intensity;
        const rotateY = xPct * intensity;

        setStyle({
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
            transition: 'transform 0.1s ease-out'
        });
    }, [intensity]);

    const handleMouseLeave = useCallback(() => {
        setStyle({
            transform: `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
            transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
        });
    }, []);

    return { style, handleMouseMove, handleMouseLeave };
}
