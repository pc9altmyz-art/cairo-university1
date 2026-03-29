"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

interface BlogSearchProps {
    onSearch: (query: string) => void;
}

export function BlogSearch({ onSearch }: BlogSearchProps) {
    const t = useTranslations('Blog');
    const [query, setQuery] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(query);
        }, 300);
        return () => clearTimeout(timer);
    }, [query, onSearch]);

    return (
        <div className="relative max-w-2xl mx-auto -mt-8 mb-12 px-4 z-40">
            <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a]/20 to-[#D4A853]/20 blur-xl rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative bg-white dark:bg-slate-900/90 backdrop-blur-2xl border border-slate-200/50 dark:border-white/10 rounded-[2rem] shadow-[0_8px_32px_rgba(30,58,138,0.08)] flex items-center p-2 group-focus-within:border-[#D4A853]/50 transition-all duration-300">
                    <div className="pl-6 pr-4 pointer-events-none">
                        <svg className="w-5 h-5 text-[#1e3a8a] dark:text-[#D4A853]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="ابحث عن مقال أو خبير..."
                        className="w-full bg-transparent border-none focus:ring-0 text-slate-800 dark:text-white font-bold py-4 placeholder:text-slate-400 dark:placeholder:text-slate-500 rtl:text-right"
                    />

                    {query && (
                        <button
                            onClick={() => setQuery("")}
                            className="p-2 mr-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-colors"
                        >
                            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
