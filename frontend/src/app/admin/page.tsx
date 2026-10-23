'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  FolderGit2,
  Cpu,
  Briefcase,
  Mail,
  Plus,
  ArrowUpRight,
  Sparkles,
  TrendingUp,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { fetchApi } from '../../lib/api';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    projectCount: 7,
    skillCount: 30,
    experienceCount: 2,
    messageCount: 1,
    unreadMessages: 1,
  });

  const [recentMessages, setRecentMessages] = useState<any[]>([]);

  useEffect(() => {
    fetchApi('/messages/stats')
      .then((data) => {
        if (data) setStats(data);
      })
      .catch(() => {});

    fetchApi('/messages')
      .then((msgs) => {
        if (Array.isArray(msgs)) {
          setRecentMessages(msgs.slice(0, 5));
        }
      })
      .catch(() => {});
  }, []);

  const statCards = [
    {
      label: 'Total Projects',
      value: stats.projectCount,
      href: '/admin/projects',
      icon: FolderGit2,
      color: 'from-blue-500/10 to-indigo-500/10 dark:from-blue-600/20 dark:to-indigo-600/20 text-indigo-600 dark:text-indigo-400',
    },
    {
      label: 'Skills Registered',
      value: stats.skillCount,
      href: '/admin/skills',
      icon: Cpu,
      color: 'from-cyan-500/10 to-teal-500/10 dark:from-cyan-600/20 dark:to-teal-600/20 text-cyan-600 dark:text-cyan-400',
    },
    {
      label: 'Experience Records',
      value: stats.experienceCount,
      href: '/admin/experience',
      icon: Briefcase,
      color: 'from-purple-500/10 to-indigo-500/10 dark:from-purple-600/20 dark:to-indigo-600/20 text-purple-600 dark:text-purple-400',
    },
    {
      label: 'Visitor Inquiries',
      value: stats.messageCount,
      unread: stats.unreadMessages,
      href: '/admin/messages',
      icon: Mail,
      color: 'from-amber-500/10 to-rose-500/10 dark:from-amber-600/20 dark:to-rose-600/20 text-amber-600 dark:text-amber-400',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Dashboard Overview
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Welcome back, Yasiru! Manage your portfolio projects, skills, and visitor inquiries.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/admin/projects"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
            >
              <Plus className="w-4 h-4" />
              <span>Add Project</span>
            </Link>
            <Link
              href="/admin/skills"
              className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 text-xs font-semibold flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Skill</span>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {statCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Link
                key={idx}
                href={card.href}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-indigo-500/40 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  {card.unread !== undefined && card.unread > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-50 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30">
                      {card.unread} New
                    </span>
                  )}
                </div>

                <div>
                  <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {card.value}
                  </span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{card.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick Management Shortcuts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Recent Messages Card */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Recent Messages &amp; Inquiries</h3>
              </div>
              <Link
                href="/admin/messages"
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {recentMessages.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-xs">
                No recent inquiries received yet.
              </div>
            ) : (
              <div className="space-y-3">
                {recentMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 flex items-start justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">{msg.name}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">({msg.email})</span>
                        {!msg.isRead && (
                          <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400"></span>
                        )}
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 font-medium mt-1">
                        {msg.subject || 'No subject'}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                        {msg.message}
                      </p>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* System & Architecture Info */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>Full-Stack Architecture</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="font-mono text-slate-500 dark:text-slate-400 uppercase text-[10px] block">Frontend</span>
                <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">Next.js 14 App Router + Tailwind CSS</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="font-mono text-slate-500 dark:text-slate-400 uppercase text-[10px] block">Cloud Database</span>
                <p className="font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">Neon Serverless PostgreSQL</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="font-mono text-slate-500 dark:text-slate-400 uppercase text-[10px] block">Backend API</span>
                <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">NestJS 10 + Prisma ORM + JWT Auth</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="font-mono text-slate-500 dark:text-slate-400 uppercase text-[10px] block">Admin Account</span>
                <p className="font-mono text-indigo-600 dark:text-indigo-400 mt-0.5">yasiru01nimsara@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
