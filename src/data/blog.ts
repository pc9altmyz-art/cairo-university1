export interface BlogPost {
    id: string;
    category: "news" | "article" | "tips" | "success";
    date: string;
    author: string;
    readTime: string;
    image: string;
    featured?: boolean;
}

export const blogPosts: BlogPost[] = [
    {
        id: "post-1",
        category: "news",
        date: "2026-03-15",
        author: "فريق المؤسسة",
        readTime: "3 دقائق",
        image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop",
        featured: true
    },
    {
        id: "post-2",
        category: "tips",
        date: "2026-03-20",
        author: "د. أحمد كمال",
        readTime: "5 دقائق",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop",
        featured: true
    },
    {
        id: "post-3",
        category: "article",
        date: "2026-03-22",
        author: "أ. هشام رفعت",
        readTime: "7 دقائق",
        image: "https://images.unsplash.com/photo-1491843384427-024bd358d359?q=80&w=1974&auto=format&fit=crop"
    },
    {
        id: "post-4",
        category: "success",
        date: "2026-03-25",
        author: "كريمة إسماعيل",
        readTime: "4 دقائق",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
    }
];

export const getFeaturedPosts = () => blogPosts.filter(post => post.featured);
export const getAllPosts = () => blogPosts;
export const getPostsByCategory = (category: string) => 
    category === "all" ? blogPosts : blogPosts.filter(post => post.category === category);
