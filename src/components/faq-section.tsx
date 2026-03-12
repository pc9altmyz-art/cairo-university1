"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function FAQSection() {
    const t = useTranslations('FAQ');
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: t('q1'),
            answer: t('a1')
        },
        {
            question: t('q2'),
            answer: t('a2')
        },
        {
            question: t('q3'),
            answer: t('a3')
        },
        {
            question: t('q4'),
            answer: t('a4')
        }
    ];

    return (
        <section id="faq" className="py-32 bg-white dark:bg-[#1E293B] relative overflow-hidden font-cairo scroll-mt-28 transition-colors duration-500">
            {/* Background Orbs */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#7C2D36]/5 dark:bg-[#D4A853]/10 rounded-full blur-[150px] -translate-translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[#7C2D36] dark:text-[#D4A853] text-sm font-bold uppercase tracking-[0.2em] mb-4">{t('badge')}</span>
                        <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white leading-tight">
                            {t('title1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C2D36] via-[#B8860B] to-[#4A171D] dark:from-[#D4A853] dark:via-[#ECD2A2] dark:to-[#B8860B]">{t('title_hl')}</span>
                        </h2>
                    </div>

                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className={`bg-slate-50 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl overflow-hidden transition-all duration-500 hover:bg-white/10 ${openIndex === index ? "ring-1 ring-[#7C2D36]/50 dark:ring-[#D4A853]/50 shadow-premium dark:shadow-[0_0_30px_rgba(212,168,83,0.15)] -translate-y-1" : ""
                                    }`}
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full px-8 py-6 rtl:text-right ltr:text-left flex items-center justify-between group"
                                >
                                    <span className={`text-xl font-bold transition-colors ${openIndex === index ? "text-[#7C2D36] dark:text-[#D4A853]" : "text-slate-700 dark:text-white group-hover:text-[#7C2D36] dark:group-hover:text-[#D4A853]"}`}>
                                        {faq.question}
                                    </span>
                                    <span className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 ${openIndex === index ? "bg-[#7C2D36] dark:bg-[#D4A853] text-white dark:text-[#3D1118] rotate-180" : "bg-slate-100 dark:bg-white/5 text-slate-400 group-hover:bg-[#7C2D36]/20 dark:group-hover:bg-[#D4A853]/20 group-hover:text-[#7C2D36] dark:group-hover:text-[#D4A853]"}`}>
                                        <svg className="w-5 h-5 rtl:scale-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </span>
                                </button>
                                <div
                                    className={`transition-all duration-700 ease-in-out px-8 overflow-hidden ${openIndex === index ? "max-h-96 pb-8 opacity-100" : "max-h-0 opacity-0"
                                        }`}
                                >
                                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-lg border-t border-slate-200 dark:border-white/10 pt-6">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
