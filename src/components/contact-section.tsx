"use client";

import { siteConfig } from "@/config/site";
import RegistrationForm from "./registration-form";
import { useTranslations } from "next-intl";

export default function ContactSection() {
    const t = useTranslations('ContactSection');
    const contactInfo = [
        {
            title: t('info_title1'),
            value: "+20 109 399 8000",
            link: "tel:+201093998000",
            icon: "📞",
            color: "bg-blue-50 text-blue-600",
        },
        {
            title: t('info_title2'),
            value: t('info_desc2'),
            link: "https://wa.me/201093998000",
            icon: "💬",
            color: "bg-green-50 text-green-600",
        },
        {
            title: t('info_title3'),
            value: t('info_desc3'),
            link: siteConfig.links.facebook,
            icon: "🔵",
            color: "bg-indigo-50 text-indigo-600",
        },
        {
            title: t('info_title4'),
            value: t('info_desc4'),
            link: siteConfig.links.instagram,
            icon: "📸",
            color: "bg-pink-50 text-pink-600",
        },
        {
            title: t('info_title5'),
            value: t('info_desc5'),
            link: "#",
            icon: "📍",
            color: "bg-red-50 text-red-600",
        },
    ];

    return (
        <section id="contact" className="py-32 bg-white dark:bg-[#0A0204] relative overflow-hidden scroll-mt-28 transition-colors duration-500">
            {/* Immersive background decoration */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-slate-50 dark:bg-[#7C2D36]/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#7C2D36]/5 dark:bg-[#D4A853]/5 rounded-full blur-[150px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            
            {/* Subtle grid mesh */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '45px 45px' }} />

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-24">
                    <div className="inline-flex items-center gap-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full px-6 py-2.5 mb-8 backdrop-blur-2xl">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#7C2D36] dark:bg-[#D4A853] animate-pulse shadow-[0_0_12px_currentColor]" />
                        <span className="text-[#7C2D36] dark:text-[#D4A853] text-[10px] sm:text-xs font-black tracking-[0.4em] uppercase">{t('badge')}</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black mb-8 text-slate-900 dark:text-white leading-tight tracking-tight">
                        {t('title1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C2D36] to-[#9B3944] dark:from-[#D4A853] dark:via-[#ECD2A2] dark:to-[#B8860B]">{t('title_hl')}</span>
                    </h2>
                    <p className="text-slate-500 dark:text-white/40 text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    {/* Contact Info Hub */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="grid grid-cols-1 gap-5">
                            {contactInfo.map((info, index) => (
                                <a
                                    key={index}
                                    href={info.link}
                                    target={info.link.startsWith("http") ? "_blank" : undefined}
                                    className="bg-white dark:bg-white/5 backdrop-blur-3xl flex items-center gap-8 p-8 group cursor-pointer border border-slate-200 dark:border-white/5 hover:border-[#7C2D36]/30 dark:hover:border-[#D4A853]/30 hover:shadow-premium dark:hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] transition-all duration-700 hover:-translate-y-2 rounded-[2.5rem] relative overflow-hidden"
                                >
                                    {/* Glass reflection */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-black/5 dark:from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                    
                                    <div className="relative w-16 h-16 bg-slate-50 dark:bg-[#0A0204] rounded-2xl flex items-center justify-center text-3xl transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 shadow-[inner_0_2px_10px_rgba(0,0,0,0.02)] border border-slate-200 dark:border-white/10 group-hover:border-[#7C2D36]/40 dark:group-hover:border-[#D4A853]/40">
                                        <span className="drop-shadow-[0_0_10px_rgba(0,0,0,0.05)] dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">{info.icon}</span>
                                    </div>
                                    <div className="relative">
                                        <h3 className="font-black text-slate-900 dark:text-white text-base mb-2 group-hover:text-[#7C2D36] dark:group-hover:text-[#D4A853] transition-colors">{info.title}</h3>
                                        <p className="text-slate-500 dark:text-white/30 font-black text-[11px] uppercase tracking-widest leading-loose">{info.value}</p>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* Elite Working Hours Card */}
                        <div className="bg-gradient-to-br from-white to-slate-50 dark:from-[#1A0B0E] dark:to-[#0A0204] text-slate-900 dark:text-white p-12 rounded-[3.5rem] relative overflow-hidden shadow-premium dark:shadow-[0_40px_100px_rgba(0,0,0,0.6)] group border border-slate-200 dark:border-white/5">
                            {/* Inner ambient glow */}
                            <div className="absolute top-0 right-0 w-48 h-48 bg-[#7C2D36]/5 dark:bg-[#D4A853]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />
                            
                            <div className="relative z-10">
                                <h3 className="text-2xl font-black mb-10 flex items-center gap-5">
                                    <div className="w-14 h-14 bg-slate-100 dark:bg-white/5 rounded-2xl flex items-center justify-center text-2xl border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-2xl">📅</div>
                                    {t('hours_title')}
                                </h3>
                                <div className="space-y-8">
                                    <div className="flex justify-between items-center border-b border-slate-200 dark:border-white/5 pb-6">
                                        <span className="text-slate-500 dark:text-white/40 font-black text-xs uppercase tracking-widest">{t('hours_days')}</span>
                                        <span className="font-black text-[#7C2D36] dark:text-[#D4A853] text-lg rtl:text-right ltr:text-left drop-shadow-[0_0_10px_rgba(124,45,54,0.1)] dark:drop-shadow-[0_0_10px_rgba(212,168,83,0.4)]">{t('hours_time')}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-400 dark:text-white/30 font-black text-xs uppercase tracking-widest">{t('hours_friday')}</span>
                                        <span className="text-slate-300 dark:text-white/20 font-black italic text-lg">{t('hours_closed')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Elite Form Canvas */}
                    <div className="lg:col-span-8">
                        <div className="bg-white/70 dark:bg-[#0D0405]/80 backdrop-blur-3xl rounded-[4rem] p-1 shadow-premium dark:shadow-[0_60px_120px_rgba(0,0,0,0.6)] border border-slate-200 dark:border-white/5 relative overflow-hidden group">
                            {/* Form border neon effect */}
                            <div className="absolute -inset-[1px] bg-gradient-to-br from-[#7C2D36]/30 via-transparent to-[#D4A853]/30 rounded-[4rem] opacity-20 dark:opacity-40 group-hover:opacity-100 transition-opacity duration-1000" />
                            
                            <div className="bg-white/95 dark:bg-[#0A0204]/90 rounded-[4rem] p-10 md:p-20 relative z-10 overflow-hidden">
                                {/* Background glow in form area */}
                                <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-[#7C2D36]/5 dark:bg-[#D4A853]/5 blur-[120px]" />
                                
                                <div className="mb-14 relative">
                                    <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">{t('form_title')}</h3>
                                    <div className="w-20 h-1 bg-gradient-to-r from-[#7C2D36] to-transparent dark:from-[#D4A853] dark:to-transparent rounded-full mb-6" />
                                    <p className="text-slate-500 dark:text-white/40 font-black text-[10px] uppercase tracking-[0.4em]">{t('form_subtitle')}</p>
                                </div>
                                
                                <div className="relative">
                                    <RegistrationForm embedded={true} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
