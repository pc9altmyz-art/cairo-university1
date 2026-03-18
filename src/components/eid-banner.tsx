"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function EidBanner() {
    const [visible, setVisible] = useState(true);
    const t = useTranslations('Header');

    if (!visible) return null;

    return (
        <div className="relative z-[70] transition-all duration-700">
            {/* Festive Velvet Background */}
            <div className="relative z-20 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                style={{
                    background: 'linear-gradient(135deg, #1A080B 0%, #3D1118 45%, #5C1F27 55%, #1A080B 100%)',
                    borderBottom: '1px solid rgba(212,168,83,0.3)'
                }}>

                {/* Sparkling Grain Effect */}
                <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none"
                    style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }} />

                {/* Animated Gold/Colorful Sweep */}
                <div className="absolute inset-0 pointer-events-none" style={{
                    background: 'linear-gradient(90deg, transparent 30%, rgba(212,168,83,0.2) 50%, transparent 70%)',
                    animation: 'ultraShimmer 6s cubic-bezier(0.4, 0, 0.2, 1) infinite',
                }} />

                <div className="flex items-center justify-center gap-4 sm:gap-8 py-3 px-8 text-center relative z-10">
                    {/* Premium Ornamental Star SVG */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#D4A853] hidden sm:block drop-shadow-[0_0_12px_rgba(212,168,83,0.6)] animate-pulse">
                        <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="currentColor" />
                        <circle cx="12" cy="10" r="1.5" fill="white" />
                    </svg>

                    <span className="text-[11px] sm:text-sm font-black tracking-[0.4em] uppercase text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                        {/* Ultra-Premium Gold/Silver Gradient Text */}
                        <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#FFFDF0] via-[#D4A853] to-[#8A6E32]">
                            {t('banner_eid')}
                        </span>
                    </span>

                    {/* Premium Silk Ribbon / Ornament SVG */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#D4A853] drop-shadow-[0_0_12px_rgba(212,168,83,0.6)]">
                         <path d="M12 22C12 22 17 18 17 13C17 10.2386 14.7614 8 12 8C9.23858 8 7 10.2386 7 13C7 18 12 22 12 22Z" stroke="currentColor" strokeWidth="1.5" />
                         <path d="M12 8V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                         <path d="M9 12L12 15L15 12" stroke="white" strokeOpacity="0.5" strokeWidth="1" />
                    </svg>

                    <button
                        onClick={() => setVisible(false)}
                        aria-label="Close"
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white/30 hover:text-[#FFD700] hover:bg-white/5 transition-all duration-300"
                    >
                        <span className="text-xl font-extralight">×</span>
                    </button>
                </div>
            </div>

            {/* Premium Gold Star Bunting */}
            <div className="absolute top-full left-0 right-0 flex justify-center gap-3 pointer-events-none z-10 -translate-y-[1px]">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="animate-premium-sway" style={{ animationDelay: `${i * 0.3}s` }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_5px_rgba(212,168,83,0.5)] text-[#D4A853]">
                            <path d="M12 2L15 9L22 9L16 14L18 21L12 17L6 21L8 14L2 9L9 9L12 2Z" fill="currentColor" fillOpacity={i % 3 === 0 ? "1" : "0.5"} />
                        </svg>
                    </div>
                ))}
            </div>

            <style jsx global>{`
                @keyframes ultraShimmer {
                    0%   { transform: translateX(-100%) skewX(-15deg); }
                    100% { transform: translateX(200%) skewX(-15deg); }
                }
                @keyframes premium-sway {
                    0%, 100% { transform: translateY(0) rotate(-5deg); scale: 1; }
                    50%     { transform: translateY(3px) rotate(5deg); scale: 1.1; }
                }
                .animate-premium-sway {
                    animation: premium-sway 4s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
