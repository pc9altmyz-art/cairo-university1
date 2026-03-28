"use client";

import { useState, useEffect } from "react";
import { siteConfig } from "@/config/site";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export default function FloatingContact() {
    const [isVisible, setIsVisible] = useState(false);
    const [showPhoneMenu, setShowPhoneMenu] = useState(false);
    const [showWhatsAppMenu, setShowWhatsAppMenu] = useState(false);
    const pathname = usePathname();
    const t = useTranslations('LinksPage');

    const phoneLinks = [
        { label: t('phone_edu_psych_special'), number: "01007006081" },
        { label: t('phone_edu'), number: "01091010454" },
        { label: t('phone_psych_special'), number: "01093998000" }
    ];

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
                setShowPhoneMenu(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    if (pathname?.startsWith("/admin")) return null;
    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-4 items-end animate-in fade-in slide-in-from-bottom-10 duration-500">
            {/* WhatsApp Menu Popover */}
            <div 
                className={`transition-all duration-300 transform origin-bottom-right mb-2 ${showWhatsAppMenu ? 'scale-100 opacity-100 translate-y-0 visible' : 'scale-90 opacity-0 translate-y-4 invisible pointer-events-none'}`}
            >
                <div className="bg-[#0F172A]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden w-[280px]">
                    <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#25D366]/20 flex items-center justify-center text-[#25D366]">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </div>
                            <span className="font-black text-white">{t('wa_title')}</span>
                        </div>
                        <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                    <div className="flex flex-col p-2">
                        {phoneLinks.map((p, i) => (
                            <a 
                                key={i}
                                href={`https://wa.me/2${p.number}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start gap-3 p-3 hover:bg-white/5 rounded-xl transition-colors group"
                            >
                                <span className="text-[#D4A853] mt-1.5">•</span>
                                <div className="flex flex-col">
                                    <span className="text-[13px] font-bold text-white/50 group-hover:text-white transition-colors">{p.label}</span>
                                    <span className="text-[15px] font-black text-white/90" dir="ltr">({p.number})</span>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Phone Menu Popover */}
            <div 
                className={`transition-all duration-300 transform origin-bottom-right mb-2 ${showPhoneMenu ? 'scale-100 opacity-100 translate-y-0 visible' : 'scale-90 opacity-0 translate-y-4 invisible pointer-events-none'}`}
            >
                <div className="bg-[#0F172A]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden w-[280px]">
                    <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#D4A853]/20 flex items-center justify-center text-[#D4A853]">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <span className="font-black text-white">{t('phone_title')}</span>
                        </div>
                        <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                    <div className="flex flex-col p-2">
                        {phoneLinks.map((p, i) => (
                            <a 
                                key={i}
                                href={`tel:+2${p.number}`}
                                className="flex items-start gap-3 p-3 hover:bg-white/5 rounded-xl transition-colors group"
                            >
                                <span className="text-[#D4A853] mt-1.5">•</span>
                                <div className="flex flex-col">
                                    <span className="text-[13px] font-bold text-white/50 group-hover:text-white transition-colors">{p.label}</span>
                                    <span className="text-[15px] font-black text-white/90" dir="ltr">({p.number})</span>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Phone Button */}
            <button
                onClick={() => {
                    setShowPhoneMenu(!showPhoneMenu);
                    setShowWhatsAppMenu(false);
                }}
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 active:scale-95 group relative z-10 ${showPhoneMenu ? 'bg-[#D4A853] text-white rotate-90' : 'bg-white text-[#1e3a8a] border border-slate-100'}`}
                title="اتصال هاتفي"
            >
                {showPhoneMenu ? (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                )}
                {!showPhoneMenu && (
                    <span className="absolute right-full mr-4 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        قائمة الاتصال
                    </span>
                )}
            </button>

            {/* WhatsApp Button */}
            <button
                onClick={() => {
                    setShowWhatsAppMenu(!showWhatsAppMenu);
                    setShowPhoneMenu(false);
                }}
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 active:scale-95 group relative z-10 ${showWhatsAppMenu ? 'bg-[#128C7E] text-white rotate-90 scale-110' : 'bg-[#25D366] text-white'}`}
                title="واتساب"
            >
                {showWhatsAppMenu ? (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <>
                        <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></div>
                        <svg className="w-8 h-8 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                    </>
                )}
                {!showWhatsAppMenu && (
                    <span className="absolute right-full mr-4 bg-[#25D366] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        تواصل واتساب
                    </span>
                )}
            </button>
        </div>
    );
}
