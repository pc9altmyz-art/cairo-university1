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
            className={`fixed bottom-10 left-10 z-[100] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] transform ${
                isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-12 opacity-0 scale-50 pointer-events-none"
            }`}
        >
            <button
                onClick={scrollToTop}
                className="relative group flex items-center justify-center w-[64px] h-[64px] bg-[#0A0204]/90 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-[#D4A853]/40 transition-all duration-500"
                aria-label="Scroll to top"
            >
                {/* Multi-Ring Progress System */}
                <svg width={size} height={size} className="absolute -rotate-90 pointer-events-none drop-shadow-[0_0_8px_rgba(212,168,83,0.3)]">
                    {/* Background Ring */}
                    <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        fill="none"
                        stroke="rgba(255,255,255,0.03)"
                        strokeWidth={strokeWidth}
                    />
                    {/* Inner Accent Ring (Static) */}
                    <circle
                        cx={center}
                        cy={center}
                        r={radius - 4}
                        fill="none"
                        stroke="rgba(212,168,83,0.05)"
                        strokeWidth={1}
                    />
                    {/* Progress Ring with Gradient */}
                    <defs>
                        <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#D4A853" />
                            <stop offset="100%" stopColor="#8A6D3B" />
                        </linearGradient>
                    </defs>
                    <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        fill="none"
                        stroke="url(#gold-gradient)"
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        style={{ strokeDashoffset: offset }}
                        strokeLinecap="round"
                        className="transition-all duration-300 ease-out"
                    />
                </svg>

                {/* Arrow Icon with Floating Animation */}
                <div className="relative z-10 flex items-center justify-center">
                    <svg
                        className="w-5 h-5 text-white/90 group-hover:text-[#D4A853] group-hover:-translate-y-1.5 transition-all duration-500 ease-out drop-shadow-lg"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
                    </svg>
                    
                    {/* Subtle Pulse under the arrow */}
                    <div className="absolute inset-0 bg-[#D4A853]/0 group-hover:bg-[#D4A853]/10 blur-md rounded-full transition-all duration-500" />
                </div>

                {/* Outer Ambient Glow */}
                <div className="absolute -inset-2 bg-gradient-to-br from-[#D4A853]/0 to-[#1e3a8a]/0 group-hover:from-[#D4A853]/5 group-hover:to-[#1e3a8a]/5 blur-2xl rounded-full transition-all duration-700" />
            </button>
        </div>
    );
}
