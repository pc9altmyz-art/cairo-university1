import { NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "src/data/media-settings.json");

function readSettings() {
    try {
        return JSON.parse(readFileSync(DATA_PATH, "utf-8"));
    } catch {
        return {};
    }
}

export async function GET() {
    const settings = readSettings();
    return NextResponse.json(settings);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { key, value, programId } = body;

        const settings = readSettings();

        if (programId) {
            // Update a specific program image
            settings.programs = settings.programs || {};
            settings.programs[programId] = value;
        } else if (key) {
            // Update a top-level key (heroVideo, heroBg, logo, etc.)
            settings[key] = value;
        } else {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }

        writeFileSync(DATA_PATH, JSON.stringify(settings, null, 2), "utf-8");
        return NextResponse.json({ success: true, settings });
    } catch (err) {
        console.error("Media API error:", err);
        return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }
}
