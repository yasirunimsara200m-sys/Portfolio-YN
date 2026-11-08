'use client';

import React, { useState } from 'react';
import {
  Code,
  Layers,
  Database,
  Terminal,
  Wrench,
  CheckCircle2,
  Wrench as ToolIcon,
  Sparkles,
} from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency?: number;
}

interface SkillsSectionProps {
  skills: Skill[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    { label: 'All', value: 'All' },
    { label: 'Frontend', value: 'Frontend' },
    { label: 'Backend & DB', value: 'Backend & Database' },
    { label: 'Languages', value: 'Programming Languages' },
    { label: 'Tools & Workflow', value: 'Tools & Workflow' },
  ];

  const filteredSkills =
    selectedCategory === 'All'
      ? skills
      : skills.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="py-16 sm:py-24 lg:py-32 relative w-full">
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/40 text-indigo-700 dark:text-indigo-300 text-xs font-mono uppercase tracking-wider mb-4 shadow-sm">
            <ToolIcon className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Tech Stack</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Skills &amp; Technologies
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Languages, frameworks, databases, and operational tools I work with to build production-ready applications.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                selectedCategory === cat.value
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                  : 'bg-white dark:bg-slate-900/80 text-slate-700 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Humanized Clean Skills Grid: Clean badges with category labels instead of fake % bars */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500/50 transition-all duration-200 flex flex-col justify-between group shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {skill.name}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/60 dark:bg-indigo-400/60 mt-1.5 shrink-0 group-hover:bg-indigo-500"></span>
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span className="truncate">{skill.category}</span>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
