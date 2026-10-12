import React from 'react';
import { NavigationDock } from '@/components/ui/NavigationDock';
import { HeroSection } from '@/components/ui/HeroSection';
import { SelectedWorkSection } from '@/components/ui/SelectedWorkSection';
import { ManifestoSection } from '@/components/ui/ManifestoSection';
import { AboutSection } from '@/components/ui/AboutSection';
import { DeveloperTerminal } from '@/components/ui/DeveloperTerminal';
import { ContactSection } from '@/components/ui/ContactSection';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#080A12] text-[#F1F2FA] overflow-x-hidden">
      {/* Background ambient lighting and scanline grid */}
      <div className="fixed inset-0 pointer-events-none bg-cosmic-grid -z-10" />

      {/* Floating Navigation Dock */}
      <NavigationDock />

      <main className="relative z-10">
        {/* PHASE 1: IMMERSIVE CINEMATIC HERO & 3D ENVIRONMENT */}
        <HeroSection />

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
