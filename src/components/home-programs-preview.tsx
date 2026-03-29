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
        <section ref={sectionRef} id="programs" className="section-padding bg-slate-50 dark:bg-[#0F172A] relative overflow-hidden scroll-mt-28">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#1e3a8a]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4A853]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02]" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div ref={headerRef} className="text-center mb-12 md:mb-20">
                    <span className="text-[#1e3a8a] font-bold text-xs md:text-sm tracking-widest uppercase mb-3 block">{t('badge')}</span>
                    <h2 className="text-3xl md:text-5xl font-black mb-4 md:mb-6 text-slate-900 dark:text-white drop-shadow-sm leading-tight">
                        {t('title1')} <span className="text-[#D4A853]">{t('title_hl')}</span> {t('title2')}
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-2">
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
                                href={`/programs?category=${category.id}`}
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
                        <div className="text-center md:rtl:text-right md:ltr:text-left w-full">
                            <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2">{t('featured_title')} <span className="text-[#1e3a8a] dark:text-[#D4A853]">{t('featured_hl')}</span></h3>
                            <p className="text-slate-500 dark:text-slate-400">{t('featured_desc')}</p>
                        </div>
                    </div>

                    <div ref={featuredGridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000">
                        {featuredPrograms.map((program: Program) => (
                            <TiltCard key={program.id} intensity={8}>
                                <Link
                                    href={`/programs/${program.id}`}
                                    className="bg-white dark:bg-[#0F172A]/80 backdrop-blur-3xl rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 group hover:shadow-[0_40px_80px_-20px_rgba(30,58,138,0.3)] hover:border-[#D4A853]/40 transition-all duration-700 transform-gpu hover:-translate-y-4 flex flex-col h-full relative"
                                >
                                    {/* Glowing Effect underneath the card hover */}
                                    <div className="absolute inset-0 bg-[#D4A853]/5 opacity-0 group-hover:opacity-100 blur-[80px] transition-opacity duration-1000 -z-10" />

                                    {/* Card Header Image Area */}
                                    <div className="h-56 overflow-hidden relative">
                                        <Image
                                            src={program.image}
                                            alt={tp(`${program.id}.title`)}
                                            fill
                                            className="object-cover group-hover:scale-110 group-hover:rotate-2 transition-transform duration-1000 pointer-events-none"
                                        />
                                        
                                        {/* Premium Layered Overlays */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/20 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-700" />
                                        <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-[2.5rem]" />
                                        
                                        {/* Status & Badges */}
                                        <div className="absolute top-4 rtl:right-4 ltr:left-4 z-20 flex flex-col gap-2">
                                            <span className="text-[10px] uppercase tracking-[0.2em] font-black bg-gradient-to-r from-[#D4A853] to-[#e3c17a] text-[#0F172A] px-4 py-2 rounded-2xl shadow-2xl border border-white/20 whitespace-nowrap">
                                                {t('certified_badge')}
                                            </span>
                                            {program.isNew && (
                                                <span className="text-[10px] uppercase tracking-[0.2em] font-black bg-white/10 backdrop-blur-md text-[#D4A853] px-4 py-2 rounded-2xl border border-[#D4A853]/40 shadow-xl whitespace-nowrap">
                                                    جديد
                                                </span>
                                            )}
                                        </div>

                                        {/* Ambient Glow behind image footer */}
                                        <div className="absolute bottom-[-10px] left-0 right-0 h-10 bg-[#D4A853]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                    </div>

                                    {/* Card Content Area */}
                                    <div className="p-8 flex flex-col flex-1 relative z-10">
                                        <div className="flex items-center gap-2 mb-4 text-[#D4A853] group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-500">
                                            <span className="w-2 h-2 rounded-full bg-current animate-pulse shadow-[0_0_8px_rgba(212,168,83,0.5)]" />
                                            <span className="text-xs font-black tracking-widest uppercase">{tp(`${program.id}.duration`) || "برنامج متخصص"}</span>
                                        </div>

                                        <h4 className="font-extrabold text-slate-900 dark:text-white text-xl mb-6 group-hover:text-[#D4A853] transition-colors line-clamp-2 leading-[1.3] min-h-[3rem]">
                                            {tp(`${program.id}.title`)}
                                        </h4>

                                        <div className="mt-auto pt-6 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase font-black text-slate-400 dark:text-slate-500 block tracking-widest mb-1">{t('investment')}</span>
                                                <span className="font-black text-[#1e3a8a] dark:text-[#D4A853] text-lg lg:text-xl tracking-tight">{tp(`${program.id}.price`)}</span>
                                            </div>
                                            
                                            <div className="bg-[#1e3a8a] text-white px-4 md:px-6 py-2.5 md:py-3 rounded-2xl text-[10px] md:text-xs font-black hover:bg-[#D4A853] hover:text-[#172554] transition-all duration-500 flex items-center gap-2 md:gap-3 shadow-xl shrink-0">
                                                <span>{t('details')}</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 md:h-4 md:w-4 transform rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
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
