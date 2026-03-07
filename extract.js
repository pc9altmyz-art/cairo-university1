const fs = require('fs');

const content = fs.readFileSync('src/data/programs.ts', 'utf-8');

// We will use a regex to match the object contents individually
// This regex looks for { id: "...", ... } and captures the content
const regex = /{\s*id:\s*["']([^\"']+)["'](.*?)}/gs;

let matches;
const programs = [];

while ((matches = regex.exec(content)) !== null) {
    if (matches[1] && matches[1].includes('-')) {
        // Simple heuristic: most program ids have dashes: 'educational-rehabilitation'. Categories don't have dashes or are short, but we will ignore the categories array later anyway.
        // Even better, let's parse keys using simple regex
        const id = matches[1];
        const body = matches[2];

        const extractField = (fieldName, isArray) => {
            if (isArray) {
                const arrayMatch = body.match(new RegExp(`${fieldName}:\\s*\\[(.*?)\\]`, 's'));
                if (arrayMatch) {
                    return arrayMatch[1].split(',').map(s => s.replace(/["'\n\r\t]/g, '').trim()).filter(s => s);
                }
                return [];
            }
            // For details, it uses backticks
            if (fieldName === 'details') {
                const backtickMatch = body.match(/details:\s*`([\s\S]*?)`/);
                if (backtickMatch) return backtickMatch[1].trim();
            }
            const fieldRegex = new RegExp(`${fieldName}:\\s*["']([^"']*)["']`, 's');
            const fieldMatch = body.match(fieldRegex);
            return fieldMatch ? fieldMatch[1] : undefined;
        };

        const extractBool = (fieldName) => {
            const fieldRegex = new RegExp(`${fieldName}:\\s*(true|false)`);
            const fieldMatch = body.match(fieldRegex);
            return fieldMatch ? fieldMatch[1] === 'true' : undefined;
        }

        programs.push({
            id: id,
            title: extractField('title'),
            description: extractField('description'),
            duration: extractField('duration'),
            price: extractField('price'),
            startDate: extractField('startDate'),
            schedule: extractField('schedule'),
            image: extractField('image'),
            category: extractField('category'),
            features: extractField('features', true),
            details: extractField('details'),
            isNew: extractBool('isNew'),
            isFeatured: extractBool('isFeatured')
        });
    }
}

const arLocales = {};
const enLocales = {}; // For manual translation later

for (const p of programs) {
    arLocales[p.id] = {
        title: p.title || "",
        description: p.description || "",
        duration: p.duration || "",
        price: p.price || "",
        startDate: p.startDate || "",
        schedule: p.schedule || "",
        features: p.features || [],
        details: p.details || ""
    };

    enLocales[p.id] = {
        title: p.title || "English Title",
        description: p.description || "English Description",
        duration: p.duration || "English Duration",
        price: p.price || "English Price",
        startDate: p.startDate || "English Start Date",
        schedule: p.schedule || "English Schedule",
        features: (p.features || []).map(() => "English Feature"),
        details: p.details || "English Details"
    };
}

const arJson = JSON.parse(fs.readFileSync('messages/ar.json', 'utf-8'));
const enJson = JSON.parse(fs.readFileSync('messages/en.json', 'utf-8'));

arJson.ProgramsData = arLocales;
enJson.ProgramsData = enLocales;

fs.writeFileSync('messages/ar.json', JSON.stringify(arJson, null, 4));
fs.writeFileSync('messages/en.json', JSON.stringify(enJson, null, 4));

// Now dynamically rewrite the programs.ts mapping only properties we want to keep
let newProgramsTsContent = content;

const startStr = "export const programs: Program[] = [";
newProgramsTsContent = newProgramsTsContent.replace(
    /export interface Program \{.*?\}/s,
    `export interface Program {
    id: string;
    image: string;
    category: string;
    isNew?: boolean;
    isFeatured?: boolean;
}`);

const newProgramsArrayStr = programs.map(p => {
    return `    {
        id: "${p.id}",
        image: "${p.image}",
        category: "${p.category}",${p.isNew ? '\\n        isNew: true,' : ''}${p.isFeatured ? '\\n        isFeatured: true,' : ''}
    }`;
}).join(',\\n');

newProgramsTsContent = newProgramsTsContent.substring(0, newProgramsTsContent.indexOf(startStr) + startStr.length) + '\\n' + newProgramsArrayStr + '\\n];\\n\\nexport function getProgramsByCategory(categoryId: string): Program[] {\\n    if (categoryId === "all") return programs;\\n    return programs.filter(p => p.category === categoryId);\\n}';


fs.writeFileSync('src/data/programs.ts', newProgramsTsContent);
console.log("Extraction successful! Total Programs: ", programs.length);
