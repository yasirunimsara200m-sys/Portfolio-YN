'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import HeroBackgroundAnimation from './HeroBackgroundAnimation';
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  FileText,
  ArrowRight,
  Code2,
  Terminal,
  Database,
  Layers,
  Sparkles,
  CheckCircle,
} from 'lucide-react';

interface HeroSectionProps {
  profile: {
    fullName: string;
    title: string;
    bio: string;
    email: string;
    phone: string;
    location: string;
    githubUrl?: string;
    linkedinUrl?: string;
    resumeUrl?: string;
    avatarUrl?: string;
    yearsExperience?: string;
  };
}

export default function HeroSection({ profile }: HeroSectionProps) {
  const [activePhoto, setActivePhoto] = useState<string>('/yasiru-seated.jpg');

  const stats = [
    { label: 'Years Experience', value: profile.yearsExperience || '1+ Yrs' },
    { label: 'Full-Stack Projects', value: '7+' },
    { label: 'Technical Skills', value: '30+' },
    { label: 'Code Quality', value: '100%' },
  ];

  return (
    <section className="relative pt-24 sm:pt-32 lg:pt-40 pb-16 sm:pb-24 lg:pb-32 overflow-hidden w-full">
      {/* Animated Interactive Particle Background */}
      <HeroBackgroundAnimation />

      {/* Decorative gradient background glows */}
      <div className="absolute top-1/4 -left-32 w-72 sm:w-96 h-72 sm:h-96 bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/3 -right-32 w-72 sm:w-96 h-72 sm:h-96 bg-cyan-500/10 dark:bg-cyan-600/15 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-14 items-center">
          {/* Left Column: Headline & Intro */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm font-medium mb-5 sm:mb-6 backdrop-blur-md shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>Available for Software Engineering Roles</span>
            </div>

            {/* Main Greeting & Name */}
            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              Hi, I&apos;m{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 dark:from-indigo-400 dark:via-purple-300 dark:to-cyan-300">
                {profile.fullName || 'Yasiru Nimsara'}
              </span>
            </h1>

            {/* Role Title with Terminal Look */}
            <div className="mt-3 sm:mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-300 text-base sm:text-xl lg:text-2xl font-semibold shadow-sm">
              <span className="text-indigo-600 dark:text-indigo-400 font-mono text-sm sm:text-base">&gt;</span>
              <span>{profile.title || 'Full Stack Software Engineer'}</span>
              <span className="w-2 h-4 bg-indigo-500 dark:bg-indigo-400 animate-pulse"></span>
            </div>

            {/* Bio description */}
            <p className="mt-5 text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300/90 max-w-2xl leading-relaxed">
              {profile.bio ||
                'Software Engineering undergraduate (HNDIT) & Full-Stack Developer specializing in modern web applications with React, Next.js, Django, Nest.js, and cloud technologies.'}
            </p>

            {/* Location / Meta chips */}
            <div className="mt-6 flex flex-wrap items-center gap-2.5 sm:gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <MapPin className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span>{profile.location || 'Matara, Sri Lanka'}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <span className="truncate max-w-[200px] xs:max-w-none">{profile.email || 'yasiru01nimsara@gmail.com'}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <a
                href="#projects"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 shadow-xl shadow-indigo-600/25 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="flex-1 sm:flex-initial px-5 py-3.5 rounded-xl font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900/90 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 transition-all hover:border-slate-400 dark:hover:border-slate-500 text-center text-sm sm:text-base shadow-sm"
              >
                <span>Contact Me</span>
              </a>

              <a
                href={profile.resumeUrl || '/Yasiru_Nimsara_CV.pdf'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial px-5 py-3.5 rounded-xl font-semibold text-indigo-700 dark:text-indigo-300 hover:text-indigo-900 dark:hover:text-white bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-700/40 transition-all flex items-center justify-center gap-2 text-sm sm:text-base shadow-sm"
              >
                <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Resume CV</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="mt-8 flex items-center gap-3">
              <span className="text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono">Connect:</span>
              {profile.githubUrl && (
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:border-indigo-500/50 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-all shadow-sm"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
              {profile.linkedinUrl && (
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500/50 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-all shadow-sm"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              <a
                href={`mailto:${profile.email}`}
                className="p-2.5 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-50 dark:hover:bg-cyan-950/40 transition-all shadow-sm"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Column: Visual Portrait Card with Photo Selector */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center relative mt-6 lg:mt-0">
            <div className="relative w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[420px] aspect-[4/5] rounded-3xl p-3 bg-gradient-to-b from-slate-200/90 via-slate-100 to-white dark:from-slate-800/80 dark:via-slate-900/90 dark:to-slate-950 border border-slate-300 dark:border-slate-700/60 shadow-2xl">
              {/* Outer Glow Ring */}
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-indigo-500 via-purple-600 to-cyan-500 opacity-20 dark:opacity-25 blur-2xl animate-pulse-slow"></div>

              {/* Photo Viewport */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-950 shadow-inner">
                <Image
                  src={activePhoto}
                  alt={profile.fullName || 'Yasiru Nimsara'}
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  priority
                  className="object-cover object-top hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/15 to-transparent"></div>

                {/* Bottom Overlay Badge with photo switcher */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>Yasiru Nimsara</span>
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                    </p>
                    <p className="text-[10px] text-slate-300 font-mono">React · Next · Nest · Django</p>
                  </div>

                  {/* Toggle button between suit portraits */}
                  <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-800 text-[10px]">
                    <button
                      onClick={() => setActivePhoto('/yasiru-seated.jpg')}
                      className={`px-2 py-0.5 rounded font-mono transition-all ${
                        activePhoto === '/yasiru-seated.jpg'
                          ? 'bg-indigo-600 text-white font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      P1
                    </button>
                    <button
                      onClick={() => setActivePhoto('/profile.jpg')}
                      className={`px-2 py-0.5 rounded font-mono transition-all ${
                        activePhoto === '/profile.jpg'
                          ? 'bg-indigo-600 text-white font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      P2
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Tech Badges */}
              <div className="absolute -top-3 -left-3 bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700/80 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-xl flex items-center gap-2 animate-float">
                <Code2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="text-xs font-mono font-medium text-slate-800 dark:text-slate-200">Next.js &amp; Nest.js</span>
              </div>

              <div
                className="absolute -bottom-3 -right-3 bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700/80 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-xl flex items-center gap-2 animate-float"
                style={{ animationDelay: '1.5s' }}
              >
                <Database className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span className="text-xs font-mono font-medium text-slate-800 dark:text-slate-200">Django &amp; PostgreSQL</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid Strip - Responsive 2x2 on mobile, 4 on desktop */}
        <div className="mt-14 sm:mt-20 lg:mt-24 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="glass-panel glass-panel-hover p-4 sm:p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-md border border-slate-200 dark:border-slate-800"
            >
              <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 dark:from-indigo-400 dark:via-purple-300 dark:to-cyan-300">
                {stat.value}
              </span>
              <span className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
