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
            // Using `from` instead of `fromTo` means sections start visible (no hidden state)
            gsap.utils.toArray<HTMLElement>("section").forEach((section) => {
                gsap.from(
                    section,
                    {
                        opacity: 0,
                        y: 40,
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
                gsap.from(
                    card,
                    {
                        opacity: 0,
                        y: 30,
                        scale: 0.95,
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
                gsap.from(
                    el,
                    {
                        opacity: 0,
                        x: -20,
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

            // Refresh after a short delay so triggers are calculated correctly
            setTimeout(() => ScrollTrigger.refresh(), 300);
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return <div ref={containerRef} className="overflow-hidden">{children}</div>;
}
