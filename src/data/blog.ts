export interface BlogPost {
    id: string;
    category: "news" | "article" | "tips" | "success";
    date: string;
    author: string;
    readTime: string;
    image: string;
    featured?: boolean;
    views?: number;
    likes?: number;
    comments?: any[];
}

export const blogPosts: BlogPost[] = [
    {
        id: "post-refaat",
        category: "article",
        date: "2026-03-28",
        author: "أ. عبدالرحمن رفعت",
        readTime: "8",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop",
        featured: true
    },
    {
        id: "post-1",
        category: "news",
        date: "2026-03-24",
        author: "فريق المؤسسة",
        readTime: "2",
        image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop",
        featured: true
    },
    {
        id: "post-2",
        category: "tips",
        date: "2026-03-18",
        author: "د. أحمد كمال",
        readTime: "4",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop",
        featured: true
    },
    {
        id: "post-3",
        category: "article",
        date: "2026-03-10",
        author: "أ. هشام رفعت",
        readTime: "6",
        image: "https://images.unsplash.com/photo-1491843384427-024bd358d359?q=80&w=1974&auto=format&fit=crop"
    },
    {
        id: "post-4",
        category: "success",
        date: "2026-03-01",
        author: "كريمة إسماعيل",
        readTime: "5",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: "post-5",
        category: "article",
        date: "2026-03-05",
        author: "د. سارة محمود",
        readTime: "8",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop"
    },
    {
        id: "post-6",
        category: "success",
        date: "2026-02-20",
        author: "ياسين كريم",
        readTime: "4",
        image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop"
    }
];

export const getFeaturedPosts = () => blogPosts.filter(post => post.featured);
export const getAllPosts = () => blogPosts;
export const getPostById = (id: string) => blogPosts.find(p => p.id === id);
export const getPostsByCategory = (category: string) => 
    category === "all" ? blogPosts : blogPosts.filter(post => post.category === category);
