"use client";

import React, { useEffect, useState, memo } from "react";

const ConfettiPiece = memo(function ConfettiPiece({ color, delay, left, size }: { color: string; delay: number; left: string; size: number }) {
    return (
        <div 
            className="absolute top-[-10%] animate-gold-leaf pointer-events-none opacity-0"
            style={{
                backgroundColor: color,
                left: left,
                width: `${size}px`,
                height: `${size * (Math.random() * 0.5 + 0.5)}px`,
                animationDelay: `${delay}s`,
                boxShadow: `0 0 5px ${color}80`,
                borderRadius: Math.random() > 0.5 ? '2px' : '50%',
            }}
        />
    );
});

const LightOrb = memo(function LightOrb({ color, left, delay, size }: { color: string; left: string; delay: number; size: number }) {
    return (
        <div 
            className="absolute bottom-[-20%] animate-orb-rise pointer-events-none z-10"
            style={{
                left: left,
                animationDelay: `${delay}s`,
            }}
        >
            <div 
                className="rounded-full blur-xl animate-pulse"
                style={{ 
                    backgroundColor: color, 
                    width: `${size}px`, 
                    height: `${size}px`,
                    opacity: 0.3
                }}
            />
            {/* Core */}
            <div 
                className="absolute inset-0 m-auto w-2 h-2 rounded-full bg-white opacity-80 blur-[1px]"
            />
        </div>
    );
});

export default function EidCelebration() {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        setIsActive(true);
        const timer = setTimeout(() => setIsActive(false), 15000);
        return () => clearTimeout(timer);
    }, []);

    if (!isActive) return null;

    const premiumColors = ["#D4A853", "#FFFFFF", "#7C2D36", "#FFD700", "#F4F4F4"];
    const confettiPieces = Array.from({ length: 80 });
    const orbs = Array.from({ length: 20 });

    return (
        <div className="fixed inset-0 pointer-events-none z-[80] overflow-hidden">
            {confettiPieces.map((_, i) => (
                <ConfettiPiece 
                    key={`conf-${i}`}
                    color={premiumColors[i % premiumColors.length]}
                    delay={Math.random() * 5}
                    left={`${Math.random() * 100}%`}
                    size={Math.random() * 4 + 6}
                />
            ))}
            
            {orbs.map((_, i) => (
                <LightOrb 
                    key={`orb-${i}`}
                    color={premiumColors[i % premiumColors.length]}
                    left={`${5 + Math.random() * 90}%`}
                    delay={Math.random() * 8}
                    size={Math.random() * 100 + 50}
                />
            ))}

            <style jsx global>{`
                @keyframes gold-leaf {
                    0% { transform: translateY(0) rotate(0) skew(0deg); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { transform: translateY(110vh) rotate(1080deg) skew(20deg); opacity: 0; }
                }
                .animate-gold-leaf {
                    animation: gold-leaf 8s linear infinite;
                }
                @keyframes orb-rise {
                    0% { transform: translateY(0) scale(0.5); opacity: 0; }
                    20% { opacity: 0.4; }
                    80% { opacity: 0.4; }
                    100% { transform: translateY(-130vh) scale(1.5); opacity: 0; }
                }
                .animate-orb-rise {
                    animation: orb-rise 15s ease-out infinite;
                }
            `}</style>
        </div>
    );
}
