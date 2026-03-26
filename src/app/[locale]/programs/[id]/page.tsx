"use client";

import { use } from "react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { programs } from "@/data/programs";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";

export default function ProgramPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const t = useTranslations('ProgramsData');
    const td = useTranslations('ProgramDetail');
    const ts = useTranslations('Programs');
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
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-[#1e3a8a] transition-colors mb-6 group"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform transition-transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="font-bold">{td('back')}</span>
                </Link>

                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
                    <Link href="/" className="hover:text-[#1e3a8a] transition-colors">{td('breadcrumb_home')}</Link>
                    <span className="text-slate-300">/</span>
                    <Link href="/programs" className="hover:text-[#1e3a8a] transition-colors">{td('breadcrumb_programs')}</Link>
                    <span>/</span>
                    <span className="text-slate-900 font-medium">{t(`${program.id}.title`)}</span>
                </nav>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Hero Section */}
                        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100">
                            <div className="relative h-[300px] md:h-[450px]">
                                <Image
                                    src={program.image}
                                    alt={t(`${program.id}.title`)}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                <div className="absolute bottom-8 end-8 text-white text-right">
                                    <div className="flex flex-wrap justify-end gap-3 mb-4">
                                        <span className="bg-[#D4A853] text-[#172554] px-4 py-1 rounded-full text-sm font-bold inline-block shadow-lg">
                                            {td('certified_badge')}
                                        </span>
                                        {program.status && (
                                            <div className={`
                                                relative overflow-hidden px-4 py-1 rounded-full shadow-2xl flex items-center gap-2 border border-white/20
                                                ${program.status === 'started' ? 'bg-gradient-to-r from-emerald-500 to-teal-600' :
                                                    program.status === 'closed' ? 'bg-gradient-to-r from-rose-600 to-[#1e3a8a]' :
                                                        'bg-gradient-to-r from-amber-400 to-[#D4A853]'}
                                            `}>
                                                <span className="relative flex h-2 w-2">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                                                </span>
                                                <span className="text-white text-sm font-black uppercase tracking-wider">
                                                    {ts(`status_${program.status}`)}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <h1 className="text-3xl md:text-5xl font-black">{t(`${program.id}.title`)}</h1>
                                </div>
                            </div>

                            <div className="p-8 md:p-12">
                                <div className="prose prose-slate max-w-none prose-headings:text-[#1e3a8a] prose-headings:font-black">
                                    <div className="whitespace-pre-wrap text-lg leading-relaxed text-slate-700">
                                        {t(`${program.id}.details`) || t(`${program.id}.description`)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Info */}
                        <div className="bg-white rounded-3xl p-8 shadow-md border border-slate-100 sticky top-32">
                            <h3 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">
                                {td('sidebar_title')}
                            </h3>

                            <div className="space-y-6 mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-2xl">⏳</div>
                                    <div>
                                        <div className="text-sm text-slate-500">{td('label_duration')}</div>
                                        <div className="font-bold text-slate-900">{t(`${program.id}.duration`)}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-2xl">💳</div>
                                    <div>
                                        <div className="text-sm text-slate-500">{td('label_price')}</div>
                                        <div className="font-bold text-slate-900">{t(`${program.id}.price`)}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-2xl">🗓️</div>
                                    <div>
                                        <div className="text-sm text-slate-500">{td('label_start')}</div>
                                        <div className="font-bold text-slate-900">{t(`${program.id}.startDate`)}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-2xl">📍</div>
                                    <div>
                                        <div className="text-sm text-slate-500">{td('label_mode')}</div>
                                        <div className="font-bold text-slate-900">{td('mode_value')}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Link
                                    href={`https://wa.me/201093998000?text=${encodeURIComponent(`${td('wa_interest')}${t(`${program.id}.title`)}`)}`}
                                    target="_blank"
                                    className="block w-full bg-[#25D366] hover:bg-[#20BD5A] text-white text-center py-4 rounded-2xl font-black transition-all shadow-lg shadow-green-200"
                                >
                                    {td('btn_whatsapp')}
                                </Link>
                                <Link
                                    href="/#contact"
                                    className="block w-full bg-[#1e3a8a] hover:bg-[#1e40af] text-white text-center py-4 rounded-2xl font-black transition-all shadow-lg shadow-blue-100"
                                >
                                    {td('btn_register')}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
