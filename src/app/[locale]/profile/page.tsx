"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState, useRef } from "react";
import { Link } from "@/i18n/routing";
import { toast } from "@/components/ui/toast";
import gsap from "gsap";

export default function ProfilePage() {
    const t = useTranslations('Profile');
    const tf = useTranslations('Forum');
    
    const [userName, setUserName] = useState("");
    const [userAvatar, setUserAvatar] = useState("👤");
    const [userPosts, setUserPosts] = useState<any[]>([]);
    const [likedPostsCount, setLikedPostsCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const [bio, setBio] = useState("");
    const [location, setLocation] = useState("القاهرة، مصر");

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
                const currentName = name || "";
                const filtered = posts.filter((p: any) => p.author && p.author.trim() === currentName.trim());
                setUserPosts(filtered);

                // Load likes from localStorage (still local per user)
                const likesData = localStorage.getItem('forum_liked_posts');
                if (likesData) {
                    const likes = JSON.parse(likesData);
                    setLikedPostsCount(likes.length);
                }

                const savedBio = localStorage.getItem('profile_bio');
                if (savedBio) setBio(savedBio);
                const savedLoc = localStorage.getItem('profile_location');
                if (savedLoc) setLocation(savedLoc);
            } catch (e) {
                console.error("Error loading profile data:", e);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userName]);

    useEffect(() => {
        if (!loading) {
            gsap.fromTo(".profile-anim", 
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
            );
        }
    }, [loading]);

    const handleUpdateProfile = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const newName = (form.elements.namedItem('username') as HTMLInputElement).value;
        const newBio = (form.elements.namedItem('bio') as HTMLTextAreaElement).value;
        
        if (!newName.trim()) return;
        
        localStorage.setItem('forum_user_name', newName);
        localStorage.setItem('profile_bio', newBio);
        setUserName(newName);
        setBio(newBio);
        window.dispatchEvent(new Event('profile-update'));
        toast.success(t('update_success'));
    };

    const handleAvatarChange = (emoji: string) => {
        localStorage.setItem('forum_user_avatar', emoji);
        setUserAvatar(emoji);
        window.dispatchEvent(new Event('profile-update'));
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
        <main className="min-h-screen bg-slate-50 dark:bg-[#0F172A] pt-36 pb-24 px-4 overflow-hidden" ref={containerRef}>
            <div className="max-w-5xl mx-auto space-y-12">
                {/* Profile Hero Section */}
                <div className="profile-anim relative bg-[#1e3a8a] dark:bg-[#1e293b] rounded-[3.5rem] p-8 md:p-14 shadow-2xl shadow-blue-900/20 overflow-hidden isolate">
                    {/* Decorative Mesh Background */}
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4A853]/10 rounded-full blur-[100px] -mr-40 -mt-40 animate-pulse"></div>
                        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[80px] -ml-20 -mb-20"></div>
                        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#D4A853 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                    </div>

                    <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
                        {/* Avatar Column */}
                        <div className="relative shrink-0 group/avatar">
                            <div className="w-40 h-40 md:w-56 md:h-56 rounded-[3.5rem] bg-white/10 backdrop-blur-xl border-2 border-white/20 flex items-center justify-center text-7xl md:text-9xl shadow-2xl relative transition-all duration-500 group-hover/avatar:scale-105 group-hover/avatar:rotate-3">
                                <span className="drop-shadow-2xl">{userAvatar}</span>
                                
                                {/* Status Ring */}
                                <div className="absolute -inset-2 border-2 border-dashed border-[#D4A853]/30 rounded-[4rem] animate-[spin_20s_linear_infinite]"></div>
                            </div>
                            
                            {/* Quick Avatar Picker */}
                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2 p-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 opacity-0 scale-90 group-hover/avatar:opacity-100 group-hover/avatar:scale-100 transition-all duration-300">
                                {["👨‍🎓", "👩‍🎓", "👨‍🏫", "👩‍🏫", "👨‍💻", "👩‍💻", "🌟"].map(e => (
                                    <button 
                                        key={e} 
                                        onClick={() => handleAvatarChange(e)} 
                                        className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all text-xl ${userAvatar === e ? 'bg-[#D4A853] scale-110 shadow-lg' : 'hover:bg-slate-100 dark:hover:bg-white/5'}`}
                                    >
                                        {e}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Info Column */}
                        <div className="flex-1 text-center lg:text-right text-white space-y-6">
                            <div className="space-y-2">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4A853] text-[#1e3a8a] text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-[#D4A853]/20">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                    عضو مميز • مدرب معتمد
                                </div>
                                <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                                    {userName || t('subtitle')}
                                </h1>
                                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-white/60 font-bold text-sm">
                                    <span className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-[#D4A853]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                        {location}
                                    </span>
                                    <span className="w-1 h-1 rounded-full bg-white/20"></span>
                                    <span className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-[#D4A853]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        انضم في مارس 2026
                                    </span>
                                </div>
                            </div>

                            <p className="text-white/70 font-medium max-w-2xl mx-auto lg:mr-0 text-lg leading-relaxed italic">
                                "{bio || t('bio')}"
                            </p>

                            {/* Stats Display */}
                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-6">
                                {[
                                    { label: t('posts_count'), val: userPosts.length, icon: "📝", color: "from-blue-500/20" },
                                    { label: t('likes_count'), val: likedPostsCount, icon: "❤️", color: "from-[#D4A853]/20" },
                                    { label: t('certs_count'), val: 0, icon: "📜", color: "from-emerald-500/20" }
                                ].map((s, idx) => (
                                    <div key={idx} className={`bg-white/10 backdrop-blur-xl border border-white/10 p-4 rounded-3xl min-w-[120px] shadow-xl group/stat hover:-translate-y-2 transition-all duration-300 bg-gradient-to-br ${s.color} to-transparent`}>
                                        <div className="text-3xl font-black text-[#D4A853] mb-1 group-hover/stat:scale-110 transition-transform">{s.val}</div>
                                        <div className="flex items-center gap-2 justify-center lg:justify-start opacity-60">
                                            <span className="text-xs">{s.icon}</span>
                                            <span className="text-[10px] uppercase tracking-widest font-black whitespace-nowrap">{s.label}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                    {/* Sidebar / Settings */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="profile-anim bg-white dark:bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 border border-slate-200 dark:border-white/10 shadow-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4A853]/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform"></div>
                            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                <span className="text-[#D4A853]">⚙️</span> {t('settings')}
                            </h3>
                            <form onSubmit={handleUpdateProfile} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">{t('change_name')}</label>
                                    <input 
                                        name="username"
                                        type="text" 
                                        defaultValue={userName}
                                        placeholder={t('subtitle')}
                                        className="w-full h-14 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-[#D4A853]/50 outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">نبذة شخصية (Bio)</label>
                                    <textarea 
                                        name="bio"
                                        defaultValue={bio}
                                        placeholder="اكتب شيئاً عن نفسك..."
                                        className="w-full min-h-[120px] bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 text-sm font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-[#D4A853]/50 outline-none transition-all resize-none"
                                    ></textarea>
                                </div>
                                <button className="w-full py-4 bg-[#D4A853] text-[#0F172A] font-black rounded-2xl shadow-xl shadow-[#D4A853]/20 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                                    {t('save_changes')}
                                </button>
                            </form>
                        </div>

                        <div className="profile-anim bg-gradient-to-br from-[#D4A853] to-[#FFD700] rounded-[2.5rem] p-8 text-[#0F172A] shadow-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                            <div className="relative z-10">
                                <div className="text-4xl mb-4">🏆</div>
                                <h3 className="text-xl font-black mb-4">{t('get_certs_title')}</h3>
                                <p className="text-[#0F172A]/70 text-sm font-bold mb-6 leading-relaxed">
                                    {t('get_certs_desc')}
                                </p>
                                <Link href="/programs" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0F172A] text-white font-black rounded-xl text-sm hover:gap-4 transition-all">
                                    {t('explore_programs')}
                                    <span>→</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* My Posts */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="flex items-center justify-between px-4">
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white">{t('my_posts')}</h3>
                            <Link href="/forum" className="text-sm font-bold text-[#D4A853] hover:underline flex items-center gap-2">
                                {t('go_to_forum')}
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                            </Link>
                        </div>

                        <div className="profile-anim space-y-6">
                            {userPosts.length === 0 ? (
                                <div className="bg-white dark:bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-16 text-center border border-dashed border-slate-300 dark:border-white/10 group hover:border-[#D4A853]/50 transition-all overflow-hidden relative">
                                    <div className="absolute -top-12 -left-12 w-32 h-32 bg-[#D4A853]/5 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
                                    <div className="text-7xl mb-8 animate-bounce">✍️</div>
                                    <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-4">لم تنشر أي مواضيع بعد</h4>
                                    <p className="text-slate-500 dark:text-white/40 font-bold mb-8 max-w-sm mx-auto">{t('no_posts')}</p>
                                    <Link href="/forum" className="px-10 py-4 bg-[#D4A853] text-[#0F172A] rounded-2xl font-black hover:shadow-2xl hover:shadow-[#D4A853]/40 hover:-translate-y-1 transition-all inline-flex items-center gap-3">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                                        {t('start_first_post')}
                                    </Link>
                                </div>
                            ) : (
                                userPosts.map(post => (
                                    <div key={post.id} className="bg-white dark:bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-100 dark:border-white/10 hover:border-[#D4A853]/50 hover:shadow-2xl hover:shadow-[#D4A853]/5 transition-all group relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-1.5 h-full bg-[#D4A853] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="flex items-center gap-3">
                                                <span className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-[#0F172A] flex items-center justify-center text-2xl border border-slate-100 dark:border-white/5 shadow-inner">{post.avatar || "📄"}</span>
                                                <span className="px-3 py-1 rounded-full bg-[#D4A853]/10 text-[#D4A853] text-[10px] font-black uppercase tracking-widest">{post.category}</span>
                                            </div>
                                            <span className="text-[10px] font-bold text-slate-400 flex items-center gap-2 bg-slate-50 dark:bg-white/5 px-3 py-1.5 rounded-full">
                                                <svg className="w-3.5 h-3.5 text-[#D4A853]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                {new Date(post.date).toLocaleDateString('ar-EG', { day: 'numeric', month: 'long' })}
                                            </span>
                                        </div>
                                        <Link href={`/forum/${post.id}`}>
                                            <h4 className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-[#D4A853] transition-colors mb-6 leading-tight line-clamp-2">{post.title}</h4>
                                        </Link>
                                        <div className="flex items-center gap-8">
                                            <div className="flex items-center gap-2 text-slate-400 font-black group-hover:text-red-500 transition-colors">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
                                                <span className="text-sm tracking-tighter">{post.likes}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-400 font-black group-hover:text-blue-500 transition-colors">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zm-4 0H9v2h2V9z" clipRule="evenodd" /></svg>
                                                <span className="text-sm tracking-tighter">{post.replies}</span>
                                            </div>
                                            <div className="mr-auto rtl:mr-auto ltr:ml-auto">
                                                <Link href={`/forum/${post.id}`} className="inline-flex items-center gap-2 px-5 py-2 bg-slate-50 dark:bg-white/5 text-[#D4A853] rounded-xl text-xs font-black hover:bg-[#D4A853] hover:text-white transition-all uppercase tracking-widest group/btn">
                                                    اقرأ المزيد 
                                                    <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                                                </Link>
                                            </div>
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
