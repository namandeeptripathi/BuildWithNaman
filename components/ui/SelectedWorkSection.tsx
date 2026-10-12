'use client';

import React, { useState, useEffect } from 'react';
import { Project } from '@/types';
import { projectsData } from '@/data/projects';
import { ProjectShowcaseItem } from '@/components/ui/work/ProjectShowcaseItem';
import { OrgTraceVisual } from '@/components/ui/work/OrgTraceVisual';
import { HazardProjectVisual } from '@/components/ui/work/HazardProjectVisual';
import { DevFlowAIVisual } from '@/components/ui/work/DevFlowAIVisual';
import { CaseStudyModal } from '@/components/ui/CaseStudyModal';
import { Reveal } from '@/components/motion/Reveal';

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

  const renderVisualArtifact = (projectId: string) => {
    switch (projectId) {
      case 'orgtrace':
        return <OrgTraceVisual />;
      case 'hazard-project':
        return <HazardProjectVisual />;
      case 'devflow-ai':
        return <DevFlowAIVisual />;
      default:
        return null;
    }
  };

  return (
    <section id="work" className="py-32 sm:py-40 relative border-t border-[#F1F2FA]/[0.04]">
      {/* Background ambient lighting - coordinated with hero atmosphere */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#8065FF]/[0.04] rounded-full blur-[160px] -z-10" />
      <div className="pointer-events-none absolute bottom-1/4 left-1/3 -translate-x-1/2 w-[700px] h-[350px] bg-[#48BFFF]/[0.03] rounded-full blur-[150px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Editorial Header */}
        <Reveal>
          <div className="max-w-3xl mb-24 sm:mb-32">
            <div className="flex items-center gap-2 mb-3 text-xs font-mono text-[#8065FF]">
              <span className="uppercase tracking-widest font-semibold">Selected Work</span>
              <span className="text-[#616B87]">/</span>
              <span className="text-[#9BA3BF]">01 — 03</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-[#F1F2FA] tracking-tight">
              Featured Systems
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#9BA3BF] font-sans leading-relaxed">
              Software implementations across company intelligence, geospatial risk modeling, and developer tooling.
            </p>
          </div>
        </Reveal>

        {/* Editorial Project Showcase List */}
        <div className="space-y-24 sm:space-y-32 lg:space-y-36">
          {projectsData.map((project, index) => {
            const isReversed = index % 2 === 1; // Project 2 (Hazard) is reversed
            const visual = renderVisualArtifact(project.id);

            return (
              <ProjectShowcaseItem
                key={project.id}
                project={project}
                index={index}
                visual={visual}
                isReversed={isReversed}
                onOpenCaseStudy={handleOpenCaseStudy}
              />
            );
          })}
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
