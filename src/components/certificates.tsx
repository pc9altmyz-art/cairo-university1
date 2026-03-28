"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Certificates() {
    const t = useTranslations('Certificates');
    const totalCertificates = 24;
    
    // Split certificates into two rows for the double marquee effect
    const row1 = Array.from({ length: 12 }).map((_, i) => i + 1);
    const row2 = Array.from({ length: 12 }).map((_, i) => i + 13);

    // Duplicate arrays to create the infinite scroll effect seamlessly
    const marqueeRow1 = [...row1, ...row1, ...row1];
    const marqueeRow2 = [...row2, ...row2, ...row2];

    const [isHovered, setIsHovered] = useState(false);

    return (
        <section id="certificates" className="py-24 sm:py-32 bg-mesh-gradient relative overflow-hidden scroll-mt-28">
            {/* Premium Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="relative w-full h-full overflow-hidden opacity-40">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#D4A853]/10 rounded-full blur-[120px] animate-blob"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#1e3a8a]/20 rounded-full blur-[120px] animate-blob [animation-delay:2s]"></div>
                    <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>
                </div>
            </div>

            <div className="container mx-auto px-4 relative z-10 mb-12 md:mb-16">
                <div className="flex flex-col lg:flex-row items-end justify-between gap-8 md:gap-12">
                    {/* Header Content */}
                    <div className="max-w-3xl text-white rtl:text-right ltr:text-left">
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-xl shadow-2xl">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#D4A853] animate-pulse shadow-[0_0_10px_rgba(212,168,83,0.8)]"></span>
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#D4A853]">{t('badge')}</span>
                        </div>

                        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[0.95] tracking-tight">
                            {t('title1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A853] via-[#FFD700] to-[#D4A853] drop-shadow-[0_0_30px_rgba(212,168,83,0.4)]">{t('title_hl')}</span> <br />
                            <span className="opacity-90">{t('title2')}</span>
                        </h2>

                        <p className="text-white/70 text-lg md:text-2xl leading-relaxed max-w-xl font-medium">
                            {t('subtitle')}
                        </p>
                    </div>

                    {/* Features Badges */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 shrink-0 rtl:text-right ltr:text-left w-full lg:w-auto">
                        {[t('feat1'), t('feat2'), t('feat3'), t('feat4')].map((item, i) => (
                            <div key={i} className="premium-glass rounded-[2rem] px-6 py-5 flex items-center gap-4 group hover:bg-[#D4A853]/10 transition-all duration-500 hover:-translate-y-1">
                                <div className="w-12 h-12 rounded-xl bg-[#D4A853]/20 flex items-center justify-center text-[#D4A853] group-hover:bg-[#D4A853] group-hover:text-white transition-all shadow-lg group-hover:shadow-[#D4A853]/40">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <span className="font-bold text-base md:text-lg text-white group-hover:text-[#FFD700] transition-colors">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Infinite Marquee Section */}
            <div 
                className="relative w-full flex flex-col gap-8 md:gap-12 pb-10"
                dir="ltr"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Glow behind tracks */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[150%] bg-[#D4A853]/5 blur-[120px] pointer-events-none" />

                {/* Edges Fade */}
                <div className="absolute top-0 bottom-0 left-0 w-20 md:w-64 bg-gradient-to-r from-[#0F172A] to-transparent z-20 pointer-events-none" />
                <div className="absolute top-0 bottom-0 right-0 w-20 md:w-64 bg-gradient-to-l from-[#0F172A] to-transparent z-20 pointer-events-none" />

                {/* Track 1 (Moves Left) */}
                <div className="flex w-fit animate-marquee-left" style={{ animationPlayState: isHovered ? 'paused' : 'running' }}>
                    {marqueeRow1.map((num, i) => (
                        <div key={`row1-${i}`} className="marquee-item group px-4 md:px-8">
                            <div className="relative w-[280px] h-[200px] md:w-[480px] md:h-[340px] rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/5 shadow-2xl transition-all duration-700 group-hover:-translate-y-6 group-hover:shadow-[0_30px_60px_-10px_rgba(212,168,83,0.4)] group-hover:border-[#D4A853]/40 perspective-2000 group-hover:rotate-x-6 group-hover:rotate-y-3">
                                <Image
                                    src={`/certificates/1 (${num}).jpg`}
                                    alt={`Certificate ${num}`}
                                    fill
                                    className="object-contain p-4 md:p-8 transition-transform duration-1000 group-hover:scale-105"
                                    unoptimized
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/95 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-10">
                                    <div className="flex flex-col items-center gap-3 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700">
                                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-2xl border border-white/20 px-6 py-2 rounded-full shadow-2xl">
                                            <div className="w-2 h-2 rounded-full bg-[#D4A853] animate-pulse"></div>
                                            <span className="text-[#D4A853] font-black text-[10px] md:text-xs tracking-[0.3em] uppercase">{t('badge')}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Track 2 (Moves Right) */}
                <div className="flex w-fit animate-marquee-right" style={{ animationPlayState: isHovered ? 'paused' : 'running' }}>
                    {marqueeRow2.map((num, i) => (
                        <div key={`row2-${i}`} className="marquee-item group px-4 md:px-8">
                            <div className="relative w-[280px] h-[200px] md:w-[480px] md:h-[340px] rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/5 shadow-2xl transition-all duration-700 group-hover:-translate-y-6 group-hover:shadow-[0_30px_60px_-10px_rgba(212,168,83,0.4)] group-hover:border-[#D4A853]/40 perspective-2000 group-hover:-rotate-x-6 group-hover:-rotate-y-3">
                                <Image
                                    src={`/certificates/1 (${num}).jpg`}
                                    alt={`Certificate ${num}`}
                                    fill
                                    className="object-contain p-4 md:p-8 transition-transform duration-1000 group-hover:scale-105"
                                    unoptimized
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/95 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-10">
                                    <div className="flex flex-col items-center gap-3 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700">
                                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-2xl border border-white/20 px-6 py-2 rounded-full shadow-2xl">
                                            <div className="w-2 h-2 rounded-full bg-[#D4A853] animate-pulse"></div>
                                            <span className="text-[#D4A853] font-black text-[10px] md:text-xs tracking-[0.3em] uppercase">{t('badge')}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Verification System Mockup */}
            <div className="container mx-auto px-4 mt-20 relative z-30">
                <div className="max-w-4xl mx-auto rounded-[3rem] p-1 border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-3xl shadow-3xl overflow-hidden group/verify">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#D4A853]/5 via-transparent to-[#1e3a8a]/10 opacity-50"></div>
                    
                    <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center gap-10">
                        {/* Icon/Badge Area */}
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-gradient-to-tr from-[#D4A853] to-[#FFD700] flex items-center justify-center shadow-[0_15px_40px_-10px_rgba(212,168,83,0.6)] animate-bounce-slow shrink-0 rotate-3 group-hover/verify:rotate-6 transition-transform">
                            <svg className="w-12 h-12 text-[#0F172A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>

                        {/* Text Content */}
                        <div className="flex-1 text-center md:text-right rtl:md:text-right ltr:md:text-left">
                            <div className="inline-flex items-center gap-2 text-[#D4A853] font-black text-xs uppercase tracking-widest mb-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#D4A853]"></span>
                                {t('verification_badge')}
                            </div>
                            <h3 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight leading-tight">
                                {t('verification_title')}
                            </h3>
                            <p className="text-white/60 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
                                {t('verification_subtitle')}
                            </p>

                            {/* Search Interface */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1 relative group">
                                    <input 
                                        type="text" 
                                        placeholder={t('verification_ph')}
                                        className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl px-6 pt-1 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#D4A853]/50 focus:border-[#D4A853]/50 transition-all font-bold tracking-wider"
                                    />
                                    <div className="absolute inset-0 bg-[#D4A853]/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity pointer-events-none"></div>
                                </div>
                                <button className="h-16 px-10 bg-[#D4A853] text-[#0F172A] font-black rounded-2xl shadow-[0_10px_30px_-10px_rgba(212,168,83,0.5)] hover:shadow-[0_15px_40px_-10px_rgba(212,168,83,0.7)] hover:-translate-y-1 active:scale-95 transition-all whitespace-nowrap">
                                    {t('verification_btn')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes marquee-left {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-33.333333%); }
                }
                @keyframes marquee-right {
                    0% { transform: translateX(-33.333333%); }
                    100% { transform: translateX(0%); }
                }
                .animate-marquee-left {
                    animation: marquee-left 80s linear infinite;
                }
                .animate-marquee-right {
                    animation: marquee-right 80s linear infinite;
                }

                @media (max-width: 768px) {
                    .animate-marquee-left { animation-duration: 50s; }
                    .animate-marquee-right { animation-duration: 50s; }
                }
                
                .marquee-item {
                    transform: translateZ(0);
                    will-change: transform;
                }
            `}</style>
        </section>
    );
}
