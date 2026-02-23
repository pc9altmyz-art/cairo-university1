"use client";

import { useState, useEffect } from "react";
import type { Testimonial } from "@/components/testimonials";

const ADMIN_PASSWORD = "cairo2026";

function StarDisplay({ rating }: { rating: number }) {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
                <span key={s} className={s <= rating ? "text-[#D4A853]" : "text-slate-200"}>★</span>
            ))}
        </div>
    );
}

export default function AdminPage() {
    const [authed, setAuthed] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [pending, setPending] = useState<Testimonial[]>([]);
    const [approved, setApproved] = useState<Testimonial[]>([]);
    const [tab, setTab] = useState<"pending" | "approved">("pending");
    const [toast, setToast] = useState("");

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(""), 3000);
    };

    const loadData = async () => {
        const res = await fetch("/api/testimonials");
        const data: Testimonial[] = await res.json();
        setPending(data.filter((t) => !t.approved));
        setApproved(data.filter((t) => t.approved));
    };

    useEffect(() => {
        const loggedIn = sessionStorage.getItem("cu_admin") === "1";
        if (loggedIn) { setAuthed(true); loadData(); }
    }, []);

    function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            sessionStorage.setItem("cu_admin", "1");
            setAuthed(true);
            loadData();
        } else {
            setError("كلمة السر غير صحيحة");
        }
    }

    async function handleApprove(id: string) {
        await fetch("/api/testimonials", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "approve", id }),
        });
        await loadData();
        showToast("✅ تمت الموافقة على الرأي");
    }

    async function handleReject(id: string) {
        await fetch("/api/testimonials", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "delete", id }),
        });
        await loadData();
        showToast("🗑️ تم حذف الرأي");
    }

    async function handleRemoveApproved(id: string) {
        await fetch("/api/testimonials", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "delete", id }),
        });
        await loadData();
        showToast("🗑️ تم حذف الرأي المعتمد");
    }

    function handleLogout() {
        sessionStorage.removeItem("cu_admin");
        setAuthed(false);
        setPassword("");
    }

    // ── Login Screen ──
    if (!authed) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1e293b] to-[#0F172A] flex items-center justify-center p-4" dir="rtl">
                <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-[#7C2D36]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">🔐</span>
                        </div>
                        <h1 className="text-2xl font-black text-slate-900">لوحة التحكم</h1>
                        <p className="text-slate-500 text-sm mt-1">إدارة آراء الطلاب</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5">كلمة السر</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                                placeholder="أدخل كلمة السر"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#7C2D36] focus:ring-2 focus:ring-[#7C2D36]/10 transition-all"
                                autoFocus
                            />
                            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#7C2D36] text-white py-3 rounded-xl font-black hover:bg-[#5C1F27] transition-all shadow-lg"
                        >
                            دخول
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // ── Dashboard ──
    return (
        <div className="min-h-screen bg-slate-50" dir="rtl">
            {/* Toast */}
            {toast && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl font-bold text-sm animate-fade-in">
                    {toast}
                </div>
            )}

            {/* Header */}
            <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-black text-slate-900">لوحة إدارة الآراء</h1>
                    <p className="text-xs text-slate-500">جامعة القاهرة للتدريب</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="text-sm text-slate-500 hover:text-red-500 font-bold transition-colors px-4 py-2 rounded-lg hover:bg-red-50"
                >
                    تسجيل خروج
                </button>
            </header>

            <main className="max-w-4xl mx-auto p-6">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                        <div className="text-3xl font-black text-amber-500 mb-1">{pending.length}</div>
                        <div className="text-slate-500 text-sm font-medium">في انتظار الموافقة</div>
                    </div>
                    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                        <div className="text-3xl font-black text-green-500 mb-1">{approved.length}</div>
                        <div className="text-slate-500 text-sm font-medium">آراء معتمدة</div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm w-fit">
                    <button
                        onClick={() => setTab("pending")}
                        className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${tab === "pending" ? "bg-amber-500 text-white shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                    >
                        معلّقة {pending.length > 0 && <span className="mr-1 bg-white/30 text-xs px-1.5 py-0.5 rounded-full">{pending.length}</span>}
                    </button>
                    <button
                        onClick={() => setTab("approved")}
                        className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${tab === "approved" ? "bg-green-500 text-white shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                    >
                        معتمدة
                    </button>
                </div>

                {/* Pending Tab */}
                {tab === "pending" && (
                    <div className="space-y-4">
                        {pending.length === 0 ? (
                            <div className="bg-white rounded-2xl p-12 text-center border border-slate-100">
                                <div className="text-5xl mb-4">🎉</div>
                                <div className="text-slate-500 font-bold">لا توجد آراء في الانتظار</div>
                            </div>
                        ) : pending.map((t) => (
                            <div key={t.id} className="bg-white rounded-2xl p-6 border border-amber-200 shadow-sm">
                                <div className="flex items-start justify-between gap-4 mb-3">
                                    <div>
                                        <div className="font-black text-slate-900 text-base">{t.name}</div>
                                        <div className="text-[#7C2D36] text-sm font-semibold">{t.role}</div>
                                        <div className="text-slate-400 text-xs mt-0.5">{t.date}</div>
                                    </div>
                                    <StarDisplay rating={t.rating} />
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed mb-5 bg-slate-50 rounded-xl p-4 border border-slate-100">
                                    &ldquo;{t.content}&rdquo;
                                </p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleApprove(t.id)}
                                        className="flex-1 bg-green-500 text-white py-2.5 rounded-xl font-black text-sm hover:bg-green-600 transition-all flex items-center justify-center gap-2"
                                    >
                                        ✓ موافقة ونشر
                                    </button>
                                    <button
                                        onClick={() => handleReject(t.id)}
                                        className="flex-1 bg-red-50 text-red-500 py-2.5 rounded-xl font-black text-sm hover:bg-red-100 transition-all flex items-center justify-center gap-2 border border-red-100"
                                    >
                                        ✕ رفض وحذف
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Approved Tab */}
                {tab === "approved" && (
                    <div className="space-y-4">
                        {approved.length === 0 ? (
                            <div className="bg-white rounded-2xl p-12 text-center border border-slate-100">
                                <div className="text-5xl mb-4">💬</div>
                                <div className="text-slate-500 font-bold">لا توجد آراء معتمدة من المستخدمين بعد</div>
                            </div>
                        ) : approved.map((t) => (
                            <div key={t.id} className="bg-white rounded-2xl p-6 border border-green-200 shadow-sm">
                                <div className="flex items-start justify-between gap-4 mb-3">
                                    <div>
                                        <div className="font-black text-slate-900 text-base">{t.name}</div>
                                        <div className="text-[#7C2D36] text-sm font-semibold">{t.role}</div>
                                        <div className="text-slate-400 text-xs mt-0.5">{t.date}</div>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <StarDisplay rating={t.rating} />
                                        <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-bold">منشور</span>
                                    </div>
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed mb-4 bg-slate-50 rounded-xl p-4 border border-slate-100">
                                    &ldquo;{t.content}&rdquo;
                                </p>
                                <button
                                    onClick={() => handleRemoveApproved(t.id)}
                                    className="text-red-400 hover:text-red-600 text-xs font-bold transition-colors flex items-center gap-1"
                                >
                                    🗑️ حذف من الموقع
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
