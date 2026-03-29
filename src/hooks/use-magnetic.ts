"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export function useMagnetic() {
    const magneticRef = useRef<HTMLDivElement | HTMLButtonElement | HTMLAnchorElement | any>(null);

    useEffect(() => {
        // Disable on touch devices to prevent lag/hanging
        if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;

        const xTo = gsap.quickTo(magneticRef.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(magneticRef.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const mouseMove = (e: MouseEvent) => {
            if (!magneticRef.current) return;
            const { clientX, clientY } = e;
            const { height, width, left, top } = magneticRef.current.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            xTo(x * 0.35);
            yTo(y * 0.35);
        };

        const mouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        const element = magneticRef.current;
        if (element) {
            element.addEventListener("mousemove", mouseMove);
            element.addEventListener("mouseleave", mouseLeave);
        }

        return () => {
            if (element) {
                element.removeEventListener("mousemove", mouseMove);
                element.removeEventListener("mouseleave", mouseLeave);
            }
        };
    }, []);

    return magneticRef;
}
