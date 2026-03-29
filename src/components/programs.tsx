"use client";

import { useState, useEffect, Suspense } from "react";
import { Link } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { categories, getProgramsByCategory, type Program } from "@/data/programs";
import { use3DTilt } from "@/hooks/use-3d-tilt";
import { useTranslations } from "next-intl";
import { useMagnetic } from "@/hooks/use-magnetic";

export default function Programs() {
    return (
        <Suspense fallback={<div className="py-20 text-center animate-pulse">جاري التحميل...</div>}>
            <ProgramsContent />
        </Suspense>
    );
}

function ProgramsContent() {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get('category') || categories[0].id;
    const [activeCategory, setActiveCategory] = useState(initialCategory);
    const [searchQuery, setSearchQuery] = useState("");
    const t = useTranslations('Programs');
    const tc = useTranslations('Categories');
    const tp = useTranslations('ProgramsData');

    // Update active category if search params change (e.g., navigating back)
    useEffect(() => {
        const cat = searchParams.get('category');
        if (cat && categories.find(c => c.id === cat)) {
            setActiveCategory(cat);
        }
    }, [searchParams]);

    const allPrograms = getProgramsByCategory(activeCategory);
    const activePrograms = allPrograms.filter((p: Program) =>
        tp(`${p.id}.title`).toLowerCase().includes(searchQuery.toLowerCase()) ||
        tp(`${p.id}.description`).toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <section id="programs" className="py-16 md:py-32 bg-slate-50 dark:bg-[#0F172A] transition-colors duration-500">
            <div className="container mx-auto">
                {/* Header omitted for brevity */}

                {/* Search & Categories */}
                <div className="mb-16 px-4">
                    {/* Search Bar */}
                    <div className="relative w-full max-w-lg mx-auto mb-6">
                        <input
                            type="text"
                            placeholder={t('search_ph')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full ltr:pl-12 rtl:pr-12 rtl:pl-6 ltr:pr-6 py-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm focus:border-[#1e3a8a] dark:focus:border-[#D4A853] focus:ring-4 focus:ring-[#1e3a8a]/5 outline-none transition-all ltr:text-left rtl:text-right text-sm text-slate-900 dark:text-white"
                        />
                        <svg className="w-5 h-5 text-slate-400 absolute rtl:right-4 ltr:left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    {/* Categories - centered on mobile */}
                    <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => {
                                    setActiveCategory(category.id);
                                    setSearchQuery("");
                                }}
                                className={`
                                    group flex items-center gap-2 px-4 py-2.5 md:px-8 md:py-4 rounded-2xl font-bold text-xs md:text-sm transition-all duration-500 touch-manipulation
                                    ${activeCategory === category.id
                                        ? "bg-[#1e3a8a] text-white shadow-[0_10px_20px_-10px_rgba(30,58,138,0.5)] scale-105"
                                        : "bg-white dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 shadow-sm"
                                    }
                                `}
                            >
                                <span className={`text-lg md:text-xl transition-all duration-500 ${activeCategory === category.id ? "scale-110" : "opacity-70 grayscale"}`}>
                                    {category.icon}
                                </span>
                                {tc(`${category.id}.name`) || category.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Programs Grid */}
                {activePrograms.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 px-4">
                        {activePrograms.map((program: Program) => (
                            <ProgramCard key={program.id} program={program} t={t} tp={tp} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 px-4">
                        <div className="text-6xl mb-6">🔍</div>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">{t('empty_title')}</h3>
                        <p className="text-slate-500 dark:text-slate-400">{t('empty_desc')}</p>
                    </div>
                )}

                {/* Visual Accent */}
                <div className="mt-24 text-center">
                    <div className="inline-flex items-center gap-4 p-2 rtl:pl-6 ltr:pr-6 bg-white dark:bg-white/5 rounded-full border border-slate-200 dark:border-white/10 shadow-sm">
                        <span className="bg-[#1e3a8a] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter shadow-sm">{t('badge_new')}</span>
                        <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">{t('accent_text')}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ProgramCard({ program, t, tp }: { program: Program, t: any, tp: any }) {
    const { style, handleMouseMove, handleMouseLeave: handleTiltLeave } = use3DTilt(10);
    const detailBtnRef = useMagnetic();

    const handleCombinedLeave = (e: any) => {
        handleTiltLeave();
    };

    return (
        <div
            className="group relative h-full flex flex-col transition-transform duration-500 md:will-change-transform md:[transform-style:preserve-3d] md:perspective-1000"
            style={style}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleCombinedLeave}
        >
            <Link
                href={`/programs/${program.id}`}
                className="bg-white dark:bg-[#0F172A]/80 backdrop-blur-3xl rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10 group-hover:shadow-[0_40px_80px_-20px_rgba(30,58,138,0.3)] group-hover:border-[#D4A853]/40 transition-all duration-700 flex flex-col h-full relative"
            >
                {/* Glowing Effect underneath the card hover */}
                <div className="absolute inset-0 bg-[#D4A853]/5 opacity-0 group-hover:opacity-100 blur-[80px] transition-opacity duration-1000 -z-10" />

                {/* Header Image Area */}
                <div className="h-56 overflow-hidden relative md:[transform:translateZ(30px)]">
                    <Image
                        src={program.image}
                        alt={tp(`${program.id}.title`)}
                        fill
                        className="object-cover group-hover:scale-110 group-hover:rotate-2 transition-transform duration-1000 grayscale-[0.2] group-hover:grayscale-0"
                        unoptimized
                    />
                    
                    {/* Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/20 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-700" />
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[2.5rem]" />

                    {/* Badges */}
                    <div className="absolute top-4 rtl:right-4 ltr:left-4 flex flex-col gap-2 md:[transform:translateZ(40px)]">
                        <span className="bg-gradient-to-r from-[#D4A853] to-[#e3c17a] text-[#172554] text-[10px] font-black px-4 py-2 rounded-2xl shadow-xl uppercase tracking-[0.2em] border border-white/20 whitespace-nowrap">
                            {t('badge_certified')}
                        </span>
                        {program.isNew && (
                            <span className="bg-white/10 backdrop-blur-md text-[#D4A853] text-[10px] font-black px-4 py-2 rounded-2xl shadow-xl uppercase tracking-[0.2em] border border-[#D4A853]/40 whitespace-nowrap">
                                {t('badge_new')}
                            </span>
                        )}
                        {program.status && (
                            <div className={`
                                relative overflow-hidden px-4 py-2 rounded-2xl shadow-2xl flex items-center gap-2 border border-white/10 whitespace-nowrap md:[transform:translateZ(50px)]
                                ${program.status === 'started' ? 'bg-gradient-to-r from-emerald-500 to-teal-600' :
                                    program.status === 'closed' ? 'bg-gradient-to-r from-rose-600 to-[#1e3a8a]' :
                                        'bg-gradient-to-r from-amber-400 to-[#D4A853]'}
                            `}>
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                                </span>
                                <span className="text-white text-[10px] font-black uppercase tracking-[0.2em]">
                                    {t(`status_${program.status}`)}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Ambient Glow */}
                    <div className="absolute bottom-[-10px] left-0 right-0 h-10 bg-[#D4A853]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>

                {/* Content Area */}
                <div className="p-8 flex-grow flex flex-col relative z-10 md:[transform:translateZ(20px)]">
                    <div className="flex items-center gap-2 text-[#D4A853] group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-500 text-xs font-black mb-4 tracking-widest uppercase">
                        <span className="w-2 h-2 rounded-full bg-current animate-pulse shadow-[0_0_8px_rgba(212,168,83,0.5)]" />
                        {tp(`${program.id}.duration`)} • {t('badge_online')}
                    </div>

                    <h3 className="text-xl lg:text-2xl font-black text-slate-900 dark:text-white mb-6 group-hover:text-[#D4A853] transition-colors leading-[1.3] min-h-[3.5rem]">
                        {tp(`${program.id}.title`)}
                    </h3>

                    {/* Features Snippet */}
                    <div className="flex flex-wrap gap-2 mb-8">
                        {tp.raw(`${program.id}.features`).slice(0, 2).map((feature: string, i: number) => (
                            <span key={i} className="text-[10px] font-black text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-white/5 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-white/5">
                                {feature}
                            </span>
                        ))}
                    </div>

                    {/* Bottom Action Area */}
                    <div className="mt-auto pt-6 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase font-black text-slate-400 dark:text-slate-500 block tracking-widest mb-1">{t('label_investment') || "الاستثمار"}</span>
                            <span className="font-black text-[#1e3a8a] dark:text-[#D4A853] text-lg lg:text-xl tracking-tighter">{tp(`${program.id}.price`)}</span>
                        </div>

                        <div 
                            ref={detailBtnRef}
                            className="bg-[#1e3a8a] text-white px-4 md:px-6 py-2.5 md:py-3 rounded-2xl text-[10px] md:text-xs font-black hover:bg-[#D4A853] hover:text-[#172554] transition-all duration-500 flex items-center gap-2 md:gap-3 shadow-xl magnetic-btn shrink-0"
                        >
                            <span>{t('btn_details')}</span>
                            <svg className="w-3.5 h-3.5 md:w-4 md:h-4 transform rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
