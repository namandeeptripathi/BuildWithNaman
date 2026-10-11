import React from 'react';
import { NavigationDock } from '@/components/ui/NavigationDock';
import { HeroCanvasLoader } from '@/components/3d/HeroCanvasLoader';
import { SelectedWorkSection } from '@/components/ui/SelectedWorkSection';
import { ManifestoSection } from '@/components/ui/ManifestoSection';
import { AboutSection } from '@/components/ui/AboutSection';
import { DeveloperTerminal } from '@/components/ui/DeveloperTerminal';
import { ContactSection } from '@/components/ui/ContactSection';
import { Reveal } from '@/components/motion/Reveal';
import { profileData } from '@/data/profile';
import { ArrowRight, FileText } from 'lucide-react';

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
          className="relative min-h-[95vh] flex flex-col justify-center pt-28 pb-16 sm:py-24"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Left Column: Editorial Headline & Brand Identity */}
              <div className="lg:col-span-7 space-y-6">
                <Reveal delay={0.05}>
                  <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#151A2C] border border-[#8065FF]/40 text-xs font-mono text-[#F1F2FA] shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#48BFFF] animate-pulse" />
                    <span className="text-[#8065FF] font-semibold">STAGE 02 LIVE</span>
                    <span className="text-[#9BA3BF]">{'//'}</span>
                    <span className="text-[#CCD0E5] font-mono">CINEMATIC 3D ACTIVE</span>
                  </div>
                </Reveal>

                <Reveal delay={0.15}>
                  <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-[#F1F2FA] leading-[1.06]">
                    <span className="block text-gradient-electric uppercase tracking-wider text-xl sm:text-2xl lg:text-3xl font-mono font-bold mb-2">
                      Build with Naman
                    </span>
                    Engineering <br />
                    cinematic motion &amp; <br />
                    tactile web systems.
                  </h1>
                </Reveal>

                <Reveal delay={0.25}>
                  <p className="text-base sm:text-lg text-[#9BA3BF] max-w-xl font-sans leading-relaxed">
                    <strong className="text-[#F1F2FA] font-medium">{profileData.name}</strong> — Developer building AI-powered systems, intelligent tools, and interactive digital experiences. Focused on combining robust architecture with clean, responsive interaction design.
                  </p>
                </Reveal>

                <Reveal delay={0.35}>
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <a
                      href="#work"
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#8065FF] hover:bg-[#A38FFF] text-white font-mono text-xs font-bold transition-all shadow-lg shadow-[#8065FF]/25 hover:scale-105 active:scale-95"
                    >
                      <span>Explore my work</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>

                    {profileData.resumeUrl && !profileData.resumeUrl.includes('[Add-Resume-URL]') ? (
                      <a
                        href={profileData.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#151A2C] hover:bg-[#1C233B] text-[#F1F2FA] border border-[#F1F2FA]/10 font-mono text-xs font-bold transition-all hover:border-[#8065FF]/40 hover:text-[#48BFFF]"
                      >
                        <FileText className="w-4 h-4 text-[#8065FF]" />
                        <span>View résumé</span>
                      </a>
                    ) : (
                      <div
                        className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-[#151A2C]/60 text-[#9BA3BF] border border-[#F1F2FA]/10 font-mono text-xs cursor-not-allowed select-none opacity-80"
                        title="Official résumé document coming soon"
                        aria-disabled="true"
                      >
                        <FileText className="w-4 h-4 text-[#9BA3BF]" />
                        <span>Résumé coming soon</span>
                      </div>
                    )}
                  </div>
                </Reveal>

                {/* Technical Interface Details & Telemetry */}
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

              {/* Right Column: Interactive 3D Cosmic Core Canvas */}
              <div className="lg:col-span-5 flex justify-center">
                <Reveal delay={0.3}>
                  <HeroCanvasLoader />
                </Reveal>
              </div>
            </div>

            {/* Restrained Scroll Indicator */}
            <div className="mt-14 sm:mt-20 flex justify-center">
              <a
                href="#work"
                className="inline-flex flex-col items-center gap-2 font-mono text-[11px] text-[#9BA3BF] hover:text-[#48BFFF] transition-colors group"
                aria-label="Scroll to explore selected work"
              >
                <span className="tracking-widest uppercase text-[10px]">Explore Work</span>
                <div className="w-5 h-8 rounded-full border border-[#F1F2FA]/20 flex items-start justify-center p-1 group-hover:border-[#8065FF]/60 transition-colors">
                  <div className="w-1 h-2 rounded-full bg-[#48BFFF] animate-bounce" />
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* SELECTED WORK SECTION WITH CASE STUDIES & ARCHITECTURE */}
        <SelectedWorkSection />

        {/* MANIFESTO SECTION */}
        <ManifestoSection />

        {/* ABOUT & SKILLS SECTION */}
        <AboutSection />

        {/* INTERACTIVE DEVELOPER TERMINAL */}
        <DeveloperTerminal />

        {/* CONTACT SECTION & FOOTER */}
        <ContactSection />
      </main>
    </div>
  );
}
