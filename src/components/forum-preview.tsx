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
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="forum" ref={containerRef} className="section-padding bg-[#0F172A] relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-[#D4A853]/5 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[100px]"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-16">
                    <div className="max-w-2xl rtl:text-right ltr:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-xl">
                            <span className="w-2 h-2 rounded-full bg-[#D4A853]"></span>
                            <span className="text-xs font-bold uppercase tracking-widest text-[#D4A853]">{t('badge')}</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                            {t('title1')} <span className="text-[#D4A853]">{t('title_hl')}</span> {t('title2')}
                        </h2>
                        <p className="text-white/60 text-lg md:text-xl leading-relaxed">
                            {t('subtitle')}
                        </p>
                    </div>

                    <div className="flex gap-8 md:gap-16">
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-black text-white mb-2">1.2k+</div>
                            <div className="text-[#D4A853] font-bold uppercase text-sm tracking-widest">{t('stats_posts')}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-black text-white mb-2">5k+</div>
                            <div className="text-[#D4A853] font-bold uppercase text-sm tracking-widest">{t('stats_members')}</div>
                        </div>
                    </div>
                </div>

                {/* Forum Categories Preview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { icon: "🎓", title: "إعداد المعلمين", count: "450+" },
                        { icon: "🧠", title: "علم النفس", count: "320+" },
                        { icon: "🤝", title: "التربية الخاصة", count: "280+" }
                    ].map((cat, i) => (
                        <div key={i} className="forum-card premium-glass p-8 rounded-[2.5rem] group hover:bg-[#D4A853]/10 transition-all duration-500 border border-white/5 hover:border-[#D4A853]/30">
                            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-500 block">{cat.icon}</div>
                            <h3 className="text-2xl font-black text-white mb-4 group-hover:text-[#D4A853] transition-colors">{cat.title}</h3>
                            <div className="flex items-center justify-between">
                                <span className="text-white/40 font-bold">{cat.count} {t('stats_posts')}</span>
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:bg-[#D4A853] group-hover:text-[#0F172A] transition-all">
                                    <svg className="w-5 h-5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Link 
                        href="/forum" 
                        className="inline-flex items-center gap-3 px-10 py-5 bg-[#D4A853] text-[#0F172A] font-black rounded-2xl shadow-[0_15px_40px_-10px_rgba(212,168,83,0.4)] hover:shadow-[0_20px_50px_-10px_rgba(212,168,83,0.6)] hover:-translate-y-1 transition-all active:scale-95"
                    >
                        {t('nav_all')}
                        <svg className="w-5 h-5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
