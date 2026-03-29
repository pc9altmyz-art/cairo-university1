"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

interface ShareButtonsProps {
    title: string;
    description: string;
    url: string;
}

export default function ShareButtons({ title, description, url }: ShareButtonsProps) {
    const t = useTranslations('ProgramDetail');
    const [copied, setCopied] = useState(false);

    const shareData = {
        title: title,
        text: description,
        url: url,
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.error("Error sharing:", err);
            }
        } else {
            handleCopy();
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const socialPlatforms = [
        {
            name: "Facebook",
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
            ),
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            color: "hover:text-[#1877F2]",
        },
        {
            name: "WhatsApp",
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            ),
            href: `https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}`,
            color: "hover:text-[#25D366]",
        },
    ];

    return (
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-white/10">
            <h4 className="text-[10px] uppercase font-black tracking-[0.2em] text-[#D4A853] mb-6">
                {t('share_title')}
            </h4>
            <div className="flex flex-wrap gap-4">
                {socialPlatforms.map((platform) => (
                    <a
                        key={platform.name}
                        href={platform.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl flex items-center justify-center text-slate-400 dark:text-white/40 transition-all duration-300 ${platform.color} hover:bg-slate-50 dark:hover:bg-white/10 hover:-translate-y-1 shadow-sm hover:shadow-xl`}
                        aria-label={`Share on ${platform.name}`}
                    >
                        {platform.icon}
                    </a>
                ))}
                
                <button
                    onClick={handleNativeShare}
                    className="flex-1 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl flex items-center justify-center gap-3 text-slate-500 dark:text-white/40 hover:text-[#1e3a8a] dark:hover:text-[#D4A853] hover:bg-slate-50 dark:hover:bg-white/10 transition-all h-12 px-6 group shadow-sm hover:shadow-xl"
                >
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    <span className="text-[11px] font-black uppercase tracking-widest whitespace-nowrap">
                        {copied ? t('copied') : t('share_btn')}
                    </span>
                </button>
            </div>
        </div>
    );
}
