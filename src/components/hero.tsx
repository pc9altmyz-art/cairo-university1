"use client";

import { Link } from "@/i18n/routing";
import { useEffect, useRef, memo, useState } from "react";
import { gsap } from "gsap";
import { useTranslations } from "next-intl";

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
        <section ref={heroRef} className="min-h-[90vh] relative flex items-center pt-32 pb-20 overflow-hidden">
            {/* Ramadan floating stars decoration */}
            <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
                {[
                    { top: '12%', left: '8%',  size: 18, delay: '0s',    dur: '6s',  symbol: '✦' },
                    { top: '25%', right: '10%', size: 14, delay: '1.5s',  dur: '7s',  symbol: '🌙' },
                    { top: '60%', left: '5%',  size: 16, delay: '0.8s',  dur: '8s',  symbol: '✦' },
                    { top: '15%', right: '22%', size: 12, delay: '2.2s',  dur: '5s',  symbol: '✦' },
                    { top: '70%', right: '7%',  size: 20, delay: '3s',    dur: '9s',  symbol: '⭐' },
                    { top: '40%', left: '12%', size: 13, delay: '1s',    dur: '6.5s',symbol: '✦' },
                ].map((star, i) => (
                    <span
                        key={i}
                        style={{
                            position: 'absolute',
                            top: star.top,
                            ...(star.left ? { left: star.left } : { right: (star as { right?: string }).right }),
                            fontSize: star.size,
                            color: '#D4A853',
                            opacity: 0,
                            animationName: 'ramadanFloat',
                            animationDuration: star.dur,
                            animationDelay: star.delay,
                            animationTimingFunction: 'ease-in-out',
                            animationIterationCount: 'infinite',
                            animationFillMode: 'forwards',
                        }}
                    >
                        {star.symbol}
                    </span>
                ))}
                <style>{`
                    @keyframes ramadanFloat {
                        0%   { opacity: 0;    transform: translateY(0px)   rotate(0deg);   }
                        25%  { opacity: 0.45; }
                        50%  { opacity: 0.3;  transform: translateY(-14px) rotate(8deg);  }
                        75%  { opacity: 0.45; }
                        100% { opacity: 0;    transform: translateY(0px)   rotate(0deg);  }
                    }
                `}</style>
            </div>
            {/* Video Background with Multi-layer Overlay */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    poster="/background.jpg"
                    className="w-full h-full object-cover scale-105"
                >
                    <source src="/Video%20Project.mp4" type="video/mp4" />
                </video>
                {/* Dynamic Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#1A0B0E]/95 via-[#3D1118]/80 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-80"></div>

                {/* Subtle light effect */}
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#D4A853]/20 rounded-full blur-[120px] animate-pulse"></div>
            </div>

            <div className="container mx-auto relative z-10 px-4 md:px-8 mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="rtl:text-right ltr:text-left rtl:ml-auto ltr:mr-auto w-full">
                        {/* Badge */}
                        <div ref={badgeRef} className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-2xl rounded-full px-6 py-3 mb-10 border border-white/10 shadow-[0_8px_32px_rgba(255,255,255,0.05)] group cursor-default animate-float opacity-0 overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4A853] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D4A853]"></span>
                            </span>
                            <span className="text-sm font-bold text-white tracking-widest uppercase">{t('badge')}</span>
                        </div>

                        {/* Title with Gradient */}
                        <h1 ref={titleRef} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[90px] font-black leading-[1.05] mb-8 text-white drop-shadow-2xl opacity-0">
                            {t('title1')} <br />
                            <span className="text-gradient-gold drop-shadow-[0_0_30px_rgba(212,168,83,0.3)]">{t('title2')}</span>
                        </h1>

                        {/* Subtitle */}
                        <p ref={subtitleRef} className="text-xl sm:text-2xl text-white/90 max-w-2xl mb-12 leading-relaxed font-medium opacity-0">
                            {t('subtitle1')}
                            <span className="block mt-2 text-gold-light/90">{t('subtitle2')}</span>
                        </p>

                        {/* CTAs */}
                        <div ref={ctasRef} className="flex flex-wrap gap-4 justify-start mb-16">
                            <Link
                                href="/programs"
                                className="group relative overflow-hidden bg-[#D4A853] text-[#3D1118] px-8 py-4 rounded-2xl font-black text-lg hover:bg-white transition-all shadow-[0_20px_40px_-10px_rgba(212,168,83,0.4)] hover:-translate-y-1 flex items-center gap-3"
                            >
                                <span>{t('btn_explore')}</span>
                                <svg className="w-5 h-5 transform rtl:rotate-0 rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7-7 7" />
                                </svg>
                            </Link>
                            <Link
                                href="/#about"
                                className="relative overflow-hidden group text-white px-8 py-4 rounded-2xl font-black text-lg transition-all border border-white/20 hover:border-white shadow-[0_8px_32px_rgba(255,255,255,0.05)] hover:shadow-[0_8px_32px_rgba(255,255,255,0.15)] bg-white/5 backdrop-blur-xl"
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

                    {/* Left/Right Side Video (Changes naturally with RTL/LTR) - Made smaller and sleeker */}
                    <div ref={sideVideoRef} className="opacity-0 w-[450px] mx-auto lg:h-[700px] hidden md:block">
                        <div className="relative w-full h-full rounded-[40px] overflow-hidden shadow-2xl shadow-[#1A0B0E]/80 border-[6px] border-white/10 backdrop-blur-md transform transition-transform hover:scale-105 duration-700 bg-black/40">
                            {/* Inner glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-white/10 z-10 mix-blend-overlay"></div>

                            {/* Modern decorative framing */}
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-white/30 rounded-full z-20 backdrop-blur-md"></div>

                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover scale-105"
                            >
                                <source src="/hero-mobile-video.mp4" type="video/mp4" />
                            </video>

                            {/* Floating decorative elements */}
                            <div className="absolute bottom-6 right-6 z-20 w-12 h-12 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 shadow-lg shadow-black/50">
                                <div className="w-4 h-4 rounded-full bg-red-500 animate-pulse"></div>
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
        </section>
    );
}
