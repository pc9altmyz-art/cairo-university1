import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFile = path.join(process.cwd(), "src/data/testimonials-data.json");

function readData() {
    try {
        const raw = fs.readFileSync(dataFile, "utf-8");
        return JSON.parse(raw);
    } catch {
        return [];
    }
}

function writeData(data: unknown) {
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), "utf-8");
}

// GET: fetch all testimonials
export async function GET() {
    const data = readData();
    return NextResponse.json(data);
}

// POST: add new testimonial OR update (approve/delete)
export async function POST(req: NextRequest) {
    const body = await req.json();
    const data = readData();

    if (body.action === "add") {
        data.push(body.testimonial);
        writeData(data);
        return NextResponse.json({ success: true });
    }

    if (body.action === "approve") {
        const updated = data.map((t: { id: string }) =>
            t.id === body.id ? { ...t, approved: true } : t
        );
        writeData(updated);
        return NextResponse.json({ success: true });
    }

    if (body.action === "delete") {
        const updated = data.filter((t: { id: string }) => t.id !== body.id);
        writeData(updated);
        return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
