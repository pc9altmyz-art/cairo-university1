"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { programs } from "@/data/programs";
import { useTranslations } from "next-intl";

export default function RegistrationForm({ embedded = false }: { embedded?: boolean }) {
    const t = useTranslations('RegistrationForm');
    const tp = useTranslations('ProgramsData');
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        program: "",
        learningType: "",
        message: "",
    });

    const [errors, setErrors] = useState({ name: "", phone: "" });
    const [touched, setTouched] = useState({ name: false, phone: false });

    const validateField = (name: string, value: string) => {
        if (name === "name") {
            if (!value.trim()) return t('err_name_req');
            if (value.trim().length < 3) return t('err_name_len');
            return "";
        }
        if (name === "phone") {
            if (!value.trim()) return t('err_phone_req');
            if (!/^01[0-9]{9}$/.test(value)) return t('err_phone_inv');
            return "";
        }
        return "";
    };

    const handleBlur = (field: "name" | "phone") => {
        setTouched({ ...touched, [field]: true });
        setErrors({ ...errors, [field]: validateField(field, formData[field]) });
    };

    const nextStep = () => {
        if (step === 1) {
            const nameError = validateField("name", formData.name);
            const phoneError = validateField("phone", formData.phone);
            setErrors({ name: nameError, phone: phoneError });
            setTouched({ name: true, phone: true });
            if (nameError || phoneError) return;
        }
        setStep(step + 1);
    };

    const prevStep = () => setStep(step - 1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        let message = `${t('wa_msg_intro')}\n\n${t('wa_msg_name')} ${formData.name}\n${t('wa_msg_phone')} ${formData.phone}`;
        if (formData.program) message += `\n${t('wa_msg_program')} ${formData.program}`;
        if (formData.learningType) message += `\n${t('wa_msg_learning')} ${formData.learningType}`;
        if (formData.message) message += `\n${t('wa_msg_message')} ${formData.message}`;

        window.open(`https://wa.me/201093998000?text=${encodeURIComponent(message)}`, "_blank");
    };

    const renderStepIndicators = () => (
        <div className="flex justify-between items-center mb-10 relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-100 -translate-y-1/2 z-0 rounded-full overflow-hidden">
                <div
                    className="h-full bg-[#1e3a8a] transition-all duration-500 ease-out"
                    style={{ width: `${((step - 1) / 2) * 100}%` }}
                />
            </div>
            {[1, 2, 3].map((num) => (
                <div
                    key={num}
                    className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center font-black text-lg transition-all duration-500 ${step >= num
                        ? "bg-[#1e3a8a] text-white shadow-lg shadow-[#1e3a8a]/30 scale-110"
                        : "bg-white text-slate-400 border-2 border-slate-100"
                        }`}
                >
                    {step > num ? "✓" : num}
                </div>
            ))}
        </div>
    );

    const formContent = (
        <div className="w-full">
            {renderStepIndicators()}

            <form onSubmit={handleSubmit} className="space-y-8 flex flex-col">
                {/* STEP 1: Personal Details */}
                <div className={step === 1 ? "animate-in fade-in slide-in-from-left-4 duration-500" : "hidden"}>
                    <h3 className="text-2xl font-black mb-6 text-slate-900">{t('step1_title')}</h3>
                    <div className="space-y-6">
                        {/* Name */}
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-slate-800 mr-1">
                                {t('form_name')} <span className="text-[#1e3a8a]">*</span>
                            </label>
                            <div className="relative group">
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => {
                                        setFormData({ ...formData, name: e.target.value });
                                        if (touched.name) setErrors({ ...errors, name: validateField("name", e.target.value) });
                                    }}
                                    onBlur={() => handleBlur("name")}
                                    className={`w-full px-6 py-4 rounded-2xl border-2 outline-none transition-all duration-500 bg-white/50 backdrop-blur-sm focus:bg-white ${touched.name && errors.name ? "border-red-400 bg-red-50" : "border-slate-200/60 focus:border-[#D4A853] focus:ring-4 focus:ring-[#D4A853]/10"}`}
                                    placeholder={t('form_name_ph')}
                                />
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#D4A853] transition-colors">
                                    👤
                                </div>
                            </div>
                            {touched.name && errors.name && <p className="text-red-500 text-xs font-bold mt-1 mr-1">{errors.name}</p>}
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-slate-800 mr-1">
                                {t('form_phone')} <span className="text-[#1e3a8a]">*</span>
                            </label>
                            <div className="relative group">
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => {
                                        setFormData({ ...formData, phone: e.target.value });
                                        if (touched.phone) setErrors({ ...errors, phone: validateField("phone", e.target.value) });
                                    }}
                                    onBlur={() => handleBlur("phone")}
                                    className={`w-full px-6 py-4 rounded-2xl border-2 outline-none transition-all duration-500 bg-white/50 backdrop-blur-sm focus:bg-white ${touched.phone && errors.phone ? "border-red-400 bg-red-50" : "border-slate-200/60 focus:border-[#D4A853] focus:ring-4 focus:ring-[#D4A853]/10"}`}
                                    placeholder={t('form_phone_ph')}
                                    dir="ltr"
                                />
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#D4A853] transition-colors">
                                    📞
                                </div>
                            </div>
                            {touched.phone && errors.phone && <p className="text-red-500 text-xs font-bold mt-1 mr-1">{errors.phone}</p>}
                        </div>
                    </div>
                </div>

                {/* STEP 2: Program Selection */}
                <div className={step === 2 ? "animate-in fade-in slide-in-from-left-4 duration-500" : "hidden"}>
                    <h3 className="text-2xl font-black mb-6 text-slate-900">{t('step2_title')}</h3>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-slate-800 mr-1">
                                {t('form_program')} <span className="text-slate-400 font-medium">{t('form_optional')}</span>
                            </label>
                            <div className="relative group">
                                <select
                                    value={formData.program}
                                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                                    className="w-full px-6 py-4 rounded-2xl border-2 border-slate-200/60 focus:border-[#D4A853] focus:ring-4 focus:ring-[#D4A853]/10 outline-none transition-all duration-500 bg-white/50 backdrop-blur-sm focus:bg-white appearance-none cursor-pointer"
                                >
                                    <option value="">{t('form_program_ph')}</option>
                                    {programs.map((p) => (
                                        <option key={p.id} value={tp(`${p.id}.title`)}>
                                            {tp(`${p.id}.title`)}
                                        </option>
                                    ))}
                                    <option value="أخرى">{t('form_program_other')}</option>
                                </select>
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="block text-sm font-bold text-slate-800 mr-1">
                                {t('form_learning')} <span className="text-slate-400 font-medium">{t('form_optional')}</span>
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { id: "أونلاين", label: t('learning_online'), icon: "💻", desc: t('learning_online_desc') },
                                    { id: "حضور", label: t('learning_offline'), icon: "🏛️", desc: t('learning_offline_desc') }
                                ].map((type) => (
                                    <label
                                        key={type.id}
                                        className={`relative flex items-center p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:shadow-md ${formData.learningType === type.id
                                            ? "border-[#D4A853] bg-[#D4A853]/5 shadow-[0_0_20px_rgba(212,168,83,0.15)] ring-2 ring-[#D4A853]/20"
                                            : "border-slate-200/60 bg-white/50 backdrop-blur-sm hover:border-[#D4A853]/50"
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="learningType"
                                            value={type.id}
                                            checked={formData.learningType === type.id}
                                            onChange={(e) => setFormData({ ...formData, learningType: e.target.value })}
                                            className="sr-only"
                                        />
                                        <div className="flex-1 flex items-center gap-4">
                                            <span className={`text-3xl transition-transform duration-500 ${formData.learningType === type.id ? "scale-110" : "grayscale opacity-50"}`}>
                                                {type.icon}
                                            </span>
                                            <div>
                                                <span className={`block font-black text-sm mb-0.5 ${formData.learningType === type.id ? "text-[#1e3a8a]" : "text-slate-700"}`}>
                                                    {type.label}
                                                </span>
                                                <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{type.desc}</span>
                                            </div>
                                        </div>
                                        {formData.learningType === type.id && (
                                            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#D4A853] to-[#B38B3F] flex items-center justify-center shadow-lg">
                                                <svg className="w-3 h-3 text-[#172554]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        )}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* STEP 3: Message & Submit */}
                <div className={step === 3 ? "animate-in fade-in slide-in-from-left-4 duration-500" : "hidden"}>
                    <h3 className="text-2xl font-black mb-6 text-slate-900">{t('step3_title')}</h3>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-slate-800 mr-1">
                                {t('form_message')} <span className="text-slate-400 font-medium">{t('form_optional')}</span>
                            </label>
                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full px-5 py-4 rounded-2xl border-2 border-slate-200/60 focus:border-[#D4A853] focus:ring-4 focus:ring-[#D4A853]/10 outline-none transition-all duration-500 bg-white/50 backdrop-blur-sm focus:bg-white resize-none h-32"
                                placeholder={t('form_message_ph')}
                            />
                        </div>
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="pt-4 mt-auto">
                    <div className="flex gap-4">
                        {step > 1 && (
                            <button
                                type="button"
                                onClick={prevStep}
                                className="px-8 py-4 rounded-2xl font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors magnetic-btn"
                            >
                                {t('btn_prev')}
                            </button>
                        )}
                        {step < 3 ? (
                            <button
                                type="button"
                                onClick={nextStep}
                                className="flex-1 bg-[#1e3a8a] text-white py-4 rounded-2xl font-black text-lg transition-all shadow-lg hover:shadow-[#1e3a8a]/30 active:scale-95 magnetic-btn"
                            >
                                {t('btn_next')}
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="flex-1 group relative overflow-hidden bg-[#D4A853] text-[#172554] py-4 rounded-2xl font-black text-lg transition-all shadow-lg hover:shadow-[#D4A853]/40 active:scale-95 magnetic-btn"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer" />
                                <span className="flex items-center justify-center gap-2 relative z-10 text-[#172554]">
                                    {t('btn_submit')}
                                    <svg className="w-5 h-5 rtl:transform rtl:rotate-180 rtl:group-hover:translate-x-1 ltr:group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                            </button>
                        )}
                    </div>
                </div>

            </form>
        </div>
    );

    if (embedded) {
        return formContent;
    }

    return (
        <section id="register" className="py-32 bg-[#FDFCFB]">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <span className="text-[#D4A853] font-black text-xs tracking-[0.3em] uppercase mb-4 block">{t('badge')}</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-slate-900 leading-tight">
                            {t('title1')} <span className="text-[#B38B3F]">{t('title_hl')}</span>
                        </h2>
                        <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
                            {t('subtitle')}
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-12 items-start relative z-10">
                        {/* Main Form Container */}
                        <div className="lg:col-span-8 bg-white/70 backdrop-blur-2xl rounded-[3rem] p-8 md:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-white relative overflow-hidden min-h-[500px]">
                            {/* Decorative element */}
                            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#B38B3F] to-[#D4A853]"></div>
                            {formContent}
                        </div>

                        {/* Social/Contact Sidebar */}
                        <div className="lg:col-span-4 space-y-8 sticky top-32">
                            {/* WhatsApp Card */}
                            <div className="premium-card p-8 bg-[#25D366] text-white border-none flex flex-col items-center text-center group cursor-pointer shadow-[0_20px_40px_-10px_rgba(37,211,102,0.3)] hover:-translate-y-2 transition-transform duration-500">
                                <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mb-6 backdrop-blur-md rotate-3 group-hover:rotate-0 transition-transform duration-500">
                                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-black mb-2">{t('wa_title')}</h3>
                                <p className="text-white/80 font-bold text-sm mb-8">{t('wa_subtitle')}</p>
                                <Link
                                    href="https://wa.me/201093998000"
                                    target="_blank"
                                    className="w-full inline-block text-center bg-white text-[#25D366] py-3 rounded-2xl font-black shadow-lg hover:shadow-xl transition-all active:scale-95 text-sm"
                                >
                                    {t('wa_btn')}
                                </Link>
                            </div>

                            {/* Hotline Card */}
                            <div className="premium-card p-8 bg-[#0F172A] text-white border-none flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-500">
                                <div className="w-16 h-16 bg-[#1e3a8a] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-black mb-4">{t('phone_title')}</h3>
                                <a
                                    href="tel:+201093998000"
                                    className="text-2xl font-black text-[#D4A853] hover:text-white transition-colors block text-center"
                                    dir="ltr"
                                >
                                    +20 109 399 8000
                                </a>
                                <p className="text-white/40 text-[10px] font-bold mt-4 uppercase tracking-[0.2em]">{t('phone_subtitle')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
