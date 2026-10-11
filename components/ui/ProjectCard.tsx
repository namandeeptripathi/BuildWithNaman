'use client';

import React from 'react';
import { Project } from '@/types';
import { ArrowRight, Layers, Lock, Workflow } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenCaseStudy?: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  onOpenCaseStudy,
}) => {
  return (
    <article className="group relative rounded-3xl bg-[#12162A]/70 border border-[#F1F2FA]/10 p-6 sm:p-9 transition-all duration-300 hover:border-[#8065FF]/50 hover:bg-[#181E38]/90 overflow-hidden flex flex-col justify-between backdrop-blur-xl">
      {/* Background kinetic gradient accent */}
      <div
        className="pointer-events-none absolute -right-24 -top-24 w-80 h-80 rounded-full opacity-10 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
        style={{ backgroundColor: project.accentColor || '#8065FF' }}
      />

      <div>
        {/* Top telemetry row */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5 text-xs font-mono text-[#9BA3BF]">
          <div className="flex items-center gap-2">
            <span className="text-[#8065FF] font-bold">0{index + 1} {'//'}</span>
            <span className="uppercase tracking-wider">{project.category}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#48BFFF] animate-pulse" />
            <span className="text-[#CCD0E5]">{project.year}</span>
            <span className="text-[#9BA3BF]">{'//'}</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#080A12] border border-[#F1F2FA]/10 text-[#48BFFF]">
              {project.status.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Project Title & Tagline */}
        <div className="mb-4">
          <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-[#F1F2FA] group-hover:text-[#48BFFF] transition-colors flex items-center gap-2.5">
            {project.title}
          </h3>
          <p className="text-sm sm:text-base font-mono text-[#8065FF] mt-1.5 leading-snug">
            {project.tagline}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-[#9BA3BF] leading-relaxed mb-6 font-sans">
          {project.description}
        </p>

        {/* Distinctive Architectural Highlights */}
        <div className="mb-7 space-y-2.5">
          {project.highlights.map((highlight, idx) => (
            <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#CCD0E5]">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#8065FF] shrink-0" />
              <span>{highlight}</span>
            </div>
          ))}
        </div>

        {/* Real Architecture Nodes Preview Strip */}
        {project.caseStudyData && (
          <div className="mb-7 p-4 rounded-xl bg-[#080A12]/70 border border-[#F1F2FA]/5 font-mono text-xs">
            <div className="flex items-center justify-between mb-3 text-[11px] text-[#9BA3BF]">
              <span className="flex items-center gap-1.5 text-[#48BFFF]">
                <Workflow className="w-3.5 h-3.5 text-[#48BFFF]" />
                <span className="font-bold uppercase">Architecture Pipeline</span>
              </span>
              <span>{project.caseStudyData.architecture.nodes.length} Verified Components</span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {project.caseStudyData.architecture.nodes.map((node, nIdx) => (
                <React.Fragment key={node.id}>
                  <span className="px-2.5 py-1 rounded-md bg-[#151A2C] border border-[#F1F2FA]/10 text-[10px] text-[#F1F2FA]">
                    {node.name}
                  </span>
                  {nIdx < project.caseStudyData!.architecture.nodes.length - 1 && (
                    <span className="text-[#8065FF] text-[10px] font-bold">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer: Tech Stack & Actions */}
      <div className="pt-5 border-t border-[#F1F2FA]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        {/* Stack pills */}
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded text-[11px] font-mono bg-[#080A12] text-[#9BA3BF] border border-[#F1F2FA]/10"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 self-end sm:self-auto font-mono text-xs">
          {project.caseStudyData && (
            <button
              type="button"
              onClick={() => onOpenCaseStudy?.(project)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#8065FF] hover:bg-[#A38FFF] text-white font-bold transition-all shadow-md shadow-[#8065FF]/20 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Inspect Case Study &amp; Flow</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {project.caseStudyData?.verifiedStatus && (
            <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#151A2C]/80 border border-[#F1F2FA]/10 text-[#9BA3BF] text-[11px]">
              <Lock className="w-3 h-3 text-[#8065FF]" />
              <span>{project.caseStudyData.verifiedStatus.repoStatus}</span>
            </span>
          )}
        </div>
      </div>
    </article>
  );
};
