'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUp, Github, Linkedin, Mail, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-auto border-t border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-950/95 py-12 relative z-10 transition-colors">
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Brand with Photo */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden p-[1.5px] bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 shrink-0 shadow-md">
                <div className="relative w-full h-full rounded-[10px] overflow-hidden bg-slate-950">
                  <Image
                    src="/avatar.jpg"
                    alt="Yasiru Nimsara"
                    fill
                    sizes="36px"
                    className="object-cover object-top"
                  />
                </div>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">Yasiru Nimsara</span>
                <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-mono">Full Stack Software Engineer</span>
              </div>
            </div>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 max-w-sm">
              Engineering scalable web applications with Next.js, Nest.js, React, Django &amp; Cloudflare.
            </p>
          </div>

          {/* Center: Social links */}
          <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-slate-600 dark:text-slate-400">
            <a
              href="https://github.com/Yazi0"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-600 dark:hover:text-white transition-colors"
            >
              GitHub
            </a>
            <span>•</span>
            <a
              href="https://www.linkedin.com/in/yasiru-nimsara/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              LinkedIn
            </a>
            <span>•</span>
            <a
              href="mailto:yasiru01nimsara@gmail.com"
              className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              Email
            </a>
            <span>•</span>
            <Link
              href="/admin/login"
              className="text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Link>
          </div>

          {/* Right: Back to top */}
          <div className="flex items-center gap-4">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} T. K. Yasiru Nimsara. All rights reserved.
            </p>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 transition-all shadow-md hover:scale-105"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
