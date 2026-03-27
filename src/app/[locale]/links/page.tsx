import { siteConfig } from "@/config/site";
import { getTranslations } from "next-intl/server";
import LinksClient from "./LinksClient";

// Server-side Metadata Generation
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const p = await params;
    const t = await getTranslations({ locale: p.locale, namespace: 'LinksPage' });
    return {
        title: `${t('title')} | ${siteConfig.name}`,
    };
}

export default function LinksPage() {
    return <LinksClient />;
}
