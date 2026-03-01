"use client";

import { useState, useEffect, useCallback } from "react";
import type { Testimonial } from "@/components/testimonials";
import { supabase } from "@/lib/supabase";

/* ─── Modern Icons (Heroicons based) ─── */
const Icons = {
    Logo: () => (
        <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
    ),
    Lock: () => (
        <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
    ),
    Pending: () => (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    Approved: () => (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    Refresh: ({ loading }: { loading?: boolean }) => (
        <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
    ),
    Logout: () => (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
    ),
    Check: () => (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
    ),
    Trash: () => (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
    )
};

/* ─── Star Display ─── */
function Stars({ rating }: { rating: number }) {
    return (
        <div className="flex gap-1" dir="ltr">
            {[1, 2, 3, 4, 5].map((s) => (
                <span key={s} className="text-sm transition-colors duration-300" style={{ color: s <= rating ? "#D4A853" : "#E2E8F0" }}>
                    ★
                </span>
            ))}
        </div>
    );
}

/* ─── Badge ─── */
function Badge({ label, color }: { label: string; color: "amber" | "green" | "red" }) {
    const map = {
        amber: "bg-amber-100/80 text-amber-800 border-amber-200",
        green: "bg-[#DCFCE7]/80 text-[#166534] border-[#BBF7D0]",
        red: "bg-red-100/80 text-red-800 border-red-200",
    };
    return (
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wide border backdrop-blur-sm ${map[color]} shadow-sm`}>
            {label}
        </span>
    );
}

/* ─── Testimonial Card ─── */
function TestimonialCard({
    t,
    onApprove,
    onDelete,
    isPending,
}: {
    t: Testimonial;
    onApprove?: () => void;
    onDelete?: () => void;
    isPending: boolean;
}) {
    return (
        <div className="group relative bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col gap-5 overflow-hidden">
            {/* Status gradient line at top */}
            <div className={`absolute top-0 left-0 right-0 h-1.5 ${isPending ? 'bg-gradient-to-r from-amber-400 to-amber-200' : 'bg-gradient-to-r from-emerald-400 to-emerald-200'}`} />

            {/* Top row */}
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#3D1118] to-[#7C2D36] flex items-center justify-center text-white font-black text-sm flex-shrink-0 shadow-lg shadow-[#7C2D36]/20">
                        {t.name.trim().split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                        <div className="font-bold text-slate-900 text-[15px]">{t.name}</div>
                        <div className="text-[#7C2D36] text-xs font-bold opacity-80">{t.role}</div>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                    <Stars rating={t.rating} />
                    <Badge label={isPending ? "بانتظار الموافقة" : "منشور وموثق"} color={isPending ? "amber" : "green"} />
                </div>
            </div>

            {/* Content */}
            <p className="text-slate-600 text-[13.5px] leading-relaxed bg-slate-50/50 rounded-2xl p-4 border border-slate-100/50 m-0 italic">
                &quot;{t.content}&quot;
            </p>

            {/* Footer Actions */}
            <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-100">
                <span className="text-slate-400 text-[11px] font-medium tracking-wide">
                    {new Date(t.date || t.created_at || Date.now()).toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric' })}
                </span>
                <div className="flex gap-2">
                    {isPending && onApprove && (
                        <button onClick={onApprove} className="flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-500 text-emerald-600 hover:text-white border border-emerald-100 hover:border-emerald-500 px-3 py-1.5 rounded-xl font-bold text-xs transition-all shadow-sm">
                            <Icons.Check /> نشر الرأي
                        </button>
                    )}
                    {onDelete && (
                        <button onClick={onDelete} className="flex items-center gap-1.5 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white border border-red-100 hover:border-red-500 px-3 py-1.5 rounded-xl font-bold text-xs transition-all shadow-sm">
                            <Icons.Trash /> إزالة
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

/* ══════════════ MAIN PAGE ══════════════ */
export default function AdminPage() {
    const [authed, setAuthed] = useState(false);
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [loginLoading, setLoginLoading] = useState(false);

    const [pending, setPending] = useState<Testimonial[]>([]);
    const [approved, setApproved] = useState<Testimonial[]>([]);
    const [tab, setTab] = useState<"pending" | "approved">("pending");
    const [searchQuery, setSearchQuery] = useState("");

    const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
    const [loading, setLoading] = useState(false);

    const showToast = (msg: string, type: "success" | "error" = "success") => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/testimonials");
            const data: Testimonial[] = await res.json();
            setPending(data.filter((t: any) => !t.approved));
            setApproved(data.filter((t: any) => t.approved));
        } catch {
            showToast("تعذّر الاتصال بقاعدة البيانات", "error");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (sessionStorage.getItem("cu_admin_token") === "authenticated") {
            setAuthed(true);
            loadData();
        }
    }, [loadData]);

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setLoginLoading(true);
        // Simulate network delay for premium feel
        await new Promise(r => setTimeout(r, 600));

        // In a real app, this would check against the server or Supabase auth
        // For this demo, we check against the hardcoded value or env variable if exposed
        const adminPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "cairo2026";

        if (password === adminPass || password === "cairo2026") {
            sessionStorage.setItem("cu_admin_token", "authenticated");
            setAuthed(true);
            loadData();
        } else {
            setLoginError("بيانات الاعتماد غير صالحة");
            setTimeout(() => setLoginError(""), 3000);
        }
        setLoginLoading(false);
    }

    async function handleApprove(id: string) {
        try {
            const res = await fetch("/api/testimonials", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "approve", id }),
            });
            if (!res.ok) throw new Error("Failed");

            // Optimistic UI update
            const item = pending.find(t => t.id === id);
            if (item) {
                setPending(prev => prev.filter(t => t.id !== id));
                setApproved(prev => [{ ...item, approved: true }, ...prev]);
            }
            showToast("تم اعتماد الرأي ونشره بنجاح");
        } catch {
            showToast("حدث خطأ أثناء الاعتماد", "error");
            loadData(); // Revert on error
        }
    }

    async function handleDelete(id: string) {
        if (!window.confirm("هل أنت متأكد من حذف هذا الرأي بشكل نهائي؟")) return;

        try {
            const res = await fetch("/api/testimonials", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "delete", id }),
            });
            if (!res.ok) throw new Error("Failed");

            // Optimistic UI update
            setPending(prev => prev.filter(t => t.id !== id));
            setApproved(prev => prev.filter(t => t.id !== id));
            showToast("تم حذف الرأي بنجاح");
        } catch {
            showToast("حدث خطأ أثناء الحذف", "error");
            loadData(); // Revert on error
        }
    }

    /* ── Login Screen ── */
    if (!authed) {
        return (
            <div className="min-h-screen relative flex items-center justify-center font-sans overflow-hidden" dir="rtl">
                {/* Premium Background */}
                <div className="absolute inset-0 bg-slate-900">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#3D1118]/80 to-[#1e293b] opacity-90" />
                    {/* Animated glowing orbs */}
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7C2D36] rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D4A853] rounded-full mix-blend-multiply filter blur-[128px] opacity-20" />
                </div>

                <div className="relative z-10 w-full max-w-md px-6">
                    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2rem] p-10 shadow-2xl">
                        <div className="text-center mb-10">
                            <div className="w-20 h-20 bg-gradient-to-br from-[#D4A853] to-[#b38634] rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#D4A853]/20 border border-white/20">
                                <Icons.Lock />
                            </div>
                            <h1 className="text-3xl font-black text-white mb-2 tracking-tight">بوابة الإدارة</h1>
                            <p className="text-white/60 text-sm font-medium">مركز التحكم الموحد لجامعة القاهرة</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <label className="block text-white/80 text-[13px] font-bold mb-2">رمز الوصول السري</label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className={`w-full bg-black/20 border ${loginError ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#D4A853]'} text-white rounded-2xl px-5 py-4 outline-none transition-all placeholder:text-white/20 font-mono tracking-widest text-center`}
                                        required
                                    />
                                    {loginError && (
                                        <div className="absolute -bottom-6 left-0 right-0 text-center text-red-400 text-xs font-bold animate-pulse">
                                            {loginError}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loginLoading || !password}
                                className="w-full bg-gradient-to-r from-[#D4A853] to-[#b38634] hover:from-[#e3b865] hover:to-[#c49642] text-white rounded-2xl py-4 font-black flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#D4A853]/20"
                            >
                                {loginLoading ? (
                                    <Icons.Refresh loading={true} />
                                ) : (
                                    <>تسجيل الدخول <span dir="ltr">&rarr;</span></>
                                )}
                            </button>
                        </form>
                    </div>

                    <div className="mt-8 text-center text-white/40 text-xs">
                        &copy; {new Date().getFullYear()} القاهرة للتدريب. نظام إداري مشفر.
                    </div>
                </div>
            </div>
        );
    }

    /* ── Dashboard Layout ── */
    const rawList = tab === "pending" ? pending : approved;
    const activeList = rawList.filter(t =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-50 font-sans flex text-slate-900 selection:bg-[#7C2D36] selection:text-white" dir="rtl">

            {/* Toast Notification */}
            {toast && (
                <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 ${toast.type === 'success' ? 'bg-slate-900 border-emerald-500/30' : 'bg-red-600 border-red-400'} border text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-4 fade-in duration-300`}>
                    <div className={`w-2 h-2 rounded-full ${toast.type === 'success' ? 'bg-emerald-400' : 'bg-white'} animate-pulse`} />
                    <span className="font-bold text-sm">{toast.msg}</span>
                </div>
            )}

            {/* Sticky Sidebar */}
            <aside className="w-[280px] bg-[#0F172A] border-l border-white/5 flex flex-col fixed inset-y-0 right-0 z-40">
                {/* Brand Logo */}
                <div className="p-8">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#D4A853] to-[#b38634] rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-[#D4A853]/20">
                        <Icons.Logo />
                    </div>
                    <h2 className="text-white font-black text-xl">لوحة الإدارة</h2>
                    <p className="text-[#D4A853] text-[11px] font-bold tracking-wider mt-1 opacity-80 uppercase">Cairo Admin V2.0</p>
                </div>

                {/* Primary Navigation */}
                <div className="px-4 flex-1">
                    <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-3 px-4">إدارة المحتوى</div>
                    <nav className="flex flex-col gap-1.5">
                        <button
                            onClick={() => setTab("pending")}
                            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-[13px] transition-all relative overflow-hidden group ${tab === "pending" ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/5 hover:text-slate-300"}`}
                        >
                            {tab === "pending" && <div className="absolute right-0 inset-y-2 w-1 bg-[#D4A853] rounded-l-full" />}
                            <div className={`${tab === "pending" ? "text-[#D4A853]" : "group-hover:text-white transition-colors"}`}><Icons.Pending /></div>
                            <span>المراجعة المعلقة</span>
                            {pending.length > 0 && (
                                <span className={`mr-auto px-2 py-0.5 rounded-full text-[10px] ${tab === "pending" ? "bg-[#D4A853] text-slate-900" : "bg-slate-800 text-slate-300"}`}>{pending.length}</span>
                            )}
                        </button>

                        <button
                            onClick={() => setTab("approved")}
                            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-[13px] transition-all relative overflow-hidden group ${tab === "approved" ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/5 hover:text-slate-300"}`}
                        >
                            {tab === "approved" && <div className="absolute right-0 inset-y-2 w-1 bg-[#D4A853] rounded-l-full" />}
                            <div className={`${tab === "approved" ? "text-emerald-400" : "group-hover:text-white transition-colors"}`}><Icons.Approved /></div>
                            <span>الآراء المنشورة</span>
                        </button>
                    </nav>
                </div>

                {/* Bottom Actions */}
                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={loadData}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 font-bold text-xs transition-all mb-2 disabled:opacity-50"
                    >
                        <Icons.Refresh loading={loading} /> {loading ? "جارِ التحديث..." : "تحديث البيانات"}
                    </button>
                    <button
                        onClick={() => { sessionStorage.removeItem("cu_admin_token"); setAuthed(false); }}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white font-bold text-xs transition-all"
                    >
                        <Icons.Logout /> تسجيل الخروج الإمن
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 mr-[280px]">
                {/* Header Area */}
                <div className="sticky top-0 z-30 bg-slate-50/80 backdrop-blur-xl border-b border-slate-200/50 px-10 py-6">
                    <div className="max-w-6xl mx-auto flex items-end justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                                {tab === "pending" ? "المراجعة والتدقيق" : "سجل المنشورات"}
                            </h1>
                            <p className="text-slate-500 text-sm mt-1.5 font-medium">
                                {tab === "pending"
                                    ? "راجع آراء المتدربين الجديدة بعناية قبل الموافقة على نشرها للعامة."
                                    : "إدارة والتحكم في تعليقات وآراء المتدربين المعروضة حالياً على الموقع."}
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div className="relative w-72">
                            <input
                                type="text"
                                placeholder="ابحث في الآراء..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white border border-slate-200 focus:border-[#7C2D36] focus:ring-4 focus:ring-[#7C2D36]/10 rounded-2xl pl-4 pr-11 py-3 text-sm outline-none transition-all shadow-sm"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-10 max-w-6xl mx-auto">
                    {/* Stats Dashboard */}
                    <div className="grid grid-cols-3 gap-6 mb-10">
                        <div className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
                            <div>
                                <div className="text-slate-400 text-xs font-bold mb-1 uppercase tracking-wider">قيد الانتظار</div>
                                <div className="text-3xl font-black text-[#D4A853]">{pending.length}</div>
                            </div>
                            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Icons.Pending />
                            </div>
                        </div>
                        <div className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
                            <div>
                                <div className="text-slate-400 text-xs font-bold mb-1 uppercase tracking-wider">تم النشر</div>
                                <div className="text-3xl font-black text-emerald-500">{approved.length}</div>
                            </div>
                            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Icons.Approved />
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-[#0F172A] to-[#1e293b] rounded-[2rem] p-6 shadow-lg flex items-center justify-between text-white relative overflow-hidden transition-all">
                            <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-white/5 to-transparent" />
                            <div className="relative z-10">
                                <div className="text-slate-400 text-xs font-bold mb-1 uppercase tracking-wider">إجمالي السجلات</div>
                                <div className="text-3xl font-black">{pending.length + approved.length}</div>
                            </div>
                            <div className="relative z-10 w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Testimonials Grid */}
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-64 bg-white/50 border border-slate-200 border-dashed rounded-[3rem]">
                            <div className="w-10 h-10 border-4 border-[#7C2D36]/20 border-t-[#7C2D36] rounded-full animate-spin mb-4" />
                            <div className="text-slate-500 font-bold text-sm">جاري مزامنة البيانات...</div>
                        </div>
                    ) : activeList.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-80 bg-white border border-slate-200 border-dashed rounded-[3rem] text-center px-6">
                            <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-[2rem] flex items-center justify-center mb-6 shadow-sm">
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-black text-slate-800 mb-2">لا يوجد سجلات مطابقة</h3>
                            <p className="text-slate-500 text-sm max-w-sm">
                                {searchQuery
                                    ? "لم نتمكن من العثور على أي آراء تطابق بحثك الحالي. جرب كلمات مفتاحية أخرى."
                                    : tab === "pending"
                                        ? "لا توجد آراء جديدة في الانتظار. سيتم عرض المراجعات هنا فور إرسالها."
                                        : "لم يتم اعتماد أي آراء حتى الآن. وافق على المراجعات المعلقة لتظهر في الموقع."}
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {activeList.map((t) => (
                                <TestimonialCard
                                    key={t.id}
                                    t={t}
                                    isPending={tab === "pending"}
                                    onApprove={tab === "pending" ? () => handleApprove(t.id!) : undefined}
                                    onDelete={() => handleDelete(t.id!)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

