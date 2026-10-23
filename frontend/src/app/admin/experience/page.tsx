'use client';

import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { Briefcase, Plus, Edit2, Trash2, X, Calendar, Building2 } from 'lucide-react';
import { fetchApi } from '../../../lib/api';
import { initialExperiences } from '../../../lib/data';

interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  isCurrent: boolean;
  description: string;
  technologies: string;
  order?: number;
}

export default function AdminExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);

  const [formData, setFormData] = useState({
    role: '',
    company: '',
    period: '',
    isCurrent: false,
    description: '',
    technologies: '',
    order: 0,
  });

  const loadExperiences = async () => {
    try {
      setLoading(true);
      const data = await fetchApi('/experience');
      if (Array.isArray(data) && data.length > 0) {
        setExperiences(data);
      } else {
        setExperiences(initialExperiences);
      }
    } catch (e) {
      setExperiences(initialExperiences);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExperiences();
  }, []);

  const handleOpenAdd = () => {
    setEditingExp(null);
    setFormData({
      role: '',
      company: '',
      period: '04/2026 – Present',
      isCurrent: true,
      description: '• Developed scalable web services\n• Collaborated with cross-functional teams',
      technologies: 'React, Next.js, TypeScript, Django',
      order: experiences.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (exp: Experience) => {
    setEditingExp(exp);
    let descFormatted = exp.description;
    try {
      if (exp.description.startsWith('[')) {
        descFormatted = JSON.parse(exp.description).join('\n• ');
        if (!descFormatted.startsWith('•')) descFormatted = '• ' + descFormatted;
      }
    } catch (e) {}

    setFormData({
      role: exp.role,
      company: exp.company,
      period: exp.period,
      isCurrent: exp.isCurrent,
      description: descFormatted,
      technologies: exp.technologies,
      order: exp.order || 0,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience entry?')) return;
    try {
      await fetchApi(`/experience/${id}`, { method: 'DELETE' });
      setExperiences(experiences.filter((e) => e.id !== id));
    } catch (e) {
      setExperiences(experiences.filter((e) => e.id !== id));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Convert newline bullets to JSON string for consistent storage
    const bulletList = formData.description
      .split('\n')
      .map((b) => b.replace(/^[•\-\*]\s*/, '').trim())
      .filter(Boolean);

    const payload = {
      ...formData,
      description: JSON.stringify(bulletList),
    };

    try {
      if (editingExp) {
        const updated = await fetchApi(`/experience/${editingExp.id}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
        setExperiences(
          experiences.map((exp) => (exp.id === editingExp.id ? { ...exp, ...payload, ...updated } : exp)),
        );
      } else {
        const created = await fetchApi('/experience', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        setExperiences([...experiences, created || { ...payload, id: `exp-${Date.now()}` }]);
      }
      setIsModalOpen(false);
    } catch (err) {
      if (editingExp) {
        setExperiences(
          experiences.map((exp) => (exp.id === editingExp.id ? { ...exp, ...payload } : exp)),
        );
      } else {
        setExperiences([...experiences, { ...payload, id: `exp-${Date.now()}` }]);
      }
      setIsModalOpen(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Manage Experience
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Maintain professional work history and software engineering internships.
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/30"
          >
            <Plus className="w-4 h-4" />
            <span>Add Experience Entry</span>
          </button>
        </div>

        {/* Experience Cards */}
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-start justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-indigo-950 text-indigo-300 border border-indigo-800/60">
                    {exp.period}
                  </span>
                  {exp.isCurrent && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Active
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                <p className="text-sm text-cyan-400 font-medium flex items-center gap-1.5">
                  <Building2 className="w-4 h-4" />
                  <span>{exp.company}</span>
                </p>

                <p className="text-xs text-slate-400 max-w-2xl leading-relaxed whitespace-pre-line pt-1">
                  {exp.description.startsWith('[')
                    ? JSON.parse(exp.description).join('\n• ')
                    : exp.description}
                </p>

                <p className="text-xs font-mono text-slate-500 pt-2">
                  <span className="text-slate-400">Tech:</span> {exp.technologies}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleOpenEdit(exp)}
                  className="px-3 py-1.5 rounded-lg bg-indigo-950/60 hover:bg-indigo-900 text-indigo-300 border border-indigo-800/40 text-xs flex items-center gap-1.5"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(exp.id)}
                  className="px-3 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800/40 text-xs flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add/Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="relative w-full max-w-xl bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-bold text-white mb-4">
                {editingExp ? 'Edit Experience' : 'Add Experience Entry'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                    Role / Job Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                    placeholder="e.g. Associate Full-Stack Developer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                    Company / Organization *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                    placeholder="e.g. Network WIZARD SDN BHD"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                      Period (Dates) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.period}
                      onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                      placeholder="04/2026 – Present"
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-6">
                    <input
                      type="checkbox"
                      id="isCurrent"
                      checked={formData.isCurrent}
                      onChange={(e) => setFormData({ ...formData, isCurrent: e.target.checked })}
                      className="w-4 h-4 rounded bg-slate-900 border-slate-800 text-indigo-600 focus:ring-0"
                    />
                    <label htmlFor="isCurrent" className="text-xs text-slate-300">
                      Current Position
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                    Bullet Points (One per line)
                  </label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                    placeholder="• Monitored website performance and uptime&#10;• Implemented RESTful APIs with Django&#10;• Built reactive UI components"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                    Technologies Used (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.technologies}
                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                    placeholder="React, TypeScript, Tailwind CSS, Django, Python"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 text-xs font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
                  >
                    {editingExp ? 'Save Changes' : 'Add Experience'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
