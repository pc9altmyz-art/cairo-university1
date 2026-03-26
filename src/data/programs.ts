export interface Program {
    id: string;
    image: string;
    category: string;
    isNew?: boolean;
    isFeatured?: boolean;
    status?: "started" | "closed" | "upcoming";
}

export interface Category {
    id: string;
    name: string;
    description: string;
    icon: string;
}

export const categories: Category[] = [
    {
        id: "teacher_prep",
        name: "إعداد المعلمين",
        description: "برامج لتأهيل المعلمين وتطوير مهاراتهم التربوية",
        icon: "👨‍🏫",
    },
    {
        id: "psychology",
        name: "علم النفس",
        description: "برامج متخصصة في علم النفس والإرشاد الأسري",
        icon: "🧠",
    },
    {
        id: "special_ed",
        name: "التربية الخاصة",
        description: "برامج لتأهيل الأخصائيين في التربية الخاصة",
        icon: "🧩",
    },
];

export const programs: Program[] = [
    // --- 1. Psychology ---
    { id: "psych-comprehensive", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800", category: "psychology", isFeatured: true },
    { id: "psych-family", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800", category: "psychology" },
    { id: "psych-behavior", image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=800", category: "psychology" },
    { id: "psych-disorders", image: "https://images.unsplash.com/photo-1527137342181-19aab11a8ee1?auto=format&fit=crop&q=80&w=800", category: "psychology" },
    { id: "psych-cbt", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800", category: "psychology", isNew: true },
    { id: "psych-lifecoach", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800", category: "psychology" },
    { id: "psych-measure", image: "https://images.unsplash.com/photo-1454165833767-027ffea9e77b?auto=format&fit=crop&q=80&w=800", category: "psychology", status: "started" },
    { id: "psych-positive", image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800", category: "psychology" },
    { id: "psych-arts", image: "https://images.unsplash.com/photo-1460518451285-cd7ba795d053?auto=format&fit=crop&q=80&w=800", category: "psychology", isNew: true },
    { id: "psych-child-disorders", image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?auto=format&fit=crop&q=80&w=800", category: "psychology" },
    { id: "psych-family-2", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800", category: "psychology" },
    { id: "psych-child-health", image: "https://images.unsplash.com/photo-1503919919749-646ddc4f4a62?auto=format&fit=crop&q=80&w=800", category: "psychology" },
    { id: "psych-tot", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800", category: "psychology" },

    // --- 2. Teacher Prep ---
    { id: "tp-kg", image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=800", category: "teacher_prep", isFeatured: true },
    { id: "tp-montessori", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800", category: "teacher_prep" },
    { id: "tp-jollyphonics", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800", category: "teacher_prep" },
    { id: "tp-digital", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800", category: "teacher_prep" },
    { id: "tp-behavior", image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800", category: "teacher_prep" },
    { id: "tp-learning-dis", image: "https://images.unsplash.com/photo-1460518451285-cd7ba795d053?auto=format&fit=crop&q=80&w=800", category: "teacher_prep" },
    { id: "tp-child-health", image: "https://images.unsplash.com/photo-1503919919749-646ddc4f4a62?auto=format&fit=crop&q=80&w=800", category: "teacher_prep" },
    { id: "tp-arabic", image: "https://images.unsplash.com/photo-1571171637578-41bc2dd4dcd2?auto=format&fit=crop&q=80&w=800", category: "teacher_prep", isNew: true },

    // --- 3. Special Education ---
    { id: "sped-comp", image: "https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?auto=format&fit=crop&q=80&w=800", category: "special_ed", isFeatured: true },
    { id: "sped-speech", image: "https://images.unsplash.com/photo-1543269664-56d93c1b41a6?auto=format&fit=crop&q=80&w=800", category: "special_ed" },
    { id: "sped-specialed", image: "https://images.unsplash.com/photo-1503919919749-646ddc4f4a62?auto=format&fit=crop&q=80&w=800", category: "special_ed" },
    { id: "sped-autism", image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800", category: "special_ed", isNew: true, status: "started" },
    { id: "sped-behavior", image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=800", category: "special_ed" },
    { id: "sped-learning-dis", image: "https://images.unsplash.com/photo-1460518451285-cd7ba795d053?auto=format&fit=crop&q=80&w=800", category: "special_ed" },
    { id: "sped-skills", image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=800", category: "special_ed" },
    { id: "sped-measure", image: "https://images.unsplash.com/photo-1454165833767-027ffea9e77b?auto=format&fit=crop&q=80&w=800", category: "special_ed" },
    { id: "sped-child-health", image: "https://images.unsplash.com/photo-1503919919749-646ddc4f4a62?auto=format&fit=crop&q=80&w=800", category: "special_ed" },
    { id: "sped-tot", image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800", category: "special_ed" }
];

export function getProgramsByCategory(categoryId: string): Program[] {
    if (categoryId === "all") return programs;
    return programs.filter(p => p.category === categoryId);
}

export function getFeaturedPrograms(): Program[] {
    return programs.filter(p => p.isFeatured);
}