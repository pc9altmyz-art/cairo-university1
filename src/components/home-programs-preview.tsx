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
        <section ref={sectionRef} id="programs" className="py-32 bg-slate-50 dark:bg-[#0F172A] relative overflow-hidden scroll-mt-28">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#1e3a8a]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4A853]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02]" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div ref={headerRef} className="text-center mb-20">
                    <span className="text-[#1e3a8a] font-bold text-sm tracking-widest uppercase mb-3 block">{t('badge')}</span>
                    <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white drop-shadow-sm">
                        {t('title1')} <span className="text-[#D4A853]">{t('title_hl')}</span> {t('title2')}
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Categories Grid */}
                <div ref={catGridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 perspective-1000">
                    {categories.map((category) => (
                        <TiltCard key={category.id} intensity={10} className="bg-white dark:bg-white/5 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(30,58,138,0.1)] transition-all duration-500 border border-slate-100 dark:border-white/10 hover:border-[#1e3a8a]/20 group relative transform-gpu hover:-translate-y-2">
                            {/* Glow under the card */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a]/10 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500 blur-xl -z-10" />

                            <div className="w-16 h-16 bg-[#1e3a8a]/5 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:bg-[#1e3a8a] group-hover:text-white transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-sm">
                                {category.icon}
                            </div>

                            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-[#1e3a8a] dark:group-hover:text-[#D4A853] transition-colors inline-block z-10 relative">
                                {tc(`${category.id}.name`) || category.name}
                            </h3>

                            <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed font-medium relative z-10">
                                {tc(`${category.id}.description`) || category.description}
                            </p>

                            <Link
                                href="/programs"
                                className="inline-flex items-center text-[#1e3a8a] font-black gap-2 hover:gap-3 transition-all text-sm uppercase tracking-wide relative z-10"
                            >
                                <span>{t('btn_all_programs')}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform rtl:rotate-0 rotate-180" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </Link>

                            {/* Accent line */}
                            <div className="absolute top-0 right-1/2 translate-x-1/2 w-48 h-1.5 bg-gradient-to-r from-transparent via-[#1e3a8a]/20 to-transparent rounded-full" />
                        </TiltCard>
                    ))}
                </div>

                {/* Featured Programs Preview "نبذة" */}
                <div className="mt-16">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                        <div className="rtl:text-right ltr:text-left w-full">
                            <h3 className="text-3xl font-black text-slate-900 mb-2">{t('featured_title')} <span className="text-[#1e3a8a]">{t('featured_hl')}</span></h3>
                            <p className="text-slate-500">{t('featured_desc')}</p>
                        </div>
                    </div>

                    <div ref={featuredGridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000">
                        {featuredPrograms.map((program: Program) => (
                            <TiltCard key={program.id} intensity={8}>
                                <Link
                                    href={`/programs/${program.id}`}
                                    className="bg-white dark:bg-white/5 rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 dark:border-white/10 group hover:shadow-[0_20px_50px_rgba(30,58,138,0.15)] hover:border-[#1e3a8a]/20 transition-all duration-500 transform-gpu hover:-translate-y-2 flex flex-col h-full"
                                >
                                    <div className="h-48 overflow-hidden relative">
                                        <Image
                                            src={program.image}
                                            alt={tp(`${program.id}.title`)}
                                            fill
                                            className="object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 pointer-events-none"
                                        />
                                        {/* Branding Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#172554]/90 via-[#1e3a8a]/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                                        <div className="absolute bottom-4 rtl:right-4 ltr:left-4 text-white z-10 transition-transform duration-500 group-hover:-translate-y-1">
                                            <span className="text-[10px] uppercase tracking-widest font-black bg-gradient-to-r from-[#D4A853] to-[#e3c17a] text-[#172554] px-3 py-1.5 rounded-xl shadow-lg">{t('certified_badge')}</span>
                                        </div>

                                        {/* Icon Watermark */}
                                        <div className="absolute top-4 rtl:left-4 ltr:right-4 text-white/30 text-2xl font-black drop-shadow-md">🎓</div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-1 relative bg-white dark:bg-white/5">
                                        <h4 className="font-black text-slate-900 dark:text-white text-lg mb-4 group-hover:text-[#1e3a8a] dark:group-hover:text-[#D4A853] transition-colors line-clamp-2 leading-snug">{tp(`${program.id}.title`)}</h4>
                                        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block tracking-wider">{t('investment')}</span>
                                                <span className="font-black text-[#1e3a8a] text-base">{tp(`${program.id}.price`)}</span>
                                            </div>
                                            <div className="bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-white/10 px-4 py-2 rounded-xl text-xs font-black group-hover:bg-[#1e3a8a] group-hover:text-white group-hover:border-[#1e3a8a] transition-all duration-300 flex items-center gap-2 shadow-sm">
                                                <span>{t('details')}</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 transform rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </TiltCard>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Link
                            href="/programs"
                            className="bg-white dark:bg-white/5 border-2 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 px-10 py-4 rounded-2xl font-black hover:bg-slate-50 dark:hover:bg-white/10 hover:border-[#1e3a8a] hover:text-[#1e3a8a] transition-all inline-block shadow-sm group hover:-translate-y-1"
                        >
                            {t('btn_more_programs')} <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 ml-1 rtl:ml-0 rtl:mr-1 rtl:rotate-180">&larr;</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
