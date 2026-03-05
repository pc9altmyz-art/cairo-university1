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
        <section className="py-32 bg-[#1E293B] relative overflow-hidden font-cairo">
            {/* Background Orbs */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#D4A853]/10 rounded-full blur-[150px] -translate-translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#D4A853] text-sm font-bold uppercase tracking-[0.2em] mb-4">الأسئلة الشائعة</span>
                        <h2 className="text-4xl md:text-5xl font-black mb-6 text-white leading-tight">
                            كل ما تريد <span className="text-gradient-gold">معرفته</span>
                        </h2>
                    </div>

                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 hover:bg-white/10 ${openIndex === index ? "ring-1 ring-[#D4A853]/50 shadow-[0_0_30px_rgba(212,168,83,0.15)] -translate-y-1" : ""
                                    }`}
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full px-8 py-6 text-right flex items-center justify-between group"
                                >
                                    <span className={`text-xl font-bold transition-colors ${openIndex === index ? "text-[#D4A853]" : "text-white group-hover:text-[#D4A853]"}`}>
                                        {faq.question}
                                    </span>
                                    <span className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 ${openIndex === index ? "bg-[#D4A853] text-[#3D1118] rotate-180" : "bg-white/5 text-slate-400 group-hover:bg-[#D4A853]/20 group-hover:text-[#D4A853]"}`}>
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </span>
                                </button>
                                <div
                                    className={`transition-all duration-700 ease-in-out px-8 overflow-hidden ${openIndex === index ? "max-h-96 pb-8 opacity-100" : "max-h-0 opacity-0"
                                        }`}
                                >
                                    <p className="text-slate-400 leading-relaxed text-lg border-t border-white/10 pt-6">
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
