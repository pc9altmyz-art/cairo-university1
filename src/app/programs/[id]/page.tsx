"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { programs } from "@/data/programs";
import { notFound } from "next/navigation";

export default function ProgramPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const program = programs.find((p) => p.id === id);

    if (!program) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-24">
            <div className="container mx-auto px-4">
                {/* Back Button */}
                <Link
                    href="/programs"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-[#7C2D36] transition-colors mb-6 group"
                    dir="rtl"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="font-bold">العودة للبرامج</span>
                </Link>

                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8" dir="rtl">
                    <Link href="/" className="hover:text-[#7C2D36] transition-colors">الرئيسية</Link>
                    <span>/</span>
                    <Link href="/programs" className="hover:text-[#7C2D36] transition-colors">البرامج</Link>
                    <span>/</span>
                    <span className="text-slate-900 font-medium">{program.title}</span>
                </nav>

                <div className="grid lg:grid-cols-3 gap-12" dir="rtl">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Hero Section */}
                        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100">
                            <div className="relative h-[300px] md:h-[450px]">
                                <Image
                                    src={program.image}
                                    alt={program.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                <div className="absolute bottom-8 right-8 text-white">
                                    <span className="bg-[#D4A853] text-[#3D1118] px-4 py-1 rounded-full text-sm font-bold mb-4 inline-block">
                                        برنامج معتمد
                                    </span>
                                    <h1 className="text-3xl md:text-5xl font-black">{program.title}</h1>
                                </div>
                            </div>

                            <div className="p-8 md:p-12">
                                <div className="prose prose-slate max-w-none prose-headings:text-[#7C2D36] prose-headings:font-black">
                                    <div className="whitespace-pre-wrap text-lg leading-relaxed text-slate-700">
                                        {program.details || program.description}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Info */}
                        <div className="bg-white rounded-3xl p-8 shadow-md border border-slate-100 sticky top-32">
                            <h3 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">معلومات البرنامج</h3>

                            <div className="space-y-6 mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-2xl">⏳</div>
                                    <div>
                                        <div className="text-sm text-slate-500">المدة</div>
                                        <div className="font-bold text-slate-900">{program.duration}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-2xl">💳</div>
                                    <div>
                                        <div className="text-sm text-slate-500">المصاريف</div>
                                        <div className="font-bold text-slate-900">{program.price}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-2xl">🗓️</div>
                                    <div>
                                        <div className="text-sm text-slate-500">تاريخ البدء</div>
                                        <div className="font-bold text-slate-900">{program.startDate}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-2xl">📍</div>
                                    <div>
                                        <div className="text-sm text-slate-500">طريقة الحضور</div>
                                        <div className="font-bold text-slate-900">أونلاين / حضوري</div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Link
                                    href={`https://wa.me/201093998000?text=${encodeURIComponent(`أنا مهتم ببرنامج: ${program.title}`)}`}
                                    target="_blank"
                                    className="block w-full bg-[#25D366] hover:bg-[#20BD5A] text-white text-center py-4 rounded-2xl font-black transition-all shadow-lg shadow-green-200"
                                >
                                    استفسار عبر واتساب
                                </Link>
                                <Link
                                    href="/#contact"
                                    className="block w-full bg-[#7C2D36] hover:bg-[#5C1F27] text-white text-center py-4 rounded-2xl font-black transition-all shadow-lg shadow-red-100"
                                >
                                    سجل الآن
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
