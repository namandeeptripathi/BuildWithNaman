'use client';

import React from 'react';
import { profileData } from '@/data/profile';
import { Reveal } from '@/components/motion/Reveal';
import { Compass } from 'lucide-react';

export const ManifestoSection: React.FC = () => {
  return (
    <section id="manifesto" className="py-28 sm:py-36 relative">
      {/* Subtle background ambient atmospheric veil */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#8065FF]/[0.03] rounded-full blur-[150px] -z-10" />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        <Reveal>
          <div className="max-w-3xl mb-16 sm:mb-20">
            <div className="flex items-center gap-2 mb-3 text-xs font-mono text-[#8065FF]">
              <Compass className="w-3.5 h-3.5" />
              <span className="uppercase tracking-widest font-semibold">Engineering Philosophy</span>
              <span className="text-[#616B87]">/</span>
              <span className="text-[#9BA3BF]">4 Core Doctrines</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-[#F1F2FA]">
              The Interface Manifesto
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#9BA3BF] font-sans leading-relaxed">
              Principles guiding how I design, architect, and optimize digital software systems.
            </p>
          </div>
        </Reveal>

        {/* Editorial Monograph Layout: Clean, confident typography with negative space */}
        <div className="divide-y divide-[#F1F2FA]/[0.08] border-y border-[#F1F2FA]/[0.08]">
          {profileData.bioManifesto.map((item, idx) => (
            <Reveal key={idx} delay={idx * 0.08}>
              <div className="py-8 sm:py-12 flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 group transition-all duration-500">
                {/* Large Numeral Marker */}
                <div className="flex items-center gap-3 shrink-0 md:w-32">
                  <span className="text-3xl sm:text-4xl font-mono font-bold text-[#8065FF]/40 group-hover:text-[#8065FF] transition-colors duration-500">
                    0{idx + 1}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-[#8065FF]/20 group-hover:bg-[#48BFFF] transition-colors duration-500" />
                </div>

                {/* Doctrine Statement */}
                <p className="text-lg sm:text-xl md:text-2xl font-display font-medium text-[#CCD0E5] leading-relaxed group-hover:text-[#F1F2FA] transition-colors duration-500 flex-1">
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
