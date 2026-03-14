"use client";

import { TiltCard } from "@/components/ui/tilt-card";
import { useTranslations } from "next-intl";

export default function Certificates() {
    const t = useTranslations('Certificates');
    return (
        <section id="certificates" className="py-24 sm:py-32 bg-white dark:bg-[#0F172A] overflow-hidden scroll-mt-28 relative">
            {/* Bottom fade → transition to Testimonials dark section */}
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-b from-transparent via-transparent to-[#1A0B0E]/10 pointer-events-none z-10" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#D4A853]/20 to-transparent z-10" />
            <div className="container mx-auto px-4">
                <div className="relative bg-gradient-to-br from-[#7C2D36] via-[#5C1F27] to-[#3D1118] rounded-[2.5rem] sm:rounded-[4rem] p-8 sm:p-12 md:p-20 shadow-[0_40px_100px_-20px_rgba(124,45,54,0.3)] border border-white/10">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none overflow-hidden rounded-[inherit]">
                        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[120%] bg-white blur-[120px] rotate-45"></div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
                        {/* Content */}
                        <div className="text-white">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8 backdrop-blur-md">
                                <span className="w-2 h-2 rounded-full bg-[#D4A853] animate-pulse"></span>
                                <span className="text-xs font-bold uppercase tracking-widest text-[#D4A853]">{t('badge')}</span>
                            </div>

                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-8 leading-[1.1]">
                                {t('title1')} <br />
                                <span className="text-[#D4A853]">{t('title_hl')}</span> {t('title2')}
                            </h2>

                            <p className="text-white/80 text-lg sm:text-xl mb-12 leading-relaxed max-w-xl">
                                {t('subtitle')}
                            </p>

                            <div className="grid sm:grid-cols-2 gap-6 mb-12 rtl:text-right ltr:text-left">
                                {[
                                    t('feat1'),
                                    t('feat2'),
                                    t('feat3'),
                                    t('feat4')
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 group">
                                        <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-[#D4A853] group-hover:border-[#D4A853] transition-all duration-300">
                                            <svg className="w-6 h-6 text-[#D4A853] group-hover:text-[#7C2D36] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="font-bold text-lg">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <button className="bg-[#D4A853] text-[#3D1118] px-10 py-5 rounded-2xl font-black text-xl hover:bg-white transition-all shadow-xl flex items-center gap-4 group">
                                <span>{t('btn_details')}</span>
                                <svg className="w-6 h-6 rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1 transition-transform rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>

                        {/* Visual Mockup */}
                        <div className="relative group perspective-1000">
                            <TiltCard intensity={15} className="relative bg-white/5 backdrop-blur-xl border border-white/20 p-4 rounded-3xl hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
                                <div className="aspect-[4/3] bg-white rounded-2xl p-8 relative overflow-hidden flex flex-col items-center justify-center text-slate-900 border-[12px] border-slate-100 pointer-events-none">
                                    {/* Certificate Background Pattern */}
                                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                                        <div className="w-full h-full" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
                                    </div>

                                    <div className="w-24 h-24 mb-6 opacity-80">🎓</div>
                                    <div className="text-center">
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{t('mockup_univ')}</div>
                                        <div className="text-xl font-black text-slate-900 mb-4 border-b-2 border-slate-100 pb-4 inline-block">{t('mockup_title')}</div>
                                        <div className="text-sm text-slate-500 mb-8">{t('mockup_desc')}</div>
                                        <div className="flex justify-around items-center w-full mt-8">
                                            <div className="text-[10px] text-slate-400 font-bold border-t border-slate-100 pt-2">{t('mockup_seal')}</div>
                                            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center opacity-30">
                                                <div className="w-12 h-12 rounded-full border-4 border-slate-200"></div>
                                            </div>
                                            <div className="text-[10px] text-slate-400 font-bold border-t border-slate-100 pt-2">{t('mockup_signature')}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Badge */}
                                <div className="absolute -top-6 -right-6 bg-gradient-to-br from-[#D4A853] to-[#B8860B] text-[#7C2D36] w-24 h-24 rounded-full flex flex-col items-center justify-center font-black text-sm shadow-2xl border-4 border-[#7C2D36] rotate-12 animate-float pointer-events-none">
                                    {t('mockup_badge')}
                                </div>
                            </TiltCard>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
