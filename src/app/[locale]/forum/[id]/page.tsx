"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect, useRef } from "react";
import { Link } from "@/i18n/routing";
import gsap from "gsap";
import { useParams } from "next/navigation";
import { getTimeAgo } from "@/lib/date-utils";
import { useLocale } from "next-intl";
import { toast } from "@/components/ui/toast";
import { MarkdownText } from "@/components/markdown-text";

export default function PostDetailPage() {
    const t = useTranslations('Forum');
    const locale = useLocale();
    const params = useParams();
    const id = params?.id;

    const [commentAuthor, setCommentAuthor] = useState("");
    const [commentAvatar, setCommentAvatar] = useState("👨‍🎓");
    const [comment, setComment] = useState("");
    const [isLiked, setIsLiked] = useState(false);
    const [readingProgress, setReadingProgress] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Post data
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState<any[]>([]);

    useEffect(() => {
        if (!id) return;
        const postId = Array.isArray(id) ? id[0] : id;

        const loadPostData = async () => {
            try {
                const res = await fetch('/api/forum');
                const allPosts = await res.json();
                const currentPost = allPosts.find((p: any) => String(p.id) === String(postId));

                if (currentPost) {
                    setPost(currentPost);
                    setComments(currentPost.comments || []);

                    // Increment view count
                    fetch('/api/forum', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ action: 'view', id: postId })
                    });
                }
            } catch (error) {
                console.error("Failed to load post:", error);
            } finally {
                setLoading(false);
            }
        };

        loadPostData();

        // Load saved name and avatar
        const savedName = localStorage.getItem('forum_user_name');
        const savedAvatar = localStorage.getItem('forum_user_avatar');
        if (savedName) setCommentAuthor(savedName);
        if (savedAvatar) setCommentAvatar(savedAvatar);

        // Load Like Status
        const savedLikes = localStorage.getItem('forum_liked_posts');
        if (savedLikes) {
            try {
                const likedIds = JSON.parse(savedLikes);
                if (Array.isArray(likedIds)) {
                    setIsLiked(likedIds.map(String).includes(String(postId)));
                }
            } catch (e) {}
        }
    }, [id]);

    const handleLikeToggle = async () => {
        if (!post || !id) return;
        const postId = Array.isArray(id) ? id[0] : id;
        const isAlreadyLiked = isLiked;

        setIsLiked(!isAlreadyLiked);
        setPost(prev => ({ ...prev, likes: isAlreadyLiked ? prev.likes - 1 : prev.likes + 1 }));

        const savedLikes = localStorage.getItem('forum_liked_posts');
        let likedIds: any[] = [];
        if (savedLikes) {
            try { likedIds = JSON.parse(savedLikes); } catch (e) { }
        }

        if (!isAlreadyLiked) {
            if (!likedIds.includes(postId)) likedIds.push(postId);
        } else {
            likedIds = likedIds.filter(lid => String(lid) !== String(postId));
        }
        localStorage.setItem('forum_liked_posts', JSON.stringify(likedIds));

        try {
            await fetch('/api/forum', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'like', id: postId, increment: !isAlreadyLiked })
            });
        } catch (e) {
            console.error("Like sync failed");
        }
    };

    const handleAddComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!commentAuthor.trim() || !comment.trim()) {
            toast.error("يرجى ملء جميع الحقول المطلوبة للتعليق.");
            return;
        }

        const postId = Array.isArray(id) ? id[0] : id;
        const commentData = {
            author: commentAuthor,
            content: comment,
            avatar: commentAvatar,
        };

        try {
            const res = await fetch('/api/forum', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'comment', postId, comment: commentData })
            });
            const { comment: newComment } = await res.json();

            setComments(prev => [...prev, newComment]);
            localStorage.setItem('forum_user_name', commentAuthor);
            localStorage.setItem('forum_user_avatar', commentAvatar);
            setComment("");

            toast.success("تمت إضافة تعليقك بنجاح! 💬");
        } catch (e) {
            toast.error("فشل إضافة التعليق");
        }
    };

    const handleDeleteComment = async (commentId: string | number) => {
        if (!confirm("هل أنت متأكد من حذف هذا التعليق؟")) return;
        const postId = Array.isArray(id) ? id[0] : id;

        try {
            await fetch('/api/forum', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'deleteComment', postId, commentId })
            });
            setComments(prev => prev.filter(c => String(c.id) !== String(commentId)));
            toast.info("تم حذف التعليق.");
        } catch (e) {
            toast.error("فشل حذف التعليق");
        }
    };

    const toggleCommentLike = async (commentId: number | string) => {
        const postId = Array.isArray(id) ? id[0] : id;
        const cmt = comments.find(c => String(c.id) === String(commentId));
        if (!cmt) return;

        const isAlreadyLiked = cmt.liked;

        setComments(prev => prev.map(c => {
            if (String(c.id) === String(commentId)) {
                return { ...c, likes: isAlreadyLiked ? c.likes - 1 : c.likes + 1, liked: !isAlreadyLiked };
            }
            return c;
        }));

        try {
            await fetch('/api/forum', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'likeComment', postId, commentId, increment: !isAlreadyLiked })
            });
        } catch (e) {
            console.error("Comment like sync failed");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-[#0F172A] flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-[#D4A853] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-[#0F172A] flex flex-col items-center justify-center p-4 text-center">
                <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-6">الموضوع غير موجود</h2>
                <Link href="/forum" className="px-8 py-4 bg-[#D4A853] text-[#0F172A] font-black rounded-2xl shadow-xl">العودة للمنتدى</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0F172A] pt-40 md:pt-48 pb-20 transition-colors duration-500" ref={containerRef}>
            <div className="fixed top-0 left-0 h-1.5 bg-gradient-to-r from-[#D4A853] to-[#FFD700] z-[100] transition-all duration-300" style={{ width: `${readingProgress}%` }}></div>

            <div className="container mx-auto px-4 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8 space-y-12">
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
                                        {post.avatar || "👤"}
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-xl font-black text-slate-900 dark:text-white">{post.author}</div>
                                        <div className="text-sm text-slate-500 dark:text-white/40 font-bold uppercase tracking-widest">{getTimeAgo(post.date, locale)}</div>
                                    </div>
                                </div>
                            </header>

                            <div className="text-xl md:text-2xl text-slate-600 dark:text-white/80 leading-relaxed font-medium mb-12 border-r-4 border-[#D4A853] pr-8 italic">
                                <MarkdownText text={post.content} />
                            </div>

                            <div className="flex items-center gap-4 border-t border-slate-100 dark:border-white/5 pt-10">
                                <button
                                    onClick={handleLikeToggle}
                                    className={`flex items-center gap-4 px-8 py-4 rounded-2xl transition-all font-black text-lg ${isLiked ? 'bg-red-500/10 text-red-500 shadow-lg shadow-red-500/10' : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/60 hover:bg-slate-200 dark:hover:bg-white/10'}`}
                                >
                                    <svg className={`w-7 h-7 ${isLiked ? 'fill-current' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    {isLiked ? post.likes + 1 : post.likes}
                                </button>
                            </div>
                        </article>

                        <div className="space-y-12">
                            <h3 className="text-4xl font-black text-slate-900 dark:text-white flex items-center gap-4">
                                {t('replies_title')}
                                <span className="text-xl bg-[#D4A853] text-[#0F172A] px-5 py-1.5 rounded-2xl shadow-lg shadow-[#D4A853]/30">{comments.length}</span>
                            </h3>

                            <div className="space-y-8">
                                {comments.map((cmt) => (
                                    <div key={cmt.id} className="bg-white dark:bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] border border-slate-100 dark:border-white/5 shadow-xl dark:shadow-none hover:-translate-y-2 transition-all">
                                        <div className="flex gap-8">
                                            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-2xl shrink-0">
                                                {cmt.avatar || "👤"}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-center mb-6">
                                                    <div>
                                                        <h5 className="text-xl font-black text-slate-900 dark:text-white mb-1">{cmt.author}</h5>
                                                        <span className="text-sm text-slate-500 dark:text-white/40 font-bold tracking-widest uppercase">{getTimeAgo(cmt.date, locale)}</span>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <button
                                                            onClick={() => toggleCommentLike(cmt.id)}
                                                            className={`flex items-center gap-3 transition-colors font-bold group ${cmt.liked ? 'text-red-500' : 'text-slate-400 dark:text-white/20 hover:text-red-500'}`}
                                                        >
                                                            <svg className={`w-6 h-6 group-hover:scale-125 transition-transform ${cmt.liked ? 'fill-current' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                            </svg>
                                                            {cmt.likes}
                                                        </button>

                                                        {typeof cmt.id === 'string' && cmt.id.startsWith('comment-') && (
                                                            <button
                                                                onClick={() => handleDeleteComment(cmt.id)}
                                                                className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                                            >
                                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="text-xl text-slate-600 dark:text-white/70 leading-relaxed font-medium pr-4 border-r-2 border-slate-100 dark:border-white/10">
                                                    <MarkdownText text={cmt.content} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-gradient-to-br from-[#1e3a8a] to-[#0F172A] p-1 rounded-[3rem] shadow-3xl">
                                <div className="bg-[#0F172A] p-10 md:p-14 rounded-[2.9rem] relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4A853]/5 rounded-full blur-[100px]"></div>

                                    <h4 className="text-3xl font-black text-white mb-10 flex items-center gap-4">
                                        <div className="w-12 h-12 bg-[#D4A853]/20 rounded-xl flex items-center justify-center">
                                            <svg className="w-6 h-6 text-[#D4A853]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                            </svg>
                                        </div>
                                        {t('share_opinion')}
                                    </h4>
                                    <form onSubmit={handleAddComment} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-black text-slate-400 dark:text-white/20 uppercase tracking-widest px-2">{t('author_name_label')}</label>
                                                <input
                                                    type="text"
                                                    value={commentAuthor}
                                                    onChange={(e) => setCommentAuthor(e.target.value)}
                                                    placeholder={t('author_name_ph')}
                                                    className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-white focus:outline-none focus:ring-2 focus:ring-[#D4A853]/50 transition-all font-bold"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-black text-slate-400 dark:text-white/20 uppercase tracking-widest px-2">الصورة الرمزية (Avatar)</label>
                                                <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-2xl overflow-x-auto hide-scrollbar">
                                                    {["👨‍🎓", "👩‍🎓", "👨‍🏫", "👩‍🏫", "👨‍💻", "👩‍💻", "👤", "🌟"].map(emoji => (
                                                        <button
                                                            key={emoji}
                                                            type="button"
                                                            onClick={() => setCommentAvatar(emoji)}
                                                            className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center text-2xl transition-all ${commentAvatar === emoji ? 'bg-[#D4A853] shadow-lg scale-110' : 'hover:bg-white/10'}`}
                                                        >
                                                            {emoji}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative group">
                                            <label className="text-sm font-black text-white/40 uppercase tracking-widest px-2">{t('post_content_label')}</label>
                                            <textarea
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                placeholder={t('comment_ph')}
                                                className="w-full min-h-[180px] bg-white/5 border border-white/10 rounded-[2.5rem] p-10 text-white focus:outline-none focus:ring-2 focus:ring-[#D4A853]/50 transition-all font-medium text-xl resize-none shadow-inner"
                                                required
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

                    <div className="lg:col-span-4 animate-sidebar space-y-8">
                        <div className="bg-white dark:bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-slate-100 dark:border-white/5 shadow-2xl dark:shadow-none">
                            <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-8 border-b border-slate-100 dark:border-white/5 pb-6">{t('about_author')}</h4>
                            <div className="flex flex-col items-center text-center">
                                <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-tr from-[#D4A853] to-[#FFD700] p-1 shadow-2xl mb-6">
                                    <div className="w-full h-full rounded-[2.2rem] bg-white dark:bg-[#0F172A] flex items-center justify-center text-6xl">
                                        {post.avatar || "👤"}
                                    </div>
                                </div>
                                <h5 className="text-2xl font-black text-slate-900 dark:text-white mb-2">{post.author}</h5>
                                <p className="text-slate-500 dark:text-white/40 font-bold mb-8">{t('author_badge')}</p>
                                <div className="grid grid-cols-2 gap-4 w-full">
                                    <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-2xl text-center">
                                        <div className="text-slate-900 dark:text-white font-black">124</div>
                                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{t('author_stat_posts')}</div>
                                    </div>
                                    <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-2xl text-center">
                                        <div className="text-slate-900 dark:text-white font-black">5.2k</div>
                                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{t('author_stat_likes')}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
