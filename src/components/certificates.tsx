"use client";

import { TiltCard } from "@/components/ui/tilt-card";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Certificates() {
    const t = useTranslations('Certificates');
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalCertificates = 11;

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % totalCertificates);
        }, 3000);
        return () => clearInterval(timer);
    }, [totalCertificates]);

    return (
        <section id="certificates" className="py-24 sm:py-32 bg-white dark:bg-[#0F172A] overflow-hidden scroll-mt-28 relative">
            {/* Bottom fade → transition to Testimonials dark section */}
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-b from-transparent via-transparent to-[#1A0B0E]/10 pointer-events-none z-10" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#D4A853]/20 to-transparent z-10" />
            <div className="container mx-auto px-4">
                <div className="relative bg-gradient-to-br from-[#7C2D36] via-[#5C1F27] to-[#3D1118] rounded-[2.5rem] sm:rounded-[4rem] p-8 sm:p-12 md:p-20 shadow-[0_40px_100px_-20px_rgba(124,45,54,0.3)] border border-white/10">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none overflow-hidden rounded-[inherit]">
                        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[120%] bg-white blur-[120px] rotate-45"></div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
                        {/* Content */}
                        <div className="text-white">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8 backdrop-blur-md">
                                <span className="w-2 h-2 rounded-full bg-[#D4A853] animate-pulse"></span>
                                <span className="text-xs font-bold uppercase tracking-widest text-[#D4A853]">{t('badge')}</span>
                            </div>

                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-8 leading-[1.1]">
                                {t('title1')} <br />
                                <span className="text-[#D4A853]">{t('title_hl')}</span> {t('title2')}
                            </h2>

                            <p className="text-white/80 text-lg sm:text-xl mb-12 leading-relaxed max-w-xl">
                                {t('subtitle')}
                            </p>

                            <div className="grid sm:grid-cols-2 gap-6 mb-12 rtl:text-right ltr:text-left">
                                {[
                                    t('feat1'),
                                    t('feat2'),
                                    t('feat3'),
                                    t('feat4')
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 group">
                                        <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-[#D4A853] group-hover:border-[#D4A853] transition-all duration-300">
                                            <svg className="w-6 h-6 text-[#D4A853] group-hover:text-[#7C2D36] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="font-bold text-lg">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <button className="bg-[#D4A853] text-[#1e3a8a] px-10 py-5 rounded-2xl font-black text-xl hover:bg-white transition-all shadow-xl flex items-center gap-4 group">
                                <span>{t('btn_details')}</span>
                                <svg className="w-6 h-6 rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1 transition-transform rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>

                        {/* Visual Mockup / Slider */}
                        <div className="relative group perspective-1000">
                            <TiltCard intensity={15} className="relative bg-[#1e3a8a]/5 backdrop-blur-xl border border-white/20 p-2 sm:p-4 rounded-3xl hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] h-[300px] sm:h-[400px] overflow-hidden flex items-center justify-center">
                                {/* Image Slider */}
                                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-inner bg-black/10">
                                    {Array.from({ length: totalCertificates }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                                            style={{
                                                opacity: i === currentIndex ? 1 : 0,
                                                zIndex: i === currentIndex ? 10 : 0
                                            }}
                                        >
                                            <Image
                                                src={`/certificates/${i + 1}.jpg`}
                                                alt={`Certificate ${i + 1}`}
                                                fill
                                                className="object-contain"
                                                unoptimized
                                            />
                                        </div>
                                    ))}
                                </div>
                                
                                {/* Indicators */}
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md">
                                    {Array.from({ length: totalCertificates }).map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentIndex(i)}
                                            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentIndex ? "w-6 bg-[#D4A853]" : "bg-white/50 hover:bg-white"}`}
                                        />
                                    ))}
                                </div>

                                {/* Floating Badge */}
                                <div className="absolute -top-6 -right-6 lg:-right-10 bg-gradient-to-br from-[#D4A853] to-[#B8860B] text-[#1e3a8a] w-24 h-24 rounded-full flex flex-col items-center justify-center font-black text-sm shadow-2xl border-4 border-[#1e3a8a] rotate-12 animate-float pointer-events-none z-30">
                                    {t('mockup_badge')}
                                </div>
                            </TiltCard>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
