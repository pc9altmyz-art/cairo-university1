"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { usePathname } from "@/i18n/routing";
import { ThemeSwitcher } from "./theme-switcher";
import { LanguageSwitcher } from "./language-switcher";
import { useTranslations } from "next-intl";

const NAV_LINKS = [
    { key: "nav_programs", href: "/programs" },
    { key: "nav_blog",     href: "/blog" },
    { key: "nav_about",    href: "/#about" },
    { key: "nav_contact",  href: "/#contact" },
    { key: "nav_forum",    href: "/forum" },
    { key: "nav_certificates", href: "/certificates", icon: true },
] as const;

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const t = useTranslations("Header");

    const [userAvatar, setUserAvatar] = useState<string | null>(null);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const syncProfile = () => {
            const savedAvatar = localStorage.getItem("forum_user_avatar");
            if (savedAvatar) setUserAvatar(savedAvatar);
        };
        syncProfile();
        window.addEventListener("storage", syncProfile);
        window.addEventListener("profile-update", syncProfile);
        return () => {
            window.removeEventListener("storage", syncProfile);
            window.removeEventListener("profile-update", syncProfile);
        };
    }, []);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Close mobile menu when navigating
    useEffect(() => { setIsMenuOpen(false); }, [pathname]);

    if (pathname?.includes("/admin")) return null;
    if (pathname?.includes("/links")) return null;

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-2 md:px-4 ${scrolled ? "pt-1 md:pt-2" : "pt-2 md:pt-3"}`}>
            <div className={`max-w-screen-xl mx-auto flex items-center justify-between gap-2 md:gap-4 px-3 sm:px-5 md:px-8 transition-all duration-500 border border-white/60 dark:border-white/10
                ${scrolled
                    ? "py-1.5 md:py-2 rounded-[1.5rem] md:rounded-[2rem] bg-white/90 dark:bg-slate-900/90 shadow-[0_8px_32px_rgba(0,0,0,0.10)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-2xl"
                    : "py-2 md:py-3 rounded-[2rem] md:rounded-[2.5rem] bg-white/75 dark:bg-slate-900/75 shadow-[0_4px_24px_rgba(0,0,0,0.06)] backdrop-blur-xl"
                }`}
            >
                {/* ── Logo ── */}
                <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0 group touch-action-manipulation">
                    <div className="relative">
                        <Image
                            src="/About.png"
                            alt="المؤسسة المصريه"
                            width={44}
                            height={44}
                            className={`object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-500 ${scrolled ? "w-8 h-8 md:w-10 md:h-10" : "w-9 h-9 md:w-11 md:h-11"}`}
                            unoptimized
                        />
                        <div className="absolute inset-0 bg-[#D4A853]/20 blur-lg rounded-full scale-0 group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
                    </div>
                    <div className="hidden sm:flex flex-col leading-tight">
                        <span className="text-sm md:text-base font-black text-[#1e3a8a] dark:text-blue-400">{t("title")}</span>
                        <span className="text-[9px] md:text-[10px] text-slate-500 font-bold uppercase tracking-wider hidden md:block">{t("subtitle")}</span>
                    </div>
                </Link>

                {/* ── Desktop Nav ── */}
                <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
                    {NAV_LINKS.map(({ key, href, icon }) => {
                        const isActive = pathname === href || (href !== "/" && pathname?.startsWith(href.split("#")[0]));
                        return (
                            <Link
                                key={key}
                                href={href}
                                className={`relative px-3 xl:px-4 py-2 rounded-xl font-bold text-sm xl:text-base transition-all duration-200 flex items-center gap-1.5 group
                                    ${isActive
                                        ? "text-[#1e3a8a] dark:text-[#D4A853] bg-[#1e3a8a]/8 dark:bg-[#D4A853]/10"
                                        : "text-slate-600 dark:text-slate-300 hover:text-[#1e3a8a] dark:hover:text-[#D4A853] hover:bg-slate-100/80 dark:hover:bg-white/5"
                                    }`}
                            >
                                {icon && (
                                    <svg className={`w-3.5 h-3.5 transition-colors ${isActive ? "text-[#D4A853]" : "text-slate-400 group-hover:text-[#D4A853]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                )}
                                {t(key as any)}
                                {isActive && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#D4A853]" />}
                            </Link>
                        );
                    })}
                </nav>

                {/* ── Actions ── */}
                <div className="flex items-center gap-1 sm:gap-2">
                    {/* Register CTA */}
                    <Link
                        href="/#contact"
                        className="hidden sm:flex items-center bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] text-white px-4 md:px-6 py-2 md:py-2.5 rounded-full font-black text-xs md:text-sm shadow-[0_8px_20px_-8px_rgba(30,58,138,0.6)] hover:shadow-[0_12px_24px_-8px_rgba(30,58,138,0.8)] active:scale-95 transition-all relative overflow-hidden group whitespace-nowrap"
                    >
                        <span className="relative z-10">{t("btn_register")}</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                    </Link>

                    {/* Small CTA on mobile */}
                    <Link
                        href="/#contact"
                        className="sm:hidden flex items-center bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] text-white px-3 py-2 rounded-full font-black text-xs active:scale-95 transition-all"
                    >
                        {t("btn_register_short")}
                    </Link>

                    {/* Profile */}
                    <Link
                        href="/profile"
                        className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-slate-600 dark:text-slate-400 hover:text-[#1e3a8a] dark:hover:text-[#D4A853] relative group overflow-hidden"
                        title="الملف الشخصي"
                    >
                        {userAvatar ? (
                            userAvatar.startsWith("/") || userAvatar.startsWith("http") ? (
                                <div className="relative w-7 h-7 rounded-lg overflow-hidden group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                    <Image src={userAvatar} alt="Avatar" fill className="object-cover" unoptimized />
                                </div>
                            ) : (
                                <span className="text-lg group-hover:scale-125 transition-transform">{userAvatar}</span>
                            )
                        ) : (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        )}
                    </Link>

                    <LanguageSwitcher />
                    <ThemeSwitcher />

                    {/* Hamburger */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors active:scale-90 touch-action-manipulation"
                        aria-label="فتح القائمة"
                    >
                        <svg className="w-5 h-5 text-slate-700 dark:text-slate-200 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* ── Mobile Menu ── */}
            {isMenuOpen && (
                <div className="lg:hidden mt-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/60 dark:border-white/10 overflow-hidden"
                     style={{ animation: "slideDown 0.25s ease" }}>
                    <nav className="flex flex-col p-3 gap-1">
                        {NAV_LINKS.map(({ key, href, icon }) => {
                            const isActive = pathname === href || (href !== "/" && pathname?.startsWith(href.split("#")[0]));
                            return (
                                <Link
                                    key={key}
                                    href={href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`flex items-center justify-between py-4 px-5 rounded-2xl font-bold text-base transition-all active:scale-98 touch-action-manipulation
                                        ${isActive
                                            ? "bg-[#1e3a8a]/8 dark:bg-[#D4A853]/10 text-[#1e3a8a] dark:text-[#D4A853]"
                                            : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5"
                                        }`}
                                >
                                    <span className="flex items-center gap-3">
                                        {icon && (
                                            <svg className="w-5 h-5 text-[#D4A853]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        )}
                                        {t(key as any)}
                                    </span>
                                    <svg className={`w-4 h-4 transition-colors ${isActive ? "text-[#D4A853]" : "text-slate-300"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* CTA inside mobile menu */}
                    <div className="px-3 pb-3">
                        <Link
                            href="/#contact"
                            onClick={() => setIsMenuOpen(false)}
                            className="w-full flex items-center justify-center bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] text-white py-4 rounded-2xl font-black text-base shadow-lg active:scale-98 transition-all"
                        >
                            {t("btn_register")}
                        </Link>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-12px) scale(0.98); }
                    to   { opacity: 1; transform: translateY(0) scale(1); }
                }
            `}</style>
        </header>
    );
}
