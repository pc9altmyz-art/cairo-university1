export default function Certificates() {
    return (
        <section id="certificates" className="py-16 sm:py-24 bg-white">
            <div className="container mx-auto">
                <div className="bg-[#7C2D36] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-16">
                    <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                        {/* Content */}
                        <div className="text-white order-2 md:order-1">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 leading-tight">
                                شهادة معتمدة + محتوى <span className="text-[#D4A853]">مدى الحياة</span>
                            </h2>
                            <p className="text-white/70 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
                                عند إتمام البرنامج، تحصل على شهادة رسمية من جامعة القاهرة
                                مع وصول دائم لجميع المحتويات التعليمية.
                            </p>

                            <div className="space-y-3 sm:space-y-4">
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#D4A853] flex items-center justify-center flex-shrink-0">
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#7C2D36]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-sm sm:text-base">شهادة معتمدة قابلة للتوثيق خارجياً للعمل خارج مصر</span>
                                </div>
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#D4A853] flex items-center justify-center flex-shrink-0">
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#7C2D36]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-sm sm:text-base">وصول مدى الحياة للمحتوى</span>
                                </div>
                            </div>
                        </div>

                        {/* Visual */}
                        <div className="flex justify-center order-1 md:order-2">
                            <div className="relative">
                                <div className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                                    <span className="text-6xl sm:text-7xl md:text-8xl">🎓</span>
                                </div>
                                <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-[#D4A853] text-[#7C2D36] px-3 py-1 sm:px-4 sm:py-2 rounded-full font-bold text-sm sm:text-base">
                                    معتمدة
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
