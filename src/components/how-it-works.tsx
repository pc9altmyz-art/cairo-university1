import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        number: "01",
        title: "اختر البرنامج",
        description: "تصفح البرامج التدريبية واختر المسار المناسب لأهدافك",
    },
    {
        number: "02",
        title: "سجل بياناتك",
        description: "املأ نموذج التسجيل واختر موعد الدفعة المناسبة",
    },
    {
        number: "03",
        title: "أكمل الدفع",
        description: "ادفع رسوم البرنامج بالطريقة المناسبة لك",
    },
    {
        number: "04",
        title: "ابدأ التعلم",
        description: "احصل على الوصول الفوري للمحتوى وابدأ رحلتك",
    },
];

export default function HowItWorks() {
    const containerRef = useRef<HTMLDivElement>(null);
    const stepsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Steps entrance animation
            gsap.fromTo(stepsRef.current?.children || [],
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: stepsRef.current,
                        start: "top 80%",
                    }
                }
            );

            // Desktop connector line animation
            if (window.innerWidth >= 1024) {
                gsap.fromTo(".connector-line",
                    { scaleX: 0 },
                    {
                        scaleX: 1,
                        duration: 1.5,
                        stagger: 0.3,
                        ease: "power2.inOut",
                        scrollTrigger: {
                            trigger: stepsRef.current,
                            start: "top 60%",
                        }
                    }
                );
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="how-it-works" ref={containerRef} className="py-32 bg-slate-50 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none">
                <svg width="100%" height="100%">
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-24">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-[#7C2D36]/5 text-[#7C2D36] text-sm font-bold uppercase tracking-[0.2em] mb-4">
                        رحلة التعلم
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black mb-6 text-slate-900 leading-tight">
                        كيف <span className="text-[#D4A853]">تبدأ </span>
                        رحلة تميزك؟
                    </h2>
                    <p className="text-slate-500 text-xl max-w-2xl mx-auto leading-relaxed">
                        أربع خطوات بسيطة ومباشرة تفصلك عن تطوير مسارك المهني والحصول على شهادتك المعتمدة.
                    </p>
                </div>

                {/* Steps */}
                <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="relative group perspective-1000">
                            <div className="bg-white rounded-[2.5rem] p-10 h-full border border-slate-100 shadow-sm transition-all duration-500 group-hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] group-hover:-translate-y-2 relative z-10">
                                <div className="text-8xl font-black text-[#7C2D36]/5 absolute top-6 left-6 transition-colors group-hover:text-[#7C2D36]/10 select-none">
                                    {step.number}
                                </div>
                                <div className="relative">
                                    <div className="w-16 h-16 rounded-2xl bg-[#7C2D36]/5 flex items-center justify-center text-2xl mb-8 group-hover:bg-[#7C2D36] group-hover:text-white transition-all duration-500">
                                        {index + 1 === 1 && "🎓"}
                                        {index + 1 === 2 && "📝"}
                                        {index + 1 === 3 && "💳"}
                                        {index + 1 === 4 && "🚀"}
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-[#7C2D36] transition-colors">
                                        {step.title}
                                    </h3>
                                    <p className="text-slate-500 leading-relaxed text-lg">
                                        {step.description}
                                    </p>
                                </div>
                            </div>

                            {/* Connector line for desktop */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-[2.75rem] left-[calc(100%-2rem)] w-[calc(100%-4rem)] h-1 bg-gradient-to-r from-[#7C2D36]/5 to-[#7C2D36]/20 z-0 origin-left connector-line" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
