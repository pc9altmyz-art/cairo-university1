"use client";

import React, { useEffect, useState } from "react";

export default function IslamicScrollProgress() {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (totalHeight === 0) return;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
        };

        window.addEventListener("scroll", handleScroll);
        // Initial check
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 h-1.5 z-[100] pointer-events-none overflow-hidden bg-white/5 backdrop-blur-sm">
            {/* The Pattern Background (Hidden) */}
            <div 
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0l5 15h15l-12 9 5 15-13-10-13 10 5-15-12-9h15z' fill='%23D4A853' fill-opacity='0.4'/%3E%3C/svg%3E")`,
                    backgroundSize: '20px 20px'
                }}
            />
            
            {/* The Animated Progress Bar */}
            <div 
                className="h-full bg-gradient-to-r from-[#D4A853] via-[#F4D03F] to-[#D4A853] relative transition-all duration-150 ease-out shadow-[0_0_10px_rgba(212,168,83,0.5)]"
                style={{ width: `${scrollProgress}%` }}
            >
                {/* Glowing Tip */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full blur-md animate-pulse" />
                
                {/* Islamic Pattern Overlay on Progress */}
                <div 
                    className="absolute inset-0 opacity-30 mix-blend-overlay"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0l5 15h15l-12 9 5 15-13-10-13 10 5-15-12-9h15z' fill='white'/%3E%3C/svg%3E")`,
                        backgroundSize: '15px 15px'
                    }}
                />
            </div>
        </div>
    );
}
