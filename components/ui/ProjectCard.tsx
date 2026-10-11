'use client';

import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Project } from '@/types';

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <article className="group relative rounded-2xl bg-[#151A2C]/80 border border-[#F1F2FA]/10 p-6 sm:p-8 transition-all duration-300 hover:border-[#8065FF]/40 hover:bg-[#1A2138]/90 overflow-hidden flex flex-col justify-between">
      {/* Background kinetic gradient accent */}
      <div
        className="pointer-events-none absolute -right-20 -top-20 w-64 h-64 rounded-full opacity-10 blur-3xl transition-opacity duration-500 group-hover:opacity-25"
        style={{ backgroundColor: project.accentColor || '#8065FF' }}
      />

      <div>
        {/* Top telemetry row */}
        <div className="flex items-center justify-between gap-4 mb-4 text-xs font-mono text-[#9BA3BF]">
          <div className="flex items-center gap-2">
            <span className="text-[#8065FF] font-semibold">0{index + 1} {'//'}</span>
            <span className="uppercase tracking-wider">{project.category}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#48BFFF]" />
            <span>{project.year}</span>
          </div>
        </div>

        {/* Project Title & Tagline */}
        <div className="mb-4">
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#F1F2FA] group-hover:text-[#48BFFF] transition-colors flex items-center gap-2">
            {project.title}
          </h3>
          <p className="text-sm font-mono text-[#8065FF] mt-1">
            {project.tagline}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-[#9BA3BF] leading-relaxed mb-6 font-sans">
          {project.description}
        </p>

        {/* Architectural Highlights */}
        <div className="mb-6 space-y-2">
          {project.highlights.map((highlight, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs text-[#CCD0E5]">
              <span className="mt-1 w-1 h-1 rounded-full bg-[#8065FF] shrink-0" />
              <span>{highlight}</span>
            </div>
          ))}
        </div>

        {/* Metrics Grid */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-3 gap-2 py-3 px-3.5 mb-6 rounded-xl bg-[#080A12]/60 border border-[#F1F2FA]/5">
            {project.metrics.map((metric, idx) => (
              <div key={idx} className="text-center sm:text-left">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#9BA3BF]">
                  {metric.label}
                </div>
                <div className="text-xs sm:text-sm font-mono font-bold text-[#F1F2FA] mt-0.5">
                  {metric.value}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer: Tech Stack & Actions */}
      <div className="pt-4 border-t border-[#F1F2FA]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Stack pills */}
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#080A12]/80 text-[#9BA3BF] border border-[#F1F2FA]/5"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Links */}
        <div className="flex items-center gap-3 self-end sm:self-auto font-mono text-xs">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#9BA3BF] hover:text-[#F1F2FA] transition-colors"
              title="GitHub repository placeholder"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Code</span>
            </a>
          )}
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#48BFFF] hover:text-[#7DD3FC] transition-colors"
              title="Live demo link placeholder"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Live</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
};
