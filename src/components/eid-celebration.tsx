"use client";

import React, { useEffect, useState, memo } from "react";

const ConfettiPiece = memo(function ConfettiPiece({ color, delay, left, size }: { color: string; delay: number; left: string; size: number }) {
    return (
        <div 
            className="absolute top-[-10%] animate-confetti-fall pointer-events-none opacity-0"
            style={{
                backgroundColor: color,
                left: left,
                width: `${size}px`,
                height: `${size * 0.6}px`,
                animationDelay: `${delay}s`,
                transform: `rotate(${Math.random() * 360}deg)`,
            }}
        />
    );
});

const Balloon = memo(function Balloon({ color, left, delay }: { color: string; left: string; delay: number }) {
    return (
        <div 
            className="absolute bottom-[-20%] animate-balloon-rise pointer-events-none z-10"
            style={{
                left: left,
                animationDelay: `${delay}s`,
            }}
        >
            <div className="relative">
                {/* Balloon Body */}
                <div 
                    className="w-12 h-16 rounded-[100%] border border-white/20 shadow-xl"
                    style={{ backgroundColor: color }}
                />
                {/* String */}
                <div className="w-[1px] h-20 bg-white/20 mx-auto" />
                {/* Highlight */}
                <div className="absolute top-2 left-3 w-4 h-6 bg-white/30 rounded-full blur-[2px]" />
            </div>
        </div>
    );
});

export default function EidCelebration() {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        setIsActive(true);
        // Effects will stay for 8 seconds
        const timer = setTimeout(() => setIsActive(false), 12000);
        return () => clearTimeout(timer);
    }, []);

    if (!isActive) return null;

    const colors = ["#D4A853", "#7C2D36", "#F4D03F", "#E67E22", "#9B59B6", "#1ABC9C"];
    const confettiPieces = Array.from({ length: 60 });
    const balloons = Array.from({ length: 15 });

    return (
        <div className="fixed inset-0 pointer-events-none z-[80] overflow-hidden">
            {confettiPieces.map((_, i) => (
                <ConfettiPiece 
                    key={`conf-${i}`}
                    color={colors[i % colors.length]}
                    delay={Math.random() * 3}
                    left={`${Math.random() * 100}%`}
                    size={Math.random() * 5 + 8}
                />
            ))}
            
            {balloons.map((_, i) => (
                <Balloon 
                    key={`bal-${i}`}
                    color={colors[i % colors.length]}
                    left={`${10 + Math.random() * 80}%`}
                    delay={Math.random() * 5}
                />
            ))}

            <style jsx global>{`
                @keyframes confetti-fall {
                    0% { transform: translateY(0) rotate(0); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
                }
                .animate-confetti-fall {
                    animation: confetti-fall 6s ease-in infinite;
                }
                @keyframes balloon-rise {
                    0% { transform: translateY(0) rotate(-5deg); opacity: 0; }
                    20% { opacity: 0.8; }
                    80% { opacity: 0.8; }
                    100% { transform: translateY(-130vh) rotate(5deg); opacity: 0; }
                }
                .animate-balloon-rise {
                    animation: balloon-rise 10s ease-out infinite;
                }
            `}</style>
        </div>
    );
}
