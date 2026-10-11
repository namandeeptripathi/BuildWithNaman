'use client';

import React from 'react';
import { profileData } from '@/data/profile';
import { Reveal } from '@/components/motion/Reveal';
import { User, MapPin, Zap } from 'lucide-react';
import { SkillsExplorer } from '@/components/ui/SkillsExplorer';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 sm:py-32 relative border-t border-[#F1F2FA]/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* About Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="flex items-center gap-2 mb-3 text-xs font-mono text-[#8065FF]">
                <User className="w-3.5 h-3.5" />
                <span className="uppercase tracking-widest">Background & Perspective</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#F1F2FA]">
                Architecting interfaces with cinematic tactile fidelity.
              </h2>
              
              <div className="mt-6 space-y-3 font-mono text-xs text-[#9BA3BF]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#48BFFF]" />
                  <span>{profileData.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-[#8065FF]" />
                  <span className="text-[#F1F2FA]">{profileData.availability}</span>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <div className="p-8 rounded-2xl bg-[#151A2C]/60 border border-[#F1F2FA]/10 space-y-5 text-sm sm:text-base text-[#CCD0E5] leading-relaxed">
                <p>
                  {profileData.bioShort}
                </p>
                <p className="text-[#9BA3BF]">
                  I specialize in engineering low-latency UI architectures, orchestrating hardware-accelerated WebGL pipelines with Three.js and React Three Fiber, and crafting choreography systems using Motion for React.
                </p>
                <p className="text-xs font-mono text-[#8065FF] pt-2 border-t border-[#F1F2FA]/10">
                  {'//'} FOCUS: ZERO UNNECESSARY ABSTRACTION • DETERMINISTIC RENDERING • SENSORY INTERACTION
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Skills & Stack Section — Interactive Skills Explorer */}
        <div id="skills" className="pt-8">
          <SkillsExplorer />
        </div>
      </div>
    </section>
  );
};
