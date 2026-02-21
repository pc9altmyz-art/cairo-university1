"use client";

import Link from "next/link";
import { useEffect, useRef, memo, useState } from "react";
import { gsap } from "gsap";

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
    const heroRef = useRef<HTMLDivElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const ctasRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

            tl.fromTo(badgeRef.current,
                { opacity: 0, y: 30, scale: 0.9 },
                { opacity: 1, y: 0, scale: 1, duration: 1.2, delay: 0.5 }
            )
                .fromTo(titleRef.current,
                    { opacity: 0, x: 50 },
                    { opacity: 1, x: 0, duration: 1.5 }, "-=0.8"
                )
                .fromTo(subtitleRef.current,
                    { opacity: 0, x: 30 },
                    { opacity: 1, x: 0, duration: 1.2 }, "-=1"
                )
                .fromTo(ctasRef.current?.children || [],
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 }, "-=0.8"
                )
                .fromTo(statsRef.current,
                    { opacity: 0, scaleX: 0, transformOrigin: "right" },
                    { opacity: 1, scaleX: 1, duration: 1.5, ease: "expo.out" }, "-=1"
                );
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className="min-h-[90vh] relative flex items-center pt-32 pb-20 overflow-hidden">
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
                <div className="absolute inset-0 bg-gradient-to-r from-[#3D1118]/90 via-[#7C2D36]/60 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-60"></div>

                {/* Subtle light effect */}
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#D4A853]/20 rounded-full blur-[120px] animate-pulse"></div>
            </div>

            <div className="container mx-auto relative z-10 !max-w-full px-4 md:pr-0 md:pl-20">
                <div className="max-w-6xl text-right ml-auto">
                    {/* Badge */}
                    <div ref={badgeRef} className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl rounded-full px-6 py-3 mb-12 border border-white/20 shadow-2xl group cursor-default animate-float opacity-0">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4A853] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D4A853]"></span>
                        </span>
                        <span className="text-sm font-bold text-white tracking-widest uppercase">التسجيل متاح الآن لدفعة 2026</span>
                    </div>

                    {/* Title with Gradient */}
                    <h1 ref={titleRef} className="text-6xl sm:text-7xl md:text-8xl lg:text-[110px] font-black leading-[0.95] mb-10 text-white drop-shadow-2xl opacity-0">
                        مستقبلك يبدأ من <br />
                        <span className="text-gradient-gold drop-shadow-[0_0_30px_rgba(212,168,83,0.3)]">جامعة القاهرة</span>
                    </h1>

                    {/* Subtitle */}
                    <p ref={subtitleRef} className="text-2xl sm:text-3xl text-white/90 max-w-2xl mb-14 leading-relaxed font-medium opacity-0">
                        انضم لنخبة المتدربين في برامجنا المعتمدة.
                        <span className="block mt-3 text-gold-light/90">تعليم أكاديمي.. مهارات احترافية.. شهادة عالمية.</span>
                    </p>

                    {/* CTAs */}
                    <div ref={ctasRef} className="flex flex-wrap gap-5 justify-start mb-20">
                        <Link
                            href="/programs"
                            className="group relative overflow-hidden bg-[#D4A853] text-[#3D1118] px-10 py-5 rounded-2xl font-black text-xl hover:bg-white transition-all shadow-[0_20px_40px_-10px_rgba(212,168,83,0.4)] hover:-translate-y-1 flex items-center gap-3"
                        >
                            <span>استكشف البرامج</span>
                            <svg className="w-6 h-6 transform rotate-180 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7-7 7" />
                            </svg>
                        </Link>
                        <Link
                            href="/#about"
                            className="glass-morphism text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-white hover:text-[#7C2D36] transition-all border border-white/30 hover:border-white shadow-lg hover:shadow-brand-glow"
                        >
                            تعرف علينا
                        </Link>
                    </div>

                    {/* Stats Grid */}
                    <div ref={statsRef} className="grid grid-cols-2 gap-10 border-r-4 border-[#D4A853] pr-3 opacity-0">
                        <div className="space-y-1">
                            <div className="text-4xl sm:text-5xl font-black text-white flex items-center gap-2">
                                +<AnimatedCounter end={100} suffix="K" />
                            </div>
                            <div className="text-white/60 font-bold uppercase tracking-wider text-sm">خريج معتمد</div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-4xl sm:text-5xl font-black text-white">
                                +<AnimatedCounter end={50} />
                            </div>
                            <div className="text-white/60 font-bold uppercase tracking-wider text-sm">برنامج تدريبي</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
                <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2">
                    <div className="w-1 h-2 bg-white rounded-full"></div>
                </div>
            </div>
        </section>
    );
}
