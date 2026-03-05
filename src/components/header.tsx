"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { usePathname } from "next/navigation";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    if (pathname?.startsWith("/admin")) return null;

    return (
        <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 pt-4 px-4 isolate">
            <div className="max-w-7xl mx-auto bg-white/60 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_8px_32px_rgba(0,0,0,0.06)] px-6 md:px-12 py-3 flex items-center justify-between border border-white/60 ring-1 ring-black/[0.02] transition-all duration-700 hover:bg-white/70 hover:shadow-[0_8px_32px_rgba(124,45,54,0.1)]">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-4">
                    <Image
                        src="/logo.png"
                        alt={siteConfig.name}
                        width={50}
                        height={50}
                        className="h-11 w-11 sm:h-12 sm:w-12 object-contain"
                    />
                    <div className="hidden sm:block">
                        <div className="text-lg lg:text-xl font-bold text-[#7C2D36] leading-tight">{siteConfig.name}</div>
                        <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">البرامج التدريبية</div>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-12">
                    <Link href="/programs" className="text-slate-600 hover:text-[#7C2D36] transition-all font-bold text-base lg:text-lg hover:drop-shadow-[0_2px_10px_rgba(124,45,54,0.3)] hover:-translate-y-0.5">
                        البرامج
                    </Link>
                    <Link href="/#about" className="text-slate-600 hover:text-[#7C2D36] transition-all font-bold text-base lg:text-lg hover:drop-shadow-[0_2px_10px_rgba(124,45,54,0.3)] hover:-translate-y-0.5">
                        عن الجامعة
                    </Link>
                    <Link href="/#contact" className="text-slate-600 hover:text-[#7C2D36] transition-all font-bold text-base lg:text-lg hover:drop-shadow-[0_2px_10px_rgba(124,45,54,0.3)] hover:-translate-y-0.5">
                        تواصل معنا
                    </Link>
                </nav>

                {/* CTA + Mobile Menu Button */}
                <div className="flex items-center gap-6">
                    <Link
                        href="/#contact"
                        className="bg-gradient-to-r from-[#7C2D36] to-[#9B3944] text-white px-8 py-3 rounded-full font-black text-base lg:text-lg transition-all duration-300 shadow-[0_10px_20px_-10px_rgba(124,45,54,0.6)] hover:shadow-[0_15px_30px_-10px_rgba(124,45,54,0.8)] hover:-translate-y-1 hover:scale-105 active:scale-95 border border-white/20 relative overflow-hidden group"
                    >
                        <span className="relative z-10">سجل الآن</span>
                        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" />
                    </Link>

                    {/* Hamburger Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
                        aria-label="فتح القائمة"
                    >
                        <svg className="w-6 h-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                <div className="md:hidden mt-2 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg p-4 border border-slate-100">
                    <nav className="flex flex-col gap-3">
                        <Link
                            href="/programs"
                            onClick={() => setIsMenuOpen(false)}
                            className="text-slate-700 hover:text-[#7C2D36] transition-colors font-medium py-2 px-3 rounded-lg hover:bg-slate-50"
                        >
                            البرامج التدريبية
                        </Link>
                        <Link
                            href="/#about"
                            onClick={() => setIsMenuOpen(false)}
                            className="text-slate-700 hover:text-[#7C2D36] transition-colors font-medium py-2 px-3 rounded-lg hover:bg-slate-50"
                        >
                            عن الجامعة
                        </Link>
                        <Link
                            href="/#contact"
                            onClick={() => setIsMenuOpen(false)}
                            className="text-slate-700 hover:text-[#7C2D36] transition-colors font-medium py-2 px-3 rounded-lg hover:bg-slate-50"
                        >
                            التسجيل
                        </Link>
                        <Link
                            href="/#contact"
                            onClick={() => setIsMenuOpen(false)}
                            className="text-slate-700 hover:text-[#7C2D36] transition-colors font-medium py-2 px-3 rounded-lg hover:bg-slate-50"
                        >
                            تواصل معنا
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
