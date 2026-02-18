"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealProps {
    children: ReactNode;
    direction?: "up" | "down" | "left" | "right";
    delay?: number;
    duration?: number;
    distance?: number;
}

export default function ScrollReveal({
    children,
    direction = "up",
    delay = 0,
    duration = 1.2,
    distance = 50,
}: ScrollRevealProps) {
    const revealRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = revealRef.current;
        if (!element) return;

        let x = 0;
        let y = 0;

        if (direction === "up") y = distance;
        if (direction === "down") y = -distance;
        if (direction === "left") x = distance;
        if (direction === "right") x = -distance;

        gsap.fromTo(
            element,
            {
                opacity: 0,
                x: x,
                y: y,
            },
            {
                opacity: 1,
                x: 0,
                y: 0,
                duration: duration,
                delay: delay,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
            }
        );

        return () => {
            if (ScrollTrigger.getById(element.id)) {
                ScrollTrigger.getById(element.id)?.kill();
            }
        };
    }, [direction, delay, duration, distance]);

    return (
        <div ref={revealRef} className="will-change-transform opacity-0">
            {children}
        </div>
    );
}
