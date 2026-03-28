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
            id: "quick_links",
            label: t('quick_links_title'),
            icon: "quick_links",
            color: "from-slate-700 to-slate-900",
            links: [
                { href: "/programs", label: t('link_programs') },
                { href: "/#about", label: t('link_about') },
                { href: "/#contact", label: t('link_contact') }
            ]
        },
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
            label: t('fb_title'),
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
            label: t('ig_title'),
            icon: "instagram",
            color: "from-pink-500 via-red-500 to-yellow-500",
            links: [
                { href: "https://www.instagram.com/ainshams.univ.programs/", label: t('ig_label1') },
                { href: "https://www.instagram.com/ainshams.teachers.programs", label: t('ig_label2') },
                { href: "https://www.instagram.com/ainshams.university.programs", label: t('ig_label3') }
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
            label: t('wa_title'),
            icon: "whatsapp",
            color: "from-emerald-500 to-emerald-400",
            links: [
                { href: "https://wa.me/201007006081", label: t('phone_edu_psych_special') + " (01007006081)" },
                { href: "https://wa.me/201091010454", label: t('phone_edu') + " (01091010454)" },
                { href: "https://wa.me/201093998000", label: t('phone_psych_special') + " (01093998000)" }
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
            case "quick_links":
                return (
                    <>
                        <line x1="21" y1="10" x2="3" y2="10" />
                        <line x1="21" y1="6" x2="3" y2="6" />
                        <line x1="21" y1="14" x2="3" y2="14" />
                        <line x1="21" y1="18" x2="3" y2="18" />
                    </>
                );
            default: return null;
        }
    };

    return (
        <main className="min-h-screen w-full relative flex flex-col items-center justify-start py-10 px-4 overflow-x-hidden overflow-y-auto bg-[#0F172A]">
            {/* Background */}
            <div className="fixed inset-0 bg-gradient-to-br from-[#172554] via-[#0F172A] to-[#0A0F1D] z-0 pointer-events-none" />
            <div className="fixed top-0 right-0 w-[300px] h-[300px] rounded-full bg-[#D4A853]/10 blur-[100px] z-0 pointer-events-none" />
            <div className="fixed bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[#1e3a8a]/20 blur-[100px] z-0 pointer-events-none" />
            <div className="fixed inset-0 opacity-[0.03] z-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#D4A853 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

            {/* Content */}
            <div className="relative z-10 w-full max-w-md mx-auto flex flex-col items-center">

                {/* Profile Header */}
                <div className="flex flex-col items-center text-center mb-8 w-full">
                    {/* Logo */}
                    <div className="relative w-28 h-28 mb-5 group">
                        <div className="absolute inset-[-20%] bg-[#D4A853]/20 rounded-full blur-[40px] animate-pulse" />
                        <div className="relative w-full h-full bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl flex items-center justify-center overflow-hidden group-hover:scale-105 group-hover:border-[#D4A853]/40 transition-all duration-500 animate-float">
                            <Image
                                src="/About.png"
                                alt={siteConfig.name}
                                width={140}
                                height={140}
                                className="object-contain p-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                                unoptimized
                            />
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight px-2 leading-tight">
                        {t('title')}
                    </h1>

                    {/* Subtitle */}
                    <p className="text-slate-400 text-sm sm:text-base mb-5 max-w-[300px] leading-relaxed px-2">
                        {t('subtitle')}
                    </p>

                    {/* Badge */}
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#D4A853]/10 border border-[#D4A853]/30 rounded-full text-[#D4A853] text-[11px] font-black uppercase tracking-[0.15em]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4A853] animate-pulse" />
                        {t('follow_us')}
                    </span>
                </div>

                {/* Categories */}
                <div className="flex flex-col gap-3 w-full">
                    {categories.map((cat, i) => {
                        const isOpen = openCategory === cat.id;
                        return (
                            <div
                                key={cat.id}
                                className={`w-full rounded-2xl overflow-hidden border transition-all duration-500
                                    ${isOpen
                                        ? "bg-white/[0.10] border-white/20 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]"
                                        : "bg-white/[0.04] border-white/10 hover:bg-white/[0.07] hover:border-white/15"
                                    }`}
                                style={{ transitionDelay: `${i * 40}ms` }}
                            >
                                {/* Accordion Header */}
                                <button
                                    onClick={() => toggleCategory(cat.id)}
                                    className="w-full flex items-center gap-4 p-4 sm:p-5 group touch-manipulation"
                                >
                                    {/* Icon */}
                                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${cat.color} flex items-center justify-center text-white shadow-md shrink-0 transition-transform duration-300 group-hover:scale-105`}>
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            {getIconPath(cat.icon)}
                                        </svg>
                                    </div>

                                    {/* Label */}
                                    <span className="flex-1 text-right rtl:text-right ltr:text-left text-[15px] sm:text-base font-black text-white group-hover:text-[#D4A853] transition-colors duration-300 leading-snug">
                                        {cat.label}
                                    </span>

                                    {/* Arrow */}
                                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-400
                                        ${isOpen ? "bg-[#D4A853]/20 rotate-180" : "bg-white/5 group-hover:bg-white/10"}`}>
                                        <svg className={`w-4 h-4 transition-colors ${isOpen ? "text-[#D4A853]" : "text-white/50"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </button>

                                {/* Dropdown Links */}
                                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}>
                                    <div className="px-4 sm:px-5 pb-4 flex flex-col gap-2">
                                        {cat.links.map((link, j) => (
                                            <Link
                                                key={j}
                                                href={link.href}
                                                target={cat.id === 'phone' || cat.id === 'whatsapp' ? undefined : "_blank"}
                                                rel={cat.id === 'phone' || cat.id === 'whatsapp' ? undefined : "noopener noreferrer"}
                                                className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#D4A853]/25 transition-all duration-300 group/link touch-manipulation min-h-[52px]"
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#D4A853] opacity-50 group-hover/link:opacity-100 shrink-0 transition-opacity" />
                                                <span className="flex-1 text-sm font-semibold text-white/70 group-hover/link:text-white transition-colors rtl:text-right ltr:text-left leading-snug">
                                                    {link.label}
                                                </span>
                                                <svg className="w-4 h-4 text-white/20 group-hover/link:text-[#D4A853] rtl:rotate-180 shrink-0 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Back to Website */}
                    <Link
                        href="/"
                        className="group mt-4 flex items-center justify-center gap-3 py-4 px-6 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300 touch-manipulation"
                    >
                        <svg className="w-4 h-4 text-slate-400 group-hover:text-[#D4A853] rtl:rotate-180 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span className="text-sm font-black text-slate-400 group-hover:text-[#D4A853] transition-colors tracking-widest uppercase">
                            {t('website')}
                        </span>
                    </Link>

                    {/* Bottom padding for mobile */}
                    <div className="h-6" />
                </div>
            </div>
        </main>
    );
}
