import React from 'react';

interface MarkdownTextProps {
    text: string;
    className?: string;
}

export function MarkdownText({ text, className }: MarkdownTextProps) {
    if (!text) return null;

    // Simple parser for **bold**, *italic*, and - lists
    const lines = text.split('\n');
    
    return (
        <div className={className}>
            {lines.map((line, i) => {
                let content: React.ReactNode = line;

                // Handle List items
                if (line.trim().startsWith('- ')) {
                    const listContent = line.trim().substring(2);
                    content = (
                        <li className="list-disc list-inside mb-1">
                            {parseInline(listContent)}
                        </li>
                    );
                } else {
                    content = <p className="mb-3">{parseInline(line)}</p>;
                }

                return <React.Fragment key={i}>{content}</React.Fragment>;
            })}
        </div>
    );
}

function parseInline(text: string) {
    // Basic regex for bold and italic
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    
    return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="font-black text-slate-900 dark:text-white">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('*') && part.endsWith('*')) {
            return <em key={i} className="italic text-slate-700 dark:text-white/80">{part.slice(1, -1)}</em>;
        }
        return part;
    });
}
