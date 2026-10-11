'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '@/types';
import { ArchitectureDiagramViewer } from '@/components/diagrams/ArchitectureDiagramViewer';
import {
  X,
  CheckCircle2,
  Clock,
  Lock,
  Target,
  Users,
  Flame,
} from 'lucide-react';

interface CaseStudyModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'engineering' | 'status'>('architecture');

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'auto';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
    document.body.style.overflow = 'auto';
  }, [isOpen, onClose]);

  if (!project || !project.caseStudyData) return null;

  const { caseStudyData } = project;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#080A12]/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0D1021] border border-[#8065FF]/40 shadow-2xl z-10 flex flex-col"
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-20 bg-[#0D1021]/95 backdrop-blur-xl border-b border-[#F1F2FA]/10 px-6 sm:px-8 py-5 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#8065FF] mb-1">
                  <span>PROJECT CASE STUDY</span>
                  <span className="text-[#9BA3BF]">{'//'}</span>
                  <span className="text-[#F1F2FA]">{project.year}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#F1F2FA]">
                  {project.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full bg-[#151A2C] hover:bg-[#1E253F] text-[#9BA3BF] hover:text-[#F1F2FA] transition-colors border border-[#F1F2FA]/10 cursor-pointer"
                aria-label="Close Case Study"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="px-6 sm:px-8 pt-4 pb-2 border-b border-[#F1F2FA]/10 flex flex-wrap gap-2 font-mono text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('architecture')}
                className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
                  activeTab === 'architecture'
                    ? 'bg-[#8065FF] text-white font-bold shadow-md shadow-[#8065FF]/25'
                    : 'bg-[#151A2C]/60 text-[#9BA3BF] hover:text-[#F1F2FA] hover:bg-[#1A2138]'
                }`}
              >
                Architecture &amp; Flow
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('engineering')}
                className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
                  activeTab === 'engineering'
                    ? 'bg-[#8065FF] text-white font-bold shadow-md shadow-[#8065FF]/25'
                    : 'bg-[#151A2C]/60 text-[#9BA3BF] hover:text-[#F1F2FA] hover:bg-[#1A2138]'
                }`}
              >
                Engineering &amp; Trade-Offs
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('status')}
                className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
                  activeTab === 'status'
                    ? 'bg-[#8065FF] text-white font-bold shadow-md shadow-[#8065FF]/25'
                    : 'bg-[#151A2C]/60 text-[#9BA3BF] hover:text-[#F1F2FA] hover:bg-[#1A2138]'
                }`}
              >
                Implementation vs Planned
              </button>
            </div>

            {/* Modal Body Content */}
            <div className="p-6 sm:p-8 space-y-8 flex-1">
              {/* TAB 1: Architecture & Diagram */}
              {activeTab === 'architecture' && (
                <div className="space-y-6">
                  <ArchitectureDiagramViewer
                    diagram={caseStudyData.architecture}
                    accentColor={project.accentColor}
                    projectName={project.title}
                  />

                  {/* Summary of Engineering Approach */}
                  <div className="p-6 rounded-2xl bg-[#151A2C]/60 border border-[#F1F2FA]/10">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#8065FF] mb-2 flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5 text-[#8065FF]" />
                      <span>Engineering Approach</span>
                    </h4>
                    <p className="text-sm text-[#CCD0E5] font-sans leading-relaxed">
                      {caseStudyData.engineeringApproach}
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 2: Engineering & Trade-Offs */}
              {activeTab === 'engineering' && (
                <div className="space-y-8">
                  {/* Problem & Intended Users */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="md:col-span-7 p-6 rounded-2xl bg-[#151A2C]/60 border border-[#F1F2FA]/10">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#48BFFF] mb-2 flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5 text-[#48BFFF]" />
                        <span>Problem Statement</span>
                      </h4>
                      <p className="text-sm text-[#CCD0E5] font-sans leading-relaxed">
                        {caseStudyData.problem}
                      </p>
                    </div>

                    <div className="md:col-span-5 p-6 rounded-2xl bg-[#151A2C]/60 border border-[#F1F2FA]/10">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#8065FF] mb-2 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#8065FF]" />
                        <span>Intended Users</span>
                      </h4>
                      <ul className="space-y-1.5 text-xs font-mono text-[#CCD0E5]">
                        {caseStudyData.intendedUsers.map((user, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#8065FF]" />
                            <span>{user}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Technical Decisions & Trade-Offs */}
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#F1F2FA] mb-4">
                      Critical Technical Decisions &amp; Trade-Offs
                    </h4>
                    <div className="space-y-4">
                      {caseStudyData.keyDecisions.map((dec, idx) => (
                        <div
                          key={idx}
                          className="p-5 rounded-xl bg-[#151A2C]/40 border border-[#F1F2FA]/10 space-y-2.5"
                        >
                          <div className="flex items-center gap-2 text-xs font-mono text-[#8065FF] font-bold">
                            <span>0{idx + 1} {'//'}</span>
                            <span className="text-[#F1F2FA]">{dec.decision}</span>
                          </div>
                          <div className="text-xs text-[#9BA3BF] font-sans">
                            <strong className="text-[#CCD0E5]">Trade-Off: </strong>
                            {dec.tradeOff}
                          </div>
                          <div className="text-xs text-[#CCD0E5] font-sans">
                            <strong className="text-[#48BFFF]">Rationale: </strong>
                            {dec.rationale}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Solved Engineering Challenges */}
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#F1F2FA] mb-4">
                      Challenges Solved in Implementation
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {caseStudyData.challengesSolved.map((chal, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-[#151A2C]/30 border border-[#F1F2FA]/10 flex items-start gap-3"
                        >
                          <span className="mt-1 w-2 h-2 rounded-full bg-[#48BFFF] shrink-0" />
                          <p className="text-xs text-[#CCD0E5] font-sans leading-relaxed">
                            {chal}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: Status Matrix (Implemented vs Planned) */}
              {activeTab === 'status' && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Implemented Features */}
                    <div className="p-6 rounded-2xl bg-[#151A2C]/60 border border-[#48BFFF]/30">
                      <div className="flex items-center gap-2 text-xs font-mono text-[#48BFFF] font-bold uppercase tracking-wider mb-4">
                        <CheckCircle2 className="w-4 h-4 text-[#48BFFF]" />
                        <span>Verified Implemented Features</span>
                      </div>
                      <ul className="space-y-3">
                        {caseStudyData.implementedFeatures.map((feat, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 text-xs text-[#CCD0E5] font-sans leading-relaxed"
                          >
                            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#48BFFF] shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Planned Work */}
                    <div className="p-6 rounded-2xl bg-[#151A2C]/40 border border-[#F1F2FA]/10">
                      <div className="flex items-center gap-2 text-xs font-mono text-[#9BA3BF] font-bold uppercase tracking-wider mb-4">
                        <Clock className="w-4 h-4 text-[#9BA3BF]" />
                        <span>Planned / Roadmap Work</span>
                      </div>
                      <ul className="space-y-3">
                        {caseStudyData.plannedWork.map((plan, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 text-xs text-[#9BA3BF] font-sans leading-relaxed"
                          >
                            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#9BA3BF] shrink-0" />
                            <span>{plan}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Verified Repository & Access Status */}
                  <div className="p-5 rounded-xl bg-[#0B0E1B] border border-[#8065FF]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-[#8065FF] mb-1">
                        Repository &amp; Demonstration Status
                      </div>
                      <p className="text-xs text-[#CCD0E5] font-sans">
                        {caseStudyData.verifiedStatus.note}
                      </p>
                      <div className="mt-2 text-[11px] text-[#48BFFF] font-mono">
                        Audit Note: {caseStudyData.verifiedStatus.evidenceAudit}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="px-3 py-1 rounded-full bg-[#151A2C] border border-[#F1F2FA]/10 text-[#CCD0E5] flex items-center gap-1.5">
                        <Lock className="w-3 h-3 text-[#8065FF]" />
                        <span>{caseStudyData.verifiedStatus.repoStatus}</span>
                      </span>
                      <span className="px-3 py-1 rounded-full bg-[#151A2C] border border-[#48BFFF]/30 text-[#48BFFF]">
                        {caseStudyData.verifiedStatus.demoStatus}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 z-20 bg-[#0D1021]/95 backdrop-blur-xl border-t border-[#F1F2FA]/10 px-6 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded text-[10px] bg-[#151A2C] text-[#9BA3BF] border border-[#F1F2FA]/5"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-full bg-[#151A2C] hover:bg-[#1E253F] text-[#F1F2FA] border border-[#F1F2FA]/10 transition-colors cursor-pointer"
              >
                Close Case Study
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
