"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

const testimonials = [
    {
        name: "أحمد محمود",
        role: "خريج برنامج الـ Montessori",
        content: "تجربة تعليمية استثنائية. المحتوى العلمي كان دقيقاً جداً والشهادة ساعدتني في الحصول على وظيفة في مدرسة دولية كبرى.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop",
    },
    {
        name: "سارة حسن",
        role: "خريجة برنامج إعداد المعلم",
        content: "الأساتذة رائعون والدعم الفني كان متاحاً في كل لحظة. أنصح بشدة بكل من يريد تطوير مهاراته التربوية بالانضمام لهذه البرامج.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop",
    },
    {
        name: "محمد علي",
        role: "خريج برنامج إعداد الإخصائيين",
        content: "المرونة في الوقت كانت أهم ميزة بالنسبة لي. قدرت أوفق بين شغلي ودراستي وحصلت على اعتماد رسمي موثق.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop",
    }
];

export default function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        gsap.fromTo(".testimonial-card",
            { opacity: 0, x: 20 },
            { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
        );
    }, [activeIndex]);

    return (
        <section id="testimonials" className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-[#D4A853] font-bold text-sm tracking-widest uppercase mb-3 block">آراء الطلاب</span>
                    <h2 className="text-4xl md:text-5xl font-black mb-4 text-slate-900 leading-tight">
                        قصص <span className="text-[#7C2D36]">نجاح</span> نفخر بها
                    </h2>
                </div>

                <div className="max-w-5xl mx-auto relative px-12">
                    {/* Main Card */}
                    <div className="testimonial-card relative bg-[#FDFCFB] rounded-[3rem] p-10 md:p-16 border border-slate-100 shadow-xl overflow-hidden min-h-[400px] flex flex-col items-center justify-center text-center">
                        {/* Quote mark decoration */}
                        <div className="absolute top-10 right-10 text-9xl text-[#7C2D36]/5 pointer-events-none select-none">"</div>

                        <div className="relative z-10">
                            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-8 border-4 border-[#D4A853]/20 shadow-lg">
                                <Image
                                    src={testimonials[activeIndex].image}
                                    alt={testimonials[activeIndex].name}
                                    width={100}
                                    height={100}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <p className="text-2xl md:text-3xl font-medium text-slate-700 leading-relaxed mb-10 italic">
                                "{testimonials[activeIndex].content}"
                            </p>

                            <div>
                                <h4 className="text-2xl font-black text-slate-900 mb-2">{testimonials[activeIndex].name}</h4>
                                <p className="text-[#7C2D36] font-bold">{testimonials[activeIndex].role}</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Dots */}
                    <div className="flex justify-center gap-3 mt-12">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveIndex(i)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${activeIndex === i ? "bg-[#7C2D36] w-8" : "bg-slate-200"}`}
                                aria-label={`Go to testimonial ${i + 1}`}
                            />
                        ))}
                    </div>

                    {/* Side Arrows (Desktop) */}
                    <button
                        onClick={() => setActiveIndex((activeIndex - 1 + testimonials.length) % testimonials.length)}
                        className="hidden md:flex absolute top-1/2 -right-4 -translate-y-1/2 w-14 h-14 bg-white border border-slate-100 rounded-2xl items-center justify-center text-[#7C2D36] shadow-lg hover:bg-[#7C2D36] hover:text-white transition-all z-20 group"
                    >
                        <svg className="w-6 h-6 rotate-180 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7-7 7" />
                        </svg>
                    </button>
                    <button
                        onClick={() => setActiveIndex((activeIndex + 1) % testimonials.length)}
                        className="hidden md:flex absolute top-1/2 -left-4 -translate-y-1/2 w-14 h-14 bg-white border border-slate-100 rounded-2xl items-center justify-center text-[#7C2D36] shadow-lg hover:bg-[#7C2D36] hover:text-white transition-all z-20 group"
                    >
                        <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}
