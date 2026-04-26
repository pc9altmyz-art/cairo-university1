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

export const blogPosts: BlogPost[] = [];

export const getFeaturedPosts = () => blogPosts.filter(post => post.featured);
export const getAllPosts = () => blogPosts;
export const getPostById = (id: string) => blogPosts.find(p => p.id === id);
export const getPostsByCategory = (category: string) => 
    category === "all" ? blogPosts : blogPosts.filter(post => post.category === category);
