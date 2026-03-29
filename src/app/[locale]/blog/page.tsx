"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect, useRef, useCallback } from "react";
import { BlogHero } from "@/components/blog-hero";
import { BlogCard } from "@/components/blog-card";
import { getAllPosts, getPostsByCategory, BlogPost } from "@/data/blog";
import { BlogSearch } from "@/components/blog-search";
import { gsap } from "gsap";

export default function BlogPage() {
    const t = useTranslations('Blog');
    const tp = useTranslations('BlogData');
    const [activeCategory, setActiveCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(getAllPosts());
    const gridRef = useRef<HTMLDivElement>(null);

    const categories = ["all", "news", "article", "tips", "success"];

    const filterPosts = useCallback(() => {
        let results = getPostsByCategory(activeCategory);
        
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            results = results.filter(post => {
                const title = tp(`${post.id}.title`).toLowerCase();
                const excerpt = tp(`${post.id}.excerpt`).toLowerCase();
                const author = post.author.toLowerCase();
                return title.includes(query) || excerpt.includes(query) || author.includes(query);
            });
        }
        
        setFilteredPosts(results);
    }, [activeCategory, searchQuery, tp]);

    useEffect(() => {
        filterPosts();
    }, [filterPosts]);

    useEffect(() => {
        // Animate grid when category or search changes
        if (gridRef.current) {
            gsap.fromTo(gridRef.current.children,
                { opacity: 0, scale: 0.95, y: 20 },
                { 
                    opacity: 1, 
                    scale: 1, 
                    y: 0, 
                    duration: 0.5, 
                    stagger: 0.1, 
                    ease: "power2.out",
                    overwrite: "auto"
                }
            );
        }
    }, [activeCategory, searchQuery]);

    const handleCategoryChange = (cat: string) => {
        setActiveCategory(cat);
    };

    return (
        <main className="min-h-screen bg-white dark:bg-[#0F172A]">
            <BlogHero />
            
            <BlogSearch onSearch={setSearchQuery} />

            <section className="py-8 bg-white dark:bg-[#0F172A] border-y border-slate-100 dark:border-white/5 sticky top-[80px] z-40 backdrop-blur-xl bg-white/80 dark:bg-[#0F172A]/80 transition-colors">
                <div className="container mx-auto px-4 overflow-x-auto no-scrollbar">
                    <div className="flex items-center justify-center gap-3 min-w-max pb-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryChange(cat)}
                                className={`px-8 py-3.5 rounded-2xl text-sm font-black transition-all duration-300 border focus:outline-none focus:ring-2 focus:ring-[#D4A853]/50 ${
                                    activeCategory === cat
                                        ? "bg-[#1e3a8a] text-white border-[#1e3a8a] shadow-xl shadow-[#1e3a8a]/20 scale-105"
                                        : "bg-white dark:bg-white/5 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:border-[#D4A853] hover:text-[#D4A853] hover:bg-slate-50 dark:hover:bg-white/10 active:scale-95 translate-y-0"
                                }`}
                            >
                                {t(`filter_${cat}`)}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white dark:bg-[#0F172A]">
                <div className="container mx-auto px-4">
                    {filteredPosts.length > 0 ? (
                        <div 
                            ref={gridRef}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16"
                        >
                            {filteredPosts.map((post) => (
                                <BlogCard key={post.id} post={post} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-40 bg-slate-50 dark:bg-white/[0.02] rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-white/10">
                            <div className="w-20 h-20 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2zM14 2v4h4" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">قريباً محتوى جديد</h3>
                            <p className="text-slate-500">نعمل حالياً على إعداد مقالات مميزة لهذا القسم.</p>
                        </div>
                    )}
                </div>
            </section>
            
            {/* Ambient decorations */}
            <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-[#D4A853]/5 blur-[120px] rounded-full pointer-events-none -z-10" />
            <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-[#1e3a8a]/5 blur-[150px] rounded-full pointer-events-none -z-10" />
        </main>
    );
}
