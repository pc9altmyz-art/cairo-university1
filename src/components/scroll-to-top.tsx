"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollPercentage, setScrollPercentage] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const currentScroll = window.scrollY;
            const percentage = (currentScroll / scrollHeight) * 100;
            setScrollPercentage(percentage);
            setIsVisible(currentScroll > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // SVG parameters
    const size = 56;
    const strokeWidth = 3;
    const center = size / 2;
    const radius = center - strokeWidth;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (scrollPercentage / 100) * circumference;

    return (
        <div 
            className={`fixed bottom-8 left-8 z-[100] transition-all duration-500 transform ${
                isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-75 pointer-events-none"
            }`}
        >
            <button
                onClick={scrollToTop}
                className="relative group flex items-center justify-center w-[56px] h-[56px] bg-[#1A0B0E]/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl hover:border-[#D4A853]/50 transition-all duration-300"
                aria-label="Scroll to top"
            >
                {/* Progress Ring */}
                <svg width={size} height={size} className="absolute -rotate-90 pointer-events-none">
                    <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        fill="none"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth={strokeWidth}
                    />
                    <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        fill="none"
                        stroke="#D4A853"
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        style={{ strokeDashoffset: offset }}
                        strokeLinecap="round"
                        className="transition-all duration-150 ease-out shadow-[0_0_10px_rgba(212,168,83,0.5)]"
                    />
                </svg>

                {/* Arrow Icon */}
                <svg
                    className="w-5 h-5 text-white group-hover:text-[#D4A853] group-hover:-translate-y-1 transition-all duration-300 drop-shadow-lg"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
                </svg>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-full bg-[#D4A853]/0 group-hover:bg-[#D4A853]/5 blur-xl transition-all duration-500" />
            </button>
        </div>
    );
}
