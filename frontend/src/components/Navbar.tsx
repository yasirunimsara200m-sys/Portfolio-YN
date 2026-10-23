'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ArrowUpRight, ShieldCheck, Download, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  resumeUrl?: string;
  avatarUrl?: string;
}

export default function Navbar({
  resumeUrl = '/Yasiru_Nimsara_CV.pdf',
  avatarUrl = '/avatar.jpg',
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 shadow-lg dark:shadow-2xl shadow-slate-900/5 dark:shadow-black/50 py-2.5 sm:py-3'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between gap-3">
          {/* Logo with User's Photo replacing text 'YN' */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            {/* Glowing Photo Box */}
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 p-[2px] shadow-lg shadow-indigo-500/25 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-indigo-500/40">
              <div className="relative w-full h-full rounded-[14px] overflow-hidden bg-slate-950">
                <Image
                  src={avatarUrl}
                  alt="Yasiru Nimsara"
                  fill
                  sizes="48px"
                  priority
                  className="object-cover object-top"
                />
              </div>
              {/* Online pulsing indicator on the avatar edge */}
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-950 shadow-sm animate-pulse"></span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors tracking-tight">
                  Yasiru Nimsara
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 hidden xs:inline-block"></span>
              </div>
              <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-mono tracking-wide">
                Software Engineer
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md px-5 py-2 rounded-full border border-slate-200 dark:border-slate-800/80 shadow-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800/90 transition-all font-medium"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Actions: Theme Toggle + Admin + CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Dark/Light Mode"
              className="p-2 sm:p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-sm hover:scale-105"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-indigo-600" />
              )}
            </button>

            {/* Admin link */}
            <Link
              href="/admin/login"
              title="Admin Portal"
              className="hidden sm:flex px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 hover:bg-slate-100 dark:hover:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800 transition-all text-xs font-medium items-center gap-1.5 shadow-sm"
            >
              <ShieldCheck className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
              <span className="hidden md:inline">Admin</span>
            </Link>

            {/* Contact CTA */}
            <a
              href="#contact"
              className="hidden sm:flex px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 shadow-lg shadow-indigo-600/25 transition-all hover:scale-[1.02] items-center gap-1.5"
            >
              <span>Get In Touch</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            {/* Mobile hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] bg-white/98 dark:bg-slate-950/98 backdrop-blur-2xl border-b border-slate-200 dark:border-slate-800/90 px-4 pt-4 pb-8 space-y-4 shadow-2xl transition-all animate-fade-in max-h-[calc(100vh-60px)] overflow-y-auto">
          {/* Profile mini strip inside mobile menu */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/60 mb-2">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-indigo-500/40">
              <Image
                src={avatarUrl}
                alt="Yasiru Nimsara"
                fill
                sizes="40px"
                className="object-cover object-top"
              />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">Yasiru Nimsara</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Full Stack Software Engineer</p>
            </div>
          </div>

          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900/80 rounded-xl transition-colors flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-xs text-indigo-500 dark:text-indigo-400 font-mono">#</span>
              </a>
            ))}
          </nav>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex flex-col gap-2.5">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 px-4 text-center text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 rounded-xl shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2"
            >
              <span>Get In Touch</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 text-center text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900/80 hover:bg-slate-200 dark:hover:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                <span>Resume</span>
              </a>

              <Link
                href="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 text-center text-xs font-medium text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-950/60 rounded-xl border border-indigo-200 dark:border-indigo-800/40 flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                <span>Admin Login</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
