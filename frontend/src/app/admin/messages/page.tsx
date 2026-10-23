'use client';

import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { Mail, Check, Trash2, Reply, Clock, AlertCircle } from 'lucide-react';
import { fetchApi } from '../../../lib/api';

interface Message {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const data = await fetchApi('/messages');
      if (Array.isArray(data)) {
        setMessages(data);
      }
    } catch (e) {
      // Fallback initial
      setMessages([
        {
          id: 'msg-welcome',
          name: 'System Welcome',
          email: 'visitor@example.com',
          subject: 'Welcome to your Portfolio Admin Panel',
          message: 'Hello Yasiru! Your portfolio and admin panel are ready. You can edit projects, skills, and profile details anytime from here.',
          isRead: false,
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleMarkAsRead = async (id: string) => {
    try {
      await fetchApi(`/messages/${id}/read`, { method: 'PATCH' });
      setMessages(messages.map((m) => (m.id === id ? { ...m, isRead: true } : m)));
    } catch (e) {
      setMessages(messages.map((m) => (m.id === id ? { ...m, isRead: true } : m)));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      await fetchApi(`/messages/${id}`, { method: 'DELETE' });
      setMessages(messages.filter((m) => m.id !== id));
    } catch (e) {
      setMessages(messages.filter((m) => m.id !== id));
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Inbox Messages &amp; Inquiries
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Visitor submissions, recruitment requests, and project collaboration notes.
          </p>
        </div>

        {messages.length === 0 ? (
          <div className="glass-panel p-12 text-center rounded-2xl border border-slate-800 text-slate-400">
            <Mail className="w-8 h-8 text-slate-500 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Your inbox is empty.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`glass-panel p-5 rounded-2xl border transition-all ${
                  msg.isRead
                    ? 'border-slate-800/80 bg-slate-950/40'
                    : 'border-indigo-500/40 bg-slate-900/60 shadow-lg shadow-indigo-500/5'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-white">{msg.name}</span>
                      <a
                        href={`mailto:${msg.email}`}
                        className="text-xs font-mono text-indigo-400 hover:underline"
                      >
                        {msg.email}
                      </a>
                      {!msg.isRead && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-indigo-500 text-white">
                          NEW
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-semibold text-slate-200 mt-1">
                      {msg.subject || '(No subject)'}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed whitespace-pre-line bg-slate-950/50 p-3 rounded-xl border border-slate-800/60">
                      {msg.message}
                    </p>

                    <span className="text-[10px] font-mono text-slate-500 mt-2 inline-block">
                      Received: {new Date(msg.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0">
                    <a
                      href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'Portfolio Inquiry')}`}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium flex items-center gap-1.5"
                    >
                      <Reply className="w-3.5 h-3.5" />
                      <span>Reply</span>
                    </a>

                    {!msg.isRead && (
                      <button
                        onClick={() => handleMarkAsRead(msg.id)}
                        className="p-1.5 rounded-lg bg-slate-900 text-slate-300 hover:text-white border border-slate-800 text-xs"
                        title="Mark as Read"
                      >
                        <Check className="w-4 h-4 text-emerald-400" />
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(msg.id)}
                      className="p-1.5 rounded-lg bg-slate-900 text-rose-400 hover:text-rose-300 border border-slate-800 text-xs"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
