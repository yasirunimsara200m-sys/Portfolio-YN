'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SkillsSection from '../components/SkillsSection';
import TechTicker from '../components/TechTicker';
import ExperienceSection from '../components/ExperienceSection';
import ProjectsSection from '../components/ProjectsSection';
import EducationSection from '../components/EducationSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import Preloader from '../components/Preloader';

import {
  initialProfile,
  initialSkills,
  initialExperiences,
  initialProjects,
  initialEducations,
  references,
} from '../lib/data';
import { fetchApi } from '../lib/api';

export default function HomePage() {
  const [profile, setProfile] = useState(initialProfile);
  const [skills, setSkills] = useState(initialSkills);
  const [experiences, setExperiences] = useState(initialExperiences);
  const [projects, setProjects] = useState(initialProjects);
  const [educations, setEducations] = useState(initialEducations);

  useEffect(() => {
    // Attempt dynamic fetch from backend
    const loadDynamicData = async () => {
      try {
        const [profData, skillsData, expData, projData, eduData] = await Promise.allSettled([
          fetchApi('/profile'),
          fetchApi('/skills'),
          fetchApi('/experience'),
          fetchApi('/projects'),
          fetchApi('/education'),
        ]);

        if (profData.status === 'fulfilled' && profData.value) {
          setProfile((prev) => ({ ...prev, ...profData.value }));
        }
        if (skillsData.status === 'fulfilled' && Array.isArray(skillsData.value) && skillsData.value.length > 0) {
          setSkills(skillsData.value);
        }
        if (expData.status === 'fulfilled' && Array.isArray(expData.value) && expData.value.length > 0) {
          setExperiences(expData.value);
        }
        if (projData.status === 'fulfilled' && Array.isArray(projData.value) && projData.value.length > 0) {
          setProjects(projData.value);
        }
        if (eduData.status === 'fulfilled' && Array.isArray(eduData.value) && eduData.value.length > 0) {
          setEducations(eduData.value);
        }
      } catch (e) {
        console.warn('Backend currently syncing, using pre-populated CV data.');
      }
    };

    loadDynamicData();
  }, []);

  return (
    <main className="min-h-screen flex flex-col w-full overflow-x-hidden">
      <Preloader />
      <Navbar resumeUrl={profile.resumeUrl} avatarUrl={profile.avatarUrl || '/avatar.jpg'} />
      <HeroSection profile={profile} />
      <AboutSection aboutText={profile.about} />
      <SkillsSection skills={skills} />
      <TechTicker />
      <ExperienceSection experiences={experiences} />
      <ProjectsSection projects={projects} />
      <EducationSection educations={educations} references={references} />
      <ContactSection
        email={profile.email}
        phone={profile.phone}
        location={profile.location}
        githubUrl={profile.githubUrl}
        linkedinUrl={profile.linkedinUrl}
      />
      <Footer />
    </main>
  );
}
