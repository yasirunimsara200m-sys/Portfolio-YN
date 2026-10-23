'use client';

import React from 'react';
import Image from 'next/image';
import { Terminal, Cpu, Sparkles } from 'lucide-react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50/90 dark:bg-[#0b0f19]/90 backdrop-blur-xl text-slate-900 dark:text-slate-100">
      {/* Background orbs */}
      <div className="absolute w-72 h-72 bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-[90px] pointer-events-none animate-pulse-slow"></div>

      <div className="relative z-10 flex flex-col items-center max-w-xs text-center space-y-6">
        {/* Holographic Radar / Logo container */}
        <div className="relative w-28 h-28 flex items-center justify-center">
          {/* Animated spinning gradient ring */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-indigo-500 border-r-cyan-400 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border border-dashed border-indigo-500/40 animate-spin-slow"></div>

          <div className="w-20 h-20 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-xl flex items-center justify-center p-2">
            <Image
              src="/logo-yn-transparent.png"
              alt="Yasiru Nimsara"
              width={60}
              height={60}
              className="object-contain"
            />
          </div>
        </div>

        {/* Status indicator */}
        <div className="space-y-2 w-full">
          <div className="flex items-center justify-center gap-2 text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400">
            <Cpu className="w-3.5 h-3.5 animate-pulse" />
            <span>Loading Workspace...</span>
          </div>

          {/* Indeterminate linear loading bar */}
          <div className="w-48 h-1.5 mx-auto rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden relative">
            <div className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full animate-marquee"></div>
          </div>

          <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
            Yasiru Nimsara · Full Stack Portfolio
          </p>
        </div>
      </div>
    </div>
  );
}
