"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { categories, getProgramsByCategory, type Program } from "@/data/programs";

export default function Programs() {
    const [activeCategory, setActiveCategory] = useState(categories[0].id);
    const [searchQuery, setSearchQuery] = useState("");

    const allPrograms = getProgramsByCategory(activeCategory);
    const activePrograms = allPrograms.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchQuery.toLowerCase())
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
                                placeholder="ابحث عن برنامجك المفضل..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white border border-slate-100 shadow-sm focus:border-[#7C2D36] focus:ring-4 focus:ring-[#7C2D36]/5 outline-none transition-all text-right"
                            />
                            <svg className="w-6 h-6 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-[#7C2D36] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                                            ? "bg-[#7C2D36] text-white shadow-[0_15px_30px_-10px_rgba(124,45,54,0.4)] scale-105"
                                            : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-100 shadow-sm"
                                        }
                                    `}
                                >
                                    <span className={`text-xl group-hover:scale-125 transition-transform duration-500 ${activeCategory === category.id ? "scale-110" : "opacity-70 grayscale"}`}>
                                        {category.icon}
                                    </span>
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Programs Grid */}
                {activePrograms.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 px-4">
                        {activePrograms.map((program) => (
                            <ProgramCard key={program.id} program={program} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 px-4">
                        <div className="text-6xl mb-6">🔍</div>
                        <h3 className="text-2xl font-black text-slate-900 mb-2">عذراً، لم نجد نتائج</h3>
                        <p className="text-slate-500">جرب استخدام كلمات بحث أخرى أو اختر تخصصاً مختلفاً</p>
                    </div>
                )}

                {/* Visual Accent */}
                <div className="mt-24 text-center">
                    <div className="inline-flex items-center gap-4 p-2 pl-6 bg-slate-50 rounded-full border border-slate-100">
                        <span className="bg-[#7C2D36] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">جديد</span>
                        <p className="text-slate-500 text-sm font-medium">تم إضافة برامج جديدة للمسار التربوي - دفعة إبريل 2026</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ProgramCard({ program }: { program: Program }) {
    return (
        <div className="premium-card group overflow-hidden h-full flex flex-col">
            {/* Header Image Area */}
            <div className="h-56 overflow-hidden relative">
                <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[0.2] group-hover:grayscale-0"
                />
                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-80" />

                {/* Badges */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                    {program.isNew && (
                        <span className="bg-[#D4A853] text-[#3D1118] text-[10px] font-black px-3 py-1 rounded-lg shadow-xl uppercase tracking-widest">جديد</span>
                    )}
                    <span className="bg-white/90 backdrop-blur-md text-[#7C2D36] text-[10px] font-black px-3 py-1 rounded-lg shadow-xl uppercase tracking-widest">معتمد</span>
                </div>

                {/* Price Tag */}
                <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 p-2 px-4 rounded-xl text-white font-bold text-sm">
                    {program.price}
                </div>
            </div>

            {/* Content Area */}
            <div className="p-8 flex-grow flex flex-col">
                <div className="flex items-center gap-2 text-[#D4A853] text-xs font-black mb-4 tracking-wider uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {program.duration} • أونلاين
                </div>

                <h3 className="text-xl font-black text-slate-900 mb-4 group-hover:text-[#7C2D36] transition-colors leading-tight min-h-[3rem]">
                    {program.title}
                </h3>

                <p className="text-slate-500 text-sm mb-8 leading-relaxed line-clamp-2">
                    {program.description || "برنامج تدريبي مكثف يهدف إلى تأهيل الكوادر وتطوير المهارات التخصصية وفق أحدث المعايير العلمية والعملية."}
                </p>

                {/* Features */}
                <div className="mt-auto pt-6 border-t border-slate-50">
                    <div className="flex flex-wrap gap-2 mb-8">
                        {program.features.slice(0, 2).map((feature, i) => (
                            <span key={i} className="text-[10px] font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-md">
                                {feature}
                            </span>
                        ))}
                    </div>

                    <Link
                        href={`/programs/${program.id}`}
                        className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-slate-900 text-white font-black text-sm hover:bg-[#7C2D36] transition-all duration-300 shadow-lg hover:shadow-[#7C2D36]/30 group/btn"
                    >
                        <span>عرض التفاصيل</span>
                        <svg className="w-4 h-4 transform rotate-180 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}
