"use client";

import React from "react";

export default function CornerLanterns() {
    return (
        <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden select-none">
            {/* Top Left Lantern */}
            <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 animate-lantern-sway-left origin-top">
                <LanternSVG size={180} />
            </div>

            {/* Top Right Lantern */}
            <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 animate-lantern-sway-right origin-top">
                <LanternSVG size={180} />
            </div>

            <style jsx global>{`
                @keyframes lantern-sway-left {
                    0%, 100% { transform: translate(-25%, -25%) rotate(-5deg); }
                    50%     { transform: translate(-25%, -25%) rotate(5deg); }
                }
                @keyframes lantern-sway-right {
                    0%, 100% { transform: translate(25%, -25%) rotate(5deg); }
                    50%     { transform: translate(25%, -25%) rotate(-5deg); }
                }
                .animate-lantern-sway-left {
                    animation: lantern-sway-left 6s ease-in-out infinite;
                }
                .animate-lantern-sway-right {
                    animation: lantern-sway-right 7s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}

function LanternSVG({ size }: { size: number }) {
    return (
        <svg width={size} height={size * 1.5} viewBox="0 0 100 150" fill="none" className="drop-shadow-[0_0_30px_rgba(212,168,83,0.3)]">
            {/* Hanging Rope */}
            <line x1="50" y1="0" x2="50" y2="40" stroke="#D4A853" strokeWidth="2" strokeDasharray="4 2" />
            
            {/* Lantern Cap */}
            <path d="M30 40 L70 40 L80 55 L20 55 Z" fill="#D4A853" />
            <path d="M50 30 L55 40 L45 40 Z" fill="#D4A853" />
            
            {/* Lantern Body */}
            <rect x="25" y="55" width="50" height="60" rx="4" fill="#3D1118" stroke="#D4A853" strokeWidth="2" />
            
            {/* Inner Glow */}
            <rect x="35" y="65" width="30" height="40" rx="2" fill="#D4A853" className="animate-pulse">
                <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
            </rect>

            {/* Decorative Grids */}
            <line x1="35" y1="75" x2="65" y2="75" stroke="#3D1118" strokeWidth="1" />
            <line x1="35" y1="85" x2="65" y2="85" stroke="#3D1118" strokeWidth="1" />
            <line x1="35" y1="95" x2="65" y2="95" stroke="#3D1118" strokeWidth="1" />
            <line x1="50" y1="65" x2="50" y2="105" stroke="#3D1118" strokeWidth="1" />

            {/* Lantern Base */}
            <path d="M20 115 L80 115 L70 130 L30 130 Z" fill="#D4A853" />
            
            {/* Bottom Tassel/Tip */}
            <path d="M50 130 L55 145 L45 145 Z" fill="#D4A853" />
        </svg>
    );
}
