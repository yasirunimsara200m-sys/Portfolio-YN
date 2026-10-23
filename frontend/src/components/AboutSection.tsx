'use client';

import React from 'react';
import {
  Server,
  Layout,
  Globe,
  GitBranch,
  Shield,
  Zap,
  CheckCircle2,
} from 'lucide-react';

interface AboutSectionProps {
  aboutText: string;
}

export default function AboutSection({ aboutText }: AboutSectionProps) {
  const pillars = [
    {
      icon: Layout,
      title: 'Modern Frontend Development',
      description:
        'Building responsive, accessible, high-performance user interfaces using React, Next.js, TypeScript, and Tailwind CSS with fluid animations and design systems.',
      color: 'from-blue-500/20 to-indigo-500/20 text-indigo-600 dark:text-indigo-400',
    },
    {
      icon: Server,
      title: 'Scalable Backend & APIs',
      description:
        'Architecting robust RESTful microservices and monoliths with Nest.js, Node.js, and Django, coupled with structured relational databases (PostgreSQL, MySQL, SQLite).',
      color: 'from-indigo-500/20 to-purple-500/20 text-purple-600 dark:text-purple-400',
    },
    {
      icon: Globe,
      title: 'Cloud & Performance Monitoring',
      description:
        'Hands-on expertise in Cloudflare DNS management, website uptime checks, digital security, Wayback Machine archival analysis, and Technical SEO optimizations.',
      color: 'from-cyan-500/20 to-blue-500/20 text-cyan-600 dark:text-cyan-400',
    },
    {
      icon: GitBranch,
      title: 'Agile & Collaborative Workflow',
      description:
        'Strong team coordination skills, git branch workflows, peer code reviews, thorough unit/integration debugging, and iterative product delivery.',
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-600 dark:text-emerald-400',
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-24 lg:py-32 relative w-full">
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/40 text-indigo-700 dark:text-indigo-300 text-xs font-mono uppercase tracking-wider mb-4 shadow-sm">
            <Zap className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>About Me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Engineering High-Performance{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-300">
              Web Ecosystems
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            From frontend user experiences to scalable backend APIs and cloud monitoring, I build dependable digital products.
          </p>
        </div>

        {/* Bio Card */}
        <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 mb-12 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Undergraduate Software Engineer &amp; Full-Stack Practitioner</span>
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                {aboutText}
              </p>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span>SLIATE Higher National Diploma (HNDIT)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  <span>Experienced in React, Next.js &amp; Nest.js</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span>Associate Full-Stack Developer at Network WIZARD</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  <span>Cloudflare &amp; Technical SEO Exposure</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-50 dark:bg-slate-900/80 rounded-2xl p-6 border border-slate-200 dark:border-slate-800/80 flex flex-col justify-between space-y-4 shadow-sm">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono uppercase">Primary Focus</span>
                <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white mt-1">Full Stack Development &amp; System Coordination</p>
              </div>
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono uppercase">Base Location</span>
                <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white mt-1">Matara, Sri Lanka (Available Remote &amp; On-Site)</p>
              </div>
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono uppercase">Availability</span>
                <p className="text-sm sm:text-base font-semibold text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Ready for Immediate Roles
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-panel glass-panel-hover p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-5`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-semibold text-slate-900 dark:text-white mb-2">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
