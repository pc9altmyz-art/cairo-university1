"use client";

import { useTranslations, useFormatter } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { getPostById, getAllPosts, BlogPost } from "@/data/blog";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BlogCard } from "@/components/blog-card";
import ShareButtons from "@/components/share-buttons";

export default function ArticlePage() {
    const { id, locale } = useParams();
    const router = useRouter();
    const t = useTranslations('Blog');
    const tp = useTranslations('BlogData');
    const format = useFormatter();
    const post = getPostById(id as string);
    const [progress, setProgress] = useState(0);
    const [pageUrl, setPageUrl] = useState("");
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!post) {
            router.push(`/${locale}/blog`);
            return;
        }

        setPageUrl(window.location.href);
        gsap.registerPlugin(ScrollTrigger);
        
        const handleScroll = () => {
            const h = document.documentElement;
            const b = document.body;
            const st = 'scrollTop';
            const sh = 'scrollHeight';
            const scroll = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
            setProgress(scroll);
        };

        window.addEventListener("scroll", handleScroll);
        
        // Initial animation
        gsap.fromTo(".fade-in", 
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
        );

        return () => window.removeEventListener("scroll", handleScroll);
    }, [post, router, locale]);

    if (!post) return null;

    const relatedPosts = getAllPosts()
        .filter(p => p.category === post.category && p.id !== post.id)
        .slice(0, 3);

    return (
        <main className="min-h-screen bg-white dark:bg-[#0F172A] pt-32 pb-24">
            {/* Reading Progress Bar */}
            <div className="fixed top-0 left-0 w-full h-1.5 z-[60] origin-left">
                <div 
                    className="h-full bg-gradient-to-r from-[#1e3a8a] to-[#D4A853] transition-all duration-100 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <article className="container mx-auto px-4 max-w-4xl">
                {/* Meta */}
                <div className="flex flex-wrap items-center gap-4 mb-8 text-slate-500 dark:text-slate-400 text-sm font-bold fade-in">
                    <Link href="/blog" className="text-[#1e3a8a] dark:text-[#D4A853] hover:underline uppercase tracking-widest">{t('title1')}</Link>
                    <span>/</span>
                    <span className="uppercase tracking-widest">{t(`filter_${post.category}`)}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                    <span>
                        {format.dateTime(new Date(post.date), {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </span>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-10 leading-tight fade-in">
                    {tp(`${post.id}.title`)}
                </h1>

                {/* Author Info */}
                <div className="flex items-center gap-4 mb-12 p-6 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-white/10 fade-in">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1e3a8a] to-[#D4A853] rounded-2xl flex items-center justify-center text-white text-xl font-black">
                        {post.author[0]}
                    </div>
                    <div>
                        <div className="text-slate-900 dark:text-white font-black">{post.author}</div>
                        <div className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">كاتب ومستشار في المؤسسة</div>
                    </div>
                    <div className="mr-auto rtl:mr-auto ltr:ml-auto text-slate-400 text-xs font-bold uppercase tracking-widest">
                        {post.readTime} {t('stat_time')}
                    </div>
                </div>

                {/* Main Image */}
                <div className="relative aspect-[16/9] mb-16 rounded-[3rem] overflow-hidden shadow-2xl fade-in">
                    <Image
                        src={post.image}
                        alt={tp(`${post.id}.title`)}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Content */}
                <div 
                    ref={contentRef}
                    className="prose prose-xl prose-slate dark:prose-invert max-w-none fade-in"
                >
                    <p className="text-2xl font-black text-[#1e3a8a] dark:text-[#D4A853] mb-8 leading-relaxed">
                        {tp(`${post.id}.excerpt`)}
                    </p>
                    <div className="text-slate-700 dark:text-slate-300 leading-[2.2] text-xl font-medium whitespace-pre-line mb-16">
                        {tp(`${post.id}.content`)}
                    </div>
                </div>

                {/* Share Buttons */}
                <div className="fade-in max-w-md mx-auto">
                    <ShareButtons 
                        title={tp(`${post.id}.title`)} 
                        description={tp(`${post.id}.excerpt`)} 
                        url={pageUrl} 
                    />
                </div>

                {/* Shared Footer / Related Content */}
                <div className="mt-24 pt-12 border-t border-slate-100 dark:border-white/10 fade-in">
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-12 text-center">
                        {t('featured_title')} <span className="text-[#1e3a8a] dark:text-[#D4A853]">{t('featured_hl')}</span>
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {relatedPosts.map(p => (
                            <BlogCard key={p.id} post={p} />
                        ))}
                    </div>
                </div>
            </article>

            {/* Float decorations */}
            <div className="fixed top-1/4 -right-40 w-80 h-80 bg-[#D4A853]/5 blur-[120px] rounded-full pointer-events-none -z-10" />
            <div className="fixed bottom-1/4 -left-40 w-96 h-96 bg-blue-500/5 blur-[150px] rounded-full pointer-events-none -z-10" />
        </main>
    );
}
