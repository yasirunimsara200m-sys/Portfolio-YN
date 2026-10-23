'use client';

import React, { useState } from 'react';
import Preloader from '../../components/Preloader';
import Loading from '../loading';
import Link from 'next/link';
import { ArrowLeft, RefreshCw, Eye, Sparkles } from 'lucide-react';

export default function LoadingPreviewPage() {
  const [activeScreen, setActiveScreen] = useState<'logo' | 'radar'>('logo');
  const [key, setKey] = useState(0);

  const restart = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 flex flex-col items-center justify-center p-6">
      {/* Top Floating Control Bar */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[110] flex items-center gap-2 p-2 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-xl">
        <Link
          href="/"
          className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold hover:bg-slate-200 text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Portfolio</span>
        </Link>

        <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1"></div>

        <button
          onClick={() => {
            setActiveScreen('logo');
            restart();
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            activeScreen === 'logo'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Screen 1: Custom YN Logo &amp; Cyber Bar
        </button>

        <button
          onClick={() => {
            setActiveScreen('radar');
            restart();
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            activeScreen === 'radar'
              ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Screen 2: Holographic Radar Terminal
        </button>

        <button
          onClick={restart}
          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 transition-colors"
          title="Replay Animation"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Render Selected Loading Screen */}
      <div key={key} className="w-full h-full">
        {activeScreen === 'logo' ? (
          <Preloader variant="logo" onComplete={() => console.log('Preloader 1 Complete')} />
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
