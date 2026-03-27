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
        <section ref={sectionRef} id="about" className="py-24 sm:py-32 overflow-hidden relative scroll-mt-28 bg-[#0F172A]">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[#1e3a8a]/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-[#D4A853]/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="relative premium-glass rounded-[40px] md:rounded-[100px] lg:rounded-[150px] p-8 md:p-16 lg:p-24 overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.6)]" 
                     style={{ 
                        borderRadius: "80px 200px 100px 300px",
                     }}>
                    {/* Background patterns inside the blob */}
                    <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[#1e3a8a]/30 via-transparent to-[#D4A853]/10 pointer-events-none" />
                    
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
                        {/* Signature Logo Card */}
                        <div ref={imageRef} className="relative order-2 lg:order-1 perspective-1000">
                            <TiltCard intensity={5} className="overflow-hidden group">
                                <div className="premium-glass rounded-[40px] p-8 lg:p-12 border-white/20 shadow-2xl">
                                    <div className="aspect-square relative flex items-center justify-center bg-white rounded-[32px] p-10 shadow-inner">
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
                            <div className="absolute -bottom-6 rtl:right-8 ltr:left-8 sm:-bottom-10 sm:rtl:-right-10 sm:ltr:-left-10 bg-gradient-to-br from-[#D4A853] to-[#B38B3F] text-[#172554] rounded-2xl p-6 sm:p-8 shadow-[0_20px_40px_-10px_rgba(212,168,83,0.5)] border border-white/20 hover:-translate-y-2 transition-transform duration-500 z-10">
                                <div className="text-4xl sm:text-5xl font-black mb-1">2015</div>
                                <div className="text-sm sm:text-base font-bold uppercase tracking-widest opacity-80">{t('badge_est')}</div>
                            </div>
                        </div>

                        {/* Content */}
                        <div ref={contentRef} className="order-1 lg:order-2">
                            <div className="inline-flex items-center gap-3 rounded-full px-6 py-3 mb-8 premium-glass border-white/10">
                                <span className="w-2 h-2 rounded-full bg-[#D4A853] animate-pulse" />
                                <span className="text-[#D4A853] text-sm font-black tracking-widest uppercase">{t('badge_heritage')}</span>
                            </div>
                            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-10 leading-tight text-white drop-shadow-lg">
                                {t('title1')} <br />
                                <span className="text-gradient-gold drop-shadow-[0_0_30px_rgba(212,168,83,0.3)]">{t('title_hl')}</span>
                            </h2>

                            <div className="space-y-8 text-xl leading-relaxed mb-14 font-medium text-white/90">
                                <p className="ltr:border-l-2 rtl:border-r-2 border-[#D4A853] ltr:pl-6 rtl:pr-6 py-2">
                                    {t('desc1')}
                                </p>
                                <p className="opacity-70 ltr:pl-6 rtl:pr-6">
                                    {t('desc2')}
                                </p>
                            </div>

                            {/* Enhanced Stats Grid */}
                            <div ref={statsRef} className="grid grid-cols-3 gap-4 sm:gap-6">
                                {[
                                    { val: "+50", lab: t('stat1') },
                                    { val: "+10K", lab: t('stat2') },
                                    { val: "#1", lab: t('stat3') }
                                ].map((stat, idx) => (
                                    <div key={idx} className="premium-glass rounded-3xl p-6 text-center transition-all hover:bg-white/10 hover:-translate-y-2 border-white/5 shadow-lg">
                                        <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#D4A853] mb-2">{stat.val}</div>
                                        <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/50">{stat.lab}</div>
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
