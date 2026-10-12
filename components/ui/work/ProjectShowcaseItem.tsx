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
  isReversed = false,
  onOpenCaseStudy,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLElement>(null);
  const numberStr = `0${index + 1}`;

  // Top 2 architectural highlights for clean, editorial scannability
  const primaryHighlights = project.highlights.slice(0, 2);

  // Top 5 primary stack pills
  const primaryStack = project.stack.slice(0, 5);

  // Restrained desktop parallax between text and artwork
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const visualParallaxY = useTransform(scrollYProgress, [0, 1], [-12, 12]);
  const textParallaxY = useTransform(scrollYProgress, [0, 1], [8, -8]);

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

      {/* Project Title & Tagline */}
      <div className="mb-4">
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#F1F2FA] tracking-tight group-hover:text-[#48BFFF] transition-colors duration-500">
          {project.title}
        </h3>
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
              className="px-2.5 py-1 rounded text-[11px] font-mono bg-[#080A12]/80 text-[#9BA3BF] border border-[#F1F2FA]/[0.08]"
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

  return (
    <article
      ref={cardRef}
      id={project.id}
      className="scroll-mt-28 relative rounded-3xl bg-[#0D1122]/35 border border-[#F1F2FA]/[0.07] p-6 sm:p-8 lg:p-11 transition-all duration-700 hover:border-[#8065FF]/25 hover:bg-[#12162A]/50 backdrop-blur-xl group"
    >
      {/* Mobile Title Block: always visible at the top on mobile, hidden on desktop */}
      <div className="block lg:hidden mb-6">
        {headerBlock}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {isReversed ? (
          <>
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7"
            >
              <motion.div style={{ y: shouldReduceMotion ? 0 : visualParallaxY }}>
                {visual}
              </motion.div>
            </motion.div>
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5"
            >
              <motion.div style={{ y: shouldReduceMotion ? 0 : textParallaxY }}>
                {textContent}
              </motion.div>
            </motion.div>
          </>
        ) : (
          <>
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5"
            >
              <motion.div style={{ y: shouldReduceMotion ? 0 : textParallaxY }}>
                {textContent}
              </motion.div>
            </motion.div>
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7"
            >
              <motion.div style={{ y: shouldReduceMotion ? 0 : visualParallaxY }}>
                {visual}
              </motion.div>
            </motion.div>
          </>
        )}
      </div>
    </article>
  );
};
