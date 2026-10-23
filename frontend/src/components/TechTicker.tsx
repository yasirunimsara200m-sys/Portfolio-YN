'use client';

import React from 'react';
import {
  Code2,
  Database,
  Layers,
  Cpu,
  Globe,
  GitBranch,
  Terminal,
  Sparkles,
  Server,
  Cloud,
  FileCode2,
  Workflow,
} from 'lucide-react';

export default function TechTicker() {
  const row1 = [
    { name: 'React', category: 'Frontend', icon: Code2, color: 'text-cyan-400' },
    { name: 'Next.js 14', category: 'Framework', icon: Sparkles, color: 'text-indigo-400' },
    { name: 'TypeScript', category: 'Language', icon: FileCode2, color: 'text-blue-400' },
    { name: 'NestJS', category: 'Backend', icon: Server, color: 'text-rose-400' },
    { name: 'Django', category: 'Backend', icon: Layers, color: 'text-emerald-400' },
    { name: 'Python', category: 'Language', icon: Terminal, color: 'text-amber-400' },
    { name: 'PostgreSQL', category: 'Database', icon: Database, color: 'text-sky-400' },
    { name: 'Node.js', category: 'Runtime', icon: Server, color: 'text-emerald-500' },
    { name: 'Cloudflare', category: 'Cloud & DNS', icon: Cloud, color: 'text-orange-400' },
    { name: 'Tailwind CSS', category: 'Styling', icon: Globe, color: 'text-teal-400' },
    { name: 'MySQL', category: 'Database', icon: Database, color: 'text-blue-500' },
    { name: 'JavaScript ES6+', category: 'Language', icon: FileCode2, color: 'text-yellow-400' },
  ];

  const row2 = [
    { name: 'RESTful APIs', category: 'Architecture', icon: Workflow, color: 'text-indigo-400' },
    { name: 'SQLite', category: 'Database', icon: Database, color: 'text-sky-300' },
    { name: 'Git & GitHub', category: 'Version Control', icon: GitBranch, color: 'text-purple-400' },
    { name: 'Supabase', category: 'BaaS & Auth', icon: Database, color: 'text-emerald-400' },
    { name: 'Firebase', category: 'Cloud Backend', icon: Cloud, color: 'text-amber-500' },
    { name: 'MVC Pattern', category: 'Architecture', icon: Layers, color: 'text-cyan-400' },
    { name: 'VS Code', category: 'IDE', icon: Terminal, color: 'text-blue-400' },
    { name: 'HTML5 & CSS3', category: 'Frontend', icon: Code2, color: 'text-orange-500' },
    { name: 'SQL Server', category: 'Database', icon: Database, color: 'text-red-400' },
    { name: 'Technical SEO', category: 'Optimization', icon: Globe, color: 'text-teal-300' },
    { name: 'Figma & UI Design', category: 'Design', icon: Sparkles, color: 'text-purple-300' },
    { name: 'Prisma ORM', category: 'Backend', icon: Server, color: 'text-indigo-300' },
  ];

  // Duplicate for seamless 100% infinite looping
  const duplicatedRow1 = [...row1, ...row1, ...row1, ...row1];
  const duplicatedRow2 = [...row2, ...row2, ...row2, ...row2];

  return (
    <section className="py-12 sm:py-16 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden select-none bg-gradient-to-b from-transparent via-slate-100/50 dark:via-slate-900/40 to-transparent border-y border-slate-200/60 dark:border-slate-800/60">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none"></div>

      {/* Left & Right edge gradient fade overlays */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-48 lg:w-72 bg-gradient-to-r from-slate-50 dark:from-[#0b0f19] to-transparent z-20"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-48 lg:w-72 bg-gradient-to-l from-slate-50 dark:from-[#0b0f19] to-transparent z-20"></div>

      <div className="relative z-10 space-y-4 sm:space-y-5">
        {/* Row 1: Scrolling Left */}
        <div className="animate-marquee flex items-center gap-3 sm:gap-4">
          {duplicatedRow1.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={`r1-${idx}`}
                className="flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/90 shadow-sm hover:shadow-md hover:border-indigo-500/50 transition-all duration-300 group shrink-0"
              >
                <div className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 group-hover:scale-110 transition-transform">
                  <Icon className={`w-4 h-4 ${item.color}`} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors whitespace-nowrap">
                    {item.name}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Row 2: Scrolling Right (Reverse) */}
        <div className="animate-marquee-reverse flex items-center gap-3 sm:gap-4">
          {duplicatedRow2.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={`r2-${idx}`}
                className="flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/90 shadow-sm hover:shadow-md hover:border-cyan-500/50 transition-all duration-300 group shrink-0"
              >
                <div className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 group-hover:scale-110 transition-transform">
                  <Icon className={`w-4 h-4 ${item.color}`} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors whitespace-nowrap">
                    {item.name}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
