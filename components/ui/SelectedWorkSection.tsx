'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { Project } from '@/types';
import { projectsData } from '@/data/projects';
import { ProjectShowcaseItem } from '@/components/ui/work/ProjectShowcaseItem';
import { OrgTraceVisual } from '@/components/ui/work/OrgTraceVisual';
import { HazardProjectVisual } from '@/components/ui/work/HazardProjectVisual';
import { DevFlowAIVisual } from '@/components/ui/work/DevFlowAIVisual';
import { CaseStudyModal } from '@/components/ui/CaseStudyModal';

export const SelectedWorkSection: React.FC = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const glowOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.02, 0.08, 0.08, 0.02]);
  const ambientY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

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
    <section
      ref={sectionRef}
      id="work"
      className="py-32 sm:py-40 relative"
    >
      {/* Seamless transition light blade from Hero into Selected Work */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8065FF]/25 to-transparent pointer-events-none" />

      {/* Background ambient lighting - coordinated with cosmic core */}
      <motion.div
        style={{
          opacity: shouldReduceMotion ? 0.04 : glowOpacity,
          y: shouldReduceMotion ? 0 : ambientY,
        }}
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#8065FF] rounded-full blur-[160px] -z-10"
      />
      <div className="pointer-events-none absolute bottom-1/4 left-1/3 -translate-x-1/2 w-[700px] h-[350px] bg-[#48BFFF]/[0.03] rounded-full blur-[150px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Choreographed Editorial Header */}
        <div className="max-w-3xl mb-24 sm:mb-32">
          {/* Eyebrow */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
            className="flex items-center gap-2 mb-3 text-xs font-mono text-[#8065FF]"
          >
            <span className="uppercase tracking-widest font-semibold">Selected Work</span>
            <span className="text-[#616B87]">/</span>
            <span className="text-[#9BA3BF]">01 — 03</span>
          </motion.div>

          {/* Masked Title Reveal */}
          <div className="overflow-hidden">
            <motion.h2
              initial={shouldReduceMotion ? false : { y: '100%', opacity: 0.4 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] as const }}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-[#F1F2FA] tracking-tight leading-[1.08]"
            >
              Featured Systems
            </motion.h2>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
            className="mt-4 text-base sm:text-lg text-[#9BA3BF] font-sans leading-relaxed"
          >
            Software implementations across company intelligence, geospatial risk modeling, and developer tooling.
          </motion.p>
        </div>

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
