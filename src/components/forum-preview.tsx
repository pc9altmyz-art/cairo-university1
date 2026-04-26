"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getTimeAgo } from "@/lib/date-utils";
import { useLocale } from "next-intl";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function ForumPreview() {
    const t = useTranslations('Forum');
    const locale = useLocale();
    const containerRef = useRef<HTMLDivElement>(null);
    const shapesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Entrance animations
            gsap.from(".forum-title", {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            });

            gsap.from(".stat-card", {
                scale: 0.5,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                }
            });

            gsap.from(".post-preview-card", {
                x: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                }
            });

            // Floating background shapes
            if (shapesRef.current) {
                gsap.to(shapesRef.current.children, {
                    y: "random(-40, 40)",
                    x: "random(-40, 40)",
                    rotation: "random(-15, 15)",
                    duration: "random(3, 5)",
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    stagger: 0.1
                });
            }
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const [latestPosts, setLatestPosts] = useState<any[]>([]);

    useEffect(() => {
        const fetchLatest = async () => {
            try {
                const res = await fetch('/api/forum');
                const data = await res.json();
                // Take only first 3
                setLatestPosts(data.slice(0, 3));
            } catch (e) {}
        };
        fetchLatest();
    }, []);

    if (latestPosts.length === 0) return null;

    return (
        <section id="forum" ref={containerRef} className="section-padding bg-slate-50 dark:bg-[#0F172A] relative overflow-hidden transition-colors duration-700 isolate">
            {/* Artistic Floating Elements */}
            <div ref={shapesRef} className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30 dark:opacity-50">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#D4A853]/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 w-48 h-48 border border-[#D4A853]/20 rounded-3xl rotate-12"></div>
                <div className="absolute top-1/3 right-1/3 w-32 h-32 border border-blue-500/20 rounded-full"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                    {/* Left Column: Text & Stats */}
                    <div className="lg:col-span-5 rtl:text-right ltr:text-left">
                        <div className="forum-title">
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 mb-8 shadow-xl dark:shadow-none">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#D4A853] animate-pulse"></span>
                                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#D4A853]">{t('badge')}</span>
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 leading-[1.1]">
                                {t('title1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A853] to-[#FFD700]">{t('title_hl')}</span> <br />
                                {t('title2')}
                            </h2>
                            <p className="text-slate-600 dark:text-white/60 text-lg md:text-xl leading-relaxed mb-12 font-medium">
                                {t('subtitle')}
                            </p>
                        </div>

                        <div className="flex gap-6 md:gap-10">
                            {[
                                { val: "5k+", lab: t('stats_members') },
                                { val: "1.2k+", lab: t('stats_posts') }
                            ].map((s, i) => (
                                <div key={i} className="stat-card bg-white dark:bg-white/5 p-8 rounded-[2.5rem] border border-slate-100 dark:border-white/10 shadow-2xl dark:shadow-none flex-1 text-center group hover:bg-[#D4A853] transition-all duration-500">
                                    <div className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white group-hover:text-[#0F172A] transition-colors mb-1 tracking-tighter">{s.val}</div>
                                    <div className="text-[#D4A853] dark:text-[#D4A853] group-hover:text-[#0F172A]/70 font-black uppercase text-[10px] tracking-widest transition-colors">{s.lab}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Live Feed Preview */}
                    <div className="lg:col-span-7 relative">
                        <div className="absolute inset-0 bg-[#D4A853]/5 rounded-[4rem] rotate-3 -z-10"></div>
                        <div className="bg-white/80 dark:bg-[#1e293b]/80 backdrop-blur-3xl p-8 md:p-12 rounded-[4rem] border border-white dark:border-white/5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] dark:shadow-none">
                            <div className="flex justify-between items-center mb-10 border-b border-slate-100 dark:border-white/5 pb-6">
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                                    <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                                    آخر المناقشات
                                </h3>
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-400/20"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-400/20"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-400/20"></div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {latestPosts.map((post, i) => (
                                    <div key={i} className="post-preview-card bg-slate-50 dark:bg-white/5 p-6 rounded-3xl border border-slate-100 dark:border-white/10 group hover:border-[#D4A853]/50 transition-all cursor-pointer">
                                        <div className="flex gap-5 items-center">
                                            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-white/10 flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform">
                                                {post.avatar}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-lg font-black text-slate-900 dark:text-white mb-1 truncate group-hover:text-[#D4A853] transition-colors">{post.title}</h4>
                                                <div className="flex items-center gap-4 text-[10px] md:text-xs font-bold text-slate-400">
                                                    <span className="text-[#D4A853]">{post.author}</span>
                                                    <span>{getTimeAgo(post.date, locale)}</span>
                                                    <span className="flex items-center gap-1">
                                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                                        </svg>
                                                        {post.replies}
                                                    </span>
                                                </div>
                                            </div>
                                            <svg className="w-5 h-5 text-slate-300 dark:text-white/10 group-hover:text-[#D4A853] transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12">
                                <Link 
                                    href="/forum" 
                                    className="w-full h-16 bg-[#D4A853] text-[#0F172A] font-black rounded-2xl shadow-xl shadow-[#D4A853]/20 hover:shadow-[#D4A853]/40 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-4 group"
                                >
                                    {t('nav_all')}
                                    <svg className="w-6 h-6 rtl:rotate-180 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
