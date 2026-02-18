"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 mt-6 transition-all duration-500">
            <div className="container mx-auto py-0 !max-w-[1700px]">
                <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-premium px-8 sm:px-12 py-6 flex items-center justify-between border border-white/40 ring-1 ring-black/[0.03] hover:shadow-brand-glow transition-all duration-700">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-4">
                        <Image
                            src="/logo.png"
                            alt={siteConfig.name}
                            width={56}
                            height={56}
                            className="h-12 w-12 sm:h-14 sm:w-14 object-contain"
                        />
                        <div className="hidden sm:block">
                            <div className="text-xl font-bold text-[#7C2D36] tracking-tight">{siteConfig.name}</div>
                            <div className="text-sm text-slate-500 font-medium tracking-wide">البرامج التدريبية</div>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-12">
                        <Link href="/programs" className="text-slate-600 hover:text-[#7C2D36] transition-colors font-bold text-lg">
                            البرامج
                        </Link>
                        <Link href="/#about" className="text-slate-600 hover:text-[#7C2D36] transition-colors font-bold text-lg">
                            عن الجامعة
                        </Link>
                        <Link href="/#contact" className="text-slate-600 hover:text-[#7C2D36] transition-colors font-bold text-lg">
                            تواصل معنا
                        </Link>
                    </nav>

                    {/* CTA + Mobile Menu Button */}
                    <div className="flex items-center gap-5">
                        <Link
                            href="/#contact"
                            className="bg-[#7C2D36] text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl font-black text-lg hover:bg-[#5C1F27] transition-all shadow-lg hover:shadow-brand-glow hover:-translate-y-0.5"
                        >
                            سجل الآن
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
            </div>
        </header>
    );
}
