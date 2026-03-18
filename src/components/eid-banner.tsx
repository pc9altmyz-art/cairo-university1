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
                    {/* Gift Box SVG */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#D4A853] hidden sm:block drop-shadow-[0_0_8px_rgba(212,168,83,0.4)] animate-bounce">
                        <path d="M20 12V22H4V12M22 7H2V12H22V7ZM12 22V7M12 7C12 7 12 3 10 3C8 3 8 7 12 7ZM12 7C12 7 12 3 14 3C16 3 16 7 12 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                    <span className="text-[11px] sm:text-sm font-black tracking-[0.2em] uppercase text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                        {/* Premium Gradient Text */}
                        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/70">
                            {t('banner_eid')}
                        </span>
                    </span>

                    {/* Balloon SVG */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#D4A853] drop-shadow-[0_0_8px_rgba(212,168,83,0.4)] animate-pulse">
                        <path d="M18 10C18 14.4183 15.3137 18 12 18C8.68629 18 6 14.4183 6 10C6 5.58172 8.68629 2 12 2C15.3137 2 18 5.58172 18 10Z" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M12 18V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>

                    <button
                        onClick={() => setVisible(false)}
                        aria-label="Close"
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white/30 hover:text-[#D4A853] hover:bg-white/5 transition-all duration-300"
                    >
                        <span className="text-xl font-light">×</span>
                    </button>
                </div>
            </div>

            {/* Festive Hanging Stars (Simplified Zina) */}
            <div className="absolute top-full left-0 right-0 flex justify-center gap-2 pointer-events-none z-10 -translate-y-[1px]">
                {Array.from({ length: 25 }).map((_, i) => (
                    <div key={i} className="animate-micro-sway" style={{ animationDelay: `${i * 0.2}s` }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="drop-shadow-lg text-[#D4A853]">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" fillOpacity={i % 2 === 0 ? "0.8" : "0.4"} />
                        </svg>
                    </div>
                ))}
            </div>

            <style jsx global>{`
                @keyframes ultraShimmer {
                    0%   { transform: translateX(-100%); }
                    50%  { transform: translateX(100%);  }
                    100% { transform: translateX(100%);  }
                }
                @keyframes micro-sway {
                    0%, 100% { transform: rotate(-10deg) translateY(0); }
                    50%     { transform: rotate(10deg) translateY(2px); }
                }
                .animate-micro-sway {
                    animation: micro-sway 3s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
