import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET: fetch all testimonials
export async function GET() {
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
            const { error } = await supabase
                .from('testimonials')
                .insert([body.testimonial]);

            if (error) throw error;
            return NextResponse.json({ success: true });
        }

        if (body.action === "approve") {
            const { error } = await supabase
                .from('testimonials')
                .update({ approved: true })
                .eq('id', body.id);

            if (error) throw error;
            return NextResponse.json({ success: true });
        }

        if (body.action === "delete") {
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
