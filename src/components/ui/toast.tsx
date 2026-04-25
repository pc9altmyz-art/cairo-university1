"use client";

import { useEffect, useState } from "react";

export type ToastType = "success" | "error" | "info" | "warning";

interface ToastProps {
    id: number;
    message: string;
    type: ToastType;
}

// Simple event emitter for global toasts
const TOAST_EVENT = "SHOW_TOAST";

export const toast = (message: string, type: ToastType = "info") => {
    if (typeof window !== "undefined") {
        const event = new CustomEvent(TOAST_EVENT, { detail: { message, type } });
        window.dispatchEvent(event);
    }
};

toast.success = (message: string) => toast(message, "success");
toast.error = (message: string) => toast(message, "error");
toast.warning = (message: string) => toast(message, "warning");
toast.info = (message: string) => toast(message, "info");

export function Toaster() {
    const [toasts, setToasts] = useState<ToastProps[]>([]);

    useEffect(() => {
        const handleToast = (e: Event) => {
            const customEvent = e as CustomEvent;
            const { message, type } = customEvent.detail;
            const id = Date.now();
            
            setToasts(prev => [...prev, { id, message, type }]);

            // Auto dismiss
            setTimeout(() => {
                setToasts(prev => prev.filter(t => t.id !== id));
            }, 5000);
        };

        window.addEventListener(TOAST_EVENT, handleToast);
        return () => window.removeEventListener(TOAST_EVENT, handleToast);
    }, []);

    const removeToast = (id: number) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    return (
        <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-3 pointer-events-none">
            {toasts.map((t) => (
                <div 
                    key={t.id} 
                    className="pointer-events-auto flex items-center gap-3 p-4 rounded-2xl shadow-2xl animate-slide-up bg-white dark:bg-[#1e293b] border border-slate-100 dark:border-white/10 min-w-[300px] rtl:text-right ltr:text-left"
                >
                    <div className="shrink-0">
                        {t.type === 'success' && (
                            <div className="w-10 h-10 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        )}
                        {t.type === 'error' && (
                            <div className="w-10 h-10 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                        )}
                        {t.type === 'info' && (
                            <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        )}
                        {t.type === 'warning' && (
                            <div className="w-10 h-10 rounded-full bg-yellow-500/10 text-yellow-500 flex items-center justify-center">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                        )}
                    </div>
                    
                    <p className="flex-1 font-bold text-slate-800 dark:text-white text-sm">
                        {t.message}
                    </p>

                    <button 
                        onClick={() => removeToast(t.id)}
                        className="shrink-0 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            ))}
        </div>
    );
}
