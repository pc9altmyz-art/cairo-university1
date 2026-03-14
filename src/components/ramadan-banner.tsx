"use client";

import { useState } from "react";

export default function RamadanBanner() {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    return (
        <div className="relative z-[70] transition-all duration-700">
            {/* Ultra-Premium Velvet Background */}
            <div className="relative z-20 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.4)]" 
                 style={{ 
                    background: 'linear-gradient(135deg, #1A080B 0%, #3D1118 45%, #5C1F27 55%, #1A080B 100%)',
                    borderBottom: '1px solid rgba(212,168,83,0.3)' 
                 }}>
                
                {/* Grain Effect Overlay */}
                <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" 
                     style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }} />

                {/* Intelligent Gold Sweep */}
                <div className="absolute inset-0 pointer-events-none" style={{
                    background: 'linear-gradient(90deg, transparent 30%, rgba(212,168,83,0.15) 50%, transparent 70%)',
                    animation: 'ultraShimmer 6s cubic-bezier(0.4, 0, 0.2, 1) infinite',
                }} />

                <div className="flex items-center justify-center gap-4 sm:gap-8 py-3 px-8 text-center relative z-10">
                    {/* Handcrafted Lantern SVG */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#D4A853] hidden sm:block drop-shadow-[0_0_8px_rgba(212,168,83,0.4)]">
                        <path d="M12 2V4M12 20V22M8 4H16M8 20H16M10 4V20M14 4V20M6 8V16C6 17.1 6.9 18 8 18H16C17.1 18 18 17.1 18 16V8C18 6.9 17.1 6 16 6H8C6.9 6 6 6.9 6 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        <rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.1"/>
                    </svg>

                    <span className="text-[11px] sm:text-sm font-black tracking-[0.3em] uppercase text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                        {/* Premium Gradient Text Effect */}
                        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/70">
                            رمضان كريم — Ramadan Mubarak
                        </span>
                    </span>

                    {/* Handcrafted Crescent SVG */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#D4A853] drop-shadow-[0_0_8px_rgba(212,168,83,0.4)]">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2"/>
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

            {/* Handcrafted "Cloth Look" Bunting (Zina) */}
            <div className="absolute top-full left-0 right-0 flex justify-center gap-1 pointer-events-none z-10 -translate-y-[1px]">
                {Array.from({ length: 30 }).map((_, i) => (
                    <div key={i} className="animate-micro-sway" style={{ animationDelay: `${i * 0.15}s` }}>
                        <svg width="18" height="22" viewBox="0 0 18 22" fill="none" className="drop-shadow-lg">
                            {/* The Triangle Flag */}
                            <path 
                                d="M0 0 L18 0 L9 22 Z" 
                                fill={i % 2 === 0 ? '#D4A853' : '#7C2D36'} 
                            />
                            {/* Cloth texture / highlight */}
                            <path d="M2 0 L9 18 L16 0" stroke="white" strokeOpacity="0.1" strokeWidth="0.5" />
                            {/* Gold tip sparkle */}
                            {i % 3 === 0 && <circle cx="9" cy="20" r="0.8" fill="white" className="animate-pulse" />}
                        </svg>
                    </div>
                ))}
            </div>

            <style>{`
                @keyframes ultraShimmer {
                    0%   { transform: translateX(-100%); }
                    50%  { transform: translateX(100%);  }
                    100% { transform: translateX(100%);  }
                }
                @keyframes micro-sway {
                    0%, 100% { transform: rotate(-2deg) translateY(0); }
                    50%     { transform: rotate(2deg) translateY(1px); }
                }
                .animate-micro-sway {
                    animation: micro-sway 4s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
