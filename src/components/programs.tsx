"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { categories, getProgramsByCategory, type Program } from "@/data/programs";
import { use3DTilt } from "@/hooks/use-3d-tilt";
import { useTranslations } from "next-intl";

export default function Programs() {
    const [activeCategory, setActiveCategory] = useState(categories[0].id);
    const [searchQuery, setSearchQuery] = useState("");
    const t = useTranslations('Programs');
    const tc = useTranslations('Categories');
    const tp = useTranslations('ProgramsData');

    const allPrograms = getProgramsByCategory(activeCategory);
    const activePrograms = allPrograms.filter((p: Program) =>
        tp(`${p.id}.title`).toLowerCase().includes(searchQuery.toLowerCase()) ||
        tp(`${p.id}.description`).toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <section id="programs" className="py-32 bg-[#FDFCFB]">
            <div className="container mx-auto">
                {/* Header omitted for brevity */}

                {/* Search & Categories */}
                <div className="mb-16 px-4">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-12">
                        {/* Search Bar */}
                        <div className="relative w-full lg:max-w-md group">
                            <input
                                type="text"
                                placeholder={t('search_ph')}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full ltr:pl-12 rtl:pr-12 rtl:pl-6 ltr:pr-6 py-4 rounded-2xl bg-white border border-slate-100 shadow-sm focus:border-[#1e3a8a] focus:ring-4 focus:ring-[#1e3a8a]/5 outline-none transition-all ltr:text-left rtl:text-right"
                            />
                            <svg className="w-6 h-6 text-slate-400 absolute rtl:right-4 ltr:left-4 top-1/2 -translate-y-1/2 group-focus-within:text-[#1e3a8a] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        {/* Categories */}
                        <div className="flex flex-wrap justify-end gap-3">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => {
                                        setActiveCategory(category.id);
                                        setSearchQuery(""); // Clear search on category change
                                    }}
                                    className={`
                                        group flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-sm transition-all duration-500
                                        ${activeCategory === category.id
                                            ? "bg-[#1e3a8a] text-white shadow-[0_15px_30px_-10px_rgba(30,58,138,0.4)] scale-105"
                                            : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-100 shadow-sm"
                                        }
                                    `}
                                >
                                    <span className={`text-xl group-hover:scale-125 transition-transform duration-500 ${activeCategory === category.id ? "scale-110" : "opacity-70 grayscale"}`}>
                                        {category.icon}
                                    </span>
                                    {tc(`${category.id}.name`) || category.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Programs Grid */}
                {activePrograms.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 px-4">
                        {activePrograms.map((program: Program) => (
                            <ProgramCard key={program.id} program={program} t={t} tp={tp} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 px-4">
                        <div className="text-6xl mb-6">🔍</div>
                        <h3 className="text-2xl font-black text-slate-900 mb-2">{t('empty_title')}</h3>
                        <p className="text-slate-500">{t('empty_desc')}</p>
                    </div>
                )}

                {/* Visual Accent */}
                <div className="mt-24 text-center">
                    <div className="inline-flex items-center gap-4 p-2 rtl:pl-6 ltr:pr-6 bg-slate-50 rounded-full border border-slate-100">
                        <span className="bg-[#1e3a8a] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">{t('badge_new')}</span>
                        <p className="text-slate-500 text-sm font-medium">{t('accent_text')}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ProgramCard({ program, t, tp }: { program: Program, t: any, tp: any }) {
    const { style, handleMouseMove, handleMouseLeave } = use3DTilt(10);

    return (
        <div
            className="premium-card group overflow-hidden h-full flex flex-col will-change-transform [transform-style:preserve-3d]"
            style={style}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Header Image Area */}
            <div className="h-56 overflow-hidden relative" style={{ transform: "translateZ(30px)" }}>
                <Image
                    src={program.image}
                    alt={tp(`${program.id}.title`)}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[0.2] group-hover:grayscale-0"
                />
                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-80" />

                {/* Badges */}
                <div className="absolute top-4 rtl:right-4 ltr:left-4 flex flex-col gap-2" style={{ transform: "translateZ(40px)" }}>
                    {program.isNew && (
                        <span className="bg-[#D4A853] text-[#172554] text-[10px] font-black px-3 py-1.5 rounded-lg shadow-xl uppercase tracking-widest border border-white/20">
                            {t('badge_new')}
                        </span>
                    )}
                    {program.status && (
                        <div className={`
                            relative overflow-hidden px-3 py-1.5 rounded-lg shadow-2xl flex items-center gap-2 border border-white/20
                            ${program.status === 'started' ? 'bg-gradient-to-r from-emerald-500 to-teal-600' :
                                program.status === 'closed' ? 'bg-gradient-to-r from-rose-600 to-[#1e3a8a]' :
                                    'bg-gradient-to-r from-amber-400 to-[#D4A853]'}
                        `}>
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                            </span>
                            <span className="text-white text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                                {t(`status_${program.status}`)}
                            </span>
                        </div>
                    )}
                    <span className="bg-white/90 backdrop-blur-md text-[#1e3a8a] text-[10px] font-black px-3 py-1.5 rounded-lg shadow-xl uppercase tracking-widest border border-slate-200/50">
                        {t('badge_certified')}
                    </span>
                </div>

                {/* Price Tag */}
                <div className="absolute bottom-4 rtl:right-4 ltr:left-4 bg-white/10 backdrop-blur-md border border-white/20 p-2 px-4 rounded-xl text-white font-bold text-sm" style={{ transform: "translateZ(30px)" }}>
                    {tp(`${program.id}.price`)}
                </div>
            </div>

            {/* Content Area */}
            <div className="p-8 flex-grow flex flex-col" style={{ transform: "translateZ(20px)" }}>
                <div className="flex items-center gap-2 text-[#D4A853] text-xs font-black mb-4 tracking-wider uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {tp(`${program.id}.duration`)} • {t('badge_online')}
                </div>

                <h3 className="text-xl font-black text-slate-900 mb-4 group-hover:text-[#1e3a8a] transition-colors leading-tight min-h-[3rem]">
                    {tp(`${program.id}.title`)}
                </h3>

                <p className="text-slate-500 text-sm mb-8 leading-relaxed line-clamp-2">
                    {tp(`${program.id}.description`)}
                </p>

                {/* Features */}
                <div className="mt-auto pt-6 border-t border-slate-50">
                    <div className="flex flex-wrap gap-2 mb-8">
                        {tp.raw(`${program.id}.features`).slice(0, 2).map((feature: string, i: number) => (
                            <span key={i} className="text-[10px] font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-md">
                                {feature}
                            </span>
                        ))}
                    </div>

                    <Link
                        href={`/programs/${program.id}`}
                        className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-slate-900 text-white font-black text-sm hover:bg-[#1e3a8a] transition-all duration-300 shadow-lg hover:shadow-[#1e3a8a]/30 group/btn"
                        style={{ transform: "translateZ(40px)" }}
                    >
                        <span>{t('btn_details')}</span>
                        <svg className="w-4 h-4 transform rtl:rotate-180 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}
