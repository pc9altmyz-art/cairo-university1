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
    { id: "psych-comprehensive", image: "C:/Users/PC-9/.gemini/antigravity/brain/6eba5fc5-c39a-437d-a8a9-599b999e1a64/psychology_program_card_1774716058159.png", category: "psychology", isFeatured: true },
    { id: "psych-family", image: "C:/Users/PC-9/.gemini/antigravity/brain/6eba5fc5-c39a-437d-a8a9-599b999e1a64/teacher_training_workshop_card_1774716346453.png", category: "psychology" },
    { id: "psych-behavior", image: "C:/Users/PC-9/.gemini/antigravity/brain/6eba5fc5-c39a-437d-a8a9-599b999e1a64/psychology_program_card_1774716058159.png", category: "psychology" },
    { id: "psych-disorders", image: "C:/Users/PC-9/.gemini/antigravity/brain/6eba5fc5-c39a-437d-a8a9-599b999e1a64/psychology_abstract_mind_card_1774716478995.png", category: "psychology" },
    { id: "psych-cbt", image: "C:/Users/PC-9/.gemini/antigravity/brain/6eba5fc5-c39a-437d-a8a9-599b999e1a64/psychology_abstract_mind_card_1774716478995.png", category: "psychology", isNew: true },
    { id: "psych-lifecoach", image: "C:/Users/PC-9/.gemini/antigravity/brain/6eba5fc5-c39a-437d-a8a9-599b999e1a64/teacher_training_workshop_card_1774716346453.png", category: "psychology" },
    { id: "psych-measure", image: "C:/Users/PC-9/.gemini/antigravity/brain/6eba5fc5-c39a-437d-a8a9-599b999e1a64/educational_technology_tablet_card_1774716463710.png", category: "psychology", status: "started" },
    { id: "psych-positive", image: "C:/Users/PC-9/.gemini/antigravity/brain/6eba5fc5-c39a-437d-a8a9-599b999e1a64/psychology_abstract_mind_card_1774716478995.png", category: "psychology" },
    { id: "psych-arts", image: "C:/Users/PC-9/.gemini/antigravity/brain/6eba5fc5-c39a-437d-a8a9-599b999e1a64/psychology_abstract_mind_card_1774716478995.png", category: "psychology", isNew: true },
    { id: "psych-child-disorders", image: "C:/Users/PC-9/.gemini/antigravity/brain/6eba5fc5-c39a-437d-a8a9-599b999e1a64/special_ed_card_v2_1774716175112.png", category: "psychology" },
    { id: "psych-family-2", image: "C:/Users/PC-9/.gemini/antigravity/brain/6eba5fc5-c39a-437d-a8a9-599b999e1a64/teacher_training_workshop_card_1774716346453.png", category: "psychology" },
    { id: "psych-child-health", image: "C:/Users/PC-9/.gemini/antigravity/brain/6eba5fc5-c39a-437d-a8a9-599b999e1a64/special_ed_card_v2_1774716175112.png", category: "psychology" },
    { id: "psych-tot", image: "C:/Users/PC-9/.gemini/antigravity/brain/6eba5fc5-c39a-437d-a8a9-599b999e1a64/professional_training_certificate_card_1774716495034.png", category: "psychology" },
    { id: "psych-disability", image: "C:/Users/PC-9/.gemini/antigravity/brain/6eba5fc5-c39a-437d-a8a9-599b999e1a64/psychology_abstract_mind_card_1774716478995.png", category: "psychology" },
    { id: "psych-early-child", image: "C:/Users/PC-9/.gemini/antigravity/brain/6eba5fc5-c39a-437d-a8a9-599b999e1a64/special_ed_card_v2_1774716175112.png", category: "psychology" },
    { id: "psych-modarreb", image: "C:/Users/PC-9/.gemini/antigravity/brain/6eba5fc5-c39a-437d-a8a9-599b999e1a64/psychology_program_card_1774716058159.png", category: "psychology" },

    // --- 2. Teacher Prep ---
    { id: "tp-kg", image: "C:/Users/PC-9/.gemini/antigravity/brain/6eba5fc5-c39a-437d-a8a9-599b999e1a64/teacher_prep_card_v2_1774716134713.png", category: "teacher_prep", isFeatured: true },
    { id: "tp-montessori", image: "C:/Users/PC-9/.gemini/antigravity/brain/6eba5fc5-c39a-437d-a8a9-599b999e1a64/teacher_prep_card_v2_1774716134713.png", category: "teacher_prep" },
    { id: "tp-jollyphonics", image: "C:/Users/PC-9/.gemini/antigravity/brain/6eba5fc5-c39a-437d-a8a9-599b999e1a64/teacher_prep_card_v2_1774716134713.png", category: "teacher_prep" },
    { id: "tp-digital", image: "C:/Users/PC-9/.gemini/antigravity/brain/6eba5fc5-c39a-437d-a8a9-599b999e1a64/educational_technology_tablet_card_1774716463710.png", category: "teacher_prep" },
    { id: "tp-behavior", image: "C:/Users/PC-9/.gemini/antigravity/brain/6eba5fc5-c39a-437d-a8a9-599b999e1a64/teacher_prep_card_v2_1774716134713.png", category: "teacher_prep" },
    { id: "tp-learning-dis", image: "C:/Users/PC-9/.gemini/antigravity/brain/6eba5fc5-c39a-437d-a8a9-599b999e1a64/special_ed_card_v2_1774716175112.png", category: "teacher_prep" },
    { id: "tp-child-health", image: "C:/Users/PC-9/.gemini/antigravity/brain/6eba5fc5-c39a-437d-a8a9-599b999e1a64/special_ed_card_v2_1774716175112.png", category: "teacher_prep" },
    { id: "tp-arabic", image: "C:/Users/PC-9/.gemini/antigravity/brain/6eba5fc5-c39a-437d-a8a9-599b999e1a64/educational_technology_tablet_card_1774716463710.png", category: "teacher_prep", isNew: true },

    // --- 3. Special Education ---
    { id: "sped-comp", image: "C:/Users/PC-9/.gemini/antigravity/brain/6eba5fc5-c39a-437d-a8a9-599b999e1a64/special_education_autism_support_card_1774716330490.png", category: "special_ed", isFeatured: true },
    { id: "sped-speech", image: "C:/Users/PC-9/.gemini/antigravity/brain/6eba5fc5-c39a-437d-a8a9-599b999e1a64/special_ed_card_v2_1774716175112.png", category: "special_ed" },
    { id: "sped-specialed", image: "C:/Users/PC-9/.gemini/antigravity/brain/6eba5fc5-c39a-437d-a8a9-599b999e1a64/special_ed_card_v2_1774716175112.png", category: "special_ed" },
    { id: "sped-autism", image: "C:/Users/PC-9/.gemini/antigravity/brain/6eba5fc5-c39a-437d-a8a9-599b999e1a64/special_education_autism_support_card_1774716330490.png", category: "special_ed", isNew: true, status: "started" },
    { id: "sped-behavior", image: "C:/Users/PC-9/.gemini/antigravity/brain/6eba5fc5-c39a-437d-a8a9-599b999e1a64/teacher_prep_card_v2_1774716134713.png", category: "special_ed" },
    { id: "sped-learning-dis", image: "C:/Users/PC-9/.gemini/antigravity/brain/6eba5fc5-c39a-437d-a8a9-599b999e1a64/special_ed_card_v2_1774716175112.png", category: "special_ed" },
    { id: "sped-skills", image: "C:/Users/PC-9/.gemini/antigravity/brain/6eba5fc5-c39a-437d-a8a9-599b999e1a64/special_education_autism_support_card_1774716330490.png", category: "special_ed" },
    { id: "sped-measure", image: "C:/Users/PC-9/.gemini/antigravity/brain/6eba5fc5-c39a-437d-a8a9-599b999e1a64/educational_technology_tablet_card_1774716463710.png", category: "special_ed" },
    { id: "sped-child-health", image: "C:/Users/PC-9/.gemini/antigravity/brain/6eba5fc5-c39a-437d-a8a9-599b999e1a64/special_ed_card_v2_1774716175112.png", category: "special_ed" },
    { id: "sped-tot", image: "C:/Users/PC-9/.gemini/antigravity/brain/6eba5fc5-c39a-437d-a8a9-599b999e1a64/professional_training_certificate_card_1774716495034.png", category: "special_ed" }
];

export function getProgramsByCategory(categoryId: string): Program[] {
    if (categoryId === "all") return programs;
    return programs.filter(p => p.category === categoryId);
}

export function getFeaturedPrograms(): Program[] {
    return programs.filter(p => p.isFeatured);
}