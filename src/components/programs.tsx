"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { categories, getProgramsByCategory, type Program } from "@/data/programs";

export default function Programs() {
    const [activeCategory, setActiveCategory] = useState(categories[0].id);
    const activePrograms = getProgramsByCategory(activeCategory);

    return (
        <section id="programs" className="py-32 bg-[#FDFCFB]">
            <div className="container mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 px-4">
                    <div className="max-w-2xl text-right md:order-2">
                        <span className="text-[#D4A853] font-bold text-sm tracking-[0.2em] uppercase mb-4 block">برامج متميزة</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight">
                            اختر مسارك <span className="text-[#7C2D36]">المهني</span>
                        </h2>
                        <p className="text-slate-500 text-lg leading-relaxed">
                            نقدم لك مجموعة متنوعة من البرامج التدريبية المصممة بعناية لتناسب احتياجات سوق العمل وتطور مهاراتك بشكل احترافي.
                        </p>
                    </div>
                    {/* Controls/Stats */}
                    <div className="flex gap-12 md:order-1 border-l-2 border-slate-100 pl-8">
                        <div>
                            <div className="text-3xl font-black text-[#7C2D36]">{categories.length}</div>
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">تخصص</div>
                        </div>
                        <div>
                            <div className="text-3xl font-black text-[#7C2D36]">{activePrograms.length}</div>
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">برنامج</div>
                        </div>
                    </div>
                </div>

                {/* Categories */}
                <div className="mb-16 px-4">
                    <div className="flex flex-wrap justify-end gap-3">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
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

                {/* Programs Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 px-4">
                    {activePrograms.map((program) => (
                        <ProgramCard key={program.id} program={program} />
                    ))}
                </div>

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
