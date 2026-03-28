"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useEffect, useRef, memo, useState } from "react";
import { gsap } from "gsap";
import { useTranslations } from "next-intl";
import { useStarBurst } from "@/hooks/use-star-burst";

const AnimatedCounter = memo(function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const countRef = useRef<HTMLSpanElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    let startTimestamp: number | null = null;
                    const duration = 2000; // 2 seconds

                    const step = (timestamp: number) => {
                        if (!startTimestamp) startTimestamp = timestamp;
                        const progress = Math.min((timestamp - startTimestamp) / duration, 1);

                        // Ease out quart
                        const easeProgress = 1 - Math.pow(1 - progress, 4);

                        setCount(Math.floor(easeProgress * end));

                        if (progress < 1) {
                            window.requestAnimationFrame(step);
                        }
                    };

                    window.requestAnimationFrame(step);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => observer.disconnect();
    }, [end]);

    return <span ref={countRef}>{count.toLocaleString()}{suffix}</span>;
});

export default function Hero() {
    const t = useTranslations('Hero');
    const heroRef = useRef<HTMLDivElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const ctasRef = useRef<HTMLDivElement>(null);
    const starBurst = useStarBurst();
    const statsRef = useRef<HTMLDivElement>(null);
    const sideVideoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Added modern clip-path reveals where possible
            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

            tl.fromTo(badgeRef.current,
                { opacity: 0, y: 30, scale: 0.9, filter: "blur(10px)" },
                { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.2, delay: 0.5 }
            )
                .fromTo(titleRef.current,
                    { opacity: 0, y: 60, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
                    { opacity: 1, y: 0, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 1.5 }, "-=0.8"
                )
                .fromTo(subtitleRef.current,
                    { opacity: 0, y: 40, clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)" },
                    { opacity: 1, y: 0, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 1.2 }, "-=1"
                )
                .fromTo(ctasRef.current?.children || [],
                    { opacity: 0, y: 30, scale: 0.95 },
                    { opacity: 1, y: 0, scale: 1, duration: 1, stagger: 0.15 }, "-=0.8"
                )
                .fromTo(statsRef.current,
                    { opacity: 0, scaleX: 0, transformOrigin: "right" },
                    { opacity: 1, scaleX: 1, duration: 1.5, ease: "expo.out" }, "-=1"
                )
                .fromTo(sideVideoRef.current,
                    { opacity: 0, x: 50, scale: 0.95 },
                    { opacity: 1, x: 0, scale: 1, duration: 1.5 }, "-=1.2"
                );
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className="min-h-[85vh] md:min-h-[90vh] relative flex items-center section-padding overflow-hidden bg-[#0F172A] pb-16 md:pb-24">
            {/* User-provided background image with premium overlays */}
            <div className="absolute inset-0 z-0">
                <div className="relative w-full h-full overflow-hidden">
                    <img 
                        src="/background1.png" 
                        alt="Background" 
                        className="w-full h-full object-cover scale-105"
                    />
                    
                    {/* Animated Blobs for depth */}
                    <div className="absolute top-[-5%] left-[-5%] w-[35%] h-[35%] md:w-[50%] md:h-[50%] bg-[#D4A853]/5 md:bg-[#D4A853]/10 rounded-full blur-[60px] md:blur-[120px] animate-blob"></div>
                    <div className="absolute bottom-[-5%] right-[-5%] w-[35%] h-[35%] md:w-[50%] md:h-[50%] bg-[#1e3a8a]/10 md:bg-[#1e3a8a]/20 rounded-full blur-[60px] md:blur-[120px] animate-blob [animation-delay:2s]"></div>
                    
                    {/* Stardust/Dot Pattern Overlay */}
                    <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>
                    
                    {/* Multi-layer Premium Overlays for readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/70 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-[#0F172A]/30"></div>
                </div>
            </div>

            <div className="container mx-auto relative z-10 px-4 md:px-8 mt-12 md:mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="rtl:text-right ltr:text-left rtl:ml-auto ltr:mr-auto w-full">
                        {/* Badge */}
                        <div ref={badgeRef} className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-2xl rounded-full px-5 py-2.5 mb-8 border border-white/10 shadow-[0_8px_32px_rgba(255,255,255,0.05)] group cursor-default animate-float opacity-0 overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4A853] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D4A853]"></span>
                            </span>
                            <span className="text-[10px] md:text-sm font-bold text-white tracking-widest uppercase">{t('badge')}</span>
                        </div>

                        {/* Title with Gradient and Glimmer Overlay */}
                        <div className="relative group">
                            <h1 ref={titleRef} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[90px] font-black leading-[1.15] md:leading-[1.05] tracking-tighter mb-6 md:mb-8 text-white drop-shadow-2xl opacity-0 relative z-10">
                                {t('title1')} <br />
                                <span className="text-gradient-gold drop-shadow-[0_0_30px_rgba(212,168,83,0.3)]">{t('title2')}</span>
                            </h1>
                            {/* Golden Glimmer Sweep Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4A853]/10 to-transparent -translate-x-full group-hover:animate-glimmer-sweep pointer-events-none" />
                        </div>

                        {/* Subtitle */}
                        <p ref={subtitleRef} className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mb-12 leading-relaxed font-medium opacity-0">
                            {t('subtitle1')}
                            <span className="block mt-2 text-gold-light/90">{t('subtitle2')}</span>
                        </p>

                        {/* CTAs */}
                        <div ref={ctasRef} className="flex flex-wrap gap-4 justify-start mb-16">
                            <Link
                                href="/programs"
                                onClick={(e) => starBurst(e as any)}
                                className="group relative overflow-hidden bg-[#D4A853] text-[#172554] px-8 py-4 rounded-2xl font-black text-lg hover:bg-white transition-all shadow-[0_20px_40px_-10px_rgba(212,168,83,0.4)] flex items-center gap-3 active:scale-95 magnetic-btn"
                            >
                                <span>{t('btn_explore')}</span>
                                <svg className="w-5 h-5 transform rtl:rotate-0 rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7-7 7" />
                                </svg>
                            </Link>
                            <Link
                                href="/#about"
                                onClick={(e) => starBurst(e as any)}
                                className="relative overflow-hidden group text-white px-8 py-4 rounded-2xl font-black text-lg transition-all border border-white/20 hover:border-white shadow-[0_8px_32px_rgba(255,255,255,0.05)] hover:shadow-[0_8px_32px_rgba(255,255,255,0.15)] bg-white/5 backdrop-blur-xl active:scale-95 magnetic-btn"
                            >
                                <div className="absolute inset-0 bg-white/10 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-2xl origin-center" />
                                <span className="relative z-10">{t('btn_about')}</span>
                            </Link>
                        </div>

                        {/* Stats Grid */}
                        <div ref={statsRef} className="flex gap-6 ltr:border-l-4 rtl:border-r-4 border-[#D4A853] rtl:pr-6 ltr:pl-6 opacity-0 w-fit direction-inherit">
                            <div className="space-y-1">
                                <div className="text-3xl sm:text-4xl font-black text-white">
                                    +<AnimatedCounter end={50} />
                                </div>
                                <div className="text-white/60 font-bold uppercase tracking-wider text-xs">{t('stats_programs')}</div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-3xl sm:text-4xl font-black text-white flex items-center gap-2">
                                    +<AnimatedCounter end={100} suffix={t('k_suffix')} />
                                </div>
                                <div className="text-white/60 font-bold uppercase tracking-wider text-xs">{t('stats_graduates')}</div>
                            </div>
                        </div>
                    </div>

                    {/* Signature Logo Card - Replaces Video for and explicit branding */}
                    <div ref={sideVideoRef} className="opacity-0 w-full max-w-[650px] mx-auto hidden lg:block">
                        <div className="relative group perspective-1000">
                            <div className="premium-glass rounded-[40px] p-8 lg:p-12 border-white/20 shadow-glow-gold hover:scale-105 transition-all duration-700">
                                {/* Inner Logo Display */}
                                <div className="aspect-square relative flex items-center justify-center bg-white rounded-[2.5rem] p-8 lg:p-10 shadow-inner">
                                    <Image
                                        src="/About.png"
                                        alt="المؤسسه المصريه"
                                        width={450}
                                        height={450}
                                        className="object-contain animate-float"
                                    />
                                </div>
                                
                                {/* Decorative elements around logo */}
                                <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#D4A853]/20 rounded-full blur-2xl animate-pulse"></div>
                                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#1e3a8a]/20 rounded-full blur-2xl animate-pulse [animation-delay:1s]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-80 backdrop-blur-sm z-20">
                <div className="w-7 h-11 border-2 border-white/30 rounded-full flex justify-center pt-2 bg-black/10">
                    <div className="w-1.5 h-3 bg-[#D4A853] rounded-full shadow-[0_0_10px_#D4A853]"></div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes glimmer-sweep {
                    0% { transform: translateX(-100%) skewX(-15deg); }
                    100% { transform: translateX(200%) skewX(-15deg); }
                }
                @keyframes subtle-zoom {
                    0% { transform: scale(1.05); }
                    100% { transform: scale(1.15); }
                }
                .group-hover\:animate-glimmer-sweep {
                    animation: glimmer-sweep 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
                }
                .animate-subtle-zoom {
                    animation: subtle-zoom 20s ease-in-out infinite alternate;
                }
            `}</style>
        </section>
    );
}
