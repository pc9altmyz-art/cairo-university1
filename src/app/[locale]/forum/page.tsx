"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import Link from "next/link";

export default function ForumPage() {
    const t = useTranslations('Forum');
    const [activeTab, setActiveTab] = useState("all");

    // Mock data for posts
    const posts = [
        {
            id: 1,
            title: "كيف أبدأ في مجال التربية الخاصة؟",
            author: "د. أحمد علي",
            category: "التربية الخاصة",
            replies: 12,
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
            views: 890,
            date: "أمس",
            avatar: "👨‍💻"
        }
    ];

    return (
        <div className="min-h-screen bg-[#0F172A] pt-28 pb-20">
            <div className="container mx-auto px-4">
                {/* Hero Header */}
                <div className="mb-12 rtl:text-right ltr:text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                        <span className="w-2 h-2 rounded-full bg-[#D4A853]"></span>
                        <span className="text-xs font-bold uppercase tracking-widest text-[#D4A853]">{t('badge')}</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
                        {t('title1')} <span className="text-[#D4A853]">{t('title_hl')}</span>
                    </h1>
                    <p className="text-white/60 text-lg max-w-2xl">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar - Categories */}
                    <div className="lg:col-span-1 space-y-6 order-2 lg:order-1">
                        <div className="premium-glass p-6 rounded-3xl border border-white/5">
                            <h3 className="text-xl font-black text-white mb-6">{t('categories_title')}</h3>
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
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold ${activeTab === cat.id ? 'bg-[#D4A853] text-[#0F172A]' : 'text-white/60 hover:bg-white/5'}`}
                                    >
                                        <span>{cat.icon}</span>
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="premium-glass p-6 rounded-3xl border border-white/5 bg-gradient-to-br from-[#D4A853]/10 to-transparent">
                            <h4 className="text-white font-black mb-4 uppercase tracking-tighter text-sm">أحصائيات سريعة</h4>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-white/40 font-medium">إجمالي المواضيع</span>
                                    <span className="text-white font-black">1,240</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-white/40 font-medium">الأعضاء</span>
                                    <span className="text-white font-black">5,820</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content - Post List */}
                    <div className="lg:col-span-3 space-y-6 order-1 lg:order-2">
                        {/* Search and Action Bar */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <input 
                                    type="text" 
                                    placeholder={t('search_ph')}
                                    className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-12 text-white focus:outline-none focus:ring-2 focus:ring-[#D4A853]/50"
                                />
                                <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <button className="h-14 px-8 bg-[#D4A853] text-[#0F172A] font-black rounded-2xl shadow-lg hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                                </svg>
                                {t('btn_new_post')}
                            </button>
                        </div>

                        {/* Posts List */}
                        <div className="space-y-4">
                            {posts.map((post) => (
                                <div key={post.id} className="premium-glass p-6 md:p-8 rounded-[2rem] border border-white/5 hover:border-[#D4A853]/30 transition-all group">
                                    <div className="flex gap-6 items-start">
                                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/5 flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform">
                                            {post.avatar}
                                        </div>
                                        <div className="flex-1 min-w-0 rtl:text-right ltr:text-left">
                                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                                                <span className="px-3 py-1 rounded-full bg-[#D4A853]/10 text-[#D4A853] text-[10px] font-black uppercase tracking-widest">{post.category}</span>
                                                <span className="text-white/20 text-xs font-bold">•</span>
                                                <span className="text-white/40 text-xs font-bold">{post.date}</span>
                                            </div>
                                            <h2 className="text-xl md:text-2xl font-black text-white mb-4 group-hover:text-[#D4A853] transition-colors line-clamp-2">
                                                <Link href={`/forum/${post.id}`}>{post.title}</Link>
                                            </h2>
                                            <div className="flex items-center gap-6 text-white/40 text-sm font-bold">
                                                <span className="flex items-center gap-2">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                                    </svg>
                                                    {post.replies} رد
                                                </span>
                                                <span className="flex items-center gap-2">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                    {post.views} مشاهدة
                                                </span>
                                                <span className="font-bold text-[#D4A853]/60 mr-auto">بواسطة {post.author}</span>
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
