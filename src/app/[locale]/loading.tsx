"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function Loading() {
    const t = useTranslations('Header');
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 90) return prev + 0.3;
                return prev + 1.5;
            });
        }, 30);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="fixed inset-0 z-[9999] bg-[#0F172A] flex flex-col items-center justify-center p-4 overflow-hidden">
            {/* Background Layers */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#172554] to-[#0F172A]" />
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#D4A853 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            {/* Emblem / Geometric Ornament */}
            <div className="relative mb-16 scale-90 md:scale-110">
                <div className="absolute inset-0 bg-[#D4A853]/20 blur-[100px] animate-pulse rounded-full" />
                
                {/* Rotating Geometric Rings */}
                <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
                    <div className="absolute inset-0 border-2 border-[#D4A853]/30 rounded-full border-t-[#D4A853] animate-spin [animation-duration:3s]" />
                    <div className="absolute inset-4 border border-[#D4A853]/20 rounded-full border-b-[#D4A853]/60 animate-spin [animation-duration:2s] [animation-direction:reverse]" />
                    <div className="absolute inset-8 border border-[#1e3a8a]/40 rounded-full border-l-[#1e3a8a] animate-spin [animation-duration:4s]" />
                    
                    {/* Center Icon/Initial */}
                    <div className="text-2xl md:text-3xl font-serif text-[#D4A853] font-black tracking-widest drop-shadow-[0_0_15px_rgba(212,168,83,0.5)] flex flex-col items-center justify-center mt-2">
                        <span className="text-white text-[10px] md:text-xs font-sans tracking-[0.3em] uppercase opacity-70 mb-1">Institution</span>
                        EISCE
                    </div>
                </div>
            </div>

            {/* Site Title */}
            <div className="relative z-10 text-center space-y-4">
                <h1 className="text-3xl md:text-5xl font-black text-white tracking-widest uppercase drop-shadow-2xl">
                    <span className="bg-gradient-to-r from-white via-white/80 to-white bg-clip-text text-transparent">
                        {t('title')}
                    </span>
                </h1>
                <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#D4A853]/40 to-transparent scale-x-50 animate-pulse" />
            </div>

            {/* Liquid Progress Bar */}
            <div className="mt-16 relative w-72 md:w-96">
                <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden blur-[0.5px]">
                    <div 
                        className="h-full bg-gradient-to-r from-transparent via-[#D4A853] to-transparent shadow-[0_0_20px_#D4A853] transition-all duration-700 ease-out"
                        style={{ width: `${progress}%`, left: '0%' }}
                    />
                </div>
                {/* Progress Glow Trailing */}
                <div 
                    className="absolute top-0 h-4 w-20 bg-[#D4A853]/20 blur-xl transition-all duration-700 ease-out pointer-events-none"
                    style={{ left: `${progress - 5}%` }}
                />
            </div>

            {/* Status Text */}
            <div className="mt-8 text-white/30 text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] animate-pulse">
                {t('subtitle')}
            </div>

            {/* Entrance/Exit Transitions are handled by Next.js naturally, but we can add inner fade */}
            <style jsx global>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </div>
    );
}
