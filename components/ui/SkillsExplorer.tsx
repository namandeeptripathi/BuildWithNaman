'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Code2,
  ExternalLink,
  CheckCircle2,
  Layers,
  Sparkles,
  Database,
  Cpu,
  Brain,
  Wrench,
  Globe,
  Terminal,
} from 'lucide-react';
import { SkillCategory } from '@/types';
import { skillsData, skillCategories } from '@/data/skills';
import { Reveal } from '@/components/motion/Reveal';

const categoryIcons: Record<SkillCategory, React.ComponentType<{ className?: string }>> = {
  Languages: Terminal,
  Frontend: Globe,
  'Backend & APIs': Database,
  'AI & Data': Brain,
  'Infrastructure & Tools': Wrench,
};

export const SkillsExplorer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | 'All'>('All');
  const [selectedSkillId, setSelectedSkillId] = useState<string>('typescript');

  // Filter skills based on selected category
  const filteredSkills = useMemo(() => {
    if (selectedCategory === 'All') return skillsData;
    return skillsData.filter((skill) => skill.category === selectedCategory);
  }, [selectedCategory]);

  // Selected skill instance with fallback to first filtered item
  const selectedSkill = useMemo(() => {
    const found = skillsData.find((s) => s.id === selectedSkillId);
    if (found && (selectedCategory === 'All' || found.category === selectedCategory)) {
      return found;
    }
    return filteredSkills[0] || skillsData[0];
  }, [selectedSkillId, selectedCategory, filteredSkills]);

  // Handle category change: update category and auto-select appropriate skill
  const handleCategorySelect = (category: SkillCategory | 'All') => {
    setSelectedCategory(category);
    if (category !== 'All') {
      const match = skillsData.find((s) => s.category === category);
      if (match) setSelectedSkillId(match.id);
    }
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: skillsData.length };
    for (const skill of skillsData) {
      counts[skill.category] = (counts[skill.category] || 0) + 1;
    }
    return counts;
  }, []);

  return (
    <div className="w-full">
      {/* Editorial Section Header */}
      <Reveal>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#F1F2FA]/10">
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs font-mono text-[#48BFFF]">
              <Cpu className="w-3.5 h-3.5" />
              <span className="uppercase tracking-widest">Evidence-Backed Toolkit</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-display font-bold text-[#F1F2FA] tracking-tight">
              Interactive Skills Explorer
            </h3>
            <p className="mt-2 text-sm sm:text-base text-[#9BA3BF] max-w-2xl font-sans">
              Every technology is anchored in verifiable implementation details and active repositories—not hypothetical percentages or inflated seniority titles.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-[#9BA3BF] bg-[#151A2C]/60 px-4 py-2 rounded-xl border border-[#F1F2FA]/10 self-start md:self-auto shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#48BFFF] animate-pulse" />
            <span className="text-[#F1F2FA] font-medium">{skillsData.length} Technologies</span>
            <span className="text-[#9BA3BF]/40">|</span>
            <span className="text-[#8065FF]">4 Target Repositories</span>
          </div>
        </div>
      </Reveal>

      {/* Category Segmented Control / Filter Pills */}
      <Reveal delay={0.1}>
        <div
          role="tablist"
          aria-label="Filter skills by engineering domain"
          className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth"
        >
          {skillCategories.map((category) => {
            const isSelected = selectedCategory === category;
            const count = categoryCounts[category] || 0;
            return (
              <button
                key={category}
                id={`skill-cat-${category.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                role="tab"
                aria-selected={isSelected}
                tabIndex={0}
                onClick={() => handleCategorySelect(category)}
                className={`relative px-4 py-2 rounded-full text-xs font-mono whitespace-nowrap transition-all duration-200 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#48BFFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080A12] cursor-pointer ${
                  isSelected
                    ? 'text-[#F1F2FA] bg-[#8065FF] shadow-lg shadow-[#8065FF]/25 font-semibold'
                    : 'text-[#9BA3BF] bg-[#151A2C]/50 border border-[#F1F2FA]/10 hover:text-[#F1F2FA] hover:border-[#8065FF]/30'
                }`}
              >
                <span>{category}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-[#151A2C] text-[#9BA3BF] border border-[#F1F2FA]/10'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* Master-Detail Explorer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Skill Matrix Tiles */}
        <div className="lg:col-span-7">
          <div
            role="region"
            aria-label="Technical skills directory"
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill) => {
                const isSelected = selectedSkill.id === skill.id;
                const IconComponent = categoryIcons[skill.category] || Code2;
                const hasProjects = skill.projectLinks.length > 0;

                return (
                  <motion.button
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    key={skill.id}
                    id={`skill-tile-${skill.id}`}
                    type="button"
                    onClick={() => setSelectedSkillId(skill.id)}
                    aria-selected={isSelected}
                    className={`relative text-left p-4 rounded-xl border transition-all duration-200 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#48BFFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080A12] ${
                      isSelected
                        ? 'bg-[#151A2C] border-[#8065FF] shadow-lg shadow-[#8065FF]/15 ring-1 ring-[#8065FF]/40'
                        : 'bg-[#151A2C]/40 border-[#F1F2FA]/10 hover:border-[#8065FF]/30 hover:bg-[#151A2C]/70'
                    }`}
                  >
                    {/* Active Selection Glow Accent */}
                    {isSelected && (
                      <div className="absolute top-0 right-0 w-16 h-16 bg-[#8065FF]/10 blur-xl rounded-full pointer-events-none" />
                    )}

                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`p-1.5 rounded-lg transition-colors ${
                            isSelected
                              ? 'bg-[#8065FF]/20 text-[#8065FF]'
                              : 'bg-[#151A2C] text-[#9BA3BF] group-hover:text-[#48BFFF]'
                          }`}
                        >
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <h4
                          className={`text-sm font-semibold tracking-tight transition-colors ${
                            isSelected
                              ? 'text-[#F1F2FA]'
                              : 'text-[#CCD0E5] group-hover:text-[#F1F2FA]'
                          }`}
                        >
                          {skill.name}
                        </h4>
                      </div>

                      {/* Project Link Count Indicator */}
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-md shrink-0 transition-colors ${
                          hasProjects
                            ? isSelected
                              ? 'bg-[#48BFFF]/20 text-[#48BFFF] border border-[#48BFFF]/30'
                              : 'bg-[#151A2C] text-[#9BA3BF] border border-[#F1F2FA]/10'
                            : 'bg-[#151A2C]/40 text-[#9BA3BF]/60 border border-transparent'
                        }`}
                      >
                        {hasProjects
                          ? `${skill.projectLinks.length} ${
                              skill.projectLinks.length === 1 ? 'Project' : 'Projects'
                            }`
                          : 'Core Tool'}
                      </span>
                    </div>

                    <p className="text-xs text-[#9BA3BF] line-clamp-2 leading-relaxed">
                      {skill.description}
                    </p>

                    {/* Subtle Active Indicator Bar */}
                    <div className="mt-3 pt-2.5 border-t border-[#F1F2FA]/5 flex items-center justify-between text-[11px] font-mono">
                      <span className="text-[#9BA3BF]/70 text-[10px] uppercase">
                        {skill.category}
                      </span>
                      {isSelected ? (
                        <span className="text-[#8065FF] text-[10px] flex items-center gap-1 font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8065FF] animate-ping" />
                          INSPECTING
                        </span>
                      ) : (
                        <span className="text-[#9BA3BF]/40 group-hover:text-[#9BA3BF] text-[10px] transition-colors">
                          Click to inspect →
                        </span>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: Selected Skill Details & Evidence Inspector */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="p-6 sm:p-7 rounded-2xl bg-[#151A2C]/80 border border-[#8065FF]/30 shadow-2xl shadow-[#8065FF]/5 backdrop-blur-xl relative overflow-hidden">
            {/* Top Atmospheric Ambient Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#8065FF]/10 blur-3xl pointer-events-none rounded-full" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#48BFFF]/5 blur-2xl pointer-events-none rounded-full" />

            {/* Inspector Header */}
            <div className="relative z-10">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-medium tracking-wider uppercase bg-[#8065FF]/20 text-[#8065FF] border border-[#8065FF]/30">
                    {selectedSkill.category}
                  </span>
                  <span className="text-xs font-mono text-[#9BA3BF]">
                    ID: {selectedSkill.id}
                  </span>
                </div>

                {selectedSkill.projectLinks.length > 0 ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-mono font-medium bg-[#48BFFF]/10 text-[#48BFFF] border border-[#48BFFF]/30">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>EVIDENCE VERIFIED</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-mono text-[#9BA3BF] bg-[#151A2C] border border-[#F1F2FA]/10">
                    <span>FOUNDATIONAL TOOLKIT</span>
                  </span>
                )}
              </div>

              <h4 className="text-2xl font-display font-bold text-[#F1F2FA] tracking-tight mb-2">
                {selectedSkill.name}
              </h4>
              <p className="text-sm text-[#CCD0E5] leading-relaxed mb-6">
                {selectedSkill.description}
              </p>
            </div>

            {/* Engineering Responsibility / Daily Usage Context */}
            <div className="relative z-10 mb-6 p-4 rounded-xl bg-[#080A12]/60 border border-[#F1F2FA]/10">
              <div className="flex items-center gap-2 mb-2 text-xs font-mono text-[#48BFFF]">
                <Layers className="w-3.5 h-3.5" />
                <span className="uppercase tracking-wider">Implementation Context</span>
              </div>
              <p className="text-xs sm:text-sm text-[#CCD0E5] leading-relaxed">
                {selectedSkill.usageContext}
              </p>
            </div>

            {/* Project Evidence Links */}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3 text-xs font-mono">
                <span className="text-[#8065FF] uppercase tracking-wider font-semibold">
                  Project Evidence [{selectedSkill.projectLinks.length}]
                </span>
                <span className="text-[#9BA3BF] text-[11px]">
                  {selectedSkill.projectLinks.length > 0
                    ? 'Verified In Repositories'
                    : 'General Engineering'}
                </span>
              </div>

              {selectedSkill.projectLinks.length > 0 ? (
                <div className="space-y-3">
                  {selectedSkill.projectLinks.map((link) => (
                    <div
                      key={link.projectId}
                      className="p-3.5 rounded-xl bg-[#080A12]/40 border border-[#F1F2FA]/10 hover:border-[#8065FF]/40 transition-all group"
                    >
                      <div className="flex items-center justify-between gap-3 mb-1.5">
                        <span className="text-xs font-mono font-bold text-[#F1F2FA] group-hover:text-[#48BFFF] transition-colors">
                          {link.projectName}
                        </span>

                        {link.caseStudyAnchor ? (
                          <a
                            href={link.caseStudyAnchor}
                            id={`skill-case-study-${link.projectId}`}
                            onClick={() => {
                              window.location.hash = link.caseStudyAnchor!;
                              window.dispatchEvent(new HashChangeEvent('hashchange'));
                            }}
                            className="inline-flex items-center gap-1 text-[11px] font-mono text-[#48BFFF] hover:text-[#8065FF] transition-colors"
                            aria-label={`Open ${link.projectName} case study`}
                          >
                            <span>Case study</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : link.projectId === 'portfolio' ? (
                          <span className="text-[10px] font-mono text-[#8065FF] px-2 py-0.5 rounded bg-[#8065FF]/10 border border-[#8065FF]/20">
                            Current Repo
                          </span>
                        ) : null}
                      </div>

                      <p className="text-xs text-[#9BA3BF] leading-relaxed">
                        {link.responsibility}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-[#080A12]/40 border border-[#F1F2FA]/10 text-xs text-[#9BA3BF] leading-relaxed space-y-2">
                  <p>
                    Part of core software engineering foundations and algorithmic design.
                  </p>
                  <p className="text-[11px] font-mono text-[#9BA3BF]/70">
                    {'//'} No standalone external client case study is currently published in this portfolio for this entry.
                  </p>
                </div>
              )}
            </div>

            {/* Factual Integrity Footnote */}
            <div className="relative z-10 mt-6 pt-4 border-t border-[#F1F2FA]/10 flex items-center justify-between text-[11px] font-mono text-[#9BA3BF]">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#8065FF]" />
                <span>Zero fabricated proficiency percentages</span>
              </span>
              <span className="text-[10px] text-[#9BA3BF]/60">Source verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
