import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const localDbPath = path.join(process.cwd(), "src", "data", "forum_posts.json");

async function getLocalData() {
    try {
        const fileData = await fs.readFile(localDbPath, 'utf8');
        return JSON.parse(fileData);
    } catch {
        // Return default posts if file doesn't exist
        return [
            {
                id: 1,
                title: "كيف أبدأ في مجال التربية الخاصة؟",
                author: "د. أحمد علي",
                category: "التربية الخاصة",
                replies: 12,
                likes: 45,
                views: 450,
                date: new Date(Date.now() - 7200000).toISOString(),
                avatar: "👨‍🏫",
                content: "هذا الموضوع يهدف لمساعدة المبتدئين في مجال التربية الخاصة من خلال توفير الموارد الأساسية والخطوات الأولى للنجاح."
            },
            {
                id: 2,
                title: "أفضل المراجع لدبلومة علم النفس الإيجابي",
                author: "سارة محمد",
                category: "علم النفس",
                replies: 8,
                likes: 32,
                views: 210,
                date: new Date(Date.now() - 18000000).toISOString(),
                avatar: "👩‍🎓",
                content: "شاركونا أفضل الكتب والمقالات التي ساعدتكم في دراسة علم النفس الإيجابي."
            }
        ];
    }
}

async function saveLocalData(data: any[]) {
    try {
        await fs.mkdir(path.dirname(localDbPath), { recursive: true });
        await fs.writeFile(localDbPath, JSON.stringify(data, null, 2), 'utf8');
    } catch (e) {
        console.error("Failed to save local JSON DB:", e);
    }
}

export async function GET() {
    const data = await getLocalData();
    return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const data = await getLocalData();

        if (body.action === "add") {
            const newPost = {
                ...body.post,
                id: `post-${Date.now()}`,
                replies: 0,
                likes: 0,
                views: 1,
                date: new Date().toISOString()
            };
            data.unshift(newPost);
            await saveLocalData(data);
            return NextResponse.json({ success: true, post: newPost });
        }

        if (body.action === "like") {
            const index = data.findIndex((p: any) => String(p.id) === String(body.id));
            if (index > -1) {
                data[index].likes = (data[index].likes || 0) + (body.increment ? 1 : -1);
                await saveLocalData(data);
            }
            return NextResponse.json({ success: true });
        }

        if (body.action === "comment") {
            const index = data.findIndex((p: any) => String(p.id) === String(body.postId));
            if (index > -1) {
                const newComment = {
                    ...body.comment,
                    id: `cmt-${Date.now()}`,
                    date: new Date().toISOString(),
                    likes: 0,
                    liked: false
                };
                data[index].comments = data[index].comments || [];
                data[index].comments.push(newComment);
                data[index].replies = (data[index].replies || 0) + 1;
                await saveLocalData(data);
                return NextResponse.json({ success: true, comment: newComment });
            }
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        if (body.action === "deleteComment") {
            const index = data.findIndex((p: any) => String(p.id) === String(body.postId));
            if (index > -1) {
                data[index].comments = (data[index].comments || []).filter((c: any) => String(c.id) !== String(body.commentId));
                data[index].replies = data[index].comments.length;
                await saveLocalData(data);
                return NextResponse.json({ success: true });
            }
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        if (body.action === "likeComment") {
            const index = data.findIndex((p: any) => String(p.id) === String(body.postId));
            if (index > -1) {
                const comments = data[index].comments || [];
                const cIndex = comments.findIndex((c: any) => String(c.id) === String(body.commentId));
                if (cIndex > -1) {
                    comments[cIndex].likes = (comments[cIndex].likes || 0) + (body.increment ? 1 : -1);
                    data[index].comments = comments;
                    await saveLocalData(data);
                }
            }
            return NextResponse.json({ success: true });
        }

        if (body.action === "delete") {
            const newData = data.filter((p: any) => String(p.id) !== String(body.id));
            await saveLocalData(newData);
            return NextResponse.json({ success: true });
        }

        if (body.action === "deleteComment") {
            const index = data.findIndex((p: any) => String(p.id) === String(body.postId));
            if (index > -1) {
                const comments = data[index].comments || [];
                const newComments = comments.filter((c: any) => String(c.id) !== String(body.commentId));
                data[index].comments = newComments;
                data[index].replies = newComments.length;
                await saveLocalData(data);
            }
            return NextResponse.json({ success: true });
        }

        if (body.action === "view") {
            const index = data.findIndex((p: any) => String(p.id) === String(body.id));
            if (index > -1) {
                data[index].views = (data[index].views || 0) + 1;
                await saveLocalData(data);
            }
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    } catch (error) {
        return NextResponse.json({ error: "Operation failed" }, { status: 500 });
    }
}
