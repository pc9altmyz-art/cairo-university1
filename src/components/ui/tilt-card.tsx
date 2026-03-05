"use client";

import { use3DTilt } from "@/hooks/use-3d-tilt";

export function TiltCard({ children, className, intensity = 15 }: { children: React.ReactNode, className?: string, intensity?: number }) {
    const { style, handleMouseMove, handleMouseLeave } = use3DTilt(intensity);

    return (
        <div
            className={`will-change-transform ${className || ""}`}
            style={style}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </div>
    );
}
