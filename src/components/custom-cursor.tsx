"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        // Disable on admin pages where we want proper native cursors for form editing
        if (pathname?.startsWith("/admin")) return;

        // Only show on desktop devices
        if (window.innerWidth <= 768) return;

        const updatePosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
        };

        const updateHoverState = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if we're hovering over something clickable
            const isClickable =
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') !== null ||
                target.closest('button') !== null ||
                window.getComputedStyle(target).cursor === 'pointer';

            setIsHovering(isClickable);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener("mousemove", updatePosition);
        window.addEventListener("mouseover", updateHoverState);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            window.removeEventListener("mousemove", updatePosition);
            window.removeEventListener("mouseover", updateHoverState);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, [isVisible, pathname]);

    if (pathname?.startsWith("/admin")) return null;
    if (!isVisible) return null;

    return (
        <>
            {/* The main dot */}
            <div
                className={`fixed pointer-events-none z-[9999] rounded-full mix-blend-difference bg-white transition-transform duration-100 ease-out transform -translate-x-1/2 -translate-y-1/2 ${isHovering ? "w-12 h-12 opacity-50" : "w-4 h-4 opacity-100"
                    }`}
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                }}
            />
            {/* The outer ring */}
            <div
                className={`fixed pointer-events-none z-[9998] rounded-full mix-blend-difference border border-white transition-all duration-300 ease-out transform -translate-x-1/2 -translate-y-1/2 ${isHovering ? "w-16 h-16 opacity-0 scale-150" : "w-10 h-10 opacity-50 scale-100"
                    }`}
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                }}
            />
        </>
    );
}
