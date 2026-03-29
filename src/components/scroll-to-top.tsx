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
    const size = 64; // Slightly larger for elegance
    const strokeWidth = 2.5;
    const center = size / 2;
    const radius = center - 8; // Inner space
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (scrollPercentage / 100) * circumference;

    return (
        <div 
            className={`fixed bottom-6 left-6 z-[100] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] transform ${
                isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-12 opacity-0 scale-50 pointer-events-none"
            }`}
        >
            <button
                onClick={scrollToTop}
                className="group flex items-center justify-center w-14 h-14 bg-slate-900 dark:bg-slate-800/90 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300"
                aria-label="Scroll to top"
            >
                {/* Progress Circle SVG */}
                <svg
                    className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
                    viewBox={`0 0 ${size} ${size}`}
                >
                    {/* Background Circle */}
                    <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={strokeWidth}
                        className="text-white/5"
                    />
                    {/* Progress Circle */}
                    <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        fill="none"
                        stroke="#D4A853"
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        className="transition-all duration-500 ease-out"
                    />
                </svg>

                <div className="relative flex items-center justify-center z-10">
                    <svg
                        className="w-5 h-5 text-[#D4A853] group-hover:-translate-y-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={3}
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                    </svg>
                </div>
            </button>
        </div>
    );
}
