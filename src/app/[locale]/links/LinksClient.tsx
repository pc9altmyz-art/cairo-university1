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
            id: "founder",
            label: t('founder_name'),
            icon: "founder",
            color: "from-[#D4A853] to-[#B38B3F]",
            links: [
                { href: "https://www.instagram.com/hesham.refaat17?igsh=MTNmejRjbHRoeno2YQ==", label: t('founder_title') }
            ]
        },
        {
            id: "facebook",
            label: "صفحات الفيسبوك",
            icon: "facebook",
            color: "from-blue-600 to-blue-400",
            links: [
                { href: "https://www.facebook.com/AinShams.Univ.Programs/", label: t('fb_label1') },
                { href: "https://www.facebook.com/AinShams.Teachers.Programs/", label: t('fb_label2') },
                { href: "https://www.facebook.com/Ain.Shams.University.Programs", label: t('fb_label3') }
            ]
        },
        {
            id: "instagram",
            label: "حسابات الإنستجرام",
            icon: "instagram",
            color: "from-pink-500 via-red-500 to-yellow-500",
            links: [
                { href: "https://www.instagram.com/ainshams.univ.programs/?fbclid=IwY2xjawQzQq1leHRuA2FlbQIxMABicmlkETF4bjBsVDV4b3RxUUNQNmdvc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHtLiTagk-Vj9yi0RBHQNjKUPJ5AQH1-LcJrHDJnWTgF0cV568gJl45fBg87C_aem_q08NhKc6KKYtKSL6-Mpwug", label: t('ig_label1') },
                { href: "https://www.instagram.com/ainshams.teachers.programs?fbclid=IwY2xjawQ0flJleHRuA2FlbQIxMABicmlkETFXNlZiUHZCOENRcUxSZzFnc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHhw7kBEHkG-KLH_n2HnRF6WIOjpaXrrpeEdbD5cJpCPNUM9FVSFvAwF1lZpc_aem_6d3bDAwGY_tiDAJ7odX5aQ", label: t('ig_label2') },
                { href: "https://www.instagram.com/ainshams.university.programs?fbclid=IwY2xjawQzQrVleHRuA2FlbQIxMABicmlkETF4bjBsVDV4b3RxUUNQNmdvc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHl4om9M_ITlF0QSpTWWv84i3CPZomGOI9edznIA1yHogr635Kgml6GMVfR4y_aem_u3h505RD5CEQFLC3ZP1rrg", label: t('ig_label3') }
            ]
        },
        {
            id: "phone",
            label: t('phone_title'),
            icon: "phone",
            color: "from-blue-700 to-indigo-600",
            links: [
                { href: "tel:+201007006081", label: t('phone_edu_psych_special') + " (01007006081)" },
                { href: "tel:+201091010454", label: t('phone_edu') + " (01091010454)" },
                { href: "tel:+201093998000", label: t('phone_psych_special') + " (01093998000)" }
            ]
        },
        {
            id: "whatsapp",
            label: "التواصل المباشر (واتساب)",
            icon: "whatsapp",
            color: "from-emerald-500 to-emerald-400",
            links: [
                { href: siteConfig.links.whatsapp, label: t('whatsapp') }
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
            case "phone":
                return <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />;
            case "founder":
                return <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />;
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
                <div className="flex flex-col items-center mb-16 text-center animate-fade-in-up">
                    <div className="relative w-36 h-36 md:w-44 md:h-44 mb-8 group perspective-1000">
                        {/* Ultra-Premium Ambient Glow */}
                        <div className="absolute inset-[-15%] bg-[#D4A853]/20 rounded-full blur-[40px] animate-pulse group-hover:bg-[#D4A853]/30 transition-all duration-700" />
                        <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-[2.5rem] md:rounded-[3rem] border border-white/20 shadow-2xl flex items-center justify-center overflow-hidden transition-all duration-700 z-10 animate-float group-hover:scale-105 group-hover:border-[#D4A853]/40">
                            <Image 
                                src="/About.png"
                                alt={siteConfig.name}
                                width={180}
                                height={180}
                                className="object-contain p-6 group-hover:rotate-3 transition-transform duration-700 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                                unoptimized
                            />
                        </div>
                    </div>
                    
                    <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                        {t('title')}
                    </h1>
                    <p className="text-slate-300 text-base md:text-xl mb-6 max-w-sm md:max-w-md mx-auto leading-relaxed">
                        {t('subtitle')}
                    </p>
                    <div className="inline-flex px-5 py-2 bg-[#D4A853]/10 border border-[#D4A853]/30 rounded-full backdrop-blur-md text-[#D4A853] text-xs font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(212,168,83,0.1)]">
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
                                className={"relative w-full rounded-[2rem] overflow-hidden animate-fade-in-up transition-all duration-500 border border-white/10 " + (isOpen ? "bg-white/[0.08] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)]" : "bg-white/[0.03] backdrop-blur-md hover:bg-white/[0.06] hover:-translate-y-1 hover:shadow-xl")}
                                style={{ animationDelay: `${i * 100}ms` }}
                            >
                                {/* Category Header Button */}
                                <button
                                    onClick={() => toggleCategory(cat.id)}
                                    className="w-full flex items-center justify-between p-6 relative z-10 group"
                                >
                                    <div className="flex items-center gap-5">
                                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${cat.color} flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                {getIconPath(cat.icon)}
                                            </svg>
                                        </div>
                                        <span className="text-xl font-black text-white tracking-wide">
                                            {cat.label}
                                        </span>
                                    </div>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white/50 transition-all duration-500 ${isOpen ? 'bg-[#D4A853]/20 rotate-180 text-[#D4A853]' : 'bg-white/5 group-hover:bg-white/10 group-hover:text-white'}`}>
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </button>
                                
                                {/* Links Dropdown Panel */}
                                <div 
                                    className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}
                                >
                                    <div className="px-6 pb-6 flex flex-col gap-3">
                                        {cat.links.map((link, j) => (
                                            <a 
                                                key={j}
                                                href={link.href}
                                                target={cat.id === 'phone' ? undefined : "_blank"}
                                                rel={cat.id === 'phone' ? undefined : "noopener noreferrer"}
                                                className="flex items-center justify-between p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#D4A853]/30 transition-all duration-300 group/link"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <span className="w-2 h-2 rounded-full bg-[#D4A853] shadow-[0_0_8px_rgba(212,168,83,0.5)] opacity-40 group-hover/link:opacity-100 group-hover/link:scale-125 transition-all"></span>
                                                    <span className="text-base font-bold text-white/70 group-hover/link:text-white transition-colors">
                                                        {link.label}
                                                    </span>
                                                </div>
                                                <svg className="w-5 h-5 text-white/20 group-hover/link:text-[#D4A853] rtl:rotate-180 transition-all group-hover/link:translate-x-1 rtl:group-hover/link:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
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
                        className="group relative h-20 w-full mt-6 flex items-center justify-center animate-fade-in-up"
                        style={{ animationDelay: `${categories.length * 100}ms` }}
                    >
                        <div className="absolute inset-0 bg-white/5 rounded-2xl scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500" />
                        <span className="relative z-10 text-base font-black text-slate-400 group-hover:text-[#D4A853] transition-all flex items-center gap-3 tracking-widest uppercase">
                            <svg className="w-5 h-5 rtl:rotate-180 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            {t('website')}
                        </span>
                    </Link>
                </div>
            </div>
        </main>
    );
}
