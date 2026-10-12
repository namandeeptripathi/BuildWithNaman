'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { HeroCanvasLoader } from '@/components/3d/HeroCanvasLoader';
import { profileData } from '@/data/profile';
import { ArrowRight, FileText } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  // Animation variants respecting reduced motion preferences
  const lineRevealVariants = {
    hidden: { y: shouldReduceMotion ? 0 : '115%', opacity: shouldReduceMotion ? 0 : 1 },
    visible: (customDelay: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.95,
        delay: shouldReduceMotion ? 0.1 : customDelay,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: (customDelay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.8,
        delay: shouldReduceMotion ? 0.1 : customDelay,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  // Format location cleanly
  const displayLocation = profileData.location.includes('[')
    ? profileData.location.split('[')[0].trim()
    : profileData.location;

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between pt-20 sm:pt-24 pb-8 sm:pb-12 overflow-hidden"
    >
      {/* Full-Bleed 3D WebGL Background / Environment Layer */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <HeroCanvasLoader />
        {/* Left-edge gradient scrim guaranteeing crystal-clear typographic contrast */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-[56%] bg-gradient-to-r from-[#080A12] via-[#080A12]/85 to-transparent pointer-events-none" />
        {/* Bottom gradient fade guaranteeing seamless transition into subsequent sections */}
        <div className="absolute inset-x-0 bottom-0 h-28 sm:h-36 bg-gradient-to-t from-[#080A12] via-[#080A12]/70 to-transparent pointer-events-none" />
      </div>

      {/* Foreground Editorial Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full flex-1 flex flex-col justify-between">
        <div className="max-w-2xl lg:max-w-3xl space-y-4 sm:space-y-5 pt-1 sm:pt-3">
          {/* Eyebrow Status Badge */}
          <motion.div
            custom={0.15}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#151A2C]/80 border border-[#8065FF]/30 text-xs font-mono text-[#F1F2FA] backdrop-blur-md shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#48BFFF] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#48BFFF]" />
            </span>
            <span className="text-[#8065FF] font-semibold">BUILD WITH NAMAN</span>
            <span className="text-[#616B87]">/</span>
            <span className="text-[#CCD0E5] font-mono">DEVELOPER PORTFOLIO</span>
          </motion.div>

          {/* Monumental Editorial Headline with Clip-Mask Reveals */}
          <div className="space-y-0.5 sm:space-y-1">
            <div className="overflow-hidden">
              <motion.h1
                custom={0.25}
                initial="hidden"
                animate="visible"
                variants={lineRevealVariants}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.35rem] font-display font-extrabold tracking-[-0.04em] text-[#F1F2FA] leading-[0.92]"
              >
                BUILDING
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.div
                custom={0.38}
                initial="hidden"
                animate="visible"
                variants={lineRevealVariants}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.35rem] font-display font-extrabold tracking-[-0.04em] leading-[0.92]"
              >
                <span className="text-gradient-electric">INTELLIGENT</span>
                <span className="text-[#F1F2FA]">{' & '}</span>
                <span className="text-[#F1F2FA]">IMMERSIVE</span>
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div
                custom={0.51}
                initial="hidden"
                animate="visible"
                variants={lineRevealVariants}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.35rem] font-display font-extrabold tracking-[-0.04em] text-[#F1F2FA] leading-[0.92]"
              >
                EXPERIENCES.
              </motion.div>
            </div>
          </div>

          {/* Supporting Developer Introduction */}
          <motion.p
            custom={0.68}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="text-sm sm:text-base lg:text-lg text-[#9BA3BF] max-w-xl font-sans leading-relaxed pt-0.5"
          >
            <strong className="text-[#F1F2FA] font-medium">{profileData.name}</strong> — Full-stack developer crafting AI-powered systems and interactive digital products with clean architecture and considered design.
          </motion.p>

          {/* Primary CTA & Resume Action */}
          <motion.div
            custom={0.82}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="flex flex-wrap items-center gap-3.5 pt-1.5"
          >
            <a
              href="#work"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#8065FF] hover:bg-[#A38FFF] text-white font-mono text-xs font-bold transition-all shadow-[0_0_25px_rgba(128,101,255,0.35)] hover:shadow-[0_0_35px_rgba(128,101,255,0.55)] hover:scale-105 active:scale-95 cursor-pointer"
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
          </motion.div>

          {/* Refined Metadata Strip */}
          <motion.div
            custom={0.96}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="pt-3 sm:pt-4 border-t border-[#F1F2FA]/8 flex items-center gap-4 sm:gap-6 text-[10px] sm:text-xs font-mono text-[#616B87]"
          >
            <span>{displayLocation}</span>
            <span className="text-[#F1F2FA]/15">·</span>
            <span>Full-Stack &amp; Interactive</span>
            <span className="text-[#F1F2FA]/15 hidden sm:inline">·</span>
            <span className="hidden sm:inline">Open to Select Initiatives</span>
          </motion.div>
        </div>

        {/* Minimal Scroll Cue */}
        <motion.div
          custom={1.12}
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          className="pt-4 sm:pt-6 flex items-center justify-end mt-auto"
        >
          <a
            href="#work"
            className="inline-flex items-center gap-2.5 font-mono text-[10px] text-[#616B87] hover:text-[#48BFFF] transition-colors group cursor-pointer tracking-widest uppercase"
            aria-label="Scroll to explore selected work"
          >
            <span>SCROLL</span>
            <div className="w-4 h-7 rounded-full border border-[#F1F2FA]/15 flex items-start justify-center p-0.5 group-hover:border-[#8065FF]/50 transition-colors">
              <div className="w-0.5 h-1.5 rounded-full bg-[#48BFFF]/70 animate-bounce" />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
