const features = [
    {
        icon: "🏛️",
        title: "اعتماد جامعة القاهرة",
        description: "شهادات رسمية معتمدة ومعترف بها محلياً ودولياً",
    },
    {
        icon: "👨‍🏫",
        title: "نخبة من الأساتذة",
        description: "تعلم على يد أساتذة جامعيين بخبرة تتجاوز 20 عاماً",
    },
    {
        icon: "💼",
        title: "تأهيل لسوق العمل",
        description: "برامج مصممة لتناسب متطلبات سوق العمل الحديث",
    },
    {
        icon: "🎯",
        title: "تدريب عملي مكثف",
        description: "70% من البرامج تطبيق عملي على مشاريع حقيقية",
    },
];

export default function WhyChooseUs() {
    return (
        <section id="features" className="py-24 bg-white border-t border-slate-100">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16 relative">
                    <div className="absolute top-0 right-1/2 translate-x-1/2 w-48 h-1.5 bg-gradient-to-r from-transparent via-[#7C2D36]/20 to-transparent rounded-full" />
                    <h2 className="text-4xl md:text-5xl font-black mb-4 text-slate-900">
                        لماذا <span className="text-[#D4A853]">تختارنا؟</span>
                    </h2>
                    <p className="text-slate-600 text-lg max-w-xl mx-auto">
                        نقدم تجربة تعليمية فريدة تجمع بين الأصالة الأكاديمية ومتطلبات سوق العمل
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group"
                        >
                            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">{feature.icon}</div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#7C2D36] transition-colors">{feature.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>

                {/* Stats */}
                <div className="mt-20 bg-gradient-to-br from-[#7C2D36] to-[#3D1118] rounded-[2.5rem] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl">
                    {/* Decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-none -translate-y-1/2 translate-x-1/2" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center text-white relative z-10">
                        <div className="border-b md:border-b-0 md:border-l border-white/10 pb-8 md:pb-0 md:pl-12">
                            <div className="text-6xl font-black text-[#D4A853] mb-3">+100K</div>
                            <div className="text-white/80 text-lg font-medium">خريج معتمد سنوياً</div>
                        </div>
                        <div className="pt-4 md:pt-0">
                            <div className="text-6xl font-black text-[#D4A853] mb-3">+50</div>
                            <div className="text-white/80 text-lg font-medium">برنامج تدريبي متخصص</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
