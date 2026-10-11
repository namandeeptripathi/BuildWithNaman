'use client';

import React from 'react';
import { profileData } from '@/data/profile';
import { Reveal } from '@/components/motion/Reveal';
import { User, Cpu, MapPin, Zap } from 'lucide-react';

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

        {/* Skills & Stack Section */}
        <div id="skills" className="pt-8">
          <Reveal>
            <div className="flex items-center gap-2 mb-3 text-xs font-mono text-[#48BFFF]">
              <Cpu className="w-3.5 h-3.5" />
              <span className="uppercase tracking-widest">Technical Arsenal</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#F1F2FA] mb-10">
              Stack & Capabilities
            </h3>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {profileData.skills.map((group, idx) => (
              <Reveal key={group.category} delay={idx * 0.1}>
                <div className="p-6 rounded-xl bg-[#151A2C]/40 border border-[#F1F2FA]/10 hover:border-[#8065FF]/40 transition-all h-full">
                  <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#8065FF] mb-4 flex items-center justify-between">
                    <span>{group.category}</span>
                    <span className="text-[10px] text-[#9BA3BF]">[{group.items.length}]</span>
                  </h4>
                  <ul className="space-y-2.5">
                    {group.items.map((skill) => (
                      <li
                        key={skill}
                        className="text-xs sm:text-sm text-[#CCD0E5] flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-sm bg-[#48BFFF]/60" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
