'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Terminal as TerminalIcon,
  CornerDownLeft,
  Trash2,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Command,
} from 'lucide-react';
import { profileData } from '@/data/profile';
import { projectsData } from '@/data/projects';
import { skillsData, skillCategories } from '@/data/skills';
import { Reveal } from '@/components/motion/Reveal';

interface OutputEntry {
  id: string;
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

const SUPPORTED_COMMANDS = [
  'help',
  'whoami',
  'about',
  'projects',
  'project orgtrace',
  'project hazard',
  'project devflow',
  'skills',
  'contact',
  'clear',
];

const QUICK_COMMANDS = [
  'help',
  'projects',
  'skills',
  'about',
  'whoami',
  'contact',
  'project devflow',
  'clear',
];

export const DeveloperTerminal: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<OutputEntry[]>([
    {
      id: 'welcome',
      command: '',
      output: (
        <div className="space-y-2 text-xs font-mono text-[#CCD0E5]">
          <div className="flex items-center gap-2 text-[#8065FF] font-bold">
            <TerminalIcon className="w-4 h-4 text-[#48BFFF]" />
            <span>BUILDWITHNAMAN // INTERACTIVE SHELL (v1.0.4)</span>
          </div>
          <p className="text-[#9BA3BF]">
            Welcome to the local portfolio shell. Query real project architectures, skill matrices, and engineering details directly through keyboard commands.
          </p>
          <p className="text-[11px] text-[#9BA3BF]/80">
            Type <span className="text-[#48BFFF] font-semibold">help</span> to view available commands, or click any command suggestion below.
          </p>
        </div>
      ),
      timestamp: '00:00:00',
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll terminal log to bottom on output change
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  // Open a case study modal via hash dispatch
  const triggerCaseStudy = (hash: string) => {
    window.location.hash = hash;
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  };

  const getTimestamp = () => {
    const now = new Date();
    return now.toTimeString().split(' ')[0];
  };

  // Safe command parser executing only real portfolio data
  const executeCommand = (rawCommand: string) => {
    const trimmed = rawCommand.trim();
    if (!trimmed) {
      // Empty input: simply print a blank prompt line
      setHistory((prev) => [
        ...prev,
        {
          id: `entry-${Date.now()}`,
          command: '',
          output: null,
          timestamp: getTimestamp(),
        },
      ]);
      setInputVal('');
      return;
    }

    // Add to command history for arrow navigation
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);
    setSuggestions([]);

    const normalized = trimmed.toLowerCase();
    const parts = normalized.split(/\s+/);
    const mainCommand = parts[0];
    const subCommand = parts.slice(1).join(' ');

    let resultOutput: React.ReactNode = null;

    if (mainCommand === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    } else if (mainCommand === 'help') {
      resultOutput = (
        <div className="space-y-3 text-xs font-mono">
          <div className="text-[#8065FF] font-semibold border-b border-[#F1F2FA]/10 pb-1">
            AVAILABLE COMMANDS:
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[#CCD0E5]">
            <div>
              <span className="text-[#48BFFF] font-bold">help</span>
              <span className="text-[#9BA3BF]"> — List available commands</span>
            </div>
            <div>
              <span className="text-[#48BFFF] font-bold">whoami</span>
              <span className="text-[#9BA3BF]"> — Display developer role & location</span>
            </div>
            <div>
              <span className="text-[#48BFFF] font-bold">about</span>
              <span className="text-[#9BA3BF]"> — Summary of engineering background</span>
            </div>
            <div>
              <span className="text-[#48BFFF] font-bold">projects</span>
              <span className="text-[#9BA3BF]"> — List all 3 verified project architectures</span>
            </div>
            <div>
              <span className="text-[#48BFFF] font-bold">project &lt;name&gt;</span>
              <span className="text-[#9BA3BF]"> — Open project case study (orgtrace | hazard | devflow)</span>
            </div>
            <div>
              <span className="text-[#48BFFF] font-bold">skills</span>
              <span className="text-[#9BA3BF]"> — Inspect verified technologies by domain</span>
            </div>
            <div>
              <span className="text-[#48BFFF] font-bold">contact</span>
              <span className="text-[#9BA3BF]"> — Display communication channels & handles</span>
            </div>
            <div>
              <span className="text-[#48BFFF] font-bold">clear</span>
              <span className="text-[#9BA3BF]"> — Clear current terminal output log</span>
            </div>
          </div>
          <div className="text-[11px] text-[#9BA3BF]/70 pt-1">
            {'//'} Tip: Use [Tab] to autocomplete, [↑/↓] for command history.
          </div>
        </div>
      );
    } else if (mainCommand === 'whoami') {
      resultOutput = (
        <div className="space-y-1.5 text-xs font-mono text-[#CCD0E5]">
          <div className="text-[#F1F2FA] font-bold text-sm">{profileData.name}</div>
          <div className="text-[#8065FF]">{profileData.roleTitle}</div>
          <div className="text-[#9BA3BF] flex items-center gap-2 pt-1">
            <span className="text-[#48BFFF]">LOCATION:</span> {profileData.location}
          </div>
          <div className="text-[#9BA3BF] flex items-center gap-2">
            <span className="text-[#8065FF]">STATUS:</span> {profileData.availability}
          </div>
        </div>
      );
    } else if (mainCommand === 'about') {
      resultOutput = (
        <div className="space-y-2 text-xs font-mono text-[#CCD0E5] leading-relaxed">
          <p className="text-[#F1F2FA]">{profileData.bioShort}</p>
          <div className="mt-2 p-3 rounded-lg bg-[#151A2C]/60 border border-[#F1F2FA]/10 space-y-1 text-[11px] text-[#9BA3BF]">
            <div className="text-[#8065FF] font-semibold">CORE ARCHITECTURAL FOCUS:</div>
            <div>• Deterministic UI state & low-latency interaction loops</div>
            <div>• Hardware-accelerated graphics pipelines (Three.js / WebGL)</div>
            <div>• Structured AI extraction with strict JSON validation</div>
          </div>
        </div>
      );
    } else if (mainCommand === 'projects') {
      resultOutput = (
        <div className="space-y-3 text-xs font-mono">
          <div className="text-[#8065FF] font-semibold border-b border-[#F1F2FA]/10 pb-1">
            FEATURED ENGINEERING PROJECTS [{projectsData.length}]:
          </div>
          <div className="space-y-3">
            {projectsData.map((project, idx) => (
              <div
                key={project.id}
                className="p-3 rounded-lg bg-[#151A2C]/60 border border-[#F1F2FA]/10 space-y-1.5"
              >
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2 font-bold text-[#F1F2FA]">
                    <span className="text-[#48BFFF]">[{idx + 1}]</span>
                    <span>{project.title}</span>
                    <span className="text-[10px] font-normal px-2 py-0.5 rounded bg-[#8065FF]/20 text-[#8065FF]">
                      {project.status}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => triggerCaseStudy(`#${project.id}`)}
                    className="inline-flex items-center gap-1 text-[11px] text-[#48BFFF] hover:text-[#8065FF] transition-colors cursor-pointer"
                  >
                    <span>Inspect Case Study</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-[#CCD0E5] text-[11px]">{project.tagline}</p>
                <div className="text-[10px] text-[#9BA3BF] flex items-center gap-1.5 flex-wrap pt-0.5">
                  <span className="text-[#8065FF]">STACK:</span>
                  {project.stack.join(' • ')}
                </div>
              </div>
            ))}
          </div>
          <div className="text-[11px] text-[#9BA3BF]/80">
            {'//'} Type <span className="text-[#48BFFF]">project &lt;name&gt;</span> (e.g.{' '}
            <span className="text-[#8065FF]">project devflow</span>) to open the interactive case study modal.
          </div>
        </div>
      );
    } else if (mainCommand === 'project') {
      const target = subCommand.trim();
      let matchedProject = null;

      if (target === 'orgtrace' || target === '1') {
        matchedProject = projectsData.find((p) => p.id === 'orgtrace');
      } else if (target === 'hazard' || target === 'hazard-project' || target === '2') {
        matchedProject = projectsData.find((p) => p.id === 'hazard-project');
      } else if (target === 'devflow' || target === 'devflow-ai' || target === '3') {
        matchedProject = projectsData.find((p) => p.id === 'devflow-ai');
      }

      if (matchedProject) {
        // Automatically trigger opening the case study modal
        triggerCaseStudy(`#${matchedProject.id}`);

        resultOutput = (
          <div className="space-y-2 text-xs font-mono text-[#CCD0E5]">
            <div className="flex items-center gap-2 text-[#48BFFF] font-bold">
              <span>OPENING CASE STUDY:</span>
              <span className="text-[#F1F2FA]">{matchedProject.title}</span>
            </div>
            <p className="text-[11px] text-[#9BA3BF]">{matchedProject.description}</p>
            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => triggerCaseStudy(`#${matchedProject.id}`)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#48BFFF]/10 border border-[#48BFFF]/30 text-[#48BFFF] text-[11px] hover:bg-[#48BFFF]/20 transition-colors cursor-pointer"
              >
                <span>Re-open modal</span>
                <ExternalLink className="w-3 h-3" />
              </button>
              <span className="text-[10px] text-[#8065FF]">{'//'} Activated via #{matchedProject.id}</span>
            </div>
          </div>
        );
      } else if (!target) {
        resultOutput = (
          <div className="space-y-1 text-xs font-mono text-[#CCD0E5]">
            <div className="text-[#FFBD2E]">Usage: project &lt;orgtrace | hazard | devflow&gt;</div>
            <div className="text-[11px] text-[#9BA3BF]">
              Run <span className="text-[#48BFFF]">projects</span> to view detailed overview of all 3 projects.
            </div>
          </div>
        );
      } else {
        resultOutput = (
          <div className="space-y-1 text-xs font-mono text-[#FF5F56]">
            <div>Unknown project target: &apos;{target}&apos;</div>
            <div className="text-[#9BA3BF] text-[11px]">
              Available targets: <span className="text-[#48BFFF]">orgtrace</span>,{' '}
              <span className="text-[#48BFFF]">hazard</span>,{' '}
              <span className="text-[#48BFFF]">devflow</span>.
            </div>
          </div>
        );
      }
    } else if (mainCommand === 'skills') {
      const nonAllCategories = skillCategories.filter((c) => c !== 'All');

      resultOutput = (
        <div className="space-y-3 text-xs font-mono">
          <div className="flex items-center justify-between border-b border-[#F1F2FA]/10 pb-1 text-[#8065FF] font-semibold">
            <span>VERIFIED SKILL INVENTORY [{skillsData.length} TECHNOLOGIES]:</span>
            <span className="text-[10px] text-[#9BA3BF]">NO INVENTED PERCENTAGES</span>
          </div>
          <div className="space-y-2.5">
            {nonAllCategories.map((category) => {
              const categorySkills = skillsData.filter((s) => s.category === category);
              return (
                <div key={category} className="space-y-1">
                  <div className="text-[11px] font-bold text-[#48BFFF] uppercase tracking-wider flex items-center justify-between">
                    <span>{category}</span>
                    <span className="text-[10px] text-[#9BA3BF]">[{categorySkills.length}]</span>
                  </div>
                  <div className="text-[11px] text-[#CCD0E5] flex flex-wrap gap-x-2 gap-y-1">
                    {categorySkills.map((s, idx) => (
                      <span key={s.id} className="inline-flex items-center">
                        <span className="text-[#F1F2FA]">{s.name}</span>
                        {s.projectLinks.length > 0 && (
                          <span className="text-[9px] text-[#8065FF] ml-1">
                            ({s.projectLinks.length}P)
                          </span>
                        )}
                        {idx < categorySkills.length - 1 && (
                          <span className="text-[#9BA3BF]/40 ml-2">•</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-[11px] text-[#9BA3BF]/80 pt-1 border-t border-[#F1F2FA]/5">
            {'//'} Note: P = verified project connections. Scroll to the Skills Explorer for interactive drilldowns.
          </div>
        </div>
      );
    } else if (mainCommand === 'contact') {
      resultOutput = (
        <div className="space-y-2.5 text-xs font-mono text-[#CCD0E5]">
          <div className="text-[#8065FF] font-semibold border-b border-[#F1F2FA]/10 pb-1">
            OFFICIAL COMMUNICATION CHANNELS:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
            {profileData.socials.map((social) => {
              const isPlh = social.isPlaceholder || social.url.includes('[');
              return (
                <div
                  key={social.name}
                  className="p-2.5 rounded-lg bg-[#151A2C]/60 border border-[#F1F2FA]/10 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[#48BFFF] font-bold">{social.name}</span>
                    {isPlh ? (
                      <span className="text-[9px] text-[#FFBD2E] px-1.5 py-0.5 rounded bg-[#FFBD2E]/10">
                        Placeholder
                      </span>
                    ) : (
                      <span className="text-[9px] text-[#27C93F] px-1.5 py-0.5 rounded bg-[#27C93F]/10">
                        Active
                      </span>
                    )}
                  </div>
                  <div className="text-[#9BA3BF] truncate">
                    {isPlh ? (
                      <span>{social.handle}</span>
                    ) : (
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#CCD0E5] hover:text-[#48BFFF] underline underline-offset-2 transition-colors"
                      >
                        {social.handle}
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="pt-1 text-[11px] text-[#9BA3BF] flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-[#8065FF]">RÉSUMÉ STATUS:</span>{' '}
              {profileData.resumeUrl.includes('[')
                ? 'Document in preparation (official CV)'
                : 'Available via header link'}
            </div>
            <div>
              <span className="text-[#48BFFF]">LOCATION:</span> {profileData.location}
            </div>
          </div>
        </div>
      );
    } else {
      resultOutput = (
        <div className="space-y-1 text-xs font-mono text-[#FF5F56]">
          <div>Command not recognized: &apos;{trimmed}&apos;</div>
          <div className="text-[#9BA3BF] text-[11px]">
            Type <span className="text-[#48BFFF] font-semibold">help</span> to view all supported commands.
          </div>
        </div>
      );
    }

    setHistory((prev) => [
      ...prev,
      {
        id: `entry-${Date.now()}`,
        command: trimmed,
        output: resultOutput,
        timestamp: getTimestamp(),
      },
    ]);
    setInputVal('');
  };

  // Keyboard navigation & autocomplete handler
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex =
        historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(commandHistory[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandHistory.length === 0 || historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[nextIndex]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const current = inputVal.trim().toLowerCase();
      if (!current) return;

      const matches = SUPPORTED_COMMANDS.filter((cmd) => cmd.startsWith(current));
      if (matches.length === 1) {
        setInputVal(matches[0]);
        setSuggestions([]);
      } else if (matches.length > 1) {
        setSuggestions(matches);
      }
    }
  };

  return (
    <section id="terminal" className="py-24 sm:py-32 relative border-t border-[#F1F2FA]/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#F1F2FA]/10">
            <div>
              <div className="flex items-center gap-2 mb-2 text-xs font-mono text-[#8065FF]">
                <Command className="w-3.5 h-3.5" />
                <span className="uppercase tracking-widest">Keyboard Telemetry</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#F1F2FA] tracking-tight">
                Developer Terminal
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#9BA3BF] max-w-xl font-sans">
                Explore real portfolio content, query architecture telemetry, and launch case studies via keyboard commands.
              </p>
            </div>

            <div className="flex items-center gap-2.5 text-xs font-mono text-[#9BA3BF] bg-[#151A2C]/60 px-3.5 py-1.5 rounded-full border border-[#F1F2FA]/10 self-start md:self-auto shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#27C93F] animate-pulse" />
              <span>INTERACTIVE REPL READY</span>
            </div>
          </div>
        </Reveal>

        {/* Terminal Chrome Window */}
        <Reveal delay={0.1}>
          <div
            role="region"
            aria-label="Interactive developer terminal"
            onClick={() => inputRef.current?.focus()}
            className="rounded-2xl border border-[#8065FF]/30 bg-[#0C101D] shadow-2xl shadow-[#8065FF]/10 overflow-hidden backdrop-blur-xl"
          >
            {/* Terminal Title Bar */}
            <div className="px-4 py-3 bg-[#151A2C] border-b border-[#F1F2FA]/10 flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]/80 border border-[#FF5F56]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]/80 border border-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]/80 border border-[#27C93F]" />
                <span className="ml-2 text-xs font-mono text-[#CCD0E5] font-semibold tracking-wider">
                  BUILDWITHNAMAN // INTERACTIVE SHELL
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono text-[#9BA3BF]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#48BFFF]" />
                  <span>SESSION: 0x9B12</span>
                </span>
                <button
                  type="button"
                  id="terminal-clear-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setHistory([]);
                  }}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono text-[#9BA3BF] hover:text-[#F1F2FA] hover:bg-[#F1F2FA]/5 transition-colors cursor-pointer"
                  title="Clear terminal output"
                >
                  <Trash2 className="w-3 h-3" />
                  <span className="hidden sm:inline">Clear</span>
                </button>
              </div>
            </div>

            {/* Terminal Output Log Area */}
            <div className="p-4 sm:p-6 min-h-[320px] max-h-[500px] overflow-y-auto font-mono text-xs space-y-4">
              {history.map((entry) => (
                <div key={entry.id} className="space-y-1.5">
                  {entry.command && (
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-[#8065FF] font-bold select-none">
                        visitor@buildwithnaman:~$
                      </span>
                      <span className="text-[#F1F2FA] font-medium">{entry.command}</span>
                      <span className="text-[10px] text-[#9BA3BF]/40 ml-auto select-none">
                        {entry.timestamp}
                      </span>
                    </div>
                  )}
                  {entry.output && <div className="pl-2 sm:pl-3">{entry.output}</div>}
                </div>
              ))}

              {/* Autocomplete Suggestions if present */}
              {suggestions.length > 0 && (
                <div className="p-2.5 rounded-lg bg-[#151A2C]/60 border border-[#48BFFF]/30 text-xs font-mono space-y-1">
                  <div className="text-[10px] text-[#48BFFF] uppercase">Matching commands:</div>
                  <div className="flex flex-wrap gap-2 text-[#CCD0E5]">
                    {suggestions.map((sug) => (
                      <button
                        key={sug}
                        type="button"
                        onClick={() => {
                          setInputVal(sug);
                          setSuggestions([]);
                          inputRef.current?.focus();
                        }}
                        className="px-2 py-0.5 rounded bg-[#151A2C] border border-[#F1F2FA]/10 hover:border-[#8065FF]/40 text-[#48BFFF] cursor-pointer"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Active Prompt Input Line */}
              <div className="flex items-center gap-2 pt-2">
                <span className="text-[#8065FF] font-bold shrink-0 select-none flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5 text-[#48BFFF]" />
                  <span>visitor@buildwithnaman:~$</span>
                </span>
                <input
                  ref={inputRef}
                  id="terminal-input"
                  type="text"
                  value={inputVal}
                  onChange={(e) => {
                    setInputVal(e.target.value);
                    if (suggestions.length > 0) setSuggestions([]);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="type command (e.g. 'help', 'projects', 'skills')..."
                  className="flex-1 bg-transparent border-none outline-none text-[#F1F2FA] font-mono text-xs placeholder:text-[#9BA3BF]/40 focus:ring-0 p-0"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  aria-label="Terminal command line input"
                />
                <button
                  type="button"
                  id="terminal-submit-btn"
                  onClick={() => executeCommand(inputVal)}
                  className="p-1 rounded text-[#9BA3BF] hover:text-[#48BFFF] hover:bg-[#F1F2FA]/5 transition-colors cursor-pointer shrink-0"
                  aria-label="Execute command"
                >
                  <CornerDownLeft className="w-3.5 h-3.5" />
                </button>
              </div>

              <div ref={terminalEndRef} />
            </div>

            {/* Quick Command Suggestion Bar */}
            <div className="px-4 py-3 bg-[#151A2C]/80 border-t border-[#F1F2FA]/10 flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-mono text-[#9BA3BF] mr-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#8065FF]" />
                  <span>Quick run:</span>
                </span>
                {QUICK_COMMANDS.map((cmd) => (
                  <button
                    key={cmd}
                    type="button"
                    id={`quick-cmd-${cmd.replace(/\s+/g, '-')}`}
                    onClick={() => {
                      executeCommand(cmd);
                      inputRef.current?.focus();
                    }}
                    className="px-2.5 py-1 rounded-md text-[10px] font-mono text-[#CCD0E5] bg-[#080A12]/60 border border-[#F1F2FA]/10 hover:text-[#F1F2FA] hover:border-[#8065FF]/40 hover:bg-[#151A2C] transition-all cursor-pointer"
                  >
                    {cmd}
                  </button>
                ))}
              </div>

              <div className="text-[10px] font-mono text-[#9BA3BF]/60 hidden md:block">
                <span>[Enter] run • [Tab] autocomplete • [↑/↓] history</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
