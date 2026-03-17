"use client";

import { useCallback } from "react";

export function useStarBurst() {
    const burst = useCallback((e: React.MouseEvent | React.TouchEvent) => {
        const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const y = 'touches' in e ? e.touches[0].clientY : e.clientY;

        const container = document.createElement("div");
        container.style.position = "fixed";
        container.style.left = "0";
        container.style.top = "0";
        container.style.width = "100%";
        container.style.height = "100%";
        container.style.pointerEvents = "none";
        container.style.zIndex = "9999";
        document.body.appendChild(container);

        const particleCount = 12;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement("div");
            particle.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#D4A853" /></svg>`;
            particle.style.position = "absolute";
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.transform = "translate(-50%, -50%)";
            container.appendChild(particle);

            const angle = (i / particleCount) * Math.PI * 2;
            const velocity = 2 + Math.random() * 4;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            let posX = x;
            let posY = y;
            let opacity = 1;
            let scale = 1;

            const animate = () => {
                posX += vx;
                posY += vy;
                opacity -= 0.02;
                scale -= 0.02;

                particle.style.left = `${posX}px`;
                particle.style.top = `${posY}px`;
                particle.style.opacity = opacity.toString();
                particle.style.transform = `translate(-50%, -50%) scale(${scale})`;

                if (opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    particle.remove();
                }
            };
            requestAnimationFrame(animate);
        }

        setTimeout(() => {
            container.remove();
        }, 1000);
    }, []);

    return burst;
}
