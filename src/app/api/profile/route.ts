import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const dbPath = path.join(process.cwd(), "src", "data", "profiles.json");

async function getProfiles() {
    try {
        const data = await fs.readFile(dbPath, 'utf8');
        return JSON.parse(data);
    } catch {
        return {};
    }
}

async function saveProfiles(profiles: any) {
    await fs.writeFile(dbPath, JSON.stringify(profiles, null, 2), 'utf8');
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get('username');

    if (!username) {
        return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    const profiles = await getProfiles();
    const profile = profiles[username] || {
        username: username,
        bio: "",
        avatar_url: null,
        location: "القاهرة، مصر",
        joined_at: new Date().toISOString(),
        badges: ["بداية واعدة"]
    };

    return NextResponse.json(profile);
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { username, bio, location, avatar_url, badges } = body;

        if (!username) {
            return NextResponse.json({ error: "Username is required" }, { status: 400 });
        }

        const profiles = await getProfiles();
        const existing = profiles[username] || {};
        
        profiles[username] = {
            ...existing,
            username,
            bio: bio !== undefined ? bio : (existing.bio || ""),
            location: location !== undefined ? location : (existing.location || "القاهرة، مصر"),
            avatar_url: avatar_url !== undefined ? avatar_url : (existing.avatar_url || null),
            joined_at: existing.joined_at || new Date().toISOString(),
            badges: badges !== undefined ? badges : (existing.badges || ["بداية واعدة"]),
            updated_at: new Date().toISOString()
        };

        await saveProfiles(profiles);
        return NextResponse.json({ success: true, profile: profiles[username] });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
    }
}
