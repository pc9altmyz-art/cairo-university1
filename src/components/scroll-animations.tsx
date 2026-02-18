"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register only once
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollAnimations({
    children,
}: {
    children: React.ReactNode;
}) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate sections with a smooth upward reveal
            gsap.utils.toArray<HTMLElement>("section").forEach((section) => {
                gsap.fromTo(
                    section,
                    {
                        opacity: 0,
                        y: 40,
                        clipPath: "inset(10% 0 0 0)"
                    },
                    {
                        opacity: 1,
                        y: 0,
                        clipPath: "inset(0% 0 0 0)",
                        duration: 1.2,
                        ease: "expo.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 85%",
                            once: true,
                        },
                    }
                );
            });

            // Animate premium cards with stagger
            gsap.utils.toArray<HTMLElement>(".premium-card, .soft-card").forEach((card, i) => {
                gsap.fromTo(
                    card,
                    {
                        opacity: 0,
                        y: 30,
                        scale: 0.95
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 1,
                        delay: (i % 3) * 0.15,
                        ease: "power4.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 92%",
                            once: true,
                        },
                    }
                );
            });

            // Animate text elements (titles)
            gsap.utils.toArray<HTMLElement>("h2, .text-gradient-gold").forEach((el) => {
                gsap.fromTo(
                    el,
                    { opacity: 0, x: -20 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 90%",
                            once: true,
                        },
                    }
                );
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return <div ref={containerRef} className="overflow-hidden">{children}</div>;
}
