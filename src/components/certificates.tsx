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

            <div className="container mx-auto px-4 relative z-10 mb-16 md:mb-24">
                <div className="flex flex-col lg:flex-row items-end justify-between gap-8 md:gap-12">
                    {/* Header Content */}
                    <div className="max-w-2xl text-white rtl:text-right ltr:text-left">
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-xl shadow-2xl">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#D4A853] animate-pulse shadow-[0_0_10px_rgba(212,168,83,0.8)]"></span>
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#D4A853]">{t('badge')}</span>
                        </div>

                        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black mb-8 leading-[1.05] tracking-tight">
                            {t('title1')} <span className="text-[#D4A853] drop-shadow-[0_0_20px_rgba(212,168,83,0.3)]">{t('title_hl')}</span> <br />
                            <span className="opacity-90">{t('title2')}</span>
                        </h2>

                        <p className="text-white/70 text-lg md:text-2xl leading-relaxed max-w-xl font-medium">
                            {t('subtitle')}
                        </p>
                    </div>

                    {/* Features Badges */}
                    <div className="grid grid-cols-2 gap-4 shrink-0 rtl:text-right ltr:text-left w-full lg:w-auto">
                        {[t('feat1'), t('feat2'), t('feat3'), t('feat4')].map((item, i) => (
                            <div key={i} className="premium-glass rounded-[2rem] px-6 py-4 flex items-center gap-4 group hover:bg-[#D4A853]/10 transition-all duration-500 hover:-translate-y-1">
                                <div className="w-10 h-10 rounded-xl bg-[#D4A853]/20 flex items-center justify-center text-[#D4A853] group-hover:bg-[#D4A853] group-hover:text-white transition-all">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="font-bold text-base text-white/90 group-hover:text-white">{item}</span>
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
                        <div key={`row1-${i}`} className="marquee-item group px-4 md:px-6">
                            <div className="relative w-[300px] h-[220px] md:w-[450px] md:h-[320px] rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/5 shadow-2xl transition-all duration-700 group-hover:-translate-y-4 group-hover:shadow-[0_20px_50px_rgba(212,168,83,0.2)] group-hover:border-[#D4A853]/40 perspective-1000">
                                <Image
                                    src={`/certificates/1 (${num}).jpg`}
                                    alt={`Certificate ${num}`}
                                    fill
                                    className="object-contain p-4 md:p-6 transition-transform duration-1000 group-hover:scale-105"
                                    unoptimized
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-8">
                                    <span className="text-[#D4A853] font-black text-sm tracking-[0.2em] uppercase bg-white/10 px-8 py-3 rounded-2xl backdrop-blur-xl border border-white/20 shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        معتمد رسمياً
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Track 2 (Moves Right) */}
                <div className="flex w-fit animate-marquee-right" style={{ animationPlayState: isHovered ? 'paused' : 'running' }}>
                    {marqueeRow2.map((num, i) => (
                        <div key={`row2-${i}`} className="marquee-item group px-4 md:px-6">
                            <div className="relative w-[300px] h-[220px] md:w-[450px] md:h-[320px] rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/5 shadow-2xl transition-all duration-700 group-hover:-translate-y-4 group-hover:shadow-[0_20px_50px_rgba(212,168,83,0.2)] group-hover:border-[#D4A853]/40 perspective-1000">
                                <Image
                                    src={`/certificates/1 (${num}).jpg`}
                                    alt={`Certificate ${num}`}
                                    fill
                                    className="object-contain p-4 md:p-6 transition-transform duration-1000 group-hover:scale-105"
                                    unoptimized
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-8">
                                    <span className="text-[#D4A853] font-black text-sm tracking-[0.2em] uppercase bg-white/10 px-8 py-3 rounded-2xl backdrop-blur-xl border border-white/20 shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        معتمد رسمياً
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
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
