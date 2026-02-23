"use client";

import { useState, useEffect, useCallback } from "react";
import type { Testimonial } from "@/components/testimonials";

const ADMIN_PASSWORD = "cairo2026";

/* ─── Star Display ─── */
function Stars({ rating }: { rating: number }) {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
                <span key={s} style={{ color: s <= rating ? "#F59E0B" : "#CBD5E1", fontSize: 14 }}>★</span>
            ))}
        </div>
    );
}

/* ─── Badge ─── */
function Badge({ label, color }: { label: string; color: "amber" | "green" | "red" }) {
    const map = {
        amber: { bg: "#FEF3C7", text: "#92400E" },
        green: { bg: "#DCFCE7", text: "#166534" },
        red: { bg: "#FEE2E2", text: "#991B1B" },
    };
    return (
        <span style={{ background: map[color].bg, color: map[color].text, padding: "3px 10px", borderRadius: 999, fontSize: 11, fontWeight: 700 }}>
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
        <div style={{
            background: "#fff",
            border: isPending ? "1.5px solid #FDE68A" : "1.5px solid #BBF7D0",
            borderRadius: 16,
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        }}>
            {/* Top row */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                        width: 40, height: 40, borderRadius: "50%",
                        background: "linear-gradient(135deg,#7C2D36,#c0505e)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#fff", fontWeight: 900, fontSize: 14, flexShrink: 0,
                    }}>
                        {t.name.trim().split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                        <div style={{ fontWeight: 900, color: "#0F172A", fontSize: 14 }}>{t.name}</div>
                        <div style={{ color: "#7C2D36", fontSize: 12, fontWeight: 700 }}>{t.role}</div>
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                    <Stars rating={t.rating} />
                    <Badge label={isPending ? "بانتظار الموافقة" : "منشور"} color={isPending ? "amber" : "green"} />
                </div>
            </div>

            {/* Content */}
            <p style={{
                color: "#475569", fontSize: 13, lineHeight: 1.7,
                background: "#F8FAFC", borderRadius: 10, padding: "12px 14px",
                border: "1px solid #E2E8F0", margin: 0,
            }}>
                &ldquo;{t.content}&rdquo;
            </p>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ color: "#94A3B8", fontSize: 11 }}>{t.date}</span>
                <div style={{ display: "flex", gap: 8 }}>
                    {isPending && onApprove && (
                        <button onClick={onApprove} style={{
                            background: "#22C55E", color: "#fff", border: "none",
                            padding: "7px 16px", borderRadius: 10, fontWeight: 900,
                            fontSize: 12, cursor: "pointer",
                        }}>✓ نشر</button>
                    )}
                    {onDelete && (
                        <button onClick={onDelete} style={{
                            background: "#FEE2E2", color: "#DC2626", border: "none",
                            padding: "7px 16px", borderRadius: 10, fontWeight: 900,
                            fontSize: 12, cursor: "pointer",
                        }}>✕ حذف</button>
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
    const [pending, setPending] = useState<Testimonial[]>([]);
    const [approved, setApproved] = useState<Testimonial[]>([]);
    const [tab, setTab] = useState<"pending" | "approved">("pending");
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
            setPending(data.filter((t) => !t.approved));
            setApproved(data.filter((t) => t.approved));
        } catch {
            showToast("تعذّر تحميل البيانات", "error");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (sessionStorage.getItem("cu_admin") === "1") {
            setAuthed(true);
            loadData();
        }
    }, [loadData]);

    function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            sessionStorage.setItem("cu_admin", "1");
            setAuthed(true);
            loadData();
        } else {
            setLoginError("❌ كلمة السر غير صحيحة");
            setTimeout(() => setLoginError(""), 2500);
        }
    }

    async function handleApprove(id: string) {
        await fetch("/api/testimonials", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "approve", id }),
        });
        await loadData();
        showToast("✅ تمت الموافقة ونُشر الرأي");
    }

    async function handleDelete(id: string) {
        await fetch("/api/testimonials", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "delete", id }),
        });
        await loadData();
        showToast("🗑️ تم الحذف");
    }

    /* ── Login ── */
    if (!authed) {
        return (
            <div style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg,#0F172A 0%,#1e293b 50%,#0F172A 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Segoe UI', sans-serif",
            }}>
                <div style={{
                    background: "#fff", borderRadius: 24, boxShadow: "0 25px 60px rgba(0,0,0,0.35)",
                    width: "100%", maxWidth: 380, padding: "44px 40px",
                }} dir="rtl">
                    {/* Logo area */}
                    <div style={{ textAlign: "center", marginBottom: 36 }}>
                        <div style={{
                            width: 72, height: 72, background: "linear-gradient(135deg,#7C2D36,#c0505e)",
                            borderRadius: 20, display: "flex", alignItems: "center",
                            justifyContent: "center", margin: "0 auto 16px", fontSize: 32,
                        }}>🔐</div>
                        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 900, color: "#0F172A" }}>لوحة المشرف</h1>
                        <p style={{ margin: "6px 0 0", color: "#94A3B8", fontSize: 13 }}>جامعة القاهرة للتدريب</p>
                    </div>

                    <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        <div>
                            <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 6 }}>
                                كلمة السر
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="أدخل كلمة السر"
                                autoFocus
                                style={{
                                    width: "100%", padding: "12px 14px", borderRadius: 12,
                                    border: loginError ? "2px solid #EF4444" : "1.5px solid #E2E8F0",
                                    fontSize: 14, outline: "none", boxSizing: "border-box",
                                    background: loginError ? "#FEF2F2" : "#fff",
                                    color: "#0F172A",
                                }}
                            />
                            {loginError && (
                                <p style={{ margin: "6px 0 0", color: "#EF4444", fontSize: 12, fontWeight: 700 }}>{loginError}</p>
                            )}
                        </div>

                        <button type="submit" style={{
                            background: "linear-gradient(135deg,#7C2D36,#c0505e)",
                            color: "#fff", border: "none", padding: "13px",
                            borderRadius: 12, fontWeight: 900, fontSize: 15,
                            cursor: "pointer", marginTop: 4,
                            boxShadow: "0 4px 20px rgba(124,45,54,0.4)",
                        }}>
                            دخول →
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    /* ── Dashboard ── */
    const activeList = tab === "pending" ? pending : approved;

    return (
        <div style={{ minHeight: "100vh", background: "#F1F5F9", fontFamily: "'Segoe UI', sans-serif" }} dir="rtl">

            {/* Toast */}
            {toast && (
                <div style={{
                    position: "fixed", top: 24, left: "50%", transform: "translateX(-50%)",
                    zIndex: 9999, background: toast.type === "success" ? "#0F172A" : "#DC2626",
                    color: "#fff", padding: "12px 24px", borderRadius: 16,
                    boxShadow: "0 8px 30px rgba(0,0,0,0.3)", fontWeight: 700, fontSize: 14,
                    whiteSpace: "nowrap",
                }}>{toast.msg}</div>
            )}

            {/* Sidebar */}
            <div style={{
                position: "fixed", top: 0, right: 0, bottom: 0, width: 240,
                background: "#0F172A",
                display: "flex", flexDirection: "column",
                padding: "32px 20px",
                zIndex: 100,
            }}>
                {/* Logo */}
                <div style={{ marginBottom: 40 }}>
                    <div style={{
                        width: 46, height: 46, borderRadius: 14,
                        background: "linear-gradient(135deg,#7C2D36,#c0505e)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 22, marginBottom: 10,
                    }}>🎓</div>
                    <div style={{ color: "#F1F5F9", fontWeight: 900, fontSize: 15 }}>لوحة التحكم</div>
                    <div style={{ color: "#64748B", fontSize: 11, marginTop: 2 }}>جامعة القاهرة</div>
                </div>

                {/* Nav */}
                <nav style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
                    {[
                        { key: "pending", icon: "⏳", label: "في الانتظار", count: pending.length },
                        { key: "approved", icon: "✅", label: "معتمدة", count: approved.length },
                    ].map((item) => (
                        <button
                            key={item.key}
                            onClick={() => setTab(item.key as "pending" | "approved")}
                            style={{
                                display: "flex", alignItems: "center", gap: 10,
                                padding: "11px 14px", borderRadius: 12, border: "none",
                                cursor: "pointer", textAlign: "right",
                                background: tab === item.key ? "rgba(124,45,54,0.25)" : "transparent",
                                color: tab === item.key ? "#FCA5A5" : "#94A3B8",
                                fontWeight: tab === item.key ? 900 : 600,
                                fontSize: 13, transition: "all 0.15s",
                            }}
                        >
                            <span>{item.icon}</span>
                            <span style={{ flex: 1 }}>{item.label}</span>
                            {item.count > 0 && (
                                <span style={{
                                    background: item.key === "pending" ? "#F59E0B" : "#22C55E",
                                    color: "#fff", borderRadius: 999, fontSize: 10,
                                    fontWeight: 900, padding: "1px 7px", minWidth: 20, textAlign: "center",
                                }}>{item.count}</span>
                            )}
                        </button>
                    ))}
                </nav>

                {/* Refresh */}
                <button
                    onClick={loadData}
                    disabled={loading}
                    style={{
                        display: "flex", alignItems: "center", gap: 8,
                        padding: "10px 14px", borderRadius: 12, border: "1px solid #1E293B",
                        cursor: loading ? "not-allowed" : "pointer",
                        background: "transparent", color: "#64748B",
                        fontSize: 12, fontWeight: 700, marginBottom: 10,
                    }}
                >
                    {loading ? "⏳ جارٍ التحميل..." : "🔄 تحديث"}
                </button>

                {/* Logout */}
                <button
                    onClick={() => { sessionStorage.removeItem("cu_admin"); setAuthed(false); }}
                    style={{
                        padding: "10px 14px", borderRadius: 12,
                        border: "1px solid rgba(239,68,68,0.3)",
                        cursor: "pointer", background: "rgba(239,68,68,0.08)",
                        color: "#F87171", fontSize: 12, fontWeight: 700,
                    }}
                >
                    🚪 تسجيل خروج
                </button>
            </div>

            {/* Main Content */}
            <div style={{ marginRight: 240, padding: "32px 32px 32px 32px" }}>

                {/* Header */}
                <div style={{ marginBottom: 28 }}>
                    <h1 style={{ margin: 0, fontSize: 26, fontWeight: 900, color: "#0F172A" }}>
                        {tab === "pending" ? "⏳ الآراء المعلّقة" : "✅ الآراء المعتمدة"}
                    </h1>
                    <p style={{ margin: "6px 0 0", color: "#64748B", fontSize: 14 }}>
                        {tab === "pending"
                            ? "راجع الآراء الجديدة وافقة على نشرها أو احذفها"
                            : "الآراء المنشورة على الموقع — يمكنك حذف أي رأي"}
                    </p>
                </div>

                {/* Stats row */}
                <div style={{ display: "flex", gap: 16, marginBottom: 28 }}>
                    {[
                        { label: "في الانتظار", value: pending.length, color: "#F59E0B", bg: "#FFFBEB" },
                        { label: "معتمدة", value: approved.length, color: "#22C55E", bg: "#F0FDF4" },
                        { label: "الإجمالي", value: pending.length + approved.length, color: "#6366F1", bg: "#EEF2FF" },
                    ].map((s) => (
                        <div key={s.label} style={{
                            background: s.bg, border: `1.5px solid ${s.color}20`,
                            borderRadius: 16, padding: "18px 22px", flex: 1,
                        }}>
                            <div style={{ fontSize: 28, fontWeight: 900, color: s.color }}>{s.value}</div>
                            <div style={{ color: "#64748B", fontSize: 13, fontWeight: 600 }}>{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* Cards */}
                {loading ? (
                    <div style={{ textAlign: "center", padding: "60px 0", color: "#94A3B8", fontSize: 16 }}>⏳ جارٍ التحميل...</div>
                ) : activeList.length === 0 ? (
                    <div style={{
                        background: "#fff", borderRadius: 20, padding: "64px 0",
                        textAlign: "center", border: "1.5px dashed #CBD5E1",
                    }}>
                        <div style={{ fontSize: 48, marginBottom: 12 }}>{tab === "pending" ? "🎉" : "💬"}</div>
                        <div style={{ color: "#64748B", fontWeight: 700, fontSize: 15 }}>
                            {tab === "pending" ? "لا توجد آراء في الانتظار" : "لا توجد آراء معتمدة بعد"}
                        </div>
                    </div>
                ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))", gap: 16 }}>
                        {activeList.map((t) => (
                            <TestimonialCard
                                key={t.id}
                                t={t}
                                isPending={tab === "pending"}
                                onApprove={tab === "pending" ? () => handleApprove(t.id) : undefined}
                                onDelete={() => handleDelete(t.id)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
