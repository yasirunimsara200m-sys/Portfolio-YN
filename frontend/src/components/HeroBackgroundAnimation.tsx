'use client';

import React, { useEffect, useRef } from 'react';

export default function HeroBackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Elegant, subtle ambient dust/stars (humanized, not dense tech web)
    const particleCount = Math.min(Math.floor(width / 60), 22);
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
    }> = [];

    const colors = ['#6366f1', '#06b6d4', '#818cf8'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 1.5 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.35 + 0.15,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle float particles without harsh spiderweb lines
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Interactive/Generative Particles Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-60 dark:opacity-75"
      />

      {/* Floating Animated Tech Code Glyphs */}
      <div className="absolute top-16 left-[10%] text-xs font-mono text-indigo-500/25 dark:text-indigo-400/20 animate-float">
        &lt;React /&gt;
      </div>
      <div
        className="absolute top-28 right-[15%] text-xs font-mono text-cyan-500/25 dark:text-cyan-400/20 animate-float"
        style={{ animationDelay: '2s' }}
      >
        {'{ NestJS }'}
      </div>
      <div
        className="absolute bottom-20 left-[18%] text-xs font-mono text-purple-500/25 dark:text-purple-400/20 animate-float"
        style={{ animationDelay: '4s' }}
      >
        async () =&gt; &#123;&#125;
      </div>
      <div
        className="absolute bottom-28 right-[12%] text-xs font-mono text-emerald-500/25 dark:text-emerald-400/20 animate-float"
        style={{ animationDelay: '1.5s' }}
      >
        Django &amp; SQLite
      </div>
      <div
        className="absolute top-1/2 left-[5%] text-xs font-mono text-blue-500/20 dark:text-blue-400/15 animate-float hidden lg:block"
        style={{ animationDelay: '3s' }}
      >
        01001100
      </div>

      {/* Ambient Pulsing Gradient Spheres */}
      <div className="absolute -top-24 left-1/4 w-80 sm:w-[450px] h-80 sm:h-[450px] bg-gradient-to-tr from-indigo-500/15 to-purple-500/10 rounded-full blur-[100px] animate-pulse-slow"></div>
      <div
        className="absolute top-1/3 -right-20 w-72 sm:w-[400px] h-72 sm:h-[400px] bg-gradient-to-bl from-cyan-500/15 to-blue-500/10 rounded-full blur-[100px] animate-pulse-slow"
        style={{ animationDelay: '3s' }}
      ></div>
    </div>
  );
}
