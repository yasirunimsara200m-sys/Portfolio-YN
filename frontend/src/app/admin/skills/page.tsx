'use client';

import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { Cpu, Plus, Edit2, Trash2, X } from 'lucide-react';
import { fetchApi } from '../../../lib/api';
import { initialSkills } from '../../../lib/data';

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  order?: number;
}

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Frontend',
    proficiency: 85,
    order: 0,
  });

  const loadSkills = async () => {
    try {
      setLoading(true);
      const data = await fetchApi('/skills');
      if (Array.isArray(data) && data.length > 0) {
        setSkills(data);
      } else {
        setSkills(initialSkills);
      }
    } catch (e) {
      setSkills(initialSkills);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const handleOpenAdd = () => {
    setEditingSkill(null);
    setFormData({
      name: '',
      category: 'Frontend',
      proficiency: 85,
      order: skills.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      category: skill.category,
      proficiency: skill.proficiency,
      order: skill.order || 0,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    try {
      await fetchApi(`/skills/${id}`, { method: 'DELETE' });
      setSkills(skills.filter((s) => s.id !== id));
    } catch (e) {
      setSkills(skills.filter((s) => s.id !== id));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingSkill) {
        const updated = await fetchApi(`/skills/${editingSkill.id}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
        });
        setSkills(skills.map((s) => (s.id === editingSkill.id ? { ...s, ...formData, ...updated } : s)));
      } else {
        const created = await fetchApi('/skills', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
        setSkills([...skills, created || { ...formData, id: `skill-${Date.now()}` }]);
      }
      setIsModalOpen(false);
    } catch (e) {
      if (editingSkill) {
        setSkills(skills.map((s) => (s.id === editingSkill.id ? { ...s, ...formData } : s)));
      } else {
        setSkills([...skills, { ...formData, id: `skill-${Date.now()}` }]);
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
              Manage Technical Skills
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Configure programming languages, frameworks, toolsets, and proficiency levels.
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/30"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Skill</span>
          </button>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="glass-panel p-4 rounded-xl border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-white">{skill.name}</span>
                  <span className="text-xs font-mono text-indigo-400">{skill.proficiency}%</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                  {skill.category}
                </span>

                <div className="w-full bg-slate-900 rounded-full h-1.5 mt-3 overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: `${skill.proficiency}%` }}
                  ></div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-end gap-2">
                <button
                  onClick={() => handleOpenEdit(skill)}
                  className="p-1 rounded bg-slate-900 text-slate-400 hover:text-white"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(skill.id)}
                  className="p-1 rounded bg-slate-900 text-rose-400 hover:text-rose-300"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add/Edit Modal */}
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
                {editingSkill ? 'Edit Skill' : 'Add New Skill'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                    Skill Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                    placeholder="e.g. Next.js, Django, Docker"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend & Database">Backend &amp; Database</option>
                    <option value="Programming Languages">Programming Languages</option>
                    <option value="Tools & Workflow">Tools &amp; Workflow</option>
                    <option value="Concepts">Concepts</option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-mono uppercase text-slate-400">
                      Proficiency Level
                    </label>
                    <span className="text-xs font-mono text-indigo-400">
                      {formData.proficiency}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="100"
                    value={formData.proficiency}
                    onChange={(e) =>
                      setFormData({ ...formData, proficiency: parseInt(e.target.value, 10) })
                    }
                    className="w-full accent-indigo-500 cursor-pointer"
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
                    {editingSkill ? 'Save Changes' : 'Add Skill'}
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
