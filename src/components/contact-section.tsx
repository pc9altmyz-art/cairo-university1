"use client";

import { siteConfig } from "@/config/site";
import RegistrationForm from "./registration-form";

export default function ContactSection() {
    const contactInfo = [
        {
            title: "اتصل بنا",
            value: "+20 109 399 8000",
            link: "tel:+201093998000",
            icon: "📞",
            color: "bg-blue-50 text-blue-600",
        },
        {
            title: "واتساب",
            value: "ارسل رسالة مباشرة",
            link: "https://wa.me/201093998000",
            icon: "💬",
            color: "bg-green-50 text-green-600",
        },
        {
            title: "فيسبوك",
            value: "تابع صفحتنا الرسمية",
            link: siteConfig.links.facebook,
            icon: "🔵",
            color: "bg-indigo-50 text-indigo-600",
        },
        {
            title: "انستجرام",
            value: "شاهد آخر برامجنا",
            link: siteConfig.links.instagram,
            icon: "📸",
            color: "bg-pink-50 text-pink-600",
        },
        {
            title: "الموقع",
            value: "جامعة القاهرة - الجيزة",
            link: "#",
            icon: "📍",
            color: "bg-red-50 text-red-600",
        },
    ];

    return (
        <section id="contact" className="py-32 bg-white relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#7C2D36]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-60" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#D4A853]/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 opacity-60" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-24">
                    <span className="text-[#D4A853] font-black text-xs tracking-[0.3em] uppercase mb-4 block">تواصل مباشر</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 text-slate-900 leading-tight">
                        نحن دائماً <span className="text-[#7C2D36]">بجوارك</span>
                    </h2>
                    <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
                        فريقنا المختص جاهز للرد على جميع استفساراتكم وتوجيهكم نحو المسار التعليمي الأنسب لمستقبلكم المهني.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    {/* Contact Info Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="grid grid-cols-1 gap-4">
                            {contactInfo.map((info, index) => (
                                <a
                                    key={index}
                                    href={info.link}
                                    target={info.link.startsWith("http") ? "_blank" : undefined}
                                    className="premium-card flex items-center gap-6 p-6 group cursor-pointer border-slate-100 hover:border-[#7C2D36]/20"
                                >
                                    <div className={`w-14 h-14 ${info.color} rounded-2xl flex items-center justify-center text-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                                        {info.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-black text-slate-900 text-sm mb-1">{info.title}</h3>
                                        <p className="text-slate-400 font-bold text-[11px] uppercase tracking-wider">{info.value}</p>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* Working Hours Premium Card */}
                        <div className="bg-[#0F172A] text-white p-10 rounded-[2.5rem] relative overflow-hidden shadow-2xl group">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-[#7C2D36]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />
                            <div className="relative z-10">
                                <h3 className="text-2xl font-black mb-8 flex items-center gap-4">
                                    <span className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-xl">📅</span>
                                    ساعات العمل
                                </h3>
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center border-b border-white/5 pb-4">
                                        <span className="text-white/60 font-bold text-sm">السبت - الخميس</span>
                                        <span className="font-black text-[#D4A853]">9:00 ص - 8:00 م</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-white/40 font-bold text-sm">الجمعة</span>
                                        <span className="text-white/20 font-black italic">عطلة رسمية</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Integrated Form Area */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-[3.5rem] p-1 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] border border-slate-50 relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#7C2D36]/5 to-[#D4A853]/5 rounded-[3.5rem] -m-1 -z-10" />
                            <div className="p-8 md:p-16">
                                <div className="mb-12">
                                    <h3 className="text-2xl font-black text-slate-900 mb-2">تواصل سريع</h3>
                                    <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">املأ النموذج وسنقوم بالرد خلال 24 ساعة</p>
                                </div>
                                <RegistrationForm embedded={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
