"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

// ── Mock Data ──
const MOCK_CERTIFICATES: Record<string, { name: string; program: string; date: string; grade: string }> = {
    "123456789": { name: "أحمد محمد محمود", program: "إعداد مدربين (TOT)", date: "15 مايو 2025", grade: "امتياز" },
    "987654321": { name: "سارة عبد الرحمن", program: "دبلوم الصحة النفسية", date: "22 أكتوبر 2024", grade: "جيد جداً" }
};

// ── Simple Confetti without library ──
function launchConfetti() {
    if (typeof window === "undefined") return;
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = Array.from({ length: 120 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height,
        r: Math.random() * 6 + 4,
        color: ["#D4A853", "#1e3a8a", "#ffffff", "#22c55e"][Math.floor(Math.random() * 4)],
        speed: Math.random() * 3 + 2,
        angle: Math.random() * 360,
        spin: (Math.random() - 0.5) * 4
    }));

    let frame = 0;
    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pieces.forEach((p) => {
            p.y += p.speed;
            p.angle += p.spin;
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.angle * Math.PI) / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 2);
            ctx.restore();
        });
        frame++;
        if (frame < 200) requestAnimationFrame(animate);
        else canvas.remove();
    };
    animate();
}

export default function CertificatesPage() {
    const t = useTranslations("Certificates");
    const [searchQuery, setSearchQuery] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const [result, setResult] = useState<"none" | "success" | "error">("none");
    const [certData, setCertData] = useState<{ name: string; program: string; date: string; grade: string } | null>(null);
    const [visible, setVisible] = useState(false);

    // ── Fade-in on mount ──
    useEffect(() => { setVisible(true); }, []);

    // ── 3D Tilt ──
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (window.matchMedia("(pointer: coarse)").matches) return;
        const r = e.currentTarget.getBoundingClientRect();
        setTilt({ x: ((e.clientY - r.top) / r.height - 0.5) * -12, y: ((e.clientX - r.left) / r.width - 0.5) * 12 });
    };
    const resetTilt = () => setTilt({ x: 0, y: 0 });

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        setIsVerifying(true);
        setResult("none");
        setTimeout(() => {
            const data = MOCK_CERTIFICATES[searchQuery.trim()];
            if (data) { setCertData(data); setResult("success"); launchConfetti(); }
            else { setCertData(null); setResult("error"); }
            setIsVerifying(false);
        }, 1500);
    };

    return (
        <main className="min-h-screen bg-slate-50 pt-28 md:pt-32 pb-24 relative overflow-hidden">
            {/* BG Decoration */}
            <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-[#1e3a8a]/5 to-transparent pointer-events-none" />
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#D4A853]/10 blur-[120px] pointer-events-none" />

            <div
                className="container mx-auto px-4 relative z-10"
                style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
            >
                {/* ── HEADER ── */}
                <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16 space-y-4 md:space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-xs md:text-sm font-bold text-[#1e3a8a]">
                        <span className="w-2 h-2 rounded-full bg-[#D4A853] animate-pulse shrink-0" />
                        {t("badge")}
                    </div>
                    <h1 className="text-3xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                        {t("title1")}{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1e3a8a] to-[#D4A853]">
                            {t("title_hl")}
                        </span>
                    </h1>
                    <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium px-2">
                        {t("subtitle")}
                    </p>
                </div>

                {/* ── SEARCH ── */}
                <div className="max-w-2xl mx-auto mb-12 px-2">
                    <form onSubmit={handleVerify} className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#1e3a8a] to-[#D4A853] rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-500 pointer-events-none" />
                        <div className="relative bg-white border border-slate-100 rounded-[2rem] p-2 flex flex-col sm:flex-row gap-2 shadow-xl">
                            <div className="relative flex-1 flex items-center">
                                <svg className="absolute right-5 w-5 h-5 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={t("search_ph")}
                                    className="w-full bg-transparent text-base md:text-lg py-4 pr-14 pl-4 text-slate-900 placeholder-slate-400 font-bold outline-none"
                                    dir="rtl"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isVerifying || !searchQuery.trim()}
                                className="min-h-[52px] px-6 md:px-8 bg-[#1e3a8a] text-white rounded-full font-black text-base hover:bg-[#152e75] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
                            >
                                {isVerifying ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        {t("searching")}
                                    </>
                                ) : t("btn_search")}
                            </button>
                        </div>
                    </form>
                    <p className="text-center text-slate-400 text-xs mt-3 font-medium">
                        جرب البحث برقم: <span className="text-[#1e3a8a] font-black">123456789</span>
                    </p>
                </div>

                {/* ── RESULTS ── */}
                <div className="max-w-4xl mx-auto px-2">

                    {/* Error */}
                    {result === "error" && (
                        <div className="bg-red-50 border border-red-100 rounded-3xl p-8 md:p-12 text-center"
                             style={{ animation: "fadeIn 0.4s ease" }}>
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-5">
                                <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <h3 className="text-base md:text-2xl font-black text-slate-900">{t("not_found")}</h3>
                        </div>
                    )}

                    {/* Success */}
                    {result === "success" && certData && (
                        <div className="relative" style={{ animation: "popIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
                            {/* Glow */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-[#D4A853] via-[#1e3a8a] to-[#D4A853] opacity-20 blur-2xl rounded-[3rem] pointer-events-none" />

                            {/* Card */}
                            <div
                                className="relative bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 shadow-2xl border border-slate-100 overflow-hidden"
                                style={{ transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, transition: "transform 0.15s ease-out" }}
                                onMouseMove={handleMouseMove}
                                onMouseLeave={resetTilt}
                            >
                                {/* Watermark */}
                                <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
                                    <Image src="/icon.png" alt="" width={400} height={400} className="object-contain" unoptimized />
                                </div>
                                {/* Gold Border */}
                                <div className="absolute inset-3 border-2 border-[#D4A853]/20 rounded-[1.8rem] pointer-events-none" />

                                <div className="relative z-10 flex flex-col items-center gap-6 md:gap-8">

                                    {/* Logos Row */}
                                    <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4">
                                        <div className="w-20 h-20 md:w-28 md:h-28 bg-slate-50 rounded-2xl p-2 border border-slate-100 shadow-sm flex items-center justify-center shrink-0">
                                            <Image src="/icon.png" alt="Logo" width={80} height={80} className="object-contain" unoptimized />
                                        </div>
                                        <div className="text-center flex-1 px-2">
                                            <h4 className="text-base md:text-2xl font-black text-[#1e3a8a] leading-tight">
                                                المؤسسة المصرية<br />للاستشارات العلمية والتربوية
                                            </h4>
                                            <p className="text-[#D4A853] font-bold text-[11px] md:text-sm mt-1">
                                                Egyptian Institution for Scientific & Educational Consultations
                                            </p>
                                        </div>
                                        <div className="w-20 h-20 md:w-28 md:h-28 bg-[#1e3a8a]/5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-center shrink-0">
                                            <svg className="w-10 h-10 md:w-14 md:h-14 text-[#1e3a8a]" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Verified Badge */}
                                    <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 bg-green-50 border border-green-200 text-green-700 rounded-full shadow-sm">
                                        <span className="w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 rounded-full animate-ping shrink-0" />
                                        <span className="font-black text-sm md:text-lg">{t("verified")}</span>
                                        <svg className="w-5 h-5 md:w-6 md:h-6 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>

                                    {/* Details Grid */}
                                    <div className="w-full bg-slate-50/80 rounded-2xl p-5 md:p-8 border border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-8">
                                        {[
                                            { label: t("cert_name"), value: certData.name, cls: "text-xl md:text-2xl font-black text-slate-900" },
                                            { label: t("cert_program"), value: certData.program, cls: "text-base md:text-xl font-black text-[#1e3a8a]" },
                                            { label: t("cert_date"), value: certData.date, cls: "text-base md:text-lg font-bold text-slate-800" },
                                            { label: t("cert_grade"), value: certData.grade, cls: "text-base md:text-lg font-black text-[#D4A853]" },
                                        ].map(({ label, value, cls }) => (
                                            <div key={label} className="space-y-1">
                                                <div className="text-slate-400 font-bold text-xs md:text-sm">{label}</div>
                                                <div className={cls}>{value}</div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Barcode */}
                                    <div className="opacity-30 flex flex-col items-center gap-1">
                                        <div className="h-8 md:h-10 w-40 md:w-48 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,#1e3a8a_2px,#1e3a8a_4px,transparent_4px,transparent_6px,#1e3a8a_6px,#1e3a8a_10px)]" />
                                        <div className="font-mono text-[10px] md:text-xs tracking-[0.3em] font-bold">ID-{searchQuery.trim()}</div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>

            <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes popIn { from { opacity: 0; transform: scale(0.88); } to { opacity: 1; transform: scale(1); } }
            `}</style>
        </main>
    );
}
