"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);



export default function HowItWorks() {
    const t = useTranslations('HowItWorks');

    const steps = [
        {
            number: "01",
            title: t('step1_title'),
            description: t('step1_desc'),
        },
        {
            number: "02",
            title: t('step2_title'),
            description: t('step2_desc'),
        },
        {
            number: "03",
            title: t('step3_title'),
            description: t('step3_desc'),
        },
        {
            number: "04",
            title: t('step4_title'),
            description: t('step4_desc'),
        },
    ];

    const containerRef = useRef<HTMLDivElement>(null);
    const stepsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Steps entrance animation
            gsap.fromTo(stepsRef.current?.children || [],
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: stepsRef.current,
                        start: "top 80%",
                    }
                }
            );

            // Desktop connector line animation
            if (window.innerWidth >= 1024) {
                gsap.fromTo(".connector-line",
                    { scaleX: 0 },
                    {
                        scaleX: 1,
                        duration: 1.5,
                        stagger: 0.3,
                        ease: "power2.inOut",
                        scrollTrigger: {
                            trigger: stepsRef.current,
                            start: "top 60%",
                        }
                    }
                );
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="how-it-works" ref={containerRef} className="py-32 bg-[#0F172A] relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none">
                <svg width="100%" height="100%">
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-24">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#D4A853] text-sm font-bold uppercase tracking-[0.2em] mb-4">
                        {t('badge')}
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black mb-6 text-white leading-tight">
                        {t('title1')} <span className="text-gradient-gold">{t('title_hl')} </span>
                        {t('title2')}
                    </h2>
                    <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Steps */}
                <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 xl:gap-6">
                    {steps.map((step, index) => (
                        <div key={index} className="relative group">
                            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 h-full border border-white/10 shadow-sm transition-all duration-500 hover:bg-white/10 group-hover:shadow-[0_30px_60px_-15px_rgba(212,168,83,0.15)] group-hover:-translate-y-2 relative z-10">
                                <div className="text-7xl font-black text-white/5 absolute top-4 start-4 transition-colors group-hover:text-white/10 select-none leading-none">
                                    {step.number}
                                </div>
                                <div className="relative">
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl mb-5 group-hover:bg-gradient-to-br group-hover:from-[#D4A853] group-hover:to-[#9B7B34] transition-all duration-500 group-hover:scale-110 shadow-lg">
                                        {index === 0 && "🎓"}
                                        {index === 1 && "📝"}
                                        {index === 2 && "💳"}
                                        {index === 3 && "🚀"}
                                    </div>
                                    <h3 className="text-lg font-black text-white mb-3 group-hover:text-[#D4A853] transition-colors leading-snug">
                                        {step.title}
                                    </h3>
                                    <p className="text-slate-400 leading-relaxed text-sm">
                                        {step.description}
                                    </p>
                                </div>
                            </div>

                            {/* Connector line for desktop */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-[2.75rem] start-[calc(100%-1.5rem)] w-[calc(100%-3rem)] h-[2px] bg-white/5 z-0 rounded-full overflow-hidden">
                                    <div className="w-full h-full bg-gradient-to-r from-[#D4A853]/50 to-[#D4A853] origin-left scale-x-0 connector-line shadow-[0_0_15px_rgba(212,168,83,0.8)]" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
