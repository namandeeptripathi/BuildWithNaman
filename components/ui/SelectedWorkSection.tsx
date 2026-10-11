'use client';

import React, { useState, useEffect } from 'react';
import { Project } from '@/types';
import { projectsData } from '@/data/projects';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { CaseStudyModal } from '@/components/ui/CaseStudyModal';
import { Reveal } from '@/components/motion/Reveal';
import { Sparkles } from 'lucide-react';

export const SelectedWorkSection: React.FC = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Deep-linking via hash (e.g. #orgtrace, #hazard-project, #devflow-ai)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const matchingProject = projectsData.find((p) => p.id === hash);
        if (matchingProject) {
          setActiveProject(matchingProject);
          setIsModalOpen(true);
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenCaseStudy = (project: Project) => {
    setActiveProject(project);
    setIsModalOpen(true);
    // Update hash for shareable URL without jumping scroll
    window.history.pushState(null, '', `#${project.id}`);
  };

  const handleCloseCaseStudy = () => {
    setIsModalOpen(false);
    // Remove hash without jumping
    window.history.pushState(null, '', window.location.pathname);
  };

  return (
    <section id="work" className="py-24 sm:py-32 relative border-t border-[#F1F2FA]/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="flex items-center justify-between flex-wrap gap-4 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2 text-xs font-mono text-[#8065FF]">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="uppercase tracking-widest">Flagship Engineering</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#F1F2FA] tracking-tight">
                Selected Work
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#9BA3BF] max-w-2xl font-sans">
                Real software implementations featuring verified architecture diagrams, technical trade-offs, and data flow pipelines.
              </p>
            </div>

            <div className="font-mono text-xs text-[#9BA3BF] bg-[#151A2C] px-3.5 py-1.5 rounded-full border border-[#F1F2FA]/10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#48BFFF] animate-pulse" />
              <span>3 VERIFIED CASE STUDIES</span>
            </div>
          </div>
        </Reveal>

        {/* Projects Grid */}
        <div className="space-y-10">
          {projectsData.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.1}>
              <ProjectCard
                project={project}
                index={index}
                onOpenCaseStudy={handleOpenCaseStudy}
              />
            </Reveal>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        project={activeProject}
        isOpen={isModalOpen}
        onClose={handleCloseCaseStudy}
      />
    </section>
  );
};
