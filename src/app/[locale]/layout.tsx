import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "../globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scroll-to-top";
import FloatingContact from "@/components/floating-contact";
import { ThemeProvider } from "@/components/theme-provider";
import RamadanBanner from "@/components/ramadan-banner";


const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-plex",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap", // Performance: prevent font blocking
  preload: true,
});

export const metadata: Metadata = {
  title: "جامعة القاهرة - البرامج التدريبية",
  description: "برامج تدريبية معتمدة من جامعة القاهرة لتطوير المهارات المهنية والأكاديمية",
  keywords: ["جامعة القاهرة", "برامج تدريبية", "شهادات معتمدة", "تعليم", "تدريب مهني"],
  authors: [{ name: "Cairo University" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "جامعة القاهرة - البرامج التدريبية",
    description: "برامج تدريبية معتمدة من جامعة القاهرة",
    type: "website",
    locale: "ar_EG",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#7C2D36" },
    { media: "(prefers-color-scheme: dark)", color: "#3D1118" },
  ],
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  // Await params because Next.js 15+ has dynamic APIs
  const { locale } = await params;

  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  const messages = await getMessages();
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="https://wa.me" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${ibmPlexArabic.variable} font-sans antialiased bg-white dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 transition-colors duration-300`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <RamadanBanner />
            <Header />
            {children}
            <ScrollToTop />
            <FloatingContact />
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
