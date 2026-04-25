"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useParams } from "next/navigation";

export default function PostDetailPage() {
    const t = useTranslations('Forum');
    const { id } = useParams();
    const [comment, setComment] = useState("");
    const [isLiked, setIsLiked] = useState(false);
    const [readingProgress, setReadingProgress] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Mock single post data (normally would be fetched by ID)
    const [post, setPost] = useState<any>(null);

    const defaultComments = [
        {
            id: 1,
            author: "أ. مريم يوسف",
            content: "أهلاً بك دكتور أحمد. الخطوة الأولى دائماً هي فهم أنواع الإعاقات المختلفة. دبلومة التربية الخاصة الشاملة في المؤسسة هي نقطة انطلاق ممتازة جداً.",
            date: "منذ ساعة",
            avatar: "👩‍🏫",
            likes: 12,
            liked: false
        }
    ];

    const [comments, setComments] = useState(defaultComments);

    // Load Post and Comments on mount
    useEffect(() => {
        // 1. Try to find post in localStorage (if it's a user-created post)
        const savedPosts = localStorage.getItem('forum_posts');
        let currentPost = null;
        if (savedPosts) {
            const parsed = JSON.parse(savedPosts);
            currentPost = parsed.find((p: any) => p.id === id);
        }

        // If not found, use default mock data based on ID
        if (!currentPost) {
            currentPost = {
                id: id,
                title: id === "1" ? "كيف أبدأ في مجال التربية الخاصة؟" : "موضوع منتدى",
                content: "السلام عليكم ورحمة الله وبركاته، أنا مهتم جداً بمجال التربية الخاصة وأريد معرفة الخطوات العملية للبدء في هذا المسار المهني. ما هي الدبلومات المطلوبة؟ وهل تنصحون ببرامج المؤسسة المبتدئة؟ جزاكم الله خيراً.",
                author: "د. أحمد علي",
                category: "التربية الخاصة",
                likes: 45,
                views: 450,
                date: "منذ ساعتين",
                avatar: "👨‍🏫",
                tags: ["تعليم", "تدريب", "تربية_خاصة"]
            };
        }
        setPost(currentPost);

        // 2. Load comments for this post
        const savedComments = localStorage.getItem(`forum_comments_${id}`);
        if (savedComments) {
            const parsed = JSON.parse(savedComments);
            setComments([...parsed, ...defaultComments.filter(dc => !parsed.find((c: any) => c.id === dc.id))]);
        }
    }, [id]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / scrollHeight) * 100;
            setReadingProgress(progress);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".animate-content", {
                opacity: 0,
                x: -30,
                duration: 1,
                ease: "power4.out"
            });
            gsap.from(".animate-sidebar", {
                opacity: 0,
                x: 30,
                duration: 1,
                delay: 0.2,
                ease: "power4.out"
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!comment.trim()) return;

        const newComment = {
            id: Date.now(),
            author: "أنت (زائر)",
            content: comment,
            date: "الآن",
            avatar: "👤",
            likes: 0,
            liked: false
        };

        const updatedComments = [newComment, ...comments];
        setComments(updatedComments);
        setComment("");

        // Save only user comments to localStorage to persist
        const userComments = updatedComments.filter(c => c.author === "أنت (زائر)");
        localStorage.setItem(`forum_comments_${id}`, JSON.stringify(userComments));
    };

    if (!post) return null;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0F172A] pt-32 pb-20 transition-colors duration-500" ref={containerRef}>
            {/* Reading Progress Bar */}
            <div className="fixed top-0 left-0 h-1.5 bg-gradient-to-r from-[#D4A853] to-[#FFD700] z-[100] transition-all duration-300" style={{ width: `${readingProgress}%` }}></div>

            <div className="container mx-auto px-4 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content Area */}
                    <div className="lg:col-span-8 space-y-12">
                        {/* Navigation Back */}
                        <Link 
                            href="/forum" 
                            className="inline-flex items-center gap-3 text-slate-500 dark:text-white/40 hover:text-[#D4A853] transition-all font-black group px-6 py-3 bg-white dark:bg-white/5 rounded-2xl shadow-sm hover:shadow-md"
                        >
                            <svg className="w-5 h-5 rtl:rotate-180 group-hover:-translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            {t('back_to_forum')}
                        </Link>

                        <article className="animate-content bg-white dark:bg-white/5 backdrop-blur-3xl rounded-[3rem] p-8 md:p-16 border border-slate-100 dark:border-white/5 shadow-2xl dark:shadow-none relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4A853]/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                            
                            <header className="mb-12">
                                <div className="flex items-center gap-4 mb-8">
                                    <span className="px-4 py-1.5 rounded-full bg-[#D4A853]/10 text-[#D4A853] text-[10px] font-black uppercase tracking-[0.2em]">{post.category}</span>
                                    {post.tags?.map((tag: string) => (
                                        <span key={tag} className="text-slate-400 dark:text-white/20 text-[10px] font-bold uppercase tracking-widest hover:text-[#D4A853] cursor-pointer">#{tag}</span>
                                    ))}
                                </div>
                                <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-8 leading-tight tracking-tight italic">
                                    {post.title}
                                </h1>
                                <div className="flex items-center gap-6 p-6 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-white/10">
                                    <div className="w-16 h-16 rounded-2xl bg-[#D4A853] flex items-center justify-center text-4xl shadow-lg shadow-[#D4A853]/20">
                                        {post.avatar}
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-xl font-black text-slate-900 dark:text-white">{post.author}</div>
                                        <div className="text-sm text-slate-500 dark:text-white/40 font-bold uppercase tracking-widest">{post.date}</div>
                                    </div>
                                </div>
                            </header>

                            <div className="text-xl md:text-2xl text-slate-600 dark:text-white/80 leading-relaxed font-medium mb-12 border-r-4 border-[#D4A853] pr-8 italic">
                                {post.content}
                            </div>

                            <div className="flex items-center gap-4 border-t border-slate-100 dark:border-white/5 pt-10">
                                <button 
                                    onClick={() => setIsLiked(!isLiked)}
                                    className={`flex items-center gap-4 px-8 py-4 rounded-2xl transition-all font-black text-lg ${isLiked ? 'bg-red-500/10 text-red-500 shadow-lg shadow-red-500/10' : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/60 hover:bg-slate-200 dark:hover:bg-white/10'}`}
                                >
                                    <svg className={`w-7 h-7 ${isLiked ? 'fill-current' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    {isLiked ? post.likes + 1 : post.likes}
                                </button>
                                <button className="w-14 h-14 bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-white/20 rounded-2xl flex items-center justify-center hover:text-blue-500 transition-colors">
                                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                    </svg>
                                </button>
                            </div>
                        </article>

                        {/* Comments Section */}
                        <div className="space-y-12">
                            <h3 className="text-4xl font-black text-slate-900 dark:text-white flex items-center gap-4">
                                {t('replies_title')}
                                <span className="text-xl bg-[#D4A853] text-[#0F172A] px-5 py-1.5 rounded-2xl shadow-lg shadow-[#D4A853]/30">{comments.length}</span>
                            </h3>

                            <div className="space-y-8">
                                {comments.map((cmt) => (
                                    <div key={cmt.id} className="bg-white dark:bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] border border-slate-100 dark:border-white/5 shadow-xl dark:shadow-none hover:-translate-y-2 transition-all">
                                        <div className="flex gap-8">
                                            <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-[#0F172A] flex items-center justify-center text-4xl shrink-0 shadow-inner">
                                                {cmt.avatar}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-center mb-6">
                                                    <div>
                                                        <h5 className="text-xl font-black text-slate-900 dark:text-white mb-1">{cmt.author}</h5>
                                                        <span className="text-sm text-slate-500 dark:text-white/40 font-bold tracking-widest uppercase">{cmt.date}</span>
                                                    </div>
                                                    <button className="flex items-center gap-3 text-slate-400 dark:text-white/20 hover:text-red-500 transition-colors font-bold group">
                                                        <svg className="w-6 h-6 group-hover:scale-125 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                        </svg>
                                                        {cmt.likes}
                                                    </button>
                                                </div>
                                                <p className="text-xl text-slate-600 dark:text-white/70 leading-relaxed font-medium pr-4 border-r-2 border-slate-100 dark:border-white/10">
                                                    {cmt.content}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Reply Form */}
                            <div className="bg-gradient-to-br from-[#1e3a8a] to-[#0F172A] p-1 rounded-[3rem] shadow-3xl">
                                <div className="bg-[#0F172A] p-10 md:p-14 rounded-[2.9rem] relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4A853]/5 rounded-full blur-[100px]"></div>
                                    
                                    <h4 className="text-3xl font-black text-white mb-10 flex items-center gap-4">
                                        <div className="w-12 h-12 bg-[#D4A853]/20 rounded-xl flex items-center justify-center">
                                            <svg className="w-6 h-6 text-[#D4A853]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                            </svg>
                                        </div>
                                        شاركنا رأيك
                                    </h4>
                                    <form onSubmit={handleCommentSubmit} className="space-y-8">
                                        <div className="relative group">
                                            <textarea 
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                placeholder={t('comment_ph')}
                                                className="w-full min-h-[220px] bg-white/5 border border-white/10 rounded-[2.5rem] p-10 text-white focus:outline-none focus:ring-2 focus:ring-[#D4A853]/50 transition-all font-medium text-xl resize-none shadow-inner"
                                            ></textarea>
                                            <div className="absolute bottom-10 right-10 flex gap-3">
                                                {["🎓", "💡", "🧠", "🔥"].map(emoji => (
                                                    <button 
                                                        key={emoji}
                                                        type="button"
                                                        onClick={() => setComment(prev => prev + emoji)}
                                                        className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#D4A853] hover:text-[#0F172A] transition-all transform hover:scale-110 active:scale-90"
                                                    >
                                                        {emoji}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <button className="w-full h-20 bg-gradient-to-r from-[#D4A853] to-[#FFD700] text-[#0F172A] font-black rounded-3xl shadow-2xl shadow-[#D4A853]/20 hover:shadow-[#D4A853]/40 hover:-translate-y-1 active:scale-95 transition-all text-2xl flex items-center justify-center gap-4 group">
                                            {t('btn_reply')}
                                            <svg className="w-8 h-8 rtl:rotate-180 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Area */}
                    <div className="lg:col-span-4 animate-sidebar space-y-8">
                        <div className="bg-white dark:bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-slate-100 dark:border-white/5 shadow-2xl dark:shadow-none">
                            <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-8 border-b border-slate-100 dark:border-white/5 pb-6">عن كاتب المقال</h4>
                            <div className="flex flex-col items-center text-center">
                                <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-tr from-[#D4A853] to-[#FFD700] p-1 shadow-2xl mb-6">
                                    <div className="w-full h-full rounded-[2.2rem] bg-white dark:bg-[#0F172A] flex items-center justify-center text-6xl">
                                        {post.avatar}
                                    </div>
                                </div>
                                <h5 className="text-2xl font-black text-slate-900 dark:text-white mb-2">{post.author}</h5>
                                <p className="text-slate-500 dark:text-white/40 font-bold mb-8">عضو مميز • مدرب معتمد</p>
                                <div className="grid grid-cols-2 gap-4 w-full">
                                    <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-2xl text-center">
                                        <div className="text-slate-900 dark:text-white font-black">124</div>
                                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">منشور</div>
                                    </div>
                                    <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-2xl text-center">
                                        <div className="text-slate-900 dark:text-white font-black">5.2k</div>
                                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">إعجاب</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-[#D4A853] to-[#FFD700] p-10 rounded-[3rem] text-[#0F172A] shadow-2xl">
                            <h4 className="text-2xl font-black mb-6 flex items-center gap-3">
                                🚀 انضم إلينا
                            </h4>
                            <p className="font-bold text-lg mb-8 opacity-80 leading-relaxed">
                                هل ترغب في الحصول على استشارات تعليمية متخصصة؟ اشترك الآن في برامجنا التدريبية المتميزة.
                            </p>
                            <Link 
                                href="/programs" 
                                className="w-full h-14 bg-[#0F172A] text-white rounded-2xl flex items-center justify-center font-black hover:scale-105 transition-transform shadow-lg shadow-black/20"
                            >
                                تصفح البرامج
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
