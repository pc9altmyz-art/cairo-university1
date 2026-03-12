"use client";

import { TiltCard } from "@/components/ui/tilt-card";
import { useTranslations } from "next-intl";

export default function Certificates() {
    const t = useTranslations('Certificates');
    return (
        <section id="certificates" className="py-24 sm:py-32 bg-[#0d0405] overflow-hidden scroll-mt-28 relative">
            {/* Background Atmosphere */}
            <div className="absolute top-0 right-0 w-full h-[50vh] bg-gradient-to-b from-[#1A0B0E] to-transparent opacity-40" />
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#D4A853 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

            <div className="container mx-auto px-4 relative z-10">
                <div className="relative bg-[#0A0204]/60 backdrop-blur-3xl rounded-[3rem] sm:rounded-[5rem] p-8 sm:p-12 md:p-24 shadow-[0_50px_120px_rgba(0,0,0,0.8)] border border-white/5 overflow-hidden group">
                    {/* Prestigious Mesh Detail */}
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none overflow-hidden rounded-[inherit]">
                        <div className="absolute -top-1/2 -right-1/4 w-full h-full bg-gradient-to-br from-[#D4A853] to-transparent blur-[150px] rotate-45" />
                    </div>

                    <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
                        {/* Content */}
                        <div className="text-white">
                            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 mb-10 backdrop-blur-xl">
                                <div className="relative flex items-center justify-center">
                                    <span className="absolute w-3 h-3 rounded-full bg-[#D4A853]/50 animate-ping"></span>
                                    <span className="relative w-2 h-2 rounded-full bg-[#D4A853]"></span>
                                </div>
                                <span className="text-xs font-black uppercase tracking-[0.4em] text-[#D4A853]">{t('badge')}</span>
                            </div>

                            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black mb-10 leading-[1.05] tracking-tight">
                                {t('title1')} <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A853] via-[#ECD2A2] to-[#B8860B]">{t('title_hl')}</span> {t('title2')}
                            </h2>

                            <p className="text-white/50 text-xl mb-14 leading-relaxed max-w-xl font-medium">
                                {t('subtitle')}
                            </p>

                            <div className="grid sm:grid-cols-2 gap-10 mb-16 rtl:text-right ltr:text-left">
                                {[
                                    t('feat1'),
                                    t('feat2'),
                                    t('feat3'),
                                    t('feat4')
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-5 group/item">
                                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover/item:bg-[#D4A853] group-hover/item:border-[#D4A853] transition-all duration-500 shadow-2xl">
                                            <svg className="w-7 h-7 text-[#D4A853] group-hover/item:text-[#3D1118] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="font-black text-lg text-white/80 group-hover/item:text-white transition-colors">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <button className="relative group/btn bg-gradient-to-br from-[#D4A853] to-[#B8860B] text-[#3D1118] px-12 py-6 rounded-[2rem] font-black text-xl hover:shadow-[0_20px_50px_rgba(212,168,83,0.3)] transition-all duration-500 flex items-center gap-5">
                                <span className="relative z-10">{t('btn_details')}</span>
                                <svg className="w-6 h-6 relative z-10 rtl:group-hover/btn:-translate-x-2 ltr:group-hover/btn:translate-x-2 transition-transform rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7-7 7" />
                                </svg>
                                <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity rounded-[inherit]" />
                            </button>
                        </div>

                        {/* High-Fidelity Visual Mockup */}
                        <div className="relative group perspective-3000">
                            <TiltCard intensity={10} className="relative bg-[#0A0204]/40 backdrop-blur-2xl border border-white/10 p-6 rounded-[3rem] shadow-[0_60px_100px_rgba(0,0,0,0.6)] group-hover:border-[#D4A853]/20 transition-all duration-1000">
                                <div className="aspect-[4/3] bg-white rounded-[1.5rem] p-12 relative overflow-hidden flex flex-col items-center justify-center text-slate-900 border-[16px] border-[#F8F4EE] shadow-inner pointer-events-none">
                                    
                                    {/* Intricate Guilloche Back Pattern (Digital Simulation) */}
                                    <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(ellipse at center, transparent 0%, #000 70%), url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M54.627 0l.83.83L20.457 35.83l-.83-.83L54.627 0zm-2.77 0l.83.83L17.687 35.83l-.83-.83L51.857 0zm3.908 0l.83.83L24.365 31.92l-.83-.83L55.765 0zm2.77 0l.83.83L27.135 31.92l-.83-.83L58.535 0zm1.83 23.635l-.83-.83L60 21.975l.83.83-1.83.83zm-2.77 0l-.83-.83L56.122 21.975l.83.83-1.83.83zm-3.908 0l-.83-.83L42.14 26.405l.83.83 12.835-4.435zm-2.77 0l-.83-.83L39.37 26.405l.83.83 12.835-4.435zm-1.83-4.435l.83.83-1.83.83-.83-.83 1.83-.83zm2.77 0l.83.83-1.83.83-.83-.83 1.83-.83zm3.908 0l.83.83-1.83.83-.83-.83 1.83-.83zm2.77 0l.83.83-1.83.83-.83-.83 1.83-.83z\' fill=\'%23000\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")' }}></div>

                                    {/* University Header */}
                                    <div className="text-center w-full border-b border-slate-200 pb-8 mb-8 relative">
                                        <div className="w-20 h-20 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center text-4xl shadow-inner border border-slate-200">
                                            🏛️
                                        </div>
                                        <div className="text-xs font-black text-[#7C2D36] uppercase tracking-[0.4em] mb-2">{t('mockup_univ')}</div>
                                        <div className="text-2xl font-serif italic text-slate-800 tracking-tight">{t('mockup_title')}</div>
                                    </div>

                                    {/* Body */}
                                    <div className="text-center space-y-4 mb-10">
                                        <p className="text-slate-500 font-medium italic text-lg">{t('mockup_desc')}</p>
                                        <div className="w-48 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent mx-auto" />
                                    </div>

                                    {/* Signatures & Seal Area */}
                                    <div className="flex justify-between items-end w-full px-4">
                                        <div className="text-center">
                                            <div className="font-serif italic text-slate-400 mb-2">{t('mockup_seal')}</div>
                                            <div className="w-20 h-0.5 bg-slate-200" />
                                        </div>
                                        
                                        {/* Golden Foil Seal Simulation */}
                                        <div className="relative w-28 h-28 flex items-center justify-center group/seal">
                                            <div className="absolute inset-0 bg-gradient-to-br from-[#D4A853] via-[#FFE5B4] to-[#B8860B] rounded-full shadow-[0_10px_25px_rgba(212,168,83,0.5)] border-4 border-[#B8860B]/20 animate-[spin_10s_linear_infinite]" />
                                            <div className="absolute inset-2 border-2 border-white/30 rounded-full" />
                                            <div className="relative text-3xl opacity-80 filter grayscale brightness-50 contrast-150 transform -rotate-12">
                                                ★
                                            </div>
                                        </div>

                                        <div className="text-center">
                                            <div className="font-serif italic text-slate-400 mb-2">{t('mockup_signature')}</div>
                                            <div className="w-20 h-0.5 bg-slate-200" />
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Premium Badge Overlay */}
                                <div className="absolute -top-10 -right-10 bg-gradient-to-br from-[#1A0B0E] to-[#0A0204] text-[#D4A853] w-32 h-32 rounded-full flex flex-col items-center justify-center font-black text-xs shadow-[0_20px_60px_rgba(0,0,0,0.8)] border-4 border-[#D4A853]/50 rotate-12 group-hover:rotate-0 transition-all duration-700 will-change-transform z-20">
                                    <div className="text-[10px] uppercase tracking-[0.2em] mb-1 opacity-60">Status</div>
                                    <div className="text-lg tracking-widest">{t('mockup_badge')}</div>
                                    <div className="mt-2 w-8 h-px bg-[#D4A853]/30" />
                                </div>
                            </TiltCard>

                            {/* Decorative ambient shadows */}
                            <div className="absolute -inset-10 bg-[#D4A853]/5 blur-[80px] rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
