import { Metadata } from "next";
import Programs from "@/components/programs";
import AboutUniversity from "@/components/about-university";
import { Link } from "@/i18n/routing";

export const metadata: Metadata = {
    title: "البرامج التدريبية - عين شمس",
    description: "تصفح جميع البرامج التدريبية المتاحة في جامعة عين شمس",
};

export default function ProgramsPage() {
    return (
        <main className="pt-24 md:pt-32 pb-12">
            <div className="container mx-auto px-4 mb-8">
                <div className="flex justify-center md:justify-start">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-slate-500 hover:text-[#1e3a8a] transition-colors mb-6 group"
                        dir="rtl"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        العودة للرئيسية
                    </Link>
                </div>
            </div>
            <Programs />
            <AboutUniversity />
        </main>
    );
}
