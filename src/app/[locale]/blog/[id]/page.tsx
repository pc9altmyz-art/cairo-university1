"use client";

import { useTranslations, useFormatter } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BlogCard } from "@/components/blog-card";
import ShareButtons from "@/components/share-buttons";

interface BlogComment {
    id: number;
    author: string;
    avatar: string;
    content: string;
    date: string;
}

interface BlogPost {
    id: string;
    title: string;
    category: string;
    date: string;
    author: string;
    readTime: string;
    image: string;
    views: number;
    likes: number;
    comments: BlogComment[];
    excerpt: string;
}

export default function ArticlePage() {
    const { id, locale } = useParams();
    const router = useRouter();
    const t = useTranslations('Blog');
    const tp = useTranslations('BlogData');
    const format = useFormatter();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [progress, setProgress] = useState(0);
    const [pageUrl, setPageUrl] = useState("");
    const [isLiked, setIsLiked] = useState(false);
    const [comment, setComment] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [authorAvatar, setAuthorAvatar] = useState("👤");
    const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loadPost = async () => {
            try {
                const res = await fetch(`/api/blog?id=${id}`);
                const data = await res.json();
                if (data.error) {
                    router.push(`/${locale}/blog`);
                    return;
                }
                setPost(data);

                // Load related posts
                const allRes = await fetch('/api/blog');
                const allData: BlogPost[] = await allRes.json();
                setRelatedPosts(allData.filter((p) => p.category === data.category && p.id !== data.id).slice(0, 3));

                // Mark as viewed
                fetch('/api/blog', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'view', id })
                });
            } catch (e) {
                router.push(`/${locale}/blog`);
            }
        };

        loadPost();
        setPageUrl(window.location.href);

        // Load local profile
        const savedName = localStorage.getItem('forum_user_name');
        const savedAvatar = localStorage.getItem('forum_user_avatar');
        if (savedName) setAuthorName(savedName);
        if (savedAvatar) setAuthorAvatar(savedAvatar);

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
        
        gsap.fromTo(".fade-in", 
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
        );

        return () => window.removeEventListener("scroll", handleScroll);
    }, [id, router, locale]);

    const handleLike = async (e: React.MouseEvent) => {
        if (!post) return;
        const isAlreadyLiked = isLiked;
        setIsLiked(!isAlreadyLiked);
        setPost({ ...post, likes: isAlreadyLiked ? post.likes - 1 : post.likes + 1 });

        // Heart Burst
        if (!isAlreadyLiked) {
            const rect = e.currentTarget.getBoundingClientRect();
            const burst = document.createElement('div');
            burst.className = 'fixed pointer-events-none z-[100] text-2xl';
            burst.innerHTML = '❤️';
            burst.style.left = `${rect.left + rect.width / 2}px`;
            burst.style.top = `${rect.top + rect.height / 2}px`;
            document.body.appendChild(burst);
            gsap.to(burst, { y: -100, x: (Math.random() - 0.5) * 100, opacity: 0, scale: 2, duration: 1, onComplete: () => burst.remove() });
        }

        await fetch('/api/blog', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'like', id, increment: !isAlreadyLiked })
        });
    };

    const handleAddComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!comment.trim() || !authorName.trim()) return;

        const commentData = {
            author: authorName,
            avatar: authorAvatar,
            content: comment,
        };

        try {
            const res = await fetch('/api/blog', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'comment', id, comment: commentData })
            });
            const data = await res.json();
            setPost(data.post);
            setComment("");
        } catch (e) {
            console.error("Failed to add comment");
        }
    };

    if (!post) return null;


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
                <div className="flex items-center gap-6 mb-12 p-8 bg-slate-50 dark:bg-white/5 rounded-[2.5rem] border border-slate-100 dark:border-white/10 fade-in relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4A853]/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="w-16 h-16 bg-gradient-to-br from-[#1e3a8a] to-[#D4A853] rounded-2xl flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-[#D4A853]/20 relative z-10">
                        {post.author[0]}
                    </div>
                    <div className="flex-1 relative z-10">
                        <div className="text-xl font-black text-slate-900 dark:text-white mb-1">{post.author}</div>
                        <div className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">كاتب ومستشار في المؤسسة</div>
                    </div>
                    <div className="flex flex-col items-end gap-2 relative z-10">
                        <button 
                            onClick={handleLike}
                            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm transition-all hover:scale-105 active:scale-95 ${isLiked ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'bg-white dark:bg-white/10 text-slate-500'}`}
                        >
                            <svg className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            {post.likes}
                        </button>
                        <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest bg-slate-100 dark:bg-white/10 px-3 py-1 rounded-full">
                            {post.views} مشاهدة • {post.readTime} {t('stat_time')}
                        </div>
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

                {/* Comments Section */}
                <div className="mt-24 pt-12 border-t border-slate-100 dark:border-white/10 fade-in">
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-12 flex items-center gap-4">
                        {t('replies_title')}
                        <span className="text-lg bg-[#D4A853] text-[#0F172A] px-4 py-1 rounded-2xl shadow-lg shadow-[#D4A853]/20">{post.comments?.length || 0}</span>
                    </h3>

                    <div className="space-y-8 mb-16">
                        {post.comments?.map((cmt: any) => (
                            <div key={cmt.id} className="bg-slate-50 dark:bg-white/5 p-8 rounded-[2.5rem] border border-slate-100 dark:border-white/5 flex gap-6">
                                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-white/10 flex items-center justify-center text-3xl shrink-0 overflow-hidden relative shadow-sm">
                                    {cmt.avatar && (cmt.avatar.startsWith('/') || cmt.avatar.startsWith('http')) ? (
                                        <Image src={cmt.avatar} alt={cmt.author} fill className="object-cover" />
                                    ) : (
                                        cmt.avatar || "👤"
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center mb-4">
                                        <h5 className="text-lg font-black text-slate-900 dark:text-white">{cmt.author}</h5>
                                        <span className="text-xs text-slate-400 font-bold tracking-widest uppercase">{new Date(cmt.date).toLocaleDateString(locale as string)}</span>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">{cmt.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-[#0F172A] p-10 md:p-14 rounded-[3rem] shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4A853]/5 rounded-full blur-[100px]"></div>
                        <h4 className="text-2xl font-black text-white mb-8">{t('share_opinion')}</h4>
                        <form onSubmit={handleAddComment} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input
                                    type="text"
                                    value={authorName}
                                    onChange={(e) => setAuthorName(e.target.value)}
                                    placeholder="اسمك"
                                    className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-white focus:outline-none focus:ring-2 focus:ring-[#D4A853]/50 transition-all font-bold"
                                    required
                                />
                                <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-2xl overflow-x-auto">
                                    {["👨‍🎓", "👩‍🎓", "👨‍🏫", "👩‍🏫", "👤"].map(emoji => (
                                        <button
                                            key={emoji}
                                            type="button"
                                            onClick={() => setAuthorAvatar(emoji)}
                                            className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center text-2xl transition-all ${authorAvatar === emoji ? 'bg-[#D4A853] shadow-lg scale-110' : 'hover:bg-white/10'}`}
                                        >
                                            {emoji}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder={t('comment_ph')}
                                className="w-full min-h-[150px] bg-white/5 border border-white/10 rounded-[2rem] p-8 text-white focus:outline-none focus:ring-2 focus:ring-[#D4A853]/50 transition-all font-medium text-lg resize-none shadow-inner"
                                required
                            ></textarea>
                            <button className="w-full h-16 bg-gradient-to-r from-[#D4A853] to-[#FFD700] text-[#0F172A] font-black rounded-2xl shadow-xl hover:shadow-[#D4A853]/40 hover:-translate-y-1 active:scale-95 transition-all text-xl">
                                {t('btn_reply')}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="fade-in max-w-md mx-auto mt-20">
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
