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
        <div className="min-h-screen bg-[#0F172A] pt-32 pb-24 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#D4A853]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1e40af]/10 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4 pointer-events-none" />
            <div className="absolute inset-0 bg-dot-pattern opacity-[0.03] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Back Button */}
                <Link
                    href="/programs"
                    className="inline-flex items-center gap-3 text-slate-400 hover:text-[#D4A853] transition-all mb-8 group bg-white/5 px-6 py-2.5 rounded-2xl border border-white/10 backdrop-blur-xl"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transform transition-transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="font-black text-sm uppercase tracking-widest">{td('back')}</span>
                </Link>

                {/* Breadcrumbs */}
                <nav className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-slate-500 mb-12 overflow-x-auto whitespace-nowrap pb-2">
                    <Link href="/" className="hover:text-[#D4A853] transition-colors">{td('breadcrumb_home')}</Link>
                    <span className="opacity-30">/</span>
                    <Link href="/programs" className="hover:text-[#D4A853] transition-colors">{td('breadcrumb_programs')}</Link>
                    <span className="opacity-30">/</span>
                    <span className="text-[#D4A853] drop-shadow-[0_0_8px_rgba(212,168,83,0.3)]">{t(`${program.id}.title`)}</span>
                </nav>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Hero Section */}
                        <div className="premium-glass rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 relative group">
                            <div className="relative h-[350px] md:h-[550px]">
                                <Image
                                    src={program.image}
                                    alt={t(`${program.id}.title`)}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                    unoptimized
                                />
                                
                                {/* Premium Overlays */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/40 to-transparent opacity-90" />
                                <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />

                                <div className="absolute bottom-10 inset-x-10 text-white rtl:text-right ltr:text-left">
                                    <div className="flex flex-wrap items-center gap-4 mb-8">
                                        <span className="bg-gradient-to-r from-[#D4A853] to-[#e3c17a] text-[#172554] px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-2xl border border-white/20">
                                            {td('certified_badge')}
                                        </span>
                                        {program.status && (
                                            <div className={`
                                                relative overflow-hidden px-6 py-2.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10
                                                ${program.status === 'started' ? 'bg-gradient-to-r from-emerald-500 to-teal-600' :
                                                    program.status === 'closed' ? 'bg-gradient-to-r from-rose-600 to-[#1e3a8a]' :
                                                        'bg-gradient-to-r from-amber-400 to-[#D4A853]'}
                                            `}>
                                                <span className="relative flex h-2 w-2">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                                                </span>
                                                <span className="text-white text-xs font-black uppercase tracking-widest">
                                                    {ts(`status_${program.status}`)}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <h1 className="text-4xl md:text-7xl font-black leading-tight drop-shadow-2xl">{t(`${program.id}.title`)}</h1>
                                </div>
                            </div>

                            <div className="p-10 md:p-16 bg-[#0F172A]/40 backdrop-blur-3xl">
                                <div className="max-w-none">
                                    <div className="whitespace-pre-wrap text-lg md:text-xl leading-relaxed text-slate-300 font-medium">
                                        {t(`${program.id}.details`) || t(`${program.id}.description`)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Quick Info */}
                        <div className="premium-glass rounded-[3rem] p-10 shadow-2xl border border-white/10 sticky top-32">
                            <h3 className="text-2xl font-black text-white mb-10 border-b border-white/10 pb-6 tracking-wide uppercase">
                                {td('sidebar_title')}
                            </h3>

                            <div className="space-y-8 mb-12">
                                <div className="flex items-center gap-6 group">
                                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-3xl transition-transform group-hover:scale-110 group-hover:bg-[#1e3a8a]/20">⏳</div>
                                    <div>
                                        <div className="text-[10px] uppercase font-black tracking-widest text-[#D4A853] mb-1">{td('label_duration')}</div>
                                        <div className="font-black text-white text-lg tracking-tight">{t(`${program.id}.duration`)}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 group">
                                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-3xl transition-transform group-hover:scale-110 group-hover:bg-[#1e3a8a]/20">💳</div>
                                    <div>
                                        <div className="text-[10px] uppercase font-black tracking-widest text-[#D4A853] mb-1">{td('label_price')}</div>
                                        <div className="font-black text-white text-lg tracking-tight">{t(`${program.id}.price`)}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 group">
                                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-3xl transition-transform group-hover:scale-110 group-hover:bg-[#1e3a8a]/20">🗓️</div>
                                    <div>
                                        <div className="text-[10px] uppercase font-black tracking-widest text-[#D4A853] mb-1">{td('label_start')}</div>
                                        <div className="font-black text-white text-lg tracking-tight">{t(`${program.id}.startDate`)}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 group">
                                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-3xl transition-transform group-hover:scale-110 group-hover:bg-[#1e3a8a]/20">📍</div>
                                    <div>
                                        <div className="text-[10px] uppercase font-black tracking-widest text-[#D4A853] mb-1">{td('label_mode')}</div>
                                        <div className="font-black text-white text-lg tracking-tight">{td('mode_value')}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <Link
                                    href={`https://wa.me/201093998000?text=${encodeURIComponent(`${td('wa_interest')}${t(`${program.id}.title`)}`)}`}
                                    target="_blank"
                                    className="flex items-center justify-center gap-4 w-full bg-[#25D366] hover:bg-[#20BD5A] text-white py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-green-900/20 hover:-translate-y-1"
                                >
                                    <span>{td('btn_whatsapp')}</span>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                                </Link>
                                <Link
                                    href="/#contact"
                                    className="block w-full bg-white text-[#1e3a8a] text-center py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest transition-all shadow-xl hover:bg-[#D4A853] hover:text-[#172554] hover:-translate-y-1"
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
