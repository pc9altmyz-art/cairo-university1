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
    return (
        <section id="how-it-works" className="py-24 bg-slate-50 border-y border-slate-100">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-[#D4A853] font-bold text-sm tracking-widest uppercase mb-3 block">رحلة التعلم</span>
                    <h2 className="text-4xl md:text-5xl font-black mb-4 text-slate-900">
                        كيف <span className="text-[#7C2D36]">تبدأ؟</span>
                    </h2>
                    <p className="text-slate-600 text-lg">
                        أربع خطوات بسيطة لبدء مسيرتك المهنية الجديدة
                    </p>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="bg-white rounded-3xl p-10 relative group hover:shadow-xl transition-all duration-300 border border-slate-100">
                            <div className="text-7xl font-black text-[#7C2D36]/5 absolute top-4 left-4 group-hover:text-[#7C2D36]/10 transition-colors">
                                {step.number}
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-[#7C2D36] transition-colors">{step.title}</h3>
                                <p className="text-slate-500 leading-relaxed">{step.description}</p>
                            </div>

                            {/* Connector line for desktop */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-slate-200 z-0" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
