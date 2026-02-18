"use client";

import { useState } from "react";

const faqs = [
    {
        question: "هل الشهادات معتمدة؟",
        answer: "نعم، جميع الشهادات الصادرة ممهورة بختم جامعة القاهرة ومعتمدة من المجلس الأعلى للجامعات، كما يمكن توثيقها من الخارجية المصرية."
    },
    {
        question: "ما هي شروط الالتحاق بالبرامج؟",
        answer: "تختلف الشروط حسب كل برنامج، ولكن بشكل عام تتطلب البرامج المهنية الحصول على مؤهل عالٍ أو متوسط حسب طبيعة الدورة."
    },
    {
        question: "هل يوجد نظام تقسيط للمصروفات؟",
        answer: "نعم، توفر جامعة القاهرة أنظمة تقسيط ميسرة للطلاب للمساعدة في سداد المصروفات الدراسية على دفعات."
    },
    {
        question: "أين تقام المحاضرات؟",
        answer: "تقام المحاضرات في قاعات مجهزة داخل حرم جامعة القاهرة، كما تتوفر خيارات للتعلم عن بعد (أونلاين) للعديد من البرامج."
    }
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-32 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-gold font-black text-xs tracking-[0.3em] uppercase mb-4 block">الأسئلة الشائعة</span>
                        <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 leading-tight">
                            كل ما تريد <span className="text-accent">معرفته</span>
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className={`premium-card overflow-hidden transition-all duration-500 ${openIndex === index ? "ring-2 ring-accent/10 shadow-brand-glow" : "hover:border-accent/20"
                                    }`}
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full px-8 py-6 text-right flex items-center justify-between group"
                                >
                                    <span className={`text-xl font-bold transition-colors ${openIndex === index ? "text-accent" : "text-slate-700 group-hover:text-accent"}`}>
                                        {faq.question}
                                    </span>
                                    <span className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${openIndex === index ? "bg-accent text-white rotate-180" : "bg-slate-100 text-slate-400 group-hover:bg-accent/10 group-hover:text-accent"}`}>
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </span>
                                </button>
                                <div
                                    className={`transition-all duration-700 ease-in-out px-8 overflow-hidden ${openIndex === index ? "max-h-96 pb-8 opacity-100" : "max-h-0 opacity-0"
                                        }`}
                                >
                                    <p className="text-slate-500 leading-relaxed text-lg border-t border-slate-50 pt-6">
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
