"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function Loading() {
    const t = useTranslations('Header'); // Using Header translations for site title
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 90) return prev + 0.5;
                return prev + 2;
            });
        }, 30);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="fixed inset-0 z-[9999] bg-[#1A0B0E] flex flex-col items-center justify-center p-4">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#D4A853 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }} />
            
            {/* Logo/Title Reveal */}
            <div className="relative mb-12">
                <div className="text-4xl md:text-6xl font-black text-white tracking-tight text-center relative z-10 animate-pulse">
                    {t('title')}
                </div>
                <div className="absolute -inset-4 bg-[#7C2D36]/20 blur-2xl rounded-full"></div>
            </div>

            {/* Premium Loader */}
            <div className="w-64 h-1.5 bg-white/5 rounded-full overflow-hidden relative border border-white/10 shadow-inner">
                <div 
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#7C2D36] via-[#D4A853] to-[#7C2D36] transition-all duration-300 ease-out shadow-[0_0_15px_rgba(212,168,83,0.5)]"
                    style={{ width: `${progress}%` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer" />
                </div>
            </div>

            {/* Subtitle */}
            <div className="mt-8 text-white/40 text-sm font-bold uppercase tracking-[0.3em] animate-fade-in">
                {t('subtitle')}
            </div>

            {/* Floating particles */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#D4A853]/5 rounded-full blur-[80px] animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-[#7C2D36]/5 rounded-full blur-[80px] animate-pulse"></div>
        </div>
    );
}
