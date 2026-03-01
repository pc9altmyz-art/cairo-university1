import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import fs from "fs/promises";
import path from "path";

const USE_LOCAL_DB =
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder") ||
    process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your_project_url");
const localDbPath = path.join(process.cwd(), "src", "data", "testimonials.json");

async function getLocalData() {
    try {
        const fileData = await fs.readFile(localDbPath, 'utf8');
        return JSON.parse(fileData);
    } catch {
        // Return default data if file doesn't exist
        return [];
    }
}

async function saveLocalData(data: any) {
    try {
        await fs.mkdir(path.dirname(localDbPath), { recursive: true });
        await fs.writeFile(localDbPath, JSON.stringify(data, null, 2), 'utf8');
    } catch (e) {
        console.error("Failed to save local JSON DB:", e);
    }
}

// GET: fetch all testimonials
export async function GET() {
    if (USE_LOCAL_DB) {
        const data = await getLocalData();
        return NextResponse.json(data);
    }

    const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching testimonials:", error);
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }

    return NextResponse.json(data || []);
}

// POST: add new testimonial OR update (approve/delete)
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        if (body.action === "add") {
            if (USE_LOCAL_DB) {
                const data = await getLocalData();
                data.push({ ...body.testimonial, created_at: new Date().toISOString() });
                await saveLocalData(data);
                return NextResponse.json({ success: true });
            }

            const { error } = await supabase
                .from('testimonials')
                .insert([body.testimonial]);

            if (error) throw error;
            return NextResponse.json({ success: true });
        }

        if (body.action === "approve") {
            if (USE_LOCAL_DB) {
                const data = await getLocalData();
                const index = data.findIndex((t: any) => t.id === body.id);
                if (index > -1) data[index].approved = true;
                await saveLocalData(data);
                return NextResponse.json({ success: true });
            }

            const { error } = await supabase
                .from('testimonials')
                .update({ approved: true })
                .eq('id', body.id);

            if (error) throw error;
            return NextResponse.json({ success: true });
        }

        if (body.action === "delete") {
            if (USE_LOCAL_DB) {
                const data = await getLocalData();
                const newData = data.filter((t: any) => t.id !== body.id);
                await saveLocalData(newData);
                return NextResponse.json({ success: true });
            }

            const { error } = await supabase
                .from('testimonials')
                .delete()
                .eq('id', body.id);

            if (error) throw error;
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    } catch (error) {
        console.error("Database operation failed:", error);
        return NextResponse.json({ error: "Operation failed" }, { status: 500 });
    }
}
