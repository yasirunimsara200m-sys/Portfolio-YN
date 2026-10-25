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
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open to prevent background movement
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-16 sm:h-20 flex items-center bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 ${
          scrolled
            ? 'shadow-lg dark:shadow-2xl shadow-slate-900/5 dark:shadow-black/50'
            : 'shadow-sm'
        }`}
      >
        <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Logo / Brand */}
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 sm:gap-3 group shrink-0 min-w-0"
            >
              {/* Glowing Photo Box */}
              <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 p-[2px] shadow-md shadow-indigo-500/20 transition-transform duration-300 group-hover:scale-105 shrink-0">
                <div className="relative w-full h-full rounded-[10px] sm:rounded-[14px] overflow-hidden bg-slate-950">
                  <Image
                    src={avatarUrl}
                    alt="Yasiru Nimsara"
                    fill
                    sizes="44px"
                    priority
                    className="object-cover object-top"
                  />
                </div>
                {/* Online indicator */}
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-950 shadow-sm animate-pulse"></span>
              </div>

              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors tracking-tight truncate">
                    Yasiru Nimsara
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 hidden xs:inline-block shrink-0"></span>
                </div>
                <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-mono tracking-wide truncate">
                  Software Engineer
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-900/80 backdrop-blur-md px-5 py-1.5 rounded-full border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-3.5 py-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white rounded-full hover:bg-white dark:hover:bg-slate-800 transition-all font-medium"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Right Actions: Theme Toggle + Admin + CTA + Mobile Hamburger */}
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle Dark/Light Mode"
                className="p-2 sm:p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-sm"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-indigo-600" />
                )}
              </button>

              {/* Admin Portal link (hidden on small mobile) */}
              <Link
                href="/admin/login"
                title="Admin Portal"
                className="hidden sm:flex px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 transition-all text-xs font-medium items-center gap-1.5 shadow-sm"
              >
                <ShieldCheck className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                <span className="hidden md:inline">Admin</span>
              </Link>

              {/* Contact CTA (hidden on small mobile) */}
              <a
                href="#contact"
                className="hidden sm:flex px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 shadow-lg shadow-indigo-600/25 transition-all items-center gap-1.5"
              >
                <span>Get In Touch</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 sm:p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white transition-colors focus:outline-none"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Panel: Anchored exactly to the bottom of the header */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 z-50 bg-white/98 dark:bg-slate-950/98 backdrop-blur-2xl border-b border-slate-200 dark:border-slate-800 shadow-2xl px-4 py-5 space-y-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {/* Mobile Nav Links */}
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl transition-colors flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <span className="text-xs text-indigo-500 dark:text-indigo-400 font-mono">#</span>
                </a>
              ))}
            </nav>

            {/* Quick Actions */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 px-4 text-center text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 rounded-xl shadow-md shadow-indigo-600/25 flex items-center justify-center gap-2"
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
                  className="py-2.5 px-3 text-center text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center gap-1.5"
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

      {/* Dimmed backdrop when mobile menu is open - tap outside to close */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 top-16 sm:top-20 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
