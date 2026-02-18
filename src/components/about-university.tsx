import Image from "next/image";

export default function AboutUniversity() {
    return (
        <section id="about" className="py-16 sm:py-24">
            <div className="container mx-auto">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    {/* Image */}
                    <div className="relative order-2 lg:order-1">
                        <div className="soft-card overflow-hidden">
                            <div className="aspect-[4/3] relative">
                                <Image
                                    src="/background.jpg"
                                    alt="جامعة القاهرة"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover"
                                    loading="lazy"
                                    placeholder="blur"
                                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAYH/8QAIhAAAgEDAwUBAAAAAAAAAAAAAQIDAAQRBQYSEyExQVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQADAQEBAAAAAAAAAAAAAAABAgMABBH/2gAMAwEAAhEDEQA/ANV3Bq01lZQG2t4pHkk6YLuVCjBJPYeeBVBDcTSwxySW8aO6hmRWJCkjsM49UppVQ+K0fP/Z"
                                />
                            </div>
                        </div>
                        <div className="absolute -bottom-4 right-4 sm:-bottom-6 sm:-right-6 bg-[#D4A853] text-[#7C2D36] rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl">
                            <div className="text-2xl sm:text-3xl font-black">1908</div>
                            <div className="text-xs sm:text-sm">تأسست</div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6 text-slate-900">
                            جامعة <span className="text-[#D4A853]">القاهرة</span>
                        </h2>

                        <div className="space-y-3 sm:space-y-4 text-slate-600 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
                            <p>
                                تأسست جامعة القاهرة عام 1908 لتكون أولى الجامعات المصرية الحديثة،
                                وأصبحت اليوم من أبرز الجامعات على مستوى العالم العربي والأفريقي.
                            </p>
                            <p>
                                تضم الجامعة أكثر من 25 كلية ومعهداً، ويتخرج منها سنوياً آلاف الطلاب
                                الذين يشغلون مناصب قيادية في مختلف المجالات.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-3 sm:gap-6">
                            <div className="soft-card p-3 sm:p-4 text-center">
                                <div className="text-xl sm:text-2xl font-black text-[#7C2D36]">+25</div>
                                <div className="text-xs sm:text-sm text-slate-500">كلية</div>
                            </div>
                            <div className="soft-card p-3 sm:p-4 text-center">
                                <div className="text-xl sm:text-2xl font-black text-[#7C2D36]">+200K</div>
                                <div className="text-xs sm:text-sm text-slate-500">طالب</div>
                            </div>
                            <div className="soft-card p-3 sm:p-4 text-center">
                                <div className="text-xl sm:text-2xl font-black text-[#7C2D36]">#1</div>
                                <div className="text-xs sm:text-sm text-slate-500">في مصر</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
