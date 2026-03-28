"use client";

import React, { useEffect, useRef, memo } from "react";

const StardustBackground = memo(function StardustBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        const isMobile = window.innerWidth < 768;
        const particleCount = isMobile ? 8 : 20; // Super light for mobile

        let lastTime = 0;
        const fpsInterval = isMobile ? 1000 / 30 : 0; // 30fps on mobile

        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            opacity: number;
            pulseSpeed: number;
            pulseValue: number;

            constructor(w: number, h: number) {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.size = Math.random() * 1.5 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.1;
                this.speedY = (Math.random() - 0.5) * 0.1;
                this.opacity = Math.random() * 0.4 + 0.1;
                this.pulseSpeed = Math.random() * 0.02 + 0.005;
                this.pulseValue = Math.random() * Math.PI * 2;
            }

            update(w: number, h: number) {
                this.x += this.speedX;
                this.y += this.speedY;
                this.pulseValue += this.pulseSpeed;

                if (this.x < 0) this.x = w;
                if (this.x > w) this.x = 0;
                if (this.y < 0) this.y = h;
                if (this.y > h) this.y = 0;
            }

            draw(ctx: CanvasRenderingContext2D) {
                const currentOpacity = this.opacity * (0.5 + Math.sin(this.pulseValue) * 0.5);
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(212, 168, 83, ${currentOpacity})`;
                ctx.fill();
            }
        }

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        };

        const init = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle(canvas.width, canvas.height));
            }
        };

        const animate = (time: number) => {
            animationFrameId = requestAnimationFrame(animate);

            // FPS Throttling for mobile
            if (isMobile) {
                const elapsed = time - lastTime;
                if (elapsed < fpsInterval) return;
                lastTime = time - (elapsed % fpsInterval);
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
                p.update(canvas.width, canvas.height);
                p.draw(ctx);
            });
        };

        window.addEventListener("resize", handleResize);
        handleResize();
        animate(performance.now());

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[1]"
            style={{ mixBlendMode: 'screen' }}
        />
    );
});

export default StardustBackground;
