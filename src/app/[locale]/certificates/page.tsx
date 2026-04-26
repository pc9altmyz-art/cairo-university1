"use client";

import React, { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { use3dTilt } from "@/hooks/use-3d-tilt";
import confetti from "canvas-confetti";
import Image from "next/image";

// Mock Data for Demo
const MOCK_CERTIFICATES: Record<string, any> = {
    "123456789": {
        name: "أحمد محمد محمود",
        program: "إعداد مدربين (TOT)",
        date: "15 مايو 2025",
        grade: "امتياز"
    },
    "987654321": {
        name: "سارة عبد الرحمن",
        program: "دبلوم الصحة النفسية",
        date: "22 أكتوبر 2024",
        grade: "جيد جداً"
    }
};

export default function CertificatesPage() {
    const t = useTranslations("Certificates");
    const [searchQuery, setSearchQuery] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const [result, setResult] = useState<"none" | "success" | "error">("none");
    const [certData, setCertData] = useState<any>(null);

    const cardRef = useRef<HTMLDivElement>(null);
    // Use the 3D tilt hook for the certificate card
    use3dTilt(cardRef, { max: 15, perspective: 1000, scale: 1.02 });

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setIsVerifying(true);
        setResult("none");

        // Simulate network request
        setTimeout(() => {
            const data = MOCK_CERTIFICATES[searchQuery.trim()];
            if (data) {
                setCertData(data);
                setResult("success");
                triggerConfetti();
            } else {
                setCertData(null);
                setResult("error");
            }
            setIsVerifying(false);
        }, 1500);
    };

    const triggerConfetti = () => {
        const duration = 3 * 1000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ["#D4A853", "#1e3a8a", "#ffffff"]
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ["#D4A853", "#1e3a8a", "#ffffff"]
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };
        frame();
    };

    return (
        <main className="min-h-screen bg-slate-50 pt-32 pb-24 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-[#1e3a8a]/5 to-transparent pointer-events-none" />
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#D4A853]/10 blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                {/* ── HEADER SECTION ── */}
                <div className="max-w-3xl mx-auto text-center mb-16 space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-sm font-bold text-[#1e3a8a]">
                        <span className="w-2 h-2 rounded-full bg-[#D4A853] animate-pulse"></span>
                        {t("badge")}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                        {t("title1")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1e3a8a] to-[#D4A853]">{t("title_hl")}</span>
                    </h1>
                    <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium">
                        {t("subtitle")}
                    </p>
                </div>

                {/* ── SEARCH BOX ── */}
                <div className="max-w-2xl mx-auto mb-16">
                    <form onSubmit={handleVerify} className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#1e3a8a] to-[#D4A853] rounded-[2rem] blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
                        <div className="relative bg-white border border-slate-100 rounded-[2rem] p-2 flex flex-col md:flex-row gap-2 shadow-xl shadow-slate-200/50">
                            <div className="relative flex-1 flex items-center">
                                <svg className="absolute right-6 w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={t("search_ph")}
                                    className="w-full bg-transparent border-none focus:ring-0 text-lg py-4 pr-16 pl-6 text-slate-900 placeholder-slate-400 font-bold outline-none"
                                    dir="rtl"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isVerifying || !searchQuery.trim()}
                                className="min-h-[56px] px-8 bg-[#1e3a8a] text-white rounded-full font-black text-lg hover:bg-[#152e75] active:scale-95 transition-all shadow-md flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isVerifying ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        {t("searching")}
                                    </>
                                ) : (
                                    t("btn_search")
                                )}
                            </button>
                        </div>
                    </form>
                    <p className="text-center text-slate-400 text-sm mt-4 font-medium">جرب البحث برقم: 123456789</p>
                </div>

                {/* ── RESULT AREA ── */}
                <div className="max-w-4xl mx-auto min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {result === "error" && (
                            <motion.div
                                key="error"
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                className="bg-red-50 border border-red-100 rounded-3xl p-8 text-center"
                            >
                                <div className="w-20 h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-2">{t("not_found")}</h3>
                            </motion.div>
                        )}

                        {result === "success" && certData && (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -40, scale: 0.9 }}
                                transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
                                className="relative"
                            >
                                {/* Glow behind card */}
                                <div className="absolute -inset-4 bg-gradient-to-r from-[#D4A853] via-[#1e3a8a] to-[#D4A853] opacity-30 blur-2xl rounded-[3rem] animate-pulse"></div>
                                
                                {/* 3D Card Container */}
                                <div 
                                    ref={cardRef} 
                                    className="relative bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-100 overflow-hidden"
                                    style={{ transformStyle: 'preserve-3d' }}
                                >
                                    {/* Holographic Watermark */}
                                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center" style={{ transform: 'translateZ(-50px)' }}>
                                        <Image src="/icon.png" alt="Watermark" width={400} height={400} className="object-contain" />
                                    </div>

                                    {/* Inner Gold Border */}
                                    <div className="absolute inset-3 border-2 border-[#D4A853]/20 rounded-[2rem] pointer-events-none"></div>

                                    {/* Content */}
                                    <div className="relative z-10 flex flex-col items-center">
                                        
                                        {/* Header & Logos */}
                                        <div className="w-full flex justify-between items-start mb-10" style={{ transform: 'translateZ(30px)' }}>
                                            <div className="w-24 h-24 md:w-32 md:h-32 bg-slate-50 rounded-2xl p-2 border border-slate-100 shadow-sm flex items-center justify-center">
                                                <Image src="/icon.png" alt="Institution Logo" width={80} height={80} className="object-contain" />
                                            </div>
                                            <div className="text-center flex-1 px-4">
                                                <h4 className="text-xl md:text-3xl font-black text-[#1e3a8a] mb-2 leading-tight">المؤسسة المصرية<br/>للاستشارات العلمية والتربوية</h4>
                                                <p className="text-[#D4A853] font-bold text-sm md:text-base">Egyptian Institution for Scientific and Educational Consultations</p>
                                            </div>
                                            <div className="w-24 h-24 md:w-32 md:h-32 bg-slate-50 rounded-2xl p-2 border border-slate-100 shadow-sm flex items-center justify-center">
                                                {/* Placeholder for University Logo, using a generic graduation cap if no logo is available, but let's use a verified badge style here */}
                                                <div className="w-16 h-16 bg-[#1e3a8a]/5 text-[#1e3a8a] rounded-full flex items-center justify-center">
                                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Verified Badge */}
                                        <div className="mb-8" style={{ transform: 'translateZ(40px)' }}>
                                            <div className="inline-flex items-center gap-3 px-6 py-3 bg-green-50 border border-green-200 text-green-700 rounded-full shadow-sm">
                                                <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                                                <span className="font-black text-lg">{t("verified")}</span>
                                                <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                                            </div>
                                        </div>

                                        {/* Certificate Details */}
                                        <div className="w-full max-w-2xl bg-slate-50/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8" style={{ transform: 'translateZ(50px)' }}>
                                            
                                            <div className="space-y-1">
                                                <div className="text-slate-400 font-bold text-sm">{t("cert_name")}</div>
                                                <div className="text-2xl font-black text-slate-900">{certData.name}</div>
                                            </div>
                                            
                                            <div className="space-y-1">
                                                <div className="text-slate-400 font-bold text-sm">{t("cert_program")}</div>
                                                <div className="text-xl font-black text-[#1e3a8a]">{certData.program}</div>
                                            </div>
                                            
                                            <div className="space-y-1">
                                                <div className="text-slate-400 font-bold text-sm">{t("cert_date")}</div>
                                                <div className="text-lg font-bold text-slate-800">{certData.date}</div>
                                            </div>
                                            
                                            <div className="space-y-1">
                                                <div className="text-slate-400 font-bold text-sm">{t("cert_grade")}</div>
                                                <div className="text-lg font-black text-[#D4A853] inline-flex items-center gap-2">
                                                    {certData.grade}
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                                                </div>
                                            </div>

                                        </div>

                                        {/* Footer Barcode */}
                                        <div className="mt-8 opacity-40 flex flex-col items-center" style={{ transform: 'translateZ(20px)' }}>
                                            <div className="h-10 w-48 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,#1e3a8a_2px,#1e3a8a_4px,transparent_4px,transparent_6px,#1e3a8a_6px,#1e3a8a_10px)] mb-2"></div>
                                            <div className="font-mono text-xs tracking-[0.3em] font-bold">ID-{searchQuery.trim()}</div>
                                        </div>

                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </main>
    );
}
