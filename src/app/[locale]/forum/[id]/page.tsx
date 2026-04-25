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
    const containerRef = useRef<HTMLDivElement>(null);

    // Mock single post data
    const post = {
        id: id,
        title: id === "1" ? "كيف أبدأ في مجال التربية الخاصة؟" : "موضوع منتدى",
        content: "السلام عليكم ورحمة الله وبركاته، أنا مهتم جداً بمجال التربية الخاصة وأريد معرفة الخطوات العملية للبدء في هذا المسار المهني. ما هي الدبلومات المطلوبة؟ وهل تنصحون ببرامج المؤسسة المبتدئة؟ جزاكم الله خيراً.",
        author: "د. أحمد علي",
        category: "التربية الخاصة",
        likes: 45,
        views: 450,
        date: "منذ ساعتين",
        avatar: "👨‍🏫"
    };

    // Mock comments data
    const [comments, setComments] = useState([
        {
            id: 1,
            author: "أ. مريم يوسف",
            content: "أهلاً بك دكتور أحمد. الخطوة الأولى دائماً هي فهم أنواع الإعاقات المختلفة. دبلومة التربية الخاصة الشاملة في المؤسسة هي نقطة انطلاق ممتازة جداً.",
            date: "منذ ساعة",
            avatar: "👩‍🏫",
            likes: 12
        },
        {
            id: 2,
            author: "محمد حسن",
            content: "أتفق مع أستاذة مريم، الجانب العملي في برامج المؤسسة هو ما يميزها فعلاً عن غيرها.",
            date: "منذ 30 دقيقة",
            avatar: "👨‍🎓",
            likes: 5
        }
    ]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".animate-fade-up", {
                opacity: 0,
                y: 20,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out"
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!comment.trim()) return;

        const newComment = {
            id: comments.length + 1,
            author: "أنت (زائر)",
            content: comment,
            date: "الآن",
            avatar: "👤",
            likes: 0
        };

        setComments([...comments, newComment]);
        setComment("");
        
        // Success animation or scroll to bottom
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0F172A] pt-28 pb-20 transition-colors duration-500">
            <div className="container mx-auto px-4 max-w-5xl" ref={containerRef}>
                {/* Navigation Back */}
                <Link 
                    href="/forum" 
                    className="inline-flex items-center gap-2 text-slate-500 dark:text-white/40 hover:text-[#D4A853] transition-colors mb-8 font-bold group"
                >
                    <svg className="w-5 h-5 rtl:rotate-180 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    {t('back_to_forum')}
                </Link>

                {/* Main Post Card */}
                <div className="animate-fade-up bg-white dark:bg-white/5 backdrop-blur-2xl p-8 md:p-12 rounded-[3rem] border border-slate-200 dark:border-white/5 shadow-2xl dark:shadow-none mb-12 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#D4A853] to-[#FFD700]"></div>
                    
                    <div className="flex flex-col gap-8">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-4xl shadow-inner">
                                {post.avatar}
                            </div>
                            <div>
                                <h4 className="text-xl font-black text-slate-900 dark:text-white">{post.author}</h4>
                                <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-white/40 font-bold uppercase tracking-widest">
                                    <span>{post.date}</span>
                                    <span>•</span>
                                    <span className="text-[#D4A853]">{post.category}</span>
                                </div>
                            </div>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
                            {post.title}
                        </h1>

                        <div className="text-lg md:text-xl text-slate-600 dark:text-white/70 leading-relaxed font-medium">
                            {post.content}
                        </div>

                        <div className="flex items-center gap-4 border-t border-slate-100 dark:border-white/5 pt-8">
                            <button 
                                onClick={() => setIsLiked(!isLiked)}
                                className={`flex items-center gap-3 px-6 py-3 rounded-2xl transition-all font-black ${isLiked ? 'bg-red-500/10 text-red-500' : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/60 hover:bg-slate-200 dark:hover:bg-white/10'}`}
                            >
                                <svg className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                {isLiked ? post.likes + 1 : post.likes}
                            </button>
                            
                            <div className="flex items-center gap-3 text-slate-400 dark:text-white/20 font-bold ml-auto">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                {post.views} مشاهدة
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="animate-fade-up space-y-8">
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                        {t('replies_title')}
                        <span className="text-lg bg-[#D4A853]/10 text-[#D4A853] px-3 py-1 rounded-full">{comments.length}</span>
                    </h3>

                    <div className="space-y-6">
                        {comments.map((cmt) => (
                            <div key={cmt.id} className="bg-white dark:bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-xl dark:shadow-none">
                                <div className="flex gap-6">
                                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-3xl shrink-0">
                                        {cmt.avatar}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-4">
                                            <div>
                                                <h5 className="font-black text-slate-900 dark:text-white">{cmt.author}</h5>
                                                <span className="text-xs text-slate-500 dark:text-white/40 font-bold">{cmt.date}</span>
                                            </div>
                                            <button className="flex items-center gap-2 text-slate-400 dark:text-white/20 hover:text-red-500 transition-colors">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                </svg>
                                                {cmt.likes}
                                            </button>
                                        </div>
                                        <p className="text-slate-600 dark:text-white/70 leading-relaxed font-medium">
                                            {cmt.content}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* New Comment Form */}
                    <div className="bg-white dark:bg-white/5 backdrop-blur-2xl p-8 md:p-10 rounded-[3rem] border border-slate-200 dark:border-white/5 shadow-2xl dark:shadow-none mt-12">
                        <h4 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                            <svg className="w-6 h-6 text-[#D4A853]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                            إضافة رد جديد
                        </h4>
                        <form onSubmit={handleCommentSubmit} className="space-y-6">
                            <textarea 
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder={t('comment_ph')}
                                className="w-full min-h-[150px] bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2rem] p-6 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4A853]/50 transition-all font-medium text-lg"
                            ></textarea>
                            <div className="flex justify-end">
                                <button className="px-10 py-4 bg-gradient-to-r from-[#D4A853] to-[#FFD700] text-[#0F172A] font-black rounded-2xl shadow-xl shadow-[#D4A853]/20 hover:shadow-[#D4A853]/40 hover:-translate-y-1 active:scale-95 transition-all">
                                    {t('btn_reply')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
