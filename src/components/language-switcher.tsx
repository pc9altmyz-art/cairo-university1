"use client";

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';

export function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const toggleLocale = () => {
        const nextLocale = locale === 'ar' ? 'en' : 'ar';
        router.replace(pathname, { locale: nextLocale });
    };

    return (
        <button
            onClick={toggleLocale}
            className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-white/20 transition-all border border-transparent dark:border-white/10 shadow-sm flex items-center justify-center min-w-[3.5rem]"
            aria-label="Toggle Language"
        >
            {locale === 'ar' ? 'EN' : 'عربي'}
        </button>
    );
}
