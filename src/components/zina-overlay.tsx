"use client";

import React from "react";

export default function ZinaOverlay() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-20">
            {/* Hanging Bunting (Zina) at the top */}
            <div className="absolute top-0 left-0 right-0 flex justify-center gap-1 -translate-y-[2px]">
                {Array.from({ length: 40 }).map((_, i) => (
                    <div
                        key={i}
                        className="animate-zina-sway"
                        style={{
                            animationDelay: `${i * 0.1}s`,
                            transformOrigin: 'top center'
                        }}
                    >
                        <svg width="20" height="26" viewBox="0 0 20 26" fill="none" className="drop-shadow-md">
                            <path
                                d="M0 0 L20 0 L10 26 Z"
                                fill={i % 2 === 0 ? '#D4A853' : '#1e3a8a'}
                            />
                            <path d="M2 0 L10 22 L18 0" stroke="white" strokeOpacity="0.1" strokeWidth="0.5" />
                            {i % 4 === 0 && (
                                <circle cx="10" cy="24" r="1" fill="white" className="animate-pulse" />
                            )}
                        </svg>
                    </div>
                ))}
            </div>

            {/* Floating Elements (Stars and Festive Ornaments) */}
            <div className="absolute inset-0">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute animate-float-slow"
                        style={{
                            top: `${Math.random() * 80 + 10}%`,
                            left: `${Math.random() * 90 + 5}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            opacity: 0.4 + Math.random() * 0.4,
                            transform: `scale(${0.5 + Math.random() * 1})`,
                        }}
                    >
                        {i % 4 === 0 ? (
                            /* Gold Bead / Crystal Ornament */
                            <div
                                className="w-3 h-3 rounded-full bg-gradient-to-br from-[#FFFDF0] via-[#D4A853] to-[#8A6E32] shadow-[0_0_8px_rgba(212,168,83,0.6)] border border-white/20"
                            />
                        ) : (
                            /* Premium Star with Inner Glow */
                            <div className="relative">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#D4A853] drop-shadow-[0_0_10px_rgba(212,168,83,0.5)]">
                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
                                </svg>
                                <div className="absolute inset-0 m-auto w-1 h-1 bg-white rounded-full blur-[1px] opacity-60" />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <style jsx global>{`
                @keyframes zina-sway {
                    0%, 100% { transform: rotate(-3deg); }
                    50%     { transform: rotate(3deg); }
                }
                .animate-zina-sway {
                    animation: zina-sway 4s ease-in-out infinite;
                }
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0) translateX(0) rotate(0); }
                    33% { transform: translateY(-20px) translateX(10px) rotate(5deg); }
                    66% { transform: translateY(10px) translateX(-10px) rotate(-5deg); }
                }
                .animate-float-slow {
                    animation: float-slow 8s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
