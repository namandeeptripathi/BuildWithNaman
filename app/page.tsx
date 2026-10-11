import React from 'react';
import { NavigationDock } from '@/components/ui/NavigationDock';
import { Hero3DPlaceholder } from '@/components/3d/Hero3DPlaceholder';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { ManifestoSection } from '@/components/ui/ManifestoSection';
import { AboutSection } from '@/components/ui/AboutSection';
import { ContactSection } from '@/components/ui/ContactSection';
import { Reveal } from '@/components/motion/Reveal';
import { projectsData } from '@/data/projects';
import { profileData } from '@/data/profile';
import { ArrowDown, Sparkles, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#080A12] text-[#F1F2FA] overflow-x-hidden">
      {/* Background ambient lighting and scanline grid */}
      <div className="fixed inset-0 pointer-events-none bg-cosmic-grid -z-10" />

      {/* Floating Navigation Dock */}
      <NavigationDock />

      <main className="relative z-10">
        {/* HERO SECTION */}
        <section
          id="hero"
          className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-16 sm:py-24"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Left Column: Editorial Headline & Meta */}
              <div className="lg:col-span-7 space-y-6">
                <Reveal delay={0.05}>
                  <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#151A2C] border border-[#8065FF]/40 text-xs font-mono text-[#F1F2FA]">
                    <span className="w-2 h-2 rounded-full bg-[#48BFFF] animate-pulse" />
                    <span className="text-[#8065FF] font-semibold">STAGE 01 READY</span>
                    <span className="text-[#9BA3BF]">{'//'}</span>
                    <span className="text-[#9BA3BF]">{profileData.roleTitle}</span>
                  </div>
                </Reveal>

                <Reveal delay={0.15}>
                  <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-[#F1F2FA] leading-[1.08]">
                    Engineering <br />
                    <span className="text-gradient-electric">cinematic motion</span> &amp; <br />
                    tactile web systems.
                  </h1>
                </Reveal>

                <Reveal delay={0.25}>
                  <p className="text-base sm:text-lg text-[#9BA3BF] max-w-xl font-sans leading-relaxed">
                    {profileData.headline} High-throughput architectures, selective 3D WebGL scenes, and precision-engineered user interfaces designed for zero cognitive friction.
                  </p>
                </Reveal>

                <Reveal delay={0.35}>
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <a
                      href="#work"
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#8065FF] hover:bg-[#A38FFF] text-white font-mono text-xs font-bold transition-all shadow-lg shadow-[#8065FF]/20 hover:scale-105 active:scale-95"
                    >
                      <span>EXPLORE SELECTED WORK</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>

                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#151A2C] hover:bg-[#1C233B] text-[#F1F2FA] border border-[#F1F2FA]/10 font-mono text-xs font-bold transition-all hover:border-[#8065FF]/40"
                    >
                      <span>GET IN TOUCH</span>
                    </a>
                  </div>
                </Reveal>

                {/* Telemetry pill row */}
                <Reveal delay={0.45}>
                  <div className="pt-6 border-t border-[#F1F2FA]/10 flex flex-wrap items-center gap-6 text-xs font-mono text-[#9BA3BF]">
                    <div>
                      <span className="text-[#8065FF]">LOCATION:</span> {profileData.location}
                    </div>
                    <div>
                      <span className="text-[#48BFFF]">AVAILABILITY:</span> SELECT CONTRACTS
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Right Column: Temporary 3D Visual Treatment */}
              <div className="lg:col-span-5 flex justify-center">
                <Reveal delay={0.3}>
                  <Hero3DPlaceholder />
                </Reveal>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="mt-16 flex justify-center">
              <a
                href="#work"
                className="inline-flex items-center gap-2 font-mono text-xs text-[#9BA3BF] hover:text-[#48BFFF] transition-colors animate-bounce"
                aria-label="Scroll down to selected work"
              >
                <span>SCROLL DOWN</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* SELECTED WORK SECTION */}
        <section id="work" className="py-24 sm:py-32 relative border-t border-[#F1F2FA]/5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <Reveal>
              <div className="flex items-center justify-between flex-wrap gap-4 mb-12">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-xs font-mono text-[#8065FF]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span className="uppercase tracking-widest">Flagship Engineering</span>
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#F1F2FA] tracking-tight">
                    Selected Work
                  </h2>
                </div>
                <div className="font-mono text-xs text-[#9BA3BF] bg-[#151A2C] px-3.5 py-1.5 rounded-full border border-[#F1F2FA]/10">
                  INDEX: 01 — 03 // FACTUAL SPEC
                </div>
              </div>
            </Reveal>

            {/* Projects Grid */}
            <div className="space-y-8">
              {projectsData.map((project, index) => (
                <Reveal key={project.id} delay={index * 0.1}>
                  <ProjectCard project={project} index={index} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* MANIFESTO SECTION */}
        <ManifestoSection />

        {/* ABOUT & SKILLS SECTION */}
        <AboutSection />

        {/* CONTACT SECTION & FOOTER */}
        <ContactSection />
      </main>
    </div>
  );
}
