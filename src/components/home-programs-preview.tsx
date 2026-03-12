"use client";

import { useEffect, useRef } from "react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { categories, getFeaturedPrograms, type Program } from "@/data/programs";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TiltCard } from "@/components/ui/tilt-card";
import { useTranslations } from "next-intl";

export default function HomeProgramsPreview() {
    const t = useTranslations('HomeProgramsPreview');
    const tc = useTranslations('Categories');
    const tp = useTranslations('ProgramsData');
    const featuredPrograms = getFeaturedPrograms().slice(0, 3);
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const catGridRef = useRef<HTMLDivElement>(null);
    const featuredGridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
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

            gsap.fromTo(catGridRef.current?.children || [],
                { opacity: 0, y: 50 },
                {
                    opacity: 1, y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: catGridRef.current,
                        start: "top 80%",
                    }
                }
            );

            gsap.fromTo(featuredGridRef.current?.children || [],
                { opacity: 0, y: 50, scale: 0.95 },
                {
                    opacity: 1, y: 0, scale: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: featuredGridRef.current,
                        start: "top 80%",
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="programs" className="py-32 bg-white dark:bg-[#0A0204] relative overflow-hidden scroll-mt-28 transition-colors duration-500">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-slate-50 dark:bg-[#7C2D36]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#7C2D36]/5 dark:bg-[#D4A853]/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            
            {/* Subtle premium mesh */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div ref={headerRef} className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 mb-6 backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-[#7C2D36] dark:bg-[#D4A853] animate-pulse"></span>
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#7C2D36] dark:text-[#D4A853]">{t('badge')}</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black mb-8 text-slate-900 dark:text-white tracking-tight leading-tight">
                        {t('title1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C2D36] to-[#9B3944] dark:from-[#D4A853] dark:via-[#ECD2A2] dark:to-[#B8860B]">{t('title_hl')}</span> {t('title2')}
                    </h2>
                    <p className="text-slate-500 dark:text-white/60 text-lg max-w-2xl mx-auto leading-relaxed font-medium">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Categories Grid */}
                <div ref={catGridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32 perspective-2000">
                    {categories.map((category) => (
                        <TiltCard key={category.id} intensity={12} className="bg-white dark:bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-10 border border-slate-100 dark:border-white/10 hover:border-[#7C2D36]/30 dark:hover:border-[#D4A853]/30 transition-all duration-700 group relative transform-gpu hover:-translate-y-4 shadow-sm dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                            {/* Inner Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#7C2D36]/5 dark:from-[#D4A853]/5 to-transparent opacity-0 group-hover:opacity-100 rounded-[2.5rem] transition-all duration-700" />

                            <div className="w-20 h-20 bg-gradient-to-br from-slate-100 dark:from-[#7C2D36]/20 to-slate-200 dark:to-[#3D1118]/40 rounded-3xl flex items-center justify-center text-5xl mb-8 group-hover:from-[#7C2D36] group-hover:to-[#9B3944] dark:group-hover:from-[#D4A853] dark:group-hover:to-[#ECD2A2] group-hover:text-white dark:group-hover:text-[#3D1118] transition-all duration-700 group-hover:rotate-12 group-hover:scale-110 shadow-sm dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-slate-100 dark:border-white/5">
                                {category.icon}
                            </div>

                            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-[#7C2D36] dark:group-hover:text-[#D4A853] transition-colors inline-block z-10 relative">
                                {tc(`${category.id}.name`) || category.name}
                            </h3>

                            <p className="text-slate-500 dark:text-white/50 mb-10 leading-relaxed font-medium relative z-10 group-hover:text-slate-700 dark:group-hover:text-white/70 transition-colors">
                                {tc(`${category.id}.description`) || category.description}
                            </p>

                            <Link
                                href="/programs"
                                className="inline-flex items-center text-[#7C2D36] dark:text-[#D4A853] font-black gap-3 hover:gap-5 transition-all text-sm uppercase tracking-[0.2em] relative z-10 group/link"
                            >
                                <span>{t('btn_all_programs')}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform rtl:rotate-0 rotate-180 group-hover/link:scale-125 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </Link>

                            {/* Luxury border glow on hover */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-transparent via-[#7C2D36]/10 dark:via-[#D4A853]/20 to-transparent opacity-0 group-hover:opacity-100 rounded-[2.5rem] blur-sm transition-opacity duration-700 -z-10" />
                        </TiltCard>
                    ))}
                </div>

                {/* Featured Programs Preview */}
                <div className="mt-16 bg-slate-50 dark:bg-white/5 backdrop-blur-2xl rounded-[4rem] p-10 md:p-20 border border-slate-100 dark:border-white/10 shadow-sm dark:shadow-[0_50px_100px_rgba(0,0,0,0.5)]">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                        <div className="rtl:text-right ltr:text-left w-full">
                            <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                                {t('featured_title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C2D36] to-[#9B3944] dark:from-[#D4A853] dark:to-[#ECD2A2]">{t('featured_hl')}</span>
                            </h3>
                            <div className="w-24 h-1 bg-[#7C2D36] dark:bg-[#D4A853] rounded-full mb-6" />
                            <p className="text-slate-500 dark:text-white/40 font-medium text-lg leading-relaxed">{t('featured_desc')}</p>
                        </div>
                    </div>

                    <div ref={featuredGridRef} className="grid grid-cols-1 md:grid-cols-3 gap-10 perspective-1000">
                        {featuredPrograms.map((program: Program) => (
                            <TiltCard key={program.id} intensity={10}>
                                <Link
                                    href={`/programs/${program.id}`}
                                    className="bg-white dark:bg-[#0D0405]/60 backdrop-blur-md rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-white/10 group hover:border-[#7C2D36]/40 dark:hover:border-[#D4A853]/40 transition-all duration-700 transform-gpu hover:-translate-y-4 flex flex-col h-full shadow-sm dark:shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
                                >
                                    <div className="h-60 overflow-hidden relative">
                                        <Image
                                            src={program.image}
                                            alt={tp(`${program.id}.title`)}
                                            fill
                                            className="object-cover group-hover:scale-110 group-hover:rotate-2 transition-transform duration-1000 pointer-events-none"
                                        />
                                        {/* Luxury Scrim Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-white/90 dark:from-[#0A0204] via-transparent to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />

                                        <div className="absolute top-6 rtl:right-6 ltr:left-6 text-white z-10 transition-transform duration-700 group-hover:-translate-y-1">
                                            <div className="relative">
                                                <div className="absolute -inset-2 bg-[#7C2D36] dark:bg-[#D4A853] blur-lg opacity-40 group-hover:opacity-70 transition-opacity" />
                                                <span className="relative text-[10px] uppercase tracking-[0.3em] font-black bg-gradient-to-br from-[#7C2D36] via-[#9B3944] to-[#4A171D] dark:from-[#D4A853] dark:to-[#B8860B] text-white dark:text-[#3D1118] px-4 py-2 rounded-xl shadow-2xl block">{t('certified_badge')}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-10 flex flex-col flex-1 relative">
                                        <h4 className="font-black text-slate-800 dark:text-white text-xl mb-6 group-hover:text-[#7C2D36] dark:group-hover:text-[#D4A853] transition-colors line-clamp-2 leading-tight tracking-tight">{tp(`${program.id}.title`)}</h4>
                                        <div className="mt-auto pt-8 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase font-black text-slate-400 dark:text-white/30 block tracking-[0.2em] mb-1">{t('investment')}</span>
                                                <span className="font-black text-[#7C2D36] dark:text-[#D4A853] text-xl drop-shadow-[0_0_10px_rgba(124,45,54,0.1)] dark:drop-shadow-[0_0_10px_rgba(212,168,83,0.3)]">{tp(`${program.id}.price`)}</span>
                                            </div>
                                            <div className="bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-white/80 border border-slate-200 dark:border-white/10 px-6 py-3 rounded-2xl text-xs font-black group-hover:bg-[#7C2D36] dark:group-hover:bg-[#D4A853] group-hover:text-white dark:group-hover:text-[#3D1118] transition-all duration-500 flex items-center gap-3 shadow-sm dark:shadow-2xl overflow-hidden relative">
                                                <span className="relative z-10">{t('details')}</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 relative z-10 transform rtl:rotate-180 group-hover:translate-x-1.5 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:animate-shimmer" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </TiltCard>
                        ))}
                    </div>

                    <div className="mt-20 text-center">
                        <Link
                            href="/programs"
                            className="group relative px-12 py-6 bg-transparent border border-[#7C2D36]/30 dark:border-[#D4A853]/30 text-[#7C2D36] dark:text-[#D4A853] rounded-3xl font-black text-lg hover:border-[#7C2D36] dark:hover:border-[#D4A853] transition-all duration-500 overflow-hidden inline-block"
                        >
                            <span className="relative z-10 flex items-center gap-4">
                                {t('btn_more_programs')}
                                <span className="inline-block transition-transform duration-500 group-hover/btn:translate-x-2 rtl:rotate-180">&rarr;</span>
                            </span>
                            <div className="absolute inset-0 bg-[#7C2D36] dark:bg-[#D4A853] translate-y-full group-hover:translate-y-0 transition-transform duration-500 -z-10" />
                            <style jsx>{`
                                a:hover span { color: white; }
                                :global(.dark) a:hover span { color: #3D1118; }
                            `}</style>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
