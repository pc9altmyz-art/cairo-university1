"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect, useRef } from "react";
import { Link } from "@/i18n/routing";
import gsap from "gsap";
import { getTimeAgo } from "@/lib/date-utils";
import { useLocale } from "next-intl";
import { toast } from "@/components/ui/toast";

export default function ForumPage() {
    const t = useTranslations('Forum');
    const locale = useLocale();
    const [activeTab, setActiveTab] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [likedPosts, setLikedPosts] = useState<(number | string)[]>([]);
    const [showNewPostModal, setShowNewPostModal] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    // Form states
    const [newPostAuthor, setNewPostAuthor] = useState("");
    const [newPostAvatar, setNewPostAvatar] = useState("👨‍🎓");
    const [newPostTitle, setNewPostTitle] = useState("");
    const [newPostCategory, setNewPostCategory] = useState("إعداد المعلمين");
    const [newPostContent, setNewPostContent] = useState("");

    const defaultPosts = [
        {
            id: 1,
            title: "كيف أبدأ في مجال التربية الخاصة؟",
            author: "د. أحمد علي",
            category: "التربية الخاصة",
            replies: 12,
            likes: 45,
            views: 450,
            date: new Date(Date.now() - 7200000).toISOString(),
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
            date: new Date(Date.now() - 18000000).toISOString(),
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
            date: new Date(Date.now() - 86400000).toISOString(),
            avatar: "👨‍💻"
        }
    ];

    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Initial Load
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch('/api/forum');
                const data = await res.json();
                setPosts(data);
            } catch (error) {
                console.error("Failed to fetch posts:", error);
                toast.error("حدث خطأ أثناء تحميل المواضيع");
            } finally {
                setLoading(false);
            }
        };

        const savedLikes = localStorage.getItem('forum_liked_posts');
        const savedName = localStorage.getItem('forum_user_name');
        const savedAvatar = localStorage.getItem('forum_user_avatar');

        if (savedName) setNewPostAuthor(savedName);
        if (savedAvatar) setNewPostAvatar(savedAvatar);
        
        if (savedLikes) {
            try {
                const parsed = JSON.parse(savedLikes);
                if (Array.isArray(parsed)) {
                    setLikedPosts(parsed.map(String));
                }
            } catch(e) {}
        }

        fetchPosts();
    }, []);

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
    }, [posts.length, loading]);

    useEffect(() => {
        if (showNewPostModal) {
            gsap.fromTo(modalRef.current, 
                { opacity: 0, scale: 0.9, y: 20 },
                { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" }
            );
        }
    }, [showNewPostModal]);

    const toggleLike = async (postId: number | string) => {
        const idStr = String(postId);
        const isAlreadyLiked = likedPosts.includes(idStr);
        const newLiked = isAlreadyLiked 
            ? likedPosts.filter(id => id !== idStr) 
            : [...likedPosts, idStr];
        
        setLikedPosts(newLiked);
        localStorage.setItem('forum_liked_posts', JSON.stringify(newLiked));

        // Optimistic UI update
        setPosts(prevPosts => prevPosts.map(p => {
            if (String(p.id) === idStr) {
                return { ...p, likes: isAlreadyLiked ? (p.likes || 0) - 1 : (p.likes || 0) + 1 };
            }
            return p;
        }));

        try {
            await fetch('/api/forum', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'like', id: idStr, increment: !isAlreadyLiked })
            });
        } catch (e) {
            console.error("Like sync failed");
        }
    };

    const handleCreatePost = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPostAuthor.trim() || !newPostTitle.trim() || !newPostContent.trim()) {
            toast.error("يرجى ملء جميع الحقول المطلوبة!");
            return;
        }

        const postData = {
            title: newPostTitle,
            author: newPostAuthor,
            category: newPostCategory,
            avatar: newPostAvatar,
            content: newPostContent 
        };

        try {
            const res = await fetch('/api/forum', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'add', post: postData })
            });
            const { post } = await res.json();
            
            setPosts(prev => [post, ...prev]);
            localStorage.setItem('forum_user_name', newPostAuthor);
            localStorage.setItem('forum_user_avatar', newPostAvatar);
            setShowNewPostModal(false);
            setNewPostTitle("");
            setNewPostContent("");
            
            toast.success("تم نشر موضوعك بنجاح! 🎉");
        } catch (e) {
            toast.error("فشل نشر الموضوع، حاول مجدداً");
        }
    };

    const handleDeletePost = async (postId: string | number) => {
        if (!confirm("هل أنت متأكد من حذف هذا المنشور؟")) return;
        
        try {
            await fetch('/api/forum', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'delete', id: postId })
            });
            setPosts(prev => prev.filter(p => String(p.id) !== String(postId)));
            toast.info("تم حذف المنشور بنجاح.");
        } catch (e) {
            toast.error("فشل حذف المنشور");
        }
    };

    const insertFormatting = (syntax: string) => {
        setNewPostContent(prev => prev + syntax);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0F172A] pt-36 md:pt-44 pb-20 transition-colors duration-500">
            <div className="container mx-auto px-4" ref={containerRef}>
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
                                    { name: t('nav_all'), id: "all", icon: "🌐" },
                                    { name: t('nav_my_posts'), id: "my", icon: "👤" },
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
                            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-white/5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10">
                                        <div className="text-2xl font-black text-[#D4A853]">{posts.length}</div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('stats_posts')}</div>
                                    </div>
                                    <div className="text-center p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10">
                                        <div className="text-2xl font-black text-[#D4A853]">{Math.floor(posts.length * 2.5) + 120}</div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('stats_members')}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-white/5 backdrop-blur-2xl p-8 rounded-3xl border border-slate-200 dark:border-white/5 shadow-xl dark:shadow-none relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4A853]/10 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform"></div>
                            <h4 className="text-slate-900 dark:text-white font-black mb-4 flex items-center gap-2">
                                <span className="text-[#D4A853]">💡</span> {t('rules_title')}
                            </h4>
                            <ul className="text-xs text-slate-500 dark:text-white/40 space-y-3 font-bold">
                                <li className="flex gap-2"><span>•</span> {t('rule1')}</li>
                                <li className="flex gap-2"><span>•</span> {t('rule2')}</li>
                                <li className="flex gap-2"><span>•</span> {t('rule3')}</li>
                            </ul>
                        </div>
                    </div>

                    <div className="lg:col-span-3 space-y-6 order-1 lg:order-2">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative group">
                                <input 
                                    type="text" 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={t('search_ph')}
                                    className="w-full h-14 md:h-16 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-14 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4A853]/50 transition-all shadow-md dark:shadow-none"
                                />
                                <svg className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#D4A853] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <button 
                                onClick={() => setShowNewPostModal(true)}
                                className="h-14 md:h-16 px-8 bg-[#D4A853] text-[#0F172A] font-black rounded-2xl shadow-xl shadow-[#D4A853]/20 hover:shadow-[#D4A853]/40 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-2 group"
                            >
                                <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                                </svg>
                                {t('btn_new_post')}
                            </button>
                        </div>

                        <div className="space-y-4">
                            {(() => {
                                const filteredPosts = posts.filter(post => {
                                    const title = post.title || "";
                                    const content = post.content || "";
                                    const query = searchQuery.toLowerCase();
                                    const matchesSearch = title.toLowerCase().includes(query) || 
                                                         content.toLowerCase().includes(query);
                                    
                                    if (activeTab === "all") return matchesSearch;
                                    
                                    if (activeTab === "my") {
                                        const myName = typeof window !== 'undefined' ? localStorage.getItem('forum_user_name') : null;
                                        return matchesSearch && (post.author || "").trim() === (myName || "").trim();
                                    }
                                    
                                    const catMap: any = {
                                        "edu": "إعداد المعلمين",
                                        "psych": "علم النفس",
                                        "sped": "التربية الخاصة"
                                    };
                                    
                                    return matchesSearch && post.category === catMap[activeTab];
                                });

                                if (filteredPosts.length === 0) {
                                    return (
                                        <div className="bg-white dark:bg-white/5 backdrop-blur-2xl p-20 rounded-[3rem] border border-slate-200 dark:border-white/5 text-center">
                                            <div className="text-8xl mb-6 opacity-20">🔍</div>
                                            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">{t('empty_posts')}</h3>
                                            <p className="text-slate-500 dark:text-white/40 font-bold">حاول تغيير الفلاتر أو البحث عن شيء آخر</p>
                                        </div>
                                    );
                                }

                                return filteredPosts.map((post) => (
                                    <div key={post.id} className="forum-post-card bg-white dark:bg-white/5 backdrop-blur-2xl p-6 md:p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-xl dark:shadow-none hover:border-[#D4A853]/30 dark:hover:border-[#D4A853]/30 transition-all duration-500 group relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#D4A853]/5 to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                                        
                                        <div className="flex gap-6 items-start relative z-10">
                                            <div className="w-14 h-14 md:w-20 md:h-20 rounded-3xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-4xl shrink-0 group-hover:rotate-6 transition-transform shadow-inner">
                                                {post.avatar || "👤"}
                                            </div>
                                            <div className="flex-1 min-w-0 rtl:text-right ltr:text-left">
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="flex items-center gap-3 flex-wrap">
                                                        <span className="px-4 py-1.5 rounded-full bg-[#D4A853]/10 text-[#D4A853] text-[10px] font-black uppercase tracking-[0.2em]">{post.category}</span>
                                                        <span className="text-slate-300 dark:text-white/10 text-xs font-black">•</span>
                                                        <span className="text-slate-500 dark:text-white/40 text-xs font-bold uppercase tracking-widest">{getTimeAgo(post.date, locale)}</span>
                                                    </div>
                                                    
                                                    {typeof post.id === 'string' && post.id.startsWith('post-') && (
                                                        <button 
                                                            onClick={() => handleDeletePost(post.id)}
                                                            className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                                            title="حذف المنشور"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    )}
                                                </div>
                                                
                                                <h2 className="text-xl md:text-3xl font-black text-slate-900 dark:text-white mb-6 group-hover:text-[#D4A853] transition-colors line-clamp-2 leading-tight">
                                                    <Link href={`/forum/${post.id}`}>{post.title}</Link>
                                                </h2>
                                                
                                                <div className="flex items-center gap-4 md:gap-8 text-slate-500 dark:text-white/40 text-xs md:text-sm font-bold flex-wrap">
                                                    <button 
                                                        onClick={(e) => { e.preventDefault(); toggleLike(post.id); }}
                                                        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all ${likedPosts.includes(String(post.id)) ? 'bg-red-500/10 text-red-500' : 'hover:bg-slate-100 dark:hover:bg-white/10'}`}
                                                    >
                                                        <svg className={`w-5 h-5 ${likedPosts.includes(String(post.id)) ? 'fill-current' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
    
                                                    <span className="font-black text-[#D4A853] mr-auto px-4 py-2 bg-[#D4A853]/5 rounded-xl border border-[#D4A853]/10 truncate max-w-[150px]">{t('by')} {post.author}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ));
                            })()}
                        </div>
                    </div>
                </div>
            </div>

            {showNewPostModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-[#0F172A]/80 backdrop-blur-md" onClick={() => setShowNewPostModal(false)}></div>
                    <div ref={modalRef} className="relative w-full max-w-2xl bg-white dark:bg-[#1e293b] rounded-[3rem] shadow-3xl overflow-hidden border border-slate-200 dark:border-white/10">
                        <div className="bg-gradient-to-r from-[#D4A853] to-[#FFD700] p-8 text-[#0F172A]">
                            <div className="flex justify-between items-center">
                                <h3 className="text-2xl font-black">{t('new_post_modal_title')}</h3>
                                <button onClick={() => setShowNewPostModal(false)} className="w-10 h-10 rounded-full bg-[#0F172A]/10 flex items-center justify-center hover:bg-[#0F172A]/20 transition-all">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <form onSubmit={handleCreatePost} className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-black text-slate-400 dark:text-white/20 uppercase tracking-widest px-2">{t('author_name_label')}</label>
                                    <input 
                                        type="text" 
                                        value={newPostAuthor}
                                        onChange={(e) => setNewPostAuthor(e.target.value)}
                                        placeholder={t('author_name_ph')}
                                        className="w-full h-14 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4A853]/50 transition-all font-bold"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-black text-slate-400 dark:text-white/20 uppercase tracking-widest px-2">الصورة الرمزية (Avatar)</label>
                                    <div className="flex gap-2 p-1 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl overflow-x-auto hide-scrollbar">
                                        {["👨‍🎓", "👩‍🎓", "👨‍🏫", "👩‍🏫", "👨‍💻", "👩‍💻", "👤", "🌟"].map(emoji => (
                                            <button 
                                                key={emoji}
                                                type="button"
                                                onClick={() => setNewPostAvatar(emoji)}
                                                className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center text-2xl transition-all ${newPostAvatar === emoji ? 'bg-[#D4A853] shadow-lg scale-110' : 'hover:bg-slate-200 dark:hover:bg-white/10'}`}
                                            >
                                                {emoji}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-black text-slate-400 dark:text-white/20 uppercase tracking-widest px-2">{t('post_title_label')}</label>
                                <input 
                                    type="text" 
                                    value={newPostTitle}
                                    onChange={(e) => setNewPostTitle(e.target.value)}
                                    placeholder={t('post_title_ph')}
                                    className="w-full h-14 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4A853]/50 transition-all font-bold"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-black text-slate-400 dark:text-white/20 uppercase tracking-widest px-2">{t('post_category_label')}</label>
                                <select 
                                    value={newPostCategory}
                                    onChange={(e) => setNewPostCategory(e.target.value)}
                                    className="w-full h-14 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4A853]/50 transition-all font-bold appearance-none cursor-pointer"
                                >
                                    <option value="إعداد المعلمين">إعداد المعلمين</option>
                                    <option value="علم النفس">علم النفس</option>
                                    <option value="التربية الخاصة">التربية الخاصة</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center justify-between px-2">
                                    <span className="text-sm font-black text-slate-400 dark:text-white/20 uppercase tracking-widest">{t('post_content_label')}</span>
                                    <div className="flex items-center gap-1">
                                        <button type="button" onClick={() => insertFormatting('**نص عريض**')} className="w-8 h-8 rounded-md hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 flex items-center justify-center font-bold" title="عريض">B</button>
                                        <button type="button" onClick={() => insertFormatting('*نص مائل*')} className="w-8 h-8 rounded-md hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 flex items-center justify-center italic font-serif" title="مائل">I</button>
                                        <button type="button" onClick={() => insertFormatting('\n- نقطة جديدة')} className="w-8 h-8 rounded-md hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 flex items-center justify-center" title="قائمة">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                                        </button>
                                    </div>
                                </label>
                                <textarea 
                                    value={newPostContent}
                                    onChange={(e) => setNewPostContent(e.target.value)}
                                    placeholder={t('post_content_ph')}
                                    className="w-full min-h-[150px] bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4A853]/50 transition-all font-medium"
                                    required
                                ></textarea>
                            </div>

                            <button className="w-full h-16 bg-[#D4A853] text-[#0F172A] font-black rounded-2xl shadow-xl shadow-[#D4A853]/20 hover:shadow-[#D4A853]/40 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-3">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                                {t('btn_publish_now')}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
