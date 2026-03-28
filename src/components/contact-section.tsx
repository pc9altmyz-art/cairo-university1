"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import RegistrationForm from "./registration-form";
import { useTranslations } from "next-intl";

export default function ContactSection() {
    const t = useTranslations('ContactSection');
    const lt = useTranslations('LinksPage');
    const [expandedCard, setExpandedCard] = useState<string | null>(null);

    const contactInfo = [
        {
            id: "phone",
            title: lt('phone_title'),
            value: lt('phone_edu_psych_special'),
            icon: "📞",
            color: "bg-blue-50 text-blue-600",
            hasDropdown: true,
            subLinks: [
                { href: "tel:+201007006081", label: lt('phone_edu_psych_special'), number: "01007006081" },
                { href: "tel:+201091010454", label: lt('phone_edu'), number: "01091010454" },
                { href: "tel:+201093998000", label: lt('phone_psych_special'), number: "01093998000" }
            ]
        },
        {
            id: "whatsapp",
            title: t('info_title2'),
            value: "01093998000",
            link: "https://wa.me/201093998000",
            icon: "💬",
            color: "bg-green-50 text-green-600",
            hasDropdown: false
        },
        {
            id: "facebook",
            title: t('info_title3'),
            value: lt('fb_label1'),
            icon: "🔵",
            color: "bg-indigo-50 text-indigo-600",
            hasDropdown: true,
            subLinks: [
                { href: "https://www.facebook.com/AinShams.Univ.Programs/", label: lt('fb_label1'), number: "" },
                { href: "https://www.facebook.com/AinShams.Teachers.Programs/", label: lt('fb_label2'), number: "" },
                { href: "https://www.facebook.com/Ain.Shams.University.Programs", label: lt('fb_label3'), number: "" }
            ]
        },
        {
            id: "instagram",
            title: t('info_title4'),
            value: lt('ig_label1'),
            icon: "📸",
            color: "bg-pink-50 text-pink-600",
            hasDropdown: true,
            subLinks: [
                { href: "https://www.instagram.com/ainshams.univ.programs/?fbclid=IwY2xjawQzQq1leHRuA2FlbQIxMABicmlkETF4bjBsVDV4b3RxUUNQNmdvc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHtLiTagk-Vj9yi0RBHQNjKUPJ5AQH1-LcJrHDJnWTgF0cV568gJl45fBg87C_aem_q08NhKc6KKYtKSL6-Mpwug", label: lt('ig_label1'), number: "" },
                { href: "https://www.instagram.com/ainshams.teachers.programs?fbclid=IwY2xjawQ0flJleHRuA2FlbQIxMABicmlkETFXNlZiUHZCOENRcUxSZzFnc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHhw7kBEHkG-KLH_n2HnRF6WIOjpaXrrpeEdbD5cJpCPNUM9FVSFvAwF1lZpc_aem_6d3bDAwGY_tiDAJ7odX5aQ", label: lt('ig_label2'), number: "" },
                { href: "https://www.instagram.com/ainshams.university.programs?fbclid=IwY2xjawQzQrVleHRuA2FlbQIxMABicmlkETF4bjBsVDV4b3RxUUNQNmdvc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHl4om9M_ITlF0QSpTWWv84i3CPZomGOI9edznIA1yHogr635Kgml6GMVfR4y_aem_u3h505RD5CEQFLC3ZP1rrg", label: lt('ig_label3'), number: "" }
            ]
        },
        {
            id: "location",
            title: t('info_title5'),
            value: t('info_desc5'),
            link: "#",
            icon: "📍",
            color: "bg-red-50 text-red-600",
            hasDropdown: false
        },
    ];

    const toggleCard = (id: string, hasDropdown: boolean) => {
        if (!hasDropdown) return;
        setExpandedCard(prev => prev === id ? null : id);
    };

    return (
        <section id="contact" className="section-padding bg-white dark:bg-[#0F172A] relative overflow-hidden scroll-mt-28 rtl:text-right ltr:text-left">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1e3a8a]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-60 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#D4A853]/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 opacity-40 pointer-events-none" />
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16 relative">
                    <span className="text-[#D4A853] font-black text-[10px] md:text-xs tracking-[0.3em] uppercase mb-3 md:mb-4 block animate-fade-in">{t('badge')}</span>
                    <h2 className="text-3xl md:text-5xl font-black mb-4 md:mb-6 text-slate-900 drop-shadow-sm dark:text-white animate-fade-in-up">
                        {t('title1')} <span className="text-[#1e3a8a] dark:text-[#60a5fa]">{t('title_hl')}</span>
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-base md:text-xl max-w-2xl mx-auto leading-relaxed animate-fade-in-up md:px-0 px-2" style={{ animationDelay: '100ms' }}>
                        {t('subtitle')}
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-start">
                    {/* Contact Info Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="grid grid-cols-1 gap-4">
                            {contactInfo.map((info, index) => {
                                const isExpanded = expandedCard === info.id;
                                
                                return (
                                    <div key={index} className="flex flex-col gap-2">
                                        <div
                                            onClick={() => toggleCard(info.id, info.hasDropdown)}
                                            className={`premium-card bg-white/70 dark:bg-white/5 backdrop-blur-xl p-5 md:p-6 group cursor-pointer border border-white/20 dark:border-white/10 hover:border-[#D4A853]/30 hover:shadow-[0_20px_40px_-15px_rgba(212,168,83,0.15)] transition-all duration-500 hover:-translate-y-1 rounded-3xl relative overflow-hidden ${isExpanded ? 'ring-2 ring-[#D4A853]/30 bg-white dark:bg-white/[0.08]' : ''}`}
                                        >
                                            {/* Glow Effect */}
                                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#D4A853]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                            
                                            <div className="flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-6 relative z-10 w-full overflow-hidden text-center md:rtl:text-right md:ltr:text-left">
                                                <div className={`w-12 h-12 md:w-14 md:h-14 ${info.color} rounded-2xl flex items-center justify-center text-xl md:text-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-sm shrink-0`}>
                                                    {info.icon}
                                                </div>
                                                <div className="flex-1 overflow-hidden w-full">
                                                    <h3 className="font-black text-slate-900 dark:text-white text-[14px] md:text-[15px] mb-1 leading-tight">{info.title}</h3>
                                                    <p className="text-slate-500 dark:text-slate-400 font-bold text-[11px] md:text-[12px] uppercase tracking-wider truncate">{info.value}</p>
                                                </div>
                                                {info.hasDropdown && (
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${isExpanded ? 'bg-[#D4A853]/20 rotate-180' : 'bg-slate-50 dark:bg-white/5 group-hover:bg-[#D4A853]/10'}`}>
                                                        <svg className={`w-4 h-4 ${isExpanded ? 'text-[#D4A853]' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </div>
                                                )}
                                                {!info.hasDropdown && info.link && (
                                                    <a href={info.link} target={info.link.startsWith("http") ? "_blank" : undefined} className="absolute inset-0 z-20 opacity-0 cursor-pointer" />
                                                )}
                                            </div>
                                        </div>

                                        {/* Dropdown Content */}
                                        {info.hasDropdown && (
                                            <div 
                                                className={`overflow-hidden transition-all duration-500 ease-in-out px-2 ${isExpanded ? 'max-h-[500px] opacity-100 mb-4' : 'max-h-0 opacity-0'}`}
                                            >
                                                <div className="bg-slate-50/50 dark:bg-white/[0.03] backdrop-blur-sm rounded-2xl p-2 border border-slate-100 dark:border-white/5 flex flex-col gap-1.5 shadow-inner">
                                                    {info.subLinks?.map((sub: any, j) => (
                                                        <a 
                                                            key={j} 
                                                            href={sub.href}
                                                            target={sub.href.startsWith("http") ? "_blank" : undefined}
                                                            className="flex flex-col p-3 rounded-xl hover:bg-white dark:hover:bg-white/5 border border-transparent hover:border-[#D4A853]/20 transition-all duration-300 group/item"
                                                        >
                                                            <span className="text-[9px] font-black text-slate-400 group-hover/item:text-[#D4A853] uppercase tracking-widest mb-0.5">{sub.label}</span>
                                                            <span className="text-xs font-black text-slate-800 dark:text-slate-200" dir="ltr">{sub.number || t('visit_page')}</span>
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Working Hours Premium Card */}
                        <div className="bg-[#0F172A] text-white p-6 md:p-10 rounded-[2.5rem] relative overflow-hidden shadow-2xl group border border-white/5">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-[#1e3a8a]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />
                            <div className="relative z-10">
                                <h3 className="text-xl md:text-2xl font-black mb-6 md:mb-8 flex items-center gap-4">
                                    <span className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-xl">📅</span>
                                    {t('hours_title')}
                                </h3>
                                <div className="space-y-4 md:space-y-6">
                                    <div className="flex justify-between items-center border-b border-white/5 pb-4">
                                        <span className="text-white/60 font-bold text-xs md:text-sm">{t('hours_days')}</span>
                                        <span className="font-black text-[#D4A853] rtl:text-right ltr:text-left text-sm md:text-base">{t('hours_time')}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-white/40 font-bold text-xs md:text-sm">{t('hours_friday')}</span>
                                        <span className="text-white/20 font-black italic text-sm md:text-base">{t('hours_closed')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Integrated Form Area */}
                    <div className="lg:col-span-8">
                        <div className="bg-white/70 dark:bg-white/5 backdrop-blur-2xl rounded-[2.5rem] md:rounded-[3.5rem] p-0.5 md:p-1 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] border border-white/50 dark:border-white/10 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a]/10 via-transparent to-[#D4A853]/10 opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
                            <div className="absolute -inset-1 bg-gradient-to-br from-[#1e3a8a]/30 to-[#D4A853]/30 rounded-[2.6rem] md:rounded-[3.6rem] blur-[2px] -z-10 group-hover:blur-[6px] transition-all duration-1000 opacity-50" />
                            <div className="p-5 md:p-16 relative z-10">
                                <div className="mb-6 md:mb-12">
                                    <h3 className="text-lg md:text-2xl font-black text-slate-900 dark:text-white mb-2">{t('form_title')}</h3>
                                    <p className="text-slate-500 dark:text-slate-400 font-bold text-[9px] md:text-xs uppercase tracking-widest">{t('form_subtitle')}</p>
                                </div>
                                <RegistrationForm embedded={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
