"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function BlogHero() {
    const t = useTranslations('Blog');
    const heroRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(contentRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
            );
        });
        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className="relative pt-32 pb-20 overflow-hidden bg-[#F8FAFC] dark:bg-[#0F172A]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#D4A853]/5 blur-[150px] rounded-full animate-pulse delay-1000" />
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <div ref={contentRef}>
                    <div className="inline-flex items-center gap-2 bg-white/50 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 px-6 py-2 rounded-2xl mb-8 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-[#D4A853] animate-ping" />
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-[#1e3a8a] dark:text-[#D4A853]">
                            {t('badge')}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
                        {t('title1')} <span className="text-[#1e3a8a] dark:text-[#D4A853]">{t('title_hl')}</span>
                    </h1>
                    
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed mb-10">
                        {t('subtitle')}
                    </p>

                </div>
            </div>
        </section>
    );
}
