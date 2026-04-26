import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'registrations.json');

// Ensure the data file exists
function ensureDataFile() {
    if (!fs.existsSync(dataFilePath)) {
        fs.writeFileSync(dataFilePath, JSON.stringify([]), 'utf8');
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        ensureDataFile();
        const fileContent = fs.readFileSync(dataFilePath, 'utf8');
        let registrations = [];
        try {
            registrations = JSON.parse(fileContent);
        } catch (e) {
            registrations = [];
        }

        const newRegistration = {
            id: Date.now().toString(),
            date: new Date().toISOString(),
            ...body
        };

        registrations.push(newRegistration);

        fs.writeFileSync(dataFilePath, JSON.stringify(registrations, null, 2), 'utf8');

        return NextResponse.json({ success: true, registration: newRegistration });
    } catch (error) {
        console.error("Failed to save registration:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
