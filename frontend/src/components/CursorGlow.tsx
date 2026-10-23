'use client';

import React, { useEffect, useState } from 'react';

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop with fine pointer
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    let animationFrameId: number;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if hovering over clickable elements
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest('a') ||
          target.closest('button') ||
          target.closest('input') ||
          target.closest('textarea') ||
          target.closest('[role="button"]') ||
          window.getComputedStyle(target).cursor === 'pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Smooth physics trailing animation loop
    const render = () => {
      const ease = 0.15;
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;
      setTrailingPos({ x: currentX, y: currentY });

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer Glowing Trailing Orb */}
      <div
        className="fixed top-0 left-0 rounded-full transition-transform duration-75 ease-out pointer-events-none"
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0) translate(-50%, -50%) scale(${
            isHovering ? 1.8 : 1
          })`,
          width: '42px',
          height: '42px',
          background: isHovering
            ? 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, rgba(6, 182, 212, 0.15) 70%, transparent 100%)'
            : 'radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, rgba(6, 182, 212, 0.1) 60%, transparent 100%)',
          border: isHovering
            ? '1.5px solid rgba(99, 102, 241, 0.6)'
            : '1px solid rgba(99, 102, 241, 0.3)',
          boxShadow: isHovering
            ? '0 0 25px rgba(99, 102, 241, 0.5), inset 0 0 15px rgba(6, 182, 212, 0.3)'
            : '0 0 15px rgba(99, 102, 241, 0.3)',
          backdropFilter: 'blur(1px)',
        }}
      />

      {/* Inner Precision Neon Core Dot */}
      <div
        className="fixed top-0 left-0 rounded-full pointer-events-none transition-transform duration-0"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${
            isHovering ? 1.4 : 1
          })`,
          width: '8px',
          height: '8px',
          backgroundColor: isHovering ? '#38bdf8' : '#818cf8',
          boxShadow: '0 0 10px #6366f1, 0 0 20px #06b6d4',
        }}
      />
    </div>
  );
}
