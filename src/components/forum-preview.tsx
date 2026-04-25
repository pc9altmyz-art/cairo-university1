"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function ForumPreview() {
    const t = useTranslations('Forum');
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".forum-card", {
                y: 60,
                opacity: 0,
                duration: 1,
                stagger: 0.3,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            });

            gsap.from(".forum-stats", {
                scale: 0.8,
                opacity: 0,
                duration: 1,
                delay: 0.5,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="forum" ref={containerRef} className="section-padding bg-slate-50 dark:bg-[#0F172A] relative overflow-hidden transition-colors duration-700">
            {/* Artistic Background Decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4A853]/5 dark:bg-[#D4A853]/10 rounded-full blur-[120px] -mr-64 -mt-64"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[100px] -ml-48 -mb-48"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-20">
                    <div className="max-w-2xl rtl:text-right ltr:text-left">
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 mb-8 backdrop-blur-xl shadow-xl dark:shadow-none">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#D4A853] animate-pulse"></span>
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#D4A853]">{t('badge')}</span>
                        </div>
                        <h2 className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 leading-[1.1] tracking-tight">
                            {t('title1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A853] via-[#FFD700] to-[#D4A853]">{t('title_hl')}</span> <br className="hidden md:block" />
                            {t('title2')}
                        </h2>
                        <p className="text-slate-600 dark:text-white/60 text-lg md:text-2xl leading-relaxed font-medium">
                            {t('subtitle')}
                        </p>
                    </div>

                    <div className="forum-stats flex flex-wrap gap-8 md:gap-16 justify-center">
                        <div className="bg-white dark:bg-white/5 p-8 rounded-[2.5rem] border border-slate-100 dark:border-white/10 shadow-2xl dark:shadow-none min-w-[180px] text-center transform hover:-translate-y-2 transition-transform">
                            <div className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-2 tracking-tighter">1.2k+</div>
                            <div className="text-[#D4A853] font-black uppercase text-xs tracking-[0.3em]">{t('stats_posts')}</div>
                        </div>
                        <div className="bg-white dark:bg-white/5 p-8 rounded-[2.5rem] border border-slate-100 dark:border-white/10 shadow-2xl dark:shadow-none min-w-[180px] text-center transform hover:-translate-y-2 transition-transform delay-100">
                            <div className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-2 tracking-tighter">5k+</div>
                            <div className="text-[#D4A853] font-black uppercase text-xs tracking-[0.3em]">{t('stats_members')}</div>
                        </div>
                    </div>
                </div>

                {/* Forum Categories Preview - Premium Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: "🎓", title: "إعداد المعلمين", count: "450+", color: "from-blue-500/20" },
                        { icon: "🧠", title: "علم النفس", count: "320+", color: "from-purple-500/20" },
                        { icon: "🤝", title: "التربية الخاصة", count: "280+", color: "from-green-500/20" }
                    ].map((cat, i) => (
                        <div key={i} className={`forum-card group relative bg-white dark:bg-white/5 p-10 rounded-[3rem] border border-slate-200 dark:border-white/5 shadow-2xl dark:shadow-none transition-all duration-700 hover:border-[#D4A853]/40 perspective-1000 overflow-hidden`}>
                            <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${cat.color} to-transparent rounded-full -mr-20 -mt-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
                            
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="text-7xl mb-8 group-hover:scale-125 group-hover:rotate-6 transition-transform duration-700 origin-bottom-right">{cat.icon}</div>
                                <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-6 group-hover:text-[#D4A853] transition-colors leading-tight">{cat.title}</h3>
                                
                                <div className="mt-auto flex items-center justify-between border-t border-slate-100 dark:border-white/5 pt-6">
                                    <div className="flex flex-col">
                                        <span className="text-slate-400 dark:text-white/20 text-[10px] font-black uppercase tracking-widest">{t('stats_posts')}</span>
                                        <span className="text-slate-900 dark:text-white font-black text-xl">{cat.count}</span>
                                    </div>
                                    <Link 
                                        href="/forum" 
                                        className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-900 dark:text-white group-hover:bg-[#D4A853] group-hover:text-[#0F172A] group-hover:shadow-lg group-hover:shadow-[#D4A853]/40 group-hover:border-transparent transition-all duration-500"
                                    >
                                        <svg className="w-6 h-6 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <Link 
                        href="/forum" 
                        className="group relative inline-flex items-center gap-4 px-12 py-6 bg-[#D4A853] text-[#0F172A] font-black rounded-3xl shadow-[0_20px_50px_-10px_rgba(212,168,83,0.4)] hover:shadow-[0_25px_60px_-10px_rgba(212,168,83,0.6)] hover:-translate-y-2 transition-all active:scale-95 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        <span className="text-lg md:text-xl relative z-10">{t('nav_all')}</span>
                        <svg className="w-6 h-6 rtl:rotate-180 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
