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
        <section id="how-it-works" ref={containerRef} className="section-padding relative overflow-hidden scroll-mt-28" style={{ background: 'var(--dark-section-bg)' }}>
            {/* Top gentle fade — continuation from About section */}
            <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-[#0F172A]/80 to-transparent pointer-events-none" />
            {/* Bottom fade to white — transition to Certificates section */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-white/10 pointer-events-none" />
            {/* Gold separator at bottom */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#D4A853]/30 to-transparent" />
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
                <div className="text-center mb-16 md:mb-24">
                    <div className="inline-block px-4 py-1.5 rounded-full text-[#D4A853] text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-4" style={{ background: 'var(--dark-section-card-bg)', border: '1px solid var(--dark-section-border)' }}>
                        {t('badge')}
                    </div>
                    <h2 className="text-3xl md:text-6xl font-black mb-4 md:mb-6 leading-tight" style={{ color: 'var(--dark-section-text)' }}>
                        {t('title1')} <span className="text-gradient-gold">{t('title_hl')} </span>
                        {t('title2')}
                    </h2>
                    <p className="text-base md:text-xl max-w-2xl mx-auto leading-relaxed px-2" style={{ color: 'var(--dark-section-text-muted)' }}>
                        {t('subtitle')}
                    </p>
                </div>

                {/* Steps */}
                <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 lg:gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="relative group perspective-1000">
                            <div className="backdrop-blur-xl rounded-[2.5rem] p-5 md:p-10 h-full shadow-sm transition-all duration-500 group-hover:shadow-[0_30px_60px_-15px_rgba(212,168,83,0.15)] group-hover:-translate-y-2 relative z-10" style={{ background: 'var(--dark-section-card-bg)', border: '1px solid var(--dark-section-border)' }}>
                                <div className="text-5xl md:text-8xl font-black absolute top-4 md:top-6 start-4 md:start-6 select-none leading-none opacity-[0.05] group-hover:opacity-[0.1] transition-opacity" style={{ color: 'var(--dark-section-text)' }}>
                                    {step.number}
                                </div>
                                <div className="relative">
                                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-xl md:text-2xl mb-5 md:mb-8 group-hover:bg-gradient-to-br group-hover:from-[#D4A853] group-hover:to-[#9B7B34] group-hover:text-[#172554] transition-all duration-500 group-hover:scale-110 shadow-lg" style={{ background: 'var(--dark-section-card-bg)', border: '1px solid var(--dark-section-border)' }}>
                                        {index === 0 && "🎓"}
                                        {index === 1 && "📝"}
                                        {index === 2 && "💳"}
                                        {index === 3 && "🚀"}
                                    </div>
                                    <h3 className="text-lg md:text-2xl font-black mb-2 md:mb-4 group-hover:text-[#D4A853] transition-colors" style={{ color: 'var(--dark-section-text)' }}>
                                        {step.title}
                                    </h3>
                                    <p className="leading-relaxed text-xs md:text-lg opacity-80" style={{ color: 'var(--dark-section-text-muted)' }}>
                                        {step.description}
                                    </p>
                                </div>
                            </div>

                            {/* Connector line for desktop */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-[3.5rem] start-[calc(100%-2rem)] w-[calc(100%-4rem)] h-1 z-0 rounded-full overflow-hidden" style={{ background: 'var(--dark-section-border)' }}>
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
