
"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/routing";

export default function ScrollUtils() {
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            // Show/Hide scroll to top button
            setShowScrollTop(window.scrollY > 400);

            // Calculate scroll progress percentage
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            setScrollProgress(scrolled);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <>
            {/* Scroll Progress Bar */}
            <div className="fixed top-0 left-0 right-0 h-1 z-[110] pointer-events-none bg-white/5 backdrop-blur-sm">
                <div
                    className="h-full bg-gradient-to-r from-[#1e3a8a] via-[#D4A853] to-[#1e3a8a] transition-all duration-150 ease-out"
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>

            {/* Scroll to Top Button */}
            <button
                onClick={scrollToTop}
                className={`fixed bottom-8 right-8 z-[90] w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-[#D4A853] flex items-center justify-center shadow-2xl transition-all duration-500 hover:bg-[#D4A853] hover:text-[#172554] hover:-translate-y-2 group cursor-pointer ${showScrollTop ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
                aria-label="Scroll to Top"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7 transform group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
                </svg>
                {/* Subtle pulse ring */}
                <span className="absolute inset-0 rounded-2xl border-2 border-[#D4A853]/20 animate-ping opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
        </>
    );
}
