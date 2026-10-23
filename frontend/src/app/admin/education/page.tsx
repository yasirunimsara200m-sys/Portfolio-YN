'use client';

import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { GraduationCap, Plus, Edit2, Trash2, X } from 'lucide-react';
import { fetchApi } from '../../../lib/api';
import { initialEducations } from '../../../lib/data';

interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  status?: string;
  details?: string;
  order?: number;
}

export default function AdminEducationPage() {
  const [educations, setEducations] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEdu, setEditingEdu] = useState<Education | null>(null);

  const [formData, setFormData] = useState({
    degree: '',
    institution: '',
    period: '',
    status: 'Completed',
    details: '',
    order: 0,
  });

  const loadEducations = async () => {
    try {
      setLoading(true);
      const data = await fetchApi('/education');
      if (Array.isArray(data) && data.length > 0) {
        setEducations(data);
      } else {
        setEducations(initialEducations);
      }
    } catch (e) {
      setEducations(initialEducations);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEducations();
  }, []);

  const handleOpenAdd = () => {
    setEditingEdu(null);
    setFormData({
      degree: '',
      institution: '',
      period: '2022 – Present',
      status: 'Following',
      details: '',
      order: educations.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (edu: Education) => {
    setEditingEdu(edu);
    setFormData({
      degree: edu.degree,
      institution: edu.institution,
      period: edu.period,
      status: edu.status || 'Completed',
      details: edu.details || '',
      order: edu.order || 0,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this education entry?')) return;
    try {
      await fetchApi(`/education/${id}`, { method: 'DELETE' });
      setEducations(educations.filter((e) => e.id !== id));
    } catch (e) {
      setEducations(educations.filter((e) => e.id !== id));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingEdu) {
        const updated = await fetchApi(`/education/${editingEdu.id}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
        });
        setEducations(
          educations.map((e) => (e.id === editingEdu.id ? { ...e, ...formData, ...updated } : e)),
        );
      } else {
        const created = await fetchApi('/education', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
        setEducations([...educations, created || { ...formData, id: `edu-${Date.now()}` }]);
      }
      setIsModalOpen(false);
    } catch (err) {
      if (editingEdu) {
        setEducations(educations.map((e) => (e.id === editingEdu.id ? { ...e, ...formData } : e)));
      } else {
        setEducations([...educations, { ...formData, id: `edu-${Date.now()}` }]);
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
              Manage Education
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Degrees, diplomas, and academic milestones.
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/30"
          >
            <Plus className="w-4 h-4" />
            <span>Add Education</span>
          </button>
        </div>

        <div className="space-y-4">
          {educations.map((edu) => (
            <div
              key={edu.id}
              className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded">
                    {edu.period}
                  </span>
                  {edu.status && (
                    <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      {edu.status}
                    </span>
                  )}
                </div>
                <h3 className="text-base font-bold text-white">{edu.degree}</h3>
                <p className="text-xs text-slate-300 font-medium">{edu.institution}</p>
                {edu.details && <p className="text-xs text-slate-400 mt-2">{edu.details}</p>}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleOpenEdit(edu)}
                  className="p-2 rounded-lg bg-indigo-950 text-indigo-300 hover:bg-indigo-900 text-xs"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(edu.id)}
                  className="p-2 rounded-lg bg-rose-950 text-rose-300 hover:bg-rose-900 text-xs"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="relative w-full max-w-md bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-lg font-bold text-white mb-4">
                {editingEdu ? 'Edit Education' : 'Add Education'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                    Degree / Qualification *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.degree}
                    onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                    Institution *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                      Period *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.period}
                      onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                      Status
                    </label>
                    <input
                      type="text"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                    Details / Highlights
                  </label>
                  <textarea
                    rows={3}
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                  ></textarea>
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
                    {editingEdu ? 'Save Changes' : 'Add Education'}
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
