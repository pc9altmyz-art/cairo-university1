"use client";

import { useEffect, useRef, useState, memo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";

const AnimatedCounter = memo(function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const countRef = useRef<HTMLSpanElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    let startTimestamp: number | null = null;
                    const duration = 2500; // 2.5 seconds

                    const step = (timestamp: number) => {
                        if (!startTimestamp) startTimestamp = timestamp;
                        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                        const easeProgress = 1 - Math.pow(1 - progress, 5); // ease out quint
                        setCount(Math.floor(easeProgress * end));
                        if (progress < 1) window.requestAnimationFrame(step);
                    };

                    window.requestAnimationFrame(step);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        if (countRef.current) observer.observe(countRef.current);
        return () => observer.disconnect();
    }, [end]);

    return <span ref={countRef}>{count.toLocaleString()}{suffix}</span>;
});

export default function WhyChooseUs() {
    const t = useTranslations('WhyChooseUs');
    const features = [
        {
            icon: "🏛️",
            title: t('feat1_title'),
            description: t('feat1_desc'),
        },
        {
            icon: "👨‍🏫",
            title: t('feat2_title'),
            description: t('feat2_desc'),
        },
        {
            icon: "💼",
            title: t('feat3_title'),
            description: t('feat3_desc'),
        },
        {
            icon: "🎯",
            title: t('feat4_title'),
            description: t('feat4_desc'),
        },
    ];

    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Header animation
            gsap.fromTo(headerRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                    }
                }
            );

            // Cards staggered animation
            gsap.fromTo(gridRef.current?.children || [],
                { opacity: 0, y: 50, rotateX: -10 },
                {
                    opacity: 1, y: 0, rotateX: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: "top 80%",
                    }
                }
            );

            // Stats banner animation
            gsap.fromTo(statsRef.current,
                { opacity: 0, scale: 0.95, y: 30 },
                {
                    opacity: 1, scale: 1, y: 0,
                    duration: 1.2,
                    ease: "elastic.out(1, 0.7)",
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
        <section ref={sectionRef} id="why-choose-us" className="py-24 sm:py-32 bg-white dark:bg-[#0A0204] relative overflow-hidden scroll-mt-28 transition-colors duration-500">
            {/* Immersive background decoration */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(currentColor 0.8px, transparent 0.8px)', backgroundSize: '30px 30px' }} />
            <div className="absolute top-0 left-0 w-full h-[30vh] bg-gradient-to-b from-slate-50 dark:from-[#0D0405] to-transparent pointer-events-none" />
            
            {/* Geometric Glows */}
            <div className="absolute top-1/4 -left-[10%] w-[40%] h-[40%] bg-[#7C2D36]/5 dark:bg-[#7C2D36]/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 -right-[10%] w-[40%] h-[40%] bg-[#7C2D36]/5 dark:bg-[#D4A853]/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-24 relative">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 mb-8 backdrop-blur-md translate-y-[-10px]">
                        <span className="w-2 h-2 rounded-full bg-[#7C2D36] dark:bg-[#D4A853] animate-pulse"></span>
                        <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#7C2D36] dark:text-[#D4A853]">{t('badge') || 'Why Cairo University'}</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black mb-8 text-slate-900 dark:text-white tracking-tighter leading-none">
                        {t('title1')} <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#7C2D36] to-[#9B3944] dark:from-[#D4A853] dark:to-[#B8860B]">{t('title_hl')}</span>
                    </h2>
                    <p className="text-slate-500 dark:text-white/40 text-lg sm:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Features Bento Grid */}
                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 perspective-2000">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-white/5 backdrop-blur-xl p-10 rounded-[3rem] border border-slate-100 dark:border-white/5 shadow-sm dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:shadow-premium dark:hover:shadow-[0_40px_80px_-20px_rgba(212,168,83,0.15)] hover:border-[#7C2D36]/30 dark:hover:border-[#D4A853]/30 transition-all duration-700 group relative overflow-hidden will-change-transform transform-gpu hover:-translate-y-4"
                        >
                            {/* Animated background gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#7C2D36]/5 dark:from-[#D4A853]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                            
                            {/* Decorative Icon Circle */}
                            <div className="w-20 h-20 bg-slate-50 dark:bg-[#0A0204] rounded-[2rem] flex items-center justify-center text-4xl mb-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 relative z-10 shadow-sm dark:shadow-[inner_0_2px_10px_rgba(255,255,255,0.05)] border border-slate-100 dark:border-white/10">
                                <span className="drop-shadow-sm dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">{feature.icon}</span>
                            </div>

                            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6 group-hover:text-[#7C2D36] dark:group-hover:text-[#D4A853] transition-colors relative z-10 leading-tight">
                                {feature.title}
                            </h3>
                            <p className="text-slate-500 dark:text-white/40 text-base leading-relaxed relative z-10 font-medium group-hover:text-slate-700 dark:group-hover:text-white/70 transition-colors">
                                {feature.description}
                            </p>

                            {/* Luxury ambient light */}
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#7C2D36]/5 dark:bg-[#D4A853]/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    ))}
                </div>

                {/* Exclusive Stats Banner */}
                <div ref={statsRef} className="mt-32 max-w-6xl mx-auto bg-slate-50 dark:bg-[#0a0204]/80 backdrop-blur-3xl rounded-[4rem] p-12 md:p-24 text-slate-900 dark:text-white relative overflow-hidden shadow-premium dark:shadow-[0_50px_100_rgba(0,0,0,0.8)] border border-slate-200 dark:border-white/5 group">
                    {/* Deep Mesh Background */}
                    <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" style={{ backgroundImage: "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                    
                    {/* Cinematic Glows */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-[#7C2D36]/10 dark:from-[#7C2D36]/20 to-[#D4A853]/5 opacity-30 blur-[120px] pointer-events-none" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 text-center relative z-10 items-center">
                        <div className="relative pb-10 md:pb-0 md:border-r border-slate-200 dark:border-white/10 group/stat">
                            <div className="text-7xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#7C2D36] to-[#4A171D] dark:from-[#D4A853] dark:via-[#ECD2A2] dark:to-[#B8860B] mb-6 drop-shadow-sm dark:drop-shadow-[0_15px_30px_rgba(212,168,83,0.4)] group-hover/stat:scale-105 transition-transform duration-700">
                                +<AnimatedCounter end={100} suffix="K" />
                            </div>
                            <div className="text-slate-500 dark:text-white/40 text-xl font-black tracking-[0.3em] uppercase">{t('stat_graduates')}</div>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#7C2D36] dark:bg-[#D4A853] rounded-full scale-x-50 opacity-20" />
                        </div>
                        <div className="relative group/stat">
                            <div className="text-7xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#7C2D36] to-[#4A171D] dark:from-[#D4A853] dark:via-[#ECD2A2] dark:to-[#B8860B] mb-6 drop-shadow-sm dark:drop-shadow-[0_15px_30px_rgba(212,168,83,0.4)] group-hover/stat:scale-105 transition-transform duration-700">
                                +<AnimatedCounter end={50} />
                            </div>
                            <div className="text-slate-500 dark:text-white/40 text-xl font-black tracking-[0.3em] uppercase">{t('stat_programs')}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
