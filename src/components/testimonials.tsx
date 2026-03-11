"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
        <div className="flex gap-0.5 rtl:flex-row-reverse rtl:justify-end">
            {[5, 4, 3, 2, 1].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => onRate?.(star)}
                    onMouseEnter={() => onRate && setHovered(star)}
                    onMouseLeave={() => onRate && setHovered(0)}
                    className={`text-xl transition-all duration-150 ${star <= (hovered || rating)
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
    return name.trim().split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

function TestimonialCard({ item }: { item: Testimonial }) {
    return (
        <div className="relative flex-shrink-0 w-80 bg-white rounded-3xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.07)] border border-slate-100 hover:shadow-[0_12px_40px_rgba(124,45,54,0.12)] hover:border-[#7C2D36]/20 transition-all duration-500 hover:-translate-y-1 mx-3 group">
            {/* Quote Icon */}
            <div className="absolute top-5 rtl:left-5 ltr:right-5 text-5xl font-black text-[#D4A853]/15 select-none leading-none group-hover:text-[#D4A853]/25 transition-colors duration-500">"</div>

            {/* Stars */}
            <StarRating rating={item.rating} />

            {/* Content */}
            <p className="text-slate-600 text-sm leading-relaxed mt-4 mb-5 rtl:text-right ltr:text-left line-clamp-4">
                {item.content}
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${avatarColor(item.name)} flex items-center justify-center text-white font-black text-sm shrink-0 shadow-md`}>
                    {getInitials(item.name)}
                </div>
                <div className="min-w-0 rtl:text-right ltr:text-left">
                    <div className="font-black text-slate-900 text-sm truncate">{item.name}</div>
                    <div className="text-[#7C2D36] text-xs font-semibold truncate mt-0.5">{item.role}</div>
                </div>
            </div>
        </div>
    );
}

function MarqueeRow({ items, reverse = false }: { items: Testimonial[]; reverse?: boolean }) {
    // Duplicate to make the loop seamless
    const doubled = [...items, ...items];
    return (
        <div className="relative overflow-hidden group/row py-2">
            <div
                className={`flex w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"} group-hover/row:[animation-play-state:paused]`}
            >
                {doubled.map((item, i) => (
                    <TestimonialCard key={`${item.id}-${i}`} item={item} />
                ))}
            </div>
        </div>
    );
}

export default function Testimonials() {
    const t = useTranslations('Testimonials');

    const defaultTestimonials: Testimonial[] = [
        { id: "1", name: t('def_name1'), role: t('def_role1'), content: t('def_content1'), rating: 5, date: "2025-01-10", approved: true },
        { id: "2", name: t('def_name2'), role: t('def_role2'), content: t('def_content2'), rating: 5, date: "2025-02-14", approved: true },
        { id: "3", name: t('def_name3'), role: t('def_role3'), content: t('def_content3'), rating: 5, date: "2025-03-05", approved: true },
        { id: "4", name: t('def_name4'), role: t('def_role4'), content: t('def_content4'), rating: 5, date: "2025-04-20", approved: true },
    ];

    const [approved, setApproved] = useState<Testimonial[]>(defaultTestimonials);
    const [showForm, setShowForm] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ name: "", role: "", content: "", rating: 5 });
    const [errors, setErrors] = useState<{ name?: string; role?: string; content?: string }>({});

    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    // GSAP scroll animation
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            gsap.fromTo(headerRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 1, ease: "power2.out",
                    scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
                }
            );
            gsap.fromTo(marqueeRef.current,
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, duration: 1, ease: "power3.out",
                    scrollTrigger: { trigger: marqueeRef.current, start: "top 85%" }
                }
            );
            gsap.fromTo(ctaRef.current,
                { opacity: 0, scale: 0.95, y: 20 },
                {
                    opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.5)",
                    scrollTrigger: { trigger: ctaRef.current, start: "top 90%" }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        fetch("/api/testimonials")
            .then((r) => r.json())
            .then((data: Testimonial[]) => {
                const approvedFromServer = data.filter((t) => t.approved);
                if (approvedFromServer.length > 0) setApproved(approvedFromServer);
            })
            .catch(() => { });
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
        } catch { }

        setForm({ name: "", role: "", content: "", rating: 5 });
        setErrors({});
        setShowForm(false);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 6000);
    }

    // Split testimonials into two rows for the marquee
    const midpoint = Math.ceil(approved.length / 2);
    const row1 = approved.length >= 2 ? approved.slice(0, midpoint) : approved;
    const row2 = approved.length >= 2 ? approved.slice(midpoint) : [...approved].reverse();

    // Fill short rows so marquee looks good
    const fillToMin = (arr: Testimonial[], min: number): Testimonial[] => {
        if (arr.length >= min) return arr;
        const result = [...arr];
        while (result.length < min) result.push(...arr);
        return result.slice(0, min);
    };
    const row1Items = fillToMin(row1, 4);
    const row2Items = fillToMin(row2.length > 0 ? row2 : [...approved].reverse(), 4);

    return (
        <section ref={sectionRef} id="testimonials" className="py-32 bg-[#0a0204] relative overflow-hidden scroll-mt-28">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#7C2D36 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }} />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4A853]/8 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#7C2D36]/6 rounded-full blur-3xl pointer-events-none" />

            {/* Toast */}
            {submitted && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-[#7C2D36] to-[#5C1F27] text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 text-base font-bold border border-white/10 backdrop-blur-sm animate-fade-in-up">
                    <span className="text-2xl">✅</span>
                    {t('toast_success')}
                </div>
            )}

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-16 opacity-0">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#7C2D36]/8 border border-[#7C2D36]/15 text-[#7C2D36] text-sm font-bold uppercase tracking-[0.15em] mb-5">
                        {t('badge')}
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-5 text-slate-900 leading-tight tracking-tight">
                        {t('title1')} <span className="text-[#D4A853]">{t('title_hl')}</span> {t('title2')}
                    </h2>
                    <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">
                        {t('subtitle')}
                    </p>
                </div>
            </div>

            {/* Marquee rows — full width, no container */}
            <div ref={marqueeRef} className="space-y-5 mb-14 opacity-0">
                <MarqueeRow items={row1Items} />
                <MarqueeRow items={row2Items} reverse />
            </div>

            {/* CTA */}
            <div ref={ctaRef} className="flex justify-center opacity-0">
                <button
                    onClick={() => setShowForm(true)}
                    className="group relative overflow-hidden bg-white border-2 border-[#D4A853]/40 hover:border-[#D4A853] text-slate-700 hover:text-[#7C2D36] px-10 py-4 rounded-2xl font-black text-base transition-all duration-300 shadow-sm hover:shadow-[0_8px_30px_rgba(212,168,83,0.2)] hover:-translate-y-1 flex items-center gap-3"
                >
                    <div className="w-9 h-9 rounded-xl bg-[#D4A853]/10 group-hover:bg-[#D4A853]/20 flex items-center justify-center transition-colors duration-300">
                        <svg className="w-5 h-5 text-[#D4A853]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                    <div className="text-start rtl:text-right">
                        <div>{t('btn_add')}</div>
                        <div className="text-xs font-medium text-slate-400 group-hover:text-slate-500">{t('btn_add_desc')}</div>
                    </div>
                </button>
            </div>

            {/* Modal Form */}
            {showForm && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                    onClick={(e) => e.target === e.currentTarget && setShowForm(false)}
                >
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 relative direction-inherit animate-scale-in">
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
