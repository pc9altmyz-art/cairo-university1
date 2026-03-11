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
        <section ref={sectionRef} id="why-choose-us" className="py-24 sm:py-32 bg-white relative overflow-hidden scroll-mt-28">
            {/* Very subtle background pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#7C2D36 2px, transparent 2px)', backgroundSize: '40px 40px' }} />
            <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-slate-50 to-transparent pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-20 relative">
                    <div className="absolute top-0 right-1/2 translate-x-1/2 w-48 h-1.5 bg-gradient-to-r from-transparent via-[#7C2D36]/20 to-transparent rounded-full" />
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-slate-900 mt-8 tracking-tight">
                        {t('title1')} <span className="text-[#D4A853]">{t('title_hl')}</span>
                    </h2>
                    <p className="text-slate-500 text-lg sm:text-xl max-w-2xl mx-auto font-medium">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Features Grid */}
                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 perspective-1000">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-10px_rgba(124,45,54,0.15)] hover:border-[#7C2D36]/20 transition-all duration-500 group relative overflow-hidden will-change-transform transform-gpu hover:-translate-y-3"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#7C2D36]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute -right-10 -top-10 w-32 h-32 bg-slate-50 rounded-full group-hover:bg-[#D4A853]/10 transition-colors duration-500" />
                            <div className="text-5xl mb-8 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500 relative z-10 origin-bottom-right drop-shadow-sm">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-black text-slate-800 mb-4 group-hover:text-[#7C2D36] transition-colors relative z-10 leading-snug">
                                {feature.title}
                            </h3>
                            <p className="text-slate-500 text-sm leading-relaxed relative z-10 font-medium">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Stats */}
                <div ref={statsRef} className="mt-24 max-w-5xl mx-auto bg-gradient-to-br from-[#7C2D36] via-[#5D1E26] to-[#3D1118] rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl shadow-[#7C2D36]/30 group">
                    {/* Glowing effect inside the banner */}
                    <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-[#D4A853] rounded-full mix-blend-screen filter blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />

                    {/* Decoration */}
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white opacity-[0.03] rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center text-white relative z-10">
                        <div className="border-b md:border-b-0 md:border-l border-white/20 pb-8 md:pb-0 md:pl-12 flex flex-col items-center justify-center">
                            <div className="text-6xl sm:text-7xl font-black text-[#D4A853] mb-4 drop-shadow-[0_0_15px_rgba(212,168,83,0.5)]">+<AnimatedCounter end={100} suffix="K" /></div>
                            <div className="text-white/90 text-xl font-bold tracking-wide">{t('stat_graduates')}</div>
                        </div>
                        <div className="pt-4 md:pt-0 flex flex-col items-center justify-center">
                            <div className="text-6xl sm:text-7xl font-black text-[#D4A853] mb-4 drop-shadow-[0_0_15px_rgba(212,168,83,0.5)]">+<AnimatedCounter end={50} /></div>
                            <div className="text-white/90 text-xl font-bold tracking-wide">{t('stat_programs')}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
