"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

export default function ForumPage() {
    const t = useTranslations('Forum');
    const [activeTab, setActiveTab] = useState("all");
    const [likedPosts, setLikedPosts] = useState<number[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    // Mock data for posts
    const [posts, setPosts] = useState([
        {
            id: 1,
            title: "كيف أبدأ في مجال التربية الخاصة؟",
            author: "د. أحمد علي",
            category: "التربية الخاصة",
            replies: 12,
            likes: 45,
            views: 450,
            date: "منذ ساعتين",
            avatar: "👨‍🏫"
        },
        {
            id: 2,
            title: "أفضل المراجع لدبلومة علم النفس الإيجابي",
            author: "سارة محمد",
            category: "علم النفس",
            replies: 8,
            likes: 32,
            views: 210,
            date: "منذ 5 ساعات",
            avatar: "👩‍🎓"
        },
        {
            id: 3,
            title: "تجاربكم مع اختبارات الـ TOT في المؤسسة",
            author: "ياسين حسن",
            category: "إعداد المعلمين",
            replies: 25,
            likes: 128,
            views: 890,
            date: "أمس",
            avatar: "👨‍💻"
        }
    ]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".forum-post-card", {
                opacity: 0,
                y: 30,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out"
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const toggleLike = (postId: number) => {
        if (likedPosts.includes(postId)) {
            setLikedPosts(likedPosts.filter(id => id !== postId));
            setPosts(posts.map(p => p.id === postId ? { ...p, likes: p.likes - 1 } : p));
        } else {
            setLikedPosts([...likedPosts, postId]);
            setPosts(posts.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p));
            // Small pop animation for the heart could go here
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0F172A] pt-28 pb-20 transition-colors duration-500">
            <div className="container mx-auto px-4" ref={containerRef}>
                {/* Hero Header */}
                <div className="mb-12 rtl:text-right ltr:text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10 mb-6 backdrop-blur-xl">
                        <span className="w-2 h-2 rounded-full bg-[#D4A853] animate-pulse"></span>
                        <span className="text-xs font-bold uppercase tracking-widest text-[#D4A853]">{t('badge')}</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
                        {t('title1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A853] to-[#FFD700]">{t('title_hl')}</span> {t('title2')}
                    </h1>
                    <p className="text-slate-600 dark:text-white/60 text-lg max-w-2xl font-medium">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar - Categories */}
                    <div className="lg:col-span-1 space-y-6 order-2 lg:order-1">
                        <div className="bg-white dark:bg-white/5 backdrop-blur-2xl p-6 rounded-3xl border border-slate-200 dark:border-white/5 shadow-xl dark:shadow-none">
                            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                <svg className="w-5 h-5 text-[#D4A853]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                                {t('categories_title')}
                            </h3>
                            <div className="space-y-2">
                                {[
                                    { name: "جميع المناقشات", id: "all", icon: "🌐" },
                                    { name: "إعداد المعلمين", id: "edu", icon: "🎓" },
                                    { name: "علم النفس", id: "psych", icon: "🧠" },
                                    { name: "التربية الخاصة", id: "sped", icon: "🤝" }
                                ].map((cat) => (
                                    <button 
                                        key={cat.id}
                                        onClick={() => setActiveTab(cat.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold ${activeTab === cat.id ? 'bg-gradient-to-r from-[#D4A853] to-[#FFD700] text-[#0F172A] shadow-lg shadow-[#D4A853]/20' : 'text-slate-500 dark:text-white/60 hover:bg-slate-100 dark:hover:bg-white/5'}`}
                                    >
                                        <span className="text-xl">{cat.icon}</span>
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white dark:bg-white/5 backdrop-blur-2xl p-6 rounded-3xl border border-slate-200 dark:border-white/5 shadow-xl dark:shadow-none bg-gradient-to-br from-[#D4A853]/5 to-transparent">
                            <h4 className="text-slate-900 dark:text-white font-black mb-4 uppercase tracking-tighter text-sm">أحصائيات المجتمع</h4>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500 dark:text-white/40 font-bold text-xs uppercase tracking-widest">إجمالي المواضيع</span>
                                    <span className="text-slate-900 dark:text-white font-black text-lg">1,240</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500 dark:text-white/40 font-bold text-xs uppercase tracking-widest">الأعضاء النشطين</span>
                                    <span className="text-slate-900 dark:text-white font-black text-lg">5,820</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content - Post List */}
                    <div className="lg:col-span-3 space-y-6 order-1 lg:order-2">
                        {/* Search and Action Bar */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative group">
                                <input 
                                    type="text" 
                                    placeholder={t('search_ph')}
                                    className="w-full h-14 md:h-16 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-14 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4A853]/50 transition-all shadow-md dark:shadow-none"
                                />
                                <svg className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#D4A853] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <button className="h-14 md:h-16 px-8 bg-[#D4A853] text-[#0F172A] font-black rounded-2xl shadow-xl shadow-[#D4A853]/20 hover:shadow-[#D4A853]/40 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-2">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                                </svg>
                                {t('btn_new_post')}
                            </button>
                        </div>

                        {/* Posts List */}
                        <div className="space-y-4">
                            {posts.map((post) => (
                                <div key={post.id} className="forum-post-card bg-white dark:bg-white/5 backdrop-blur-2xl p-6 md:p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-xl dark:shadow-none hover:border-[#D4A853]/30 dark:hover:border-[#D4A853]/30 transition-all duration-500 group relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#D4A853]/5 to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                                    
                                    <div className="flex gap-6 items-start relative z-10">
                                        <div className="w-14 h-14 md:w-20 md:h-20 rounded-3xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-4xl shrink-0 group-hover:rotate-6 transition-transform shadow-inner">
                                            {post.avatar}
                                        </div>
                                        <div className="flex-1 min-w-0 rtl:text-right ltr:text-left">
                                            <div className="flex items-center gap-3 mb-3 flex-wrap">
                                                <span className="px-4 py-1.5 rounded-full bg-[#D4A853]/10 text-[#D4A853] text-[10px] font-black uppercase tracking-[0.2em]">{post.category}</span>
                                                <span className="text-slate-300 dark:text-white/10 text-xs font-black">•</span>
                                                <span className="text-slate-500 dark:text-white/40 text-xs font-bold uppercase tracking-widest">{post.date}</span>
                                            </div>
                                            <h2 className="text-xl md:text-3xl font-black text-slate-900 dark:text-white mb-6 group-hover:text-[#D4A853] transition-colors line-clamp-2 leading-tight">
                                                <Link href={`/forum/${post.id}`}>{post.title}</Link>
                                            </h2>
                                            
                                            <div className="flex items-center gap-4 md:gap-8 text-slate-500 dark:text-white/40 text-xs md:text-sm font-bold flex-wrap">
                                                <button 
                                                    onClick={(e) => { e.preventDefault(); toggleLike(post.id); }}
                                                    className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all ${likedPosts.includes(post.id) ? 'bg-red-500/10 text-red-500' : 'hover:bg-slate-100 dark:hover:bg-white/10'}`}
                                                >
                                                    <svg className={`w-5 h-5 ${likedPosts.includes(post.id) ? 'fill-current' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                    </svg>
                                                    <span className="text-base">{post.likes}</span>
                                                </button>

                                                <span className="flex items-center gap-2.5">
                                                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center">
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                                        </svg>
                                                    </div>
                                                    <span className="text-base">{post.replies}</span>
                                                </span>

                                                <span className="flex items-center gap-2.5">
                                                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center">
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg>
                                                    </div>
                                                    <span className="text-base">{post.views}</span>
                                                </span>

                                                <span className="font-black text-[#D4A853] mr-auto px-4 py-2 bg-[#D4A853]/5 rounded-xl border border-[#D4A853]/10">بواسطة {post.author}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
