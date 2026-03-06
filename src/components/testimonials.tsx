"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export interface Testimonial {
    id: string;
    name: string;
    role: string;
    content: string;
    rating: number;
    date: string;
    approved: boolean;
    created_at?: string;
}

function StarRating({ rating, onRate }: { rating: number; onRate?: (r: number) => void }) {
    const [hovered, setHovered] = useState(0);
    return (
        <div className="flex gap-1 rtl:flex-row-reverse rtl:justify-end">
            {[5, 4, 3, 2, 1].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => onRate?.(star)}
                    onMouseEnter={() => onRate && setHovered(star)}
                    onMouseLeave={() => onRate && setHovered(0)}
                    className={`text-2xl transition-all duration-150 ${star <= (hovered || rating)
                        ? "text-[#D4A853] scale-110"
                        : "text-slate-300"
                        } ${onRate ? "cursor-pointer hover:scale-125" : "cursor-default"}`}
                    disabled={!onRate}
                    aria-label={`${star} stars`}
                >
                    ★
                </button>
            ))}
        </div>
    );
}

function avatarColor(name: string) {
    const colors = [
        "from-[#7C2D36] to-[#c0505e]",
        "from-[#1e3a5f] to-[#2d6a9f]",
        "from-[#2d6a4f] to-[#52b788]",
        "from-[#6a2d82] to-[#a855f7]",
        "from-[#b45309] to-[#D4A853]",
    ];
    let hash = 0;
    for (const c of name) hash += c.charCodeAt(0);
    return colors[hash % colors.length];
}

function getInitials(name: string) {
    return name.trim().split(" ").map((n) => n[0]).join("").slice(0, 2);
}

export default function Testimonials() {
    const t = useTranslations('Testimonials');

    // Create defaults using translations
    const defaultTestimonials: Testimonial[] = [
        {
            id: "1",
            name: t('def_name1'),
            role: t('def_role1'),
            content: t('def_content1'),
            rating: 5,
            date: "2025-01-10",
            approved: true,
        },
        {
            id: "2",
            name: t('def_name2'),
            role: t('def_role2'),
            content: t('def_content2'),
            rating: 5,
            date: "2025-02-14",
            approved: true,
        },
        {
            id: "3",
            name: t('def_name3'),
            role: t('def_role3'),
            content: t('def_content3'),
            rating: 5,
            date: "2025-03-05",
            approved: true,
        },
        {
            id: "4",
            name: t('def_name4'),
            role: t('def_role4'),
            content: t('def_content4'),
            rating: 5,
            date: "2025-04-20",
            approved: true,
        },
    ];

    // Always start with hardcoded defaults so content is visible immediately
    const [approved, setApproved] = useState<Testimonial[]>(defaultTestimonials);
    const [showForm, setShowForm] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ name: "", role: "", content: "", rating: 5 });
    const [errors, setErrors] = useState<{ name?: string; role?: string; content?: string }>({});

    useEffect(() => {
        // Try to get approved testimonials from API (includes user-submitted ones)
        fetch("/api/testimonials")
            .then((r) => r.json())
            .then((data: Testimonial[]) => {
                const approvedFromServer = data.filter((t) => t.approved);
                if (approvedFromServer.length > 0) {
                    setApproved(approvedFromServer);
                }
                // else keep defaults
            })
            .catch(() => {
                // API failed — keep showing hardcoded defaults silently
            });
    }, []);

    function validate() {
        const errs: typeof errors = {};
        if (!form.name.trim() || form.name.trim().length < 2) errs.name = t('err_name_req');
        if (!form.role.trim() || form.role.trim().length < 3) errs.role = t('err_role_req');
        if (!form.content.trim() || form.content.trim().length < 20) errs.content = t('err_content_req');
        return errs;
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }

        const newEntry: Testimonial = {
            id: Date.now().toString(),
            name: form.name.trim(),
            role: form.role.trim(),
            content: form.content.trim(),
            rating: form.rating,
            date: new Date().toISOString().split("T")[0],
            approved: false,
        };

        try {
            await fetch("/api/testimonials", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "add", testimonial: newEntry }),
            });
        } catch {
            // Silently fail — at least show the thank-you message
        }

        setForm({ name: "", role: "", content: "", rating: 5 });
        setErrors({});
        setShowForm(false);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 6000);
    }

    return (
        <section id="testimonials" className="py-24 bg-gradient-to-b from-[#FDFCFB] to-white overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-[#D4A853] font-bold text-sm tracking-widest uppercase mb-3 block">{t('badge')}</span>
                    <h2 className="text-4xl md:text-5xl font-black mb-4 text-slate-900 leading-tight">
                        {t('title1')} <span className="text-[#7C2D36]">{t('title_hl')}</span> {t('title2')}
                    </h2>
                    <p className="text-slate-500 text-lg max-w-xl mx-auto">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Toast */}
                {submitted && (
                    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#7C2D36] text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 text-base font-bold">
                        <span className="text-2xl">⏳</span>
                        شكراً! رأيك قيد المراجعة وسيظهر بعد الموافقة
                    </div>
                )}

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                    {approved.map((t) => (
                        <div
                            key={t.id}
                            className="relative bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col gap-4 hover:-translate-y-1"
                        >
                            <StarRating rating={t.rating} />
                            <p className="text-slate-600 text-sm leading-relaxed flex-1">
                                &ldquo;{t.content}&rdquo;
                            </p>
                            <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarColor(t.name)} flex items-center justify-center text-white font-black text-sm shrink-0`}>
                                    {getInitials(t.name)}
                                </div>
                                <div className="min-w-0">
                                    <div className="font-black text-slate-900 text-sm truncate">{t.name}</div>
                                    <div className="text-[#7C2D36] text-xs font-semibold truncate">{t.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Add Button */}
                    <button
                        onClick={() => setShowForm(true)}
                        className="border-2 border-dashed border-[#D4A853]/40 rounded-3xl p-6 flex flex-col items-center justify-center gap-3 text-slate-400 hover:border-[#D4A853] hover:text-[#D4A853] hover:bg-[#D4A853]/5 transition-all duration-300 min-h-[220px] cursor-pointer group"
                    >
                        <div className="w-14 h-14 rounded-2xl bg-[#D4A853]/10 flex items-center justify-center group-hover:bg-[#D4A853]/20 transition-all">
                            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <div className="text-center">
                            <div className="font-black text-base">{t('btn_add')}</div>
                            <div className="text-sm mt-1">{t('btn_add_desc')}</div>
                        </div>
                    </button>
                </div>
            </div>

            {/* Modal Form */}
            {showForm && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                    onClick={(e) => e.target === e.currentTarget && setShowForm(false)}
                >
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 relative direction-inherit">
                        <button
                            onClick={() => setShowForm(false)}
                            className="absolute top-5 rtl:left-5 ltr:right-5 w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
                        >✕</button>

                        <div className="mb-6">
                            <h3 className="text-2xl font-black text-slate-900 mb-1">{t('modal_title')}</h3>
                            <p className="text-slate-500 text-sm flex items-center gap-2">
                                <span className="text-amber-500">⏳</span>
                                {t('modal_subtitle')}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5 text-start">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1.5">{t('form_name')} <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    placeholder={t('form_name_ph')}
                                    value={form.name}
                                    onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: undefined }); }}
                                    className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all rtl:text-right ltr:text-left ${errors.name ? "border-red-400 bg-red-50" : "border-slate-200 focus:border-[#D4A853] focus:ring-2 focus:ring-[#D4A853]/20"}`}
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1.5">{t('form_role')} <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    placeholder={t('form_role_ph')}
                                    value={form.role}
                                    onChange={(e) => { setForm({ ...form, role: e.target.value }); setErrors({ ...errors, role: undefined }); }}
                                    className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all rtl:text-right ltr:text-left ${errors.role ? "border-red-400 bg-red-50" : "border-slate-200 focus:border-[#D4A853] focus:ring-2 focus:ring-[#D4A853]/20"}`}
                                />
                                {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1.5">{t('form_rating')}</label>
                                <StarRating rating={form.rating} onRate={(r) => setForm({ ...form, rating: r })} />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1.5">{t('form_content')} <span className="text-red-500">*</span></label>
                                <textarea
                                    rows={4}
                                    placeholder={t('form_content_ph')}
                                    value={form.content}
                                    onChange={(e) => { setForm({ ...form, content: e.target.value }); setErrors({ ...errors, content: undefined }); }}
                                    className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all resize-none rtl:text-right ltr:text-left ${errors.content ? "border-red-400 bg-red-50" : "border-slate-200 focus:border-[#D4A853] focus:ring-2 focus:ring-[#D4A853]/20"}`}
                                />
                                <div className="flex justify-between mt-1">
                                    {errors.content ? <p className="text-red-500 text-xs">{errors.content}</p> : <span />}
                                    <span className={`text-xs rtl:text-right ltr:text-left ${form.content.length < 20 ? "text-slate-400" : "text-green-500"}`}>
                                        {form.content.length} / 20 {t('form_content_min')}
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="submit"
                                    className="flex-1 bg-[#7C2D36] text-white py-3.5 rounded-xl font-black text-base hover:bg-[#5C1F27] transition-all shadow-lg hover:-translate-y-0.5 active:scale-95"
                                >
                                    {t('btn_submit')}
                                </button>
                                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3.5 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-all">
                                    {t('btn_cancel')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}
