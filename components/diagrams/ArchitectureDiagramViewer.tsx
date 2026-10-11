'use client';

import React, { useState } from 'react';
import { ArchitectureDiagram } from '@/types';
import { CheckCircle2, ArrowRight, Layers, Cpu, Database, Activity } from 'lucide-react';

interface ArchitectureDiagramViewerProps {
  diagram: ArchitectureDiagram;
  accentColor?: string;
  projectName: string;
}

export const ArchitectureDiagramViewer: React.FC<ArchitectureDiagramViewerProps> = ({
  diagram,
  accentColor = '#8065FF',
  projectName,
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(
    diagram.nodes[0]?.id || ''
  );

  const selectedNode = diagram.nodes.find((n) => n.id === selectedNodeId) || diagram.nodes[0];

  return (
    <div className="rounded-2xl bg-[#0B0E1B]/90 border border-[#F1F2FA]/10 p-5 sm:p-7 backdrop-blur-xl">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-[#F1F2FA]/10">
        <div className="flex items-center gap-2 text-xs font-mono">
          <Layers className="w-4 h-4 text-[#8065FF]" />
          <span className="text-[#F1F2FA] font-bold uppercase tracking-wider">
            {projectName} {'//'} System Architecture Flow
          </span>
        </div>
        <div className="text-[11px] font-mono text-[#9BA3BF] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#48BFFF] animate-pulse" />
          <span>Select any node to inspect data contracts</span>
        </div>
      </div>

      {/* Overview text */}
      <p className="text-xs sm:text-sm text-[#9BA3BF] font-sans mb-8 leading-relaxed">
        {diagram.overview}
      </p>

      {/* Interactive Visual Graph: Horizontal on desktop, stacked on mobile */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 relative">
          {diagram.nodes.map((node, index) => {
            const isSelected = selectedNode?.id === node.id;
            return (
              <div key={node.id} className="relative flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => setSelectedNodeId(node.id)}
                  aria-pressed={isSelected}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#8065FF] ${
                    isSelected
                      ? 'bg-[#1C233B] shadow-xl border-[#8065FF] scale-[1.02]'
                      : 'bg-[#151A2C]/60 border-[#F1F2FA]/10 hover:border-[#8065FF]/40 hover:bg-[#1A2138]'
                  }`}
                  style={{
                    borderColor: isSelected ? accentColor : undefined,
                    boxShadow: isSelected
                      ? `0 0 20px -5px ${accentColor}40`
                      : undefined,
                  }}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#080A12] border border-[#F1F2FA]/5 text-[#8065FF] font-semibold">
                      0{index + 1}
                    </span>
                    <span
                      className={`text-[10px] font-mono uppercase tracking-wider ${
                        node.status === 'Implemented (External)' ? 'text-[#48BFFF]' : 'text-[#9BA3BF]'
                      }`}
                    >
                      {node.stage}
                    </span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-mono font-bold text-[#F1F2FA] line-clamp-2 mb-2">
                    {node.name}
                  </h4>

                  <div className="flex flex-wrap gap-1 mt-auto">
                    {node.tech.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#080A12]/80 text-[#9BA3BF] border border-[#F1F2FA]/5"
                      >
                        {t}
                      </span>
                    ))}
                    {node.tech.length > 2 && (
                      <span className="text-[9px] font-mono px-1 py-0.5 text-[#9BA3BF]">
                        +{node.tech.length - 2}
                      </span>
                    )}
                  </div>
                </button>

                {/* Flow connector arrow for desktop */}
                {index < diagram.nodes.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none text-[#8065FF]">
                    <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Node Details Panel */}
      {selectedNode && (
        <div className="p-5 sm:p-6 rounded-xl bg-[#121629] border border-[#8065FF]/30 shadow-inner">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-[#F1F2FA]/10">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8065FF]" />
              <h4 className="text-base sm:text-lg font-mono font-bold text-[#F1F2FA]">
                {selectedNode.name}
              </h4>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded-full bg-[#48BFFF]/10 border border-[#48BFFF]/30 text-[#48BFFF]">
                <CheckCircle2 className="w-3 h-3 text-[#48BFFF]" />
                <span>{selectedNode.status}</span>
              </span>
              <span className="text-xs font-mono text-[#9BA3BF] px-2 py-1 rounded bg-[#080A12] border border-[#F1F2FA]/10">
                STAGE: {selectedNode.stage.toUpperCase()}
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#CCD0E5] font-sans leading-relaxed mb-6">
            {selectedNode.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
            {/* Inputs */}
            <div className="p-3.5 rounded-lg bg-[#080A12]/80 border border-[#F1F2FA]/5">
              <div className="text-[10px] uppercase tracking-wider text-[#8065FF] mb-2 flex items-center gap-1.5 font-bold">
                <Database className="w-3 h-3 text-[#8065FF]" />
                <span>Data Ingestion</span>
              </div>
              <ul className="space-y-1 text-[#CCD0E5] text-[11px]">
                {selectedNode.inputs.map((inItem) => (
                  <li key={inItem} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#8065FF]" />
                    <span>{inItem}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Outputs */}
            <div className="p-3.5 rounded-lg bg-[#080A12]/80 border border-[#F1F2FA]/5">
              <div className="text-[10px] uppercase tracking-wider text-[#48BFFF] mb-2 flex items-center gap-1.5 font-bold">
                <Activity className="w-3 h-3 text-[#48BFFF]" />
                <span>Component Yield</span>
              </div>
              <ul className="space-y-1 text-[#CCD0E5] text-[11px]">
                {selectedNode.outputs.map((outItem) => (
                  <li key={outItem} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#48BFFF]" />
                    <span>{outItem}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div className="p-3.5 rounded-lg bg-[#080A12]/80 border border-[#F1F2FA]/5">
              <div className="text-[10px] uppercase tracking-wider text-[#CCD0E5] mb-2 flex items-center gap-1.5 font-bold">
                <Cpu className="w-3 h-3 text-[#9BA3BF]" />
                <span>Tech Stack</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedNode.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] px-2 py-0.5 rounded bg-[#151A2C] text-[#F1F2FA] border border-[#F1F2FA]/10"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
