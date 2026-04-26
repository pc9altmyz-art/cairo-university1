"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const MOCK_CERTS: Record<string, { name: string; program: string; date: string; grade: string }> = {
    "123456789": { name: "أحمد محمد محمود", program: "إعداد مدربين (TOT)", date: "15 مايو 2025", grade: "امتياز" },
    "987654321": { name: "سارة عبد الرحمن", program: "دبلوم الصحة النفسية", date: "22 أكتوبر 2024", grade: "جيد جداً" }
};

function launchConfetti() {
    if (typeof window === "undefined") return;
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    const pieces = Array.from({ length: 120 }, () => ({
        x: Math.random() * canvas.width, y: Math.random() * -canvas.height,
        r: Math.random() * 6 + 4,
        color: ["#D4A853","#1e3a8a","#ffffff","#22c55e"][Math.floor(Math.random()*4)],
        speed: Math.random()*3+2, angle: Math.random()*360, spin: (Math.random()-0.5)*4
    }));
    let f = 0;
    const animate = () => {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        pieces.forEach(p => { p.y+=p.speed; p.angle+=p.spin; ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.angle*Math.PI/180); ctx.fillStyle=p.color; ctx.fillRect(-p.r/2,-p.r/2,p.r,p.r*2); ctx.restore(); });
        if(++f<200) requestAnimationFrame(animate); else canvas.remove();
    };
    animate();
}

// ── Marquee Row ──
function MarqueeRow({ row, dir }: { row: number[]; dir: "left" | "right" }) {
    const [paused, setPaused] = useState(false);
    const items = [...row, ...row, ...row];
    return (
        <div className={`flex w-fit ${dir === "left" ? "animate-marquee-left" : "animate-marquee-right"}`}
             style={{ animationPlayState: paused ? "paused" : "running" }}
             onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            {items.map((num, i) => (
                <div key={i} className="px-3 md:px-6 group">
                    <div className="relative w-[200px] h-[140px] md:w-[380px] md:h-[270px] rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-white/5 shadow-xl transition-all duration-700 group-hover:-translate-y-4 group-hover:shadow-[0_24px_48px_-8px_rgba(212,168,83,0.4)] group-hover:border-[#D4A853]/40">
                        <Image src={`/certificates/1 (${num}).jpg`} alt={`Certificate ${num}`} fill className="object-contain p-3 md:p-6 transition-transform duration-700 group-hover:scale-105" unoptimized loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-4 md:pb-6">
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 px-3 py-1 rounded-full">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#D4A853] animate-pulse" />
                                <span className="text-[#D4A853] font-black text-[9px] md:text-xs tracking-widest uppercase">Certified</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function CertificatesPage() {
    const t = useTranslations("Certificates");
    const [query, setQuery] = useState("");
    const [verifying, setVerifying] = useState(false);
    const [result, setResult] = useState<"none"|"success"|"error">("none");
    const [cert, setCert] = useState<typeof MOCK_CERTS[string]|null>(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const row1 = Array.from({length:12},(_,i)=>i+1);
    const row2 = Array.from({length:12},(_,i)=>i+13);

    const verify = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        setVerifying(true); setResult("none");
        setTimeout(() => {
            const d = MOCK_CERTS[query.trim()];
            if (d) { setCert(d); setResult("success"); launchConfetti(); }
            else { setCert(null); setResult("error"); }
            setVerifying(false);
        }, 1500);
    };

    return (
        <main className="min-h-screen bg-[#0F172A] relative overflow-hidden">
            {/* BG blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#D4A853]/8 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#1e3a8a]/15 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 pt-28 md:pt-36 pb-12 relative z-10">
                {/* ── HEADER ── */}
                <div className="max-w-4xl mx-auto flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-12 md:mb-20">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-xl">
                            <span className="w-2 h-2 rounded-full bg-[#D4A853] animate-pulse" />
                            <span className="text-[#D4A853] font-black text-[10px] uppercase tracking-widest">{t("badge")}</span>
                        </div>
                        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white leading-tight tracking-tight">
                            {t("title1")}{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A853] via-[#FFD700] to-[#D4A853]">
                                {t("title_hl")}
                            </span>
                        </h1>
                        <p className="text-white/60 text-base md:text-xl mt-4 max-w-xl leading-relaxed">
                            {t("subtitle")}
                        </p>
                    </div>

                    {/* Feature badges */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 shrink-0 w-full lg:w-auto">
                        {[t("feat1"), t("feat2"), t("feat3"), t("feat4")].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 hover:border-[#D4A853]/30 hover:bg-[#D4A853]/5 transition-all group">
                                <div className="w-9 h-9 rounded-xl bg-[#D4A853]/15 flex items-center justify-center text-[#D4A853] group-hover:bg-[#D4A853] group-hover:text-[#0F172A] transition-all shrink-0">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <span className="font-bold text-sm text-white/80 group-hover:text-[#FFD700] transition-colors">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── MARQUEE GALLERY ── */}
            <div className="relative w-full flex flex-col gap-5 md:gap-10 pb-12 overflow-hidden" dir="ltr">
                <div className="absolute top-0 bottom-0 left-0 w-16 md:w-48 bg-gradient-to-r from-[#0F172A] to-transparent z-20 pointer-events-none" />
                <div className="absolute top-0 bottom-0 right-0 w-16 md:w-48 bg-gradient-to-l from-[#0F172A] to-transparent z-20 pointer-events-none" />
                <MarqueeRow row={row1} dir="left" />
                <MarqueeRow row={row2} dir="right" />
            </div>

            {/* ── VERIFICATION FORM ── */}
            <div className="container mx-auto px-4 pb-24 relative z-10">
                <div className="max-w-3xl mx-auto">
                    <div className="rounded-[2rem] md:rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-2xl p-6 md:p-10 shadow-2xl">
                        {/* Title */}
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-5 mb-8">
                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-[#D4A853] to-[#FFD700] flex items-center justify-center shadow-[0_8px_24px_-8px_rgba(212,168,83,0.6)] shrink-0">
                                <svg className="w-7 h-7 text-[#0F172A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-[#D4A853] font-black text-[10px] uppercase tracking-widest mb-1">{t("verification_badge")}</div>
                                <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">{t("verification_title")}</h2>
                                <p className="text-white/50 text-sm mt-1">{t("verification_subtitle")}</p>
                            </div>
                        </div>

                        {/* Search Form */}
                        {result === "none" || result === "error" ? (
                            <form onSubmit={verify} className="flex flex-col sm:flex-row gap-3">
                                <div className="relative flex-1">
                                    <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder={t("verification_ph")}
                                        className="w-full h-14 bg-white/5 border border-white/10 focus:border-[#D4A853]/50 focus:ring-0 rounded-2xl pr-12 pl-5 text-white placeholder-white/25 font-bold text-sm md:text-base outline-none transition-all" dir="rtl" />
                                </div>
                                <button type="submit" disabled={verifying||!query.trim()}
                                    className="h-14 px-8 bg-[#D4A853] text-[#0F172A] font-black rounded-2xl shadow-[0_8px_24px_-8px_rgba(212,168,83,0.5)] hover:shadow-[0_12px_32px_-8px_rgba(212,168,83,0.7)] hover:-translate-y-0.5 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap">
                                    {verifying ? <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>
                                    : t("verification_btn")}
                                </button>
                            </form>
                        ) : null}

                        {/* Error */}
                        {result === "error" && (
                            <div className="mt-5 flex items-center gap-4 bg-red-500/10 border border-red-500/20 rounded-2xl p-5">
                                <div className="w-10 h-10 bg-red-500/20 text-red-400 rounded-xl flex items-center justify-center shrink-0">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                                </div>
                                <p className="text-red-300 font-bold text-sm">{t("search_error")}</p>
                            </div>
                        )}

                        {/* Success Card */}
                        {result === "success" && cert && (
                            <div style={{animation:"popIn 0.6s cubic-bezier(0.34,1.56,0.64,1)"}}>
                                {/* Verified badge */}
                                <div className="flex items-center justify-center gap-3 py-5 mb-6 border-b border-white/10">
                                    <div className="w-3 h-3 bg-green-500 rounded-full animate-ping shrink-0"/>
                                    <span className="font-black text-green-400 text-lg">{t("verified")}</span>
                                    <svg className="w-6 h-6 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                                </div>

                                {/* Details */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                    {[
                                        {l:t("cert_name"), v:cert.name},
                                        {l:t("cert_program"), v:cert.program},
                                        {l:t("cert_date"), v:cert.date},
                                        {l:t("cert_grade"), v:cert.grade},
                                    ].map(({l,v}) => (
                                        <div key={l} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                                            <div className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">{l}</div>
                                            <div className="text-white font-black text-lg">{v}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Barcode footer */}
                                <div className="flex items-center justify-between border-t border-white/10 pt-5 gap-4 flex-wrap">
                                    <div className="opacity-30 flex flex-col gap-1">
                                        <div className="h-7 w-36 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,white_2px,white_4px,transparent_4px,transparent_6px,white_6px,white_10px)]"/>
                                        <div className="font-mono text-[9px] text-white tracking-[0.3em]">ID-{query.trim()}</div>
                                    </div>
                                    <button onClick={()=>{setResult("none");setQuery("");setCert(null);}}
                                        className="h-11 px-6 border border-white/10 text-white/70 font-bold rounded-xl hover:bg-white/5 text-sm transition-all">
                                        {t("btn_verify_another")}
                                    </button>
                                </div>
                            </div>
                        )}

                        {result==="none" && <p className="text-center text-white/25 text-xs mt-4">جرب: <span className="text-[#D4A853] font-black">123456789</span></p>}
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes marquee-left { 0%{transform:translateX(0%)} 100%{transform:translateX(-33.333%)} }
                @keyframes marquee-right { 0%{transform:translateX(-33.333%)} 100%{transform:translateX(0%)} }
                .animate-marquee-left { animation: marquee-left 80s linear infinite; }
                .animate-marquee-right { animation: marquee-right 80s linear infinite; }
                @keyframes popIn { from{opacity:0;transform:scale(0.9)} to{opacity:1;transform:scale(1)} }
            `}</style>
        </main>
    );
}
