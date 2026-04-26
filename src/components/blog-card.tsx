"use client";

import { useTranslations, useFormatter } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { TiltCard } from "@/components/ui/tilt-card";
import type { BlogPost } from "@/data/blog";

interface BlogCardProps {
    post: BlogPost;
    priority?: boolean;
}

export function BlogCard({ post, priority = false }: BlogCardProps) {
    const t = useTranslations('Blog');
    const tp = useTranslations('BlogData');
    const format = useFormatter();

    return (
        <TiltCard>
            <Link href={`/blog/${post.id}`} className="block group h-full">
                <div className="relative h-64 overflow-hidden rounded-[2.5rem]">
                    <Image
                        src={post.image}
                        alt={tp(`${post.id}.title`)}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-1000"
                        priority={priority}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] to-transparent opacity-60" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-6 rtl:right-6 ltr:left-6">
                        <span className="bg-[#D4A853] text-[#0F172A] text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-2xl shadow-xl">
                            {t(`filter_${post.category}`)}
                        </span>
                    </div>
                </div>

                <div className="p-8 flex flex-col h-[calc(100%-16rem)]">
                    <div className="flex items-center gap-4 mb-4 text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-wider">
                        <span className="flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {format.dateTime(new Date(post.date), {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                        <span className="flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {post.readTime} {t('stat_time')}
                        </span>
                    </div>

                    <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-[#D4A853] transition-colors line-clamp-2 leading-snug">
                        {tp(`${post.id}.title`)}
                    </h3>
                    
                    <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                        {tp(`${post.id}.excerpt`)}
                    </p>

                    <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-white/10">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                {(post as any).views || 0}
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                {(post as any).likes || 0}
                            </div>
                        </div>
                        
                        <div className="text-[#1e3a8a] dark:text-[#D4A853] text-xs font-black flex items-center gap-2 group-hover:gap-3 transition-all">
                            {t('btn_read_more')}
                            <svg className="w-4 h-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </div>
                </div>
            </Link>
        </TiltCard>
    );
}
