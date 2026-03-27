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
        <section ref={sectionRef} id="about" className="py-24 sm:py-32 overflow-hidden relative scroll-mt-28 bg-white dark:bg-[#0F172A]">
            <div className="container mx-auto px-4 relative z-10">
                <div className="relative bg-[#0F172A] rounded-[40px] md:rounded-[100px] lg:rounded-[150px] p-8 md:p-16 lg:p-24 overflow-hidden shadow-2xl" 
                     style={{ 
                        borderRadius: "50px 150px 80px 200px",
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                     }}>
                    {/* Background patterns inside the blob */}
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#D4A853 1.5px, transparent 1.5px)', backgroundSize: '30px 30px' }} />
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[#1e3a8a]/20 via-transparent to-[#D4A853]/5 pointer-events-none" />
                    
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
                        {/* Image / Logo */}
                        <div ref={imageRef} className="relative order-2 lg:order-1 perspective-1000">
                            <TiltCard intensity={5} className="overflow-hidden group">
                                <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-4 border border-white/10">
                                    <div className="aspect-square relative pointer-events-none p-8 bg-white rounded-2xl shadow-inner">
                                        <Image
                                            src="/logo/logo-1.png"
                                            alt="المؤسسة المصرية للاستشارات العلمية والتربوية"
                                            fill
                                            className="object-contain group-hover:scale-105 transition-transform duration-1000 origin-center p-4"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                            </TiltCard>
                            <div className="absolute -bottom-6 rtl:right-8 ltr:left-8 sm:-bottom-10 sm:rtl:-right-10 sm:ltr:-left-10 bg-gradient-to-br from-[#D4A853] to-[#B38B3F] text-[#172554] rounded-2xl p-6 sm:p-8 shadow-2xl shadow-[#D4A853]/20 border border-white/20 hover:-translate-y-2 transition-transform duration-500 z-10">
                                <div className="text-4xl sm:text-5xl font-black mb-1">2015</div>
                                <div className="text-sm sm:text-base font-bold uppercase tracking-widest opacity-80">{t('badge_est')}</div>
                            </div>
                        </div>

                        {/* Content */}
                        <div ref={contentRef} className="order-1 lg:order-2">
                            <div className="inline-flex items-center gap-3 rounded-full px-5 py-2 mb-6 backdrop-blur-md bg-white/5 border border-white/10">
                                <span className="w-2 h-2 rounded-full bg-[#D4A853] animate-pulse" />
                                <span className="text-[#D4A853] text-sm font-bold tracking-widest uppercase">{t('badge_heritage')}</span>
                            </div>
                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-8 leading-tight text-white">
                                {t('title1')} <span className="text-gradient-gold">{t('title_hl')}</span>
                            </h2>

                            <div className="space-y-6 text-lg leading-relaxed mb-12 font-medium text-white/80">
                                <p>
                                    {t('desc1')}
                                </p>
                                <p className="opacity-80">
                                    {t('desc2')}
                                </p>
                            </div>

                            {/* Stats */}
                            <div ref={statsRef} className="grid grid-cols-3 gap-4 sm:gap-6">
                                <div className="backdrop-blur-sm rounded-2xl p-5 text-center transition-colors bg-white/5 border border-white/10">
                                    <div className="text-2xl sm:text-4xl font-black text-[#D4A853] mb-2">+50</div>
                                    <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white/60">{t('stat1')}</div>
                                </div>
                                <div className="backdrop-blur-sm rounded-2xl p-5 text-center transition-colors bg-white/5 border border-white/10">
                                    <div className="text-2xl sm:text-4xl font-black text-[#D4A853] mb-2">+10K</div>
                                    <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white/60">{t('stat2')}</div>
                                </div>
                                <div className="backdrop-blur-sm rounded-2xl p-5 text-center transition-colors bg-white/5 border border-white/10">
                                    <div className="text-2xl sm:text-4xl font-black text-[#D4A853] mb-2">#1</div>
                                    <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white/60">{t('stat3')}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
