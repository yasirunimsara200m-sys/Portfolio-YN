'use client';

import React from 'react';
import { Briefcase, Calendar, Building2, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  isCurrent: boolean;
  description: string;
  technologies: string;
}

interface ExperienceSectionProps {
  experiences: Experience[];
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const parseBullets = (desc: string): string[] => {
    try {
      if (desc.startsWith('[')) {
        return JSON.parse(desc);
      }
    } catch (e) {
      // ignore
    }
    return desc
      .split('\n')
      .map((s) => s.replace(/^[•\-\*]\s*/, '').trim())
      .filter(Boolean);
  };

  return (
    <section id="experience" className="py-16 sm:py-24 lg:py-32 relative w-full">
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800/40 text-purple-700 dark:text-purple-300 text-xs font-mono uppercase tracking-wider mb-4 shadow-sm">
            <Briefcase className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>Career Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Work{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 dark:from-purple-400 dark:via-indigo-400 dark:to-cyan-300">
              Experience
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Hands-on professional engineering experience across digital platforms, full-stack systems, and national organizations.
          </p>
        </div>

        {/* Timeline container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical guideline */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-indigo-500 via-purple-500/50 to-transparent -translate-x-1/2 hidden sm:block"></div>

          <div className="space-y-12">
            {experiences.map((exp, idx) => {
              const bullets = parseBullets(exp.description);
              const techList = exp.technologies
                ? exp.technologies.split(',').map((t) => t.trim())
                : [];
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={exp.id}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Center Node on desktop */}
                  <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 top-6 w-8 h-8 rounded-full bg-white dark:bg-slate-950 border-2 border-indigo-500 items-center justify-center z-10 shadow-lg shadow-indigo-500/30">
                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 -ml-2.5"></div>
                  </div>

                  {/* Spacer for 50% split */}
                  <div className="sm:w-1/2"></div>

                  {/* Content Card */}
                  <div
                    className={`w-full sm:w-1/2 ${
                      isEven ? 'sm:pr-12' : 'sm:pl-12'
                    }`}
                  >
                    <div className="glass-panel glass-panel-hover p-6 sm:p-7 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl relative group">
                      {/* Current badge */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 text-xs font-mono text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800/50 px-2.5 py-1 rounded-full">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{exp.period}</span>
                        </span>
                        {exp.isCurrent && (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30">
                            Current Role
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {exp.role}
                      </h3>

                      <div className="flex items-center gap-2 mt-1 text-sm text-indigo-600 dark:text-cyan-400 font-semibold">
                        <Building2 className="w-4 h-4 shrink-0" />
                        <span>{exp.company}</span>
                      </div>

                      {/* Bullet points */}
                      <ul className="mt-4 space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                        {bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 text-indigo-500 dark:text-indigo-400 shrink-0 mt-0.5" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech badges */}
                      {techList.length > 0 && (
                        <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap gap-1.5">
                          {techList.map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
