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
        const particleCount = 40;

        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            opacity: number;
            pulseSpeed: number;
            pulseValue: number;
            type: "star" | "crescent";

            constructor(w: number, h: number) {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.size = Math.random() * 2 + 1;
                this.speedX = (Math.random() - 0.5) * 0.2;
                this.speedY = (Math.random() - 0.5) * 0.2;
                this.opacity = Math.random() * 0.5 + 0.1;
                this.pulseSpeed = Math.random() * 0.02 + 0.005;
                this.pulseValue = Math.random() * Math.PI * 2;
                this.type = "star";
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
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.fillStyle = `rgba(212, 168, 83, ${currentOpacity})`;
                ctx.shadowBlur = 5;
                ctx.shadowColor = "rgba(212, 168, 83, 0.4)";

                this.drawStar(ctx, 0, 0, 5, this.size, this.size / 2);
                ctx.restore();
            }

            drawStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) {
                let rot = (Math.PI / 2) * 3;
                let x = cx;
                let y = cy;
                let step = Math.PI / spikes;

                ctx.beginPath();
                ctx.moveTo(cx, cy - outerRadius);
                for (let i = 0; i < spikes; i++) {
                    x = cx + Math.cos(rot) * outerRadius;
                    y = cy + Math.sin(rot) * outerRadius;
                    ctx.lineTo(x, y);
                    rot += step;

                    x = cx + Math.cos(rot) * innerRadius;
                    y = cy + Math.sin(rot) * innerRadius;
                    ctx.lineTo(x, y);
                    rot += step;
                }
                ctx.lineTo(cx, cy - outerRadius);
                ctx.closePath();
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

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
                p.update(canvas.width, canvas.height);
                p.draw(ctx);
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener("resize", handleResize);
        handleResize();
        animate();

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
