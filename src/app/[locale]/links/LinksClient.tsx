"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function LinksClient() {
    const t = useTranslations('LinksPage');

    // Grouping Links into Categories
    const categories = [
        {
            id: "facebook",
            label: "صفحات الفيسبوك", // We can add these to translations later, hardcoded for visual testing
            icon: "facebook",
            color: "from-blue-600 to-blue-400",
            links: [
                { href: "https://www.facebook.com/Ain.Shams.University.Programs", label: "الحساب الرسمي للبرامج" },
                { href: "https://www.facebook.com/profile.php?id=100054564183720", label: "المركز التدريبي الأول" },
                { href: "https://www.facebook.com/profile.php?id=100046440866348", label: "المركز التدريبي الثاني" }
            ]
        },
        {
            id: "instagram",
            label: "حسابات الإنستجرام",
            icon: "instagram",
            color: "from-pink-500 via-red-500 to-yellow-500",
            links: [
                { href: "https://www.instagram.com/ainshams.university.programs", label: "الإنستجرام الرسمي" },
                { href: "https://www.instagram.com/ainshams.univ.programs", label: "حساب البرامج التفاعلي" },
                { href: "https://www.instagram.com/ainshams.teachers.programs", label: "برامج إعداد المعلم" }
            ]
        },
        {
            id: "whatsapp",
            label: "التواصل المباشر (واتساب)",
            icon: "whatsapp",
            color: "from-emerald-500 to-emerald-400",
            links: [
                { href: siteConfig.links.whatsapp, label: "واتساب خدمة العملاء" }
            ]
        }
    ];

    const [openCategory, setOpenCategory] = useState<string | null>(null);

    const toggleCategory = (id: string) => {
        setOpenCategory(prev => prev === id ? null : id);
    };

    const getIconPath = (type: string) => {
        switch (type) {
            case "facebook":
                return <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />;
            case "instagram":
                return (
                    <>
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </>
                );
            case "whatsapp":
                return <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />;
            default: return null;
        }
    };

    return (
        <main className="min-h-screen relative flex items-start justify-center py-20 px-4 overflow-hidden bg-[#0F172A] rtl:text-right ltr:text-left">
            {/* Dark Premium Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#172554] via-[#0F172A] to-[#0A0F1D] z-0" />
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#D4A853]/10 blur-[100px] z-0 pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#1e3a8a]/20 blur-[100px] z-0 pointer-events-none" />
            <div className="absolute inset-0 opacity-[0.03] z-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#D4A853 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

            <div className="relative z-10 w-full max-w-xl mt-8 md:mt-12 mx-auto">
                {/* Header Profile */}
                <div className="flex flex-col items-center mb-10 text-center animate-fade-in-up">
                    <div className="relative w-28 h-28 md:w-32 md:h-32 mb-6 group">
                        <div className="absolute inset-[-10%] bg-gradient-to-tr from-[#D4A853] via-[#D4A853]/50 to-transparent blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 rounded-full" />
                        <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-[2rem] md:rounded-[2.5rem] border border-white/20 shadow-2xl flex items-center justify-center overflow-hidden rotate-3 group-hover:rotate-0 transition-transform duration-500 z-10">
                            <Image 
                                src="/logo.png"
                                alt={siteConfig.name}
                                fill
                                className="object-cover scale-110"
                                unoptimized
                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                            />
                            <span className="font-serif font-black text-3xl text-[#D4A853] absolute -z-10">EISCE</span>
                        </div>
                    </div>
                    
                    <h1 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight drop-shadow-md">
                        {t('title')}
                    </h1>
                    <p className="text-slate-300 text-sm md:text-base mb-4 max-w-[280px] md:max-w-xs mx-auto">
                        {t('subtitle')}
                    </p>
                    <div className="inline-flex px-3 py-1 bg-white/5 border border-[#D4A853]/30 rounded-full backdrop-blur-sm text-[#D4A853] text-[10px] font-bold uppercase tracking-widest">
                        {t('follow_us')}
                    </div>
                </div>

                {/* Categories Accordion */}
                <div className="flex flex-col gap-4">
                    {categories.map((cat, i) => {
                        const isOpen = openCategory === cat.id;

                        return (
                            <div 
                                key={cat.id} 
                                className={"relative w-full rounded-2xl overflow-hidden animate-fade-in-up transition-all duration-500 border border-white/10 " + (isOpen ? "bg-white/[0.08]" : "bg-white/[0.03] backdrop-blur-md hover:bg-white/[0.05]")}
                                style={{ animationDelay: \`\${i * 100}ms\` }}
                            >
                                {/* Category Header Button */}
                                <button
                                    onClick={() => toggleCategory(cat.id)}
                                    className="w-full flex items-center justify-between p-5 relative z-10 group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={\`w-10 h-10 rounded-xl bg-gradient-to-tr \${cat.color} flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110\`}>
                                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                {getIconPath(cat.icon)}
                                            </svg>
                                        </div>
                                        <span className="text-lg font-bold text-white tracking-wide">
                                            {cat.label}
                                        </span>
                                    </div>
                                    <div className={\`w-8 h-8 rounded-full flex items-center justify-center text-white/50 transition-all duration-300 \${isOpen ? 'bg-white/10 rotate-180 text-white' : 'group-hover:bg-white/5'}\`}>
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </button>

                                {/* Links Dropdown Panel */}
                                <div 
                                    className={\`overflow-hidden transition-all duration-500 ease-in-out \${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}\`}
                                >
                                    <div className="px-5 pb-5 flex flex-col gap-3">
                                        {cat.links.map((link, j) => (
                                            <a 
                                                key={j}
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-between p-4 rounded-xl bg-black/20 hover:bg-black/40 border border-white/5 hover:border-[#D4A853]/50 transition-all duration-300 group"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4A853] opacity-50 group-hover:opacity-100 group-hover:scale-150 transition-all"></span>
                                                    <span className="text-sm font-medium text-white/80 group-hover:text-white">
                                                        {link.label}
                                                    </span>
                                                </div>
                                                <svg className="w-4 h-4 text-white/30 group-hover:text-[#D4A853] rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Return to Website Link */}
                    <Link 
                        href="/"
                        className="group relative h-14 w-full mt-4 flex items-center justify-center animate-fade-in-up"
                        style={{ animationDelay: \`\${categories.length * 100}ms\` }}
                    >
                        <span className="relative z-10 text-sm font-bold text-slate-400 group-hover:text-white transition-colors flex items-center gap-2">
                            <svg className="w-4 h-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            {t('website')}
                        </span>
                    </Link>
                </div>
            </div>

            <style jsx global>{\`
                @keyframes fade-in-up {
                    0% { opacity: 0; transform: translateY(20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    opacity: 0;
                }
            \`}</style>
        </main>
    );
}
