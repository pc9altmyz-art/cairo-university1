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
                className="group flex items-center justify-center w-14 h-14 bg-[#0F172A]/90 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300"
                aria-label="Scroll to top"
            >
                <div className="relative flex items-center justify-center">
                    <svg
                        className="w-6 h-6 text-[#D4A853] group-hover:-translate-y-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
                    </svg>
                    {/* Subtle inner glow */}
                    <div className="absolute inset-0 bg-[#D4A853]/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
            </button>
        </div>
    );
}
