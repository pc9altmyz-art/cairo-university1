import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const dbPath = path.join(process.cwd(), "src", "data", "blog_posts.json");

async function getPosts() {
    try {
        const data = await fs.readFile(dbPath, 'utf8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

async function savePosts(posts: any[]) {
    await fs.writeFile(dbPath, JSON.stringify(posts, null, 2), 'utf8');
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const posts = await getPosts();

    if (id) {
        const post = posts.find((p: any) => p.id === id);
        return post ? NextResponse.json(post) : NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { action, id, comment, increment } = body;
        const posts = await getPosts();
        const index = posts.findIndex((p: any) => p.id === id);

        if (index === -1) return NextResponse.json({ error: "Post not found" }, { status: 404 });

        if (action === "view") {
            posts[index].views = (posts[index].views || 0) + 1;
        } else if (action === "like") {
            posts[index].likes = (posts[index].likes || 0) + (increment ? 1 : -1);
        } else if (action === "comment") {
            const newComment = {
                ...comment,
                id: Date.now(),
                date: new Date().toISOString()
            };
            posts[index].comments = posts[index].comments || [];
            posts[index].comments.push(newComment);
        }

        await savePosts(posts);
        return NextResponse.json({ success: true, post: posts[index] });
    } catch (error) {
        return NextResponse.json({ error: "Failed" }, { status: 500 });
    }
}
