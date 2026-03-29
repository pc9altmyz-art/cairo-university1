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
            if (window.scrollY > 10) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
                setShowPhoneMenu(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        // Initial check for scroll position
        toggleVisibility();
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    if (pathname?.startsWith("/admin")) return null;
    if (pathname?.includes("/links")) return null;
    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] flex flex-col gap-4 items-end animate-in fade-in slide-in-from-bottom-10 duration-500">
            {/* WhatsApp Menu Popover */}
            <div 
                className={`transition-all duration-300 transform origin-bottom-right mb-2 ${showWhatsAppMenu ? 'scale-100 opacity-100 translate-y-0 visible' : 'scale-90 opacity-0 translate-y-4 invisible pointer-events-none'}`}
            >
                <div className="bg-[#0F172A]/95 backdrop-blur-2xl rounded-[2rem] shadow-2xl border border-white/10 overflow-hidden w-[280px] md:w-[320px]">
                    <div className="p-4 md:p-5 bg-white/5 border-b border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-[#25D366]/20 flex items-center justify-center text-[#25D366]">
                                <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </div>
                            <span className="font-black text-white text-base md:text-lg">{t('wa_title')}</span>
                        </div>
                    </div>
                    <div className="flex flex-col p-2 md:p-3">
                        {phoneLinks.map((p, i) => (
                            <a 
                                key={i}
                                href={`https://wa.me/2${p.number}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start gap-4 p-3 md:p-4 hover:bg-white/5 rounded-2xl transition-colors group touch-action-manipulation active:bg-white/5"
                            >
                                <span className="text-[#D4A853] mt-1.5 font-bold pointer-events-none">•</span>
                                <div className="flex flex-col pointer-events-none">
                                    <span className="text-[13px] md:text-[14px] font-bold text-white/50 group-hover:text-white transition-colors">{p.label}</span>
                                    <span className="text-[15px] md:text-[16px] font-black text-[#D4A853] group-hover:text-white transition-colors" dir="ltr">({p.number})</span>
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
                <div className="bg-[#0F172A]/95 backdrop-blur-2xl rounded-[2rem] shadow-2xl border border-white/10 overflow-hidden w-[280px] md:w-[320px]">
                    <div className="p-4 md:p-5 bg-white/5 border-b border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-[#D4A853]/20 flex items-center justify-center text-[#D4A853]">
                                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <span className="font-black text-white text-base md:text-lg">{t('phone_title')}</span>
                        </div>
                    </div>
                    <div className="flex flex-col p-2 md:p-3">
                        {phoneLinks.map((p, i) => (
                            <a 
                                key={i}
                                href={`tel:+2${p.number}`}
                                className="flex items-start gap-4 p-3 md:p-4 hover:bg-white/5 rounded-2xl transition-colors group touch-action-manipulation active:bg-white/5"
                            >
                                <span className="text-[#D4A853] mt-1.5 font-bold pointer-events-none">•</span>
                                <div className="flex flex-col pointer-events-none">
                                    <span className="text-[13px] md:text-[14px] font-bold text-white/50 group-hover:text-white transition-colors">{p.label}</span>
                                    <span className="text-[15px] md:text-[16px] font-black text-[#D4A853] group-hover:text-white transition-colors" dir="ltr">({p.number})</span>
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
                className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 active:scale-90 group relative z-10 ${showPhoneMenu ? 'bg-slate-800 text-white rotate-90 border-2 border-[#D4A853]' : 'bg-white text-[#1e3a8a] border-2 border-slate-100'}`}
                title="اتصال هاتفي"
            >
                {showPhoneMenu ? (
                    <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                )}
            </button>

            {/* WhatsApp Button */}
            <button
                onClick={() => {
                    setShowWhatsAppMenu(!showWhatsAppMenu);
                    setShowPhoneMenu(false);
                }}
                className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 active:scale-90 group relative z-10 ${showWhatsAppMenu ? 'bg-slate-800 text-white rotate-90 border-2 border-[#25D366]' : 'bg-[#25D366] text-white shadow-[#25D366]/40'}`}
                title="واتساب"
            >
                {showWhatsAppMenu ? (
                    <svg className="w-6 h-6 md:w-7 md:h-7 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <>
                        <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30 pointer-events-none"></div>
                        <svg className="w-8 h-8 md:w-10 md:h-10 relative z-10 pointer-events-none" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                    </>
                )}
            </button>
        </div>
    );
}
