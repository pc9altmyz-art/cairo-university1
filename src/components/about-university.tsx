"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TiltCard } from "@/components/ui/tilt-card";
import { useTranslations } from "next-intl";

export default function AboutUniversity() {
    const t = useTranslations('AboutUniversity');
    const sectionRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            gsap.fromTo(imageRef.current,
                { opacity: 0, x: 50, rotateY: 15 },
                {
                    opacity: 1, x: 0, rotateY: 0,
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                    }
                }
            );

            gsap.fromTo(contentRef.current?.children || [],
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 60%",
                    }
                }
            );

            gsap.fromTo(statsRef.current?.children || [],
                { opacity: 0, scale: 0.8 },
                {
                    opacity: 1, scale: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "back.out(1.5)",
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
        <section ref={sectionRef} id="about" className="section-padding overflow-hidden relative scroll-mt-28 bg-[#0F172A]">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[#1e3a8a]/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-[#D4A853]/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="relative premium-glass rounded-[2rem] md:rounded-[100px] lg:rounded-[150px] p-6 sm:p-10 md:p-16 lg:p-24 overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.6)]" 
                     style={{ 
                        borderRadius: "clamp(30px, 8vw, 80px) clamp(60px, 20vw, 200px) clamp(40px, 10vw, 100px) clamp(80px, 30vw, 300px)",
                     }}>
                    {/* Background patterns inside the blob */}
                    <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[#1e3a8a]/30 via-transparent to-[#D4A853]/10 pointer-events-none" />
                    
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
                        {/* Signature Logo Card */}
                        <div ref={imageRef} className="relative order-2 lg:order-1 perspective-1000">
                            <TiltCard intensity={5} className="overflow-hidden group">
                                <div className="premium-glass rounded-[40px] p-8 lg:p-12 border-white/20 shadow-2xl">
                                    <div className="aspect-square relative flex items-center justify-center bg-white rounded-[32px] p-8 md:p-10 shadow-inner">
                                        <Image
                                            src="/About.png"
                                            alt="المؤسسة المصرية"
                                            fill
                                            className="object-contain group-hover:scale-110 transition-transform duration-1000 origin-center p-6"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                            </TiltCard>
                            
                            {/* Floating Stats Badge */}
                            <div className="absolute -bottom-6 rtl:right-2 ltr:left-2 sm:-bottom-10 sm:rtl:-right-6 sm:ltr:-left-6 bg-gradient-to-br from-[#D4A853] to-[#B38B3F] text-[#172554] rounded-2xl p-4 sm:p-8 shadow-[0_20px_40px_-10px_rgba(212,168,83,0.5)] border border-white/20 hover:-translate-y-2 transition-transform duration-500 z-10">
                                <div className="text-2xl sm:text-5xl font-black mb-1">{t('badge_year')}</div>
                                <div className="text-[10px] sm:text-base font-bold uppercase tracking-widest opacity-80">{t('badge_est')}</div>
                            </div>
                        </div>

                        {/* Content */}
                        <div ref={contentRef} className="order-1 lg:order-2">
                            <div className="inline-flex items-center gap-2 md:gap-3 rounded-full px-4 md:px-6 py-2 md:py-3 mb-6 md:mb-8 premium-glass border-white/10">
                                <span className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-[#D4A853] animate-pulse" />
                                <span className="text-[#D4A853] text-[10px] md:text-sm font-black tracking-widest uppercase">{t('badge_heritage')}</span>
                            </div>
                            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 md:mb-10 leading-tight text-white drop-shadow-lg rtl:text-right ltr:text-left">
                                {t('title1')} <br />
                                <span className="text-gradient-gold drop-shadow-[0_0_30px_rgba(212,168,83,0.3)]">{t('title_hl')}</span>
                            </h2>

                            <div className="space-y-6 md:space-y-8 text-base md:text-xl leading-relaxed mb-10 md:mb-14 font-medium text-white/90">
                                <p className="ltr:border-l-2 rtl:border-r-2 border-[#D4A853] ltr:pl-5 md:pl-6 rtl:pr-5 md:pr-6 py-1 md:py-2">
                                    {t('desc1')}
                                </p>
                                <p className="opacity-70 ltr:pl-5 md:pl-6 rtl:pr-5 md:pr-6 rtl:text-right ltr:text-left text-sm md:text-lg">
                                    {t('desc2')}
                                </p>

                                {/* Founder Card */}
                                <div className="mt-8 md:mt-12 p-5 md:p-6 rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 backdrop-blur-md flex items-center gap-5 md:gap-6 group hover:border-[#D4A853]/50 transition-all duration-500 overflow-hidden relative">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4A853]/10 blur-3xl -mr-16 -mt-16 group-hover:bg-[#D4A853]/20 transition-colors" />
                                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#D4A853] flex items-center justify-center text-[#172554] shadow-lg shadow-[#D4A853]/20 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                                        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[#D4A853] text-[10px] md:text-xs font-black uppercase tracking-widest mb-1 opacity-80">{t('founder_role')}</span>
                                        <span className="text-lg md:text-2xl font-black text-white tracking-wide group-hover:text-[#D4A853] transition-colors">{t('founder_name')}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Enhanced Stats Grid */}
                            <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                                {[
                                    { val: "+50", lab: t('stat1') },
                                    { val: "+10K", lab: t('stat2') },
                                    { val: "#1", lab: t('stat3') }
                                ].map((stat, idx) => (
                                    <div key={idx} className="premium-glass rounded-2xl md:rounded-3xl p-4 md:p-6 text-center transition-all duration-500 hover:bg-white/10 hover:-translate-y-4 hover:scale-110 hover:shadow-[0_20px_40px_-10px_rgba(212,168,83,0.2)] border border-white/5 hover:border-[#D4A853]/30 shadow-lg group">
                                        <div className="text-xl md:text-3xl lg:text-4xl font-black text-[#D4A853] mb-1 md:mb-2">{stat.val}</div>
                                        <div className="text-[9px] md:text-xs font-bold uppercase tracking-widest text-white/50">{stat.lab}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
