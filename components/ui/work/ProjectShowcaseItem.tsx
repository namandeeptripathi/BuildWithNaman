'use client';

import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { Project } from '@/types';
import { ArrowRight, Layers, Lock } from 'lucide-react';

interface ProjectShowcaseItemProps {
  project: Project;
  index: number;
  visual: React.ReactNode;
  isReversed?: boolean;
  onOpenCaseStudy: (project: Project) => void;
}

export const ProjectShowcaseItem: React.FC<ProjectShowcaseItemProps> = ({
  project,
  index,
  visual,
  onOpenCaseStudy,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const sceneRef = useRef<HTMLElement>(null);
  const numberStr = `0${index + 1}`;

  // Top 2 architectural highlights for clean, editorial scannability
  const primaryHighlights = project.highlights.slice(0, 2);

  // Top 5 primary stack pills
  const primaryStack = project.stack.slice(0, 5);

  // Scroll progress through this specific project scene
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ['start end', 'end start'],
  });

  // Scene-specific exit and parallax transforms
  const isOrgTrace = project.id === 'orgtrace';
  const isHazard = project.id === 'hazard-project';

  // OrgTrace: Scene exit recession as user scrolls toward Hazard Project
  const orgTraceExitScale = useTransform(scrollYProgress, [0.72, 1], [1, 0.94]);
  const orgTraceExitOpacity = useTransform(scrollYProgress, [0.78, 1], [1, 0.25]);

  // Hazard: Differentiated cross-parallax
  const hazardVisualParallaxY = useTransform(scrollYProgress, [0, 1], [-24, 24]);
  const hazardTextParallaxY = useTransform(scrollYProgress, [0, 1], [16, -16]);

  // DevFlow: Perspective scale exit into Manifesto
  const devFlowExitScale = useTransform(scrollYProgress, [0.75, 1], [1, 0.95]);
  const devFlowExitOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0.3]);

  // Clone visual and pass scrollProgress MotionValue
  const visualWithScroll = React.isValidElement(visual)
    ? React.cloneElement(
        visual as React.ReactElement<{ scrollProgress?: typeof scrollYProgress }>,
        { scrollProgress: scrollYProgress }
      )
    : visual;

  const headerBlock = (
    <div>
      {/* Editorial Meta Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-[#8065FF] font-bold">{numberStr} {'//'}</span>
          <span className="text-[#9BA3BF] uppercase tracking-wider text-[11px]">
            {project.category}
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-[#CCD0E5]">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: project.accentColor || '#8065FF' }}
          />
          <span>{project.year}</span>
        </div>
      </div>

      {/* Project Title & Tagline with Masked Reveal */}
      <div className="mb-4">
        <div className="overflow-hidden">
          <motion.h3
            initial={shouldReduceMotion ? false : { y: '100%', opacity: 0.3 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#F1F2FA] tracking-tight group-hover:text-[#48BFFF] transition-colors duration-500 leading-tight"
          >
            {project.title}
          </motion.h3>
        </div>
        <p
          className="text-sm sm:text-base font-mono mt-2 leading-relaxed"
          style={{ color: project.accentColor || '#8065FF' }}
        >
          {project.tagline}
        </p>
      </div>
    </div>
  );

  const textContent = (
    <div className="flex flex-col justify-between h-full space-y-6">
      <div>
        {/* Desktop Header: visible on lg+, hidden on mobile */}
        <div className="hidden lg:block">
          {headerBlock}
        </div>

        {/* Concise Description */}
        <p className="text-sm sm:text-base text-[#9BA3BF] leading-relaxed font-sans mb-6">
          {project.description}
        </p>

        {/* Curated Architectural Distinctions */}
        <div className="mb-6 space-y-2.5">
          {primaryHighlights.map((highlight, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#CCD0E5]">
              <span
                className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: project.accentColor || '#8065FF' }}
              />
              <span className="leading-snug">{highlight}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer / Stack & Primary CTA */}
      <div className="pt-6 border-t border-[#F1F2FA]/[0.08] flex flex-col gap-4">
        {/* Primary Stack Pills */}
        <div className="flex flex-wrap gap-1.5">
          {primaryStack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-[#151A2C]/80 text-[#9BA3BF] border border-[#F1F2FA]/[0.08]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          <button
            type="button"
            id={`inspect-btn-${project.id}`}
            onClick={() => onOpenCaseStudy(project)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#8065FF] hover:bg-[#9179FF] text-white font-bold transition-all duration-300 shadow-md shadow-[#8065FF]/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer whitespace-nowrap"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Inspect Case Study &amp; Flow</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {project.caseStudyData?.verifiedStatus && (
            <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#151A2C]/60 border border-[#F1F2FA]/[0.08] text-[#9BA3BF] text-[11px] whitespace-nowrap">
              <Lock className="w-3 h-3 text-[#8065FF]" />
              <span>{project.caseStudyData.verifiedStatus.repoStatus}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );

  // BESPOKE SCENE 1: ORGTRACE (Entity Intelligence Constellation with Sticky Staging)
  if (isOrgTrace) {
    return (
      <section
        ref={sceneRef}
        id={project.id}
        className="scroll-mt-24 relative min-h-[110vh] lg:min-h-[145vh] py-10 lg:py-16"
      >
        {/* Mobile Title Block */}
        <div className="block lg:hidden mb-6 px-2">
          {headerBlock}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Text Content Column */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] as const }}
            className="lg:col-span-5 relative z-10"
          >
            <div className="p-6 sm:p-8 rounded-3xl bg-[#090C19]/60 border border-[#8065FF]/15 backdrop-blur-xl shadow-xl">
              {textContent}
            </div>
          </motion.div>

          {/* Sticky Constellation Stage on Desktop */}
          <motion.div
            style={{
              scale: shouldReduceMotion ? 1 : orgTraceExitScale,
              opacity: shouldReduceMotion ? 1 : orgTraceExitOpacity,
            }}
            className="lg:col-span-7 lg:sticky lg:top-24 self-start w-full"
          >
            {visualWithScroll}
          </motion.div>
        </div>
      </section>
    );
  }

  // BESPOKE SCENE 2: HAZARD PROJECT (Widescreen Spatial Cartography Landscape)
  if (isHazard) {
    return (
      <section
        ref={sceneRef}
        id={project.id}
        className="scroll-mt-24 relative py-12 lg:py-20"
      >
        {/* Mobile Title Block */}
        <div className="block lg:hidden mb-6 px-2">
          {headerBlock}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Spatial Cartography Visual on Left */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] as const }}
            className="lg:col-span-7 w-full"
          >
            <motion.div style={{ y: shouldReduceMotion ? 0 : hazardVisualParallaxY }}>
              {visualWithScroll}
            </motion.div>
          </motion.div>

          {/* Editorial Spatial Risk Analysis Text on Right */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] as const }}
            className="lg:col-span-5"
          >
            <motion.div
              style={{ y: shouldReduceMotion ? 0 : hazardTextParallaxY }}
              className="p-6 sm:p-8 rounded-3xl bg-[#090C19]/60 border border-[#48BFFF]/15 backdrop-blur-xl shadow-xl"
            >
              {textContent}
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  }

  // BESPOKE SCENE 3: DEVFLOW AI (Architectural Holographic Workbench)
  return (
    <section
      ref={sceneRef}
      id={project.id}
      className="scroll-mt-24 relative py-12 lg:py-20"
    >
      {/* Mobile Title Block */}
      <div className="block lg:hidden mb-6 px-2">
        {headerBlock}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* Developer Tooling Narrative on Left */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] as const }}
          className="lg:col-span-5"
        >
          <div className="p-6 sm:p-8 rounded-3xl bg-[#090C19]/60 border border-[#8065FF]/15 backdrop-blur-xl shadow-xl">
            {textContent}
          </div>
        </motion.div>

        {/* 3D Holographic Workbench on Right */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] as const }}
          style={{
            scale: shouldReduceMotion ? 1 : devFlowExitScale,
            opacity: shouldReduceMotion ? 1 : devFlowExitOpacity,
          }}
          className="lg:col-span-7 w-full"
        >
          {visualWithScroll}
        </motion.div>
      </div>
    </section>
  );
};
