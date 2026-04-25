"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/routing";
import { toast } from "@/components/ui/toast";

export default function ProfilePage() {
    const t = useTranslations('Profile');
    const tf = useTranslations('Forum');
    
    const [userName, setUserName] = useState("");
    const [userAvatar, setUserAvatar] = useState("👤");
    const [userPosts, setUserPosts] = useState<any[]>([]);
    const [likedPostsCount, setLikedPostsCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            // Load user info from localStorage
            const name = localStorage.getItem('forum_user_name');
            const avatar = localStorage.getItem('forum_user_avatar');
            if (name) setUserName(name);
            if (avatar) setUserAvatar(avatar);

            try {
                // Load posts from server to count user's posts
                const res = await fetch('/api/forum');
                const posts = await res.json();
                const filtered = posts.filter((p: any) => p.author === name);
                setUserPosts(filtered);

                // Load likes from localStorage (still local per user)
                const likesData = localStorage.getItem('forum_liked_posts');
                if (likesData) {
                    const likes = JSON.parse(likesData);
                    setLikedPostsCount(likes.length);
                }
            } catch (e) {
                console.error("Error loading profile data:", e);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userName]);

    const handleUpdateName = (e: React.FormEvent) => {
        e.preventDefault();
        const newName = (e.currentTarget.elements.namedItem('username') as HTMLInputElement).value;
        if (!newName.trim()) return;
        
        localStorage.setItem('forum_user_name', newName);
        setUserName(newName);
        toast.success(t('update_success'));
    };

    const handleAvatarChange = (emoji: string) => {
        localStorage.setItem('forum_user_avatar', emoji);
        setUserAvatar(emoji);
        toast.success(t('update_success'));
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-[#0F172A] flex items-center justify-center pt-32">
                <div className="w-12 h-12 border-4 border-[#D4A853] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-[#0F172A] pt-36 pb-24 px-4">
            <div className="max-w-4xl mx-auto space-y-12">
                {/* Profile Hero */}
                <div className="bg-white dark:bg-white/5 backdrop-blur-2xl rounded-[3.5rem] border border-slate-200 dark:border-white/10 p-8 md:p-12 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#D4A853]/10 to-transparent rounded-full -mr-32 -mt-32 blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
                    
                    <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                        <div className="relative group/avatar">
                            <div className="w-32 h-32 md:w-44 md:h-44 rounded-[2.5rem] bg-slate-100 dark:bg-[#0F172A] flex items-center justify-center text-6xl md:text-8xl shadow-inner border border-slate-200 dark:border-white/10 relative transition-transform group-hover/avatar:scale-105">
                                {userAvatar}
                            </div>
                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-1 p-1.5 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-white/10 opacity-0 group-hover/avatar:opacity-100 transition-opacity">
                                {["👨‍🎓", "👩‍🎓", "👨‍🏫", "👤", "🌟"].map(e => (
                                    <button key={e} onClick={() => handleAvatarChange(e)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-lg">{e}</button>
                                ))}
                            </div>
                        </div>
                        
                        <div className="flex-1 text-center md:text-right space-y-4">
                            <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white">
                                {userName || t('subtitle')}
                            </h1>
                            <p className="text-slate-500 dark:text-white/40 font-bold max-w-lg">
                                {t('bio')}
                            </p>
                            
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-8 pt-4">
                                <div className="text-center md:text-right">
                                    <div className="text-2xl font-black text-[#D4A853]">{userPosts.length}</div>
                                    <div className="text-[10px] uppercase tracking-widest font-black text-slate-400">{t('posts_count')}</div>
                                </div>
                                <div className="w-px h-8 bg-slate-200 dark:bg-white/10 hidden md:block"></div>
                                <div className="text-center md:text-right">
                                    <div className="text-2xl font-black text-[#D4A853]">{likedPostsCount}</div>
                                    <div className="text-[10px] uppercase tracking-widest font-black text-slate-400">{t('likes_count')}</div>
                                </div>
                                <div className="w-px h-8 bg-slate-200 dark:bg-white/10 hidden md:block"></div>
                                <div className="text-center md:text-right">
                                    <div className="text-2xl font-black text-[#D4A853]">0</div>
                                    <div className="text-[10px] uppercase tracking-widest font-black text-slate-400">{t('certs_count')}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Sidebar / Settings */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-white dark:bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 border border-slate-200 dark:border-white/10 shadow-xl">
                            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6">{t('settings')}</h3>
                            <form onSubmit={handleUpdateName} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">{t('change_name')}</label>
                                    <input 
                                        name="username"
                                        type="text" 
                                        defaultValue={userName}
                                        className="w-full h-12 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-[#D4A853]/50 outline-none transition-all"
                                    />
                                </div>
                                <button className="w-full py-4 bg-[#D4A853] text-[#0F172A] font-black rounded-xl shadow-lg shadow-[#D4A853]/20 hover:-translate-y-1 transition-all active:scale-95">
                                    {t('save_changes')}
                                </button>
                            </form>
                        </div>

                        <div className="bg-gradient-to-br from-[#1e3a8a] to-[#0F172A] rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-xl font-black mb-4">{t('get_certs_title')}</h3>
                                <p className="text-white/70 text-sm font-bold mb-6 leading-relaxed">
                                    {t('get_certs_desc')}
                                </p>
                                <Link href="/programs" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#1e3a8a] font-black rounded-xl text-sm hover:gap-4 transition-all">
                                    {t('explore_programs')}
                                    <span>→</span>
                                </Link>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                        </div>
                    </div>

                    {/* My Posts */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between px-4">
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white">{t('my_posts')}</h3>
                            <Link href="/forum" className="text-sm font-bold text-[#D4A853] hover:underline">{t('go_to_forum')}</Link>
                        </div>

                        <div className="space-y-4">
                            {userPosts.length === 0 ? (
                                <div className="bg-white dark:bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-16 text-center border border-dashed border-slate-300 dark:border-white/10">
                                    <div className="text-6xl mb-4 opacity-20">✍️</div>
                                    <p className="text-slate-500 dark:text-white/40 font-bold mb-6">{t('no_posts')}</p>
                                    <Link href="/forum" className="px-8 py-3 bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white rounded-xl font-black hover:bg-[#D4A853] hover:text-white transition-all inline-block">{t('start_first_post')}</Link>
                                </div>
                            ) : (
                                userPosts.map(post => (
                                    <div key={post.id} className="bg-white dark:bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-slate-100 dark:border-white/10 hover:border-[#D4A853]/50 transition-all group">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="px-3 py-1 rounded-full bg-[#D4A853]/10 text-[#D4A853] text-[10px] font-black uppercase tracking-widest">{post.category}</span>
                                            <span className="text-[10px] font-bold text-slate-400">{new Date(post.date).toLocaleDateString('ar-EG')}</span>
                                        </div>
                                        <Link href={`/forum/${post.id}`}>
                                            <h4 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-[#D4A853] transition-colors mb-4 line-clamp-1">{post.title}</h4>
                                        </Link>
                                        <div className="flex items-center gap-6 text-slate-400 text-xs font-bold">
                                            <span className="flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                                {post.likes}
                                            </span>
                                            <span className="flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                                                {post.replies}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
