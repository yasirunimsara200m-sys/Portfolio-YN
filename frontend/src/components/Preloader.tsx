'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTheme } from '../context/ThemeContext';
import { Sparkles, Terminal, Code2 } from 'lucide-react';

interface PreloaderProps {
  onComplete?: () => void;
  variant?: 'logo' | 'terminal';
}

export default function Preloader({ onComplete, variant = 'logo' }: PreloaderProps) {
  const { theme } = useTheme();
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing Portfolio System...');
  const [isDone, setIsDone] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const statuses = [
      { at: 15, text: 'Connecting to Cloud PostgreSQL...' },
      { at: 40, text: 'Synchronizing Full-Stack Projects...' },
      { at: 70, text: 'Loading Technical Skills & Stack...' },
      { at: 90, text: 'Optimizing Neural UI Experience...' },
      { at: 100, text: 'Welcome, Yasiru Nimsara' },
    ];

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Organic non-linear progress step
        const step = Math.floor(Math.random() * 8) + 3;
        const next = Math.min(prev + step, 100);

        for (const s of statuses) {
          if (next >= s.at) {
            setStatusText(s.text);
          }
        }

        if (next === 100) {
          setTimeout(() => {
            setFading(true);
            setTimeout(() => {
              setIsDone(true);
              if (onComplete) onComplete();
            }, 600);
          }, 400);
        }

        return next;
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-all duration-700 select-none ${
        fading ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      } ${
        theme === 'dark'
          ? 'bg-[#0b0f19] text-white'
          : 'bg-[#f8fafc] text-slate-900'
      }`}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -left-20 w-80 h-80 bg-indigo-500/15 dark:bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-1/3 -right-20 w-80 h-80 bg-cyan-500/15 dark:bg-cyan-600/20 rounded-full blur-[100px] pointer-events-none animate-pulse-slow"></div>

      <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6 text-center">
        {variant === 'logo' ? (
          /* Style 1: Custom YN Logo with Neon Pulse */
          <div className="relative mb-8 flex flex-col items-center">
            {/* Logo Glow Ring */}
            <div className="relative w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500/25 via-purple-500/20 to-cyan-400/25 blur-2xl animate-pulse"></div>

              <div className="relative w-40 h-40 sm:w-44 sm:h-44 rounded-3xl p-3 bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 shadow-2xl backdrop-blur-md flex items-center justify-center">
                <Image
                  src={theme === 'dark' ? '/logo-yn-white.png' : '/logo-yn-transparent.png'}
                  alt="Yasiru Nimsara Logo"
                  width={150}
                  height={150}
                  priority
                  className="object-contain drop-shadow-md hover:scale-105 transition-transform"
                />
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-semibold">
              <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
              <span>Full Stack Software Engineer</span>
            </div>
          </div>
        ) : (
          /* Style 2: Cyber Terminal / Code Pulse Variant */
          <div className="relative mb-8 flex flex-col items-center">
            <div className="w-24 h-24 rounded-3xl bg-indigo-600/10 dark:bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4 shadow-xl shadow-indigo-500/10 animate-bounce">
              <Code2 className="w-12 h-12" />
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-slate-500 dark:text-slate-400">
              <Terminal className="w-4 h-4 text-cyan-500" />
              <span>yn-system-v2.0 :: online</span>
            </div>
          </div>
        )}

        {/* Loading Progress Bar */}
        <div className="w-full space-y-2.5">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-600 dark:text-slate-400 truncate max-w-[220px]">
              {statusText}
            </span>
            <span className="font-bold text-indigo-600 dark:text-cyan-400">
              {progress}%
            </span>
          </div>

          {/* Glowing Track */}
          <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800/80 overflow-hidden p-[1px] shadow-inner">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 shadow-md shadow-indigo-500/50 transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 font-mono pt-1">
            <span>Next.js 14 · NestJS · PostgreSQL</span>
            <span className="inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span>LIVE</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
