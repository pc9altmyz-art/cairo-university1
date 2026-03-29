"use client";

import { Link } from "@/i18n/routing";
import { siteConfig } from "@/config/site";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

export default function Footer() {
    const t = useTranslations('Footer');
    const lt = useTranslations('LinksPage');
    const pathname = usePathname();
    const [expandedSocial, setExpandedSocial] = useState<string | null>(null);

    const facebookLinks = [
        { href: "https://www.facebook.com/AinShams.Univ.Programs/", label: lt('fb_label1') },
        { href: "https://www.facebook.com/AinShams.Teachers.Programs/", label: lt('fb_label2') },
        { href: "https://www.facebook.com/Ain.Shams.University.Programs", label: lt('fb_label3') }
    ];

    const instagramLinks = [
        { href: "https://www.instagram.com/ainshams.univ.programs/?fbclid=IwY2xjawQzQq1leHRuA2FlbQIxMABicmlkETF4bjBsVDV4b3RxUUNQNmdvc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHtLiTagk-Vj9yi0RBHQNjKUPJ5AQH1-LcJrHDJnWTgF0cV568gJl45fBg87C_aem_q08NhKc6KKYtKSL6-Mpwug", label: lt('ig_label1') },
        { href: "https://www.instagram.com/ainshams.teachers.programs?fbclid=IwY2xjawQ0flJleHRuA2FlbQIxMABicmlkETFXNlZiUHZCOENRcUxSZzFnc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHhw7kBEHkG-KLH_n2HnRF6WIOjpaXrrpeEdbD5cJpCPNUM9FVSFvAwF1lZpc_aem_6d3bDAwGY_tiDAJ7odX5aQ", label: lt('ig_label2') },
        { href: "https://www.instagram.com/ainshams.university.programs?fbclid=IwY2xjawQzQrVleHRuA2FlbQIxMABicmlkETF4bjBsVDV4b3RxUUNQNmdvc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHl4om9M_ITlF0QSpTWWv84i3CPZomGOI9edznIA1yHogr635Kgml6GMVfR4y_aem_u3h505RD5CEQFLC3ZP1rrg", label: lt('ig_label3') }
    ];

    const phoneLinks = [
        { href: "tel:+201007006081", label: lt('phone_edu_psych_special') + " (01007006081)" },
        { href: "tel:+201091010454", label: lt('phone_edu') + " (01091010454)" },
        { href: "tel:+201093998000", label: lt('phone_psych_special') + " (01093998000)" }
    ];

    if (pathname?.startsWith("/admin")) return null;
    if (pathname?.includes("/links")) return null;

    return (
        <footer className="section-padding relative overflow-hidden border-t bg-[#0F172A] z-10" style={{ color: 'var(--dark-section-text)', borderColor: 'rgba(30, 58, 138, 0.2)' }}>
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4A853]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#1e3a8a]/10 rounded-full blur-[120px] translate-y-1/4 translate-x-1/4 pointer-events-none" />
            
            <div className="container mx-auto relative z-10 px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="relative p-3 bg-white rounded-3xl shadow-2xl group hover:scale-105 transition-transform duration-500">
                                <Image
                                    src="/About.png"
                                    alt="المؤسسة المصريه"
                                    width={70}
                                    height={70}
                                    className="h-16 w-16 md:h-20 md:w-20 object-contain"
                                    unoptimized
                                />
                                <div className="absolute inset-0 bg-[#D4A853]/10 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700" />
                            </div>
                        </div>
                        <div className="text-lg sm:text-2xl font-black text-[#60a5fa] mb-3 drop-shadow-md rtl:text-right ltr:text-left leading-tight">{t('univ_name')}</div>
                        <p className="text-sm leading-relaxed max-w-sm rtl:text-right ltr:text-left opacity-80" style={{ color: 'var(--dark-section-text-muted)' }}>
                            {t('desc')}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col items-center md:items-start text-center md:rtl:text-right md:ltr:text-left">
                        <div className="font-bold mb-6 text-lg relative inline-block" style={{ color: 'var(--dark-section-text)' }}>
                            {t('links_title')}
                            <div className="absolute -bottom-1 inset-x-0 w-2/3 h-0.5 bg-gradient-to-r from-transparent via-[#D4A853] to-transparent md:rtl:from-transparent md:rtl:via-[#D4A853] md:rtl:to-[#D4A853] md:ltr:from-[#D4A853] md:ltr:to-transparent rounded-full mx-auto md:mx-0" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 w-full max-w-sm lg:max-w-none">
                            {[
                                { href: "/programs", label: t('link_programs') },
                                { href: "/links", label: lt('title') },
                                { href: "/#about", label: t('link_about') },
                                { href: "/#contact", label: t('link_contact') }
                            ].map((link, idx) => (
                                <Link 
                                    key={idx}
                                    href={link.href} 
                                    className="relative z-20 flex items-center justify-center lg:justify-start px-6 py-4 lg:py-2 rounded-2xl lg:rounded-none bg-white/5 lg:bg-transparent border border-white/10 lg:border-none transition-all duration-300 hover:text-[#D4A853] hover:bg-white/10 lg:hover:bg-transparent group cursor-pointer"
                                    style={{ color: 'var(--dark-section-text-muted)' }}
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4A853] opacity-0 group-hover:opacity-100 transition-opacity hidden lg:block ltr:mr-2 rtl:ml-2"></span>
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="flex flex-col items-center md:items-start text-center md:rtl:text-right md:ltr:text-left">
                        <div className="font-bold mb-8 text-lg relative inline-block" style={{ color: 'var(--dark-section-text)' }}>
                            {t('contact_title')}
                            <div className="absolute -bottom-1 inset-x-0 w-2/3 h-0.5 bg-gradient-to-r from-transparent via-[#D4A853] to-transparent md:rtl:from-transparent md:rtl:via-[#D4A853] md:rtl:to-[#D4A853] md:ltr:from-[#D4A853] md:ltr:to-transparent rounded-full mx-auto md:mx-0" />
                        </div>
                        <div className="space-y-4">
                            {/* Facebook Dropdown */}
                            <div className="space-y-2 relative">
                                <div
                                    onClick={() => setExpandedSocial(expandedSocial === 'facebook' ? null : 'facebook')}
                                    className={`flex items-center gap-4 transition-all duration-300 group w-full cursor-pointer select-none px-4 py-2 h-14 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 ${expandedSocial === 'facebook' ? 'ring-2 ring-white/10 bg-white/10 text-[#1877F2]' : 'text-slate-400'}`}
                                >
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 shrink-0 ${expandedSocial === 'facebook' ? 'bg-white/10' : 'bg-white/5 border border-white/10'}`}>
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1 flex items-center justify-between">
                                        <span className="text-sm font-black tracking-wide">{t('social_fb')}</span>
                                        <svg className={`w-4 h-4 transition-transform duration-500 ${expandedSocial === 'facebook' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                                
                                <div 
                                    className={`transition-all duration-500 ease-in-out bg-white/5 rounded-xl border border-white/10 overflow-hidden ${expandedSocial === 'facebook' ? 'max-h-[300px] py-2 opacity-100 mt-2 scale-100 visible' : 'max-h-0 opacity-0 scale-95 pointer-events-none invisible'}`}
                                >
                                    {facebookLinks.map((link, idx) => (
                                        <a key={idx} href={link.href} target="_blank" rel="noopener noreferrer" className="block px-6 py-4 text-sm hover:text-[#D4A853] hover:bg-white/5 transition-all flex items-center gap-3 text-right">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A853] shrink-0"></span>
                                            {link.label || 'Link'}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Instagram Dropdown */}
                            <div className="space-y-2 relative">
                                <div
                                    onClick={() => setExpandedSocial(expandedSocial === 'instagram' ? null : 'instagram')}
                                    className={`flex items-center gap-4 transition-all duration-300 group w-full cursor-pointer select-none px-4 py-2 h-14 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 ${expandedSocial === 'instagram' ? 'ring-2 ring-white/10 bg-white/10 text-[#E4405F]' : 'text-slate-400'}`}
                                >
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 shrink-0 ${expandedSocial === 'instagram' ? 'bg-white/10' : 'bg-white/5 border border-white/10'}`}>
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1 flex items-center justify-between">
                                        <span className="text-sm font-black tracking-wide">{t('social_ig')}</span>
                                        <svg className={`w-4 h-4 transition-transform duration-500 ${expandedSocial === 'instagram' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>

                                <div 
                                    className={`transition-all duration-500 ease-in-out bg-white/5 rounded-xl border border-white/10 overflow-hidden ${expandedSocial === 'instagram' ? 'max-h-[300px] py-2 opacity-100 mt-2 scale-100 visible' : 'max-h-0 opacity-0 scale-95 pointer-events-none invisible'}`}
                                >
                                    {instagramLinks.map((link, idx) => (
                                        <a key={idx} href={link.href} target="_blank" rel="noopener noreferrer" className="block px-6 py-4 text-sm hover:text-[#D4A853] hover:bg-white/5 transition-all flex items-center gap-3 text-right">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A853] shrink-0"></span>
                                            {link.label || 'Link'}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* WhatsApp Dropdown */}
                            <div className="space-y-2 relative">
                                <div
                                    onClick={() => setExpandedSocial(expandedSocial === 'whatsapp' ? null : 'whatsapp')}
                                    className={`flex items-center gap-4 transition-all duration-300 group w-full cursor-pointer select-none px-4 py-2 h-14 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 ${expandedSocial === 'whatsapp' ? 'ring-2 ring-white/10 bg-white/10 text-[#25D366]' : 'text-slate-400'}`}
                                >
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 shrink-0 ${expandedSocial === 'whatsapp' ? 'bg-white/10' : 'bg-white/5 border border-white/10'}`}>
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1 flex items-center justify-between">
                                        <span className="text-sm font-black tracking-wide">{t('social_wa')}</span>
                                        <svg className={`w-4 h-4 transition-transform duration-500 ${expandedSocial === 'whatsapp' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                                <div 
                                    className={`transition-all duration-500 ease-in-out bg-white/5 rounded-xl border border-white/10 overflow-hidden ${expandedSocial === 'whatsapp' ? 'max-h-[300px] py-2 opacity-100 mt-2 scale-100 visible' : 'max-h-0 opacity-0 scale-95 pointer-events-none invisible'}`}
                                >
                                    {[
                                        { href: "https://wa.me/201007006081", label: lt('phone_edu_psych_special') + " (01007006081)" },
                                        { href: "https://wa.me/201091010454", label: lt('phone_edu') + " (01091010454)" },
                                        { href: "https://wa.me/201093998000", label: lt('phone_psych_special') + " (01093998000)" }
                                    ].map((link, idx) => (
                                        <a key={idx} href={link.href} target="_blank" rel="noopener noreferrer" className="block px-6 py-4 text-sm hover:text-[#D4A853] hover:bg-white/5 transition-all flex items-center gap-3 text-right">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A853] shrink-0"></span>
                                            {link.label || 'Link'}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Phone Dropdown */}
                            <div className="space-y-2 relative">
                                <div
                                    onClick={() => setExpandedSocial(expandedSocial === 'phone' ? null : 'phone')}
                                    className={`flex items-center gap-4 transition-all duration-300 group w-full cursor-pointer select-none px-4 py-2 h-14 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 ${expandedSocial === 'phone' ? 'ring-2 ring-white/10 bg-white/10 text-[#D4A853]' : 'text-slate-400'}`}
                                >
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 shrink-0 ${expandedSocial === 'phone' ? 'bg-white/10' : 'bg-white/5 border border-white/10'}`}>
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1 flex items-center justify-between">
                                        <span className="text-sm font-black tracking-wide">{t('social_call')}</span>
                                        <svg className={`w-4 h-4 transition-transform duration-500 ${expandedSocial === 'phone' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>

                                <div 
                                    className={`transition-all duration-500 ease-in-out bg-white/5 rounded-xl border border-white/10 overflow-hidden ${expandedSocial === 'phone' ? 'max-h-[300px] py-2 opacity-100 mt-2 scale-100 visible' : 'max-h-0 opacity-0 scale-95 pointer-events-none invisible'}`}
                                >
                                    {phoneLinks.map((link, idx) => (
                                        <a key={idx} href={link.href} className="block px-6 py-4 text-sm hover:text-[#D4A853] hover:bg-white/5 transition-all flex items-center gap-3 text-right">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A853] shrink-0"></span>
                                            {link.label || 'Link'}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-3 pt-6 opacity-40 justify-center md:justify-start">
                                <span className="text-[10px] font-black uppercase tracking-widest leading-relaxed">{t('univ_name')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="text-center flex justify-center text-sm pt-8" style={{ color: 'var(--dark-section-text-muted)', borderTop: '1px solid var(--dark-section-border)' }}>
                    {t('copyright', { year: new Date().getFullYear() })}
                </div>
            </div>
        </footer>
    );
}
