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
      {/* Outer Subtle Ambient Ring */}
      <div
        className="fixed top-0 left-0 rounded-full transition-transform duration-100 ease-out pointer-events-none"
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0) translate(-50%, -50%) scale(${
            isHovering ? 1.5 : 1
          })`,
          width: '32px',
          height: '32px',
          background: isHovering
            ? 'rgba(99, 102, 241, 0.12)'
            : 'rgba(99, 102, 241, 0.05)',
          border: isHovering
            ? '1px solid rgba(99, 102, 241, 0.4)'
            : '1px solid rgba(99, 102, 241, 0.18)',
        }}
      />

      {/* Inner Clean Dot */}
      <div
        className="fixed top-0 left-0 rounded-full pointer-events-none transition-transform duration-0"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${
            isHovering ? 1.2 : 1
          })`,
          width: '5px',
          height: '5px',
          backgroundColor: '#6366f1',
        }}
      />
    </div>
  );
}
