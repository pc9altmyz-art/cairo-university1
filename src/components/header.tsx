"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "./theme-switcher";
import { LanguageSwitcher } from "./language-switcher";
import { useTranslations } from "next-intl";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const t = useTranslations('Header');

    if (pathname?.startsWith("/admin")) return null;

    return (
        <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 pt-2 md:pt-4 px-1.5 md:px-4 isolate">
            <div className="max-w-7xl mx-auto bg-white/60 dark:bg-slate-900/80 backdrop-blur-2xl rounded-[2rem] md:rounded-[2.5rem] shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] px-4 sm:px-6 md:px-12 py-2 md:py-3 flex items-center justify-between border border-white/60 dark:border-white/10 ring-1 ring-black/[0.02] dark:ring-white/[0.05] transition-all duration-700 hover:bg-white/70 dark:hover:bg-slate-900/90 hover:shadow-[0_8px_32px_rgba(30,58,138,0.1)]">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 sm:gap-4 relative group/logo transition-all duration-500 shrink-0">
                    {/* Ultra-Premium Ramadan Float */}
                    <div className="absolute -top-1 -left-1 text-xs text-[#D4A853] animate-fluid-ramadan pointer-events-none drop-shadow-[0_0_10px_rgba(212,168,83,0.5)] z-20">🌙</div>
                    <div className="relative flex items-center gap-2 z-10 group-hover/logo:scale-105 transition-transform duration-500">
                        <Image
                            src="/About.png"
                            alt="المؤسسة المصرية"
                            width={54}
                            height={54}
                            className="h-10 w-10 sm:h-14 sm:w-14 object-contain filter drop-shadow-lg"
                            unoptimized
                        />
                        {/* Ambient Glow behind logos */}
                        <div className="absolute inset-0 bg-[#D4A853]/20 blur-xl rounded-full scale-0 group-hover/logo:scale-150 transition-transform duration-700" />
                    </div>
                    <div className="hidden sm:block">
                        <div className="text-sm md:text-lg lg:text-xl font-bold text-[#1e3a8a] dark:text-blue-400 leading-tight">{t('title')}</div>
                        <div className="hidden md:block text-[10px] text-slate-500 font-bold uppercase tracking-wider">{t('subtitle')}</div>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-12">
                    <Link href="/programs" className="text-slate-600 dark:text-slate-300 hover:text-[#1e3a8a] dark:hover:text-[#D4A853] transition-all font-bold text-base lg:text-lg hover:drop-shadow-[0_2px_10px_rgba(30,58,138,0.3)] hover:-translate-y-0.5">
                        {t('nav_programs')}
                    </Link>
                    <Link href="/#about" className="text-slate-600 dark:text-slate-300 hover:text-[#1e3a8a] dark:hover:text-[#D4A853] transition-all font-bold text-base lg:text-lg hover:drop-shadow-[0_2px_10px_rgba(30,58,138,0.3)] hover:-translate-y-0.5">
                        {t('nav_about')}
                    </Link>
                    <Link href="/#contact" className="text-slate-600 dark:text-slate-300 hover:text-[#1e3a8a] dark:hover:text-[#D4A853] transition-all font-bold text-base lg:text-lg hover:drop-shadow-[0_2px_10px_rgba(30,58,138,0.3)] hover:-translate-y-0.5">
                        {t('nav_contact')}
                    </Link>
                </nav>

                {/* CTA + Mobile Menu Button */}
                <div className="flex items-center gap-1.5 sm:gap-4 md:gap-6">
                    <Link
                        href="/#contact"
                        className="bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] text-white px-2.5 sm:px-8 py-2 md:py-3 rounded-full font-black text-[13px] sm:text-base lg:text-lg shadow-[0_10px_20px_-10px_rgba(30,58,138,0.6)] hover:shadow-[0_15px_30px_-10px_rgba(30,58,138,0.8)] active:scale-95 border border-white/20 relative overflow-hidden group flex items-center justify-center whitespace-nowrap magnetic-btn shrink-0"
                    >
                        <span className="relative z-10 hidden sm:inline text-white">{t('btn_register')}</span>
                        <span className="relative z-10 sm:hidden text-white">{t('btn_register_short')}</span>
                        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] rtl:translate-x-[150%] group-hover:translate-x-[150%] rtl:group-hover:-translate-x-[150%] transition-transform duration-700 ease-in-out" />
                    </Link>

                    <div className="flex items-center gap-1 sm:gap-2">
                        <LanguageSwitcher />
                        <ThemeSwitcher />
                    </div>

                    {/* Hamburger Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        aria-label="فتح القائمة"
                    >
                        <svg className="w-6 h-6 text-slate-700 dark:text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden mt-3 bg-white/80 dark:bg-slate-900/90 backdrop-blur-3xl rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] p-4 border border-white/60 dark:border-white/10 animate-in fade-in zoom-in-95 duration-300">
                    <nav className="flex flex-col gap-2">
                        <Link
                            href="/programs"
                            onClick={() => setIsMenuOpen(false)}
                            className="text-slate-700 dark:text-slate-200 hover:text-[#1e3a8a] dark:hover:text-[#D4A853] transition-all font-bold py-4 px-5 rounded-2xl hover:bg-white/50 dark:hover:bg-white/5 flex items-center justify-between group"
                        >
                            <span>{t('nav_programs')}</span>
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                        </Link>
                        <Link
                            href="/#about"
                            onClick={() => setIsMenuOpen(false)}
                            className="text-slate-700 dark:text-slate-200 hover:text-[#1e3a8a] dark:hover:text-[#D4A853] transition-all font-bold py-4 px-5 rounded-2xl hover:bg-white/50 dark:hover:bg-white/5 flex items-center justify-between group"
                        >
                            <span>{t('nav_about')}</span>
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                        </Link>
                        <Link
                            href="/#contact"
                            onClick={() => setIsMenuOpen(false)}
                            className="text-slate-700 dark:text-slate-200 hover:text-[#1e3a8a] dark:hover:text-[#D4A853] transition-all font-bold py-4 px-5 rounded-2xl hover:bg-white/50 dark:hover:bg-white/5 flex items-center justify-between group"
                        >
                            <span>{t('nav_contact')}</span>
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
