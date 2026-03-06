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
        <section ref={sectionRef} id="about" className="py-24 sm:py-32 bg-gradient-to-b from-[#0F172A] to-[#1E293B] overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#7C2D36]/10 to-transparent pointer-events-none" />
            <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#D4A853]/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Image */}
                    <div ref={imageRef} className="relative order-2 lg:order-1 perspective-1000">
                        <TiltCard intensity={5} className="soft-card overflow-hidden !bg-white/5 !border-white/10 backdrop-blur-xl group">
                            <div className="aspect-[4/3] relative pointer-events-none">
                                <Image
                                    src="/background.jpg"
                                    alt="جامعة القاهرة"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-1000 origin-center mix-blend-overlay opacity-80"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#3D1118]/80 to-transparent" />
                            </div>
                        </TiltCard>
                        <div className="absolute -bottom-6 rtl:right-8 ltr:left-8 sm:-bottom-10 sm:rtl:-right-10 sm:ltr:-left-10 bg-gradient-to-br from-[#D4A853] to-[#B38B3F] text-[#3D1118] rounded-2xl p-6 sm:p-8 shadow-2xl shadow-[#D4A853]/20 border border-white/20 hover:-translate-y-2 transition-transform duration-500 z-10">
                            <div className="text-4xl sm:text-5xl font-black mb-1">{t('badge_year')}</div>
                            <div className="text-sm sm:text-base font-bold uppercase tracking-widest opacity-80">{t('badge_est')}</div>
                        </div>
                    </div>

                    {/* Content */}
                    <div ref={contentRef} className="order-1 lg:order-2">
                        <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-6 backdrop-blur-md">
                            <span className="w-2 h-2 rounded-full bg-[#D4A853] animate-pulse" />
                            <span className="text-[#D4A853] text-sm font-bold tracking-widest uppercase">{t('badge_heritage')}</span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-8 text-white leading-tight">
                            {t('title1')} <span className="text-gradient-gold">{t('title_hl')}</span>
                        </h2>

                        <div className="space-y-6 text-slate-300 text-lg leading-relaxed mb-12 font-medium">
                            <p>
                                {t('desc1')}
                            </p>
                            <p className="opacity-80">
                                {t('desc2')}
                            </p>
                        </div>

                        {/* Stats */}
                        <div ref={statsRef} className="grid grid-cols-3 gap-4 sm:gap-6">
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition-colors">
                                <div className="text-2xl sm:text-4xl font-black text-[#D4A853] mb-2">+25</div>
                                <div className="text-xs sm:text-sm text-slate-400 font-bold uppercase tracking-wider">{t('stat1')}</div>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition-colors">
                                <div className="text-2xl sm:text-4xl font-black text-[#D4A853] mb-2">+200K</div>
                                <div className="text-xs sm:text-sm text-slate-400 font-bold uppercase tracking-wider">{t('stat2')}</div>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition-colors">
                                <div className="text-2xl sm:text-4xl font-black text-[#D4A853] mb-2">#1</div>
                                <div className="text-xs sm:text-sm text-slate-400 font-bold uppercase tracking-wider">{t('stat3')}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
