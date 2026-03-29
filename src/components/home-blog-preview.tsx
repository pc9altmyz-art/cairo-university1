"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getFeaturedPosts } from "@/data/blog";
import { BlogCard } from "@/components/blog-card";

export function HomeBlogPreview() {
    const t = useTranslations('Blog');
    const posts = getFeaturedPosts().slice(0, 3);
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            gsap.fromTo(headerRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    }
                }
            );

            if (gridRef.current) {
                gsap.fromTo(gridRef.current.children,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1, y: 0,
                        duration: 0.8,
                        stagger: 0.2,
                        scrollTrigger: {
                            trigger: gridRef.current,
                            start: "top 85%",
                        }
                    }
                );
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 relative overflow-hidden bg-white dark:bg-[#0F172A] transition-colors duration-300">
            <div className="container mx-auto px-4 relative z-10">
                <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16 px-4">
                    <div className="inline-flex items-center gap-2 bg-[#1e3a8a]/5 dark:bg-white/5 backdrop-blur-md border border-[#1e3a8a]/10 dark:border-white/10 px-6 py-2 rounded-2xl mb-6 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-[#D4A853] animate-pulse" />
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-[#1e3a8a] dark:text-[#D4A853]">
                            {t('home_badge')}
                        </span>
                    </div>
                    
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
                        {t('home_title')} <span className="text-[#1e3a8a] dark:text-[#D4A853] leading-tight">{t('home_hl')}</span>
                    </h2>
                    
                    <p className="text-slate-600 dark:text-slate-400 text-lg font-medium leading-relaxed">
                        {t('home_desc')}
                    </p>
                </div>

                <div 
                    ref={gridRef}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16"
                >
                    {posts.map((post) => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <Link
                        href="/blog"
                        className="bg-[#1e3a8a] text-white px-10 py-4 rounded-2x l font-black hover:bg-[#D4A853] hover:text-[#172554] transition-all inline-block shadow-2xl hover:-translate-y-1 group"
                    >
                        {t('title1')} {t('title_hl')}
                        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 ml-2 rtl:ml-0 rtl:mr-2">
                            →
                        </span>
                    </Link>
                </div>
            </div>

            {/* Background elements */}
            <div className="absolute top-1/2 -right-40 w-80 h-80 bg-[#D4A853]/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 -left-40 w-80 h-80 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />
        </section>
    );
}
