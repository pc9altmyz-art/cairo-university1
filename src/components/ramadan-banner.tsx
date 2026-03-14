"use client";

import { useState } from "react";

export default function RamadanBanner() {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    return (
        <div className="relative z-[60] overflow-visible">
            {/* The Actual Banner Bar */}
            <div className="relative z-20 overflow-hidden" style={{ background: 'linear-gradient(90deg, #1f0a0e 0%, #3D1118 50%, #1f0a0e 100%)' }}>
                {/* Gold shimmer sweep */}
                <div className="absolute inset-0 pointer-events-none" style={{
                    background: 'linear-gradient(90deg, transparent 20%, rgba(212,168,83,0.12) 50%, transparent 80%)',
                    animation: 'bannerShimmer 4s ease-in-out infinite',
                }} />

                <div className="flex items-center justify-center gap-2 sm:gap-4 py-2.5 px-8 text-center relative z-10">
                    <span className="text-base sm:text-lg select-none">🏮</span>
                    <span className="text-[10px] sm:text-xs font-black tracking-[0.2em] uppercase text-white drop-shadow-sm">
                        رمضان كريم — Ramadan Mubarak
                    </span>
                    <span className="text-base sm:text-lg select-none">🌙</span>

                    <button
                        onClick={() => setVisible(false)}
                        aria-label="Close banner"
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200 text-sm font-bold"
                    >
                        ×
                    </button>
                </div>
            </div>

            {/* Ramadan Bunting (Zina) - Hanging triangles */}
            <div className="absolute top-full left-0 right-0 flex justify-center gap-0 pointer-events-none z-10 -translate-y-[1px]">
                {Array.from({ length: 40 }).map((_, i) => (
                    <div
                        key={i}
                        className="w-0 h-0"
                        style={{
                            borderLeft: '8px solid transparent',
                            borderRight: '8px solid transparent',
                            borderTop: `14px solid ${i % 2 === 0 ? '#D4A853' : '#7C2D36'}`,
                            filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.2))'
                        }}
                    />
                ))}
            </div>

            <style>{`
                @keyframes bannerShimmer {
                    0%,100% { opacity: 0.4; }
                    50%     { opacity: 1;   }
                }
            `}</style>
        </div>
    );
}
