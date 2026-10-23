'use client';

import React from 'react';
import {
  GraduationCap,
  Award,
  School,
  UserCheck,
  Mail,
  Phone,
  BookOpen,
} from 'lucide-react';

interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  status?: string;
  details?: string;
}

interface EducationSectionProps {
  educations: Education[];
  references: Array<{
    name: string;
    role: string;
    organization: string;
    email: string;
    phone: string;
  }>;
}

export default function EducationSection({
  educations,
  references,
}: EducationSectionProps) {
  return (
    <section id="education" className="py-16 sm:py-24 lg:py-32 relative w-full">
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/40 text-blue-700 dark:text-blue-300 text-xs font-mono uppercase tracking-wider mb-4 shadow-sm">
            <GraduationCap className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Education &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
              Credentials
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Formal technical education, foundational milestones, and verified academic references.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Education Items */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
              <School className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>Academic Qualifications</span>
            </h3>

            {educations.map((edu) => (
              <div
                key={edu.id}
                className="glass-panel glass-panel-hover p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800/50 px-2.5 py-0.5 rounded-full">
                    {edu.period}
                  </span>
                  {edu.status && (
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                      {edu.status}
                    </span>
                  )}
                </div>

                <h4 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">
                  {edu.degree}
                </h4>
                <p className="text-sm text-indigo-600 dark:text-slate-300 font-medium mt-1">
                  {edu.institution}
                </p>

                {edu.details && (
                  <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200 dark:border-slate-800/80 pt-3">
                    {edu.details}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Right Column: References */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
              <UserCheck className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              <span>Professional References</span>
            </h3>

            {references.map((ref, idx) => (
              <div
                key={idx}
                className="glass-panel glass-panel-hover p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm"
              >
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">{ref.name}</h4>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                    {ref.role}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{ref.organization}</p>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <a
                    href={`mailto:${ref.email}`}
                    className="flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{ref.email}</span>
                  </a>
                  <a
                    href={`tel:${ref.phone}`}
                    className="flex items-center gap-2 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{ref.phone}</span>
                  </a>
                </div>
              </div>
            ))}

            {/* Quick Resume Download Callout */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50 dark:from-indigo-950/40 via-purple-50 dark:via-purple-950/20 to-white dark:to-slate-900 border border-indigo-200 dark:border-indigo-500/20 shadow-md">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
                Need Full CV with Complete Certifications?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                Download my verified resume in PDF format including detailed coursework and references.
              </p>
              <a
                href="/Yasiru_Nimsara_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md shadow-indigo-600/30"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>View &amp; Download Resume</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
