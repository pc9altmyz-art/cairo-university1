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
        location: "القاهرة، مصر"
    };

    return NextResponse.json(profile);
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { username, bio, location, avatar_url } = body;

        if (!username) {
            return NextResponse.json({ error: "Username is required" }, { status: 400 });
        }

        const profiles = await getProfiles();
        profiles[username] = {
            ...profiles[username],
            username,
            bio: bio !== undefined ? bio : (profiles[username]?.bio || ""),
            location: location !== undefined ? location : (profiles[username]?.location || "القاهرة، مصر"),
            avatar_url: avatar_url !== undefined ? avatar_url : (profiles[username]?.avatar_url || null),
            updated_at: new Date().toISOString()
        };

        await saveProfiles(profiles);
        return NextResponse.json({ success: true, profile: profiles[username] });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
    }
}
