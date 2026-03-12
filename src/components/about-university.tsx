"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TiltCard } from "@/components/ui/tilt-card";
import { useTranslations } from "next-intl";

export default function AboutUniversity() {
    const t = useTranslations('AboutUniversity');
    const sectionRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            gsap.fromTo(imageRef.current,
                { opacity: 0, x: 50, rotateY: 15 },
                {
                    opacity: 1, x: 0, rotateY: 0,
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                    }
                }
            );

            gsap.fromTo(contentRef.current?.children || [],
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 60%",
                    }
                }
            );

            gsap.fromTo(statsRef.current?.children || [],
                { opacity: 0, scale: 0.8 },
                {
                    opacity: 1, scale: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "back.out(1.5)",
                    scrollTrigger: {
                        trigger: statsRef.current,
                        start: "top 85%",
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="about" className="py-24 sm:py-32 bg-white dark:bg-[#0A0204] overflow-hidden relative scroll-mt-28 transition-colors duration-500">
            {/* Background Atmosphere */}
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-slate-50 to-white dark:from-[#1A0B0E] dark:via-transparent dark:to-[#0D0405] opacity-60 pointer-events-none" />
            <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#7C2D36]/5 dark:bg-[#D4A853]/5 rounded-full blur-[120px] pointer-events-none" />
            
            {/* Mesh Detail */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Image Showcase */}
                    <div ref={imageRef} className="relative order-2 lg:order-1 perspective-2000">
                        <TiltCard intensity={8} className="rounded-[3rem] overflow-hidden bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-2xl group shadow-premium dark:shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
                            <div className="aspect-[4/3] relative pointer-events-none">
                                <Image
                                    src="/background.jpg"
                                    alt="جامعة القاهرة"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover group-hover:scale-110 transition-transform duration-1000 origin-center opacity-90 dark:opacity-70 group-hover:opacity-100"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/80 dark:from-[#0A0204] via-transparent to-transparent opacity-80" />
                            </div>
                        </TiltCard>
                        
                        {/* Status Badge */}
                        <div className="absolute -bottom-8 rtl:right-8 ltr:left-8 sm:-bottom-12 sm:rtl:-right-12 sm:ltr:-left-12 bg-gradient-to-br from-[#7C2D36] via-[#9B3944] to-[#4A171D] dark:from-[#D4A853] dark:via-[#ECD2A2] dark:to-[#B8860B] text-white dark:text-[#3D1118] rounded-[2.5rem] p-8 sm:p-10 shadow-xl dark:shadow-[0_30px_60px_rgba(212,168,83,0.4)] border-4 border-white dark:border-[#0A0204] hover:-translate-y-3 transition-all duration-700 z-10 group/stat-badge overflow-hidden">
                            <div className="text-5xl sm:text-6xl font-black mb-1 tracking-tighter">{t('badge_year')}</div>
                            <div className="text-sm sm:text-base font-black uppercase tracking-[0.3em] opacity-80">{t('badge_est')}</div>
                            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover/stat-badge:animate-shimmer" />
                        </div>
                    </div>

                    {/* Elite Content */}
                    <div ref={contentRef} className="order-1 lg:order-2">
                        <div className="inline-flex items-center gap-3 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full px-6 py-2.5 mb-10 backdrop-blur-2xl">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#7C2D36] dark:bg-[#D4A853] animate-pulse shadow-[0_0_10px_currentColor]" />
                            <span className="text-[#7C2D36] dark:text-[#D4A853] text-xs font-black tracking-[0.4em] uppercase">{t('badge_heritage')}</span>
                        </div>
                        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black mb-10 text-slate-900 dark:text-white tracking-tighter leading-[1.1]">
                            {t('title1')} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C2D36] to-[#9B3944] dark:from-[#D4A853] dark:via-[#ECD2A2] dark:to-[#B8860B]">{t('title_hl')}</span>
                        </h2>

                        <div className="space-y-8 text-slate-600 dark:text-white/50 text-xl leading-relaxed mb-16 font-medium">
                            <p className="first-letter:text-4xl first-letter:font-black first-letter:text-[#7C2D36] dark:first-letter:text-[#D4A853]">
                                {t('desc1')}
                            </p>
                            <p className="opacity-80">
                                {t('desc2')}
                            </p>
                        </div>

                        {/* Staggered Stats Grid */}
                        <div ref={statsRef} className="grid grid-cols-3 gap-6 sm:gap-8">
                            {[
                                { val: "+25", label: t('stat1') },
                                { val: "+200K", label: t('stat2') },
                                { val: "#1", label: t('stat3') }
                            ].map((stat, i) => (
                                <div key={i} className="bg-slate-50 dark:bg-white/5 backdrop-blur-xl border border-slate-100 dark:border-white/10 rounded-[2rem] p-8 text-center hover:bg-white dark:hover:bg-white/10 hover:border-[#7C2D36]/30 dark:hover:border-[#D4A853]/30 transition-all duration-500 group/stat shadow-sm dark:shadow-2xl">
                                    <div className="text-2xl sm:text-4xl font-black text-[#7C2D36] dark:text-[#D4A853] mb-3 drop-shadow-[0_5px_15px_rgba(124,45,54,0.1)] dark:drop-shadow-[0_5px_15px_rgba(212,168,83,0.3)] group-hover/stat:scale-110 transition-transform">
                                        {stat.val}
                                    </div>
                                    <div className="text-[10px] sm:text-xs text-slate-400 dark:text-white/40 font-black uppercase tracking-[0.2em] group-hover/stat:text-slate-600 dark:group-hover/stat:text-white/60 transition-colors">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
