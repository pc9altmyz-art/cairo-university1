"use client";

import Link from "next/link";
import Image from "next/image";
import { categories, getFeaturedPrograms } from "@/data/programs";

export default function HomeProgramsPreview() {
    const featuredPrograms = getFeaturedPrograms().slice(0, 3);

    return (
        <section id="programs" className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#7C2D36]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4A853]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <span className="text-[#7C2D36] font-bold text-sm tracking-widest uppercase mb-3 block">نظام تعليمي متكامل</span>
                    <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900">
                        مسارات <span className="text-[#D4A853]">التدريب</span> المتاحة
                    </h2>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
                        نقدم مجموعة متكاملة من البرامج التدريبية المعتمدة في ثلاثة مسارات رئيسية لتلبية احتياجات سوق العمل وتطوير المهارات المهنية.
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {categories.map((category) => (
                        <div key={category.id} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group relative">
                            <div className="w-16 h-16 bg-[#7C2D36]/5 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:bg-[#7C2D36] group-hover:text-white transition-all duration-300">
                                {category.icon}
                            </div>

                            <h3 className="text-2xl font-bold text-slate-900 mb-4">
                                {category.name}
                            </h3>

                            <p className="text-slate-500 mb-8 leading-relaxed">
                                {category.description}
                            </p>

                            <Link
                                href="/programs"
                                className="inline-flex items-center text-[#7C2D36] font-bold gap-2 hover:gap-3 transition-all"
                            >
                                <span>استعراض كل البرامج</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform rotate-180" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </Link>

                            {/* Accent line */}
                            <div className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-[#7C2D36]/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                        </div>
                    ))}
                </div>

                {/* Featured Programs Preview "نبذة" */}
                <div className="mt-16">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                        <div className="text-right md:text-right w-full">
                            <h3 className="text-3xl font-black text-slate-900 mb-2">أبرز <span className="text-[#7C2D36]">البرامج التدريبية</span></h3>
                            <p className="text-slate-500">نظرة سريعة على أهم البرامج المتاحة للتسجيل حالياً</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {featuredPrograms.map((program) => (
                            <Link
                                key={program.id}
                                href={`/programs/${program.id}`}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 group hover:shadow-lg transition-all"
                            >
                                <div className="h-40 overflow-hidden relative">
                                    <Image
                                        src={program.image}
                                        alt={program.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    {/* Branding Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#7C2D36]/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                                    <div className="absolute bottom-3 right-3 text-white">
                                        <span className="text-[10px] font-bold bg-[#D4A853] text-[#3D1118] px-2 py-1 rounded-lg">برنامج معتمد</span>
                                    </div>

                                    {/* Icon Watermark */}
                                    <div className="absolute top-3 left-3 text-white/20 text-xl font-black">🏛️</div>
                                </div>
                                <div className="p-5 flex flex-col flex-1">
                                    <h4 className="font-bold text-slate-900 mb-4 group-hover:text-[#7C2D36] transition-colors line-clamp-1">{program.title}</h4>
                                    <div className="mt-auto flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-slate-400 block">تكلفة البرنامج</span>
                                            <span className="font-bold text-[#7C2D36] text-sm">{program.price}</span>
                                        </div>
                                        <div className="bg-[#7C2D36]/5 text-[#7C2D36] px-3 py-1.5 rounded-lg text-[10px] font-bold group-hover:bg-[#7C2D36] group-hover:text-white transition-all flex items-center gap-1">
                                            <span>التفاصيل</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 transform rotate-180" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Link
                            href="/programs"
                            className="bg-white border-2 border-[#7C2D36] text-[#7C2D36] px-10 py-4 rounded-2xl font-black hover:bg-[#7C2D36] hover:text-white transition-all inline-block shadow-sm"
                        >
                            تصفح جميع البرامج (50+ برنامج)
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
