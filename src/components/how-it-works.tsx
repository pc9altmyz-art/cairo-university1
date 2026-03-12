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
        <section id="how-it-works" ref={containerRef} className="py-32 bg-[#0A0204] relative overflow-hidden scroll-mt-28">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#D4A853 0.8px, transparent 0.8px)', backgroundSize: '40px 40px' }} />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#7C2D36]/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-24">
                    <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-6 py-2.5 mb-8 backdrop-blur-2xl">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#D4A853] animate-pulse shadow-[0_0_12px_#D4A853]" />
                        <span className="text-[#D4A853] text-xs font-black tracking-[0.4em] uppercase">{t('badge')}</span>
                    </div>
                    <h2 className="text-4xl md:text-7xl font-black mb-8 text-white tracking-tighter leading-none">
                        {t('title1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A853] via-[#ECD2A2] to-[#B8860B]">{t('title_hl')} </span>
                        {t('title2')}
                    </h2>
                    <p className="text-white/40 text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Interactive Steps */}
                <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10 perspective-3000">
                    {steps.map((step, index) => (
                        <div key={index} className="relative group/step">
                            <div className="bg-[#0D0405]/80 backdrop-blur-3xl rounded-[3rem] p-12 h-full border border-white/5 transition-all duration-700 hover:border-[#D4A853]/30 hover:bg-[#0A0204] shadow-[0_30px_60px_rgba(0,0,0,0.5)] group-hover/step:-translate-y-4 relative z-10 overflow-hidden">
                                {/* Large Shadow Number */}
                                <div className="text-[10rem] font-black text-[#D4A853]/5 absolute -top-8 -start-10 transition-all duration-700 group-hover/step:text-[#D4A853]/10 select-none leading-none -rotate-12 transform-gpu">
                                    {step.number}
                                </div>
                                
                                <div className="relative">
                                    {/* Icon with Glowing Orbit */}
                                    <div className="relative w-20 h-20 mb-10 group/icon">
                                        <div className="absolute inset-0 bg-[#D4A853]/20 rounded-2xl blur-xl opacity-0 group-hover/step:opacity-100 transition-opacity duration-700" />
                                        <div className="relative w-full h-full rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-4xl group-hover/step:bg-gradient-to-br group-hover/step:from-[#D4A853] group-hover/step:to-[#B8860B] group-hover/step:text-[#3D1118] transition-all duration-700 group-hover/step:rotate-[360deg] shadow-[inner_0_2px_10px_rgba(255,255,255,0.05)]">
                                            {index === 0 && "🎓"}
                                            {index === 1 && "📝"}
                                            {index === 2 && "💳"}
                                            {index === 3 && "🚀"}
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-black text-white mb-6 group-hover/step:text-[#D4A853] transition-colors tracking-tight leading-tight">
                                        {step.title}
                                    </h3>
                                    <p className="text-white/40 leading-relaxed text-base font-medium group-hover/step:text-white/60 transition-colors">
                                        {step.description}
                                    </p>
                                </div>

                                {/* Luxury corner detail */}
                                <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-br from-transparent to-[#D4A853]/10 rounded-tl-[3rem] opacity-0 group-hover/step:opacity-100 transition-opacity" />
                            </div>

                            {/* Neon Connector line for desktop */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-[4rem] start-[calc(100%-1rem)] w-[calc(100%-2rem)] h-[2px] bg-white/5 z-0 rounded-full overflow-hidden">
                                    <div className="w-full h-full bg-gradient-to-r from-[#D4A853] to-transparent origin-left scale-x-0 connector-line shadow-[0_0_20px_#D4A853]" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
