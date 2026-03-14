"use client";

import { useState } from "react";

export default function RamadanBanner() {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    return (
        <div className="relative z-50 overflow-hidden" style={{ background: 'linear-gradient(90deg, #1f0a0e 0%, #7C2D36 35%, #D4A853 50%, #7C2D36 65%, #1f0a0e 100%)' }}>
            {/* Shimmer animation */}
            <div className="absolute inset-0 animate-shimmer pointer-events-none"
                style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(212,168,83,0.15) 50%, transparent 100%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 3s ease-in-out infinite',
                }}
            />

            <div className="flex items-center justify-center gap-3 py-2 px-4 text-center relative z-10">
                <span className="text-[#D4A853] text-sm select-none">✦</span>
                <span className="text-[10px] sm:text-xs font-black tracking-[0.25em] uppercase text-[#D4A853]">
                    🌙 رمضان كريم — Ramadan Mubarak 🌙
                </span>
                <span className="text-[#D4A853] text-sm select-none">✦</span>

                <button
                    onClick={() => setVisible(false)}
                    aria-label="Close"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center text-[#D4A853]/60 hover:text-[#D4A853] hover:bg-white/10 transition-all duration-200 text-xs font-bold"
                >
                    ×
                </button>
            </div>

            <style>{`
                @keyframes shimmer {
                    0%   { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
            `}</style>
        </div>
    );
}
