"use client";

import { useState, useEffect } from "react";
import { Link, usePathname } from "@/i18n/routing";
import Image from "next/image";
import { ThemeSwitcher } from "./theme-switcher";
import { LanguageSwitcher } from "./language-switcher";
import { useTranslations } from "next-intl";

type NavLink = { key: string; href: string; icon?: boolean; hash?: boolean };

const NAV_LINKS: NavLink[] = [
    { key: "nav_programs",     href: "/programs" },
    { key: "nav_blog",         href: "/blog" },
    { key: "nav_about",        href: "/#about",   hash: true },
    { key: "nav_contact",      href: "/#contact",  hash: true },
    { key: "nav_forum",        href: "/forum" },
    { key: "nav_certificates", href: "/certificates", icon: true },
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled]     = useState(false);
    const [userAvatar, setUserAvatar] = useState<string | null>(null);
    const pathname = usePathname();
    const t = useTranslations("Header");

    // ── scroll shrink ──
    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", fn);
        return () => window.removeEventListener("scroll", fn);
    }, []);

    // ── avatar sync ──
    useEffect(() => {
        const sync = () => {
            const a = localStorage.getItem("forum_user_avatar");
            if (a) setUserAvatar(a);
        };
        sync();
        window.addEventListener("storage", sync);
        window.addEventListener("profile-update", sync);
        return () => {
            window.removeEventListener("storage", sync);
            window.removeEventListener("profile-update", sync);
        };
    }, []);

    useEffect(() => { setIsMenuOpen(false); }, [pathname]);

    if (String(pathname).includes("/admin")) return null;
    if (String(pathname).includes("/links")) return null;

    const isActive = (href: string, hash?: boolean) => {
        if (hash) return false; // hash anchors never "active"
        const p = String(pathname);
        if (href === "/") return p === "/";
        return p === href || p.startsWith(href + "/");
    };

    return (
        <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 px-3 md:px-5 ${scrolled ? "pt-1 md:pt-2" : "pt-2 md:pt-3"}`}>
            {/* ── Pill container ── */}
            <div className={`mx-auto max-w-screen-xl flex items-center justify-between gap-2 border transition-all duration-300
                ${scrolled
                    ? "py-1.5 md:py-2 rounded-2xl bg-white/95 dark:bg-slate-900/95 border-slate-200/80 dark:border-white/10 shadow-lg backdrop-blur-2xl"
                    : "py-2 md:py-3 rounded-3xl bg-white/80 dark:bg-slate-900/80 border-white/60 dark:border-white/10 shadow-md backdrop-blur-xl"
                } px-3 sm:px-5 md:px-8`}>

                {/* ── Logo ── */}
                <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0 group">
                    <div className="relative">
                        <Image src="/About.png" alt="المؤسسة" width={40} height={40}
                            className={`object-contain drop-shadow-sm transition-all duration-300 group-hover:scale-105 ${scrolled ? "w-8 h-8" : "w-9 h-9 md:w-10 md:h-10"}`}
                            unoptimized />
                        <div className="absolute inset-0 bg-[#D4A853]/20 blur-lg rounded-full scale-0 group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
                    </div>
                    <div className="hidden sm:block">
                        <div className="text-[13px] md:text-sm font-black text-[#1e3a8a] dark:text-blue-400 leading-tight">{t("title")}</div>
                        <div className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider hidden md:block">{t("subtitle")}</div>
                    </div>
                </Link>

                {/* ── Desktop nav ── */}
                <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
                    {NAV_LINKS.map(({ key, href, icon, hash }) => {
                        const active = isActive(href, hash);
                        return (
                            <Link key={key} href={href}
                                className={`relative flex items-center gap-1.5 px-3 xl:px-4 py-2 rounded-xl font-bold text-[13px] xl:text-sm transition-all duration-200 group
                                    ${active
                                        ? "text-[#1e3a8a] dark:text-[#D4A853] bg-[#1e3a8a]/[0.07] dark:bg-[#D4A853]/10"
                                        : "text-slate-600 dark:text-slate-300 hover:text-[#1e3a8a] dark:hover:text-[#D4A853] hover:bg-slate-100 dark:hover:bg-white/5"
                                    }`}>
                                {icon && (
                                    <svg className={`w-3.5 h-3.5 shrink-0 ${active ? "text-[#D4A853]" : "text-slate-400 group-hover:text-[#D4A853] transition-colors"}`}
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                )}
                                {t(key as Parameters<typeof t>[0])}
                                {active && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#D4A853]" />}
                            </Link>
                        );
                    })}
                </nav>

                {/* ── Actions ── */}
                <div className="flex items-center gap-1 sm:gap-2">
                    {/* Register CTA */}
                    <Link href="/#contact"
                        className="flex items-center bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] text-white rounded-full font-black shadow-[0_4px_14px_-4px_rgba(30,58,138,0.5)] hover:shadow-[0_8px_20px_-4px_rgba(30,58,138,0.7)] hover:-translate-y-0.5 active:scale-95 transition-all relative overflow-hidden group
                            px-3 py-2 text-[11px] sm:px-5 sm:py-2.5 sm:text-sm md:px-6 md:text-base">
                        <span className="relative z-10 hidden sm:inline">{t("btn_register")}</span>
                        <span className="relative z-10 sm:hidden">{t("btn_register_short")}</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                    </Link>

                    {/* Profile */}
                    <Link href="/profile" title="الملف الشخصي"
                        className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-slate-500 hover:text-[#1e3a8a] dark:text-slate-400 dark:hover:text-[#D4A853] overflow-hidden group">
                        {userAvatar
                            ? (userAvatar.startsWith("/") || userAvatar.startsWith("http")
                                ? <div className="relative w-7 h-7 rounded-lg overflow-hidden group-hover:scale-110 transition-transform">
                                    <Image src={userAvatar} alt="Avatar" fill className="object-cover" unoptimized />
                                  </div>
                                : <span className="text-lg group-hover:scale-125 transition-transform">{userAvatar}</span>)
                            : <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>}
                    </Link>

                    <LanguageSwitcher />
                    <ThemeSwitcher />

                    {/* Hamburger — shown below lg */}
                    <button onClick={() => setIsMenuOpen(v => !v)} aria-label="القائمة"
                        className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors active:scale-90 touch-action-manipulation">
                        <svg className="w-5 h-5 text-slate-700 dark:text-slate-200 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isMenuOpen
                                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />}
                        </svg>
                    </button>
                </div>
            </div>

            {/* ── Mobile menu ── */}
            {isMenuOpen && (
                <div className="lg:hidden mt-2 bg-white/98 dark:bg-slate-900/98 backdrop-blur-2xl rounded-3xl border border-slate-200/60 dark:border-white/10 shadow-2xl overflow-hidden"
                     style={{ animation: "slideDown .22s ease" }}>
                    <nav className="flex flex-col p-3 gap-1">
                        {NAV_LINKS.map(({ key, href, icon }) => {
                            const active = isActive(href);
                            return (
                                <Link key={key} href={href} onClick={() => setIsMenuOpen(false)}
                                    className={`flex items-center justify-between py-4 px-5 rounded-2xl font-bold text-[15px] transition-all touch-action-manipulation active:scale-[.98]
                                        ${active
                                            ? "bg-[#1e3a8a]/[.07] dark:bg-[#D4A853]/10 text-[#1e3a8a] dark:text-[#D4A853]"
                                            : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5"
                                        }`}>
                                    <span className="flex items-center gap-3">
                                        {icon && (
                                            <svg className="w-5 h-5 text-[#D4A853]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        )}
                                        {t(key as Parameters<typeof t>[0])}
                                    </span>
                                    <svg className={`w-4 h-4 ${active ? "text-[#D4A853]" : "text-slate-300"}`}
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </Link>
                            );
                        })}
                    </nav>
                    <div className="px-3 pb-3">
                        <Link href="/#contact" onClick={() => setIsMenuOpen(false)}
                            className="w-full flex items-center justify-center bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] text-white py-4 rounded-2xl font-black text-base shadow-md active:scale-[.98] transition-all">
                            {t("btn_register")}
                        </Link>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes slideDown {
                    from { opacity:0; transform:translateY(-10px) scale(.98); }
                    to   { opacity:1; transform:translateY(0) scale(1); }
                }
            `}</style>
        </header>
    );
}
