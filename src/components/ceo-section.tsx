"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { TiltCard } from "./ui/tilt-card";

export default function CEOSection() {
    const t = useTranslations('CEOSection');
    const containerRef = useRef<HTMLElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Card reveal
            gsap.fromTo(cardRef.current,
                { opacity: 0, y: 100, scale: 0.95 },
                {
                    opacity: 1, y: 0, scale: 1,
                    duration: 1.2,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                    }
                }
            );

            // Content stagger
            if (contentRef.current) {
                gsap.fromTo(contentRef.current.children,
                    { opacity: 0, x: -30 },
                    {
                        opacity: 1, x: 0,
                        duration: 1,
                        stagger: 0.2,
                        delay: 0.5,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 70%",
                        }
                    }
                );
            }

            // Image reveal
            gsap.fromTo(imageRef.current,
                { opacity: 0, x: 30, scale: 1.1 },
                {
                    opacity: 1, x: 0, scale: 1,
                    duration: 1.5,
                    delay: 0.3,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 70%",
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-20 md:py-32 px-4 relative overflow-hidden bg-[#0F172A]">
            {/* Background Accents */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#D4A853]/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#1e3a8a]/10 rounded-full blur-[100px] translate-y-1/4 translate-x-1/4 pointer-events-none" />

            <div className="container mx-auto max-w-6xl relative z-10">
                <div 
                    ref={cardRef}
                    className="premium-glass rounded-[2.5rem] md:rounded-[4rem] border border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)] overflow-hidden relative group"
                >
                    {/* Inner Pattern */}
                    <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[#D4A853]/5 via-transparent to-[#1e3a8a]/5 pointer-events-none" />

                    <div className="grid lg:grid-cols-5 items-center">
                        {/* Text Content */}
                        <div ref={contentRef} className="lg:col-span-3 p-8 md:p-16 lg:p-20 relative z-10 order-2 lg:order-1">
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 md:mb-12">
                                <span className="w-2 h-2 rounded-full bg-[#D4A853] animate-pulse" />
                                <span className="text-[#D4A853] text-xs font-black uppercase tracking-widest">{t('badge')}</span>
                            </div>

                            <div className="mb-10 md:mb-14">
                                <div className="text-[#D4A853] text-sm md:text-base font-bold uppercase tracking-[0.2em] mb-3 opacity-80">{t('role')}</div>
                                <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">{t('name')}</h2>
                                <div className="w-20 h-1.5 bg-gradient-to-r from-[#D4A853] to-transparent rounded-full" />
                            </div>

                            <blockquote className="relative">
                                {/* Quote Icon */}
                                <div className="absolute -top-10 -left-6 text-8xl text-[#D4A853]/10 font-serif leading-none select-none pointer-events-none">“</div>
                                <p className="text-xl md:text-2xl lg:text-3xl text-white/90 leading-relaxed font-medium italic relative z-10 ltr:pl-4 rtl:pr-4 ltr:border-l-2 rtl:border-r-2 border-[#D4A853]/30">
                                    {t('quote')}
                                </p>
                            </blockquote>

                            {/* Social Links */}
                            <div className="mt-12 md:mt-16 flex items-center gap-6">
                                <span className="text-xs font-black uppercase tracking-widest text-[#D4A853] opacity-50">{t('follow')}:</span>
                                <div className="flex gap-4">
                                    <a 
                                        href="https://www.facebook.com/hes.ham.56211?locale=ar_AR" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#1877F2] hover:bg-white/10 hover:border-[#1877F2]/30 transition-all duration-300 hover:-translate-y-1 shadow-lg"
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                    </a>
                                    <a 
                                        href="https://www.instagram.com/hesham.refaat17?igsh=MTNmejRjbHRoeno2YQ==" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#E4405F] hover:bg-white/10 hover:border-[#E4405F]/30 transition-all duration-300 hover:-translate-y-1 shadow-lg"
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* CEO Image */}
                        <div ref={imageRef} className="lg:col-span-2 h-full relative min-h-[400px] lg:min-h-full overflow-hidden order-1 lg:order-2">
                            <TiltCard intensity={5} className="w-full h-full">
                                <div className="relative w-full h-full">
                                    <Image 
                                        src="/هشام رفعت.jpg"
                                        alt={t('name')}
                                        fill
                                        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                        priority
                                    />
                                    {/* Gradient Overlays on Image */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-60 lg:hidden" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-transparent to-transparent opacity-40 ltr:block hidden" />
                                    <div className="absolute inset-0 bg-gradient-to-l from-[#0F172A] via-transparent to-transparent opacity-40 rtl:block hidden" />
                                    
                                    {/* Border Accent */}
                                    <div className="absolute inset-8 border border-white/10 rounded-3xl pointer-events-none hidden md:block" />
                                </div>
                            </TiltCard>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
