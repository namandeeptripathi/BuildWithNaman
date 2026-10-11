'use client';

import React from 'react';
import { profileData } from '@/data/profile';
import { Reveal } from '@/components/motion/Reveal';
import { Compass } from 'lucide-react';

export const ManifestoSection: React.FC = () => {
  return (
    <section id="manifesto" className="py-24 sm:py-32 relative border-t border-[#F1F2FA]/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="flex items-center gap-2 mb-3 text-xs font-mono text-[#8065FF]">
            <Compass className="w-3.5 h-3.5" />
            <span className="uppercase tracking-widest">Engineering Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-tight text-[#F1F2FA] max-w-3xl">
            The Interface Manifesto
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#9BA3BF] max-w-2xl font-sans">
            Principles guiding how I design, architect, and optimize digital software systems.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
          {profileData.bioManifesto.map((item, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div className="relative p-6 sm:p-8 rounded-xl bg-[#151A2C]/50 border border-[#F1F2FA]/10 hover:border-[#8065FF]/40 transition-colors h-full flex flex-col justify-between group">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-mono font-bold text-[#8065FF]">
                    0{idx + 1}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#9BA3BF] px-2 py-1 rounded bg-[#080A12]/80 border border-[#F1F2FA]/5">
                    PRINCIPLE_0{idx + 1}
                  </span>
                </div>
                <p className="text-base sm:text-lg text-[#CCD0E5] font-sans leading-relaxed group-hover:text-[#F1F2FA] transition-colors">
                  {item}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
