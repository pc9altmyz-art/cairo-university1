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
        <section id="certificates" className="py-24 sm:py-32 bg-[#0F172A] relative overflow-hidden scroll-mt-28">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1e3a8a]/10 to-[#172554]/40 pointer-events-none" />
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#D4A853]/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#1e40af]/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10 mb-16 md:mb-24">
                <div className="flex flex-col lg:flex-row items-end justify-between gap-8 md:gap-12">
                    {/* Header Content */}
                    <div className="max-w-2xl text-white rtl:text-right ltr:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
                            <span className="w-2 h-2 rounded-full bg-[#D4A853] animate-pulse"></span>
                            <span className="text-xs font-bold uppercase tracking-widest text-[#D4A853]">{t('badge')}</span>
                        </div>

                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-[1.1]">
                            {t('title1')} <span className="text-[#D4A853]">{t('title_hl')}</span> <br />
                            {t('title2')}
                        </h2>

                        <p className="text-white/70 text-lg md:text-xl leading-relaxed">
                            {t('subtitle')}
                        </p>
                    </div>

                    {/* Features Badges */}
                    <div className="grid grid-cols-2 gap-3 lg:gap-4 shrink-0 rtl:text-right ltr:text-left w-full lg:w-auto">
                        {[t('feat1'), t('feat2'), t('feat3'), t('feat4')].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 hover:bg-white/10 transition-colors">
                                <div className="text-[#D4A853]">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="font-bold text-sm text-white/90">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Infinite Marquee Section */}
            <div 
                className="relative w-full flex flex-col gap-6 md:gap-8 pb-10"
                dir="ltr" // Force LTR for purely directional CSS scrolling logic
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Glow behind tracks */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[150%] bg-[#D4A853]/5 blur-[100px] pointer-events-none" />

                {/* Left/Right Fade Gradients for smooth edges */}
                <div className="absolute top-0 bottom-0 left-0 w-12 md:w-32 bg-gradient-to-r from-[#0F172A] to-transparent z-20 pointer-events-none" />
                <div className="absolute top-0 bottom-0 right-0 w-12 md:w-32 bg-gradient-to-l from-[#0F172A] to-transparent z-20 pointer-events-none" />

                {/* Track 1 (Moves Left) */}
                <div className="flex w-fit animate-marquee-left" style={{ animationPlayState: isHovered ? 'paused' : 'running' }}>
                    {marqueeRow1.map((num, i) => (
                        <div key={`row1-${i}`} className="marquee-item group px-3 md:px-4">
                            <div className="relative w-[280px] h-[200px] md:w-[350px] md:h-[250px] rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[#D4A853]/20 group-hover:border-[#D4A853]/50">
                                <Image
                                    src={`/certificates/1 (${num}).jpg`}
                                    alt={`Certificate ${num}`}
                                    fill
                                    className="object-contain p-2 transition-transform duration-700 group-hover:scale-105"
                                    unoptimized
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                                    <span className="text-[#D4A853] font-bold text-sm tracking-widest uppercase bg-[#0F172A]/80 px-4 py-1.5 rounded-full backdrop-blur-md border border-[#D4A853]/30">
                                        معتمد
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Track 2 (Moves Right) */}
                <div className="flex w-fit animate-marquee-right" style={{ animationPlayState: isHovered ? 'paused' : 'running' }}>
                    {marqueeRow2.map((num, i) => (
                        <div key={`row2-${i}`} className="marquee-item group px-3 md:px-4">
                            <div className="relative w-[280px] h-[200px] md:w-[350px] md:h-[250px] rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[#D4A853]/20 group-hover:border-[#D4A853]/50">
                                <Image
                                    src={`/certificates/1 (${num}).jpg`}
                                    alt={`Certificate ${num}`}
                                    fill
                                    className="object-contain p-2 transition-transform duration-700 group-hover:scale-105"
                                    unoptimized
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                                    <span className="text-[#D4A853] font-bold text-sm tracking-widest uppercase bg-[#0F172A]/80 px-4 py-1.5 rounded-full backdrop-blur-md border border-[#D4A853]/30">
                                        معتمد
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
                    /* The total width is 3 sets. We translate by 1 set (33.333%). Custom duration logic needed based on width, but CSS deals with it if width is consistent. */
                    animation: marquee-left 60s linear infinite;
                }
                .animate-marquee-right {
                    animation: marquee-right 60s linear infinite;
                }

                @media (max-width: 768px) {
                    .animate-marquee-left { animation-duration: 40s; }
                    .animate-marquee-right { animation-duration: 40s; }
                }
                
                /* Optimize rendering for the scrolling tracks */
                .marquee-item {
                    transform: translateZ(0);
                    will-change: transform;
                }
            `}</style>
        </section>
    );
}
